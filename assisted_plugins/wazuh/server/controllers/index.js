"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  WazuhElasticCtrl: true,
  WazuhApiCtrl: true,
  WazuhReportingCtrl: true,
  WazuhHostsCtrl: true
};
Object.defineProperty(exports, "WazuhApiCtrl", {
  enumerable: true,
  get: function () {
    return _wazuhApi.WazuhApiCtrl;
  }
});
Object.defineProperty(exports, "WazuhElasticCtrl", {
  enumerable: true,
  get: function () {
    return _wazuhElastic.WazuhElasticCtrl;
  }
});
Object.defineProperty(exports, "WazuhHostsCtrl", {
  enumerable: true,
  get: function () {
    return _wazuhHosts.WazuhHostsCtrl;
  }
});
Object.defineProperty(exports, "WazuhReportingCtrl", {
  enumerable: true,
  get: function () {
    return _wazuhReporting.WazuhReportingCtrl;
  }
});
var _wazuhElastic = require("./wazuh-elastic");
var _wazuhApi = require("./wazuh-api");
var _wazuhReporting = require("./wazuh-reporting");
var _wazuhHosts = require("./wazuh-hosts");
var _wazuhUtils = require("./wazuh-utils");
Object.keys(_wazuhUtils).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _wazuhUtils[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _wazuhUtils[key];
    }
  });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfd2F6dWhFbGFzdGljIiwicmVxdWlyZSIsIl93YXp1aEFwaSIsIl93YXp1aFJlcG9ydGluZyIsIl93YXp1aEhvc3RzIiwiX3dhenVoVXRpbHMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsImtleSIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsIl9leHBvcnROYW1lcyIsImV4cG9ydHMiLCJkZWZpbmVQcm9wZXJ0eSIsImVudW1lcmFibGUiLCJnZXQiXSwic291cmNlcyI6WyJpbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogV2F6dWggYXBwIC0gTW9kdWxlIHRvIGV4cG9ydCBhbGwgdGhlIGNvbnRyb2xsZXJzXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTUtMjAyMiBXYXp1aCwgSW5jLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOyB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbjsgZWl0aGVyIHZlcnNpb24gMiBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogRmluZCBtb3JlIGluZm9ybWF0aW9uIGFib3V0IHRoaXMgb24gdGhlIExJQ0VOU0UgZmlsZS5cbiAqL1xuZXhwb3J0IHsgV2F6dWhFbGFzdGljQ3RybCB9IGZyb20gJy4vd2F6dWgtZWxhc3RpYyc7XG5leHBvcnQgeyBXYXp1aEFwaUN0cmwgfSBmcm9tICcuL3dhenVoLWFwaSc7XG5leHBvcnQgeyBXYXp1aFJlcG9ydGluZ0N0cmwgfSBmcm9tICcuL3dhenVoLXJlcG9ydGluZyc7XG5leHBvcnQgeyBXYXp1aEhvc3RzQ3RybCB9IGZyb20gJy4vd2F6dWgtaG9zdHMnO1xuZXhwb3J0ICogZnJvbSAnLi93YXp1aC11dGlscyc7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBV0EsSUFBQUEsYUFBQSxHQUFBQyxPQUFBO0FBQ0EsSUFBQUMsU0FBQSxHQUFBRCxPQUFBO0FBQ0EsSUFBQUUsZUFBQSxHQUFBRixPQUFBO0FBQ0EsSUFBQUcsV0FBQSxHQUFBSCxPQUFBO0FBQ0EsSUFBQUksV0FBQSxHQUFBSixPQUFBO0FBQUFLLE1BQUEsQ0FBQUMsSUFBQSxDQUFBRixXQUFBLEVBQUFHLE9BQUEsV0FBQUMsR0FBQTtFQUFBLElBQUFBLEdBQUEsa0JBQUFBLEdBQUE7RUFBQSxJQUFBSCxNQUFBLENBQUFJLFNBQUEsQ0FBQUMsY0FBQSxDQUFBQyxJQUFBLENBQUFDLFlBQUEsRUFBQUosR0FBQTtFQUFBLElBQUFBLEdBQUEsSUFBQUssT0FBQSxJQUFBQSxPQUFBLENBQUFMLEdBQUEsTUFBQUosV0FBQSxDQUFBSSxHQUFBO0VBQUFILE1BQUEsQ0FBQVMsY0FBQSxDQUFBRCxPQUFBLEVBQUFMLEdBQUE7SUFBQU8sVUFBQTtJQUFBQyxHQUFBLFdBQUFBLENBQUE7TUFBQSxPQUFBWixXQUFBLENBQUFJLEdBQUE7SUFBQTtFQUFBO0FBQUEifQ==