"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WazuhReportingCtrl = void 0;
var _path = _interopRequireDefault(require("path"));
var _fs = _interopRequireDefault(require("fs"));
var _wazuhModules = require("../../common/wazuh-modules");
var TimSort = _interopRequireWildcard(require("timsort"));
var _errorResponse = require("../lib/error-response");
var _processStateEquivalence = _interopRequireDefault(require("../lib/process-state-equivalence"));
var _csvKeyEquivalence = require("../../common/csv-key-equivalence");
var _agentConfiguration = require("../lib/reporting/agent-configuration");
var _extendedInformation = require("../lib/reporting/extended-information");
var _printer = require("../lib/reporting/printer");
var _constants = require("../../common/constants");
var _filesystem = require("../lib/filesystem");
var _wz_agent_status = require("../../common/services/wz_agent_status");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /*
 * Wazuh app - Class for Wazuh reporting controller
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
class WazuhReportingCtrl {
  constructor() {
    /**
     * Create a report for the modules
     * @param {Object} context
     * @param {Object} request
     * @param {Object} response
     * @returns {*} reports list or ErrorResponse
     */
    _defineProperty(this, "createReportsModules", this.checkReportsUserDirectoryIsValidRouteDecorator(async (context, request, response) => {
      try {
        context.wazuh.logger.debug('Report started');
        const {
          array,
          agents,
          browserTimezone,
          searchBar,
          filters,
          serverSideQuery,
          time,
          tables,
          section,
          indexPatternTitle,
          apiId
        } = request.body;
        const {
          moduleID
        } = request.params;
        const {
          from,
          to
        } = time || {};
        let additionalTables = [];
        // Init
        const printer = new _printer.ReportPrinter(context.wazuh.logger.get('report-printer'), context.wazuh_core.configuration);
        (0, _filesystem.createDataDirectoryIfNotExists)();
        (0, _filesystem.createDirectoryIfNotExists)(_constants.WAZUH_DATA_DOWNLOADS_DIRECTORY_PATH);
        (0, _filesystem.createDirectoryIfNotExists)(_constants.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH);
        (0, _filesystem.createDirectoryIfNotExists)(_path.default.join(_constants.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH, context.wazuhEndpointParams.hashUsername));
        await this.renderHeader(context, printer, section, moduleID, agents, apiId);
        const [sanitizedFilters, agentsFilter] = filters ? this.sanitizeKibanaFilters(context, filters, searchBar) : [false, null];
        if (time && sanitizedFilters) {
          printer.addTimeRangeAndFilters(from, to, sanitizedFilters, browserTimezone);
        }
        if (time) {
          additionalTables = await (0, _extendedInformation.extendedInformation)(context, printer, section, moduleID, apiId, new Date(from).getTime(), new Date(to).getTime(), serverSideQuery, agentsFilter, indexPatternTitle || context.wazuh_core.configuration.getSettingValue('pattern'), agents);
        }
        printer.addVisualizations(array, agents, moduleID);
        if (tables) {
          printer.addTables([...tables, ...(additionalTables || [])]);
        }

        //add authorized agents
        if (agentsFilter !== null && agentsFilter !== void 0 && agentsFilter.agentsText) {
          printer.addAgentsFilters(agentsFilter.agentsText);
        }
        await printer.print(context.wazuhEndpointParams.pathFilename);
        return response.ok({
          body: {
            success: true,
            message: `Report ${context.wazuhEndpointParams.filename} was created`,
            filename: context.wazuhEndpointParams.filename
          }
        });
      } catch (error) {
        return (0, _errorResponse.ErrorResponse)(error.message || error, 5029, 500, response);
      }
    }, ({
      body: {
        agents
      },
      params: {
        moduleID
      }
    }) => `wazuh-module-${agents ? `agents-${agents}` : 'overview'}-${moduleID}-${this.generateReportTimestamp()}.pdf`));
    /**
     * Create a report for the groups
     * @param {Object} context
     * @param {Object} request
     * @param {Object} response
     * @returns {*} reports list or ErrorResponse
     */
    _defineProperty(this, "createReportsGroups", this.checkReportsUserDirectoryIsValidRouteDecorator(async (context, request, response) => {
      try {
        context.wazuh.logger.debug('Report started');
        const {
          components,
          apiId
        } = request.body;
        const {
          groupID
        } = request.params;
        // Init
        const printer = new _printer.ReportPrinter(context.wazuh.logger.get('report-printer'), context.wazuh_core.configuration);
        (0, _filesystem.createDataDirectoryIfNotExists)();
        (0, _filesystem.createDirectoryIfNotExists)(_constants.WAZUH_DATA_DOWNLOADS_DIRECTORY_PATH);
        (0, _filesystem.createDirectoryIfNotExists)(_constants.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH);
        (0, _filesystem.createDirectoryIfNotExists)(_path.default.join(_constants.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH, context.wazuhEndpointParams.hashUsername));
        let tables = [];
        const equivalences = {
          localfile: 'Local files',
          osquery: 'Osquery',
          command: 'Command',
          syscheck: 'Syscheck',
          'open-scap': 'OpenSCAP',
          'cis-cat': 'CIS-CAT',
          syscollector: 'Syscollector',
          rootcheck: 'Rootcheck',
          labels: 'Labels',
          sca: 'Security configuration assessment'
        };
        printer.addContent({
          text: `Group ${groupID} configuration`,
          style: 'h1'
        });

        // Group configuration
        if (components['0']) {
          const {
            data: {
              data: configuration
            }
          } = await context.wazuh.api.client.asCurrentUser.request('GET', `/groups/${groupID}/configuration`, {}, {
            apiHostID: apiId
          });
          if (configuration.affected_items.length > 0 && Object.keys(configuration.affected_items[0].config).length) {
            printer.addContent({
              text: 'Configurations',
              style: {
                fontSize: 14,
                color: '#000'
              },
              margin: [0, 10, 0, 15]
            });
            const section = {
              labels: [],
              isGroupConfig: true
            };
            for (let config of configuration.affected_items) {
              let filterTitle = '';
              let index = 0;
              for (let filter of Object.keys(config.filters)) {
                filterTitle = filterTitle.concat(`${filter}: ${config.filters[filter]}`);
                if (index < Object.keys(config.filters).length - 1) {
                  filterTitle = filterTitle.concat(' | ');
                }
                index++;
              }
              printer.addContent({
                text: filterTitle,
                style: 'h4',
                margin: [0, 0, 0, 10]
              });
              let idx = 0;
              section.tabs = [];
              for (let _d of Object.keys(config.config)) {
                for (let c of _agentConfiguration.AgentConfiguration.configurations) {
                  for (let s of c.sections) {
                    section.opts = s.opts || {};
                    for (let cn of s.config || []) {
                      if (cn.configuration === _d) {
                        section.labels = s.labels || [[]];
                      }
                    }
                    for (let wo of s.wodle || []) {
                      if (wo.name === _d) {
                        section.labels = s.labels || [[]];
                      }
                    }
                  }
                }
                section.labels[0]['pack'] = 'Packs';
                section.labels[0]['content'] = 'Evaluations';
                section.labels[0]['7'] = 'Scan listening netwotk ports';
                section.tabs.push(equivalences[_d]);
                if (Array.isArray(config.config[_d])) {
                  /* LOG COLLECTOR */
                  if (_d === 'localfile') {
                    let groups = [];
                    config.config[_d].forEach(obj => {
                      if (!groups[obj.logformat]) {
                        groups[obj.logformat] = [];
                      }
                      groups[obj.logformat].push(obj);
                    });
                    Object.keys(groups).forEach(group => {
                      let saveidx = 0;
                      groups[group].forEach((x, i) => {
                        if (Object.keys(x).length > Object.keys(groups[group][saveidx]).length) {
                          saveidx = i;
                        }
                      });
                      const columns = Object.keys(groups[group][saveidx]);
                      const rows = groups[group].map(x => {
                        let row = [];
                        columns.forEach(key => {
                          row.push(typeof x[key] !== 'object' ? x[key] : Array.isArray(x[key]) ? x[key].map(x => {
                            return x + '\n';
                          }) : JSON.stringify(x[key]));
                        });
                        return row;
                      });
                      columns.forEach((col, i) => {
                        columns[i] = col[0].toUpperCase() + col.slice(1);
                      });
                      tables.push({
                        title: 'Local files',
                        type: 'table',
                        columns,
                        rows
                      });
                    });
                  } else if (_d === 'labels') {
                    const obj = config.config[_d][0].label;
                    const columns = Object.keys(obj[0]);
                    if (!columns.includes('hidden')) {
                      columns.push('hidden');
                    }
                    const rows = obj.map(x => {
                      let row = [];
                      columns.forEach(key => {
                        row.push(x[key]);
                      });
                      return row;
                    });
                    columns.forEach((col, i) => {
                      columns[i] = col[0].toUpperCase() + col.slice(1);
                    });
                    tables.push({
                      title: 'Labels',
                      type: 'table',
                      columns,
                      rows
                    });
                  } else {
                    for (let _d2 of config.config[_d]) {
                      tables.push(...this.getConfigTables(context, _d2, section, idx));
                    }
                  }
                } else {
                  /*INTEGRITY MONITORING MONITORED DIRECTORIES */
                  if (config.config[_d].directories) {
                    const directories = config.config[_d].directories;
                    delete config.config[_d].directories;
                    tables.push(...this.getConfigTables(context, config.config[_d], section, idx));
                    let diffOpts = [];
                    Object.keys(section.opts).forEach(x => {
                      diffOpts.push(x);
                    });
                    const columns = ['', ...diffOpts.filter(x => x !== 'check_all' && x !== 'check_sum')];
                    let rows = [];
                    directories.forEach(x => {
                      let row = [];
                      row.push(x.path);
                      columns.forEach(y => {
                        if (y !== '') {
                          y = y !== 'check_whodata' ? y : 'whodata';
                          row.push(x[y] ? x[y] : 'no');
                        }
                      });
                      row.push(x.recursion_level);
                      rows.push(row);
                    });
                    columns.forEach((x, idx) => {
                      columns[idx] = section.opts[x];
                    });
                    columns.push('RL');
                    tables.push({
                      title: 'Monitored directories',
                      type: 'table',
                      columns,
                      rows
                    });
                  } else {
                    tables.push(...this.getConfigTables(context, config.config[_d], section, idx));
                  }
                }
                for (const table of tables) {
                  printer.addConfigTables([table]);
                }
                idx++;
                tables = [];
              }
              tables = [];
            }
          } else {
            printer.addContent({
              text: 'A configuration for this group has not yet been set up.',
              style: {
                fontSize: 12,
                color: '#000'
              },
              margin: [0, 10, 0, 15]
            });
          }
        }

        // Agents in group
        if (components['1']) {
          await this.renderHeader(context, printer, 'groupConfig', groupID, [], apiId);
        }
        await printer.print(context.wazuhEndpointParams.pathFilename);
        return response.ok({
          body: {
            success: true,
            message: `Report ${context.wazuhEndpointParams.filename} was created`,
            filename: context.wazuhEndpointParams.filename
          }
        });
      } catch (error) {
        context.wazuh.logger.error(error.message || error);
        return (0, _errorResponse.ErrorResponse)(error.message || error, 5029, 500, response);
      }
    }, ({
      params: {
        groupID
      }
    }) => `wazuh-group-configuration-${groupID}-${this.generateReportTimestamp()}.pdf`));
    /**
     * Create a report for the agents
     * @param {Object} context
     * @param {Object} request
     * @param {Object} response
     * @returns {*} reports list or ErrorResponse
     */
    _defineProperty(this, "createReportsAgentsConfiguration", this.checkReportsUserDirectoryIsValidRouteDecorator(async (context, request, response) => {
      try {
        context.wazuh.logger.debug('Report started');
        const {
          components,
          apiId
        } = request.body;
        const {
          agentID
        } = request.params;
        const printer = new _printer.ReportPrinter(context.wazuh.logger.get('report-printer'), context.wazuh_core.configuration);
        (0, _filesystem.createDataDirectoryIfNotExists)();
        (0, _filesystem.createDirectoryIfNotExists)(_constants.WAZUH_DATA_DOWNLOADS_DIRECTORY_PATH);
        (0, _filesystem.createDirectoryIfNotExists)(_constants.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH);
        (0, _filesystem.createDirectoryIfNotExists)(_path.default.join(_constants.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH, context.wazuhEndpointParams.hashUsername));
        let wmodulesResponse = {};
        let tables = [];
        try {
          wmodulesResponse = await context.wazuh.api.client.asCurrentUser.request('GET', `/agents/${agentID}/config/wmodules/wmodules`, {}, {
            apiHostID: apiId
          });
        } catch (error) {
          context.wazuh.logger.debug(error.message || error);
        }
        await this.renderHeader(context, printer, 'agentConfig', 'agentConfig', agentID, apiId);
        let idxComponent = 0;
        for (let config of _agentConfiguration.AgentConfiguration.configurations) {
          let titleOfSection = false;
          context.wazuh.logger.debug(`Iterate over ${config.sections.length} configuration sections`);
          for (let section of config.sections) {
            let titleOfSubsection = false;
            if (components[idxComponent] && (section.config || section.wodle)) {
              let idx = 0;
              const configs = (section.config || []).concat(section.wodle || []);
              context.wazuh.logger.debug(`Iterate over ${configs.length} configuration blocks`);
              for (let conf of configs) {
                let agentConfigResponse = {};
                try {
                  if (!conf['name']) {
                    agentConfigResponse = await context.wazuh.api.client.asCurrentUser.request('GET', `/agents/${agentID}/config/${conf.component}/${conf.configuration}`, {}, {
                      apiHostID: apiId
                    });
                  } else {
                    for (let wodle of wmodulesResponse.data.data['wmodules']) {
                      if (Object.keys(wodle)[0] === conf['name']) {
                        agentConfigResponse.data = {
                          data: wodle
                        };
                      }
                    }
                  }
                  const agentConfig = agentConfigResponse && agentConfigResponse.data && agentConfigResponse.data.data;
                  if (!titleOfSection) {
                    printer.addContent({
                      text: config.title,
                      style: 'h1',
                      margin: [0, 0, 0, 15]
                    });
                    titleOfSection = true;
                  }
                  if (!titleOfSubsection) {
                    printer.addContent({
                      text: section.subtitle,
                      style: 'h4'
                    });
                    printer.addContent({
                      text: section.desc,
                      style: {
                        fontSize: 12,
                        color: '#000'
                      },
                      margin: [0, 0, 0, 10]
                    });
                    titleOfSubsection = true;
                  }
                  if (agentConfig) {
                    for (let agentConfigKey of Object.keys(agentConfig)) {
                      if (Array.isArray(agentConfig[agentConfigKey])) {
                        /* LOG COLLECTOR */
                        if (conf.filterBy) {
                          let groups = [];
                          agentConfig[agentConfigKey].forEach(obj => {
                            if (!groups[obj.logformat]) {
                              groups[obj.logformat] = [];
                            }
                            groups[obj.logformat].push(obj);
                          });
                          Object.keys(groups).forEach(group => {
                            let saveidx = 0;
                            groups[group].forEach((x, i) => {
                              if (Object.keys(x).length > Object.keys(groups[group][saveidx]).length) {
                                saveidx = i;
                              }
                            });
                            const columns = Object.keys(groups[group][saveidx]);
                            const rows = groups[group].map(x => {
                              let row = [];
                              columns.forEach(key => {
                                row.push(typeof x[key] !== 'object' ? x[key] : Array.isArray(x[key]) ? x[key].map(x => {
                                  return x + '\n';
                                }) : JSON.stringify(x[key]));
                              });
                              return row;
                            });
                            columns.forEach((col, i) => {
                              columns[i] = col[0].toUpperCase() + col.slice(1);
                            });
                            tables.push({
                              title: section.labels[0][group],
                              type: 'table',
                              columns,
                              rows
                            });
                          });
                        } else if (agentConfigKey.configuration !== 'socket') {
                          tables.push(...this.getConfigTables(context, agentConfig[agentConfigKey], section, idx));
                        } else {
                          for (let _d2 of agentConfig[agentConfigKey]) {
                            tables.push(...this.getConfigTables(context, _d2, section, idx));
                          }
                        }
                      } else {
                        /* INTEGRITY MONITORING MONITORED DIRECTORIES */
                        if (conf.matrix) {
                          const {
                            directories,
                            diff,
                            synchronization,
                            file_limit,
                            ...rest
                          } = agentConfig[agentConfigKey];
                          tables.push(...this.getConfigTables(context, rest, section, idx), ...(diff && diff.disk_quota ? this.getConfigTables(context, diff.disk_quota, {
                            tabs: ['Disk quota']
                          }, 0) : []), ...(diff && diff.file_size ? this.getConfigTables(context, diff.file_size, {
                            tabs: ['File size']
                          }, 0) : []), ...(synchronization ? this.getConfigTables(context, synchronization, {
                            tabs: ['Synchronization']
                          }, 0) : []), ...(file_limit ? this.getConfigTables(context, file_limit, {
                            tabs: ['File limit']
                          }, 0) : []));
                          let diffOpts = [];
                          Object.keys(section.opts).forEach(x => {
                            diffOpts.push(x);
                          });
                          const columns = ['', ...diffOpts.filter(x => x !== 'check_all' && x !== 'check_sum')];
                          let rows = [];
                          directories.forEach(x => {
                            let row = [];
                            row.push(x.dir);
                            columns.forEach(y => {
                              if (y !== '') {
                                row.push(x.opts.indexOf(y) > -1 ? 'yes' : 'no');
                              }
                            });
                            row.push(x.recursion_level);
                            rows.push(row);
                          });
                          columns.forEach((x, idx) => {
                            columns[idx] = section.opts[x];
                          });
                          columns.push('RL');
                          tables.push({
                            title: 'Monitored directories',
                            type: 'table',
                            columns,
                            rows
                          });
                        } else {
                          tables.push(...this.getConfigTables(context, agentConfig[agentConfigKey], section, idx));
                        }
                      }
                    }
                  } else {
                    // Print no configured module and link to the documentation
                    printer.addContent({
                      text: ['This module is not configured. Please take a look on how to configure it in ', {
                        text: `${section.subtitle.toLowerCase()} configuration.`,
                        link: section.docuLink,
                        style: {
                          fontSize: 12,
                          color: '#1a0dab'
                        }
                      }],
                      margin: [0, 0, 0, 20]
                    });
                  }
                } catch (error) {
                  context.wazuh.logger.debug(error.message || error);
                }
                idx++;
              }
              for (const table of tables) {
                printer.addConfigTables([table]);
              }
            }
            idxComponent++;
            tables = [];
          }
        }
        await printer.print(context.wazuhEndpointParams.pathFilename);
        return response.ok({
          body: {
            success: true,
            message: `Report ${context.wazuhEndpointParams.filename} was created`,
            filename: context.wazuhEndpointParams.filename
          }
        });
      } catch (error) {
        context.wazuh.logger.debug(error.message || error);
        return (0, _errorResponse.ErrorResponse)(error.message || error, 5029, 500, response);
      }
    }, ({
      params: {
        agentID
      }
    }) => `wazuh-agent-configuration-${agentID}-${this.generateReportTimestamp()}.pdf`));
    /**
     * Create a report for the agents
     * @param {Object} context
     * @param {Object} request
     * @param {Object} response
     * @returns {*} reports list or ErrorResponse
     */
    _defineProperty(this, "createReportsAgentsInventory", this.checkReportsUserDirectoryIsValidRouteDecorator(async (context, request, response) => {
      try {
        context.wazuh.logger.debug('Report started');
        const {
          searchBar,
          filters,
          time,
          indexPatternTitle,
          apiId,
          serverSideQuery
        } = request.body;
        const {
          agentID
        } = request.params;
        const {
          from,
          to
        } = time || {};
        // Init
        const printer = new _printer.ReportPrinter(context.wazuh.logger.get('report-printer'), context.wazuh_core.configuration);
        const {
          hashUsername
        } = await context.wazuh.security.getCurrentUser(request, context);
        (0, _filesystem.createDataDirectoryIfNotExists)();
        (0, _filesystem.createDirectoryIfNotExists)(_constants.WAZUH_DATA_DOWNLOADS_DIRECTORY_PATH);
        (0, _filesystem.createDirectoryIfNotExists)(_constants.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH);
        (0, _filesystem.createDirectoryIfNotExists)(_path.default.join(_constants.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH, hashUsername));
        context.wazuh.logger.debug('Syscollector report');
        const [sanitizedFilters, agentsFilter] = filters ? this.sanitizeKibanaFilters(context, filters, searchBar) : [false, null];

        // Get the agent OS
        let agentOs = '';
        let isAgentWindows = false;
        let isAgentLinux = false;
        try {
          var _agentResponse$data, _agentResponse$data2;
          const agentResponse = await context.wazuh.api.client.asCurrentUser.request('GET', `/agents?agents_list=${agentID}`, {}, {
            apiHostID: apiId
          });
          isAgentWindows = (agentResponse === null || agentResponse === void 0 || (_agentResponse$data = agentResponse.data) === null || _agentResponse$data === void 0 || (_agentResponse$data = _agentResponse$data.data) === null || _agentResponse$data === void 0 || (_agentResponse$data = _agentResponse$data.affected_items) === null || _agentResponse$data === void 0 || (_agentResponse$data = _agentResponse$data[0].os) === null || _agentResponse$data === void 0 ? void 0 : _agentResponse$data.platform) === 'windows';
          isAgentLinux = agentResponse === null || agentResponse === void 0 || (_agentResponse$data2 = agentResponse.data) === null || _agentResponse$data2 === void 0 || (_agentResponse$data2 = _agentResponse$data2.data) === null || _agentResponse$data2 === void 0 || (_agentResponse$data2 = _agentResponse$data2.affected_items) === null || _agentResponse$data2 === void 0 || (_agentResponse$data2 = _agentResponse$data2[0].os) === null || _agentResponse$data2 === void 0 || (_agentResponse$data2 = _agentResponse$data2.uname) === null || _agentResponse$data2 === void 0 ? void 0 : _agentResponse$data2.includes('Linux');
          agentOs = isAgentWindows && 'windows' || isAgentLinux && 'linux' || '';
        } catch (error) {
          context.wazuh.logger.debug(error.message || error);
        }

        // Add title
        printer.addContentWithNewLine({
          text: 'Inventory data report',
          style: 'h1'
        });

        // Add table with the agent info
        await (0, _extendedInformation.buildAgentsTable)(context, printer, [agentID], apiId);

        // Get syscollector packages and processes
        const agentRequestsInventory = [{
          endpoint: `/syscollector/${agentID}/packages`,
          loggerMessage: `Fetching packages for agent ${agentID}`,
          table: {
            title: 'Packages',
            columns: agentOs === 'windows' ? [{
              id: 'name',
              label: 'Name'
            }, {
              id: 'architecture',
              label: 'Architecture'
            }, {
              id: 'version',
              label: 'Version'
            }, {
              id: 'vendor',
              label: 'Vendor'
            }] : [{
              id: 'name',
              label: 'Name'
            }, {
              id: 'architecture',
              label: 'Architecture'
            }, {
              id: 'version',
              label: 'Version'
            }, {
              id: 'vendor',
              label: 'Vendor'
            }, {
              id: 'description',
              label: 'Description'
            }]
          }
        }, {
          endpoint: `/syscollector/${agentID}/processes`,
          loggerMessage: `Fetching processes for agent ${agentID}`,
          table: {
            title: 'Processes',
            columns: agentOs === 'windows' ? [{
              id: 'name',
              label: 'Name'
            }, {
              id: 'cmd',
              label: 'CMD'
            }, {
              id: 'priority',
              label: 'Priority'
            }, {
              id: 'nlwp',
              label: 'NLWP'
            }] : [{
              id: 'name',
              label: 'Name'
            }, {
              id: 'euser',
              label: 'Effective user'
            }, {
              id: 'nice',
              label: 'Priority'
            }, {
              id: 'state',
              label: 'State'
            }]
          },
          mapResponseItems: item => agentOs === 'windows' ? item : {
            ...item,
            state: _processStateEquivalence.default[item.state]
          }
        }, {
          endpoint: `/syscollector/${agentID}/ports`,
          loggerMessage: `Fetching ports for agent ${agentID}`,
          table: {
            title: 'Network ports',
            columns: agentOs === 'windows' ? [{
              id: 'local_port',
              label: 'Local port'
            }, {
              id: 'local_ip',
              label: 'Local IP address'
            }, {
              id: 'process',
              label: 'Process'
            }, {
              id: 'state',
              label: 'State'
            }, {
              id: 'protocol',
              label: 'Protocol'
            }] : agentOs === 'linux' ? [{
              id: 'local_port',
              label: 'Local port'
            }, {
              id: 'local_ip',
              label: 'Local IP address'
            }, {
              id: 'process',
              label: 'Process'
            }, {
              id: 'pid',
              label: 'PID'
            }, {
              id: 'state',
              label: 'State'
            }, {
              id: 'protocol',
              label: 'Protocol'
            }] : [{
              id: 'local_port',
              label: 'Local port'
            }, {
              id: 'local_ip',
              label: 'Local IP address'
            }, {
              id: 'state',
              label: 'State'
            }, {
              id: 'protocol',
              label: 'Protocol'
            }]
          },
          mapResponseItems: item => ({
            ...item,
            local_ip: item.local.ip,
            local_port: item.local.port
          })
        }, {
          endpoint: `/syscollector/${agentID}/netiface`,
          loggerMessage: `Fetching netiface for agent ${agentID}`,
          table: {
            title: 'Network interfaces',
            columns: [{
              id: 'name',
              label: 'Name'
            }, {
              id: 'mac',
              label: 'Mac'
            }, {
              id: 'state',
              label: 'State'
            }, {
              id: 'mtu',
              label: 'MTU'
            }, {
              id: 'type',
              label: 'Type'
            }]
          }
        }, {
          endpoint: `/syscollector/${agentID}/netaddr`,
          loggerMessage: `Fetching netaddr for agent ${agentID}`,
          table: {
            title: 'Network settings',
            columns: [{
              id: 'iface',
              label: 'Interface'
            }, {
              id: 'address',
              label: 'Address'
            }, {
              id: 'netmask',
              label: 'Netmask'
            }, {
              id: 'proto',
              label: 'Protocol'
            }, {
              id: 'broadcast',
              label: 'Broadcast'
            }]
          }
        }];
        agentOs === 'windows' && agentRequestsInventory.push({
          endpoint: `/syscollector/${agentID}/hotfixes`,
          loggerMessage: `Fetching hotfixes for agent ${agentID}`,
          table: {
            title: 'Windows updates',
            columns: [{
              id: 'hotfix',
              label: 'Update code'
            }]
          }
        });
        const requestInventory = async agentRequestInventory => {
          try {
            context.wazuh.logger.debug(agentRequestInventory.loggerMessage);
            const inventoryResponse = await context.wazuh.api.client.asCurrentUser.request('GET', agentRequestInventory.endpoint, {}, {
              apiHostID: apiId
            });
            const inventory = inventoryResponse && inventoryResponse.data && inventoryResponse.data.data && inventoryResponse.data.data.affected_items;
            if (inventory) {
              return {
                ...agentRequestInventory.table,
                items: agentRequestInventory.mapResponseItems ? inventory.map(agentRequestInventory.mapResponseItems) : inventory
              };
            }
          } catch (error) {
            context.wazuh.logger.debug(error.message || error);
          }
        };
        if (time) {
          var _serverSideQuery$bool, _serverSideQuery$bool2;
          // Add Vulnerability Detector filter to the Server Side Query
          serverSideQuery === null || serverSideQuery === void 0 || (_serverSideQuery$bool = serverSideQuery.bool) === null || _serverSideQuery$bool === void 0 || (_serverSideQuery$bool = _serverSideQuery$bool.must) === null || _serverSideQuery$bool === void 0 || (_serverSideQuery$bool2 = _serverSideQuery$bool.push) === null || _serverSideQuery$bool2 === void 0 || _serverSideQuery$bool2.call(_serverSideQuery$bool, {
            match_phrase: {
              'rule.groups': {
                query: 'vulnerability-detector'
              }
            }
          });
          await (0, _extendedInformation.extendedInformation)(context, printer, 'agents', 'syscollector', apiId, from, to, serverSideQuery, agentsFilter, indexPatternTitle || context.wazuh_core.configuration.getSettingValue('pattern'), agentID);
        }

        // Add inventory tables
        (await Promise.all(agentRequestsInventory.map(requestInventory))).filter(table => table).forEach(table => printer.addSimpleTable(table));

        // Print the document
        await printer.print(context.wazuhEndpointParams.pathFilename);
        return response.ok({
          body: {
            success: true,
            message: `Report ${context.wazuhEndpointParams.filename} was created`,
            filename: context.wazuhEndpointParams.filename
          }
        });
      } catch (error) {
        context.wazuh.logger.error(error.message || error);
        return (0, _errorResponse.ErrorResponse)(error.message || error, 5029, 500, response);
      }
    }, ({
      params: {
        agentID
      }
    }) => `wazuh-agent-inventory-${agentID}-${this.generateReportTimestamp()}.pdf`));
    /**
     * Fetch specific report
     * @param {Object} context
     * @param {Object} request
     * @param {Object} response
     * @returns {Object} report or ErrorResponse
     */
    _defineProperty(this, "getReportByName", this.checkReportsUserDirectoryIsValidRouteDecorator(async (context, request, response) => {
      try {
        context.wazuh.logger.debug(`Getting ${context.wazuhEndpointParams.pathFilename} report`);
        const reportFileBuffer = _fs.default.readFileSync(context.wazuhEndpointParams.pathFilename);
        return response.ok({
          headers: {
            'Content-Type': 'application/pdf'
          },
          body: reportFileBuffer
        });
      } catch (error) {
        context.wazuh.logger.error(error.message || error);
        return (0, _errorResponse.ErrorResponse)(error.message || error, 5030, 500, response);
      }
    }, request => request.params.name));
    /**
     * Delete specific report
     * @param {Object} context
     * @param {Object} request
     * @param {Object} response
     * @returns {Object} status obj or ErrorResponse
     */
    _defineProperty(this, "deleteReportByName", this.checkReportsUserDirectoryIsValidRouteDecorator(async (context, request, response) => {
      try {
        context.wazuh.logger.debug(`Deleting ${context.wazuhEndpointParams.pathFilename} report`);
        _fs.default.unlinkSync(context.wazuhEndpointParams.pathFilename);
        context.wazuh.logger.info(`${context.wazuhEndpointParams.pathFilename} report was deleted`);
        return response.ok({
          body: {
            error: 0
          }
        });
      } catch (error) {
        context.wazuh.logger.error(error.message || error);
        return (0, _errorResponse.ErrorResponse)(error.message || error, 5032, 500, response);
      }
    }, request => request.params.name));
  }
  /**
   * This do format to filters
   * @param {String} filters E.g: cluster.name: wazuh AND rule.groups: vulnerability
   * @param {String} searchBar search term
   */
  sanitizeKibanaFilters(context, filters, searchBar) {
    context.wazuh.logger.debug(`Started to sanitize filters. filters: ${filters.length}, searchBar: ${searchBar}`);
    let str = '';
    const agentsFilter = {
      query: {},
      agentsText: ''
    };
    const agentsList = [];

    //separate agents filter
    filters = filters.filter(filter => {
      if (filter.meta.controlledBy === _constants.AUTHORIZED_AGENTS) {
        agentsFilter.query = filter.query;
        agentsList.push(filter);
        return false;
      }
      return filter;
    });
    const len = filters.length;
    for (let i = 0; i < len; i++) {
      const {
        negate,
        key,
        value,
        params,
        type
      } = filters[i].meta;
      str += `${negate ? 'NOT ' : ''}`;
      str += `${key}: `;
      str += `${type === 'range' ? `${params.gte}-${params.lt}` : type === 'phrases' ? '(' + params.join(' OR ') + ')' : type === 'exists' ? '*' : !!value ? value : (params || {}).query}`;
      str += `${i === len - 1 ? '' : ' AND '}`;
    }
    if (searchBar) {
      str += ` AND (${searchBar})`;
    }
    agentsFilter.agentsText = agentsList.map(filter => filter.meta.value).join(',');
    context.wazuh.logger.debug(`str: ${str}, agentsFilterStr: ${agentsFilter.agentsText}`);
    return [str, agentsFilter];
  }

  /**
   * This performs the rendering of given header
   * @param {String} printer section target
   * @param {String} section section target
   * @param {Object} tab tab target
   * @param {Boolean} isAgents is agents section
   * @param {String} apiId ID of API
   */
  async renderHeader(context, printer, section, tab, isAgents, apiId) {
    try {
      context.wazuh.logger.debug(`section: ${section}, tab: ${tab}, isAgents: ${isAgents}, apiId: ${apiId}`);
      if (section && typeof section === 'string') {
        if (!['agentConfig', 'groupConfig'].includes(section)) {
          printer.addContent({
            text: _wazuhModules.WAZUH_MODULES[tab].title + ' report',
            style: 'h1'
          });
        } else if (section === 'agentConfig') {
          printer.addContent({
            text: `Agent ${isAgents} configuration`,
            style: 'h1'
          });
        } else if (section === 'groupConfig') {
          printer.addContent({
            text: 'Agents in group',
            style: 'h1'
          });
        }
        printer.addNewLine();
      }
      if (isAgents && typeof isAgents === 'object') {
        await (0, _extendedInformation.buildAgentsTable)(context, printer, isAgents, apiId, section === 'groupConfig' ? tab : '');
      }
      if (isAgents && typeof isAgents === 'string') {
        const agentResponse = await context.wazuh.api.client.asCurrentUser.request('GET', `/agents`, {
          params: {
            agents_list: isAgents
          }
        }, {
          apiHostID: apiId
        });
        const agentData = agentResponse.data.data.affected_items[0];
        if (agentData && agentData.status !== _constants.API_NAME_AGENT_STATUS.ACTIVE) {
          printer.addContentWithNewLine({
            text: `Warning. Agent is ${(0, _wz_agent_status.agentStatusLabelByAgentStatus)(agentData.status).toLowerCase()}`,
            style: 'standard'
          });
        }
        await (0, _extendedInformation.buildAgentsTable)(context, printer, [isAgents], apiId);
        if (agentData && agentData.group) {
          const agentGroups = agentData.group.join(', ');
          printer.addContentWithNewLine({
            text: `Group${agentData.group.length > 1 ? 's' : ''}: ${agentGroups}`,
            style: 'standard'
          });
        }
      }
      if (_wazuhModules.WAZUH_MODULES[tab] && _wazuhModules.WAZUH_MODULES[tab].description) {
        printer.addContentWithNewLine({
          text: _wazuhModules.WAZUH_MODULES[tab].description,
          style: 'standard'
        });
      }
    } catch (error) {
      context.wazuh.logger.error(error.message || error);
      return Promise.reject(error);
    }
  }
  getConfigRows(context, data, labels) {
    context.wazuh.logger.debug('Building configuration rows');
    const result = [];
    for (let prop in data || []) {
      if (Array.isArray(data[prop])) {
        data[prop].forEach((x, idx) => {
          if (typeof x === 'object') data[prop][idx] = JSON.stringify(x);
        });
      }
      result.push([(labels || {})[prop] || _csvKeyEquivalence.KeyEquivalence[prop] || prop, data[prop] || '-']);
    }
    return result;
  }
  getConfigTables(context, data, section, tab, array = []) {
    context.wazuh.logger.debug('Building configuration tables');
    let plainData = {};
    const nestedData = [];
    const tableData = [];
    if (data.length === 1 && Array.isArray(data)) {
      tableData[section.config[tab].configuration] = data;
    } else {
      for (let key in data) {
        if (typeof data[key] !== 'object' && !Array.isArray(data[key]) || Array.isArray(data[key]) && typeof data[key][0] !== 'object') {
          plainData[key] = Array.isArray(data[key]) && typeof data[key][0] !== 'object' ? data[key].map(x => {
            return typeof x === 'object' ? JSON.stringify(x) : x + '\n';
          }) : data[key];
        } else if (Array.isArray(data[key]) && typeof data[key][0] === 'object') {
          tableData[key] = data[key];
        } else {
          if (section.isGroupConfig && ['pack', 'content'].includes(key)) {
            tableData[key] = [data[key]];
          } else {
            nestedData.push(data[key]);
          }
        }
      }
    }
    array.push({
      title: (section.options || {}).hideHeader ? '' : (section.tabs || [])[tab] || (section.isGroupConfig ? ((section.labels || [])[0] || [])[tab] : ''),
      columns: ['', ''],
      type: 'config',
      rows: this.getConfigRows(context, plainData, (section.labels || [])[0])
    });
    for (let key in tableData) {
      const columns = Object.keys(tableData[key][0]);
      columns.forEach((col, i) => {
        columns[i] = col[0].toUpperCase() + col.slice(1);
      });
      const rows = tableData[key].map(x => {
        let row = [];
        for (let key in x) {
          row.push(typeof x[key] !== 'object' ? x[key] : Array.isArray(x[key]) ? x[key].map(x => {
            return x + '\n';
          }) : JSON.stringify(x[key]));
        }
        while (row.length < columns.length) {
          row.push('-');
        }
        return row;
      });
      array.push({
        title: ((section.labels || [])[0] || [])[key] || '',
        type: 'table',
        columns,
        rows
      });
    }
    nestedData.forEach(nest => {
      this.getConfigTables(context, nest, section, tab + 1, array);
    });
    return array;
  }
  /**
   * Fetch the reports list
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Array<Object>} reports list or ErrorResponse
   */
  async getReports(context, request, response) {
    try {
      context.wazuh.logger.debug('Fetching created reports');
      const {
        hashUsername
      } = await context.wazuh.security.getCurrentUser(request, context);
      (0, _filesystem.createDataDirectoryIfNotExists)();
      (0, _filesystem.createDirectoryIfNotExists)(_constants.WAZUH_DATA_DOWNLOADS_DIRECTORY_PATH);
      (0, _filesystem.createDirectoryIfNotExists)(_constants.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH);
      const userReportsDirectoryPath = _path.default.join(_constants.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH, hashUsername);
      (0, _filesystem.createDirectoryIfNotExists)(userReportsDirectoryPath);
      context.wazuh.logger.debug(`Directory: ${userReportsDirectoryPath}`);
      const sortReportsByDate = (a, b) => a.date < b.date ? 1 : a.date > b.date ? -1 : 0;
      const reports = _fs.default.readdirSync(userReportsDirectoryPath).map(file => {
        const stats = _fs.default.statSync(userReportsDirectoryPath + '/' + file);
        // Get the file creation time (bithtime). It returns the first value that is a truthy value of next file stats: birthtime, mtime, ctime and atime.
        // This solves some OSs can have the bithtimeMs equal to 0 and returns the date like 1970-01-01
        const birthTimeField = ['birthtime', 'mtime', 'ctime', 'atime'].find(time => stats[`${time}Ms`]);
        return {
          name: file,
          size: stats.size,
          date: stats[birthTimeField]
        };
      });
      context.wazuh.logger.debug(`Using TimSort for sorting ${reports.length} items`);
      TimSort.sort(reports, sortReportsByDate);
      context.wazuh.logger.debug(`Total reports: ${reports.length}`);
      return response.ok({
        body: {
          reports
        }
      });
    } catch (error) {
      context.wazuh.logger.error(error.message || error);
      return (0, _errorResponse.ErrorResponse)(error.message || error, 5031, 500, response);
    }
  }
  checkReportsUserDirectoryIsValidRouteDecorator(routeHandler, reportFileNameAccessor) {
    return async (context, request, response) => {
      try {
        const {
          username,
          hashUsername
        } = await context.wazuh.security.getCurrentUser(request, context);
        const userReportsDirectoryPath = _path.default.join(_constants.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH, hashUsername);
        const filename = reportFileNameAccessor(request);
        const pathFilename = _path.default.join(userReportsDirectoryPath, filename);
        context.wazuh.logger.debug(`Checking the user ${username}(${hashUsername}) can do actions in the reports file: ${pathFilename}`);
        if (!pathFilename.startsWith(userReportsDirectoryPath) || pathFilename.includes('../')) {
          context.wazuh.logger.warn(`User ${username}(${hashUsername}) tried to access to a non user report file: ${pathFilename}`);
          return response.badRequest({
            body: {
              message: '5040 - You shall not pass!'
            }
          });
        }
        context.wazuh.logger.debug('Checking the user can do actions in the reports file');
        return await routeHandler.bind(this)({
          ...context,
          wazuhEndpointParams: {
            hashUsername,
            filename,
            pathFilename
          }
        }, request, response);
      } catch (error) {
        context.wazuh.logger.error(error.message || error);
        return (0, _errorResponse.ErrorResponse)(error.message || error, 5040, 500, response);
      }
    };
  }
  generateReportTimestamp() {
    return `${Date.now() / 1000 | 0}`;
  }
}
exports.WazuhReportingCtrl = WazuhReportingCtrl;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfcGF0aCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX2ZzIiwiX3dhenVoTW9kdWxlcyIsIlRpbVNvcnQiLCJfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCIsIl9lcnJvclJlc3BvbnNlIiwiX3Byb2Nlc3NTdGF0ZUVxdWl2YWxlbmNlIiwiX2NzdktleUVxdWl2YWxlbmNlIiwiX2FnZW50Q29uZmlndXJhdGlvbiIsIl9leHRlbmRlZEluZm9ybWF0aW9uIiwiX3ByaW50ZXIiLCJfY29uc3RhbnRzIiwiX2ZpbGVzeXN0ZW0iLCJfd3pfYWdlbnRfc3RhdHVzIiwiX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlIiwiZSIsIldlYWtNYXAiLCJyIiwidCIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0IiwiaGFzIiwiZ2V0IiwibiIsIl9fcHJvdG9fXyIsImEiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsInUiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsImNhbGwiLCJpIiwic2V0Iiwib2JqIiwiX2RlZmluZVByb3BlcnR5Iiwia2V5IiwidmFsdWUiLCJfdG9Qcm9wZXJ0eUtleSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImFyZyIsIl90b1ByaW1pdGl2ZSIsIlN0cmluZyIsImlucHV0IiwiaGludCIsInByaW0iLCJTeW1ib2wiLCJ0b1ByaW1pdGl2ZSIsInVuZGVmaW5lZCIsInJlcyIsIlR5cGVFcnJvciIsIk51bWJlciIsIldhenVoUmVwb3J0aW5nQ3RybCIsImNvbnN0cnVjdG9yIiwiY2hlY2tSZXBvcnRzVXNlckRpcmVjdG9yeUlzVmFsaWRSb3V0ZURlY29yYXRvciIsImNvbnRleHQiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJ3YXp1aCIsImxvZ2dlciIsImRlYnVnIiwiYXJyYXkiLCJhZ2VudHMiLCJicm93c2VyVGltZXpvbmUiLCJzZWFyY2hCYXIiLCJmaWx0ZXJzIiwic2VydmVyU2lkZVF1ZXJ5IiwidGltZSIsInRhYmxlcyIsInNlY3Rpb24iLCJpbmRleFBhdHRlcm5UaXRsZSIsImFwaUlkIiwiYm9keSIsIm1vZHVsZUlEIiwicGFyYW1zIiwiZnJvbSIsInRvIiwiYWRkaXRpb25hbFRhYmxlcyIsInByaW50ZXIiLCJSZXBvcnRQcmludGVyIiwid2F6dWhfY29yZSIsImNvbmZpZ3VyYXRpb24iLCJjcmVhdGVEYXRhRGlyZWN0b3J5SWZOb3RFeGlzdHMiLCJjcmVhdGVEaXJlY3RvcnlJZk5vdEV4aXN0cyIsIldBWlVIX0RBVEFfRE9XTkxPQURTX0RJUkVDVE9SWV9QQVRIIiwiV0FaVUhfREFUQV9ET1dOTE9BRFNfUkVQT1JUU19ESVJFQ1RPUllfUEFUSCIsInBhdGgiLCJqb2luIiwid2F6dWhFbmRwb2ludFBhcmFtcyIsImhhc2hVc2VybmFtZSIsInJlbmRlckhlYWRlciIsInNhbml0aXplZEZpbHRlcnMiLCJhZ2VudHNGaWx0ZXIiLCJzYW5pdGl6ZUtpYmFuYUZpbHRlcnMiLCJhZGRUaW1lUmFuZ2VBbmRGaWx0ZXJzIiwiZXh0ZW5kZWRJbmZvcm1hdGlvbiIsIkRhdGUiLCJnZXRUaW1lIiwiZ2V0U2V0dGluZ1ZhbHVlIiwiYWRkVmlzdWFsaXphdGlvbnMiLCJhZGRUYWJsZXMiLCJhZ2VudHNUZXh0IiwiYWRkQWdlbnRzRmlsdGVycyIsInByaW50IiwicGF0aEZpbGVuYW1lIiwib2siLCJzdWNjZXNzIiwibWVzc2FnZSIsImZpbGVuYW1lIiwiZXJyb3IiLCJFcnJvclJlc3BvbnNlIiwiZ2VuZXJhdGVSZXBvcnRUaW1lc3RhbXAiLCJjb21wb25lbnRzIiwiZ3JvdXBJRCIsImVxdWl2YWxlbmNlcyIsImxvY2FsZmlsZSIsIm9zcXVlcnkiLCJjb21tYW5kIiwic3lzY2hlY2siLCJzeXNjb2xsZWN0b3IiLCJyb290Y2hlY2siLCJsYWJlbHMiLCJzY2EiLCJhZGRDb250ZW50IiwidGV4dCIsInN0eWxlIiwiZGF0YSIsImFwaSIsImNsaWVudCIsImFzQ3VycmVudFVzZXIiLCJhcGlIb3N0SUQiLCJhZmZlY3RlZF9pdGVtcyIsImxlbmd0aCIsImtleXMiLCJjb25maWciLCJmb250U2l6ZSIsImNvbG9yIiwibWFyZ2luIiwiaXNHcm91cENvbmZpZyIsImZpbHRlclRpdGxlIiwiaW5kZXgiLCJmaWx0ZXIiLCJjb25jYXQiLCJpZHgiLCJ0YWJzIiwiX2QiLCJjIiwiQWdlbnRDb25maWd1cmF0aW9uIiwiY29uZmlndXJhdGlvbnMiLCJzIiwic2VjdGlvbnMiLCJvcHRzIiwiY24iLCJ3byIsIndvZGxlIiwibmFtZSIsInB1c2giLCJBcnJheSIsImlzQXJyYXkiLCJncm91cHMiLCJmb3JFYWNoIiwibG9nZm9ybWF0IiwiZ3JvdXAiLCJzYXZlaWR4IiwieCIsImNvbHVtbnMiLCJyb3dzIiwibWFwIiwicm93IiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJ0aXRsZSIsInR5cGUiLCJsYWJlbCIsImluY2x1ZGVzIiwiX2QyIiwiZ2V0Q29uZmlnVGFibGVzIiwiZGlyZWN0b3JpZXMiLCJkaWZmT3B0cyIsInkiLCJyZWN1cnNpb25fbGV2ZWwiLCJ0YWJsZSIsImFkZENvbmZpZ1RhYmxlcyIsImFnZW50SUQiLCJ3bW9kdWxlc1Jlc3BvbnNlIiwiaWR4Q29tcG9uZW50IiwidGl0bGVPZlNlY3Rpb24iLCJ0aXRsZU9mU3Vic2VjdGlvbiIsImNvbmZpZ3MiLCJjb25mIiwiYWdlbnRDb25maWdSZXNwb25zZSIsImNvbXBvbmVudCIsImFnZW50Q29uZmlnIiwic3VidGl0bGUiLCJkZXNjIiwiYWdlbnRDb25maWdLZXkiLCJmaWx0ZXJCeSIsIm1hdHJpeCIsImRpZmYiLCJzeW5jaHJvbml6YXRpb24iLCJmaWxlX2xpbWl0IiwicmVzdCIsImRpc2tfcXVvdGEiLCJmaWxlX3NpemUiLCJkaXIiLCJpbmRleE9mIiwidG9Mb3dlckNhc2UiLCJsaW5rIiwiZG9jdUxpbmsiLCJzZWN1cml0eSIsImdldEN1cnJlbnRVc2VyIiwiYWdlbnRPcyIsImlzQWdlbnRXaW5kb3dzIiwiaXNBZ2VudExpbnV4IiwiX2FnZW50UmVzcG9uc2UkZGF0YSIsIl9hZ2VudFJlc3BvbnNlJGRhdGEyIiwiYWdlbnRSZXNwb25zZSIsIm9zIiwicGxhdGZvcm0iLCJ1bmFtZSIsImFkZENvbnRlbnRXaXRoTmV3TGluZSIsImJ1aWxkQWdlbnRzVGFibGUiLCJhZ2VudFJlcXVlc3RzSW52ZW50b3J5IiwiZW5kcG9pbnQiLCJsb2dnZXJNZXNzYWdlIiwiaWQiLCJtYXBSZXNwb25zZUl0ZW1zIiwiaXRlbSIsInN0YXRlIiwiUHJvY2Vzc0VxdWl2YWxlbmNlIiwibG9jYWxfaXAiLCJsb2NhbCIsImlwIiwibG9jYWxfcG9ydCIsInBvcnQiLCJyZXF1ZXN0SW52ZW50b3J5IiwiYWdlbnRSZXF1ZXN0SW52ZW50b3J5IiwiaW52ZW50b3J5UmVzcG9uc2UiLCJpbnZlbnRvcnkiLCJpdGVtcyIsIl9zZXJ2ZXJTaWRlUXVlcnkkYm9vbCIsIl9zZXJ2ZXJTaWRlUXVlcnkkYm9vbDIiLCJib29sIiwibXVzdCIsIm1hdGNoX3BocmFzZSIsInF1ZXJ5IiwiUHJvbWlzZSIsImFsbCIsImFkZFNpbXBsZVRhYmxlIiwicmVwb3J0RmlsZUJ1ZmZlciIsImZzIiwicmVhZEZpbGVTeW5jIiwiaGVhZGVycyIsInVubGlua1N5bmMiLCJpbmZvIiwic3RyIiwiYWdlbnRzTGlzdCIsIm1ldGEiLCJjb250cm9sbGVkQnkiLCJBVVRIT1JJWkVEX0FHRU5UUyIsImxlbiIsIm5lZ2F0ZSIsImd0ZSIsImx0IiwidGFiIiwiaXNBZ2VudHMiLCJXQVpVSF9NT0RVTEVTIiwiYWRkTmV3TGluZSIsImFnZW50c19saXN0IiwiYWdlbnREYXRhIiwic3RhdHVzIiwiQVBJX05BTUVfQUdFTlRfU1RBVFVTIiwiQUNUSVZFIiwiYWdlbnRTdGF0dXNMYWJlbEJ5QWdlbnRTdGF0dXMiLCJhZ2VudEdyb3VwcyIsImRlc2NyaXB0aW9uIiwicmVqZWN0IiwiZ2V0Q29uZmlnUm93cyIsInJlc3VsdCIsInByb3AiLCJLZXlFcXVpdmFsZW5jZSIsInBsYWluRGF0YSIsIm5lc3RlZERhdGEiLCJ0YWJsZURhdGEiLCJvcHRpb25zIiwiaGlkZUhlYWRlciIsIm5lc3QiLCJnZXRSZXBvcnRzIiwidXNlclJlcG9ydHNEaXJlY3RvcnlQYXRoIiwic29ydFJlcG9ydHNCeURhdGUiLCJiIiwiZGF0ZSIsInJlcG9ydHMiLCJyZWFkZGlyU3luYyIsImZpbGUiLCJzdGF0cyIsInN0YXRTeW5jIiwiYmlydGhUaW1lRmllbGQiLCJmaW5kIiwic2l6ZSIsInNvcnQiLCJyb3V0ZUhhbmRsZXIiLCJyZXBvcnRGaWxlTmFtZUFjY2Vzc29yIiwidXNlcm5hbWUiLCJzdGFydHNXaXRoIiwid2FybiIsImJhZFJlcXVlc3QiLCJiaW5kIiwibm93IiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIndhenVoLXJlcG9ydGluZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogV2F6dWggYXBwIC0gQ2xhc3MgZm9yIFdhenVoIHJlcG9ydGluZyBjb250cm9sbGVyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTUtMjAyMiBXYXp1aCwgSW5jLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOyB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbjsgZWl0aGVyIHZlcnNpb24gMiBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogRmluZCBtb3JlIGluZm9ybWF0aW9uIGFib3V0IHRoaXMgb24gdGhlIExJQ0VOU0UgZmlsZS5cbiAqL1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHsgV0FaVUhfTU9EVUxFUyB9IGZyb20gJy4uLy4uL2NvbW1vbi93YXp1aC1tb2R1bGVzJztcbmltcG9ydCAqIGFzIFRpbVNvcnQgZnJvbSAndGltc29ydCc7XG5pbXBvcnQgeyBFcnJvclJlc3BvbnNlIH0gZnJvbSAnLi4vbGliL2Vycm9yLXJlc3BvbnNlJztcbmltcG9ydCBQcm9jZXNzRXF1aXZhbGVuY2UgZnJvbSAnLi4vbGliL3Byb2Nlc3Mtc3RhdGUtZXF1aXZhbGVuY2UnO1xuaW1wb3J0IHsgS2V5RXF1aXZhbGVuY2UgfSBmcm9tICcuLi8uLi9jb21tb24vY3N2LWtleS1lcXVpdmFsZW5jZSc7XG5pbXBvcnQgeyBBZ2VudENvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi9saWIvcmVwb3J0aW5nL2FnZW50LWNvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtcbiAgT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gIE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxufSBmcm9tICdzcmMvY29yZS9zZXJ2ZXInO1xuaW1wb3J0IHtcbiAgZXh0ZW5kZWRJbmZvcm1hdGlvbixcbiAgYnVpbGRBZ2VudHNUYWJsZSxcbn0gZnJvbSAnLi4vbGliL3JlcG9ydGluZy9leHRlbmRlZC1pbmZvcm1hdGlvbic7XG5pbXBvcnQgeyBSZXBvcnRQcmludGVyIH0gZnJvbSAnLi4vbGliL3JlcG9ydGluZy9wcmludGVyJztcbmltcG9ydCB7XG4gIFdBWlVIX0RBVEFfRE9XTkxPQURTX0RJUkVDVE9SWV9QQVRILFxuICBXQVpVSF9EQVRBX0RPV05MT0FEU19SRVBPUlRTX0RJUkVDVE9SWV9QQVRILFxuICBBVVRIT1JJWkVEX0FHRU5UUyxcbiAgQVBJX05BTUVfQUdFTlRfU1RBVFVTLFxufSBmcm9tICcuLi8uLi9jb21tb24vY29uc3RhbnRzJztcbmltcG9ydCB7XG4gIGNyZWF0ZURpcmVjdG9yeUlmTm90RXhpc3RzLFxuICBjcmVhdGVEYXRhRGlyZWN0b3J5SWZOb3RFeGlzdHMsXG59IGZyb20gJy4uL2xpYi9maWxlc3lzdGVtJztcbmltcG9ydCB7IGFnZW50U3RhdHVzTGFiZWxCeUFnZW50U3RhdHVzIH0gZnJvbSAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL3d6X2FnZW50X3N0YXR1cyc7XG5cbmludGVyZmFjZSBBZ2VudHNGaWx0ZXIge1xuICBxdWVyeTogYW55O1xuICBhZ2VudHNUZXh0OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBXYXp1aFJlcG9ydGluZ0N0cmwge1xuICBjb25zdHJ1Y3RvcigpIHt9XG4gIC8qKlxuICAgKiBUaGlzIGRvIGZvcm1hdCB0byBmaWx0ZXJzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBmaWx0ZXJzIEUuZzogY2x1c3Rlci5uYW1lOiB3YXp1aCBBTkQgcnVsZS5ncm91cHM6IHZ1bG5lcmFiaWxpdHlcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaEJhciBzZWFyY2ggdGVybVxuICAgKi9cbiAgcHJpdmF0ZSBzYW5pdGl6ZUtpYmFuYUZpbHRlcnMoXG4gICAgY29udGV4dDogYW55LFxuICAgIGZpbHRlcnM6IGFueSxcbiAgICBzZWFyY2hCYXI/OiBzdHJpbmcsXG4gICk6IFtzdHJpbmcsIEFnZW50c0ZpbHRlcl0ge1xuICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKFxuICAgICAgYFN0YXJ0ZWQgdG8gc2FuaXRpemUgZmlsdGVycy4gZmlsdGVyczogJHtmaWx0ZXJzLmxlbmd0aH0sIHNlYXJjaEJhcjogJHtzZWFyY2hCYXJ9YCxcbiAgICApO1xuICAgIGxldCBzdHIgPSAnJztcblxuICAgIGNvbnN0IGFnZW50c0ZpbHRlcjogQWdlbnRzRmlsdGVyID0geyBxdWVyeToge30sIGFnZW50c1RleHQ6ICcnIH07XG4gICAgY29uc3QgYWdlbnRzTGlzdDogc3RyaW5nW10gPSBbXTtcblxuICAgIC8vc2VwYXJhdGUgYWdlbnRzIGZpbHRlclxuICAgIGZpbHRlcnMgPSBmaWx0ZXJzLmZpbHRlcihmaWx0ZXIgPT4ge1xuICAgICAgaWYgKGZpbHRlci5tZXRhLmNvbnRyb2xsZWRCeSA9PT0gQVVUSE9SSVpFRF9BR0VOVFMpIHtcbiAgICAgICAgYWdlbnRzRmlsdGVyLnF1ZXJ5ID0gZmlsdGVyLnF1ZXJ5O1xuICAgICAgICBhZ2VudHNMaXN0LnB1c2goZmlsdGVyKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZpbHRlcjtcbiAgICB9KTtcblxuICAgIGNvbnN0IGxlbiA9IGZpbHRlcnMubGVuZ3RoO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgeyBuZWdhdGUsIGtleSwgdmFsdWUsIHBhcmFtcywgdHlwZSB9ID0gZmlsdGVyc1tpXS5tZXRhO1xuICAgICAgc3RyICs9IGAke25lZ2F0ZSA/ICdOT1QgJyA6ICcnfWA7XG4gICAgICBzdHIgKz0gYCR7a2V5fTogYDtcbiAgICAgIHN0ciArPSBgJHtcbiAgICAgICAgdHlwZSA9PT0gJ3JhbmdlJ1xuICAgICAgICAgID8gYCR7cGFyYW1zLmd0ZX0tJHtwYXJhbXMubHR9YFxuICAgICAgICAgIDogdHlwZSA9PT0gJ3BocmFzZXMnXG4gICAgICAgICAgPyAnKCcgKyBwYXJhbXMuam9pbignIE9SICcpICsgJyknXG4gICAgICAgICAgOiB0eXBlID09PSAnZXhpc3RzJ1xuICAgICAgICAgID8gJyonXG4gICAgICAgICAgOiAhIXZhbHVlXG4gICAgICAgICAgPyB2YWx1ZVxuICAgICAgICAgIDogKHBhcmFtcyB8fCB7fSkucXVlcnlcbiAgICAgIH1gO1xuICAgICAgc3RyICs9IGAke2kgPT09IGxlbiAtIDEgPyAnJyA6ICcgQU5EICd9YDtcbiAgICB9XG5cbiAgICBpZiAoc2VhcmNoQmFyKSB7XG4gICAgICBzdHIgKz0gYCBBTkQgKCR7c2VhcmNoQmFyfSlgO1xuICAgIH1cblxuICAgIGFnZW50c0ZpbHRlci5hZ2VudHNUZXh0ID0gYWdlbnRzTGlzdFxuICAgICAgLm1hcChmaWx0ZXIgPT4gZmlsdGVyLm1ldGEudmFsdWUpXG4gICAgICAuam9pbignLCcpO1xuXG4gICAgY29udGV4dC53YXp1aC5sb2dnZXIuZGVidWcoXG4gICAgICBgc3RyOiAke3N0cn0sIGFnZW50c0ZpbHRlclN0cjogJHthZ2VudHNGaWx0ZXIuYWdlbnRzVGV4dH1gLFxuICAgICk7XG5cbiAgICByZXR1cm4gW3N0ciwgYWdlbnRzRmlsdGVyXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIHBlcmZvcm1zIHRoZSByZW5kZXJpbmcgb2YgZ2l2ZW4gaGVhZGVyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcmludGVyIHNlY3Rpb24gdGFyZ2V0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWN0aW9uIHNlY3Rpb24gdGFyZ2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YWIgdGFiIHRhcmdldFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IGlzQWdlbnRzIGlzIGFnZW50cyBzZWN0aW9uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBhcGlJZCBJRCBvZiBBUElcbiAgICovXG4gIHByaXZhdGUgYXN5bmMgcmVuZGVySGVhZGVyKGNvbnRleHQsIHByaW50ZXIsIHNlY3Rpb24sIHRhYiwgaXNBZ2VudHMsIGFwaUlkKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKFxuICAgICAgICBgc2VjdGlvbjogJHtzZWN0aW9ufSwgdGFiOiAke3RhYn0sIGlzQWdlbnRzOiAke2lzQWdlbnRzfSwgYXBpSWQ6ICR7YXBpSWR9YCxcbiAgICAgICk7XG4gICAgICBpZiAoc2VjdGlvbiAmJiB0eXBlb2Ygc2VjdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKCFbJ2FnZW50Q29uZmlnJywgJ2dyb3VwQ29uZmlnJ10uaW5jbHVkZXMoc2VjdGlvbikpIHtcbiAgICAgICAgICBwcmludGVyLmFkZENvbnRlbnQoe1xuICAgICAgICAgICAgdGV4dDogV0FaVUhfTU9EVUxFU1t0YWJdLnRpdGxlICsgJyByZXBvcnQnLFxuICAgICAgICAgICAgc3R5bGU6ICdoMScsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2VjdGlvbiA9PT0gJ2FnZW50Q29uZmlnJykge1xuICAgICAgICAgIHByaW50ZXIuYWRkQ29udGVudCh7XG4gICAgICAgICAgICB0ZXh0OiBgQWdlbnQgJHtpc0FnZW50c30gY29uZmlndXJhdGlvbmAsXG4gICAgICAgICAgICBzdHlsZTogJ2gxJyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChzZWN0aW9uID09PSAnZ3JvdXBDb25maWcnKSB7XG4gICAgICAgICAgcHJpbnRlci5hZGRDb250ZW50KHtcbiAgICAgICAgICAgIHRleHQ6ICdBZ2VudHMgaW4gZ3JvdXAnLFxuICAgICAgICAgICAgc3R5bGU6ICdoMScsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcHJpbnRlci5hZGROZXdMaW5lKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0FnZW50cyAmJiB0eXBlb2YgaXNBZ2VudHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGF3YWl0IGJ1aWxkQWdlbnRzVGFibGUoXG4gICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICBwcmludGVyLFxuICAgICAgICAgIGlzQWdlbnRzLFxuICAgICAgICAgIGFwaUlkLFxuICAgICAgICAgIHNlY3Rpb24gPT09ICdncm91cENvbmZpZycgPyB0YWIgOiAnJyxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzQWdlbnRzICYmIHR5cGVvZiBpc0FnZW50cyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29uc3QgYWdlbnRSZXNwb25zZSA9XG4gICAgICAgICAgYXdhaXQgY29udGV4dC53YXp1aC5hcGkuY2xpZW50LmFzQ3VycmVudFVzZXIucmVxdWVzdChcbiAgICAgICAgICAgICdHRVQnLFxuICAgICAgICAgICAgYC9hZ2VudHNgLFxuICAgICAgICAgICAgeyBwYXJhbXM6IHsgYWdlbnRzX2xpc3Q6IGlzQWdlbnRzIH0gfSxcbiAgICAgICAgICAgIHsgYXBpSG9zdElEOiBhcGlJZCB9LFxuICAgICAgICAgICk7XG4gICAgICAgIGNvbnN0IGFnZW50RGF0YSA9IGFnZW50UmVzcG9uc2UuZGF0YS5kYXRhLmFmZmVjdGVkX2l0ZW1zWzBdO1xuICAgICAgICBpZiAoYWdlbnREYXRhICYmIGFnZW50RGF0YS5zdGF0dXMgIT09IEFQSV9OQU1FX0FHRU5UX1NUQVRVUy5BQ1RJVkUpIHtcbiAgICAgICAgICBwcmludGVyLmFkZENvbnRlbnRXaXRoTmV3TGluZSh7XG4gICAgICAgICAgICB0ZXh0OiBgV2FybmluZy4gQWdlbnQgaXMgJHthZ2VudFN0YXR1c0xhYmVsQnlBZ2VudFN0YXR1cyhcbiAgICAgICAgICAgICAgYWdlbnREYXRhLnN0YXR1cyxcbiAgICAgICAgICAgICkudG9Mb3dlckNhc2UoKX1gLFxuICAgICAgICAgICAgc3R5bGU6ICdzdGFuZGFyZCcsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgYnVpbGRBZ2VudHNUYWJsZShjb250ZXh0LCBwcmludGVyLCBbaXNBZ2VudHNdLCBhcGlJZCk7XG5cbiAgICAgICAgaWYgKGFnZW50RGF0YSAmJiBhZ2VudERhdGEuZ3JvdXApIHtcbiAgICAgICAgICBjb25zdCBhZ2VudEdyb3VwcyA9IGFnZW50RGF0YS5ncm91cC5qb2luKCcsICcpO1xuICAgICAgICAgIHByaW50ZXIuYWRkQ29udGVudFdpdGhOZXdMaW5lKHtcbiAgICAgICAgICAgIHRleHQ6IGBHcm91cCR7XG4gICAgICAgICAgICAgIGFnZW50RGF0YS5ncm91cC5sZW5ndGggPiAxID8gJ3MnIDogJydcbiAgICAgICAgICAgIH06ICR7YWdlbnRHcm91cHN9YCxcbiAgICAgICAgICAgIHN0eWxlOiAnc3RhbmRhcmQnLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoV0FaVUhfTU9EVUxFU1t0YWJdICYmIFdBWlVIX01PRFVMRVNbdGFiXS5kZXNjcmlwdGlvbikge1xuICAgICAgICBwcmludGVyLmFkZENvbnRlbnRXaXRoTmV3TGluZSh7XG4gICAgICAgICAgdGV4dDogV0FaVUhfTU9EVUxFU1t0YWJdLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIHN0eWxlOiAnc3RhbmRhcmQnLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29uZmlnUm93cyhjb250ZXh0LCBkYXRhLCBsYWJlbHMpIHtcbiAgICBjb250ZXh0LndhenVoLmxvZ2dlci5kZWJ1ZygnQnVpbGRpbmcgY29uZmlndXJhdGlvbiByb3dzJyk7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgZm9yIChsZXQgcHJvcCBpbiBkYXRhIHx8IFtdKSB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhW3Byb3BdKSkge1xuICAgICAgICBkYXRhW3Byb3BdLmZvckVhY2goKHgsIGlkeCkgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgeCA9PT0gJ29iamVjdCcpIGRhdGFbcHJvcF1baWR4XSA9IEpTT04uc3RyaW5naWZ5KHgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKFtcbiAgICAgICAgKGxhYmVscyB8fCB7fSlbcHJvcF0gfHwgS2V5RXF1aXZhbGVuY2VbcHJvcF0gfHwgcHJvcCxcbiAgICAgICAgZGF0YVtwcm9wXSB8fCAnLScsXG4gICAgICBdKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0Q29uZmlnVGFibGVzKGNvbnRleHQsIGRhdGEsIHNlY3Rpb24sIHRhYiwgYXJyYXkgPSBbXSkge1xuICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKCdCdWlsZGluZyBjb25maWd1cmF0aW9uIHRhYmxlcycpO1xuICAgIGxldCBwbGFpbkRhdGEgPSB7fTtcbiAgICBjb25zdCBuZXN0ZWREYXRhID0gW107XG4gICAgY29uc3QgdGFibGVEYXRhID0gW107XG5cbiAgICBpZiAoZGF0YS5sZW5ndGggPT09IDEgJiYgQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgdGFibGVEYXRhW3NlY3Rpb24uY29uZmlnW3RhYl0uY29uZmlndXJhdGlvbl0gPSBkYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGxldCBrZXkgaW4gZGF0YSkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKHR5cGVvZiBkYXRhW2tleV0gIT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KGRhdGFba2V5XSkpIHx8XG4gICAgICAgICAgKEFycmF5LmlzQXJyYXkoZGF0YVtrZXldKSAmJiB0eXBlb2YgZGF0YVtrZXldWzBdICE9PSAnb2JqZWN0JylcbiAgICAgICAgKSB7XG4gICAgICAgICAgcGxhaW5EYXRhW2tleV0gPVxuICAgICAgICAgICAgQXJyYXkuaXNBcnJheShkYXRhW2tleV0pICYmIHR5cGVvZiBkYXRhW2tleV1bMF0gIT09ICdvYmplY3QnXG4gICAgICAgICAgICAgID8gZGF0YVtrZXldLm1hcCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ29iamVjdCcgPyBKU09OLnN0cmluZ2lmeSh4KSA6IHggKyAnXFxuJztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICA6IGRhdGFba2V5XTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBBcnJheS5pc0FycmF5KGRhdGFba2V5XSkgJiZcbiAgICAgICAgICB0eXBlb2YgZGF0YVtrZXldWzBdID09PSAnb2JqZWN0J1xuICAgICAgICApIHtcbiAgICAgICAgICB0YWJsZURhdGFba2V5XSA9IGRhdGFba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2VjdGlvbi5pc0dyb3VwQ29uZmlnICYmIFsncGFjaycsICdjb250ZW50J10uaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICAgICAgdGFibGVEYXRhW2tleV0gPSBbZGF0YVtrZXldXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmVzdGVkRGF0YS5wdXNoKGRhdGFba2V5XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGFycmF5LnB1c2goe1xuICAgICAgdGl0bGU6IChzZWN0aW9uLm9wdGlvbnMgfHwge30pLmhpZGVIZWFkZXJcbiAgICAgICAgPyAnJ1xuICAgICAgICA6IChzZWN0aW9uLnRhYnMgfHwgW10pW3RhYl0gfHxcbiAgICAgICAgICAoc2VjdGlvbi5pc0dyb3VwQ29uZmlnID8gKChzZWN0aW9uLmxhYmVscyB8fCBbXSlbMF0gfHwgW10pW3RhYl0gOiAnJyksXG4gICAgICBjb2x1bW5zOiBbJycsICcnXSxcbiAgICAgIHR5cGU6ICdjb25maWcnLFxuICAgICAgcm93czogdGhpcy5nZXRDb25maWdSb3dzKGNvbnRleHQsIHBsYWluRGF0YSwgKHNlY3Rpb24ubGFiZWxzIHx8IFtdKVswXSksXG4gICAgfSk7XG4gICAgZm9yIChsZXQga2V5IGluIHRhYmxlRGF0YSkge1xuICAgICAgY29uc3QgY29sdW1ucyA9IE9iamVjdC5rZXlzKHRhYmxlRGF0YVtrZXldWzBdKTtcbiAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sLCBpKSA9PiB7XG4gICAgICAgIGNvbHVtbnNbaV0gPSBjb2xbMF0udG9VcHBlckNhc2UoKSArIGNvbC5zbGljZSgxKTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCByb3dzID0gdGFibGVEYXRhW2tleV0ubWFwKHggPT4ge1xuICAgICAgICBsZXQgcm93ID0gW107XG4gICAgICAgIGZvciAobGV0IGtleSBpbiB4KSB7XG4gICAgICAgICAgcm93LnB1c2goXG4gICAgICAgICAgICB0eXBlb2YgeFtrZXldICE9PSAnb2JqZWN0J1xuICAgICAgICAgICAgICA/IHhba2V5XVxuICAgICAgICAgICAgICA6IEFycmF5LmlzQXJyYXkoeFtrZXldKVxuICAgICAgICAgICAgICA/IHhba2V5XS5tYXAoeCA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4geCArICdcXG4nO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgIDogSlNPTi5zdHJpbmdpZnkoeFtrZXldKSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChyb3cubGVuZ3RoIDwgY29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICByb3cucHVzaCgnLScpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByb3c7XG4gICAgICB9KTtcbiAgICAgIGFycmF5LnB1c2goe1xuICAgICAgICB0aXRsZTogKChzZWN0aW9uLmxhYmVscyB8fCBbXSlbMF0gfHwgW10pW2tleV0gfHwgJycsXG4gICAgICAgIHR5cGU6ICd0YWJsZScsXG4gICAgICAgIGNvbHVtbnMsXG4gICAgICAgIHJvd3MsXG4gICAgICB9KTtcbiAgICB9XG4gICAgbmVzdGVkRGF0YS5mb3JFYWNoKG5lc3QgPT4ge1xuICAgICAgdGhpcy5nZXRDb25maWdUYWJsZXMoY29udGV4dCwgbmVzdCwgc2VjdGlvbiwgdGFiICsgMSwgYXJyYXkpO1xuICAgIH0pO1xuICAgIHJldHVybiBhcnJheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSByZXBvcnQgZm9yIHRoZSBtb2R1bGVzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVxuICAgKiBAcmV0dXJucyB7Kn0gcmVwb3J0cyBsaXN0IG9yIEVycm9yUmVzcG9uc2VcbiAgICovXG4gIGNyZWF0ZVJlcG9ydHNNb2R1bGVzID0gdGhpcy5jaGVja1JlcG9ydHNVc2VyRGlyZWN0b3J5SXNWYWxpZFJvdXRlRGVjb3JhdG9yKFxuICAgIGFzeW5jIChcbiAgICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgICApID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKCdSZXBvcnQgc3RhcnRlZCcpO1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgYXJyYXksXG4gICAgICAgICAgYWdlbnRzLFxuICAgICAgICAgIGJyb3dzZXJUaW1lem9uZSxcbiAgICAgICAgICBzZWFyY2hCYXIsXG4gICAgICAgICAgZmlsdGVycyxcbiAgICAgICAgICBzZXJ2ZXJTaWRlUXVlcnksXG4gICAgICAgICAgdGltZSxcbiAgICAgICAgICB0YWJsZXMsXG4gICAgICAgICAgc2VjdGlvbixcbiAgICAgICAgICBpbmRleFBhdHRlcm5UaXRsZSxcbiAgICAgICAgICBhcGlJZCxcbiAgICAgICAgfSA9IHJlcXVlc3QuYm9keTtcbiAgICAgICAgY29uc3QgeyBtb2R1bGVJRCB9ID0gcmVxdWVzdC5wYXJhbXM7XG4gICAgICAgIGNvbnN0IHsgZnJvbSwgdG8gfSA9IHRpbWUgfHwge307XG4gICAgICAgIGxldCBhZGRpdGlvbmFsVGFibGVzID0gW107XG4gICAgICAgIC8vIEluaXRcbiAgICAgICAgY29uc3QgcHJpbnRlciA9IG5ldyBSZXBvcnRQcmludGVyKFxuICAgICAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmdldCgncmVwb3J0LXByaW50ZXInKSxcbiAgICAgICAgICBjb250ZXh0LndhenVoX2NvcmUuY29uZmlndXJhdGlvbixcbiAgICAgICAgKTtcblxuICAgICAgICBjcmVhdGVEYXRhRGlyZWN0b3J5SWZOb3RFeGlzdHMoKTtcbiAgICAgICAgY3JlYXRlRGlyZWN0b3J5SWZOb3RFeGlzdHMoV0FaVUhfREFUQV9ET1dOTE9BRFNfRElSRUNUT1JZX1BBVEgpO1xuICAgICAgICBjcmVhdGVEaXJlY3RvcnlJZk5vdEV4aXN0cyhXQVpVSF9EQVRBX0RPV05MT0FEU19SRVBPUlRTX0RJUkVDVE9SWV9QQVRIKTtcbiAgICAgICAgY3JlYXRlRGlyZWN0b3J5SWZOb3RFeGlzdHMoXG4gICAgICAgICAgcGF0aC5qb2luKFxuICAgICAgICAgICAgV0FaVUhfREFUQV9ET1dOTE9BRFNfUkVQT1JUU19ESVJFQ1RPUllfUEFUSCxcbiAgICAgICAgICAgIGNvbnRleHQud2F6dWhFbmRwb2ludFBhcmFtcy5oYXNoVXNlcm5hbWUsXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcblxuICAgICAgICBhd2FpdCB0aGlzLnJlbmRlckhlYWRlcihcbiAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgIHByaW50ZXIsXG4gICAgICAgICAgc2VjdGlvbixcbiAgICAgICAgICBtb2R1bGVJRCxcbiAgICAgICAgICBhZ2VudHMsXG4gICAgICAgICAgYXBpSWQsXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgW3Nhbml0aXplZEZpbHRlcnMsIGFnZW50c0ZpbHRlcl0gPSBmaWx0ZXJzXG4gICAgICAgICAgPyB0aGlzLnNhbml0aXplS2liYW5hRmlsdGVycyhjb250ZXh0LCBmaWx0ZXJzLCBzZWFyY2hCYXIpXG4gICAgICAgICAgOiBbZmFsc2UsIG51bGxdO1xuXG4gICAgICAgIGlmICh0aW1lICYmIHNhbml0aXplZEZpbHRlcnMpIHtcbiAgICAgICAgICBwcmludGVyLmFkZFRpbWVSYW5nZUFuZEZpbHRlcnMoXG4gICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICBzYW5pdGl6ZWRGaWx0ZXJzLFxuICAgICAgICAgICAgYnJvd3NlclRpbWV6b25lLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGltZSkge1xuICAgICAgICAgIGFkZGl0aW9uYWxUYWJsZXMgPSBhd2FpdCBleHRlbmRlZEluZm9ybWF0aW9uKFxuICAgICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICAgIHByaW50ZXIsXG4gICAgICAgICAgICBzZWN0aW9uLFxuICAgICAgICAgICAgbW9kdWxlSUQsXG4gICAgICAgICAgICBhcGlJZCxcbiAgICAgICAgICAgIG5ldyBEYXRlKGZyb20pLmdldFRpbWUoKSxcbiAgICAgICAgICAgIG5ldyBEYXRlKHRvKS5nZXRUaW1lKCksXG4gICAgICAgICAgICBzZXJ2ZXJTaWRlUXVlcnksXG4gICAgICAgICAgICBhZ2VudHNGaWx0ZXIsXG4gICAgICAgICAgICBpbmRleFBhdHRlcm5UaXRsZSB8fFxuICAgICAgICAgICAgICBjb250ZXh0LndhenVoX2NvcmUuY29uZmlndXJhdGlvbi5nZXRTZXR0aW5nVmFsdWUoJ3BhdHRlcm4nKSxcbiAgICAgICAgICAgIGFnZW50cyxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpbnRlci5hZGRWaXN1YWxpemF0aW9ucyhhcnJheSwgYWdlbnRzLCBtb2R1bGVJRCk7XG5cbiAgICAgICAgaWYgKHRhYmxlcykge1xuICAgICAgICAgIHByaW50ZXIuYWRkVGFibGVzKFsuLi50YWJsZXMsIC4uLihhZGRpdGlvbmFsVGFibGVzIHx8IFtdKV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9hZGQgYXV0aG9yaXplZCBhZ2VudHNcbiAgICAgICAgaWYgKGFnZW50c0ZpbHRlcj8uYWdlbnRzVGV4dCkge1xuICAgICAgICAgIHByaW50ZXIuYWRkQWdlbnRzRmlsdGVycyhhZ2VudHNGaWx0ZXIuYWdlbnRzVGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCBwcmludGVyLnByaW50KGNvbnRleHQud2F6dWhFbmRwb2ludFBhcmFtcy5wYXRoRmlsZW5hbWUpO1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgc3VjY2VzczogdHJ1ZSxcbiAgICAgICAgICAgIG1lc3NhZ2U6IGBSZXBvcnQgJHtjb250ZXh0LndhenVoRW5kcG9pbnRQYXJhbXMuZmlsZW5hbWV9IHdhcyBjcmVhdGVkYCxcbiAgICAgICAgICAgIGZpbGVuYW1lOiBjb250ZXh0LndhenVoRW5kcG9pbnRQYXJhbXMuZmlsZW5hbWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShlcnJvci5tZXNzYWdlIHx8IGVycm9yLCA1MDI5LCA1MDAsIHJlc3BvbnNlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgICh7IGJvZHk6IHsgYWdlbnRzIH0sIHBhcmFtczogeyBtb2R1bGVJRCB9IH0pID0+XG4gICAgICBgd2F6dWgtbW9kdWxlLSR7XG4gICAgICAgIGFnZW50cyA/IGBhZ2VudHMtJHthZ2VudHN9YCA6ICdvdmVydmlldydcbiAgICAgIH0tJHttb2R1bGVJRH0tJHt0aGlzLmdlbmVyYXRlUmVwb3J0VGltZXN0YW1wKCl9LnBkZmAsXG4gICk7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIHJlcG9ydCBmb3IgdGhlIGdyb3Vwc1xuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVxdWVzdFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2VcbiAgICogQHJldHVybnMgeyp9IHJlcG9ydHMgbGlzdCBvciBFcnJvclJlc3BvbnNlXG4gICAqL1xuICBjcmVhdGVSZXBvcnRzR3JvdXBzID0gdGhpcy5jaGVja1JlcG9ydHNVc2VyRGlyZWN0b3J5SXNWYWxpZFJvdXRlRGVjb3JhdG9yKFxuICAgIGFzeW5jIChcbiAgICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgICApID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKCdSZXBvcnQgc3RhcnRlZCcpO1xuICAgICAgICBjb25zdCB7IGNvbXBvbmVudHMsIGFwaUlkIH0gPSByZXF1ZXN0LmJvZHk7XG4gICAgICAgIGNvbnN0IHsgZ3JvdXBJRCB9ID0gcmVxdWVzdC5wYXJhbXM7XG4gICAgICAgIC8vIEluaXRcbiAgICAgICAgY29uc3QgcHJpbnRlciA9IG5ldyBSZXBvcnRQcmludGVyKFxuICAgICAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmdldCgncmVwb3J0LXByaW50ZXInKSxcbiAgICAgICAgICBjb250ZXh0LndhenVoX2NvcmUuY29uZmlndXJhdGlvbixcbiAgICAgICAgKTtcblxuICAgICAgICBjcmVhdGVEYXRhRGlyZWN0b3J5SWZOb3RFeGlzdHMoKTtcbiAgICAgICAgY3JlYXRlRGlyZWN0b3J5SWZOb3RFeGlzdHMoV0FaVUhfREFUQV9ET1dOTE9BRFNfRElSRUNUT1JZX1BBVEgpO1xuICAgICAgICBjcmVhdGVEaXJlY3RvcnlJZk5vdEV4aXN0cyhXQVpVSF9EQVRBX0RPV05MT0FEU19SRVBPUlRTX0RJUkVDVE9SWV9QQVRIKTtcbiAgICAgICAgY3JlYXRlRGlyZWN0b3J5SWZOb3RFeGlzdHMoXG4gICAgICAgICAgcGF0aC5qb2luKFxuICAgICAgICAgICAgV0FaVUhfREFUQV9ET1dOTE9BRFNfUkVQT1JUU19ESVJFQ1RPUllfUEFUSCxcbiAgICAgICAgICAgIGNvbnRleHQud2F6dWhFbmRwb2ludFBhcmFtcy5oYXNoVXNlcm5hbWUsXG4gICAgICAgICAgKSxcbiAgICAgICAgKTtcblxuICAgICAgICBsZXQgdGFibGVzID0gW107XG4gICAgICAgIGNvbnN0IGVxdWl2YWxlbmNlcyA9IHtcbiAgICAgICAgICBsb2NhbGZpbGU6ICdMb2NhbCBmaWxlcycsXG4gICAgICAgICAgb3NxdWVyeTogJ09zcXVlcnknLFxuICAgICAgICAgIGNvbW1hbmQ6ICdDb21tYW5kJyxcbiAgICAgICAgICBzeXNjaGVjazogJ1N5c2NoZWNrJyxcbiAgICAgICAgICAnb3Blbi1zY2FwJzogJ09wZW5TQ0FQJyxcbiAgICAgICAgICAnY2lzLWNhdCc6ICdDSVMtQ0FUJyxcbiAgICAgICAgICBzeXNjb2xsZWN0b3I6ICdTeXNjb2xsZWN0b3InLFxuICAgICAgICAgIHJvb3RjaGVjazogJ1Jvb3RjaGVjaycsXG4gICAgICAgICAgbGFiZWxzOiAnTGFiZWxzJyxcbiAgICAgICAgICBzY2E6ICdTZWN1cml0eSBjb25maWd1cmF0aW9uIGFzc2Vzc21lbnQnLFxuICAgICAgICB9O1xuICAgICAgICBwcmludGVyLmFkZENvbnRlbnQoe1xuICAgICAgICAgIHRleHQ6IGBHcm91cCAke2dyb3VwSUR9IGNvbmZpZ3VyYXRpb25gLFxuICAgICAgICAgIHN0eWxlOiAnaDEnLFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBHcm91cCBjb25maWd1cmF0aW9uXG4gICAgICAgIGlmIChjb21wb25lbnRzWycwJ10pIHtcbiAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBkYXRhOiB7IGRhdGE6IGNvbmZpZ3VyYXRpb24gfSxcbiAgICAgICAgICB9ID0gYXdhaXQgY29udGV4dC53YXp1aC5hcGkuY2xpZW50LmFzQ3VycmVudFVzZXIucmVxdWVzdChcbiAgICAgICAgICAgICdHRVQnLFxuICAgICAgICAgICAgYC9ncm91cHMvJHtncm91cElEfS9jb25maWd1cmF0aW9uYCxcbiAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgeyBhcGlIb3N0SUQ6IGFwaUlkIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGNvbmZpZ3VyYXRpb24uYWZmZWN0ZWRfaXRlbXMubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgT2JqZWN0LmtleXMoY29uZmlndXJhdGlvbi5hZmZlY3RlZF9pdGVtc1swXS5jb25maWcpLmxlbmd0aFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcHJpbnRlci5hZGRDb250ZW50KHtcbiAgICAgICAgICAgICAgdGV4dDogJ0NvbmZpZ3VyYXRpb25zJyxcbiAgICAgICAgICAgICAgc3R5bGU6IHsgZm9udFNpemU6IDE0LCBjb2xvcjogJyMwMDAnIH0sXG4gICAgICAgICAgICAgIG1hcmdpbjogWzAsIDEwLCAwLCAxNV0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHNlY3Rpb24gPSB7XG4gICAgICAgICAgICAgIGxhYmVsczogW10sXG4gICAgICAgICAgICAgIGlzR3JvdXBDb25maWc6IHRydWUsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9yIChsZXQgY29uZmlnIG9mIGNvbmZpZ3VyYXRpb24uYWZmZWN0ZWRfaXRlbXMpIHtcbiAgICAgICAgICAgICAgbGV0IGZpbHRlclRpdGxlID0gJyc7XG4gICAgICAgICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgICAgICAgIGZvciAobGV0IGZpbHRlciBvZiBPYmplY3Qua2V5cyhjb25maWcuZmlsdGVycykpIHtcbiAgICAgICAgICAgICAgICBmaWx0ZXJUaXRsZSA9IGZpbHRlclRpdGxlLmNvbmNhdChcbiAgICAgICAgICAgICAgICAgIGAke2ZpbHRlcn06ICR7Y29uZmlnLmZpbHRlcnNbZmlsdGVyXX1gLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgT2JqZWN0LmtleXMoY29uZmlnLmZpbHRlcnMpLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgIGZpbHRlclRpdGxlID0gZmlsdGVyVGl0bGUuY29uY2F0KCcgfCAnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5kZXgrKztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBwcmludGVyLmFkZENvbnRlbnQoe1xuICAgICAgICAgICAgICAgIHRleHQ6IGZpbHRlclRpdGxlLFxuICAgICAgICAgICAgICAgIHN0eWxlOiAnaDQnLFxuICAgICAgICAgICAgICAgIG1hcmdpbjogWzAsIDAsIDAsIDEwXSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGxldCBpZHggPSAwO1xuICAgICAgICAgICAgICBzZWN0aW9uLnRhYnMgPSBbXTtcbiAgICAgICAgICAgICAgZm9yIChsZXQgX2Qgb2YgT2JqZWN0LmtleXMoY29uZmlnLmNvbmZpZykpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjIG9mIEFnZW50Q29uZmlndXJhdGlvbi5jb25maWd1cmF0aW9ucykge1xuICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcyBvZiBjLnNlY3Rpb25zKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlY3Rpb24ub3B0cyA9IHMub3B0cyB8fCB7fTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgY24gb2Ygcy5jb25maWcgfHwgW10pIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoY24uY29uZmlndXJhdGlvbiA9PT0gX2QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb24ubGFiZWxzID0gcy5sYWJlbHMgfHwgW1tdXTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgd28gb2Ygcy53b2RsZSB8fCBbXSkge1xuICAgICAgICAgICAgICAgICAgICAgIGlmICh3by5uYW1lID09PSBfZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VjdGlvbi5sYWJlbHMgPSBzLmxhYmVscyB8fCBbW11dO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzZWN0aW9uLmxhYmVsc1swXVsncGFjayddID0gJ1BhY2tzJztcbiAgICAgICAgICAgICAgICBzZWN0aW9uLmxhYmVsc1swXVsnY29udGVudCddID0gJ0V2YWx1YXRpb25zJztcbiAgICAgICAgICAgICAgICBzZWN0aW9uLmxhYmVsc1swXVsnNyddID0gJ1NjYW4gbGlzdGVuaW5nIG5ldHdvdGsgcG9ydHMnO1xuICAgICAgICAgICAgICAgIHNlY3Rpb24udGFicy5wdXNoKGVxdWl2YWxlbmNlc1tfZF0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29uZmlnLmNvbmZpZ1tfZF0pKSB7XG4gICAgICAgICAgICAgICAgICAvKiBMT0cgQ09MTEVDVE9SICovXG4gICAgICAgICAgICAgICAgICBpZiAoX2QgPT09ICdsb2NhbGZpbGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBncm91cHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLmNvbmZpZ1tfZF0uZm9yRWFjaChvYmogPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmICghZ3JvdXBzW29iai5sb2dmb3JtYXRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cHNbb2JqLmxvZ2Zvcm1hdF0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgZ3JvdXBzW29iai5sb2dmb3JtYXRdLnB1c2gob2JqKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGdyb3VwcykuZm9yRWFjaChncm91cCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgbGV0IHNhdmVpZHggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgIGdyb3Vwc1tncm91cF0uZm9yRWFjaCgoeCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh4KS5sZW5ndGggPlxuICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhncm91cHNbZ3JvdXBdW3NhdmVpZHhdKS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBzYXZlaWR4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2x1bW5zID0gT2JqZWN0LmtleXMoZ3JvdXBzW2dyb3VwXVtzYXZlaWR4XSk7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm93cyA9IGdyb3Vwc1tncm91cF0ubWFwKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1ucy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiB4W2tleV0gIT09ICdvYmplY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHhba2V5XVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBBcnJheS5pc0FycmF5KHhba2V5XSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8geFtrZXldLm1hcCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geCArICdcXG4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBKU09OLnN0cmluZ2lmeSh4W2tleV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnMuZm9yRWFjaCgoY29sLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zW2ldID0gY29sWzBdLnRvVXBwZXJDYXNlKCkgKyBjb2wuc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgdGFibGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdMb2NhbCBmaWxlcycsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndGFibGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1ucyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3MsXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChfZCA9PT0gJ2xhYmVscycpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2JqID0gY29uZmlnLmNvbmZpZ1tfZF1bMF0ubGFiZWw7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtbnMgPSBPYmplY3Qua2V5cyhvYmpbMF0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbHVtbnMuaW5jbHVkZXMoJ2hpZGRlbicpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29sdW1ucy5wdXNoKCdoaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCByb3dzID0gb2JqLm1hcCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBsZXQgcm93ID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgY29sdW1ucy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3cucHVzaCh4W2tleV0pO1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByb3c7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zLmZvckVhY2goKGNvbCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnNbaV0gPSBjb2xbMF0udG9VcHBlckNhc2UoKSArIGNvbC5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRhYmxlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0xhYmVscycsXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RhYmxlJyxcbiAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zLFxuICAgICAgICAgICAgICAgICAgICAgIHJvd3MsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgX2QyIG9mIGNvbmZpZy5jb25maWdbX2RdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdGFibGVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLmdldENvbmZpZ1RhYmxlcyhjb250ZXh0LCBfZDIsIHNlY3Rpb24sIGlkeCksXG4gICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvKklOVEVHUklUWSBNT05JVE9SSU5HIE1PTklUT1JFRCBESVJFQ1RPUklFUyAqL1xuICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5jb25maWdbX2RdLmRpcmVjdG9yaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpcmVjdG9yaWVzID0gY29uZmlnLmNvbmZpZ1tfZF0uZGlyZWN0b3JpZXM7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjb25maWcuY29uZmlnW19kXS5kaXJlY3RvcmllcztcbiAgICAgICAgICAgICAgICAgICAgdGFibGVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5nZXRDb25maWdUYWJsZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLmNvbmZpZ1tfZF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWR4LFxuICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkaWZmT3B0cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhzZWN0aW9uLm9wdHMpLmZvckVhY2goeCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgZGlmZk9wdHMucHVzaCh4KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbHVtbnMgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgJycsXG4gICAgICAgICAgICAgICAgICAgICAgLi4uZGlmZk9wdHMuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgeCA9PiB4ICE9PSAnY2hlY2tfYWxsJyAmJiB4ICE9PSAnY2hlY2tfc3VtJyxcbiAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcm93cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBkaXJlY3Rvcmllcy5mb3JFYWNoKHggPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICByb3cucHVzaCh4LnBhdGgpO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnMuZm9yRWFjaCh5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh5ICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB5ID0geSAhPT0gJ2NoZWNrX3dob2RhdGEnID8geSA6ICd3aG9kYXRhJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LnB1c2goeFt5XSA/IHhbeV0gOiAnbm8nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICByb3cucHVzaCh4LnJlY3Vyc2lvbl9sZXZlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgcm93cy5wdXNoKHJvdyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zLmZvckVhY2goKHgsIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnNbaWR4XSA9IHNlY3Rpb24ub3B0c1t4XTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnMucHVzaCgnUkwnKTtcbiAgICAgICAgICAgICAgICAgICAgdGFibGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnTW9uaXRvcmVkIGRpcmVjdG9yaWVzJyxcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndGFibGUnLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnMsXG4gICAgICAgICAgICAgICAgICAgICAgcm93cyxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YWJsZXMucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLmdldENvbmZpZ1RhYmxlcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWcuY29uZmlnW19kXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICBpZHgsXG4gICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCB0YWJsZSBvZiB0YWJsZXMpIHtcbiAgICAgICAgICAgICAgICAgIHByaW50ZXIuYWRkQ29uZmlnVGFibGVzKFt0YWJsZV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZHgrKztcbiAgICAgICAgICAgICAgICB0YWJsZXMgPSBbXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0YWJsZXMgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJpbnRlci5hZGRDb250ZW50KHtcbiAgICAgICAgICAgICAgdGV4dDogJ0EgY29uZmlndXJhdGlvbiBmb3IgdGhpcyBncm91cCBoYXMgbm90IHlldCBiZWVuIHNldCB1cC4nLFxuICAgICAgICAgICAgICBzdHlsZTogeyBmb250U2l6ZTogMTIsIGNvbG9yOiAnIzAwMCcgfSxcbiAgICAgICAgICAgICAgbWFyZ2luOiBbMCwgMTAsIDAsIDE1XSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFnZW50cyBpbiBncm91cFxuICAgICAgICBpZiAoY29tcG9uZW50c1snMSddKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5yZW5kZXJIZWFkZXIoXG4gICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICAgcHJpbnRlcixcbiAgICAgICAgICAgICdncm91cENvbmZpZycsXG4gICAgICAgICAgICBncm91cElELFxuICAgICAgICAgICAgW10sXG4gICAgICAgICAgICBhcGlJZCxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgcHJpbnRlci5wcmludChjb250ZXh0LndhenVoRW5kcG9pbnRQYXJhbXMucGF0aEZpbGVuYW1lKTtcblxuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICBtZXNzYWdlOiBgUmVwb3J0ICR7Y29udGV4dC53YXp1aEVuZHBvaW50UGFyYW1zLmZpbGVuYW1lfSB3YXMgY3JlYXRlZGAsXG4gICAgICAgICAgICBmaWxlbmFtZTogY29udGV4dC53YXp1aEVuZHBvaW50UGFyYW1zLmZpbGVuYW1lLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IsIDUwMjksIDUwMCwgcmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgKHsgcGFyYW1zOiB7IGdyb3VwSUQgfSB9KSA9PlxuICAgICAgYHdhenVoLWdyb3VwLWNvbmZpZ3VyYXRpb24tJHtncm91cElEfS0ke3RoaXMuZ2VuZXJhdGVSZXBvcnRUaW1lc3RhbXAoKX0ucGRmYCxcbiAgKTtcblxuICAvKipcbiAgICogQ3JlYXRlIGEgcmVwb3J0IGZvciB0aGUgYWdlbnRzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVxuICAgKiBAcmV0dXJucyB7Kn0gcmVwb3J0cyBsaXN0IG9yIEVycm9yUmVzcG9uc2VcbiAgICovXG4gIGNyZWF0ZVJlcG9ydHNBZ2VudHNDb25maWd1cmF0aW9uID1cbiAgICB0aGlzLmNoZWNrUmVwb3J0c1VzZXJEaXJlY3RvcnlJc1ZhbGlkUm91dGVEZWNvcmF0b3IoXG4gICAgICBhc3luYyAoXG4gICAgICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICAgICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgICAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gICAgICApID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb250ZXh0LndhenVoLmxvZ2dlci5kZWJ1ZygnUmVwb3J0IHN0YXJ0ZWQnKTtcbiAgICAgICAgICBjb25zdCB7IGNvbXBvbmVudHMsIGFwaUlkIH0gPSByZXF1ZXN0LmJvZHk7XG4gICAgICAgICAgY29uc3QgeyBhZ2VudElEIH0gPSByZXF1ZXN0LnBhcmFtcztcblxuICAgICAgICAgIGNvbnN0IHByaW50ZXIgPSBuZXcgUmVwb3J0UHJpbnRlcihcbiAgICAgICAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmdldCgncmVwb3J0LXByaW50ZXInKSxcbiAgICAgICAgICAgIGNvbnRleHQud2F6dWhfY29yZS5jb25maWd1cmF0aW9uLFxuICAgICAgICAgICk7XG4gICAgICAgICAgY3JlYXRlRGF0YURpcmVjdG9yeUlmTm90RXhpc3RzKCk7XG4gICAgICAgICAgY3JlYXRlRGlyZWN0b3J5SWZOb3RFeGlzdHMoV0FaVUhfREFUQV9ET1dOTE9BRFNfRElSRUNUT1JZX1BBVEgpO1xuICAgICAgICAgIGNyZWF0ZURpcmVjdG9yeUlmTm90RXhpc3RzKFxuICAgICAgICAgICAgV0FaVUhfREFUQV9ET1dOTE9BRFNfUkVQT1JUU19ESVJFQ1RPUllfUEFUSCxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNyZWF0ZURpcmVjdG9yeUlmTm90RXhpc3RzKFxuICAgICAgICAgICAgcGF0aC5qb2luKFxuICAgICAgICAgICAgICBXQVpVSF9EQVRBX0RPV05MT0FEU19SRVBPUlRTX0RJUkVDVE9SWV9QQVRILFxuICAgICAgICAgICAgICBjb250ZXh0LndhenVoRW5kcG9pbnRQYXJhbXMuaGFzaFVzZXJuYW1lLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgbGV0IHdtb2R1bGVzUmVzcG9uc2UgPSB7fTtcbiAgICAgICAgICBsZXQgdGFibGVzID0gW107XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHdtb2R1bGVzUmVzcG9uc2UgPVxuICAgICAgICAgICAgICBhd2FpdCBjb250ZXh0LndhenVoLmFwaS5jbGllbnQuYXNDdXJyZW50VXNlci5yZXF1ZXN0KFxuICAgICAgICAgICAgICAgICdHRVQnLFxuICAgICAgICAgICAgICAgIGAvYWdlbnRzLyR7YWdlbnRJRH0vY29uZmlnL3dtb2R1bGVzL3dtb2R1bGVzYCxcbiAgICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgICB7IGFwaUhvc3RJRDogYXBpSWQgfSxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZGVidWcoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYXdhaXQgdGhpcy5yZW5kZXJIZWFkZXIoXG4gICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICAgcHJpbnRlcixcbiAgICAgICAgICAgICdhZ2VudENvbmZpZycsXG4gICAgICAgICAgICAnYWdlbnRDb25maWcnLFxuICAgICAgICAgICAgYWdlbnRJRCxcbiAgICAgICAgICAgIGFwaUlkLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBsZXQgaWR4Q29tcG9uZW50ID0gMDtcbiAgICAgICAgICBmb3IgKGxldCBjb25maWcgb2YgQWdlbnRDb25maWd1cmF0aW9uLmNvbmZpZ3VyYXRpb25zKSB7XG4gICAgICAgICAgICBsZXQgdGl0bGVPZlNlY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKFxuICAgICAgICAgICAgICBgSXRlcmF0ZSBvdmVyICR7Y29uZmlnLnNlY3Rpb25zLmxlbmd0aH0gY29uZmlndXJhdGlvbiBzZWN0aW9uc2AsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZm9yIChsZXQgc2VjdGlvbiBvZiBjb25maWcuc2VjdGlvbnMpIHtcbiAgICAgICAgICAgICAgbGV0IHRpdGxlT2ZTdWJzZWN0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBjb21wb25lbnRzW2lkeENvbXBvbmVudF0gJiZcbiAgICAgICAgICAgICAgICAoc2VjdGlvbi5jb25maWcgfHwgc2VjdGlvbi53b2RsZSlcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlkeCA9IDA7XG4gICAgICAgICAgICAgICAgY29uc3QgY29uZmlncyA9IChzZWN0aW9uLmNvbmZpZyB8fCBbXSkuY29uY2F0KFxuICAgICAgICAgICAgICAgICAgc2VjdGlvbi53b2RsZSB8fCBbXSxcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKFxuICAgICAgICAgICAgICAgICAgYEl0ZXJhdGUgb3ZlciAke2NvbmZpZ3MubGVuZ3RofSBjb25maWd1cmF0aW9uIGJsb2Nrc2AsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBjb25mIG9mIGNvbmZpZ3MpIHtcbiAgICAgICAgICAgICAgICAgIGxldCBhZ2VudENvbmZpZ1Jlc3BvbnNlID0ge307XG4gICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbmZbJ25hbWUnXSkge1xuICAgICAgICAgICAgICAgICAgICAgIGFnZW50Q29uZmlnUmVzcG9uc2UgPVxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgY29udGV4dC53YXp1aC5hcGkuY2xpZW50LmFzQ3VycmVudFVzZXIucmVxdWVzdChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ0dFVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGAvYWdlbnRzLyR7YWdlbnRJRH0vY29uZmlnLyR7Y29uZi5jb21wb25lbnR9LyR7Y29uZi5jb25maWd1cmF0aW9ufWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7IGFwaUhvc3RJRDogYXBpSWQgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgd29kbGUgb2Ygd21vZHVsZXNSZXNwb25zZS5kYXRhLmRhdGFbXG4gICAgICAgICAgICAgICAgICAgICAgICAnd21vZHVsZXMnXG4gICAgICAgICAgICAgICAgICAgICAgXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHdvZGxlKVswXSA9PT0gY29uZlsnbmFtZSddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFnZW50Q29uZmlnUmVzcG9uc2UuZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB3b2RsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBhZ2VudENvbmZpZyA9XG4gICAgICAgICAgICAgICAgICAgICAgYWdlbnRDb25maWdSZXNwb25zZSAmJlxuICAgICAgICAgICAgICAgICAgICAgIGFnZW50Q29uZmlnUmVzcG9uc2UuZGF0YSAmJlxuICAgICAgICAgICAgICAgICAgICAgIGFnZW50Q29uZmlnUmVzcG9uc2UuZGF0YS5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRpdGxlT2ZTZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcHJpbnRlci5hZGRDb250ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IGNvbmZpZy50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiAnaDEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiBbMCwgMCwgMCwgMTVdLFxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlT2ZTZWN0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRpdGxlT2ZTdWJzZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcHJpbnRlci5hZGRDb250ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHNlY3Rpb24uc3VidGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogJ2g0JyxcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICBwcmludGVyLmFkZENvbnRlbnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogc2VjdGlvbi5kZXNjLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHsgZm9udFNpemU6IDEyLCBjb2xvcjogJyMwMDAnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW46IFswLCAwLCAwLCAxMF0sXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgdGl0bGVPZlN1YnNlY3Rpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChhZ2VudENvbmZpZykge1xuICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGFnZW50Q29uZmlnS2V5IG9mIE9iamVjdC5rZXlzKGFnZW50Q29uZmlnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoYWdlbnRDb25maWdbYWdlbnRDb25maWdLZXldKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvKiBMT0cgQ09MTEVDVE9SICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb25mLmZpbHRlckJ5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGdyb3VwcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnZW50Q29uZmlnW2FnZW50Q29uZmlnS2V5XS5mb3JFYWNoKG9iaiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWdyb3Vwc1tvYmoubG9nZm9ybWF0XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cHNbb2JqLmxvZ2Zvcm1hdF0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3Vwc1tvYmoubG9nZm9ybWF0XS5wdXNoKG9iaik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoZ3JvdXBzKS5mb3JFYWNoKGdyb3VwID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzYXZlaWR4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3Vwc1tncm91cF0uZm9yRWFjaCgoeCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoeCkubGVuZ3RoID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhncm91cHNbZ3JvdXBdW3NhdmVpZHhdKS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2F2ZWlkeCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sdW1ucyA9IE9iamVjdC5rZXlzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cHNbZ3JvdXBdW3NhdmVpZHhdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJvd3MgPSBncm91cHNbZ3JvdXBdLm1hcCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJvdyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3cucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiB4W2tleV0gIT09ICdvYmplY3QnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8geFtrZXldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogQXJyYXkuaXNBcnJheSh4W2tleV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8geFtrZXldLm1hcCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB4ICsgJ1xcbic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBKU09OLnN0cmluZ2lmeSh4W2tleV0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcm93O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zLmZvckVhY2goKGNvbCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zW2ldID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xbMF0udG9VcHBlckNhc2UoKSArIGNvbC5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogc2VjdGlvbi5sYWJlbHNbMF1bZ3JvdXBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndGFibGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWdlbnRDb25maWdLZXkuY29uZmlndXJhdGlvbiAhPT0gJ3NvY2tldCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLmdldENvbmZpZ1RhYmxlcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWdlbnRDb25maWdbYWdlbnRDb25maWdLZXldLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZHgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgX2QyIG9mIGFnZW50Q29uZmlnW2FnZW50Q29uZmlnS2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMuZ2V0Q29uZmlnVGFibGVzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2QyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlY3Rpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWR4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8qIElOVEVHUklUWSBNT05JVE9SSU5HIE1PTklUT1JFRCBESVJFQ1RPUklFUyAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29uZi5tYXRyaXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RvcmllcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZmYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzeW5jaHJvbml6YXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlX2xpbWl0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4ucmVzdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gPSBhZ2VudENvbmZpZ1thZ2VudENvbmZpZ0tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLmdldENvbmZpZ1RhYmxlcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWR4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihkaWZmICYmIGRpZmYuZGlza19xdW90YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZ2V0Q29uZmlnVGFibGVzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZmYuZGlza19xdW90YSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGFiczogWydEaXNrIHF1b3RhJ10gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihkaWZmICYmIGRpZmYuZmlsZV9zaXplXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5nZXRDb25maWdUYWJsZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlmZi5maWxlX3NpemUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRhYnM6IFsnRmlsZSBzaXplJ10gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihzeW5jaHJvbml6YXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmdldENvbmZpZ1RhYmxlcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzeW5jaHJvbml6YXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRhYnM6IFsnU3luY2hyb25pemF0aW9uJ10gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLihmaWxlX2xpbWl0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGhpcy5nZXRDb25maWdUYWJsZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZV9saW1pdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdGFiczogWydGaWxlIGxpbWl0J10gfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFtdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaWZmT3B0cyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHNlY3Rpb24ub3B0cykuZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpZmZPcHRzLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sdW1ucyA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uZGlmZk9wdHMuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4ID0+IHggIT09ICdjaGVja19hbGwnICYmIHggIT09ICdjaGVja19zdW0nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3dzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0b3JpZXMuZm9yRWFjaCh4ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByb3cgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdy5wdXNoKHguZGlyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnMuZm9yRWFjaCh5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHkgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB4Lm9wdHMuaW5kZXhPZih5KSA+IC0xID8gJ3llcycgOiAnbm8nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93LnB1c2goeC5yZWN1cnNpb25fbGV2ZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93cy5wdXNoKHJvdyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1ucy5mb3JFYWNoKCh4LCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnNbaWR4XSA9IHNlY3Rpb24ub3B0c1t4XTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zLnB1c2goJ1JMJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFibGVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdNb25pdG9yZWQgZGlyZWN0b3JpZXMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RhYmxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYmxlcy5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5nZXRDb25maWdUYWJsZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnZW50Q29uZmlnW2FnZW50Q29uZmlnS2V5XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWR4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIFByaW50IG5vIGNvbmZpZ3VyZWQgbW9kdWxlIGFuZCBsaW5rIHRvIHRoZSBkb2N1bWVudGF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgcHJpbnRlci5hZGRDb250ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ1RoaXMgbW9kdWxlIGlzIG5vdCBjb25maWd1cmVkLiBQbGVhc2UgdGFrZSBhIGxvb2sgb24gaG93IHRvIGNvbmZpZ3VyZSBpdCBpbiAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogYCR7c2VjdGlvbi5zdWJ0aXRsZS50b0xvd2VyQ2FzZSgpfSBjb25maWd1cmF0aW9uLmAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluazogc2VjdGlvbi5kb2N1TGluayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZTogeyBmb250U2l6ZTogMTIsIGNvbG9yOiAnIzFhMGRhYicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW46IFswLCAwLCAwLCAyMF0sXG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWR4Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgdGFibGUgb2YgdGFibGVzKSB7XG4gICAgICAgICAgICAgICAgICBwcmludGVyLmFkZENvbmZpZ1RhYmxlcyhbdGFibGVdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWR4Q29tcG9uZW50Kys7XG4gICAgICAgICAgICAgIHRhYmxlcyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGF3YWl0IHByaW50ZXIucHJpbnQoY29udGV4dC53YXp1aEVuZHBvaW50UGFyYW1zLnBhdGhGaWxlbmFtZSk7XG5cbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICBzdWNjZXNzOiB0cnVlLFxuICAgICAgICAgICAgICBtZXNzYWdlOiBgUmVwb3J0ICR7Y29udGV4dC53YXp1aEVuZHBvaW50UGFyYW1zLmZpbGVuYW1lfSB3YXMgY3JlYXRlZGAsXG4gICAgICAgICAgICAgIGZpbGVuYW1lOiBjb250ZXh0LndhenVoRW5kcG9pbnRQYXJhbXMuZmlsZW5hbWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IsIDUwMjksIDUwMCwgcmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgKHsgcGFyYW1zOiB7IGFnZW50SUQgfSB9KSA9PlxuICAgICAgICBgd2F6dWgtYWdlbnQtY29uZmlndXJhdGlvbi0ke2FnZW50SUR9LSR7dGhpcy5nZW5lcmF0ZVJlcG9ydFRpbWVzdGFtcCgpfS5wZGZgLFxuICAgICk7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIHJlcG9ydCBmb3IgdGhlIGFnZW50c1xuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVxdWVzdFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2VcbiAgICogQHJldHVybnMgeyp9IHJlcG9ydHMgbGlzdCBvciBFcnJvclJlc3BvbnNlXG4gICAqL1xuICBjcmVhdGVSZXBvcnRzQWdlbnRzSW52ZW50b3J5ID1cbiAgICB0aGlzLmNoZWNrUmVwb3J0c1VzZXJEaXJlY3RvcnlJc1ZhbGlkUm91dGVEZWNvcmF0b3IoXG4gICAgICBhc3luYyAoXG4gICAgICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICAgICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgICAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gICAgICApID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb250ZXh0LndhenVoLmxvZ2dlci5kZWJ1ZygnUmVwb3J0IHN0YXJ0ZWQnKTtcbiAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBzZWFyY2hCYXIsXG4gICAgICAgICAgICBmaWx0ZXJzLFxuICAgICAgICAgICAgdGltZSxcbiAgICAgICAgICAgIGluZGV4UGF0dGVyblRpdGxlLFxuICAgICAgICAgICAgYXBpSWQsXG4gICAgICAgICAgICBzZXJ2ZXJTaWRlUXVlcnksXG4gICAgICAgICAgfSA9IHJlcXVlc3QuYm9keTtcbiAgICAgICAgICBjb25zdCB7IGFnZW50SUQgfSA9IHJlcXVlc3QucGFyYW1zO1xuICAgICAgICAgIGNvbnN0IHsgZnJvbSwgdG8gfSA9IHRpbWUgfHwge307XG4gICAgICAgICAgLy8gSW5pdFxuICAgICAgICAgIGNvbnN0IHByaW50ZXIgPSBuZXcgUmVwb3J0UHJpbnRlcihcbiAgICAgICAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmdldCgncmVwb3J0LXByaW50ZXInKSxcbiAgICAgICAgICAgIGNvbnRleHQud2F6dWhfY29yZS5jb25maWd1cmF0aW9uLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb25zdCB7IGhhc2hVc2VybmFtZSB9ID0gYXdhaXQgY29udGV4dC53YXp1aC5zZWN1cml0eS5nZXRDdXJyZW50VXNlcihcbiAgICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICk7XG4gICAgICAgICAgY3JlYXRlRGF0YURpcmVjdG9yeUlmTm90RXhpc3RzKCk7XG4gICAgICAgICAgY3JlYXRlRGlyZWN0b3J5SWZOb3RFeGlzdHMoV0FaVUhfREFUQV9ET1dOTE9BRFNfRElSRUNUT1JZX1BBVEgpO1xuICAgICAgICAgIGNyZWF0ZURpcmVjdG9yeUlmTm90RXhpc3RzKFxuICAgICAgICAgICAgV0FaVUhfREFUQV9ET1dOTE9BRFNfUkVQT1JUU19ESVJFQ1RPUllfUEFUSCxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNyZWF0ZURpcmVjdG9yeUlmTm90RXhpc3RzKFxuICAgICAgICAgICAgcGF0aC5qb2luKFxuICAgICAgICAgICAgICBXQVpVSF9EQVRBX0RPV05MT0FEU19SRVBPUlRTX0RJUkVDVE9SWV9QQVRILFxuICAgICAgICAgICAgICBoYXNoVXNlcm5hbWUsXG4gICAgICAgICAgICApLFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb250ZXh0LndhenVoLmxvZ2dlci5kZWJ1ZygnU3lzY29sbGVjdG9yIHJlcG9ydCcpO1xuICAgICAgICAgIGNvbnN0IFtzYW5pdGl6ZWRGaWx0ZXJzLCBhZ2VudHNGaWx0ZXJdID0gZmlsdGVyc1xuICAgICAgICAgICAgPyB0aGlzLnNhbml0aXplS2liYW5hRmlsdGVycyhjb250ZXh0LCBmaWx0ZXJzLCBzZWFyY2hCYXIpXG4gICAgICAgICAgICA6IFtmYWxzZSwgbnVsbF07XG5cbiAgICAgICAgICAvLyBHZXQgdGhlIGFnZW50IE9TXG4gICAgICAgICAgbGV0IGFnZW50T3MgPSAnJztcbiAgICAgICAgICBsZXQgaXNBZ2VudFdpbmRvd3MgPSBmYWxzZTtcbiAgICAgICAgICBsZXQgaXNBZ2VudExpbnV4ID0gZmFsc2U7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IGFnZW50UmVzcG9uc2UgPVxuICAgICAgICAgICAgICBhd2FpdCBjb250ZXh0LndhenVoLmFwaS5jbGllbnQuYXNDdXJyZW50VXNlci5yZXF1ZXN0KFxuICAgICAgICAgICAgICAgICdHRVQnLFxuICAgICAgICAgICAgICAgIGAvYWdlbnRzP2FnZW50c19saXN0PSR7YWdlbnRJRH1gLFxuICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICAgIHsgYXBpSG9zdElEOiBhcGlJZCB9LFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgaXNBZ2VudFdpbmRvd3MgPVxuICAgICAgICAgICAgICBhZ2VudFJlc3BvbnNlPy5kYXRhPy5kYXRhPy5hZmZlY3RlZF9pdGVtcz8uWzBdLm9zPy5wbGF0Zm9ybSA9PT1cbiAgICAgICAgICAgICAgJ3dpbmRvd3MnO1xuICAgICAgICAgICAgaXNBZ2VudExpbnV4ID1cbiAgICAgICAgICAgICAgYWdlbnRSZXNwb25zZT8uZGF0YT8uZGF0YT8uYWZmZWN0ZWRfaXRlbXM/LlswXS5vcz8udW5hbWU/LmluY2x1ZGVzKFxuICAgICAgICAgICAgICAgICdMaW51eCcsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBhZ2VudE9zID1cbiAgICAgICAgICAgICAgKGlzQWdlbnRXaW5kb3dzICYmICd3aW5kb3dzJykgfHwgKGlzQWdlbnRMaW51eCAmJiAnbGludXgnKSB8fCAnJztcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZGVidWcoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQWRkIHRpdGxlXG4gICAgICAgICAgcHJpbnRlci5hZGRDb250ZW50V2l0aE5ld0xpbmUoe1xuICAgICAgICAgICAgdGV4dDogJ0ludmVudG9yeSBkYXRhIHJlcG9ydCcsXG4gICAgICAgICAgICBzdHlsZTogJ2gxJyxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIEFkZCB0YWJsZSB3aXRoIHRoZSBhZ2VudCBpbmZvXG4gICAgICAgICAgYXdhaXQgYnVpbGRBZ2VudHNUYWJsZShjb250ZXh0LCBwcmludGVyLCBbYWdlbnRJRF0sIGFwaUlkKTtcblxuICAgICAgICAgIC8vIEdldCBzeXNjb2xsZWN0b3IgcGFja2FnZXMgYW5kIHByb2Nlc3Nlc1xuICAgICAgICAgIGNvbnN0IGFnZW50UmVxdWVzdHNJbnZlbnRvcnkgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGVuZHBvaW50OiBgL3N5c2NvbGxlY3Rvci8ke2FnZW50SUR9L3BhY2thZ2VzYCxcbiAgICAgICAgICAgICAgbG9nZ2VyTWVzc2FnZTogYEZldGNoaW5nIHBhY2thZ2VzIGZvciBhZ2VudCAke2FnZW50SUR9YCxcbiAgICAgICAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ1BhY2thZ2VzJyxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOlxuICAgICAgICAgICAgICAgICAgYWdlbnRPcyA9PT0gJ3dpbmRvd3MnXG4gICAgICAgICAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ25hbWUnLCBsYWJlbDogJ05hbWUnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAnYXJjaGl0ZWN0dXJlJywgbGFiZWw6ICdBcmNoaXRlY3R1cmUnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAndmVyc2lvbicsIGxhYmVsOiAnVmVyc2lvbicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6ICd2ZW5kb3InLCBsYWJlbDogJ1ZlbmRvcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ25hbWUnLCBsYWJlbDogJ05hbWUnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAnYXJjaGl0ZWN0dXJlJywgbGFiZWw6ICdBcmNoaXRlY3R1cmUnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAndmVyc2lvbicsIGxhYmVsOiAnVmVyc2lvbicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6ICd2ZW5kb3InLCBsYWJlbDogJ1ZlbmRvcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6ICdkZXNjcmlwdGlvbicsIGxhYmVsOiAnRGVzY3JpcHRpb24nIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGVuZHBvaW50OiBgL3N5c2NvbGxlY3Rvci8ke2FnZW50SUR9L3Byb2Nlc3Nlc2AsXG4gICAgICAgICAgICAgIGxvZ2dlck1lc3NhZ2U6IGBGZXRjaGluZyBwcm9jZXNzZXMgZm9yIGFnZW50ICR7YWdlbnRJRH1gLFxuICAgICAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnUHJvY2Vzc2VzJyxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOlxuICAgICAgICAgICAgICAgICAgYWdlbnRPcyA9PT0gJ3dpbmRvd3MnXG4gICAgICAgICAgICAgICAgICAgID8gW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ25hbWUnLCBsYWJlbDogJ05hbWUnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAnY21kJywgbGFiZWw6ICdDTUQnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAncHJpb3JpdHknLCBsYWJlbDogJ1ByaW9yaXR5JyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ25sd3AnLCBsYWJlbDogJ05MV1AnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICA6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6ICduYW1lJywgbGFiZWw6ICdOYW1lJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ2V1c2VyJywgbGFiZWw6ICdFZmZlY3RpdmUgdXNlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6ICduaWNlJywgbGFiZWw6ICdQcmlvcml0eScgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6ICdzdGF0ZScsIGxhYmVsOiAnU3RhdGUnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbWFwUmVzcG9uc2VJdGVtczogaXRlbSA9PlxuICAgICAgICAgICAgICAgIGFnZW50T3MgPT09ICd3aW5kb3dzJ1xuICAgICAgICAgICAgICAgICAgPyBpdGVtXG4gICAgICAgICAgICAgICAgICA6IHsgLi4uaXRlbSwgc3RhdGU6IFByb2Nlc3NFcXVpdmFsZW5jZVtpdGVtLnN0YXRlXSB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZW5kcG9pbnQ6IGAvc3lzY29sbGVjdG9yLyR7YWdlbnRJRH0vcG9ydHNgLFxuICAgICAgICAgICAgICBsb2dnZXJNZXNzYWdlOiBgRmV0Y2hpbmcgcG9ydHMgZm9yIGFnZW50ICR7YWdlbnRJRH1gLFxuICAgICAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnTmV0d29yayBwb3J0cycsXG4gICAgICAgICAgICAgICAgY29sdW1uczpcbiAgICAgICAgICAgICAgICAgIGFnZW50T3MgPT09ICd3aW5kb3dzJ1xuICAgICAgICAgICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6ICdsb2NhbF9wb3J0JywgbGFiZWw6ICdMb2NhbCBwb3J0JyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ2xvY2FsX2lwJywgbGFiZWw6ICdMb2NhbCBJUCBhZGRyZXNzJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ3Byb2Nlc3MnLCBsYWJlbDogJ1Byb2Nlc3MnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAnc3RhdGUnLCBsYWJlbDogJ1N0YXRlJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ3Byb3RvY29sJywgbGFiZWw6ICdQcm90b2NvbCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIDogYWdlbnRPcyA9PT0gJ2xpbnV4J1xuICAgICAgICAgICAgICAgICAgICA/IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaWQ6ICdsb2NhbF9wb3J0JywgbGFiZWw6ICdMb2NhbCBwb3J0JyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ2xvY2FsX2lwJywgbGFiZWw6ICdMb2NhbCBJUCBhZGRyZXNzJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ3Byb2Nlc3MnLCBsYWJlbDogJ1Byb2Nlc3MnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAncGlkJywgbGFiZWw6ICdQSUQnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAnc3RhdGUnLCBsYWJlbDogJ1N0YXRlJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ3Byb3RvY29sJywgbGFiZWw6ICdQcm90b2NvbCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIDogW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ2xvY2FsX3BvcnQnLCBsYWJlbDogJ0xvY2FsIHBvcnQnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAnbG9jYWxfaXAnLCBsYWJlbDogJ0xvY2FsIElQIGFkZHJlc3MnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGlkOiAnc3RhdGUnLCBsYWJlbDogJ1N0YXRlJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpZDogJ3Byb3RvY29sJywgbGFiZWw6ICdQcm90b2NvbCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBtYXBSZXNwb25zZUl0ZW1zOiBpdGVtID0+ICh7XG4gICAgICAgICAgICAgICAgLi4uaXRlbSxcbiAgICAgICAgICAgICAgICBsb2NhbF9pcDogaXRlbS5sb2NhbC5pcCxcbiAgICAgICAgICAgICAgICBsb2NhbF9wb3J0OiBpdGVtLmxvY2FsLnBvcnQsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZW5kcG9pbnQ6IGAvc3lzY29sbGVjdG9yLyR7YWdlbnRJRH0vbmV0aWZhY2VgLFxuICAgICAgICAgICAgICBsb2dnZXJNZXNzYWdlOiBgRmV0Y2hpbmcgbmV0aWZhY2UgZm9yIGFnZW50ICR7YWdlbnRJRH1gLFxuICAgICAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnTmV0d29yayBpbnRlcmZhY2VzJyxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAgICB7IGlkOiAnbmFtZScsIGxhYmVsOiAnTmFtZScgfSxcbiAgICAgICAgICAgICAgICAgIHsgaWQ6ICdtYWMnLCBsYWJlbDogJ01hYycgfSxcbiAgICAgICAgICAgICAgICAgIHsgaWQ6ICdzdGF0ZScsIGxhYmVsOiAnU3RhdGUnIH0sXG4gICAgICAgICAgICAgICAgICB7IGlkOiAnbXR1JywgbGFiZWw6ICdNVFUnIH0sXG4gICAgICAgICAgICAgICAgICB7IGlkOiAndHlwZScsIGxhYmVsOiAnVHlwZScgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZW5kcG9pbnQ6IGAvc3lzY29sbGVjdG9yLyR7YWdlbnRJRH0vbmV0YWRkcmAsXG4gICAgICAgICAgICAgIGxvZ2dlck1lc3NhZ2U6IGBGZXRjaGluZyBuZXRhZGRyIGZvciBhZ2VudCAke2FnZW50SUR9YCxcbiAgICAgICAgICAgICAgdGFibGU6IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogJ05ldHdvcmsgc2V0dGluZ3MnLFxuICAgICAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgICAgIHsgaWQ6ICdpZmFjZScsIGxhYmVsOiAnSW50ZXJmYWNlJyB9LFxuICAgICAgICAgICAgICAgICAgeyBpZDogJ2FkZHJlc3MnLCBsYWJlbDogJ0FkZHJlc3MnIH0sXG4gICAgICAgICAgICAgICAgICB7IGlkOiAnbmV0bWFzaycsIGxhYmVsOiAnTmV0bWFzaycgfSxcbiAgICAgICAgICAgICAgICAgIHsgaWQ6ICdwcm90bycsIGxhYmVsOiAnUHJvdG9jb2wnIH0sXG4gICAgICAgICAgICAgICAgICB7IGlkOiAnYnJvYWRjYXN0JywgbGFiZWw6ICdCcm9hZGNhc3QnIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXTtcblxuICAgICAgICAgIGFnZW50T3MgPT09ICd3aW5kb3dzJyAmJlxuICAgICAgICAgICAgYWdlbnRSZXF1ZXN0c0ludmVudG9yeS5wdXNoKHtcbiAgICAgICAgICAgICAgZW5kcG9pbnQ6IGAvc3lzY29sbGVjdG9yLyR7YWdlbnRJRH0vaG90Zml4ZXNgLFxuICAgICAgICAgICAgICBsb2dnZXJNZXNzYWdlOiBgRmV0Y2hpbmcgaG90Zml4ZXMgZm9yIGFnZW50ICR7YWdlbnRJRH1gLFxuICAgICAgICAgICAgICB0YWJsZToge1xuICAgICAgICAgICAgICAgIHRpdGxlOiAnV2luZG93cyB1cGRhdGVzJyxcbiAgICAgICAgICAgICAgICBjb2x1bW5zOiBbeyBpZDogJ2hvdGZpeCcsIGxhYmVsOiAnVXBkYXRlIGNvZGUnIH1dLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCByZXF1ZXN0SW52ZW50b3J5ID0gYXN5bmMgYWdlbnRSZXF1ZXN0SW52ZW50b3J5ID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKGFnZW50UmVxdWVzdEludmVudG9yeS5sb2dnZXJNZXNzYWdlKTtcblxuICAgICAgICAgICAgICBjb25zdCBpbnZlbnRvcnlSZXNwb25zZSA9XG4gICAgICAgICAgICAgICAgYXdhaXQgY29udGV4dC53YXp1aC5hcGkuY2xpZW50LmFzQ3VycmVudFVzZXIucmVxdWVzdChcbiAgICAgICAgICAgICAgICAgICdHRVQnLFxuICAgICAgICAgICAgICAgICAgYWdlbnRSZXF1ZXN0SW52ZW50b3J5LmVuZHBvaW50LFxuICAgICAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgICAgICB7IGFwaUhvc3RJRDogYXBpSWQgfSxcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgIGNvbnN0IGludmVudG9yeSA9XG4gICAgICAgICAgICAgICAgaW52ZW50b3J5UmVzcG9uc2UgJiZcbiAgICAgICAgICAgICAgICBpbnZlbnRvcnlSZXNwb25zZS5kYXRhICYmXG4gICAgICAgICAgICAgICAgaW52ZW50b3J5UmVzcG9uc2UuZGF0YS5kYXRhICYmXG4gICAgICAgICAgICAgICAgaW52ZW50b3J5UmVzcG9uc2UuZGF0YS5kYXRhLmFmZmVjdGVkX2l0ZW1zO1xuICAgICAgICAgICAgICBpZiAoaW52ZW50b3J5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIC4uLmFnZW50UmVxdWVzdEludmVudG9yeS50YWJsZSxcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBhZ2VudFJlcXVlc3RJbnZlbnRvcnkubWFwUmVzcG9uc2VJdGVtc1xuICAgICAgICAgICAgICAgICAgICA/IGludmVudG9yeS5tYXAoYWdlbnRSZXF1ZXN0SW52ZW50b3J5Lm1hcFJlc3BvbnNlSXRlbXMpXG4gICAgICAgICAgICAgICAgICAgIDogaW52ZW50b3J5LFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBpZiAodGltZSkge1xuICAgICAgICAgICAgLy8gQWRkIFZ1bG5lcmFiaWxpdHkgRGV0ZWN0b3IgZmlsdGVyIHRvIHRoZSBTZXJ2ZXIgU2lkZSBRdWVyeVxuICAgICAgICAgICAgc2VydmVyU2lkZVF1ZXJ5Py5ib29sPy5tdXN0Py5wdXNoPy4oe1xuICAgICAgICAgICAgICBtYXRjaF9waHJhc2U6IHtcbiAgICAgICAgICAgICAgICAncnVsZS5ncm91cHMnOiB7XG4gICAgICAgICAgICAgICAgICBxdWVyeTogJ3Z1bG5lcmFiaWxpdHktZGV0ZWN0b3InLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYXdhaXQgZXh0ZW5kZWRJbmZvcm1hdGlvbihcbiAgICAgICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICAgICAgcHJpbnRlcixcbiAgICAgICAgICAgICAgJ2FnZW50cycsXG4gICAgICAgICAgICAgICdzeXNjb2xsZWN0b3InLFxuICAgICAgICAgICAgICBhcGlJZCxcbiAgICAgICAgICAgICAgZnJvbSxcbiAgICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICAgIHNlcnZlclNpZGVRdWVyeSxcbiAgICAgICAgICAgICAgYWdlbnRzRmlsdGVyLFxuICAgICAgICAgICAgICBpbmRleFBhdHRlcm5UaXRsZSB8fFxuICAgICAgICAgICAgICAgIGNvbnRleHQud2F6dWhfY29yZS5jb25maWd1cmF0aW9uLmdldFNldHRpbmdWYWx1ZSgncGF0dGVybicpLFxuICAgICAgICAgICAgICBhZ2VudElELFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBBZGQgaW52ZW50b3J5IHRhYmxlc1xuICAgICAgICAgIChhd2FpdCBQcm9taXNlLmFsbChhZ2VudFJlcXVlc3RzSW52ZW50b3J5Lm1hcChyZXF1ZXN0SW52ZW50b3J5KSkpXG4gICAgICAgICAgICAuZmlsdGVyKHRhYmxlID0+IHRhYmxlKVxuICAgICAgICAgICAgLmZvckVhY2godGFibGUgPT4gcHJpbnRlci5hZGRTaW1wbGVUYWJsZSh0YWJsZSkpO1xuXG4gICAgICAgICAgLy8gUHJpbnQgdGhlIGRvY3VtZW50XG4gICAgICAgICAgYXdhaXQgcHJpbnRlci5wcmludChjb250ZXh0LndhenVoRW5kcG9pbnRQYXJhbXMucGF0aEZpbGVuYW1lKTtcblxuICAgICAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgIHN1Y2Nlc3M6IHRydWUsXG4gICAgICAgICAgICAgIG1lc3NhZ2U6IGBSZXBvcnQgJHtjb250ZXh0LndhenVoRW5kcG9pbnRQYXJhbXMuZmlsZW5hbWV9IHdhcyBjcmVhdGVkYCxcbiAgICAgICAgICAgICAgZmlsZW5hbWU6IGNvbnRleHQud2F6dWhFbmRwb2ludFBhcmFtcy5maWxlbmFtZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoZXJyb3IubWVzc2FnZSB8fCBlcnJvciwgNTAyOSwgNTAwLCByZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAoeyBwYXJhbXM6IHsgYWdlbnRJRCB9IH0pID0+XG4gICAgICAgIGB3YXp1aC1hZ2VudC1pbnZlbnRvcnktJHthZ2VudElEfS0ke3RoaXMuZ2VuZXJhdGVSZXBvcnRUaW1lc3RhbXAoKX0ucGRmYCxcbiAgICApO1xuXG4gIC8qKlxuICAgKiBGZXRjaCB0aGUgcmVwb3J0cyBsaXN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVxuICAgKiBAcmV0dXJucyB7QXJyYXk8T2JqZWN0Pn0gcmVwb3J0cyBsaXN0IG9yIEVycm9yUmVzcG9uc2VcbiAgICovXG4gIGFzeW5jIGdldFJlcG9ydHMoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gICkge1xuICAgIHRyeSB7XG4gICAgICBjb250ZXh0LndhenVoLmxvZ2dlci5kZWJ1ZygnRmV0Y2hpbmcgY3JlYXRlZCByZXBvcnRzJyk7XG4gICAgICBjb25zdCB7IGhhc2hVc2VybmFtZSB9ID0gYXdhaXQgY29udGV4dC53YXp1aC5zZWN1cml0eS5nZXRDdXJyZW50VXNlcihcbiAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgY29udGV4dCxcbiAgICAgICk7XG4gICAgICBjcmVhdGVEYXRhRGlyZWN0b3J5SWZOb3RFeGlzdHMoKTtcbiAgICAgIGNyZWF0ZURpcmVjdG9yeUlmTm90RXhpc3RzKFdBWlVIX0RBVEFfRE9XTkxPQURTX0RJUkVDVE9SWV9QQVRIKTtcbiAgICAgIGNyZWF0ZURpcmVjdG9yeUlmTm90RXhpc3RzKFdBWlVIX0RBVEFfRE9XTkxPQURTX1JFUE9SVFNfRElSRUNUT1JZX1BBVEgpO1xuICAgICAgY29uc3QgdXNlclJlcG9ydHNEaXJlY3RvcnlQYXRoID0gcGF0aC5qb2luKFxuICAgICAgICBXQVpVSF9EQVRBX0RPV05MT0FEU19SRVBPUlRTX0RJUkVDVE9SWV9QQVRILFxuICAgICAgICBoYXNoVXNlcm5hbWUsXG4gICAgICApO1xuICAgICAgY3JlYXRlRGlyZWN0b3J5SWZOb3RFeGlzdHModXNlclJlcG9ydHNEaXJlY3RvcnlQYXRoKTtcbiAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKGBEaXJlY3Rvcnk6ICR7dXNlclJlcG9ydHNEaXJlY3RvcnlQYXRofWApO1xuXG4gICAgICBjb25zdCBzb3J0UmVwb3J0c0J5RGF0ZSA9IChhLCBiKSA9PlxuICAgICAgICBhLmRhdGUgPCBiLmRhdGUgPyAxIDogYS5kYXRlID4gYi5kYXRlID8gLTEgOiAwO1xuXG4gICAgICBjb25zdCByZXBvcnRzID0gZnMucmVhZGRpclN5bmModXNlclJlcG9ydHNEaXJlY3RvcnlQYXRoKS5tYXAoZmlsZSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRzID0gZnMuc3RhdFN5bmModXNlclJlcG9ydHNEaXJlY3RvcnlQYXRoICsgJy8nICsgZmlsZSk7XG4gICAgICAgIC8vIEdldCB0aGUgZmlsZSBjcmVhdGlvbiB0aW1lIChiaXRodGltZSkuIEl0IHJldHVybnMgdGhlIGZpcnN0IHZhbHVlIHRoYXQgaXMgYSB0cnV0aHkgdmFsdWUgb2YgbmV4dCBmaWxlIHN0YXRzOiBiaXJ0aHRpbWUsIG10aW1lLCBjdGltZSBhbmQgYXRpbWUuXG4gICAgICAgIC8vIFRoaXMgc29sdmVzIHNvbWUgT1NzIGNhbiBoYXZlIHRoZSBiaXRodGltZU1zIGVxdWFsIHRvIDAgYW5kIHJldHVybnMgdGhlIGRhdGUgbGlrZSAxOTcwLTAxLTAxXG4gICAgICAgIGNvbnN0IGJpcnRoVGltZUZpZWxkID0gWydiaXJ0aHRpbWUnLCAnbXRpbWUnLCAnY3RpbWUnLCAnYXRpbWUnXS5maW5kKFxuICAgICAgICAgIHRpbWUgPT4gc3RhdHNbYCR7dGltZX1Nc2BdLFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG5hbWU6IGZpbGUsXG4gICAgICAgICAgc2l6ZTogc3RhdHMuc2l6ZSxcbiAgICAgICAgICBkYXRlOiBzdGF0c1tiaXJ0aFRpbWVGaWVsZF0sXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKFxuICAgICAgICBgVXNpbmcgVGltU29ydCBmb3Igc29ydGluZyAke3JlcG9ydHMubGVuZ3RofSBpdGVtc2AsXG4gICAgICApO1xuICAgICAgVGltU29ydC5zb3J0KHJlcG9ydHMsIHNvcnRSZXBvcnRzQnlEYXRlKTtcbiAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKGBUb3RhbCByZXBvcnRzOiAke3JlcG9ydHMubGVuZ3RofWApO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgYm9keTogeyByZXBvcnRzIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShlcnJvci5tZXNzYWdlIHx8IGVycm9yLCA1MDMxLCA1MDAsIHJlc3BvbnNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmV0Y2ggc3BlY2lmaWMgcmVwb3J0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSByZXBvcnQgb3IgRXJyb3JSZXNwb25zZVxuICAgKi9cbiAgZ2V0UmVwb3J0QnlOYW1lID0gdGhpcy5jaGVja1JlcG9ydHNVc2VyRGlyZWN0b3J5SXNWYWxpZFJvdXRlRGVjb3JhdG9yKFxuICAgIGFzeW5jIChcbiAgICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgICApID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKFxuICAgICAgICAgIGBHZXR0aW5nICR7Y29udGV4dC53YXp1aEVuZHBvaW50UGFyYW1zLnBhdGhGaWxlbmFtZX0gcmVwb3J0YCxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgcmVwb3J0RmlsZUJ1ZmZlciA9IGZzLnJlYWRGaWxlU3luYyhcbiAgICAgICAgICBjb250ZXh0LndhenVoRW5kcG9pbnRQYXJhbXMucGF0aEZpbGVuYW1lLFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgIGhlYWRlcnM6IHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9wZGYnIH0sXG4gICAgICAgICAgYm9keTogcmVwb3J0RmlsZUJ1ZmZlcixcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb250ZXh0LndhenVoLmxvZ2dlci5lcnJvcihlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcbiAgICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoZXJyb3IubWVzc2FnZSB8fCBlcnJvciwgNTAzMCwgNTAwLCByZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICByZXF1ZXN0ID0+IHJlcXVlc3QucGFyYW1zLm5hbWUsXG4gICk7XG5cbiAgLyoqXG4gICAqIERlbGV0ZSBzcGVjaWZpYyByZXBvcnRcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcXVlc3RcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHN0YXR1cyBvYmogb3IgRXJyb3JSZXNwb25zZVxuICAgKi9cbiAgZGVsZXRlUmVwb3J0QnlOYW1lID0gdGhpcy5jaGVja1JlcG9ydHNVc2VyRGlyZWN0b3J5SXNWYWxpZFJvdXRlRGVjb3JhdG9yKFxuICAgIGFzeW5jIChcbiAgICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgICApID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKFxuICAgICAgICAgIGBEZWxldGluZyAke2NvbnRleHQud2F6dWhFbmRwb2ludFBhcmFtcy5wYXRoRmlsZW5hbWV9IHJlcG9ydGAsXG4gICAgICAgICk7XG4gICAgICAgIGZzLnVubGlua1N5bmMoY29udGV4dC53YXp1aEVuZHBvaW50UGFyYW1zLnBhdGhGaWxlbmFtZSk7XG4gICAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmluZm8oXG4gICAgICAgICAgYCR7Y29udGV4dC53YXp1aEVuZHBvaW50UGFyYW1zLnBhdGhGaWxlbmFtZX0gcmVwb3J0IHdhcyBkZWxldGVkYCxcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICBib2R5OiB7IGVycm9yOiAwIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IsIDUwMzIsIDUwMCwgcmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVxdWVzdCA9PiByZXF1ZXN0LnBhcmFtcy5uYW1lLFxuICApO1xuXG4gIGNoZWNrUmVwb3J0c1VzZXJEaXJlY3RvcnlJc1ZhbGlkUm91dGVEZWNvcmF0b3IoXG4gICAgcm91dGVIYW5kbGVyLFxuICAgIHJlcG9ydEZpbGVOYW1lQWNjZXNzb3IsXG4gICkge1xuICAgIHJldHVybiBhc3luYyAoXG4gICAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gICAgKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7IHVzZXJuYW1lLCBoYXNoVXNlcm5hbWUgfSA9XG4gICAgICAgICAgYXdhaXQgY29udGV4dC53YXp1aC5zZWN1cml0eS5nZXRDdXJyZW50VXNlcihyZXF1ZXN0LCBjb250ZXh0KTtcbiAgICAgICAgY29uc3QgdXNlclJlcG9ydHNEaXJlY3RvcnlQYXRoID0gcGF0aC5qb2luKFxuICAgICAgICAgIFdBWlVIX0RBVEFfRE9XTkxPQURTX1JFUE9SVFNfRElSRUNUT1JZX1BBVEgsXG4gICAgICAgICAgaGFzaFVzZXJuYW1lLFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBmaWxlbmFtZSA9IHJlcG9ydEZpbGVOYW1lQWNjZXNzb3IocmVxdWVzdCk7XG4gICAgICAgIGNvbnN0IHBhdGhGaWxlbmFtZSA9IHBhdGguam9pbih1c2VyUmVwb3J0c0RpcmVjdG9yeVBhdGgsIGZpbGVuYW1lKTtcbiAgICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZGVidWcoXG4gICAgICAgICAgYENoZWNraW5nIHRoZSB1c2VyICR7dXNlcm5hbWV9KCR7aGFzaFVzZXJuYW1lfSkgY2FuIGRvIGFjdGlvbnMgaW4gdGhlIHJlcG9ydHMgZmlsZTogJHtwYXRoRmlsZW5hbWV9YCxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICFwYXRoRmlsZW5hbWUuc3RhcnRzV2l0aCh1c2VyUmVwb3J0c0RpcmVjdG9yeVBhdGgpIHx8XG4gICAgICAgICAgcGF0aEZpbGVuYW1lLmluY2x1ZGVzKCcuLi8nKVxuICAgICAgICApIHtcbiAgICAgICAgICBjb250ZXh0LndhenVoLmxvZ2dlci53YXJuKFxuICAgICAgICAgICAgYFVzZXIgJHt1c2VybmFtZX0oJHtoYXNoVXNlcm5hbWV9KSB0cmllZCB0byBhY2Nlc3MgdG8gYSBub24gdXNlciByZXBvcnQgZmlsZTogJHtwYXRoRmlsZW5hbWV9YCxcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5iYWRSZXF1ZXN0KHtcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogJzUwNDAgLSBZb3Ugc2hhbGwgbm90IHBhc3MhJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZGVidWcoXG4gICAgICAgICAgJ0NoZWNraW5nIHRoZSB1c2VyIGNhbiBkbyBhY3Rpb25zIGluIHRoZSByZXBvcnRzIGZpbGUnLFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gYXdhaXQgcm91dGVIYW5kbGVyLmJpbmQodGhpcykoXG4gICAgICAgICAge1xuICAgICAgICAgICAgLi4uY29udGV4dCxcbiAgICAgICAgICAgIHdhenVoRW5kcG9pbnRQYXJhbXM6IHsgaGFzaFVzZXJuYW1lLCBmaWxlbmFtZSwgcGF0aEZpbGVuYW1lIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZXF1ZXN0LFxuICAgICAgICAgIHJlc3BvbnNlLFxuICAgICAgICApO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IsIDUwNDAsIDUwMCwgcmVzcG9uc2UpO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlUmVwb3J0VGltZXN0YW1wKCkge1xuICAgIHJldHVybiBg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