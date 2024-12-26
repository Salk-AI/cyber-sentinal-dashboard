"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jobMonitoringRun = jobMonitoringRun;
var _nodeCron = _interopRequireDefault(require("node-cron"));
var _monitoringTemplate = require("../../integration-files/monitoring-template");
var _parseCron = require("../../lib/parse-cron");
var _indexDate = require("../../lib/index-date");
var _constants = require("../../../common/constants");
var _tryCatchForIndexPermissionError = require("../tryCatchForIndexPermissionError");
var _utils = require("../../../common/utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * Wazuh app - Module for agent info fetching functions
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

let MONITORING_ENABLED, MONITORING_FREQUENCY, MONITORING_CRON_FREQ, MONITORING_CREATION, MONITORING_INDEX_PATTERN, MONITORING_INDEX_PREFIX;

/**
 * Set the monitoring variables
 * @param context
 */
async function initMonitoringConfiguration(context) {
  try {
    context.wazuh.logger.debug('Reading configuration');
    const appConfig = await context.wazuh_core.configuration.get();
    MONITORING_ENABLED = appConfig['wazuh.monitoring.enabled'] && appConfig['wazuh.monitoring.enabled'] !== 'worker' || appConfig['wazuh.monitoring.enabled'];
    MONITORING_FREQUENCY = appConfig['wazuh.monitoring.frequency'];
    try {
      MONITORING_CRON_FREQ = (0, _parseCron.parseCron)(MONITORING_FREQUENCY);
    } catch (error) {
      context.wazuh.logger.warn(`Using default value ${_constants.WAZUH_MONITORING_DEFAULT_CRON_FREQ} due to: ${error.message || error}`);
      MONITORING_CRON_FREQ = _constants.WAZUH_MONITORING_DEFAULT_CRON_FREQ;
    }
    MONITORING_CREATION = appConfig['wazuh.monitoring.creation'];
    MONITORING_INDEX_PATTERN = appConfig['wazuh.monitoring.pattern'];
    const lastCharIndexPattern = MONITORING_INDEX_PATTERN[MONITORING_INDEX_PATTERN.length - 1];
    if (lastCharIndexPattern !== '*') {
      MONITORING_INDEX_PATTERN += '*';
    }
    MONITORING_INDEX_PREFIX = MONITORING_INDEX_PATTERN.slice(0, MONITORING_INDEX_PATTERN.length - 1);
    context.wazuh.logger.debug(`wazuh.monitoring.enabled: ${MONITORING_ENABLED}`);
    context.wazuh.logger.debug(`wazuh.monitoring.frequency: ${MONITORING_FREQUENCY} (${MONITORING_CRON_FREQ})`);
    context.wazuh.logger.debug(`wazuh.monitoring.creation: ${MONITORING_CREATION}`);
    context.wazuh.logger.debug(`wazuh.monitoring.pattern: ${MONITORING_INDEX_PATTERN} (index prefix: ${MONITORING_INDEX_PREFIX})`);
  } catch (error) {
    context.wazuh.logger.error(error.message);
  }
}

/**
 * Main. First execution when installing / loading App.
 * @param context
 */
async function init(context) {
  try {
    if (MONITORING_ENABLED) {
      await checkTemplate(context);
    }
  } catch (error) {
    const errorMessage = error.message || error;
    context.wazuh.logger.error(errorMessage);
  }
}

/**
 * Verify wazuh-agent template
 */
async function checkTemplate(context) {
  try {
    try {
      context.wazuh.logger.debug(`Getting the ${_constants.WAZUH_MONITORING_TEMPLATE_NAME} template`);
      // Check if the template already exists
      const currentTemplate = await context.core.opensearch.client.asInternalUser.indices.getTemplate({
        name: _constants.WAZUH_MONITORING_TEMPLATE_NAME
      });
      // Copy already created index patterns
      _monitoringTemplate.monitoringTemplate.index_patterns = currentTemplate.body[_constants.WAZUH_MONITORING_TEMPLATE_NAME].index_patterns;
    } catch (error) {
      // Init with the default index pattern
      _monitoringTemplate.monitoringTemplate.index_patterns = [await context.wazuh_core.configuration.get('wazuh.monitoring.pattern')];
    }

    // Check if the user is using a custom pattern and add it to the template if it does
    if (!_monitoringTemplate.monitoringTemplate.index_patterns.includes(MONITORING_INDEX_PATTERN)) {
      _monitoringTemplate.monitoringTemplate.index_patterns.push(MONITORING_INDEX_PATTERN);
    }

    // Update the monitoring template
    context.wazuh.logger.debug(`Updating the ${_constants.WAZUH_MONITORING_TEMPLATE_NAME} template`);
    await context.core.opensearch.client.asInternalUser.indices.putTemplate({
      name: _constants.WAZUH_MONITORING_TEMPLATE_NAME,
      body: _monitoringTemplate.monitoringTemplate
    });
    context.wazuh.logger.info(`Updated the ${_constants.WAZUH_MONITORING_TEMPLATE_NAME} template`);
  } catch (error) {
    const errorMessage = `Something went wrong updating the ${_constants.WAZUH_MONITORING_TEMPLATE_NAME} template ${error.message || error}`;
    context.wazuh.logger.error(errorMessage);
    throw error;
  }
}

/**
 * Save agent status into elasticsearch, create index and/or insert document
 * @param {*} context
 * @param {*} data
 */
async function insertMonitoringDataElasticsearch(context, data) {
  const monitoringIndexName = MONITORING_INDEX_PREFIX + (0, _indexDate.indexDate)(MONITORING_CREATION);
  if (!MONITORING_ENABLED) {
    return;
  }
  try {
    await (0, _tryCatchForIndexPermissionError.tryCatchForIndexPermissionError)(monitoringIndexName)(async () => {
      context.wazuh.logger.debug(`Checking the existence of ${monitoringIndexName} index`);
      const exists = await context.core.opensearch.client.asInternalUser.indices.exists({
        index: monitoringIndexName
      });
      if (!exists.body) {
        context.wazuh.logger.debug(`The ${monitoringIndexName} index does not exist`);
        await createIndex(context, monitoringIndexName);
      } else {
        context.wazuh.logger.debug(`The ${monitoringIndexName} index exists`);
      }

      // Update the index configuration
      const appConfig = await context.wazuh_core.configuration.get('wazuh.monitoring.shards', 'wazuh.monitoring.replicas');
      const indexConfiguration = {
        settings: {
          index: {
            number_of_shards: appConfig['wazuh.monitoring.shards'],
            number_of_replicas: appConfig['wazuh.monitoring.replicas']
          }
        }
      };

      // To update the index settings with this client is required close the index, update the settings and open it
      // Number of shards is not dynamic so delete that setting if it's given
      delete indexConfiguration.settings.index.number_of_shards;
      context.wazuh.logger.debug(`Adding settings to ${monitoringIndexName} index`);
      await context.core.opensearch.client.asInternalUser.indices.putSettings({
        index: monitoringIndexName,
        body: indexConfiguration
      });
      context.wazuh.logger.info(`Settings added to ${monitoringIndexName} index`);

      // Insert data to the monitoring index
      await insertDataToIndex(context, monitoringIndexName, data);
    })();
  } catch (error) {
    context.wazuh.logger.error(error.message || error);
  }
}

/**
 * Inserting one document per agent into Elastic. Bulk.
 * @param {*} context Endpoint
 * @param {String} indexName The name for the index (e.g. daily: wazuh-monitoring-YYYY.MM.DD)
 * @param {*} data
 */
async function insertDataToIndex(context, indexName, data) {
  const {
    agents,
    apiHost
  } = data;
  try {
    if (agents.length > 0) {
      context.wazuh.logger.debug(`Bulk data to index ${indexName} for ${agents.length} agents`);
      const bodyBulk = agents.map(agent => {
        const agentInfo = {
          ...agent
        };
        agentInfo['timestamp'] = new Date(Date.now()).toISOString();
        agentInfo.host = agent.manager;
        agentInfo.cluster = {
          name: apiHost.clusterName ? apiHost.clusterName : 'disabled'
        };
        return `{ "index":  { "_index": "${indexName}" } }\n${JSON.stringify(agentInfo)}\n`;
      }).join('');
      await context.core.opensearch.client.asInternalUser.bulk({
        index: indexName,
        body: bodyBulk
      });
      context.wazuh.logger.info(`Bulk data to index ${indexName} for ${agents.length} agents completed`);
    }
  } catch (error) {
    context.wazuh.logger.error(`Error inserting agent data into elasticsearch. Bulk request failed due to ${error.message || error}`);
  }
}

/**
 * Create the wazuh-monitoring index
 * @param {*} context context
 * @param {String} indexName The name for the index (e.g. daily: wazuh-monitoring-YYYY.MM.DD)
 */
async function createIndex(context, indexName) {
  try {
    if (!MONITORING_ENABLED) return;
    const appConfig = await context.wazuh_core.configuration.get('wazuh.monitoring.shards', 'wazuh.monitoring.replicas');
    const IndexConfiguration = {
      settings: {
        index: {
          number_of_shards: appConfig['wazuh.monitoring.shards'],
          number_of_replicas: appConfig['wazuh.monitoring.replicas']
        }
      }
    };
    context.wazuh.logger.debug(`Creating ${indexName} index`);
    await context.core.opensearch.client.asInternalUser.indices.create({
      index: indexName,
      body: IndexConfiguration
    });
    context.wazuh.logger.info(`${indexName} index created`);
  } catch (error) {
    context.wazuh.logger.error(`Could not create ${indexName} index: ${error.message || error}`);
  }
}

/**
 * Wait until Kibana server is ready
 */
async function checkPluginPlatformStatus(context) {
  try {
    context.wazuh.logger.debug('Waiting for platform servers to be ready...');
    await checkElasticsearchServer(context);
    await init(context);
  } catch (error) {
    context.wazuh.logger.error(error.message || error);
    try {
      await (0, _utils.delayAsPromise)(3000);
      await checkPluginPlatformStatus(context);
    } catch (error) {}
  }
}

/**
 * Check Elasticsearch Server status and Kibana index presence
 */
async function checkElasticsearchServer(context) {
  try {
    context.wazuh.logger.debug(`Checking the existence of ${context.server.config.opensearchDashboards.index} index`);
    const data = await context.core.opensearch.client.asInternalUser.indices.exists({
      index: context.server.config.opensearchDashboards.index
    });
    return data.body;
    // TODO: check if Elasticsearch can receive requests
    // if (data) {
    //   const pluginsData = await this.server.plugins.elasticsearch.waitUntilReady();
    //   return pluginsData;
    // }
    return Promise.reject(data);
  } catch (error) {
    context.wazuh.logger.error(error.message || error);
    return Promise.reject(error);
  }
}

/**
 * Task used by the cron job.
 */
async function cronTask(context) {
  try {
    const templateMonitoring = await context.core.opensearch.client.asInternalUser.indices.getTemplate({
      name: _constants.WAZUH_MONITORING_TEMPLATE_NAME
    });
    const apiHosts = await context.wazuh_core.manageHosts.getEntries({
      excludePassword: true
    });
    if (!apiHosts.length) {
      context.wazuh.logger.warn('There are no API host entries. Skip.');
      return;
    }
    const apiHostsUnique = (apiHosts || []).filter((apiHost, index, self) => index === self.findIndex(t => t.user === apiHost.user && t.password === apiHost.password && t.url === apiHost.url && t.port === apiHost.port));
    for (let apiHost of apiHostsUnique) {
      try {
        const {
          agents,
          apiHost: host
        } = await getApiInfo(context, apiHost);
        await insertMonitoringDataElasticsearch(context, {
          agents,
          apiHost: host
        });
      } catch (error) {}
    }
  } catch (error) {
    // Retry to call itself again if Kibana index is not ready yet
    // try {
    //   if (
    //     this.wzWrapper.buildingKibanaIndex ||
    //     ((error || {}).status === 404 &&
    //       (error || {}).displayName === 'NotFound')
    //   ) {
    //     await delayAsPromise(1000);
    //     return cronTask(context);
    //   }
    // } catch (error) {} //eslint-disable-line
    context.wazuh.logger.error(error.message || error);
  }
}

/**
 * Get API and agents info
 * @param context
 * @param apiHost
 */
async function getApiInfo(context, apiHost) {
  try {
    context.wazuh.logger.debug(`Getting API info for ${apiHost.id}`);
    const responseIsCluster = await context.wazuh.api.client.asInternalUser.request('GET', '/cluster/status', {}, {
      apiHostID: apiHost.id
    });
    const isCluster = (((responseIsCluster || {}).data || {}).data || {}).enabled === 'yes';
    if (isCluster) {
      const responseClusterInfo = await context.wazuh.api.client.asInternalUser.request('GET', `/cluster/local/info`, {}, {
        apiHostID: apiHost.id
      });
      apiHost.clusterName = responseClusterInfo.data.data.affected_items[0].cluster;
    }
    const agents = await fetchAllAgentsFromApiHost(context, apiHost);
    return {
      agents,
      apiHost
    };
  } catch (error) {
    context.wazuh.logger.error(error.message || error);
    throw error;
  }
}

/**
 * Fetch all agents for the API provided
 * @param context
 * @param apiHost
 */
async function fetchAllAgentsFromApiHost(context, apiHost) {
  let agents = [];
  try {
    context.wazuh.logger.debug(`Getting all agents from ApiID: ${apiHost.id}`);
    const responseAgentsCount = await context.wazuh.api.client.asInternalUser.request('GET', '/agents', {
      params: {
        offset: 0,
        limit: 1,
        q: 'id!=000'
      }
    }, {
      apiHostID: apiHost.id
    });
    const agentsCount = responseAgentsCount.data.data.total_affected_items;
    context.wazuh.logger.debug(`ApiID: ${apiHost.id}, Agent count: ${agentsCount}`);
    let payload = {
      offset: 0,
      limit: 500,
      q: 'id!=000'
    };
    while (agents.length < agentsCount && payload.offset < agentsCount) {
      try {
        /*
        TODO: Improve the performance of request with:
          - Reduce the number of requests to the Wazuh API
          - Reduce (if possible) the quantity of data to index by document
         Requirements:
          - Research about the neccesary data to index.
         How to do:
          - Wazuh API request:
            - select the required data to retrieve depending on is required to index (using the `select` query param)
            - increase the limit of results to retrieve (currently, the requests use the recommended value: 500).
              See the allowed values. This depends on the selected data because the response could fail if contains a lot of data
        */
        const responseAgents = await context.wazuh.api.client.asInternalUser.request('GET', `/agents`, {
          params: payload
        }, {
          apiHostID: apiHost.id
        });
        agents = [...agents, ...responseAgents.data.data.affected_items];
        payload.offset += payload.limit;
      } catch (error) {
        context.wazuh.logger.error(`ApiID: ${apiHost.id}, Error request with offset/limit ${payload.offset}/${payload.limit}: ${error.message || error}`);
      }
    }
    return agents;
  } catch (error) {
    context.wazuh.logger.error(`ApiID: ${apiHost.id}. Error: ${error.message || error}`);
    throw error;
  }
}

/**
 * Start the cron job
 */
async function jobMonitoringRun(context) {
  context.wazuh.logger.debug('Task:Monitoring initializing');
  // Init the monitoring variables
  await initMonitoringConfiguration(context);
  // Check Kibana index and if it is prepared, start the initialization of Wazuh App.
  await checkPluginPlatformStatus(context);
  // // Run the cron job only it it's enabled
  if (MONITORING_ENABLED) {
    cronTask(context);
    _nodeCron.default.schedule(MONITORING_CRON_FREQ, () => cronTask(context));
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbm9kZUNyb24iLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwicmVxdWlyZSIsIl9tb25pdG9yaW5nVGVtcGxhdGUiLCJfcGFyc2VDcm9uIiwiX2luZGV4RGF0ZSIsIl9jb25zdGFudHMiLCJfdHJ5Q2F0Y2hGb3JJbmRleFBlcm1pc3Npb25FcnJvciIsIl91dGlscyIsIm9iaiIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0IiwiTU9OSVRPUklOR19FTkFCTEVEIiwiTU9OSVRPUklOR19GUkVRVUVOQ1kiLCJNT05JVE9SSU5HX0NST05fRlJFUSIsIk1PTklUT1JJTkdfQ1JFQVRJT04iLCJNT05JVE9SSU5HX0lOREVYX1BBVFRFUk4iLCJNT05JVE9SSU5HX0lOREVYX1BSRUZJWCIsImluaXRNb25pdG9yaW5nQ29uZmlndXJhdGlvbiIsImNvbnRleHQiLCJ3YXp1aCIsImxvZ2dlciIsImRlYnVnIiwiYXBwQ29uZmlnIiwid2F6dWhfY29yZSIsImNvbmZpZ3VyYXRpb24iLCJnZXQiLCJwYXJzZUNyb24iLCJlcnJvciIsIndhcm4iLCJXQVpVSF9NT05JVE9SSU5HX0RFRkFVTFRfQ1JPTl9GUkVRIiwibWVzc2FnZSIsImxhc3RDaGFySW5kZXhQYXR0ZXJuIiwibGVuZ3RoIiwic2xpY2UiLCJpbml0IiwiY2hlY2tUZW1wbGF0ZSIsImVycm9yTWVzc2FnZSIsIldBWlVIX01PTklUT1JJTkdfVEVNUExBVEVfTkFNRSIsImN1cnJlbnRUZW1wbGF0ZSIsImNvcmUiLCJvcGVuc2VhcmNoIiwiY2xpZW50IiwiYXNJbnRlcm5hbFVzZXIiLCJpbmRpY2VzIiwiZ2V0VGVtcGxhdGUiLCJuYW1lIiwibW9uaXRvcmluZ1RlbXBsYXRlIiwiaW5kZXhfcGF0dGVybnMiLCJib2R5IiwiaW5jbHVkZXMiLCJwdXNoIiwicHV0VGVtcGxhdGUiLCJpbmZvIiwiaW5zZXJ0TW9uaXRvcmluZ0RhdGFFbGFzdGljc2VhcmNoIiwiZGF0YSIsIm1vbml0b3JpbmdJbmRleE5hbWUiLCJpbmRleERhdGUiLCJ0cnlDYXRjaEZvckluZGV4UGVybWlzc2lvbkVycm9yIiwiZXhpc3RzIiwiaW5kZXgiLCJjcmVhdGVJbmRleCIsImluZGV4Q29uZmlndXJhdGlvbiIsInNldHRpbmdzIiwibnVtYmVyX29mX3NoYXJkcyIsIm51bWJlcl9vZl9yZXBsaWNhcyIsInB1dFNldHRpbmdzIiwiaW5zZXJ0RGF0YVRvSW5kZXgiLCJpbmRleE5hbWUiLCJhZ2VudHMiLCJhcGlIb3N0IiwiYm9keUJ1bGsiLCJtYXAiLCJhZ2VudCIsImFnZW50SW5mbyIsIkRhdGUiLCJub3ciLCJ0b0lTT1N0cmluZyIsImhvc3QiLCJtYW5hZ2VyIiwiY2x1c3RlciIsImNsdXN0ZXJOYW1lIiwiSlNPTiIsInN0cmluZ2lmeSIsImpvaW4iLCJidWxrIiwiSW5kZXhDb25maWd1cmF0aW9uIiwiY3JlYXRlIiwiY2hlY2tQbHVnaW5QbGF0Zm9ybVN0YXR1cyIsImNoZWNrRWxhc3RpY3NlYXJjaFNlcnZlciIsImRlbGF5QXNQcm9taXNlIiwic2VydmVyIiwiY29uZmlnIiwib3BlbnNlYXJjaERhc2hib2FyZHMiLCJQcm9taXNlIiwicmVqZWN0IiwiY3JvblRhc2siLCJ0ZW1wbGF0ZU1vbml0b3JpbmciLCJhcGlIb3N0cyIsIm1hbmFnZUhvc3RzIiwiZ2V0RW50cmllcyIsImV4Y2x1ZGVQYXNzd29yZCIsImFwaUhvc3RzVW5pcXVlIiwiZmlsdGVyIiwic2VsZiIsImZpbmRJbmRleCIsInQiLCJ1c2VyIiwicGFzc3dvcmQiLCJ1cmwiLCJwb3J0IiwiZ2V0QXBpSW5mbyIsImlkIiwicmVzcG9uc2VJc0NsdXN0ZXIiLCJhcGkiLCJyZXF1ZXN0IiwiYXBpSG9zdElEIiwiaXNDbHVzdGVyIiwiZW5hYmxlZCIsInJlc3BvbnNlQ2x1c3RlckluZm8iLCJhZmZlY3RlZF9pdGVtcyIsImZldGNoQWxsQWdlbnRzRnJvbUFwaUhvc3QiLCJyZXNwb25zZUFnZW50c0NvdW50IiwicGFyYW1zIiwib2Zmc2V0IiwibGltaXQiLCJxIiwiYWdlbnRzQ291bnQiLCJ0b3RhbF9hZmZlY3RlZF9pdGVtcyIsInBheWxvYWQiLCJyZXNwb25zZUFnZW50cyIsImpvYk1vbml0b3JpbmdSdW4iLCJjcm9uIiwic2NoZWR1bGUiXSwic291cmNlcyI6WyJpbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogV2F6dWggYXBwIC0gTW9kdWxlIGZvciBhZ2VudCBpbmZvIGZldGNoaW5nIGZ1bmN0aW9uc1xuICogQ29weXJpZ2h0IChDKSAyMDE1LTIwMjIgV2F6dWgsIEluYy5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTsgeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb247IGVpdGhlciB2ZXJzaW9uIDIgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEZpbmQgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCB0aGlzIG9uIHRoZSBMSUNFTlNFIGZpbGUuXG4gKi9cbmltcG9ydCBjcm9uIGZyb20gJ25vZGUtY3Jvbic7XG5pbXBvcnQgeyBtb25pdG9yaW5nVGVtcGxhdGUgfSBmcm9tICcuLi8uLi9pbnRlZ3JhdGlvbi1maWxlcy9tb25pdG9yaW5nLXRlbXBsYXRlJztcbmltcG9ydCB7IHBhcnNlQ3JvbiB9IGZyb20gJy4uLy4uL2xpYi9wYXJzZS1jcm9uJztcbmltcG9ydCB7IGluZGV4RGF0ZSB9IGZyb20gJy4uLy4uL2xpYi9pbmRleC1kYXRlJztcbmltcG9ydCB7XG4gIFdBWlVIX01PTklUT1JJTkdfREVGQVVMVF9DUk9OX0ZSRVEsXG4gIFdBWlVIX01PTklUT1JJTkdfVEVNUExBVEVfTkFNRSxcbn0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyB0cnlDYXRjaEZvckluZGV4UGVybWlzc2lvbkVycm9yIH0gZnJvbSAnLi4vdHJ5Q2F0Y2hGb3JJbmRleFBlcm1pc3Npb25FcnJvcic7XG5pbXBvcnQgeyBkZWxheUFzUHJvbWlzZSB9IGZyb20gJy4uLy4uLy4uL2NvbW1vbi91dGlscyc7XG5cbmxldCBNT05JVE9SSU5HX0VOQUJMRUQsXG4gIE1PTklUT1JJTkdfRlJFUVVFTkNZLFxuICBNT05JVE9SSU5HX0NST05fRlJFUSxcbiAgTU9OSVRPUklOR19DUkVBVElPTixcbiAgTU9OSVRPUklOR19JTkRFWF9QQVRURVJOLFxuICBNT05JVE9SSU5HX0lOREVYX1BSRUZJWDtcblxuLyoqXG4gKiBTZXQgdGhlIG1vbml0b3JpbmcgdmFyaWFibGVzXG4gKiBAcGFyYW0gY29udGV4dFxuICovXG5hc3luYyBmdW5jdGlvbiBpbml0TW9uaXRvcmluZ0NvbmZpZ3VyYXRpb24oY29udGV4dCkge1xuICB0cnkge1xuICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKCdSZWFkaW5nIGNvbmZpZ3VyYXRpb24nKTtcbiAgICBjb25zdCBhcHBDb25maWcgPSBhd2FpdCBjb250ZXh0LndhenVoX2NvcmUuY29uZmlndXJhdGlvbi5nZXQoKTtcbiAgICBNT05JVE9SSU5HX0VOQUJMRUQgPVxuICAgICAgKGFwcENvbmZpZ1snd2F6dWgubW9uaXRvcmluZy5lbmFibGVkJ10gJiZcbiAgICAgICAgYXBwQ29uZmlnWyd3YXp1aC5tb25pdG9yaW5nLmVuYWJsZWQnXSAhPT0gJ3dvcmtlcicpIHx8XG4gICAgICBhcHBDb25maWdbJ3dhenVoLm1vbml0b3JpbmcuZW5hYmxlZCddO1xuICAgIE1PTklUT1JJTkdfRlJFUVVFTkNZID0gYXBwQ29uZmlnWyd3YXp1aC5tb25pdG9yaW5nLmZyZXF1ZW5jeSddO1xuICAgIHRyeSB7XG4gICAgICBNT05JVE9SSU5HX0NST05fRlJFUSA9IHBhcnNlQ3JvbihNT05JVE9SSU5HX0ZSRVFVRU5DWSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLndhcm4oXG4gICAgICAgIGBVc2luZyBkZWZhdWx0IHZhbHVlICR7V0FaVUhfTU9OSVRPUklOR19ERUZBVUxUX0NST05fRlJFUX0gZHVlIHRvOiAke1xuICAgICAgICAgIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3JcbiAgICAgICAgfWAsXG4gICAgICApO1xuICAgICAgTU9OSVRPUklOR19DUk9OX0ZSRVEgPSBXQVpVSF9NT05JVE9SSU5HX0RFRkFVTFRfQ1JPTl9GUkVRO1xuICAgIH1cbiAgICBNT05JVE9SSU5HX0NSRUFUSU9OID0gYXBwQ29uZmlnWyd3YXp1aC5tb25pdG9yaW5nLmNyZWF0aW9uJ107XG5cbiAgICBNT05JVE9SSU5HX0lOREVYX1BBVFRFUk4gPSBhcHBDb25maWdbJ3dhenVoLm1vbml0b3JpbmcucGF0dGVybiddO1xuXG4gICAgY29uc3QgbGFzdENoYXJJbmRleFBhdHRlcm4gPVxuICAgICAgTU9OSVRPUklOR19JTkRFWF9QQVRURVJOW01PTklUT1JJTkdfSU5ERVhfUEFUVEVSTi5sZW5ndGggLSAxXTtcbiAgICBpZiAobGFzdENoYXJJbmRleFBhdHRlcm4gIT09ICcqJykge1xuICAgICAgTU9OSVRPUklOR19JTkRFWF9QQVRURVJOICs9ICcqJztcbiAgICB9XG4gICAgTU9OSVRPUklOR19JTkRFWF9QUkVGSVggPSBNT05JVE9SSU5HX0lOREVYX1BBVFRFUk4uc2xpY2UoXG4gICAgICAwLFxuICAgICAgTU9OSVRPUklOR19JTkRFWF9QQVRURVJOLmxlbmd0aCAtIDEsXG4gICAgKTtcblxuICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKFxuICAgICAgYHdhenVoLm1vbml0b3JpbmcuZW5hYmxlZDogJHtNT05JVE9SSU5HX0VOQUJMRUR9YCxcbiAgICApO1xuXG4gICAgY29udGV4dC53YXp1aC5sb2dnZXIuZGVidWcoXG4gICAgICBgd2F6dWgubW9uaXRvcmluZy5mcmVxdWVuY3k6ICR7TU9OSVRPUklOR19GUkVRVUVOQ1l9ICgke01PTklUT1JJTkdfQ1JPTl9GUkVRfSlgLFxuICAgICk7XG5cbiAgICBjb250ZXh0LndhenVoLmxvZ2dlci5kZWJ1ZyhcbiAgICAgIGB3YXp1aC5tb25pdG9yaW5nLmNyZWF0aW9uOiAke01PTklUT1JJTkdfQ1JFQVRJT059YCxcbiAgICApO1xuXG4gICAgY29udGV4dC53YXp1aC5sb2dnZXIuZGVidWcoXG4gICAgICBgd2F6dWgubW9uaXRvcmluZy5wYXR0ZXJuOiAke01PTklUT1JJTkdfSU5ERVhfUEFUVEVSTn0gKGluZGV4IHByZWZpeDogJHtNT05JVE9SSU5HX0lOREVYX1BSRUZJWH0pYCxcbiAgICApO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmVycm9yKGVycm9yLm1lc3NhZ2UpO1xuICB9XG59XG5cbi8qKlxuICogTWFpbi4gRmlyc3QgZXhlY3V0aW9uIHdoZW4gaW5zdGFsbGluZyAvIGxvYWRpbmcgQXBwLlxuICogQHBhcmFtIGNvbnRleHRcbiAqL1xuYXN5bmMgZnVuY3Rpb24gaW5pdChjb250ZXh0KSB7XG4gIHRyeSB7XG4gICAgaWYgKE1PTklUT1JJTkdfRU5BQkxFRCkge1xuICAgICAgYXdhaXQgY2hlY2tUZW1wbGF0ZShjb250ZXh0KTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZXJyb3IubWVzc2FnZSB8fCBlcnJvcjtcbiAgICBjb250ZXh0LndhenVoLmxvZ2dlci5lcnJvcihlcnJvck1lc3NhZ2UpO1xuICB9XG59XG5cbi8qKlxuICogVmVyaWZ5IHdhenVoLWFnZW50IHRlbXBsYXRlXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGNoZWNrVGVtcGxhdGUoY29udGV4dCkge1xuICB0cnkge1xuICAgIHRyeSB7XG4gICAgICBjb250ZXh0LndhenVoLmxvZ2dlci5kZWJ1ZyhcbiAgICAgICAgYEdldHRpbmcgdGhlICR7V0FaVUhfTU9OSVRPUklOR19URU1QTEFURV9OQU1FfSB0ZW1wbGF0ZWAsXG4gICAgICApO1xuICAgICAgLy8gQ2hlY2sgaWYgdGhlIHRlbXBsYXRlIGFscmVhZHkgZXhpc3RzXG4gICAgICBjb25zdCBjdXJyZW50VGVtcGxhdGUgPVxuICAgICAgICBhd2FpdCBjb250ZXh0LmNvcmUub3BlbnNlYXJjaC5jbGllbnQuYXNJbnRlcm5hbFVzZXIuaW5kaWNlcy5nZXRUZW1wbGF0ZShcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiBXQVpVSF9NT05JVE9SSU5HX1RFTVBMQVRFX05BTUUsXG4gICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICAgIC8vIENvcHkgYWxyZWFkeSBjcmVhdGVkIGluZGV4IHBhdHRlcm5zXG4gICAgICBtb25pdG9yaW5nVGVtcGxhdGUuaW5kZXhfcGF0dGVybnMgPVxuICAgICAgICBjdXJyZW50VGVtcGxhdGUuYm9keVtXQVpVSF9NT05JVE9SSU5HX1RFTVBMQVRFX05BTUVdLmluZGV4X3BhdHRlcm5zO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBJbml0IHdpdGggdGhlIGRlZmF1bHQgaW5kZXggcGF0dGVyblxuICAgICAgbW9uaXRvcmluZ1RlbXBsYXRlLmluZGV4X3BhdHRlcm5zID0gW1xuICAgICAgICBhd2FpdCBjb250ZXh0LndhenVoX2NvcmUuY29uZmlndXJhdGlvbi5nZXQoJ3dhenVoLm1vbml0b3JpbmcucGF0dGVybicpLFxuICAgICAgXTtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiB0aGUgdXNlciBpcyB1c2luZyBhIGN1c3RvbSBwYXR0ZXJuIGFuZCBhZGQgaXQgdG8gdGhlIHRlbXBsYXRlIGlmIGl0IGRvZXNcbiAgICBpZiAoIW1vbml0b3JpbmdUZW1wbGF0ZS5pbmRleF9wYXR0ZXJucy5pbmNsdWRlcyhNT05JVE9SSU5HX0lOREVYX1BBVFRFUk4pKSB7XG4gICAgICBtb25pdG9yaW5nVGVtcGxhdGUuaW5kZXhfcGF0dGVybnMucHVzaChNT05JVE9SSU5HX0lOREVYX1BBVFRFUk4pO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSB0aGUgbW9uaXRvcmluZyB0ZW1wbGF0ZVxuICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKFxuICAgICAgYFVwZGF0aW5nIHRoZSAke1dBWlVIX01PTklUT1JJTkdfVEVNUExBVEVfTkFNRX0gdGVtcGxhdGVgLFxuICAgICk7XG4gICAgYXdhaXQgY29udGV4dC5jb3JlLm9wZW5zZWFyY2guY2xpZW50LmFzSW50ZXJuYWxVc2VyLmluZGljZXMucHV0VGVtcGxhdGUoe1xuICAgICAgbmFtZTogV0FaVUhfTU9OSVRPUklOR19URU1QTEFURV9OQU1FLFxuICAgICAgYm9keTogbW9uaXRvcmluZ1RlbXBsYXRlLFxuICAgIH0pO1xuICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmluZm8oXG4gICAgICBgVXBkYXRlZCB0aGUgJHtXQVpVSF9NT05JVE9SSU5HX1RFTVBMQVRFX05BTUV9IHRlbXBsYXRlYCxcbiAgICApO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGBTb21ldGhpbmcgd2VudCB3cm9uZyB1cGRhdGluZyB0aGUgJHtXQVpVSF9NT05JVE9SSU5HX1RFTVBMQVRFX05BTUV9IHRlbXBsYXRlICR7XG4gICAgICBlcnJvci5tZXNzYWdlIHx8IGVycm9yXG4gICAgfWA7XG4gICAgY29udGV4dC53YXp1aC5sb2dnZXIuZXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG4vKipcbiAqIFNhdmUgYWdlbnQgc3RhdHVzIGludG8gZWxhc3RpY3NlYXJjaCwgY3JlYXRlIGluZGV4IGFuZC9vciBpbnNlcnQgZG9jdW1lbnRcbiAqIEBwYXJhbSB7Kn0gY29udGV4dFxuICogQHBhcmFtIHsqfSBkYXRhXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGluc2VydE1vbml0b3JpbmdEYXRhRWxhc3RpY3NlYXJjaChjb250ZXh0LCBkYXRhKSB7XG4gIGNvbnN0IG1vbml0b3JpbmdJbmRleE5hbWUgPVxuICAgIE1PTklUT1JJTkdfSU5ERVhfUFJFRklYICsgaW5kZXhEYXRlKE1PTklUT1JJTkdfQ1JFQVRJT04pO1xuICBpZiAoIU1PTklUT1JJTkdfRU5BQkxFRCkge1xuICAgIHJldHVybjtcbiAgfVxuICB0cnkge1xuICAgIGF3YWl0IHRyeUNhdGNoRm9ySW5kZXhQZXJtaXNzaW9uRXJyb3IobW9uaXRvcmluZ0luZGV4TmFtZSkoYXN5bmMgKCkgPT4ge1xuICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZGVidWcoXG4gICAgICAgIGBDaGVja2luZyB0aGUgZXhpc3RlbmNlIG9mICR7bW9uaXRvcmluZ0luZGV4TmFtZX0gaW5kZXhgLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGV4aXN0cyA9XG4gICAgICAgIGF3YWl0IGNvbnRleHQuY29yZS5vcGVuc2VhcmNoLmNsaWVudC5hc0ludGVybmFsVXNlci5pbmRpY2VzLmV4aXN0cyh7XG4gICAgICAgICAgaW5kZXg6IG1vbml0b3JpbmdJbmRleE5hbWUsXG4gICAgICAgIH0pO1xuICAgICAgaWYgKCFleGlzdHMuYm9keSkge1xuICAgICAgICBjb250ZXh0LndhenVoLmxvZ2dlci5kZWJ1ZyhcbiAgICAgICAgICBgVGhlICR7bW9uaXRvcmluZ0luZGV4TmFtZX0gaW5kZXggZG9lcyBub3QgZXhpc3RgLFxuICAgICAgICApO1xuICAgICAgICBhd2FpdCBjcmVhdGVJbmRleChjb250ZXh0LCBtb25pdG9yaW5nSW5kZXhOYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKGBUaGUgJHttb25pdG9yaW5nSW5kZXhOYW1lfSBpbmRleCBleGlzdHNgKTtcbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIHRoZSBpbmRleCBjb25maWd1cmF0aW9uXG4gICAgICBjb25zdCBhcHBDb25maWcgPSBhd2FpdCBjb250ZXh0LndhenVoX2NvcmUuY29uZmlndXJhdGlvbi5nZXQoXG4gICAgICAgICd3YXp1aC5tb25pdG9yaW5nLnNoYXJkcycsXG4gICAgICAgICd3YXp1aC5tb25pdG9yaW5nLnJlcGxpY2FzJyxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGluZGV4Q29uZmlndXJhdGlvbiA9IHtcbiAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICBpbmRleDoge1xuICAgICAgICAgICAgbnVtYmVyX29mX3NoYXJkczogYXBwQ29uZmlnWyd3YXp1aC5tb25pdG9yaW5nLnNoYXJkcyddLFxuICAgICAgICAgICAgbnVtYmVyX29mX3JlcGxpY2FzOiBhcHBDb25maWdbJ3dhenVoLm1vbml0b3JpbmcucmVwbGljYXMnXSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgLy8gVG8gdXBkYXRlIHRoZSBpbmRleCBzZXR0aW5ncyB3aXRoIHRoaXMgY2xpZW50IGlzIHJlcXVpcmVkIGNsb3NlIHRoZSBpbmRleCwgdXBkYXRlIHRoZSBzZXR0aW5ncyBhbmQgb3BlbiBpdFxuICAgICAgLy8gTnVtYmVyIG9mIHNoYXJkcyBpcyBub3QgZHluYW1pYyBzbyBkZWxldGUgdGhhdCBzZXR0aW5nIGlmIGl0J3MgZ2l2ZW5cbiAgICAgIGRlbGV0ZSBpbmRleENvbmZpZ3VyYXRpb24uc2V0dGluZ3MuaW5kZXgubnVtYmVyX29mX3NoYXJkcztcbiAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKFxuICAgICAgICBgQWRkaW5nIHNldHRpbmdzIHRvICR7bW9uaXRvcmluZ0luZGV4TmFtZX0gaW5kZXhgLFxuICAgICAgKTtcbiAgICAgIGF3YWl0IGNvbnRleHQuY29yZS5vcGVuc2VhcmNoLmNsaWVudC5hc0ludGVybmFsVXNlci5pbmRpY2VzLnB1dFNldHRpbmdzKHtcbiAgICAgICAgaW5kZXg6IG1vbml0b3JpbmdJbmRleE5hbWUsXG4gICAgICAgIGJvZHk6IGluZGV4Q29uZmlndXJhdGlvbixcbiAgICAgIH0pO1xuXG4gICAgICBjb250ZXh0LndhenVoLmxvZ2dlci5pbmZvKFxuICAgICAgICBgU2V0dGluZ3MgYWRkZWQgdG8gJHttb25pdG9yaW5nSW5kZXhOYW1lfSBpbmRleGAsXG4gICAgICApO1xuXG4gICAgICAvLyBJbnNlcnQgZGF0YSB0byB0aGUgbW9uaXRvcmluZyBpbmRleFxuICAgICAgYXdhaXQgaW5zZXJ0RGF0YVRvSW5kZXgoY29udGV4dCwgbW9uaXRvcmluZ0luZGV4TmFtZSwgZGF0YSk7XG4gICAgfSkoKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb250ZXh0LndhenVoLmxvZ2dlci5lcnJvcihlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcbiAgfVxufVxuXG4vKipcbiAqIEluc2VydGluZyBvbmUgZG9jdW1lbnQgcGVyIGFnZW50IGludG8gRWxhc3RpYy4gQnVsay5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBFbmRwb2ludFxuICogQHBhcmFtIHtTdHJpbmd9IGluZGV4TmFtZSBUaGUgbmFtZSBmb3IgdGhlIGluZGV4IChlLmcuIGRhaWx5OiB3YXp1aC1tb25pdG9yaW5nLVlZWVkuTU0uREQpXG4gKiBAcGFyYW0geyp9IGRhdGFcbiAqL1xuYXN5bmMgZnVuY3Rpb24gaW5zZXJ0RGF0YVRvSW5kZXgoXG4gIGNvbnRleHQsXG4gIGluZGV4TmFtZTogc3RyaW5nLFxuICBkYXRhOiB7IGFnZW50czogYW55W107IGFwaUhvc3QgfSxcbikge1xuICBjb25zdCB7IGFnZW50cywgYXBpSG9zdCB9ID0gZGF0YTtcbiAgdHJ5IHtcbiAgICBpZiAoYWdlbnRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKFxuICAgICAgICBgQnVsayBkYXRhIHRvIGluZGV4ICR7aW5kZXhOYW1lfSBmb3IgJHthZ2VudHMubGVuZ3RofSBhZ2VudHNgLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgYm9keUJ1bGsgPSBhZ2VudHNcbiAgICAgICAgLm1hcChhZ2VudCA9PiB7XG4gICAgICAgICAgY29uc3QgYWdlbnRJbmZvID0geyAuLi5hZ2VudCB9O1xuICAgICAgICAgIGFnZW50SW5mb1sndGltZXN0YW1wJ10gPSBuZXcgRGF0ZShEYXRlLm5vdygpKS50b0lTT1N0cmluZygpO1xuICAgICAgICAgIGFnZW50SW5mby5ob3N0ID0gYWdlbnQubWFuYWdlcjtcbiAgICAgICAgICBhZ2VudEluZm8uY2x1c3RlciA9IHtcbiAgICAgICAgICAgIG5hbWU6IGFwaUhvc3QuY2x1c3Rlck5hbWUgPyBhcGlIb3N0LmNsdXN0ZXJOYW1lIDogJ2Rpc2FibGVkJyxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHJldHVybiBgeyBcImluZGV4XCI6ICB7IFwiX2luZGV4XCI6IFwiJHtpbmRleE5hbWV9XCIgfSB9XFxuJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgIGFnZW50SW5mbyxcbiAgICAgICAgICApfVxcbmA7XG4gICAgICAgIH0pXG4gICAgICAgIC5qb2luKCcnKTtcblxuICAgICAgYXdhaXQgY29udGV4dC5jb3JlLm9wZW5zZWFyY2guY2xpZW50LmFzSW50ZXJuYWxVc2VyLmJ1bGsoe1xuICAgICAgICBpbmRleDogaW5kZXhOYW1lLFxuICAgICAgICBib2R5OiBib2R5QnVsayxcbiAgICAgIH0pO1xuICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuaW5mbyhcbiAgICAgICAgYEJ1bGsgZGF0YSB0byBpbmRleCAke2luZGV4TmFtZX0gZm9yICR7YWdlbnRzLmxlbmd0aH0gYWdlbnRzIGNvbXBsZXRlZGAsXG4gICAgICApO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb250ZXh0LndhenVoLmxvZ2dlci5lcnJvcihcbiAgICAgIGBFcnJvciBpbnNlcnRpbmcgYWdlbnQgZGF0YSBpbnRvIGVsYXN0aWNzZWFyY2guIEJ1bGsgcmVxdWVzdCBmYWlsZWQgZHVlIHRvICR7XG4gICAgICAgIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3JcbiAgICAgIH1gLFxuICAgICk7XG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgdGhlIHdhenVoLW1vbml0b3JpbmcgaW5kZXhcbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBjb250ZXh0XG4gKiBAcGFyYW0ge1N0cmluZ30gaW5kZXhOYW1lIFRoZSBuYW1lIGZvciB0aGUgaW5kZXggKGUuZy4gZGFpbHk6IHdhenVoLW1vbml0b3JpbmctWVlZWS5NTS5ERClcbiAqL1xuYXN5bmMgZnVuY3Rpb24gY3JlYXRlSW5kZXgoY29udGV4dCwgaW5kZXhOYW1lOiBzdHJpbmcpIHtcbiAgdHJ5IHtcbiAgICBpZiAoIU1PTklUT1JJTkdfRU5BQkxFRCkgcmV0dXJuO1xuICAgIGNvbnN0IGFwcENvbmZpZyA9IGF3YWl0IGNvbnRleHQud2F6dWhfY29yZS5jb25maWd1cmF0aW9uLmdldChcbiAgICAgICd3YXp1aC5tb25pdG9yaW5nLnNoYXJkcycsXG4gICAgICAnd2F6dWgubW9uaXRvcmluZy5yZXBsaWNhcycsXG4gICAgKTtcblxuICAgIGNvbnN0IEluZGV4Q29uZmlndXJhdGlvbiA9IHtcbiAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgIGluZGV4OiB7XG4gICAgICAgICAgbnVtYmVyX29mX3NoYXJkczogYXBwQ29uZmlnWyd3YXp1aC5tb25pdG9yaW5nLnNoYXJkcyddLFxuICAgICAgICAgIG51bWJlcl9vZl9yZXBsaWNhczogYXBwQ29uZmlnWyd3YXp1aC5tb25pdG9yaW5nLnJlcGxpY2FzJ10sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG5cbiAgICBjb250ZXh0LndhenVoLmxvZ2dlci5kZWJ1ZyhgQ3JlYXRpbmcgJHtpbmRleE5hbWV9IGluZGV4YCk7XG5cbiAgICBhd2FpdCBjb250ZXh0LmNvcmUub3BlbnNlYXJjaC5jbGllbnQuYXNJbnRlcm5hbFVzZXIuaW5kaWNlcy5jcmVhdGUoe1xuICAgICAgaW5kZXg6IGluZGV4TmFtZSxcbiAgICAgIGJvZHk6IEluZGV4Q29uZmlndXJhdGlvbixcbiAgICB9KTtcblxuICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmluZm8oYCR7aW5kZXhOYW1lfSBpbmRleCBjcmVhdGVkYCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29udGV4dC53YXp1aC5sb2dnZXIuZXJyb3IoXG4gICAgICBgQ291bGQgbm90IGNyZWF0ZSAke2luZGV4TmFtZX0gaW5kZXg6ICR7ZXJyb3IubWVzc2FnZSB8fCBlcnJvcn1gLFxuICAgICk7XG4gIH1cbn1cblxuLyoqXG4gKiBXYWl0IHVudGlsIEtpYmFuYSBzZXJ2ZXIgaXMgcmVhZHlcbiAqL1xuYXN5bmMgZnVuY3Rpb24gY2hlY2tQbHVnaW5QbGF0Zm9ybVN0YXR1cyhjb250ZXh0KSB7XG4gIHRyeSB7XG4gICAgY29udGV4dC53YXp1aC5sb2dnZXIuZGVidWcoJ1dhaXRpbmcgZm9yIHBsYXRmb3JtIHNlcnZlcnMgdG8gYmUgcmVhZHkuLi4nKTtcblxuICAgIGF3YWl0IGNoZWNrRWxhc3RpY3NlYXJjaFNlcnZlcihjb250ZXh0KTtcbiAgICBhd2FpdCBpbml0KGNvbnRleHQpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmVycm9yKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBkZWxheUFzUHJvbWlzZSgzMDAwKTtcbiAgICAgIGF3YWl0IGNoZWNrUGx1Z2luUGxhdGZvcm1TdGF0dXMoY29udGV4dCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHt9XG4gIH1cbn1cblxuLyoqXG4gKiBDaGVjayBFbGFzdGljc2VhcmNoIFNlcnZlciBzdGF0dXMgYW5kIEtpYmFuYSBpbmRleCBwcmVzZW5jZVxuICovXG5hc3luYyBmdW5jdGlvbiBjaGVja0VsYXN0aWNzZWFyY2hTZXJ2ZXIoY29udGV4dCkge1xuICB0cnkge1xuICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKFxuICAgICAgYENoZWNraW5nIHRoZSBleGlzdGVuY2Ugb2YgJHtjb250ZXh0LnNlcnZlci5jb25maWcub3BlbnNlYXJjaERhc2hib2FyZHMuaW5kZXh9IGluZGV4YCxcbiAgICApO1xuICAgIGNvbnN0IGRhdGEgPVxuICAgICAgYXdhaXQgY29udGV4dC5jb3JlLm9wZW5zZWFyY2guY2xpZW50LmFzSW50ZXJuYWxVc2VyLmluZGljZXMuZXhpc3RzKHtcbiAgICAgICAgaW5kZXg6IGNvbnRleHQuc2VydmVyLmNvbmZpZy5vcGVuc2VhcmNoRGFzaGJvYXJkcy5pbmRleCxcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIGRhdGEuYm9keTtcbiAgICAvLyBUT0RPOiBjaGVjayBpZiBFbGFzdGljc2VhcmNoIGNhbiByZWNlaXZlIHJlcXVlc3RzXG4gICAgLy8gaWYgKGRhdGEpIHtcbiAgICAvLyAgIGNvbnN0IHBsdWdpbnNEYXRhID0gYXdhaXQgdGhpcy5zZXJ2ZXIucGx1Z2lucy5lbGFzdGljc2VhcmNoLndhaXRVbnRpbFJlYWR5KCk7XG4gICAgLy8gICByZXR1cm4gcGx1Z2luc0RhdGE7XG4gICAgLy8gfVxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChkYXRhKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb250ZXh0LndhenVoLmxvZ2dlci5lcnJvcihlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICB9XG59XG5cbi8qKlxuICogVGFzayB1c2VkIGJ5IHRoZSBjcm9uIGpvYi5cbiAqL1xuYXN5bmMgZnVuY3Rpb24gY3JvblRhc2soY29udGV4dCkge1xuICB0cnkge1xuICAgIGNvbnN0IHRlbXBsYXRlTW9uaXRvcmluZyA9XG4gICAgICBhd2FpdCBjb250ZXh0LmNvcmUub3BlbnNlYXJjaC5jbGllbnQuYXNJbnRlcm5hbFVzZXIuaW5kaWNlcy5nZXRUZW1wbGF0ZSh7XG4gICAgICAgIG5hbWU6IFdBWlVIX01PTklUT1JJTkdfVEVNUExBVEVfTkFNRSxcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgYXBpSG9zdHMgPSBhd2FpdCBjb250ZXh0LndhenVoX2NvcmUubWFuYWdlSG9zdHMuZ2V0RW50cmllcyh7XG4gICAgICBleGNsdWRlUGFzc3dvcmQ6IHRydWUsXG4gICAgfSk7XG5cbiAgICBpZiAoIWFwaUhvc3RzLmxlbmd0aCkge1xuICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIud2FybignVGhlcmUgYXJlIG5vIEFQSSBob3N0IGVudHJpZXMuIFNraXAuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGFwaUhvc3RzVW5pcXVlID0gKGFwaUhvc3RzIHx8IFtdKS5maWx0ZXIoXG4gICAgICAoYXBpSG9zdCwgaW5kZXgsIHNlbGYpID0+XG4gICAgICAgIGluZGV4ID09PVxuICAgICAgICBzZWxmLmZpbmRJbmRleChcbiAgICAgICAgICB0ID0+XG4gICAgICAgICAgICB0LnVzZXIgPT09IGFwaUhvc3QudXNlciAmJlxuICAgICAgICAgICAgdC5wYXNzd29yZCA9PT0gYXBpSG9zdC5wYXNzd29yZCAmJlxuICAgICAgICAgICAgdC51cmwgPT09IGFwaUhvc3QudXJsICYmXG4gICAgICAgICAgICB0LnBvcnQgPT09IGFwaUhvc3QucG9ydCxcbiAgICAgICAgKSxcbiAgICApO1xuICAgIGZvciAobGV0IGFwaUhvc3Qgb2YgYXBpSG9zdHNVbmlxdWUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgYWdlbnRzLCBhcGlIb3N0OiBob3N0IH0gPSBhd2FpdCBnZXRBcGlJbmZvKGNvbnRleHQsIGFwaUhvc3QpO1xuICAgICAgICBhd2FpdCBpbnNlcnRNb25pdG9yaW5nRGF0YUVsYXN0aWNzZWFyY2goY29udGV4dCwge1xuICAgICAgICAgIGFnZW50cyxcbiAgICAgICAgICBhcGlIb3N0OiBob3N0LFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7fVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAvLyBSZXRyeSB0byBjYWxsIGl0c2VsZiBhZ2FpbiBpZiBLaWJhbmEgaW5kZXggaXMgbm90IHJlYWR5IHlldFxuICAgIC8vIHRyeSB7XG4gICAgLy8gICBpZiAoXG4gICAgLy8gICAgIHRoaXMud3pXcmFwcGVyLmJ1aWxkaW5nS2liYW5hSW5kZXggfHxcbiAgICAvLyAgICAgKChlcnJvciB8fCB7fSkuc3RhdHVzID09PSA0MDQgJiZcbiAgICAvLyAgICAgICAoZXJyb3IgfHwge30pLmRpc3BsYXlOYW1lID09PSAnTm90Rm91bmQnKVxuICAgIC8vICAgKSB7XG4gICAgLy8gICAgIGF3YWl0IGRlbGF5QXNQcm9taXNlKDEwMDApO1xuICAgIC8vICAgICByZXR1cm4gY3JvblRhc2soY29udGV4dCk7XG4gICAgLy8gICB9XG4gICAgLy8gfSBjYXRjaCAoZXJyb3IpIHt9IC8vZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmVycm9yKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICB9XG59XG5cbi8qKlxuICogR2V0IEFQSSBhbmQgYWdlbnRzIGluZm9cbiAqIEBwYXJhbSBjb250ZXh0XG4gKiBAcGFyYW0gYXBpSG9zdFxuICovXG5hc3luYyBmdW5jdGlvbiBnZXRBcGlJbmZvKGNvbnRleHQsIGFwaUhvc3QpIHtcbiAgdHJ5IHtcbiAgICBjb250ZXh0LndhenVoLmxvZ2dlci5kZWJ1ZyhgR2V0dGluZyBBUEkgaW5mbyBmb3IgJHthcGlIb3N0LmlkfWApO1xuICAgIGNvbnN0IHJlc3BvbnNlSXNDbHVzdGVyID1cbiAgICAgIGF3YWl0IGNvbnRleHQud2F6dWguYXBpLmNsaWVudC5hc0ludGVybmFsVXNlci5yZXF1ZXN0KFxuICAgICAgICAnR0VUJyxcbiAgICAgICAgJy9jbHVzdGVyL3N0YXR1cycsXG4gICAgICAgIHt9LFxuICAgICAgICB7IGFwaUhvc3RJRDogYXBpSG9zdC5pZCB9LFxuICAgICAgKTtcbiAgICBjb25zdCBpc0NsdXN0ZXIgPVxuICAgICAgKCgocmVzcG9uc2VJc0NsdXN0ZXIgfHwge30pLmRhdGEgfHwge30pLmRhdGEgfHwge30pLmVuYWJsZWQgPT09ICd5ZXMnO1xuICAgIGlmIChpc0NsdXN0ZXIpIHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlQ2x1c3RlckluZm8gPVxuICAgICAgICBhd2FpdCBjb250ZXh0LndhenVoLmFwaS5jbGllbnQuYXNJbnRlcm5hbFVzZXIucmVxdWVzdChcbiAgICAgICAgICAnR0VUJyxcbiAgICAgICAgICBgL2NsdXN0ZXIvbG9jYWwvaW5mb2AsXG4gICAgICAgICAge30sXG4gICAgICAgICAgeyBhcGlIb3N0SUQ6IGFwaUhvc3QuaWQgfSxcbiAgICAgICAgKTtcbiAgICAgIGFwaUhvc3QuY2x1c3Rlck5hbWUgPVxuICAgICAgICByZXNwb25zZUNsdXN0ZXJJbmZvLmRhdGEuZGF0YS5hZmZlY3RlZF9pdGVtc1swXS5jbHVzdGVyO1xuICAgIH1cbiAgICBjb25zdCBhZ2VudHMgPSBhd2FpdCBmZXRjaEFsbEFnZW50c0Zyb21BcGlIb3N0KGNvbnRleHQsIGFwaUhvc3QpO1xuICAgIHJldHVybiB7IGFnZW50cywgYXBpSG9zdCB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmVycm9yKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbi8qKlxuICogRmV0Y2ggYWxsIGFnZW50cyBmb3IgdGhlIEFQSSBwcm92aWRlZFxuICogQHBhcmFtIGNvbnRleHRcbiAqIEBwYXJhbSBhcGlIb3N0XG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGZldGNoQWxsQWdlbnRzRnJvbUFwaUhvc3QoY29udGV4dCwgYXBpSG9zdCkge1xuICBsZXQgYWdlbnRzID0gW107XG4gIHRyeSB7XG4gICAgY29udGV4dC53YXp1aC5sb2dnZXIuZGVidWcoYEdldHRpbmcgYWxsIGFnZW50cyBmcm9tIEFwaUlEOiAke2FwaUhvc3QuaWR9YCk7XG4gICAgY29uc3QgcmVzcG9uc2VBZ2VudHNDb3VudCA9XG4gICAgICBhd2FpdCBjb250ZXh0LndhenVoLmFwaS5jbGllbnQuYXNJbnRlcm5hbFVzZXIucmVxdWVzdChcbiAgICAgICAgJ0dFVCcsXG4gICAgICAgICcvYWdlbnRzJyxcbiAgICAgICAge1xuICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICAgICAgbGltaXQ6IDEsXG4gICAgICAgICAgICBxOiAnaWQhPTAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgeyBhcGlIb3N0SUQ6IGFwaUhvc3QuaWQgfSxcbiAgICAgICk7XG5cbiAgICBjb25zdCBhZ2VudHNDb3VudCA9IHJlc3BvbnNlQWdlbnRzQ291bnQuZGF0YS5kYXRhLnRvdGFsX2FmZmVjdGVkX2l0ZW1zO1xuICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKFxuICAgICAgYEFwaUlEOiAke2FwaUhvc3QuaWR9LCBBZ2VudCBjb3VudDogJHthZ2VudHNDb3VudH1gLFxuICAgICk7XG5cbiAgICBsZXQgcGF5bG9hZCA9IHtcbiAgICAgIG9mZnNldDogMCxcbiAgICAgIGxpbWl0OiA1MDAsXG4gICAgICBxOiAnaWQhPTAwMCcsXG4gICAgfTtcblxuICAgIHdoaWxlIChhZ2VudHMubGVuZ3RoIDwgYWdlbnRzQ291bnQgJiYgcGF5bG9hZC5vZmZzZXQgPCBhZ2VudHNDb3VudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLypcbiAgICAgICAgVE9ETzogSW1wcm92ZSB0aGUgcGVyZm9ybWFuY2Ugb2YgcmVxdWVzdCB3aXRoOlxuICAgICAgICAgIC0gUmVkdWNlIHRoZSBudW1iZXIgb2YgcmVxdWVzdHMgdG8gdGhlIFdhenVoIEFQSVxuICAgICAgICAgIC0gUmVkdWNlIChpZiBwb3NzaWJsZSkgdGhlIHF1YW50aXR5IG9mIGRhdGEgdG8gaW5kZXggYnkgZG9jdW1lbnRcblxuICAgICAgICBSZXF1aXJlbWVudHM6XG4gICAgICAgICAgLSBSZXNlYXJjaCBhYm91dCB0aGUgbmVjY2VzYXJ5IGRhdGEgdG8gaW5kZXguXG5cbiAgICAgICAgSG93IHRvIGRvOlxuICAgICAgICAgIC0gV2F6dWggQVBJIHJlcXVlc3Q6XG4gICAgICAgICAgICAtIHNlbGVjdCB0aGUgcmVxdWlyZWQgZGF0YSB0byByZXRyaWV2ZSBkZXBlbmRpbmcgb24gaXMgcmVxdWlyZWQgdG8gaW5kZXggKHVzaW5nIHRoZSBgc2VsZWN0YCBxdWVyeSBwYXJhbSlcbiAgICAgICAgICAgIC0gaW5jcmVhc2UgdGhlIGxpbWl0IG9mIHJlc3VsdHMgdG8gcmV0cmlldmUgKGN1cnJlbnRseSwgdGhlIHJlcXVlc3RzIHVzZSB0aGUgcmVjb21tZW5kZWQgdmFsdWU6IDUwMCkuXG4gICAgICAgICAgICAgIFNlZSB0aGUgYWxsb3dlZCB2YWx1ZXMuIFRoaXMgZGVwZW5kcyBvbiB0aGUgc2VsZWN0ZWQgZGF0YSBiZWNhdXNlIHRoZSByZXNwb25zZSBjb3VsZCBmYWlsIGlmIGNvbnRhaW5zIGEgbG90IG9mIGRhdGFcbiAgICAgICAgKi9cbiAgICAgICAgY29uc3QgcmVzcG9uc2VBZ2VudHMgPVxuICAgICAgICAgIGF3YWl0IGNvbnRleHQud2F6dWguYXBpLmNsaWVudC5hc0ludGVybmFsVXNlci5yZXF1ZXN0KFxuICAgICAgICAgICAgJ0dFVCcsXG4gICAgICAgICAgICBgL2FnZW50c2AsXG4gICAgICAgICAgICB7IHBhcmFtczogcGF5bG9hZCB9LFxuICAgICAgICAgICAgeyBhcGlIb3N0SUQ6IGFwaUhvc3QuaWQgfSxcbiAgICAgICAgICApO1xuICAgICAgICBhZ2VudHMgPSBbLi4uYWdlbnRzLCAuLi5yZXNwb25zZUFnZW50cy5kYXRhLmRhdGEuYWZmZWN0ZWRfaXRlbXNdO1xuICAgICAgICBwYXlsb2FkLm9mZnNldCArPSBwYXlsb2FkLmxpbWl0O1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZXJyb3IoXG4gICAgICAgICAgYEFwaUlEOiAke2FwaUhvc3QuaWR9LCBFcnJvciByZXF1ZXN0IHdpdGggb2Zmc2V0L2xpbWl0ICR7XG4gICAgICAgICAgICBwYXlsb2FkLm9mZnNldFxuICAgICAgICAgIH0vJHtwYXlsb2FkLmxpbWl0fTogJHtlcnJvci5tZXNzYWdlIHx8IGVycm9yfWAsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhZ2VudHM7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29udGV4dC53YXp1aC5sb2dnZXIuZXJyb3IoXG4gICAgICBgQXBpSUQ6ICR7YXBpSG9zdC5pZH0uIEVycm9yOiAke2Vycm9yLm1lc3NhZ2UgfHwgZXJyb3J9YCxcbiAgICApO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbi8qKlxuICogU3RhcnQgdGhlIGNyb24gam9iXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBqb2JNb25pdG9yaW5nUnVuKGNvbnRleHQpIHtcbiAgY29udGV4dC53YXp1aC5sb2dnZXIuZGVidWcoJ1Rhc2s6TW9uaXRvcmluZyBpbml0aWFsaXppbmcnKTtcbiAgLy8gSW5pdCB0aGUgbW9uaXRvcmluZyB2YXJpYWJsZXNcbiAgYXdhaXQgaW5pdE1vbml0b3JpbmdDb25maWd1cmF0aW9uKGNvbnRleHQpO1xuICAvLyBDaGVjayBLaWJhbmEgaW5kZXggYW5kIGlmIGl0IGlzIHByZXBhcmVkLCBzdGFydCB0aGUgaW5pdGlhbGl6YXRpb24gb2YgV2F6dWggQXBwLlxuICBhd2FpdCBjaGVja1BsdWdpblBsYXRmb3JtU3RhdHVzKGNvbnRleHQpO1xuICAvLyAvLyBSdW4gdGhlIGNyb24gam9iIG9ubHkgaXQgaXQncyBlbmFibGVkXG4gIGlmIChNT05JVE9SSU5HX0VOQUJMRUQpIHtcbiAgICBjcm9uVGFzayhjb250ZXh0KTtcbiAgICBjcm9uLnNjaGVkdWxlKE1PTklUT1JJTkdfQ1JPTl9GUkVRLCAoKSA9PiBjcm9uVGFzayhjb250ZXh0KSk7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBV0EsSUFBQUEsU0FBQSxHQUFBQyxzQkFBQSxDQUFBQyxPQUFBO0FBQ0EsSUFBQUMsbUJBQUEsR0FBQUQsT0FBQTtBQUNBLElBQUFFLFVBQUEsR0FBQUYsT0FBQTtBQUNBLElBQUFHLFVBQUEsR0FBQUgsT0FBQTtBQUNBLElBQUFJLFVBQUEsR0FBQUosT0FBQTtBQUlBLElBQUFLLGdDQUFB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