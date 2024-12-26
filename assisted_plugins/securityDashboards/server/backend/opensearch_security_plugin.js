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

  /**
   * Gets auth info.
   */
  Client.prototype.opensearch_security.prototype.authinfo = ca({
    url: {
      fmt: '/_plugins/_security/authinfo'
    }
  });
  Client.prototype.opensearch_security.prototype.dashboardsinfo = ca({
    url: {
      fmt: '/_plugins/_security/dashboardsinfo'
    }
  });

  /**
   * Gets tenant info and opensearch-dashboards server info.
   *
   * e.g.
   * {
   *   "user_name": "admin",
   *   "not_fail_on_forbidden_enabled": false,
   *   "opensearch_dashboards_mt_enabled": true,
   *   "opensearch_dashboards_index": ".opensearch_dashboards",
   *   "opensearch_dashboards_server_user": "kibanaserver"
   * }
   */
  Client.prototype.opensearch_security.prototype.multitenancyinfo = ca({
    url: {
      fmt: '/_plugins/_security/dashboardsinfo'
    }
  });

  /**
   * Gets tenant info. The output looks like:
   * {
   *   ".opensearch_dashboards_92668751_admin":"__private__"
   * }
   */
  Client.prototype.opensearch_security.prototype.tenantinfo = ca({
    url: {
      fmt: '/_plugins/_security/tenantinfo'
    }
  });

  /**
   * Gets SAML token.
   */
  Client.prototype.opensearch_security.prototype.authtoken = ca({
    method: 'POST',
    needBody: true,
    url: {
      fmt: '/_plugins/_security/api/authtoken'
    }
  });
  Client.prototype.opensearch_security.prototype.tenancy_configs = ca({
    method: 'PUT',
    needBody: true,
    url: {
      fmt: '/_plugins/_security/api/tenancy/config'
    }
  });
}
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZGVmYXVsdCIsIkNsaWVudCIsImNvbmZpZyIsImNvbXBvbmVudHMiLCJjYSIsImNsaWVudEFjdGlvbiIsImZhY3RvcnkiLCJwcm90b3R5cGUiLCJvcGVuc2VhcmNoX3NlY3VyaXR5IiwibmFtZXNwYWNlRmFjdG9yeSIsImF1dGhpbmZvIiwidXJsIiwiZm10IiwiZGFzaGJvYXJkc2luZm8iLCJtdWx0aXRlbmFuY3lpbmZvIiwidGVuYW50aW5mbyIsImF1dGh0b2tlbiIsIm1ldGhvZCIsIm5lZWRCb2R5IiwidGVuYW5jeV9jb25maWdzIiwibW9kdWxlIiwiZXhwb3J0cyIsImRlZmF1bHQiXSwic291cmNlcyI6WyJvcGVuc2VhcmNoX3NlY3VyaXR5X3BsdWdpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogICBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqXG4gKiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIikuXG4gKiAgIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICAgQSBjb3B5IG9mIHRoZSBMaWNlbnNlIGlzIGxvY2F0ZWQgYXRcbiAqXG4gKiAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgIG9yIGluIHRoZSBcImxpY2Vuc2VcIiBmaWxlIGFjY29tcGFueWluZyB0aGlzIGZpbGUuIFRoaXMgZmlsZSBpcyBkaXN0cmlidXRlZFxuICogICBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqICAgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmdcbiAqICAgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZGVmYXVsdC1leHBvcnRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChDbGllbnQ6IGFueSwgY29uZmlnOiBhbnksIGNvbXBvbmVudHM6IGFueSkge1xuICBjb25zdCBjYSA9IGNvbXBvbmVudHMuY2xpZW50QWN0aW9uLmZhY3Rvcnk7XG5cbiAgaWYgKCFDbGllbnQucHJvdG90eXBlLm9wZW5zZWFyY2hfc2VjdXJpdHkpIHtcbiAgICBDbGllbnQucHJvdG90eXBlLm9wZW5zZWFyY2hfc2VjdXJpdHkgPSBjb21wb25lbnRzLmNsaWVudEFjdGlvbi5uYW1lc3BhY2VGYWN0b3J5KCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyBhdXRoIGluZm8uXG4gICAqL1xuICBDbGllbnQucHJvdG90eXBlLm9wZW5zZWFyY2hfc2VjdXJpdHkucHJvdG90eXBlLmF1dGhpbmZvID0gY2Eoe1xuICAgIHVybDoge1xuICAgICAgZm10OiAnL19wbHVnaW5zL19zZWN1cml0eS9hdXRoaW5mbycsXG4gICAgfSxcbiAgfSk7XG5cbiAgQ2xpZW50LnByb3RvdHlwZS5vcGVuc2VhcmNoX3NlY3VyaXR5LnByb3RvdHlwZS5kYXNoYm9hcmRzaW5mbyA9IGNhKHtcbiAgICB1cmw6IHtcbiAgICAgIGZtdDogJy9fcGx1Z2lucy9fc2VjdXJpdHkvZGFzaGJvYXJkc2luZm8nLFxuICAgIH0sXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBHZXRzIHRlbmFudCBpbmZvIGFuZCBvcGVuc2VhcmNoLWRhc2hib2FyZHMgc2VydmVyIGluZm8uXG4gICAqXG4gICAqIGUuZy5cbiAgICoge1xuICAgKiAgIFwidXNlcl9uYW1lXCI6IFwiYWRtaW5cIixcbiAgICogICBcIm5vdF9mYWlsX29uX2ZvcmJpZGRlbl9lbmFibGVkXCI6IGZhbHNlLFxuICAgKiAgIFwib3BlbnNlYXJjaF9kYXNoYm9hcmRzX210X2VuYWJsZWRcIjogdHJ1ZSxcbiAgICogICBcIm9wZW5zZWFyY2hfZGFzaGJvYXJkc19pbmRleFwiOiBcIi5vcGVuc2VhcmNoX2Rhc2hib2FyZHNcIixcbiAgICogICBcIm9wZW5zZWFyY2hfZGFzaGJvYXJkc19zZXJ2ZXJfdXNlclwiOiBcImtpYmFuYXNlcnZlclwiXG4gICAqIH1cbiAgICovXG4gIENsaWVudC5wcm90b3R5cGUub3BlbnNlYXJjaF9zZWN1cml0eS5wcm90b3R5cGUubXVsdGl0ZW5hbmN5aW5mbyA9IGNhKHtcbiAgICB1cmw6IHtcbiAgICAgIGZtdDogJy9fcGx1Z2lucy9fc2VjdXJpdHkvZGFzaGJvYXJkc2luZm8nLFxuICAgIH0sXG4gIH0pO1xuXG4gIC8qKlxuICAgKiBHZXRzIHRlbmFudCBpbmZvLiBUaGUgb3V0cHV0IGxvb2tzIGxpa2U6XG4gICAqIHtcbiAgICogICBcIi5vcGVuc2VhcmNoX2Rhc2hib2FyZHNfOTI2Njg3NTFfYWRtaW5cIjpcIl9fcHJpdmF0ZV9fXCJcbiAgICogfVxuICAgKi9cbiAgQ2xpZW50LnByb3RvdHlwZS5vcGVuc2VhcmNoX3NlY3VyaXR5LnByb3RvdHlwZS50ZW5hbnRpbmZvID0gY2Eoe1xuICAgIHVybDoge1xuICAgICAgZm10OiAnL19wbHVnaW5zL19zZWN1cml0eS90ZW5hbnRpbmZvJyxcbiAgICB9LFxuICB9KTtcblxuICAvKipcbiAgICogR2V0cyBTQU1MIHRva2VuLlxuICAgKi9cbiAgQ2xpZW50LnByb3RvdHlwZS5vcGVuc2VhcmNoX3NlY3VyaXR5LnByb3RvdHlwZS5hdXRodG9rZW4gPSBjYSh7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgbmVlZEJvZHk6IHRydWUsXG4gICAgdXJsOiB7XG4gICAgICBmbXQ6ICcvX3BsdWdpbnMvX3NlY3VyaXR5L2FwaS9hdXRodG9rZW4nLFxuICAgIH0sXG4gIH0pO1xuXG4gIENsaWVudC5wcm90b3R5cGUub3BlbnNlYXJjaF9zZWN1cml0eS5wcm90b3R5cGUudGVuYW5jeV9jb25maWdzID0gY2Eoe1xuICAgIG1ldGhvZDogJ1BVVCcsXG4gICAgbmVlZEJvZHk6IHRydWUsXG4gICAgdXJsOiB7XG4gICAgICBmbXQ6ICcvX3BsdWdpbnMvX3NlY3VyaXR5L2FwaS90ZW5hbmN5L2NvbmZpZycsXG4gICAgfSxcbiAgfSk7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDZSxTQUFBQSxTQUFVQyxNQUFXLEVBQUVDLE1BQVcsRUFBRUMsVUFBZSxFQUFFO0VBQ2xFLE1BQU1DLEVBQUUsR0FBR0QsVUFBVSxDQUFDRSxZQUFZLENBQUNDLE9BQU87RUFFMUMsSUFBSSxDQUFDTCxNQUFNLENBQUNNLFNBQVMsQ0FBQ0MsbUJBQW1CLEVBQUU7SUFDekNQLE1BQU0sQ0FBQ00sU0FBUyxDQUFDQyxtQkFBbUIsR0FBR0wsVUFBVSxDQUFDRSxZQUFZLENBQUNJLGdCQUFnQixDQUFDLENBQUM7RUFDbkY7O0VBRUE7QUFDRjtBQUNBO0VBQ0VSLE1BQU0sQ0FBQ00sU0FBUyxDQUFDQyxtQkFBbUIsQ0FBQ0QsU0FBUyxDQUFDRyxRQUFRLEdBQUdOLEVBQUUsQ0FBQztJQUMzRE8sR0FBRyxFQUFFO01BQ0hDLEdBQUcsRUFBRTtJQUNQO0VBQ0YsQ0FBQyxDQUFDO0VBRUZYLE1BQU0sQ0FBQ00sU0FBUyxDQUFDQyxtQkFBbUIsQ0FBQ0QsU0FBUyxDQUFDTSxjQUFjLEdBQUdULEVBQUUsQ0FBQztJQUNqRU8sR0FBRyxFQUFFO01BQ0hDLEdBQUcsRUFBRTtJQUNQO0VBQ0YsQ0FBQyxDQUFDOztFQUVGO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNFWCxNQUFNLENBQUNNLFNBQVMsQ0FBQ0MsbUJBQW1CLENBQUNELFNBQVMsQ0FBQ08sZ0JBQWdCLEdBQUdWLEVBQUUsQ0FBQztJQUNuRU8sR0FBRyxFQUFFO01BQ0hDLEdBQUcsRUFBRTtJQUNQO0VBQ0YsQ0FBQyxDQUFDOztFQUVGO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNFWCxNQUFNLENBQUNNLFNBQVMsQ0FBQ0MsbUJBQW1CLENBQUNELFNBQVMsQ0FBQ1EsVUFBVSxHQUFHWCxFQUFFLENBQUM7SUFDN0RPLEdBQUcsRUFBRTtNQUNIQyxHQUFHLEVBQUU7SUFDUDtFQUNGLENBQUMsQ0FBQzs7RUFFRjtBQUNGO0FBQ0E7RUFDRVgsTUFBTSxDQUFDTSxTQUFTLENBQUNDLG1CQUFtQixDQUFDRCxTQUFTLENBQUNTLFNBQVMsR0FBR1osRUFBRSxDQUFDO0lBQzVEYSxNQUFNLEVBQUUsTUFBTTtJQUNkQyxRQUFRLEVBQUUsSUFBSTtJQUNkUCxHQUFHLEVBQUU7TUFDSEMsR0FBRyxFQUFFO0lBQ1A7RUFDRixDQUFDLENBQUM7RUFFRlgsTUFBTSxDQUFDTSxTQUFTLENBQUNDLG1CQUFtQixDQUFDRCxTQUFTLENBQUNZLGVBQWUsR0FBR2YsRUFBRSxDQUFDO0lBQ2xFYSxNQUFNLEVBQUUsS0FBSztJQUNiQyxRQUFRLEVBQUUsSUFBSTtJQUNkUCxHQUFHLEVBQUU7TUFDSEMsR0FBRyxFQUFFO0lBQ1A7RUFDRixDQUFDLENBQUM7QUFDSjtBQUFDUSxNQUFBLENBQUFDLE9BQUEsR0FBQUEsT0FBQSxDQUFBQyxPQUFBIn0=