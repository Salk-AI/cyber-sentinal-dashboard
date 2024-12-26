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

class CrossClusterService {
  constructor(esDriver) {
    _defineProperty(this, "getRemoteIndexes", async (context, req, res) => {
      try {
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const response = await callAsCurrentUser('alerting.getRemoteIndexes', req.query);
        return res.ok({
          body: {
            ok: true,
            resp: response
          }
        });
      } catch (err) {
        console.error('Alerting - CrossClusterService - getRemoteIndexes:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    this.esDriver = esDriver;
  }
}
exports.default = CrossClusterService;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDcm9zc0NsdXN0ZXJTZXJ2aWNlIiwiY29uc3RydWN0b3IiLCJlc0RyaXZlciIsIl9kZWZpbmVQcm9wZXJ0eSIsImNvbnRleHQiLCJyZXEiLCJyZXMiLCJjYWxsQXNDdXJyZW50VXNlciIsImFzU2NvcGVkIiwicmVzcG9uc2UiLCJxdWVyeSIsIm9rIiwiYm9keSIsInJlc3AiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJtZXNzYWdlIiwiZXhwb3J0cyIsImRlZmF1bHQiLCJtb2R1bGUiXSwic291cmNlcyI6WyJDcm9zc0NsdXN0ZXJTZXJ2aWNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3Jvc3NDbHVzdGVyU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKGVzRHJpdmVyKSB7XG4gICAgdGhpcy5lc0RyaXZlciA9IGVzRHJpdmVyO1xuICB9XG5cbiAgZ2V0UmVtb3RlSW5kZXhlcyA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSBhd2FpdCB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcSk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBc0N1cnJlbnRVc2VyKCdhbGVydGluZy5nZXRSZW1vdGVJbmRleGVzJywgcmVxLnF1ZXJ5KTtcblxuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwOiByZXNwb25zZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQWxlcnRpbmcgLSBDcm9zc0NsdXN0ZXJTZXJ2aWNlIC0gZ2V0UmVtb3RlSW5kZXhlczonLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgcmVzcDogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVlLE1BQU1BLG1CQUFtQixDQUFDO0VBQ3ZDQyxXQUFXQSxDQUFDQyxRQUFRLEVBQUU7SUFBQUMsZUFBQSwyQkFJSCxPQUFPQyxPQUFPLEVBQUVDLEdBQUcsRUFBRUMsR0FBRyxLQUFLO01BQzlDLElBQUk7UUFDRixNQUFNO1VBQUVDO1FBQWtCLENBQUMsR0FBRyxNQUFNLElBQUksQ0FBQ0wsUUFBUSxDQUFDTSxRQUFRLENBQUNILEdBQUcsQ0FBQztRQUMvRCxNQUFNSSxRQUFRLEdBQUcsTUFBTUYsaUJBQWlCLENBQUMsMkJBQTJCLEVBQUVGLEdBQUcsQ0FBQ0ssS0FBSyxDQUFDO1FBRWhGLE9BQU9KLEdBQUcsQ0FBQ0ssRUFBRSxDQUFDO1VBQ1pDLElBQUksRUFBRTtZQUNKRCxFQUFFLEVBQUUsSUFBSTtZQUNSRSxJQUFJLEVBQUVKO1VBQ1I7UUFDRixDQUFDLENBQUM7TUFDSixDQUFDLENBQUMsT0FBT0ssR0FBRyxFQUFFO1FBQ1pDLE9BQU8sQ0FBQ0MsS0FBSyxDQUFDLG9EQUFvRCxFQUFFRixHQUFHLENBQUM7UUFDeEUsT0FBT1IsR0FBRyxDQUFDSyxFQUFFLENBQUM7VUFDWkMsSUFBSSxFQUFFO1lBQ0pELEVBQUUsRUFBRSxLQUFLO1lBQ1RFLElBQUksRUFBRUMsR0FBRyxDQUFDRztVQUNaO1FBQ0YsQ0FBQyxDQUFDO01BQ0o7SUFDRixDQUFDO0lBdkJDLElBQUksQ0FBQ2YsUUFBUSxHQUFHQSxRQUFRO0VBQzFCO0FBdUJGO0FBQUNnQixPQUFBLENBQUFDLE9BQUEsR0FBQW5CLG1CQUFBO0FBQUFvQixNQUFBLENBQUFGLE9BQUEsR0FBQUEsT0FBQSxDQUFBQyxPQUFBIn0=