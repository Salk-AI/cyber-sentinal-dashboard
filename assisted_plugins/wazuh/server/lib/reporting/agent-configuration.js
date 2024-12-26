"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AgentConfiguration = void 0;
var _web_documentation = require("../../../common/services/web_documentation");
/*
 * Wazuh app - Agent configuration request objet for exporting it
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
const AgentConfiguration = exports.AgentConfiguration = {
  configurations: [{
    title: 'Main configurations',
    sections: [{
      subtitle: 'Global configuration',
      desc: 'Logging settings that apply to the agent',
      config: [{
        component: 'com',
        configuration: 'logging'
      }],
      labels: [{
        plain: 'Write internal logs in plain text',
        json: 'Write internal logs in JSON format',
        server: 'List of managers to connect'
      }]
    }, {
      subtitle: 'Communication',
      docuLink: (0, _web_documentation.webDocumentationLink)('user-manual/reference/ossec-conf/client.html'),
      desc: 'Settings related to the connection with the manager',
      config: [{
        component: 'agent',
        configuration: 'client'
      }],
      labels: [{
        crypto_method: 'Method used to encrypt communications',
        auto_restart: 'Auto-restart the agent when receiving valid configuration from manager',
        notify_time: 'Time (in seconds) between agent checkings to the manager',
        'time-reconnect': 'Time (in seconds) before attempting to reconnect',
        server: 'List of managers to connect',
        'config-profile': 'Configuration profiles',
        remote_conf: 'Remote configuration is enabled'
      }]
    }, {
      subtitle: 'Anti-flooding settings',
      docuLink: (0, _web_documentation.webDocumentationLink)('user-manual/capabilities/antiflooding.html'),
      desc: 'Agent bucket parameters to avoid event flooding',
      config: [{
        component: 'agent',
        configuration: 'buffer'
      }],
      labels: [{
        disabled: 'Buffer disabled',
        queue_size: 'Queue size',
        events_per_second: 'Events per second'
      }]
    }, {
      subtitle: 'Agent labels',
      docuLink: (0, _web_documentation.webDocumentationLink)('user-manual/reference/ossec-conf/labels.html'),
      desc: 'User-defined information about the agent included in alerts',
      config: [{
        component: 'agent',
        configuration: 'labels'
      }]
    }]
  }, {
    title: 'Auditing and policy monitoring',
    sections: [{
      subtitle: 'Policy monitoring',
      docuLink: (0, _web_documentation.webDocumentationLink)('pci-dss/policy-monitoring.html'),
      desc: 'Configuration to ensure compliance with security policies, standards and hardening guides',
      config: [{
        component: 'syscheck',
        configuration: 'rootcheck'
      }],
      wodle: [{
        name: 'sca'
      }],
      labels: [{
        disabled: 'Policy monitoring service disabled',
        base_directory: 'Base directory',
        rootkit_files: 'Rootkit files database path',
        rootkit_trojans: 'Rootkit trojans database path',
        scanall: 'Scan the entire system',
        skip_nfs: 'Skip scan on CIFS/NFS mounts',
        frequency: 'Frequency (in seconds) to run the scan',
        check_dev: 'Check /dev path',
        check_files: 'Check files',
        check_if: 'Check network interfaces',
        check_pids: 'Check processes IDs',
        check_ports: 'Check network ports',
        check_sys: 'Check anomalous system objects',
        check_trojans: 'Check trojans',
        check_unixaudit: 'Check UNIX audit',
        system_audit: 'UNIX audit files paths',
        enabled: 'Security configuration assessment enabled',
        scan_on_start: 'Scan on start',
        interval: 'Interval',
        policies: 'Policies'
      }],
      tabs: ['General', 'Security configuration assessment']
    }, {
      subtitle: 'OpenSCAP',
      docuLink: (0, _web_documentation.webDocumentationLink)('user-manual/reference/ossec-conf/wodle-openscap.html'),
      desc: 'Configuration assessment and automation of compliance monitoring using SCAP checks',
      wodle: [{
        name: 'open-scap'
      }],
      labels: [{
        content: 'Evaluations',
        disabled: 'OpenSCAP integration disabled',
        'scan-on-start': 'Scan on start',
        interval: 'Interval between scan executions',
        timeout: 'Timeout (in seconds) for scan executions'
      }]
    }, {
      subtitle: 'CIS-CAT',
      docuLink: (0, _web_documentation.webDocumentationLink)('user-manual/reference/ossec-conf/wodle-ciscat.html'),
      desc: 'Configuration assessment using CIS scanner and SCAP checks',
      wodle: [{
        name: 'cis-cat'
      }],
      labels: [{
        disabled: 'CIS-CAT integration disabled',
        'scan-on-start': 'Scan on start',
        interval: 'Interval between scan executions',
        java_path: 'Path to Java executable directory',
        ciscat_path: 'Path to CIS-CAT executable directory',
        timeout: 'Timeout (in seconds) for scan executions',
        content: 'Benchmarks'
      }]
    }]
  }, {
    title: 'System threats and incident response',
    sections: [{
      subtitle: 'Osquery',
      docuLink: (0, _web_documentation.webDocumentationLink)('user-manual/reference/ossec-conf/wodle-osquery.html'),
      desc: 'Expose an operating system as a high-performance relational database',
      wodle: [{
        name: 'osquery'
      }],
      labels: [{
        disabled: 'Osquery integration disabled',
        run_daemon: 'Auto-run the Osquery daemon',
        add_labels: 'Use defined labels as decorators',
        log_path: 'Path to the Osquery results log file',
        config_path: 'Path to the Osquery configuration file'
      }]
    }, {
      subtitle: 'Inventory data',
      docuLink: (0, _web_documentation.webDocumentationLink)('user-manual/reference/ossec-conf/wodle-syscollector.html'),
      desc: 'Gather relevant information about the operating system, hardware, networking and packages',
      wodle: [{
        name: 'syscollector'
      }],
      labels: [{
        disabled: 'Syscollector integration disabled',
        'scan-on-start': 'Scan on start',
        interval: 'Interval between system scans',
        network: 'Scan network interfaces',
        os: 'Scan operating system info',
        hardware: 'Scan hardware info',
        packages: 'Scan installed packages',
        ports: 'Scan listening network ports',
        ports_all: 'Scan all network ports',
        processes: 'Scan current processes'
      }]
    }, {
      subtitle: 'Active response',
      docuLink: (0, _web_documentation.webDocumentationLink)('user-manual/reference/ossec-conf/active-response.html'),
      desc: 'Active threat addressing by immediate response',
      config: [{
        component: 'com',
        configuration: 'active-response'
      }],
      labels: [{
        disabled: 'Active response disabled',
        ca_store: 'Use the following list of root CA certificates',
        ca_verification: 'Validate WPKs using root CA certificate'
      }]
    }, {
      subtitle: 'Commands',
      docuLink: (0, _web_documentation.webDocumentationLink)('user-manual/reference/ossec-conf/wodle-command.html'),
      desc: 'Configuration options of the Command wodle',
      wodle: [{
        name: 'command'
      }],
      labels: [{
        disabled: 'Command disabled',
        run_on_start: 'Run on start',
        ignore_output: 'Ignore command output',
        skip_verification: 'Ignore checksum verification',
        interval: 'Interval between executions',
        tag: 'Command name',
        command: 'Command to execute',
        verify_md5: 'Verify MD5 sum',
        verify_sha1: 'Verify SHA1 sum',
        verify_sha256: 'Verify SHA256 sum'
      }]
    }, {
      subtitle: 'Docker listener',
      docuLink: (0, _web_documentation.webDocumentationLink)('user-manual/reference/ossec-conf/wodle-docker.html'),
      desc: 'Monitor and collect the activity from Docker containers such as creation, running, starting, stopping or pausing events',
      wodle: [{
        name: 'docker-listener'
      }],
      labels: [{
        disabled: 'Docker listener disabled',
        run_on_start: 'Run the listener immediately when service is started',
        interval: 'Waiting time to rerun the listener in case it fails',
        attempts: 'Number of attempts to execute the listener'
      }]
    }]
  }, {
    title: 'Log data analysis',
    sections: [{
      subtitle: 'Log collection',
      docuLink: (0, _web_documentation.webDocumentationLink)('user-manual/capabilities/log-data-collection/index.html'),
      desc: 'Log analysis from text files, Windows events or syslog outputs',
      config: [{
        component: 'logcollector',
        configuration: 'localfile',
        filterBy: 'logformat'
      }, {
        component: 'logcollector',
        configuration: 'socket'
      }],
      labels: [{
        logformat: 'Log format',
        log_format: 'Log format',
        alias: 'Command alias',
        ignore_binaries: 'Ignore binaries',
        target: 'Redirect output to this socket',
        frequency: 'Interval between command executions',
        file: 'Log location',
        location: 'Log location',
        socket: 'Output sockets',
        syslog: 'Syslog',
        command: 'Command',
        full_command: 'Full command',
        audit: 'Audit'
      }],
      options: {
        hideHeader: true
      }
    }, {
      subtitle: 'Integrity monitoring',
      docuLink: (0, _web_documentation.webDocumentationLink)('user-manual/reference/ossec-conf/syscheck.html'),
      desc: 'Identify changes in content, permissions, ownership, and attributes of files',
      config: [{
        component: 'syscheck',
        configuration: 'syscheck',
        matrix: true
      }],
      tabs: ['General', 'Who data'],
      labels: [{
        disabled: 'Integrity monitoring disabled',
        frequency: 'Interval (in seconds) to run the integrity scan',
        skip_nfs: 'Skip scan on CIFS/NFS mounts',
        scan_on_start: 'Scan on start',
        directories: 'Monitored directories',
        nodiff: 'No diff directories',
        ignore: 'Ignored files and directories',
        restart_audit: 'Restart audit',
        startup_healthcheck: 'Startup healthcheck'
      }],
      opts: {
        realtime: 'RT',
        check_whodata: 'WD',
        report_changes: 'Changes',
        check_md5sum: 'MD5',
        check_sha1sum: 'SHA1',
        check_perm: 'Per.',
        check_size: 'Size',
        check_owner: 'Owner',
        check_group: 'Group',
        check_mtime: 'MT',
        check_inode: 'Inode',
        check_sha256sum: 'SHA256',
        follow_symbolic_link: 'SL'
      }
    }]
  }]
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJfd2ViX2RvY3VtZW50YXRpb24iLCJyZXF1aXJlIiwiQWdlbnRDb25maWd1cmF0aW9uIiwiZXhwb3J0cyIsImNvbmZpZ3VyYXRpb25zIiwidGl0bGUiLCJzZWN0aW9ucyIsInN1YnRpdGxlIiwiZGVzYyIsImNvbmZpZyIsImNvbXBvbmVudCIsImNvbmZpZ3VyYXRpb24iLCJsYWJlbHMiLCJwbGFpbiIsImpzb24iLCJzZXJ2ZXIiLCJkb2N1TGluayIsIndlYkRvY3VtZW50YXRpb25MaW5rIiwiY3J5cHRvX21ldGhvZCIsImF1dG9fcmVzdGFydCIsIm5vdGlmeV90aW1lIiwicmVtb3RlX2NvbmYiLCJkaXNhYmxlZCIsInF1ZXVlX3NpemUiLCJldmVudHNfcGVyX3NlY29uZCIsIndvZGxlIiwibmFtZSIsImJhc2VfZGlyZWN0b3J5Iiwicm9vdGtpdF9maWxlcyIsInJvb3RraXRfdHJvamFucyIsInNjYW5hbGwiLCJza2lwX25mcyIsImZyZXF1ZW5jeSIsImNoZWNrX2RldiIsImNoZWNrX2ZpbGVzIiwiY2hlY2tfaWYiLCJjaGVja19waWRzIiwiY2hlY2tfcG9ydHMiLCJjaGVja19zeXMiLCJjaGVja190cm9qYW5zIiwiY2hlY2tfdW5peGF1ZGl0Iiwic3lzdGVtX2F1ZGl0IiwiZW5hYmxlZCIsInNjYW5fb25fc3RhcnQiLCJpbnRlcnZhbCIsInBvbGljaWVzIiwidGFicyIsImNvbnRlbnQiLCJ0aW1lb3V0IiwiamF2YV9wYXRoIiwiY2lzY2F0X3BhdGgiLCJydW5fZGFlbW9uIiwiYWRkX2xhYmVscyIsImxvZ19wYXRoIiwiY29uZmlnX3BhdGgiLCJuZXR3b3JrIiwib3MiLCJoYXJkd2FyZSIsInBhY2thZ2VzIiwicG9ydHMiLCJwb3J0c19hbGwiLCJwcm9jZXNzZXMiLCJjYV9zdG9yZSIsImNhX3ZlcmlmaWNhdGlvbiIsInJ1bl9vbl9zdGFydCIsImlnbm9yZV9vdXRwdXQiLCJza2lwX3ZlcmlmaWNhdGlvbiIsInRhZyIsImNvbW1hbmQiLCJ2ZXJpZnlfbWQ1IiwidmVyaWZ5X3NoYTEiLCJ2ZXJpZnlfc2hhMjU2IiwiYXR0ZW1wdHMiLCJmaWx0ZXJCeSIsImxvZ2Zvcm1hdCIsImxvZ19mb3JtYXQiLCJhbGlhcyIsImlnbm9yZV9iaW5hcmllcyIsInRhcmdldCIsImZpbGUiLCJsb2NhdGlvbiIsInNvY2tldCIsInN5c2xvZyIsImZ1bGxfY29tbWFuZCIsImF1ZGl0Iiwib3B0aW9ucyIsImhpZGVIZWFkZXIiLCJtYXRyaXgiLCJkaXJlY3RvcmllcyIsIm5vZGlmZiIsImlnbm9yZSIsInJlc3RhcnRfYXVkaXQiLCJzdGFydHVwX2hlYWx0aGNoZWNrIiwib3B0cyIsInJlYWx0aW1lIiwiY2hlY2tfd2hvZGF0YSIsInJlcG9ydF9jaGFuZ2VzIiwiY2hlY2tfbWQ1c3VtIiwiY2hlY2tfc2hhMXN1bSIsImNoZWNrX3Blcm0iLCJjaGVja19zaXplIiwiY2hlY2tfb3duZXIiLCJjaGVja19ncm91cCIsImNoZWNrX210aW1lIiwiY2hlY2tfaW5vZGUiLCJjaGVja19zaGEyNTZzdW0iLCJmb2xsb3dfc3ltYm9saWNfbGluayJdLCJzb3VyY2VzIjpbImFnZW50LWNvbmZpZ3VyYXRpb24udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgd2ViRG9jdW1lbnRhdGlvbkxpbmsgfSBmcm9tIFwiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3dlYl9kb2N1bWVudGF0aW9uXCI7XG5cbi8qXG4gKiBXYXp1aCBhcHAgLSBBZ2VudCBjb25maWd1cmF0aW9uIHJlcXVlc3Qgb2JqZXQgZm9yIGV4cG9ydGluZyBpdFxuICogQ29weXJpZ2h0IChDKSAyMDE1LTIwMjIgV2F6dWgsIEluYy5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTsgeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb247IGVpdGhlciB2ZXJzaW9uIDIgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEZpbmQgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCB0aGlzIG9uIHRoZSBMSUNFTlNFIGZpbGUuXG4gKi9cbmV4cG9ydCBjb25zdCBBZ2VudENvbmZpZ3VyYXRpb24gPSB7XG4gIGNvbmZpZ3VyYXRpb25zOiBbXG4gICAge1xuICAgICAgdGl0bGU6ICdNYWluIGNvbmZpZ3VyYXRpb25zJyxcbiAgICAgIHNlY3Rpb25zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBzdWJ0aXRsZTogJ0dsb2JhbCBjb25maWd1cmF0aW9uJyxcbiAgICAgICAgICBkZXNjOiAnTG9nZ2luZyBzZXR0aW5ncyB0aGF0IGFwcGx5IHRvIHRoZSBhZ2VudCcsXG4gICAgICAgICAgY29uZmlnOiBbeyBjb21wb25lbnQ6ICdjb20nLCBjb25maWd1cmF0aW9uOiAnbG9nZ2luZycgfV0sXG4gICAgICAgICAgbGFiZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHBsYWluOiAnV3JpdGUgaW50ZXJuYWwgbG9ncyBpbiBwbGFpbiB0ZXh0JyxcbiAgICAgICAgICAgICAganNvbjogJ1dyaXRlIGludGVybmFsIGxvZ3MgaW4gSlNPTiBmb3JtYXQnLFxuICAgICAgICAgICAgICBzZXJ2ZXI6ICdMaXN0IG9mIG1hbmFnZXJzIHRvIGNvbm5lY3QnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3VidGl0bGU6ICdDb21tdW5pY2F0aW9uJyxcbiAgICAgICAgICBkb2N1TGluazogd2ViRG9jdW1lbnRhdGlvbkxpbmsoJ3VzZXItbWFudWFsL3JlZmVyZW5jZS9vc3NlYy1jb25mL2NsaWVudC5odG1sJyksXG4gICAgICAgICAgZGVzYzogJ1NldHRpbmdzIHJlbGF0ZWQgdG8gdGhlIGNvbm5lY3Rpb24gd2l0aCB0aGUgbWFuYWdlcicsXG4gICAgICAgICAgY29uZmlnOiBbeyBjb21wb25lbnQ6ICdhZ2VudCcsIGNvbmZpZ3VyYXRpb246ICdjbGllbnQnIH1dLFxuICAgICAgICAgIGxhYmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjcnlwdG9fbWV0aG9kOiAnTWV0aG9kIHVzZWQgdG8gZW5jcnlwdCBjb21tdW5pY2F0aW9ucycsXG4gICAgICAgICAgICAgIGF1dG9fcmVzdGFydDpcbiAgICAgICAgICAgICAgICAnQXV0by1yZXN0YXJ0IHRoZSBhZ2VudCB3aGVuIHJlY2VpdmluZyB2YWxpZCBjb25maWd1cmF0aW9uIGZyb20gbWFuYWdlcicsXG4gICAgICAgICAgICAgIG5vdGlmeV90aW1lOlxuICAgICAgICAgICAgICAgICdUaW1lIChpbiBzZWNvbmRzKSBiZXR3ZWVuIGFnZW50IGNoZWNraW5ncyB0byB0aGUgbWFuYWdlcicsXG4gICAgICAgICAgICAgICd0aW1lLXJlY29ubmVjdCc6XG4gICAgICAgICAgICAgICAgJ1RpbWUgKGluIHNlY29uZHMpIGJlZm9yZSBhdHRlbXB0aW5nIHRvIHJlY29ubmVjdCcsXG4gICAgICAgICAgICAgIHNlcnZlcjogJ0xpc3Qgb2YgbWFuYWdlcnMgdG8gY29ubmVjdCcsXG4gICAgICAgICAgICAgICdjb25maWctcHJvZmlsZSc6ICdDb25maWd1cmF0aW9uIHByb2ZpbGVzJyxcbiAgICAgICAgICAgICAgcmVtb3RlX2NvbmY6ICdSZW1vdGUgY29uZmlndXJhdGlvbiBpcyBlbmFibGVkJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHN1YnRpdGxlOiAnQW50aS1mbG9vZGluZyBzZXR0aW5ncycsXG4gICAgICAgICAgZG9jdUxpbms6IHdlYkRvY3VtZW50YXRpb25MaW5rKCd1c2VyLW1hbnVhbC9jYXBhYmlsaXRpZXMvYW50aWZsb29kaW5nLmh0bWwnKSxcbiAgICAgICAgICBkZXNjOiAnQWdlbnQgYnVja2V0IHBhcmFtZXRlcnMgdG8gYXZvaWQgZXZlbnQgZmxvb2RpbmcnLFxuICAgICAgICAgIGNvbmZpZzogW3sgY29tcG9uZW50OiAnYWdlbnQnLCBjb25maWd1cmF0aW9uOiAnYnVmZmVyJyB9XSxcbiAgICAgICAgICBsYWJlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZGlzYWJsZWQ6ICdCdWZmZXIgZGlzYWJsZWQnLFxuICAgICAgICAgICAgICBxdWV1ZV9zaXplOiAnUXVldWUgc2l6ZScsXG4gICAgICAgICAgICAgIGV2ZW50c19wZXJfc2Vjb25kOiAnRXZlbnRzIHBlciBzZWNvbmQnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3VidGl0bGU6ICdBZ2VudCBsYWJlbHMnLFxuICAgICAgICAgIGRvY3VMaW5rOiB3ZWJEb2N1bWVudGF0aW9uTGluaygndXNlci1tYW51YWwvcmVmZXJlbmNlL29zc2VjLWNvbmYvbGFiZWxzLmh0bWwnKSxcbiAgICAgICAgICBkZXNjOiAnVXNlci1kZWZpbmVkIGluZm9ybWF0aW9uIGFib3V0IHRoZSBhZ2VudCBpbmNsdWRlZCBpbiBhbGVydHMnLFxuICAgICAgICAgIGNvbmZpZzogW3sgY29tcG9uZW50OiAnYWdlbnQnLCBjb25maWd1cmF0aW9uOiAnbGFiZWxzJyB9XVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0F1ZGl0aW5nIGFuZCBwb2xpY3kgbW9uaXRvcmluZycsXG4gICAgICBzZWN0aW9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgc3VidGl0bGU6ICdQb2xpY3kgbW9uaXRvcmluZycsXG4gICAgICAgICAgZG9jdUxpbms6IHdlYkRvY3VtZW50YXRpb25MaW5rKCdwY2ktZHNzL3BvbGljeS1tb25pdG9yaW5nLmh0bWwnKSxcbiAgICAgICAgICBkZXNjOlxuICAgICAgICAgICAgJ0NvbmZpZ3VyYXRpb24gdG8gZW5zdXJlIGNvbXBsaWFuY2Ugd2l0aCBzZWN1cml0eSBwb2xpY2llcywgc3RhbmRhcmRzIGFuZCBoYXJkZW5pbmcgZ3VpZGVzJyxcbiAgICAgICAgICBjb25maWc6IFt7IGNvbXBvbmVudDogJ3N5c2NoZWNrJywgY29uZmlndXJhdGlvbjogJ3Jvb3RjaGVjaycgfV0sXG4gICAgICAgICAgd29kbGU6IFt7IG5hbWU6ICdzY2EnIH1dLFxuICAgICAgICAgIGxhYmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBkaXNhYmxlZDogJ1BvbGljeSBtb25pdG9yaW5nIHNlcnZpY2UgZGlzYWJsZWQnLFxuICAgICAgICAgICAgICBiYXNlX2RpcmVjdG9yeTogJ0Jhc2UgZGlyZWN0b3J5JyxcbiAgICAgICAgICAgICAgcm9vdGtpdF9maWxlczogJ1Jvb3RraXQgZmlsZXMgZGF0YWJhc2UgcGF0aCcsXG4gICAgICAgICAgICAgIHJvb3RraXRfdHJvamFuczogJ1Jvb3RraXQgdHJvamFucyBkYXRhYmFzZSBwYXRoJyxcbiAgICAgICAgICAgICAgc2NhbmFsbDogJ1NjYW4gdGhlIGVudGlyZSBzeXN0ZW0nLFxuICAgICAgICAgICAgICBza2lwX25mczogJ1NraXAgc2NhbiBvbiBDSUZTL05GUyBtb3VudHMnLFxuICAgICAgICAgICAgICBmcmVxdWVuY3k6ICdGcmVxdWVuY3kgKGluIHNlY29uZHMpIHRvIHJ1biB0aGUgc2NhbicsXG4gICAgICAgICAgICAgIGNoZWNrX2RldjogJ0NoZWNrIC9kZXYgcGF0aCcsXG4gICAgICAgICAgICAgIGNoZWNrX2ZpbGVzOiAnQ2hlY2sgZmlsZXMnLFxuICAgICAgICAgICAgICBjaGVja19pZjogJ0NoZWNrIG5ldHdvcmsgaW50ZXJmYWNlcycsXG4gICAgICAgICAgICAgIGNoZWNrX3BpZHM6ICdDaGVjayBwcm9jZXNzZXMgSURzJyxcbiAgICAgICAgICAgICAgY2hlY2tfcG9ydHM6ICdDaGVjayBuZXR3b3JrIHBvcnRzJyxcbiAgICAgICAgICAgICAgY2hlY2tfc3lzOiAnQ2hlY2sgYW5vbWFsb3VzIHN5c3RlbSBvYmplY3RzJyxcbiAgICAgICAgICAgICAgY2hlY2tfdHJvamFuczogJ0NoZWNrIHRyb2phbnMnLFxuICAgICAgICAgICAgICBjaGVja191bml4YXVkaXQ6ICdDaGVjayBVTklYIGF1ZGl0JyxcbiAgICAgICAgICAgICAgc3lzdGVtX2F1ZGl0OiAnVU5JWCBhdWRpdCBmaWxlcyBwYXRocycsXG4gICAgICAgICAgICAgIGVuYWJsZWQ6ICdTZWN1cml0eSBjb25maWd1cmF0aW9uIGFzc2Vzc21lbnQgZW5hYmxlZCcsXG4gICAgICAgICAgICAgIHNjYW5fb25fc3RhcnQ6ICdTY2FuIG9uIHN0YXJ0JyxcbiAgICAgICAgICAgICAgaW50ZXJ2YWw6ICdJbnRlcnZhbCcsXG4gICAgICAgICAgICAgIHBvbGljaWVzOiAnUG9saWNpZXMnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXSxcbiAgICAgICAgICB0YWJzOiBbJ0dlbmVyYWwnLCAnU2VjdXJpdHkgY29uZmlndXJhdGlvbiBhc3Nlc3NtZW50J11cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHN1YnRpdGxlOiAnT3BlblNDQVAnLFxuICAgICAgICAgIGRvY3VMaW5rOiB3ZWJEb2N1bWVudGF0aW9uTGluaygndXNlci1tYW51YWwvcmVmZXJlbmNlL29zc2VjLWNvbmYvd29kbGUtb3BlbnNjYXAuaHRtbCcpLFxuICAgICAgICAgIGRlc2M6XG4gICAgICAgICAgICAnQ29uZmlndXJhdGlvbiBhc3Nlc3NtZW50IGFuZCBhdXRvbWF0aW9uIG9mIGNvbXBsaWFuY2UgbW9uaXRvcmluZyB1c2luZyBTQ0FQIGNoZWNrcycsXG4gICAgICAgICAgd29kbGU6IFt7IG5hbWU6ICdvcGVuLXNjYXAnIH1dLFxuICAgICAgICAgIGxhYmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjb250ZW50OiAnRXZhbHVhdGlvbnMnLFxuICAgICAgICAgICAgICBkaXNhYmxlZDogJ09wZW5TQ0FQIGludGVncmF0aW9uIGRpc2FibGVkJyxcbiAgICAgICAgICAgICAgJ3NjYW4tb24tc3RhcnQnOiAnU2NhbiBvbiBzdGFydCcsXG4gICAgICAgICAgICAgIGludGVydmFsOiAnSW50ZXJ2YWwgYmV0d2VlbiBzY2FuIGV4ZWN1dGlvbnMnLFxuICAgICAgICAgICAgICB0aW1lb3V0OiAnVGltZW91dCAoaW4gc2Vjb25kcykgZm9yIHNjYW4gZXhlY3V0aW9ucydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzdWJ0aXRsZTogJ0NJUy1DQVQnLFxuICAgICAgICAgIGRvY3VMaW5rOiB3ZWJEb2N1bWVudGF0aW9uTGluaygndXNlci1tYW51YWwvcmVmZXJlbmNlL29zc2VjLWNvbmYvd29kbGUtY2lzY2F0Lmh0bWwnKSxcbiAgICAgICAgICBkZXNjOiAnQ29uZmlndXJhdGlvbiBhc3Nlc3NtZW50IHVzaW5nIENJUyBzY2FubmVyIGFuZCBTQ0FQIGNoZWNrcycsXG4gICAgICAgICAgd29kbGU6IFt7IG5hbWU6ICdjaXMtY2F0JyB9XSxcbiAgICAgICAgICBsYWJlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZGlzYWJsZWQ6ICdDSVMtQ0FUIGludGVncmF0aW9uIGRpc2FibGVkJyxcbiAgICAgICAgICAgICAgJ3NjYW4tb24tc3RhcnQnOiAnU2NhbiBvbiBzdGFydCcsXG4gICAgICAgICAgICAgIGludGVydmFsOiAnSW50ZXJ2YWwgYmV0d2VlbiBzY2FuIGV4ZWN1dGlvbnMnLFxuICAgICAgICAgICAgICBqYXZhX3BhdGg6ICdQYXRoIHRvIEphdmEgZXhlY3V0YWJsZSBkaXJlY3RvcnknLFxuICAgICAgICAgICAgICBjaXNjYXRfcGF0aDogJ1BhdGggdG8gQ0lTLUNBVCBleGVjdXRhYmxlIGRpcmVjdG9yeScsXG4gICAgICAgICAgICAgIHRpbWVvdXQ6ICdUaW1lb3V0IChpbiBzZWNvbmRzKSBmb3Igc2NhbiBleGVjdXRpb25zJyxcbiAgICAgICAgICAgICAgY29udGVudDogJ0JlbmNobWFya3MnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ1N5c3RlbSB0aHJlYXRzIGFuZCBpbmNpZGVudCByZXNwb25zZScsXG4gICAgICBzZWN0aW9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgc3VidGl0bGU6ICdPc3F1ZXJ5JyxcbiAgICAgICAgICBkb2N1TGluazogd2ViRG9jdW1lbnRhdGlvbkxpbmsoJ3VzZXItbWFudWFsL3JlZmVyZW5jZS9vc3NlYy1jb25mL3dvZGxlLW9zcXVlcnkuaHRtbCcpLFxuICAgICAgICAgIGRlc2M6XG4gICAgICAgICAgICAnRXhwb3NlIGFuIG9wZXJhdGluZyBzeXN0ZW0gYXMgYSBoaWdoLXBlcmZvcm1hbmNlIHJlbGF0aW9uYWwgZGF0YWJhc2UnLFxuICAgICAgICAgIHdvZGxlOiBbeyBuYW1lOiAnb3NxdWVyeScgfV0sXG4gICAgICAgICAgbGFiZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGRpc2FibGVkOiAnT3NxdWVyeSBpbnRlZ3JhdGlvbiBkaXNhYmxlZCcsXG4gICAgICAgICAgICAgIHJ1bl9kYWVtb246ICdBdXRvLXJ1biB0aGUgT3NxdWVyeSBkYWVtb24nLFxuICAgICAgICAgICAgICBhZGRfbGFiZWxzOiAnVXNlIGRlZmluZWQgbGFiZWxzIGFzIGRlY29yYXRvcnMnLFxuICAgICAgICAgICAgICBsb2dfcGF0aDogJ1BhdGggdG8gdGhlIE9zcXVlcnkgcmVzdWx0cyBsb2cgZmlsZScsXG4gICAgICAgICAgICAgIGNvbmZpZ19wYXRoOiAnUGF0aCB0byB0aGUgT3NxdWVyeSBjb25maWd1cmF0aW9uIGZpbGUnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgc3VidGl0bGU6ICdJbnZlbnRvcnkgZGF0YScsXG4gICAgICAgICAgZG9jdUxpbms6IHdlYkRvY3VtZW50YXRpb25MaW5rKCd1c2VyLW1hbnVhbC9yZWZlcmVuY2Uvb3NzZWMtY29uZi93b2RsZS1zeXNjb2xsZWN0b3IuaHRtbCcpLFxuICAgICAgICAgIGRlc2M6XG4gICAgICAgICAgICAnR2F0aGVyIHJlbGV2YW50IGluZm9ybWF0aW9uIGFib3V0IHRoZSBvcGVyYXRpbmcgc3lzdGVtLCBoYXJkd2FyZSwgbmV0d29ya2luZyBhbmQgcGFja2FnZXMnLFxuICAgICAgICAgIHdvZGxlOiBbeyBuYW1lOiAnc3lzY29sbGVjdG9yJyB9XSxcbiAgICAgICAgICBsYWJlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZGlzYWJsZWQ6ICdTeXNjb2xsZWN0b3IgaW50ZWdyYXRpb24gZGlzYWJsZWQnLFxuICAgICAgICAgICAgICAnc2Nhbi1vbi1zdGFydCc6ICdTY2FuIG9uIHN0YXJ0JyxcbiAgICAgICAgICAgICAgaW50ZXJ2YWw6ICdJbnRlcnZhbCBiZXR3ZWVuIHN5c3RlbSBzY2FucycsXG4gICAgICAgICAgICAgIG5ldHdvcms6ICdTY2FuIG5ldHdvcmsgaW50ZXJmYWNlcycsXG4gICAgICAgICAgICAgIG9zOiAnU2NhbiBvcGVyYXRpbmcgc3lzdGVtIGluZm8nLFxuICAgICAgICAgICAgICBoYXJkd2FyZTogJ1NjYW4gaGFyZHdhcmUgaW5mbycsXG4gICAgICAgICAgICAgIHBhY2thZ2VzOiAnU2NhbiBpbnN0YWxsZWQgcGFja2FnZXMnLFxuICAgICAgICAgICAgICBwb3J0czogJ1NjYW4gbGlzdGVuaW5nIG5ldHdvcmsgcG9ydHMnLFxuICAgICAgICAgICAgICBwb3J0c19hbGw6ICdTY2FuIGFsbCBuZXR3b3JrIHBvcnRzJyxcbiAgICAgICAgICAgICAgcHJvY2Vzc2VzOiAnU2NhbiBjdXJyZW50IHByb2Nlc3NlcydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzdWJ0aXRsZTogJ0FjdGl2ZSByZXNwb25zZScsXG4gICAgICAgICAgZG9jdUxpbms6IHdlYkRvY3VtZW50YXRpb25MaW5rKCd1c2VyLW1hbnVhbC9yZWZlcmVuY2Uvb3NzZWMtY29uZi9hY3RpdmUtcmVzcG9uc2UuaHRtbCcpLFxuICAgICAgICAgIGRlc2M6ICdBY3RpdmUgdGhyZWF0IGFkZHJlc3NpbmcgYnkgaW1tZWRpYXRlIHJlc3BvbnNlJyxcbiAgICAgICAgICBjb25maWc6IFt7IGNvbXBvbmVudDogJ2NvbScsIGNvbmZpZ3VyYXRpb246ICdhY3RpdmUtcmVzcG9uc2UnIH1dLFxuICAgICAgICAgIGxhYmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBkaXNhYmxlZDogJ0FjdGl2ZSByZXNwb25zZSBkaXNhYmxlZCcsXG4gICAgICAgICAgICAgIGNhX3N0b3JlOiAnVXNlIHRoZSBmb2xsb3dpbmcgbGlzdCBvZiByb290IENBIGNlcnRpZmljYXRlcycsXG4gICAgICAgICAgICAgIGNhX3ZlcmlmaWNhdGlvbjogJ1ZhbGlkYXRlIFdQS3MgdXNpbmcgcm9vdCBDQSBjZXJ0aWZpY2F0ZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzdWJ0aXRsZTogJ0NvbW1hbmRzJyxcbiAgICAgICAgICBkb2N1TGluazogd2ViRG9jdW1lbnRhdGlvbkxpbmsoJ3VzZXItbWFudWFsL3JlZmVyZW5jZS9vc3NlYy1jb25mL3dvZGxlLWNvbW1hbmQuaHRtbCcpLFxuICAgICAgICAgIGRlc2M6ICdDb25maWd1cmF0aW9uIG9wdGlvbnMgb2YgdGhlIENvbW1hbmQgd29kbGUnLFxuICAgICAgICAgIHdvZGxlOiBbeyBuYW1lOiAnY29tbWFuZCcgfV0sXG4gICAgICAgICAgbGFiZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGRpc2FibGVkOiAnQ29tbWFuZCBkaXNhYmxlZCcsXG4gICAgICAgICAgICAgIHJ1bl9vbl9zdGFydDogJ1J1biBvbiBzdGFydCcsXG4gICAgICAgICAgICAgIGlnbm9yZV9vdXRwdXQ6ICdJZ25vcmUgY29tbWFuZCBvdXRwdXQnLFxuICAgICAgICAgICAgICBza2lwX3ZlcmlmaWNhdGlvbjogJ0lnbm9yZSBjaGVja3N1bSB2ZXJpZmljYXRpb24nLFxuICAgICAgICAgICAgICBpbnRlcnZhbDogJ0ludGVydmFsIGJldHdlZW4gZXhlY3V0aW9ucycsXG4gICAgICAgICAgICAgIHRhZzogJ0NvbW1hbmQgbmFtZScsXG4gICAgICAgICAgICAgIGNvbW1hbmQ6ICdDb21tYW5kIHRvIGV4ZWN1dGUnLFxuICAgICAgICAgICAgICB2ZXJpZnlfbWQ1OiAnVmVyaWZ5IE1ENSBzdW0nLFxuICAgICAgICAgICAgICB2ZXJpZnlfc2hhMTogJ1ZlcmlmeSBTSEExIHN1bScsXG4gICAgICAgICAgICAgIHZlcmlmeV9zaGEyNTY6ICdWZXJpZnkgU0hBMjU2IHN1bSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzdWJ0aXRsZTogJ0RvY2tlciBsaXN0ZW5lcicsXG4gICAgICAgICAgZG9jdUxpbms6IHdlYkRvY3VtZW50YXRpb25MaW5rKCd1c2VyLW1hbnVhbC9yZWZlcmVuY2Uvb3NzZWMtY29uZi93b2RsZS1kb2NrZXIuaHRtbCcpLFxuICAgICAgICAgIGRlc2M6XG4gICAgICAgICAgICAnTW9uaXRvciBhbmQgY29sbGVjdCB0aGUgYWN0aXZpdHkgZnJvbSBEb2NrZXIgY29udGFpbmVycyBzdWNoIGFzIGNyZWF0aW9uLCBydW5uaW5nLCBzdGFydGluZywgc3RvcHBpbmcgb3IgcGF1c2luZyBldmVudHMnLFxuICAgICAgICAgIHdvZGxlOiBbeyBuYW1lOiAnZG9ja2VyLWxpc3RlbmVyJyB9XSxcbiAgICAgICAgICBsYWJlbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZGlzYWJsZWQ6ICdEb2NrZXIgbGlzdGVuZXIgZGlzYWJsZWQnLFxuICAgICAgICAgICAgICBydW5fb25fc3RhcnQ6XG4gICAgICAgICAgICAgICAgJ1J1biB0aGUgbGlzdGVuZXIgaW1tZWRpYXRlbHkgd2hlbiBzZXJ2aWNlIGlzIHN0YXJ0ZWQnLFxuICAgICAgICAgICAgICBpbnRlcnZhbDogJ1dhaXRpbmcgdGltZSB0byByZXJ1biB0aGUgbGlzdGVuZXIgaW4gY2FzZSBpdCBmYWlscycsXG4gICAgICAgICAgICAgIGF0dGVtcHRzOiAnTnVtYmVyIG9mIGF0dGVtcHRzIHRvIGV4ZWN1dGUgdGhlIGxpc3RlbmVyJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdMb2cgZGF0YSBhbmFseXNpcycsXG4gICAgICBzZWN0aW9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgc3VidGl0bGU6ICdMb2cgY29sbGVjdGlvbicsXG4gICAgICAgICAgZG9jdUxpbms6IHdlYkRvY3VtZW50YXRpb25MaW5rKCd1c2VyLW1hbnVhbC9jYXBhYmlsaXRpZXMvbG9nLWRhdGEtY29sbGVjdGlvbi9pbmRleC5odG1sJyksXG4gICAgICAgICAgZGVzYzpcbiAgICAgICAgICAgICdMb2cgYW5hbHlzaXMgZnJvbSB0ZXh0IGZpbGVzLCBXaW5kb3dzIGV2ZW50cyBvciBzeXNsb2cgb3V0cHV0cycsXG4gICAgICAgICAgY29uZmlnOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNvbXBvbmVudDogJ2xvZ2NvbGxlY3RvcicsXG4gICAgICAgICAgICAgIGNvbmZpZ3VyYXRpb246ICdsb2NhbGZpbGUnLFxuICAgICAgICAgICAgICBmaWx0ZXJCeTogJ2xvZ2Zvcm1hdCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IGNvbXBvbmVudDogJ2xvZ2NvbGxlY3RvcicsIGNvbmZpZ3VyYXRpb246ICdzb2NrZXQnIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIGxhYmVsczogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBsb2dmb3JtYXQ6ICdMb2cgZm9ybWF0JyxcbiAgICAgICAgICAgICAgbG9nX2Zvcm1hdDogJ0xvZyBmb3JtYXQnLFxuICAgICAgICAgICAgICBhbGlhczogJ0NvbW1hbmQgYWxpYXMnLFxuICAgICAgICAgICAgICBpZ25vcmVfYmluYXJpZXM6ICdJZ25vcmUgYmluYXJpZXMnLFxuICAgICAgICAgICAgICB0YXJnZXQ6ICdSZWRpcmVjdCBvdXRwdXQgdG8gdGhpcyBzb2NrZXQnLFxuICAgICAgICAgICAgICBmcmVxdWVuY3k6ICdJbnRlcnZhbCBiZXR3ZWVuIGNvbW1hbmQgZXhlY3V0aW9ucycsXG4gICAgICAgICAgICAgIGZpbGU6ICdMb2cgbG9jYXRpb24nLFxuICAgICAgICAgICAgICBsb2NhdGlvbjogJ0xvZyBsb2NhdGlvbicsXG4gICAgICAgICAgICAgIHNvY2tldDogJ091dHB1dCBzb2NrZXRzJyxcbiAgICAgICAgICAgICAgc3lzbG9nOiAnU3lzbG9nJyxcbiAgICAgICAgICAgICAgY29tbWFuZDogJ0NvbW1hbmQnLFxuICAgICAgICAgICAgICBmdWxsX2NvbW1hbmQ6ICdGdWxsIGNvbW1hbmQnLFxuICAgICAgICAgICAgICBhdWRpdDogJ0F1ZGl0J1xuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgb3B0aW9uczogeyBoaWRlSGVhZGVyOiB0cnVlIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHN1YnRpdGxlOiAnSW50ZWdyaXR5IG1vbml0b3JpbmcnLFxuICAgICAgICAgIGRvY3VMaW5rOiB3ZWJEb2N1bWVudGF0aW9uTGluaygndXNlci1tYW51YWwvcmVmZXJlbmNlL29zc2VjLWNvbmYvc3lzY2hlY2suaHRtbCcpLFxuICAgICAgICAgIGRlc2M6XG4gICAgICAgICAgICAnSWRlbnRpZnkgY2hhbmdlcyBpbiBjb250ZW50LCBwZXJtaXNzaW9ucywgb3duZXJzaGlwLCBhbmQgYXR0cmlidXRlcyBvZiBmaWxlcycsXG4gICAgICAgICAgY29uZmlnOiBbXG4gICAgICAgICAgICB7IGNvbXBvbmVudDogJ3N5c2NoZWNrJywgY29uZmlndXJhdGlvbjogJ3N5c2NoZWNrJywgbWF0cml4OiB0cnVlIH1cbiAgICAgICAgICBdLFxuICAgICAgICAgIHRhYnM6IFsnR2VuZXJhbCcsJ1dobyBkYXRhJ10sXG4gICAgICAgICAgbGFiZWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGRpc2FibGVkOiAnSW50ZWdyaXR5IG1vbml0b3JpbmcgZGlzYWJsZWQnLFxuICAgICAgICAgICAgICBmcmVxdWVuY3k6ICdJbnRlcnZhbCAoaW4gc2Vjb25kcykgdG8gcnVuIHRoZSBpbnRlZ3JpdHkgc2NhbicsXG4gICAgICAgICAgICAgIHNraXBfbmZzOiAnU2tpcCBzY2FuIG9uIENJRlMvTkZTIG1vdW50cycsXG4gICAgICAgICAgICAgIHNjYW5fb25fc3RhcnQ6ICdTY2FuIG9uIHN0YXJ0JyxcbiAgICAgICAgICAgICAgZGlyZWN0b3JpZXM6ICdNb25pdG9yZWQgZGlyZWN0b3JpZXMnLFxuICAgICAgICAgICAgICBub2RpZmY6ICdObyBkaWZmIGRpcmVjdG9yaWVzJyxcbiAgICAgICAgICAgICAgaWdub3JlOiAnSWdub3JlZCBmaWxlcyBhbmQgZGlyZWN0b3JpZXMnLFxuICAgICAgICAgICAgICByZXN0YXJ0X2F1ZGl0OiAnUmVzdGFydCBhdWRpdCcsXG4gICAgICAgICAgICAgIHN0YXJ0dXBfaGVhbHRoY2hlY2s6ICdTdGFydHVwIGhlYWx0aGNoZWNrJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIF0sXG4gICAgICAgICAgb3B0czoge1xuICAgICAgICAgICAgcmVhbHRpbWU6ICdSVCcsXG4gICAgICAgICAgICBjaGVja193aG9kYXRhOiAnV0QnLFxuICAgICAgICAgICAgcmVwb3J0X2NoYW5nZXM6ICdDaGFuZ2VzJyxcbiAgICAgICAgICAgIGNoZWNrX21kNXN1bTogJ01ENScsXG4gICAgICAgICAgICBjaGVja19zaGExc3VtOiAnU0hBMScsXG4gICAgICAgICAgICBjaGVja19wZXJtOiAnUGVyLicsXG4gICAgICAgICAgICBjaGVja19zaXplOiAnU2l6ZScsXG4gICAgICAgICAgICBjaGVja19vd25lcjogJ093bmVyJyxcbiAgICAgICAgICAgIGNoZWNrX2dyb3VwOiAnR3JvdXAnLFxuICAgICAgICAgICAgY2hlY2tfbXRpbWU6ICdNVCcsXG4gICAgICAgICAgICBjaGVja19pbm9kZTogJ0lub2RlJyxcbiAgICAgICAgICAgIGNoZWNrX3NoYTI1NnN1bTogJ1NIQTI1NicsXG4gICAgICAgICAgICBmb2xsb3dfc3ltYm9saWNfbGluazogJ1NMJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgXVxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBQUEsa0JBQUEsR0FBQUMsT0FBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxNQUFNQyxrQkFBa0IsR0FBQUMsT0FBQSxDQUFBRCxrQkFBQSxHQUFHO0VBQ2hDRSxjQUFjLEVBQUUsQ0FDZDtJQUNFQyxLQUFLLEVBQUUscUJBQXFCO0lBQzVCQyxRQUFRLEVBQUUsQ0FDUjtNQUNFQyxRQUFRLEVBQUUsc0JBQXNCO01BQ2hDQyxJQUFJLEVBQUUsMENBQTBDO01BQ2hEQyxNQUFNLEVBQUUsQ0FBQztRQUFFQyxTQUFTLEVBQUUsS0FBSztRQUFFQyxhQUFhLEVBQUU7TUFBVSxDQUFDLENBQUM7TUFDeERDLE1BQU0sRUFBRSxDQUNOO1FBQ0VDLEtBQUssRUFBRSxtQ0FBbUM7UUFDMUNDLElBQUksRUFBRSxvQ0FBb0M7UUFDMUNDLE1BQU0sRUFBRTtNQUNWLENBQUM7SUFFTCxDQUFDLEVBQ0Q7TUFDRVIsUUFBUSxFQUFFLGVBQWU7TUFDekJTLFFBQVEsRUFBRSxJQUFBQyx1Q0FBb0IsRUFBQyw4Q0FBOEMsQ0FBQztNQUM5RVQsSUFBSSxFQUFFLHFEQUFxRDtN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