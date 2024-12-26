"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "GanttVisPluginSetup", {
  enumerable: true,
  get: function () {
    return _types.GanttVisPluginSetup;
  }
});
Object.defineProperty(exports, "GanttVisPluginStart", {
  enumerable: true,
  get: function () {
    return _types.GanttVisPluginStart;
  }
});
exports.plugin = plugin;
var _plugin = require("./plugin");
var _types = require("./types");
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

//  This exports static code and TypeScript types,
//  as well as, OpenSearch Dashboards Platform `plugin()` initializer.

function plugin(initializerContext) {
  return new _plugin.GanttVisPlugin(initializerContext);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfcGx1Z2luIiwicmVxdWlyZSIsIl90eXBlcyIsInBsdWdpbiIsImluaXRpYWxpemVyQ29udGV4dCIsIkdhbnR0VmlzUGx1Z2luIl0sInNvdXJjZXMiOlsiaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBQbHVnaW5Jbml0aWFsaXplckNvbnRleHQgfSBmcm9tICcuLi8uLi8uLi9zcmMvY29yZS9zZXJ2ZXInO1xuaW1wb3J0IHsgR2FudHRWaXNQbHVnaW4gfSBmcm9tICcuL3BsdWdpbic7XG5cbi8vICBUaGlzIGV4cG9ydHMgc3RhdGljIGNvZGUgYW5kIFR5cGVTY3JpcHQgdHlwZXMsXG4vLyAgYXMgd2VsbCBhcywgT3BlblNlYXJjaCBEYXNoYm9hcmRzIFBsYXRmb3JtIGBwbHVnaW4oKWAgaW5pdGlhbGl6ZXIuXG5cbmV4cG9ydCBmdW5jdGlvbiBwbHVnaW4oaW5pdGlhbGl6ZXJDb250ZXh0OiBQbHVnaW5Jbml0aWFsaXplckNvbnRleHQpIHtcbiAgcmV0dXJuIG5ldyBHYW50dFZpc1BsdWdpbihpbml0aWFsaXplckNvbnRleHQpO1xufVxuXG5leHBvcnQgeyBHYW50dFZpc1BsdWdpblNldHVwLCBHYW50dFZpc1BsdWdpblN0YXJ0IH0gZnJvbSAnLi90eXBlcyc7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQVNBLElBQUFDLE1BQUEsR0FBQUQsT0FBQTtBQWZBO0FBQ0E7QUFDQTtBQUNBOztBQUtBO0FBQ0E7O0FBRU8sU0FBU0UsTUFBTUEsQ0FBQ0Msa0JBQTRDLEVBQUU7RUFDbkUsT0FBTyxJQUFJQyxzQkFBYyxDQUFDRCxrQkFBa0IsQ0FBQztBQUMvQyJ9