"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apiCallerMock = void 0;
Object.defineProperty(exports, "browserServicesMock", {
  enumerable: true,
  get: function () {
    return _browserServicesMock.default;
  }
});
Object.defineProperty(exports, "coreServicesMock", {
  enumerable: true,
  get: function () {
    return _coreServicesMock.default;
  }
});
Object.defineProperty(exports, "historyMock", {
  enumerable: true,
  get: function () {
    return _historyMock.default;
  }
});
Object.defineProperty(exports, "httpClientMock", {
  enumerable: true,
  get: function () {
    return _httpClientMock.default;
  }
});
Object.defineProperty(exports, "styleMock", {
  enumerable: true,
  get: function () {
    return _styleMock.default;
  }
});
var _browserServicesMock = _interopRequireDefault(require("./browserServicesMock"));
var _historyMock = _interopRequireDefault(require("./historyMock"));
var _httpClientMock = _interopRequireDefault(require("./httpClientMock"));
var _styleMock = _interopRequireDefault(require("./styleMock"));
var _coreServicesMock = _interopRequireDefault(require("./coreServicesMock"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

const apiCallerMock = browserServicesMockObject => {
  browserServicesMockObject.commonService.apiCaller = jest.fn(async payload => {
    var _payload$data5, _payload$data6, _payload$data7;
    switch (payload.endpoint) {
      case "transport.request":
        {
          var _payload$data, _payload$data2, _payload$data3, _payload$data4;
          if ((_payload$data = payload.data) !== null && _payload$data !== void 0 && (_payload$data = _payload$data.path) !== null && _payload$data !== void 0 && _payload$data.startsWith("/_index_template/_simulate_index/bad_index")) {
            return {
              ok: true,
              response: {}
            };
          } else if ((_payload$data2 = payload.data) !== null && _payload$data2 !== void 0 && (_payload$data2 = _payload$data2.path) !== null && _payload$data2 !== void 0 && _payload$data2.startsWith("/_index_template/bad_template")) {
            return {
              ok: false,
              error: "bad template"
            };
          } else if ((_payload$data3 = payload.data) !== null && _payload$data3 !== void 0 && (_payload$data3 = _payload$data3.path) !== null && _payload$data3 !== void 0 && _payload$data3.startsWith("/_index_template/good_template")) {
            return {
              ok: true,
              response: {
                index_templates: [{
                  name: "good_template",
                  index_template: {}
                }]
              }
            };
          } else if ((_payload$data4 = payload.data) !== null && _payload$data4 !== void 0 && (_payload$data4 = _payload$data4.path) !== null && _payload$data4 !== void 0 && _payload$data4.startsWith("/_component_template/good_template")) {
            return {
              ok: true,
              response: {
                component_templates: [{
                  name: "good_template",
                  component_template: {
                    template: {}
                  }
                }]
              }
            };
          } else {
            return {
              ok: true,
              response: {
                template: {
                  settings: {
                    index: {
                      number_of_replicas: "10",
                      number_of_shards: "1"
                    }
                  }
                }
              }
            };
          }
        }
      case "indices.create":
        if (((_payload$data5 = payload.data) === null || _payload$data5 === void 0 ? void 0 : _payload$data5.index) === "bad_index") {
          return {
            ok: false,
            error: "bad_index"
          };
        }
        return {
          ok: true,
          response: {}
        };
        break;
      case "cat.aliases":
        return {
          ok: true,
          response: [{
            alias: ".kibana",
            index: ".kibana_1",
            filter: "-",
            is_write_index: "-"
          }, {
            alias: "2",
            index: "1234",
            filter: "-",
            is_write_index: "-"
          }]
        };
      case "indices.get":
        const payloadIndex = (_payload$data6 = payload.data) === null || _payload$data6 === void 0 ? void 0 : _payload$data6.index;
        if (payloadIndex === "bad_index") {
          return {
            ok: false,
            error: "bad_error",
            response: {}
          };
        }
        return {
          ok: true,
          response: {
            [(_payload$data7 = payload.data) === null || _payload$data7 === void 0 ? void 0 : _payload$data7.index]: {
              aliases: {
                update_test_1: {}
              },
              mappings: {
                properties: {
                  test_mapping_1: {
                    type: "text"
                  }
                }
              },
              settings: {
                "index.number_of_shards": "1",
                "index.number_of_replicas": "1"
              }
            }
          }
        };
    }
    return {
      ok: true,
      response: {}
    };
  });
};
exports.apiCallerMock = apiCallerMock;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfYnJvd3NlclNlcnZpY2VzTW9jayIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX2hpc3RvcnlNb2NrIiwiX2h0dHBDbGllbnRNb2NrIiwiX3N0eWxlTW9jayIsIl9jb3JlU2VydmljZXNNb2NrIiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJhcGlDYWxsZXJNb2NrIiwiYnJvd3NlclNlcnZpY2VzTW9ja09iamVjdCIsImNvbW1vblNlcnZpY2UiLCJhcGlDYWxsZXIiLCJqZXN0IiwiZm4iLCJwYXlsb2FkIiwiX3BheWxvYWQkZGF0YTUiLCJfcGF5bG9hZCRkYXRhNiIsIl9wYXlsb2FkJGRhdGE3IiwiZW5kcG9pbnQiLCJfcGF5bG9hZCRkYXRhIiwiX3BheWxvYWQkZGF0YTIiLCJfcGF5bG9hZCRkYXRhMyIsIl9wYXlsb2FkJGRhdGE0IiwiZGF0YSIsInBhdGgiLCJzdGFydHNXaXRoIiwib2siLCJyZXNwb25zZSIsImVycm9yIiwiaW5kZXhfdGVtcGxhdGVzIiwibmFtZSIsImluZGV4X3RlbXBsYXRlIiwiY29tcG9uZW50X3RlbXBsYXRlcyIsImNvbXBvbmVudF90ZW1wbGF0ZSIsInRlbXBsYXRlIiwic2V0dGluZ3MiLCJpbmRleCIsIm51bWJlcl9vZl9yZXBsaWNhcyIsIm51bWJlcl9vZl9zaGFyZHMiLCJhbGlhcyIsImZpbHRlciIsImlzX3dyaXRlX2luZGV4IiwicGF5bG9hZEluZGV4IiwiYWxpYXNlcyIsInVwZGF0ZV90ZXN0XzEiLCJtYXBwaW5ncyIsInByb3BlcnRpZXMiLCJ0ZXN0X21hcHBpbmdfMSIsInR5cGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgYnJvd3NlclNlcnZpY2VzTW9jayBmcm9tIFwiLi9icm93c2VyU2VydmljZXNNb2NrXCI7XG5pbXBvcnQgaGlzdG9yeU1vY2sgZnJvbSBcIi4vaGlzdG9yeU1vY2tcIjtcbmltcG9ydCBodHRwQ2xpZW50TW9jayBmcm9tIFwiLi9odHRwQ2xpZW50TW9ja1wiO1xuaW1wb3J0IHN0eWxlTW9jayBmcm9tIFwiLi9zdHlsZU1vY2tcIjtcbmltcG9ydCBjb3JlU2VydmljZXNNb2NrIGZyb20gXCIuL2NvcmVTZXJ2aWNlc01vY2tcIjtcblxuY29uc3QgYXBpQ2FsbGVyTW9jayA9IChicm93c2VyU2VydmljZXNNb2NrT2JqZWN0OiB0eXBlb2YgYnJvd3NlclNlcnZpY2VzTW9jaykgPT4ge1xuICBicm93c2VyU2VydmljZXNNb2NrT2JqZWN0LmNvbW1vblNlcnZpY2UuYXBpQ2FsbGVyID0gamVzdC5mbihcbiAgICBhc3luYyAocGF5bG9hZCk6IFByb21pc2U8YW55PiA9PiB7XG4gICAgICBzd2l0Y2ggKHBheWxvYWQuZW5kcG9pbnQpIHtcbiAgICAgICAgY2FzZSBcInRyYW5zcG9ydC5yZXF1ZXN0XCI6IHtcbiAgICAgICAgICBpZiAocGF5bG9hZC5kYXRhPy5wYXRoPy5zdGFydHNXaXRoKFwiL19pbmRleF90ZW1wbGF0ZS9fc2ltdWxhdGVfaW5kZXgvYmFkX2luZGV4XCIpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICAgICAgcmVzcG9uc2U6IHt9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHBheWxvYWQuZGF0YT8ucGF0aD8uc3RhcnRzV2l0aChcIi9faW5kZXhfdGVtcGxhdGUvYmFkX3RlbXBsYXRlXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgICAgIGVycm9yOiBcImJhZCB0ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHBheWxvYWQuZGF0YT8ucGF0aD8uc3RhcnRzV2l0aChcIi9faW5kZXhfdGVtcGxhdGUvZ29vZF90ZW1wbGF0ZVwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgICAgIHJlc3BvbnNlOiB7XG4gICAgICAgICAgICAgICAgaW5kZXhfdGVtcGxhdGVzOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiZ29vZF90ZW1wbGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBpbmRleF90ZW1wbGF0ZToge30sXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSBpZiAocGF5bG9hZC5kYXRhPy5wYXRoPy5zdGFydHNXaXRoKFwiL19jb21wb25lbnRfdGVtcGxhdGUvZ29vZF90ZW1wbGF0ZVwiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgICAgIHJlc3BvbnNlOiB7XG4gICAgICAgICAgICAgICAgY29tcG9uZW50X3RlbXBsYXRlczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImdvb2RfdGVtcGxhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgY29tcG9uZW50X3RlbXBsYXRlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGU6IHt9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgICAgIHJlc3BvbnNlOiB7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IHtcbiAgICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiB7XG4gICAgICAgICAgICAgICAgICAgICAgbnVtYmVyX29mX3JlcGxpY2FzOiBcIjEwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgbnVtYmVyX29mX3NoYXJkczogXCIxXCIsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXNlIFwiaW5kaWNlcy5jcmVhdGVcIjpcbiAgICAgICAgICBpZiAocGF5bG9hZC5kYXRhPy5pbmRleCA9PT0gXCJiYWRfaW5kZXhcIikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgICAgICBlcnJvcjogXCJiYWRfaW5kZXhcIixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgICAgcmVzcG9uc2U6IHt9LFxuICAgICAgICAgIH07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJjYXQuYWxpYXNlc1wiOlxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICAgIHJlc3BvbnNlOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhbGlhczogXCIua2liYW5hXCIsXG4gICAgICAgICAgICAgICAgaW5kZXg6IFwiLmtpYmFuYV8xXCIsXG4gICAgICAgICAgICAgICAgZmlsdGVyOiBcIi1cIixcbiAgICAgICAgICAgICAgICBpc193cml0ZV9pbmRleDogXCItXCIsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhbGlhczogXCIyXCIsXG4gICAgICAgICAgICAgICAgaW5kZXg6IFwiMTIzNFwiLFxuICAgICAgICAgICAgICAgIGZpbHRlcjogXCItXCIsXG4gICAgICAgICAgICAgICAgaXNfd3JpdGVfaW5kZXg6IFwiLVwiLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9O1xuICAgICAgICBjYXNlIFwiaW5kaWNlcy5nZXRcIjpcbiAgICAgICAgICBjb25zdCBwYXlsb2FkSW5kZXggPSBwYXlsb2FkLmRhdGE/LmluZGV4O1xuICAgICAgICAgIGlmIChwYXlsb2FkSW5kZXggPT09IFwiYmFkX2luZGV4XCIpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICAgICAgZXJyb3I6IFwiYmFkX2Vycm9yXCIsXG4gICAgICAgICAgICAgIHJlc3BvbnNlOiB7fSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgICAgcmVzcG9uc2U6IHtcbiAgICAgICAgICAgICAgW3BheWxvYWQuZGF0YT8uaW5kZXhdOiB7XG4gICAgICAgICAgICAgICAgYWxpYXNlczoge1xuICAgICAgICAgICAgICAgICAgdXBkYXRlX3Rlc3RfMToge30sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtYXBwaW5nczoge1xuICAgICAgICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgICAgICB0ZXN0X21hcHBpbmdfMToge1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICAgICAgICBcImluZGV4Lm51bWJlcl9vZl9zaGFyZHNcIjogXCIxXCIsXG4gICAgICAgICAgICAgICAgICBcImluZGV4Lm51bWJlcl9vZl9yZXBsaWNhc1wiOiBcIjFcIixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgb2s6IHRydWUsXG4gICAgICAgIHJlc3BvbnNlOiB7fSxcbiAgICAgIH07XG4gICAgfVxuICApO1xufTtcblxuZXhwb3J0IHsgYnJvd3NlclNlcnZpY2VzTW9jaywgaGlzdG9yeU1vY2ssIGh0dHBDbGllbnRNb2NrLCBzdHlsZU1vY2ssIGNvcmVTZXJ2aWNlc01vY2ssIGFwaUNhbGxlck1vY2sgfTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBS0EsSUFBQUEsb0JBQUEsR0FBQUMsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFDLFlBQUEsR0FBQUYsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFFLGVBQUEsR0FBQUgsc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFHLFVBQUEsR0FBQUosc0JBQUEsQ0FBQUMsT0FBQTtBQUNBLElBQUFJLGlCQUFBLEdBQUFMLHNCQUFBLENBQUFDLE9BQUE7QUFBa0QsU0FBQUQsdUJBQUFNLEdBQUEsV0FBQUEsR0FBQSxJQUFBQSxHQUFBLENBQUFDLFVBQUEsR0FBQUQsR0FBQSxLQUFBRSxPQUFBLEVBQUFGLEdBQUE7QUFUbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBUUEsTUFBTUcsYUFBYSxHQUFJQyx5QkFBcUQsSUFBSztFQUMvRUEseUJBQXlCLENBQUNDLGFBQWEsQ0FBQ0MsU0FBUyxHQUFHQyxJQUFJLENBQUNDLEVBQUUsQ0FDekQsTUFBT0MsT0FBTyxJQUFtQjtJQUFBLElBQUFDLGNBQUEsRUFBQUMsY0FBQSxFQUFB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