"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pluginPlatformTemplate = void 0;
/*
 * Wazuh app - Module for Kibana template
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
const pluginPlatformTemplate = exports.pluginPlatformTemplate = {
  order: 0,
  template: '.kibana*',
  settings: {
    'index.refresh_interval': '5s'
  },
  mappings: {
    properties: {
      type: {
        type: 'keyword'
      },
      updated_at: {
        type: 'date'
      },
      config: {
        properties: {
          buildNum: {
            type: 'keyword'
          }
        }
      },
      'index-pattern': {
        properties: {
          fieldFormatMap: {
            type: 'text'
          },
          fields: {
            type: 'text'
          },
          intervalName: {
            type: 'keyword'
          },
          notExpandable: {
            type: 'boolean'
          },
          sourceFilters: {
            type: 'text'
          },
          timeFieldName: {
            type: 'keyword'
          },
          title: {
            type: 'text'
          }
        }
      },
      visualization: {
        properties: {
          description: {
            type: 'text'
          },
          kibanaSavedObjectMeta: {
            properties: {
              searchSourceJSON: {
                type: 'text'
              }
            }
          },
          savedSearchId: {
            type: 'keyword'
          },
          title: {
            type: 'text'
          },
          uiStateJSON: {
            type: 'text'
          },
          version: {
            type: 'integer'
          },
          visState: {
            type: 'text'
          }
        }
      },
      search: {
        properties: {
          columns: {
            type: 'keyword'
          },
          description: {
            type: 'text'
          },
          hits: {
            type: 'integer'
          },
          kibanaSavedObjectMeta: {
            properties: {
              searchSourceJSON: {
                type: 'text'
              }
            }
          },
          sort: {
            type: 'keyword'
          },
          title: {
            type: 'text'
          },
          version: {
            type: 'integer'
          }
        }
      },
      dashboard: {
        properties: {
          description: {
            type: 'text'
          },
          hits: {
            type: 'integer'
          },
          kibanaSavedObjectMeta: {
            properties: {
              searchSourceJSON: {
                type: 'text'
              }
            }
          },
          optionsJSON: {
            type: 'text'
          },
          panelsJSON: {
            type: 'text'
          },
          refreshInterval: {
            properties: {
              display: {
                type: 'keyword'
              },
              pause: {
                type: 'boolean'
              },
              section: {
                type: 'integer'
              },
              value: {
                type: 'integer'
              }
            }
          },
          timeFrom: {
            type: 'keyword'
          },
          timeRestore: {
            type: 'boolean'
          },
          timeTo: {
            type: 'keyword'
          },
          title: {
            type: 'text'
          },
          uiStateJSON: {
            type: 'text'
          },
          version: {
            type: 'integer'
          }
        }
      },
      url: {
        properties: {
          accessCount: {
            type: 'long'
          },
          accessDate: {
            type: 'date'
          },
          createDate: {
            type: 'date'
          },
          url: {
            type: 'text',
            fields: {
              keyword: {
                type: 'keyword',
                ignore_above: 2048
              }
            }
          }
        }
      },
      server: {
        properties: {
          uuid: {
            type: 'keyword'
          }
        }
      },
      'timelion-sheet': {
        properties: {
          description: {
            type: 'text'
          },
          hits: {
            type: 'integer'
          },
          kibanaSavedObjectMeta: {
            properties: {
              searchSourceJSON: {
                type: 'text'
              }
            }
          },
          timelion_chart_height: {
            type: 'integer'
          },
          timelion_columns: {
            type: 'integer'
          },
          timelion_interval: {
            type: 'keyword'
          },
          timelion_other_interval: {
            type: 'keyword'
          },
          timelion_rows: {
            type: 'integer'
          },
          timelion_sheet: {
            type: 'text'
          },
          title: {
            type: 'text'
          },
          version: {
            type: 'integer'
          }
        }
      },
      'graph-workspace': {
        properties: {
          description: {
            type: 'text'
          },
          kibanaSavedObjectMeta: {
            properties: {
              searchSourceJSON: {
                type: 'text'
              }
            }
          },
          numLinks: {
            type: 'integer'
          },
          numVertices: {
            type: 'integer'
          },
          title: {
            type: 'text'
          },
          version: {
            type: 'integer'
          },
          wsState: {
            type: 'text'
          }
        }
      }
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJwbHVnaW5QbGF0Zm9ybVRlbXBsYXRlIiwiZXhwb3J0cyIsIm9yZGVyIiwidGVtcGxhdGUiLCJzZXR0aW5ncyIsIm1hcHBpbmdzIiwicHJvcGVydGllcyIsInR5cGUiLCJ1cGRhdGVkX2F0IiwiY29uZmlnIiwiYnVpbGROdW0iLCJmaWVsZEZvcm1hdE1hcCIsImZpZWxkcyIsImludGVydmFsTmFtZSIsIm5vdEV4cGFuZGFibGUiLCJzb3VyY2VGaWx0ZXJzIiwidGltZUZpZWxkTmFtZSIsInRpdGxlIiwidmlzdWFsaXphdGlvbiIsImRlc2NyaXB0aW9uIiwia2liYW5hU2F2ZWRPYmplY3RNZXRhIiwic2VhcmNoU291cmNlSlNPTiIsInNhdmVkU2VhcmNoSWQiLCJ1aVN0YXRlSlNPTiIsInZlcnNpb24iLCJ2aXNTdGF0ZSIsInNlYXJjaCIsImNvbHVtbnMiLCJoaXRzIiwic29ydCIsImRhc2hib2FyZCIsIm9wdGlvbnNKU09OIiwicGFuZWxzSlNPTiIsInJlZnJlc2hJbnRlcnZhbCIsImRpc3BsYXkiLCJwYXVzZSIsInNlY3Rpb24iLCJ2YWx1ZSIsInRpbWVGcm9tIiwidGltZVJlc3RvcmUiLCJ0aW1lVG8iLCJ1cmwiLCJhY2Nlc3NDb3VudCIsImFjY2Vzc0RhdGUiLCJjcmVhdGVEYXRlIiwia2V5d29yZCIsImlnbm9yZV9hYm92ZSIsInNlcnZlciIsInV1aWQiLCJ0aW1lbGlvbl9jaGFydF9oZWlnaHQiLCJ0aW1lbGlvbl9jb2x1bW5zIiwidGltZWxpb25faW50ZXJ2YWwiLCJ0aW1lbGlvbl9vdGhlcl9pbnRlcnZhbCIsInRpbWVsaW9uX3Jvd3MiLCJ0aW1lbGlvbl9zaGVldCIsIm51bUxpbmtzIiwibnVtVmVydGljZXMiLCJ3c1N0YXRlIl0sInNvdXJjZXMiOlsia2liYW5hLXRlbXBsYXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBXYXp1aCBhcHAgLSBNb2R1bGUgZm9yIEtpYmFuYSB0ZW1wbGF0ZVxuICogQ29weXJpZ2h0IChDKSAyMDE1LTIwMjIgV2F6dWgsIEluYy5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTsgeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb247IGVpdGhlciB2ZXJzaW9uIDIgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEZpbmQgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCB0aGlzIG9uIHRoZSBMSUNFTlNFIGZpbGUuXG4gKi9cbmV4cG9ydCBjb25zdCBwbHVnaW5QbGF0Zm9ybVRlbXBsYXRlID0ge1xuICBvcmRlcjogMCxcbiAgdGVtcGxhdGU6ICcua2liYW5hKicsXG4gIHNldHRpbmdzOiB7XG4gICAgJ2luZGV4LnJlZnJlc2hfaW50ZXJ2YWwnOiAnNXMnXG4gIH0sXG4gIG1hcHBpbmdzOiB7XG4gICAgcHJvcGVydGllczoge1xuICAgICAgdHlwZToge1xuICAgICAgICB0eXBlOiAna2V5d29yZCdcbiAgICAgIH0sXG4gICAgICB1cGRhdGVkX2F0OiB7XG4gICAgICAgIHR5cGU6ICdkYXRlJ1xuICAgICAgfSxcbiAgICAgIGNvbmZpZzoge1xuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgYnVpbGROdW06IHtcbiAgICAgICAgICAgIHR5cGU6ICdrZXl3b3JkJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICdpbmRleC1wYXR0ZXJuJzoge1xuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgZmllbGRGb3JtYXRNYXA6IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZmllbGRzOiB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIGludGVydmFsTmFtZToge1xuICAgICAgICAgICAgdHlwZTogJ2tleXdvcmQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBub3RFeHBhbmRhYmxlOiB7XG4gICAgICAgICAgICB0eXBlOiAnYm9vbGVhbidcbiAgICAgICAgICB9LFxuICAgICAgICAgIHNvdXJjZUZpbHRlcnM6IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdGltZUZpZWxkTmFtZToge1xuICAgICAgICAgICAgdHlwZTogJ2tleXdvcmQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aXRsZToge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdmlzdWFsaXphdGlvbjoge1xuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgIH0sXG4gICAgICAgICAga2liYW5hU2F2ZWRPYmplY3RNZXRhOiB7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIHNlYXJjaFNvdXJjZUpTT046IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgc2F2ZWRTZWFyY2hJZDoge1xuICAgICAgICAgICAgdHlwZTogJ2tleXdvcmQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aXRsZToge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB1aVN0YXRlSlNPTjoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB2ZXJzaW9uOiB7XG4gICAgICAgICAgICB0eXBlOiAnaW50ZWdlcidcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZpc1N0YXRlOiB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZWFyY2g6IHtcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIGNvbHVtbnM6IHtcbiAgICAgICAgICAgIHR5cGU6ICdrZXl3b3JkJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgIH0sXG4gICAgICAgICAgaGl0czoge1xuICAgICAgICAgICAgdHlwZTogJ2ludGVnZXInXG4gICAgICAgICAgfSxcbiAgICAgICAgICBraWJhbmFTYXZlZE9iamVjdE1ldGE6IHtcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgc2VhcmNoU291cmNlSlNPTjoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzb3J0OiB7XG4gICAgICAgICAgICB0eXBlOiAna2V5d29yZCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZlcnNpb246IHtcbiAgICAgICAgICAgIHR5cGU6ICdpbnRlZ2VyJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGRhc2hib2FyZDoge1xuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgIH0sXG4gICAgICAgICAgaGl0czoge1xuICAgICAgICAgICAgdHlwZTogJ2ludGVnZXInXG4gICAgICAgICAgfSxcbiAgICAgICAgICBraWJhbmFTYXZlZE9iamVjdE1ldGE6IHtcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgc2VhcmNoU291cmNlSlNPTjoge1xuICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvcHRpb25zSlNPTjoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBwYW5lbHNKU09OOiB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHJlZnJlc2hJbnRlcnZhbDoge1xuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICBkaXNwbGF5OiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2tleXdvcmQnXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHBhdXNlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2Jvb2xlYW4nXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHNlY3Rpb246IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW50ZWdlcidcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnaW50ZWdlcidcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdGltZUZyb206IHtcbiAgICAgICAgICAgIHR5cGU6ICdrZXl3b3JkJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdGltZVJlc3RvcmU6IHtcbiAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdGltZVRvOiB7XG4gICAgICAgICAgICB0eXBlOiAna2V5d29yZCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVpU3RhdGVKU09OOiB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZlcnNpb246IHtcbiAgICAgICAgICAgIHR5cGU6ICdpbnRlZ2VyJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVybDoge1xuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgYWNjZXNzQ291bnQ6IHtcbiAgICAgICAgICAgIHR5cGU6ICdsb25nJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgYWNjZXNzRGF0ZToge1xuICAgICAgICAgICAgdHlwZTogJ2RhdGUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjcmVhdGVEYXRlOiB7XG4gICAgICAgICAgICB0eXBlOiAnZGF0ZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVybDoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgZmllbGRzOiB7XG4gICAgICAgICAgICAgIGtleXdvcmQ6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAna2V5d29yZCcsXG4gICAgICAgICAgICAgICAgaWdub3JlX2Fib3ZlOiAyMDQ4XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXJ2ZXI6IHtcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIHV1aWQ6IHtcbiAgICAgICAgICAgIHR5cGU6ICdrZXl3b3JkJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgICd0aW1lbGlvbi1zaGVldCc6IHtcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgIGRlc2NyaXB0aW9uOiB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgICB9LFxuICAgICAgICAgIGhpdHM6IHtcbiAgICAgICAgICAgIHR5cGU6ICdpbnRlZ2VyJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAga2liYW5hU2F2ZWRPYmplY3RNZXRhOiB7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIHNlYXJjaFNvdXJjZUpTT046IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdGltZWxpb25fY2hhcnRfaGVpZ2h0OiB7XG4gICAgICAgICAgICB0eXBlOiAnaW50ZWdlcidcbiAgICAgICAgICB9LFxuICAgICAgICAgIHRpbWVsaW9uX2NvbHVtbnM6IHtcbiAgICAgICAgICAgIHR5cGU6ICdpbnRlZ2VyJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdGltZWxpb25faW50ZXJ2YWw6IHtcbiAgICAgICAgICAgIHR5cGU6ICdrZXl3b3JkJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdGltZWxpb25fb3RoZXJfaW50ZXJ2YWw6IHtcbiAgICAgICAgICAgIHR5cGU6ICdrZXl3b3JkJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdGltZWxpb25fcm93czoge1xuICAgICAgICAgICAgdHlwZTogJ2ludGVnZXInXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aW1lbGlvbl9zaGVldDoge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aXRsZToge1xuICAgICAgICAgICAgdHlwZTogJ3RleHQnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB2ZXJzaW9uOiB7XG4gICAgICAgICAgICB0eXBlOiAnaW50ZWdlcidcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAnZ3JhcGgtd29ya3NwYWNlJzoge1xuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgZGVzY3JpcHRpb246IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgIH0sXG4gICAgICAgICAga2liYW5hU2F2ZWRPYmplY3RNZXRhOiB7XG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgIHNlYXJjaFNvdXJjZUpTT046IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgbnVtTGlua3M6IHtcbiAgICAgICAgICAgIHR5cGU6ICdpbnRlZ2VyJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgbnVtVmVydGljZXM6IHtcbiAgICAgICAgICAgIHR5cGU6ICdpbnRlZ2VyJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdGl0bGU6IHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdmVyc2lvbjoge1xuICAgICAgICAgICAgdHlwZTogJ2ludGVnZXInXG4gICAgICAgICAgfSxcbiAgICAgICAgICB3c1N0YXRlOiB7XG4gICAgICAgICAgICB0eXBlOiAndGV4dCdcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxNQUFNQSxzQkFBc0IsR0FBQUMsT0FBQSxDQUFBRCxzQkFBQSxHQUFHO0VBQ3BDRSxLQUFLLEVBQUUsQ0FBQztFQUNSQyxRQUFRLEVBQUUsVUFBVTtFQUNwQkMsUUFBUSxFQUFFO0lBQ1Isd0JBQXdCLEVBQUU7RUFDNUIsQ0FBQztFQUNEQyxRQUFRLEVBQUU7SUFDUkMsVUFBVSxFQUFFO01BQ1ZDLElBQUksRUFBRTtRQUNKQSxJQUFJLEVBQUU7TUFDUixDQUFDO01BQ0RDLFVBQVUsRUFBRTtRQUNWRCxJQUFJLEVBQUU7TUFD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