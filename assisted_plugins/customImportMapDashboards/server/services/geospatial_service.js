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

class GeospatialService {
  constructor(driver) {
    _defineProperty(this, "uploadGeojson", async (context, req, res) => {
      try {
        const {
          callAsCurrentUser
        } = await this.driver.asScoped(req);
        const uploadResponse = await callAsCurrentUser('geospatial.geospatialQuery', {
          body: req.body
        });
        return res.ok({
          body: {
            ok: true,
            resp: uploadResponse
          }
        });
      } catch (err) {
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    this.driver = driver;
  }
}
exports.default = GeospatialService;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJHZW9zcGF0aWFsU2VydmljZSIsImNvbnN0cnVjdG9yIiwiZHJpdmVyIiwiX2RlZmluZVByb3BlcnR5IiwiY29udGV4dCIsInJlcSIsInJlcyIsImNhbGxBc0N1cnJlbnRVc2VyIiwiYXNTY29wZWQiLCJ1cGxvYWRSZXNwb25zZSIsImJvZHkiLCJvayIsInJlc3AiLCJlcnIiLCJtZXNzYWdlIiwiZXhwb3J0cyIsImRlZmF1bHQiLCJtb2R1bGUiXSwic291cmNlcyI6WyJnZW9zcGF0aWFsX3NlcnZpY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZW9zcGF0aWFsU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKGRyaXZlcikge1xuICAgIHRoaXMuZHJpdmVyID0gZHJpdmVyO1xuICB9XG5cbiAgdXBsb2FkR2VvanNvbiA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSBhd2FpdCB0aGlzLmRyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgdXBsb2FkUmVzcG9uc2UgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignZ2Vvc3BhdGlhbC5nZW9zcGF0aWFsUXVlcnknLCB7XG4gICAgICAgIGJvZHk6IHJlcS5ib2R5LFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3A6IHVwbG9hZFJlc3BvbnNlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZXNwOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsTUFBTUEsaUJBQWlCLENBQUM7RUFDckNDLFdBQVdBLENBQUNDLE1BQU0sRUFBRTtJQUFBQyxlQUFBLHdCQUlKLE9BQU9DLE9BQU8sRUFBRUMsR0FBRyxFQUFFQyxHQUFHLEtBQUs7TUFDM0MsSUFBSTtRQUNGLE1BQU07VUFBRUM7UUFBa0IsQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDTCxNQUFNLENBQUNNLFFBQVEsQ0FBQ0gsR0FBRyxDQUFDO1FBQzdELE1BQU1JLGNBQWMsR0FBRyxNQUFNRixpQkFBaUIsQ0FBQyw0QkFBNEIsRUFBRTtVQUMzRUcsSUFBSSxFQUFFTCxHQUFHLENBQUNLO1FBQ1osQ0FBQyxDQUFDO1FBQ0YsT0FBT0osR0FBRyxDQUFDSyxFQUFFLENBQUM7VUFDWkQsSUFBSSxFQUFFO1lBQ0pDLEVBQUUsRUFBRSxJQUFJO1lBQ1JDLElBQUksRUFBRUg7VUFDUjtRQUNGLENBQUMsQ0FBQztNQUNKLENBQUMsQ0FBQyxPQUFPSSxHQUFHLEVBQUU7UUFDWixPQUFPUCxHQUFHLENBQUNLLEVBQUUsQ0FBQztVQUNaRCxJQUFJLEVBQUU7WUFDSkMsRUFBRSxFQUFFLEtBQUs7WUFDVEMsSUFBSSxFQUFFQyxHQUFHLENBQUNDO1VBQ1o7UUFDRixDQUFDLENBQUM7TUFDSjtJQUNGLENBQUM7SUF2QkMsSUFBSSxDQUFDWixNQUFNLEdBQUdBLE1BQU07RUFDdEI7QUF1QkY7QUFBQ2EsT0FBQSxDQUFBQyxPQUFBLEdBQUFoQixpQkFBQTtBQUFBaUIsTUFBQSxDQUFBRixPQUFBLEdBQUFBLE9BQUEsQ0FBQUMsT0FBQSJ9