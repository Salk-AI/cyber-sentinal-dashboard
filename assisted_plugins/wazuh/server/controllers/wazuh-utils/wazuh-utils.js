"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WazuhUtilsCtrl = void 0;
var _errorResponse = require("../../lib/error-response");
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
var _filesystem = require("../../lib/filesystem");
var _glob = _interopRequireDefault(require("glob"));
var _fileExtension = require("../../../common/services/file-extension");
var _decorators = require("../decorators");
var _sanitizer = require("../../lib/sanitizer");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /*
 * Wazuh app - Class for Wazuh-API functions
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */ // Require some libraries
// TODO: these controllers have no logs. We should include them.
class WazuhUtilsCtrl {
  /**
   * Constructor
   * @param {*} server
   */
  constructor() {
    /**
     * Update the configuration
     * @param {Object} context
     * @param {Object} request
     * @param {Object} response
     * @returns {Object}
     */
    _defineProperty(this, "updateConfiguration", (0, _decorators.compose)((0, _decorators.routeDecoratorConfigurationAPIEditable)(3021), (0, _decorators.routeDecoratorProtectedAdministrator)(3021))(async (context, request, response) => {
      context.wazuh.logger.debug(`Updating configuration: ${JSON.stringify(request.body)}`);
      const updatedSettings = {
        ...request.body
      };
      context.wazuh.logger.debug(`Updating configuration with ${JSON.stringify(updatedSettings)}`);
      const {
        requirements,
        update: updatedConfiguration
      } = await context.wazuh_core.configuration.set(updatedSettings);
      context.wazuh.logger.debug('Configuration updated');
      return response.ok({
        body: {
          data: {
            ...requirements,
            updatedConfiguration: updatedConfiguration
          }
        }
      });
    }));
    /**
     * Upload a file
     * @param {Object} context
     * @param {Object} request
     * @param {Object} response
     * @returns {Object} Configuration File or ErrorResponse
     */
    _defineProperty(this, "uploadFile", (0, _decorators.compose)((0, _decorators.routeDecoratorConfigurationAPIEditable)(3022), (0, _decorators.routeDecoratorProtectedAdministrator)(3022))(async (context, request, response) => {
      const {
        key
      } = request.params;
      let {
        file: bufferFile
      } = request.body;
      const pluginSetting = context.wazuh_core.configuration._settings.get(key);

      // Check file extension
      const fileExtension = (0, _fileExtension.getFileExtensionFromBuffer)(bufferFile);

      // Check if the extension is valid for the setting.
      if (!pluginSetting.options.file.extensions.includes(`.${fileExtension}`)) {
        return response.badRequest({
          body: `File extension is not valid for setting [${key}] setting. Allowed file extensions: ${pluginSetting.options.file.extensions.join(', ')}`
        });
      }

      // Sanitize SVG content to prevent prevents XSS attacks
      if (fileExtension === 'svg') {
        const svgString = bufferFile.toString();
        const cleanSVG = (0, _sanitizer.sanitizeSVG)(svgString);
        bufferFile = Buffer.from(cleanSVG);
      }
      const fileNamePath = `${key}.${fileExtension}`;

      // Create target directory
      const targetDirectory = _path.default.join(__dirname, '../../..', pluginSetting.options.file.store.relativePathFileSystem);
      context.wazuh.logger.debug(`Directory: ${targetDirectory}`);
      (0, _filesystem.createDirectoryIfNotExists)(targetDirectory);
      // Get the files related to the setting and remove them
      const files = _glob.default.sync(_path.default.join(targetDirectory, `${key}.*`));
      context.wazuh.logger.debug(`Removing previous files: ${files.join(', ')}`);
      files.forEach(_fs.default.unlinkSync);

      // Store the file in the target directory.
      const storeFilePath = _path.default.join(targetDirectory, fileNamePath);
      context.wazuh.logger.debug(`Storing file on : ${files.join(', ')}`);
      _fs.default.writeFileSync(storeFilePath, bufferFile);

      // Update the setting in the configuration cache
      const pluginSettingValue = pluginSetting.options.file.store.resolveStaticURL(fileNamePath);
      const updatedConfiguration = {
        [key]: pluginSettingValue
      };
      const {
        requirements,
        update
      } = await context.wazuh_core.configuration.set(updatedConfiguration);
      return response.ok({
        body: {
          data: {
            ...requirements,
            updatedConfiguration: update
          }
        }
      });
    }));
    /**
     * Delete a file
     * @param {Object} context
     * @param {Object} request
     * @param {Object} response
     * @returns {Object} Configuration File or ErrorResponse
     */
    _defineProperty(this, "deleteFile", (0, _decorators.compose)((0, _decorators.routeDecoratorConfigurationAPIEditable)(3023), (0, _decorators.routeDecoratorProtectedAdministrator)(3023))(async (context, request, response) => {
      const {
        key
      } = request.params;
      const pluginSetting = context.wazuh_core.configuration._settings.get(key);

      // Get the files related to the setting and remove them
      const targetDirectory = _path.default.join(__dirname, '../../..', pluginSetting.options.file.store.relativePathFileSystem);
      context.wazuh.logger.debug(`Directory: ${targetDirectory}`);
      const files = _glob.default.sync(_path.default.join(targetDirectory, `${key}.*`));
      context.wazuh.logger.debug(`Removing previous files: ${files.join(', ')}`);
      files.forEach(_fs.default.unlinkSync);

      // Update the setting in the configuration cache
      const {
        requirements,
        update
      } = await context.wazuh_core.configuration.clear(key);
      return response.ok({
        body: {
          message: 'All files were removed and the configuration file was updated.',
          data: {
            ...requirements,
            updatedConfiguration: update
          }
        }
      });
    }));
  }

  /**
   * Get the configuration excluding the API hosts configuration
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object}
   */
  async getConfiguration(context, request, response) {
    try {
      context.wazuh.logger.debug('Getting configuration');
      const configuration = await context.wazuh_core.configuration.get();
      // Exclude the API host configuration
      const {
        hosts,
        ...rest
      } = configuration;
      context.wazuh.logger.debug(`Configuration: ${JSON.stringify(configuration)}`);
      return response.ok({
        body: {
          statusCode: 200,
          error: 0,
          data: rest
        }
      });
    } catch (error) {
      return (0, _errorResponse.ErrorResponse)(error.message || error, 3019, 500, response);
    }
  }
}
exports.WazuhUtilsCtrl = WazuhUtilsCtrl;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXJyb3JSZXNwb25zZSIsInJlcXVpcmUiLCJfZnMiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0IiwiX3BhdGgiLCJfZmlsZXN5c3RlbSIsIl9nbG9iIiwiX2ZpbGVFeHRlbnNpb24iLCJfZGVjb3JhdG9ycyIsIl9zYW5pdGl6ZXIiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsIl9kZWZpbmVQcm9wZXJ0eSIsImtleSIsInZhbHVlIiwiX3RvUHJvcGVydHlLZXkiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImFyZyIsIl90b1ByaW1pdGl2ZSIsIlN0cmluZyIsImlucHV0IiwiaGludCIsInByaW0iLCJTeW1ib2wiLCJ0b1ByaW1pdGl2ZSIsInVuZGVmaW5lZCIsInJlcyIsImNhbGwiLCJUeXBlRXJyb3IiLCJOdW1iZXIiLCJXYXp1aFV0aWxzQ3RybCIsImNvbnN0cnVjdG9yIiwiY29tcG9zZSIsInJvdXRlRGVjb3JhdG9yQ29uZmlndXJhdGlvbkFQSUVkaXRhYmxlIiwicm91dGVEZWNvcmF0b3JQcm90ZWN0ZWRBZG1pbmlzdHJhdG9yIiwiY29udGV4dCIsInJlcXVlc3QiLCJyZXNwb25zZSIsIndhenVoIiwibG9nZ2VyIiwiZGVidWciLCJKU09OIiwic3RyaW5naWZ5IiwiYm9keSIsInVwZGF0ZWRTZXR0aW5ncyIsInJlcXVpcmVtZW50cyIsInVwZGF0ZSIsInVwZGF0ZWRDb25maWd1cmF0aW9uIiwid2F6dWhfY29yZSIsImNvbmZpZ3VyYXRpb24iLCJzZXQiLCJvayIsImRhdGEiLCJwYXJhbXMiLCJmaWxlIiwiYnVmZmVyRmlsZSIsInBsdWdpblNldHRpbmciLCJfc2V0dGluZ3MiLCJnZXQiLCJmaWxlRXh0ZW5zaW9uIiwiZ2V0RmlsZUV4dGVuc2lvbkZyb21CdWZmZXIiLCJvcHRpb25zIiwiZXh0ZW5zaW9ucyIsImluY2x1ZGVzIiwiYmFkUmVxdWVzdCIsImpvaW4iLCJzdmdTdHJpbmciLCJ0b1N0cmluZyIsImNsZWFuU1ZHIiwic2FuaXRpemVTVkciLCJCdWZmZXIiLCJmcm9tIiwiZmlsZU5hbWVQYXRoIiwidGFyZ2V0RGlyZWN0b3J5IiwicGF0aCIsIl9fZGlybmFtZSIsInN0b3JlIiwicmVsYXRpdmVQYXRoRmlsZVN5c3RlbSIsImNyZWF0ZURpcmVjdG9yeUlmTm90RXhpc3RzIiwiZmlsZXMiLCJnbG9iIiwic3luYyIsImZvckVhY2giLCJmcyIsInVubGlua1N5bmMiLCJzdG9yZUZpbGVQYXRoIiwid3JpdGVGaWxlU3luYyIsInBsdWdpblNldHRpbmdWYWx1ZSIsInJlc29sdmVTdGF0aWNVUkwiLCJjbGVhciIsIm1lc3NhZ2UiLCJnZXRDb25maWd1cmF0aW9uIiwiaG9zdHMiLCJyZXN0Iiwic3RhdHVzQ29kZSIsImVycm9yIiwiRXJyb3JSZXNwb25zZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyJ3YXp1aC11dGlscy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogV2F6dWggYXBwIC0gQ2xhc3MgZm9yIFdhenVoLUFQSSBmdW5jdGlvbnNcbiAqIENvcHlyaWdodCAoQykgMjAxNS0yMDIyIFdhenVoLCBJbmMuXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU7IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uOyBlaXRoZXIgdmVyc2lvbiAyIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBGaW5kIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhpcyBvbiB0aGUgTElDRU5TRSBmaWxlLlxuICovXG5cbi8vIFJlcXVpcmUgc29tZSBsaWJyYXJpZXNcbmltcG9ydCB7IEVycm9yUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9saWIvZXJyb3ItcmVzcG9uc2UnO1xuaW1wb3J0IHtcbiAgT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gIE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxufSBmcm9tICdzcmMvY29yZS9zZXJ2ZXInO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgY3JlYXRlRGlyZWN0b3J5SWZOb3RFeGlzdHMgfSBmcm9tICcuLi8uLi9saWIvZmlsZXN5c3RlbSc7XG5pbXBvcnQgZ2xvYiBmcm9tICdnbG9iJztcbmltcG9ydCB7IGdldEZpbGVFeHRlbnNpb25Gcm9tQnVmZmVyIH0gZnJvbSAnLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL2ZpbGUtZXh0ZW5zaW9uJztcbmltcG9ydCB7XG4gIGNvbXBvc2UsXG4gIHJvdXRlRGVjb3JhdG9yQ29uZmlndXJhdGlvbkFQSUVkaXRhYmxlLFxuICByb3V0ZURlY29yYXRvclByb3RlY3RlZEFkbWluaXN0cmF0b3IsXG59IGZyb20gJy4uL2RlY29yYXRvcnMnO1xuaW1wb3J0IHsgc2FuaXRpemVTVkcgfSBmcm9tICcuLi8uLi9saWIvc2FuaXRpemVyJztcblxuLy8gVE9ETzogdGhlc2UgY29udHJvbGxlcnMgaGF2ZSBubyBsb2dzLiBXZSBzaG91bGQgaW5jbHVkZSB0aGVtLlxuZXhwb3J0IGNsYXNzIFdhenVoVXRpbHNDdHJsIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7Kn0gc2VydmVyXG4gICAqL1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY29uZmlndXJhdGlvbiBleGNsdWRpbmcgdGhlIEFQSSBob3N0cyBjb25maWd1cmF0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgKi9cbiAgYXN5bmMgZ2V0Q29uZmlndXJhdGlvbihcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKCdHZXR0aW5nIGNvbmZpZ3VyYXRpb24nKTtcbiAgICAgIGNvbnN0IGNvbmZpZ3VyYXRpb24gPSBhd2FpdCBjb250ZXh0LndhenVoX2NvcmUuY29uZmlndXJhdGlvbi5nZXQoKTtcbiAgICAgIC8vIEV4Y2x1ZGUgdGhlIEFQSSBob3N0IGNvbmZpZ3VyYXRpb25cbiAgICAgIGNvbnN0IHsgaG9zdHMsIC4uLnJlc3QgfSA9IGNvbmZpZ3VyYXRpb247XG4gICAgICBjb250ZXh0LndhenVoLmxvZ2dlci5kZWJ1ZyhcbiAgICAgICAgYENvbmZpZ3VyYXRpb246ICR7SlNPTi5zdHJpbmdpZnkoY29uZmlndXJhdGlvbil9YCxcbiAgICAgICk7XG4gICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgIGVycm9yOiAwLFxuICAgICAgICAgIGRhdGE6IHJlc3QsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoZXJyb3IubWVzc2FnZSB8fCBlcnJvciwgMzAxOSwgNTAwLCByZXNwb25zZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgY29uZmlndXJhdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVxdWVzdFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2VcbiAgICogQHJldHVybnMge09iamVjdH1cbiAgICovXG4gIHVwZGF0ZUNvbmZpZ3VyYXRpb24gPSBjb21wb3NlKFxuICAgIHJvdXRlRGVjb3JhdG9yQ29uZmlndXJhdGlvbkFQSUVkaXRhYmxlKDMwMjEpLFxuICAgIHJvdXRlRGVjb3JhdG9yUHJvdGVjdGVkQWRtaW5pc3RyYXRvcigzMDIxKSxcbiAgKShcbiAgICBhc3luYyAoXG4gICAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gICAgKSA9PiB7XG4gICAgICBjb250ZXh0LndhenVoLmxvZ2dlci5kZWJ1ZyhcbiAgICAgICAgYFVwZGF0aW5nIGNvbmZpZ3VyYXRpb246ICR7SlNPTi5zdHJpbmdpZnkocmVxdWVzdC5ib2R5KX1gLFxuICAgICAgKTtcblxuICAgICAgY29uc3QgdXBkYXRlZFNldHRpbmdzID0ge1xuICAgICAgICAuLi5yZXF1ZXN0LmJvZHksXG4gICAgICB9O1xuICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZGVidWcoXG4gICAgICAgIGBVcGRhdGluZyBjb25maWd1cmF0aW9uIHdpdGggJHtKU09OLnN0cmluZ2lmeSh1cGRhdGVkU2V0dGluZ3MpfWAsXG4gICAgICApO1xuICAgICAgY29uc3QgeyByZXF1aXJlbWVudHMsIHVwZGF0ZTogdXBkYXRlZENvbmZpZ3VyYXRpb24gfSA9XG4gICAgICAgIGF3YWl0IGNvbnRleHQud2F6dWhfY29yZS5jb25maWd1cmF0aW9uLnNldCh1cGRhdGVkU2V0dGluZ3MpO1xuICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZGVidWcoJ0NvbmZpZ3VyYXRpb24gdXBkYXRlZCcpO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgLi4ucmVxdWlyZW1lbnRzLFxuICAgICAgICAgICAgdXBkYXRlZENvbmZpZ3VyYXRpb246IHVwZGF0ZWRDb25maWd1cmF0aW9uLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICApO1xuXG4gIC8qKlxuICAgKiBVcGxvYWQgYSBmaWxlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBDb25maWd1cmF0aW9uIEZpbGUgb3IgRXJyb3JSZXNwb25zZVxuICAgKi9cbiAgdXBsb2FkRmlsZSA9IGNvbXBvc2UoXG4gICAgcm91dGVEZWNvcmF0b3JDb25maWd1cmF0aW9uQVBJRWRpdGFibGUoMzAyMiksXG4gICAgcm91dGVEZWNvcmF0b3JQcm90ZWN0ZWRBZG1pbmlzdHJhdG9yKDMwMjIpLFxuICApKFxuICAgIGFzeW5jIChcbiAgICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICAgIHJlcXVlc3Q6IEtpYmFuYVJlcXVlc3QsXG4gICAgICByZXNwb25zZTogS2liYW5hUmVzcG9uc2VGYWN0b3J5LFxuICAgICkgPT4ge1xuICAgICAgY29uc3QgeyBrZXkgfSA9IHJlcXVlc3QucGFyYW1zO1xuICAgICAgbGV0IHsgZmlsZTogYnVmZmVyRmlsZSB9ID0gcmVxdWVzdC5ib2R5O1xuXG4gICAgICBjb25zdCBwbHVnaW5TZXR0aW5nID0gY29udGV4dC53YXp1aF9jb3JlLmNvbmZpZ3VyYXRpb24uX3NldHRpbmdzLmdldChrZXkpO1xuXG4gICAgICAvLyBDaGVjayBmaWxlIGV4dGVuc2lvblxuICAgICAgY29uc3QgZmlsZUV4dGVuc2lvbiA9IGdldEZpbGVFeHRlbnNpb25Gcm9tQnVmZmVyKGJ1ZmZlckZpbGUpO1xuXG4gICAgICAvLyBDaGVjayBpZiB0aGUgZXh0ZW5zaW9uIGlzIHZhbGlkIGZvciB0aGUgc2V0dGluZy5cbiAgICAgIGlmIChcbiAgICAgICAgIXBsdWdpblNldHRpbmcub3B0aW9ucy5maWxlLmV4dGVuc2lvbnMuaW5jbHVkZXMoYC4ke2ZpbGVFeHRlbnNpb259YClcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuYmFkUmVxdWVzdCh7XG4gICAgICAgICAgYm9keTogYEZpbGUgZXh0ZW5zaW9uIGlzIG5vdCB2YWxpZCBmb3Igc2V0dGluZyBbJHtrZXl9XSBzZXR0aW5nLiBBbGxvd2VkIGZpbGUgZXh0ZW5zaW9uczogJHtwbHVnaW5TZXR0aW5nLm9wdGlvbnMuZmlsZS5leHRlbnNpb25zLmpvaW4oXG4gICAgICAgICAgICAnLCAnLFxuICAgICAgICAgICl9YCxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNhbml0aXplIFNWRyBjb250ZW50IHRvIHByZXZlbnQgcHJldmVudHMgWFNTIGF0dGFja3NcbiAgICAgIGlmIChmaWxlRXh0ZW5zaW9uID09PSAnc3ZnJykge1xuICAgICAgICBjb25zdCBzdmdTdHJpbmcgPSBidWZmZXJGaWxlLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IGNsZWFuU1ZHID0gc2FuaXRpemVTVkcoc3ZnU3RyaW5nKTtcbiAgICAgICAgYnVmZmVyRmlsZSA9IEJ1ZmZlci5mcm9tKGNsZWFuU1ZHKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZmlsZU5hbWVQYXRoID0gYCR7a2V5fS4ke2ZpbGVFeHRlbnNpb259YDtcblxuICAgICAgLy8gQ3JlYXRlIHRhcmdldCBkaXJlY3RvcnlcbiAgICAgIGNvbnN0IHRhcmdldERpcmVjdG9yeSA9IHBhdGguam9pbihcbiAgICAgICAgX19kaXJuYW1lLFxuICAgICAgICAnLi4vLi4vLi4nLFxuICAgICAgICBwbHVnaW5TZXR0aW5nLm9wdGlvbnMuZmlsZS5zdG9yZS5yZWxhdGl2ZVBhdGhGaWxlU3lzdGVtLFxuICAgICAgKTtcbiAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKGBEaXJlY3Rvcnk6ICR7dGFyZ2V0RGlyZWN0b3J5fWApO1xuICAgICAgY3JlYXRlRGlyZWN0b3J5SWZOb3RFeGlzdHModGFyZ2V0RGlyZWN0b3J5KTtcbiAgICAgIC8vIEdldCB0aGUgZmlsZXMgcmVsYXRlZCB0byB0aGUgc2V0dGluZyBhbmQgcmVtb3ZlIHRoZW1cbiAgICAgIGNvbnN0IGZpbGVzID0gZ2xvYi5zeW5jKHBhdGguam9pbih0YXJnZXREaXJlY3RvcnksIGAke2tleX0uKmApKTtcbiAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKFxuICAgICAgICBgUmVtb3ZpbmcgcHJldmlvdXMgZmlsZXM6ICR7ZmlsZXMuam9pbignLCAnKX1gLFxuICAgICAgKTtcbiAgICAgIGZpbGVzLmZvckVhY2goZnMudW5saW5rU3luYyk7XG5cbiAgICAgIC8vIFN0b3JlIHRoZSBmaWxlIGluIHRoZSB0YXJnZXQgZGlyZWN0b3J5LlxuICAgICAgY29uc3Qgc3RvcmVGaWxlUGF0aCA9IHBhdGguam9pbih0YXJnZXREaXJlY3RvcnksIGZpbGVOYW1lUGF0aCk7XG4gICAgICBjb250ZXh0LndhenVoLmxvZ2dlci5kZWJ1ZyhgU3RvcmluZyBmaWxlIG9uIDogJHtmaWxlcy5qb2luKCcsICcpfWApO1xuICAgICAgZnMud3JpdGVGaWxlU3luYyhzdG9yZUZpbGVQYXRoLCBidWZmZXJGaWxlKTtcblxuICAgICAgLy8gVXBkYXRlIHRoZSBzZXR0aW5nIGluIHRoZSBjb25maWd1cmF0aW9uIGNhY2hlXG4gICAgICBjb25zdCBwbHVnaW5TZXR0aW5nVmFsdWUgPVxuICAgICAgICBwbHVnaW5TZXR0aW5nLm9wdGlvbnMuZmlsZS5zdG9yZS5yZXNvbHZlU3RhdGljVVJMKGZpbGVOYW1lUGF0aCk7XG4gICAgICBjb25zdCB1cGRhdGVkQ29uZmlndXJhdGlvbiA9IHtcbiAgICAgICAgW2tleV06IHBsdWdpblNldHRpbmdWYWx1ZSxcbiAgICAgIH07XG4gICAgICBjb25zdCB7IHJlcXVpcmVtZW50cywgdXBkYXRlIH0gPVxuICAgICAgICBhd2FpdCBjb250ZXh0LndhenVoX2NvcmUuY29uZmlndXJhdGlvbi5zZXQodXBkYXRlZENvbmZpZ3VyYXRpb24pO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgLi4ucmVxdWlyZW1lbnRzLFxuICAgICAgICAgICAgdXBkYXRlZENvbmZpZ3VyYXRpb246IHVwZGF0ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSxcbiAgKTtcblxuICAvKipcbiAgICogRGVsZXRlIGEgZmlsZVxuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVxdWVzdFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2VcbiAgICogQHJldHVybnMge09iamVjdH0gQ29uZmlndXJhdGlvbiBGaWxlIG9yIEVycm9yUmVzcG9uc2VcbiAgICovXG4gIGRlbGV0ZUZpbGUgPSBjb21wb3NlKFxuICAgIHJvdXRlRGVjb3JhdG9yQ29uZmlndXJhdGlvbkFQSUVkaXRhYmxlKDMwMjMpLFxuICAgIHJvdXRlRGVjb3JhdG9yUHJvdGVjdGVkQWRtaW5pc3RyYXRvcigzMDIzKSxcbiAgKShcbiAgICBhc3luYyAoXG4gICAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgICByZXF1ZXN0OiBLaWJhbmFSZXF1ZXN0LFxuICAgICAgcmVzcG9uc2U6IEtpYmFuYVJlc3BvbnNlRmFjdG9yeSxcbiAgICApID0+IHtcbiAgICAgIGNvbnN0IHsga2V5IH0gPSByZXF1ZXN0LnBhcmFtcztcbiAgICAgIGNvbnN0IHBsdWdpblNldHRpbmcgPSBjb250ZXh0LndhenVoX2NvcmUuY29uZmlndXJhdGlvbi5fc2V0dGluZ3MuZ2V0KGtleSk7XG5cbiAgICAgIC8vIEdldCB0aGUgZmlsZXMgcmVsYXRlZCB0byB0aGUgc2V0dGluZyBhbmQgcmVtb3ZlIHRoZW1cbiAgICAgIGNvbnN0IHRhcmdldERpcmVjdG9yeSA9IHBhdGguam9pbihcbiAgICAgICAgX19kaXJuYW1lLFxuICAgICAgICAnLi4vLi4vLi4nLFxuICAgICAgICBwbHVnaW5TZXR0aW5nLm9wdGlvbnMuZmlsZS5zdG9yZS5yZWxhdGl2ZVBhdGhGaWxlU3lzdGVtLFxuICAgICAgKTtcbiAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKGBEaXJlY3Rvcnk6ICR7dGFyZ2V0RGlyZWN0b3J5fWApO1xuICAgICAgY29uc3QgZmlsZXMgPSBnbG9iLnN5bmMocGF0aC5qb2luKHRhcmdldERpcmVjdG9yeSwgYCR7a2V5fS4qYCkpO1xuICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZGVidWcoXG4gICAgICAgIGBSZW1vdmluZyBwcmV2aW91cyBmaWxlczogJHtmaWxlcy5qb2luKCcsICcpfWAsXG4gICAgICApO1xuICAgICAgZmlsZXMuZm9yRWFjaChmcy51bmxpbmtTeW5jKTtcblxuICAgICAgLy8gVXBkYXRlIHRoZSBzZXR0aW5nIGluIHRoZSBjb25maWd1cmF0aW9uIGNhY2hlXG4gICAgICBjb25zdCB7IHJlcXVpcmVtZW50cywgdXBkYXRlIH0gPVxuICAgICAgICBhd2FpdCBjb250ZXh0LndhenVoX2NvcmUuY29uZmlndXJhdGlvbi5jbGVhcihrZXkpO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICAgICdBbGwgZmlsZXMgd2VyZSByZW1vdmVkIGFuZCB0aGUgY29uZmlndXJhdGlvbiBmaWxlIHdhcyB1cGRhdGVkLicsXG4gICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgLi4ucmVxdWlyZW1lbnRzLFxuICAgICAgICAgICAgdXBkYXRlZENvbmZpZ3VyYXRpb246IHVwZGF0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