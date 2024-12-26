"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildAgentsTable = buildAgentsTable;
exports.extendedInformation = extendedInformation;
var _summaryTable = _interopRequireDefault(require("./summary-table"));
var _summaryTablesDefinitions = _interopRequireDefault(require("./summary-tables-definitions"));
var VulnerabilityRequest = _interopRequireWildcard(require("./vulnerability-request"));
var OverviewRequest = _interopRequireWildcard(require("./overview-request"));
var RootcheckRequest = _interopRequireWildcard(require("./rootcheck-request"));
var PCIRequest = _interopRequireWildcard(require("./pci-request"));
var GDPRRequest = _interopRequireWildcard(require("./gdpr-request"));
var TSCRequest = _interopRequireWildcard(require("./tsc-request"));
var AuditRequest = _interopRequireWildcard(require("./audit-request"));
var SyscheckRequest = _interopRequireWildcard(require("./syscheck-request"));
var _pciRequirementsPdfmake = _interopRequireDefault(require("../../integration-files/pci-requirements-pdfmake"));
var _gdprRequirementsPdfmake = _interopRequireDefault(require("../../integration-files/gdpr-requirements-pdfmake"));
var _tscRequirementsPdfmake = _interopRequireDefault(require("../../integration-files/tsc-requirements-pdfmake"));
var _moment = _interopRequireDefault(require("moment"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * This build the agents table
 * @param {Array<Strings>} ids ids of agents
 * @param {String} apiId API id
 */
async function buildAgentsTable(context, printer, agentIDs, apiId, groupID = '') {
  const dateFormat = await context.core.uiSettings.client.get('dateFormat');
  if ((!agentIDs || !agentIDs.length) && !groupID) return;
  printer.logger.debug(`${agentIDs.length} agents for API ${apiId}`);
  try {
    let agentsData = [];
    if (groupID) {
      let totalAgentsInGroup = null;
      do {
        const {
          data: {
            data: {
              affected_items,
              total_affected_items
            }
          }
        } = await context.wazuh.api.client.asCurrentUser.request('GET', `/groups/${groupID}/agents`, {
          params: {
            offset: agentsData.length,
            select: 'dateAdd,id,ip,lastKeepAlive,manager,name,os.name,os.version,version'
          }
        }, {
          apiHostID: apiId
        });
        !totalAgentsInGroup && (totalAgentsInGroup = total_affected_items);
        agentsData = [...agentsData, ...affected_items];
      } while (agentsData.length < totalAgentsInGroup);
    } else {
      for (const agentID of agentIDs) {
        try {
          const {
            data: {
              data: {
                affected_items: [agent]
              }
            }
          } = await context.wazuh.api.client.asCurrentUser.request('GET', `/agents`, {
            params: {
              q: `id=${agentID}`,
              select: 'dateAdd,id,ip,lastKeepAlive,manager,name,os.name,os.version,version'
            }
          }, {
            apiHostID: apiId
          });
          agentsData.push(agent);
        } catch (error) {
          printer.logger.debug(`Skip agent due to: ${error.message || error}`);
        }
      }
    }
    if (agentsData.length) {
      // Print a table with agent/s information
      printer.addSimpleTable({
        columns: [{
          id: 'id',
          label: 'ID'
        }, {
          id: 'name',
          label: 'Name'
        }, {
          id: 'ip',
          label: 'IP address'
        }, {
          id: 'version',
          label: 'Version'
        }, {
          id: 'manager',
          label: 'Manager'
        }, {
          id: 'os',
          label: 'Operating system'
        }, {
          id: 'dateAdd',
          label: 'Registration date'
        }, {
          id: 'lastKeepAlive',
          label: 'Last keep alive'
        }],
        items: agentsData.filter(agent => agent) // Remove undefined agents when Wazuh API no longer finds and agentID
        .map(agent => {
          return {
            ...agent,
            os: agent.os && agent.os.name && agent.os.version ? `${agent.os.name} ${agent.os.version}` : '',
            lastKeepAlive: (0, _moment.default)(agent.lastKeepAlive).format(dateFormat),
            dateAdd: (0, _moment.default)(agent.dateAdd).format(dateFormat)
          };
        })
      });
    } else if (!agentsData.length && groupID) {
      // For group reports when there is no agents in the group
      printer.addContent({
        text: 'There are no agents in this group.',
        style: {
          fontSize: 12,
          color: '#000'
        }
      });
    }
  } catch (error) {
    printer.logger.error(error.message || error);
    return Promise.reject(error);
  }
}

/**
 * This load more information
 * @param {*} context Endpoint context
 * @param {*} printer printer instance
 * @param {String} section section target
 * @param {Object} tab tab target
 * @param {String} apiId ID of API
 * @param {Number} from Timestamp (ms) from
 * @param {Number} to Timestamp (ms) to
 * @param {String} filters E.g: cluster.name: wazuh AND rule.groups: vulnerability
 * @param {String} pattern
 * @param {Object} agent agent target
 * @returns {Object} Extended information
 */
async function extendedInformation(context, printer, section, tab, apiId, from, to, filters, allowedAgentsFilter, pattern, agent = null) {
  try {
    printer.logger.debug(`Section ${section} and tab ${tab}, API is ${apiId}. From ${from} to ${to}. Filters ${JSON.stringify(filters)}. Index pattern ${pattern}`);
    if (section === 'agents' && !agent) {
      throw new Error('Reporting for specific agent needs an agent ID in order to work properly');
    }
    const agents = await context.wazuh.api.client.asCurrentUser.request('GET', '/agents', {
      params: {
        limit: 1
      }
    }, {
      apiHostID: apiId
    });
    const totalAgents = agents.data.data.total_affected_items;

    //--- OVERVIEW - VULS
    if (section === 'overview' && tab === 'vuls') {
      printer.logger.debug('Fetching overview vulnerability detector metrics');
      const vulnerabilitiesLevels = ['Low', 'Medium', 'High', 'Critical'];
      const vulnerabilitiesResponsesCount = (await Promise.all(vulnerabilitiesLevels.map(async vulnerabilitiesLevel => {
        try {
          const count = await VulnerabilityRequest.uniqueSeverityCount(context, from, to, vulnerabilitiesLevel, filters, allowedAgentsFilter, pattern);
          return count ? `${count} of ${totalAgents} agents have ${vulnerabilitiesLevel.toLocaleLowerCase()} vulnerabilities.` : undefined;
        } catch (error) {}
      }))).filter(vulnerabilitiesResponse => vulnerabilitiesResponse);
      printer.addList({
        title: {
          text: 'Summary',
          style: 'h2'
        },
        list: vulnerabilitiesResponsesCount
      });
      printer.logger.debug('Fetching overview vulnerability detector top 3 agents by category');
      const lowRank = await VulnerabilityRequest.topAgentCount(context, from, to, 'Low', filters, allowedAgentsFilter, pattern);
      const mediumRank = await VulnerabilityRequest.topAgentCount(context, from, to, 'Medium', filters, allowedAgentsFilter, pattern);
      const highRank = await VulnerabilityRequest.topAgentCount(context, from, to, 'High', filters, allowedAgentsFilter, pattern);
      const criticalRank = await VulnerabilityRequest.topAgentCount(context, from, to, 'Critical', filters, allowedAgentsFilter, pattern);
      printer.logger.debug('Adding overview vulnerability detector top 3 agents by category');
      if (criticalRank && criticalRank.length) {
        printer.addContentWithNewLine({
          text: 'Top 3 agents with critical severity vulnerabilities',
          style: 'h3'
        });
        await buildAgentsTable(context, printer, criticalRank, apiId);
        printer.addNewLine();
      }
      if (highRank && highRank.length) {
        printer.addContentWithNewLine({
          text: 'Top 3 agents with high severity vulnerabilities',
          style: 'h3'
        });
        await buildAgentsTable(context, printer, highRank, apiId);
        printer.addNewLine();
      }
      if (mediumRank && mediumRank.length) {
        printer.addContentWithNewLine({
          text: 'Top 3 agents with medium severity vulnerabilities',
          style: 'h3'
        });
        await buildAgentsTable(context, printer, mediumRank, apiId);
        printer.addNewLine();
      }
      if (lowRank && lowRank.length) {
        printer.addContentWithNewLine({
          text: 'Top 3 agents with low severity vulnerabilities',
          style: 'h3'
        });
        await buildAgentsTable(context, printer, lowRank, apiId);
        printer.addNewLine();
      }
      printer.logger.debug('Fetching overview vulnerability detector top 3 CVEs');
      const cveRank = await VulnerabilityRequest.topCVECount(context, from, to, filters, allowedAgentsFilter, pattern);
      printer.logger.debug('Adding overview vulnerability detector top 3 CVEs');
      if (cveRank && cveRank.length) {
        printer.addSimpleTable({
          title: {
            text: 'Top 3 CVE',
            style: 'h2'
          },
          columns: [{
            id: 'top',
            label: 'Top'
          }, {
            id: 'cve',
            label: 'CVE'
          }],
          items: cveRank.map(item => ({
            top: cveRank.indexOf(item) + 1,
            cve: item
          }))
        });
      }
    }

    //--- OVERVIEW - GENERAL
    if (section === 'overview' && tab === 'general') {
      printer.logger.debug('Fetching top 3 agents with level 15 alerts');
      const level15Rank = await OverviewRequest.topLevel15(context, from, to, filters, allowedAgentsFilter, pattern);
      printer.logger.debug('Adding top 3 agents with level 15 alerts');
      if (level15Rank.length) {
        printer.addContent({
          text: 'Top 3 agents with level 15 alerts',
          style: 'h2'
        });
        await buildAgentsTable(context, printer, level15Rank, apiId);
      }
    }

    //--- OVERVIEW - PM
    if (section === 'overview' && tab === 'pm') {
      printer.logger.debug('Fetching most common rootkits');
      const top5RootkitsRank = await RootcheckRequest.top5RootkitsDetected(context, from, to, filters, allowedAgentsFilter, pattern);
      printer.logger.debug('Adding most common rootkits');
      if (top5RootkitsRank && top5RootkitsRank.length) {
        printer.addContentWithNewLine({
          text: 'Most common rootkits found among your agents',
          style: 'h2'
        }).addContentWithNewLine({
          text: 'Rootkits are a set of software tools that enable an unauthorized user to gain control of a computer system without being detected.',
          style: 'standard'
        }).addSimpleTable({
          items: top5RootkitsRank.map(item => {
            return {
              top: top5RootkitsRank.indexOf(item) + 1,
              name: item
            };
          }),
          columns: [{
            id: 'top',
            label: 'Top'
          }, {
            id: 'name',
            label: 'Rootkit'
          }]
        });
      }
      printer.logger.debug('Fetching hidden pids');
      const hiddenPids = await RootcheckRequest.agentsWithHiddenPids(context, from, to, filters, allowedAgentsFilter, pattern);
      hiddenPids && printer.addContent({
        text: `${hiddenPids} of ${totalAgents} agents have hidden processes`,
        style: 'h3'
      });
      !hiddenPids && printer.addContentWithNewLine({
        text: `No agents have hidden processes`,
        style: 'h3'
      });
      const hiddenPorts = await RootcheckRequest.agentsWithHiddenPorts(context, from, to, filters, allowedAgentsFilter, pattern);
      hiddenPorts && printer.addContent({
        text: `${hiddenPorts} of ${totalAgents} agents have hidden ports`,
        style: 'h3'
      });
      !hiddenPorts && printer.addContent({
        text: `No agents have hidden ports`,
        style: 'h3'
      });
      printer.addNewLine();
    }

    //--- OVERVIEW/AGENTS - PCI
    if (['overview', 'agents'].includes(section) && tab === 'pci') {
      printer.logger.debug('Fetching top PCI DSS requirements');
      const topPciRequirements = await PCIRequest.topPCIRequirements(context, from, to, filters, allowedAgentsFilter, pattern);
      printer.addContentWithNewLine({
        text: 'Most common PCI DSS requirements alerts found',
        style: 'h2'
      });
      for (const item of topPciRequirements) {
        const rules = await PCIRequest.getRulesByRequirement(context, from, to, filters, allowedAgentsFilter, item, pattern);
        printer.addContentWithNewLine({
          text: `Requirement ${item}`,
          style: 'h3'
        });
        if (_pciRequirementsPdfmake.default[item]) {
          const content = typeof _pciRequirementsPdfmake.default[item] === 'string' ? {
            text: _pciRequirementsPdfmake.default[item],
            style: 'standard'
          } : _pciRequirementsPdfmake.default[item];
          printer.addContentWithNewLine(content);
        }
        rules && rules.length && printer.addSimpleTable({
          columns: [{
            id: 'ruleID',
            label: 'Rule ID'
          }, {
            id: 'ruleDescription',
            label: 'Description'
          }],
          items: rules,
          title: `Top rules for ${item} requirement`
        });
      }
    }

    //--- OVERVIEW/AGENTS - TSC
    if (['overview', 'agents'].includes(section) && tab === 'tsc') {
      printer.logger.debug('Fetching top TSC requirements');
      const topTSCRequirements = await TSCRequest.topTSCRequirements(context, from, to, filters, allowedAgentsFilter, pattern);
      printer.addContentWithNewLine({
        text: 'Most common TSC requirements alerts found',
        style: 'h2'
      });
      for (const item of topTSCRequirements) {
        const rules = await TSCRequest.getRulesByRequirement(context, from, to, filters, allowedAgentsFilter, item, pattern);
        printer.addContentWithNewLine({
          text: `Requirement ${item}`,
          style: 'h3'
        });
        if (_tscRequirementsPdfmake.default[item]) {
          const content = typeof _tscRequirementsPdfmake.default[item] === 'string' ? {
            text: _tscRequirementsPdfmake.default[item],
            style: 'standard'
          } : _tscRequirementsPdfmake.default[item];
          printer.addContentWithNewLine(content);
        }
        rules && rules.length && printer.addSimpleTable({
          columns: [{
            id: 'ruleID',
            label: 'Rule ID'
          }, {
            id: 'ruleDescription',
            label: 'Description'
          }],
          items: rules,
          title: `Top rules for ${item} requirement`
        });
      }
    }

    //--- OVERVIEW/AGENTS - GDPR
    if (['overview', 'agents'].includes(section) && tab === 'gdpr') {
      printer.logger.debug('Fetching top GDPR requirements');
      const topGdprRequirements = await GDPRRequest.topGDPRRequirements(context, from, to, filters, allowedAgentsFilter, pattern);
      printer.addContentWithNewLine({
        text: 'Most common GDPR requirements alerts found',
        style: 'h2'
      });
      for (const item of topGdprRequirements) {
        const rules = await GDPRRequest.getRulesByRequirement(context, from, to, filters, allowedAgentsFilter, item, pattern);
        printer.addContentWithNewLine({
          text: `Requirement ${item}`,
          style: 'h3'
        });
        if (_gdprRequirementsPdfmake.default && _gdprRequirementsPdfmake.default[item]) {
          const content = typeof _gdprRequirementsPdfmake.default[item] === 'string' ? {
            text: _gdprRequirementsPdfmake.default[item],
            style: 'standard'
          } : _gdprRequirementsPdfmake.default[item];
          printer.addContentWithNewLine(content);
        }
        rules && rules.length && printer.addSimpleTable({
          columns: [{
            id: 'ruleID',
            label: 'Rule ID'
          }, {
            id: 'ruleDescription',
            label: 'Description'
          }],
          items: rules,
          title: `Top rules for ${item} requirement`
        });
      }
      printer.addNewLine();
    }

    //--- OVERVIEW - AUDIT
    if (section === 'overview' && tab === 'audit') {
      printer.logger.debug('Fetching agents with high number of failed sudo commands');
      const auditAgentsNonSuccess = await AuditRequest.getTop3AgentsSudoNonSuccessful(context, from, to, filters, allowedAgentsFilter, pattern);
      if (auditAgentsNonSuccess && auditAgentsNonSuccess.length) {
        printer.addContent({
          text: 'Agents with high number of failed sudo commands',
          style: 'h2'
        });
        await buildAgentsTable(context, printer, auditAgentsNonSuccess, apiId);
      }
      const auditAgentsFailedSyscall = await AuditRequest.getTop3AgentsFailedSyscalls(context, from, to, filters, allowedAgentsFilter, pattern);
      if (auditAgentsFailedSyscall && auditAgentsFailedSyscall.length) {
        printer.addSimpleTable({
          columns: [{
            id: 'agent',
            label: 'Agent ID'
          }, {
            id: 'syscall_id',
            label: 'Syscall ID'
          }, {
            id: 'syscall_syscall',
            label: 'Syscall'
          }],
          items: auditAgentsFailedSyscall.map(item => ({
            agent: item.agent,
            syscall_id: item.syscall.id,
            syscall_syscall: item.syscall.syscall
          })),
          title: {
            text: 'Most common failing syscalls',
            style: 'h2'
          }
        });
      }
    }

    //--- OVERVIEW - FIM
    if (section === 'overview' && tab === 'fim') {
      printer.logger.debug('Fetching top 3 rules for FIM');
      const rules = await SyscheckRequest.top3Rules(context, from, to, filters, allowedAgentsFilter, pattern);
      if (rules && rules.length) {
        printer.addContentWithNewLine({
          text: 'Top 3 FIM rules',
          style: 'h2'
        }).addSimpleTable({
          columns: [{
            id: 'ruleID',
            label: 'Rule ID'
          }, {
            id: 'ruleDescription',
            label: 'Description'
          }],
          items: rules,
          title: {
            text: 'Top 3 rules that are generating most alerts.',
            style: 'standard'
          }
        });
      }
      printer.logger.debug('Fetching top 3 agents for FIM');
      const agents = await SyscheckRequest.top3agents(context, from, to, filters, allowedAgentsFilter, pattern);
      if (agents && agents.length) {
        printer.addContentWithNewLine({
          text: 'Agents with suspicious FIM activity',
          style: 'h2'
        });
        printer.addContentWithNewLine({
          text: 'Top 3 agents that have most FIM alerts from level 7 to level 15. Take care about them.',
          style: 'standard'
        });
        await buildAgentsTable(context, printer, agents, apiId);
      }
    }

    //--- AGENTS - AUDIT
    if (section === 'agents' && tab === 'audit') {
      printer.logger.debug('Fetching most common failed syscalls');
      const auditFailedSyscall = await AuditRequest.getTopFailedSyscalls(context, from, to, filters, allowedAgentsFilter, pattern);
      auditFailedSyscall && auditFailedSyscall.length && printer.addSimpleTable({
        columns: [{
          id: 'id',
          label: 'id'
        }, {
          id: 'syscall',
          label: 'Syscall'
        }],
        items: auditFailedSyscall,
        title: 'Most common failing syscalls'
      });
    }

    //--- AGENTS - FIM
    if (section === 'agents' && tab === 'fim') {
      printer.logger.debug(`Fetching syscheck database for agent ${agent}`);
      const lastScanResponse = await context.wazuh.api.client.asCurrentUser.request('GET', `/syscheck/${agent}/last_scan`, {}, {
        apiHostID: apiId
      });
      if (lastScanResponse && lastScanResponse.data) {
        const lastScanData = lastScanResponse.data.data.affected_items[0];
        if (lastScanData.start && lastScanData.end) {
          printer.addContent({
            text: `Last file integrity monitoring scan was executed from ${lastScanData.start} to ${lastScanData.end}.`
          });
        } else if (lastScanData.start) {
          printer.addContent({
            text: `File integrity monitoring scan is currently in progress for this agent (started on ${lastScanData.start}).`
          });
        } else {
          printer.addContent({
            text: `File integrity monitoring scan is currently in progress for this agent.`
          });
        }
        printer.addNewLine();
      }
      printer.logger.debug('Fetching last 10 deleted files for FIM');
      const lastTenDeleted = await SyscheckRequest.lastTenDeletedFiles(context, from, to, filters, allowedAgentsFilter, pattern);
      lastTenDeleted && lastTenDeleted.length && printer.addSimpleTable({
        columns: [{
          id: 'path',
          label: 'Path'
        }, {
          id: 'date',
          label: 'Date'
        }],
        items: lastTenDeleted,
        title: 'Last 10 deleted files'
      });
      printer.logger.debug('Fetching last 10 modified files');
      const lastTenModified = await SyscheckRequest.lastTenModifiedFiles(context, from, to, filters, allowedAgentsFilter, pattern);
      lastTenModified && lastTenModified.length && printer.addSimpleTable({
        columns: [{
          id: 'path',
          label: 'Path'
        }, {
          id: 'date',
          label: 'Date'
        }],
        items: lastTenModified,
        title: 'Last 10 modified files'
      });
    }

    //--- AGENTS - SYSCOLLECTOR
    if (section === 'agents' && tab === 'syscollector') {
      printer.logger.debug(`Fetching hardware information for agent ${agent}`);
      const requestsSyscollectorLists = [{
        endpoint: `/syscollector/${agent}/hardware`,
        loggerMessage: `Fetching Hardware information for agent ${agent}`,
        list: {
          title: {
            text: 'Hardware information',
            style: 'h2'
          }
        },
        mapResponse: hardware => [hardware.cpu && hardware.cpu.cores && `${hardware.cpu.cores} cores`, hardware.cpu && hardware.cpu.name, hardware.ram && hardware.ram.total && `${Number(hardware.ram.total / 1024 / 1024).toFixed(2)}GB RAM`]
      }, {
        endpoint: `/syscollector/${agent}/os`,
        loggerMessage: `Fetching operating system information for agent ${agent}`,
        list: {
          title: {
            text: 'Operating system information',
            style: 'h2'
          }
        },
        mapResponse: osData => [osData.sysname, osData.version, osData.architecture, osData.release, osData.os && osData.os.name && osData.os.version && `${osData.os.name} ${osData.os.version}`]
      }];
      const syscollectorLists = await Promise.all(requestsSyscollectorLists.map(async requestSyscollector => {
        try {
          printer.logger.debug(requestSyscollector.loggerMessage);
          const responseSyscollector = await context.wazuh.api.client.asCurrentUser.request('GET', requestSyscollector.endpoint, {}, {
            apiHostID: apiId
          });
          const [data] = responseSyscollector && responseSyscollector.data && responseSyscollector.data.data && responseSyscollector.data.data.affected_items || [];
          if (data) {
            return {
              ...requestSyscollector.list,
              list: requestSyscollector.mapResponse(data)
            };
          }
        } catch (error) {
          printer.logger.error(error.message || error);
        }
      }));
      if (syscollectorLists) {
        syscollectorLists.filter(syscollectorList => syscollectorList).forEach(syscollectorList => printer.addList(syscollectorList));
      }
      const vulnerabilitiesRequests = ['Critical', 'High'];
      const vulnerabilitiesResponsesItems = (await Promise.all(vulnerabilitiesRequests.map(async vulnerabilitiesLevel => {
        try {
          printer.logger.debug(`Fetching top ${vulnerabilitiesLevel} packages`);
          return await VulnerabilityRequest.topPackages(context, from, to, vulnerabilitiesLevel, filters, allowedAgentsFilter, pattern);
        } catch (error) {
          printer.logger.error(error.message || error);
        }
      }))).filter(vulnerabilitiesResponse => vulnerabilitiesResponse).flat();
      if (vulnerabilitiesResponsesItems && vulnerabilitiesResponsesItems.length) {
        printer.addSimpleTable({
          title: {
            text: 'Vulnerable packages found (last 24 hours)',
            style: 'h2'
          },
          columns: [{
            id: 'package',
            label: 'Package'
          }, {
            id: 'severity',
            label: 'Severity'
          }],
          items: vulnerabilitiesResponsesItems
        });
      }
    }

    //--- AGENTS - VULNERABILITIES
    if (section === 'agents' && tab === 'vuls') {
      const topCriticalPackages = await VulnerabilityRequest.topPackagesWithCVE(context, from, to, 'Critical', filters, allowedAgentsFilter, pattern);
      if (topCriticalPackages && topCriticalPackages.length) {
        printer.addContentWithNewLine({
          text: 'Critical severity',
          style: 'h2'
        });
        printer.addContentWithNewLine({
          text: 'These vulnerabilties are critical, please review your agent. Click on each link to read more about each found vulnerability.',
          style: 'standard'
        });
        const customul = [];
        for (const critical of topCriticalPackages) {
          customul.push({
            text: critical.package,
            style: 'standard'
          });
          customul.push({
            ul: critical.references.map(item => ({
              text: item.substring(0, 80) + '...',
              link: item,
              color: '#1EA5C8'
            }))
          });
        }
        printer.addContentWithNewLine({
          ul: customul
        });
      }
      const topHighPackages = await VulnerabilityRequest.topPackagesWithCVE(context, from, to, 'High', filters, allowedAgentsFilter, pattern);
      if (topHighPackages && topHighPackages.length) {
        printer.addContentWithNewLine({
          text: 'High severity',
          style: 'h2'
        });
        printer.addContentWithNewLine({
          text: 'Click on each link to read more about each found vulnerability.',
          style: 'standard'
        });
        const customul = [];
        for (const critical of topHighPackages) {
          customul.push({
            text: critical.package,
            style: 'standard'
          });
          customul.push({
            ul: critical.references.map(item => ({
              text: item,
              color: '#1EA5C8'
            }))
          });
        }
        customul && customul.length && printer.addContent({
          ul: customul
        });
        printer.addNewLine();
      }
    }

    //--- SUMMARY TABLES
    let extraSummaryTables = [];
    if (Array.isArray(_summaryTablesDefinitions.default[section][tab])) {
      const tablesPromises = _summaryTablesDefinitions.default[section][tab].map(summaryTable => {
        printer.logger.debug(`Fetching ${summaryTable.title} Table`);
        const alertsSummaryTable = new _summaryTable.default(context, from, to, filters, allowedAgentsFilter, summaryTable, pattern);
        return alertsSummaryTable.fetch();
      });
      extraSummaryTables = await Promise.all(tablesPromises);
    }
    return extraSummaryTables;
  } catch (error) {
    printer.logger.error(error.message || error);
    return Promise.reject(error);
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfc3VtbWFyeVRhYmxlIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfc3VtbWFyeVRhYmxlc0RlZmluaXRpb25zIiwiVnVsbmVyYWJpbGl0eVJlcXVlc3QiLCJfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCIsIk92ZXJ2aWV3UmVxdWVzdCIsIlJvb3RjaGVja1JlcXVlc3QiLCJQQ0lSZXF1ZXN0IiwiR0RQUlJlcXVlc3QiLCJUU0NSZXF1ZXN0IiwiQXVkaXRSZXF1ZXN0IiwiU3lzY2hlY2tSZXF1ZXN0IiwiX3BjaVJlcXVpcmVtZW50c1BkZm1ha2UiLCJfZ2RwclJlcXVpcmVtZW50c1BkZm1ha2UiLCJfdHNjUmVxdWlyZW1lbnRzUGRmbWFrZSIsIl9tb21lbnQiLCJfZ2V0UmVxdWlyZVdpbGRjYXJkQ2FjaGUiLCJlIiwiV2Vha01hcCIsInIiLCJ0IiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJoYXMiLCJnZXQiLCJuIiwiX19wcm90b19fIiwiYSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yIiwidSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsImkiLCJzZXQiLCJvYmoiLCJidWlsZEFnZW50c1RhYmxlIiwiY29udGV4dCIsInByaW50ZXIiLCJhZ2VudElEcyIsImFwaUlkIiwiZ3JvdXBJRCIsImRhdGVGb3JtYXQiLCJjb3JlIiwidWlTZXR0aW5ncyIsImNsaWVudCIsImxlbmd0aCIsImxvZ2dlciIsImRlYnVnIiwiYWdlbnRzRGF0YSIsInRvdGFsQWdlbnRzSW5Hcm91cCIsImRhdGEiLCJhZmZlY3RlZF9pdGVtcyIsInRvdGFsX2FmZmVjdGVkX2l0ZW1zIiwid2F6dWgiLCJhcGkiLCJhc0N1cnJlbnRVc2VyIiwicmVxdWVzdCIsInBhcmFtcyIsIm9mZnNldCIsInNlbGVjdCIsImFwaUhvc3RJRCIsImFnZW50SUQiLCJhZ2VudCIsInEiLCJwdXNoIiwiZXJyb3IiLCJtZXNzYWdlIiwiYWRkU2ltcGxlVGFibGUiLCJjb2x1bW5zIiwiaWQiLCJsYWJlbCIsIml0ZW1zIiwiZmlsdGVyIiwibWFwIiwib3MiLCJuYW1lIiwidmVyc2lvbiIsImxhc3RLZWVwQWxpdmUiLCJtb21lbnQiLCJmb3JtYXQiLCJkYXRlQWRkIiwiYWRkQ29udGVudCIsInRleHQiLCJzdHlsZSIsImZvbnRTaXplIiwiY29sb3IiLCJQcm9taXNlIiwicmVqZWN0IiwiZXh0ZW5kZWRJbmZvcm1hdGlvbiIsInNlY3Rpb24iLCJ0YWIiLCJmcm9tIiwidG8iLCJmaWx0ZXJzIiwiYWxsb3dlZEFnZW50c0ZpbHRlciIsInBhdHRlcm4iLCJKU09OIiwic3RyaW5naWZ5IiwiRXJyb3IiLCJhZ2VudHMiLCJsaW1pdCIsInRvdGFsQWdlbnRzIiwidnVsbmVyYWJpbGl0aWVzTGV2ZWxzIiwidnVsbmVyYWJpbGl0aWVzUmVzcG9uc2VzQ291bnQiLCJhbGwiLCJ2dWxuZXJhYmlsaXRpZXNMZXZlbCIsImNvdW50IiwidW5pcXVlU2V2ZXJpdHlDb3VudCIsInRvTG9jYWxlTG93ZXJDYXNlIiwidW5kZWZpbmVkIiwidnVsbmVyYWJpbGl0aWVzUmVzcG9uc2UiLCJhZGRMaXN0IiwidGl0bGUiLCJsaXN0IiwibG93UmFuayIsInRvcEFnZW50Q291bnQiLCJtZWRpdW1SYW5rIiwiaGlnaFJhbmsiLCJjcml0aWNhbFJhbmsiLCJhZGRDb250ZW50V2l0aE5ld0xpbmUiLCJhZGROZXdMaW5lIiwiY3ZlUmFuayIsInRvcENWRUNvdW50IiwiaXRlbSIsInRvcCIsImluZGV4T2YiLCJjdmUiLCJsZXZlbDE1UmFuayIsInRvcExldmVsMTUiLCJ0b3A1Um9vdGtpdHNSYW5rIiwidG9wNVJvb3RraXRzRGV0ZWN0ZWQiLCJoaWRkZW5QaWRzIiwiYWdlbnRzV2l0aEhpZGRlblBpZHMiLCJoaWRkZW5Qb3J0cyIsImFnZW50c1dpdGhIaWRkZW5Qb3J0cyIsImluY2x1ZGVzIiwidG9wUGNpUmVxdWlyZW1lbnRzIiwidG9wUENJUmVxdWlyZW1lbnRzIiwicnVsZXMiLCJnZXRSdWxlc0J5UmVxdWlyZW1lbnQiLCJQQ0kiLCJjb250ZW50IiwidG9wVFNDUmVxdWlyZW1lbnRzIiwiVFNDIiwidG9wR2RwclJlcXVpcmVtZW50cyIsInRvcEdEUFJSZXF1aXJlbWVudHMiLCJHRFBSIiwiYXVkaXRBZ2VudHNOb25TdWNjZXNzIiwiZ2V0VG9wM0FnZW50c1N1ZG9Ob25TdWNjZXNzZnVsIiwiYXVkaXRBZ2VudHNGYWlsZWRTeXNjYWxsIiwiZ2V0VG9wM0FnZW50c0ZhaWxlZFN5c2NhbGxzIiwic3lzY2FsbF9pZCIsInN5c2NhbGwiLCJzeXNjYWxsX3N5c2NhbGwiLCJ0b3AzUnVsZXMiLCJ0b3AzYWdlbnRzIiwiYXVkaXRGYWlsZWRTeXNjYWxsIiwiZ2V0VG9wRmFpbGVkU3lzY2FsbHMiLCJsYXN0U2NhblJlc3BvbnNlIiwibGFzdFNjYW5EYXRhIiwic3RhcnQiLCJlbmQiLCJsYXN0VGVuRGVsZXRlZCIsImxhc3RUZW5EZWxldGVkRmlsZXMiLCJsYXN0VGVuTW9kaWZpZWQiLCJsYXN0VGVuTW9kaWZpZWRGaWxlcyIsInJlcXVlc3RzU3lzY29sbGVjdG9yTGlzdHMiLCJlbmRwb2ludCIsImxvZ2dlck1lc3NhZ2UiLCJtYXBSZXNwb25zZSIsImhhcmR3YXJlIiwiY3B1IiwiY29yZXMiLCJyYW0iLCJ0b3RhbCIsIk51bWJlciIsInRvRml4ZWQiLCJvc0RhdGEiLCJzeXNuYW1lIiwiYXJjaGl0ZWN0dXJlIiwicmVsZWFzZSIsInN5c2NvbGxlY3Rvckxpc3RzIiwicmVxdWVzdFN5c2NvbGxlY3RvciIsInJlc3BvbnNlU3lzY29sbGVjdG9yIiwic3lzY29sbGVjdG9yTGlzdCIsImZvckVhY2giLCJ2dWxuZXJhYmlsaXRpZXNSZXF1ZXN0cyIsInZ1bG5lcmFiaWxpdGllc1Jlc3BvbnNlc0l0ZW1zIiwidG9wUGFja2FnZXMiLCJmbGF0IiwidG9wQ3JpdGljYWxQYWNrYWdlcyIsInRvcFBhY2thZ2VzV2l0aENWRSIsImN1c3RvbXVsIiwiY3JpdGljYWwiLCJwYWNrYWdlIiwidWwiLCJyZWZlcmVuY2VzIiwic3Vic3RyaW5nIiwibGluayIsInRvcEhpZ2hQYWNrYWdlcyIsImV4dHJhU3VtbWFyeVRhYmxlcyIsIkFycmF5IiwiaXNBcnJheSIsInN1bW1hcnlUYWJsZXNEZWZpbml0aW9ucyIsInRhYmxlc1Byb21pc2VzIiwic3VtbWFyeVRhYmxlIiwiYWxlcnRzU3VtbWFyeVRhYmxlIiwiU3VtbWFyeVRhYmxlIiwiZmV0Y2giXSwic291cmNlcyI6WyJleHRlbmRlZC1pbmZvcm1hdGlvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgU3VtbWFyeVRhYmxlIGZyb20gJy4vc3VtbWFyeS10YWJsZSc7XG5pbXBvcnQgc3VtbWFyeVRhYmxlc0RlZmluaXRpb25zIGZyb20gJy4vc3VtbWFyeS10YWJsZXMtZGVmaW5pdGlvbnMnO1xuaW1wb3J0ICogYXMgVnVsbmVyYWJpbGl0eVJlcXVlc3QgZnJvbSAnLi92dWxuZXJhYmlsaXR5LXJlcXVlc3QnO1xuaW1wb3J0ICogYXMgT3ZlcnZpZXdSZXF1ZXN0IGZyb20gJy4vb3ZlcnZpZXctcmVxdWVzdCc7XG5pbXBvcnQgKiBhcyBSb290Y2hlY2tSZXF1ZXN0IGZyb20gJy4vcm9vdGNoZWNrLXJlcXVlc3QnO1xuaW1wb3J0ICogYXMgUENJUmVxdWVzdCBmcm9tICcuL3BjaS1yZXF1ZXN0JztcbmltcG9ydCAqIGFzIEdEUFJSZXF1ZXN0IGZyb20gJy4vZ2Rwci1yZXF1ZXN0JztcbmltcG9ydCAqIGFzIFRTQ1JlcXVlc3QgZnJvbSAnLi90c2MtcmVxdWVzdCc7XG5pbXBvcnQgKiBhcyBBdWRpdFJlcXVlc3QgZnJvbSAnLi9hdWRpdC1yZXF1ZXN0JztcbmltcG9ydCAqIGFzIFN5c2NoZWNrUmVxdWVzdCBmcm9tICcuL3N5c2NoZWNrLXJlcXVlc3QnO1xuaW1wb3J0IFBDSSBmcm9tICcuLi8uLi9pbnRlZ3JhdGlvbi1maWxlcy9wY2ktcmVxdWlyZW1lbnRzLXBkZm1ha2UnO1xuaW1wb3J0IEdEUFIgZnJvbSAnLi4vLi4vaW50ZWdyYXRpb24tZmlsZXMvZ2Rwci1yZXF1aXJlbWVudHMtcGRmbWFrZSc7XG5pbXBvcnQgVFNDIGZyb20gJy4uLy4uL2ludGVncmF0aW9uLWZpbGVzL3RzYy1yZXF1aXJlbWVudHMtcGRmbWFrZSc7XG5pbXBvcnQgeyBSZXBvcnRQcmludGVyIH0gZnJvbSAnLi9wcmludGVyJztcbmltcG9ydCBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuLyoqXG4gKiBUaGlzIGJ1aWxkIHRoZSBhZ2VudHMgdGFibGVcbiAqIEBwYXJhbSB7QXJyYXk8U3RyaW5ncz59IGlkcyBpZHMgb2YgYWdlbnRzXG4gKiBAcGFyYW0ge1N0cmluZ30gYXBpSWQgQVBJIGlkXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBidWlsZEFnZW50c1RhYmxlKFxuICBjb250ZXh0LFxuICBwcmludGVyOiBSZXBvcnRQcmludGVyLFxuICBhZ2VudElEczogc3RyaW5nW10sXG4gIGFwaUlkOiBzdHJpbmcsXG4gIGdyb3VwSUQ6IHN0cmluZyA9ICcnLFxuKSB7XG4gIGNvbnN0IGRhdGVGb3JtYXQgPSBhd2FpdCBjb250ZXh0LmNvcmUudWlTZXR0aW5ncy5jbGllbnQuZ2V0KCdkYXRlRm9ybWF0Jyk7XG4gIGlmICgoIWFnZW50SURzIHx8ICFhZ2VudElEcy5sZW5ndGgpICYmICFncm91cElEKSByZXR1cm47XG4gIHByaW50ZXIubG9nZ2VyLmRlYnVnKGAke2FnZW50SURzLmxlbmd0aH0gYWdlbnRzIGZvciBBUEkgJHthcGlJZH1gKTtcbiAgdHJ5IHtcbiAgICBsZXQgYWdlbnRzRGF0YSA9IFtdO1xuICAgIGlmIChncm91cElEKSB7XG4gICAgICBsZXQgdG90YWxBZ2VudHNJbkdyb3VwID0gbnVsbDtcbiAgICAgIGRvIHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIGRhdGE6IHsgYWZmZWN0ZWRfaXRlbXMsIHRvdGFsX2FmZmVjdGVkX2l0ZW1zIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSA9IGF3YWl0IGNvbnRleHQud2F6dWguYXBpLmNsaWVudC5hc0N1cnJlbnRVc2VyLnJlcXVlc3QoXG4gICAgICAgICAgJ0dFVCcsXG4gICAgICAgICAgYC9ncm91cHMvJHtncm91cElEfS9hZ2VudHNgLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICBvZmZzZXQ6IGFnZW50c0RhdGEubGVuZ3RoLFxuICAgICAgICAgICAgICBzZWxlY3Q6XG4gICAgICAgICAgICAgICAgJ2RhdGVBZGQsaWQsaXAsbGFzdEtlZXBBbGl2ZSxtYW5hZ2VyLG5hbWUsb3MubmFtZSxvcy52ZXJzaW9uLHZlcnNpb24nLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHsgYXBpSG9zdElEOiBhcGlJZCB9LFxuICAgICAgICApO1xuICAgICAgICAhdG90YWxBZ2VudHNJbkdyb3VwICYmICh0b3RhbEFnZW50c0luR3JvdXAgPSB0b3RhbF9hZmZlY3RlZF9pdGVtcyk7XG4gICAgICAgIGFnZW50c0RhdGEgPSBbLi4uYWdlbnRzRGF0YSwgLi4uYWZmZWN0ZWRfaXRlbXNdO1xuICAgICAgfSB3aGlsZSAoYWdlbnRzRGF0YS5sZW5ndGggPCB0b3RhbEFnZW50c0luR3JvdXApO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGNvbnN0IGFnZW50SUQgb2YgYWdlbnRJRHMpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBhZmZlY3RlZF9pdGVtczogW2FnZW50XSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSA9IGF3YWl0IGNvbnRleHQud2F6dWguYXBpLmNsaWVudC5hc0N1cnJlbnRVc2VyLnJlcXVlc3QoXG4gICAgICAgICAgICAnR0VUJyxcbiAgICAgICAgICAgIGAvYWdlbnRzYCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcGFyYW1zOiB7XG4gICAgICAgICAgICAgICAgcTogYGlkPSR7YWdlbnRJRH1gLFxuICAgICAgICAgICAgICAgIHNlbGVjdDpcbiAgICAgICAgICAgICAgICAgICdkYXRlQWRkLGlkLGlwLGxhc3RLZWVwQWxpdmUsbWFuYWdlcixuYW1lLG9zLm5hbWUsb3MudmVyc2lvbix2ZXJzaW9uJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IGFwaUhvc3RJRDogYXBpSWQgfSxcbiAgICAgICAgICApO1xuICAgICAgICAgIGFnZW50c0RhdGEucHVzaChhZ2VudCk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgcHJpbnRlci5sb2dnZXIuZGVidWcoYFNraXAgYWdlbnQgZHVlIHRvOiAke2Vycm9yLm1lc3NhZ2UgfHwgZXJyb3J9YCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYWdlbnRzRGF0YS5sZW5ndGgpIHtcbiAgICAgIC8vIFByaW50IGEgdGFibGUgd2l0aCBhZ2VudC9zIGluZm9ybWF0aW9uXG4gICAgICBwcmludGVyLmFkZFNpbXBsZVRhYmxlKHtcbiAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgIHsgaWQ6ICdpZCcsIGxhYmVsOiAnSUQnIH0sXG4gICAgICAgICAgeyBpZDogJ25hbWUnLCBsYWJlbDogJ05hbWUnIH0sXG4gICAgICAgICAgeyBpZDogJ2lwJywgbGFiZWw6ICdJUCBhZGRyZXNzJyB9LFxuICAgICAgICAgIHsgaWQ6ICd2ZXJzaW9uJywgbGFiZWw6ICdWZXJzaW9uJyB9LFxuICAgICAgICAgIHsgaWQ6ICdtYW5hZ2VyJywgbGFiZWw6ICdNYW5hZ2VyJyB9LFxuICAgICAgICAgIHsgaWQ6ICdvcycsIGxhYmVsOiAnT3BlcmF0aW5nIHN5c3RlbScgfSxcbiAgICAgICAgICB7IGlkOiAnZGF0ZUFkZCcsIGxhYmVsOiAnUmVnaXN0cmF0aW9uIGRhdGUnIH0sXG4gICAgICAgICAgeyBpZDogJ2xhc3RLZWVwQWxpdmUnLCBsYWJlbDogJ0xhc3Qga2VlcCBhbGl2ZScgfSxcbiAgICAgICAgXSxcbiAgICAgICAgaXRlbXM6IGFnZW50c0RhdGFcbiAgICAgICAgICAuZmlsdGVyKGFnZW50ID0+IGFnZW50KSAvLyBSZW1vdmUgdW5kZWZpbmVkIGFnZW50cyB3aGVuIFdhenVoIEFQSSBubyBsb25nZXIgZmluZHMgYW5kIGFnZW50SURcbiAgICAgICAgICAubWFwKGFnZW50ID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLmFnZW50LFxuICAgICAgICAgICAgICBvczpcbiAgICAgICAgICAgICAgICBhZ2VudC5vcyAmJiBhZ2VudC5vcy5uYW1lICYmIGFnZW50Lm9zLnZlcnNpb25cbiAgICAgICAgICAgICAgICAgID8gYCR7YWdlbnQub3MubmFtZX0gJHthZ2VudC5vcy52ZXJzaW9ufWBcbiAgICAgICAgICAgICAgICAgIDogJycsXG4gICAgICAgICAgICAgIGxhc3RLZWVwQWxpdmU6IG1vbWVudChhZ2VudC5sYXN0S2VlcEFsaXZlKS5mb3JtYXQoZGF0ZUZvcm1hdCksXG4gICAgICAgICAgICAgIGRhdGVBZGQ6IG1vbWVudChhZ2VudC5kYXRlQWRkKS5mb3JtYXQoZGF0ZUZvcm1hdCksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICghYWdlbnRzRGF0YS5sZW5ndGggJiYgZ3JvdXBJRCkge1xuICAgICAgLy8gRm9yIGdyb3VwIHJlcG9ydHMgd2hlbiB0aGVyZSBpcyBubyBhZ2VudHMgaW4gdGhlIGdyb3VwXG4gICAgICBwcmludGVyLmFkZENvbnRlbnQoe1xuICAgICAgICB0ZXh0OiAnVGhlcmUgYXJlIG5vIGFnZW50cyBpbiB0aGlzIGdyb3VwLicsXG4gICAgICAgIHN0eWxlOiB7IGZvbnRTaXplOiAxMiwgY29sb3I6ICcjMDAwJyB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHByaW50ZXIubG9nZ2VyLmVycm9yKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGlzIGxvYWQgbW9yZSBpbmZvcm1hdGlvblxuICogQHBhcmFtIHsqfSBjb250ZXh0IEVuZHBvaW50IGNvbnRleHRcbiAqIEBwYXJhbSB7Kn0gcHJpbnRlciBwcmludGVyIGluc3RhbmNlXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VjdGlvbiBzZWN0aW9uIHRhcmdldFxuICogQHBhcmFtIHtPYmplY3R9IHRhYiB0YWIgdGFyZ2V0XG4gKiBAcGFyYW0ge1N0cmluZ30gYXBpSWQgSUQgb2YgQVBJXG4gKiBAcGFyYW0ge051bWJlcn0gZnJvbSBUaW1lc3RhbXAgKG1zKSBmcm9tXG4gKiBAcGFyYW0ge051bWJlcn0gdG8gVGltZXN0YW1wIChtcykgdG9cbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWx0ZXJzIEUuZzogY2x1c3Rlci5uYW1lOiB3YXp1aCBBTkQgcnVsZS5ncm91cHM6IHZ1bG5lcmFiaWxpdHlcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXR0ZXJuXG4gKiBAcGFyYW0ge09iamVjdH0gYWdlbnQgYWdlbnQgdGFyZ2V0XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBFeHRlbmRlZCBpbmZvcm1hdGlvblxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZXh0ZW5kZWRJbmZvcm1hdGlvbihcbiAgY29udGV4dCxcbiAgcHJpbnRlcixcbiAgc2VjdGlvbixcbiAgdGFiLFxuICBhcGlJZCxcbiAgZnJvbSxcbiAgdG8sXG4gIGZpbHRlcnMsXG4gIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gIHBhdHRlcm4sXG4gIGFnZW50ID0gbnVsbCxcbikge1xuICB0cnkge1xuICAgIHByaW50ZXIubG9nZ2VyLmRlYnVnKFxuICAgICAgYFNlY3Rpb24gJHtzZWN0aW9ufSBhbmQgdGFiICR7dGFifSwgQVBJIGlzICR7YXBpSWR9LiBGcm9tICR7ZnJvbX0gdG8gJHt0b30uIEZpbHRlcnMgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgZmlsdGVycyxcbiAgICAgICl9LiBJbmRleCBwYXR0ZXJuICR7cGF0dGVybn1gLFxuICAgICk7XG4gICAgaWYgKHNlY3Rpb24gPT09ICdhZ2VudHMnICYmICFhZ2VudCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnUmVwb3J0aW5nIGZvciBzcGVjaWZpYyBhZ2VudCBuZWVkcyBhbiBhZ2VudCBJRCBpbiBvcmRlciB0byB3b3JrIHByb3Blcmx5JyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgYWdlbnRzID0gYXdhaXQgY29udGV4dC53YXp1aC5hcGkuY2xpZW50LmFzQ3VycmVudFVzZXIucmVxdWVzdChcbiAgICAgICdHRVQnLFxuICAgICAgJy9hZ2VudHMnLFxuICAgICAgeyBwYXJhbXM6IHsgbGltaXQ6IDEgfSB9LFxuICAgICAgeyBhcGlIb3N0SUQ6IGFwaUlkIH0sXG4gICAgKTtcblxuICAgIGNvbnN0IHRvdGFsQWdlbnRzID0gYWdlbnRzLmRhdGEuZGF0YS50b3RhbF9hZmZlY3RlZF9pdGVtcztcblxuICAgIC8vLS0tIE9WRVJWSUVXIC0gVlVMU1xuICAgIGlmIChzZWN0aW9uID09PSAnb3ZlcnZpZXcnICYmIHRhYiA9PT0gJ3Z1bHMnKSB7XG4gICAgICBwcmludGVyLmxvZ2dlci5kZWJ1ZygnRmV0Y2hpbmcgb3ZlcnZpZXcgdnVsbmVyYWJpbGl0eSBkZXRlY3RvciBtZXRyaWNzJyk7XG4gICAgICBjb25zdCB2dWxuZXJhYmlsaXRpZXNMZXZlbHMgPSBbJ0xvdycsICdNZWRpdW0nLCAnSGlnaCcsICdDcml0aWNhbCddO1xuXG4gICAgICBjb25zdCB2dWxuZXJhYmlsaXRpZXNSZXNwb25zZXNDb3VudCA9IChcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgdnVsbmVyYWJpbGl0aWVzTGV2ZWxzLm1hcChhc3luYyB2dWxuZXJhYmlsaXRpZXNMZXZlbCA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25zdCBjb3VudCA9IGF3YWl0IFZ1bG5lcmFiaWxpdHlSZXF1ZXN0LnVuaXF1ZVNldmVyaXR5Q291bnQoXG4gICAgICAgICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgICAgIHRvLFxuICAgICAgICAgICAgICAgIHZ1bG5lcmFiaWxpdGllc0xldmVsLFxuICAgICAgICAgICAgICAgIGZpbHRlcnMsXG4gICAgICAgICAgICAgICAgYWxsb3dlZEFnZW50c0ZpbHRlcixcbiAgICAgICAgICAgICAgICBwYXR0ZXJuLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICByZXR1cm4gY291bnRcbiAgICAgICAgICAgICAgICA/IGAke2NvdW50fSBvZiAke3RvdGFsQWdlbnRzfSBhZ2VudHMgaGF2ZSAke3Z1bG5lcmFiaWxpdGllc0xldmVsLnRvTG9jYWxlTG93ZXJDYXNlKCl9IHZ1bG5lcmFiaWxpdGllcy5gXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge31cbiAgICAgICAgICB9KSxcbiAgICAgICAgKVxuICAgICAgKS5maWx0ZXIodnVsbmVyYWJpbGl0aWVzUmVzcG9uc2UgPT4gdnVsbmVyYWJpbGl0aWVzUmVzcG9uc2UpO1xuXG4gICAgICBwcmludGVyLmFkZExpc3Qoe1xuICAgICAgICB0aXRsZTogeyB0ZXh0OiAnU3VtbWFyeScsIHN0eWxlOiAnaDInIH0sXG4gICAgICAgIGxpc3Q6IHZ1bG5lcmFiaWxpdGllc1Jlc3BvbnNlc0NvdW50LFxuICAgICAgfSk7XG5cbiAgICAgIHByaW50ZXIubG9nZ2VyLmRlYnVnKFxuICAgICAgICAnRmV0Y2hpbmcgb3ZlcnZpZXcgdnVsbmVyYWJpbGl0eSBkZXRlY3RvciB0b3AgMyBhZ2VudHMgYnkgY2F0ZWdvcnknLFxuICAgICAgKTtcbiAgICAgIGNvbnN0IGxvd1JhbmsgPSBhd2FpdCBWdWxuZXJhYmlsaXR5UmVxdWVzdC50b3BBZ2VudENvdW50KFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBmcm9tLFxuICAgICAgICB0byxcbiAgICAgICAgJ0xvdycsXG4gICAgICAgIGZpbHRlcnMsXG4gICAgICAgIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gICAgICAgIHBhdHRlcm4sXG4gICAgICApO1xuICAgICAgY29uc3QgbWVkaXVtUmFuayA9IGF3YWl0IFZ1bG5lcmFiaWxpdHlSZXF1ZXN0LnRvcEFnZW50Q291bnQoXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGZyb20sXG4gICAgICAgIHRvLFxuICAgICAgICAnTWVkaXVtJyxcbiAgICAgICAgZmlsdGVycyxcbiAgICAgICAgYWxsb3dlZEFnZW50c0ZpbHRlcixcbiAgICAgICAgcGF0dGVybixcbiAgICAgICk7XG4gICAgICBjb25zdCBoaWdoUmFuayA9IGF3YWl0IFZ1bG5lcmFiaWxpdHlSZXF1ZXN0LnRvcEFnZW50Q291bnQoXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGZyb20sXG4gICAgICAgIHRvLFxuICAgICAgICAnSGlnaCcsXG4gICAgICAgIGZpbHRlcnMsXG4gICAgICAgIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gICAgICAgIHBhdHRlcm4sXG4gICAgICApO1xuICAgICAgY29uc3QgY3JpdGljYWxSYW5rID0gYXdhaXQgVnVsbmVyYWJpbGl0eVJlcXVlc3QudG9wQWdlbnRDb3VudChcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgZnJvbSxcbiAgICAgICAgdG8sXG4gICAgICAgICdDcml0aWNhbCcsXG4gICAgICAgIGZpbHRlcnMsXG4gICAgICAgIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gICAgICAgIHBhdHRlcm4sXG4gICAgICApO1xuICAgICAgcHJpbnRlci5sb2dnZXIuZGVidWcoXG4gICAgICAgICdBZGRpbmcgb3ZlcnZpZXcgdnVsbmVyYWJpbGl0eSBkZXRlY3RvciB0b3AgMyBhZ2VudHMgYnkgY2F0ZWdvcnknLFxuICAgICAgKTtcbiAgICAgIGlmIChjcml0aWNhbFJhbmsgJiYgY3JpdGljYWxSYW5rLmxlbmd0aCkge1xuICAgICAgICBwcmludGVyLmFkZENvbnRlbnRXaXRoTmV3TGluZSh7XG4gICAgICAgICAgdGV4dDogJ1RvcCAzIGFnZW50cyB3aXRoIGNyaXRpY2FsIHNldmVyaXR5IHZ1bG5lcmFiaWxpdGllcycsXG4gICAgICAgICAgc3R5bGU6ICdoMycsXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCBidWlsZEFnZW50c1RhYmxlKGNvbnRleHQsIHByaW50ZXIsIGNyaXRpY2FsUmFuaywgYXBpSWQpO1xuICAgICAgICBwcmludGVyLmFkZE5ld0xpbmUoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGhpZ2hSYW5rICYmIGhpZ2hSYW5rLmxlbmd0aCkge1xuICAgICAgICBwcmludGVyLmFkZENvbnRlbnRXaXRoTmV3TGluZSh7XG4gICAgICAgICAgdGV4dDogJ1RvcCAzIGFnZW50cyB3aXRoIGhpZ2ggc2V2ZXJpdHkgdnVsbmVyYWJpbGl0aWVzJyxcbiAgICAgICAgICBzdHlsZTogJ2gzJyxcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IGJ1aWxkQWdlbnRzVGFibGUoY29udGV4dCwgcHJpbnRlciwgaGlnaFJhbmssIGFwaUlkKTtcbiAgICAgICAgcHJpbnRlci5hZGROZXdMaW5lKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpdW1SYW5rICYmIG1lZGl1bVJhbmsubGVuZ3RoKSB7XG4gICAgICAgIHByaW50ZXIuYWRkQ29udGVudFdpdGhOZXdMaW5lKHtcbiAgICAgICAgICB0ZXh0OiAnVG9wIDMgYWdlbnRzIHdpdGggbWVkaXVtIHNldmVyaXR5IHZ1bG5lcmFiaWxpdGllcycsXG4gICAgICAgICAgc3R5bGU6ICdoMycsXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCBidWlsZEFnZW50c1RhYmxlKGNvbnRleHQsIHByaW50ZXIsIG1lZGl1bVJhbmssIGFwaUlkKTtcbiAgICAgICAgcHJpbnRlci5hZGROZXdMaW5lKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChsb3dSYW5rICYmIGxvd1JhbmsubGVuZ3RoKSB7XG4gICAgICAgIHByaW50ZXIuYWRkQ29udGVudFdpdGhOZXdMaW5lKHtcbiAgICAgICAgICB0ZXh0OiAnVG9wIDMgYWdlbnRzIHdpdGggbG93IHNldmVyaXR5IHZ1bG5lcmFiaWxpdGllcycsXG4gICAgICAgICAgc3R5bGU6ICdoMycsXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCBidWlsZEFnZW50c1RhYmxlKGNvbnRleHQsIHByaW50ZXIsIGxvd1JhbmssIGFwaUlkKTtcbiAgICAgICAgcHJpbnRlci5hZGROZXdMaW5lKCk7XG4gICAgICB9XG5cbiAgICAgIHByaW50ZXIubG9nZ2VyLmRlYnVnKFxuICAgICAgICAnRmV0Y2hpbmcgb3ZlcnZpZXcgdnVsbmVyYWJpbGl0eSBkZXRlY3RvciB0b3AgMyBDVkVzJyxcbiAgICAgICk7XG4gICAgICBjb25zdCBjdmVSYW5rID0gYXdhaXQgVnVsbmVyYWJpbGl0eVJlcXVlc3QudG9wQ1ZFQ291bnQoXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGZyb20sXG4gICAgICAgIHRvLFxuICAgICAgICBmaWx0ZXJzLFxuICAgICAgICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICAgICAgICBwYXR0ZXJuLFxuICAgICAgKTtcbiAgICAgIHByaW50ZXIubG9nZ2VyLmRlYnVnKCdBZGRpbmcgb3ZlcnZpZXcgdnVsbmVyYWJpbGl0eSBkZXRlY3RvciB0b3AgMyBDVkVzJyk7XG4gICAgICBpZiAoY3ZlUmFuayAmJiBjdmVSYW5rLmxlbmd0aCkge1xuICAgICAgICBwcmludGVyLmFkZFNpbXBsZVRhYmxlKHtcbiAgICAgICAgICB0aXRsZTogeyB0ZXh0OiAnVG9wIDMgQ1ZFJywgc3R5bGU6ICdoMicgfSxcbiAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICB7IGlkOiAndG9wJywgbGFiZWw6ICdUb3AnIH0sXG4gICAgICAgICAgICB7IGlkOiAnY3ZlJywgbGFiZWw6ICdDVkUnIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBpdGVtczogY3ZlUmFuay5tYXAoaXRlbSA9PiAoe1xuICAgICAgICAgICAgdG9wOiBjdmVSYW5rLmluZGV4T2YoaXRlbSkgKyAxLFxuICAgICAgICAgICAgY3ZlOiBpdGVtLFxuICAgICAgICAgIH0pKSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8tLS0gT1ZFUlZJRVcgLSBHRU5FUkFMXG4gICAgaWYgKHNlY3Rpb24gPT09ICdvdmVydmlldycgJiYgdGFiID09PSAnZ2VuZXJhbCcpIHtcbiAgICAgIHByaW50ZXIubG9nZ2VyLmRlYnVnKCdGZXRjaGluZyB0b3AgMyBhZ2VudHMgd2l0aCBsZXZlbCAxNSBhbGVydHMnKTtcblxuICAgICAgY29uc3QgbGV2ZWwxNVJhbmsgPSBhd2FpdCBPdmVydmlld1JlcXVlc3QudG9wTGV2ZWwxNShcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgZnJvbSxcbiAgICAgICAgdG8sXG4gICAgICAgIGZpbHRlcnMsXG4gICAgICAgIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gICAgICAgIHBhdHRlcm4sXG4gICAgICApO1xuXG4gICAgICBwcmludGVyLmxvZ2dlci5kZWJ1ZygnQWRkaW5nIHRvcCAzIGFnZW50cyB3aXRoIGxldmVsIDE1IGFsZXJ0cycpO1xuICAgICAgaWYgKGxldmVsMTVSYW5rLmxlbmd0aCkge1xuICAgICAgICBwcmludGVyLmFkZENvbnRlbnQoe1xuICAgICAgICAgIHRleHQ6ICdUb3AgMyBhZ2VudHMgd2l0aCBsZXZlbCAxNSBhbGVydHMnLFxuICAgICAgICAgIHN0eWxlOiAnaDInLFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgYnVpbGRBZ2VudHNUYWJsZShjb250ZXh0LCBwcmludGVyLCBsZXZlbDE1UmFuaywgYXBpSWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vLS0tIE9WRVJWSUVXIC0gUE1cbiAgICBpZiAoc2VjdGlvbiA9PT0gJ292ZXJ2aWV3JyAmJiB0YWIgPT09ICdwbScpIHtcbiAgICAgIHByaW50ZXIubG9nZ2VyLmRlYnVnKCdGZXRjaGluZyBtb3N0IGNvbW1vbiByb290a2l0cycpO1xuICAgICAgY29uc3QgdG9wNVJvb3RraXRzUmFuayA9IGF3YWl0IFJvb3RjaGVja1JlcXVlc3QudG9wNVJvb3RraXRzRGV0ZWN0ZWQoXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGZyb20sXG4gICAgICAgIHRvLFxuICAgICAgICBmaWx0ZXJzLFxuICAgICAgICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICAgICAgICBwYXR0ZXJuLFxuICAgICAgKTtcbiAgICAgIHByaW50ZXIubG9nZ2VyLmRlYnVnKCdBZGRpbmcgbW9zdCBjb21tb24gcm9vdGtpdHMnKTtcbiAgICAgIGlmICh0b3A1Um9vdGtpdHNSYW5rICYmIHRvcDVSb290a2l0c1JhbmsubGVuZ3RoKSB7XG4gICAgICAgIHByaW50ZXJcbiAgICAgICAgICAuYWRkQ29udGVudFdpdGhOZXdMaW5lKHtcbiAgICAgICAgICAgIHRleHQ6ICdNb3N0IGNvbW1vbiByb290a2l0cyBmb3VuZCBhbW9uZyB5b3VyIGFnZW50cycsXG4gICAgICAgICAgICBzdHlsZTogJ2gyJyxcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5hZGRDb250ZW50V2l0aE5ld0xpbmUoe1xuICAgICAgICAgICAgdGV4dDogJ1Jvb3RraXRzIGFyZSBhIHNldCBvZiBzb2Z0d2FyZSB0b29scyB0aGF0IGVuYWJsZSBhbiB1bmF1dGhvcml6ZWQgdXNlciB0byBnYWluIGNvbnRyb2wgb2YgYSBjb21wdXRlciBzeXN0ZW0gd2l0aG91dCBiZWluZyBkZXRlY3RlZC4nLFxuICAgICAgICAgICAgc3R5bGU6ICdzdGFuZGFyZCcsXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuYWRkU2ltcGxlVGFibGUoe1xuICAgICAgICAgICAgaXRlbXM6IHRvcDVSb290a2l0c1JhbmsubWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICByZXR1cm4geyB0b3A6IHRvcDVSb290a2l0c1JhbmsuaW5kZXhPZihpdGVtKSArIDEsIG5hbWU6IGl0ZW0gfTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICB7IGlkOiAndG9wJywgbGFiZWw6ICdUb3AnIH0sXG4gICAgICAgICAgICAgIHsgaWQ6ICduYW1lJywgbGFiZWw6ICdSb290a2l0JyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHByaW50ZXIubG9nZ2VyLmRlYnVnKCdGZXRjaGluZyBoaWRkZW4gcGlkcycpO1xuICAgICAgY29uc3QgaGlkZGVuUGlkcyA9IGF3YWl0IFJvb3RjaGVja1JlcXVlc3QuYWdlbnRzV2l0aEhpZGRlblBpZHMoXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGZyb20sXG4gICAgICAgIHRvLFxuICAgICAgICBmaWx0ZXJzLFxuICAgICAgICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICAgICAgICBwYXR0ZXJuLFxuICAgICAgKTtcbiAgICAgIGhpZGRlblBpZHMgJiZcbiAgICAgICAgcHJpbnRlci5hZGRDb250ZW50KHtcbiAgICAgICAgICB0ZXh0OiBgJHtoaWRkZW5QaWRzfSBvZiAke3RvdGFsQWdlbnRzfSBhZ2VudHMgaGF2ZSBoaWRkZW4gcHJvY2Vzc2VzYCxcbiAgICAgICAgICBzdHlsZTogJ2gzJyxcbiAgICAgICAgfSk7XG4gICAgICAhaGlkZGVuUGlkcyAmJlxuICAgICAgICBwcmludGVyLmFkZENvbnRlbnRXaXRoTmV3TGluZSh7XG4gICAgICAgICAgdGV4dDogYE5vIGFnZW50cyBoYXZlIGhpZGRlbiBwcm9jZXNzZXNgLFxuICAgICAgICAgIHN0eWxlOiAnaDMnLFxuICAgICAgICB9KTtcblxuICAgICAgY29uc3QgaGlkZGVuUG9ydHMgPSBhd2FpdCBSb290Y2hlY2tSZXF1ZXN0LmFnZW50c1dpdGhIaWRkZW5Qb3J0cyhcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgZnJvbSxcbiAgICAgICAgdG8sXG4gICAgICAgIGZpbHRlcnMsXG4gICAgICAgIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gICAgICAgIHBhdHRlcm4sXG4gICAgICApO1xuICAgICAgaGlkZGVuUG9ydHMgJiZcbiAgICAgICAgcHJpbnRlci5hZGRDb250ZW50KHtcbiAgICAgICAgICB0ZXh0OiBgJHtoaWRkZW5Qb3J0c30gb2YgJHt0b3RhbEFnZW50c30gYWdlbnRzIGhhdmUgaGlkZGVuIHBvcnRzYCxcbiAgICAgICAgICBzdHlsZTogJ2gzJyxcbiAgICAgICAgfSk7XG4gICAgICAhaGlkZGVuUG9ydHMgJiZcbiAgICAgICAgcHJpbnRlci5hZGRDb250ZW50KHtcbiAgICAgICAgICB0ZXh0OiBgTm8gYWdlbnRzIGhhdmUgaGlkZGVuIHBvcnRzYCxcbiAgICAgICAgICBzdHlsZTogJ2gzJyxcbiAgICAgICAgfSk7XG4gICAgICBwcmludGVyLmFkZE5ld0xpbmUoKTtcbiAgICB9XG5cbiAgICAvLy0tLSBPVkVSVklFVy9BR0VOVFMgLSBQQ0lcbiAgICBpZiAoWydvdmVydmlldycsICdhZ2VudHMnXS5pbmNsdWRlcyhzZWN0aW9uKSAmJiB0YWIgPT09ICdwY2knKSB7XG4gICAgICBwcmludGVyLmxvZ2dlci5kZWJ1ZygnRmV0Y2hpbmcgdG9wIFBDSSBEU1MgcmVxdWlyZW1lbnRzJyk7XG4gICAgICBjb25zdCB0b3BQY2lSZXF1aXJlbWVudHMgPSBhd2FpdCBQQ0lSZXF1ZXN0LnRvcFBDSVJlcXVpcmVtZW50cyhcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgZnJvbSxcbiAgICAgICAgdG8sXG4gICAgICAgIGZpbHRlcnMsXG4gICAgICAgIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gICAgICAgIHBhdHRlcm4sXG4gICAgICApO1xuICAgICAgcHJpbnRlci5hZGRDb250ZW50V2l0aE5ld0xpbmUoe1xuICAgICAgICB0ZXh0OiAnTW9zdCBjb21tb24gUENJIERTUyByZXF1aXJlbWVudHMgYWxlcnRzIGZvdW5kJyxcbiAgICAgICAgc3R5bGU6ICdoMicsXG4gICAgICB9KTtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0b3BQY2lSZXF1aXJlbWVudHMpIHtcbiAgICAgICAgY29uc3QgcnVsZXMgPSBhd2FpdCBQQ0lSZXF1ZXN0LmdldFJ1bGVzQnlSZXF1aXJlbWVudChcbiAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgIGZyb20sXG4gICAgICAgICAgdG8sXG4gICAgICAgICAgZmlsdGVycyxcbiAgICAgICAgICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICAgICAgICAgIGl0ZW0sXG4gICAgICAgICAgcGF0dGVybixcbiAgICAgICAgKTtcbiAgICAgICAgcHJpbnRlci5hZGRDb250ZW50V2l0aE5ld0xpbmUoe1xuICAgICAgICAgIHRleHQ6IGBSZXF1aXJlbWVudCAke2l0ZW19YCxcbiAgICAgICAgICBzdHlsZTogJ2gzJyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKFBDSVtpdGVtXSkge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPVxuICAgICAgICAgICAgdHlwZW9mIFBDSVtpdGVtXSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgPyB7IHRleHQ6IFBDSVtpdGVtXSwgc3R5bGU6ICdzdGFuZGFyZCcgfVxuICAgICAgICAgICAgICA6IFBDSVtpdGVtXTtcbiAgICAgICAgICBwcmludGVyLmFkZENvbnRlbnRXaXRoTmV3TGluZShjb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJ1bGVzICYmXG4gICAgICAgICAgcnVsZXMubGVuZ3RoICYmXG4gICAgICAgICAgcHJpbnRlci5hZGRTaW1wbGVUYWJsZSh7XG4gICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgIHsgaWQ6ICdydWxlSUQnLCBsYWJlbDogJ1J1bGUgSUQnIH0sXG4gICAgICAgICAgICAgIHsgaWQ6ICdydWxlRGVzY3JpcHRpb24nLCBsYWJlbDogJ0Rlc2NyaXB0aW9uJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGl0ZW1zOiBydWxlcyxcbiAgICAgICAgICAgIHRpdGxlOiBgVG9wIHJ1bGVzIGZvciAke2l0ZW19IHJlcXVpcmVtZW50YCxcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLy0tLSBPVkVSVklFVy9BR0VOVFMgLSBUU0NcbiAgICBpZiAoWydvdmVydmlldycsICdhZ2VudHMnXS5pbmNsdWRlcyhzZWN0aW9uKSAmJiB0YWIgPT09ICd0c2MnKSB7XG4gICAgICBwcmludGVyLmxvZ2dlci5kZWJ1ZygnRmV0Y2hpbmcgdG9wIFRTQyByZXF1aXJlbWVudHMnKTtcbiAgICAgIGNvbnN0IHRvcFRTQ1JlcXVpcmVtZW50cyA9IGF3YWl0IFRTQ1JlcXVlc3QudG9wVFNDUmVxdWlyZW1lbnRzKFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICBmcm9tLFxuICAgICAgICB0byxcbiAgICAgICAgZmlsdGVycyxcbiAgICAgICAgYWxsb3dlZEFnZW50c0ZpbHRlcixcbiAgICAgICAgcGF0dGVybixcbiAgICAgICk7XG4gICAgICBwcmludGVyLmFkZENvbnRlbnRXaXRoTmV3TGluZSh7XG4gICAgICAgIHRleHQ6ICdNb3N0IGNvbW1vbiBUU0MgcmVxdWlyZW1lbnRzIGFsZXJ0cyBmb3VuZCcsXG4gICAgICAgIHN0eWxlOiAnaDInLFxuICAgICAgfSk7XG4gICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdG9wVFNDUmVxdWlyZW1lbnRzKSB7XG4gICAgICAgIGNvbnN0IHJ1bGVzID0gYXdhaXQgVFNDUmVxdWVzdC5nZXRSdWxlc0J5UmVxdWlyZW1lbnQoXG4gICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICBmcm9tLFxuICAgICAgICAgIHRvLFxuICAgICAgICAgIGZpbHRlcnMsXG4gICAgICAgICAgYWxsb3dlZEFnZW50c0ZpbHRlcixcbiAgICAgICAgICBpdGVtLFxuICAgICAgICAgIHBhdHRlcm4sXG4gICAgICAgICk7XG4gICAgICAgIHByaW50ZXIuYWRkQ29udGVudFdpdGhOZXdMaW5lKHtcbiAgICAgICAgICB0ZXh0OiBgUmVxdWlyZW1lbnQgJHtpdGVtfWAsXG4gICAgICAgICAgc3R5bGU6ICdoMycsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChUU0NbaXRlbV0pIHtcbiAgICAgICAgICBjb25zdCBjb250ZW50ID1cbiAgICAgICAgICAgIHR5cGVvZiBUU0NbaXRlbV0gPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgID8geyB0ZXh0OiBUU0NbaXRlbV0sIHN0eWxlOiAnc3RhbmRhcmQnIH1cbiAgICAgICAgICAgICAgOiBUU0NbaXRlbV07XG4gICAgICAgICAgcHJpbnRlci5hZGRDb250ZW50V2l0aE5ld0xpbmUoY29udGVudCk7XG4gICAgICAgIH1cblxuICAgICAgICBydWxlcyAmJlxuICAgICAgICAgIHJ1bGVzLmxlbmd0aCAmJlxuICAgICAgICAgIHByaW50ZXIuYWRkU2ltcGxlVGFibGUoe1xuICAgICAgICAgICAgY29sdW1uczogW1xuICAgICAgICAgICAgICB7IGlkOiAncnVsZUlEJywgbGFiZWw6ICdSdWxlIElEJyB9LFxuICAgICAgICAgICAgICB7IGlkOiAncnVsZURlc2NyaXB0aW9uJywgbGFiZWw6ICdEZXNjcmlwdGlvbicgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBpdGVtczogcnVsZXMsXG4gICAgICAgICAgICB0aXRsZTogYFRvcCBydWxlcyBmb3IgJHtpdGVtfSByZXF1aXJlbWVudGAsXG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8tLS0gT1ZFUlZJRVcvQUdFTlRTIC0gR0RQUlxuICAgIGlmIChbJ292ZXJ2aWV3JywgJ2FnZW50cyddLmluY2x1ZGVzKHNlY3Rpb24pICYmIHRhYiA9PT0gJ2dkcHInKSB7XG4gICAgICBwcmludGVyLmxvZ2dlci5kZWJ1ZygnRmV0Y2hpbmcgdG9wIEdEUFIgcmVxdWlyZW1lbnRzJyk7XG4gICAgICBjb25zdCB0b3BHZHByUmVxdWlyZW1lbnRzID0gYXdhaXQgR0RQUlJlcXVlc3QudG9wR0RQUlJlcXVpcmVtZW50cyhcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgZnJvbSxcbiAgICAgICAgdG8sXG4gICAgICAgIGZpbHRlcnMsXG4gICAgICAgIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gICAgICAgIHBhdHRlcm4sXG4gICAgICApO1xuICAgICAgcHJpbnRlci5hZGRDb250ZW50V2l0aE5ld0xpbmUoe1xuICAgICAgICB0ZXh0OiAnTW9zdCBjb21tb24gR0RQUiByZXF1aXJlbWVudHMgYWxlcnRzIGZvdW5kJyxcbiAgICAgICAgc3R5bGU6ICdoMicsXG4gICAgICB9KTtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB0b3BHZHByUmVxdWlyZW1lbnRzKSB7XG4gICAgICAgIGNvbnN0IHJ1bGVzID0gYXdhaXQgR0RQUlJlcXVlc3QuZ2V0UnVsZXNCeVJlcXVpcmVtZW50KFxuICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgZnJvbSxcbiAgICAgICAgICB0byxcbiAgICAgICAgICBmaWx0ZXJzLFxuICAgICAgICAgIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gICAgICAgICAgaXRlbSxcbiAgICAgICAgICBwYXR0ZXJuLFxuICAgICAgICApO1xuICAgICAgICBwcmludGVyLmFkZENvbnRlbnRXaXRoTmV3TGluZSh7XG4gICAgICAgICAgdGV4dDogYFJlcXVpcmVtZW50ICR7aXRlbX1gLFxuICAgICAgICAgIHN0eWxlOiAnaDMnLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoR0RQUiAmJiBHRFBSW2l0ZW1dKSB7XG4gICAgICAgICAgY29uc3QgY29udGVudCA9XG4gICAgICAgICAgICB0eXBlb2YgR0RQUltpdGVtXSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgPyB7IHRleHQ6IEdEUFJbaXRlbV0sIHN0eWxlOiAnc3RhbmRhcmQnIH1cbiAgICAgICAgICAgICAgOiBHRFBSW2l0ZW1dO1xuICAgICAgICAgIHByaW50ZXIuYWRkQ29udGVudFdpdGhOZXdMaW5lKGNvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcnVsZXMgJiZcbiAgICAgICAgICBydWxlcy5sZW5ndGggJiZcbiAgICAgICAgICBwcmludGVyLmFkZFNpbXBsZVRhYmxlKHtcbiAgICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgICAgeyBpZDogJ3J1bGVJRCcsIGxhYmVsOiAnUnVsZSBJRCcgfSxcbiAgICAgICAgICAgICAgeyBpZDogJ3J1bGVEZXNjcmlwdGlvbicsIGxhYmVsOiAnRGVzY3JpcHRpb24nIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgaXRlbXM6IHJ1bGVzLFxuICAgICAgICAgICAgdGl0bGU6IGBUb3AgcnVsZXMgZm9yICR7aXRlbX0gcmVxdWlyZW1lbnRgLFxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcHJpbnRlci5hZGROZXdMaW5lKCk7XG4gICAgfVxuXG4gICAgLy8tLS0gT1ZFUlZJRVcgLSBBVURJVFxuICAgIGlmIChzZWN0aW9uID09PSAnb3ZlcnZpZXcnICYmIHRhYiA9PT0gJ2F1ZGl0Jykge1xuICAgICAgcHJpbnRlci5sb2dnZXIuZGVidWcoXG4gICAgICAgICdGZXRjaGluZyBhZ2VudHMgd2l0aCBoaWdoIG51bWJlciBvZiBmYWlsZWQgc3VkbyBjb21tYW5kcycsXG4gICAgICApO1xuICAgICAgY29uc3QgYXVkaXRBZ2VudHNOb25TdWNjZXNzID1cbiAgICAgICAgYXdhaXQgQXVkaXRSZXF1ZXN0LmdldFRvcDNBZ2VudHNTdWRvTm9uU3VjY2Vzc2Z1bChcbiAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgIGZyb20sXG4gICAgICAgICAgdG8sXG4gICAgICAgICAgZmlsdGVycyxcbiAgICAgICAgICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICAgICAgICAgIHBhdHRlcm4sXG4gICAgICAgICk7XG4gICAgICBpZiAoYXVkaXRBZ2VudHNOb25TdWNjZXNzICYmIGF1ZGl0QWdlbnRzTm9uU3VjY2Vzcy5sZW5ndGgpIHtcbiAgICAgICAgcHJpbnRlci5hZGRDb250ZW50KHtcbiAgICAgICAgICB0ZXh0OiAnQWdlbnRzIHdpdGggaGlnaCBudW1iZXIgb2YgZmFpbGVkIHN1ZG8gY29tbWFuZHMnLFxuICAgICAgICAgIHN0eWxlOiAnaDInLFxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgYnVpbGRBZ2VudHNUYWJsZShjb250ZXh0LCBwcmludGVyLCBhdWRpdEFnZW50c05vblN1Y2Nlc3MsIGFwaUlkKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGF1ZGl0QWdlbnRzRmFpbGVkU3lzY2FsbCA9XG4gICAgICAgIGF3YWl0IEF1ZGl0UmVxdWVzdC5nZXRUb3AzQWdlbnRzRmFpbGVkU3lzY2FsbHMoXG4gICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICBmcm9tLFxuICAgICAgICAgIHRvLFxuICAgICAgICAgIGZpbHRlcnMsXG4gICAgICAgICAgYWxsb3dlZEFnZW50c0ZpbHRlcixcbiAgICAgICAgICBwYXR0ZXJuLFxuICAgICAgICApO1xuICAgICAgaWYgKGF1ZGl0QWdlbnRzRmFpbGVkU3lzY2FsbCAmJiBhdWRpdEFnZW50c0ZhaWxlZFN5c2NhbGwubGVuZ3RoKSB7XG4gICAgICAgIHByaW50ZXIuYWRkU2ltcGxlVGFibGUoe1xuICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgIHsgaWQ6ICdhZ2VudCcsIGxhYmVsOiAnQWdlbnQgSUQnIH0sXG4gICAgICAgICAgICB7IGlkOiAnc3lzY2FsbF9pZCcsIGxhYmVsOiAnU3lzY2FsbCBJRCcgfSxcbiAgICAgICAgICAgIHsgaWQ6ICdzeXNjYWxsX3N5c2NhbGwnLCBsYWJlbDogJ1N5c2NhbGwnIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBpdGVtczogYXVkaXRBZ2VudHNGYWlsZWRTeXNjYWxsLm1hcChpdGVtID0+ICh7XG4gICAgICAgICAgICBhZ2VudDogaXRlbS5hZ2VudCxcbiAgICAgICAgICAgIHN5c2NhbGxfaWQ6IGl0ZW0uc3lzY2FsbC5pZCxcbiAgICAgICAgICAgIHN5c2NhbGxfc3lzY2FsbDogaXRlbS5zeXNjYWxsLnN5c2NhbGwsXG4gICAgICAgICAgfSkpLFxuICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICB0ZXh0OiAnTW9zdCBjb21tb24gZmFpbGluZyBzeXNjYWxscycsXG4gICAgICAgICAgICBzdHlsZTogJ2gyJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLy0tLSBPVkVSVklFVyAtIEZJTVxuICAgIGlmIChzZWN0aW9uID09PSAnb3ZlcnZpZXcnICYmIHRhYiA9PT0gJ2ZpbScpIHtcbiAgICAgIHByaW50ZXIubG9nZ2VyLmRlYnVnKCdGZXRjaGluZyB0b3AgMyBydWxlcyBmb3IgRklNJyk7XG4gICAgICBjb25zdCBydWxlcyA9IGF3YWl0IFN5c2NoZWNrUmVxdWVzdC50b3AzUnVsZXMoXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGZyb20sXG4gICAgICAgIHRvLFxuICAgICAgICBmaWx0ZXJzLFxuICAgICAgICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICAgICAgICBwYXR0ZXJuLFxuICAgICAgKTtcblxuICAgICAgaWYgKHJ1bGVzICYmIHJ1bGVzLmxlbmd0aCkge1xuICAgICAgICBwcmludGVyXG4gICAgICAgICAgLmFkZENvbnRlbnRXaXRoTmV3TGluZSh7IHRleHQ6ICdUb3AgMyBGSU0gcnVsZXMnLCBzdHlsZTogJ2gyJyB9KVxuICAgICAgICAgIC5hZGRTaW1wbGVUYWJsZSh7XG4gICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgIHsgaWQ6ICdydWxlSUQnLCBsYWJlbDogJ1J1bGUgSUQnIH0sXG4gICAgICAgICAgICAgIHsgaWQ6ICdydWxlRGVzY3JpcHRpb24nLCBsYWJlbDogJ0Rlc2NyaXB0aW9uJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGl0ZW1zOiBydWxlcyxcbiAgICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICAgIHRleHQ6ICdUb3AgMyBydWxlcyB0aGF0IGFyZSBnZW5lcmF0aW5nIG1vc3QgYWxlcnRzLicsXG4gICAgICAgICAgICAgIHN0eWxlOiAnc3RhbmRhcmQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcHJpbnRlci5sb2dnZXIuZGVidWcoJ0ZldGNoaW5nIHRvcCAzIGFnZW50cyBmb3IgRklNJyk7XG4gICAgICBjb25zdCBhZ2VudHMgPSBhd2FpdCBTeXNjaGVja1JlcXVlc3QudG9wM2FnZW50cyhcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgZnJvbSxcbiAgICAgICAgdG8sXG4gICAgICAgIGZpbHRlcnMsXG4gICAgICAgIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gICAgICAgIHBhdHRlcm4sXG4gICAgICApO1xuXG4gICAgICBpZiAoYWdlbnRzICYmIGFnZW50cy5sZW5ndGgpIHtcbiAgICAgICAgcHJpbnRlci5hZGRDb250ZW50V2l0aE5ld0xpbmUoe1xuICAgICAgICAgIHRleHQ6ICdBZ2VudHMgd2l0aCBzdXNwaWNpb3VzIEZJTSBhY3Rpdml0eScsXG4gICAgICAgICAgc3R5bGU6ICdoMicsXG4gICAgICAgIH0pO1xuICAgICAgICBwcmludGVyLmFkZENvbnRlbnRXaXRoTmV3TGluZSh7XG4gICAgICAgICAgdGV4dDogJ1RvcCAzIGFnZW50cyB0aGF0IGhhdmUgbW9zdCBGSU0gYWxlcnRzIGZyb20gbGV2ZWwgNyB0byBsZXZlbCAxNS4gVGFrZSBjYXJlIGFib3V0IHRoZW0uJyxcbiAgICAgICAgICBzdHlsZTogJ3N0YW5kYXJkJyxcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IGJ1aWxkQWdlbnRzVGFibGUoY29udGV4dCwgcHJpbnRlciwgYWdlbnRzLCBhcGlJZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8tLS0gQUdFTlRTIC0gQVVESVRcbiAgICBpZiAoc2VjdGlvbiA9PT0gJ2FnZW50cycgJiYgdGFiID09PSAnYXVkaXQnKSB7XG4gICAgICBwcmludGVyLmxvZ2dlci5kZWJ1ZygnRmV0Y2hpbmcgbW9zdCBjb21tb24gZmFpbGVkIHN5c2NhbGxzJyk7XG4gICAgICBjb25zdCBhdWRpdEZhaWxlZFN5c2NhbGwgPSBhd2FpdCBBdWRpdFJlcXVlc3QuZ2V0VG9wRmFpbGVkU3lzY2FsbHMoXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGZyb20sXG4gICAgICAgIHRvLFxuICAgICAgICBmaWx0ZXJzLFxuICAgICAgICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICAgICAgICBwYXR0ZXJuLFxuICAgICAgKTtcbiAgICAgIGF1ZGl0RmFpbGVkU3lzY2FsbCAmJlxuICAgICAgICBhdWRpdEZhaWxlZFN5c2NhbGwubGVuZ3RoICYmXG4gICAgICAgIHByaW50ZXIuYWRkU2ltcGxlVGFibGUoe1xuICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgIHsgaWQ6ICdpZCcsIGxhYmVsOiAnaWQnIH0sXG4gICAgICAgICAgICB7IGlkOiAnc3lzY2FsbCcsIGxhYmVsOiAnU3lzY2FsbCcgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGl0ZW1zOiBhdWRpdEZhaWxlZFN5c2NhbGwsXG4gICAgICAgICAgdGl0bGU6ICdNb3N0IGNvbW1vbiBmYWlsaW5nIHN5c2NhbGxzJyxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8tLS0gQUdFTlRTIC0gRklNXG4gICAgaWYgKHNlY3Rpb24gPT09ICdhZ2VudHMnICYmIHRhYiA9PT0gJ2ZpbScpIHtcbiAgICAgIHByaW50ZXIubG9nZ2VyLmRlYnVnKGBGZXRjaGluZyBzeXNjaGVjayBkYXRhYmFzZSBmb3IgYWdlbnQgJHthZ2VudH1gKTtcblxuICAgICAgY29uc3QgbGFzdFNjYW5SZXNwb25zZSA9XG4gICAgICAgIGF3YWl0IGNvbnRleHQud2F6dWguYXBpLmNsaWVudC5hc0N1cnJlbnRVc2VyLnJlcXVlc3QoXG4gICAgICAgICAgJ0dFVCcsXG4gICAgICAgICAgYC9zeXNjaGVjay8ke2FnZW50fS9sYXN0X3NjYW5gLFxuICAgICAgICAgIHt9LFxuICAgICAgICAgIHsgYXBpSG9zdElEOiBhcGlJZCB9LFxuICAgICAgICApO1xuXG4gICAgICBpZiAobGFzdFNjYW5SZXNwb25zZSAmJiBsYXN0U2NhblJlc3BvbnNlLmRhdGEpIHtcbiAgICAgICAgY29uc3QgbGFzdFNjYW5EYXRhID0gbGFzdFNjYW5SZXNwb25zZS5kYXRhLmRhdGEuYWZmZWN0ZWRfaXRlbXNbMF07XG4gICAgICAgIGlmIChsYXN0U2NhbkRhdGEuc3RhcnQgJiYgbGFzdFNjYW5EYXRhLmVuZCkge1xuICAgICAgICAgIHByaW50ZXIuYWRkQ29udGVudCh7XG4gICAgICAgICAgICB0ZXh0OiBgTGFzdCBmaWxlIGludGVncml0eSBtb25pdG9yaW5nIHNjYW4gd2FzIGV4ZWN1dGVkIGZyb20gJHtsYXN0U2NhbkRhdGEuc3RhcnR9IHRvICR7bGFzdFNjYW5EYXRhLmVuZH0uYCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChsYXN0U2NhbkRhdGEuc3RhcnQpIHtcbiAgICAgICAgICBwcmludGVyLmFkZENvbnRlbnQoe1xuICAgICAgICAgICAgdGV4dDogYEZpbGUgaW50ZWdyaXR5IG1vbml0b3Jpbmcgc2NhbiBpcyBjdXJyZW50bHkgaW4gcHJvZ3Jlc3MgZm9yIHRoaXMgYWdlbnQgKHN0YXJ0ZWQgb24gJHtsYXN0U2NhbkRhdGEuc3RhcnR9KS5gLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByaW50ZXIuYWRkQ29udGVudCh7XG4gICAgICAgICAgICB0ZXh0OiBgRmlsZSBpbnRlZ3JpdHkgbW9uaXRvcmluZyBzY2FuIGlzIGN1cnJlbnRseSBpbiBwcm9ncmVzcyBmb3IgdGhpcyBhZ2VudC5gLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHByaW50ZXIuYWRkTmV3TGluZSgpO1xuICAgICAgfVxuXG4gICAgICBwcmludGVyLmxvZ2dlci5kZWJ1ZygnRmV0Y2hpbmcgbGFzdCAxMCBkZWxldGVkIGZpbGVzIGZvciBGSU0nKTtcbiAgICAgIGNvbnN0IGxhc3RUZW5EZWxldGVkID0gYXdhaXQgU3lzY2hlY2tSZXF1ZXN0Lmxhc3RUZW5EZWxldGVkRmlsZXMoXG4gICAgICAgIGNvbnRleHQsXG4gICAgICAgIGZyb20sXG4gICAgICAgIHRvLFxuICAgICAgICBmaWx0ZXJzLFxuICAgICAgICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICAgICAgICBwYXR0ZXJuLFxuICAgICAgKTtcblxuICAgICAgbGFzdFRlbkRlbGV0ZWQgJiZcbiAgICAgICAgbGFzdFRlbkRlbGV0ZWQubGVuZ3RoICYmXG4gICAgICAgIHByaW50ZXIuYWRkU2ltcGxlVGFibGUoe1xuICAgICAgICAgIGNvbHVtbnM6IFtcbiAgICAgICAgICAgIHsgaWQ6ICdwYXRoJywgbGFiZWw6ICdQYXRoJyB9LFxuICAgICAgICAgICAgeyBpZDogJ2RhdGUnLCBsYWJlbDogJ0RhdGUnIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBpdGVtczogbGFzdFRlbkRlbGV0ZWQsXG4gICAgICAgICAgdGl0bGU6ICdMYXN0IDEwIGRlbGV0ZWQgZmlsZXMnLFxuICAgICAgICB9KTtcblxuICAgICAgcHJpbnRlci5sb2dnZXIuZGVidWcoJ0ZldGNoaW5nIGxhc3QgMTAgbW9kaWZpZWQgZmlsZXMnKTtcbiAgICAgIGNvbnN0IGxhc3RUZW5Nb2RpZmllZCA9IGF3YWl0IFN5c2NoZWNrUmVxdWVzdC5sYXN0VGVuTW9kaWZpZWRGaWxlcyhcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgZnJvbSxcbiAgICAgICAgdG8sXG4gICAgICAgIGZpbHRlcnMsXG4gICAgICAgIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gICAgICAgIHBhdHRlcm4sXG4gICAgICApO1xuXG4gICAgICBsYXN0VGVuTW9kaWZpZWQgJiZcbiAgICAgICAgbGFzdFRlbk1vZGlmaWVkLmxlbmd0aCAmJlxuICAgICAgICBwcmludGVyLmFkZFNpbXBsZVRhYmxlKHtcbiAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICB7IGlkOiAncGF0aCcsIGxhYmVsOiAnUGF0aCcgfSxcbiAgICAgICAgICAgIHsgaWQ6ICdkYXRlJywgbGFiZWw6ICdEYXRlJyB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgaXRlbXM6IGxhc3RUZW5Nb2RpZmllZCxcbiAgICAgICAgICB0aXRsZTogJ0xhc3QgMTAgbW9kaWZpZWQgZmlsZXMnLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLy0tLSBBR0VOVFMgLSBTWVNDT0xMRUNUT1JcbiAgICBpZiAoc2VjdGlvbiA9PT0gJ2FnZW50cycgJiYgdGFiID09PSAnc3lzY29sbGVjdG9yJykge1xuICAgICAgcHJpbnRlci5sb2dnZXIuZGVidWcoYEZldGNoaW5nIGhhcmR3YXJlIGluZm9ybWF0aW9uIGZvciBhZ2VudCAke2FnZW50fWApO1xuICAgICAgY29uc3QgcmVxdWVzdHNTeXNjb2xsZWN0b3JMaXN0cyA9IFtcbiAgICAgICAge1xuICAgICAgICAgIGVuZHBvaW50OiBgL3N5c2NvbGxlY3Rvci8ke2FnZW50fS9oYXJkd2FyZWAsXG4gICAgICAgICAgbG9nZ2VyTWVzc2FnZTogYEZldGNoaW5nIEhhcmR3YXJlIGluZm9ybWF0aW9uIGZvciBhZ2VudCAke2FnZW50fWAsXG4gICAgICAgICAgbGlzdDoge1xuICAgICAgICAgICAgdGl0bGU6IHsgdGV4dDogJ0hhcmR3YXJlIGluZm9ybWF0aW9uJywgc3R5bGU6ICdoMicgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1hcFJlc3BvbnNlOiBoYXJkd2FyZSA9PiBbXG4gICAgICAgICAgICBoYXJkd2FyZS5jcHUgJiYgaGFyZHdhcmUuY3B1LmNvcmVzICYmIGAke2hhcmR3YXJlLmNwdS5jb3Jlc30gY29yZXNgLFxuICAgICAgICAgICAgaGFyZHdhcmUuY3B1ICYmIGhhcmR3YXJlLmNwdS5uYW1lLFxuICAgICAgICAgICAgaGFyZHdhcmUucmFtICYmXG4gICAgICAgICAgICAgIGhhcmR3YXJlLnJhbS50b3RhbCAmJlxuICAgICAgICAgICAgICBgJHtOdW1iZXIoaGFyZHdhcmUucmFtLnRvdGFsIC8gMTAyNCAvIDEwMjQpLnRvRml4ZWQoMil9R0IgUkFNYCxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgZW5kcG9pbnQ6IGAvc3lzY29sbGVjdG9yLyR7YWdlbnR9L29zYCxcbiAgICAgICAgICBsb2dnZXJNZXNzYWdlOiBgRmV0Y2hpbmcgb3BlcmF0aW5nIHN5c3RlbSBpbmZvcm1hdGlvbiBmb3IgYWdlbnQgJHthZ2VudH1gLFxuICAgICAgICAgIGxpc3Q6IHtcbiAgICAgICAgICAgIHRpdGxlOiB7IHRleHQ6ICdPcGVyYXRpbmcgc3lzdGVtIGluZm9ybWF0aW9uJywgc3R5bGU6ICdoMicgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1hcFJlc3BvbnNlOiBvc0RhdGEgPT4gW1xuICAgICAgICAgICAgb3NEYXRhLnN5c25hbWUsXG4gICAgICAgICAgICBvc0RhdGEudmVyc2lvbixcbiAgICAgICAgICAgIG9zRGF0YS5hcmNoaXRlY3R1cmUsXG4gICAgICAgICAgICBvc0RhdGEucmVsZWFzZSxcbiAgICAgICAgICAgIG9zRGF0YS5vcyAmJlxuICAgICAgICAgICAgICBvc0RhdGEub3MubmFtZSAmJlxuICAgICAgICAgICAgICBvc0RhdGEub3MudmVyc2lvbiAmJlxuICAgICAgICAgICAgICBgJHtvc0RhdGEub3MubmFtZX0gJHtvc0RhdGEub3MudmVyc2lvbn1gLFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICBdO1xuXG4gICAgICBjb25zdCBzeXNjb2xsZWN0b3JMaXN0cyA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICByZXF1ZXN0c1N5c2NvbGxlY3Rvckxpc3RzLm1hcChhc3luYyByZXF1ZXN0U3lzY29sbGVjdG9yID0+IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcHJpbnRlci5sb2dnZXIuZGVidWcocmVxdWVzdFN5c2NvbGxlY3Rvci5sb2dnZXJNZXNzYWdlKTtcbiAgICAgICAgICAgIGNvbnN0IHJlc3BvbnNlU3lzY29sbGVjdG9yID1cbiAgICAgICAgICAgICAgYXdhaXQgY29udGV4dC53YXp1aC5hcGkuY2xpZW50LmFzQ3VycmVudFVzZXIucmVxdWVzdChcbiAgICAgICAgICAgICAgICAnR0VUJyxcbiAgICAgICAgICAgICAgICByZXF1ZXN0U3lzY29sbGVjdG9yLmVuZHBvaW50LFxuICAgICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICAgIHsgYXBpSG9zdElEOiBhcGlJZCB9LFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgW2RhdGFdID1cbiAgICAgICAgICAgICAgKHJlc3BvbnNlU3lzY29sbGVjdG9yICYmXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VTeXNjb2xsZWN0b3IuZGF0YSAmJlxuICAgICAgICAgICAgICAgIHJlc3BvbnNlU3lzY29sbGVjdG9yLmRhdGEuZGF0YSAmJlxuICAgICAgICAgICAgICAgIHJlc3BvbnNlU3lzY29sbGVjdG9yLmRhdGEuZGF0YS5hZmZlY3RlZF9pdGVtcykgfHxcbiAgICAgICAgICAgICAgW107XG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIC4uLnJlcXVlc3RTeXNjb2xsZWN0b3IubGlzdCxcbiAgICAgICAgICAgICAgICBsaXN0OiByZXF1ZXN0U3lzY29sbGVjdG9yLm1hcFJlc3BvbnNlKGRhdGEpLFxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBwcmludGVyLmxvZ2dlci5lcnJvcihlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgKTtcblxuICAgICAgaWYgKHN5c2NvbGxlY3Rvckxpc3RzKSB7XG4gICAgICAgIHN5c2NvbGxlY3Rvckxpc3RzXG4gICAgICAgICAgLmZpbHRlcihzeXNjb2xsZWN0b3JMaXN0ID0+IHN5c2NvbGxlY3Rvckxpc3QpXG4gICAgICAgICAgLmZvckVhY2goc3lzY29sbGVjdG9yTGlzdCA9PiBwcmludGVyLmFkZExpc3Qoc3lzY29sbGVjdG9yTGlzdCkpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB2dWxuZXJhYmlsaXRpZXNSZXF1ZXN0cyA9IFsnQ3JpdGljYWwnLCAnSGlnaCddO1xuXG4gICAgICBjb25zdCB2dWxuZXJhYmlsaXRpZXNSZXNwb25zZXNJdGVtcyA9IChcbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgdnVsbmVyYWJpbGl0aWVzUmVxdWVzdHMubWFwKGFzeW5jIHZ1bG5lcmFiaWxpdGllc0xldmVsID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHByaW50ZXIubG9nZ2VyLmRlYnVnKFxuICAgICAgICAgICAgICAgIGBGZXRjaGluZyB0b3AgJHt2dWxuZXJhYmlsaXRpZXNMZXZlbH0gcGFja2FnZXNgLFxuICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgIHJldHVybiBhd2FpdCBWdWxuZXJhYmlsaXR5UmVxdWVzdC50b3BQYWNrYWdlcyhcbiAgICAgICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICAgICAgIGZyb20sXG4gICAgICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICAgICAgdnVsbmVyYWJpbGl0aWVzTGV2ZWwsXG4gICAgICAgICAgICAgICAgZmlsdGVycyxcbiAgICAgICAgICAgICAgICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICAgICAgICAgICAgICAgIHBhdHRlcm4sXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICBwcmludGVyLmxvZ2dlci5lcnJvcihlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgKVxuICAgICAgKVxuICAgICAgICAuZmlsdGVyKHZ1bG5lcmFiaWxpdGllc1Jlc3BvbnNlID0+IHZ1bG5lcmFiaWxpdGllc1Jlc3BvbnNlKVxuICAgICAgICAuZmxhdCgpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHZ1bG5lcmFiaWxpdGllc1Jlc3BvbnNlc0l0ZW1zICYmXG4gICAgICAgIHZ1bG5lcmFiaWxpdGllc1Jlc3BvbnNlc0l0ZW1zLmxlbmd0aFxuICAgICAgKSB7XG4gICAgICAgIHByaW50ZXIuYWRkU2ltcGxlVGFibGUoe1xuICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICB0ZXh0OiAnVnVsbmVyYWJsZSBwYWNrYWdlcyBmb3VuZCAobGFzdCAyNCBob3VycyknLFxuICAgICAgICAgICAgc3R5bGU6ICdoMicsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICB7IGlkOiAncGFja2FnZScsIGxhYmVsOiAnUGFja2FnZScgfSxcbiAgICAgICAgICAgIHsgaWQ6ICdzZXZlcml0eScsIGxhYmVsOiAnU2V2ZXJpdHknIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBpdGVtczogdnVsbmVyYWJpbGl0aWVzUmVzcG9uc2VzSXRlbXMsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vLS0tIEFHRU5UUyAtIFZVTE5FUkFCSUxJVElFU1xuICAgIGlmIChzZWN0aW9uID09PSAnYWdlbnRzJyAmJiB0YWIgPT09ICd2dWxzJykge1xuICAgICAgY29uc3QgdG9wQ3JpdGljYWxQYWNrYWdlcyA9IGF3YWl0IFZ1bG5lcmFiaWxpdHlSZXF1ZXN0LnRvcFBhY2thZ2VzV2l0aENWRShcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgZnJvbSxcbiAgICAgICAgdG8sXG4gICAgICAgICdDcml0aWNhbCcsXG4gICAgICAgIGZpbHRlcnMsXG4gICAgICAgIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gICAgICAgIHBhdHRlcm4sXG4gICAgICApO1xuICAgICAgaWYgKHRvcENyaXRpY2FsUGFja2FnZXMgJiYgdG9wQ3JpdGljYWxQYWNrYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgcHJpbnRlci5hZGRDb250ZW50V2l0aE5ld0xpbmUoe1xuICAgICAgICAgIHRleHQ6ICdDcml0aWNhbCBzZXZlcml0eScsXG4gICAgICAgICAgc3R5bGU6ICdoMicsXG4gICAgICAgIH0pO1xuICAgICAgICBwcmludGVyLmFkZENvbnRlbnRXaXRoTmV3TGluZSh7XG4gICAgICAgICAgdGV4dDogJ1RoZXNlIHZ1bG5lcmFiaWx0aWVzIGFyZSBjcml0aWNhbCwgcGxlYXNlIHJldmlldyB5b3VyIGFnZW50LiBDbGljayBvbiBlYWNoIGxpbmsgdG8gcmVhZCBtb3JlIGFib3V0IGVhY2ggZm91bmQgdnVsbmVyYWJpbGl0eS4nLFxuICAgICAgICAgIHN0eWxlOiAnc3RhbmRhcmQnLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgY3VzdG9tdWwgPSBbXTtcbiAgICAgICAgZm9yIChjb25zdCBjcml0aWNhbCBvZiB0b3BDcml0aWNhbFBhY2thZ2VzKSB7XG4gICAgICAgICAgY3VzdG9tdWwucHVzaCh7IHRleHQ6IGNyaXRpY2FsLnBhY2thZ2UsIHN0eWxlOiAnc3RhbmRhcmQnIH0pO1xuICAgICAgICAgIGN1c3RvbXVsLnB1c2goe1xuICAgICAgICAgICAgdWw6IGNyaXRpY2FsLnJlZmVyZW5jZXMubWFwKGl0ZW0gPT4gKHtcbiAgICAgICAgICAgICAgdGV4dDogaXRlbS5zdWJzdHJpbmcoMCwgODApICsgJy4uLicsXG4gICAgICAgICAgICAgIGxpbms6IGl0ZW0sXG4gICAgICAgICAgICAgIGNvbG9yOiAnIzFFQTVDOCcsXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcHJpbnRlci5hZGRDb250ZW50V2l0aE5ld0xpbmUoeyB1bDogY3VzdG9tdWwgfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRvcEhpZ2hQYWNrYWdlcyA9IGF3YWl0IFZ1bG5lcmFiaWxpdHlSZXF1ZXN0LnRvcFBhY2thZ2VzV2l0aENWRShcbiAgICAgICAgY29udGV4dCxcbiAgICAgICAgZnJvbSxcbiAgICAgICAgdG8sXG4gICAgICAgICdIaWdoJyxcbiAgICAgICAgZmlsdGVycyxcbiAgICAgICAgYWxsb3dlZEFnZW50c0ZpbHRlcixcbiAgICAgICAgcGF0dGVybixcbiAgICAgICk7XG4gICAgICBpZiAodG9wSGlnaFBhY2thZ2VzICYmIHRvcEhpZ2hQYWNrYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgcHJpbnRlci5hZGRDb250ZW50V2l0aE5ld0xpbmUoeyB0ZXh0OiAnSGlnaCBzZXZlcml0eScsIHN0eWxlOiAnaDInIH0pO1xuICAgICAgICBwcmludGVyLmFkZENvbnRlbnRXaXRoTmV3TGluZSh7XG4gICAgICAgICAgdGV4dDogJ0NsaWNrIG9uIGVhY2ggbGluayB0byByZWFkIG1vcmUgYWJvdXQgZWFjaCBmb3VuZCB2dWxuZXJhYmlsaXR5LicsXG4gICAgICAgICAgc3R5bGU6ICdzdGFuZGFyZCcsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBjdXN0b211bCA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGNyaXRpY2FsIG9mIHRvcEhpZ2hQYWNrYWdlcykge1xuICAgICAgICAgIGN1c3RvbXVsLnB1c2goeyB0ZXh0OiBjcml0aWNhbC5wYWNrYWdlLCBzdHlsZTogJ3N0YW5kYXJkJyB9KTtcbiAgICAgICAgICBjdXN0b211bC5wdXNoKHtcbiAgICAgICAgICAgIHVsOiBjcml0aWNhbC5yZWZlcmVuY2VzLm1hcChpdGVtID0+ICh7XG4gICAgICAgICAgICAgIHRleHQ6IGl0ZW0sXG4gICAgICAgICAgICAgIGNvbG9yOiAnIzFFQTVDOCcsXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY3VzdG9tdWwgJiYgY3VzdG9tdWwubGVuZ3RoICYmIHByaW50ZXIuYWRkQ29udGVudCh7IHVsOiBjdXN0b211bCB9KTtcbiAgICAgICAgcHJpbnRlci5hZGROZXdMaW5lKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8tLS0gU1VNTUFSWSBUQUJMRVNcbiAgICBsZXQgZXh0cmFTdW1tYXJ5VGFibGVzID0gW107XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3VtbWFyeVRhYmxlc0RlZmluaXRpb25zW3NlY3Rpb25dW3RhYl0pKSB7XG4gICAgICBjb25zdCB0YWJsZXNQcm9taXNlcyA9IHN1bW1hcnlUYWJsZXNEZWZpbml0aW9uc1tzZWN0aW9uXVt0YWJdLm1hcChcbiAgICAgICAgc3VtbWFyeVRhYmxlID0+IHtcbiAgICAgICAgICBwcmludGVyLmxvZ2dlci5kZWJ1ZyhgRmV0Y2hpbmcgJHtzdW1tYXJ5VGFibGUudGl0bGV9IFRhYmxlYCk7XG4gICAgICAgICAgY29uc3QgYWxlcnRzU3VtbWFyeVRhYmxlID0gbmV3IFN1bW1hcnlUYWJsZShcbiAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICBmcm9tLFxuICAgICAgICAgICAgdG8sXG4gICAgICAgICAgICBmaWx0ZXJzLFxuICAgICAgICAgICAgYWxsb3dlZEFnZW50c0ZpbHRlcixcbiAgICAgICAgICAgIHN1bW1hcnlUYWJsZSxcbiAgICAgICAgICAgIHBhdHRlcm4sXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gYWxlcnRzU3VtbWFyeVRhYmxlLmZldGNoKCk7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgICAgZXh0cmFTdW1tYXJ5VGFibGVzID0gYXdhaXQgUHJvbWlzZS5hbGwodGFibGVzUHJvbWlzZXMpO1xuICAgIH1cblxuICAgIHJldHVybiBleHRyYVN1bW1hcnlUYWJsZXM7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcHJpbnRlci5sb2dnZXIuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgcmV0dXJuIFByb21pc2UucmVq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