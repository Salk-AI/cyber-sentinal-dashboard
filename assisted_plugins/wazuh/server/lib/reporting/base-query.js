"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Base = Base;
var _lodash = require("lodash");
/*
 * Wazuh app - Base query for reporting queries
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

function Base(pattern, filters, gte, lte, allowedAgentsFilter = null) {
  var _clonedFilter$bool, _clonedFilter$bool$pu;
  const clonedFilter = (0, _lodash.cloneDeep)(filters);
  clonedFilter === null || clonedFilter === void 0 || (_clonedFilter$bool = clonedFilter.bool) === null || _clonedFilter$bool === void 0 || (_clonedFilter$bool = _clonedFilter$bool.must) === null || _clonedFilter$bool === void 0 || (_clonedFilter$bool$pu = _clonedFilter$bool.push) === null || _clonedFilter$bool$pu === void 0 || _clonedFilter$bool$pu.call(_clonedFilter$bool, {
    range: {
      timestamp: {
        gte: gte,
        lte: lte,
        format: 'epoch_millis'
      }
    }
  });
  const base = {
    from: 0,
    size: 500,
    aggs: {},
    sort: [],
    script_fields: {},
    query: clonedFilter
  };
  return base;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfbG9kYXNoIiwicmVxdWlyZSIsIkJhc2UiLCJwYXR0ZXJuIiwiZmlsdGVycyIsImd0ZSIsImx0ZSIsImFsbG93ZWRBZ2VudHNGaWx0ZXIiLCJfY2xvbmVkRmlsdGVyJGJvb2wiLCJfY2xvbmVkRmlsdGVyJGJvb2wkcHUiLCJjbG9uZWRGaWx0ZXIiLCJjbG9uZURlZXAiLCJib29sIiwibXVzdCIsInB1c2giLCJjYWxsIiwicmFuZ2UiLCJ0aW1lc3RhbXAiLCJmb3JtYXQiLCJiYXNlIiwiZnJvbSIsInNpemUiLCJhZ2dzIiwic29ydCIsInNjcmlwdF9maWVsZHMiLCJxdWVyeSJdLCJzb3VyY2VzIjpbImJhc2UtcXVlcnkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFdhenVoIGFwcCAtIEJhc2UgcXVlcnkgZm9yIHJlcG9ydGluZyBxdWVyaWVzXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTUtMjAyMiBXYXp1aCwgSW5jLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOyB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbjsgZWl0aGVyIHZlcnNpb24gMiBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogRmluZCBtb3JlIGluZm9ybWF0aW9uIGFib3V0IHRoaXMgb24gdGhlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG5pbXBvcnQgeyBjbG9uZURlZXAgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgZnVuY3Rpb24gQmFzZShwYXR0ZXJuOiBzdHJpbmcsIGZpbHRlcnM6IGFueSwgZ3RlOiBudW1iZXIsIGx0ZTogbnVtYmVyLCBhbGxvd2VkQWdlbnRzRmlsdGVyOiBhbnkgPSBudWxsKSB7XG4gIGNvbnN0IGNsb25lZEZpbHRlciA9IGNsb25lRGVlcChmaWx0ZXJzKTtcbiAgY2xvbmVkRmlsdGVyPy5ib29sPy5tdXN0Py5wdXNoPy4oe1xuICAgIHJhbmdlOiB7XG4gICAgICB0aW1lc3RhbXA6IHtcbiAgICAgICAgZ3RlOiBndGUsXG4gICAgICAgIGx0ZTogbHRlLFxuICAgICAgICBmb3JtYXQ6ICdlcG9jaF9taWxsaXMnXG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgY29uc3QgYmFzZSA9IHtcbiAgICBmcm9tOiAwLFxuICAgIHNpemU6IDUwMCxcbiAgICBhZ2dzOiB7fSxcbiAgICBzb3J0OiBbXSxcbiAgICBzY3JpcHRfZmllbGRzOiB7fSxcbiAgICBxdWVyeTogY2xvbmVkRmlsdGVyXG4gIH07XG5cbiAgcmV0dXJuIGJhc2U7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQVlBLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQVpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSU8sU0FBU0MsSUFBSUEsQ0FBQ0MsT0FBZSxFQUFFQyxPQUFZLEVBQUVDLEdBQVcsRUFBRUMsR0FBVyxFQUFFQyxtQkFBd0IsR0FBRyxJQUFJLEVBQUU7RUFBQSxJQUFBQyxrQkFBQSxFQUFBQyxxQkFBQTtFQUM3RyxNQUFNQyxZQUFZLEdBQUcsSUFBQUMsaUJBQVMsRUFBQ1AsT0FBTyxDQUFDO0VBQ3ZDTSxZQUFZLGFBQVpBLFlBQVksZ0JBQUFGLGtCQUFBLEdBQVpFLFlBQVksQ0FBRUUsSUFBSSxjQUFBSixrQkFBQSxnQkFBQUEsa0JBQUEsR0FBbEJBLGtCQUFBLENBQW9CSyxJQUFJLGNBQUFMLGtCQUFBLGdCQUFBQyxxQkFBQSxHQUF4QkQsa0JBQUEsQ0FBMEJNLElBQUksY0FBQUwscUJBQUEsZUFBOUJBLHFCQUFBLENBQUFNLElBQUEsQ0FBQVAsa0JBQUEsRUFBaUM7SUFDL0JRLEtBQUssRUFBRTtNQUNMQyxTQUFTLEVBQUU7UUFDVFosR0FBRyxFQUFFQSxHQUFHO1FBQ1JDLEdBQUcsRUFBRUEsR0FBRztRQUNSWSxNQUFNLEVBQUU7TUFDVjtJQUNGO0VBQ0YsQ0FBQyxDQUFDO0VBQ0YsTUFBTUMsSUFBSSxHQUFHO0lBQ1hDLElBQUksRUFBRSxDQUFDO0lBQ1BDLElBQUksRUFBRSxHQUFHO0lBQ1RDLElBQUksRUFBRSxDQUFDLENBQUM7SUFDUkMsSUFBSSxFQUFFLEVBQUU7SUFDUkMsYUFBYSxFQUFFLENBQUMsQ0FBQztJQUNqQkMsS0FBSyxFQUFFZjtFQUNULENBQUM7RUFFRCxPQUFPUyxJQUFJO0FBQ2IifQ==