"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapSavedObjectsType = void 0;
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

const mapSavedObjectsType = exports.mapSavedObjectsType = {
  name: 'map',
  hidden: false,
  namespaceType: 'agnostic',
  management: {
    defaultSearchField: 'title',
    importableAndExportable: true,
    getTitle(obj) {
      return obj.attributes.title;
    },
    getInAppUrl(obj) {
      return {
        path: `/app/maps-dashboards#/${encodeURIComponent(obj.id)}`,
        uiCapabilitiesPath: 'map.show'
      };
    },
    getEditUrl(obj) {
      return `/management/opensearch-dashboards/objects/map/${encodeURIComponent(obj.id)}`;
    }
  },
  mappings: {
    properties: {
      title: {
        type: 'text'
      },
      description: {
        type: 'text'
      },
      layerList: {
        type: 'text',
        index: false
      },
      uiState: {
        type: 'text',
        index: false
      },
      mapState: {
        type: 'text',
        index: false
      },
      version: {
        type: 'integer'
      },
      // Need to add a kibanaSavedObjectMeta attribute here to follow the current saved object flow
      // When we save a saved object, the saved object plugin will extract the search source into two parts
      // Some information will be put into kibanaSavedObjectMeta while others will be created as a reference object and pushed to the reference array
      kibanaSavedObjectMeta: {
        properties: {
          searchSourceJSON: {
            type: 'text',
            index: false
          }
        }
      }
    }
  },
  migrations: {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJtYXBTYXZlZE9iamVjdHNUeXBlIiwiZXhwb3J0cyIsIm5hbWUiLCJoaWRkZW4iLCJuYW1lc3BhY2VUeXBlIiwibWFuYWdlbWVudCIsImRlZmF1bHRTZWFyY2hGaWVsZCIsImltcG9ydGFibGVBbmRFeHBvcnRhYmxlIiwiZ2V0VGl0bGUiLCJvYmoiLCJhdHRyaWJ1dGVzIiwidGl0bGUiLCJnZXRJbkFwcFVybCIsInBhdGgiLCJlbmNvZGVVUklDb21wb25lbnQiLCJpZCIsInVpQ2FwYWJpbGl0aWVzUGF0aCIsImdldEVkaXRVcmwiLCJtYXBwaW5ncyIsInByb3BlcnRpZXMiLCJ0eXBlIiwiZGVzY3JpcHRpb24iLCJsYXllckxpc3QiLCJpbmRleCIsInVpU3RhdGUiLCJtYXBTdGF0ZSIsInZlcnNpb24iLCJraWJhbmFTYXZlZE9iamVjdE1ldGEiLCJzZWFyY2hTb3VyY2VKU09OIiwibWlncmF0aW9ucyJdLCJzb3VyY2VzIjpbIm1hcF9zYXZlZF9vYmplY3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBTYXZlZE9iamVjdHNUeXBlIH0gZnJvbSAnb3BlbnNlYXJjaC1kYXNoYm9hcmRzL3NlcnZlcic7XG5cbmV4cG9ydCBjb25zdCBtYXBTYXZlZE9iamVjdHNUeXBlOiBTYXZlZE9iamVjdHNUeXBlID0ge1xuICBuYW1lOiAnbWFwJyxcbiAgaGlkZGVuOiBmYWxzZSxcbiAgbmFtZXNwYWNlVHlwZTogJ2Fnbm9zdGljJyxcbiAgbWFuYWdlbWVudDoge1xuICAgIGRlZmF1bHRTZWFyY2hGaWVsZDogJ3RpdGxlJyxcbiAgICBpbXBvcnRhYmxlQW5kRXhwb3J0YWJsZTogdHJ1ZSxcbiAgICBnZXRUaXRsZShvYmopIHtcbiAgICAgIHJldHVybiBvYmouYXR0cmlidXRlcy50aXRsZTtcbiAgICB9LFxuICAgIGdldEluQXBwVXJsKG9iaikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0aDogYC9hcHAvbWFwcy1kYXNoYm9hcmRzIy8ke2VuY29kZVVSSUNvbXBvbmVudChvYmouaWQpfWAsXG4gICAgICAgIHVpQ2FwYWJpbGl0aWVzUGF0aDogJ21hcC5zaG93JyxcbiAgICAgIH07XG4gICAgfSxcbiAgICBnZXRFZGl0VXJsKG9iaikge1xuICAgICAgcmV0dXJuIGAvbWFuYWdlbWVudC9vcGVuc2VhcmNoLWRhc2hib2FyZHMvb2JqZWN0cy9tYXAvJHtlbmNvZGVVUklDb21wb25lbnQob2JqLmlkKX1gO1xuICAgIH0sXG4gIH0sXG4gIG1hcHBpbmdzOiB7XG4gICAgcHJvcGVydGllczoge1xuICAgICAgdGl0bGU6IHsgdHlwZTogJ3RleHQnIH0sXG4gICAgICBkZXNjcmlwdGlvbjogeyB0eXBlOiAndGV4dCcgfSxcbiAgICAgIGxheWVyTGlzdDogeyB0eXBlOiAndGV4dCcsIGluZGV4OiBmYWxzZSB9LFxuICAgICAgdWlTdGF0ZTogeyB0eXBlOiAndGV4dCcsIGluZGV4OiBmYWxzZSB9LFxuICAgICAgbWFwU3RhdGU6IHsgdHlwZTogJ3RleHQnLCBpbmRleDogZmFsc2UgfSxcbiAgICAgIHZlcnNpb246IHsgdHlwZTogJ2ludGVnZXInIH0sXG4gICAgICAvLyBOZWVkIHRvIGFkZCBhIGtpYmFuYVNhdmVkT2JqZWN0TWV0YSBhdHRyaWJ1dGUgaGVyZSB0byBmb2xsb3cgdGhlIGN1cnJlbnQgc2F2ZWQgb2JqZWN0IGZsb3dcbiAgICAgIC8vIFdoZW4gd2Ugc2F2ZSBhIHNhdmVkIG9iamVjdCwgdGhlIHNhdmVkIG9iamVjdCBwbHVnaW4gd2lsbCBleHRyYWN0IHRoZSBzZWFyY2ggc291cmNlIGludG8gdHdvIHBhcnRzXG4gICAgICAvLyBTb21lIGluZm9ybWF0aW9uIHdpbGwgYmUgcHV0IGludG8ga2liYW5hU2F2ZWRPYmplY3RNZXRhIHdoaWxlIG90aGVycyB3aWxsIGJlIGNyZWF0ZWQgYXMgYSByZWZlcmVuY2Ugb2JqZWN0IGFuZCBwdXNoZWQgdG8gdGhlIHJlZmVyZW5jZSBhcnJheVxuICAgICAga2liYW5hU2F2ZWRPYmplY3RNZXRhOiB7XG4gICAgICAgIHByb3BlcnRpZXM6IHsgc2VhcmNoU291cmNlSlNPTjogeyB0eXBlOiAndGV4dCcsIGluZGV4OiBmYWxzZSB9IH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIG1pZ3JhdGlvbnM6IHt9LFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBSU8sTUFBTUEsbUJBQXFDLEdBQUFDLE9BQUEsQ0FBQUQsbUJBQUEsR0FBRztFQUNuREUsSUFBSSxFQUFFLEtBQUs7RUFDWEMsTUFBTSxFQUFFLEtBQUs7RUFDYkMsYUFBYSxFQUFFLFVBQVU7RUFDekJDLFVBQVUsRUFBRTtJQUNWQyxrQkFBa0IsRUFBRSxPQUFPO0lBQzNCQyx1QkFBdUIsRUFBRSxJQUFJO0lBQzdCQyxRQUFRQSxDQUFDQyxHQUFHLEVBQUU7TUFDWixPQUFPQSxHQUFHLENBQUNDLFVBQVUsQ0FBQ0MsS0FBSztJQUM3QixDQUFDO0lBQ0RDLFdBQVdBLENBQUNILEdBQUcsRUFBRTtNQUNmLE9BQU87UUFDTEksSUFBSSxFQUFHLHlCQUF3QkMsa0JBQWtCLENBQUNMLEdBQUcsQ0FBQ00sRUFBRSxDQUFFLEVBQUM7UUFDM0RDLGtCQUFrQixFQUFFO01BQ3RCLENBQUM7SUFDSCxDQUFDO0lBQ0RDLFVBQVVBLENBQUNSLEdBQUcsRUFBRTtNQUNkLE9BQVEsaURBQWdESyxrQkFBa0IsQ0FBQ0wsR0FBRyxDQUFDTSxFQUFFLENBQUUsRUFBQztJQUN0RjtFQUNGLENBQUM7RUFDREcsUUFBUSxFQUFFO0lBQ1JDLFVBQVUsRUFBRTtNQUNWUixLQUFLLEVBQUU7UUFBRVMsSUFBSSxFQUFFO01BQU8sQ0FBQztNQUN2QkMsV0FBVyxFQUFFO1FBQUVELElBQUksRUFBRTtNQUFPLENBQUM7TUFDN0JFLFNBQVMsRUFBRTtRQUFFRixJQUFJLEVBQUUsTUFBTTtRQUFFRyxLQUFLLEVBQUU7TUFBTSxDQUFDO01BQ3pDQyxPQUFPLEVBQUU7UUFBRUosSUFBSSxFQUFFLE1BQU07UUFBRUcsS0FBSyxFQUFFO01BQU0sQ0FBQztNQUN2Q0UsUUFBUSxFQUFFO1FBQUVMLElBQUksRUFBRSxNQUFNO1FBQUVHLEtBQUssRUFBRTtNQUFNLENBQUM7TUFDeENHLE9BQU8sRUFBRTtRQUFFTixJQUFJLEVBQUU7TUFBVSxDQUFDO01BQzVCO01BQ0E7TUFDQTtNQUNBTyxxQkFBcUIsRUFBRTtRQUNyQlIsVUFBVSxFQUFFO1VBQUVTLGdCQUFnQixFQUFFO1lBQUVSLElBQUksRUFBRSxNQUFNO1lBQUVHLEtBQUssRUFBRTtVQUFNO1FBQUU7TUFDakU7SUFDRjtFQUNGLENBQUM7RUFDRE0sVUFBVSxFQUFFLENBQUM7QUFDZixDQUFDIn0=