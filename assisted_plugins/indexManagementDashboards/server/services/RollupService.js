"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
class RollupService {
  constructor(osDriver) {
    _defineProperty(this, "osDriver", void 0);
    /**
     * Calls backend Put Rollup API
     */
    _defineProperty(this, "putRollup", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const {
          seqNo,
          primaryTerm
        } = request.query;
        let method = "ism.putRollup";
        let params = {
          rollupId: id,
          if_seq_no: seqNo,
          if_primary_term: primaryTerm,
          body: JSON.stringify(request.body)
        };
        if (seqNo === undefined || primaryTerm === undefined) {
          method = "ism.createRollup";
          params = {
            rollupId: id,
            body: JSON.stringify(request.body)
          };
        }
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const putRollupResponse = await callWithRequest(method, params);
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: putRollupResponse
          }
        });
      } catch (err) {
        console.error("Index Management - RollupService - putRollup", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });
    /**
     * Calls backend Delete Rollup API
     */
    _defineProperty(this, "deleteRollup", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          rollupId: id
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const deleteRollupResponse = await callWithRequest("ism.deleteRollup", params);
        if (deleteRollupResponse.result !== "deleted") {
          return response.custom({
            statusCode: 200,
            body: {
              ok: false,
              error: deleteRollupResponse.result
            }
          });
        }
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: true
          }
        });
      } catch (err) {
        console.error("Index Management - RollupService - deleteRollup:", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });
    _defineProperty(this, "startRollup", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          rollupId: id
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const startResponse = await callWithRequest("ism.startRollup", params);
        const acknowledged = _lodash.default.get(startResponse, "acknowledged");
        if (acknowledged) {
          return response.custom({
            statusCode: 200,
            body: {
              ok: true,
              response: true
            }
          });
        } else {
          return response.custom({
            statusCode: 200,
            body: {
              ok: false,
              error: "Failed to start rollup"
            }
          });
        }
      } catch (err) {
        console.error("Index Management - RollupService - startRollup:", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });
    _defineProperty(this, "stopRollup", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          rollupId: id
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const stopResponse = await callWithRequest("ism.stopRollup", params);
        const acknowledged = _lodash.default.get(stopResponse, "acknowledged");
        if (acknowledged) {
          return response.custom({
            statusCode: 200,
            body: {
              ok: true,
              response: true
            }
          });
        } else {
          return response.custom({
            statusCode: 200,
            body: {
              ok: false,
              error: "Failed to stop rollup"
            }
          });
        }
      } catch (err) {
        console.error("Index Management - RollupService - stopRollup:", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });
    /**
     * Calls backend Get Rollup API
     */
    _defineProperty(this, "getRollup", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          rollupId: id
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const getResponse = await callWithRequest("ism.getRollup", params);
        const metadata = await callWithRequest("ism.explainRollup", params);
        const rollup = _lodash.default.get(getResponse, "rollup", null);
        const seqNo = _lodash.default.get(getResponse, "_seq_no");
        const primaryTerm = _lodash.default.get(getResponse, "_primary_term");

        //Form response
        if (rollup) {
          if (metadata) {
            return response.custom({
              statusCode: 200,
              body: {
                ok: true,
                response: {
                  _id: id,
                  _seqNo: seqNo,
                  _primaryTerm: primaryTerm,
                  rollup: rollup,
                  metadata: metadata
                }
              }
            });
          } else return response.custom({
            statusCode: 200,
            body: {
              ok: false,
              error: "Failed to load metadata"
            }
          });
        } else {
          return response.custom({
            statusCode: 200,
            body: {
              ok: false,
              error: "Failed to load rollup"
            }
          });
        }
      } catch (err) {
        console.error("Index Management - RollupService - getRollup:", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });
    _defineProperty(this, "getMappings", async (context, request, response) => {
      try {
        const {
          index
        } = request.body;
        const params = {
          index: index
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const mappings = await callWithRequest("indices.getMapping", params);
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: mappings
          }
        });
      } catch (err) {
        console.error("Index Management - RollupService - getMapping:", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });
    /**
     * Performs a fuzzy search request on rollup id
     */
    _defineProperty(this, "getRollups", async (context, request, response) => {
      try {
        const {
          from,
          size,
          search,
          sortDirection,
          sortField
        } = request.query;
        const rollupSortMap = {
          _id: "rollup.rollup_id.keyword",
          "rollup.source_index": "rollup.source_index.keyword",
          "rollup.target_index": "rollup.target_index.keyword",
          "rollup.rollup.enabled": "rollup.enabled"
        };
        const params = {
          from: parseInt(from, 10),
          size: parseInt(size, 10),
          search,
          sortField: rollupSortMap[sortField] || rollupSortMap._id,
          sortDirection
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const getRollupResponse = await callWithRequest("ism.getRollups", params);
        const totalRollups = getRollupResponse.total_rollups;
        const rollups = getRollupResponse.rollups.map(rollup => ({
          _seqNo: rollup._seqNo,
          _primaryTerm: rollup._primaryTerm,
          _id: rollup._id,
          rollup: rollup.rollup,
          metadata: null
        }));

        // Call getExplain if any rollup job exists
        if (totalRollups) {
          // Concat rollup job ids
          const ids = rollups.map(rollup => rollup._id).join(",");
          const explainResponse = await callWithRequest("ism.explainRollup", {
            rollupId: ids
          });
          if (!explainResponse.error) {
            rollups.map(rollup => {
              rollup.metadata = explainResponse[rollup._id];
            });
            return response.custom({
              statusCode: 200,
              body: {
                ok: true,
                response: {
                  rollups: rollups,
                  totalRollups: totalRollups,
                  metadata: explainResponse
                }
              }
            });
          } else return response.custom({
            statusCode: 200,
            body: {
              ok: false,
              error: explainResponse ? explainResponse.error : "An error occurred when calling getExplain API."
            }
          });
        }
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: {
              rollups: rollups,
              totalRollups: totalRollups,
              metadata: {}
            }
          }
        });
      } catch (err) {
        if (err.statusCode === 404 && err.body.error.type === "index_not_found_exception") {
          return response.custom({
            statusCode: 200,
            body: {
              ok: true,
              response: {
                rollups: [],
                totalRollups: 0,
                metadata: null
              }
            }
          });
        }
        console.error("Index Management - RollupService - getRollups", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: "Error in getRollups " + err.message
          }
        });
      }
    });
    this.osDriver = osDriver;
  }
}
exports.default = RollupService;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbG9kYXNoIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsIl9kZWZpbmVQcm9wZXJ0eSIsImtleSIsInZhbHVlIiwiX3RvUHJvcGVydHlLZXkiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImFyZyIsIl90b1ByaW1pdGl2ZSIsIlN0cmluZyIsImlucHV0IiwiaGludCIsInByaW0iLCJTeW1ib2wiLCJ0b1ByaW1pdGl2ZSIsInVuZGVmaW5lZCIsInJlcyIsImNhbGwiLCJUeXBlRXJyb3IiLCJOdW1iZXIiLCJSb2xsdXBTZXJ2aWNlIiwiY29uc3RydWN0b3IiLCJvc0RyaXZlciIsImNvbnRleHQiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJpZCIsInBhcmFtcyIsInNlcU5vIiwicHJpbWFyeVRlcm0iLCJxdWVyeSIsIm1ldGhvZCIsInJvbGx1cElkIiwiaWZfc2VxX25vIiwiaWZfcHJpbWFyeV90ZXJtIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjYWxsQXNDdXJyZW50VXNlciIsImNhbGxXaXRoUmVxdWVzdCIsImFzU2NvcGVkIiwicHV0Um9sbHVwUmVzcG9uc2UiLCJjdXN0b20iLCJzdGF0dXNDb2RlIiwib2siLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJtZXNzYWdlIiwiZGVsZXRlUm9sbHVwUmVzcG9uc2UiLCJyZXN1bHQiLCJzdGFydFJlc3BvbnNlIiwiYWNrbm93bGVkZ2VkIiwiXyIsImdldCIsInN0b3BSZXNwb25zZSIsImdldFJlc3BvbnNlIiwibWV0YWRhdGEiLCJyb2xsdXAiLCJfaWQiLCJfc2VxTm8iLCJfcHJpbWFyeVRlcm0iLCJpbmRleCIsIm1hcHBpbmdzIiwiZnJvbSIsInNpemUiLCJzZWFyY2giLCJzb3J0RGlyZWN0aW9uIiwic29ydEZpZWxkIiwicm9sbHVwU29ydE1hcCIsInBhcnNlSW50IiwiZ2V0Um9sbHVwUmVzcG9uc2UiLCJ0b3RhbFJvbGx1cHMiLCJ0b3RhbF9yb2xsdXBzIiwicm9sbHVwcyIsIm1hcCIsImlkcyIsImpvaW4iLCJleHBsYWluUmVzcG9uc2UiLCJ0eXBlIiwiZXhwb3J0cyIsIm1vZHVsZSJdLCJzb3VyY2VzIjpbIlJvbGx1cFNlcnZpY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgXyBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQge1xuICBJTGVnYWN5Q3VzdG9tQ2x1c3RlckNsaWVudCxcbiAgT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgSU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2UsXG4gIFJlc3BvbnNlRXJyb3IsXG4gIFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbn0gZnJvbSBcIm9wZW5zZWFyY2gtZGFzaGJvYXJkcy9zZXJ2ZXJcIjtcbmltcG9ydCB7IERlbGV0ZVJvbGx1cFBhcmFtcywgRGVsZXRlUm9sbHVwUmVzcG9uc2UsIEdldFJvbGx1cHNSZXNwb25zZSwgUHV0Um9sbHVwUGFyYW1zLCBQdXRSb2xsdXBSZXNwb25zZSB9IGZyb20gXCIuLi9tb2RlbHMvaW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgU2VydmVyUmVzcG9uc2UgfSBmcm9tIFwiLi4vbW9kZWxzL3R5cGVzXCI7XG5pbXBvcnQgeyBEb2N1bWVudFJvbGx1cCwgUm9sbHVwIH0gZnJvbSBcIi4uLy4uL21vZGVscy9pbnRlcmZhY2VzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvbGx1cFNlcnZpY2Uge1xuICBvc0RyaXZlcjogSUxlZ2FjeUN1c3RvbUNsdXN0ZXJDbGllbnQ7XG5cbiAgY29uc3RydWN0b3Iob3NEcml2ZXI6IElMZWdhY3lDdXN0b21DbHVzdGVyQ2xpZW50KSB7XG4gICAgdGhpcy5vc0RyaXZlciA9IG9zRHJpdmVyO1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGxzIGJhY2tlbmQgUHV0IFJvbGx1cCBBUElcbiAgICovXG4gIHB1dFJvbGx1cCA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPFB1dFJvbGx1cFJlc3BvbnNlPiB8IFJlc3BvbnNlRXJyb3I+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcXVlc3QucGFyYW1zIGFzIHsgaWQ6IHN0cmluZyB9O1xuICAgICAgY29uc3QgeyBzZXFObywgcHJpbWFyeVRlcm0gfSA9IHJlcXVlc3QucXVlcnkgYXMgeyBzZXFObz86IHN0cmluZzsgcHJpbWFyeVRlcm0/OiBzdHJpbmcgfTtcbiAgICAgIGxldCBtZXRob2QgPSBcImlzbS5wdXRSb2xsdXBcIjtcbiAgICAgIGxldCBwYXJhbXM6IFB1dFJvbGx1cFBhcmFtcyA9IHtcbiAgICAgICAgcm9sbHVwSWQ6IGlkLFxuICAgICAgICBpZl9zZXFfbm86IHNlcU5vLFxuICAgICAgICBpZl9wcmltYXJ5X3Rlcm06IHByaW1hcnlUZXJtLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXF1ZXN0LmJvZHkpLFxuICAgICAgfTtcbiAgICAgIGlmIChzZXFObyA9PT0gdW5kZWZpbmVkIHx8IHByaW1hcnlUZXJtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbWV0aG9kID0gXCJpc20uY3JlYXRlUm9sbHVwXCI7XG4gICAgICAgIHBhcmFtcyA9IHsgcm9sbHVwSWQ6IGlkLCBib2R5OiBKU09OLnN0cmluZ2lmeShyZXF1ZXN0LmJvZHkpIH07XG4gICAgICB9XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMub3NEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCBwdXRSb2xsdXBSZXNwb25zZTogUHV0Um9sbHVwUmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QobWV0aG9kLCBwYXJhbXMpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3BvbnNlOiBwdXRSb2xsdXBSZXNwb25zZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkluZGV4IE1hbmFnZW1lbnQgLSBSb2xsdXBTZXJ2aWNlIC0gcHV0Um9sbHVwXCIsIGVycik7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2FsbHMgYmFja2VuZCBEZWxldGUgUm9sbHVwIEFQSVxuICAgKi9cbiAgZGVsZXRlUm9sbHVwID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8Ym9vbGVhbj4gfCBSZXNwb25zZUVycm9yPj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXF1ZXN0LnBhcmFtcyBhcyB7IGlkOiBzdHJpbmcgfTtcbiAgICAgIGNvbnN0IHBhcmFtczogRGVsZXRlUm9sbHVwUGFyYW1zID0geyByb2xsdXBJZDogaWQgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5vc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IGRlbGV0ZVJvbGx1cFJlc3BvbnNlOiBEZWxldGVSb2xsdXBSZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcImlzbS5kZWxldGVSb2xsdXBcIiwgcGFyYW1zKTtcbiAgICAgIGlmIChkZWxldGVSb2xsdXBSZXNwb25zZS5yZXN1bHQgIT09IFwiZGVsZXRlZFwiKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogZGVsZXRlUm9sbHVwUmVzcG9uc2UucmVzdWx0LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3BvbnNlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiSW5kZXggTWFuYWdlbWVudCAtIFJvbGx1cFNlcnZpY2UgLSBkZWxldGVSb2xsdXA6XCIsIGVycik7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBzdGFydFJvbGx1cCA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPGJvb2xlYW4+Pj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXF1ZXN0LnBhcmFtcyBhcyB7IGlkOiBzdHJpbmcgfTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgcm9sbHVwSWQ6IGlkIH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMub3NEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCBzdGFydFJlc3BvbnNlID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KFwiaXNtLnN0YXJ0Um9sbHVwXCIsIHBhcmFtcyk7XG4gICAgICBjb25zdCBhY2tub3dsZWRnZWQgPSBfLmdldChzdGFydFJlc3BvbnNlLCBcImFja25vd2xlZGdlZFwiKTtcbiAgICAgIGlmIChhY2tub3dsZWRnZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgIGJvZHk6IHsgb2s6IHRydWUsIHJlc3BvbnNlOiB0cnVlIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgIGJvZHk6IHsgb2s6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gc3RhcnQgcm9sbHVwXCIgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiSW5kZXggTWFuYWdlbWVudCAtIFJvbGx1cFNlcnZpY2UgLSBzdGFydFJvbGx1cDpcIiwgZXJyKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHsgb2s6IGZhbHNlLCBlcnJvcjogZXJyLm1lc3NhZ2UgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBzdG9wUm9sbHVwID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8Ym9vbGVhbj4+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcXVlc3QucGFyYW1zIGFzIHsgaWQ6IHN0cmluZyB9O1xuICAgICAgY29uc3QgcGFyYW1zID0geyByb2xsdXBJZDogaWQgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5vc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IHN0b3BSZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcImlzbS5zdG9wUm9sbHVwXCIsIHBhcmFtcyk7XG4gICAgICBjb25zdCBhY2tub3dsZWRnZWQgPSBfLmdldChzdG9wUmVzcG9uc2UsIFwiYWNrbm93bGVkZ2VkXCIpO1xuICAgICAgaWYgKGFja25vd2xlZGdlZCkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgYm9keTogeyBvazogdHJ1ZSwgcmVzcG9uc2U6IHRydWUgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgYm9keTogeyBvazogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBzdG9wIHJvbGx1cFwiIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkluZGV4IE1hbmFnZW1lbnQgLSBSb2xsdXBTZXJ2aWNlIC0gc3RvcFJvbGx1cDpcIiwgZXJyKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHsgb2s6IGZhbHNlLCBlcnJvcjogZXJyLm1lc3NhZ2UgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2FsbHMgYmFja2VuZCBHZXQgUm9sbHVwIEFQSVxuICAgKi9cbiAgZ2V0Um9sbHVwID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8RG9jdW1lbnRSb2xsdXA+Pj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXF1ZXN0LnBhcmFtcyBhcyB7IGlkOiBzdHJpbmcgfTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgcm9sbHVwSWQ6IGlkIH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMub3NEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCBnZXRSZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcImlzbS5nZXRSb2xsdXBcIiwgcGFyYW1zKTtcbiAgICAgIGNvbnN0IG1ldGFkYXRhID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KFwiaXNtLmV4cGxhaW5Sb2xsdXBcIiwgcGFyYW1zKTtcbiAgICAgIGNvbnN0IHJvbGx1cCA9IF8uZ2V0KGdldFJlc3BvbnNlLCBcInJvbGx1cFwiLCBudWxsKTtcbiAgICAgIGNvbnN0IHNlcU5vID0gXy5nZXQoZ2V0UmVzcG9uc2UsIFwiX3NlcV9ub1wiKTtcbiAgICAgIGNvbnN0IHByaW1hcnlUZXJtID0gXy5nZXQoZ2V0UmVzcG9uc2UsIFwiX3ByaW1hcnlfdGVybVwiKTtcblxuICAgICAgLy9Gb3JtIHJlc3BvbnNlXG4gICAgICBpZiAocm9sbHVwKSB7XG4gICAgICAgIGlmIChtZXRhZGF0YSkge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICAgICAgcmVzcG9uc2U6IHtcbiAgICAgICAgICAgICAgICBfaWQ6IGlkLFxuICAgICAgICAgICAgICAgIF9zZXFObzogc2VxTm8gYXMgbnVtYmVyLFxuICAgICAgICAgICAgICAgIF9wcmltYXJ5VGVybTogcHJpbWFyeVRlcm0gYXMgbnVtYmVyLFxuICAgICAgICAgICAgICAgIHJvbGx1cDogcm9sbHVwIGFzIFJvbGx1cCxcbiAgICAgICAgICAgICAgICBtZXRhZGF0YTogbWV0YWRhdGEsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2VcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgICAgICBlcnJvcjogXCJGYWlsZWQgdG8gbG9hZCBtZXRhZGF0YVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogXCJGYWlsZWQgdG8gbG9hZCByb2xsdXBcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbmRleCBNYW5hZ2VtZW50IC0gUm9sbHVwU2VydmljZSAtIGdldFJvbGx1cDpcIiwgZXJyKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGdldE1hcHBpbmdzID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8YW55Pj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpbmRleCB9ID0gcmVxdWVzdC5ib2R5IGFzIHsgaW5kZXg6IHN0cmluZyB9O1xuICAgICAgY29uc3QgcGFyYW1zID0geyBpbmRleDogaW5kZXggfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5vc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IG1hcHBpbmdzID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KFwiaW5kaWNlcy5nZXRNYXBwaW5nXCIsIHBhcmFtcyk7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcG9uc2U6IG1hcHBpbmdzLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiSW5kZXggTWFuYWdlbWVudCAtIFJvbGx1cFNlcnZpY2UgLSBnZXRNYXBwaW5nOlwiLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBQZXJmb3JtcyBhIGZ1enp5IHNlYXJjaCByZXF1ZXN0IG9uIHJvbGx1cCBpZFxuICAgKi9cbiAgZ2V0Um9sbHVwcyA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPEdldFJvbGx1cHNSZXNwb25zZT4+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgZnJvbSwgc2l6ZSwgc2VhcmNoLCBzb3J0RGlyZWN0aW9uLCBzb3J0RmllbGQgfSA9IHJlcXVlc3QucXVlcnkgYXMge1xuICAgICAgICBmcm9tOiBzdHJpbmc7XG4gICAgICAgIHNpemU6IHN0cmluZztcbiAgICAgICAgc2VhcmNoOiBzdHJpbmc7XG4gICAgICAgIHNvcnREaXJlY3Rpb246IHN0cmluZztcbiAgICAgICAgc29ydEZpZWxkOiBzdHJpbmc7XG4gICAgICB9O1xuXG4gICAgICBjb25zdCByb2xsdXBTb3J0TWFwOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICAgICAgICBfaWQ6IFwicm9sbHVwLnJvbGx1cF9pZC5rZXl3b3JkXCIsXG4gICAgICAgIFwicm9sbHVwLnNvdXJjZV9pbmRleFwiOiBcInJvbGx1cC5zb3VyY2VfaW5kZXgua2V5d29yZFwiLFxuICAgICAgICBcInJvbGx1cC50YXJnZXRfaW5kZXhcIjogXCJyb2xsdXAudGFyZ2V0X2luZGV4LmtleXdvcmRcIixcbiAgICAgICAgXCJyb2xsdXAucm9sbHVwLmVuYWJsZWRcIjogXCJyb2xsdXAuZW5hYmxlZFwiLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICBmcm9tOiBwYXJzZUludChmcm9tLCAxMCksXG4gICAgICAgIHNpemU6IHBhcnNlSW50KHNpemUsIDEwKSxcbiAgICAgICAgc2VhcmNoLFxuICAgICAgICBzb3J0RmllbGQ6IHJvbGx1cFNvcnRNYXBbc29ydEZpZWxkXSB8fCByb2xsdXBTb3J0TWFwLl9pZCxcbiAgICAgICAgc29ydERpcmVjdGlvbixcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5vc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IGdldFJvbGx1cFJlc3BvbnNlID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KFwiaXNtLmdldFJvbGx1cHNcIiwgcGFyYW1zKTtcbiAgICAgIGNvbnN0IHRvdGFsUm9sbHVwcyA9IGdldFJvbGx1cFJlc3BvbnNlLnRvdGFsX3JvbGx1cHM7XG4gICAgICBjb25zdCByb2xsdXBzID0gZ2V0Um9sbHVwUmVzcG9uc2Uucm9sbHVwcy5tYXAoKHJvbGx1cDogRG9jdW1lbnRSb2xsdXApID0+ICh7XG4gICAgICAgIF9zZXFObzogcm9sbHVwLl9zZXFObyBhcyBudW1iZXIsXG4gICAgICAgIF9wcmltYXJ5VGVybTogcm9sbHVwLl9wcmltYXJ5VGVybSBhcyBudW1iZXIsXG4gICAgICAgIF9pZDogcm9sbHVwLl9pZCxcbiAgICAgICAgcm9sbHVwOiByb2xsdXAucm9sbHVwLFxuICAgICAgICBtZXRhZGF0YTogbnVsbCxcbiAgICAgIH0pKTtcblxuICAgICAgLy8gQ2FsbCBnZXRFeHBsYWluIGlmIGFueSByb2xsdXAgam9iIGV4aXN0c1xuICAgICAgaWYgKHRvdGFsUm9sbHVwcykge1xuICAgICAgICAvLyBDb25jYXQgcm9sbHVwIGpvYiBpZHNcbiAgICAgICAgY29uc3QgaWRzID0gcm9sbHVwcy5tYXAoKHJvbGx1cDogRG9jdW1lbnRSb2xsdXApID0+IHJvbGx1cC5faWQpLmpvaW4oXCIsXCIpO1xuICAgICAgICBjb25zdCBleHBsYWluUmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJpc20uZXhwbGFpblJvbGx1cFwiLCB7IHJvbGx1cElkOiBpZHMgfSk7XG4gICAgICAgIGlmICghZXhwbGFpblJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgcm9sbHVwcy5tYXAoKHJvbGx1cDogRG9jdW1lbnRSb2xsdXApID0+IHtcbiAgICAgICAgICAgIHJvbGx1cC5tZXRhZGF0YSA9IGV4cGxhaW5SZXNwb25zZVtyb2xsdXAuX2lkXTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgICAgIGJvZHk6IHsgb2s6IHRydWUsIHJlc3BvbnNlOiB7IHJvbGx1cHM6IHJvbGx1cHMsIHRvdGFsUm9sbHVwczogdG90YWxSb2xsdXBzLCBtZXRhZGF0YTogZXhwbGFpblJlc3BvbnNlIH0gfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlXG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICAgICAgZXJyb3I6IGV4cGxhaW5SZXNwb25zZSA/IGV4cGxhaW5SZXNwb25zZS5lcnJvciA6IFwiQW4gZXJyb3Igb2NjdXJyZWQgd2hlbiBjYWxsaW5nIGdldEV4cGxhaW4gQVBJLlwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHsgb2s6IHRydWUsIHJlc3BvbnNlOiB7IHJvbGx1cHM6IHJvbGx1cHMsIHRvdGFsUm9sbHVwczogdG90YWxSb2xsdXBzLCBtZXRhZGF0YToge30gfSB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoZXJyLnN0YXR1c0NvZGUgPT09IDQwNCAmJiBlcnIuYm9keS5lcnJvci50eXBlID09PSBcImluZGV4X25vdF9mb3VuZF9leGNlcHRpb25cIikge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgYm9keTogeyBvazogdHJ1ZSwgcmVzcG9uc2U6IHsgcm9sbHVwczogW10sIHRvdGFsUm9sbHVwczogMCwgbWV0YWRhdGE6IG51bGwgfSB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbmRleCBNYW5hZ2VtZW50IC0gUm9sbHVwU2VydmljZSAtIGdldFJvbGx1cHNcIiwgZXJyKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgZXJyb3I6IFwiRXJyb3IgaW4gZ2V0Um9sbHVwcyBcIiArIGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQSxJQUFBQSxPQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFBdUIsU0FBQUQsdUJBQUFFLEdBQUEsV0FBQUEsR0FBQSxJQUFBQSxHQUFBLENBQUFDLFVBQUEsR0FBQUQsR0FBQSxLQUFBRSxPQUFBLEVBQUFGLEdBQUE7QUFBQSxTQUFBRyxnQkFBQUgsR0FBQSxFQUFBSSxHQUFBLEVBQUFDLEtBQUEsSUFBQUQsR0FBQSxHQUFBRSxjQUFBLENBQUFGLEdBQUEsT0FBQUEsR0FBQSxJQUFBSixHQUFBLElBQUFPLE1BQUEsQ0FBQUMsY0FBQSxDQUFBUixHQUFBLEVBQUFJLEdBQUEsSUFBQUMsS0FBQSxFQUFBQSxLQUFBLEVBQUFJLFVBQUEsUUFBQUMsWUFBQSxRQUFBQyxRQUFBLG9CQUFBWCxHQUFBLENBQUFJLEdBQUEsSUFBQUMsS0FBQSxXQUFBTCxHQUFBO0FBQUEsU0FBQU0sZUFBQU0sR0FBQSxRQUFBUixHQUFBLEdBQUFTLFlBQUEsQ0FBQUQsR0FBQSwyQkFBQVIsR0FBQSxnQkFBQUEsR0FBQSxHQUFBVSxNQUFBLENBQUFWLEdBQUE7QUFBQSxTQUFB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