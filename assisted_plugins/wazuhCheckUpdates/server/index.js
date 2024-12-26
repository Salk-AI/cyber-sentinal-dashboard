"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "WazuhCheckUpdatesPluginSetup", {
  enumerable: true,
  get: function () {
    return _types.WazuhCheckUpdatesPluginSetup;
  }
});
Object.defineProperty(exports, "WazuhCheckUpdatesPluginStart", {
  enumerable: true,
  get: function () {
    return _types.WazuhCheckUpdatesPluginStart;
  }
});
exports.plugin = plugin;
var _plugin = require("./plugin");
var _types = require("./types");
// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.

function plugin(initializerContext) {
  return new _plugin.WazuhCheckUpdatesPlugin(initializerContext);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfcGx1Z2luIiwicmVxdWlyZSIsIl90eXBlcyIsInBsdWdpbiIsImluaXRpYWxpemVyQ29udGV4dCIsIldhenVoQ2hlY2tVcGRhdGVzUGx1Z2luIl0sInNvdXJjZXMiOlsiaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGx1Z2luSW5pdGlhbGl6ZXJDb250ZXh0IH0gZnJvbSAnLi4vLi4vLi4vc3JjL2NvcmUvc2VydmVyJztcbmltcG9ydCB7IFdhenVoQ2hlY2tVcGRhdGVzUGx1Z2luIH0gZnJvbSAnLi9wbHVnaW4nO1xuXG4vLyBUaGlzIGV4cG9ydHMgc3RhdGljIGNvZGUgYW5kIFR5cGVTY3JpcHQgdHlwZXMsXG4vLyBhcyB3ZWxsIGFzLCBPcGVuU2VhcmNoIERhc2hib2FyZHMgUGxhdGZvcm0gYHBsdWdpbigpYCBpbml0aWFsaXplci5cblxuZXhwb3J0IGZ1bmN0aW9uIHBsdWdpbihpbml0aWFsaXplckNvbnRleHQ6IFBsdWdpbkluaXRpYWxpemVyQ29udGV4dCkge1xuICByZXR1cm4gbmV3IFdhenVoQ2hlY2tVcGRhdGVzUGx1Z2luKGluaXRpYWxpemVyQ29udGV4dCk7XG59XG5cbmV4cG9ydCB7IFdhenVoQ2hlY2tVcGRhdGVzUGx1Z2luU2V0dXAsIFdhenVoQ2hlY2tVcGRhdGVzUGx1Z2luU3RhcnQgfSBmcm9tICcuL3R5cGVzJztcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBQUEsT0FBQSxHQUFBQyxPQUFBO0FBU0EsSUFBQUMsTUFBQSxHQUFBRCxPQUFBO0FBUEE7QUFDQTs7QUFFTyxTQUFTRSxNQUFNQSxDQUFDQyxrQkFBNEMsRUFBRTtFQUNuRSxPQUFPLElBQUlDLCtCQUF1QixDQUFDRCxrQkFBa0IsQ0FBQztBQUN4RCJ9