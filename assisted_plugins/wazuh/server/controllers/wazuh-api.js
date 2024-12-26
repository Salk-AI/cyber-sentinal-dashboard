"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WazuhApiCtrl = void 0;
var _errorResponse = require("../lib/error-response");
var _json2csv = require("json2csv");
var _csvKeyEquivalence = require("../../common/csv-key-equivalence");
var _apiErrorsEquivalence = require("../lib/api-errors-equivalence");
var _endpoints = _interopRequireDefault(require("../../common/api-info/endpoints"));
var _constants = require("../../common/constants");
var _queue = require("../start/queue");
var _jwtDecode = _interopRequireDefault(require("jwt-decode"));
var _cookie = require("../lib/cookie");
var _package = require("../../package.json");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * Wazuh app - Class for Wazuh-API functions
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

// Require some libraries

class WazuhApiCtrl {
  constructor() {}
  async getToken(context, request, response) {
    try {
      const {
        force,
        idHost
      } = request.body;
      const {
        username
      } = await context.wazuh.security.getCurrentUser(request, context);
      if (!force && request.headers.cookie && username === decodeURIComponent((0, _cookie.getCookieValueByName)(request.headers.cookie, 'wz-user')) && idHost === (0, _cookie.getCookieValueByName)(request.headers.cookie, 'wz-api')) {
        const wzToken = (0, _cookie.getCookieValueByName)(request.headers.cookie, 'wz-token');
        if (wzToken) {
          try {
            // if the current token is not a valid jwt token we ask for a new one
            const decodedToken = (0, _jwtDecode.default)(wzToken);
            const expirationTime = decodedToken.exp - Date.now() / 1000;
            if (wzToken && expirationTime > 0) {
              return response.ok({
                body: {
                  token: wzToken
                }
              });
            }
          } catch (error) {
            context.wazuh.logger.error(`Error decoding the API host entry token: ${error.message}`);
          }
        }
      }
      const token = await context.wazuh.api.client.asCurrentUser.authenticate(idHost);
      let textSecure = '';
      if (context.wazuh.server.info.protocol === 'https') {
        textSecure = ';Secure';
      }
      const encodedUser = encodeURIComponent(username);
      return response.ok({
        headers: {
          'set-cookie': [`wz-token=${token};Path=/;HttpOnly${textSecure}`, `wz-user=${encodedUser};Path=/;HttpOnly${textSecure}`, `wz-api=${idHost};Path=/;HttpOnly`]
        },
        body: {
          token
        }
      });
    } catch (error) {
      var _error$response;
      const errorMessage = `Error getting the authorization token: ${((error.response || {}).data || {}).detail || error.message || error}`;
      context.wazuh.logger.error(errorMessage);
      return (0, _errorResponse.ErrorResponse)(errorMessage, 3000, (error === null || error === void 0 || (_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.status) || _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
    }
  }

  /**
   * Returns if the wazuh-api configuration is working
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} status obj or ErrorResponse
   */
  async checkStoredAPI(context, request, response) {
    try {
      // Get config from configuration
      const id = request.body.id;
      context.wazuh.logger.debug(`Getting server API host by ID: ${id}`);
      const apiHostData = await context.wazuh_core.manageHosts.get(id, {
        excludePassword: true
      });
      const api = {
        ...apiHostData
      };
      context.wazuh.logger.debug(`Server API host data: ${JSON.stringify(api)}`);
      context.wazuh.logger.debug(`${id} exists`);

      // Fetch needed information about the cluster and the manager itself
      const responseManagerInfo = await context.wazuh.api.client.asInternalUser.request('get', `/manager/info`, {}, {
        apiHostID: id,
        forceRefresh: true
      });

      // Look for socket-related errors
      if (this.checkResponseIsDown(context, responseManagerInfo)) {
        return (0, _errorResponse.ErrorResponse)(`ERROR3099 - ${responseManagerInfo.data.detail || 'Server not ready yet'}`, 3099, _constants.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE, response);
      }

      // If we have a valid response from the Wazuh API
      try {
        const {
          status,
          manager,
          node,
          cluster
        } = await context.wazuh_core.manageHosts.getRegistryDataByHost(apiHostData, {
          throwError: true
        });
        api.cluster_info = {
          status,
          manager,
          node,
          cluster
        };
        return response.ok({
          body: {
            statusCode: _constants.HTTP_STATUS_CODES.OK,
            data: api,
            idChanged: request.body.idChanged || null
          }
        });
      } catch (error) {
        // If we have an invalid response from the Wazuh API
        throw new Error(responseManagerInfo.data.detail || `${api.url}:${api.port} is unreachable`);
      }
    } catch (error) {
      if (error.code === 'EPROTO') {
        return response.ok({
          body: {
            statusCode: _constants.HTTP_STATUS_CODES.OK,
            data: {
              apiIsDown: true
            }
          }
        });
      } else if (error.code === 'ECONNREFUSED') {
        return response.ok({
          body: {
            statusCode: _constants.HTTP_STATUS_CODES.OK,
            data: {
              apiIsDown: true
            }
          }
        });
      } else {
        var _error$response3;
        try {
          const apis = await context.wazuh_core.manageHosts.get();
          for (const api of apis) {
            try {
              const {
                id
              } = api;
              const responseManagerInfo = await context.wazuh.api.client.asInternalUser.request('GET', `/manager/info`, {}, {
                apiHostID: id
              });
              if (this.checkResponseIsDown(context, responseManagerInfo)) {
                return (0, _errorResponse.ErrorResponse)(`ERROR3099 - ${response.data.detail || 'Server not ready yet'}`, 3099, _constants.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE, response);
              }
              if (responseManagerInfo.status === _constants.HTTP_STATUS_CODES.OK) {
                request.body.id = id;
                request.body.idChanged = id;
                return await this.checkStoredAPI(context, request, response);
              }
            } catch (error) {} // eslint-disable-line
          }
        } catch (error) {
          var _error$response2;
          context.wazuh.logger.error(error.message || error);
          return (0, _errorResponse.ErrorResponse)(error.message || error, 3020, (error === null || error === void 0 || (_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.status) || _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
        }
        context.wazuh.logger.error(error.message || error);
        return (0, _errorResponse.ErrorResponse)(error.message || error, 3002, (error === null || error === void 0 || (_error$response3 = error.response) === null || _error$response3 === void 0 ? void 0 : _error$response3.status) || _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
      }
    }
  }

  /**
   * This perfoms a validation of API params
   * @param {Object} body API params
   */
  validateCheckApiParams(body) {
    if (!('username' in body)) {
      return 'Missing param: API USERNAME';
    }
    if (!('password' in body) && !('id' in body)) {
      return 'Missing param: API PASSWORD';
    }
    if (!('url' in body)) {
      return 'Missing param: API URL';
    }
    if (!('port' in body)) {
      return 'Missing param: API PORT';
    }
    if (!body.url.includes('https://') && !body.url.includes('http://')) {
      return 'protocol_error';
    }
    return false;
  }

  /**
   * This check the wazuh-api configuration received in the POST body will work
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} status obj or ErrorResponse
   */
  async checkAPI(context, request, response) {
    try {
      let apiAvailable = null;
      // const notValid = this.validateCheckApiParams(request.body);
      // if (notValid) return ErrorResponse(notValid, 3003, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
      context.wazuh.logger.debug(`${request.body.id} is valid`);
      // Check if a Wazuh API id is given (already stored API)
      const data = await context.wazuh_core.manageHosts.get(request.body.id, {
        excludePassword: true
      });
      if (data) {
        apiAvailable = data;
      } else {
        const errorMessage = `The server API host entry with ID ${request.body.id} was not found`;
        context.wazuh.logger.debug(errorMessage);
        return (0, _errorResponse.ErrorResponse)(errorMessage, 3029, _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
      }
      const options = {
        apiHostID: request.body.id
      };
      if (request.body.forceRefresh) {
        options['forceRefresh'] = request.body.forceRefresh;
      }
      let responseManagerInfo;
      try {
        responseManagerInfo = await context.wazuh.api.client.asInternalUser.request('GET', `/manager/info`, {}, options);
      } catch (error) {
        var _error$response4, _error$response5;
        return (0, _errorResponse.ErrorResponse)(`ERROR3099 - ${((_error$response4 = error.response) === null || _error$response4 === void 0 || (_error$response4 = _error$response4.data) === null || _error$response4 === void 0 ? void 0 : _error$response4.detail) || 'Server not ready yet'}`, 3099, (error === null || error === void 0 || (_error$response5 = error.response) === null || _error$response5 === void 0 ? void 0 : _error$response5.status) || _constants.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE, response);
      }
      context.wazuh.logger.debug(`${request.body.id} credentials are valid`);
      if (responseManagerInfo.status === _constants.HTTP_STATUS_CODES.OK && responseManagerInfo.data) {
        const result = await context.wazuh_core.manageHosts.getRegistryDataByHost(data);
        return response.ok({
          body: result
        });
      }
    } catch (error) {
      var _error$response6;
      context.wazuh.logger.warn(error.message || error);
      if (error && error.response && error.response.status === _constants.HTTP_STATUS_CODES.UNAUTHORIZED) {
        return (0, _errorResponse.ErrorResponse)(`Unathorized. Please check API credentials. ${error.response.data.message}`, _constants.HTTP_STATUS_CODES.UNAUTHORIZED, _constants.HTTP_STATUS_CODES.UNAUTHORIZED, response);
      }
      if (error && error.response && error.response.data && error.response.data.detail) {
        return (0, _errorResponse.ErrorResponse)(error.response.data.detail, error.response.status || _constants.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE, error.response.status || _constants.HTTP_STATUS_CODES.SERVICE_UNAVAILABLE, response);
      }
      if (error.code === 'EPROTO') {
        return (0, _errorResponse.ErrorResponse)('Wrong protocol being used to connect to the API', 3005, _constants.HTTP_STATUS_CODES.BAD_REQUEST, response);
      }
      return (0, _errorResponse.ErrorResponse)(error.message || error, 3005, (error === null || error === void 0 || (_error$response6 = error.response) === null || _error$response6 === void 0 ? void 0 : _error$response6.status) || _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
    }
  }
  checkResponseIsDown(context, response) {
    if (response.status !== _constants.HTTP_STATUS_CODES.OK) {
      // Avoid "Error communicating with socket" like errors
      const socketErrorCodes = [1013, 1014, 1017, 1018, 1019];
      const status = (response.data || {}).status || 1;
      const isDown = socketErrorCodes.includes(status);
      isDown && context.wazuh.logger.error('Server API is online but the server is not ready yet');
      return isDown;
    }
    return false;
  }

  /**
   * Check main Wazuh daemons status
   * @param {*} context Endpoint context
   * @param {*} api API entry stored in .wazuh
   * @param {*} path Optional. Wazuh API target path.
   */
  async checkDaemons(context, api, path) {
    try {
      const response = await context.wazuh.api.client.asInternalUser.request('GET', '/manager/status', {}, {
        apiHostID: api.id
      });
      const daemons = ((((response || {}).data || {}).data || {}).affected_items || [])[0] || {};
      const isCluster = ((api || {}).cluster_info || {}).status === 'enabled' && typeof daemons['wazuh-clusterd'] !== 'undefined';
      const wazuhdbExists = typeof daemons['wazuh-db'] !== 'undefined';
      const execd = daemons['wazuh-execd'] === 'running';
      const modulesd = daemons['wazuh-modulesd'] === 'running';
      const wazuhdb = wazuhdbExists ? daemons['wazuh-db'] === 'running' : true;
      const clusterd = isCluster ? daemons['wazuh-clusterd'] === 'running' : true;
      const isValid = execd && modulesd && wazuhdb && clusterd;
      isValid && context.wazuh.logger.debug('Wazuh is ready');
      if (path === '/ping') {
        return {
          isValid
        };
      }
      if (!isValid) {
        throw new Error('Server not ready yet');
      }
    } catch (error) {
      context.wazuh.logger.error(error.message || error);
      return Promise.reject(error);
    }
  }
  sleep(timeMs) {
    // eslint-disable-next-line
    return new Promise((resolve, reject) => {
      setTimeout(resolve, timeMs);
    });
  }

  /**
   * This performs a request over Wazuh API and returns its response
   * @param {String} method Method: GET, PUT, POST, DELETE
   * @param {String} path API route
   * @param {Object} data data and params to perform the request
   * @param {String} id API id
   * @param {Object} response
   * @returns {Object} API response or ErrorResponse
   */
  async makeRequest(context, method, path, data, id, response) {
    const devTools = !!(data || {}).devTools;
    try {
      let api;
      try {
        api = await context.wazuh_core.manageHosts.get(id, {
          excludePassword: true
        });
      } catch (error) {
        context.wazuh.logger.error('Could not get host credentials');
        //Can not get credentials from wazuh-hosts
        return (0, _errorResponse.ErrorResponse)('Could not get host credentials', 3011, _constants.HTTP_STATUS_CODES.NOT_FOUND, response);
      }
      if (devTools) {
        delete data.devTools;
      }
      if (!data) {
        data = {};
      }
      if (!data.headers) {
        data.headers = {};
      }
      const options = {
        apiHostID: id
      };

      // Set content type application/xml if needed
      if (typeof (data || {}).body === 'string' && (data || {}).origin === 'xmleditor') {
        data.headers['content-type'] = 'application/xml';
        delete data.origin;
      }
      if (typeof (data || {}).body === 'string' && (data || {}).origin === 'json') {
        data.headers['content-type'] = 'application/json';
        delete data.origin;
      }
      if (typeof (data || {}).body === 'string' && (data || {}).origin === 'raw') {
        data.headers['content-type'] = 'application/octet-stream';
        delete data.origin;
      }
      const delay = (data || {}).delay || 0;
      if (delay) {
        // Remove the delay parameter that is used to add the sever API request to the queue job.
        // This assumes the delay parameter is not used as part of the server API request. If it
        // was expected to do a request with a 'delay' parameter then we would have to search a
        // way to differenciate if the parameter is related to job queue or API request.
        delete data.delay;
        (0, _queue.addJobToQueue)({
          startAt: new Date(Date.now() + delay),
          run: async contextJob => {
            try {
              await context.wazuh.api.client.asCurrentUser.request(method, path, data, options);
            } catch (error) {
              contextJob.wazuh.logger.error(`An error ocurred in the delayed request: "${method} ${path}": ${error.message || error}`);
            }
          }
        });
        return response.ok({
          body: {
            error: 0,
            message: 'Success'
          }
        });
      }
      if (path === '/ping') {
        try {
          const check = await this.checkDaemons(context, api, path);
          return check;
        } catch (error) {
          const isDown = (error || {}).code === 'ECONNREFUSED';
          if (!isDown) {
            context.wazuh.logger.error('Server API is online but the server is not ready yet');
            return (0, _errorResponse.ErrorResponse)(`ERROR3099 - ${error.message || 'Server not ready yet'}`, 3099, _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
          }
        }
      }
      context.wazuh.logger.debug(`${method} ${path}`);
      const responseToken = await context.wazuh.api.client.asCurrentUser.request(method, path, data, options);
      const responseIsDown = this.checkResponseIsDown(context, responseToken);
      if (responseIsDown) {
        return (0, _errorResponse.ErrorResponse)(`ERROR3099 - ${response.body.message || 'Server not ready yet'}`, 3099, _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
      }
      let responseBody = (responseToken || {}).data || {};
      if (!responseBody) {
        responseBody = typeof responseBody === 'string' && path.includes('/files') && method === 'GET' ? ' ' : false;
        response.data = responseBody;
      }
      const responseError = response.status !== _constants.HTTP_STATUS_CODES.OK ? response.status : false;
      if (!responseError && responseBody) {
        return response.ok({
          body: responseToken.data
        });
      }
      if (responseError && devTools) {
        return response.ok({
          body: response.data
        });
      }
      throw responseError && responseBody.detail ? {
        message: responseBody.detail,
        code: responseError
      } : new Error('Unexpected error fetching data from the API');
    } catch (error) {
      if (error && error.response && error.response.status === _constants.HTTP_STATUS_CODES.UNAUTHORIZED) {
        return (0, _errorResponse.ErrorResponse)(error.message || error, error.code ? `API error: ${error.code}` : 3013, _constants.HTTP_STATUS_CODES.UNAUTHORIZED, response);
      }
      const errorMsg = (error.response || {}).data || error.message;
      context.wazuh.logger.error(errorMsg || error);
      if (devTools) {
        return response.ok({
          body: {
            error: '3013',
            message: errorMsg || error
          }
        });
      } else {
        if ((error || {}).code && _apiErrorsEquivalence.ApiErrorEquivalence[error.code]) {
          error.message = _apiErrorsEquivalence.ApiErrorEquivalence[error.code];
        }
        return (0, _errorResponse.ErrorResponse)(errorMsg.detail || error, error.code ? `API error: ${error.code}` : 3013, _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
      }
    }
  }

  /**
   * This make a request to API
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} api response or ErrorResponse
   */
  requestApi(context, request, response) {
    const idApi = (0, _cookie.getCookieValueByName)(request.headers.cookie, 'wz-api');
    if (idApi !== request.body.id) {
      // if the current token belongs to a different API id, we relogin to obtain a new token
      return (0, _errorResponse.ErrorResponse)('status code 401', _constants.HTTP_STATUS_CODES.UNAUTHORIZED, _constants.HTTP_STATUS_CODES.UNAUTHORIZED, response);
    }
    if (!request.body.method) {
      return (0, _errorResponse.ErrorResponse)('Missing param: method', 3015, _constants.HTTP_STATUS_CODES.BAD_REQUEST, response);
    } else if (!request.body.method.match(/^(?:GET|PUT|POST|DELETE)$/)) {
      context.wazuh.logger.error('Request method is not valid.');
      //Method is not a valid HTTP request method
      return (0, _errorResponse.ErrorResponse)('Request method is not valid.', 3015, _constants.HTTP_STATUS_CODES.BAD_REQUEST, response);
    } else if (!request.body.path) {
      return (0, _errorResponse.ErrorResponse)('Missing param: path', 3016, _constants.HTTP_STATUS_CODES.BAD_REQUEST, response);
    } else if (!request.body.path.startsWith('/')) {
      context.wazuh.logger.error('Request path is not valid.');
      //Path doesn't start with '/'
      return (0, _errorResponse.ErrorResponse)('Request path is not valid.', 3015, _constants.HTTP_STATUS_CODES.BAD_REQUEST, response);
    } else {
      return this.makeRequest(context, request.body.method, request.body.path, request.body.body, request.body.id, response);
    }
  }

  /**
   * Get full data on CSV format from a list Wazuh API endpoint
   * @param {Object} ctx
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} csv or ErrorResponse
   */
  async csv(context, request, response) {
    try {
      if (!request.body || !request.body.path) throw new Error('Field path is required');
      if (!request.body.id) throw new Error('Field id is required');
      const filters = Array.isArray(((request || {}).body || {}).filters) ? request.body.filters : [];
      let tmpPath = request.body.path;
      if (tmpPath && typeof tmpPath === 'string') {
        tmpPath = tmpPath[0] === '/' ? tmpPath.substr(1) : tmpPath;
      }
      if (!tmpPath) throw new Error('An error occurred parsing path field');
      context.wazuh.logger.debug(`Report ${tmpPath}`);
      // Real limit, regardless the user query
      const params = {
        limit: 500
      };
      if (filters.length) {
        for (const filter of filters) {
          if (!filter.name || !filter.value) continue;
          params[filter.name] = filter.value;
        }
      }
      let itemsArray = [];
      const output = await context.wazuh.api.client.asCurrentUser.request('GET', `/${tmpPath}`, {
        params: params
      }, {
        apiHostID: request.body.id
      });
      const isList = request.body.path.includes('/lists') && request.body.filters && request.body.filters.length && request.body.filters.find(filter => filter._isCDBList);
      const totalItems = (((output || {}).data || {}).data || {}).total_affected_items;
      if (totalItems && !isList) {
        params.offset = 0;
        itemsArray.push(...output.data.data.affected_items);
        while (itemsArray.length < totalItems && params.offset < totalItems) {
          params.offset += params.limit;
          const tmpData = await context.wazuh.api.client.asCurrentUser.request('GET', `/${tmpPath}`, {
            params: params
          }, {
            apiHostID: request.body.id
          });
          itemsArray.push(...tmpData.data.data.affected_items);
        }
      }
      if (totalItems) {
        const {
          path,
          filters
        } = request.body;
        const isArrayOfLists = path.includes('/lists') && !isList;
        const isAgents = path.includes('/agents') && !path.includes('groups');
        const isAgentsOfGroup = path.startsWith('/agents/groups/');
        const isFiles = path.endsWith('/files');
        let fields = Object.keys(output.data.data.affected_items[0]);
        if (isAgents || isAgentsOfGroup) {
          if (isFiles) {
            fields = ['filename', 'hash'];
          } else {
            fields = ['id', 'status', 'name', 'ip', 'group', 'manager', 'node_name', 'dateAdd', 'version', 'lastKeepAlive', 'os.arch', 'os.build', 'os.codename', 'os.major', 'os.minor', 'os.name', 'os.platform', 'os.uname', 'os.version'];
          }
        }
        if (isArrayOfLists) {
          const flatLists = [];
          for (const list of itemsArray) {
            const {
              relative_dirname,
              items
            } = list;
            flatLists.push(...items.map(item => ({
              relative_dirname,
              key: item.key,
              value: item.value
            })));
          }
          fields = ['relative_dirname', 'key', 'value'];
          itemsArray = [...flatLists];
        }
        if (isList) {
          fields = ['key', 'value'];
          itemsArray = output.data.data.affected_items[0].items;
        }
        fields = fields.map(item => ({
          value: item,
          default: '-'
        }));
        const json2csvParser = new _json2csv.Parser({
          fields
        });
        let csv = json2csvParser.parse(itemsArray);
        for (const field of fields) {
          const {
            value
          } = field;
          if (csv.includes(value)) {
            csv = csv.replace(value, _csvKeyEquivalence.KeyEquivalence[value] || value);
          }
        }
        return response.ok({
          headers: {
            'Content-Type': 'text/csv'
          },
          body: csv
        });
      } else if (output && output.data && output.data.data && !output.data.data.total_affected_items) {
        throw new Error('No results');
      } else {
        throw new Error(`An error occurred fetching data from the Wazuh API${output && output.data && output.data.detail ? `: ${output.body.detail}` : ''}`);
      }
    } catch (error) {
      context.wazuh.logger.error(error.message || error);
      return (0, _errorResponse.ErrorResponse)(error.message || error, 3034, _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
    }
  }

  // Get de list of available requests in the API
  getRequestList(context, request, response) {
    //Read a static JSON until the api call has implemented
    return response.ok({
      body: _endpoints.default
    });
  }

  /**
   * This get the wazuh setup settings
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} setup info or ErrorResponse
   */
  async getSetupInfo(context, request, response) {
    try {
      return response.ok({
        body: {
          statusCode: _constants.HTTP_STATUS_CODES.OK,
          data: {
            'app-version': _package.version,
            revision: _package.revision,
            configuration_file: context.wazuh_core.configuration.store.file
          }
        }
      });
    } catch (error) {
      context.wazuh.logger.error(error.message || error);
      return (0, _errorResponse.ErrorResponse)(`Could not get data from wazuh-version registry due to ${error.message || error}`, 4005, _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
    }
  }

  /**
   * Get basic syscollector information for given agent.
   * @param {Object} context
   * @param {Object} request
   * @param {Object} response
   * @returns {Object} Basic syscollector information
   */
  async getSyscollector(context, request, response) {
    try {
      const apiHostID = (0, _cookie.getCookieValueByName)(request.headers.cookie, 'wz-api');
      if (!request.params || !apiHostID || !request.params.agent) {
        throw new Error('Agent ID and API ID are required');
      }
      const {
        agent
      } = request.params;
      const data = await Promise.all([context.wazuh.api.client.asInternalUser.request('GET', `/syscollector/${agent}/hardware`, {}, {
        apiHostID
      }), context.wazuh.api.client.asInternalUser.request('GET', `/syscollector/${agent}/os`, {}, {
        apiHostID
      })]);
      const result = data.map(item => (item.data || {}).data || []);
      const [hardwareResponse, osResponse] = result;

      // Fill syscollector object
      const syscollector = {
        hardware: typeof hardwareResponse === 'object' && Object.keys(hardwareResponse).length ? {
          ...hardwareResponse.affected_items[0]
        } : false,
        os: typeof osResponse === 'object' && Object.keys(osResponse).length ? {
          ...osResponse.affected_items[0]
        } : false
      };
      return response.ok({
        body: syscollector
      });
    } catch (error) {
      context.wazuh.logger.error(error.message || error);
      return (0, _errorResponse.ErrorResponse)(error.message || error, 3035, _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
    }
  }

  /**
   * Gets custom logos configuration (path)
   * @param context
   * @param request
   * @param response
   */
  async getAppLogos(context, request, response) {
    try {
      const APP_LOGO = 'customization.logo.app';
      const HEALTHCHECK_LOGO = 'customization.logo.healthcheck';
      const logos = {
        [APP_LOGO]: await context.wazuh_core.configuration.getCustomizationSetting(APP_LOGO),
        [HEALTHCHECK_LOGO]: await context.wazuh_core.configuration.getCustomizationSetting(HEALTHCHECK_LOGO)
      };
      return response.ok({
        body: {
          logos
        }
      });
    } catch (error) {
      context.wazuh.logger.error(error.message || error);
      return (0, _errorResponse.ErrorResponse)(error.message || error, 3035, _constants.HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, response);
    }
  }
}
exports.WazuhApiCtrl = WazuhApiCtrl;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXJyb3JSZXNwb25zZSIsInJlcXVpcmUiLCJfanNvbjJjc3YiLCJfY3N2S2V5RXF1aXZhbGVuY2UiLCJfYXBpRXJyb3JzRXF1aXZhbGVuY2UiLCJfZW5kcG9pbnRzIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIl9jb25zdGFudHMiLCJfcXVldWUiLCJfand0RGVjb2RlIiwiX2Nvb2tpZSIsIl9wYWNrYWdlIiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJXYXp1aEFwaUN0cmwiLCJjb25zdHJ1Y3RvciIsImdldFRva2VuIiwiY29udGV4dCIsInJlcXVlc3QiLCJyZXNwb25zZSIsImZvcmNlIiwiaWRIb3N0IiwiYm9keSIsInVzZXJuYW1lIiwid2F6dWgiLCJzZWN1cml0eSIsImdldEN1cnJlbnRVc2VyIiwiaGVhZGVycyIsImNvb2tpZSIsImRlY29kZVVSSUNvbXBvbmVudCIsImdldENvb2tpZVZhbHVlQnlOYW1lIiwid3pUb2tlbiIsImRlY29kZWRUb2tlbiIsImp3dERlY29kZSIsImV4cGlyYXRpb25UaW1lIiwiZXhwIiwiRGF0ZSIsIm5vdyIsIm9rIiwidG9rZW4iLCJlcnJvciIsImxvZ2dlciIsIm1lc3NhZ2UiLCJhcGkiLCJjbGllbnQiLCJhc0N1cnJlbnRVc2VyIiwiYXV0aGVudGljYXRlIiwidGV4dFNlY3VyZSIsInNlcnZlciIsImluZm8iLCJwcm90b2NvbCIsImVuY29kZWRVc2VyIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiX2Vycm9yJHJlc3BvbnNlIiwiZXJyb3JNZXNzYWdlIiwiZGF0YSIsImRldGFpbCIsIkVycm9yUmVzcG9uc2UiLCJzdGF0dXMiLCJIVFRQX1NUQVRVU19DT0RFUyIsIklOVEVSTkFMX1NFUlZFUl9FUlJPUiIsImNoZWNrU3RvcmVkQVBJIiwiaWQiLCJkZWJ1ZyIsImFwaUhvc3REYXRhIiwid2F6dWhfY29yZSIsIm1hbmFnZUhvc3RzIiwiZ2V0IiwiZXhjbHVkZVBhc3N3b3JkIiwiSlNPTiIsInN0cmluZ2lmeSIsInJlc3BvbnNlTWFuYWdlckluZm8iLCJhc0ludGVybmFsVXNlciIsImFwaUhvc3RJRCIsImZvcmNlUmVmcmVzaCIsImNoZWNrUmVzcG9uc2VJc0Rvd24iLCJTRVJWSUNFX1VOQVZBSUxBQkxFIiwibWFuYWdlciIsIm5vZGUiLCJjbHVzdGVyIiwiZ2V0UmVnaXN0cnlEYXRhQnlIb3N0IiwidGhyb3dFcnJvciIsImNsdXN0ZXJfaW5mbyIsInN0YXR1c0NvZGUiLCJPSyIsImlkQ2hhbmdlZCIsIkVycm9yIiwidXJsIiwicG9ydCIsImNvZGUiLCJhcGlJc0Rvd24iLCJfZXJyb3IkcmVzcG9uc2UzIiwiYXBpcyIsIl9lcnJvciRyZXNwb25zZTIiLCJ2YWxpZGF0ZUNoZWNrQXBpUGFyYW1zIiwiaW5jbHVkZXMiLCJjaGVja0FQSSIsImFwaUF2YWlsYWJsZSIsIm9wdGlvbnMiLCJfZXJyb3IkcmVzcG9uc2U0IiwiX2Vycm9yJHJlc3BvbnNlNSIsInJlc3VsdCIsIl9lcnJvciRyZXNwb25zZTYiLCJ3YXJuIiwiVU5BVVRIT1JJWkVEIiwiQkFEX1JFUVVFU1QiLCJzb2NrZXRFcnJvckNvZGVzIiwiaXNEb3duIiwiY2hlY2tEYWVtb25zIiwicGF0aCIsImRhZW1vbnMiLCJhZmZlY3RlZF9pdGVtcyIsImlzQ2x1c3RlciIsIndhenVoZGJFeGlzdHMiLCJleGVjZCIsIm1vZHVsZXNkIiwid2F6dWhkYiIsImNsdXN0ZXJkIiwiaXNWYWxpZCIsIlByb21pc2UiLCJyZWplY3QiLCJzbGVlcCIsInRpbWVNcyIsInJlc29sdmUiLCJzZXRUaW1lb3V0IiwibWFrZVJlcXVlc3QiLCJtZXRob2QiLCJkZXZUb29scyIsIk5PVF9GT1VORCIsIm9yaWdpbiIsImRlbGF5IiwiYWRkSm9iVG9RdWV1ZSIsInN0YXJ0QXQiLCJydW4iLCJjb250ZXh0Sm9iIiwiY2hlY2siLCJyZXNwb25zZVRva2VuIiwicmVzcG9uc2VJc0Rvd24iLCJyZXNwb25zZUJvZHkiLCJyZXNwb25zZUVycm9yIiwiZXJyb3JNc2ciLCJBcGlFcnJvckVxdWl2YWxlbmNlIiwicmVxdWVzdEFwaSIsImlkQXBpIiwibWF0Y2giLCJzdGFydHNXaXRoIiwiY3N2IiwiZmlsdGVycyIsIkFycmF5IiwiaXNBcnJheSIsInRtcFBhdGgiLCJzdWJzdHIiLCJwYXJhbXMiLCJsaW1pdCIsImxlbmd0aCIsImZpbHRlciIsIm5hbWUiLCJ2YWx1ZSIsIml0ZW1zQXJyYXkiLCJvdXRwdXQiLCJpc0xpc3QiLCJmaW5kIiwiX2lzQ0RCTGlzdCIsInRvdGFsSXRlbXMiLCJ0b3RhbF9hZmZlY3RlZF9pdGVtcyIsIm9mZnNldCIsInB1c2giLCJ0bXBEYXRhIiwiaXNBcnJheU9mTGlzdHMiLCJpc0FnZW50cyIsImlzQWdlbnRzT2ZHcm91cCIsImlzRmlsZXMiLCJlbmRzV2l0aCIsImZpZWxkcyIsIk9iamVjdCIsImtleXMiLCJmbGF0TGlzdHMiLCJsaXN0IiwicmVsYXRpdmVfZGlybmFtZSIsIml0ZW1zIiwibWFwIiwiaXRlbSIsImtleSIsImpzb24yY3N2UGFyc2VyIiwiUGFyc2VyIiwicGFyc2UiLCJmaWVsZCIsInJlcGxhY2UiLCJLZXlFcXVpdmFsZW5jZSIsImdldFJlcXVlc3RMaXN0IiwiYXBpUmVxdWVzdExpc3QiLCJnZXRTZXR1cEluZm8iLCJwbHVnaW5WZXJzaW9uIiwicmV2aXNpb24iLCJwbHVnaW5SZXZpc2lvbiIsImNvbmZpZ3VyYXRpb25fZmlsZSIsImNvbmZpZ3VyYXRpb24iLCJzdG9yZSIsImZpbGUiLCJnZXRTeXNjb2xsZWN0b3IiLCJhZ2VudCIsImFsbCIsImhhcmR3YXJlUmVzcG9uc2UiLCJvc1Jlc3BvbnNlIiwic3lzY29sbGVjdG9yIiwiaGFyZHdhcmUiLCJvcyIsImdldEFwcExvZ29zIiwiQVBQX0xPR08iLCJIRUFMVEhDSEVDS19MT0dPIiwibG9nb3MiLCJnZXRDdXN0b21pemF0aW9uU2V0dGluZyIsImV4cG9ydHMiXSwic291cmNlcyI6WyJ3YXp1aC1hcGkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFdhenVoIGFwcCAtIENsYXNzIGZvciBXYXp1aC1BUEkgZnVuY3Rpb25zXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTUtMjAyMiBXYXp1aCwgSW5jLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOyB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbjsgZWl0aGVyIHZlcnNpb24gMiBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogRmluZCBtb3JlIGluZm9ybWF0aW9uIGFib3V0IHRoaXMgb24gdGhlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4vLyBSZXF1aXJlIHNvbWUgbGlicmFyaWVzXG5pbXBvcnQgeyBFcnJvclJlc3BvbnNlIH0gZnJvbSAnLi4vbGliL2Vycm9yLXJlc3BvbnNlJztcbmltcG9ydCB7IFBhcnNlciB9IGZyb20gJ2pzb24yY3N2JztcbmltcG9ydCB7IEtleUVxdWl2YWxlbmNlIH0gZnJvbSAnLi4vLi4vY29tbW9uL2Nzdi1rZXktZXF1aXZhbGVuY2UnO1xuaW1wb3J0IHsgQXBpRXJyb3JFcXVpdmFsZW5jZSB9IGZyb20gJy4uL2xpYi9hcGktZXJyb3JzLWVxdWl2YWxlbmNlJztcbmltcG9ydCBhcGlSZXF1ZXN0TGlzdCBmcm9tICcuLi8uLi9jb21tb24vYXBpLWluZm8vZW5kcG9pbnRzJztcbmltcG9ydCB7IEhUVFBfU1RBVFVTX0NPREVTIH0gZnJvbSAnLi4vLi4vY29tbW9uL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBhZGRKb2JUb1F1ZXVlIH0gZnJvbSAnLi4vc3RhcnQvcXVldWUnO1xuaW1wb3J0IGp3dERlY29kZSBmcm9tICdqd3QtZGVjb2RlJztcbmltcG9ydCB7XG4gIE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbn0gZnJvbSAnc3JjL2NvcmUvc2VydmVyJztcbmltcG9ydCB7IGdldENvb2tpZVZhbHVlQnlOYW1lIH0gZnJvbSAnLi4vbGliL2Nvb2tpZSc7XG5pbXBvcnQge1xuICB2ZXJzaW9uIGFzIHBsdWdpblZlcnNpb24sXG4gIHJldmlzaW9uIGFzIHBsdWdpblJldmlzaW9uLFxufSBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuXG5leHBvcnQgY2xhc3MgV2F6dWhBcGlDdHJsIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGFzeW5jIGdldFRva2VuKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICApIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBmb3JjZSwgaWRIb3N0IH0gPSByZXF1ZXN0LmJvZHk7XG4gICAgICBjb25zdCB7IHVzZXJuYW1lIH0gPSBhd2FpdCBjb250ZXh0LndhenVoLnNlY3VyaXR5LmdldEN1cnJlbnRVc2VyKFxuICAgICAgICByZXF1ZXN0LFxuICAgICAgICBjb250ZXh0LFxuICAgICAgKTtcbiAgICAgIGlmIChcbiAgICAgICAgIWZvcmNlICYmXG4gICAgICAgIHJlcXVlc3QuaGVhZGVycy5jb29raWUgJiZcbiAgICAgICAgdXNlcm5hbWUgPT09XG4gICAgICAgICAgZGVjb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAgICAgZ2V0Q29va2llVmFsdWVCeU5hbWUocmVxdWVzdC5oZWFkZXJzLmNvb2tpZSwgJ3d6LXVzZXInKSxcbiAgICAgICAgICApICYmXG4gICAgICAgIGlkSG9zdCA9PT0gZ2V0Q29va2llVmFsdWVCeU5hbWUocmVxdWVzdC5oZWFkZXJzLmNvb2tpZSwgJ3d6LWFwaScpXG4gICAgICApIHtcbiAgICAgICAgY29uc3Qgd3pUb2tlbiA9IGdldENvb2tpZVZhbHVlQnlOYW1lKFxuICAgICAgICAgIHJlcXVlc3QuaGVhZGVycy5jb29raWUsXG4gICAgICAgICAgJ3d6LXRva2VuJyxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHd6VG9rZW4pIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gaWYgdGhlIGN1cnJlbnQgdG9rZW4gaXMgbm90IGEgdmFsaWQgand0IHRva2VuIHdlIGFzayBmb3IgYSBuZXcgb25lXG4gICAgICAgICAgICBjb25zdCBkZWNvZGVkVG9rZW4gPSBqd3REZWNvZGUod3pUb2tlbik7XG4gICAgICAgICAgICBjb25zdCBleHBpcmF0aW9uVGltZSA9IGRlY29kZWRUb2tlbi5leHAgLSBEYXRlLm5vdygpIC8gMTAwMDtcbiAgICAgICAgICAgIGlmICh3elRva2VuICYmIGV4cGlyYXRpb25UaW1lID4gMCkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgICAgICAgIGJvZHk6IHsgdG9rZW46IHd6VG9rZW4gfSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmVycm9yKFxuICAgICAgICAgICAgICBgRXJyb3IgZGVjb2RpbmcgdGhlIEFQSSBob3N0IGVudHJ5IHRva2VuOiAke2Vycm9yLm1lc3NhZ2V9YCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCB0b2tlbiA9IGF3YWl0IGNvbnRleHQud2F6dWguYXBpLmNsaWVudC5hc0N1cnJlbnRVc2VyLmF1dGhlbnRpY2F0ZShcbiAgICAgICAgaWRIb3N0LFxuICAgICAgKTtcblxuICAgICAgbGV0IHRleHRTZWN1cmUgPSAnJztcbiAgICAgIGlmIChjb250ZXh0LndhenVoLnNlcnZlci5pbmZvLnByb3RvY29sID09PSAnaHR0cHMnKSB7XG4gICAgICAgIHRleHRTZWN1cmUgPSAnO1NlY3VyZSc7XG4gICAgICB9XG4gICAgICBjb25zdCBlbmNvZGVkVXNlciA9IGVuY29kZVVSSUNvbXBvbmVudCh1c2VybmFtZSk7XG4gICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ3NldC1jb29raWUnOiBbXG4gICAgICAgICAgICBgd3otdG9rZW49JHt0b2tlbn07UGF0aD0vO0h0dHBPbmx5JHt0ZXh0U2VjdXJlfWAsXG4gICAgICAgICAgICBgd3otdXNlcj0ke2VuY29kZWRVc2VyfTtQYXRoPS87SHR0cE9ubHkke3RleHRTZWN1cmV9YCxcbiAgICAgICAgICAgIGB3ei1hcGk9JHtpZEhvc3R9O1BhdGg9LztIdHRwT25seWAsXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogeyB0b2tlbiB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGBFcnJvciBnZXR0aW5nIHRoZSBhdXRob3JpemF0aW9uIHRva2VuOiAke1xuICAgICAgICAoKGVycm9yLnJlc3BvbnNlIHx8IHt9KS5kYXRhIHx8IHt9KS5kZXRhaWwgfHwgZXJyb3IubWVzc2FnZSB8fCBlcnJvclxuICAgICAgfWA7XG4gICAgICBjb250ZXh0LndhenVoLmxvZ2dlci5lcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoXG4gICAgICAgIGVycm9yTWVzc2FnZSxcbiAgICAgICAgMzAwMCxcbiAgICAgICAgZXJyb3I/LnJlc3BvbnNlPy5zdGF0dXMgfHwgSFRUUF9TVEFUVVNfQ09ERVMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLFxuICAgICAgICByZXNwb25zZSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgaWYgdGhlIHdhenVoLWFwaSBjb25maWd1cmF0aW9uIGlzIHdvcmtpbmdcbiAgICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcXVlc3RcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IHN0YXR1cyBvYmogb3IgRXJyb3JSZXNwb25zZVxuICAgKi9cbiAgYXN5bmMgY2hlY2tTdG9yZWRBUEkoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gICkge1xuICAgIHRyeSB7XG4gICAgICAvLyBHZXQgY29uZmlnIGZyb20gY29uZmlndXJhdGlvblxuICAgICAgY29uc3QgaWQgPSByZXF1ZXN0LmJvZHkuaWQ7XG4gICAgICBjb250ZXh0LndhenVoLmxvZ2dlci5kZWJ1ZyhgR2V0dGluZyBzZXJ2ZXIgQVBJIGhvc3QgYnkgSUQ6ICR7aWR9YCk7XG4gICAgICBjb25zdCBhcGlIb3N0RGF0YSA9IGF3YWl0IGNvbnRleHQud2F6dWhfY29yZS5tYW5hZ2VIb3N0cy5nZXQoaWQsIHtcbiAgICAgICAgZXhjbHVkZVBhc3N3b3JkOiB0cnVlLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBhcGkgPSB7IC4uLmFwaUhvc3REYXRhIH07XG4gICAgICBjb250ZXh0LndhenVoLmxvZ2dlci5kZWJ1ZyhcbiAgICAgICAgYFNlcnZlciBBUEkgaG9zdCBkYXRhOiAke0pTT04uc3RyaW5naWZ5KGFwaSl9YCxcbiAgICAgICk7XG5cbiAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKGAke2lkfSBleGlzdHNgKTtcblxuICAgICAgLy8gRmV0Y2ggbmVlZGVkIGluZm9ybWF0aW9uIGFib3V0IHRoZSBjbHVzdGVyIGFuZCB0aGUgbWFuYWdlciBpdHNlbGZcbiAgICAgIGNvbnN0IHJlc3BvbnNlTWFuYWdlckluZm8gPVxuICAgICAgICBhd2FpdCBjb250ZXh0LndhenVoLmFwaS5jbGllbnQuYXNJbnRlcm5hbFVzZXIucmVxdWVzdChcbiAgICAgICAgICAnZ2V0JyxcbiAgICAgICAgICBgL21hbmFnZXIvaW5mb2AsXG4gICAgICAgICAge30sXG4gICAgICAgICAgeyBhcGlIb3N0SUQ6IGlkLCBmb3JjZVJlZnJlc2g6IHRydWUgfSxcbiAgICAgICAgKTtcblxuICAgICAgLy8gTG9vayBmb3Igc29ja2V0LXJlbGF0ZWQgZXJyb3JzXG4gICAgICBpZiAodGhpcy5jaGVja1Jlc3BvbnNlSXNEb3duKGNvbnRleHQsIHJlc3BvbnNlTWFuYWdlckluZm8pKSB7XG4gICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICAgIGBFUlJPUjMwOTkgLSAke1xuICAgICAgICAgICAgcmVzcG9uc2VNYW5hZ2VySW5mby5kYXRhLmRldGFpbCB8fCAnU2VydmVyIG5vdCByZWFkeSB5ZXQnXG4gICAgICAgICAgfWAsXG4gICAgICAgICAgMzA5OSxcbiAgICAgICAgICBIVFRQX1NUQVRVU19DT0RFUy5TRVJWSUNFX1VOQVZBSUxBQkxFLFxuICAgICAgICAgIHJlc3BvbnNlLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB3ZSBoYXZlIGEgdmFsaWQgcmVzcG9uc2UgZnJvbSB0aGUgV2F6dWggQVBJXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7IHN0YXR1cywgbWFuYWdlciwgbm9kZSwgY2x1c3RlciB9ID1cbiAgICAgICAgICBhd2FpdCBjb250ZXh0LndhenVoX2NvcmUubWFuYWdlSG9zdHMuZ2V0UmVnaXN0cnlEYXRhQnlIb3N0KFxuICAgICAgICAgICAgYXBpSG9zdERhdGEsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRocm93RXJyb3I6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG5cbiAgICAgICAgYXBpLmNsdXN0ZXJfaW5mbyA9IHsgc3RhdHVzLCBtYW5hZ2VyLCBub2RlLCBjbHVzdGVyIH07XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBzdGF0dXNDb2RlOiBIVFRQX1NUQVRVU19DT0RFUy5PSyxcbiAgICAgICAgICAgIGRhdGE6IGFwaSxcbiAgICAgICAgICAgIGlkQ2hhbmdlZDogcmVxdWVzdC5ib2R5LmlkQ2hhbmdlZCB8fCBudWxsLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBhbiBpbnZhbGlkIHJlc3BvbnNlIGZyb20gdGhlIFdhenVoIEFQSVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgcmVzcG9uc2VNYW5hZ2VySW5mby5kYXRhLmRldGFpbCB8fFxuICAgICAgICAgICAgYCR7YXBpLnVybH06JHthcGkucG9ydH0gaXMgdW5yZWFjaGFibGVgLFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3IuY29kZSA9PT0gJ0VQUk9UTycpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBzdGF0dXNDb2RlOiBIVFRQX1NUQVRVU19DT0RFUy5PSyxcbiAgICAgICAgICAgIGRhdGE6IHsgYXBpSXNEb3duOiB0cnVlIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGVycm9yLmNvZGUgPT09ICdFQ09OTlJFRlVTRUQnKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgc3RhdHVzQ29kZTogSFRUUF9TVEFUVVNfQ09ERVMuT0ssXG4gICAgICAgICAgICBkYXRhOiB7IGFwaUlzRG93bjogdHJ1ZSB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBhcGlzID0gYXdhaXQgY29udGV4dC53YXp1aF9jb3JlLm1hbmFnZUhvc3RzLmdldCgpO1xuICAgICAgICAgIGZvciAoY29uc3QgYXBpIG9mIGFwaXMpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgaWQgfSA9IGFwaTtcblxuICAgICAgICAgICAgICBjb25zdCByZXNwb25zZU1hbmFnZXJJbmZvID1cbiAgICAgICAgICAgICAgICBhd2FpdCBjb250ZXh0LndhenVoLmFwaS5jbGllbnQuYXNJbnRlcm5hbFVzZXIucmVxdWVzdChcbiAgICAgICAgICAgICAgICAgICdHRVQnLFxuICAgICAgICAgICAgICAgICAgYC9tYW5hZ2VyL2luZm9gLFxuICAgICAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgICAgICB7IGFwaUhvc3RJRDogaWQgfSxcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrUmVzcG9uc2VJc0Rvd24oY29udGV4dCwgcmVzcG9uc2VNYW5hZ2VySW5mbykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShcbiAgICAgICAgICAgICAgICAgIGBFUlJPUjMwOTkgLSAke1xuICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kYXRhLmRldGFpbCB8fCAnU2VydmVyIG5vdCByZWFkeSB5ZXQnXG4gICAgICAgICAgICAgICAgICB9YCxcbiAgICAgICAgICAgICAgICAgIDMwOTksXG4gICAgICAgICAgICAgICAgICBIVFRQX1NUQVRVU19DT0RFUy5TRVJWSUNFX1VOQVZBSUxBQkxFLFxuICAgICAgICAgICAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAocmVzcG9uc2VNYW5hZ2VySW5mby5zdGF0dXMgPT09IEhUVFBfU1RBVFVTX0NPREVTLk9LKSB7XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5ib2R5LmlkID0gaWQ7XG4gICAgICAgICAgICAgICAgcmVxdWVzdC5ib2R5LmlkQ2hhbmdlZCA9IGlkO1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmNoZWNrU3RvcmVkQVBJKGNvbnRleHQsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHt9IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoXG4gICAgICAgICAgICBlcnJvci5tZXNzYWdlIHx8IGVycm9yLFxuICAgICAgICAgICAgMzAyMCxcbiAgICAgICAgICAgIGVycm9yPy5yZXNwb25zZT8uc3RhdHVzIHx8IEhUVFBfU1RBVFVTX0NPREVTLklOVEVSTkFMX1NFUlZFUl9FUlJPUixcbiAgICAgICAgICAgIHJlc3BvbnNlLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICAgIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IsXG4gICAgICAgICAgMzAwMixcbiAgICAgICAgICBlcnJvcj8ucmVzcG9uc2U/LnN0YXR1cyB8fCBIVFRQX1NUQVRVU19DT0RFUy5JTlRFUk5BTF9TRVJWRVJfRVJST1IsXG4gICAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgcGVyZm9tcyBhIHZhbGlkYXRpb24gb2YgQVBJIHBhcmFtc1xuICAgKiBAcGFyYW0ge09iamVjdH0gYm9keSBBUEkgcGFyYW1zXG4gICAqL1xuICB2YWxpZGF0ZUNoZWNrQXBpUGFyYW1zKGJvZHkpIHtcbiAgICBpZiAoISgndXNlcm5hbWUnIGluIGJvZHkpKSB7XG4gICAgICByZXR1cm4gJ01pc3NpbmcgcGFyYW06IEFQSSBVU0VSTkFNRSc7XG4gICAgfVxuXG4gICAgaWYgKCEoJ3Bhc3N3b3JkJyBpbiBib2R5KSAmJiAhKCdpZCcgaW4gYm9keSkpIHtcbiAgICAgIHJldHVybiAnTWlzc2luZyBwYXJhbTogQVBJIFBBU1NXT1JEJztcbiAgICB9XG5cbiAgICBpZiAoISgndXJsJyBpbiBib2R5KSkge1xuICAgICAgcmV0dXJuICdNaXNzaW5nIHBhcmFtOiBBUEkgVVJMJztcbiAgICB9XG5cbiAgICBpZiAoISgncG9ydCcgaW4gYm9keSkpIHtcbiAgICAgIHJldHVybiAnTWlzc2luZyBwYXJhbTogQVBJIFBPUlQnO1xuICAgIH1cblxuICAgIGlmICghYm9keS51cmwuaW5jbHVkZXMoJ2h0dHBzOi8vJykgJiYgIWJvZHkudXJsLmluY2x1ZGVzKCdodHRwOi8vJykpIHtcbiAgICAgIHJldHVybiAncHJvdG9jb2xfZXJyb3InO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGNoZWNrIHRoZSB3YXp1aC1hcGkgY29uZmlndXJhdGlvbiByZWNlaXZlZCBpbiB0aGUgUE9TVCBib2R5IHdpbGwgd29ya1xuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVxdWVzdFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2VcbiAgICogQHJldHVybnMge09iamVjdH0gc3RhdHVzIG9iaiBvciBFcnJvclJlc3BvbnNlXG4gICAqL1xuICBhc3luYyBjaGVja0FQSShcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBhcGlBdmFpbGFibGUgPSBudWxsO1xuICAgICAgLy8gY29uc3Qgbm90VmFsaWQgPSB0aGlzLnZhbGlkYXRlQ2hlY2tBcGlQYXJhbXMocmVxdWVzdC5ib2R5KTtcbiAgICAgIC8vIGlmIChub3RWYWxpZCkgcmV0dXJuIEVycm9yUmVzcG9uc2Uobm90VmFsaWQsIDMwMDMsIEhUVFBfU1RBVFVTX0NPREVTLklOVEVSTkFMX1NFUlZFUl9FUlJPUiwgcmVzcG9uc2UpO1xuICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZGVidWcoYCR7cmVxdWVzdC5ib2R5LmlkfSBpcyB2YWxpZGApO1xuICAgICAgLy8gQ2hlY2sgaWYgYSBXYXp1aCBBUEkgaWQgaXMgZ2l2ZW4gKGFscmVhZHkgc3RvcmVkIEFQSSlcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBjb250ZXh0LndhenVoX2NvcmUubWFuYWdlSG9zdHMuZ2V0KHJlcXVlc3QuYm9keS5pZCwge1xuICAgICAgICBleGNsdWRlUGFzc3dvcmQ6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgIGFwaUF2YWlsYWJsZSA9IGRhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBgVGhlIHNlcnZlciBBUEkgaG9zdCBlbnRyeSB3aXRoIElEICR7cmVxdWVzdC5ib2R5LmlkfSB3YXMgbm90IGZvdW5kYDtcbiAgICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZGVidWcoZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoXG4gICAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgICAgIDMwMjksXG4gICAgICAgICAgSFRUUF9TVEFUVVNfQ09ERVMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLFxuICAgICAgICAgIHJlc3BvbnNlLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY29uc3Qgb3B0aW9ucyA9IHsgYXBpSG9zdElEOiByZXF1ZXN0LmJvZHkuaWQgfTtcbiAgICAgIGlmIChyZXF1ZXN0LmJvZHkuZm9yY2VSZWZyZXNoKSB7XG4gICAgICAgIG9wdGlvbnNbJ2ZvcmNlUmVmcmVzaCddID0gcmVxdWVzdC5ib2R5LmZvcmNlUmVmcmVzaDtcbiAgICAgIH1cbiAgICAgIGxldCByZXNwb25zZU1hbmFnZXJJbmZvO1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzcG9uc2VNYW5hZ2VySW5mbyA9XG4gICAgICAgICAgYXdhaXQgY29udGV4dC53YXp1aC5hcGkuY2xpZW50LmFzSW50ZXJuYWxVc2VyLnJlcXVlc3QoXG4gICAgICAgICAgICAnR0VUJyxcbiAgICAgICAgICAgIGAvbWFuYWdlci9pbmZvYCxcbiAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgICApO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoXG4gICAgICAgICAgYEVSUk9SMzA5OSAtICR7XG4gICAgICAgICAgICBlcnJvci5yZXNwb25zZT8uZGF0YT8uZGV0YWlsIHx8ICdTZXJ2ZXIgbm90IHJlYWR5IHlldCdcbiAgICAgICAgICB9YCxcbiAgICAgICAgICAzMDk5LFxuICAgICAgICAgIGVycm9yPy5yZXNwb25zZT8uc3RhdHVzIHx8IEhUVFBfU1RBVFVTX0NPREVTLlNFUlZJQ0VfVU5BVkFJTEFCTEUsXG4gICAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjb250ZXh0LndhenVoLmxvZ2dlci5kZWJ1ZyhgJHtyZXF1ZXN0LmJvZHkuaWR9IGNyZWRlbnRpYWxzIGFyZSB2YWxpZGApO1xuICAgICAgaWYgKFxuICAgICAgICByZXNwb25zZU1hbmFnZXJJbmZvLnN0YXR1cyA9PT0gSFRUUF9TVEFUVVNfQ09ERVMuT0sgJiZcbiAgICAgICAgcmVzcG9uc2VNYW5hZ2VySW5mby5kYXRhXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID1cbiAgICAgICAgICBhd2FpdCBjb250ZXh0LndhenVoX2NvcmUubWFuYWdlSG9zdHMuZ2V0UmVnaXN0cnlEYXRhQnlIb3N0KGRhdGEpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgIGJvZHk6IHJlc3VsdCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLndhcm4oZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG5cbiAgICAgIGlmIChcbiAgICAgICAgZXJyb3IgJiZcbiAgICAgICAgZXJyb3IucmVzcG9uc2UgJiZcbiAgICAgICAgZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSBIVFRQX1NUQVRVU19DT0RFUy5VTkFVVEhPUklaRURcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShcbiAgICAgICAgICBgVW5hdGhvcml6ZWQuIFBsZWFzZSBjaGVjayBBUEkgY3JlZGVudGlhbHMuICR7ZXJyb3IucmVzcG9uc2UuZGF0YS5tZXNzYWdlfWAsXG4gICAgICAgICAgSFRUUF9TVEFUVVNfQ09ERVMuVU5BVVRIT1JJWkVELFxuICAgICAgICAgIEhUVFBfU1RBVFVTX0NPREVTLlVOQVVUSE9SSVpFRCxcbiAgICAgICAgICByZXNwb25zZSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgZXJyb3IgJiZcbiAgICAgICAgZXJyb3IucmVzcG9uc2UgJiZcbiAgICAgICAgZXJyb3IucmVzcG9uc2UuZGF0YSAmJlxuICAgICAgICBlcnJvci5yZXNwb25zZS5kYXRhLmRldGFpbFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICAgIGVycm9yLnJlc3BvbnNlLmRhdGEuZGV0YWlsLFxuICAgICAgICAgIGVycm9yLnJlc3BvbnNlLnN0YXR1cyB8fCBIVFRQX1NUQVRVU19DT0RFUy5TRVJWSUNFX1VOQVZBSUxBQkxFLFxuICAgICAgICAgIGVycm9yLnJlc3BvbnNlLnN0YXR1cyB8fCBIVFRQX1NUQVRVU19DT0RFUy5TRVJWSUNFX1VOQVZBSUxBQkxFLFxuICAgICAgICAgIHJlc3BvbnNlLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKGVycm9yLmNvZGUgPT09ICdFUFJPVE8nKSB7XG4gICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICAgICdXcm9uZyBwcm90b2NvbCBiZWluZyB1c2VkIHRvIGNvbm5lY3QgdG8gdGhlIEFQSScsXG4gICAgICAgICAgMzAwNSxcbiAgICAgICAgICBIVFRQX1NUQVRVU19DT0RFUy5CQURfUkVRVUVTVCxcbiAgICAgICAgICByZXNwb25zZSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICBlcnJvci5tZXNzYWdlIHx8IGVycm9yLFxuICAgICAgICAzMDA1LFxuICAgICAgICBlcnJvcj8ucmVzcG9uc2U/LnN0YXR1cyB8fCBIVFRQX1NUQVRVU19DT0RFUy5JTlRFUk5BTF9TRVJWRVJfRVJST1IsXG4gICAgICAgIHJlc3BvbnNlLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBjaGVja1Jlc3BvbnNlSXNEb3duKGNvbnRleHQsIHJlc3BvbnNlKSB7XG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gSFRUUF9TVEFUVVNfQ09ERVMuT0spIHtcbiAgICAgIC8vIEF2b2lkIFwiRXJyb3IgY29tbXVuaWNhdGluZyB3aXRoIHNvY2tldFwiIGxpa2UgZXJyb3JzXG4gICAgICBjb25zdCBzb2NrZXRFcnJvckNvZGVzID0gWzEwMTMsIDEwMTQsIDEwMTcsIDEwMTgsIDEwMTldO1xuICAgICAgY29uc3Qgc3RhdHVzID0gKHJlc3BvbnNlLmRhdGEgfHwge30pLnN0YXR1cyB8fCAxO1xuICAgICAgY29uc3QgaXNEb3duID0gc29ja2V0RXJyb3JDb2Rlcy5pbmNsdWRlcyhzdGF0dXMpO1xuXG4gICAgICBpc0Rvd24gJiZcbiAgICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZXJyb3IoXG4gICAgICAgICAgJ1NlcnZlciBBUEkgaXMgb25saW5lIGJ1dCB0aGUgc2VydmVyIGlzIG5vdCByZWFkeSB5ZXQnLFxuICAgICAgICApO1xuXG4gICAgICByZXR1cm4gaXNEb3duO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgbWFpbiBXYXp1aCBkYWVtb25zIHN0YXR1c1xuICAgKiBAcGFyYW0geyp9IGNvbnRleHQgRW5kcG9pbnQgY29udGV4dFxuICAgKiBAcGFyYW0geyp9IGFwaSBBUEkgZW50cnkgc3RvcmVkIGluIC53YXp1aFxuICAgKiBAcGFyYW0geyp9IHBhdGggT3B0aW9uYWwuIFdhenVoIEFQSSB0YXJnZXQgcGF0aC5cbiAgICovXG4gIGFzeW5jIGNoZWNrRGFlbW9ucyhjb250ZXh0LCBhcGksIHBhdGgpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjb250ZXh0LndhenVoLmFwaS5jbGllbnQuYXNJbnRlcm5hbFVzZXIucmVxdWVzdChcbiAgICAgICAgJ0dFVCcsXG4gICAgICAgICcvbWFuYWdlci9zdGF0dXMnLFxuICAgICAgICB7fSxcbiAgICAgICAgeyBhcGlIb3N0SUQ6IGFwaS5pZCB9LFxuICAgICAgKTtcblxuICAgICAgY29uc3QgZGFlbW9ucyA9XG4gICAgICAgICgoKChyZXNwb25zZSB8fCB7fSkuZGF0YSB8fCB7fSkuZGF0YSB8fCB7fSkuYWZmZWN0ZWRfaXRlbXMgfHwgW10pWzBdIHx8XG4gICAgICAgIHt9O1xuXG4gICAgICBjb25zdCBpc0NsdXN0ZXIgPVxuICAgICAgICAoKGFwaSB8fCB7fSkuY2x1c3Rlcl9pbmZvIHx8IHt9KS5zdGF0dXMgPT09ICdlbmFibGVkJyAmJlxuICAgICAgICB0eXBlb2YgZGFlbW9uc1snd2F6dWgtY2x1c3RlcmQnXSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgICBjb25zdCB3YXp1aGRiRXhpc3RzID0gdHlwZW9mIGRhZW1vbnNbJ3dhenVoLWRiJ10gIT09ICd1bmRlZmluZWQnO1xuXG4gICAgICBjb25zdCBleGVjZCA9IGRhZW1vbnNbJ3dhenVoLWV4ZWNkJ10gPT09ICdydW5uaW5nJztcbiAgICAgIGNvbnN0IG1vZHVsZXNkID0gZGFlbW9uc1snd2F6dWgtbW9kdWxlc2QnXSA9PT0gJ3J1bm5pbmcnO1xuICAgICAgY29uc3Qgd2F6dWhkYiA9IHdhenVoZGJFeGlzdHMgPyBkYWVtb25zWyd3YXp1aC1kYiddID09PSAncnVubmluZycgOiB0cnVlO1xuICAgICAgY29uc3QgY2x1c3RlcmQgPSBpc0NsdXN0ZXJcbiAgICAgICAgPyBkYWVtb25zWyd3YXp1aC1jbHVzdGVyZCddID09PSAncnVubmluZydcbiAgICAgICAgOiB0cnVlO1xuXG4gICAgICBjb25zdCBpc1ZhbGlkID0gZXhlY2QgJiYgbW9kdWxlc2QgJiYgd2F6dWhkYiAmJiBjbHVzdGVyZDtcblxuICAgICAgaXNWYWxpZCAmJiBjb250ZXh0LndhenVoLmxvZ2dlci5kZWJ1ZygnV2F6dWggaXMgcmVhZHknKTtcblxuICAgICAgaWYgKHBhdGggPT09ICcvcGluZycpIHtcbiAgICAgICAgcmV0dXJuIHsgaXNWYWxpZCB9O1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTZXJ2ZXIgbm90IHJlYWR5IHlldCcpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb250ZXh0LndhenVoLmxvZ2dlci5lcnJvcihlcnJvci5tZXNzYWdlIHx8IGVycm9yKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gICAgfVxuICB9XG5cbiAgc2xlZXAodGltZU1zKSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgdGltZU1zKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIHBlcmZvcm1zIGEgcmVxdWVzdCBvdmVyIFdhenVoIEFQSSBhbmQgcmV0dXJucyBpdHMgcmVzcG9uc2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZCBNZXRob2Q6IEdFVCwgUFVULCBQT1NULCBERUxFVEVcbiAgICogQHBhcmFtIHtTdHJpbmd9IHBhdGggQVBJIHJvdXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIGRhdGEgYW5kIHBhcmFtcyB0byBwZXJmb3JtIHRoZSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpZCBBUEkgaWRcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEFQSSByZXNwb25zZSBvciBFcnJvclJlc3BvbnNlXG4gICAqL1xuICBhc3luYyBtYWtlUmVxdWVzdChjb250ZXh0LCBtZXRob2QsIHBhdGgsIGRhdGEsIGlkLCByZXNwb25zZSkge1xuICAgIGNvbnN0IGRldlRvb2xzID0gISEoZGF0YSB8fCB7fSkuZGV2VG9vbHM7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBhcGk7XG4gICAgICB0cnkge1xuICAgICAgICBhcGkgPSBhd2FpdCBjb250ZXh0LndhenVoX2NvcmUubWFuYWdlSG9zdHMuZ2V0KGlkLCB7XG4gICAgICAgICAgZXhjbHVkZVBhc3N3b3JkOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmVycm9yKCdDb3VsZCBub3QgZ2V0IGhvc3QgY3JlZGVudGlhbHMnKTtcbiAgICAgICAgLy9DYW4gbm90IGdldCBjcmVkZW50aWFscyBmcm9tIHdhenVoLWhvc3RzXG4gICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICAgICdDb3VsZCBub3QgZ2V0IGhvc3QgY3JlZGVudGlhbHMnLFxuICAgICAgICAgIDMwMTEsXG4gICAgICAgICAgSFRUUF9TVEFUVVNfQ09ERVMuTk9UX0ZPVU5ELFxuICAgICAgICAgIHJlc3BvbnNlLFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGV2VG9vbHMpIHtcbiAgICAgICAgZGVsZXRlIGRhdGEuZGV2VG9vbHM7XG4gICAgICB9XG5cbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICBkYXRhID0ge307XG4gICAgICB9XG5cbiAgICAgIGlmICghZGF0YS5oZWFkZXJzKSB7XG4gICAgICAgIGRhdGEuaGVhZGVycyA9IHt9O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICBhcGlIb3N0SUQ6IGlkLFxuICAgICAgfTtcblxuICAgICAgLy8gU2V0IGNvbnRlbnQgdHlwZSBhcHBsaWNhdGlvbi94bWwgaWYgbmVlZGVkXG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiAoZGF0YSB8fCB7fSkuYm9keSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgKGRhdGEgfHwge30pLm9yaWdpbiA9PT0gJ3htbGVkaXRvcidcbiAgICAgICkge1xuICAgICAgICBkYXRhLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddID0gJ2FwcGxpY2F0aW9uL3htbCc7XG4gICAgICAgIGRlbGV0ZSBkYXRhLm9yaWdpbjtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgKGRhdGEgfHwge30pLmJvZHkgPT09ICdzdHJpbmcnICYmXG4gICAgICAgIChkYXRhIHx8IHt9KS5vcmlnaW4gPT09ICdqc29uJ1xuICAgICAgKSB7XG4gICAgICAgIGRhdGEuaGVhZGVyc1snY29udGVudC10eXBlJ10gPSAnYXBwbGljYXRpb24vanNvbic7XG4gICAgICAgIGRlbGV0ZSBkYXRhLm9yaWdpbjtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgKGRhdGEgfHwge30pLmJvZHkgPT09ICdzdHJpbmcnICYmXG4gICAgICAgIChkYXRhIHx8IHt9KS5vcmlnaW4gPT09ICdyYXcnXG4gICAgICApIHtcbiAgICAgICAgZGF0YS5oZWFkZXJzWydjb250ZW50LXR5cGUnXSA9ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nO1xuICAgICAgICBkZWxldGUgZGF0YS5vcmlnaW47XG4gICAgICB9XG4gICAgICBjb25zdCBkZWxheSA9IChkYXRhIHx8IHt9KS5kZWxheSB8fCAwO1xuICAgICAgaWYgKGRlbGF5KSB7XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgZGVsYXkgcGFyYW1ldGVyIHRoYXQgaXMgdXNlZCB0byBhZGQgdGhlIHNldmVyIEFQSSByZXF1ZXN0IHRvIHRoZSBxdWV1ZSBqb2IuXG4gICAgICAgIC8vIFRoaXMgYXNzdW1lcyB0aGUgZGVsYXkgcGFyYW1ldGVyIGlzIG5vdCB1c2VkIGFzIHBhcnQgb2YgdGhlIHNlcnZlciBBUEkgcmVxdWVzdC4gSWYgaXRcbiAgICAgICAgLy8gd2FzIGV4cGVjdGVkIHRvIGRvIGEgcmVxdWVzdCB3aXRoIGEgJ2RlbGF5JyBwYXJhbWV0ZXIgdGhlbiB3ZSB3b3VsZCBoYXZlIHRvIHNlYXJjaCBhXG4gICAgICAgIC8vIHdheSB0byBkaWZmZXJlbmNpYXRlIGlmIHRoZSBwYXJhbWV0ZXIgaXMgcmVsYXRlZCB0byBqb2IgcXVldWUgb3IgQVBJIHJlcXVlc3QuXG4gICAgICAgIGRlbGV0ZSBkYXRhLmRlbGF5O1xuICAgICAgICBhZGRKb2JUb1F1ZXVlKHtcbiAgICAgICAgICBzdGFydEF0OiBuZXcgRGF0ZShEYXRlLm5vdygpICsgZGVsYXkpLFxuICAgICAgICAgIHJ1bjogYXN5bmMgY29udGV4dEpvYiA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBhd2FpdCBjb250ZXh0LndhenVoLmFwaS5jbGllbnQuYXNDdXJyZW50VXNlci5yZXF1ZXN0KFxuICAgICAgICAgICAgICAgIG1ldGhvZCxcbiAgICAgICAgICAgICAgICBwYXRoLFxuICAgICAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgIGNvbnRleHRKb2Iud2F6dWgubG9nZ2VyLmVycm9yKFxuICAgICAgICAgICAgICAgIGBBbiBlcnJvciBvY3VycmVkIGluIHRoZSBkZWxheWVkIHJlcXVlc3Q6IFwiJHttZXRob2R9ICR7cGF0aH1cIjogJHtcbiAgICAgICAgICAgICAgICAgIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3JcbiAgICAgICAgICAgICAgICB9YCxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICBib2R5OiB7IGVycm9yOiAwLCBtZXNzYWdlOiAnU3VjY2VzcycgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXRoID09PSAnL3BpbmcnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgY2hlY2sgPSBhd2FpdCB0aGlzLmNoZWNrRGFlbW9ucyhjb250ZXh0LCBhcGksIHBhdGgpO1xuICAgICAgICAgIHJldHVybiBjaGVjaztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zdCBpc0Rvd24gPSAoZXJyb3IgfHwge30pLmNvZGUgPT09ICdFQ09OTlJFRlVTRUQnO1xuICAgICAgICAgIGlmICghaXNEb3duKSB7XG4gICAgICAgICAgICBjb250ZXh0LndhenVoLmxvZ2dlci5lcnJvcihcbiAgICAgICAgICAgICAgJ1NlcnZlciBBUEkgaXMgb25saW5lIGJ1dCB0aGUgc2VydmVyIGlzIG5vdCByZWFkeSB5ZXQnLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICAgICAgICBgRVJST1IzMDk5IC0gJHtlcnJvci5tZXNzYWdlIHx8ICdTZXJ2ZXIgbm90IHJlYWR5IHlldCd9YCxcbiAgICAgICAgICAgICAgMzA5OSxcbiAgICAgICAgICAgICAgSFRUUF9TVEFUVVNfQ09ERVMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLFxuICAgICAgICAgICAgICByZXNwb25zZSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKGAke21ldGhvZH0gJHtwYXRofWApO1xuXG4gICAgICBjb25zdCByZXNwb25zZVRva2VuID1cbiAgICAgICAgYXdhaXQgY29udGV4dC53YXp1aC5hcGkuY2xpZW50LmFzQ3VycmVudFVzZXIucmVxdWVzdChcbiAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgcGF0aCxcbiAgICAgICAgICBkYXRhLFxuICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICk7XG4gICAgICBjb25zdCByZXNwb25zZUlzRG93biA9IHRoaXMuY2hlY2tSZXNwb25zZUlzRG93bihjb250ZXh0LCByZXNwb25zZVRva2VuKTtcbiAgICAgIGlmIChyZXNwb25zZUlzRG93bikge1xuICAgICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShcbiAgICAgICAgICBgRVJST1IzMDk5IC0gJHtyZXNwb25zZS5ib2R5Lm1lc3NhZ2UgfHwgJ1NlcnZlciBub3QgcmVhZHkgeWV0J31gLFxuICAgICAgICAgIDMwOTksXG4gICAgICAgICAgSFRUUF9TVEFUVVNfQ09ERVMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLFxuICAgICAgICAgIHJlc3BvbnNlLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgbGV0IHJlc3BvbnNlQm9keSA9IChyZXNwb25zZVRva2VuIHx8IHt9KS5kYXRhIHx8IHt9O1xuICAgICAgaWYgKCFyZXNwb25zZUJvZHkpIHtcbiAgICAgICAgcmVzcG9uc2VCb2R5ID1cbiAgICAgICAgICB0eXBlb2YgcmVzcG9uc2VCb2R5ID09PSAnc3RyaW5nJyAmJlxuICAgICAgICAgIHBhdGguaW5jbHVkZXMoJy9maWxlcycpICYmXG4gICAgICAgICAgbWV0aG9kID09PSAnR0VUJ1xuICAgICAgICAgICAgPyAnICdcbiAgICAgICAgICAgIDogZmFsc2U7XG4gICAgICAgIHJlc3BvbnNlLmRhdGEgPSByZXNwb25zZUJvZHk7XG4gICAgICB9XG4gICAgICBjb25zdCByZXNwb25zZUVycm9yID1cbiAgICAgICAgcmVzcG9uc2Uuc3RhdHVzICE9PSBIVFRQX1NUQVRVU19DT0RFUy5PSyA/IHJlc3BvbnNlLnN0YXR1cyA6IGZhbHNlO1xuXG4gICAgICBpZiAoIXJlc3BvbnNlRXJyb3IgJiYgcmVzcG9uc2VCb2R5KSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgICAgYm9keTogcmVzcG9uc2VUb2tlbi5kYXRhLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3BvbnNlRXJyb3IgJiYgZGV2VG9vbHMpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICBib2R5OiByZXNwb25zZS5kYXRhLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHRocm93IHJlc3BvbnNlRXJyb3IgJiYgcmVzcG9uc2VCb2R5LmRldGFpbFxuICAgICAgICA/IHsgbWVzc2FnZTogcmVzcG9uc2VCb2R5LmRldGFpbCwgY29kZTogcmVzcG9uc2VFcnJvciB9XG4gICAgICAgIDogbmV3IEVycm9yKCdVbmV4cGVjdGVkIGVycm9yIGZldGNoaW5nIGRhdGEgZnJvbSB0aGUgQVBJJyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChcbiAgICAgICAgZXJyb3IgJiZcbiAgICAgICAgZXJyb3IucmVzcG9uc2UgJiZcbiAgICAgICAgZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSBIVFRQX1NUQVRVU19DT0RFUy5VTkFVVEhPUklaRURcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShcbiAgICAgICAgICBlcnJvci5tZXNzYWdlIHx8IGVycm9yLFxuICAgICAgICAgIGVycm9yLmNvZGUgPyBgQVBJIGVycm9yOiAke2Vycm9yLmNvZGV9YCA6IDMwMTMsXG4gICAgICAgICAgSFRUUF9TVEFUVVNfQ09ERVMuVU5BVVRIT1JJWkVELFxuICAgICAgICAgIHJlc3BvbnNlLFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY29uc3QgZXJyb3JNc2cgPSAoZXJyb3IucmVzcG9uc2UgfHwge30pLmRhdGEgfHwgZXJyb3IubWVzc2FnZTtcbiAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmVycm9yKGVycm9yTXNnIHx8IGVycm9yKTtcbiAgICAgIGlmIChkZXZUb29scykge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgIGJvZHk6IHsgZXJyb3I6ICczMDEzJywgbWVzc2FnZTogZXJyb3JNc2cgfHwgZXJyb3IgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoKGVycm9yIHx8IHt9KS5jb2RlICYmIEFwaUVycm9yRXF1aXZhbGVuY2VbZXJyb3IuY29kZV0pIHtcbiAgICAgICAgICBlcnJvci5tZXNzYWdlID0gQXBpRXJyb3JFcXVpdmFsZW5jZVtlcnJvci5jb2RlXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShcbiAgICAgICAgICBlcnJvck1zZy5kZXRhaWwgfHwgZXJyb3IsXG4gICAgICAgICAgZXJyb3IuY29kZSA/IGBBUEkgZXJyb3I6ICR7ZXJyb3IuY29kZX1gIDogMzAxMyxcbiAgICAgICAgICBIVFRQX1NUQVRVU19DT0RFUy5JTlRFUk5BTF9TRVJWRVJfRVJST1IsXG4gICAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgbWFrZSBhIHJlcXVlc3QgdG8gQVBJXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBhcGkgcmVzcG9uc2Ugb3IgRXJyb3JSZXNwb25zZVxuICAgKi9cbiAgcmVxdWVzdEFwaShcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgKSB7XG4gICAgY29uc3QgaWRBcGkgPSBnZXRDb29raWVWYWx1ZUJ5TmFtZShyZXF1ZXN0LmhlYWRlcnMuY29va2llLCAnd3otYXBpJyk7XG4gICAgaWYgKGlkQXBpICE9PSByZXF1ZXN0LmJvZHkuaWQpIHtcbiAgICAgIC8vIGlmIHRoZSBjdXJyZW50IHRva2VuIGJlbG9uZ3MgdG8gYSBkaWZmZXJlbnQgQVBJIGlkLCB3ZSByZWxvZ2luIHRvIG9idGFpbiBhIG5ldyB0b2tlblxuICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoXG4gICAgICAgICdzdGF0dXMgY29kZSA0MDEnLFxuICAgICAgICBIVFRQX1NUQVRVU19DT0RFUy5VTkFVVEhPUklaRUQsXG4gICAgICAgIEhUVFBfU1RBVFVTX0NPREVTLlVOQVVUSE9SSVpFRCxcbiAgICAgICAgcmVzcG9uc2UsXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIXJlcXVlc3QuYm9keS5tZXRob2QpIHtcbiAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKFxuICAgICAgICAnTWlzc2luZyBwYXJhbTogbWV0aG9kJyxcbiAgICAgICAgMzAxNSxcbiAgICAgICAgSFRUUF9TVEFUVVNfQ09ERVMuQkFEX1JFUVVFU1QsXG4gICAgICAgIHJlc3BvbnNlLFxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKCFyZXF1ZXN0LmJvZHkubWV0aG9kLm1hdGNoKC9eKD86R0VUfFBVVHxQT1NUfERFTEVURSkkLykpIHtcbiAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmVycm9yKCdSZXF1ZXN0IG1ldGhvZCBpcyBub3QgdmFsaWQuJyk7XG4gICAgICAvL01ldGhvZCBpcyBub3QgYSB2YWxpZCBIVFRQIHJlcXVlc3QgbWV0aG9kXG4gICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShcbiAgICAgICAgJ1JlcXVlc3QgbWV0aG9kIGlzIG5vdCB2YWxpZC4nLFxuICAgICAgICAzMDE1LFxuICAgICAgICBIVFRQX1NUQVRVU19DT0RFUy5CQURfUkVRVUVTVCxcbiAgICAgICAgcmVzcG9uc2UsXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoIXJlcXVlc3QuYm9keS5wYXRoKSB7XG4gICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShcbiAgICAgICAgJ01pc3NpbmcgcGFyYW06IHBhdGgnLFxuICAgICAgICAzMDE2LFxuICAgICAgICBIVFRQX1NUQVRVU19DT0RFUy5CQURfUkVRVUVTVCxcbiAgICAgICAgcmVzcG9uc2UsXG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoIXJlcXVlc3QuYm9keS5wYXRoLnN0YXJ0c1dpdGgoJy8nKSkge1xuICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZXJyb3IoJ1JlcXVlc3QgcGF0aCBpcyBub3QgdmFsaWQuJyk7XG4gICAgICAvL1BhdGggZG9lc24ndCBzdGFydCB3aXRoICcvJ1xuICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoXG4gICAgICAgICdSZXF1ZXN0IHBhdGggaXMgbm90IHZhbGlkLicsXG4gICAgICAgIDMwMTUsXG4gICAgICAgIEhUVFBfU1RBVFVTX0NPREVTLkJBRF9SRVFVRVNULFxuICAgICAgICByZXNwb25zZSxcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLm1ha2VSZXF1ZXN0KFxuICAgICAgICBjb250ZXh0LFxuICAgICAgICByZXF1ZXN0LmJvZHkubWV0aG9kLFxuICAgICAgICByZXF1ZXN0LmJvZHkucGF0aCxcbiAgICAgICAgcmVxdWVzdC5ib2R5LmJvZHksXG4gICAgICAgIHJlcXVlc3QuYm9keS5pZCxcbiAgICAgICAgcmVzcG9uc2UsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZnVsbCBkYXRhIG9uIENTViBmb3JtYXQgZnJvbSBhIGxpc3QgV2F6dWggQVBJIGVuZHBvaW50XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjdHhcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlcXVlc3RcbiAgICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IGNzdiBvciBFcnJvclJlc3BvbnNlXG4gICAqL1xuICBhc3luYyBjc3YoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gICkge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIXJlcXVlc3QuYm9keSB8fCAhcmVxdWVzdC5ib2R5LnBhdGgpXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRmllbGQgcGF0aCBpcyByZXF1aXJlZCcpO1xuICAgICAgaWYgKCFyZXF1ZXN0LmJvZHkuaWQpIHRocm93IG5ldyBFcnJvcignRmllbGQgaWQgaXMgcmVxdWlyZWQnKTtcblxuICAgICAgY29uc3QgZmlsdGVycyA9IEFycmF5LmlzQXJyYXkoKChyZXF1ZXN0IHx8IHt9KS5ib2R5IHx8IHt9KS5maWx0ZXJzKVxuICAgICAgICA/IHJlcXVlc3QuYm9keS5maWx0ZXJzXG4gICAgICAgIDogW107XG5cbiAgICAgIGxldCB0bXBQYXRoID0gcmVxdWVzdC5ib2R5LnBhdGg7XG5cbiAgICAgIGlmICh0bXBQYXRoICYmIHR5cGVvZiB0bXBQYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgICB0bXBQYXRoID0gdG1wUGF0aFswXSA9PT0gJy8nID8gdG1wUGF0aC5zdWJzdHIoMSkgOiB0bXBQYXRoO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXRtcFBhdGgpIHRocm93IG5ldyBFcnJvcignQW4gZXJyb3Igb2NjdXJyZWQgcGFyc2luZyBwYXRoIGZpZWxkJyk7XG5cbiAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmRlYnVnKGBSZXBvcnQgJHt0bXBQYXRofWApO1xuICAgICAgLy8gUmVhbCBsaW1pdCwgcmVnYXJkbGVzcyB0aGUgdXNlciBxdWVyeVxuICAgICAgY29uc3QgcGFyYW1zID0geyBsaW1pdDogNTAwIH07XG5cbiAgICAgIGlmIChmaWx0ZXJzLmxlbmd0aCkge1xuICAgICAgICBmb3IgKGNvbnN0IGZpbHRlciBvZiBmaWx0ZXJzKSB7XG4gICAgICAgICAgaWYgKCFmaWx0ZXIubmFtZSB8fCAhZmlsdGVyLnZhbHVlKSBjb250aW51ZTtcbiAgICAgICAgICBwYXJhbXNbZmlsdGVyLm5hbWVdID0gZmlsdGVyLnZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBpdGVtc0FycmF5ID0gW107XG5cbiAgICAgIGNvbnN0IG91dHB1dCA9IGF3YWl0IGNvbnRleHQud2F6dWguYXBpLmNsaWVudC5hc0N1cnJlbnRVc2VyLnJlcXVlc3QoXG4gICAgICAgICdHRVQnLFxuICAgICAgICBgLyR7dG1wUGF0aH1gLFxuICAgICAgICB7IHBhcmFtczogcGFyYW1zIH0sXG4gICAgICAgIHsgYXBpSG9zdElEOiByZXF1ZXN0LmJvZHkuaWQgfSxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGlzTGlzdCA9XG4gICAgICAgIHJlcXVlc3QuYm9keS5wYXRoLmluY2x1ZGVzKCcvbGlzdHMnKSAmJlxuICAgICAgICByZXF1ZXN0LmJvZHkuZmlsdGVycyAmJlxuICAgICAgICByZXF1ZXN0LmJvZHkuZmlsdGVycy5sZW5ndGggJiZcbiAgICAgICAgcmVxdWVzdC5ib2R5LmZpbHRlcnMuZmluZChmaWx0ZXIgPT4gZmlsdGVyLl9pc0NEQkxpc3QpO1xuXG4gICAgICBjb25zdCB0b3RhbEl0ZW1zID0gKCgob3V0cHV0IHx8IHt9KS5kYXRhIHx8IHt9KS5kYXRhIHx8IHt9KVxuICAgICAgICAudG90YWxfYWZmZWN0ZWRfaXRlbXM7XG5cbiAgICAgIGlmICh0b3RhbEl0ZW1zICYmICFpc0xpc3QpIHtcbiAgICAgICAgcGFyYW1zLm9mZnNldCA9IDA7XG4gICAgICAgIGl0ZW1zQXJyYXkucHVzaCguLi5vdXRwdXQuZGF0YS5kYXRhLmFmZmVjdGVkX2l0ZW1zKTtcbiAgICAgICAgd2hpbGUgKGl0ZW1zQXJyYXkubGVuZ3RoIDwgdG90YWxJdGVtcyAmJiBwYXJhbXMub2Zmc2V0IDwgdG90YWxJdGVtcykge1xuICAgICAgICAgIHBhcmFtcy5vZmZzZXQgKz0gcGFyYW1zLmxpbWl0O1xuICAgICAgICAgIGNvbnN0IHRtcERhdGEgPSBhd2FpdCBjb250ZXh0LndhenVoLmFwaS5jbGllbnQuYXNDdXJyZW50VXNlci5yZXF1ZXN0KFxuICAgICAgICAgICAgJ0dFVCcsXG4gICAgICAgICAgICBgLyR7dG1wUGF0aH1gLFxuICAgICAgICAgICAgeyBwYXJhbXM6IHBhcmFtcyB9LFxuICAgICAgICAgICAgeyBhcGlIb3N0SUQ6IHJlcXVlc3QuYm9keS5pZCB9LFxuICAgICAgICAgICk7XG4gICAgICAgICAgaXRlbXNBcnJheS5wdXNoKC4uLnRtcERhdGEuZGF0YS5kYXRhLmFmZmVjdGVkX2l0ZW1zKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodG90YWxJdGVtcykge1xuICAgICAgICBjb25zdCB7IHBhdGgsIGZpbHRlcnMgfSA9IHJlcXVlc3QuYm9keTtcbiAgICAgICAgY29uc3QgaXNBcnJheU9mTGlzdHMgPSBwYXRoLmluY2x1ZGVzKCcvbGlzdHMnKSAmJiAhaXNMaXN0O1xuICAgICAgICBjb25zdCBpc0FnZW50cyA9IHBhdGguaW5jbHVkZXMoJy9hZ2VudHMnKSAmJiAhcGF0aC5pbmNsdWRlcygnZ3JvdXBzJyk7XG4gICAgICAgIGNvbnN0IGlzQWdlbnRzT2ZHcm91cCA9IHBhdGguc3RhcnRzV2l0aCgnL2FnZW50cy9ncm91cHMvJyk7XG4gICAgICAgIGNvbnN0IGlzRmlsZXMgPSBwYXRoLmVuZHNXaXRoKCcvZmlsZXMnKTtcbiAgICAgICAgbGV0IGZpZWxkcyA9IE9iamVjdC5rZXlzKG91dHB1dC5kYXRhLmRhdGEuYWZmZWN0ZWRfaXRlbXNbMF0pO1xuXG4gICAgICAgIGlmIChpc0FnZW50cyB8fCBpc0FnZW50c09mR3JvdXApIHtcbiAgICAgICAgICBpZiAoaXNGaWxlcykge1xuICAgICAgICAgICAgZmllbGRzID0gWydmaWxlbmFtZScsICdoYXNoJ107XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZpZWxkcyA9IFtcbiAgICAgICAgICAgICAgJ2lkJyxcbiAgICAgICAgICAgICAgJ3N0YXR1cycsXG4gICAgICAgICAgICAgICduYW1lJyxcbiAgICAgICAgICAgICAgJ2lwJyxcbiAgICAgICAgICAgICAgJ2dyb3VwJyxcbiAgICAgICAgICAgICAgJ21hbmFnZXInLFxuICAgICAgICAgICAgICAnbm9kZV9uYW1lJyxcbiAgICAgICAgICAgICAgJ2RhdGVBZGQnLFxuICAgICAgICAgICAgICAndmVyc2lvbicsXG4gICAgICAgICAgICAgICdsYXN0S2VlcEFsaXZlJyxcbiAgICAgICAgICAgICAgJ29zLmFyY2gnLFxuICAgICAgICAgICAgICAnb3MuYnVpbGQnLFxuICAgICAgICAgICAgICAnb3MuY29kZW5hbWUnLFxuICAgICAgICAgICAgICAnb3MubWFqb3InLFxuICAgICAgICAgICAgICAnb3MubWlub3InLFxuICAgICAgICAgICAgICAnb3MubmFtZScsXG4gICAgICAgICAgICAgICdvcy5wbGF0Zm9ybScsXG4gICAgICAgICAgICAgICdvcy51bmFtZScsXG4gICAgICAgICAgICAgICdvcy52ZXJzaW9uJyxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzQXJyYXlPZkxpc3RzKSB7XG4gICAgICAgICAgY29uc3QgZmxhdExpc3RzID0gW107XG4gICAgICAgICAgZm9yIChjb25zdCBsaXN0IG9mIGl0ZW1zQXJyYXkpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgcmVsYXRpdmVfZGlybmFtZSwgaXRlbXMgfSA9IGxpc3Q7XG4gICAgICAgICAgICBmbGF0TGlzdHMucHVzaChcbiAgICAgICAgICAgICAgLi4uaXRlbXMubWFwKGl0ZW0gPT4gKHtcbiAgICAgICAgICAgICAgICByZWxhdGl2ZV9kaXJuYW1lLFxuICAgICAgICAgICAgICAgIGtleTogaXRlbS5rZXksXG4gICAgICAgICAgICAgICAgdmFsdWU6IGl0ZW0udmFsdWUsXG4gICAgICAgICAgICAgIH0pKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZpZWxkcyA9IFsncmVsYXRpdmVfZGlybmFtZScsICdrZXknLCAndmFsdWUnXTtcbiAgICAgICAgICBpdGVtc0FycmF5ID0gWy4uLmZsYXRMaXN0c107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNMaXN0KSB7XG4gICAgICAgICAgZmllbGRzID0gWydrZXknLCAndmFsdWUnXTtcbiAgICAgICAgICBpdGVtc0FycmF5ID0gb3V0cHV0LmRhdGEuZGF0YS5hZmZlY3RlZF9pdGVtc1swXS5pdGVtcztcbiAgICAgICAgfVxuICAgICAgICBmaWVsZHMgPSBmaWVsZHMubWFwKGl0ZW0gPT4gKHsgdmFsdWU6IGl0ZW0sIGRlZmF1bHQ6ICctJyB9KSk7XG5cbiAgICAgICAgY29uc3QganNvbjJjc3ZQYXJzZXIgPSBuZXcgUGFyc2VyKHsgZmllbGRzIH0pO1xuXG4gICAgICAgIGxldCBjc3YgPSBqc29uMmNzdlBhcnNlci5wYXJzZShpdGVtc0FycmF5KTtcbiAgICAgICAgZm9yIChjb25zdCBmaWVsZCBvZiBmaWVsZHMpIHtcbiAgICAgICAgICBjb25zdCB7IHZhbHVlIH0gPSBmaWVsZDtcbiAgICAgICAgICBpZiAoY3N2LmluY2x1ZGVzKHZhbHVlKSkge1xuICAgICAgICAgICAgY3N2ID0gY3N2LnJlcGxhY2UodmFsdWUsIEtleUVxdWl2YWxlbmNlW3ZhbHVlXSB8fCB2YWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAndGV4dC9jc3YnIH0sXG4gICAgICAgICAgYm9keTogY3N2LFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIG91dHB1dCAmJlxuICAgICAgICBvdXRwdXQuZGF0YSAmJlxuICAgICAgICBvdXRwdXQuZGF0YS5kYXRhICYmXG4gICAgICAgICFvdXRwdXQuZGF0YS5kYXRhLnRvdGFsX2FmZmVjdGVkX2l0ZW1zXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyByZXN1bHRzJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYEFuIGVycm9yIG9jY3VycmVkIGZldGNoaW5nIGRhdGEgZnJvbSB0aGUgV2F6dWggQVBJJHtcbiAgICAgICAgICAgIG91dHB1dCAmJiBvdXRwdXQuZGF0YSAmJiBvdXRwdXQuZGF0YS5kZXRhaWxcbiAgICAgICAgICAgICAgPyBgOiAke291dHB1dC5ib2R5LmRldGFpbH1gXG4gICAgICAgICAgICAgIDogJydcbiAgICAgICAgICB9YCxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShcbiAgICAgICAgZXJyb3IubWVzc2FnZSB8fCBlcnJvcixcbiAgICAgICAgMzAzNCxcbiAgICAgICAgSFRUUF9TVEFUVVNfQ09ERVMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLFxuICAgICAgICByZXNwb25zZSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLy8gR2V0IGRlIGxpc3Qgb2YgYXZhaWxhYmxlIHJlcXVlc3RzIGluIHRoZSBBUElcbiAgZ2V0UmVxdWVzdExpc3QoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gICkge1xuICAgIC8vUmVhZCBhIHN0YXRpYyBKU09OIHVudGlsIHRoZSBhcGkgY2FsbCBoYXMgaW1wbGVtZW50ZWRcbiAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgYm9keTogYXBpUmVxdWVzdExpc3QsXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBnZXQgdGhlIHdhenVoIHNldHVwIHNldHRpbmdzXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZVxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBzZXR1cCBpbmZvIG9yIEVycm9yUmVzcG9uc2VcbiAgICovXG4gIGFzeW5jIGdldFNldHVwSW5mbyhcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiBIVFRQX1NUQVRVU19DT0RFUy5PSyxcbiAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAnYXBwLXZlcnNpb24nOiBwbHVnaW5WZXJzaW9uLFxuICAgICAgICAgICAgcmV2aXNpb246IHBsdWdpblJldmlzaW9uLFxuICAgICAgICAgICAgY29uZmlndXJhdGlvbl9maWxlOiBjb250ZXh0LndhenVoX2NvcmUuY29uZmlndXJhdGlvbi5zdG9yZS5maWxlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29udGV4dC53YXp1aC5sb2dnZXIuZXJyb3IoZXJyb3IubWVzc2FnZSB8fCBlcnJvcik7XG4gICAgICByZXR1cm4gRXJyb3JSZXNwb25zZShcbiAgICAgICAgYENvdWxkIG5vdCBnZXQgZGF0YSBmcm9tIHdhenVoLXZlcnNpb24gcmVnaXN0cnkgZHVlIHRvICR7XG4gICAgICAgICAgZXJyb3IubWVzc2FnZSB8fCBlcnJvclxuICAgICAgICB9YCxcbiAgICAgICAgNDAwNSxcbiAgICAgICAgSFRUUF9TVEFUVVNfQ09ERVMuSU5URVJOQUxfU0VSVkVSX0VSUk9SLFxuICAgICAgICByZXNwb25zZSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBiYXNpYyBzeXNjb2xsZWN0b3IgaW5mb3JtYXRpb24gZm9yIGdpdmVuIGFnZW50LlxuICAgKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVxdWVzdFxuICAgKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2VcbiAgICogQHJldHVybnMge09iamVjdH0gQmFzaWMgc3lzY29sbGVjdG9yIGluZm9ybWF0aW9uXG4gICAqL1xuICBhc3luYyBnZXRTeXNjb2xsZWN0b3IoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gICkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBhcGlIb3N0SUQgPSBnZXRDb29raWVWYWx1ZUJ5TmFtZShyZXF1ZXN0LmhlYWRlcnMuY29va2llLCAnd3otYXBpJyk7XG4gICAgICBpZiAoIXJlcXVlc3QucGFyYW1zIHx8ICFhcGlIb3N0SUQgfHwgIXJlcXVlc3QucGFyYW1zLmFnZW50KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQWdlbnQgSUQgYW5kIEFQSSBJRCBhcmUgcmVxdWlyZWQnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBhZ2VudCB9ID0gcmVxdWVzdC5wYXJhbXM7XG5cbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIGNvbnRleHQud2F6dWguYXBpLmNsaWVudC5hc0ludGVybmFsVXNlci5yZXF1ZXN0KFxuICAgICAgICAgICdHRVQnLFxuICAgICAgICAgIGAvc3lzY29sbGVjdG9yLyR7YWdlbnR9L2hhcmR3YXJlYCxcbiAgICAgICAgICB7fSxcbiAgICAgICAgICB7IGFwaUhvc3RJRCB9LFxuICAgICAgICApLFxuICAgICAgICBjb250ZXh0LndhenVoLmFwaS5jbGllbnQuYXNJbnRlcm5hbFVzZXIucmVxdWVzdChcbiAgICAgICAgICAnR0VUJyxcbiAgICAgICAgICBgL3N5c2NvbGxlY3Rvci8ke2FnZW50fS9vc2AsXG4gICAgICAgICAge30sXG4gICAgICAgICAgeyBhcGlIb3N0SUQgfSxcbiAgICAgICAgKSxcbiAgICAgIF0pO1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBkYXRhLm1hcChpdGVtID0+IChpdGVtLmRhdGEgfHwge30pLmRhdGEgfHwgW10pO1xuICAgICAgY29uc3QgW2hhcmR3YXJlUmVzcG9uc2UsIG9zUmVzcG9uc2VdID0gcmVzdWx0O1xuXG4gICAgICAvLyBGaWxsIHN5c2NvbGxlY3RvciBvYmplY3RcbiAgICAgIGNvbnN0IHN5c2NvbGxlY3RvciA9IHtcbiAgICAgICAgaGFyZHdhcmU6XG4gICAgICAgICAgdHlwZW9mIGhhcmR3YXJlUmVzcG9uc2UgPT09ICdvYmplY3QnICYmXG4gICAgICAgICAgT2JqZWN0LmtleXMoaGFyZHdhcmVSZXNwb25zZSkubGVuZ3RoXG4gICAgICAgICAgICA/IHsgLi4uaGFyZHdhcmVSZXNwb25zZS5hZmZlY3RlZF9pdGVtc1swXSB9XG4gICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgICBvczpcbiAgICAgICAgICB0eXBlb2Ygb3NSZXNwb25zZSA9PT0gJ29iamVjdCcgJiYgT2JqZWN0LmtleXMob3NSZXNwb25zZSkubGVuZ3RoXG4gICAgICAgICAgICA/IHsgLi4ub3NSZXNwb25zZS5hZmZlY3RlZF9pdGVtc1swXSB9XG4gICAgICAgICAgICA6IGZhbHNlLFxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgYm9keTogc3lzY29sbGVjdG9yLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmVycm9yKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoXG4gICAgICAgIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IsXG4gICAgICAgIDMwMzUsXG4gICAgICAgIEhUVFBfU1RBVFVTX0NPREVTLklOVEVSTkFMX1NFUlZFUl9FUlJPUixcbiAgICAgICAgcmVzcG9uc2UsXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGN1c3RvbSBsb2dvcyBjb25maWd1cmF0aW9uIChwYXRoKVxuICAgKiBAcGFyYW0gY29udGV4dFxuICAgKiBAcGFyYW0gcmVxdWVzdFxuICAgKiBAcGFyYW0gcmVzcG9uc2VcbiAgICovXG4gIGFzeW5jIGdldEFwcExvZ29zKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICApIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgQVBQX0xPR08gPSAnY3VzdG9taXphdGlvbi5sb2dvLmFwcCc7XG4gICAgICBjb25zdCBIRUFMVEhDSEVDS19MT0dPID0gJ2N1c3RvbWl6YXRpb24ubG9nby5oZWFsdGhjaGVjayc7XG5cbiAgICAgIGNvbnN0IGxvZ29zID0ge1xuICAgICAgICBbQVBQX0xPR09dOlxuICAgICAgICAgIGF3YWl0IGNvbnRleHQud2F6dWhfY29yZS5jb25maWd1cmF0aW9uLmdldEN1c3RvbWl6YXRpb25TZXR0aW5nKFxuICAgICAgICAgICAgQVBQX0xPR08sXG4gICAgICAgICAgKSxcbiAgICAgICAgW0hFQUxUSENIRUNLX0xPR09dOlxuICAgICAgICAgIGF3YWl0IGNvbnRleHQud2F6dWhfY29yZS5jb25maWd1cmF0aW9uLmdldEN1c3RvbWl6YXRpb25TZXR0aW5nKFxuICAgICAgICAgICAgSEVBTFRIQ0hFQ0tfTE9HTyxcbiAgICAgICAgICApLFxuICAgICAgfTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgYm9keTogeyBsb2dvcyB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnRleHQud2F6dWgubG9nZ2VyLmVycm9yKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IpO1xuICAgICAgcmV0dXJuIEVycm9yUmVzcG9uc2UoXG4gICAgICAgIGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IsXG4gICAgICAgIDMwMzUsXG4gICAgICAgIEhUVFBfU1RBVFVTX0NPREVTLklOVEVSTkFMX1NFUlZFUl9FUlJPUixcbiAgICAgICAgcmVzcG9uc2UsXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFhQSxJQUFBQSxjQUFBLEdBQUFDLE9BQUE7QUFDQSxJQUFBQyxT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