"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultFactory = void 0;
var _constants = require("../../../../common/constants");
var _md = _interopRequireDefault(require("md5"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class DefaultFactory {
  constructor() {
    _defineProperty(this, "platform", '');
  }
  async getCurrentUser(request, context) {
    return {
      username: _constants.ELASTIC_NAME,
      authContext: {
        username: _constants.ELASTIC_NAME
      },
      hashUsername: (0, _md.default)(_constants.ELASTIC_NAME)
    };
  }
  async isAdministratorUser(context, request) {
    // This is replaced after creating the instance
  }
}
exports.DefaultFactory = DefaultFactory;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY29uc3RhbnRzIiwicmVxdWlyZSIsIl9tZCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJvYmoiLCJfX2VzTW9kdWxlIiwiZGVmYXVsdCIsIl9kZWZpbmVQcm9wZXJ0eSIsImtleSIsInZhbHVlIiwiX3RvUHJvcGVydHlLZXkiLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsImFyZyIsIl90b1ByaW1pdGl2ZSIsIlN0cmluZyIsImlucHV0IiwiaGludCIsInByaW0iLCJTeW1ib2wiLCJ0b1ByaW1pdGl2ZSIsInVuZGVmaW5lZCIsInJlcyIsImNhbGwiLCJUeXBlRXJyb3IiLCJOdW1iZXIiLCJEZWZhdWx0RmFjdG9yeSIsImNvbnN0cnVjdG9yIiwiZ2V0Q3VycmVudFVzZXIiLCJyZXF1ZXN0IiwiY29udGV4dCIsInVzZXJuYW1lIiwiRUxBU1RJQ19OQU1FIiwiYXV0aENvbnRleHQiLCJoYXNoVXNlcm5hbWUiLCJtZDUiLCJpc0FkbWluaXN0cmF0b3JVc2VyIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbImRlZmF1bHQtZmFjdG9yeS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJU2VjdXJpdHlGYWN0b3J5IH0gZnJvbSAnLi4nO1xuaW1wb3J0IHtcbiAgT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG59IGZyb20gJ3NyYy9jb3JlL3NlcnZlcic7XG5pbXBvcnQgeyBFTEFTVElDX05BTUUgfSBmcm9tICcuLi8uLi8uLi8uLi9jb21tb24vY29uc3RhbnRzJztcbmltcG9ydCBtZDUgZnJvbSAnbWQ1JztcblxuZXhwb3J0IGNsYXNzIERlZmF1bHRGYWN0b3J5IGltcGxlbWVudHMgSVNlY3VyaXR5RmFjdG9yeSB7XG4gIHBsYXRmb3JtOiBzdHJpbmcgPSAnJztcbiAgYXN5bmMgZ2V0Q3VycmVudFVzZXIoXG4gICAgcmVxdWVzdDogT3BlblNlYXJjaERhc2hib2FyZHNSZXF1ZXN0LFxuICAgIGNvbnRleHQ/OiBSZXF1ZXN0SGFuZGxlckNvbnRleHQsXG4gICkge1xuICAgIHJldHVybiB7XG4gICAgICB1c2VybmFtZTogRUxBU1RJQ19OQU1FLFxuICAgICAgYXV0aENvbnRleHQ6IHsgdXNlcm5hbWU6IEVMQVNUSUNfTkFNRSB9LFxuICAgICAgaGFzaFVzZXJuYW1lOiBtZDUoRUxBU1RJQ19OQU1FKSxcbiAgICB9O1xuICB9XG4gIGFzeW5jIGlzQWRtaW5pc3RyYXRvclVzZXIoXG4gICAgY29udGV4dDogUmVxdWVzdEhhbmRsZXJDb250ZXh0LFxuICAgIHJlcXVlc3Q6IE9wZW5TZWFyY2hEYXNoYm9hcmRzUmVxdWVzdCxcbiAgKSB7XG4gICAgLy8gVGhpcyBpcyByZXBsYWNlZCBhZnRlciBjcmVhdGluZyB0aGUgaW5zdGFuY2VcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFLQSxJQUFBQSxVQUFBLEdBQUFDLE9BQUE7QUFDQSxJQUFBQyxHQUFBLEdBQUFDLHNCQUFBLENBQUFGLE9BQUE7QUFBc0IsU0FBQUUsdUJBQUFDLEdBQUEsV0FBQUEsR0FBQSxJQUFBQSxHQUFBLENBQUFDLFVBQUEsR0FBQUQsR0FBQSxLQUFBRSxPQUFBLEVBQUFGLEdBQUE7QUFBQSxTQUFBRyxnQkFBQUgsR0FBQSxFQUFBSSxHQUFBLEVBQUFDLEtBQUEsSUFBQUQsR0FBQSxHQUFBRSxjQUFBLENBQUFGLEdBQUEsT0FBQUEsR0FBQSxJQUFBSixHQUFBLElBQUFPLE1BQUEsQ0FBQUMsY0FBQSxDQUFBUixHQUFBLEVBQUFJLEdBQUEsSUFBQUMsS0FBQSxFQUFBQSxLQUFBLEVBQUFJLFVBQUEsUUFBQUMsWUFBQSxRQUFBQyxRQUFBLG9CQUFBWCxHQUFBLENBQUFJLEdBQUEsSUFBQUMsS0FBQSxXQUFBTCxHQUFBO0FBQUEsU0FBQU0sZUFBQU0sR0FBQSxRQUFBUixHQUFBLEdBQUFTLFlBQUEsQ0FBQUQsR0FBQSwyQkFBQVIsR0FBQSxnQkFBQUEsR0FBQSxHQUFBVSxNQUFBLENBQUFWLEdBQUE7QUFBQSxTQUFBUyxhQUFBRSxLQUFBLEVBQUFDLElBQUEsZUFBQUQsS0FBQSxpQkFBQUEsS0FBQSxrQkFBQUEsS0FBQSxNQUFBRSxJQUFBLEdBQUFGLEtBQUEsQ0FBQUcsTUFBQSxDQUFBQyxXQUFBLE9BQUFGLElBQUEsS0FBQUcsU0FBQSxRQUFBQyxHQUFBLEdBQUFKLElBQUEsQ0FBQUssSUFBQSxDQUFBUCxLQUFBLEVBQUFDLElBQUEsMkJBQUFLLEdBQUEsc0JBQUFBLEdBQUEsWUFBQUUsU0FBQSw0REFBQVAsSUFBQSxnQkFBQUYsTUFBQSxHQUFBVSxNQUFBLEVBQUFULEtBQUE7QUFFZixNQUFNVSxjQUFjLENBQTZCO0VBQUFDLFlBQUE7SUFBQXZCLGVBQUEsbUJBQ25DLEVBQUU7RUFBQTtFQUNyQixNQUFNd0IsY0FBY0EsQ0FDbEJDLE9BQW9DLEVBQ3BDQyxPQUErQixFQUMvQjtJQUNBLE9BQU87TUFDTEMsUUFBUSxFQUFFQyx1QkFBWTtNQUN0QkMsV0FBVyxFQUFFO1FBQUVGLFFBQVEsRUFBRUM7TUFBYSxDQUFDO01BQ3ZDRSxZQUFZLEVBQUUsSUFBQUMsV0FBRyxFQUFDSCx1QkFBWTtJQUNoQyxDQUFDO0VBQ0g7RUFDQSxNQUFNSSxtQkFBbUJBLENBQ3ZCTixPQUE4QixFQUM5QkQsT0FBb0MsRUFDcEM7SUFDQTtFQUFBO0FBRUo7QUFBQ1EsT0FBQSxDQUFBWCxjQUFBLEdBQUFBLGNBQUEifQ==