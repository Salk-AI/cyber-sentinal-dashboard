"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SamlAuthRoutes = void 0;
var _configSchema = require("@osd/config-schema");
var _next_url = require("../../../utils/next_url");
var _common = require("../../../../common");
var _cookie_splitter = require("../../../session/cookie_splitter");
/*
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

class SamlAuthRoutes {
  constructor(router,
  // @ts-ignore: unused variable
  config, sessionStorageFactory, securityClient, coreSetup) {
    this.router = router;
    this.config = config;
    this.sessionStorageFactory = sessionStorageFactory;
    this.securityClient = securityClient;
    this.coreSetup = coreSetup;
  }
  getExtraAuthStorageOptions(logger) {
    // If we're here, we will always have the openid configuration
    return {
      cookiePrefix: this.config.saml.extra_storage.cookie_prefix,
      additionalCookies: this.config.saml.extra_storage.additional_cookies,
      logger
    };
  }
  setupRoutes() {
    this.router.get({
      path: _common.SAML_AUTH_LOGIN,
      validate: {
        query: _configSchema.schema.object({
          nextUrl: _configSchema.schema.maybe(_configSchema.schema.string({
            validate: _next_url.validateNextUrl
          })),
          redirectHash: _configSchema.schema.string()
        })
      },
      options: {
        authRequired: false
      }
    }, async (context, request, response) => {
      if (request.auth.isAuthenticated) {
        return response.redirected({
          headers: {
            location: `${this.coreSetup.http.basePath.serverBasePath}/app/opensearch-dashboards`
          }
        });
      }
      try {
        const samlHeader = await this.securityClient.getSamlHeader(request);
        // const { nextUrl = '/' } = request.query;
        const cookie = {
          saml: {
            nextUrl: request.query.nextUrl,
            requestId: samlHeader.requestId,
            redirectHash: request.query.redirectHash === 'true'
          }
        };
        this.sessionStorageFactory.asScoped(request).set(cookie);
        return response.redirected({
          headers: {
            location: samlHeader.location
          }
        });
      } catch (error) {
        context.security_plugin.logger.error(`Failed to get saml header: ${error}`);
        return response.internalError(); // TODO: redirect to error page?
      }
    });

    this.router.post({
      path: `/_opendistro/_security/saml/acs`,
      validate: {
        body: _configSchema.schema.any()
      },
      options: {
        authRequired: false
      }
    }, async (context, request, response) => {
      let requestId = '';
      let nextUrl = '/';
      let redirectHash = false;
      try {
        const cookie = await this.sessionStorageFactory.asScoped(request).get();
        if (cookie) {
          var _cookie$saml, _cookie$saml2, _cookie$saml3;
          requestId = ((_cookie$saml = cookie.saml) === null || _cookie$saml === void 0 ? void 0 : _cookie$saml.requestId) || '';
          nextUrl = ((_cookie$saml2 = cookie.saml) === null || _cookie$saml2 === void 0 ? void 0 : _cookie$saml2.nextUrl) || `${this.coreSetup.http.basePath.serverBasePath}/app/opensearch-dashboards`;
          redirectHash = ((_cookie$saml3 = cookie.saml) === null || _cookie$saml3 === void 0 ? void 0 : _cookie$saml3.redirectHash) || false;
        }
        if (!requestId) {
          return response.badRequest({
            body: 'Invalid requestId'
          });
        }
      } catch (error) {
        context.security_plugin.logger.error(`Failed to parse cookie: ${error}`);
        return response.badRequest();
      }
      try {
        const credentials = await this.securityClient.authToken(requestId, request.body.SAMLResponse, undefined);
        const user = await this.securityClient.authenticateWithHeader(request, 'authorization', credentials.authorization);
        let expiryTime = Date.now() + this.config.session.ttl;
        const [headerEncoded, payloadEncoded, signature] = credentials.authorization.split('.');
        if (!payloadEncoded) {
          context.security_plugin.logger.error('JWT token payload not found');
        }
        const tokenPayload = JSON.parse(Buffer.from(payloadEncoded, 'base64').toString());
        if (tokenPayload.exp) {
          expiryTime = parseInt(tokenPayload.exp, 10) * 1000;
        }
        const cookie = {
          username: user.username,
          credentials: {
            authHeaderValueExtra: true
          },
          authType: _common.AuthType.SAML,
          // TODO: create constant
          expiryTime
        };
        (0, _cookie_splitter.setExtraAuthStorage)(request, credentials.authorization, this.getExtraAuthStorageOptions(context.security_plugin.logger));
        this.sessionStorageFactory.asScoped(request).set(cookie);
        if (redirectHash) {
          return response.redirected({
            headers: {
              location: `${this.coreSetup.http.basePath.serverBasePath}/auth/saml/redirectUrlFragment?nextUrl=${escape(nextUrl)}`
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
        context.security_plugin.logger.error(`SAML SP initiated authentication workflow failed: ${error}`);
      }
      return response.internalError();
    });
    this.router.post({
      path: `/_opendistro/_security/saml/acs/idpinitiated`,
      validate: {
        body: _configSchema.schema.any()
      },
      options: {
        authRequired: false
      }
    }, async (context, request, response) => {
      const acsEndpoint = `${this.coreSetup.http.basePath.serverBasePath}/_opendistro/_security/saml/acs/idpinitiated`;
      try {
        const credentials = await this.securityClient.authToken(undefined, request.body.SAMLResponse, acsEndpoint);
        const user = await this.securityClient.authenticateWithHeader(request, 'authorization', credentials.authorization);
        let expiryTime = Date.now() + this.config.session.ttl;
        const [headerEncoded, payloadEncoded, signature] = credentials.authorization.split('.');
        if (!payloadEncoded) {
          context.security_plugin.logger.error('JWT token payload not found');
        }
        const tokenPayload = JSON.parse(Buffer.from(payloadEncoded, 'base64').toString());
        if (tokenPayload.exp) {
          expiryTime = parseInt(tokenPayload.exp, 10) * 1000;
        }
        const cookie = {
          username: user.username,
          credentials: {
            authHeaderValueExtra: true
          },
          authType: _common.AuthType.SAML,
          // TODO: create constant
          expiryTime
        };
        (0, _cookie_splitter.setExtraAuthStorage)(request, credentials.authorization, this.getExtraAuthStorageOptions(context.security_plugin.logger));
        this.sessionStorageFactory.asScoped(request).set(cookie);
        return response.redirected({
          headers: {
            location: `${this.coreSetup.http.basePath.serverBasePath}/app/opensearch-dashboards`
          }
        });
      } catch (error) {
        context.security_plugin.logger.error(`SAML IDP initiated authentication workflow failed: ${error}`);
      }
      return response.internalError();
    });

    // captureUrlFragment is the first route that will be invoked in the SP initiated login.
    // This route will execute the captureUrlFragment.js script.
    this.coreSetup.http.resources.register({
      path: '/auth/saml/captureUrlFragment',
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
      const serverBasePath = this.coreSetup.http.basePath.serverBasePath;
      return response.renderHtml({
        body: `
            <!DOCTYPE html>
            <title>OSD SAML Capture</title>
            <link rel="icon" href="data:,">
            <script src="${serverBasePath}/auth/saml/captureUrlFragment.js"></script>
          `
      });
    });

    // This script will store the URL Hash in browser's local storage.
    this.coreSetup.http.resources.register({
      path: '/auth/saml/captureUrlFragment.js',
      validate: false,
      options: {
        authRequired: false
      }
    }, async (context, request, response) => {
      this.sessionStorageFactory.asScoped(request).clear();
      return response.renderJs({
        body: `let samlHash=window.location.hash.toString();
                 let redirectHash = false;
                 if (samlHash !== "") {
                    window.localStorage.removeItem('samlHash');
                    window.localStorage.setItem('samlHash', samlHash);
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

    //  Once the User is authenticated via the '_opendistro/_security/saml/acs' route,
    //  the browser will be redirected to '/auth/saml/redirectUrlFragment' route,
    //  which will execute the redirectUrlFragment.js.
    this.coreSetup.http.resources.register({
      path: '/auth/saml/redirectUrlFragment',
      validate: {
        query: _configSchema.schema.object({
          nextUrl: _configSchema.schema.any()
        })
      },
      options: {
        authRequired: true
      }
    }, async (context, request, response) => {
      const serverBasePath = this.coreSetup.http.basePath.serverBasePath;
      return response.renderHtml({
        body: `
            <!DOCTYPE html>
            <title>OSD SAML Success</title>
            <link rel="icon" href="data:,">
            <script src="${serverBasePath}/auth/saml/redirectUrlFragment.js"></script>
          `
      });
    });

    // This script will pop the Hash from local storage if it exists.
    // And forward the browser to the next url.
    this.coreSetup.http.resources.register({
      path: '/auth/saml/redirectUrlFragment.js',
      validate: false,
      options: {
        authRequired: true
      }
    }, async (context, request, response) => {
      return response.renderJs({
        body: `let samlHash=window.localStorage.getItem('samlHash');
                 window.localStorage.removeItem('samlHash');
                 let params = new URLSearchParams(window.location.search);
                 let nextUrl = params.get("nextUrl");
                 finalUrl = nextUrl + samlHash;
                 window.location.replace(finalUrl);
                `
      });
    });
    this.router.get({
      path: _common.SAML_AUTH_LOGOUT,
      validate: false
    }, async (context, request, response) => {
      try {
        const authInfo = await this.securityClient.authinfo(request);
        await (0, _cookie_splitter.clearSplitCookies)(request, this.getExtraAuthStorageOptions(context.security_plugin.logger));
        this.sessionStorageFactory.asScoped(request).clear();
        // TODO: need a default logout page
        const redirectUrl = authInfo.sso_logout_url || this.coreSetup.http.basePath.serverBasePath || '/';
        return response.redirected({
          headers: {
            location: redirectUrl
          }
        });
      } catch (error) {
        context.security_plugin.logger.error(`SAML logout failed: ${error}`);
        return response.badRequest();
      }
    });
  }
}
exports.SamlAuthRoutes = SamlAuthRoutes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY29uZmlnU2NoZW1hIiwicmVxdWlyZSIsIl9uZXh0X3VybCIsIl9jb21tb24iLCJfY29va2llX3NwbGl0dGVyIiwiU2FtbEF1dGhSb3V0ZXMiLCJjb25zdHJ1Y3RvciIsInJvdXRlciIsImNvbmZpZyIsInNlc3Npb25TdG9yYWdlRmFjdG9yeSIsInNlY3VyaXR5Q2xpZW50IiwiY29yZVNldHVwIiwiZ2V0RXh0cmFBdXRoU3RvcmFnZU9wdGlvbnMiLCJsb2dnZXIiLCJjb29raWVQcmVmaXgiLCJzYW1sIiwiZXh0cmFfc3RvcmFnZSIsImNvb2tpZV9wcmVmaXgiLCJhZGRpdGlvbmFsQ29va2llcyIsImFkZGl0aW9uYWxfY29va2llcyIsInNldHVwUm91dGVzIiwiZ2V0IiwicGF0aCIsIlNBTUxfQVVUSF9MT0dJTiIsInZhbGlkYXRlIiwicXVlcnkiLCJzY2hlbWEiLCJvYmplY3QiLCJuZXh0VXJsIiwibWF5YmUiLCJzdHJpbmciLCJ2YWxpZGF0ZU5leHRVcmwiLCJyZWRpcmVjdEhhc2giLCJvcHRpb25zIiwiYXV0aFJlcXVpcmVkIiwiY29udGV4dCIsInJlcXVlc3QiLCJyZXNwb25zZSIsImF1dGgiLCJpc0F1dGhlbnRpY2F0ZWQiLCJyZWRpcmVjdGVkIiwiaGVhZGVycyIsImxvY2F0aW9uIiwiaHR0cCIsImJhc2VQYXRoIiwic2VydmVyQmFzZVBhdGgiLCJzYW1sSGVhZGVyIiwiZ2V0U2FtbEhlYWRlciIsImNvb2tpZSIsInJlcXVlc3RJZCIsImFzU2NvcGVkIiwic2V0IiwiZXJyb3IiLCJzZWN1cml0eV9wbHVnaW4iLCJpbnRlcm5hbEVycm9yIiwicG9zdCIsImJvZHkiLCJhbnkiLCJfY29va2llJHNhbWwiLCJfY29va2llJHNhbWwyIiwiX2Nvb2tpZSRzYW1sMyIsImJhZFJlcXVlc3QiLCJjcmVkZW50aWFscyIsImF1dGhUb2tlbiIsIlNBTUxSZXNwb25zZSIsInVuZGVmaW5lZCIsInVzZXIiLCJhdXRoZW50aWNhdGVXaXRoSGVhZGVyIiwiYXV0aG9yaXphdGlvbiIsImV4cGlyeVRpbWUiLCJEYXRlIiwibm93Iiwic2Vzc2lvbiIsInR0bCIsImhlYWRlckVuY29kZWQiLCJwYXlsb2FkRW5jb2RlZCIsInNpZ25hdHVyZSIsInNwbGl0IiwidG9rZW5QYXlsb2FkIiwiSlNPTiIsInBhcnNlIiwiQnVmZmVyIiwiZnJvbSIsInRvU3RyaW5nIiwiZXhwIiwicGFyc2VJbnQiLCJ1c2VybmFtZSIsImF1dGhIZWFkZXJWYWx1ZUV4dHJhIiwiYXV0aFR5cGUiLCJBdXRoVHlwZSIsIlNBTUwiLCJzZXRFeHRyYUF1dGhTdG9yYWdlIiwiZXNjYXBlIiwiYWNzRW5kcG9pbnQiLCJyZXNvdXJjZXMiLCJyZWdpc3RlciIsImNsZWFyIiwicmVuZGVySHRtbCIsInJlbmRlckpzIiwiU0FNTF9BVVRIX0xPR09VVCIsImF1dGhJbmZvIiwiYXV0aGluZm8iLCJjbGVhclNwbGl0Q29va2llcyIsInJlZGlyZWN0VXJsIiwic3NvX2xvZ291dF91cmwiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsicm91dGVzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAgIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICpcbiAqICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKS5cbiAqICAgWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogICBBIGNvcHkgb2YgdGhlIExpY2Vuc2UgaXMgbG9jYXRlZCBhdFxuICpcbiAqICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICAgb3IgaW4gdGhlIFwibGljZW5zZVwiIGZpbGUgYWNjb21wYW55aW5nIHRoaXMgZmlsZS4gVGhpcyBmaWxlIGlzIGRpc3RyaWJ1dGVkXG4gKiAgIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogICBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZ1xuICogICBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHsgc2NoZW1hIH0gZnJvbSAnQG9zZC9jb25maWctc2NoZW1hJztcbmltcG9ydCB7IElSb3V0ZXIsIFNlc3Npb25TdG9yYWdlRmFjdG9yeSwgTG9nZ2VyIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvc2VydmVyJztcbmltcG9ydCB7IFNlY3VyaXR5U2Vzc2lvbkNvb2tpZSB9IGZyb20gJy4uLy4uLy4uL3Nlc3Npb24vc2VjdXJpdHlfY29va2llJztcbmltcG9ydCB7IFNlY3VyaXR5UGx1Z2luQ29uZmlnVHlwZSB9IGZyb20gJy4uLy4uLy4uJztcbmltcG9ydCB7IFNlY3VyaXR5Q2xpZW50IH0gZnJvbSAnLi4vLi4vLi4vYmFja2VuZC9vcGVuc2VhcmNoX3NlY3VyaXR5X2NsaWVudCc7XG5pbXBvcnQgeyBDb3JlU2V0dXAgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9zZXJ2ZXInO1xuaW1wb3J0IHsgdmFsaWRhdGVOZXh0VXJsIH0gZnJvbSAnLi4vLi4vLi4vdXRpbHMvbmV4dF91cmwnO1xuaW1wb3J0IHsgQXV0aFR5cGUsIFNBTUxfQVVUSF9MT0dJTiwgU0FNTF9BVVRIX0xPR09VVCB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbW1vbic7XG5cbmltcG9ydCB7XG4gIGNsZWFyU3BsaXRDb29raWVzLFxuICBFeHRyYUF1dGhTdG9yYWdlT3B0aW9ucyxcbiAgc2V0RXh0cmFBdXRoU3RvcmFnZSxcbn0gZnJvbSAnLi4vLi4vLi4vc2Vzc2lvbi9jb29raWVfc3BsaXR0ZXInO1xuXG5leHBvcnQgY2xhc3MgU2FtbEF1dGhSb3V0ZXMge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlcjogSVJvdXRlcixcbiAgICAvLyBAdHMtaWdub3JlOiB1bnVzZWQgdmFyaWFibGVcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvbmZpZzogU2VjdXJpdHlQbHVnaW5Db25maWdUeXBlLFxuICAgIHByaXZhdGUgcmVhZG9ubHkgc2Vzc2lvblN0b3JhZ2VGYWN0b3J5OiBTZXNzaW9uU3RvcmFnZUZhY3Rvcnk8U2VjdXJpdHlTZXNzaW9uQ29va2llPixcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNlY3VyaXR5Q2xpZW50OiBTZWN1cml0eUNsaWVudCxcbiAgICBwcml2YXRlIHJlYWRvbmx5IGNvcmVTZXR1cDogQ29yZVNldHVwXG4gICkge31cblxuICBwcml2YXRlIGdldEV4dHJhQXV0aFN0b3JhZ2VPcHRpb25zKGxvZ2dlcj86IExvZ2dlcik6IEV4dHJhQXV0aFN0b3JhZ2VPcHRpb25zIHtcbiAgICAvLyBJZiB3ZSdyZSBoZXJlLCB3ZSB3aWxsIGFsd2F5cyBoYXZlIHRoZSBvcGVuaWQgY29uZmlndXJhdGlvblxuICAgIHJldHVybiB7XG4gICAgICBjb29raWVQcmVmaXg6IHRoaXMuY29uZmlnLnNhbWwuZXh0cmFfc3RvcmFnZS5jb29raWVfcHJlZml4LFxuICAgICAgYWRkaXRpb25hbENvb2tpZXM6IHRoaXMuY29uZmlnLnNhbWwuZXh0cmFfc3RvcmFnZS5hZGRpdGlvbmFsX2Nvb2tpZXMsXG4gICAgICBsb2dnZXIsXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyBzZXR1cFJvdXRlcygpIHtcbiAgICB0aGlzLnJvdXRlci5nZXQoXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFNBTUxfQVVUSF9MT0dJTixcbiAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICBxdWVyeTogc2NoZW1hLm9iamVjdCh7XG4gICAgICAgICAgICBuZXh0VXJsOiBzY2hlbWEubWF5YmUoXG4gICAgICAgICAgICAgIHNjaGVtYS5zdHJpbmcoe1xuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiB2YWxpZGF0ZU5leHRVcmwsXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgcmVkaXJlY3RIYXNoOiBzY2hlbWEuc3RyaW5nKCksXG4gICAgICAgICAgfSksXG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBhdXRoUmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGFzeW5jIChjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgICBpZiAocmVxdWVzdC5hdXRoLmlzQXV0aGVudGljYXRlZCkge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5yZWRpcmVjdGVkKHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgbG9jYXRpb246IGAke3RoaXMuY29yZVNldHVwLmh0dHAuYmFzZVBhdGguc2VydmVyQmFzZVBhdGh9L2FwcC9vcGVuc2VhcmNoLWRhc2hib2FyZHNgLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3Qgc2FtbEhlYWRlciA9IGF3YWl0IHRoaXMuc2VjdXJpdHlDbGllbnQuZ2V0U2FtbEhlYWRlcihyZXF1ZXN0KTtcbiAgICAgICAgICAvLyBjb25zdCB7IG5leHRVcmwgPSAnLycgfSA9IHJlcXVlc3QucXVlcnk7XG4gICAgICAgICAgY29uc3QgY29va2llOiBTZWN1cml0eVNlc3Npb25Db29raWUgPSB7XG4gICAgICAgICAgICBzYW1sOiB7XG4gICAgICAgICAgICAgIG5leHRVcmw6IHJlcXVlc3QucXVlcnkubmV4dFVybCxcbiAgICAgICAgICAgICAgcmVxdWVzdElkOiBzYW1sSGVhZGVyLnJlcXVlc3RJZCxcbiAgICAgICAgICAgICAgcmVkaXJlY3RIYXNoOiByZXF1ZXN0LnF1ZXJ5LnJlZGlyZWN0SGFzaCA9PT0gJ3RydWUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2VGYWN0b3J5LmFzU2NvcGVkKHJlcXVlc3QpLnNldChjb29raWUpO1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5yZWRpcmVjdGVkKHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgbG9jYXRpb246IHNhbWxIZWFkZXIubG9jYXRpb24sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnRleHQuc2VjdXJpdHlfcGx1Z2luLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIGdldCBzYW1sIGhlYWRlcjogJHtlcnJvcn1gKTtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuaW50ZXJuYWxFcnJvcigpOyAvLyBUT0RPOiByZWRpcmVjdCB0byBlcnJvciBwYWdlP1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcblxuICAgIHRoaXMucm91dGVyLnBvc3QoXG4gICAgICB7XG4gICAgICAgIHBhdGg6IGAvX29wZW5kaXN0cm8vX3NlY3VyaXR5L3NhbWwvYWNzYCxcbiAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICBib2R5OiBzY2hlbWEuYW55KCksXG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBhdXRoUmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGFzeW5jIChjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgICBsZXQgcmVxdWVzdElkOiBzdHJpbmcgPSAnJztcbiAgICAgICAgbGV0IG5leHRVcmw6IHN0cmluZyA9ICcvJztcbiAgICAgICAgbGV0IHJlZGlyZWN0SGFzaDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGNvb2tpZSA9IGF3YWl0IHRoaXMuc2Vzc2lvblN0b3JhZ2VGYWN0b3J5LmFzU2NvcGVkKHJlcXVlc3QpLmdldCgpO1xuICAgICAgICAgIGlmIChjb29raWUpIHtcbiAgICAgICAgICAgIHJlcXVlc3RJZCA9IGNvb2tpZS5zYW1sPy5yZXF1ZXN0SWQgfHwgJyc7XG4gICAgICAgICAgICBuZXh0VXJsID1cbiAgICAgICAgICAgICAgY29va2llLnNhbWw/Lm5leHRVcmwgfHxcbiAgICAgICAgICAgICAgYCR7dGhpcy5jb3JlU2V0dXAuaHR0cC5iYXNlUGF0aC5zZXJ2ZXJCYXNlUGF0aH0vYXBwL29wZW5zZWFyY2gtZGFzaGJvYXJkc2A7XG4gICAgICAgICAgICByZWRpcmVjdEhhc2ggPSBjb29raWUuc2FtbD8ucmVkaXJlY3RIYXNoIHx8IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXJlcXVlc3RJZCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmJhZFJlcXVlc3Qoe1xuICAgICAgICAgICAgICBib2R5OiAnSW52YWxpZCByZXF1ZXN0SWQnLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnRleHQuc2VjdXJpdHlfcGx1Z2luLmxvZ2dlci5lcnJvcihgRmFpbGVkIHRvIHBhcnNlIGNvb2tpZTogJHtlcnJvcn1gKTtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYmFkUmVxdWVzdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBjcmVkZW50aWFscyA9IGF3YWl0IHRoaXMuc2VjdXJpdHlDbGllbnQuYXV0aFRva2VuKFxuICAgICAgICAgICAgcmVxdWVzdElkLFxuICAgICAgICAgICAgcmVxdWVzdC5ib2R5LlNBTUxSZXNwb25zZSxcbiAgICAgICAgICAgIHVuZGVmaW5lZFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHRoaXMuc2VjdXJpdHlDbGllbnQuYXV0aGVudGljYXRlV2l0aEhlYWRlcihcbiAgICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgICAgICAnYXV0aG9yaXphdGlvbicsXG4gICAgICAgICAgICBjcmVkZW50aWFscy5hdXRob3JpemF0aW9uXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGxldCBleHBpcnlUaW1lID0gRGF0ZS5ub3coKSArIHRoaXMuY29uZmlnLnNlc3Npb24udHRsO1xuICAgICAgICAgIGNvbnN0IFtoZWFkZXJFbmNvZGVkLCBwYXlsb2FkRW5jb2RlZCwgc2lnbmF0dXJlXSA9IGNyZWRlbnRpYWxzLmF1dGhvcml6YXRpb24uc3BsaXQoJy4nKTtcbiAgICAgICAgICBpZiAoIXBheWxvYWRFbmNvZGVkKSB7XG4gICAgICAgICAgICBjb250ZXh0LnNlY3VyaXR5X3BsdWdpbi5sb2dnZXIuZXJyb3IoJ0pXVCB0b2tlbiBwYXlsb2FkIG5vdCBmb3VuZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB0b2tlblBheWxvYWQgPSBKU09OLnBhcnNlKEJ1ZmZlci5mcm9tKHBheWxvYWRFbmNvZGVkLCAnYmFzZTY0JykudG9TdHJpbmcoKSk7XG5cbiAgICAgICAgICBpZiAodG9rZW5QYXlsb2FkLmV4cCkge1xuICAgICAgICAgICAgZXhwaXJ5VGltZSA9IHBhcnNlSW50KHRva2VuUGF5bG9hZC5leHAsIDEwKSAqIDEwMDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgY29va2llOiBTZWN1cml0eVNlc3Npb25Db29raWUgPSB7XG4gICAgICAgICAgICB1c2VybmFtZTogdXNlci51c2VybmFtZSxcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzOiB7XG4gICAgICAgICAgICAgIGF1dGhIZWFkZXJWYWx1ZUV4dHJhOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF1dGhUeXBlOiBBdXRoVHlwZS5TQU1MLCAvLyBUT0RPOiBjcmVhdGUgY29uc3RhbnRcbiAgICAgICAgICAgIGV4cGlyeVRpbWUsXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHNldEV4dHJhQXV0aFN0b3JhZ2UoXG4gICAgICAgICAgICByZXF1ZXN0LFxuICAgICAgICAgICAgY3JlZGVudGlhbHMuYXV0aG9yaXphdGlvbixcbiAgICAgICAgICAgIHRoaXMuZ2V0RXh0cmFBdXRoU3RvcmFnZU9wdGlvbnMoY29udGV4dC5zZWN1cml0eV9wbHVnaW4ubG9nZ2VyKVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICB0aGlzLnNlc3Npb25TdG9yYWdlRmFjdG9yeS5hc1Njb3BlZChyZXF1ZXN0KS5zZXQoY29va2llKTtcblxuICAgICAgICAgIGlmIChyZWRpcmVjdEhhc2gpIHtcbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZS5yZWRpcmVjdGVkKHtcbiAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBgJHtcbiAgICAgICAgICAgICAgICAgIHRoaXMuY29yZVNldHVwLmh0dHAuYmFzZVBhdGguc2VydmVyQmFzZVBhdGhcbiAgICAgICAgICAgICAgICB9L2F1dGgvc2FtbC9yZWRpcmVjdFVybEZyYWdtZW50P25leHRVcmw9JHtlc2NhcGUobmV4dFVybCl9YCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UucmVkaXJlY3RlZCh7XG4gICAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBsb2NhdGlvbjogbmV4dFVybCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb250ZXh0LnNlY3VyaXR5X3BsdWdpbi5sb2dnZXIuZXJyb3IoXG4gICAgICAgICAgICBgU0FNTCBTUCBpbml0aWF0ZWQgYXV0aGVudGljYXRpb24gd29ya2Zsb3cgZmFpbGVkOiAke2Vycm9yfWBcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmludGVybmFsRXJyb3IoKTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgdGhpcy5yb3V0ZXIucG9zdChcbiAgICAgIHtcbiAgICAgICAgcGF0aDogYC9fb3BlbmRpc3Ryby9fc2VjdXJpdHkvc2FtbC9hY3MvaWRwaW5pdGlhdGVkYCxcbiAgICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgICBib2R5OiBzY2hlbWEuYW55KCksXG4gICAgICAgIH0sXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBhdXRoUmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGFzeW5jIChjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgICBjb25zdCBhY3NFbmRwb2ludCA9IGAke3RoaXMuY29yZVNldHVwLmh0dHAuYmFzZVBhdGguc2VydmVyQmFzZVBhdGh9L19vcGVuZGlzdHJvL19zZWN1cml0eS9zYW1sL2Fjcy9pZHBpbml0aWF0ZWRgO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IGNyZWRlbnRpYWxzID0gYXdhaXQgdGhpcy5zZWN1cml0eUNsaWVudC5hdXRoVG9rZW4oXG4gICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICByZXF1ZXN0LmJvZHkuU0FNTFJlc3BvbnNlLFxuICAgICAgICAgICAgYWNzRW5kcG9pbnRcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCB0aGlzLnNlY3VyaXR5Q2xpZW50LmF1dGhlbnRpY2F0ZVdpdGhIZWFkZXIoXG4gICAgICAgICAgICByZXF1ZXN0LFxuICAgICAgICAgICAgJ2F1dGhvcml6YXRpb24nLFxuICAgICAgICAgICAgY3JlZGVudGlhbHMuYXV0aG9yaXphdGlvblxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBsZXQgZXhwaXJ5VGltZSA9IERhdGUubm93KCkgKyB0aGlzLmNvbmZpZy5zZXNzaW9uLnR0bDtcbiAgICAgICAgICBjb25zdCBbaGVhZGVyRW5jb2RlZCwgcGF5bG9hZEVuY29kZWQsIHNpZ25hdHVyZV0gPSBjcmVkZW50aWFscy5hdXRob3JpemF0aW9uLnNwbGl0KCcuJyk7XG4gICAgICAgICAgaWYgKCFwYXlsb2FkRW5jb2RlZCkge1xuICAgICAgICAgICAgY29udGV4dC5zZWN1cml0eV9wbHVnaW4ubG9nZ2VyLmVycm9yKCdKV1QgdG9rZW4gcGF5bG9hZCBub3QgZm91bmQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgdG9rZW5QYXlsb2FkID0gSlNPTi5wYXJzZShCdWZmZXIuZnJvbShwYXlsb2FkRW5jb2RlZCwgJ2Jhc2U2NCcpLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIGlmICh0b2tlblBheWxvYWQuZXhwKSB7XG4gICAgICAgICAgICBleHBpcnlUaW1lID0gcGFyc2VJbnQodG9rZW5QYXlsb2FkLmV4cCwgMTApICogMTAwMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBjb29raWU6IFNlY3VyaXR5U2Vzc2lvbkNvb2tpZSA9IHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lLFxuICAgICAgICAgICAgY3JlZGVudGlhbHM6IHtcbiAgICAgICAgICAgICAgYXV0aEhlYWRlclZhbHVlRXh0cmE6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXV0aFR5cGU6IEF1dGhUeXBlLlNBTUwsIC8vIFRPRE86IGNyZWF0ZSBjb25zdGFudFxuICAgICAgICAgICAgZXhwaXJ5VGltZSxcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgc2V0RXh0cmFBdXRoU3RvcmFnZShcbiAgICAgICAgICAgIHJlcXVlc3QsXG4gICAgICAgICAgICBjcmVkZW50aWFscy5hdXRob3JpemF0aW9uLFxuICAgICAgICAgICAgdGhpcy5nZXRFeHRyYUF1dGhTdG9yYWdlT3B0aW9ucyhjb250ZXh0LnNlY3VyaXR5X3BsdWdpbi5sb2dnZXIpXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2VGYWN0b3J5LmFzU2NvcGVkKHJlcXVlc3QpLnNldChjb29raWUpO1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5yZWRpcmVjdGVkKHtcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgbG9jYXRpb246IGAke3RoaXMuY29yZVNldHVwLmh0dHAuYmFzZVBhdGguc2VydmVyQmFzZVBhdGh9L2FwcC9vcGVuc2VhcmNoLWRhc2hib2FyZHNgLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb250ZXh0LnNlY3VyaXR5X3BsdWdpbi5sb2dnZXIuZXJyb3IoXG4gICAgICAgICAgICBgU0FNTCBJRFAgaW5pdGlhdGVkIGF1dGhlbnRpY2F0aW9uIHdvcmtmbG93IGZhaWxlZDogJHtlcnJvcn1gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuaW50ZXJuYWxFcnJvcigpO1xuICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBjYXB0dXJlVXJsRnJhZ21lbnQgaXMgdGhlIGZpcnN0IHJvdXRlIHRoYXQgd2lsbCBiZSBpbnZva2VkIGluIHRoZSBTUCBpbml0aWF0ZWQgbG9naW4uXG4gICAgLy8gVGhpcyByb3V0ZSB3aWxsIGV4ZWN1dGUgdGhlIGNhcHR1cmVVcmxGcmFnbWVudC5qcyBzY3JpcHQuXG4gICAgdGhpcy5jb3JlU2V0dXAuaHR0cC5yZXNvdXJjZXMucmVnaXN0ZXIoXG4gICAgICB7XG4gICAgICAgIHBhdGg6ICcvYXV0aC9zYW1sL2NhcHR1cmVVcmxGcmFnbWVudCcsXG4gICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgcXVlcnk6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICAgICAgbmV4dFVybDogc2NoZW1hLm1heWJlKFxuICAgICAgICAgICAgICBzY2hlbWEuc3RyaW5nKHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogdmFsaWRhdGVOZXh0VXJsLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIGF1dGhSZXF1aXJlZDogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgYXN5bmMgKGNvbnRleHQsIHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgIHRoaXMuc2Vzc2lvblN0b3JhZ2VGYWN0b3J5LmFzU2NvcGVkKHJlcXVlc3QpLmNsZWFyKCk7XG4gICAgICAgIGNvbnN0IHNlcnZlckJhc2VQYXRoID0gdGhpcy5jb3JlU2V0dXAuaHR0cC5iYXNlUGF0aC5zZXJ2ZXJCYXNlUGF0aDtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnJlbmRlckh0bWwoe1xuICAgICAgICAgIGJvZHk6IGBcbiAgICAgICAgICAgIDwhRE9DVFlQRSBodG1sPlxuICAgICAgICAgICAgPHRpdGxlPk9TRCBTQU1MIENhcHR1cmU8L3RpdGxlPlxuICAgICAgICAgICAgPGxpbmsgcmVsPVwiaWNvblwiIGhyZWY9XCJkYXRhOixcIj5cbiAgICAgICAgICAgIDxzY3JpcHQgc3JjPVwiJHtzZXJ2ZXJCYXNlUGF0aH0vYXV0aC9zYW1sL2NhcHR1cmVVcmxGcmFnbWVudC5qc1wiPjwvc2NyaXB0PlxuICAgICAgICAgIGAsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBUaGlzIHNjcmlwdCB3aWxsIHN0b3JlIHRoZSBVUkwgSGFzaCBpbiBicm93c2VyJ3MgbG9jYWwgc3RvcmFnZS5cbiAgICB0aGlzLmNvcmVTZXR1cC5odHRwLnJlc291cmNlcy5yZWdpc3RlcihcbiAgICAgIHtcbiAgICAgICAgcGF0aDogJy9hdXRoL3NhbWwvY2FwdHVyZVVybEZyYWdtZW50LmpzJyxcbiAgICAgICAgdmFsaWRhdGU6IGZhbHNlLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgYXV0aFJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBhc3luYyAoY29udGV4dCwgcmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgdGhpcy5zZXNzaW9uU3RvcmFnZUZhY3RvcnkuYXNTY29wZWQocmVxdWVzdCkuY2xlYXIoKTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnJlbmRlckpzKHtcbiAgICAgICAgICBib2R5OiBgbGV0IHNhbWxIYXNoPXdpbmRvdy5sb2NhdGlvbi5oYXNoLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgIGxldCByZWRpcmVjdEhhc2ggPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgaWYgKHNhbWxIYXNoICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc2FtbEhhc2gnKTtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzYW1sSGFzaCcsIHNhbWxIYXNoKTtcbiAgICAgICAgICAgICAgICAgICAgIHJlZGlyZWN0SGFzaCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIGxldCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgICAgICAgICAgICAgICBsZXQgbmV4dFVybCA9IHBhcmFtcy5nZXQoXCJuZXh0VXJsXCIpO1xuICAgICAgICAgICAgICAgICBmaW5hbFVybCA9IFwibG9naW4/bmV4dFVybD1cIiArIGVuY29kZVVSSUNvbXBvbmVudChuZXh0VXJsKTtcbiAgICAgICAgICAgICAgICAgZmluYWxVcmwgKz0gXCImcmVkaXJlY3RIYXNoPVwiICsgZW5jb2RlVVJJQ29tcG9uZW50KHJlZGlyZWN0SGFzaCk7XG4gICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKGZpbmFsVXJsKTtcbiAgICAgICAgICAgICAgICBgLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gIE9uY2UgdGhlIFVzZXIgaXMgYXV0aGVudGljYXRlZCB2aWEgdGhlICdfb3BlbmRpc3Ryby9fc2VjdXJpdHkvc2FtbC9hY3MnIHJvdXRlLFxuICAgIC8vICB0aGUgYnJvd3NlciB3aWxsIGJlIHJlZGlyZWN0ZWQgdG8gJy9hdXRoL3NhbWwvcmVkaXJlY3RVcmxGcmFnbWVudCcgcm91dGUsXG4gICAgLy8gIHdoaWNoIHdpbGwgZXhlY3V0ZSB0aGUgcmVkaXJlY3RVcmxGcmFnbWVudC5qcy5cbiAgICB0aGlzLmNvcmVTZXR1cC5odHRwLnJlc291cmNlcy5yZWdpc3RlcihcbiAgICAgIHtcbiAgICAgICAgcGF0aDogJy9hdXRoL3NhbWwvcmVkaXJlY3RVcmxGcmFnbWVudCcsXG4gICAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgICAgcXVlcnk6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICAgICAgbmV4dFVybDogc2NoZW1hLmFueSgpLFxuICAgICAgICAgIH0pLFxuICAgICAgICB9LFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgYXV0aFJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGFzeW5jIChjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgICBjb25zdCBzZXJ2ZXJCYXNlUGF0aCA9IHRoaXMuY29yZVNldHVwLmh0dHAuYmFzZVBhdGguc2VydmVyQmFzZVBhdGg7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5yZW5kZXJIdG1sKHtcbiAgICAgICAgICBib2R5OiBgXG4gICAgICAgICAgICA8IURPQ1RZUEUgaHRtbD5cbiAgICAgICAgICAgIDx0aXRsZT5PU0QgU0FNTCBTdWNjZXNzPC90aXRsZT5cbiAgICAgICAgICAgIDxsaW5rIHJlbD1cImljb25cIiBocmVmPVwiZGF0YTosXCI+XG4gICAgICAgICAgICA8c2NyaXB0IHNyYz1cIiR7c2VydmVyQmFzZVBhdGh9L2F1dGgvc2FtbC9yZWRpcmVjdFVybEZyYWdtZW50LmpzXCI+PC9zY3JpcHQ+XG4gICAgICAgICAgYCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgKTtcblxuICAgIC8vIFRoaXMgc2NyaXB0IHdpbGwgcG9wIHRoZSBIYXNoIGZyb20gbG9jYWwgc3RvcmFnZSBpZiBpdCBleGlzdHMuXG4gICAgLy8gQW5kIGZvcndhcmQgdGhlIGJyb3dzZXIgdG8gdGhlIG5leHQgdXJsLlxuICAgIHRoaXMuY29yZVNldHVwLmh0dHAucmVzb3VyY2VzLnJlZ2lzdGVyKFxuICAgICAge1xuICAgICAgICBwYXRoOiAnL2F1dGgvc2FtbC9yZWRpcmVjdFVybEZyYWdtZW50LmpzJyxcbiAgICAgICAgdmFsaWRhdGU6IGZhbHNlLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgYXV0aFJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGFzeW5jIChjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UucmVuZGVySnMoe1xuICAgICAgICAgIGJvZHk6IGBsZXQgc2FtbEhhc2g9d2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzYW1sSGFzaCcpO1xuICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3NhbWxIYXNoJyk7XG4gICAgICAgICAgICAgICAgIGxldCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgICAgICAgICAgICAgICBsZXQgbmV4dFVybCA9IHBhcmFtcy5nZXQoXCJuZXh0VXJsXCIpO1xuICAgICAgICAgICAgICAgICBmaW5hbFVybCA9IG5leHRVcmwgKyBzYW1sSGFzaDtcbiAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoZmluYWxVcmwpO1xuICAgICAgICAgICAgICAgIGAsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICk7XG5cbiAgICB0aGlzLnJvdXRlci5nZXQoXG4gICAgICB7XG4gICAgICAgIHBhdGg6IFNBTUxfQVVUSF9MT0dPVVQsXG4gICAgICAgIHZhbGlkYXRlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBhc3luYyAoY29udGV4dCwgcmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCBhdXRoSW5mbyA9IGF3YWl0IHRoaXMuc2VjdXJpdHlDbGllbnQuYXV0aGluZm8ocmVxdWVzdCk7XG4gICAgICAgICAgYXdhaXQgY2xlYXJTcGxpdENvb2tpZXMoXG4gICAgICAgICAgICByZXF1ZXN0LFxuICAgICAgICAgICAgdGhpcy5nZXRFeHRyYUF1dGhTdG9yYWdlT3B0aW9ucyhjb250ZXh0LnNlY3VyaXR5X3BsdWdpbi5sb2dnZXIpXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLnNlc3Npb25TdG9yYWdlRmFjdG9yeS5hc1Njb3BlZChyZXF1ZXN0KS5jbGVhcigpO1xuICAgICAgICAgIC8vIFRPRE86IG5lZWQgYSBkZWZhdWx0IGxvZ291dCBwYWdlXG4gICAgICAgICAgY29uc3QgcmVkaXJlY3RVcmwgPVxuICAgICAgICAgICAgYXV0aEluZm8uc3NvX2xvZ291dF91cmwgfHwgdGhpcy5jb3JlU2V0dXAuaHR0cC5iYXNlUGF0aC5zZXJ2ZXJCYXNlUGF0aCB8fCAnLyc7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnJlZGlyZWN0ZWQoe1xuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICBsb2NhdGlvbjogcmVkaXJlY3RVcmwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnRleHQuc2VjdXJpdHlfcGx1Z2luLmxvZ2dlci5lcnJvcihgU0FNTCBsb2dvdXQgZmFpbGVkOiAke2Vycm9yfWApO1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5iYWRSZXF1ZXN0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuICB9XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQWVBLElBQUFBLGFBQUEsR0FBQUMsT0FBQTtBQU1BLElBQUFDLFNBQUEsR0FBQUQsT0FBQTtBQUNBLElBQUFFLE9BQUEsR0FBQUYsT0FBQTtBQUVBLElBQUFHLGdCQUFBLEdBQUFILE9BQUE7QUF4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFpQk8sTUFBTUksY0FBYyxDQUFDO0VBQzFCQyxXQUFXQSxDQUNRQyxNQUFlO0VBQ2hDO0VBQ2lCQyxNQUFnQyxFQUNoQ0MscUJBQW1FLEVBQ25FQyxjQUE4QixFQUM5QkMsU0FBb0IsRUFDckM7SUFBQSxLQU5pQkosTUFBZSxHQUFmQSxNQUFlO0lBQUEsS0FFZkMsTUFBZ0MsR0FBaENBLE1BQWdDO0lBQUEsS0FDaENDLHFCQUFtRSxHQUFuRUEscUJBQW1FO0lBQUEsS0FDbkVDLGNBQThCLEdBQTlCQSxjQUE4QjtJQUFBLEtBQzlCQyxTQUFvQixHQUFwQkEsU0FBb0I7RUFDcEM7RUFFS0MsMEJBQTBCQSxDQUFDQyxNQUFlLEVBQTJCO0lBQzNFO0lBQ0EsT0FBTztNQUNMQyxZQUFZLEVBQUUsSUFBSSxDQUFDTixNQUFNLENBQUNPLElBQUksQ0FBQ0MsYUFBYSxDQUFDQyxhQUFhO01BQzFEQyxpQkFBaUIsRUFBRSxJQUFJLENBQUNWLE1BQU0sQ0FBQ08sSUFBSSxDQUFDQyxhQUFhLENBQUNHLGtCQUFrQjtNQUNwRU47SUFDRixDQUFDO0VBQ0g7RUFFT08sV0FBV0EsQ0FBQSxFQUFHO0lBQ25CLElBQUksQ0FBQ2IsTUFBTSxDQUFDYyxHQUFHLENBQ2I7TUFDRUMsSUFBSSxFQUFFQyx1QkFBZTtNQUNyQkMsUUFBUSxFQUFFO1FBQ1JDLEtBQUssRUFBRUMsb0JBQU0s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