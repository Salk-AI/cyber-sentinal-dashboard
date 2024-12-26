"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearOldVersionCookieValue = clearOldVersionCookieValue;
exports.getSecurityCookieOptions = getSecurityCookieOptions;
/*
 *   Copyright OpenSearch Contributors
 *
 *   Licensed under the Apache License, Version 2.0 (the "License").
 *   You may not use this file except in compliance with the License.
 *   A copy of the License is located at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   or in the "license" file accompanying this file. This file is distributed
 *   on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *   express or implied. See the License for the specific language governing
 *   permissions and limitations under the License.
 */

function getSecurityCookieOptions(config) {
  return {
    name: config.cookie.name,
    encryptionKey: config.cookie.password,
    validate: sessionStorage => {
      sessionStorage = sessionStorage;
      if (sessionStorage === undefined) {
        return {
          isValid: false,
          path: '/'
        };
      }

      // TODO: with setting redirect attributes to support OIDC and SAML,
      //       we need to do additional cookie validation in AuthenticationHandlers.
      // if SAML fields present
      if (sessionStorage.saml && sessionStorage.saml.requestId && sessionStorage.saml.nextUrl) {
        return {
          isValid: true,
          path: '/'
        };
      }

      // if OIDC fields present
      if (sessionStorage.oidc) {
        return {
          isValid: true,
          path: '/'
        };
      }
      if (sessionStorage.expiryTime === undefined || sessionStorage.expiryTime < Date.now()) {
        return {
          isValid: false,
          path: '/'
        };
      }
      return {
        isValid: true,
        path: '/'
      };
    },
    isSecure: config.cookie.secure,
    sameSite: config.cookie.isSameSite || undefined
  };
}
function clearOldVersionCookieValue(config) {
  if (config.cookie.secure) {
    return 'security_authentication=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure; HttpOnly; Path=/';
  } else {
    return 'security_authentication=; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Path=/';
  }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJnZXRTZWN1cml0eUNvb2tpZU9wdGlvbnMiLCJjb25maWciLCJuYW1lIiwiY29va2llIiwiZW5jcnlwdGlvbktleSIsInBhc3N3b3JkIiwidmFsaWRhdGUiLCJzZXNzaW9uU3RvcmFnZSIsInVuZGVmaW5lZCIsImlzVmFsaWQiLCJwYXRoIiwic2FtbCIsInJlcXVlc3RJZCIsIm5leHRVcmwiLCJvaWRjIiwiZXhwaXJ5VGltZSIsIkRhdGUiLCJub3ciLCJpc1NlY3VyZSIsInNlY3VyZSIsInNhbWVTaXRlIiwiaXNTYW1lU2l0ZSIsImNsZWFyT2xkVmVyc2lvbkNvb2tpZVZhbHVlIl0sInNvdXJjZXMiOlsic2VjdXJpdHlfY29va2llLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiAgIENvcHlyaWdodCBPcGVuU2VhcmNoIENvbnRyaWJ1dG9yc1xuICpcbiAqICAgTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKS5cbiAqICAgWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogICBBIGNvcHkgb2YgdGhlIExpY2Vuc2UgaXMgbG9jYXRlZCBhdFxuICpcbiAqICAgICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqICAgb3IgaW4gdGhlIFwibGljZW5zZVwiIGZpbGUgYWNjb21wYW55aW5nIHRoaXMgZmlsZS4gVGhpcyBmaWxlIGlzIGRpc3RyaWJ1dGVkXG4gKiAgIG9uIGFuIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlclxuICogICBleHByZXNzIG9yIGltcGxpZWQuIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZ1xuICogICBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuaW1wb3J0IHsgU2Vzc2lvblN0b3JhZ2VDb29raWVPcHRpb25zIH0gZnJvbSAnLi4vLi4vLi4vLi4vc3JjL2NvcmUvc2VydmVyJztcbmltcG9ydCB7IFNlY3VyaXR5UGx1Z2luQ29uZmlnVHlwZSB9IGZyb20gJy4uJztcblxuZXhwb3J0IGludGVyZmFjZSBTZWN1cml0eVNlc3Npb25Db29raWUge1xuICAvLyBzZWN1cml0eV9hdXRoZW50aWNhdGlvblxuICB1c2VybmFtZT86IHN0cmluZztcbiAgY3JlZGVudGlhbHM/OiBhbnk7XG4gIGF1dGhUeXBlPzogc3RyaW5nO1xuICBhc3NpZ25BdXRoSGVhZGVyPzogYm9vbGVhbjtcbiAgaXNBbm9ueW1vdXNBdXRoPzogYm9vbGVhbjtcbiAgZXhwaXJ5VGltZT86IG51bWJlcjtcbiAgYWRkaXRpb25hbEF1dGhIZWFkZXJzPzogYW55O1xuXG4gIC8vIHNlY3VyaXR5X3N0b3JhZ2VcbiAgdGVuYW50PzogYW55O1xuXG4gIC8vIGZvciBvaWRjIGF1dGggd29ya2Zsb3dcbiAgb2lkYz86IHtcbiAgICBzdGF0ZT86IHN0cmluZztcbiAgICBuZXh0VXJsPzogc3RyaW5nO1xuICAgIHJlZGlyZWN0SGFzaD86IGJvb2xlYW47XG4gIH07XG5cbiAgLy8gZm9yIFNhbWwgYXV0aCB3b3JrZmxvd1xuICBzYW1sPzoge1xuICAgIHJlcXVlc3RJZD86IHN0cmluZztcbiAgICBuZXh0VXJsPzogc3RyaW5nO1xuICAgIHJlZGlyZWN0SGFzaD86IGJvb2xlYW47XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZWN1cml0eUNvb2tpZU9wdGlvbnMoXG4gIGNvbmZpZzogU2VjdXJpdHlQbHVnaW5Db25maWdUeXBlXG4pOiBTZXNzaW9uU3RvcmFnZUNvb2tpZU9wdGlvbnM8U2VjdXJpdHlTZXNzaW9uQ29va2llPiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogY29uZmlnLmNvb2tpZS5uYW1lLFxuICAgIGVuY3J5cHRpb25LZXk6IGNvbmZpZy5jb29raWUucGFzc3dvcmQsXG4gICAgdmFsaWRhdGU6IChzZXNzaW9uU3RvcmFnZTogU2VjdXJpdHlTZXNzaW9uQ29va2llIHwgU2VjdXJpdHlTZXNzaW9uQ29va2llW10pID0+IHtcbiAgICAgIHNlc3Npb25TdG9yYWdlID0gc2Vzc2lvblN0b3JhZ2UgYXMgU2VjdXJpdHlTZXNzaW9uQ29va2llO1xuICAgICAgaWYgKHNlc3Npb25TdG9yYWdlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHsgaXNWYWxpZDogZmFsc2UsIHBhdGg6ICcvJyB9O1xuICAgICAgfVxuXG4gICAgICAvLyBUT0RPOiB3aXRoIHNldHRpbmcgcmVkaXJlY3QgYXR0cmlidXRlcyB0byBzdXBwb3J0IE9JREMgYW5kIFNBTUwsXG4gICAgICAvLyAgICAgICB3ZSBuZWVkIHRvIGRvIGFkZGl0aW9uYWwgY29va2llIHZhbGlkYXRpb24gaW4gQXV0aGVudGljYXRpb25IYW5kbGVycy5cbiAgICAgIC8vIGlmIFNBTUwgZmllbGRzIHByZXNlbnRcbiAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5zYW1sICYmIHNlc3Npb25TdG9yYWdlLnNhbWwucmVxdWVzdElkICYmIHNlc3Npb25TdG9yYWdlLnNhbWwubmV4dFVybCkge1xuICAgICAgICByZXR1cm4geyBpc1ZhbGlkOiB0cnVlLCBwYXRoOiAnLycgfTtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgT0lEQyBmaWVsZHMgcHJlc2VudFxuICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLm9pZGMpIHtcbiAgICAgICAgcmV0dXJuIHsgaXNWYWxpZDogdHJ1ZSwgcGF0aDogJy8nIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChzZXNzaW9uU3RvcmFnZS5leHBpcnlUaW1lID09PSB1bmRlZmluZWQgfHwgc2Vzc2lvblN0b3JhZ2UuZXhwaXJ5VGltZSA8IERhdGUubm93KCkpIHtcbiAgICAgICAgcmV0dXJuIHsgaXNWYWxpZDogZmFsc2UsIHBhdGg6ICcvJyB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgaXNWYWxpZDogdHJ1ZSwgcGF0aDogJy8nIH07XG4gICAgfSxcbiAgICBpc1NlY3VyZTogY29uZmlnLmNvb2tpZS5zZWN1cmUsXG4gICAgc2FtZVNpdGU6IGNvbmZpZy5jb29raWUuaXNTYW1lU2l0ZSB8fCB1bmRlZmluZWQsXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbGVhck9sZFZlcnNpb25Db29raWVWYWx1ZShjb25maWc6IFNlY3VyaXR5UGx1Z2luQ29uZmlnVHlwZSk6IHN0cmluZyB7XG4gIGlmIChjb25maWcuY29va2llLnNlY3VyZSkge1xuICAgIHJldHVybiAnc2VjdXJpdHlfYXV0aGVudGljYXRpb249OyBNYXgtQWdlPTA7IEV4cGlyZXM9VGh1LCAwMSBKYW4gMTk3MCAwMDowMDowMCBHTVQ7IFNlY3VyZTsgSHR0cE9ubHk7IFBhdGg9Lyc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICdzZWN1cml0eV9hdXRoZW50aWNhdGlvbj07IE1heC1BZ2U9MDsgRXhwaXJlcz1UaHUsIDAxIEphbiAxOTcwIDAwOjAwOjAwIEdNVDsgSHR0cE9ubHk7IFBhdGg9Lyc7XG4gIH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBaUNPLFNBQVNBLHdCQUF3QkEsQ0FDdENDLE1BQWdDLEVBQ29CO0VBQ3BELE9BQU87SUFDTEMsSUFBSSxFQUFFRCxNQUFNLENBQUNFLE1BQU0sQ0FBQ0QsSUFBSTtJQUN4QkUsYUFBYSxFQUFFSCxNQUFNLENBQUNFLE1BQU0sQ0FBQ0UsUUFBUTtJQUNyQ0MsUUFBUSxFQUFHQyxjQUErRCxJQUFLO01BQzdFQSxjQUFjLEdBQUdBLGNBQXVDO01BQ3hELElBQUlBLGNBQWMsS0FBS0MsU0FBUyxFQUFFO1FBQ2hDLE9BQU87VUFBRUMsT0FBTyxFQUFFLEtBQUs7VUFBRUMsSUFBSSxFQUFFO1FBQUksQ0FBQztNQUN0Qzs7TUFFQTtNQUNBO01BQ0E7TUFDQSxJQUFJSCxjQUFjLENBQUNJLElBQUksSUFBSUosY0FBYyxDQUFDSSxJQUFJLENBQUNDLFNBQVMsSUFBSUwsY0FBYyxDQUFDSSxJQUFJLENBQUNFLE9BQU8sRUFBRTtRQUN2RixPQUFPO1VBQUVKLE9BQU8sRUFBRSxJQUFJO1VBQUVDLElBQUksRUFBRTtRQUFJLENBQUM7TUFDckM7O01BRUE7TUFDQSxJQUFJSCxjQUFjLENBQUNPLElBQUksRUFBRTtRQUN2QixPQUFPO1VBQUVMLE9BQU8sRUFBRSxJQUFJO1VBQUVDLElBQUksRUFBRTtRQUFJLENBQUM7TUFDckM7TUFFQSxJQUFJSCxjQUFjLENBQUNRLFVBQVUsS0FBS1AsU0FBUyxJQUFJRCxjQUFjLENBQUNRLFVBQVUsR0FBR0MsSUFBSSxDQUFDQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQ3JGLE9BQU87VUFBRVIsT0FBTyxFQUFFLEtBQUs7VUFBRUMsSUFBSSxFQUFFO1FBQUksQ0FBQztNQUN0QztNQUNBLE9BQU87UUFBRUQsT0FBTyxFQUFFLElBQUk7UUFBRUMsSUFBSSxFQUFFO01BQUksQ0FBQztJQUNyQyxDQUFDO0lBQ0RRLFFBQVEsRUFBRWpCLE1BQU0sQ0FBQ0UsTUFBTSxDQUFDZ0IsTUFBTTtJQUM5QkMsUUFBUSxFQUFFbkIsTUFBTSxDQUFDRSxNQUFNLENBQUNrQixVQUFVLElBQUliO0VBQ3hDLENBQUM7QUFDSDtBQUVPLFNBQVNjLDBCQUEwQkEsQ0FBQ3JCLE1BQWdDLEVBQVU7RUFDbkYsSUFBSUEsTUFBTSxDQUFDRSxNQUFNLENBQUNnQixNQUFNLEVBQUU7SUFDeEIsT0FBTyxzR0FBc0c7RUFDL0csQ0FBQyxNQUFNO0lBQ0wsT0FBTyw4RkFBOEY7RUFDdkc7QUFDRiJ9