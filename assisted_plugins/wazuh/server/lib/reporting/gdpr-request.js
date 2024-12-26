"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.topGDPRRequirements = exports.getRulesByRequirement = void 0;
var _baseQuery = require("./base-query");
/*
 * Wazuh app - Specific methods to fetch Wazuh GDPR data from Elasticsearch
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
 * Returns top 5 GDPR requirements
 * @param {*} context Endpoint context
 * @param {Number} gte Timestamp (ms) from
 * @param {Number} lte Timestamp (ms) to
 * @param {String} filters E.g: cluster.name: wazuh AND rule.groups: vulnerability
 * @returns {Array<String>}
 */
const topGDPRRequirements = async (context, gte, lte, filters, allowedAgentsFilter, pattern) => {
  try {
    const base = {};
    Object.assign(base, (0, _baseQuery.Base)(pattern, filters, gte, lte, allowedAgentsFilter));
    Object.assign(base.aggs, {
      '2': {
        terms: {
          field: 'rule.gdpr',
          size: 5,
          order: {
            _count: 'desc'
          }
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

/**
 * Returns top 3 rules for specific GDPR requirement
 * @param {*} context Endpoint context
 * @param {Number} gte Timestamp (ms) from
 * @param {Number} lte Timestamp (ms) to
 * @param {String} requirement GDPR requirement. E.g: 'II_5.1.F'
 * @param {String} filters E.g: cluster.name: wazuh AND rule.groups: vulnerability
 * @returns {Array<String>}
 */
exports.topGDPRRequirements = topGDPRRequirements;
const getRulesByRequirement = async (context, gte, lte, filters, allowedAgentsFilter, requirement, pattern) => {
  try {
    const base = {};
    Object.assign(base, (0, _baseQuery.Base)(pattern, filters, gte, lte, allowedAgentsFilter));
    Object.assign(base.aggs, {
      '2': {
        terms: {
          field: 'rule.description',
          size: 3,
          order: {
            _count: 'desc'
          }
        },
        aggs: {
          '3': {
            terms: {
              field: 'rule.id',
              size: 1,
              order: {
                _count: 'desc'
              }
            }
          }
        }
      }
    });
    base.query.bool.filter.push({
      match_phrase: {
        'rule.gdpr': {
          query: requirement
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
    return buckets.reduce((accum, bucket) => {
      if (!bucket || !bucket['3'] || !bucket['3'].buckets || !bucket['3'].buckets[0] || !bucket['3'].buckets[0].key || !bucket.key) {
        return accum;
      }
      accum.push({
        ruleID: bucket['3'].buckets[0].key,
        ruleDescription: bucket.key
      });
      return accum;
    }, []);
  } catch (error) {
    return Promise.reject(error);
  }
};
exports.getRulesByRequirement = getRulesByRequirement;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfYmFzZVF1ZXJ5IiwicmVxdWlyZSIsInRvcEdEUFJSZXF1aXJlbWVudHMiLCJjb250ZXh0IiwiZ3RlIiwibHRlIiwiZmlsdGVycyIsImFsbG93ZWRBZ2VudHNGaWx0ZXIiLCJwYXR0ZXJuIiwiYmFzZSIsIk9iamVjdCIsImFzc2lnbiIsIkJhc2UiLCJhZ2dzIiwidGVybXMiLCJmaWVsZCIsInNpemUiLCJvcmRlciIsIl9jb3VudCIsInJlc3BvbnNlIiwiY29yZSIsIm9wZW5zZWFyY2giLCJjbGllbnQiLCJhc0N1cnJlbnRVc2VyIiwic2VhcmNoIiwiaW5kZXgiLCJib2R5IiwiYnVja2V0cyIsImFnZ3JlZ2F0aW9ucyIsIm1hcCIsIml0ZW0iLCJrZXkiLCJlcnJvciIsIlByb21pc2UiLCJyZWplY3QiLCJleHBvcnRzIiwiZ2V0UnVsZXNCeVJlcXVpcmVtZW50IiwicmVxdWlyZW1lbnQiLCJxdWVyeSIsImJvb2wiLCJmaWx0ZXIiLCJwdXNoIiwibWF0Y2hfcGhyYXNlIiwicmVkdWNlIiwiYWNjdW0iLCJidWNrZXQiLCJydWxlSUQiLCJydWxlRGVzY3JpcHRpb24iXSwic291cmNlcyI6WyJnZHByLXJlcXVlc3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFdhenVoIGFwcCAtIFNwZWNpZmljIG1ldGhvZHMgdG8gZmV0Y2ggV2F6dWggR0RQUiBkYXRhIGZyb20gRWxhc3RpY3NlYXJjaFxuICogQ29weXJpZ2h0IChDKSAyMDE1LTIwMjIgV2F6dWgsIEluYy5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTsgeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb247IGVpdGhlciB2ZXJzaW9uIDIgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEZpbmQgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCB0aGlzIG9uIHRoZSBMSUNFTlNFIGZpbGUuXG4gKi9cbmltcG9ydCB7IEJhc2UgfSBmcm9tICcuL2Jhc2UtcXVlcnknO1xuXG4vKipcbiAqIFJldHVybnMgdG9wIDUgR0RQUiByZXF1aXJlbWVudHNcbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBFbmRwb2ludCBjb250ZXh0XG4gKiBAcGFyYW0ge051bWJlcn0gZ3RlIFRpbWVzdGFtcCAobXMpIGZyb21cbiAqIEBwYXJhbSB7TnVtYmVyfSBsdGUgVGltZXN0YW1wIChtcykgdG9cbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWx0ZXJzIEUuZzogY2x1c3Rlci5uYW1lOiB3YXp1aCBBTkQgcnVsZS5ncm91cHM6IHZ1bG5lcmFiaWxpdHlcbiAqIEByZXR1cm5zIHtBcnJheTxTdHJpbmc+fVxuICovXG5leHBvcnQgY29uc3QgdG9wR0RQUlJlcXVpcmVtZW50cyA9IGFzeW5jIChcbiAgY29udGV4dCxcbiAgZ3RlLFxuICBsdGUsXG4gIGZpbHRlcnMsXG4gIGFsbG93ZWRBZ2VudHNGaWx0ZXIsXG4gIHBhdHRlcm4sXG4pID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBiYXNlID0ge307XG5cbiAgICBPYmplY3QuYXNzaWduKGJhc2UsIEJhc2UocGF0dGVybiwgZmlsdGVycywgZ3RlLCBsdGUsIGFsbG93ZWRBZ2VudHNGaWx0ZXIpKTtcblxuICAgIE9iamVjdC5hc3NpZ24oYmFzZS5hZ2dzLCB7XG4gICAgICAnMic6IHtcbiAgICAgICAgdGVybXM6IHtcbiAgICAgICAgICBmaWVsZDogJ3J1bGUuZ2RwcicsXG4gICAgICAgICAgc2l6ZTogNSxcbiAgICAgICAgICBvcmRlcjoge1xuICAgICAgICAgICAgX2NvdW50OiAnZGVzYycsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNvbnRleHQuY29yZS5vcGVuc2VhcmNoLmNsaWVudC5hc0N1cnJlbnRVc2VyLnNlYXJjaCh7XG4gICAgICBpbmRleDogcGF0dGVybixcbiAgICAgIGJvZHk6IGJhc2UsXG4gICAgfSk7XG4gICAgY29uc3QgeyBidWNrZXRzIH0gPSByZXNwb25zZS5ib2R5LmFnZ3JlZ2F0aW9uc1snMiddO1xuXG4gICAgcmV0dXJuIGJ1Y2tldHMubWFwKGl0ZW0gPT4gaXRlbS5rZXkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChlcnJvcik7XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyB0b3AgMyBydWxlcyBmb3Igc3BlY2lmaWMgR0RQUiByZXF1aXJlbWVudFxuICogQHBhcmFtIHsqfSBjb250ZXh0IEVuZHBvaW50IGNvbnRleHRcbiAqIEBwYXJhbSB7TnVtYmVyfSBndGUgVGltZXN0YW1wIChtcykgZnJvbVxuICogQHBhcmFtIHtOdW1iZXJ9IGx0ZSBUaW1lc3RhbXAgKG1zKSB0b1xuICogQHBhcmFtIHtTdHJpbmd9IHJlcXVpcmVtZW50IEdEUFIgcmVxdWlyZW1lbnQuIEUuZzogJ0lJXzUuMS5GJ1xuICogQHBhcmFtIHtTdHJpbmd9IGZpbHRlcnMgRS5nOiBjbHVzdGVyLm5hbWU6IHdhenVoIEFORCBydWxlLmdyb3VwczogdnVsbmVyYWJpbGl0eVxuICogQHJldHVybnMge0FycmF5PFN0cmluZz59XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRSdWxlc0J5UmVxdWlyZW1lbnQgPSBhc3luYyAoXG4gIGNvbnRleHQsXG4gIGd0ZSxcbiAgbHRlLFxuICBmaWx0ZXJzLFxuICBhbGxvd2VkQWdlbnRzRmlsdGVyLFxuICByZXF1aXJlbWVudCxcbiAgcGF0dGVybixcbikgPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGJhc2UgPSB7fTtcblxuICAgIE9iamVjdC5hc3NpZ24oYmFzZSwgQmFzZShwYXR0ZXJuLCBmaWx0ZXJzLCBndGUsIGx0ZSwgYWxsb3dlZEFnZW50c0ZpbHRlcikpO1xuXG4gICAgT2JqZWN0LmFzc2lnbihiYXNlLmFnZ3MsIHtcbiAgICAgICcyJzoge1xuICAgICAgICB0ZXJtczoge1xuICAgICAgICAgIGZpZWxkOiAncnVsZS5kZXNjcmlwdGlvbicsXG4gICAgICAgICAgc2l6ZTogMyxcbiAgICAgICAgICBvcmRlcjoge1xuICAgICAgICAgICAgX2NvdW50OiAnZGVzYycsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgYWdnczoge1xuICAgICAgICAgICczJzoge1xuICAgICAgICAgICAgdGVybXM6IHtcbiAgICAgICAgICAgICAgZmllbGQ6ICdydWxlLmlkJyxcbiAgICAgICAgICAgICAgc2l6ZTogMSxcbiAgICAgICAgICAgICAgb3JkZXI6IHtcbiAgICAgICAgICAgICAgICBfY291bnQ6ICdkZXNjJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBiYXNlLnF1ZXJ5LmJvb2wuZmlsdGVyLnB1c2goe1xuICAgICAgbWF0Y2hfcGhyYXNlOiB7XG4gICAgICAgICdydWxlLmdkcHInOiB7XG4gICAgICAgICAgcXVlcnk6IHJlcXVpcmVtZW50LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY29udGV4dC5jb3JlLm9wZW5zZWFyY2guY2xpZW50LmFzQ3VycmVudFVzZXIuc2VhcmNoKHtcbiAgICAgIGluZGV4OiBwYXR0ZXJuLFxuICAgICAgYm9keTogYmFzZSxcbiAgICB9KTtcbiAgICBjb25zdCB7IGJ1Y2tldHMgfSA9IHJlc3BvbnNlLmJvZHkuYWdncmVnYXRpb25zWycyJ107XG4gICAgcmV0dXJuIGJ1Y2tldHMucmVkdWNlKChhY2N1bSwgYnVja2V0KSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgICFidWNrZXQgfHxcbiAgICAgICAgIWJ1Y2tldFsnMyddIHx8XG4gICAgICAgICFidWNrZXRbJzMnXS5idWNrZXRzIHx8XG4gICAgICAgICFidWNrZXRbJzMnXS5idWNrZXRzWzBdIHx8XG4gICAgICAgICFidWNrZXRbJzMnXS5idWNrZXRzWzBdLmtleSB8fFxuICAgICAgICAhYnVja2V0LmtleVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBhY2N1bTtcbiAgICAgIH1cbiAgICAgIGFjY3VtLnB1c2goe1xuICAgICAgICBydWxlSUQ6IGJ1Y2tldFsnMyddLmJ1Y2tldHNbMF0ua2V5LFxuICAgICAgICBydWxlRGVzY3JpcHRpb246IGJ1Y2tldC5rZXksXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBhY2N1bTtcbiAgICB9LCBbXSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgfVxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBV0EsSUFBQUEsVUFBQSxHQUFBQyxPQUFBO0FBWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sTUFBTUMsbUJBQW1CLEdBQUcsTUFBQUEsQ0FDakNDLE9BQU8sRUFDUEMsR0FBRyxFQUNIQyxHQUFHLEVBQ0hDLE9BQU8sRUFDUEMsbUJBQW1CLEVBQ25CQyxPQUFPLEtBQ0o7RUFDSCxJQUFJO0lBQ0YsTUFBTUMsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUVmQyxNQUFNLENBQUNDLE1BQU0sQ0FBQ0YsSUFBSSxFQUFFLElBQUFHLGVBQUksRUFBQ0osT0FBTyxFQUFFRixPQUFPLEVBQUVGLEdBQUcsRUFBRUMsR0FBRyxFQUFFRSxtQkFBbUIsQ0FBQyxDQUFDO0lBRTFFRyxNQUFNLENBQUNDLE1BQU0sQ0FBQ0YsSUFBSSxDQUFDSSxJQUFJLEVBQUU7TUFDdkIsR0FBRyxFQUFFO1FBQ0hDLEtBQUssRUFBRTtVQUNMQyxLQUFLLEVBQUUs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