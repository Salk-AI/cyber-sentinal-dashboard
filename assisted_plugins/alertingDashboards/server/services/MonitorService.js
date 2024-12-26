"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _constants = require("../../utils/constants");
var _helpers = require("./utils/helpers");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); } /*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */
class MonitorService {
  constructor(esDriver) {
    _defineProperty(this, "createMonitor", async (context, req, res) => {
      try {
        const params = {
          body: req.body
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const createResponse = await callAsCurrentUser('alerting.createMonitor', params);
        return res.ok({
          body: {
            ok: true,
            resp: createResponse
          }
        });
      } catch (err) {
        console.error('Alerting - MonitorService - createMonitor:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "createWorkflow", async (context, req, res) => {
      try {
        const params = {
          body: req.body
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const createResponse = await callAsCurrentUser('alerting.createWorkflow', params);
        return res.ok({
          body: {
            ok: true,
            resp: createResponse
          }
        });
      } catch (err) {
        console.error('Alerting - MonitorService - createWorkflow:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "deleteMonitor", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const params = {
          monitorId: id
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const response = await callAsCurrentUser('alerting.deleteMonitor', params);
        return res.ok({
          body: {
            ok: response.result === 'deleted' || response.result === undefined
          }
        });
      } catch (err) {
        console.error('Alerting - MonitorService - deleteMonitor:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "deleteWorkflow", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const params = {
          workflowId: id
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const response = await callAsCurrentUser('alerting.deleteWorkflow', params);
        return res.ok({
          body: {
            ok: response.result === 'deleted' || response.result === undefined
          }
        });
      } catch (err) {
        console.error('Alerting - MonitorService - deleteWorkflow:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "getMonitor", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const params = {
          monitorId: id
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const getResponse = await callAsCurrentUser('alerting.getMonitor', params);
        let monitor = _lodash.default.get(getResponse, 'monitor', null);
        const version = _lodash.default.get(getResponse, '_version', null);
        const ifSeqNo = _lodash.default.get(getResponse, '_seq_no', null);
        const ifPrimaryTerm = _lodash.default.get(getResponse, '_primary_term', null);
        const associated_workflows = _lodash.default.get(getResponse, 'associated_workflows', null);
        if (monitor) {
          const {
            callAsCurrentUser
          } = this.esDriver.asScoped(req);
          const aggsParams = {
            index: _constants.INDEX.ALL_ALERTS,
            body: {
              size: 0,
              query: {
                bool: {
                  must: {
                    term: {
                      monitor_id: id
                    }
                  }
                }
              },
              aggs: {
                active_count: {
                  terms: {
                    field: 'state'
                  }
                },
                '24_hour_count': {
                  date_range: {
                    field: 'start_time',
                    ranges: [{
                      from: 'now-24h/h'
                    }]
                  }
                }
              }
            }
          };
          const searchResponse = await callAsCurrentUser('alerting.getMonitors', aggsParams);
          const dayCount = _lodash.default.get(searchResponse, 'aggregations.24_hour_count.buckets.0.doc_count', 0);
          const activeBuckets = _lodash.default.get(searchResponse, 'aggregations.active_count.buckets', []);
          const activeCount = activeBuckets.reduce((acc, curr) => curr.key === 'ACTIVE' ? curr.doc_count : acc, 0);
          if (associated_workflows) {
            monitor = {
              ...monitor,
              associated_workflows,
              associatedCompositeMonitorCnt: associated_workflows.length
            };
          }
          monitor = {
            ...monitor,
            item_type: monitor.workflow_type || monitor.monitor_type,
            id,
            version
          };
          return res.ok({
            body: {
              ok: true,
              resp: monitor,
              activeCount,
              dayCount,
              version,
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
        console.error('Alerting - MonitorService - getMonitor:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "getWorkflow", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const params = {
          monitorId: id
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const getResponse = await callAsCurrentUser('alerting.getWorkflow', params);
        let workflow = _lodash.default.get(getResponse, 'workflow', null);
        const version = _lodash.default.get(getResponse, '_version', null);
        const ifSeqNo = _lodash.default.get(getResponse, '_seq_no', null);
        const ifPrimaryTerm = _lodash.default.get(getResponse, '_primary_term', null);
        workflow.monitor_type = workflow.workflow_type;
        workflow = {
          ...workflow,
          item_type: workflow.workflow_type,
          id,
          version
        };
        return res.ok({
          body: {
            ok: true,
            resp: workflow,
            activeCount: 0,
            dayCount: 0,
            version,
            ifSeqNo,
            ifPrimaryTerm
          }
        });
      } catch (err) {
        console.error('Alerting - MonitorService - getWorkflow:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "updateMonitor", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const params = {
          monitorId: id,
          body: req.body,
          refresh: 'wait_for'
        };
        const {
          type
        } = req.body;

        // TODO DRAFT: Are we sure we need to include ifSeqNo and ifPrimaryTerm from the UI side when updating monitors?
        const {
          ifSeqNo,
          ifPrimaryTerm
        } = req.query;
        if (ifSeqNo && ifPrimaryTerm) {
          params.if_seq_no = ifSeqNo;
          params.if_primary_term = ifPrimaryTerm;
        }
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const updateResponse = await callAsCurrentUser(`alerting.${type === 'workflow' ? 'updateWorkflow' : 'updateMonitor'}`, params);
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
        console.error('Alerting - MonitorService - updateMonitor:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "getMonitors", async (context, req, res) => {
      try {
        const {
          from,
          size,
          search,
          sortDirection,
          sortField,
          state,
          monitorIds
        } = req.query;
        let must = {
          match_all: {}
        };
        if (search.trim()) {
          // This is an expensive wildcard query to match monitor names such as: "This is a long monitor name"
          // search query => "long monit"
          // This is acceptable because we will never allow more than 1,000 monitors
          must = {
            query_string: {
              default_field: 'monitor.name',
              default_operator: 'AND',
              query: `*${search.trim().split(' ').join('* *')}*`
            }
          };
        }
        const should = [];
        const mustList = [must];
        if (monitorIds !== undefined) {
          mustList.push({
            terms: {
              _id: Array.isArray(monitorIds) ? monitorIds : [monitorIds]
            }
          });
        } else if (monitorIds === 'empty') {
          mustList.push({
            terms: {
              _id: []
            }
          });
        }
        if (state !== 'all') {
          const enabled = state === 'enabled';
          should.push({
            term: {
              'monitor.enabled': enabled
            }
          });
          should.push({
            term: {
              'workflow.enabled': enabled
            }
          });
        }
        const monitorSorts = {
          name: 'monitor.name.keyword'
        };
        const monitorSortPageData = {
          size: 1000
        };
        if (monitorSorts[sortField]) {
          monitorSortPageData.sort = [{
            [monitorSorts[sortField]]: sortDirection
          }];
          monitorSortPageData.size = _lodash.default.defaultTo(size, 1000);
          monitorSortPageData.from = _lodash.default.defaultTo(from, 0);
        }
        const params = {
          body: {
            seq_no_primary_term: true,
            version: true,
            ...monitorSortPageData,
            query: {
              bool: {
                should,
                minimum_should_match: state !== 'all' ? 1 : 0,
                must: mustList
              }
            },
            aggregations: {
              associated_composite_monitors: {
                nested: {
                  path: 'workflow.inputs.composite_input.sequence.delegates'
                },
                aggs: {
                  monitor_ids: {
                    terms: {
                      field: 'workflow.inputs.composite_input.sequence.delegates.monitor_id'
                    }
                  }
                }
              }
            }
          }
        };
        const {
          callAsCurrentUser: alertingCallAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const getResponse = await alertingCallAsCurrentUser('alerting.getMonitors', params);
        const totalMonitors = _lodash.default.get(getResponse, 'hits.total.value', 0);
        const monitorKeyValueTuples = _lodash.default.get(getResponse, 'hits.hits', []).map(result => {
          const {
            _id: id,
            _version: version,
            _seq_no: ifSeqNo,
            _primary_term: ifPrimaryTerm,
            _source
          } = result;
          const monitor = _source.monitor ? _source.monitor : _source;
          monitor['item_type'] = monitor.workflow_type || monitor.monitor_type;
          const {
            name,
            enabled,
            item_type
          } = monitor;
          return [id, {
            id,
            version,
            ifSeqNo,
            ifPrimaryTerm,
            name,
            enabled,
            item_type,
            monitor
          }];
        }, {});
        const monitorMap = new Map(monitorKeyValueTuples);
        const associatedCompositeMonitorCountMap = {};
        _lodash.default.get(getResponse, 'aggregations.associated_composite_monitors.monitor_ids.buckets', []).forEach(({
          key,
          doc_count
        }) => {
          associatedCompositeMonitorCountMap[key] = doc_count;
        });
        const monitorIdsOutput = [...monitorMap.keys()];
        const aggsOrderData = {};
        const aggsSorts = {
          active: 'active',
          acknowledged: 'acknowledged',
          errors: 'errors',
          ignored: 'ignored',
          lastNotificationTime: 'last_notification_time'
        };
        if (aggsSorts[sortField]) {
          aggsOrderData.order = {
            [aggsSorts[sortField]]: sortDirection
          };
        }
        const aggsParams = {
          index: _constants.INDEX.ALL_ALERTS,
          body: {
            size: 0,
            query: {
              terms: {
                monitor_id: monitorIdsOutput
              }
            },
            aggregations: {
              uniq_monitor_ids: {
                terms: {
                  field: 'monitor_id',
                  ...aggsOrderData,
                  size: from + size
                },
                aggregations: {
                  active: {
                    filter: {
                      term: {
                        state: 'ACTIVE'
                      }
                    }
                  },
                  acknowledged: {
                    filter: {
                      term: {
                        state: 'ACKNOWLEDGED'
                      }
                    }
                  },
                  errors: {
                    filter: {
                      term: {
                        state: 'ERROR'
                      }
                    }
                  },
                  ignored: {
                    filter: {
                      bool: {
                        filter: {
                          term: {
                            state: 'COMPLETED'
                          }
                        },
                        must_not: {
                          exists: {
                            field: 'acknowledged_time'
                          }
                        }
                      }
                    }
                  },
                  last_notification_time: {
                    max: {
                      field: 'last_notification_time'
                    }
                  },
                  latest_alert: {
                    top_hits: {
                      size: 1,
                      sort: [{
                        start_time: {
                          order: 'desc'
                        }
                      }],
                      _source: {
                        includes: ['last_notification_time', 'trigger_name']
                      }
                    }
                  }
                }
              }
            }
          }
        };
        const {
          callAsCurrentUser
        } = this.esDriver.asScoped(req);
        const esAggsResponse = await callAsCurrentUser('alerting.getMonitors', aggsParams);
        const buckets = _lodash.default.get(esAggsResponse, 'aggregations.uniq_monitor_ids.buckets', []).map(bucket => {
          const {
            key: id,
            last_notification_time: {
              value: lastNotificationTime
            },
            ignored: {
              doc_count: ignored
            },
            acknowledged: {
              doc_count: acknowledged
            },
            active: {
              doc_count: active
            },
            errors: {
              doc_count: errors
            },
            latest_alert: {
              hits: {
                hits: [{
                  _source: {
                    trigger_name: latestAlert
                  }
                }]
              }
            }
          } = bucket;
          const monitor = monitorMap.get(id);
          monitorMap.delete(id);
          return {
            ...monitor,
            id,
            lastNotificationTime,
            ignored,
            latestAlert,
            acknowledged,
            active,
            errors,
            currentTime: Date.now(),
            associatedCompositeMonitorCnt: associatedCompositeMonitorCountMap[id] || 0
          };
        });
        const unusedMonitors = [...monitorMap.values()].map(monitor => ({
          ...monitor,
          lastNotificationTime: null,
          ignored: 0,
          active: 0,
          acknowledged: 0,
          errors: 0,
          latestAlert: '--',
          currentTime: Date.now(),
          associatedCompositeMonitorCnt: associatedCompositeMonitorCountMap[monitor.id] || 0
        }));
        let results = _lodash.default.orderBy(buckets.concat(unusedMonitors), [sortField], [sortDirection]);
        // If we sorted on monitor name then we already applied from/size to the first query to limit what we're aggregating over
        // Therefore we do not need to apply from/size to this result set
        // If we sorted on aggregations, then this is our in memory pagination
        if (!monitorSorts[sortField]) {
          results = results.slice(from, from + size);
        }
        return res.ok({
          body: {
            ok: true,
            monitors: results,
            totalMonitors
          }
        });
      } catch (err) {
        console.error('Alerting - MonitorService - getMonitors', err);
        if ((0, _helpers.isIndexNotFoundError)(err)) {
          return res.ok({
            body: {
              ok: false,
              resp: {
                totalMonitors: 0,
                monitors: []
              }
            }
          });
        }
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "acknowledgeAlerts", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const params = {
          monitorId: id,
          body: req.body
        };
        const {
          callAsCurrentUser
        } = this.esDriver.asScoped(req);
        const acknowledgeResponse = await callAsCurrentUser('alerting.acknowledgeAlerts', params);
        return res.ok({
          body: {
            ok: !acknowledgeResponse.failed.length,
            resp: acknowledgeResponse
          }
        });
      } catch (err) {
        console.error('Alerting - MonitorService - acknowledgeAlerts:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "acknowledgeChainedAlerts", async (context, req, res) => {
      try {
        const {
          id
        } = req.params;
        const params = {
          workflowId: id,
          body: req.body
        };
        const {
          callAsCurrentUser
        } = this.esDriver.asScoped(req);
        const acknowledgeResponse = await callAsCurrentUser('alerting.acknowledgeChainedAlerts', params);
        return res.ok({
          body: {
            ok: !acknowledgeResponse.failed.length,
            resp: acknowledgeResponse
          }
        });
      } catch (err) {
        console.error('Alerting - MonitorService - acknowledgeChainedAlerts:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "executeMonitor", async (context, req, res) => {
      try {
        const {
          dryrun = 'true'
        } = req.query;
        const params = {
          body: req.body,
          dryrun
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const executeResponse = await callAsCurrentUser('alerting.executeMonitor', params);
        return res.ok({
          body: {
            ok: true,
            resp: executeResponse
          }
        });
      } catch (err) {
        console.error('Alerting - MonitorService - executeMonitor:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    //TODO: This is temporarily a pass through call which needs to be deprecated
    _defineProperty(this, "searchMonitors", async (context, req, res) => {
      try {
        const {
          query,
          index,
          size
        } = req.body;
        const params = {
          index,
          size,
          body: query
        };
        const {
          callAsCurrentUser
        } = await this.esDriver.asScoped(req);
        const results = await callAsCurrentUser('alerting.getMonitors', params);
        return res.ok({
          body: {
            ok: true,
            resp: results
          }
        });
      } catch (err) {
        console.error('Alerting - MonitorService - searchMonitor:', err);
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
exports.default = MonitorService;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbG9kYXNoIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsInJlcXVpcmUiLCJfY29uc3RhbnRzIiwiX2hlbHBlcnMiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsIl9kZWZpbmVQcm9wZXJ0eSIsImtleSIsInZhbHVlIiwiX3RvUHJvcGVydHlLZXkiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImFyZyIsIl90b1ByaW1pdGl2ZSIsIlN0cmluZyIsImlucHV0IiwiaGludCIsInByaW0iLCJTeW1ib2wiLCJ0b1ByaW1pdGl2ZSIsInVuZGVmaW5lZCIsInJlcyIsImNhbGwiLCJUeXBlRXJyb3IiLCJOdW1iZXIiLCJNb25pdG9yU2VydmljZSIsImNvbnN0cnVjdG9yIiwiZXNEcml2ZXIiLCJjb250ZXh0IiwicmVxIiwicGFyYW1zIiwiYm9keSIsImNhbGxBc0N1cnJlbnRVc2VyIiwiYXNTY29wZWQiLCJjcmVhdGVSZXNwb25zZSIsIm9rIiwicmVzcCIsImVyciIsImNvbnNvbGUiLCJlcnJvciIsIm1lc3NhZ2UiLCJpZCIsIm1vbml0b3JJZCIsInJlc3BvbnNlIiwicmVzdWx0Iiwid29ya2Zsb3dJZCIsImdldFJlc3BvbnNlIiwibW9uaXRvciIsIl8iLCJnZXQiLCJ2ZXJzaW9uIiwiaWZTZXFObyIsImlmUHJpbWFyeVRlcm0iLCJhc3NvY2lhdGVkX3dvcmtmbG93cyIsImFnZ3NQYXJhbXMiLCJpbmRleCIsIklOREVYIiwiQUxMX0FMRVJUUyIsInNpemUiLCJxdWVyeSIsImJvb2wiLCJtdXN0IiwidGVybSIsIm1vbml0b3JfaWQiLCJhZ2dzIiwiYWN0aXZlX2NvdW50IiwidGVybXMiLCJmaWVsZCIsImRhdGVfcmFuZ2UiLCJyYW5nZXMiLCJmcm9tIiwic2VhcmNoUmVzcG9uc2UiLCJkYXlDb3VudCIsImFjdGl2ZUJ1Y2tldHMiLCJhY3RpdmVDb3VudCIsInJlZHVjZSIsImFjYyIsImN1cnIiLCJkb2NfY291bnQiLCJhc3NvY2lhdGVkQ29tcG9zaXRlTW9uaXRvckNudCIsImxlbmd0aCIsIml0ZW1fdHlwZSIsIndvcmtmbG93X3R5cGUiLCJtb25pdG9yX3R5cGUiLCJ3b3JrZmxvdyIsInJlZnJlc2giLCJ0eXBlIiwiaWZfc2VxX25vIiwiaWZfcHJpbWFyeV90ZXJtIiwidXBkYXRlUmVzcG9uc2UiLCJfdmVyc2lvbiIsIl9pZCIsInNlYXJjaCIsInNvcnREaXJlY3Rpb24iLCJzb3J0RmllbGQiLCJzdGF0ZSIsIm1vbml0b3JJZHMiLCJtYXRjaF9hbGwiLCJ0cmltIiwicXVlcnlfc3RyaW5nIiwiZGVmYXVsdF9maWVsZCIsImRlZmF1bHRfb3BlcmF0b3IiLCJzcGxpdCIsImpvaW4iLCJzaG91bGQiLCJtdXN0TGlzdCIsInB1c2giLCJBcnJheSIsImlzQXJyYXkiLCJlbmFibGVkIiwibW9uaXRvclNvcnRzIiwibmFtZSIsIm1vbml0b3JTb3J0UGFnZURhdGEiLCJzb3J0IiwiZGVmYXVsdFRvIiwic2VxX25vX3ByaW1hcnlfdGVybSIsIm1pbmltdW1fc2hvdWxkX21hdGNoIiwiYWdncmVnYXRpb25zIiwiYXNzb2NpYXRlZF9jb21wb3NpdGVfbW9uaXRvcnMiLCJuZXN0ZWQiLCJwYXRoIiwibW9uaXRvcl9pZHMiLCJhbGVydGluZ0NhbGxBc0N1cnJlbnRVc2VyIiwidG90YWxNb25pdG9ycyIsIm1vbml0b3JLZXlWYWx1ZVR1cGxlcyIsIm1hcCIsIl9zZXFfbm8iLCJfcHJpbWFyeV90ZXJtIiwiX3NvdXJjZSIsIm1vbml0b3JNYXAiLCJNYXAiLCJhc3NvY2lhdGVkQ29tcG9zaXRlTW9uaXRvckNvdW50TWFwIiwiZm9yRWFjaCIsIm1vbml0b3JJZHNPdXRwdXQiLCJrZXlzIiwiYWdnc09yZGVyRGF0YSIsImFnZ3NTb3J0cyIsImFjdGl2ZSIsImFja25vd2xlZGdlZCIsImVycm9ycyIsImlnbm9yZWQiLCJsYXN0Tm90aWZpY2F0aW9uVGltZSIsIm9yZGVyIiwidW5pcV9tb25pdG9yX2lkcyIsImZpbHRlciIsIm11c3Rfbm90IiwiZXhpc3RzIiwibGFzdF9ub3RpZmljYXRpb25fdGltZSIsIm1heCIsImxhdGVzdF9hbGVydCIsInRvcF9oaXRzIiwic3RhcnRfdGltZSIsImluY2x1ZGVzIiwiZXNBZ2dzUmVzcG9uc2UiLCJidWNrZXRzIiwiYnVja2V0IiwiaGl0cyIsInRyaWdnZXJfbmFtZSIsImxhdGVzdEFsZXJ0IiwiZGVsZXRlIiwiY3VycmVudFRpbWUiLCJEYXRlIiwibm93IiwidW51c2VkTW9uaXRvcnMiLCJ2YWx1ZXMiLCJyZXN1bHRzIiwib3JkZXJCeSIsImNvbmNhdCIsInNsaWNlIiwibW9uaXRvcnMiLCJpc0luZGV4Tm90Rm91bmRFcnJvciIsImFja25vd2xlZGdlUmVzcG9uc2UiLCJmYWlsZWQiLCJkcnlydW4iLCJleGVjdXRlUmVzcG9uc2UiLCJleHBvcnRzIiwibW9kdWxlIl0sInNvdXJjZXMiOlsiTW9uaXRvclNlcnZpY2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBJTkRFWCB9IGZyb20gJy4uLy4uL3V0aWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBpc0luZGV4Tm90Rm91bmRFcnJvciB9IGZyb20gJy4vdXRpbHMvaGVscGVycyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vbml0b3JTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoZXNEcml2ZXIpIHtcbiAgICB0aGlzLmVzRHJpdmVyID0gZXNEcml2ZXI7XG4gIH1cblxuICBjcmVhdGVNb25pdG9yID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgYm9keTogcmVxLmJvZHkgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IGF3YWl0IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IGNyZWF0ZVJlc3BvbnNlID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2FsZXJ0aW5nLmNyZWF0ZU1vbml0b3InLCBwYXJhbXMpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwOiBjcmVhdGVSZXNwb25zZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQWxlcnRpbmcgLSBNb25pdG9yU2VydmljZSAtIGNyZWF0ZU1vbml0b3I6JywgZXJyKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIHJlc3A6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGNyZWF0ZVdvcmtmbG93ID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgYm9keTogcmVxLmJvZHkgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IGF3YWl0IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IGNyZWF0ZVJlc3BvbnNlID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2FsZXJ0aW5nLmNyZWF0ZVdvcmtmbG93JywgcGFyYW1zKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcDogY3JlYXRlUmVzcG9uc2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0FsZXJ0aW5nIC0gTW9uaXRvclNlcnZpY2UgLSBjcmVhdGVXb3JrZmxvdzonLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgcmVzcDogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgZGVsZXRlTW9uaXRvciA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgICAgY29uc3QgcGFyYW1zID0geyBtb25pdG9ySWQ6IGlkIH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSBhd2FpdCB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcSk7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNhbGxBc0N1cnJlbnRVc2VyKCdhbGVydGluZy5kZWxldGVNb25pdG9yJywgcGFyYW1zKTtcblxuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogcmVzcG9uc2UucmVzdWx0ID09PSAnZGVsZXRlZCcgfHwgcmVzcG9uc2UucmVzdWx0ID09PSB1bmRlZmluZWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0FsZXJ0aW5nIC0gTW9uaXRvclNlcnZpY2UgLSBkZWxldGVNb25pdG9yOicsIGVycik7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZXNwOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBkZWxldGVXb3JrZmxvdyA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgICAgY29uc3QgcGFyYW1zID0geyB3b3JrZmxvd0lkOiBpZCB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlciB9ID0gYXdhaXQgdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcuZGVsZXRlV29ya2Zsb3cnLCBwYXJhbXMpO1xuXG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiByZXNwb25zZS5yZXN1bHQgPT09ICdkZWxldGVkJyB8fCByZXNwb25zZS5yZXN1bHQgPT09IHVuZGVmaW5lZCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQWxlcnRpbmcgLSBNb25pdG9yU2VydmljZSAtIGRlbGV0ZVdvcmtmbG93OicsIGVycik7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZXNwOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBnZXRNb25pdG9yID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XG4gICAgICBjb25zdCBwYXJhbXMgPSB7IG1vbml0b3JJZDogaWQgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IGF3YWl0IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IGdldFJlc3BvbnNlID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2FsZXJ0aW5nLmdldE1vbml0b3InLCBwYXJhbXMpO1xuICAgICAgbGV0IG1vbml0b3IgPSBfLmdldChnZXRSZXNwb25zZSwgJ21vbml0b3InLCBudWxsKTtcbiAgICAgIGNvbnN0IHZlcnNpb24gPSBfLmdldChnZXRSZXNwb25zZSwgJ192ZXJzaW9uJywgbnVsbCk7XG4gICAgICBjb25zdCBpZlNlcU5vID0gXy5nZXQoZ2V0UmVzcG9uc2UsICdfc2VxX25vJywgbnVsbCk7XG4gICAgICBjb25zdCBpZlByaW1hcnlUZXJtID0gXy5nZXQoZ2V0UmVzcG9uc2UsICdfcHJpbWFyeV90ZXJtJywgbnVsbCk7XG4gICAgICBjb25zdCBhc3NvY2lhdGVkX3dvcmtmbG93cyA9IF8uZ2V0KGdldFJlc3BvbnNlLCAnYXNzb2NpYXRlZF93b3JrZmxvd3MnLCBudWxsKTtcbiAgICAgIGlmIChtb25pdG9yKSB7XG4gICAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgICAgY29uc3QgYWdnc1BhcmFtcyA9IHtcbiAgICAgICAgICBpbmRleDogSU5ERVguQUxMX0FMRVJUUyxcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBzaXplOiAwLFxuICAgICAgICAgICAgcXVlcnk6IHtcbiAgICAgICAgICAgICAgYm9vbDoge1xuICAgICAgICAgICAgICAgIG11c3Q6IHtcbiAgICAgICAgICAgICAgICAgIHRlcm06IHtcbiAgICAgICAgICAgICAgICAgICAgbW9uaXRvcl9pZDogaWQsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWdnczoge1xuICAgICAgICAgICAgICBhY3RpdmVfY291bnQ6IHtcbiAgICAgICAgICAgICAgICB0ZXJtczoge1xuICAgICAgICAgICAgICAgICAgZmllbGQ6ICdzdGF0ZScsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgJzI0X2hvdXJfY291bnQnOiB7XG4gICAgICAgICAgICAgICAgZGF0ZV9yYW5nZToge1xuICAgICAgICAgICAgICAgICAgZmllbGQ6ICdzdGFydF90aW1lJyxcbiAgICAgICAgICAgICAgICAgIHJhbmdlczogW3sgZnJvbTogJ25vdy0yNGgvaCcgfV0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2VhcmNoUmVzcG9uc2UgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcuZ2V0TW9uaXRvcnMnLCBhZ2dzUGFyYW1zKTtcbiAgICAgICAgY29uc3QgZGF5Q291bnQgPSBfLmdldChzZWFyY2hSZXNwb25zZSwgJ2FnZ3JlZ2F0aW9ucy4yNF9ob3VyX2NvdW50LmJ1Y2tldHMuMC5kb2NfY291bnQnLCAwKTtcbiAgICAgICAgY29uc3QgYWN0aXZlQnVja2V0cyA9IF8uZ2V0KHNlYXJjaFJlc3BvbnNlLCAnYWdncmVnYXRpb25zLmFjdGl2ZV9jb3VudC5idWNrZXRzJywgW10pO1xuICAgICAgICBjb25zdCBhY3RpdmVDb3VudCA9IGFjdGl2ZUJ1Y2tldHMucmVkdWNlKFxuICAgICAgICAgIChhY2MsIGN1cnIpID0+IChjdXJyLmtleSA9PT0gJ0FDVElWRScgPyBjdXJyLmRvY19jb3VudCA6IGFjYyksXG4gICAgICAgICAgMFxuICAgICAgICApO1xuICAgICAgICBpZiAoYXNzb2NpYXRlZF93b3JrZmxvd3MpIHtcbiAgICAgICAgICBtb25pdG9yID0ge1xuICAgICAgICAgICAgLi4ubW9uaXRvcixcbiAgICAgICAgICAgIGFzc29jaWF0ZWRfd29ya2Zsb3dzLFxuICAgICAgICAgICAgYXNzb2NpYXRlZENvbXBvc2l0ZU1vbml0b3JDbnQ6IGFzc29jaWF0ZWRfd29ya2Zsb3dzLmxlbmd0aCxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIG1vbml0b3IgPSB7XG4gICAgICAgICAgLi4ubW9uaXRvcixcbiAgICAgICAgICBpdGVtX3R5cGU6IG1vbml0b3Iud29ya2Zsb3dfdHlwZSB8fCBtb25pdG9yLm1vbml0b3JfdHlwZSxcbiAgICAgICAgICBpZCxcbiAgICAgICAgICB2ZXJzaW9uLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgICBib2R5OiB7IG9rOiB0cnVlLCByZXNwOiBtb25pdG9yLCBhY3RpdmVDb3VudCwgZGF5Q291bnQsIHZlcnNpb24sIGlmU2VxTm8sIGlmUHJpbWFyeVRlcm0gfSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBbGVydGluZyAtIE1vbml0b3JTZXJ2aWNlIC0gZ2V0TW9uaXRvcjonLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgcmVzcDogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0V29ya2Zsb3cgPSBhc3luYyAoY29udGV4dCwgcmVxLCByZXMpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgbW9uaXRvcklkOiBpZCB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlciB9ID0gYXdhaXQgdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgZ2V0UmVzcG9uc2UgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcuZ2V0V29ya2Zsb3cnLCBwYXJhbXMpO1xuICAgICAgbGV0IHdvcmtmbG93ID0gXy5nZXQoZ2V0UmVzcG9uc2UsICd3b3JrZmxvdycsIG51bGwpO1xuICAgICAgY29uc3QgdmVyc2lvbiA9IF8uZ2V0KGdldFJlc3BvbnNlLCAnX3ZlcnNpb24nLCBudWxsKTtcbiAgICAgIGNvbnN0IGlmU2VxTm8gPSBfLmdldChnZXRSZXNwb25zZSwgJ19zZXFfbm8nLCBudWxsKTtcbiAgICAgIGNvbnN0IGlmUHJpbWFyeVRlcm0gPSBfLmdldChnZXRSZXNwb25zZSwgJ19wcmltYXJ5X3Rlcm0nLCBudWxsKTtcbiAgICAgIHdvcmtmbG93Lm1vbml0b3JfdHlwZSA9IHdvcmtmbG93LndvcmtmbG93X3R5cGU7XG4gICAgICB3b3JrZmxvdyA9IHtcbiAgICAgICAgLi4ud29ya2Zsb3csXG4gICAgICAgIGl0ZW1fdHlwZTogd29ya2Zsb3cud29ya2Zsb3dfdHlwZSxcbiAgICAgICAgaWQsXG4gICAgICAgIHZlcnNpb24sXG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3A6IHdvcmtmbG93LFxuICAgICAgICAgIGFjdGl2ZUNvdW50OiAwLFxuICAgICAgICAgIGRheUNvdW50OiAwLFxuICAgICAgICAgIHZlcnNpb24sXG4gICAgICAgICAgaWZTZXFObyxcbiAgICAgICAgICBpZlByaW1hcnlUZXJtLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBbGVydGluZyAtIE1vbml0b3JTZXJ2aWNlIC0gZ2V0V29ya2Zsb3c6JywgZXJyKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIHJlc3A6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIHVwZGF0ZU1vbml0b3IgPSBhc3luYyAoY29udGV4dCwgcmVxLCByZXMpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBpZCB9ID0gcmVxLnBhcmFtcztcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgbW9uaXRvcklkOiBpZCwgYm9keTogcmVxLmJvZHksIHJlZnJlc2g6ICd3YWl0X2ZvcicgfTtcbiAgICAgIGNvbnN0IHsgdHlwZSB9ID0gcmVxLmJvZHk7XG5cbiAgICAgIC8vIFRPRE8gRFJBRlQ6IEFyZSB3ZSBzdXJlIHdlIG5lZWQgdG8gaW5jbHVkZSBpZlNlcU5vIGFuZCBpZlByaW1hcnlUZXJtIGZyb20gdGhlIFVJIHNpZGUgd2hlbiB1cGRhdGluZyBtb25pdG9ycz9cbiAgICAgIGNvbnN0IHsgaWZTZXFObywgaWZQcmltYXJ5VGVybSB9ID0gcmVxLnF1ZXJ5O1xuICAgICAgaWYgKGlmU2VxTm8gJiYgaWZQcmltYXJ5VGVybSkge1xuICAgICAgICBwYXJhbXMuaWZfc2VxX25vID0gaWZTZXFObztcbiAgICAgICAgcGFyYW1zLmlmX3ByaW1hcnlfdGVybSA9IGlmUHJpbWFyeVRlcm07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IGF3YWl0IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IHVwZGF0ZVJlc3BvbnNlID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoXG4gICAgICAgIGBhbGVydGluZy4ke3R5cGUgPT09ICd3b3JrZmxvdycgPyAndXBkYXRlV29ya2Zsb3cnIDogJ3VwZGF0ZU1vbml0b3InfWAsXG4gICAgICAgIHBhcmFtc1xuICAgICAgKTtcbiAgICAgIGNvbnN0IHsgX3ZlcnNpb24sIF9pZCB9ID0gdXBkYXRlUmVzcG9uc2U7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHZlcnNpb246IF92ZXJzaW9uLFxuICAgICAgICAgIGlkOiBfaWQsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0FsZXJ0aW5nIC0gTW9uaXRvclNlcnZpY2UgLSB1cGRhdGVNb25pdG9yOicsIGVycik7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZXNwOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBnZXRNb25pdG9ycyA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGZyb20sIHNpemUsIHNlYXJjaCwgc29ydERpcmVjdGlvbiwgc29ydEZpZWxkLCBzdGF0ZSwgbW9uaXRvcklkcyB9ID0gcmVxLnF1ZXJ5O1xuXG4gICAgICBsZXQgbXVzdCA9IHsgbWF0Y2hfYWxsOiB7fSB9O1xuICAgICAgaWYgKHNlYXJjaC50cmltKCkpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBhbiBleHBlbnNpdmUgd2lsZGNhcmQgcXVlcnkgdG8gbWF0Y2ggbW9uaXRvciBuYW1lcyBzdWNoIGFzOiBcIlRoaXMgaXMgYSBsb25nIG1vbml0b3IgbmFtZVwiXG4gICAgICAgIC8vIHNlYXJjaCBxdWVyeSA9PiBcImxvbmcgbW9uaXRcIlxuICAgICAgICAvLyBUaGlzIGlzIGFjY2VwdGFibGUgYmVjYXVzZSB3ZSB3aWxsIG5ldmVyIGFsbG93IG1vcmUgdGhhbiAxLDAwMCBtb25pdG9yc1xuICAgICAgICBtdXN0ID0ge1xuICAgICAgICAgIHF1ZXJ5X3N0cmluZzoge1xuICAgICAgICAgICAgZGVmYXVsdF9maWVsZDogJ21vbml0b3IubmFtZScsXG4gICAgICAgICAgICBkZWZhdWx0X29wZXJhdG9yOiAnQU5EJyxcbiAgICAgICAgICAgIHF1ZXJ5OiBgKiR7c2VhcmNoLnRyaW0oKS5zcGxpdCgnICcpLmpvaW4oJyogKicpfSpgLFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNob3VsZCA9IFtdO1xuICAgICAgY29uc3QgbXVzdExpc3QgPSBbbXVzdF07XG4gICAgICBpZiAobW9uaXRvcklkcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG11c3RMaXN0LnB1c2goe1xuICAgICAgICAgIHRlcm1zOiB7XG4gICAgICAgICAgICBfaWQ6IEFycmF5LmlzQXJyYXkobW9uaXRvcklkcykgPyBtb25pdG9ySWRzIDogW21vbml0b3JJZHNdLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChtb25pdG9ySWRzID09PSAnZW1wdHknKSB7XG4gICAgICAgIG11c3RMaXN0LnB1c2goe1xuICAgICAgICAgIHRlcm1zOiB7XG4gICAgICAgICAgICBfaWQ6IFtdLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgIT09ICdhbGwnKSB7XG4gICAgICAgIGNvbnN0IGVuYWJsZWQgPSBzdGF0ZSA9PT0gJ2VuYWJsZWQnO1xuICAgICAgICBzaG91bGQucHVzaCh7IHRlcm06IHsgJ21vbml0b3IuZW5hYmxlZCc6IGVuYWJsZWQgfSB9KTtcbiAgICAgICAgc2hvdWxkLnB1c2goeyB0ZXJtOiB7ICd3b3JrZmxvdy5lbmFibGVkJzogZW5hYmxlZCB9IH0pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtb25pdG9yU29ydHMgPSB7IG5hbWU6ICdtb25pdG9yLm5hbWUua2V5d29yZCcgfTtcbiAgICAgIGNvbnN0IG1vbml0b3JTb3J0UGFnZURhdGEgPSB7IHNpemU6IDEwMDAgfTtcbiAgICAgIGlmIChtb25pdG9yU29ydHNbc29ydEZpZWxkXSkge1xuICAgICAgICBtb25pdG9yU29ydFBhZ2VEYXRhLnNvcnQgPSBbeyBbbW9uaXRvclNvcnRzW3NvcnRGaWVsZF1dOiBzb3J0RGlyZWN0aW9uIH1dO1xuICAgICAgICBtb25pdG9yU29ydFBhZ2VEYXRhLnNpemUgPSBfLmRlZmF1bHRUbyhzaXplLCAxMDAwKTtcbiAgICAgICAgbW9uaXRvclNvcnRQYWdlRGF0YS5mcm9tID0gXy5kZWZhdWx0VG8oZnJvbSwgMCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIHNlcV9ub19wcmltYXJ5X3Rlcm06IHRydWUsXG4gICAgICAgICAgdmVyc2lvbjogdHJ1ZSxcbiAgICAgICAgICAuLi5tb25pdG9yU29ydFBhZ2VEYXRhLFxuICAgICAgICAgIHF1ZXJ5OiB7XG4gICAgICAgICAgICBib29sOiB7XG4gICAgICAgICAgICAgIHNob3VsZCxcbiAgICAgICAgICAgICAgbWluaW11bV9zaG91bGRfbWF0Y2g6IHN0YXRlICE9PSAnYWxsJyA/IDEgOiAwLFxuICAgICAgICAgICAgICBtdXN0OiBtdXN0TGlzdCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhZ2dyZWdhdGlvbnM6IHtcbiAgICAgICAgICAgIGFzc29jaWF0ZWRfY29tcG9zaXRlX21vbml0b3JzOiB7XG4gICAgICAgICAgICAgIG5lc3RlZDoge1xuICAgICAgICAgICAgICAgIHBhdGg6ICd3b3JrZmxvdy5pbnB1dHMuY29tcG9zaXRlX2lucHV0LnNlcXVlbmNlLmRlbGVnYXRlcycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGFnZ3M6IHtcbiAgICAgICAgICAgICAgICBtb25pdG9yX2lkczoge1xuICAgICAgICAgICAgICAgICAgdGVybXM6IHtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6ICd3b3JrZmxvdy5pbnB1dHMuY29tcG9zaXRlX2lucHV0LnNlcXVlbmNlLmRlbGVnYXRlcy5tb25pdG9yX2lkJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXI6IGFsZXJ0aW5nQ2FsbEFzQ3VycmVudFVzZXIgfSA9IGF3YWl0IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IGdldFJlc3BvbnNlID0gYXdhaXQgYWxlcnRpbmdDYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcuZ2V0TW9uaXRvcnMnLCBwYXJhbXMpO1xuXG4gICAgICBjb25zdCB0b3RhbE1vbml0b3JzID0gXy5nZXQoZ2V0UmVzcG9uc2UsICdoaXRzLnRvdGFsLnZhbHVlJywgMCk7XG4gICAgICBjb25zdCBtb25pdG9yS2V5VmFsdWVUdXBsZXMgPSBfLmdldChnZXRSZXNwb25zZSwgJ2hpdHMuaGl0cycsIFtdKS5tYXAoKHJlc3VsdCkgPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgX2lkOiBpZCxcbiAgICAgICAgICBfdmVyc2lvbjogdmVyc2lvbixcbiAgICAgICAgICBfc2VxX25vOiBpZlNlcU5vLFxuICAgICAgICAgIF9wcmltYXJ5X3Rlcm06IGlmUHJpbWFyeVRlcm0sXG4gICAgICAgICAgX3NvdXJjZSxcbiAgICAgICAgfSA9IHJlc3VsdDtcbiAgICAgICAgY29uc3QgbW9uaXRvciA9IF9zb3VyY2UubW9uaXRvciA/IF9zb3VyY2UubW9uaXRvciA6IF9zb3VyY2U7XG4gICAgICAgIG1vbml0b3JbJ2l0ZW1fdHlwZSddID0gbW9uaXRvci53b3JrZmxvd190eXBlIHx8IG1vbml0b3IubW9uaXRvcl90eXBlO1xuICAgICAgICBjb25zdCB7IG5hbWUsIGVuYWJsZWQsIGl0ZW1fdHlwZSB9ID0gbW9uaXRvcjtcbiAgICAgICAgcmV0dXJuIFtpZCwgeyBpZCwgdmVyc2lvbiwgaWZTZXFObywgaWZQcmltYXJ5VGVybSwgbmFtZSwgZW5hYmxlZCwgaXRlbV90eXBlLCBtb25pdG9yIH1dO1xuICAgICAgfSwge30pO1xuICAgICAgY29uc3QgbW9uaXRvck1hcCA9IG5ldyBNYXAobW9uaXRvcktleVZhbHVlVHVwbGVzKTtcbiAgICAgIGNvbnN0IGFzc29jaWF0ZWRDb21wb3NpdGVNb25pdG9yQ291bnRNYXAgPSB7fTtcbiAgICAgIF8uZ2V0KFxuICAgICAgICBnZXRSZXNwb25zZSxcbiAgICAgICAgJ2FnZ3JlZ2F0aW9ucy5hc3NvY2lhdGVkX2NvbXBvc2l0ZV9tb25pdG9ycy5tb25pdG9yX2lkcy5idWNrZXRzJyxcbiAgICAgICAgW11cbiAgICAgICkuZm9yRWFjaCgoeyBrZXksIGRvY19jb3VudCB9KSA9PiB7XG4gICAgICAgIGFzc29jaWF0ZWRDb21wb3NpdGVNb25pdG9yQ291bnRNYXBba2V5XSA9IGRvY19jb3VudDtcbiAgICAgIH0pO1xuICAgICAgY29uc3QgbW9uaXRvcklkc091dHB1dCA9IFsuLi5tb25pdG9yTWFwLmtleXMoKV07XG5cbiAgICAgIGNvbnN0IGFnZ3NPcmRlckRhdGEgPSB7fTtcbiAgICAgIGNvbnN0IGFnZ3NTb3J0cyA9IHtcbiAgICAgICAgYWN0aXZlOiAnYWN0aXZlJyxcbiAgICAgICAgYWNrbm93bGVkZ2VkOiAnYWNrbm93bGVkZ2VkJyxcbiAgICAgICAgZXJyb3JzOiAnZXJyb3JzJyxcbiAgICAgICAgaWdub3JlZDogJ2lnbm9yZWQnLFxuICAgICAgICBsYXN0Tm90aWZpY2F0aW9uVGltZTogJ2xhc3Rfbm90aWZpY2F0aW9uX3RpbWUnLFxuICAgICAgfTtcbiAgICAgIGlmIChhZ2dzU29ydHNbc29ydEZpZWxkXSkge1xuICAgICAgICBhZ2dzT3JkZXJEYXRhLm9yZGVyID0geyBbYWdnc1NvcnRzW3NvcnRGaWVsZF1dOiBzb3J0RGlyZWN0aW9uIH07XG4gICAgICB9XG4gICAgICBjb25zdCBhZ2dzUGFyYW1zID0ge1xuICAgICAgICBpbmRleDogSU5ERVguQUxMX0FMRVJUUyxcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIHNpemU6IDAsXG4gICAgICAgICAgcXVlcnk6IHsgdGVybXM6IHsgbW9uaXRvcl9pZDogbW9uaXRvcklkc091dHB1dCB9IH0sXG4gICAgICAgICAgYWdncmVnYXRpb25zOiB7XG4gICAgICAgICAgICB1bmlxX21vbml0b3JfaWRzOiB7XG4gICAgICAgICAgICAgIHRlcm1zOiB7XG4gICAgICAgICAgICAgICAgZmllbGQ6ICdtb25pdG9yX2lkJyxcbiAgICAgICAgICAgICAgICAuLi5hZ2dzT3JkZXJEYXRhLFxuICAgICAgICAgICAgICAgIHNpemU6IGZyb20gKyBzaXplLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBhZ2dyZWdhdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBhY3RpdmU6IHsgZmlsdGVyOiB7IHRlcm06IHsgc3RhdGU6ICdBQ1RJVkUnIH0gfSB9LFxuICAgICAgICAgICAgICAgIGFja25vd2xlZGdlZDogeyBmaWx0ZXI6IHsgdGVybTogeyBzdGF0ZTogJ0FDS05PV0xFREdFRCcgfSB9IH0sXG4gICAgICAgICAgICAgICAgZXJyb3JzOiB7IGZpbHRlcjogeyB0ZXJtOiB7IHN0YXRlOiAnRVJST1InIH0gfSB9LFxuICAgICAgICAgICAgICAgIGlnbm9yZWQ6IHtcbiAgICAgICAgICAgICAgICAgIGZpbHRlcjoge1xuICAgICAgICAgICAgICAgICAgICBib29sOiB7XG4gICAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiB7IHRlcm06IHsgc3RhdGU6ICdDT01QTEVURUQnIH0gfSxcbiAgICAgICAgICAgICAgICAgICAgICBtdXN0X25vdDogeyBleGlzdHM6IHsgZmllbGQ6ICdhY2tub3dsZWRnZWRfdGltZScgfSB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGxhc3Rfbm90aWZpY2F0aW9uX3RpbWU6IHsgbWF4OiB7IGZpZWxkOiAnbGFzdF9ub3RpZmljYXRpb25fdGltZScgfSB9LFxuICAgICAgICAgICAgICAgIGxhdGVzdF9hbGVydDoge1xuICAgICAgICAgICAgICAgICAgdG9wX2hpdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgc2l6ZTogMSxcbiAgICAgICAgICAgICAgICAgICAgc29ydDogW3sgc3RhcnRfdGltZTogeyBvcmRlcjogJ2Rlc2MnIH0gfV0sXG4gICAgICAgICAgICAgICAgICAgIF9zb3VyY2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlczogWydsYXN0X25vdGlmaWNhdGlvbl90aW1lJywgJ3RyaWdnZXJfbmFtZSddLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlciB9ID0gdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgZXNBZ2dzUmVzcG9uc2UgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcuZ2V0TW9uaXRvcnMnLCBhZ2dzUGFyYW1zKTtcbiAgICAgIGNvbnN0IGJ1Y2tldHMgPSBfLmdldChlc0FnZ3NSZXNwb25zZSwgJ2FnZ3JlZ2F0aW9ucy51bmlxX21vbml0b3JfaWRzLmJ1Y2tldHMnLCBbXSkubWFwKFxuICAgICAgICAoYnVja2V0KSA9PiB7XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAga2V5OiBpZCxcbiAgICAgICAgICAgIGxhc3Rfbm90aWZpY2F0aW9uX3RpbWU6IHsgdmFsdWU6IGxhc3ROb3RpZmljYXRpb25UaW1lIH0sXG4gICAgICAgICAgICBpZ25vcmVkOiB7IGRvY19jb3VudDogaWdub3JlZCB9LFxuICAgICAgICAgICAgYWNrbm93bGVkZ2VkOiB7IGRvY19jb3VudDogYWNrbm93bGVkZ2VkIH0sXG4gICAgICAgICAgICBhY3RpdmU6IHsgZG9jX2NvdW50OiBhY3RpdmUgfSxcbiAgICAgICAgICAgIGVycm9yczogeyBkb2NfY291bnQ6IGVycm9ycyB9LFxuICAgICAgICAgICAgbGF0ZXN0X2FsZXJ0OiB7XG4gICAgICAgICAgICAgIGhpdHM6IHtcbiAgICAgICAgICAgICAgICBoaXRzOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIF9zb3VyY2U6IHsgdHJpZ2dlcl9uYW1lOiBsYXRlc3RBbGVydCB9LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9ID0gYnVja2V0O1xuICAgICAgICAgIGNvbnN0IG1vbml0b3IgPSBtb25pdG9yTWFwLmdldChpZCk7XG4gICAgICAgICAgbW9uaXRvck1hcC5kZWxldGUoaWQpO1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5tb25pdG9yLFxuICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICBsYXN0Tm90aWZpY2F0aW9uVGltZSxcbiAgICAgICAgICAgIGlnbm9yZWQsXG4gICAgICAgICAgICBsYXRlc3RBbGVydCxcbiAgICAgICAgICAgIGFja25vd2xlZGdlZCxcbiAgICAgICAgICAgIGFjdGl2ZSxcbiAgICAgICAgICAgIGVycm9ycyxcbiAgICAgICAgICAgIGN1cnJlbnRUaW1lOiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgYXNzb2NpYXRlZENvbXBvc2l0ZU1vbml0b3JDbnQ6IGFzc29jaWF0ZWRDb21wb3NpdGVNb25pdG9yQ291bnRNYXBbaWRdIHx8IDAsXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgICAgY29uc3QgdW51c2VkTW9uaXRvcnMgPSBbLi4ubW9uaXRvck1hcC52YWx1ZXMoKV0ubWFwKChtb25pdG9yKSA9PiAoe1xuICAgICAgICAuLi5tb25pdG9yLFxuICAgICAgICBsYXN0Tm90aWZpY2F0aW9uVGltZTogbnVsbCxcbiAgICAgICAgaWdub3JlZDogMCxcbiAgICAgICAgYWN0aXZlOiAwLFxuICAgICAgICBhY2tub3dsZWRnZWQ6IDAsXG4gICAgICAgIGVycm9yczogMCxcbiAgICAgICAgbGF0ZXN0QWxlcnQ6ICctLScsXG4gICAgICAgIGN1cnJlbnRUaW1lOiBEYXRlLm5vdygpLFxuICAgICAgICBhc3NvY2lhdGVkQ29tcG9zaXRlTW9uaXRvckNudDogYXNzb2NpYXRlZENvbXBvc2l0ZU1vbml0b3JDb3VudE1hcFttb25pdG9yLmlkXSB8fCAwLFxuICAgICAgfSkpO1xuXG4gICAgICBsZXQgcmVzdWx0cyA9IF8ub3JkZXJCeShidWNrZXRzLmNvbmNhdCh1bnVzZWRNb25pdG9ycyksIFtzb3J0RmllbGRdLCBbc29ydERpcmVjdGlvbl0pO1xuICAgICAgLy8gSWYgd2Ugc29ydGVkIG9uIG1vbml0b3IgbmFtZSB0aGVuIHdlIGFscmVhZHkgYXBwbGllZCBmcm9tL3NpemUgdG8gdGhlIGZpcnN0IHF1ZXJ5IHRvIGxpbWl0IHdoYXQgd2UncmUgYWdncmVnYXRpbmcgb3ZlclxuICAgICAgLy8gVGhlcmVmb3JlIHdlIGRvIG5vdCBuZWVkIHRvIGFwcGx5IGZyb20vc2l6ZSB0byB0aGlzIHJlc3VsdCBzZXRcbiAgICAgIC8vIElmIHdlIHNvcnRlZCBvbiBhZ2dyZWdhdGlvbnMsIHRoZW4gdGhpcyBpcyBvdXIgaW4gbWVtb3J5IHBhZ2luYXRpb25cbiAgICAgIGlmICghbW9uaXRvclNvcnRzW3NvcnRGaWVsZF0pIHtcbiAgICAgICAgcmVzdWx0cyA9IHJlc3VsdHMuc2xpY2UoZnJvbSwgZnJvbSArIHNpemUpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIG1vbml0b3JzOiByZXN1bHRzLFxuICAgICAgICAgIHRvdGFsTW9uaXRvcnMsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0FsZXJ0aW5nIC0gTW9uaXRvclNlcnZpY2UgLSBnZXRNb25pdG9ycycsIGVycik7XG4gICAgICBpZiAoaXNJbmRleE5vdEZvdW5kRXJyb3IoZXJyKSkge1xuICAgICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgICBib2R5OiB7IG9rOiBmYWxzZSwgcmVzcDogeyB0b3RhbE1vbml0b3JzOiAwLCBtb25pdG9yczogW10gfSB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIHJlc3A6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGFja25vd2xlZGdlQWxlcnRzID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IHJlcS5wYXJhbXM7XG4gICAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICAgIG1vbml0b3JJZDogaWQsXG4gICAgICAgIGJvZHk6IHJlcS5ib2R5LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IGFja25vd2xlZGdlUmVzcG9uc2UgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcuYWNrbm93bGVkZ2VBbGVydHMnLCBwYXJhbXMpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogIWFja25vd2xlZGdlUmVzcG9uc2UuZmFpbGVkLmxlbmd0aCxcbiAgICAgICAgICByZXNwOiBhY2tub3dsZWRnZVJlc3BvbnNlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBbGVydGluZyAtIE1vbml0b3JTZXJ2aWNlIC0gYWNrbm93bGVkZ2VBbGVydHM6JywgZXJyKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIHJlc3A6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGFja25vd2xlZGdlQ2hhaW5lZEFsZXJ0cyA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSByZXEucGFyYW1zO1xuICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICB3b3JrZmxvd0lkOiBpZCxcbiAgICAgICAgYm9keTogcmVxLmJvZHksXG4gICAgICB9O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlciB9ID0gdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgYWNrbm93bGVkZ2VSZXNwb25zZSA9IGF3YWl0IGNhbGxBc0N1cnJlbnRVc2VyKFxuICAgICAgICAnYWxlcnRpbmcuYWNrbm93bGVkZ2VDaGFpbmVkQWxlcnRzJyxcbiAgICAgICAgcGFyYW1zXG4gICAgICApO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogIWFja25vd2xlZGdlUmVzcG9uc2UuZmFpbGVkLmxlbmd0aCxcbiAgICAgICAgICByZXNwOiBhY2tub3dsZWRnZVJlc3BvbnNlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBbGVydGluZyAtIE1vbml0b3JTZXJ2aWNlIC0gYWNrbm93bGVkZ2VDaGFpbmVkQWxlcnRzOicsIGVycik7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZXNwOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBleGVjdXRlTW9uaXRvciA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGRyeXJ1biA9ICd0cnVlJyB9ID0gcmVxLnF1ZXJ5O1xuICAgICAgY29uc3QgcGFyYW1zID0ge1xuICAgICAgICBib2R5OiByZXEuYm9keSxcbiAgICAgICAgZHJ5cnVuLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IGF3YWl0IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IGV4ZWN1dGVSZXNwb25zZSA9IGF3YWl0IGNhbGxBc0N1cnJlbnRVc2VyKCdhbGVydGluZy5leGVjdXRlTW9uaXRvcicsIHBhcmFtcyk7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3A6IGV4ZWN1dGVSZXNwb25zZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQWxlcnRpbmcgLSBNb25pdG9yU2VydmljZSAtIGV4ZWN1dGVNb25pdG9yOicsIGVycik7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZXNwOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICAvL1RPRE86IFRoaXMgaXMgdGVtcG9yYXJpbHkgYSBwYXNzIHRocm91Z2ggY2FsbCB3aGljaCBuZWVkcyB0byBiZSBkZXByZWNhdGVkXG4gIHNlYXJjaE1vbml0b3JzID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcXVlcnksIGluZGV4LCBzaXplIH0gPSByZXEuYm9keTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgaW5kZXgsIHNpemUsIGJvZHk6IHF1ZXJ5IH07XG5cbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IGF3YWl0IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignYWxlcnRpbmcuZ2V0TW9uaXRvcnMnLCBwYXJhbXMpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwOiByZXN1bHRzLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdBbGVydGluZyAtIE1vbml0b3JTZXJ2aWNlIC0gc2VhcmNoTW9uaXRvcjonLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgcmVzcDogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUtBLElBQUFBLE9BQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUVBLElBQUFDLFVBQUEsR0FBQUQsT0FBQTtBQUNBLElBQUFFLFFBQUEsR0FBQUYsT0FBQTtBQUF1RCxTQUFBRCx1QkFBQUksR0FBQSxXQUFBQSxHQUFBLElBQUFBLEdBQUEsQ0FBQUMsVUFBQSxHQUFBRCxHQUFBLEtBQUFFLE9BQUEsRUFBQUYsR0FBQTtBQUFBLFNBQUFHLGdCQUFBSCxHQUFBLEVBQUFJLEdBQUEsRUFBQUMsS0FBQSxJQUFBRCxHQUFBLEdBQUFFLGNBQUEsQ0FBQUYsR0FBQSxPQUFBQSxHQUFBLElBQUFKLEdBQUEsSUFBQU8sTUFBQSxDQUFBQyxjQUFBLENBQUFSLEdBQUEs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