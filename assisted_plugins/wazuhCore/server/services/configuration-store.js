"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigurationStore = void 0;
exports.printSection = printSection;
exports.printSetting = printSetting;
exports.printSettingCategory = printSettingCategory;
exports.printSettingValue = printSettingValue;
exports.splitDescription = splitDescription;
var _cache = require("../../common/services/cache");
var _fs = _interopRequireDefault(require("fs"));
var _jsYaml = _interopRequireDefault(require("js-yaml"));
var _filesystem = require("./filesystem");
var _web_documentation = require("../../common/services/web_documentation");
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class ConfigurationStore {
  constructor(logger, options) {
    this.logger = logger;
    _defineProperty(this, "configuration", void 0);
    _defineProperty(this, "_cache", void 0);
    _defineProperty(this, "_cacheKey", void 0);
    _defineProperty(this, "_fileEncoding", 'utf-8');
    _defineProperty(this, "file", '');
    this.file = options.file;
    if (!this.file) {
      const error = new Error('File is not defined');
      this.logger.error(error.message);
      throw error;
    }

    /* The in-memory ttl cache is used to reduce the access to the persistence */
    this._cache = new _cache.CacheTTL(this.logger.get('cache'), {
      ttlSeconds: options.cache_seconds
    });
    this._cacheKey = 'configuration';
  }
  readContentConfigurationFile() {
    this.logger.debug(`Reading file [${this.file}]`);
    const content = _fs.default.readFileSync(this.file, {
      encoding: this._fileEncoding
    });
    return content;
  }
  writeContentConfigurationFile(content, options = {}) {
    this.logger.debug(`Writing file [${this.file}]`);
    _fs.default.writeFileSync(this.file, content, {
      encoding: this._fileEncoding,
      ...options
    });
    this.logger.debug(`Wrote file [${this.file}]`);
  }
  readConfigurationFile() {
    const content = this.readContentConfigurationFile();
    const contentAsObject = _jsYaml.default.load(content) || {}; // Ensure the contentAsObject is an object
    this.logger.debug(`Content file [${this.file}]: ${JSON.stringify(contentAsObject)}`);
    // Transform value for key in the configuration file
    return Object.fromEntries(Object.entries(contentAsObject).map(([key, value]) => {
      var _setting$store$file$t, _setting$store, _setting$store$transf;
      const setting = this.configuration._settings.get(key);
      return [key, (_setting$store$file$t = setting === null || setting === void 0 || (_setting$store = setting.store) === null || _setting$store === void 0 || (_setting$store = _setting$store.file) === null || _setting$store === void 0 || (_setting$store$transf = _setting$store.transformFrom) === null || _setting$store$transf === void 0 ? void 0 : _setting$store$transf.call(_setting$store, value)) !== null && _setting$store$file$t !== void 0 ? _setting$store$file$t : value];
    }));
  }
  updateConfigurationFile(attributes) {
    // Plugin settings configurables in the configuration file.
    const pluginSettingsConfigurableFile = Object.fromEntries(Object.entries(attributes).filter(([key]) => {
      var _setting$store2;
      const setting = this.configuration._settings.get(key);
      return setting === null || setting === void 0 || (_setting$store2 = setting.store) === null || _setting$store2 === void 0 || (_setting$store2 = _setting$store2.file) === null || _setting$store2 === void 0 ? void 0 : _setting$store2.configurableManaged;
    }).map(([key, value]) => [key, value]));
    const content = this.readContentConfigurationFile();
    const contentUpdated = Object.entries(pluginSettingsConfigurableFile).reduce((accum, [key, value]) => {
      const re = new RegExp(`^${key}\\s{0,}:\\s{1,}.*`, 'gm');
      const match = accum.match(re);

      // Remove the setting if value is null
      if (value === null) {
        return accum.replace(re, '');
      }
      const formattedValue = formatSettingValueToFile(value);
      const updateSettingEntry = `${key}: ${formattedValue}`;
      return match ? /* Replace the setting if it is defined */
      accum.replace(re, `${updateSettingEntry}`) : /* Append the new setting entry to the end of file */`${accum}${accum.endsWith('\n') ? '' : '\n'}${updateSettingEntry}` /*exists*/;
    }, content);
    this.writeContentConfigurationFile(contentUpdated);
    return pluginSettingsConfigurableFile;
  }
  setConfiguration(configuration) {
    this.configuration = configuration;
  }
  async storeGet(params) {
    if (!(params !== null && params !== void 0 && params.ignoreCache) && this._cache.has(null, this._cacheKey)) {
      return this._cache.get(null, this._cacheKey);
    }
    const configuration = await this.readConfigurationFile();

    // Cache the values
    this._cache.set(configuration, this._cacheKey);
    return configuration;
  }
  async storeSet(attributes) {
    const configuration = await this.updateConfigurationFile(attributes);
    this._cache.set(attributes, this._cacheKey);
    return configuration;
  }
  getDefaultConfigurationFileContent() {
    const header = `---
#
# App configuration file
# Copyright (C) 2015-2024 Wazuh, Inc.
#
# This program is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation; either version 2 of the License, or
# (at your option) any later version.
#
# Find more information about this on the LICENSE file.
#
${printSection('App configuration file', {
      prefix: '# ',
      fill: '='
    })}
#
# Please check the documentation for more information about configuration options:
# ${(0, _web_documentation.webDocumentationLink)('user-manual/wazuh-dashboard/config-file.html')}
#
# Also, you can check our repository:
# https://github.com/wazuh/wazuh-dashboard-plugins`;
    const pluginSettingsConfigurationFileGroupByCategory = this.configuration.groupSettingsByCategory(null, setting => {
      var _setting$store3;
      return setting === null || setting === void 0 || (_setting$store3 = setting.store) === null || _setting$store3 === void 0 ? void 0 : _setting$store3.file;
    });
    const pluginSettingsConfiguration = pluginSettingsConfigurationFileGroupByCategory.map(({
      category: categorySetting,
      settings
    }) => {
      const category = printSettingCategory(categorySetting);
      const pluginSettingsOfCategory = settings.map(setting => printSetting(setting)).join('\n#\n');
      /*
      #------------------- {category name} --------------
      #
      #  {category description}
      #
      # {setting description}
      # settingKey: settingDefaultValue
      #
      # {setting description}
      # settingKey: settingDefaultValue
      # ...
      */
      return [category, pluginSettingsOfCategory].join('\n#\n');
    }).join('\n#\n');
    return `${[header, pluginSettingsConfiguration].join('\n#\n')}\n\n`;
  }
  ensureConfigurationFileIsCreated() {
    try {
      this.logger.debug(`Ensuring the configuration file is created [${this.file}]`);
      const dirname = _path.default.resolve(_path.default.dirname(this.file));
      (0, _filesystem.createDirectoryIfNotExists)(dirname);
      if (!_fs.default.existsSync(this.file)) {
        this.writeContentConfigurationFile(this.getDefaultConfigurationFileContent(), {
          mode: 0o600
        });
        this.logger.info(`Configuration file was created [${this.file}]`);
      } else {
        this.logger.debug(`Configuration file exists [${this.file}]`);
      }
    } catch (error) {
      const enhancedError = new Error(`Error ensuring the configuration file is created: ${error.message}`);
      this.logger.error(enhancedError.message);
      throw enhancedError;
    }
  }
  async setup() {
    this.logger.debug('Setup');
  }
  async start() {
    try {
      this.logger.debug('Start');
      this.ensureConfigurationFileIsCreated();
    } catch (error) {
      this.logger.error(`Error starting: ${error.message}`);
    }
  }
  async stop() {
    this.logger.debug('Stop');
  }
  async get(...settings) {
    try {
      const storeGetOptions = settings.length && typeof settings[settings.length - 1] !== 'string' ? settings.pop() : {};
      this.logger.debug(`Getting settings: [${JSON.stringify(settings)}] with store get options [${JSON.stringify(storeGetOptions)}]`);
      const stored = await this.storeGet(storeGetOptions);
      return settings.length ? settings.reduce((accum, settingKey) => ({
        ...accum,
        [settingKey]: stored === null || stored === void 0 ? void 0 : stored[settingKey]
      }), {}) : stored;
    } catch (error) {
      const enhancedError = new Error(`Error getting configuration: ${error.message}`);
      this.logger.error(enhancedError.message);
      throw enhancedError;
    }
  }
  async set(settings) {
    try {
      this.logger.debug('Updating');
      const stored = await this.storeGet({
        ignoreCache: true
      });
      const newSettings = {
        ...stored,
        ...settings
      };
      this.logger.debug(`Updating with ${JSON.stringify(newSettings)}`);
      await this.storeSet(newSettings);
      this.logger.debug('Configuration was updated');
      return settings;
    } catch (error) {
      const enhancedError = new Error(`Error setting configuration: ${error.message}`);
      this.logger.error(enhancedError.message);
      throw enhancedError;
    }
  }
  async clear(...settings) {
    try {
      this.logger.debug(`Clearing settings: [${settings.join(',')}]`);
      const stored = await this.storeGet({
        ignoreCache: true
      });
      const newSettings = {
        ...stored
      };
      const removedSettings = {};
      settings.forEach(setting => {
        removedSettings[setting] = newSettings[setting] = null;
      });
      await this.storeSet(newSettings);
      return removedSettings;
    } catch (error) {
      const enhancedError = new Error(`Error clearing configuration: ${error.message}`);
      this.logger.error(enhancedError.message);
      throw enhancedError;
    }
  }
}

// Utils

// Formatters in configuration file
exports.ConfigurationStore = ConfigurationStore;
const formatSettingValueToFileType = {
  string: value => `"${value.replace(/"/, '\\"').replace(/\n/g, '\\n')}"`,
  // Escape the " character and new line
  object: value => JSON.stringify(value),
  default: value => value
};

/**
 * Format the plugin setting value received in the backend to store in the plugin configuration file (.yml).
 * @param value plugin setting value sent to the endpoint
 * @returns valid value to .yml
 */
function formatSettingValueToFile(value) {
  const formatter = formatSettingValueToFileType[typeof value] || formatSettingValueToFileType.default;
  return formatter(value);
}

/**
 * Print the setting value
 * @param value
 * @returns
 */
function printSettingValue(value) {
  if (typeof value === 'object') {
    return JSON.stringify(value);
  }
  if (typeof value === 'string' && value.length === 0) {
    return `''`;
  }
  return value;
}

/**
 * Print setting on the default configuration file
 * @param setting
 * @returns
 */
function printSetting(setting) {
  var _setting$store4;
  /*
  # {setting description}
  # ?{{settingDefaultBlock} || {{settingKey}: {settingDefaultValue}}}
  */
  return [splitDescription(setting.description), (setting === null || setting === void 0 || (_setting$store4 = setting.store) === null || _setting$store4 === void 0 || (_setting$store4 = _setting$store4.file) === null || _setting$store4 === void 0 ? void 0 : _setting$store4.defaultBlock) || `# ${setting.key}: ${printSettingValue(setting.defaultValue)}`].join('\n');
}

/**
 * Print category header on the default configuration file
 * @param param0
 * @returns
 */
function printSettingCategory({
  title,
  description
}) {
  /*
  #------------------------------- {category title} -------------------------------
  # {category description}
  #
  */
  return [printSection(title, {
    prefix: '# ',
    fill: '-'
  }), ...(description ? [splitDescription(description)] : [''])].join('\n#\n');
}
function printSection(text, options) {
  var _options$maxLength, _options$prefix, _options$suffix, _options$spaceAround, _options$fill;
  const maxLength = (_options$maxLength = options === null || options === void 0 ? void 0 : options.maxLength) !== null && _options$maxLength !== void 0 ? _options$maxLength : 80;
  const prefix = (_options$prefix = options === null || options === void 0 ? void 0 : options.prefix) !== null && _options$prefix !== void 0 ? _options$prefix : '';
  const sufix = (_options$suffix = options === null || options === void 0 ? void 0 : options.suffix) !== null && _options$suffix !== void 0 ? _options$suffix : '';
  const spaceAround = (_options$spaceAround = options === null || options === void 0 ? void 0 : options.spaceAround) !== null && _options$spaceAround !== void 0 ? _options$spaceAround : 1;
  const fill = (_options$fill = options === null || options === void 0 ? void 0 : options.fill) !== null && _options$fill !== void 0 ? _options$fill : ' ';
  const fillLength = maxLength - prefix.length - sufix.length - 2 * spaceAround - text.length;
  return [prefix, fill.repeat(Math.floor(fillLength / 2)), ` ${text} `, fill.repeat(Math.ceil(fillLength / 2)), sufix].join('');
}

/**
 * Given a string, this function builds a multine string, each line about 70
 * characters long, splitted at the closest whitespace character to that lentgh.
 *
 * This function is used to transform the settings description
 * into a multiline string to be used as the setting documentation.
 *
 * The # character is also appended to the beginning of each line.
 *
 * @param text
 * @returns multine string
 */
function splitDescription(text = '') {
  const lines = text.match(/.{1,80}(?=\s|$)/g) || [];
  return lines.map(z => '# ' + z.trim()).join('\n');
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY2FjaGUiLCJyZXF1aXJlIiwiX2ZzIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIl9qc1lhbWwiLCJfZmlsZXN5c3RlbSIsIl93ZWJfZG9jdW1lbnRhdGlvbiIsIl9wYXRoIiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJfZGVmaW5lUHJvcGVydHkiLCJrZXkiLCJ2YWx1ZSIsIl90b1Byb3BlcnR5S2V5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJhcmciLCJfdG9QcmltaXRpdmUiLCJTdHJpbmciLCJpbnB1dCIsImhpbnQiLCJwcmltIiwiU3ltYm9sIiwidG9QcmltaXRpdmUiLCJ1bmRlZmluZWQiLCJyZXMiLCJjYWxsIiwiVHlwZUVycm9yIiwiTnVtYmVyIiwiQ29uZmlndXJhdGlvblN0b3JlIiwiY29uc3RydWN0b3IiLCJsb2dnZXIiLCJvcHRpb25zIiwiZmlsZSIsImVycm9yIiwiRXJyb3IiLCJtZXNzYWdlIiwiQ2FjaGVUVEwiLCJnZXQiLCJ0dGxTZWNvbmRzIiwiY2FjaGVfc2Vjb25kcyIsIl9jYWNoZUtleSIsInJlYWRDb250ZW50Q29uZmlndXJhdGlvbkZpbGUiLCJkZWJ1ZyIsImNvbnRlbnQiLCJmcyIsInJlYWRGaWxlU3luYyIsImVuY29kaW5nIiwiX2ZpbGVFbmNvZGluZyIsIndyaXRlQ29udGVudENvbmZpZ3VyYXRpb25GaWxlIiwid3JpdGVGaWxlU3luYyIsInJlYWRDb25maWd1cmF0aW9uRmlsZSIsImNvbnRlbnRBc09iamVjdCIsInltbCIsImxvYWQiLCJKU09OIiwic3RyaW5naWZ5IiwiZnJvbUVudHJpZXMiLCJlbnRyaWVzIiwibWFwIiwiX3NldHRpbmckc3RvcmUkZmlsZSR0IiwiX3NldHRpbmckc3RvcmUiLCJfc2V0dGluZyRzdG9yZSR0cmFuc2YiLCJzZXR0aW5nIiwiY29uZmlndXJhdGlvbiIsIl9zZXR0aW5ncyIsInN0b3JlIiwidHJhbnNmb3JtRnJvbSIsInVwZGF0ZUNvbmZpZ3VyYXRpb25GaWxlIiwiYXR0cmlidXRlcyIsInBsdWdpblNldHRpbmdzQ29uZmlndXJhYmxlRmlsZSIsImZpbHRlciIsIl9zZXR0aW5nJHN0b3JlMiIsImNvbmZpZ3VyYWJsZU1hbmFnZWQiLCJjb250ZW50VXBkYXRlZCIsInJlZHVjZSIsImFjY3VtIiwicmUiLCJSZWdFeHAiLCJtYXRjaCIsInJlcGxhY2UiLCJmb3JtYXR0ZWRWYWx1ZSIsImZvcm1hdFNldHRpbmdWYWx1ZVRvRmlsZSIsInVwZGF0ZVNldHRpbmdFbnRyeSIsImVuZHNXaXRoIiwic2V0Q29uZmlndXJhdGlvbiIsInN0b3JlR2V0IiwicGFyYW1zIiwiaWdub3JlQ2FjaGUiLCJoYXMiLCJzZXQiLCJzdG9yZVNldCIsImdldERlZmF1bHRDb25maWd1cmF0aW9uRmlsZUNvbnRlbnQiLCJoZWFkZXIiLCJwcmludFNlY3Rpb24iLCJwcmVmaXgiLCJmaWxsIiwid2ViRG9jdW1lbnRhdGlvbkxpbmsiLCJwbHVnaW5TZXR0aW5nc0NvbmZpZ3VyYXRpb25GaWxlR3JvdXBCeUNhdGVnb3J5IiwiZ3JvdXBTZXR0aW5nc0J5Q2F0ZWdvcnkiLCJfc2V0dGluZyRzdG9yZTMiLCJwbHVnaW5TZXR0aW5nc0NvbmZpZ3VyYXRpb24iLCJjYXRlZ29yeSIsImNhdGVnb3J5U2V0dGluZyIsInNldHRpbmdzIiwicHJpbnRTZXR0aW5nQ2F0ZWdvcnkiLCJwbHVnaW5TZXR0aW5nc09mQ2F0ZWdvcnkiLCJwcmludFNldHRpbmciLCJqb2luIiwiZW5zdXJlQ29uZmlndXJhdGlvbkZpbGVJc0NyZWF0ZWQiLCJkaXJuYW1lIiwicGF0aCIsInJlc29sdmUiLCJjcmVhdGVEaXJlY3RvcnlJZk5vdEV4aXN0cyIsImV4aXN0c1N5bmMiLCJtb2RlIiwiaW5mbyIsImVuaGFuY2VkRXJyb3IiLCJzZXR1cCIsInN0YXJ0Iiwic3RvcCIsInN0b3JlR2V0T3B0aW9ucyIsImxlbmd0aCIsInBvcCIsInN0b3JlZCIsInNldHRpbmdLZXkiLCJuZXdTZXR0aW5ncyIsImNsZWFyIiwicmVtb3ZlZFNldHRpbmdzIiwiZm9yRWFjaCIsImV4cG9ydHMiLCJmb3JtYXRTZXR0aW5nVmFsdWVUb0ZpbGVUeXBlIiwic3RyaW5nIiwib2JqZWN0IiwiZm9ybWF0dGVyIiwicHJpbnRTZXR0aW5nVmFsdWUiLCJfc2V0dGluZyRzdG9yZTQiLCJzcGxpdERlc2NyaXB0aW9uIiwiZGVzY3JpcHRpb24iLCJkZWZhdWx0QmxvY2siLCJkZWZhdWx0VmFsdWUiLCJ0aXRsZSIsInRleHQiLCJfb3B0aW9ucyRtYXhMZW5ndGgiLCJfb3B0aW9ucyRwcmVmaXgiLCJfb3B0aW9ucyRzdWZmaXgiLCJfb3B0aW9ucyRzcGFjZUFyb3VuZCIsIl9vcHRpb25zJGZpbGwiLCJtYXhMZW5ndGgiLCJzdWZpeCIsInN1ZmZpeCIsInNwYWNlQXJvdW5kIiwiZmlsbExlbmd0aCIsInJlcGVhdCIsIk1hdGgiLCJmbG9vciIsImNlaWwiLCJsaW5lcyIsInoiLCJ0cmltIl0sInNvdXJjZXMiOlsiY29uZmlndXJhdGlvbi1zdG9yZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tICdvcGVuc2VhcmNoLWRhc2hib2FyZHMvc2VydmVyJztcbmltcG9ydCB7XG4gIElDb25maWd1cmF0aW9uU3RvcmUsXG4gIElDb25maWd1cmF0aW9uLFxufSBmcm9tICcuLi8uLi9jb21tb24vc2VydmljZXMvY29uZmlndXJhdGlvbic7XG5pbXBvcnQgeyBDYWNoZVRUTCB9IGZyb20gJy4uLy4uL2NvbW1vbi9zZXJ2aWNlcy9jYWNoZSc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHltbCBmcm9tICdqcy15YW1sJztcbmltcG9ydCB7IGNyZWF0ZURpcmVjdG9yeUlmTm90RXhpc3RzIH0gZnJvbSAnLi9maWxlc3lzdGVtJztcbmltcG9ydCB7IHdlYkRvY3VtZW50YXRpb25MaW5rIH0gZnJvbSAnLi4vLi4vY29tbW9uL3NlcnZpY2VzL3dlYl9kb2N1bWVudGF0aW9uJztcbmltcG9ydCB7IFRQbHVnaW5TZXR0aW5nV2l0aEtleSB9IGZyb20gJy4uLy4uL2NvbW1vbi9jb25zdGFudHMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmludGVyZmFjZSBJQ29uZmlndXJhdGlvblN0b3JlT3B0aW9ucyB7XG4gIGNhY2hlX3NlY29uZHM6IG51bWJlcjtcbiAgZmlsZTogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgSVN0b3JlR2V0T3B0aW9ucyB7XG4gIGlnbm9yZUNhY2hlOiBib29sZWFuO1xufVxuXG5leHBvcnQgY2xhc3MgQ29uZmlndXJhdGlvblN0b3JlIGltcGxlbWVudHMgSUNvbmZpZ3VyYXRpb25TdG9yZSB7XG4gIHByaXZhdGUgY29uZmlndXJhdGlvbjogSUNvbmZpZ3VyYXRpb247XG4gIHByaXZhdGUgX2NhY2hlOiBDYWNoZVRUTDxhbnk+O1xuICBwcml2YXRlIF9jYWNoZUtleTogc3RyaW5nO1xuICBwcml2YXRlIF9maWxlRW5jb2Rpbmc6IHN0cmluZyA9ICd1dGYtOCc7XG4gIGZpbGU6IHN0cmluZyA9ICcnO1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGxvZ2dlcjogTG9nZ2VyLCBvcHRpb25zOiBJQ29uZmlndXJhdGlvblN0b3JlT3B0aW9ucykge1xuICAgIHRoaXMuZmlsZSA9IG9wdGlvbnMuZmlsZTtcblxuICAgIGlmICghdGhpcy5maWxlKSB7XG4gICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcignRmlsZSBpcyBub3QgZGVmaW5lZCcpO1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICAvKiBUaGUgaW4tbWVtb3J5IHR0bCBjYWNoZSBpcyB1c2VkIHRvIHJlZHVjZSB0aGUgYWNjZXNzIHRvIHRoZSBwZXJzaXN0ZW5jZSAqL1xuICAgIHRoaXMuX2NhY2hlID0gbmV3IENhY2hlVFRMPGFueT4odGhpcy5sb2dnZXIuZ2V0KCdjYWNoZScpLCB7XG4gICAgICB0dGxTZWNvbmRzOiBvcHRpb25zLmNhY2hlX3NlY29uZHMsXG4gICAgfSk7XG4gICAgdGhpcy5fY2FjaGVLZXkgPSAnY29uZmlndXJhdGlvbic7XG4gIH1cbiAgcHJpdmF0ZSByZWFkQ29udGVudENvbmZpZ3VyYXRpb25GaWxlKCkge1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBSZWFkaW5nIGZpbGUgWyR7dGhpcy5maWxlfV1gKTtcbiAgICBjb25zdCBjb250ZW50ID0gZnMucmVhZEZpbGVTeW5jKHRoaXMuZmlsZSwge1xuICAgICAgZW5jb2Rpbmc6IHRoaXMuX2ZpbGVFbmNvZGluZyxcbiAgICB9KTtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuICBwcml2YXRlIHdyaXRlQ29udGVudENvbmZpZ3VyYXRpb25GaWxlKGNvbnRlbnQ6IHN0cmluZywgb3B0aW9ucyA9IHt9KSB7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYFdyaXRpbmcgZmlsZSBbJHt0aGlzLmZpbGV9XWApO1xuICAgIGZzLndyaXRlRmlsZVN5bmModGhpcy5maWxlLCBjb250ZW50LCB7XG4gICAgICBlbmNvZGluZzogdGhpcy5fZmlsZUVuY29kaW5nLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9KTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgV3JvdGUgZmlsZSBbJHt0aGlzLmZpbGV9XWApO1xuICB9XG4gIHByaXZhdGUgcmVhZENvbmZpZ3VyYXRpb25GaWxlKCkge1xuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLnJlYWRDb250ZW50Q29uZmlndXJhdGlvbkZpbGUoKTtcbiAgICBjb25zdCBjb250ZW50QXNPYmplY3QgPSB5bWwubG9hZChjb250ZW50KSB8fCB7fTsgLy8gRW5zdXJlIHRoZSBjb250ZW50QXNPYmplY3QgaXMgYW4gb2JqZWN0XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoXG4gICAgICBgQ29udGVudCBmaWxlIFske3RoaXMuZmlsZX1dOiAke0pTT04uc3RyaW5naWZ5KGNvbnRlbnRBc09iamVjdCl9YCxcbiAgICApO1xuICAgIC8vIFRyYW5zZm9ybSB2YWx1ZSBmb3Iga2V5IGluIHRoZSBjb25maWd1cmF0aW9uIGZpbGVcbiAgICByZXR1cm4gT2JqZWN0LmZyb21FbnRyaWVzKFxuICAgICAgT2JqZWN0LmVudHJpZXMoY29udGVudEFzT2JqZWN0KS5tYXAoKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICBjb25zdCBzZXR0aW5nID0gdGhpcy5jb25maWd1cmF0aW9uLl9zZXR0aW5ncy5nZXQoa2V5KTtcbiAgICAgICAgcmV0dXJuIFtrZXksIHNldHRpbmc/LnN0b3JlPy5maWxlPy50cmFuc2Zvcm1Gcm9tPy4odmFsdWUpID8/IHZhbHVlXTtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cbiAgcHJpdmF0ZSB1cGRhdGVDb25maWd1cmF0aW9uRmlsZShhdHRyaWJ1dGVzOiBhbnkpIHtcbiAgICAvLyBQbHVnaW4gc2V0dGluZ3MgY29uZmlndXJhYmxlcyBpbiB0aGUgY29uZmlndXJhdGlvbiBmaWxlLlxuICAgIGNvbnN0IHBsdWdpblNldHRpbmdzQ29uZmlndXJhYmxlRmlsZSA9IE9iamVjdC5mcm9tRW50cmllcyhcbiAgICAgIE9iamVjdC5lbnRyaWVzKGF0dHJpYnV0ZXMpXG4gICAgICAgIC5maWx0ZXIoKFtrZXldKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2V0dGluZyA9IHRoaXMuY29uZmlndXJhdGlvbi5fc2V0dGluZ3MuZ2V0KGtleSk7XG4gICAgICAgICAgcmV0dXJuIHNldHRpbmc/LnN0b3JlPy5maWxlPy5jb25maWd1cmFibGVNYW5hZ2VkO1xuICAgICAgICB9KVxuICAgICAgICAubWFwKChba2V5LCB2YWx1ZV0pID0+IFtrZXksIHZhbHVlXSksXG4gICAgKTtcblxuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLnJlYWRDb250ZW50Q29uZmlndXJhdGlvbkZpbGUoKTtcblxuICAgIGNvbnN0IGNvbnRlbnRVcGRhdGVkID0gT2JqZWN0LmVudHJpZXMoXG4gICAgICBwbHVnaW5TZXR0aW5nc0NvbmZpZ3VyYWJsZUZpbGUsXG4gICAgKS5yZWR1Y2UoKGFjY3VtLCBba2V5LCB2YWx1ZV0pID0+IHtcbiAgICAgIGNvbnN0IHJlID0gbmV3IFJlZ0V4cChgXiR7a2V5fVxcXFxzezAsfTpcXFxcc3sxLH0uKmAsICdnbScpO1xuICAgICAgY29uc3QgbWF0Y2ggPSBhY2N1bS5tYXRjaChyZSk7XG5cbiAgICAgIC8vIFJlbW92ZSB0aGUgc2V0dGluZyBpZiB2YWx1ZSBpcyBudWxsXG4gICAgICBpZiAodmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGFjY3VtLnJlcGxhY2UocmUsICcnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZm9ybWF0dGVkVmFsdWUgPSBmb3JtYXRTZXR0aW5nVmFsdWVUb0ZpbGUodmFsdWUpO1xuICAgICAgY29uc3QgdXBkYXRlU2V0dGluZ0VudHJ5ID0gYCR7a2V5fTogJHtmb3JtYXR0ZWRWYWx1ZX1gO1xuICAgICAgcmV0dXJuIG1hdGNoXG4gICAgICAgID8gLyogUmVwbGFjZSB0aGUgc2V0dGluZyBpZiBpdCBpcyBkZWZpbmVkICovXG4gICAgICAgICAgYWNjdW0ucmVwbGFjZShyZSwgYCR7dXBkYXRlU2V0dGluZ0VudHJ5fWApXG4gICAgICAgIDogLyogQXBwZW5kIHRoZSBuZXcgc2V0dGluZyBlbnRyeSB0byB0aGUgZW5kIG9mIGZpbGUgKi8gYCR7YWNjdW19JHtcbiAgICAgICAgICAgIGFjY3VtLmVuZHNXaXRoKCdcXG4nKSA/ICcnIDogJ1xcbidcbiAgICAgICAgICB9JHt1cGRhdGVTZXR0aW5nRW50cnl9YCAvKmV4aXN0cyovO1xuICAgIH0sIGNvbnRlbnQpO1xuXG4gICAgdGhpcy53cml0ZUNvbnRlbnRDb25maWd1cmF0aW9uRmlsZShjb250ZW50VXBkYXRlZCk7XG4gICAgcmV0dXJuIHBsdWdpblNldHRpbmdzQ29uZmlndXJhYmxlRmlsZTtcbiAgfVxuICBzZXRDb25maWd1cmF0aW9uKGNvbmZpZ3VyYXRpb246IElDb25maWd1cmF0aW9uKSB7XG4gICAgdGhpcy5jb25maWd1cmF0aW9uID0gY29uZmlndXJhdGlvbjtcbiAgfVxuICBwcml2YXRlIGFzeW5jIHN0b3JlR2V0KHBhcmFtcz86IElTdG9yZUdldE9wdGlvbnMpIHtcbiAgICBpZiAoIXBhcmFtcz8uaWdub3JlQ2FjaGUgJiYgdGhpcy5fY2FjaGUuaGFzKG51bGwsIHRoaXMuX2NhY2hlS2V5KSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NhY2hlLmdldChudWxsLCB0aGlzLl9jYWNoZUtleSk7XG4gICAgfVxuICAgIGNvbnN0IGNvbmZpZ3VyYXRpb24gPSBhd2FpdCB0aGlzLnJlYWRDb25maWd1cmF0aW9uRmlsZSgpO1xuXG4gICAgLy8gQ2FjaGUgdGhlIHZhbHVlc1xuICAgIHRoaXMuX2NhY2hlLnNldChjb25maWd1cmF0aW9uLCB0aGlzLl9jYWNoZUtleSk7XG4gICAgcmV0dXJuIGNvbmZpZ3VyYXRpb247XG4gIH1cbiAgcHJpdmF0ZSBhc3luYyBzdG9yZVNldChhdHRyaWJ1dGVzOiBhbnkpIHtcbiAgICBjb25zdCBjb25maWd1cmF0aW9uID0gYXdhaXQgdGhpcy51cGRhdGVDb25maWd1cmF0aW9uRmlsZShhdHRyaWJ1dGVzKTtcbiAgICB0aGlzLl9jYWNoZS5zZXQoYXR0cmlidXRlcywgdGhpcy5fY2FjaGVLZXkpO1xuICAgIHJldHVybiBjb25maWd1cmF0aW9uO1xuICB9XG4gIHByaXZhdGUgZ2V0RGVmYXVsdENvbmZpZ3VyYXRpb25GaWxlQ29udGVudCgpIHtcbiAgICBjb25zdCBoZWFkZXI6IHN0cmluZyA9IGAtLS1cbiNcbiMgQXBwIGNvbmZpZ3VyYXRpb24gZmlsZVxuIyBDb3B5cmlnaHQgKEMpIDIwMTUtMjAyNCBXYXp1aCwgSW5jLlxuI1xuIyBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTsgeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuIyBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuIyB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uOyBlaXRoZXIgdmVyc2lvbiAyIG9mIHRoZSBMaWNlbnNlLCBvclxuIyAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuI1xuIyBGaW5kIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhpcyBvbiB0aGUgTElDRU5TRSBmaWxlLlxuI1xuJHtwcmludFNlY3Rpb24oJ0FwcCBjb25maWd1cmF0aW9uIGZpbGUnLCB7IHByZWZpeDogJyMgJywgZmlsbDogJz0nIH0pfVxuI1xuIyBQbGVhc2UgY2hlY2sgdGhlIGRvY3VtZW50YXRpb24gZm9yIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgY29uZmlndXJhdGlvbiBvcHRpb25zOlxuIyAke3dlYkRvY3VtZW50YXRpb25MaW5rKCd1c2VyLW1hbnVhbC93YXp1aC1kYXNoYm9hcmQvY29uZmlnLWZpbGUuaHRtbCcpfVxuI1xuIyBBbHNvLCB5b3UgY2FuIGNoZWNrIG91ciByZXBvc2l0b3J5OlxuIyBodHRwczovL2dpdGh1Yi5jb20vd2F6dWgvd2F6dWgtZGFzaGJvYXJkLXBsdWdpbnNgO1xuXG4gICAgY29uc3QgcGx1Z2luU2V0dGluZ3NDb25maWd1cmF0aW9uRmlsZUdyb3VwQnlDYXRlZ29yeSA9XG4gICAgICB0aGlzLmNvbmZpZ3VyYXRpb24uZ3JvdXBTZXR0aW5nc0J5Q2F0ZWdvcnkoXG4gICAgICAgIG51bGwsXG4gICAgICAgIHNldHRpbmcgPT4gc2V0dGluZz8uc3RvcmU/LmZpbGUsXG4gICAgICApO1xuXG4gICAgY29uc3QgcGx1Z2luU2V0dGluZ3NDb25maWd1cmF0aW9uID1cbiAgICAgIHBsdWdpblNldHRpbmdzQ29uZmlndXJhdGlvbkZpbGVHcm91cEJ5Q2F0ZWdvcnlcbiAgICAgICAgLm1hcCgoeyBjYXRlZ29yeTogY2F0ZWdvcnlTZXR0aW5nLCBzZXR0aW5ncyB9KSA9PiB7XG4gICAgICAgICAgY29uc3QgY2F0ZWdvcnkgPSBwcmludFNldHRpbmdDYXRlZ29yeShjYXRlZ29yeVNldHRpbmcpO1xuXG4gICAgICAgICAgY29uc3QgcGx1Z2luU2V0dGluZ3NPZkNhdGVnb3J5ID0gc2V0dGluZ3NcbiAgICAgICAgICAgIC5tYXAoc2V0dGluZyA9PiBwcmludFNldHRpbmcoc2V0dGluZykpXG4gICAgICAgICAgICAuam9pbignXFxuI1xcbicpO1xuICAgICAgICAgIC8qXG4gICMtLS0tLS0tLS0tLS0tLS0tLS0tIHtjYXRlZ29yeSBuYW1lfSAtLS0tLS0tLS0tLS0tLVxuICAjXG4gICMgIHtjYXRlZ29yeSBkZXNjcmlwdGlvbn1cbiAgI1xuICAjIHtzZXR0aW5nIGRlc2NyaXB0aW9ufVxuICAjIHNldHRpbmdLZXk6IHNldHRpbmdEZWZhdWx0VmFsdWVcbiAgI1xuICAjIHtzZXR0aW5nIGRlc2NyaXB0aW9ufVxuICAjIHNldHRpbmdLZXk6IHNldHRpbmdEZWZhdWx0VmFsdWVcbiAgIyAuLi5cbiAgKi9cbiAgICAgICAgICByZXR1cm4gW2NhdGVnb3J5LCBwbHVnaW5TZXR0aW5nc09mQ2F0ZWdvcnldLmpvaW4oJ1xcbiNcXG4nKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmpvaW4oJ1xcbiNcXG4nKTtcblxuICAgIHJldHVybiBgJHtbaGVhZGVyLCBwbHVnaW5TZXR0aW5nc0NvbmZpZ3VyYXRpb25dLmpvaW4oJ1xcbiNcXG4nKX1cXG5cXG5gO1xuICB9XG4gIGVuc3VyZUNvbmZpZ3VyYXRpb25GaWxlSXNDcmVhdGVkKCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcbiAgICAgICAgYEVuc3VyaW5nIHRoZSBjb25maWd1cmF0aW9uIGZpbGUgaXMgY3JlYXRlZCBbJHt0aGlzLmZpbGV9XWAsXG4gICAgICApO1xuICAgICAgY29uc3QgZGlybmFtZSA9IHBhdGgucmVzb2x2ZShwYXRoLmRpcm5hbWUodGhpcy5maWxlKSk7XG4gICAgICBjcmVhdGVEaXJlY3RvcnlJZk5vdEV4aXN0cyhkaXJuYW1lKTtcbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyh0aGlzLmZpbGUpKSB7XG4gICAgICAgIHRoaXMud3JpdGVDb250ZW50Q29uZmlndXJhdGlvbkZpbGUoXG4gICAgICAgICAgdGhpcy5nZXREZWZhdWx0Q29uZmlndXJhdGlvbkZpbGVDb250ZW50KCksXG4gICAgICAgICAge1xuICAgICAgICAgICAgbW9kZTogMG82MDAsXG4gICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgQ29uZmlndXJhdGlvbiBmaWxlIHdhcyBjcmVhdGVkIFske3RoaXMuZmlsZX1dYCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgQ29uZmlndXJhdGlvbiBmaWxlIGV4aXN0cyBbJHt0aGlzLmZpbGV9XWApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBlbmhhbmNlZEVycm9yID0gbmV3IEVycm9yKFxuICAgICAgICBgRXJyb3IgZW5zdXJpbmcgdGhlIGNvbmZpZ3VyYXRpb24gZmlsZSBpcyBjcmVhdGVkOiAke2Vycm9yLm1lc3NhZ2V9YCxcbiAgICAgICk7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcihlbmhhbmNlZEVycm9yLm1lc3NhZ2UpO1xuICAgICAgdGhyb3cgZW5oYW5jZWRFcnJvcjtcbiAgICB9XG4gIH1cbiAgYXN5bmMgc2V0dXAoKSB7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoJ1NldHVwJyk7XG4gIH1cbiAgYXN5bmMgc3RhcnQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdTdGFydCcpO1xuICAgICAgdGhpcy5lbnN1cmVDb25maWd1cmF0aW9uRmlsZUlzQ3JlYXRlZCgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLmxvZ2dlci5lcnJvcihgRXJyb3Igc3RhcnRpbmc6ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgICB9XG4gIH1cbiAgYXN5bmMgc3RvcCgpIHtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZygnU3RvcCcpO1xuICB9XG4gIGFzeW5jIGdldCguLi5zZXR0aW5nczogc3RyaW5nW10pOiBQcm9taXNlPGFueSB8IHsgW2tleTogc3RyaW5nXTogYW55IH0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3RvcmVHZXRPcHRpb25zID1cbiAgICAgICAgc2V0dGluZ3MubGVuZ3RoICYmIHR5cGVvZiBzZXR0aW5nc1tzZXR0aW5ncy5sZW5ndGggLSAxXSAhPT0gJ3N0cmluZydcbiAgICAgICAgICA/IHNldHRpbmdzLnBvcCgpXG4gICAgICAgICAgOiB7fTtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKFxuICAgICAgICBgR2V0dGluZyBzZXR0aW5nczogWyR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgc2V0dGluZ3MsXG4gICAgICAgICl9XSB3aXRoIHN0b3JlIGdldCBvcHRpb25zIFske0pTT04uc3RyaW5naWZ5KHN0b3JlR2V0T3B0aW9ucyl9XWAsXG4gICAgICApO1xuICAgICAgY29uc3Qgc3RvcmVkID0gYXdhaXQgdGhpcy5zdG9yZUdldChzdG9yZUdldE9wdGlvbnMpO1xuICAgICAgcmV0dXJuIHNldHRpbmdzLmxlbmd0aFxuICAgICAgICA/IHNldHRpbmdzLnJlZHVjZShcbiAgICAgICAgICAgIChhY2N1bSwgc2V0dGluZ0tleTogc3RyaW5nKSA9PiAoe1xuICAgICAgICAgICAgICAuLi5hY2N1bSxcbiAgICAgICAgICAgICAgW3NldHRpbmdLZXldOiBzdG9yZWQ/LltzZXR0aW5nS2V5XSxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAge30sXG4gICAgICAgICAgKVxuICAgICAgICA6IHN0b3JlZDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgZW5oYW5jZWRFcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgYEVycm9yIGdldHRpbmcgY29uZmlndXJhdGlvbjogJHtlcnJvci5tZXNzYWdlfWAsXG4gICAgICApO1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZW5oYW5jZWRFcnJvci5tZXNzYWdlKTtcbiAgICAgIHRocm93IGVuaGFuY2VkRXJyb3I7XG4gICAgfVxuICB9XG4gIGFzeW5jIHNldChzZXR0aW5nczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSk6IFByb21pc2U8YW55PiB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdVcGRhdGluZycpO1xuICAgICAgY29uc3Qgc3RvcmVkID0gYXdhaXQgdGhpcy5zdG9yZUdldCh7IGlnbm9yZUNhY2hlOiB0cnVlIH0pO1xuXG4gICAgICBjb25zdCBuZXdTZXR0aW5ncyA9IHtcbiAgICAgICAgLi4uc3RvcmVkLFxuICAgICAgICAuLi5zZXR0aW5ncyxcbiAgICAgIH07XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgVXBkYXRpbmcgd2l0aCAke0pTT04uc3RyaW5naWZ5KG5ld1NldHRpbmdzKX1gKTtcbiAgICAgIGF3YWl0IHRoaXMuc3RvcmVTZXQobmV3U2V0dGluZ3MpO1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ0NvbmZpZ3VyYXRpb24gd2FzIHVwZGF0ZWQnKTtcbiAgICAgIHJldHVybiBzZXR0aW5ncztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgZW5oYW5jZWRFcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgYEVycm9yIHNldHRpbmcgY29uZmlndXJhdGlvbjogJHtlcnJvci5tZXNzYWdlfWAsXG4gICAgICApO1xuICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZW5oYW5jZWRFcnJvci5tZXNzYWdlKTtcbiAgICAgIHRocm93IGVuaGFuY2VkRXJyb3I7XG4gICAgfVxuICB9XG4gIGFzeW5jIGNsZWFyKC4uLnNldHRpbmdzOiBzdHJpbmdbXSk6IFByb21pc2U8YW55PiB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBDbGVhcmluZyBzZXR0aW5nczogWyR7c2V0dGluZ3Muam9pbignLCcpfV1gKTtcbiAgICAgIGNvbnN0IHN0b3JlZCA9IGF3YWl0IHRoaXMuc3RvcmVHZXQoeyBpZ25vcmVDYWNoZTogdHJ1ZSB9KTtcbiAgICAgIGNvbnN0IG5ld1NldHRpbmdzID0ge1xuICAgICAgICAuLi5zdG9yZWQsXG4gICAgICB9O1xuICAgICAgY29uc3QgcmVtb3ZlZFNldHRpbmdzID0ge307XG4gICAgICBzZXR0aW5ncy5mb3JFYWNoKHNldHRpbmcgPT4ge1xuICAgICAgICByZW1vdmVkU2V0dGluZ3Nbc2V0dGluZ10gPSBuZXdTZXR0aW5nc1tzZXR0aW5nXSA9IG51bGw7XG4gICAgICB9KTtcbiAgICAgIGF3YWl0IHRoaXMuc3RvcmVTZXQobmV3U2V0dGluZ3MpO1xuICAgICAgcmV0dXJuIHJlbW92ZWRTZXR0aW5ncztcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgZW5oYW5jZWRFcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgYEVycm9yIGNsZWFyaW5nIGNvbmZpZ3VyYXRpb246ICR7ZXJyb3IubWVzc2FnZX1gLFxuICAgICAgKTtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGVuaGFuY2VkRXJyb3IubWVzc2FnZSk7XG4gICAgICB0aHJvdyBlbmhhbmNlZEVycm9yO1xuICAgIH1cbiAgfVxufVxuXG4vLyBVdGlsc1xuXG4vLyBGb3JtYXR0ZXJzIGluIGNvbmZpZ3VyYXRpb24gZmlsZVxuY29uc3QgZm9ybWF0U2V0dGluZ1ZhbHVlVG9GaWxlVHlwZSA9IHtcbiAgc3RyaW5nOiAodmFsdWU6IHN0cmluZyk6IHN0cmluZyA9PlxuICAgIGBcIiR7dmFsdWUucmVwbGFjZSgvXCIvLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csICdcXFxcbicpfVwiYCwgLy8gRXNjYXBlIHRoZSBcIiBjaGFyYWN0ZXIgYW5kIG5ldyBsaW5lXG4gIG9iamVjdDogKHZhbHVlOiBhbnkpOiBzdHJpbmcgPT4gSlNPTi5zdHJpbmdpZnkodmFsdWUpLFxuICBkZWZhdWx0OiAodmFsdWU6IGFueSk6IGFueSA9PiB2YWx1ZSxcbn07XG5cbi8qKlxuICogRm9ybWF0IHRoZSBwbHVnaW4gc2V0dGluZyB2YWx1ZSByZWNlaXZlZCBpbiB0aGUgYmFja2VuZCB0byBzdG9yZSBpbiB0aGUgcGx1Z2luIGNvbmZpZ3VyYXRpb24gZmlsZSAoLnltbCkuXG4gKiBAcGFyYW0gdmFsdWUgcGx1Z2luIHNldHRpbmcgdmFsdWUgc2VudCB0byB0aGUgZW5kcG9pbnRcbiAqIEByZXR1cm5zIHZhbGlkIHZhbHVlIHRvIC55bWxcbiAqL1xuZnVuY3Rpb24gZm9ybWF0U2V0dGluZ1ZhbHVlVG9GaWxlKHZhbHVlOiBhbnkpIHtcbiAgY29uc3QgZm9ybWF0dGVyID1cbiAgICBmb3JtYXRTZXR0aW5nVmFsdWVUb0ZpbGVUeXBlW3R5cGVvZiB2YWx1ZV0gfHxcbiAgICBmb3JtYXRTZXR0aW5nVmFsdWVUb0ZpbGVUeXBlLmRlZmF1bHQ7XG4gIHJldHVybiBmb3JtYXR0ZXIodmFsdWUpO1xufVxuXG4vKipcbiAqIFByaW50IHRoZSBzZXR0aW5nIHZhbHVlXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEByZXR1cm5zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmludFNldHRpbmdWYWx1ZSh2YWx1ZTogdW5rbm93bik6IGFueSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnICYmIHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBgJydgO1xuICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufVxuXG4vKipcbiAqIFByaW50IHNldHRpbmcgb24gdGhlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBmaWxlXG4gKiBAcGFyYW0gc2V0dGluZ1xuICogQHJldHVybnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHByaW50U2V0dGluZyhzZXR0aW5nOiBUUGx1Z2luU2V0dGluZ1dpdGhLZXkpOiBzdHJpbmcge1xuICAvKlxuICAjIHtzZXR0aW5nIGRlc2NyaXB0aW9ufVxuICAjID97e3NldHRpbmdEZWZhdWx0QmxvY2t9IHx8IHt7c2V0dGluZ0tleX06IHtzZXR0aW5nRGVmYXVsdFZhbHVlfX19XG4gICovXG4gIHJldHVybiBbXG4gICAgc3BsaXREZXNjcmlwdGlvbihzZXR0aW5nLmRlc2NyaXB0aW9uKSxcbiAgICBzZXR0aW5nPy5zdG9yZT8uZmlsZT8uZGVmYXVsdEJsb2NrIHx8XG4gICAgICBgIyAke3NldHRpbmcua2V5fTogJHtwcmludFNldHRpbmdWYWx1ZShzZXR0aW5nLmRlZmF1bHRWYWx1ZSl9YCxcbiAgXS5qb2luKCdcXG4nKTtcbn1cblxuLyoqXG4gKiBQcmludCBjYXRlZ29yeSBoZWFkZXIgb24gdGhlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBmaWxlXG4gKiBAcGFyYW0gcGFyYW0wXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgZnVuY3Rpb24gcHJpbnRTZXR0aW5nQ2F0ZWdvcnkoeyB0aXRsZSwgZGVzY3JpcHRpb24gfSkge1xuICAvKlxuICAjLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSB7Y2F0ZWdvcnkgdGl0bGV9IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgIyB7Y2F0ZWdvcnkgZGVzY3JpcHRpb259XG4gICNcbiAgKi9cbiAgcmV0dXJuIFtcbiAgICBwcmludFNlY3Rpb24odGl0bGUsIHsgcHJlZml4OiAnIyAnLCBmaWxsOiAnLScgfSksXG4gICAgLi4uKGRlc2NyaXB0aW9uID8gW3NwbGl0RGVzY3JpcHRpb24oZGVzY3JpcHRpb24pXSA6IFsnJ10pLFxuICBdLmpvaW4oJ1xcbiNcXG4nKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHByaW50U2VjdGlvbihcbiAgdGV4dDogc3RyaW5nLFxuICBvcHRpb25zPzoge1xuICAgIG1heExlbmd0aD86IG51bWJlcjtcbiAgICBwcmVmaXg/OiBzdHJpbmc7XG4gICAgc3VmZml4Pzogc3RyaW5nO1xuICAgIHNwYWNlQXJvdW5kPzogbnVtYmVyO1xuICAgIGZpbGw/OiBzdHJpbmc7XG4gIH0sXG4pIHtcbiAgY29uc3QgbWF4TGVuZ3RoID0gb3B0aW9ucz8ubWF4TGVuZ3RoID8/IDgwO1xuICBjb25zdCBwcmVmaXggPSBvcHRpb25zPy5wcmVmaXggPz8gJyc7XG4gIGNvbnN0IHN1Zml4ID0gb3B0aW9ucz8uc3VmZml4ID8/ICcnO1xuICBjb25zdCBzcGFjZUFyb3VuZCA9IG9wdGlvbnM/LnNwYWNlQXJvdW5kID8/IDE7XG4gIGNvbnN0IGZpbGwgPSBvcHRpb25zPy5maWxsID8/ICcgJztcbiAgY29uc3QgZmlsbExlbmd0aCA9XG4gICAgbWF4TGVuZ3RoIC0gcHJlZml4Lmxlbmd0aCAtIHN1Zml4Lmxlbmd0aCAtIDIgKiBzcGFjZUFyb3VuZCAtIHRleHQubGVuZ3RoO1xuXG4gIHJldHVybiBbXG4gICAgcHJlZml4LFxuICAgIGZpbGwucmVwZWF0KE1hdGguZmxvb3IoZmlsbExlbmd0aCAvIDIpKSxcbiAgICBgICR7dGV4dH0gYCxcbiAgICBmaWxsLnJlcGVhdChNYXRoLmNlaWwoZmlsbExlbmd0aCAvIDIpKSxcbiAgICBzdWZpeCxcbiAgXS5qb2luKCcnKTtcbn1cblxuLyoqXG4gKiBHaXZlbiBhIHN0cmluZywgdGhpcyBmdW5jdGlvbiBidWlsZHMgYSBtdWx0aW5lIHN0cmluZywgZWFjaCBsaW5lIGFib3V0IDcwXG4gKiBjaGFyYWN0ZXJzIGxvbmcsIHNwbGl0dGVkIGF0IHRoZSBjbG9zZXN0IHdoaXRlc3BhY2UgY2hhcmFjdGVyIHRvIHRoYXQgbGVudGdoLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gaXMgdXNlZCB0byB0cmFuc2Zvcm0gdGhlIHNldHRpbmdzIGRlc2NyaXB0aW9uXG4gKiBpbnRvIGEgbXVsdGlsaW5lIHN0cmluZyB0byBiZSB1c2VkIGFzIHRoZSBzZXR0aW5nIGRvY3VtZW50YXRpb24uXG4gKlxuICogVGhlICMgY2hhcmFjdGVyIGlzIGFsc28gYXBwZW5kZWQgdG8gdGhlIGJlZ2lubmluZyBvZiBlYWNoIGxpbmUuXG4gKlxuICogQHBhcmFtIHRleHRcbiAqIEByZXR1cm5zIG11bHRpbmUgc3RyaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzcGxpdERlc2NyaXB0aW9uKHRleHQ6IHN0cmluZyA9ICcnKTogc3RyaW5nIHtcbiAgY29uc3QgbGluZXMgPSB0ZXh0Lm1hdGNoKC8uezEsODB9KD89XFxzfCQpL2cpIHx8IFtdO1xuICByZXR1cm4gbGluZXMubWFwKHogPT4gJyMgJyArIHoudHJpbSgpKS5qb2luKCdcXG4nKTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFLQSxJQUFBQSxNQUFBLEdBQUFDLE9BQUE7QUFDQSxJQUFBQyxHQUFBLEdBQUFDLHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBRyxPQUFBLEdBQUFELHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBSSxXQUFBLEdBQUFKLE9BQUE7QUFDQSxJQUFBSyxrQkFBQSxHQUFBTCxPQUFBO0FBRUEsSUFBQU0sS0FBQSxHQUFBSixzQkFBQSxDQUFBRixPQUFBO0FBQXdCLFNBQUFFLHVCQUFBSyxHQUFBLFdBQUFBLEdBQUEsSUFBQUEsR0FBQSxDQUFBQyxVQUFBLEdBQUFELEdBQUEsS0FBQUUsT0FBQSxFQUFBRixHQUFBO0FBQUEsU0FBQUcsZ0JBQUFILEdBQUEsRUFBQUksR0FBQSxFQUFBQyxLQUFBLElBQUFELEdBQUEsR0FBQUUsY0FBQSxDQUFBRixHQUFBLE9BQUFBLEdBQUEsSUFBQUosR0FBQSxJQUFBTyxNQUFBLENBQUFDLGNBQUEsQ0FBQVIsR0FBQSxFQUFBSSxHQUFBLElBQUFDLEtBQUEsRUFBQUEsS0FBQSxFQUFBSSxVQUFBLFFBQUFDLFlBQUEsUUFBQUMsUUFBQSxvQkFBQVgsR0FBQSxDQUFBSSxHQUFBLElBQUFDLEtBQUEsV0FBQUwsR0FBQTtBQUFBLFNBQUFNLGVBQUFNLEdBQUEsUUFBQVIsR0FBQSxHQUFBUyxZQUFBLENBQUFELEdBQUEsMkJBQUFSLEdBQUEsZ0JBQUFBLEdBQUEsR0FBQVUsTUFBQSxDQUFBVixHQUFBO0FBQUEsU0FBQVMsYUFBQUUsS0FBQSxFQUFBQyxJQUFBLGVBQUFELEtBQUEsaUJBQUFBLEtBQUEsa0JBQUFBLEtB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