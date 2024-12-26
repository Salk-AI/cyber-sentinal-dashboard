"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "WazuhPluginSetup", {
  enumerable: true,
  get: function () {
    return _types.WazuhPluginSetup;
  }
});
Object.defineProperty(exports, "WazuhPluginStart", {
  enumerable: true,
  get: function () {
    return _types.WazuhPluginStart;
  }
});
exports.plugin = plugin;
var _plugin = require("./plugin");
var _types = require("./types");
//  This exports static code and TypeScript types,
//  as well as, plugin platform `plugin()` initializer.

function plugin(initializerContext) {
  return new _plugin.WazuhPlugin(initializerContext);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfcGx1Z2luIiwicmVxdWlyZSIsIl90eXBlcyIsInBsdWdpbiIsImluaXRpYWxpemVyQ29udGV4dCIsIldhenVoUGx1Z2luIl0sInNvdXJjZXMiOlsiaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGx1Z2luSW5pdGlhbGl6ZXJDb250ZXh0IH0gZnJvbSAnb3BlbnNlYXJjaF9kYXNoYm9hcmRzL3NlcnZlcic7XG5cbmltcG9ydCB7IFdhenVoUGx1Z2luIH0gZnJvbSAnLi9wbHVnaW4nO1xuXG4vLyAgVGhpcyBleHBvcnRzIHN0YXRpYyBjb2RlIGFuZCBUeXBlU2NyaXB0IHR5cGVzLFxuLy8gIGFzIHdlbGwgYXMsIHBsdWdpbiBwbGF0Zm9ybSBgcGx1Z2luKClgIGluaXRpYWxpemVyLlxuXG5leHBvcnQgZnVuY3Rpb24gcGx1Z2luKGluaXRpYWxpemVyQ29udGV4dDogUGx1Z2luSW5pdGlhbGl6ZXJDb250ZXh0KSB7XG4gIHJldHVybiBuZXcgV2F6dWhQbHVnaW4oaW5pdGlhbGl6ZXJDb250ZXh0KTtcbn1cblxuZXhwb3J0IHsgV2F6dWhQbHVnaW5TZXR1cCwgV2F6dWhQbHVnaW5TdGFydCB9IGZyb20gJy4vdHlwZXMnO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFBQSxPQUFBLEdBQUFDLE9BQUE7QUFTQSxJQUFBQyxNQUFBLEdBQUFELE9BQUE7QUFQQTtBQUNBOztBQUVPLFNBQVNFLE1BQU1BLENBQUNDLGtCQUE0QyxFQUFFO0VBQ25FLE9BQU8sSUFBSUMsbUJBQVcsQ0FBQ0Qsa0JBQWtCLENBQUM7QUFDNUMifQ==