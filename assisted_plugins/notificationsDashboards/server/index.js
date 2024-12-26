"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "notificationsDashboardsPluginSetup", {
  enumerable: true,
  get: function () {
    return _types.notificationsDashboardsPluginSetup;
  }
});
Object.defineProperty(exports, "notificationsDashboardsPluginStart", {
  enumerable: true,
  get: function () {
    return _types.notificationsDashboardsPluginStart;
  }
});
exports.plugin = plugin;
var _plugin = require("./plugin");
var _types = require("./types");
//  This exports static code and TypeScript types,
//  as well as, OpenSearch Dashboards Platform `plugin()` initializer.

function plugin(initializerContext) {
  return new _plugin.notificationsDashboardsPlugin(initializerContext);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfcGx1Z2luIiwicmVxdWlyZSIsIl90eXBlcyIsInBsdWdpbiIsImluaXRpYWxpemVyQ29udGV4dCIsIm5vdGlmaWNhdGlvbnNEYXNoYm9hcmRzUGx1Z2luIl0sInNvdXJjZXMiOlsiaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGx1Z2luSW5pdGlhbGl6ZXJDb250ZXh0IH0gZnJvbSBcIi4uLy4uLy4uL3NyYy9jb3JlL3NlcnZlclwiO1xuaW1wb3J0IHsgbm90aWZpY2F0aW9uc0Rhc2hib2FyZHNQbHVnaW4gfSBmcm9tIFwiLi9wbHVnaW5cIjtcblxuLy8gIFRoaXMgZXhwb3J0cyBzdGF0aWMgY29kZSBhbmQgVHlwZVNjcmlwdCB0eXBlcyxcbi8vICBhcyB3ZWxsIGFzLCBPcGVuU2VhcmNoIERhc2hib2FyZHMgUGxhdGZvcm0gYHBsdWdpbigpYCBpbml0aWFsaXplci5cblxuZXhwb3J0IGZ1bmN0aW9uIHBsdWdpbihpbml0aWFsaXplckNvbnRleHQ6IFBsdWdpbkluaXRpYWxpemVyQ29udGV4dCkge1xuICByZXR1cm4gbmV3IG5vdGlmaWNhdGlvbnNEYXNoYm9hcmRzUGx1Z2luKGluaXRpYWxpemVyQ29udGV4dCk7XG59XG5cbmV4cG9ydCB7XG4gIG5vdGlmaWNhdGlvbnNEYXNoYm9hcmRzUGx1Z2luU2V0dXAsXG4gIG5vdGlmaWNhdGlvbnNEYXNoYm9hcmRzUGx1Z2luU3RhcnQsXG59IGZyb20gXCIuL3R5cGVzXCI7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQVNBLElBQUFDLE1BQUEsR0FBQUQsT0FBQTtBQVBBO0FBQ0E7O0FBRU8sU0FBU0UsTUFBTUEsQ0FBQ0Msa0JBQTRDLEVBQUU7RUFDbkUsT0FBTyxJQUFJQyxxQ0FBNkIsQ0FBQ0Qsa0JBQWtCLENBQUM7QUFDOUQifQ==