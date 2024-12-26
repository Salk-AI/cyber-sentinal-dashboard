"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsValidator = void 0;
var _path = _interopRequireDefault(require("path"));
var _fileSize = require("./file-size");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class SettingsValidator {
  /**
   * Create a function that is a composition of the input validations
   * @param functions SettingsValidator functions to compose
   * @returns composed validation
   */
  static compose(...functions) {
    return function composedValidation(value) {
      for (const fn of functions) {
        const result = fn(value);
        if (typeof result === 'string' && result.length > 0) {
          return result;
        }
      }
    };
  }

  /**
   * Check the value is a string
   * @param value
   * @returns
   */
  static isString(value) {
    return typeof value === 'string' ? undefined : 'Value is not a string.';
  }

  /**
   * Check the string has no spaces
   * @param value
   * @returns
   */
  static hasNoSpaces(value) {
    return /^\S*$/.test(value) ? undefined : 'No whitespaces allowed.';
  }

  /**
   * Check the string has no empty
   * @param value
   * @returns
   */
  static isNotEmptyString(value) {
    if (typeof value === 'string') {
      if (value.length === 0) {
        return 'Value can not be empty.';
      } else {
        return undefined;
      }
    }
  }

  /**
   * Check the number of string lines is limited
   * @param options
   * @returns
   */
  static multipleLinesString(options = {}) {
    return function (value) {
      const lines = value.split(/\r\n|\r|\n/).length;
      if (typeof options.maxLength !== 'undefined' && value.split('\n').some(line => line.length > options.maxLength)) {
        return `The maximum length of a line is ${options.maxLength} characters.`;
      }
      if (typeof options.minRows !== 'undefined' && lines < options.minRows) {
        return `The string should have more or ${options.minRows} line/s.`;
      }
      if (typeof options.maxRows !== 'undefined' && lines > options.maxRows) {
        return `The string should have less or equal to ${options.maxRows} line/s.`;
      }
    };
  }

  /**
   * Creates a function that checks the string does not contain some characters
   * @param invalidCharacters
   * @returns
   */
  static hasNotInvalidCharacters(...invalidCharacters) {
    return function (value) {
      return invalidCharacters.some(invalidCharacter => value.includes(invalidCharacter)) ? `It can't contain invalid characters: ${invalidCharacters.join(', ')}.` : undefined;
    };
  }

  /**
   * Creates a function that checks the string does not start with a substring
   * @param invalidStartingCharacters
   * @returns
   */
  static noStartsWithString(...invalidStartingCharacters) {
    return function (value) {
      return invalidStartingCharacters.some(invalidStartingCharacter => value.startsWith(invalidStartingCharacter)) ? `It can't start with: ${invalidStartingCharacters.join(', ')}.` : undefined;
    };
  }

  /**
   * Creates a function that checks the string is not equals to some values
   * @param invalidLiterals
   * @returns
   */
  static noLiteralString(...invalidLiterals) {
    return function (value) {
      return invalidLiterals.some(invalidLiteral => value === invalidLiteral) ? `It can't be: ${invalidLiterals.join(', ')}.` : undefined;
    };
  }

  /**
   * Check the value is a boolean
   * @param value
   * @returns
   */
  static isBoolean(value) {
    return typeof value === 'boolean' ? undefined : 'It should be a boolean. Allowed values: true or false.';
  }

  /**
   * Check the value is a number
   * @param value
   * @returns
   */
  static isNumber(value) {
    return typeof value === 'number' ? undefined : 'Value is not a number.';
  }

  /**
   * Check the value is a number between some optional limits
   * @param options
   * @returns
   */
  static number(options = {}) {
    return function (value) {
      if (typeof value !== 'number') {
        return 'Value is not a number.';
      }
      if (options.integer && !Number.isInteger(Number(value))) {
        return 'Number should be an integer.';
      }
      if (typeof options.min !== 'undefined' && value < options.min) {
        return `Value should be greater or equal than ${options.min}.`;
      }
      if (typeof options.max !== 'undefined' && value > options.max) {
        return `Value should be lower or equal than ${options.max}.`;
      }
    };
  }

  /**
   * Creates a function that checks if the value is a json
   * @param validateParsed Optional parameter to validate the parsed object
   * @returns
   */
  static json(validateParsed) {
    return function (value) {
      let jsonObject;
      // Try to parse the string as JSON
      try {
        jsonObject = JSON.parse(value);
      } catch (error) {
        return "Value can't be parsed. There is some error.";
      }
      return validateParsed ? validateParsed(jsonObject) : undefined;
    };
  }

  /**
   * Creates a function that checks is the value is an array and optionally validates each element
   * @param validationElement Optional function to validate each element of the array
   * @returns
   */
  static array(validationElement) {
    return function (value) {
      // Check the JSON is an array
      if (!Array.isArray(value)) {
        return 'Value is not a valid list.';
      }
      return validationElement ? value.reduce((accum, elementValue) => {
        if (accum) {
          return accum;
        }
        const resultValidationElement = validationElement(elementValue);
        if (resultValidationElement) {
          return resultValidationElement;
        }
        return accum;
      }, undefined) : undefined;
    };
  }

  /**
   * Creates a function that checks if the value is equal to list of values
   * @param literals Array of values to compare
   * @returns
   */
  static literal(literals) {
    return function (value) {
      return literals.includes(value) ? undefined : `Invalid value. Allowed values: ${literals.map(String).join(', ')}.`;
    };
  }

  // FilePicker

  //IPv4: This is a set of four numbers, for example, 192.158.1.38. Each number in the set can range from 0 to 255. Therefore, the full range of IP addresses goes from 0.0.0.0 to 255.255.255.255
  //IPv6: This is a set or eight hexadecimal expressions, each from 0000 to FFFF. 2001:0db8:85a3:0000:0000:8a2e:0370:7334

  // FQDN: Maximum of 63 characters per label.
  // Can only contain numbers, letters and hyphens (-)
  // Labels cannot begin or end with a hyphen
  // Currently supports multilingual characters, i.e. letters not included in the English alphabet: e.g. á é í ó ú ü ñ.
  // Minimum 3 labels
  // A label can contain only numbers
  // Hostname: Maximum of 63 characters per label. Same rules as FQDN apply.
  static serverAddressHostnameFQDNIPv4IPv6(value) {
    const isFQDNOrHostname = /^(?!-)(?!.*--)[a-zA-Z0-9áéíóúüñ-]{0,62}[a-zA-Z0-9áéíóúüñ](?:\.[a-zA-Z0-9áéíóúüñ-]{0,62}[a-zA-Z0-9áéíóúüñ]){0,}$/;
    const isIPv6 = /^(?:[0-9a-fA-F]{4}:){7}[0-9a-fA-F]{4}$/;
    if (value.length > 255 || value.length > 0 && !isFQDNOrHostname.test(value) && !isIPv6.test(value)) {
      return 'It should be a valid hostname, FQDN, IPv4 or uncompressed IPv6';
    }
    return undefined;
  }
}
exports.SettingsValidator = SettingsValidator;
_defineProperty(SettingsValidator, "filePickerSupportedExtensions", extensions => options => {
  if (typeof options === 'undefined' || typeof options.name === 'undefined') {
    return;
  }
  if (!extensions.includes(_path.default.extname(options.name))) {
    return `File extension is invalid. Allowed file extensions: ${extensions.join(', ')}.`;
  }
});
/**
 * filePickerFileSize
 * @param options
 */
_defineProperty(SettingsValidator, "filePickerFileSize", options => value => {
  if (typeof value === 'undefined' || typeof value.size === 'undefined') {
    return;
  }
  if (typeof options.minBytes !== 'undefined' && value.size <= options.minBytes) {
    return `File size should be greater or equal than ${options.meaningfulUnit ? (0, _fileSize.formatBytes)(options.minBytes) : `${options.minBytes} bytes`}.`;
  }
  if (typeof options.maxBytes !== 'undefined' && value.size >= options.maxBytes) {
    return `File size should be lower or equal than ${options.meaningfulUnit ? (0, _fileSize.formatBytes)(options.maxBytes) : `${options.maxBytes} bytes`}.`;
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfcGF0aCIsIl9pbnRlcm9wUmVxdWlyZURlZmF1bHQiLCJyZXF1aXJlIiwiX2ZpbGVTaXplIiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJfZGVmaW5lUHJvcGVydHkiLCJrZXkiLCJ2YWx1ZSIsIl90b1Byb3BlcnR5S2V5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJhcmciLCJfdG9QcmltaXRpdmUiLCJTdHJpbmciLCJpbnB1dCIsImhpbnQiLCJwcmltIiwiU3ltYm9sIiwidG9QcmltaXRpdmUiLCJ1bmRlZmluZWQiLCJyZXMiLCJjYWxsIiwiVHlwZUVycm9yIiwiTnVtYmVyIiwiU2V0dGluZ3NWYWxpZGF0b3IiLCJjb21wb3NlIiwiZnVuY3Rpb25zIiwiY29tcG9zZWRWYWxpZGF0aW9uIiwiZm4iLCJyZXN1bHQiLCJsZW5ndGgiLCJpc1N0cmluZyIsImhhc05vU3BhY2VzIiwidGVzdCIsImlzTm90RW1wdHlTdHJpbmciLCJtdWx0aXBsZUxpbmVzU3RyaW5nIiwib3B0aW9ucyIsImxpbmVzIiwic3BsaXQiLCJtYXhMZW5ndGgiLCJzb21lIiwibGluZSIsIm1pblJvd3MiLCJtYXhSb3dzIiwiaGFzTm90SW52YWxpZENoYXJhY3RlcnMiLCJpbnZhbGlkQ2hhcmFjdGVycyIsImludmFsaWRDaGFyYWN0ZXIiLCJpbmNsdWRlcyIsImpvaW4iLCJub1N0YXJ0c1dpdGhTdHJpbmciLCJpbnZhbGlkU3RhcnRpbmdDaGFyYWN0ZXJzIiwiaW52YWxpZFN0YXJ0aW5nQ2hhcmFjdGVyIiwic3RhcnRzV2l0aCIsIm5vTGl0ZXJhbFN0cmluZyIsImludmFsaWRMaXRlcmFscyIsImludmFsaWRMaXRlcmFsIiwiaXNCb29sZWFuIiwiaXNOdW1iZXIiLCJudW1iZXIiLCJpbnRlZ2VyIiwiaXNJbnRlZ2VyIiwibWluIiwibWF4IiwianNvbiIsInZhbGlkYXRlUGFyc2VkIiwianNvbk9iamVjdCIsIkpTT04iLCJwYXJzZSIsImVycm9yIiwiYXJyYXkiLCJ2YWxpZGF0aW9uRWxlbWVudCIsIkFycmF5IiwiaXNBcnJheSIsInJlZHVjZSIsImFjY3VtIiwiZWxlbWVudFZhbHVlIiwicmVzdWx0VmFsaWRhdGlvbkVsZW1lbnQiLCJsaXRlcmFsIiwibGl0ZXJhbHMiLCJtYXAiLCJzZXJ2ZXJBZGRyZXNzSG9zdG5hbWVGUUROSVB2NElQdjYiLCJpc0ZRRE5Pckhvc3RuYW1lIiwiaXNJUHY2IiwiZXhwb3J0cyIsImV4dGVuc2lvbnMiLCJuYW1lIiwicGF0aCIsImV4dG5hbWUiLCJzaXplIiwibWluQnl0ZXMiLCJtZWFuaW5nZnVsVW5pdCIsImZvcm1hdEJ5dGVzIiwibWF4Qnl0ZXMiXSwic291cmNlcyI6WyJzZXR0aW5ncy12YWxpZGF0b3IudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBmb3JtYXRCeXRlcyB9IGZyb20gJy4vZmlsZS1zaXplJztcblxuZXhwb3J0IGNsYXNzIFNldHRpbmdzVmFsaWRhdG9yIHtcbiAgLyoqXG4gICAqIENyZWF0ZSBhIGZ1bmN0aW9uIHRoYXQgaXMgYSBjb21wb3NpdGlvbiBvZiB0aGUgaW5wdXQgdmFsaWRhdGlvbnNcbiAgICogQHBhcmFtIGZ1bmN0aW9ucyBTZXR0aW5nc1ZhbGlkYXRvciBmdW5jdGlvbnMgdG8gY29tcG9zZVxuICAgKiBAcmV0dXJucyBjb21wb3NlZCB2YWxpZGF0aW9uXG4gICAqL1xuICBzdGF0aWMgY29tcG9zZSguLi5mdW5jdGlvbnMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gY29tcG9zZWRWYWxpZGF0aW9uKHZhbHVlKSB7XG4gICAgICBmb3IgKGNvbnN0IGZuIG9mIGZ1bmN0aW9ucykge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBmbih2YWx1ZSk7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzdWx0ID09PSAnc3RyaW5nJyAmJiByZXN1bHQubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHRoZSB2YWx1ZSBpcyBhIHN0cmluZ1xuICAgKiBAcGFyYW0gdmFsdWVcbiAgICogQHJldHVybnNcbiAgICovXG4gIHN0YXRpYyBpc1N0cmluZyh2YWx1ZTogdW5rbm93bik6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgPyB1bmRlZmluZWQgOiAnVmFsdWUgaXMgbm90IGEgc3RyaW5nLic7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgdGhlIHN0cmluZyBoYXMgbm8gc3BhY2VzXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgc3RhdGljIGhhc05vU3BhY2VzKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiAvXlxcUyokLy50ZXN0KHZhbHVlKSA/IHVuZGVmaW5lZCA6ICdObyB3aGl0ZXNwYWNlcyBhbGxvd2VkLic7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgdGhlIHN0cmluZyBoYXMgbm8gZW1wdHlcbiAgICogQHBhcmFtIHZhbHVlXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBzdGF0aWMgaXNOb3RFbXB0eVN0cmluZyh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gJ1ZhbHVlIGNhbiBub3QgYmUgZW1wdHkuJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHRoZSBudW1iZXIgb2Ygc3RyaW5nIGxpbmVzIGlzIGxpbWl0ZWRcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICogQHJldHVybnNcbiAgICovXG4gIHN0YXRpYyBtdWx0aXBsZUxpbmVzU3RyaW5nKFxuICAgIG9wdGlvbnM6IHsgbWluUm93cz86IG51bWJlcjsgbWF4Um93cz86IG51bWJlcjsgbWF4TGVuZ3RoPzogbnVtYmVyIH0gPSB7fSxcbiAgKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICBjb25zdCBsaW5lcyA9IHZhbHVlLnNwbGl0KC9cXHJcXG58XFxyfFxcbi8pLmxlbmd0aDtcbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIG9wdGlvbnMubWF4TGVuZ3RoICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB2YWx1ZS5zcGxpdCgnXFxuJykuc29tZShsaW5lID0+IGxpbmUubGVuZ3RoID4gb3B0aW9ucy5tYXhMZW5ndGgpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGBUaGUgbWF4aW11bSBsZW5ndGggb2YgYSBsaW5lIGlzICR7b3B0aW9ucy5tYXhMZW5ndGh9IGNoYXJhY3RlcnMuYDtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5taW5Sb3dzICE9PSAndW5kZWZpbmVkJyAmJiBsaW5lcyA8IG9wdGlvbnMubWluUm93cykge1xuICAgICAgICByZXR1cm4gYFRoZSBzdHJpbmcgc2hvdWxkIGhhdmUgbW9yZSBvciAke29wdGlvbnMubWluUm93c30gbGluZS9zLmA7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMubWF4Um93cyAhPT0gJ3VuZGVmaW5lZCcgJiYgbGluZXMgPiBvcHRpb25zLm1heFJvd3MpIHtcbiAgICAgICAgcmV0dXJuIGBUaGUgc3RyaW5nIHNob3VsZCBoYXZlIGxlc3Mgb3IgZXF1YWwgdG8gJHtvcHRpb25zLm1heFJvd3N9IGxpbmUvcy5gO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIHRoZSBzdHJpbmcgZG9lcyBub3QgY29udGFpbiBzb21lIGNoYXJhY3RlcnNcbiAgICogQHBhcmFtIGludmFsaWRDaGFyYWN0ZXJzXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBzdGF0aWMgaGFzTm90SW52YWxpZENoYXJhY3RlcnMoLi4uaW52YWxpZENoYXJhY3RlcnM6IHN0cmluZ1tdKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgIHJldHVybiBpbnZhbGlkQ2hhcmFjdGVycy5zb21lKGludmFsaWRDaGFyYWN0ZXIgPT5cbiAgICAgICAgdmFsdWUuaW5jbHVkZXMoaW52YWxpZENoYXJhY3RlciksXG4gICAgICApXG4gICAgICAgID8gYEl0IGNhbid0IGNvbnRhaW4gaW52YWxpZCBjaGFyYWN0ZXJzOiAke2ludmFsaWRDaGFyYWN0ZXJzLmpvaW4oXG4gICAgICAgICAgICAnLCAnLFxuICAgICAgICAgICl9LmBcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBjaGVja3MgdGhlIHN0cmluZyBkb2VzIG5vdCBzdGFydCB3aXRoIGEgc3Vic3RyaW5nXG4gICAqIEBwYXJhbSBpbnZhbGlkU3RhcnRpbmdDaGFyYWN0ZXJzXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBzdGF0aWMgbm9TdGFydHNXaXRoU3RyaW5nKC4uLmludmFsaWRTdGFydGluZ0NoYXJhY3RlcnM6IHN0cmluZ1tdKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgIHJldHVybiBpbnZhbGlkU3RhcnRpbmdDaGFyYWN0ZXJzLnNvbWUoaW52YWxpZFN0YXJ0aW5nQ2hhcmFjdGVyID0+XG4gICAgICAgIHZhbHVlLnN0YXJ0c1dpdGgoaW52YWxpZFN0YXJ0aW5nQ2hhcmFjdGVyKSxcbiAgICAgIClcbiAgICAgICAgPyBgSXQgY2FuJ3Qgc3RhcnQgd2l0aDogJHtpbnZhbGlkU3RhcnRpbmdDaGFyYWN0ZXJzLmpvaW4oJywgJyl9LmBcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBjaGVja3MgdGhlIHN0cmluZyBpcyBub3QgZXF1YWxzIHRvIHNvbWUgdmFsdWVzXG4gICAqIEBwYXJhbSBpbnZhbGlkTGl0ZXJhbHNcbiAgICogQHJldHVybnNcbiAgICovXG4gIHN0YXRpYyBub0xpdGVyYWxTdHJpbmcoLi4uaW52YWxpZExpdGVyYWxzOiBzdHJpbmdbXSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWU6IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICByZXR1cm4gaW52YWxpZExpdGVyYWxzLnNvbWUoaW52YWxpZExpdGVyYWwgPT4gdmFsdWUgPT09IGludmFsaWRMaXRlcmFsKVxuICAgICAgICA/IGBJdCBjYW4ndCBiZTogJHtpbnZhbGlkTGl0ZXJhbHMuam9pbignLCAnKX0uYFxuICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHRoZSB2YWx1ZSBpcyBhIGJvb2xlYW5cbiAgICogQHBhcmFtIHZhbHVlXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBzdGF0aWMgaXNCb29sZWFuKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJ1xuICAgICAgPyB1bmRlZmluZWRcbiAgICAgIDogJ0l0IHNob3VsZCBiZSBhIGJvb2xlYW4uIEFsbG93ZWQgdmFsdWVzOiB0cnVlIG9yIGZhbHNlLic7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgdGhlIHZhbHVlIGlzIGEgbnVtYmVyXG4gICAqIEBwYXJhbSB2YWx1ZVxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgc3RhdGljIGlzTnVtYmVyKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInID8gdW5kZWZpbmVkIDogJ1ZhbHVlIGlzIG5vdCBhIG51bWJlci4nO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHRoZSB2YWx1ZSBpcyBhIG51bWJlciBiZXR3ZWVuIHNvbWUgb3B0aW9uYWwgbGltaXRzXG4gICAqIEBwYXJhbSBvcHRpb25zXG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBzdGF0aWMgbnVtYmVyKFxuICAgIG9wdGlvbnM6IHsgbWluPzogbnVtYmVyOyBtYXg/OiBudW1iZXI7IGludGVnZXI/OiBib29sZWFuIH0gPSB7fSxcbiAgKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gJ1ZhbHVlIGlzIG5vdCBhIG51bWJlci4nO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5pbnRlZ2VyICYmICFOdW1iZXIuaXNJbnRlZ2VyKE51bWJlcih2YWx1ZSkpKSB7XG4gICAgICAgIHJldHVybiAnTnVtYmVyIHNob3VsZCBiZSBhbiBpbnRlZ2VyLic7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5taW4gIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIDwgb3B0aW9ucy5taW4pIHtcbiAgICAgICAgcmV0dXJuIGBWYWx1ZSBzaG91bGQgYmUgZ3JlYXRlciBvciBlcXVhbCB0aGFuICR7b3B0aW9ucy5taW59LmA7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMubWF4ICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSA+IG9wdGlvbnMubWF4KSB7XG4gICAgICAgIHJldHVybiBgVmFsdWUgc2hvdWxkIGJlIGxvd2VyIG9yIGVxdWFsIHRoYW4gJHtvcHRpb25zLm1heH0uYDtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGNoZWNrcyBpZiB0aGUgdmFsdWUgaXMgYSBqc29uXG4gICAqIEBwYXJhbSB2YWxpZGF0ZVBhcnNlZCBPcHRpb25hbCBwYXJhbWV0ZXIgdG8gdmFsaWRhdGUgdGhlIHBhcnNlZCBvYmplY3RcbiAgICogQHJldHVybnNcbiAgICovXG4gIHN0YXRpYyBqc29uKHZhbGlkYXRlUGFyc2VkOiAob2JqZWN0OiBhbnkpID0+IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWU6IHN0cmluZykge1xuICAgICAgbGV0IGpzb25PYmplY3Q7XG4gICAgICAvLyBUcnkgdG8gcGFyc2UgdGhlIHN0cmluZyBhcyBKU09OXG4gICAgICB0cnkge1xuICAgICAgICBqc29uT2JqZWN0ID0gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICByZXR1cm4gXCJWYWx1ZSBjYW4ndCBiZSBwYXJzZWQuIFRoZXJlIGlzIHNvbWUgZXJyb3IuXCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWxpZGF0ZVBhcnNlZCA/IHZhbGlkYXRlUGFyc2VkKGpzb25PYmplY3QpIDogdW5kZWZpbmVkO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGlzIHRoZSB2YWx1ZSBpcyBhbiBhcnJheSBhbmQgb3B0aW9uYWxseSB2YWxpZGF0ZXMgZWFjaCBlbGVtZW50XG4gICAqIEBwYXJhbSB2YWxpZGF0aW9uRWxlbWVudCBPcHRpb25hbCBmdW5jdGlvbiB0byB2YWxpZGF0ZSBlYWNoIGVsZW1lbnQgb2YgdGhlIGFycmF5XG4gICAqIEByZXR1cm5zXG4gICAqL1xuICBzdGF0aWMgYXJyYXkodmFsaWRhdGlvbkVsZW1lbnQ6IChqc29uOiBhbnkpID0+IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWU6IHVua25vd25bXSkge1xuICAgICAgLy8gQ2hlY2sgdGhlIEpTT04gaXMgYW4gYXJyYXlcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuICdWYWx1ZSBpcyBub3QgYSB2YWxpZCBsaXN0Lic7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB2YWxpZGF0aW9uRWxlbWVudFxuICAgICAgICA/IHZhbHVlLnJlZHVjZSgoYWNjdW0sIGVsZW1lbnRWYWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGFjY3VtKSB7XG4gICAgICAgICAgICAgIHJldHVybiBhY2N1bTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgcmVzdWx0VmFsaWRhdGlvbkVsZW1lbnQgPSB2YWxpZGF0aW9uRWxlbWVudChlbGVtZW50VmFsdWUpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdFZhbGlkYXRpb25FbGVtZW50KSB7XG4gICAgICAgICAgICAgIHJldHVybiByZXN1bHRWYWxpZGF0aW9uRWxlbWVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGFjY3VtO1xuICAgICAgICAgIH0sIHVuZGVmaW5lZClcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBjaGVja3MgaWYgdGhlIHZhbHVlIGlzIGVxdWFsIHRvIGxpc3Qgb2YgdmFsdWVzXG4gICAqIEBwYXJhbSBsaXRlcmFscyBBcnJheSBvZiB2YWx1ZXMgdG8gY29tcGFyZVxuICAgKiBAcmV0dXJuc1xuICAgKi9cbiAgc3RhdGljIGxpdGVyYWwobGl0ZXJhbHM6IHVua25vd25bXSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodmFsdWU6IGFueSk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICByZXR1cm4gbGl0ZXJhbHMuaW5jbHVkZXModmFsdWUpXG4gICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgIDogYEludmFsaWQgdmFsdWUuIEFsbG93ZWQgdmFsdWVzOiAke2xpdGVyYWxzLm1hcChTdHJpbmcpLmpvaW4oJywgJyl9LmA7XG4gICAgfTtcbiAgfVxuXG4gIC8vIEZpbGVQaWNrZXJcbiAgc3RhdGljIGZpbGVQaWNrZXJTdXBwb3J0ZWRFeHRlbnNpb25zID1cbiAgICAoZXh0ZW5zaW9uczogc3RyaW5nW10pID0+IChvcHRpb25zOiB7IG5hbWU6IHN0cmluZyB9KSA9PiB7XG4gICAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBvcHRpb25zID09PSAndW5kZWZpbmVkJyB8fFxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5uYW1lID09PSAndW5kZWZpbmVkJ1xuICAgICAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghZXh0ZW5zaW9ucy5pbmNsdWRlcyhwYXRoLmV4dG5hbWUob3B0aW9ucy5uYW1lKSkpIHtcbiAgICAgICAgcmV0dXJuIGBGaWxlIGV4dGVuc2lvbiBpcyBpbnZhbGlkLiBBbGxvd2VkIGZpbGUgZXh0ZW5zaW9uczogJHtleHRlbnNpb25zLmpvaW4oXG4gICAgICAgICAgJywgJyxcbiAgICAgICAgKX0uYDtcbiAgICAgIH1cbiAgICB9O1xuXG4gIC8qKlxuICAgKiBmaWxlUGlja2VyRmlsZVNpemVcbiAgICogQHBhcmFtIG9wdGlvbnNcbiAgICovXG4gIHN0YXRpYyBmaWxlUGlja2VyRmlsZVNpemUgPVxuICAgIChvcHRpb25zOiB7XG4gICAgICBtYXhCeXRlcz86IG51bWJlcjtcbiAgICAgIG1pbkJ5dGVzPzogbnVtYmVyO1xuICAgICAgbWVhbmluZ2Z1bFVuaXQ/OiBib29sZWFuO1xuICAgIH0pID0+XG4gICAgKHZhbHVlOiB7IHNpemU6IG51bWJlciB9KSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgdmFsdWUuc2l6ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5taW5CeXRlcyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgdmFsdWUuc2l6ZSA8PSBvcHRpb25zLm1pbkJ5dGVzXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGBGaWxlIHNpemUgc2hvdWxkIGJlIGdyZWF0ZXIgb3IgZXF1YWwgdGhhbiAke1xuICAgICAgICAgIG9wdGlvbnMubWVhbmluZ2Z1bFVuaXRcbiAgICAgICAgICAgID8gZm9ybWF0Qnl0ZXMob3B0aW9ucy5taW5CeXRlcylcbiAgICAgICAgICAgIDogYCR7b3B0aW9ucy5taW5CeXRlc30gYnl0ZXNgXG4gICAgICAgIH0uYDtcbiAgICAgIH1cbiAgICAgIGlmIChcbiAgICAgICAgdHlwZW9mIG9wdGlvbnMubWF4Qnl0ZXMgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHZhbHVlLnNpemUgPj0gb3B0aW9ucy5tYXhCeXRlc1xuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBgRmlsZSBzaXplIHNob3VsZCBiZSBsb3dlciBvciBlcXVhbCB0aGFuICR7XG4gICAgICAgICAgb3B0aW9ucy5tZWFuaW5nZnVsVW5pdFxuICAgICAgICAgICAgPyBmb3JtYXRCeXRlcyhvcHRpb25zLm1heEJ5dGVzKVxuICAgICAgICAgICAgOiBgJHtvcHRpb25zLm1heEJ5dGVzfSBieXRlc2BcbiAgICAgICAgfS5gO1xuICAgICAgfVxuICAgIH07XG5cbiAgLy9JUHY0OiBUaGlzIGlzIGEgc2V0IG9mIGZvdXIgbnVtYmVycywgZm9yIGV4YW1wbGUsIDE5Mi4xNTguMS4zOC4gRWFjaCBudW1iZXIgaW4gdGhlIHNldCBjYW4gcmFuZ2UgZnJvbSAwIHRvIDI1NS4gVGhlcmVmb3JlLCB0aGUgZnVsbCByYW5nZSBvZiBJUCBhZGRyZXNzZXMgZ29lcyBmcm9tIDAuMC4wLjAgdG8gMjU1LjI1NS4yNTUuMjU1XG4gIC8vSVB2NjogVGhpcyBpcyBhIHNldCBvciBlaWdodCBoZXhhZGVjaW1hbCBleHByZXNzaW9ucywgZWFjaCBmcm9tIDAwMDAgdG8gRkZGRi4gMjAwMTowZGI4Ojg1YTM6MDAwMDowMDAwOjhhMmU6MDM3MDo3MzM0XG5cbiAgLy8gRlFETjogTWF4aW11bSBvZiA2MyBjaGFyYWN0ZXJzIHBlciBsYWJlbC5cbiAgLy8gQ2FuIG9ubHkgY29udGFpbiBudW1iZXJzLCBsZXR0ZXJzIGFuZCBoeXBoZW5zICgtKVxuICAvLyBMYWJlbHMgY2Fubm90IGJlZ2luIG9yIGVuZCB3aXRoIGEgaHlwaGVuXG4gIC8vIEN1cnJlbnRseSBzdXBwb3J0cyBtdWx0aWxpbmd1YWwgY2hhcmFjdGVycywgaS5lLiBsZXR0ZXJzIG5vdCBpbmNsdWRlZCBpbiB0aGUgRW5nbGlzaCBhbHBoYWJldDogZS5nLiDDoSDDqSDDrSDDsyDDuiDDvCDDsS5cbiAgLy8gTWluaW11bSAzIGxhYmVsc1xuICAvLyBBIGxhYmVsIGNhbiBjb250YWluIG9ubHkgbnVtYmVyc1xuXG4gIC8vIEhvc3RuYW1lOiBNYXhpbXVtIG9mIDYzIGNoYXJhY3RlcnMgcGVyIGxhYmVsLiBTYW1lIHJ1bGVzIGFzIEZRRE4gYXBwbHkuXG5cbiAgc3RhdGljIHNlcnZlckFkZHJlc3NIb3N0bmFtZUZRRE5JUHY0SVB2Nih2YWx1ZTogc3RyaW5nKSB7XG4gICAgY29uc3QgaXNGUUROT3JIb3N0bmFtZSA9XG4gICAgICAvXig/IS0pKD8hLiotLSlbYS16QS1aMC05w6HDqcOtw7PDusO8w7EtXXswLDYyfVthLXpBLVowLTnDocOpw63Ds8O6w7zDsV0oPzpcXC5bYS16QS1aMC05w6HDqcOtw7PDusO8w7EtXXswLDYyfVthLXpBLVowLTnDocOpw63Ds8O6w7zDsV0pezAsfSQvO1xuICAgIGNvbnN0IGlzSVB2NiA9IC9eKD86WzAtOWEtZkEtRl17NH06KXs3fVswLTlhLWZBLUZdezR9JC87XG5cbiAgICBpZiAoXG4gICAgICB2YWx1ZS5sZW5ndGggPiAyNTUgfHxcbiAgICAgICh2YWx1ZS5sZW5ndGggPiAwICYmICFpc0ZRRE5Pckhvc3RuYW1lLnRlc3QodmFsdWUpICYmICFpc0lQdjYudGVzdCh2YWx1ZSkpXG4gICAgKSB7XG4gICAgICByZXR1cm4gJ0l0IHNob3VsZCBiZSBhIHZhbGlkIGhvc3RuYW1lLCBGUUROLCBJUHY0IG9yIHVuY29tcHJlc3NlZCBJUHY2JztcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFBQSxLQUFBLEdBQUFDLHNCQUFBLENBQUFDLE9BQUE7QUFDQSxJQUFBQyxTQUFBLEdBQUFELE9BQUE7QUFBMEMsU0FBQUQsdUJBQUFHLEdBQUEsV0FBQUEsR0FBQSxJQUFBQSxHQUFBLENBQUFDLFVBQUEsR0FBQUQsR0FBQSxLQUFBRSxPQUFBLEVBQUFGLEdBQUE7QUFBQSxTQUFBRyxnQkFBQUgsR0FBQSxFQUFBSSxHQUFBLEVBQUFDLEtBQUEsSUFBQUQsR0FBQSxHQUFBRSxjQUFBLENBQUFGLEdBQUEsT0FBQUEsR0FBQSxJQUFBSixHQUFBLElBQUFPLE1BQUEsQ0FBQUMsY0FBQSxDQUFBUixHQUFBLEVBQUFJLEdBQUEsSUFBQUMsS0FBQSxFQUFBQSxLQUFBLEVBQUFJLFVBQUEsUUFBQUMsWUFBQSxRQUFBQyxRQUFBLG9CQUFBWCxHQUFBLENBQUFJLEdBQUEsSUFBQUMsS0FBQSxXQUFBTCxHQUFBO0FBQUEsU0FBQU0sZUFBQU0sR0FBQSxRQUFBUixHQUFBLEdBQUFTLFlBQUEsQ0FBQUQsR0FBQSwyQkFBQVIsR0FBQSxnQkFBQUEsR0FBQSxHQUFBVSxNQUFBLENBQUFWLEdBQUE7QUFBQSxTQUFBUyxhQUFBRSxLQUFBLEVBQUFDLElBQUEsZUFBQUQsS0FBQSxpQkFBQUEsS0FBQSxrQkFBQUEsS0FBQSxNQUFBRSxJQUFBLEdBQUFGLEtBQUEsQ0FBQUcsTUFBQSxDQUFBQyxXQUFBLE9BQUFGLElBQUEsS0FBQUcsU0FBQSxRQUFBQyxHQUFBLEdBQUFKLElBQUEsQ0FBQUssSUFBQSxDQUFBUCxLQUFBLEVBQUFDLElBQUEsMkJBQUFLLEdBQUEsc0JBQUFBLEdBQUEsWUFBQUUsU0FBQSw0REFBQVAsSUFBQSxnQkFBQUYsTUFB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