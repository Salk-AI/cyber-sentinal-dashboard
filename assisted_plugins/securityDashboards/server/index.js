"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "SecurityPluginSetup", {
  enumerable: true,
  get: function () {
    return _types.SecurityPluginSetup;
  }
});
Object.defineProperty(exports, "SecurityPluginStart", {
  enumerable: true,
  get: function () {
    return _types.SecurityPluginStart;
  }
});
exports.configSchema = exports.config = void 0;
exports.plugin = plugin;
var _configSchema = require("@osd/config-schema");
var _plugin = require("./plugin");
var _common = require("../common");
var _jwt_auth = require("./auth/types/jwt/jwt_auth");
var _types = require("./types");
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

const validateAuthType = value => {
  const supportedAuthTypes = ['', _common.AuthType.BASIC, 'jwt', 'openid', _common.AuthType.SAML, 'proxy', 'kerberos', 'proxycache'];
  value.forEach(authVal => {
    if (!supportedAuthTypes.includes(authVal.toLowerCase())) {
      throw new Error(`Unsupported authentication type: ${authVal}. Allowed auth.type are ${supportedAuthTypes}.`);
    }
  });
};
const configSchema = exports.configSchema = _configSchema.schema.object({
  enabled: _configSchema.schema.boolean({
    defaultValue: true
  }),
  allow_client_certificates: _configSchema.schema.boolean({
    defaultValue: false
  }),
  readonly_mode: _configSchema.schema.object({
    roles: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    })
  }),
  clusterPermissions: _configSchema.schema.object({
    include: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    })
  }),
  indexPermissions: _configSchema.schema.object({
    include: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    })
  }),
  disabledTransportCategories: _configSchema.schema.object({
    exclude: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    })
  }),
  disabledRestCategories: _configSchema.schema.object({
    exclude: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    })
  }),
  cookie: _configSchema.schema.object({
    secure: _configSchema.schema.boolean({
      defaultValue: false
    }),
    name: _configSchema.schema.string({
      defaultValue: 'security_authentication'
    }),
    password: _configSchema.schema.string({
      defaultValue: 'security_cookie_default_password',
      minLength: 32
    }),
    ttl: _configSchema.schema.number({
      defaultValue: 60 * 60 * 1000
    }),
    domain: _configSchema.schema.nullable(_configSchema.schema.string()),
    isSameSite: _configSchema.schema.oneOf([_configSchema.schema.literal('Strict'), _configSchema.schema.literal('Lax'), _configSchema.schema.literal('None'), _configSchema.schema.literal(false)], {
      defaultValue: false
    })
  }),
  session: _configSchema.schema.object({
    ttl: _configSchema.schema.number({
      defaultValue: 60 * 60 * 1000
    }),
    keepalive: _configSchema.schema.boolean({
      defaultValue: true
    })
  }),
  auth: _configSchema.schema.object({
    type: _configSchema.schema.oneOf([_configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: [''],
      validate(value) {
        if (!value || value.length === 0) {
          return `Authentication type is not configured properly. At least one authentication type must be selected.`;
        }
        if (value.length > 1) {
          const includeBasicAuth = value.find(element => {
            return element.toLowerCase() === _common.AuthType.BASIC;
          });
          if (!includeBasicAuth) {
            return `Authentication type is not configured properly. basicauth is mandatory.`;
          }
        }
        validateAuthType(value);
      }
    }), _configSchema.schema.string({
      defaultValue: '',
      validate(value) {
        const valArray = [];
        valArray.push(value);
        validateAuthType(valArray);
      }
    })], {
      defaultValue: ''
    }),
    anonymous_auth_enabled: _configSchema.schema.boolean({
      defaultValue: false
    }),
    unauthenticated_routes: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: ['/api/reporting/stats']
    }),
    forbidden_usernames: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    }),
    logout_url: _configSchema.schema.string({
      defaultValue: ''
    }),
    multiple_auth_enabled: _configSchema.schema.boolean({
      defaultValue: false
    })
  }),
  basicauth: _configSchema.schema.object({
    enabled: _configSchema.schema.boolean({
      defaultValue: true
    }),
    unauthenticated_routes: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    }),
    forbidden_usernames: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    }),
    header_trumps_session: _configSchema.schema.boolean({
      defaultValue: false
    }),
    alternative_login: _configSchema.schema.object({
      headers: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
        defaultValue: []
      }),
      show_for_parameter: _configSchema.schema.string({
        defaultValue: ''
      }),
      valid_redirects: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
        defaultValue: []
      }),
      button_text: _configSchema.schema.string({
        defaultValue: 'Log in with provider'
      }),
      buttonstyle: _configSchema.schema.string({
        defaultValue: ''
      })
    }),
    loadbalancer_url: _configSchema.schema.maybe(_configSchema.schema.string()),
    login: _configSchema.schema.object({
      title: _configSchema.schema.string({
        defaultValue: ''
      }),
      subtitle: _configSchema.schema.string({
        defaultValue: ''
      }),
      showbrandimage: _configSchema.schema.boolean({
        defaultValue: true
      }),
      brandimage: _configSchema.schema.string({
        defaultValue: ''
      }),
      // TODO: update brand image
      buttonstyle: _configSchema.schema.string({
        defaultValue: ''
      })
    })
  }),
  multitenancy: _configSchema.schema.object({
    enabled: _configSchema.schema.boolean({
      defaultValue: false
    }),
    show_roles: _configSchema.schema.boolean({
      defaultValue: false
    }),
    enable_filter: _configSchema.schema.boolean({
      defaultValue: false
    }),
    debug: _configSchema.schema.boolean({
      defaultValue: false
    }),
    enable_aggregation_view: _configSchema.schema.boolean({
      defaultValue: false
    }),
    tenants: _configSchema.schema.object({
      enable_private: _configSchema.schema.boolean({
        defaultValue: true
      }),
      enable_global: _configSchema.schema.boolean({
        defaultValue: true
      }),
      preferred: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
        defaultValue: []
      })
    })
  }),
  configuration: _configSchema.schema.object({
    enabled: _configSchema.schema.boolean({
      defaultValue: true
    })
  }),
  accountinfo: _configSchema.schema.object({
    enabled: _configSchema.schema.boolean({
      defaultValue: false
    })
  }),
  openid: _configSchema.schema.maybe(_configSchema.schema.object({
    connect_url: _configSchema.schema.maybe(_configSchema.schema.string()),
    header: _configSchema.schema.string({
      defaultValue: 'Authorization'
    }),
    // TODO: test if siblingRef() works here
    // client_id is required when auth.type is openid
    client_id: _configSchema.schema.conditional(_configSchema.schema.siblingRef('auth.type'), 'openid', _configSchema.schema.string(), _configSchema.schema.maybe(_configSchema.schema.string())),
    client_secret: _configSchema.schema.string({
      defaultValue: ''
    }),
    scope: _configSchema.schema.string({
      defaultValue: 'openid profile email address phone'
    }),
    base_redirect_url: _configSchema.schema.string({
      defaultValue: ''
    }),
    logout_url: _configSchema.schema.string({
      defaultValue: ''
    }),
    root_ca: _configSchema.schema.string({
      defaultValue: ''
    }),
    certificate: _configSchema.schema.string({
      defaultValue: ''
    }),
    private_key: _configSchema.schema.string({
      defaultValue: ''
    }),
    passphrase: _configSchema.schema.string({
      defaultValue: ''
    }),
    pfx: _configSchema.schema.string({
      defaultValue: ''
    }),
    verify_hostnames: _configSchema.schema.boolean({
      defaultValue: true
    }),
    refresh_tokens: _configSchema.schema.boolean({
      defaultValue: true
    }),
    trust_dynamic_headers: _configSchema.schema.boolean({
      defaultValue: false
    }),
    additional_parameters: _configSchema.schema.maybe(_configSchema.schema.any({
      defaultValue: null
    })),
    extra_storage: _configSchema.schema.object({
      cookie_prefix: _configSchema.schema.string({
        defaultValue: 'security_authentication_oidc',
        minLength: 2
      }),
      additional_cookies: _configSchema.schema.number({
        min: 1,
        defaultValue: 5
      })
    })
  })),
  saml: _configSchema.schema.object({
    extra_storage: _configSchema.schema.object({
      cookie_prefix: _configSchema.schema.string({
        defaultValue: 'security_authentication_saml',
        minLength: 2
      }),
      additional_cookies: _configSchema.schema.number({
        min: 0,
        defaultValue: 3
      })
    })
  }),
  proxycache: _configSchema.schema.maybe(_configSchema.schema.object({
    // when auth.type is proxycache, user_header, roles_header and proxy_header_ip are required
    user_header: _configSchema.schema.conditional(_configSchema.schema.siblingRef('auth.type'), 'proxycache', _configSchema.schema.string(), _configSchema.schema.maybe(_configSchema.schema.string())),
    roles_header: _configSchema.schema.conditional(_configSchema.schema.siblingRef('auth.type'), 'proxycache', _configSchema.schema.string(), _configSchema.schema.maybe(_configSchema.schema.string())),
    proxy_header: _configSchema.schema.maybe(_configSchema.schema.string({
      defaultValue: 'x-forwarded-for'
    })),
    proxy_header_ip: _configSchema.schema.conditional(_configSchema.schema.siblingRef('auth.type'), 'proxycache', _configSchema.schema.string(), _configSchema.schema.maybe(_configSchema.schema.string())),
    login_endpoint: _configSchema.schema.maybe(_configSchema.schema.string({
      defaultValue: ''
    }))
  })),
  jwt: _configSchema.schema.maybe(_configSchema.schema.object({
    enabled: _configSchema.schema.boolean({
      defaultValue: false
    }),
    login_endpoint: _configSchema.schema.maybe(_configSchema.schema.string()),
    url_param: _configSchema.schema.string({
      defaultValue: 'authorization'
    }),
    header: _configSchema.schema.string({
      defaultValue: 'Authorization'
    }),
    extra_storage: _configSchema.schema.object({
      cookie_prefix: _configSchema.schema.string({
        defaultValue: _jwt_auth.JWT_DEFAULT_EXTRA_STORAGE_OPTIONS.cookiePrefix,
        minLength: 2
      }),
      additional_cookies: _configSchema.schema.number({
        min: 1,
        defaultValue: _jwt_auth.JWT_DEFAULT_EXTRA_STORAGE_OPTIONS.additionalCookies
      })
    })
  })),
  ui: _configSchema.schema.object({
    basicauth: _configSchema.schema.object({
      // the login config here is the same as old config `_security.basicauth.login`
      // Since we are now rendering login page to browser app, so move these config to browser side.
      login: _configSchema.schema.object({
        title: _configSchema.schema.string({
          defaultValue: ''
        }),
        subtitle: _configSchema.schema.string({
          defaultValue: ''
        }),
        showbrandimage: _configSchema.schema.boolean({
          defaultValue: true
        }),
        brandimage: _configSchema.schema.string({
          defaultValue: ''
        }),
        buttonstyle: _configSchema.schema.string({
          defaultValue: ''
        })
      })
    }),
    anonymous: _configSchema.schema.object({
      login: _configSchema.schema.object({
        buttonname: _configSchema.schema.string({
          defaultValue: 'Log in as anonymous'
        }),
        showbrandimage: _configSchema.schema.boolean({
          defaultValue: false
        }),
        brandimage: _configSchema.schema.string({
          defaultValue: ''
        }),
        buttonstyle: _configSchema.schema.string({
          defaultValue: ''
        })
      })
    }),
    openid: _configSchema.schema.object({
      login: _configSchema.schema.object({
        buttonname: _configSchema.schema.string({
          defaultValue: 'Log in with single sign-on'
        }),
        showbrandimage: _configSchema.schema.boolean({
          defaultValue: false
        }),
        brandimage: _configSchema.schema.string({
          defaultValue: ''
        }),
        buttonstyle: _configSchema.schema.string({
          defaultValue: ''
        })
      })
    }),
    saml: _configSchema.schema.object({
      login: _configSchema.schema.object({
        buttonname: _configSchema.schema.string({
          defaultValue: 'Log in with single sign-on'
        }),
        showbrandimage: _configSchema.schema.boolean({
          defaultValue: false
        }),
        brandimage: _configSchema.schema.string({
          defaultValue: ''
        }),
        buttonstyle: _configSchema.schema.string({
          defaultValue: ''
        })
      })
    }),
    autologout: _configSchema.schema.boolean({
      defaultValue: true
    }),
    backend_configurable: _configSchema.schema.boolean({
      defaultValue: true
    })
  })
});
const config = exports.config = {
  exposeToBrowser: {
    enabled: true,
    auth: true,
    ui: true,
    multitenancy: true,
    readonly_mode: true,
    clusterPermissions: true,
    indexPermissions: true,
    disabledTransportCategories: true,
    disabledRestCategories: true
  },
  schema: configSchema,
  deprecations: ({
    rename,
    unused
  }) => [rename('basicauth.login.title', 'ui.basicauth.login.title'), rename('basicauth.login.subtitle', 'ui.basicauth.login.subtitle'), rename('basicauth.login.showbrandimage', 'ui.basicauth.login.showbrandimage'), rename('basicauth.login.brandimage', 'ui.basicauth.login.brandimage'), rename('basicauth.login.buttonstyle', 'ui.basicauth.login.buttonstyle')]
};

//  This exports static code and TypeScript types,
//  as well as, OpenSearchDashboards Platform `plugin()` initializer.

function plugin(initializerContext) {
  return new _plugin.SecurityPlugin(initializerContext);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY29uZmlnU2NoZW1hIiwicmVxdWlyZSIsIl9wbHVnaW4iLCJfY29tbW9uIiwiX2p3dF9hdXRoIiwiX3R5cGVzIiwidmFsaWRhdGVBdXRoVHlwZSIsInZhbHVlIiwic3VwcG9ydGVkQXV0aFR5cGVzIiwiQXV0aFR5cGUiLCJCQVNJQyIsIlNBTUwiLCJmb3JFYWNoIiwiYXV0aFZhbCIsImluY2x1ZGVzIiwidG9Mb3dlckNhc2UiLCJFcnJvciIsImNvbmZpZ1NjaGVtYSIsImV4cG9ydHMiLCJzY2hlbWEiLCJvYmplY3QiLCJlbmFibGVkIiwiYm9vbGVhbiIsImRlZmF1bHRWYWx1ZSIsImFsbG93X2NsaWVudF9jZXJ0aWZpY2F0ZXMiLCJyZWFkb25seV9tb2RlIiwicm9sZXMiLCJhcnJheU9mIiwic3RyaW5nIiwiY2x1c3RlclBlcm1pc3Npb25zIiwiaW5jbHVkZSIsImluZGV4UGVybWlzc2lvbnMiLCJkaXNhYmxlZFRyYW5zcG9ydENhdGVnb3JpZXMiLCJleGNsdWRlIiwiZGlzYWJsZWRSZXN0Q2F0ZWdvcmllcyIsImNvb2tpZSIsInNlY3VyZSIsIm5hbWUiLCJwYXNzd29yZCIsIm1pbkxlbmd0aCIsInR0bCIsIm51bWJlciIsImRvbWFpbiIsIm51bGxhYmxlIiwiaXNTYW1lU2l0ZSIsIm9uZU9mIiwibGl0ZXJhbCIsInNlc3Npb24iLCJrZWVwYWxpdmUiLCJhdXRoIiwidHlwZSIsInZhbGlkYXRlIiwibGVuZ3RoIiwiaW5jbHVkZUJhc2ljQXV0aCIsImZpbmQiLCJlbGVtZW50IiwidmFsQXJyYXkiLCJwdXNoIiwiYW5vbnltb3VzX2F1dGhfZW5hYmxlZCIsInVuYXV0aGVudGljYXRlZF9yb3V0ZXMiLCJmb3JiaWRkZW5fdXNlcm5hbWVzIiwibG9nb3V0X3VybCIsIm11bHRpcGxlX2F1dGhfZW5hYmxlZCIsImJhc2ljYXV0aCIsImhlYWRlcl90cnVtcHNfc2Vzc2lvbiIsImFsdGVybmF0aXZlX2xvZ2luIiwiaGVhZGVycyIsInNob3dfZm9yX3BhcmFtZXRlciIsInZhbGlkX3JlZGlyZWN0cyIsImJ1dHRvbl90ZXh0IiwiYnV0dG9uc3R5bGUiLCJsb2FkYmFsYW5jZXJfdXJsIiwibWF5YmUiLCJsb2dpbiIsInRpdGxlIiwic3VidGl0bGUiLCJzaG93YnJhbmRpbWFnZSIsImJyYW5kaW1hZ2UiLCJtdWx0aXRlbmFuY3kiLCJzaG93X3JvbGVzIiwiZW5hYmxlX2ZpbHRlciIsImRlYnVnIiwiZW5hYmxlX2FnZ3JlZ2F0aW9uX3ZpZXciLCJ0ZW5hbnRzIiwiZW5hYmxlX3ByaXZhdGUiLCJlbmFibGVfZ2xvYmFsIiwicHJlZmVycmVkIiwiY29uZmlndXJhdGlvbiIsImFjY291bnRpbmZvIiwib3BlbmlkIiwiY29ubmVjdF91cmwiLCJoZWFkZXIiLCJjbGllbnRfaWQiLCJjb25kaXRpb25hbCIsInNpYmxpbmdSZWYiLCJjbGllbnRfc2VjcmV0Iiwic2NvcGUiLCJiYXNlX3JlZGlyZWN0X3VybCIsInJvb3RfY2EiLCJjZXJ0aWZpY2F0ZSIsInByaXZhdGVfa2V5IiwicGFzc3BocmFzZSIsInBmeCIsInZlcmlmeV9ob3N0bmFtZXMiLCJyZWZyZXNoX3Rva2VucyIsInRydXN0X2R5bmFtaWNfaGVhZGVycyIsImFkZGl0aW9uYWxfcGFyYW1ldGVycyIsImFueSIsImV4dHJhX3N0b3JhZ2UiLCJjb29raWVfcHJlZml4IiwiYWRkaXRpb25hbF9jb29raWVzIiwibWluIiwic2FtbCIsInByb3h5Y2FjaGUiLCJ1c2VyX2hlYWRlciIsInJvbGVzX2hlYWRlciIsInByb3h5X2hlYWRlciIsInByb3h5X2hlYWRlcl9pcCIsImxvZ2luX2VuZHBvaW50Iiwiand0IiwidXJsX3BhcmFtIiwiSldUX0RFRkFVTFRfRVhUUkFfU1RPUkFHRV9PUFRJT05TIiwiY29va2llUHJlZml4IiwiYWRkaXRpb25hbENvb2tpZXMiLCJ1aSIsImFub255bW91cyIsImJ1dHRvbm5hbWUiLCJhdXRvbG9nb3V0IiwiYmFja2VuZF9jb25maWd1cmFibGUiLCJjb25maWciLCJleHBvc2VUb0Jyb3dzZXIiLCJkZXByZWNhdGlvbnMiLCJyZW5hbWUiLCJ1bnVzZWQiLCJwbHVnaW4iLCJpbml0aWFsaXplckNvbnRleHQiLCJTZWN1cml0eVBsdWdpbiJdLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAgIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICpcbiAqICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKS5cbiAqICAgWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogICBBIGNvcHkgb2YgdGhlIExpY2Vuc2UgaXMgbG9jYXRlZCBhdFxuICpcbiAqICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICAgb3IgaW4gdGhlIFwibGljZW5zZVwiIGZpbGUgYWNjb21wYW55aW5nIHRoaXMgZmlsZS4gVGhpcyBmaWxlIGlzIGRpc3RyaWJ1dGVkXG4gKiAgIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogICBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZ1xuICogICBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHsgc2NoZW1hLCBUeXBlT2YgfSBmcm9tICdAb3NkL2NvbmZpZy1zY2hlbWEnO1xuaW1wb3J0IHsgUGx1Z2luSW5pdGlhbGl6ZXJDb250ZXh0LCBQbHVnaW5Db25maWdEZXNjcmlwdG9yIH0gZnJvbSAnLi4vLi4vLi4vc3JjL2NvcmUvc2VydmVyJztcbmltcG9ydCB7IFNlY3VyaXR5UGx1Z2luIH0gZnJvbSAnLi9wbHVnaW4nO1xuaW1wb3J0IHsgQXV0aFR5cGUgfSBmcm9tICcuLi9jb21tb24nO1xuaW1wb3J0IHsgSldUX0RFRkFVTFRfRVhUUkFfU1RPUkFHRV9PUFRJT05TIH0gZnJvbSAnLi9hdXRoL3R5cGVzL2p3dC9qd3RfYXV0aCc7XG5cbmNvbnN0IHZhbGlkYXRlQXV0aFR5cGUgPSAodmFsdWU6IHN0cmluZ1tdKSA9PiB7XG4gIGNvbnN0IHN1cHBvcnRlZEF1dGhUeXBlcyA9IFtcbiAgICAnJyxcbiAgICBBdXRoVHlwZS5CQVNJQyxcbiAgICAnand0JyxcbiAgICAnb3BlbmlkJyxcbiAgICBBdXRoVHlwZS5TQU1MLFxuICAgICdwcm94eScsXG4gICAgJ2tlcmJlcm9zJyxcbiAgICAncHJveHljYWNoZScsXG4gIF07XG5cbiAgdmFsdWUuZm9yRWFjaCgoYXV0aFZhbCkgPT4ge1xuICAgIGlmICghc3VwcG9ydGVkQXV0aFR5cGVzLmluY2x1ZGVzKGF1dGhWYWwudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFVuc3VwcG9ydGVkIGF1dGhlbnRpY2F0aW9uIHR5cGU6ICR7YXV0aFZhbH0uIEFsbG93ZWQgYXV0aC50eXBlIGFyZSAke3N1cHBvcnRlZEF1dGhUeXBlc30uYFxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGNvbmZpZ1NjaGVtYSA9IHNjaGVtYS5vYmplY3Qoe1xuICBlbmFibGVkOiBzY2hlbWEuYm9vbGVhbih7IGRlZmF1bHRWYWx1ZTogdHJ1ZSB9KSxcbiAgYWxsb3dfY2xpZW50X2NlcnRpZmljYXRlczogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IGZhbHNlIH0pLFxuICByZWFkb25seV9tb2RlOiBzY2hlbWEub2JqZWN0KHtcbiAgICByb2xlczogc2NoZW1hLmFycmF5T2Yoc2NoZW1hLnN0cmluZygpLCB7IGRlZmF1bHRWYWx1ZTogW10gfSksXG4gIH0pLFxuICBjbHVzdGVyUGVybWlzc2lvbnM6IHNjaGVtYS5vYmplY3Qoe1xuICAgIGluY2x1ZGU6IHNjaGVtYS5hcnJheU9mKHNjaGVtYS5zdHJpbmcoKSwgeyBkZWZhdWx0VmFsdWU6IFtdIH0pLFxuICB9KSxcbiAgaW5kZXhQZXJtaXNzaW9uczogc2NoZW1hLm9iamVjdCh7XG4gICAgaW5jbHVkZTogc2NoZW1hLmFycmF5T2Yoc2NoZW1hLnN0cmluZygpLCB7IGRlZmF1bHRWYWx1ZTogW10gfSksXG4gIH0pLFxuICBkaXNhYmxlZFRyYW5zcG9ydENhdGVnb3JpZXM6IHNjaGVtYS5vYmplY3Qoe1xuICAgIGV4Y2x1ZGU6IHNjaGVtYS5hcnJheU9mKHNjaGVtYS5zdHJpbmcoKSwgeyBkZWZhdWx0VmFsdWU6IFtdIH0pLFxuICB9KSxcbiAgZGlzYWJsZWRSZXN0Q2F0ZWdvcmllczogc2NoZW1hLm9iamVjdCh7XG4gICAgZXhjbHVkZTogc2NoZW1hLmFycmF5T2Yoc2NoZW1hLnN0cmluZygpLCB7IGRlZmF1bHRWYWx1ZTogW10gfSksXG4gIH0pLFxuICBjb29raWU6IHNjaGVtYS5vYmplY3Qoe1xuICAgIHNlY3VyZTogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IGZhbHNlIH0pLFxuICAgIG5hbWU6IHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICdzZWN1cml0eV9hdXRoZW50aWNhdGlvbicgfSksXG4gICAgcGFzc3dvcmQ6IHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICdzZWN1cml0eV9jb29raWVfZGVmYXVsdF9wYXNzd29yZCcsIG1pbkxlbmd0aDogMzIgfSksXG4gICAgdHRsOiBzY2hlbWEubnVtYmVyKHsgZGVmYXVsdFZhbHVlOiA2MCAqIDYwICogMTAwMCB9KSxcbiAgICBkb21haW46IHNjaGVtYS5udWxsYWJsZShzY2hlbWEuc3RyaW5nKCkpLFxuICAgIGlzU2FtZVNpdGU6IHNjaGVtYS5vbmVPZihcbiAgICAgIFtcbiAgICAgICAgc2NoZW1hLmxpdGVyYWwoJ1N0cmljdCcpLFxuICAgICAgICBzY2hlbWEubGl0ZXJhbCgnTGF4JyksXG4gICAgICAgIHNjaGVtYS5saXRlcmFsKCdOb25lJyksXG4gICAgICAgIHNjaGVtYS5saXRlcmFsKGZhbHNlKSxcbiAgICAgIF0sXG4gICAgICB7IGRlZmF1bHRWYWx1ZTogZmFsc2UgfVxuICAgICksXG4gIH0pLFxuICBzZXNzaW9uOiBzY2hlbWEub2JqZWN0KHtcbiAgICB0dGw6IHNjaGVtYS5udW1iZXIoeyBkZWZhdWx0VmFsdWU6IDYwICogNjAgKiAxMDAwIH0pLFxuICAgIGtlZXBhbGl2ZTogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IHRydWUgfSksXG4gIH0pLFxuICBhdXRoOiBzY2hlbWEub2JqZWN0KHtcbiAgICB0eXBlOiBzY2hlbWEub25lT2YoXG4gICAgICBbXG4gICAgICAgIHNjaGVtYS5hcnJheU9mKHNjaGVtYS5zdHJpbmcoKSwge1xuICAgICAgICAgIGRlZmF1bHRWYWx1ZTogWycnXSxcbiAgICAgICAgICB2YWxpZGF0ZSh2YWx1ZTogc3RyaW5nW10pIHtcbiAgICAgICAgICAgIGlmICghdmFsdWUgfHwgdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgIHJldHVybiBgQXV0aGVudGljYXRpb24gdHlwZSBpcyBub3QgY29uZmlndXJlZCBwcm9wZXJseS4gQXQgbGVhc3Qgb25lIGF1dGhlbnRpY2F0aW9uIHR5cGUgbXVzdCBiZSBzZWxlY3RlZC5gO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICBjb25zdCBpbmNsdWRlQmFzaWNBdXRoID0gdmFsdWUuZmluZCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnRvTG93ZXJDYXNlKCkgPT09IEF1dGhUeXBlLkJBU0lDO1xuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICBpZiAoIWluY2x1ZGVCYXNpY0F1dGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYEF1dGhlbnRpY2F0aW9uIHR5cGUgaXMgbm90IGNvbmZpZ3VyZWQgcHJvcGVybHkuIGJhc2ljYXV0aCBpcyBtYW5kYXRvcnkuYDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YWxpZGF0ZUF1dGhUeXBlKHZhbHVlKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICAgc2NoZW1hLnN0cmluZyh7XG4gICAgICAgICAgZGVmYXVsdFZhbHVlOiAnJyxcbiAgICAgICAgICB2YWxpZGF0ZSh2YWx1ZSkge1xuICAgICAgICAgICAgY29uc3QgdmFsQXJyYXk6IHN0cmluZ1tdID0gW107XG4gICAgICAgICAgICB2YWxBcnJheS5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIHZhbGlkYXRlQXV0aFR5cGUodmFsQXJyYXkpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICAgIHsgZGVmYXVsdFZhbHVlOiAnJyB9XG4gICAgKSxcbiAgICBhbm9ueW1vdXNfYXV0aF9lbmFibGVkOiBzY2hlbWEuYm9vbGVhbih7IGRlZmF1bHRWYWx1ZTogZmFsc2UgfSksXG4gICAgdW5hdXRoZW50aWNhdGVkX3JvdXRlczogc2NoZW1hLmFycmF5T2Yoc2NoZW1hLnN0cmluZygpLCB7XG4gICAgICBkZWZhdWx0VmFsdWU6IFsnL2FwaS9yZXBvcnRpbmcvc3RhdHMnXSxcbiAgICB9KSxcbiAgICBmb3JiaWRkZW5fdXNlcm5hbWVzOiBzY2hlbWEuYXJyYXlPZihzY2hlbWEuc3RyaW5nKCksIHsgZGVmYXVsdFZhbHVlOiBbXSB9KSxcbiAgICBsb2dvdXRfdXJsOiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnJyB9KSxcbiAgICBtdWx0aXBsZV9hdXRoX2VuYWJsZWQ6IHNjaGVtYS5ib29sZWFuKHsgZGVmYXVsdFZhbHVlOiBmYWxzZSB9KSxcbiAgfSksXG4gIGJhc2ljYXV0aDogc2NoZW1hLm9iamVjdCh7XG4gICAgZW5hYmxlZDogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IHRydWUgfSksXG4gICAgdW5hdXRoZW50aWNhdGVkX3JvdXRlczogc2NoZW1hLmFycmF5T2Yoc2NoZW1hLnN0cmluZygpLCB7IGRlZmF1bHRWYWx1ZTogW10gfSksXG4gICAgZm9yYmlkZGVuX3VzZXJuYW1lczogc2NoZW1hLmFycmF5T2Yoc2NoZW1hLnN0cmluZygpLCB7IGRlZmF1bHRWYWx1ZTogW10gfSksXG4gICAgaGVhZGVyX3RydW1wc19zZXNzaW9uOiBzY2hlbWEuYm9vbGVhbih7IGRlZmF1bHRWYWx1ZTogZmFsc2UgfSksXG4gICAgYWx0ZXJuYXRpdmVfbG9naW46IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgaGVhZGVyczogc2NoZW1hLmFycmF5T2Yoc2NoZW1hLnN0cmluZygpLCB7IGRlZmF1bHRWYWx1ZTogW10gfSksXG4gICAgICBzaG93X2Zvcl9wYXJhbWV0ZXI6IHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICcnIH0pLFxuICAgICAgdmFsaWRfcmVkaXJlY3RzOiBzY2hlbWEuYXJyYXlPZihzY2hlbWEuc3RyaW5nKCksIHsgZGVmYXVsdFZhbHVlOiBbXSB9KSxcbiAgICAgIGJ1dHRvbl90ZXh0OiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnTG9nIGluIHdpdGggcHJvdmlkZXInIH0pLFxuICAgICAgYnV0dG9uc3R5bGU6IHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICcnIH0pLFxuICAgIH0pLFxuICAgIGxvYWRiYWxhbmNlcl91cmw6IHNjaGVtYS5tYXliZShzY2hlbWEuc3RyaW5nKCkpLFxuICAgIGxvZ2luOiBzY2hlbWEub2JqZWN0KHtcbiAgICAgIHRpdGxlOiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnJyB9KSxcbiAgICAgIHN1YnRpdGxlOiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnJyB9KSxcbiAgICAgIHNob3dicmFuZGltYWdlOiBzY2hlbWEuYm9vbGVhbih7IGRlZmF1bHRWYWx1ZTogdHJ1ZSB9KSxcbiAgICAgIGJyYW5kaW1hZ2U6IHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICcnIH0pLCAvLyBUT0RPOiB1cGRhdGUgYnJhbmQgaW1hZ2VcbiAgICAgIGJ1dHRvbnN0eWxlOiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnJyB9KSxcbiAgICB9KSxcbiAgfSksXG4gIG11bHRpdGVuYW5jeTogc2NoZW1hLm9iamVjdCh7XG4gICAgZW5hYmxlZDogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IGZhbHNlIH0pLFxuICAgIHNob3dfcm9sZXM6IHNjaGVtYS5ib29sZWFuKHsgZGVmYXVsdFZhbHVlOiBmYWxzZSB9KSxcbiAgICBlbmFibGVfZmlsdGVyOiBzY2hlbWEuYm9vbGVhbih7IGRlZmF1bHRWYWx1ZTogZmFsc2UgfSksXG4gICAgZGVidWc6IHNjaGVtYS5ib29sZWFuKHsgZGVmYXVsdFZhbHVlOiBmYWxzZSB9KSxcbiAgICBlbmFibGVfYWdncmVnYXRpb25fdmlldzogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IGZhbHNlIH0pLFxuICAgIHRlbmFudHM6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgZW5hYmxlX3ByaXZhdGU6IHNjaGVtYS5ib29sZWFuKHsgZGVmYXVsdFZhbHVlOiB0cnVlIH0pLFxuICAgICAgZW5hYmxlX2dsb2JhbDogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IHRydWUgfSksXG4gICAgICBwcmVmZXJyZWQ6IHNjaGVtYS5hcnJheU9mKHNjaGVtYS5zdHJpbmcoKSwgeyBkZWZhdWx0VmFsdWU6IFtdIH0pLFxuICAgIH0pLFxuICB9KSxcbiAgY29uZmlndXJhdGlvbjogc2NoZW1hLm9iamVjdCh7XG4gICAgZW5hYmxlZDogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IHRydWUgfSksXG4gIH0pLFxuICBhY2NvdW50aW5mbzogc2NoZW1hLm9iamVjdCh7XG4gICAgZW5hYmxlZDogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IGZhbHNlIH0pLFxuICB9KSxcbiAgb3BlbmlkOiBzY2hlbWEubWF5YmUoXG4gICAgc2NoZW1hLm9iamVjdCh7XG4gICAgICBjb25uZWN0X3VybDogc2NoZW1hLm1heWJlKHNjaGVtYS5zdHJpbmcoKSksXG4gICAgICBoZWFkZXI6IHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICdBdXRob3JpemF0aW9uJyB9KSxcbiAgICAgIC8vIFRPRE86IHRlc3QgaWYgc2libGluZ1JlZigpIHdvcmtzIGhlcmVcbiAgICAgIC8vIGNsaWVudF9pZCBpcyByZXF1aXJlZCB3aGVuIGF1dGgudHlwZSBpcyBvcGVuaWRcbiAgICAgIGNsaWVudF9pZDogc2NoZW1hLmNvbmRpdGlvbmFsKFxuICAgICAgICBzY2hlbWEuc2libGluZ1JlZignYXV0aC50eXBlJyksXG4gICAgICAgICdvcGVuaWQnLFxuICAgICAgICBzY2hlbWEuc3RyaW5nKCksXG4gICAgICAgIHNjaGVtYS5tYXliZShzY2hlbWEuc3RyaW5nKCkpXG4gICAgICApLFxuICAgICAgY2xpZW50X3NlY3JldDogc2NoZW1hLnN0cmluZyh7IGRlZmF1bHRWYWx1ZTogJycgfSksXG4gICAgICBzY29wZTogc2NoZW1hLnN0cmluZyh7IGRlZmF1bHRWYWx1ZTogJ29wZW5pZCBwcm9maWxlIGVtYWlsIGFkZHJlc3MgcGhvbmUnIH0pLFxuICAgICAgYmFzZV9yZWRpcmVjdF91cmw6IHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICcnIH0pLFxuICAgICAgbG9nb3V0X3VybDogc2NoZW1hLnN0cmluZyh7IGRlZmF1bHRWYWx1ZTogJycgfSksXG4gICAgICByb290X2NhOiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnJyB9KSxcbiAgICAgIGNlcnRpZmljYXRlOiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnJyB9KSxcbiAgICAgIHByaXZhdGVfa2V5OiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnJyB9KSxcbiAgICAgIHBhc3NwaHJhc2U6IHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICcnIH0pLFxuICAgICAgcGZ4OiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnJyB9KSxcbiAgICAgIHZlcmlmeV9ob3N0bmFtZXM6IHNjaGVtYS5ib29sZWFuKHsgZGVmYXVsdFZhbHVlOiB0cnVlIH0pLFxuICAgICAgcmVmcmVzaF90b2tlbnM6IHNjaGVtYS5ib29sZWFuKHsgZGVmYXVsdFZhbHVlOiB0cnVlIH0pLFxuICAgICAgdHJ1c3RfZHluYW1pY19oZWFkZXJzOiBzY2hlbWEuYm9vbGVhbih7IGRlZmF1bHRWYWx1ZTogZmFsc2UgfSksXG4gICAgICBhZGRpdGlvbmFsX3BhcmFtZXRlcnM6IHNjaGVtYS5tYXliZShzY2hlbWEuYW55KHsgZGVmYXVsdFZhbHVlOiBudWxsIH0pKSxcbiAgICAgIGV4dHJhX3N0b3JhZ2U6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICBjb29raWVfcHJlZml4OiBzY2hlbWEuc3RyaW5nKHtcbiAgICAgICAgICBkZWZhdWx0VmFsdWU6ICdzZWN1cml0eV9hdXRoZW50aWNhdGlvbl9vaWRjJyxcbiAgICAgICAgICBtaW5MZW5ndGg6IDIsXG4gICAgICAgIH0pLFxuICAgICAgICBhZGRpdGlvbmFsX2Nvb2tpZXM6IHNjaGVtYS5udW1iZXIoeyBtaW46IDEsIGRlZmF1bHRWYWx1ZTogNSB9KSxcbiAgICAgIH0pLFxuICAgIH0pXG4gICksXG4gIHNhbWw6IHNjaGVtYS5vYmplY3Qoe1xuICAgIGV4dHJhX3N0b3JhZ2U6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgY29va2llX3ByZWZpeDogc2NoZW1hLnN0cmluZyh7IGRlZmF1bHRWYWx1ZTogJ3NlY3VyaXR5X2F1dGhlbnRpY2F0aW9uX3NhbWwnLCBtaW5MZW5ndGg6IDIgfSksXG4gICAgICBhZGRpdGlvbmFsX2Nvb2tpZXM6IHNjaGVtYS5udW1iZXIoeyBtaW46IDAsIGRlZmF1bHRWYWx1ZTogMyB9KSxcbiAgICB9KSxcbiAgfSksXG5cbiAgcHJveHljYWNoZTogc2NoZW1hLm1heWJlKFxuICAgIHNjaGVtYS5vYmplY3Qoe1xuICAgICAgLy8gd2hlbiBhdXRoLnR5cGUgaXMgcHJveHljYWNoZSwgdXNlcl9oZWFkZXIsIHJvbGVzX2hlYWRlciBhbmQgcHJveHlfaGVhZGVyX2lwIGFyZSByZXF1aXJlZFxuICAgICAgdXNlcl9oZWFkZXI6IHNjaGVtYS5jb25kaXRpb25hbChcbiAgICAgICAgc2NoZW1hLnNpYmxpbmdSZWYoJ2F1dGgudHlwZScpLFxuICAgICAgICAncHJveHljYWNoZScsXG4gICAgICAgIHNjaGVtYS5zdHJpbmcoKSxcbiAgICAgICAgc2NoZW1hLm1heWJlKHNjaGVtYS5zdHJpbmcoKSlcbiAgICAgICksXG4gICAgICByb2xlc19oZWFkZXI6IHNjaGVtYS5jb25kaXRpb25hbChcbiAgICAgICAgc2NoZW1hLnNpYmxpbmdSZWYoJ2F1dGgudHlwZScpLFxuICAgICAgICAncHJveHljYWNoZScsXG4gICAgICAgIHNjaGVtYS5zdHJpbmcoKSxcbiAgICAgICAgc2NoZW1hLm1heWJlKHNjaGVtYS5zdHJpbmcoKSlcbiAgICAgICksXG4gICAgICBwcm94eV9oZWFkZXI6IHNjaGVtYS5tYXliZShzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAneC1mb3J3YXJkZWQtZm9yJyB9KSksXG4gICAgICBwcm94eV9oZWFkZXJfaXA6IHNjaGVtYS5jb25kaXRpb25hbChcbiAgICAgICAgc2NoZW1hLnNpYmxpbmdSZWYoJ2F1dGgudHlwZScpLFxuICAgICAgICAncHJveHljYWNoZScsXG4gICAgICAgIHNjaGVtYS5zdHJpbmcoKSxcbiAgICAgICAgc2NoZW1hLm1heWJlKHNjaGVtYS5zdHJpbmcoKSlcbiAgICAgICksXG4gICAgICBsb2dpbl9lbmRwb2ludDogc2NoZW1hLm1heWJlKHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICcnIH0pKSxcbiAgICB9KVxuICApLFxuICBqd3Q6IHNjaGVtYS5tYXliZShcbiAgICBzY2hlbWEub2JqZWN0KHtcbiAgICAgIGVuYWJsZWQ6IHNjaGVtYS5ib29sZWFuKHsgZGVmYXVsdFZhbHVlOiBmYWxzZSB9KSxcbiAgICAgIGxvZ2luX2VuZHBvaW50OiBzY2hlbWEubWF5YmUoc2NoZW1hLnN0cmluZygpKSxcbiAgICAgIHVybF9wYXJhbTogc2NoZW1hLnN0cmluZyh7IGRlZmF1bHRWYWx1ZTogJ2F1dGhvcml6YXRpb24nIH0pLFxuICAgICAgaGVhZGVyOiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnQXV0aG9yaXphdGlvbicgfSksXG4gICAgICBleHRyYV9zdG9yYWdlOiBzY2hlbWEub2JqZWN0KHtcbiAgICAgICAgY29va2llX3ByZWZpeDogc2NoZW1hLnN0cmluZyh7XG4gICAgICAgICAgZGVmYXVsdFZhbHVlOiBKV1RfREVGQVVMVF9FWFRSQV9TVE9SQUdFX09QVElPTlMuY29va2llUHJlZml4LFxuICAgICAgICAgIG1pbkxlbmd0aDogMixcbiAgICAgICAgfSksXG4gICAgICAgIGFkZGl0aW9uYWxfY29va2llczogc2NoZW1hLm51bWJlcih7XG4gICAgICAgICAgbWluOiAxLFxuICAgICAgICAgIGRlZmF1bHRWYWx1ZTogSldUX0RFRkFVTFRfRVhUUkFfU1RPUkFHRV9PUFRJT05TLmFkZGl0aW9uYWxDb29raWVzLFxuICAgICAgICB9KSxcbiAgICAgIH0pLFxuICAgIH0pXG4gICksXG4gIHVpOiBzY2hlbWEub2JqZWN0KHtcbiAgICBiYXNpY2F1dGg6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgLy8gdGhlIGxvZ2luIGNvbmZpZyBoZXJlIGlzIHRoZSBzYW1lIGFzIG9sZCBjb25maWcgYF9zZWN1cml0eS5iYXNpY2F1dGgubG9naW5gXG4gICAgICAvLyBTaW5jZSB3ZSBhcmUgbm93IHJlbmRlcmluZyBsb2dpbiBwYWdlIHRvIGJyb3dzZXIgYXBwLCBzbyBtb3ZlIHRoZXNlIGNvbmZpZyB0byBicm93c2VyIHNpZGUuXG4gICAgICBsb2dpbjogc2NoZW1hLm9iamVjdCh7XG4gICAgICAgIHRpdGxlOiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnJyB9KSxcbiAgICAgICAgc3VidGl0bGU6IHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICcnIH0pLFxuICAgICAgICBzaG93YnJhbmRpbWFnZTogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IHRydWUgfSksXG4gICAgICAgIGJyYW5kaW1hZ2U6IHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICcnIH0pLFxuICAgICAgICBidXR0b25zdHlsZTogc2NoZW1hLnN0cmluZyh7IGRlZmF1bHRWYWx1ZTogJycgfSksXG4gICAgICB9KSxcbiAgICB9KSxcbiAgICBhbm9ueW1vdXM6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgbG9naW46IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICBidXR0b25uYW1lOiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnTG9nIGluIGFzIGFub255bW91cycgfSksXG4gICAgICAgIHNob3dicmFuZGltYWdlOiBzY2hlbWEuYm9vbGVhbih7IGRlZmF1bHRWYWx1ZTogZmFsc2UgfSksXG4gICAgICAgIGJyYW5kaW1hZ2U6IHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICcnIH0pLFxuICAgICAgICBidXR0b25zdHlsZTogc2NoZW1hLnN0cmluZyh7IGRlZmF1bHRWYWx1ZTogJycgfSksXG4gICAgICB9KSxcbiAgICB9KSxcbiAgICBvcGVuaWQ6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgbG9naW46IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICBidXR0b25uYW1lOiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnTG9nIGluIHdpdGggc2luZ2xlIHNpZ24tb24nIH0pLFxuICAgICAgICBzaG93YnJhbmRpbWFnZTogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IGZhbHNlIH0pLFxuICAgICAgICBicmFuZGltYWdlOiBzY2hlbWEuc3RyaW5nKHsgZGVmYXVsdFZhbHVlOiAnJyB9KSxcbiAgICAgICAgYnV0dG9uc3R5bGU6IHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICcnIH0pLFxuICAgICAgfSksXG4gICAgfSksXG4gICAgc2FtbDogc2NoZW1hLm9iamVjdCh7XG4gICAgICBsb2dpbjogc2NoZW1hLm9iamVjdCh7XG4gICAgICAgIGJ1dHRvbm5hbWU6IHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICdMb2cgaW4gd2l0aCBzaW5nbGUgc2lnbi1vbicgfSksXG4gICAgICAgIHNob3dicmFuZGltYWdlOiBzY2hlbWEuYm9vbGVhbih7IGRlZmF1bHRWYWx1ZTogZmFsc2UgfSksXG4gICAgICAgIGJyYW5kaW1hZ2U6IHNjaGVtYS5zdHJpbmcoeyBkZWZhdWx0VmFsdWU6ICcnIH0pLFxuICAgICAgICBidXR0b25zdHlsZTogc2NoZW1hLnN0cmluZyh7IGRlZmF1bHRWYWx1ZTogJycgfSksXG4gICAgICB9KSxcbiAgICB9KSxcbiAgICBhdXRvbG9nb3V0OiBzY2hlbWEuYm9vbGVhbih7IGRlZmF1bHRWYWx1ZTogdHJ1ZSB9KSxcbiAgICBiYWNrZW5kX2NvbmZpZ3VyYWJsZTogc2NoZW1hLmJvb2xlYW4oeyBkZWZhdWx0VmFsdWU6IHRydWUgfSksXG4gIH0pLFxufSk7XG5cbmV4cG9ydCB0eXBlIFNlY3VyaXR5UGx1Z2luQ29uZmlnVHlwZSA9IFR5cGVPZjx0eXBlb2YgY29uZmlnU2NoZW1hPjtcblxuZXhwb3J0IGNvbnN0IGNvbmZpZzogUGx1Z2luQ29uZmlnRGVzY3JpcHRvcjxTZWN1cml0eVBsdWdpbkNvbmZpZ1R5cGU+ID0ge1xuICBleHBvc2VUb0Jyb3dzZXI6IHtcbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIGF1dGg6IHRydWUsXG4gICAgdWk6IHRydWUsXG4gICAgbXVsdGl0ZW5hbmN5OiB0cnVlLFxuICAgIHJlYWRvbmx5X21vZGU6IHRydWUsXG4gICAgY2x1c3RlclBlcm1pc3Npb25zOiB0cnVlLFxuICAgIGluZGV4UGVybWlzc2lvbnM6IHRydWUsXG4gICAgZGlzYWJsZWRUcmFuc3BvcnRDYXRlZ29yaWVzOiB0cnVlLFxuICAgIGRpc2FibGVkUmVzdENhdGVnb3JpZXM6IHRydWUsXG4gIH0sXG4gIHNjaGVtYTogY29uZmlnU2NoZW1hLFxuICBkZXByZWNhdGlvbnM6ICh7IHJlbmFtZSwgdW51c2VkIH0pID0+IFtcbiAgICByZW5hbWUoJ2Jhc2ljYXV0aC5sb2dpbi50aXRsZScsICd1aS5iYXNpY2F1dGgubG9naW4udGl0bGUnKSxcbiAgICByZW5hbWUoJ2Jhc2ljYXV0aC5sb2dpbi5zdWJ0aXRsZScsICd1aS5iYXNpY2F1dGgubG9naW4uc3VidGl0bGUnKSxcbiAgICByZW5hbWUoJ2Jhc2ljYXV0aC5sb2dpbi5zaG93YnJhbmRpbWFnZScsICd1aS5iYXNpY2F1dGgubG9naW4uc2hvd2JyYW5kaW1hZ2UnKSxcbiAgICByZW5hbWUoJ2Jhc2ljYXV0aC5sb2dpbi5icmFuZGltYWdlJywgJ3VpLmJhc2ljYXV0aC5sb2dpbi5icmFuZGltYWdlJyksXG4gICAgcmVuYW1lKCdiYXNpY2F1dGgubG9naW4uYnV0dG9uc3R5bGUnLCAndWkuYmFzaWNhdXRoLmxvZ2luLmJ1dHRvbnN0eWxlJyksXG4gIF0sXG59O1xuXG4vLyAgVGhpcyBleHBvcnRzIHN0YXRpYyBjb2RlIGFuZCBUeXBlU2NyaXB0IHR5cGVzLFxuLy8gIGFzIHdlbGwgYXMsIE9wZW5TZWFyY2hEYXNoYm9hcmRzIFBsYXRmb3JtIGBwbHVnaW4oKWAgaW5pdGlhbGl6ZXIuXG5cbmV4cG9ydCBmdW5jdGlvbiBwbHVnaW4oaW5pdGlhbGl6ZXJDb250ZXh0OiBQbHVnaW5Jbml0aWFsaXplckNvbnRleHQpIHtcbiAgcmV0dXJuIG5ldyBTZWN1cml0eVBsdWdpbihpbml0aWFsaXplckNvbnRleHQpO1xufVxuXG5leHBvcnQgeyBTZWN1cml0eVBsdWdpblNldHVwLCBTZWN1cml0eVBsdWdpblN0YXJ0IH0gZnJvbSAnLi90eXBlcyc7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7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