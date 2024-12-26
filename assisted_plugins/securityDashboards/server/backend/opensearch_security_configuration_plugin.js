"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
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

// eslint-disable-next-line import/no-default-export
function _default(Client, config, components) {
  const ca = components.clientAction.factory;
  if (!Client.prototype.opensearch_security) {
    Client.prototype.opensearch_security = components.clientAction.namespaceFactory();
  }
  Client.prototype.opensearch_security.prototype.restapiinfo = ca({
    url: {
      fmt: '/_plugins/_security/api/permissionsinfo'
    }
  });

  /**
   * list all field mappings for all indices.
   */
  Client.prototype.opensearch_security.prototype.indices = ca({
    url: {
      fmt: '/_all/_mapping/field/*'
    }
  });

  /**
   * Returns a Security resource configuration.
   *
   * Sample response:
   *
   * {
   *   "user": {
   *     "hash": "#123123"
   *   }
   * }
   */
  Client.prototype.opensearch_security.prototype.listResource = ca({
    url: {
      fmt: '/_plugins/_security/api/<%=resourceName%>',
      req: {
        resourceName: {
          type: 'string',
          required: true
        }
      }
    }
  });

  /**
   * Creates a Security resource instance.
   *
   * At the moment Security does not support conflict detection,
   * so this method can be effectively used to both create and update resource.
   *
   * Sample response:
   *
   * {
   *   "status": "CREATED",
   *   "message": "User username created"
   * }
   */
  Client.prototype.opensearch_security.prototype.saveResource = ca({
    method: 'PUT',
    needBody: true,
    url: {
      fmt: '/_plugins/_security/api/<%=resourceName%>/<%=id%>',
      req: {
        resourceName: {
          type: 'string',
          required: true
        },
        id: {
          type: 'string',
          required: true
        }
      }
    }
  });

  /**
   * Updates a resource.
   * Resource identification is expected to computed from headers. Eg: auth headers.
   *
   * Sample response:
   * {
   *   "status": "OK",
   *   "message": "Username updated."
   * }
   */
  Client.prototype.opensearch_security.prototype.saveResourceWithoutId = ca({
    method: 'PUT',
    needBody: true,
    url: {
      fmt: '/_plugins/_security/api/<%=resourceName%>',
      req: {
        resourceName: {
          type: 'string',
          required: true
        }
      }
    }
  });

  /**
   * Returns a Security resource instance.
   *
   * Sample response:
   *
   * {
   *   "user": {
   *     "hash": '#123123'
   *   }
   * }
   */
  Client.prototype.opensearch_security.prototype.getResource = ca({
    method: 'GET',
    url: {
      fmt: '/_plugins/_security/api/<%=resourceName%>/<%=id%>',
      req: {
        resourceName: {
          type: 'string',
          required: true
        },
        id: {
          type: 'string',
          required: true
        }
      }
    }
  });

  /**
   * Deletes a Security resource instance.
   */
  Client.prototype.opensearch_security.prototype.deleteResource = ca({
    method: 'DELETE',
    url: {
      fmt: '/_plugins/_security/api/<%=resourceName%>/<%=id%>',
      req: {
        resourceName: {
          type: 'string',
          required: true
        },
        id: {
          type: 'string',
          required: true
        }
      }
    }
  });

  /**
   * Deletes a Security resource instance.
   */
  Client.prototype.opensearch_security.prototype.clearCache = ca({
    method: 'DELETE',
    url: {
      fmt: '/_plugins/_security/api/cache'
    }
  });

  /**
   * Validate query.
   */
  Client.prototype.opensearch_security.prototype.validateDls = ca({
    method: 'POST',
    needBody: true,
    url: {
      fmt: '/_validate/query?explain=true'
    }
  });

  /**
   * Gets index mapping.
   */
  Client.prototype.opensearch_security.prototype.getIndexMappings = ca({
    method: 'GET',
    needBody: true,
    url: {
      fmt: '/<%=index%>/_mapping',
      req: {
        index: {
          type: 'string',
          required: true
        }
      }
    }
  });

  /**
   * Gets audit log configuration.
   */
  Client.prototype.opensearch_security.prototype.getAudit = ca({
    method: 'GET',
    url: {
      fmt: '/_plugins/_security/api/audit'
    }
  });

  /**
   * Updates audit log configuration.
   */
  Client.prototype.opensearch_security.prototype.saveAudit = ca({
    method: 'PUT',
    needBody: true,
    url: {
      fmt: '/_plugins/_security/api/audit/config'
    }
  });
}
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZGVmYXVsdCIsIkNsaWVudCIsImNvbmZpZyIsImNvbXBvbmVudHMiLCJjYSIsImNsaWVudEFjdGlvbiIsImZhY3RvcnkiLCJwcm90b3R5cGUiLCJvcGVuc2VhcmNoX3NlY3VyaXR5IiwibmFtZXNwYWNlRmFjdG9yeSIsInJlc3RhcGlpbmZvIiwidXJsIiwiZm10IiwiaW5kaWNlcyIsImxpc3RSZXNvdXJjZSIsInJlcSIsInJlc291cmNlTmFtZSIsInR5cGUiLCJyZXF1aXJlZCIsInNhdmVSZXNvdXJjZSIsIm1ldGhvZCIsIm5lZWRCb2R5IiwiaWQiLCJzYXZlUmVzb3VyY2VXaXRob3V0SWQiLCJnZXRSZXNvdXJjZSIsImRlbGV0ZVJlc291cmNlIiwiY2xlYXJDYWNoZSIsInZhbGlkYXRlRGxzIiwiZ2V0SW5kZXhNYXBwaW5ncyIsImluZGV4IiwiZ2V0QXVkaXQiLCJzYXZlQXVkaXQiLCJtb2R1bGUiLCJleHBvcnRzIiwiZGVmYXVsdCJdLCJzb3VyY2VzIjpbIm9wZW5zZWFyY2hfc2VjdXJpdHlfY29uZmlndXJhdGlvbl9wbHVnaW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqICAgQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKlxuICogICBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpLlxuICogICBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiAgIEEgY29weSBvZiB0aGUgTGljZW5zZSBpcyBsb2NhdGVkIGF0XG4gKlxuICogICAgICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4gKlxuICogICBvciBpbiB0aGUgXCJsaWNlbnNlXCIgZmlsZSBhY2NvbXBhbnlpbmcgdGhpcyBmaWxlLiBUaGlzIGZpbGUgaXMgZGlzdHJpYnV0ZWRcbiAqICAgb24gYW4gXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyXG4gKiAgIGV4cHJlc3Mgb3IgaW1wbGllZC4gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nXG4gKiAgIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiAqL1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWRlZmF1bHQtZXhwb3J0XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoQ2xpZW50OiBhbnksIGNvbmZpZzogYW55LCBjb21wb25lbnRzOiBhbnkpIHtcbiAgY29uc3QgY2EgPSBjb21wb25lbnRzLmNsaWVudEFjdGlvbi5mYWN0b3J5O1xuXG4gIGlmICghQ2xpZW50LnByb3RvdHlwZS5vcGVuc2VhcmNoX3NlY3VyaXR5KSB7XG4gICAgQ2xpZW50LnByb3RvdHlwZS5vcGVuc2VhcmNoX3NlY3VyaXR5ID0gY29tcG9uZW50cy5jbGllbnRBY3Rpb24ubmFtZXNwYWNlRmFjdG9yeSgpO1xuICB9XG5cbiAgQ2xpZW50LnByb3RvdHlwZS5vcGVuc2VhcmNoX3NlY3VyaXR5LnByb3RvdHlwZS5yZXN0YXBpaW5mbyA9IGNhKHtcbiAgICB1cmw6IHtcbiAgICAgIGZtdDogJy9fcGx1Z2lucy9fc2VjdXJpdHkvYXBpL3Blcm1pc3Npb25zaW5mbycsXG4gICAgfSxcbiAgfSk7XG5cbiAgLyoqXG4gICAqIGxpc3QgYWxsIGZpZWxkIG1hcHBpbmdzIGZvciBhbGwgaW5kaWNlcy5cbiAgICovXG4gIENsaWVudC5wcm90b3R5cGUub3BlbnNlYXJjaF9zZWN1cml0eS5wcm90b3R5cGUuaW5kaWNlcyA9IGNhKHtcbiAgICB1cmw6IHtcbiAgICAgIGZtdDogJy9fYWxsL19tYXBwaW5nL2ZpZWxkLyonLFxuICAgIH0sXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgU2VjdXJpdHkgcmVzb3VyY2UgY29uZmlndXJhdGlvbi5cbiAgICpcbiAgICogU2FtcGxlIHJlc3BvbnNlOlxuICAgKlxuICAgKiB7XG4gICAqICAgXCJ1c2VyXCI6IHtcbiAgICogICAgIFwiaGFzaFwiOiBcIiMxMjMxMjNcIlxuICAgKiAgIH1cbiAgICogfVxuICAgKi9cbiAgQ2xpZW50LnByb3RvdHlwZS5vcGVuc2VhcmNoX3NlY3VyaXR5LnByb3RvdHlwZS5saXN0UmVzb3VyY2UgPSBjYSh7XG4gICAgdXJsOiB7XG4gICAgICBmbXQ6ICcvX3BsdWdpbnMvX3NlY3VyaXR5L2FwaS88JT1yZXNvdXJjZU5hbWUlPicsXG4gICAgICByZXE6IHtcbiAgICAgICAgcmVzb3VyY2VOYW1lOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgU2VjdXJpdHkgcmVzb3VyY2UgaW5zdGFuY2UuXG4gICAqXG4gICAqIEF0IHRoZSBtb21lbnQgU2VjdXJpdHkgZG9lcyBub3Qgc3VwcG9ydCBjb25mbGljdCBkZXRlY3Rpb24sXG4gICAqIHNvIHRoaXMgbWV0aG9kIGNhbiBiZSBlZmZlY3RpdmVseSB1c2VkIHRvIGJvdGggY3JlYXRlIGFuZCB1cGRhdGUgcmVzb3VyY2UuXG4gICAqXG4gICAqIFNhbXBsZSByZXNwb25zZTpcbiAgICpcbiAgICoge1xuICAgKiAgIFwic3RhdHVzXCI6IFwiQ1JFQVRFRFwiLFxuICAgKiAgIFwibWVzc2FnZVwiOiBcIlVzZXIgdXNlcm5hbWUgY3JlYXRlZFwiXG4gICAqIH1cbiAgICovXG4gIENsaWVudC5wcm90b3R5cGUub3BlbnNlYXJjaF9zZWN1cml0eS5wcm90b3R5cGUuc2F2ZVJlc291cmNlID0gY2Eoe1xuICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgbmVlZEJvZHk6IHRydWUsXG4gICAgdXJsOiB7XG4gICAgICBmbXQ6ICcvX3BsdWdpbnMvX3NlY3VyaXR5L2FwaS88JT1yZXNvdXJjZU5hbWUlPi88JT1pZCU+JyxcbiAgICAgIHJlcToge1xuICAgICAgICByZXNvdXJjZU5hbWU6IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgaWQ6IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSk7XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgYSByZXNvdXJjZS5cbiAgICogUmVzb3VyY2UgaWRlbnRpZmljYXRpb24gaXMgZXhwZWN0ZWQgdG8gY29tcHV0ZWQgZnJvbSBoZWFkZXJzLiBFZzogYXV0aCBoZWFkZXJzLlxuICAgKlxuICAgKiBTYW1wbGUgcmVzcG9uc2U6XG4gICAqIHtcbiAgICogICBcInN0YXR1c1wiOiBcIk9LXCIsXG4gICAqICAgXCJtZXNzYWdlXCI6IFwiVXNlcm5hbWUgdXBkYXRlZC5cIlxuICAgKiB9XG4gICAqL1xuICBDbGllbnQucHJvdG90eXBlLm9wZW5zZWFyY2hfc2VjdXJpdHkucHJvdG90eXBlLnNhdmVSZXNvdXJjZVdpdGhvdXRJZCA9IGNhKHtcbiAgICBtZXRob2Q6ICdQVVQnLFxuICAgIG5lZWRCb2R5OiB0cnVlLFxuICAgIHVybDoge1xuICAgICAgZm10OiAnL19wbHVnaW5zL19zZWN1cml0eS9hcGkvPCU9cmVzb3VyY2VOYW1lJT4nLFxuICAgICAgcmVxOiB7XG4gICAgICAgIHJlc291cmNlTmFtZToge1xuICAgICAgICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9KTtcblxuICAvKipcbiAgICogUmV0dXJucyBhIFNlY3VyaXR5IHJlc291cmNlIGluc3RhbmNlLlxuICAgKlxuICAgKiBTYW1wbGUgcmVzcG9uc2U6XG4gICAqXG4gICAqIHtcbiAgICogICBcInVzZXJcIjoge1xuICAgKiAgICAgXCJoYXNoXCI6ICcjMTIzMTIzJ1xuICAgKiAgIH1cbiAgICogfVxuICAgKi9cbiAgQ2xpZW50LnByb3RvdHlwZS5vcGVuc2VhcmNoX3NlY3VyaXR5LnByb3RvdHlwZS5nZXRSZXNvdXJjZSA9IGNhKHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHVybDoge1xuICAgICAgZm10OiAnL19wbHVnaW5zL19zZWN1cml0eS9hcGkvPCU9cmVzb3VyY2VOYW1lJT4vPCU9aWQlPicsXG4gICAgICByZXE6IHtcbiAgICAgICAgcmVzb3VyY2VOYW1lOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIGlkOiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBEZWxldGVzIGEgU2VjdXJpdHkgcmVzb3VyY2UgaW5zdGFuY2UuXG4gICAqL1xuICBDbGllbnQucHJvdG90eXBlLm9wZW5zZWFyY2hfc2VjdXJpdHkucHJvdG90eXBlLmRlbGV0ZVJlc291cmNlID0gY2Eoe1xuICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgdXJsOiB7XG4gICAgICBmbXQ6ICcvX3BsdWdpbnMvX3NlY3VyaXR5L2FwaS88JT1yZXNvdXJjZU5hbWUlPi88JT1pZCU+JyxcbiAgICAgIHJlcToge1xuICAgICAgICByZXNvdXJjZU5hbWU6IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgaWQ6IHtcbiAgICAgICAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSk7XG5cbiAgLyoqXG4gICAqIERlbGV0ZXMgYSBTZWN1cml0eSByZXNvdXJjZSBpbnN0YW5jZS5cbiAgICovXG4gIENsaWVudC5wcm90b3R5cGUub3BlbnNlYXJjaF9zZWN1cml0eS5wcm90b3R5cGUuY2xlYXJDYWNoZSA9IGNhKHtcbiAgICBtZXRob2Q6ICdERUxFVEUnLFxuICAgIHVybDoge1xuICAgICAgZm10OiAnL19wbHVnaW5zL19zZWN1cml0eS9hcGkvY2FjaGUnLFxuICAgIH0sXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBWYWxpZGF0ZSBxdWVyeS5cbiAgICovXG4gIENsaWVudC5wcm90b3R5cGUub3BlbnNlYXJjaF9zZWN1cml0eS5wcm90b3R5cGUudmFsaWRhdGVEbHMgPSBjYSh7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgbmVlZEJvZHk6IHRydWUsXG4gICAgdXJsOiB7XG4gICAgICBmbXQ6ICcvX3ZhbGlkYXRlL3F1ZXJ5P2V4cGxhaW49dHJ1ZScsXG4gICAgfSxcbiAgfSk7XG5cbiAgLyoqXG4gICAqIEdldHMgaW5kZXggbWFwcGluZy5cbiAgICovXG4gIENsaWVudC5wcm90b3R5cGUub3BlbnNlYXJjaF9zZWN1cml0eS5wcm90b3R5cGUuZ2V0SW5kZXhNYXBwaW5ncyA9IGNhKHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIG5lZWRCb2R5OiB0cnVlLFxuICAgIHVybDoge1xuICAgICAgZm10OiAnLzwlPWluZGV4JT4vX21hcHBpbmcnLFxuICAgICAgcmVxOiB7XG4gICAgICAgIGluZGV4OiB7XG4gICAgICAgICAgdHlwZTogJ3N0cmluZycsXG4gICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBHZXRzIGF1ZGl0IGxvZyBjb25maWd1cmF0aW9uLlxuICAgKi9cbiAgQ2xpZW50LnByb3RvdHlwZS5vcGVuc2VhcmNoX3NlY3VyaXR5LnByb3RvdHlwZS5nZXRBdWRpdCA9IGNhKHtcbiAgICBtZXRob2Q6ICdHRVQnLFxuICAgIHVybDoge1xuICAgICAgZm10OiAnL19wbHVnaW5zL19zZWN1cml0eS9hcGkvYXVkaXQnLFxuICAgIH0sXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBVcGRhdGVzIGF1ZGl0IGxvZyBjb25maWd1cmF0aW9uLlxuICAgKi9cbiAgQ2xpZW50LnByb3RvdHlwZS5vcGVuc2VhcmNoX3NlY3VyaXR5LnByb3RvdHlwZS5zYXZlQXVkaXQgPSBjYSh7XG4gICAgbWV0aG9kOiAnUFVUJyxcbiAgICBuZWVkQm9keTogdHJ1ZSxcbiAgICB1cmw6IHtcbiAgICAgIGZtdDogJy9fcGx1Z2lucy9fc2VjdXJpdHkvYXBpL2F1ZGl0L2NvbmZpZycsXG4gICAgfSxcbiAgfSk7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDZSxTQUFBQSxTQUFVQyxNQUFXLEVBQUVDLE1BQVcsRUFBRUMsVUFBZSxFQUFFO0VBQ2xFLE1BQU1DLEVBQUUsR0FBR0QsVUFBVSxDQUFDRSxZQUFZLENBQUNDLE9BQU87RUFFMUMsSUFBSSxDQUFDTCxNQUFNLENBQUNNLFNBQVMsQ0FBQ0MsbUJBQW1CLEVBQUU7SUFDekNQLE1BQU0sQ0FBQ00sU0FBUyxDQUFDQyxtQkFBbUIsR0FBR0wsVUFBVSxDQUFDRSxZQUFZLENBQUNJLGdCQUFnQixDQUFDLENBQUM7RUFDbkY7RUFFQVIsTUFBTSxDQUFDTSxTQUFTLENBQUNDLG1CQUFtQixDQUFDRCxTQUFTLENBQUNHLFdBQVcsR0FBR04sRUFBRSxDQUFDO0lBQzlETyxHQUFHLEVBQUU7TUFDSEMsR0FBRyxFQUFFO0lBQ1A7RUFDRixDQUFDLENBQUM7O0VBRUY7QUFDRjtBQUNBO0VBQ0VYLE1BQU0sQ0FBQ00sU0FBUyxDQUFDQyxtQkFBbUIsQ0FBQ0QsU0FBUyxDQUFDTSxPQUFPLEdBQUdULEVBQUUsQ0FBQztJQUMxRE8s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