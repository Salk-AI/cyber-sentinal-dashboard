"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Plugin", {
  enumerable: true,
  get: function () {
    return _plugin.ReportsDashboardsPlugin;
  }
});
Object.defineProperty(exports, "ReportingConfig", {
  enumerable: true,
  get: function () {
    return _config2.ReportingConfig;
  }
});
Object.defineProperty(exports, "ReportsDashboardsPluginSetup", {
  enumerable: true,
  get: function () {
    return _types.ReportsDashboardsPluginSetup;
  }
});
Object.defineProperty(exports, "ReportsDashboardsPluginStart", {
  enumerable: true,
  get: function () {
    return _types.ReportsDashboardsPluginStart;
  }
});
Object.defineProperty(exports, "config", {
  enumerable: true,
  get: function () {
    return _config.config;
  }
});
exports.plugin = plugin;
var _plugin = require("./plugin");
var _config = require("./config");
var _config2 = require("./config/config");
var _types = require("./types");
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

//  This exports static code and TypeScript types,
//  as well as, OpenSearch Dashboards Platform `plugin()` initializer.
function plugin(initializerContext) {
  return new _plugin.ReportsDashboardsPlugin(initializerContext);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfcGx1Z2luIiwicmVxdWlyZSIsIl9jb25maWciLCJfY29uZmlnMiIsIl90eXBlcyIsInBsdWdpbiIsImluaXRpYWxpemVyQ29udGV4dCIsIlJlcG9ydHNEYXNoYm9hcmRzUGx1Z2luIl0sInNvdXJjZXMiOlsiaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFwYWNoZS0yLjBcbiAqL1xuXG5pbXBvcnQgeyBQbHVnaW5Jbml0aWFsaXplckNvbnRleHQgfSBmcm9tICcuLi8uLi8uLi9zcmMvY29yZS9zZXJ2ZXInO1xuaW1wb3J0IHsgUmVwb3J0aW5nQ29uZmlnVHlwZSB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IFJlcG9ydHNEYXNoYm9hcmRzUGx1Z2luIH0gZnJvbSAnLi9wbHVnaW4nO1xuXG5leHBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5leHBvcnQgeyBSZXBvcnRpbmdDb25maWcgfSBmcm9tICcuL2NvbmZpZy9jb25maWcnO1xuZXhwb3J0IHsgUmVwb3J0c0Rhc2hib2FyZHNQbHVnaW4gYXMgUGx1Z2luIH07XG5cbi8vICBUaGlzIGV4cG9ydHMgc3RhdGljIGNvZGUgYW5kIFR5cGVTY3JpcHQgdHlwZXMsXG4vLyAgYXMgd2VsbCBhcywgT3BlblNlYXJjaCBEYXNoYm9hcmRzIFBsYXRmb3JtIGBwbHVnaW4oKWAgaW5pdGlhbGl6ZXIuXG5leHBvcnQgZnVuY3Rpb24gcGx1Z2luKFxuICBpbml0aWFsaXplckNvbnRleHQ6IFBsdWdpbkluaXRpYWxpemVyQ29udGV4dDxSZXBvcnRpbmdDb25maWdUeXBlPlxuKSB7XG4gIHJldHVybiBuZXcgUmVwb3J0c0Rhc2hib2FyZHNQbHVnaW4oaW5pdGlhbGl6ZXJDb250ZXh0KTtcbn1cblxuZXhwb3J0IHtcbiAgUmVwb3J0c0Rhc2hib2FyZHNQbHVnaW5TZXR1cCxcbiAgUmVwb3J0c0Rhc2hib2FyZHNQbHVnaW5TdGFydCxcbn0gZnJvbSAnLi90eXBlcyc7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9BLElBQUFBLE9BQUEsR0FBQUMsT0FBQTtBQUVBLElBQUFDLE9BQUEsR0FBQUQsT0FBQTtBQUNBLElBQUFFLFFBQUEsR0FBQUYsT0FBQTtBQVdBLElBQUFHLE1BQUEsR0FBQUgsT0FBQTtBQXJCQTtBQUNBO0FBQ0E7QUFDQTs7QUFVQTtBQUNBO0FBQ08sU0FBU0ksTUFBTUEsQ0FDcEJDLGtCQUFpRSxFQUNqRTtFQUNBLE9BQU8sSUFBSUMsK0JBQXVCLENBQUNELGtCQUFrQixDQUFDO0FBQ3hEIn0=