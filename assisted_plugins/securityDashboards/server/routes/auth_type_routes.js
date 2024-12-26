"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defineAuthTypeRoutes = defineAuthTypeRoutes;
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

function defineAuthTypeRoutes(router, config) {
  /**
   * Auth type API that returns current auth type configured on OpenSearchDashboards Server.
   *
   * GET /api/authtype
   * Response:
   *  200 OK
   *  {
   *    authtype: saml
   *  }
   */
  router.get({
    path: '/api/authtype',
    validate: false,
    options: {
      authRequired: false
    }
  }, async (context, request, response) => {
    const authType = config.auth.type || _common.AuthType.BASIC;
    return response.ok({
      body: {
        authtype: authType
      }
    });
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY29tbW9uIiwicmVxdWlyZSIsImRlZmluZUF1dGhUeXBlUm91dGVzIiwicm91dGVyIiwiY29uZmlnIiwiZ2V0IiwicGF0aCIsInZhbGlkYXRlIiwib3B0aW9ucyIsImF1dGhSZXF1aXJlZCIsImNvbnRleHQiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJhdXRoVHlwZSIsImF1dGgiLCJ0eXBlIiwiQXV0aFR5cGUiLCJCQVNJQyIsIm9rIiwiYm9keSIsImF1dGh0eXBlIl0sInNvdXJjZXMiOlsiYXV0aF90eXBlX3JvdXRlcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogICBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqXG4gKiAgIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIikuXG4gKiAgIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbiAqICAgQSBjb3B5IG9mIHRoZSBMaWNlbnNlIGlzIGxvY2F0ZWQgYXRcbiAqXG4gKiAgICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiAgIG9yIGluIHRoZSBcImxpY2Vuc2VcIiBmaWxlIGFjY29tcGFueWluZyB0aGlzIGZpbGUuIFRoaXMgZmlsZSBpcyBkaXN0cmlidXRlZFxuICogICBvbiBhbiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXJcbiAqICAgZXhwcmVzcyBvciBpbXBsaWVkLiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmdcbiAqICAgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICovXG5cbmltcG9ydCB7IElSb3V0ZXIgfSBmcm9tICdvcGVuc2VhcmNoLWRhc2hib2FyZHMvc2VydmVyJztcbmltcG9ydCB7IFNlY3VyaXR5UGx1Z2luQ29uZmlnVHlwZSB9IGZyb20gJy4uJztcbmltcG9ydCB7IEF1dGhUeXBlIH0gZnJvbSAnLi4vLi4vY29tbW9uJztcbmV4cG9ydCBmdW5jdGlvbiBkZWZpbmVBdXRoVHlwZVJvdXRlcyhyb3V0ZXI6IElSb3V0ZXIsIGNvbmZpZzogU2VjdXJpdHlQbHVnaW5Db25maWdUeXBlKSB7XG4gIC8qKlxuICAgKiBBdXRoIHR5cGUgQVBJIHRoYXQgcmV0dXJucyBjdXJyZW50IGF1dGggdHlwZSBjb25maWd1cmVkIG9uIE9wZW5TZWFyY2hEYXNoYm9hcmRzIFNlcnZlci5cbiAgICpcbiAgICogR0VUIC9hcGkvYXV0aHR5cGVcbiAgICogUmVzcG9uc2U6XG4gICAqICAyMDAgT0tcbiAgICogIHtcbiAgICogICAgYXV0aHR5cGU6IHNhbWxcbiAgICogIH1cbiAgICovXG4gIHJvdXRlci5nZXQoXG4gICAgeyBwYXRoOiAnL2FwaS9hdXRodHlwZScsIHZhbGlkYXRlOiBmYWxzZSwgb3B0aW9uczogeyBhdXRoUmVxdWlyZWQ6IGZhbHNlIH0gfSxcbiAgICBhc3luYyAoY29udGV4dCwgcmVxdWVzdCwgcmVzcG9uc2UpID0+IHtcbiAgICAgIGNvbnN0IGF1dGhUeXBlID0gY29uZmlnLmF1dGgudHlwZSB8fCBBdXRoVHlwZS5CQVNJQztcbiAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBhdXRodHlwZTogYXV0aFR5cGUsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gICk7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQWlCQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFLTyxTQUFTQyxvQkFBb0JBLENBQUNDLE1BQWUsRUFBRUMsTUFBZ0MsRUFBRTtFQUN0RjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNFRCxNQUFNLENBQUNFLEdBQUcsQ0FDUjtJQUFFQyxJQUFJLEVBQUUsZUFBZTtJQUFFQyxRQUFRLEVBQUUsS0FBSztJQUFFQyxPQUFPLEVBQUU7TUFBRUMsWUFBWSxFQUFFO0lBQU07RUFBRSxDQUFDLEVBQzVFLE9BQU9DLE9BQU8sRUFBRUMsT0FBTyxFQUFFQyxRQUFRLEtBQUs7SUFDcEMsTUFBTUMsUUFBUSxHQUFHVCxNQUFNLENBQUNVLElBQUksQ0FBQ0MsSUFBSSxJQUFJQyxnQkFBUSxDQUFDQyxLQUFLO0lBQ25ELE9BQU9MLFFBQVEsQ0FBQ00sRUFBRSxDQUFDO01BQ2pCQyxJQUFJLEVBQUU7UUFDSkMsUUFBUSxFQUFFUDtNQUNaO0lBQ0YsQ0FBQyxDQUFDO0VBQ0osQ0FDRixDQUFDO0FBQ0gifQ==