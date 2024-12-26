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

class SnapshotManagementService {
  constructor(osDriver) {
    _defineProperty(this, "osDriver", void 0);
    _defineProperty(this, "getAllSnapshotsWithPolicy", async (context, request, response) => {
      try {
        var _getRepositoryRes$pay;
        // if no repository input, we need to first get back all repositories
        const getRepositoryRes = await this.catRepositories(context, request, response);
        let repositories;
        if ((_getRepositoryRes$pay = getRepositoryRes.payload) !== null && _getRepositoryRes$pay !== void 0 && _getRepositoryRes$pay.ok) {
          var _getRepositoryRes$pay2;
          repositories = (_getRepositoryRes$pay2 = getRepositoryRes.payload) === null || _getRepositoryRes$pay2 === void 0 ? void 0 : _getRepositoryRes$pay2.response.map(repo => repo.id);
        } else {
          var _getRepositoryRes$pay3;
          return response.custom({
            statusCode: 200,
            body: {
              ok: false,
              error: (_getRepositoryRes$pay3 = getRepositoryRes.payload) === null || _getRepositoryRes$pay3 === void 0 ? void 0 : _getRepositoryRes$pay3.error
            }
          });
        }
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        let snapshots = [];
        for (let i = 0; i < repositories.length; i++) {
          const res = await callWithRequest("snapshot.get", {
            repository: repositories[i],
            snapshot: "_all",
            ignore_unavailable: true
          });
          const snapshotWithPolicy = res.snapshots.map(s => {
            var _s$metadata;
            return {
              id: s.snapshot,
              status: s.state,
              start_epoch: s.start_time_in_millis,
              end_epoch: s.end_time_in_millis,
              duration: s.duration_in_millis,
              indices: s.indices.length,
              successful_shards: s.shards.successful,
              failed_shards: s.shards.failed,
              total_shards: s.shards.total,
              repository: repositories[i],
              policy: (_s$metadata = s.metadata) === null || _s$metadata === void 0 ? void 0 : _s$metadata.sm_policy
            };
          });
          snapshots = [...snapshots, ...snapshotWithPolicy];
        }
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: {
              snapshots: snapshots,
              totalSnapshots: snapshots.length
            }
          }
        });
      } catch (err) {
        // If getting a non-existing snapshot, need to handle the missing snapshot exception, and return empty
        return this.errorResponse(response, err, "getAllSnapshotsWithPolicy");
      }
    });
    _defineProperty(this, "getSnapshot", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const {
          repository
        } = request.query;
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const res = await callWithRequest("snapshot.get", {
          repository: repository,
          snapshot: `${id}`,
          ignore_unavailable: true
        });
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: res.snapshots[0]
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "getSnapshot");
      }
    });
    _defineProperty(this, "deleteSnapshot", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const {
          repository
        } = request.query;
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const resp = await callWithRequest("snapshot.delete", {
          repository: repository,
          snapshot: `${id}`
        });
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: resp
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "deleteSnapshot");
      }
    });
    _defineProperty(this, "createSnapshot", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const {
          repository
        } = request.query;
        const params = {
          repository: repository,
          snapshot: id,
          body: JSON.stringify(request.body)
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const resp = await callWithRequest("snapshot.create", params);
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: resp
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "createSnapshot");
      }
    });
    _defineProperty(this, "restoreSnapshot", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const {
          repository
        } = request.query;
        const params = {
          repository: repository,
          snapshot: id,
          body: JSON.stringify(request.body)
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const resp = await callWithRequest("snapshot.restore", params);
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: resp
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "restoreSnapshot");
      }
    });
    _defineProperty(this, "createPolicy", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          policyId: id,
          body: JSON.stringify(request.body)
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const rawRes = await callWithRequest("ism.createSMPolicy", params);
        const res = {
          seqNo: rawRes._seq_no,
          primaryTerm: rawRes._primary_term,
          id: rawRes._id,
          policy: rawRes.sm_policy
        };
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: res
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "createPolicy");
      }
    });
    _defineProperty(this, "updatePolicy", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const {
          seqNo,
          primaryTerm
        } = request.query;
        const params = {
          policyId: id,
          ifSeqNo: seqNo,
          ifPrimaryTerm: primaryTerm,
          body: JSON.stringify(request.body)
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const rawRes = await callWithRequest("ism.updateSMPolicy", params);
        const res = {
          seqNo: rawRes._seq_no,
          primaryTerm: rawRes._primary_term,
          id: rawRes._id,
          policy: rawRes.sm_policy
        };
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: res
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "updatePolicy");
      }
    });
    _defineProperty(this, "getPolicies", async (context, request, response) => {
      try {
        const {
          from,
          size,
          sortField,
          sortOrder,
          queryString
        } = request.query;
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        let params = {
          from,
          size,
          sortField: `sm_policy.${sortField}`,
          sortOrder,
          queryString: queryString.trim() ? `${queryString.trim()}` : "*"
        };
        const res = await callWithRequest("ism.getSMPolicies", params);
        const policies = res.policies.map(p => ({
          seqNo: p._seq_no,
          primaryTerm: p._primary_term,
          id: p._id,
          policy: p.sm_policy
        }));
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: {
              policies,
              totalPolicies: res.total_policies
            }
          }
        });
      } catch (err) {
        if (err.statusCode === 404 && err.body.error.reason === "Snapshot management config index not found") {
          return response.custom({
            statusCode: 200,
            body: {
              ok: true,
              response: {
                policies: [],
                totalPolicies: 0
              }
            }
          });
        }
        return this.errorResponse(response, err, "getPolicies");
      }
    });
    _defineProperty(this, "getPolicy", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          id: id
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const getResponse = await callWithRequest("ism.getSMPolicy", params);
        const metadata = await callWithRequest("ism.explainSnapshotPolicy", params);
        const documentPolicy = {
          id: id,
          seqNo: getResponse._seq_no,
          primaryTerm: getResponse._primary_term,
          policy: getResponse.sm_policy,
          metadata: metadata.policies[0]
        };
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: documentPolicy
          }
        });
      } catch (err) {
        if (err.statusCode === 404 && err.body.error.reason === "Snapshot management config index not found") {
          return response.custom({
            statusCode: 200,
            body: {
              ok: true,
              response: null
            }
          });
        }
        return this.errorResponse(response, err, "getPolicy");
      }
    });
    _defineProperty(this, "deletePolicy", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          policyId: id
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const deletePolicyResponse = await callWithRequest("ism.deleteSMPolicy", params);
        if (deletePolicyResponse.result !== "deleted") {
          return response.custom({
            statusCode: 200,
            body: {
              ok: false,
              error: deletePolicyResponse.result
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
        return this.errorResponse(response, err, "deletePolicy");
      }
    });
    _defineProperty(this, "startPolicy", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          id: id
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const resp = await callWithRequest("ism.startSnapshotPolicy", params);
        if (resp.acknowledged) {
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
              error: "Failed to start snapshot policy."
            }
          });
        }
      } catch (err) {
        return this.errorResponse(response, err, "startPolicy");
      }
    });
    _defineProperty(this, "stopPolicy", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          id: id
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const resp = await callWithRequest("ism.stopSnapshotPolicy", params);
        if (resp.acknowledged) {
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
              error: "Failed to stop snapshot policy."
            }
          });
        }
      } catch (err) {
        return this.errorResponse(response, err, "stopPolicy");
      }
    });
    _defineProperty(this, "catRepositories", async (context, request, response) => {
      try {
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const res = await callWithRequest("cat.repositories", {
          format: "json"
        });
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: res
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "catRepositories");
      }
    });
    _defineProperty(this, "getIndexRecovery", async (context, request, response) => {
      try {
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const res = await callWithRequest("indices.recovery", {
          format: "json"
        });
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: res
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "getIndexRecovery");
      }
    });
    _defineProperty(this, "catSnapshotIndices", async (context, request, response) => {
      try {
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const res = await callWithRequest("cat.indices", {
          format: "json"
        });
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: res
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "catSnapshotIndices");
      }
    });
    _defineProperty(this, "catRepositoriesWithSnapshotCount", async (context, request, response) => {
      try {
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const res = await callWithRequest("cat.repositories", {
          format: "json"
        });
        for (let i = 0; i < res.length; i++) {
          const getSnapshotRes = await callWithRequest("snapshot.get", {
            repository: res[i].id,
            snapshot: "_all",
            ignore_unavailable: true
          });
          res[i].snapshotCount = getSnapshotRes.snapshots.length;
        }
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: res
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "catRepositoriesWithSnapshotCount");
      }
    });
    _defineProperty(this, "deleteRepository", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const res = await callWithRequest("snapshot.deleteRepository", {
          repository: id
        });
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: res
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "deleteRepository");
      }
    });
    _defineProperty(this, "getRepository", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const res = await callWithRequest("snapshot.getRepository", {
          repository: id
        });
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: res
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "getRepository");
      }
    });
    _defineProperty(this, "createRepository", async (context, request, response) => {
      try {
        const {
          id
        } = request.params;
        const params = {
          repository: id,
          body: JSON.stringify(request.body)
        };
        const {
          callAsCurrentUser: callWithRequest
        } = this.osDriver.asScoped(request);
        const res = await callWithRequest("snapshot.createRepository", params);
        return response.custom({
          statusCode: 200,
          body: {
            ok: true,
            response: res
          }
        });
      } catch (err) {
        return this.errorResponse(response, err, "createRepository");
      }
    });
    _defineProperty(this, "errorResponse", (response, error, methodName) => {
      console.error(`Index Management - SnapshotManagementService - ${methodName}:`, error);
      return response.custom({
        statusCode: 200,
        // error?.statusCode || 500,
        body: {
          ok: false,
          error: this.parseEsErrorResponse(error)
        }
      });
    });
    _defineProperty(this, "parseEsErrorResponse", error => {
      if (error.response) {
        try {
          const esErrorResponse = JSON.parse(error.response);
          return esErrorResponse.reason || error.response;
        } catch (parsingError) {
          return error.response;
        }
      }
      return error.message;
    });
    this.osDriver = osDriver;
  }
}
exports.default = SnapshotManagementService;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTbmFwc2hvdE1hbmFnZW1lbnRTZXJ2aWNlIiwiY29uc3RydWN0b3IiLCJvc0RyaXZlciIsIl9kZWZpbmVQcm9wZXJ0eSIsImNvbnRleHQiLCJyZXF1ZXN0IiwicmVzcG9uc2UiLCJfZ2V0UmVwb3NpdG9yeVJlcyRwYXkiLCJnZXRSZXBvc2l0b3J5UmVzIiwiY2F0UmVwb3NpdG9yaWVzIiwicmVwb3NpdG9yaWVzIiwicGF5bG9hZCIsIm9rIiwiX2dldFJlcG9zaXRvcnlSZXMkcGF5MiIsIm1hcCIsInJlcG8iLCJpZCIsIl9nZXRSZXBvc2l0b3J5UmVzJHBheTMiLCJjdXN0b20iLCJzdGF0dXNDb2RlIiwiYm9keSIsImVycm9yIiwiY2FsbEFzQ3VycmVudFVzZXIiLCJjYWxsV2l0aFJlcXVlc3QiLCJhc1Njb3BlZCIsInNuYXBzaG90cyIsImkiLCJsZW5ndGgiLCJyZXMiLCJyZXBvc2l0b3J5Iiwic25hcHNob3QiLCJpZ25vcmVfdW5hdmFpbGFibGUiLCJzbmFwc2hvdFdpdGhQb2xpY3kiLCJzIiwiX3MkbWV0YWRhdGEiLCJzdGF0dXMiLCJzdGF0ZSIsInN0YXJ0X2Vwb2NoIiwic3RhcnRfdGltZV9pbl9taWxsaXMiLCJlbmRfZXBvY2giLCJlbmRfdGltZV9pbl9taWxsaXMiLCJkdXJhdGlvbiIsImR1cmF0aW9uX2luX21pbGxpcyIsImluZGljZXMiLCJzdWNjZXNzZnVsX3NoYXJkcyIsInNoYXJkcyIsInN1Y2Nlc3NmdWwiLCJmYWlsZWRfc2hhcmRzIiwiZmFpbGVkIiwidG90YWxfc2hhcmRzIiwidG90YWwiLCJwb2xpY3kiLCJtZXRhZGF0YSIsInNtX3BvbGljeSIsInRvdGFsU25hcHNob3RzIiwiZXJyIiwiZXJyb3JSZXNwb25zZSIsInBhcmFtcyIsInF1ZXJ5IiwicmVzcCIsIkpTT04iLCJzdHJpbmdpZnkiLCJwb2xpY3lJZCIsInJhd1JlcyIsInNlcU5vIiwiX3NlcV9ubyIsInByaW1hcnlUZXJtIiwiX3ByaW1hcnlfdGVybSIsIl9pZCIsImlmU2VxTm8iLCJpZlByaW1hcnlUZXJtIiwiZnJvbSIsInNpemUiLCJzb3J0RmllbGQiLCJzb3J0T3JkZXIiLCJxdWVyeVN0cmluZyIsInRyaW0iLCJwb2xpY2llcyIsInAiLCJ0b3RhbFBvbGljaWVzIiwidG90YWxfcG9saWNpZXMiLCJyZWFzb24iLCJnZXRSZXNwb25zZSIsImRvY3VtZW50UG9saWN5IiwiZGVsZXRlUG9saWN5UmVzcG9uc2UiLCJyZXN1bHQiLCJhY2tub3dsZWRnZWQiLCJmb3JtYXQiLCJnZXRTbmFwc2hvdFJlcyIsInNuYXBzaG90Q291bnQiLCJtZXRob2ROYW1lIiwiY29uc29sZSIsInBhcnNlRXNFcnJvclJlc3BvbnNlIiwiZXNFcnJvclJlc3BvbnNlIiwicGFyc2UiLCJwYXJzaW5nRXJyb3IiLCJtZXNzYWdlIiwiZXhwb3J0cyIsImRlZmF1bHQiLCJtb2R1bGUiXSwic291cmNlcyI6WyJTbmFwc2hvdE1hbmFnZW1lbnRTZXJ2aWNlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBDb3B5cmlnaHQgT3BlblNlYXJjaCBDb250cmlidXRvcnNcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBcGFjaGUtMi4wXG4gKi9cblxuaW1wb3J0IF8gZnJvbSBcImxvZGFzaFwiO1xuaW1wb3J0IHtcbiAgSUxlZ2FjeUN1c3RvbUNsdXN0ZXJDbGllbnQsXG4gIElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlLFxuICBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gIE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5LFxuICBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG59IGZyb20gXCIuLi8uLi8uLi8uLi9zcmMvY29yZS9zZXJ2ZXJcIjtcbmltcG9ydCB7IFNNUG9saWN5LCBEb2N1bWVudFNNUG9saWN5LCBEb2N1bWVudFNNUG9saWN5V2l0aE1ldGFkYXRhIH0gZnJvbSBcIi4uLy4uL21vZGVscy9pbnRlcmZhY2VzXCI7XG5pbXBvcnQge1xuICBDYXRSZXBvc2l0b3J5LFxuICBDYXRTbmFwc2hvdEluZGV4LFxuICBDYXRTbmFwc2hvdFdpdGhSZXBvQW5kUG9saWN5LFxuICBHZXRJbmRleFJlY292ZXJ5UmVzcG9uc2UsXG4gIEdldFNuYXBzaG90c1Jlc3BvbnNlLFxuICBHZXRTTVBvbGljaWVzUmVzcG9uc2UsXG4gIERlbGV0ZVBvbGljeVJlc3BvbnNlLFxuICBHZXRTbmFwc2hvdCxcbiAgR2V0U25hcHNob3RSZXNwb25zZSxcbiAgR2V0UmVwb3NpdG9yeVJlc3BvbnNlLFxuICBBY2tub3dsZWRnZWRSZXNwb25zZSxcbiAgQ3JlYXRlU25hcHNob3RSZXNwb25zZSxcbiAgUmVzdG9yZVNuYXBzaG90UmVzcG9uc2UsXG59IGZyb20gXCIuLi9tb2RlbHMvaW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgRmFpbGVkU2VydmVyUmVzcG9uc2UsIFNlcnZlclJlc3BvbnNlIH0gZnJvbSBcIi4uL21vZGVscy90eXBlc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbmFwc2hvdE1hbmFnZW1lbnRTZXJ2aWNlIHtcbiAgb3NEcml2ZXI6IElMZWdhY3lDdXN0b21DbHVzdGVyQ2xpZW50O1xuXG4gIGNvbnN0cnVjdG9yKG9zRHJpdmVyOiBJTGVnYWN5Q3VzdG9tQ2x1c3RlckNsaWVudCkge1xuICAgIHRoaXMub3NEcml2ZXIgPSBvc0RyaXZlcjtcbiAgfVxuXG4gIGdldEFsbFNuYXBzaG90c1dpdGhQb2xpY3kgPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxHZXRTbmFwc2hvdHNSZXNwb25zZT4+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIGlmIG5vIHJlcG9zaXRvcnkgaW5wdXQsIHdlIG5lZWQgdG8gZmlyc3QgZ2V0IGJhY2sgYWxsIHJlcG9zaXRvcmllc1xuICAgICAgY29uc3QgZ2V0UmVwb3NpdG9yeVJlcyA9IGF3YWl0IHRoaXMuY2F0UmVwb3NpdG9yaWVzKGNvbnRleHQsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbiAgICAgIGxldCByZXBvc2l0b3JpZXM6IHN0cmluZ1tdO1xuICAgICAgaWYgKGdldFJlcG9zaXRvcnlSZXMucGF5bG9hZD8ub2spIHtcbiAgICAgICAgcmVwb3NpdG9yaWVzID0gZ2V0UmVwb3NpdG9yeVJlcy5wYXlsb2FkPy5yZXNwb25zZS5tYXAoKHJlcG8pID0+IHJlcG8uaWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICAgIGVycm9yOiBnZXRSZXBvc2l0b3J5UmVzLnBheWxvYWQ/LmVycm9yIGFzIHN0cmluZyxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogY2FsbFdpdGhSZXF1ZXN0IH0gPSB0aGlzLm9zRHJpdmVyLmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgbGV0IHNuYXBzaG90czogQ2F0U25hcHNob3RXaXRoUmVwb0FuZFBvbGljeVtdID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlcG9zaXRvcmllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCByZXM6IEdldFNuYXBzaG90UmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJzbmFwc2hvdC5nZXRcIiwge1xuICAgICAgICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcmllc1tpXSxcbiAgICAgICAgICBzbmFwc2hvdDogXCJfYWxsXCIsXG4gICAgICAgICAgaWdub3JlX3VuYXZhaWxhYmxlOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgc25hcHNob3RXaXRoUG9saWN5OiBDYXRTbmFwc2hvdFdpdGhSZXBvQW5kUG9saWN5W10gPSByZXMuc25hcHNob3RzLm1hcCgoczogR2V0U25hcHNob3QpID0+ICh7XG4gICAgICAgICAgaWQ6IHMuc25hcHNob3QsXG4gICAgICAgICAgc3RhdHVzOiBzLnN0YXRlLFxuICAgICAgICAgIHN0YXJ0X2Vwb2NoOiBzLnN0YXJ0X3RpbWVfaW5fbWlsbGlzLFxuICAgICAgICAgIGVuZF9lcG9jaDogcy5lbmRfdGltZV9pbl9taWxsaXMsXG4gICAgICAgICAgZHVyYXRpb246IHMuZHVyYXRpb25faW5fbWlsbGlzLFxuICAgICAgICAgIGluZGljZXM6IHMuaW5kaWNlcy5sZW5ndGgsXG4gICAgICAgICAgc3VjY2Vzc2Z1bF9zaGFyZHM6IHMuc2hhcmRzLnN1Y2Nlc3NmdWwsXG4gICAgICAgICAgZmFpbGVkX3NoYXJkczogcy5zaGFyZHMuZmFpbGVkLFxuICAgICAgICAgIHRvdGFsX3NoYXJkczogcy5zaGFyZHMudG90YWwsXG4gICAgICAgICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yaWVzW2ldLFxuICAgICAgICAgIHBvbGljeTogcy5tZXRhZGF0YT8uc21fcG9saWN5LFxuICAgICAgICB9KSk7XG4gICAgICAgIHNuYXBzaG90cyA9IFsuLi5zbmFwc2hvdHMsIC4uLnNuYXBzaG90V2l0aFBvbGljeV07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwb25zZToge1xuICAgICAgICAgICAgc25hcHNob3RzOiBzbmFwc2hvdHMsXG4gICAgICAgICAgICB0b3RhbFNuYXBzaG90czogc25hcHNob3RzLmxlbmd0aCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAvLyBJZiBnZXR0aW5nIGEgbm9uLWV4aXN0aW5nIHNuYXBzaG90LCBuZWVkIHRvIGhhbmRsZSB0aGUgbWlzc2luZyBzbmFwc2hvdCBleGNlcHRpb24sIGFuZCByZXR1cm4gZW1wdHlcbiAgICAgIHJldHVybiB0aGlzLmVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVyciwgXCJnZXRBbGxTbmFwc2hvdHNXaXRoUG9saWN5XCIpO1xuICAgIH1cbiAgfTtcblxuICBnZXRTbmFwc2hvdCA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPEdldFNuYXBzaG90Pj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxdWVzdC5wYXJhbXMgYXMge1xuICAgICAgICBpZDogc3RyaW5nO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IHsgcmVwb3NpdG9yeSB9ID0gcmVxdWVzdC5xdWVyeSBhcyB7XG4gICAgICAgIHJlcG9zaXRvcnk6IHN0cmluZztcbiAgICAgIH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMub3NEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCByZXM6IEdldFNuYXBzaG90UmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJzbmFwc2hvdC5nZXRcIiwge1xuICAgICAgICByZXBvc2l0b3J5OiByZXBvc2l0b3J5LFxuICAgICAgICBzbmFwc2hvdDogYCR7aWR9YCxcbiAgICAgICAgaWdub3JlX3VuYXZhaWxhYmxlOiB0cnVlLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwb25zZTogcmVzLnNuYXBzaG90c1swXSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHRoaXMuZXJyb3JSZXNwb25zZShyZXNwb25zZSwgZXJyLCBcImdldFNuYXBzaG90XCIpO1xuICAgIH1cbiAgfTtcblxuICBkZWxldGVTbmFwc2hvdCA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPEFja25vd2xlZGdlZFJlc3BvbnNlPj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxdWVzdC5wYXJhbXMgYXMge1xuICAgICAgICBpZDogc3RyaW5nO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IHsgcmVwb3NpdG9yeSB9ID0gcmVxdWVzdC5xdWVyeSBhcyB7XG4gICAgICAgIHJlcG9zaXRvcnk6IHN0cmluZztcbiAgICAgIH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMub3NEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCByZXNwOiBBY2tub3dsZWRnZWRSZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcInNuYXBzaG90LmRlbGV0ZVwiLCB7XG4gICAgICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnksXG4gICAgICAgIHNuYXBzaG90OiBgJHtpZH1gLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwb25zZTogcmVzcCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHRoaXMuZXJyb3JSZXNwb25zZShyZXNwb25zZSwgZXJyLCBcImRlbGV0ZVNuYXBzaG90XCIpO1xuICAgIH1cbiAgfTtcblxuICBjcmVhdGVTbmFwc2hvdCA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPENyZWF0ZVNuYXBzaG90UmVzcG9uc2U+Pj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXF1ZXN0LnBhcmFtcyBhcyB7XG4gICAgICAgIGlkOiBzdHJpbmc7XG4gICAgICB9O1xuICAgICAgY29uc3QgeyByZXBvc2l0b3J5IH0gPSByZXF1ZXN0LnF1ZXJ5IGFzIHtcbiAgICAgICAgcmVwb3NpdG9yeTogc3RyaW5nO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgcmVwb3NpdG9yeTogcmVwb3NpdG9yeSxcbiAgICAgICAgc25hcHNob3Q6IGlkLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShyZXF1ZXN0LmJvZHkpLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5vc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IHJlc3A6IENyZWF0ZVNuYXBzaG90UmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJzbmFwc2hvdC5jcmVhdGVcIiwgcGFyYW1zKTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3BvbnNlOiByZXNwLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvclJlc3BvbnNlKHJlc3BvbnNlLCBlcnIsIFwiY3JlYXRlU25hcHNob3RcIik7XG4gICAgfVxuICB9O1xuXG4gIHJlc3RvcmVTbmFwc2hvdCA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPFJlc3RvcmVTbmFwc2hvdFJlc3BvbnNlPj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxdWVzdC5wYXJhbXMgYXMge1xuICAgICAgICBpZDogc3RyaW5nO1xuICAgICAgfTtcbiAgICAgIGNvbnN0IHsgcmVwb3NpdG9yeSB9ID0gcmVxdWVzdC5xdWVyeSBhcyB7XG4gICAgICAgIHJlcG9zaXRvcnk6IHN0cmluZztcbiAgICAgIH07XG4gICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgIHJlcG9zaXRvcnk6IHJlcG9zaXRvcnksXG4gICAgICAgIHNuYXBzaG90OiBpZCxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVxdWVzdC5ib2R5KSxcbiAgICAgIH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMub3NEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCByZXNwOiBSZXN0b3JlU25hcHNob3RSZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcInNuYXBzaG90LnJlc3RvcmVcIiwgcGFyYW1zKTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3BvbnNlOiByZXNwLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvclJlc3BvbnNlKHJlc3BvbnNlLCBlcnIsIFwicmVzdG9yZVNuYXBzaG90XCIpO1xuICAgIH1cbiAgfTtcblxuICBjcmVhdGVQb2xpY3kgPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxEb2N1bWVudFNNUG9saWN5Pj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxdWVzdC5wYXJhbXMgYXMgeyBpZDogc3RyaW5nIH07XG4gICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgIHBvbGljeUlkOiBpZCxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVxdWVzdC5ib2R5KSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5vc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IHJhd1JlcyA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcImlzbS5jcmVhdGVTTVBvbGljeVwiLCBwYXJhbXMpO1xuICAgICAgY29uc3QgcmVzOiBEb2N1bWVudFNNUG9saWN5ID0ge1xuICAgICAgICBzZXFObzogcmF3UmVzLl9zZXFfbm8sXG4gICAgICAgIHByaW1hcnlUZXJtOiByYXdSZXMuX3ByaW1hcnlfdGVybSxcbiAgICAgICAgaWQ6IHJhd1Jlcy5faWQsXG4gICAgICAgIHBvbGljeTogcmF3UmVzLnNtX3BvbGljeSxcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwb25zZTogcmVzLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvclJlc3BvbnNlKHJlc3BvbnNlLCBlcnIsIFwiY3JlYXRlUG9saWN5XCIpO1xuICAgIH1cbiAgfTtcblxuICB1cGRhdGVQb2xpY3kgPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxEb2N1bWVudFNNUG9saWN5Pj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxdWVzdC5wYXJhbXMgYXMgeyBpZDogc3RyaW5nIH07XG4gICAgICBjb25zdCB7IHNlcU5vLCBwcmltYXJ5VGVybSB9ID0gcmVxdWVzdC5xdWVyeSBhcyB7IHNlcU5vPzogc3RyaW5nOyBwcmltYXJ5VGVybT86IHN0cmluZyB9O1xuICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICBwb2xpY3lJZDogaWQsXG4gICAgICAgIGlmU2VxTm86IHNlcU5vLFxuICAgICAgICBpZlByaW1hcnlUZXJtOiBwcmltYXJ5VGVybSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkocmVxdWVzdC5ib2R5KSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5vc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IHJhd1JlcyA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcImlzbS51cGRhdGVTTVBvbGljeVwiLCBwYXJhbXMpO1xuICAgICAgY29uc3QgcmVzOiBEb2N1bWVudFNNUG9saWN5ID0ge1xuICAgICAgICBzZXFObzogcmF3UmVzLl9zZXFfbm8sXG4gICAgICAgIHByaW1hcnlUZXJtOiByYXdSZXMuX3ByaW1hcnlfdGVybSxcbiAgICAgICAgaWQ6IHJhd1Jlcy5faWQsXG4gICAgICAgIHBvbGljeTogcmF3UmVzLnNtX3BvbGljeSxcbiAgICAgIH07XG5cbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwb25zZTogcmVzLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvclJlc3BvbnNlKHJlc3BvbnNlLCBlcnIsIFwidXBkYXRlUG9saWN5XCIpO1xuICAgIH1cbiAgfTtcblxuICBnZXRQb2xpY2llcyA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPEdldFNNUG9saWNpZXNSZXNwb25zZT4+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgZnJvbSwgc2l6ZSwgc29ydEZpZWxkLCBzb3J0T3JkZXIsIHF1ZXJ5U3RyaW5nIH0gPSByZXF1ZXN0LnF1ZXJ5IGFzIHtcbiAgICAgICAgZnJvbTogc3RyaW5nO1xuICAgICAgICBzaXplOiBzdHJpbmc7XG4gICAgICAgIHNvcnRGaWVsZDogc3RyaW5nO1xuICAgICAgICBzb3J0T3JkZXI6IHN0cmluZztcbiAgICAgICAgcXVlcnlTdHJpbmc6IHN0cmluZztcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5vc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGxldCBwYXJhbXMgPSB7XG4gICAgICAgIGZyb20sXG4gICAgICAgIHNpemUsXG4gICAgICAgIHNvcnRGaWVsZDogYHNtX3BvbGljeS4ke3NvcnRGaWVsZH1gLFxuICAgICAgICBzb3J0T3JkZXIsXG4gICAgICAgIHF1ZXJ5U3RyaW5nOiBxdWVyeVN0cmluZy50cmltKCkgPyBgJHtxdWVyeVN0cmluZy50cmltKCl9YCA6IFwiKlwiLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcImlzbS5nZXRTTVBvbGljaWVzXCIsIHBhcmFtcyk7XG4gICAgICBjb25zdCBwb2xpY2llczogRG9jdW1lbnRTTVBvbGljeVtdID0gcmVzLnBvbGljaWVzLm1hcChcbiAgICAgICAgKHA6IHsgX2lkOiBzdHJpbmc7IF9zZXFfbm86IG51bWJlcjsgX3ByaW1hcnlfdGVybTogbnVtYmVyOyBzbV9wb2xpY3k6IFNNUG9saWN5IH0pID0+ICh7XG4gICAgICAgICAgc2VxTm86IHAuX3NlcV9ubyxcbiAgICAgICAgICBwcmltYXJ5VGVybTogcC5fcHJpbWFyeV90ZXJtLFxuICAgICAgICAgIGlkOiBwLl9pZCxcbiAgICAgICAgICBwb2xpY3k6IHAuc21fcG9saWN5LFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwb25zZTogeyBwb2xpY2llcywgdG90YWxQb2xpY2llczogcmVzLnRvdGFsX3BvbGljaWVzIGFzIG51bWJlciB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgIGlmIChlcnIuc3RhdHVzQ29kZSA9PT0gNDA0ICYmIGVyci5ib2R5LmVycm9yLnJlYXNvbiA9PT0gXCJTbmFwc2hvdCBtYW5hZ2VtZW50IGNvbmZpZyBpbmRleCBub3QgZm91bmRcIikge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgICByZXNwb25zZTogeyBwb2xpY2llczogW10sIHRvdGFsUG9saWNpZXM6IDAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVyciwgXCJnZXRQb2xpY2llc1wiKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0UG9saWN5ID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8RG9jdW1lbnRTTVBvbGljeVdpdGhNZXRhZGF0YSB8IG51bGw+Pj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXF1ZXN0LnBhcmFtcyBhcyB7IGlkOiBzdHJpbmcgfTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgaWQ6IGlkIH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMub3NEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCBnZXRSZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcImlzbS5nZXRTTVBvbGljeVwiLCBwYXJhbXMpO1xuICAgICAgY29uc3QgbWV0YWRhdGEgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJpc20uZXhwbGFpblNuYXBzaG90UG9saWN5XCIsIHBhcmFtcyk7XG4gICAgICBjb25zdCBkb2N1bWVudFBvbGljeSA9IHtcbiAgICAgICAgaWQ6IGlkLFxuICAgICAgICBzZXFObzogZ2V0UmVzcG9uc2UuX3NlcV9ubyxcbiAgICAgICAgcHJpbWFyeVRlcm06IGdldFJlc3BvbnNlLl9wcmltYXJ5X3Rlcm0sXG4gICAgICAgIHBvbGljeTogZ2V0UmVzcG9uc2Uuc21fcG9saWN5LFxuICAgICAgICBtZXRhZGF0YTogbWV0YWRhdGEucG9saWNpZXNbMF0sXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3BvbnNlOiBkb2N1bWVudFBvbGljeSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICBpZiAoZXJyLnN0YXR1c0NvZGUgPT09IDQwNCAmJiBlcnIuYm9keS5lcnJvci5yZWFzb24gPT09IFwiU25hcHNob3QgbWFuYWdlbWVudCBjb25maWcgaW5kZXggbm90IGZvdW5kXCIpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgICAgcmVzcG9uc2U6IG51bGwsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5lcnJvclJlc3BvbnNlKHJlc3BvbnNlLCBlcnIsIFwiZ2V0UG9saWN5XCIpO1xuICAgIH1cbiAgfTtcblxuICBkZWxldGVQb2xpY3kgPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxib29sZWFuPj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxdWVzdC5wYXJhbXMgYXMgeyBpZDogc3RyaW5nIH07XG4gICAgICBjb25zdCBwYXJhbXMgPSB7IHBvbGljeUlkOiBpZCB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogY2FsbFdpdGhSZXF1ZXN0IH0gPSB0aGlzLm9zRHJpdmVyLmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgY29uc3QgZGVsZXRlUG9saWN5UmVzcG9uc2U6IERlbGV0ZVBvbGljeVJlc3BvbnNlID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KFwiaXNtLmRlbGV0ZVNNUG9saWN5XCIsIHBhcmFtcyk7XG4gICAgICBpZiAoZGVsZXRlUG9saWN5UmVzcG9uc2UucmVzdWx0ICE9PSBcImRlbGV0ZWRcIikge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgICAgZXJyb3I6IGRlbGV0ZVBvbGljeVJlc3BvbnNlLnJlc3VsdCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwb25zZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHRoaXMuZXJyb3JSZXNwb25zZShyZXNwb25zZSwgZXJyLCBcImRlbGV0ZVBvbGljeVwiKTtcbiAgICB9XG4gIH07XG5cbiAgc3RhcnRQb2xpY3kgPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxib29sZWFuPj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxdWVzdC5wYXJhbXMgYXMgeyBpZDogc3RyaW5nIH07XG4gICAgICBjb25zdCBwYXJhbXMgPSB7IGlkOiBpZCB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogY2FsbFdpdGhSZXF1ZXN0IH0gPSB0aGlzLm9zRHJpdmVyLmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgY29uc3QgcmVzcDogQWNrbm93bGVkZ2VkUmVzcG9uc2UgPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJpc20uc3RhcnRTbmFwc2hvdFBvbGljeVwiLCBwYXJhbXMpO1xuICAgICAgaWYgKHJlc3AuYWNrbm93bGVkZ2VkKSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgICBib2R5OiB7IG9rOiB0cnVlLCByZXNwb25zZTogdHJ1ZSB9LFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgICBib2R5OiB7IG9rOiBmYWxzZSwgZXJyb3I6IFwiRmFpbGVkIHRvIHN0YXJ0IHNuYXBzaG90IHBvbGljeS5cIiB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB0aGlzLmVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVyciwgXCJzdGFydFBvbGljeVwiKTtcbiAgICB9XG4gIH07XG5cbiAgc3RvcFBvbGljeSA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPGJvb2xlYW4+Pj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXF1ZXN0LnBhcmFtcyBhcyB7IGlkOiBzdHJpbmcgfTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgaWQ6IGlkIH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMub3NEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCByZXNwOiBBY2tub3dsZWRnZWRSZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcImlzbS5zdG9wU25hcHNob3RQb2xpY3lcIiwgcGFyYW1zKTtcbiAgICAgIGlmIChyZXNwLmFja25vd2xlZGdlZCkge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgYm9keTogeyBvazogdHJ1ZSwgcmVzcG9uc2U6IHRydWUgfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgICAgYm9keTogeyBvazogZmFsc2UsIGVycm9yOiBcIkZhaWxlZCB0byBzdG9wIHNuYXBzaG90IHBvbGljeS5cIiB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB0aGlzLmVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVyciwgXCJzdG9wUG9saWN5XCIpO1xuICAgIH1cbiAgfTtcblxuICBjYXRSZXBvc2l0b3JpZXMgPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxDYXRSZXBvc2l0b3J5W10+Pj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMub3NEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCByZXM6IENhdFJlcG9zaXRvcnlbXSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcImNhdC5yZXBvc2l0b3JpZXNcIiwge1xuICAgICAgICBmb3JtYXQ6IFwianNvblwiLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3VzdG9tKHtcbiAgICAgICAgc3RhdHVzQ29kZTogMjAwLFxuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcG9uc2U6IHJlcyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHRoaXMuZXJyb3JSZXNwb25zZShyZXNwb25zZSwgZXJyLCBcImNhdFJlcG9zaXRvcmllc1wiKTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0SW5kZXhSZWNvdmVyeSA9IGFzeW5jIChcbiAgICBjb250ZXh0OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIHJlc3BvbnNlOiBPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlRmFjdG9yeVxuICApOiBQcm9taXNlPElPcGVuU2VhcmNoRGFzaGJvYXJkc1Jlc3BvbnNlPFNlcnZlclJlc3BvbnNlPEdldEluZGV4UmVjb3ZlcnlSZXNwb25zZT4+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGNhbGxXaXRoUmVxdWVzdCB9ID0gdGhpcy5vc0RyaXZlci5hc1Njb3BlZChyZXF1ZXN0KTtcbiAgICAgIGNvbnN0IHJlczogR2V0SW5kZXhSZWNvdmVyeVJlc3BvbnNlID0gYXdhaXQgY2FsbFdpdGhSZXF1ZXN0KFwiaW5kaWNlcy5yZWNvdmVyeVwiLCB7XG4gICAgICAgIGZvcm1hdDogXCJqc29uXCIsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwb25zZTogcmVzLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvclJlc3BvbnNlKHJlc3BvbnNlLCBlcnIsIFwiZ2V0SW5kZXhSZWNvdmVyeVwiKTtcbiAgICB9XG4gIH07XG5cbiAgY2F0U25hcHNob3RJbmRpY2VzID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8Q2F0U25hcHNob3RJbmRleFtdPj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogY2FsbFdpdGhSZXF1ZXN0IH0gPSB0aGlzLm9zRHJpdmVyLmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgY29uc3QgcmVzOiBDYXRTbmFwc2hvdEluZGV4W10gPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJjYXQuaW5kaWNlc1wiLCB7XG4gICAgICAgIGZvcm1hdDogXCJqc29uXCIsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3BvbnNlOiByZXMsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB0aGlzLmVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVyciwgXCJjYXRTbmFwc2hvdEluZGljZXNcIik7XG4gICAgfVxuICB9O1xuXG4gIGNhdFJlcG9zaXRvcmllc1dpdGhTbmFwc2hvdENvdW50ID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8Q2F0UmVwb3NpdG9yeVtdPj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogY2FsbFdpdGhSZXF1ZXN0IH0gPSB0aGlzLm9zRHJpdmVyLmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgY29uc3QgcmVzOiBDYXRSZXBvc2l0b3J5W10gPSBhd2FpdCBjYWxsV2l0aFJlcXVlc3QoXCJjYXQucmVwb3NpdG9yaWVzXCIsIHtcbiAgICAgICAgZm9ybWF0OiBcImpzb25cIixcbiAgICAgIH0pO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBnZXRTbmFwc2hvdFJlczogR2V0U25hcHNob3RSZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcInNuYXBzaG90LmdldFwiLCB7XG4gICAgICAgICAgcmVwb3NpdG9yeTogcmVzW2ldLmlkLFxuICAgICAgICAgIHNuYXBzaG90OiBcIl9hbGxcIixcbiAgICAgICAgICBpZ25vcmVfdW5hdmFpbGFibGU6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgICByZXNbaV0uc25hcHNob3RDb3VudCA9IGdldFNuYXBzaG90UmVzLnNuYXBzaG90cy5sZW5ndGg7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwb25zZTogcmVzLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvclJlc3BvbnNlKHJlc3BvbnNlLCBlcnIsIFwiY2F0UmVwb3NpdG9yaWVzV2l0aFNuYXBzaG90Q291bnRcIik7XG4gICAgfVxuICB9O1xuXG4gIGRlbGV0ZVJlcG9zaXRvcnkgPSBhc3luYyAoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnlcbiAgKTogUHJvbWlzZTxJT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZTxTZXJ2ZXJSZXNwb25zZTxBY2tub3dsZWRnZWRSZXNwb25zZT4+PiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcXVlc3QucGFyYW1zIGFzIHsgaWQ6IHN0cmluZyB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogY2FsbFdpdGhSZXF1ZXN0IH0gPSB0aGlzLm9zRHJpdmVyLmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgY29uc3QgcmVzOiBBY2tub3dsZWRnZWRSZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcInNuYXBzaG90LmRlbGV0ZVJlcG9zaXRvcnlcIiwge1xuICAgICAgICByZXBvc2l0b3J5OiBpZCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3BvbnNlOiByZXMsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB0aGlzLmVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVyciwgXCJkZWxldGVSZXBvc2l0b3J5XCIpO1xuICAgIH1cbiAgfTtcblxuICBnZXRSZXBvc2l0b3J5ID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8R2V0UmVwb3NpdG9yeVJlc3BvbnNlPj4+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxdWVzdC5wYXJhbXMgYXMgeyBpZDogc3RyaW5nIH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyOiBjYWxsV2l0aFJlcXVlc3QgfSA9IHRoaXMub3NEcml2ZXIuYXNTY29wZWQocmVxdWVzdCk7XG4gICAgICBjb25zdCByZXM6IEdldFJlcG9zaXRvcnlSZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcInNuYXBzaG90LmdldFJlcG9zaXRvcnlcIiwge1xuICAgICAgICByZXBvc2l0b3J5OiBpZCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3BvbnNlOiByZXMsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiB0aGlzLmVycm9yUmVzcG9uc2UocmVzcG9uc2UsIGVyciwgXCJnZXRSZXBvc2l0b3J5XCIpO1xuICAgIH1cbiAgfTtcblxuICBjcmVhdGVSZXBvc2l0b3J5ID0gYXN5bmMgKFxuICAgIGNvbnRleHQ6IFJlcXVlc3RIYW5kbGVyQ29udGV4dCxcbiAgICByZXF1ZXN0OiBPcGVuU2VhcmNoRGFzaGJvYXJkc1JlcXVlc3QsXG4gICAgcmVzcG9uc2U6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2VGYWN0b3J5XG4gICk6IFByb21pc2U8SU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8U2VydmVyUmVzcG9uc2U8QWNrbm93bGVkZ2VkUmVzcG9uc2U+Pj4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXF1ZXN0LnBhcmFtcyBhcyB7IGlkOiBzdHJpbmcgfTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgcmVwb3NpdG9yeTogaWQsXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHJlcXVlc3QuYm9keSksXG4gICAgICB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlcjogY2FsbFdpdGhSZXF1ZXN0IH0gPSB0aGlzLm9zRHJpdmVyLmFzU2NvcGVkKHJlcXVlc3QpO1xuICAgICAgY29uc3QgcmVzOiBBY2tub3dsZWRnZWRSZXNwb25zZSA9IGF3YWl0IGNhbGxXaXRoUmVxdWVzdChcInNuYXBzaG90LmNyZWF0ZVJlcG9zaXRvcnlcIiwgcGFyYW1zKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5jdXN0b20oe1xuICAgICAgICBzdGF0dXNDb2RlOiAyMDAsXG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwb25zZTogcmVzLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gdGhpcy5lcnJvclJlc3BvbnNlKHJlc3BvbnNlLCBlcnIsIFwiY3JlYXRlUmVwb3NpdG9yeVwiKTtcbiAgICB9XG4gIH07XG5cbiAgZXJyb3JSZXNwb25zZSA9IChcbiAgICByZXNwb25zZTogT3BlblNlYXJjaERhc2hib2FyZHNSZXNwb25zZUZhY3RvcnksXG4gICAgZXJyb3I6IGFueSxcbiAgICBtZXRob2ROYW1lOiBzdHJpbmdcbiAgKTogSU9wZW5TZWFyY2hEYXNoYm9hcmRzUmVzcG9uc2U8RmFpbGVkU2VydmVyUmVzcG9uc2U+ID0+IHtcbiAgICBjb25zb2xlLmVycm9yKGBJbmRleCBNYW5hZ2VtZW50IC0gU25hcHNob3RNYW5hZ2VtZW50U2VydmljZSAtICR7bWV0aG9kTmFtZX06YCwgZXJyb3IpO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlLmN1c3RvbSh7XG4gICAgICBzdGF0dXNDb2RlOiAyMDAsIC8vIGVycm9yPy5zdGF0dXNDb2RlIHx8IDUwMCxcbiAgICAgIGJvZHk6IHtcbiAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICBlcnJvcjogdGhpcy5wYXJzZUVzRXJyb3JSZXNwb25zZShlcnJvciksXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xuXG4gIHBhcnNlRXNFcnJvclJlc3BvbnNlID0gKGVycm9yOiBhbnkpOiBzdHJpbmcgPT4ge1xuICAgIGlmIChlcnJvci5yZXNwb25zZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZXNFcnJvclJlc3BvbnNlID0gSlNPTi5wYXJzZShlcnJvci5yZXNwb25zZSk7XG4gICAgICAgIHJldHVybiBlc0Vycm9yUmVzcG9uc2UucmVhc29uIHx8IGVycm9yLnJlc3BvbnNlO1xuICAgICAgfSBjYXRjaCAocGFyc2luZ0Vycm9yKSB7XG4gICAgICAgIHJldHVybiBlcnJvci5yZXNwb25zZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGVycm9yLm1lc3NhZ2U7XG4gIH07XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQTRCZSxNQUFNQSx5QkFBeUIsQ0FBQztFQUc3Q0MsV0FB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