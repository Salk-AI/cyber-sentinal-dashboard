"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFileExtensionFromBuffer = getFileExtensionFromBuffer;
/**
 * Get the file extension from a file buffer. Calculates the image format by reading the first 4 bytes of the image (header)
 * Supported types: jpeg, jpg, png, svg
 * Additionally, this function allows checking gif images.
 * @param buffer file buffer
 * @returns the file extension. Example: jpg, png, svg. it Returns unknown if it can not find the extension.
*/
function getFileExtensionFromBuffer(buffer) {
  const imageFormat = buffer.toString('hex').substring(0, 4);
  switch (imageFormat) {
    case '4749':
      return 'gif';
    case 'ffd8':
      return 'jpg';
    // Also jpeg
    case '8950':
      return 'png';
    case '3c73':
    case '3c3f':
      return 'svg';
    default:
      return 'unknown';
  }
}
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJnZXRGaWxlRXh0ZW5zaW9uRnJvbUJ1ZmZlciIsImJ1ZmZlciIsImltYWdlRm9ybWF0IiwidG9TdHJpbmciLCJzdWJzdHJpbmciXSwic291cmNlcyI6WyJmaWxlLWV4dGVuc2lvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEdldCB0aGUgZmlsZSBleHRlbnNpb24gZnJvbSBhIGZpbGUgYnVmZmVyLiBDYWxjdWxhdGVzIHRoZSBpbWFnZSBmb3JtYXQgYnkgcmVhZGluZyB0aGUgZmlyc3QgNCBieXRlcyBvZiB0aGUgaW1hZ2UgKGhlYWRlcilcbiAqIFN1cHBvcnRlZCB0eXBlczoganBlZywganBnLCBwbmcsIHN2Z1xuICogQWRkaXRpb25hbGx5LCB0aGlzIGZ1bmN0aW9uIGFsbG93cyBjaGVja2luZyBnaWYgaW1hZ2VzLlxuICogQHBhcmFtIGJ1ZmZlciBmaWxlIGJ1ZmZlclxuICogQHJldHVybnMgdGhlIGZpbGUgZXh0ZW5zaW9uLiBFeGFtcGxlOiBqcGcsIHBuZywgc3ZnLiBpdCBSZXR1cm5zIHVua25vd24gaWYgaXQgY2FuIG5vdCBmaW5kIHRoZSBleHRlbnNpb24uXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbGVFeHRlbnNpb25Gcm9tQnVmZmVyKGJ1ZmZlcjogQnVmZmVyKTogc3RyaW5nIHtcblx0Y29uc3QgaW1hZ2VGb3JtYXQgPSBidWZmZXIudG9TdHJpbmcoJ2hleCcpLnN1YnN0cmluZygwLCA0KTtcblx0c3dpdGNoIChpbWFnZUZvcm1hdCkge1xuXHRcdGNhc2UgJzQ3NDknOlxuXHRcdFx0cmV0dXJuICdnaWYnO1xuXHRcdGNhc2UgJ2ZmZDgnOlxuXHRcdFx0cmV0dXJuICdqcGcnOyAvLyBBbHNvIGpwZWdcblx0XHRjYXNlICc4OTUwJzpcblx0XHRcdHJldHVybiAncG5nJztcbiAgICBjYXNlICczYzczJzpcbiAgICBjYXNlICczYzNmJzpcblx0XHRcdHJldHVybiAnc3ZnJztcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuICd1bmtub3duJztcblx0fVxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxTQUFTQSwwQkFBMEJBLENBQUNDLE1BQWMsRUFBVTtFQUNsRSxNQUFNQyxXQUFXLEdBQUdELE1BQU0sQ0FBQ0UsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztFQUMxRCxRQUFRRixXQUFXO0lBQ2xCLEtBQUssTUFBTTtNQUNWLE9BQU8sS0FBSztJQUNiLEtBQUssTUFBTTtNQUNWLE9BQU8sS0FBSztJQUFFO0lBQ2YsS0FBSyxNQUFNO01BQ1YsT0FBTyxLQUFLO0lBQ1gsS0FBSyxNQUFNO0lBQ1gsS0FBSyxNQUFNO01BQ1osT0FBTyxLQUFLO0lBQ2I7TUFDQyxPQUFPLFNBQVM7RUFDbEI7QUFDRDtBQUFDIn0=