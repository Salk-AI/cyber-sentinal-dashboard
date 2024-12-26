"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateAlert = generateAlert;
exports.generateAlerts = generateAlerts;
var _common = require("./sample-data/common");
var _regulatoryCompliance = require("./sample-data/regulatory-compliance");
var Audit = _interopRequireWildcard(require("./sample-data/audit"));
var Authentication = _interopRequireWildcard(require("./sample-data/authentication"));
var AWS = _interopRequireWildcard(require("./sample-data/aws"));
var IntegrityMonitoring = _interopRequireWildcard(require("./sample-data/integrity-monitoring"));
var CISCAT = _interopRequireWildcard(require("./sample-data/ciscat"));
var GCP = _interopRequireWildcard(require("./sample-data/gcp"));
var Docker = _interopRequireWildcard(require("./sample-data/docker"));
var Mitre = _interopRequireWildcard(require("./sample-data/mitre"));
var Osquery = _interopRequireWildcard(require("./sample-data/osquery"));
var OpenSCAP = _interopRequireWildcard(require("./sample-data/openscap"));
var PolicyMonitoring = _interopRequireWildcard(require("./sample-data/policy-monitoring"));
var Virustotal = _interopRequireWildcard(require("./sample-data/virustotal"));
var Vulnerability = _interopRequireWildcard(require("./sample-data/vulnerabilities"));
var SSH = _interopRequireWildcard(require("./sample-data/ssh"));
var Apache = _interopRequireWildcard(require("./sample-data/apache"));
var Web = _interopRequireWildcard(require("./sample-data/web"));
var GitHub = _interopRequireWildcard(require("./sample-data/github"));
var Office = _interopRequireWildcard(require("./sample-data/office"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/*
 * Wazuh app - Script to generate sample alerts
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

// General

//Alert
const alertIDMax = 6000;

// Rule
const ruleDescription = ['Sample alert 1', 'Sample alert 2', 'Sample alert 3', 'Sample alert 4', 'Sample alert 5'];
const ruleMaxLevel = 15;

/**
 * Generate a alert
 * @param {any} params - params to configure the alert
 * @param {boolean} params.aws - if true, set aws fields
 * @param {boolean} params.audit - if true, set System Auditing fields
 * @param {boolean} params.office - if true, set office fields
 * @param {boolean} params.ciscat - if true, set CIS-CAT fields
 * @param {boolean} params.gcp - if true, set GCP fields
 * @param {boolean} params.docker - if true, set Docker fields
 * @param {boolean} params.mitre - if true, set Mitre att&ck fields
 * @param {boolean} params.openscap - if true, set OpenSCAP fields
 * @param {boolean} params.osquery - if true, set Osquery fields
 * @param {boolean} params.rootcheck - if true, set Policy monitoring fields
 * @param {boolean} params.syscheck - if true, set integrity monitoring fields
 * @param {boolean} params.virustotal - if true, set VirusTotal fields
 * @param {boolean} params.vulnerabilities - if true, set vulnerabilities fields
 * @param {boolean} params.pci_dss - if true, set pci_dss fields
 * @param {boolean} params.gdpr - if true, set gdpr fields
 * @param {boolean} params.gpg13 - if true, set gpg13 fields
 * @param {boolean} params.hipaa - if true, set hipaa fields
 * @param {boolean} params.nist_800_53 - if true, set nist_800_53 fields
 * @param {boolean} params.nist_800_53 - if true, set nist_800_53 fields
 * @param {boolean} params.win_authentication_failed - if true, add win_authentication_failed to rule.groups
 * @param {number} params.probability_win_authentication_failed - probability to add win_authentication_failed to rule.groups. Example: 20 will be 20% of probability to add this to rule.groups
 * @param {boolean} params.authentication_failed - if true, add win_authentication_failed to rule.groups
 * @param {number} params.probability_authentication_failed - probability to add authentication_failed to rule.groups
 * @param {boolean} params.authentication_failures - if true, add win_authentication_failed to rule.groups
 * @param {number} params.probability_authentication_failures - probability to add authentication_failures to rule.groups
 * @return {any} - Alert generated
 */
function generateAlert(params) {
  let alert = {
    ['@sampledata']: true,
    timestamp: '2020-01-27T11:08:47.777+0000',
    rule: {
      level: 3,
      description: 'Sample alert',
      id: '5502',
      mail: false,
      groups: []
    },
    agent: {
      id: '000',
      name: 'master'
    },
    manager: {
      name: 'master'
    },
    cluster: {
      name: 'wazuh'
    },
    id: '1580123327.49031',
    predecoder: {},
    decoder: {},
    data: {},
    location: ''
  };
  alert.agent = (0, _common.randomArrayItem)(_common.Agents);
  alert.rule.description = (0, _common.randomArrayItem)(ruleDescription);
  alert.rule.id = `${randomIntervalInteger(1, alertIDMax)}`;
  alert.rule.level = randomIntervalInteger(1, ruleMaxLevel);
  alert.timestamp = randomDate();
  if (params.manager) {
    if (params.manager.name) {
      alert.manager.name = params.manager.name;
    }
  }
  if (params.cluster) {
    if (params.cluster.name) {
      alert.cluster.name = params.cluster.name;
    }
    if (params.cluster.node) {
      alert.cluster.node = params.cluster.node;
    }
  }
  if (params.aws) {
    let randomType = (0, _common.randomArrayItem)(['guarddutyPortProbe', 'apiCall', 'networkConnection', 'iamPolicyGrantGlobal']);
    const beforeDate = new Date(new Date(alert.timestamp) - 3 * 24 * 60 * 60 * 1000);
    switch (randomType) {
      case 'guarddutyPortProbe':
        {
          const typeAlert = AWS.guarddutyPortProbe;
          alert.data = {
            ...typeAlert.data
          };
          alert.data.integration = 'aws';
          alert.data.aws.region = (0, _common.randomArrayItem)(AWS.region);
          alert.data.aws.resource.instanceDetails = {
            ...(0, _common.randomArrayItem)(AWS.instanceDetails)
          };
          alert.data.aws.resource.instanceDetails.iamInstanceProfile.arn = interpolateAlertProps(typeAlert.data.aws.resource.instanceDetails.iamInstanceProfile.arn, alert);
          alert.data.aws.title = interpolateAlertProps(alert.data.aws.title, alert);
          alert.data.aws.accountId = (0, _common.randomArrayItem)(AWS.accountId);
          alert.data.aws.service.eventFirstSeen = formatDate(beforeDate, 'Y-M-DTh:m:s.lZ');
          alert.data.aws.service.eventLastSeen = formatDate(new Date(alert.timestamp), 'Y-M-DTh:m:s.lZ');
          alert.data.aws.service.action.portProbeAction.portProbeDetails.remoteIpDetails = {
            ...(0, _common.randomArrayItem)(AWS.remoteIpDetails)
          };
          alert.data.aws.log_info = {
            s3bucket: (0, _common.randomArrayItem)(AWS.buckets),
            log_file: `guardduty/${formatDate(new Date(alert.timestamp), 'Y/M/D/h')}/firehose_guardduty-1-${formatDate(new Date(alert.timestamp), 'Y-M-D-h-m-s-l')}b5b9b-ec62-4a07-85d7-b1699b9c031e.zip`
          };
          alert.data.aws.service.count = `${randomIntervalInteger(400, 4000)}`;
          alert.data.aws.createdAt = formatDate(beforeDate, 'Y-M-DTh:m:s.lZ');
          alert.rule = {
            ...typeAlert.rule
          };
          alert.rule.firedtimes = randomIntervalInteger(1, 50);
          alert.rule.description = interpolateAlertProps(typeAlert.rule.description, alert);
          alert.decoder = {
            ...typeAlert.decoder
          };
          alert.location = typeAlert.location;
          break;
        }
      case 'apiCall':
        {
          const typeAlert = AWS.apiCall;
          alert.data = {
            ...typeAlert.data
          };
          alert.data.integration = 'aws';
          alert.data.aws.region = (0, _common.randomArrayItem)(AWS.region);
          alert.data.aws.resource.accessKeyDetails.userName = (0, _common.randomArrayItem)(_common.Users);
          alert.data.aws.log_info = {
            s3bucket: (0, _common.randomArrayItem)(AWS.buckets),
            log_file: `guardduty/${formatDate(new Date(alert.timestamp), 'Y/M/D/h')}/firehose_guardduty-1-${formatDate(new Date(alert.timestamp), 'Y-M-D-h-m-s-l')}b5b9b-ec62-4a07-85d7-b1699b9c031e.zip`
          };
          alert.data.aws.accountId = (0, _common.randomArrayItem)(AWS.accountId);
          alert.data.aws.service.action.awsApiCallAction.remoteIpDetails = {
            ...(0, _common.randomArrayItem)(AWS.remoteIpDetails)
          };
          alert.data.aws.service.eventFirstSeen = formatDate(beforeDate, 'Y-M-DTh:m:s.lZ');
          alert.data.aws.service.eventLastSeen = formatDate(new Date(alert.timestamp), 'Y-M-DTh:m:s.lZ');
          alert.data.aws.createdAt = formatDate(beforeDate, 'Y-M-DTh:m:s.lZ');
          alert.data.aws.title = interpolateAlertProps(alert.data.aws.title, alert);
          alert.data.aws.description = interpolateAlertProps(alert.data.aws.description, alert);
          const count = `${randomIntervalInteger(400, 4000)}`;
          alert.data.aws.service.additionalInfo.recentApiCalls.count = count;
          alert.data.aws.service.count = count;
          alert.rule = {
            ...typeAlert.rule
          };
          alert.rule.firedtimes = randomIntervalInteger(1, 50);
          alert.rule.description = interpolateAlertProps(typeAlert.rule.description, alert);
          alert.decoder = {
            ...typeAlert.decoder
          };
          alert.location = typeAlert.location;
          break;
        }
      case 'networkConnection':
        {
          const typeAlert = AWS.networkConnection;
          alert.data = {
            ...typeAlert.data
          };
          alert.data.integration = 'aws';
          alert.data.aws.region = (0, _common.randomArrayItem)(AWS.region);
          alert.data.aws.resource.instanceDetails = {
            ...(0, _common.randomArrayItem)(AWS.instanceDetails)
          };
          alert.data.aws.log_info = {
            s3bucket: (0, _common.randomArrayItem)(AWS.buckets),
            log_file: `guardduty/${formatDate(new Date(alert.timestamp), 'Y/M/D/h')}/firehose_guardduty-1-${formatDate(new Date(alert.timestamp), 'Y-M-D-h-m-s-l')}b5b9b-ec62-4a07-85d7-b1699b9c031e.zip`
          };
          alert.data.aws.description = interpolateAlertProps(alert.data.aws.description, alert);
          alert.data.aws.title = interpolateAlertProps(alert.data.aws.title, alert);
          alert.data.aws.accountId = (0, _common.randomArrayItem)(AWS.accountId);
          alert.data.aws.createdAt = formatDate(beforeDate, 'Y-M-DTh:m:s.lZ');
          alert.data.aws.service.action.networkConnectionAction.remoteIpDetails = {
            ...(0, _common.randomArrayItem)(AWS.remoteIpDetails)
          };
          alert.data.aws.service.eventFirstSeen = formatDate(beforeDate, 'Y-M-DTh:m:s.lZ');
          alert.data.aws.service.eventLastSeen = formatDate(new Date(alert.timestamp), 'Y-M-DTh:m:s.lZ');
          alert.data.aws.service.additionalInfo = {
            localPort: `${(0, _common.randomArrayItem)(_common.Ports)}`,
            outBytes: `${randomIntervalInteger(1000, 3000)}`,
            inBytes: `${randomIntervalInteger(1000, 10000)}`,
            unusual: `${randomIntervalInteger(1000, 10000)}`
          };
          alert.data.aws.service.count = `${randomIntervalInteger(400, 4000)}`;
          alert.data.aws.service.action.networkConnectionAction.localIpDetails.ipAddressV4 = alert.data.aws.resource.instanceDetails.networkInterfaces.privateIpAddress;
          alert.data.aws.arn = interpolateAlertProps(typeAlert.data.aws.arn, alert);
          alert.rule = {
            ...typeAlert.rule
          };
          alert.rule.firedtimes = randomIntervalInteger(1, 50);
          alert.rule.description = interpolateAlertProps(typeAlert.rule.description, alert);
          alert.decoder = {
            ...typeAlert.decoder
          };
          alert.location = typeAlert.location;
          break;
        }
      case 'iamPolicyGrantGlobal':
        {
          const typeAlert = AWS.iamPolicyGrantGlobal;
          alert.data = {
            ...typeAlert.data
          };
          alert.data.integration = 'aws';
          alert.data.aws.region = (0, _common.randomArrayItem)(AWS.region);
          alert.data.aws.summary.Timestamps = formatDate(beforeDate, 'Y-M-DTh:m:s.lZ');
          alert.data.aws.log_info = {
            s3bucket: (0, _common.randomArrayItem)(AWS.buckets),
            log_file: `macie/${formatDate(new Date(alert.timestamp), 'Y/M/D/h')}/firehose_macie-1-${formatDate(new Date(alert.timestamp), 'Y-M-D-h-m-s')}-0b1ede94-f399-4e54-8815-1c6587eee3b1//firehose_guardduty-1-${formatDate(new Date(alert.timestamp), 'Y-M-D-h-m-s-l')}b5b9b-ec62-4a07-85d7-b1699b9c031e.zip`
          };
          alert.data.aws['created-at'] = formatDate(beforeDate, 'Y-M-DTh:m:s.lZ');
          alert.data.aws.url = interpolateAlertProps(typeAlert.data.aws.url, alert);
          alert.data.aws['alert-arn'] = interpolateAlertProps(typeAlert.data.aws['alert-arn'], alert);
          alert.rule = {
            ...typeAlert.rule
          };
          alert.rule.firedtimes = randomIntervalInteger(1, 50);
          alert.decoder = {
            ...typeAlert.decoder
          };
          alert.location = typeAlert.location;
          break;
        }
      default:
        {}
    }
    alert.input = {
      type: 'log'
    };
    alert.GeoLocation = (0, _common.randomArrayItem)(_common.GeoLocation);
  }
  if (params.office) {
    alert.agent = {
      id: '000',
      ip: alert.agent.ip,
      name: alert.agent.name
    };
    if (params.manager && params.manager.name) {
      alert.agent.name = params.manager.name;
    }
    const beforeDate = new Date(new Date(alert.timestamp) - 3 * 24 * 60 * 60 * 1000);
    const IntraID = (0, _common.randomArrayItem)(Office.arrayUuidOffice);
    const OrgID = (0, _common.randomArrayItem)(Office.arrayUuidOffice);
    const objID = (0, _common.randomArrayItem)(Office.arrayUuidOffice);
    const userKey = (0, _common.randomArrayItem)(Office.arrayUuidOffice);
    const userID = (0, _common.randomArrayItem)(Office.arrayUserId);
    const userType = (0, _common.randomArrayItem)([0, 2, 4]);
    const resultStatus = (0, _common.randomArrayItem)(['Succeeded', 'PartiallySucceeded', 'Failed']);
    const log = (0, _common.randomArrayItem)(Office.arrayLogs);
    const ruleData = Office.officeRules[log.RecordType];
    alert.agent.id = '000';
    alert.rule = ruleData.rule;
    alert.decoder = (0, _common.randomArrayItem)(Office.arrayDecoderOffice);
    alert.GeoLocation = (0, _common.randomArrayItem)(_common.GeoLocation);
    alert.data.integration = 'Office365';
    alert.location = Office.arrayLocationOffice;
    alert.data.office365 = {
      ...log,
      ...ruleData.data.office365,
      Id: IntraID,
      CreationTime: formatDate(beforeDate, 'Y-M-DTh:m:s.lZ'),
      OrganizationId: OrgID,
      UserType: userType,
      UserKey: userKey,
      ResultStatus: resultStatus,
      ObjectId: objID,
      UserId: userID,
      ClientIP: (0, _common.randomArrayItem)(Office.arrayIp)
    };
  }
  if (params.gcp) {
    alert.rule = (0, _common.randomArrayItem)(GCP.arrayRules);
    alert.data.integration = 'gcp';
    alert.data.gcp = {
      insertId: 'uk1zpe23xcj',
      jsonPayload: {
        authAnswer: GCP.arrayAuthAnswer[Math.floor(GCP.arrayAuthAnswer.length * Math.random())],
        protocol: GCP.arrayProtocol[Math.floor(GCP.arrayProtocol.length * Math.random())],
        queryName: GCP.arrayQueryName[Math.floor(GCP.arrayQueryName.length * Math.random())],
        queryType: GCP.arrayQueryType[Math.floor(GCP.arrayQueryType.length * Math.random())],
        responseCode: GCP.arrayResponseCode[Math.floor(GCP.arrayResponseCode.length * Math.random())],
        sourceIP: GCP.arraySourceIP[Math.floor(GCP.arraySourceIP.length * Math.random())],
        vmInstanceId: '4980113928800839680.000000',
        vmInstanceName: '531339229531.instance-1'
      },
      logName: 'projects/wazuh-dev/logs/dns.googleapis.com%2Fdns_queries',
      receiveTimestamp: '2019-11-11T02:42:05.05853152Z',
      resource: {
        labels: {
          location: GCP.arrayLocation[Math.floor(GCP.arrayLocation.length * Math.random())],
          project_id: GCP.arrayProject[Math.floor(GCP.arrayProject.length * Math.random())],
          source_type: GCP.arraySourceType[Math.floor(GCP.arraySourceType.length * Math.random())],
          target_type: 'external'
        },
        type: GCP.arrayType[Math.floor(GCP.arrayType.length * Math.random())]
      },
      severity: GCP.arraySeverity[Math.floor(GCP.arraySeverity.length * Math.random())],
      timestamp: '2019-11-11T02:42:04.34921449Z'
    };
    alert.GeoLocation = (0, _common.randomArrayItem)(_common.GeoLocation);
  }
  if (params.audit) {
    let dataAudit = (0, _common.randomArrayItem)(Audit.dataAudit);
    alert.data = dataAudit.data;
    alert.data.audit.file ? alert.data.audit.file.name === '' ? alert.data.audit.file.name = (0, _common.randomArrayItem)(Audit.fileName) : null : null;
    alert.rule = dataAudit.rule;
  }
  if (params.ciscat) {
    alert.rule.groups.push('ciscat');
    alert.data.cis = {};
    alert.data.cis.group = (0, _common.randomArrayItem)(CISCAT.group);
    alert.data.cis.fail = randomIntervalInteger(0, 100);
    alert.data.cis.rule_title = (0, _common.randomArrayItem)(CISCAT.ruleTitle);
    alert.data.cis.notchecked = randomIntervalInteger(0, 100);
    alert.data.cis.score = randomIntervalInteger(0, 100);
    alert.data.cis.pass = randomIntervalInteger(0, 100);
    alert.data.cis.timestamp = new Date(randomDate());
    alert.data.cis.error = randomIntervalInteger(0, 1);
    alert.data.cis.benchmark = (0, _common.randomArrayItem)(CISCAT.benchmark);
    alert.data.cis.unknown = randomIntervalInteger(0, 100);
    alert.data.cis.notchecked = randomIntervalInteger(0, 5);
    alert.data.cis.result = (0, _common.randomArrayItem)(CISCAT.result);
  }
  if (params.docker) {
    const dataDocker = (0, _common.randomArrayItem)(Docker.dataDocker);
    alert.data = {};
    alert.data = dataDocker.data;
    alert.rule = dataDocker.rule;
  }
  if (params.mitre) {
    alert.rule = (0, _common.randomArrayItem)(Mitre.arrayMitreRules);
    alert.location = (0, _common.randomArrayItem)(Mitre.arrayLocation);
  }
  if (params.openscap) {
    alert.data = {};
    alert.data.oscap = {};
    const typeAlert = {
      ...(0, _common.randomArrayItem)(OpenSCAP.data)
    };
    alert.data = {
      ...typeAlert.data
    };
    alert.rule = {
      ...typeAlert.rule
    };
    alert.rule.firedtimes = randomIntervalInteger(2, 10);
    alert.input = {
      type: 'log'
    };
    alert.decoder = {
      ...OpenSCAP.decoder
    };
    alert.location = OpenSCAP.location;
    if (typeAlert.full_log) {
      alert.full_log = interpolateAlertProps(typeAlert.full_log, alert);
    }
  }
  if (params.rootcheck) {
    alert.location = PolicyMonitoring.location;
    alert.decoder = {
      ...PolicyMonitoring.decoder
    };
    alert.input = {
      type: 'log'
    };
    const alertCategory = (0, _common.randomArrayItem)(['Rootkit', 'Trojan']);
    switch (alertCategory) {
      case 'Rootkit':
        {
          const rootkitCategory = (0, _common.randomArrayItem)(Object.keys(PolicyMonitoring.rootkits));
          const rootkit = (0, _common.randomArrayItem)(PolicyMonitoring.rootkits[rootkitCategory]);
          alert.data = {
            title: interpolateAlertProps(PolicyMonitoring.rootkitsData.data.title, alert, {
              _rootkit_category: rootkitCategory,
              _rootkit_file: rootkit
            })
          };
          alert.rule = {
            ...PolicyMonitoring.rootkitsData.rule
          };
          alert.rule.firedtimes = randomIntervalInteger(1, 10);
          alert.full_log = alert.data.title;
          break;
        }
      case 'Trojan':
        {
          const trojan = (0, _common.randomArrayItem)(PolicyMonitoring.trojans);
          alert.data = {
            file: trojan.file,
            title: 'Trojaned version of file detected.'
          };
          alert.rule = {
            ...PolicyMonitoring.trojansData.rule
          };
          alert.rule.firedtimes = randomIntervalInteger(1, 10);
          alert.full_log = interpolateAlertProps(PolicyMonitoring.trojansData.full_log, alert, {
            _trojan_signature: trojan.signature
          });
          break;
        }
      default:
        {}
    }
  }
  if (params.syscheck) {
    alert.rule.groups.push('syscheck');
    alert.syscheck = {};
    alert.syscheck.event = (0, _common.randomArrayItem)(IntegrityMonitoring.events);
    alert.syscheck.path = (0, _common.randomArrayItem)(alert.agent.name === 'Windows' ? IntegrityMonitoring.pathsWindows : IntegrityMonitoring.pathsLinux);
    alert.syscheck.uname_after = (0, _common.randomArrayItem)(_common.Users);
    alert.syscheck.gname_after = 'root';
    alert.syscheck.mtime_after = new Date(randomDate());
    alert.syscheck.size_after = randomIntervalInteger(0, 65);
    alert.syscheck.uid_after = (0, _common.randomArrayItem)(IntegrityMonitoring.uid_after);
    alert.syscheck.gid_after = (0, _common.randomArrayItem)(IntegrityMonitoring.gid_after);
    alert.syscheck.perm_after = 'rw-r--r--';
    alert.syscheck.inode_after = randomIntervalInteger(0, 100000);
    switch (alert.syscheck.event) {
      case 'added':
        alert.rule = IntegrityMonitoring.regulatory[0];
        break;
      case 'modified':
        alert.rule = IntegrityMonitoring.regulatory[1];
        alert.syscheck.mtime_before = new Date(alert.syscheck.mtime_after.getTime() - 1000 * 60);
        alert.syscheck.inode_before = randomIntervalInteger(0, 100000);
        alert.syscheck.sha1_after = (0, _common.randomElements)(40, 'abcdef0123456789');
        alert.syscheck.changed_attributes = [(0, _common.randomArrayItem)(IntegrityMonitoring.attributes)];
        alert.syscheck.md5_after = (0, _common.randomElements)(32, 'abcdef0123456789');
        alert.syscheck.sha256_after = (0, _common.randomElements)(64, 'abcdef0123456789');
        break;
      case 'deleted':
        alert.rule = IntegrityMonitoring.regulatory[2];
        alert.syscheck.tags = [(0, _common.randomArrayItem)(IntegrityMonitoring.tags)];
        alert.syscheck.sha1_after = (0, _common.randomElements)(40, 'abcdef0123456789');
        alert.syscheck.audit = {
          process: {
            name: (0, _common.randomArrayItem)(_common.Paths),
            id: randomIntervalInteger(0, 100000),
            ppid: randomIntervalInteger(0, 100000)
          },
          effective_user: {
            name: (0, _common.randomArrayItem)(_common.Users),
            id: randomIntervalInteger(0, 100)
          },
          user: {
            name: (0, _common.randomArrayItem)(_common.Users),
            id: randomIntervalInteger(0, 100)
          },
          group: {
            name: (0, _common.randomArrayItem)(_common.Users),
            id: randomIntervalInteger(0, 100)
          }
        };
        alert.syscheck.md5_after = (0, _common.randomElements)(32, 'abcdef0123456789');
        alert.syscheck.sha256_after = (0, _common.randomElements)(64, 'abcdef0123456789');
        break;
      default:
        {}
    }
  }
  if (params.virustotal) {
    alert.rule.groups.push('virustotal');
    alert.location = 'virustotal';
    alert.data.virustotal = {};
    alert.data.virustotal.found = (0, _common.randomArrayItem)(['0', '1', '1', '1']);
    alert.data.virustotal.source = {
      sha1: (0, _common.randomElements)(40, 'abcdef0123456789'),
      file: (0, _common.randomArrayItem)(Virustotal.sourceFile),
      alert_id: `${(0, _common.randomElements)(10, '0123456789')}.${(0, _common.randomElements)(7, '0123456789')}`,
      md5: (0, _common.randomElements)(32, 'abcdef0123456789')
    };
    if (alert.data.virustotal.found === '1') {
      alert.data.virustotal.malicious = (0, _common.randomArrayItem)(Virustotal.malicious);
      alert.data.virustotal.positives = `${randomIntervalInteger(0, 65)}`;
      alert.data.virustotal.total = alert.data.virustotal.malicious + alert.data.virustotal.positives;
      alert.rule.description = `VirusTotal: Alert - ${alert.data.virustotal.source.file} - ${alert.data.virustotal.positives} engines detected this file`;
      alert.data.virustotal.permalink = (0, _common.randomArrayItem)(Virustotal.permalink);
      alert.data.virustotal.scan_date = new Date(Date.parse(alert.timestamp) - 4 * 60000);
    } else {
      alert.data.virustotal.malicious = '0';
      alert.rule.description = 'VirusTotal: Alert - No records in VirusTotal database';
    }
  }
  if (params.vulnerabilities) {
    const dataVulnerability = (0, _common.randomArrayItem)(Vulnerability.data);
    alert.rule = {
      ...dataVulnerability.rule,
      mail: false,
      groups: ['vulnerability-detector'],
      gdpr: ['IV_35.7.d'],
      pci_dss: ['11.2.1', '11.2.3'],
      tsc: ['CC7.1', 'CC7.2']
    };
    alert.location = 'vulnerability-detector';
    alert.decoder = {
      name: 'json'
    };
    alert.data = {
      ...dataVulnerability.data
    };
  }
  if (params.osquery) {
    alert.rule.groups.push('osquery');
    alert.data.osquery = {};
    if (randomIntervalInteger(0, 5) === 0) {
      alert.rule.description = 'osquery error message';
    } else {
      let dataOsquery = (0, _common.randomArrayItem)(Osquery.dataOsquery);
      alert.data.osquery = dataOsquery.osquery;
      alert.data.osquery.calendarTime = alert.timestamp;
      alert.rule.description = dataOsquery.rule.description;
      randomIntervalInteger(0, 99) === 0 ? alert.data.osquery.action = 'removed' : null;
    }
  }

  // Regulatory compliance
  if (params.pci_dss || params.regulatory_compliance || params.random_probability_regulatory_compliance && randomProbability(params.random_probability_regulatory_compliance)) {
    alert.rule.pci_dss = [(0, _common.randomArrayItem)(_regulatoryCompliance.PCI_DSS)];
  }
  if (params.gdpr || params.regulatory_compliance || params.random_probability_regulatory_compliance && randomProbability(params.random_probability_regulatory_compliance)) {
    alert.rule.gdpr = [(0, _common.randomArrayItem)(_regulatoryCompliance.GDPR)];
  }
  if (params.gpg13 || params.regulatory_compliance || params.random_probability_regulatory_compliance && randomProbability(params.random_probability_regulatory_compliance)) {
    alert.rule.gpg13 = [(0, _common.randomArrayItem)(_regulatoryCompliance.GPG13)];
  }
  if (params.hipaa || params.regulatory_compliance || params.random_probability_regulatory_compliance && randomIntervalInteger(params.random_probability_regulatory_compliance)) {
    alert.rule.hipaa = [(0, _common.randomArrayItem)(_regulatoryCompliance.HIPAA)];
  }
  if (params.nist_800_83 || params.regulatory_compliance || params.random_probability_regulatory_compliance && randomIntervalInteger(params.random_probability_regulatory_compliance)) {
    alert.rule.nist_800_53 = [(0, _common.randomArrayItem)(_regulatoryCompliance.NIST_800_53)];
  }
  if (params.authentication) {
    alert.data = {
      srcip: (0, _common.randomArrayItem)(_common.IPs),
      srcuser: (0, _common.randomArrayItem)(_common.Users),
      srcport: (0, _common.randomArrayItem)(_common.Ports)
    };
    alert.GeoLocation = (0, _common.randomArrayItem)(_common.GeoLocation);
    alert.decoder = {
      name: 'sshd',
      parent: 'sshd'
    };
    alert.input = {
      type: 'log'
    };
    alert.predecoder = {
      program_name: 'sshd',
      timestamp: formatDate(new Date(alert.timestamp), 'N D h:m:s'),
      hostname: alert.manager.name
    };
    let typeAlert = (0, _common.randomArrayItem)(['invalidLoginPassword', 'invalidLoginUser', 'multipleAuthenticationFailures', 'windowsInvalidLoginPassword', 'userLoginFailed', 'passwordCheckFailed', 'nonExistentUser', 'bruteForceTryingAccessSystem', 'authenticationSuccess', 'maximumAuthenticationAttemptsExceeded']);
    switch (typeAlert) {
      case 'invalidLoginPassword':
        {
          alert.location = Authentication.invalidLoginPassword.location;
          alert.rule = {
            ...Authentication.invalidLoginPassword.rule
          };
          alert.rule.groups = [...Authentication.invalidLoginPassword.rule.groups];
          alert.full_log = interpolateAlertProps(Authentication.invalidLoginPassword.full_log, alert);
          break;
        }
      case 'invalidLoginUser':
        {
          alert.location = Authentication.invalidLoginUser.location;
          alert.rule = {
            ...Authentication.invalidLoginUser.rule
          };
          alert.rule.groups = [...Authentication.invalidLoginUser.rule.groups];
          alert.full_log = interpolateAlertProps(Authentication.invalidLoginUser.full_log, alert);
          break;
        }
      case 'multipleAuthenticationFailures':
        {
          alert.location = Authentication.multipleAuthenticationFailures.location;
          alert.rule = {
            ...Authentication.multipleAuthenticationFailures.rule
          };
          alert.rule.groups = [...Authentication.multipleAuthenticationFailures.rule.groups];
          alert.rule.frequency = randomIntervalInteger(5, 50);
          alert.full_log = interpolateAlertProps(Authentication.multipleAuthenticationFailures.full_log, alert);
          break;
        }
      case 'windowsInvalidLoginPassword':
        {
          alert.location = Authentication.windowsInvalidLoginPassword.location;
          alert.rule = {
            ...Authentication.windowsInvalidLoginPassword.rule
          };
          alert.rule.groups = [...Authentication.windowsInvalidLoginPassword.rule.groups];
          alert.rule.frequency = randomIntervalInteger(5, 50);
          alert.data.win = {
            ...Authentication.windowsInvalidLoginPassword.data_win
          };
          alert.data.win.eventdata.ipAddress = (0, _common.randomArrayItem)(_common.IPs);
          alert.data.win.eventdata.ipPort = (0, _common.randomArrayItem)(_common.Ports);
          alert.data.win.system.computer = (0, _common.randomArrayItem)(_common.Win_Hostnames);
          alert.data.win.system.eventID = `${randomIntervalInteger(1, 600)}`;
          alert.data.win.system.eventRecordID = `${randomIntervalInteger(10000, 50000)}`;
          alert.data.win.system.processID = `${randomIntervalInteger(1, 1200)}`;
          alert.data.win.system.systemTime = alert.timestamp;
          alert.data.win.system.processID = `${randomIntervalInteger(1, 1200)}`;
          alert.data.win.system.task = `${randomIntervalInteger(1, 1800)}`;
          alert.data.win.system.threadID = `${randomIntervalInteger(1, 500)}`;
          alert.full_log = interpolateAlertProps(Authentication.windowsInvalidLoginPassword.full_log, alert);
          break;
        }
      case 'userLoginFailed':
        {
          alert.location = Authentication.userLoginFailed.location;
          alert.rule = {
            ...Authentication.userLoginFailed.rule
          };
          alert.rule.groups = [...Authentication.userLoginFailed.rule.groups];
          alert.data = {
            srcip: (0, _common.randomArrayItem)(_common.IPs),
            dstuser: (0, _common.randomArrayItem)(_common.Users),
            uid: `${randomIntervalInteger(0, 50)}`,
            euid: `${randomIntervalInteger(0, 50)}`,
            tty: 'ssh'
          };
          alert.decoder = {
            ...Authentication.userLoginFailed.decoder
          };
          alert.full_log = interpolateAlertProps(Authentication.userLoginFailed.full_log, alert);
          break;
        }
      case 'passwordCheckFailed':
        {
          alert.location = Authentication.passwordCheckFailed.location;
          alert.rule = {
            ...Authentication.passwordCheckFailed.rule
          };
          alert.rule.groups = [...Authentication.passwordCheckFailed.rule.groups];
          alert.data = {
            srcuser: (0, _common.randomArrayItem)(_common.Users)
          };
          alert.predecoder.program_name = 'unix_chkpwd';
          alert.decoder = {
            ...Authentication.passwordCheckFailed.decoder
          };
          alert.full_log = interpolateAlertProps(Authentication.passwordCheckFailed.full_log, alert);
          break;
        }
      case 'nonExistentUser':
        {
          alert.location = Authentication.nonExistentUser.location;
          alert.rule = {
            ...Authentication.nonExistentUser.rule
          };
          alert.rule.groups = [...Authentication.nonExistentUser.rule.groups];
          alert.full_log = interpolateAlertProps(Authentication.nonExistentUser.full_log, alert);
          break;
        }
      case 'bruteForceTryingAccessSystem':
        {
          alert.location = Authentication.bruteForceTryingAccessSystem.location;
          alert.rule = {
            ...Authentication.bruteForceTryingAccessSystem.rule
          };
          alert.rule.groups = [...Authentication.bruteForceTryingAccessSystem.rule.groups];
          alert.full_log = interpolateAlertProps(Authentication.bruteForceTryingAccessSystem.full_log, alert);
          break;
        }
      case 'reverseLoockupError':
        {
          alert.location = Authentication.reverseLoockupError.location;
          alert.rule = {
            ...Authentication.reverseLoockupError.rule
          };
          alert.rule.groups = [...Authentication.reverseLoockupError.rule.groups];
          alert.data = {
            srcip: (0, _common.randomArrayItem)(_common.IPs)
          };
          alert.full_log = interpolateAlertProps(Authentication.reverseLoockupError.full_log, alert);
        }
      case 'insecureConnectionAttempt':
        {
          alert.location = Authentication.insecureConnectionAttempt.location;
          alert.rule = {
            ...Authentication.insecureConnectionAttempt.rule
          };
          alert.rule.groups = [...Authentication.insecureConnectionAttempt.rule.groups];
          alert.data = {
            srcip: (0, _common.randomArrayItem)(_common.IPs),
            srcport: (0, _common.randomArrayItem)(_common.Ports)
          };
          alert.full_log = interpolateAlertProps(Authentication.insecureConnectionAttempt.full_log, alert);
        }
      case 'authenticationSuccess':
        {
          alert.location = Authentication.authenticationSuccess.location;
          alert.rule = {
            ...Authentication.authenticationSuccess.rule
          };
          alert.rule.groups = [...Authentication.authenticationSuccess.rule.groups];
          alert.data = {
            srcip: (0, _common.randomArrayItem)(_common.IPs),
            srcport: (0, _common.randomArrayItem)(_common.Ports),
            dstuser: (0, _common.randomArrayItem)(_common.Users)
          };
          alert.full_log = interpolateAlertProps(Authentication.authenticationSuccess.full_log, alert);
        }
      case 'maximumAuthenticationAttemptsExceeded':
        {
          alert.location = Authentication.maximumAuthenticationAttemptsExceeded.location;
          alert.rule = {
            ...Authentication.maximumAuthenticationAttemptsExceeded.rule
          };
          alert.rule.groups = [...Authentication.maximumAuthenticationAttemptsExceeded.rule.groups];
          alert.data = {
            srcip: (0, _common.randomArrayItem)(_common.IPs),
            srcport: (0, _common.randomArrayItem)(_common.Ports),
            dstuser: (0, _common.randomArrayItem)(_common.Users)
          };
          alert.full_log = interpolateAlertProps(Authentication.maximumAuthenticationAttemptsExceeded.full_log, alert);
        }
      default:
        {}
    }
    alert.rule.firedtimes = randomIntervalInteger(2, 15);
    alert.rule.tsc = [(0, _common.randomArrayItem)(_regulatoryCompliance.tsc)];
  }
  if (params.ssh) {
    alert.data = {
      srcip: (0, _common.randomArrayItem)(_common.IPs),
      srcuser: (0, _common.randomArrayItem)(_common.Users),
      srcport: (0, _common.randomArrayItem)(_common.Ports)
    };
    alert.GeoLocation = (0, _common.randomArrayItem)(_common.GeoLocation);
    alert.decoder = {
      name: 'sshd',
      parent: 'sshd'
    };
    alert.input = {
      type: 'log'
    };
    alert.predecoder = {
      program_name: 'sshd',
      timestamp: formatDate(new Date(alert.timestamp), 'N D h:m:s'),
      hostname: alert.manager.name
    };
    const typeAlert = (0, _common.randomArrayItem)(SSH.data);
    alert.location = typeAlert.location;
    alert.rule = {
      ...typeAlert.rule
    };
    alert.rule.groups = [...typeAlert.rule.groups];
    alert.rule.firedtimes = randomIntervalInteger(1, 15);
    alert.full_log = interpolateAlertProps(typeAlert.full_log, alert);
  }
  if (params.windows) {
    alert.rule.groups.push('windows');
    if (params.windows.service_control_manager) {
      alert.predecoder = {
        program_name: 'WinEvtLog',
        timestamp: '2020 Apr 17 05:59:05'
      };
      alert.input = {
        type: 'log'
      };
      alert.data = {
        extra_data: 'Service Control Manager',
        dstuser: 'SYSTEM',
        system_name: (0, _common.randomArrayItem)(_common.Win_Hostnames),
        id: '7040',
        type: 'type',
        status: 'INFORMATION'
      };
      alert.rule.description = 'Windows: Service startup type was changed.';
      alert.rule.firedtimes = randomIntervalInteger(1, 20);
      alert.rule.mail = false;
      alert.rule.level = 3;
      alert.rule.groups.push('windows', 'policy_changed');
      alert.rule.pci = ['10.6'];
      alert.rule.hipaa = ['164.312.b'];
      alert.rule.gdpr = ['IV_35.7.d'];
      alert.rule.nist_800_53 = ['AU.6'];
      alert.rule.info = 'This does not appear to be logged on Windows 2000.';
      alert.location = 'WinEvtLog';
      alert.decoder = {
        parent: 'windows',
        name: 'windows'
      };
      alert.full_log = `2020 Apr 17 05:59:05 WinEvtLog: type: INFORMATION(7040): Service Control Manager: SYSTEM: NT AUTHORITY: ${alert.data.system_name}: Background Intelligent Transfer Service auto start demand start BITS `; //TODO: date
      alert.id = 18145;
      alert.fields = {
        timestamp: alert.timestamp
      };
    }
  }
  if (params.apache) {
    const typeAlert = {
      ...Apache.data[0]
    }; // there is only one type alert in data array at the moment. Randomize if add more type of alerts to data array
    alert.data = {
      srcip: (0, _common.randomArrayItem)(_common.IPs),
      srcport: (0, _common.randomArrayItem)(_common.Ports),
      id: `AH${randomIntervalInteger(10000, 99999)}`
    };
    alert.GeoLocation = {
      ...(0, _common.randomArrayItem)(_common.GeoLocation)
    };
    alert.rule = {
      ...typeAlert.rule
    };
    alert.rule.firedtimes = randomIntervalInteger(2, 10);
    alert.input = {
      type: 'log'
    };
    alert.location = Apache.location;
    alert.decoder = {
      ...Apache.decoder
    };
    alert.full_log = interpolateAlertProps(typeAlert.full_log, alert, {
      _timestamp_apache: formatDate(new Date(alert.timestamp), 'E N D h:m:s.l Y'),
      _pi_id: randomIntervalInteger(10000, 30000)
    });
  }
  if (params.web) {
    alert.input = {
      type: 'log'
    };
    alert.data = {
      protocol: 'GET',
      srcip: (0, _common.randomArrayItem)(_common.IPs),
      id: '404',
      url: (0, _common.randomArrayItem)(Web.urls)
    };
    alert.GeoLocation = {
      ...(0, _common.randomArrayItem)(_common.GeoLocation)
    };
    const typeAlert = (0, _common.randomArrayItem)(Web.data);
    const userAgent = (0, _common.randomArrayItem)(Web.userAgents);
    alert.rule = {
      ...typeAlert.rule
    };
    alert.rule.firedtimes = randomIntervalInteger(1, 10);
    alert.decoder = {
      ...typeAlert.decoder
    };
    alert.location = typeAlert.location;
    alert.full_log = interpolateAlertProps(typeAlert.full_log, alert, {
      _user_agent: userAgent,
      _date: formatDate(new Date(alert.timestamp), 'D/N/Y:h:m:s +0000')
    });
    if (typeAlert.previous_output) {
      const previousOutput = [];
      const beforeSeconds = 4;
      for (let i = beforeSeconds; i > 0; i--) {
        const beforeDate = new Date(new Date(alert.timestamp) - (2 + i) * 1000);
        previousOutput.push(interpolateAlertProps(typeAlert.full_log, alert, {
          _user_agent: userAgent,
          _date: formatDate(new Date(beforeDate), 'D/N/Y:h:m:s +0000')
        }));
      }
      alert.previous_output = previousOutput.join('\n');
    }
  }
  if (params.github) {
    alert.location = GitHub.LOCATION;
    alert.decoder = GitHub.DECODER;
    const alertType = (0, _common.randomArrayItem)(GitHub.ALERT_TYPES);
    const actor = (0, _common.randomArrayItem)(GitHub.ACTORS);
    alert.data = {
      github: {
        ...alertType.data.github
      }
    };
    alert.data.github.org = (0, _common.randomArrayItem)(GitHub.ORGANIZATION_NAMES);
    alert.data.github.repo && (alert.data.github.repo = `${alert.data.github.org}/${(0, _common.randomArrayItem)(GitHub.REPOSITORY_NAMES)}`);
    alert.data.github.repository && (alert.data.github.repository = `${alert.data.github.org}/${(0, _common.randomArrayItem)(GitHub.REPOSITORY_NAMES)}`);
    alert.data.github.actor = actor.name;
    alert.data.github.actor_location && alert.data.github.actor_location.country_code && (alert.data.github.actor_location.country_code = actor.country_code);
    alert.data.github.user && (alert.data.github.user = (0, _common.randomArrayItem)(GitHub.USER_NAMES));
    alert.data.github.config && alert.data.github.config.url && (alert.data.github.config.url = (0, _common.randomArrayItem)(GitHub.SERVER_ADDRESS_WEBHOOK));
    alert.data.github['@timestamp'] = alert.timestamp;
    alert.data.github.created_at && (alert.data.github.created_at = alert.timestamp);
    alert.rule = {
      ...alertType.rule
    };
  }
  alert['@timestamp'] = alert.timestamp;
  return alert;
}

/**
 * Get a random array with unique values
 * @param {[]} array Array to extract the values
 * @param {*} randomMaxRepetitions Number max of random extractions
 * @param {function} sort Funciton to seort elements
 * @return {*} Array with random values extracted of paramater array passed
 */
function randomUniqueValuesFromArray(array, randomMaxRepetitions = 1, sort) {
  const repetitions = randomIntervalInteger(1, randomMaxRepetitions);
  const set = new Set();
  for (let i = 0; i < repetitions; i++) {
    set.add(array[randomIntervalInteger(0, array.length - 1)]);
  }
  return sort ? Array.from(set).sort(sort) : Array.from(set);
}

/**
 * Get a integer within a range
 * @param {number} min - Minimum limit
 * @param {number} max - Maximum limit
 * @returns {number} - Randomized number in interval
 */
function randomIntervalInteger(min, max) {
  return Math.floor(Math.random() * (max - (min - 1))) + min;
}

/**
 * Generate random alerts
 * @param {*} params
 * @param {number} numAlerts - Define number of alerts
 * @return {*} - Random generated alerts defined with params
 */
function generateAlerts(params, numAlerts = 1) {
  const alerts = [];
  for (let i = 0; i < numAlerts; i++) {
    alerts.push(generateAlert(params));
  }
  return alerts;
}

/**
 * Get a random Date in range(7 days ago - now)
 * @returns {date} - Random date in range (7 days ago - now)
 */
function randomDate(inf, sup) {
  const nowTimestamp = Date.now();
  const time = randomIntervalInteger(0, 604800000); // Random 7 days in miliseconds

  const unix_timestamp = nowTimestamp - time; // Last 7 days from now

  const lastWeek = new Date(unix_timestamp);
  return formatDate(lastWeek, 'Y-M-DTh:m:s.l+0000');
}
const formatterNumber = (number, zeros = 0) => ('0'.repeat(zeros) + `${number}`).slice(-zeros);
const monthNames = {
  long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};
const dayNames = {
  long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};
function formatDate(date, format) {
  // It could use "moment" library to format strings too
  const tokens = {
    D: d => formatterNumber(d.getDate(), 2),
    // 01-31
    A: d => dayNames.long[d.getDay()],
    // 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    E: d => dayNames.short[d.getDay()],
    // 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    M: d => formatterNumber(d.getMonth() + 1, 2),
    // 01-12
    J: d => monthNames.long[d.getMonth()],
    // 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    N: d => monthNames.short[d.getMonth()],
    // 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    Y: d => d.getFullYear(),
    // 2020
    h: d => formatterNumber(d.getHours(), 2),
    // 00-23
    m: d => formatterNumber(d.getMinutes(), 2),
    // 00-59
    s: d => formatterNumber(d.getSeconds(), 2),
    // 00-59
    l: d => formatterNumber(d.getMilliseconds(), 3) // 000-999
  };

  return format.split('').reduce((accum, token) => {
    if (tokens[token]) {
      return accum + tokens[token](date);
    }
    return accum + token;
  }, '');
}

/**
 *
 * @param {string} str String with interpolations
 * @param {*} alert Alert object
 * @param {*} extra Extra parameters to interpolate what aren't in alert objet. Only admit one level of depth
 */
function interpolateAlertProps(str, alert, extra = {}) {
  const matches = str.match(/{([\w\._]+)}/g);
  return matches && matches.reduce((accum, cur) => {
    const match = cur.match(/{([\w\._]+)}/);
    const items = match[1].split('.');
    const value = items.reduce((a, c) => a && a[c] || extra[c] || undefined, alert) || cur;
    return accum.replace(cur, value);
  }, str) || str;
}

/**
 * Return a random probability
 * @param {number} probability
 * @param {number[=100]} maximum
 */
function randomProbability(probability, maximum = 100) {
  return randomIntervalInteger(0, maximum) <= probability;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY29tbW9uIiwicmVxdWlyZSIsIl9yZWd1bGF0b3J5Q29tcGxpYW5jZSIsIkF1ZGl0IiwiX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQiLCJBdXRoZW50aWNhdGlvbiIsIkFXUyIsIkludGVncml0eU1vbml0b3JpbmciLCJDSVNDQVQiLCJHQ1AiLCJEb2NrZXIiLCJNaXRyZSIsIk9zcXVlcnkiLCJPcGVuU0NBUCIsIlBvbGljeU1vbml0b3JpbmciLCJWaXJ1c3RvdGFsIiwiVnVsbmVyYWJpbGl0eSIsIlNTSCIsIkFwYWNoZSIsIldlYiIsIkdpdEh1YiIsIk9mZmljZSIsIl9nZXRSZXF1aXJlV2lsZGNhcmRDYWNoZSIsImUiLCJXZWFrTWFwIiwiciIsInQiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsImhhcyIsImdldCIsIm4iLCJfX3Byb3RvX18iLCJhIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJ1IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiaSIsInNldCIsImFsZXJ0SURNYXgiLCJydWxlRGVzY3JpcHRpb24iLCJydWxlTWF4TGV2ZWwiLCJnZW5lcmF0ZUFsZXJ0IiwicGFyYW1zIiwiYWxlcnQiLCJ0aW1lc3RhbXAiLCJydWxlIiwibGV2ZWwiLCJkZXNjcmlwdGlvbiIsImlkIiwibWFpbCIsImdyb3VwcyIsImFnZW50IiwibmFtZSIsIm1hbmFnZXIiLCJjbHVzdGVyIiwicHJlZGVjb2RlciIsImRlY29kZXIiLCJkYXRhIiwibG9jYXRpb24iLCJyYW5kb21BcnJheUl0ZW0iLCJBZ2VudHMiLCJyYW5kb21JbnRlcnZhbEludGVnZXIiLCJyYW5kb21EYXRlIiwibm9kZSIsImF3cyIsInJhbmRvbVR5cGUiLCJiZWZvcmVEYXRlIiwiRGF0ZSIsInR5cGVBbGVydCIsImd1YXJkZHV0eVBvcnRQcm9iZSIsImludGVncmF0aW9uIiwicmVnaW9uIiwicmVzb3VyY2UiLCJpbnN0YW5jZURldGFpbHMiLCJpYW1JbnN0YW5jZVByb2ZpbGUiLCJhcm4iLCJpbnRlcnBvbGF0ZUFsZXJ0UHJvcHMiLCJ0aXRsZSIsImFjY291bnRJZCIsInNlcnZpY2UiLCJldmVudEZpcnN0U2VlbiIsImZvcm1hdERhdGUiLCJldmVudExhc3RTZWVuIiwiYWN0aW9uIiwicG9ydFByb2JlQWN0aW9uIiwicG9ydFByb2JlRGV0YWlscyIsInJlbW90ZUlwRGV0YWlscyIsImxvZ19pbmZvIiwiczNidWNrZXQiLCJidWNrZXRzIiwibG9nX2ZpbGUiLCJjb3VudCIsImNyZWF0ZWRBdCIsImZpcmVkdGltZXMiLCJhcGlDYWxsIiwiYWNjZXNzS2V5RGV0YWlscyIsInVzZXJOYW1lIiwiVXNlcnMiLCJhd3NBcGlDYWxsQWN0aW9uIiwiYWRkaXRpb25hbEluZm8iLCJyZWNlbnRBcGlDYWxscyIsIm5ldHdvcmtDb25uZWN0aW9uIiwibmV0d29ya0Nvbm5lY3Rpb25BY3Rpb24iLCJsb2NhbFBvcnQiLCJQb3J0cyIsIm91dEJ5dGVzIiwiaW5CeXRlcyIsInVudXN1YWwiLCJsb2NhbElwRGV0YWlscyIsImlwQWRkcmVzc1Y0IiwibmV0d29ya0ludGVyZmFjZXMiLCJwcml2YXRlSXBBZGRyZXNzIiwiaWFtUG9saWN5R3JhbnRHbG9iYWwiLCJzdW1tYXJ5IiwiVGltZXN0YW1wcyIsInVybCIsImlucHV0IiwidHlwZSIsIkdlb0xvY2F0aW9uIiwib2ZmaWNlIiwiaXAiLCJJbnRyYUlEIiwiYXJyYXlVdWlkT2ZmaWNlIiwiT3JnSUQiLCJvYmpJRCIsInVzZXJLZXkiLCJ1c2VySUQiLCJhcnJheVVzZXJJZCIsInVzZXJUeXBlIiwicmVzdWx0U3RhdHVzIiwibG9nIiwiYXJyYXlMb2dzIiwicnVsZURhdGEiLCJvZmZpY2VSdWxlcyIsIlJlY29yZFR5cGUiLCJhcnJheURlY29kZXJPZmZpY2UiLCJhcnJheUxvY2F0aW9uT2ZmaWNlIiwib2ZmaWNlMzY1IiwiSWQiLCJDcmVhdGlvblRpbWUiLCJPcmdhbml6YXRpb25JZCIsIlVzZXJUeXBlIiwiVXNlcktleSIsIlJlc3VsdFN0YXR1cyIsIk9iamVjdElkIiwiVXNlcklkIiwiQ2xpZW50SVAiLCJhcnJheUlwIiwiZ2NwIiwiYXJyYXlSdWxlcyIsImluc2VydElkIiwianNvblBheWxvYWQiLCJhdXRoQW5zd2VyIiwiYXJyYXlBdXRoQW5zd2VyIiwiTWF0aCIsImZsb29yIiwibGVuZ3RoIiwicmFuZG9tIiwicHJvdG9jb2wiLCJhcnJheVByb3RvY29sIiwicXVlcnlOYW1lIiwiYXJyYXlRdWVyeU5hbWUiLCJxdWVyeVR5cGUiLCJhcnJheVF1ZXJ5VHlwZSIsInJlc3BvbnNlQ29kZSIsImFycmF5UmVzcG9uc2VDb2RlIiwic291cmNlSVAiLCJhcnJheVNvdXJjZUlQIiwidm1JbnN0YW5jZUlkIiwidm1JbnN0YW5jZU5hbWUiLCJsb2dOYW1lIiwicmVjZWl2ZVRpbWVzdGFtcCIsImxhYmVscyIsImFycmF5TG9jYXRpb24iLCJwcm9qZWN0X2lkIiwiYXJyYXlQcm9qZWN0Iiwic291cmNlX3R5cGUiLCJhcnJheVNvdXJjZVR5cGUiLCJ0YXJnZXRfdHlwZSIsImFycmF5VHlwZSIsInNldmVyaXR5IiwiYXJyYXlTZXZlcml0eSIsImF1ZGl0IiwiZGF0YUF1ZGl0IiwiZmlsZSIsImZpbGVOYW1lIiwiY2lzY2F0IiwicHVzaCIsImNpcyIsImdyb3VwIiwiZmFpbCIsInJ1bGVfdGl0bGUiLCJydWxlVGl0bGUiLCJub3RjaGVja2VkIiwic2NvcmUiLCJwYXNzIiwiZXJyb3IiLCJiZW5jaG1hcmsiLCJ1bmtub3duIiwicmVzdWx0IiwiZG9ja2VyIiwiZGF0YURvY2tlciIsIm1pdHJlIiwiYXJyYXlNaXRyZVJ1bGVzIiwib3BlbnNjYXAiLCJvc2NhcCIsImZ1bGxfbG9nIiwicm9vdGNoZWNrIiwiYWxlcnRDYXRlZ29yeSIsInJvb3RraXRDYXRlZ29yeSIsImtleXMiLCJyb290a2l0cyIsInJvb3RraXQiLCJyb290a2l0c0RhdGEiLCJfcm9vdGtpdF9jYXRlZ29yeSIsIl9yb290a2l0X2ZpbGUiLCJ0cm9qYW4iLCJ0cm9qYW5zIiwidHJvamFuc0RhdGEiLCJfdHJvamFuX3NpZ25hdHVyZSIsInNpZ25hdHVyZSIsInN5c2NoZWNrIiwiZXZlbnQiLCJldmVudHMiLCJwYXRoIiwicGF0aHNXaW5kb3dzIiwicGF0aHNMaW51eCIsInVuYW1lX2FmdGVyIiwiZ25hbWVfYWZ0ZXIiLCJtdGltZV9hZnRlciIsInNpemVfYWZ0ZXIiLCJ1aWRfYWZ0ZXIiLCJnaWRfYWZ0ZXIiLCJwZXJtX2FmdGVyIiwiaW5vZGVfYWZ0ZXIiLCJyZWd1bGF0b3J5IiwibXRpbWVfYmVmb3JlIiwiZ2V0VGltZSIsImlub2RlX2JlZm9yZSIsInNoYTFfYWZ0ZXIiLCJyYW5kb21FbGVtZW50cyIsImNoYW5nZWRfYXR0cmlidXRlcyIsImF0dHJpYnV0ZXMiLCJtZDVfYWZ0ZXIiLCJzaGEyNTZfYWZ0ZXIiLCJ0YWdzIiwicHJvY2VzcyIsIlBhdGhzIiwicHBpZCIsImVmZmVjdGl2ZV91c2VyIiwidXNlciIsInZpcnVzdG90YWwiLCJmb3VuZCIsInNvdXJjZSIsInNoYTEiLCJzb3VyY2VGaWxlIiwiYWxlcnRfaWQiLCJtZDUiLCJtYWxpY2lvdXMiLCJwb3NpdGl2ZXMiLCJ0b3RhbCIsInBlcm1hbGluayIsInNjYW5fZGF0ZSIsInBhcnNlIiwidnVsbmVyYWJpbGl0aWVzIiwiZGF0YVZ1bG5lcmFiaWxpdHkiLCJnZHByIiwicGNpX2RzcyIsInRzYyIsIm9zcXVlcnkiLCJkYXRhT3NxdWVyeSIsImNhbGVuZGFyVGltZSIsInJlZ3VsYXRvcnlfY29tcGxpYW5jZSIsInJhbmRvbV9wcm9iYWJpbGl0eV9yZWd1bGF0b3J5X2NvbXBsaWFuY2UiLCJyYW5kb21Qcm9iYWJpbGl0eSIsIlBDSV9EU1MiLCJHRFBSIiwiZ3BnMTMiLCJHUEcxMyIsImhpcGFhIiwiSElQQUEiLCJuaXN0XzgwMF84MyIsIm5pc3RfODAwXzUzIiwiTklTVF84MDBfNTMiLCJhdXRoZW50aWNhdGlvbiIsInNyY2lwIiwiSVBzIiwic3JjdXNlciIsInNyY3BvcnQiLCJwYXJlbnQiLCJwcm9ncmFtX25hbWUiLCJob3N0bmFtZSIsImludmFsaWRMb2dpblBhc3N3b3JkIiwiaW52YWxpZExvZ2luVXNlciIsIm11bHRpcGxlQXV0aGVudGljYXRpb25GYWlsdXJlcyIsImZyZXF1ZW5jeSIsIndpbmRvd3NJbnZhbGlkTG9naW5QYXNzd29yZCIsIndpbiIsImRhdGFfd2luIiwiZXZlbnRkYXRhIiwiaXBBZGRyZXNzIiwiaXBQb3J0Iiwic3lzdGVtIiwiY29tcHV0ZXIiLCJXaW5fSG9zdG5hbWVzIiwiZXZlbnRJRCIsImV2ZW50UmVjb3JkSUQiLCJwcm9jZXNzSUQiLCJzeXN0ZW1UaW1lIiwidGFzayIsInRocmVhZElEIiwidXNlckxvZ2luRmFpbGVkIiwiZHN0dXNlciIsInVpZCIsImV1aWQiLCJ0dHkiLCJwYXNzd29yZENoZWNrRmFpbGVkIiwibm9uRXhpc3RlbnRVc2VyIiwiYnJ1dGVGb3JjZVRyeWluZ0FjY2Vzc1N5c3RlbSIsInJldmVyc2VMb29ja3VwRXJyb3IiLCJpbnNlY3VyZUNvbm5lY3Rpb25BdHRlbXB0IiwiYXV0aGVudGljYXRpb25TdWNjZXNzIiwibWF4aW11bUF1dGhlbnRpY2F0aW9uQXR0ZW1wdHNFeGNlZWRlZCIsInNzaCIsIndpbmRvd3MiLCJzZXJ2aWNlX2NvbnRyb2xfbWFuYWdlciIsImV4dHJhX2RhdGEiLCJzeXN0ZW1fbmFtZSIsInN0YXR1cyIsInBjaSIsImluZm8iLCJmaWVsZHMiLCJhcGFjaGUiLCJfdGltZXN0YW1wX2FwYWNoZSIsIl9waV9pZCIsIndlYiIsInVybHMiLCJ1c2VyQWdlbnQiLCJ1c2VyQWdlbnRzIiwiX3VzZXJfYWdlbnQiLCJfZGF0ZSIsInByZXZpb3VzX291dHB1dCIsInByZXZpb3VzT3V0cHV0IiwiYmVmb3JlU2Vjb25kcyIsImpvaW4iLCJnaXRodWIiLCJMT0NBVElPTiIsIkRFQ09ERVIiLCJhbGVydFR5cGUiLCJBTEVSVF9UWVBFUyIsImFjdG9yIiwiQUNUT1JTIiwib3JnIiwiT1JHQU5JWkFUSU9OX05BTUVTIiwicmVwbyIsIlJFUE9TSVRPUllfTkFNRVMiLCJyZXBvc2l0b3J5IiwiYWN0b3JfbG9jYXRpb24iLCJjb3VudHJ5X2NvZGUiLCJVU0VSX05BTUVTIiwiY29uZmlnIiwiU0VSVkVSX0FERFJFU1NfV0VCSE9PSyIsImNyZWF0ZWRfYXQiLCJyYW5kb21VbmlxdWVWYWx1ZXNGcm9tQXJyYXkiLCJhcnJheSIsInJhbmRvbU1heFJlcGV0aXRpb25zIiwic29ydCIsInJlcGV0aXRpb25zIiwiU2V0IiwiYWRkIiwiQXJyYXkiLCJmcm9tIiwibWluIiwibWF4IiwiZ2VuZXJhdGVBbGVydHMiLCJudW1BbGVydHMiLCJhbGVydHMiLCJpbmYiLCJzdXAiLCJub3dUaW1lc3RhbXAiLCJub3ciLCJ0aW1lIiwidW5peF90aW1lc3RhbXAiLCJsYXN0V2VlayIsImZvcm1hdHRlck51bWJlciIsIm51bWJlciIsInplcm9zIiwicmVwZWF0Iiwic2xpY2UiLCJtb250aE5hbWVzIiwibG9uZyIsInNob3J0IiwiZGF5TmFtZXMiLCJkYXRlIiwiZm9ybWF0IiwidG9rZW5zIiwiRCIsImQiLCJnZXREYXRlIiwiQSIsImdldERheSIsIkUiLCJNIiwiZ2V0TW9udGgiLCJKIiwiTiIsIlkiLCJnZXRGdWxsWWVhciIsImgiLCJnZXRIb3VycyIsIm0iLCJnZXRNaW51dGVzIiwicyIsImdldFNlY29uZHMiLCJsIiwiZ2V0TWlsbGlzZWNvbmRzIiwic3BsaXQiLCJyZWR1Y2UiLCJhY2N1bSIsInRva2VuIiwic3RyIiwiZXh0cmEiLCJtYXRjaGVzIiwibWF0Y2giLCJjdXIiLCJpdGVtcyIsInZhbHVlIiwiYyIsInVuZGVmaW5lZCIsInJlcGxhY2UiLCJwcm9iYWJpbGl0eSIsIm1heGltdW0iXSwic291cmNlcyI6WyJnZW5lcmF0ZS1hbGVydHMtc2NyaXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBXYXp1aCBhcHAgLSBTY3JpcHQgdG8gZ2VuZXJhdGUgc2FtcGxlIGFsZXJ0c1xuICogQ29weXJpZ2h0IChDKSAyMDE1LTIwMjIgV2F6dWgsIEluYy5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTsgeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb247IGVpdGhlciB2ZXJzaW9uIDIgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEZpbmQgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCB0aGlzIG9uIHRoZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuLy8gR2VuZXJhbFxuaW1wb3J0IHtcbiAgSVBzLFxuICBVc2VycyxcbiAgUG9ydHMsXG4gIFBhdGhzLFxuICBXaW5fSG9zdG5hbWVzLFxuICBHZW9Mb2NhdGlvbixcbiAgQWdlbnRzLFxuICByYW5kb21FbGVtZW50cyxcbiAgcmFuZG9tQXJyYXlJdGVtLFxufSBmcm9tICcuL3NhbXBsZS1kYXRhL2NvbW1vbic7XG5pbXBvcnQge1xuICBQQ0lfRFNTLFxuICBHRFBSLFxuICBISVBBQSxcbiAgR1BHMTMsXG4gIE5JU1RfODAwXzUzLFxuICB0c2MsXG59IGZyb20gJy4vc2FtcGxlLWRhdGEvcmVndWxhdG9yeS1jb21wbGlhbmNlJztcblxuaW1wb3J0ICogYXMgQXVkaXQgZnJvbSAnLi9zYW1wbGUtZGF0YS9hdWRpdCc7XG5pbXBvcnQgKiBhcyBBdXRoZW50aWNhdGlvbiBmcm9tICcuL3NhbXBsZS1kYXRhL2F1dGhlbnRpY2F0aW9uJztcbmltcG9ydCAqIGFzIEFXUyBmcm9tICcuL3NhbXBsZS1kYXRhL2F3cyc7XG5pbXBvcnQgKiBhcyBJbnRlZ3JpdHlNb25pdG9yaW5nIGZyb20gJy4vc2FtcGxlLWRhdGEvaW50ZWdyaXR5LW1vbml0b3JpbmcnO1xuaW1wb3J0ICogYXMgQ0lTQ0FUIGZyb20gJy4vc2FtcGxlLWRhdGEvY2lzY2F0JztcbmltcG9ydCAqIGFzIEdDUCBmcm9tICcuL3NhbXBsZS1kYXRhL2djcCc7XG5pbXBvcnQgKiBhcyBEb2NrZXIgZnJvbSAnLi9zYW1wbGUtZGF0YS9kb2NrZXInO1xuaW1wb3J0ICogYXMgTWl0cmUgZnJvbSAnLi9zYW1wbGUtZGF0YS9taXRyZSc7XG5pbXBvcnQgKiBhcyBPc3F1ZXJ5IGZyb20gJy4vc2FtcGxlLWRhdGEvb3NxdWVyeSc7XG5pbXBvcnQgKiBhcyBPcGVuU0NBUCBmcm9tICcuL3NhbXBsZS1kYXRhL29wZW5zY2FwJztcbmltcG9ydCAqIGFzIFBvbGljeU1vbml0b3JpbmcgZnJvbSAnLi9zYW1wbGUtZGF0YS9wb2xpY3ktbW9uaXRvcmluZyc7XG5pbXBvcnQgKiBhcyBWaXJ1c3RvdGFsIGZyb20gJy4vc2FtcGxlLWRhdGEvdmlydXN0b3RhbCc7XG5pbXBvcnQgKiBhcyBWdWxuZXJhYmlsaXR5IGZyb20gJy4vc2FtcGxlLWRhdGEvdnVsbmVyYWJpbGl0aWVzJztcbmltcG9ydCAqIGFzIFNTSCBmcm9tICcuL3NhbXBsZS1kYXRhL3NzaCc7XG5pbXBvcnQgKiBhcyBBcGFjaGUgZnJvbSAnLi9zYW1wbGUtZGF0YS9hcGFjaGUnO1xuaW1wb3J0ICogYXMgV2ViIGZyb20gJy4vc2FtcGxlLWRhdGEvd2ViJztcbmltcG9ydCAqIGFzIEdpdEh1YiBmcm9tICcuL3NhbXBsZS1kYXRhL2dpdGh1Yic7XG5pbXBvcnQgKiBhcyBPZmZpY2UgZnJvbSAnLi9zYW1wbGUtZGF0YS9vZmZpY2UnO1xuXG4vL0FsZXJ0XG5jb25zdCBhbGVydElETWF4ID0gNjAwMDtcblxuLy8gUnVsZVxuY29uc3QgcnVsZURlc2NyaXB0aW9uID0gW1xuICAnU2FtcGxlIGFsZXJ0IDEnLFxuICAnU2FtcGxlIGFsZXJ0IDInLFxuICAnU2FtcGxlIGFsZXJ0IDMnLFxuICAnU2FtcGxlIGFsZXJ0IDQnLFxuICAnU2FtcGxlIGFsZXJ0IDUnLFxuXTtcbmNvbnN0IHJ1bGVNYXhMZXZlbCA9IDE1O1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgYWxlcnRcbiAqIEBwYXJhbSB7YW55fSBwYXJhbXMgLSBwYXJhbXMgdG8gY29uZmlndXJlIHRoZSBhbGVydFxuICogQHBhcmFtIHtib29sZWFufSBwYXJhbXMuYXdzIC0gaWYgdHJ1ZSwgc2V0IGF3cyBmaWVsZHNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gcGFyYW1zLmF1ZGl0IC0gaWYgdHJ1ZSwgc2V0IFN5c3RlbSBBdWRpdGluZyBmaWVsZHNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gcGFyYW1zLm9mZmljZSAtIGlmIHRydWUsIHNldCBvZmZpY2UgZmllbGRzXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHBhcmFtcy5jaXNjYXQgLSBpZiB0cnVlLCBzZXQgQ0lTLUNBVCBmaWVsZHNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gcGFyYW1zLmdjcCAtIGlmIHRydWUsIHNldCBHQ1AgZmllbGRzXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHBhcmFtcy5kb2NrZXIgLSBpZiB0cnVlLCBzZXQgRG9ja2VyIGZpZWxkc1xuICogQHBhcmFtIHtib29sZWFufSBwYXJhbXMubWl0cmUgLSBpZiB0cnVlLCBzZXQgTWl0cmUgYXR0JmNrIGZpZWxkc1xuICogQHBhcmFtIHtib29sZWFufSBwYXJhbXMub3BlbnNjYXAgLSBpZiB0cnVlLCBzZXQgT3BlblNDQVAgZmllbGRzXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHBhcmFtcy5vc3F1ZXJ5IC0gaWYgdHJ1ZSwgc2V0IE9zcXVlcnkgZmllbGRzXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHBhcmFtcy5yb290Y2hlY2sgLSBpZiB0cnVlLCBzZXQgUG9saWN5IG1vbml0b3JpbmcgZmllbGRzXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHBhcmFtcy5zeXNjaGVjayAtIGlmIHRydWUsIHNldCBpbnRlZ3JpdHkgbW9uaXRvcmluZyBmaWVsZHNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gcGFyYW1zLnZpcnVzdG90YWwgLSBpZiB0cnVlLCBzZXQgVmlydXNUb3RhbCBmaWVsZHNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gcGFyYW1zLnZ1bG5lcmFiaWxpdGllcyAtIGlmIHRydWUsIHNldCB2dWxuZXJhYmlsaXRpZXMgZmllbGRzXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHBhcmFtcy5wY2lfZHNzIC0gaWYgdHJ1ZSwgc2V0IHBjaV9kc3MgZmllbGRzXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHBhcmFtcy5nZHByIC0gaWYgdHJ1ZSwgc2V0IGdkcHIgZmllbGRzXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHBhcmFtcy5ncGcxMyAtIGlmIHRydWUsIHNldCBncGcxMyBmaWVsZHNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gcGFyYW1zLmhpcGFhIC0gaWYgdHJ1ZSwgc2V0IGhpcGFhIGZpZWxkc1xuICogQHBhcmFtIHtib29sZWFufSBwYXJhbXMubmlzdF84MDBfNTMgLSBpZiB0cnVlLCBzZXQgbmlzdF84MDBfNTMgZmllbGRzXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHBhcmFtcy5uaXN0XzgwMF81MyAtIGlmIHRydWUsIHNldCBuaXN0XzgwMF81MyBmaWVsZHNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gcGFyYW1zLndpbl9hdXRoZW50aWNhdGlvbl9mYWlsZWQgLSBpZiB0cnVlLCBhZGQgd2luX2F1dGhlbnRpY2F0aW9uX2ZhaWxlZCB0byBydWxlLmdyb3Vwc1xuICogQHBhcmFtIHtudW1iZXJ9IHBhcmFtcy5wcm9iYWJpbGl0eV93aW5fYXV0aGVudGljYXRpb25fZmFpbGVkIC0gcHJvYmFiaWxpdHkgdG8gYWRkIHdpbl9hdXRoZW50aWNhdGlvbl9mYWlsZWQgdG8gcnVsZS5ncm91cHMuIEV4YW1wbGU6IDIwIHdpbGwgYmUgMjAlIG9mIHByb2JhYmlsaXR5IHRvIGFkZCB0aGlzIHRvIHJ1bGUuZ3JvdXBzXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHBhcmFtcy5hdXRoZW50aWNhdGlvbl9mYWlsZWQgLSBpZiB0cnVlLCBhZGQgd2luX2F1dGhlbnRpY2F0aW9uX2ZhaWxlZCB0byBydWxlLmdyb3Vwc1xuICogQHBhcmFtIHtudW1iZXJ9IHBhcmFtcy5wcm9iYWJpbGl0eV9hdXRoZW50aWNhdGlvbl9mYWlsZWQgLSBwcm9iYWJpbGl0eSB0byBhZGQgYXV0aGVudGljYXRpb25fZmFpbGVkIHRvIHJ1bGUuZ3JvdXBzXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHBhcmFtcy5hdXRoZW50aWNhdGlvbl9mYWlsdXJlcyAtIGlmIHRydWUsIGFkZCB3aW5fYXV0aGVudGljYXRpb25fZmFpbGVkIHRvIHJ1bGUuZ3JvdXBzXG4gKiBAcGFyYW0ge251bWJlcn0gcGFyYW1zLnByb2JhYmlsaXR5X2F1dGhlbnRpY2F0aW9uX2ZhaWx1cmVzIC0gcHJvYmFiaWxpdHkgdG8gYWRkIGF1dGhlbnRpY2F0aW9uX2ZhaWx1cmVzIHRvIHJ1bGUuZ3JvdXBzXG4gKiBAcmV0dXJuIHthbnl9IC0gQWxlcnQgZ2VuZXJhdGVkXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlQWxlcnQocGFyYW1zKSB7XG4gIGxldCBhbGVydCA9IHtcbiAgICBbJ0BzYW1wbGVkYXRhJ106IHRydWUsXG4gICAgdGltZXN0YW1wOiAnMjAyMC0wMS0yN1QxMTowODo0Ny43NzcrMDAwMCcsXG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDMsXG4gICAgICBkZXNjcmlwdGlvbjogJ1NhbXBsZSBhbGVydCcsXG4gICAgICBpZDogJzU1MDInLFxuICAgICAgbWFpbDogZmFsc2UsXG4gICAgICBncm91cHM6IFtdLFxuICAgIH0sXG4gICAgYWdlbnQ6IHtcbiAgICAgIGlkOiAnMDAwJyxcbiAgICAgIG5hbWU6ICdtYXN0ZXInLFxuICAgIH0sXG4gICAgbWFuYWdlcjoge1xuICAgICAgbmFtZTogJ21hc3RlcicsXG4gICAgfSxcbiAgICBjbHVzdGVyOiB7XG4gICAgICBuYW1lOiAnd2F6dWgnLFxuICAgIH0sXG4gICAgaWQ6ICcxNTgwMTIzMzI3LjQ5MDMxJyxcbiAgICBwcmVkZWNvZGVyOiB7fSxcbiAgICBkZWNvZGVyOiB7fSxcbiAgICBkYXRhOiB7fSxcbiAgICBsb2NhdGlvbjogJycsXG4gIH07XG4gIGFsZXJ0LmFnZW50ID0gcmFuZG9tQXJyYXlJdGVtKEFnZW50cyk7XG4gIGFsZXJ0LnJ1bGUuZGVzY3JpcHRpb24gPSByYW5kb21BcnJheUl0ZW0ocnVsZURlc2NyaXB0aW9uKTtcbiAgYWxlcnQucnVsZS5pZCA9IGAke3JhbmRvbUludGVydmFsSW50ZWdlcigxLCBhbGVydElETWF4KX1gO1xuICBhbGVydC5ydWxlLmxldmVsID0gcmFuZG9tSW50ZXJ2YWxJbnRlZ2VyKDEsIHJ1bGVNYXhMZXZlbCk7XG5cbiAgYWxlcnQudGltZXN0YW1wID0gcmFuZG9tRGF0ZSgpO1xuXG4gIGlmIChwYXJhbXMubWFuYWdlcikge1xuICAgIGlmIChwYXJhbXMubWFuYWdlci5uYW1lKSB7XG4gICAgICBhbGVydC5tYW5hZ2VyLm5hbWUgPSBwYXJhbXMubWFuYWdlci5uYW1lO1xuICAgIH1cbiAgfVxuXG4gIGlmIChwYXJhbXMuY2x1c3Rlcikge1xuICAgIGlmIChwYXJhbXMuY2x1c3Rlci5uYW1lKSB7XG4gICAgICBhbGVydC5jbHVzdGVyLm5hbWUgPSBwYXJhbXMuY2x1c3Rlci5uYW1lO1xuICAgIH1cbiAgICBpZiAocGFyYW1zLmNsdXN0ZXIubm9kZSkge1xuICAgICAgYWxlcnQuY2x1c3Rlci5ub2RlID0gcGFyYW1zLmNsdXN0ZXIubm9kZTtcbiAgICB9XG4gIH1cblxuICBpZiAocGFyYW1zLmF3cykge1xuICAgIGxldCByYW5kb21UeXBlID0gcmFuZG9tQXJyYXlJdGVtKFtcbiAgICAgICdndWFyZGR1dHlQb3J0UHJvYmUnLFxuICAgICAgJ2FwaUNhbGwnLFxuICAgICAgJ25ldHdvcmtDb25uZWN0aW9uJyxcbiAgICAgICdpYW1Qb2xpY3lHcmFudEdsb2JhbCcsXG4gICAgXSk7XG5cbiAgICBjb25zdCBiZWZvcmVEYXRlID0gbmV3IERhdGUoXG4gICAgICBuZXcgRGF0ZShhbGVydC50aW1lc3RhbXApIC0gMyAqIDI0ICogNjAgKiA2MCAqIDEwMDAsXG4gICAgKTtcbiAgICBzd2l0Y2ggKHJhbmRvbVR5cGUpIHtcbiAgICAgIGNhc2UgJ2d1YXJkZHV0eVBvcnRQcm9iZSc6IHtcbiAgICAgICAgY29uc3QgdHlwZUFsZXJ0ID0gQVdTLmd1YXJkZHV0eVBvcnRQcm9iZTtcblxuICAgICAgICBhbGVydC5kYXRhID0geyAuLi50eXBlQWxlcnQuZGF0YSB9O1xuICAgICAgICBhbGVydC5kYXRhLmludGVncmF0aW9uID0gJ2F3cyc7XG4gICAgICAgIGFsZXJ0LmRhdGEuYXdzLnJlZ2lvbiA9IHJhbmRvbUFycmF5SXRlbShBV1MucmVnaW9uKTtcbiAgICAgICAgYWxlcnQuZGF0YS5hd3MucmVzb3VyY2UuaW5zdGFuY2VEZXRhaWxzID0ge1xuICAgICAgICAgIC4uLnJhbmRvbUFycmF5SXRlbShBV1MuaW5zdGFuY2VEZXRhaWxzKSxcbiAgICAgICAgfTtcbiAgICAgICAgYWxlcnQuZGF0YS5hd3MucmVzb3VyY2UuaW5zdGFuY2VEZXRhaWxzLmlhbUluc3RhbmNlUHJvZmlsZS5hcm4gPVxuICAgICAgICAgIGludGVycG9sYXRlQWxlcnRQcm9wcyhcbiAgICAgICAgICAgIHR5cGVBbGVydC5kYXRhLmF3cy5yZXNvdXJjZS5pbnN0YW5jZURldGFpbHMuaWFtSW5zdGFuY2VQcm9maWxlLmFybixcbiAgICAgICAgICAgIGFsZXJ0LFxuICAgICAgICAgICk7XG4gICAgICAgIGFsZXJ0LmRhdGEuYXdzLnRpdGxlID0gaW50ZXJwb2xhdGVBbGVydFByb3BzKFxuICAgICAgICAgIGFsZXJ0LmRhdGEuYXdzLnRpdGxlLFxuICAgICAgICAgIGFsZXJ0LFxuICAgICAgICApO1xuICAgICAgICBhbGVydC5kYXRhLmF3cy5hY2NvdW50SWQgPSByYW5kb21BcnJheUl0ZW0oQVdTLmFjY291bnRJZCk7XG4gICAgICAgIGFsZXJ0LmRhdGEuYXdzLnNlcnZpY2UuZXZlbnRGaXJzdFNlZW4gPSBmb3JtYXREYXRlKFxuICAgICAgICAgIGJlZm9yZURhdGUsXG4gICAgICAgICAgJ1ktTS1EVGg6bTpzLmxaJyxcbiAgICAgICAgKTtcbiAgICAgICAgYWxlcnQuZGF0YS5hd3Muc2VydmljZS5ldmVudExhc3RTZWVuID0gZm9ybWF0RGF0ZShcbiAgICAgICAgICBuZXcgRGF0ZShhbGVydC50aW1lc3RhbXApLFxuICAgICAgICAgICdZLU0tRFRoOm06cy5sWicsXG4gICAgICAgICk7XG4gICAgICAgIGFsZXJ0LmRhdGEuYXdzLnNlcnZpY2UuYWN0aW9uLnBvcnRQcm9iZUFjdGlvbi5wb3J0UHJvYmVEZXRhaWxzLnJlbW90ZUlwRGV0YWlscyA9XG4gICAgICAgICAge1xuICAgICAgICAgICAgLi4ucmFuZG9tQXJyYXlJdGVtKEFXUy5yZW1vdGVJcERldGFpbHMpLFxuICAgICAgICAgIH07XG4gICAgICAgIGFsZXJ0LmRhdGEuYXdzLmxvZ19pbmZvID0ge1xuICAgICAgICAgIHMzYnVja2V0OiByYW5kb21BcnJheUl0ZW0oQVdTLmJ1Y2tldHMpLFxuICAgICAgICAgIGxvZ19maWxlOiBgZ3VhcmRkdXR5LyR7Zm9ybWF0RGF0ZShcbiAgICAgICAgICAgIG5ldyBEYXRlKGFsZXJ0LnRpbWVzdGFtcCksXG4gICAgICAgICAgICAnWS9NL0QvaCcsXG4gICAgICAgICAgKX0vZmlyZWhvc2VfZ3VhcmRkdXR5LTEtJHtmb3JtYXREYXRlKFxuICAgICAgICAgICAgbmV3IERhdGUoYWxlcnQudGltZXN0YW1wKSxcbiAgICAgICAgICAgICdZLU0tRC1oLW0tcy1sJyxcbiAgICAgICAgICApfWI1YjliLWVjNjItNGEwNy04NWQ3LWIxNjk5YjljMDMxZS56aXBgLFxuICAgICAgICB9O1xuICAgICAgICBhbGVydC5kYXRhLmF3cy5zZXJ2aWNlLmNvdW50ID0gYCR7cmFuZG9tSW50ZXJ2YWxJbnRlZ2VyKDQwMCwgNDAwMCl9YDtcbiAgICAgICAgYWxlcnQuZGF0YS5hd3MuY3JlYXRlZEF0ID0gZm9ybWF0RGF0ZShiZWZvcmVEYXRlLCAnWS1NLURUaDptOnMubFonKTtcblxuICAgICAgICBhbGVydC5ydWxlID0geyAuLi50eXBlQWxlcnQucnVsZSB9O1xuICAgICAgICBhbGVydC5ydWxlLmZpcmVkdGltZXMgPSByYW5kb21JbnRlcnZhbEludGVnZXIoMSwgNTApO1xuICAgICAgICBhbGVydC5ydWxlLmRlc2NyaXB0aW9uID0gaW50ZXJwb2xhdGVBbGVydFByb3BzKFxuICAgICAgICAgIHR5cGVBbGVydC5ydWxlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIGFsZXJ0LFxuICAgICAgICApO1xuXG4gICAgICAgIGFsZXJ0LmRlY29kZXIgPSB7IC4uLnR5cGVBbGVydC5kZWNvZGVyIH07XG4gICAgICAgIGFsZXJ0LmxvY2F0aW9uID0gdHlwZUFsZXJ0LmxvY2F0aW9uO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2FwaUNhbGwnOiB7XG4gICAgICAgIGNvbnN0IHR5cGVBbGVydCA9IEFXUy5hcGlDYWxsO1xuXG4gICAgICAgIGFsZXJ0LmRhdGEgPSB7IC4uLnR5cGVBbGVydC5kYXRhIH07XG4gICAgICAgIGFsZXJ0LmRhdGEuaW50ZWdyYXRpb24gPSAnYXdzJztcbiAgICAgICAgYWxlcnQuZGF0YS5hd3MucmVnaW9uID0gcmFuZG9tQXJyYXlJdGVtKEFXUy5yZWdpb24pO1xuICAgICAgICBhbGVydC5kYXRhLmF3cy5yZXNvdXJjZS5hY2Nlc3NLZXlEZXRhaWxzLnVzZXJOYW1lID1cbiAgICAgICAgICByYW5kb21BcnJheUl0ZW0oVXNlcnMpO1xuICAgICAgICBhbGVydC5kYXRhLmF3cy5sb2dfaW5mbyA9IHtcbiAgICAgICAgICBzM2J1Y2tldDogcmFuZG9tQXJyYXlJdGVtKEFXUy5idWNrZXRzKSxcbiAgICAgICAgICBsb2dfZmlsZTogYGd1YXJkZHV0eS8ke2Zvcm1hdERhdGUoXG4gICAgICAgICAgICBuZXcgRGF0ZShhbGVydC50aW1lc3RhbXApLFxuICAgICAgICAgICAgJ1kvTS9EL2gnLFxuICAgICAgICAgICl9L2ZpcmVob3NlX2d1YXJkZHV0eS0xLSR7Zm9ybWF0RGF0ZShcbiAgICAgICAgICAgIG5ldyBEYXRlKGFsZXJ0LnRpbWVzdGFtcCksXG4gICAgICAgICAgICAnWS1NLUQtaC1tLXMtbCcsXG4gICAgICAgICAgKX1iNWI5Yi1lYzYyLTRhMDctODVkNy1iMTY5OWI5YzAzMWUuemlwYCxcbiAgICAgICAgfTtcbiAgICAgICAgYWxlcnQuZGF0YS5hd3MuYWNjb3VudElkID0gcmFuZG9tQXJyYXlJdGVtKEFXUy5hY2NvdW50SWQpO1xuICAgICAgICBhbGVydC5kYXRhLmF3cy5zZXJ2aWNlLmFjdGlvbi5hd3NBcGlDYWxsQWN0aW9uLnJlbW90ZUlwRGV0YWlscyA9IHtcbiAgICAgICAgICAuLi5yYW5kb21BcnJheUl0ZW0oQVdTLnJlbW90ZUlwRGV0YWlscyksXG4gICAgICAgIH07XG4gICAgICAgIGFsZXJ0LmRhdGEuYXdzLnNlcnZpY2UuZXZlbnRGaXJzdFNlZW4gPSBmb3JtYXREYXRlKFxuICAgICAgICAgIGJlZm9yZURhdGUsXG4gICAgICAgICAgJ1ktTS1EVGg6bTpzLmxaJyxcbiAgICAgICAgKTtcbiAgICAgICAgYWxlcnQuZGF0YS5hd3Muc2VydmljZS5ldmVudExhc3RTZWVuID0gZm9ybWF0RGF0ZShcbiAgICAgICAgICBuZXcgRGF0ZShhbGVydC50aW1lc3RhbXApLFxuICAgICAgICAgICdZLU0tRFRoOm06cy5sWicsXG4gICAgICAgICk7XG4gICAgICAgIGFsZXJ0LmRhdGEuYXdzLmNyZWF0ZWRBdCA9IGZvcm1hdERhdGUoYmVmb3JlRGF0ZSwgJ1ktTS1EVGg6bTpzLmxaJyk7XG4gICAgICAgIGFsZXJ0LmRhdGEuYXdzLnRpdGxlID0gaW50ZXJwb2xhdGVBbGVydFByb3BzKFxuICAgICAgICAgIGFsZXJ0LmRhdGEuYXdzLnRpdGxlLFxuICAgICAgICAgIGFsZXJ0LFxuICAgICAgICApO1xuICAgICAgICBhbGVydC5kYXRhLmF3cy5kZXNjcmlwdGlvbiA9IGludGVycG9sYXRlQWxlcnRQcm9wcyhcbiAgICAgICAgICBhbGVydC5kYXRhLmF3cy5kZXNjcmlwdGlvbixcbiAgICAgICAgICBhbGVydCxcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgY291bnQgPSBgJHtyYW5kb21JbnRlcnZhbEludGVnZXIoNDAwLCA0MDAwKX1gO1xuICAgICAgICBhbGVydC5kYXRhLmF3cy5zZXJ2aWNlLmFkZGl0aW9uYWxJbmZvLnJlY2VudEFwaUNhbGxzLmNvdW50ID0gY291bnQ7XG4gICAgICAgIGFsZXJ0LmRhdGEuYXdzLnNlcnZpY2UuY291bnQgPSBjb3VudDtcblxuICAgICAgICBhbGVydC5ydWxlID0geyAuLi50eXBlQWxlcnQucnVsZSB9O1xuICAgICAgICBhbGVydC5ydWxlLmZpcmVkdGltZXMgPSByYW5kb21JbnRlcnZhbEludGVnZXIoMSwgNTApO1xuICAgICAgICBhbGVydC5ydWxlLmRlc2NyaXB0aW9uID0gaW50ZXJwb2xhdGVBbGVydFByb3BzKFxuICAgICAgICAgIHR5cGVBbGVydC5ydWxlLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIGFsZXJ0LFxuICAgICAgICApO1xuXG4gICAgICAgIGFsZXJ0LmRlY29kZXIgPSB7IC4uLnR5cGVBbGVydC5kZWNvZGVyIH07XG4gICAgICAgIGFsZXJ0LmxvY2F0aW9uID0gdHlwZUFsZXJ0LmxvY2F0aW9uO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ25ldHdvcmtDb25uZWN0aW9uJzoge1xuICAgICAgICBjb25zdCB0eXBlQWxlcnQgPSBBV1MubmV0d29ya0Nvbm5lY3Rpb247XG5cbiAgICAgICAgYWxlcnQuZGF0YSA9IHsgLi4udHlwZUFsZXJ0LmRhdGEgfTtcbiAgICAgICAgYWxlcnQuZGF0YS5pbnRlZ3JhdGlvbiA9ICdhd3MnO1xuICAgICAgICBhbGVydC5kYXRhLmF3cy5yZWdpb24gPSByYW5kb21BcnJheUl0ZW0oQVdTLnJlZ2lvbik7XG4gICAgICAgIGFsZXJ0LmRhdGEuYXdzLnJlc291cmNlLmluc3RhbmNlRGV0YWlscyA9IHtcbiAgICAgICAgICAuLi5yYW5kb21BcnJheUl0ZW0oQVdTLmluc3RhbmNlRGV0YWlscyksXG4gICAgICAgIH07XG4gICAgICAgIGFsZXJ0LmRhdGEuYXdzLmxvZ19pbmZvID0ge1xuICAgICAgICAgIHMzYnVja2V0OiByYW5kb21BcnJheUl0ZW0oQVdTLmJ1Y2tldHMpLFxuICAgICAgICAgIGxvZ19maWxlOiBgZ3VhcmRkdXR5LyR7Zm9ybWF0RGF0ZShcbiAgICAgICAgICAgIG5ldyBEYXRlKGFsZXJ0LnRpbWVzdGFtcCksXG4gICAgICAgICAgICAnWS9NL0QvaCcsXG4gICAgICAgICAgKX0vZmlyZWhvc2VfZ3VhcmRkdXR5LTEtJHtmb3JtYXREYXRlKFxuICAgICAgICAgICAgbmV3IERhdGUoYWxlcnQudGltZXN0YW1wKSxcbiAgICAgICAgICAgICdZLU0tRC1oLW0tcy1sJyxcbiAgICAgICAgICApfWI1YjliLWVjNjItNGEwNy04NWQ3LWIxNjk5YjljMDMxZS56aXBgLFxuICAgICAgICB9O1xuICAgICAgICBhbGVydC5kYXRhLmF3cy5kZXNjcmlwdGlvbiA9IGludGVycG9sYXRlQWxlcnRQcm9wcyhcbiAgICAgICAgICBhbGVydC5kYXRhLmF3cy5kZXNjcmlwdGlvbixcbiAgICAgICAgICBhbGVydCxcbiAgICAgICAgKTtcbiAgICAgICAgYWxlcnQuZGF0YS5hd3MudGl0bGUgPSBpbnRlcnBvbGF0ZUFsZXJ0UHJvcHMoXG4gICAgICAgICAgYWxlcnQuZGF0YS5hd3MudGl0bGUsXG4gICAgICAgICAgYWxlcnQsXG4gICAgICAgICk7XG4gICAgICAgIGFsZXJ0LmRhdGEuYXdzLmFjY291bnRJZCA9IHJhbmRvbUFycmF5SXRlbShBV1MuYWNjb3VudElkKTtcbiAgICAgICAgYWxlcnQuZGF0YS5hd3MuY3JlYXRlZEF0ID0gZm9ybWF0RGF0ZShiZWZvcmVEYXRlLCAnWS1NLURUaDptOnMubFonKTtcbiAgICAgICAgYWxlcnQuZGF0YS5hd3Muc2VydmljZS5hY3Rpb24ubmV0d29ya0Nvbm5lY3Rpb25BY3Rpb24ucmVtb3RlSXBEZXRhaWxzID1cbiAgICAgICAgICB7XG4gICAgICAgICAgICAuLi5yYW5kb21BcnJheUl0ZW0oQVdTLnJlbW90ZUlwRGV0YWlscyksXG4gICAgICAgICAgfTtcbiAgICAgICAgYWxlcnQuZGF0YS5hd3Muc2VydmljZS5ldmVudEZpcnN0U2VlbiA9IGZvcm1hdERhdGUoXG4gICAgICAgICAgYmVmb3JlRGF0ZSxcbiAgICAgICAgICAnWS1NLURUaDptOnMubFonLFxuICAgICAgICApO1xuICAgICAgICBhbGVydC5kYXRhLmF3cy5zZXJ2aWNlLmV2ZW50TGFzdFNlZW4gPSBmb3JtYXREYXRlKFxuICAgICAgICAgIG5ldyBEYXRlKGFsZXJ0LnRpbWVzdGFtcCksXG4gICAgICAgICAgJ1ktTS1EVGg6bTpzLmxaJyxcbiAgICAgICAgKTtcbiAgICAgICAgYWxlcnQuZGF0YS5hd3Muc2VydmljZS5hZGRpdGlvbmFsSW5mbyA9IHtcbiAgICAgICAgICBsb2NhbFBvcnQ6IGAke3JhbmRvbUFycmF5SXRlbShQb3J0cyl9YCxcbiAgICAgICAgICBvdXRCeXRlczogYCR7cmFuZG9tSW50ZXJ2YWxJbnRlZ2VyKDEwMDAsIDMwMDApfWAsXG4gICAgICAgICAgaW5CeXRlczogYCR7cmFuZG9tSW50ZXJ2YWxJbnRlZ2VyKDEwMDAsIDEwMDAwKX1gLFxuICAgICAgICAgIHVudXN1YWw6IGAke3JhbmRvbUludGVydmFsSW50ZWdlcigxMDAwLCAxMDAwMCl9YCxcbiAgICAgICAgfTtcbiAgICAgICAgYWxlcnQuZGF0YS5hd3Muc2VydmljZS5jb3VudCA9IGAke3JhbmRvbUludGVydmFsSW50ZWdlcig0MDAsIDQwMDApfWA7XG4gICAgICAgIGFsZXJ0LmRhdGEuYXdzLnNlcnZpY2UuYWN0aW9uLm5ldHdvcmtDb25uZWN0aW9uQWN0aW9uLmxvY2FsSXBEZXRhaWxzLmlwQWRkcmVzc1Y0ID1cbiAgICAgICAgICBhbGVydC5kYXRhLmF3cy5yZXNvdXJjZS5pbnN0YW5jZURldGFpbHMubmV0d29ya0ludGVyZmFjZXMucHJpdmF0ZUlwQWRkcmVzcztcbiAgICAgICAgYWxlcnQuZGF0YS5hd3MuYXJuID0gaW50ZXJwb2xhdGVBbGVydFByb3BzKFxuICAgICAgICAgIHR5cGVBbGVydC5kYXRhLmF3cy5hcm4sXG4gICAgICAgICAgYWxlcnQsXG4gICAgICAgICk7XG4gICAgICAgIGFsZXJ0LnJ1bGUgPSB7IC4uLnR5cGVBbGVydC5ydWxlIH07XG4gICAgICAgIGFsZXJ0LnJ1bGUuZmlyZWR0aW1lcyA9IHJhbmRvbUludGVydmFsSW50ZWdlcigxLCA1MCk7XG4gICAgICAgIGFsZXJ0LnJ1bGUuZGVzY3JpcHRpb24gPSBpbnRlcnBvbGF0ZUFsZXJ0UHJvcHMoXG4gICAgICAgICAgdHlwZUFsZXJ0LnJ1bGUuZGVzY3JpcHRpb24sXG4gICAgICAgICAgYWxlcnQsXG4gICAgICAgICk7XG5cbiAgICAgICAgYWxlcnQuZGVjb2RlciA9IHsgLi4udHlwZUFsZXJ0LmRlY29kZXIgfTtcbiAgICAgICAgYWxlcnQubG9jYXRpb24gPSB0eXBlQWxlcnQubG9jYXRpb247XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnaWFtUG9saWN5R3JhbnRHbG9iYWwnOiB7XG4gICAgICAgIGNvbnN0IHR5cGVBbGVydCA9IEFXUy5pYW1Qb2xpY3lHcmFudEdsb2JhbDtcblxuICAgICAgICBhbGVydC5kYXRhID0geyAuLi50eXBlQWxlcnQuZGF0YSB9O1xuICAgICAgICBhbGVydC5kYXRhLmludGVncmF0aW9uID0gJ2F3cyc7XG4gICAgICAgIGFsZXJ0LmRhdGEuYXdzLnJlZ2lvbiA9IHJhbmRvbUFycmF5SXRlbShBV1MucmVnaW9uKTtcbiAgICAgICAgYWxlcnQuZGF0YS5hd3Muc3VtbWFyeS5UaW1lc3RhbXBzID0gZm9ybWF0RGF0ZShcbiAgICAgICAgICBiZWZvcmVEYXRlLFxuICAgICAgICAgICdZLU0tRFRoOm06cy5sWicsXG4gICAgICAgICk7XG4gICAgICAgIGFsZXJ0LmRhdGEuYXdzLmxvZ19pbmZvID0ge1xuICAgICAgICAgIHMzYnVja2V0OiByYW5kb21BcnJheUl0ZW0oQVdTLmJ1Y2tldHMpLFxuICAgICAgICAgIGxvZ19maWxlOiBgbWFjaWUvJHtmb3JtYXREYXRlKFxuICAgICAgICAgICAgbmV3IERhdGUoYWxlcnQudGltZXN0YW1wKSxcbiAgICAgICAgICAgICdZL00vRC9oJyxcbiAgICAgICAgICApfS9maXJlaG9zZV9tYWNpZS0xLSR7Zm9ybWF0RGF0ZShcbiAgICAgICAgICAgIG5ldyBEYXRlKGFsZXJ0LnRpbWVzdGFtcCksXG4gICAgICAgICAgICAnWS1NLUQtaC1tLXMnLFxuICAgICAgICAgICl9LTBiMWVkZTk0LWYzOTktNGU1NC04ODE1LTFjNjU4N2VlZTNiMS8vZmlyZWhvc2VfZ3VhcmRkdXR5LTEtJHtmb3JtYXREYXRlKFxuICAgICAgICAgICAgbmV3IERhdGUoYWxlcnQudGltZXN0YW1wKSxcbiAgICAgICAgICAgICdZLU0tRC1oLW0tcy1sJyxcbiAgICAgICAgICApfWI1YjliLWVjNjItNGEwNy04NWQ3LWIxNjk5YjljMDMxZS56aXBgLFxuICAgICAgICB9O1xuICAgICAgICBhbGVydC5kYXRhLmF3c1snY3JlYXRlZC1hdCddID0gZm9ybWF0RGF0ZShiZWZvcmVEYXRlLCAnWS1NLURUaDptOnMubFonKTtcbiAgICAgICAgYWxlcnQuZGF0YS5hd3MudXJsID0gaW50ZXJwb2xhdGVBbGVydFByb3BzKFxuICAgICAgICAgIHR5cGVBbGVydC5kYXRhLmF3cy51cmwsXG4gICAgICAgICAgYWxlcnQsXG4gICAgICAgICk7XG4gICAgICAgIGFsZXJ0LmRhdGEuYXdzWydhbGVydC1hcm4nXSA9IGludGVycG9sYXRlQWxlcnRQcm9wcyhcbiAgICAgICAgICB0eXBlQWxlcnQuZGF0YS5hd3NbJ2FsZXJ0LWFybiddLFxuICAgICAgICAgIGFsZXJ0LFxuICAgICAgICApO1xuXG4gICAgICAgIGFsZXJ0LnJ1bGUgPSB7IC4uLnR5cGVBbGVydC5ydWxlIH07XG4gICAgICAgIGFsZXJ0LnJ1bGUuZmlyZWR0aW1lcyA9IHJhbmRvbUludGVydmFsSW50ZWdlcigxLCA1MCk7XG5cbiAgICAgICAgYWxlcnQuZGVjb2RlciA9IHsgLi4udHlwZUFsZXJ0LmRlY29kZXIgfTtcbiAgICAgICAgYWxlcnQubG9jYXRpb24gPSB0eXBlQWxlcnQubG9jYXRpb247XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgfVxuICAgIH1cbiAgICBhbGVydC5pbnB1dCA9IHsgdHlwZTogJ2xvZycgfTtcbiAgICBhbGVydC5HZW9Mb2NhdGlvbiA9IHJhbmRvbUFycmF5SXRlbShHZW9Mb2NhdGlvbik7XG4gIH1cblxuICBpZiAocGFyYW1zLm9mZmljZSkge1xuICAgIGFsZXJ0LmFnZW50ID0ge1xuICAgICAgaWQ6ICcwMDAnLFxuICAgICAgaXA6IGFsZXJ0LmFnZW50LmlwLFxuICAgICAgbmFtZTogYWxlcnQuYWdlbnQubmFtZSxcbiAgICB9O1xuXG4gICAgaWYgKHBhcmFtcy5tYW5hZ2VyICYmIHBhcmFtcy5tYW5hZ2VyLm5hbWUpIHtcbiAgICAgIGFsZXJ0LmFnZW50Lm5hbWUgPSBwYXJhbXMubWFuYWdlci5uYW1lO1xuICAgIH1cblxuICAgIGNvbnN0IGJlZm9yZURhdGUgPSBuZXcgRGF0ZShcbiAgICAgIG5ldyBEYXRlKGFsZXJ0LnRpbWVzdGFtcCkgLSAzICogMjQgKiA2MCAqIDYwICogMTAwMCxcbiAgICApO1xuICAgIGNvbnN0IEludHJhSUQgPSByYW5kb21BcnJheUl0ZW0oT2ZmaWNlLmFycmF5VXVpZE9mZmljZSk7XG4gICAgY29uc3QgT3JnSUQgPSByYW5kb21BcnJheUl0ZW0oT2ZmaWNlLmFycmF5VXVpZE9mZmljZSk7XG4gICAgY29uc3Qgb2JqSUQgPSByYW5kb21BcnJheUl0ZW0oT2ZmaWNlLmFycmF5VXVpZE9mZmljZSk7XG4gICAgY29uc3QgdXNlcktleSA9IHJhbmRvbUFycmF5SXRlbShPZmZpY2UuYXJyYXlVdWlkT2ZmaWNlKTtcbiAgICBjb25zdCB1c2VySUQgPSByYW5kb21BcnJheUl0ZW0oT2ZmaWNlLmFycmF5VXNlcklkKTtcbiAgICBjb25zdCB1c2VyVHlwZSA9IHJhbmRvbUFycmF5SXRlbShbMCwgMiwgNF0pO1xuICAgIGNvbnN0IHJlc3VsdFN0YXR1cyA9IHJhbmRvbUFycmF5SXRlbShbXG4gICAgICAnU3VjY2VlZGVkJyxcbiAgICAgICdQYXJ0aWFsbHlTdWNjZWVkZWQnLFxuICAgICAgJ0ZhaWxlZCcsXG4gICAgXSk7XG4gICAgY29uc3QgbG9nID0gcmFuZG9tQXJyYXlJdGVtKE9mZmljZS5hcnJheUxvZ3MpO1xuICAgIGNvbnN0IHJ1bGVEYXRhID0gT2ZmaWNlLm9mZmljZVJ1bGVzW2xvZy5SZWNvcmRUeXBlXTtcblxuICAgIGFsZXJ0LmFnZW50LmlkID0gJzAwMCc7XG4gICAgYWxlcnQucnVsZSA9IHJ1bGVEYXRhLnJ1bGU7XG4gICAgYWxlcnQuZGVjb2RlciA9IHJhbmRvbUFycmF5SXRlbShPZmZpY2UuYXJyYXlEZWNvZGVyT2ZmaWNlKTtcbiAgICBhbGVydC5HZW9Mb2NhdGlvbiA9IHJhbmRvbUFycmF5SXRlbShHZW9Mb2NhdGlvbik7XG4gICAgYWxlcnQuZGF0YS5pbnRlZ3JhdGlvbiA9ICdPZmZpY2UzNjUnO1xuICAgIGFsZXJ0LmxvY2F0aW9uID0gT2ZmaWNlLmFycmF5TG9jYXRpb25PZmZpY2U7XG4gICAgYWxlcnQuZGF0YS5vZmZpY2UzNjUgPSB7XG4gICAgICAuLi5sb2csXG4gICAgICAuLi5ydWxlRGF0YS5kYXRhLm9mZmljZTM2NSxcbiAgICAgIElkOiBJbnRyYUlELFxuICAgICAgQ3JlYXRpb25UaW1lOiBmb3JtYXREYXRlKGJlZm9yZURhdGUsICdZLU0tRFRoOm06cy5sWicpLFxuICAgICAgT3JnYW5pemF0aW9uSWQ6IE9yZ0lELFxuICAgICAgVXNlclR5cGU6IHVzZXJUeXBlLFxuICAgICAgVXNlcktleTogdXNlcktleSxcbiAgICAgIFJlc3VsdFN0YXR1czogcmVzdWx0U3RhdHVzLFxuICAgICAgT2JqZWN0SWQ6IG9iaklELFxuICAgICAgVXNlcklkOiB1c2VySUQsXG4gICAgICBDbGllbnRJUDogcmFuZG9tQXJyYXlJdGVtKE9mZmljZS5hcnJheUlwKSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKHBhcmFtcy5nY3ApIHtcbiAgICBhbGVydC5ydWxlID0gcmFuZG9tQXJyYXlJdGVtKEdDUC5hcnJheVJ1bGVzKTtcbiAgICBhbGVydC5kYXRhLmludGVncmF0aW9uID0gJ2djcCc7XG4gICAgYWxlcnQuZGF0YS5nY3AgPSB7XG4gICAgICBpbnNlcnRJZDogJ3VrMXpwZTIzeGNqJyxcbiAgICAgIGpzb25QYXlsb2FkOiB7XG4gICAgICAgIGF1dGhBbnN3ZXI6XG4gICAgICAgICAgR0NQLmFycmF5QXV0aEFuc3dlcltcbiAgICAgICAgICAgIE1hdGguZmxvb3IoR0NQLmFycmF5QXV0aEFuc3dlci5sZW5ndGggKiBNYXRoLnJhbmRvbSgpKVxuICAgICAgICAgIF0sXG4gICAgICAgIHByb3RvY29sOlxuICAgICAgICAgIEdDUC5hcnJheVByb3RvY29sW1xuICAgICAgICAgICAgTWF0aC5mbG9vcihHQ1AuYXJyYXlQcm90b2NvbC5sZW5ndGggKiBNYXRoLnJhbmRvbSgpKVxuICAgICAgICAgIF0sXG4gICAgICAgIHF1ZXJ5TmFtZTpcbiAgICAgICAgICBHQ1AuYXJyYXlRdWVyeU5hbWVbXG4gICAgICAgICAgICBNYXRoLmZsb29yKEdDUC5hcnJheVF1ZXJ5TmFtZS5sZW5ndGggKiBNYXRoLnJhbmRvbSgpKVxuICAgICAgICAgIF0sXG4gICAgICAgIHF1ZXJ5VHlwZTpcbiAgICAgICAgICBHQ1AuYXJyYXlRdWVyeVR5cGVbXG4gICAgICAgICAgICBNYXRoLmZsb29yKEdDUC5hcnJheVF1ZXJ5VHlwZS5sZW5ndGggKiBNYXRoLnJhbmRvbSgpKVxuICAgICAgICAgIF0sXG4gICAgICAgIHJlc3BvbnNlQ29kZTpcbiAgICAgICAgICBHQ1AuYXJyYXlSZXNwb25zZUNvZGVbXG4gICAgICAgICAgICBNYXRoLmZsb29yKEdDUC5hcnJheVJlc3BvbnNlQ29kZS5sZW5ndGggKiBNYXRoLnJhbmRvbSgpKVxuICAgICAgICAgIF0sXG4gICAgICAgIHNvdXJjZUlQOlxuICAgICAgICAgIEdDUC5hcnJheVNvdXJjZUlQW1xuICAgICAgICAgICAgTWF0aC5mbG9vcihHQ1AuYXJyYXlTb3VyY2VJUC5sZW5ndGggKiBNYXRoLnJhbmRvbSgpKVxuICAgICAgICAgIF0sXG4gICAgICAgIHZtSW5zdGFuY2VJZDogJzQ5ODAxMTM5Mjg4MDA4Mzk2ODAuMDAwMDAwJyxcbiAgICAgICAgdm1JbnN0YW5jZU5hbWU6ICc1MzEzMzkyMjk1MzEuaW5zdGFuY2UtMScsXG4gICAgICB9LFxuICAgICAgbG9nTmFtZTogJ3Byb2plY3RzL3dhenVoLWRldi9sb2dzL2Rucy5nb29nbGVhcGlzLmNvbSUyRmRuc19xdWVyaWVzJyxcbiAgICAgIHJlY2VpdmVUaW1lc3RhbXA6ICcyMDE5LTExLTExVDAyOjQyOjA1LjA1ODUzMTUyWicsXG4gICAgICByZXNvdXJjZToge1xuICAgICAgICBsYWJlbHM6IHtcbiAgICAgICAgICBsb2NhdGlvbjpcbiAgICAgICAgICAgIEdDUC5hcnJheUxvY2F0aW9uW1xuICAgICAgICAgICAgICBNYXRoLmZsb29yKEdDUC5hcnJheUxvY2F0aW9uLmxlbmd0aCAqIE1hdGgucmFuZG9tKCkpXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIHByb2plY3RfaWQ6XG4gICAgICAgICAgICBHQ1AuYXJyYXlQcm9qZWN0W1xuICAgICAgICAgICAgICBNYXRoLmZsb29yKEdDUC5hcnJheVByb2plY3QubGVuZ3RoICogTWF0aC5yYW5kb20oKSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgc291cmNlX3R5cGU6XG4gICAgICAgICAgICBHQ1AuYXJyYXlTb3VyY2VUeXBlW1xuICAgICAgICAgICAgICBNYXRoLmZsb29yKEdDUC5hcnJheVNvdXJjZVR5cGUubGVuZ3RoICogTWF0aC5yYW5kb20oKSlcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgdGFyZ2V0X3R5cGU6ICdleHRlcm5hbCcsXG4gICAgICAgIH0sXG4gICAgICAgIHR5cGU6IEdDUC5hcnJheVR5cGVbTWF0aC5mbG9vcihHQ1AuYXJyYXlUeXBlLmxlbmd0aCAqIE1hdGgucmFuZG9tKCkpXSxcbiAgICAgIH0sXG4gICAgICBzZXZlcml0eTpcbiAgICAgICAgR0NQLmFycmF5U2V2ZXJpdHlbTWF0aC5mbG9vcihHQ1AuYXJyYXlTZXZlcml0eS5sZW5ndGggKiBNYXRoLnJhbmRvbSgpKV0sXG4gICAgICB0aW1lc3RhbXA6ICcyMDE5LTExLTExVDAyOjQyOjA0LjM0OTIxNDQ5WicsXG4gICAgfTtcblxuICAgIGFsZXJ0Lkdlb0xvY2F0aW9uID0gcmFuZG9tQXJyYXlJdGVtKEdlb0xvY2F0aW9uKTtcbiAgfVxuXG4gIGlmIChwYXJhbXMuYXVkaXQpIHtcbiAgICBsZXQgZGF0YUF1ZGl0ID0gcmFuZG9tQXJyYXlJdGVtKEF1ZGl0LmRhdGFBdWRpdCk7XG4gICAgYWxlcnQuZGF0YSA9IGRhdGFBdWRpdC5kYXRhO1xuICAgIGFsZXJ0LmRhdGEuYXVkaXQuZmlsZVxuICAgICAgPyBhbGVydC5kYXRhLmF1ZGl0LmZpbGUubmFtZSA9PT0gJydcbiAgICAgICAgPyAoYWxlcnQuZGF0YS5hdWRpdC5maWxlLm5hbWUgPSByYW5kb21BcnJheUl0ZW0oQXVkaXQuZmlsZU5hbWUpKVxuICAgICAgICA6IG51bGxcbiAgICAgIDogbnVsbDtcbiAgICBhbGVydC5ydWxlID0gZGF0YUF1ZGl0LnJ1bGU7XG4gIH1cblxuICBpZiAocGFyYW1zLmNpc2NhdCkge1xuICAgIGFsZXJ0LnJ1bGUuZ3JvdXBzLnB1c2goJ2Npc2NhdCcpO1xuICAgIGFsZXJ0LmRhdGEuY2lzID0ge307XG5cbiAgICBhbGVydC5kYXRhLmNpcy5ncm91cCA9IHJhbmRvbUFycmF5SXRlbShDSVNDQVQuZ3JvdXApO1xuICAgIGFsZXJ0LmRhdGEuY2lzLmZhaWwgPSByYW5kb21JbnRlcnZhbEludGVnZXIoMCwgMTAwKTtcbiAgICBhbGVydC5kYXRhLmNpcy5ydWxlX3RpdGxlID0gcmFuZG9tQXJyYXlJdGVtKENJU0NBVC5ydWxlVGl0bGUpO1xuICAgIGFsZXJ0LmRhdGEuY2lzLm5vdGNoZWNrZWQgPSByYW5kb21JbnRlcnZhbEludGVnZXIoMCwgMTAwKTtcbiAgICBhbGVydC5kYXRhLmNpcy5zY29yZSA9IHJhbmRvbUludGVydmFsSW50ZWdlcigwLCAxMDApO1xuICAgIGFsZXJ0LmRhdGEuY2lzLnBhc3MgPSByYW5kb21JbnRlcnZhbEludGVnZXIoMCwgMTAwKTtcbiAgICBhbGVydC5kYXRhLmNpcy50aW1lc3RhbXAgPSBuZXcgRGF0ZShyYW5kb21EYXRlKCkpO1xuICAgIGFsZXJ0LmRhdGEuY2lzLmVycm9yID0gcmFuZG9tSW50ZXJ2YWxJbnRlZ2VyKDAsIDEpO1xuICAgIGFsZXJ0LmRhdGEuY2lzLmJlbmNobWFyayA9IHJhbmRvbUFycmF5SXRlbShDSVNDQVQuYmVuY2htYXJrKTtcbiAgICBhbGVydC5kYXRhLmNpcy51bmtub3duID0gcmFuZG9tSW50ZXJ2YWxJbnRlZ2VyKDAsIDEwMCk7XG4gICAgYWxlcnQuZGF0YS5jaXMubm90Y2hlY2tlZCA9IHJhbmRvbUludGVydmFsSW50ZWdlcigwLCA1KTtcbiAgICBhbGVydC5kYXRhLmNpcy5yZXN1bHQgPSByYW5kb21BcnJheUl0ZW0oQ0lTQ0FULnJlc3VsdCk7XG4gIH1cblxuICBpZiAocGFyYW1zLmRvY2tlcikge1xuICAgIGNvbnN0IGRhdGFEb2NrZXIgPSByYW5kb21BcnJheUl0ZW0oRG9ja2VyLmRhdGFEb2NrZXIpO1xuICAgIGFsZXJ0LmRhdGEgPSB7fTtcbiAgICBhbGVydC5kYXRhID0gZGF0YURvY2tlci5kYXRhO1xuICAgIGFsZXJ0LnJ1bGUgPSBkYXRhRG9ja2VyLnJ1bGU7XG4gIH1cblxuICBpZiAocGFyYW1zLm1pdHJlKSB7XG4gICAgYWxlcnQucnVsZSA9IHJhbmRvbUFycmF5SXRlbShNaXRyZS5hcnJheU1pdHJlUnVsZXMpO1xuICAgIGFsZXJ0LmxvY2F0aW9uID0gcmFuZG9tQXJyYXlJdGVtKE1pdHJlLmFycmF5TG9jYXRpb24pO1xuICB9XG5cbiAgaWYgKHBhcmFtcy5vcGVuc2NhcCkge1xuICAgIGFsZXJ0LmRhdGEgPSB7fTtcbiAgICBhbGVydC5kYXRhLm9zY2FwID0ge307XG4gICAgY29uc3QgdHlwZUFsZXJ0ID0geyAuLi5yYW5kb21BcnJheUl0ZW0oT3BlblNDQVAuZGF0YSkgfTtcbiAgICBhbGVydC5kYXRhID0geyAuLi50eXBlQWxlcnQuZGF0YSB9O1xuICAgIGFsZXJ0LnJ1bGUgPSB7IC4uLnR5cGVBbGVydC5ydWxlIH07XG4gICAgYWxlcnQucnVsZS5maXJlZHRpbWVzID0gcmFuZG9tSW50ZXJ2YWxJbnRlZ2VyKDIsIDEwKTtcbiAgICBhbGVydC5pbnB1dCA9IHtcbiAgICAgIHR5cGU6ICdsb2cnLFxuICAgIH07XG4gICAgYWxlcnQuZGVjb2RlciA9IHsgLi4uT3BlblNDQVAuZGVjb2RlciB9O1xuICAgIGFsZXJ0LmxvY2F0aW9uID0gT3BlblNDQVAubG9jYXRpb247XG4gICAgaWYgKHR5cGVBbGVydC5mdWxsX2xvZykge1xuICAgICAgYWxlcnQuZnVsbF9sb2cgPSBpbnRlcnBvbGF0ZUFsZXJ0UHJvcHModHlwZUFsZXJ0LmZ1bGxfbG9nLCBhbGVydCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHBhcmFtcy5yb290Y2hlY2spIHtcbiAgICBhbGVydC5sb2NhdGlvbiA9IFBvbGljeU1vbml0b3JpbmcubG9jYXRpb247XG4gICAgYWxlcnQuZGVjb2RlciA9IHsgLi4uUG9saWN5TW9uaXRvcmluZy5kZWNvZGVyIH07XG4gICAgYWxlcnQuaW5wdXQgPSB7XG4gICAgICB0eXBlOiAnbG9nJyxcbiAgICB9O1xuXG4gICAgY29uc3QgYWxlcnRDYXRlZ29yeSA9IHJhbmRvbUFycmF5SXRlbShbJ1Jvb3RraXQnLCAnVHJvamFuJ10pO1xuXG4gICAgc3dpdGNoIChhbGVydENhdGVnb3J5KSB7XG4gICAgICBjYXNlICdSb290a2l0Jzoge1xuICAgICAgICBjb25zdCByb290a2l0Q2F0ZWdvcnkgPSByYW5kb21BcnJheUl0ZW0oXG4gICAgICAgICAgT2JqZWN0LmtleXMoUG9saWN5TW9uaXRvcmluZy5yb290a2l0cyksXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHJvb3RraXQgPSByYW5kb21BcnJheUl0ZW0oXG4gICAgICAgICAgUG9saWN5TW9uaXRvcmluZy5yb290a2l0c1tyb290a2l0Q2F0ZWdvcnldLFxuICAgICAgICApO1xuICAgICAgICBhbGVydC5kYXRhID0ge1xuICAgICAgICAgIHRpdGxlOiBpbnRlcnBvbGF0ZUFsZXJ0UHJvcHMoXG4gICAgICAgICAgICBQb2xpY3lNb25pdG9yaW5nLnJvb3RraXRzRGF0YS5kYXRhLnRpdGxlLFxuICAgICAgICAgICAgYWxlcnQsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIF9yb290a2l0X2NhdGVnb3J5OiByb290a2l0Q2F0ZWdvcnksXG4gICAgICAgICAgICAgIF9yb290a2l0X2ZpbGU6IHJvb3RraXQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICksXG4gICAgICAgIH07XG4gICAgICAgIGFsZXJ0LnJ1bGUgPSB7IC4uLlBvbGljeU1vbml0b3Jpbmcucm9vdGtpdHNEYXRhLnJ1bGUgfTtcbiAgICAgICAgYWxlcnQucnVsZS5maXJlZHRpbWVzID0gcmFuZG9tSW50ZXJ2YWxJbnRlZ2VyKDEsIDEwKTtcbiAgICAgICAgYWxlcnQuZnVsbF9sb2cgPSBhbGVydC5kYXRhLnRpdGxlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ1Ryb2phbic6IHtcbiAgICAgICAgY29uc3QgdHJvamFuID0gcmFuZG9tQXJyYXlJdGVtKFBvbGljeU1vbml0b3JpbmcudHJvamFucyk7XG4gICAgICAgIGFsZXJ0LmRhdGEgPSB7XG4gICAgICAgICAgZmlsZTogdHJvamFuLmZpbGUsXG4gICAgICAgICAgdGl0bGU6ICdUcm9qYW5lZCB2ZXJzaW9uIG9mIGZpbGUgZGV0ZWN0ZWQuJyxcbiAgICAgICAgfTtcbiAgICAgICAgYWxlcnQucnVsZSA9IHsgLi4uUG9saWN5TW9uaXRvcmluZy50cm9qYW5zRGF0YS5ydWxlIH07XG4gICAgICAgIGFsZXJ0LnJ1bGUuZmlyZWR0aW1lcyA9IHJhbmRvbUludGVydmFsSW50ZWdlcigxLCAxMCk7XG4gICAgICAgIGFsZXJ0LmZ1bGxfbG9nID0gaW50ZXJwb2xhdGVBbGVydFByb3BzKFxuICAgICAgICAgIFBvbGljeU1vbml0b3JpbmcudHJvamFuc0RhdGEuZnVsbF9sb2csXG4gICAgICAgICAgYWxlcnQsXG4gICAgICAgICAge1xuICAgICAgICAgICAgX3Ryb2phbl9zaWduYXR1cmU6IHRyb2phbi5zaWduYXR1cmUsXG4gICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKHBhcmFtcy5zeXNjaGVjaykge1xuICAgIGFsZXJ0LnJ1bGUuZ3JvdXBzLnB1c2goJ3N5c2NoZWNrJyk7XG4gICAgYWxlcnQuc3lzY2hlY2sgPSB7fTtcbiAgICBhbGVydC5zeXNjaGVjay5ldmVudCA9IHJhbmRvbUFycmF5SXRlbShJbnRlZ3JpdHlNb25pdG9yaW5nLmV2ZW50cyk7XG4gICAgYWxlcnQuc3lzY2hlY2sucGF0aCA9IHJhbmRvbUFycmF5SXRlbShcbiAgICAgIGFsZXJ0LmFnZW50Lm5hbWUgPT09ICdXaW5kb3dzJ1xuICAgICAgICA/IEludGVncml0eU1vbml0b3JpbmcucGF0aHNXaW5kb3dzXG4gICAgICAgIDogSW50ZWdyaXR5TW9uaXRvcmluZy5wYXRoc0xpbnV4LFxuICAgICk7XG4gICAgYWxlcnQuc3lzY2hlY2sudW5hbWVfYWZ0ZXIgPSByYW5kb21BcnJheUl0ZW0oVXNlcnMpO1xuICAgIGFsZXJ0LnN5c2NoZWNrLmduYW1lX2FmdGVyID0gJ3Jvb3QnO1xuICAgIGFsZXJ0LnN5c2NoZWNrLm10aW1lX2FmdGVyID0gbmV3IERhdGUocmFuZG9tRGF0ZSgpKTtcbiAgICBhbGVydC5zeXNjaGVjay5zaXplX2FmdGVyID0gcmFuZG9tSW50ZXJ2YWxJbnRlZ2VyKDAsIDY1KTtcbiAgICBhbGVydC5zeXNjaGVjay51aWRfYWZ0ZXIgPSByYW5kb21BcnJheUl0ZW0oSW50ZWdyaXR5TW9uaXRvcmluZy51aWRfYWZ0ZXIpO1xuICAgIGFsZXJ0LnN5c2NoZWNrLmdpZF9hZnRlciA9IHJhbmRvbUFycmF5SXRlbShJbnRlZ3JpdHlNb25pdG9yaW5nLmdpZF9hZnRlcik7XG4gICAgYWxlcnQuc3lzY2hlY2sucGVybV9hZnRlciA9ICdydy1yLS1yLS0nO1xuICAgIGFsZXJ0LnN5c2NoZWNrLmlub2RlX2FmdGVyID0gcmFuZG9tSW50ZXJ2YWxJbnRlZ2VyKDAsIDEwMDAwMCk7XG4gICAgc3dpdGNoIChhbGVydC5zeXNjaGVjay5ldmVudCkge1xuICAgICAgY2FzZSAnYWRkZWQnOlxuICAgICAgICBhbGVydC5ydWxlID0gSW50ZWdyaXR5TW9uaXRvcmluZy5yZWd1bGF0b3J5WzBdO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ21vZGlmaWVkJzpcbiAgICAgICAgYWxlcnQucnVsZSA9IEludGVncml0eU1vbml0b3JpbmcucmVndWxhdG9yeVsxXTtcbiAgICAgICAgYWxlcnQuc3lzY2hlY2subXRpbWVfYmVmb3JlID0gbmV3IERhdGUoXG4gICAgICAgICAgYWxlcnQuc3lzY2hlY2subXRpbWVfYWZ0ZXIuZ2V0VGltZSgpIC0gMTAwMCAqIDYwLFxuICAgICAgICApO1xuICAgICAgICBhbGVydC5zeXNjaGVjay5pbm9kZV9iZWZvcmUgPSByYW5kb21JbnRlcnZhbEludGVnZXIoMCwgMTAwMDAwKTtcbiAgICAgICAgYWxlcnQuc3lzY2hlY2suc2hhMV9hZnRlciA9IHJhbmRvbUVsZW1lbnRzKDQwLCAnYWJjZGVmMDEyMzQ1Njc4OScpO1xuICAgICAgICBhbGVydC5zeXNjaGVjay5jaGFuZ2VkX2F0dHJpYnV0ZXMgPSBbXG4gICAgICAgICAgcmFuZG9tQXJyYXlJdGVtKEludGVncml0eU1vbml0b3JpbmcuYXR0cmlidXRlcyksXG4gICAgICAgIF07XG4gICAgICAgIGFsZXJ0LnN5c2NoZWNrLm1kNV9hZnRlciA9IHJhbmRvbUVsZW1lbnRzKDMyLCAnYWJjZGVmMDEyMzQ1Njc4OScpO1xuICAgICAgICBhbGVydC5zeXNjaGVjay5zaGEyNTZfYWZ0ZXIgPSByYW5kb21FbGVtZW50cyg2NCwgJ2FiY2RlZjAxMjM0NTY3ODknKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkZWxldGVkJzpcbiAgICAgICAgYWxlcnQucnVsZSA9IEludGVncml0eU1vbml0b3JpbmcucmVndWxhdG9yeVsyXTtcbiAgICAgICAgYWxlcnQuc3lzY2hlY2sudGFncyA9IFtyYW5kb21BcnJheUl0ZW0oSW50ZWdyaXR5TW9uaXRvcmluZy50YWdzKV07XG4gICAgICAgIGFsZXJ0LnN5c2NoZWNrLnNoYTFfYWZ0ZXIgPSByYW5kb21FbGVtZW50cyg0MCwgJ2FiY2RlZjAxMjM0NTY3ODknKTtcbiAgICAgICAgYWxlcnQuc3lzY2hlY2suYXVkaXQgPSB7XG4gICAgICAgICAgcHJvY2Vzczoge1xuICAgICAgICAgICAgbmFtZTogcmFuZG9tQXJyYXlJdGVtKFBhdGhzKSxcbiAgICAgICAgICAgIGlkOiByYW5kb21JbnRlcnZhbEludGVnZXIoMCwgMTAwMDAwKSxcbiAgICAgICAgICAgIHBwaWQ6IHJhbmRvbUludGVydmFsSW50ZWdlcigwLCAxMDAwMDApLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZWZmZWN0aXZlX3VzZXI6IHtcbiAgICAgICAgICAgIG5hbWU6IHJhbmRvbUFycmF5SXRlbShVc2VycyksXG4gICAgICAgICAgICBpZDogcmFuZG9tSW50ZXJ2YWxJbnRlZ2VyKDAsIDEwMCksXG4gICAgICAgICAgfSxcbiAgICAgICAgICB1c2VyOiB7XG4gICAgICAgICAgICBuYW1lOiByYW5kb21BcnJheUl0ZW0oVXNlcnMpLFxuICAgICAgICAgICAgaWQ6IHJhbmRvbUludGVydmFsSW50ZWdlcigwLCAxMDApLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgZ3JvdXA6IHtcbiAgICAgICAgICAgIG5hbWU6IHJhbmRvbUFycmF5SXRlbShVc2VycyksXG4gICAgICAgICAgICBpZDogcmFuZG9tSW50ZXJ2YWxJbnRlZ2VyKDAsIDEwMCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgYWxlcnQuc3lzY2hlY2subWQ1X2FmdGVyID0gcmFuZG9tRWxlbWVudHMoMzIsICdhYmNkZWYwMTIzNDU2Nzg5Jyk7XG4gICAgICAgIGFsZXJ0LnN5c2NoZWNrLnNoYTI1Nl9hZnRlciA9IHJhbmRvbUVsZW1lbnRzKDY0LCAnYWJjZGVmMDEyMzQ1Njc4OScpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6IHtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAocGFyYW1zLnZpcnVzdG90YWwpIHtcbiAgICBhbGVydC5ydWxlLmdyb3Vwcy5wdXNoKCd2aXJ1c3RvdGFsJyk7XG4gICAgYWxlcnQubG9jYXRpb24gPSAndmlydXN0b3RhbCc7XG4gICAgYWxlcnQuZGF0YS52aXJ1c3RvdGFsID0ge307XG4gICAgYWxlcnQuZGF0YS52aXJ1c3RvdGFsLmZvdW5kID0gcmFuZG9tQXJyYXlJdGVtKFsnMCcsICcxJywgJzEnLCAnMSddKTtcblxuICAgIGFsZXJ0LmRhdGEudmlydXN0b3RhbC5zb3VyY2UgPSB7XG4gICAgICBzaGExOiByYW5kb21FbGVtZW50cyg0MCwgJ2FiY2RlZjAxMjM0NTY3ODknKSxcbiAgICAgIGZpbGU6IHJhbmRvbUFycmF5SXRlbShWaXJ1c3RvdGFsLnNvdXJjZUZpbGUpLFxuICAgICAgYWxlcnRfaWQ6IGAke3JhbmRvbUVsZW1lbnRzKDEwLCAnMDEyMzQ1Njc4OScpfS4ke3JhbmRvbUVsZW1lbnRzKFxuICAgICAgICA3LFxuICAgICAgICAnMDEyMzQ1Njc4OScsXG4gICAgICApfWAsXG4gICAgICBtZDU6IHJhbmRvbUVsZW1lbnRzKDMyLCAnYWJjZGVmMDEyMzQ1Njc4OScpLFxuICAgIH07XG5cbiAgICBpZiAoYWxlcnQuZGF0YS52aXJ1c3RvdGFsLmZvdW5kID09PSAnMScpIHtcbiAgICAgIGFsZXJ0LmRhdGEudmlydXN0b3RhbC5tYWxpY2lvdXMgPSByYW5kb21BcnJheUl0ZW0oVmlydXN0b3RhbC5tYWxpY2lvdXMpO1xuICAgICAgYWxlcnQuZGF0YS52aXJ1c3RvdGFsLnBvc2l0aXZlcyA9IGAke3JhbmRvbUludGVydmFsSW50ZWdlcigwLCA2NSl9YDtcbiAgICAgIGFsZXJ0LmRhdGEudmlydXN0b3RhbC50b3RhbCA9XG4gICAgICAgIGFsZXJ0LmRhdGEudmlydXN0b3RhbC5tYWxpY2lvdXMgKyBhbGVydC5kYXRhLnZpcnVzdG90YWwucG9zaXRpdmVzO1xuICAgICAgYWxlcnQucnVsZS5kZXNjcmlwdGlvbiA9IGBWaXJ1c1RvdGFsOiBBbGVydCAtICR7YWxlcnQuZGF0YS52aXJ1c3RvdGFsLnNvdXJjZS5maWxlfSAtICR7YWxlcnQuZGF0YS52aXJ1c3RvdGFsLnBvc2l0aXZlc30gZW5naW5lcyBkZXRlY3RlZCB0aGlzIGZpbGVgO1xuICAgICAgYWxlcnQuZGF0YS52aXJ1c3RvdGFsLnBlcm1hbGluayA9IHJhbmRvbUFycmF5SXRlbShWaXJ1c3RvdGFsLnBlcm1hbGluayk7XG4gICAgICBhbGVydC5kYXRhLnZpcnVzdG90YWwuc2Nhbl9kYXRlID0gbmV3IERhdGUoXG4gICAgICAgIERhdGUucGFyc2UoYWxlcnQudGltZXN0YW1wKSAtIDQgKiA2MDAwMCxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0LmRhdGEudmlydXN0b3RhbC5tYWxpY2lvdXMgPSAnMCc7XG4gICAgICBhbGVydC5ydWxlLmRlc2NyaXB0aW9uID1cbiAgICAgICAgJ1ZpcnVzVG90YWw6IEFsZXJ0IC0gTm8gcmVjb3JkcyBpbiBWaXJ1c1RvdGFsIGRhdGFiYXNlJztcbiAgICB9XG4gIH1cblxuICBpZiAocGFyYW1zLnZ1bG5lcmFiaWxpdGllcykge1xuICAgIGNvbnN0IGRhdGFWdWxuZXJhYmlsaXR5ID0gcmFuZG9tQXJyYXlJdGVtKFZ1bG5lcmFiaWxpdHkuZGF0YSk7XG4gICAgYWxlcnQucnVsZSA9IHtcbiAgICAgIC4uLmRhdGFWdWxuZXJhYmlsaXR5LnJ1bGUsXG4gICAgICBtYWlsOiBmYWxzZSxcbiAgICAgIGdyb3VwczogWyd2dWxuZXJhYmlsaXR5LWRldGVjdG9yJ10sXG4gICAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgICAgcGNpX2RzczogWycxMS4yLjEnLCAnMTEuMi4zJ10sXG4gICAgICB0c2M6IFsnQ0M3LjEnLCAnQ0M3LjInXSxcbiAgICB9O1xuICAgIGFsZXJ0LmxvY2F0aW9uID0gJ3Z1bG5lcmFiaWxpdHktZGV0ZWN0b3InO1xuICAgIGFsZXJ0LmRlY29kZXIgPSB7IG5hbWU6ICdqc29uJyB9O1xuICAgIGFsZXJ0LmRhdGEgPSB7XG4gICAgICAuLi5kYXRhVnVsbmVyYWJpbGl0eS5kYXRhLFxuICAgIH07XG4gIH1cblxuICBpZiAocGFyYW1zLm9zcXVlcnkpIHtcbiAgICBhbGVydC5ydWxlLmdyb3Vwcy5wdXNoKCdvc3F1ZXJ5Jyk7XG4gICAgYWxlcnQuZGF0YS5vc3F1ZXJ5ID0ge307XG4gICAgaWYgKHJhbmRvbUludGVydmFsSW50ZWdlcigwLCA1KSA9PT0gMCkge1xuICAgICAgYWxlcnQucnVsZS5kZXNjcmlwdGlvbiA9ICdvc3F1ZXJ5IGVycm9yIG1lc3NhZ2UnO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZGF0YU9zcXVlcnkgPSByYW5kb21BcnJheUl0ZW0oT3NxdWVyeS5kYXRhT3NxdWVyeSk7XG4gICAgICBhbGVydC5kYXRhLm9zcXVlcnkgPSBkYXRhT3NxdWVyeS5vc3F1ZXJ5O1xuICAgICAgYWxlcnQuZGF0YS5vc3F1ZXJ5LmNhbGVuZGFyVGltZSA9IGFsZXJ0LnRpbWVzdGFtcDtcbiAgICAgIGFsZXJ0LnJ1bGUuZGVzY3JpcHRpb24gPSBkYXRhT3NxdWVyeS5ydWxlLmRlc2NyaXB0aW9uO1xuICAgICAgcmFuZG9tSW50ZXJ2YWxJbnRlZ2VyKDAsIDk5KSA9PT0gMFxuICAgICAgICA/IChhbGVydC5kYXRhLm9zcXVlcnkuYWN0aW9uID0gJ3JlbW92ZWQnKVxuICAgICAgICA6IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVndWxhdG9yeSBjb21wbGlhbmNlXG4gIGlmIChcbiAgICBwYXJhbXMucGNpX2RzcyB8fFxuICAgIHBhcmFtcy5yZWd1bGF0b3J5X2NvbXBsaWFuY2UgfHxcbiAgICAocGFyYW1zLnJhbmRvbV9wcm9iYWJpbGl0eV9yZWd1bGF0b3J5X2NvbXBsaWFuY2UgJiZcbiAgICAgIHJhbmRvbVByb2JhYmlsaXR5KHBhcmFtcy5yYW5kb21fcHJvYmFiaWxpdHlfcmVndWxhdG9yeV9jb21wbGlhbmNlKSlcbiAgKSB7XG4gICAgYWxlcnQucnVsZS5wY2lfZHNzID0gW3JhbmRvbUFycmF5SXRlbShQQ0lfRFNTKV07XG4gIH1cbiAgaWYgKFxuICAgIHBhcmFtcy5nZHByIHx8XG4gICAgcGFyYW1zLnJlZ3VsYXRvcnlfY29tcGxpYW5jZSB8fFxuICAgIChwYXJhbXMucmFuZG9tX3Byb2JhYmlsaXR5X3JlZ3VsYXRvcnlfY29tcGxpYW5jZSAmJlxuICAgICAgcmFuZG9tUHJvYmFiaWxpdHkocGFyYW1zLnJhbmRvbV9wcm9iYWJpbGl0eV9yZWd1bGF0b3J5X2NvbXBsaWFuY2UpKVxuICApIHtcbiAgICBhbGVydC5ydWxlLmdkcHIgPSBbcmFuZG9tQXJyYXlJdGVtKEdEUFIpXTtcbiAgfVxuICBpZiAoXG4gICAgcGFyYW1zLmdwZzEzIHx8XG4gICAgcGFyYW1zLnJlZ3VsYXRvcnlfY29tcGxpYW5jZSB8fFxuICAgIChwYXJhbXMucmFuZG9tX3Byb2JhYmlsaXR5X3JlZ3VsYXRvcnlfY29tcGxpYW5jZSAmJlxuICAgICAgcmFuZG9tUHJvYmFiaWxpdHkocGFyYW1zLnJhbmRvbV9wcm9iYWJpbGl0eV9yZWd1bGF0b3J5X2NvbXBsaWFuY2UpKVxuICApIHtcbiAgICBhbGVydC5ydWxlLmdwZzEzID0gW3JhbmRvbUFycmF5SXRlbShHUEcxMyldO1xuICB9XG4gIGlmIChcbiAgICBwYXJhbXMuaGlwYWEgfHxcbiAgICBwYXJhbXMucmVndWxhdG9yeV9jb21wbGlhbmNlIHx8XG4gICAgKHBhcmFtcy5yYW5kb21fcHJvYmFiaWxpdHlfcmVndWxhdG9yeV9jb21wbGlhbmNlICYmXG4gICAgICByYW5kb21JbnRlcnZhbEludGVnZXIocGFyYW1zLnJhbmRvbV9wcm9iYWJpbGl0eV9yZWd1bGF0b3J5X2NvbXBsaWFuY2UpKVxuICApIHtcbiAgICBhbGVydC5ydWxlLmhpcGFhID0gW3JhbmRvbUFycmF5SXRlbShISVBBQSldO1xuICB9XG4gIGlmIChcbiAgICBwYXJhbXMubmlzdF84MDBfODMgfHxcbiAgICBwYXJhbXMucmVndWxhdG9yeV9jb21wbGlhbmNlIHx8XG4gICAgKHBhcmFtcy5yYW5kb21fcHJvYmFiaWxpdHlfcmVndWxhdG9yeV9jb21wbGlhbmNlICYmXG4gICAgICByYW5kb21JbnRlcnZhbEludGVnZXIocGFyYW1zLnJhbmRvbV9wcm9iYWJpbGl0eV9yZWd1bGF0b3J5X2NvbXBsaWFuY2UpKVxuICApIHtcbiAgICBhbGVydC5ydWxlLm5pc3RfODAwXzUzID0gW3JhbmRvbUFycmF5SXRlbShOSVNUXzgwMF81MyldO1xuICB9XG5cbiAgaWYgKHBhcmFtcy5hdXRoZW50aWNhdGlvbikge1xuICAgIGFsZXJ0LmRhdGEgPSB7XG4gICAgICBzcmNpcDogcmFuZG9tQXJyYXlJdGVtKElQcyksXG4gICAgICBzcmN1c2VyOiByYW5kb21BcnJheUl0ZW0oVXNlcnMpLFxuICAgICAgc3JjcG9ydDogcmFuZG9tQXJyYXlJdGVtKFBvcnRzKSxcbiAgICB9O1xuICAgIGFsZXJ0Lkdlb0xvY2F0aW9uID0gcmFuZG9tQXJyYXlJdGVtKEdlb0xvY2F0aW9uKTtcbiAgICBhbGVydC5kZWNvZGVyID0ge1xuICAgICAgbmFtZTogJ3NzaGQnLFxuICAgICAgcGFyZW50OiAnc3NoZCcsXG4gICAgfTtcbiAgICBhbGVydC5pbnB1dCA9IHtcbiAgICAgIHR5cGU6ICdsb2cnLFxuICAgIH07XG4gICAgYWxlcnQucHJlZGVjb2RlciA9IHtcbiAgICAgIHByb2dyYW1fbmFtZTogJ3NzaGQnLFxuICAgICAgdGltZXN0YW1wOiBmb3JtYXREYXRlKG5ldyBEYXRlKGFsZXJ0LnRpbWVzdGFtcCksICdOIEQgaDptOnMnKSxcbiAgICAgIGhvc3RuYW1lOiBhbGVydC5tYW5hZ2VyLm5hbWUsXG4gICAgfTtcbiAgICBsZXQgdHlwZUFsZXJ0ID0gcmFuZG9tQXJyYXlJdGVtKFtcbiAgICAgICdpbnZhbGlkTG9naW5QYXNzd29yZCcsXG4gICAgICAnaW52YWxpZExvZ2luVXNlcicsXG4gICAgICAnbXVsdGlwbGVBdXRoZW50aWNhdGlvbkZhaWx1cmVzJyxcbiAgICAgICd3aW5kb3dzSW52YWxpZExvZ2luUGFzc3dvcmQnLFxuICAgICAgJ3VzZXJMb2dpbkZhaWxlZCcsXG4gICAgICAncGFzc3dvcmRDaGVja0ZhaWxlZCcsXG4gICAgICAnbm9uRXhpc3RlbnRVc2VyJyxcbiAgICAgICdicnV0ZUZvcmNlVHJ5aW5nQWNjZXNzU3lzdGVtJyxcbiAgICAgICdhdXRoZW50aWNhdGlvblN1Y2Nlc3MnLFxuICAgICAgJ21heGltdW1BdXRoZW50aWNhdGlvbkF0dGVtcHRzRXhjZWVkZWQnLFxuICAgIF0pO1xuXG4gICAgc3dpdGNoICh0eXBlQWxlcnQpIHtcbiAgICAgIGNhc2UgJ2ludmFsaWRMb2dpblBhc3N3b3JkJzoge1xuICAgICAgICBhbGVydC5sb2NhdGlvbiA9IEF1dGhlbnRpY2F0aW9uLmludmFsaWRMb2dpblBhc3N3b3JkLmxvY2F0aW9uO1xuICAgICAgICBhbGVydC5ydWxlID0geyAuLi5BdXRoZW50aWNhdGlvbi5pbnZhbGlkTG9naW5QYXNzd29yZC5ydWxlIH07XG4gICAgICAgIGFsZXJ0LnJ1bGUuZ3JvdXBzID0gW1xuICAgICAgICAgIC4uLkF1dGhlbnRpY2F0aW9uLmludmFsaWRMb2dpblBhc3N3b3JkLnJ1bGUuZ3JvdXBzLFxuICAgICAgICBdO1xuICAgICAgICBhbGVydC5mdWxsX2xvZyA9IGludGVycG9sYXRlQWxlcnRQcm9wcyhcbiAgICAgICAgICBBdXRoZW50aWNhdGlvbi5pbnZhbGlkTG9naW5QYXNzd29yZC5mdWxsX2xvZyxcbiAgICAgICAgICBhbGVydCxcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdpbnZhbGlkTG9naW5Vc2VyJzoge1xuICAgICAgICBhbGVydC5sb2NhdGlvbiA9IEF1dGhlbnRpY2F0aW9uLmludmFsaWRMb2dpblVzZXIubG9jYXRpb247XG4gICAgICAgIGFsZXJ0LnJ1bGUgPSB7IC4uLkF1dGhlbnRpY2F0aW9uLmludmFsaWRMb2dpblVzZXIucnVsZSB9O1xuICAgICAgICBhbGVydC5ydWxlLmdyb3VwcyA9IFsuLi5BdXRoZW50aWNhdGlvbi5pbnZhbGlkTG9naW5Vc2VyLnJ1bGUuZ3JvdXBzXTtcbiAgICAgICAgYWxlcnQuZnVsbF9sb2cgPSBpbnRlcnBvbGF0ZUFsZXJ0UHJvcHMoXG4gICAgICAgICAgQXV0aGVudGljYXRpb24uaW52YWxpZExvZ2luVXNlci5mdWxsX2xvZyxcbiAgICAgICAgICBhbGVydCxcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdtdWx0aXBsZUF1dGhlbnRpY2F0aW9uRmFpbHVyZXMnOiB7XG4gICAgICAgIGFsZXJ0LmxvY2F0aW9uID0gQXV0aGVudGljYXRpb24ubXVsdGlwbGVBdXRoZW50aWNhdGlvbkZhaWx1cmVzLmxvY2F0aW9uO1xuICAgICAgICBhbGVydC5ydWxlID0geyAuLi5BdXRoZW50aWNhdGlvbi5tdWx0aXBsZUF1dGhlbnRpY2F0aW9uRmFpbHVyZXMucnVsZSB9O1xuICAgICAgICBhbGVydC5ydWxlLmdyb3VwcyA9IFtcbiAgICAgICAgICAuLi5BdXRoZW50aWNhdGlvbi5tdWx0aXBsZUF1dGhlbnRpY2F0aW9uRmFpbHVyZXMucnVsZS5ncm91cHMsXG4gICAgICAgIF07XG4gICAgICAgIGFsZXJ0LnJ1bGUuZnJlcXVlbmN5ID0gcmFuZG9tSW50ZXJ2YWxJbnRlZ2VyKDUsIDUwKTtcbiAgICAgICAgYWxlcnQuZnVsbF9sb2cgPSBpbnRlcnBvbGF0ZUFsZXJ0UHJvcHMoXG4gICAgICAgICAgQXV0aGVudGljYXRpb24ubXVsdGlwbGVBdXRoZW50aWNhdGlvbkZhaWx1cmVzLmZ1bGxfbG9nLFxuICAgICAgICAgIGFsZXJ0LFxuICAgICAgICApO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ3dpbmRvd3NJbnZhbGlkTG9naW5QYXNzd29yZCc6IHtcbiAgICAgICAgYWxlcnQubG9jYXRpb24gPSBBdXRoZW50aWNhdGlvbi53aW5kb3dzSW52YWxpZExvZ2luUGFzc3dvcmQubG9jYXRpb247XG4gICAgICAgIGFsZXJ0LnJ1bGUgPSB7IC4uLkF1dGhlbnRpY2F0aW9uLndpbmRvd3NJbnZhbGlkTG9naW5QYXNzd29yZC5ydWxlIH07XG4gICAgICAgIGFsZXJ0LnJ1bGUuZ3JvdXBzID0gW1xuICAgICAgICAgIC4uLkF1dGhlbnRpY2F0aW9uLndpbmRvd3NJbnZhbGlkTG9naW5QYXNzd29yZC5ydWxlLmdyb3VwcyxcbiAgICAgICAgXTtcbiAgICAgICAgYWxlcnQucnVsZS5mcmVxdWVuY3kgPSByYW5kb21JbnRlcnZhbEludGVnZXIoNSwgNTApO1xuICAgICAgICBhbGVydC5kYXRhLndpbiA9IHtcbiAgICAgICAgICAuLi5BdXRoZW50aWNhdGlvbi53aW5kb3dzSW52YWxpZExvZ2luUGFzc3dvcmQuZGF0YV93aW4sXG4gICAgICAgIH07XG4gICAgICAgIGFsZXJ0LmRhdGEud2luLmV2ZW50ZGF0YS5pcEFkZHJlc3MgPSByYW5kb21BcnJheUl0ZW0oSVBzKTtcbiAgICAgICAgYWxlcnQuZGF0YS53aW4uZXZlbnRkYXRhLmlwUG9ydCA9IHJhbmRvbUFycmF5SXRlbShQb3J0cyk7XG4gICAgICAgIGFsZXJ0LmRhdGEud2luLnN5c3RlbS5jb21wdXRlciA9IHJhbmRvbUFycmF5SXRlbShXaW5fSG9zdG5hbWVzKTtcbiAgICAgICAgYWxlcnQuZGF0YS53aW4uc3lzdGVtLmV2ZW50SUQgPSBgJHtyYW5kb21JbnRlcnZhbEludGVnZXIoMSwgNjAwKX1gO1xuICAgICAgICBhbGVydC5kYXRhLndpbi5zeXN0ZW0uZXZlbnRSZWNvcmRJRCA9IGAke3JhbmRvbUludGVydmFsSW50ZWdlcihcbiAgICAgICAgICAxMDAwMCxcbiAgICAgICAgICA1MDAwMCxcbiAgICAgICAgKX1gO1xuICAgICAgICBhbGVydC5kYXRhLndpbi5zeXN0ZW0ucHJvY2Vzc0lEID0gYCR7cmFuZG9tSW50ZXJ2YWxJbnRlZ2VyKDEsIDEyMDApfWA7XG4gICAgICAgIGFsZXJ0LmRhdGEud2luLnN5c3RlbS5zeXN0ZW1UaW1lID0gYWxlcnQudGltZXN0YW1wO1xuICAgICAgICBhbGVydC5kYXRhLndpbi5zeXN0ZW0ucHJvY2Vzc0lEID0gYCR7cmFuZG9tSW50ZXJ2YWxJbnRlZ2VyKDEsIDEyMDApfWA7XG4gICAgICAgIGFsZXJ0LmRhdGEud2luLnN5c3RlbS50YXNrID0gYCR7cmFuZG9tSW50ZXJ2YWxJbnRlZ2VyKDEsIDE4MDApfWA7XG4gICAgICAgIGFsZXJ0LmRhdGEud2luLnN5c3RlbS50aHJlYWRJRCA9IGAke3JhbmRvbUludGVydmFsSW50ZWdlcigxLCA1MDApfWA7XG4gICAgICAgIGFsZXJ0LmZ1bGxfbG9nID0gaW50ZXJwb2xhdGVBbGVydFByb3BzKFxuICAgICAgICAgIEF1dGhlbnRpY2F0aW9uLndpbmRvd3NJbnZhbGlkTG9naW5QYXNzd29yZC5mdWxsX2xvZyxcbiAgICAgICAgICBhbGVydCxcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICd1c2VyTG9naW5GYWlsZWQnOiB7XG4gICAgICAgIGFsZXJ0LmxvY2F0aW9uID0gQXV0aGVudGljYXRpb24udXNlckxvZ2luRmFpbGVkLmxvY2F0aW9uO1xuICAgICAgICBhbGVydC5ydWxlID0geyAuLi5BdXRoZW50aWNhdGlvbi51c2VyTG9naW5GYWlsZWQucnVsZSB9O1xuICAgICAgICBhbGVydC5ydWxlLmdyb3VwcyA9IFsuLi5BdXRoZW50aWNhdGlvbi51c2VyTG9naW5GYWlsZWQucnVsZS5ncm91cHNdO1xuICAgICAgICBhbGVydC5kYXRhID0ge1xuICAgICAgICAgIHNyY2lwOiByYW5kb21BcnJheUl0ZW0oSVBzKSxcbiAgICAgICAgICBkc3R1c2VyOiByYW5kb21BcnJheUl0ZW0oVXNlcnMpLFxuICAgICAgICAgIHVpZDogYCR7cmFuZG9tSW50ZXJ2YWxJbnRlZ2VyKDAsIDUwKX1gLFxuICAgICAgICAgIGV1aWQ6IGAke3JhbmRvbUludGVydmFsSW50ZWdlcigwLCA1MCl9YCxcbiAgICAgICAgICB0dHk6ICdzc2gnLFxuICAgICAgICB9O1xuICAgICAgICBhbGVydC5kZWNvZGVyID0geyAuLi5BdXRoZW50aWNhdGlvbi51c2VyTG9naW5GYWlsZWQuZGVjb2RlciB9O1xuICAgICAgICBhbGVydC5mdWxsX2xvZyA9IGludGVycG9sYXRlQWxlcnRQcm9wcyhcbiAgICAgICAgICBBdXRoZW50aWNhdGlvbi51c2VyTG9naW5GYWlsZWQuZnVsbF9sb2csXG4gICAgICAgICAgYWxlcnQsXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAncGFzc3dvcmRDaGVja0ZhaWxlZCc6IHtcbiAgICAgICAgYWxlcnQubG9jYXRpb24gPSBBdXRoZW50aWNhdGlvbi5wYXNzd29yZENoZWNrRmFpbGVkLmxvY2F0aW9uO1xuICAgICAgICBhbGVydC5ydWxlID0geyAuLi5BdXRoZW50aWNhdGlvbi5wYXNzd29yZENoZWNrRmFpbGVkLnJ1bGUgfTtcbiAgICAgICAgYWxlcnQucnVsZS5ncm91cHMgPSBbLi4uQXV0aGVudGljYXRpb24ucGFzc3dvcmRDaGVja0ZhaWxlZC5ydWxlLmdyb3Vwc107XG4gICAgICAgIGFsZXJ0LmRhdGEgPSB7XG4gICAgICAgICAgc3JjdXNlcjogcmFuZG9tQXJyYXlJdGVtKFVzZXJzKSxcbiAgICAgICAgfTtcbiAgICAgICAgYWxlcnQucHJlZGVjb2Rlci5wcm9ncmFtX25hbWUgPSAndW5peF9jaGtwd2QnO1xuICAgICAgICBhbGVydC5kZWNvZGVyID0geyAuLi5BdXRoZW50aWNhdGlvbi5wYXNzd29yZENoZWNrRmFpbGVkLmRlY29kZXIgfTtcbiAgICAgICAgYWxlcnQuZnVsbF9sb2cgPSBpbnRlcnBvbGF0ZUFsZXJ0UHJvcHMoXG4gICAgICAgICAgQXV0aGVudGljYXRpb24ucGFzc3dvcmRDaGVja0ZhaWxlZC5mdWxsX2xvZyxcbiAgICAgICAgICBhbGVydCxcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdub25FeGlzdGVudFVzZXInOiB7XG4gICAgICAgIGFsZXJ0LmxvY2F0aW9uID0gQXV0aGVudGljYXRpb24ubm9uRXhpc3RlbnRVc2VyLmxvY2F0aW9uO1xuICAgICAgICBhbGVydC5ydWxlID0geyAuLi5BdXRoZW50aWNhdGlvbi5ub25FeGlzdGVudFVzZXIucnVsZSB9O1xuICAgICAgICBhbGVydC5ydWxlLmdyb3VwcyA9IFsuLi5BdXRoZW50aWNhdGlvbi5ub25FeGlzdGVudFVzZXIucnVsZS5ncm91cHNdO1xuICAgICAgICBhbGVydC5mdWxsX2xvZyA9IGludGVycG9sYXRlQWxlcnRQcm9wcyhcbiAgICAgICAgICBBdXRoZW50aWNhdGlvbi5ub25FeGlzdGVudFVzZXIuZnVsbF9sb2csXG4gICAgICAgICAgYWxlcnQsXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgY2FzZSAnYnJ1dGVGb3JjZVRyeWluZ0FjY2Vzc1N5c3RlbSc6IHtcbiAgICAgICAgYWxlcnQubG9jYXRpb24gPSBBdXRoZW50aWNhdGlvbi5icnV0ZUZvcmNlVHJ5aW5nQWNjZXNzU3lzdGVtLmxvY2F0aW9uO1xuICAgICAgICBhbGVydC5ydWxlID0geyAuLi5BdXRoZW50aWNhdGlvbi5icnV0ZUZvcmNlVHJ5aW5nQWNjZXNzU3lzdGVtLnJ1bGUgfTtcbiAgICAgICAgYWxlcnQucnVsZS5ncm91cHMgPSBbXG4gICAgICAgICAgLi4uQXV0aGVudGljYXRpb24uYnJ1dGVGb3JjZVRyeWluZ0FjY2Vzc1N5c3RlbS5ydWxlLmdyb3VwcyxcbiAgICAgICAgXTtcbiAgICAgICAgYWxlcnQuZnVsbF9sb2cgPSBpbnRlcnBvbGF0ZUFsZXJ0UHJvcHMoXG4gICAgICAgICAgQXV0aGVudGljYXRpb24uYnJ1dGVGb3JjZVRyeWluZ0FjY2Vzc1N5c3RlbS5mdWxsX2xvZyxcbiAgICAgICAgICBhbGVydCxcbiAgICAgICAgKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdyZXZlcnNlTG9vY2t1cEVycm9yJzoge1xuICAgICAgICBhbGVydC5sb2NhdGlvbiA9IEF1dGhlbnRpY2F0aW9uLnJldmVyc2VMb29ja3VwRXJyb3IubG9jYXRpb247XG4gICAgICAgIGFsZXJ0LnJ1bGUgPSB7IC4uLkF1dGhlbnRpY2F0aW9uLnJldmVyc2VMb29ja3VwRXJyb3IucnVsZSB9O1xuICAgICAgICBhbGVydC5ydWxlLmdyb3VwcyA9IFsuLi5BdXRoZW50aWNhdGlvbi5yZXZlcnNlTG9vY2t1cEVycm9yLnJ1bGUuZ3JvdXBzXTtcbiAgICAgICAgYWxlcnQuZGF0YSA9IHtcbiAgICAgICAgICBzcmNpcDogcmFuZG9tQXJyYXlJdGVtKElQcyksXG4gICAgICAgIH07XG4gICAgICAgIGFsZXJ0LmZ1bGxfbG9nID0gaW50ZXJwb2xhdGVBbGVydFByb3BzKFxuICAgICAgICAgIEF1dGhlbnRpY2F0aW9uLnJldmVyc2VMb29ja3VwRXJyb3IuZnVsbF9sb2csXG4gICAgICAgICAgYWxlcnQsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjYXNlICdpbnNlY3VyZUNvbm5lY3Rpb25BdHRlbXB0Jzoge1xuICAgICAgICBhbGVydC5sb2NhdGlvbiA9IEF1dGhlbnRpY2F0aW9uLmluc2VjdXJlQ29ubmVjdGlvbkF0dGVtcHQubG9jYXRpb247XG4gICAgICAgIGFsZXJ0LnJ1bGUgPSB7IC4uLkF1dGhlbnRpY2F0aW9uLmluc2VjdXJlQ29ubmVjdGlvbkF0dGVtcHQucnVsZSB9O1xuICAgICAgICBhbGVydC5ydWxlLmdyb3VwcyA9IFtcbiAgICAgICAgICAuLi5BdXRoZW50aWNhdGlvbi5pbnNlY3VyZUNvbm5lY3Rpb25BdHRlbXB0LnJ1bGUuZ3JvdXBzLFxuICAgICAgICBdO1xuICAgICAgICBhbGVydC5kYXRhID0ge1xuICAgICAgICAgIHNyY2lwOiByYW5kb21BcnJheUl0ZW0oSVBzKSxcbiAgICAgICAgICBzcmNwb3J0OiByYW5kb21BcnJheUl0ZW0oUG9ydHMpLFxuICAgICAgICB9O1xuICAgICAgICBhbGVydC5mdWxsX2xvZyA9IGludGVycG9sYXRlQWxlcnRQcm9wcyhcbiAgICAgICAgICBBdXRoZW50aWNhdGlvbi5pbnNlY3VyZUNvbm5lY3Rpb25BdHRlbXB0LmZ1bGxfbG9nLFxuICAgICAgICAgIGFsZXJ0LFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY2FzZSAnYXV0aGVudGljYXRpb25TdWNjZXNzJzoge1xuICAgICAgICBhbGVydC5sb2NhdGlvbiA9IEF1dGhlbnRpY2F0aW9uLmF1dGhlbnRpY2F0aW9uU3VjY2Vzcy5sb2NhdGlvbjtcbiAgICAgICAgYWxlcnQucnVsZSA9IHsgLi4uQXV0aGVudGljYXRpb24uYXV0aGVudGljYXRpb25TdWNjZXNzLnJ1bGUgfTtcbiAgICAgICAgYWxlcnQucnVsZS5ncm91cHMgPSBbXG4gICAgICAgICAgLi4uQXV0aGVudGljYXRpb24uYXV0aGVudGljYXRpb25TdWNjZXNzLnJ1bGUuZ3JvdXBzLFxuICAgICAgICBdO1xuICAgICAgICBhbGVydC5kYXRhID0ge1xuICAgICAgICAgIHNyY2lwOiByYW5kb21BcnJheUl0ZW0oSVBzKSxcbiAgICAgICAgICBzcmNwb3J0OiByYW5kb21BcnJheUl0ZW0oUG9ydHMpLFxuICAgICAgICAgIGRzdHVzZXI6IHJhbmRvbUFycmF5SXRlbShVc2VycyksXG4gICAgICAgIH07XG4gICAgICAgIGFsZXJ0LmZ1bGxfbG9nID0gaW50ZXJwb2xhdGVBbGVydFByb3BzKFxuICAgICAgICAgIEF1dGhlbnRpY2F0aW9uLmF1dGhlbnRpY2F0aW9uU3VjY2Vzcy5mdWxsX2xvZyxcbiAgICAgICAgICBhbGVydCxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ21heGltdW1BdXRoZW50aWNhdGlvbkF0dGVtcHRzRXhjZWVkZWQnOiB7XG4gICAgICAgIGFsZXJ0LmxvY2F0aW9uID1cbiAgICAgICAgICBBdXRoZW50aWNhdGlvbi5tYXhpbXVtQXV0aGVudGljYXRpb25BdHRlbXB0c0V4Y2VlZGVkLmxvY2F0aW9uO1xuICAgICAgICBhbGVydC5ydWxlID0ge1xuICAgICAgICAgIC4uLkF1dGhlbnRpY2F0aW9uLm1heGltdW1BdXRoZW50aWNhdGlvbkF0dGVtcHRzRXhjZWVkZWQucnVsZSxcbiAgICAgICAgfTtcbiAgICAgICAgYWxlcnQucnVsZS5ncm91cHMgPSBbXG4gICAgICAgICAgLi4uQXV0aGVudGljYXRpb24ubWF4aW11bUF1dGhlbnRpY2F0aW9uQXR0ZW1wdHNFeGNlZWRlZC5ydWxlLmdyb3VwcyxcbiAgICAgICAgXTtcbiAgICAgICAgYWxlcnQuZGF0YSA9IHtcbiAgICAgICAgICBzcmNpcDogcmFuZG9tQXJyYXlJdGVtKElQcyksXG4gICAgICAgICAgc3JjcG9ydDogcmFuZG9tQXJyYXlJdGVtKFBvcnRzKSxcbiAgICAgICAgICBkc3R1c2VyOiByYW5kb21BcnJheUl0ZW0oVXNlcnMpLFxuICAgICAgICB9O1xuICAgICAgICBhbGVydC5mdWxsX2xvZyA9IGludGVycG9sYXRlQWxlcnRQcm9wcyhcbiAgICAgICAgICBBdXRoZW50aWNhdGlvbi5tYXhpbXVtQXV0aGVudGljYXRpb25BdHRlbXB0c0V4Y2VlZGVkLmZ1bGxfbG9nLFxuICAgICAgICAgIGFsZXJ0LFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDoge1xuICAgICAgfVxuICAgIH1cbiAgICBhbGVydC5ydWxlLmZpcmVkdGltZXMgPSByYW5kb21JbnRlcnZhbEludGVnZXIoMiwgMTUpO1xuICAgIGFsZXJ0LnJ1bGUudHNjID0gW3JhbmRvbUFycmF5SXRlbSh0c2MpXTtcbiAgfVxuXG4gIGlmIChwYXJhbXMuc3NoKSB7XG4gICAgYWxlcnQuZGF0YSA9IHtcbiAgICAgIHNyY2lwOiByYW5kb21BcnJheUl0ZW0oSVBzKSxcbiAgICAgIHNyY3VzZXI6IHJhbmRvbUFycmF5SXRlbShVc2VycyksXG4gICAgICBzcmNwb3J0OiByYW5kb21BcnJheUl0ZW0oUG9ydHMpLFxuICAgIH07XG4gICAgYWxlcnQuR2VvTG9jYXRpb24gPSByYW5kb21BcnJheUl0ZW0oR2VvTG9jYXRpb24pO1xuICAgIGFsZXJ0LmRlY29kZXIgPSB7XG4gICAgICBuYW1lOiAnc3NoZCcsXG4gICAgICBwYXJlbnQ6ICdzc2hkJyxcbiAgICB9O1xuICAgIGFsZXJ0LmlucHV0ID0ge1xuICAgICAgdHlwZTogJ2xvZycsXG4gICAgfTtcbiAgICBhbGVydC5wcmVkZWNvZGVyID0ge1xuICAgICAgcHJvZ3JhbV9uYW1lOiAnc3NoZCcsXG4gICAgICB0aW1lc3RhbXA6IGZvcm1hdERhdGUobmV3IERhdGUoYWxlcnQudGltZXN0YW1wKSwgJ04gRCBoOm06cycpLFxuICAgICAgaG9zdG5hbWU6IGFsZXJ0Lm1hbmFnZXIubmFtZSxcbiAgICB9O1xuICAgIGNvbnN0IHR5cGVBbGVydCA9IHJhbmRvbUFycmF5SXRlbShTU0guZGF0YSk7XG4gICAgYWxlcnQubG9jYXRpb24gPSB0eXBlQWxlcnQubG9jYXRpb247XG4gICAgYWxlcnQucnVsZSA9IHsgLi4udHlwZUFsZXJ0LnJ1bGUgfTtcbiAgICBhbGVydC5ydWxlLmdyb3VwcyA9IFsuLi50eXBlQWxlcnQucnVsZS5ncm91cHNdO1xuICAgIGFsZXJ0LnJ1bGUuZmlyZWR0aW1lcyA9IHJhbmRvbUludGVydmFsSW50ZWdlcigxLCAxNSk7XG4gICAgYWxlcnQuZnVsbF9sb2cgPSBpbnRlcnBvbGF0ZUFsZXJ0UHJvcHModHlwZUFsZXJ0LmZ1bGxfbG9nLCBhbGVydCk7XG4gIH1cblxuICBpZiAocGFyYW1zLndpbmRvd3MpIHtcbiAgICBhbGVydC5ydWxlLmdyb3Vwcy5wdXNoKCd3aW5kb3dzJyk7XG4gICAgaWYgKHBhcmFtcy53aW5kb3dzLnNlcnZpY2VfY29udHJvbF9tYW5hZ2VyKSB7XG4gICAgICBhbGVydC5wcmVkZWNvZGVyID0ge1xuICAgICAgICBwcm9ncmFtX25hbWU6ICdXaW5FdnRMb2cnLFxuICAgICAgICB0aW1lc3RhbXA6ICcyMDIwIEFwciAxNyAwNTo1OTowNScsXG4gICAgICB9O1xuICAgICAgYWxlcnQuaW5wdXQgPSB7XG4gICAgICAgIHR5cGU6ICdsb2cnLFxuICAgICAgfTtcbiAgICAgIGFsZXJ0LmRhdGEgPSB7XG4gICAgICAgIGV4dHJhX2RhdGE6ICdTZXJ2aWNlIENvbnRyb2wgTWFuYWdlcicsXG4gICAgICAgIGRzdHVzZXI6ICdTWVNURU0nLFxuICAgICAgICBzeXN0ZW1fbmFtZTogcmFuZG9tQXJyYXlJdGVtKFdpbl9Ib3N0bmFtZXMpLFxuICAgICAgICBpZDogJzcwNDAnLFxuICAgICAgICB0eXBlOiAndHlwZScsXG4gICAgICAgIHN0YXR1czogJ0lORk9STUFUSU9OJyxcbiAgICAgIH07XG4gICAgICBhbGVydC5ydWxlLmRlc2NyaXB0aW9uID0gJ1dpbmRvd3M6IFNlcnZpY2Ugc3RhcnR1cCB0eXBlIHdhcyBjaGFuZ2VkLic7XG4gICAgICBhbGVydC5ydWxlLmZpcmVkdGltZXMgPSByYW5kb21JbnRlcnZhbEludGVnZXIoMSwgMjApO1xuICAgICAgYWxlcnQucnVsZS5tYWlsID0gZmFsc2U7XG4gICAgICBhbGVydC5ydWxlLmxldmVsID0gMztcbiAgICAgIGFsZXJ0LnJ1bGUuZ3JvdXBzLnB1c2goJ3dpbmRvd3MnLCAncG9saWN5X2NoYW5nZWQnKTtcbiAgICAgIGFsZXJ0LnJ1bGUucGNpID0gWycxMC42J107XG4gICAgICBhbGVydC5ydWxlLmhpcGFhID0gWycxNjQuMzEyLmInXTtcbiAgICAgIGFsZXJ0LnJ1bGUuZ2RwciA9IFsnSVZfMzUuNy5kJ107XG4gICAgICBhbGVydC5ydWxlLm5pc3RfODAwXzUzID0gWydBVS42J107XG4gICAgICBhbGVydC5ydWxlLmluZm8gPSAnVGhpcyBkb2VzIG5vdCBhcHBlYXIgdG8gYmUgbG9nZ2VkIG9uIFdpbmRvd3MgMjAwMC4nO1xuICAgICAgYWxlcnQubG9jYXRpb24gPSAnV2luRXZ0TG9nJztcbiAgICAgIGFsZXJ0LmRlY29kZXIgPSB7XG4gICAgICAgIHBhcmVudDogJ3dpbmRvd3MnLFxuICAgICAgICBuYW1lOiAnd2luZG93cycsXG4gICAgICB9O1xuICAgICAgYWxlcnQuZnVsbF9sb2cgPSBgMjAyMCBBcHIgMTcgMDU6NTk6MDUgV2luRXZ0TG9nOiB0eXBlOiBJTkZPUk1BVElPTig3MDQwKTogU2VydmljZSBDb250cm9sIE1hbmFnZXI6IFNZU1RFTTogTlQgQVVUSE9SSVRZOiAke2FsZXJ0LmRhdGEuc3lzdGVtX25hbWV9OiBCYWNrZ3JvdW5kIEludGVsbGlnZW50IFRyYW5zZmVyIFNlcnZpY2UgYXV0byBzdGFydCBkZW1hbmQgc3RhcnQgQklUUyBgOyAvL1RPRE86IGRhdGVcbiAgICAgIGFsZXJ0LmlkID0gMTgxNDU7XG4gICAgICBhbGVydC5maWVsZHMgPSB7XG4gICAgICAgIHRpbWVzdGFtcDogYWxlcnQudGltZXN0YW1wLFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBpZiAocGFyYW1zLmFwYWNoZSkge1xuICAgIGNvbnN0IHR5cGVBbGVydCA9IHsgLi4uQXBhY2hlLmRhdGFbMF0gfTsgLy8gdGhlcmUgaXMgb25seSBvbmUgdHlwZSBhbGVydCBpbiBkYXRhIGFycmF5IGF0IHRoZSBtb21lbnQuIFJhbmRvbWl6ZSBpZiBhZGQgbW9yZSB0eXBlIG9mIGFsZXJ0cyB0byBkYXRhIGFycmF5XG4gICAgYWxlcnQuZGF0YSA9IHtcbiAgICAgIHNyY2lwOiByYW5kb21BcnJheUl0ZW0oSVBzKSxcbiAgICAgIHNyY3BvcnQ6IHJhbmRvbUFycmF5SXRlbShQb3J0cyksXG4gICAgICBpZDogYEFIJHtyYW5kb21JbnRlcnZhbEludGVnZXIoMTAwMDAsIDk5OTk5KX1gLFxuICAgIH07XG4gICAgYWxlcnQuR2VvTG9jYXRpb24gPSB7IC4uLnJhbmRvbUFycmF5SXRlbShHZW9Mb2NhdGlvbikgfTtcbiAgICBhbGVydC5ydWxlID0geyAuLi50eXBlQWxlcnQucnVsZSB9O1xuICAgIGFsZXJ0LnJ1bGUuZmlyZWR0aW1lcyA9IHJhbmRvbUludGVydmFsSW50ZWdlcigyLCAxMCk7XG4gICAgYWxlcnQuaW5wdXQgPSB7IHR5cGU6ICdsb2cnIH07XG4gICAgYWxlcnQubG9jYXRpb24gPSBBcGFjaGUubG9jYXRpb247XG4gICAgYWxlcnQuZGVjb2RlciA9IHsgLi4uQXBhY2hlLmRlY29kZXIgfTtcblxuICAgIGFsZXJ0LmZ1bGxfbG9nID0gaW50ZXJwb2xhdGVBbGVydFByb3BzKHR5cGVBbGVydC5mdWxsX2xvZywgYWxlcnQsIHtcbiAgICAgIF90aW1lc3RhbXBfYXBhY2hlOiBmb3JtYXREYXRlKFxuICAgICAgICBuZXcgRGF0ZShhbGVydC50aW1lc3RhbXApLFxuICAgICAgICAnRSBOIEQgaDptOnMubCBZJyxcbiAgICAgICksXG4gICAgICBfcGlfaWQ6IHJhbmRvbUludGVydmFsSW50ZWdlcigxMDAwMCwgMzAwMDApLFxuICAgIH0pO1xuICB9XG5cbiAgaWYgKHBhcmFtcy53ZWIpIHtcbiAgICBhbGVydC5pbnB1dCA9IHtcbiAgICAgIHR5cGU6ICdsb2cnLFxuICAgIH07XG4gICAgYWxlcnQuZGF0YSA9IHtcbiAgICAgIHByb3RvY29sOiAnR0VUJyxcbiAgICAgIHNyY2lwOiByYW5kb21BcnJheUl0ZW0oSVBzKSxcbiAgICAgIGlkOiAnNDA0JyxcbiAgICAgIHVybDogcmFuZG9tQXJyYXlJdGVtKFdlYi51cmxzKSxcbiAgICB9O1xuICAgIGFsZXJ0Lkdlb0xvY2F0aW9uID0geyAuLi5yYW5kb21BcnJheUl0ZW0oR2VvTG9jYXRpb24pIH07XG5cbiAgICBjb25zdCB0eXBlQWxlcnQgPSByYW5kb21BcnJheUl0ZW0oV2ViLmRhdGEpO1xuICAgIGNvbnN0IHVzZXJBZ2VudCA9IHJhbmRvbUFycmF5SXRlbShXZWIudXNlckFnZW50cyk7XG4gICAgYWxlcnQucnVsZSA9IHsgLi4udHlwZUFsZXJ0LnJ1bGUgfTtcbiAgICBhbGVydC5ydWxlLmZpcmVkdGltZXMgPSByYW5kb21JbnRlcnZhbEludGVnZXIoMSwgMTApO1xuICAgIGFsZXJ0LmRlY29kZXIgPSB7IC4uLnR5cGVBbGVydC5kZWNvZGVyIH07XG4gICAgYWxlcnQubG9jYXRpb24gPSB0eXBlQWxlcnQubG9jYXRpb247XG4gICAgYWxlcnQuZnVsbF9sb2cgPSBpbnRlcnBvbGF0ZUFsZXJ0UHJvcHModHlwZUFsZXJ0LmZ1bGxfbG9nLCBhbGVydCwge1xuICAgICAgX3VzZXJfYWdlbnQ6IHVzZXJBZ2VudCxcbiAgICAgIF9kYXRlOiBmb3JtYXREYXRlKG5ldyBEYXRlKGFsZXJ0LnRpbWVzdGFtcCksICdEL04vWTpoOm06cyArMDAwMCcpLFxuICAgIH0pO1xuICAgIGlmICh0eXBlQWxlcnQucHJldmlvdXNfb3V0cHV0KSB7XG4gICAgICBjb25zdCBwcmV2aW91c091dHB1dCA9IFtdO1xuICAgICAgY29uc3QgYmVmb3JlU2Vjb25kcyA9IDQ7XG4gICAgICBmb3IgKGxldCBpID0gYmVmb3JlU2Vjb25kczsgaSA+IDA7IGktLSkge1xuICAgICAgICBjb25zdCBiZWZvcmVEYXRlID0gbmV3IERhdGUobmV3IERhdGUoYWxlcnQudGltZXN0YW1wKSAtICgyICsgaSkgKiAxMDAwKTtcbiAgICAgICAgcHJldmlvdXNPdXRwdXQucHVzaChcbiAgICAgICAgICBpbnRlcnBvbGF0ZUFsZXJ0UHJvcHModHlwZUFsZXJ0LmZ1bGxfbG9nLCBhbGVydCwge1xuICAgICAgICAgICAgX3VzZXJfYWdlbnQ6IHVzZXJBZ2VudCxcbiAgICAgICAgICAgIF9kYXRlOiBmb3JtYXREYXRlKG5ldyBEYXRlKGJlZm9yZURhdGUpLCAnRC9OL1k6aDptOnMgKzAwMDAnKSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGFsZXJ0LnByZXZpb3VzX291dHB1dCA9IHByZXZpb3VzT3V0cHV0LmpvaW4oJ1xcbicpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChwYXJhbXMuZ2l0aHViKSB7XG4gICAgYWxlcnQubG9jYXRpb24gPSBHaXRIdWIuTE9DQVRJT047XG4gICAgYWxlcnQuZGVjb2RlciA9IEdpdEh1Yi5ERUNPREVSO1xuICAgIGNvbnN0IGFsZXJ0VHlwZSA9IHJhbmRvbUFycmF5SXRlbShHaXRIdWIuQUxFUlRfVFlQRVMpO1xuICAgIGNvbnN0IGFjdG9yID0gcmFuZG9tQXJyYXlJdGVtKEdpdEh1Yi5BQ1RPUlMpO1xuICAgIGFsZXJ0LmRhdGEgPSB7XG4gICAgICBnaXRodWI6IHsgLi4uYWxlcnRUeXBlLmRhdGEuZ2l0aHViIH0sXG4gICAgfTtcbiAgICBhbGVydC5kYXRhLmdpdGh1Yi5vcmcgPSByYW5kb21BcnJheUl0ZW0oR2l0SHViLk9SR0FOSVpBVElPTl9OQU1FUyk7XG4gICAgYWxlcnQuZGF0YS5naXRodWIucmVwbyAmJlxuICAgICAgKGFsZXJ0LmRhdGEuZ2l0aHViLnJlcG8gPSBgJHthbGVydC5kYXRhLmdpdGh1Yi5vcmd9LyR7cmFuZG9tQXJyYXlJdGVtKFxuICAgICAgICBHaXRIdWIuUkVQT1NJVE9SWV9OQU1FUyxcbiAgICAgICl9YCk7XG4gICAgYWxlcnQuZGF0YS5naXRodWIucmVwb3NpdG9yeSAmJlxuICAgICAgKGFsZXJ0LmRhdGEuZ2l0aHViLnJlcG9zaXRvcnkgPSBgJHtcbiAgICAgICAgYWxlcnQuZGF0YS5naXRodWIub3JnXG4gICAgICB9LyR7cmFuZG9tQXJyYXlJdGVtKEdpdEh1Yi5SRVBPU0lUT1JZX05BTUVTKX1gKTtcbiAgICBhbGVydC5kYXRhLmdpdGh1Yi5hY3RvciA9IGFjdG9yLm5hbWU7XG4gICAgYWxlcnQuZGF0YS5naXRodWIuYWN0b3JfbG9jYXRpb24gJiZcbiAgICAgIGFsZXJ0LmRhdGEuZ2l0aHViLmFjdG9yX2xvY2F0aW9uLmNvdW50cnlfY29kZSAmJlxuICAgICAgKGFsZXJ0LmRhdGEuZ2l0aHViLmFjdG9yX2xvY2F0aW9uLmNvdW50cnlfY29kZSA9IGFjdG9yLmNvdW50cnlfY29kZSk7XG4gICAgYWxlcnQuZGF0YS5naXRodWIudXNlciAmJlxuICAgICAgKGFsZXJ0LmRhdGEuZ2l0aHViLnVzZXIgPSByYW5kb21BcnJheUl0ZW0oR2l0SHViLlVTRVJfTkFNRVMpKTtcbiAgICBhbGVydC5kYXRhLmdpdGh1Yi5jb25maWcgJiZcbiAgICAgIGFsZXJ0LmRhdGEuZ2l0aHViLmNvbmZpZy51cmwgJiZcbiAgICAgIChhbGVydC5kYXRhLmdpdGh1Yi5jb25maWcudXJsID0gcmFuZG9tQXJyYXlJdGVtKFxuICAgICAgICBHaXRIdWIuU0VSVkVSX0FERFJFU1NfV0VCSE9PSyxcbiAgICAgICkpO1xuICAgIGFsZXJ0LmRhdGEuZ2l0aHViWydAdGltZXN0YW1wJ10gPSBhbGVydC50aW1lc3RhbXA7XG4gICAgYWxlcnQuZGF0YS5naXRodWIuY3JlYXRlZF9hdCAmJlxuICAgICAgKGFsZXJ0LmRhdGEuZ2l0aHViLmNyZWF0ZWRfYXQgPSBhbGVydC50aW1lc3RhbXApO1xuICAgIGFsZXJ0LnJ1bGUgPSB7XG4gICAgICAuLi5hbGVydFR5cGUucnVsZSxcbiAgICB9O1xuICB9XG5cbiAgYWxlcnRbJ0B0aW1lc3RhbXAnXSA9IGFsZXJ0LnRpbWVzdGFtcDtcblxuICByZXR1cm4gYWxlcnQ7XG59XG5cbi8qKlxuICogR2V0IGEgcmFuZG9tIGFycmF5IHdpdGggdW5pcXVlIHZhbHVlc1xuICogQHBhcmFtIHtbXX0gYXJyYXkgQXJyYXkgdG8gZXh0cmFjdCB0aGUgdmFsdWVzXG4gKiBAcGFyYW0geyp9IHJhbmRvbU1heFJlcGV0aXRpb25zIE51bWJlciBtYXggb2YgcmFuZG9tIGV4dHJhY3Rpb25zXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBzb3J0IEZ1bmNpdG9uIHRvIHNlb3J0IGVsZW1lbnRzXG4gKiBAcmV0dXJuIHsqfSBBcnJheSB3aXRoIHJhbmRvbSB2YWx1ZXMgZXh0cmFjdGVkIG9mIHBhcmFtYXRlciBhcnJheSBwYXNzZWRcbiAqL1xuZnVuY3Rpb24gcmFuZG9tVW5pcXVlVmFsdWVzRnJvbUFycmF5KGFycmF5LCByYW5kb21NYXhSZXBldGl0aW9ucyA9IDEsIHNvcnQpIHtcbiAgY29uc3QgcmVwZXRpdGlvbnMgPSByYW5kb21JbnRlcnZhbEludGVnZXIoMSwgcmFuZG9tTWF4UmVwZXRpdGlvbnMpO1xuICBjb25zdCBzZXQgPSBuZXcgU2V0KCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcmVwZXRpdGlvbnM7IGkrKykge1xuICAgIHNldC5hZGQoYXJyYXlbcmFuZG9tSW50ZXJ2YWxJbnRlZ2VyKDAsIGFycmF5Lmxlbmd0aCAtIDEpXSk7XG4gIH1cbiAgcmV0dXJuIHNvcnQgPyBBcnJheS5mcm9tKHNldCkuc29ydChzb3J0KSA6IEFycmF5LmZyb20oc2V0KTtcbn1cblxuLyoqXG4gKiBHZXQgYSBpbnRlZ2VyIHdpdGhpbiBhIHJhbmdlXG4gKiBAcGFyYW0ge251bWJlcn0gbWluIC0gTWluaW11bSBsaW1pdFxuICogQHBhcmFtIHtudW1iZXJ9IG1heCAtIE1heGltdW0gbGltaXRcbiAqIEByZXR1cm5zIHtudW1iZXJ9IC0gUmFuZG9taXplZCBudW1iZXIgaW4gaW50ZXJ2YWxcbiAqL1xuZnVuY3Rpb24gcmFuZG9tSW50ZXJ2YWxJbnRlZ2VyKG1pbiwgbWF4KSB7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gKG1pbiAtIDEpKSkgKyBtaW47XG59XG5cbi8qKlxuICogR2VuZXJhdGUgcmFuZG9tIGFsZXJ0c1xuICogQHBhcmFtIHsqfSBwYXJhbXNcbiAqIEBwYXJhbSB7bnVtYmVyfSBudW1BbGVydHMgLSBEZWZpbmUgbnVtYmVyIG9mIGFsZXJ0c1xuICogQHJldHVybiB7Kn0gLSBSYW5kb20gZ2VuZXJhdGVkIGFsZXJ0cyBkZWZpbmVkIHdpdGggcGFyYW1zXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlQWxlcnRzKHBhcmFtcywgbnVtQWxlcnRzID0gMSkge1xuICBjb25zdCBhbGVydHMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1BbGVydHM7IGkrKykge1xuICAgIGFsZXJ0cy5wdXNoKGdlbmVyYXRlQWxlcnQocGFyYW1zKSk7XG4gIH1cbiAgcmV0dXJuIGFsZXJ0cztcbn1cblxuLyoqXG4gKiBHZXQgYSByYW5kb20gRGF0ZSBpbiByYW5nZSg3IGRheXMgYWdvIC0gbm93KVxuICogQHJldHVybnMge2RhdGV9IC0gUmFuZG9tIGRhdGUgaW4gcmFuZ2UgKDcgZGF5cyBhZ28gLSBub3cpXG4gKi9cbmZ1bmN0aW9uIHJhbmRvbURhdGUoaW5mLCBzdXApIHtcbiAgY29uc3Qgbm93VGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgY29uc3QgdGltZSA9IHJhbmRvbUludGVydmFsSW50ZWdlcigwLCA2MDQ4MDAwMDApOyAvLyBSYW5kb20gNyBkYXlzIGluIG1pbGlzZWNvbmRzXG5cbiAgY29uc3QgdW5peF90aW1lc3RhbXAgPSBub3dUaW1lc3RhbXAgLSB0aW1lOyAvLyBMYXN0IDcgZGF5cyBmcm9tIG5vd1xuXG4gIGNvbnN0IGxhc3RXZWVrID0gbmV3IERhdGUodW5peF90aW1lc3RhbXApO1xuICByZXR1cm4gZm9ybWF0RGF0ZShsYXN0V2VlaywgJ1ktTS1EVGg6bTpzLmwrMDAwMCcpO1xufVxuXG5jb25zdCBmb3JtYXR0ZXJOdW1iZXIgPSAobnVtYmVyLCB6ZXJvcyA9IDApID0+XG4gICgnMCcucmVwZWF0KHplcm9zKSArIGAke251bWJlcn1gKS5zbGljZSgtemVyb3MpO1xuY29uc3QgbW9udGhOYW1lcyA9IHtcbiAgbG9uZzogW1xuICAgICdKYW51YXJ5JyxcbiAgICAnRmVicnVhcnknLFxuICAgICdNYXJjaCcsXG4gICAgJ0FwcmlsJyxcbiAgICAnTWF5JyxcbiAgICAnSnVuZScsXG4gICAgJ0p1bHknLFxuICAgICdBdWd1c3QnLFxuICAgICdTZXB0ZW1iZXInLFxuICAgICdPY3RvYmVyJyxcbiAgICAnTm92ZW1iZXInLFxuICAgICdEZWNlbWJlcicsXG4gIF0sXG4gIHNob3J0OiBbXG4gICAgJ0phbicsXG4gICAgJ0ZlYicsXG4gICAgJ01hcicsXG4gICAgJ0FwcicsXG4gICAgJ01heScsXG4gICAgJ0p1bicsXG4gICAgJ0p1bCcsXG4gICAgJ0F1ZycsXG4gICAgJ1NlcCcsXG4gICAgJ09jdCcsXG4gICAgJ05vdicsXG4gICAgJ0RlYycsXG4gIF0sXG59O1xuXG5jb25zdCBkYXlOYW1lcyA9IHtcbiAgbG9uZzogW1xuICAgICdTdW5kYXknLFxuICAgICdNb25kYXknLFxuICAgICdUdWVzZGF5JyxcbiAgICAnV2VkbmVzZGF5JyxcbiAgICAnVGh1cnNkYXknLFxuICAgICdGcmlkYXknLFxuICAgICdTYXR1cmRheScsXG4gIF0sXG4gIHNob3J0OiBbJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCddLFxufTtcblxuZnVuY3Rpb24gZm9ybWF0RGF0ZShkYXRlLCBmb3JtYXQpIHtcbiAgLy8gSXQgY291bGQgdXNlIFwibW9tZW50XCIgbGlicmFyeSB0byBmb3JtYXQgc3RyaW5ncyB0b29cbiAgY29uc3QgdG9rZW5zID0ge1xuICAgIEQ6IGQgPT4gZm9ybWF0dGVyTnVtYmVyKGQuZ2V0RGF0ZSgpLCAyKSwgLy8gMDEtMzFcbiAgICBBOiBkID0+IGRheU5hbWVzLmxvbmdbZC5nZXREYXkoKV0sIC8vICdTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSdcbiAgICBFOiBkID0+IGRheU5hbWVzLnNob3J0W2QuZ2V0RGF5KCldLCAvLyAnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J1xuICAgIE06IGQgPT4gZm9ybWF0dGVyTnVtYmVyKGQuZ2V0TW9udGgoKSArIDEsIDIpLCAvLyAwMS0xMlxuICAgIEo6IGQgPT4gbW9udGhOYW1lcy5sb25nW2QuZ2V0TW9udGgoKV0sIC8vICdKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ1xuICAgIE46IGQgPT4gbW9udGhOYW1lcy5zaG9ydFtkLmdldE1vbnRoKCldLCAvLyAnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JywgJ05vdicsICdEZWMnXG4gICAgWTogZCA9PiBkLmdldEZ1bGxZZWFyKCksIC8vIDIwMjBcbiAgICBoOiBkID0+IGZvcm1hdHRlck51bWJlcihkLmdldEhvdXJzKCksIDIpLCAvLyAwMC0yM1xuICAgIG06IGQgPT4gZm9ybWF0dGVyTnVtYmVyKGQuZ2V0TWludXRlcygpLCAyKSwgLy8gMDAtNTlcbiAgICBzOiBkID0+IGZvcm1hdHRlck51bWJlcihkLmdldFNlY29uZHMoKSwgMiksIC8vIDAwLTU5XG4gICAgbDogZCA9PiBmb3JtYXR0ZXJOdW1iZXIoZC5nZXRNaWxsaXNlY29uZHMoKSwgMyksIC8vIDAwMC05OTlcbiAgfTtcblxuICByZXR1cm4gZm9ybWF0LnNwbGl0KCcnKS5yZWR1Y2UoKGFjY3VtLCB0b2tlbikgPT4ge1xuICAgIGlmICh0b2tlbnNbdG9rZW5dKSB7XG4gICAgICByZXR1cm4gYWNjdW0gKyB0b2tlbnNbdG9rZW5dKGRhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gYWNjdW0gKyB0b2tlbjtcbiAgfSwgJycpO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyIFN0cmluZyB3aXRoIGludGVycG9sYXRpb25zXG4gKiBAcGFyYW0geyp9IGFsZXJ0IEFsZXJ0IG9iamVjdFxuICogQHBhcmFtIHsqfSBleHRyYSBFeHRyYSBwYXJhbWV0ZXJzIHRvIGludGVycG9sYXRlIHdoYXQgYXJlbid0IGluIGFsZXJ0IG9iamV0LiBPbmx5IGFkbWl0IG9uZSBsZXZlbCBvZiBkZXB0aFxuICovXG5mdW5jdGlvbiBpbnRlcnBvbGF0ZUFsZXJ0UHJvcHMoc3RyLCBhbGVydCwgZXh0cmEgPSB7fSkge1xuICBjb25zdCBtYXRjaGVzID0gc3RyLm1hdGNoKC97KFtcXHdcXC5fXSspfS9nKTtcbiAgcmV0dXJuIChcbiAgICAobWF0Y2hlcyAmJlxuICAgICAgbWF0Y2hlcy5yZWR1Y2UoKGFjY3VtLCBjdXIpID0+IHtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBjdXIubWF0Y2goL3soW1xcd1xcLl9dKyl9Lyk7XG4gICAgICAgIGNvbnN0IGl0ZW1zID0gbWF0Y2hbMV0uc3BsaXQoJy4nKTtcbiAgICAgICAgY29uc3QgdmFsdWUgPVxuICAgICAgICAgIGl0ZW1zLnJlZHVjZSgoYSwgYykgPT4gKGEgJiYgYVtjXSkgfHwgZXh0cmFbY10gfHwgdW5kZWZpbmVkLCBhbGVydCkgfHxcbiAgICAgICAgICBjdXI7XG4gICAgICAgIHJldHVybiBhY2N1bS5yZXBsYWNlKGN1ciwgdmFsdWUpO1xuICAgICAgfSwgc3RyKSkgfHxcbiAgICBzdHJcbiAgKTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYSByYW5kb20gcHJvYmFiaWxpdHlcbiAqIEBwYXJhbSB7bnVtYmVyfSBwcm9iYWJpbGl0eVxuICogQHBhcmFtIHtudW1iZXJbPTEwMF19IG1heGltdW1cbiAqL1xuZnVuY3Rpb24gcmFuZG9tUHJvYmFiaWxpdHkocHJvYmFiaWxpdHksIG1heGltdW0gPSAxMDApIHtcbiAgcmV0dXJuIHJhbmRvbUludGVydmFsSW50ZWdlcigwLCBtYXhpbXVtKSA8PSBwcm9iYWJpbGl0eTtcbn1cblxuZXhwb3J0IHsgZ2VuZXJhdGVBbGVydCwgZ2VuZXJhdGVBbGVydHMgfTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQWFBLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQVdBLElBQUFDLHFCQUFBLEdBQUFELE9BQUE7QUFTQSxJQUFBRSxLQUFBLEdBQUFDLHVCQUFBLENBQUFILE9BQUE7QUFDQSxJQUFBSSxjQUFBLEdBQUFELHVCQUFBLENBQUFILE9BQUE7QUFDQSxJQUFBSyxHQUFBLEdBQUFGLHVCQUFBLENBQUFILE9BQUE7QUFDQSxJQUFBTSxtQkFBQSxHQUFBSCx1QkFBQSxDQUFBSCxP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