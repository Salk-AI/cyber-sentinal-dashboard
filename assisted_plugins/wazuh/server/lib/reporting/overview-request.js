"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.topLevel15 = void 0;
var _baseQuery = require("./base-query");
/*
 * Wazuh app - Specific methods to fetch Wazuh overview data from Elasticsearch
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
 * Returns top 3 agents with level 15 alerts
 * @param {*} context Endpoint context
 * @param {Number} gte Timestamp (ms) from
 * @param {Number} lte Timestamp (ms) to
 * @param {String} filters E.g: cluster.name: wazuh AND rule.groups: vulnerability
 * @returns {Array<String>} E.g:['000','130','300']
 */
const topLevel15 = async (context, gte, lte, filters, allowedAgentsFilter, pattern) => {
  try {
    const base = {};
    Object.assign(base, (0, _baseQuery.Base)(pattern, filters, gte, lte, allowedAgentsFilter));
    Object.assign(base.aggs, {
      '2': {
        terms: {
          field: 'agent.id',
          size: 3,
          order: {
            _count: 'desc'
          }
        }
      }
    });
    base.query.bool.must.push({
      match_phrase: {
        'rule.level': {
          query: 15
        }
      }
    });
    const response = await context.core.opensearch.client.asCurrentUser.search({
      index: pattern,
      body: base
    });
    const {
      buckets
    } = response.body.aggregations['2'];
    return buckets.map(item => item.key);
  } catch (error) {
    return Promise.reject(error);
  }
};
exports.topLevel15 = topLevel15;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfYmFzZVF1ZXJ5IiwicmVxdWlyZSIsInRvcExldmVsMTUiLCJjb250ZXh0IiwiZ3RlIiwibHRlIiwiZmlsdGVycyIsImFsbG93ZWRBZ2VudHNGaWx0ZXIiLCJwYXR0ZXJuIiwiYmFzZSIsIk9iamVjdCIsImFzc2lnbiIsIkJhc2UiLCJhZ2dzIiwidGVybXMiLCJmaWVsZCIsInNpemUiLCJvcmRlciIsIl9jb3VudCIsInF1ZXJ5IiwiYm9vbCIsIm11c3QiLCJwdXNoIiwibWF0Y2hfcGhyYXNlIiwicmVzcG9uc2UiLCJjb3JlIiwib3BlbnNlYXJjaCIsImNsaWVudCIsImFzQ3VycmVudFVzZXIiLCJzZWFyY2giLCJpbmRleCIsImJvZHkiLCJidWNrZXRzIiwiYWdncmVnYXRpb25zIiwibWFwIiwiaXRlbSIsImtleSIsImVycm9yIiwiUHJvbWlzZSIsInJlamVjdCIsImV4cG9ydHMiXSwic291cmNlcyI6WyJvdmVydmlldy1yZXF1ZXN0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBXYXp1aCBhcHAgLSBTcGVjaWZpYyBtZXRob2RzIHRvIGZldGNoIFdhenVoIG92ZXJ2aWV3IGRhdGEgZnJvbSBFbGFzdGljc2VhcmNoXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTUtMjAyMiBXYXp1aCwgSW5jLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOyB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbjsgZWl0aGVyIHZlcnNpb24gMiBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogRmluZCBtb3JlIGluZm9ybWF0aW9uIGFib3V0IHRoaXMgb24gdGhlIExJQ0VOU0UgZmlsZS5cbiAqL1xuaW1wb3J0IHsgQmFzZSB9IGZyb20gJy4vYmFzZS1xdWVyeSc7XG5cbi8qKlxuICogUmV0dXJucyB0b3AgMyBhZ2VudHMgd2l0aCBsZXZlbCAxNSBhbGVydHNcbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBFbmRwb2ludCBjb250ZXh0XG4gKiBAcGFyYW0ge051bWJlcn0gZ3RlIFRpbWVzdGFtcCAobXMpIGZyb21cbiAqIEBwYXJhbSB7TnVtYmVyfSBsdGUgVGltZXN0YW1wIChtcykgdG9cbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWx0ZXJzIEUuZzogY2x1c3Rlci5uYW1lOiB3YXp1aCBBTkQgcnVsZS5ncm91cHM6IHZ1bG5lcmFiaWxpdHlcbiAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fSBFLmc6WycwMDAnLCcxMzAnLCczMDAnXVxuICovXG5leHBvcnQgY29uc3QgdG9wTGV2ZWwxNSA9IGFzeW5jIChcbiAgY29udGV4dCxcbiAgZ3RlLFxuICBsdGUsXG4gIGZpbHRlcnMsXG4gIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gIHBhdHRlcm4sXG4pID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBiYXNlID0ge307XG5cbiAgICBPYmplY3QuYXNzaWduKGJhc2UsIEJhc2UocGF0dGVybiwgZmlsdGVycywgZ3RlLCBsdGUsIGFsbG93ZWRBZ2VudHNGaWx0ZXIpKTtcblxuICAgIE9iamVjdC5hc3NpZ24oYmFzZS5hZ2dzLCB7XG4gICAgICAnMic6IHtcbiAgICAgICAgdGVybXM6IHtcbiAgICAgICAgICBmaWVsZDogJ2FnZW50LmlkJyxcbiAgICAgICAgICBzaXplOiAzLFxuICAgICAgICAgIG9yZGVyOiB7XG4gICAgICAgICAgICBfY291bnQ6ICdkZXNjJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGJhc2UucXVlcnkuYm9vbC5tdXN0LnB1c2goe1xuICAgICAgbWF0Y2hfcGhyYXNlOiB7XG4gICAgICAgICdydWxlLmxldmVsJzoge1xuICAgICAgICAgIHF1ZXJ5OiAxNSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjb250ZXh0LmNvcmUub3BlbnNlYXJjaC5jbGllbnQuYXNDdXJyZW50VXNlci5zZWFyY2goe1xuICAgICAgaW5kZXg6IHBhdHRlcm4sXG4gICAgICBib2R5OiBiYXNlLFxuICAgIH0pO1xuICAgIGNvbnN0IHsgYnVja2V0cyB9ID0gcmVzcG9uc2UuYm9keS5hZ2dyZWdhdGlvbnNbJzInXTtcblxuICAgIHJldHVybiBidWNrZXRzLm1hcChpdGVtID0+IGl0ZW0ua2V5KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICB9XG59O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFXQSxJQUFBQSxVQUFBLEdBQUFDLE9BQUE7QUFYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxNQUFNQyxVQUFVLEdBQUcsTUFBQUEsQ0FDeEJDLE9BQU8sRUFDUEMsR0FBRyxFQUNIQyxHQUFHLEVBQ0hDLE9BQU8sRUFDUEMsbUJBQW1CLEVBQ25CQyxPQUFPLEtBQ0o7RUFDSCxJQUFJO0lBQ0YsTUFBTUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUVmQyxNQUFNLENBQUNDLE1BQU0sQ0FBQ0YsSUFBSSxFQUFFLElBQUFHLGVBQUksRUFBQ0osT0FBTyxFQUFFRixPQUFPLEVBQUVGLEdBQUcsRUFBRUMsR0FBRyxFQUFFRSxtQkFBbUIsQ0FBQyxDQUFDO0lBRTFFRyxNQUFNLENBQUNDLE1BQU0sQ0FBQ0YsSUFBSSxDQUFDSSxJQUFJLEVBQUU7TUFDdkIsR0FBRyxFQUFFO1FBQ0hDLEtBQUssRUFBRTtVQUNMQyxLQUFLLEVBQUUsVUFBVTtVQUNqQkMsSUFBSSxFQUFFLENBQUM7VUFDUEMsS0FBSyxFQUFFO1lBQ0xDLE1BQU0sRUFBRTtVQUNWO1FBQ0Y7TUFDRjtJQUNGLENBQUMsQ0FBQztJQUVGVCxJQUFJLENBQUNVLEtBQUssQ0FBQ0MsSUFBSSxDQUFDQyxJQUFJLENBQUNDLElBQUksQ0FBQztNQUN4QkMsWUFBWSxFQUFFO1FBQ1osWUFBWSxFQUFFO1VBQ1pKLEtBQUssRUFBRTtRQUNUO01BQ0Y7SUFDRixDQUFDLENBQUM7SUFDRixNQUFNSyxRQUFRLEdBQUcsTUFBTXJCLE9BQU8sQ0FBQ3NCLElBQUksQ0FBQ0MsVUFBVSxDQUFDQyxNQUFNLENBQUNDLGFBQWEsQ0FBQ0MsTUFBTSxDQUFDO01BQ3pFQyxLQUFLLEVBQUV0QixPQUFPO01BQ2R1QixJQUFJLEVBQUV0QjtJQUNSLENBQUMsQ0FBQztJQUNGLE1BQU07TUFBRXVCO0lBQVEsQ0FBQyxHQUFHUixRQUFRLENBQUNPLElBQUksQ0FBQ0UsWUFBWSxDQUFDLEdBQUcsQ0FBQztJQUVuRCxPQUFPRCxPQUFPLENBQUNFLEdBQUcsQ0FBQ0MsSUFBSSxJQUFJQSxJQUFJLENBQUNDLEdBQUcsQ0FBQztFQUN0QyxDQUFDLENBQUMsT0FBT0MsS0FBSyxFQUFFO0lBQ2QsT0FBT0MsT0FBTyxDQUFDQyxNQUFNLENBQUNGLEtBQUssQ0FBQztFQUM5QjtBQUNGLENBQUM7QUFBQ0csT0FBQSxDQUFBdEMsVUFBQSxHQUFBQSxVQUFBIn0=