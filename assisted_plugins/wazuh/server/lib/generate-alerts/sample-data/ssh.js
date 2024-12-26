"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reverseLoockupError = exports.possibleBreakinAttempt = exports.possibleAttackServer = exports.insecureConnectionAttempt = exports.data = void 0;
/*
 * Wazuh app - SSH sample data
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

const reverseLoockupError = exports.reverseLoockupError = {
  location: "/var/log/secure",
  rule: {
    "mail": false,
    "level": 5,
    "pci_dss": ["11.4"],
    "description": "sshd: Reverse lookup error (bad ISP or attack).",
    "groups": ["syslog", "sshd"],
    "mitre": {
      "tactic": ["Lateral Movement"],
      "id": ["T1021"]
    },
    "id": "5702",
    "nist_800_53": ["SI.4"],
    "gpg13": ["4.12"],
    "gdpr": ["IV_35.7.d"]
  },
  full_log: "{predecoder.timestamp} {predecoder.hostname} sshd[15409]: reverse mapping checking getaddrinfo for {data.srcip}.static.impsat.com.co [{data.srcip}] failed - POSSIBLE BREAK-IN ATTEMPT!"
};
const insecureConnectionAttempt = exports.insecureConnectionAttempt = {
  rule: {
    mail: false,
    level: 6,
    pci_dss: ["11.4"],
    description: "sshd: insecure connection attempt (scan).",
    groups: ["syslog", "sshd", "recon"],
    id: "5706",
    nist_800_53: ["SI.4"],
    gpg13: ["4.12"],
    gdpr: ["IV_35.7.d"]
  },
  full_log: "{predecoder.timestamp} {predecoder.hostname} sshd[15225]: Did not receive identification string from {data.srcip} port {data.srcport}",
  location: "/var/log/secure"
};
const possibleAttackServer = exports.possibleAttackServer = {
  rule: {
    mail: false,
    level: 8,
    pci_dss: ["11.4"],
    description: "sshd: Possible attack on the ssh server (or version gathering).",
    groups: ["syslog", "sshd", "recon"],
    mitre: {
      tactic: ["Lateral Movement"],
      technique: ["Brute Force", "Remove Services"],
      id: ["T1021"]
    },
    id: "5701",
    nist_800_53: ["SI.4"],
    gpg13: ["4.12"],
    gdpr: ["IV_35.7.d"]
  },
  location: "/var/log/secure",
  full_log: "{predecoder.timestamp} {predecoder.hostname} sshd[15122]: Bad protocol version identification '\\003' from {data.srcip} port {data.srcport}"
};
const possibleBreakinAttempt = exports.possibleBreakinAttempt = {
  rule: {
    mail: false,
    level: 10,
    pci_dss: ["11.4"],
    description: "sshd: Possible breakin attempt (high number of reverse lookup errors).",
    groups: ["syslog", "sshd"],
    mitre: {
      tactic: ["Lateral Movement"],
      technique: ["Brute Force", "Remove Services"],
      id: ["T1021"]
    },
    id: "5703",
    nist_800_53: ["SI.4"],
    frequency: 6,
    gpg13: ["4.12"],
    gdpr: ["IV_35.7.d"]
  },
  location: "/var/log/secure",
  full_log: "{predecoder.timestamp} {predecoder.hostname} sshd[10385]: reverse mapping checking getaddrinfo for . [{data.srcip}] failed - POSSIBLE BREAK-IN ATTEMPT!"
};
const data = exports.data = [reverseLoockupError, insecureConnectionAttempt, possibleAttackServer, possibleBreakinAttempt];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJyZXZlcnNlTG9vY2t1cEVycm9yIiwiZXhwb3J0cyIsImxvY2F0aW9uIiwicnVsZSIsImZ1bGxfbG9nIiwiaW5zZWN1cmVDb25uZWN0aW9uQXR0ZW1wdCIsIm1haWwiLCJsZXZlbCIsInBjaV9kc3MiLCJkZXNjcmlwdGlvbiIsImdyb3VwcyIsImlkIiwibmlzdF84MDBfNTMiLCJncGcxMyIsImdkcHIiLCJwb3NzaWJsZUF0dGFja1NlcnZlciIsIm1pdHJlIiwidGFjdGljIiwidGVjaG5pcXVlIiwicG9zc2libGVCcmVha2luQXR0ZW1wdCIsImZyZXF1ZW5jeSIsImRhdGEiXSwic291cmNlcyI6WyJzc2guanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFdhenVoIGFwcCAtIFNTSCBzYW1wbGUgZGF0YVxuICogQ29weXJpZ2h0IChDKSAyMDE1LTIwMjIgV2F6dWgsIEluYy5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTsgeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb247IGVpdGhlciB2ZXJzaW9uIDIgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEZpbmQgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCB0aGlzIG9uIHRoZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuZXhwb3J0IGNvbnN0IHJldmVyc2VMb29ja3VwRXJyb3IgPSB7XG4gIGxvY2F0aW9uOiBcIi92YXIvbG9nL3NlY3VyZVwiLFxuICBydWxlOiB7XG4gICAgXCJtYWlsXCI6IGZhbHNlLFxuICAgIFwibGV2ZWxcIjogNSxcbiAgICBcInBjaV9kc3NcIjogW1wiMTEuNFwiXSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwic3NoZDogUmV2ZXJzZSBsb29rdXAgZXJyb3IgKGJhZCBJU1Agb3IgYXR0YWNrKS5cIixcbiAgICBcImdyb3Vwc1wiOiBbXCJzeXNsb2dcIixcInNzaGRcIl0sXG4gICAgXCJtaXRyZVwiOiB7XG4gICAgICBcInRhY3RpY1wiOiBbXCJMYXRlcmFsIE1vdmVtZW50XCJdLFxuICAgICAgXCJpZFwiOiBbXCJUMTAyMVwiXVxuICAgIH0sXG4gICAgXCJpZFwiOiBcIjU3MDJcIixcbiAgICBcIm5pc3RfODAwXzUzXCI6IFtcIlNJLjRcIl0sXG4gICAgXCJncGcxM1wiOiBbXCI0LjEyXCJdLFxuICAgIFwiZ2RwclwiOiBbXCJJVl8zNS43LmRcIl1cbiAgfSxcbiAgZnVsbF9sb2c6IFwie3ByZWRlY29kZXIudGltZXN0YW1wfSB7cHJlZGVjb2Rlci5ob3N0bmFtZX0gc3NoZFsxNTQwOV06IHJldmVyc2UgbWFwcGluZyBjaGVja2luZyBnZXRhZGRyaW5mbyBmb3Ige2RhdGEuc3JjaXB9LnN0YXRpYy5pbXBzYXQuY29tLmNvIFt7ZGF0YS5zcmNpcH1dIGZhaWxlZCAtIFBPU1NJQkxFIEJSRUFLLUlOIEFUVEVNUFQhXCJcbn07XG5cbmV4cG9ydCBjb25zdCBpbnNlY3VyZUNvbm5lY3Rpb25BdHRlbXB0ID0ge1xuICBydWxlOiB7XG4gICAgbWFpbDogZmFsc2UsXG4gICAgbGV2ZWw6IDYsXG4gICAgcGNpX2RzczogW1wiMTEuNFwiXSxcbiAgICBkZXNjcmlwdGlvbjogXCJzc2hkOiBpbnNlY3VyZSBjb25uZWN0aW9uIGF0dGVtcHQgKHNjYW4pLlwiLFxuICAgIGdyb3VwczogW1wic3lzbG9nXCIsXCJzc2hkXCIsXCJyZWNvblwiXSxcbiAgICBpZDogXCI1NzA2XCIsXG4gICAgbmlzdF84MDBfNTM6IFtcIlNJLjRcIl0sXG4gICAgZ3BnMTM6IFtcIjQuMTJcIl0sXG4gICAgZ2RwcjogW1wiSVZfMzUuNy5kXCJdXG4gIH0sXG4gIGZ1bGxfbG9nOiBcIntwcmVkZWNvZGVyLnRpbWVzdGFtcH0ge3ByZWRlY29kZXIuaG9zdG5hbWV9IHNzaGRbMTUyMjVdOiBEaWQgbm90IHJlY2VpdmUgaWRlbnRpZmljYXRpb24gc3RyaW5nIGZyb20ge2RhdGEuc3JjaXB9IHBvcnQge2RhdGEuc3JjcG9ydH1cIixcbiAgbG9jYXRpb246IFwiL3Zhci9sb2cvc2VjdXJlXCJcbn07XG5cbmV4cG9ydCBjb25zdCBwb3NzaWJsZUF0dGFja1NlcnZlciA9IHtcbiAgcnVsZToge1xuICAgIG1haWw6IGZhbHNlLFxuICAgIGxldmVsOiA4LFxuICAgIHBjaV9kc3M6IFtcIjExLjRcIl0sXG4gICAgZGVzY3JpcHRpb246IFwic3NoZDogUG9zc2libGUgYXR0YWNrIG9uIHRoZSBzc2ggc2VydmVyIChvciB2ZXJzaW9uIGdhdGhlcmluZykuXCIsXG4gICAgZ3JvdXBzOiBbXCJzeXNsb2dcIixcInNzaGRcIixcInJlY29uXCJdLFxuICAgIG1pdHJlOiB7XG4gICAgICB0YWN0aWM6IFtcIkxhdGVyYWwgTW92ZW1lbnRcIl0sXG4gICAgICB0ZWNobmlxdWU6IFtcIkJydXRlIEZvcmNlXCIsXCJSZW1vdmUgU2VydmljZXNcIl0sXG4gICAgICBpZDogW1wiVDEwMjFcIl1cbiAgICB9LFxuICAgIGlkOiBcIjU3MDFcIixcbiAgICBuaXN0XzgwMF81MzogW1wiU0kuNFwiXSxcbiAgICBncGcxMzogW1wiNC4xMlwiXSxcbiAgICBnZHByOiBbXCJJVl8zNS43LmRcIl1cbiAgfSxcbiAgbG9jYXRpb246IFwiL3Zhci9sb2cvc2VjdXJlXCIsXG4gIGZ1bGxfbG9nOiBcIntwcmVkZWNvZGVyLnRpbWVzdGFtcH0ge3ByZWRlY29kZXIuaG9zdG5hbWV9IHNzaGRbMTUxMjJdOiBCYWQgcHJvdG9jb2wgdmVyc2lvbiBpZGVudGlmaWNhdGlvbiAnXFxcXDAwMycgZnJvbSB7ZGF0YS5zcmNpcH0gcG9ydCB7ZGF0YS5zcmNwb3J0fVwiLFxufVxuXG5leHBvcnQgY29uc3QgcG9zc2libGVCcmVha2luQXR0ZW1wdCA9IHtcbiAgcnVsZToge1xuICAgIG1haWw6IGZhbHNlLFxuICAgIGxldmVsOiAxMCxcbiAgICBwY2lfZHNzOiBbXCIxMS40XCJdLFxuICAgIGRlc2NyaXB0aW9uOiBcInNzaGQ6IFBvc3NpYmxlIGJyZWFraW4gYXR0ZW1wdCAoaGlnaCBudW1iZXIgb2YgcmV2ZXJzZSBsb29rdXAgZXJyb3JzKS5cIixcbiAgICBncm91cHM6IFtcInN5c2xvZ1wiLFwic3NoZFwiXSxcbiAgICBtaXRyZToge1xuICAgICAgdGFjdGljOiBbXCJMYXRlcmFsIE1vdmVtZW50XCJdLFxuICAgICAgdGVjaG5pcXVlOiBbXCJCcnV0ZSBGb3JjZVwiLFwiUmVtb3ZlIFNlcnZpY2VzXCJdLFxuICAgICAgaWQ6IFtcIlQxMDIxXCJdXG4gICAgfSxcbiAgICBpZDogXCI1NzAzXCIsXG4gICAgbmlzdF84MDBfNTM6IFtcIlNJLjRcIl0sXG4gICAgZnJlcXVlbmN5OiA2LFxuICAgIGdwZzEzOiBbXCI0LjEyXCJdLFxuICAgIGdkcHI6IFtcIklWXzM1LjcuZFwiXVxuICB9LFxuICBsb2NhdGlvbjogXCIvdmFyL2xvZy9zZWN1cmVcIixcbiAgZnVsbF9sb2c6IFwie3ByZWRlY29kZXIudGltZXN0YW1wfSB7cHJlZGVjb2Rlci5ob3N0bmFtZX0gc3NoZFsxMDM4NV06IHJldmVyc2UgbWFwcGluZyBjaGVja2luZyBnZXRhZGRyaW5mbyBmb3IgLiBbe2RhdGEuc3JjaXB9XSBmYWlsZWQgLSBQT1NTSUJMRSBCUkVBSy1JTiBBVFRFTVBUIVwiLFxufTtcblxuZXhwb3J0IGNvbnN0IGRhdGEgPSBbcmV2ZXJzZUxvb2NrdXBFcnJvciwgaW5zZWN1cmVDb25uZWN0aW9uQXR0ZW1wdCwgcG9zc2libGVBdHRhY2tTZXJ2ZXIsIHBvc3NpYmxlQnJlYWtpbkF0dGVtcHRdOyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTyxNQUFNQSxtQkFBbUIsR0FBQUMsT0FBQSxDQUFBRCxtQkFBQSxHQUFHO0VBQ2pD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