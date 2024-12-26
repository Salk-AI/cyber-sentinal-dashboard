"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.monitoringTemplate = void 0;
/*
 * Wazuh app - Module for monitoring template
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
const monitoringTemplate = exports.monitoringTemplate = {
  order: 0,
  settings: {
    'index.refresh_interval': '5s'
  },
  mappings: {
    properties: {
      timestamp: {
        type: 'date',
        format: 'dateOptionalTime'
      },
      status: {
        type: 'keyword'
      },
      ip: {
        type: 'keyword'
      },
      host: {
        type: 'keyword'
      },
      name: {
        type: 'keyword'
      },
      id: {
        type: 'keyword'
      },
      cluster: {
        properties: {
          name: {
            type: 'keyword'
          }
        }
      }
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtb25pdG9yaW5nVGVtcGxhdGUiLCJleHBvcnRzIiwib3JkZXIiLCJzZXR0aW5ncyIsIm1hcHBpbmdzIiwicHJvcGVydGllcyIsInRpbWVzdGFtcCIsInR5cGUiLCJmb3JtYXQiLCJzdGF0dXMiLCJpcCIsImhvc3QiLCJuYW1lIiwiaWQiLCJjbHVzdGVyIl0sInNvdXJjZXMiOlsibW9uaXRvcmluZy10ZW1wbGF0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogV2F6dWggYXBwIC0gTW9kdWxlIGZvciBtb25pdG9yaW5nIHRlbXBsYXRlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTUtMjAyMiBXYXp1aCwgSW5jLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOyB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbjsgZWl0aGVyIHZlcnNpb24gMiBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogRmluZCBtb3JlIGluZm9ybWF0aW9uIGFib3V0IHRoaXMgb24gdGhlIExJQ0VOU0UgZmlsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IG1vbml0b3JpbmdUZW1wbGF0ZSA9IHtcbiAgb3JkZXI6IDAsXG4gIHNldHRpbmdzOiB7XG4gICAgJ2luZGV4LnJlZnJlc2hfaW50ZXJ2YWwnOiAnNXMnXG4gIH0sXG4gIG1hcHBpbmdzOiB7XG4gICAgcHJvcGVydGllczoge1xuICAgICAgdGltZXN0YW1wOiB7XG4gICAgICAgIHR5cGU6ICdkYXRlJyxcbiAgICAgICAgZm9ybWF0OiAnZGF0ZU9wdGlvbmFsVGltZSdcbiAgICAgIH0sXG4gICAgICBzdGF0dXM6IHtcbiAgICAgICAgdHlwZTogJ2tleXdvcmQnXG4gICAgICB9LFxuICAgICAgaXA6IHtcbiAgICAgICAgdHlwZTogJ2tleXdvcmQnXG4gICAgICB9LFxuICAgICAgaG9zdDoge1xuICAgICAgICB0eXBlOiAna2V5d29yZCdcbiAgICAgIH0sXG4gICAgICBuYW1lOiB7XG4gICAgICAgIHR5cGU6ICdrZXl3b3JkJ1xuICAgICAgfSxcbiAgICAgIGlkOiB7XG4gICAgICAgIHR5cGU6ICdrZXl3b3JkJ1xuICAgICAgfSxcbiAgICAgIGNsdXN0ZXI6IHtcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgIHR5cGU6ICdrZXl3b3JkJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLE1BQU1BLGtCQUFrQixHQUFBQyxPQUFBLENBQUFELGtCQUFBLEdBQUc7RUFDaENFLEtBQUssRUFBRSxDQUFDO0VBQ1JDLFFBQVEsRUFBRTtJQUNSLHdCQUF3QixFQUFFO0VBQzVCLENBQUM7RUFDREMsUUFBUSxFQUFFO0lBQ1JDLFVBQVUsRUFBRTtNQUNWQyxTQUFTLEVBQUU7UUFDVEMsSUFBSSxFQUFFLE1BQU07UUFDWkMsTUFBTSxFQUFFO01BQ1YsQ0FBQztNQUNEQyxNQUFNLEVBQUU7UUFDTkYsSUFBSSxFQUFFO01BQ1IsQ0FBQztNQUNERyxFQUFFLEVBQUU7UUFDRkgsSUFBSSxFQUFFO01BQ1IsQ0FBQztNQUNESSxJQUFJLEVBQUU7UUFDSkosSUFBSSxFQUFFO01BQ1IsQ0FBQztNQUNESyxJQUFJLEVBQUU7UUFDSkwsSUFBSSxFQUFFO01BQ1IsQ0FBQztNQUNETSxFQUFFLEVBQUU7UUFDRk4sSUFBSSxFQUFFO01BQ1IsQ0FBQztNQUNETyxPQUFPLEVBQUU7UUFDUFQsVUFBVSxFQUFFO1VBQ1ZPLElBQUksRUFBRTtZQUNKTCxJQUFJLEVBQUU7VUFDUjtRQUNGO01BQ0Y7SUFDRjtFQUNGO0FBQ0YsQ0FBQyJ9