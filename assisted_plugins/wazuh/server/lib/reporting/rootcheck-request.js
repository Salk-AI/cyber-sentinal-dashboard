"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.top5RootkitsDetected = exports.agentsWithHiddenPorts = exports.agentsWithHiddenPids = void 0;
var _baseQuery = require("./base-query");
/*
 * Wazuh app - Specific methods to fetch Wazuh rootcheck data from Elasticsearch
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

/**
 * Returns top 5 rootkits found along all agents
 * @param {*} context Endpoint context
 * @param {Number} gte Timestamp (ms) from
 * @param {Number} lte Timestamp (ms) to
 * @param {String} filters E.g: cluster.name: wazuh AND rule.groups: vulnerability
 * @returns {Array<String>}
 */
const top5RootkitsDetected = async (context, gte, lte, filters, allowedAgentsFilter, pattern, size = 5) => {
  try {
    var _base$query;
    const base = {};
    Object.assign(base, (0, _baseQuery.Base)(pattern, filters, gte, lte, allowedAgentsFilter));
    Object.assign(base.aggs, {
      '2': {
        terms: {
          field: 'data.title',
          size: size,
          order: {
            _count: 'desc'
          }
        }
      }
    });
    (_base$query = base.query) === null || _base$query === void 0 || (_base$query = _base$query.bool) === null || _base$query === void 0 || (_base$query = _base$query.must) === null || _base$query === void 0 || _base$query.push({
      query_string: {
        query: '"rootkit" AND "detected"'
      }
    });
    const response = await context.core.opensearch.client.asCurrentUser.search({
      index: pattern,
      body: base
    });
    const {
      buckets
    } = response.body.aggregations['2'];
    const mapped = buckets.map(item => item.key);
    const result = [];
    for (const item of mapped) {
      result.push(item.split("'")[1].split("'")[0]);
    }
    return result.filter((item, pos) => result.indexOf(item) === pos);
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Returns the number of agents that have one or more hidden processes
 * @param {*} context Endpoint context
 * @param {Number} gte Timestamp (ms) from
 * @param {Number} lte Timestamp (ms) to
 * @param {String} filters E.g: cluster.name: wazuh AND rule.groups: vulnerability
 * @returns {Array<String>}
 */
exports.top5RootkitsDetected = top5RootkitsDetected;
const agentsWithHiddenPids = async (context, gte, lte, filters, allowedAgentsFilter, pattern) => {
  try {
    var _base$query2;
    const base = {};
    Object.assign(base, (0, _baseQuery.Base)(pattern, filters, gte, lte, allowedAgentsFilter));
    Object.assign(base.aggs, {
      '1': {
        cardinality: {
          field: 'agent.id'
        }
      }
    });
    (_base$query2 = base.query) === null || _base$query2 === void 0 || (_base$query2 = _base$query2.bool) === null || _base$query2 === void 0 || (_base$query2 = _base$query2.must) === null || _base$query2 === void 0 || _base$query2.push({
      query_string: {
        query: '"process" AND "hidden"'
      }
    });

    // "aggregations": { "1": { "value": 1 } }
    const response = await context.core.opensearch.client.asCurrentUser.search({
      index: pattern,
      body: base
    });
    return response.body && response.body.aggregations && response.body.aggregations['1'] && response.body.aggregations['1'].value ? response.body.aggregations['1'].value : 0;
  } catch (error) {
    return Promise.reject(error);
  }
};

/**
 * Returns the number of agents that have one or more hidden ports
 * @param {*} context Endpoint context
 * @param {Number} gte Timestamp (ms) from
 * @param {Number} lte Timestamp (ms) to
 * @param {String} filters E.g: cluster.name: wazuh AND rule.groups: vulnerability
 * @returns {Array<String>}
 */
exports.agentsWithHiddenPids = agentsWithHiddenPids;
const agentsWithHiddenPorts = async (context, gte, lte, filters, allowedAgentsFilter, pattern) => {
  try {
    var _base$query3;
    const base = {};
    Object.assign(base, (0, _baseQuery.Base)(pattern, filters, gte, lte, allowedAgentsFilter));
    Object.assign(base.aggs, {
      '1': {
        cardinality: {
          field: 'agent.id'
        }
      }
    });
    (_base$query3 = base.query) === null || _base$query3 === void 0 || (_base$query3 = _base$query3.bool) === null || _base$query3 === void 0 || (_base$query3 = _base$query3.must) === null || _base$query3 === void 0 || _base$query3.push({
      query_string: {
        query: '"port" AND "hidden"'
      }
    });

    // "aggregations": { "1": { "value": 1 } }
    const response = await context.core.opensearch.client.asCurrentUser.search({
      index: pattern,
      body: base
    });
    return response.body && response.body.aggregations && response.body.aggregations['1'] && response.body.aggregations['1'].value ? response.body.aggregations['1'].value : 0;
  } catch (error) {
    return Promise.reject(error);
  }
};
exports.agentsWithHiddenPorts = agentsWithHiddenPorts;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfYmFzZVF1ZXJ5IiwicmVxdWlyZSIsInRvcDVSb290a2l0c0RldGVjdGVkIiwiY29udGV4dCIsImd0ZSIsImx0ZSIsImZpbHRlcnMiLCJhbGxvd2VkQWdlbnRzRmlsdGVyIiwicGF0dGVybiIsInNpemUiLCJfYmFzZSRxdWVyeSIsImJhc2UiLCJPYmplY3QiLCJhc3NpZ24iLCJCYXNlIiwiYWdncyIsInRlcm1zIiwiZmllbGQiLCJvcmRlciIsIl9jb3VudCIsInF1ZXJ5IiwiYm9vbCIsIm11c3QiLCJwdXNoIiwicXVlcnlfc3RyaW5nIiwicmVzcG9uc2UiLCJjb3JlIiwib3BlbnNlYXJjaCIsImNsaWVudCIsImFzQ3VycmVudFVzZXIiLCJzZWFyY2giLCJpbmRleCIsImJvZHkiLCJidWNrZXRzIiwiYWdncmVnYXRpb25zIiwibWFwcGVkIiwibWFwIiwiaXRlbSIsImtleSIsInJlc3VsdCIsInNwbGl0IiwiZmlsdGVyIiwicG9zIiwiaW5kZXhPZiIsImVycm9yIiwiUHJvbWlzZSIsInJlamVjdCIsImV4cG9ydHMiLCJhZ2VudHNXaXRoSGlkZGVuUGlkcyIsIl9iYXNlJHF1ZXJ5MiIsImNhcmRpbmFsaXR5IiwidmFsdWUiLCJhZ2VudHNXaXRoSGlkZGVuUG9ydHMiLCJfYmFzZSRxdWVyeTMiXSwic291cmNlcyI6WyJyb290Y2hlY2stcmVxdWVzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogV2F6dWggYXBwIC0gU3BlY2lmaWMgbWV0aG9kcyB0byBmZXRjaCBXYXp1aCByb290Y2hlY2sgZGF0YSBmcm9tIEVsYXN0aWNzZWFyY2hcbiAqIENvcHlyaWdodCAoQykgMjAxNS0yMDIyIFdhenVoLCBJbmMuXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU7IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uOyBlaXRoZXIgdmVyc2lvbiAyIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBGaW5kIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhpcyBvbiB0aGUgTElDRU5TRSBmaWxlLlxuICovXG5pbXBvcnQgeyBCYXNlIH0gZnJvbSAnLi9iYXNlLXF1ZXJ5JztcblxuLyoqXG4gKiBSZXR1cm5zIHRvcCA1IHJvb3RraXRzIGZvdW5kIGFsb25nIGFsbCBhZ2VudHNcbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBFbmRwb2ludCBjb250ZXh0XG4gKiBAcGFyYW0ge051bWJlcn0gZ3RlIFRpbWVzdGFtcCAobXMpIGZyb21cbiAqIEBwYXJhbSB7TnVtYmVyfSBsdGUgVGltZXN0YW1wIChtcykgdG9cbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWx0ZXJzIEUuZzogY2x1c3Rlci5uYW1lOiB3YXp1aCBBTkQgcnVsZS5ncm91cHM6IHZ1bG5lcmFiaWxpdHlcbiAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fVxuICovXG5leHBvcnQgY29uc3QgdG9wNVJvb3RraXRzRGV0ZWN0ZWQgPSBhc3luYyAoXG4gIGNvbnRleHQsXG4gIGd0ZSxcbiAgbHRlLFxuICBmaWx0ZXJzLFxuICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICBwYXR0ZXJuLFxuICBzaXplID0gNSxcbikgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGJhc2UgPSB7fTtcblxuICAgIE9iamVjdC5hc3NpZ24oYmFzZSwgQmFzZShwYXR0ZXJuLCBmaWx0ZXJzLCBndGUsIGx0ZSwgYWxsb3dlZEFnZW50c0ZpbHRlcikpO1xuXG4gICAgT2JqZWN0LmFzc2lnbihiYXNlLmFnZ3MsIHtcbiAgICAgICcyJzoge1xuICAgICAgICB0ZXJtczoge1xuICAgICAgICAgIGZpZWxkOiAnZGF0YS50aXRsZScsXG4gICAgICAgICAgc2l6ZTogc2l6ZSxcbiAgICAgICAgICBvcmRlcjoge1xuICAgICAgICAgICAgX2NvdW50OiAnZGVzYycsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBiYXNlLnF1ZXJ5Py5ib29sPy5tdXN0Py5wdXNoKHtcbiAgICAgIHF1ZXJ5X3N0cmluZzoge1xuICAgICAgICBxdWVyeTogJ1wicm9vdGtpdFwiIEFORCBcImRldGVjdGVkXCInLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY29udGV4dC5jb3JlLm9wZW5zZWFyY2guY2xpZW50LmFzQ3VycmVudFVzZXIuc2VhcmNoKHtcbiAgICAgIGluZGV4OiBwYXR0ZXJuLFxuICAgICAgYm9keTogYmFzZSxcbiAgICB9KTtcbiAgICBjb25zdCB7IGJ1Y2tldHMgfSA9IHJlc3BvbnNlLmJvZHkuYWdncmVnYXRpb25zWycyJ107XG4gICAgY29uc3QgbWFwcGVkID0gYnVja2V0cy5tYXAoaXRlbSA9PiBpdGVtLmtleSk7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG5cbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgbWFwcGVkKSB7XG4gICAgICByZXN1bHQucHVzaChpdGVtLnNwbGl0KFwiJ1wiKVsxXS5zcGxpdChcIidcIilbMF0pO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQuZmlsdGVyKChpdGVtLCBwb3MpID0+IHJlc3VsdC5pbmRleE9mKGl0ZW0pID09PSBwb3MpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGFnZW50cyB0aGF0IGhhdmUgb25lIG9yIG1vcmUgaGlkZGVuIHByb2Nlc3Nlc1xuICogQHBhcmFtIHsqfSBjb250ZXh0IEVuZHBvaW50IGNvbnRleHRcbiAqIEBwYXJhbSB7TnVtYmVyfSBndGUgVGltZXN0YW1wIChtcykgZnJvbVxuICogQHBhcmFtIHtOdW1iZXJ9IGx0ZSBUaW1lc3RhbXAgKG1zKSB0b1xuICogQHBhcmFtIHtTdHJpbmd9IGZpbHRlcnMgRS5nOiBjbHVzdGVyLm5hbWU6IHdhenVoIEFORCBydWxlLmdyb3VwczogdnVsbmVyYWJpbGl0eVxuICogQHJldHVybnMge0FycmF5PFN0cmluZz59XG4gKi9cbmV4cG9ydCBjb25zdCBhZ2VudHNXaXRoSGlkZGVuUGlkcyA9IGFzeW5jIChcbiAgY29udGV4dCxcbiAgZ3RlLFxuICBsdGUsXG4gIGZpbHRlcnMsXG4gIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gIHBhdHRlcm4sXG4pID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBiYXNlID0ge307XG5cbiAgICBPYmplY3QuYXNzaWduKGJhc2UsIEJhc2UocGF0dGVybiwgZmlsdGVycywgZ3RlLCBsdGUsIGFsbG93ZWRBZ2VudHNGaWx0ZXIpKTtcblxuICAgIE9iamVjdC5hc3NpZ24oYmFzZS5hZ2dzLCB7XG4gICAgICAnMSc6IHtcbiAgICAgICAgY2FyZGluYWxpdHk6IHtcbiAgICAgICAgICBmaWVsZDogJ2FnZW50LmlkJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBiYXNlLnF1ZXJ5Py5ib29sPy5tdXN0Py5wdXNoKHtcbiAgICAgIHF1ZXJ5X3N0cmluZzoge1xuICAgICAgICBxdWVyeTogJ1wicHJvY2Vzc1wiIEFORCBcImhpZGRlblwiJyxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyBcImFnZ3JlZ2F0aW9uc1wiOiB7IFwiMVwiOiB7IFwidmFsdWVcIjogMSB9IH1cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNvbnRleHQuY29yZS5vcGVuc2VhcmNoLmNsaWVudC5hc0N1cnJlbnRVc2VyLnNlYXJjaCh7XG4gICAgICBpbmRleDogcGF0dGVybixcbiAgICAgIGJvZHk6IGJhc2UsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keSAmJlxuICAgICAgcmVzcG9uc2UuYm9keS5hZ2dyZWdhdGlvbnMgJiZcbiAgICAgIHJlc3BvbnNlLmJvZHkuYWdncmVnYXRpb25zWycxJ10gJiZcbiAgICAgIHJlc3BvbnNlLmJvZHkuYWdncmVnYXRpb25zWycxJ10udmFsdWVcbiAgICAgID8gcmVzcG9uc2UuYm9keS5hZ2dyZWdhdGlvbnNbJzEnXS52YWx1ZVxuICAgICAgOiAwO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGFnZW50cyB0aGF0IGhhdmUgb25lIG9yIG1vcmUgaGlkZGVuIHBvcnRzXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgRW5kcG9pbnQgY29udGV4dFxuICogQHBhcmFtIHtOdW1iZXJ9IGd0ZSBUaW1lc3RhbXAgKG1zKSBmcm9tXG4gKiBAcGFyYW0ge051bWJlcn0gbHRlIFRpbWVzdGFtcCAobXMpIHRvXG4gKiBAcGFyYW0ge1N0cmluZ30gZmlsdGVycyBFLmc6IGNsdXN0ZXIubmFtZTogd2F6dWggQU5EIHJ1bGUuZ3JvdXBzOiB2dWxuZXJhYmlsaXR5XG4gKiBAcmV0dXJucyB7QXJyYXk8U3RyaW5nPn1cbiAqL1xuZXhwb3J0IGNvbnN0IGFnZW50c1dpdGhIaWRkZW5Qb3J0cyA9IGFzeW5jIChcbiAgY29udGV4dCxcbiAgZ3RlLFxuICBsdGUsXG4gIGZpbHRlcnMsXG4gIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gIHBhdHRlcm4sXG4pID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBiYXNlID0ge307XG5cbiAgICBPYmplY3QuYXNzaWduKGJhc2UsIEJhc2UocGF0dGVybiwgZmlsdGVycywgZ3RlLCBsdGUsIGFsbG93ZWRBZ2VudHNGaWx0ZXIpKTtcblxuICAgIE9iamVjdC5hc3NpZ24oYmFzZS5hZ2dzLCB7XG4gICAgICAnMSc6IHtcbiAgICAgICAgY2FyZGluYWxpdHk6IHtcbiAgICAgICAgICBmaWVsZDogJ2FnZW50LmlkJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBiYXNlLnF1ZXJ5Py5ib29sPy5tdXN0Py5wdXNoKHtcbiAgICAgIHF1ZXJ5X3N0cmluZzoge1xuICAgICAgICBxdWVyeTogJ1wicG9ydFwiIEFORCBcImhpZGRlblwiJyxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyBcImFnZ3JlZ2F0aW9uc1wiOiB7IFwiMVwiOiB7IFwidmFsdWVcIjogMSB9IH1cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNvbnRleHQuY29yZS5vcGVuc2VhcmNoLmNsaWVudC5hc0N1cnJlbnRVc2VyLnNlYXJjaCh7XG4gICAgICBpbmRleDogcGF0dGVybixcbiAgICAgIGJvZHk6IGJhc2UsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2UuYm9keSAmJlxuICAgICAgcmVzcG9uc2UuYm9keS5hZ2dyZWdhdGlvbnMgJiZcbiAgICAgIHJlc3BvbnNlLmJvZHkuYWdncmVnYXRpb25zWycxJ10gJiZcbiAgICAgIHJlc3BvbnNlLmJvZHkuYWdncmVnYXRpb25zWycxJ10udmFsdWVcbiAgICAgID8gcmVzcG9uc2UuYm9keS5hZ2dyZWdhdGlvbnNbJzEnXS52YWx1ZVxuICAgICAgOiAwO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gIH1cbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQVdBLElBQUFBLFVBQUEsR0FBQUMsT0FBQTtBQVhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLE1BQU1DLG9CQUFvQixHQUFHLE1BQUFBLENBQ2xDQyxPQUFPLEVBQ1BDLEdBQUcsRUFDSEMsR0FBRyxFQUNIQyxPQUFPLEVBQ1BDLG1CQUFtQixFQUNuQkMsT0FBTyxFQUNQQyxJQUFJLEdBQUcsQ0FBQyxLQUNMO0VBQ0gsSUFBSTtJQUFBLElB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