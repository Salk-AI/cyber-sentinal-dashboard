"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenIdAuthRoutes = void 0;
var _configSchema = require("@osd/config-schema");
var _cryptiles = require("@hapi/cryptiles");
var _querystring = require("querystring");
var _helper = require("./helper");
var _next_url = require("../../../utils/next_url");
var _common = require("../../../../common");
var _cookie_splitter = require("../../../session/cookie_splitter");
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
class OpenIdAuthRoutes {
  constructor(router, config, sessionStorageFactory, openIdAuthConfig, securityClient, core, wreckClient) {
    this.router = router;
    this.config = config;
    this.sessionStorageFactory = sessionStorageFactory;
    this.openIdAuthConfig = openIdAuthConfig;
    this.securityClient = securityClient;
    this.core = core;
    this.wreckClient = wreckClient;
  }
  redirectToLogin(request, response) {
    this.sessionStorageFactory.asScoped(request).clear();
    return response.redirected({
      headers: {
        location: `${this.core.http.basePath.serverBasePath}${_common.OPENID_AUTH_LOGIN}`
      }
    });
  }
  getExtraAuthStorageOptions(logger) {
    // If we're here, we will always have the openid configuration
    return {
      cookiePrefix: this.config.openid.extra_storage.cookie_prefix,
      additionalCookies: this.config.openid.extra_storage.additional_cookies,
      logger
    };
  }
  setupRoutes() {
    this.router.get({
      path: _common.OPENID_AUTH_LOGIN,
      validate: {
        query: _configSchema.schema.object({
          code: _configSchema.schema.maybe(_configSchema.schema.string()),
          nextUrl: _configSchema.schema.maybe(_configSchema.schema.string({
            validate: _next_url.validateNextUrl
          })),
          redirectHash: _configSchema.schema.maybe(_configSchema.schema.boolean()),
          state: _configSchema.schema.maybe(_configSchema.schema.string()),
          refresh: _configSchema.schema.maybe(_configSchema.schema.string())
        }, {
          unknowns: 'allow'
        })
      },
      options: {
        authRequired: false
      }
    }, async (context, request, response) => {
      var _this$config$openid2, _this$config$openid3, _cookie$oidc2;
      // implementation refers to https://github.com/hapijs/bell/blob/master/lib/oauth.js
      // Sign-in initialization
      if (!request.query.code) {
        var _this$config$openid;
        const nonce = (0, _cryptiles.randomString)(OpenIdAuthRoutes.NONCE_LENGTH);
        const query = {
          client_id: (_this$config$openid = this.config.openid) === null || _this$config$openid === void 0 ? void 0 : _this$config$openid.client_id,
          response_type: _common.AUTH_RESPONSE_TYPE,
          redirect_uri: `${(0, _helper.getBaseRedirectUrl)(this.config, this.core, request)}${_common.OPENID_AUTH_LOGIN}`,
          state: nonce,
          scope: this.openIdAuthConfig.scope
        };
        (0, _helper.includeAdditionalParameters)(query, context, this.config);
        const queryString = (0, _querystring.stringify)(query);
        const location = `${this.openIdAuthConfig.authorizationEndpoint}?${queryString}`;
        const cookie = {
          oidc: {
            state: nonce,
            nextUrl: (0, _helper.getNextUrl)(this.config, this.core, request),
            redirectHash: request.query.redirectHash === 'true'
          },
          authType: _common.AuthType.OPEN_ID
        };
        this.sessionStorageFactory.asScoped(request).set(cookie);
        return response.redirected({
          headers: {
            location
          }
        });
      }

      // Authentication callback
      // validate state first
      let cookie;
      try {
        var _cookie$oidc;
        cookie = await this.sessionStorageFactory.asScoped(request).get();
        if (!cookie || !((_cookie$oidc = cookie.oidc) !== null && _cookie$oidc !== void 0 && _cookie$oidc.state) || cookie.oidc.state !== request.query.state) {
          return this.redirectToLogin(request, response);
        }
      } catch (error) {
        return this.redirectToLogin(request, response);
      }
      const nextUrl = cookie.oidc.nextUrl;
      const clientId = (_this$config$openid2 = this.config.openid) === null || _this$config$openid2 === void 0 ? void 0 : _this$config$openid2.client_id;
      const clientSecret = (_this$config$openid3 = this.config.openid) === null || _this$config$openid3 === void 0 ? void 0 : _this$config$openid3.client_secret;
      const redirectHash = ((_cookie$oidc2 = cookie.oidc) === null || _cookie$oidc2 === void 0 ? void 0 : _cookie$oidc2.redirectHash) || false;
      const query = {
        grant_type: _common.AUTH_GRANT_TYPE,
        code: request.query.code,
        redirect_uri: `${(0, _helper.getBaseRedirectUrl)(this.config, this.core, request)}${_common.OPENID_AUTH_LOGIN}`,
        client_id: clientId,
        client_secret: clientSecret
      };
      (0, _helper.includeAdditionalParameters)(query, context, this.config);
      try {
        var _this$config$openid4;
        const tokenResponse = await (0, _helper.callTokenEndpoint)(this.openIdAuthConfig.tokenEndpoint, query, this.wreckClient);
        const user = await this.securityClient.authenticateWithHeader(request, this.openIdAuthConfig.authHeaderName, `Bearer ${tokenResponse.idToken}`);

        // set to cookie
        const sessionStorage = {
          username: user.username,
          credentials: {
            authHeaderValueExtra: true
          },
          authType: _common.AuthType.OPEN_ID,
          expiryTime: (0, _helper.getExpirationDate)(tokenResponse)
        };
        if ((_this$config$openid4 = this.config.openid) !== null && _this$config$openid4 !== void 0 && _this$config$openid4.refresh_tokens && tokenResponse.refreshToken) {
          Object.assign(sessionStorage.credentials, {
            refresh_token: tokenResponse.refreshToken
          });
        }
        (0, _cookie_splitter.setExtraAuthStorage)(request, `Bearer ${tokenResponse.idToken}`, this.getExtraAuthStorageOptions(context.security_plugin.logger));
        this.sessionStorageFactory.asScoped(request).set(sessionStorage);
        if (redirectHash) {
          return response.redirected({
            headers: {
              location: `${this.core.http.basePath.serverBasePath}/auth/openid/redirectUrlFragment?nextUrl=${escape(nextUrl)}`
            }
          });
        } else {
          return response.redirected({
            headers: {
              location: nextUrl
            }
          });
        }
      } catch (error) {
        context.security_plugin.logger.error(`OpenId authentication failed: ${error}`);
        if (error.toString().toLowerCase().includes('authentication exception')) {
          return response.unauthorized();
        } else {
          return this.redirectToLogin(request, response);
        }
      }
    });
    this.router.get({
      path: _common.OPENID_AUTH_LOGOUT,
      validate: false
    }, async (context, request, response) => {
      var _cookie$credentials, _this$config$openid5;
      const cookie = await this.sessionStorageFactory.asScoped(request).get();
      let tokenFromExtraStorage = '';
      const extraAuthStorageOptions = this.getExtraAuthStorageOptions(context.security_plugin.logger);
      if (cookie !== null && cookie !== void 0 && (_cookie$credentials = cookie.credentials) !== null && _cookie$credentials !== void 0 && _cookie$credentials.authHeaderValueExtra) {
        tokenFromExtraStorage = (0, _cookie_splitter.getExtraAuthStorageValue)(request, extraAuthStorageOptions);
      }
      (0, _cookie_splitter.clearSplitCookies)(request, extraAuthStorageOptions);
      this.sessionStorageFactory.asScoped(request).clear();

      // authHeaderValue is the bearer header, e.g. "Bearer <auth_token>"
      const token = tokenFromExtraStorage.length ? tokenFromExtraStorage.split(' ')[1] : cookie === null || cookie === void 0 ? void 0 : cookie.credentials.authHeaderValue.split(' ')[1]; // get auth token
      const nextUrl = (0, _helper.getBaseRedirectUrl)(this.config, this.core, request);
      const logoutQueryParams = {
        post_logout_redirect_uri: `${nextUrl}`,
        id_token_hint: token
      };
      const endSessionUrl = (0, _helper.composeLogoutUrl)((_this$config$openid5 = this.config.openid) === null || _this$config$openid5 === void 0 ? void 0 : _this$config$openid5.logout_url, this.openIdAuthConfig.endSessionEndpoint, logoutQueryParams);
      return response.redirected({
        headers: {
          location: endSessionUrl
        }
      });
    });

    // captureUrlFragment is the first route that will be invoked in the SP initiated login.
    // This route will execute the captureUrlFragment.js script.
    this.core.http.resources.register({
      path: '/auth/openid/captureUrlFragment',
      validate: {
        query: _configSchema.schema.object({
          nextUrl: _configSchema.schema.maybe(_configSchema.schema.string({
            validate: _next_url.validateNextUrl
          }))
        })
      },
      options: {
        authRequired: false
      }
    }, async (context, request, response) => {
      this.sessionStorageFactory.asScoped(request).clear();
      const serverBasePath = this.core.http.basePath.serverBasePath;
      return response.renderHtml({
        body: `
          <!DOCTYPE html>
          <title>OSD OIDC Capture</title>
          <link rel="icon" href="data:,">
          <script src="${serverBasePath}/auth/openid/captureUrlFragment.js"></script>
        `
      });
    });

    // This script will store the URL Hash in browser's local storage.
    this.core.http.resources.register({
      path: '/auth/openid/captureUrlFragment.js',
      validate: false,
      options: {
        authRequired: false
      }
    }, async (context, request, response) => {
      this.sessionStorageFactory.asScoped(request).clear();
      return response.renderJs({
        body: `let oidcHash=window.location.hash.toString();
                let redirectHash = false;
                if (oidcHash !== "") {
                  window.localStorage.removeItem('oidcHash');
                  window.localStorage.setItem('oidcHash', oidcHash);
                    redirectHash = true;
                }
                let params = new URLSearchParams(window.location.search);
                let nextUrl = params.get("nextUrl");
                finalUrl = "login?nextUrl=" + encodeURIComponent(nextUrl);
                finalUrl += "&redirectHash=" + encodeURIComponent(redirectHash);
                window.location.replace(finalUrl);
              `
      });
    });

    //  Once the User is authenticated the browser will be redirected to '/auth/openid/redirectUrlFragment'
    //  route, which will execute the redirectUrlFragment.js.
    this.core.http.resources.register({
      path: '/auth/openid/redirectUrlFragment',
      validate: {
        query: _configSchema.schema.object({
          nextUrl: _configSchema.schema.any()
        })
      },
      options: {
        authRequired: true
      }
    }, async (context, request, response) => {
      const serverBasePath = this.core.http.basePath.serverBasePath;
      return response.renderHtml({
        body: `
          <!DOCTYPE html>
          <title>OSD OpenID Success</title>
          <link rel="icon" href="data:,">
          <script src="${serverBasePath}/auth/openid/redirectUrlFragment.js"></script>
        `
      });
    });

    // This script will pop the Hash from local storage if it exists.
    // And forward the browser to the next url.
    this.core.http.resources.register({
      path: '/auth/openid/redirectUrlFragment.js',
      validate: false,
      options: {
        authRequired: true
      }
    }, async (context, request, response) => {
      return response.renderJs({
        body: `let oidcHash=window.localStorage.getItem('oidcHash');
                window.localStorage.removeItem('oidcHash');
                let params = new URLSearchParams(window.location.search);
                let nextUrl = params.get("nextUrl");
                finalUrl = nextUrl + oidcHash;
                window.location.replace(finalUrl);
              `
      });
    });
  }
}
exports.OpenIdAuthRoutes = OpenIdAuthRoutes;
_defineProperty(OpenIdAuthRoutes, "NONCE_LENGTH", 22);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY29uZmlnU2NoZW1hIiwicmVxdWlyZSIsIl9jcnlwdGlsZXMiLCJfcXVlcnlzdHJpbmciLCJfaGVscGVyIiwiX25leHRfdXJsIiwiX2NvbW1vbiIsIl9jb29raWVfc3BsaXR0ZXIiLCJfZGVmaW5lUHJvcGVydHkiLCJvYmoiLCJrZXkiLCJ2YWx1ZSIsIl90b1Byb3BlcnR5S2V5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJhcmciLCJfdG9QcmltaXRpdmUiLCJTdHJpbmciLCJpbnB1dCIsImhpbnQiLCJwcmltIiwiU3ltYm9sIiwidG9QcmltaXRpdmUiLCJ1bmRlZmluZWQiLCJyZXMiLCJjYWxsIiwiVHlwZUVycm9yIiwiTnVtYmVyIiwiT3BlbklkQXV0aFJvdXRlcyIsImNvbnN0cnVjdG9yIiwicm91dGVyIiwiY29uZmlnIiwic2Vzc2lvblN0b3JhZ2VGYWN0b3J5Iiwib3BlbklkQXV0aENvbmZpZyIsInNlY3VyaXR5Q2xpZW50IiwiY29yZSIsIndyZWNrQ2xpZW50IiwicmVkaXJlY3RUb0xvZ2luIiwicmVxdWVzdCIsInJlc3BvbnNlIiwiYXNTY29wZWQiLCJjbGVhciIsInJlZGlyZWN0ZWQiLCJoZWFkZXJzIiwibG9jYXRpb24iLCJodHRwIiwiYmFzZVBhdGgiLCJzZXJ2ZXJCYXNlUGF0aCIsIk9QRU5JRF9BVVRIX0xPR0lOIiwiZ2V0RXh0cmFBdXRoU3RvcmFnZU9wdGlvbnMiLCJsb2dnZXIiLCJjb29raWVQcmVmaXgiLCJvcGVuaWQiLCJleHRyYV9zdG9yYWdlIiwiY29va2llX3ByZWZpeCIsImFkZGl0aW9uYWxDb29raWVzIiwiYWRkaXRpb25hbF9jb29raWVzIiwic2V0dXBSb3V0ZXMiLCJnZXQiLCJwYXRoIiwidmFsaWRhdGUiLCJxdWVyeSIsInNjaGVtYSIsIm9iamVjdCIsImNvZGUiLCJtYXliZSIsInN0cmluZyIsIm5leHRVcmwiLCJ2YWxpZGF0ZU5leHRVcmwiLCJyZWRpcmVjdEhhc2giLCJib29sZWFuIiwic3RhdGUiLCJyZWZyZXNoIiwidW5rbm93bnMiLCJvcHRpb25zIiwiYXV0aFJlcXVpcmVkIiwiY29udGV4dCIsIl90aGlzJGNvbmZpZyRvcGVuaWQyIiwiX3RoaXMkY29uZmlnJG9wZW5pZDMiLCJfY29va2llJG9pZGMyIiwiX3RoaXMkY29uZmlnJG9wZW5pZCIsIm5vbmNlIiwicmFuZG9tU3RyaW5nIiwiTk9OQ0VfTEVOR1RIIiwiY2xpZW50X2lkIiwicmVzcG9uc2VfdHlwZSIsIkFVVEhfUkVTUE9OU0VfVFlQRSIsInJlZGlyZWN0X3VyaSIsImdldEJhc2VSZWRpcmVjdFVybCIsInNjb3BlIiwiaW5jbHVkZUFkZGl0aW9uYWxQYXJhbWV0ZXJzIiwicXVlcnlTdHJpbmciLCJzdHJpbmdpZnkiLCJhdXRob3JpemF0aW9uRW5kcG9pbnQiLCJjb29raWUiLCJvaWRjIiwiZ2V0TmV4dFVybCIsImF1dGhUeXBlIiwiQXV0aFR5cGUiLCJPUEVOX0lEIiwic2V0IiwiX2Nvb2tpZSRvaWRjIiwiZXJyb3IiLCJjbGllbnRJZCIsImNsaWVudFNlY3JldCIsImNsaWVudF9zZWNyZXQiLCJncmFudF90eXBlIiwiQVVUSF9HUkFOVF9UWVBFIiwiX3RoaXMkY29uZmlnJG9wZW5pZDQiLCJ0b2tlblJlc3BvbnNlIiwiY2FsbFRva2VuRW5kcG9pbnQiLCJ0b2tlbkVuZHBvaW50IiwidXNlciIsImF1dGhlbnRpY2F0ZVdpdGhIZWFkZXIiLCJhdXRoSGVhZGVyTmFtZSIsImlkVG9rZW4iLCJzZXNzaW9uU3RvcmFnZSIsInVzZXJuYW1lIiwiY3JlZGVudGlhbHMiLCJhdXRoSGVhZGVyVmFsdWVFeHRyYSIsImV4cGlyeVRpbWUiLCJnZXRFeHBpcmF0aW9uRGF0ZSIsInJlZnJlc2hfdG9rZW5zIiwicmVmcmVzaFRva2VuIiwiYXNzaWduIiwicmVmcmVzaF90b2tlbiIsInNldEV4dHJhQXV0aFN0b3JhZ2UiLCJzZWN1cml0eV9wbHVnaW4iLCJlc2NhcGUiLCJ0b1N0cmluZyIsInRvTG93ZXJDYXNlIiwiaW5jbHVkZXMiLCJ1bmF1dGhvcml6ZWQiLCJPUEVOSURfQVVUSF9MT0dPVVQiLCJfY29va2llJGNyZWRlbnRpYWxzIiwiX3RoaXMkY29uZmlnJG9wZW5pZDUiLCJ0b2tlbkZyb21FeHRyYVN0b3JhZ2UiLCJleHRyYUF1dGhTdG9yYWdlT3B0aW9ucyIsImdldEV4dHJhQXV0aFN0b3JhZ2VWYWx1ZSIsImNsZWFyU3BsaXRDb29raWVzIiwidG9rZW4iLCJsZW5ndGgiLCJzcGxpdCIsImF1dGhIZWFkZXJWYWx1ZSIsImxvZ291dFF1ZXJ5UGFyYW1zIiwicG9zdF9sb2dvdXRfcmVkaXJlY3RfdXJpIiwiaWRfdG9rZW5faGludCIsImVuZFNlc3Npb25VcmwiLCJjb21wb3NlTG9nb3V0VXJsIiwibG9nb3V0X3VybCIsImVuZFNlc3Npb25FbmRwb2ludCIsInJlc291cmNlcyIsInJlZ2lzdGVyIiwicmVuZGVySHRtbCIsImJvZHkiLCJyZW5kZXJKcyIsImFueSIsImV4cG9ydHMiXSwic291cmNlcyI6WyJyb3V0ZXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqICAgQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKlxuICogICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpLlxuICogICBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgIEEgY29weSBvZiB0aGUgTGljZW5zZSBpcyBsb2NhdGVkIGF0XG4gKlxuICogICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogICBvciBpbiB0aGUgXCJsaWNlbnNlXCIgZmlsZSBhY2NvbXBhbnlpbmcgdGhpcyBmaWxlLiBUaGlzIGZpbGUgaXMgZGlzdHJpYnV0ZWRcbiAqICAgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiAgIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nXG4gKiAgIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuaW1wb3J0IHsgc2NoZW1hIH0gZnJvbSAnQG9zZC9jb25maWctc2NoZW1hJztcbmltcG9ydCB7IHJhbmRvbVN0cmluZyB9IGZyb20gJ0BoYXBpL2NyeXB0aWxlcyc7XG5pbXBvcnQgeyBzdHJpbmdpZnkgfSBmcm9tICdxdWVyeXN0cmluZyc7XG5pbXBvcnQgd3JlY2sgZnJvbSAnQGhhcGkvd3JlY2snO1xuaW1wb3J0IHtcbiAgSVJvdXRlcixcbiAgU2Vzc2lvblN0b3JhZ2VGYWN0b3J5LFxuICBDb3JlU2V0dXAsXG4gIE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gIExvZ2dlcixcbn0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvc2VydmVyJztcbmltcG9ydCB7IFNlY3VyaXR5U2Vzc2lvbkNvb2tpZSB9IGZyb20gJy4uLy4uLy4uL3Nlc3Npb24vc2VjdXJpdHlfY29va2llJztcbmltcG9ydCB7IFNlY3VyaXR5UGx1Z2luQ29uZmlnVHlwZSB9IGZyb20gJy4uLy4uLy4uJztcbmltcG9ydCB7IE9wZW5JZEF1dGhDb25maWcgfSBmcm9tICcuL29wZW5pZF9hdXRoJztcbmltcG9ydCB7IFNlY3VyaXR5Q2xpZW50IH0gZnJvbSAnLi4vLi4vLi4vYmFja2VuZC9vcGVuc2VhcmNoX3NlY3VyaXR5X2NsaWVudCc7XG5pbXBvcnQge1xuICBnZXRCYXNlUmVkaXJlY3RVcmwsXG4gIGNhbGxUb2tlbkVuZHBvaW50LFxuICBjb21wb3NlTG9nb3V0VXJsLFxuICBnZXROZXh0VXJsLFxuICBnZXRFeHBpcmF0aW9uRGF0ZSxcbiAgaW5jbHVkZUFkZGl0aW9uYWxQYXJhbWV0ZXJzLFxufSBmcm9tICcuL2hlbHBlcic7XG5pbXBvcnQgeyB2YWxpZGF0ZU5leHRVcmwgfSBmcm9tICcuLi8uLi8uLi91dGlscy9uZXh0X3VybCc7XG5pbXBvcnQge1xuICBBdXRoVHlwZSxcbiAgT1BFTklEX0FVVEhfTE9HSU4sXG4gIEFVVEhfR1JBTlRfVFlQRSxcbiAgQVVUSF9SRVNQT05TRV9UWVBFLFxuICBPUEVOSURfQVVUSF9MT0dPVVQsXG4gIExPR0lOX1BBR0VfVVJJLFxufSBmcm9tICcuLi8uLi8uLi8uLi9jb21tb24nO1xuXG5pbXBvcnQge1xuICBjbGVhclNwbGl0Q29va2llcyxcbiAgRXh0cmFBdXRoU3RvcmFnZU9wdGlvbnMsXG4gIGdldEV4dHJhQXV0aFN0b3JhZ2VWYWx1ZSxcbiAgc2V0RXh0cmFBdXRoU3RvcmFnZSxcbn0gZnJvbSAnLi4vLi4vLi4vc2Vzc2lvbi9jb29raWVfc3BsaXR0ZXInO1xuXG5leHBvcnQgY2xhc3MgT3BlbklkQXV0aFJvdXRlcyB7XG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IE5PTkNFX0xFTkdUSDogbnVtYmVyID0gMjI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSByb3V0ZXI6IElSb3V0ZXIsXG4gICAgcHJpdmF0ZSByZWFkb25seSBjb25maWc6IFNlY3VyaXR5UGx1Z2luQ29uZmlnVHlwZSxcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNlc3Npb25TdG9yYWdlRmFjdG9yeTogU2Vzc2lvblN0b3JhZ2VGYWN0b3J5PFNlY3VyaXR5U2Vzc2lvbkNvb2tpZT4sXG4gICAgcHJpdmF0ZSByZWFkb25seSBvcGVuSWRBdXRoQ29uZmlnOiBPcGVuSWRBdXRoQ29uZmlnLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2VjdXJpdHlDbGllbnQ6IFNlY3VyaXR5Q2xpZW50LFxuICAgIHByaXZhdGUgcmVhZG9ubHkgY29yZTogQ29yZVNldHVwLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgd3JlY2tDbGllbnQ6IHR5cGVvZiB3cmVja1xuICApIHt9XG5cbiAgcHJpdmF0ZSByZWRpcmVjdFRvTG9naW4oXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApIHtcbiAgICB0aGlzLnNlc3Npb25TdG9yYWdlRmFjdG9yeS5hc1Njb3BlZChyZXF1ZXN0KS5jbGVhcigpO1xuICAgIHJldHVybiByZXNwb25zZS5yZWRpcmVjdGVkKHtcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgbG9jYXRpb246IGAke3RoaXMuY29yZS5odHRwLmJhc2VQYXRoLnNlcnZlckJhc2VQYXRofSR7T1BFTklEX0FVVEhfTE9HSU59YCxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldEV4dHJhQXV0aFN0b3JhZ2VPcHRpb25zKGxvZ2dlcj86IExvZ2dlcik6IEV4dHJhQXV0aFN0b3JhZ2VPcHRpb25zIHtcbiAgICAvLyBJZiB3ZSdyZSBoZXJlLCB3ZSB3aWxsIGFsd2F5cyBoYXZlIHRoZSBvcGVuaWQgY29uZmlndXJhdGlvblxuICAgIHJldHVybiB7XG4gICAgICBjb29raWVQcmVmaXg6IHRoaXMuY29uZmlnLm9wZW5pZCEuZXh0cmFfc3RvcmFnZS5jb29raWVfcHJlZml4LFxuICAgICAgYWRkaXRpb25hbENvb2tpZXM6IHRoaXMuY29uZmlnLm9wZW5pZCEuZXh0cmFfc3RvcmFnZS5hZGRpdGlvbmFsX2Nvb2tpZXMsXG4gICAgICBsb2dnZXIsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cFJvdXRlcygpIHtcbiAgICB0aGlzLnJvdXRlci5nZXQoXG4gICAgICB7XG4gICAgICAgIHBhdGg6IE9QRU5JRF9BVVRIX0xPR0lOLFxuICAgICAgICB2YWxpZGF0ZToge1xuICAgICAgICAgIHF1ZXJ5OiBzY2hlbWEub2JqZWN0KFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjb2RlOiBzY2hlbWEubWF5YmUoc2NoZW1hLnN0cmluZygpKSxcbiAgICAgICAgICAgICAgbmV4dFVybDogc2NoZW1hLm1heWJlKFxuICAgICAgICAgICAgICAgIHNjaGVtYS5zdHJpbmcoe1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGU6IHZhbGlkYXRlTmV4dFVybCxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICByZWRpcmVjdEhhc2g6IHNjaGVtYS5tYXliZShzY2hlbWEuYm9vbGVhbigpKSxcbiAgICAgICAgICAgICAgc3RhdGU6IHNjaGVtYS5tYXliZShzY2hlbWEuc3RyaW5nKCkpLFxuICAgICAgICAgICAgICByZWZyZXNoOiBzY2hlbWEubWF5YmUoc2NoZW1hLnN0cmluZygpKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHVua25vd25zOiAnYWxsb3cnLFxuICAgICAgICAgICAgfVxuICAgICAgICAgICksXG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBhdXRoUmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGFzeW5jIChjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgICAvLyBpbXBsZW1lbnRhdGlvbiByZWZlcnMgdG8gaHR0cHM6Ly9naXRodWIuY29tL2hhcGlqcy9iZWxsL2Jsb2IvbWFzdGVyL2xpYi9vYXV0aC5qc1xuICAgICAgICAvLyBTaWduLWluIGluaXRpYWxpemF0aW9uXG4gICAgICAgIGlmICghcmVxdWVzdC5xdWVyeS5jb2RlKSB7XG4gICAgICAgICAgY29uc3Qgbm9uY2UgPSByYW5kb21TdHJpbmcoT3BlbklkQXV0aFJvdXRlcy5OT05DRV9MRU5HVEgpO1xuICAgICAgICAgIGNvbnN0IHF1ZXJ5OiBhbnkgPSB7XG4gICAgICAgICAgICBjbGllbnRfaWQ6IHRoaXMuY29uZmlnLm9wZW5pZD8uY2xpZW50X2lkLFxuICAgICAgICAgICAgcmVzcG9uc2VfdHlwZTogQVVUSF9SRVNQT05TRV9UWVBFLFxuICAgICAgICAgICAgcmVkaXJlY3RfdXJpOiBgJHtnZXRCYXNlUmVkaXJlY3RVcmwoXG4gICAgICAgICAgICAgIHRoaXMuY29uZmlnLFxuICAgICAgICAgICAgICB0aGlzLmNvcmUsXG4gICAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICAgICl9JHtPUEVOSURfQVVUSF9MT0dJTn1gLFxuICAgICAgICAgICAgc3RhdGU6IG5vbmNlLFxuICAgICAgICAgICAgc2NvcGU6IHRoaXMub3BlbklkQXV0aENvbmZpZy5zY29wZSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIGluY2x1ZGVBZGRpdGlvbmFsUGFyYW1ldGVycyhxdWVyeSwgY29udGV4dCwgdGhpcy5jb25maWcpO1xuICAgICAgICAgIGNvbnN0IHF1ZXJ5U3RyaW5nID0gc3RyaW5naWZ5KHF1ZXJ5KTtcbiAgICAgICAgICBjb25zdCBsb2NhdGlvbiA9IGAke3RoaXMub3BlbklkQXV0aENvbmZpZy5hdXRob3JpemF0aW9uRW5kcG9pbnR9PyR7cXVlcnlTdHJpbmd9YDtcbiAgICAgICAgICBjb25zdCBjb29raWU6IFNlY3VyaXR5U2Vzc2lvbkNvb2tpZSA9IHtcbiAgICAgICAgICAgIG9pZGM6IHtcbiAgICAgICAgICAgICAgc3RhdGU6IG5vbmNlLFxuICAgICAgICAgICAgICBuZXh0VXJsOiBnZXROZXh0VXJsKHRoaXMuY29uZmlnLCB0aGlzLmNvcmUsIHJlcXVlc3QpLFxuICAgICAgICAgICAgICByZWRpcmVjdEhhc2g6IHJlcXVlc3QucXVlcnkucmVkaXJlY3RIYXNoID09PSAndHJ1ZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXV0aFR5cGU6IEF1dGhUeXBlLk9QRU5fSUQsXG4gICAgICAgICAgfTtcbiAgICAgICAgICB0aGlzLnNlc3Npb25TdG9yYWdlRmFjdG9yeS5hc1Njb3BlZChyZXF1ZXN0KS5zZXQoY29va2llKTtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UucmVkaXJlY3RlZCh7XG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgIGxvY2F0aW9uLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEF1dGhlbnRpY2F0aW9uIGNhbGxiYWNrXG4gICAgICAgIC8vIHZhbGlkYXRlIHN0YXRlIGZpcnN0XG4gICAgICAgIGxldCBjb29raWU7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29va2llID0gYXdhaXQgdGhpcy5zZXNzaW9uU3RvcmFnZUZhY3RvcnkuYXNTY29wZWQocmVxdWVzdCkuZ2V0KCk7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIWNvb2tpZSB8fFxuICAgICAgICAgICAgIWNvb2tpZS5vaWRjPy5zdGF0ZSB8fFxuICAgICAgICAgICAgY29va2llLm9pZGMuc3RhdGUgIT09IChyZXF1ZXN0LnF1ZXJ5IGFzIGFueSkuc3RhdGVcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZGlyZWN0VG9Mb2dpbihyZXF1ZXN0LCByZXNwb25zZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHJldHVybiB0aGlzLnJlZGlyZWN0VG9Mb2dpbihyZXF1ZXN0LCByZXNwb25zZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV4dFVybDogc3RyaW5nID0gY29va2llLm9pZGMubmV4dFVybDtcbiAgICAgICAgY29uc3QgY2xpZW50SWQgPSB0aGlzLmNvbmZpZy5vcGVuaWQ/LmNsaWVudF9pZDtcbiAgICAgICAgY29uc3QgY2xpZW50U2VjcmV0ID0gdGhpcy5jb25maWcub3BlbmlkPy5jbGllbnRfc2VjcmV0O1xuICAgICAgICBjb25zdCByZWRpcmVjdEhhc2g6IGJvb2xlYW4gPSBjb29raWUub2lkYz8ucmVkaXJlY3RIYXNoIHx8IGZhbHNlO1xuICAgICAgICBjb25zdCBxdWVyeTogYW55ID0ge1xuICAgICAgICAgIGdyYW50X3R5cGU6IEFVVEhfR1JBTlRfVFlQRSxcbiAgICAgICAgICBjb2RlOiByZXF1ZXN0LnF1ZXJ5LmNvZGUsXG4gICAgICAgICAgcmVkaXJlY3RfdXJpOiBgJHtnZXRCYXNlUmVkaXJlY3RVcmwoXG4gICAgICAgICAgICB0aGlzLmNvbmZpZyxcbiAgICAgICAgICAgIHRoaXMuY29yZSxcbiAgICAgICAgICAgIHJlcXVlc3RcbiAgICAgICAgICApfSR7T1BFTklEX0FVVEhfTE9HSU59YCxcbiAgICAgICAgICBjbGllbnRfaWQ6IGNsaWVudElkLFxuICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IGNsaWVudFNlY3JldCxcbiAgICAgICAgfTtcbiAgICAgICAgaW5jbHVkZUFkZGl0aW9uYWxQYXJhbWV0ZXJzKHF1ZXJ5LCBjb250ZXh0LCB0aGlzLmNvbmZpZyk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgdG9rZW5SZXNwb25zZSA9IGF3YWl0IGNhbGxUb2tlbkVuZHBvaW50KFxuICAgICAgICAgICAgdGhpcy5vcGVuSWRBdXRoQ29uZmlnLnRva2VuRW5kcG9pbnQhLFxuICAgICAgICAgICAgcXVlcnksXG4gICAgICAgICAgICB0aGlzLndyZWNrQ2xpZW50XG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCB1c2VyID0gYXdhaXQgdGhpcy5zZWN1cml0eUNsaWVudC5hdXRoZW50aWNhdGVXaXRoSGVhZGVyKFxuICAgICAgICAgICAgcmVxdWVzdCxcbiAgICAgICAgICAgIHRoaXMub3BlbklkQXV0aENvbmZpZy5hdXRoSGVhZGVyTmFtZSBhcyBzdHJpbmcsXG4gICAgICAgICAgICBgQmVhcmVyICR7dG9rZW5SZXNwb25zZS5pZFRva2VufWBcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgLy8gc2V0IHRvIGNvb2tpZVxuICAgICAgICAgIGNvbnN0IHNlc3Npb25TdG9yYWdlOiBTZWN1cml0eVNlc3Npb25Db29raWUgPSB7XG4gICAgICAgICAgICB1c2VybmFtZTogdXNlci51c2VybmFtZSxcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgICAgICAgIGF1dGhIZWFkZXJWYWx1ZUV4dHJhOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF1dGhUeXBlOiBBdXRoVHlwZS5PUEVOX0lELFxuICAgICAgICAgICAgZXhwaXJ5VGltZTogZ2V0RXhwaXJhdGlvbkRhdGUodG9rZW5SZXNwb25zZSksXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpZiAodGhpcy5jb25maWcub3BlbmlkPy5yZWZyZXNoX3Rva2VucyAmJiB0b2tlblJlc3BvbnNlLnJlZnJlc2hUb2tlbikge1xuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihzZXNzaW9uU3RvcmFnZS5jcmVkZW50aWFscywge1xuICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuOiB0b2tlblJlc3BvbnNlLnJlZnJlc2hUb2tlbixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHNldEV4dHJhQXV0aFN0b3JhZ2UoXG4gICAgICAgICAgICByZXF1ZXN0LFxuICAgICAgICAgICAgYEJlYXJlciAke3Rva2VuUmVzcG9uc2UuaWRUb2tlbn1gLFxuICAgICAgICAgICAgdGhpcy5nZXRFeHRyYUF1dGhTdG9yYWdlT3B0aW9ucyhjb250ZXh0LnNlY3VyaXR5X3BsdWdpbi5sb2dnZXIpXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2VGYWN0b3J5LmFzU2NvcGVkKHJlcXVlc3QpLnNldChzZXNzaW9uU3RvcmFnZSk7XG4gICAgICAgICAgaWYgKHJlZGlyZWN0SGFzaCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnJlZGlyZWN0ZWQoe1xuICAgICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb246IGAke1xuICAgICAgICAgICAgICAgICAgdGhpcy5jb3JlLmh0dHAuYmFzZVBhdGguc2VydmVyQmFzZVBhdGhcbiAgICAgICAgICAgICAgICB9L2F1dGgvb3BlbmlkL3JlZGlyZWN0VXJsRnJhZ21lbnQ/bmV4dFVybD0ke2VzY2FwZShuZXh0VXJsKX1gLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5yZWRpcmVjdGVkKHtcbiAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBuZXh0VXJsLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAgICAgY29udGV4dC5zZWN1cml0eV9wbHVnaW4ubG9nZ2VyLmVycm9yKGBPcGVuSWQgYXV0aGVudGljYXRpb24gZmFpbGVkOiAke2Vycm9yfWApO1xuICAgICAgICAgIGlmIChlcnJvci50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMoJ2F1dGhlbnRpY2F0aW9uIGV4Y2VwdGlvbicpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UudW5hdXRob3JpemVkKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZGlyZWN0VG9Mb2dpbihyZXF1ZXN0LCByZXNwb25zZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcblxuICAgIHRoaXMucm91dGVyLmdldChcbiAgICAgIHtcbiAgICAgICAgcGF0aDogT1BFTklEX0FVVEhfTE9HT1VULFxuICAgICAgICB2YWxpZGF0ZTogZmFsc2UsXG4gICAgICB9LFxuICAgICAgYXN5bmMgKGNvbnRleHQsIHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvb2tpZSA9IGF3YWl0IHRoaXMuc2Vzc2lvblN0b3JhZ2VGYWN0b3J5LmFzU2NvcGVkKHJlcXVlc3QpLmdldCgpO1xuICAgICAgICBsZXQgdG9rZW5Gcm9tRXh0cmFTdG9yYWdlID0gJyc7XG5cbiAgICAgICAgY29uc3QgZXh0cmFBdXRoU3RvcmFnZU9wdGlvbnM6IEV4dHJhQXV0aFN0b3JhZ2VPcHRpb25zID0gdGhpcy5nZXRFeHRyYUF1dGhTdG9yYWdlT3B0aW9ucyhcbiAgICAgICAgICBjb250ZXh0LnNlY3VyaXR5X3BsdWdpbi5sb2dnZXJcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoY29va2llPy5jcmVkZW50aWFscz8uYXV0aEhlYWRlclZhbHVlRXh0cmEpIHtcbiAgICAgICAgICB0b2tlbkZyb21FeHRyYVN0b3JhZ2UgPSBnZXRFeHRyYUF1dGhTdG9yYWdlVmFsdWUocmVxdWVzdCwgZXh0cmFBdXRoU3RvcmFnZU9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xlYXJTcGxpdENvb2tpZXMocmVxdWVzdCwgZXh0cmFBdXRoU3RvcmFnZU9wdGlvbnMpO1xuICAgICAgICB0aGlzLnNlc3Npb25TdG9yYWdlRmFjdG9yeS5hc1Njb3BlZChyZXF1ZXN0KS5jbGVhcigpO1xuXG4gICAgICAgIC8vIGF1dGhIZWFkZXJWYWx1ZSBpcyB0aGUgYmVhcmVyIGhlYWRlciwgZS5nLiBcIkJlYXJlciA8YXV0aF90b2tlbj5cIlxuICAgICAgICBjb25zdCB0b2tlbiA9IHRva2VuRnJvbUV4dHJhU3RvcmFnZS5sZW5ndGhcbiAgICAgICAgICA/IHRva2VuRnJvbUV4dHJhU3RvcmFnZS5zcGxpdCgnICcpWzFdXG4gICAgICAgICAgOiBjb29raWU/LmNyZWRlbnRpYWxzLmF1dGhIZWFkZXJWYWx1ZS5zcGxpdCgnICcpWzFdOyAvLyBnZXQgYXV0aCB0b2tlblxuICAgICAgICBjb25zdCBuZXh0VXJsID0gZ2V0QmFzZVJlZGlyZWN0VXJsKHRoaXMuY29uZmlnLCB0aGlzLmNvcmUsIHJlcXVlc3QpO1xuXG4gICAgICAgIGNvbnN0IGxvZ291dFF1ZXJ5UGFyYW1zID0ge1xuICAgICAgICAgIHBvc3RfbG9nb3V0X3JlZGlyZWN0X3VyaTogYCR7bmV4dFVybH1gLFxuICAgICAgICAgIGlkX3Rva2VuX2hpbnQ6IHRva2VuLFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGVuZFNlc3Npb25VcmwgPSBjb21wb3NlTG9nb3V0VXJsKFxuICAgICAgICAgIHRoaXMuY29uZmlnLm9wZW5pZD8ubG9nb3V0X3VybCxcbiAgICAgICAgICB0aGlzLm9wZW5JZEF1dGhDb25maWcuZW5kU2Vzc2lvbkVuZHBvaW50LFxuICAgICAgICAgIGxvZ291dFF1ZXJ5UGFyYW1zXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnJlZGlyZWN0ZWQoe1xuICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIGxvY2F0aW9uOiBlbmRTZXNzaW9uVXJsLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBjYXB0dXJlVXJsRnJhZ21lbnQgaXMgdGhlIGZpcnN0IHJvdXRlIHRoYXQgd2lsbCBiZSBpbnZva2VkIGluIHRoZSBTUCBpbml0aWF0ZWQgbG9naW4uXG4gICAgLy8gVGhpcyByb3V0ZSB3aWxsIGV4ZWN1dGUgdGhlIGNhcHR1cmVVcmxGcmFnbWVudC5qcyBzY3JpcHQuXG4gICAgdGhpcy5jb3JlLmh0dHAucmVzb3VyY2VzLnJlZ2lzdGVyKFxuICAgICAge1xuICAgICAgICBwYXRoOiAnL2F1dGgvb3BlbmlkL2NhcHR1cmVVcmxGcmFnbWVudCcsXG4gICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgcXVlcnk6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICAgICAgbmV4dFVybDogc2NoZW1hLm1heWJlKFxuICAgICAgICAgICAgICBzY2hlbWEuc3RyaW5nKHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogdmFsaWRhdGVOZXh0VXJsLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIGF1dGhSZXF1aXJlZDogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgYXN5bmMgKGNvbnRleHQsIHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2VGYWN0b3J5LmFzU2NvcGVkKHJlcXVlc3QpLmNsZWFyKCk7XG4gICAgICAgIGNvbnN0IHNlcnZlckJhc2VQYXRoID0gdGhpcy5jb3JlLmh0dHAuYmFzZVBhdGguc2VydmVyQmFzZVBhdGg7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5yZW5kZXJIdG1sKHtcbiAgICAgICAgICBib2R5OiBgXG4gICAgICAgICAgPCFET0NUWVBFIGh0bWw+XG4gICAgICAgICAgPHRpdGxlPk9TRCBPSURDIENhcHR1cmU8L3RpdGxlPlxuICAgICAgICAgIDxsaW5rIHJlbD1cImljb25cIiBocmVmPVwiZGF0YTosXCI+XG4gICAgICAgICAgPHNjcmlwdCBzcmM9XCIke3NlcnZlckJhc2VQYXRofS9hdXRoL29wZW5pZC9jYXB0dXJlVXJsRnJhZ21lbnQuanNcIj48L3NjcmlwdD5cbiAgICAgICAgYCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgKTtcblxuICAgIC8vIFRoaXMgc2NyaXB0IHdpbGwgc3RvcmUgdGhlIFVSTCBIYXNoIGluIGJyb3dzZXIncyBsb2NhbCBzdG9yYWdlLlxuICAgIHRoaXMuY29yZS5odHRwLnJlc291cmNlcy5yZWdpc3RlcihcbiAgICAgIHtcbiAgICAgICAgcGF0aDogJy9hdXRoL29wZW5pZC9jYXB0dXJlVXJsRnJhZ21lbnQuanMnLFxuICAgICAgICB2YWxpZGF0ZTogZmFsc2UsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBhdXRoUmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGFzeW5jIChjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgICB0aGlzLnNlc3Npb25TdG9yYWdlRmFjdG9yeS5hc1Njb3BlZChyZXF1ZXN0KS5jbGVhcigpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UucmVuZGVySnMoe1xuICAgICAgICAgIGJvZHk6IGBsZXQgb2lkY0hhc2g9d2luZG93LmxvY2F0aW9uLmhhc2gudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICBsZXQgcmVkaXJlY3RIYXNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKG9pZGNIYXNoICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ29pZGNIYXNoJyk7XG4gICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ29pZGNIYXNoJywgb2lkY0hhc2gpO1xuICAgICAgICAgICAgICAgICAgICByZWRpcmVjdEhhc2ggPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dFVybCA9IHBhcmFtcy5nZXQoXCJuZXh0VXJsXCIpO1xuICAgICAgICAgICAgICAgIGZpbmFsVXJsID0gXCJsb2dpbj9uZXh0VXJsPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KG5leHRVcmwpO1xuICAgICAgICAgICAgICAgIGZpbmFsVXJsICs9IFwiJnJlZGlyZWN0SGFzaD1cIiArIGVuY29kZVVSSUNvbXBvbmVudChyZWRpcmVjdEhhc2gpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGZpbmFsVXJsKTtcbiAgICAgICAgICAgICAgYCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgKTtcblxuICAgIC8vICBPbmNlIHRoZSBVc2VyIGlzIGF1dGhlbnRpY2F0ZWQgdGhlIGJyb3dzZXIgd2lsbCBiZSByZWRpcmVjdGVkIHRvICcvYXV0aC9vcGVuaWQvcmVkaXJlY3RVcmxGcmFnbWVudCdcbiAgICAvLyAgcm91dGUsIHdoaWNoIHdpbGwgZXhlY3V0ZSB0aGUgcmVkaXJlY3RVcmxGcmFnbWVudC5qcy5cbiAgICB0aGlzLmNvcmUuaHR0cC5yZXNvdXJjZXMucmVnaXN0ZXIoXG4gICAgICB7XG4gICAgICAgIHBhdGg6ICcvYXV0aC9vcGVuaWQvcmVkaXJlY3RVcmxGcmFnbWVudCcsXG4gICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgcXVlcnk6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICAgICAgbmV4dFVybDogc2NoZW1hLmFueSgpLFxuICAgICAgICAgIH0pLFxuICAgICAgICB9LFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgYXV0aFJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGFzeW5jIChjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgICBjb25zdCBzZXJ2ZXJCYXNlUGF0aCA9IHRoaXMuY29yZS5odHRwLmJhc2VQYXRoLnNlcnZlckJhc2VQYXRoO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UucmVuZGVySHRtbCh7XG4gICAgICAgICAgYm9keTogYFxuICAgICAgICAgIDwhRE9DVFlQRSBodG1sPlxuICAgICAgICAgIDx0aXRsZT5PU0QgT3BlbklEIFN1Y2Nlc3M8L3RpdGxlPlxuICAgICAgICAgIDxsaW5rIHJlbD1cImljb25cIiBocmVmPVwiZGF0YTosXCI+XG4gICAgICAgICAgPHNjcmlwdCBzcmM9XCIke3NlcnZlckJhc2VQYXRofS9hdXRoL29wZW5pZC9yZWRpcmVjdFVybEZyYWdtZW50LmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgIGAsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBUaGlzIHNjcmlwdCB3aWxsIHBvcCB0aGUgSGFzaCBmcm9tIGxvY2FsIHN0b3JhZ2UgaWYgaXQgZXhpc3RzLlxuICAgIC8vIEFuZCBmb3J3YXJkIHRoZSBicm93c2VyIHRvIHRoZSBuZXh0IHVybC5cbiAgICB0aGlzLmNvcmUuaHR0cC5yZXNvdXJjZXMucmVnaXN0ZXIoXG4gICAgICB7XG4gICAgICAgIHBhdGg6ICcvYXV0aC9vcGVuaWQvcmVkaXJlY3RVcmxGcmFnbWVudC5qcycsXG4gICAgICAgIHZhbGlkYXRlOiBmYWxzZSxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIGF1dGhSZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBhc3luYyAoY29udGV4dCwgcmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnJlbmRlckpzKHtcbiAgICAgICAgICBib2R5OiBgbGV0IG9pZGNIYXNoPXdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnb2lkY0hhc2gnKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ29pZGNIYXNoJyk7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRVcmwgPSBwYXJhbXMuZ2V0KFwibmV4dFVybFwiKTtcbiAgICAgICAgICAgICAgICBmaW5hbFVybCA9IG5leHRVcmwgKyBvaWRjSGFzaDtcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShmaW5hbFVybCk7XG4gICAgICAgICAgICAgIGAsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBY0EsSUFBQUEsYUFBQSxHQUFBQyxPQUFBO0FBQ0EsSUFBQUMsVUFBQSxHQUFBRCxPQUFBO0FBQ0EsSUFBQUUsWUFBQSxHQUFBRixPQUFBO0FBY0EsSUFBQUcsT0FBQSxHQUFBSCxPQUFBO0FBUUEs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