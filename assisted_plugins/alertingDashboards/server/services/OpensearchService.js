"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

class OpensearchService {
  constructor(esDriver) {
    // TODO: This will be deprecated as we do not want to support accessing alerting indices directly
    //  and that is what this is used for
    _defineProperty(this, "search", async (context, req, res) => {
      try {
        const {
          query,
          index,
          size
        } = req.body;
        const params = {
          index,
          size,
          body: query
        };
        const {
          callAsCurrentUser
        } = this.esDriver.asScoped(req);
        const results = await callAsCurrentUser('search', params);
        return res.ok({
          body: {
            ok: true,
            resp: results
          }
        });
      } catch (err) {
        console.error('Alerting - OpensearchService - search', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "getIndices", async (context, req, res) => {
      try {
        const {
          index
        } = req.body;
        const {
          callAsCurrentUser
        } = this.esDriver.asScoped(req);
        const indices = await callAsCurrentUser('cat.indices', {
          index,
          format: 'json',
          h: 'health,index,status'
        });
        return res.ok({
          body: {
            ok: true,
            resp: indices
          }
        });
      } catch (err) {
        // Opensearch throws an index_not_found_exception which we'll treat as a success
        if (err.statusCode === 404) {
          return res.ok({
            body: {
              ok: true,
              resp: []
            }
          });
        } else {
          console.error('Alerting - OpensearchService - getIndices:', err);
          return res.ok({
            body: {
              ok: false,
              resp: err.message
            }
          });
        }
      }
    });
    _defineProperty(this, "getAliases", async (context, req, res) => {
      try {
        const {
          alias
        } = req.body;
        const {
          callAsCurrentUser
        } = this.esDriver.asScoped(req);
        const aliases = await callAsCurrentUser('cat.aliases', {
          alias,
          format: 'json',
          h: 'alias,index'
        });
        return res.ok({
          body: {
            ok: true,
            resp: aliases
          }
        });
      } catch (err) {
        console.error('Alerting - OpensearchService - getAliases:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "getClusterHealth", async (context, req, res) => {
      try {
        const {
          callAsCurrentUser
        } = this.esDriver.asScoped(req);
        const health = await callAsCurrentUser('cat.health', {
          format: 'json',
          h: 'cluster,status'
        });
        return res.ok({
          body: {
            ok: true,
            resp: health
          }
        });
      } catch (err) {
        console.error('Alerting - OpensearchService - getClusterHealth:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "getMappings", async (context, req, res) => {
      try {
        const {
          index
        } = req.body;
        const {
          callAsCurrentUser
        } = this.esDriver.asScoped(req);
        const mappings = await callAsCurrentUser('indices.getMapping', {
          index
        });
        return res.ok({
          body: {
            ok: true,
            resp: mappings
          }
        });
      } catch (err) {
        console.error('Alerting - OpensearchService - getMappings:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "getPlugins", async (context, req, res) => {
      try {
        const {
          callAsCurrentUser
        } = this.esDriver.asScoped(req);
        const plugins = await callAsCurrentUser('cat.plugins', {
          format: 'json',
          h: 'component'
        });
        return res.ok({
          body: {
            ok: true,
            resp: plugins
          }
        });
      } catch (err) {
        console.error('Alerting - OpensearchService - getPlugins:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    _defineProperty(this, "getSettings", async (context, req, res) => {
      try {
        const {
          callAsCurrentUser
        } = this.esDriver.asScoped(req);
        const settings = await callAsCurrentUser('cluster.getSettings', {
          include_defaults: 'true'
        });
        return res.ok({
          body: {
            ok: true,
            resp: settings
          }
        });
      } catch (err) {
        console.error('Alerting - OpensearchService - getSettings:', err);
        return res.ok({
          body: {
            ok: false,
            resp: err.message
          }
        });
      }
    });
    this.esDriver = esDriver;
  }
}
exports.default = OpensearchService;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJPcGVuc2VhcmNoU2VydmljZSIsImNvbnN0cnVjdG9yIiwiZXNEcml2ZXIiLCJfZGVmaW5lUHJvcGVydHkiLCJjb250ZXh0IiwicmVxIiwicmVzIiwicXVlcnkiLCJpbmRleCIsInNpemUiLCJib2R5IiwicGFyYW1zIiwiY2FsbEFzQ3VycmVudFVzZXIiLCJhc1Njb3BlZCIsInJlc3VsdHMiLCJvayIsInJlc3AiLCJlcnIiLCJjb25zb2xlIiwiZXJyb3IiLCJtZXNzYWdlIiwiaW5kaWNlcyIsImZvcm1hdCIsImgiLCJzdGF0dXNDb2RlIiwiYWxpYXMiLCJhbGlhc2VzIiwiaGVhbHRoIiwibWFwcGluZ3MiLCJwbHVnaW5zIiwic2V0dGluZ3MiLCJpbmNsdWRlX2RlZmF1bHRzIiwiZXhwb3J0cyIsImRlZmF1bHQiLCJtb2R1bGUiXSwic291cmNlcyI6WyJPcGVuc2VhcmNoU2VydmljZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogQ29weXJpZ2h0IE9wZW5TZWFyY2ggQ29udHJpYnV0b3JzXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQXBhY2hlLTIuMFxuICovXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE9wZW5zZWFyY2hTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IoZXNEcml2ZXIpIHtcbiAgICB0aGlzLmVzRHJpdmVyID0gZXNEcml2ZXI7XG4gIH1cblxuICAvLyBUT0RPOiBUaGlzIHdpbGwgYmUgZGVwcmVjYXRlZCBhcyB3ZSBkbyBub3Qgd2FudCB0byBzdXBwb3J0IGFjY2Vzc2luZyBhbGVydGluZyBpbmRpY2VzIGRpcmVjdGx5XG4gIC8vICBhbmQgdGhhdCBpcyB3aGF0IHRoaXMgaXMgdXNlZCBmb3JcbiAgc2VhcmNoID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgcXVlcnksIGluZGV4LCBzaXplIH0gPSByZXEuYm9keTtcbiAgICAgIGNvbnN0IHBhcmFtcyA9IHsgaW5kZXgsIHNpemUsIGJvZHk6IHF1ZXJ5IH07XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcSk7XG4gICAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ3NlYXJjaCcsIHBhcmFtcyk7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3A6IHJlc3VsdHMsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0FsZXJ0aW5nIC0gT3BlbnNlYXJjaFNlcnZpY2UgLSBzZWFyY2gnLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgcmVzcDogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0SW5kaWNlcyA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGluZGV4IH0gPSByZXEuYm9keTtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IGluZGljZXMgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignY2F0LmluZGljZXMnLCB7XG4gICAgICAgIGluZGV4LFxuICAgICAgICBmb3JtYXQ6ICdqc29uJyxcbiAgICAgICAgaDogJ2hlYWx0aCxpbmRleCxzdGF0dXMnLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3A6IGluZGljZXMsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIC8vIE9wZW5zZWFyY2ggdGhyb3dzIGFuIGluZGV4X25vdF9mb3VuZF9leGNlcHRpb24gd2hpY2ggd2UnbGwgdHJlYXQgYXMgYSBzdWNjZXNzXG4gICAgICBpZiAoZXJyLnN0YXR1c0NvZGUgPT09IDQwNCkge1xuICAgICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgICBib2R5OiB7XG4gICAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICAgIHJlc3A6IFtdLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignQWxlcnRpbmcgLSBPcGVuc2VhcmNoU2VydmljZSAtIGdldEluZGljZXM6JywgZXJyKTtcbiAgICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgICAgcmVzcDogZXJyLm1lc3NhZ2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGdldEFsaWFzZXMgPSBhc3luYyAoY29udGV4dCwgcmVxLCByZXMpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBhbGlhcyB9ID0gcmVxLmJvZHk7XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcSk7XG4gICAgICBjb25zdCBhbGlhc2VzID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2NhdC5hbGlhc2VzJywge1xuICAgICAgICBhbGlhcyxcbiAgICAgICAgZm9ybWF0OiAnanNvbicsXG4gICAgICAgIGg6ICdhbGlhcyxpbmRleCcsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcDogYWxpYXNlcyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQWxlcnRpbmcgLSBPcGVuc2VhcmNoU2VydmljZSAtIGdldEFsaWFzZXM6JywgZXJyKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIHJlc3A6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGdldENsdXN0ZXJIZWFsdGggPSBhc3luYyAoY29udGV4dCwgcmVxLCByZXMpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlciB9ID0gdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgaGVhbHRoID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2NhdC5oZWFsdGgnLCB7XG4gICAgICAgIGZvcm1hdDogJ2pzb24nLFxuICAgICAgICBoOiAnY2x1c3RlcixzdGF0dXMnLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiB0cnVlLFxuICAgICAgICAgIHJlc3A6IGhlYWx0aCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQWxlcnRpbmcgLSBPcGVuc2VhcmNoU2VydmljZSAtIGdldENsdXN0ZXJIZWFsdGg6JywgZXJyKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIHJlc3A6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGdldE1hcHBpbmdzID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgaW5kZXggfSA9IHJlcS5ib2R5O1xuICAgICAgY29uc3QgeyBjYWxsQXNDdXJyZW50VXNlciB9ID0gdGhpcy5lc0RyaXZlci5hc1Njb3BlZChyZXEpO1xuICAgICAgY29uc3QgbWFwcGluZ3MgPSBhd2FpdCBjYWxsQXNDdXJyZW50VXNlcignaW5kaWNlcy5nZXRNYXBwaW5nJywgeyBpbmRleCB9KTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcDogbWFwcGluZ3MsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0FsZXJ0aW5nIC0gT3BlbnNlYXJjaFNlcnZpY2UgLSBnZXRNYXBwaW5nczonLCBlcnIpO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogZmFsc2UsXG4gICAgICAgICAgcmVzcDogZXJyLm1lc3NhZ2UsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgZ2V0UGx1Z2lucyA9IGFzeW5jIChjb250ZXh0LCByZXEsIHJlcykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IGNhbGxBc0N1cnJlbnRVc2VyIH0gPSB0aGlzLmVzRHJpdmVyLmFzU2NvcGVkKHJlcSk7XG4gICAgICBjb25zdCBwbHVnaW5zID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2NhdC5wbHVnaW5zJywge1xuICAgICAgICBmb3JtYXQ6ICdqc29uJyxcbiAgICAgICAgaDogJ2NvbXBvbmVudCcsXG4gICAgICB9KTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IHRydWUsXG4gICAgICAgICAgcmVzcDogcGx1Z2lucyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQWxlcnRpbmcgLSBPcGVuc2VhcmNoU2VydmljZSAtIGdldFBsdWdpbnM6JywgZXJyKTtcbiAgICAgIHJldHVybiByZXMub2soe1xuICAgICAgICBib2R5OiB7XG4gICAgICAgICAgb2s6IGZhbHNlLFxuICAgICAgICAgIHJlc3A6IGVyci5tZXNzYWdlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGdldFNldHRpbmdzID0gYXN5bmMgKGNvbnRleHQsIHJlcSwgcmVzKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHsgY2FsbEFzQ3VycmVudFVzZXIgfSA9IHRoaXMuZXNEcml2ZXIuYXNTY29wZWQocmVxKTtcbiAgICAgIGNvbnN0IHNldHRpbmdzID0gYXdhaXQgY2FsbEFzQ3VycmVudFVzZXIoJ2NsdXN0ZXIuZ2V0U2V0dGluZ3MnLCB7XG4gICAgICAgIGluY2x1ZGVfZGVmYXVsdHM6ICd0cnVlJyxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlcy5vayh7XG4gICAgICAgIGJvZHk6IHtcbiAgICAgICAgICBvazogdHJ1ZSxcbiAgICAgICAgICByZXNwOiBzZXR0aW5ncyxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcignQWxlcnRpbmcgLSBPcGVuc2VhcmNoU2VydmljZSAtIGdldFNldHRpbmdzOicsIGVycik7XG4gICAgICByZXR1cm4gcmVzLm9rKHtcbiAgICAgICAgYm9keToge1xuICAgICAgICAgIG9rOiBmYWxzZSxcbiAgICAgICAgICByZXNwOiBlcnIubWVzc2FnZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRWUsTUFBTUEsaUJBQWlCLENBQUM7RUFDckNDLFdBQVdBLENBQUNDLFFBQVEsRUFBRTtJQUl0QjtJQUNBO0lBQUFDLGVB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