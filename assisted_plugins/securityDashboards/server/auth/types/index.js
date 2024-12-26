"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BasicAuthentication", {
  enumerable: true,
  get: function () {
    return _basic_auth.BasicAuthentication;
  }
});
Object.defineProperty(exports, "JwtAuthentication", {
  enumerable: true,
  get: function () {
    return _jwt_auth.JwtAuthentication;
  }
});
Object.defineProperty(exports, "MultipleAuthentication", {
  enumerable: true,
  get: function () {
    return _multi_auth.MultipleAuthentication;
  }
});
Object.defineProperty(exports, "OpenIdAuthentication", {
  enumerable: true,
  get: function () {
    return _openid_auth.OpenIdAuthentication;
  }
});
Object.defineProperty(exports, "ProxyAuthentication", {
  enumerable: true,
  get: function () {
    return _proxy_auth.ProxyAuthentication;
  }
});
Object.defineProperty(exports, "SamlAuthentication", {
  enumerable: true,
  get: function () {
    return _saml_auth.SamlAuthentication;
  }
});
var _basic_auth = require("./basic/basic_auth");
var _jwt_auth = require("./jwt/jwt_auth");
var _openid_auth = require("./openid/openid_auth");
var _proxy_auth = require("./proxy/proxy_auth");
var _saml_auth = require("./saml/saml_auth");
var _multi_auth = require("./multiple/multi_auth");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfYmFzaWNfYXV0aCIsInJlcXVpcmUiLCJfand0X2F1dGgiLCJfb3BlbmlkX2F1dGgiLCJfcHJveHlfYXV0aCIsIl9zYW1sX2F1dGgiLCJfbXVsdGlfYXV0aCJdLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAgIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICpcbiAqICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKS5cbiAqICAgWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogICBBIGNvcHkgb2YgdGhlIExpY2Vuc2UgaXMgbG9jYXRlZCBhdFxuICpcbiAqICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICAgb3IgaW4gdGhlIFwibGljZW5zZVwiIGZpbGUgYWNjb21wYW55aW5nIHRoaXMgZmlsZS4gVGhpcyBmaWxlIGlzIGRpc3RyaWJ1dGVkXG4gKiAgIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogICBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZ1xuICogICBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuZXhwb3J0IHsgQmFzaWNBdXRoZW50aWNhdGlvbiB9IGZyb20gJy4vYmFzaWMvYmFzaWNfYXV0aCc7XG5leHBvcnQgeyBKd3RBdXRoZW50aWNhdGlvbiB9IGZyb20gJy4vand0L2p3dF9hdXRoJztcbmV4cG9ydCB7IE9wZW5JZEF1dGhlbnRpY2F0aW9uIH0gZnJvbSAnLi9vcGVuaWQvb3BlbmlkX2F1dGgnO1xuZXhwb3J0IHsgUHJveHlBdXRoZW50aWNhdGlvbiB9IGZyb20gJy4vcHJveHkvcHJveHlfYXV0aCc7XG5leHBvcnQgeyBTYW1sQXV0aGVudGljYXRpb24gfSBmcm9tICcuL3NhbWwvc2FtbF9hdXRoJztcbmV4cG9ydCB7IE11bHRpcGxlQXV0aGVudGljYXRpb24gfSBmcm9tICcuL211bHRpcGxlL211bHRpX2F1dGgnO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWVBLElBQUFBLFdBQUEsR0FBQUMsT0FBQTtBQUNBLElBQUFDLFNBQUEsR0FBQUQsT0FBQTtBQUNBLElBQUFFLFlBQUEsR0FBQUYsT0FBQTtBQUNBLElBQUFHLFdBQUEsR0FBQUgsT0FBQTtBQUNBLElBQUFJLFVBQUEsR0FBQUosT0FBQTtBQUNBLElBQUFLLFdBQUEsR0FBQUwsT0FBQSJ9