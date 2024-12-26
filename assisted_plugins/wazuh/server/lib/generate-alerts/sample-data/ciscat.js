"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ruleTitle = exports.result = exports.group = exports.benchmark = void 0;
/*
 * Wazuh app - CIS-CAT sample data
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

// CIS-CAT
// More info https://documentation.wazuh.com/3.12/user-manual/capabilities/policy-monitoring/ciscat/ciscat.html
const ruleTitle = exports.ruleTitle = ["CIS-CAT 1", "CIS-CAT 2", "CIS-CAT 3", "CIS-CAT 4", "CIS-CAT 5", "CIS-CAT 6"];
const group = exports.group = ["Access, Authentication and Authorization", "Logging and Auditing"];
const benchmark = exports.benchmark = ["CIS Ubuntu Linux 16.04 LTS Benchmark"]; // TODO: add more benchmarks
const result = exports.result = ["fail", "errors", "pass", "unknown", "notchecked"];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJydWxlVGl0bGUiLCJleHBvcnRzIiwiZ3JvdXAiLCJiZW5jaG1hcmsiLCJyZXN1bHQiXSwic291cmNlcyI6WyJjaXNjYXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFdhenVoIGFwcCAtIENJUy1DQVQgc2FtcGxlIGRhdGFcbiAqIENvcHlyaWdodCAoQykgMjAxNS0yMDIyIFdhenVoLCBJbmMuXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU7IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uOyBlaXRoZXIgdmVyc2lvbiAyIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBGaW5kIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhpcyBvbiB0aGUgTElDRU5TRSBmaWxlLlxuICovXG5cbiAvLyBDSVMtQ0FUXG4vLyBNb3JlIGluZm8gaHR0cHM6Ly9kb2N1bWVudGF0aW9uLndhenVoLmNvbS8zLjEyL3VzZXItbWFudWFsL2NhcGFiaWxpdGllcy9wb2xpY3ktbW9uaXRvcmluZy9jaXNjYXQvY2lzY2F0Lmh0bWxcbmV4cG9ydCBjb25zdCBydWxlVGl0bGUgPSBbXCJDSVMtQ0FUIDFcIiwgXCJDSVMtQ0FUIDJcIiwgXCJDSVMtQ0FUIDNcIiwgXCJDSVMtQ0FUIDRcIiwgXCJDSVMtQ0FUIDVcIiwgXCJDSVMtQ0FUIDZcIl07XG5leHBvcnQgY29uc3QgZ3JvdXAgPSBbXCJBY2Nlc3MsIEF1dGhlbnRpY2F0aW9uIGFuZCBBdXRob3JpemF0aW9uXCIsIFwiTG9nZ2luZyBhbmQgQXVkaXRpbmdcIl07XG5leHBvcnQgY29uc3QgYmVuY2htYXJrID0gW1wiQ0lTIFVidW50dSBMaW51eCAxNi4wNCBMVFMgQmVuY2htYXJrXCJdOyAvLyBUT0RPOiBhZGQgbW9yZSBiZW5jaG1hcmtzXG5leHBvcnQgY29uc3QgcmVzdWx0ID0gW1wiZmFpbFwiLCBcImVycm9yc1wiLCBcInBhc3NcIiwgXCJ1bmtub3duXCIsIFwibm90Y2hlY2tlZFwiXTsiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUM7QUFDRDtBQUNPLE1BQU1BLFNBQVMsR0FBQUMsT0FBQSxDQUFBRCxTQUFBLEdBQUcsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQztBQUNoRyxNQUFNRSxLQUFLLEdBQUFELE9BQUEsQ0FBQUMsS0FBQSxHQUFHLENBQUMsMENBQTBDLEVBQUUsc0JBQXNCLENBQUM7QUFDbEYsTUFBTUMsU0FBUyxHQUFBRixPQUFBLENBQUFFLFNBQUEsR0FBRyxDQUFDLHNDQUFzQyxDQUFDLENBQUMsQ0FBQztBQUM1RCxNQUFNQyxNQUFNLEdBQUFILE9BQUEsQ0FBQUcsTUFBQSxHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFlBQVksQ0FBQyJ9