"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statisticsTemplate = void 0;
/*
 * Wazuh app - Module for statistics template
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
const statisticsTemplate = exports.statisticsTemplate = {
  order: 0,
  settings: {
    'index.refresh_interval': '5s'
  },
  "mappings": {
    "dynamic_templates": [{
      "string_as_keyword": {
        "match_mapping_type": "string",
        "mapping": {
          "type": "keyword"
        }
      }
    }],
    "properties": {
      "analysisd": {
        "properties": {
          "alerts_queue_size": {
            "type": "long"
          },
          "alerts_queue_usage": {
            "type": "long"
          },
          "alerts_written": {
            "type": "long"
          },
          "archives_queue_size": {
            "type": "long"
          },
          "archives_queue_usage": {
            "type": "long"
          },
          "dbsync_mdps": {
            "type": "long"
          },
          "dbsync_messages_dispatched": {
            "type": "long"
          },
          "dbsync_queue_size": {
            "type": "long"
          },
          "dbsync_queue_usage": {
            "type": "long"
          },
          "event_queue_size": {
            "type": "long"
          },
          "event_queue_usage": {
            "type": "long"
          },
          "events_dropped": {
            "type": "long"
          },
          "events_edps": {
            "type": "long"
          },
          "events_processed": {
            "type": "long"
          },
          "events_received": {
            "type": "long"
          },
          "firewall_queue_size": {
            "type": "long"
          },
          "firewall_queue_usage": {
            "type": "long"
          },
          "firewall_written": {
            "type": "long"
          },
          "fts_written": {
            "type": "long"
          },
          "hostinfo_edps": {
            "type": "long"
          },
          "hostinfo_events_decoded": {
            "type": "long"
          },
          "hostinfo_queue_size": {
            "type": "long"
          },
          "hostinfo_queue_usage": {
            "type": "long"
          },
          "other_events_decoded": {
            "type": "long"
          },
          "other_events_edps": {
            "type": "long"
          },
          "rootcheck_edps": {
            "type": "long"
          },
          "rootcheck_events_decoded": {
            "type": "long"
          },
          "rootcheck_queue_size": {
            "type": "long"
          },
          "rootcheck_queue_usage": {
            "type": "long"
          },
          "rule_matching_queue_size": {
            "type": "long"
          },
          "rule_matching_queue_usage": {
            "type": "long"
          },
          "sca_edps": {
            "type": "long"
          },
          "sca_events_decoded": {
            "type": "long"
          },
          "sca_queue_size": {
            "type": "long"
          },
          "sca_queue_usage": {
            "type": "long"
          },
          "statistical_queue_size": {
            "type": "long"
          },
          "statistical_queue_usage": {
            "type": "long"
          },
          "syscheck_edps": {
            "type": "long"
          },
          "syscheck_events_decoded": {
            "type": "long"
          },
          "syscheck_queue_size": {
            "type": "long"
          },
          "syscheck_queue_usage": {
            "type": "long"
          },
          "syscollector_edps": {
            "type": "long"
          },
          "syscollector_events_decoded": {
            "type": "long"
          },
          "syscollector_queue_size": {
            "type": "long"
          },
          "syscollector_queue_usage": {
            "type": "long"
          },
          "total_events_decoded": {
            "type": "long"
          },
          "upgrade_queue_size": {
            "type": "long"
          },
          "upgrade_queue_usage": {
            "type": "long"
          },
          "winevt_edps": {
            "type": "long"
          },
          "winevt_events_decoded": {
            "type": "long"
          },
          "winevt_queue_size": {
            "type": "long"
          },
          "winevt_queue_usage": {
            "type": "long"
          }
        }
      },
      "apiName": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "cluster": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "nodeName": {
        "type": "text",
        "fields": {
          "keyword": {
            "type": "keyword",
            "ignore_above": 256
          }
        }
      },
      "name": {
        "type": "keyword"
      },
      "remoted": {
        "properties": {
          "ctrl_msg_count": {
            "type": "long"
          },
          "dequeued_after_close": {
            "type": "long"
          },
          "discarded_count": {
            "type": "long"
          },
          "evt_count": {
            "type": "long"
          },
          "msg_sent": {
            "type": "long"
          },
          "queue_size": {
            "type": "keyword"
          },
          "recv_bytes": {
            "type": "long"
          },
          "tcp_sessions": {
            "type": "long"
          },
          "total_queue_size": {
            "type": "long"
          }
        }
      },
      "status": {
        "type": "keyword"
      },
      "timestamp": {
        "type": "date",
        "format": "dateOptionalTime"
      }
    }
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzdGF0aXN0aWNzVGVtcGxhdGUiLCJleHBvcnRzIiwib3JkZXIiLCJzZXR0aW5ncyJdLCJzb3VyY2VzIjpbInN0YXRpc3RpY3MtdGVtcGxhdGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFdhenVoIGFwcCAtIE1vZHVsZSBmb3Igc3RhdGlzdGljcyB0ZW1wbGF0ZVxuICogQ29weXJpZ2h0IChDKSAyMDE1LTIwMjIgV2F6dWgsIEluYy5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTsgeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb247IGVpdGhlciB2ZXJzaW9uIDIgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEZpbmQgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCB0aGlzIG9uIHRoZSBMSUNFTlNFIGZpbGUuXG4gKi9cbmV4cG9ydCBjb25zdCBzdGF0aXN0aWNzVGVtcGxhdGUgPSB7XG4gIG9yZGVyOiAwLFxuICBzZXR0aW5nczoge1xuICAgICdpbmRleC5yZWZyZXNoX2ludGVydmFsJzogJzVzJ1xuICB9LFxuICBcIm1hcHBpbmdzXCIgOiB7XG4gICAgXCJkeW5hbWljX3RlbXBsYXRlc1wiIDogW1xuICAgICAge1xuICAgICAgICBcInN0cmluZ19hc19rZXl3b3JkXCIgOiB7XG4gICAgICAgICAgXCJtYXRjaF9tYXBwaW5nX3R5cGVcIiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgXCJtYXBwaW5nXCIgOiB7XG4gICAgICAgICAgICBcInR5cGVcIiA6IFwia2V5d29yZFwiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgXSxcbiAgICBcInByb3BlcnRpZXNcIiA6IHtcbiAgICAgIFwiYW5hbHlzaXNkXCIgOiB7XG4gICAgICAgIFwicHJvcGVydGllc1wiIDoge1xuICAgICAgICAgIFwiYWxlcnRzX3F1ZXVlX3NpemVcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiYWxlcnRzX3F1ZXVlX3VzYWdlXCIgOiB7XG4gICAgICAgICAgICBcInR5cGVcIiA6IFwibG9uZ1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImFsZXJ0c193cml0dGVuXCIgOiB7XG4gICAgICAgICAgICBcInR5cGVcIiA6IFwibG9uZ1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImFyY2hpdmVzX3F1ZXVlX3NpemVcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiYXJjaGl2ZXNfcXVldWVfdXNhZ2VcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGJzeW5jX21kcHNcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGJzeW5jX21lc3NhZ2VzX2Rpc3BhdGNoZWRcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGJzeW5jX3F1ZXVlX3NpemVcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZGJzeW5jX3F1ZXVlX3VzYWdlXCIgOiB7XG4gICAgICAgICAgICBcInR5cGVcIiA6IFwibG9uZ1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImV2ZW50X3F1ZXVlX3NpemVcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZXZlbnRfcXVldWVfdXNhZ2VcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZXZlbnRzX2Ryb3BwZWRcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZXZlbnRzX2VkcHNcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZXZlbnRzX3Byb2Nlc3NlZFwiIDoge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImxvbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJldmVudHNfcmVjZWl2ZWRcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiZmlyZXdhbGxfcXVldWVfc2l6ZVwiIDoge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImxvbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJmaXJld2FsbF9xdWV1ZV91c2FnZVwiIDoge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImxvbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJmaXJld2FsbF93cml0dGVuXCIgOiB7XG4gICAgICAgICAgICBcInR5cGVcIiA6IFwibG9uZ1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImZ0c193cml0dGVuXCIgOiB7XG4gICAgICAgICAgICBcInR5cGVcIiA6IFwibG9uZ1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImhvc3RpbmZvX2VkcHNcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiaG9zdGluZm9fZXZlbnRzX2RlY29kZWRcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwiaG9zdGluZm9fcXVldWVfc2l6ZVwiIDoge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImxvbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJob3N0aW5mb19xdWV1ZV91c2FnZVwiIDoge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImxvbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJvdGhlcl9ldmVudHNfZGVjb2RlZFwiIDoge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImxvbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJvdGhlcl9ldmVudHNfZWRwc1wiIDoge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImxvbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyb290Y2hlY2tfZWRwc1wiIDoge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImxvbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyb290Y2hlY2tfZXZlbnRzX2RlY29kZWRcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicm9vdGNoZWNrX3F1ZXVlX3NpemVcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicm9vdGNoZWNrX3F1ZXVlX3VzYWdlXCIgOiB7XG4gICAgICAgICAgICBcInR5cGVcIiA6IFwibG9uZ1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInJ1bGVfbWF0Y2hpbmdfcXVldWVfc2l6ZVwiIDoge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImxvbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJydWxlX21hdGNoaW5nX3F1ZXVlX3VzYWdlXCIgOiB7XG4gICAgICAgICAgICBcInR5cGVcIiA6IFwibG9uZ1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNjYV9lZHBzXCIgOiB7XG4gICAgICAgICAgICBcInR5cGVcIiA6IFwibG9uZ1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInNjYV9ldmVudHNfZGVjb2RlZFwiIDoge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImxvbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzY2FfcXVldWVfc2l6ZVwiIDoge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImxvbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzY2FfcXVldWVfdXNhZ2VcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3RhdGlzdGljYWxfcXVldWVfc2l6ZVwiIDoge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImxvbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzdGF0aXN0aWNhbF9xdWV1ZV91c2FnZVwiIDoge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImxvbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJzeXNjaGVja19lZHBzXCIgOiB7XG4gICAgICAgICAgICBcInR5cGVcIiA6IFwibG9uZ1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInN5c2NoZWNrX2V2ZW50c19kZWNvZGVkXCIgOiB7XG4gICAgICAgICAgICBcInR5cGVcIiA6IFwibG9uZ1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInN5c2NoZWNrX3F1ZXVlX3NpemVcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3lzY2hlY2tfcXVldWVfdXNhZ2VcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3lzY29sbGVjdG9yX2VkcHNcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwic3lzY29sbGVjdG9yX2V2ZW50c19kZWNvZGVkXCIgOiB7XG4gICAgICAgICAgICBcInR5cGVcIiA6IFwibG9uZ1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInN5c2NvbGxlY3Rvcl9xdWV1ZV9zaXplXCIgOiB7XG4gICAgICAgICAgICBcInR5cGVcIiA6IFwibG9uZ1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInN5c2NvbGxlY3Rvcl9xdWV1ZV91c2FnZVwiIDoge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImxvbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ0b3RhbF9ldmVudHNfZGVjb2RlZFwiIDoge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImxvbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ1cGdyYWRlX3F1ZXVlX3NpemVcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwidXBncmFkZV9xdWV1ZV91c2FnZVwiIDoge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImxvbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ3aW5ldnRfZWRwc1wiIDoge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImxvbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ3aW5ldnRfZXZlbnRzX2RlY29kZWRcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwid2luZXZ0X3F1ZXVlX3NpemVcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwid2luZXZ0X3F1ZXVlX3VzYWdlXCIgOiB7XG4gICAgICAgICAgICBcInR5cGVcIiA6IFwibG9uZ1wiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJhcGlOYW1lXCIgOiB7XG4gICAgICAgIFwidHlwZVwiIDogXCJ0ZXh0XCIsXG4gICAgICAgIFwiZmllbGRzXCIgOiB7XG4gICAgICAgICAgXCJrZXl3b3JkXCIgOiB7XG4gICAgICAgICAgICBcInR5cGVcIiA6IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgXCJpZ25vcmVfYWJvdmVcIiA6IDI1NlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwiY2x1c3RlclwiIDoge1xuICAgICAgICBcInR5cGVcIiA6IFwidGV4dFwiLFxuICAgICAgICBcImZpZWxkc1wiIDoge1xuICAgICAgICAgIFwia2V5d29yZFwiIDoge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImtleXdvcmRcIixcbiAgICAgICAgICAgIFwiaWdub3JlX2Fib3ZlXCIgOiAyNTZcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcIm5vZGVOYW1lXCIgOiB7XG4gICAgICAgIFwidHlwZVwiIDogXCJ0ZXh0XCIsXG4gICAgICAgIFwiZmllbGRzXCIgOiB7XG4gICAgICAgICAgXCJrZXl3b3JkXCIgOiB7XG4gICAgICAgICAgICBcInR5cGVcIiA6IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgXCJpZ25vcmVfYWJvdmVcIiA6IDI1NlxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFwibmFtZVwiIDoge1xuICAgICAgICBcInR5cGVcIiA6IFwia2V5d29yZFwiXG4gICAgICB9LCBcbiAgICAgIFwicmVtb3RlZFwiIDoge1xuICAgICAgICBcInByb3BlcnRpZXNcIiA6IHtcbiAgICAgICAgICBcImN0cmxfbXNnX2NvdW50XCIgOiB7XG4gICAgICAgICAgICBcInR5cGVcIiA6IFwibG9uZ1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRlcXVldWVkX2FmdGVyX2Nsb3NlXCIgOiB7XG4gICAgICAgICAgICBcInR5cGVcIiA6IFwibG9uZ1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcImRpc2NhcmRlZF9jb3VudFwiIDoge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImxvbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJldnRfY291bnRcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwibXNnX3NlbnRcIiA6IHtcbiAgICAgICAgICAgIFwidHlwZVwiIDogXCJsb25nXCJcbiAgICAgICAgICB9LFxuICAgICAgICAgIFwicXVldWVfc2l6ZVwiIDoge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImtleXdvcmRcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJyZWN2X2J5dGVzXCIgOiB7XG4gICAgICAgICAgICBcInR5cGVcIiA6IFwibG9uZ1wiXG4gICAgICAgICAgfSxcbiAgICAgICAgICBcInRjcF9zZXNzaW9uc1wiIDoge1xuICAgICAgICAgICAgXCJ0eXBlXCIgOiBcImxvbmdcIlxuICAgICAgICAgIH0sXG4gICAgICAgICAgXCJ0b3RhbF9xdWV1ZV9zaXplXCIgOiB7XG4gICAgICAgICAgICBcInR5cGVcIiA6IFwibG9uZ1wiXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgXCJzdGF0dXNcIiA6IHtcbiAgICAgICAgXCJ0eXBlXCIgOiBcImtleXdvcmRcIlxuICAgICAgfSxcbiAgICAgIFwidGltZXN0YW1wXCIgOiB7XG4gICAgICAgIFwidHlwZVwiIDogXCJkYXRlXCIsXG4gICAgICAgIFwiZm9ybWF0XCIgOiBcImRhdGVPcHRpb25hbFRpbWVcIlxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLE1BQU1BLGtCQUFrQixHQUFB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