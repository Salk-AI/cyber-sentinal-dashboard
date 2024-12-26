"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayMitreRules = exports.arrayLocation = void 0;
/*
 * Wazuh app - Mitre sample alerts
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

// Mitre
const arrayMitreRules = exports.arrayMitreRules = [{
  filename: '0015-ossec_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 504,
  level: 3,
  status: 'enabled',
  details: {
    if_sid: '500',
    match: 'Agent disconnected'
  },
  pci_dss: ['10.6.1', '10.2.6'],
  gpg13: ['10.1'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6', 'AU.14', 'AU.5'],
  tsc: ['CC7.2', 'CC7.3', 'CC6.8'],
  mitre: {
    tactic: ['Defense Evasion'],
    id: ['T1089'],
    technique: ['Disabling Security Tools']
  },
  groups: ['wazuh'],
  description: 'Ossec agent disconnected.'
}, {
  filename: '0015-ossec_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 505,
  level: 3,
  status: 'enabled',
  details: {
    if_sid: '500',
    match: 'Agent removed'
  },
  pci_dss: ['10.6.1', '10.2.6'],
  gpg13: ['10.1'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6', 'AU.14', 'AU.5'],
  tsc: ['CC7.2', 'CC7.3', 'CC6.8'],
  mitre: {
    tactic: ['Defense Evasion'],
    id: ['T1089'],
    technique: ['Disabling Security Tools']
  },
  groups: ['wazuh'],
  description: 'Ossec agent removed.'
}, {
  filename: '0015-ossec_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 518,
  level: 9,
  status: 'enabled',
  details: {
    if_sid: '514',
    match: 'Adware|Spyware'
  },
  gpg13: ['4.2'],
  gdpr: ['IV_35.7.d'],
  mitre: {
    tactic: ['Lateral Movement'],
    id: ['T1017'],
    technique: ['Application Deployment Software']
  },
  groups: ['rootcheck', 'wazuh'],
  description: 'Windows Adware/Spyware application found.'
}, {
  filename: '0015-ossec_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 550,
  level: 7,
  status: 'enabled',
  details: {
    category: 'wazuh',
    decoded_as: 'syscheck_integrity_changed'
  },
  pci_dss: ['11.5'],
  gpg13: ['4.11'],
  gdpr: ['II_5.1.f'],
  hipaa: ['164.312.c.1', '164.312.c.2'],
  nist_800_53: ['SI.7'],
  tsc: ['PI1.4', 'PI1.5', 'CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Impact'],
    id: ['T1492'],
    technique: ['Stored Data Manipulation']
  },
  groups: ['syscheck', 'wazuh'],
  description: 'Integrity checksum changed.'
}, {
  filename: '0015-ossec_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 553,
  level: 7,
  status: 'enabled',
  details: {
    category: 'wazuh',
    decoded_as: 'syscheck_deleted'
  },
  pci_dss: ['11.5'],
  gpg13: ['4.11'],
  gdpr: ['II_5.1.f'],
  hipaa: ['164.312.c.1', '164.312.c.2'],
  nist_800_53: ['SI.7'],
  tsc: ['PI1.4', 'PI1.5', 'CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Defense Evasion', 'Impact'],
    id: ['T1107', 'T1485'],
    technique: ['File Deletion', 'Data Destruction']
  },
  groups: ['syscheck', 'wazuh'],
  description: 'File deleted.'
}, {
  filename: '0015-ossec_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 592,
  level: 8,
  status: 'enabled',
  details: {
    if_sid: '500',
    match: '^ossec: File size reduced'
  },
  pci_dss: ['10.5.2', '11.4'],
  gpg13: ['10.1'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.9', 'SI.4'],
  tsc: ['CC6.1', 'CC7.2', 'CC7.3', 'CC6.8'],
  mitre: {
    tactic: ['Impact'],
    id: ['T1492'],
    technique: ['Stored Data Manipulation']
  },
  groups: ['attacks', 'wazuh'],
  description: 'Log file size reduced.'
}, {
  filename: '0015-ossec_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 593,
  level: 9,
  status: 'enabled',
  details: {
    if_sid: '500',
    match: '^ossec: Event log cleared'
  },
  pci_dss: ['10.5.2'],
  gpg13: ['10.1'],
  gdpr: ['II_5.1.f', 'IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.9'],
  tsc: ['CC6.1', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Defense Evasion'],
    id: ['T1070'],
    technique: ['Indicator Removal on Host']
  },
  groups: ['logs_cleared', 'wazuh'],
  description: 'Microsoft Event log cleared.'
}, {
  filename: '0015-ossec_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 594,
  level: 5,
  status: 'enabled',
  details: {
    category: 'wazuh',
    if_sid: '550',
    hostname: 'syscheck-registry'
  },
  pci_dss: ['11.5'],
  gpg13: ['4.13'],
  gdpr: ['II_5.1.f'],
  hipaa: ['164.312.c.1', '164.312.c.2'],
  nist_800_53: ['SI.7'],
  tsc: ['PI1.4', 'PI1.5', 'CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Impact'],
    id: ['T1492'],
    technique: ['Stored Data Manipulation']
  },
  groups: ['syscheck', 'wazuh'],
  description: 'Registry Integrity Checksum Changed'
}, {
  filename: '0015-ossec_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 597,
  level: 5,
  status: 'enabled',
  details: {
    category: 'wazuh',
    if_sid: '553',
    hostname: 'syscheck-registry'
  },
  pci_dss: ['11.5'],
  gpg13: ['4.13'],
  gdpr: ['II_5.1.f'],
  hipaa: ['164.312.c.1', '164.312.c.2'],
  nist_800_53: ['SI.7'],
  tsc: ['PI1.4', 'PI1.5', 'CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Defense Evasion', 'Impact'],
    id: ['T1107', 'T1485'],
    technique: ['File Deletion', 'Data Destruction']
  },
  groups: ['syscheck', 'wazuh'],
  description: 'Registry Entry Deleted.'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 1003,
  level: 13,
  status: 'enabled',
  details: {
    maxsize: '1025',
    noalert: '1'
  },
  gpg13: ['4.3'],
  mitre: {
    tactic: ['Impact'],
    id: ['T1499'],
    technique: ['Endpoint Denial of Service']
  },
  groups: ['syslog', 'errors'],
  description: 'Non standard syslog message (size too large).'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 2301,
  level: 10,
  status: 'enabled',
  details: {
    match: '^Deactivating service '
  },
  pci_dss: ['10.6.1'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6'],
  tsc: ['CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Impact'],
    id: ['T1499'],
    technique: ['Endpoint Denial of Service']
  },
  groups: ['syslog', 'xinetd'],
  description: 'xinetd: Excessive number connections to a service.'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 2502,
  level: 10,
  status: 'enabled',
  details: {
    match: 'more authentication failures;|REPEATED login failures'
  },
  pci_dss: ['10.2.4', '10.2.5'],
  gpg13: ['7.8'],
  gdpr: ['IV_35.7.d', 'IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Credential Access'],
    id: ['T1110'],
    technique: ['Brute Force']
  },
  groups: ['authentication_failed', 'syslog', 'access_control'],
  description: 'syslog: User missed the password more than one time'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 2503,
  level: 5,
  status: 'enabled',
  details: {
    regex: ['^refused connect from|', '^libwrap refused connection|', 'Connection from S+ denied']
  },
  pci_dss: ['10.2.4'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Command and Control'],
    id: ['T1095'],
    technique: ['Standard Non-Application Layer Protocol']
  },
  groups: ['access_denied', 'syslog', 'access_control'],
  description: 'syslog: Connection blocked by Tcp Wrappers.'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 2504,
  level: 9,
  status: 'enabled',
  details: {
    match: 'ILLEGAL ROOT LOGIN|ROOT LOGIN REFUSED'
  },
  pci_dss: ['10.2.4', '10.2.5', '10.2.2'],
  gpg13: ['7.8'],
  gdpr: ['IV_35.7.d', 'IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7', 'AC.6'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Privilege Escalation'],
    id: ['T1169'],
    technique: ['Sudo']
  },
  groups: ['invalid_login', 'syslog', 'access_control'],
  description: 'syslog: Illegal root login.'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 2551,
  level: 10,
  status: 'enabled',
  details: {
    if_sid: '2550',
    regex: '^Connection from S+ on illegal port$'
  },
  pci_dss: ['10.6.1'],
  gpg13: ['7.1'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6'],
  tsc: ['CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Discovery'],
    id: ['T1046'],
    technique: ['Network Service Scanning']
  },
  groups: ['connection_attempt', 'syslog', 'access_control'],
  description: 'Connection to rshd from unprivileged port. Possible network scan.'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 2833,
  level: 8,
  status: 'enabled',
  details: {
    if_sid: '2832',
    match: '^(root)'
  },
  pci_dss: ['10.2.7', '10.6.1', '10.2.2'],
  gpg13: ['4.13'],
  gdpr: ['IV_35.7.d', 'IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AU.6', 'AC.6'],
  tsc: ['CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Privilege Escalation'],
    id: ['T1169'],
    technique: ['Sudo']
  },
  groups: ['syslog', 'cron'],
  description: "Root's crontab entry changed."
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 2960,
  level: 2,
  status: 'enabled',
  details: {
    decoded_as: 'gpasswd',
    match: 'added by'
  },
  gpg13: ['7.9', '4.13'],
  gdpr: ['IV_32.2'],
  mitre: {
    tactic: ['Persistence'],
    id: ['T1136'],
    technique: ['Create Account']
  },
  groups: ['syslog', 'yum'],
  description: 'User added to group.'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 2961,
  level: 5,
  status: 'enabled',
  details: {
    if_sid: '2960',
    group: 'sudo'
  },
  gpg13: ['7.9', '4.13'],
  gdpr: ['IV_32.2'],
  mitre: {
    tactic: ['Persistence'],
    id: ['T1136'],
    technique: ['Create Account']
  },
  groups: ['syslog', 'yum'],
  description: 'User added to group sudo.'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 2964,
  level: 10,
  status: 'enabled',
  details: {
    frequency: '4',
    timeframe: '30',
    if_matched_sid: '2963',
    same_source_ip: ''
  },
  pci_dss: ['11.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Impact'],
    id: ['T1499'],
    technique: ['Endpoint Denial of Service']
  },
  groups: ['recon', 'syslog', 'perdition'],
  description: 'perdition: Multiple connection attempts from same source.'
}, {
  filename: '0025-sendmail_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3102,
  level: 5,
  status: 'enabled',
  details: {
    if_sid: '3101',
    match: 'reject=451 4.1.8 '
  },
  pci_dss: ['11.4'],
  gdpr: ['IV_35.7.d'],
  nist_800_53: ['SI.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Collection'],
    id: ['T1114'],
    technique: ['Email Collection']
  },
  groups: ['spam', 'syslog', 'sendmail'],
  description: 'sendmail: Sender domain does not have any valid MX record (Requested action aborted).'
}, {
  filename: '0025-sendmail_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3103,
  level: 6,
  status: 'enabled',
  details: {
    if_sid: '3101',
    match: 'reject=550 5.0.0 |reject=553 5.3.0'
  },
  pci_dss: ['11.4'],
  gdpr: ['IV_35.7.d'],
  nist_800_53: ['SI.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Collection'],
    id: ['T1114'],
    technique: ['Email Collection']
  },
  groups: ['spam', 'syslog', 'sendmail'],
  description: 'sendmail: Rejected by access list (55x: Requested action not taken).'
}, {
  filename: '0025-sendmail_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3104,
  level: 6,
  status: 'enabled',
  details: {
    if_sid: '3101',
    match: 'reject=550 5.7.1 '
  },
  pci_dss: ['11.4'],
  gdpr: ['IV_35.7.d'],
  nist_800_53: ['SI.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Collection'],
    id: ['T1114'],
    technique: ['Email Collection']
  },
  groups: ['spam', 'syslog', 'sendmail'],
  description: 'sendmail: Attempt to use mail server as relay (550: Requested action not taken).'
}, {
  filename: '0025-sendmail_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3105,
  level: 5,
  status: 'enabled',
  details: {
    if_sid: '3101',
    match: 'reject=553 5.1.8 '
  },
  pci_dss: ['11.4'],
  gdpr: ['IV_35.7.d'],
  nist_800_53: ['SI.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Collection'],
    id: ['T1114'],
    technique: ['Email Collection']
  },
  groups: ['spam', 'syslog', 'sendmail'],
  description: 'sendmail: Sender domain is not found  (553: Requested action not taken).'
}, {
  filename: '0025-sendmail_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3106,
  level: 5,
  status: 'enabled',
  details: {
    if_sid: '3101',
    match: 'reject=553 5.5.4 '
  },
  pci_dss: ['11.4'],
  gdpr: ['IV_35.7.d'],
  nist_800_53: ['SI.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Collection'],
    id: ['T1114'],
    technique: ['Email Collection']
  },
  groups: ['spam', 'syslog', 'sendmail'],
  description: 'sendmail: Sender address does not have domain (553: Requested action not taken).'
}, {
  filename: '0025-sendmail_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3108,
  level: 6,
  status: 'enabled',
  details: {
    if_sid: '3100',
    match: 'rejecting commands from'
  },
  pci_dss: ['11.4'],
  gdpr: ['IV_35.7.d'],
  nist_800_53: ['SI.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Collection'],
    id: ['T1114'],
    technique: ['Email Collection']
  },
  groups: ['spam', 'syslog', 'sendmail'],
  description: 'sendmail: Sendmail rejected due to pre-greeting.'
}, {
  filename: '0025-sendmail_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3151,
  level: 10,
  status: 'enabled',
  details: {
    frequency: '8',
    timeframe: '120',
    if_matched_sid: '3102',
    same_source_ip: ''
  },
  pci_dss: ['11.4'],
  gdpr: ['IV_35.7.d'],
  nist_800_53: ['SI.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Collection', 'Impact'],
    id: ['T1114', 'T1499'],
    technique: ['Email Collection', 'Endpoint Denial of Service']
  },
  groups: ['multiple_spam', 'syslog', 'sendmail'],
  description: 'sendmail: Sender domain has bogus MX record. It should not be sending e-mail.'
}, {
  filename: '0025-sendmail_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3152,
  level: 6,
  status: 'enabled',
  details: {
    frequency: '8',
    timeframe: '120',
    if_matched_sid: '3103',
    same_source_ip: ''
  },
  pci_dss: ['11.4'],
  gdpr: ['IV_35.7.d'],
  nist_800_53: ['SI.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Collection', 'Impact'],
    id: ['T1114', 'T1499'],
    technique: ['Email Collection', 'Endpoint Denial of Service']
  },
  groups: ['multiple_spam', 'syslog', 'sendmail'],
  description: 'sendmail: Multiple attempts to send e-mail from a previously rejected sender (access).'
}, {
  filename: '0025-sendmail_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3153,
  level: 6,
  status: 'enabled',
  details: {
    frequency: '8',
    timeframe: '120',
    if_matched_sid: '3104',
    same_source_ip: ''
  },
  pci_dss: ['11.4'],
  gdpr: ['IV_35.7.d'],
  nist_800_53: ['SI.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Collection', 'Impact'],
    id: ['T1114', 'T1499'],
    technique: ['Email Collection', 'Endpoint Denial of Service']
  },
  groups: ['multiple_spam', 'syslog', 'sendmail'],
  description: 'sendmail: Multiple relaying attempts of spam.'
}, {
  filename: '0025-sendmail_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3154,
  level: 10,
  status: 'enabled',
  details: {
    frequency: '8',
    timeframe: '120',
    if_matched_sid: '3105',
    same_source_ip: ''
  },
  pci_dss: ['11.4'],
  gdpr: ['IV_35.7.d'],
  nist_800_53: ['SI.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Collection', 'Impact'],
    id: ['T1114', 'T1499'],
    technique: ['Email Collection', 'Endpoint Denial of Service']
  },
  groups: ['multiple_spam', 'syslog', 'sendmail'],
  description: 'sendmail: Multiple attempts to send e-mail from invalid/unknown sender domain.'
}, {
  filename: '0025-sendmail_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3155,
  level: 10,
  status: 'enabled',
  details: {
    frequency: '8',
    timeframe: '120',
    if_matched_sid: '3106',
    same_source_ip: ''
  },
  pci_dss: ['11.4'],
  gdpr: ['IV_35.7.d'],
  nist_800_53: ['SI.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Collection', 'Impact'],
    id: ['T1114', 'T1499'],
    technique: ['Email Collection', 'Endpoint Denial of Service']
  },
  groups: ['multiple_spam', 'syslog', 'sendmail'],
  description: 'sendmail: Multiple attempts to send e-mail from invalid/unknown sender.'
}, {
  filename: '0025-sendmail_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3156,
  level: 10,
  status: 'enabled',
  details: {
    frequency: '12',
    timeframe: '120',
    if_matched_sid: '3107',
    same_source_ip: ''
  },
  pci_dss: ['11.4'],
  gdpr: ['IV_35.7.d'],
  nist_800_53: ['SI.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Collection', 'Impact'],
    id: ['T1114', 'T1499'],
    technique: ['Email Collection', 'Endpoint Denial of Service']
  },
  groups: ['multiple_spam', 'syslog', 'sendmail'],
  description: 'sendmail: Multiple rejected e-mails from same source ip.'
}, {
  filename: '0025-sendmail_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3158,
  level: 10,
  status: 'enabled',
  details: {
    frequency: '8',
    timeframe: '120',
    if_matched_sid: '3108',
    same_source_ip: ''
  },
  pci_dss: ['11.4'],
  gdpr: ['IV_35.7.d'],
  nist_800_53: ['SI.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Collection', 'Impact'],
    id: ['T1114', 'T1499'],
    technique: ['Email Collection', 'Endpoint Denial of Service']
  },
  groups: ['multiple_spam', 'syslog', 'sendmail'],
  description: 'sendmail: Multiple pre-greetings rejects.'
}, {
  filename: '0025-sendmail_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3191,
  level: 6,
  status: 'enabled',
  details: {
    if_sid: '3190',
    match: '^sender check failed|^sender check tempfailed'
  },
  pci_dss: ['11.4'],
  gdpr: ['IV_35.7.d'],
  nist_800_53: ['SI.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Collection'],
    id: ['T1114'],
    technique: ['Email Collection']
  },
  groups: ['smf-sav', 'spam', 'syslog', 'sendmail'],
  description: 'sendmail: SMF-SAV sendmail milter unable to verify address (REJECTED).'
}, {
  filename: '0030-postfix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3301,
  level: 6,
  status: 'enabled',
  details: {
    if_sid: '3300',
    id: '^554$'
  },
  pci_dss: ['10.6.1', '11.4'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6', 'SI.4'],
  tsc: ['CC7.2', 'CC7.3', 'CC6.1', 'CC6.8'],
  mitre: {
    tactic: ['Collection'],
    id: ['T1114'],
    technique: ['Email Collection']
  },
  groups: ['spam', 'syslog', 'postfix'],
  description: 'Postfix: Attempt to use mail server as relay (client host rejected).'
}, {
  filename: '0030-postfix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3302,
  level: 6,
  status: 'enabled',
  details: {
    if_sid: '3300',
    id: '^550$'
  },
  pci_dss: ['10.6.1', '11.4'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6', 'SI.4'],
  tsc: ['CC7.2', 'CC7.3', 'CC6.1', 'CC6.8'],
  mitre: {
    tactic: ['Collection'],
    id: ['T1114'],
    technique: ['Email Collection']
  },
  groups: ['spam', 'syslog', 'postfix'],
  description: 'Postfix: Rejected by access list (Requested action not taken).'
}, {
  filename: '0030-postfix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3303,
  level: 5,
  status: 'enabled',
  details: {
    if_sid: '3300',
    id: '^450$'
  },
  pci_dss: ['10.6.1', '11.4'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6', 'SI.4'],
  tsc: ['CC7.2', 'CC7.3', 'CC6.1', 'CC6.8'],
  mitre: {
    tactic: ['Collection'],
    id: ['T1114'],
    technique: ['Email Collection']
  },
  groups: ['spam', 'syslog', 'postfix'],
  description: 'Postfix: Sender domain is not found (450: Requested mail action not taken).'
}, {
  filename: '0030-postfix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3304,
  level: 5,
  status: 'enabled',
  details: {
    if_sid: '3300',
    id: '^503$'
  },
  pci_dss: ['10.6.1', '11.4'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6', 'SI.4'],
  tsc: ['CC7.2', 'CC7.3', 'CC6.1', 'CC6.8'],
  mitre: {
    tactic: ['Collection'],
    id: ['T1114'],
    technique: ['Email Collection']
  },
  groups: ['spam', 'syslog', 'postfix'],
  description: 'Postfix: Improper use of SMTP command pipelining (503: Bad sequence of commands).'
}, {
  filename: '0030-postfix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3305,
  level: 5,
  status: 'enabled',
  details: {
    if_sid: '3300',
    id: '^504$'
  },
  pci_dss: ['10.6.1', '11.4'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6', 'SI.4'],
  tsc: ['CC7.2', 'CC7.3', 'CC6.1', 'CC6.8'],
  mitre: {
    tactic: ['Collection'],
    id: ['T1114'],
    technique: ['Email Collection']
  },
  groups: ['spam', 'syslog', 'postfix'],
  description: 'Postfix: Recipient address must contain FQDN (504: Command parameter not implemented).'
}, {
  filename: '0030-postfix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3306,
  level: 6,
  status: 'enabled',
  details: {
    if_sid: '3301, 3302',
    match: ' blocked using '
  },
  pci_dss: ['10.6.1', '11.4'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6', 'SI.4'],
  tsc: ['CC7.2', 'CC7.3', 'CC6.1', 'CC6.8'],
  mitre: {
    tactic: ['Collection'],
    id: ['T1114'],
    technique: ['Email Collection']
  },
  groups: ['spam', 'syslog', 'postfix'],
  description: 'Postfix: IP Address black-listed by anti-spam (blocked).'
}, {
  filename: '0030-postfix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3330,
  level: 10,
  status: 'enabled',
  details: {
    ignore: '240',
    if_sid: '3320',
    match: ['defer service failure|Resource temporarily unavailable|', '^fatal: the Postfix mail system is not running']
  },
  pci_dss: ['10.6.1'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6'],
  tsc: ['CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Impact'],
    id: ['T1499'],
    technique: ['Endpoint Denial of Service']
  },
  groups: ['service_availability', 'syslog', 'postfix'],
  description: 'Postfix process error.'
}, {
  filename: '0030-postfix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3335,
  level: 6,
  status: 'enabled',
  details: {
    if_sid: '3320',
    match: '^too many '
  },
  pci_dss: ['10.6.1', '11.4'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6', 'SI.4'],
  tsc: ['CC7.2', 'CC7.3', 'CC6.1', 'CC6.8'],
  mitre: {
    tactic: ['Collection'],
    id: ['T1114'],
    technique: ['Email Collection']
  },
  groups: ['spam', 'syslog', 'postfix'],
  description: 'Postfix: too many errors after RCPT from unknown'
}, {
  filename: '0030-postfix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3351,
  level: 6,
  status: 'enabled',
  details: {
    frequency: '$POSTFIX_FREQ',
    timeframe: '90',
    if_matched_sid: '3301',
    same_source_ip: ''
  },
  pci_dss: ['10.6.1', '11.4'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6', 'SI.4'],
  tsc: ['CC7.2', 'CC7.3', 'CC6.1', 'CC6.8'],
  mitre: {
    tactic: ['Collection', 'Impact'],
    id: ['T1114', 'T1499'],
    technique: ['Email Collection', 'Endpoint Denial of Service']
  },
  groups: ['multiple_spam', 'syslog', 'postfix'],
  description: 'Postfix: Multiple relaying attempts of spam.'
}, {
  filename: '0030-postfix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3352,
  level: 6,
  status: 'enabled',
  details: {
    frequency: '$POSTFIX_FREQ',
    timeframe: '120',
    if_matched_sid: '3302',
    same_source_ip: ''
  },
  pci_dss: ['10.6.1', '11.4'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6', 'SI.4'],
  tsc: ['CC7.2', 'CC7.3', 'CC6.1', 'CC6.8'],
  mitre: {
    tactic: ['Collection', 'Impact'],
    id: ['T1114', 'T1499'],
    technique: ['Email Collection', 'Endpoint Denial of Service']
  },
  groups: ['multiple_spam', 'syslog', 'postfix'],
  description: 'Postfix: Multiple attempts to send e-mail from a rejected sender IP (access).'
}, {
  filename: '0030-postfix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3353,
  level: 10,
  status: 'enabled',
  details: {
    frequency: '$POSTFIX_FREQ',
    timeframe: '120',
    if_matched_sid: '3303',
    same_source_ip: ''
  },
  pci_dss: ['10.6.1', '11.4'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6', 'SI.4'],
  tsc: ['CC7.2', 'CC7.3', 'CC6.1', 'CC6.8'],
  mitre: {
    tactic: ['Collection', 'Impact'],
    id: ['T1114', 'T1499'],
    technique: ['Email Collection', 'Endpoint Denial of Service']
  },
  groups: ['multiple_spam', 'syslog', 'postfix'],
  description: 'Postfix: Multiple attempts to send e-mail from invalid/unknown sender domain.'
}, {
  filename: '0030-postfix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3354,
  level: 12,
  status: 'enabled',
  details: {
    frequency: '$POSTFIX_FREQ',
    timeframe: '120',
    if_matched_sid: '3304',
    same_source_ip: ''
  },
  pci_dss: ['10.6.1', '11.4'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6', 'SI.4'],
  tsc: ['CC7.2', 'CC7.3', 'CC6.1', 'CC6.8'],
  mitre: {
    tactic: ['Collection'],
    id: ['T1114'],
    technique: ['Email Collection']
  },
  groups: ['multiple_spam', 'syslog', 'postfix'],
  description: 'Postfix: Multiple misuse of SMTP service (bad sequence of commands).'
}, {
  filename: '0030-postfix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3355,
  level: 10,
  status: 'enabled',
  details: {
    frequency: '$POSTFIX_FREQ',
    timeframe: '120',
    if_matched_sid: '3305',
    same_source_ip: ''
  },
  pci_dss: ['10.6.1', '11.4'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6', 'SI.4'],
  tsc: ['CC7.2', 'CC7.3', 'CC6.1', 'CC6.8'],
  mitre: {
    tactic: ['Collection', 'Impact'],
    id: ['T1114', 'T1499'],
    technique: ['Email Collection', 'Endpoint Denial of Service']
  },
  groups: ['multiple_spam', 'syslog', 'postfix'],
  description: 'Postfix: Multiple attempts to send e-mail to invalid recipient or from unknown sender domain.'
}, {
  filename: '0030-postfix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3356,
  level: 10,
  status: 'enabled',
  details: {
    frequency: '$POSTFIX_FREQ',
    timeframe: '120',
    ignore: '30',
    if_matched_sid: '3306',
    same_source_ip: ''
  },
  pci_dss: ['10.6.1', '11.4'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6', 'SI.4'],
  tsc: ['CC7.2', 'CC7.3', 'CC6.1', 'CC6.8'],
  mitre: {
    tactic: ['Impact'],
    id: ['T1499'],
    technique: ['Endpoint Denial of Service']
  },
  groups: ['multiple_spam', 'syslog', 'postfix'],
  description: 'Postfix: Multiple attempts to send e-mail from black-listed IP address (blocked).'
}, {
  filename: '0030-postfix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3357,
  level: 10,
  status: 'enabled',
  details: {
    frequency: '8',
    timeframe: '120',
    ignore: '60',
    if_matched_sid: '3332',
    same_source_ip: ''
  },
  pci_dss: ['10.2.4', '10.2.5', '11.4'],
  gdpr: ['IV_35.7.d', 'IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7', 'SI.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Credential Access'],
    id: ['T1110'],
    technique: ['Brute Force']
  },
  groups: ['authentication_failures', 'syslog', 'postfix'],
  description: 'Postfix: Multiple SASL authentication failures.'
}, {
  filename: '0030-postfix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3396,
  level: 6,
  status: 'enabled',
  details: {
    if_sid: '3395',
    match: 'verification'
  },
  pci_dss: ['10.6.1', '11.4'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6', 'SI.4'],
  tsc: ['CC7.2', 'CC7.3', 'CC6.1', 'CC6.8'],
  mitre: {
    tactic: ['Collection'],
    id: ['T1114'],
    technique: ['Email Collection']
  },
  groups: ['spam', 'syslog', 'postfix'],
  description: 'Postfix: hostname verification failed'
}, {
  filename: '0030-postfix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3397,
  level: 6,
  status: 'enabled',
  details: {
    if_sid: '3395',
    match: 'RBL'
  },
  pci_dss: ['10.6.1', '11.4'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6', 'SI.4'],
  tsc: ['CC7.2', 'CC7.3', 'CC6.1', 'CC6.8'],
  mitre: {
    tactic: ['Collection'],
    id: ['T1114'],
    technique: ['Email Collection']
  },
  groups: ['spam', 'syslog', 'postfix'],
  description: 'Postfix: RBL lookup error: Host or domain name not found'
}, {
  filename: '0030-postfix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3398,
  level: 6,
  status: 'enabled',
  details: {
    if_sid: '3395',
    match: 'MAIL|does not resolve to address'
  },
  pci_dss: ['10.6.1', '11.4'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6', 'SI.4'],
  tsc: ['CC7.2', 'CC7.3', 'CC6.1', 'CC6.8'],
  mitre: {
    tactic: ['Collection'],
    id: ['T1114'],
    technique: ['Email Collection']
  },
  groups: ['spam', 'syslog', 'postfix'],
  description: 'Postfix: Illegal address from unknown sender'
}, {
  filename: '0040-imapd_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3602,
  level: 3,
  status: 'enabled',
  details: {
    if_sid: '3600',
    match: 'Authenticated user='
  },
  pci_dss: ['10.2.5'],
  gpg13: ['7.1'],
  gdpr: ['IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7'],
  tsc: ['CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Initial Access'],
    id: ['T1078'],
    technique: ['Valid Accounts']
  },
  groups: ['authentication_success', 'syslog', 'imapd'],
  description: 'Imapd user login.'
}, {
  filename: '0040-imapd_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3651,
  level: 10,
  status: 'enabled',
  details: {
    frequency: '$IMAPD_FREQ',
    timeframe: '120',
    if_matched_sid: '3601',
    same_source_ip: ''
  },
  pci_dss: ['10.2.4', '10.2.5', '11.4'],
  gpg13: ['7.1'],
  gdpr: ['IV_35.7.d', 'IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7', 'SI.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Credential Access'],
    id: ['T1110'],
    technique: ['Brute Force']
  },
  groups: ['authentication_failures', 'syslog', 'imapd'],
  description: 'Imapd Multiple failed logins from same source ip.'
}, {
  filename: '0045-mailscanner_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3751,
  level: 6,
  status: 'enabled',
  details: {
    frequency: '8',
    timeframe: '180',
    if_matched_sid: '3702',
    same_source_ip: ''
  },
  pci_dss: ['10.6.1'],
  gpg13: ['4.12'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6'],
  tsc: ['CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Credential Access', 'Collection'],
    id: ['T1110', 'T1114'],
    technique: ['Brute Force', 'Email Collection']
  },
  groups: ['multiple_spam', 'syslog', 'mailscanner'],
  description: 'mailscanner: Multiple attempts of spam.'
}, {
  filename: '0050-ms-exchange_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3851,
  level: 9,
  status: 'enabled',
  details: {
    frequency: '12',
    timeframe: '120',
    ignore: '120',
    if_matched_sid: '3801',
    same_source_ip: ''
  },
  pci_dss: ['10.6.1'],
  gpg13: ['4.12'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6'],
  tsc: ['CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Collection', 'Impact'],
    id: ['T1114', 'T1499'],
    technique: ['Email Collection', 'Endpoint Denial of Service']
  },
  groups: ['multiple_spam', 'ms', 'exchange'],
  description: 'ms-exchange: Multiple e-mail attempts to an invalid account.'
}, {
  filename: '0050-ms-exchange_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3852,
  level: 9,
  status: 'enabled',
  details: {
    frequency: '14',
    timeframe: '120',
    ignore: '240',
    if_matched_sid: '3802',
    same_source_ip: ''
  },
  pci_dss: ['10.6.1'],
  gpg13: ['4.12'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6'],
  tsc: ['CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Collection', 'Impact'],
    id: ['T1114', 'T1499'],
    technique: ['Email Collection', 'Endpoint Denial of Service']
  },
  groups: ['multiple_spam', 'ms', 'exchange'],
  description: 'ms-exchange: Multiple e-mail 500 error code (spam).'
}, {
  filename: '0055-courier_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3904,
  level: 3,
  status: 'enabled',
  details: {
    if_sid: '3900',
    match: '^LOGIN,'
  },
  pci_dss: ['10.2.5'],
  gpg13: ['7.1', '7.2'],
  gdpr: ['IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7'],
  tsc: ['CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Initial Access'],
    id: ['T1078'],
    technique: ['Valid Accounts']
  },
  groups: ['authentication_success', 'syslog', 'courier'],
  description: 'Courier (imap/pop3) authentication success.'
}, {
  filename: '0055-courier_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3910,
  level: 10,
  status: 'enabled',
  details: {
    frequency: '12',
    timeframe: '30',
    if_matched_sid: '3902',
    same_source_ip: ''
  },
  pci_dss: ['10.2.4', '10.2.5', '11.4'],
  gpg13: ['7.1'],
  gdpr: ['IV_35.7.d', 'IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7', 'SI.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Credential Access'],
    id: ['T1110'],
    technique: ['Brute Force']
  },
  groups: ['authentication_failures', 'syslog', 'courier'],
  description: 'Courier brute force (multiple failed logins).'
}, {
  filename: '0055-courier_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 3911,
  level: 10,
  status: 'enabled',
  details: {
    frequency: '17',
    timeframe: '30',
    if_matched_sid: '3901',
    same_source_ip: ''
  },
  pci_dss: ['10.6.1', '11.4'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6', 'SI.4'],
  tsc: ['CC7.2', 'CC7.3', 'CC6.1', 'CC6.8'],
  mitre: {
    tactic: ['Credential Access'],
    id: ['T1110'],
    technique: ['Brute Force']
  },
  groups: ['recon', 'syslog', 'courier'],
  description: 'Courier: Multiple connection attempts from same source.'
}, {
  filename: '0065-pix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 4323,
  level: 3,
  status: 'enabled',
  details: {
    if_sid: '4314',
    id: '^6-605005'
  },
  pci_dss: ['10.2.5'],
  gpg13: ['7.8'],
  gdpr: ['IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7'],
  tsc: ['CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Initial Access'],
    id: ['T1078'],
    technique: ['Valid Accounts']
  },
  groups: ['authentication_success', 'syslog', 'pix'],
  description: 'PIX: Successful login.'
}, {
  filename: '0065-pix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 4325,
  level: 8,
  status: 'enabled',
  details: {
    if_sid: '4313',
    id: '^4-405001'
  },
  pci_dss: ['10.6.1'],
  gpg13: ['4.12'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6'],
  tsc: ['CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Command and Control'],
    id: ['T1095'],
    technique: ['Standard Non-Application Layer Protocol']
  },
  groups: ['syslog', 'pix'],
  description: 'PIX: ARP collision detected.'
}, {
  filename: '0065-pix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 4335,
  level: 3,
  status: 'enabled',
  details: {
    if_sid: '4314',
    id: '^6-113004'
  },
  pci_dss: ['10.2.5'],
  gpg13: ['7.1', '7.2'],
  gdpr: ['IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7'],
  tsc: ['CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Initial Access'],
    id: ['T1078'],
    technique: ['Valid Accounts']
  },
  groups: ['authentication_success', 'syslog', 'pix'],
  description: 'PIX: AAA (VPN) authentication successful.'
}, {
  filename: '0065-pix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 4336,
  level: 8,
  status: 'enabled',
  details: {
    if_sid: '4314',
    id: '^6-113006'
  },
  pci_dss: ['10.2.4', '10.2.5'],
  gpg13: ['7.1', '7.5'],
  gdpr: ['IV_35.7.d', 'IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Initial Access'],
    id: ['T1133'],
    technique: ['External Remote Services']
  },
  groups: ['authentication_failed', 'syslog', 'pix'],
  description: 'PIX: AAA (VPN) user locked out.'
}, {
  filename: '0065-pix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 4337,
  level: 8,
  status: 'enabled',
  details: {
    if_sid: '4312',
    id: '^3-201008'
  },
  pci_dss: ['10.6.1'],
  gpg13: ['4.12'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6'],
  tsc: ['CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Initial Access'],
    id: ['T1133'],
    technique: ['External Remote Services']
  },
  groups: ['service_availability', 'syslog', 'pix'],
  description: 'PIX: The PIX is disallowing new connections.'
}, {
  filename: '0065-pix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 4339,
  level: 8,
  status: 'enabled',
  details: {
    if_sid: '4314',
    id: '^5-111003'
  },
  pci_dss: ['1.1.1', '10.4'],
  gpg13: ['4.13'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.a.1', '164.312.b'],
  nist_800_53: ['CM.3', 'CM.5', 'AU.8'],
  tsc: ['CC8.1', 'CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Defense Evasion'],
    id: ['T1089'],
    technique: ['Disabling Security Tools']
  },
  groups: ['config_changed', 'syslog', 'pix'],
  description: 'PIX: Firewall configuration deleted.'
}, {
  filename: '0065-pix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 4340,
  level: 8,
  status: 'enabled',
  details: {
    if_sid: '4314',
    id: '^5-111005|^5-111004|^5-111002|^5-111007'
  },
  pci_dss: ['1.1.1', '10.4'],
  gpg13: ['4.13'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.a.1', '164.312.b'],
  nist_800_53: ['CM.3', 'CM.5', 'AU.8'],
  tsc: ['CC8.1', 'CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Defense Evasion'],
    id: ['T1089'],
    technique: ['Disabling Security Tools']
  },
  groups: ['config_changed', 'syslog', 'pix'],
  description: 'PIX: Firewall configuration changed.'
}, {
  filename: '0065-pix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 4342,
  level: 8,
  status: 'enabled',
  details: {
    if_sid: '4314',
    id: '^5-502101|^5-502102'
  },
  pci_dss: ['8.1.2', '10.2.5'],
  gpg13: ['4.13'],
  gdpr: ['IV_35.7.d', 'IV_32.2'],
  hipaa: ['164.312.a.2.I', '164.312.a.2.II', '164.312.b'],
  nist_800_53: ['AC.2', 'IA.4', 'AU.14', 'AC.7'],
  tsc: ['CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Defense Evasion', 'Initial Access'],
    id: ['T1089', 'T1133'],
    technique: ['Disabling Security Tools', 'External Remote Services']
  },
  groups: ['adduser', 'account_changed', 'syslog', 'pix'],
  description: 'PIX: User created or modified on the Firewall.'
}, {
  filename: '0065-pix_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 4386,
  level: 10,
  status: 'enabled',
  details: {
    frequency: '10',
    timeframe: '240',
    if_matched_sid: '4334',
    same_source_ip: ''
  },
  pci_dss: ['11.4', '10.2.4', '10.2.5'],
  gpg13: ['7.1'],
  gdpr: ['IV_35.7.d', 'IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['SI.4', 'AU.14', 'AC.7'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Credential Access', 'Initial Access'],
    id: ['T1110', 'T1133'],
    technique: ['Brute Force', 'External Remote Services']
  },
  groups: ['authentication_failures', 'syslog', 'pix'],
  description: 'PIX: Multiple AAA (VPN) authentication failures.'
}, {
  filename: '0070-netscreenfw_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 4505,
  level: 11,
  status: 'enabled',
  details: {
    if_sid: '4503',
    id: '^00027'
  },
  pci_dss: ['1.4', '10.6.1'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.a.1', '164.312.b'],
  nist_800_53: ['SC.7', 'AU.6'],
  tsc: ['CC6.7', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Impact'],
    id: ['T1485'],
    technique: ['Data Destruction']
  },
  groups: ['service_availability', 'netscreenfw'],
  description: 'Netscreen Erase sequence started.'
}, {
  filename: '0070-netscreenfw_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 4506,
  level: 8,
  status: 'enabled',
  details: {
    if_sid: '4501',
    id: '^00002'
  },
  pci_dss: ['10.2.5', '10.2.2'],
  gpg13: ['7.8'],
  gdpr: ['IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7', 'AC.6'],
  tsc: ['CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Initial Access'],
    id: ['T1078'],
    technique: ['Valid Accounts']
  },
  groups: ['authentication_success', 'netscreenfw'],
  description: 'Netscreen firewall: Successfull admin login'
}, {
  filename: '0070-netscreenfw_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 4507,
  level: 8,
  status: 'enabled',
  details: {
    if_sid: '4502',
    id: '^00515'
  },
  pci_dss: ['10.2.5', '10.2.2'],
  gpg13: ['7.8'],
  gdpr: ['IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7', 'AC.6'],
  tsc: ['CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Initial Access'],
    id: ['T1078'],
    technique: ['Valid Accounts']
  },
  groups: ['authentication_success', 'netscreenfw'],
  description: 'Netscreen firewall: Successfull admin login'
}, {
  filename: '0070-netscreenfw_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 4509,
  level: 8,
  status: 'enabled',
  details: {
    if_sid: '4504',
    id: '^00767'
  },
  pci_dss: ['1.1.1'],
  gpg13: ['4.12'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.a.1'],
  nist_800_53: ['CM.3', 'CM.5'],
  tsc: ['CC8.1'],
  mitre: {
    tactic: ['Defense Evasion'],
    id: ['T1089'],
    technique: ['Disabling Security Tools']
  },
  groups: ['config_changed', 'netscreenfw'],
  description: 'Netscreen firewall: configuration changed.'
}, {
  filename: '0070-netscreenfw_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 4550,
  level: 10,
  status: 'enabled',
  details: {
    frequency: '6',
    timeframe: '180',
    ignore: '60',
    if_matched_sid: '4503',
    same_source_ip: ''
  },
  pci_dss: ['1.4', '10.6.1', '11.4'],
  gpg13: ['4.1'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.a.1', '164.312.b'],
  nist_800_53: ['SC.7', 'AU.6', 'SI.4'],
  tsc: ['CC6.7', 'CC6.8', 'CC7.2', 'CC7.3', 'CC6.1'],
  mitre: {
    tactic: ['Impact'],
    id: ['T1499'],
    technique: ['Endpoint Denial of Service']
  },
  groups: ['netscreenfw'],
  description: 'Netscreen firewall: Multiple critical messages from same source IP.'
}, {
  filename: '0070-netscreenfw_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 4551,
  level: 10,
  status: 'enabled',
  details: {
    frequency: '8',
    timeframe: '180',
    ignore: '60',
    if_matched_sid: '4503'
  },
  mitre: {
    tactic: ['Impact'],
    id: ['T1499'],
    technique: ['Endpoint Denial of Service']
  },
  groups: ['netscreenfw'],
  description: 'Netscreen firewall: Multiple critical messages.'
}, {
  filename: '0075-cisco-ios_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 4722,
  level: 3,
  status: 'enabled',
  details: {
    if_sid: '4715',
    id: '^%SEC_LOGIN-5-LOGIN_SUCCESS'
  },
  pci_dss: ['10.2.5'],
  gpg13: ['3.6'],
  gdpr: ['IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7'],
  tsc: ['CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Initial Access'],
    id: ['T1078'],
    technique: ['Valid Accounts']
  },
  groups: ['authentication_success', 'syslog', 'cisco_ios'],
  description: 'Cisco IOS: Successful login to the router.'
}, {
  filename: '0080-sonicwall_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 4810,
  level: 3,
  status: 'enabled',
  details: {
    if_sid: '4806',
    id: '^236$'
  },
  pci_dss: ['10.2.5'],
  gpg13: ['3.6'],
  gdpr: ['IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7'],
  tsc: ['CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Initial Access'],
    id: ['T1078'],
    technique: ['Valid Accounts']
  },
  groups: ['authentication_success', 'syslog', 'sonicwall'],
  description: 'SonicWall: Firewall administrator login.'
}, {
  filename: '0080-sonicwall_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 4851,
  level: 10,
  status: 'enabled',
  details: {
    frequency: '8',
    timeframe: '120',
    ignore: '60',
    if_matched_sid: '4803'
  },
  pci_dss: ['10.6.1'],
  gpg13: ['3.5'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6'],
  tsc: ['CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Impact'],
    id: ['T1499'],
    technique: ['Endpoint Denial of Service']
  },
  groups: ['service_availability', 'syslog', 'sonicwall'],
  description: 'SonicWall: Multiple firewall error messages.'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5103,
  level: 9,
  status: 'enabled',
  details: {
    if_sid: '5100',
    match: 'Oversized packet received from'
  },
  gdpr: ['IV_35.7.d'],
  mitre: {
    tactic: ['Impact'],
    id: ['T1499'],
    technique: ['Endpoint Denial of Service']
  },
  groups: ['syslog', 'linuxkernel'],
  description: 'Error message from the kernel. Ping of death attack.'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5104,
  level: 8,
  status: 'enabled',
  details: {
    if_sid: '5100',
    regex: ['Promiscuous mode enabled|', 'device S+ entered promiscuous mode']
  },
  pci_dss: ['10.6.1', '11.4'],
  gpg13: ['4.13'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6', 'SI.4'],
  tsc: ['CC7.2', 'CC7.3', 'CC6.1', 'CC6.8'],
  mitre: {
    tactic: ['Discovery'],
    id: ['T1040'],
    technique: ['Network Sniffing']
  },
  groups: ['promisc', 'syslog', 'linuxkernel'],
  description: 'Interface entered in promiscuous(sniffing) mode.'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5108,
  level: 12,
  status: 'enabled',
  details: {
    if_sid: '5100',
    match: 'Out of Memory: '
  },
  pci_dss: ['10.6.1'],
  gpg13: ['4.12'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6'],
  tsc: ['CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Impact'],
    id: ['T1499'],
    technique: ['Endpoint Denial of Service']
  },
  groups: ['service_availability', 'syslog', 'linuxkernel'],
  description: 'System running out of memory. Availability of the system is in risk.'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5113,
  level: 7,
  status: 'enabled',
  details: {
    if_sid: '5100',
    match: 'Kernel log daemon terminating'
  },
  pci_dss: ['10.6.1'],
  gpg13: ['4.14'],
  gdpr: ['IV_35.7.d'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.6'],
  tsc: ['CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Impact'],
    id: ['T1529'],
    technique: ['System Shutdown/Reboot']
  },
  groups: ['system_shutdown', 'syslog', 'linuxkernel'],
  description: 'System is shutting down.'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5132,
  level: 11,
  status: 'enabled',
  details: {
    if_sid: '5100',
    match: 'module verification failed'
  },
  mitre: {
    tactic: ['Persistence'],
    id: ['T1215'],
    technique: ['Kernel Modules and Extensions']
  },
  groups: ['syslog', 'linuxkernel'],
  description: 'Unsigned kernel module was loaded'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5133,
  level: 11,
  status: 'enabled',
  details: {
    if_sid: '5100',
    match: 'PKCS#7 signature not signed with a trusted key'
  },
  mitre: {
    tactic: ['Persistence'],
    id: ['T1215'],
    technique: ['Kernel Modules and Extensions']
  },
  groups: ['syslog', 'linuxkernel'],
  description: 'Signed but untrusted kernel module was loaded'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5302,
  level: 9,
  status: 'enabled',
  details: {
    if_sid: '5301',
    user: '^root'
  },
  pci_dss: ['10.2.4', '10.2.5'],
  gpg13: ['7.8'],
  gdpr: ['IV_35.7.d', 'IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3', 'CC7.4'],
  mitre: {
    tactic: ['Privilege Escalation'],
    id: ['T1169'],
    technique: ['Sudo']
  },
  groups: ['authentication_failed', 'syslog', 'su'],
  description: 'User missed the password to change UID to root.'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5303,
  level: 3,
  status: 'enabled',
  details: {
    if_sid: '5300',
    regex: ["session opened for user root|^'su root'|", '^+ S+ S+proot$|^S+ to root on|^SU S+ S+ + S+ S+-root$']
  },
  pci_dss: ['10.2.5'],
  gpg13: ['7.6', '7.8', '7.9'],
  gdpr: ['IV_35.7.d', 'IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7'],
  tsc: ['CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Initial Access'],
    id: ['T1078'],
    technique: ['Valid Accounts']
  },
  groups: ['authentication_success', 'syslog', 'su'],
  description: 'User successfully changed UID to root.'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5304,
  level: 3,
  status: 'enabled',
  details: {
    if_sid: '5300',
    regex: ['session opened for user|succeeded for|', '^+|^S+ to |^SU S+ S+ + ']
  },
  pci_dss: ['10.2.5'],
  gpg13: ['7.6', '7.8'],
  gdpr: ['IV_35.7.d', 'IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7'],
  tsc: ['CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Initial Access'],
    id: ['T1078'],
    technique: ['Valid Accounts']
  },
  groups: ['authentication_success', 'syslog', 'su'],
  description: 'User successfully changed UID.'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5401,
  level: 5,
  status: 'enabled',
  details: {
    if_sid: '5400',
    match: 'incorrect password attempt'
  },
  pci_dss: ['10.2.4', '10.2.5'],
  gpg13: ['7.8'],
  gdpr: ['IV_35.7.d', 'IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Privilege Escalation'],
    id: ['T1169'],
    technique: ['Sudo']
  },
  groups: ['syslog', 'sudo'],
  description: 'Failed attempt to run sudo.'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5402,
  level: 3,
  status: 'enabled',
  details: {
    if_sid: '5400',
    regex: ' ; USER=root ; COMMAND=| ; USER=root ; TSID=S+ ; COMMAND='
  },
  pci_dss: ['10.2.5', '10.2.2'],
  gpg13: ['7.6', '7.8', '7.13'],
  gdpr: ['IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7', 'AC.6'],
  tsc: ['CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Privilege Escalation'],
    id: ['T1169'],
    technique: ['Sudo']
  },
  groups: ['syslog', 'sudo'],
  description: 'Successful sudo to ROOT executed.'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5403,
  level: 4,
  status: 'enabled',
  details: {
    if_sid: '5400',
    if_fts: ''
  },
  mitre: {
    tactic: ['Privilege Escalation'],
    id: ['T1169'],
    technique: ['Sudo']
  },
  groups: ['syslog', 'sudo'],
  description: 'First time user executed sudo.'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5404,
  level: 10,
  status: 'enabled',
  details: {
    if_sid: '5401',
    match: '3 incorrect password attempts'
  },
  pci_dss: ['10.2.4', '10.2.5'],
  gpg13: ['7.8'],
  gdpr: ['IV_35.7.d', 'IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Privilege Escalation'],
    id: ['T1169'],
    technique: ['Sudo']
  },
  groups: ['syslog', 'sudo'],
  description: 'Three failed attempts to run sudo'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5405,
  level: 5,
  status: 'enabled',
  details: {
    if_sid: '5400',
    match: 'user NOT in sudoers'
  },
  pci_dss: ['10.2.2', '10.2.5'],
  gpg13: ['7.8'],
  gdpr: ['IV_35.7.d', 'IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.6', 'AC.7'],
  tsc: ['CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Privilege Escalation'],
    id: ['T1169'],
    technique: ['Sudo']
  },
  groups: ['syslog', 'sudo'],
  description: 'Unauthorized user attempted to use sudo.'
}, {
  filename: '0020-syslog_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5407,
  level: 3,
  status: 'enabled',
  details: {
    if_sid: '5400',
    regex: ' ; USER=S+ ; COMMAND=| ; USER=S+ ; TSID=S+ ; COMMAND='
  },
  pci_dss: ['10.2.5', '10.2.2'],
  gpg13: ['7.6', '7.8', '7.13'],
  gdpr: ['IV_32.2'],
  tsc: ['CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Privilege Escalation'],
    id: ['T1169'],
    technique: ['Sudo']
  },
  groups: ['syslog', 'sudo'],
  description: 'Successful sudo executed.'
}, {
  filename: '0085-pam_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5501,
  level: 3,
  status: 'enabled',
  details: {
    if_sid: '5500',
    match: 'session opened for user '
  },
  pci_dss: ['10.2.5'],
  gpg13: ['7.8', '7.9'],
  gdpr: ['IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7'],
  tsc: ['CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Initial Access'],
    id: ['T1078'],
    technique: ['Valid Accounts']
  },
  groups: ['authentication_success', 'pam', 'syslog'],
  description: 'PAM: Login session opened.'
}, {
  filename: '0085-pam_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5551,
  level: 10,
  status: 'enabled',
  details: {
    frequency: '8',
    timeframe: '180',
    if_matched_sid: '5503',
    same_source_ip: ''
  },
  pci_dss: ['10.2.4', '10.2.5', '11.4'],
  gpg13: ['7.8'],
  gdpr: ['IV_35.7.d', 'IV_32.2'],
  hipaa: ['164.312.b'],
  nist_800_53: ['AU.14', 'AC.7', 'SI.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Credential Access'],
    id: ['T1110'],
    technique: ['Brute Force']
  },
  groups: ['authentication_failures', 'pam', 'syslog'],
  description: 'PAM: Multiple failed logins in a small period of time.'
}, {
  filename: '0090-telnetd_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5601,
  level: 5,
  status: 'enabled',
  details: {
    if_sid: '5600',
    match: 'refused connect from '
  },
  gdpr: ['IV_35.7.d'],
  mitre: {
    tactic: ['Command and Control'],
    id: ['T1095'],
    technique: ['Standard Non-Application Layer Protocol']
  },
  groups: ['syslog', 'telnetd'],
  description: 'telnetd: Connection refused by TCP Wrappers.'
}, {
  filename: '0090-telnetd_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5631,
  level: 10,
  status: 'enabled',
  details: {
    frequency: '6',
    timeframe: '120',
    if_matched_sid: '5602',
    same_source_ip: ''
  },
  gdpr: ['IV_35.7.d', 'IV_32.2'],
  mitre: {
    tactic: ['Credential Access'],
    id: ['T1110'],
    technique: ['Brute Force']
  },
  groups: ['syslog', 'telnetd'],
  description: 'telnetd: Multiple connection attempts from same source (possible scan).'
}, {
  filename: '0095-sshd_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5701,
  level: 8,
  status: 'enabled',
  details: {
    if_sid: '5700',
    match: 'Bad protocol version identification'
  },
  pci_dss: ['11.4'],
  gpg13: ['4.12'],
  gdpr: ['IV_35.7.d'],
  nist_800_53: ['SI.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Initial Access'],
    id: ['T1190'],
    technique: ['Exploit Public-Facing Application']
  },
  groups: ['recon', 'syslog', 'sshd'],
  description: 'sshd: Possible attack on the ssh server (or version gathering).'
}, {
  filename: '0095-sshd_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5703,
  level: 10,
  status: 'enabled',
  details: {
    frequency: '6',
    timeframe: '360',
    if_matched_sid: '5702',
    same_source_ip: ''
  },
  pci_dss: ['11.4'],
  gpg13: ['4.12'],
  gdpr: ['IV_35.7.d'],
  nist_800_53: ['SI.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Credential Access'],
    id: ['T1110'],
    technique: ['Brute Force']
  },
  groups: ['syslog', 'sshd'],
  description: 'sshd: Possible breakin attempt (high number of reverse lookup errors).'
}, {
  filename: '0095-sshd_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5705,
  level: 10,
  status: 'enabled',
  details: {
    frequency: '6',
    timeframe: '360',
    if_matched_sid: '5704'
  },
  pci_dss: ['11.4'],
  gpg13: ['4.12'],
  gdpr: ['IV_35.7.d'],
  nist_800_53: ['SI.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Initial Access', 'Credential Access'],
    id: ['T1190', 'T1110'],
    technique: ['Exploit Public-Facing Application', 'Brute Force']
  },
  groups: ['syslog', 'sshd'],
  description: 'sshd: Possible scan or breakin attempt (high number of login timeouts).'
}, {
  filename: '0095-sshd_rules.xml',
  relative_dirname: 'ruleset/rules',
  id: 5706,
  level: 6,
  status: 'enabled',
  details: {
    if_sid: '5700',
    match: 'Did not receive identification string from'
  },
  pci_dss: ['11.4'],
  gpg13: ['4.12'],
  gdpr: ['IV_35.7.d'],
  nist_800_53: ['SI.4'],
  tsc: ['CC6.1', 'CC6.8', 'CC7.2', 'CC7.3'],
  mitre: {
    tactic: ['Command and Control'],
    id: ['T1043'],
    technique: ['Commonly Used Port']
  },
  groups: ['recon', 'syslog', 'sshd'],
  description: 'sshd: insecure connection attempt (scan).'
}];
const arrayLocation = exports.arrayLocation = ['EventChannel', '/var/log/auth.log', '/var/log/secure'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhcnJheU1pdHJlUnVsZXMiLCJleHBvcnRzIiwiZmlsZW5hbWUiLCJyZWxhdGl2ZV9kaXJuYW1lIiwiaWQiLCJsZXZlbCIsInN0YXR1cyIsImRldGFpbHMiLCJpZl9zaWQiLCJtYXRjaCIsInBjaV9kc3MiLCJncGcxMyIsImdkcHIiLCJoaXBhYSIsIm5pc3RfODAwXzUzIiwidHNjIiwibWl0cmUiLCJ0YWN0aWMiLCJ0ZWNobmlxdWUiLCJncm91cHMiLCJkZXNjcmlwdGlvbiIsImNhdGVnb3J5IiwiZGVjb2RlZF9hcyIsImhvc3RuYW1lIiwibWF4c2l6ZSIsIm5vYWxlcnQiLCJyZWdleCIsImdyb3VwIiwiZnJlcXVlbmN5IiwidGltZWZyYW1lIiwiaWZfbWF0Y2hlZF9zaWQiLCJzYW1lX3NvdXJjZV9pcCIsImlnbm9yZSIsInVzZXIiLCJpZl9mdHMiLCJhcnJheUxvY2F0aW9uIl0sInNvdXJjZXMiOlsibWl0cmUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFdhenVoIGFwcCAtIE1pdHJlIHNhbXBsZSBhbGVydHNcbiAqIENvcHlyaWdodCAoQykgMjAxNS0yMDIyIFdhenVoLCBJbmMuXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU7IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uOyBlaXRoZXIgdmVyc2lvbiAyIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBGaW5kIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhpcyBvbiB0aGUgTElDRU5TRSBmaWxlLlxuICovXG5cbi8vIE1pdHJlXG5leHBvcnQgY29uc3QgYXJyYXlNaXRyZVJ1bGVzID0gW1xuICB7XG4gICAgZmlsZW5hbWU6ICcwMDE1LW9zc2VjX3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiA1MDQsXG4gICAgbGV2ZWw6IDMsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBpZl9zaWQ6ICc1MDAnLCBtYXRjaDogJ0FnZW50IGRpc2Nvbm5lY3RlZCcgfSxcbiAgICBwY2lfZHNzOiBbJzEwLjYuMScsICcxMC4yLjYnXSxcbiAgICBncGcxMzogWycxMC4xJ10sXG4gICAgZ2RwcjogWydJVl8zNS43LmQnXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydBVS42JywgJ0FVLjE0JywgJ0FVLjUnXSxcbiAgICB0c2M6IFsnQ0M3LjInLCAnQ0M3LjMnLCAnQ0M2LjgnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnRGVmZW5zZSBFdmFzaW9uJ10sIGlkOiBbJ1QxMDg5J10sIHRlY2huaXF1ZTogWydEaXNhYmxpbmcgU2VjdXJpdHkgVG9vbHMnXSB9LFxuICAgIGdyb3VwczogWyd3YXp1aCddLFxuICAgIGRlc2NyaXB0aW9uOiAnT3NzZWMgYWdlbnQgZGlzY29ubmVjdGVkLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMTUtb3NzZWNfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDUwNSxcbiAgICBsZXZlbDogMyxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGlmX3NpZDogJzUwMCcsIG1hdGNoOiAnQWdlbnQgcmVtb3ZlZCcgfSxcbiAgICBwY2lfZHNzOiBbJzEwLjYuMScsICcxMC4yLjYnXSxcbiAgICBncGcxMzogWycxMC4xJ10sXG4gICAgZ2RwcjogWydJVl8zNS43LmQnXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydBVS42JywgJ0FVLjE0JywgJ0FVLjUnXSxcbiAgICB0c2M6IFsnQ0M3LjInLCAnQ0M3LjMnLCAnQ0M2LjgnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnRGVmZW5zZSBFdmFzaW9uJ10sIGlkOiBbJ1QxMDg5J10sIHRlY2huaXF1ZTogWydEaXNhYmxpbmcgU2VjdXJpdHkgVG9vbHMnXSB9LFxuICAgIGdyb3VwczogWyd3YXp1aCddLFxuICAgIGRlc2NyaXB0aW9uOiAnT3NzZWMgYWdlbnQgcmVtb3ZlZC4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDE1LW9zc2VjX3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiA1MTgsXG4gICAgbGV2ZWw6IDksXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBpZl9zaWQ6ICc1MTQnLCBtYXRjaDogJ0Fkd2FyZXxTcHl3YXJlJyB9LFxuICAgIGdwZzEzOiBbJzQuMiddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJ10sXG4gICAgbWl0cmU6IHtcbiAgICAgIHRhY3RpYzogWydMYXRlcmFsIE1vdmVtZW50J10sXG4gICAgICBpZDogWydUMTAxNyddLFxuICAgICAgdGVjaG5pcXVlOiBbJ0FwcGxpY2F0aW9uIERlcGxveW1lbnQgU29mdHdhcmUnXSxcbiAgICB9LFxuICAgIGdyb3VwczogWydyb290Y2hlY2snLCAnd2F6dWgnXSxcbiAgICBkZXNjcmlwdGlvbjogJ1dpbmRvd3MgQWR3YXJlL1NweXdhcmUgYXBwbGljYXRpb24gZm91bmQuJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDAxNS1vc3NlY19ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogNTUwLFxuICAgIGxldmVsOiA3LFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgY2F0ZWdvcnk6ICd3YXp1aCcsIGRlY29kZWRfYXM6ICdzeXNjaGVja19pbnRlZ3JpdHlfY2hhbmdlZCcgfSxcbiAgICBwY2lfZHNzOiBbJzExLjUnXSxcbiAgICBncGcxMzogWyc0LjExJ10sXG4gICAgZ2RwcjogWydJSV81LjEuZiddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYy4xJywgJzE2NC4zMTIuYy4yJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnU0kuNyddLFxuICAgIHRzYzogWydQSTEuNCcsICdQSTEuNScsICdDQzYuMScsICdDQzYuOCcsICdDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydJbXBhY3QnXSwgaWQ6IFsnVDE0OTInXSwgdGVjaG5pcXVlOiBbJ1N0b3JlZCBEYXRhIE1hbmlwdWxhdGlvbiddIH0sXG4gICAgZ3JvdXBzOiBbJ3N5c2NoZWNrJywgJ3dhenVoJ10sXG4gICAgZGVzY3JpcHRpb246ICdJbnRlZ3JpdHkgY2hlY2tzdW0gY2hhbmdlZC4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDE1LW9zc2VjX3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiA1NTMsXG4gICAgbGV2ZWw6IDcsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBjYXRlZ29yeTogJ3dhenVoJywgZGVjb2RlZF9hczogJ3N5c2NoZWNrX2RlbGV0ZWQnIH0sXG4gICAgcGNpX2RzczogWycxMS41J10sXG4gICAgZ3BnMTM6IFsnNC4xMSddLFxuICAgIGdkcHI6IFsnSUlfNS4xLmYnXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmMuMScsICcxNjQuMzEyLmMuMiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ1NJLjcnXSxcbiAgICB0c2M6IFsnUEkxLjQnLCAnUEkxLjUnLCAnQ0M2LjEnLCAnQ0M2LjgnLCAnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZToge1xuICAgICAgdGFjdGljOiBbJ0RlZmVuc2UgRXZhc2lvbicsICdJbXBhY3QnXSxcbiAgICAgIGlkOiBbJ1QxMTA3JywgJ1QxNDg1J10sXG4gICAgICB0ZWNobmlxdWU6IFsnRmlsZSBEZWxldGlvbicsICdEYXRhIERlc3RydWN0aW9uJ10sXG4gICAgfSxcbiAgICBncm91cHM6IFsnc3lzY2hlY2snLCAnd2F6dWgnXSxcbiAgICBkZXNjcmlwdGlvbjogJ0ZpbGUgZGVsZXRlZC4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDE1LW9zc2VjX3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiA1OTIsXG4gICAgbGV2ZWw6IDgsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBpZl9zaWQ6ICc1MDAnLCBtYXRjaDogJ15vc3NlYzogRmlsZSBzaXplIHJlZHVjZWQnIH0sXG4gICAgcGNpX2RzczogWycxMC41LjInLCAnMTEuNCddLFxuICAgIGdwZzEzOiBbJzEwLjEnXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjknLCAnU0kuNCddLFxuICAgIHRzYzogWydDQzYuMScsICdDQzcuMicsICdDQzcuMycsICdDQzYuOCddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydJbXBhY3QnXSwgaWQ6IFsnVDE0OTInXSwgdGVjaG5pcXVlOiBbJ1N0b3JlZCBEYXRhIE1hbmlwdWxhdGlvbiddIH0sXG4gICAgZ3JvdXBzOiBbJ2F0dGFja3MnLCAnd2F6dWgnXSxcbiAgICBkZXNjcmlwdGlvbjogJ0xvZyBmaWxlIHNpemUgcmVkdWNlZC4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDE1LW9zc2VjX3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiA1OTMsXG4gICAgbGV2ZWw6IDksXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBpZl9zaWQ6ICc1MDAnLCBtYXRjaDogJ15vc3NlYzogRXZlbnQgbG9nIGNsZWFyZWQnIH0sXG4gICAgcGNpX2RzczogWycxMC41LjInXSxcbiAgICBncGcxMzogWycxMC4xJ10sXG4gICAgZ2RwcjogWydJSV81LjEuZicsICdJVl8zNS43LmQnXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydBVS45J10sXG4gICAgdHNjOiBbJ0NDNi4xJywgJ0NDNy4yJywgJ0NDNy4zJ10sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ0RlZmVuc2UgRXZhc2lvbiddLCBpZDogWydUMTA3MCddLCB0ZWNobmlxdWU6IFsnSW5kaWNhdG9yIFJlbW92YWwgb24gSG9zdCddIH0sXG4gICAgZ3JvdXBzOiBbJ2xvZ3NfY2xlYXJlZCcsICd3YXp1aCddLFxuICAgIGRlc2NyaXB0aW9uOiAnTWljcm9zb2Z0IEV2ZW50IGxvZyBjbGVhcmVkLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMTUtb3NzZWNfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDU5NCxcbiAgICBsZXZlbDogNSxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGNhdGVnb3J5OiAnd2F6dWgnLCBpZl9zaWQ6ICc1NTAnLCBob3N0bmFtZTogJ3N5c2NoZWNrLXJlZ2lzdHJ5JyB9LFxuICAgIHBjaV9kc3M6IFsnMTEuNSddLFxuICAgIGdwZzEzOiBbJzQuMTMnXSxcbiAgICBnZHByOiBbJ0lJXzUuMS5mJ10sXG4gICAgaGlwYWE6IFsnMTY0LjMxMi5jLjEnLCAnMTY0LjMxMi5jLjInXSxcbiAgICBuaXN0XzgwMF81MzogWydTSS43J10sXG4gICAgdHNjOiBbJ1BJMS40JywgJ1BJMS41JywgJ0NDNi4xJywgJ0NDNi44JywgJ0NDNy4yJywgJ0NDNy4zJ10sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ0ltcGFjdCddLCBpZDogWydUMTQ5MiddLCB0ZWNobmlxdWU6IFsnU3RvcmVkIERhdGEgTWFuaXB1bGF0aW9uJ10gfSxcbiAgICBncm91cHM6IFsnc3lzY2hlY2snLCAnd2F6dWgnXSxcbiAgICBkZXNjcmlwdGlvbjogJ1JlZ2lzdHJ5IEludGVncml0eSBDaGVja3N1bSBDaGFuZ2VkJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDAxNS1vc3NlY19ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogNTk3LFxuICAgIGxldmVsOiA1LFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgY2F0ZWdvcnk6ICd3YXp1aCcsIGlmX3NpZDogJzU1MycsIGhvc3RuYW1lOiAnc3lzY2hlY2stcmVnaXN0cnknIH0sXG4gICAgcGNpX2RzczogWycxMS41J10sXG4gICAgZ3BnMTM6IFsnNC4xMyddLFxuICAgIGdkcHI6IFsnSUlfNS4xLmYnXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmMuMScsICcxNjQuMzEyLmMuMiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ1NJLjcnXSxcbiAgICB0c2M6IFsnUEkxLjQnLCAnUEkxLjUnLCAnQ0M2LjEnLCAnQ0M2LjgnLCAnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZToge1xuICAgICAgdGFjdGljOiBbJ0RlZmVuc2UgRXZhc2lvbicsICdJbXBhY3QnXSxcbiAgICAgIGlkOiBbJ1QxMTA3JywgJ1QxNDg1J10sXG4gICAgICB0ZWNobmlxdWU6IFsnRmlsZSBEZWxldGlvbicsICdEYXRhIERlc3RydWN0aW9uJ10sXG4gICAgfSxcbiAgICBncm91cHM6IFsnc3lzY2hlY2snLCAnd2F6dWgnXSxcbiAgICBkZXNjcmlwdGlvbjogJ1JlZ2lzdHJ5IEVudHJ5IERlbGV0ZWQuJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDAyMC1zeXNsb2dfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDEwMDMsXG4gICAgbGV2ZWw6IDEzLFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgbWF4c2l6ZTogJzEwMjUnLCBub2FsZXJ0OiAnMScgfSxcbiAgICBncGcxMzogWyc0LjMnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnSW1wYWN0J10sIGlkOiBbJ1QxNDk5J10sIHRlY2huaXF1ZTogWydFbmRwb2ludCBEZW5pYWwgb2YgU2VydmljZSddIH0sXG4gICAgZ3JvdXBzOiBbJ3N5c2xvZycsICdlcnJvcnMnXSxcbiAgICBkZXNjcmlwdGlvbjogJ05vbiBzdGFuZGFyZCBzeXNsb2cgbWVzc2FnZSAoc2l6ZSB0b28gbGFyZ2UpLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMjAtc3lzbG9nX3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiAyMzAxLFxuICAgIGxldmVsOiAxMCxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IG1hdGNoOiAnXkRlYWN0aXZhdGluZyBzZXJ2aWNlICcgfSxcbiAgICBwY2lfZHNzOiBbJzEwLjYuMSddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJ10sXG4gICAgaGlwYWE6IFsnMTY0LjMxMi5iJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnQVUuNiddLFxuICAgIHRzYzogWydDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydJbXBhY3QnXSwgaWQ6IFsnVDE0OTknXSwgdGVjaG5pcXVlOiBbJ0VuZHBvaW50IERlbmlhbCBvZiBTZXJ2aWNlJ10gfSxcbiAgICBncm91cHM6IFsnc3lzbG9nJywgJ3hpbmV0ZCddLFxuICAgIGRlc2NyaXB0aW9uOiAneGluZXRkOiBFeGNlc3NpdmUgbnVtYmVyIGNvbm5lY3Rpb25zIHRvIGEgc2VydmljZS4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDIwLXN5c2xvZ19ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogMjUwMixcbiAgICBsZXZlbDogMTAsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBtYXRjaDogJ21vcmUgYXV0aGVudGljYXRpb24gZmFpbHVyZXM7fFJFUEVBVEVEIGxvZ2luIGZhaWx1cmVzJyB9LFxuICAgIHBjaV9kc3M6IFsnMTAuMi40JywgJzEwLjIuNSddLFxuICAgIGdwZzEzOiBbJzcuOCddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJywgJ0lWXzMyLjInXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydBVS4xNCcsICdBQy43J10sXG4gICAgdHNjOiBbJ0NDNi4xJywgJ0NDNi44JywgJ0NDNy4yJywgJ0NDNy4zJ10sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ0NyZWRlbnRpYWwgQWNjZXNzJ10sIGlkOiBbJ1QxMTEwJ10sIHRlY2huaXF1ZTogWydCcnV0ZSBGb3JjZSddIH0sXG4gICAgZ3JvdXBzOiBbJ2F1dGhlbnRpY2F0aW9uX2ZhaWxlZCcsICdzeXNsb2cnLCAnYWNjZXNzX2NvbnRyb2wnXSxcbiAgICBkZXNjcmlwdGlvbjogJ3N5c2xvZzogVXNlciBtaXNzZWQgdGhlIHBhc3N3b3JkIG1vcmUgdGhhbiBvbmUgdGltZScsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMjAtc3lzbG9nX3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiAyNTAzLFxuICAgIGxldmVsOiA1LFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHtcbiAgICAgIHJlZ2V4OiBbXG4gICAgICAgICdecmVmdXNlZCBjb25uZWN0IGZyb218JyxcbiAgICAgICAgJ15saWJ3cmFwIHJlZnVzZWQgY29ubmVjdGlvbnwnLFxuICAgICAgICAnQ29ubmVjdGlvbiBmcm9tIFMrIGRlbmllZCcsXG4gICAgICBdLFxuICAgIH0sXG4gICAgcGNpX2RzczogWycxMC4yLjQnXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjE0JywgJ0FDLjcnXSxcbiAgICB0c2M6IFsnQ0M2LjEnLCAnQ0M2LjgnLCAnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZToge1xuICAgICAgdGFjdGljOiBbJ0NvbW1hbmQgYW5kIENvbnRyb2wnXSxcbiAgICAgIGlkOiBbJ1QxMDk1J10sXG4gICAgICB0ZWNobmlxdWU6IFsnU3RhbmRhcmQgTm9uLUFwcGxpY2F0aW9uIExheWVyIFByb3RvY29sJ10sXG4gICAgfSxcbiAgICBncm91cHM6IFsnYWNjZXNzX2RlbmllZCcsICdzeXNsb2cnLCAnYWNjZXNzX2NvbnRyb2wnXSxcbiAgICBkZXNjcmlwdGlvbjogJ3N5c2xvZzogQ29ubmVjdGlvbiBibG9ja2VkIGJ5IFRjcCBXcmFwcGVycy4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDIwLXN5c2xvZ19ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogMjUwNCxcbiAgICBsZXZlbDogOSxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IG1hdGNoOiAnSUxMRUdBTCBST09UIExPR0lOfFJPT1QgTE9HSU4gUkVGVVNFRCcgfSxcbiAgICBwY2lfZHNzOiBbJzEwLjIuNCcsICcxMC4yLjUnLCAnMTAuMi4yJ10sXG4gICAgZ3BnMTM6IFsnNy44J10sXG4gICAgZ2RwcjogWydJVl8zNS43LmQnLCAnSVZfMzIuMiddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjE0JywgJ0FDLjcnLCAnQUMuNiddLFxuICAgIHRzYzogWydDQzYuMScsICdDQzYuOCcsICdDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydQcml2aWxlZ2UgRXNjYWxhdGlvbiddLCBpZDogWydUMTE2OSddLCB0ZWNobmlxdWU6IFsnU3VkbyddIH0sXG4gICAgZ3JvdXBzOiBbJ2ludmFsaWRfbG9naW4nLCAnc3lzbG9nJywgJ2FjY2Vzc19jb250cm9sJ10sXG4gICAgZGVzY3JpcHRpb246ICdzeXNsb2c6IElsbGVnYWwgcm9vdCBsb2dpbi4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDIwLXN5c2xvZ19ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogMjU1MSxcbiAgICBsZXZlbDogMTAsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBpZl9zaWQ6ICcyNTUwJywgcmVnZXg6ICdeQ29ubmVjdGlvbiBmcm9tIFMrIG9uIGlsbGVnYWwgcG9ydCQnIH0sXG4gICAgcGNpX2RzczogWycxMC42LjEnXSxcbiAgICBncGcxMzogWyc3LjEnXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjYnXSxcbiAgICB0c2M6IFsnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnRGlzY292ZXJ5J10sIGlkOiBbJ1QxMDQ2J10sIHRlY2huaXF1ZTogWydOZXR3b3JrIFNlcnZpY2UgU2Nhbm5pbmcnXSB9LFxuICAgIGdyb3VwczogWydjb25uZWN0aW9uX2F0dGVtcHQnLCAnc3lzbG9nJywgJ2FjY2Vzc19jb250cm9sJ10sXG4gICAgZGVzY3JpcHRpb246ICdDb25uZWN0aW9uIHRvIHJzaGQgZnJvbSB1bnByaXZpbGVnZWQgcG9ydC4gUG9zc2libGUgbmV0d29yayBzY2FuLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMjAtc3lzbG9nX3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiAyODMzLFxuICAgIGxldmVsOiA4LFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgaWZfc2lkOiAnMjgzMicsIG1hdGNoOiAnXihyb290KScgfSxcbiAgICBwY2lfZHNzOiBbJzEwLjIuNycsICcxMC42LjEnLCAnMTAuMi4yJ10sXG4gICAgZ3BnMTM6IFsnNC4xMyddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJywgJ0lWXzMyLjInXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydBVS4xNCcsICdBVS42JywgJ0FDLjYnXSxcbiAgICB0c2M6IFsnQ0M2LjgnLCAnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnUHJpdmlsZWdlIEVzY2FsYXRpb24nXSwgaWQ6IFsnVDExNjknXSwgdGVjaG5pcXVlOiBbJ1N1ZG8nXSB9LFxuICAgIGdyb3VwczogWydzeXNsb2cnLCAnY3JvbiddLFxuICAgIGRlc2NyaXB0aW9uOiBcIlJvb3QncyBjcm9udGFiIGVudHJ5IGNoYW5nZWQuXCIsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMjAtc3lzbG9nX3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiAyOTYwLFxuICAgIGxldmVsOiAyLFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgZGVjb2RlZF9hczogJ2dwYXNzd2QnLCBtYXRjaDogJ2FkZGVkIGJ5JyB9LFxuICAgIGdwZzEzOiBbJzcuOScsICc0LjEzJ10sXG4gICAgZ2RwcjogWydJVl8zMi4yJ10sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ1BlcnNpc3RlbmNlJ10sIGlkOiBbJ1QxMTM2J10sIHRlY2huaXF1ZTogWydDcmVhdGUgQWNjb3VudCddIH0sXG4gICAgZ3JvdXBzOiBbJ3N5c2xvZycsICd5dW0nXSxcbiAgICBkZXNjcmlwdGlvbjogJ1VzZXIgYWRkZWQgdG8gZ3JvdXAuJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDAyMC1zeXNsb2dfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDI5NjEsXG4gICAgbGV2ZWw6IDUsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBpZl9zaWQ6ICcyOTYwJywgZ3JvdXA6ICdzdWRvJyB9LFxuICAgIGdwZzEzOiBbJzcuOScsICc0LjEzJ10sXG4gICAgZ2RwcjogWydJVl8zMi4yJ10sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ1BlcnNpc3RlbmNlJ10sIGlkOiBbJ1QxMTM2J10sIHRlY2huaXF1ZTogWydDcmVhdGUgQWNjb3VudCddIH0sXG4gICAgZ3JvdXBzOiBbJ3N5c2xvZycsICd5dW0nXSxcbiAgICBkZXNjcmlwdGlvbjogJ1VzZXIgYWRkZWQgdG8gZ3JvdXAgc3Vkby4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDIwLXN5c2xvZ19ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogMjk2NCxcbiAgICBsZXZlbDogMTAsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBmcmVxdWVuY3k6ICc0JywgdGltZWZyYW1lOiAnMzAnLCBpZl9tYXRjaGVkX3NpZDogJzI5NjMnLCBzYW1lX3NvdXJjZV9pcDogJycgfSxcbiAgICBwY2lfZHNzOiBbJzExLjQnXSxcbiAgICB0c2M6IFsnQ0M2LjEnLCAnQ0M2LjgnLCAnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnSW1wYWN0J10sIGlkOiBbJ1QxNDk5J10sIHRlY2huaXF1ZTogWydFbmRwb2ludCBEZW5pYWwgb2YgU2VydmljZSddIH0sXG4gICAgZ3JvdXBzOiBbJ3JlY29uJywgJ3N5c2xvZycsICdwZXJkaXRpb24nXSxcbiAgICBkZXNjcmlwdGlvbjogJ3BlcmRpdGlvbjogTXVsdGlwbGUgY29ubmVjdGlvbiBhdHRlbXB0cyBmcm9tIHNhbWUgc291cmNlLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMjUtc2VuZG1haWxfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDMxMDIsXG4gICAgbGV2ZWw6IDUsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBpZl9zaWQ6ICczMTAxJywgbWF0Y2g6ICdyZWplY3Q9NDUxIDQuMS44ICcgfSxcbiAgICBwY2lfZHNzOiBbJzExLjQnXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIG5pc3RfODAwXzUzOiBbJ1NJLjQnXSxcbiAgICB0c2M6IFsnQ0M2LjEnLCAnQ0M2LjgnLCAnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnQ29sbGVjdGlvbiddLCBpZDogWydUMTExNCddLCB0ZWNobmlxdWU6IFsnRW1haWwgQ29sbGVjdGlvbiddIH0sXG4gICAgZ3JvdXBzOiBbJ3NwYW0nLCAnc3lzbG9nJywgJ3NlbmRtYWlsJ10sXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnc2VuZG1haWw6IFNlbmRlciBkb21haW4gZG9lcyBub3QgaGF2ZSBhbnkgdmFsaWQgTVggcmVjb3JkIChSZXF1ZXN0ZWQgYWN0aW9uIGFib3J0ZWQpLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMjUtc2VuZG1haWxfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDMxMDMsXG4gICAgbGV2ZWw6IDYsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBpZl9zaWQ6ICczMTAxJywgbWF0Y2g6ICdyZWplY3Q9NTUwIDUuMC4wIHxyZWplY3Q9NTUzIDUuMy4wJyB9LFxuICAgIHBjaV9kc3M6IFsnMTEuNCddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnU0kuNCddLFxuICAgIHRzYzogWydDQzYuMScsICdDQzYuOCcsICdDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydDb2xsZWN0aW9uJ10sIGlkOiBbJ1QxMTE0J10sIHRlY2huaXF1ZTogWydFbWFpbCBDb2xsZWN0aW9uJ10gfSxcbiAgICBncm91cHM6IFsnc3BhbScsICdzeXNsb2cnLCAnc2VuZG1haWwnXSxcbiAgICBkZXNjcmlwdGlvbjogJ3NlbmRtYWlsOiBSZWplY3RlZCBieSBhY2Nlc3MgbGlzdCAoNTV4OiBSZXF1ZXN0ZWQgYWN0aW9uIG5vdCB0YWtlbikuJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDAyNS1zZW5kbWFpbF9ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogMzEwNCxcbiAgICBsZXZlbDogNixcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGlmX3NpZDogJzMxMDEnLCBtYXRjaDogJ3JlamVjdD01NTAgNS43LjEgJyB9LFxuICAgIHBjaV9kc3M6IFsnMTEuNCddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnU0kuNCddLFxuICAgIHRzYzogWydDQzYuMScsICdDQzYuOCcsICdDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydDb2xsZWN0aW9uJ10sIGlkOiBbJ1QxMTE0J10sIHRlY2huaXF1ZTogWydFbWFpbCBDb2xsZWN0aW9uJ10gfSxcbiAgICBncm91cHM6IFsnc3BhbScsICdzeXNsb2cnLCAnc2VuZG1haWwnXSxcbiAgICBkZXNjcmlwdGlvbjogJ3NlbmRtYWlsOiBBdHRlbXB0IHRvIHVzZSBtYWlsIHNlcnZlciBhcyByZWxheSAoNTUwOiBSZXF1ZXN0ZWQgYWN0aW9uIG5vdCB0YWtlbikuJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDAyNS1zZW5kbWFpbF9ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogMzEwNSxcbiAgICBsZXZlbDogNSxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGlmX3NpZDogJzMxMDEnLCBtYXRjaDogJ3JlamVjdD01NTMgNS4xLjggJyB9LFxuICAgIHBjaV9kc3M6IFsnMTEuNCddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnU0kuNCddLFxuICAgIHRzYzogWydDQzYuMScsICdDQzYuOCcsICdDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydDb2xsZWN0aW9uJ10sIGlkOiBbJ1QxMTE0J10sIHRlY2huaXF1ZTogWydFbWFpbCBDb2xsZWN0aW9uJ10gfSxcbiAgICBncm91cHM6IFsnc3BhbScsICdzeXNsb2cnLCAnc2VuZG1haWwnXSxcbiAgICBkZXNjcmlwdGlvbjogJ3NlbmRtYWlsOiBTZW5kZXIgZG9tYWluIGlzIG5vdCBmb3VuZCAgKDU1MzogUmVxdWVzdGVkIGFjdGlvbiBub3QgdGFrZW4pLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMjUtc2VuZG1haWxfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDMxMDYsXG4gICAgbGV2ZWw6IDUsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBpZl9zaWQ6ICczMTAxJywgbWF0Y2g6ICdyZWplY3Q9NTUzIDUuNS40ICcgfSxcbiAgICBwY2lfZHNzOiBbJzExLjQnXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIG5pc3RfODAwXzUzOiBbJ1NJLjQnXSxcbiAgICB0c2M6IFsnQ0M2LjEnLCAnQ0M2LjgnLCAnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnQ29sbGVjdGlvbiddLCBpZDogWydUMTExNCddLCB0ZWNobmlxdWU6IFsnRW1haWwgQ29sbGVjdGlvbiddIH0sXG4gICAgZ3JvdXBzOiBbJ3NwYW0nLCAnc3lzbG9nJywgJ3NlbmRtYWlsJ10sXG4gICAgZGVzY3JpcHRpb246ICdzZW5kbWFpbDogU2VuZGVyIGFkZHJlc3MgZG9lcyBub3QgaGF2ZSBkb21haW4gKDU1MzogUmVxdWVzdGVkIGFjdGlvbiBub3QgdGFrZW4pLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMjUtc2VuZG1haWxfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDMxMDgsXG4gICAgbGV2ZWw6IDYsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBpZl9zaWQ6ICczMTAwJywgbWF0Y2g6ICdyZWplY3RpbmcgY29tbWFuZHMgZnJvbScgfSxcbiAgICBwY2lfZHNzOiBbJzExLjQnXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIG5pc3RfODAwXzUzOiBbJ1NJLjQnXSxcbiAgICB0c2M6IFsnQ0M2LjEnLCAnQ0M2LjgnLCAnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnQ29sbGVjdGlvbiddLCBpZDogWydUMTExNCddLCB0ZWNobmlxdWU6IFsnRW1haWwgQ29sbGVjdGlvbiddIH0sXG4gICAgZ3JvdXBzOiBbJ3NwYW0nLCAnc3lzbG9nJywgJ3NlbmRtYWlsJ10sXG4gICAgZGVzY3JpcHRpb246ICdzZW5kbWFpbDogU2VuZG1haWwgcmVqZWN0ZWQgZHVlIHRvIHByZS1ncmVldGluZy4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDI1LXNlbmRtYWlsX3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiAzMTUxLFxuICAgIGxldmVsOiAxMCxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGZyZXF1ZW5jeTogJzgnLCB0aW1lZnJhbWU6ICcxMjAnLCBpZl9tYXRjaGVkX3NpZDogJzMxMDInLCBzYW1lX3NvdXJjZV9pcDogJycgfSxcbiAgICBwY2lfZHNzOiBbJzExLjQnXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIG5pc3RfODAwXzUzOiBbJ1NJLjQnXSxcbiAgICB0c2M6IFsnQ0M2LjEnLCAnQ0M2LjgnLCAnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZToge1xuICAgICAgdGFjdGljOiBbJ0NvbGxlY3Rpb24nLCAnSW1wYWN0J10sXG4gICAgICBpZDogWydUMTExNCcsICdUMTQ5OSddLFxuICAgICAgdGVjaG5pcXVlOiBbJ0VtYWlsIENvbGxlY3Rpb24nLCAnRW5kcG9pbnQgRGVuaWFsIG9mIFNlcnZpY2UnXSxcbiAgICB9LFxuICAgIGdyb3VwczogWydtdWx0aXBsZV9zcGFtJywgJ3N5c2xvZycsICdzZW5kbWFpbCddLFxuICAgIGRlc2NyaXB0aW9uOiAnc2VuZG1haWw6IFNlbmRlciBkb21haW4gaGFzIGJvZ3VzIE1YIHJlY29yZC4gSXQgc2hvdWxkIG5vdCBiZSBzZW5kaW5nIGUtbWFpbC4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDI1LXNlbmRtYWlsX3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiAzMTUyLFxuICAgIGxldmVsOiA2LFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgZnJlcXVlbmN5OiAnOCcsIHRpbWVmcmFtZTogJzEyMCcsIGlmX21hdGNoZWRfc2lkOiAnMzEwMycsIHNhbWVfc291cmNlX2lwOiAnJyB9LFxuICAgIHBjaV9kc3M6IFsnMTEuNCddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnU0kuNCddLFxuICAgIHRzYzogWydDQzYuMScsICdDQzYuOCcsICdDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7XG4gICAgICB0YWN0aWM6IFsnQ29sbGVjdGlvbicsICdJbXBhY3QnXSxcbiAgICAgIGlkOiBbJ1QxMTE0JywgJ1QxNDk5J10sXG4gICAgICB0ZWNobmlxdWU6IFsnRW1haWwgQ29sbGVjdGlvbicsICdFbmRwb2ludCBEZW5pYWwgb2YgU2VydmljZSddLFxuICAgIH0sXG4gICAgZ3JvdXBzOiBbJ211bHRpcGxlX3NwYW0nLCAnc3lzbG9nJywgJ3NlbmRtYWlsJ10sXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnc2VuZG1haWw6IE11bHRpcGxlIGF0dGVtcHRzIHRvIHNlbmQgZS1tYWlsIGZyb20gYSBwcmV2aW91c2x5IHJlamVjdGVkIHNlbmRlciAoYWNjZXNzKS4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDI1LXNlbmRtYWlsX3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiAzMTUzLFxuICAgIGxldmVsOiA2LFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgZnJlcXVlbmN5OiAnOCcsIHRpbWVmcmFtZTogJzEyMCcsIGlmX21hdGNoZWRfc2lkOiAnMzEwNCcsIHNhbWVfc291cmNlX2lwOiAnJyB9LFxuICAgIHBjaV9kc3M6IFsnMTEuNCddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnU0kuNCddLFxuICAgIHRzYzogWydDQzYuMScsICdDQzYuOCcsICdDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7XG4gICAgICB0YWN0aWM6IFsnQ29sbGVjdGlvbicsICdJbXBhY3QnXSxcbiAgICAgIGlkOiBbJ1QxMTE0JywgJ1QxNDk5J10sXG4gICAgICB0ZWNobmlxdWU6IFsnRW1haWwgQ29sbGVjdGlvbicsICdFbmRwb2ludCBEZW5pYWwgb2YgU2VydmljZSddLFxuICAgIH0sXG4gICAgZ3JvdXBzOiBbJ211bHRpcGxlX3NwYW0nLCAnc3lzbG9nJywgJ3NlbmRtYWlsJ10sXG4gICAgZGVzY3JpcHRpb246ICdzZW5kbWFpbDogTXVsdGlwbGUgcmVsYXlpbmcgYXR0ZW1wdHMgb2Ygc3BhbS4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDI1LXNlbmRtYWlsX3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiAzMTU0LFxuICAgIGxldmVsOiAxMCxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGZyZXF1ZW5jeTogJzgnLCB0aW1lZnJhbWU6ICcxMjAnLCBpZl9tYXRjaGVkX3NpZDogJzMxMDUnLCBzYW1lX3NvdXJjZV9pcDogJycgfSxcbiAgICBwY2lfZHNzOiBbJzExLjQnXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIG5pc3RfODAwXzUzOiBbJ1NJLjQnXSxcbiAgICB0c2M6IFsnQ0M2LjEnLCAnQ0M2LjgnLCAnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZToge1xuICAgICAgdGFjdGljOiBbJ0NvbGxlY3Rpb24nLCAnSW1wYWN0J10sXG4gICAgICBpZDogWydUMTExNCcsICdUMTQ5OSddLFxuICAgICAgdGVjaG5pcXVlOiBbJ0VtYWlsIENvbGxlY3Rpb24nLCAnRW5kcG9pbnQgRGVuaWFsIG9mIFNlcnZpY2UnXSxcbiAgICB9LFxuICAgIGdyb3VwczogWydtdWx0aXBsZV9zcGFtJywgJ3N5c2xvZycsICdzZW5kbWFpbCddLFxuICAgIGRlc2NyaXB0aW9uOiAnc2VuZG1haWw6IE11bHRpcGxlIGF0dGVtcHRzIHRvIHNlbmQgZS1tYWlsIGZyb20gaW52YWxpZC91bmtub3duIHNlbmRlciBkb21haW4uJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDAyNS1zZW5kbWFpbF9ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogMzE1NSxcbiAgICBsZXZlbDogMTAsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBmcmVxdWVuY3k6ICc4JywgdGltZWZyYW1lOiAnMTIwJywgaWZfbWF0Y2hlZF9zaWQ6ICczMTA2Jywgc2FtZV9zb3VyY2VfaXA6ICcnIH0sXG4gICAgcGNpX2RzczogWycxMS40J10sXG4gICAgZ2RwcjogWydJVl8zNS43LmQnXSxcbiAgICBuaXN0XzgwMF81MzogWydTSS40J10sXG4gICAgdHNjOiBbJ0NDNi4xJywgJ0NDNi44JywgJ0NDNy4yJywgJ0NDNy4zJ10sXG4gICAgbWl0cmU6IHtcbiAgICAgIHRhY3RpYzogWydDb2xsZWN0aW9uJywgJ0ltcGFjdCddLFxuICAgICAgaWQ6IFsnVDExMTQnLCAnVDE0OTknXSxcbiAgICAgIHRlY2huaXF1ZTogWydFbWFpbCBDb2xsZWN0aW9uJywgJ0VuZHBvaW50IERlbmlhbCBvZiBTZXJ2aWNlJ10sXG4gICAgfSxcbiAgICBncm91cHM6IFsnbXVsdGlwbGVfc3BhbScsICdzeXNsb2cnLCAnc2VuZG1haWwnXSxcbiAgICBkZXNjcmlwdGlvbjogJ3NlbmRtYWlsOiBNdWx0aXBsZSBhdHRlbXB0cyB0byBzZW5kIGUtbWFpbCBmcm9tIGludmFsaWQvdW5rbm93biBzZW5kZXIuJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDAyNS1zZW5kbWFpbF9ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogMzE1NixcbiAgICBsZXZlbDogMTAsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBmcmVxdWVuY3k6ICcxMicsIHRpbWVmcmFtZTogJzEyMCcsIGlmX21hdGNoZWRfc2lkOiAnMzEwNycsIHNhbWVfc291cmNlX2lwOiAnJyB9LFxuICAgIHBjaV9kc3M6IFsnMTEuNCddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnU0kuNCddLFxuICAgIHRzYzogWydDQzYuMScsICdDQzYuOCcsICdDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7XG4gICAgICB0YWN0aWM6IFsnQ29sbGVjdGlvbicsICdJbXBhY3QnXSxcbiAgICAgIGlkOiBbJ1QxMTE0JywgJ1QxNDk5J10sXG4gICAgICB0ZWNobmlxdWU6IFsnRW1haWwgQ29sbGVjdGlvbicsICdFbmRwb2ludCBEZW5pYWwgb2YgU2VydmljZSddLFxuICAgIH0sXG4gICAgZ3JvdXBzOiBbJ211bHRpcGxlX3NwYW0nLCAnc3lzbG9nJywgJ3NlbmRtYWlsJ10sXG4gICAgZGVzY3JpcHRpb246ICdzZW5kbWFpbDogTXVsdGlwbGUgcmVqZWN0ZWQgZS1tYWlscyBmcm9tIHNhbWUgc291cmNlIGlwLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMjUtc2VuZG1haWxfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDMxNTgsXG4gICAgbGV2ZWw6IDEwLFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgZnJlcXVlbmN5OiAnOCcsIHRpbWVmcmFtZTogJzEyMCcsIGlmX21hdGNoZWRfc2lkOiAnMzEwOCcsIHNhbWVfc291cmNlX2lwOiAnJyB9LFxuICAgIHBjaV9kc3M6IFsnMTEuNCddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnU0kuNCddLFxuICAgIHRzYzogWydDQzYuMScsICdDQzYuOCcsICdDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7XG4gICAgICB0YWN0aWM6IFsnQ29sbGVjdGlvbicsICdJbXBhY3QnXSxcbiAgICAgIGlkOiBbJ1QxMTE0JywgJ1QxNDk5J10sXG4gICAgICB0ZWNobmlxdWU6IFsnRW1haWwgQ29sbGVjdGlvbicsICdFbmRwb2ludCBEZW5pYWwgb2YgU2VydmljZSddLFxuICAgIH0sXG4gICAgZ3JvdXBzOiBbJ211bHRpcGxlX3NwYW0nLCAnc3lzbG9nJywgJ3NlbmRtYWlsJ10sXG4gICAgZGVzY3JpcHRpb246ICdzZW5kbWFpbDogTXVsdGlwbGUgcHJlLWdyZWV0aW5ncyByZWplY3RzLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMjUtc2VuZG1haWxfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDMxOTEsXG4gICAgbGV2ZWw6IDYsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBpZl9zaWQ6ICczMTkwJywgbWF0Y2g6ICdec2VuZGVyIGNoZWNrIGZhaWxlZHxec2VuZGVyIGNoZWNrIHRlbXBmYWlsZWQnIH0sXG4gICAgcGNpX2RzczogWycxMS40J10sXG4gICAgZ2RwcjogWydJVl8zNS43LmQnXSxcbiAgICBuaXN0XzgwMF81MzogWydTSS40J10sXG4gICAgdHNjOiBbJ0NDNi4xJywgJ0NDNi44JywgJ0NDNy4yJywgJ0NDNy4zJ10sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ0NvbGxlY3Rpb24nXSwgaWQ6IFsnVDExMTQnXSwgdGVjaG5pcXVlOiBbJ0VtYWlsIENvbGxlY3Rpb24nXSB9LFxuICAgIGdyb3VwczogWydzbWYtc2F2JywgJ3NwYW0nLCAnc3lzbG9nJywgJ3NlbmRtYWlsJ10sXG4gICAgZGVzY3JpcHRpb246ICdzZW5kbWFpbDogU01GLVNBViBzZW5kbWFpbCBtaWx0ZXIgdW5hYmxlIHRvIHZlcmlmeSBhZGRyZXNzIChSRUpFQ1RFRCkuJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDAzMC1wb3N0Zml4X3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiAzMzAxLFxuICAgIGxldmVsOiA2LFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgaWZfc2lkOiAnMzMwMCcsIGlkOiAnXjU1NCQnIH0sXG4gICAgcGNpX2RzczogWycxMC42LjEnLCAnMTEuNCddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJ10sXG4gICAgaGlwYWE6IFsnMTY0LjMxMi5iJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnQVUuNicsICdTSS40J10sXG4gICAgdHNjOiBbJ0NDNy4yJywgJ0NDNy4zJywgJ0NDNi4xJywgJ0NDNi44J10sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ0NvbGxlY3Rpb24nXSwgaWQ6IFsnVDExMTQnXSwgdGVjaG5pcXVlOiBbJ0VtYWlsIENvbGxlY3Rpb24nXSB9LFxuICAgIGdyb3VwczogWydzcGFtJywgJ3N5c2xvZycsICdwb3N0Zml4J10sXG4gICAgZGVzY3JpcHRpb246ICdQb3N0Zml4OiBBdHRlbXB0IHRvIHVzZSBtYWlsIHNlcnZlciBhcyByZWxheSAoY2xpZW50IGhvc3QgcmVqZWN0ZWQpLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMzAtcG9zdGZpeF9ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogMzMwMixcbiAgICBsZXZlbDogNixcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGlmX3NpZDogJzMzMDAnLCBpZDogJ141NTAkJyB9LFxuICAgIHBjaV9kc3M6IFsnMTAuNi4xJywgJzExLjQnXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjYnLCAnU0kuNCddLFxuICAgIHRzYzogWydDQzcuMicsICdDQzcuMycsICdDQzYuMScsICdDQzYuOCddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydDb2xsZWN0aW9uJ10sIGlkOiBbJ1QxMTE0J10sIHRlY2huaXF1ZTogWydFbWFpbCBDb2xsZWN0aW9uJ10gfSxcbiAgICBncm91cHM6IFsnc3BhbScsICdzeXNsb2cnLCAncG9zdGZpeCddLFxuICAgIGRlc2NyaXB0aW9uOiAnUG9zdGZpeDogUmVqZWN0ZWQgYnkgYWNjZXNzIGxpc3QgKFJlcXVlc3RlZCBhY3Rpb24gbm90IHRha2VuKS4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDMwLXBvc3RmaXhfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDMzMDMsXG4gICAgbGV2ZWw6IDUsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBpZl9zaWQ6ICczMzAwJywgaWQ6ICdeNDUwJCcgfSxcbiAgICBwY2lfZHNzOiBbJzEwLjYuMScsICcxMS40J10sXG4gICAgZ2RwcjogWydJVl8zNS43LmQnXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydBVS42JywgJ1NJLjQnXSxcbiAgICB0c2M6IFsnQ0M3LjInLCAnQ0M3LjMnLCAnQ0M2LjEnLCAnQ0M2LjgnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnQ29sbGVjdGlvbiddLCBpZDogWydUMTExNCddLCB0ZWNobmlxdWU6IFsnRW1haWwgQ29sbGVjdGlvbiddIH0sXG4gICAgZ3JvdXBzOiBbJ3NwYW0nLCAnc3lzbG9nJywgJ3Bvc3RmaXgnXSxcbiAgICBkZXNjcmlwdGlvbjogJ1Bvc3RmaXg6IFNlbmRlciBkb21haW4gaXMgbm90IGZvdW5kICg0NTA6IFJlcXVlc3RlZCBtYWlsIGFjdGlvbiBub3QgdGFrZW4pLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMzAtcG9zdGZpeF9ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogMzMwNCxcbiAgICBsZXZlbDogNSxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGlmX3NpZDogJzMzMDAnLCBpZDogJ141MDMkJyB9LFxuICAgIHBjaV9kc3M6IFsnMTAuNi4xJywgJzExLjQnXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjYnLCAnU0kuNCddLFxuICAgIHRzYzogWydDQzcuMicsICdDQzcuMycsICdDQzYuMScsICdDQzYuOCddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydDb2xsZWN0aW9uJ10sIGlkOiBbJ1QxMTE0J10sIHRlY2huaXF1ZTogWydFbWFpbCBDb2xsZWN0aW9uJ10gfSxcbiAgICBncm91cHM6IFsnc3BhbScsICdzeXNsb2cnLCAncG9zdGZpeCddLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1Bvc3RmaXg6IEltcHJvcGVyIHVzZSBvZiBTTVRQIGNvbW1hbmQgcGlwZWxpbmluZyAoNTAzOiBCYWQgc2VxdWVuY2Ugb2YgY29tbWFuZHMpLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMzAtcG9zdGZpeF9ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogMzMwNSxcbiAgICBsZXZlbDogNSxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGlmX3NpZDogJzMzMDAnLCBpZDogJ141MDQkJyB9LFxuICAgIHBjaV9kc3M6IFsnMTAuNi4xJywgJzExLjQnXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjYnLCAnU0kuNCddLFxuICAgIHRzYzogWydDQzcuMicsICdDQzcuMycsICdDQzYuMScsICdDQzYuOCddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydDb2xsZWN0aW9uJ10sIGlkOiBbJ1QxMTE0J10sIHRlY2huaXF1ZTogWydFbWFpbCBDb2xsZWN0aW9uJ10gfSxcbiAgICBncm91cHM6IFsnc3BhbScsICdzeXNsb2cnLCAncG9zdGZpeCddLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1Bvc3RmaXg6IFJlY2lwaWVudCBhZGRyZXNzIG11c3QgY29udGFpbiBGUUROICg1MDQ6IENvbW1hbmQgcGFyYW1ldGVyIG5vdCBpbXBsZW1lbnRlZCkuJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDAzMC1wb3N0Zml4X3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiAzMzA2LFxuICAgIGxldmVsOiA2LFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgaWZfc2lkOiAnMzMwMSwgMzMwMicsIG1hdGNoOiAnIGJsb2NrZWQgdXNpbmcgJyB9LFxuICAgIHBjaV9kc3M6IFsnMTAuNi4xJywgJzExLjQnXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjYnLCAnU0kuNCddLFxuICAgIHRzYzogWydDQzcuMicsICdDQzcuMycsICdDQzYuMScsICdDQzYuOCddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydDb2xsZWN0aW9uJ10sIGlkOiBbJ1QxMTE0J10sIHRlY2huaXF1ZTogWydFbWFpbCBDb2xsZWN0aW9uJ10gfSxcbiAgICBncm91cHM6IFsnc3BhbScsICdzeXNsb2cnLCAncG9zdGZpeCddLFxuICAgIGRlc2NyaXB0aW9uOiAnUG9zdGZpeDogSVAgQWRkcmVzcyBibGFjay1saXN0ZWQgYnkgYW50aS1zcGFtIChibG9ja2VkKS4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDMwLXBvc3RmaXhfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDMzMzAsXG4gICAgbGV2ZWw6IDEwLFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHtcbiAgICAgIGlnbm9yZTogJzI0MCcsXG4gICAgICBpZl9zaWQ6ICczMzIwJyxcbiAgICAgIG1hdGNoOiBbXG4gICAgICAgICdkZWZlciBzZXJ2aWNlIGZhaWx1cmV8UmVzb3VyY2UgdGVtcG9yYXJpbHkgdW5hdmFpbGFibGV8JyxcbiAgICAgICAgJ15mYXRhbDogdGhlIFBvc3RmaXggbWFpbCBzeXN0ZW0gaXMgbm90IHJ1bm5pbmcnLFxuICAgICAgXSxcbiAgICB9LFxuICAgIHBjaV9kc3M6IFsnMTAuNi4xJ10sXG4gICAgZ2RwcjogWydJVl8zNS43LmQnXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydBVS42J10sXG4gICAgdHNjOiBbJ0NDNy4yJywgJ0NDNy4zJ10sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ0ltcGFjdCddLCBpZDogWydUMTQ5OSddLCB0ZWNobmlxdWU6IFsnRW5kcG9pbnQgRGVuaWFsIG9mIFNlcnZpY2UnXSB9LFxuICAgIGdyb3VwczogWydzZXJ2aWNlX2F2YWlsYWJpbGl0eScsICdzeXNsb2cnLCAncG9zdGZpeCddLFxuICAgIGRlc2NyaXB0aW9uOiAnUG9zdGZpeCBwcm9jZXNzIGVycm9yLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMzAtcG9zdGZpeF9ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogMzMzNSxcbiAgICBsZXZlbDogNixcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGlmX3NpZDogJzMzMjAnLCBtYXRjaDogJ150b28gbWFueSAnIH0sXG4gICAgcGNpX2RzczogWycxMC42LjEnLCAnMTEuNCddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJ10sXG4gICAgaGlwYWE6IFsnMTY0LjMxMi5iJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnQVUuNicsICdTSS40J10sXG4gICAgdHNjOiBbJ0NDNy4yJywgJ0NDNy4zJywgJ0NDNi4xJywgJ0NDNi44J10sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ0NvbGxlY3Rpb24nXSwgaWQ6IFsnVDExMTQnXSwgdGVjaG5pcXVlOiBbJ0VtYWlsIENvbGxlY3Rpb24nXSB9LFxuICAgIGdyb3VwczogWydzcGFtJywgJ3N5c2xvZycsICdwb3N0Zml4J10sXG4gICAgZGVzY3JpcHRpb246ICdQb3N0Zml4OiB0b28gbWFueSBlcnJvcnMgYWZ0ZXIgUkNQVCBmcm9tIHVua25vd24nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDMwLXBvc3RmaXhfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDMzNTEsXG4gICAgbGV2ZWw6IDYsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczoge1xuICAgICAgZnJlcXVlbmN5OiAnJFBPU1RGSVhfRlJFUScsXG4gICAgICB0aW1lZnJhbWU6ICc5MCcsXG4gICAgICBpZl9tYXRjaGVkX3NpZDogJzMzMDEnLFxuICAgICAgc2FtZV9zb3VyY2VfaXA6ICcnLFxuICAgIH0sXG4gICAgcGNpX2RzczogWycxMC42LjEnLCAnMTEuNCddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJ10sXG4gICAgaGlwYWE6IFsnMTY0LjMxMi5iJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnQVUuNicsICdTSS40J10sXG4gICAgdHNjOiBbJ0NDNy4yJywgJ0NDNy4zJywgJ0NDNi4xJywgJ0NDNi44J10sXG4gICAgbWl0cmU6IHtcbiAgICAgIHRhY3RpYzogWydDb2xsZWN0aW9uJywgJ0ltcGFjdCddLFxuICAgICAgaWQ6IFsnVDExMTQnLCAnVDE0OTknXSxcbiAgICAgIHRlY2huaXF1ZTogWydFbWFpbCBDb2xsZWN0aW9uJywgJ0VuZHBvaW50IERlbmlhbCBvZiBTZXJ2aWNlJ10sXG4gICAgfSxcbiAgICBncm91cHM6IFsnbXVsdGlwbGVfc3BhbScsICdzeXNsb2cnLCAncG9zdGZpeCddLFxuICAgIGRlc2NyaXB0aW9uOiAnUG9zdGZpeDogTXVsdGlwbGUgcmVsYXlpbmcgYXR0ZW1wdHMgb2Ygc3BhbS4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDMwLXBvc3RmaXhfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDMzNTIsXG4gICAgbGV2ZWw6IDYsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczoge1xuICAgICAgZnJlcXVlbmN5OiAnJFBPU1RGSVhfRlJFUScsXG4gICAgICB0aW1lZnJhbWU6ICcxMjAnLFxuICAgICAgaWZfbWF0Y2hlZF9zaWQ6ICczMzAyJyxcbiAgICAgIHNhbWVfc291cmNlX2lwOiAnJyxcbiAgICB9LFxuICAgIHBjaV9kc3M6IFsnMTAuNi4xJywgJzExLjQnXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydBVS42JywgJ1NJLjQnXSxcbiAgICB0c2M6IFsnQ0M3LjInLCAnQ0M3LjMnLCAnQ0M2LjEnLCAnQ0M2LjgnXSxcbiAgICBtaXRyZToge1xuICAgICAgdGFjdGljOiBbJ0NvbGxlY3Rpb24nLCAnSW1wYWN0J10sXG4gICAgICBpZDogWydUMTExNCcsICdUMTQ5OSddLFxuICAgICAgdGVjaG5pcXVlOiBbJ0VtYWlsIENvbGxlY3Rpb24nLCAnRW5kcG9pbnQgRGVuaWFsIG9mIFNlcnZpY2UnXSxcbiAgICB9LFxuICAgIGdyb3VwczogWydtdWx0aXBsZV9zcGFtJywgJ3N5c2xvZycsICdwb3N0Zml4J10sXG4gICAgZGVzY3JpcHRpb246ICdQb3N0Zml4OiBNdWx0aXBsZSBhdHRlbXB0cyB0byBzZW5kIGUtbWFpbCBmcm9tIGEgcmVqZWN0ZWQgc2VuZGVyIElQIChhY2Nlc3MpLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMzAtcG9zdGZpeF9ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogMzM1MyxcbiAgICBsZXZlbDogMTAsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczoge1xuICAgICAgZnJlcXVlbmN5OiAnJFBPU1RGSVhfRlJFUScsXG4gICAgICB0aW1lZnJhbWU6ICcxMjAnLFxuICAgICAgaWZfbWF0Y2hlZF9zaWQ6ICczMzAzJyxcbiAgICAgIHNhbWVfc291cmNlX2lwOiAnJyxcbiAgICB9LFxuICAgIHBjaV9kc3M6IFsnMTAuNi4xJywgJzExLjQnXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjYnLCAnU0kuNCddLFxuICAgIHRzYzogWydDQzcuMicsICdDQzcuMycsICdDQzYuMScsICdDQzYuOCddLFxuICAgIG1pdHJlOiB7XG4gICAgICB0YWN0aWM6IFsnQ29sbGVjdGlvbicsICdJbXBhY3QnXSxcbiAgICAgIGlkOiBbJ1QxMTE0JywgJ1QxNDk5J10sXG4gICAgICB0ZWNobmlxdWU6IFsnRW1haWwgQ29sbGVjdGlvbicsICdFbmRwb2ludCBEZW5pYWwgb2YgU2VydmljZSddLFxuICAgIH0sXG4gICAgZ3JvdXBzOiBbJ211bHRpcGxlX3NwYW0nLCAnc3lzbG9nJywgJ3Bvc3RmaXgnXSxcbiAgICBkZXNjcmlwdGlvbjogJ1Bvc3RmaXg6IE11bHRpcGxlIGF0dGVtcHRzIHRvIHNlbmQgZS1tYWlsIGZyb20gaW52YWxpZC91bmtub3duIHNlbmRlciBkb21haW4uJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDAzMC1wb3N0Zml4X3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiAzMzU0LFxuICAgIGxldmVsOiAxMixcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7XG4gICAgICBmcmVxdWVuY3k6ICckUE9TVEZJWF9GUkVRJyxcbiAgICAgIHRpbWVmcmFtZTogJzEyMCcsXG4gICAgICBpZl9tYXRjaGVkX3NpZDogJzMzMDQnLFxuICAgICAgc2FtZV9zb3VyY2VfaXA6ICcnLFxuICAgIH0sXG4gICAgcGNpX2RzczogWycxMC42LjEnLCAnMTEuNCddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJ10sXG4gICAgaGlwYWE6IFsnMTY0LjMxMi5iJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnQVUuNicsICdTSS40J10sXG4gICAgdHNjOiBbJ0NDNy4yJywgJ0NDNy4zJywgJ0NDNi4xJywgJ0NDNi44J10sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ0NvbGxlY3Rpb24nXSwgaWQ6IFsnVDExMTQnXSwgdGVjaG5pcXVlOiBbJ0VtYWlsIENvbGxlY3Rpb24nXSB9LFxuICAgIGdyb3VwczogWydtdWx0aXBsZV9zcGFtJywgJ3N5c2xvZycsICdwb3N0Zml4J10sXG4gICAgZGVzY3JpcHRpb246ICdQb3N0Zml4OiBNdWx0aXBsZSBtaXN1c2Ugb2YgU01UUCBzZXJ2aWNlIChiYWQgc2VxdWVuY2Ugb2YgY29tbWFuZHMpLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMzAtcG9zdGZpeF9ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogMzM1NSxcbiAgICBsZXZlbDogMTAsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczoge1xuICAgICAgZnJlcXVlbmN5OiAnJFBPU1RGSVhfRlJFUScsXG4gICAgICB0aW1lZnJhbWU6ICcxMjAnLFxuICAgICAgaWZfbWF0Y2hlZF9zaWQ6ICczMzA1JyxcbiAgICAgIHNhbWVfc291cmNlX2lwOiAnJyxcbiAgICB9LFxuICAgIHBjaV9kc3M6IFsnMTAuNi4xJywgJzExLjQnXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjYnLCAnU0kuNCddLFxuICAgIHRzYzogWydDQzcuMicsICdDQzcuMycsICdDQzYuMScsICdDQzYuOCddLFxuICAgIG1pdHJlOiB7XG4gICAgICB0YWN0aWM6IFsnQ29sbGVjdGlvbicsICdJbXBhY3QnXSxcbiAgICAgIGlkOiBbJ1QxMTE0JywgJ1QxNDk5J10sXG4gICAgICB0ZWNobmlxdWU6IFsnRW1haWwgQ29sbGVjdGlvbicsICdFbmRwb2ludCBEZW5pYWwgb2YgU2VydmljZSddLFxuICAgIH0sXG4gICAgZ3JvdXBzOiBbJ211bHRpcGxlX3NwYW0nLCAnc3lzbG9nJywgJ3Bvc3RmaXgnXSxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdQb3N0Zml4OiBNdWx0aXBsZSBhdHRlbXB0cyB0byBzZW5kIGUtbWFpbCB0byBpbnZhbGlkIHJlY2lwaWVudCBvciBmcm9tIHVua25vd24gc2VuZGVyIGRvbWFpbi4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDMwLXBvc3RmaXhfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDMzNTYsXG4gICAgbGV2ZWw6IDEwLFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHtcbiAgICAgIGZyZXF1ZW5jeTogJyRQT1NURklYX0ZSRVEnLFxuICAgICAgdGltZWZyYW1lOiAnMTIwJyxcbiAgICAgIGlnbm9yZTogJzMwJyxcbiAgICAgIGlmX21hdGNoZWRfc2lkOiAnMzMwNicsXG4gICAgICBzYW1lX3NvdXJjZV9pcDogJycsXG4gICAgfSxcbiAgICBwY2lfZHNzOiBbJzEwLjYuMScsICcxMS40J10sXG4gICAgZ2RwcjogWydJVl8zNS43LmQnXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydBVS42JywgJ1NJLjQnXSxcbiAgICB0c2M6IFsnQ0M3LjInLCAnQ0M3LjMnLCAnQ0M2LjEnLCAnQ0M2LjgnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnSW1wYWN0J10sIGlkOiBbJ1QxNDk5J10sIHRlY2huaXF1ZTogWydFbmRwb2ludCBEZW5pYWwgb2YgU2VydmljZSddIH0sXG4gICAgZ3JvdXBzOiBbJ211bHRpcGxlX3NwYW0nLCAnc3lzbG9nJywgJ3Bvc3RmaXgnXSxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdQb3N0Zml4OiBNdWx0aXBsZSBhdHRlbXB0cyB0byBzZW5kIGUtbWFpbCBmcm9tIGJsYWNrLWxpc3RlZCBJUCBhZGRyZXNzIChibG9ja2VkKS4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDMwLXBvc3RmaXhfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDMzNTcsXG4gICAgbGV2ZWw6IDEwLFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHtcbiAgICAgIGZyZXF1ZW5jeTogJzgnLFxuICAgICAgdGltZWZyYW1lOiAnMTIwJyxcbiAgICAgIGlnbm9yZTogJzYwJyxcbiAgICAgIGlmX21hdGNoZWRfc2lkOiAnMzMzMicsXG4gICAgICBzYW1lX3NvdXJjZV9pcDogJycsXG4gICAgfSxcbiAgICBwY2lfZHNzOiBbJzEwLjIuNCcsICcxMC4yLjUnLCAnMTEuNCddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJywgJ0lWXzMyLjInXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydBVS4xNCcsICdBQy43JywgJ1NJLjQnXSxcbiAgICB0c2M6IFsnQ0M2LjEnLCAnQ0M2LjgnLCAnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnQ3JlZGVudGlhbCBBY2Nlc3MnXSwgaWQ6IFsnVDExMTAnXSwgdGVjaG5pcXVlOiBbJ0JydXRlIEZvcmNlJ10gfSxcbiAgICBncm91cHM6IFsnYXV0aGVudGljYXRpb25fZmFpbHVyZXMnLCAnc3lzbG9nJywgJ3Bvc3RmaXgnXSxcbiAgICBkZXNjcmlwdGlvbjogJ1Bvc3RmaXg6IE11bHRpcGxlIFNBU0wgYXV0aGVudGljYXRpb24gZmFpbHVyZXMuJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDAzMC1wb3N0Zml4X3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiAzMzk2LFxuICAgIGxldmVsOiA2LFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgaWZfc2lkOiAnMzM5NScsIG1hdGNoOiAndmVyaWZpY2F0aW9uJyB9LFxuICAgIHBjaV9kc3M6IFsnMTAuNi4xJywgJzExLjQnXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjYnLCAnU0kuNCddLFxuICAgIHRzYzogWydDQzcuMicsICdDQzcuMycsICdDQzYuMScsICdDQzYuOCddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydDb2xsZWN0aW9uJ10sIGlkOiBbJ1QxMTE0J10sIHRlY2huaXF1ZTogWydFbWFpbCBDb2xsZWN0aW9uJ10gfSxcbiAgICBncm91cHM6IFsnc3BhbScsICdzeXNsb2cnLCAncG9zdGZpeCddLFxuICAgIGRlc2NyaXB0aW9uOiAnUG9zdGZpeDogaG9zdG5hbWUgdmVyaWZpY2F0aW9uIGZhaWxlZCcsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMzAtcG9zdGZpeF9ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogMzM5NyxcbiAgICBsZXZlbDogNixcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGlmX3NpZDogJzMzOTUnLCBtYXRjaDogJ1JCTCcgfSxcbiAgICBwY2lfZHNzOiBbJzEwLjYuMScsICcxMS40J10sXG4gICAgZ2RwcjogWydJVl8zNS43LmQnXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydBVS42JywgJ1NJLjQnXSxcbiAgICB0c2M6IFsnQ0M3LjInLCAnQ0M3LjMnLCAnQ0M2LjEnLCAnQ0M2LjgnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnQ29sbGVjdGlvbiddLCBpZDogWydUMTExNCddLCB0ZWNobmlxdWU6IFsnRW1haWwgQ29sbGVjdGlvbiddIH0sXG4gICAgZ3JvdXBzOiBbJ3NwYW0nLCAnc3lzbG9nJywgJ3Bvc3RmaXgnXSxcbiAgICBkZXNjcmlwdGlvbjogJ1Bvc3RmaXg6IFJCTCBsb29rdXAgZXJyb3I6IEhvc3Qgb3IgZG9tYWluIG5hbWUgbm90IGZvdW5kJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDAzMC1wb3N0Zml4X3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiAzMzk4LFxuICAgIGxldmVsOiA2LFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgaWZfc2lkOiAnMzM5NScsIG1hdGNoOiAnTUFJTHxkb2VzIG5vdCByZXNvbHZlIHRvIGFkZHJlc3MnIH0sXG4gICAgcGNpX2RzczogWycxMC42LjEnLCAnMTEuNCddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJ10sXG4gICAgaGlwYWE6IFsnMTY0LjMxMi5iJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnQVUuNicsICdTSS40J10sXG4gICAgdHNjOiBbJ0NDNy4yJywgJ0NDNy4zJywgJ0NDNi4xJywgJ0NDNi44J10sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ0NvbGxlY3Rpb24nXSwgaWQ6IFsnVDExMTQnXSwgdGVjaG5pcXVlOiBbJ0VtYWlsIENvbGxlY3Rpb24nXSB9LFxuICAgIGdyb3VwczogWydzcGFtJywgJ3N5c2xvZycsICdwb3N0Zml4J10sXG4gICAgZGVzY3JpcHRpb246ICdQb3N0Zml4OiBJbGxlZ2FsIGFkZHJlc3MgZnJvbSB1bmtub3duIHNlbmRlcicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwNDAtaW1hcGRfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDM2MDIsXG4gICAgbGV2ZWw6IDMsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBpZl9zaWQ6ICczNjAwJywgbWF0Y2g6ICdBdXRoZW50aWNhdGVkIHVzZXI9JyB9LFxuICAgIHBjaV9kc3M6IFsnMTAuMi41J10sXG4gICAgZ3BnMTM6IFsnNy4xJ10sXG4gICAgZ2RwcjogWydJVl8zMi4yJ10sXG4gICAgaGlwYWE6IFsnMTY0LjMxMi5iJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnQVUuMTQnLCAnQUMuNyddLFxuICAgIHRzYzogWydDQzYuOCcsICdDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydJbml0aWFsIEFjY2VzcyddLCBpZDogWydUMTA3OCddLCB0ZWNobmlxdWU6IFsnVmFsaWQgQWNjb3VudHMnXSB9LFxuICAgIGdyb3VwczogWydhdXRoZW50aWNhdGlvbl9zdWNjZXNzJywgJ3N5c2xvZycsICdpbWFwZCddLFxuICAgIGRlc2NyaXB0aW9uOiAnSW1hcGQgdXNlciBsb2dpbi4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDQwLWltYXBkX3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiAzNjUxLFxuICAgIGxldmVsOiAxMCxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7XG4gICAgICBmcmVxdWVuY3k6ICckSU1BUERfRlJFUScsXG4gICAgICB0aW1lZnJhbWU6ICcxMjAnLFxuICAgICAgaWZfbWF0Y2hlZF9zaWQ6ICczNjAxJyxcbiAgICAgIHNhbWVfc291cmNlX2lwOiAnJyxcbiAgICB9LFxuICAgIHBjaV9kc3M6IFsnMTAuMi40JywgJzEwLjIuNScsICcxMS40J10sXG4gICAgZ3BnMTM6IFsnNy4xJ10sXG4gICAgZ2RwcjogWydJVl8zNS43LmQnLCAnSVZfMzIuMiddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjE0JywgJ0FDLjcnLCAnU0kuNCddLFxuICAgIHRzYzogWydDQzYuMScsICdDQzYuOCcsICdDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydDcmVkZW50aWFsIEFjY2VzcyddLCBpZDogWydUMTExMCddLCB0ZWNobmlxdWU6IFsnQnJ1dGUgRm9yY2UnXSB9LFxuICAgIGdyb3VwczogWydhdXRoZW50aWNhdGlvbl9mYWlsdXJlcycsICdzeXNsb2cnLCAnaW1hcGQnXSxcbiAgICBkZXNjcmlwdGlvbjogJ0ltYXBkIE11bHRpcGxlIGZhaWxlZCBsb2dpbnMgZnJvbSBzYW1lIHNvdXJjZSBpcC4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDQ1LW1haWxzY2FubmVyX3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiAzNzUxLFxuICAgIGxldmVsOiA2LFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgZnJlcXVlbmN5OiAnOCcsIHRpbWVmcmFtZTogJzE4MCcsIGlmX21hdGNoZWRfc2lkOiAnMzcwMicsIHNhbWVfc291cmNlX2lwOiAnJyB9LFxuICAgIHBjaV9kc3M6IFsnMTAuNi4xJ10sXG4gICAgZ3BnMTM6IFsnNC4xMiddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJ10sXG4gICAgaGlwYWE6IFsnMTY0LjMxMi5iJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnQVUuNiddLFxuICAgIHRzYzogWydDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7XG4gICAgICB0YWN0aWM6IFsnQ3JlZGVudGlhbCBBY2Nlc3MnLCAnQ29sbGVjdGlvbiddLFxuICAgICAgaWQ6IFsnVDExMTAnLCAnVDExMTQnXSxcbiAgICAgIHRlY2huaXF1ZTogWydCcnV0ZSBGb3JjZScsICdFbWFpbCBDb2xsZWN0aW9uJ10sXG4gICAgfSxcbiAgICBncm91cHM6IFsnbXVsdGlwbGVfc3BhbScsICdzeXNsb2cnLCAnbWFpbHNjYW5uZXInXSxcbiAgICBkZXNjcmlwdGlvbjogJ21haWxzY2FubmVyOiBNdWx0aXBsZSBhdHRlbXB0cyBvZiBzcGFtLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwNTAtbXMtZXhjaGFuZ2VfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDM4NTEsXG4gICAgbGV2ZWw6IDksXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczoge1xuICAgICAgZnJlcXVlbmN5OiAnMTInLFxuICAgICAgdGltZWZyYW1lOiAnMTIwJyxcbiAgICAgIGlnbm9yZTogJzEyMCcsXG4gICAgICBpZl9tYXRjaGVkX3NpZDogJzM4MDEnLFxuICAgICAgc2FtZV9zb3VyY2VfaXA6ICcnLFxuICAgIH0sXG4gICAgcGNpX2RzczogWycxMC42LjEnXSxcbiAgICBncGcxMzogWyc0LjEyJ10sXG4gICAgZ2RwcjogWydJVl8zNS43LmQnXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydBVS42J10sXG4gICAgdHNjOiBbJ0NDNy4yJywgJ0NDNy4zJ10sXG4gICAgbWl0cmU6IHtcbiAgICAgIHRhY3RpYzogWydDb2xsZWN0aW9uJywgJ0ltcGFjdCddLFxuICAgICAgaWQ6IFsnVDExMTQnLCAnVDE0OTknXSxcbiAgICAgIHRlY2huaXF1ZTogWydFbWFpbCBDb2xsZWN0aW9uJywgJ0VuZHBvaW50IERlbmlhbCBvZiBTZXJ2aWNlJ10sXG4gICAgfSxcbiAgICBncm91cHM6IFsnbXVsdGlwbGVfc3BhbScsICdtcycsICdleGNoYW5nZSddLFxuICAgIGRlc2NyaXB0aW9uOiAnbXMtZXhjaGFuZ2U6IE11bHRpcGxlIGUtbWFpbCBhdHRlbXB0cyB0byBhbiBpbnZhbGlkIGFjY291bnQuJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDA1MC1tcy1leGNoYW5nZV9ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogMzg1MixcbiAgICBsZXZlbDogOSxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7XG4gICAgICBmcmVxdWVuY3k6ICcxNCcsXG4gICAgICB0aW1lZnJhbWU6ICcxMjAnLFxuICAgICAgaWdub3JlOiAnMjQwJyxcbiAgICAgIGlmX21hdGNoZWRfc2lkOiAnMzgwMicsXG4gICAgICBzYW1lX3NvdXJjZV9pcDogJycsXG4gICAgfSxcbiAgICBwY2lfZHNzOiBbJzEwLjYuMSddLFxuICAgIGdwZzEzOiBbJzQuMTInXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjYnXSxcbiAgICB0c2M6IFsnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZToge1xuICAgICAgdGFjdGljOiBbJ0NvbGxlY3Rpb24nLCAnSW1wYWN0J10sXG4gICAgICBpZDogWydUMTExNCcsICdUMTQ5OSddLFxuICAgICAgdGVjaG5pcXVlOiBbJ0VtYWlsIENvbGxlY3Rpb24nLCAnRW5kcG9pbnQgRGVuaWFsIG9mIFNlcnZpY2UnXSxcbiAgICB9LFxuICAgIGdyb3VwczogWydtdWx0aXBsZV9zcGFtJywgJ21zJywgJ2V4Y2hhbmdlJ10sXG4gICAgZGVzY3JpcHRpb246ICdtcy1leGNoYW5nZTogTXVsdGlwbGUgZS1tYWlsIDUwMCBlcnJvciBjb2RlIChzcGFtKS4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDU1LWNvdXJpZXJfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDM5MDQsXG4gICAgbGV2ZWw6IDMsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBpZl9zaWQ6ICczOTAwJywgbWF0Y2g6ICdeTE9HSU4sJyB9LFxuICAgIHBjaV9kc3M6IFsnMTAuMi41J10sXG4gICAgZ3BnMTM6IFsnNy4xJywgJzcuMiddLFxuICAgIGdkcHI6IFsnSVZfMzIuMiddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjE0JywgJ0FDLjcnXSxcbiAgICB0c2M6IFsnQ0M2LjgnLCAnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnSW5pdGlhbCBBY2Nlc3MnXSwgaWQ6IFsnVDEwNzgnXSwgdGVjaG5pcXVlOiBbJ1ZhbGlkIEFjY291bnRzJ10gfSxcbiAgICBncm91cHM6IFsnYXV0aGVudGljYXRpb25fc3VjY2VzcycsICdzeXNsb2cnLCAnY291cmllciddLFxuICAgIGRlc2NyaXB0aW9uOiAnQ291cmllciAoaW1hcC9wb3AzKSBhdXRoZW50aWNhdGlvbiBzdWNjZXNzLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwNTUtY291cmllcl9ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogMzkxMCxcbiAgICBsZXZlbDogMTAsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBmcmVxdWVuY3k6ICcxMicsIHRpbWVmcmFtZTogJzMwJywgaWZfbWF0Y2hlZF9zaWQ6ICczOTAyJywgc2FtZV9zb3VyY2VfaXA6ICcnIH0sXG4gICAgcGNpX2RzczogWycxMC4yLjQnLCAnMTAuMi41JywgJzExLjQnXSxcbiAgICBncGcxMzogWyc3LjEnXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCcsICdJVl8zMi4yJ10sXG4gICAgaGlwYWE6IFsnMTY0LjMxMi5iJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnQVUuMTQnLCAnQUMuNycsICdTSS40J10sXG4gICAgdHNjOiBbJ0NDNi4xJywgJ0NDNi44JywgJ0NDNy4yJywgJ0NDNy4zJ10sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ0NyZWRlbnRpYWwgQWNjZXNzJ10sIGlkOiBbJ1QxMTEwJ10sIHRlY2huaXF1ZTogWydCcnV0ZSBGb3JjZSddIH0sXG4gICAgZ3JvdXBzOiBbJ2F1dGhlbnRpY2F0aW9uX2ZhaWx1cmVzJywgJ3N5c2xvZycsICdjb3VyaWVyJ10sXG4gICAgZGVzY3JpcHRpb246ICdDb3VyaWVyIGJydXRlIGZvcmNlIChtdWx0aXBsZSBmYWlsZWQgbG9naW5zKS4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDU1LWNvdXJpZXJfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDM5MTEsXG4gICAgbGV2ZWw6IDEwLFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgZnJlcXVlbmN5OiAnMTcnLCB0aW1lZnJhbWU6ICczMCcsIGlmX21hdGNoZWRfc2lkOiAnMzkwMScsIHNhbWVfc291cmNlX2lwOiAnJyB9LFxuICAgIHBjaV9kc3M6IFsnMTAuNi4xJywgJzExLjQnXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjYnLCAnU0kuNCddLFxuICAgIHRzYzogWydDQzcuMicsICdDQzcuMycsICdDQzYuMScsICdDQzYuOCddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydDcmVkZW50aWFsIEFjY2VzcyddLCBpZDogWydUMTExMCddLCB0ZWNobmlxdWU6IFsnQnJ1dGUgRm9yY2UnXSB9LFxuICAgIGdyb3VwczogWydyZWNvbicsICdzeXNsb2cnLCAnY291cmllciddLFxuICAgIGRlc2NyaXB0aW9uOiAnQ291cmllcjogTXVsdGlwbGUgY29ubmVjdGlvbiBhdHRlbXB0cyBmcm9tIHNhbWUgc291cmNlLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwNjUtcGl4X3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiA0MzIzLFxuICAgIGxldmVsOiAzLFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgaWZfc2lkOiAnNDMxNCcsIGlkOiAnXjYtNjA1MDA1JyB9LFxuICAgIHBjaV9kc3M6IFsnMTAuMi41J10sXG4gICAgZ3BnMTM6IFsnNy44J10sXG4gICAgZ2RwcjogWydJVl8zMi4yJ10sXG4gICAgaGlwYWE6IFsnMTY0LjMxMi5iJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnQVUuMTQnLCAnQUMuNyddLFxuICAgIHRzYzogWydDQzYuOCcsICdDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydJbml0aWFsIEFjY2VzcyddLCBpZDogWydUMTA3OCddLCB0ZWNobmlxdWU6IFsnVmFsaWQgQWNjb3VudHMnXSB9LFxuICAgIGdyb3VwczogWydhdXRoZW50aWNhdGlvbl9zdWNjZXNzJywgJ3N5c2xvZycsICdwaXgnXSxcbiAgICBkZXNjcmlwdGlvbjogJ1BJWDogU3VjY2Vzc2Z1bCBsb2dpbi4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDY1LXBpeF9ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogNDMyNSxcbiAgICBsZXZlbDogOCxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGlmX3NpZDogJzQzMTMnLCBpZDogJ140LTQwNTAwMScgfSxcbiAgICBwY2lfZHNzOiBbJzEwLjYuMSddLFxuICAgIGdwZzEzOiBbJzQuMTInXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjYnXSxcbiAgICB0c2M6IFsnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZToge1xuICAgICAgdGFjdGljOiBbJ0NvbW1hbmQgYW5kIENvbnRyb2wnXSxcbiAgICAgIGlkOiBbJ1QxMDk1J10sXG4gICAgICB0ZWNobmlxdWU6IFsnU3RhbmRhcmQgTm9uLUFwcGxpY2F0aW9uIExheWVyIFByb3RvY29sJ10sXG4gICAgfSxcbiAgICBncm91cHM6IFsnc3lzbG9nJywgJ3BpeCddLFxuICAgIGRlc2NyaXB0aW9uOiAnUElYOiBBUlAgY29sbGlzaW9uIGRldGVjdGVkLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwNjUtcGl4X3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiA0MzM1LFxuICAgIGxldmVsOiAzLFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgaWZfc2lkOiAnNDMxNCcsIGlkOiAnXjYtMTEzMDA0JyB9LFxuICAgIHBjaV9kc3M6IFsnMTAuMi41J10sXG4gICAgZ3BnMTM6IFsnNy4xJywgJzcuMiddLFxuICAgIGdkcHI6IFsnSVZfMzIuMiddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjE0JywgJ0FDLjcnXSxcbiAgICB0c2M6IFsnQ0M2LjgnLCAnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnSW5pdGlhbCBBY2Nlc3MnXSwgaWQ6IFsnVDEwNzgnXSwgdGVjaG5pcXVlOiBbJ1ZhbGlkIEFjY291bnRzJ10gfSxcbiAgICBncm91cHM6IFsnYXV0aGVudGljYXRpb25fc3VjY2VzcycsICdzeXNsb2cnLCAncGl4J10sXG4gICAgZGVzY3JpcHRpb246ICdQSVg6IEFBQSAoVlBOKSBhdXRoZW50aWNhdGlvbiBzdWNjZXNzZnVsLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwNjUtcGl4X3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiA0MzM2LFxuICAgIGxldmVsOiA4LFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgaWZfc2lkOiAnNDMxNCcsIGlkOiAnXjYtMTEzMDA2JyB9LFxuICAgIHBjaV9kc3M6IFsnMTAuMi40JywgJzEwLjIuNSddLFxuICAgIGdwZzEzOiBbJzcuMScsICc3LjUnXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCcsICdJVl8zMi4yJ10sXG4gICAgaGlwYWE6IFsnMTY0LjMxMi5iJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnQVUuMTQnLCAnQUMuNyddLFxuICAgIHRzYzogWydDQzYuMScsICdDQzYuOCcsICdDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydJbml0aWFsIEFjY2VzcyddLCBpZDogWydUMTEzMyddLCB0ZWNobmlxdWU6IFsnRXh0ZXJuYWwgUmVtb3RlIFNlcnZpY2VzJ10gfSxcbiAgICBncm91cHM6IFsnYXV0aGVudGljYXRpb25fZmFpbGVkJywgJ3N5c2xvZycsICdwaXgnXSxcbiAgICBkZXNjcmlwdGlvbjogJ1BJWDogQUFBIChWUE4pIHVzZXIgbG9ja2VkIG91dC4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDY1LXBpeF9ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogNDMzNyxcbiAgICBsZXZlbDogOCxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGlmX3NpZDogJzQzMTInLCBpZDogJ14zLTIwMTAwOCcgfSxcbiAgICBwY2lfZHNzOiBbJzEwLjYuMSddLFxuICAgIGdwZzEzOiBbJzQuMTInXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjYnXSxcbiAgICB0c2M6IFsnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnSW5pdGlhbCBBY2Nlc3MnXSwgaWQ6IFsnVDExMzMnXSwgdGVjaG5pcXVlOiBbJ0V4dGVybmFsIFJlbW90ZSBTZXJ2aWNlcyddIH0sXG4gICAgZ3JvdXBzOiBbJ3NlcnZpY2VfYXZhaWxhYmlsaXR5JywgJ3N5c2xvZycsICdwaXgnXSxcbiAgICBkZXNjcmlwdGlvbjogJ1BJWDogVGhlIFBJWCBpcyBkaXNhbGxvd2luZyBuZXcgY29ubmVjdGlvbnMuJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDA2NS1waXhfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDQzMzksXG4gICAgbGV2ZWw6IDgsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBpZl9zaWQ6ICc0MzE0JywgaWQ6ICdeNS0xMTEwMDMnIH0sXG4gICAgcGNpX2RzczogWycxLjEuMScsICcxMC40J10sXG4gICAgZ3BnMTM6IFsnNC4xMyddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJ10sXG4gICAgaGlwYWE6IFsnMTY0LjMxMi5hLjEnLCAnMTY0LjMxMi5iJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnQ00uMycsICdDTS41JywgJ0FVLjgnXSxcbiAgICB0c2M6IFsnQ0M4LjEnLCAnQ0M2LjEnLCAnQ0M2LjgnLCAnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnRGVmZW5zZSBFdmFzaW9uJ10sIGlkOiBbJ1QxMDg5J10sIHRlY2huaXF1ZTogWydEaXNhYmxpbmcgU2VjdXJpdHkgVG9vbHMnXSB9LFxuICAgIGdyb3VwczogWydjb25maWdfY2hhbmdlZCcsICdzeXNsb2cnLCAncGl4J10sXG4gICAgZGVzY3JpcHRpb246ICdQSVg6IEZpcmV3YWxsIGNvbmZpZ3VyYXRpb24gZGVsZXRlZC4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDY1LXBpeF9ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogNDM0MCxcbiAgICBsZXZlbDogOCxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGlmX3NpZDogJzQzMTQnLCBpZDogJ141LTExMTAwNXxeNS0xMTEwMDR8XjUtMTExMDAyfF41LTExMTAwNycgfSxcbiAgICBwY2lfZHNzOiBbJzEuMS4xJywgJzEwLjQnXSxcbiAgICBncGcxMzogWyc0LjEzJ10sXG4gICAgZ2RwcjogWydJVl8zNS43LmQnXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmEuMScsICcxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydDTS4zJywgJ0NNLjUnLCAnQVUuOCddLFxuICAgIHRzYzogWydDQzguMScsICdDQzYuMScsICdDQzYuOCcsICdDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydEZWZlbnNlIEV2YXNpb24nXSwgaWQ6IFsnVDEwODknXSwgdGVjaG5pcXVlOiBbJ0Rpc2FibGluZyBTZWN1cml0eSBUb29scyddIH0sXG4gICAgZ3JvdXBzOiBbJ2NvbmZpZ19jaGFuZ2VkJywgJ3N5c2xvZycsICdwaXgnXSxcbiAgICBkZXNjcmlwdGlvbjogJ1BJWDogRmlyZXdhbGwgY29uZmlndXJhdGlvbiBjaGFuZ2VkLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwNjUtcGl4X3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiA0MzQyLFxuICAgIGxldmVsOiA4LFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgaWZfc2lkOiAnNDMxNCcsIGlkOiAnXjUtNTAyMTAxfF41LTUwMjEwMicgfSxcbiAgICBwY2lfZHNzOiBbJzguMS4yJywgJzEwLjIuNSddLFxuICAgIGdwZzEzOiBbJzQuMTMnXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCcsICdJVl8zMi4yJ10sXG4gICAgaGlwYWE6IFsnMTY0LjMxMi5hLjIuSScsICcxNjQuMzEyLmEuMi5JSScsICcxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydBQy4yJywgJ0lBLjQnLCAnQVUuMTQnLCAnQUMuNyddLFxuICAgIHRzYzogWydDQzYuOCcsICdDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7XG4gICAgICB0YWN0aWM6IFsnRGVmZW5zZSBFdmFzaW9uJywgJ0luaXRpYWwgQWNjZXNzJ10sXG4gICAgICBpZDogWydUMTA4OScsICdUMTEzMyddLFxuICAgICAgdGVjaG5pcXVlOiBbJ0Rpc2FibGluZyBTZWN1cml0eSBUb29scycsICdFeHRlcm5hbCBSZW1vdGUgU2VydmljZXMnXSxcbiAgICB9LFxuICAgIGdyb3VwczogWydhZGR1c2VyJywgJ2FjY291bnRfY2hhbmdlZCcsICdzeXNsb2cnLCAncGl4J10sXG4gICAgZGVzY3JpcHRpb246ICdQSVg6IFVzZXIgY3JlYXRlZCBvciBtb2RpZmllZCBvbiB0aGUgRmlyZXdhbGwuJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDA2NS1waXhfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDQzODYsXG4gICAgbGV2ZWw6IDEwLFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgZnJlcXVlbmN5OiAnMTAnLCB0aW1lZnJhbWU6ICcyNDAnLCBpZl9tYXRjaGVkX3NpZDogJzQzMzQnLCBzYW1lX3NvdXJjZV9pcDogJycgfSxcbiAgICBwY2lfZHNzOiBbJzExLjQnLCAnMTAuMi40JywgJzEwLjIuNSddLFxuICAgIGdwZzEzOiBbJzcuMSddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJywgJ0lWXzMyLjInXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydTSS40JywgJ0FVLjE0JywgJ0FDLjcnXSxcbiAgICB0c2M6IFsnQ0M2LjEnLCAnQ0M2LjgnLCAnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZToge1xuICAgICAgdGFjdGljOiBbJ0NyZWRlbnRpYWwgQWNjZXNzJywgJ0luaXRpYWwgQWNjZXNzJ10sXG4gICAgICBpZDogWydUMTExMCcsICdUMTEzMyddLFxuICAgICAgdGVjaG5pcXVlOiBbJ0JydXRlIEZvcmNlJywgJ0V4dGVybmFsIFJlbW90ZSBTZXJ2aWNlcyddLFxuICAgIH0sXG4gICAgZ3JvdXBzOiBbJ2F1dGhlbnRpY2F0aW9uX2ZhaWx1cmVzJywgJ3N5c2xvZycsICdwaXgnXSxcbiAgICBkZXNjcmlwdGlvbjogJ1BJWDogTXVsdGlwbGUgQUFBIChWUE4pIGF1dGhlbnRpY2F0aW9uIGZhaWx1cmVzLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwNzAtbmV0c2NyZWVuZndfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDQ1MDUsXG4gICAgbGV2ZWw6IDExLFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgaWZfc2lkOiAnNDUwMycsIGlkOiAnXjAwMDI3JyB9LFxuICAgIHBjaV9kc3M6IFsnMS40JywgJzEwLjYuMSddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJ10sXG4gICAgaGlwYWE6IFsnMTY0LjMxMi5hLjEnLCAnMTY0LjMxMi5iJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnU0MuNycsICdBVS42J10sXG4gICAgdHNjOiBbJ0NDNi43JywgJ0NDNi44JywgJ0NDNy4yJywgJ0NDNy4zJ10sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ0ltcGFjdCddLCBpZDogWydUMTQ4NSddLCB0ZWNobmlxdWU6IFsnRGF0YSBEZXN0cnVjdGlvbiddIH0sXG4gICAgZ3JvdXBzOiBbJ3NlcnZpY2VfYXZhaWxhYmlsaXR5JywgJ25ldHNjcmVlbmZ3J10sXG4gICAgZGVzY3JpcHRpb246ICdOZXRzY3JlZW4gRXJhc2Ugc2VxdWVuY2Ugc3RhcnRlZC4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDcwLW5ldHNjcmVlbmZ3X3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiA0NTA2LFxuICAgIGxldmVsOiA4LFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgaWZfc2lkOiAnNDUwMScsIGlkOiAnXjAwMDAyJyB9LFxuICAgIHBjaV9kc3M6IFsnMTAuMi41JywgJzEwLjIuMiddLFxuICAgIGdwZzEzOiBbJzcuOCddLFxuICAgIGdkcHI6IFsnSVZfMzIuMiddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjE0JywgJ0FDLjcnLCAnQUMuNiddLFxuICAgIHRzYzogWydDQzYuOCcsICdDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydJbml0aWFsIEFjY2VzcyddLCBpZDogWydUMTA3OCddLCB0ZWNobmlxdWU6IFsnVmFsaWQgQWNjb3VudHMnXSB9LFxuICAgIGdyb3VwczogWydhdXRoZW50aWNhdGlvbl9zdWNjZXNzJywgJ25ldHNjcmVlbmZ3J10sXG4gICAgZGVzY3JpcHRpb246ICdOZXRzY3JlZW4gZmlyZXdhbGw6IFN1Y2Nlc3NmdWxsIGFkbWluIGxvZ2luJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDA3MC1uZXRzY3JlZW5md19ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogNDUwNyxcbiAgICBsZXZlbDogOCxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGlmX3NpZDogJzQ1MDInLCBpZDogJ14wMDUxNScgfSxcbiAgICBwY2lfZHNzOiBbJzEwLjIuNScsICcxMC4yLjInXSxcbiAgICBncGcxMzogWyc3LjgnXSxcbiAgICBnZHByOiBbJ0lWXzMyLjInXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydBVS4xNCcsICdBQy43JywgJ0FDLjYnXSxcbiAgICB0c2M6IFsnQ0M2LjgnLCAnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnSW5pdGlhbCBBY2Nlc3MnXSwgaWQ6IFsnVDEwNzgnXSwgdGVjaG5pcXVlOiBbJ1ZhbGlkIEFjY291bnRzJ10gfSxcbiAgICBncm91cHM6IFsnYXV0aGVudGljYXRpb25fc3VjY2VzcycsICduZXRzY3JlZW5mdyddLFxuICAgIGRlc2NyaXB0aW9uOiAnTmV0c2NyZWVuIGZpcmV3YWxsOiBTdWNjZXNzZnVsbCBhZG1pbiBsb2dpbicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwNzAtbmV0c2NyZWVuZndfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDQ1MDksXG4gICAgbGV2ZWw6IDgsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBpZl9zaWQ6ICc0NTA0JywgaWQ6ICdeMDA3NjcnIH0sXG4gICAgcGNpX2RzczogWycxLjEuMSddLFxuICAgIGdwZzEzOiBbJzQuMTInXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYS4xJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnQ00uMycsICdDTS41J10sXG4gICAgdHNjOiBbJ0NDOC4xJ10sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ0RlZmVuc2UgRXZhc2lvbiddLCBpZDogWydUMTA4OSddLCB0ZWNobmlxdWU6IFsnRGlzYWJsaW5nIFNlY3VyaXR5IFRvb2xzJ10gfSxcbiAgICBncm91cHM6IFsnY29uZmlnX2NoYW5nZWQnLCAnbmV0c2NyZWVuZncnXSxcbiAgICBkZXNjcmlwdGlvbjogJ05ldHNjcmVlbiBmaXJld2FsbDogY29uZmlndXJhdGlvbiBjaGFuZ2VkLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwNzAtbmV0c2NyZWVuZndfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDQ1NTAsXG4gICAgbGV2ZWw6IDEwLFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHtcbiAgICAgIGZyZXF1ZW5jeTogJzYnLFxuICAgICAgdGltZWZyYW1lOiAnMTgwJyxcbiAgICAgIGlnbm9yZTogJzYwJyxcbiAgICAgIGlmX21hdGNoZWRfc2lkOiAnNDUwMycsXG4gICAgICBzYW1lX3NvdXJjZV9pcDogJycsXG4gICAgfSxcbiAgICBwY2lfZHNzOiBbJzEuNCcsICcxMC42LjEnLCAnMTEuNCddLFxuICAgIGdwZzEzOiBbJzQuMSddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJ10sXG4gICAgaGlwYWE6IFsnMTY0LjMxMi5hLjEnLCAnMTY0LjMxMi5iJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnU0MuNycsICdBVS42JywgJ1NJLjQnXSxcbiAgICB0c2M6IFsnQ0M2LjcnLCAnQ0M2LjgnLCAnQ0M3LjInLCAnQ0M3LjMnLCAnQ0M2LjEnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnSW1wYWN0J10sIGlkOiBbJ1QxNDk5J10sIHRlY2huaXF1ZTogWydFbmRwb2ludCBEZW5pYWwgb2YgU2VydmljZSddIH0sXG4gICAgZ3JvdXBzOiBbJ25ldHNjcmVlbmZ3J10sXG4gICAgZGVzY3JpcHRpb246ICdOZXRzY3JlZW4gZmlyZXdhbGw6IE11bHRpcGxlIGNyaXRpY2FsIG1lc3NhZ2VzIGZyb20gc2FtZSBzb3VyY2UgSVAuJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDA3MC1uZXRzY3JlZW5md19ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogNDU1MSxcbiAgICBsZXZlbDogMTAsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBmcmVxdWVuY3k6ICc4JywgdGltZWZyYW1lOiAnMTgwJywgaWdub3JlOiAnNjAnLCBpZl9tYXRjaGVkX3NpZDogJzQ1MDMnIH0sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ0ltcGFjdCddLCBpZDogWydUMTQ5OSddLCB0ZWNobmlxdWU6IFsnRW5kcG9pbnQgRGVuaWFsIG9mIFNlcnZpY2UnXSB9LFxuICAgIGdyb3VwczogWyduZXRzY3JlZW5mdyddLFxuICAgIGRlc2NyaXB0aW9uOiAnTmV0c2NyZWVuIGZpcmV3YWxsOiBNdWx0aXBsZSBjcml0aWNhbCBtZXNzYWdlcy4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDc1LWNpc2NvLWlvc19ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogNDcyMixcbiAgICBsZXZlbDogMyxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGlmX3NpZDogJzQ3MTUnLCBpZDogJ14lU0VDX0xPR0lOLTUtTE9HSU5fU1VDQ0VTUycgfSxcbiAgICBwY2lfZHNzOiBbJzEwLjIuNSddLFxuICAgIGdwZzEzOiBbJzMuNiddLFxuICAgIGdkcHI6IFsnSVZfMzIuMiddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjE0JywgJ0FDLjcnXSxcbiAgICB0c2M6IFsnQ0M2LjgnLCAnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnSW5pdGlhbCBBY2Nlc3MnXSwgaWQ6IFsnVDEwNzgnXSwgdGVjaG5pcXVlOiBbJ1ZhbGlkIEFjY291bnRzJ10gfSxcbiAgICBncm91cHM6IFsnYXV0aGVudGljYXRpb25fc3VjY2VzcycsICdzeXNsb2cnLCAnY2lzY29faW9zJ10sXG4gICAgZGVzY3JpcHRpb246ICdDaXNjbyBJT1M6IFN1Y2Nlc3NmdWwgbG9naW4gdG8gdGhlIHJvdXRlci4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDgwLXNvbmljd2FsbF9ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogNDgxMCxcbiAgICBsZXZlbDogMyxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGlmX3NpZDogJzQ4MDYnLCBpZDogJ14yMzYkJyB9LFxuICAgIHBjaV9kc3M6IFsnMTAuMi41J10sXG4gICAgZ3BnMTM6IFsnMy42J10sXG4gICAgZ2RwcjogWydJVl8zMi4yJ10sXG4gICAgaGlwYWE6IFsnMTY0LjMxMi5iJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnQVUuMTQnLCAnQUMuNyddLFxuICAgIHRzYzogWydDQzYuOCcsICdDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydJbml0aWFsIEFjY2VzcyddLCBpZDogWydUMTA3OCddLCB0ZWNobmlxdWU6IFsnVmFsaWQgQWNjb3VudHMnXSB9LFxuICAgIGdyb3VwczogWydhdXRoZW50aWNhdGlvbl9zdWNjZXNzJywgJ3N5c2xvZycsICdzb25pY3dhbGwnXSxcbiAgICBkZXNjcmlwdGlvbjogJ1NvbmljV2FsbDogRmlyZXdhbGwgYWRtaW5pc3RyYXRvciBsb2dpbi4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDgwLXNvbmljd2FsbF9ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogNDg1MSxcbiAgICBsZXZlbDogMTAsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBmcmVxdWVuY3k6ICc4JywgdGltZWZyYW1lOiAnMTIwJywgaWdub3JlOiAnNjAnLCBpZl9tYXRjaGVkX3NpZDogJzQ4MDMnIH0sXG4gICAgcGNpX2RzczogWycxMC42LjEnXSxcbiAgICBncGcxMzogWyczLjUnXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjYnXSxcbiAgICB0c2M6IFsnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnSW1wYWN0J10sIGlkOiBbJ1QxNDk5J10sIHRlY2huaXF1ZTogWydFbmRwb2ludCBEZW5pYWwgb2YgU2VydmljZSddIH0sXG4gICAgZ3JvdXBzOiBbJ3NlcnZpY2VfYXZhaWxhYmlsaXR5JywgJ3N5c2xvZycsICdzb25pY3dhbGwnXSxcbiAgICBkZXNjcmlwdGlvbjogJ1NvbmljV2FsbDogTXVsdGlwbGUgZmlyZXdhbGwgZXJyb3IgbWVzc2FnZXMuJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDAyMC1zeXNsb2dfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDUxMDMsXG4gICAgbGV2ZWw6IDksXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBpZl9zaWQ6ICc1MTAwJywgbWF0Y2g6ICdPdmVyc2l6ZWQgcGFja2V0IHJlY2VpdmVkIGZyb20nIH0sXG4gICAgZ2RwcjogWydJVl8zNS43LmQnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnSW1wYWN0J10sIGlkOiBbJ1QxNDk5J10sIHRlY2huaXF1ZTogWydFbmRwb2ludCBEZW5pYWwgb2YgU2VydmljZSddIH0sXG4gICAgZ3JvdXBzOiBbJ3N5c2xvZycsICdsaW51eGtlcm5lbCddLFxuICAgIGRlc2NyaXB0aW9uOiAnRXJyb3IgbWVzc2FnZSBmcm9tIHRoZSBrZXJuZWwuIFBpbmcgb2YgZGVhdGggYXR0YWNrLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMjAtc3lzbG9nX3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiA1MTA0LFxuICAgIGxldmVsOiA4LFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHtcbiAgICAgIGlmX3NpZDogJzUxMDAnLFxuICAgICAgcmVnZXg6IFsnUHJvbWlzY3VvdXMgbW9kZSBlbmFibGVkfCcsICdkZXZpY2UgUysgZW50ZXJlZCBwcm9taXNjdW91cyBtb2RlJ10sXG4gICAgfSxcbiAgICBwY2lfZHNzOiBbJzEwLjYuMScsICcxMS40J10sXG4gICAgZ3BnMTM6IFsnNC4xMyddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJ10sXG4gICAgaGlwYWE6IFsnMTY0LjMxMi5iJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnQVUuNicsICdTSS40J10sXG4gICAgdHNjOiBbJ0NDNy4yJywgJ0NDNy4zJywgJ0NDNi4xJywgJ0NDNi44J10sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ0Rpc2NvdmVyeSddLCBpZDogWydUMTA0MCddLCB0ZWNobmlxdWU6IFsnTmV0d29yayBTbmlmZmluZyddIH0sXG4gICAgZ3JvdXBzOiBbJ3Byb21pc2MnLCAnc3lzbG9nJywgJ2xpbnV4a2VybmVsJ10sXG4gICAgZGVzY3JpcHRpb246ICdJbnRlcmZhY2UgZW50ZXJlZCBpbiBwcm9taXNjdW91cyhzbmlmZmluZykgbW9kZS4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDIwLXN5c2xvZ19ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogNTEwOCxcbiAgICBsZXZlbDogMTIsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBpZl9zaWQ6ICc1MTAwJywgbWF0Y2g6ICdPdXQgb2YgTWVtb3J5OiAnIH0sXG4gICAgcGNpX2RzczogWycxMC42LjEnXSxcbiAgICBncGcxMzogWyc0LjEyJ10sXG4gICAgZ2RwcjogWydJVl8zNS43LmQnXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydBVS42J10sXG4gICAgdHNjOiBbJ0NDNy4yJywgJ0NDNy4zJ10sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ0ltcGFjdCddLCBpZDogWydUMTQ5OSddLCB0ZWNobmlxdWU6IFsnRW5kcG9pbnQgRGVuaWFsIG9mIFNlcnZpY2UnXSB9LFxuICAgIGdyb3VwczogWydzZXJ2aWNlX2F2YWlsYWJpbGl0eScsICdzeXNsb2cnLCAnbGludXhrZXJuZWwnXSxcbiAgICBkZXNjcmlwdGlvbjogJ1N5c3RlbSBydW5uaW5nIG91dCBvZiBtZW1vcnkuIEF2YWlsYWJpbGl0eSBvZiB0aGUgc3lzdGVtIGlzIGluIHJpc2suJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDAyMC1zeXNsb2dfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDUxMTMsXG4gICAgbGV2ZWw6IDcsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBpZl9zaWQ6ICc1MTAwJywgbWF0Y2g6ICdLZXJuZWwgbG9nIGRhZW1vbiB0ZXJtaW5hdGluZycgfSxcbiAgICBwY2lfZHNzOiBbJzEwLjYuMSddLFxuICAgIGdwZzEzOiBbJzQuMTQnXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjYnXSxcbiAgICB0c2M6IFsnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnSW1wYWN0J10sIGlkOiBbJ1QxNTI5J10sIHRlY2huaXF1ZTogWydTeXN0ZW0gU2h1dGRvd24vUmVib290J10gfSxcbiAgICBncm91cHM6IFsnc3lzdGVtX3NodXRkb3duJywgJ3N5c2xvZycsICdsaW51eGtlcm5lbCddLFxuICAgIGRlc2NyaXB0aW9uOiAnU3lzdGVtIGlzIHNodXR0aW5nIGRvd24uJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDAyMC1zeXNsb2dfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDUxMzIsXG4gICAgbGV2ZWw6IDExLFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgaWZfc2lkOiAnNTEwMCcsIG1hdGNoOiAnbW9kdWxlIHZlcmlmaWNhdGlvbiBmYWlsZWQnIH0sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ1BlcnNpc3RlbmNlJ10sIGlkOiBbJ1QxMjE1J10sIHRlY2huaXF1ZTogWydLZXJuZWwgTW9kdWxlcyBhbmQgRXh0ZW5zaW9ucyddIH0sXG4gICAgZ3JvdXBzOiBbJ3N5c2xvZycsICdsaW51eGtlcm5lbCddLFxuICAgIGRlc2NyaXB0aW9uOiAnVW5zaWduZWQga2VybmVsIG1vZHVsZSB3YXMgbG9hZGVkJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDAyMC1zeXNsb2dfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDUxMzMsXG4gICAgbGV2ZWw6IDExLFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgaWZfc2lkOiAnNTEwMCcsIG1hdGNoOiAnUEtDUyM3IHNpZ25hdHVyZSBub3Qgc2lnbmVkIHdpdGggYSB0cnVzdGVkIGtleScgfSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnUGVyc2lzdGVuY2UnXSwgaWQ6IFsnVDEyMTUnXSwgdGVjaG5pcXVlOiBbJ0tlcm5lbCBNb2R1bGVzIGFuZCBFeHRlbnNpb25zJ10gfSxcbiAgICBncm91cHM6IFsnc3lzbG9nJywgJ2xpbnV4a2VybmVsJ10sXG4gICAgZGVzY3JpcHRpb246ICdTaWduZWQgYnV0IHVudHJ1c3RlZCBrZXJuZWwgbW9kdWxlIHdhcyBsb2FkZWQnLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDIwLXN5c2xvZ19ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogNTMwMixcbiAgICBsZXZlbDogOSxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGlmX3NpZDogJzUzMDEnLCB1c2VyOiAnXnJvb3QnIH0sXG4gICAgcGNpX2RzczogWycxMC4yLjQnLCAnMTAuMi41J10sXG4gICAgZ3BnMTM6IFsnNy44J10sXG4gICAgZ2RwcjogWydJVl8zNS43LmQnLCAnSVZfMzIuMiddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjE0JywgJ0FDLjcnXSxcbiAgICB0c2M6IFsnQ0M2LjEnLCAnQ0M2LjgnLCAnQ0M3LjInLCAnQ0M3LjMnLCAnQ0M3LjQnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnUHJpdmlsZWdlIEVzY2FsYXRpb24nXSwgaWQ6IFsnVDExNjknXSwgdGVjaG5pcXVlOiBbJ1N1ZG8nXSB9LFxuICAgIGdyb3VwczogWydhdXRoZW50aWNhdGlvbl9mYWlsZWQnLCAnc3lzbG9nJywgJ3N1J10sXG4gICAgZGVzY3JpcHRpb246ICdVc2VyIG1pc3NlZCB0aGUgcGFzc3dvcmQgdG8gY2hhbmdlIFVJRCB0byByb290LicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMjAtc3lzbG9nX3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiA1MzAzLFxuICAgIGxldmVsOiAzLFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHtcbiAgICAgIGlmX3NpZDogJzUzMDAnLFxuICAgICAgcmVnZXg6IFtcbiAgICAgICAgXCJzZXNzaW9uIG9wZW5lZCBmb3IgdXNlciByb290fF4nc3Ugcm9vdCd8XCIsXG4gICAgICAgICdeKyBTKyBTK3Byb290JHxeUysgdG8gcm9vdCBvbnxeU1UgUysgUysgKyBTKyBTKy1yb290JCcsXG4gICAgICBdLFxuICAgIH0sXG4gICAgcGNpX2RzczogWycxMC4yLjUnXSxcbiAgICBncGcxMzogWyc3LjYnLCAnNy44JywgJzcuOSddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJywgJ0lWXzMyLjInXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydBVS4xNCcsICdBQy43J10sXG4gICAgdHNjOiBbJ0NDNi44JywgJ0NDNy4yJywgJ0NDNy4zJ10sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ0luaXRpYWwgQWNjZXNzJ10sIGlkOiBbJ1QxMDc4J10sIHRlY2huaXF1ZTogWydWYWxpZCBBY2NvdW50cyddIH0sXG4gICAgZ3JvdXBzOiBbJ2F1dGhlbnRpY2F0aW9uX3N1Y2Nlc3MnLCAnc3lzbG9nJywgJ3N1J10sXG4gICAgZGVzY3JpcHRpb246ICdVc2VyIHN1Y2Nlc3NmdWxseSBjaGFuZ2VkIFVJRCB0byByb290LicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMjAtc3lzbG9nX3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiA1MzA0LFxuICAgIGxldmVsOiAzLFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHtcbiAgICAgIGlmX3NpZDogJzUzMDAnLFxuICAgICAgcmVnZXg6IFsnc2Vzc2lvbiBvcGVuZWQgZm9yIHVzZXJ8c3VjY2VlZGVkIGZvcnwnLCAnXit8XlMrIHRvIHxeU1UgUysgUysgKyAnXSxcbiAgICB9LFxuICAgIHBjaV9kc3M6IFsnMTAuMi41J10sXG4gICAgZ3BnMTM6IFsnNy42JywgJzcuOCddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJywgJ0lWXzMyLjInXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydBVS4xNCcsICdBQy43J10sXG4gICAgdHNjOiBbJ0NDNi44JywgJ0NDNy4yJywgJ0NDNy4zJ10sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ0luaXRpYWwgQWNjZXNzJ10sIGlkOiBbJ1QxMDc4J10sIHRlY2huaXF1ZTogWydWYWxpZCBBY2NvdW50cyddIH0sXG4gICAgZ3JvdXBzOiBbJ2F1dGhlbnRpY2F0aW9uX3N1Y2Nlc3MnLCAnc3lzbG9nJywgJ3N1J10sXG4gICAgZGVzY3JpcHRpb246ICdVc2VyIHN1Y2Nlc3NmdWxseSBjaGFuZ2VkIFVJRC4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDIwLXN5c2xvZ19ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogNTQwMSxcbiAgICBsZXZlbDogNSxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGlmX3NpZDogJzU0MDAnLCBtYXRjaDogJ2luY29ycmVjdCBwYXNzd29yZCBhdHRlbXB0JyB9LFxuICAgIHBjaV9kc3M6IFsnMTAuMi40JywgJzEwLjIuNSddLFxuICAgIGdwZzEzOiBbJzcuOCddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJywgJ0lWXzMyLjInXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydBVS4xNCcsICdBQy43J10sXG4gICAgdHNjOiBbJ0NDNi4xJywgJ0NDNi44JywgJ0NDNy4yJywgJ0NDNy4zJ10sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ1ByaXZpbGVnZSBFc2NhbGF0aW9uJ10sIGlkOiBbJ1QxMTY5J10sIHRlY2huaXF1ZTogWydTdWRvJ10gfSxcbiAgICBncm91cHM6IFsnc3lzbG9nJywgJ3N1ZG8nXSxcbiAgICBkZXNjcmlwdGlvbjogJ0ZhaWxlZCBhdHRlbXB0IHRvIHJ1biBzdWRvLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMjAtc3lzbG9nX3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiA1NDAyLFxuICAgIGxldmVsOiAzLFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgaWZfc2lkOiAnNTQwMCcsIHJlZ2V4OiAnIDsgVVNFUj1yb290IDsgQ09NTUFORD18IDsgVVNFUj1yb290IDsgVFNJRD1TKyA7IENPTU1BTkQ9JyB9LFxuICAgIHBjaV9kc3M6IFsnMTAuMi41JywgJzEwLjIuMiddLFxuICAgIGdwZzEzOiBbJzcuNicsICc3LjgnLCAnNy4xMyddLFxuICAgIGdkcHI6IFsnSVZfMzIuMiddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjE0JywgJ0FDLjcnLCAnQUMuNiddLFxuICAgIHRzYzogWydDQzYuOCcsICdDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydQcml2aWxlZ2UgRXNjYWxhdGlvbiddLCBpZDogWydUMTE2OSddLCB0ZWNobmlxdWU6IFsnU3VkbyddIH0sXG4gICAgZ3JvdXBzOiBbJ3N5c2xvZycsICdzdWRvJ10sXG4gICAgZGVzY3JpcHRpb246ICdTdWNjZXNzZnVsIHN1ZG8gdG8gUk9PVCBleGVjdXRlZC4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDIwLXN5c2xvZ19ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogNTQwMyxcbiAgICBsZXZlbDogNCxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGlmX3NpZDogJzU0MDAnLCBpZl9mdHM6ICcnIH0sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ1ByaXZpbGVnZSBFc2NhbGF0aW9uJ10sIGlkOiBbJ1QxMTY5J10sIHRlY2huaXF1ZTogWydTdWRvJ10gfSxcbiAgICBncm91cHM6IFsnc3lzbG9nJywgJ3N1ZG8nXSxcbiAgICBkZXNjcmlwdGlvbjogJ0ZpcnN0IHRpbWUgdXNlciBleGVjdXRlZCBzdWRvLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMjAtc3lzbG9nX3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiA1NDA0LFxuICAgIGxldmVsOiAxMCxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGlmX3NpZDogJzU0MDEnLCBtYXRjaDogJzMgaW5jb3JyZWN0IHBhc3N3b3JkIGF0dGVtcHRzJyB9LFxuICAgIHBjaV9kc3M6IFsnMTAuMi40JywgJzEwLjIuNSddLFxuICAgIGdwZzEzOiBbJzcuOCddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJywgJ0lWXzMyLjInXSxcbiAgICBoaXBhYTogWycxNjQuMzEyLmInXSxcbiAgICBuaXN0XzgwMF81MzogWydBVS4xNCcsICdBQy43J10sXG4gICAgdHNjOiBbJ0NDNi4xJywgJ0NDNi44JywgJ0NDNy4yJywgJ0NDNy4zJ10sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ1ByaXZpbGVnZSBFc2NhbGF0aW9uJ10sIGlkOiBbJ1QxMTY5J10sIHRlY2huaXF1ZTogWydTdWRvJ10gfSxcbiAgICBncm91cHM6IFsnc3lzbG9nJywgJ3N1ZG8nXSxcbiAgICBkZXNjcmlwdGlvbjogJ1RocmVlIGZhaWxlZCBhdHRlbXB0cyB0byBydW4gc3VkbycsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwMjAtc3lzbG9nX3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiA1NDA1LFxuICAgIGxldmVsOiA1LFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgaWZfc2lkOiAnNTQwMCcsIG1hdGNoOiAndXNlciBOT1QgaW4gc3Vkb2VycycgfSxcbiAgICBwY2lfZHNzOiBbJzEwLjIuMicsICcxMC4yLjUnXSxcbiAgICBncGcxMzogWyc3LjgnXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCcsICdJVl8zMi4yJ10sXG4gICAgaGlwYWE6IFsnMTY0LjMxMi5iJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnQVUuMTQnLCAnQUMuNicsICdBQy43J10sXG4gICAgdHNjOiBbJ0NDNi44JywgJ0NDNy4yJywgJ0NDNy4zJ10sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ1ByaXZpbGVnZSBFc2NhbGF0aW9uJ10sIGlkOiBbJ1QxMTY5J10sIHRlY2huaXF1ZTogWydTdWRvJ10gfSxcbiAgICBncm91cHM6IFsnc3lzbG9nJywgJ3N1ZG8nXSxcbiAgICBkZXNjcmlwdGlvbjogJ1VuYXV0aG9yaXplZCB1c2VyIGF0dGVtcHRlZCB0byB1c2Ugc3Vkby4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDIwLXN5c2xvZ19ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogNTQwNyxcbiAgICBsZXZlbDogMyxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGlmX3NpZDogJzU0MDAnLCByZWdleDogJyA7IFVTRVI9UysgOyBDT01NQU5EPXwgOyBVU0VSPVMrIDsgVFNJRD1TKyA7IENPTU1BTkQ9JyB9LFxuICAgIHBjaV9kc3M6IFsnMTAuMi41JywgJzEwLjIuMiddLFxuICAgIGdwZzEzOiBbJzcuNicsICc3LjgnLCAnNy4xMyddLFxuICAgIGdkcHI6IFsnSVZfMzIuMiddLFxuICAgIHRzYzogWydDQzYuOCcsICdDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydQcml2aWxlZ2UgRXNjYWxhdGlvbiddLCBpZDogWydUMTE2OSddLCB0ZWNobmlxdWU6IFsnU3VkbyddIH0sXG4gICAgZ3JvdXBzOiBbJ3N5c2xvZycsICdzdWRvJ10sXG4gICAgZGVzY3JpcHRpb246ICdTdWNjZXNzZnVsIHN1ZG8gZXhlY3V0ZWQuJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDA4NS1wYW1fcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDU1MDEsXG4gICAgbGV2ZWw6IDMsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBpZl9zaWQ6ICc1NTAwJywgbWF0Y2g6ICdzZXNzaW9uIG9wZW5lZCBmb3IgdXNlciAnIH0sXG4gICAgcGNpX2RzczogWycxMC4yLjUnXSxcbiAgICBncGcxMzogWyc3LjgnLCAnNy45J10sXG4gICAgZ2RwcjogWydJVl8zMi4yJ10sXG4gICAgaGlwYWE6IFsnMTY0LjMxMi5iJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnQVUuMTQnLCAnQUMuNyddLFxuICAgIHRzYzogWydDQzYuOCcsICdDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydJbml0aWFsIEFjY2VzcyddLCBpZDogWydUMTA3OCddLCB0ZWNobmlxdWU6IFsnVmFsaWQgQWNjb3VudHMnXSB9LFxuICAgIGdyb3VwczogWydhdXRoZW50aWNhdGlvbl9zdWNjZXNzJywgJ3BhbScsICdzeXNsb2cnXSxcbiAgICBkZXNjcmlwdGlvbjogJ1BBTTogTG9naW4gc2Vzc2lvbiBvcGVuZWQuJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDA4NS1wYW1fcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDU1NTEsXG4gICAgbGV2ZWw6IDEwLFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgZnJlcXVlbmN5OiAnOCcsIHRpbWVmcmFtZTogJzE4MCcsIGlmX21hdGNoZWRfc2lkOiAnNTUwMycsIHNhbWVfc291cmNlX2lwOiAnJyB9LFxuICAgIHBjaV9kc3M6IFsnMTAuMi40JywgJzEwLjIuNScsICcxMS40J10sXG4gICAgZ3BnMTM6IFsnNy44J10sXG4gICAgZ2RwcjogWydJVl8zNS43LmQnLCAnSVZfMzIuMiddLFxuICAgIGhpcGFhOiBbJzE2NC4zMTIuYiddLFxuICAgIG5pc3RfODAwXzUzOiBbJ0FVLjE0JywgJ0FDLjcnLCAnU0kuNCddLFxuICAgIHRzYzogWydDQzYuMScsICdDQzYuOCcsICdDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydDcmVkZW50aWFsIEFjY2VzcyddLCBpZDogWydUMTExMCddLCB0ZWNobmlxdWU6IFsnQnJ1dGUgRm9yY2UnXSB9LFxuICAgIGdyb3VwczogWydhdXRoZW50aWNhdGlvbl9mYWlsdXJlcycsICdwYW0nLCAnc3lzbG9nJ10sXG4gICAgZGVzY3JpcHRpb246ICdQQU06IE11bHRpcGxlIGZhaWxlZCBsb2dpbnMgaW4gYSBzbWFsbCBwZXJpb2Qgb2YgdGltZS4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDkwLXRlbG5ldGRfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDU2MDEsXG4gICAgbGV2ZWw6IDUsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBpZl9zaWQ6ICc1NjAwJywgbWF0Y2g6ICdyZWZ1c2VkIGNvbm5lY3QgZnJvbSAnIH0sXG4gICAgZ2RwcjogWydJVl8zNS43LmQnXSxcbiAgICBtaXRyZToge1xuICAgICAgdGFjdGljOiBbJ0NvbW1hbmQgYW5kIENvbnRyb2wnXSxcbiAgICAgIGlkOiBbJ1QxMDk1J10sXG4gICAgICB0ZWNobmlxdWU6IFsnU3RhbmRhcmQgTm9uLUFwcGxpY2F0aW9uIExheWVyIFByb3RvY29sJ10sXG4gICAgfSxcbiAgICBncm91cHM6IFsnc3lzbG9nJywgJ3RlbG5ldGQnXSxcbiAgICBkZXNjcmlwdGlvbjogJ3RlbG5ldGQ6IENvbm5lY3Rpb24gcmVmdXNlZCBieSBUQ1AgV3JhcHBlcnMuJyxcbiAgfSxcbiAge1xuICAgIGZpbGVuYW1lOiAnMDA5MC10ZWxuZXRkX3J1bGVzLnhtbCcsXG4gICAgcmVsYXRpdmVfZGlybmFtZTogJ3J1bGVzZXQvcnVsZXMnLFxuICAgIGlkOiA1NjMxLFxuICAgIGxldmVsOiAxMCxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGZyZXF1ZW5jeTogJzYnLCB0aW1lZnJhbWU6ICcxMjAnLCBpZl9tYXRjaGVkX3NpZDogJzU2MDInLCBzYW1lX3NvdXJjZV9pcDogJycgfSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCcsICdJVl8zMi4yJ10sXG4gICAgbWl0cmU6IHsgdGFjdGljOiBbJ0NyZWRlbnRpYWwgQWNjZXNzJ10sIGlkOiBbJ1QxMTEwJ10sIHRlY2huaXF1ZTogWydCcnV0ZSBGb3JjZSddIH0sXG4gICAgZ3JvdXBzOiBbJ3N5c2xvZycsICd0ZWxuZXRkJ10sXG4gICAgZGVzY3JpcHRpb246ICd0ZWxuZXRkOiBNdWx0aXBsZSBjb25uZWN0aW9uIGF0dGVtcHRzIGZyb20gc2FtZSBzb3VyY2UgKHBvc3NpYmxlIHNjYW4pLicsXG4gIH0sXG4gIHtcbiAgICBmaWxlbmFtZTogJzAwOTUtc3NoZF9ydWxlcy54bWwnLFxuICAgIHJlbGF0aXZlX2Rpcm5hbWU6ICdydWxlc2V0L3J1bGVzJyxcbiAgICBpZDogNTcwMSxcbiAgICBsZXZlbDogOCxcbiAgICBzdGF0dXM6ICdlbmFibGVkJyxcbiAgICBkZXRhaWxzOiB7IGlmX3NpZDogJzU3MDAnLCBtYXRjaDogJ0JhZCBwcm90b2NvbCB2ZXJzaW9uIGlkZW50aWZpY2F0aW9uJyB9LFxuICAgIHBjaV9kc3M6IFsnMTEuNCddLFxuICAgIGdwZzEzOiBbJzQuMTInXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIG5pc3RfODAwXzUzOiBbJ1NJLjQnXSxcbiAgICB0c2M6IFsnQ0M2LjEnLCAnQ0M2LjgnLCAnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZToge1xuICAgICAgdGFjdGljOiBbJ0luaXRpYWwgQWNjZXNzJ10sXG4gICAgICBpZDogWydUMTE5MCddLFxuICAgICAgdGVjaG5pcXVlOiBbJ0V4cGxvaXQgUHVibGljLUZhY2luZyBBcHBsaWNhdGlvbiddLFxuICAgIH0sXG4gICAgZ3JvdXBzOiBbJ3JlY29uJywgJ3N5c2xvZycsICdzc2hkJ10sXG4gICAgZGVzY3JpcHRpb246ICdzc2hkOiBQb3NzaWJsZSBhdHRhY2sgb24gdGhlIHNzaCBzZXJ2ZXIgKG9yIHZlcnNpb24gZ2F0aGVyaW5nKS4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDk1LXNzaGRfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDU3MDMsXG4gICAgbGV2ZWw6IDEwLFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgZnJlcXVlbmN5OiAnNicsIHRpbWVmcmFtZTogJzM2MCcsIGlmX21hdGNoZWRfc2lkOiAnNTcwMicsIHNhbWVfc291cmNlX2lwOiAnJyB9LFxuICAgIHBjaV9kc3M6IFsnMTEuNCddLFxuICAgIGdwZzEzOiBbJzQuMTInXSxcbiAgICBnZHByOiBbJ0lWXzM1LjcuZCddLFxuICAgIG5pc3RfODAwXzUzOiBbJ1NJLjQnXSxcbiAgICB0c2M6IFsnQ0M2LjEnLCAnQ0M2LjgnLCAnQ0M3LjInLCAnQ0M3LjMnXSxcbiAgICBtaXRyZTogeyB0YWN0aWM6IFsnQ3JlZGVudGlhbCBBY2Nlc3MnXSwgaWQ6IFsnVDExMTAnXSwgdGVjaG5pcXVlOiBbJ0JydXRlIEZvcmNlJ10gfSxcbiAgICBncm91cHM6IFsnc3lzbG9nJywgJ3NzaGQnXSxcbiAgICBkZXNjcmlwdGlvbjogJ3NzaGQ6IFBvc3NpYmxlIGJyZWFraW4gYXR0ZW1wdCAoaGlnaCBudW1iZXIgb2YgcmV2ZXJzZSBsb29rdXAgZXJyb3JzKS4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDk1LXNzaGRfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDU3MDUsXG4gICAgbGV2ZWw6IDEwLFxuICAgIHN0YXR1czogJ2VuYWJsZWQnLFxuICAgIGRldGFpbHM6IHsgZnJlcXVlbmN5OiAnNicsIHRpbWVmcmFtZTogJzM2MCcsIGlmX21hdGNoZWRfc2lkOiAnNTcwNCcgfSxcbiAgICBwY2lfZHNzOiBbJzExLjQnXSxcbiAgICBncGcxMzogWyc0LjEyJ10sXG4gICAgZ2RwcjogWydJVl8zNS43LmQnXSxcbiAgICBuaXN0XzgwMF81MzogWydTSS40J10sXG4gICAgdHNjOiBbJ0NDNi4xJywgJ0NDNi44JywgJ0NDNy4yJywgJ0NDNy4zJ10sXG4gICAgbWl0cmU6IHtcbiAgICAgIHRhY3RpYzogWydJbml0aWFsIEFjY2VzcycsICdDcmVkZW50aWFsIEFjY2VzcyddLFxuICAgICAgaWQ6IFsnVDExOTAnLCAnVDExMTAnXSxcbiAgICAgIHRlY2huaXF1ZTogWydFeHBsb2l0IFB1YmxpYy1GYWNpbmcgQXBwbGljYXRpb24nLCAnQnJ1dGUgRm9yY2UnXSxcbiAgICB9LFxuICAgIGdyb3VwczogWydzeXNsb2cnLCAnc3NoZCddLFxuICAgIGRlc2NyaXB0aW9uOiAnc3NoZDogUG9zc2libGUgc2NhbiBvciBicmVha2luIGF0dGVtcHQgKGhpZ2ggbnVtYmVyIG9mIGxvZ2luIHRpbWVvdXRzKS4nLFxuICB9LFxuICB7XG4gICAgZmlsZW5hbWU6ICcwMDk1LXNzaGRfcnVsZXMueG1sJyxcbiAgICByZWxhdGl2ZV9kaXJuYW1lOiAncnVsZXNldC9ydWxlcycsXG4gICAgaWQ6IDU3MDYsXG4gICAgbGV2ZWw6IDYsXG4gICAgc3RhdHVzOiAnZW5hYmxlZCcsXG4gICAgZGV0YWlsczogeyBpZl9zaWQ6ICc1NzAwJywgbWF0Y2g6ICdEaWQgbm90IHJlY2VpdmUgaWRlbnRpZmljYXRpb24gc3RyaW5nIGZyb20nIH0sXG4gICAgcGNpX2RzczogWycxMS40J10sXG4gICAgZ3BnMTM6IFsnNC4xMiddLFxuICAgIGdkcHI6IFsnSVZfMzUuNy5kJ10sXG4gICAgbmlzdF84MDBfNTM6IFsnU0kuNCddLFxuICAgIHRzYzogWydDQzYuMScsICdDQzYuOCcsICdDQzcuMicsICdDQzcuMyddLFxuICAgIG1pdHJlOiB7IHRhY3RpYzogWydDb21tYW5kIGFuZCBDb250cm9sJ10sIGlkOiBbJ1QxMDQzJ10sIHRlY2huaXF1ZTogWydDb21tb25seSBVc2VkIFBvcnQnXSB9LFxuICAgIGdyb3VwczogWydyZWNvbicsICdzeXNsb2cnLCAnc3NoZCddLFxuICAgIGRlc2NyaXB0aW9uOiAnc3NoZDogaW5zZWN1cmUgY29ubmVjdGlvbiBhdHRlbXB0IChzY2FuKS4nLFxuICB9LFxuXTtcblxuZXhwb3J0IGNvbnN0IGFycmF5TG9jYXRpb24gPSBbJ0V2ZW50Q2hhbm5lbCcsICcvdmFyL2xvZy9hdXRoLmxvZycsICcvdmFyL2xvZy9zZWN1cmUnXTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNPLE1BQU1BLGVBQWUsR0FBQUMsT0FBQSxDQUFBRCxlQUFBLEdBQUcsQ0FDN0I7RUFDRUUsUUFBUSxFQUFFLHNCQUFzQjtFQUNoQ0MsZ0JBQWdCLEVBQUUsZUFBZTtFQUNqQ0MsRUFBRSxFQUFFLEdBQUc7RUFDUEMsS0FBSyxFQUFFLENBQUM7RUFDUkMsTUFBTSxFQUFFLFNBQVM7RUFDakJDLE9BQU8sRUFBRTtJQUFFQyxNQUFNLEVBQUUsS0FBSztJQUFFQyxLQUFLLEVBQUU7RUFBcUIsQ0FBQztFQUN2REMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztFQUM3QkMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDO0VBQ2ZDLElBQUksRUFBRSxDQUFDLFdBQVcsQ0FBQztFQUNuQkMsS0FBSyxFQUFFLENBQUMsV0FBVyxDQUFDO0VBQ3BCQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQztFQUN0Q0MsR0FBRyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7RUFDaENDLEtBQUssRUFBRTtJQUFFQyxNQUFNLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztJQUFFYixFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUM7SUFBRWMsU0FBUyxFQUFFLENBQUMsMEJBQTBCO0VBQUUsQ0FBQztFQUM5RkMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO0VBQ2pCQyxXQUFXLEVBQUU7QUFDZixDQUFDLEVBQ0Q7RUFDRWxCLFFBQVEsRUFBRSxzQkFBc0I7RUFDaENDLGdCQUFnQixFQUFFLGVBQWU7RUFDakNDLEVBQUUsRUFBRSxHQUFHO0VBQ1BDLEtBQUssRUFBRSxDQUFDO0VBQ1JDLE1BQU0sRUFB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