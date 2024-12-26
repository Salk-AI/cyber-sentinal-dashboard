"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiLogsCtrl = void 0;
var _errorResponse = require("../../lib/error-response");
/*
 * Wazuh app - Class for UI Logs functions
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

class UiLogsCtrl {
  /**
   * Constructor
   * @param {*} server
   */
  constructor() {}

  /**
   * Add new UI Log entry to the platform logs
   * @param context
   * @param request
   * @param response
   * @returns success message or ErrorResponse
   */
  async createUiLogs(context, request, response) {
    try {
      const {
        location,
        message,
        level
      } = request.body;
      const loggerUI = context.wazuh.logger.get('ui');
      const loggerByLevel = (loggerUI === null || loggerUI === void 0 ? void 0 : loggerUI[level]) || loggerUI.error;
      loggerByLevel(`${location}: ${message}`);
      return response.ok({
        body: {
          statusCode: 200,
          error: 0,
          message: 'Log has been added'
        }
      });
    } catch (error) {
      return (0, _errorResponse.ErrorResponse)(error.message || error, 3021, 500, response);
    }
  }
}
exports.UiLogsCtrl = UiLogsCtrl;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfZXJyb3JSZXNwb25zZSIsInJlcXVpcmUiLCJVaUxvZ3NDdHJsIiwiY29uc3RydWN0b3IiLCJjcmVhdGVVaUxvZ3MiLCJjb250ZXh0IiwicmVxdWVzdCIsInJlc3BvbnNlIiwibG9jYXRpb24iLCJtZXNzYWdlIiwibGV2ZWwiLCJib2R5IiwibG9nZ2VyVUkiLCJ3YXp1aCIsImxvZ2dlciIsImdldCIsImxvZ2dlckJ5TGV2ZWwiLCJlcnJvciIsIm9rIiwic3RhdHVzQ29kZSIsIkVycm9yUmVzcG9uc2UiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsidWktbG9ncy5jb250cm9sbGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBXYXp1aCBhcHAgLSBDbGFzcyBmb3IgVUkgTG9ncyBmdW5jdGlvbnNcbiAqIENvcHlyaWdodCAoQykgMjAxNS0yMDIyIFdhenVoLCBJbmMuXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU7IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uOyBlaXRoZXIgdmVyc2lvbiAyIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBGaW5kIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhpcyBvbiB0aGUgTElDRU5TRSBmaWxlLlxuICovXG5cbi8vIFJlcXVpcmUgc29tZSBsaWJyYXJpZXNcbmltcG9ydCB7IEVycm9yUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9saWIvZXJyb3ItcmVzcG9uc2UnO1xuaW1wb3J0IHtcbiAgT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxufSBmcm9tICdzcmMvY29yZS9zZXJ2ZXInO1xuXG5leHBvcnQgY2xhc3MgVWlMb2dzQ3RybCB7XG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0geyp9IHNlcnZlclxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIC8qKlxuICAgKiBBZGQgbmV3IFVJIExvZyBlbnRyeSB0byB0aGUgcGxhdGZvcm0gbG9nc1xuICAgKiBAcGFyYW0gY29udGV4dFxuICAgKiBAcGFyYW0gcmVxdWVzdFxuICAgKiBAcGFyYW0gcmVzcG9uc2VcbiAgICogQHJldHVybnMgc3VjY2VzcyBtZXNzYWdlIG9yIEVycm9yUmVzcG9uc2VcbiAgICovXG4gIGFzeW5jIGNyZWF0ZVVpTG9ncyhcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgbG9jYXRpb24sIG1lc3NhZ2UsIGxldmVsIH0gPSByZXF1ZXN0LmJvZHk7XG4gICAgICBjb25zdCBsb2dnZXJVSSA9IGNvbnRleHQud2F6dWgubG9nZ2VyLmdldCgndWknKTtcbiAgICAgIGNvbnN0IGxvZ2dlckJ5TGV2ZWwgPSBsb2dnZXJVST8uW2xldmVsXSB8fCBsb2dnZXJVSS5lcnJvcjtcbiAgICAgIGxvZ2dlckJ5TGV2ZWwoYCR7bG9jYXRpb259OiAke21lc3NhZ2V9YCk7XG4gICAgICByZXR1cm4gcmVzcG9uc2Uub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgIGVycm9yOiAwLFxuICAgICAgICAgIG1lc3NhZ2U6ICdMb2cgaGFzIGJlZW4gYWRkZWQnLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBFcnJvclJlc3BvbnNlKGVycm9yLm1lc3NhZ2UgfHwgZXJyb3IsIDMwMjEsIDUwMCwgcmVzcG9uc2UpO1xuICAgIH1cbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFhQSxJQUFBQSxjQUFBLEdBQUFDLE9BQUE7QUFiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQVFPLE1BQU1DLFVBQVUsQ0FBQztFQUN0QjtBQUNGO0FBQ0E7QUFDQTtFQUNFQyxXQUFXQSxDQUFBLEVBQUcsQ0FBQzs7RUFFZjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtFQUNFLE1BQU1DLFlBQVlBLENBQ2hCQyxPQUE4QixFQUM5QkMsT0FBb0MsRUFDcENDLFFBQTZDLEVBQzdDO0lBQ0EsSUFBSTtNQUNGLE1BQU07UUFBRUMsUUFBUTtRQUFFQyxPQUFPO1FBQUVDO01BQU0sQ0FBQyxHQUFHSixPQUFPLENBQUNLLElBQUk7TUFDakQsTUFBTUMsUUFBUSxHQUFHUCxPQUFPLENBQUNRLEtBQUssQ0FBQ0MsTUFBTSxDQUFDQyxHQUFHLENBQUMsSUFBSSxDQUFDO01BQy9DLE1BQU1DLGFBQWEsR0FBRyxDQUFBSixRQUFRLGFBQVJBLFFBQVEsdUJBQVJBLFFBQVEsQ0FBR0YsS0FBSyxDQUFDLEtBQUlFLFFBQVEsQ0FBQ0ssS0FBSztNQUN6REQsYUFBYSxDQUFFLEdBQUVSLFFBQVMsS0FBSUMsT0FBUSxFQUFDLENBQUM7TUFDeEMsT0FBT0YsUUFBUSxDQUFDVyxFQUFFLENBQUM7UUFDakJQLElBQUksRUFBRTtVQUNKUSxVQUFVLEVBQUUsR0FBRztVQUNmRixLQUFLLEVBQUUsQ0FBQztVQUNSUixPQUFPLEVBQUU7UUFDWDtNQUNGLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQyxPQUFPUSxLQUFLLEVBQUU7TUFDZCxPQUFPLElBQUFHLDRCQUFhLEVBQUNILEtBQUssQ0FBQ1IsT0FBTyxJQUFJUSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRVYsUUFBUSxDQUFDO0lBQ25FO0VBQ0Y7QUFDRjtBQUFDYyxPQUFBLENBQUFuQixVQUFBLEdBQUFBLFVBQUEifQ==