"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

const coreServicesMock = {
  uiSettings: {
    get: jest.fn()
  },
  chrome: {
    setBreadcrumbs: jest.fn()
  },
  notifications: {
    toasts: {
      addDanger: jest.fn(() => ({})).mockName("addDanger"),
      addSuccess: jest.fn(() => ({})).mockName("addSuccess"),
      addWarning: jest.fn(() => ({})).mockName("addWarning"),
      remove: jest.fn(() => ({})).mockName("remove")
    }
  },
  docLinks: {
    links: {
      opensearch: {
        reindexData: {
          base: "https://opensearch.org/docs/latest/opensearch/reindex-data/",
          transform: "https://opensearch.org/docs/latest/opensearch/reindex-data/#transform-documents-during-reindexing"
        },
        queryDSL: {
          base: "https://opensearch.org/docs/opensearch/query-dsl/index/"
        },
        indexTemplates: {
          base: "https://opensearch.org/docs/latest/opensearch/index-templates"
        },
        indexAlias: {
          base: "https://opensearch.org/docs/latest/opensearch/index-alias/"
        }
      }
    }
  }
};
var _default = exports.default = coreServicesMock;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJjb3JlU2VydmljZXNNb2NrIiwidWlTZXR0aW5ncyIsImdldCIsImplc3QiLCJmbiIsImNocm9tZSIsInNldEJyZWFkY3J1bWJzIiwibm90aWZpY2F0aW9ucyIsInRvYXN0cyIsImFkZERhbmdlciIsIm1vY2tOYW1lIiwiYWRkU3VjY2VzcyIsImFkZFdhcm5pbmciLCJyZW1vdmUiLCJkb2NMaW5rcyIsImxpbmtzIiwib3BlbnNlYXJjaCIsInJlaW5kZXhEYXRhIiwiYmFzZSIsInRyYW5zZm9ybSIsInF1ZXJ5RFNMIiwiaW5kZXhUZW1wbGF0ZXMiLCJpbmRleEFsaWFzIiwiX2RlZmF1bHQiLCJleHBvcnRzIiwiZGVmYXVsdCIsIm1vZHVsZSJdLCJzb3VyY2VzIjpbImNvcmVTZXJ2aWNlc01vY2sudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBDb3JlU3RhcnQgfSBmcm9tIFwib3BlbnNlYXJjaC1kYXNoYm9hcmRzL3B1YmxpY1wiO1xuXG5jb25zdCBjb3JlU2VydmljZXNNb2NrID0ge1xuICB1aVNldHRpbmdzOiB7XG4gICAgZ2V0OiBqZXN0LmZuKCksXG4gIH0sXG4gIGNocm9tZToge1xuICAgIHNldEJyZWFkY3J1bWJzOiBqZXN0LmZuKCksXG4gIH0sXG4gIG5vdGlmaWNhdGlvbnM6IHtcbiAgICB0b2FzdHM6IHtcbiAgICAgIGFkZERhbmdlcjogamVzdC5mbigoKSA9PiAoe30pKS5tb2NrTmFtZShcImFkZERhbmdlclwiKSxcbiAgICAgIGFkZFN1Y2Nlc3M6IGplc3QuZm4oKCkgPT4gKHt9KSkubW9ja05hbWUoXCJhZGRTdWNjZXNzXCIpLFxuICAgICAgYWRkV2FybmluZzogamVzdC5mbigoKSA9PiAoe30pKS5tb2NrTmFtZShcImFkZFdhcm5pbmdcIiksXG4gICAgICByZW1vdmU6IGplc3QuZm4oKCkgPT4gKHt9KSkubW9ja05hbWUoXCJyZW1vdmVcIiksXG4gICAgfSxcbiAgfSxcbiAgZG9jTGlua3M6IHtcbiAgICBsaW5rczoge1xuICAgICAgb3BlbnNlYXJjaDoge1xuICAgICAgICByZWluZGV4RGF0YToge1xuICAgICAgICAgIGJhc2U6IFwiaHR0cHM6Ly9vcGVuc2VhcmNoLm9yZy9kb2NzL2xhdGVzdC9vcGVuc2VhcmNoL3JlaW5kZXgtZGF0YS9cIixcbiAgICAgICAgICB0cmFuc2Zvcm06IFwiaHR0cHM6Ly9vcGVuc2VhcmNoLm9yZy9kb2NzL2xhdGVzdC9vcGVuc2VhcmNoL3JlaW5kZXgtZGF0YS8jdHJhbnNmb3JtLWRvY3VtZW50cy1kdXJpbmctcmVpbmRleGluZ1wiLFxuICAgICAgICB9LFxuICAgICAgICBxdWVyeURTTDoge1xuICAgICAgICAgIGJhc2U6IFwiaHR0cHM6Ly9vcGVuc2VhcmNoLm9yZy9kb2NzL29wZW5zZWFyY2gvcXVlcnktZHNsL2luZGV4L1wiLFxuICAgICAgICB9LFxuICAgICAgICBpbmRleFRlbXBsYXRlczoge1xuICAgICAgICAgIGJhc2U6IFwiaHR0cHM6Ly9vcGVuc2VhcmNoLm9yZy9kb2NzL2xhdGVzdC9vcGVuc2VhcmNoL2luZGV4LXRlbXBsYXRlc1wiLFxuICAgICAgICB9LFxuICAgICAgICBpbmRleEFsaWFzOiB7XG4gICAgICAgICAgYmFzZTogXCJodHRwczovL29wZW5zZWFyY2gub3JnL2RvY3MvbGF0ZXN0L29wZW5zZWFyY2gvaW5kZXgtYWxpYXMvXCIsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59O1xuXG5leHBvcnQgZGVmYXVsdCAoY29yZVNlcnZpY2VzTW9jayBhcyB1bmtub3duKSBhcyBDb3JlU3RhcnQ7XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUlBLE1BQU1BLGdCQUFnQixHQUFHO0VBQ3ZCQyxVQUFVLEVBQUU7SUFDVkMsR0FBRyxFQUFFQyxJQUFJLENBQUNDLEVBQUUsQ0FBQztFQUNmLENBQUM7RUFDREMsTUFBTSxFQUFFO0lBQ05DLGNBQWMsRUFBRUgsSUFBSSxDQUFDQyxFQUFFLENBQUM7RUFDMUIsQ0FBQztFQUNERyxhQUFhLEVBQUU7SUFDYkMsTUFBTSxFQUFFO01BQ05DLFNBQVMsRUFBRU4sSUFBSSxDQUFDQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNNLFFBQVEsQ0FBQyxXQUFXLENBQUM7TUFDcERDLFVBQVUsRUFBRVIsSUFBSSxDQUFDQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNNLFFBQVEsQ0FBQyxZQUFZLENBQUM7TUFDdERFLFVBQVUsRUFBRVQsSUFBSSxDQUFDQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNNLFFBQVEsQ0FBQyxZQUFZLENBQUM7TUFDdERHLE1BQU0sRUFBRVYsSUFBSSxDQUFDQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNNLFFBQVEsQ0FBQyxRQUFRO0lBQy9DO0VBQ0YsQ0FBQztFQUNESSxRQUFRLEVBQUU7SUFDUkMsS0FBSyxFQUFFO01BQ0xDLFVBQVUsRUFBRTtRQUNWQyxXQUFXLEVBQUU7VUFDWEMsSUFBSSxFQUFFLDZEQUE2RDtVQUNuRUMsU0FBUyxFQUFFO1FBQ2IsQ0FBQztRQUNEQyxRQUFRLEVBQUU7VUFDUkYsSUFBSSxFQUFFO1FBQ1IsQ0FBQztRQUNERyxjQUFjLEVBQUU7VUFDZEgsSUFBSSxFQUFFO1FBQ1IsQ0FBQztRQUNESSxVQUFVLEVBQUU7VUFDVkosSUFBSSxFQUFFO1FBQ1I7TUFDRjtJQUNGO0VBQ0Y7QUFDRixDQUFDO0FBQUMsSUFBQUssUUFBQSxHQUFBQyxPQUFBLENBQUFDLE9BQUEsR0FFY3pCLGdCQUFnQjtBQUFBMEIsTUFBQSxDQUFBRixPQUFBLEdBQUFBLE9BQUEsQ0FBQUMsT0FBQSJ9