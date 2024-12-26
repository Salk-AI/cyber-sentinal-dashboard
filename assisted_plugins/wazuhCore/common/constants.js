"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WAZUH_SAMPLE_ALERT_PREFIX = exports.WAZUH_SAMPLE_ALERTS_INDEX_SHARDS = exports.WAZUH_SAMPLE_ALERTS_INDEX_REPLICAS = exports.WAZUH_SAMPLE_ALERTS_DEFAULT_NUMBER_ALERTS = exports.WAZUH_SAMPLE_ALERTS_CATEGORY_THREAT_DETECTION = exports.WAZUH_SAMPLE_ALERTS_CATEGORY_SECURITY = exports.WAZUH_SAMPLE_ALERTS_CATEGORY_AUDITING_POLICY_MONITORING = exports.WAZUH_SAMPLE_ALERTS_CATEGORIES_TYPE_ALERTS = exports.WAZUH_ROLE_ADMINISTRATOR_ID = exports.WAZUH_QUEUE_CRON_FREQ = exports.WAZUH_PLUGIN_PLATFORM_TEMPLATE_NAME = exports.WAZUH_PLUGIN_PLATFORM_SETTING_TIME_FILTER = exports.WAZUH_PLUGIN_PLATFORM_SETTING_METAFIELDS = exports.WAZUH_PLUGIN_PLATFORM_SETTING_MAX_BUCKETS = exports.WAZUH_MONITORING_TEMPLATE_NAME = exports.WAZUH_MONITORING_PREFIX = exports.WAZUH_MONITORING_PATTERN = exports.WAZUH_MONITORING_DEFAULT_INDICES_SHARDS = exports.WAZUH_MONITORING_DEFAULT_INDICES_REPLICAS = exports.WAZUH_MONITORING_DEFAULT_FREQUENCY = exports.WAZUH_MONITORING_DEFAULT_ENABLED = exports.WAZUH_MONITORING_DEFAULT_CRON_FREQ = exports.WAZUH_MONITORING_DEFAULT_CREATION = exports.WAZUH_MODULES_ID = exports.WAZUH_MENU_TOOLS_SECTIONS_ID = exports.WAZUH_MENU_SETTINGS_SECTIONS_ID = exports.WAZUH_MENU_SECURITY_SECTIONS_ID = exports.WAZUH_MENU_MANAGEMENT_SECTIONS_ID = exports.WAZUH_LINK_SLACK = exports.WAZUH_LINK_GOOGLE_GROUPS = exports.WAZUH_LINK_GITHUB = exports.WAZUH_INDEX_TYPE_VULNERABILITIES = exports.WAZUH_INDEX_TYPE_STATISTICS = exports.WAZUH_INDEX_TYPE_MONITORING = exports.WAZUH_INDEX_TYPE_ALERTS = exports.WAZUH_INDEXER_NAME = exports.WAZUH_ERROR_DAEMONS_NOT_READY = exports.WAZUH_DATA_PLUGIN_PLATFORM_BASE_ABSOLUTE_PATH = exports.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH = exports.WAZUH_DATA_DOWNLOADS_DIRECTORY_PATH = exports.WAZUH_DATA_CONFIG_REGISTRY_PATH = exports.WAZUH_DATA_CONFIG_DIRECTORY_PATH = exports.WAZUH_DATA_CONFIG_APP_PATH = exports.WAZUH_DATA_ABSOLUTE_PATH = exports.WAZUH_CORE_ENCRYPTION_PASSWORD = exports.WAZUH_CORE_CONFIGURATION_INSTANCE = exports.WAZUH_CORE_CONFIGURATION_CACHE_SECONDS = exports.WAZUH_CONFIGURATION_CACHE_TIME = exports.WAZUH_API_RESERVED_WUI_SECURITY_RULES = exports.WAZUH_API_RESERVED_ID_LOWER_THAN = exports.WAZUH_ALERTS_PREFIX = exports.WAZUH_ALERTS_PATTERN = exports.WAZUH_AGENTS_OS_TYPE = exports.UI_TOAST_COLOR = exports.UI_ORDER_AGENT_STATUS = exports.UI_LOGGER_LEVELS = exports.UI_LABEL_NAME_AGENT_STATUS = exports.UI_COLOR_STATUS = exports.UI_COLOR_AGENT_STATUS = exports.SettingCategory = exports.SEARCH_BAR_WQL_VALUE_SUGGESTIONS_DISPLAY_COUNT = exports.SEARCH_BAR_WQL_VALUE_SUGGESTIONS_COUNT = exports.SEARCH_BAR_DEBOUNCE_UPDATE_TIME = exports.REPORTS_PRIMARY_COLOR = exports.REPORTS_PAGE_HEADER_TEXT = exports.REPORTS_PAGE_FOOTER_TEXT = exports.REPORTS_LOGO_IMAGE_ASSETS_RELATIVE_PATH = exports.PLUGIN_VERSION_SHORT = exports.PLUGIN_VERSION = exports.PLUGIN_SETTINGS_CATEGORIES = exports.PLUGIN_SETTINGS = exports.PLUGIN_PLATFORM_WAZUH_DOCUMENTATION_URL_PATH_UPGRADE_PLATFORM = exports.PLUGIN_PLATFORM_WAZUH_DOCUMENTATION_URL_PATH_TROUBLESHOOTING = exports.PLUGIN_PLATFORM_WAZUH_DOCUMENTATION_URL_PATH_APP_CONFIGURATION = exports.PLUGIN_PLATFORM_URL_GUIDE_TITLE = exports.PLUGIN_PLATFORM_URL_GUIDE = exports.PLUGIN_PLATFORM_SETTING_NAME_TIME_FILTER = exports.PLUGIN_PLATFORM_SETTING_NAME_METAFIELDS = exports.PLUGIN_PLATFORM_SETTING_NAME_MAX_BUCKETS = exports.PLUGIN_PLATFORM_REQUEST_HEADERS = exports.PLUGIN_PLATFORM_NAME = exports.PLUGIN_PLATFORM_INSTALLATION_USER_GROUP = exports.PLUGIN_PLATFORM_INSTALLATION_USER = exports.PLUGIN_APP_NAME = exports.OSD_URL_STATE_STORAGE_ID = exports.NOT_TIME_FIELD_NAME_INDEX_PATTERN = exports.MODULE_SCA_CHECK_RESULT_LABEL = exports.HTTP_STATUS_CODES = exports.HEALTH_CHECK_REDIRECTION_TIME = exports.HEALTH_CHECK = exports.EpluginSettingType = exports.ELASTIC_NAME = exports.DOCUMENTATION_WEB_BASE_URL = exports.CUSTOMIZATION_ENDPOINT_PAYLOAD_UPLOAD_CUSTOM_FILE_MAXIMUM_BYTES = exports.AUTHORIZED_AGENTS = exports.ASSETS_PUBLIC_URL = exports.ASSETS_BASE_URL_PREFIX = exports.API_NAME_AGENT_STATUS = exports.AGENT_SYNCED_STATUS = exports.AGENT_STATUS_CODE = void 0;
exports.WAZUH_VULNERABILITIES_PATTERN = exports.WAZUH_STATISTICS_TEMPLATE_NAME = exports.WAZUH_STATISTICS_PATTERN = exports.WAZUH_STATISTICS_DEFAULT_STATUS = exports.WAZUH_STATISTICS_DEFAULT_PREFIX = exports.WAZUH_STATISTICS_DEFAULT_NAME = exports.WAZUH_STATISTICS_DEFAULT_INDICES_SHARDS = exports.WAZUH_STATISTICS_DEFAULT_INDICES_REPLICAS = exports.WAZUH_STATISTICS_DEFAULT_FREQUENCY = exports.WAZUH_STATISTICS_DEFAULT_CRON_FREQ = exports.WAZUH_STATISTICS_DEFAULT_CREATION = exports.WAZUH_SECURITY_PLUGIN_OPENSEARCH_DASHBOARDS_SECURITY = exports.WAZUH_SECURITY_PLUGINS = void 0;
var _path = _interopRequireDefault(require("path"));
var _package = require("../package.json");
var _settingsValidator = require("../common/services/settings-validator");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * Wazuh app - Wazuh Constants file
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

// import { validate as validateNodeCronInterval } from 'node-cron';

// Plugin
const PLUGIN_VERSION = exports.PLUGIN_VERSION = _package.version;
const PLUGIN_VERSION_SHORT = exports.PLUGIN_VERSION_SHORT = _package.version.split('.').splice(0, 2).join('.');

// Index patterns - Wazuh alerts
const WAZUH_INDEX_TYPE_ALERTS = exports.WAZUH_INDEX_TYPE_ALERTS = 'alerts';
const WAZUH_ALERTS_PREFIX = exports.WAZUH_ALERTS_PREFIX = 'wazuh-alerts-';
const WAZUH_ALERTS_PATTERN = exports.WAZUH_ALERTS_PATTERN = 'wazuh-alerts-*';

// Job - Wazuh monitoring
const WAZUH_INDEX_TYPE_MONITORING = exports.WAZUH_INDEX_TYPE_MONITORING = 'monitoring';
const WAZUH_MONITORING_PREFIX = exports.WAZUH_MONITORING_PREFIX = 'wazuh-monitoring-';
const WAZUH_MONITORING_PATTERN = exports.WAZUH_MONITORING_PATTERN = 'wazuh-monitoring-*';
const WAZUH_MONITORING_TEMPLATE_NAME = exports.WAZUH_MONITORING_TEMPLATE_NAME = 'wazuh-agent';
const WAZUH_MONITORING_DEFAULT_INDICES_SHARDS = exports.WAZUH_MONITORING_DEFAULT_INDICES_SHARDS = 1;
const WAZUH_MONITORING_DEFAULT_INDICES_REPLICAS = exports.WAZUH_MONITORING_DEFAULT_INDICES_REPLICAS = 0;
const WAZUH_MONITORING_DEFAULT_CREATION = exports.WAZUH_MONITORING_DEFAULT_CREATION = 'w';
const WAZUH_MONITORING_DEFAULT_ENABLED = exports.WAZUH_MONITORING_DEFAULT_ENABLED = true;
const WAZUH_MONITORING_DEFAULT_FREQUENCY = exports.WAZUH_MONITORING_DEFAULT_FREQUENCY = 900;
const WAZUH_MONITORING_DEFAULT_CRON_FREQ = exports.WAZUH_MONITORING_DEFAULT_CRON_FREQ = '0 * * * * *';

// Job - Wazuh statistics
const WAZUH_INDEX_TYPE_STATISTICS = exports.WAZUH_INDEX_TYPE_STATISTICS = 'statistics';
const WAZUH_STATISTICS_DEFAULT_PREFIX = exports.WAZUH_STATISTICS_DEFAULT_PREFIX = 'wazuh';
const WAZUH_STATISTICS_DEFAULT_NAME = exports.WAZUH_STATISTICS_DEFAULT_NAME = 'statistics';
const WAZUH_STATISTICS_PATTERN = exports.WAZUH_STATISTICS_PATTERN = `${WAZUH_STATISTICS_DEFAULT_PREFIX}-${WAZUH_STATISTICS_DEFAULT_NAME}-*`;
const WAZUH_STATISTICS_TEMPLATE_NAME = exports.WAZUH_STATISTICS_TEMPLATE_NAME = `${WAZUH_STATISTICS_DEFAULT_PREFIX}-${WAZUH_STATISTICS_DEFAULT_NAME}`;
const WAZUH_STATISTICS_DEFAULT_INDICES_SHARDS = exports.WAZUH_STATISTICS_DEFAULT_INDICES_SHARDS = 1;
const WAZUH_STATISTICS_DEFAULT_INDICES_REPLICAS = exports.WAZUH_STATISTICS_DEFAULT_INDICES_REPLICAS = 0;
const WAZUH_STATISTICS_DEFAULT_CREATION = exports.WAZUH_STATISTICS_DEFAULT_CREATION = 'w';
const WAZUH_STATISTICS_DEFAULT_STATUS = exports.WAZUH_STATISTICS_DEFAULT_STATUS = true;
const WAZUH_STATISTICS_DEFAULT_FREQUENCY = exports.WAZUH_STATISTICS_DEFAULT_FREQUENCY = 900;
const WAZUH_STATISTICS_DEFAULT_CRON_FREQ = exports.WAZUH_STATISTICS_DEFAULT_CRON_FREQ = '0 */5 * * * *';

// Wazuh vulnerabilities
const WAZUH_VULNERABILITIES_PATTERN = exports.WAZUH_VULNERABILITIES_PATTERN = 'wazuh-states-vulnerabilities-*';
const WAZUH_INDEX_TYPE_VULNERABILITIES = exports.WAZUH_INDEX_TYPE_VULNERABILITIES = 'vulnerabilities';

// Job - Wazuh initialize
const WAZUH_PLUGIN_PLATFORM_TEMPLATE_NAME = exports.WAZUH_PLUGIN_PLATFORM_TEMPLATE_NAME = 'wazuh-kibana';

// Sample data
const WAZUH_SAMPLE_ALERT_PREFIX = exports.WAZUH_SAMPLE_ALERT_PREFIX = 'wazuh-alerts-4.x-';
const WAZUH_SAMPLE_ALERTS_INDEX_SHARDS = exports.WAZUH_SAMPLE_ALERTS_INDEX_SHARDS = 1;
const WAZUH_SAMPLE_ALERTS_INDEX_REPLICAS = exports.WAZUH_SAMPLE_ALERTS_INDEX_REPLICAS = 0;
const WAZUH_SAMPLE_ALERTS_CATEGORY_SECURITY = exports.WAZUH_SAMPLE_ALERTS_CATEGORY_SECURITY = 'security';
const WAZUH_SAMPLE_ALERTS_CATEGORY_AUDITING_POLICY_MONITORING = exports.WAZUH_SAMPLE_ALERTS_CATEGORY_AUDITING_POLICY_MONITORING = 'auditing-policy-monitoring';
const WAZUH_SAMPLE_ALERTS_CATEGORY_THREAT_DETECTION = exports.WAZUH_SAMPLE_ALERTS_CATEGORY_THREAT_DETECTION = 'threat-detection';
const WAZUH_SAMPLE_ALERTS_DEFAULT_NUMBER_ALERTS = exports.WAZUH_SAMPLE_ALERTS_DEFAULT_NUMBER_ALERTS = 3000;
const WAZUH_SAMPLE_ALERTS_CATEGORIES_TYPE_ALERTS = exports.WAZUH_SAMPLE_ALERTS_CATEGORIES_TYPE_ALERTS = {
  [WAZUH_SAMPLE_ALERTS_CATEGORY_SECURITY]: [{
    syscheck: true
  }, {
    aws: true
  }, {
    office: true
  }, {
    gcp: true
  }, {
    authentication: true
  }, {
    ssh: true
  }, {
    apache: true,
    alerts: 2000
  }, {
    web: true
  }, {
    windows: {
      service_control_manager: true
    },
    alerts: 1000
  }, {
    github: true
  }],
  [WAZUH_SAMPLE_ALERTS_CATEGORY_AUDITING_POLICY_MONITORING]: [{
    rootcheck: true
  }, {
    audit: true
  }, {
    openscap: true
  }, {
    ciscat: true
  }],
  [WAZUH_SAMPLE_ALERTS_CATEGORY_THREAT_DETECTION]: [{
    vulnerabilities: true
  }, {
    virustotal: true
  }, {
    osquery: true
  }, {
    docker: true
  }, {
    mitre: true
  }]
};

// Security
const WAZUH_SECURITY_PLUGIN_OPENSEARCH_DASHBOARDS_SECURITY = exports.WAZUH_SECURITY_PLUGIN_OPENSEARCH_DASHBOARDS_SECURITY = 'OpenSearch Dashboards Security';
const WAZUH_SECURITY_PLUGINS = exports.WAZUH_SECURITY_PLUGINS = [WAZUH_SECURITY_PLUGIN_OPENSEARCH_DASHBOARDS_SECURITY];

// App configuration
const WAZUH_CONFIGURATION_CACHE_TIME = exports.WAZUH_CONFIGURATION_CACHE_TIME = 10000; // time in ms;

// Reserved ids for Users/Role mapping
const WAZUH_API_RESERVED_ID_LOWER_THAN = exports.WAZUH_API_RESERVED_ID_LOWER_THAN = 100;
const WAZUH_API_RESERVED_WUI_SECURITY_RULES = exports.WAZUH_API_RESERVED_WUI_SECURITY_RULES = [1, 2];

// Wazuh data path
const WAZUH_DATA_PLUGIN_PLATFORM_BASE_PATH = 'data';
const WAZUH_DATA_PLUGIN_PLATFORM_BASE_ABSOLUTE_PATH = exports.WAZUH_DATA_PLUGIN_PLATFORM_BASE_ABSOLUTE_PATH = _path.default.join(__dirname, '../../../', WAZUH_DATA_PLUGIN_PLATFORM_BASE_PATH);
const WAZUH_DATA_ABSOLUTE_PATH = exports.WAZUH_DATA_ABSOLUTE_PATH = _path.default.join(WAZUH_DATA_PLUGIN_PLATFORM_BASE_ABSOLUTE_PATH, 'wazuh');

// Wazuh data path - config
const WAZUH_DATA_CONFIG_DIRECTORY_PATH = exports.WAZUH_DATA_CONFIG_DIRECTORY_PATH = _path.default.join(WAZUH_DATA_ABSOLUTE_PATH, 'config');
const WAZUH_DATA_CONFIG_REGISTRY_PATH = exports.WAZUH_DATA_CONFIG_REGISTRY_PATH = _path.default.join(WAZUH_DATA_CONFIG_DIRECTORY_PATH, 'wazuh-registry.json');
const WAZUH_DATA_CONFIG_APP_PATH = exports.WAZUH_DATA_CONFIG_APP_PATH = _path.default.join(WAZUH_DATA_CONFIG_DIRECTORY_PATH, 'wazuh.yml');

// Wazuh data path - downloads
const WAZUH_DATA_DOWNLOADS_DIRECTORY_PATH = exports.WAZUH_DATA_DOWNLOADS_DIRECTORY_PATH = _path.default.join(WAZUH_DATA_ABSOLUTE_PATH, 'downloads');
const WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH = exports.WAZUH_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH = _path.default.join(WAZUH_DATA_DOWNLOADS_DIRECTORY_PATH, 'reports');

// Queue
const WAZUH_QUEUE_CRON_FREQ = exports.WAZUH_QUEUE_CRON_FREQ = '*/15 * * * * *'; // Every 15 seconds

// Wazuh errors
const WAZUH_ERROR_DAEMONS_NOT_READY = exports.WAZUH_ERROR_DAEMONS_NOT_READY = 'ERROR3099';

// Agents
let WAZUH_AGENTS_OS_TYPE = exports.WAZUH_AGENTS_OS_TYPE = /*#__PURE__*/function (WAZUH_AGENTS_OS_TYPE) {
  WAZUH_AGENTS_OS_TYPE["WINDOWS"] = "windows";
  WAZUH_AGENTS_OS_TYPE["LINUX"] = "linux";
  WAZUH_AGENTS_OS_TYPE["SUNOS"] = "sunos";
  WAZUH_AGENTS_OS_TYPE["DARWIN"] = "darwin";
  WAZUH_AGENTS_OS_TYPE["OTHERS"] = "";
  return WAZUH_AGENTS_OS_TYPE;
}({});
let WAZUH_MODULES_ID = exports.WAZUH_MODULES_ID = /*#__PURE__*/function (WAZUH_MODULES_ID) {
  WAZUH_MODULES_ID["SECURITY_EVENTS"] = "general";
  WAZUH_MODULES_ID["INTEGRITY_MONITORING"] = "fim";
  WAZUH_MODULES_ID["AMAZON_WEB_SERVICES"] = "aws";
  WAZUH_MODULES_ID["OFFICE_365"] = "office";
  WAZUH_MODULES_ID["GOOGLE_CLOUD_PLATFORM"] = "gcp";
  WAZUH_MODULES_ID["POLICY_MONITORING"] = "pm";
  WAZUH_MODULES_ID["SECURITY_CONFIGURATION_ASSESSMENT"] = "sca";
  WAZUH_MODULES_ID["AUDITING"] = "audit";
  WAZUH_MODULES_ID["OPEN_SCAP"] = "oscap";
  WAZUH_MODULES_ID["VULNERABILITIES"] = "vuls";
  WAZUH_MODULES_ID["OSQUERY"] = "osquery";
  WAZUH_MODULES_ID["DOCKER"] = "docker";
  WAZUH_MODULES_ID["MITRE_ATTACK"] = "mitre";
  WAZUH_MODULES_ID["PCI_DSS"] = "pci";
  WAZUH_MODULES_ID["HIPAA"] = "hipaa";
  WAZUH_MODULES_ID["NIST_800_53"] = "nist";
  WAZUH_MODULES_ID["TSC"] = "tsc";
  WAZUH_MODULES_ID["CIS_CAT"] = "ciscat";
  WAZUH_MODULES_ID["VIRUSTOTAL"] = "virustotal";
  WAZUH_MODULES_ID["GDPR"] = "gdpr";
  WAZUH_MODULES_ID["GITHUB"] = "github";
  return WAZUH_MODULES_ID;
}({});
let WAZUH_MENU_MANAGEMENT_SECTIONS_ID = exports.WAZUH_MENU_MANAGEMENT_SECTIONS_ID = /*#__PURE__*/function (WAZUH_MENU_MANAGEMENT_SECTIONS_ID) {
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["MANAGEMENT"] = "management";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["ADMINISTRATION"] = "administration";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["RULESET"] = "ruleset";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["RULES"] = "rules";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["DECODERS"] = "decoders";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["CDB_LISTS"] = "lists";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["GROUPS"] = "groups";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["CONFIGURATION"] = "configuration";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["STATUS_AND_REPORTS"] = "statusReports";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["STATUS"] = "status";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["CLUSTER"] = "monitoring";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["LOGS"] = "logs";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["REPORTING"] = "reporting";
  WAZUH_MENU_MANAGEMENT_SECTIONS_ID["STATISTICS"] = "statistics";
  return WAZUH_MENU_MANAGEMENT_SECTIONS_ID;
}({});
let WAZUH_MENU_TOOLS_SECTIONS_ID = exports.WAZUH_MENU_TOOLS_SECTIONS_ID = /*#__PURE__*/function (WAZUH_MENU_TOOLS_SECTIONS_ID) {
  WAZUH_MENU_TOOLS_SECTIONS_ID["API_CONSOLE"] = "devTools";
  WAZUH_MENU_TOOLS_SECTIONS_ID["RULESET_TEST"] = "logtest";
  return WAZUH_MENU_TOOLS_SECTIONS_ID;
}({});
let WAZUH_MENU_SECURITY_SECTIONS_ID = exports.WAZUH_MENU_SECURITY_SECTIONS_ID = /*#__PURE__*/function (WAZUH_MENU_SECURITY_SECTIONS_ID) {
  WAZUH_MENU_SECURITY_SECTIONS_ID["USERS"] = "users";
  WAZUH_MENU_SECURITY_SECTIONS_ID["ROLES"] = "roles";
  WAZUH_MENU_SECURITY_SECTIONS_ID["POLICIES"] = "policies";
  WAZUH_MENU_SECURITY_SECTIONS_ID["ROLES_MAPPING"] = "roleMapping";
  return WAZUH_MENU_SECURITY_SECTIONS_ID;
}({});
let WAZUH_MENU_SETTINGS_SECTIONS_ID = exports.WAZUH_MENU_SETTINGS_SECTIONS_ID = /*#__PURE__*/function (WAZUH_MENU_SETTINGS_SECTIONS_ID) {
  WAZUH_MENU_SETTINGS_SECTIONS_ID["SETTINGS"] = "settings";
  WAZUH_MENU_SETTINGS_SECTIONS_ID["API_CONFIGURATION"] = "api";
  WAZUH_MENU_SETTINGS_SECTIONS_ID["MODULES"] = "modules";
  WAZUH_MENU_SETTINGS_SECTIONS_ID["SAMPLE_DATA"] = "sample_data";
  WAZUH_MENU_SETTINGS_SECTIONS_ID["CONFIGURATION"] = "configuration";
  WAZUH_MENU_SETTINGS_SECTIONS_ID["LOGS"] = "logs";
  WAZUH_MENU_SETTINGS_SECTIONS_ID["MISCELLANEOUS"] = "miscellaneous";
  WAZUH_MENU_SETTINGS_SECTIONS_ID["ABOUT"] = "about";
  return WAZUH_MENU_SETTINGS_SECTIONS_ID;
}({});
const AUTHORIZED_AGENTS = exports.AUTHORIZED_AGENTS = 'authorized-agents';

// Wazuh links
const WAZUH_LINK_GITHUB = exports.WAZUH_LINK_GITHUB = 'https://github.com/wazuh';
const WAZUH_LINK_GOOGLE_GROUPS = exports.WAZUH_LINK_GOOGLE_GROUPS = 'https://groups.google.com/forum/#!forum/wazuh';
const WAZUH_LINK_SLACK = exports.WAZUH_LINK_SLACK = 'https://wazuh.com/community/join-us-on-slack';
const HEALTH_CHECK = exports.HEALTH_CHECK = 'health-check';

// Health check
const HEALTH_CHECK_REDIRECTION_TIME = exports.HEALTH_CHECK_REDIRECTION_TIME = 300; //ms

// Plugin platform settings
// Default timeFilter set by the app
const WAZUH_PLUGIN_PLATFORM_SETTING_TIME_FILTER = exports.WAZUH_PLUGIN_PLATFORM_SETTING_TIME_FILTER = {
  from: 'now-24h',
  to: 'now'
};
const PLUGIN_PLATFORM_SETTING_NAME_TIME_FILTER = exports.PLUGIN_PLATFORM_SETTING_NAME_TIME_FILTER = 'timepicker:timeDefaults';

// Default maxBuckets set by the app
const WAZUH_PLUGIN_PLATFORM_SETTING_MAX_BUCKETS = exports.WAZUH_PLUGIN_PLATFORM_SETTING_MAX_BUCKETS = 200000;
const PLUGIN_PLATFORM_SETTING_NAME_MAX_BUCKETS = exports.PLUGIN_PLATFORM_SETTING_NAME_MAX_BUCKETS = 'timeline:max_buckets';

// Default metaFields set by the app
const WAZUH_PLUGIN_PLATFORM_SETTING_METAFIELDS = exports.WAZUH_PLUGIN_PLATFORM_SETTING_METAFIELDS = ['_source', '_index'];
const PLUGIN_PLATFORM_SETTING_NAME_METAFIELDS = exports.PLUGIN_PLATFORM_SETTING_NAME_METAFIELDS = 'metaFields';

// Logger
const UI_LOGGER_LEVELS = exports.UI_LOGGER_LEVELS = {
  WARNING: 'WARNING',
  INFO: 'INFO',
  ERROR: 'ERROR'
};
const UI_TOAST_COLOR = exports.UI_TOAST_COLOR = {
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger'
};

// Assets
const ASSETS_BASE_URL_PREFIX = exports.ASSETS_BASE_URL_PREFIX = '/plugins/wazuh/assets/';
const ASSETS_PUBLIC_URL = exports.ASSETS_PUBLIC_URL = '/plugins/wazuh/public/assets/';

// Reports
const REPORTS_LOGO_IMAGE_ASSETS_RELATIVE_PATH = exports.REPORTS_LOGO_IMAGE_ASSETS_RELATIVE_PATH = 'images/logo_reports.png';
const REPORTS_PRIMARY_COLOR = exports.REPORTS_PRIMARY_COLOR = '#256BD1';
const REPORTS_PAGE_FOOTER_TEXT = exports.REPORTS_PAGE_FOOTER_TEXT = 'Copyright © Wazuh, Inc.';
const REPORTS_PAGE_HEADER_TEXT = exports.REPORTS_PAGE_HEADER_TEXT = 'info@wazuh.com\nhttps://wazuh.com';

// Plugin platform
const PLUGIN_PLATFORM_NAME = exports.PLUGIN_PLATFORM_NAME = 'dashboard';
const PLUGIN_PLATFORM_INSTALLATION_USER = exports.PLUGIN_PLATFORM_INSTALLATION_USER = 'wazuh-dashboard';
const PLUGIN_PLATFORM_INSTALLATION_USER_GROUP = exports.PLUGIN_PLATFORM_INSTALLATION_USER_GROUP = 'wazuh-dashboard';
const PLUGIN_PLATFORM_WAZUH_DOCUMENTATION_URL_PATH_UPGRADE_PLATFORM = exports.PLUGIN_PLATFORM_WAZUH_DOCUMENTATION_URL_PATH_UPGRADE_PLATFORM = 'upgrade-guide';
const PLUGIN_PLATFORM_WAZUH_DOCUMENTATION_URL_PATH_TROUBLESHOOTING = exports.PLUGIN_PLATFORM_WAZUH_DOCUMENTATION_URL_PATH_TROUBLESHOOTING = 'user-manual/wazuh-dashboard/troubleshooting.html';
const PLUGIN_PLATFORM_WAZUH_DOCUMENTATION_URL_PATH_APP_CONFIGURATION = exports.PLUGIN_PLATFORM_WAZUH_DOCUMENTATION_URL_PATH_APP_CONFIGURATION = 'user-manual/wazuh-dashboard/config-file.html';
const PLUGIN_PLATFORM_URL_GUIDE = exports.PLUGIN_PLATFORM_URL_GUIDE = 'https://opensearch.org/docs/2.10/about';
const PLUGIN_PLATFORM_URL_GUIDE_TITLE = exports.PLUGIN_PLATFORM_URL_GUIDE_TITLE = 'OpenSearch guide';
const PLUGIN_PLATFORM_REQUEST_HEADERS = exports.PLUGIN_PLATFORM_REQUEST_HEADERS = {
  'osd-xsrf': 'kibana'
};

// Plugin app
const PLUGIN_APP_NAME = exports.PLUGIN_APP_NAME = 'Dashboard';

// UI
const UI_COLOR_STATUS = exports.UI_COLOR_STATUS = {
  success: '#007871',
  danger: '#BD271E',
  warning: '#FEC514',
  disabled: '#646A77',
  info: '#6092C0',
  default: '#000000'
};
const API_NAME_AGENT_STATUS = exports.API_NAME_AGENT_STATUS = {
  ACTIVE: 'active',
  DISCONNECTED: 'disconnected',
  PENDING: 'pending',
  NEVER_CONNECTED: 'never_connected'
};
const UI_COLOR_AGENT_STATUS = exports.UI_COLOR_AGENT_STATUS = {
  [API_NAME_AGENT_STATUS.ACTIVE]: UI_COLOR_STATUS.success,
  [API_NAME_AGENT_STATUS.DISCONNECTED]: UI_COLOR_STATUS.danger,
  [API_NAME_AGENT_STATUS.PENDING]: UI_COLOR_STATUS.warning,
  [API_NAME_AGENT_STATUS.NEVER_CONNECTED]: UI_COLOR_STATUS.disabled,
  default: UI_COLOR_STATUS.default
};
const UI_LABEL_NAME_AGENT_STATUS = exports.UI_LABEL_NAME_AGENT_STATUS = {
  [API_NAME_AGENT_STATUS.ACTIVE]: 'Active',
  [API_NAME_AGENT_STATUS.DISCONNECTED]: 'Disconnected',
  [API_NAME_AGENT_STATUS.PENDING]: 'Pending',
  [API_NAME_AGENT_STATUS.NEVER_CONNECTED]: 'Never connected',
  default: 'Unknown'
};
const UI_ORDER_AGENT_STATUS = exports.UI_ORDER_AGENT_STATUS = [API_NAME_AGENT_STATUS.ACTIVE, API_NAME_AGENT_STATUS.DISCONNECTED, API_NAME_AGENT_STATUS.PENDING, API_NAME_AGENT_STATUS.NEVER_CONNECTED];
const AGENT_SYNCED_STATUS = exports.AGENT_SYNCED_STATUS = {
  SYNCED: 'synced',
  NOT_SYNCED: 'not synced'
};

// The status code can be seen here https://github.com/wazuh/wazuh/blob/686068a1f05d806b2e3b3d633a765320ae7ae114/src/wazuh_db/wdb.h#L55-L61

const AGENT_STATUS_CODE = exports.AGENT_STATUS_CODE = [{
  STATUS_CODE: 0,
  STATUS_DESCRIPTION: 'Agent is connected'
}, {
  STATUS_CODE: 1,
  STATUS_DESCRIPTION: 'Invalid agent version'
}, {
  STATUS_CODE: 2,
  STATUS_DESCRIPTION: 'Error retrieving version'
}, {
  STATUS_CODE: 3,
  STATUS_DESCRIPTION: 'Shutdown message received'
}, {
  STATUS_CODE: 4,
  STATUS_DESCRIPTION: 'Disconnected because no keepalive received'
}, {
  STATUS_CODE: 5,
  STATUS_DESCRIPTION: 'Connection reset by manager'
}];

// Documentation
const DOCUMENTATION_WEB_BASE_URL = exports.DOCUMENTATION_WEB_BASE_URL = 'https://documentation.wazuh.com';

// Default Elasticsearch user name context
const ELASTIC_NAME = exports.ELASTIC_NAME = 'elastic';

// Default Wazuh indexer name
const WAZUH_INDEXER_NAME = exports.WAZUH_INDEXER_NAME = 'indexer';

// Not timeFieldName on index pattern
const NOT_TIME_FIELD_NAME_INDEX_PATTERN = exports.NOT_TIME_FIELD_NAME_INDEX_PATTERN = 'not_time_field_name_index_pattern';

// Customization
const CUSTOMIZATION_ENDPOINT_PAYLOAD_UPLOAD_CUSTOM_FILE_MAXIMUM_BYTES = exports.CUSTOMIZATION_ENDPOINT_PAYLOAD_UPLOAD_CUSTOM_FILE_MAXIMUM_BYTES = 1048576;

// Plugin settings
let SettingCategory = exports.SettingCategory = /*#__PURE__*/function (SettingCategory) {
  SettingCategory[SettingCategory["GENERAL"] = 0] = "GENERAL";
  SettingCategory[SettingCategory["HEALTH_CHECK"] = 1] = "HEALTH_CHECK";
  SettingCategory[SettingCategory["MONITORING"] = 2] = "MONITORING";
  SettingCategory[SettingCategory["STATISTICS"] = 3] = "STATISTICS";
  SettingCategory[SettingCategory["VULNERABILITIES"] = 4] = "VULNERABILITIES";
  SettingCategory[SettingCategory["SECURITY"] = 5] = "SECURITY";
  SettingCategory[SettingCategory["CUSTOMIZATION"] = 6] = "CUSTOMIZATION";
  SettingCategory[SettingCategory["API_CONNECTION"] = 7] = "API_CONNECTION";
  return SettingCategory;
}({});
let EpluginSettingType = exports.EpluginSettingType = /*#__PURE__*/function (EpluginSettingType) {
  EpluginSettingType["text"] = "text";
  EpluginSettingType["textarea"] = "textarea";
  EpluginSettingType["switch"] = "switch";
  EpluginSettingType["number"] = "number";
  EpluginSettingType["editor"] = "editor";
  EpluginSettingType["select"] = "select";
  EpluginSettingType["filepicker"] = "filepicker";
  EpluginSettingType["password"] = "password";
  EpluginSettingType["arrayOf"] = "arrayOf";
  EpluginSettingType["custom"] = "custom";
  return EpluginSettingType;
}({});
const PLUGIN_SETTINGS_CATEGORIES = exports.PLUGIN_SETTINGS_CATEGORIES = {
  [SettingCategory.HEALTH_CHECK]: {
    title: 'Health check',
    description: "Checks will be executed by the app's Healthcheck.",
    renderOrder: SettingCategory.HEALTH_CHECK
  },
  [SettingCategory.GENERAL]: {
    title: 'General',
    description: 'Basic app settings related to alerts index pattern, hide the manager alerts in the dashboards, logs level and more.',
    renderOrder: SettingCategory.GENERAL
  },
  [SettingCategory.SECURITY]: {
    title: 'Security',
    description: 'Application security options such as unauthorized roles.',
    renderOrder: SettingCategory.SECURITY
  },
  [SettingCategory.MONITORING]: {
    title: 'Task:Monitoring',
    description: 'Options related to the agent status monitoring job and its storage in indexes.',
    renderOrder: SettingCategory.MONITORING
  },
  [SettingCategory.STATISTICS]: {
    title: 'Task:Statistics',
    description: 'Options related to the daemons manager monitoring job and their storage in indexes.',
    renderOrder: SettingCategory.STATISTICS
  },
  [SettingCategory.VULNERABILITIES]: {
    title: 'Vulnerabilities',
    description: 'Options related to the agent vulnerabilities monitoring job and its storage in indexes.',
    renderOrder: SettingCategory.VULNERABILITIES
  },
  [SettingCategory.CUSTOMIZATION]: {
    title: 'Custom branding',
    description: 'If you want to use custom branding elements such as logos, you can do so by editing the settings below.',
    documentationLink: 'user-manual/wazuh-dashboard/white-labeling.html',
    renderOrder: SettingCategory.CUSTOMIZATION
  },
  [SettingCategory.API_CONNECTION]: {
    title: 'API connections',
    description: 'Options related to the API connections.',
    renderOrder: SettingCategory.API_CONNECTION
  }
};
const PLUGIN_SETTINGS = exports.PLUGIN_SETTINGS = {
  'alerts.sample.prefix': {
    title: 'Sample alerts prefix',
    description: 'Define the index name prefix of sample alerts. It must match the template used by the index pattern to avoid unknown fields in dashboards.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.GENERAL,
    type: EpluginSettingType.text,
    defaultValue: WAZUH_SAMPLE_ALERT_PREFIX,
    isConfigurableFromSettings: true,
    requiresRunningHealthCheck: true,
    validateUIForm: function (value) {
      return this.validate(value);
    },
    // Validation: https://github.com/elastic/elasticsearch/blob/v7.10.2/docs/reference/indices/create-index.asciidoc
    validate: _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isString, _settingsValidator.SettingsValidator.isNotEmptyString, _settingsValidator.SettingsValidator.hasNoSpaces, _settingsValidator.SettingsValidator.noStartsWithString('-', '_', '+', '.'), _settingsValidator.SettingsValidator.hasNotInvalidCharacters('\\', '/', '?', '"', '<', '>', '|', ',', '#', '*'))
  },
  'checks.api': {
    title: 'API connection',
    description: 'Enable or disable the API health check when opening the app.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.HEALTH_CHECK,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromSettings: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean
  },
  'checks.fields': {
    title: 'Known fields',
    description: 'Enable or disable the known fields health check when opening the app.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.HEALTH_CHECK,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromSettings: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean
  },
  'checks.maxBuckets': {
    title: 'Set max buckets to 200000',
    description: 'Change the default value of the plugin platform max buckets configuration.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.HEALTH_CHECK,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromSettings: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean
  },
  'checks.metaFields': {
    title: 'Remove meta fields',
    description: 'Change the default value of the plugin platform metaField configuration.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.HEALTH_CHECK,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromSettings: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean
  },
  'checks.pattern': {
    title: 'Index pattern',
    description: 'Enable or disable the index pattern health check when opening the app.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.HEALTH_CHECK,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromSettings: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean
  },
  'checks.setup': {
    title: 'API version',
    description: 'Enable or disable the setup health check when opening the app.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.HEALTH_CHECK,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromSettings: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean
  },
  'checks.template': {
    title: 'Index template',
    description: 'Enable or disable the template health check when opening the app.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.HEALTH_CHECK,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromSettings: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean
  },
  'checks.timeFilter': {
    title: 'Set time filter to 24h',
    description: 'Change the default value of the plugin platform timeFilter configuration.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.HEALTH_CHECK,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromSettings: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean
  },
  'configuration.ui_api_editable': {
    title: 'Configuration UI editable',
    description: 'Enable or disable the ability to edit the configuration from UI or API endpoints. When disabled, this can only be edited from the configuration file, the related API endpoints are disabled, and the UI is inaccessible.',
    store: {
      file: {
        configurableManaged: false
      }
    },
    category: SettingCategory.GENERAL,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromSettings: false,
    requiresRestartingPluginPlatform: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean
  },
  'cron.prefix': {
    title: 'Cron prefix',
    description: 'Define the index prefix of predefined jobs.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.GENERAL,
    type: EpluginSettingType.text,
    defaultValue: WAZUH_STATISTICS_DEFAULT_PREFIX,
    isConfigurableFromSettings: true,
    validateUIForm: function (value) {
      return this.validate(value);
    },
    // Validation: https://github.com/elastic/elasticsearch/blob/v7.10.2/docs/reference/indices/create-index.asciidoc
    validate: _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isString, _settingsValidator.SettingsValidator.isNotEmptyString, _settingsValidator.SettingsValidator.hasNoSpaces, _settingsValidator.SettingsValidator.noStartsWithString('-', '_', '+', '.'), _settingsValidator.SettingsValidator.hasNotInvalidCharacters('\\', '/', '?', '"', '<', '>', '|', ',', '#', '*'))
  },
  'cron.statistics.apis': {
    title: 'Includes APIs',
    description: 'Enter the ID of the hosts you want to save data from, leave this empty to run the task on every host.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.STATISTICS,
    type: EpluginSettingType.editor,
    defaultValue: [],
    isConfigurableFromSettings: true,
    options: {
      editor: {
        language: 'json'
      }
    },
    uiFormTransformConfigurationValueToInputValue: function (value) {
      return JSON.stringify(value);
    },
    uiFormTransformInputValueToConfigurationValue: function (value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        return value;
      }
    },
    validateUIForm: function (value) {
      return _settingsValidator.SettingsValidator.json(this.validate)(value);
    },
    validate: _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.array(_settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isString, _settingsValidator.SettingsValidator.isNotEmptyString, _settingsValidator.SettingsValidator.hasNoSpaces)))
  },
  'cron.statistics.index.creation': {
    title: 'Index creation',
    description: 'Define the interval in which a new index will be created.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.STATISTICS,
    type: EpluginSettingType.select,
    options: {
      select: [{
        text: 'Hourly',
        value: 'h'
      }, {
        text: 'Daily',
        value: 'd'
      }, {
        text: 'Weekly',
        value: 'w'
      }, {
        text: 'Monthly',
        value: 'm'
      }]
    },
    defaultValue: WAZUH_STATISTICS_DEFAULT_CREATION,
    isConfigurableFromSettings: true,
    requiresRunningHealthCheck: true,
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: function (value) {
      return _settingsValidator.SettingsValidator.literal(this.options.select.map(({
        value
      }) => value))(value);
    }
  },
  'cron.statistics.index.name': {
    title: 'Index name',
    description: 'Define the name of the index in which the documents will be saved.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.STATISTICS,
    type: EpluginSettingType.text,
    defaultValue: WAZUH_STATISTICS_DEFAULT_NAME,
    isConfigurableFromSettings: true,
    requiresRunningHealthCheck: true,
    validateUIForm: function (value) {
      return this.validate(value);
    },
    // Validation: https://github.com/elastic/elasticsearch/blob/v7.10.2/docs/reference/indices/create-index.asciidoc
    validate: _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isString, _settingsValidator.SettingsValidator.isNotEmptyString, _settingsValidator.SettingsValidator.hasNoSpaces, _settingsValidator.SettingsValidator.noStartsWithString('-', '_', '+', '.'), _settingsValidator.SettingsValidator.hasNotInvalidCharacters('\\', '/', '?', '"', '<', '>', '|', ',', '#', '*'))
  },
  'cron.statistics.index.replicas': {
    title: 'Index replicas',
    description: 'Define the number of replicas to use for the statistics indices.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.STATISTICS,
    type: EpluginSettingType.number,
    defaultValue: WAZUH_STATISTICS_DEFAULT_INDICES_REPLICAS,
    isConfigurableFromSettings: true,
    requiresRunningHealthCheck: true,
    options: {
      number: {
        min: 0,
        integer: true
      }
    },
    uiFormTransformConfigurationValueToInputValue: function (value) {
      return String(value);
    },
    uiFormTransformInputValueToConfigurationValue: function (value) {
      return Number(value);
    },
    validateUIForm: function (value) {
      return this.validate(this.uiFormTransformInputValueToConfigurationValue(value));
    },
    validate: function (value) {
      return _settingsValidator.SettingsValidator.number(this.options.number)(value);
    }
  },
  'cron.statistics.index.shards': {
    title: 'Index shards',
    description: 'Define the number of shards to use for the statistics indices.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.STATISTICS,
    type: EpluginSettingType.number,
    defaultValue: WAZUH_STATISTICS_DEFAULT_INDICES_SHARDS,
    isConfigurableFromSettings: true,
    requiresRunningHealthCheck: true,
    options: {
      number: {
        min: 1,
        integer: true
      }
    },
    uiFormTransformConfigurationValueToInputValue: function (value) {
      return String(value);
    },
    uiFormTransformInputValueToConfigurationValue: function (value) {
      return Number(value);
    },
    validateUIForm: function (value) {
      return this.validate(this.uiFormTransformInputValueToConfigurationValue(value));
    },
    validate: function (value) {
      return _settingsValidator.SettingsValidator.number(this.options.number)(value);
    }
  },
  'cron.statistics.interval': {
    title: 'Interval',
    description: 'Define the frequency of task execution using cron schedule expressions.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.STATISTICS,
    type: EpluginSettingType.text,
    defaultValue: WAZUH_STATISTICS_DEFAULT_CRON_FREQ,
    isConfigurableFromSettings: true,
    requiresRestartingPluginPlatform: true
    // Workaround: this need to be defined in the frontend side and backend side because an optimization error in the frontend side related to some module can not be loaded.
    // validateUIForm: function (value) {
    // },
    // validate: function (value) {
    // },
  },

  'cron.statistics.status': {
    title: 'Status',
    description: 'Enable or disable the statistics tasks.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.STATISTICS,
    type: EpluginSettingType.switch,
    defaultValue: WAZUH_STATISTICS_DEFAULT_STATUS,
    isConfigurableFromSettings: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean
  },
  'customization.enabled': {
    title: 'Status',
    description: 'Enable or disable the customization.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.CUSTOMIZATION,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromSettings: true,
    requiresReloadingBrowserTab: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean
  },
  'customization.logo.app': {
    title: 'App main logo',
    description: `This logo is used as loading indicator while the user is logging into Wazuh API.`,
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.CUSTOMIZATION,
    type: EpluginSettingType.filepicker,
    defaultValue: '',
    isConfigurableFromSettings: true,
    options: {
      file: {
        type: 'image',
        extensions: ['.jpeg', '.jpg', '.png', '.svg'],
        size: {
          maxBytes: CUSTOMIZATION_ENDPOINT_PAYLOAD_UPLOAD_CUSTOM_FILE_MAXIMUM_BYTES
        },
        recommended: {
          dimensions: {
            width: 300,
            height: 70,
            unit: 'px'
          }
        },
        store: {
          relativePathFileSystem: 'public/assets/custom/images',
          filename: 'customization.logo.app',
          resolveStaticURL: filename => `custom/images/${filename}?v=${Date.now()}`
          // ?v=${Date.now()} is used to force the browser to reload the image when a new file is uploaded
        }
      }
    },

    validateUIForm: function (value) {
      return _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.filePickerFileSize({
        ...this.options.file.size,
        meaningfulUnit: true
      }), _settingsValidator.SettingsValidator.filePickerSupportedExtensions(this.options.file.extensions))(value);
    }
  },
  'customization.logo.healthcheck': {
    title: 'Healthcheck logo',
    description: `This logo is displayed during the Healthcheck routine of the app.`,
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.CUSTOMIZATION,
    type: EpluginSettingType.filepicker,
    defaultValue: '',
    isConfigurableFromSettings: true,
    options: {
      file: {
        type: 'image',
        extensions: ['.jpeg', '.jpg', '.png', '.svg'],
        size: {
          maxBytes: CUSTOMIZATION_ENDPOINT_PAYLOAD_UPLOAD_CUSTOM_FILE_MAXIMUM_BYTES
        },
        recommended: {
          dimensions: {
            width: 300,
            height: 70,
            unit: 'px'
          }
        },
        store: {
          relativePathFileSystem: 'public/assets/custom/images',
          filename: 'customization.logo.healthcheck',
          resolveStaticURL: filename => `custom/images/${filename}?v=${Date.now()}`
          // ?v=${Date.now()} is used to force the browser to reload the image when a new file is uploaded
        }
      }
    },

    validateUIForm: function (value) {
      return _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.filePickerFileSize({
        ...this.options.file.size,
        meaningfulUnit: true
      }), _settingsValidator.SettingsValidator.filePickerSupportedExtensions(this.options.file.extensions))(value);
    }
  },
  'customization.logo.reports': {
    title: 'PDF reports logo',
    description: `This logo is used in the PDF reports generated by the app. It's placed at the top left corner of every page of the PDF.`,
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.CUSTOMIZATION,
    type: EpluginSettingType.filepicker,
    defaultValue: '',
    defaultValueIfNotSet: REPORTS_LOGO_IMAGE_ASSETS_RELATIVE_PATH,
    isConfigurableFromSettings: true,
    options: {
      file: {
        type: 'image',
        extensions: ['.jpeg', '.jpg', '.png'],
        size: {
          maxBytes: CUSTOMIZATION_ENDPOINT_PAYLOAD_UPLOAD_CUSTOM_FILE_MAXIMUM_BYTES
        },
        recommended: {
          dimensions: {
            width: 190,
            height: 40,
            unit: 'px'
          }
        },
        store: {
          relativePathFileSystem: 'public/assets/custom/images',
          filename: 'customization.logo.reports',
          resolveStaticURL: filename => `custom/images/${filename}`
        }
      }
    },
    validateUIForm: function (value) {
      return _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.filePickerFileSize({
        ...this.options.file.size,
        meaningfulUnit: true
      }), _settingsValidator.SettingsValidator.filePickerSupportedExtensions(this.options.file.extensions))(value);
    }
  },
  'customization.reports.footer': {
    title: 'Reports footer',
    description: 'Set the footer of the reports.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.CUSTOMIZATION,
    type: EpluginSettingType.textarea,
    defaultValue: '',
    defaultValueIfNotSet: REPORTS_PAGE_FOOTER_TEXT,
    isConfigurableFromSettings: true,
    options: {
      maxRows: 2,
      maxLength: 50
    },
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: function (value) {
      var _this$options, _this$options2;
      return _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isString, _settingsValidator.SettingsValidator.multipleLinesString({
        maxRows: (_this$options = this.options) === null || _this$options === void 0 ? void 0 : _this$options.maxRows,
        maxLength: (_this$options2 = this.options) === null || _this$options2 === void 0 ? void 0 : _this$options2.maxLength
      }))(value);
    }
  },
  'customization.reports.header': {
    title: 'Reports header',
    description: 'Set the header of the reports.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.CUSTOMIZATION,
    type: EpluginSettingType.textarea,
    defaultValue: '',
    defaultValueIfNotSet: REPORTS_PAGE_HEADER_TEXT,
    isConfigurableFromSettings: true,
    options: {
      maxRows: 3,
      maxLength: 40
    },
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: function (value) {
      var _this$options3, _this$options4;
      return _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isString, _settingsValidator.SettingsValidator.multipleLinesString({
        maxRows: (_this$options3 = this.options) === null || _this$options3 === void 0 ? void 0 : _this$options3.maxRows,
        maxLength: (_this$options4 = this.options) === null || _this$options4 === void 0 ? void 0 : _this$options4.maxLength
      }))(value);
    }
  },
  'enrollment.dns': {
    title: 'Enrollment DNS',
    description: 'Specifies the Wazuh registration server, used for the agent enrollment.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.GENERAL,
    type: EpluginSettingType.text,
    defaultValue: '',
    isConfigurableFromSettings: true,
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isString, _settingsValidator.SettingsValidator.serverAddressHostnameFQDNIPv4IPv6)
  },
  'enrollment.password': {
    title: 'Enrollment password',
    description: 'Specifies the password used to authenticate during the agent enrollment.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.GENERAL,
    type: EpluginSettingType.text,
    defaultValue: '',
    isConfigurableFromSettings: false,
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isString, _settingsValidator.SettingsValidator.isNotEmptyString)
  },
  hideManagerAlerts: {
    title: 'Hide manager alerts',
    description: 'Hide the alerts of the manager in every dashboard.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.GENERAL,
    type: EpluginSettingType.switch,
    defaultValue: false,
    isConfigurableFromSettings: true,
    requiresReloadingBrowserTab: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean
  },
  hosts: {
    title: 'Server hosts',
    description: 'Configure the API connections.',
    category: SettingCategory.API_CONNECTION,
    type: EpluginSettingType.arrayOf,
    defaultValue: [],
    store: {
      file: {
        configurableManaged: false,
        defaultBlock: `# The following configuration is the default structure to define a host.
#
# hosts:
#   # Host ID / name,
#   - env-1:
#       # Host URL
#       url: https://env-1.example
#       # Host / API port
#       port: 55000
#       # Host / API username
#       username: wazuh-wui
#       # Host / API password
#       password: wazuh-wui
#       # Use RBAC or not. If set to true, the username must be "wazuh-wui".
#       run_as: true
#   - env-2:
#       url: https://env-2.example
#       port: 55000
#       username: wazuh-wui
#       password: wazuh-wui
#       run_as: true

hosts:
  - default:
      url: https://localhost
      port: 55000
      username: wazuh-wui
      password: wazuh-wui
      run_as: false`,
        transformFrom: value => {
          return value.map(hostData => {
            var _Object$keys;
            const key = (_Object$keys = Object.keys(hostData)) === null || _Object$keys === void 0 ? void 0 : _Object$keys[0];
            return {
              ...hostData[key],
              id: key
            };
          });
        }
      }
    },
    options: {
      arrayOf: {
        id: {
          title: 'Identifier',
          description: 'Identifier of the API connection. This must be unique.',
          type: EpluginSettingType.text,
          defaultValue: 'default',
          isConfigurableFromSettings: true,
          validateUIForm: function (value) {
            return this.validate(value);
          },
          validate: _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isString, _settingsValidator.SettingsValidator.isNotEmptyString)
        },
        url: {
          title: 'URL',
          description: 'Server URL address',
          type: EpluginSettingType.text,
          defaultValue: 'https://localhost',
          isConfigurableFromSettings: true,
          validateUIForm: function (value) {
            return this.validate(value);
          },
          validate: _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isString, _settingsValidator.SettingsValidator.isNotEmptyString)
        },
        port: {
          title: 'Port',
          description: 'Port',
          type: EpluginSettingType.number,
          defaultValue: 55000,
          isConfigurableFromSettings: true,
          options: {
            number: {
              min: 0,
              max: 65535,
              integer: true
            }
          },
          uiFormTransformConfigurationValueToInputValue: function (value) {
            return String(value);
          },
          uiFormTransformInputValueToConfigurationValue: function (value) {
            return Number(value);
          },
          validateUIForm: function (value) {
            return this.validate(this.uiFormTransformInputValueToConfigurationValue(value));
          },
          validate: function (value) {
            return _settingsValidator.SettingsValidator.number(this.options.number)(value);
          }
        },
        username: {
          title: 'Username',
          description: 'Server API username',
          type: EpluginSettingType.text,
          defaultValue: 'wazuh-wui',
          isConfigurableFromSettings: true,
          validateUIForm: function (value) {
            return this.validate(value);
          },
          validate: _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isString, _settingsValidator.SettingsValidator.isNotEmptyString)
        },
        password: {
          title: 'Password',
          description: "User's Password",
          type: EpluginSettingType.password,
          defaultValue: 'wazuh-wui',
          isConfigurableFromSettings: true,
          validateUIForm: function (value) {
            return this.validate(value);
          },
          validate: _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isString, _settingsValidator.SettingsValidator.isNotEmptyString)
        },
        run_as: {
          title: 'Run as',
          description: 'Use the authentication context.',
          type: EpluginSettingType.switch,
          defaultValue: false,
          isConfigurableFromSettings: true,
          options: {
            switch: {
              values: {
                disabled: {
                  label: 'false',
                  value: false
                },
                enabled: {
                  label: 'true',
                  value: true
                }
              }
            }
          },
          uiFormTransformChangedInputValue: function (value) {
            return Boolean(value);
          },
          validateUIForm: function (value) {
            return this.validate(value);
          },
          validate: _settingsValidator.SettingsValidator.isBoolean
        }
      }
    },
    isConfigurableFromSettings: false,
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    }
    // TODO: add validation
    // validate: SettingsValidator.isBoolean,
    // validate: function (schema) {
    //   return schema.boolean();
    // },
  },

  'ip.ignore': {
    title: 'Index pattern ignore',
    description: 'Disable certain index pattern names from being available in index pattern selector.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.GENERAL,
    type: EpluginSettingType.editor,
    defaultValue: [],
    isConfigurableFromSettings: true,
    options: {
      editor: {
        language: 'json'
      }
    },
    uiFormTransformConfigurationValueToInputValue: function (value) {
      return JSON.stringify(value);
    },
    uiFormTransformInputValueToConfigurationValue: function (value) {
      try {
        return JSON.parse(value);
      } catch (error) {
        return value;
      }
    },
    // Validation: https://github.com/elastic/elasticsearch/blob/v7.10.2/docs/reference/indices/create-index.asciidoc
    validateUIForm: function (value) {
      return _settingsValidator.SettingsValidator.json(this.validate)(value);
    },
    validate: _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.array(_settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isString, _settingsValidator.SettingsValidator.isNotEmptyString, _settingsValidator.SettingsValidator.hasNoSpaces, _settingsValidator.SettingsValidator.noLiteralString('.', '..'), _settingsValidator.SettingsValidator.noStartsWithString('-', '_', '+', '.'), _settingsValidator.SettingsValidator.hasNotInvalidCharacters('\\', '/', '?', '"', '<', '>', '|', ',', '#'))))
  },
  'ip.selector': {
    title: 'IP selector',
    description: 'Define if the user is allowed to change the selected index pattern directly from the top menu bar.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.GENERAL,
    type: EpluginSettingType.switch,
    defaultValue: true,
    isConfigurableFromSettings: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean
  },
  'wazuh.updates.disabled': {
    title: 'Check updates',
    description: 'Define if the check updates service is active.',
    category: SettingCategory.GENERAL,
    type: EpluginSettingType.switch,
    defaultValue: false,
    store: {
      file: {
        configurableManaged: false
      }
    },
    isConfigurableFromSettings: false,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean
  },
  pattern: {
    title: 'Index pattern',
    store: {
      file: {
        configurableManaged: true
      }
    },
    description: "Default index pattern to use on the app. If there's no valid index pattern, the app will automatically create one with the name indicated in this option.",
    category: SettingCategory.GENERAL,
    type: EpluginSettingType.text,
    defaultValue: WAZUH_ALERTS_PATTERN,
    isConfigurableFromSettings: true,
    requiresRunningHealthCheck: true,
    // Validation: https://github.com/elastic/elasticsearch/blob/v7.10.2/docs/reference/indices/create-index.asciidoc
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isString, _settingsValidator.SettingsValidator.isNotEmptyString, _settingsValidator.SettingsValidator.hasNoSpaces, _settingsValidator.SettingsValidator.noLiteralString('.', '..'), _settingsValidator.SettingsValidator.noStartsWithString('-', '_', '+', '.'), _settingsValidator.SettingsValidator.hasNotInvalidCharacters('\\', '/', '?', '"', '<', '>', '|', ',', '#'))
  },
  timeout: {
    title: 'Request timeout',
    store: {
      file: {
        configurableManaged: true
      }
    },
    description: 'Maximum time, in milliseconds, the app will wait for an API response when making requests to it. It will be ignored if the value is set under 1500 milliseconds.',
    category: SettingCategory.GENERAL,
    type: EpluginSettingType.number,
    defaultValue: 20000,
    isConfigurableFromSettings: true,
    options: {
      number: {
        min: 1500,
        integer: true
      }
    },
    uiFormTransformConfigurationValueToInputValue: function (value) {
      return String(value);
    },
    uiFormTransformInputValueToConfigurationValue: function (value) {
      return Number(value);
    },
    validateUIForm: function (value) {
      return this.validate(this.uiFormTransformInputValueToConfigurationValue(value));
    },
    validate: function (value) {
      return _settingsValidator.SettingsValidator.number(this.options.number)(value);
    }
  },
  'wazuh.monitoring.creation': {
    title: 'Index creation',
    description: 'Define the interval in which a new wazuh-monitoring index will be created.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.MONITORING,
    type: EpluginSettingType.select,
    options: {
      select: [{
        text: 'Hourly',
        value: 'h'
      }, {
        text: 'Daily',
        value: 'd'
      }, {
        text: 'Weekly',
        value: 'w'
      }, {
        text: 'Monthly',
        value: 'm'
      }]
    },
    defaultValue: WAZUH_MONITORING_DEFAULT_CREATION,
    isConfigurableFromSettings: true,
    requiresRunningHealthCheck: true,
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: function (value) {
      return _settingsValidator.SettingsValidator.literal(this.options.select.map(({
        value
      }) => value))(value);
    }
  },
  'wazuh.monitoring.enabled': {
    title: 'Status',
    description: 'Enable or disable the wazuh-monitoring index creation and/or visualization.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.MONITORING,
    type: EpluginSettingType.switch,
    defaultValue: WAZUH_MONITORING_DEFAULT_ENABLED,
    isConfigurableFromSettings: true,
    requiresRestartingPluginPlatform: true,
    options: {
      switch: {
        values: {
          disabled: {
            label: 'false',
            value: false
          },
          enabled: {
            label: 'true',
            value: true
          }
        }
      }
    },
    uiFormTransformChangedInputValue: function (value) {
      return Boolean(value);
    },
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: _settingsValidator.SettingsValidator.isBoolean
  },
  'wazuh.monitoring.frequency': {
    title: 'Frequency',
    description: 'Frequency, in seconds, of API requests to get the state of the agents and create a new document in the wazuh-monitoring index with this data.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.MONITORING,
    type: EpluginSettingType.number,
    defaultValue: WAZUH_MONITORING_DEFAULT_FREQUENCY,
    isConfigurableFromSettings: true,
    requiresRestartingPluginPlatform: true,
    options: {
      number: {
        min: 60,
        integer: true
      }
    },
    uiFormTransformConfigurationValueToInputValue: function (value) {
      return String(value);
    },
    uiFormTransformInputValueToConfigurationValue: function (value) {
      return Number(value);
    },
    validateUIForm: function (value) {
      return this.validate(this.uiFormTransformInputValueToConfigurationValue(value));
    },
    validate: function (value) {
      return _settingsValidator.SettingsValidator.number(this.options.number)(value);
    }
  },
  'wazuh.monitoring.pattern': {
    title: 'Index pattern',
    description: 'Default index pattern to use for Wazuh monitoring.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.MONITORING,
    type: EpluginSettingType.text,
    defaultValue: WAZUH_MONITORING_PATTERN,
    isConfigurableFromSettings: true,
    requiresRunningHealthCheck: true,
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isString, _settingsValidator.SettingsValidator.isNotEmptyString, _settingsValidator.SettingsValidator.hasNoSpaces, _settingsValidator.SettingsValidator.noLiteralString('.', '..'), _settingsValidator.SettingsValidator.noStartsWithString('-', '_', '+', '.'), _settingsValidator.SettingsValidator.hasNotInvalidCharacters('\\', '/', '?', '"', '<', '>', '|', ',', '#'))
  },
  'wazuh.monitoring.replicas': {
    title: 'Index replicas',
    description: 'Define the number of replicas to use for the wazuh-monitoring-* indices.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.MONITORING,
    type: EpluginSettingType.number,
    defaultValue: WAZUH_MONITORING_DEFAULT_INDICES_REPLICAS,
    isConfigurableFromSettings: true,
    requiresRunningHealthCheck: true,
    options: {
      number: {
        min: 0,
        integer: true
      }
    },
    uiFormTransformConfigurationValueToInputValue: function (value) {
      return String(value);
    },
    uiFormTransformInputValueToConfigurationValue: function (value) {
      return Number(value);
    },
    validateUIForm: function (value) {
      return this.validate(this.uiFormTransformInputValueToConfigurationValue(value));
    },
    validate: function (value) {
      return _settingsValidator.SettingsValidator.number(this.options.number)(value);
    }
  },
  'wazuh.monitoring.shards': {
    title: 'Index shards',
    description: 'Define the number of shards to use for the wazuh-monitoring-* indices.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.MONITORING,
    type: EpluginSettingType.number,
    defaultValue: WAZUH_MONITORING_DEFAULT_INDICES_SHARDS,
    isConfigurableFromSettings: true,
    requiresRunningHealthCheck: true,
    options: {
      number: {
        min: 1,
        integer: true
      }
    },
    uiFormTransformConfigurationValueToInputValue: function (value) {
      return String(value);
    },
    uiFormTransformInputValueToConfigurationValue: function (value) {
      return Number(value);
    },
    validateUIForm: function (value) {
      return this.validate(this.uiFormTransformInputValueToConfigurationValue(value));
    },
    validate: function (value) {
      return _settingsValidator.SettingsValidator.number(this.options.number)(value);
    }
  },
  'vulnerabilities.pattern': {
    title: 'Index pattern',
    description: 'Default index pattern to use for vulnerabilities.',
    store: {
      file: {
        configurableManaged: true
      }
    },
    category: SettingCategory.VULNERABILITIES,
    type: EpluginSettingType.text,
    defaultValue: WAZUH_VULNERABILITIES_PATTERN,
    isConfigurableFromSettings: true,
    requiresRunningHealthCheck: false,
    validateUIForm: function (value) {
      return this.validate(value);
    },
    validate: _settingsValidator.SettingsValidator.compose(_settingsValidator.SettingsValidator.isString, _settingsValidator.SettingsValidator.isNotEmptyString, _settingsValidator.SettingsValidator.hasNoSpaces, _settingsValidator.SettingsValidator.noLiteralString('.', '..'), _settingsValidator.SettingsValidator.noStartsWithString('-', '_', '+', '.'), _settingsValidator.SettingsValidator.hasNotInvalidCharacters('\\', '/', '?', '"', '<', '>', '|', ',', '#'))
  }
};
let HTTP_STATUS_CODES = exports.HTTP_STATUS_CODES = /*#__PURE__*/function (HTTP_STATUS_CODES) {
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["CONTINUE"] = 100] = "CONTINUE";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["SWITCHING_PROTOCOLS"] = 101] = "SWITCHING_PROTOCOLS";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["PROCESSING"] = 102] = "PROCESSING";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["OK"] = 200] = "OK";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["CREATED"] = 201] = "CREATED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["ACCEPTED"] = 202] = "ACCEPTED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["NON_AUTHORITATIVE_INFORMATION"] = 203] = "NON_AUTHORITATIVE_INFORMATION";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["NO_CONTENT"] = 204] = "NO_CONTENT";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["RESET_CONTENT"] = 205] = "RESET_CONTENT";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["PARTIAL_CONTENT"] = 206] = "PARTIAL_CONTENT";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["MULTI_STATUS"] = 207] = "MULTI_STATUS";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["MULTIPLE_CHOICES"] = 300] = "MULTIPLE_CHOICES";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["MOVED_PERMANENTLY"] = 301] = "MOVED_PERMANENTLY";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["MOVED_TEMPORARILY"] = 302] = "MOVED_TEMPORARILY";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["SEE_OTHER"] = 303] = "SEE_OTHER";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["USE_PROXY"] = 305] = "USE_PROXY";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["TEMPORARY_REDIRECT"] = 307] = "TEMPORARY_REDIRECT";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["PERMANENT_REDIRECT"] = 308] = "PERMANENT_REDIRECT";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["BAD_REQUEST"] = 400] = "BAD_REQUEST";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["FORBIDDEN"] = 403] = "FORBIDDEN";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["NOT_FOUND"] = 404] = "NOT_FOUND";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["PROXY_AUTHENTICATION_REQUIRED"] = 407] = "PROXY_AUTHENTICATION_REQUIRED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["CONFLICT"] = 409] = "CONFLICT";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["GONE"] = 410] = "GONE";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["LENGTH_REQUIRED"] = 411] = "LENGTH_REQUIRED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["REQUEST_TOO_LONG"] = 413] = "REQUEST_TOO_LONG";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["REQUEST_URI_TOO_LONG"] = 414] = "REQUEST_URI_TOO_LONG";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["REQUESTED_RANGE_NOT_SATISFIABLE"] = 416] = "REQUESTED_RANGE_NOT_SATISFIABLE";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["EXPECTATION_FAILED"] = 417] = "EXPECTATION_FAILED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["IM_A_TEAPOT"] = 418] = "IM_A_TEAPOT";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["INSUFFICIENT_SPACE_ON_RESOURCE"] = 419] = "INSUFFICIENT_SPACE_ON_RESOURCE";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["METHOD_FAILURE"] = 420] = "METHOD_FAILURE";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["MISDIRECTED_REQUEST"] = 421] = "MISDIRECTED_REQUEST";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["LOCKED"] = 423] = "LOCKED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["FAILED_DEPENDENCY"] = 424] = "FAILED_DEPENDENCY";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["PRECONDITION_REQUIRED"] = 428] = "PRECONDITION_REQUIRED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["REQUEST_HEADER_FIELDS_TOO_LARGE"] = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["UNAVAILABLE_FOR_LEGAL_REASONS"] = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["HTTP_VERSION_NOT_SUPPORTED"] = 505] = "HTTP_VERSION_NOT_SUPPORTED";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["INSUFFICIENT_STORAGE"] = 507] = "INSUFFICIENT_STORAGE";
  HTTP_STATUS_CODES[HTTP_STATUS_CODES["NETWORK_AUTHENTICATION_REQUIRED"] = 511] = "NETWORK_AUTHENTICATION_REQUIRED";
  return HTTP_STATUS_CODES;
}({}); // Module Security configuration assessment
const MODULE_SCA_CHECK_RESULT_LABEL = exports.MODULE_SCA_CHECK_RESULT_LABEL = {
  passed: 'Passed',
  failed: 'Failed',
  'not applicable': 'Not applicable'
};

// Search bar

// This limits the results in the API request
const SEARCH_BAR_WQL_VALUE_SUGGESTIONS_COUNT = exports.SEARCH_BAR_WQL_VALUE_SUGGESTIONS_COUNT = 30;
// This limits the suggestions for the token of type value displayed in the search bar
const SEARCH_BAR_WQL_VALUE_SUGGESTIONS_DISPLAY_COUNT = exports.SEARCH_BAR_WQL_VALUE_SUGGESTIONS_DISPLAY_COUNT = 10;
/* Time in milliseconds to debounce the analysis of search bar. This mitigates some problems related
to changes running in parallel */
const SEARCH_BAR_DEBOUNCE_UPDATE_TIME = exports.SEARCH_BAR_DEBOUNCE_UPDATE_TIME = 400;

// Plugin settings
const WAZUH_CORE_ENCRYPTION_PASSWORD = exports.WAZUH_CORE_ENCRYPTION_PASSWORD = 'secretencryptionkey!';

// Configuration backend service
const WAZUH_CORE_CONFIGURATION_INSTANCE = exports.WAZUH_CORE_CONFIGURATION_INSTANCE = 'wazuh-dashboard';
const WAZUH_CORE_CONFIGURATION_CACHE_SECONDS = exports.WAZUH_CORE_CONFIGURATION_CACHE_SECONDS = 10;

// API connection permissions
const WAZUH_ROLE_ADMINISTRATOR_ID = exports.WAZUH_ROLE_ADMINISTRATOR_ID = 1;

// ID used to refer the createOsdUrlStateStorage state
const OSD_URL_STATE_STORAGE_ID = exports.OSD_URL_STATE_STORAGE_ID = 'state:storeInSessionStorage';
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfcGF0aCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX3BhY2thZ2UiLCJfc2V0dGluZ3NWYWxpZGF0b3IiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsIlBMVUdJTl9WRVJTSU9OIiwiZXhwb3J0cyIsInZlcnNpb24iLCJQTFVHSU5fVkVSU0lPTl9TSE9SVCIsInNwbGl0Iiwic3BsaWNlIiwiam9pbiIsIldBWlVIX0lOREVYX1RZUEVfQUxFUlRTIiwiV0FaVUhfQUxFUlRTX1BSRUZJWCIsIldBWlVIX0FMRVJUU19QQVRURVJOIiwiV0FaVUhfSU5ERVhfVFlQRV9NT05JVE9SSU5HIiwiV0FaVUhfTU9OSVRPUklOR19QUkVGSVgiLCJXQVpVSF9NT05JVE9SSU5HX1BBVFRFUk4iLCJXQVpVSF9NT05JVE9SSU5HX1RFTVBMQVRFX05BTUUiLCJXQVpVSF9NT05JVE9SSU5HX0RFRkFVTFRfSU5ESUNFU19TSEFSRFMiLCJXQVpVSF9NT05JVE9SSU5HX0RFRkFVTFRfSU5ESUNFU19SRVBMSUNBUyIsIldBWlVIX01PTklUT1JJTkdfREVGQVVMVF9DUkVBVElPTiIsIldBWlVIX01PTklUT1JJTkdfREVGQVVMVF9FTkFCTEVEIiwiV0FaVUhfTU9OSVRPUklOR19ERUZBVUxUX0ZSRVFVRU5DWSIsIldBWlVIX01PTklUT1JJTkdfREVGQVVMVF9DUk9OX0ZSRVEiLCJXQVpVSF9JTkRFWF9UWVBFX1NUQVRJU1RJQ1MiLCJXQVpVSF9TVEFUSVNUSUNTX0RFRkFVTFRfUFJFRklYIiwiV0FaVUhfU1RBVElTVElDU19ERUZBVUxUX05BTUUiLCJXQVpVSF9TVEFUSVNUSUNTX1BBVFRFUk4iLCJXQVpVSF9TVEFUSVNUSUNTX1RFTVBMQVRFX05BTUUiLCJXQVpVSF9TVEFUSVNUSUNTX0RFRkFVTFRfSU5ESUNFU19TSEFSRFMiLCJXQVpVSF9TVEFUSVNUSUNTX0RFRkFVTFRfSU5ESUNFU19SRVBMSUNBUyIsIldBWlVIX1NUQVRJU1RJQ1NfREVGQVVMVF9DUkVBVElPTiIsIldBWlVIX1NUQVRJU1RJQ1NfREVGQVVMVF9TVEFUVVMiLCJXQVpVSF9TVEFUSVNUSUNTX0RFRkFVTFRfRlJFUVVFTkNZIiwiV0FaVUhfU1RBVElTVElDU19ERUZBVUxUX0NST05fRlJFUSIsIldBWlVIX1ZVTE5FUkFCSUxJVElFU19QQVRURVJOIiwiV0FaVUhfSU5ERVhfVFlQRV9WVUxORVJBQklMSVRJRVMiLCJXQVpVSF9QTFVHSU5fUExBVEZPUk1fVEVNUExBVEVfTkFNRSIsIldBWlVIX1NBTVBMRV9BTEVSVF9QUkVGSVgiLCJXQVpVSF9TQU1QTEVfQUxFUlRTX0lOREVYX1NIQVJEUyIsIldBWlVIX1NBTVBMRV9BTEVSVFNfSU5ERVhfUkVQTElDQVMiLCJXQVpVSF9TQU1QTEVfQUxFUlRTX0NBVEVHT1JZX1NFQ1VSSVRZIiwiV0FaVUhfU0FNUExFX0FMRVJUU19DQVRFR09SWV9BVURJVElOR19QT0xJQ1lfTU9OSVRPUklORyIsIldBWlVIX1NBTVBMRV9BTEVSVFNfQ0FURUdPUllfVEhSRUFUX0RFVEVDVElPTiIsIldBWlVIX1NBTVBMRV9BTEVSVFNfREVGQVVMVF9OVU1CRVJfQUxFUlRTIiwiV0FaVUhfU0FNUExFX0FMRVJUU19DQVRFR09SSUVTX1RZUEVfQUxFUlRTIiwic3lzY2hlY2siLCJhd3MiLCJvZmZpY2UiLCJnY3AiLCJhdXRoZW50aWNhdGlvbiIsInNzaCIsImFwYWNoZSIsImFsZXJ0cyIsIndlYiIsIndpbmRvd3MiLCJzZXJ2aWNlX2NvbnRyb2xfbWFuYWdlciIsImdpdGh1YiIsInJvb3RjaGVjayIsImF1ZGl0Iiwib3BlbnNjYXAiLCJjaXNjYXQiLCJ2dWxuZXJhYmlsaXRpZXMiLCJ2aXJ1c3RvdGFsIiwib3NxdWVyeSIsImRvY2tlciIsIm1pdHJlIiwiV0FaVUhfU0VDVVJJVFlfUExVR0lOX09QRU5TRUFSQ0hfREFTSEJPQVJEU19TRUNVUklUWSIsIldBWlVIX1NFQ1VSSVRZX1BMVUdJTlMiLCJXQVpVSF9DT05GSUdVUkFUSU9OX0NBQ0hFX1RJTUUiLCJXQVpVSF9BUElfUkVTRVJWRURfSURfTE9XRVJfVEhBTiIsIldBWlVIX0FQSV9SRVNFUlZFRF9XVUlfU0VDVVJJVFlfUlVMRVMiLCJXQVpVSF9EQVRBX1BMVUdJTl9QTEFURk9STV9CQVNFX1BBVEgiLCJXQVpVSF9EQVRBX1BMVUdJTl9QTEFURk9STV9CQVNFX0FCU09MVVRFX1BBVEgiLCJwYXRoIiwiX19kaXJuYW1lIiwiV0FaVUhfREFUQV9BQlNPTFVURV9QQVRIIiwiV0FaVUhfREFUQV9DT05GSUdfRElSRUNUT1JZX1BBVEgiLCJXQVpVSF9EQVRBX0NPTkZJR19SRUdJU1RSWV9QQVRIIiwiV0FaVUhfREFUQV9DT05GSUdfQVBQX1BBVEgiLCJXQVpVSF9EQVRBX0RPV05MT0FEU19ESVJFQ1RPUllfUEFUSCIsIldBWlVIX0RBVEFfRE9XTkxPQURTX1JFUE9SVFNfRElSRUNUT1JZX1BBVEgiLCJXQVpVSF9RVUVVRV9DUk9OX0ZSRVEiLCJXQVpVSF9FUlJPUl9EQUVNT05TX05PVF9SRUFEWSIsIldBWlVIX0FHRU5UU19PU19UWVBFIiwiV0FaVUhfTU9EVUxFU19JRCIsIldBWlVIX01FTlVfTUFOQUdFTUVOVF9TRUNUSU9OU19JRCIsIldBWlVIX01FTlVfVE9PTFNfU0VDVElPTlNfSUQiLCJXQVpVSF9NRU5VX1NFQ1VSSVRZX1NFQ1RJT05TX0lEIiwiV0FaVUhfTUVOVV9TRVRUSU5HU19TRUNUSU9OU19JRCIsIkFVVEhPUklaRURfQUdFTlRTIiwiV0FaVUhfTElOS19HSVRIVUIiLCJXQVpVSF9MSU5LX0dPT0dMRV9HUk9VUFMiLCJXQVpVSF9MSU5LX1NMQUNLIiwiSEVBTFRIX0NIRUNLIiwiSEVBTFRIX0NIRUNLX1JFRElSRUNUSU9OX1RJTUUiLCJXQVpVSF9QTFVHSU5fUExBVEZPUk1fU0VUVElOR19USU1FX0ZJTFRFUiIsImZyb20iLCJ0byIsIlBMVUdJTl9QTEFURk9STV9TRVRUSU5HX05BTUVfVElNRV9GSUxURVIiLCJXQVpVSF9QTFVHSU5fUExBVEZPUk1fU0VUVElOR19NQVhfQlVDS0VUUyIsIlBMVUdJTl9QTEFURk9STV9TRVRUSU5HX05BTUVfTUFYX0JVQ0tFVFMiLCJXQVpVSF9QTFVHSU5fUExBVEZPUk1fU0VUVElOR19NRVRBRklFTERTIiwiUExVR0lOX1BMQVRGT1JNX1NFVFRJTkdfTkFNRV9NRVRBRklFTERTIiwiVUlfTE9HR0VSX0xFVkVMUyIsIldBUk5JTkciLCJJTkZPIiwiRVJST1IiLCJVSV9UT0FTVF9DT0xPUiIsIlNVQ0NFU1MiLCJEQU5HRVIiLCJBU1NFVFNfQkFTRV9VUkxfUFJFRklYIiwiQVNTRVRTX1BVQkxJQ19VUkwiLCJSRVBPUlRTX0xPR09fSU1BR0VfQVNTRVRTX1JFTEFUSVZFX1BBVEgiLCJSRVBPUlRTX1BSSU1BUllfQ09MT1IiLCJSRVBPUlRTX1BBR0VfRk9PVEVSX1RFWFQiLCJSRVBPUlRTX1BBR0VfSEVBREVSX1RFWFQiLCJQTFVHSU5fUExBVEZPUk1fTkFNRSIsIlBMVUdJTl9QTEFURk9STV9JTlNUQUxMQVRJT05fVVNFUiIsIlBMVUdJTl9QTEFURk9STV9JTlNUQUxMQVRJT05fVVNFUl9HUk9VUCIsIlBMVUdJTl9QTEFURk9STV9XQVpVSF9ET0NVTUVOVEFUSU9OX1VSTF9QQVRIX1VQR1JBREVfUExBVEZPUk0iLCJQTFVHSU5fUExBVEZPUk1fV0FaVUhfRE9DVU1FTlRBVElPTl9VUkxfUEFUSF9UUk9VQkxFU0hPT1RJTkciLCJQTFVHSU5fUExBVEZPUk1fV0FaVUhfRE9DVU1FTlRBVElPTl9VUkxfUEFUSF9BUFBfQ09ORklHVVJBVElPTiIsIlBMVUdJTl9QTEFURk9STV9VUkxfR1VJREUiLCJQTFVHSU5fUExBVEZPUk1fVVJMX0dVSURFX1RJVExFIiwiUExVR0lOX1BMQVRGT1JNX1JFUVVFU1RfSEVBREVSUyIsIlBMVUdJTl9BUFBfTkFNRSIsIlVJX0NPTE9SX1NUQVRVUyIsInN1Y2Nlc3MiLCJkYW5nZXIiLCJ3YXJuaW5nIiwiZGlzYWJsZWQiLCJpbmZvIiwiQVBJX05BTUVfQUdFTlRfU1RBVFVTIiwiQUNUSVZFIiwiRElTQ09OTkVDVEVEIiwiUEVORElORyIsIk5FVkVSX0NPTk5FQ1RFRCIsIlVJX0NPTE9SX0FHRU5UX1NUQVRVUyIsIlVJX0xBQkVMX05BTUVfQUdFTlRfU1RBVFVTIiwiVUlfT1JERVJfQUdFTlRfU1RBVFVTIiwiQUdFTlRfU1lOQ0VEX1NUQVRVUyIsIlNZTkNFRCIsIk5PVF9TWU5DRUQiLCJBR0VOVF9TVEFUVVNfQ09ERSIsIlNUQVRVU19DT0RFIiwiU1RBVFVTX0RFU0NSSVBUSU9OIiwiRE9DVU1FTlRBVElPTl9XRUJfQkFTRV9VUkwiLCJFTEFTVElDX05BTUUiLCJXQVpVSF9JTkRFWEVSX05BTUUiLCJOT1RfVElNRV9GSUVMRF9OQU1FX0lOREVYX1BBVFRFUk4iLCJDVVNUT01JWkFUSU9OX0VORFBPSU5UX1BBWUxPQURfVVBMT0FEX0NVU1RPTV9GSUxFX01BWElNVU1fQllURVMiLCJTZXR0aW5nQ2F0ZWdvcnkiLCJFcGx1Z2luU2V0dGluZ1R5cGUiLCJQTFVHSU5fU0VUVElOR1NfQ0FURUdPUklFUyIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJyZW5kZXJPcmRlciIsIkdFTkVSQUwiLCJTRUNVUklUWSIsIk1PTklUT1JJTkciLCJTVEFUSVNUSUNTIiwiVlVMTkVSQUJJTElUSUVTIiwiQ1VTVE9NSVpBVElPTiIsImRvY3VtZW50YXRpb25MaW5rIiwiQVBJX0NPTk5FQ1RJT04iLCJQTFVHSU5fU0VUVElOR1MiLCJzdG9yZSIsImZpbGUiLCJjb25maWd1cmFibGVNYW5hZ2VkIiwiY2F0ZWdvcnkiLCJ0eXBlIiwidGV4dCIsImRlZmF1bHRWYWx1ZSIsImlzQ29uZmlndXJhYmxlRnJvbVNldHRpbmdzIiwicmVxdWlyZXNSdW5uaW5nSGVhbHRoQ2hlY2siLCJ2YWxpZGF0ZVVJRm9ybSIsInZhbHVlIiwidmFsaWRhdGUiLCJTZXR0aW5nc1ZhbGlkYXRvciIsImNvbXBvc2UiLCJpc1N0cmluZyIsImlzTm90RW1wdHlTdHJpbmciLCJoYXNOb1NwYWNlcyIsIm5vU3RhcnRzV2l0aFN0cmluZyIsImhhc05vdEludmFsaWRDaGFyYWN0ZXJzIiwic3dpdGNoIiwib3B0aW9ucyIsInZhbHVlcyIsImxhYmVsIiwiZW5hYmxlZCIsInVpRm9ybVRyYW5zZm9ybUNoYW5nZWRJbnB1dFZhbHVlIiwiQm9vbGVhbiIsImlzQm9vbGVhbiIsInJlcXVpcmVzUmVzdGFydGluZ1BsdWdpblBsYXRmb3JtIiwiZWRpdG9yIiwibGFuZ3VhZ2UiLCJ1aUZvcm1UcmFuc2Zvcm1Db25maWd1cmF0aW9uVmFsdWVUb0lucHV0VmFsdWUiLCJKU09OIiwic3RyaW5naWZ5IiwidWlGb3JtVHJhbnNmb3JtSW5wdXRWYWx1ZVRvQ29uZmlndXJhdGlvblZhbHVlIiwicGFyc2UiLCJlcnJvciIsImpzb24iLCJhcnJheSIsInNlbGVjdCIsImxpdGVyYWwiLCJtYXAiLCJudW1iZXIiLCJtaW4iLCJpbnRlZ2VyIiwiU3RyaW5nIiwiTnVtYmVyIiwicmVxdWlyZXNSZWxvYWRpbmdCcm93c2VyVGFiIiwiZmlsZXBpY2tlciIsImV4dGVuc2lvbnMiLCJzaXplIiwibWF4Qnl0ZXMiLCJyZWNvbW1lbmRlZCIsImRpbWVuc2lvbnMiLCJ3aWR0aCIsImhlaWdodCIsInVuaXQiLCJyZWxhdGl2ZVBhdGhGaWxlU3lzdGVtIiwiZmlsZW5hbWUiLCJyZXNvbHZlU3RhdGljVVJMIiwiRGF0ZSIsIm5vdyIsImZpbGVQaWNrZXJGaWxlU2l6ZSIsIm1lYW5pbmdmdWxVbml0IiwiZmlsZVBpY2tlclN1cHBvcnRlZEV4dGVuc2lvbnMiLCJkZWZhdWx0VmFsdWVJZk5vdFNldCIsInRleHRhcmVhIiwibWF4Um93cyIsIm1heExlbmd0aCIsIl90aGlzJG9wdGlvbnMiLCJfdGhpcyRvcHRpb25zMiIsIm11bHRpcGxlTGluZXNTdHJpbmciLCJfdGhpcyRvcHRpb25zMyIsIl90aGlzJG9wdGlvbnM0Iiwic2VydmVyQWRkcmVzc0hvc3RuYW1lRlFETklQdjRJUHY2IiwiaGlkZU1hbmFnZXJBbGVydHMiLCJob3N0cyIsImFycmF5T2YiLCJkZWZhdWx0QmxvY2siLCJ0cmFuc2Zvcm1Gcm9tIiwiaG9zdERhdGEiLCJfT2JqZWN0JGtleXMiLCJrZXkiLCJPYmplY3QiLCJrZXlzIiwiaWQiLCJ1cmwiLCJwb3J0IiwibWF4IiwidXNlcm5hbWUiLCJwYXNzd29yZCIsInJ1bl9hcyIsIm5vTGl0ZXJhbFN0cmluZyIsInBhdHRlcm4iLCJ0aW1lb3V0IiwiSFRUUF9TVEFUVVNfQ09ERVMiLCJNT0RVTEVfU0NBX0NIRUNLX1JFU1VMVF9MQUJFTCIsInBhc3NlZCIsImZhaWxlZCIsIlNFQVJDSF9CQVJfV1FMX1ZBTFVFX1NVR0dFU1RJT05TX0NPVU5UIiwiU0VBUkNIX0JBUl9XUUxfVkFMVUVfU1VHR0VTVElPTlNfRElTUExBWV9DT1VOVCIsIlNFQVJDSF9CQVJfREVCT1VOQ0VfVVBEQVRFX1RJTUUiLCJXQVpVSF9DT1JFX0VOQ1JZUFRJT05fUEFTU1dPUkQiLCJXQVpVSF9DT1JFX0NPTkZJR1VSQVRJT05fSU5TVEFOQ0UiLCJXQVpVSF9DT1JFX0NPTkZJR1VSQVRJT05fQ0FDSEVfU0VDT05EUyIsIldBWlVIX1JPTEVfQURNSU5JU1RSQVRPUl9JRCIsIk9TRF9VUkxfU1RBVEVfU1RPUkFHRV9JRCJdLCJzb3VyY2VzIjpbImNvbnN0YW50cy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogV2F6dWggYXBwIC0gV2F6dWggQ29uc3RhbnRzIGZpbGVcbiAqIENvcHlyaWdodCAoQykgMjAxNS0yMDIyIFdhenVoLCBJbmMuXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU7IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uOyBlaXRoZXIgdmVyc2lvbiAyIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBGaW5kIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhpcyBvbiB0aGUgTElDRU5TRSBmaWxlLlxuICovXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IHZlcnNpb24gfSBmcm9tICcuLi9wYWNrYWdlLmpzb24nO1xuLy8gaW1wb3J0IHsgdmFsaWRhdGUgYXMgdmFsaWRhdGVOb2RlQ3JvbkludGVydmFsIH0gZnJvbSAnbm9kZS1jcm9uJztcbmltcG9ydCB7IFNldHRpbmdzVmFsaWRhdG9yIH0gZnJvbSAnLi4vY29tbW9uL3NlcnZpY2VzL3NldHRpbmdzLXZhbGlkYXRvcic7XG5cbi8vIFBsdWdpblxuZXhwb3J0IGNvbnN0IFBMVUdJTl9WRVJTSU9OID0gdmVyc2lvbjtcbmV4cG9ydCBjb25zdCBQTFVHSU5fVkVSU0lPTl9TSE9SVCA9IHZlcnNpb24uc3BsaXQoJy4nKS5zcGxpY2UoMCwgMikuam9pbignLicpO1xuXG4vLyBJbmRleCBwYXR0ZXJucyAtIFdhenVoIGFsZXJ0c1xuZXhwb3J0IGNvbnN0IFdBWlVIX0lOREVYX1RZUEVfQUxFUlRTID0gJ2FsZXJ0cyc7XG5leHBvcnQgY29uc3QgV0FaVUhfQUxFUlRTX1BSRUZJWCA9ICd3YXp1aC1hbGVydHMtJztcbmV4cG9ydCBjb25zdCBXQVpVSF9BTEVSVFNfUEFUVEVSTiA9ICd3YXp1aC1hbGVydHMtKic7XG5cbi8vIEpvYiAtIFdhenVoIG1vbml0b3JpbmdcbmV4cG9ydCBjb25zdCBXQVpVSF9JTkRFWF9UWVBFX01PTklUT1JJTkcgPSAnbW9uaXRvcmluZyc7XG5leHBvcnQgY29uc3QgV0FaVUhfTU9OSVRPUklOR19QUkVGSVggPSAnd2F6dWgtbW9uaXRvcmluZy0nO1xuZXhwb3J0IGNvbnN0IFdBWlVIX01PTklUT1JJTkdfUEFUVEVSTiA9ICd3YXp1aC1tb25pdG9yaW5nLSonO1xuZXhwb3J0IGNvbnN0IFdBWlVIX01PTklUT1JJTkdfVEVNUExBVEVfTkFNRSA9ICd3YXp1aC1hZ2VudCc7XG5leHBvcnQgY29uc3QgV0FaVUhfTU9OSVRPUklOR19ERUZBVUxUX0lORElDRVNfU0hBUkRTID0gMTtcbmV4cG9ydCBjb25zdCBXQVpVSF9NT05JVE9SSU5HX0RFRkFVTFRfSU5ESUNFU19SRVBMSUNBUyA9IDA7XG5leHBvcnQgY29uc3QgV0FaVUhfTU9OSVRPUklOR19ERUZBVUxUX0NSRUFUSU9OID0gJ3cnO1xuZXhwb3J0IGNvbnN0IFdBWlVIX01PTklUT1JJTkdfREVGQVVMVF9FTkFCTEVEID0gdHJ1ZTtcbmV4cG9ydCBjb25zdCBXQVpVSF9NT05JVE9SSU5HX0RFRkFVTFRfRlJFUVVFTkNZID0gOTAwO1xuZXhwb3J0IGNvbnN0IFdBWlVIX01PTklUT1JJTkdfREVGQVVMVF9DUk9OX0ZSRVEgPSAnMCAqICogKiAqIConO1xuXG4vLyBKb2IgLSBXYXp1aCBzdGF0aXN0aWNzXG5leHBvcnQgY29uc3QgV0FaVUhfSU5ERVhfVFlQRV9TVEFUSVNUSUNTID0gJ3N0YXRpc3RpY3MnO1xuZXhwb3J0IGNvbnN0IFdBWlVIX1NUQVRJU1RJQ1NfREVGQVVMVF9QUkVGSVggPSAnd2F6dWgnO1xuZXhwb3J0IGNvbnN0IFdBWlVIX1NUQVRJU1RJQ1NfREVGQVVMVF9OQU1FID0gJ3N0YXRpc3RpY3MnO1xuZXhwb3J0IGNvbnN0IFdBWlVIX1NUQVRJU1RJQ1NfUEFUVEVSTiA9IGAke1dBWlVIX1NUQVRJU1RJQ1NfREVGQVVMVF9QUkVGSVh9LSR7V0FaVUhfU1RBVElTVElDU19ERUZBVUxUX05BTUV9LSpgO1xuZXhwb3J0IGNvbnN0IFdBWlVIX1NUQVRJU1RJQ1NfVEVNUExBVEVfTkFNRSA9IGAke1dBWlVIX1NUQVRJU1RJQ1NfREVGQVVMVF9QUkVGSVh9LSR7V0FaVUhfU1RBVElTVElDU19ERUZBVUxUX05BTUV9YDtcbmV4cG9ydCBjb25zdCBXQVpVSF9TVEFUSVNUSUNTX0RFRkFVTFRfSU5ESUNFU19TSEFSRFMgPSAxO1xuZXhwb3J0IGNvbnN0IFdBWlVIX1NUQVRJU1RJQ1NfREVGQVVMVF9JTkRJQ0VTX1JFUExJQ0FTID0gMDtcbmV4cG9ydCBjb25zdCBXQVpVSF9TVEFUSVNUSUNTX0RFRkFVTFRfQ1JFQVRJT04gPSAndyc7XG5leHBvcnQgY29uc3QgV0FaVUhfU1RBVElTVElDU19ERUZBVUxUX1NUQVRVUyA9IHRydWU7XG5leHBvcnQgY29uc3QgV0FaVUhfU1RBVElTVElDU19ERUZBVUxUX0ZSRVFVRU5DWSA9IDkwMDtcbmV4cG9ydCBjb25zdCBXQVpVSF9TVEFUSVNUSUNTX0RFRkFVTFRfQ1JPTl9GUkVRID0gJzAgKi81ICogKiAqIConO1xuXG4vLyBXYXp1aCB2dWxuZXJhYmlsaXRpZXNcbmV4cG9ydCBjb25zdCBXQVpVSF9WVUxORVJBQklMSVRJRVNfUEFUVEVSTiA9ICd3YXp1aC1zdGF0ZXMtdnVsbmVyYWJpbGl0aWVzLSonO1xuZXhwb3J0IGNvbnN0IFdBWlVIX0lOREVYX1RZUEVfVlVMTkVSQUJJTElUSUVTID0gJ3Z1bG5lcmFiaWxpdGllcyc7XG5cbi8vIEpvYiAtIFdhenVoIGluaXRpYWxpemVcbmV4cG9ydCBjb25zdCBXQVpVSF9QTFVHSU5fUExBVEZPUk1fVEVNUExBVEVfTkFNRSA9ICd3YXp1aC1raWJhbmEnO1xuXG4vLyBTYW1wbGUgZGF0YVxuZXhwb3J0IGNvbnN0IFdBWlVIX1NBTVBMRV9BTEVSVF9QUkVGSVggPSAnd2F6dWgtYWxlcnRzLTQueC0nO1xuZXhwb3J0IGNvbnN0IFdBWlVIX1NBTVBMRV9BTEVSVFNfSU5ERVhfU0hBUkRTID0gMTtcbmV4cG9ydCBjb25zdCBXQVpVSF9TQU1QTEVfQUxFUlRTX0lOREVYX1JFUExJQ0FTID0gMDtcbmV4cG9ydCBjb25zdCBXQVpVSF9TQU1QTEVfQUxFUlRTX0NBVEVHT1JZX1NFQ1VSSVRZID0gJ3NlY3VyaXR5JztcbmV4cG9ydCBjb25zdCBXQVpVSF9TQU1QTEVfQUxFUlRTX0NBVEVHT1JZX0FVRElUSU5HX1BPTElDWV9NT05JVE9SSU5HID1cbiAgJ2F1ZGl0aW5nLXBvbGljeS1tb25pdG9yaW5nJztcbmV4cG9ydCBjb25zdCBXQVpVSF9TQU1QTEVfQUxFUlRTX0NBVEVHT1JZX1RIUkVBVF9ERVRFQ1RJT04gPSAndGhyZWF0LWRldGVjdGlvbic7XG5leHBvcnQgY29uc3QgV0FaVUhfU0FNUExFX0FMRVJUU19ERUZBVUxUX05VTUJFUl9BTEVSVFMgPSAzMDAwO1xuZXhwb3J0IGNvbnN0IFdBWlVIX1NBTVBMRV9BTEVSVFNfQ0FURUdPUklFU19UWVBFX0FMRVJUUyA9IHtcbiAgW1dBWlVIX1NBTVBMRV9BTEVSVFNfQ0FURUdPUllfU0VDVVJJVFldOiBbXG4gICAgeyBzeXNjaGVjazogdHJ1ZSB9LFxuICAgIHsgYXdzOiB0cnVlIH0sXG4gICAgeyBvZmZpY2U6IHRydWUgfSxcbiAgICB7IGdjcDogdHJ1ZSB9LFxuICAgIHsgYXV0aGVudGljYXRpb246IHRydWUgfSxcbiAgICB7IHNzaDogdHJ1ZSB9LFxuICAgIHsgYXBhY2hlOiB0cnVlLCBhbGVydHM6IDIwMDAgfSxcbiAgICB7IHdlYjogdHJ1ZSB9LFxuICAgIHsgd2luZG93czogeyBzZXJ2aWNlX2NvbnRyb2xfbWFuYWdlcjogdHJ1ZSB9LCBhbGVydHM6IDEwMDAgfSxcbiAgICB7IGdpdGh1YjogdHJ1ZSB9LFxuICBdLFxuICBbV0FaVUhfU0FNUExFX0FMRVJUU19DQVRFR09SWV9BVURJVElOR19QT0xJQ1lfTU9OSVRPUklOR106IFtcbiAgICB7IHJvb3RjaGVjazogdHJ1ZSB9LFxuICAgIHsgYXVkaXQ6IHRydWUgfSxcbiAgICB7IG9wZW5zY2FwOiB0cnVlIH0sXG4gICAgeyBjaXNjYXQ6IHRydWUgfSxcbiAgXSxcbiAgW1dBWlVIX1NBTVBMRV9BTEVSVFNfQ0FURUdPUllfVEhSRUFUX0RFVEVDVElPTl06IFtcbiAgICB7IHZ1bG5lcmFiaWxpdGllczogdHJ1ZSB9LFxuICAgIHsgdmlydXN0b3RhbDogdHJ1ZSB9LFxuICAgIHsgb3NxdWVyeTogdHJ1ZSB9LFxuICAgIHsgZG9ja2VyOiB0cnVlIH0sXG4gICAgeyBtaXRyZTogdHJ1ZSB9LFxuICBdLFxufTtcblxuLy8gU2VjdXJpdHlcbmV4cG9ydCBjb25zdCBXQVpVSF9TRUNVUklUWV9QTFVHSU5fT1BFTlNFQVJDSF9EQVNIQk9BUkRTX1NFQ1VSSVRZID1cbiAgJ09wZW5TZWFyY2ggRGFzaGJvYXJkcyBTZWN1cml0eSc7XG5cbmV4cG9ydCBjb25zdCBXQVpVSF9TRUNVUklUWV9QTFVHSU5TID0gW1xuICBXQVpVSF9TRUNVUklUWV9QTFVHSU5fT1BFTlNFQVJDSF9EQVNIQk9BUkRTX1NFQ1VSSVRZLFxuXTtcblxuLy8gQXBwIGNvbmZpZ3VyYXRpb25cbmV4cG9ydCBjb25zdCBXQVpVSF9DT05GSUdVUkFUSU9OX0NBQ0hFX1RJTUUgPSAxMDAwMDsgLy8gdGltZSBpbiBtcztcblxuLy8gUmVzZXJ2ZWQgaWRzIGZvciBVc2Vycy9Sb2xlIG1hcHBpbmdcbmV4cG9ydCBjb25zdCBXQVpVSF9BUElfUkVTRVJWRURfSURfTE9XRVJfVEhBTiA9IDEwMDtcbmV4cG9ydCBjb25zdCBXQVpVSF9BUElfUkVTRVJWRURfV1VJX1NFQ1VSSVRZX1JVTEVTID0gWzEsIDJdO1xuXG4vLyBXYXp1aCBkYXRhIHBhdGhcbmNvbnN0IFdBWlVIX0RBVEFfUExVR0lOX1BMQVRGT1JNX0JBU0VfUEFUSCA9ICdkYXRhJztcbmV4cG9ydCBjb25zdCBXQVpVSF9EQVRBX1BMVUdJTl9QTEFURk9STV9CQVNFX0FCU09MVVRFX1BBVEggPSBwYXRoLmpvaW4oXG4gIF9fZGlybmFtZSxcbiAgJy4uLy4uLy4uLycsXG4gIFdBWlVIX0RBVEFfUExVR0lOX1BMQVRGT1JNX0JBU0VfUEFUSCxcbik7XG5leHBvcnQgY29uc3QgV0FaVUhfREFUQV9BQlNPTFVURV9QQVRIID0gcGF0aC5qb2luKFxuICBXQVpVSF9EQVRBX1BMVUdJTl9QTEFURk9STV9CQVNFX0FCU09MVVRFX1BBVEgsXG4gICd3YXp1aCcsXG4pO1xuXG4vLyBXYXp1aCBkYXRhIHBhdGggLSBjb25maWdcbmV4cG9ydCBjb25zdCBXQVpVSF9EQVRBX0NPTkZJR19ESVJFQ1RPUllfUEFUSCA9IHBhdGguam9pbihcbiAgV0FaVUhfREFUQV9BQlNPTFVURV9QQVRILFxuICAnY29uZmlnJyxcbik7XG5leHBvcnQgY29uc3QgV0FaVUhfREFUQV9DT05GSUdfUkVHSVNUUllfUEFUSCA9IHBhdGguam9pbihcbiAgV0FaVUhfREFUQV9DT05GSUdfRElSRUNUT1JZX1BBVEgsXG4gICd3YXp1aC1yZWdpc3RyeS5qc29uJyxcbik7XG5cbmV4cG9ydCBjb25zdCBXQVpVSF9EQVRBX0NPTkZJR19BUFBfUEFUSCA9IHBhdGguam9pbihcbiAgV0FaVUhfREFUQV9DT05GSUdfRElSRUNUT1JZX1BBVEgsXG4gICd3YXp1aC55bWwnLFxuKTtcblxuLy8gV2F6dWggZGF0YSBwYXRoIC0gZG93bmxvYWRzXG5leHBvcnQgY29uc3QgV0FaVUhfREFUQV9ET1dOTE9BRFNfRElSRUNUT1JZX1BBVEggPSBwYXRoLmpvaW4oXG4gIFdBWlVIX0RBVEFfQUJTT0xVVEVfUEFUSCxcbiAgJ2Rvd25sb2FkcycsXG4pO1xuZXhwb3J0IGNvbnN0IFdBWlVIX0RBVEFfRE9XTkxPQURTX1JFUE9SVFNfRElSRUNUT1JZX1BBVEggPSBwYXRoLmpvaW4oXG4gIFdBWlVIX0RBVEFfRE9XTkxPQURTX0RJUkVDVE9SWV9QQVRILFxuICAncmVwb3J0cycsXG4pO1xuXG4vLyBRdWV1ZVxuZXhwb3J0IGNvbnN0IFdBWlVIX1FVRVVFX0NST05fRlJFUSA9ICcqLzE1ICogKiAqICogKic7IC8vIEV2ZXJ5IDE1IHNlY29uZHNcblxuLy8gV2F6dWggZXJyb3JzXG5leHBvcnQgY29uc3QgV0FaVUhfRVJST1JfREFFTU9OU19OT1RfUkVBRFkgPSAnRVJST1IzMDk5JztcblxuLy8gQWdlbnRzXG5leHBvcnQgZW51bSBXQVpVSF9BR0VOVFNfT1NfVFlQRSB7XG4gIFdJTkRPV1MgPSAnd2luZG93cycsXG4gIExJTlVYID0gJ2xpbnV4JyxcbiAgU1VOT1MgPSAnc3Vub3MnLFxuICBEQVJXSU4gPSAnZGFyd2luJyxcbiAgT1RIRVJTID0gJycsXG59XG5cbmV4cG9ydCBlbnVtIFdBWlVIX01PRFVMRVNfSUQge1xuICBTRUNVUklUWV9FVkVOVFMgPSAnZ2VuZXJhbCcsXG4gIElOVEVHUklUWV9NT05JVE9SSU5HID0gJ2ZpbScsXG4gIEFNQVpPTl9XRUJfU0VSVklDRVMgPSAnYXdzJyxcbiAgT0ZGSUNFXzM2NSA9ICdvZmZpY2UnLFxuICBHT09HTEVfQ0xPVURfUExBVEZPUk0gPSAnZ2NwJyxcbiAgUE9MSUNZX01PTklUT1JJTkcgPSAncG0nLFxuICBTRUNVUklUWV9DT05GSUdVUkFUSU9OX0FTU0VTU01FTlQgPSAnc2NhJyxcbiAgQVVESVRJTkcgPSAnYXVkaXQnLFxuICBPUEVOX1NDQVAgPSAnb3NjYXAnLFxuICBWVUxORVJBQklMSVRJRVMgPSAndnVscycsXG4gIE9TUVVFUlkgPSAnb3NxdWVyeScsXG4gIERPQ0tFUiA9ICdkb2NrZXInLFxuICBNSVRSRV9BVFRBQ0sgPSAnbWl0cmUnLFxuICBQQ0lfRFNTID0gJ3BjaScsXG4gIEhJUEFBID0gJ2hpcGFhJyxcbiAgTklTVF84MDBfNTMgPSAnbmlzdCcsXG4gIFRTQyA9ICd0c2MnLFxuICBDSVNfQ0FUID0gJ2Npc2NhdCcsXG4gIFZJUlVTVE9UQUwgPSAndmlydXN0b3RhbCcsXG4gIEdEUFIgPSAnZ2RwcicsXG4gIEdJVEhVQiA9ICdnaXRodWInLFxufVxuXG5leHBvcnQgZW51bSBXQVpVSF9NRU5VX01BTkFHRU1FTlRfU0VDVElPTlNfSUQge1xuICBNQU5BR0VNRU5UID0gJ21hbmFnZW1lbnQnLFxuICBBRE1JTklTVFJBVElPTiA9ICdhZG1pbmlzdHJhdGlvbicsXG4gIFJVTEVTRVQgPSAncnVsZXNldCcsXG4gIFJVTEVTID0gJ3J1bGVzJyxcbiAgREVDT0RFUlMgPSAnZGVjb2RlcnMnLFxuICBDREJfTElTVFMgPSAnbGlzdHMnLFxuICBHUk9VUFMgPSAnZ3JvdXBzJyxcbiAgQ09ORklHVVJBVElPTiA9ICdjb25maWd1cmF0aW9uJyxcbiAgU1RBVFVTX0FORF9SRVBPUlRTID0gJ3N0YXR1c1JlcG9ydHMnLFxuICBTVEFUVVMgPSAnc3RhdHVzJyxcbiAgQ0xVU1RFUiA9ICdtb25pdG9yaW5nJyxcbiAgTE9HUyA9ICdsb2dzJyxcbiAgUkVQT1JUSU5HID0gJ3JlcG9ydGluZycsXG4gIFNUQVRJU1RJQ1MgPSAnc3RhdGlzdGljcycsXG59XG5cbmV4cG9ydCBlbnVtIFdBWlVIX01FTlVfVE9PTFNfU0VDVElPTlNfSUQge1xuICBBUElfQ09OU09MRSA9ICdkZXZUb29scycsXG4gIFJVTEVTRVRfVEVTVCA9ICdsb2d0ZXN0Jyxcbn1cblxuZXhwb3J0IGVudW0gV0FaVUhfTUVOVV9TRUNVUklUWV9TRUNUSU9OU19JRCB7XG4gIFVTRVJTID0gJ3VzZXJzJyxcbiAgUk9MRVMgPSAncm9sZXMnLFxuICBQT0xJQ0lFUyA9ICdwb2xpY2llcycsXG4gIFJPTEVTX01BUFBJTkcgPSAncm9sZU1hcHBpbmcnLFxufVxuXG5leHBvcnQgZW51bSBXQVpVSF9NRU5VX1NFVFRJTkdTX1NFQ1RJT05TX0lEIHtcbiAgU0VUVElOR1MgPSAnc2V0dGluZ3MnLFxuICBBUElfQ09ORklHVVJBVElPTiA9ICdhcGknLFxuICBNT0RVTEVTID0gJ21vZHVsZXMnLFxuICBTQU1QTEVfREFUQSA9ICdzYW1wbGVfZGF0YScsXG4gIENPTkZJR1VSQVRJT04gPSAnY29uZmlndXJhdGlvbicsXG4gIExPR1MgPSAnbG9ncycsXG4gIE1JU0NFTExBTkVPVVMgPSAnbWlzY2VsbGFuZW91cycsXG4gIEFCT1VUID0gJ2Fib3V0Jyxcbn1cblxuZXhwb3J0IGNvbnN0IEFVVEhPUklaRURfQUdFTlRTID0gJ2F1dGhvcml6ZWQtYWdlbnRzJztcblxuLy8gV2F6dWggbGlua3NcbmV4cG9ydCBjb25zdCBXQVpVSF9MSU5LX0dJVEhVQiA9ICdodHRwczovL2dpdGh1Yi5jb20vd2F6dWgnO1xuZXhwb3J0IGNvbnN0IFdBWlVIX0xJTktfR09PR0xFX0dST1VQUyA9XG4gICdodHRwczovL2dyb3Vwcy5nb29nbGUuY29tL2ZvcnVtLyMhZm9ydW0vd2F6dWgnO1xuZXhwb3J0IGNvbnN0IFdBWlVIX0xJTktfU0xBQ0sgPSAnaHR0cHM6Ly93YXp1aC5jb20vY29tbXVuaXR5L2pvaW4tdXMtb24tc2xhY2snO1xuXG5leHBvcnQgY29uc3QgSEVBTFRIX0NIRUNLID0gJ2hlYWx0aC1jaGVjayc7XG5cbi8vIEhlYWx0aCBjaGVja1xuZXhwb3J0IGNvbnN0IEhFQUxUSF9DSEVDS19SRURJUkVDVElPTl9USU1FID0gMzAwOyAvL21zXG5cbi8vIFBsdWdpbiBwbGF0Zm9ybSBzZXR0aW5nc1xuLy8gRGVmYXVsdCB0aW1lRmlsdGVyIHNldCBieSB0aGUgYXBwXG5leHBvcnQgY29uc3QgV0FaVUhfUExVR0lOX1BMQVRGT1JNX1NFVFRJTkdfVElNRV9GSUxURVIgPSB7XG4gIGZyb206ICdub3ctMjRoJyxcbiAgdG86ICdub3cnLFxufTtcbmV4cG9ydCBjb25zdCBQTFVHSU5fUExBVEZPUk1fU0VUVElOR19OQU1FX1RJTUVfRklMVEVSID1cbiAgJ3RpbWVwaWNrZXI6dGltZURlZmF1bHRzJztcblxuLy8gRGVmYXVsdCBtYXhCdWNrZXRzIHNldCBieSB0aGUgYXBwXG5leHBvcnQgY29uc3QgV0FaVUhfUExVR0lOX1BMQVRGT1JNX1NFVFRJTkdfTUFYX0JVQ0tFVFMgPSAyMDAwMDA7XG5leHBvcnQgY29uc3QgUExVR0lOX1BMQVRGT1JNX1NFVFRJTkdfTkFNRV9NQVhfQlVDS0VUUyA9ICd0aW1lbGluZTptYXhfYnVja2V0cyc7XG5cbi8vIERlZmF1bHQgbWV0YUZpZWxkcyBzZXQgYnkgdGhlIGFwcFxuZXhwb3J0IGNvbnN0IFdBWlVIX1BMVUdJTl9QTEFURk9STV9TRVRUSU5HX01FVEFGSUVMRFMgPSBbJ19zb3VyY2UnLCAnX2luZGV4J107XG5leHBvcnQgY29uc3QgUExVR0lOX1BMQVRGT1JNX1NFVFRJTkdfTkFNRV9NRVRBRklFTERTID0gJ21ldGFGaWVsZHMnO1xuXG4vLyBMb2dnZXJcbmV4cG9ydCBjb25zdCBVSV9MT0dHRVJfTEVWRUxTID0ge1xuICBXQVJOSU5HOiAnV0FSTklORycsXG4gIElORk86ICdJTkZPJyxcbiAgRVJST1I6ICdFUlJPUicsXG59O1xuXG5leHBvcnQgY29uc3QgVUlfVE9BU1RfQ09MT1IgPSB7XG4gIFNVQ0NFU1M6ICdzdWNjZXNzJyxcbiAgV0FSTklORzogJ3dhcm5pbmcnLFxuICBEQU5HRVI6ICdkYW5nZXInLFxufTtcblxuLy8gQXNzZXRzXG5leHBvcnQgY29uc3QgQVNTRVRTX0JBU0VfVVJMX1BSRUZJWCA9ICcvcGx1Z2lucy93YXp1aC9hc3NldHMvJztcbmV4cG9ydCBjb25zdCBBU1NFVFNfUFVCTElDX1VSTCA9ICcvcGx1Z2lucy93YXp1aC9wdWJsaWMvYXNzZXRzLyc7XG5cbi8vIFJlcG9ydHNcbmV4cG9ydCBjb25zdCBSRVBPUlRTX0xPR09fSU1BR0VfQVNTRVRTX1JFTEFUSVZFX1BBVEggPVxuICAnaW1hZ2VzL2xvZ29fcmVwb3J0cy5wbmcnO1xuZXhwb3J0IGNvbnN0IFJFUE9SVFNfUFJJTUFSWV9DT0xPUiA9ICcjMjU2QkQxJztcbmV4cG9ydCBjb25zdCBSRVBPUlRTX1BBR0VfRk9PVEVSX1RFWFQgPSAnQ29weXJpZ2h0IMKpIFdhenVoLCBJbmMuJztcbmV4cG9ydCBjb25zdCBSRVBPUlRTX1BBR0VfSEVBREVSX1RFWFQgPSAnaW5mb0B3YXp1aC5jb21cXG5odHRwczovL3dhenVoLmNvbSc7XG5cbi8vIFBsdWdpbiBwbGF0Zm9ybVxuZXhwb3J0IGNvbnN0IFBMVUdJTl9QTEFURk9STV9OQU1FID0gJ2Rhc2hib2FyZCc7XG5leHBvcnQgY29uc3QgUExVR0lOX1BMQVRGT1JNX0lOU1RBTExBVElPTl9VU0VSID0gJ3dhenVoLWRhc2hib2FyZCc7XG5leHBvcnQgY29uc3QgUExVR0lOX1BMQVRGT1JNX0lOU1RBTExBVElPTl9VU0VSX0dST1VQID0gJ3dhenVoLWRhc2hib2FyZCc7XG5leHBvcnQgY29uc3QgUExVR0lOX1BMQVRGT1JNX1dBWlVIX0RPQ1VNRU5UQVRJT05fVVJMX1BBVEhfVVBHUkFERV9QTEFURk9STSA9XG4gICd1cGdyYWRlLWd1aWRlJztcbmV4cG9ydCBjb25zdCBQTFVHSU5fUExBVEZPUk1fV0FaVUhfRE9DVU1FTlRBVElPTl9VUkxfUEFUSF9UUk9VQkxFU0hPT1RJTkcgPVxuICAndXNlci1tYW51YWwvd2F6dWgtZGFzaGJvYXJkL3Ryb3VibGVzaG9vdGluZy5odG1sJztcbmV4cG9ydCBjb25zdCBQTFVHSU5fUExBVEZPUk1fV0FaVUhfRE9DVU1FTlRBVElPTl9VUkxfUEFUSF9BUFBfQ09ORklHVVJBVElPTiA9XG4gICd1c2VyLW1hbnVhbC93YXp1aC1kYXNoYm9hcmQvY29uZmlnLWZpbGUuaHRtbCc7XG5leHBvcnQgY29uc3QgUExVR0lOX1BMQVRGT1JNX1VSTF9HVUlERSA9XG4gICdodHRwczovL29wZW5zZWFyY2gub3JnL2RvY3MvMi4xMC9hYm91dCc7XG5leHBvcnQgY29uc3QgUExVR0lOX1BMQVRGT1JNX1VSTF9HVUlERV9USVRMRSA9ICdPcGVuU2VhcmNoIGd1aWRlJztcblxuZXhwb3J0IGNvbnN0IFBMVUdJTl9QTEFURk9STV9SRVFVRVNUX0hFQURFUlMgPSB7XG4gICdvc2QteHNyZic6ICdraWJhbmEnLFxufTtcblxuLy8gUGx1Z2luIGFwcFxuZXhwb3J0IGNvbnN0IFBMVUdJTl9BUFBfTkFNRSA9ICdEYXNoYm9hcmQnO1xuXG4vLyBVSVxuZXhwb3J0IGNvbnN0IFVJX0NPTE9SX1NUQVRVUyA9IHtcbiAgc3VjY2VzczogJyMwMDc4NzEnLFxuICBkYW5nZXI6ICcjQkQyNzFFJyxcbiAgd2FybmluZzogJyNGRUM1MTQnLFxuICBkaXNhYmxlZDogJyM2NDZBNzcnLFxuICBpbmZvOiAnIzYwOTJDMCcsXG4gIGRlZmF1bHQ6ICcjMDAwMDAwJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCBjb25zdCBBUElfTkFNRV9BR0VOVF9TVEFUVVMgPSB7XG4gIEFDVElWRTogJ2FjdGl2ZScsXG4gIERJU0NPTk5FQ1RFRDogJ2Rpc2Nvbm5lY3RlZCcsXG4gIFBFTkRJTkc6ICdwZW5kaW5nJyxcbiAgTkVWRVJfQ09OTkVDVEVEOiAnbmV2ZXJfY29ubmVjdGVkJyxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCBjb25zdCBVSV9DT0xPUl9BR0VOVF9TVEFUVVMgPSB7XG4gIFtBUElfTkFNRV9BR0VOVF9TVEFUVVMuQUNUSVZFXTogVUlfQ09MT1JfU1RBVFVTLnN1Y2Nlc3MsXG4gIFtBUElfTkFNRV9BR0VOVF9TVEFUVVMuRElTQ09OTkVDVEVEXTogVUlfQ09MT1JfU1RBVFVTLmRhbmdlcixcbiAgW0FQSV9OQU1FX0FHRU5UX1NUQVRVUy5QRU5ESU5HXTogVUlfQ09MT1JfU1RBVFVTLndhcm5pbmcsXG4gIFtBUElfTkFNRV9BR0VOVF9TVEFUVVMuTkVWRVJfQ09OTkVDVEVEXTogVUlfQ09MT1JfU1RBVFVTLmRpc2FibGVkLFxuICBkZWZhdWx0OiBVSV9DT0xPUl9TVEFUVVMuZGVmYXVsdCxcbn0gYXMgY29uc3Q7XG5cbmV4cG9ydCBjb25zdCBVSV9MQUJFTF9OQU1FX0FHRU5UX1NUQVRVUyA9IHtcbiAgW0FQSV9OQU1FX0FHRU5UX1NUQVRVUy5BQ1RJVkVdOiAnQWN0aXZlJyxcbiAgW0FQSV9OQU1FX0FHRU5UX1NUQVRVUy5ESVNDT05ORUNURURdOiAnRGlzY29ubmVjdGVkJyxcbiAgW0FQSV9OQU1FX0FHRU5UX1NUQVRVUy5QRU5ESU5HXTogJ1BlbmRpbmcnLFxuICBbQVBJX05BTUVfQUdFTlRfU1RBVFVTLk5FVkVSX0NPTk5FQ1RFRF06ICdOZXZlciBjb25uZWN0ZWQnLFxuICBkZWZhdWx0OiAnVW5rbm93bicsXG59IGFzIGNvbnN0O1xuXG5leHBvcnQgY29uc3QgVUlfT1JERVJfQUdFTlRfU1RBVFVTID0gW1xuICBBUElfTkFNRV9BR0VOVF9TVEFUVVMuQUNUSVZFLFxuICBBUElfTkFNRV9BR0VOVF9TVEFUVVMuRElTQ09OTkVDVEVELFxuICBBUElfTkFNRV9BR0VOVF9TVEFUVVMuUEVORElORyxcbiAgQVBJX05BTUVfQUdFTlRfU1RBVFVTLk5FVkVSX0NPTk5FQ1RFRCxcbl07XG5cbmV4cG9ydCBjb25zdCBBR0VOVF9TWU5DRURfU1RBVFVTID0ge1xuICBTWU5DRUQ6ICdzeW5jZWQnLFxuICBOT1RfU1lOQ0VEOiAnbm90IHN5bmNlZCcsXG59O1xuXG4vLyBUaGUgc3RhdHVzIGNvZGUgY2FuIGJlIHNlZW4gaGVyZSBodHRwczovL2dpdGh1Yi5jb20vd2F6dWgvd2F6dWgvYmxvYi82ODYwNjhhMWYwNWQ4MDZiMmUzYjNkNjMzYTc2NTMyMGFlN2FlMTE0L3NyYy93YXp1aF9kYi93ZGIuaCNMNTUtTDYxXG5cbmV4cG9ydCBjb25zdCBBR0VOVF9TVEFUVVNfQ09ERSA9IFtcbiAge1xuICAgIFNUQVRVU19DT0RFOiAwLFxuICAgIFNUQVRVU19ERVNDUklQVElPTjogJ0FnZW50IGlzIGNvbm5lY3RlZCcsXG4gIH0sXG4gIHtcbiAgICBTVEFUVVNfQ09ERTogMSxcbiAgICBTVEFUVVNfREVTQ1JJUFRJT046ICdJbnZhbGlkIGFnZW50IHZlcnNpb24nLFxuICB9LFxuICB7XG4gICAgU1RBVFVTX0NPREU6IDIsXG4gICAgU1RBVFVTX0RFU0NSSVBUSU9OOiAnRXJyb3IgcmV0cmlldmluZyB2ZXJzaW9uJyxcbiAgfSxcbiAge1xuICAgIFNUQVRVU19DT0RFOiAzLFxuICAgIFNUQVRVU19ERVNDUklQVElPTjogJ1NodXRkb3duIG1lc3NhZ2UgcmVjZWl2ZWQnLFxuICB9LFxuICB7XG4gICAgU1RBVFVTX0NPREU6IDQsXG4gICAgU1RBVFVTX0RFU0NSSVBUSU9OOiAnRGlzY29ubmVjdGVkIGJlY2F1c2Ugbm8ga2VlcGFsaXZlIHJlY2VpdmVkJyxcbiAgfSxcbiAge1xuICAgIFNUQVRVU19DT0RFOiA1LFxuICAgIFNUQVRVU19ERVNDUklQVElPTjogJ0Nvbm5lY3Rpb24gcmVzZXQgYnkgbWFuYWdlcicsXG4gIH0sXG5dO1xuXG4vLyBEb2N1bWVudGF0aW9uXG5leHBvcnQgY29uc3QgRE9DVU1FTlRBVElPTl9XRUJfQkFTRV9VUkwgPSAnaHR0cHM6Ly9kb2N1bWVudGF0aW9uLndhenVoLmNvbSc7XG5cbi8vIERlZmF1bHQgRWxhc3RpY3NlYXJjaCB1c2VyIG5hbWUgY29udGV4dFxuZXhwb3J0IGNvbnN0IEVMQVNUSUNfTkFNRSA9ICdlbGFzdGljJztcblxuLy8gRGVmYXVsdCBXYXp1aCBpbmRleGVyIG5hbWVcbmV4cG9ydCBjb25zdCBXQVpVSF9JTkRFWEVSX05BTUUgPSAnaW5kZXhlcic7XG5cbi8vIE5vdCB0aW1lRmllbGROYW1lIG9uIGluZGV4IHBhdHRlcm5cbmV4cG9ydCBjb25zdCBOT1RfVElNRV9GSUVMRF9OQU1FX0lOREVYX1BBVFRFUk4gPVxuICAnbm90X3RpbWVfZmllbGRfbmFtZV9pbmRleF9wYXR0ZXJuJztcblxuLy8gQ3VzdG9taXphdGlvblxuZXhwb3J0IGNvbnN0IENVU1RPTUlaQVRJT05fRU5EUE9JTlRfUEFZTE9BRF9VUExPQURfQ1VTVE9NX0ZJTEVfTUFYSU1VTV9CWVRFUyA9IDEwNDg1NzY7XG5cbi8vIFBsdWdpbiBzZXR0aW5nc1xuZXhwb3J0IGVudW0gU2V0dGluZ0NhdGVnb3J5IHtcbiAgR0VORVJBTCxcbiAgSEVBTFRIX0NIRUNLLFxuICBNT05JVE9SSU5HLFxuICBTVEFUSVNUSUNTLFxuICBWVUxORVJBQklMSVRJRVMsXG4gIFNFQ1VSSVRZLFxuICBDVVNUT01JWkFUSU9OLFxuICBBUElfQ09OTkVDVElPTixcbn1cblxudHlwZSBUUGx1Z2luU2V0dGluZ09wdGlvbnNUZXh0QXJlYSA9IHtcbiAgbWF4Um93cz86IG51bWJlcjtcbiAgbWluUm93cz86IG51bWJlcjtcbiAgbWF4TGVuZ3RoPzogbnVtYmVyO1xufTtcblxudHlwZSBUUGx1Z2luU2V0dGluZ09wdGlvbnNTZWxlY3QgPSB7XG4gIHNlbGVjdDogeyB0ZXh0OiBzdHJpbmc7IHZhbHVlOiBhbnkgfVtdO1xufTtcblxudHlwZSBUUGx1Z2luU2V0dGluZ09wdGlvbnNFZGl0b3IgPSB7XG4gIGVkaXRvcjoge1xuICAgIGxhbmd1YWdlOiBzdHJpbmc7XG4gIH07XG59O1xuXG50eXBlIFRQbHVnaW5TZXR0aW5nT3B0aW9uc0ZpbGUgPSB7XG4gIGZpbGU6IHtcbiAgICB0eXBlOiAnaW1hZ2UnO1xuICAgIGV4dGVuc2lvbnM/OiBzdHJpbmdbXTtcbiAgICBzaXplPzoge1xuICAgICAgbWF4Qnl0ZXM/OiBudW1iZXI7XG4gICAgICBtaW5CeXRlcz86IG51bWJlcjtcbiAgICB9O1xuICAgIHJlY29tbWVuZGVkPzoge1xuICAgICAgZGltZW5zaW9ucz86IHtcbiAgICAgICAgd2lkdGg6IG51bWJlcjtcbiAgICAgICAgaGVpZ2h0OiBudW1iZXI7XG4gICAgICAgIHVuaXQ6IHN0cmluZztcbiAgICAgIH07XG4gICAgfTtcbiAgICBzdG9yZT86IHtcbiAgICAgIHJlbGF0aXZlUGF0aEZpbGVTeXN0ZW06IHN0cmluZztcbiAgICAgIGZpbGVuYW1lOiBzdHJpbmc7XG4gICAgICByZXNvbHZlU3RhdGljVVJMOiAoZmlsZW5hbWU6IHN0cmluZykgPT4gc3RyaW5nO1xuICAgIH07XG4gIH07XG59O1xuXG50eXBlIFRQbHVnaW5TZXR0aW5nT3B0aW9uc051bWJlciA9IHtcbiAgbnVtYmVyOiB7XG4gICAgbWluPzogbnVtYmVyO1xuICAgIG1heD86IG51bWJlcjtcbiAgICBpbnRlZ2VyPzogYm9vbGVhbjtcbiAgfTtcbn07XG5cbnR5cGUgVFBsdWdpblNldHRpbmdPcHRpb25zU3dpdGNoID0ge1xuICBzd2l0Y2g6IHtcbiAgICB2YWx1ZXM6IHtcbiAgICAgIGRpc2FibGVkOiB7IGxhYmVsPzogc3RyaW5nOyB2YWx1ZTogYW55IH07XG4gICAgICBlbmFibGVkOiB7IGxhYmVsPzogc3RyaW5nOyB2YWx1ZTogYW55IH07XG4gICAgfTtcbiAgfTtcbn07XG5cbmV4cG9ydCBlbnVtIEVwbHVnaW5TZXR0aW5nVHlwZSB7XG4gIHRleHQgPSAndGV4dCcsXG4gIHRleHRhcmVhID0gJ3RleHRhcmVhJyxcbiAgc3dpdGNoID0gJ3N3aXRjaCcsXG4gIG51bWJlciA9ICdudW1iZXInLFxuICBlZGl0b3IgPSAnZWRpdG9yJyxcbiAgc2VsZWN0ID0gJ3NlbGVjdCcsXG4gIGZpbGVwaWNrZXIgPSAnZmlsZXBpY2tlcicsXG4gIHBhc3N3b3JkID0gJ3Bhc3N3b3JkJyxcbiAgYXJyYXlPZiA9ICdhcnJheU9mJyxcbiAgY3VzdG9tID0gJ2N1c3RvbScsXG59XG5cbmV4cG9ydCB0eXBlIFRQbHVnaW5TZXR0aW5nID0ge1xuICAvLyBEZWZpbmUgdGhlIHRleHQgZGlzcGxheWVkIGluIHRoZSBVSS5cbiAgdGl0bGU6IHN0cmluZztcbiAgLy8gRGVzY3JpcHRpb24uXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XG4gIC8vIENhdGVnb3J5LlxuICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5O1xuICAvLyBUeXBlLlxuICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGU7XG4gIC8vIFN0b3JlXG4gIHN0b3JlOiB7XG4gICAgZmlsZToge1xuICAgICAgLy8gRGVmaW5lIGlmIHRoZSBzZXR0aW5nIGlzIG1hbmFnZWQgYnkgdGhlIENvbmZpZ3VyYXRpb25TdG9yZSBzZXJ2aWNlXG4gICAgICBjb25maWd1cmFibGVNYW5hZ2VkPzogYm9vbGVhbjtcbiAgICAgIC8vIERlZmluZSBhIHRleHQgdG8gcHJpbnQgYXMgdGhlIGRlZmF1bHQgaW4gdGhlIGNvbmZpZ3VyYXRpb24gYmxvY2tcbiAgICAgIGRlZmF1bHRCbG9jaz86IHN0cmluZztcbiAgICAgIC8qIFRyYW5zZm9ybSB0aGUgdmFsdWUgZGVmaW5lZCBpbiB0aGUgY29uZmlndXJhdGlvbiBmaWxlIHRvIGJlIGNvbnN1bWVkIGJ5IHRoZSBDb25maWd1cmF0aW9uXG4gICAgICAgIHNlcnZpY2UgKi9cbiAgICAgIHRyYW5zZm9ybUZyb20/OiAodmFsdWU6IGFueSkgPT4gYW55O1xuICAgIH07XG4gIH07XG4gIC8vIERlZmF1bHQgdmFsdWUuXG4gIGRlZmF1bHRWYWx1ZTogYW55O1xuICAvKiBTcGVjaWFsOiBUaGlzIGlzIHVzZWQgZm9yIHRoZSBzZXR0aW5ncyBvZiBjdXN0b21pemF0aW9uIHRvIGdldCB0aGUgaGlkZGVuIGRlZmF1bHQgdmFsdWUsIGJlY2F1c2UgdGhlIGRlZmF1bHQgdmFsdWUgaXMgZW1wdHkgdG8gbm90IHRvIGJlIGRpc3BsYXllZCBvbiB0aGUgQXBwIFNldHRpbmdzLiAqL1xuICBkZWZhdWx0VmFsdWVJZk5vdFNldD86IGFueTtcbiAgLy8gQ29uZmlndXJhYmxlIGZyb20gdGhlIEFwcCBTZXR0aW5ncyBhcHAuXG4gIGlzQ29uZmlndXJhYmxlRnJvbVNldHRpbmdzOiBib29sZWFuO1xuICAvLyBNb2RpZnkgdGhlIHNldHRpbmcgcmVxdWlyZXMgcnVubmluZyB0aGUgcGx1Z2luIGhlYWx0aCBjaGVjayAoZnJvbnRlbmQpLlxuICByZXF1aXJlc1J1bm5pbmdIZWFsdGhDaGVjaz86IGJvb2xlYW47XG4gIC8vIE1vZGlmeSB0aGUgc2V0dGluZyByZXF1aXJlcyByZWxvYWRpbmcgdGhlIGJyb3dzZXIgdGFiIChmcm9udGVuZCkuXG4gIHJlcXVpcmVzUmVsb2FkaW5nQnJvd3NlclRhYj86IGJvb2xlYW47XG4gIC8vIE1vZGlmeSB0aGUgc2V0dGluZyByZXF1aXJlcyByZXN0YXJ0aW5nIHRoZSBwbHVnaW4gcGxhdGZvcm0gdG8gdGFrZSBlZmZlY3QuXG4gIHJlcXVpcmVzUmVzdGFydGluZ1BsdWdpblBsYXRmb3JtPzogYm9vbGVhbjtcbiAgLy8gRGVmaW5lIG9wdGlvbnMgcmVsYXRlZCB0byB0aGUgYHR5cGVgLlxuICBvcHRpb25zPzpcbiAgICB8IFRQbHVnaW5TZXR0aW5nT3B0aW9uc0VkaXRvclxuICAgIHwgVFBsdWdpblNldHRpbmdPcHRpb25zRmlsZVxuICAgIHwgVFBsdWdpblNldHRpbmdPcHRpb25zTnVtYmVyXG4gICAgfCBUUGx1Z2luU2V0dGluZ09wdGlvbnNTZWxlY3RcbiAgICB8IFRQbHVnaW5TZXR0aW5nT3B0aW9uc1N3aXRjaFxuICAgIHwgVFBsdWdpblNldHRpbmdPcHRpb25zVGV4dEFyZWE7XG4gIC8vIFRyYW5zZm9ybSB0aGUgaW5wdXQgdmFsdWUuIFRoZSByZXN1bHQgaXMgc2F2ZWQgaW4gdGhlIGZvcm0gZ2xvYmFsIHN0YXRlIG9mIFNldHRpbmdzL0NvbmZpZ3VyYXRpb25cbiAgdWlGb3JtVHJhbnNmb3JtQ2hhbmdlZElucHV0VmFsdWU/OiAodmFsdWU6IGFueSkgPT4gYW55O1xuICAvLyBUcmFuc2Zvcm0gdGhlIGNvbmZpZ3VyYXRpb24gdmFsdWUgb3IgZGVmYXVsdCBhcyBpbml0aWFsIHZhbHVlIGZvciB0aGUgaW5wdXQgaW4gU2V0dGluZ3MvQ29uZmlndXJhdGlvblxuICB1aUZvcm1UcmFuc2Zvcm1Db25maWd1cmF0aW9uVmFsdWVUb0lucHV0VmFsdWU/OiAodmFsdWU6IGFueSkgPT4gYW55O1xuICAvLyBUcmFuc2Zvcm0gdGhlIGlucHV0IHZhbHVlIGNoYW5nZWQgaW4gdGhlIGZvcm0gb2YgU2V0dGluZ3MvQ29uZmlndXJhdGlvbiBhbmQgcmV0dXJuZWQgaW4gdGhlIGBjaGFuZ2VkYCBwcm9wZXJ0eSBvZiB0aGUgaG9vayB1c2VGb3JtXG4gIHVpRm9ybVRyYW5zZm9ybUlucHV0VmFsdWVUb0NvbmZpZ3VyYXRpb25WYWx1ZT86ICh2YWx1ZTogYW55KSA9PiBhbnk7XG4gIC8vIFZhbGlkYXRlIHRoZSB2YWx1ZSBpbiB0aGUgZm9ybSBvZiBTZXR0aW5ncy9Db25maWd1cmF0aW9uLiBJdCByZXR1cm5zIGEgc3RyaW5nIGlmIHRoZXJlIGlzIHNvbWUgdmFsaWRhdGlvbiBlcnJvci5cbiAgdmFsaWRhdGVVSUZvcm0/OiAodmFsdWU6IGFueSkgPT4gc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAvLyBWYWxpZGF0ZSBmdW5jdGlvbiBjcmVhdG9yIHRvIHZhbGlkYXRlIHRoZSBzZXR0aW5nIGluIHRoZSBiYWNrZW5kLlxuICB2YWxpZGF0ZT86ICh2YWx1ZTogdW5rbm93bikgPT4gc3RyaW5nIHwgdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0IHR5cGUgVFBsdWdpblNldHRpbmdXaXRoS2V5ID0gVFBsdWdpblNldHRpbmcgJiB7IGtleTogVFBsdWdpblNldHRpbmdLZXkgfTtcbmV4cG9ydCB0eXBlIFRQbHVnaW5TZXR0aW5nQ2F0ZWdvcnkgPSB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICBkb2N1bWVudGF0aW9uTGluaz86IHN0cmluZztcbiAgcmVuZGVyT3JkZXI/OiBudW1iZXI7XG59O1xuXG5leHBvcnQgY29uc3QgUExVR0lOX1NFVFRJTkdTX0NBVEVHT1JJRVM6IHtcbiAgW2NhdGVnb3J5OiBudW1iZXJdOiBUUGx1Z2luU2V0dGluZ0NhdGVnb3J5O1xufSA9IHtcbiAgW1NldHRpbmdDYXRlZ29yeS5IRUFMVEhfQ0hFQ0tdOiB7XG4gICAgdGl0bGU6ICdIZWFsdGggY2hlY2snLFxuICAgIGRlc2NyaXB0aW9uOiBcIkNoZWNrcyB3aWxsIGJlIGV4ZWN1dGVkIGJ5IHRoZSBhcHAncyBIZWFsdGhjaGVjay5cIixcbiAgICByZW5kZXJPcmRlcjogU2V0dGluZ0NhdGVnb3J5LkhFQUxUSF9DSEVDSyxcbiAgfSxcbiAgW1NldHRpbmdDYXRlZ29yeS5HRU5FUkFMXToge1xuICAgIHRpdGxlOiAnR2VuZXJhbCcsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnQmFzaWMgYXBwIHNldHRpbmdzIHJlbGF0ZWQgdG8gYWxlcnRzIGluZGV4IHBhdHRlcm4sIGhpZGUgdGhlIG1hbmFnZXIgYWxlcnRzIGluIHRoZSBkYXNoYm9hcmRzLCBsb2dzIGxldmVsIGFuZCBtb3JlLicsXG4gICAgcmVuZGVyT3JkZXI6IFNldHRpbmdDYXRlZ29yeS5HRU5FUkFMLFxuICB9LFxuICBbU2V0dGluZ0NhdGVnb3J5LlNFQ1VSSVRZXToge1xuICAgIHRpdGxlOiAnU2VjdXJpdHknLFxuICAgIGRlc2NyaXB0aW9uOiAnQXBwbGljYXRpb24gc2VjdXJpdHkgb3B0aW9ucyBzdWNoIGFzIHVuYXV0aG9yaXplZCByb2xlcy4nLFxuICAgIHJlbmRlck9yZGVyOiBTZXR0aW5nQ2F0ZWdvcnkuU0VDVVJJVFksXG4gIH0sXG4gIFtTZXR0aW5nQ2F0ZWdvcnkuTU9OSVRPUklOR106IHtcbiAgICB0aXRsZTogJ1Rhc2s6TW9uaXRvcmluZycsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnT3B0aW9ucyByZWxhdGVkIHRvIHRoZSBhZ2VudCBzdGF0dXMgbW9uaXRvcmluZyBqb2IgYW5kIGl0cyBzdG9yYWdlIGluIGluZGV4ZXMuJyxcbiAgICByZW5kZXJPcmRlcjogU2V0dGluZ0NhdGVnb3J5Lk1PTklUT1JJTkcsXG4gIH0sXG4gIFtTZXR0aW5nQ2F0ZWdvcnkuU1RBVElTVElDU106IHtcbiAgICB0aXRsZTogJ1Rhc2s6U3RhdGlzdGljcycsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnT3B0aW9ucyByZWxhdGVkIHRvIHRoZSBkYWVtb25zIG1hbmFnZXIgbW9uaXRvcmluZyBqb2IgYW5kIHRoZWlyIHN0b3JhZ2UgaW4gaW5kZXhlcy4nLFxuICAgIHJlbmRlck9yZGVyOiBTZXR0aW5nQ2F0ZWdvcnkuU1RBVElTVElDUyxcbiAgfSxcbiAgW1NldHRpbmdDYXRlZ29yeS5WVUxORVJBQklMSVRJRVNdOiB7XG4gICAgdGl0bGU6ICdWdWxuZXJhYmlsaXRpZXMnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ09wdGlvbnMgcmVsYXRlZCB0byB0aGUgYWdlbnQgdnVsbmVyYWJpbGl0aWVzIG1vbml0b3Jpbmcgam9iIGFuZCBpdHMgc3RvcmFnZSBpbiBpbmRleGVzLicsXG4gICAgcmVuZGVyT3JkZXI6IFNldHRpbmdDYXRlZ29yeS5WVUxORVJBQklMSVRJRVMsXG4gIH0sXG4gIFtTZXR0aW5nQ2F0ZWdvcnkuQ1VTVE9NSVpBVElPTl06IHtcbiAgICB0aXRsZTogJ0N1c3RvbSBicmFuZGluZycsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnSWYgeW91IHdhbnQgdG8gdXNlIGN1c3RvbSBicmFuZGluZyBlbGVtZW50cyBzdWNoIGFzIGxvZ29zLCB5b3UgY2FuIGRvIHNvIGJ5IGVkaXRpbmcgdGhlIHNldHRpbmdzIGJlbG93LicsXG4gICAgZG9jdW1lbnRhdGlvbkxpbms6ICd1c2VyLW1hbnVhbC93YXp1aC1kYXNoYm9hcmQvd2hpdGUtbGFiZWxpbmcuaHRtbCcsXG4gICAgcmVuZGVyT3JkZXI6IFNldHRpbmdDYXRlZ29yeS5DVVNUT01JWkFUSU9OLFxuICB9LFxuICBbU2V0dGluZ0NhdGVnb3J5LkFQSV9DT05ORUNUSU9OXToge1xuICAgIHRpdGxlOiAnQVBJIGNvbm5lY3Rpb25zJyxcbiAgICBkZXNjcmlwdGlvbjogJ09wdGlvbnMgcmVsYXRlZCB0byB0aGUgQVBJIGNvbm5lY3Rpb25zLicsXG4gICAgcmVuZGVyT3JkZXI6IFNldHRpbmdDYXRlZ29yeS5BUElfQ09OTkVDVElPTixcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBQTFVHSU5fU0VUVElOR1M6IHsgW2tleTogc3RyaW5nXTogVFBsdWdpblNldHRpbmcgfSA9IHtcbiAgJ2FsZXJ0cy5zYW1wbGUucHJlZml4Jzoge1xuICAgIHRpdGxlOiAnU2FtcGxlIGFsZXJ0cyBwcmVmaXgnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0RlZmluZSB0aGUgaW5kZXggbmFtZSBwcmVmaXggb2Ygc2FtcGxlIGFsZXJ0cy4gSXQgbXVzdCBtYXRjaCB0aGUgdGVtcGxhdGUgdXNlZCBieSB0aGUgaW5kZXggcGF0dGVybiB0byBhdm9pZCB1bmtub3duIGZpZWxkcyBpbiBkYXNoYm9hcmRzLicsXG4gICAgc3RvcmU6IHtcbiAgICAgIGZpbGU6IHtcbiAgICAgICAgY29uZmlndXJhYmxlTWFuYWdlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LkdFTkVSQUwsXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLnRleHQsXG4gICAgZGVmYXVsdFZhbHVlOiBXQVpVSF9TQU1QTEVfQUxFUlRfUFJFRklYLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVNldHRpbmdzOiB0cnVlLFxuICAgIHJlcXVpcmVzUnVubmluZ0hlYWx0aENoZWNrOiB0cnVlLFxuICAgIHZhbGlkYXRlVUlGb3JtOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlKHZhbHVlKTtcbiAgICB9LFxuICAgIC8vIFZhbGlkYXRpb246IGh0dHBzOi8vZ2l0aHViLmNvbS9lbGFzdGljL2VsYXN0aWNzZWFyY2gvYmxvYi92Ny4xMC4yL2RvY3MvcmVmZXJlbmNlL2luZGljZXMvY3JlYXRlLWluZGV4LmFzY2lpZG9jXG4gICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmNvbXBvc2UoXG4gICAgICBTZXR0aW5nc1ZhbGlkYXRvci5pc1N0cmluZyxcbiAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmlzTm90RW1wdHlTdHJpbmcsXG4gICAgICBTZXR0aW5nc1ZhbGlkYXRvci5oYXNOb1NwYWNlcyxcbiAgICAgIFNldHRpbmdzVmFsaWRhdG9yLm5vU3RhcnRzV2l0aFN0cmluZygnLScsICdfJywgJysnLCAnLicpLFxuICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaGFzTm90SW52YWxpZENoYXJhY3RlcnMoXG4gICAgICAgICdcXFxcJyxcbiAgICAgICAgJy8nLFxuICAgICAgICAnPycsXG4gICAgICAgICdcIicsXG4gICAgICAgICc8JyxcbiAgICAgICAgJz4nLFxuICAgICAgICAnfCcsXG4gICAgICAgICcsJyxcbiAgICAgICAgJyMnLFxuICAgICAgICAnKicsXG4gICAgICApLFxuICAgICksXG4gIH0sXG4gICdjaGVja3MuYXBpJzoge1xuICAgIHRpdGxlOiAnQVBJIGNvbm5lY3Rpb24nLFxuICAgIGRlc2NyaXB0aW9uOiAnRW5hYmxlIG9yIGRpc2FibGUgdGhlIEFQSSBoZWFsdGggY2hlY2sgd2hlbiBvcGVuaW5nIHRoZSBhcHAuJyxcbiAgICBzdG9yZToge1xuICAgICAgZmlsZToge1xuICAgICAgICBjb25maWd1cmFibGVNYW5hZ2VkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuSEVBTFRIX0NIRUNLLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5zd2l0Y2gsXG4gICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVNldHRpbmdzOiB0cnVlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHN3aXRjaDoge1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICBkaXNhYmxlZDogeyBsYWJlbDogJ2ZhbHNlJywgdmFsdWU6IGZhbHNlIH0sXG4gICAgICAgICAgZW5hYmxlZDogeyBsYWJlbDogJ3RydWUnLCB2YWx1ZTogdHJ1ZSB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNoYW5nZWRJbnB1dFZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogYm9vbGVhbiB8IHN0cmluZyxcbiAgICApOiBib29sZWFuIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlVUlGb3JtOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5pc0Jvb2xlYW4sXG4gIH0sXG4gICdjaGVja3MuZmllbGRzJzoge1xuICAgIHRpdGxlOiAnS25vd24gZmllbGRzJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdFbmFibGUgb3IgZGlzYWJsZSB0aGUga25vd24gZmllbGRzIGhlYWx0aCBjaGVjayB3aGVuIG9wZW5pbmcgdGhlIGFwcC4nLFxuICAgIHN0b3JlOiB7XG4gICAgICBmaWxlOiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZU1hbmFnZWQ6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5IRUFMVEhfQ0hFQ0ssXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLnN3aXRjaCxcbiAgICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tU2V0dGluZ3M6IHRydWUsXG4gICAgb3B0aW9uczoge1xuICAgICAgc3dpdGNoOiB7XG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgIGRpc2FibGVkOiB7IGxhYmVsOiAnZmFsc2UnLCB2YWx1ZTogZmFsc2UgfSxcbiAgICAgICAgICBlbmFibGVkOiB7IGxhYmVsOiAndHJ1ZScsIHZhbHVlOiB0cnVlIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtQ2hhbmdlZElucHV0VmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgIHZhbHVlOiBib29sZWFuIHwgc3RyaW5nLFxuICAgICk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGVVSUZvcm06IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGUodmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmlzQm9vbGVhbixcbiAgfSxcbiAgJ2NoZWNrcy5tYXhCdWNrZXRzJzoge1xuICAgIHRpdGxlOiAnU2V0IG1heCBidWNrZXRzIHRvIDIwMDAwMCcsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnQ2hhbmdlIHRoZSBkZWZhdWx0IHZhbHVlIG9mIHRoZSBwbHVnaW4gcGxhdGZvcm0gbWF4IGJ1Y2tldHMgY29uZmlndXJhdGlvbi4nLFxuICAgIHN0b3JlOiB7XG4gICAgICBmaWxlOiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZU1hbmFnZWQ6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5IRUFMVEhfQ0hFQ0ssXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLnN3aXRjaCxcbiAgICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tU2V0dGluZ3M6IHRydWUsXG4gICAgb3B0aW9uczoge1xuICAgICAgc3dpdGNoOiB7XG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgIGRpc2FibGVkOiB7IGxhYmVsOiAnZmFsc2UnLCB2YWx1ZTogZmFsc2UgfSxcbiAgICAgICAgICBlbmFibGVkOiB7IGxhYmVsOiAndHJ1ZScsIHZhbHVlOiB0cnVlIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtQ2hhbmdlZElucHV0VmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgIHZhbHVlOiBib29sZWFuIHwgc3RyaW5nLFxuICAgICk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGVVSUZvcm06IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGUodmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmlzQm9vbGVhbixcbiAgfSxcbiAgJ2NoZWNrcy5tZXRhRmllbGRzJzoge1xuICAgIHRpdGxlOiAnUmVtb3ZlIG1ldGEgZmllbGRzJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdDaGFuZ2UgdGhlIGRlZmF1bHQgdmFsdWUgb2YgdGhlIHBsdWdpbiBwbGF0Zm9ybSBtZXRhRmllbGQgY29uZmlndXJhdGlvbi4nLFxuICAgIHN0b3JlOiB7XG4gICAgICBmaWxlOiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZU1hbmFnZWQ6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5IRUFMVEhfQ0hFQ0ssXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLnN3aXRjaCxcbiAgICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tU2V0dGluZ3M6IHRydWUsXG4gICAgb3B0aW9uczoge1xuICAgICAgc3dpdGNoOiB7XG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgIGRpc2FibGVkOiB7IGxhYmVsOiAnZmFsc2UnLCB2YWx1ZTogZmFsc2UgfSxcbiAgICAgICAgICBlbmFibGVkOiB7IGxhYmVsOiAndHJ1ZScsIHZhbHVlOiB0cnVlIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtQ2hhbmdlZElucHV0VmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgIHZhbHVlOiBib29sZWFuIHwgc3RyaW5nLFxuICAgICk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGVVSUZvcm06IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGUodmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmlzQm9vbGVhbixcbiAgfSxcbiAgJ2NoZWNrcy5wYXR0ZXJuJzoge1xuICAgIHRpdGxlOiAnSW5kZXggcGF0dGVybicsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnRW5hYmxlIG9yIGRpc2FibGUgdGhlIGluZGV4IHBhdHRlcm4gaGVhbHRoIGNoZWNrIHdoZW4gb3BlbmluZyB0aGUgYXBwLicsXG4gICAgc3RvcmU6IHtcbiAgICAgIGZpbGU6IHtcbiAgICAgICAgY29uZmlndXJhYmxlTWFuYWdlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LkhFQUxUSF9DSEVDSyxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUuc3dpdGNoLFxuICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21TZXR0aW5nczogdHJ1ZSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBzd2l0Y2g6IHtcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgZGlzYWJsZWQ6IHsgbGFiZWw6ICdmYWxzZScsIHZhbHVlOiBmYWxzZSB9LFxuICAgICAgICAgIGVuYWJsZWQ6IHsgbGFiZWw6ICd0cnVlJywgdmFsdWU6IHRydWUgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB1aUZvcm1UcmFuc2Zvcm1DaGFuZ2VkSW5wdXRWYWx1ZTogZnVuY3Rpb24gKFxuICAgICAgdmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcsXG4gICAgKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gQm9vbGVhbih2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZVVJRm9ybTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZSh2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZTogU2V0dGluZ3NWYWxpZGF0b3IuaXNCb29sZWFuLFxuICB9LFxuICAnY2hlY2tzLnNldHVwJzoge1xuICAgIHRpdGxlOiAnQVBJIHZlcnNpb24nLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0VuYWJsZSBvciBkaXNhYmxlIHRoZSBzZXR1cCBoZWFsdGggY2hlY2sgd2hlbiBvcGVuaW5nIHRoZSBhcHAuJyxcbiAgICBzdG9yZToge1xuICAgICAgZmlsZToge1xuICAgICAgICBjb25maWd1cmFibGVNYW5hZ2VkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuSEVBTFRIX0NIRUNLLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5zd2l0Y2gsXG4gICAgZGVmYXVsdFZhbHVlOiB0cnVlLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVNldHRpbmdzOiB0cnVlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHN3aXRjaDoge1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICBkaXNhYmxlZDogeyBsYWJlbDogJ2ZhbHNlJywgdmFsdWU6IGZhbHNlIH0sXG4gICAgICAgICAgZW5hYmxlZDogeyBsYWJlbDogJ3RydWUnLCB2YWx1ZTogdHJ1ZSB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNoYW5nZWRJbnB1dFZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogYm9vbGVhbiB8IHN0cmluZyxcbiAgICApOiBib29sZWFuIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlVUlGb3JtOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5pc0Jvb2xlYW4sXG4gIH0sXG4gICdjaGVja3MudGVtcGxhdGUnOiB7XG4gICAgdGl0bGU6ICdJbmRleCB0ZW1wbGF0ZScsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnRW5hYmxlIG9yIGRpc2FibGUgdGhlIHRlbXBsYXRlIGhlYWx0aCBjaGVjayB3aGVuIG9wZW5pbmcgdGhlIGFwcC4nLFxuICAgIHN0b3JlOiB7XG4gICAgICBmaWxlOiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZU1hbmFnZWQ6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5IRUFMVEhfQ0hFQ0ssXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLnN3aXRjaCxcbiAgICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tU2V0dGluZ3M6IHRydWUsXG4gICAgb3B0aW9uczoge1xuICAgICAgc3dpdGNoOiB7XG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgIGRpc2FibGVkOiB7IGxhYmVsOiAnZmFsc2UnLCB2YWx1ZTogZmFsc2UgfSxcbiAgICAgICAgICBlbmFibGVkOiB7IGxhYmVsOiAndHJ1ZScsIHZhbHVlOiB0cnVlIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtQ2hhbmdlZElucHV0VmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgIHZhbHVlOiBib29sZWFuIHwgc3RyaW5nLFxuICAgICk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGVVSUZvcm06IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGUodmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmlzQm9vbGVhbixcbiAgfSxcbiAgJ2NoZWNrcy50aW1lRmlsdGVyJzoge1xuICAgIHRpdGxlOiAnU2V0IHRpbWUgZmlsdGVyIHRvIDI0aCcsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnQ2hhbmdlIHRoZSBkZWZhdWx0IHZhbHVlIG9mIHRoZSBwbHVnaW4gcGxhdGZvcm0gdGltZUZpbHRlciBjb25maWd1cmF0aW9uLicsXG4gICAgc3RvcmU6IHtcbiAgICAgIGZpbGU6IHtcbiAgICAgICAgY29uZmlndXJhYmxlTWFuYWdlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LkhFQUxUSF9DSEVDSyxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUuc3dpdGNoLFxuICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21TZXR0aW5nczogdHJ1ZSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBzd2l0Y2g6IHtcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgZGlzYWJsZWQ6IHsgbGFiZWw6ICdmYWxzZScsIHZhbHVlOiBmYWxzZSB9LFxuICAgICAgICAgIGVuYWJsZWQ6IHsgbGFiZWw6ICd0cnVlJywgdmFsdWU6IHRydWUgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB1aUZvcm1UcmFuc2Zvcm1DaGFuZ2VkSW5wdXRWYWx1ZTogZnVuY3Rpb24gKFxuICAgICAgdmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcsXG4gICAgKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gQm9vbGVhbih2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZVVJRm9ybTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZSh2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZTogU2V0dGluZ3NWYWxpZGF0b3IuaXNCb29sZWFuLFxuICB9LFxuICAnY29uZmlndXJhdGlvbi51aV9hcGlfZWRpdGFibGUnOiB7XG4gICAgdGl0bGU6ICdDb25maWd1cmF0aW9uIFVJIGVkaXRhYmxlJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdFbmFibGUgb3IgZGlzYWJsZSB0aGUgYWJpbGl0eSB0byBlZGl0IHRoZSBjb25maWd1cmF0aW9uIGZyb20gVUkgb3IgQVBJIGVuZHBvaW50cy4gV2hlbiBkaXNhYmxlZCwgdGhpcyBjYW4gb25seSBiZSBlZGl0ZWQgZnJvbSB0aGUgY29uZmlndXJhdGlvbiBmaWxlLCB0aGUgcmVsYXRlZCBBUEkgZW5kcG9pbnRzIGFyZSBkaXNhYmxlZCwgYW5kIHRoZSBVSSBpcyBpbmFjY2Vzc2libGUuJyxcbiAgICBzdG9yZToge1xuICAgICAgZmlsZToge1xuICAgICAgICBjb25maWd1cmFibGVNYW5hZ2VkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LkdFTkVSQUwsXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLnN3aXRjaCxcbiAgICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tU2V0dGluZ3M6IGZhbHNlLFxuICAgIHJlcXVpcmVzUmVzdGFydGluZ1BsdWdpblBsYXRmb3JtOiB0cnVlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHN3aXRjaDoge1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICBkaXNhYmxlZDogeyBsYWJlbDogJ2ZhbHNlJywgdmFsdWU6IGZhbHNlIH0sXG4gICAgICAgICAgZW5hYmxlZDogeyBsYWJlbDogJ3RydWUnLCB2YWx1ZTogdHJ1ZSB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNoYW5nZWRJbnB1dFZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogYm9vbGVhbiB8IHN0cmluZyxcbiAgICApOiBib29sZWFuIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlVUlGb3JtOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5pc0Jvb2xlYW4sXG4gIH0sXG4gICdjcm9uLnByZWZpeCc6IHtcbiAgICB0aXRsZTogJ0Nyb24gcHJlZml4JyxcbiAgICBkZXNjcmlwdGlvbjogJ0RlZmluZSB0aGUgaW5kZXggcHJlZml4IG9mIHByZWRlZmluZWQgam9icy4nLFxuICAgIHN0b3JlOiB7XG4gICAgICBmaWxlOiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZU1hbmFnZWQ6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5HRU5FUkFMLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS50ZXh0LFxuICAgIGRlZmF1bHRWYWx1ZTogV0FaVUhfU1RBVElTVElDU19ERUZBVUxUX1BSRUZJWCxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21TZXR0aW5nczogdHJ1ZSxcbiAgICB2YWxpZGF0ZVVJRm9ybTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZSh2YWx1ZSk7XG4gICAgfSxcbiAgICAvLyBWYWxpZGF0aW9uOiBodHRwczovL2dpdGh1Yi5jb20vZWxhc3RpYy9lbGFzdGljc2VhcmNoL2Jsb2IvdjcuMTAuMi9kb2NzL3JlZmVyZW5jZS9pbmRpY2VzL2NyZWF0ZS1pbmRleC5hc2NpaWRvY1xuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5jb21wb3NlKFxuICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaXNTdHJpbmcsXG4gICAgICBTZXR0aW5nc1ZhbGlkYXRvci5pc05vdEVtcHR5U3RyaW5nLFxuICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaGFzTm9TcGFjZXMsXG4gICAgICBTZXR0aW5nc1ZhbGlkYXRvci5ub1N0YXJ0c1dpdGhTdHJpbmcoJy0nLCAnXycsICcrJywgJy4nKSxcbiAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmhhc05vdEludmFsaWRDaGFyYWN0ZXJzKFxuICAgICAgICAnXFxcXCcsXG4gICAgICAgICcvJyxcbiAgICAgICAgJz8nLFxuICAgICAgICAnXCInLFxuICAgICAgICAnPCcsXG4gICAgICAgICc+JyxcbiAgICAgICAgJ3wnLFxuICAgICAgICAnLCcsXG4gICAgICAgICcjJyxcbiAgICAgICAgJyonLFxuICAgICAgKSxcbiAgICApLFxuICB9LFxuICAnY3Jvbi5zdGF0aXN0aWNzLmFwaXMnOiB7XG4gICAgdGl0bGU6ICdJbmNsdWRlcyBBUElzJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdFbnRlciB0aGUgSUQgb2YgdGhlIGhvc3RzIHlvdSB3YW50IHRvIHNhdmUgZGF0YSBmcm9tLCBsZWF2ZSB0aGlzIGVtcHR5IHRvIHJ1biB0aGUgdGFzayBvbiBldmVyeSBob3N0LicsXG4gICAgc3RvcmU6IHtcbiAgICAgIGZpbGU6IHtcbiAgICAgICAgY29uZmlndXJhYmxlTWFuYWdlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LlNUQVRJU1RJQ1MsXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLmVkaXRvcixcbiAgICBkZWZhdWx0VmFsdWU6IFtdLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVNldHRpbmdzOiB0cnVlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIGVkaXRvcjoge1xuICAgICAgICBsYW5ndWFnZTogJ2pzb24nLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNvbmZpZ3VyYXRpb25WYWx1ZVRvSW5wdXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlOiBhbnkpOiBhbnkge1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUlucHV0VmFsdWVUb0NvbmZpZ3VyYXRpb25WYWx1ZTogZnVuY3Rpb24gKFxuICAgICAgdmFsdWU6IHN0cmluZyxcbiAgICApOiBhbnkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgIH0sXG4gICAgdmFsaWRhdGVVSUZvcm06IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIFNldHRpbmdzVmFsaWRhdG9yLmpzb24odGhpcy52YWxpZGF0ZSkodmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmNvbXBvc2UoXG4gICAgICBTZXR0aW5nc1ZhbGlkYXRvci5hcnJheShcbiAgICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuY29tcG9zZShcbiAgICAgICAgICBTZXR0aW5nc1ZhbGlkYXRvci5pc1N0cmluZyxcbiAgICAgICAgICBTZXR0aW5nc1ZhbGlkYXRvci5pc05vdEVtcHR5U3RyaW5nLFxuICAgICAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmhhc05vU3BhY2VzLFxuICAgICAgICApLFxuICAgICAgKSxcbiAgICApLFxuICB9LFxuICAnY3Jvbi5zdGF0aXN0aWNzLmluZGV4LmNyZWF0aW9uJzoge1xuICAgIHRpdGxlOiAnSW5kZXggY3JlYXRpb24nLFxuICAgIGRlc2NyaXB0aW9uOiAnRGVmaW5lIHRoZSBpbnRlcnZhbCBpbiB3aGljaCBhIG5ldyBpbmRleCB3aWxsIGJlIGNyZWF0ZWQuJyxcbiAgICBzdG9yZToge1xuICAgICAgZmlsZToge1xuICAgICAgICBjb25maWd1cmFibGVNYW5hZ2VkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuU1RBVElTVElDUyxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUuc2VsZWN0LFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHNlbGVjdDogW1xuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ0hvdXJseScsXG4gICAgICAgICAgdmFsdWU6ICdoJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdEYWlseScsXG4gICAgICAgICAgdmFsdWU6ICdkJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdXZWVrbHknLFxuICAgICAgICAgIHZhbHVlOiAndycsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnTW9udGhseScsXG4gICAgICAgICAgdmFsdWU6ICdtJyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBkZWZhdWx0VmFsdWU6IFdBWlVIX1NUQVRJU1RJQ1NfREVGQVVMVF9DUkVBVElPTixcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21TZXR0aW5nczogdHJ1ZSxcbiAgICByZXF1aXJlc1J1bm5pbmdIZWFsdGhDaGVjazogdHJ1ZSxcbiAgICB2YWxpZGF0ZVVJRm9ybTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZSh2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gU2V0dGluZ3NWYWxpZGF0b3IubGl0ZXJhbChcbiAgICAgICAgdGhpcy5vcHRpb25zLnNlbGVjdC5tYXAoKHsgdmFsdWUgfSkgPT4gdmFsdWUpLFxuICAgICAgKSh2YWx1ZSk7XG4gICAgfSxcbiAgfSxcbiAgJ2Nyb24uc3RhdGlzdGljcy5pbmRleC5uYW1lJzoge1xuICAgIHRpdGxlOiAnSW5kZXggbmFtZScsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnRGVmaW5lIHRoZSBuYW1lIG9mIHRoZSBpbmRleCBpbiB3aGljaCB0aGUgZG9jdW1lbnRzIHdpbGwgYmUgc2F2ZWQuJyxcbiAgICBzdG9yZToge1xuICAgICAgZmlsZToge1xuICAgICAgICBjb25maWd1cmFibGVNYW5hZ2VkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuU1RBVElTVElDUyxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUudGV4dCxcbiAgICBkZWZhdWx0VmFsdWU6IFdBWlVIX1NUQVRJU1RJQ1NfREVGQVVMVF9OQU1FLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVNldHRpbmdzOiB0cnVlLFxuICAgIHJlcXVpcmVzUnVubmluZ0hlYWx0aENoZWNrOiB0cnVlLFxuICAgIHZhbGlkYXRlVUlGb3JtOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlKHZhbHVlKTtcbiAgICB9LFxuICAgIC8vIFZhbGlkYXRpb246IGh0dHBzOi8vZ2l0aHViLmNvbS9lbGFzdGljL2VsYXN0aWNzZWFyY2gvYmxvYi92Ny4xMC4yL2RvY3MvcmVmZXJlbmNlL2luZGljZXMvY3JlYXRlLWluZGV4LmFzY2lpZG9jXG4gICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmNvbXBvc2UoXG4gICAgICBTZXR0aW5nc1ZhbGlkYXRvci5pc1N0cmluZyxcbiAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmlzTm90RW1wdHlTdHJpbmcsXG4gICAgICBTZXR0aW5nc1ZhbGlkYXRvci5oYXNOb1NwYWNlcyxcbiAgICAgIFNldHRpbmdzVmFsaWRhdG9yLm5vU3RhcnRzV2l0aFN0cmluZygnLScsICdfJywgJysnLCAnLicpLFxuICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaGFzTm90SW52YWxpZENoYXJhY3RlcnMoXG4gICAgICAgICdcXFxcJyxcbiAgICAgICAgJy8nLFxuICAgICAgICAnPycsXG4gICAgICAgICdcIicsXG4gICAgICAgICc8JyxcbiAgICAgICAgJz4nLFxuICAgICAgICAnfCcsXG4gICAgICAgICcsJyxcbiAgICAgICAgJyMnLFxuICAgICAgICAnKicsXG4gICAgICApLFxuICAgICksXG4gIH0sXG4gICdjcm9uLnN0YXRpc3RpY3MuaW5kZXgucmVwbGljYXMnOiB7XG4gICAgdGl0bGU6ICdJbmRleCByZXBsaWNhcycsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnRGVmaW5lIHRoZSBudW1iZXIgb2YgcmVwbGljYXMgdG8gdXNlIGZvciB0aGUgc3RhdGlzdGljcyBpbmRpY2VzLicsXG4gICAgc3RvcmU6IHtcbiAgICAgIGZpbGU6IHtcbiAgICAgICAgY29uZmlndXJhYmxlTWFuYWdlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LlNUQVRJU1RJQ1MsXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLm51bWJlcixcbiAgICBkZWZhdWx0VmFsdWU6IFdBWlVIX1NUQVRJU1RJQ1NfREVGQVVMVF9JTkRJQ0VTX1JFUExJQ0FTLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVNldHRpbmdzOiB0cnVlLFxuICAgIHJlcXVpcmVzUnVubmluZ0hlYWx0aENoZWNrOiB0cnVlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIG51bWJlcjoge1xuICAgICAgICBtaW46IDAsXG4gICAgICAgIGludGVnZXI6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtQ29uZmlndXJhdGlvblZhbHVlVG9JbnB1dFZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogbnVtYmVyLFxuICAgICk6IHN0cmluZyB7XG4gICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUlucHV0VmFsdWVUb0NvbmZpZ3VyYXRpb25WYWx1ZTogZnVuY3Rpb24gKFxuICAgICAgdmFsdWU6IHN0cmluZyxcbiAgICApOiBudW1iZXIge1xuICAgICAgcmV0dXJuIE51bWJlcih2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZVVJRm9ybTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZShcbiAgICAgICAgdGhpcy51aUZvcm1UcmFuc2Zvcm1JbnB1dFZhbHVlVG9Db25maWd1cmF0aW9uVmFsdWUodmFsdWUpLFxuICAgICAgKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBTZXR0aW5nc1ZhbGlkYXRvci5udW1iZXIodGhpcy5vcHRpb25zLm51bWJlcikodmFsdWUpO1xuICAgIH0sXG4gIH0sXG4gICdjcm9uLnN0YXRpc3RpY3MuaW5kZXguc2hhcmRzJzoge1xuICAgIHRpdGxlOiAnSW5kZXggc2hhcmRzJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdEZWZpbmUgdGhlIG51bWJlciBvZiBzaGFyZHMgdG8gdXNlIGZvciB0aGUgc3RhdGlzdGljcyBpbmRpY2VzLicsXG4gICAgc3RvcmU6IHtcbiAgICAgIGZpbGU6IHtcbiAgICAgICAgY29uZmlndXJhYmxlTWFuYWdlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LlNUQVRJU1RJQ1MsXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLm51bWJlcixcbiAgICBkZWZhdWx0VmFsdWU6IFdBWlVIX1NUQVRJU1RJQ1NfREVGQVVMVF9JTkRJQ0VTX1NIQVJEUyxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21TZXR0aW5nczogdHJ1ZSxcbiAgICByZXF1aXJlc1J1bm5pbmdIZWFsdGhDaGVjazogdHJ1ZSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBudW1iZXI6IHtcbiAgICAgICAgbWluOiAxLFxuICAgICAgICBpbnRlZ2VyOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNvbmZpZ3VyYXRpb25WYWx1ZVRvSW5wdXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtSW5wdXRWYWx1ZVRvQ29uZmlndXJhdGlvblZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogc3RyaW5nLFxuICAgICk6IG51bWJlciB7XG4gICAgICByZXR1cm4gTnVtYmVyKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlVUlGb3JtOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlKFxuICAgICAgICB0aGlzLnVpRm9ybVRyYW5zZm9ybUlucHV0VmFsdWVUb0NvbmZpZ3VyYXRpb25WYWx1ZSh2YWx1ZSksXG4gICAgICApO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIFNldHRpbmdzVmFsaWRhdG9yLm51bWJlcih0aGlzLm9wdGlvbnMubnVtYmVyKSh2YWx1ZSk7XG4gICAgfSxcbiAgfSxcbiAgJ2Nyb24uc3RhdGlzdGljcy5pbnRlcnZhbCc6IHtcbiAgICB0aXRsZTogJ0ludGVydmFsJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdEZWZpbmUgdGhlIGZyZXF1ZW5jeSBvZiB0YXNrIGV4ZWN1dGlvbiB1c2luZyBjcm9uIHNjaGVkdWxlIGV4cHJlc3Npb25zLicsXG4gICAgc3RvcmU6IHtcbiAgICAgIGZpbGU6IHtcbiAgICAgICAgY29uZmlndXJhYmxlTWFuYWdlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LlNUQVRJU1RJQ1MsXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLnRleHQsXG4gICAgZGVmYXVsdFZhbHVlOiBXQVpVSF9TVEFUSVNUSUNTX0RFRkFVTFRfQ1JPTl9GUkVRLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVNldHRpbmdzOiB0cnVlLFxuICAgIHJlcXVpcmVzUmVzdGFydGluZ1BsdWdpblBsYXRmb3JtOiB0cnVlLFxuICAgIC8vIFdvcmthcm91bmQ6IHRoaXMgbmVlZCB0byBiZSBkZWZpbmVkIGluIHRoZSBmcm9udGVuZCBzaWRlIGFuZCBiYWNrZW5kIHNpZGUgYmVjYXVzZSBhbiBvcHRpbWl6YXRpb24gZXJyb3IgaW4gdGhlIGZyb250ZW5kIHNpZGUgcmVsYXRlZCB0byBzb21lIG1vZHVsZSBjYW4gbm90IGJlIGxvYWRlZC5cbiAgICAvLyB2YWxpZGF0ZVVJRm9ybTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgLy8gfSxcbiAgICAvLyB2YWxpZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgLy8gfSxcbiAgfSxcbiAgJ2Nyb24uc3RhdGlzdGljcy5zdGF0dXMnOiB7XG4gICAgdGl0bGU6ICdTdGF0dXMnLFxuICAgIGRlc2NyaXB0aW9uOiAnRW5hYmxlIG9yIGRpc2FibGUgdGhlIHN0YXRpc3RpY3MgdGFza3MuJyxcbiAgICBzdG9yZToge1xuICAgICAgZmlsZToge1xuICAgICAgICBjb25maWd1cmFibGVNYW5hZ2VkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuU1RBVElTVElDUyxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUuc3dpdGNoLFxuICAgIGRlZmF1bHRWYWx1ZTogV0FaVUhfU1RBVElTVElDU19ERUZBVUxUX1NUQVRVUyxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21TZXR0aW5nczogdHJ1ZSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBzd2l0Y2g6IHtcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgZGlzYWJsZWQ6IHsgbGFiZWw6ICdmYWxzZScsIHZhbHVlOiBmYWxzZSB9LFxuICAgICAgICAgIGVuYWJsZWQ6IHsgbGFiZWw6ICd0cnVlJywgdmFsdWU6IHRydWUgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB1aUZvcm1UcmFuc2Zvcm1DaGFuZ2VkSW5wdXRWYWx1ZTogZnVuY3Rpb24gKFxuICAgICAgdmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcsXG4gICAgKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gQm9vbGVhbih2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZVVJRm9ybTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZSh2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZTogU2V0dGluZ3NWYWxpZGF0b3IuaXNCb29sZWFuLFxuICB9LFxuICAnY3VzdG9taXphdGlvbi5lbmFibGVkJzoge1xuICAgIHRpdGxlOiAnU3RhdHVzJyxcbiAgICBkZXNjcmlwdGlvbjogJ0VuYWJsZSBvciBkaXNhYmxlIHRoZSBjdXN0b21pemF0aW9uLicsXG4gICAgc3RvcmU6IHtcbiAgICAgIGZpbGU6IHtcbiAgICAgICAgY29uZmlndXJhYmxlTWFuYWdlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LkNVU1RPTUlaQVRJT04sXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLnN3aXRjaCxcbiAgICBkZWZhdWx0VmFsdWU6IHRydWUsXG4gICAgaXNDb25maWd1cmFibGVGcm9tU2V0dGluZ3M6IHRydWUsXG4gICAgcmVxdWlyZXNSZWxvYWRpbmdCcm93c2VyVGFiOiB0cnVlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHN3aXRjaDoge1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICBkaXNhYmxlZDogeyBsYWJlbDogJ2ZhbHNlJywgdmFsdWU6IGZhbHNlIH0sXG4gICAgICAgICAgZW5hYmxlZDogeyBsYWJlbDogJ3RydWUnLCB2YWx1ZTogdHJ1ZSB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNoYW5nZWRJbnB1dFZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogYm9vbGVhbiB8IHN0cmluZyxcbiAgICApOiBib29sZWFuIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlVUlGb3JtOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5pc0Jvb2xlYW4sXG4gIH0sXG4gICdjdXN0b21pemF0aW9uLmxvZ28uYXBwJzoge1xuICAgIHRpdGxlOiAnQXBwIG1haW4gbG9nbycsXG4gICAgZGVzY3JpcHRpb246IGBUaGlzIGxvZ28gaXMgdXNlZCBhcyBsb2FkaW5nIGluZGljYXRvciB3aGlsZSB0aGUgdXNlciBpcyBsb2dnaW5nIGludG8gV2F6dWggQVBJLmAsXG4gICAgc3RvcmU6IHtcbiAgICAgIGZpbGU6IHtcbiAgICAgICAgY29uZmlndXJhYmxlTWFuYWdlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LkNVU1RPTUlaQVRJT04sXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLmZpbGVwaWNrZXIsXG4gICAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21TZXR0aW5nczogdHJ1ZSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBmaWxlOiB7XG4gICAgICAgIHR5cGU6ICdpbWFnZScsXG4gICAgICAgIGV4dGVuc2lvbnM6IFsnLmpwZWcnLCAnLmpwZycsICcucG5nJywgJy5zdmcnXSxcbiAgICAgICAgc2l6ZToge1xuICAgICAgICAgIG1heEJ5dGVzOlxuICAgICAgICAgICAgQ1VTVE9NSVpBVElPTl9FTkRQT0lOVF9QQVlMT0FEX1VQTE9BRF9DVVNUT01fRklMRV9NQVhJTVVNX0JZVEVTLFxuICAgICAgICB9LFxuICAgICAgICByZWNvbW1lbmRlZDoge1xuICAgICAgICAgIGRpbWVuc2lvbnM6IHtcbiAgICAgICAgICAgIHdpZHRoOiAzMDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDcwLFxuICAgICAgICAgICAgdW5pdDogJ3B4JyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBzdG9yZToge1xuICAgICAgICAgIHJlbGF0aXZlUGF0aEZpbGVTeXN0ZW06ICdwdWJsaWMvYXNzZXRzL2N1c3RvbS9pbWFnZXMnLFxuICAgICAgICAgIGZpbGVuYW1lOiAnY3VzdG9taXphdGlvbi5sb2dvLmFwcCcsXG4gICAgICAgICAgcmVzb2x2ZVN0YXRpY1VSTDogKGZpbGVuYW1lOiBzdHJpbmcpID0+XG4gICAgICAgICAgICBgY3VzdG9tL2ltYWdlcy8ke2ZpbGVuYW1lfT92PSR7RGF0ZS5ub3coKX1gLFxuICAgICAgICAgIC8vID92PSR7RGF0ZS5ub3coKX0gaXMgdXNlZCB0byBmb3JjZSB0aGUgYnJvd3NlciB0byByZWxvYWQgdGhlIGltYWdlIHdoZW4gYSBuZXcgZmlsZSBpcyB1cGxvYWRlZFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHZhbGlkYXRlVUlGb3JtOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBTZXR0aW5nc1ZhbGlkYXRvci5jb21wb3NlKFxuICAgICAgICBTZXR0aW5nc1ZhbGlkYXRvci5maWxlUGlja2VyRmlsZVNpemUoe1xuICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy5maWxlLnNpemUsXG4gICAgICAgICAgbWVhbmluZ2Z1bFVuaXQ6IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgICBTZXR0aW5nc1ZhbGlkYXRvci5maWxlUGlja2VyU3VwcG9ydGVkRXh0ZW5zaW9ucyhcbiAgICAgICAgICB0aGlzLm9wdGlvbnMuZmlsZS5leHRlbnNpb25zLFxuICAgICAgICApLFxuICAgICAgKSh2YWx1ZSk7XG4gICAgfSxcbiAgfSxcbiAgJ2N1c3RvbWl6YXRpb24ubG9nby5oZWFsdGhjaGVjayc6IHtcbiAgICB0aXRsZTogJ0hlYWx0aGNoZWNrIGxvZ28nLFxuICAgIGRlc2NyaXB0aW9uOiBgVGhpcyBsb2dvIGlzIGRpc3BsYXllZCBkdXJpbmcgdGhlIEhlYWx0aGNoZWNrIHJvdXRpbmUgb2YgdGhlIGFwcC5gLFxuICAgIHN0b3JlOiB7XG4gICAgICBmaWxlOiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZU1hbmFnZWQ6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5DVVNUT01JWkFUSU9OLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5maWxlcGlja2VyLFxuICAgIGRlZmF1bHRWYWx1ZTogJycsXG4gICAgaXNDb25maWd1cmFibGVGcm9tU2V0dGluZ3M6IHRydWUsXG4gICAgb3B0aW9uczoge1xuICAgICAgZmlsZToge1xuICAgICAgICB0eXBlOiAnaW1hZ2UnLFxuICAgICAgICBleHRlbnNpb25zOiBbJy5qcGVnJywgJy5qcGcnLCAnLnBuZycsICcuc3ZnJ10sXG4gICAgICAgIHNpemU6IHtcbiAgICAgICAgICBtYXhCeXRlczpcbiAgICAgICAgICAgIENVU1RPTUlaQVRJT05fRU5EUE9JTlRfUEFZTE9BRF9VUExPQURfQ1VTVE9NX0ZJTEVfTUFYSU1VTV9CWVRFUyxcbiAgICAgICAgfSxcbiAgICAgICAgcmVjb21tZW5kZWQ6IHtcbiAgICAgICAgICBkaW1lbnNpb25zOiB7XG4gICAgICAgICAgICB3aWR0aDogMzAwLFxuICAgICAgICAgICAgaGVpZ2h0OiA3MCxcbiAgICAgICAgICAgIHVuaXQ6ICdweCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgc3RvcmU6IHtcbiAgICAgICAgICByZWxhdGl2ZVBhdGhGaWxlU3lzdGVtOiAncHVibGljL2Fzc2V0cy9jdXN0b20vaW1hZ2VzJyxcbiAgICAgICAgICBmaWxlbmFtZTogJ2N1c3RvbWl6YXRpb24ubG9nby5oZWFsdGhjaGVjaycsXG4gICAgICAgICAgcmVzb2x2ZVN0YXRpY1VSTDogKGZpbGVuYW1lOiBzdHJpbmcpID0+XG4gICAgICAgICAgICBgY3VzdG9tL2ltYWdlcy8ke2ZpbGVuYW1lfT92PSR7RGF0ZS5ub3coKX1gLFxuICAgICAgICAgIC8vID92PSR7RGF0ZS5ub3coKX0gaXMgdXNlZCB0byBmb3JjZSB0aGUgYnJvd3NlciB0byByZWxvYWQgdGhlIGltYWdlIHdoZW4gYSBuZXcgZmlsZSBpcyB1cGxvYWRlZFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHZhbGlkYXRlVUlGb3JtOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBTZXR0aW5nc1ZhbGlkYXRvci5jb21wb3NlKFxuICAgICAgICBTZXR0aW5nc1ZhbGlkYXRvci5maWxlUGlja2VyRmlsZVNpemUoe1xuICAgICAgICAgIC4uLnRoaXMub3B0aW9ucy5maWxlLnNpemUsXG4gICAgICAgICAgbWVhbmluZ2Z1bFVuaXQ6IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgICBTZXR0aW5nc1ZhbGlkYXRvci5maWxlUGlja2VyU3VwcG9ydGVkRXh0ZW5zaW9ucyhcbiAgICAgICAgICB0aGlzLm9wdGlvbnMuZmlsZS5leHRlbnNpb25zLFxuICAgICAgICApLFxuICAgICAgKSh2YWx1ZSk7XG4gICAgfSxcbiAgfSxcbiAgJ2N1c3RvbWl6YXRpb24ubG9nby5yZXBvcnRzJzoge1xuICAgIHRpdGxlOiAnUERGIHJlcG9ydHMgbG9nbycsXG4gICAgZGVzY3JpcHRpb246IGBUaGlzIGxvZ28gaXMgdXNlZCBpbiB0aGUgUERGIHJlcG9ydHMgZ2VuZXJhdGVkIGJ5IHRoZSBhcHAuIEl0J3MgcGxhY2VkIGF0IHRoZSB0b3AgbGVmdCBjb3JuZXIgb2YgZXZlcnkgcGFnZSBvZiB0aGUgUERGLmAsXG4gICAgc3RvcmU6IHtcbiAgICAgIGZpbGU6IHtcbiAgICAgICAgY29uZmlndXJhYmxlTWFuYWdlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LkNVU1RPTUlaQVRJT04sXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLmZpbGVwaWNrZXIsXG4gICAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgICBkZWZhdWx0VmFsdWVJZk5vdFNldDogUkVQT1JUU19MT0dPX0lNQUdFX0FTU0VUU19SRUxBVElWRV9QQVRILFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVNldHRpbmdzOiB0cnVlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIGZpbGU6IHtcbiAgICAgICAgdHlwZTogJ2ltYWdlJyxcbiAgICAgICAgZXh0ZW5zaW9uczogWycuanBlZycsICcuanBnJywgJy5wbmcnXSxcbiAgICAgICAgc2l6ZToge1xuICAgICAgICAgIG1heEJ5dGVzOlxuICAgICAgICAgICAgQ1VTVE9NSVpBVElPTl9FTkRQT0lOVF9QQVlMT0FEX1VQTE9BRF9DVVNUT01fRklMRV9NQVhJTVVNX0JZVEVTLFxuICAgICAgICB9LFxuICAgICAgICByZWNvbW1lbmRlZDoge1xuICAgICAgICAgIGRpbWVuc2lvbnM6IHtcbiAgICAgICAgICAgIHdpZHRoOiAxOTAsXG4gICAgICAgICAgICBoZWlnaHQ6IDQwLFxuICAgICAgICAgICAgdW5pdDogJ3B4JyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBzdG9yZToge1xuICAgICAgICAgIHJlbGF0aXZlUGF0aEZpbGVTeXN0ZW06ICdwdWJsaWMvYXNzZXRzL2N1c3RvbS9pbWFnZXMnLFxuICAgICAgICAgIGZpbGVuYW1lOiAnY3VzdG9taXphdGlvbi5sb2dvLnJlcG9ydHMnLFxuICAgICAgICAgIHJlc29sdmVTdGF0aWNVUkw6IChmaWxlbmFtZTogc3RyaW5nKSA9PiBgY3VzdG9tL2ltYWdlcy8ke2ZpbGVuYW1lfWAsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdmFsaWRhdGVVSUZvcm06IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIFNldHRpbmdzVmFsaWRhdG9yLmNvbXBvc2UoXG4gICAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmZpbGVQaWNrZXJGaWxlU2l6ZSh7XG4gICAgICAgICAgLi4udGhpcy5vcHRpb25zLmZpbGUuc2l6ZSxcbiAgICAgICAgICBtZWFuaW5nZnVsVW5pdDogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmZpbGVQaWNrZXJTdXBwb3J0ZWRFeHRlbnNpb25zKFxuICAgICAgICAgIHRoaXMub3B0aW9ucy5maWxlLmV4dGVuc2lvbnMsXG4gICAgICAgICksXG4gICAgICApKHZhbHVlKTtcbiAgICB9LFxuICB9LFxuICAnY3VzdG9taXphdGlvbi5yZXBvcnRzLmZvb3Rlcic6IHtcbiAgICB0aXRsZTogJ1JlcG9ydHMgZm9vdGVyJyxcbiAgICBkZXNjcmlwdGlvbjogJ1NldCB0aGUgZm9vdGVyIG9mIHRoZSByZXBvcnRzLicsXG4gICAgc3RvcmU6IHtcbiAgICAgIGZpbGU6IHtcbiAgICAgICAgY29uZmlndXJhYmxlTWFuYWdlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LkNVU1RPTUlaQVRJT04sXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLnRleHRhcmVhLFxuICAgIGRlZmF1bHRWYWx1ZTogJycsXG4gICAgZGVmYXVsdFZhbHVlSWZOb3RTZXQ6IFJFUE9SVFNfUEFHRV9GT09URVJfVEVYVCxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21TZXR0aW5nczogdHJ1ZSxcbiAgICBvcHRpb25zOiB7IG1heFJvd3M6IDIsIG1heExlbmd0aDogNTAgfSxcbiAgICB2YWxpZGF0ZVVJRm9ybTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZSh2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gU2V0dGluZ3NWYWxpZGF0b3IuY29tcG9zZShcbiAgICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaXNTdHJpbmcsXG4gICAgICAgIFNldHRpbmdzVmFsaWRhdG9yLm11bHRpcGxlTGluZXNTdHJpbmcoe1xuICAgICAgICAgIG1heFJvd3M6IHRoaXMub3B0aW9ucz8ubWF4Um93cyxcbiAgICAgICAgICBtYXhMZW5ndGg6IHRoaXMub3B0aW9ucz8ubWF4TGVuZ3RoLFxuICAgICAgICB9KSxcbiAgICAgICkodmFsdWUpO1xuICAgIH0sXG4gIH0sXG4gICdjdXN0b21pemF0aW9uLnJlcG9ydHMuaGVhZGVyJzoge1xuICAgIHRpdGxlOiAnUmVwb3J0cyBoZWFkZXInLFxuICAgIGRlc2NyaXB0aW9uOiAnU2V0IHRoZSBoZWFkZXIgb2YgdGhlIHJlcG9ydHMuJyxcbiAgICBzdG9yZToge1xuICAgICAgZmlsZToge1xuICAgICAgICBjb25maWd1cmFibGVNYW5hZ2VkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuQ1VTVE9NSVpBVElPTixcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUudGV4dGFyZWEsXG4gICAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgICBkZWZhdWx0VmFsdWVJZk5vdFNldDogUkVQT1JUU19QQUdFX0hFQURFUl9URVhULFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVNldHRpbmdzOiB0cnVlLFxuICAgIG9wdGlvbnM6IHsgbWF4Um93czogMywgbWF4TGVuZ3RoOiA0MCB9LFxuICAgIHZhbGlkYXRlVUlGb3JtOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBTZXR0aW5nc1ZhbGlkYXRvci5jb21wb3NlKFxuICAgICAgICBTZXR0aW5nc1ZhbGlkYXRvci5pc1N0cmluZyxcbiAgICAgICAgU2V0dGluZ3NWYWxpZGF0b3IubXVsdGlwbGVMaW5lc1N0cmluZyh7XG4gICAgICAgICAgbWF4Um93czogdGhpcy5vcHRpb25zPy5tYXhSb3dzLFxuICAgICAgICAgIG1heExlbmd0aDogdGhpcy5vcHRpb25zPy5tYXhMZW5ndGgsXG4gICAgICAgIH0pLFxuICAgICAgKSh2YWx1ZSk7XG4gICAgfSxcbiAgfSxcbiAgJ2Vucm9sbG1lbnQuZG5zJzoge1xuICAgIHRpdGxlOiAnRW5yb2xsbWVudCBETlMnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ1NwZWNpZmllcyB0aGUgV2F6dWggcmVnaXN0cmF0aW9uIHNlcnZlciwgdXNlZCBmb3IgdGhlIGFnZW50IGVucm9sbG1lbnQuJyxcbiAgICBzdG9yZToge1xuICAgICAgZmlsZToge1xuICAgICAgICBjb25maWd1cmFibGVNYW5hZ2VkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuR0VORVJBTCxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUudGV4dCxcbiAgICBkZWZhdWx0VmFsdWU6ICcnLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVNldHRpbmdzOiB0cnVlLFxuICAgIHZhbGlkYXRlVUlGb3JtOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5jb21wb3NlKFxuICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaXNTdHJpbmcsXG4gICAgICBTZXR0aW5nc1ZhbGlkYXRvci5zZXJ2ZXJBZGRyZXNzSG9zdG5hbWVGUUROSVB2NElQdjYsXG4gICAgKSxcbiAgfSxcbiAgJ2Vucm9sbG1lbnQucGFzc3dvcmQnOiB7XG4gICAgdGl0bGU6ICdFbnJvbGxtZW50IHBhc3N3b3JkJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdTcGVjaWZpZXMgdGhlIHBhc3N3b3JkIHVzZWQgdG8gYXV0aGVudGljYXRlIGR1cmluZyB0aGUgYWdlbnQgZW5yb2xsbWVudC4nLFxuICAgIHN0b3JlOiB7XG4gICAgICBmaWxlOiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZU1hbmFnZWQ6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5HRU5FUkFMLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS50ZXh0LFxuICAgIGRlZmF1bHRWYWx1ZTogJycsXG4gICAgaXNDb25maWd1cmFibGVGcm9tU2V0dGluZ3M6IGZhbHNlLFxuICAgIHZhbGlkYXRlVUlGb3JtOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5jb21wb3NlKFxuICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaXNTdHJpbmcsXG4gICAgICBTZXR0aW5nc1ZhbGlkYXRvci5pc05vdEVtcHR5U3RyaW5nLFxuICAgICksXG4gIH0sXG4gIGhpZGVNYW5hZ2VyQWxlcnRzOiB7XG4gICAgdGl0bGU6ICdIaWRlIG1hbmFnZXIgYWxlcnRzJyxcbiAgICBkZXNjcmlwdGlvbjogJ0hpZGUgdGhlIGFsZXJ0cyBvZiB0aGUgbWFuYWdlciBpbiBldmVyeSBkYXNoYm9hcmQuJyxcbiAgICBzdG9yZToge1xuICAgICAgZmlsZToge1xuICAgICAgICBjb25maWd1cmFibGVNYW5hZ2VkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuR0VORVJBTCxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUuc3dpdGNoLFxuICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgaXNDb25maWd1cmFibGVGcm9tU2V0dGluZ3M6IHRydWUsXG4gICAgcmVxdWlyZXNSZWxvYWRpbmdCcm93c2VyVGFiOiB0cnVlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHN3aXRjaDoge1xuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICBkaXNhYmxlZDogeyBsYWJlbDogJ2ZhbHNlJywgdmFsdWU6IGZhbHNlIH0sXG4gICAgICAgICAgZW5hYmxlZDogeyBsYWJlbDogJ3RydWUnLCB2YWx1ZTogdHJ1ZSB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNoYW5nZWRJbnB1dFZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogYm9vbGVhbiB8IHN0cmluZyxcbiAgICApOiBib29sZWFuIHtcbiAgICAgIHJldHVybiBCb29sZWFuKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlVUlGb3JtOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5pc0Jvb2xlYW4sXG4gIH0sXG4gIGhvc3RzOiB7XG4gICAgdGl0bGU6ICdTZXJ2ZXIgaG9zdHMnLFxuICAgIGRlc2NyaXB0aW9uOiAnQ29uZmlndXJlIHRoZSBBUEkgY29ubmVjdGlvbnMuJyxcbiAgICBjYXRlZ29yeTogU2V0dGluZ0NhdGVnb3J5LkFQSV9DT05ORUNUSU9OLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5hcnJheU9mLFxuICAgIGRlZmF1bHRWYWx1ZTogW10sXG4gICAgc3RvcmU6IHtcbiAgICAgIGZpbGU6IHtcbiAgICAgICAgY29uZmlndXJhYmxlTWFuYWdlZDogZmFsc2UsXG4gICAgICAgIGRlZmF1bHRCbG9jazogYCMgVGhlIGZvbGxvd2luZyBjb25maWd1cmF0aW9uIGlzIHRoZSBkZWZhdWx0IHN0cnVjdHVyZSB0byBkZWZpbmUgYSBob3N0LlxuI1xuIyBob3N0czpcbiMgICAjIEhvc3QgSUQgLyBuYW1lLFxuIyAgIC0gZW52LTE6XG4jICAgICAgICMgSG9zdCBVUkxcbiMgICAgICAgdXJsOiBodHRwczovL2Vudi0xLmV4YW1wbGVcbiMgICAgICAgIyBIb3N0IC8gQVBJIHBvcnRcbiMgICAgICAgcG9ydDogNTUwMDBcbiMgICAgICAgIyBIb3N0IC8gQVBJIHVzZXJuYW1lXG4jICAgICAgIHVzZXJuYW1lOiB3YXp1aC13dWlcbiMgICAgICAgIyBIb3N0IC8gQVBJIHBhc3N3b3JkXG4jICAgICAgIHBhc3N3b3JkOiB3YXp1aC13dWlcbiMgICAgICAgIyBVc2UgUkJBQyBvciBub3QuIElmIHNldCB0byB0cnVlLCB0aGUgdXNlcm5hbWUgbXVzdCBiZSBcIndhenVoLXd1aVwiLlxuIyAgICAgICBydW5fYXM6IHRydWVcbiMgICAtIGVudi0yOlxuIyAgICAgICB1cmw6IGh0dHBzOi8vZW52LTIuZXhhbXBsZVxuIyAgICAgICBwb3J0OiA1NTAwMFxuIyAgICAgICB1c2VybmFtZTogd2F6dWgtd3VpXG4jICAgICAgIHBhc3N3b3JkOiB3YXp1aC13dWlcbiMgICAgICAgcnVuX2FzOiB0cnVlXG5cbmhvc3RzOlxuICAtIGRlZmF1bHQ6XG4gICAgICB1cmw6IGh0dHBzOi8vbG9jYWxob3N0XG4gICAgICBwb3J0OiA1NTAwMFxuICAgICAgdXNlcm5hbWU6IHdhenVoLXd1aVxuICAgICAgcGFzc3dvcmQ6IHdhenVoLXd1aVxuICAgICAgcnVuX2FzOiBmYWxzZWAsXG4gICAgICAgIHRyYW5zZm9ybUZyb206IHZhbHVlID0+IHtcbiAgICAgICAgICByZXR1cm4gdmFsdWUubWFwKGhvc3REYXRhID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IE9iamVjdC5rZXlzKGhvc3REYXRhKT8uWzBdO1xuICAgICAgICAgICAgcmV0dXJuIHsgLi4uaG9zdERhdGFba2V5XSwgaWQ6IGtleSB9O1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIGFycmF5T2Y6IHtcbiAgICAgICAgaWQ6IHtcbiAgICAgICAgICB0aXRsZTogJ0lkZW50aWZpZXInLFxuICAgICAgICAgIGRlc2NyaXB0aW9uOiAnSWRlbnRpZmllciBvZiB0aGUgQVBJIGNvbm5lY3Rpb24uIFRoaXMgbXVzdCBiZSB1bmlxdWUuJyxcbiAgICAgICAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUudGV4dCxcbiAgICAgICAgICBkZWZhdWx0VmFsdWU6ICdkZWZhdWx0JyxcbiAgICAgICAgICBpc0NvbmZpZ3VyYWJsZUZyb21TZXR0aW5nczogdHJ1ZSxcbiAgICAgICAgICB2YWxpZGF0ZVVJRm9ybTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICB2YWxpZGF0ZTogU2V0dGluZ3NWYWxpZGF0b3IuY29tcG9zZShcbiAgICAgICAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmlzU3RyaW5nLFxuICAgICAgICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaXNOb3RFbXB0eVN0cmluZyxcbiAgICAgICAgICApLFxuICAgICAgICB9LFxuICAgICAgICB1cmw6IHtcbiAgICAgICAgICB0aXRsZTogJ1VSTCcsXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdTZXJ2ZXIgVVJMIGFkZHJlc3MnLFxuICAgICAgICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS50ZXh0LFxuICAgICAgICAgIGRlZmF1bHRWYWx1ZTogJ2h0dHBzOi8vbG9jYWxob3N0JyxcbiAgICAgICAgICBpc0NvbmZpZ3VyYWJsZUZyb21TZXR0aW5nczogdHJ1ZSxcbiAgICAgICAgICB2YWxpZGF0ZVVJRm9ybTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICB2YWxpZGF0ZTogU2V0dGluZ3NWYWxpZGF0b3IuY29tcG9zZShcbiAgICAgICAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmlzU3RyaW5nLFxuICAgICAgICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaXNOb3RFbXB0eVN0cmluZyxcbiAgICAgICAgICApLFxuICAgICAgICB9LFxuICAgICAgICBwb3J0OiB7XG4gICAgICAgICAgdGl0bGU6ICdQb3J0JyxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1BvcnQnLFxuICAgICAgICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5udW1iZXIsXG4gICAgICAgICAgZGVmYXVsdFZhbHVlOiA1NTAwMCxcbiAgICAgICAgICBpc0NvbmZpZ3VyYWJsZUZyb21TZXR0aW5nczogdHJ1ZSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBudW1iZXI6IHtcbiAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICBtYXg6IDY1NTM1LFxuICAgICAgICAgICAgICBpbnRlZ2VyOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVpRm9ybVRyYW5zZm9ybUNvbmZpZ3VyYXRpb25WYWx1ZVRvSW5wdXRWYWx1ZTogZnVuY3Rpb24gKFxuICAgICAgICAgICAgdmFsdWU6IG51bWJlcixcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdWlGb3JtVHJhbnNmb3JtSW5wdXRWYWx1ZVRvQ29uZmlndXJhdGlvblZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICAgICAgICB2YWx1ZTogc3RyaW5nLFxuICAgICAgICAgICk6IG51bWJlciB7XG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZhbGlkYXRlVUlGb3JtOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlKFxuICAgICAgICAgICAgICB0aGlzLnVpRm9ybVRyYW5zZm9ybUlucHV0VmFsdWVUb0NvbmZpZ3VyYXRpb25WYWx1ZSh2YWx1ZSksXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIFNldHRpbmdzVmFsaWRhdG9yLm51bWJlcih0aGlzLm9wdGlvbnMubnVtYmVyKSh2YWx1ZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgdXNlcm5hbWU6IHtcbiAgICAgICAgICB0aXRsZTogJ1VzZXJuYW1lJyxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogJ1NlcnZlciBBUEkgdXNlcm5hbWUnLFxuICAgICAgICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS50ZXh0LFxuICAgICAgICAgIGRlZmF1bHRWYWx1ZTogJ3dhenVoLXd1aScsXG4gICAgICAgICAgaXNDb25maWd1cmFibGVGcm9tU2V0dGluZ3M6IHRydWUsXG4gICAgICAgICAgdmFsaWRhdGVVSUZvcm06IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGUodmFsdWUpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmNvbXBvc2UoXG4gICAgICAgICAgICBTZXR0aW5nc1ZhbGlkYXRvci5pc1N0cmluZyxcbiAgICAgICAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmlzTm90RW1wdHlTdHJpbmcsXG4gICAgICAgICAgKSxcbiAgICAgICAgfSxcbiAgICAgICAgcGFzc3dvcmQ6IHtcbiAgICAgICAgICB0aXRsZTogJ1Bhc3N3b3JkJyxcbiAgICAgICAgICBkZXNjcmlwdGlvbjogXCJVc2VyJ3MgUGFzc3dvcmRcIixcbiAgICAgICAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUucGFzc3dvcmQsXG4gICAgICAgICAgZGVmYXVsdFZhbHVlOiAnd2F6dWgtd3VpJyxcbiAgICAgICAgICBpc0NvbmZpZ3VyYWJsZUZyb21TZXR0aW5nczogdHJ1ZSxcbiAgICAgICAgICB2YWxpZGF0ZVVJRm9ybTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZSh2YWx1ZSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICB2YWxpZGF0ZTogU2V0dGluZ3NWYWxpZGF0b3IuY29tcG9zZShcbiAgICAgICAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmlzU3RyaW5nLFxuICAgICAgICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaXNOb3RFbXB0eVN0cmluZyxcbiAgICAgICAgICApLFxuICAgICAgICB9LFxuICAgICAgICBydW5fYXM6IHtcbiAgICAgICAgICB0aXRsZTogJ1J1biBhcycsXG4gICAgICAgICAgZGVzY3JpcHRpb246ICdVc2UgdGhlIGF1dGhlbnRpY2F0aW9uIGNvbnRleHQuJyxcbiAgICAgICAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUuc3dpdGNoLFxuICAgICAgICAgIGRlZmF1bHRWYWx1ZTogZmFsc2UsXG4gICAgICAgICAgaXNDb25maWd1cmFibGVGcm9tU2V0dGluZ3M6IHRydWUsXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgc3dpdGNoOiB7XG4gICAgICAgICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgICAgIGRpc2FibGVkOiB7IGxhYmVsOiAnZmFsc2UnLCB2YWx1ZTogZmFsc2UgfSxcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB7IGxhYmVsOiAndHJ1ZScsIHZhbHVlOiB0cnVlIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdWlGb3JtVHJhbnNmb3JtQ2hhbmdlZElucHV0VmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgICAgICAgIHZhbHVlOiBib29sZWFuIHwgc3RyaW5nLFxuICAgICAgICAgICk6IGJvb2xlYW4ge1xuICAgICAgICAgICAgcmV0dXJuIEJvb2xlYW4odmFsdWUpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdmFsaWRhdGVVSUZvcm06IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGUodmFsdWUpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmlzQm9vbGVhbixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21TZXR0aW5nczogZmFsc2UsXG4gICAgdWlGb3JtVHJhbnNmb3JtQ2hhbmdlZElucHV0VmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgIHZhbHVlOiBib29sZWFuIHwgc3RyaW5nLFxuICAgICk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odmFsdWUpO1xuICAgIH0sXG4gICAgLy8gVE9ETzogYWRkIHZhbGlkYXRpb25cbiAgICAvLyB2YWxpZGF0ZTogU2V0dGluZ3NWYWxpZGF0b3IuaXNCb29sZWFuLFxuICAgIC8vIHZhbGlkYXRlOiBmdW5jdGlvbiAoc2NoZW1hKSB7XG4gICAgLy8gICByZXR1cm4gc2NoZW1hLmJvb2xlYW4oKTtcbiAgICAvLyB9LFxuICB9LFxuICAnaXAuaWdub3JlJzoge1xuICAgIHRpdGxlOiAnSW5kZXggcGF0dGVybiBpZ25vcmUnLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0Rpc2FibGUgY2VydGFpbiBpbmRleCBwYXR0ZXJuIG5hbWVzIGZyb20gYmVpbmcgYXZhaWxhYmxlIGluIGluZGV4IHBhdHRlcm4gc2VsZWN0b3IuJyxcbiAgICBzdG9yZToge1xuICAgICAgZmlsZToge1xuICAgICAgICBjb25maWd1cmFibGVNYW5hZ2VkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuR0VORVJBTCxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUuZWRpdG9yLFxuICAgIGRlZmF1bHRWYWx1ZTogW10sXG4gICAgaXNDb25maWd1cmFibGVGcm9tU2V0dGluZ3M6IHRydWUsXG4gICAgb3B0aW9uczoge1xuICAgICAgZWRpdG9yOiB7XG4gICAgICAgIGxhbmd1YWdlOiAnanNvbicsXG4gICAgICB9LFxuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtQ29uZmlndXJhdGlvblZhbHVlVG9JbnB1dFZhbHVlOiBmdW5jdGlvbiAodmFsdWU6IGFueSk6IGFueSB7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtSW5wdXRWYWx1ZVRvQ29uZmlndXJhdGlvblZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogc3RyaW5nLFxuICAgICk6IGFueSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyBWYWxpZGF0aW9uOiBodHRwczovL2dpdGh1Yi5jb20vZWxhc3RpYy9lbGFzdGljc2VhcmNoL2Jsb2IvdjcuMTAuMi9kb2NzL3JlZmVyZW5jZS9pbmRpY2VzL2NyZWF0ZS1pbmRleC5hc2NpaWRvY1xuICAgIHZhbGlkYXRlVUlGb3JtOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBTZXR0aW5nc1ZhbGlkYXRvci5qc29uKHRoaXMudmFsaWRhdGUpKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5jb21wb3NlKFxuICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuYXJyYXkoXG4gICAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmNvbXBvc2UoXG4gICAgICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaXNTdHJpbmcsXG4gICAgICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaXNOb3RFbXB0eVN0cmluZyxcbiAgICAgICAgICBTZXR0aW5nc1ZhbGlkYXRvci5oYXNOb1NwYWNlcyxcbiAgICAgICAgICBTZXR0aW5nc1ZhbGlkYXRvci5ub0xpdGVyYWxTdHJpbmcoJy4nLCAnLi4nKSxcbiAgICAgICAgICBTZXR0aW5nc1ZhbGlkYXRvci5ub1N0YXJ0c1dpdGhTdHJpbmcoJy0nLCAnXycsICcrJywgJy4nKSxcbiAgICAgICAgICBTZXR0aW5nc1ZhbGlkYXRvci5oYXNOb3RJbnZhbGlkQ2hhcmFjdGVycyhcbiAgICAgICAgICAgICdcXFxcJyxcbiAgICAgICAgICAgICcvJyxcbiAgICAgICAgICAgICc/JyxcbiAgICAgICAgICAgICdcIicsXG4gICAgICAgICAgICAnPCcsXG4gICAgICAgICAgICAnPicsXG4gICAgICAgICAgICAnfCcsXG4gICAgICAgICAgICAnLCcsXG4gICAgICAgICAgICAnIycsXG4gICAgICAgICAgKSxcbiAgICAgICAgKSxcbiAgICAgICksXG4gICAgKSxcbiAgfSxcbiAgJ2lwLnNlbGVjdG9yJzoge1xuICAgIHRpdGxlOiAnSVAgc2VsZWN0b3InLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0RlZmluZSBpZiB0aGUgdXNlciBpcyBhbGxvd2VkIHRvIGNoYW5nZSB0aGUgc2VsZWN0ZWQgaW5kZXggcGF0dGVybiBkaXJlY3RseSBmcm9tIHRoZSB0b3AgbWVudSBiYXIuJyxcbiAgICBzdG9yZToge1xuICAgICAgZmlsZToge1xuICAgICAgICBjb25maWd1cmFibGVNYW5hZ2VkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuR0VORVJBTCxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUuc3dpdGNoLFxuICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21TZXR0aW5nczogdHJ1ZSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBzd2l0Y2g6IHtcbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgZGlzYWJsZWQ6IHsgbGFiZWw6ICdmYWxzZScsIHZhbHVlOiBmYWxzZSB9LFxuICAgICAgICAgIGVuYWJsZWQ6IHsgbGFiZWw6ICd0cnVlJywgdmFsdWU6IHRydWUgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB1aUZvcm1UcmFuc2Zvcm1DaGFuZ2VkSW5wdXRWYWx1ZTogZnVuY3Rpb24gKFxuICAgICAgdmFsdWU6IGJvb2xlYW4gfCBzdHJpbmcsXG4gICAgKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gQm9vbGVhbih2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZVVJRm9ybTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZSh2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZTogU2V0dGluZ3NWYWxpZGF0b3IuaXNCb29sZWFuLFxuICB9LFxuICAnd2F6dWgudXBkYXRlcy5kaXNhYmxlZCc6IHtcbiAgICB0aXRsZTogJ0NoZWNrIHVwZGF0ZXMnLFxuICAgIGRlc2NyaXB0aW9uOiAnRGVmaW5lIGlmIHRoZSBjaGVjayB1cGRhdGVzIHNlcnZpY2UgaXMgYWN0aXZlLicsXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5HRU5FUkFMLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5zd2l0Y2gsXG4gICAgZGVmYXVsdFZhbHVlOiBmYWxzZSxcbiAgICBzdG9yZToge1xuICAgICAgZmlsZToge1xuICAgICAgICBjb25maWd1cmFibGVNYW5hZ2VkOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21TZXR0aW5nczogZmFsc2UsXG4gICAgb3B0aW9uczoge1xuICAgICAgc3dpdGNoOiB7XG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgIGRpc2FibGVkOiB7IGxhYmVsOiAnZmFsc2UnLCB2YWx1ZTogZmFsc2UgfSxcbiAgICAgICAgICBlbmFibGVkOiB7IGxhYmVsOiAndHJ1ZScsIHZhbHVlOiB0cnVlIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtQ2hhbmdlZElucHV0VmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgIHZhbHVlOiBib29sZWFuIHwgc3RyaW5nLFxuICAgICk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmlzQm9vbGVhbixcbiAgfSxcbiAgcGF0dGVybjoge1xuICAgIHRpdGxlOiAnSW5kZXggcGF0dGVybicsXG4gICAgc3RvcmU6IHtcbiAgICAgIGZpbGU6IHtcbiAgICAgICAgY29uZmlndXJhYmxlTWFuYWdlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgIFwiRGVmYXVsdCBpbmRleCBwYXR0ZXJuIHRvIHVzZSBvbiB0aGUgYXBwLiBJZiB0aGVyZSdzIG5vIHZhbGlkIGluZGV4IHBhdHRlcm4sIHRoZSBhcHAgd2lsbCBhdXRvbWF0aWNhbGx5IGNyZWF0ZSBvbmUgd2l0aCB0aGUgbmFtZSBpbmRpY2F0ZWQgaW4gdGhpcyBvcHRpb24uXCIsXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5HRU5FUkFMLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS50ZXh0LFxuICAgIGRlZmF1bHRWYWx1ZTogV0FaVUhfQUxFUlRTX1BBVFRFUk4sXG4gICAgaXNDb25maWd1cmFibGVGcm9tU2V0dGluZ3M6IHRydWUsXG4gICAgcmVxdWlyZXNSdW5uaW5nSGVhbHRoQ2hlY2s6IHRydWUsXG4gICAgLy8gVmFsaWRhdGlvbjogaHR0cHM6Ly9naXRodWIuY29tL2VsYXN0aWMvZWxhc3RpY3NlYXJjaC9ibG9iL3Y3LjEwLjIvZG9jcy9yZWZlcmVuY2UvaW5kaWNlcy9jcmVhdGUtaW5kZXguYXNjaWlkb2NcbiAgICB2YWxpZGF0ZVVJRm9ybTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZSh2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZTogU2V0dGluZ3NWYWxpZGF0b3IuY29tcG9zZShcbiAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmlzU3RyaW5nLFxuICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaXNOb3RFbXB0eVN0cmluZyxcbiAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmhhc05vU3BhY2VzLFxuICAgICAgU2V0dGluZ3NWYWxpZGF0b3Iubm9MaXRlcmFsU3RyaW5nKCcuJywgJy4uJyksXG4gICAgICBTZXR0aW5nc1ZhbGlkYXRvci5ub1N0YXJ0c1dpdGhTdHJpbmcoJy0nLCAnXycsICcrJywgJy4nKSxcbiAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmhhc05vdEludmFsaWRDaGFyYWN0ZXJzKFxuICAgICAgICAnXFxcXCcsXG4gICAgICAgICcvJyxcbiAgICAgICAgJz8nLFxuICAgICAgICAnXCInLFxuICAgICAgICAnPCcsXG4gICAgICAgICc+JyxcbiAgICAgICAgJ3wnLFxuICAgICAgICAnLCcsXG4gICAgICAgICcjJyxcbiAgICAgICksXG4gICAgKSxcbiAgfSxcbiAgdGltZW91dDoge1xuICAgIHRpdGxlOiAnUmVxdWVzdCB0aW1lb3V0JyxcbiAgICBzdG9yZToge1xuICAgICAgZmlsZToge1xuICAgICAgICBjb25maWd1cmFibGVNYW5hZ2VkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ01heGltdW0gdGltZSwgaW4gbWlsbGlzZWNvbmRzLCB0aGUgYXBwIHdpbGwgd2FpdCBmb3IgYW4gQVBJIHJlc3BvbnNlIHdoZW4gbWFraW5nIHJlcXVlc3RzIHRvIGl0LiBJdCB3aWxsIGJlIGlnbm9yZWQgaWYgdGhlIHZhbHVlIGlzIHNldCB1bmRlciAxNTAwIG1pbGxpc2Vjb25kcy4nLFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuR0VORVJBTCxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUubnVtYmVyLFxuICAgIGRlZmF1bHRWYWx1ZTogMjAwMDAsXG4gICAgaXNDb25maWd1cmFibGVGcm9tU2V0dGluZ3M6IHRydWUsXG4gICAgb3B0aW9uczoge1xuICAgICAgbnVtYmVyOiB7XG4gICAgICAgIG1pbjogMTUwMCxcbiAgICAgICAgaW50ZWdlcjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB1aUZvcm1UcmFuc2Zvcm1Db25maWd1cmF0aW9uVmFsdWVUb0lucHV0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUlucHV0VmFsdWVUb0NvbmZpZ3VyYXRpb25WYWx1ZTogZnVuY3Rpb24gKFxuICAgICAgdmFsdWU6IHN0cmluZyxcbiAgICApOiBudW1iZXIge1xuICAgICAgcmV0dXJuIE51bWJlcih2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZVVJRm9ybTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZShcbiAgICAgICAgdGhpcy51aUZvcm1UcmFuc2Zvcm1JbnB1dFZhbHVlVG9Db25maWd1cmF0aW9uVmFsdWUodmFsdWUpLFxuICAgICAgKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBTZXR0aW5nc1ZhbGlkYXRvci5udW1iZXIodGhpcy5vcHRpb25zLm51bWJlcikodmFsdWUpO1xuICAgIH0sXG4gIH0sXG4gICd3YXp1aC5tb25pdG9yaW5nLmNyZWF0aW9uJzoge1xuICAgIHRpdGxlOiAnSW5kZXggY3JlYXRpb24nLFxuICAgIGRlc2NyaXB0aW9uOlxuICAgICAgJ0RlZmluZSB0aGUgaW50ZXJ2YWwgaW4gd2hpY2ggYSBuZXcgd2F6dWgtbW9uaXRvcmluZyBpbmRleCB3aWxsIGJlIGNyZWF0ZWQuJyxcbiAgICBzdG9yZToge1xuICAgICAgZmlsZToge1xuICAgICAgICBjb25maWd1cmFibGVNYW5hZ2VkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuTU9OSVRPUklORyxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUuc2VsZWN0LFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHNlbGVjdDogW1xuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ0hvdXJseScsXG4gICAgICAgICAgdmFsdWU6ICdoJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdEYWlseScsXG4gICAgICAgICAgdmFsdWU6ICdkJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdXZWVrbHknLFxuICAgICAgICAgIHZhbHVlOiAndycsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnTW9udGhseScsXG4gICAgICAgICAgdmFsdWU6ICdtJyxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBkZWZhdWx0VmFsdWU6IFdBWlVIX01PTklUT1JJTkdfREVGQVVMVF9DUkVBVElPTixcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21TZXR0aW5nczogdHJ1ZSxcbiAgICByZXF1aXJlc1J1bm5pbmdIZWFsdGhDaGVjazogdHJ1ZSxcbiAgICB2YWxpZGF0ZVVJRm9ybTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWxpZGF0ZSh2YWx1ZSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gU2V0dGluZ3NWYWxpZGF0b3IubGl0ZXJhbChcbiAgICAgICAgdGhpcy5vcHRpb25zLnNlbGVjdC5tYXAoKHsgdmFsdWUgfSkgPT4gdmFsdWUpLFxuICAgICAgKSh2YWx1ZSk7XG4gICAgfSxcbiAgfSxcbiAgJ3dhenVoLm1vbml0b3JpbmcuZW5hYmxlZCc6IHtcbiAgICB0aXRsZTogJ1N0YXR1cycsXG4gICAgZGVzY3JpcHRpb246XG4gICAgICAnRW5hYmxlIG9yIGRpc2FibGUgdGhlIHdhenVoLW1vbml0b3JpbmcgaW5kZXggY3JlYXRpb24gYW5kL29yIHZpc3VhbGl6YXRpb24uJyxcbiAgICBzdG9yZToge1xuICAgICAgZmlsZToge1xuICAgICAgICBjb25maWd1cmFibGVNYW5hZ2VkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuTU9OSVRPUklORyxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUuc3dpdGNoLFxuICAgIGRlZmF1bHRWYWx1ZTogV0FaVUhfTU9OSVRPUklOR19ERUZBVUxUX0VOQUJMRUQsXG4gICAgaXNDb25maWd1cmFibGVGcm9tU2V0dGluZ3M6IHRydWUsXG4gICAgcmVxdWlyZXNSZXN0YXJ0aW5nUGx1Z2luUGxhdGZvcm06IHRydWUsXG4gICAgb3B0aW9uczoge1xuICAgICAgc3dpdGNoOiB7XG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgIGRpc2FibGVkOiB7IGxhYmVsOiAnZmFsc2UnLCB2YWx1ZTogZmFsc2UgfSxcbiAgICAgICAgICBlbmFibGVkOiB7IGxhYmVsOiAndHJ1ZScsIHZhbHVlOiB0cnVlIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtQ2hhbmdlZElucHV0VmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgIHZhbHVlOiBib29sZWFuIHwgc3RyaW5nLFxuICAgICk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIEJvb2xlYW4odmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGVVSUZvcm06IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGUodmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmlzQm9vbGVhbixcbiAgfSxcbiAgJ3dhenVoLm1vbml0b3JpbmcuZnJlcXVlbmN5Jzoge1xuICAgIHRpdGxlOiAnRnJlcXVlbmN5JyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdGcmVxdWVuY3ksIGluIHNlY29uZHMsIG9mIEFQSSByZXF1ZXN0cyB0byBnZXQgdGhlIHN0YXRlIG9mIHRoZSBhZ2VudHMgYW5kIGNyZWF0ZSBhIG5ldyBkb2N1bWVudCBpbiB0aGUgd2F6dWgtbW9uaXRvcmluZyBpbmRleCB3aXRoIHRoaXMgZGF0YS4nLFxuICAgIHN0b3JlOiB7XG4gICAgICBmaWxlOiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZU1hbmFnZWQ6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5NT05JVE9SSU5HLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5udW1iZXIsXG4gICAgZGVmYXVsdFZhbHVlOiBXQVpVSF9NT05JVE9SSU5HX0RFRkFVTFRfRlJFUVVFTkNZLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVNldHRpbmdzOiB0cnVlLFxuICAgIHJlcXVpcmVzUmVzdGFydGluZ1BsdWdpblBsYXRmb3JtOiB0cnVlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIG51bWJlcjoge1xuICAgICAgICBtaW46IDYwLFxuICAgICAgICBpbnRlZ2VyOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNvbmZpZ3VyYXRpb25WYWx1ZVRvSW5wdXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtSW5wdXRWYWx1ZVRvQ29uZmlndXJhdGlvblZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogc3RyaW5nLFxuICAgICk6IG51bWJlciB7XG4gICAgICByZXR1cm4gTnVtYmVyKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlVUlGb3JtOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlKFxuICAgICAgICB0aGlzLnVpRm9ybVRyYW5zZm9ybUlucHV0VmFsdWVUb0NvbmZpZ3VyYXRpb25WYWx1ZSh2YWx1ZSksXG4gICAgICApO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIFNldHRpbmdzVmFsaWRhdG9yLm51bWJlcih0aGlzLm9wdGlvbnMubnVtYmVyKSh2YWx1ZSk7XG4gICAgfSxcbiAgfSxcbiAgJ3dhenVoLm1vbml0b3JpbmcucGF0dGVybic6IHtcbiAgICB0aXRsZTogJ0luZGV4IHBhdHRlcm4nLFxuICAgIGRlc2NyaXB0aW9uOiAnRGVmYXVsdCBpbmRleCBwYXR0ZXJuIHRvIHVzZSBmb3IgV2F6dWggbW9uaXRvcmluZy4nLFxuICAgIHN0b3JlOiB7XG4gICAgICBmaWxlOiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZU1hbmFnZWQ6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5NT05JVE9SSU5HLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS50ZXh0LFxuICAgIGRlZmF1bHRWYWx1ZTogV0FaVUhfTU9OSVRPUklOR19QQVRURVJOLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVNldHRpbmdzOiB0cnVlLFxuICAgIHJlcXVpcmVzUnVubmluZ0hlYWx0aENoZWNrOiB0cnVlLFxuICAgIHZhbGlkYXRlVUlGb3JtOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlOiBTZXR0aW5nc1ZhbGlkYXRvci5jb21wb3NlKFxuICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaXNTdHJpbmcsXG4gICAgICBTZXR0aW5nc1ZhbGlkYXRvci5pc05vdEVtcHR5U3RyaW5nLFxuICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaGFzTm9TcGFjZXMsXG4gICAgICBTZXR0aW5nc1ZhbGlkYXRvci5ub0xpdGVyYWxTdHJpbmcoJy4nLCAnLi4nKSxcbiAgICAgIFNldHRpbmdzVmFsaWRhdG9yLm5vU3RhcnRzV2l0aFN0cmluZygnLScsICdfJywgJysnLCAnLicpLFxuICAgICAgU2V0dGluZ3NWYWxpZGF0b3IuaGFzTm90SW52YWxpZENoYXJhY3RlcnMoXG4gICAgICAgICdcXFxcJyxcbiAgICAgICAgJy8nLFxuICAgICAgICAnPycsXG4gICAgICAgICdcIicsXG4gICAgICAgICc8JyxcbiAgICAgICAgJz4nLFxuICAgICAgICAnfCcsXG4gICAgICAgICcsJyxcbiAgICAgICAgJyMnLFxuICAgICAgKSxcbiAgICApLFxuICB9LFxuICAnd2F6dWgubW9uaXRvcmluZy5yZXBsaWNhcyc6IHtcbiAgICB0aXRsZTogJ0luZGV4IHJlcGxpY2FzJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdEZWZpbmUgdGhlIG51bWJlciBvZiByZXBsaWNhcyB0byB1c2UgZm9yIHRoZSB3YXp1aC1tb25pdG9yaW5nLSogaW5kaWNlcy4nLFxuICAgIHN0b3JlOiB7XG4gICAgICBmaWxlOiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZU1hbmFnZWQ6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5NT05JVE9SSU5HLFxuICAgIHR5cGU6IEVwbHVnaW5TZXR0aW5nVHlwZS5udW1iZXIsXG4gICAgZGVmYXVsdFZhbHVlOiBXQVpVSF9NT05JVE9SSU5HX0RFRkFVTFRfSU5ESUNFU19SRVBMSUNBUyxcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21TZXR0aW5nczogdHJ1ZSxcbiAgICByZXF1aXJlc1J1bm5pbmdIZWFsdGhDaGVjazogdHJ1ZSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBudW1iZXI6IHtcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBpbnRlZ2VyOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHVpRm9ybVRyYW5zZm9ybUNvbmZpZ3VyYXRpb25WYWx1ZVRvSW5wdXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlOiBudW1iZXIpIHtcbiAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtSW5wdXRWYWx1ZVRvQ29uZmlndXJhdGlvblZhbHVlOiBmdW5jdGlvbiAoXG4gICAgICB2YWx1ZTogc3RyaW5nLFxuICAgICk6IG51bWJlciB7XG4gICAgICByZXR1cm4gTnVtYmVyKHZhbHVlKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlVUlGb3JtOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbGlkYXRlKFxuICAgICAgICB0aGlzLnVpRm9ybVRyYW5zZm9ybUlucHV0VmFsdWVUb0NvbmZpZ3VyYXRpb25WYWx1ZSh2YWx1ZSksXG4gICAgICApO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIFNldHRpbmdzVmFsaWRhdG9yLm51bWJlcih0aGlzLm9wdGlvbnMubnVtYmVyKSh2YWx1ZSk7XG4gICAgfSxcbiAgfSxcbiAgJ3dhenVoLm1vbml0b3Jpbmcuc2hhcmRzJzoge1xuICAgIHRpdGxlOiAnSW5kZXggc2hhcmRzJyxcbiAgICBkZXNjcmlwdGlvbjpcbiAgICAgICdEZWZpbmUgdGhlIG51bWJlciBvZiBzaGFyZHMgdG8gdXNlIGZvciB0aGUgd2F6dWgtbW9uaXRvcmluZy0qIGluZGljZXMuJyxcbiAgICBzdG9yZToge1xuICAgICAgZmlsZToge1xuICAgICAgICBjb25maWd1cmFibGVNYW5hZ2VkOiB0cnVlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNhdGVnb3J5OiBTZXR0aW5nQ2F0ZWdvcnkuTU9OSVRPUklORyxcbiAgICB0eXBlOiBFcGx1Z2luU2V0dGluZ1R5cGUubnVtYmVyLFxuICAgIGRlZmF1bHRWYWx1ZTogV0FaVUhfTU9OSVRPUklOR19ERUZBVUxUX0lORElDRVNfU0hBUkRTLFxuICAgIGlzQ29uZmlndXJhYmxlRnJvbVNldHRpbmdzOiB0cnVlLFxuICAgIHJlcXVpcmVzUnVubmluZ0hlYWx0aENoZWNrOiB0cnVlLFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIG51bWJlcjoge1xuICAgICAgICBtaW46IDEsXG4gICAgICAgIGludGVnZXI6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgdWlGb3JtVHJhbnNmb3JtQ29uZmlndXJhdGlvblZhbHVlVG9JbnB1dFZhbHVlOiBmdW5jdGlvbiAodmFsdWU6IG51bWJlcikge1xuICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgfSxcbiAgICB1aUZvcm1UcmFuc2Zvcm1JbnB1dFZhbHVlVG9Db25maWd1cmF0aW9uVmFsdWU6IGZ1bmN0aW9uIChcbiAgICAgIHZhbHVlOiBzdHJpbmcsXG4gICAgKTogbnVtYmVyIHtcbiAgICAgIHJldHVybiBOdW1iZXIodmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGVVSUZvcm06IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGUoXG4gICAgICAgIHRoaXMudWlGb3JtVHJhbnNmb3JtSW5wdXRWYWx1ZVRvQ29uZmlndXJhdGlvblZhbHVlKHZhbHVlKSxcbiAgICAgICk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gU2V0dGluZ3NWYWxpZGF0b3IubnVtYmVyKHRoaXMub3B0aW9ucy5udW1iZXIpKHZhbHVlKTtcbiAgICB9LFxuICB9LFxuICAndnVsbmVyYWJpbGl0aWVzLnBhdHRlcm4nOiB7XG4gICAgdGl0bGU6ICdJbmRleCBwYXR0ZXJuJyxcbiAgICBkZXNjcmlwdGlvbjogJ0RlZmF1bHQgaW5kZXggcGF0dGVybiB0byB1c2UgZm9yIHZ1bG5lcmFiaWxpdGllcy4nLFxuICAgIHN0b3JlOiB7XG4gICAgICBmaWxlOiB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZU1hbmFnZWQ6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY2F0ZWdvcnk6IFNldHRpbmdDYXRlZ29yeS5WVUxORVJBQklMSVRJRVMsXG4gICAgdHlwZTogRXBsdWdpblNldHRpbmdUeXBlLnRleHQsXG4gICAgZGVmYXVsdFZhbHVlOiBXQVpVSF9WVUxORVJBQklMSVRJRVNfUEFUVEVSTixcbiAgICBpc0NvbmZpZ3VyYWJsZUZyb21TZXR0aW5nczogdHJ1ZSxcbiAgICByZXF1aXJlc1J1bm5pbmdIZWFsdGhDaGVjazogZmFsc2UsXG4gICAgdmFsaWRhdGVVSUZvcm06IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRoaXMudmFsaWRhdGUodmFsdWUpO1xuICAgIH0sXG4gICAgdmFsaWRhdGU6IFNldHRpbmdzVmFsaWRhdG9yLmNvbXBvc2UoXG4gICAgICBTZXR0aW5nc1ZhbGlkYXRvci5pc1N0cmluZyxcbiAgICAgIFNldHRpbmdzVmFsaWRhdG9yLmlzTm90RW1wdHlTdHJpbmcsXG4gICAgICBTZXR0aW5nc1ZhbGlkYXRvci5oYXNOb1NwYWNlcyxcbiAgICAgIFNldHRpbmdzVmFsaWRhdG9yLm5vTGl0ZXJhbFN0cmluZygnLicsICcuLicpLFxuICAgICAgU2V0dGluZ3NWYWxpZGF0b3Iubm9TdGFydHNXaXRoU3RyaW5nKCctJywgJ18nLCAnKycsICcuJyksXG4gICAgICBTZXR0aW5nc1ZhbGlkYXRvci5oYXNOb3RJbnZhbGlkQ2hhcmFjdGVycyhcbiAgICAgICAgJ1xcXFwnLFxuICAgICAgICAnLycsXG4gICAgICAgICc/JyxcbiAgICAgICAgJ1wiJyxcbiAgICAgICAgJzwnLFxuICAgICAgICAnPicsXG4gICAgICAgICd8JyxcbiAgICAgICAgJywnLFxuICAgICAgICAnIycsXG4gICAgICApLFxuICAgICksXG4gIH0sXG59O1xuXG5leHBvcnQgdHlwZSBUUGx1Z2luU2V0dGluZ0tleSA9IGtleW9mIHR5cGVvZiBQTFVHSU5fU0VUVElOR1M7XG5cbmV4cG9ydCBlbnVtIEhUVFBfU1RBVFVTX0NPREVTIHtcbiAgQ09OVElOVUUgPSAxMDAsXG4gIFNXSVRDSElOR19QUk9UT0NPTFMgPSAxMDEsXG4gIFBST0NFU1NJTkcgPSAxMDIsXG4gIE9LID0gMjAwLFxuICBDUkVBVEVEID0gMjAxLFxuICBBQ0NFUFRFRCA9IDIwMixcbiAgTk9OX0FVVEhPUklUQVRJVkVfSU5GT1JNQVRJT04gPSAyMDMsXG4gIE5PX0NPTlRFTlQgPSAyMDQsXG4gIFJFU0VUX0NPTlRFTlQgPSAyMDUsXG4gIFBBUlRJQUxfQ09OVEVOVCA9IDIwNixcbiAgTVVMVElfU1RBVFVTID0gMjA3LFxuICBNVUxUSVBMRV9DSE9JQ0VTID0gMzAwLFxuICBNT1ZFRF9QRVJNQU5FTlRMWSA9IDMwMSxcbiAgTU9WRURfVEVNUE9SQVJJTFkgPSAzMDIsXG4gIFNFRV9PVEhFUiA9IDMwMyxcbiAgTk9UX01PRElGSUVEID0gMzA0LFxuICBVU0VfUFJPWFkgPSAzMDUsXG4gIFRFTVBPUkFSWV9SRURJUkVDVCA9IDMwNyxcbiAgUEVSTUFORU5UX1JFRElSRUNUID0gMzA4LFxuICBCQURfUkVRVUVTVCA9IDQwMCxcbiAgVU5BVVRIT1JJWkVEID0gNDAxLFxuICBQQVlNRU5UX1JFUVVJUkVEID0gNDAyLFxuICBGT1JCSURERU4gPSA0MDMsXG4gIE5PVF9GT1VORCA9IDQwNCxcbiAgTUVUSE9EX05PVF9BTExPV0VEID0gNDA1LFxuICBOT1RfQUNDRVBUQUJMRSA9IDQwNixcbiAgUFJPWFlfQVVUSEVOVElDQVRJT05fUkVRVUlSRUQgPSA0MDcsXG4gIFJFUVVFU1RfVElNRU9VVCA9IDQwOCxcbiAgQ09ORkxJQ1QgPSA0MDksXG4gIEdPTkUgPSA0MTAsXG4gIExFTkdUSF9SRVFVSVJFRCA9IDQxMSxcbiAgUFJFQ09ORElUSU9OX0ZBSUxFRCA9IDQxMixcbiAgUkVRVUVTVF9UT09fTE9ORyA9IDQxMyxcbiAgUkVRVUVTVF9VUklfVE9PX0xPTkcgPSA0MTQsXG4gIFVOU1VQUE9SVEVEX01FRElBX1RZUEUgPSA0MTUsXG4gIFJFUVVFU1RFRF9SQU5HRV9OT1RfU0FUSVNGSUFCTEUgPSA0MTYsXG4gIEVYUEVDVEFUSU9OX0ZBSUxFRCA9IDQxNyxcbiAgSU1fQV9URUFQT1QgPSA0MTgsXG4gIElOU1VGRklDSUVOVF9TUEFDRV9PTl9SRVNPVVJDRSA9IDQxOSxcbiAgTUVUSE9EX0ZBSUxVUkUgPSA0MjAsXG4gIE1JU0RJUkVDVEVEX1JFUVVFU1QgPSA0MjEsXG4gIFVOUFJPQ0VTU0FCTEVfRU5USVRZID0gNDIyLFxuICBMT0NLRUQgPSA0MjMsXG4gIEZBSUxFRF9ERVBFTkRFTkNZID0gNDI0LFxuICBQUkVDT05ESVRJT05fUkVRVUlSRUQgPSA0MjgsXG4gIFRPT19NQU5ZX1JFUVVFU1RTID0gNDI5LFxuICBSRVFVRVNUX0hFQURFUl9GSUVMRFNfVE9PX0xBUkdFID0gNDMxLFxuICBVTkFWQUlMQUJMRV9GT1JfTEVHQUxfUkVBU09OUyA9IDQ1MSxcbiAgSU5URVJOQUxfU0VSVkVSX0VSUk9SID0gNTAwLFxuICBOT1RfSU1QTEVNRU5URUQgPSA1MDEsXG4gIEJBRF9HQVRFV0FZID0gNTAyLFxuICBTRVJWSUNFX1VOQVZBSUxBQkxFID0gNTAzLFxuICBHQVRFV0FZX1RJTUVPVVQgPSA1MDQsXG4gIEhUVFBfVkVSU0lPTl9OT1RfU1VQUE9SVEVEID0gNTA1LFxuICBJTlNVRkZJQ0lFTlRfU1RPUkFHRSA9IDUwNyxcbiAgTkVUV09SS19BVVRIRU5USUNBVElPTl9SRVFVSVJFRCA9IDUxMSxcbn1cblxuLy8gTW9kdWxlIFNlY3VyaXR5IGNvbmZpZ3VyYXRpb24gYXNzZXNzbWVudFxuZXhwb3J0IGNvbnN0IE1PRFVMRV9TQ0FfQ0hFQ0tfUkVTVUxUX0xBQkVMID0ge1xuICBwYXNzZWQ6ICdQYXNzZWQnLFxuICBmYWlsZWQ6ICdGYWlsZWQnLFxuICAnbm90IGFwcGxpY2FibGUnOiAnTm90IGFwcGxpY2FibGUnLFxufTtcblxuLy8gU2VhcmNoIGJhclxuXG4vLyBUaGlzIGxpbWl0cyB0aGUgcmVzdWx0cyBpbiB0aGUgQVBJIHJlcXVlc3RcbmV4cG9ydCBjb25zdCBTRUFSQ0hfQkFSX1dRTF9WQUxVRV9TVUdHRVNUSU9OU19DT1VOVCA9IDMwO1xuLy8gVGhpcyBsaW1pdHMgdGhlIHN1Z2dlc3Rpb25zIGZvciB0aGUgdG9rZW4gb2YgdHlwZSB2YWx1ZSBkaXNwbGF5ZWQgaW4gdGhlIHNlYXJjaCBiYXJcbmV4cG9ydCBjb25zdCBTRUFSQ0hfQkFSX1dRTF9WQUxVRV9TVUdHRVNUSU9OU19ESVNQTEFZX0NPVU5UID0gMTA7XG4vKiBUaW1lIGluIG1pbGxpc2Vjb25kcyB0byBkZWJvdW5jZSB0aGUgYW5hbHlzaXMgb2Ygc2VhcmNoIGJhci4gVGhpcyBtaXRpZ2F0ZXMgc29tZSBwcm9ibGVtcyByZWxhdGVkXG50byBjaGFuZ2VzIHJ1bm5pbmcgaW4gcGFyYWxsZWwgKi9cbmV4cG9ydCBjb25zdCBTRUFSQ0hfQkFSX0RFQk9VTkNFX1VQREFURV9USU1FID0gNDAwO1xuXG4vLyBQbHVnaW4gc2V0dGluZ3NcbmV4cG9ydCBjb25zdCBXQVpVSF9DT1JFX0VOQ1JZUFRJT05fUEFTU1dPUkQgPSAnc2VjcmV0ZW5jcnlwdGlvbmtleSEnO1xuXG4vLyBDb25maWd1cmF0aW9uIGJhY2tlbmQgc2VydmljZVxuZXhwb3J0IGNvbnN0IFdBWlVIX0NPUkVfQ09ORklHVVJBVElPTl9JTlNUQU5DRSA9ICd3YXp1aC1kYXNoYm9hcmQnO1xuZXhwb3J0IGNvbnN0IFdBWlVIX0NPUkVfQ09ORklHVVJBVElPTl9DQUNIRV9TRUNPTkRTID0gMTA7XG5cbi8vIEFQSSBjb25uZWN0aW9uIHBlcm1pc3Npb25zXG5leHBvcnQgY29uc3QgV0FaVUhfUk9MRV9BRE1JTklTVFJBVE9SX0lEID0gMTtcblxuLy8gSUQgdXNlZCB0byByZWZlciB0aGUgY3JlYXRlT3NkVXJsU3RhdGVTdG9yYWdlIHN0YXRlXG5leHBvcnQgY29uc3QgT1NEX1VSTF9TVEFURV9TVE9SQUdFX0lEID0gJ3N0YXRlOnN0b3JlSW5TZXNzaW9uU3RvcmFnZSc7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFXQSxJQUFBQSxLQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxRQUFBLEdBQUFELE9BQUE7QUFFQSxJQUFBRSxrQkFBQSxHQUFBRixPQUFBO0FBQTBFLFNBQUFELHVCQUFBSSxHQUFBLFdBQUFBLEdBQUEsSUFBQUEsR0FBQSxDQUFBQyxVQUFBLEdBQUFELEdBQUEsS0FBQUUsT0FBQSxFQUFBRixHQUFBO0FBZDFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7O0FBR0E7QUFDTyxNQUFNRyxjQUFjLEdBQUFDLE9BQUEsQ0FBQUQsY0FBQSxHQUFHRSxnQkFBTztBQUM5QixNQUFNQyxvQkFBb0IsR0FBQUYsT0FBQSxD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QWpCQSxpQkFBaUI7RUFBakJBLGlCQUFpQixDQUFqQkEsaUJBQWlCO0VBQWpCQSxpQkFBaUIsQ0FBakJBLGlCQUFpQjtFQUFqQkEsaUJBQWlCLENBQWpCQSxpQkFBaUI7RUFBakJBLGlCQUFpQixDQUFqQkEsaUJBQWlCO0VBQWpCQSxpQkFBaUIsQ0FBakJBLGlCQUFpQjtFQUFqQkEsaUJBQWlCLENBQWpCQSxpQkFBaUI7RUFBakJBLGlCQUFpQixDQUFqQkEsaUJBQWlCO0VBQWpCQSxpQkFBaUIsQ0FBakJBLGlCQUFpQjtFQUFqQkEsaUJBQWlCLENBQWpCQSxpQkFBaUI7RUFBakJBLGlCQUFpQixDQUFqQkEsaUJBQWlCO0VBQWpCQSxpQkFBaUIsQ0FBakJBLGlCQUFpQjtFQUFqQkEsaUJBQWlCLENBQWpCQSxpQkFBaUI7RUFBakJBLGlCQUFpQixDQUFqQkEsaUJBQWlCO0VBQWpCQSxpQkFBaUIsQ0FBakJBLGlCQUFpQjtFQUFqQkEsaUJBQWlCLENBQWpCQSxpQkFBaUI7RUFBakJBLGlCQUFpQixDQUFqQkEsaUJBQWlCO0VBQWpCQSxpQkFBaUIsQ0FBakJBLGlCQUFpQjtFQUFqQkEsaUJBQWlCLENBQWpCQSxpQkFBaUI7RUFBakJBLGlCQUFpQixDQUFqQkEsaUJBQWlCO0VBQWpCQSxpQkFBaUIsQ0FBakJBLGlCQUFpQjtFQUFqQkEsaUJBQWlCLENBQWpCQSxpQkFBaUI7RUFBakJBLGlCQUFpQixDQUFqQkEsaUJBQWlCO0VBQWpCQSxpQkFBaUIsQ0FBakJBLGlCQUFpQjtFQUFqQkEsaUJBQWlCLENBQWpCQSxpQkFBaUI7RUFBakJBLGlCQUFpQixDQUFqQkEsaUJBQWlCO0VBQWpCQSxpQkFBaUIsQ0FBakJBLGlCQUFpQjtFQUFqQkEsaUJBQWlCLENBQWpCQSxpQkFBaUI7RUFBakJBLGlCQUFpQixDQUFqQkEsaUJBQWlCO0VBQWpCQSxpQkFBaUIsQ0FBakJBLGlCQUFpQjtFQUFqQkEsaUJBQWlCLENBQWpCQSxpQkFBaUI7RUFBakJBLGlCQUFpQixDQUFqQkEsaUJBQWlCO0VBQWpCQSxpQkFBaUIsQ0FBakJBLGlCQUFpQjtFQUFqQkEsaUJBQWlCLENBQWpCQSxpQkFBaUI7RUFBakJBLGlCQUFpQixDQUFqQkEsaUJBQWlCO0VBQWpCQSxpQkFBaUIsQ0FBakJBLGlCQUFpQjtFQUFqQkEsaUJBQWlCLENBQWpCQSxpQkFBaUI7RUFBQSxPQUFqQkEsaUJBQWlCO0FBQUEsT0EyRDdCO0FBQ08sTUFBTUMsNkJBQTZCLEdBQUFqUSxPQUFBLENBQUFpUSw2QkFBQSxHQUFHO0VBQzNDQyxNQUFNLEVBQUUsUUFBUTtFQUNoQkMsTUFBTSxFQUFFLFFBQVE7RUFDaEIsZ0JBQWdCLEVBQUU7QUFDcEIsQ0FBQzs7QUFFRDs7QUFFQTtBQUNPLE1BQU1DLHNDQUFzQyxHQUFBcFEsT0FBQSxDQUFBb1Esc0NBQUEsR0FBRyxFQUFFO0FBQ3hEO0FBQ08sTUFBTUMsOENBQThDLEdBQUFyUSxPQUFBLENBQUFxUSw4Q0FBQSxHQUFHLEVBQUU7QUFDaEU7QUFDQTtBQUNPLE1BQU1DLCtCQUErQixHQUFBdFEsT0FBQSxDQUFBc1EsK0JBQUEsR0FBRyxHQUFHOztBQUVsRDtBQUNPLE1BQU1DLDhCQUE4QixHQUFBdlEsT0FBQSxDQUFBdVEsOEJBQUEsR0FBRyxzQkFBc0I7O0FBRXBFO0FBQ08sTUFBTUMsaUNBQWlDLEdBQUF4USxPQUFBLENBQUF3USxpQ0FBQSxHQUFHLGlCQUFpQjtBQUMzRCxNQUFNQyxzQ0FBc0MsR0FBQXpRLE9BQUEsQ0FBQXlRLHNDQUFBLEdBQUcsRUFBRTs7QUFFeEQ7QUFDTyxNQUFNQywyQkFBMkIsR0FBQTFRLE9BQUEsQ0FBQTBRLDJCQUFBLEdBQUcsQ0FBQzs7QUFFNUM7QUFDTyxNQUFNQyx3QkFBd0IsR0FBQTNRLE9BQUEsQ0FBQTJRLHdCQUFBLEdBQUcsNkJBQTZCIn0=