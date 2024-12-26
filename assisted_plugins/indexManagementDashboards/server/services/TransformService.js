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
class TransformService {
  constructor(esDriver) {
    _defineProperty(this, "esDriver", void 0);
    _defineProperty(this, "getTransforms", async (context, request, response) => {
      try {
        const {
          from,
          size,
          search,
          sortDirection,
          sortField
        } = request.query;
        const transformSortMap = {
          _id: "transform.transform_id.keyword",
          "transform.source_index": "transform.source_index.keyword",
          "transform.target_index": "transform.target_index.keyword",
          "transform.transform.enabled": "transform.enabled"
        };
        const params = {
          from: parseInt(from, 10),
          size: parseInt(size, 10),
          search,
          sortField: transformSortMap[sortField] || transformSortMap._id,
          sortDirection
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.esDriver.asScoped(request);
        const getTransformsResponse = await callWithRequest("ism.getTransforms", params);
        const totalTransforms = getTransformsResponse.total_transforms;
        const transforms = getTransformsResponse.transforms.map(transform => ({
          _seqNo: transform._seqNo,
          _primaryTerm: transform._primaryTerm,
          _id: transform._id,
          transform: transform.transform,
          metadata: null
        }));
        if (totalTransforms) {
          const ids = transforms.map(transform => transform._id).join(",");
          const explainResponse = await callWithRequest("ism.explainTransform", {
            transformId: ids
          });
          if (!explainResponse.error) {
            transforms.map(transform => {
              transform.metadata = explainResponse[transform._id];
            });
            return response.custom({
              statusCode: 200,
              body: {
                ok: true,
                response: {
                  transforms: transforms,
                  totalTransforms: totalTransforms,
                  metadata: explainResponse
                }
              }
            });
          } else {
            return response.custom({
              statusCode: 200,
              body: {
                ok: false,
                error: explainResponse ? explainResponse.error : "An error occurred when calling getExplain API."
              }
            });
          }
        }
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: {
              transforms: transforms,
              totalTransforms: totalTransforms,
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
                transforms: [],
                totalTransforms: 0,
                metadata: null
              }
            }
          });
        }
        console.error("Index Management - TransformService - getTransforms", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: "Error in getTransforms" + err.message
          }
        });
      }
    });
    _defineProperty(this, "getTransform", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          transformId: id
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.esDriver.asScoped(request);
        const getResponse = await callWithRequest("ism.getTransform", params);
        const metadata = await callWithRequest("ism.explainTransform", params);
        const transform = _lodash.default.get(getResponse, "transform", null);
        const seqNo = _lodash.default.get(getResponse, "_seq_no", null);
        const primaryTerm = _lodash.default.get(getResponse, "_primary_term", null);
        if (transform) {
          if (metadata) {
            return response.custom({
              statusCode: 200,
              body: {
                ok: true,
                response: {
                  _id: id,
                  _seqNo: seqNo,
                  _primaryTerm: primaryTerm,
                  transform: transform,
                  metadata: metadata
                }
              }
            });
          } else {
            return response.custom({
              statusCode: 200,
              body: {
                ok: false,
                error: "Failed to load metadata for transform"
              }
            });
          }
        } else {
          return response.custom({
            statusCode: 200,
            body: {
              ok: false,
              error: "Failed to load transform"
            }
          });
        }
      } catch (err) {
        console.error("Index Management - TransformService - getTransform:", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });
    _defineProperty(this, "startTransform", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          transformId: id
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.esDriver.asScoped(request);
        const startResponse = await callWithRequest("ism.startTransform", params);
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
              error: "Failed to start transform"
            }
          });
        }
      } catch (err) {
        console.error("Index Management - TransformService - startTransform", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });
    _defineProperty(this, "stopTransform", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          transformId: id
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.esDriver.asScoped(request);
        const stopResponse = await callWithRequest("ism.stopTransform", params);
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
              error: "Failed to stop transform"
            }
          });
        }
      } catch (err) {
        console.error("Index Management - TransformService - stopTransform", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });
    _defineProperty(this, "deleteTransform", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          transformId: id
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.esDriver.asScoped(request);
        const deleteResponse = await callWithRequest("ism.deleteTransform", params);
        if (!deleteResponse.errors) {
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
              error: "Failed to delete transform"
            }
          });
        }
      } catch (err) {
        console.error("Index Management - TransformService - deleteTransform", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });
    _defineProperty(this, "putTransform", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const {
          seqNo,
          primaryTerm
        } = request.query;
        let method = "ism.putTransform";
        let params = {
          transformId: id,
          if_seq_no: seqNo,
          if_primary_term: primaryTerm,
          body: JSON.stringify(request.body)
        };
        if (seqNo === undefined || primaryTerm === undefined) {
          method = "ism.putTransform";
          params = {
            transformId: id,
            body: JSON.stringify(request.body)
          };
        }
        const {
          callAsCurrentUser: callWithRequest
        } = this.esDriver.asScoped(request);
        const putTransformResponse = await callWithRequest(method, params);
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: putTransformResponse
          }
        });
      } catch (err) {
        console.error("Index Management - TransformService - putTransform", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });
    _defineProperty(this, "searchSampleData", async (context, request, response) => {
      try {
        const {
          from,
          size
        } = request.query;
        const {
          index
        } = request.params;
        let params = {
          index: index,
          from: from,
          size: size,
          body: request.body ? JSON.stringify({
            query: request.body
          }) : {}
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.esDriver.asScoped(request);
        const searchResponse = await callWithRequest("search", params);
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: {
              total: searchResponse.hits.total,
              data: searchResponse.hits.hits
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
                total: 0,
                data: []
              }
            }
          });
        }
        console.error("Index Management - TransformService - searchSampleData", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });
    _defineProperty(this, "previewTransform", async (context, request, response) => {
      try {
        let params = {
          body: JSON.stringify(request.body)
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.esDriver.asScoped(request);
        const previewResponse = await callWithRequest("ism.previewTransform", params);
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: previewResponse
          }
        });
      } catch (err) {
        console.error("Index Management - TransformService - previewTransform", err);
        return response.custom({
          statusCode: 200,
          body: {
            ok: false,
            error: err.message
          }
        });
      }
    });
    this.esDriver = esDriver;
  }
}
exports.default = TransformService;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbG9kYXNoIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsIl9kZWZpbmVQcm9wZXJ0eSIsImtleSIsInZhbHVlIiwiX3RvUHJvcGVydHlLZXkiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImFyZyIsIl90b1ByaW1pdGl2ZSIsIlN0cmluZyIsImlucHV0IiwiaGludCIsInByaW0iLCJTeW1ib2wiLCJ0b1ByaW1pdGl2ZSIsInVuZGVmaW5lZCIsInJlcyIsImNhbGwiLCJUeXBlRXJyb3IiLCJOdW1iZXIiLCJUcmFuc2Zvcm1TZXJ2aWNlIiwiY29uc3RydWN0b3IiLCJlc0RyaXZlciIsImNvbnRleHQiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJmcm9tIiwic2l6ZSIsInNlYXJjaCIsInNvcnREaXJlY3Rpb24iLCJzb3J0RmllbGQiLCJxdWVyeSIsInRyYW5zZm9ybVNvcnRNYXAiLCJfaWQiLCJwYXJhbXMiLCJwYXJzZUludCIsImNhbGxBc0N1cnJlbnRVc2VyIiwiY2FsbFdpdGhSZXF1ZXN0IiwiYXNTY29wZWQiLCJnZXRUcmFuc2Zvcm1zUmVzcG9uc2UiLCJ0b3RhbFRyYW5zZm9ybXMiLCJ0b3RhbF90cmFuc2Zvcm1zIiwidHJhbnNmb3JtcyIsIm1hcCIsInRyYW5zZm9ybSIsIl9zZXFObyIsIl9wcmltYXJ5VGVybSIsIm1ldGFkYXRhIiwiaWRzIiwiam9pbiIsImV4cGxhaW5SZXNwb25zZSIsInRyYW5zZm9ybUlkIiwiZXJyb3IiLCJjdXN0b20iLCJzdGF0dXNDb2RlIiwiYm9keSIsIm9rIiwiZXJyIiwidHlwZSIsImNvbnNvbGUiLCJtZXNzYWdlIiwiaWQiLCJnZXRSZXNwb25zZSIsIl8iLCJnZXQiLCJzZXFObyIsInByaW1hcnlUZXJtIiwic3RhcnRSZXNwb25zZSIsImFja25vd2xlZGdlZCIsInN0b3BSZXNwb25zZSIsImRlbGV0ZVJlc3BvbnNlIiwiZXJyb3JzIiwibWV0aG9kIiwiaWZfc2VxX25vIiwiaWZfcHJpbWFyeV90ZXJtIiwiSlNPTiIsInN0cmluZ2lmeSIsInB1dFRyYW5zZm9ybVJlc3BvbnNlIiwiaW5kZXgiLCJzZWFyY2hSZXNwb25zZSIsInRvdGFsIiwiaGl0cyIsImRhdGEiLCJwcmV2aWV3UmVzcG9uc2UiLCJleHBvcnRzIiwibW9kdWxlIl0sInNvdXJjZXMiOlsiVHJhbnNmb3JtU2VydmljZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCB7XG4gIElDbHVzdGVyQ2xpZW50LFxuICBJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZSxcbiAgT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeSxcbiAgUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxufSBmcm9tIFwib3BlbnNlYXJjaC1kYXNoYm9hcmRzL3NlcnZlclwiO1xuaW1wb3J0IHsgU2VydmVyUmVzcG9uc2UgfSBmcm9tIFwiLi4vbW9kZWxzL3R5cGVzXCI7XG5pbXBvcnQge1xuICBHZXRUcmFuc2Zvcm1zUmVzcG9uc2UsXG4gIFByZXZpZXdUcmFuc2Zvcm1SZXNwb25zZSxcbiAgUHV0VHJhbnNmb3JtUGFyYW1zLFxuICBQdXRUcmFuc2Zvcm1SZXNwb25zZSxcbiAgU2VhcmNoUmVzcG9uc2UsXG59IGZyb20gXCIuLi9tb2RlbHMvaW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgRG9jdW1lbnRUcmFuc2Zvcm0sIFRyYW5zZm9ybSB9IGZyb20gXCIuLi8uLi9tb2RlbHMvaW50ZXJmYWNlc1wiO1xuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUcmFuc2Zvcm1TZXJ2aWNlIHtcbiAgZXNEcml2ZXI6IElDbHVzdGVyQ2xpZW50O1xuXG4gIGNvbnN0cnVjdG9yKGVzRHJpdmVyOiBJQ2x1c3RlckNsaWVudCkge1xuICAgIHRoaXMuZXNEcml2ZXIgPSBlc0RyaXZlcjtcbiAgfVxuXG4gIGdldFRyYW5zZm9ybXMgPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxHZXRUcmFuc2Zvcm1zUmVzcG9uc2U+Pj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGZyb20sIHNpemUsIHNlYXJjaCwgc29ydERpcmVjdGlvbiwgc29ydEZpZWxkIH0gPSByZXF1ZXN0LnF1ZXJ5IGFzIHtcbiAgICAgICAgZnJvbTogbnVtYmVyO1xuICAgICAgICBzaXplOiBudW1iZXI7XG4gICAgICAgIHNlYXJjaDogc3RyaW5nO1xuICAgICAgICBzb3J0RGlyZWN0aW9uOiBzdHJpbmc7XG4gICAgICAgIHNvcnRGaWVsZDogc3RyaW5nO1xuICAgICAgfTtcblxuICAgICAgY29uc3QgdHJhbnNmb3JtU29ydE1hcDogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHtcbiAgICAgICAgX2lkOiBcInRyYW5zZm9ybS50cmFuc2Zvcm1faWQua2V5d29yZFwiLFxuICAgICAgICBcInRyYW5zZm9ybS5zb3VyY2VfaW5kZXhcIjogXCJ0cmFuc2Zvcm0uc291cmNlX2luZGV4LmtleXdvcmRcIixcbiAgICAgICAgXCJ0cmFuc2Zvcm0udGFyZ2V0X2luZGV4XCI6IFwidHJhbnNmb3JtLnRhcmdldF9pbmRleC5rZXl3b3JkXCIsXG4gICAgICAgIFwidHJhbnNmb3JtLnRyYW5zZm9ybS5lbmFibGVkXCI6IFwidHJhbnNmb3JtLmVuYWJsZWRcIixcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgZnJvbTogcGFyc2VJbnQoZnJvbSwgMTApLFxuICAgICAgICBzaXplOiBwYXJzZUludChzaXplLCAxMCksXG4gICAgICAgIHNlYXJjaCxcbiAgICAgICAgc29ydEZpZWxkOiB0cmFuc2Zvcm1Tb3J0TWFwW3NvcnRGaWVsZF0gfHwgdHJhbnNmb3JtU29ydE1hcC5faWQsXG4gICAgICAgIHNvcnREaXJlY3Rpb24sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCBnZXRUcmFuc2Zvcm1zUmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJpc20uZ2V0VHJhbnNmb3Jtc1wiLCBwYXJhbXMpO1xuICAgICAgY29uc3QgdG90YWxUcmFuc2Zvcm1zID0gZ2V0VHJhbnNmb3Jtc1Jlc3BvbnNlLnRvdGFsX3RyYW5zZm9ybXM7XG4gICAgICBjb25zdCB0cmFuc2Zvcm1zID0gZ2V0VHJhbnNmb3Jtc1Jlc3BvbnNlLnRyYW5zZm9ybXMubWFwKCh0cmFuc2Zvcm06IERvY3VtZW50VHJhbnNmb3JtKSA9PiAoe1xuICAgICAgICBfc2VxTm86IHRyYW5zZm9ybS5fc2VxTm8gYXMgbnVtYmVyLFxuICAgICAgICBfcHJpbWFyeVRlcm06IHRyYW5zZm9ybS5fcHJpbWFyeVRlcm0gYXMgbnVtYmVyLFxuICAgICAgICBfaWQ6IHRyYW5zZm9ybS5faWQsXG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtLnRyYW5zZm9ybSxcbiAgICAgICAgbWV0YWRhdGE6IG51bGwsXG4gICAgICB9KSk7XG4gICAgICBpZiAodG90YWxUcmFuc2Zvcm1zKSB7XG4gICAgICAgIGNvbnN0IGlkcyA9IHRyYW5zZm9ybXMubWFwKCh0cmFuc2Zvcm06IERvY3VtZW50VHJhbnNmb3JtKSA9PiB0cmFuc2Zvcm0uX2lkKS5qb2luKFwiLFwiKTtcbiAgICAgICAgY29uc3QgZXhwbGFpblJlc3BvbnNlID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KFwiaXNtLmV4cGxhaW5UcmFuc2Zvcm1cIiwgeyB0cmFuc2Zvcm1JZDogaWRzIH0pO1xuICAgICAgICBpZiAoIWV4cGxhaW5SZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgIHRyYW5zZm9ybXMubWFwKCh0cmFuc2Zvcm06IERvY3VtZW50VHJhbnNmb3JtKSA9PiB7XG4gICAgICAgICAgICB0cmFuc2Zvcm0ubWV0YWRhdGEgPSBleHBsYWluUmVzcG9uc2VbdHJhbnNmb3JtLl9pZF07XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgICAgIHJlc3BvbnNlOiB7IHRyYW5zZm9ybXM6IHRyYW5zZm9ybXMsIHRvdGFsVHJhbnNmb3JtczogdG90YWxUcmFuc2Zvcm1zLCBtZXRhZGF0YTogZXhwbGFpblJlc3BvbnNlIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgICAgIGVycm9yOiBleHBsYWluUmVzcG9uc2UgPyBleHBsYWluUmVzcG9uc2UuZXJyb3IgOiBcIkFuIGVycm9yIG9jY3VycmVkIHdoZW4gY2FsbGluZyBnZXRFeHBsYWluIEFQSS5cIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keTogeyBvazogdHJ1ZSwgcmVzcG9uc2U6IHsgdHJhbnNmb3JtczogdHJhbnNmb3JtcywgdG90YWxUcmFuc2Zvcm1zOiB0b3RhbFRyYW5zZm9ybXMsIG1ldGFkYXRhOiB7fSB9IH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIuc3RhdHVzQ29kZSA9PT0gNDA0ICYmIGVyci5ib2R5LmVycm9yLnR5cGUgPT09IFwiaW5kZXhfbm90X2ZvdW5kX2V4Y2VwdGlvblwiKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgICBib2R5OiB7IG9rOiB0cnVlLCByZXNwb25zZTogeyB0cmFuc2Zvcm1zOiBbXSwgdG90YWxUcmFuc2Zvcm1zOiAwLCBtZXRhZGF0YTogbnVsbCB9IH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgY29uc29sZS5lcnJvcihcIkluZGV4IE1hbmFnZW1lbnQgLSBUcmFuc2Zvcm1TZXJ2aWNlIC0gZ2V0VHJhbnNmb3Jtc1wiLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICBlcnJvcjogXCJFcnJvciBpbiBnZXRUcmFuc2Zvcm1zXCIgKyBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBnZXRUcmFuc2Zvcm0gPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxEb2N1bWVudFRyYW5zZm9ybT4+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcXVlc3QucGFyYW1zIGFzIHsgaWQ6IHN0cmluZyB9O1xuICAgICAgY29uc3QgcGFyYW1zID0geyB0cmFuc2Zvcm1JZDogaWQgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IGdldFJlc3BvbnNlID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KFwiaXNtLmdldFRyYW5zZm9ybVwiLCBwYXJhbXMpO1xuICAgICAgY29uc3QgbWV0YWRhdGEgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJpc20uZXhwbGFpblRyYW5zZm9ybVwiLCBwYXJhbXMpO1xuICAgICAgY29uc3QgdHJhbnNmb3JtID0gXy5nZXQoZ2V0UmVzcG9uc2UsIFwidHJhbnNmb3JtXCIsIG51bGwpO1xuICAgICAgY29uc3Qgc2VxTm8gPSBfLmdldChnZXRSZXNwb25zZSwgXCJfc2VxX25vXCIsIG51bGwpO1xuICAgICAgY29uc3QgcHJpbWFyeVRlcm0gPSBfLmdldChnZXRSZXNwb25zZSwgXCJfcHJpbWFyeV90ZXJtXCIsIG51bGwpO1xuXG4gICAgICBpZiAodHJhbnNmb3JtKSB7XG4gICAgICAgIGlmIChtZXRhZGF0YSkge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICAgICAgcmVzcG9uc2U6IHtcbiAgICAgICAgICAgICAgICBfaWQ6IGlkLFxuICAgICAgICAgICAgICAgIF9zZXFObzogc2VxTm8gYXMgbnVtYmVyLFxuICAgICAgICAgICAgICAgIF9wcmltYXJ5VGVybTogcHJpbWFyeVRlcm0gYXMgbnVtYmVyLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtIGFzIFRyYW5zZm9ybSxcbiAgICAgICAgICAgICAgICBtZXRhZGF0YTogbWV0YWRhdGEsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgICAgIGVycm9yOiBcIkZhaWxlZCB0byBsb2FkIG1ldGFkYXRhIGZvciB0cmFuc2Zvcm1cIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgICBlcnJvcjogXCJGYWlsZWQgdG8gbG9hZCB0cmFuc2Zvcm1cIixcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbmRleCBNYW5hZ2VtZW50IC0gVHJhbnNmb3JtU2VydmljZSAtIGdldFRyYW5zZm9ybTpcIiwgZXJyKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgZXJyb3I6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHN0YXJ0VHJhbnNmb3JtID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8Ym9vbGVhbj4+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcXVlc3QucGFyYW1zIGFzIHsgaWQ6IHN0cmluZyB9O1xuICAgICAgY29uc3QgcGFyYW1zID0geyB0cmFuc2Zvcm1JZDogaWQgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IHN0YXJ0UmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJpc20uc3RhcnRUcmFuc2Zvcm1cIiwgcGFyYW1zKTtcbiAgICAgIGNvbnN0IGFja25vd2xlZGdlZCA9IF8uZ2V0KHN0YXJ0UmVzcG9uc2UsIFwiYWNrbm93bGVkZ2VkXCIpO1xuICAgICAgaWYgKGFja25vd2xlZGdlZCkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgYm9keTogeyBvazogdHJ1ZSwgcmVzcG9uc2U6IHRydWUgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgYm9keTogeyBvazogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBzdGFydCB0cmFuc2Zvcm1cIiB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbmRleCBNYW5hZ2VtZW50IC0gVHJhbnNmb3JtU2VydmljZSAtIHN0YXJ0VHJhbnNmb3JtXCIsIGVycik7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7IG9rOiBmYWxzZSwgZXJyb3I6IGVyci5tZXNzYWdlIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgc3RvcFRyYW5zZm9ybSA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPGJvb2xlYW4+Pj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXF1ZXN0LnBhcmFtcyBhcyB7IGlkOiBzdHJpbmcgfTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgdHJhbnNmb3JtSWQ6IGlkIH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCBzdG9wUmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJpc20uc3RvcFRyYW5zZm9ybVwiLCBwYXJhbXMpO1xuICAgICAgY29uc3QgYWNrbm93bGVkZ2VkID0gXy5nZXQoc3RvcFJlc3BvbnNlLCBcImFja25vd2xlZGdlZFwiKTtcbiAgICAgIGlmIChhY2tub3dsZWRnZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgIGJvZHk6IHsgb2s6IHRydWUsIHJlc3BvbnNlOiB0cnVlIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgIGJvZHk6IHsgb2s6IGZhbHNlLCBlcnJvcjogXCJGYWlsZWQgdG8gc3RvcCB0cmFuc2Zvcm1cIiB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbmRleCBNYW5hZ2VtZW50IC0gVHJhbnNmb3JtU2VydmljZSAtIHN0b3BUcmFuc2Zvcm1cIiwgZXJyKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHsgb2s6IGZhbHNlLCBlcnJvcjogZXJyLm1lc3NhZ2UgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBkZWxldGVUcmFuc2Zvcm0gPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxib29sZWFuPj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxdWVzdC5wYXJhbXMgYXMgeyBpZDogc3RyaW5nIH07XG4gICAgICBjb25zdCBwYXJhbXMgPSB7IHRyYW5zZm9ybUlkOiBpZCB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogY2FsbFdpdGhSZXF1ZXN0IH0gPSB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgY29uc3QgZGVsZXRlUmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJpc20uZGVsZXRlVHJhbnNmb3JtXCIsIHBhcmFtcyk7XG4gICAgICBpZiAoIWRlbGV0ZVJlc3BvbnNlLmVycm9ycykge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgYm9keTogeyBvazogdHJ1ZSwgcmVzcG9uc2U6IHRydWUgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgYm9keTogeyBvazogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBkZWxldGUgdHJhbnNmb3JtXCIgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiSW5kZXggTWFuYWdlbWVudCAtIFRyYW5zZm9ybVNlcnZpY2UgLSBkZWxldGVUcmFuc2Zvcm1cIiwgZXJyKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHsgb2s6IGZhbHNlLCBlcnJvcjogZXJyLm1lc3NhZ2UgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBwdXRUcmFuc2Zvcm0gPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxQdXRUcmFuc2Zvcm1SZXNwb25zZT4+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcXVlc3QucGFyYW1zIGFzIHsgaWQ6IHN0cmluZyB9O1xuICAgICAgY29uc3QgeyBzZXFObywgcHJpbWFyeVRlcm0gfSA9IHJlcXVlc3QucXVlcnkgYXMgeyBzZXFObz86IHN0cmluZzsgcHJpbWFyeVRlcm0/OiBzdHJpbmcgfTtcbiAgICAgIGxldCBtZXRob2QgPSBcImlzbS5wdXRUcmFuc2Zvcm1cIjtcbiAgICAgIGxldCBwYXJhbXM6IFB1dFRyYW5zZm9ybVBhcmFtcyA9IHtcbiAgICAgICAgdHJhbnNmb3JtSWQ6IGlkLFxuICAgICAgICBpZl9zZXFfbm86IHNlcU5vLFxuICAgICAgICBpZl9wcmltYXJ5X3Rlcm06IHByaW1hcnlUZXJtLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXF1ZXN0LmJvZHkpLFxuICAgICAgfTtcbiAgICAgIGlmIChzZXFObyA9PT0gdW5kZWZpbmVkIHx8IHByaW1hcnlUZXJtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbWV0aG9kID0gXCJpc20ucHV0VHJhbnNmb3JtXCI7XG4gICAgICAgIHBhcmFtcyA9IHsgdHJhbnNmb3JtSWQ6IGlkLCBib2R5OiBKU09OLnN0cmluZ2lmeShyZXF1ZXN0LmJvZHkpIH07XG4gICAgICB9XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCBwdXRUcmFuc2Zvcm1SZXNwb25zZTogUHV0VHJhbnNmb3JtUmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QobWV0aG9kLCBwYXJhbXMpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3BvbnNlOiBwdXRUcmFuc2Zvcm1SZXNwb25zZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkluZGV4IE1hbmFnZW1lbnQgLSBUcmFuc2Zvcm1TZXJ2aWNlIC0gcHV0VHJhbnNmb3JtXCIsIGVycik7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBzZWFyY2hTYW1wbGVEYXRhID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8YW55Pj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBmcm9tLCBzaXplIH0gPSByZXF1ZXN0LnF1ZXJ5IGFzIHtcbiAgICAgICAgZnJvbTogbnVtYmVyO1xuICAgICAgICBzaXplOiBudW1iZXI7XG4gICAgICB9O1xuICAgICAgY29uc3QgeyBpbmRleCB9ID0gcmVxdWVzdC5wYXJhbXMgYXMgeyBpbmRleDogc3RyaW5nIH07XG4gICAgICBsZXQgcGFyYW1zID0ge1xuICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgIGZyb206IGZyb20sXG4gICAgICAgIHNpemU6IHNpemUsXG4gICAgICAgIGJvZHk6IHJlcXVlc3QuYm9keSA/IEpTT04uc3RyaW5naWZ5KHsgcXVlcnk6IHJlcXVlc3QuYm9keSB9KSA6IHt9LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IHNlYXJjaFJlc3BvbnNlOiBTZWFyY2hSZXNwb25zZTxhbnk+ID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KFwic2VhcmNoXCIsIHBhcmFtcyk7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcG9uc2U6IHtcbiAgICAgICAgICAgIHRvdGFsOiBzZWFyY2hSZXNwb25zZS5oaXRzLnRvdGFsLFxuICAgICAgICAgICAgZGF0YTogc2VhcmNoUmVzcG9uc2UuaGl0cy5oaXRzLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIuc3RhdHVzQ29kZSA9PT0gNDA0ICYmIGVyci5ib2R5LmVycm9yLnR5cGUgPT09IFwiaW5kZXhfbm90X2ZvdW5kX2V4Y2VwdGlvblwiKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICAgIHJlc3BvbnNlOiB7XG4gICAgICAgICAgICAgIHRvdGFsOiAwLFxuICAgICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmVycm9yKFwiSW5kZXggTWFuYWdlbWVudCAtIFRyYW5zZm9ybVNlcnZpY2UgLSBzZWFyY2hTYW1wbGVEYXRhXCIsIGVycik7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBwcmV2aWV3VHJhbnNmb3JtID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8UHJldmlld1RyYW5zZm9ybVJlc3BvbnNlPj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IHBhcmFtcyA9IHtcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVxdWVzdC5ib2R5KSxcbiAgICAgIH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCBwcmV2aWV3UmVzcG9uc2U6IFByZXZpZXdUcmFuc2Zvcm1SZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcImlzbS5wcmV2aWV3VHJhbnNmb3JtXCIsIHBhcmFtcyk7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcG9uc2U6IHByZXZpZXdSZXNwb25zZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkluZGV4IE1hbmFnZW1lbnQgLSBUcmFuc2Zvcm1TZXJ2aWNlIC0gcHJldmlld1RyYW5zZm9ybVwiLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICBlcnJvcjogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQXFCQSxJQUFBQSxPQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFBdUIsU0FBQUQsdUJBQUFFLEdBQUEsV0FBQUEsR0FBQSxJQUFBQSxHQUFBLENBQUFDLFVBQUEsR0FBQUQsR0FBQSxLQUFBRSxPQUFBLEVBQUFGLEdBQUE7QUFBQSxTQUFBRyxnQkFBQUgsR0FBQSxFQUFBSSxHQUFBLEVBQUFDLEtBQUEsSUFBQUQsR0FBQSxHQUFBRSxjQUFBLENBQUFGLEdBQUEsT0FBQUEsR0FBQSxJQUFBSixHQUFBLElBQUFPLE1BQUEsQ0FBQUMsY0FBQSxDQUFBUixHQUFBLEVBQUFJLEdBQUEsSUFBQUMsS0FBQSxFQUFBQSxLQUFBLEVBQUFJLFVBQUEsUUFBQUMsWUFBQSxRQUFBQyxRQUFBLG9CQUFBWCxHQUFBLENBQUFJLEdBQUEsSUFBQUMsS0FBQSxXQUFBTCxHQUFBO0FBQUEsU0FBQU0sZUFBQU0sR0FBQSxRQUFBUixHQUFBLEdBQUFTLFlBQUEsQ0FBQUQsR0FBQSwyQkFBQVIsR0FBQSxnQkFBQUEsR0FBQSxHQUFBVSxNQUFBLENBQUFWLEdBQUE7QUFBQSxTQUFBUyxhQUFBRSxLQUFBLEVBQUFDLElBQUEsZUFBQUQsS0FBQSxpQkFBQUEsS0FBQSxrQkFBQUEsS0FBQSxNQUFBRSxJQUFBLEdBQUFGLEtBQUEsQ0FBQUcsTUFBQSxDQUFBQyxXQUFBLE9BQUFGLElBQUEsS0FBQUcsU0FBQSxRQUFBQyxHQUFBLEdBQUFKLElBQUEsQ0FBQUssSUFBQSxDQUFBUCxLQUFBLEVBQUFDLElBQUEsMkJBQUFLLEdBQUEs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