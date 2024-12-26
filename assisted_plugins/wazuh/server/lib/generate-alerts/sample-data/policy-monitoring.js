"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trojansData = exports.trojans = exports.title = exports.ruleDescription = exports.rootkitsData = exports.rootkits = exports.location = exports.decoder = void 0;
/*
 * Wazuh app - Policy monitoring sample alerts
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

// Policy monitoring
const title = exports.title = ["Trojaned version of file detected."];
const ruleDescription = exports.ruleDescription = ["Host-based anomaly detection event (rootcheck).", "System Audit event."];
const location = exports.location = 'rootcheck';
const decoder = exports.decoder = {
  name: "rootcheck"
};
const rootkits = exports.rootkits = {
  Bash: ['/tmp/mcliZokhb', '/tmp/mclzaKmfa'],
  Adore: ['/dev/.shit/red.tgz', '/usr/lib/libt', '/usr/bin/adore'],
  TRK: ['usr/bin/soucemask', '/usr/bin/sourcemask'],
  Volc: ['/usr/lib/volc', '/usr/bin/volc'],
  Ramen: ['/usr/lib/ldlibps.so', '/usr/lib/ldliblogin.so', '/tmp/ramen.tgz'],
  Monkit: ['/lib/defs', '/usr/lib/libpikapp.a'],
  RSHA: ['usr/bin/kr4p', 'usr/bin/n3tstat', 'usr/bin/chsh2'],
  Omega: ['/dev/chr'],
  "Rh-Sharpe": ['/usr/bin/.ps', '/bin/.lpstree', '/bin/ldu', '/bin/lkillall'],
  Showtee: ['/usr/lib/.wormie', '/usr/lib/.kinetic', '/usr/include/addr.h'],
  LDP: ['/dev/.kork', '/bin/.login', '/bin/.ps'],
  Slapper: ['/tmp/.bugtraq', '/tmp/.bugtraq.c', '/tmp/.b', '/tmp/httpd', '/tmp/.font-unix/.cinik'],
  Knark: ['/dev/.pizda', '/proc/knark'],
  ZK: ['/usr/share/.zk', 'etc/1ssue.net', 'usr/X11R6/.zk/xfs'],
  Suspicious: ['etc/rc.d/init.d/rc.modules', 'lib/ldd.so', 'usr/bin/ddc', 'usr/bin/ishit', 'lib/.so', 'usr/bin/atm', 'tmp/.cheese', 'dev/srd0', 'dev/hd7', 'usr/man/man3/psid']
};
const rootkitsData = exports.rootkitsData = {
  "data": {
    "title": "Rootkit '{_rootkit_category}' detected by the presence of file '{_rootkit_file}'."
  },
  "rule": {
    "firedtimes": 1,
    "mail": false,
    "level": 7,
    "description": "Host-based anomaly detection event (rootcheck).",
    "groups": ["wazuh", "rootcheck"],
    "id": "510",
    "gdpr": ["IV_35.7.d"]
  },
  "full_log": "Rootkit '{_rootkit_category}' detected by the presence of file '{_rootkit_file}'."
};
const trojans = exports.trojans = [{
  file: '/usr/bin/grep',
  signature: 'bash|givemer'
}, {
  file: '/usr/bin/egrep',
  signature: 'bash|^/bin/sh|file\.h|proc\.h|/dev/|^/bin/.*sh'
}, {
  file: '/usr/bin/find',
  signature: 'bash|/dev/[^tnlcs]|/prof|/home/virus|file\.h'
}, {
  file: '/usr/bin/lsof',
  signature: '/prof|/dev/[^apcmnfk]|proc\.h|bash|^/bin/sh|/dev/ttyo|/dev/ttyp'
}, {
  file: '/usr/bin/netstat',
  signature: 'bash|^/bin/sh|/dev/[^aik]|/prof|grep|addr\.h'
}, {
  file: '/usr/bin/top',
  signature: '/dev/[^npi3st%]|proc\.h|/prof/'
}, {
  file: '/usr/bin/ps',
  signature: '/dev/ttyo|\.1proc|proc\.h|bash|^/bin/sh'
}, {
  file: '/usr/bin/tcpdump',
  signature: 'bash|^/bin/sh|file\.h|proc\.h|/dev/[^bu]|^/bin/.*sh'
}, {
  file: '/usr/bin/pidof',
  signature: 'bash|^/bin/sh|file\.h|proc\.h|/dev/[^f]|^/bin/.*sh'
}, {
  file: '/usr/bin/fuser',
  signature: 'bash|^/bin/sh|file\.h|proc\.h|/dev/[a-dtz]|^/bin/.*sh'
}, {
  file: '/usr/bin/w',
  signature: 'uname -a|proc\.h|bash'
}];
const trojansData = exports.trojansData = {
  "rule": {
    "firedtimes": 2,
    "mail": false,
    "level": 7,
    "description": "Host-based anomaly detection event (rootcheck).",
    "groups": ["wazuh", "rootcheck"],
    "id": "510",
    "gdpr": ["IV_35.7.d"]
  },
  "full_log": "Trojaned version of file '{data.file}' detected. Signature used: '{_trojan_signature}' (Generic)."
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJ0aXRsZSIsImV4cG9ydHMiLCJydWxlRGVzY3JpcHRpb24iLCJsb2NhdGlvbiIsImRlY29kZXIiLCJuYW1lIiwicm9vdGtpdHMiLCJCYXNoIiwiQWRvcmUiLCJUUksiLCJWb2xjIiwiUmFtZW4iLCJNb25raXQiLCJSU0hBIiwiT21lZ2EiLCJTaG93dGVlIiwiTERQIiwiU2xhcHBlciIsIktuYXJrIiwiWksiLCJTdXNwaWNpb3VzIiwicm9vdGtpdHNEYXRhIiwidHJvamFucyIsImZpbGUiLCJzaWduYXR1cmUiLCJ0cm9qYW5zRGF0YSJdLCJzb3VyY2VzIjpbInBvbGljeS1tb25pdG9yaW5nLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBXYXp1aCBhcHAgLSBQb2xpY3kgbW9uaXRvcmluZyBzYW1wbGUgYWxlcnRzXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTUtMjAyMiBXYXp1aCwgSW5jLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOyB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbjsgZWl0aGVyIHZlcnNpb24gMiBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogRmluZCBtb3JlIGluZm9ybWF0aW9uIGFib3V0IHRoaXMgb24gdGhlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG4vLyBQb2xpY3kgbW9uaXRvcmluZ1xuZXhwb3J0IGNvbnN0IHRpdGxlID0gW1wiVHJvamFuZWQgdmVyc2lvbiBvZiBmaWxlIGRldGVjdGVkLlwiXTtcbmV4cG9ydCBjb25zdCBydWxlRGVzY3JpcHRpb24gPSBbXCJIb3N0LWJhc2VkIGFub21hbHkgZGV0ZWN0aW9uIGV2ZW50IChyb290Y2hlY2spLlwiLCBcIlN5c3RlbSBBdWRpdCBldmVudC5cIl07XG5cbmV4cG9ydCBjb25zdCBsb2NhdGlvbiA9ICdyb290Y2hlY2snO1xuXG5leHBvcnQgY29uc3QgZGVjb2RlciA9IHtcbiAgbmFtZTogXCJyb290Y2hlY2tcIlxufTtcblxuZXhwb3J0IGNvbnN0IHJvb3RraXRzID0ge1xuICBCYXNoOiBbJy90bXAvbWNsaVpva2hiJywgJy90bXAvbWNsemFLbWZhJ10sXG4gIEFkb3JlOiBbJy9kZXYvLnNoaXQvcmVkLnRneicsICcvdXNyL2xpYi9saWJ0JywgJy91c3IvYmluL2Fkb3JlJ10sXG4gIFRSSzogWyd1c3IvYmluL3NvdWNlbWFzaycsJy91c3IvYmluL3NvdXJjZW1hc2snXSxcbiAgVm9sYzogWycvdXNyL2xpYi92b2xjJywgJy91c3IvYmluL3ZvbGMnXSxcbiAgUmFtZW46IFsnL3Vzci9saWIvbGRsaWJwcy5zbycsJy91c3IvbGliL2xkbGlibG9naW4uc28nLCAnL3RtcC9yYW1lbi50Z3onXSxcbiAgTW9ua2l0OiBbJy9saWIvZGVmcycsICcvdXNyL2xpYi9saWJwaWthcHAuYSddLFxuICBSU0hBOiBbJ3Vzci9iaW4va3I0cCcsICd1c3IvYmluL24zdHN0YXQnLCAndXNyL2Jpbi9jaHNoMiddLFxuICBPbWVnYTogWycvZGV2L2NociddLFxuICBcIlJoLVNoYXJwZVwiOiBbJy91c3IvYmluLy5wcycsICcvYmluLy5scHN0cmVlJywgJy9iaW4vbGR1JywgJy9iaW4vbGtpbGxhbGwnXSxcbiAgU2hvd3RlZTogWycvdXNyL2xpYi8ud29ybWllJywnL3Vzci9saWIvLmtpbmV0aWMnLCcvdXNyL2luY2x1ZGUvYWRkci5oJ10sXG4gIExEUDogWycvZGV2Ly5rb3JrJywgJy9iaW4vLmxvZ2luJywgJy9iaW4vLnBzJ10sXG4gIFNsYXBwZXI6IFsnL3RtcC8uYnVndHJhcScsJy90bXAvLmJ1Z3RyYXEuYycsICcvdG1wLy5iJywgJy90bXAvaHR0cGQnLCAnL3RtcC8uZm9udC11bml4Ly5jaW5payddLFxuICBLbmFyazogWycvZGV2Ly5waXpkYScsICcvcHJvYy9rbmFyayddLFxuICBaSzogWycvdXNyL3NoYXJlLy56aycsICdldGMvMXNzdWUubmV0JywgJ3Vzci9YMTFSNi8uemsveGZzJ10sXG4gIFN1c3BpY2lvdXM6IFsnZXRjL3JjLmQvaW5pdC5kL3JjLm1vZHVsZXMnLCAnbGliL2xkZC5zbycsICd1c3IvYmluL2RkYycsICd1c3IvYmluL2lzaGl0JywgJ2xpYi8uc28nLCAndXNyL2Jpbi9hdG0nLCAndG1wLy5jaGVlc2UnLCAnZGV2L3NyZDAnLCAnZGV2L2hkNycsICd1c3IvbWFuL21hbjMvcHNpZCddXG59O1xuXG5leHBvcnQgY29uc3Qgcm9vdGtpdHNEYXRhID0ge1xuICBcImRhdGFcIjoge1xuICAgIFwidGl0bGVcIjogXCJSb290a2l0ICd7X3Jvb3RraXRfY2F0ZWdvcnl9JyBkZXRlY3RlZCBieSB0aGUgcHJlc2VuY2Ugb2YgZmlsZSAne19yb290a2l0X2ZpbGV9Jy5cIlxuICB9LFxuICBcInJ1bGVcIjoge1xuICAgIFwiZmlyZWR0aW1lc1wiOiAxLFxuICAgIFwibWFpbFwiOiBmYWxzZSxcbiAgICBcImxldmVsXCI6IDcsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkhvc3QtYmFzZWQgYW5vbWFseSBkZXRlY3Rpb24gZXZlbnQgKHJvb3RjaGVjaykuXCIsXG4gICAgXCJncm91cHNcIjogW1wid2F6dWhcIixcInJvb3RjaGVja1wiXSxcbiAgICBcImlkXCI6IFwiNTEwXCIsXG4gICAgXCJnZHByXCI6IFtcIklWXzM1LjcuZFwiXVxuICB9LFxuICBcImZ1bGxfbG9nXCI6IFwiUm9vdGtpdCAne19yb290a2l0X2NhdGVnb3J5fScgZGV0ZWN0ZWQgYnkgdGhlIHByZXNlbmNlIG9mIGZpbGUgJ3tfcm9vdGtpdF9maWxlfScuXCIsXG59O1xuXG5leHBvcnQgY29uc3QgdHJvamFucyA9IFtcbiAge2ZpbGU6ICcvdXNyL2Jpbi9ncmVwJywgc2lnbmF0dXJlOiAnYmFzaHxnaXZlbWVyJ30sXG4gIHtmaWxlOiAnL3Vzci9iaW4vZWdyZXAnLCBzaWduYXR1cmU6ICdiYXNofF4vYmluL3NofGZpbGVcXC5ofHByb2NcXC5ofC9kZXYvfF4vYmluLy4qc2gnfSxcbiAge2ZpbGU6ICcvdXNyL2Jpbi9maW5kJywgc2lnbmF0dXJlOiAnYmFzaHwvZGV2L1tedG5sY3NdfC9wcm9mfC9ob21lL3ZpcnVzfGZpbGVcXC5oJ30sXG4gIHtmaWxlOiAnL3Vzci9iaW4vbHNvZicsIHNpZ25hdHVyZTogJy9wcm9mfC9kZXYvW15hcGNtbmZrXXxwcm9jXFwuaHxiYXNofF4vYmluL3NofC9kZXYvdHR5b3wvZGV2L3R0eXAnfSxcbiAge2ZpbGU6ICcvdXNyL2Jpbi9uZXRzdGF0Jywgc2lnbmF0dXJlOiAnYmFzaHxeL2Jpbi9zaHwvZGV2L1teYWlrXXwvcHJvZnxncmVwfGFkZHJcXC5oJ30sXG4gIHtmaWxlOiAnL3Vzci9iaW4vdG9wJywgc2lnbmF0dXJlOiAnL2Rldi9bXm5waTNzdCVdfHByb2NcXC5ofC9wcm9mLyd9LFxuICB7ZmlsZTogJy91c3IvYmluL3BzJywgc2lnbmF0dXJlOiAnL2Rldi90dHlvfFxcLjFwcm9jfHByb2NcXC5ofGJhc2h8Xi9iaW4vc2gnfSxcbiAge2ZpbGU6ICcvdXNyL2Jpbi90Y3BkdW1wJywgc2lnbmF0dXJlOiAnYmFzaHxeL2Jpbi9zaHxmaWxlXFwuaHxwcm9jXFwuaHwvZGV2L1teYnVdfF4vYmluLy4qc2gnfSxcbiAge2ZpbGU6ICcvdXNyL2Jpbi9waWRvZicsIHNpZ25hdHVyZTogJ2Jhc2h8Xi9iaW4vc2h8ZmlsZVxcLmh8cHJvY1xcLmh8L2Rldi9bXmZdfF4vYmluLy4qc2gnfSxcbiAge2ZpbGU6ICcvdXNyL2Jpbi9mdXNlcicsIHNpZ25hdHVyZTogJ2Jhc2h8Xi9iaW4vc2h8ZmlsZVxcLmh8cHJvY1xcLmh8L2Rldi9bYS1kdHpdfF4vYmluLy4qc2gnfSxcbiAge2ZpbGU6ICcvdXNyL2Jpbi93Jywgc2lnbmF0dXJlOiAndW5hbWUgLWF8cHJvY1xcLmh8YmFzaCd9LFxuXTtcblxuZXhwb3J0IGNvbnN0IHRyb2phbnNEYXRhID0ge1xuICBcInJ1bGVcIjoge1xuICAgIFwiZmlyZWR0aW1lc1wiOiAyLFxuICAgIFwibWFpbFwiOiBmYWxzZSxcbiAgICBcImxldmVsXCI6IDcsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkhvc3QtYmFzZWQgYW5vbWFseSBkZXRlY3Rpb24gZXZlbnQgKHJvb3RjaGVjaykuXCIsXG4gICAgXCJncm91cHNcIjogW1wid2F6dWhcIixcInJvb3RjaGVja1wiXSxcbiAgICBcImlkXCI6IFwiNTEwXCIsXG4gICAgXCJnZHByXCI6IFtcIklWXzM1LjcuZFwiXVxuICB9LFxuICBcImZ1bGxfbG9nXCI6IFwiVHJvamFuZWQgdmVyc2lvbiBvZiBmaWxlICd7ZGF0YS5maWxlfScgZGV0ZWN0ZWQuIFNpZ25hdHVyZSB1c2VkOiAne190cm9qYW5fc2lnbmF0dXJlfScgKEdlbmVyaWMpLlwiLFxufTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNPLE1BQU1BLEtBQUssR0FBQUMsT0FBQSxDQUFBRCxLQUFBLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQztBQUNwRCxNQUFNRSxlQUFlLEdBQUFELE9BQUEsQ0FBQUMsZUFBQSxHQUFHLENBQUMsaURBQWlELEVBQUUscUJBQXFCLENBQUM7QUFFbEcsTUFBTUMsUUFBUSxHQUFBRixPQUFBLENBQUFFLFFBQUEsR0FBRyxXQUFXO0FBRTVCLE1BQU1DLE9BQU8sR0FBQUgsT0FBQSxDQUFBRyxPQUFBLEdBQUc7RUFDckJDLElBQUksRUFBRTtBQUNSLENBQUM7QUFFTSxNQUFNQyxRQUFRLEdBQUFMLE9BQUEsQ0FBQUssUUFBQSxHQUFHO0VBQ3RCQyxJQUFJLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQztFQUMxQ0MsS0FBSyxFQUFFLENBQUMsb0JBQW9CLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixDQUFDO0VBQ2hFQyxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsRUFBQyxxQkFBcUIsQ0FBQztFQUNoREMsSUFBSSxFQUFFLENBQUMsZUFBZSxFQUFFLGVBQWUsQ0FBQztFQUN4Q0MsS0FBSyxFQUFFLENBQUMscUJBQXFCLEVBQUMsd0JBQXdCLEVBQUUsZ0JBQWdCLENBQUM7RUFDekVDLE1BQU0sRUFBRSxDQUFDLFdBQVcsRUFBRSxzQkFBc0IsQ0FBQztFQUM3Q0MsSUFBSSxFQUFFLENBQUMsY0FBYyxFQUFFLGlCQUFpQixFQUFFLGVBQWUsQ0FBQztFQUMxREMsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDO0VBQ25CLFdBQVcsRUFBRSxDQUFDLGNBQWMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLGVBQWUsQ0FBQztFQUMzRUMsT0FBTyxFQUFFLENBQUMsa0JBQWtCLEVBQUMsbUJBQW1CLEVBQUMscUJBQXFCLENBQUM7RUFDdkVDLEdBQUcsRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFhLEVBQUUsVUFBVSxDQUFDO0VBQzlDQyxPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSx3QkFBd0IsQ0FBQztFQUMvRkMsS0FBSyxFQUFFLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQztFQUNyQ0MsRUFBRSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLG1CQUFtQixDQUFDO0VBQzVEQyxVQUFVLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLG1CQUFtQjtBQUM5SyxDQUFDO0FBRU0sTUFBTUMsWUFBWSxHQUFBcEIsT0FBQSxDQUFBb0IsWUFBQSxHQUFHO0VBQzFCLE1BQU0sRUFBRTtJQUNOLE9BQU8sRUFBRTtFQUNYLENBQUM7RUFDRCxNQUFNLEVBQUU7SUFDTixZQUFZLEVBQUUsQ0FBQztJQUNmLE1BQU0sRUFBRSxLQUFLO0lBQ2IsT0FBTyxFQUFFLENBQUM7SUFDVixhQUFhLEVBQUUsaURBQWlEO0lBQ2hFLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBQyxXQUFXLENBQUM7SUFDL0IsSUFBSSxFQUFFLEtBQUs7SUFDWCxNQUFNLEVBQUUsQ0FBQyxXQUFXO0VBQ3RCLENBQUM7RUFDRCxVQUFVLEVBQUU7QUFDZCxDQUFDO0FBRU0sTUFBTUMsT0FBTyxHQUFBckIsT0FBQSxDQUFBcUIsT0FBQSxHQUFHLENBQ3JCO0VBQUNDLElBQUksRUFBRSxlQUFlO0VBQUVDLFNBQVMsRUFBRTtBQUFjLENBQUMsRUFDbEQ7RUFBQ0QsSUFBSSxFQUFFLGdCQUFnQjtFQUFFQyxTQUFTLEVBQUU7QUFBZ0QsQ0FBQyxFQUNyRjtFQUFDRCxJQUFJLEVBQUUsZUFBZTtFQUFFQyxTQUFTLEVBQUU7QUFBOEMsQ0FBQyxFQUNsRjtFQUFDRCxJQUFJLEVBQUUsZUFBZTtFQUFFQyxTQUFTLEVBQUU7QUFBaUUsQ0FBQyxFQUNyRztFQUFDRCxJQUFJLEVBQUUsa0JBQWtCO0VBQUVDLFNBQVMsRUFBRTtBQUE4QyxDQUFDLEVBQ3JGO0VBQUNELElBQUksRUFBRSxjQUFjO0VBQUVDLFNBQVMsRUFBRTtBQUFnQyxDQUFDLEVBQ25FO0VBQUNELElBQUksRUFBRSxhQUFhO0VBQUVDLFNBQVMsRUFBRTtBQUF5QyxDQUFDLEVBQzNFO0VBQUNELElBQUksRUFBRSxrQkFBa0I7RUFBRUMsU0FBUyxFQUFFO0FBQXFELENBQUMsRUFDNUY7RUFBQ0QsSUFBSSxFQUFFLGdCQUFnQjtFQUFFQyxTQUFTLEVBQUU7QUFBb0QsQ0FBQyxFQUN6RjtFQUFDRCxJQUFJLEVBQUUsZ0JBQWdCO0VBQUVDLFNBQVMsRUFBRTtBQUF1RCxDQUFDLEVBQzVGO0VBQUNELElBQUksRUFBRSxZQUFZO0VBQUVDLFNBQVMsRUFBRTtBQUF1QixDQUFDLENBQ3pEO0FBRU0sTUFBTUMsV0FBVyxHQUFBeEIsT0FBQSxDQUFBd0IsV0FBQSxHQUFHO0VBQ3pCLE1BQU0sRUFBRTtJQUNOLFlBQVksRUFBRSxDQUFDO0lBQ2YsTUFBTSxFQUFFLEtBQUs7SUFDYixPQUFPLEVBQUUsQ0FBQztJQUNWLGFBQWEsRUFBRSxpREFBaUQ7SUFDaEUsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFDLFdBQVcsQ0FBQztJQUMvQixJQUFJLEVBQUUsS0FBSztJQUNYLE1BQU0sRUFBRSxDQUFDLFdBQVc7RUFDdEIsQ0FBQztFQUNELFVBQVUsRUFBRTtBQUNkLENBQUMifQ==