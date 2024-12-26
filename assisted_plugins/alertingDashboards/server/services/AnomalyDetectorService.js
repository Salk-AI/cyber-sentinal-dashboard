"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = require("lodash");
var _helpers = require("./utils/helpers");
var _adHelpers = require("./utils/adHelpers");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
const MAX_DETECTOR_COUNT = 1000;
class DestinationsService {
  constructor(esDriver) {
    _defineProperty(this, "getDetector", async (context, req, res) => {
      const {
        detectorId
      } = req.params;
      const {
        callAsCurrentUser
      } = this.esDriver.asScoped(req);
      try {
        const resp = await callAsCurrentUser('alertingAD.getDetector', {
          detectorId
        });
        const {
          anomaly_detector,
          _seq_no: seqNo,
          _primary_term: primaryTerm,
          _version: version
        } = resp;
        return res.ok({
          body: {
            ok: true,
            detector: anomaly_detector,
            version,
            seqNo,
            primaryTerm
          }
        });
      } catch (err) {
        console.error('Alerting - AnomalyDetectorService - getDetector:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "getDetectors", async (context, req, res) => {
      const searchRequest = {
        query: {
          bool: {}
        },
        size: MAX_DETECTOR_COUNT
      };
      const {
        callAsCurrentUser
      } = this.esDriver.asScoped(req);
      try {
        const resp = await callAsCurrentUser('alertingAD.searchDetectors', {
          body: searchRequest
        });
        const totalDetectors = resp.hits.total.value;
        const detectors = resp.hits.hits.map(hit => {
          const {
            _source: detector,
            _id: id,
            _version: version,
            _seq_no: seqNo,
            _primary_term: primaryTerm
          } = hit;
          return {
            id,
            ...detector,
            version,
            seqNo,
            primaryTerm
          };
        });
        return res.ok({
          body: {
            ok: true,
            detectors: (0, _helpers.mapKeysDeep)(detectors, _helpers.toCamel),
            totalDetectors
          }
        });
      } catch (err) {
        console.error('Alerting - AnomalyDetectorService - searchDetectors:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "getDetectorResults", async (context, req, res) => {
      try {
        const {
          startTime = 0,
          endTime = 20,
          preview = 'false'
        } = req.query;
        const {
          detectorId
        } = req.params;
        const {
          callAsCurrentUser
        } = this.esDriver.asScoped(req);
        if (preview == 'true') {
          const requestBody = {
            period_start: startTime,
            period_end: endTime
          };
          const previewResponse = await callAsCurrentUser('alertingAD.previewDetector', {
            detectorId,
            body: requestBody
          });
          const transformedKeys = (0, _helpers.mapKeysDeep)(previewResponse, _helpers.toCamel);
          return res.ok({
            body: {
              ok: true,
              response: {
                anomalyResult: (0, _adHelpers.anomalyResultMapper)(transformedKeys.anomalyResult),
                detector: transformedKeys.anomalyDetector
              }
            }
          });
        } else {
          //Get results
          const requestBody = {
            size: 10000,
            sort: {
              data_start_time: 'asc'
            },
            query: {
              bool: {
                filter: [{
                  term: {
                    detector_id: detectorId
                  }
                }, {
                  range: {
                    data_start_time: {
                      gte: startTime,
                      lte: endTime
                    }
                  }
                }]
              }
            }
          };
          const detectorResponse = await callAsCurrentUser('alertingAD.getDetector', {
            detectorId
          });
          const anomaliesResponse = await callAsCurrentUser('alertingAD.searchResults', {
            body: requestBody
          });
          const transformedKeys = (0, _lodash.get)(anomaliesResponse, 'hits.hits', []).map(result => (0, _helpers.mapKeysDeep)(result._source, _helpers.toCamel));
          return res.ok({
            body: {
              ok: true,
              response: {
                detector: (0, _helpers.mapKeysDeep)((0, _lodash.get)(detectorResponse, 'anomaly_detector', {}), _helpers.toCamel),
                anomalyResult: (0, _adHelpers.anomalyResultMapper)(transformedKeys)
              }
            }
          });
        }
      } catch (err) {
        console.log('Alerting - AnomalyDetectorService - getDetectorResults', err);
        return res.ok({
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
exports.default = DestinationsService;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbG9kYXNoIiwicmVxdWlyZSIsIl9oZWxwZXJzIiwiX2FkSGVscGVycyIsIl9kZWZpbmVQcm9wZXJ0eSIsIm9iaiIsImtleSIsInZhbHVlIiwiX3RvUHJvcGVydHlLZXkiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImFyZyIsIl90b1ByaW1pdGl2ZSIsIlN0cmluZyIsImlucHV0IiwiaGludCIsInByaW0iLCJTeW1ib2wiLCJ0b1ByaW1pdGl2ZSIsInVuZGVmaW5lZCIsInJlcyIsImNhbGwiLCJUeXBlRXJyb3IiLCJOdW1iZXIiLCJNQVhfREVURUNUT1JfQ09VTlQiLCJEZXN0aW5hdGlvbnNTZXJ2aWNlIiwiY29uc3RydWN0b3IiLCJlc0RyaXZlciIsImNvbnRleHQiLCJyZXEiLCJkZXRlY3RvcklkIiwicGFyYW1zIiwiY2FsbEFzQ3VycmVudFVzZXIiLCJhc1Njb3BlZCIsInJlc3AiLCJhbm9tYWx5X2RldGVjdG9yIiwiX3NlcV9ubyIsInNlcU5vIiwiX3ByaW1hcnlfdGVybSIsInByaW1hcnlUZXJtIiwiX3ZlcnNpb24iLCJ2ZXJzaW9uIiwib2siLCJib2R5IiwiZGV0ZWN0b3IiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJtZXNzYWdlIiwic2VhcmNoUmVxdWVzdCIsInF1ZXJ5IiwiYm9vbCIsInNpemUiLCJ0b3RhbERldGVjdG9ycyIsImhpdHMiLCJ0b3RhbCIsImRldGVjdG9ycyIsIm1hcCIsImhpdCIsIl9zb3VyY2UiLCJfaWQiLCJpZCIsIm1hcEtleXNEZWVwIiwidG9DYW1lbCIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJwcmV2aWV3IiwicmVxdWVzdEJvZHkiLCJwZXJpb2Rfc3RhcnQiLCJwZXJpb2RfZW5kIiwicHJldmlld1Jlc3BvbnNlIiwidHJhbnNmb3JtZWRLZXlzIiwicmVzcG9uc2UiLCJhbm9tYWx5UmVzdWx0IiwiYW5vbWFseVJlc3VsdE1hcHBlciIsImFub21hbHlEZXRlY3RvciIsInNvcnQiLCJkYXRhX3N0YXJ0X3RpbWUiLCJmaWx0ZXIiLCJ0ZXJtIiwiZGV0ZWN0b3JfaWQiLCJyYW5nZSIsImd0ZSIsImx0ZSIsImRldGVjdG9yUmVzcG9uc2UiLCJhbm9tYWxpZXNSZXNwb25zZSIsImdldCIsInJlc3VsdCIsImxvZyIsImV4cG9ydHMiLCJkZWZhdWx0IiwibW9kdWxlIl0sInNvdXJjZXMiOlsiQW5vbWFseURldGVjdG9yU2VydmljZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5pbXBvcnQgeyBnZXQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgbWFwS2V5c0RlZXAsIHRvQ2FtZWwgfSBmcm9tICcuL3V0aWxzL2hlbHBlcnMnO1xuaW1wb3J0IHsgYW5vbWFseVJlc3VsdE1hcHBlciB9IGZyb20gJy4vdXRpbHMvYWRIZWxwZXJzJztcblxuY29uc3QgTUFYX0RFVEVDVE9SX0NPVU5UID0gMTAwMDtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlc3RpbmF0aW9uc1NlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihlc0RyaXZlcikge1xuICAgIHRoaXMuZXNEcml2ZXIgPSBlc0RyaXZlcjtcbiAgfVxuXG4gIGdldERldGVjdG9yID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgY29uc3QgeyBkZXRlY3RvcklkIH0gPSByZXEucGFyYW1zO1xuICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IGNhbGxBc0N1cnJlbnRVc2VyKCdhbGVydGluZ0FELmdldERldGVjdG9yJywgeyBkZXRlY3RvcklkIH0pO1xuICAgICAgY29uc3Qge1xuICAgICAgICBhbm9tYWx5X2RldGVjdG9yLFxuICAgICAgICBfc2VxX25vOiBzZXFObyxcbiAgICAgICAgX3ByaW1hcnlfdGVybTogcHJpbWFyeVRlcm0sXG4gICAgICAgIF92ZXJzaW9uOiB2ZXJzaW9uLFxuICAgICAgfSA9IHJlc3A7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIGRldGVjdG9yOiBhbm9tYWx5X2RldGVjdG9yLFxuICAgICAgICAgIHZlcnNpb24sXG4gICAgICAgICAgc2VxTm8sXG4gICAgICAgICAgcHJpbWFyeVRlcm0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0FsZXJ0aW5nIC0gQW5vbWFseURldGVjdG9yU2VydmljZSAtIGdldERldGVjdG9yOicsIGVycik7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZXNwOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBnZXREZXRlY3RvcnMgPSBhc3luYyAoY29udGV4dCwgcmVxLCByZXMpID0+IHtcbiAgICBjb25zdCBzZWFyY2hSZXF1ZXN0ID0ge1xuICAgICAgcXVlcnk6IHsgYm9vbDoge30gfSxcbiAgICAgIHNpemU6IE1BWF9ERVRFQ1RPUl9DT1VOVCxcbiAgICB9O1xuICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcCA9IGF3YWl0IGNhbGxBc0N1cnJlbnRVc2VyKCdhbGVydGluZ0FELnNlYXJjaERldGVjdG9ycycsIHtcbiAgICAgICAgYm9keTogc2VhcmNoUmVxdWVzdCxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCB0b3RhbERldGVjdG9ycyA9IHJlc3AuaGl0cy50b3RhbC52YWx1ZTtcbiAgICAgIGNvbnN0IGRldGVjdG9ycyA9IHJlc3AuaGl0cy5oaXRzLm1hcCgoaGl0KSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBfc291cmNlOiBkZXRlY3RvcixcbiAgICAgICAgICBfaWQ6IGlkLFxuICAgICAgICAgIF92ZXJzaW9uOiB2ZXJzaW9uLFxuICAgICAgICAgIF9zZXFfbm86IHNlcU5vLFxuICAgICAgICAgIF9wcmltYXJ5X3Rlcm06IHByaW1hcnlUZXJtLFxuICAgICAgICB9ID0gaGl0O1xuICAgICAgICByZXR1cm4geyBpZCwgLi4uZGV0ZWN0b3IsIHZlcnNpb24sIHNlcU5vLCBwcmltYXJ5VGVybSB9O1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIGRldGVjdG9yczogbWFwS2V5c0RlZXAoZGV0ZWN0b3JzLCB0b0NhbWVsKSxcbiAgICAgICAgICB0b3RhbERldGVjdG9ycyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQWxlcnRpbmcgLSBBbm9tYWx5RGV0ZWN0b3JTZXJ2aWNlIC0gc2VhcmNoRGV0ZWN0b3JzOicsIGVycik7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZXNwOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBnZXREZXRlY3RvclJlc3VsdHMgPSBhc3luYyAoY29udGV4dCwgcmVxLCByZXMpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBzdGFydFRpbWUgPSAwLCBlbmRUaW1lID0gMjAsIHByZXZpZXcgPSAnZmFsc2UnIH0gPSByZXEucXVlcnk7XG4gICAgICBjb25zdCB7IGRldGVjdG9ySWQgfSA9IHJlcS5wYXJhbXM7XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcSk7XG4gICAgICBpZiAocHJldmlldyA9PSAndHJ1ZScpIHtcbiAgICAgICAgY29uc3QgcmVxdWVzdEJvZHkgPSB7XG4gICAgICAgICAgcGVyaW9kX3N0YXJ0OiBzdGFydFRpbWUsXG4gICAgICAgICAgcGVyaW9kX2VuZDogZW5kVGltZSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcHJldmlld1Jlc3BvbnNlID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2FsZXJ0aW5nQUQucHJldmlld0RldGVjdG9yJywge1xuICAgICAgICAgIGRldGVjdG9ySWQsXG4gICAgICAgICAgYm9keTogcmVxdWVzdEJvZHksXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm1lZEtleXMgPSBtYXBLZXlzRGVlcChwcmV2aWV3UmVzcG9uc2UsIHRvQ2FtZWwpO1xuICAgICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICAgIHJlc3BvbnNlOiB7XG4gICAgICAgICAgICAgIGFub21hbHlSZXN1bHQ6IGFub21hbHlSZXN1bHRNYXBwZXIodHJhbnNmb3JtZWRLZXlzLmFub21hbHlSZXN1bHQpLFxuICAgICAgICAgICAgICBkZXRlY3RvcjogdHJhbnNmb3JtZWRLZXlzLmFub21hbHlEZXRlY3RvcixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvL0dldCByZXN1bHRzXG4gICAgICAgIGNvbnN0IHJlcXVlc3RCb2R5ID0ge1xuICAgICAgICAgIHNpemU6IDEwMDAwLFxuICAgICAgICAgIHNvcnQ6IHtcbiAgICAgICAgICAgIGRhdGFfc3RhcnRfdGltZTogJ2FzYycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBxdWVyeToge1xuICAgICAgICAgICAgYm9vbDoge1xuICAgICAgICAgICAgICBmaWx0ZXI6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXJtOiB7XG4gICAgICAgICAgICAgICAgICAgIGRldGVjdG9yX2lkOiBkZXRlY3RvcklkLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHJhbmdlOiB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFfc3RhcnRfdGltZToge1xuICAgICAgICAgICAgICAgICAgICAgIGd0ZTogc3RhcnRUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgIGx0ZTogZW5kVGltZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZGV0ZWN0b3JSZXNwb25zZSA9IGF3YWl0IGNhbGxBc0N1cnJlbnRVc2VyKCdhbGVydGluZ0FELmdldERldGVjdG9yJywge1xuICAgICAgICAgIGRldGVjdG9ySWQsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBhbm9tYWxpZXNSZXNwb25zZSA9IGF3YWl0IGNhbGxBc0N1cnJlbnRVc2VyKCdhbGVydGluZ0FELnNlYXJjaFJlc3VsdHMnLCB7XG4gICAgICAgICAgYm9keTogcmVxdWVzdEJvZHksXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm1lZEtleXMgPSBnZXQoYW5vbWFsaWVzUmVzcG9uc2UsICdoaXRzLmhpdHMnLCBbXSkubWFwKChyZXN1bHQpID0+XG4gICAgICAgICAgbWFwS2V5c0RlZXAocmVzdWx0Ll9zb3VyY2UsIHRvQ2FtZWwpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgICAgcmVzcG9uc2U6IHtcbiAgICAgICAgICAgICAgZGV0ZWN0b3I6IG1hcEtleXNEZWVwKGdldChkZXRlY3RvclJlc3BvbnNlLCAnYW5vbWFseV9kZXRlY3RvcicsIHt9KSwgdG9DYW1lbCksXG4gICAgICAgICAgICAgIGFub21hbHlSZXN1bHQ6IGFub21hbHlSZXN1bHRNYXBwZXIodHJhbnNmb3JtZWRLZXlzKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmxvZygnQWxlcnRpbmcgLSBBbm9tYWx5RGV0ZWN0b3JTZXJ2aWNlIC0gZ2V0RGV0ZWN0b3JSZXN1bHRzJywgZXJyKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIGVycm9yOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBSUEsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBQ0EsSUFBQUMsUUFBQSxHQUFBRCxPQUFBO0FBQ0EsSUFBQUUsVUFBQSxHQUFBRixPQUFBO0FBQXdELFNBQUFHLGdCQUFBQyxHQUFBLEVBQUFDLEdBQUEsRUFBQUMsS0FBQSxJQUFBRCxHQUFBLEdBQUFFLGNBQUEsQ0FBQUYsR0FBQSxPQUFBQSxHQUFBLElBQUFELEdBQUEsSUFBQUksTUFBQSxDQUFBQyxjQUFBLENBQUFMLEdBQUEsRUFBQUMsR0FBQSxJQUFBQyxLQUFBLEVBQUFBLEtBQUEsRUFBQUksVUFBQSxRQUFBQyxZQUFBLFFBQUFDLFFBQUEsb0JBQUFSLEdBQUEsQ0FBQUMsR0FBQSxJQUFBQyxLQUFBLFdBQUFGLEdBQUE7QUFBQSxTQUFBRyxlQUFBTSxHQUFBLFFB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