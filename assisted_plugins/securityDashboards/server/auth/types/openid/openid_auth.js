"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenIdAuthentication = void 0;
var fs = _interopRequireWildcard(require("fs"));
var _wreck = _interopRequireDefault(require("@hapi/wreck"));
var _http = _interopRequireDefault(require("http"));
var _https = _interopRequireDefault(require("https"));
var _security_cookie = require("../../../session/security_cookie");
var _routes = require("./routes");
var _authentication_type = require("../authentication_type");
var _helper = require("./helper");
var _object_properties_defined = require("../../../utils/object_properties_defined");
var _common = require("../../../../common");
var _cookie_splitter = require("../../../session/cookie_splitter");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /*
 *   Copyright OpenSearch Contributors
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */
class OpenIdAuthentication extends _authentication_type.AuthenticationType {
  constructor(config, sessionStorageFactory, router, esClient, core, logger) {
    var _this$config$openid, _this$config$openid2;
    super(config, sessionStorageFactory, router, esClient, core, logger);
    _defineProperty(this, "type", _common.AuthType.OPEN_ID);
    _defineProperty(this, "openIdAuthConfig", void 0);
    _defineProperty(this, "authHeaderName", void 0);
    _defineProperty(this, "openIdConnectUrl", void 0);
    _defineProperty(this, "wreckClient", void 0);
    _defineProperty(this, "wreckHttpsOption", {});
    _defineProperty(this, "redirectOIDCCapture", (request, toolkit) => {
      const nextUrl = this.generateNextUrl(request);
      const clearOldVersionCookie = (0, _security_cookie.clearOldVersionCookieValue)(this.config);
      return toolkit.redirected({
        location: `${this.coreSetup.http.basePath.serverBasePath}/auth/openid/captureUrlFragment?nextUrl=${nextUrl}`,
        'set-cookie': clearOldVersionCookie
      });
    });
    this.wreckClient = this.createWreckClient();
    this.openIdAuthConfig = {};
    this.authHeaderName = ((_this$config$openid = this.config.openid) === null || _this$config$openid === void 0 ? void 0 : _this$config$openid.header) || '';
    this.openIdAuthConfig.authHeaderName = this.authHeaderName;
    this.openIdConnectUrl = ((_this$config$openid2 = this.config.openid) === null || _this$config$openid2 === void 0 ? void 0 : _this$config$openid2.connect_url) || '';
    let scope = this.config.openid.scope;
    if (scope.indexOf('openid') < 0) {
      scope = `openid ${scope}`;
    }
    this.openIdAuthConfig.scope = scope;
  }
  async init() {
    try {
      const response = await this.wreckClient.get(this.openIdConnectUrl);
      const payload = JSON.parse(response.payload);
      this.openIdAuthConfig.authorizationEndpoint = payload.authorization_endpoint;
      this.openIdAuthConfig.tokenEndpoint = payload.token_endpoint;
      this.openIdAuthConfig.endSessionEndpoint = payload.end_session_endpoint || undefined;
      this.createExtraStorage();
      const routes = new _routes.OpenIdAuthRoutes(this.router, this.config, this.sessionStorageFactory, this.openIdAuthConfig, this.securityClient, this.coreSetup, this.wreckClient);
      routes.setupRoutes();
    } catch (error) {
      this.logger.error(error); // TODO: log more info
      throw new Error('Failed when trying to obtain the endpoints from your IdP');
    }
  }
  generateNextUrl(request) {
    const path = this.coreSetup.http.basePath.serverBasePath + (request.url.pathname || '/app/opensearch-dashboards');
    return escape(path);
  }
  createWreckClient() {
    var _this$config$openid3, _this$config$openid4, _this$config$openid5, _this$config$openid6, _this$config$openid7, _this$config$openid9;
    if ((_this$config$openid3 = this.config.openid) !== null && _this$config$openid3 !== void 0 && _this$config$openid3.root_ca) {
      this.wreckHttpsOption.ca = [fs.readFileSync(this.config.openid.root_ca)];
      this.logger.debug(`Using CA Cert: ${this.config.openid.root_ca}`);
    }
    if ((_this$config$openid4 = this.config.openid) !== null && _this$config$openid4 !== void 0 && _this$config$openid4.pfx) {
      // Use PFX or PKCS12 if provided
      this.logger.debug(`Using PFX or PKCS12: ${this.config.openid.pfx}`);
      this.wreckHttpsOption.pfx = [fs.readFileSync(this.config.openid.pfx)];
    } else if ((_this$config$openid5 = this.config.openid) !== null && _this$config$openid5 !== void 0 && _this$config$openid5.certificate && (_this$config$openid6 = this.config.openid) !== null && _this$config$openid6 !== void 0 && _this$config$openid6.private_key) {
      // Use 'certificate' and 'private_key' if provided
      this.logger.debug(`Using Certificate: ${this.config.openid.certificate}`);
      this.logger.debug(`Using Private Key: ${this.config.openid.private_key}`);
      this.wreckHttpsOption.cert = [fs.readFileSync(this.config.openid.certificate)];
      this.wreckHttpsOption.key = [fs.readFileSync(this.config.openid.private_key)];
    } else {
      this.logger.debug(`Client certificates not provided. Mutual TLS will not be used to obtain endpoints.`);
    }
    // Check if passphrase is provided, use it for 'pfx' and 'key'
    if (((_this$config$openid7 = this.config.openid) === null || _this$config$openid7 === void 0 ? void 0 : _this$config$openid7.passphrase) !== '') {
      var _this$config$openid8;
      this.logger.debug(`Passphrase not provided for private key and/or pfx.`);
      this.wreckHttpsOption.passphrase = (_this$config$openid8 = this.config.openid) === null || _this$config$openid8 === void 0 ? void 0 : _this$config$openid8.passphrase;
    }
    if (((_this$config$openid9 = this.config.openid) === null || _this$config$openid9 === void 0 ? void 0 : _this$config$openid9.verify_hostnames) === false) {
      this.logger.debug(`openId auth 'verify_hostnames' option is off.`);
      this.wreckHttpsOption.checkServerIdentity = (host, cert) => {
        return undefined;
      };
    }
    this.logger.info((0, _object_properties_defined.getObjectProperties)(this.wreckHttpsOption, 'WreckHttpsOptions'));
    if (Object.keys(this.wreckHttpsOption).length > 0) {
      return _wreck.default.defaults({
        agents: {
          http: new _http.default.Agent(),
          https: new _https.default.Agent(this.wreckHttpsOption),
          httpsAllowUnauthorized: new _https.default.Agent({
            rejectUnauthorized: false
          })
        }
      });
    } else {
      return _wreck.default;
    }
  }
  getWreckHttpsOptions() {
    return this.wreckHttpsOption;
  }
  createExtraStorage() {
    // @ts-ignore
    const hapiServer = this.sessionStorageFactory.asScoped({}).server;
    const extraCookiePrefix = this.config.openid.extra_storage.cookie_prefix;
    const extraCookieSettings = {
      isSecure: this.config.cookie.secure,
      isSameSite: this.config.cookie.isSameSite,
      password: this.config.cookie.password,
      domain: this.config.cookie.domain,
      path: this.coreSetup.http.basePath.serverBasePath || '/',
      clearInvalid: false,
      isHttpOnly: true,
      ignoreErrors: true,
      encoding: 'iron' // Same as hapi auth cookie
    };

    for (let i = 1; i <= this.config.openid.extra_storage.additional_cookies; i++) {
      hapiServer.states.add(extraCookiePrefix + i, extraCookieSettings);
    }
  }
  getExtraAuthStorageOptions() {
    // If we're here, we will always have the openid configuration
    return {
      cookiePrefix: this.config.openid.extra_storage.cookie_prefix,
      additionalCookies: this.config.openid.extra_storage.additional_cookies,
      logger: this.logger
    };
  }
  requestIncludesAuthInfo(request) {
    return request.headers.authorization ? true : false;
  }
  async getAdditionalAuthHeader(request) {
    return {};
  }
  getCookie(request, authInfo) {
    (0, _cookie_splitter.setExtraAuthStorage)(request, request.headers.authorization, this.getExtraAuthStorageOptions());
    return {
      username: authInfo.user_name,
      credentials: {
        authHeaderValueExtra: true
      },
      authType: this.type,
      expiryTime: Date.now() + this.config.session.ttl
    };
  }

  // OIDC expiry time is set by the IDP and refreshed via refreshTokens
  getKeepAliveExpiry(cookie, request) {
    return cookie.expiryTime;
  }

  // TODO: Add token expiration check here
  async isValidCookie(cookie, request) {
    var _cookie$credentials;
    if (cookie.authType !== this.type || !cookie.username || !cookie.expiryTime || !((_cookie$credentials = cookie.credentials) !== null && _cookie$credentials !== void 0 && _cookie$credentials.authHeaderValue) && !this.getExtraAuthStorageValue(request, cookie)) {
      return false;
    }
    if (cookie.expiryTime > Date.now()) {
      return true;
    }

    // need to renew id token
    if (cookie.credentials.refresh_token) {
      try {
        var _this$config$openid10, _this$config$openid11;
        const query = {
          grant_type: 'refresh_token',
          client_id: (_this$config$openid10 = this.config.openid) === null || _this$config$openid10 === void 0 ? void 0 : _this$config$openid10.client_id,
          client_secret: (_this$config$openid11 = this.config.openid) === null || _this$config$openid11 === void 0 ? void 0 : _this$config$openid11.client_secret,
          refresh_token: cookie.credentials.refresh_token
        };
        const refreshTokenResponse = await (0, _helper.callTokenEndpoint)(this.openIdAuthConfig.tokenEndpoint, query, this.wreckClient);

        // if no id_token from refresh token call, maybe the Idp doesn't allow refresh id_token
        if (refreshTokenResponse.idToken) {
          cookie.credentials = {
            authHeaderValueExtra: true,
            refresh_token: refreshTokenResponse.refreshToken
          };
          cookie.expiryTime = (0, _helper.getExpirationDate)(refreshTokenResponse);
          (0, _cookie_splitter.setExtraAuthStorage)(request, `Bearer ${refreshTokenResponse.idToken}`, this.getExtraAuthStorageOptions());
          return true;
        } else {
          return false;
        }
      } catch (error) {
        this.logger.error(error);
        return false;
      }
    } else {
      // no refresh token, and current token is expired
      return false;
    }
  }
  handleUnauthedRequest(request, response, toolkit) {
    if (this.isPageRequest(request)) {
      return this.redirectOIDCCapture(request, toolkit);
    } else {
      return response.unauthorized();
    }
  }
  getExtraAuthStorageValue(request, cookie) {
    var _cookie$credentials2;
    let extraValue = '';
    if (!((_cookie$credentials2 = cookie.credentials) !== null && _cookie$credentials2 !== void 0 && _cookie$credentials2.authHeaderValueExtra)) {
      return extraValue;
    }
    try {
      extraValue = (0, _cookie_splitter.getExtraAuthStorageValue)(request, this.getExtraAuthStorageOptions());
    } catch (error) {
      this.logger.info(error);
    }
    return extraValue;
  }
  buildAuthHeaderFromCookie(cookie, request) {
    var _cookie$credentials3;
    const header = {};
    if (cookie.credentials.authHeaderValueExtra) {
      try {
        const extraAuthStorageValue = this.getExtraAuthStorageValue(request, cookie);
        header.authorization = extraAuthStorageValue;
        return header;
      } catch (error) {
        this.logger.error(error);
        // TODO Re-throw?
        // throw error;
      }
    }

    const authHeaderValue = (_cookie$credentials3 = cookie.credentials) === null || _cookie$credentials3 === void 0 ? void 0 : _cookie$credentials3.authHeaderValue;
    if (authHeaderValue) {
      header.authorization = authHeaderValue;
    }
    return header;
  }
}
exports.OpenIdAuthentication = OpenIdAuthentication;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmcyIsIl9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkIiwicmVxdWlyZSIsIl93cmVjayIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJfaHR0cCIsIl9odHRwcyIsIl9zZWN1cml0eV9jb29raWUiLCJfcm91dGVzIiwiX2F1dGhlbnRpY2F0aW9uX3R5cGUiLCJfaGVscGVyIiwiX29iamVjdF9wcm9wZXJ0aWVzX2RlZmluZWQiLCJfY29tbW9uIiwiX2Nvb2tpZV9zcGxpdHRlciIsIm9iaiIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0IiwiX2dldFJlcXVpcmVXaWxkY2FyZENhY2hlIiwiZSIsIldlYWtNYXAiLCJyIiwidCIsImhhcyIsImdldCIsIm4iLCJfX3Byb3RvX18iLCJhIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJ1IiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwiaSIsInNldCIsIl9kZWZpbmVQcm9wZXJ0eSIsImtleSIsInZhbHVlIiwiX3RvUHJvcGVydHlLZXkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJhcmciLCJfdG9QcmltaXRpdmUiLCJTdHJpbmciLCJpbnB1dCIsImhpbnQiLCJwcmltIiwiU3ltYm9sIiwidG9QcmltaXRpdmUiLCJ1bmRlZmluZWQiLCJyZXMiLCJUeXBlRXJyb3IiLCJOdW1iZXIiLCJPcGVuSWRBdXRoZW50aWNhdGlvbiIsIkF1dGhlbnRpY2F0aW9uVHlwZSIsImNvbnN0cnVjdG9yIiwiY29uZmlnIiwic2Vzc2lvblN0b3JhZ2VGYWN0b3J5Iiwicm91dGVyIiwiZXNDbGllbnQiLCJjb3JlIiwibG9nZ2VyIiwiX3RoaXMkY29uZmlnJG9wZW5pZCIsIl90aGlzJGNvbmZpZyRvcGVuaWQyIiwiQXV0aFR5cGUiLCJPUEVOX0lEIiwicmVxdWVzdCIsInRvb2xraXQiLCJuZXh0VXJsIiwiZ2VuZXJhdGVOZXh0VXJsIiwiY2xlYXJPbGRWZXJzaW9uQ29va2llIiwiY2xlYXJPbGRWZXJzaW9uQ29va2llVmFsdWUiLCJyZWRpcmVjdGVkIiwibG9jYXRpb24iLCJjb3JlU2V0dXAiLCJodHRwIiwiYmFzZVBhdGgiLCJzZXJ2ZXJCYXNlUGF0aCIsIndyZWNrQ2xpZW50IiwiY3JlYXRlV3JlY2tDbGllbnQiLCJvcGVuSWRBdXRoQ29uZmlnIiwiYXV0aEhlYWRlck5hbWUiLCJvcGVuaWQiLCJoZWFkZXIiLCJvcGVuSWRDb25uZWN0VXJsIiwiY29ubmVjdF91cmwiLCJzY29wZSIsImluZGV4T2YiLCJpbml0IiwicmVzcG9uc2UiLCJwYXlsb2FkIiwiSlNPTiIsInBhcnNlIiwiYXV0aG9yaXphdGlvbkVuZHBvaW50IiwiYXV0aG9yaXphdGlvbl9lbmRwb2ludCIsInRva2VuRW5kcG9pbnQiLCJ0b2tlbl9lbmRwb2ludCIsImVuZFNlc3Npb25FbmRwb2ludCIsImVuZF9zZXNzaW9uX2VuZHBvaW50IiwiY3JlYXRlRXh0cmFTdG9yYWdlIiwicm91dGVzIiwiT3BlbklkQXV0aFJvdXRlcyIsInNlY3VyaXR5Q2xpZW50Iiwic2V0dXBSb3V0ZXMiLCJlcnJvciIsIkVycm9yIiwicGF0aCIsInVybCIsInBhdGhuYW1lIiwiZXNjYXBlIiwiX3RoaXMkY29uZmlnJG9wZW5pZDMiLCJfdGhpcyRjb25maWckb3BlbmlkNCIsIl90aGlzJGNvbmZpZyRvcGVuaWQ1IiwiX3RoaXMkY29uZmlnJG9wZW5pZDYiLCJfdGhpcyRjb25maWckb3BlbmlkNyIsIl90aGlzJGNvbmZpZyRvcGVuaWQ5Iiwicm9vdF9jYSIsIndyZWNrSHR0cHNPcHRpb24iLCJjYSIsInJlYWRGaWxlU3luYyIsImRlYnVnIiwicGZ4IiwiY2VydGlmaWNhdGUiLCJwcml2YXRlX2tleSIsImNlcnQiLCJwYXNzcGhyYXNlIiwiX3RoaXMkY29uZmlnJG9wZW5pZDgiLCJ2ZXJpZnlfaG9zdG5hbWVzIiwiY2hlY2tTZXJ2ZXJJZGVudGl0eSIsImhvc3QiLCJpbmZvIiwiZ2V0T2JqZWN0UHJvcGVydGllcyIsImtleXMiLCJsZW5ndGgiLCJ3cmVjayIsImRlZmF1bHRzIiwiYWdlbnRzIiwiSFRUUCIsIkFnZW50IiwiaHR0cHMiLCJIVFRQUyIsImh0dHBzQWxsb3dVbmF1dGhvcml6ZWQiLCJyZWplY3RVbmF1dGhvcml6ZWQiLCJnZXRXcmVja0h0dHBzT3B0aW9ucyIsImhhcGlTZXJ2ZXIiLCJhc1Njb3BlZCIsInNlcnZlciIsImV4dHJhQ29va2llUHJlZml4IiwiZXh0cmFfc3RvcmFnZSIsImNvb2tpZV9wcmVmaXgiLCJleHRyYUNvb2tpZVNldHRpbmdzIiwiaXNTZWN1cmUiLCJjb29raWUiLCJzZWN1cmUiLCJpc1NhbWVTaXRlIiwicGFzc3dvcmQiLCJkb21haW4iLCJjbGVhckludmFsaWQiLCJpc0h0dHBPbmx5IiwiaWdub3JlRXJyb3JzIiwiZW5jb2RpbmciLCJhZGRpdGlvbmFsX2Nvb2tpZXMiLCJzdGF0ZXMiLCJhZGQiLCJnZXRFeHRyYUF1dGhTdG9yYWdlT3B0aW9ucyIsImNvb2tpZVByZWZpeCIsImFkZGl0aW9uYWxDb29raWVzIiwicmVxdWVzdEluY2x1ZGVzQXV0aEluZm8iLCJoZWFkZXJzIiwiYXV0aG9yaXphdGlvbiIsImdldEFkZGl0aW9uYWxBdXRoSGVhZGVyIiwiZ2V0Q29va2llIiwiYXV0aEluZm8iLCJzZXRFeHRyYUF1dGhTdG9yYWdlIiwidXNlcm5hbWUiLCJ1c2VyX25hbWUiLCJjcmVkZW50aWFscyIsImF1dGhIZWFkZXJWYWx1ZUV4dHJhIiwiYXV0aFR5cGUiLCJ0eXBlIiwiZXhwaXJ5VGltZSIsIkRhdGUiLCJub3ciLCJzZXNzaW9uIiwidHRsIiwiZ2V0S2VlcEFsaXZlRXhwaXJ5IiwiaXNWYWxpZENvb2tpZSIsIl9jb29raWUkY3JlZGVudGlhbHMiLCJhdXRoSGVhZGVyVmFsdWUiLCJnZXRFeHRyYUF1dGhTdG9yYWdlVmFsdWUiLCJyZWZyZXNoX3Rva2VuIiwiX3RoaXMkY29uZmlnJG9wZW5pZDEwIiwiX3RoaXMkY29uZmlnJG9wZW5pZDExIiwicXVlcnkiLCJncmFudF90eXBlIiwiY2xpZW50X2lkIiwiY2xpZW50X3NlY3JldCIsInJlZnJlc2hUb2tlblJlc3BvbnNlIiwiY2FsbFRva2VuRW5kcG9pbnQiLCJpZFRva2VuIiwicmVmcmVzaFRva2VuIiwiZ2V0RXhwaXJhdGlvbkRhdGUiLCJoYW5kbGVVbmF1dGhlZFJlcXVlc3QiLCJpc1BhZ2VSZXF1ZXN0IiwicmVkaXJlY3RPSURDQ2FwdHVyZSIsInVuYXV0aG9yaXplZCIsIl9jb29raWUkY3JlZGVudGlhbHMyIiwiZXh0cmFWYWx1ZSIsImJ1aWxkQXV0aEhlYWRlckZyb21Db29raWUiLCJfY29va2llJGNyZWRlbnRpYWxzMyIsImV4dHJhQXV0aFN0b3JhZ2VWYWx1ZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyJvcGVuaWRfYXV0aC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogICBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqXG4gKiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIikuXG4gKiAgIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICAgQSBjb3B5IG9mIHRoZSBMaWNlbnNlIGlzIGxvY2F0ZWQgYXRcbiAqXG4gKiAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgIG9yIGluIHRoZSBcImxpY2Vuc2VcIiBmaWxlIGFjY29tcGFueWluZyB0aGlzIGZpbGUuIFRoaXMgZmlsZSBpcyBkaXN0cmlidXRlZFxuICogICBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqICAgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmdcbiAqICAgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCB3cmVjayBmcm9tICdAaGFwaS93cmVjayc7XG5pbXBvcnQge1xuICBMb2dnZXIsXG4gIFNlc3Npb25TdG9yYWdlRmFjdG9yeSxcbiAgQ29yZVNldHVwLFxuICBJUm91dGVyLFxuICBJTGVnYWN5Q2x1c3RlckNsaWVudCxcbiAgT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICBMaWZlY3ljbGVSZXNwb25zZUZhY3RvcnksXG4gIEF1dGhUb29sa2l0LFxuICBJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZSxcbiAgQXV0aFJlc3VsdCxcbn0gZnJvbSAnb3BlbnNlYXJjaC1kYXNoYm9hcmRzL3NlcnZlcic7XG5pbXBvcnQgSFRUUCBmcm9tICdodHRwJztcbmltcG9ydCBIVFRQUyBmcm9tICdodHRwcyc7XG5pbXBvcnQgeyBQZWVyQ2VydGlmaWNhdGUgfSBmcm9tICd0bHMnO1xuaW1wb3J0IHsgU2VydmVyLCBTZXJ2ZXJTdGF0ZUNvb2tpZU9wdGlvbnMgfSBmcm9tICdAaGFwaS9oYXBpJztcbmltcG9ydCB7IFNlY3VyaXR5UGx1Z2luQ29uZmlnVHlwZSB9IGZyb20gJy4uLy4uLy4uJztcbmltcG9ydCB7XG4gIFNlY3VyaXR5U2Vzc2lvbkNvb2tpZSxcbiAgY2xlYXJPbGRWZXJzaW9uQ29va2llVmFsdWUsXG59IGZyb20gJy4uLy4uLy4uL3Nlc3Npb24vc2VjdXJpdHlfY29va2llJztcbmltcG9ydCB7IE9wZW5JZEF1dGhSb3V0ZXMgfSBmcm9tICcuL3JvdXRlcyc7XG5pbXBvcnQgeyBBdXRoZW50aWNhdGlvblR5cGUgfSBmcm9tICcuLi9hdXRoZW50aWNhdGlvbl90eXBlJztcbmltcG9ydCB7IGNhbGxUb2tlbkVuZHBvaW50IH0gZnJvbSAnLi9oZWxwZXInO1xuaW1wb3J0IHsgY29tcG9zZU5leHRVcmxRdWVyeVBhcmFtIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvbmV4dF91cmwnO1xuaW1wb3J0IHsgZ2V0T2JqZWN0UHJvcGVydGllcyB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL29iamVjdF9wcm9wZXJ0aWVzX2RlZmluZWQnO1xuaW1wb3J0IHsgZ2V0RXhwaXJhdGlvbkRhdGUgfSBmcm9tICcuL2hlbHBlcic7XG5pbXBvcnQgeyBBdXRoVHlwZSwgT1BFTklEX0FVVEhfTE9HSU4gfSBmcm9tICcuLi8uLi8uLi8uLi9jb21tb24nO1xuaW1wb3J0IHtcbiAgRXh0cmFBdXRoU3RvcmFnZU9wdGlvbnMsXG4gIGdldEV4dHJhQXV0aFN0b3JhZ2VWYWx1ZSxcbiAgc2V0RXh0cmFBdXRoU3RvcmFnZSxcbn0gZnJvbSAnLi4vLi4vLi4vc2Vzc2lvbi9jb29raWVfc3BsaXR0ZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIE9wZW5JZEF1dGhDb25maWcge1xuICBhdXRob3JpemF0aW9uRW5kcG9pbnQ/OiBzdHJpbmc7XG4gIHRva2VuRW5kcG9pbnQ/OiBzdHJpbmc7XG4gIGVuZFNlc3Npb25FbmRwb2ludD86IHN0cmluZztcbiAgc2NvcGU/OiBzdHJpbmc7XG5cbiAgYXV0aEhlYWRlck5hbWU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgV3JlY2tIdHRwc09wdGlvbnMge1xuICBjYT86IHN0cmluZyB8IEJ1ZmZlciB8IEFycmF5PHN0cmluZyB8IEJ1ZmZlcj47XG4gIGNlcnQ/OiBzdHJpbmcgfCBCdWZmZXIgfCBBcnJheTxzdHJpbmcgfCBCdWZmZXI+O1xuICBrZXk/OiBzdHJpbmcgfCBCdWZmZXIgfCBBcnJheTxzdHJpbmcgfCBCdWZmZXI+O1xuICBwYXNzcGhyYXNlPzogc3RyaW5nO1xuICBwZng/OiBzdHJpbmcgfCBCdWZmZXIgfCBBcnJheTxzdHJpbmcgfCBCdWZmZXI+O1xuICBjaGVja1NlcnZlcklkZW50aXR5PzogKGhvc3Q6IHN0cmluZywgY2VydDogUGVlckNlcnRpZmljYXRlKSA9PiBFcnJvciB8IHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGNsYXNzIE9wZW5JZEF1dGhlbnRpY2F0aW9uIGV4dGVuZHMgQXV0aGVudGljYXRpb25UeXBlIHtcbiAgcHVibGljIHJlYWRvbmx5IHR5cGU6IHN0cmluZyA9IEF1dGhUeXBlLk9QRU5fSUQ7XG5cbiAgcHJpdmF0ZSBvcGVuSWRBdXRoQ29uZmlnOiBPcGVuSWRBdXRoQ29uZmlnO1xuICBwcml2YXRlIGF1dGhIZWFkZXJOYW1lOiBzdHJpbmc7XG4gIHByaXZhdGUgb3BlbklkQ29ubmVjdFVybDogc3RyaW5nO1xuICBwcml2YXRlIHdyZWNrQ2xpZW50OiB0eXBlb2Ygd3JlY2s7XG4gIHByaXZhdGUgd3JlY2tIdHRwc09wdGlvbjogV3JlY2tIdHRwc09wdGlvbnMgPSB7fTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjb25maWc6IFNlY3VyaXR5UGx1Z2luQ29uZmlnVHlwZSxcbiAgICBzZXNzaW9uU3RvcmFnZUZhY3Rvcnk6IFNlc3Npb25TdG9yYWdlRmFjdG9yeTxTZWN1cml0eVNlc3Npb25Db29raWU+LFxuICAgIHJvdXRlcjogSVJvdXRlcixcbiAgICBlc0NsaWVudDogSUxlZ2FjeUNsdXN0ZXJDbGllbnQsXG4gICAgY29yZTogQ29yZVNldHVwLFxuICAgIGxvZ2dlcjogTG9nZ2VyXG4gICkge1xuICAgIHN1cGVyKGNvbmZpZywgc2Vzc2lvblN0b3JhZ2VGYWN0b3J5LCByb3V0ZXIsIGVzQ2xpZW50LCBjb3JlLCBsb2dnZXIpO1xuXG4gICAgdGhpcy53cmVja0NsaWVudCA9IHRoaXMuY3JlYXRlV3JlY2tDbGllbnQoKTtcblxuICAgIHRoaXMub3BlbklkQXV0aENvbmZpZyA9IHt9O1xuICAgIHRoaXMuYXV0aEhlYWRlck5hbWUgPSB0aGlzLmNvbmZpZy5vcGVuaWQ/LmhlYWRlciB8fCAnJztcbiAgICB0aGlzLm9wZW5JZEF1dGhDb25maWcuYXV0aEhlYWRlck5hbWUgPSB0aGlzLmF1dGhIZWFkZXJOYW1lO1xuXG4gICAgdGhpcy5vcGVuSWRDb25uZWN0VXJsID0gdGhpcy5jb25maWcub3BlbmlkPy5jb25uZWN0X3VybCB8fCAnJztcbiAgICBsZXQgc2NvcGUgPSB0aGlzLmNvbmZpZy5vcGVuaWQhLnNjb3BlO1xuICAgIGlmIChzY29wZS5pbmRleE9mKCdvcGVuaWQnKSA8IDApIHtcbiAgICAgIHNjb3BlID0gYG9wZW5pZCAke3Njb3BlfWA7XG4gICAgfVxuICAgIHRoaXMub3BlbklkQXV0aENvbmZpZy5zY29wZSA9IHNjb3BlO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGluaXQoKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy53cmVja0NsaWVudC5nZXQodGhpcy5vcGVuSWRDb25uZWN0VXJsKTtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSBKU09OLnBhcnNlKHJlc3BvbnNlLnBheWxvYWQgYXMgc3RyaW5nKTtcblxuICAgICAgdGhpcy5vcGVuSWRBdXRoQ29uZmlnLmF1dGhvcml6YXRpb25FbmRwb2ludCA9IHBheWxvYWQuYXV0aG9yaXphdGlvbl9lbmRwb2ludDtcbiAgICAgIHRoaXMub3BlbklkQXV0aENvbmZpZy50b2tlbkVuZHBvaW50ID0gcGF5bG9hZC50b2tlbl9lbmRwb2ludDtcbiAgICAgIHRoaXMub3BlbklkQXV0aENvbmZpZy5lbmRTZXNzaW9uRW5kcG9pbnQgPSBwYXlsb2FkLmVuZF9zZXNzaW9uX2VuZHBvaW50IHx8IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy5jcmVhdGVFeHRyYVN0b3JhZ2UoKTtcblxuICAgICAgY29uc3Qgcm91dGVzID0gbmV3IE9wZW5JZEF1dGhSb3V0ZXMoXG4gICAgICAgIHRoaXMucm91dGVyLFxuICAgICAgICB0aGlzLmNvbmZpZyxcbiAgICAgICAgdGhpcy5zZXNzaW9uU3RvcmFnZUZhY3RvcnksXG4gICAgICAgIHRoaXMub3BlbklkQXV0aENvbmZpZyxcbiAgICAgICAgdGhpcy5zZWN1cml0eUNsaWVudCxcbiAgICAgICAgdGhpcy5jb3JlU2V0dXAsXG4gICAgICAgIHRoaXMud3JlY2tDbGllbnRcbiAgICAgICk7XG5cbiAgICAgIHJvdXRlcy5zZXR1cFJvdXRlcygpO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIHRoaXMubG9nZ2VyLmVycm9yKGVycm9yKTsgLy8gVE9ETzogbG9nIG1vcmUgaW5mb1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgd2hlbiB0cnlpbmcgdG8gb2J0YWluIHRoZSBlbmRwb2ludHMgZnJvbSB5b3VyIElkUCcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2VuZXJhdGVOZXh0VXJsKHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCk6IHN0cmluZyB7XG4gICAgY29uc3QgcGF0aCA9XG4gICAgICB0aGlzLmNvcmVTZXR1cC5odHRwLmJhc2VQYXRoLnNlcnZlckJhc2VQYXRoICtcbiAgICAgIChyZXF1ZXN0LnVybC5wYXRobmFtZSB8fCAnL2FwcC9vcGVuc2VhcmNoLWRhc2hib2FyZHMnKTtcbiAgICByZXR1cm4gZXNjYXBlKHBhdGgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZWRpcmVjdE9JRENDYXB0dXJlID0gKHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCwgdG9vbGtpdDogQXV0aFRvb2xraXQpID0+IHtcbiAgICBjb25zdCBuZXh0VXJsID0gdGhpcy5nZW5lcmF0ZU5leHRVcmwocmVxdWVzdCk7XG4gICAgY29uc3QgY2xlYXJPbGRWZXJzaW9uQ29va2llID0gY2xlYXJPbGRWZXJzaW9uQ29va2llVmFsdWUodGhpcy5jb25maWcpO1xuICAgIHJldHVybiB0b29sa2l0LnJlZGlyZWN0ZWQoe1xuICAgICAgbG9jYXRpb246IGAke3RoaXMuY29yZVNldHVwLmh0dHAuYmFzZVBhdGguc2VydmVyQmFzZVBhdGh9L2F1dGgvb3BlbmlkL2NhcHR1cmVVcmxGcmFnbWVudD9uZXh0VXJsPSR7bmV4dFVybH1gLFxuICAgICAgJ3NldC1jb29raWUnOiBjbGVhck9sZFZlcnNpb25Db29raWUsXG4gICAgfSk7XG4gIH07XG5cbiAgcHJpdmF0ZSBjcmVhdGVXcmVja0NsaWVudCgpOiB0eXBlb2Ygd3JlY2sge1xuICAgIGlmICh0aGlzLmNvbmZpZy5vcGVuaWQ/LnJvb3RfY2EpIHtcbiAgICAgIHRoaXMud3JlY2tIdHRwc09wdGlvbi5jYSA9IFtmcy5yZWFkRmlsZVN5bmModGhpcy5jb25maWcub3BlbmlkLnJvb3RfY2EpXTtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBVc2luZyBDQSBDZXJ0OiAke3RoaXMuY29uZmlnLm9wZW5pZC5yb290X2NhfWApO1xuICAgIH1cbiAgICBpZiAodGhpcy5jb25maWcub3BlbmlkPy5wZngpIHtcbiAgICAgIC8vIFVzZSBQRlggb3IgUEtDUzEyIGlmIHByb3ZpZGVkXG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgVXNpbmcgUEZYIG9yIFBLQ1MxMjogJHt0aGlzLmNvbmZpZy5vcGVuaWQucGZ4fWApO1xuICAgICAgdGhpcy53cmVja0h0dHBzT3B0aW9uLnBmeCA9IFtmcy5yZWFkRmlsZVN5bmModGhpcy5jb25maWcub3BlbmlkLnBmeCldO1xuICAgIH0gZWxzZSBpZiAodGhpcy5jb25maWcub3BlbmlkPy5jZXJ0aWZpY2F0ZSAmJiB0aGlzLmNvbmZpZy5vcGVuaWQ/LnByaXZhdGVfa2V5KSB7XG4gICAgICAvLyBVc2UgJ2NlcnRpZmljYXRlJyBhbmQgJ3ByaXZhdGVfa2V5JyBpZiBwcm92aWRlZFxuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoYFVzaW5nIENlcnRpZmljYXRlOiAke3RoaXMuY29uZmlnLm9wZW5pZC5jZXJ0aWZpY2F0ZX1gKTtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBVc2luZyBQcml2YXRlIEtleTogJHt0aGlzLmNvbmZpZy5vcGVuaWQucHJpdmF0ZV9rZXl9YCk7XG4gICAgICB0aGlzLndyZWNrSHR0cHNPcHRpb24uY2VydCA9IFtmcy5yZWFkRmlsZVN5bmModGhpcy5jb25maWcub3BlbmlkLmNlcnRpZmljYXRlKV07XG4gICAgICB0aGlzLndyZWNrSHR0cHNPcHRpb24ua2V5ID0gW2ZzLnJlYWRGaWxlU3luYyh0aGlzLmNvbmZpZy5vcGVuaWQucHJpdmF0ZV9rZXkpXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoXG4gICAgICAgIGBDbGllbnQgY2VydGlmaWNhdGVzIG5vdCBwcm92aWRlZC4gTXV0dWFsIFRMUyB3aWxsIG5vdCBiZSB1c2VkIHRvIG9idGFpbiBlbmRwb2ludHMuYFxuICAgICAgKTtcbiAgICB9XG4gICAgLy8gQ2hlY2sgaWYgcGFzc3BocmFzZSBpcyBwcm92aWRlZCwgdXNlIGl0IGZvciAncGZ4JyBhbmQgJ2tleSdcbiAgICBpZiAodGhpcy5jb25maWcub3BlbmlkPy5wYXNzcGhyYXNlICE9PSAnJykge1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoYFBhc3NwaHJhc2Ugbm90IHByb3ZpZGVkIGZvciBwcml2YXRlIGtleSBhbmQvb3IgcGZ4LmApO1xuICAgICAgdGhpcy53cmVja0h0dHBzT3B0aW9uLnBhc3NwaHJhc2UgPSB0aGlzLmNvbmZpZy5vcGVuaWQ/LnBhc3NwaHJhc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZy5vcGVuaWQ/LnZlcmlmeV9ob3N0bmFtZXMgPT09IGZhbHNlKSB7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1Zyhgb3BlbklkIGF1dGggJ3ZlcmlmeV9ob3N0bmFtZXMnIG9wdGlvbiBpcyBvZmYuYCk7XG4gICAgICB0aGlzLndyZWNrSHR0cHNPcHRpb24uY2hlY2tTZXJ2ZXJJZGVudGl0eSA9IChob3N0OiBzdHJpbmcsIGNlcnQ6IFBlZXJDZXJ0aWZpY2F0ZSkgPT4ge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfTtcbiAgICB9XG4gICAgdGhpcy5sb2dnZXIuaW5mbyhnZXRPYmplY3RQcm9wZXJ0aWVzKHRoaXMud3JlY2tIdHRwc09wdGlvbiwgJ1dyZWNrSHR0cHNPcHRpb25zJykpO1xuICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLndyZWNrSHR0cHNPcHRpb24pLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiB3cmVjay5kZWZhdWx0cyh7XG4gICAgICAgIGFnZW50czoge1xuICAgICAgICAgIGh0dHA6IG5ldyBIVFRQLkFnZW50KCksXG4gICAgICAgICAgaHR0cHM6IG5ldyBIVFRQUy5BZ2VudCh0aGlzLndyZWNrSHR0cHNPcHRpb24pLFxuICAgICAgICAgIGh0dHBzQWxsb3dVbmF1dGhvcml6ZWQ6IG5ldyBIVFRQUy5BZ2VudCh7XG4gICAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IGZhbHNlLFxuICAgICAgICAgIH0pLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB3cmVjaztcbiAgICB9XG4gIH1cblxuICBnZXRXcmVja0h0dHBzT3B0aW9ucygpOiBXcmVja0h0dHBzT3B0aW9ucyB7XG4gICAgcmV0dXJuIHRoaXMud3JlY2tIdHRwc09wdGlvbjtcbiAgfVxuXG4gIGNyZWF0ZUV4dHJhU3RvcmFnZSgpIHtcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgaGFwaVNlcnZlcjogU2VydmVyID0gdGhpcy5zZXNzaW9uU3RvcmFnZUZhY3RvcnkuYXNTY29wZWQoe30pLnNlcnZlcjtcblxuICAgIGNvbnN0IGV4dHJhQ29va2llUHJlZml4ID0gdGhpcy5jb25maWcub3BlbmlkIS5leHRyYV9zdG9yYWdlLmNvb2tpZV9wcmVmaXg7XG4gICAgY29uc3QgZXh0cmFDb29raWVTZXR0aW5nczogU2VydmVyU3RhdGVDb29raWVPcHRpb25zID0ge1xuICAgICAgaXNTZWN1cmU6IHRoaXMuY29uZmlnLmNvb2tpZS5zZWN1cmUsXG4gICAgICBpc1NhbWVTaXRlOiB0aGlzLmNvbmZpZy5jb29raWUuaXNTYW1lU2l0ZSxcbiAgICAgIHBhc3N3b3JkOiB0aGlzLmNvbmZpZy5jb29raWUucGFzc3dvcmQsXG4gICAgICBkb21haW46IHRoaXMuY29uZmlnLmNvb2tpZS5kb21haW4sXG4gICAgICBwYXRoOiB0aGlzLmNvcmVTZXR1cC5odHRwLmJhc2VQYXRoLnNlcnZlckJhc2VQYXRoIHx8ICcvJyxcbiAgICAgIGNsZWFySW52YWxpZDogZmFsc2UsXG4gICAgICBpc0h0dHBPbmx5OiB0cnVlLFxuICAgICAgaWdub3JlRXJyb3JzOiB0cnVlLFxuICAgICAgZW5jb2Rpbmc6ICdpcm9uJywgLy8gU2FtZSBhcyBoYXBpIGF1dGggY29va2llXG4gICAgfTtcblxuICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IHRoaXMuY29uZmlnLm9wZW5pZCEuZXh0cmFfc3RvcmFnZS5hZGRpdGlvbmFsX2Nvb2tpZXM7IGkrKykge1xuICAgICAgaGFwaVNlcnZlci5zdGF0ZXMuYWRkKGV4dHJhQ29va2llUHJlZml4ICsgaSwgZXh0cmFDb29raWVTZXR0aW5ncyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRFeHRyYUF1dGhTdG9yYWdlT3B0aW9ucygpOiBFeHRyYUF1dGhTdG9yYWdlT3B0aW9ucyB7XG4gICAgLy8gSWYgd2UncmUgaGVyZSwgd2Ugd2lsbCBhbHdheXMgaGF2ZSB0aGUgb3BlbmlkIGNvbmZpZ3VyYXRpb25cbiAgICByZXR1cm4ge1xuICAgICAgY29va2llUHJlZml4OiB0aGlzLmNvbmZpZy5vcGVuaWQhLmV4dHJhX3N0b3JhZ2UuY29va2llX3ByZWZpeCxcbiAgICAgIGFkZGl0aW9uYWxDb29raWVzOiB0aGlzLmNvbmZpZy5vcGVuaWQhLmV4dHJhX3N0b3JhZ2UuYWRkaXRpb25hbF9jb29raWVzLFxuICAgICAgbG9nZ2VyOiB0aGlzLmxvZ2dlcixcbiAgICB9O1xuICB9XG5cbiAgcmVxdWVzdEluY2x1ZGVzQXV0aEluZm8ocmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHJlcXVlc3QuaGVhZGVycy5hdXRob3JpemF0aW9uID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgYXN5bmMgZ2V0QWRkaXRpb25hbEF1dGhIZWFkZXIocmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0KTogUHJvbWlzZTxhbnk+IHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICBnZXRDb29raWUocmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LCBhdXRoSW5mbzogYW55KTogU2VjdXJpdHlTZXNzaW9uQ29va2llIHtcbiAgICBzZXRFeHRyYUF1dGhTdG9yYWdlKFxuICAgICAgcmVxdWVzdCxcbiAgICAgIHJlcXVlc3QuaGVhZGVycy5hdXRob3JpemF0aW9uIGFzIHN0cmluZyxcbiAgICAgIHRoaXMuZ2V0RXh0cmFBdXRoU3RvcmFnZU9wdGlvbnMoKVxuICAgICk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdXNlcm5hbWU6IGF1dGhJbmZvLnVzZXJfbmFtZSxcbiAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgIGF1dGhIZWFkZXJWYWx1ZUV4dHJhOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIGF1dGhUeXBlOiB0aGlzLnR5cGUsXG4gICAgICBleHBpcnlUaW1lOiBEYXRlLm5vdygpICsgdGhpcy5jb25maWcuc2Vzc2lvbi50dGwsXG4gICAgfTtcbiAgfVxuXG4gIC8vIE9JREMgZXhwaXJ5IHRpbWUgaXMgc2V0IGJ5IHRoZSBJRFAgYW5kIHJlZnJlc2hlZCB2aWEgcmVmcmVzaFRva2Vuc1xuICBnZXRLZWVwQWxpdmVFeHBpcnkoXG4gICAgY29va2llOiBTZWN1cml0eVNlc3Npb25Db29raWUsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0PHVua25vd24sIHVua25vd24sIHVua25vd24sIGFueT5cbiAgKTogbnVtYmVyIHtcbiAgICByZXR1cm4gY29va2llLmV4cGlyeVRpbWUhO1xuICB9XG5cbiAgLy8gVE9ETzogQWRkIHRva2VuIGV4cGlyYXRpb24gY2hlY2sgaGVyZVxuICBhc3luYyBpc1ZhbGlkQ29va2llKFxuICAgIGNvb2tpZTogU2VjdXJpdHlTZXNzaW9uQ29va2llLFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdFxuICApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBpZiAoXG4gICAgICBjb29raWUuYXV0aFR5cGUgIT09IHRoaXMudHlwZSB8fFxuICAgICAgIWNvb2tpZS51c2VybmFtZSB8fFxuICAgICAgIWNvb2tpZS5leHBpcnlUaW1lIHx8XG4gICAgICAoIWNvb2tpZS5jcmVkZW50aWFscz8uYXV0aEhlYWRlclZhbHVlICYmICF0aGlzLmdldEV4dHJhQXV0aFN0b3JhZ2VWYWx1ZShyZXF1ZXN0LCBjb29raWUpKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChjb29raWUuZXhwaXJ5VGltZSA+IERhdGUubm93KCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIC8vIG5lZWQgdG8gcmVuZXcgaWQgdG9rZW5cbiAgICBpZiAoY29va2llLmNyZWRlbnRpYWxzLnJlZnJlc2hfdG9rZW4pIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5OiBhbnkgPSB7XG4gICAgICAgICAgZ3JhbnRfdHlwZTogJ3JlZnJlc2hfdG9rZW4nLFxuICAgICAgICAgIGNsaWVudF9pZDogdGhpcy5jb25maWcub3BlbmlkPy5jbGllbnRfaWQsXG4gICAgICAgICAgY2xpZW50X3NlY3JldDogdGhpcy5jb25maWcub3BlbmlkPy5jbGllbnRfc2VjcmV0LFxuICAgICAgICAgIHJlZnJlc2hfdG9rZW46IGNvb2tpZS5jcmVkZW50aWFscy5yZWZyZXNoX3Rva2VuLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCByZWZyZXNoVG9rZW5SZXNwb25zZSA9IGF3YWl0IGNhbGxUb2tlbkVuZHBvaW50KFxuICAgICAgICAgIHRoaXMub3BlbklkQXV0aENvbmZpZy50b2tlbkVuZHBvaW50ISxcbiAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICB0aGlzLndyZWNrQ2xpZW50XG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gaWYgbm8gaWRfdG9rZW4gZnJvbSByZWZyZXNoIHRva2VuIGNhbGwsIG1heWJlIHRoZSBJZHAgZG9lc24ndCBhbGxvdyByZWZyZXNoIGlkX3Rva2VuXG4gICAgICAgIGlmIChyZWZyZXNoVG9rZW5SZXNwb25zZS5pZFRva2VuKSB7XG4gICAgICAgICAgY29va2llLmNyZWRlbnRpYWxzID0ge1xuICAgICAgICAgICAgYXV0aEhlYWRlclZhbHVlRXh0cmE6IHRydWUsXG4gICAgICAgICAgICByZWZyZXNoX3Rva2VuOiByZWZyZXNoVG9rZW5SZXNwb25zZS5yZWZyZXNoVG9rZW4sXG4gICAgICAgICAgfTtcbiAgICAgICAgICBjb29raWUuZXhwaXJ5VGltZSA9IGdldEV4cGlyYXRpb25EYXRlKHJlZnJlc2hUb2tlblJlc3BvbnNlKTtcblxuICAgICAgICAgIHNldEV4dHJhQXV0aFN0b3JhZ2UoXG4gICAgICAgICAgICByZXF1ZXN0LFxuICAgICAgICAgICAgYEJlYXJlciAke3JlZnJlc2hUb2tlblJlc3BvbnNlLmlkVG9rZW59YCxcbiAgICAgICAgICAgIHRoaXMuZ2V0RXh0cmFBdXRoU3RvcmFnZU9wdGlvbnMoKVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZXJyb3IpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG5vIHJlZnJlc2ggdG9rZW4sIGFuZCBjdXJyZW50IHRva2VuIGlzIGV4cGlyZWRcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVVbmF1dGhlZFJlcXVlc3QoXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBMaWZlY3ljbGVSZXNwb25zZUZhY3RvcnksXG4gICAgdG9vbGtpdDogQXV0aFRvb2xraXRcbiAgKTogSU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2UgfCBBdXRoUmVzdWx0IHtcbiAgICBpZiAodGhpcy5pc1BhZ2VSZXF1ZXN0KHJlcXVlc3QpKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZWRpcmVjdE9JRENDYXB0dXJlKHJlcXVlc3QsIHRvb2xraXQpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2UudW5hdXRob3JpemVkKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0RXh0cmFBdXRoU3RvcmFnZVZhbHVlKHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCwgY29va2llOiBTZWN1cml0eVNlc3Npb25Db29raWUpIHtcbiAgICBsZXQgZXh0cmFWYWx1ZSA9ICcnO1xuICAgIGlmICghY29va2llLmNyZWRlbnRpYWxzPy5hdXRoSGVhZGVyVmFsdWVFeHRyYSkge1xuICAgICAgcmV0dXJuIGV4dHJhVmFsdWU7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGV4dHJhVmFsdWUgPSBnZXRFeHRyYUF1dGhTdG9yYWdlVmFsdWUocmVxdWVzdCwgdGhpcy5nZXRFeHRyYUF1dGhTdG9yYWdlT3B0aW9ucygpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5sb2dnZXIuaW5mbyhlcnJvcik7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4dHJhVmFsdWU7XG4gIH1cblxuICBidWlsZEF1dGhIZWFkZXJGcm9tQ29va2llKFxuICAgIGNvb2tpZTogU2VjdXJpdHlTZXNzaW9uQ29va2llLFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdFxuICApOiBhbnkge1xuICAgIGNvbnN0IGhlYWRlcjogYW55ID0ge307XG4gICAgaWYgKGNvb2tpZS5jcmVkZW50aWFscy5hdXRoSGVhZGVyVmFsdWVFeHRyYSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZXh0cmFBdXRoU3RvcmFnZVZhbHVlID0gdGhpcy5nZXRFeHRyYUF1dGhTdG9yYWdlVmFsdWUocmVxdWVzdCwgY29va2llKTtcbiAgICAgICAgaGVhZGVyLmF1dGhvcml6YXRpb24gPSBleHRyYUF1dGhTdG9yYWdlVmFsdWU7XG4gICAgICAgIHJldHVybiBoZWFkZXI7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihlcnJvcik7XG4gICAgICAgIC8vIFRPRE8gUmUtdGhyb3c/XG4gICAgICAgIC8vIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBhdXRoSGVhZGVyVmFsdWUgPSBjb29raWUuY3JlZGVudGlhbHM/LmF1dGhIZWFkZXJWYWx1ZTtcbiAgICBpZiAoYXV0aEhlYWRlclZhbHVlKSB7XG4gICAgICBoZWFkZXIuYXV0aG9yaXphdGlvbiA9IGF1dGhIZWFkZXJWYWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGhlYWRlcjtcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFlQSxJQUFBQSxFQUFBLEdBQUFDLHVCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxNQUFBLEdBQUFDLHNCQUFBLENBQUFGLE9BQUE7QUFhQSxJQUFBRyxLQUFBLEdBQUFELHNCQUFBLENBQUFGLE9BQUE7QUFDQSxJQUFBSSxNQUFBLEdBQUFGLHNCQUFBLENBQUFGLE9BQUE7QUFJQSxJQUFBSyxnQkFBQSxHQUFBTCxPQUFBO0FBSUEsSUFBQU0sT0FBQSxHQUFBTixPQUFBO0FBQ0EsSUFBQU8sb0JBQUEsR0FBQVAsT0FBQTtBQUNBLElBQUFRLE9BQUEsR0FBQVIsT0FBQTtBQUVBLElBQUFTLDBCQUFBLEdBQUFULE9BQUE7QUFFQSxJQUFBVSxPQUFBLEdBQUFWLE9BQUE7QUFDQSxJQUFBVyxnQkFBQSxHQUFBWCxPQUFBO0FBSTBDLFNBQUFFLHVCQUFBVSxHQUFBLFdBQUFBLEdBQUEsSUFBQUEsR0FBQSxDQUFBQyxVQUFBLEdBQUFELEdBQUEsS0FBQUUsT0FBQSxFQUFBRixHQUFBO0FBQUEsU0FB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