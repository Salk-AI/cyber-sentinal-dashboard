"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiAuthRoutes = void 0;
var _common = require("../../../../common");
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

class MultiAuthRoutes {
  constructor(router, sessionStorageFactory) {
    this.router = router;
    this.sessionStorageFactory = sessionStorageFactory;
  }
  setupRoutes() {
    this.router.get({
      path: _common.API_ENDPOINT_AUTHTYPE,
      validate: false
    }, async (context, request, response) => {
      const cookie = await this.sessionStorageFactory.asScoped(request).get();
      if (!cookie) {
        return response.badRequest({
          body: 'Invalid cookie'
        });
      }
      return response.ok({
        body: {
          currentAuthType: cookie === null || cookie === void 0 ? void 0 : cookie.authType
        }
      });
    });
  }
}
exports.MultiAuthRoutes = MultiAuthRoutes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY29tbW9uIiwicmVxdWlyZSIsIk11bHRpQXV0aFJvdXRlcyIsImNvbnN0cnVjdG9yIiwicm91dGVyIiwic2Vzc2lvblN0b3JhZ2VGYWN0b3J5Iiwic2V0dXBSb3V0ZXMiLCJnZXQiLCJwYXRoIiwiQVBJX0VORFBPSU5UX0FVVEhUWVBFIiwidmFsaWRhdGUiLCJjb250ZXh0IiwicmVxdWVzdCIsInJlc3BvbnNlIiwiY29va2llIiwiYXNTY29wZWQiLCJiYWRSZXF1ZXN0IiwiYm9keSIsIm9rIiwiY3VycmVudEF1dGhUeXBlIiwiYXV0aFR5cGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsicm91dGVzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAgIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICpcbiAqICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKS5cbiAqICAgWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogICBBIGNvcHkgb2YgdGhlIExpY2Vuc2UgaXMgbG9jYXRlZCBhdFxuICpcbiAqICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICAgb3IgaW4gdGhlIFwibGljZW5zZVwiIGZpbGUgYWNjb21wYW55aW5nIHRoaXMgZmlsZS4gVGhpcyBmaWxlIGlzIGRpc3RyaWJ1dGVkXG4gKiAgIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogICBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZ1xuICogICBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHsgSVJvdXRlciwgU2Vzc2lvblN0b3JhZ2VGYWN0b3J5IH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvc2VydmVyJztcbmltcG9ydCB7IFNlY3VyaXR5U2Vzc2lvbkNvb2tpZSB9IGZyb20gJy4uLy4uLy4uL3Nlc3Npb24vc2VjdXJpdHlfY29va2llJztcbmltcG9ydCB7IEFQSV9FTkRQT0lOVF9BVVRIVFlQRSB9IGZyb20gJy4uLy4uLy4uLy4uL2NvbW1vbic7XG5cbmV4cG9ydCBjbGFzcyBNdWx0aUF1dGhSb3V0ZXMge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJlYWRvbmx5IHJvdXRlcjogSVJvdXRlcixcbiAgICBwcml2YXRlIHJlYWRvbmx5IHNlc3Npb25TdG9yYWdlRmFjdG9yeTogU2Vzc2lvblN0b3JhZ2VGYWN0b3J5PFNlY3VyaXR5U2Vzc2lvbkNvb2tpZT5cbiAgKSB7fVxuXG4gIHB1YmxpYyBzZXR1cFJvdXRlcygpIHtcbiAgICB0aGlzLnJvdXRlci5nZXQoXG4gICAgICB7XG4gICAgICAgIHBhdGg6IEFQSV9FTkRQT0lOVF9BVVRIVFlQRSxcbiAgICAgICAgdmFsaWRhdGU6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIGFzeW5jIChjb250ZXh0LCByZXF1ZXN0LCByZXNwb25zZSkgPT4ge1xuICAgICAgICBjb25zdCBjb29raWUgPSBhd2FpdCB0aGlzLnNlc3Npb25TdG9yYWdlRmFjdG9yeS5hc1Njb3BlZChyZXF1ZXN0KS5nZXQoKTtcbiAgICAgICAgaWYgKCFjb29raWUpIHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuYmFkUmVxdWVzdCh7XG4gICAgICAgICAgICBib2R5OiAnSW52YWxpZCBjb29raWUnLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZS5vayh7XG4gICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgY3VycmVudEF1dGhUeXBlOiBjb29raWU/LmF1dGhUeXBlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICk7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBaUJBLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQWpCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQU1PLE1BQU1DLGVBQWUsQ0FBQztFQUMzQkMsV0FBV0EsQ0FDUUMsTUFBZSxFQUNmQyxxQkFBbUUsRUFDcEY7SUFBQSxLQUZpQkQsTUFBZSxHQUFmQSxNQUFlO0lBQUEsS0FDZkMscUJBQW1FLEdBQW5FQSxxQkFBbUU7RUFDbkY7RUFFSUMsV0FBV0EsQ0FBQSxFQUFHO0lBQ25CLElBQUksQ0FBQ0YsTUFBTSxDQUFDRyxHQUFHLENBQ2I7TUFDRUMsSUFBSSxFQUFFQyw2QkFBcUI7TUFDM0JDLFFBQVEsRUFBRTtJQUNaLENBQUMsRUFDRCxPQUFPQyxPQUFPLEVBQUVDLE9BQU8sRUFBRUMsUUFBUSxLQUFLO01BQ3BDLE1BQU1DLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQ1QscUJBQXFCLENBQUNVLFFBQVEsQ0FBQ0gsT0FBTyxDQUFDLENBQUNMLEdBQUcsQ0FBQyxDQUFDO01BQ3ZFLElBQUksQ0FBQ08sTUFBTSxFQUFFO1FBQ1gsT0FBT0QsUUFBUSxDQUFDRyxVQUFVLENBQUM7VUFDekJDLElBQUksRUFBRTtRQUNSLENBQUMsQ0FBQztNQUNKO01BQ0EsT0FBT0osUUFBUSxDQUFDSyxFQUFFLENBQUM7UUFDakJELElBQUksRUFBRTtVQUNKRSxlQUFlLEVBQUVMLE1BQU0sYUFBTkEsTUFBTSx1QkFBTkEsTUFBTSxDQUFFTTtRQUMzQjtNQUNGLENBQUMsQ0FBQztJQUNKLENBQ0YsQ0FBQztFQUNIO0FBQ0Y7QUFBQ0MsT0FBQSxDQUFBbkIsZUFBQSxHQUFBQSxlQUFBIn0=