"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _helpers = require("./utils/helpers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
class DestinationsService {
  constructor(esDriver) {
    _defineProperty(this, "createDestination", async (context, req, res) => {
      try {
        const params = {
          body: req.body
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const createResponse = await callAsCurrentUser('alerting.createDestination', params);
        return res.ok({
          body: {
            ok: true,
            resp: createResponse
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - createDestination:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "updateDestination", async (context, req, res) => {
      try {
        const {
          destinationId
        } = req.params;
        const {
          ifSeqNo,
          ifPrimaryTerm
        } = req.query;
        const params = {
          body: req.body,
          destinationId,
          ifSeqNo,
          ifPrimaryTerm
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const updateResponse = await callAsCurrentUser('alerting.updateDestination', params);
        const {
          _version,
          _id
        } = updateResponse;
        return res.ok({
          body: {
            ok: true,
            version: _version,
            id: _id
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - updateDestination:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "deleteDestination", async (context, req, res) => {
      try {
        const {
          destinationId
        } = req.params;
        const params = {
          destinationId
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const response = await callAsCurrentUser('alerting.deleteDestination', params);
        return res.ok({
          body: {
            ok: response.result === 'deleted'
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - deleteDestination:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "getDestination", async (context, req, res) => {
      const {
        destinationId
      } = req.params;
      const {
        callAsCurrentUser
      } = this.esDriver.asScoped(req);
      try {
        const params = {
          destinationId
        };
        const resp = await callAsCurrentUser('alerting.getDestination', params);
        const destination = resp.destinations[0];
        const version = destination.schema_version;
        const ifSeqNo = destination.seq_no;
        const ifPrimaryTerm = destination.primary_term;
        return res.ok({
          body: {
            ok: true,
            destination,
            version,
            ifSeqNo,
            ifPrimaryTerm
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - getDestination:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "getDestinations", async (context, req, res) => {
      const {
        callAsCurrentUser
      } = this.esDriver.asScoped(req);
      const {
        from = 0,
        size = 20,
        search = '',
        sortDirection = 'desc',
        sortField = 'start_time',
        type = 'ALL'
      } = req.query;
      var params;
      switch (sortField) {
        case 'name':
          params = {
            sortString: 'destination.name.keyword',
            sortOrder: sortDirection
          };
          break;
        case 'type':
          params = {
            sortString: 'destination.type',
            sortOrder: sortDirection
          };
          break;
        default:
          params = {};
          break;
      }
      params.startIndex = from;
      params.size = size;
      params.searchString = search;
      if (search.trim()) params.searchString = `*${search.trim().split(' ').join('* *')}*`;
      params.destinationType = type;
      try {
        const resp = await callAsCurrentUser('alerting.searchDestinations', params);
        const destinations = resp.destinations.map(hit => {
          const destination = hit;
          const id = destination.id;
          const version = destination.schema_version;
          const ifSeqNo = destination.seq_no;
          const ifPrimaryTerm = destination.primary_term;
          return {
            id,
            ...destination,
            version,
            ifSeqNo,
            ifPrimaryTerm
          };
        });
        const totalDestinations = resp.totalDestinations;
        return res.ok({
          body: {
            ok: true,
            destinations,
            totalDestinations
          }
        });
      } catch (err) {
        if ((0, _helpers.isIndexNotFoundError)(err)) {
          return res.ok({
            body: {
              ok: false,
              resp: {}
            }
          });
        }
        return res.ok({
          body: {
            ok: false,
            err: err.message
          }
        });
      }
    });
    /**
     *  -----------------------------------------------------
     *  ----------------- Email Account API -----------------
     *  -----------------------------------------------------
     */
    _defineProperty(this, "createEmailAccount", async (context, req, res) => {
      try {
        const params = {
          body: req.body
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const createResponse = await callAsCurrentUser('alerting.createEmailAccount', params);
        return res.ok({
          body: {
            ok: true,
            resp: createResponse
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - createEmailAccount:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "updateEmailAccount", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const {
          ifSeqNo,
          ifPrimaryTerm
        } = req.query;
        const params = {
          emailAccountId: id,
          ifSeqNo,
          ifPrimaryTerm,
          body: req.body
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const updateResponse = await callAsCurrentUser('alerting.updateEmailAccount', params);
        const {
          _id
        } = updateResponse;
        return res.ok({
          body: {
            ok: true,
            id: _id
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - updateEmailAccount:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "deleteEmailAccount", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const params = {
          emailAccountId: id
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const deleteResponse = await callAsCurrentUser('alerting.deleteEmailAccount', params);
        return res.ok({
          body: {
            ok: deleteResponse.result === 'deleted'
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - deleteEmailAccount:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "getEmailAccount", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const params = {
          emailAccountId: id
        };
        const {
          callAsCurrentUser
        } = this.esDriver.asScoped(req);
        const getResponse = await callAsCurrentUser('alerting.getEmailAccount', params);
        const emailAccount = _lodash.default.get(getResponse, 'email_account', null);
        const ifSeqNo = _lodash.default.get(getResponse, '_seq_no', null);
        const ifPrimaryTerm = _lodash.default.get(getResponse, '_primary_term', null);
        if (emailAccount) {
          return res.ok({
            body: {
              ok: true,
              resp: emailAccount,
              ifSeqNo,
              ifPrimaryTerm
            }
          });
        } else {
          return res.ok({
            body: {
              ok: false
            }
          });
        }
      } catch (err) {
        console.error('Alerting - DestinationService - getEmailAccount:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "getEmailAccounts", async (context, req, res) => {
      try {
        const {
          from = 0,
          size = 20,
          search = '',
          sortDirection = 'desc',
          sortField = 'name'
        } = req.query;
        let must = {
          match_all: {}
        };
        if (search.trim()) {
          must = {
            query_string: {
              default_field: 'email_account.name',
              default_operator: 'AND',
              query: `*${search.trim().split(' ').join('* *')}*`
            }
          };
        }
        const sortQueryMap = {
          name: {
            'email_account.name.keyword': sortDirection
          }
        };
        let sort = [];
        const sortQuery = sortQueryMap[sortField];
        if (sortQuery) sort = sortQuery;
        const params = {
          body: {
            from,
            size,
            sort,
            query: {
              bool: {
                must
              }
            }
          }
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const getResponse = await callAsCurrentUser('alerting.getEmailAccounts', params);
        const totalEmailAccounts = _lodash.default.get(getResponse, 'hits.total.value', 0);
        const emailAccounts = _lodash.default.get(getResponse, 'hits.hits', []).map(result => {
          const {
            _id: id,
            _seq_no: ifSeqNo,
            _primary_term: ifPrimaryTerm,
            _source: emailAccount
          } = result;
          return {
            id,
            ...emailAccount,
            ifSeqNo,
            ifPrimaryTerm
          };
        });
        return res.ok({
          body: {
            ok: true,
            emailAccounts,
            totalEmailAccounts
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - getEmailAccounts:', err);
        return res.ok({
          body: {
            ok: false,
            err: err.message
          }
        });
      }
    });
    /**
     *  -----------------------------------------------------
     *  ----------------- Email Group API -------------------
     *  -----------------------------------------------------
     */
    _defineProperty(this, "createEmailGroup", async (context, req, res) => {
      try {
        const params = {
          body: req.body
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const createResponse = await callAsCurrentUser('alerting.createEmailGroup', params);
        return res.ok({
          body: {
            ok: true,
            resp: createResponse
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - createEmailGroup:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "updateEmailGroup", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const {
          ifSeqNo,
          ifPrimaryTerm
        } = req.query;
        const params = {
          emailGroupId: id,
          ifSeqNo,
          ifPrimaryTerm,
          body: req.body
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const updateResponse = await callAsCurrentUser('alerting.updateEmailGroup', params);
        const {
          _id
        } = updateResponse;
        return res.ok({
          body: {
            ok: true,
            id: _id
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - updateEmailGroup:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "deleteEmailGroup", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const params = {
          emailGroupId: id
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const deleteResponse = await callAsCurrentUser('alerting.deleteEmailGroup', params);
        return res.ok({
          body: {
            ok: deleteResponse.result === 'deleted'
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - deleteEmailGroup:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "getEmailGroup", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const params = {
          emailGroupId: id
        };
        const {
          callAsCurrentUser
        } = this.esDriver.asScoped(req);
        const getResponse = await callAsCurrentUser('alerting.getEmailGroup', params);
        const emailGroup = _lodash.default.get(getResponse, 'email_group', null);
        const ifSeqNo = _lodash.default.get(getResponse, '_seq_no', null);
        const ifPrimaryTerm = _lodash.default.get(getResponse, '_primary_term', null);
        if (emailGroup) {
          return res.ok({
            body: {
              ok: true,
              resp: emailGroup,
              ifSeqNo,
              ifPrimaryTerm
            }
          });
        } else {
          return res.ok({
            body: {
              ok: false
            }
          });
        }
      } catch (err) {
        console.error('Alerting - DestinationService - getEmailGroup:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "getEmailGroups", async (context, req, res) => {
      try {
        const {
          from = 0,
          size = 20,
          search = '',
          sortDirection = 'desc',
          sortField = 'name'
        } = req.query;
        let must = {
          match_all: {}
        };
        if (search.trim()) {
          must = {
            query_string: {
              default_field: 'email_group.name',
              default_operator: 'AND',
              query: `*${search.trim().split(' ').join('* *')}*`
            }
          };
        }
        const sortQueryMap = {
          name: {
            'email_group.name.keyword': sortDirection
          }
        };
        let sort = [];
        const sortQuery = sortQueryMap[sortField];
        if (sortQuery) sort = sortQuery;
        const params = {
          body: {
            from,
            size,
            sort,
            query: {
              bool: {
                must
              }
            }
          }
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const getResponse = await callAsCurrentUser('alerting.getEmailGroups', params);
        const totalEmailGroups = _lodash.default.get(getResponse, 'hits.total.value', 0);
        const emailGroups = _lodash.default.get(getResponse, 'hits.hits', []).map(result => {
          const {
            _id: id,
            _seq_no: ifSeqNo,
            _primary_term: ifPrimaryTerm,
            _source: emailGroup
          } = result;
          return {
            id,
            ...emailGroup,
            ifSeqNo,
            ifPrimaryTerm
          };
        });
        return res.ok({
          body: {
            ok: true,
            emailGroups,
            totalEmailGroups
          }
        });
      } catch (err) {
        console.error('Alerting - DestinationService - getEmailGroups:', err);
        return res.ok({
          body: {
            ok: false,
            err: err.message
          }
        });
      }
    });
    this.esDriver = esDriver;
  }
}
exports.default = DestinationsService;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbG9kYXNoIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfaGVscGVycyIsIm9iaiIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0IiwiX2RlZmluZVByb3BlcnR5Iiwia2V5IiwidmFsdWUiLCJfdG9Qcm9wZXJ0eUtleSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiYXJnIiwiX3RvUHJpbWl0aXZlIiwiU3RyaW5nIiwiaW5wdXQiLCJoaW50IiwicHJpbSIsIlN5bWJvbCIsInRvUHJpbWl0aXZlIiwidW5kZWZpbmVkIiwicmVzIiwiY2FsbCIsIlR5cGVFcnJvciIsIk51bWJlciIsIkRlc3RpbmF0aW9uc1NlcnZpY2UiLCJjb25zdHJ1Y3RvciIsImVzRHJpdmVyIiwiY29udGV4dCIsInJlcSIsInBhcmFtcyIsImJvZHkiLCJjYWxsQXNDdXJyZW50VXNlciIsImFzU2NvcGVkIiwiY3JlYXRlUmVzcG9uc2UiLCJvayIsInJlc3AiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJtZXNzYWdlIiwiZGVzdGluYXRpb25JZCIsImlmU2VxTm8iLCJpZlByaW1hcnlUZXJtIiwicXVlcnkiLCJ1cGRhdGVSZXNwb25zZSIsIl92ZXJzaW9uIiwiX2lkIiwidmVyc2lvbiIsImlkIiwicmVzcG9uc2UiLCJyZXN1bHQiLCJkZXN0aW5hdGlvbiIsImRlc3RpbmF0aW9ucyIsInNjaGVtYV92ZXJzaW9uIiwic2VxX25vIiwicHJpbWFyeV90ZXJtIiwiZnJvbSIsInNpemUiLCJzZWFyY2giLCJzb3J0RGlyZWN0aW9uIiwic29ydEZpZWxkIiwidHlwZSIsInNvcnRTdHJpbmciLCJzb3J0T3JkZXIiLCJzdGFydEluZGV4Iiwic2VhcmNoU3RyaW5nIiwidHJpbSIsInNwbGl0Iiwiam9pbiIsImRlc3RpbmF0aW9uVHlwZSIsIm1hcCIsImhpdCIsInRvdGFsRGVzdGluYXRpb25zIiwiaXNJbmRleE5vdEZvdW5kRXJyb3IiLCJlbWFpbEFjY291bnRJZCIsImRlbGV0ZVJlc3BvbnNlIiwiZ2V0UmVzcG9uc2UiLCJlbWFpbEFjY291bnQiLCJfIiwiZ2V0IiwibXVzdCIsIm1hdGNoX2FsbCIsInF1ZXJ5X3N0cmluZyIsImRlZmF1bHRfZmllbGQiLCJkZWZhdWx0X29wZXJhdG9yIiwic29ydFF1ZXJ5TWFwIiwibmFtZSIsInNvcnQiLCJzb3J0UXVlcnkiLCJib29sIiwidG90YWxFbWFpbEFjY291bnRzIiwiZW1haWxBY2NvdW50cyIsIl9zZXFfbm8iLCJfcHJpbWFyeV90ZXJtIiwiX3NvdXJjZSIsImVtYWlsR3JvdXBJZCIsImVtYWlsR3JvdXAiLCJ0b3RhbEVtYWlsR3JvdXBzIiwiZW1haWxHcm91cHMiLCJleHBvcnRzIiwibW9kdWxlIl0sInNvdXJjZXMiOlsiRGVzdGluYXRpb25zU2VydmljZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBpc0luZGV4Tm90Rm91bmRFcnJvciB9IGZyb20gJy4vdXRpbHMvaGVscGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERlc3RpbmF0aW9uc1NlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihlc0RyaXZlcikge1xuICAgIHRoaXMuZXNEcml2ZXIgPSBlc0RyaXZlcjtcbiAgfVxuXG4gIGNyZWF0ZURlc3RpbmF0aW9uID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgYm9keTogcmVxLmJvZHkgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IGF3YWl0IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IGNyZWF0ZVJlc3BvbnNlID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2FsZXJ0aW5nLmNyZWF0ZURlc3RpbmF0aW9uJywgcGFyYW1zKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcDogY3JlYXRlUmVzcG9uc2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0FsZXJ0aW5nIC0gRGVzdGluYXRpb25TZXJ2aWNlIC0gY3JlYXRlRGVzdGluYXRpb246JywgZXJyKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIHJlc3A6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHVwZGF0ZURlc3RpbmF0aW9uID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgZGVzdGluYXRpb25JZCB9ID0gcmVxLnBhcmFtcztcbiAgICAgIGNvbnN0IHsgaWZTZXFObywgaWZQcmltYXJ5VGVybSB9ID0gcmVxLnF1ZXJ5O1xuICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICBib2R5OiByZXEuYm9keSxcbiAgICAgICAgZGVzdGluYXRpb25JZCxcbiAgICAgICAgaWZTZXFObyxcbiAgICAgICAgaWZQcmltYXJ5VGVybSxcbiAgICAgIH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSBhd2FpdCB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcSk7XG4gICAgICBjb25zdCB1cGRhdGVSZXNwb25zZSA9IGF3YWl0IGNhbGxBc0N1cnJlbnRVc2VyKCdhbGVydGluZy51cGRhdGVEZXN0aW5hdGlvbicsIHBhcmFtcyk7XG4gICAgICBjb25zdCB7IF92ZXJzaW9uLCBfaWQgfSA9IHVwZGF0ZVJlc3BvbnNlO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICB2ZXJzaW9uOiBfdmVyc2lvbixcbiAgICAgICAgICBpZDogX2lkLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBbGVydGluZyAtIERlc3RpbmF0aW9uU2VydmljZSAtIHVwZGF0ZURlc3RpbmF0aW9uOicsIGVycik7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZXNwOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBkZWxldGVEZXN0aW5hdGlvbiA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGRlc3RpbmF0aW9uSWQgfSA9IHJlcS5wYXJhbXM7XG4gICAgICBjb25zdCBwYXJhbXMgPSB7IGRlc3RpbmF0aW9uSWQgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IGF3YWl0IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2FsZXJ0aW5nLmRlbGV0ZURlc3RpbmF0aW9uJywgcGFyYW1zKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHJlc3BvbnNlLnJlc3VsdCA9PT0gJ2RlbGV0ZWQnLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBbGVydGluZyAtIERlc3RpbmF0aW9uU2VydmljZSAtIGRlbGV0ZURlc3RpbmF0aW9uOicsIGVycik7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZXNwOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBnZXREZXN0aW5hdGlvbiA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIGNvbnN0IHsgZGVzdGluYXRpb25JZCB9ID0gcmVxLnBhcmFtcztcbiAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcSk7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgZGVzdGluYXRpb25JZCxcbiAgICAgIH07XG4gICAgICBjb25zdCByZXNwID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2FsZXJ0aW5nLmdldERlc3RpbmF0aW9uJywgcGFyYW1zKTtcblxuICAgICAgY29uc3QgZGVzdGluYXRpb24gPSByZXNwLmRlc3RpbmF0aW9uc1swXTtcbiAgICAgIGNvbnN0IHZlcnNpb24gPSBkZXN0aW5hdGlvbi5zY2hlbWFfdmVyc2lvbjtcbiAgICAgIGNvbnN0IGlmU2VxTm8gPSBkZXN0aW5hdGlvbi5zZXFfbm87XG4gICAgICBjb25zdCBpZlByaW1hcnlUZXJtID0gZGVzdGluYXRpb24ucHJpbWFyeV90ZXJtO1xuXG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIGRlc3RpbmF0aW9uLFxuICAgICAgICAgIHZlcnNpb24sXG4gICAgICAgICAgaWZTZXFObyxcbiAgICAgICAgICBpZlByaW1hcnlUZXJtLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBbGVydGluZyAtIERlc3RpbmF0aW9uU2VydmljZSAtIGdldERlc3RpbmF0aW9uOicsIGVycik7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZXNwOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBnZXREZXN0aW5hdGlvbnMgPSBhc3luYyAoY29udGV4dCwgcmVxLCByZXMpID0+IHtcbiAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcSk7XG5cbiAgICBjb25zdCB7XG4gICAgICBmcm9tID0gMCxcbiAgICAgIHNpemUgPSAyMCxcbiAgICAgIHNlYXJjaCA9ICcnLFxuICAgICAgc29ydERpcmVjdGlvbiA9ICdkZXNjJyxcbiAgICAgIHNvcnRGaWVsZCA9ICdzdGFydF90aW1lJyxcbiAgICAgIHR5cGUgPSAnQUxMJyxcbiAgICB9ID0gcmVxLnF1ZXJ5O1xuXG4gICAgdmFyIHBhcmFtcztcbiAgICBzd2l0Y2ggKHNvcnRGaWVsZCkge1xuICAgICAgY2FzZSAnbmFtZSc6XG4gICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICBzb3J0U3RyaW5nOiAnZGVzdGluYXRpb24ubmFtZS5rZXl3b3JkJyxcbiAgICAgICAgICBzb3J0T3JkZXI6IHNvcnREaXJlY3Rpb24sXG4gICAgICAgIH07XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndHlwZSc6XG4gICAgICAgIHBhcmFtcyA9IHtcbiAgICAgICAgICBzb3J0U3RyaW5nOiAnZGVzdGluYXRpb24udHlwZScsXG4gICAgICAgICAgc29ydE9yZGVyOiBzb3J0RGlyZWN0aW9uLFxuICAgICAgICB9O1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHBhcmFtcyA9IHt9O1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcGFyYW1zLnN0YXJ0SW5kZXggPSBmcm9tO1xuICAgIHBhcmFtcy5zaXplID0gc2l6ZTtcbiAgICBwYXJhbXMuc2VhcmNoU3RyaW5nID0gc2VhcmNoO1xuICAgIGlmIChzZWFyY2gudHJpbSgpKSBwYXJhbXMuc2VhcmNoU3RyaW5nID0gYCoke3NlYXJjaC50cmltKCkuc3BsaXQoJyAnKS5qb2luKCcqIConKX0qYDtcbiAgICBwYXJhbXMuZGVzdGluYXRpb25UeXBlID0gdHlwZTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2FsZXJ0aW5nLnNlYXJjaERlc3RpbmF0aW9ucycsIHBhcmFtcyk7XG5cbiAgICAgIGNvbnN0IGRlc3RpbmF0aW9ucyA9IHJlc3AuZGVzdGluYXRpb25zLm1hcCgoaGl0KSA9PiB7XG4gICAgICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gaGl0O1xuICAgICAgICBjb25zdCBpZCA9IGRlc3RpbmF0aW9uLmlkO1xuICAgICAgICBjb25zdCB2ZXJzaW9uID0gZGVzdGluYXRpb24uc2NoZW1hX3ZlcnNpb247XG4gICAgICAgIGNvbnN0IGlmU2VxTm8gPSBkZXN0aW5hdGlvbi5zZXFfbm87XG4gICAgICAgIGNvbnN0IGlmUHJpbWFyeVRlcm0gPSBkZXN0aW5hdGlvbi5wcmltYXJ5X3Rlcm07XG4gICAgICAgIHJldHVybiB7IGlkLCAuLi5kZXN0aW5hdGlvbiwgdmVyc2lvbiwgaWZTZXFObywgaWZQcmltYXJ5VGVybSB9O1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHRvdGFsRGVzdGluYXRpb25zID0gcmVzcC50b3RhbERlc3RpbmF0aW9ucztcblxuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICBkZXN0aW5hdGlvbnMsXG4gICAgICAgICAgdG90YWxEZXN0aW5hdGlvbnMsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChpc0luZGV4Tm90Rm91bmRFcnJvcihlcnIpKSB7XG4gICAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICAgIGJvZHk6IHsgb2s6IGZhbHNlLCByZXNwOiB7fSB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIGVycjogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqICAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiAgLS0tLS0tLS0tLS0tLS0tLS0gRW1haWwgQWNjb3VudCBBUEkgLS0tLS0tLS0tLS0tLS0tLS1cbiAgICogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqL1xuXG4gIGNyZWF0ZUVtYWlsQWNjb3VudCA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSB7IGJvZHk6IHJlcS5ib2R5IH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSBhd2FpdCB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcSk7XG4gICAgICBjb25zdCBjcmVhdGVSZXNwb25zZSA9IGF3YWl0IGNhbGxBc0N1cnJlbnRVc2VyKCdhbGVydGluZy5jcmVhdGVFbWFpbEFjY291bnQnLCBwYXJhbXMpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwOiBjcmVhdGVSZXNwb25zZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQWxlcnRpbmcgLSBEZXN0aW5hdGlvblNlcnZpY2UgLSBjcmVhdGVFbWFpbEFjY291bnQ6JywgZXJyKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIHJlc3A6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHVwZGF0ZUVtYWlsQWNjb3VudCA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgICAgY29uc3QgeyBpZlNlcU5vLCBpZlByaW1hcnlUZXJtIH0gPSByZXEucXVlcnk7XG4gICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgIGVtYWlsQWNjb3VudElkOiBpZCxcbiAgICAgICAgaWZTZXFObyxcbiAgICAgICAgaWZQcmltYXJ5VGVybSxcbiAgICAgICAgYm9keTogcmVxLmJvZHksXG4gICAgICB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlciB9ID0gYXdhaXQgdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgdXBkYXRlUmVzcG9uc2UgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcudXBkYXRlRW1haWxBY2NvdW50JywgcGFyYW1zKTtcbiAgICAgIGNvbnN0IHsgX2lkIH0gPSB1cGRhdGVSZXNwb25zZTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgaWQ6IF9pZCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQWxlcnRpbmcgLSBEZXN0aW5hdGlvblNlcnZpY2UgLSB1cGRhdGVFbWFpbEFjY291bnQ6JywgZXJyKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIHJlc3A6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGRlbGV0ZUVtYWlsQWNjb3VudCA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgICAgY29uc3QgcGFyYW1zID0geyBlbWFpbEFjY291bnRJZDogaWQgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IGF3YWl0IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IGRlbGV0ZVJlc3BvbnNlID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2FsZXJ0aW5nLmRlbGV0ZUVtYWlsQWNjb3VudCcsIHBhcmFtcyk7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBkZWxldGVSZXNwb25zZS5yZXN1bHQgPT09ICdkZWxldGVkJyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQWxlcnRpbmcgLSBEZXN0aW5hdGlvblNlcnZpY2UgLSBkZWxldGVFbWFpbEFjY291bnQ6JywgZXJyKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIHJlc3A6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGdldEVtYWlsQWNjb3VudCA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgICAgY29uc3QgcGFyYW1zID0geyBlbWFpbEFjY291bnRJZDogaWQgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IGdldFJlc3BvbnNlID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2FsZXJ0aW5nLmdldEVtYWlsQWNjb3VudCcsIHBhcmFtcyk7XG4gICAgICBjb25zdCBlbWFpbEFjY291bnQgPSBfLmdldChnZXRSZXNwb25zZSwgJ2VtYWlsX2FjY291bnQnLCBudWxsKTtcbiAgICAgIGNvbnN0IGlmU2VxTm8gPSBfLmdldChnZXRSZXNwb25zZSwgJ19zZXFfbm8nLCBudWxsKTtcbiAgICAgIGNvbnN0IGlmUHJpbWFyeVRlcm0gPSBfLmdldChnZXRSZXNwb25zZSwgJ19wcmltYXJ5X3Rlcm0nLCBudWxsKTtcbiAgICAgIGlmIChlbWFpbEFjY291bnQpIHtcbiAgICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgICByZXNwOiBlbWFpbEFjY291bnQsXG4gICAgICAgICAgICBpZlNlcU5vLFxuICAgICAgICAgICAgaWZQcmltYXJ5VGVybSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0FsZXJ0aW5nIC0gRGVzdGluYXRpb25TZXJ2aWNlIC0gZ2V0RW1haWxBY2NvdW50OicsIGVycik7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZXNwOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBnZXRFbWFpbEFjY291bnRzID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgZnJvbSA9IDAsXG4gICAgICAgIHNpemUgPSAyMCxcbiAgICAgICAgc2VhcmNoID0gJycsXG4gICAgICAgIHNvcnREaXJlY3Rpb24gPSAnZGVzYycsXG4gICAgICAgIHNvcnRGaWVsZCA9ICduYW1lJyxcbiAgICAgIH0gPSByZXEucXVlcnk7XG5cbiAgICAgIGxldCBtdXN0ID0geyBtYXRjaF9hbGw6IHt9IH07XG4gICAgICBpZiAoc2VhcmNoLnRyaW0oKSkge1xuICAgICAgICBtdXN0ID0ge1xuICAgICAgICAgIHF1ZXJ5X3N0cmluZzoge1xuICAgICAgICAgICAgZGVmYXVsdF9maWVsZDogJ2VtYWlsX2FjY291bnQubmFtZScsXG4gICAgICAgICAgICBkZWZhdWx0X29wZXJhdG9yOiAnQU5EJyxcbiAgICAgICAgICAgIHF1ZXJ5OiBgKiR7c2VhcmNoLnRyaW0oKS5zcGxpdCgnICcpLmpvaW4oJyogKicpfSpgLFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNvcnRRdWVyeU1hcCA9IHsgbmFtZTogeyAnZW1haWxfYWNjb3VudC5uYW1lLmtleXdvcmQnOiBzb3J0RGlyZWN0aW9uIH0gfTtcblxuICAgICAgbGV0IHNvcnQgPSBbXTtcbiAgICAgIGNvbnN0IHNvcnRRdWVyeSA9IHNvcnRRdWVyeU1hcFtzb3J0RmllbGRdO1xuICAgICAgaWYgKHNvcnRRdWVyeSkgc29ydCA9IHNvcnRRdWVyeTtcblxuICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgZnJvbSxcbiAgICAgICAgICBzaXplLFxuICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgIGJvb2w6IHtcbiAgICAgICAgICAgICAgbXVzdCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IGF3YWl0IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IGdldFJlc3BvbnNlID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2FsZXJ0aW5nLmdldEVtYWlsQWNjb3VudHMnLCBwYXJhbXMpO1xuXG4gICAgICBjb25zdCB0b3RhbEVtYWlsQWNjb3VudHMgPSBfLmdldChnZXRSZXNwb25zZSwgJ2hpdHMudG90YWwudmFsdWUnLCAwKTtcbiAgICAgIGNvbnN0IGVtYWlsQWNjb3VudHMgPSBfLmdldChnZXRSZXNwb25zZSwgJ2hpdHMuaGl0cycsIFtdKS5tYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgX2lkOiBpZCxcbiAgICAgICAgICBfc2VxX25vOiBpZlNlcU5vLFxuICAgICAgICAgIF9wcmltYXJ5X3Rlcm06IGlmUHJpbWFyeVRlcm0sXG4gICAgICAgICAgX3NvdXJjZTogZW1haWxBY2NvdW50LFxuICAgICAgICB9ID0gcmVzdWx0O1xuICAgICAgICByZXR1cm4geyBpZCwgLi4uZW1haWxBY2NvdW50LCBpZlNlcU5vLCBpZlByaW1hcnlUZXJtIH07XG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgZW1haWxBY2NvdW50cyxcbiAgICAgICAgICB0b3RhbEVtYWlsQWNjb3VudHMsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0FsZXJ0aW5nIC0gRGVzdGluYXRpb25TZXJ2aWNlIC0gZ2V0RW1haWxBY2NvdW50czonLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgZXJyOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAqICAtLS0tLS0tLS0tLS0tLS0tLSBFbWFpbCBHcm91cCBBUEkgLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgKiAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICovXG5cbiAgY3JlYXRlRW1haWxHcm91cCA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwYXJhbXMgPSB7IGJvZHk6IHJlcS5ib2R5IH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSBhd2FpdCB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcSk7XG4gICAgICBjb25zdCBjcmVhdGVSZXNwb25zZSA9IGF3YWl0IGNhbGxBc0N1cnJlbnRVc2VyKCdhbGVydGluZy5jcmVhdGVFbWFpbEdyb3VwJywgcGFyYW1zKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcDogY3JlYXRlUmVzcG9uc2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0FsZXJ0aW5nIC0gRGVzdGluYXRpb25TZXJ2aWNlIC0gY3JlYXRlRW1haWxHcm91cDonLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgcmVzcDogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgdXBkYXRlRW1haWxHcm91cCA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgICAgY29uc3QgeyBpZlNlcU5vLCBpZlByaW1hcnlUZXJtIH0gPSByZXEucXVlcnk7XG4gICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgIGVtYWlsR3JvdXBJZDogaWQsXG4gICAgICAgIGlmU2VxTm8sXG4gICAgICAgIGlmUHJpbWFyeVRlcm0sXG4gICAgICAgIGJvZHk6IHJlcS5ib2R5LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IGF3YWl0IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IHVwZGF0ZVJlc3BvbnNlID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2FsZXJ0aW5nLnVwZGF0ZUVtYWlsR3JvdXAnLCBwYXJhbXMpO1xuICAgICAgY29uc3QgeyBfaWQgfSA9IHVwZGF0ZVJlc3BvbnNlO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICBpZDogX2lkLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBbGVydGluZyAtIERlc3RpbmF0aW9uU2VydmljZSAtIHVwZGF0ZUVtYWlsR3JvdXA6JywgZXJyKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIHJlc3A6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGRlbGV0ZUVtYWlsR3JvdXAgPSBhc3luYyAoY29udGV4dCwgcmVxLCByZXMpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgZW1haWxHcm91cElkOiBpZCB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlciB9ID0gYXdhaXQgdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgZGVsZXRlUmVzcG9uc2UgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcuZGVsZXRlRW1haWxHcm91cCcsIHBhcmFtcyk7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBkZWxldGVSZXNwb25zZS5yZXN1bHQgPT09ICdkZWxldGVkJyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQWxlcnRpbmcgLSBEZXN0aW5hdGlvblNlcnZpY2UgLSBkZWxldGVFbWFpbEdyb3VwOicsIGVycik7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZXNwOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBnZXRFbWFpbEdyb3VwID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XG4gICAgICBjb25zdCBwYXJhbXMgPSB7IGVtYWlsR3JvdXBJZDogaWQgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IGdldFJlc3BvbnNlID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2FsZXJ0aW5nLmdldEVtYWlsR3JvdXAnLCBwYXJhbXMpO1xuICAgICAgY29uc3QgZW1haWxHcm91cCA9IF8uZ2V0KGdldFJlc3BvbnNlLCAnZW1haWxfZ3JvdXAnLCBudWxsKTtcbiAgICAgIGNvbnN0IGlmU2VxTm8gPSBfLmdldChnZXRSZXNwb25zZSwgJ19zZXFfbm8nLCBudWxsKTtcbiAgICAgIGNvbnN0IGlmUHJpbWFyeVRlcm0gPSBfLmdldChnZXRSZXNwb25zZSwgJ19wcmltYXJ5X3Rlcm0nLCBudWxsKTtcbiAgICAgIGlmIChlbWFpbEdyb3VwKSB7XG4gICAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgICAgcmVzcDogZW1haWxHcm91cCxcbiAgICAgICAgICAgIGlmU2VxTm8sXG4gICAgICAgICAgICBpZlByaW1hcnlUZXJtLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQWxlcnRpbmcgLSBEZXN0aW5hdGlvblNlcnZpY2UgLSBnZXRFbWFpbEdyb3VwOicsIGVycik7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZXNwOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBnZXRFbWFpbEdyb3VwcyA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGZyb20gPSAwLFxuICAgICAgICBzaXplID0gMjAsXG4gICAgICAgIHNlYXJjaCA9ICcnLFxuICAgICAgICBzb3J0RGlyZWN0aW9uID0gJ2Rlc2MnLFxuICAgICAgICBzb3J0RmllbGQgPSAnbmFtZScsXG4gICAgICB9ID0gcmVxLnF1ZXJ5O1xuXG4gICAgICBsZXQgbXVzdCA9IHsgbWF0Y2hfYWxsOiB7fSB9O1xuICAgICAgaWYgKHNlYXJjaC50cmltKCkpIHtcbiAgICAgICAgbXVzdCA9IHtcbiAgICAgICAgICBxdWVyeV9zdHJpbmc6IHtcbiAgICAgICAgICAgIGRlZmF1bHRfZmllbGQ6ICdlbWFpbF9ncm91cC5uYW1lJyxcbiAgICAgICAgICAgIGRlZmF1bHRfb3BlcmF0b3I6ICdBTkQnLFxuICAgICAgICAgICAgcXVlcnk6IGAqJHtzZWFyY2gudHJpbSgpLnNwbGl0KCcgJykuam9pbignKiAqJyl9KmAsXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc29ydFF1ZXJ5TWFwID0geyBuYW1lOiB7ICdlbWFpbF9ncm91cC5uYW1lLmtleXdvcmQnOiBzb3J0RGlyZWN0aW9uIH0gfTtcblxuICAgICAgbGV0IHNvcnQgPSBbXTtcbiAgICAgIGNvbnN0IHNvcnRRdWVyeSA9IHNvcnRRdWVyeU1hcFtzb3J0RmllbGRdO1xuICAgICAgaWYgKHNvcnRRdWVyeSkgc29ydCA9IHNvcnRRdWVyeTtcblxuICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgZnJvbSxcbiAgICAgICAgICBzaXplLFxuICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgIGJvb2w6IHtcbiAgICAgICAgICAgICAgbXVzdCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IGF3YWl0IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IGdldFJlc3BvbnNlID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2FsZXJ0aW5nLmdldEVtYWlsR3JvdXBzJywgcGFyYW1zKTtcblxuICAgICAgY29uc3QgdG90YWxFbWFpbEdyb3VwcyA9IF8uZ2V0KGdldFJlc3BvbnNlLCAnaGl0cy50b3RhbC52YWx1ZScsIDApO1xuICAgICAgY29uc3QgZW1haWxHcm91cHMgPSBfLmdldChnZXRSZXNwb25zZSwgJ2hpdHMuaGl0cycsIFtdKS5tYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgX2lkOiBpZCxcbiAgICAgICAgICBfc2VxX25vOiBpZlNlcU5vLFxuICAgICAgICAgIF9wcmltYXJ5X3Rlcm06IGlmUHJpbWFyeVRlcm0sXG4gICAgICAgICAgX3NvdXJjZTogZW1haWxHcm91cCxcbiAgICAgICAgfSA9IHJlc3VsdDtcbiAgICAgICAgcmV0dXJuIHsgaWQsIC4uLmVtYWlsR3JvdXAsIGlmU2VxTm8sIGlmUHJpbWFyeVRlcm0gfTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICBlbWFpbEdyb3VwcyxcbiAgICAgICAgICB0b3RhbEVtYWlsR3JvdXBzLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBbGVydGluZyAtIERlc3RpbmF0aW9uU2VydmljZSAtIGdldEVtYWlsR3JvdXBzOicsIGVycik7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICBlcnI6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQSxJQUFBQSxPQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxRQUFBLEdBQUFELE9BQUE7QUFBdUQsU0FBQUQsdUJBQUFHLEdBQUEsV0FBQUEsR0FBQSxJQUFBQSxHQUFBLENBQUFDLFVBQUEsR0FBQUQsR0FBQSxLQUFBRSxPQUFBLEVBQUFGLEdBQUE7QUFBQSxTQUFB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