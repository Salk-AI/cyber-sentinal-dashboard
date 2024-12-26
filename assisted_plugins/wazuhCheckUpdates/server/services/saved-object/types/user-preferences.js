"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userPreferencesObject = void 0;
var _constants = require("../../../../common/constants");
const userPreferencesObject = exports.userPreferencesObject = {
  name: _constants.SAVED_OBJECT_USER_PREFERENCES,
  hidden: false,
  namespaceType: 'agnostic',
  mappings: {
    properties: {
      last_dismissed_updates: {
        type: 'nested',
        properties: {
          api_id: {
            type: 'text'
          },
          last_major: {
            type: 'text'
          },
          last_minor: {
            type: 'text'
          },
          last_patch: {
            type: 'text'
          }
        }
      },
      hide_update_notifications: {
        type: 'boolean'
      }
    }
  },
  migrations: {}
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfY29uc3RhbnRzIiwicmVxdWlyZSIsInVzZXJQcmVmZXJlbmNlc09iamVjdCIsImV4cG9ydHMiLCJuYW1lIiwiU0FWRURfT0JKRUNUX1VTRVJfUFJFRkVSRU5DRVMiLCJoaWRkZW4iLCJuYW1lc3BhY2VUeXBlIiwibWFwcGluZ3MiLCJwcm9wZXJ0aWVzIiwibGFzdF9kaXNtaXNzZWRfdXBkYXRlcyIsInR5cGUiLCJhcGlfaWQiLCJsYXN0X21ham9yIiwibGFzdF9taW5vciIsImxhc3RfcGF0Y2giLCJoaWRlX3VwZGF0ZV9ub3RpZmljYXRpb25zIiwibWlncmF0aW9ucyJdLCJzb3VyY2VzIjpbInVzZXItcHJlZmVyZW5jZXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2F2ZWRPYmplY3RzVHlwZSB9IGZyb20gJ29wZW5zZWFyY2gtZGFzaGJvYXJkcy9zZXJ2ZXInO1xuaW1wb3J0IHsgU0FWRURfT0JKRUNUX1VTRVJfUFJFRkVSRU5DRVMgfSBmcm9tICcuLi8uLi8uLi8uLi9jb21tb24vY29uc3RhbnRzJztcblxuZXhwb3J0IGNvbnN0IHVzZXJQcmVmZXJlbmNlc09iamVjdDogU2F2ZWRPYmplY3RzVHlwZSA9IHtcbiAgbmFtZTogU0FWRURfT0JKRUNUX1VTRVJfUFJFRkVSRU5DRVMsXG4gIGhpZGRlbjogZmFsc2UsXG4gIG5hbWVzcGFjZVR5cGU6ICdhZ25vc3RpYycsXG4gIG1hcHBpbmdzOiB7XG4gICAgcHJvcGVydGllczoge1xuICAgICAgbGFzdF9kaXNtaXNzZWRfdXBkYXRlczoge1xuICAgICAgICB0eXBlOiAnbmVzdGVkJyxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIGFwaV9pZDoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgbGFzdF9tYWpvcjoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgbGFzdF9taW5vcjoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgbGFzdF9wYXRjaDoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgaGlkZV91cGRhdGVfbm90aWZpY2F0aW9uczoge1xuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIG1pZ3JhdGlvbnM6IHt9LFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsSUFBQUEsVUFBQSxHQUFBQyxPQUFBO0FBRU8sTUFBTUMscUJBQXVDLEdBQUFDLE9BQUEsQ0FBQUQscUJBQUEsR0FBRztFQUNyREUsSUFBSSxFQUFFQyx3Q0FBNkI7RUFDbkNDLE1BQU0sRUFBRSxLQUFLO0VBQ2JDLGFBQWEsRUFBRSxVQUFVO0VBQ3pCQyxRQUFRLEVBQUU7SUFDUkMsVUFBVSxFQUFFO01BQ1ZDLHNCQUFzQixFQUFFO1FBQ3RCQyxJQUFJLEVBQUUsUUFBUTtRQUNkRixVQUFVLEVBQUU7VUFDVkcsTUFBTSxFQUFFO1lBQ05ELElBQUksRUFBRTtVQUNSLENBQUM7VUFDREUsVUFBVSxFQUFFO1lBQ1ZGLElBQUksRUFBRTtVQUNSLENBQUM7VUFDREcsVUFBVSxFQUFFO1lBQ1ZILElBQUksRUFBRTtVQUNSLENBQUM7VUFDREksVUFBVSxFQUFFO1lBQ1ZKLElBQUksRUFBRTtVQUNSO1FBQ0Y7TUFDRixDQUFDO01BQ0RLLHlCQUF5QixFQUFFO1FBQ3pCTCxJQUFJLEVBQUU7TUFDUjtJQUNGO0VBQ0YsQ0FBQztFQUNETSxVQUFVLEVBQUUsQ0FBQztBQUNmLENBQUMifQ==