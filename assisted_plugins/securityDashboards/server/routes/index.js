"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineRoutes = defineRoutes;
var _configSchema = require("@osd/config-schema");
var _common = require("../../common");
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

// TODO: consider to extract entity CRUD operations and put it into a client class
function defineRoutes(router) {
  const internalUserSchema = _configSchema.schema.object({
    description: _configSchema.schema.maybe(_configSchema.schema.string()),
    password: _configSchema.schema.maybe(_configSchema.schema.string()),
    backend_roles: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    }),
    attributes: _configSchema.schema.any({
      defaultValue: {}
    })
  });
  const actionGroupSchema = _configSchema.schema.object({
    description: _configSchema.schema.maybe(_configSchema.schema.string()),
    allowed_actions: _configSchema.schema.arrayOf(_configSchema.schema.string())
    // type field is not supported in legacy implementation, comment it out for now.
    // type: schema.oneOf([
    //   schema.literal('cluster'),
    //   schema.literal('index'),
    //   schema.literal('opensearch_dashboards'),
    // ]),
  });

  const roleMappingSchema = _configSchema.schema.object({
    description: _configSchema.schema.maybe(_configSchema.schema.string()),
    backend_roles: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    }),
    hosts: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    }),
    users: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    })
  });
  const roleSchema = _configSchema.schema.object({
    description: _configSchema.schema.maybe(_configSchema.schema.string()),
    cluster_permissions: _configSchema.schema.arrayOf(_configSchema.schema.string(), {
      defaultValue: []
    }),
    tenant_permissions: _configSchema.schema.arrayOf(_configSchema.schema.any(), {
      defaultValue: []
    }),
    index_permissions: _configSchema.schema.arrayOf(_configSchema.schema.any(), {
      defaultValue: []
    })
  });
  const tenantSchema = _configSchema.schema.object({
    description: _configSchema.schema.string()
  });
  const accountSchema = _configSchema.schema.object({
    password: _configSchema.schema.string(),
    current_password: _configSchema.schema.string()
  });
  const schemaMap = {
    internalusers: internalUserSchema,
    actiongroups: actionGroupSchema,
    rolesmapping: roleMappingSchema,
    roles: roleSchema,
    tenants: tenantSchema,
    account: accountSchema
  };
  function validateRequestBody(resourceName, requestBody) {
    const inputSchema = schemaMap[resourceName];
    if (!inputSchema) {
      throw new Error(`Unknown resource ${resourceName}`);
    }
    inputSchema.validate(requestBody); // throws error if validation fail
  }

  function validateEntityId(resourceName) {
    if (!(0, _common.isValidResourceName)(resourceName)) {
      return 'Invalid entity name or id.';
    }
  }

  /**
   * Lists resources by resource name.
   *
   * The response format is:
   * {
   *   "total": <total_entity_count>,
   *   "data": {
   *     "entity_id_1": { <entity_structure> },
   *     "entity_id_2": { <entity_structure> },
   *     ...
   *   }
   * }
   *
   * e.g. when listing internal users, response may look like:
   * {
   *   "total": 2,
   *   "data": {
   *     "api_test_user2": {
   *       "hash": "",
   *       "reserved": false,
   *       "hidden": false,
   *       "backend_roles": [],
   *       "attributes": {},
   *       "description": "",
   *       "static": false
   *     },
   *     "api_test_user1": {
   *       "hash": "",
   *       "reserved": false,
   *       "hidden": false,
   *       "backend_roles": [],
   *       "attributes": {},
   *       "static": false
   *     }
   * }
   *
   * when listing action groups, response will look like:
   * {
   *   "total": 2,
   *   "data": {
   *     "read": {
   *       "reserved": true,
   *       "hidden": false,
   *       "allowed_actions": ["indices:data/read*", "indices:admin/mappings/fields/get*"],
   *       "type": "index",
   *       "description": "Allow all read operations",
   *       "static": false
   *     },
   *     "cluster_all": {
   *       "reserved": true,
   *       "hidden": false,
   *       "allowed_actions": ["cluster:*"],
   *       "type": "cluster",
   *       "description": "Allow everything on cluster level",
   *       "static": false
   *     }
   * }
   *
   * role:
   * {
   *   "total": 2,
   *   "data": {
   *     "opensearch_dashboards_user": {
   *       "reserved": true,
   *       "hidden": false,
   *       "description": "Provide the minimum permissions for a opensearch_dashboards user",
   *       "cluster_permissions": ["cluster_composite_ops"],
   *       "index_permissions": [{
   *         "index_patterns": [".opensearch_dashboards", ".opensearch_dashboards-6", ".opensearch_dashboards_*"],
   *         "fls": [],
   *         "masked_fields": [],
   *         "allowed_actions": ["read", "delete", "manage", "index"]
   *       }, {
   *         "index_patterns": [".tasks", ".management-beats"],
   *         "fls": [],
   *         "masked_fields": [],
   *         "allowed_actions": ["indices_all"]
   *       }],
   *       "tenant_permissions": [],
   *       "static": false
   *     },
   *     "all_access": {
   *       "reserved": true,
   *       "hidden": false,
   *       "description": "Allow full access to all indices and all cluster APIs",
   *       "cluster_permissions": ["*"],
   *       "index_permissions": [{
   *         "index_patterns": ["*"],
   *         "fls": [],
   *         "masked_fields": [],
   *         "allowed_actions": ["*"]
   *       }],
   *       "tenant_permissions": [{
   *         "tenant_patterns": ["*"],
   *         "allowed_actions": ["opensearch_dashboards_all_write"]
   *       }],
   *       "static": false
   *     }
   *   }
   * }
   *
   * rolesmapping:
   * {
   *   "total": 2,
   *   "data": {
   *     "security_manager": {
   *       "reserved": false,
   *       "hidden": false,
   *       "backend_roles": [],
   *       "hosts": [],
   *       "users": ["zengyan", "admin"],
   *       "and_backend_roles": []
   *     },
   *     "all_access": {
   *       "reserved": false,
   *       "hidden": false,
   *       "backend_roles": [],
   *       "hosts": [],
   *       "users": ["zengyan", "admin", "indextest"],
   *       "and_backend_roles": []
   *     }
   *   }
   * }
   *
   * tenants:
   * {
   *   "total": 2,
   *   "data": {
   *     "global_tenant": {
   *       "reserved": true,
   *       "hidden": false,
   *       "description": "Global tenant",
   *       "static": false
   *     },
   *     "test tenant": {
   *       "reserved": false,
   *       "hidden": false,
   *       "description": "tenant description",
   *       "static": false
   *     }
   *   }
   * }
   */
  router.get({
    path: `${_common.API_PREFIX}/${_common.CONFIGURATION_API_PREFIX}/{resourceName}`,
    validate: {
      params: _configSchema.schema.object({
        resourceName: _configSchema.schema.string()
      })
    }
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);
    let esResp;
    try {
      esResp = await client.callAsCurrentUser('opensearch_security.listResource', {
        resourceName: request.params.resourceName
      });
      return response.ok({
        body: {
          total: Object.keys(esResp).length,
          data: esResp
        }
      });
    } catch (error) {
      console.log(JSON.stringify(error));
      return errorResponse(response, error);
    }
  });

  /**
   * Gets entity by id.
   *
   * the response format differs from different resource types. e.g.
   *
   * for internal user, response will look like:
   * {
   *   "hash": "",
   *   "reserved": false,
   *   "hidden": false,
   *   "backend_roles": [],
   *   "attributes": {},
   *   "static": false
   * }
   *
   * for role, response will look like:
   * {
   *   "reserved": true,
   *   "hidden": false,
   *   "description": "Allow full access to all indices and all cluster APIs",
   *   "cluster_permissions": ["*"],
   *   "index_permissions": [{
   *     "index_patterns": ["*"],
   *     "fls": [],
   *     "masked_fields": [],
   *     "allowed_actions": ["*"]
   *   }],
   *   "tenant_permissions": [{
   *     "tenant_patterns": ["*"],
   *     "allowed_actions": ["opensearch_dashboards_all_write"]
   *   }],
   *   "static": false
   * }
   *
   * for roles mapping, response will look like:
   * {
   *   "reserved": true,
   *   "hidden": false,
   *   "description": "Allow full access to all indices and all cluster APIs",
   *   "cluster_permissions": ["*"],
   *   "index_permissions": [{
   *     "index_patterns": ["*"],
   *     "fls": [],
   *     "masked_fields": [],
   *     "allowed_actions": ["*"]
   *   }],
   *   "tenant_permissions": [{
   *     "tenant_patterns": ["*"],
   *     "allowed_actions": ["opensearch_dashboards_all_write"]
   *   }],
   *   "static": false
   * }
   *
   * for action groups, response will look like:
   * {
   *   "reserved": true,
   *   "hidden": false,
   *   "allowed_actions": ["indices:data/read*", "indices:admin/mappings/fields/get*"],
   *   "type": "index",
   *   "description": "Allow all read operations",
   *   "static": false
   * }
   *
   * for tenant, response will look like:
   * {
   *   "reserved": true,
   *   "hidden": false,
   *   "description": "Global tenant",
   *   "static": false
   * },
   */
  router.get({
    path: `${_common.API_PREFIX}/${_common.CONFIGURATION_API_PREFIX}/{resourceName}/{id}`,
    validate: {
      params: _configSchema.schema.object({
        resourceName: _configSchema.schema.string(),
        id: _configSchema.schema.string()
      })
    }
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);
    let esResp;
    try {
      esResp = await client.callAsCurrentUser('opensearch_security.getResource', {
        resourceName: request.params.resourceName,
        id: request.params.id
      });
      return response.ok({
        body: esResp[request.params.id]
      });
    } catch (error) {
      return errorResponse(response, error);
    }
  });

  /**
   * Deletes an entity by id.
   */
  router.delete({
    path: `${_common.API_PREFIX}/${_common.CONFIGURATION_API_PREFIX}/{resourceName}/{id}`,
    validate: {
      params: _configSchema.schema.object({
        resourceName: _configSchema.schema.string(),
        id: _configSchema.schema.string({
          minLength: 1
        })
      })
    }
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);
    let esResp;
    try {
      esResp = await client.callAsCurrentUser('opensearch_security.deleteResource', {
        resourceName: request.params.resourceName,
        id: request.params.id
      });
      return response.ok({
        body: {
          message: esResp.message
        }
      });
    } catch (error) {
      return errorResponse(response, error);
    }
  });

  /**
   * Update object with out Id. Resource identification is expected to computed from headers. Eg: auth headers
   *
   * Request sample:
   * /configuration/account
   * {
   *   "password": "new-password",
   *   "current_password": "old-password"
   * }
   */
  router.post({
    path: `${_common.API_PREFIX}/${_common.CONFIGURATION_API_PREFIX}/{resourceName}`,
    validate: {
      params: _configSchema.schema.object({
        resourceName: _configSchema.schema.string()
      }),
      body: _configSchema.schema.any()
    }
  }, async (context, request, response) => {
    try {
      validateRequestBody(request.params.resourceName, request.body);
    } catch (error) {
      return response.badRequest({
        body: error
      });
    }
    const client = context.security_plugin.esClient.asScoped(request);
    let esResp;
    try {
      esResp = await client.callAsCurrentUser('opensearch_security.saveResourceWithoutId', {
        resourceName: request.params.resourceName,
        body: request.body
      });
      return response.ok({
        body: {
          message: esResp.message
        }
      });
    } catch (error) {
      return errorResponse(response, error);
    }
  });

  /**
   * Update entity by Id.
   */
  router.post({
    path: `${_common.API_PREFIX}/${_common.CONFIGURATION_API_PREFIX}/{resourceName}/{id}`,
    validate: {
      params: _configSchema.schema.object({
        resourceName: _configSchema.schema.string(),
        id: _configSchema.schema.string({
          validate: validateEntityId
        })
      }),
      body: _configSchema.schema.any()
    }
  }, async (context, request, response) => {
    try {
      validateRequestBody(request.params.resourceName, request.body);
    } catch (error) {
      return response.badRequest({
        body: error
      });
    }
    const client = context.security_plugin.esClient.asScoped(request);
    let esResp;
    try {
      esResp = await client.callAsCurrentUser('opensearch_security.saveResource', {
        resourceName: request.params.resourceName,
        id: request.params.id,
        body: request.body
      });
      return response.ok({
        body: {
          message: esResp.message
        }
      });
    } catch (error) {
      return errorResponse(response, error);
    }
  });

  /**
   * Gets authentication info of the user.
   *
   * The response looks like:
   * {
   *   "user": "User [name=admin, roles=[], requestedTenant=__user__]",
   *   "user_name": "admin",
   *   "user_requested_tenant": "__user__",
   *   "remote_address": "127.0.0.1:35044",
   *   "backend_roles": [],
   *   "custom_attribute_names": [],
   *   "roles": ["all_access", "security_manager"],
   *   "tenants": {
   *     "another_tenant": true,
   *     "admin": true,
   *     "global_tenant": true,
   *     "aaaaa": true,
   *     "test tenant": true
   *   },
   *   "principal": null,
   *   "peer_certificates": "0",
   *   "sso_logout_url": null
   * }
   */
  router.get({
    path: `${_common.API_PREFIX}/auth/authinfo`,
    validate: false
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);
    let esResp;
    try {
      esResp = await client.callAsCurrentUser('opensearch_security.authinfo');
      return response.ok({
        body: esResp
      });
    } catch (error) {
      return errorResponse(response, error);
    }
  });
  router.get({
    path: `${_common.API_PREFIX}/auth/dashboardsinfo`,
    validate: false
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);
    let esResp;
    try {
      esResp = await client.callAsCurrentUser('opensearch_security.dashboardsinfo');
      return response.ok({
        body: esResp
      });
    } catch (error) {
      return errorResponse(response, error);
    }
  });

  /**
   * Gets audit log configuration。
   *
   * Sample payload:
   * {
   *   "enabled":true,
   *   "audit":{
   *     "enable_rest":false,
   *     "disabled_rest_categories":[
   *       "FAILED_LOGIN",
   *       "AUTHENTICATED"
   *     ],
   *     "enable_transport":true,
   *     "disabled_transport_categories":[
   *       "GRANTED_PRIVILEGES"
   *     ],
   *     "resolve_bulk_requests":true,
   *     "log_request_body":false,
   *     "resolve_indices":true,
   *     "exclude_sensitive_headers":true,
   *     "ignore_users":[
   *       "admin",
   *     ],
   *     "ignore_requests":[
   *       "SearchRequest",
   *       "indices:data/read/*"
   *     ]
   *   },
   *   "compliance":{
   *     "enabled":true,
   *     "internal_config":false,
   *     "external_config":false,
   *     "read_metadata_only":false,
   *     "read_watched_fields":{
   *       "indexName1":[
   *         "field1",
   *         "fields-*"
   *       ]
   *     },
   *     "read_ignore_users":[
   *       "opensearchdashboardsserver",
   *       "operator/*"
   *     ],
   *     "write_metadata_only":false,
   *     "write_log_diffs":false,
   *     "write_watched_indices":[
   *       "indexName2",
   *       "indexPatterns-*"
   *     ],
   *     "write_ignore_users":[
   *       "admin"
   *     ]
   *   }
   * }
   */
  router.get({
    path: `${_common.API_PREFIX}/configuration/audit`,
    validate: false
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);
    let esResp;
    try {
      esResp = await client.callAsCurrentUser('opensearch_security.getAudit');
      return response.ok({
        body: esResp
      });
    } catch (error) {
      return response.custom({
        statusCode: error.statusCode,
        body: parseEsErrorResponse(error)
      });
    }
  });

  /**
   * Update audit log configuration。
   *
   * Sample payload:
   * {
   *   "enabled":true,
   *   "audit":{
   *     "enable_rest":false,
   *     "disabled_rest_categories":[
   *       "FAILED_LOGIN",
   *       "AUTHENTICATED"
   *     ],
   *     "enable_transport":true,
   *     "disabled_transport_categories":[
   *       "GRANTED_PRIVILEGES"
   *     ],
   *     "resolve_bulk_requests":true,
   *     "log_request_body":false,
   *     "resolve_indices":true,
   *     "exclude_sensitive_headers":true,
   *     "ignore_users":[
   *       "admin",
   *     ],
   *     "ignore_requests":[
   *       "SearchRequest",
   *       "indices:data/read/*"
   *     ]
   *   },
   *   "compliance":{
   *     "enabled":true,
   *     "internal_config":false,
   *     "external_config":false,
   *     "read_metadata_only":false,
   *     "read_watched_fields":{
   *       "indexName1":[
   *         "field1",
   *         "fields-*"
   *       ]
   *     },
   *     "read_ignore_users":[
   *       "kibanaserver",
   *       "operator/*"
   *     ],
   *     "write_metadata_only":false,
   *     "write_log_diffs":false,
   *     "write_watched_indices":[
   *       "indexName2",
   *       "indexPatterns-*"
   *     ],
   *     "write_ignore_users":[
   *       "admin"
   *     ]
   *   }
   * }
   */
  router.post({
    path: `${_common.API_PREFIX}/configuration/audit/config`,
    validate: {
      body: _configSchema.schema.any()
    }
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);
    let esResp;
    try {
      esResp = await client.callAsCurrentUser('opensearch_security.saveAudit', {
        body: request.body
      });
      return response.ok({
        body: {
          message: esResp.message
        }
      });
    } catch (error) {
      return errorResponse(response, error);
    }
  });

  /**
   * Deletes cache.
   *
   * Sample response: {"message":"Cache flushed successfully."}
   */
  router.delete({
    path: `${_common.API_PREFIX}/configuration/cache`,
    validate: false
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);
    let esResponse;
    try {
      esResponse = await client.callAsCurrentUser('opensearch_security.clearCache');
      return response.ok({
        body: {
          message: esResponse.message
        }
      });
    } catch (error) {
      return errorResponse(response, error);
    }
  });

  /**
   * Gets permission info of current user.
   *
   * Sample response:
   * {
   *   "user": "User [name=admin, roles=[], requestedTenant=__user__]",
   *   "user_name": "admin",
   *   "has_api_access": true,
   *   "disabled_endpoints": {}
   * }
   */
  router.get({
    path: `${_common.API_PREFIX}/restapiinfo`,
    validate: false
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);
    try {
      const esResponse = await client.callAsCurrentUser('opensearch_security.restapiinfo');
      return response.ok({
        body: esResponse
      });
    } catch (error) {
      return response.badRequest({
        body: error
      });
    }
  });

  /**
   * Validates DLS (document level security) query.
   *
   * Request payload is an ES query.
   */
  router.post({
    path: `${_common.API_PREFIX}/${_common.CONFIGURATION_API_PREFIX}/validatedls/{indexName}`,
    validate: {
      params: _configSchema.schema.object({
        // in legacy plugin implmentation, indexName is not used when calling ES API.
        indexName: _configSchema.schema.maybe(_configSchema.schema.string())
      }),
      body: _configSchema.schema.any()
    }
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);
    try {
      const esResponse = await client.callAsCurrentUser('opensearch_security.validateDls', {
        body: request.body
      });
      return response.ok({
        body: esResponse
      });
    } catch (error) {
      return errorResponse(response, error);
    }
  });

  /**
   * Gets index mapping.
   *
   * Calling ES _mapping API under the hood. see
   * https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-get-mapping.html
   */
  router.post({
    path: `${_common.API_PREFIX}/${_common.CONFIGURATION_API_PREFIX}/index_mappings`,
    validate: {
      body: _configSchema.schema.object({
        index: _configSchema.schema.arrayOf(_configSchema.schema.string())
      })
    }
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);
    try {
      const esResponse = await client.callAsCurrentUser('opensearch_security.getIndexMappings', {
        index: request.body.index.join(','),
        ignore_unavailable: true,
        allow_no_indices: true
      });
      return response.ok({
        body: esResponse
      });
    } catch (error) {
      return errorResponse(response, error);
    }
  });

  /**
   * Gets all indices, and field mappings.
   *
   * Calls ES API '/_all/_mapping/field/*' under the hood. see
   * https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-get-mapping.html
   */
  router.get({
    path: `${_common.API_PREFIX}/${_common.CONFIGURATION_API_PREFIX}/indices`,
    validate: false
  }, async (context, request, response) => {
    const client = context.security_plugin.esClient.asScoped(request);
    try {
      const esResponse = await client.callAsCurrentUser('opensearch_security.indices');
      return response.ok({
        body: esResponse
      });
    } catch (error) {
      return errorResponse(response, error);
    }
  });
}
function parseEsErrorResponse(error) {
  if (error.response) {
    try {
      const esErrorResponse = JSON.parse(error.response);
      return esErrorResponse.reason || error.response;
    } catch (parsingError) {
      return error.response;
    }
  }
  return error.message;
}
function errorResponse(response, error) {
  return response.custom({
    statusCode: error.statusCode,
    body: parseEsErrorResponse(error)
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY29uZmlnU2NoZW1hIiwicmVxdWlyZSIsIl9jb21tb24iLCJkZWZpbmVSb3V0ZXMiLCJyb3V0ZXIiLCJpbnRlcm5hbFVzZXJTY2hlbWEiLCJzY2hlbWEiLCJvYmplY3QiLCJkZXNjcmlwdGlvbiIsIm1heWJlIiwic3RyaW5nIiwicGFzc3dvcmQiLCJiYWNrZW5kX3JvbGVzIiwiYXJyYXlPZiIsImRlZmF1bHRWYWx1ZSIsImF0dHJpYnV0ZXMiLCJhbnkiLCJhY3Rpb25Hcm91cFNjaGVtYSIsImFsbG93ZWRfYWN0aW9ucyIsInJvbGVNYXBwaW5nU2NoZW1hIiwiaG9zdHMiLCJ1c2VycyIsInJvbGVTY2hlbWEiLCJjbHVzdGVyX3Blcm1pc3Npb25zIiwidGVuYW50X3Blcm1pc3Npb25zIiwiaW5kZXhfcGVybWlzc2lvbnMiLCJ0ZW5hbnRTY2hlbWEiLCJhY2NvdW50U2NoZW1hIiwiY3VycmVudF9wYXNzd29yZCIsInNjaGVtYU1hcCIsImludGVybmFsdXNlcnMiLCJhY3Rpb25ncm91cHMiLCJyb2xlc21hcHBpbmciLCJyb2xlcyIsInRlbmFudHMiLCJhY2NvdW50IiwidmFsaWRhdGVSZXF1ZXN0Qm9keSIsInJlc291cmNlTmFtZSIsInJlcXVlc3RCb2R5IiwiaW5wdXRTY2hlbWEiLCJFcnJvciIsInZhbGlkYXRlIiwidmFsaWRhdGVFbnRpdHlJZCIsImlzVmFsaWRSZXNvdXJjZU5hbWUiLCJnZXQiLCJwYXRoIiwiQVBJX1BSRUZJWCIsIkNPTkZJR1VSQVRJT05fQVBJX1BSRUZJWCIsInBhcmFtcyIsImNvbnRleHQiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJjbGllbnQiLCJzZWN1cml0eV9wbHVnaW4iLCJlc0NsaWVudCIsImFzU2NvcGVkIiwiZXNSZXNwIiwiY2FsbEFzQ3VycmVudFVzZXIiLCJvayIsImJvZHkiLCJ0b3RhbCIsIk9iamVjdCIsImtleXMiLCJsZW5ndGgiLCJkYXRhIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiSlNPTiIsInN0cmluZ2lmeSIsImVycm9yUmVzcG9uc2UiLCJpZCIsImRlbGV0ZSIsIm1pbkxlbmd0aCIsIm1lc3NhZ2UiLCJwb3N0IiwiYmFkUmVxdWVzdCIsImN1c3RvbSIsInN0YXR1c0NvZGUiLCJwYXJzZUVzRXJyb3JSZXNwb25zZSIsImVzUmVzcG9uc2UiLCJpbmRleE5hbWUiLCJpbmRleCIsImpvaW4iLCJpZ25vcmVfdW5hdmFpbGFibGUiLCJhbGxvd19ub19pbmRpY2VzIiwiZXNFcnJvclJlc3BvbnNlIiwicGFyc2UiLCJyZWFzb24iLCJwYXJzaW5nRXJyb3IiXSwic291cmNlcyI6WyJpbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogICBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqXG4gKiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIikuXG4gKiAgIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICAgQSBjb3B5IG9mIHRoZSBMaWNlbnNlIGlzIGxvY2F0ZWQgYXRcbiAqXG4gKiAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgIG9yIGluIHRoZSBcImxpY2Vuc2VcIiBmaWxlIGFjY29tcGFueWluZyB0aGlzIGZpbGUuIFRoaXMgZmlsZSBpcyBkaXN0cmlidXRlZFxuICogICBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqICAgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmdcbiAqICAgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IHNjaGVtYSB9IGZyb20gJ0Bvc2QvY29uZmlnLXNjaGVtYSc7XG5pbXBvcnQge1xuICBJUm91dGVyLFxuICBSZXNwb25zZUVycm9yLFxuICBJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZSxcbiAgT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG59IGZyb20gJ29wZW5zZWFyY2gtZGFzaGJvYXJkcy9zZXJ2ZXInO1xuaW1wb3J0IHsgQVBJX1BSRUZJWCwgQ09ORklHVVJBVElPTl9BUElfUFJFRklYLCBpc1ZhbGlkUmVzb3VyY2VOYW1lIH0gZnJvbSAnLi4vLi4vY29tbW9uJztcblxuLy8gVE9ETzogY29uc2lkZXIgdG8gZXh0cmFjdCBlbnRpdHkgQ1JVRCBvcGVyYXRpb25zIGFuZCBwdXQgaXQgaW50byBhIGNsaWVudCBjbGFzc1xuZXhwb3J0IGZ1bmN0aW9uIGRlZmluZVJvdXRlcyhyb3V0ZXI6IElSb3V0ZXIpIHtcbiAgY29uc3QgaW50ZXJuYWxVc2VyU2NoZW1hID0gc2NoZW1hLm9iamVjdCh7XG4gICAgZGVzY3JpcHRpb246IHNjaGVtYS5tYXliZShzY2hlbWEuc3RyaW5nKCkpLFxuICAgIHBhc3N3b3JkOiBzY2hlbWEubWF5YmUoc2NoZW1hLnN0cmluZygpKSxcbiAgICBiYWNrZW5kX3JvbGVzOiBzY2hlbWEuYXJyYXlPZihzY2hlbWEuc3RyaW5nKCksIHsgZGVmYXVsdFZhbHVlOiBbXSB9KSxcbiAgICBhdHRyaWJ1dGVzOiBzY2hlbWEuYW55KHsgZGVmYXVsdFZhbHVlOiB7fSB9KSxcbiAgfSk7XG5cbiAgY29uc3QgYWN0aW9uR3JvdXBTY2hlbWEgPSBzY2hlbWEub2JqZWN0KHtcbiAgICBkZXNjcmlwdGlvbjogc2NoZW1hLm1heWJlKHNjaGVtYS5zdHJpbmcoKSksXG4gICAgYWxsb3dlZF9hY3Rpb25zOiBzY2hlbWEuYXJyYXlPZihzY2hlbWEuc3RyaW5nKCkpLFxuICAgIC8vIHR5cGUgZmllbGQgaXMgbm90IHN1cHBvcnRlZCBpbiBsZWdhY3kgaW1wbGVtZW50YXRpb24sIGNvbW1lbnQgaXQgb3V0IGZvciBub3cuXG4gICAgLy8gdHlwZTogc2NoZW1hLm9uZU9mKFtcbiAgICAvLyAgIHNjaGVtYS5saXRlcmFsKCdjbHVzdGVyJyksXG4gICAgLy8gICBzY2hlbWEubGl0ZXJhbCgnaW5kZXgnKSxcbiAgICAvLyAgIHNjaGVtYS5saXRlcmFsKCdvcGVuc2VhcmNoX2Rhc2hib2FyZHMnKSxcbiAgICAvLyBdKSxcbiAgfSk7XG5cbiAgY29uc3Qgcm9sZU1hcHBpbmdTY2hlbWEgPSBzY2hlbWEub2JqZWN0KHtcbiAgICBkZXNjcmlwdGlvbjogc2NoZW1hLm1heWJlKHNjaGVtYS5zdHJpbmcoKSksXG4gICAgYmFja2VuZF9yb2xlczogc2NoZW1hLmFycmF5T2Yoc2NoZW1hLnN0cmluZygpLCB7IGRlZmF1bHRWYWx1ZTogW10gfSksXG4gICAgaG9zdHM6IHNjaGVtYS5hcnJheU9mKHNjaGVtYS5zdHJpbmcoKSwgeyBkZWZhdWx0VmFsdWU6IFtdIH0pLFxuICAgIHVzZXJzOiBzY2hlbWEuYXJyYXlPZihzY2hlbWEuc3RyaW5nKCksIHsgZGVmYXVsdFZhbHVlOiBbXSB9KSxcbiAgfSk7XG5cbiAgY29uc3Qgcm9sZVNjaGVtYSA9IHNjaGVtYS5vYmplY3Qoe1xuICAgIGRlc2NyaXB0aW9uOiBzY2hlbWEubWF5YmUoc2NoZW1hLnN0cmluZygpKSxcbiAgICBjbHVzdGVyX3Blcm1pc3Npb25zOiBzY2hlbWEuYXJyYXlPZihzY2hlbWEuc3RyaW5nKCksIHsgZGVmYXVsdFZhbHVlOiBbXSB9KSxcbiAgICB0ZW5hbnRfcGVybWlzc2lvbnM6IHNjaGVtYS5hcnJheU9mKHNjaGVtYS5hbnkoKSwgeyBkZWZhdWx0VmFsdWU6IFtdIH0pLFxuICAgIGluZGV4X3Blcm1pc3Npb25zOiBzY2hlbWEuYXJyYXlPZihzY2hlbWEuYW55KCksIHsgZGVmYXVsdFZhbHVlOiBbXSB9KSxcbiAgfSk7XG5cbiAgY29uc3QgdGVuYW50U2NoZW1hID0gc2NoZW1hLm9iamVjdCh7XG4gICAgZGVzY3JpcHRpb246IHNjaGVtYS5zdHJpbmcoKSxcbiAgfSk7XG5cbiAgY29uc3QgYWNjb3VudFNjaGVtYSA9IHNjaGVtYS5vYmplY3Qoe1xuICAgIHBhc3N3b3JkOiBzY2hlbWEuc3RyaW5nKCksXG4gICAgY3VycmVudF9wYXNzd29yZDogc2NoZW1hLnN0cmluZygpLFxuICB9KTtcblxuICBjb25zdCBzY2hlbWFNYXA6IGFueSA9IHtcbiAgICBpbnRlcm5hbHVzZXJzOiBpbnRlcm5hbFVzZXJTY2hlbWEsXG4gICAgYWN0aW9uZ3JvdXBzOiBhY3Rpb25Hcm91cFNjaGVtYSxcbiAgICByb2xlc21hcHBpbmc6IHJvbGVNYXBwaW5nU2NoZW1hLFxuICAgIHJvbGVzOiByb2xlU2NoZW1hLFxuICAgIHRlbmFudHM6IHRlbmFudFNjaGVtYSxcbiAgICBhY2NvdW50OiBhY2NvdW50U2NoZW1hLFxuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlUmVxdWVzdEJvZHkocmVzb3VyY2VOYW1lOiBzdHJpbmcsIHJlcXVlc3RCb2R5OiBhbnkpOiBhbnkge1xuICAgIGNvbnN0IGlucHV0U2NoZW1hID0gc2NoZW1hTWFwW3Jlc291cmNlTmFtZV07XG4gICAgaWYgKCFpbnB1dFNjaGVtYSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbmtub3duIHJlc291cmNlICR7cmVzb3VyY2VOYW1lfWApO1xuICAgIH1cbiAgICBpbnB1dFNjaGVtYS52YWxpZGF0ZShyZXF1ZXN0Qm9keSk7IC8vIHRocm93cyBlcnJvciBpZiB2YWxpZGF0aW9uIGZhaWxcbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlRW50aXR5SWQocmVzb3VyY2VOYW1lOiBzdHJpbmcpIHtcbiAgICBpZiAoIWlzVmFsaWRSZXNvdXJjZU5hbWUocmVzb3VyY2VOYW1lKSkge1xuICAgICAgcmV0dXJuICdJbnZhbGlkIGVudGl0eSBuYW1lIG9yIGlkLic7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIExpc3RzIHJlc291cmNlcyBieSByZXNvdXJjZSBuYW1lLlxuICAgKlxuICAgKiBUaGUgcmVzcG9uc2UgZm9ybWF0IGlzOlxuICAgKiB7XG4gICAqICAgXCJ0b3RhbFwiOiA8dG90YWxfZW50aXR5X2NvdW50PixcbiAgICogICBcImRhdGFcIjoge1xuICAgKiAgICAgXCJlbnRpdHlfaWRfMVwiOiB7IDxlbnRpdHlfc3RydWN0dXJlPiB9LFxuICAgKiAgICAgXCJlbnRpdHlfaWRfMlwiOiB7IDxlbnRpdHlfc3RydWN0dXJlPiB9LFxuICAgKiAgICAgLi4uXG4gICAqICAgfVxuICAgKiB9XG4gICAqXG4gICAqIGUuZy4gd2hlbiBsaXN0aW5nIGludGVybmFsIHVzZXJzLCByZXNwb25zZSBtYXkgbG9vayBsaWtlOlxuICAgKiB7XG4gICAqICAgXCJ0b3RhbFwiOiAyLFxuICAgKiAgIFwiZGF0YVwiOiB7XG4gICAqICAgICBcImFwaV90ZXN0X3VzZXIyXCI6IHtcbiAgICogICAgICAgXCJoYXNoXCI6IFwiXCIsXG4gICAqICAgICAgIFwicmVzZXJ2ZWRcIjogZmFsc2UsXG4gICAqICAgICAgIFwiaGlkZGVuXCI6IGZhbHNlLFxuICAgKiAgICAgICBcImJhY2tlbmRfcm9sZXNcIjogW10sXG4gICAqICAgICAgIFwiYXR0cmlidXRlc1wiOiB7fSxcbiAgICogICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIlwiLFxuICAgKiAgICAgICBcInN0YXRpY1wiOiBmYWxzZVxuICAgKiAgICAgfSxcbiAgICogICAgIFwiYXBpX3Rlc3RfdXNlcjFcIjoge1xuICAgKiAgICAgICBcImhhc2hcIjogXCJcIixcbiAgICogICAgICAgXCJyZXNlcnZlZFwiOiBmYWxzZSxcbiAgICogICAgICAgXCJoaWRkZW5cIjogZmFsc2UsXG4gICAqICAgICAgIFwiYmFja2VuZF9yb2xlc1wiOiBbXSxcbiAgICogICAgICAgXCJhdHRyaWJ1dGVzXCI6IHt9LFxuICAgKiAgICAgICBcInN0YXRpY1wiOiBmYWxzZVxuICAgKiAgICAgfVxuICAgKiB9XG4gICAqXG4gICAqIHdoZW4gbGlzdGluZyBhY3Rpb24gZ3JvdXBzLCByZXNwb25zZSB3aWxsIGxvb2sgbGlrZTpcbiAgICoge1xuICAgKiAgIFwidG90YWxcIjogMixcbiAgICogICBcImRhdGFcIjoge1xuICAgKiAgICAgXCJyZWFkXCI6IHtcbiAgICogICAgICAgXCJyZXNlcnZlZFwiOiB0cnVlLFxuICAgKiAgICAgICBcImhpZGRlblwiOiBmYWxzZSxcbiAgICogICAgICAgXCJhbGxvd2VkX2FjdGlvbnNcIjogW1wiaW5kaWNlczpkYXRhL3JlYWQqXCIsIFwiaW5kaWNlczphZG1pbi9tYXBwaW5ncy9maWVsZHMvZ2V0KlwiXSxcbiAgICogICAgICAgXCJ0eXBlXCI6IFwiaW5kZXhcIixcbiAgICogICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIkFsbG93IGFsbCByZWFkIG9wZXJhdGlvbnNcIixcbiAgICogICAgICAgXCJzdGF0aWNcIjogZmFsc2VcbiAgICogICAgIH0sXG4gICAqICAgICBcImNsdXN0ZXJfYWxsXCI6IHtcbiAgICogICAgICAgXCJyZXNlcnZlZFwiOiB0cnVlLFxuICAgKiAgICAgICBcImhpZGRlblwiOiBmYWxzZSxcbiAgICogICAgICAgXCJhbGxvd2VkX2FjdGlvbnNcIjogW1wiY2x1c3RlcjoqXCJdLFxuICAgKiAgICAgICBcInR5cGVcIjogXCJjbHVzdGVyXCIsXG4gICAqICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJBbGxvdyBldmVyeXRoaW5nIG9uIGNsdXN0ZXIgbGV2ZWxcIixcbiAgICogICAgICAgXCJzdGF0aWNcIjogZmFsc2VcbiAgICogICAgIH1cbiAgICogfVxuICAgKlxuICAgKiByb2xlOlxuICAgKiB7XG4gICAqICAgXCJ0b3RhbFwiOiAyLFxuICAgKiAgIFwiZGF0YVwiOiB7XG4gICAqICAgICBcIm9wZW5zZWFyY2hfZGFzaGJvYXJkc191c2VyXCI6IHtcbiAgICogICAgICAgXCJyZXNlcnZlZFwiOiB0cnVlLFxuICAgKiAgICAgICBcImhpZGRlblwiOiBmYWxzZSxcbiAgICogICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIlByb3ZpZGUgdGhlIG1pbmltdW0gcGVybWlzc2lvbnMgZm9yIGEgb3BlbnNlYXJjaF9kYXNoYm9hcmRzIHVzZXJcIixcbiAgICogICAgICAgXCJjbHVzdGVyX3Blcm1pc3Npb25zXCI6IFtcImNsdXN0ZXJfY29tcG9zaXRlX29wc1wiXSxcbiAgICogICAgICAgXCJpbmRleF9wZXJtaXNzaW9uc1wiOiBbe1xuICAgKiAgICAgICAgIFwiaW5kZXhfcGF0dGVybnNcIjogW1wiLm9wZW5zZWFyY2hfZGFzaGJvYXJkc1wiLCBcIi5vcGVuc2VhcmNoX2Rhc2hib2FyZHMtNlwiLCBcIi5vcGVuc2VhcmNoX2Rhc2hib2FyZHNfKlwiXSxcbiAgICogICAgICAgICBcImZsc1wiOiBbXSxcbiAgICogICAgICAgICBcIm1hc2tlZF9maWVsZHNcIjogW10sXG4gICAqICAgICAgICAgXCJhbGxvd2VkX2FjdGlvbnNcIjogW1wicmVhZFwiLCBcImRlbGV0ZVwiLCBcIm1hbmFnZVwiLCBcImluZGV4XCJdXG4gICAqICAgICAgIH0sIHtcbiAgICogICAgICAgICBcImluZGV4X3BhdHRlcm5zXCI6IFtcIi50YXNrc1wiLCBcIi5tYW5hZ2VtZW50LWJlYXRzXCJdLFxuICAgKiAgICAgICAgIFwiZmxzXCI6IFtdLFxuICAgKiAgICAgICAgIFwibWFza2VkX2ZpZWxkc1wiOiBbXSxcbiAgICogICAgICAgICBcImFsbG93ZWRfYWN0aW9uc1wiOiBbXCJpbmRpY2VzX2FsbFwiXVxuICAgKiAgICAgICB9XSxcbiAgICogICAgICAgXCJ0ZW5hbnRfcGVybWlzc2lvbnNcIjogW10sXG4gICAqICAgICAgIFwic3RhdGljXCI6IGZhbHNlXG4gICAqICAgICB9LFxuICAgKiAgICAgXCJhbGxfYWNjZXNzXCI6IHtcbiAgICogICAgICAgXCJyZXNlcnZlZFwiOiB0cnVlLFxuICAgKiAgICAgICBcImhpZGRlblwiOiBmYWxzZSxcbiAgICogICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIkFsbG93IGZ1bGwgYWNjZXNzIHRvIGFsbCBpbmRpY2VzIGFuZCBhbGwgY2x1c3RlciBBUElzXCIsXG4gICAqICAgICAgIFwiY2x1c3Rlcl9wZXJtaXNzaW9uc1wiOiBbXCIqXCJdLFxuICAgKiAgICAgICBcImluZGV4X3Blcm1pc3Npb25zXCI6IFt7XG4gICAqICAgICAgICAgXCJpbmRleF9wYXR0ZXJuc1wiOiBbXCIqXCJdLFxuICAgKiAgICAgICAgIFwiZmxzXCI6IFtdLFxuICAgKiAgICAgICAgIFwibWFza2VkX2ZpZWxkc1wiOiBbXSxcbiAgICogICAgICAgICBcImFsbG93ZWRfYWN0aW9uc1wiOiBbXCIqXCJdXG4gICAqICAgICAgIH1dLFxuICAgKiAgICAgICBcInRlbmFudF9wZXJtaXNzaW9uc1wiOiBbe1xuICAgKiAgICAgICAgIFwidGVuYW50X3BhdHRlcm5zXCI6IFtcIipcIl0sXG4gICAqICAgICAgICAgXCJhbGxvd2VkX2FjdGlvbnNcIjogW1wib3BlbnNlYXJjaF9kYXNoYm9hcmRzX2FsbF93cml0ZVwiXVxuICAgKiAgICAgICB9XSxcbiAgICogICAgICAgXCJzdGF0aWNcIjogZmFsc2VcbiAgICogICAgIH1cbiAgICogICB9XG4gICAqIH1cbiAgICpcbiAgICogcm9sZXNtYXBwaW5nOlxuICAgKiB7XG4gICAqICAgXCJ0b3RhbFwiOiAyLFxuICAgKiAgIFwiZGF0YVwiOiB7XG4gICAqICAgICBcInNlY3VyaXR5X21hbmFnZXJcIjoge1xuICAgKiAgICAgICBcInJlc2VydmVkXCI6IGZhbHNlLFxuICAgKiAgICAgICBcImhpZGRlblwiOiBmYWxzZSxcbiAgICogICAgICAgXCJiYWNrZW5kX3JvbGVzXCI6IFtdLFxuICAgKiAgICAgICBcImhvc3RzXCI6IFtdLFxuICAgKiAgICAgICBcInVzZXJzXCI6IFtcInplbmd5YW5cIiwgXCJhZG1pblwiXSxcbiAgICogICAgICAgXCJhbmRfYmFja2VuZF9yb2xlc1wiOiBbXVxuICAgKiAgICAgfSxcbiAgICogICAgIFwiYWxsX2FjY2Vzc1wiOiB7XG4gICAqICAgICAgIFwicmVzZXJ2ZWRcIjogZmFsc2UsXG4gICAqICAgICAgIFwiaGlkZGVuXCI6IGZhbHNlLFxuICAgKiAgICAgICBcImJhY2tlbmRfcm9sZXNcIjogW10sXG4gICAqICAgICAgIFwiaG9zdHNcIjogW10sXG4gICAqICAgICAgIFwidXNlcnNcIjogW1wiemVuZ3lhblwiLCBcImFkbWluXCIsIFwiaW5kZXh0ZXN0XCJdLFxuICAgKiAgICAgICBcImFuZF9iYWNrZW5kX3JvbGVzXCI6IFtdXG4gICAqICAgICB9XG4gICAqICAgfVxuICAgKiB9XG4gICAqXG4gICAqIHRlbmFudHM6XG4gICAqIHtcbiAgICogICBcInRvdGFsXCI6IDIsXG4gICAqICAgXCJkYXRhXCI6IHtcbiAgICogICAgIFwiZ2xvYmFsX3RlbmFudFwiOiB7XG4gICAqICAgICAgIFwicmVzZXJ2ZWRcIjogdHJ1ZSxcbiAgICogICAgICAgXCJoaWRkZW5cIjogZmFsc2UsXG4gICAqICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJHbG9iYWwgdGVuYW50XCIsXG4gICAqICAgICAgIFwic3RhdGljXCI6IGZhbHNlXG4gICAqICAgICB9LFxuICAgKiAgICAgXCJ0ZXN0IHRlbmFudFwiOiB7XG4gICAqICAgICAgIFwicmVzZXJ2ZWRcIjogZmFsc2UsXG4gICAqICAgICAgIFwiaGlkZGVuXCI6IGZhbHNlLFxuICAgKiAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwidGVuYW50IGRlc2NyaXB0aW9uXCIsXG4gICAqICAgICAgIFwic3RhdGljXCI6IGZhbHNlXG4gICAqICAgICB9XG4gICAqICAgfVxuICAgKiB9XG4gICAqL1xuICByb3V0ZXIuZ2V0KFxuICAgIHtcbiAgICAgIHBhdGg6IGAke0FQSV9QUkVGSVh9LyR7Q09ORklHVVJBVElPTl9BUElfUFJFRklYfS97cmVzb3VyY2VOYW1lfWAsXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXJhbXM6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICAgIHJlc291cmNlTmFtZTogc2NoZW1hLnN0cmluZygpLFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhc3luYyAoXG4gICAgICBjb250ZXh0LFxuICAgICAgcmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxhbnkgfCBSZXNwb25zZUVycm9yPj4gPT4ge1xuICAgICAgY29uc3QgY2xpZW50ID0gY29udGV4dC5zZWN1cml0eV9wbHVnaW4uZXNDbGllbnQuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBsZXQgZXNSZXNwO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZXNSZXNwID0gYXdhaXQgY2xpZW50LmNhbGxBc0N1cnJlbnRVc2VyKCdvcGVuc2VhcmNoX3NlY3VyaXR5Lmxpc3RSZXNvdXJjZScsIHtcbiAgICAgICAgICByZXNvdXJjZU5hbWU6IHJlcXVlc3QucGFyYW1zLnJlc291cmNlTmFtZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgdG90YWw6IE9iamVjdC5rZXlzKGVzUmVzcCkubGVuZ3RoLFxuICAgICAgICAgICAgZGF0YTogZXNSZXNwLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZXJyb3IpKTtcbiAgICAgICAgcmV0dXJuIGVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgLyoqXG4gICAqIEdldHMgZW50aXR5IGJ5IGlkLlxuICAgKlxuICAgKiB0aGUgcmVzcG9uc2UgZm9ybWF0IGRpZmZlcnMgZnJvbSBkaWZmZXJlbnQgcmVzb3VyY2UgdHlwZXMuIGUuZy5cbiAgICpcbiAgICogZm9yIGludGVybmFsIHVzZXIsIHJlc3BvbnNlIHdpbGwgbG9vayBsaWtlOlxuICAgKiB7XG4gICAqICAgXCJoYXNoXCI6IFwiXCIsXG4gICAqICAgXCJyZXNlcnZlZFwiOiBmYWxzZSxcbiAgICogICBcImhpZGRlblwiOiBmYWxzZSxcbiAgICogICBcImJhY2tlbmRfcm9sZXNcIjogW10sXG4gICAqICAgXCJhdHRyaWJ1dGVzXCI6IHt9LFxuICAgKiAgIFwic3RhdGljXCI6IGZhbHNlXG4gICAqIH1cbiAgICpcbiAgICogZm9yIHJvbGUsIHJlc3BvbnNlIHdpbGwgbG9vayBsaWtlOlxuICAgKiB7XG4gICAqICAgXCJyZXNlcnZlZFwiOiB0cnVlLFxuICAgKiAgIFwiaGlkZGVuXCI6IGZhbHNlLFxuICAgKiAgIFwiZGVzY3JpcHRpb25cIjogXCJBbGxvdyBmdWxsIGFjY2VzcyB0byBhbGwgaW5kaWNlcyBhbmQgYWxsIGNsdXN0ZXIgQVBJc1wiLFxuICAgKiAgIFwiY2x1c3Rlcl9wZXJtaXNzaW9uc1wiOiBbXCIqXCJdLFxuICAgKiAgIFwiaW5kZXhfcGVybWlzc2lvbnNcIjogW3tcbiAgICogICAgIFwiaW5kZXhfcGF0dGVybnNcIjogW1wiKlwiXSxcbiAgICogICAgIFwiZmxzXCI6IFtdLFxuICAgKiAgICAgXCJtYXNrZWRfZmllbGRzXCI6IFtdLFxuICAgKiAgICAgXCJhbGxvd2VkX2FjdGlvbnNcIjogW1wiKlwiXVxuICAgKiAgIH1dLFxuICAgKiAgIFwidGVuYW50X3Blcm1pc3Npb25zXCI6IFt7XG4gICAqICAgICBcInRlbmFudF9wYXR0ZXJuc1wiOiBbXCIqXCJdLFxuICAgKiAgICAgXCJhbGxvd2VkX2FjdGlvbnNcIjogW1wib3BlbnNlYXJjaF9kYXNoYm9hcmRzX2FsbF93cml0ZVwiXVxuICAgKiAgIH1dLFxuICAgKiAgIFwic3RhdGljXCI6IGZhbHNlXG4gICAqIH1cbiAgICpcbiAgICogZm9yIHJvbGVzIG1hcHBpbmcsIHJlc3BvbnNlIHdpbGwgbG9vayBsaWtlOlxuICAgKiB7XG4gICAqICAgXCJyZXNlcnZlZFwiOiB0cnVlLFxuICAgKiAgIFwiaGlkZGVuXCI6IGZhbHNlLFxuICAgKiAgIFwiZGVzY3JpcHRpb25cIjogXCJBbGxvdyBmdWxsIGFjY2VzcyB0byBhbGwgaW5kaWNlcyBhbmQgYWxsIGNsdXN0ZXIgQVBJc1wiLFxuICAgKiAgIFwiY2x1c3Rlcl9wZXJtaXNzaW9uc1wiOiBbXCIqXCJdLFxuICAgKiAgIFwiaW5kZXhfcGVybWlzc2lvbnNcIjogW3tcbiAgICogICAgIFwiaW5kZXhfcGF0dGVybnNcIjogW1wiKlwiXSxcbiAgICogICAgIFwiZmxzXCI6IFtdLFxuICAgKiAgICAgXCJtYXNrZWRfZmllbGRzXCI6IFtdLFxuICAgKiAgICAgXCJhbGxvd2VkX2FjdGlvbnNcIjogW1wiKlwiXVxuICAgKiAgIH1dLFxuICAgKiAgIFwidGVuYW50X3Blcm1pc3Npb25zXCI6IFt7XG4gICAqICAgICBcInRlbmFudF9wYXR0ZXJuc1wiOiBbXCIqXCJdLFxuICAgKiAgICAgXCJhbGxvd2VkX2FjdGlvbnNcIjogW1wib3BlbnNlYXJjaF9kYXNoYm9hcmRzX2FsbF93cml0ZVwiXVxuICAgKiAgIH1dLFxuICAgKiAgIFwic3RhdGljXCI6IGZhbHNlXG4gICAqIH1cbiAgICpcbiAgICogZm9yIGFjdGlvbiBncm91cHMsIHJlc3BvbnNlIHdpbGwgbG9vayBsaWtlOlxuICAgKiB7XG4gICAqICAgXCJyZXNlcnZlZFwiOiB0cnVlLFxuICAgKiAgIFwiaGlkZGVuXCI6IGZhbHNlLFxuICAgKiAgIFwiYWxsb3dlZF9hY3Rpb25zXCI6IFtcImluZGljZXM6ZGF0YS9yZWFkKlwiLCBcImluZGljZXM6YWRtaW4vbWFwcGluZ3MvZmllbGRzL2dldCpcIl0sXG4gICAqICAgXCJ0eXBlXCI6IFwiaW5kZXhcIixcbiAgICogICBcImRlc2NyaXB0aW9uXCI6IFwiQWxsb3cgYWxsIHJlYWQgb3BlcmF0aW9uc1wiLFxuICAgKiAgIFwic3RhdGljXCI6IGZhbHNlXG4gICAqIH1cbiAgICpcbiAgICogZm9yIHRlbmFudCwgcmVzcG9uc2Ugd2lsbCBsb29rIGxpa2U6XG4gICAqIHtcbiAgICogICBcInJlc2VydmVkXCI6IHRydWUsXG4gICAqICAgXCJoaWRkZW5cIjogZmFsc2UsXG4gICAqICAgXCJkZXNjcmlwdGlvblwiOiBcIkdsb2JhbCB0ZW5hbnRcIixcbiAgICogICBcInN0YXRpY1wiOiBmYWxzZVxuICAgKiB9LFxuICAgKi9cbiAgcm91dGVyLmdldChcbiAgICB7XG4gICAgICBwYXRoOiBgJHtBUElfUFJFRklYfS8ke0NPTkZJR1VSQVRJT05fQVBJX1BSRUZJWH0ve3Jlc291cmNlTmFtZX0ve2lkfWAsXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXJhbXM6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICAgIHJlc291cmNlTmFtZTogc2NoZW1hLnN0cmluZygpLFxuICAgICAgICAgIGlkOiBzY2hlbWEuc3RyaW5nKCksXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFzeW5jIChcbiAgICAgIGNvbnRleHQsXG4gICAgICByZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPGFueSB8IFJlc3BvbnNlRXJyb3I+PiA9PiB7XG4gICAgICBjb25zdCBjbGllbnQgPSBjb250ZXh0LnNlY3VyaXR5X3BsdWdpbi5lc0NsaWVudC5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGxldCBlc1Jlc3A7XG4gICAgICB0cnkge1xuICAgICAgICBlc1Jlc3AgPSBhd2FpdCBjbGllbnQuY2FsbEFzQ3VycmVudFVzZXIoJ29wZW5zZWFyY2hfc2VjdXJpdHkuZ2V0UmVzb3VyY2UnLCB7XG4gICAgICAgICAgcmVzb3VyY2VOYW1lOiByZXF1ZXN0LnBhcmFtcy5yZXNvdXJjZU5hbWUsXG4gICAgICAgICAgaWQ6IHJlcXVlc3QucGFyYW1zLmlkLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHsgYm9keTogZXNSZXNwW3JlcXVlc3QucGFyYW1zLmlkXSB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBlcnJvclJlc3BvbnNlKHJlc3BvbnNlLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICApO1xuXG4gIC8qKlxuICAgKiBEZWxldGVzIGFuIGVudGl0eSBieSBpZC5cbiAgICovXG4gIHJvdXRlci5kZWxldGUoXG4gICAge1xuICAgICAgcGF0aDogYCR7QVBJX1BSRUZJWH0vJHtDT05GSUdVUkFUSU9OX0FQSV9QUkVGSVh9L3tyZXNvdXJjZU5hbWV9L3tpZH1gLFxuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgcGFyYW1zOiBzY2hlbWEub2JqZWN0KHtcbiAgICAgICAgICByZXNvdXJjZU5hbWU6IHNjaGVtYS5zdHJpbmcoKSxcbiAgICAgICAgICBpZDogc2NoZW1hLnN0cmluZyh7XG4gICAgICAgICAgICBtaW5MZW5ndGg6IDEsXG4gICAgICAgICAgfSksXG4gICAgICAgIH0pLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFzeW5jIChcbiAgICAgIGNvbnRleHQsXG4gICAgICByZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPGFueSB8IFJlc3BvbnNlRXJyb3I+PiA9PiB7XG4gICAgICBjb25zdCBjbGllbnQgPSBjb250ZXh0LnNlY3VyaXR5X3BsdWdpbi5lc0NsaWVudC5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGxldCBlc1Jlc3A7XG4gICAgICB0cnkge1xuICAgICAgICBlc1Jlc3AgPSBhd2FpdCBjbGllbnQuY2FsbEFzQ3VycmVudFVzZXIoJ29wZW5zZWFyY2hfc2VjdXJpdHkuZGVsZXRlUmVzb3VyY2UnLCB7XG4gICAgICAgICAgcmVzb3VyY2VOYW1lOiByZXF1ZXN0LnBhcmFtcy5yZXNvdXJjZU5hbWUsXG4gICAgICAgICAgaWQ6IHJlcXVlc3QucGFyYW1zLmlkLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBtZXNzYWdlOiBlc1Jlc3AubWVzc2FnZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBlcnJvclJlc3BvbnNlKHJlc3BvbnNlLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICApO1xuXG4gIC8qKlxuICAgKiBVcGRhdGUgb2JqZWN0IHdpdGggb3V0IElkLiBSZXNvdXJjZSBpZGVudGlmaWNhdGlvbiBpcyBleHBlY3RlZCB0byBjb21wdXRlZCBmcm9tIGhlYWRlcnMuIEVnOiBhdXRoIGhlYWRlcnNcbiAgICpcbiAgICogUmVxdWVzdCBzYW1wbGU6XG4gICAqIC9jb25maWd1cmF0aW9uL2FjY291bnRcbiAgICoge1xuICAgKiAgIFwicGFzc3dvcmRcIjogXCJuZXctcGFzc3dvcmRcIixcbiAgICogICBcImN1cnJlbnRfcGFzc3dvcmRcIjogXCJvbGQtcGFzc3dvcmRcIlxuICAgKiB9XG4gICAqL1xuICByb3V0ZXIucG9zdChcbiAgICB7XG4gICAgICBwYXRoOiBgJHtBUElfUFJFRklYfS8ke0NPTkZJR1VSQVRJT05fQVBJX1BSRUZJWH0ve3Jlc291cmNlTmFtZX1gLFxuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgcGFyYW1zOiBzY2hlbWEub2JqZWN0KHtcbiAgICAgICAgICByZXNvdXJjZU5hbWU6IHNjaGVtYS5zdHJpbmcoKSxcbiAgICAgICAgfSksXG4gICAgICAgIGJvZHk6IHNjaGVtYS5hbnkoKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhc3luYyAoXG4gICAgICBjb250ZXh0LFxuICAgICAgcmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxhbnkgfCBSZXNwb25zZUVycm9yPj4gPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFsaWRhdGVSZXF1ZXN0Qm9keShyZXF1ZXN0LnBhcmFtcy5yZXNvdXJjZU5hbWUsIHJlcXVlc3QuYm9keSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuYmFkUmVxdWVzdCh7IGJvZHk6IGVycm9yIH0pO1xuICAgICAgfVxuICAgICAgY29uc3QgY2xpZW50ID0gY29udGV4dC5zZWN1cml0eV9wbHVnaW4uZXNDbGllbnQuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBsZXQgZXNSZXNwO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZXNSZXNwID0gYXdhaXQgY2xpZW50LmNhbGxBc0N1cnJlbnRVc2VyKCdvcGVuc2VhcmNoX3NlY3VyaXR5LnNhdmVSZXNvdXJjZVdpdGhvdXRJZCcsIHtcbiAgICAgICAgICByZXNvdXJjZU5hbWU6IHJlcXVlc3QucGFyYW1zLnJlc291cmNlTmFtZSxcbiAgICAgICAgICBib2R5OiByZXF1ZXN0LmJvZHksXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVzUmVzcC5tZXNzYWdlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSBlbnRpdHkgYnkgSWQuXG4gICAqL1xuICByb3V0ZXIucG9zdChcbiAgICB7XG4gICAgICBwYXRoOiBgJHtBUElfUFJFRklYfS8ke0NPTkZJR1VSQVRJT05fQVBJX1BSRUZJWH0ve3Jlc291cmNlTmFtZX0ve2lkfWAsXG4gICAgICB2YWxpZGF0ZToge1xuICAgICAgICBwYXJhbXM6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICAgIHJlc291cmNlTmFtZTogc2NoZW1hLnN0cmluZygpLFxuICAgICAgICAgIGlkOiBzY2hlbWEuc3RyaW5nKHtcbiAgICAgICAgICAgIHZhbGlkYXRlOiB2YWxpZGF0ZUVudGl0eUlkLFxuICAgICAgICAgIH0pLFxuICAgICAgICB9KSxcbiAgICAgICAgYm9keTogc2NoZW1hLmFueSgpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGFzeW5jIChcbiAgICAgIGNvbnRleHQsXG4gICAgICByZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPGFueSB8IFJlc3BvbnNlRXJyb3I+PiA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICB2YWxpZGF0ZVJlcXVlc3RCb2R5KHJlcXVlc3QucGFyYW1zLnJlc291cmNlTmFtZSwgcmVxdWVzdC5ib2R5KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5iYWRSZXF1ZXN0KHsgYm9keTogZXJyb3IgfSk7XG4gICAgICB9XG4gICAgICBjb25zdCBjbGllbnQgPSBjb250ZXh0LnNlY3VyaXR5X3BsdWdpbi5lc0NsaWVudC5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGxldCBlc1Jlc3A7XG4gICAgICB0cnkge1xuICAgICAgICBlc1Jlc3AgPSBhd2FpdCBjbGllbnQuY2FsbEFzQ3VycmVudFVzZXIoJ29wZW5zZWFyY2hfc2VjdXJpdHkuc2F2ZVJlc291cmNlJywge1xuICAgICAgICAgIHJlc291cmNlTmFtZTogcmVxdWVzdC5wYXJhbXMucmVzb3VyY2VOYW1lLFxuICAgICAgICAgIGlkOiByZXF1ZXN0LnBhcmFtcy5pZCxcbiAgICAgICAgICBib2R5OiByZXF1ZXN0LmJvZHksXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVzUmVzcC5tZXNzYWdlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgLyoqXG4gICAqIEdldHMgYXV0aGVudGljYXRpb24gaW5mbyBvZiB0aGUgdXNlci5cbiAgICpcbiAgICogVGhlIHJlc3BvbnNlIGxvb2tzIGxpa2U6XG4gICAqIHtcbiAgICogICBcInVzZXJcIjogXCJVc2VyIFtuYW1lPWFkbWluLCByb2xlcz1bXSwgcmVxdWVzdGVkVGVuYW50PV9fdXNlcl9fXVwiLFxuICAgKiAgIFwidXNlcl9uYW1lXCI6IFwiYWRtaW5cIixcbiAgICogICBcInVzZXJfcmVxdWVzdGVkX3RlbmFudFwiOiBcIl9fdXNlcl9fXCIsXG4gICAqICAgXCJyZW1vdGVfYWRkcmVzc1wiOiBcIjEyNy4wLjAuMTozNTA0NFwiLFxuICAgKiAgIFwiYmFja2VuZF9yb2xlc1wiOiBbXSxcbiAgICogICBcImN1c3RvbV9hdHRyaWJ1dGVfbmFtZXNcIjogW10sXG4gICAqICAgXCJyb2xlc1wiOiBbXCJhbGxfYWNjZXNzXCIsIFwic2VjdXJpdHlfbWFuYWdlclwiXSxcbiAgICogICBcInRlbmFudHNcIjoge1xuICAgKiAgICAgXCJhbm90aGVyX3RlbmFudFwiOiB0cnVlLFxuICAgKiAgICAgXCJhZG1pblwiOiB0cnVlLFxuICAgKiAgICAgXCJnbG9iYWxfdGVuYW50XCI6IHRydWUsXG4gICAqICAgICBcImFhYWFhXCI6IHRydWUsXG4gICAqICAgICBcInRlc3QgdGVuYW50XCI6IHRydWVcbiAgICogICB9LFxuICAgKiAgIFwicHJpbmNpcGFsXCI6IG51bGwsXG4gICAqICAgXCJwZWVyX2NlcnRpZmljYXRlc1wiOiBcIjBcIixcbiAgICogICBcInNzb19sb2dvdXRfdXJsXCI6IG51bGxcbiAgICogfVxuICAgKi9cbiAgcm91dGVyLmdldChcbiAgICB7XG4gICAgICBwYXRoOiBgJHtBUElfUFJFRklYfS9hdXRoL2F1dGhpbmZvYCxcbiAgICAgIHZhbGlkYXRlOiBmYWxzZSxcbiAgICB9LFxuICAgIGFzeW5jIChcbiAgICAgIGNvbnRleHQsXG4gICAgICByZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPGFueSB8IFJlc3BvbnNlRXJyb3I+PiA9PiB7XG4gICAgICBjb25zdCBjbGllbnQgPSBjb250ZXh0LnNlY3VyaXR5X3BsdWdpbi5lc0NsaWVudC5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGxldCBlc1Jlc3A7XG4gICAgICB0cnkge1xuICAgICAgICBlc1Jlc3AgPSBhd2FpdCBjbGllbnQuY2FsbEFzQ3VycmVudFVzZXIoJ29wZW5zZWFyY2hfc2VjdXJpdHkuYXV0aGluZm8nKTtcblxuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgIGJvZHk6IGVzUmVzcCxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3JSZXNwb25zZShyZXNwb25zZSwgZXJyb3IpO1xuICAgICAgfVxuICAgIH1cbiAgKTtcblxuICByb3V0ZXIuZ2V0KFxuICAgIHtcbiAgICAgIHBhdGg6IGAke0FQSV9QUkVGSVh9L2F1dGgvZGFzaGJvYXJkc2luZm9gLFxuICAgICAgdmFsaWRhdGU6IGZhbHNlLFxuICAgIH0sXG4gICAgYXN5bmMgKFxuICAgICAgY29udGV4dCxcbiAgICAgIHJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8YW55IHwgUmVzcG9uc2VFcnJvcj4+ID0+IHtcbiAgICAgIGNvbnN0IGNsaWVudCA9IGNvbnRleHQuc2VjdXJpdHlfcGx1Z2luLmVzQ2xpZW50LmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgbGV0IGVzUmVzcDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGVzUmVzcCA9IGF3YWl0IGNsaWVudC5jYWxsQXNDdXJyZW50VXNlcignb3BlbnNlYXJjaF9zZWN1cml0eS5kYXNoYm9hcmRzaW5mbycpO1xuXG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgICAgYm9keTogZXNSZXNwLFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBlcnJvclJlc3BvbnNlKHJlc3BvbnNlLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICApO1xuXG4gIC8qKlxuICAgKiBHZXRzIGF1ZGl0IGxvZyBjb25maWd1cmF0aW9u44CCXG4gICAqXG4gICAqIFNhbXBsZSBwYXlsb2FkOlxuICAgKiB7XG4gICAqICAgXCJlbmFibGVkXCI6dHJ1ZSxcbiAgICogICBcImF1ZGl0XCI6e1xuICAgKiAgICAgXCJlbmFibGVfcmVzdFwiOmZhbHNlLFxuICAgKiAgICAgXCJkaXNhYmxlZF9yZXN0X2NhdGVnb3JpZXNcIjpbXG4gICAqICAgICAgIFwiRkFJTEVEX0xPR0lOXCIsXG4gICAqICAgICAgIFwiQVVUSEVOVElDQVRFRFwiXG4gICAqICAgICBdLFxuICAgKiAgICAgXCJlbmFibGVfdHJhbnNwb3J0XCI6dHJ1ZSxcbiAgICogICAgIFwiZGlzYWJsZWRfdHJhbnNwb3J0X2NhdGVnb3JpZXNcIjpbXG4gICAqICAgICAgIFwiR1JBTlRFRF9QUklWSUxFR0VTXCJcbiAgICogICAgIF0sXG4gICAqICAgICBcInJlc29sdmVfYnVsa19yZXF1ZXN0c1wiOnRydWUsXG4gICAqICAgICBcImxvZ19yZXF1ZXN0X2JvZHlcIjpmYWxzZSxcbiAgICogICAgIFwicmVzb2x2ZV9pbmRpY2VzXCI6dHJ1ZSxcbiAgICogICAgIFwiZXhjbHVkZV9zZW5zaXRpdmVfaGVhZGVyc1wiOnRydWUsXG4gICAqICAgICBcImlnbm9yZV91c2Vyc1wiOltcbiAgICogICAgICAgXCJhZG1pblwiLFxuICAgKiAgICAgXSxcbiAgICogICAgIFwiaWdub3JlX3JlcXVlc3RzXCI6W1xuICAgKiAgICAgICBcIlNlYXJjaFJlcXVlc3RcIixcbiAgICogICAgICAgXCJpbmRpY2VzOmRhdGEvcmVhZC8qXCJcbiAgICogICAgIF1cbiAgICogICB9LFxuICAgKiAgIFwiY29tcGxpYW5jZVwiOntcbiAgICogICAgIFwiZW5hYmxlZFwiOnRydWUsXG4gICAqICAgICBcImludGVybmFsX2NvbmZpZ1wiOmZhbHNlLFxuICAgKiAgICAgXCJleHRlcm5hbF9jb25maWdcIjpmYWxzZSxcbiAgICogICAgIFwicmVhZF9tZXRhZGF0YV9vbmx5XCI6ZmFsc2UsXG4gICAqICAgICBcInJlYWRfd2F0Y2hlZF9maWVsZHNcIjp7XG4gICAqICAgICAgIFwiaW5kZXhOYW1lMVwiOltcbiAgICogICAgICAgICBcImZpZWxkMVwiLFxuICAgKiAgICAgICAgIFwiZmllbGRzLSpcIlxuICAgKiAgICAgICBdXG4gICAqICAgICB9LFxuICAgKiAgICAgXCJyZWFkX2lnbm9yZV91c2Vyc1wiOltcbiAgICogICAgICAgXCJvcGVuc2VhcmNoZGFzaGJvYXJkc3NlcnZlclwiLFxuICAgKiAgICAgICBcIm9wZXJhdG9yLypcIlxuICAgKiAgICAgXSxcbiAgICogICAgIFwid3JpdGVfbWV0YWRhdGFfb25seVwiOmZhbHNlLFxuICAgKiAgICAgXCJ3cml0ZV9sb2dfZGlmZnNcIjpmYWxzZSxcbiAgICogICAgIFwid3JpdGVfd2F0Y2hlZF9pbmRpY2VzXCI6W1xuICAgKiAgICAgICBcImluZGV4TmFtZTJcIixcbiAgICogICAgICAgXCJpbmRleFBhdHRlcm5zLSpcIlxuICAgKiAgICAgXSxcbiAgICogICAgIFwid3JpdGVfaWdub3JlX3VzZXJzXCI6W1xuICAgKiAgICAgICBcImFkbWluXCJcbiAgICogICAgIF1cbiAgICogICB9XG4gICAqIH1cbiAgICovXG4gIHJvdXRlci5nZXQoXG4gICAge1xuICAgICAgcGF0aDogYCR7QVBJX1BSRUZJWH0vY29uZmlndXJhdGlvbi9hdWRpdGAsXG4gICAgICB2YWxpZGF0ZTogZmFsc2UsXG4gICAgfSxcbiAgICBhc3luYyAoXG4gICAgICBjb250ZXh0LFxuICAgICAgcmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxhbnkgfCBSZXNwb25zZUVycm9yPj4gPT4ge1xuICAgICAgY29uc3QgY2xpZW50ID0gY29udGV4dC5zZWN1cml0eV9wbHVnaW4uZXNDbGllbnQuYXNTY29wZWQocmVxdWVzdCk7XG5cbiAgICAgIGxldCBlc1Jlc3A7XG4gICAgICB0cnkge1xuICAgICAgICBlc1Jlc3AgPSBhd2FpdCBjbGllbnQuY2FsbEFzQ3VycmVudFVzZXIoJ29wZW5zZWFyY2hfc2VjdXJpdHkuZ2V0QXVkaXQnKTtcblxuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgIGJvZHk6IGVzUmVzcCxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiBlcnJvci5zdGF0dXNDb2RlLFxuICAgICAgICAgIGJvZHk6IHBhcnNlRXNFcnJvclJlc3BvbnNlKGVycm9yKSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICApO1xuXG4gIC8qKlxuICAgKiBVcGRhdGUgYXVkaXQgbG9nIGNvbmZpZ3VyYXRpb27jgIJcbiAgICpcbiAgICogU2FtcGxlIHBheWxvYWQ6XG4gICAqIHtcbiAgICogICBcImVuYWJsZWRcIjp0cnVlLFxuICAgKiAgIFwiYXVkaXRcIjp7XG4gICAqICAgICBcImVuYWJsZV9yZXN0XCI6ZmFsc2UsXG4gICAqICAgICBcImRpc2FibGVkX3Jlc3RfY2F0ZWdvcmllc1wiOltcbiAgICogICAgICAgXCJGQUlMRURfTE9HSU5cIixcbiAgICogICAgICAgXCJBVVRIRU5USUNBVEVEXCJcbiAgICogICAgIF0sXG4gICAqICAgICBcImVuYWJsZV90cmFuc3BvcnRcIjp0cnVlLFxuICAgKiAgICAgXCJkaXNhYmxlZF90cmFuc3BvcnRfY2F0ZWdvcmllc1wiOltcbiAgICogICAgICAgXCJHUkFOVEVEX1BSSVZJTEVHRVNcIlxuICAgKiAgICAgXSxcbiAgICogICAgIFwicmVzb2x2ZV9idWxrX3JlcXVlc3RzXCI6dHJ1ZSxcbiAgICogICAgIFwibG9nX3JlcXVlc3RfYm9keVwiOmZhbHNlLFxuICAgKiAgICAgXCJyZXNvbHZlX2luZGljZXNcIjp0cnVlLFxuICAgKiAgICAgXCJleGNsdWRlX3NlbnNpdGl2ZV9oZWFkZXJzXCI6dHJ1ZSxcbiAgICogICAgIFwiaWdub3JlX3VzZXJzXCI6W1xuICAgKiAgICAgICBcImFkbWluXCIsXG4gICAqICAgICBdLFxuICAgKiAgICAgXCJpZ25vcmVfcmVxdWVzdHNcIjpbXG4gICAqICAgICAgIFwiU2VhcmNoUmVxdWVzdFwiLFxuICAgKiAgICAgICBcImluZGljZXM6ZGF0YS9yZWFkLypcIlxuICAgKiAgICAgXVxuICAgKiAgIH0sXG4gICAqICAgXCJjb21wbGlhbmNlXCI6e1xuICAgKiAgICAgXCJlbmFibGVkXCI6dHJ1ZSxcbiAgICogICAgIFwiaW50ZXJuYWxfY29uZmlnXCI6ZmFsc2UsXG4gICAqICAgICBcImV4dGVybmFsX2NvbmZpZ1wiOmZhbHNlLFxuICAgKiAgICAgXCJyZWFkX21ldGFkYXRhX29ubHlcIjpmYWxzZSxcbiAgICogICAgIFwicmVhZF93YXRjaGVkX2ZpZWxkc1wiOntcbiAgICogICAgICAgXCJpbmRleE5hbWUxXCI6W1xuICAgKiAgICAgICAgIFwiZmllbGQxXCIsXG4gICAqICAgICAgICAgXCJmaWVsZHMtKlwiXG4gICAqICAgICAgIF1cbiAgICogICAgIH0sXG4gICAqICAgICBcInJlYWRfaWdub3JlX3VzZXJzXCI6W1xuICAgKiAgICAgICBcImtpYmFuYXNlcnZlclwiLFxuICAgKiAgICAgICBcIm9wZXJhdG9yLypcIlxuICAgKiAgICAgXSxcbiAgICogICAgIFwid3JpdGVfbWV0YWRhdGFfb25seVwiOmZhbHNlLFxuICAgKiAgICAgXCJ3cml0ZV9sb2dfZGlmZnNcIjpmYWxzZSxcbiAgICogICAgIFwid3JpdGVfd2F0Y2hlZF9pbmRpY2VzXCI6W1xuICAgKiAgICAgICBcImluZGV4TmFtZTJcIixcbiAgICogICAgICAgXCJpbmRleFBhdHRlcm5zLSpcIlxuICAgKiAgICAgXSxcbiAgICogICAgIFwid3JpdGVfaWdub3JlX3VzZXJzXCI6W1xuICAgKiAgICAgICBcImFkbWluXCJcbiAgICogICAgIF1cbiAgICogICB9XG4gICAqIH1cbiAgICovXG4gIHJvdXRlci5wb3N0KFxuICAgIHtcbiAgICAgIHBhdGg6IGAke0FQSV9QUkVGSVh9L2NvbmZpZ3VyYXRpb24vYXVkaXQvY29uZmlnYCxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIGJvZHk6IHNjaGVtYS5hbnkoKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhc3luYyAoY29udGV4dCwgcmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICAgIGNvbnN0IGNsaWVudCA9IGNvbnRleHQuc2VjdXJpdHlfcGx1Z2luLmVzQ2xpZW50LmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgbGV0IGVzUmVzcDtcbiAgICAgIHRyeSB7XG4gICAgICAgIGVzUmVzcCA9IGF3YWl0IGNsaWVudC5jYWxsQXNDdXJyZW50VXNlcignb3BlbnNlYXJjaF9zZWN1cml0eS5zYXZlQXVkaXQnLCB7XG4gICAgICAgICAgYm9keTogcmVxdWVzdC5ib2R5LFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBtZXNzYWdlOiBlc1Jlc3AubWVzc2FnZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBlcnJvclJlc3BvbnNlKHJlc3BvbnNlLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICApO1xuXG4gIC8qKlxuICAgKiBEZWxldGVzIGNhY2hlLlxuICAgKlxuICAgKiBTYW1wbGUgcmVzcG9uc2U6IHtcIm1lc3NhZ2VcIjpcIkNhY2hlIGZsdXNoZWQgc3VjY2Vzc2Z1bGx5LlwifVxuICAgKi9cbiAgcm91dGVyLmRlbGV0ZShcbiAgICB7XG4gICAgICBwYXRoOiBgJHtBUElfUFJFRklYfS9jb25maWd1cmF0aW9uL2NhY2hlYCxcbiAgICAgIHZhbGlkYXRlOiBmYWxzZSxcbiAgICB9LFxuICAgIGFzeW5jIChjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgY29uc3QgY2xpZW50ID0gY29udGV4dC5zZWN1cml0eV9wbHVnaW4uZXNDbGllbnQuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBsZXQgZXNSZXNwb25zZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGVzUmVzcG9uc2UgPSBhd2FpdCBjbGllbnQuY2FsbEFzQ3VycmVudFVzZXIoJ29wZW5zZWFyY2hfc2VjdXJpdHkuY2xlYXJDYWNoZScpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IGVzUmVzcG9uc2UubWVzc2FnZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBlcnJvclJlc3BvbnNlKHJlc3BvbnNlLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICApO1xuXG4gIC8qKlxuICAgKiBHZXRzIHBlcm1pc3Npb24gaW5mbyBvZiBjdXJyZW50IHVzZXIuXG4gICAqXG4gICAqIFNhbXBsZSByZXNwb25zZTpcbiAgICoge1xuICAgKiAgIFwidXNlclwiOiBcIlVzZXIgW25hbWU9YWRtaW4sIHJvbGVzPVtdLCByZXF1ZXN0ZWRUZW5hbnQ9X191c2VyX19dXCIsXG4gICAqICAgXCJ1c2VyX25hbWVcIjogXCJhZG1pblwiLFxuICAgKiAgIFwiaGFzX2FwaV9hY2Nlc3NcIjogdHJ1ZSxcbiAgICogICBcImRpc2FibGVkX2VuZHBvaW50c1wiOiB7fVxuICAgKiB9XG4gICAqL1xuICByb3V0ZXIuZ2V0KFxuICAgIHtcbiAgICAgIHBhdGg6IGAke0FQSV9QUkVGSVh9L3Jlc3RhcGlpbmZvYCxcbiAgICAgIHZhbGlkYXRlOiBmYWxzZSxcbiAgICB9LFxuICAgIGFzeW5jIChjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgY29uc3QgY2xpZW50ID0gY29udGV4dC5zZWN1cml0eV9wbHVnaW4uZXNDbGllbnQuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBlc1Jlc3BvbnNlID0gYXdhaXQgY2xpZW50LmNhbGxBc0N1cnJlbnRVc2VyKCdvcGVuc2VhcmNoX3NlY3VyaXR5LnJlc3RhcGlpbmZvJyk7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgICAgYm9keTogZXNSZXNwb25zZSxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuYmFkUmVxdWVzdCh7XG4gICAgICAgICAgYm9keTogZXJyb3IsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgKTtcblxuICAvKipcbiAgICogVmFsaWRhdGVzIERMUyAoZG9jdW1lbnQgbGV2ZWwgc2VjdXJpdHkpIHF1ZXJ5LlxuICAgKlxuICAgKiBSZXF1ZXN0IHBheWxvYWQgaXMgYW4gRVMgcXVlcnkuXG4gICAqL1xuICByb3V0ZXIucG9zdChcbiAgICB7XG4gICAgICBwYXRoOiBgJHtBUElfUFJFRklYfS8ke0NPTkZJR1VSQVRJT05fQVBJX1BSRUZJWH0vdmFsaWRhdGVkbHMve2luZGV4TmFtZX1gLFxuICAgICAgdmFsaWRhdGU6IHtcbiAgICAgICAgcGFyYW1zOiBzY2hlbWEub2JqZWN0KHtcbiAgICAgICAgICAvLyBpbiBsZWdhY3kgcGx1Z2luIGltcGxtZW50YXRpb24sIGluZGV4TmFtZSBpcyBub3QgdXNlZCB3aGVuIGNhbGxpbmcgRVMgQVBJLlxuICAgICAgICAgIGluZGV4TmFtZTogc2NoZW1hLm1heWJlKHNjaGVtYS5zdHJpbmcoKSksXG4gICAgICAgIH0pLFxuICAgICAgICBib2R5OiBzY2hlbWEuYW55KCksXG4gICAgICB9LFxuICAgIH0sXG4gICAgYXN5bmMgKGNvbnRleHQsIHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgICBjb25zdCBjbGllbnQgPSBjb250ZXh0LnNlY3VyaXR5X3BsdWdpbi5lc0NsaWVudC5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGVzUmVzcG9uc2UgPSBhd2FpdCBjbGllbnQuY2FsbEFzQ3VycmVudFVzZXIoJ29wZW5zZWFyY2hfc2VjdXJpdHkudmFsaWRhdGVEbHMnLCB7XG4gICAgICAgICAgYm9keTogcmVxdWVzdC5ib2R5LFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLm9rKHtcbiAgICAgICAgICBib2R5OiBlc1Jlc3BvbnNlLFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBlcnJvclJlc3BvbnNlKHJlc3BvbnNlLCBlcnJvcik7XG4gICAgICB9XG4gICAgfVxuICApO1xuXG4gIC8qKlxuICAgKiBHZXRzIGluZGV4IG1hcHBpbmcuXG4gICAqXG4gICAqIENhbGxpbmcgRVMgX21hcHBpbmcgQVBJIHVuZGVyIHRoZSBob29kLiBzZWVcbiAgICogaHR0cHM6Ly93d3cuZWxhc3RpYy5jby9ndWlkZS9lbi9lbGFzdGljc2VhcmNoL3JlZmVyZW5jZS9jdXJyZW50L2luZGljZXMtZ2V0LW1hcHBpbmcuaHRtbFxuICAgKi9cbiAgcm91dGVyLnBvc3QoXG4gICAge1xuICAgICAgcGF0aDogYCR7QVBJX1BSRUZJWH0vJHtDT05GSUdVUkFUSU9OX0FQSV9QUkVGSVh9L2luZGV4X21hcHBpbmdzYCxcbiAgICAgIHZhbGlkYXRlOiB7XG4gICAgICAgIGJvZHk6IHNjaGVtYS5vYmplY3Qoe1xuICAgICAgICAgIGluZGV4OiBzY2hlbWEuYXJyYXlPZihzY2hlbWEuc3RyaW5nKCkpLFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBhc3luYyAoY29udGV4dCwgcmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICAgIGNvbnN0IGNsaWVudCA9IGNvbnRleHQuc2VjdXJpdHlfcGx1Z2luLmVzQ2xpZW50LmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZXNSZXNwb25zZSA9IGF3YWl0IGNsaWVudC5jYWxsQXNDdXJyZW50VXNlcignb3BlbnNlYXJjaF9zZWN1cml0eS5nZXRJbmRleE1hcHBpbmdzJywge1xuICAgICAgICAgIGluZGV4OiByZXF1ZXN0LmJvZHkuaW5kZXguam9pbignLCcpLFxuICAgICAgICAgIGlnbm9yZV91bmF2YWlsYWJsZTogdHJ1ZSxcbiAgICAgICAgICBhbGxvd19ub19pbmRpY2VzOiB0cnVlLFxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgIGJvZHk6IGVzUmVzcG9uc2UsXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIGluZGljZXMsIGFuZCBmaWVsZCBtYXBwaW5ncy5cbiAgICpcbiAgICogQ2FsbHMgRVMgQVBJICcvX2FsbC9fbWFwcGluZy9maWVsZC8qJyB1bmRlciB0aGUgaG9vZC4gc2VlXG4gICAqIGh0dHBzOi8vd3d3LmVsYXN0aWMuY28vZ3VpZGUvZW4vZWxhc3RpY3NlYXJjaC9yZWZlcmVuY2UvY3VycmVudC9pbmRpY2VzLWdldC1tYXBwaW5nLmh0bWxcbiAgICovXG4gIHJvdXRlci5nZXQoXG4gICAge1xuICAgICAgcGF0aDogYCR7QVBJX1BSRUZJWH0vJHtDT05GSUdVUkFUSU9OX0FQSV9QUkVGSVh9L2luZGljZXNgLFxuICAgICAgdmFsaWRhdGU6IGZhbHNlLFxuICAgIH0sXG4gICAgYXN5bmMgKGNvbnRleHQsIHJlcXVlc3QsIHJlc3BvbnNlKSA9PiB7XG4gICAgICBjb25zdCBjbGllbnQgPSBjb250ZXh0LnNlY3VyaXR5X3BsdWdpbi5lc0NsaWVudC5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGVzUmVzcG9uc2UgPSBhd2FpdCBjbGllbnQuY2FsbEFzQ3VycmVudFVzZXIoJ29wZW5zZWFyY2hfc2VjdXJpdHkuaW5kaWNlcycpO1xuICAgICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICAgIGJvZHk6IGVzUmVzcG9uc2UsXG4gICAgICAgIH0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlRXNFcnJvclJlc3BvbnNlKGVycm9yOiBhbnkpIHtcbiAgaWYgKGVycm9yLnJlc3BvbnNlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGVzRXJyb3JSZXNwb25zZSA9IEpTT04ucGFyc2UoZXJyb3IucmVzcG9uc2UpO1xuICAgICAgcmV0dXJuIGVzRXJyb3JSZXNwb25zZS5yZWFzb24gfHwgZXJyb3IucmVzcG9uc2U7XG4gICAgfSBjYXRjaCAocGFyc2luZ0Vycm9yKSB7XG4gICAgICByZXR1cm4gZXJyb3IucmVzcG9uc2U7XG4gICAgfVxuICB9XG4gIHJldHVybiBlcnJvci5tZXNzYWdlO1xufVxuXG5mdW5jdGlvbiBlcnJvclJlc3BvbnNlKHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSwgZXJyb3I6IGFueSkge1xuICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICBzdGF0dXNDb2RlOiBlcnJvci5zdGF0dXNDb2RlLFxuICAgIGJvZHk6IHBhcnNlRXNFcnJvclJlc3BvbnNlKGVycm9yKSxcbiAgfSk7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQWVBLElBQUFBLGFBQUEsR0FBQUMsT0FBQTtB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