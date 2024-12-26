"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatLabelValuePair = formatLabelValuePair;
/**
 * Format the pair value-label to display the pair.
 * If label and the string of value are equals, only displays the value, if not, displays both.
 * @param value
 * @param label
 * @returns
 */
function formatLabelValuePair(label, value) {
  return label !== `${value}` ? `${value} (${label})` : `${value}`;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJmb3JtYXRMYWJlbFZhbHVlUGFpciIsImxhYmVsIiwidmFsdWUiXSwic291cmNlcyI6WyJzZXR0aW5ncy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEZvcm1hdCB0aGUgcGFpciB2YWx1ZS1sYWJlbCB0byBkaXNwbGF5IHRoZSBwYWlyLlxuICogSWYgbGFiZWwgYW5kIHRoZSBzdHJpbmcgb2YgdmFsdWUgYXJlIGVxdWFscywgb25seSBkaXNwbGF5cyB0aGUgdmFsdWUsIGlmIG5vdCwgZGlzcGxheXMgYm90aC5cbiAqIEBwYXJhbSB2YWx1ZVxuICogQHBhcmFtIGxhYmVsXG4gKiBAcmV0dXJuc1xuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0TGFiZWxWYWx1ZVBhaXIobGFiZWwsIHZhbHVlKSB7XG4gIHJldHVybiBsYWJlbCAhPT0gYCR7dmFsdWV9YCA/IGAke3ZhbHVlfSAoJHtsYWJlbH0pYCA6IGAke3ZhbHVlfWA7XG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sU0FBU0Esb0JBQW9CQSxDQUFDQyxLQUFLLEVBQUVDLEtBQUssRUFBRTtFQUNqRCxPQUFPRCxLQUFLLEtBQU0sR0FBRUMsS0FBTSxFQUFDLEdBQUksR0FBRUEsS0FBTSxLQUFJRCxLQUFNLEdBQUUsR0FBSSxHQUFFQyxLQUFNLEVBQUM7QUFDbEUifQ==