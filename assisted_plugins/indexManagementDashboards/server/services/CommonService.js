"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

const VALID_METHODS = ["HEAD", "GET", "POST", "PUT", "DELETE"];
class CommonService {
  constructor(osDriver) {
    _defineProperty(this, "osDriver", void 0);
    _defineProperty(this, "apiCaller", async (context, request, response) => {
      const useQuery = !request.body;
      const usedParam = useQuery ? request.query : request.body;
      const {
        endpoint,
        data,
        hideLog
      } = usedParam || {};
      try {
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const finalData = data;

        /**
         * The endpoint must not be an empty string, reference from proxy caller
         */
        if (!endpoint) {
          return response.custom({
            statusCode: 200,
            body: {
              ok: false,
              error: `Expected non-empty string on endpoint`
            }
          });
        }

        /**
         * Update path parameter to follow RFC/generic HTTP convention
         */
        if (endpoint === "transport.request" && typeof (finalData === null || finalData === void 0 ? void 0 : finalData.path) === "string" && !/^\//.test((finalData === null || finalData === void 0 ? void 0 : finalData.path) || "")) {
          finalData.path = `/${finalData.path || ""}`;
        }

        /**
         * Check valid method here
         */
        if (endpoint === "transport.request" && data !== null && data !== void 0 && data.method) {
          var _data$method$toUpperC, _data$method;
          if (VALID_METHODS.indexOf((_data$method$toUpperC = (_data$method = data.method).toUpperCase) === null || _data$method$toUpperC === void 0 ? void 0 : _data$method$toUpperC.call(_data$method)) === -1) {
            return response.custom({
              statusCode: 200,
              body: {
                ok: false,
                error: `Method must be one of, case insensitive ['HEAD', 'GET', 'POST', 'PUT', 'DELETE']. Received '${data.method}'.`
              }
            });
          }
        }
        const payload = useQuery ? JSON.parse(finalData || "{}") : finalData;
        const commonCallerResponse = await callWithRequest(endpoint, payload || {});
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: commonCallerResponse
          }
        });
      } catch (err) {
        if (!hideLog) {
          console.error("Index Management - CommonService - apiCaller", err);
        }
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err === null || err === void 0 ? void 0 : err.message,
            body: (err === null || err === void 0 ? void 0 : err.body) || ""
          }
        });
      }
    });
    this.osDriver = osDriver;
  }
}
exports.default = CommonService;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJWQUxJRF9NRVRIT0RTIiwiQ29tbW9uU2VydmljZSIsImNvbnN0cnVjdG9yIiwib3NEcml2ZXIiLCJfZGVmaW5lUHJvcGVydHkiLCJjb250ZXh0IiwicmVxdWVzdCIsInJlc3BvbnNlIiwidXNlUXVlcnkiLCJib2R5IiwidXNlZFBhcmFtIiwicXVlcnkiLCJlbmRwb2ludCIsImRhdGEiLCJoaWRlTG9nIiwiY2FsbEFzQ3VycmVudFVzZXIiLCJjYWxsV2l0aFJlcXVlc3QiLCJhc1Njb3BlZCIsImZpbmFsRGF0YSIsImN1c3RvbSIsInN0YXR1c0NvZGUiLCJvayIsImVycm9yIiwicGF0aCIsInRlc3QiLCJtZXRob2QiLCJfZGF0YSRtZXRob2QkdG9VcHBlckMiLCJfZGF0YSRtZXRob2QiLCJpbmRleE9mIiwidG9VcHBlckNhc2UiLCJjYWxsIiwicGF5bG9hZCIsIkpTT04iLCJwYXJzZSIsImNvbW1vbkNhbGxlclJlc3BvbnNlIiwiZXJyIiwiY29uc29sZSIsIm1lc3NhZ2UiLCJleHBvcnRzIiwiZGVmYXVsdCIsIm1vZHVsZSJdLCJzb3VyY2VzIjpbIkNvbW1vblNlcnZpY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBBY2tub3dsZWRnZWRSZXNwb25zZSB9IGZyb20gXCIuLi9tb2RlbHMvaW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgU2VydmVyUmVzcG9uc2UgfSBmcm9tIFwiLi4vbW9kZWxzL3R5cGVzXCI7XG5pbXBvcnQge1xuICBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gIE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICBJTGVnYWN5Q3VzdG9tQ2x1c3RlckNsaWVudCxcbiAgSU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2UsXG4gIFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbn0gZnJvbSBcIi4uLy4uLy4uLy4uL3NyYy9jb3JlL3NlcnZlclwiO1xuaW1wb3J0IHsgSUFQSUNhbGxlciB9IGZyb20gXCIuLi8uLi9tb2RlbHMvaW50ZXJmYWNlc1wiO1xuXG5jb25zdCBWQUxJRF9NRVRIT0RTID0gW1wiSEVBRFwiLCBcIkdFVFwiLCBcIlBPU1RcIiwgXCJQVVRcIiwgXCJERUxFVEVcIl07XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUNvbW1vbkNhbGxlciB7XG4gIDxUPihhcmc6IGFueSk6IFQ7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbW1vblNlcnZpY2Uge1xuICBvc0RyaXZlcjogSUxlZ2FjeUN1c3RvbUNsdXN0ZXJDbGllbnQ7XG5cbiAgY29uc3RydWN0b3Iob3NEcml2ZXI6IElMZWdhY3lDdXN0b21DbHVzdGVyQ2xpZW50KSB7XG4gICAgdGhpcy5vc0RyaXZlciA9IG9zRHJpdmVyO1xuICB9XG5cbiAgYXBpQ2FsbGVyID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8QWNrbm93bGVkZ2VkUmVzcG9uc2U+Pj4gPT4ge1xuICAgIGNvbnN0IHVzZVF1ZXJ5ID0gIXJlcXVlc3QuYm9keTtcbiAgICBjb25zdCB1c2VkUGFyYW0gPSAodXNlUXVlcnkgPyByZXF1ZXN0LnF1ZXJ5IDogcmVxdWVzdC5ib2R5KSBhcyBJQVBJQ2FsbGVyO1xuICAgIGNvbnN0IHsgZW5kcG9pbnQsIGRhdGEsIGhpZGVMb2cgfSA9IHVzZWRQYXJhbSB8fCB7fTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogY2FsbFdpdGhSZXF1ZXN0IH0gPSB0aGlzLm9zRHJpdmVyLmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgY29uc3QgZmluYWxEYXRhID0gZGF0YTtcblxuICAgICAgLyoqXG4gICAgICAgKiBUaGUgZW5kcG9pbnQgbXVzdCBub3QgYmUgYW4gZW1wdHkgc3RyaW5nLCByZWZlcmVuY2UgZnJvbSBwcm94eSBjYWxsZXJcbiAgICAgICAqL1xuICAgICAgaWYgKCFlbmRwb2ludCkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IGBFeHBlY3RlZCBub24tZW1wdHkgc3RyaW5nIG9uIGVuZHBvaW50YCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBVcGRhdGUgcGF0aCBwYXJhbWV0ZXIgdG8gZm9sbG93IFJGQy9nZW5lcmljIEhUVFAgY29udmVudGlvblxuICAgICAgICovXG4gICAgICBpZiAoZW5kcG9pbnQgPT09IFwidHJhbnNwb3J0LnJlcXVlc3RcIiAmJiB0eXBlb2YgZmluYWxEYXRhPy5wYXRoID09PSBcInN0cmluZ1wiICYmICEvXlxcLy8udGVzdChmaW5hbERhdGE/LnBhdGggfHwgXCJcIikpIHtcbiAgICAgICAgZmluYWxEYXRhLnBhdGggPSBgLyR7ZmluYWxEYXRhLnBhdGggfHwgXCJcIn1gO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIENoZWNrIHZhbGlkIG1ldGhvZCBoZXJlXG4gICAgICAgKi9cbiAgICAgIGlmIChlbmRwb2ludCA9PT0gXCJ0cmFuc3BvcnQucmVxdWVzdFwiICYmIGRhdGE/Lm1ldGhvZCkge1xuICAgICAgICBpZiAoVkFMSURfTUVUSE9EUy5pbmRleE9mKGRhdGEubWV0aG9kLnRvVXBwZXJDYXNlPy4oKSkgPT09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICAgICAgZXJyb3I6IGBNZXRob2QgbXVzdCBiZSBvbmUgb2YsIGNhc2UgaW5zZW5zaXRpdmUgWydIRUFEJywgJ0dFVCcsICdQT1NUJywgJ1BVVCcsICdERUxFVEUnXS4gUmVjZWl2ZWQgJyR7ZGF0YS5tZXRob2R9Jy5gLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXlsb2FkID0gdXNlUXVlcnkgPyBKU09OLnBhcnNlKGZpbmFsRGF0YSB8fCBcInt9XCIpIDogZmluYWxEYXRhO1xuICAgICAgY29uc3QgY29tbW9uQ2FsbGVyUmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoZW5kcG9pbnQsIHBheWxvYWQgfHwge30pO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3BvbnNlOiBjb21tb25DYWxsZXJSZXNwb25zZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKCFoaWRlTG9nKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbmRleCBNYW5hZ2VtZW50IC0gQ29tbW9uU2VydmljZSAtIGFwaUNhbGxlclwiLCBlcnIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICBlcnJvcjogZXJyPy5tZXNzYWdlLFxuICAgICAgICAgIGJvZHk6IGVycj8uYm9k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