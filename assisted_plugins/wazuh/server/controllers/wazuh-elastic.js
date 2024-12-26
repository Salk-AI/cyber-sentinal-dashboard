"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WazuhElasticCtrl = void 0;
var _errorResponse = require("../lib/error-response");
var _generateAlertsScript = require("../lib/generate-alerts/generate-alerts-script");
var _constants = require("../../common/constants");
var _decorators = require("./decorators");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /*
 * Wazuh app - Class for Wazuh-Elastic functions
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
class WazuhElasticCtrl {
  constructor() {
    /**
     * This creates sample alerts in wazuh-sample-alerts
     * POST /elastic/samplealerts/{category}
     * {
     *   "manager": {
     *      "name": "manager_name"
     *    },
     *    cluster: {
     *      name: "mycluster",
     *      node: "mynode"
     *    }
     * }
     * @param {*} context
     * @param {*} request
     * @param {*} response
     * {index: string, alerts: [...], count: number} or ErrorResponse
     */
    _defineProperty(this, "createSampleAlerts", (0, _decorators.routeDecoratorProtectedAdministrator)(1000)(async (context, request, response) => {
      const sampleAlertsIndex = await this.buildSampleIndexByCategory(context, request.params.category);
      try {
        const bulkPrefix = JSON.stringify({
          index: {
            _index: sampleAlertsIndex
          }
        });
        const alertGenerateParams = request.body && request.body.params || {};
        const sampleAlerts = _constants.WAZUH_SAMPLE_ALERTS_CATEGORIES_TYPE_ALERTS[request.params.category].map(typeAlert => (0, _generateAlertsScript.generateAlerts)({
          ...typeAlert,
          ...alertGenerateParams
        }, request.body.alerts || typeAlert.alerts || _constants.WAZUH_SAMPLE_ALERTS_DEFAULT_NUMBER_ALERTS)).flat();
        const bulk = sampleAlerts.map(sampleAlert => `${bulkPrefix}\n${JSON.stringify(sampleAlert)}\n`).join('');

        // Index alerts

        // Check if wazuh sample alerts index exists
        const existsSampleIndex = await context.core.opensearch.client.asCurrentUser.indices.exists({
          index: sampleAlertsIndex
        });
        if (!existsSampleIndex.body) {
          // Create wazuh sample alerts index

          const configuration = {
            settings: {
              index: {
                number_of_shards: _constants.WAZUH_SAMPLE_ALERTS_INDEX_SHARDS,
                number_of_replicas: _constants.WAZUH_SAMPLE_ALERTS_INDEX_REPLICAS
              }
            }
          };
          await context.core.opensearch.client.asCurrentUser.indices.create({
            index: sampleAlertsIndex,
            body: configuration
          });
          context.wazuh.logger.info(`Index ${sampleAlertsIndex} created`);
        }
        await context.core.opensearch.client.asCurrentUser.bulk({
          index: sampleAlertsIndex,
          body: bulk
        });
        context.wazuh.logger.info(`Added sample alerts to ${sampleAlertsIndex} index`);
        return response.ok({
          body: {
            index: sampleAlertsIndex,
            alertCount: sampleAlerts.length
          }
        });
      } catch (error) {
        context.wazuh.logger.error(`Error adding sample alerts to ${sampleAlertsIndex} index: ${error.message || error}`);
        const [statusCode, errorMessage] = this.getErrorDetails(error);
        return (0, _errorResponse.ErrorResponse)(errorMessage || error, 1000, statusCode, response);
      }
    }));
    /**
     * This deletes sample alerts
     * @param {*} context
     * @param {*} request
     * @param {*} response
     * {result: "deleted", index: string} or ErrorResponse
     */
    _defineProperty(this, "deleteSampleAlerts", (0, _decorators.routeDecoratorProtectedAdministrator)(1000)(async (context, request, response) => {
      // Delete Wazuh sample alert index
      const sampleAlertsIndex = await this.buildSampleIndexByCategory(context, request.params.category);
      try {
        // Check if Wazuh sample alerts index exists
        const existsSampleIndex = await context.core.opensearch.client.asCurrentUser.indices.exists({
          index: sampleAlertsIndex
        });
        if (existsSampleIndex.body) {
          // Delete Wazuh sample alerts index
          await context.core.opensearch.client.asCurrentUser.indices.delete({
            index: sampleAlertsIndex
          });
          context.wazuh.logger.info(`Deleted ${sampleAlertsIndex} index`);
          return response.ok({
            body: {
              result: 'deleted',
              index: sampleAlertsIndex
            }
          });
        } else {
          return (0, _errorResponse.ErrorResponse)(`${sampleAlertsIndex} index doesn't exist`, 1000, 500, response);
        }
      } catch (error) {
        context.wazuh.logger.error(`Error deleting sample alerts of ${sampleAlertsIndex} index: ${error.message || error}`);
        const [statusCode, errorMessage] = this.getErrorDetails(error);
        return (0, _errorResponse.ErrorResponse)(errorMessage || error, 1000, statusCode, response);
      }
    }));
  }

  /**
   * This returns the index according the category
   * @param {string} category
   */
  async buildSampleIndexByCategory(context, category) {
    return `${await context.wazuh_core.configuration.get('alerts.sample.prefix')}sample-${category}`;
  }

  /**
   * This retrieves a template from Elasticsearch
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} template or ErrorResponse
   */
  async getTemplate(context, request, response) {
    try {
      const data = await context.core.opensearch.client.asInternalUser.cat.templates();
      const templates = data.body;
      if (!templates || typeof templates !== 'string') {
        throw new Error(`An unknown error occurred when fetching templates from ${_constants.WAZUH_INDEXER_NAME}`);
      }
      const lastChar = request.params.pattern[request.params.pattern.length - 1];

      // Split into separate patterns
      const tmpdata = templates.match(/\[.*\]/g);
      const tmparray = [];
      for (let item of tmpdata) {
        // A template might use more than one pattern
        if (item.includes(',')) {
          item = item.substr(1).slice(0, -1);
          const subItems = item.split(',');
          for (const subitem of subItems) {
            tmparray.push(`[${subitem.trim()}]`);
          }
        } else {
          tmparray.push(item);
        }
      }

      // Ensure we are handling just patterns
      const array = tmparray.filter(item => item.includes('[') && item.includes(']'));
      const pattern = lastChar === '*' ? request.params.pattern.slice(0, -1) : request.params.pattern;
      const isIncluded = array.filter(item => {
        item = item.slice(1, -1);
        const lastChar = item[item.length - 1];
        item = lastChar === '*' ? item.slice(0, -1) : item;
        return item.includes(pattern) || pattern.includes(item);
      });
      context.wazuh.logger.debug(`Template is valid: ${isIncluded && Array.isArray(isIncluded) && isIncluded.length ? 'yes' : 'no'}`);
      return isIncluded && Array.isArray(isIncluded) && isIncluded.length ? response.ok({
        body: {
          statusCode: 200,
          status: true,
          data: `Template found for ${request.params.pattern}`
        }
      }) : response.ok({
        body: {
          statusCode: 200,
          status: false,
          data: `No template found for ${request.params.pattern}`
        }
      });
    } catch (error) {
      context.wazuh.logger.error(error.message || error);
      return (0, _errorResponse.ErrorResponse)(`Could not retrieve templates from ${_constants.WAZUH_INDEXER_NAME} due to ${error.message || error}`, 4002, 500, response);
    }
  }

  /**
   * This check index-pattern
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} status obj or ErrorResponse
   */

  /**
   * This get the fields keys
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Array<Object>} fields or ErrorResponse
   */
  async getFieldTop(context, request, response) {
    try {
      // Top field payload
      let payload = {
        size: 1,
        query: {
          bool: {
            must: [],
            must_not: {
              term: {
                'agent.id': '000'
              }
            },
            filter: [{
              range: {
                timestamp: {}
              }
            }]
          }
        },
        aggs: {
          '2': {
            terms: {
              field: '',
              size: 1,
              order: {
                _count: 'desc'
              }
            }
          }
        }
      };

      // Set up time interval, default to Last 24h
      const timeGTE = 'now-1d';
      const timeLT = 'now';
      payload.query.bool.filter[0].range['timestamp']['gte'] = timeGTE;
      payload.query.bool.filter[0].range['timestamp']['lt'] = timeLT;

      // Set up match for default cluster name
      payload.query.bool.must.push(request.params.mode === 'cluster' ? {
        match: {
          'cluster.name': request.params.cluster
        }
      } : {
        match: {
          'manager.name': request.params.cluster
        }
      });
      if (request.query.agentsList) payload.query.bool.filter.push({
        terms: {
          'agent.id': request.query.agentsList.split(',')
        }
      });
      payload.aggs['2'].terms.field = request.params.field;
      const data = await context.core.opensearch.client.asCurrentUser.search({
        size: 1,
        index: request.params.pattern,
        body: payload
      });
      return data.body.hits.total.value === 0 || typeof data.body.aggregations['2'].buckets[0] === 'undefined' ? response.ok({
        body: {
          statusCode: 200,
          data: ''
        }
      }) : response.ok({
        body: {
          statusCode: 200,
          data: data.body.aggregations['2'].buckets[0].key
        }
      });
    } catch (error) {
      context.wazuh.logger.error(error.message || error);
      return (0, _errorResponse.ErrorResponse)(error.message || error, 4004, 500, response);
    }
  }

  /**
   * Checks for minimum index pattern fields in a list of index patterns.
   * @param {Array<Object>} indexPatternList List of index patterns
   */
  validateIndexPattern(indexPatternList) {
    const minimum = ['timestamp', 'rule.groups', 'manager.name', 'agent.id'];
    let list = [];
    for (const index of indexPatternList) {
      let valid, parsed;
      try {
        parsed = JSON.parse(index.attributes.fields);
      } catch (error) {
        continue;
      }
      valid = parsed.filter(item => minimum.includes(item.name));
      if (valid.length === 4) {
        list.push({
          id: index.id,
          title: index.attributes.title
        });
      }
    }
    return list;
  }

  /**
   * Returns current security platform
   * @param {Object} req
   * @param {Object} reply
   * @returns {String}
   */
  async getCurrentPlatform(context, request, response) {
    try {
      return response.ok({
        body: {
          platform: context.wazuh.security.platform
        }
      });
    } catch (error) {
      context.wazuh.logger.error(error.message || error);
      return (0, _errorResponse.ErrorResponse)(error.message || error, 4011, 500, response);
    }
  }

  /**
   * Replaces visualizations main fields to fit a certain pattern.
   * @param {Array<Object>} app_objects Object containing raw visualizations.
   * @param {String} id Index-pattern id to use in the visualizations. Eg: 'wazuh-alerts'
   */
  async buildVisualizationsRaw(context, app_objects, id, namespace = false) {
    const config = await context.wazuh_core.configuration.get();
    let monitoringPattern = `${config['wazuh.monitoring.pattern']}`;
    context.wazuh.logger.debug(`Building ${app_objects.length} visualizations`);
    context.wazuh.logger.debug(`Index pattern ID: ${id}`);
    const visArray = [];
    let aux_source, bulk_content;
    for (let element of app_objects) {
      aux_source = JSON.parse(JSON.stringify(element._source));

      // Replace index-pattern for visualizations
      if (aux_source && aux_source.kibanaSavedObjectMeta && aux_source.kibanaSavedObjectMeta.searchSourceJSON && typeof aux_source.kibanaSavedObjectMeta.searchSourceJSON === 'string') {
        const defaultStr = aux_source.kibanaSavedObjectMeta.searchSourceJSON;
        const isMonitoring = defaultStr.includes('wazuh-monitoring');
        if (isMonitoring) {
          if (namespace && namespace !== 'default') {
            if (monitoringPattern.includes(namespace) && monitoringPattern.includes('index-pattern:')) {
              monitoringPattern = monitoringPattern.split('index-pattern:')[1];
            }
          }
          aux_source.kibanaSavedObjectMeta.searchSourceJSON = defaultStr.replace(/wazuh-monitoring/g, monitoringPattern[monitoringPattern.length - 1] === '*' || namespace && namespace !== 'default' ? monitoringPattern : monitoringPattern + '*');
        } else {
          aux_source.kibanaSavedObjectMeta.searchSourceJSON = defaultStr.replace(/wazuh-alerts/g, id);
        }
      }

      // Replace index-pattern for selector visualizations
      if (typeof (aux_source || {}).visState === 'string') {
        aux_source.visState = aux_source.visState.replace(/wazuh-alerts/g, id);
      }

      // Bulk source
      bulk_content = {};
      bulk_content[element._type] = aux_source;
      visArray.push({
        attributes: bulk_content.visualization,
        type: element._type,
        id: element._id,
        _version: bulk_content.visualization.version
      });
    }
    return visArray;
  }

  /**
   * Replaces cluster visualizations main fields.
   * @param {Array<Object>} app_objects Object containing raw visualizations.
   * @param {String} id Index-pattern id to use in the visualizations. Eg: 'wazuh-alerts'
   * @param {Array<String>} nodes Array of node names. Eg: ['node01', 'node02']
   * @param {String} name Cluster name. Eg: 'wazuh'
   * @param {String} master_node Master node name. Eg: 'node01'
   */
  buildClusterVisualizationsRaw(context, app_objects, id, nodes = [], name, master_node, pattern_name = '*') {
    try {
      const visArray = [];
      let aux_source, bulk_content;
      for (const element of app_objects) {
        // Stringify and replace index-pattern for visualizations
        aux_source = JSON.stringify(element._source);
        aux_source = aux_source.replace(/wazuh-alerts/g, id);
        aux_source = JSON.parse(aux_source);

        // Bulk source
        bulk_content = {};
        bulk_content[element._type] = aux_source;
        const visState = JSON.parse(bulk_content.visualization.visState);
        const title = visState.title;
        if (title.startsWith('App Statistics')) {
          const filter = bulk_content.visualization.kibanaSavedObjectMeta.searchSourceJSON.replace('"filter":[]', `"filter":[{"bool":{"must":[{"match":{"apiName":"'${master_node}'"}}${name && name !== 'all' ? `,{"match":{"nodeName":"'${name}'"}}` : ''}]}}]`);
          bulk_content.visualization.kibanaSavedObjectMeta.searchSourceJSON = filter;
        }
        if (visState.type && visState.type === 'timelion') {
          let query = '';
          if (title === 'App Cluster Overview') {
            for (const node of nodes) {
              query += `.es(index=${pattern_name},q="cluster.name: ${name} AND cluster.node: ${node.name}").label("${node.name}"),`;
            }
            query = query.substring(0, query.length - 1);
          } else if (title === 'App Cluster Overview Manager') {
            query += `.es(index=${pattern_name},q="cluster.name: ${name}").label("${name} cluster")`;
          }
          visState.params.expression = query.replace(/'/g, '"');
          bulk_content.visualization.visState = JSON.stringify(visState);
        }
        visArray.push({
          attributes: bulk_content.visualization,
          type: element._type,
          id: element._id,
          _version: bulk_content.visualization.version
        });
      }
      return visArray;
    } catch (error) {
      context.wazuh.logger.error(error.message || error);
      return Promise.reject(error);
    }
  }

  /**
   * This checks if there is sample alerts
   * GET /elastic/samplealerts
   * @param {*} context
   * @param {*} request
   * @param {*} response
   * {alerts: [...]} or ErrorResponse
   */
  async haveSampleAlerts(context, request, response) {
    try {
      // Check if wazuh sample alerts index exists
      const results = await Promise.all(Object.keys(_constants.WAZUH_SAMPLE_ALERTS_CATEGORIES_TYPE_ALERTS).map(async category => context.core.opensearch.client.asCurrentUser.indices.exists({
        index: await this.buildSampleIndexByCategory(context, category)
      })));
      return response.ok({
        body: {
          sampleAlertsInstalled: results.some(result => result.body)
        }
      });
    } catch (error) {
      return (0, _errorResponse.ErrorResponse)('Sample Alerts category not valid', 1000, 500, response);
    }
  }
  /**
   * This creates sample alerts in wazuh-sample-alerts
   * GET /elastic/samplealerts/{category}
   * @param {*} context
   * @param {*} request
   * @param {*} response
   * {alerts: [...]} or ErrorResponse
   */
  async haveSampleAlertsOfCategory(context, request, response) {
    try {
      const sampleAlertsIndex = await this.buildSampleIndexByCategory(context, request.params.category);
      // Check if wazuh sample alerts index exists
      const existsSampleIndex = await context.core.opensearch.client.asCurrentUser.indices.exists({
        index: sampleAlertsIndex
      });
      return response.ok({
        body: {
          index: sampleAlertsIndex,
          exists: existsSampleIndex.body
        }
      });
    } catch (error) {
      context.wazuh.logger.error(`Error checking if there are sample alerts indices: ${error.message || error}`);
      const [statusCode, errorMessage] = this.getErrorDetails(error);
      return (0, _errorResponse.ErrorResponse)(`Error checking if there are sample alerts indices: ${errorMessage || error}`, 1000, statusCode, response);
    }
  }
  async alerts(context, request, response) {
    try {
      const data = await context.core.opensearch.client.asCurrentUser.search(request.body);
      return response.ok({
        body: data.body
      });
    } catch (error) {
      context.wazuh.logger.error(error.message || error);
      return (0, _errorResponse.ErrorResponse)(error.message || error, 4010, 500, response);
    }
  }

  // Check if there are indices for Statistics
  async existStatisticsIndices(context, request, response) {
    try {
      const config = await context.wazuh_core.configuration.get();
      const statisticsPattern = `${config['cron.prefix']}-${config['cron.statistics.index.name']}*`;
      const existIndex = await context.core.opensearch.client.asCurrentUser.indices.exists({
        index: statisticsPattern,
        allow_no_indices: false
      });
      return response.ok({
        body: existIndex.body
      });
    } catch (error) {
      context.wazuh.logger.error(error.message || error);
      return (0, _errorResponse.ErrorResponse)(error.message || error, 1000, 500, response);
    }
  }
  getErrorDetails(error) {
    var _error$meta;
    const statusCode = (error === null || error === void 0 || (_error$meta = error.meta) === null || _error$meta === void 0 ? void 0 : _error$meta.statusCode) || 500;
    let errorMessage = error.message;
    if (statusCode === 403) {
      var _error$meta2;
      errorMessage = (error === null || error === void 0 || (_error$meta2 = error.meta) === null || _error$meta2 === void 0 || (_error$meta2 = _error$meta2.body) === null || _error$meta2 === void 0 || (_error$meta2 = _error$meta2.error) === null || _error$meta2 === void 0 ? void 0 : _error$meta2.reason) || 'Permission denied';
    }
    return [statusCode, errorMessage];
  }
}
exports.WazuhElasticCtrl = WazuhElasticCtrl;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXJyb3JSZXNwb25zZSIsInJlcXVpcmUiLCJfZ2VuZXJhdGVBbGVydHNTY3JpcHQiLCJfY29uc3RhbnRzIiwiX2RlY29yYXRvcnMiLCJfZGVmaW5lUHJvcGVydHkiLCJvYmoiLCJrZXkiLCJ2YWx1ZSIsIl90b1Byb3BlcnR5S2V5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJhcmciLCJfdG9QcmltaXRpdmUiLCJTdHJpbmciLCJpbnB1dCIsImhpbnQiLCJwcmltIiwiU3ltYm9sIiwidG9QcmltaXRpdmUiLCJ1bmRlZmluZWQiLCJyZXMiLCJjYWxsIiwiVHlwZUVycm9yIiwiTnVtYmVyIiwiV2F6dWhFbGFzdGljQ3RybCIsImNvbnN0cnVjdG9yIiwicm91dGVEZWNvcmF0b3JQcm90ZWN0ZWRBZG1pbmlzdHJhdG9yIiwiY29udGV4dCIsInJlcXVlc3QiLCJyZXNwb25zZSIsInNhbXBsZUFsZXJ0c0luZGV4IiwiYnVpbGRTYW1wbGVJbmRleEJ5Q2F0ZWdvcnkiLCJwYXJhbXMiLCJjYXRlZ29yeSIsImJ1bGtQcmVmaXgiLCJKU09OIiwic3RyaW5naWZ5IiwiaW5kZXgiLCJfaW5kZXgiLCJhbGVydEdlbmVyYXRlUGFyYW1zIiwiYm9keSIsInNhbXBsZUFsZXJ0cyIsIldBWlVIX1NBTVBMRV9BTEVSVFNfQ0FURUdPUklFU19UWVBFX0FMRVJUUyIsIm1hcCIsInR5cGVBbGVydCIsImdlbmVyYXRlQWxlcnRzIiwiYWxlcnRzIiwiV0FaVUhfU0FNUExFX0FMRVJUU19ERUZBVUxUX05VTUJFUl9BTEVSVFMiLCJmbGF0IiwiYnVsayIsInNhbXBsZUFsZXJ0Iiwiam9pbiIsImV4aXN0c1NhbXBsZUluZGV4IiwiY29yZSIsIm9wZW5zZWFyY2giLCJjbGllbnQiLCJhc0N1cnJlbnRVc2VyIiwiaW5kaWNlcyIsImV4aXN0cyIsImNvbmZpZ3VyYXRpb24iLCJzZXR0aW5ncyIsIm51bWJlcl9vZl9zaGFyZHMiLCJXQVpVSF9TQU1QTEVfQUxFUlRTX0lOREVYX1NIQVJEUyIsIm51bWJlcl9vZl9yZXBsaWNhcyIsIldBWlVIX1NBTVBMRV9BTEVSVFNfSU5ERVhfUkVQTElDQVMiLCJjcmVhdGUiLCJ3YXp1aCIsImxvZ2dlciIsImluZm8iLCJvayIsImFsZXJ0Q291bnQiLCJsZW5ndGgiLCJlcnJvciIsIm1lc3NhZ2UiLCJzdGF0dXNDb2RlIiwiZXJyb3JNZXNzYWdlIiwiZ2V0RXJyb3JEZXRhaWxzIiwiRXJyb3JSZXNwb25zZSIsImRlbGV0ZSIsInJlc3VsdCIsIndhenVoX2NvcmUiLCJnZXQiLCJnZXRUZW1wbGF0ZSIsImRhdGEiLCJhc0ludGVybmFsVXNlciIsImNhdCIsInRlbXBsYXRlcyIsIkVycm9yIiwiV0FaVUhfSU5ERVhFUl9OQU1FIiwibGFzdENoYXIiLCJwYXR0ZXJuIiwidG1wZGF0YSIsIm1hdGNoIiwidG1wYXJyYXkiLCJpdGVtIiwiaW5jbHVkZXMiLCJzdWJzdHIiLCJzbGljZSIsInN1Ykl0ZW1zIiwic3BsaXQiLCJzdWJpdGVtIiwicHVzaCIsInRyaW0iLCJhcnJheSIsImZpbHRlciIsImlzSW5jbHVkZWQiLCJkZWJ1ZyIsIkFycmF5IiwiaXNBcnJheSIsInN0YXR1cyIsImdldEZpZWxkVG9wIiwicGF5bG9hZCIsInNpemUiLCJxdWVyeSIsImJvb2wiLCJtdXN0IiwibXVzdF9ub3QiLCJ0ZXJtIiwicmFuZ2UiLCJ0aW1lc3RhbXAiLCJhZ2dzIiwidGVybXMiLCJmaWVsZCIsIm9yZGVyIiwiX2NvdW50IiwidGltZUdURSIsInRpbWVMVCIsIm1vZGUiLCJjbHVzdGVyIiwiYWdlbnRzTGlzdCIsInNlYXJjaCIsImhpdHMiLCJ0b3RhbCIsImFnZ3JlZ2F0aW9ucyIsImJ1Y2tldHMiLCJ2YWxpZGF0ZUluZGV4UGF0dGVybiIsImluZGV4UGF0dGVybkxpc3QiLCJtaW5pbXVtIiwibGlzdCIsInZhbGlkIiwicGFyc2VkIiwicGFyc2UiLCJhdHRyaWJ1dGVzIiwiZmllbGRzIiwibmFtZSIsImlkIiwidGl0bGUiLCJnZXRDdXJyZW50UGxhdGZvcm0iLCJwbGF0Zm9ybSIsInNlY3VyaXR5IiwiYnVpbGRWaXN1YWxpemF0aW9uc1JhdyIsImFwcF9vYmplY3RzIiwibmFtZXNwYWNlIiwiY29uZmlnIiwibW9uaXRvcmluZ1BhdHRlcm4iLCJ2aXNBcnJheSIsImF1eF9zb3VyY2UiLCJidWxrX2NvbnRlbnQiLCJlbGVtZW50IiwiX3NvdXJjZSIsImtpYmFuYVNhdmVkT2JqZWN0TWV0YSIsInNlYXJjaFNvdXJjZUpTT04iLCJkZWZhdWx0U3RyIiwiaXNNb25pdG9yaW5nIiwicmVwbGFjZSIsInZpc1N0YXRlIiwiX3R5cGUiLCJ2aXN1YWxpemF0aW9uIiwidHlwZSIsIl9pZCIsIl92ZXJzaW9uIiwidmVyc2lvbiIsImJ1aWxkQ2x1c3RlclZpc3VhbGl6YXRpb25zUmF3Iiwibm9kZXMiLCJtYXN0ZXJfbm9kZSIsInBhdHRlcm5fbmFtZSIsInN0YXJ0c1dpdGgiLCJub2RlIiwic3Vic3RyaW5nIiwiZXhwcmVzc2lvbiIsIlByb21pc2UiLCJyZWplY3QiLCJoYXZlU2FtcGxlQWxlcnRzIiwicmVzdWx0cyIsImFsbCIsImtleXMiLCJzYW1wbGVBbGVydHNJbnN0YWxsZWQiLCJzb21lIiwiaGF2ZVNhbXBsZUFsZXJ0c09mQ2F0ZWdvcnkiLCJleGlzdFN0YXRpc3RpY3NJbmRpY2VzIiwic3RhdGlzdGljc1BhdHRlcm4iLCJleGlzdEluZGV4IiwiYWxsb3dfbm9faW5kaWNlcyIsIl9lcnJvciRtZXRhIiwibWV0YSIsIl9lcnJvciRtZXRhMiIsInJlYXNvbiIsImV4cG9ydHMiXSwic291cmNlcyI6WyJ3YXp1aC1lbGFzdGljLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBXYXp1aCBhcHAgLSBDbGFzcyBmb3IgV2F6dWgtRWxhc3RpYyBmdW5jdGlvbnNcbiAqIENvcHlyaWdodCAoQykgMjAxNS0yMDIyIFdhenVoLCBJbmMuXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU7IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uOyBlaXRoZXIgdmVyc2lvbiAyIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBGaW5kIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhpcyBvbiB0aGUgTElDRU5TRSBmaWxlLlxuICovXG5pbXBvcnQgeyBFcnJvclJlc3BvbnNlIH0gZnJvbSAnLi4vbGliL2Vycm9yLXJlc3BvbnNlJztcblxuaW1wb3J0IHsgZ2VuZXJhdGVBbGVydHMgfSBmcm9tICcuLi9saWIvZ2VuZXJhdGUtYWxlcnRzL2dlbmVyYXRlLWFsZXJ0cy1zY3JpcHQnO1xuaW1wb3J0IHtcbiAgV0FaVUhfU0FNUExFX0FMRVJUU19JTkRFWF9TSEFSRFMsXG4gIFdBWlVIX1NBTVBMRV9BTEVSVFNfSU5ERVhfUkVQTElDQVMsXG59IGZyb20gJy4uLy4uL2NvbW1vbi9jb25zdGFudHMnO1xuaW1wb3J0IHtcbiAgT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gIE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxufSBmcm9tICdzcmMvY29yZS9zZXJ2ZXInO1xuaW1wb3J0IHtcbiAgV0FaVUhfU0FNUExFX0FMRVJUU19DQVRFR09SSUVTX1RZUEVfQUxFUlRTLFxuICBXQVpVSF9TQU1QTEVfQUxFUlRTX0RFRkFVTFRfTlVNQkVSX0FMRVJUUyxcbn0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBXQVpVSF9JTkRFWEVSX05BTUUgfSBmcm9tICcuLi8uLi9jb21tb24vY29uc3RhbnRzJztcbmltcG9ydCB7IHJvdXRlRGVjb3JhdG9yUHJvdGVjdGVkQWRtaW5pc3RyYXRvciB9IGZyb20gJy4vZGVjb3JhdG9ycyc7XG5cbmV4cG9ydCBjbGFzcyBXYXp1aEVsYXN0aWNDdHJsIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIC8qKlxuICAgKiBUaGlzIHJldHVybnMgdGhlIGluZGV4IGFjY29yZGluZyB0aGUgY2F0ZWdvcnlcbiAgICogQHBhcmFtIHtzdHJpbmd9IGNhdGVnb3J5XG4gICAqL1xuICBhc3luYyBidWlsZFNhbXBsZUluZGV4QnlDYXRlZ29yeShcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgY2F0ZWdvcnk6IHN0cmluZyxcbiAgKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gYCR7YXdhaXQgY29udGV4dC53YXp1aF9jb3JlLmNvbmZpZ3VyYXRpb24uZ2V0KFxuICAgICAgJ2FsZXJ0cy5zYW1wbGUucHJlZml4JyxcbiAgICApfXNhbXBsZS0ke2NhdGVnb3J5fWA7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyByZXRyaWV2ZXMgYSB0ZW1wbGF0ZSBmcm9tIEVsYXN0aWNzZWFyY2hcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcXVlc3RcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHRlbXBsYXRlIG9yIEVycm9yUmVzcG9uc2VcbiAgICovXG4gIGFzeW5jIGdldFRlbXBsYXRlKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3Q8eyBwYXR0ZXJuOiBzdHJpbmcgfT4sXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICApIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgZGF0YSA9XG4gICAgICAgIGF3YWl0IGNvbnRleHQuY29yZS5vcGVuc2VhcmNoLmNsaWVudC5hc0ludGVybmFsVXNlci5jYXQudGVtcGxhdGVzKCk7XG5cbiAgICAgIGNvbnN0IHRlbXBsYXRlcyA9IGRhdGEuYm9keTtcbiAgICAgIGlmICghdGVtcGxhdGVzIHx8IHR5cGVvZiB0ZW1wbGF0ZXMgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgQW4gdW5rbm93biBlcnJvciBvY2N1cnJlZCB3aGVuIGZldGNoaW5nIHRlbXBsYXRlcyBmcm9tICR7V0FaVUhfSU5ERVhFUl9OQU1FfWAsXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxhc3RDaGFyID1cbiAgICAgICAgcmVxdWVzdC5wYXJhbXMucGF0dGVybltyZXF1ZXN0LnBhcmFtcy5wYXR0ZXJuLmxlbmd0aCAtIDFdO1xuXG4gICAgICAvLyBTcGxpdCBpbnRvIHNlcGFyYXRlIHBhdHRlcm5zXG4gICAgICBjb25zdCB0bXBkYXRhID0gdGVtcGxhdGVzLm1hdGNoKC9cXFsuKlxcXS9nKTtcbiAgICAgIGNvbnN0IHRtcGFycmF5ID0gW107XG4gICAgICBmb3IgKGxldCBpdGVtIG9mIHRtcGRhdGEpIHtcbiAgICAgICAgLy8gQSB0ZW1wbGF0ZSBtaWdodCB1c2UgbW9yZSB0aGFuIG9uZSBwYXR0ZXJuXG4gICAgICAgIGlmIChpdGVtLmluY2x1ZGVzKCcsJykpIHtcbiAgICAgICAgICBpdGVtID0gaXRlbS5zdWJzdHIoMSkuc2xpY2UoMCwgLTEpO1xuICAgICAgICAgIGNvbnN0IHN1Ykl0ZW1zID0gaXRlbS5zcGxpdCgnLCcpO1xuICAgICAgICAgIGZvciAoY29uc3Qgc3ViaXRlbSBvZiBzdWJJdGVtcykge1xuICAgICAgICAgICAgdG1wYXJyYXkucHVzaChgWyR7c3ViaXRlbS50cmltKCl9XWApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0bXBhcnJheS5wdXNoKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEVuc3VyZSB3ZSBhcmUgaGFuZGxpbmcganVzdCBwYXR0ZXJuc1xuICAgICAgY29uc3QgYXJyYXkgPSB0bXBhcnJheS5maWx0ZXIoXG4gICAgICAgIGl0ZW0gPT4gaXRlbS5pbmNsdWRlcygnWycpICYmIGl0ZW0uaW5jbHVkZXMoJ10nKSxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHBhdHRlcm4gPVxuICAgICAgICBsYXN0Q2hhciA9PT0gJyonXG4gICAgICAgICAgPyByZXF1ZXN0LnBhcmFtcy5wYXR0ZXJuLnNsaWNlKDAsIC0xKVxuICAgICAgICAgIDogcmVxdWVzdC5wYXJhbXMucGF0dGVybjtcbiAgICAgIGNvbnN0IGlzSW5jbHVkZWQgPSBhcnJheS5maWx0ZXIoaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0gPSBpdGVtLnNsaWNlKDEsIC0xKTtcbiAgICAgICAgY29uc3QgbGFzdENoYXIgPSBpdGVtW2l0ZW0ubGVuZ3RoIC0gMV07XG4gICAgICAgIGl0ZW0gPSBsYXN0Q2hhciA9PT0gJyonID8gaXRlbS5zbGljZSgwLCAtMSkgOiBpdGVtO1xuICAgICAgICByZXR1cm4gaXRlbS5pbmNsdWRlcyhwYXR0ZXJuKSB8fCBwYXR0ZXJuLmluY2x1ZGVzKGl0ZW0pO1xuICAgICAgfSk7XG4gICAgICBjb250ZXh0LndhenVoLmxvZ2dlci5kZWJ1ZyhcbiAgICAgICAgYFRlbXBsYXRlIGlzIHZhbGlkOiAke1xuICAgICAgICAgIGlzSW5jbHVkZWQgJiYgQXJyYXkuaXNBcnJheShpc0luY2x1ZGVkKSAmJiBpc0luY2x1ZGVkLmxlbmd0aFxuICAgICAgICAgICAgPyAneWVzJ1xuICAgICAgICAgICAgOiAnbm8nXG4gICAgICAgIH1gLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBpc0luY2x1ZGVkICYmIEFycmF5LmlzQXJyYXkoaXNJbmNsdWRlZCkgJiYgaXNJbmNsdWRlZC5sZW5ndGhcbiAgICAgICAgPyByZXNwb25zZS5vayh7XG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgICAgICAgc3RhdHVzOiB0cnVlLFxuICAgICAgICAgICAgICBkYXRhOiBgVGVtcGxhdGUgZm91bmQgZm9yICR7cmVxdWVzdC5wYXJhbXMucGF0dGVybn1gLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KVxuICAgICAgICA6IHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgICAgICBzdGF0dXM6IGZhbHNlLFxuICAgICAgICAgICAgICBkYXRhOiBgTm8gdGVtcGxhdGUgZm91bmQgZm9yICR7cmVxdWVzdC5wYXJhbXMucGF0dGVybn1gLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShcbiAgICAgICAgYENvdWxkIG5vdCByZXRyaWV2ZSB0ZW1wbGF0ZXMgZnJvbSAke1dBWlVIX0lOREVYRVJfTkFNRX0gZHVlIHRvICR7XG4gICAgICAgICAgZXJyb3IubWVzc2FnZSB8fCBlcnJvclxuICAgICAgICB9YCxcbiAgICAgICAgNDAwMixcbiAgICAgICAgNTAwLFxuICAgICAgICByZXNwb25zZSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgY2hlY2sgaW5kZXgtcGF0dGVyblxuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVxdWVzdFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2VcbiAgICogQHJldHVybnMge09iamVjdH0gc3RhdHVzIG9iaiBvciBFcnJvclJlc3BvbnNlXG4gICAqL1xuXG4gIC8qKlxuICAgKiBUaGlzIGdldCB0aGUgZmllbGRzIGtleXNcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcXVlc3RcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlXG4gICAqIEByZXR1cm5zIHtBcnJheTxPYmplY3Q+fSBmaWVsZHMgb3IgRXJyb3JSZXNwb25zZVxuICAgKi9cbiAgYXN5bmMgZ2V0RmllbGRUb3AoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdDxcbiAgICAgIHsgbW9kZTogc3RyaW5nOyBjbHVzdGVyOiBzdHJpbmc7IGZpZWxkOiBzdHJpbmc7IHBhdHRlcm46IHN0cmluZyB9LFxuICAgICAgeyBhZ2VudHNMaXN0OiBzdHJpbmcgfVxuICAgID4sXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICApIHtcbiAgICB0cnkge1xuICAgICAgLy8gVG9wIGZpZWxkIHBheWxvYWRcbiAgICAgIGxldCBwYXlsb2FkID0ge1xuICAgICAgICBzaXplOiAxLFxuICAgICAgICBxdWVyeToge1xuICAgICAgICAgIGJvb2w6IHtcbiAgICAgICAgICAgIG11c3Q6IFtdLFxuICAgICAgICAgICAgbXVzdF9ub3Q6IHtcbiAgICAgICAgICAgICAgdGVybToge1xuICAgICAgICAgICAgICAgICdhZ2VudC5pZCc6ICcwMDAnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbHRlcjogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmFuZ2U6IHsgdGltZXN0YW1wOiB7fSB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBhZ2dzOiB7XG4gICAgICAgICAgJzInOiB7XG4gICAgICAgICAgICB0ZXJtczoge1xuICAgICAgICAgICAgICBmaWVsZDogJycsXG4gICAgICAgICAgICAgIHNpemU6IDEsXG4gICAgICAgICAgICAgIG9yZGVyOiB7IF9jb3VudDogJ2Rlc2MnIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICAvLyBTZXQgdXAgdGltZSBpbnRlcnZhbCwgZGVmYXVsdCB0byBMYXN0IDI0aFxuICAgICAgY29uc3QgdGltZUdURSA9ICdub3ctMWQnO1xuICAgICAgY29uc3QgdGltZUxUID0gJ25vdyc7XG4gICAgICBwYXlsb2FkLnF1ZXJ5LmJvb2wuZmlsdGVyWzBdLnJhbmdlWyd0aW1lc3RhbXAnXVsnZ3RlJ10gPSB0aW1lR1RFO1xuICAgICAgcGF5bG9hZC5xdWVyeS5ib29sLmZpbHRlclswXS5yYW5nZVsndGltZXN0YW1wJ11bJ2x0J10gPSB0aW1lTFQ7XG5cbiAgICAgIC8vIFNldCB1cCBtYXRjaCBmb3IgZGVmYXVsdCBjbHVzdGVyIG5hbWVcbiAgICAgIHBheWxvYWQucXVlcnkuYm9vbC5tdXN0LnB1c2goXG4gICAgICAgIHJlcXVlc3QucGFyYW1zLm1vZGUgPT09ICdjbHVzdGVyJ1xuICAgICAgICAgID8geyBtYXRjaDogeyAnY2x1c3Rlci5uYW1lJzogcmVxdWVzdC5wYXJhbXMuY2x1c3RlciB9IH1cbiAgICAgICAgICA6IHsgbWF0Y2g6IHsgJ21hbmFnZXIubmFtZSc6IHJlcXVlc3QucGFyYW1zLmNsdXN0ZXIgfSB9LFxuICAgICAgKTtcblxuICAgICAgaWYgKHJlcXVlc3QucXVlcnkuYWdlbnRzTGlzdClcbiAgICAgICAgcGF5bG9hZC5xdWVyeS5ib29sLmZpbHRlci5wdXNoKHtcbiAgICAgICAgICB0ZXJtczoge1xuICAgICAgICAgICAgJ2FnZW50LmlkJzogcmVxdWVzdC5xdWVyeS5hZ2VudHNMaXN0LnNwbGl0KCcsJyksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICBwYXlsb2FkLmFnZ3NbJzInXS50ZXJtcy5maWVsZCA9IHJlcXVlc3QucGFyYW1zLmZpZWxkO1xuXG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgY29udGV4dC5jb3JlLm9wZW5zZWFyY2guY2xpZW50LmFzQ3VycmVudFVzZXIuc2VhcmNoKHtcbiAgICAgICAgc2l6ZTogMSxcbiAgICAgICAgaW5kZXg6IHJlcXVlc3QucGFyYW1zLnBhdHRlcm4sXG4gICAgICAgIGJvZHk6IHBheWxvYWQsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGRhdGEuYm9keS5oaXRzLnRvdGFsLnZhbHVlID09PSAwIHx8XG4gICAgICAgIHR5cGVvZiBkYXRhLmJvZHkuYWdncmVnYXRpb25zWycyJ10uYnVja2V0c1swXSA9PT0gJ3VuZGVmaW5lZCdcbiAgICAgICAgPyByZXNwb25zZS5vayh7XG4gICAgICAgICAgICBib2R5OiB7IHN0YXR1c0NvZGU6IDIwMCwgZGF0YTogJycgfSxcbiAgICAgICAgICB9KVxuICAgICAgICA6IHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgICAgICBkYXRhOiBkYXRhLmJvZHkuYWdncmVnYXRpb25zWycyJ10uYnVja2V0c1swXS5rZXksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb250ZXh0LndhenVoLmxvZ2dlci5lcnJvcihlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcbiAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IsIDQwMDQsIDUwMCwgcmVzcG9uc2UpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVja3MgZm9yIG1pbmltdW0gaW5kZXggcGF0dGVybiBmaWVsZHMgaW4gYSBsaXN0IG9mIGluZGV4IHBhdHRlcm5zLlxuICAgKiBAcGFyYW0ge0FycmF5PE9iamVjdD59IGluZGV4UGF0dGVybkxpc3QgTGlzdCBvZiBpbmRleCBwYXR0ZXJuc1xuICAgKi9cbiAgdmFsaWRhdGVJbmRleFBhdHRlcm4oaW5kZXhQYXR0ZXJuTGlzdCkge1xuICAgIGNvbnN0IG1pbmltdW0gPSBbJ3RpbWVzdGFtcCcsICdydWxlLmdyb3VwcycsICdtYW5hZ2VyLm5hbWUnLCAnYWdlbnQuaWQnXTtcbiAgICBsZXQgbGlzdCA9IFtdO1xuICAgIGZvciAoY29uc3QgaW5kZXggb2YgaW5kZXhQYXR0ZXJuTGlzdCkge1xuICAgICAgbGV0IHZhbGlkLCBwYXJzZWQ7XG4gICAgICB0cnkge1xuICAgICAgICBwYXJzZWQgPSBKU09OLnBhcnNlKGluZGV4LmF0dHJpYnV0ZXMuZmllbGRzKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB2YWxpZCA9IHBhcnNlZC5maWx0ZXIoaXRlbSA9PiBtaW5pbXVtLmluY2x1ZGVzKGl0ZW0ubmFtZSkpO1xuICAgICAgaWYgKHZhbGlkLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICBsaXN0LnB1c2goe1xuICAgICAgICAgIGlkOiBpbmRleC5pZCxcbiAgICAgICAgICB0aXRsZTogaW5kZXguYXR0cmlidXRlcy50aXRsZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBsaXN0O1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgY3VycmVudCBzZWN1cml0eSBwbGF0Zm9ybVxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVxXG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXBseVxuICAgKiBAcmV0dXJucyB7U3RyaW5nfVxuICAgKi9cbiAgYXN5bmMgZ2V0Q3VycmVudFBsYXRmb3JtKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3Q8eyB1c2VyOiBzdHJpbmcgfT4sXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICApIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIHBsYXRmb3JtOiBjb250ZXh0LndhenVoLnNlY3VyaXR5LnBsYXRmb3JtLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmVycm9yKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoZXJyb3IubWVzc2FnZSB8fCBlcnJvciwgNDAxMSwgNTAwLCByZXNwb25zZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIHZpc3VhbGl6YXRpb25zIG1haW4gZmllbGRzIHRvIGZpdCBhIGNlcnRhaW4gcGF0dGVybi5cbiAgICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBhcHBfb2JqZWN0cyBPYmplY3QgY29udGFpbmluZyByYXcgdmlzdWFsaXphdGlvbnMuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpZCBJbmRleC1wYXR0ZXJuIGlkIHRvIHVzZSBpbiB0aGUgdmlzdWFsaXphdGlvbnMuIEVnOiAnd2F6dWgtYWxlcnRzJ1xuICAgKi9cbiAgYXN5bmMgYnVpbGRWaXN1YWxpemF0aW9uc1Jhdyhjb250ZXh0LCBhcHBfb2JqZWN0cywgaWQsIG5hbWVzcGFjZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgY29uZmlnID0gYXdhaXQgY29udGV4dC53YXp1aF9jb3JlLmNvbmZpZ3VyYXRpb24uZ2V0KCk7XG4gICAgbGV0IG1vbml0b3JpbmdQYXR0ZXJuID0gYCR7Y29uZmlnWyd3YXp1aC5tb25pdG9yaW5nLnBhdHRlcm4nXX1gO1xuICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKGBCdWlsZGluZyAke2FwcF9vYmplY3RzLmxlbmd0aH0gdmlzdWFsaXphdGlvbnNgKTtcbiAgICBjb250ZXh0LndhenVoLmxvZ2dlci5kZWJ1ZyhgSW5kZXggcGF0dGVybiBJRDogJHtpZH1gKTtcbiAgICBjb25zdCB2aXNBcnJheSA9IFtdO1xuICAgIGxldCBhdXhfc291cmNlLCBidWxrX2NvbnRlbnQ7XG4gICAgZm9yIChsZXQgZWxlbWVudCBvZiBhcHBfb2JqZWN0cykge1xuICAgICAgYXV4X3NvdXJjZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZWxlbWVudC5fc291cmNlKSk7XG5cbiAgICAgIC8vIFJlcGxhY2UgaW5kZXgtcGF0dGVybiBmb3IgdmlzdWFsaXphdGlvbnNcbiAgICAgIGlmIChcbiAgICAgICAgYXV4X3NvdXJjZSAmJlxuICAgICAgICBhdXhfc291cmNlLmtpYmFuYVNhdmVkT2JqZWN0TWV0YSAmJlxuICAgICAgICBhdXhfc291cmNlLmtpYmFuYVNhdmVkT2JqZWN0TWV0YS5zZWFyY2hTb3VyY2VKU09OICYmXG4gICAgICAgIHR5cGVvZiBhdXhfc291cmNlLmtpYmFuYVNhdmVkT2JqZWN0TWV0YS5zZWFyY2hTb3VyY2VKU09OID09PSAnc3RyaW5nJ1xuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRTdHIgPSBhdXhfc291cmNlLmtpYmFuYVNhdmVkT2JqZWN0TWV0YS5zZWFyY2hTb3VyY2VKU09OO1xuXG4gICAgICAgIGNvbnN0IGlzTW9uaXRvcmluZyA9IGRlZmF1bHRTdHIuaW5jbHVkZXMoJ3dhenVoLW1vbml0b3JpbmcnKTtcbiAgICAgICAgaWYgKGlzTW9uaXRvcmluZykge1xuICAgICAgICAgIGlmIChuYW1lc3BhY2UgJiYgbmFtZXNwYWNlICE9PSAnZGVmYXVsdCcpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgbW9uaXRvcmluZ1BhdHRlcm4uaW5jbHVkZXMobmFtZXNwYWNlKSAmJlxuICAgICAgICAgICAgICBtb25pdG9yaW5nUGF0dGVybi5pbmNsdWRlcygnaW5kZXgtcGF0dGVybjonKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIG1vbml0b3JpbmdQYXR0ZXJuID0gbW9uaXRvcmluZ1BhdHRlcm4uc3BsaXQoJ2luZGV4LXBhdHRlcm46JylbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGF1eF9zb3VyY2Uua2liYW5hU2F2ZWRPYmplY3RNZXRhLnNlYXJjaFNvdXJjZUpTT04gPVxuICAgICAgICAgICAgZGVmYXVsdFN0ci5yZXBsYWNlKFxuICAgICAgICAgICAgICAvd2F6dWgtbW9uaXRvcmluZy9nLFxuICAgICAgICAgICAgICBtb25pdG9yaW5nUGF0dGVyblttb25pdG9yaW5nUGF0dGVybi5sZW5ndGggLSAxXSA9PT0gJyonIHx8XG4gICAgICAgICAgICAgICAgKG5hbWVzcGFjZSAmJiBuYW1lc3BhY2UgIT09ICdkZWZhdWx0JylcbiAgICAgICAgICAgICAgICA/IG1vbml0b3JpbmdQYXR0ZXJuXG4gICAgICAgICAgICAgICAgOiBtb25pdG9yaW5nUGF0dGVybiArICcqJyxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXV4X3NvdXJjZS5raWJhbmFTYXZlZE9iamVjdE1ldGEuc2VhcmNoU291cmNlSlNPTiA9XG4gICAgICAgICAgICBkZWZhdWx0U3RyLnJlcGxhY2UoL3dhenVoLWFsZXJ0cy9nLCBpZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gUmVwbGFjZSBpbmRleC1wYXR0ZXJuIGZvciBzZWxlY3RvciB2aXN1YWxpemF0aW9uc1xuICAgICAgaWYgKHR5cGVvZiAoYXV4X3NvdXJjZSB8fCB7fSkudmlzU3RhdGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGF1eF9zb3VyY2UudmlzU3RhdGUgPSBhdXhfc291cmNlLnZpc1N0YXRlLnJlcGxhY2UoL3dhenVoLWFsZXJ0cy9nLCBpZCk7XG4gICAgICB9XG5cbiAgICAgIC8vIEJ1bGsgc291cmNlXG4gICAgICBidWxrX2NvbnRlbnQgPSB7fTtcbiAgICAgIGJ1bGtfY29udGVudFtlbGVtZW50Ll90eXBlXSA9IGF1eF9zb3VyY2U7XG5cbiAgICAgIHZpc0FycmF5LnB1c2goe1xuICAgICAgICBhdHRyaWJ1dGVzOiBidWxrX2NvbnRlbnQudmlzdWFsaXphdGlvbixcbiAgICAgICAgdHlwZTogZWxlbWVudC5fdHlwZSxcbiAgICAgICAgaWQ6IGVsZW1lbnQuX2lkLFxuICAgICAgICBfdmVyc2lvbjogYnVsa19jb250ZW50LnZpc3VhbGl6YXRpb24udmVyc2lvbixcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdmlzQXJyYXk7XG4gIH1cblxuICAvKipcbiAgICogUmVwbGFjZXMgY2x1c3RlciB2aXN1YWxpemF0aW9ucyBtYWluIGZpZWxkcy5cbiAgICogQHBhcmFtIHtBcnJheTxPYmplY3Q+fSBhcHBfb2JqZWN0cyBPYmplY3QgY29udGFpbmluZyByYXcgdmlzdWFsaXphdGlvbnMuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpZCBJbmRleC1wYXR0ZXJuIGlkIHRvIHVzZSBpbiB0aGUgdmlzdWFsaXphdGlvbnMuIEVnOiAnd2F6dWgtYWxlcnRzJ1xuICAgKiBAcGFyYW0ge0FycmF5PFN0cmluZz59IG5vZGVzIEFycmF5IG9mIG5vZGUgbmFtZXMuIEVnOiBbJ25vZGUwMScsICdub2RlMDInXVxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBDbHVzdGVyIG5hbWUuIEVnOiAnd2F6dWgnXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBtYXN0ZXJfbm9kZSBNYXN0ZXIgbm9kZSBuYW1lLiBFZzogJ25vZGUwMSdcbiAgICovXG4gIGJ1aWxkQ2x1c3RlclZpc3VhbGl6YXRpb25zUmF3KFxuICAgIGNvbnRleHQsXG4gICAgYXBwX29iamVjdHMsXG4gICAgaWQsXG4gICAgbm9kZXMgPSBbXSxcbiAgICBuYW1lLFxuICAgIG1hc3Rlcl9ub2RlLFxuICAgIHBhdHRlcm5fbmFtZSA9ICcqJyxcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHZpc0FycmF5ID0gW107XG4gICAgICBsZXQgYXV4X3NvdXJjZSwgYnVsa19jb250ZW50O1xuXG4gICAgICBmb3IgKGNvbnN0IGVsZW1lbnQgb2YgYXBwX29iamVjdHMpIHtcbiAgICAgICAgLy8gU3RyaW5naWZ5IGFuZCByZXBsYWNlIGluZGV4LXBhdHRlcm4gZm9yIHZpc3VhbGl6YXRpb25zXG4gICAgICAgIGF1eF9zb3VyY2UgPSBKU09OLnN0cmluZ2lmeShlbGVtZW50Ll9zb3VyY2UpO1xuICAgICAgICBhdXhfc291cmNlID0gYXV4X3NvdXJjZS5yZXBsYWNlKC93YXp1aC1hbGVydHMvZywgaWQpO1xuICAgICAgICBhdXhfc291cmNlID0gSlNPTi5wYXJzZShhdXhfc291cmNlKTtcblxuICAgICAgICAvLyBCdWxrIHNvdXJjZVxuICAgICAgICBidWxrX2NvbnRlbnQgPSB7fTtcbiAgICAgICAgYnVsa19jb250ZW50W2VsZW1lbnQuX3R5cGVdID0gYXV4X3NvdXJjZTtcblxuICAgICAgICBjb25zdCB2aXNTdGF0ZSA9IEpTT04ucGFyc2UoYnVsa19jb250ZW50LnZpc3VhbGl6YXRpb24udmlzU3RhdGUpO1xuICAgICAgICBjb25zdCB0aXRsZSA9IHZpc1N0YXRlLnRpdGxlO1xuXG4gICAgICAgIGlmICh0aXRsZS5zdGFydHNXaXRoKCdBcHAgU3RhdGlzdGljcycpKSB7XG4gICAgICAgICAgY29uc3QgZmlsdGVyID1cbiAgICAgICAgICAgIGJ1bGtfY29udGVudC52aXN1YWxpemF0aW9uLmtpYmFuYVNhdmVkT2JqZWN0TWV0YS5zZWFyY2hTb3VyY2VKU09OLnJlcGxhY2UoXG4gICAgICAgICAgICAgICdcImZpbHRlclwiOltdJyxcbiAgICAgICAgICAgICAgYFwiZmlsdGVyXCI6W3tcImJvb2xcIjp7XCJtdXN0XCI6W3tcIm1hdGNoXCI6e1wiYXBpTmFtZVwiOlwiJyR7bWFzdGVyX25vZGV9J1wifX0ke1xuICAgICAgICAgICAgICAgIG5hbWUgJiYgbmFtZSAhPT0gJ2FsbCdcbiAgICAgICAgICAgICAgICAgID8gYCx7XCJtYXRjaFwiOntcIm5vZGVOYW1lXCI6XCInJHtuYW1lfSdcIn19YFxuICAgICAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgICAgICB9XX19XWAsXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgYnVsa19jb250ZW50LnZpc3VhbGl6YXRpb24ua2liYW5hU2F2ZWRPYmplY3RNZXRhLnNlYXJjaFNvdXJjZUpTT04gPVxuICAgICAgICAgICAgZmlsdGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZpc1N0YXRlLnR5cGUgJiYgdmlzU3RhdGUudHlwZSA9PT0gJ3RpbWVsaW9uJykge1xuICAgICAgICAgIGxldCBxdWVyeSA9ICcnO1xuICAgICAgICAgIGlmICh0aXRsZSA9PT0gJ0FwcCBDbHVzdGVyIE92ZXJ2aWV3Jykge1xuICAgICAgICAgICAgZm9yIChjb25zdCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgICAgICAgIHF1ZXJ5ICs9IGAuZXMoaW5kZXg9JHtwYXR0ZXJuX25hbWV9LHE9XCJjbHVzdGVyLm5hbWU6ICR7bmFtZX0gQU5EIGNsdXN0ZXIubm9kZTogJHtub2RlLm5hbWV9XCIpLmxhYmVsKFwiJHtub2RlLm5hbWV9XCIpLGA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxdWVyeSA9IHF1ZXJ5LnN1YnN0cmluZygwLCBxdWVyeS5sZW5ndGggLSAxKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRpdGxlID09PSAnQXBwIENsdXN0ZXIgT3ZlcnZpZXcgTWFuYWdlcicpIHtcbiAgICAgICAgICAgIHF1ZXJ5ICs9IGAuZXMoaW5kZXg9JHtwYXR0ZXJuX25hbWV9LHE9XCJjbHVzdGVyLm5hbWU6ICR7bmFtZX1cIikubGFiZWwoXCIke25hbWV9IGNsdXN0ZXJcIilgO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZpc1N0YXRlLnBhcmFtcy5leHByZXNzaW9uID0gcXVlcnkucmVwbGFjZSgvJy9nLCAnXCInKTtcbiAgICAgICAgICBidWxrX2NvbnRlbnQudmlzdWFsaXphdGlvbi52aXNTdGF0ZSA9IEpTT04uc3RyaW5naWZ5KHZpc1N0YXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZpc0FycmF5LnB1c2goe1xuICAgICAgICAgIGF0dHJpYnV0ZXM6IGJ1bGtfY29udGVudC52aXN1YWxpemF0aW9uLFxuICAgICAgICAgIHR5cGU6IGVsZW1lbnQuX3R5cGUsXG4gICAgICAgICAgaWQ6IGVsZW1lbnQuX2lkLFxuICAgICAgICAgIF92ZXJzaW9uOiBidWxrX2NvbnRlbnQudmlzdWFsaXphdGlvbi52ZXJzaW9uLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHZpc0FycmF5O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb250ZXh0LndhenVoLmxvZ2dlci5lcnJvcihlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgY2hlY2tzIGlmIHRoZXJlIGlzIHNhbXBsZSBhbGVydHNcbiAgICogR0VUIC9lbGFzdGljL3NhbXBsZWFsZXJ0c1xuICAgKiBAcGFyYW0geyp9IGNvbnRleHRcbiAgICogQHBhcmFtIHsqfSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7Kn0gcmVzcG9uc2VcbiAgICoge2FsZXJ0czogWy4uLl19IG9yIEVycm9yUmVzcG9uc2VcbiAgICovXG4gIGFzeW5jIGhhdmVTYW1wbGVBbGVydHMoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gICkge1xuICAgIHRyeSB7XG4gICAgICAvLyBDaGVjayBpZiB3YXp1aCBzYW1wbGUgYWxlcnRzIGluZGV4IGV4aXN0c1xuICAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBPYmplY3Qua2V5cyhXQVpVSF9TQU1QTEVfQUxFUlRTX0NBVEVHT1JJRVNfVFlQRV9BTEVSVFMpLm1hcChcbiAgICAgICAgICBhc3luYyBjYXRlZ29yeSA9PlxuICAgICAgICAgICAgY29udGV4dC5jb3JlLm9wZW5zZWFyY2guY2xpZW50LmFzQ3VycmVudFVzZXIuaW5kaWNlcy5leGlzdHMoe1xuICAgICAgICAgICAgICBpbmRleDogYXdhaXQgdGhpcy5idWlsZFNhbXBsZUluZGV4QnlDYXRlZ29yeShjb250ZXh0LCBjYXRlZ29yeSksXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgKSxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICBib2R5OiB7IHNhbXBsZUFsZXJ0c0luc3RhbGxlZDogcmVzdWx0cy5zb21lKHJlc3VsdCA9PiByZXN1bHQuYm9keSkgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShcbiAgICAgICAgJ1NhbXBsZSBBbGVydHMgY2F0ZWdvcnkgbm90IHZhbGlkJyxcbiAgICAgICAgMTAwMCxcbiAgICAgICAgNTAwLFxuICAgICAgICByZXNwb25zZSxcbiAgICAgICk7XG4gICAgfVxuICB9XG4gIC8qKlxuICAgKiBUaGlzIGNyZWF0ZXMgc2FtcGxlIGFsZXJ0cyBpbiB3YXp1aC1zYW1wbGUtYWxlcnRzXG4gICAqIEdFVCAvZWxhc3RpYy9zYW1wbGVhbGVydHMve2NhdGVnb3J5fVxuICAgKiBAcGFyYW0geyp9IGNvbnRleHRcbiAgICogQHBhcmFtIHsqfSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7Kn0gcmVzcG9uc2VcbiAgICoge2FsZXJ0czogWy4uLl19IG9yIEVycm9yUmVzcG9uc2VcbiAgICovXG4gIGFzeW5jIGhhdmVTYW1wbGVBbGVydHNPZkNhdGVnb3J5KFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3Q8eyBjYXRlZ29yeTogc3RyaW5nIH0+LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHNhbXBsZUFsZXJ0c0luZGV4ID0gYXdhaXQgdGhpcy5idWlsZFNhbXBsZUluZGV4QnlDYXRlZ29yeShcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgcmVxdWVzdC5wYXJhbXMuY2F0ZWdvcnksXG4gICAgICApO1xuICAgICAgLy8gQ2hlY2sgaWYgd2F6dWggc2FtcGxlIGFsZXJ0cyBpbmRleCBleGlzdHNcbiAgICAgIGNvbnN0IGV4aXN0c1NhbXBsZUluZGV4ID1cbiAgICAgICAgYXdhaXQgY29udGV4dC5jb3JlLm9wZW5zZWFyY2guY2xpZW50LmFzQ3VycmVudFVzZXIuaW5kaWNlcy5leGlzdHMoe1xuICAgICAgICAgIGluZGV4OiBzYW1wbGVBbGVydHNJbmRleCxcbiAgICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICBib2R5OiB7IGluZGV4OiBzYW1wbGVBbGVydHNJbmRleCwgZXhpc3RzOiBleGlzdHNTYW1wbGVJbmRleC5ib2R5IH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZXJyb3IoXG4gICAgICAgIGBFcnJvciBjaGVja2luZyBpZiB0aGVyZSBhcmUgc2FtcGxlIGFsZXJ0cyBpbmRpY2VzOiAke1xuICAgICAgICAgIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3JcbiAgICAgICAgfWAsXG4gICAgICApO1xuXG4gICAgICBjb25zdCBbc3RhdHVzQ29kZSwgZXJyb3JNZXNzYWdlXSA9IHRoaXMuZ2V0RXJyb3JEZXRhaWxzKGVycm9yKTtcbiAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICBgRXJyb3IgY2hlY2tpbmcgaWYgdGhlcmUgYXJlIHNhbXBsZSBhbGVydHMgaW5kaWNlczogJHtcbiAgICAgICAgICBlcnJvck1lc3NhZ2UgfHwgZXJyb3JcbiAgICAgICAgfWAsXG4gICAgICAgIDEwMDAsXG4gICAgICAgIHN0YXR1c0NvZGUsXG4gICAgICAgIHJlc3BvbnNlLFxuICAgICAgKTtcbiAgICB9XG4gIH1cbiAgLyoqXG4gICAqIFRoaXMgY3JlYXRlcyBzYW1wbGUgYWxlcnRzIGluIHdhenVoLXNhbXBsZS1hbGVydHNcbiAgICogUE9TVCAvZWxhc3RpYy9zYW1wbGVhbGVydHMve2NhdGVnb3J5fVxuICAgKiB7XG4gICAqICAgXCJtYW5hZ2VyXCI6IHtcbiAgICogICAgICBcIm5hbWVcIjogXCJtYW5hZ2VyX25hbWVcIlxuICAgKiAgICB9LFxuICAgKiAgICBjbHVzdGVyOiB7XG4gICAqICAgICAgbmFtZTogXCJteWNsdXN0ZXJcIixcbiAgICogICAgICBub2RlOiBcIm15bm9kZVwiXG4gICAqICAgIH1cbiAgICogfVxuICAgKiBAcGFyYW0geyp9IGNvbnRleHRcbiAgICogQHBhcmFtIHsqfSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7Kn0gcmVzcG9uc2VcbiAgICoge2luZGV4OiBzdHJpbmcsIGFsZXJ0czogWy4uLl0sIGNvdW50OiBudW1iZXJ9IG9yIEVycm9yUmVzcG9uc2VcbiAgICovXG4gIGNyZWF0ZVNhbXBsZUFsZXJ0cyA9IHJvdXRlRGVjb3JhdG9yUHJvdGVjdGVkQWRtaW5pc3RyYXRvcigxMDAwKShcbiAgICBhc3luYyAoXG4gICAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3Q8eyBjYXRlZ29yeTogc3RyaW5nIH0+LFxuICAgICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICAgICkgPT4ge1xuICAgICAgY29uc3Qgc2FtcGxlQWxlcnRzSW5kZXggPSBhd2FpdCB0aGlzLmJ1aWxkU2FtcGxlSW5kZXhCeUNhdGVnb3J5KFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICByZXF1ZXN0LnBhcmFtcy5jYXRlZ29yeSxcbiAgICAgICk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGJ1bGtQcmVmaXggPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgaW5kZXg6IHtcbiAgICAgICAgICAgIF9pbmRleDogc2FtcGxlQWxlcnRzSW5kZXgsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGFsZXJ0R2VuZXJhdGVQYXJhbXMgPSAocmVxdWVzdC5ib2R5ICYmIHJlcXVlc3QuYm9keS5wYXJhbXMpIHx8IHt9O1xuXG4gICAgICAgIGNvbnN0IHNhbXBsZUFsZXJ0cyA9IFdBWlVIX1NBTVBMRV9BTEVSVFNfQ0FURUdPUklFU19UWVBFX0FMRVJUU1tcbiAgICAgICAgICByZXF1ZXN0LnBhcmFtcy5jYXRlZ29yeVxuICAgICAgICBdXG4gICAgICAgICAgLm1hcCh0eXBlQWxlcnQgPT5cbiAgICAgICAgICAgIGdlbmVyYXRlQWxlcnRzKFxuICAgICAgICAgICAgICB7IC4uLnR5cGVBbGVydCwgLi4uYWxlcnRHZW5lcmF0ZVBhcmFtcyB9LFxuICAgICAgICAgICAgICByZXF1ZXN0LmJvZHkuYWxlcnRzIHx8XG4gICAgICAgICAgICAgICAgdHlwZUFsZXJ0LmFsZXJ0cyB8fFxuICAgICAgICAgICAgICAgIFdBWlVIX1NBTVBMRV9BTEVSVFNfREVGQVVMVF9OVU1CRVJfQUxFUlRTLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICApXG4gICAgICAgICAgLmZsYXQoKTtcbiAgICAgICAgY29uc3QgYnVsayA9IHNhbXBsZUFsZXJ0c1xuICAgICAgICAgIC5tYXAoc2FtcGxlQWxlcnQgPT4gYCR7YnVsa1ByZWZpeH1cXG4ke0pTT04uc3RyaW5naWZ5KHNhbXBsZUFsZXJ0KX1cXG5gKVxuICAgICAgICAgIC5qb2luKCcnKTtcblxuICAgICAgICAvLyBJbmRleCBhbGVydHNcblxuICAgICAgICAvLyBDaGVjayBpZiB3YXp1aCBzYW1wbGUgYWxlcnRzIGluZGV4IGV4aXN0c1xuICAgICAgICBjb25zdCBleGlzdHNTYW1wbGVJbmRleCA9XG4gICAgICAgICAgYXdhaXQgY29udGV4dC5jb3JlLm9wZW5zZWFyY2guY2xpZW50LmFzQ3VycmVudFVzZXIuaW5kaWNlcy5leGlzdHMoe1xuICAgICAgICAgICAgaW5kZXg6IHNhbXBsZUFsZXJ0c0luZGV4LFxuICAgICAgICAgIH0pO1xuICAgICAgICBpZiAoIWV4aXN0c1NhbXBsZUluZGV4LmJvZHkpIHtcbiAgICAgICAgICAvLyBDcmVhdGUgd2F6dWggc2FtcGxlIGFsZXJ0cyBpbmRleFxuXG4gICAgICAgICAgY29uc3QgY29uZmlndXJhdGlvbiA9IHtcbiAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgIGluZGV4OiB7XG4gICAgICAgICAgICAgICAgbnVtYmVyX29mX3NoYXJkczogV0FaVUhfU0FNUExFX0FMRVJUU19JTkRFWF9TSEFSRFMsXG4gICAgICAgICAgICAgICAgbnVtYmVyX29mX3JlcGxpY2FzOiBXQVpVSF9TQU1QTEVfQUxFUlRTX0lOREVYX1JFUExJQ0FTLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgYXdhaXQgY29udGV4dC5jb3JlLm9wZW5zZWFyY2guY2xpZW50LmFzQ3VycmVudFVzZXIuaW5kaWNlcy5jcmVhdGUoe1xuICAgICAgICAgICAgaW5kZXg6IHNhbXBsZUFsZXJ0c0luZGV4LFxuICAgICAgICAgICAgYm9keTogY29uZmlndXJhdGlvbixcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjb250ZXh0LndhenVoLmxvZ2dlci5pbmZvKGBJbmRleCAke3NhbXBsZUFsZXJ0c0luZGV4fSBjcmVhdGVkYCk7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCBjb250ZXh0LmNvcmUub3BlbnNlYXJjaC5jbGllbnQuYXNDdXJyZW50VXNlci5idWxrKHtcbiAgICAgICAgICBpbmRleDogc2FtcGxlQWxlcnRzSW5kZXgsXG4gICAgICAgICAgYm9keTogYnVsayxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmluZm8oXG4gICAgICAgICAgYEFkZGVkIHNhbXBsZSBhbGVydHMgdG8gJHtzYW1wbGVBbGVydHNJbmRleH0gaW5kZXhgLFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgIGJvZHk6IHsgaW5kZXg6IHNhbXBsZUFsZXJ0c0luZGV4LCBhbGVydENvdW50OiBzYW1wbGVBbGVydHMubGVuZ3RoIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZXJyb3IoXG4gICAgICAgICAgYEVycm9yIGFkZGluZyBzYW1wbGUgYWxlcnRzIHRvICR7c2FtcGxlQWxlcnRzSW5kZXh9IGluZGV4OiAke1xuICAgICAgICAgICAgZXJyb3IubWVzc2FnZSB8fCBlcnJvclxuICAgICAgICAgIH1gLFxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IFtzdGF0dXNDb2RlLCBlcnJvck1lc3NhZ2VdID0gdGhpcy5nZXRFcnJvckRldGFpbHMoZXJyb3IpO1xuXG4gICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKGVycm9yTWVzc2FnZSB8fCBlcnJvciwgMTAwMCwgc3RhdHVzQ29kZSwgcmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH0sXG4gICk7XG4gIC8qKlxuICAgKiBUaGlzIGRlbGV0ZXMgc2FtcGxlIGFsZXJ0c1xuICAgKiBAcGFyYW0geyp9IGNvbnRleHRcbiAgICogQHBhcmFtIHsqfSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7Kn0gcmVzcG9uc2VcbiAgICoge3Jlc3VsdDogXCJkZWxldGVkXCIsIGluZGV4OiBzdHJpbmd9IG9yIEVycm9yUmVzcG9uc2VcbiAgICovXG4gIGRlbGV0ZVNhbXBsZUFsZXJ0cyA9IHJvdXRlRGVjb3JhdG9yUHJvdGVjdGVkQWRtaW5pc3RyYXRvcigxMDAwKShcbiAgICBhc3luYyAoXG4gICAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3Q8eyBjYXRlZ29yeTogc3RyaW5nIH0+LFxuICAgICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICAgICkgPT4ge1xuICAgICAgLy8gRGVsZXRlIFdhenVoIHNhbXBsZSBhbGVydCBpbmRleFxuICAgICAgY29uc3Qgc2FtcGxlQWxlcnRzSW5kZXggPSBhd2FpdCB0aGlzLmJ1aWxkU2FtcGxlSW5kZXhCeUNhdGVnb3J5KFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICByZXF1ZXN0LnBhcmFtcy5jYXRlZ29yeSxcbiAgICAgICk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIENoZWNrIGlmIFdhenVoIHNhbXBsZSBhbGVydHMgaW5kZXggZXhpc3RzXG4gICAgICAgIGNvbnN0IGV4aXN0c1NhbXBsZUluZGV4ID1cbiAgICAgICAgICBhd2FpdCBjb250ZXh0LmNvcmUub3BlbnNlYXJjaC5jbGllbnQuYXNDdXJyZW50VXNlci5pbmRpY2VzLmV4aXN0cyh7XG4gICAgICAgICAgICBpbmRleDogc2FtcGxlQWxlcnRzSW5kZXgsXG4gICAgICAgICAgfSk7XG4gICAgICAgIGlmIChleGlzdHNTYW1wbGVJbmRleC5ib2R5KSB7XG4gICAgICAgICAgLy8gRGVsZXRlIFdhenVoIHNhbXBsZSBhbGVydHMgaW5kZXhcbiAgICAgICAgICBhd2FpdCBjb250ZXh0LmNvcmUub3BlbnNlYXJjaC5jbGllbnQuYXNDdXJyZW50VXNlci5pbmRpY2VzLmRlbGV0ZSh7XG4gICAgICAgICAgICBpbmRleDogc2FtcGxlQWxlcnRzSW5kZXgsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuaW5mbyhgRGVsZXRlZCAke3NhbXBsZUFsZXJ0c0luZGV4fSBpbmRleGApO1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgICAgICBib2R5OiB7IHJlc3VsdDogJ2RlbGV0ZWQnLCBpbmRleDogc2FtcGxlQWxlcnRzSW5kZXggfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShcbiAgICAgICAgICAgIGAke3NhbXBsZUFsZXJ0c0luZGV4fSBpbmRleCBkb2Vzbid0IGV4aXN0YCxcbiAgICAgICAgICAgIDEwMDAsXG4gICAgICAgICAgICA1MDAsXG4gICAgICAgICAgICByZXNwb25zZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb250ZXh0LndhenVoLmxvZ2dlci5lcnJvcihcbiAgICAgICAgICBgRXJyb3IgZGVsZXRpbmcgc2FtcGxlIGFsZXJ0cyBvZiAke3NhbXBsZUFsZXJ0c0luZGV4fSBpbmRleDogJHtcbiAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3JcbiAgICAgICAgICB9YCxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgW3N0YXR1c0NvZGUsIGVycm9yTWVzc2FnZV0gPSB0aGlzLmdldEVycm9yRGV0YWlscyhlcnJvcik7XG5cbiAgICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoZXJyb3JNZXNzYWdlIHx8IGVycm9yLCAxMDAwLCBzdGF0dXNDb2RlLCByZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSxcbiAgKTtcblxuICBhc3luYyBhbGVydHMoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gICkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgY29udGV4dC5jb3JlLm9wZW5zZWFyY2guY2xpZW50LmFzQ3VycmVudFVzZXIuc2VhcmNoKFxuICAgICAgICByZXF1ZXN0LmJvZHksXG4gICAgICApO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgYm9keTogZGF0YS5ib2R5LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmVycm9yKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoZXJyb3IubWVzc2FnZSB8fCBlcnJvciwgNDAxMCwgNTAwLCByZXNwb25zZSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ2hlY2sgaWYgdGhlcmUgYXJlIGluZGljZXMgZm9yIFN0YXRpc3RpY3NcbiAgYXN5bmMgZXhpc3RTdGF0aXN0aWNzSW5kaWNlcyhcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IGF3YWl0IGNvbnRleHQud2F6dWhfY29yZS5jb25maWd1cmF0aW9uLmdldCgpO1xuICAgICAgY29uc3Qgc3RhdGlzdGljc1BhdHRlcm4gPSBgJHtjb25maWdbJ2Nyb24ucHJlZml4J119LSR7Y29uZmlnWydjcm9uLnN0YXRpc3RpY3MuaW5kZXgubmFtZSddfSpgO1xuICAgICAgY29uc3QgZXhpc3RJbmRleCA9XG4gICAgICAgIGF3YWl0IGNvbnRleHQuY29yZS5vcGVuc2VhcmNoLmNsaWVudC5hc0N1cnJlbnRVc2VyLmluZGljZXMuZXhpc3RzKHtcbiAgICAgICAgICBpbmRleDogc3RhdGlzdGljc1BhdHRlcm4sXG4gICAgICAgICAgYWxsb3dfbm9faW5kaWNlczogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgYm9keTogZXhpc3RJbmRleC5ib2R5LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmVycm9yKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoZXJyb3IubWVzc2FnZSB8fCBlcnJvciwgMTAwMCwgNTAwLCByZXNwb25zZSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RXJyb3JEZXRhaWxzKGVycm9yKSB7XG4gICAgY29uc3Qgc3RhdHVzQ29kZSA9IGVycm9yPy5tZXRhPy5zdGF0dXNDb2RlIHx8IDUwMDtcbiAgICBsZXQgZXJyb3JNZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcblxuICAgIGlmIChzdGF0dXNDb2RlID09PSA0MDMpIHtcbiAgICAgIGVycm9yTWVzc2FnZSA9IGVycm9yPy5tZXRhPy5ib2R5Py5lcnJvcj8ucmVhc29uIHx8ICdQZXJtaXNzaW9uIGRlbmllZCc7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtzdGF0dXNDb2RlLCBlcnJvck1lc3NhZ2VdO1xuICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQVdBLElBQUFBLGNBQUEsR0FBQUMsT0FBQTtBQUVBLElBQUFDLHFCQUFBLEdBQUFELE9BQUE7QUFDQSxJQUFBRSxVQUFBLEdBQUFGLE9BQUE7QUFjQSxJQUFBRyxXQUFBLEdBQUFILE9BQUE7QUFBb0UsU0FBQUksZ0JBQUFDLEdBQUEsRUFBQUMsR0FBQSxFQUFBQyxLQUFBLElBQUFELEdBQUEsR0FBQUUsY0FBQSxDQUFBRixHQUFBLE9BQUFBLEdBQUEsSUFBQUQsR0FBQSxJQUFBSSxNQUFBLENBQUFDLGNBQUEsQ0FBQUwsR0FBQSxFQUFBQyxHQUFBLElBQUFDLEtBQUEsRUFBQUEsS0FBQSxFQUFBSSxVQUFBLFFBQUFDLFlBQUEsUUFBQUMsUUFBQSxvQkFBQVIsR0FBQSxDQUFBQyxHQUFBLElBQUFDLEtBQUEsV0FBQUYsR0FBQTtBQUFBLFNBQUFHLGVBQUFNLEdBQUEsUUFBQVIsR0FBQSxHQUFBUyxZQUFB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