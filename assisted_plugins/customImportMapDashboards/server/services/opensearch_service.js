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

class OpensearchService {
  constructor(driver) {
    _defineProperty(this, "getIndex", async (context, req, res) => {
      try {
        const {
          index
        } = req.body;
        const {
          callAsCurrentUser
        } = this.driver.asScoped(req);
        const indices = await callAsCurrentUser('cat.indices', {
          index,
          format: 'json',
          h: 'health,index,status'
        });
        return res.ok({
          body: {
            ok: true,
            resp: indices
          }
        });
      } catch (err) {
        // Opensearch throws an index_not_found_exception which we'll treat as a success
        if (err.statusCode === 404) {
          return res.ok({
            body: {
              ok: false,
              resp: []
            }
          });
        } else {
          return res.ok({
            body: {
              ok: false,
              resp: err.message
            }
          });
        }
      }
    });
    this.driver = driver;
  }
}
exports.default = OpensearchService;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJPcGVuc2VhcmNoU2VydmljZSIsImNvbnN0cnVjdG9yIiwiZHJpdmVyIiwiX2RlZmluZVByb3BlcnR5IiwiY29udGV4dCIsInJlcSIsInJlcyIsImluZGV4IiwiYm9keSIsImNhbGxBc0N1cnJlbnRVc2VyIiwiYXNTY29wZWQiLCJpbmRpY2VzIiwiZm9ybWF0IiwiaCIsIm9rIiwicmVzcCIsImVyciIsInN0YXR1c0NvZGUiLCJtZXNzYWdlIiwiZXhwb3J0cyIsImRlZmF1bHQiLCJtb2R1bGUiXSwic291cmNlcyI6WyJvcGVuc2VhcmNoX3NlcnZpY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcGVuc2VhcmNoU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKGRyaXZlcikge1xuICAgIHRoaXMuZHJpdmVyID0gZHJpdmVyO1xuICB9XG5cbiAgZ2V0SW5kZXggPSBhc3luYyAoY29udGV4dCwgcmVxLCByZXMpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpbmRleCB9ID0gcmVxLmJvZHk7XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSB0aGlzLmRyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgaW5kaWNlcyA9IGF3YWl0IGNhbGxBc0N1cnJlbnRVc2VyKCdjYXQuaW5kaWNlcycsIHtcbiAgICAgICAgaW5kZXgsXG4gICAgICAgIGZvcm1hdDogJ2pzb24nLFxuICAgICAgICBoOiAnaGVhbHRoLGluZGV4LHN0YXR1cycsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcDogaW5kaWNlcyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgLy8gT3BlbnNlYXJjaCB0aHJvd3MgYW4gaW5kZXhfbm90X2ZvdW5kX2V4Y2VwdGlvbiB3aGljaCB3ZSdsbCB0cmVhdCBhcyBhIHN1Y2Nlc3NcbiAgICAgIGlmIChlcnIuc3RhdHVzQ29kZSA9PT0gNDA0KSB7XG4gICAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICAgIHJlc3A6IFtdLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgICAgcmVzcDogZXJyLm1lc3NhZ2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFZSxNQUFNQSxpQkFBaUIsQ0FBQztFQUNyQ0MsV0FBV0EsQ0FBQ0MsTUFBTSxFQUFFO0lBQUFDLGVBQUEsbUJBSVQsT0FBT0MsT0FBTyxFQUFFQyxHQUFHLEVBQUVDLEdBQUcsS0FBSztNQUN0QyxJQUFJO1FBQ0YsTUFBTTtVQUFFQztRQUFNLENBQUMsR0FBR0YsR0FBRyxDQUFDRyxJQUFJO1FBQzFCLE1BQU07VUFBRUM7UUFBa0IsQ0FBQyxHQUFHLElBQUksQ0FBQ1AsTUFBTSxDQUFDUSxRQUFRLENBQUNMLEdBQUcsQ0FBQztRQUN2RCxNQUFNTSxPQUFPLEdBQUcsTUFBTUYsaUJBQWlCLENBQUMsYUFBYSxFQUFFO1VBQ3JERixLQUFLO1VBQ0xLLE1BQU0sRUFBRSxNQUFNO1VBQ2RDLENBQUMsRUFBRTtRQUNMLENBQUMsQ0FBQztRQUNGLE9BQU9QLEdBQUcsQ0FBQ1EsRUFBRSxDQUFDO1VBQ1pOLElBQUksRUFBRTtZQUNKTSxFQUFFLEVBQUUsSUFBSTtZQUNSQyxJQUFJLEVBQUVKO1VBQ1I7UUFDRixDQUFDLENBQUM7TUFDSixDQUFDLENBQUMsT0FBT0ssR0FBRyxFQUFFO1FBQ1o7UUFDQSxJQUFJQSxHQUFHLENBQUNDLFVBQVUsS0FBSyxHQUFHLEVBQUU7VUFDMUIsT0FBT1gsR0FBRyxDQUFDUSxFQUFFLENBQUM7WUFDWk4sSUFBSSxFQUFFO2NBQ0pNLEVBQUUsRUFBRSxLQUFLO2NBQ1RDLElBQUksRUFBRTtZQUNSO1VBQ0YsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxNQUFNO1VBQ0wsT0FBT1QsR0FBRyxDQUFDUSxFQUFFLENBQUM7WUFDWk4sSUFBSSxFQUFFO2NBQ0pNLEVBQUUsRUFBRSxLQUFLO2NBQ1RDLElBQUksRUFBRUMsR0FBRyxDQUFDRTtZQUNaO1VBQ0YsQ0FBQyxDQUFDO1FBQ0o7TUFDRjtJQUNGLENBQUM7SUFwQ0MsSUFBSSxDQUFDaEIsTUFBTSxHQUFHQSxNQUFNO0VBQ3RCO0FBb0NGO0FBQUNpQixPQUFBLENBQUFDLE9BQUEsR0FBQXBCLGlCQUFBO0FBQUFxQixNQUFBLENBQUFGLE9BQUEsR0FBQUEsT0FBQSxDQUFBQyxPQUFBIn0=