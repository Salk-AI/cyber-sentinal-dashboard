"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheTTL = void 0;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Cache based on time to live
 * The key where a set of data is stored can be:
 * - defined key
 * - serialize the data
 */
class CacheTTL {
  constructor(logger, config) {
    this.logger = logger;
    _defineProperty(this, "_cache", new Map());
    _defineProperty(this, "_config", void 0);
    this._config = {
      ttl: config.ttlSeconds * 1000
    };
    if (!this._config.ttl) {
      this.logger.warn('Cache time is disabled');
    }
    this.logger.debug('Init');
  }
  hasExpired(cacheKey) {
    var _this$_cache$get;
    return (((_this$_cache$get = this._cache.get(cacheKey)) === null || _this$_cache$get === void 0 ? void 0 : _this$_cache$get.expiredAt) || 0) < Date.now();
  }
  serializeDataToKey(data) {
    return JSON.stringify(data);
  }
  getKey(data, key) {
    return key || this.serializeDataToKey(data);
  }
  has(data, key) {
    const cacheKey = this.getKey(data, key);
    this.logger.debug(`Has key: [${cacheKey}]`);
    // Check if the cache key is cached
    if (!this._cache.has(cacheKey)) {
      return false;
    }
    // Check if the cache Key is expired
    if (this.hasExpired(cacheKey)) {
      // Remove the key
      this.remove(cacheKey);
      return false;
    }
    return true;
  }
  get(data, key) {
    var _this$_cache$get2;
    const cacheKey = this.getKey(data, key);
    this.logger.debug(`Get key: [${cacheKey}]`);
    return (_this$_cache$get2 = this._cache.get(cacheKey)) === null || _this$_cache$get2 === void 0 ? void 0 : _this$_cache$get2.value;
  }
  set(data, key) {
    const cacheKey = this.getKey(data, key);
    this.logger.debug(`Setting key: [${cacheKey}] with [${JSON.stringify(data)}]`);
    this._cache.set(cacheKey, {
      value: data,
      expiredAt: Date.now() + this._config.ttl
    });
    this.logger.debug(`Data set [${cacheKey}] with [${JSON.stringify(data)}]`);
    return this._cache;
  }
  remove(data, key) {
    const cacheKey = this.getKey(data, key);
    this.logger.debug(`Removing key: [${cacheKey}]`);
    this._cache.delete(cacheKey);
    this.logger.debug(`Removed key: [${cacheKey}]`);
  }
  clear() {
    this._cache = new Map();
  }
}
exports.CacheTTL = CacheTTL;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJDYWNoZVRUTCIsImNvbnN0cnVjdG9yIiwibG9nZ2VyIiwiY29uZmlnIiwiX2RlZmluZVByb3BlcnR5IiwiTWFwIiwiX2NvbmZpZyIsInR0bCIsInR0bFNlY29uZHMiLCJ3YXJuIiwiZGVidWciLCJoYXNFeHBpcmVkIiwiY2FjaGVLZXkiLCJfdGhpcyRfY2FjaGUkZ2V0IiwiX2NhY2hlIiwiZ2V0IiwiZXhwaXJlZEF0IiwiRGF0ZSIsIm5vdyIsInNlcmlhbGl6ZURhdGFUb0tleSIsImRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwiZ2V0S2V5Iiwia2V5IiwiaGFzIiwicmVtb3ZlIiwiX3RoaXMkX2NhY2hlJGdldDIiLCJ2YWx1ZSIsInNldCIsImRlbGV0ZSIsImNsZWFyIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbImNhY2hlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvZ2dlciB9IGZyb20gJ29wZW5zZWFyY2gtZGFzaGJvYXJkcy9zZXJ2ZXInO1xuXG4vKipcbiAqIENhY2hlIGJhc2VkIG9uIHRpbWUgdG8gbGl2ZVxuICogVGhlIGtleSB3aGVyZSBhIHNldCBvZiBkYXRhIGlzIHN0b3JlZCBjYW4gYmU6XG4gKiAtIGRlZmluZWQga2V5XG4gKiAtIHNlcmlhbGl6ZSB0aGUgZGF0YVxuICovXG5leHBvcnQgY2xhc3MgQ2FjaGVUVEw8VD4ge1xuICBwcml2YXRlIF9jYWNoZTogTWFwPHN0cmluZywgeyB2YWx1ZTogVDsgZXhwaXJlZEF0OiBudW1iZXIgfT4gPSBuZXcgTWFwPFxuICAgIHN0cmluZyxcbiAgICB7IHZhbHVlOiBUOyBleHBpcmVkQXQ6IG51bWJlciB9XG4gID4oKTtcbiAgcHJpdmF0ZSBfY29uZmlnOiB7XG4gICAgdHRsOiBudW1iZXI7XG4gIH07XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbG9nZ2VyOiBMb2dnZXIsIGNvbmZpZzogeyB0dGxTZWNvbmRzOiBudW1iZXIgfSkge1xuICAgIHRoaXMuX2NvbmZpZyA9IHtcbiAgICAgIHR0bDogY29uZmlnLnR0bFNlY29uZHMgKiAxMDAwLFxuICAgIH07XG4gICAgaWYgKCF0aGlzLl9jb25maWcudHRsKSB7XG4gICAgICB0aGlzLmxvZ2dlci53YXJuKCdDYWNoZSB0aW1lIGlzIGRpc2FibGVkJyk7XG4gICAgfVxuICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdJbml0Jyk7XG4gIH1cbiAgcHJpdmF0ZSBoYXNFeHBpcmVkKGNhY2hlS2V5OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gKHRoaXMuX2NhY2hlLmdldChjYWNoZUtleSk/LmV4cGlyZWRBdCB8fCAwKSA8IERhdGUubm93KCk7XG4gIH1cbiAgcHJpdmF0ZSBzZXJpYWxpemVEYXRhVG9LZXkoZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICB9XG4gIHByaXZhdGUgZ2V0S2V5KGRhdGE6IGFueSwga2V5Pzogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGtleSB8fCB0aGlzLnNlcmlhbGl6ZURhdGFUb0tleShkYXRhKTtcbiAgfVxuICBoYXMoZGF0YTogYW55LCBrZXk/OiBzdHJpbmcpIHtcbiAgICBjb25zdCBjYWNoZUtleSA9IHRoaXMuZ2V0S2V5KGRhdGEsIGtleSk7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYEhhcyBrZXk6IFske2NhY2hlS2V5fV1gKTtcbiAgICAvLyBDaGVjayBpZiB0aGUgY2FjaGUga2V5IGlzIGNhY2hlZFxuICAgIGlmICghdGhpcy5fY2FjaGUuaGFzKGNhY2hlS2V5KSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBDaGVjayBpZiB0aGUgY2FjaGUgS2V5IGlzIGV4cGlyZWRcbiAgICBpZiAodGhpcy5oYXNFeHBpcmVkKGNhY2hlS2V5KSkge1xuICAgICAgLy8gUmVtb3ZlIHRoZSBrZXlcbiAgICAgIHRoaXMucmVtb3ZlKGNhY2hlS2V5KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgZ2V0KGRhdGE6IGFueSwga2V5Pzogc3RyaW5nKSB7XG4gICAgY29uc3QgY2FjaGVLZXkgPSB0aGlzLmdldEtleShkYXRhLCBrZXkpO1xuICAgIHRoaXMubG9nZ2VyLmRlYnVnKGBHZXQga2V5OiBbJHtjYWNoZUtleX1dYCk7XG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlLmdldChjYWNoZUtleSk/LnZhbHVlO1xuICB9XG4gIHNldChkYXRhOiBhbnksIGtleT86IHN0cmluZykge1xuICAgIGNvbnN0IGNhY2hlS2V5ID0gdGhpcy5nZXRLZXkoZGF0YSwga2V5KTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhcbiAgICAgIGBTZXR0aW5nIGtleTogWyR7Y2FjaGVLZXl9XSB3aXRoIFske0pTT04uc3RyaW5naWZ5KGRhdGEpfV1gLFxuICAgICk7XG4gICAgdGhpcy5fY2FjaGUuc2V0KGNhY2hlS2V5LCB7XG4gICAgICB2YWx1ZTogZGF0YSxcbiAgICAgIGV4cGlyZWRBdDogRGF0ZS5ub3coKSArIHRoaXMuX2NvbmZpZy50dGwsXG4gICAgfSk7XG4gICAgdGhpcy5sb2dnZXIuZGVidWcoYERhdGEgc2V0IFske2NhY2hlS2V5fV0gd2l0aCBbJHtKU09OLnN0cmluZ2lmeShkYXRhKX1dYCk7XG4gICAgcmV0dXJuIHRoaXMuX2NhY2hlO1xuICB9XG4gIHJlbW92ZShkYXRhOiBhbnksIGtleT86IHN0cmluZykge1xuICAgIGNvbnN0IGNhY2hlS2V5ID0gdGhpcy5nZXRLZXkoZGF0YSwga2V5KTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgUmVtb3Zpbmcga2V5OiBbJHtjYWNoZUtleX1dYCk7XG4gICAgdGhpcy5fY2FjaGUuZGVsZXRlKGNhY2hlS2V5KTtcbiAgICB0aGlzLmxvZ2dlci5kZWJ1ZyhgUmVtb3ZlZCBrZXk6IFske2NhY2hlS2V5fV1gKTtcbiAgfVxuICBjbGVhcigpIHtcbiAgICB0aGlzLl9jYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCB7IHZhbHVlOiBUOyBleHBpcmVkQXQ6IG51bWJlciB9PigpO1xuICB9XG59XG4iXSwibWFw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