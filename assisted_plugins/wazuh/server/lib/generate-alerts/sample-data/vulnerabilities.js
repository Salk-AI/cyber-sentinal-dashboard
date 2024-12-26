"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.data = void 0;
// Vulnerability

const data = exports.data = [{
  rule: {
    level: 7,
    description: 'CVE-2017-18018 affects coreutils',
    id: '23504',
    firedtimes: 1
  },
  data: {
    vulnerability: {
      package: {
        name: 'coreutils',
        version: '8.28-1ubuntu1',
        architecture: 'amd64',
        condition: 'Package less or equal than 8.29'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'none',
            integrity_impact: 'partial',
            availability: 'none'
          },
          base_score: '1.900000'
        },
        cvss3: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'high',
            privileges_required: 'low',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'none',
            integrity_impact: 'high',
            availability: 'none'
          },
          base_score: '4.700000'
        }
      },
      cve: 'CVE-2017-18018',
      title: 'CVE-2017-18018 on Ubuntu 18.04 LTS (bionic) - low.',
      rationale: 'In GNU Coreutils through 8.29, chown-core.c in chown and chgrp does not prevent replacement of a plain file with a symlink during use of the POSIX "-R -L" options, which allows local users to modify the ownership of arbitrary files by leveraging a race condition.',
      severity: 'Medium',
      published: '2018-01-04',
      updated: '2018-01-19',
      state: 'Fixed',
      cwe_reference: 'CWE-362',
      references: ['http://lists.gnu.org/archive/html/coreutils/2017-12/msg00045.html', 'https://nvd.nist.gov/vuln/detail/CVE-2017-18018', 'http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-18018.html', 'http://www.openwall.com/lists/oss-security/2018/01/04/3', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-18018', 'https://lists.gnu.org/archive/html/coreutils/2017-12/msg00072.html', 'https://lists.gnu.org/archive/html/coreutils/2017-12/msg00073.html'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2019-17540 affects imagemagick',
    id: '23504',
    firedtimes: 2
  },
  data: {
    vulnerability: {
      package: {
        name: 'imagemagick',
        version: '8:6.9.7.4+dfsg-16ubuntu6.8',
        architecture: 'amd64',
        condition: 'Package less than 7.0.8-54'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '6.800000'
        }
      },
      cve: 'CVE-2019-17540',
      title: 'ImageMagick before 7.0.8-54 has a heap-based buffer overflow in ReadPSInfo in coders/ps.c.',
      severity: 'Medium',
      published: '2019-10-14',
      updated: '2019-10-23',
      state: 'Fixed',
      cwe_reference: 'CWE-120',
      references: ['https://bugs.chromium.org/p/oss-fuzz/issues/detail?id=15826', 'https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=942578', 'https://github.com/ImageMagick/ImageMagick/compare/7.0.8-53...7.0.8-54', 'https://github.com/ImageMagick/ImageMagick/compare/master@%7B2019-07-15%7D...master@%7B2019-07-17%7D', 'https://security-tracker.debian.org/tracker/CVE-2019-17540', 'https://nvd.nist.gov/vuln/detail/CVE-2019-17540'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2019-17540 affects libmagickcore-6.q16-3',
    id: '23504',
    firedtimes: 5
  },
  data: {
    vulnerability: {
      package: {
        name: 'libmagickcore-6.q16-3',
        source: 'imagemagick',
        version: '8:6.9.7.4+dfsg-16ubuntu6.8',
        architecture: 'amd64',
        condition: 'Package less than 7.0.8-54'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '6.800000'
        }
      },
      cve: 'CVE-2019-17540',
      title: 'ImageMagick before 7.0.8-54 has a heap-based buffer overflow in ReadPSInfo in coders/ps.c.',
      severity: 'Medium',
      published: '2019-10-14',
      updated: '2019-10-23',
      state: 'Fixed',
      cwe_reference: 'CWE-120',
      references: ['https://bugs.chromium.org/p/oss-fuzz/issues/detail?id=15826', 'https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=942578', 'https://github.com/ImageMagick/ImageMagick/compare/7.0.8-53...7.0.8-54', 'https://github.com/ImageMagick/ImageMagick/compare/master@%7B2019-07-15%7D...master@%7B2019-07-17%7D', 'https://security-tracker.debian.org/tracker/CVE-2019-17540', 'https://nvd.nist.gov/vuln/detail/CVE-2019-17540'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 10,
    description: 'CVE-2018-1000035 affects unzip',
    id: '23505',
    firedtimes: 1
  },
  data: {
    vulnerability: {
      package: {
        name: 'unzip',
        version: '6.0-21ubuntu1',
        architecture: 'amd64',
        condition: 'Package less or equal than 6.00'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '6.800000'
        },
        cvss3: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'required',
            scope: 'unchanged',
            confidentiality_impact: 'high',
            integrity_impact: 'high',
            availability: 'high'
          },
          base_score: '7.800000'
        }
      },
      cve: 'CVE-2018-1000035',
      title: 'CVE-2018-1000035 on Ubuntu 18.04 LTS (bionic) - low.',
      rationale: 'A heap-based buffer overflow exists in Info-Zip UnZip version <= 6.00 in the processing of password-protected archives that allows an attacker to perform a denial of service or to possibly achieve code execution.',
      severity: 'High',
      published: '2018-02-09',
      updated: '2020-01-29',
      state: 'Fixed',
      cwe_reference: 'CWE-119',
      bugzilla_references: ['http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=889838'],
      references: ['https://lists.debian.org/debian-lts-announce/2020/01/msg00026.html', 'https://sec-consult.com/en/blog/advisories/multiple-vulnerabilities-in-infozip-unzip/index.html', 'https://security.gentoo.org/glsa/202003-58', 'https://nvd.nist.gov/vuln/detail/CVE-2018-1000035', 'http://people.canonical.com/~ubuntu-security/cve/2018/CVE-2018-1000035.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000035', 'https://www.sec-consult.com/en/blog/advisories/multiple-vulnerabilities-in-infozip-unzip/index.html'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 10,
    description: 'CVE-2018-1000035 affects unzip',
    id: '23505',
    firedtimes: 1
  },
  data: {
    vulnerability: {
      package: {
        name: 'unzip',
        version: '6.0-21ubuntu1',
        architecture: 'amd64',
        condition: 'Package less or equal than 6.00'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '6.800000'
        },
        cvss3: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'required',
            scope: 'unchanged',
            confidentiality_impact: 'high',
            integrity_impact: 'high',
            availability: 'high'
          },
          base_score: '7.800000'
        }
      },
      cve: 'CVE-2018-1000035',
      title: 'CVE-2018-1000035 on Ubuntu 18.04 LTS (bionic) - low.',
      rationale: 'A heap-based buffer overflow exists in Info-Zip UnZip version <= 6.00 in the processing of password-protected archives that allows an attacker to perform a denial of service or to possibly achieve code execution.',
      severity: 'High',
      published: '2018-02-09',
      updated: '2020-01-29',
      state: 'Fixed',
      cwe_reference: 'CWE-119',
      bugzilla_references: ['http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=889838'],
      references: ['https://lists.debian.org/debian-lts-announce/2020/01/msg00026.html', 'https://sec-consult.com/en/blog/advisories/multiple-vulnerabilities-in-infozip-unzip/index.html', 'https://security.gentoo.org/glsa/202003-58', 'https://nvd.nist.gov/vuln/detail/CVE-2018-1000035', 'http://people.canonical.com/~ubuntu-security/cve/2018/CVE-2018-1000035.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000035', 'https://www.sec-consult.com/en/blog/advisories/multiple-vulnerabilities-in-infozip-unzip/index.html'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 10,
    description: 'CVE-2020-1747 affects python3-yaml',
    id: '23505',
    firedtimes: 44
  },
  data: {
    vulnerability: {
      package: {
        name: 'python3-yaml',
        source: 'pyyaml',
        version: '3.12-1build2',
        architecture: 'amd64',
        condition: 'Package less than 5.3.1'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'complete',
            integrity_impact: 'complete',
            availability: 'complete'
          },
          base_score: '10'
        }
      },
      cve: 'CVE-2020-1747',
      title: 'A vulnerability was discovered in the PyYAML library in versions before 5.3.1, where it is susceptible to arbitrary code execution when it processes untrusted YAML files through the full_load method or with the FullLoader loader. Applications that use the library to process untrusted input may be vulnerable to this flaw. An attacker could use this flaw to execute arbitrary code on the system by abusing the python/object/new constructor.',
      severity: 'High',
      published: '2020-03-24',
      updated: '2020-05-11',
      state: 'Fixed',
      cwe_reference: 'CWE-20',
      references: ['http://lists.opensuse.org/opensuse-security-announce/2020-04/msg00017.html', 'http://lists.opensuse.org/opensuse-security-announce/2020-05/msg00017.html', 'https://bugzilla.redhat.com/show_bug.cgi?id=CVE-2020-1747', 'https://github.com/yaml/pyyaml/pull/386', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/K5HEPD7LEVDPCITY5IMDYWXUMX37VFMY/', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/WORRFHPQVAFKKXXWLSSW6XKUYLWM6CSH/', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/ZBJA3SGNJKCAYPSHOHWY3KBCWNM5NYK2/', 'https://nvd.nist.gov/vuln/detail/CVE-2020-1747'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 5,
    description: 'CVE-2019-1552 affects openssl',
    id: '23503',
    firedtimes: 11
  },
  data: {
    vulnerability: {
      package: {
        name: 'openssl',
        version: '1.1.1-1ubuntu2.1~18.04.6',
        architecture: 'amd64',
        condition: 'Package greater or equal than 1.1.1 and less or equal than 1.1.1c'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'none',
            integrity_impact: 'partial',
            availability: 'none'
          },
          base_score: '1.900000'
        },
        cvss3: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            privileges_required: 'low',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'none',
            integrity_impact: 'low',
            availability: 'none'
          },
          base_score: '3.300000'
        }
      },
      cve: 'CVE-2019-1552',
      title: "OpenSSL has internal defaults for a directory tree where it can find a configuration file as well as certificates used for verification in TLS. This directory is most commonly referred to as OPENSSLDIR, and is configurable with the --prefix / --openssldir configuration options. For OpenSSL versions 1.1.0 and 1.1.1, the mingw configuration targets assume that resulting programs and libraries are installed in a Unix-like environment and the default prefix for program installation as well as for OPENSSLDIR should be '/usr/local'. However, mingw programs are Windows programs, and as such, find themselves looking at sub-directories of 'C:/usr/local', which may be world writable, which enables untrusted users to modify OpenSSL's default configuration, insert CA certificates, modify (or even replace) existing engine modules, etc. For OpenSSL 1.0.2, '/usr/local/ssl' is used as default for OPENSSLDIR on all Unix and Windows targets, including Visual C builds. However, some build instructions for the diverse Windows targets on 1.0.2 encourage you to specify your own --prefix. OpenSSL versions 1.1.1, 1.1.0 and 1.0.2 are affected by this issue. Due to the limited scope of affected deployments this has been assessed as low severity and therefore we are not creating new releases at this time. Fixed in OpenSSL 1.1.1d (Affected 1.1.1-1.1.1c). Fixed in OpenSSL 1.1.0l (Affected 1.1.0-1.1.0k). Fixed in OpenSSL 1.0.2t (Affected 1.0.2-1.0.2s).",
      severity: 'Low',
      published: '2019-07-30',
      updated: '2019-08-23',
      state: 'Fixed',
      cwe_reference: 'CWE-295',
      references: ['https://git.openssl.org/gitweb/?p=openssl.git;a=commitdiff;h=54aa9d51b09d67e90db443f682cface795f5af9e', 'https://git.openssl.org/gitweb/?p=openssl.git;a=commitdiff;h=b15a19c148384e73338aa7c5b12652138e35ed28', 'https://git.openssl.org/gitweb/?p=openssl.git;a=commitdiff;h=d333ebaf9c77332754a9d5e111e2f53e1de54fdd', 'https://git.openssl.org/gitweb/?p=openssl.git;a=commitdiff;h=e32bc855a81a2d48d215c506bdeb4f598045f7e9', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/EWC42UXL5GHTU5G77VKBF6JYUUNGSHOM/', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/Y3IVFGSERAZLNJCK35TEM2R4726XIH3Z/', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/ZBEV5QGDRFUZDMNECFXUSN5FMYOZDE4V/', 'https://security.netapp.com/advisory/ntap-20190823-0006/', 'https://support.f5.com/csp/article/K94041354', 'https://support.f5.com/csp/article/K94041354?utm_source=f5support&amp;utm_medium=RSS', 'https://www.openssl.org/news/secadv/20190730.txt', 'https://www.oracle.com/security-alerts/cpuapr2020.html', 'https://www.oracle.com/security-alerts/cpujan2020.html', 'https://www.oracle.com/technetwork/security-advisory/cpuoct2019-5072832.html', 'https://www.tenable.com/security/tns-2019-08', 'https://www.tenable.com/security/tns-2019-09', 'https://nvd.nist.gov/vuln/detail/CVE-2019-1552'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 10,
    description: 'CVE-2020-1747 affects python3-yaml',
    id: '23505',
    firedtimes: 44
  },
  data: {
    vulnerability: {
      package: {
        name: 'python3-yaml',
        source: 'pyyaml',
        version: '3.12-1build2',
        architecture: 'amd64',
        condition: 'Package less than 5.3.1'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'complete',
            integrity_impact: 'complete',
            availability: 'complete'
          },
          base_score: '10'
        }
      },
      cve: 'CVE-2020-1747',
      title: 'A vulnerability was discovered in the PyYAML library in versions before 5.3.1, where it is susceptible to arbitrary code execution when it processes untrusted YAML files through the full_load method or with the FullLoader loader. Applications that use the library to process untrusted input may be vulnerable to this flaw. An attacker could use this flaw to execute arbitrary code on the system by abusing the python/object/new constructor.',
      severity: 'High',
      published: '2020-03-24',
      updated: '2020-05-11',
      state: 'Fixed',
      cwe_reference: 'CWE-20',
      references: ['http://lists.opensuse.org/opensuse-security-announce/2020-04/msg00017.html', 'http://lists.opensuse.org/opensuse-security-announce/2020-05/msg00017.html', 'https://bugzilla.redhat.com/show_bug.cgi?id=CVE-2020-1747', 'https://github.com/yaml/pyyaml/pull/386', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/K5HEPD7LEVDPCITY5IMDYWXUMX37VFMY/', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/WORRFHPQVAFKKXXWLSSW6XKUYLWM6CSH/', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/ZBJA3SGNJKCAYPSHOHWY3KBCWNM5NYK2/', 'https://nvd.nist.gov/vuln/detail/CVE-2020-1747'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2019-18684 affects sudo',
    id: '23504',
    firedtimes: 87
  },
  data: {
    vulnerability: {
      package: {
        name: 'sudo',
        version: '1.8.21p2-3ubuntu1.2',
        architecture: 'amd64',
        condition: 'Package less or equal than 1.8.29'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'complete',
            integrity_impact: 'complete',
            availability: 'complete'
          },
          base_score: '6.900000'
        }
      },
      cve: 'CVE-2019-18684',
      title: '** DISPUTED ** Sudo through 1.8.29 allows local users to escalate to root if they have write access to file descriptor 3 of the sudo process. This occurs because of a race condition between determining a uid, and the setresuid and openat system calls. The attacker can write "ALL ALL=(ALL) NOPASSWD:ALL" to /proc/#####/fd/3 at a time when Sudo is prompting for a password. NOTE: This has been disputed due to the way Linux /proc works. It has been argued that writing to /proc/#####/fd/3 would only be viable if you had permission to write to /etc/sudoers. Even with write permission to /proc/#####/fd/3, it would not help you write to /etc/sudoers.',
      severity: 'Medium',
      published: '2019-11-04',
      updated: '2019-11-08',
      state: 'Fixed',
      cwe_reference: 'CWE-362',
      references: ['https://gist.github.com/oxagast/51171aa161074188a11d96cbef884bbd', 'https://nvd.nist.gov/vuln/detail/CVE-2019-18684'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2018-20482 affects tar',
    id: '23504',
    firedtimes: 88
  },
  data: {
    vulnerability: {
      package: {
        name: 'tar',
        version: '1.29b-2ubuntu0.1',
        architecture: 'amd64',
        condition: 'Package less or equal than 1.30'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'none',
            integrity_impact: 'none',
            availability: 'partial'
          },
          base_score: '1.900000'
        },
        cvss3: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'high',
            privileges_required: 'low',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'none',
            integrity_impact: 'none',
            availability: 'high'
          },
          base_score: '4.700000'
        }
      },
      cve: 'CVE-2018-20482',
      title: 'CVE-2018-20482 on Ubuntu 18.04 LTS (bionic) - low.',
      rationale: "GNU Tar through 1.30, when --sparse is used, mishandles file shrinkage during read access, which allows local users to cause a denial of service (infinite read loop in sparse_dump_region in sparse.c) by modifying a file that is supposed to be archived by a different user's process (e.g., a system backup running as root).",
      severity: 'Medium',
      published: '2018-12-26',
      updated: '2019-10-03',
      state: 'Fixed',
      cwe_reference: 'CWE-835',
      bugzilla_references: ['http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=917377', 'https://bugzilla.redhat.com/show_bug.cgi?id=1662346'],
      references: ['http://git.savannah.gnu.org/cgit/tar.git/commit/?id=c15c42ccd1e2377945fd0414eca1a49294bff454', 'http://lists.gnu.org/archive/html/bug-tar/2018-12/msg00023.html', 'http://lists.opensuse.org/opensuse-security-announce/2019-04/msg00077.html', 'http://www.securityfocus.com/bid/106354', 'https://lists.debian.org/debian-lts-announce/2018/12/msg00023.html', 'https://news.ycombinator.com/item?id=18745431', 'https://security.gentoo.org/glsa/201903-05', 'https://twitter.com/thatcks/status/1076166645708668928', 'https://utcc.utoronto.ca/~cks/space/blog/sysadmin/TarFindingTruncateBug', 'https://nvd.nist.gov/vuln/detail/CVE-2018-20482', 'http://people.canonical.com/~ubuntu-security/cve/2018/CVE-2018-20482.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-20482'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 5,
    description: 'CVE-2015-2987 affects ed',
    id: '23503',
    firedtimes: 9
  },
  data: {
    vulnerability: {
      package: {
        name: 'ed',
        version: '1.10-2.1',
        architecture: 'amd64',
        condition: 'Package less or equal than 3.4'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'high',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'none',
            availability: 'none'
          },
          base_score: '2.600000'
        }
      },
      cve: 'CVE-2015-2987',
      title: 'Type74 ED before 4.0 misuses 128-bit ECB encryption for small files, which makes it easier for attackers to obtain plaintext data via differential cryptanalysis of a file with an original length smaller than 128 bits.',
      severity: 'Low',
      published: '2015-08-28',
      updated: '2015-08-31',
      state: 'Fixed',
      cwe_reference: 'CWE-17',
      references: ['http://jvn.jp/en/jp/JVN91474878/index.html', 'http://jvndb.jvn.jp/jvndb/JVNDB-2015-000119', 'http://type74.org/edman5-1.php', 'http://type74org.blog14.fc2.com/blog-entry-1384.html', 'https://nvd.nist.gov/vuln/detail/CVE-2015-2987'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 10,
    description: 'CVE-2018-8769 affects elfutils',
    id: '23505',
    firedtimes: 45
  },
  data: {
    vulnerability: {
      package: {
        name: 'elfutils',
        version: '0.170-0.4ubuntu0.1',
        architecture: 'amd64',
        condition: 'Package matches a vulnerable version'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '6.800000'
        },
        cvss3: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'required',
            scope: 'unchanged',
            confidentiality_impact: 'high',
            integrity_impact: 'high',
            availability: 'high'
          },
          base_score: '7.800000'
        }
      },
      cve: 'CVE-2018-8769',
      title: 'elfutils 0.170 has a buffer over-read in the ebl_dynamic_tag_name function of libebl/ebldynamictagname.c because SYMTAB_SHNDX is unsupported.',
      severity: 'High',
      published: '2018-03-18',
      updated: '2019-10-03',
      state: 'Pending confirmation',
      cwe_reference: 'CWE-125',
      references: ['https://sourceware.org/bugzilla/show_bug.cgi?id=22976', 'https://nvd.nist.gov/vuln/detail/CVE-2018-8769'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 5,
    description: 'CVE-2019-1552 affects openssl',
    id: '23503',
    firedtimes: 11
  },
  data: {
    vulnerability: {
      package: {
        name: 'openssl',
        version: '1.1.1-1ubuntu2.1~18.04.6',
        architecture: 'amd64',
        condition: 'Package greater or equal than 1.1.1 and less or equal than 1.1.1c'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'none',
            integrity_impact: 'partial',
            availability: 'none'
          },
          base_score: '1.900000'
        },
        cvss3: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            privileges_required: 'low',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'none',
            integrity_impact: 'low',
            availability: 'none'
          },
          base_score: '3.300000'
        }
      },
      cve: 'CVE-2019-1552',
      title: "OpenSSL has internal defaults for a directory tree where it can find a configuration file as well as certificates used for verification in TLS. This directory is most commonly referred to as OPENSSLDIR, and is configurable with the --prefix / --openssldir configuration options. For OpenSSL versions 1.1.0 and 1.1.1, the mingw configuration targets assume that resulting programs and libraries are installed in a Unix-like environment and the default prefix for program installation as well as for OPENSSLDIR should be '/usr/local'. However, mingw programs are Windows programs, and as such, find themselves looking at sub-directories of 'C:/usr/local', which may be world writable, which enables untrusted users to modify OpenSSL's default configuration, insert CA certificates, modify (or even replace) existing engine modules, etc. For OpenSSL 1.0.2, '/usr/local/ssl' is used as default for OPENSSLDIR on all Unix and Windows targets, including Visual C builds. However, some build instructions for the diverse Windows targets on 1.0.2 encourage you to specify your own --prefix. OpenSSL versions 1.1.1, 1.1.0 and 1.0.2 are affected by this issue. Due to the limited scope of affected deployments this has been assessed as low severity and therefore we are not creating new releases at this time. Fixed in OpenSSL 1.1.1d (Affected 1.1.1-1.1.1c). Fixed in OpenSSL 1.1.0l (Affected 1.1.0-1.1.0k). Fixed in OpenSSL 1.0.2t (Affected 1.0.2-1.0.2s).",
      severity: 'Low',
      published: '2019-07-30',
      updated: '2019-08-23',
      state: 'Fixed',
      cwe_reference: 'CWE-295',
      references: ['https://git.openssl.org/gitweb/?p=openssl.git;a=commitdiff;h=54aa9d51b09d67e90db443f682cface795f5af9e', 'https://git.openssl.org/gitweb/?p=openssl.git;a=commitdiff;h=b15a19c148384e73338aa7c5b12652138e35ed28', 'https://git.openssl.org/gitweb/?p=openssl.git;a=commitdiff;h=d333ebaf9c77332754a9d5e111e2f53e1de54fdd', 'https://git.openssl.org/gitweb/?p=openssl.git;a=commitdiff;h=e32bc855a81a2d48d215c506bdeb4f598045f7e9', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/EWC42UXL5GHTU5G77VKBF6JYUUNGSHOM/', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/Y3IVFGSERAZLNJCK35TEM2R4726XIH3Z/', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/ZBEV5QGDRFUZDMNECFXUSN5FMYOZDE4V/', 'https://security.netapp.com/advisory/ntap-20190823-0006/', 'https://support.f5.com/csp/article/K94041354', 'https://support.f5.com/csp/article/K94041354?utm_source=f5support&amp;utm_medium=RSS', 'https://www.openssl.org/news/secadv/20190730.txt', 'https://www.oracle.com/security-alerts/cpuapr2020.html', 'https://www.oracle.com/security-alerts/cpujan2020.html', 'https://www.oracle.com/technetwork/security-advisory/cpuoct2019-5072832.html', 'https://www.tenable.com/security/tns-2019-08', 'https://www.tenable.com/security/tns-2019-09', 'https://nvd.nist.gov/vuln/detail/CVE-2019-1552'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 5,
    description: 'CVE-2020-1752 affects libc-bin',
    id: '23503',
    firedtimes: 12
  },
  data: {
    vulnerability: {
      package: {
        name: 'libc-bin',
        source: 'glibc',
        version: '2.27-3ubuntu1',
        architecture: 'amd64',
        condition: 'Package less than 2.32.0'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'high',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '3.700000'
        }
      },
      cve: 'CVE-2020-1752',
      title: 'CVE-2020-1752 on Ubuntu 18.04 LTS (bionic) - medium.',
      rationale: 'A use-after-free vulnerability introduced in glibc upstream version 2.14 was found in the way the tilde expansion was carried out. Directory paths containing an initial tilde followed by a valid username were affected by this issue. A local attacker could exploit this flaw by creating a specially crafted path that, when processed by the glob function, would potentially lead to arbitrary code execution. This was fixed in version 2.32.',
      severity: 'Low',
      published: '2020-04-30',
      updated: '2020-05-18',
      state: 'Fixed',
      cwe_reference: 'CWE-416',
      references: ['https://bugzilla.redhat.com/show_bug.cgi?id=CVE-2020-1752', 'https://security.netapp.com/advisory/ntap-20200511-0005/', 'https://sourceware.org/bugzilla/show_bug.cgi?id=25414', 'https://sourceware.org/git/gitweb.cgi?p=glibc.git;h=ddc650e9b3dc916eab417ce9f79e67337b05035c', 'https://nvd.nist.gov/vuln/detail/CVE-2020-1752', 'http://people.canonical.com/~ubuntu-security/cve/2020/CVE-2020-1752.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-1752', 'https://sourceware.org/git/?p=glibc.git;a=commitdiff;h=263e6175999bc7f5adb8b32fd12fcfae3f0bb05a;hp=37db4539dd8b5c098d9235249c5d2aedaa67d7d1'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 5,
    description: 'CVE-2020-1752 affects multiarch-support',
    id: '23503',
    firedtimes: 17
  },
  data: {
    vulnerability: {
      package: {
        name: 'multiarch-support',
        source: 'glibc',
        version: '2.27-3ubuntu1',
        architecture: 'amd64',
        condition: 'Package less than 2.32.0'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'high',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '3.700000'
        }
      },
      cve: 'CVE-2020-1752',
      title: 'CVE-2020-1752 on Ubuntu 18.04 LTS (bionic) - medium.',
      rationale: 'A use-after-free vulnerability introduced in glibc upstream version 2.14 was found in the way the tilde expansion was carried out. Directory paths containing an initial tilde followed by a valid username were affected by this issue. A local attacker could exploit this flaw by creating a specially crafted path that, when processed by the glob function, would potentially lead to arbitrary code execution. This was fixed in version 2.32.',
      severity: 'Low',
      published: '2020-04-30',
      updated: '2020-05-18',
      state: 'Fixed',
      cwe_reference: 'CWE-416',
      references: ['https://bugzilla.redhat.com/show_bug.cgi?id=CVE-2020-1752', 'https://security.netapp.com/advisory/ntap-20200511-0005/', 'https://sourceware.org/bugzilla/show_bug.cgi?id=25414', 'https://sourceware.org/git/gitweb.cgi?p=glibc.git;h=ddc650e9b3dc916eab417ce9f79e67337b05035c', 'https://nvd.nist.gov/vuln/detail/CVE-2020-1752', 'http://people.canonical.com/~ubuntu-security/cve/2020/CVE-2020-1752.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-1752', 'https://sourceware.org/git/?p=glibc.git;a=commitdiff;h=263e6175999bc7f5adb8b32fd12fcfae3f0bb05a;hp=37db4539dd8b5c098d9235249c5d2aedaa67d7d1'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 5,
    description: 'CVE-2019-19645 affects libsqlite3-0',
    id: '23503',
    firedtimes: 18
  },
  data: {
    vulnerability: {
      package: {
        name: 'libsqlite3-0',
        source: 'sqlite3',
        version: '3.22.0-1ubuntu0.3',
        architecture: 'amd64',
        condition: 'Package unfixed'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'none',
            integrity_impact: 'none',
            availability: 'partial'
          },
          base_score: '2.100000'
        }
      },
      cve: 'CVE-2019-19645',
      title: 'CVE-2019-19645 on Ubuntu 18.04 LTS (bionic) - low.',
      rationale: 'alter.c in SQLite through 3.30.1 allows attackers to trigger infinite recursion via certain types of self-referential views in conjunction with ALTER TABLE statements.',
      severity: 'Low',
      published: '2019-12-09',
      updated: '2019-12-23',
      state: 'Unfixed',
      cwe_reference: 'CWE-674',
      references: ['https://github.com/sqlite/sqlite/commit/38096961c7cd109110ac21d3ed7dad7e0cb0ae06', 'https://security.netapp.com/advisory/ntap-20191223-0001/', 'https://www.oracle.com/security-alerts/cpuapr2020.html', 'https://nvd.nist.gov/vuln/detail/CVE-2019-19645', 'http://people.canonical.com/~ubuntu-security/cve/2019/CVE-2019-19645.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-19645'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 5,
    description: 'CVE-2019-19645 affects sqlite3',
    id: '23503',
    firedtimes: 19
  },
  data: {
    vulnerability: {
      package: {
        name: 'sqlite3',
        version: '3.22.0-1ubuntu0.3',
        architecture: 'amd64',
        condition: 'Package unfixed'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'none',
            integrity_impact: 'none',
            availability: 'partial'
          },
          base_score: '2.100000'
        }
      },
      cve: 'CVE-2019-19645',
      title: 'CVE-2019-19645 on Ubuntu 18.04 LTS (bionic) - low.',
      rationale: 'alter.c in SQLite through 3.30.1 allows attackers to trigger infinite recursion via certain types of self-referential views in conjunction with ALTER TABLE statements.',
      severity: 'Low',
      published: '2019-12-09',
      updated: '2019-12-23',
      state: 'Unfixed',
      cwe_reference: 'CWE-674',
      references: ['https://github.com/sqlite/sqlite/commit/38096961c7cd109110ac21d3ed7dad7e0cb0ae06', 'https://security.netapp.com/advisory/ntap-20191223-0001/', 'https://www.oracle.com/security-alerts/cpuapr2020.html', 'https://nvd.nist.gov/vuln/detail/CVE-2019-19645', 'http://people.canonical.com/~ubuntu-security/cve/2019/CVE-2019-19645.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-19645'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 5,
    description: 'CVE-2013-4235 affects login',
    id: '23503',
    firedtimes: 20
  },
  data: {
    vulnerability: {
      package: {
        name: 'login',
        source: 'shadow',
        version: '1:4.5-1ubuntu2',
        architecture: 'amd64',
        condition: 'Package unfixed'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'none',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '3.300000'
        }
      },
      cve: 'CVE-2013-4235',
      title: 'CVE-2013-4235 on Ubuntu 18.04 LTS (bionic) - low.',
      rationale: 'shadow: TOCTOU (time-of-check time-of-use) race condition when copying and removing directory trees',
      severity: 'Low',
      published: '2019-12-03',
      updated: '2019-12-13',
      state: 'Unfixed',
      cwe_reference: 'CWE-367',
      bugzilla_references: ['https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=778950', 'https://bugzilla.redhat.com/show_bug.cgi?id=884658'],
      references: ['https://access.redhat.com/security/cve/cve-2013-4235', 'https://bugzilla.redhat.com/show_bug.cgi?id=CVE-2013-4235', 'https://security-tracker.debian.org/tracker/CVE-2013-4235', 'https://nvd.nist.gov/vuln/detail/CVE-2013-4235', 'http://people.canonical.com/~ubuntu-security/cve/2013/CVE-2013-4235.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2013-4235'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 5,
    description: 'CVE-2013-4235 affects passwd',
    id: '23503',
    firedtimes: 21
  },
  data: {
    vulnerability: {
      package: {
        name: 'passwd',
        source: 'shadow',
        version: '1:4.5-1ubuntu2',
        architecture: 'amd64',
        condition: 'Package unfixed'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'none',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '3.300000'
        }
      },
      cve: 'CVE-2013-4235',
      title: 'CVE-2013-4235 on Ubuntu 18.04 LTS (bionic) - low.',
      rationale: 'shadow: TOCTOU (time-of-check time-of-use) race condition when copying and removing directory trees',
      severity: 'Low',
      published: '2019-12-03',
      updated: '2019-12-13',
      state: 'Unfixed',
      cwe_reference: 'CWE-367',
      bugzilla_references: ['https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=778950', 'https://bugzilla.redhat.com/show_bug.cgi?id=884658'],
      references: ['https://access.redhat.com/security/cve/cve-2013-4235', 'https://bugzilla.redhat.com/show_bug.cgi?id=CVE-2013-4235', 'https://security-tracker.debian.org/tracker/CVE-2013-4235', 'https://nvd.nist.gov/vuln/detail/CVE-2013-4235', 'http://people.canonical.com/~ubuntu-security/cve/2013/CVE-2013-4235.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2013-4235'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 5,
    description: 'CVE-2013-4235 affects login',
    id: '23503',
    firedtimes: 20
  },
  data: {
    vulnerability: {
      package: {
        name: 'login',
        source: 'shadow',
        version: '1:4.5-1ubuntu2',
        architecture: 'amd64',
        condition: 'Package unfixed'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'none',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '3.300000'
        }
      },
      cve: 'CVE-2013-4235',
      title: 'CVE-2013-4235 on Ubuntu 18.04 LTS (bionic) - low.',
      rationale: 'shadow: TOCTOU (time-of-check time-of-use) race condition when copying and removing directory trees',
      severity: 'Low',
      published: '2019-12-03',
      updated: '2019-12-13',
      state: 'Unfixed',
      cwe_reference: 'CWE-367',
      bugzilla_references: ['https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=778950', 'https://bugzilla.redhat.com/show_bug.cgi?id=884658'],
      references: ['https://access.redhat.com/security/cve/cve-2013-4235', 'https://bugzilla.redhat.com/show_bug.cgi?id=CVE-2013-4235', 'https://security-tracker.debian.org/tracker/CVE-2013-4235', 'https://nvd.nist.gov/vuln/detail/CVE-2013-4235', 'http://people.canonical.com/~ubuntu-security/cve/2013/CVE-2013-4235.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2013-4235'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2019-1003010 affects git',
    id: '23504',
    firedtimes: 162
  },
  data: {
    vulnerability: {
      package: {
        name: 'git',
        version: '1:2.17.1-1ubuntu0.7',
        architecture: 'amd64',
        condition: 'Package less or equal than 3.9.1'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'none',
            integrity_impact: 'partial',
            availability: 'none'
          },
          base_score: '4.300000'
        },
        cvss3: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'required',
            scope: 'unchanged',
            confidentiality_impact: 'none',
            integrity_impact: 'low',
            availability: 'none'
          },
          base_score: '4.300000'
        }
      },
      cve: 'CVE-2019-1003010',
      title: 'A cross-site request forgery vulnerability exists in Jenkins Git Plugin 3.9.1 and earlier in src/main/java/hudson/plugins/git/GitTagAction.java that allows attackers to create a Git tag in a workspace and attach corresponding metadata to a build record.',
      severity: 'Medium',
      published: '2019-02-06',
      updated: '2019-04-26',
      state: 'Fixed',
      cwe_reference: 'CWE-352',
      references: ['https://access.redhat.com/errata/RHBA-2019:0326', 'https://access.redhat.com/errata/RHBA-2019:0327', 'https://jenkins.io/security/advisory/2019-01-28/#SECURITY-1095', 'https://nvd.nist.gov/vuln/detail/CVE-2019-1003010'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 10,
    description: 'CVE-2020-9366 affects screen',
    id: '23505',
    firedtimes: 77
  },
  data: {
    vulnerability: {
      package: {
        name: 'screen',
        version: '4.6.2-1ubuntu1',
        architecture: 'amd64',
        condition: 'Package less than 4.8.0'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '7.500000'
        }
      },
      cve: 'CVE-2020-9366',
      title: 'A buffer overflow was found in the way GNU Screen before 4.8.0 treated the special escape OSC 49. Specially crafted output, or a special program, could corrupt memory and crash Screen or possibly have unspecified other impact.',
      severity: 'High',
      published: '2020-02-24',
      updated: '2020-03-30',
      state: 'Fixed',
      cwe_reference: 'CWE-120',
      references: ['http://www.openwall.com/lists/oss-security/2020/02/25/1', 'https://lists.gnu.org/archive/html/screen-devel/2020-02/msg00007.html', 'https://security.gentoo.org/glsa/202003-62', 'https://www.openwall.com/lists/oss-security/2020/02/06/3', 'https://nvd.nist.gov/vuln/detail/CVE-2020-9366'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 10,
    description: 'CVE-2019-15847 affects gcc',
    id: '23505',
    firedtimes: 86
  },
  data: {
    vulnerability: {
      package: {
        name: 'gcc',
        source: 'gcc-defaults',
        version: '4:7.4.0-1ubuntu2.3',
        architecture: 'amd64',
        condition: 'Package less than 10.0'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'none',
            availability: 'none'
          },
          base_score: '5'
        },
        cvss3: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'high',
            integrity_impact: 'none',
            availability: 'none'
          },
          base_score: '7.500000'
        }
      },
      cve: 'CVE-2019-15847',
      title: 'CVE-2019-15847 on Ubuntu 18.04 LTS (bionic) - negligible.',
      rationale: 'The POWER9 backend in GNU Compiler Collection (GCC) before version 10 could optimize multiple calls of the __builtin_darn intrinsic into a single call, thus reducing the entropy of the random number generator. This occurred because a volatile operation was not specified. For example, within a single execution of a program, the output of every __builtin_darn() call may be the same.',
      severity: 'High',
      published: '2019-09-02',
      updated: '2020-05-26',
      state: 'Fixed',
      cwe_reference: 'CWE-331',
      bugzilla_references: ['https://gcc.gnu.org/bugzilla/show_bug.cgi?id=91481'],
      references: ['http://lists.opensuse.org/opensuse-security-announce/2019-10/msg00056.html', 'http://lists.opensuse.org/opensuse-security-announce/2019-10/msg00057.html', 'http://lists.opensuse.org/opensuse-security-announce/2020-05/msg00058.html', 'https://gcc.gnu.org/bugzilla/show_bug.cgi?id=91481', 'https://nvd.nist.gov/vuln/detail/CVE-2019-15847', 'http://people.canonical.com/~ubuntu-security/cve/2019/CVE-2019-15847.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-15847'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2017-14988 affects libopenexr22',
    id: '23504',
    firedtimes: 189
  },
  data: {
    vulnerability: {
      package: {
        name: 'libopenexr22',
        source: 'openexr',
        version: '2.2.0-11.1ubuntu1.2',
        architecture: 'amd64',
        condition: 'Package matches a vulnerable version'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'none',
            integrity_impact: 'none',
            availability: 'partial'
          },
          base_score: '4.300000'
        },
        cvss3: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'required',
            scope: 'unchanged',
            confidentiality_impact: 'none',
            integrity_impact: 'none',
            availability: 'high'
          },
          base_score: '5.500000'
        }
      },
      cve: 'CVE-2017-14988',
      title: "** DISPUTED ** Header::readfrom in IlmImf/ImfHeader.cpp in OpenEXR 2.2.0 allows remote attackers to cause a denial of service (excessive memory allocation) via a crafted file that is accessed with the ImfOpenInputFile function in IlmImf/ImfCRgbaFile.cpp. NOTE: The maintainer and multiple third parties believe that this vulnerability isn't valid.",
      severity: 'Medium',
      published: '2017-10-03',
      updated: '2019-09-23',
      state: 'Pending confirmation',
      cwe_reference: 'CWE-400',
      references: ['http://lists.opensuse.org/opensuse-security-announce/2019-08/msg00063.html', 'https://github.com/openexr/openexr/issues/248', 'https://nvd.nist.gov/vuln/detail/CVE-2017-14988'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2020-1927 affects apache2',
    id: '23504',
    firedtimes: 190
  },
  data: {
    vulnerability: {
      package: {
        name: 'apache2',
        version: '2.4.29-1ubuntu4.13',
        architecture: 'amd64',
        condition: 'Package unfixed'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'none'
          },
          base_score: '5.800000'
        }
      },
      cve: 'CVE-2020-1927',
      title: 'CVE-2020-1927 on Ubuntu 18.04 LTS (bionic) - low.',
      rationale: 'In Apache HTTP Server 2.4.0 to 2.4.41, redirects configured with mod_rewrite that were intended to be self-referential might be fooled by encoded newlines and redirect instead to an an unexpected URL within the request URL.',
      severity: 'Medium',
      published: '2020-04-02',
      updated: '2020-04-03',
      state: 'Unfixed',
      cwe_reference: 'CWE-601',
      references: ['http://lists.opensuse.org/opensuse-security-announce/2020-05/msg00002.html', 'http://www.openwall.com/lists/oss-security/2020/04/03/1', 'http://www.openwall.com/lists/oss-security/2020/04/04/1', 'https://httpd.apache.org/security/vulnerabilities_24.html', 'https://lists.apache.org/thread.html/r10b853ea87dd150b0e76fda3f8254dfdb23dd05fa55596405b58478e@%3Ccvs.httpd.apache.org%3E', 'https://lists.apache.org/thread.html/r1719675306dfbeaceff3dc63ccad3de2d5615919ca3c13276948b9ac@%3Cdev.httpd.apache.org%3E', 'https://lists.apache.org/thread.html/r52a52fd60a258f5999a8fa5424b30d9fd795885f9ff4828d889cd201@%3Cdev.httpd.apache.org%3E', 'https://lists.apache.org/thread.html/r70ba652b79ba224b2cbc0a183078b3a49df783b419903e3dcf4d78c7@%3Ccvs.httpd.apache.org%3E', 'https://security.netapp.com/advisory/ntap-20200413-0002/', 'https://nvd.nist.gov/vuln/detail/CVE-2020-1927', 'http://people.canonical.com/~ubuntu-security/cve/2020/CVE-2020-1927.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-1927', 'https://httpd.apache.org/security/vulnerabilities_24.html#CVE-2020-1927'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2020-1927 affects apache2-bin',
    id: '23504',
    firedtimes: 191
  },
  data: {
    vulnerability: {
      package: {
        name: 'apache2-bin',
        source: 'apache2',
        version: '2.4.29-1ubuntu4.13',
        architecture: 'amd64',
        condition: 'Package unfixed'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'none'
          },
          base_score: '5.800000'
        }
      },
      cve: 'CVE-2020-1927',
      title: 'CVE-2020-1927 on Ubuntu 18.04 LTS (bionic) - low.',
      rationale: 'In Apache HTTP Server 2.4.0 to 2.4.41, redirects configured with mod_rewrite that were intended to be self-referential might be fooled by encoded newlines and redirect instead to an an unexpected URL within the request URL.',
      severity: 'Medium',
      published: '2020-04-02',
      updated: '2020-04-03',
      state: 'Unfixed',
      cwe_reference: 'CWE-601',
      references: ['http://lists.opensuse.org/opensuse-security-announce/2020-05/msg00002.html', 'http://www.openwall.com/lists/oss-security/2020/04/03/1', 'http://www.openwall.com/lists/oss-security/2020/04/04/1', 'https://httpd.apache.org/security/vulnerabilities_24.html', 'https://lists.apache.org/thread.html/r10b853ea87dd150b0e76fda3f8254dfdb23dd05fa55596405b58478e@%3Ccvs.httpd.apache.org%3E', 'https://lists.apache.org/thread.html/r1719675306dfbeaceff3dc63ccad3de2d5615919ca3c13276948b9ac@%3Cdev.httpd.apache.org%3E', 'https://lists.apache.org/thread.html/r52a52fd60a258f5999a8fa5424b30d9fd795885f9ff4828d889cd201@%3Cdev.httpd.apache.org%3E', 'https://lists.apache.org/thread.html/r70ba652b79ba224b2cbc0a183078b3a49df783b419903e3dcf4d78c7@%3Ccvs.httpd.apache.org%3E', 'https://security.netapp.com/advisory/ntap-20200413-0002/', 'https://nvd.nist.gov/vuln/detail/CVE-2020-1927', 'http://people.canonical.com/~ubuntu-security/cve/2020/CVE-2020-1927.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-1927', 'https://httpd.apache.org/security/vulnerabilities_24.html#CVE-2020-1927'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2020-1927 affects apache2-data',
    id: '23504',
    firedtimes: 192
  },
  data: {
    vulnerability: {
      package: {
        name: 'apache2-data',
        source: 'apache2',
        version: '2.4.29-1ubuntu4.13',
        architecture: 'all',
        condition: 'Package unfixed'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'none'
          },
          base_score: '5.800000'
        }
      },
      cve: 'CVE-2020-1927',
      title: 'CVE-2020-1927 on Ubuntu 18.04 LTS (bionic) - low.',
      rationale: 'In Apache HTTP Server 2.4.0 to 2.4.41, redirects configured with mod_rewrite that were intended to be self-referential might be fooled by encoded newlines and redirect instead to an an unexpected URL within the request URL.',
      severity: 'Medium',
      published: '2020-04-02',
      updated: '2020-04-03',
      state: 'Unfixed',
      cwe_reference: 'CWE-601',
      references: ['http://lists.opensuse.org/opensuse-security-announce/2020-05/msg00002.html', 'http://www.openwall.com/lists/oss-security/2020/04/03/1', 'http://www.openwall.com/lists/oss-security/2020/04/04/1', 'https://httpd.apache.org/security/vulnerabilities_24.html', 'https://lists.apache.org/thread.html/r10b853ea87dd150b0e76fda3f8254dfdb23dd05fa55596405b58478e@%3Ccvs.httpd.apache.org%3E', 'https://lists.apache.org/thread.html/r1719675306dfbeaceff3dc63ccad3de2d5615919ca3c13276948b9ac@%3Cdev.httpd.apache.org%3E', 'https://lists.apache.org/thread.html/r52a52fd60a258f5999a8fa5424b30d9fd795885f9ff4828d889cd201@%3Cdev.httpd.apache.org%3E', 'https://lists.apache.org/thread.html/r70ba652b79ba224b2cbc0a183078b3a49df783b419903e3dcf4d78c7@%3Ccvs.httpd.apache.org%3E', 'https://security.netapp.com/advisory/ntap-20200413-0002/', 'https://nvd.nist.gov/vuln/detail/CVE-2020-1927', 'http://people.canonical.com/~ubuntu-security/cve/2020/CVE-2020-1927.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-1927', 'https://httpd.apache.org/security/vulnerabilities_24.html#CVE-2020-1927'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2020-1927 affects apache2-utils',
    id: '23504',
    firedtimes: 193
  },
  data: {
    vulnerability: {
      package: {
        name: 'apache2-utils',
        source: 'apache2',
        version: '2.4.29-1ubuntu4.13',
        architecture: 'amd64',
        condition: 'Package unfixed'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'none'
          },
          base_score: '5.800000'
        }
      },
      cve: 'CVE-2020-1927',
      title: 'CVE-2020-1927 on Ubuntu 18.04 LTS (bionic) - low.',
      rationale: 'In Apache HTTP Server 2.4.0 to 2.4.41, redirects configured with mod_rewrite that were intended to be self-referential might be fooled by encoded newlines and redirect instead to an an unexpected URL within the request URL.',
      severity: 'Medium',
      published: '2020-04-02',
      updated: '2020-04-03',
      state: 'Unfixed',
      cwe_reference: 'CWE-601',
      references: ['http://lists.opensuse.org/opensuse-security-announce/2020-05/msg00002.html', 'http://www.openwall.com/lists/oss-security/2020/04/03/1', 'http://www.openwall.com/lists/oss-security/2020/04/04/1', 'https://httpd.apache.org/security/vulnerabilities_24.html', 'https://lists.apache.org/thread.html/r10b853ea87dd150b0e76fda3f8254dfdb23dd05fa55596405b58478e@%3Ccvs.httpd.apache.org%3E', 'https://lists.apache.org/thread.html/r1719675306dfbeaceff3dc63ccad3de2d5615919ca3c13276948b9ac@%3Cdev.httpd.apache.org%3E', 'https://lists.apache.org/thread.html/r52a52fd60a258f5999a8fa5424b30d9fd795885f9ff4828d889cd201@%3Cdev.httpd.apache.org%3E', 'https://lists.apache.org/thread.html/r70ba652b79ba224b2cbc0a183078b3a49df783b419903e3dcf4d78c7@%3Ccvs.httpd.apache.org%3E', 'https://security.netapp.com/advisory/ntap-20200413-0002/', 'https://nvd.nist.gov/vuln/detail/CVE-2020-1927', 'http://people.canonical.com/~ubuntu-security/cve/2020/CVE-2020-1927.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-1927', 'https://httpd.apache.org/security/vulnerabilities_24.html#CVE-2020-1927'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2018-15919 affects openssh-client',
    id: '23504',
    firedtimes: 197
  },
  data: {
    vulnerability: {
      package: {
        name: 'openssh-client',
        source: 'openssh',
        version: '1:7.6p1-4ubuntu0.3',
        architecture: 'amd64',
        condition: 'Package greater or equal than 5.9 and less or equal than 7.8'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'none',
            availability: 'none'
          },
          base_score: '5'
        },
        cvss3: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'low',
            integrity_impact: 'none',
            availability: 'none'
          },
          base_score: '5.300000'
        }
      },
      cve: 'CVE-2018-15919',
      title: 'CVE-2018-15919 on Ubuntu 18.04 LTS (bionic) - low.',
      rationale: 'Remotely observable behaviour in auth-gss2.c in OpenSSH through 7.8 could be used by remote attackers to detect existence of users on a target system when GSS2 is in use. NOTE: the discoverer states \'We understand that the OpenSSH developers do not want to treat such a username enumeration (or "oracle") as a vulnerability.\'',
      severity: 'Medium',
      published: '2018-08-28',
      updated: '2019-03-07',
      state: 'Fixed',
      cwe_reference: 'CWE-200',
      bugzilla_references: ['http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=907503', 'https://bugzilla.novell.com/show_bug.cgi?id=CVE-2018-15919'],
      references: ['http://seclists.org/oss-sec/2018/q3/180', 'http://www.securityfocus.com/bid/105163', 'https://security.netapp.com/advisory/ntap-20181221-0001/', 'https://nvd.nist.gov/vuln/detail/CVE-2018-15919', 'http://people.canonical.com/~ubuntu-security/cve/2018/CVE-2018-15919.html', 'http://www.openwall.com/lists/oss-security/2018/08/27/2', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-15919'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2018-15919 affects openssh-server',
    id: '23504',
    firedtimes: 198
  },
  data: {
    vulnerability: {
      package: {
        name: 'openssh-server',
        source: 'openssh',
        version: '1:7.6p1-4ubuntu0.3',
        architecture: 'amd64',
        condition: 'Package greater or equal than 5.9 and less or equal than 7.8'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'none',
            availability: 'none'
          },
          base_score: '5'
        },
        cvss3: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'low',
            integrity_impact: 'none',
            availability: 'none'
          },
          base_score: '5.300000'
        }
      },
      cve: 'CVE-2018-15919',
      title: 'CVE-2018-15919 on Ubuntu 18.04 LTS (bionic) - low.',
      rationale: 'Remotely observable behaviour in auth-gss2.c in OpenSSH through 7.8 could be used by remote attackers to detect existence of users on a target system when GSS2 is in use. NOTE: the discoverer states \'We understand that the OpenSSH developers do not want to treat such a username enumeration (or "oracle") as a vulnerability.\'',
      severity: 'Medium',
      published: '2018-08-28',
      updated: '2019-03-07',
      state: 'Fixed',
      cwe_reference: 'CWE-200',
      bugzilla_references: ['http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=907503', 'https://bugzilla.novell.com/show_bug.cgi?id=CVE-2018-15919'],
      references: ['http://seclists.org/oss-sec/2018/q3/180', 'http://www.securityfocus.com/bid/105163', 'https://security.netapp.com/advisory/ntap-20181221-0001/', 'https://nvd.nist.gov/vuln/detail/CVE-2018-15919', 'http://people.canonical.com/~ubuntu-security/cve/2018/CVE-2018-15919.html', 'http://www.openwall.com/lists/oss-security/2018/08/27/2', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-15919'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2019-17595 affects ncurses-base',
    id: '23504',
    firedtimes: 222
  },
  data: {
    vulnerability: {
      package: {
        name: 'ncurses-base',
        source: 'ncurses',
        version: '6.1-1ubuntu1.18.04',
        architecture: 'all',
        condition: 'Package less than 6.1.20191012'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'none',
            availability: 'partial'
          },
          base_score: '5.800000'
        }
      },
      cve: 'CVE-2019-17595',
      title: 'CVE-2019-17595 on Ubuntu 18.04 LTS (bionic) - negligible.',
      rationale: 'There is a heap-based buffer over-read in the fmt_entry function in tinfo/comp_hash.c in the terminfo library in ncurses before 6.1-20191012.',
      severity: 'Medium',
      published: '2019-10-14',
      updated: '2019-12-23',
      state: 'Fixed',
      cwe_reference: 'CWE-125',
      bugzilla_references: ['https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=942401'],
      references: ['http://lists.opensuse.org/opensuse-security-announce/2019-11/msg00059.html', 'http://lists.opensuse.org/opensuse-security-announce/2019-11/msg00061.html', 'https://lists.gnu.org/archive/html/bug-ncurses/2019-10/msg00013.html', 'https://lists.gnu.org/archive/html/bug-ncurses/2019-10/msg00045.html', 'https://nvd.nist.gov/vuln/detail/CVE-2019-17595', 'http://people.canonical.com/~ubuntu-security/cve/2019/CVE-2019-17595.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-17595'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2019-17543 affects liblz4-1',
    id: '23504',
    firedtimes: 244
  },
  data: {
    vulnerability: {
      package: {
        name: 'liblz4-1',
        source: 'lz4',
        version: '0.0~r131-2ubuntu2',
        architecture: 'amd64',
        condition: 'Package less than 1.9.2'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '6.800000'
        }
      },
      cve: 'CVE-2019-17543',
      title: 'CVE-2019-17543 on Ubuntu 16.04 LTS (xenial) - low.',
      rationale: 'LZ4 before 1.9.2 has a heap-based buffer overflow in LZ4_write32 (related to LZ4_compress_destSize), affecting applications that call LZ4_compress_fast with a large input. (This issue can also lead to data corruption.) NOTE: the vendor states "only a few specific / uncommon usages of the API are at risk."',
      severity: 'Medium',
      published: '2019-10-14',
      updated: '2019-10-24',
      state: 'Fixed',
      cwe_reference: 'CWE-120',
      bugzilla_references: ['https://bugs.chromium.org/p/oss-fuzz/issues/detail?id=15941', 'https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=943680'],
      references: ['http://lists.opensuse.org/opensuse-security-announce/2019-10/msg00069.html', 'http://lists.opensuse.org/opensuse-security-announce/2019-10/msg00070.html', 'https://bugs.chromium.org/p/oss-fuzz/issues/detail?id=15941', 'https://github.com/lz4/lz4/compare/v1.9.1...v1.9.2', 'https://github.com/lz4/lz4/issues/801', 'https://github.com/lz4/lz4/pull/756', 'https://github.com/lz4/lz4/pull/760', 'https://lists.apache.org/thread.html/25015588b770d67470b7ba7ea49a305d6735dd7f00eabe7d50ec1e17@%3Cissues.arrow.apache.org%3E', 'https://lists.apache.org/thread.html/543302d55e2d2da4311994e9b0debdc676bf3fd05e1a2be3407aa2d6@%3Cissues.arrow.apache.org%3E', 'https://lists.apache.org/thread.html/793012683dc0fa6819b7c2560e6cf990811014c40c7d75412099c357@%3Cissues.arrow.apache.org%3E', 'https://lists.apache.org/thread.html/9ff0606d16be2ab6a81619e1c9e23c3e251756638e36272c8c8b7fa3@%3Cissues.arrow.apache.org%3E', 'https://lists.apache.org/thread.html/f0038c4fab2ee25aee849ebeff6b33b3aa89e07ccfb06b5c87b36316@%3Cissues.arrow.apache.org%3E', 'https://lists.apache.org/thread.html/f506bc371d4a068d5d84d7361293568f61167d3a1c3e91f0def2d7d3@%3Cdev.arrow.apache.org%3E', 'https://nvd.nist.gov/vuln/detail/CVE-2019-17543', 'http://people.canonical.com/~ubuntu-security/cve/2019/CVE-2019-17543.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-17543'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2018-20217 affects libkrb5-3',
    id: '23504',
    firedtimes: 254
  },
  data: {
    vulnerability: {
      package: {
        name: 'libkrb5-3',
        source: 'krb5',
        version: '1.13.2+dfsg-5ubuntu2.1',
        architecture: 'amd64',
        condition: 'Package unfixed'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'medium',
            authentication: 'single',
            confidentiality_impact: 'none',
            integrity_impact: 'none',
            availability: 'partial'
          },
          base_score: '3.500000'
        },
        cvss3: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'high',
            privileges_required: 'low',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'none',
            integrity_impact: 'none',
            availability: 'high'
          },
          base_score: '5.300000'
        }
      },
      cve: 'CVE-2018-20217',
      title: 'CVE-2018-20217 on Ubuntu 16.04 LTS (xenial) - medium.',
      rationale: 'A Reachable Assertion issue was discovered in the KDC in MIT Kerberos 5 (aka krb5) before 1.17. If an attacker can obtain a krbtgt ticket using an older encryption type (single-DES, triple-DES, or RC4), the attacker can crash the KDC by making an S4U2Self request.',
      severity: 'Medium',
      published: '2018-12-26',
      updated: '2019-10-03',
      state: 'Unfixed',
      cwe_reference: 'CWE-617',
      bugzilla_references: ['http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=917387', 'http://krbdev.mit.edu/rt/Ticket/Display.html?id=8763'],
      references: ['http://krbdev.mit.edu/rt/Ticket/Display.html?id=8763', 'https://github.com/krb5/krb5/commit/5e6d1796106df8ba6bc1973ee0917c170d929086', 'https://lists.debian.org/debian-lts-announce/2019/01/msg00020.html', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/2KNHELH4YHNT6H2ESJWX2UIDXLBNGB2O/', 'https://security.netapp.com/advisory/ntap-20190416-0006/', 'https://nvd.nist.gov/vuln/detail/CVE-2018-20217', 'http://people.canonical.com/~ubuntu-security/cve/2018/CVE-2018-20217.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-20217'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2018-14036 affects accountsservice',
    id: '23504',
    firedtimes: 256
  },
  data: {
    vulnerability: {
      package: {
        name: 'accountsservice',
        version: '0.6.40-2ubuntu11.3',
        architecture: 'amd64',
        condition: 'Package less than 0.6.50'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            authentication: 'single',
            confidentiality_impact: 'partial',
            integrity_impact: 'none',
            availability: 'none'
          },
          base_score: '4'
        },
        cvss3: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            privileges_required: 'low',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'high',
            integrity_impact: 'none',
            availability: 'none'
          },
          base_score: '6.500000'
        }
      },
      cve: 'CVE-2018-14036',
      title: 'CVE-2018-14036 on Ubuntu 16.04 LTS (xenial) - low.',
      rationale: 'Directory Traversal with ../ sequences occurs in AccountsService before 0.6.50 because of an insufficient path check in user_change_icon_file_authorized_cb() in user.c.',
      severity: 'Medium',
      published: '2018-07-13',
      updated: '2018-09-06',
      state: 'Fixed',
      cwe_reference: 'CWE-22',
      bugzilla_references: ['https://bugs.freedesktop.org/show_bug.cgi?id=107085', 'https://bugzilla.suse.com/show_bug.cgi?id=1099699'],
      references: ['http://www.openwall.com/lists/oss-security/2018/07/02/2', 'http://www.securityfocus.com/bid/104757', 'https://bugs.freedesktop.org/show_bug.cgi?id=107085', 'https://bugzilla.suse.com/show_bug.cgi?id=1099699', 'https://cgit.freedesktop.org/accountsservice/commit/?id=f9abd359f71a5bce421b9ae23432f539a067847a', 'https://nvd.nist.gov/vuln/detail/CVE-2018-14036', 'http://people.canonical.com/~ubuntu-security/cve/2018/CVE-2018-14036.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-14036'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2017-7244 affects libpcre3',
    id: '23504',
    firedtimes: 265
  },
  data: {
    vulnerability: {
      package: {
        name: 'libpcre3',
        source: 'pcre3',
        version: '2:8.38-3.1',
        architecture: 'amd64',
        condition: 'Package unfixed'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'none',
            integrity_impact: 'none',
            availability: 'partial'
          },
          base_score: '4.300000'
        },
        cvss3: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'required',
            scope: 'unchanged',
            confidentiality_impact: 'none',
            integrity_impact: 'none',
            availability: 'high'
          },
          base_score: '5.500000'
        }
      },
      cve: 'CVE-2017-7244',
      title: 'CVE-2017-7244 on Ubuntu 16.04 LTS (xenial) - low.',
      rationale: 'The _pcre32_xclass function in pcre_xclass.c in libpcre1 in PCRE 8.40 allows remote attackers to cause a denial of service (invalid memory read) via a crafted file.',
      severity: 'Medium',
      published: '2017-03-23',
      updated: '2018-08-17',
      state: 'Unfixed',
      cwe_reference: 'CWE-125',
      bugzilla_references: ['https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=858683', 'https://bugs.exim.org/show_bug.cgi?id=2052', 'https://bugs.exim.org/show_bug.cgi?id=2054'],
      references: ['http://www.securityfocus.com/bid/97067', 'https://access.redhat.com/errata/RHSA-2018:2486', 'https://blogs.gentoo.org/ago/2017/03/20/libpcre-invalid-memory-read-in-_pcre32_xclass-pcre_xclass-c/', 'https://security.gentoo.org/glsa/201710-25', 'https://nvd.nist.gov/vuln/detail/CVE-2017-7244', 'http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-7244.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-7244'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 5,
    description: 'CVE-2020-8631 affects grub-legacy-ec2',
    id: '23503',
    firedtimes: 32
  },
  data: {
    vulnerability: {
      package: {
        name: 'grub-legacy-ec2',
        source: 'cloud-init',
        version: '19.4-33-gbb4131a2-0ubuntu1~16.04.1',
        architecture: 'all',
        condition: 'Package less or equal than 19.4'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'none',
            availability: 'none'
          },
          base_score: '2.100000'
        }
      },
      cve: 'CVE-2020-8631',
      title: 'CVE-2020-8631 on Ubuntu 16.04 LTS (xenial) - low.',
      rationale: 'cloud-init through 19.4 relies on Mersenne Twister for a random password, which makes it easier for attackers to predict passwords, because rand_str in cloudinit/util.py calls the random.choice function.',
      severity: 'Low',
      published: '2020-02-05',
      updated: '2020-02-21',
      state: 'Fixed',
      cwe_reference: 'CWE-330',
      references: ['http://lists.opensuse.org/opensuse-security-announce/2020-03/msg00042.html', 'https://bugs.launchpad.net/ubuntu/+source/cloud-init/+bug/1860795', 'https://github.com/canonical/cloud-init/pull/204', 'https://lists.debian.org/debian-lts-announce/2020/02/msg00021.html', 'https://nvd.nist.gov/vuln/detail/CVE-2020-8631', 'http://people.canonical.com/~ubuntu-security/cve/2020/CVE-2020-8631.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2020-8631'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 10,
    description: 'CVE-2019-20079 affects vim',
    id: '23505',
    firedtimes: 109
  },
  data: {
    vulnerability: {
      package: {
        name: 'vim',
        version: '2:7.4.1689-3ubuntu1.4',
        architecture: 'amd64',
        condition: 'Package less than 8.1.2136'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '7.500000'
        }
      },
      cve: 'CVE-2019-20079',
      title: 'The autocmd feature in window.c in Vim before 8.1.2136 accesses freed memory.',
      severity: 'High',
      published: '2019-12-30',
      updated: '2020-03-30',
      state: 'Fixed',
      cwe_reference: 'CWE-416',
      references: ['https://github.com/vim/vim/commit/ec66c41d84e574baf8009dbc0bd088d2bc5b2421', 'https://github.com/vim/vim/compare/v8.1.2135...v8.1.2136', 'https://packetstormsecurity.com/files/154898', 'https://usn.ubuntu.com/4309-1/', 'https://nvd.nist.gov/vuln/detail/CVE-2019-20079'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2016-4484 affects cryptsetup',
    id: '23504',
    firedtimes: 290
  },
  data: {
    vulnerability: {
      package: {
        name: 'cryptsetup',
        version: '2:1.6.6-5ubuntu2.1',
        architecture: 'amd64',
        condition: 'Package less or equal than 2.1.7.3-2'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'complete',
            integrity_impact: 'complete',
            availability: 'complete'
          },
          base_score: '7.200000'
        },
        cvss3: {
          vector: {
            attack_vector: 'physical',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'high',
            integrity_impact: 'high',
            availability: 'high'
          },
          base_score: '6.800000'
        }
      },
      cve: 'CVE-2016-4484',
      title: 'CVE-2016-4484 on Ubuntu 16.04 LTS (xenial) - low.',
      rationale: 'The Debian initrd script for the cryptsetup package 2:1.7.3-2 and earlier allows physically proximate attackers to gain shell access via many log in attempts with an invalid password.',
      severity: 'Medium',
      published: '2017-01-23',
      updated: '2017-01-26',
      state: 'Fixed',
      cwe_reference: 'CWE-287',
      bugzilla_references: ['https://launchpad.net/bugs/1660701'],
      references: ['http://hmarco.org/bugs/CVE-2016-4484/CVE-2016-4484_cryptsetup_initrd_shell.html', 'http://www.openwall.com/lists/oss-security/2016/11/14/13', 'http://www.openwall.com/lists/oss-security/2016/11/15/1', 'http://www.openwall.com/lists/oss-security/2016/11/15/4', 'http://www.openwall.com/lists/oss-security/2016/11/16/6', 'http://www.securityfocus.com/bid/94315', 'https://gitlab.com/cryptsetup/cryptsetup/commit/ef8a7d82d8d3716ae9b58179590f7908981fa0cb', 'https://nvd.nist.gov/vuln/detail/CVE-2016-4484', 'http://people.canonical.com/~ubuntu-security/cve/2016/CVE-2016-4484.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2016-4484'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 10,
    description: 'CVE-2019-13050 affects gnupg',
    id: '23505',
    firedtimes: 114
  },
  data: {
    vulnerability: {
      package: {
        name: 'gnupg',
        version: '1.4.20-1ubuntu3.3',
        architecture: 'amd64',
        condition: 'Package less or equal than 2.2.16'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'none',
            integrity_impact: 'none',
            availability: 'partial'
          },
          base_score: '5'
        },
        cvss3: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'none',
            integrity_impact: 'none',
            availability: 'high'
          },
          base_score: '7.500000'
        }
      },
      cve: 'CVE-2019-13050',
      title: 'CVE-2019-13050 on Ubuntu 16.04 LTS (xenial) - low.',
      rationale: 'Interaction between the sks-keyserver code through 1.2.0 of the SKS keyserver network, and GnuPG through 2.2.16, makes it risky to have a GnuPG keyserver configuration line referring to a host on the SKS keyserver network. Retrieving data from this network may cause a persistent denial of service, because of a Certificate Spamming Attack.',
      severity: 'High',
      published: '2019-06-29',
      updated: '2019-07-09',
      state: 'Fixed',
      cwe_reference: 'CWE-297',
      bugzilla_references: ['https://bugs.launchpad.net/bugs/1844059', 'https://bugzilla.suse.com/show_bug.cgi?id=CVE-2019-13050', 'https://dev.gnupg.org/T4591', 'https://dev.gnupg.org/T4607', 'https://dev.gnupg.org/T4628'],
      references: ['http://lists.opensuse.org/opensuse-security-announce/2019-08/msg00039.html', 'https://gist.github.com/rjhansen/67ab921ffb4084c865b3618d6955275f', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/AUK2YRO6QIH64WP2LRA5D4LACTXQPPU4/', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/CP4ON34YEXEZDZOXXWV43KVGGO6WZLJ5/', 'https://lists.gnupg.org/pipermail/gnupg-announce/2019q3/000439.html', 'https://support.f5.com/csp/article/K08654551', 'https://support.f5.com/csp/article/K08654551?utm_source=f5support&amp;utm_medium=RSS', 'https://twitter.com/lambdafu/status/1147162583969009664', 'https://nvd.nist.gov/vuln/detail/CVE-2019-13050', 'http://people.canonical.com/~ubuntu-security/cve/2019/CVE-2019-13050.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-13050'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 10,
    description: 'CVE-2018-7738 affects mount',
    id: '23505',
    firedtimes: 128
  },
  data: {
    vulnerability: {
      package: {
        name: 'mount',
        source: 'util-linux',
        version: '2.27.1-6ubuntu3.10',
        architecture: 'amd64',
        condition: 'Package less or equal than 2.31'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'complete',
            integrity_impact: 'complete',
            availability: 'complete'
          },
          base_score: '7.200000'
        },
        cvss3: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            privileges_required: 'low',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'high',
            integrity_impact: 'high',
            availability: 'high'
          },
          base_score: '7.800000'
        }
      },
      cve: 'CVE-2018-7738',
      title: 'CVE-2018-7738 on Ubuntu 16.04 LTS (xenial) - negligible.',
      rationale: 'In util-linux before 2.32-rc1, bash-completion/umount allows local users to gain privileges by embedding shell commands in a mountpoint name, which is mishandled during a umount command (within Bash) by a different user, as demonstrated by logging in as root and entering umount followed by a tab character for autocompletion.',
      severity: 'High',
      published: '2018-03-07',
      updated: '2019-10-03',
      state: 'Fixed',
      cwe_reference: 'NVD-CWE-noinfo',
      bugzilla_references: ['http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=892179', 'https://github.com/karelzak/util-linux/issues/539'],
      references: ['http://www.securityfocus.com/bid/103367', 'https://bugs.debian.org/892179', 'https://github.com/karelzak/util-linux/commit/75f03badd7ed9f1dd951863d75e756883d3acc55', 'https://github.com/karelzak/util-linux/issues/539', 'https://www.debian.org/security/2018/dsa-4134', 'https://nvd.nist.gov/vuln/detail/CVE-2018-7738', 'http://people.canonical.com/~ubuntu-security/cve/2018/CVE-2018-7738.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-7738'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 10,
    description: 'CVE-2018-7738 affects util-linux',
    id: '23505',
    firedtimes: 129
  },
  data: {
    vulnerability: {
      package: {
        name: 'util-linux',
        version: '2.27.1-6ubuntu3.10',
        architecture: 'amd64',
        condition: 'Package less or equal than 2.31'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'complete',
            integrity_impact: 'complete',
            availability: 'complete'
          },
          base_score: '7.200000'
        },
        cvss3: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            privileges_required: 'low',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'high',
            integrity_impact: 'high',
            availability: 'high'
          },
          base_score: '7.800000'
        }
      },
      cve: 'CVE-2018-7738',
      title: 'CVE-2018-7738 on Ubuntu 16.04 LTS (xenial) - negligible.',
      rationale: 'In util-linux before 2.32-rc1, bash-completion/umount allows local users to gain privileges by embedding shell commands in a mountpoint name, which is mishandled during a umount command (within Bash) by a different user, as demonstrated by logging in as root and entering umount followed by a tab character for autocompletion.',
      severity: 'High',
      published: '2018-03-07',
      updated: '2019-10-03',
      state: 'Fixed',
      cwe_reference: 'NVD-CWE-noinfo',
      bugzilla_references: ['http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=892179', 'https://github.com/karelzak/util-linux/issues/539'],
      references: ['http://www.securityfocus.com/bid/103367', 'https://bugs.debian.org/892179', 'https://github.com/karelzak/util-linux/commit/75f03badd7ed9f1dd951863d75e756883d3acc55', 'https://github.com/karelzak/util-linux/issues/539', 'https://www.debian.org/security/2018/dsa-4134', 'https://nvd.nist.gov/vuln/detail/CVE-2018-7738', 'http://people.canonical.com/~ubuntu-security/cve/2018/CVE-2018-7738.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-7738'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 10,
    description: 'CVE-2018-7738 affects uuid-runtime',
    id: '23505',
    firedtimes: 130
  },
  data: {
    vulnerability: {
      package: {
        name: 'uuid-runtime',
        source: 'util-linux',
        version: '2.27.1-6ubuntu3.10',
        architecture: 'amd64',
        condition: 'Package less or equal than 2.31'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'complete',
            integrity_impact: 'complete',
            availability: 'complete'
          },
          base_score: '7.200000'
        },
        cvss3: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            privileges_required: 'low',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'high',
            integrity_impact: 'high',
            availability: 'high'
          },
          base_score: '7.800000'
        }
      },
      cve: 'CVE-2018-7738',
      title: 'CVE-2018-7738 on Ubuntu 16.04 LTS (xenial) - negligible.',
      rationale: 'In util-linux before 2.32-rc1, bash-completion/umount allows local users to gain privileges by embedding shell commands in a mountpoint name, which is mishandled during a umount command (within Bash) by a different user, as demonstrated by logging in as root and entering umount followed by a tab character for autocompletion.',
      severity: 'High',
      published: '2018-03-07',
      updated: '2019-10-03',
      state: 'Fixed',
      cwe_reference: 'NVD-CWE-noinfo',
      bugzilla_references: ['http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=892179', 'https://github.com/karelzak/util-linux/issues/539'],
      references: ['http://www.securityfocus.com/bid/103367', 'https://bugs.debian.org/892179', 'https://github.com/karelzak/util-linux/commit/75f03badd7ed9f1dd951863d75e756883d3acc55', 'https://github.com/karelzak/util-linux/issues/539', 'https://www.debian.org/security/2018/dsa-4134', 'https://nvd.nist.gov/vuln/detail/CVE-2018-7738', 'http://people.canonical.com/~ubuntu-security/cve/2018/CVE-2018-7738.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-7738'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 5,
    description: 'CVE-2019-1547 affects libssl1.0.0',
    id: '23503',
    firedtimes: 35
  },
  data: {
    vulnerability: {
      package: {
        name: 'libssl1.0.0',
        source: 'openssl',
        version: '1.0.2g-1ubuntu4.15',
        architecture: 'amd64',
        condition: 'Package greater or equal than 1.0.2 and less or equal than 1.0.2s'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'none',
            availability: 'none'
          },
          base_score: '1.900000'
        }
      },
      cve: 'CVE-2019-1547',
      title: 'CVE-2019-1547 on Ubuntu 16.04 LTS (xenial) - low.',
      rationale: 'Normally in OpenSSL EC groups always have a co-factor present and this is used in side channel resistant code paths. However, in some cases, it is possible to construct a group using explicit parameters (instead of using a named curve). In those cases it is possible that such a group does not have the cofactor present. This can occur even where all the parameters match a known named curve. If such a curve is used then OpenSSL falls back to non-side channel resistant code paths which may result in full key recovery during an ECDSA signature operation. In order to be vulnerable an attacker would have to have the ability to time the creation of a large number of signatures where explicit parameters with no co-factor present are in use by an application using libcrypto. For the avoidance of doubt libssl is not vulnerable because explicit parameters are never used. Fixed in OpenSSL 1.1.1d (Affected 1.1.1-1.1.1c). Fixed in OpenSSL 1.1.0l (Affected 1.1.0-1.1.0k). Fixed in OpenSSL 1.0.2t (Affected 1.0.2-1.0.2s).',
      severity: 'Low',
      published: '2019-09-10',
      updated: '2019-09-12',
      state: 'Fixed',
      cwe_reference: 'CWE-311',
      references: ['http://lists.opensuse.org/opensuse-security-announce/2019-09/msg00054.html', 'http://lists.opensuse.org/opensuse-security-announce/2019-09/msg00072.html', 'http://lists.opensuse.org/opensuse-security-announce/2019-10/msg00012.html', 'http://lists.opensuse.org/opensuse-security-announce/2019-10/msg00016.html', 'http://packetstormsecurity.com/files/154467/Slackware-Security-Advisory-openssl-Updates.html', 'https://arxiv.org/abs/1909.01785', 'https://git.openssl.org/gitweb/?p=openssl.git;a=commitdiff;h=21c856b75d81eff61aa63b4f036bb64a85bf6d46', 'https://git.openssl.org/gitweb/?p=openssl.git;a=commitdiff;h=30c22fa8b1d840036b8e203585738df62a03cec8', 'https://git.openssl.org/gitweb/?p=openssl.git;a=commitdiff;h=7c1709c2da5414f5b6133d00a03fc8c5bf996c7a', 'https://lists.debian.org/debian-lts-announce/2019/09/msg00026.html', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/GY6SNRJP2S7Y42GIIDO3HXPNMDYN2U3A/', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/ZN4VVQJ3JDCHGIHV4Y2YTXBYQZ6PWQ7E/', 'https://seclists.org/bugtraq/2019/Oct/0', 'https://seclists.org/bugtraq/2019/Oct/1', 'https://seclists.org/bugtraq/2019/Sep/25', 'https://security.gentoo.org/glsa/201911-04', 'https://security.netapp.com/advisory/ntap-20190919-0002/', 'https://security.netapp.com/advisory/ntap-20200122-0002/', 'https://support.f5.com/csp/article/K73422160?utm_source=f5support&amp;utm_medium=RSS', 'https://www.debian.org/security/2019/dsa-4539', 'https://www.debian.org/security/2019/dsa-4540', 'https://www.openssl.org/news/secadv/20190910.txt', 'https://www.oracle.com/security-alerts/cpuapr2020.html', 'https://www.oracle.com/security-alerts/cpujan2020.html', 'https://www.oracle.com/technetwork/security-advisory/cpuoct2019-5072832.html', 'https://www.tenable.com/security/tns-2019-08', 'https://www.tenable.com/security/tns-2019-09', 'https://nvd.nist.gov/vuln/detail/CVE-2019-1547', 'http://people.canonical.com/~ubuntu-security/cve/2019/CVE-2019-1547.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-1547', 'https://usn.ubuntu.com/usn/usn-4376-1'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 10,
    description: 'CVE-2019-3843 affects systemd',
    id: '23505',
    firedtimes: 134
  },
  data: {
    vulnerability: {
      package: {
        name: 'systemd',
        version: '229-4ubuntu21.27',
        architecture: 'amd64',
        condition: 'Package less than 242'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '4.600000'
        },
        cvss3: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            privileges_required: 'low',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'high',
            integrity_impact: 'high',
            availability: 'high'
          },
          base_score: '7.800000'
        }
      },
      cve: 'CVE-2019-3843',
      title: 'It was discovered that a systemd service that uses DynamicUser property can create a SUID/SGID binary that would be allowed to run as the transient service UID/GID even after the service is terminated. A local attacker may use this flaw to access resources that will be owned by a potentially different service in the future, when the UID/GID will be recycled.',
      severity: 'High',
      published: '2019-04-26',
      updated: '2019-06-19',
      state: 'Fixed',
      cwe_reference: 'CWE-264',
      references: ['http://www.securityfocus.com/bid/108116', 'https://bugzilla.redhat.com/show_bug.cgi?id=CVE-2019-3843', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/5JXQAKSTMABZ46EVCRMW62DHWYHTTFES/', 'https://security.netapp.com/advisory/ntap-20190619-0002/', 'https://usn.ubuntu.com/4269-1/', 'https://nvd.nist.gov/vuln/detail/CVE-2019-3843'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2019-11727 affects thunderbird',
    id: '23504',
    firedtimes: 312
  },
  data: {
    vulnerability: {
      package: {
        name: 'thunderbird',
        version: '1:68.8.0+build2-0ubuntu0.16.04.2',
        architecture: 'amd64',
        condition: 'Package unfixed'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'none',
            integrity_impact: 'partial',
            availability: 'none'
          },
          base_score: '5'
        },
        cvss3: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'none',
            integrity_impact: 'low',
            availability: 'none'
          },
          base_score: '5.300000'
        }
      },
      cve: 'CVE-2019-11727',
      title: 'CVE-2019-11727 on Ubuntu 16.04 LTS (xenial) - medium.',
      rationale: 'A vulnerability exists where it possible to force Network Security Services (NSS) to sign CertificateVerify with PKCS#1 v1.5 signatures when those are the only ones advertised by server in CertificateRequest in TLS 1.3. PKCS#1 v1.5 signatures should not be used for TLS 1.3 messages. This vulnerability affects Firefox < 68.',
      severity: 'Medium',
      published: '2019-07-23',
      updated: '2019-07-30',
      state: 'Unfixed',
      cwe_reference: 'CWE-295',
      bugzilla_references: ['https://bugzilla.mozilla.org/show_bug.cgi?id=1552208'],
      references: ['http://lists.opensuse.org/opensuse-security-announce/2019-10/msg00009.html', 'http://lists.opensuse.org/opensuse-security-announce/2019-10/msg00010.html', 'http://lists.opensuse.org/opensuse-security-announce/2019-10/msg00011.html', 'http://lists.opensuse.org/opensuse-security-announce/2019-10/msg00017.html', 'http://lists.opensuse.org/opensuse-security-announce/2020-01/msg00006.html', 'https://access.redhat.com/errata/RHSA-2019:1951', 'https://bugzilla.mozilla.org/show_bug.cgi?id=1552208', 'https://security.gentoo.org/glsa/201908-12', 'https://www.mozilla.org/security/advisories/mfsa2019-21/', 'https://nvd.nist.gov/vuln/detail/CVE-2019-11727', 'http://people.canonical.com/~ubuntu-security/cve/2019/CVE-2019-11727.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-11727', 'https://usn.ubuntu.com/usn/usn-4054-1', 'https://usn.ubuntu.com/usn/usn-4060-1', 'https://www.mozilla.org/en-US/security/advisories/mfsa2019-21/#CVE-2019-11727'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 10,
    description: 'CVE-2019-18276 affects bash',
    id: '23505',
    firedtimes: 158
  },
  data: {
    vulnerability: {
      package: {
        name: 'bash',
        version: '4.3-14ubuntu1.4',
        architecture: 'amd64',
        condition: 'Package less or equal than 5.0'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'complete',
            integrity_impact: 'complete',
            availability: 'complete'
          },
          base_score: '7.200000'
        }
      },
      cve: 'CVE-2019-18276',
      title: 'CVE-2019-18276 on Ubuntu 16.04 LTS (xenial) - low.',
      rationale: 'An issue was discovered in disable_priv_mode in shell.c in GNU Bash through 5.0 patch 11. By default, if Bash is run with its effective UID not equal to its real UID, it will drop privileges by setting its effective UID to its real UID. However, it does so incorrectly. On Linux and other systems that support "saved UID" functionality, the saved UID is not dropped. An attacker with command execution in the shell can use "enable -f" for runtime loading of a new builtin, which can be a shared object that calls setuid() and therefore regains privileges. However, binaries running with an effective UID of 0 are unaffected.',
      severity: 'High',
      published: '2019-11-28',
      updated: '2020-04-30',
      state: 'Fixed',
      cwe_reference: 'CWE-273',
      bugzilla_references: ['https://bugzilla.suse.com/show_bug.cgi?id=1158028'],
      references: ['http://packetstormsecurity.com/files/155498/Bash-5.0-Patch-11-Privilege-Escalation.html', 'https://github.com/bminor/bash/commit/951bdaad7a18cc0dc1036bba86b18b90874d39ff', 'https://security.netapp.com/advisory/ntap-20200430-0003/', 'https://www.youtube.com/watch?v=-wGtxJ8opa8', 'https://nvd.nist.gov/vuln/detail/CVE-2019-18276', 'http://people.canonical.com/~ubuntu-security/cve/2019/CVE-2019-18276.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-18276'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2017-9502 affects curl',
    id: '23504',
    firedtimes: 334
  },
  data: {
    vulnerability: {
      package: {
        name: 'curl',
        version: '7.47.0-1ubuntu2.14',
        architecture: 'amd64',
        condition: 'Package less or equal than 7.54.0'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'none',
            integrity_impact: 'none',
            availability: 'partial'
          },
          base_score: '5'
        },
        cvss3: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'none',
            integrity_impact: 'none',
            availability: 'low'
          },
          base_score: '5.300000'
        }
      },
      cve: 'CVE-2017-9502',
      title: 'In curl before 7.54.1 on Windows and DOS, libcurl\'s default protocol function, which is the logic that allows an application to set which protocol libcurl should attempt to use when given a URL without a scheme part, had a flaw that could lead to it overwriting a heap based memory buffer with seven bytes. If the default protocol is specified to be FILE or a file: URL lacks two slashes, the given "URL" starts with a drive letter, and libcurl is built for Windows or DOS, then libcurl would copy the path 7 bytes off, so that the end of the given path would write beyond the malloc buffer (7 bytes being the length in bytes of the ascii string "file://").',
      severity: 'Medium',
      published: '2017-06-14',
      updated: '2017-07-08',
      state: 'Fixed',
      cwe_reference: 'CWE-119',
      references: ['http://openwall.com/lists/oss-security/2017/06/14/1', 'http://www.securityfocus.com/bid/99120', 'http://www.securitytracker.com/id/1038697', 'https://curl.haxx.se/docs/adv_20170614.html', 'https://nvd.nist.gov/vuln/detail/CVE-2017-9502'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 10,
    description: 'CVE-2018-20483 affects wget',
    id: '23505',
    firedtimes: 175
  },
  data: {
    vulnerability: {
      package: {
        name: 'wget',
        version: '1.17.1-1ubuntu1.5',
        architecture: 'amd64',
        condition: 'Package less than 1.20.1'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'none',
            availability: 'none'
          },
          base_score: '2.100000'
        },
        cvss3: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            privileges_required: 'low',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'high',
            integrity_impact: 'high',
            availability: 'high'
          },
          base_score: '7.800000'
        }
      },
      cve: 'CVE-2018-20483',
      title: "set_file_metadata in xattr.c in GNU Wget before 1.20.1 stores a file's origin URL in the user.xdg.origin.url metadata attribute of the extended attributes of the downloaded file, which allows local users to obtain sensitive information (e.g., credentials contained in the URL) by reading this attribute, as demonstrated by getfattr. This also applies to Referer information in the user.xdg.referrer.url metadata attribute. According to 2016-07-22 in the Wget ChangeLog, user.xdg.origin.url was partially based on the behavior of fwrite_xattr in tool_xattr.c in curl.",
      severity: 'High',
      published: '2018-12-26',
      updated: '2019-04-09',
      state: 'Fixed',
      cwe_reference: 'CWE-255',
      references: ['http://git.savannah.gnu.org/cgit/wget.git/tree/NEWS', 'http://www.securityfocus.com/bid/106358', 'https://access.redhat.com/errata/RHSA-2019:3701', 'https://security.gentoo.org/glsa/201903-08', 'https://security.netapp.com/advisory/ntap-20190321-0002/', 'https://twitter.com/marcan42/status/1077676739877232640', 'https://usn.ubuntu.com/3943-1/', 'https://nvd.nist.gov/vuln/detail/CVE-2018-20483'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2019-1010204 affects binutils',
    id: '23504',
    firedtimes: 369
  },
  data: {
    vulnerability: {
      package: {
        name: 'binutils',
        version: '2.26.1-1ubuntu1~16.04.8',
        architecture: 'amd64',
        condition: 'Package greater or equal than 2.21 and less or equal than 2.31.1'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'none',
            integrity_impact: 'none',
            availability: 'partial'
          },
          base_score: '4.300000'
        },
        cvss3: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'required',
            scope: 'unchanged',
            confidentiality_impact: 'none',
            integrity_impact: 'none',
            availability: 'high'
          },
          base_score: '5.500000'
        }
      },
      cve: 'CVE-2019-1010204',
      title: 'CVE-2019-1010204 on Ubuntu 16.04 LTS (xenial) - low.',
      rationale: 'GNU binutils gold gold v1.11-v1.16 (GNU binutils v2.21-v2.31.1) is affected by: Improper Input Validation, Signed/Unsigned Comparison, Out-of-bounds Read. The impact is: Denial of service. The component is: gold/fileread.cc:497, elfcpp/elfcpp_file.h:644. The attack vector is: An ELF file with an invalid e_shoff header field must be opened.',
      severity: 'Medium',
      published: '2019-07-23',
      updated: '2019-08-22',
      state: 'Fixed',
      cwe_reference: 'CWE-125',
      bugzilla_references: ['https://sourceware.org/bugzilla/show_bug.cgi?id=23765'],
      references: ['https://security.netapp.com/advisory/ntap-20190822-0001/', 'https://sourceware.org/bugzilla/show_bug.cgi?id=23765', 'https://support.f5.com/csp/article/K05032915?utm_source=f5support&amp;utm_medium=RSS', 'https://nvd.nist.gov/vuln/detail/CVE-2019-1010204', 'http://people.canonical.com/~ubuntu-security/cve/2019/CVE-2019-1010204.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-1010204'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2019-14855 affects dirmngr',
    id: '23504',
    firedtimes: 382
  },
  data: {
    vulnerability: {
      package: {
        name: 'dirmngr',
        source: 'gnupg2',
        version: '2.1.11-6ubuntu2.1',
        architecture: 'amd64',
        condition: 'Package unfixed'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'none',
            availability: 'none'
          },
          base_score: '5'
        }
      },
      cve: 'CVE-2019-14855',
      title: 'CVE-2019-14855 on Ubuntu 16.04 LTS (xenial) - low.',
      rationale: 'A flaw was found in the way certificate signatures could be forged using collisions found in the SHA-1 algorithm. An attacker could use this weakness to create forged certificate signatures. This issue affects GnuPG versions before 2.2.18.',
      severity: 'Medium',
      published: '2020-03-20',
      updated: '2020-03-24',
      state: 'Unfixed',
      cwe_reference: 'CWE-327',
      bugzilla_references: ['https://dev.gnupg.org/T4755'],
      references: ['https://bugzilla.redhat.com/show_bug.cgi?id=CVE-2019-14855', 'https://dev.gnupg.org/T4755', 'https://lists.gnupg.org/pipermail/gnupg-announce/2019q4/000442.html', 'https://rwc.iacr.org/2020/slides/Leurent.pdf', 'https://nvd.nist.gov/vuln/detail/CVE-2019-14855', 'http://people.canonical.com/~ubuntu-security/cve/2019/CVE-2019-14855.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-14855', 'https://eprint.iacr.org/2020/014.pdf'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2016-5011 affects uuid-runtime',
    id: '23504',
    firedtimes: 395
  },
  data: {
    vulnerability: {
      package: {
        name: 'uuid-runtime',
        source: 'util-linux',
        version: '2.27.1-6ubuntu3.10',
        architecture: 'amd64',
        condition: 'Package unfixed'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'none',
            integrity_impact: 'none',
            availability: 'complete'
          },
          base_score: '4.700000'
        },
        cvss3: {
          vector: {
            attack_vector: 'physical',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'required',
            scope: 'unchanged',
            confidentiality_impact: 'none',
            integrity_impact: 'none',
            availability: 'high'
          },
          base_score: '4.300000'
        }
      },
      cve: 'CVE-2016-5011',
      title: 'CVE-2016-5011 on Ubuntu 16.04 LTS (xenial) - low.',
      rationale: 'The parse_dos_extended function in partitions/dos.c in the libblkid library in util-linux allows physically proximate attackers to cause a denial of service (memory consumption) via a crafted MSDOS partition table with an extended partition boot record at zero offset.',
      severity: 'Medium',
      published: '2017-04-11',
      updated: '2017-04-17',
      state: 'Unfixed',
      cwe_reference: 'CWE-399',
      bugzilla_references: ['http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=830802', 'https://bugzilla.redhat.com/show_bug.cgi?id=1349536'],
      references: ['http://rhn.redhat.com/errata/RHSA-2016-2605.html', 'http://www.openwall.com/lists/oss-security/2016/07/11/2', 'http://www.securityfocus.com/bid/91683', 'http://www.securitytracker.com/id/1036272', 'http://www-01.ibm.com/support/docview.wss?uid=isg3T1024543', 'http://www-01.ibm.com/support/docview.wss?uid=nas8N1021801', 'https://git.kernel.org/pub/scm/utils/util-linux/util-linux.git/commit/?id=7164a1c3', 'https://nvd.nist.gov/vuln/detail/CVE-2016-5011', 'http://people.canonical.com/~ubuntu-security/cve/2016/CVE-2016-5011.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2016-5011'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2015-5191 affects open-vm-tools',
    id: '23504',
    firedtimes: 396
  },
  data: {
    vulnerability: {
      package: {
        name: 'open-vm-tools',
        version: '2:10.2.0-3~ubuntu0.16.04.1',
        architecture: 'amd64',
        condition: 'Package unfixed'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'high',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '3.700000'
        },
        cvss3: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'high',
            privileges_required: 'low',
            user_interaction: 'required',
            scope: 'unchanged',
            confidentiality_impact: 'high',
            integrity_impact: 'high',
            availability: 'high'
          },
          base_score: '6.700000'
        }
      },
      cve: 'CVE-2015-5191',
      title: 'CVE-2015-5191 on Ubuntu 16.04 LTS (xenial) - low.',
      rationale: 'VMware Tools prior to 10.0.9 contains multiple file system races in libDeployPkg, related to the use of hard-coded paths under /tmp. Successful exploitation of this issue may result in a local privilege escalation. CVSS:3.0/AV:L/AC:H/PR:L/UI:R/S:U/C:H/I:H/A:H',
      severity: 'Medium',
      published: '2017-07-28',
      updated: '2017-08-08',
      state: 'Unfixed',
      cwe_reference: 'CWE-362',
      bugzilla_references: ['http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=869633'],
      references: ['http://www.securityfocus.com/bid/100011', 'http://www.securitytracker.com/id/1039013', 'https://www.vmware.com/security/advisories/VMSA-2017-0013.html', 'https://nvd.nist.gov/vuln/detail/CVE-2015-5191', 'http://people.canonical.com/~ubuntu-security/cve/2015/CVE-2015-5191.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2015-5191'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2018-8975 affects netpbm',
    id: '23504',
    firedtimes: 397
  },
  data: {
    vulnerability: {
      package: {
        name: 'netpbm',
        source: 'netpbm-free',
        version: '2:10.0-15.3',
        architecture: 'amd64',
        condition: 'Package less or equal than 10.81.03'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'medium',
            authentication: 'none',
            confidentiality_impact: 'none',
            integrity_impact: 'none',
            availability: 'partial'
          },
          base_score: '4.300000'
        },
        cvss3: {
          vector: {
            attack_vector: 'local',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'required',
            scope: 'unchanged',
            confidentiality_impact: 'none',
            integrity_impact: 'none',
            availability: 'high'
          },
          base_score: '5.500000'
        }
      },
      cve: 'CVE-2018-8975',
      title: 'The pm_mallocarray2 function in lib/util/mallocvar.c in Netpbm through 10.81.03 allows remote attackers to cause a denial of service (heap-based buffer over-read) via a crafted image file, as demonstrated by pbmmask.',
      severity: 'Medium',
      published: '2018-03-25',
      updated: '2019-10-03',
      state: 'Fixed',
      cwe_reference: 'CWE-125',
      references: ['http://lists.opensuse.org/opensuse-security-announce/2019-04/msg00056.html', 'https://github.com/xiaoqx/pocs/blob/master/netpbm', 'https://nvd.nist.gov/vuln/detail/CVE-2018-8975'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 7,
    description: 'CVE-2019-19232 affects sudo',
    id: '23504',
    firedtimes: 398
  },
  data: {
    vulnerability: {
      package: {
        name: 'sudo',
        version: '1.8.16-0ubuntu1.9',
        architecture: 'amd64',
        condition: 'Package less or equal than 1.8.29'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'none',
            integrity_impact: 'partial',
            availability: 'none'
          },
          base_score: '5'
        }
      },
      cve: 'CVE-2019-19232',
      title: 'CVE-2019-19232 on Ubuntu 16.04 LTS (xenial) - low.',
      rationale: '** DISPUTED ** In Sudo through 1.8.29, an attacker with access to a Runas ALL sudoer account can impersonate a nonexistent user by invoking sudo with a numeric uid that is not associated with any user. NOTE: The software maintainer believes that this is not a vulnerability because running a command via sudo as a user not present in the local password database is an intentional feature. Because this behavior surprised some users, sudo 1.8.30 introduced an option to enable/disable this behavior with the default being disabled. However, this does not change the fact that sudo was behaving as intended, and as documented, in earlier versions.',
      severity: 'Medium',
      published: '2019-12-19',
      updated: '2020-01-30',
      state: 'Fixed',
      cwe_reference: 'NVD-CWE-noinfo',
      bugzilla_references: ['https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=947225'],
      references: ['http://seclists.org/fulldisclosure/2020/Mar/31', 'https://access.redhat.com/security/cve/cve-2019-19232', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/I6TKF36KOQUVJNBHSVJFA7BU3CCEYD2F/', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/IY6DZ7WMDKU4ZDML6MJLDAPG42B5WVUC/', 'https://quickview.cloudapps.cisco.com/quickview/bug/CSCvs58103', 'https://quickview.cloudapps.cisco.com/quickview/bug/CSCvs58812', 'https://quickview.cloudapps.cisco.com/quickview/bug/CSCvs58979', 'https://quickview.cloudapps.cisco.com/quickview/bug/CSCvs76870', 'https://security.netapp.com/advisory/ntap-20200103-0004/', 'https://support.apple.com/en-gb/HT211100', 'https://support.apple.com/kb/HT211100', 'https://support2.windriver.com/index.php?page=cve&on=view&id=CVE-2019-19232', 'https://support2.windriver.com/index.php?page=defects&on=view&id=LIN1018-5506', 'https://www.bsi.bund.de/SharedDocs/Warnmeldungen/DE/CB/2019/12/warnmeldung_cb-k20-0001.html', 'https://www.oracle.com/security-alerts/bulletinapr2020.html', 'https://www.sudo.ws/devel.html#1.8.30b2', 'https://www.sudo.ws/stable.html', 'https://www.tenable.com/plugins/nessus/133936', 'https://nvd.nist.gov/vuln/detail/CVE-2019-19232', 'http://people.canonical.com/~ubuntu-security/cve/2019/CVE-2019-19232.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-19232'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 13,
    description: 'CVE-2017-12588 affects rsyslog',
    id: '23506',
    firedtimes: 64
  },
  data: {
    vulnerability: {
      package: {
        name: 'rsyslog',
        version: '8.16.0-1ubuntu3.1',
        architecture: 'amd64',
        condition: 'Package less or equal than 8.27.0'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '7.500000'
        },
        cvss3: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'high',
            integrity_impact: 'high',
            availability: 'high'
          },
          base_score: '9.800000'
        }
      },
      cve: 'CVE-2017-12588',
      title: 'The zmq3 input and output modules in rsyslog before 8.28.0 interpreted description fields as format strings, possibly allowing a format string attack with unspecified impact.',
      severity: 'Critical',
      published: '2017-08-06',
      updated: '2017-08-14',
      state: 'Fixed',
      cwe_reference: 'CWE-134',
      references: ['https://github.com/rsyslog/rsyslog/blob/master/ChangeLog', 'https://github.com/rsyslog/rsyslog/commit/062d0c671a29f7c6f7dff4a2f1f35df375bbb30b', 'https://github.com/rsyslog/rsyslog/pull/1565', 'https://nvd.nist.gov/vuln/detail/CVE-2017-12588'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 13,
    description: 'CVE-2017-18342 affects python3-yaml',
    id: '23506',
    firedtimes: 65
  },
  data: {
    vulnerability: {
      package: {
        name: 'python3-yaml',
        source: 'pyyaml',
        version: '3.11-3build1',
        architecture: 'amd64',
        condition: 'Package unfixed'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '7.500000'
        },
        cvss3: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'high',
            integrity_impact: 'high',
            availability: 'high'
          },
          base_score: '9.800000'
        }
      },
      cve: 'CVE-2017-18342',
      title: 'CVE-2017-18342 on Ubuntu 16.04 LTS (xenial) - low.',
      rationale: "In PyYAML before 5.1, the yaml.load() API could execute arbitrary code if used with untrusted data. The load() function has been deprecated in version 5.1 and the 'UnsafeLoader' has been introduced for backward compatibility with the function.",
      severity: 'Critical',
      published: '2018-06-27',
      updated: '2019-06-24',
      state: 'Unfixed',
      cwe_reference: 'CWE-20',
      bugzilla_references: ['http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=902878'],
      references: ['https://github.com/marshmallow-code/apispec/issues/278', 'https://github.com/yaml/pyyaml/blob/master/CHANGES', 'https://github.com/yaml/pyyaml/issues/193', 'https://github.com/yaml/pyyaml/pull/74', 'https://github.com/yaml/pyyaml/wiki/PyYAML-yaml.load(input)-Deprecation', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/JEX7IPV5P2QJITAMA5Z63GQCZA5I6NVZ/', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/KSQQMRUQSXBSUXLCRD3TSZYQ7SEZRKCE/', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/M6JCFGEIEOFMWWIXGHSELMKQDD4CV2BA/', 'https://security.gentoo.org/glsa/202003-45', 'https://nvd.nist.gov/vuln/detail/CVE-2017-18342', 'http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-18342.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-18342'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 13,
    description: 'CVE-2017-15994 affects rsync',
    id: '23506',
    firedtimes: 66
  },
  data: {
    vulnerability: {
      package: {
        name: 'rsync',
        version: '3.1.1-3ubuntu1.3',
        architecture: 'amd64',
        condition: 'Package less or equal than 3.1.2'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '7.500000'
        },
        cvss3: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'high',
            integrity_impact: 'high',
            availability: 'high'
          },
          base_score: '9.800000'
        }
      },
      cve: 'CVE-2017-15994',
      title: 'rsync 3.1.3-development before 2017-10-24 mishandles archaic checksums, which makes it easier for remote attackers to bypass intended access restrictions. NOTE: the rsync development branch has significant use beyond the rsync developers, e.g., the code has been copied for use in various GitHub projects.',
      severity: 'Critical',
      published: '2017-10-29',
      updated: '2019-10-03',
      state: 'Fixed',
      cwe_reference: 'CWE-354',
      references: ['https://git.samba.org/?p=rsync.git;a=commit;h=7b8a4ecd6ff9cdf4e5d3850ebf822f1e989255b3', 'https://git.samba.org/?p=rsync.git;a=commit;h=9a480deec4d20277d8e20bc55515ef0640ca1e55', 'https://git.samba.org/?p=rsync.git;a=commit;h=c252546ceeb0925eb8a4061315e3ff0a8c55b48b', 'https://nvd.nist.gov/vuln/detail/CVE-2017-15994'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 13,
    description: 'CVE-2019-9169 affects libc6',
    id: '23506',
    firedtimes: 68
  },
  data: {
    vulnerability: {
      package: {
        name: 'libc6',
        source: 'glibc',
        version: '2.23-0ubuntu11',
        architecture: 'amd64',
        condition: 'Package less or equal than 2.29'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '7.500000'
        },
        cvss3: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'high',
            integrity_impact: 'high',
            availability: 'high'
          },
          base_score: '9.800000'
        }
      },
      cve: 'CVE-2019-9169',
      title: 'CVE-2019-9169 on Ubuntu 16.04 LTS (xenial) - low.',
      rationale: 'In the GNU C Library (aka glibc or libc6) through 2.29, proceed_next_node in posix/regexec.c has a heap-based buffer over-read via an attempted case-insensitive regular-expression match.',
      severity: 'Critical',
      published: '2019-02-26',
      updated: '2019-04-16',
      state: 'Fixed',
      cwe_reference: 'CWE-125',
      bugzilla_references: ['https://debbugs.gnu.org/cgi/bugreport.cgi?bug=34140', 'https://debbugs.gnu.org/cgi/bugreport.cgi?bug=34142', 'https://sourceware.org/bugzilla/show_bug.cgi?id=24114'],
      references: ['http://www.securityfocus.com/bid/107160', 'https://debbugs.gnu.org/cgi/bugreport.cgi?bug=34140', 'https://debbugs.gnu.org/cgi/bugreport.cgi?bug=34142', 'https://kc.mcafee.com/corporate/index?page=content&id=SB10278', 'https://security.netapp.com/advisory/ntap-20190315-0002/', 'https://sourceware.org/bugzilla/show_bug.cgi?id=24114', 'https://sourceware.org/git/gitweb.cgi?p=glibc.git;a=commit;h=583dd860d5b833037175247230a328f0050dbfe9', 'https://support.f5.com/csp/article/K54823184', 'https://nvd.nist.gov/vuln/detail/CVE-2019-9169', 'http://people.canonical.com/~ubuntu-security/cve/2019/CVE-2019-9169.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2019-9169'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 13,
    description: 'CVE-2017-15088 affects krb5-locales',
    id: '23506',
    firedtimes: 73
  },
  data: {
    vulnerability: {
      package: {
        name: 'krb5-locales',
        source: 'krb5',
        version: '1.13.2+dfsg-5ubuntu2.1',
        architecture: 'all',
        condition: 'Package unfixed'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '7.500000'
        },
        cvss3: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'high',
            integrity_impact: 'high',
            availability: 'high'
          },
          base_score: '9.800000'
        }
      },
      cve: 'CVE-2017-15088',
      title: 'CVE-2017-15088 on Ubuntu 16.04 LTS (xenial) - negligible.',
      rationale: 'plugins/preauth/pkinit/pkinit_crypto_openssl.c in MIT Kerberos 5 (aka krb5) through 1.15.2 mishandles Distinguished Name (DN) fields, which allows remote attackers to execute arbitrary code or cause a denial of service (buffer overflow and application crash) in situations involving untrusted X.509 data, related to the get_matching_data and X509_NAME_oneline_ex functions. NOTE: this has security relevance only in use cases outside of the MIT Kerberos distribution, e.g., the use of get_matching_data in KDC certauth plugin code that is specific to Red Hat.',
      severity: 'Critical',
      published: '2017-11-23',
      updated: '2019-10-09',
      state: 'Unfixed',
      cwe_reference: 'CWE-119',
      bugzilla_references: ['http://bugs.debian.org/cgi-bin/bugreport.cgi?bug=871698'],
      references: ['http://www.securityfocus.com/bid/101594', 'https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=871698', 'https://bugzilla.redhat.com/show_bug.cgi?id=1504045', 'https://github.com/krb5/krb5/commit/fbb687db1088ddd894d975996e5f6a4252b9a2b4', 'https://github.com/krb5/krb5/pull/707', 'https://nvd.nist.gov/vuln/detail/CVE-2017-15088', 'http://people.canonical.com/~ubuntu-security/cve/2017/CVE-2017-15088.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-15088'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 13,
    description: 'CVE-2018-6485 affects libc-bin',
    id: '23506',
    firedtimes: 78
  },
  data: {
    vulnerability: {
      package: {
        name: 'libc-bin',
        source: 'glibc',
        version: '2.23-0ubuntu11',
        architecture: 'amd64',
        condition: 'Package less or equal than 2.26'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '7.500000'
        },
        cvss3: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'high',
            integrity_impact: 'high',
            availability: 'high'
          },
          base_score: '9.800000'
        }
      },
      cve: 'CVE-2018-6485',
      title: 'CVE-2018-6485 on Ubuntu 16.04 LTS (xenial) - medium.',
      rationale: 'An integer overflow in the implementation of the posix_memalign in memalign functions in the GNU C Library (aka glibc or libc6) 2.26 and earlier could cause these functions to return a pointer to a heap area that is too small, potentially leading to heap corruption.',
      severity: 'Critical',
      published: '2018-02-01',
      updated: '2019-12-10',
      state: 'Fixed',
      cwe_reference: 'CWE-190',
      bugzilla_references: ['http://bugs.debian.org/878159', 'https://sourceware.org/bugzilla/show_bug.cgi?id=22343'],
      references: ['http://bugs.debian.org/878159', 'http://www.securityfocus.com/bid/102912', 'https://access.redhat.com/errata/RHBA-2019:0327', 'https://access.redhat.com/errata/RHSA-2018:3092', 'https://security.netapp.com/advisory/ntap-20190404-0003/', 'https://sourceware.org/bugzilla/show_bug.cgi?id=22343', 'https://usn.ubuntu.com/4218-1/', 'https://www.oracle.com/technetwork/security-advisory/cpuapr2019-5072813.html', 'https://nvd.nist.gov/vuln/detail/CVE-2018-6485', 'http://people.canonical.com/~ubuntu-security/cve/2018/CVE-2018-6485.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-6485', 'https://usn.ubuntu.com/usn/usn-4218-1'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 13,
    description: 'CVE-2016-7944 affects libxfixes3',
    id: '23506',
    firedtimes: 82
  },
  data: {
    vulnerability: {
      package: {
        name: 'libxfixes3',
        source: 'libxfixes',
        version: '1:5.0.1-2',
        architecture: 'amd64',
        condition: 'Package less or equal than 5.0.2'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '7.500000'
        },
        cvss3: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'high',
            integrity_impact: 'high',
            availability: 'high'
          },
          base_score: '9.800000'
        }
      },
      cve: 'CVE-2016-7944',
      title: 'CVE-2016-7944 on Ubuntu 16.04 LTS (xenial) - low.',
      rationale: 'Integer overflow in X.org libXfixes before 5.0.3 on 32-bit platforms might allow remote X servers to gain privileges via a length value of INT_MAX, which triggers the client to stop reading data and get out of sync.',
      severity: 'Critical',
      published: '2016-12-13',
      updated: '2017-07-01',
      state: 'Fixed',
      cwe_reference: 'CWE-190',
      bugzilla_references: ['https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=840442'],
      references: ['http://www.openwall.com/lists/oss-security/2016/10/04/2', 'http://www.openwall.com/lists/oss-security/2016/10/04/4', 'http://www.securityfocus.com/bid/93361', 'http://www.securitytracker.com/id/1036945', 'https://cgit.freedesktop.org/xorg/lib/libXfixes/commit/?id=61c1039ee23a2d1de712843bed3480654d7ef42e', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/4CE6VJWBMOWLSCH4OP4TAEPIA7NP53ON/', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/GE43MDCRGS4R7MRRZNVSLREHRLU5OHCV/', 'https://lists.x.org/archives/xorg-announce/2016-October/002720.html', 'https://security.gentoo.org/glsa/201704-03', 'https://nvd.nist.gov/vuln/detail/CVE-2016-7944', 'http://people.canonical.com/~ubuntu-security/cve/2016/CVE-2016-7944.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2016-7944'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 13,
    description: 'CVE-2016-7947 affects libxrandr2',
    id: '23506',
    firedtimes: 83
  },
  data: {
    vulnerability: {
      package: {
        name: 'libxrandr2',
        source: 'libxrandr',
        version: '2:1.5.0-1',
        architecture: 'amd64',
        condition: 'Package less or equal than 1.5.0'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '7.500000'
        },
        cvss3: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'high',
            integrity_impact: 'high',
            availability: 'high'
          },
          base_score: '9.800000'
        }
      },
      cve: 'CVE-2016-7947',
      title: 'CVE-2016-7947 on Ubuntu 16.04 LTS (xenial) - low.',
      rationale: 'Multiple integer overflows in X.org libXrandr before 1.5.1 allow remote X servers to trigger out-of-bounds write operations via a crafted response.',
      severity: 'Critical',
      published: '2016-12-13',
      updated: '2017-07-01',
      state: 'Fixed',
      cwe_reference: 'CWE-787',
      references: ['http://www.openwall.com/lists/oss-security/2016/10/04/2', 'http://www.openwall.com/lists/oss-security/2016/10/04/4', 'http://www.securityfocus.com/bid/93365', 'http://www.securitytracker.com/id/1036945', 'https://cgit.freedesktop.org/xorg/lib/libXrandr/commit/?id=a0df3e1c7728205e5c7650b2e6dce684139254a6', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/74FFOHWYIKQZTJLRJWDMJ4W3WYBELUUG/', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/Y7662OZWCSTLRPKS6R3E4Y4M26BSVAAM/', 'https://lists.x.org/archives/xorg-announce/2016-October/002720.html', 'https://security.gentoo.org/glsa/201704-03', 'https://nvd.nist.gov/vuln/detail/CVE-2016-7947', 'http://people.canonical.com/~ubuntu-security/cve/2016/CVE-2016-7947.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2016-7947'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}, {
  rule: {
    level: 13,
    description: 'CVE-2016-7948 affects libxrandr2',
    id: '23506',
    firedtimes: 84
  },
  data: {
    vulnerability: {
      package: {
        name: 'libxrandr2',
        source: 'libxrandr',
        version: '2:1.5.0-1',
        architecture: 'amd64',
        condition: 'Package less or equal than 1.5.0'
      },
      cvss: {
        cvss2: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            authentication: 'none',
            confidentiality_impact: 'partial',
            integrity_impact: 'partial',
            availability: 'partial'
          },
          base_score: '7.500000'
        },
        cvss3: {
          vector: {
            attack_vector: 'network',
            access_complexity: 'low',
            privileges_required: 'none',
            user_interaction: 'none',
            scope: 'unchanged',
            confidentiality_impact: 'high',
            integrity_impact: 'high',
            availability: 'high'
          },
          base_score: '9.800000'
        }
      },
      cve: 'CVE-2016-7948',
      title: 'CVE-2016-7948 on Ubuntu 16.04 LTS (xenial) - low.',
      rationale: 'X.org libXrandr before 1.5.1 allows remote X servers to trigger out-of-bounds write operations by leveraging mishandling of reply data.',
      severity: 'Critical',
      published: '2016-12-13',
      updated: '2017-07-01',
      state: 'Fixed',
      cwe_reference: 'CWE-787',
      references: ['http://www.openwall.com/lists/oss-security/2016/10/04/2', 'http://www.openwall.com/lists/oss-security/2016/10/04/4', 'http://www.securityfocus.com/bid/93373', 'http://www.securitytracker.com/id/1036945', 'https://cgit.freedesktop.org/xorg/lib/libXrandr/commit/?id=a0df3e1c7728205e5c7650b2e6dce684139254a6', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/74FFOHWYIKQZTJLRJWDMJ4W3WYBELUUG/', 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/Y7662OZWCSTLRPKS6R3E4Y4M26BSVAAM/', 'https://lists.x.org/archives/xorg-announce/2016-October/002720.html', 'https://security.gentoo.org/glsa/201704-03', 'https://nvd.nist.gov/vuln/detail/CVE-2016-7948', 'http://people.canonical.com/~ubuntu-security/cve/2016/CVE-2016-7948.html', 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2016-7948'],
      assigner: 'cve@mitre.org',
      cve_version: '4.0',
      status: 'Active'
    }
  }
}];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJkYXRhIiwiZXhwb3J0cyIsInJ1bGUiLCJsZXZlbCIsImRlc2NyaXB0aW9uIiwiaWQiLCJmaXJlZHRpbWVzIiwidnVsbmVyYWJpbGl0eSIsInBhY2thZ2UiLCJuYW1lIiwidmVyc2lvbiIsImFyY2hpdGVjdHVyZSIsImNvbmRpdGlvbiIsImN2c3MiLCJjdnNzMiIsInZlY3RvciIsImF0dGFja192ZWN0b3IiLCJhY2Nlc3NfY29tcGxleGl0eSIsImF1dGhlbnRpY2F0aW9uIiwiY29uZmlkZW50aWFsaXR5X2ltcGFjdCIsImludGVncml0eV9pbXBhY3QiLCJhdmFpbGFiaWxpdHkiLCJiYXNlX3Njb3JlIiwiY3ZzczMiLCJwcml2aWxlZ2VzX3JlcXVpcmVkIiwidXNlcl9pbnRlcmFjdGlvbiIsInNjb3BlIiwiY3ZlIiwidGl0bGUiLCJyYXRpb25hbGUiLCJzZXZlcml0eSIsInB1Ymxpc2hlZCIsInVwZGF0ZWQiLCJzdGF0ZSIsImN3ZV9yZWZlcmVuY2UiLCJyZWZlcmVuY2VzIiwiYXNzaWduZXIiLCJjdmVfdmVyc2lvbiIsInN0YXR1cyIsInNvdXJjZSIsImJ1Z3ppbGxhX3JlZmVyZW5jZXMiXSwic291cmNlcyI6WyJ2dWxuZXJhYmlsaXRpZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVnVsbmVyYWJpbGl0eVxuXG5leHBvcnQgY29uc3QgZGF0YSA9IFtcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiA3LFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAxNy0xODAxOCBhZmZlY3RzIGNvcmV1dGlscycsXG4gICAgICBpZDogJzIzNTA0JyxcbiAgICAgIGZpcmVkdGltZXM6IDEsXG4gICAgfSxcbiAgICBkYXRhOiB7XG4gICAgICB2dWxuZXJhYmlsaXR5OiB7XG4gICAgICAgIHBhY2thZ2U6IHtcbiAgICAgICAgICBuYW1lOiAnY29yZXV0aWxzJyxcbiAgICAgICAgICB2ZXJzaW9uOiAnOC4yOC0xdWJ1bnR1MScsXG4gICAgICAgICAgYXJjaGl0ZWN0dXJlOiAnYW1kNjQnLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ1BhY2thZ2UgbGVzcyBvciBlcXVhbCB0aGFuIDguMjknLFxuICAgICAgICB9LFxuICAgICAgICBjdnNzOiB7XG4gICAgICAgICAgY3ZzczI6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbG9jYWwnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ21lZGl1bScsXG4gICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdub25lJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnMS45MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY3ZzczM6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbG9jYWwnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2hpZ2gnLFxuICAgICAgICAgICAgICBwcml2aWxlZ2VzX3JlcXVpcmVkOiAnbG93JyxcbiAgICAgICAgICAgICAgdXNlcl9pbnRlcmFjdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBzY29wZTogJ3VuY2hhbmdlZCcsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ2hpZ2gnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdub25lJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNC43MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDE3LTE4MDE4JyxcbiAgICAgICAgdGl0bGU6ICdDVkUtMjAxNy0xODAxOCBvbiBVYnVudHUgMTguMDQgTFRTIChiaW9uaWMpIC0gbG93LicsXG4gICAgICAgIHJhdGlvbmFsZTpcbiAgICAgICAgICAnSW4gR05VIENvcmV1dGlscyB0aHJvdWdoIDguMjksIGNob3duLWNvcmUuYyBpbiBjaG93biBhbmQgY2hncnAgZG9lcyBub3QgcHJldmVudCByZXBsYWNlbWVudCBvZiBhIHBsYWluIGZpbGUgd2l0aCBhIHN5bWxpbmsgZHVyaW5nIHVzZSBvZiB0aGUgUE9TSVggXCItUiAtTFwiIG9wdGlvbnMsIHdoaWNoIGFsbG93cyBsb2NhbCB1c2VycyB0byBtb2RpZnkgdGhlIG93bmVyc2hpcCBvZiBhcmJpdHJhcnkgZmlsZXMgYnkgbGV2ZXJhZ2luZyBhIHJhY2UgY29uZGl0aW9uLicsXG4gICAgICAgIHNldmVyaXR5OiAnTWVkaXVtJyxcbiAgICAgICAgcHVibGlzaGVkOiAnMjAxOC0wMS0wNCcsXG4gICAgICAgIHVwZGF0ZWQ6ICcyMDE4LTAxLTE5JyxcbiAgICAgICAgc3RhdGU6ICdGaXhlZCcsXG4gICAgICAgIGN3ZV9yZWZlcmVuY2U6ICdDV0UtMzYyJyxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vbGlzdHMuZ251Lm9yZy9hcmNoaXZlL2h0bWwvY29yZXV0aWxzLzIwMTctMTIvbXNnMDAwNDUuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vbnZkLm5pc3QuZ292L3Z1bG4vZGV0YWlsL0NWRS0yMDE3LTE4MDE4JyxcbiAgICAgICAgICAnaHR0cDovL3Blb3BsZS5jYW5vbmljYWwuY29tL351YnVudHUtc2VjdXJpdHkvY3ZlLzIwMTcvQ1ZFLTIwMTctMTgwMTguaHRtbCcsXG4gICAgICAgICAgJ2h0dHA6Ly93d3cub3BlbndhbGwuY29tL2xpc3RzL29zcy1zZWN1cml0eS8yMDE4LzAxLzA0LzMnLFxuICAgICAgICAgICdodHRwczovL2N2ZS5taXRyZS5vcmcvY2dpLWJpbi9jdmVuYW1lLmNnaT9uYW1lPUNWRS0yMDE3LTE4MDE4JyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5nbnUub3JnL2FyY2hpdmUvaHRtbC9jb3JldXRpbHMvMjAxNy0xMi9tc2cwMDA3Mi5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5nbnUub3JnL2FyY2hpdmUvaHRtbC9jb3JldXRpbHMvMjAxNy0xMi9tc2cwMDA3My5odG1sJyxcbiAgICAgICAgXSxcbiAgICAgICAgYXNzaWduZXI6ICdjdmVAbWl0cmUub3JnJyxcbiAgICAgICAgY3ZlX3ZlcnNpb246ICc0LjAnLFxuICAgICAgICBzdGF0dXM6ICdBY3RpdmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDcsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NWRS0yMDE5LTE3NTQwIGFmZmVjdHMgaW1hZ2VtYWdpY2snLFxuICAgICAgaWQ6ICcyMzUwNCcsXG4gICAgICBmaXJlZHRpbWVzOiAyLFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgdnVsbmVyYWJpbGl0eToge1xuICAgICAgICBwYWNrYWdlOiB7XG4gICAgICAgICAgbmFtZTogJ2ltYWdlbWFnaWNrJyxcbiAgICAgICAgICB2ZXJzaW9uOiAnODo2LjkuNy40K2Rmc2ctMTZ1YnVudHU2LjgnLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIGxlc3MgdGhhbiA3LjAuOC01NCcsXG4gICAgICAgIH0sXG4gICAgICAgIGN2c3M6IHtcbiAgICAgICAgICBjdnNzMjoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICduZXR3b3JrJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdtZWRpdW0nLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAncGFydGlhbCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzYuODAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjdmU6ICdDVkUtMjAxOS0xNzU0MCcsXG4gICAgICAgIHRpdGxlOlxuICAgICAgICAgICdJbWFnZU1hZ2ljayBiZWZvcmUgNy4wLjgtNTQgaGFzIGEgaGVhcC1iYXNlZCBidWZmZXIgb3ZlcmZsb3cgaW4gUmVhZFBTSW5mbyBpbiBjb2RlcnMvcHMuYy4nLFxuICAgICAgICBzZXZlcml0eTogJ01lZGl1bScsXG4gICAgICAgIHB1Ymxpc2hlZDogJzIwMTktMTAtMTQnLFxuICAgICAgICB1cGRhdGVkOiAnMjAxOS0xMC0yMycsXG4gICAgICAgIHN0YXRlOiAnRml4ZWQnLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnQ1dFLTEyMCcsXG4gICAgICAgIHJlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL29zcy1mdXp6L2lzc3Vlcy9kZXRhaWw/aWQ9MTU4MjYnLFxuICAgICAgICAgICdodHRwczovL2J1Z3MuZGViaWFuLm9yZy9jZ2ktYmluL2J1Z3JlcG9ydC5jZ2k/YnVnPTk0MjU3OCcsXG4gICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9JbWFnZU1hZ2ljay9JbWFnZU1hZ2ljay9jb21wYXJlLzcuMC44LTUzLi4uNy4wLjgtNTQnLFxuICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vSW1hZ2VNYWdpY2svSW1hZ2VNYWdpY2svY29tcGFyZS9tYXN0ZXJAJTdCMjAxOS0wNy0xNSU3RC4uLm1hc3RlckAlN0IyMDE5LTA3LTE3JTdEJyxcbiAgICAgICAgICAnaHR0cHM6Ly9zZWN1cml0eS10cmFja2VyLmRlYmlhbi5vcmcvdHJhY2tlci9DVkUtMjAxOS0xNzU0MCcsXG4gICAgICAgICAgJ2h0dHBzOi8vbnZkLm5pc3QuZ292L3Z1bG4vZGV0YWlsL0NWRS0yMDE5LTE3NTQwJyxcbiAgICAgICAgXSxcbiAgICAgICAgYXNzaWduZXI6ICdjdmVAbWl0cmUub3JnJyxcbiAgICAgICAgY3ZlX3ZlcnNpb246ICc0LjAnLFxuICAgICAgICBzdGF0dXM6ICdBY3RpdmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDcsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NWRS0yMDE5LTE3NTQwIGFmZmVjdHMgbGlibWFnaWNrY29yZS02LnExNi0zJyxcbiAgICAgIGlkOiAnMjM1MDQnLFxuICAgICAgZmlyZWR0aW1lczogNSxcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdsaWJtYWdpY2tjb3JlLTYucTE2LTMnLFxuICAgICAgICAgIHNvdXJjZTogJ2ltYWdlbWFnaWNrJyxcbiAgICAgICAgICB2ZXJzaW9uOiAnODo2LjkuNy40K2Rmc2ctMTZ1YnVudHU2LjgnLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIGxlc3MgdGhhbiA3LjAuOC01NCcsXG4gICAgICAgIH0sXG4gICAgICAgIGN2c3M6IHtcbiAgICAgICAgICBjdnNzMjoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICduZXR3b3JrJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdtZWRpdW0nLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAncGFydGlhbCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzYuODAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjdmU6ICdDVkUtMjAxOS0xNzU0MCcsXG4gICAgICAgIHRpdGxlOlxuICAgICAgICAgICdJbWFnZU1hZ2ljayBiZWZvcmUgNy4wLjgtNTQgaGFzIGEgaGVhcC1iYXNlZCBidWZmZXIgb3ZlcmZsb3cgaW4gUmVhZFBTSW5mbyBpbiBjb2RlcnMvcHMuYy4nLFxuICAgICAgICBzZXZlcml0eTogJ01lZGl1bScsXG4gICAgICAgIHB1Ymxpc2hlZDogJzIwMTktMTAtMTQnLFxuICAgICAgICB1cGRhdGVkOiAnMjAxOS0xMC0yMycsXG4gICAgICAgIHN0YXRlOiAnRml4ZWQnLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnQ1dFLTEyMCcsXG4gICAgICAgIHJlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL29zcy1mdXp6L2lzc3Vlcy9kZXRhaWw/aWQ9MTU4MjYnLFxuICAgICAgICAgICdodHRwczovL2J1Z3MuZGViaWFuLm9yZy9jZ2ktYmluL2J1Z3JlcG9ydC5jZ2k/YnVnPTk0MjU3OCcsXG4gICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9JbWFnZU1hZ2ljay9JbWFnZU1hZ2ljay9jb21wYXJlLzcuMC44LTUzLi4uNy4wLjgtNTQnLFxuICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vSW1hZ2VNYWdpY2svSW1hZ2VNYWdpY2svY29tcGFyZS9tYXN0ZXJAJTdCMjAxOS0wNy0xNSU3RC4uLm1hc3RlckAlN0IyMDE5LTA3LTE3JTdEJyxcbiAgICAgICAgICAnaHR0cHM6Ly9zZWN1cml0eS10cmFja2VyLmRlYmlhbi5vcmcvdHJhY2tlci9DVkUtMjAxOS0xNzU0MCcsXG4gICAgICAgICAgJ2h0dHBzOi8vbnZkLm5pc3QuZ292L3Z1bG4vZGV0YWlsL0NWRS0yMDE5LTE3NTQwJyxcbiAgICAgICAgXSxcbiAgICAgICAgYXNzaWduZXI6ICdjdmVAbWl0cmUub3JnJyxcbiAgICAgICAgY3ZlX3ZlcnNpb246ICc0LjAnLFxuICAgICAgICBzdGF0dXM6ICdBY3RpdmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDEwLFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAxOC0xMDAwMDM1IGFmZmVjdHMgdW56aXAnLFxuICAgICAgaWQ6ICcyMzUwNScsXG4gICAgICBmaXJlZHRpbWVzOiAxLFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgdnVsbmVyYWJpbGl0eToge1xuICAgICAgICBwYWNrYWdlOiB7XG4gICAgICAgICAgbmFtZTogJ3VuemlwJyxcbiAgICAgICAgICB2ZXJzaW9uOiAnNi4wLTIxdWJ1bnR1MScsXG4gICAgICAgICAgYXJjaGl0ZWN0dXJlOiAnYW1kNjQnLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ1BhY2thZ2UgbGVzcyBvciBlcXVhbCB0aGFuIDYuMDAnLFxuICAgICAgICB9LFxuICAgICAgICBjdnNzOiB7XG4gICAgICAgICAgY3ZzczI6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbmV0d29yaycsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbWVkaXVtJyxcbiAgICAgICAgICAgICAgYXV0aGVudGljYXRpb246ICdub25lJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc2LjgwMDAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjdnNzMzoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICdsb2NhbCcsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbG93JyxcbiAgICAgICAgICAgICAgcHJpdmlsZWdlc19yZXF1aXJlZDogJ25vbmUnLFxuICAgICAgICAgICAgICB1c2VyX2ludGVyYWN0aW9uOiAncmVxdWlyZWQnLFxuICAgICAgICAgICAgICBzY29wZTogJ3VuY2hhbmdlZCcsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdoaWdoJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ2hpZ2gnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdoaWdoJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNy44MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDE4LTEwMDAwMzUnLFxuICAgICAgICB0aXRsZTogJ0NWRS0yMDE4LTEwMDAwMzUgb24gVWJ1bnR1IDE4LjA0IExUUyAoYmlvbmljKSAtIGxvdy4nLFxuICAgICAgICByYXRpb25hbGU6XG4gICAgICAgICAgJ0EgaGVhcC1iYXNlZCBidWZmZXIgb3ZlcmZsb3cgZXhpc3RzIGluIEluZm8tWmlwIFVuWmlwIHZlcnNpb24gPD0gNi4wMCBpbiB0aGUgcHJvY2Vzc2luZyBvZiBwYXNzd29yZC1wcm90ZWN0ZWQgYXJjaGl2ZXMgdGhhdCBhbGxvd3MgYW4gYXR0YWNrZXIgdG8gcGVyZm9ybSBhIGRlbmlhbCBvZiBzZXJ2aWNlIG9yIHRvIHBvc3NpYmx5IGFjaGlldmUgY29kZSBleGVjdXRpb24uJyxcbiAgICAgICAgc2V2ZXJpdHk6ICdIaWdoJyxcbiAgICAgICAgcHVibGlzaGVkOiAnMjAxOC0wMi0wOScsXG4gICAgICAgIHVwZGF0ZWQ6ICcyMDIwLTAxLTI5JyxcbiAgICAgICAgc3RhdGU6ICdGaXhlZCcsXG4gICAgICAgIGN3ZV9yZWZlcmVuY2U6ICdDV0UtMTE5JyxcbiAgICAgICAgYnVnemlsbGFfcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vYnVncy5kZWJpYW4ub3JnL2NnaS1iaW4vYnVncmVwb3J0LmNnaT9idWc9ODg5ODM4JyxcbiAgICAgICAgXSxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwczovL2xpc3RzLmRlYmlhbi5vcmcvZGViaWFuLWx0cy1hbm5vdW5jZS8yMDIwLzAxL21zZzAwMDI2Lmh0bWwnLFxuICAgICAgICAgICdodHRwczovL3NlYy1jb25zdWx0LmNvbS9lbi9ibG9nL2Fkdmlzb3JpZXMvbXVsdGlwbGUtdnVsbmVyYWJpbGl0aWVzLWluLWluZm96aXAtdW56aXAvaW5kZXguaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vc2VjdXJpdHkuZ2VudG9vLm9yZy9nbHNhLzIwMjAwMy01OCcsXG4gICAgICAgICAgJ2h0dHBzOi8vbnZkLm5pc3QuZ292L3Z1bG4vZGV0YWlsL0NWRS0yMDE4LTEwMDAwMzUnLFxuICAgICAgICAgICdodHRwOi8vcGVvcGxlLmNhbm9uaWNhbC5jb20vfnVidW50dS1zZWN1cml0eS9jdmUvMjAxOC9DVkUtMjAxOC0xMDAwMDM1Lmh0bWwnLFxuICAgICAgICAgICdodHRwczovL2N2ZS5taXRyZS5vcmcvY2dpLWJpbi9jdmVuYW1lLmNnaT9uYW1lPUNWRS0yMDE4LTEwMDAwMzUnLFxuICAgICAgICAgICdodHRwczovL3d3dy5zZWMtY29uc3VsdC5jb20vZW4vYmxvZy9hZHZpc29yaWVzL211bHRpcGxlLXZ1bG5lcmFiaWxpdGllcy1pbi1pbmZvemlwLXVuemlwL2luZGV4Lmh0bWwnLFxuICAgICAgICBdLFxuICAgICAgICBhc3NpZ25lcjogJ2N2ZUBtaXRyZS5vcmcnLFxuICAgICAgICBjdmVfdmVyc2lvbjogJzQuMCcsXG4gICAgICAgIHN0YXR1czogJ0FjdGl2ZScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBydWxlOiB7XG4gICAgICBsZXZlbDogMTAsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NWRS0yMDE4LTEwMDAwMzUgYWZmZWN0cyB1bnppcCcsXG4gICAgICBpZDogJzIzNTA1JyxcbiAgICAgIGZpcmVkdGltZXM6IDEsXG4gICAgfSxcbiAgICBkYXRhOiB7XG4gICAgICB2dWxuZXJhYmlsaXR5OiB7XG4gICAgICAgIHBhY2thZ2U6IHtcbiAgICAgICAgICBuYW1lOiAndW56aXAnLFxuICAgICAgICAgIHZlcnNpb246ICc2LjAtMjF1YnVudHUxJyxcbiAgICAgICAgICBhcmNoaXRlY3R1cmU6ICdhbWQ2NCcsXG4gICAgICAgICAgY29uZGl0aW9uOiAnUGFja2FnZSBsZXNzIG9yIGVxdWFsIHRoYW4gNi4wMCcsXG4gICAgICAgIH0sXG4gICAgICAgIGN2c3M6IHtcbiAgICAgICAgICBjdnNzMjoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICduZXR3b3JrJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdtZWRpdW0nLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAncGFydGlhbCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzYuODAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN2c3MzOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ2xvY2FsJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdsb3cnLFxuICAgICAgICAgICAgICBwcml2aWxlZ2VzX3JlcXVpcmVkOiAnbm9uZScsXG4gICAgICAgICAgICAgIHVzZXJfaW50ZXJhY3Rpb246ICdyZXF1aXJlZCcsXG4gICAgICAgICAgICAgIHNjb3BlOiAndW5jaGFuZ2VkJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ2hpZ2gnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAnaGlnaCcsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ2hpZ2gnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc3LjgwMDAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY3ZlOiAnQ1ZFLTIwMTgtMTAwMDAzNScsXG4gICAgICAgIHRpdGxlOiAnQ1ZFLTIwMTgtMTAwMDAzNSBvbiBVYnVudHUgMTguMDQgTFRTIChiaW9uaWMpIC0gbG93LicsXG4gICAgICAgIHJhdGlvbmFsZTpcbiAgICAgICAgICAnQSBoZWFwLWJhc2VkIGJ1ZmZlciBvdmVyZmxvdyBleGlzdHMgaW4gSW5mby1aaXAgVW5aaXAgdmVyc2lvbiA8PSA2LjAwIGluIHRoZSBwcm9jZXNzaW5nIG9mIHBhc3N3b3JkLXByb3RlY3RlZCBhcmNoaXZlcyB0aGF0IGFsbG93cyBhbiBhdHRhY2tlciB0byBwZXJmb3JtIGEgZGVuaWFsIG9mIHNlcnZpY2Ugb3IgdG8gcG9zc2libHkgYWNoaWV2ZSBjb2RlIGV4ZWN1dGlvbi4nLFxuICAgICAgICBzZXZlcml0eTogJ0hpZ2gnLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDE4LTAyLTA5JyxcbiAgICAgICAgdXBkYXRlZDogJzIwMjAtMDEtMjknLFxuICAgICAgICBzdGF0ZTogJ0ZpeGVkJyxcbiAgICAgICAgY3dlX3JlZmVyZW5jZTogJ0NXRS0xMTknLFxuICAgICAgICBidWd6aWxsYV9yZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHA6Ly9idWdzLmRlYmlhbi5vcmcvY2dpLWJpbi9idWdyZXBvcnQuY2dpP2J1Zz04ODk4MzgnLFxuICAgICAgICBdLFxuICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHBzOi8vbGlzdHMuZGViaWFuLm9yZy9kZWJpYW4tbHRzLWFubm91bmNlLzIwMjAvMDEvbXNnMDAwMjYuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vc2VjLWNvbnN1bHQuY29tL2VuL2Jsb2cvYWR2aXNvcmllcy9tdWx0aXBsZS12dWxuZXJhYmlsaXRpZXMtaW4taW5mb3ppcC11bnppcC9pbmRleC5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9zZWN1cml0eS5nZW50b28ub3JnL2dsc2EvMjAyMDAzLTU4JyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMTgtMTAwMDAzNScsXG4gICAgICAgICAgJ2h0dHA6Ly9wZW9wbGUuY2Fub25pY2FsLmNvbS9+dWJ1bnR1LXNlY3VyaXR5L2N2ZS8yMDE4L0NWRS0yMDE4LTEwMDAwMzUuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vY3ZlLm1pdHJlLm9yZy9jZ2ktYmluL2N2ZW5hbWUuY2dpP25hbWU9Q1ZFLTIwMTgtMTAwMDAzNScsXG4gICAgICAgICAgJ2h0dHBzOi8vd3d3LnNlYy1jb25zdWx0LmNvbS9lbi9ibG9nL2Fkdmlzb3JpZXMvbXVsdGlwbGUtdnVsbmVyYWJpbGl0aWVzLWluLWluZm96aXAtdW56aXAvaW5kZXguaHRtbCcsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiAxMCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ1ZFLTIwMjAtMTc0NyBhZmZlY3RzIHB5dGhvbjMteWFtbCcsXG4gICAgICBpZDogJzIzNTA1JyxcbiAgICAgIGZpcmVkdGltZXM6IDQ0LFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgdnVsbmVyYWJpbGl0eToge1xuICAgICAgICBwYWNrYWdlOiB7XG4gICAgICAgICAgbmFtZTogJ3B5dGhvbjMteWFtbCcsXG4gICAgICAgICAgc291cmNlOiAncHl5YW1sJyxcbiAgICAgICAgICB2ZXJzaW9uOiAnMy4xMi0xYnVpbGQyJyxcbiAgICAgICAgICBhcmNoaXRlY3R1cmU6ICdhbWQ2NCcsXG4gICAgICAgICAgY29uZGl0aW9uOiAnUGFja2FnZSBsZXNzIHRoYW4gNS4zLjEnLFxuICAgICAgICB9LFxuICAgICAgICBjdnNzOiB7XG4gICAgICAgICAgY3ZzczI6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbmV0d29yaycsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbG93JyxcbiAgICAgICAgICAgICAgYXV0aGVudGljYXRpb246ICdub25lJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ2NvbXBsZXRlJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ2NvbXBsZXRlJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAnY29tcGxldGUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICcxMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY3ZlOiAnQ1ZFLTIwMjAtMTc0NycsXG4gICAgICAgIHRpdGxlOlxuICAgICAgICAgICdBIHZ1bG5lcmFiaWxpdHkgd2FzIGRpc2NvdmVyZWQgaW4gdGhlIFB5WUFNTCBsaWJyYXJ5IGluIHZlcnNpb25zIGJlZm9yZSA1LjMuMSwgd2hlcmUgaXQgaXMgc3VzY2VwdGlibGUgdG8gYXJiaXRyYXJ5IGNvZGUgZXhlY3V0aW9uIHdoZW4gaXQgcHJvY2Vzc2VzIHVudHJ1c3RlZCBZQU1MIGZpbGVzIHRocm91Z2ggdGhlIGZ1bGxfbG9hZCBtZXRob2Qgb3Igd2l0aCB0aGUgRnVsbExvYWRlciBsb2FkZXIuIEFwcGxpY2F0aW9ucyB0aGF0IHVzZSB0aGUgbGlicmFyeSB0byBwcm9jZXNzIHVudHJ1c3RlZCBpbnB1dCBtYXkgYmUgdnVsbmVyYWJsZSB0byB0aGlzIGZsYXcuIEFuIGF0dGFja2VyIGNvdWxkIHVzZSB0aGlzIGZsYXcgdG8gZXhlY3V0ZSBhcmJpdHJhcnkgY29kZSBvbiB0aGUgc3lzdGVtIGJ5IGFidXNpbmcgdGhlIHB5dGhvbi9vYmplY3QvbmV3IGNvbnN0cnVjdG9yLicsXG4gICAgICAgIHNldmVyaXR5OiAnSGlnaCcsXG4gICAgICAgIHB1Ymxpc2hlZDogJzIwMjAtMDMtMjQnLFxuICAgICAgICB1cGRhdGVkOiAnMjAyMC0wNS0xMScsXG4gICAgICAgIHN0YXRlOiAnRml4ZWQnLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnQ1dFLTIwJyxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vbGlzdHMub3BlbnN1c2Uub3JnL29wZW5zdXNlLXNlY3VyaXR5LWFubm91bmNlLzIwMjAtMDQvbXNnMDAwMTcuaHRtbCcsXG4gICAgICAgICAgJ2h0dHA6Ly9saXN0cy5vcGVuc3VzZS5vcmcvb3BlbnN1c2Utc2VjdXJpdHktYW5ub3VuY2UvMjAyMC0wNS9tc2cwMDAxNy5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9idWd6aWxsYS5yZWRoYXQuY29tL3Nob3dfYnVnLmNnaT9pZD1DVkUtMjAyMC0xNzQ3JyxcbiAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL3lhbWwvcHl5YW1sL3B1bGwvMzg2JyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5mZWRvcmFwcm9qZWN0Lm9yZy9hcmNoaXZlcy9saXN0L3BhY2thZ2UtYW5ub3VuY2VAbGlzdHMuZmVkb3JhcHJvamVjdC5vcmcvbWVzc2FnZS9LNUhFUEQ3TEVWRFBDSVRZNUlNRFlXWFVNWDM3VkZNWS8nLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLmZlZG9yYXByb2plY3Qub3JnL2FyY2hpdmVzL2xpc3QvcGFja2FnZS1hbm5vdW5jZUBsaXN0cy5mZWRvcmFwcm9qZWN0Lm9yZy9tZXNzYWdlL1dPUlJGSFBRVkFGS0tYWFdMU1NXNlhLVVlMV002Q1NILycsXG4gICAgICAgICAgJ2h0dHBzOi8vbGlzdHMuZmVkb3JhcHJvamVjdC5vcmcvYXJjaGl2ZXMvbGlzdC9wYWNrYWdlLWFubm91bmNlQGxpc3RzLmZlZG9yYXByb2plY3Qub3JnL21lc3NhZ2UvWkJKQTNTR05KS0NBWVBTSE9IV1kzS0JDV05NNU5ZSzIvJyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMjAtMTc0NycsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiA1LFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAxOS0xNTUyIGFmZmVjdHMgb3BlbnNzbCcsXG4gICAgICBpZDogJzIzNTAzJyxcbiAgICAgIGZpcmVkdGltZXM6IDExLFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgdnVsbmVyYWJpbGl0eToge1xuICAgICAgICBwYWNrYWdlOiB7XG4gICAgICAgICAgbmFtZTogJ29wZW5zc2wnLFxuICAgICAgICAgIHZlcnNpb246ICcxLjEuMS0xdWJ1bnR1Mi4xfjE4LjA0LjYnLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246XG4gICAgICAgICAgICAnUGFja2FnZSBncmVhdGVyIG9yIGVxdWFsIHRoYW4gMS4xLjEgYW5kIGxlc3Mgb3IgZXF1YWwgdGhhbiAxLjEuMWMnLFxuICAgICAgICB9LFxuICAgICAgICBjdnNzOiB7XG4gICAgICAgICAgY3ZzczI6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbG9jYWwnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ21lZGl1bScsXG4gICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdub25lJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnMS45MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY3ZzczM6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbG9jYWwnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIHByaXZpbGVnZXNfcmVxdWlyZWQ6ICdsb3cnLFxuICAgICAgICAgICAgICB1c2VyX2ludGVyYWN0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIHNjb3BlOiAndW5jaGFuZ2VkJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ25vbmUnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAnbG93JyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAnbm9uZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzMuMzAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjdmU6ICdDVkUtMjAxOS0xNTUyJyxcbiAgICAgICAgdGl0bGU6XG4gICAgICAgICAgXCJPcGVuU1NMIGhhcyBpbnRlcm5hbCBkZWZhdWx0cyBmb3IgYSBkaXJlY3RvcnkgdHJlZSB3aGVyZSBpdCBjYW4gZmluZCBhIGNvbmZpZ3VyYXRpb24gZmlsZSBhcyB3ZWxsIGFzIGNlcnRpZmljYXRlcyB1c2VkIGZvciB2ZXJpZmljYXRpb24gaW4gVExTLiBUaGlzIGRpcmVjdG9yeSBpcyBtb3N0IGNvbW1vbmx5IHJlZmVycmVkIHRvIGFzIE9QRU5TU0xESVIsIGFuZCBpcyBjb25maWd1cmFibGUgd2l0aCB0aGUgLS1wcmVmaXggLyAtLW9wZW5zc2xkaXIgY29uZmlndXJhdGlvbiBvcHRpb25zLiBGb3IgT3BlblNTTCB2ZXJzaW9ucyAxLjEuMCBhbmQgMS4xLjEsIHRoZSBtaW5ndyBjb25maWd1cmF0aW9uIHRhcmdldHMgYXNzdW1lIHRoYXQgcmVzdWx0aW5nIHByb2dyYW1zIGFuZCBsaWJyYXJpZXMgYXJlIGluc3RhbGxlZCBpbiBhIFVuaXgtbGlrZSBlbnZpcm9ubWVudCBhbmQgdGhlIGRlZmF1bHQgcHJlZml4IGZvciBwcm9ncmFtIGluc3RhbGxhdGlvbiBhcyB3ZWxsIGFzIGZvciBPUEVOU1NMRElSIHNob3VsZCBiZSAnL3Vzci9sb2NhbCcuIEhvd2V2ZXIsIG1pbmd3IHByb2dyYW1zIGFyZSBXaW5kb3dzIHByb2dyYW1zLCBhbmQgYXMgc3VjaCwgZmluZCB0aGVtc2VsdmVzIGxvb2tpbmcgYXQgc3ViLWRpcmVjdG9yaWVzIG9mICdDOi91c3IvbG9jYWwnLCB3aGljaCBtYXkgYmUgd29ybGQgd3JpdGFibGUsIHdoaWNoIGVuYWJsZXMgdW50cnVzdGVkIHVzZXJzIHRvIG1vZGlmeSBPcGVuU1NMJ3MgZGVmYXVsdCBjb25maWd1cmF0aW9uLCBpbnNlcnQgQ0EgY2VydGlmaWNhdGVzLCBtb2RpZnkgKG9yIGV2ZW4gcmVwbGFjZSkgZXhpc3RpbmcgZW5naW5lIG1vZHVsZXMsIGV0Yy4gRm9yIE9wZW5TU0wgMS4wLjIsICcvdXNyL2xvY2FsL3NzbCcgaXMgdXNlZCBhcyBkZWZhdWx0IGZvciBPUEVOU1NMRElSIG9uIGFsbCBVbml4IGFuZCBXaW5kb3dzIHRhcmdldHMsIGluY2x1ZGluZyBWaXN1YWwgQyBidWlsZHMuIEhvd2V2ZXIsIHNvbWUgYnVpbGQgaW5zdHJ1Y3Rpb25zIGZvciB0aGUgZGl2ZXJzZSBXaW5kb3dzIHRhcmdldHMgb24gMS4wLjIgZW5jb3VyYWdlIHlvdSB0byBzcGVjaWZ5IHlvdXIgb3duIC0tcHJlZml4LiBPcGVuU1NMIHZlcnNpb25zIDEuMS4xLCAxLjEuMCBhbmQgMS4wLjIgYXJlIGFmZmVjdGVkIGJ5IHRoaXMgaXNzdWUuIER1ZSB0byB0aGUgbGltaXRlZCBzY29wZSBvZiBhZmZlY3RlZCBkZXBsb3ltZW50cyB0aGlzIGhhcyBiZWVuIGFzc2Vzc2VkIGFzIGxvdyBzZXZlcml0eSBhbmQgdGhlcmVmb3JlIHdlIGFyZSBub3QgY3JlYXRpbmcgbmV3IHJlbGVhc2VzIGF0IHRoaXMgdGltZS4gRml4ZWQgaW4gT3BlblNTTCAxLjEuMWQgKEFmZmVjdGVkIDEuMS4xLTEuMS4xYykuIEZpeGVkIGluIE9wZW5TU0wgMS4xLjBsIChBZmZlY3RlZCAxLjEuMC0xLjEuMGspLiBGaXhlZCBpbiBPcGVuU1NMIDEuMC4ydCAoQWZmZWN0ZWQgMS4wLjItMS4wLjJzKS5cIixcbiAgICAgICAgc2V2ZXJpdHk6ICdMb3cnLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDE5LTA3LTMwJyxcbiAgICAgICAgdXBkYXRlZDogJzIwMTktMDgtMjMnLFxuICAgICAgICBzdGF0ZTogJ0ZpeGVkJyxcbiAgICAgICAgY3dlX3JlZmVyZW5jZTogJ0NXRS0yOTUnLFxuICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHBzOi8vZ2l0Lm9wZW5zc2wub3JnL2dpdHdlYi8/cD1vcGVuc3NsLmdpdDthPWNvbW1pdGRpZmY7aD01NGFhOWQ1MWIwOWQ2N2U5MGRiNDQzZjY4MmNmYWNlNzk1ZjVhZjllJyxcbiAgICAgICAgICAnaHR0cHM6Ly9naXQub3BlbnNzbC5vcmcvZ2l0d2ViLz9wPW9wZW5zc2wuZ2l0O2E9Y29tbWl0ZGlmZjtoPWIxNWExOWMxNDgzODRlNzMzMzhhYTdjNWIxMjY1MjEzOGUzNWVkMjgnLFxuICAgICAgICAgICdodHRwczovL2dpdC5vcGVuc3NsLm9yZy9naXR3ZWIvP3A9b3BlbnNzbC5naXQ7YT1jb21taXRkaWZmO2g9ZDMzM2ViYWY5Yzc3MzMyNzU0YTlkNWUxMTFlMmY1M2UxZGU1NGZkZCcsXG4gICAgICAgICAgJ2h0dHBzOi8vZ2l0Lm9wZW5zc2wub3JnL2dpdHdlYi8/cD1vcGVuc3NsLmdpdDthPWNvbW1pdGRpZmY7aD1lMzJiYzg1NWE4MWEyZDQ4ZDIxNWM1MDZiZGViNGY1OTgwNDVmN2U5JyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5mZWRvcmFwcm9qZWN0Lm9yZy9hcmNoaXZlcy9saXN0L3BhY2thZ2UtYW5ub3VuY2VAbGlzdHMuZmVkb3JhcHJvamVjdC5vcmcvbWVzc2FnZS9FV0M0MlVYTDVHSFRVNUc3N1ZLQkY2SllVVU5HU0hPTS8nLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLmZlZG9yYXByb2plY3Qub3JnL2FyY2hpdmVzL2xpc3QvcGFja2FnZS1hbm5vdW5jZUBsaXN0cy5mZWRvcmFwcm9qZWN0Lm9yZy9tZXNzYWdlL1kzSVZGR1NFUkFaTE5KQ0szNVRFTTJSNDcyNlhJSDNaLycsXG4gICAgICAgICAgJ2h0dHBzOi8vbGlzdHMuZmVkb3JhcHJvamVjdC5vcmcvYXJjaGl2ZXMvbGlzdC9wYWNrYWdlLWFubm91bmNlQGxpc3RzLmZlZG9yYXByb2plY3Qub3JnL21lc3NhZ2UvWkJFVjVRR0RSRlVaRE1ORUNGWFVTTjVGTVlPWkRFNFYvJyxcbiAgICAgICAgICAnaHR0cHM6Ly9zZWN1cml0eS5uZXRhcHAuY29tL2Fkdmlzb3J5L250YXAtMjAxOTA4MjMtMDAwNi8nLFxuICAgICAgICAgICdodHRwczovL3N1cHBvcnQuZjUuY29tL2NzcC9hcnRpY2xlL0s5NDA0MTM1NCcsXG4gICAgICAgICAgJ2h0dHBzOi8vc3VwcG9ydC5mNS5jb20vY3NwL2FydGljbGUvSzk0MDQxMzU0P3V0bV9zb3VyY2U9ZjVzdXBwb3J0JmFtcDt1dG1fbWVkaXVtPVJTUycsXG4gICAgICAgICAgJ2h0dHBzOi8vd3d3Lm9wZW5zc2wub3JnL25ld3Mvc2VjYWR2LzIwMTkwNzMwLnR4dCcsXG4gICAgICAgICAgJ2h0dHBzOi8vd3d3Lm9yYWNsZS5jb20vc2VjdXJpdHktYWxlcnRzL2NwdWFwcjIwMjAuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vd3d3Lm9yYWNsZS5jb20vc2VjdXJpdHktYWxlcnRzL2NwdWphbjIwMjAuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vd3d3Lm9yYWNsZS5jb20vdGVjaG5ldHdvcmsvc2VjdXJpdHktYWR2aXNvcnkvY3B1b2N0MjAxOS01MDcyODMyLmh0bWwnLFxuICAgICAgICAgICdodHRwczovL3d3dy50ZW5hYmxlLmNvbS9zZWN1cml0eS90bnMtMjAxOS0wOCcsXG4gICAgICAgICAgJ2h0dHBzOi8vd3d3LnRlbmFibGUuY29tL3NlY3VyaXR5L3Rucy0yMDE5LTA5JyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMTktMTU1MicsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiAxMCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ1ZFLTIwMjAtMTc0NyBhZmZlY3RzIHB5dGhvbjMteWFtbCcsXG4gICAgICBpZDogJzIzNTA1JyxcbiAgICAgIGZpcmVkdGltZXM6IDQ0LFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgdnVsbmVyYWJpbGl0eToge1xuICAgICAgICBwYWNrYWdlOiB7XG4gICAgICAgICAgbmFtZTogJ3B5dGhvbjMteWFtbCcsXG4gICAgICAgICAgc291cmNlOiAncHl5YW1sJyxcbiAgICAgICAgICB2ZXJzaW9uOiAnMy4xMi0xYnVpbGQyJyxcbiAgICAgICAgICBhcmNoaXRlY3R1cmU6ICdhbWQ2NCcsXG4gICAgICAgICAgY29uZGl0aW9uOiAnUGFja2FnZSBsZXNzIHRoYW4gNS4zLjEnLFxuICAgICAgICB9LFxuICAgICAgICBjdnNzOiB7XG4gICAgICAgICAgY3ZzczI6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbmV0d29yaycsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbG93JyxcbiAgICAgICAgICAgICAgYXV0aGVudGljYXRpb246ICdub25lJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ2NvbXBsZXRlJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ2NvbXBsZXRlJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAnY29tcGxldGUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICcxMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY3ZlOiAnQ1ZFLTIwMjAtMTc0NycsXG4gICAgICAgIHRpdGxlOlxuICAgICAgICAgICdBIHZ1bG5lcmFiaWxpdHkgd2FzIGRpc2NvdmVyZWQgaW4gdGhlIFB5WUFNTCBsaWJyYXJ5IGluIHZlcnNpb25zIGJlZm9yZSA1LjMuMSwgd2hlcmUgaXQgaXMgc3VzY2VwdGlibGUgdG8gYXJiaXRyYXJ5IGNvZGUgZXhlY3V0aW9uIHdoZW4gaXQgcHJvY2Vzc2VzIHVudHJ1c3RlZCBZQU1MIGZpbGVzIHRocm91Z2ggdGhlIGZ1bGxfbG9hZCBtZXRob2Qgb3Igd2l0aCB0aGUgRnVsbExvYWRlciBsb2FkZXIuIEFwcGxpY2F0aW9ucyB0aGF0IHVzZSB0aGUgbGlicmFyeSB0byBwcm9jZXNzIHVudHJ1c3RlZCBpbnB1dCBtYXkgYmUgdnVsbmVyYWJsZSB0byB0aGlzIGZsYXcuIEFuIGF0dGFja2VyIGNvdWxkIHVzZSB0aGlzIGZsYXcgdG8gZXhlY3V0ZSBhcmJpdHJhcnkgY29kZSBvbiB0aGUgc3lzdGVtIGJ5IGFidXNpbmcgdGhlIHB5dGhvbi9vYmplY3QvbmV3IGNvbnN0cnVjdG9yLicsXG4gICAgICAgIHNldmVyaXR5OiAnSGlnaCcsXG4gICAgICAgIHB1Ymxpc2hlZDogJzIwMjAtMDMtMjQnLFxuICAgICAgICB1cGRhdGVkOiAnMjAyMC0wNS0xMScsXG4gICAgICAgIHN0YXRlOiAnRml4ZWQnLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnQ1dFLTIwJyxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vbGlzdHMub3BlbnN1c2Uub3JnL29wZW5zdXNlLXNlY3VyaXR5LWFubm91bmNlLzIwMjAtMDQvbXNnMDAwMTcuaHRtbCcsXG4gICAgICAgICAgJ2h0dHA6Ly9saXN0cy5vcGVuc3VzZS5vcmcvb3BlbnN1c2Utc2VjdXJpdHktYW5ub3VuY2UvMjAyMC0wNS9tc2cwMDAxNy5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9idWd6aWxsYS5yZWRoYXQuY29tL3Nob3dfYnVnLmNnaT9pZD1DVkUtMjAyMC0xNzQ3JyxcbiAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL3lhbWwvcHl5YW1sL3B1bGwvMzg2JyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5mZWRvcmFwcm9qZWN0Lm9yZy9hcmNoaXZlcy9saXN0L3BhY2thZ2UtYW5ub3VuY2VAbGlzdHMuZmVkb3JhcHJvamVjdC5vcmcvbWVzc2FnZS9LNUhFUEQ3TEVWRFBDSVRZNUlNRFlXWFVNWDM3VkZNWS8nLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLmZlZG9yYXByb2plY3Qub3JnL2FyY2hpdmVzL2xpc3QvcGFja2FnZS1hbm5vdW5jZUBsaXN0cy5mZWRvcmFwcm9qZWN0Lm9yZy9tZXNzYWdlL1dPUlJGSFBRVkFGS0tYWFdMU1NXNlhLVVlMV002Q1NILycsXG4gICAgICAgICAgJ2h0dHBzOi8vbGlzdHMuZmVkb3JhcHJvamVjdC5vcmcvYXJjaGl2ZXMvbGlzdC9wYWNrYWdlLWFubm91bmNlQGxpc3RzLmZlZG9yYXByb2plY3Qub3JnL21lc3NhZ2UvWkJKQTNTR05KS0NBWVBTSE9IV1kzS0JDV05NNU5ZSzIvJyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMjAtMTc0NycsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiA3LFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAxOS0xODY4NCBhZmZlY3RzIHN1ZG8nLFxuICAgICAgaWQ6ICcyMzUwNCcsXG4gICAgICBmaXJlZHRpbWVzOiA4NyxcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdzdWRvJyxcbiAgICAgICAgICB2ZXJzaW9uOiAnMS44LjIxcDItM3VidW50dTEuMicsXG4gICAgICAgICAgYXJjaGl0ZWN0dXJlOiAnYW1kNjQnLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ1BhY2thZ2UgbGVzcyBvciBlcXVhbCB0aGFuIDEuOC4yOScsXG4gICAgICAgIH0sXG4gICAgICAgIGN2c3M6IHtcbiAgICAgICAgICBjdnNzMjoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICdsb2NhbCcsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbWVkaXVtJyxcbiAgICAgICAgICAgICAgYXV0aGVudGljYXRpb246ICdub25lJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ2NvbXBsZXRlJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ2NvbXBsZXRlJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAnY29tcGxldGUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc2LjkwMDAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY3ZlOiAnQ1ZFLTIwMTktMTg2ODQnLFxuICAgICAgICB0aXRsZTpcbiAgICAgICAgICAnKiogRElTUFVURUQgKiogU3VkbyB0aHJvdWdoIDEuOC4yOSBhbGxvd3MgbG9jYWwgdXNlcnMgdG8gZXNjYWxhdGUgdG8gcm9vdCBpZiB0aGV5IGhhdmUgd3JpdGUgYWNjZXNzIHRvIGZpbGUgZGVzY3JpcHRvciAzIG9mIHRoZSBzdWRvIHByb2Nlc3MuIFRoaXMgb2NjdXJzIGJlY2F1c2Ugb2YgYSByYWNlIGNvbmRpdGlvbiBiZXR3ZWVuIGRldGVybWluaW5nIGEgdWlkLCBhbmQgdGhlIHNldHJlc3VpZCBhbmQgb3BlbmF0IHN5c3RlbSBjYWxscy4gVGhlIGF0dGFja2VyIGNhbiB3cml0ZSBcIkFMTCBBTEw9KEFMTCkgTk9QQVNTV0Q6QUxMXCIgdG8gL3Byb2MvIyMjIyMvZmQvMyBhdCBhIHRpbWUgd2hlbiBTdWRvIGlzIHByb21wdGluZyBmb3IgYSBwYXNzd29yZC4gTk9URTogVGhpcyBoYXMgYmVlbiBkaXNwdXRlZCBkdWUgdG8gdGhlIHdheSBMaW51eCAvcHJvYyB3b3Jrcy4gSXQgaGFzIGJlZW4gYXJndWVkIHRoYXQgd3JpdGluZyB0byAvcHJvYy8jIyMjIy9mZC8zIHdvdWxkIG9ubHkgYmUgdmlhYmxlIGlmIHlvdSBoYWQgcGVybWlzc2lvbiB0byB3cml0ZSB0byAvZXRjL3N1ZG9lcnMuIEV2ZW4gd2l0aCB3cml0ZSBwZXJtaXNzaW9uIHRvIC9wcm9jLyMjIyMjL2ZkLzMsIGl0IHdvdWxkIG5vdCBoZWxwIHlvdSB3cml0ZSB0byAvZXRjL3N1ZG9lcnMuJyxcbiAgICAgICAgc2V2ZXJpdHk6ICdNZWRpdW0nLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDE5LTExLTA0JyxcbiAgICAgICAgdXBkYXRlZDogJzIwMTktMTEtMDgnLFxuICAgICAgICBzdGF0ZTogJ0ZpeGVkJyxcbiAgICAgICAgY3dlX3JlZmVyZW5jZTogJ0NXRS0zNjInLFxuICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHBzOi8vZ2lzdC5naXRodWIuY29tL294YWdhc3QvNTExNzFhYTE2MTA3NDE4OGExMWQ5NmNiZWY4ODRiYmQnLFxuICAgICAgICAgICdodHRwczovL252ZC5uaXN0Lmdvdi92dWxuL2RldGFpbC9DVkUtMjAxOS0xODY4NCcsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiA3LFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAxOC0yMDQ4MiBhZmZlY3RzIHRhcicsXG4gICAgICBpZDogJzIzNTA0JyxcbiAgICAgIGZpcmVkdGltZXM6IDg4LFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgdnVsbmVyYWJpbGl0eToge1xuICAgICAgICBwYWNrYWdlOiB7XG4gICAgICAgICAgbmFtZTogJ3RhcicsXG4gICAgICAgICAgdmVyc2lvbjogJzEuMjliLTJ1YnVudHUwLjEnLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIGxlc3Mgb3IgZXF1YWwgdGhhbiAxLjMwJyxcbiAgICAgICAgfSxcbiAgICAgICAgY3Zzczoge1xuICAgICAgICAgIGN2c3MyOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ2xvY2FsJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdtZWRpdW0nLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAnbm9uZScsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAncGFydGlhbCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzEuOTAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN2c3MzOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ2xvY2FsJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdoaWdoJyxcbiAgICAgICAgICAgICAgcHJpdmlsZWdlc19yZXF1aXJlZDogJ2xvdycsXG4gICAgICAgICAgICAgIHVzZXJfaW50ZXJhY3Rpb246ICdub25lJyxcbiAgICAgICAgICAgICAgc2NvcGU6ICd1bmNoYW5nZWQnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAnbm9uZScsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAnaGlnaCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzQuNzAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjdmU6ICdDVkUtMjAxOC0yMDQ4MicsXG4gICAgICAgIHRpdGxlOiAnQ1ZFLTIwMTgtMjA0ODIgb24gVWJ1bnR1IDE4LjA0IExUUyAoYmlvbmljKSAtIGxvdy4nLFxuICAgICAgICByYXRpb25hbGU6XG4gICAgICAgICAgXCJHTlUgVGFyIHRocm91Z2ggMS4zMCwgd2hlbiAtLXNwYXJzZSBpcyB1c2VkLCBtaXNoYW5kbGVzIGZpbGUgc2hyaW5rYWdlIGR1cmluZyByZWFkIGFjY2Vzcywgd2hpY2ggYWxsb3dzIGxvY2FsIHVzZXJzIHRvIGNhdXNlIGEgZGVuaWFsIG9mIHNlcnZpY2UgKGluZmluaXRlIHJlYWQgbG9vcCBpbiBzcGFyc2VfZHVtcF9yZWdpb24gaW4gc3BhcnNlLmMpIGJ5IG1vZGlmeWluZyBhIGZpbGUgdGhhdCBpcyBzdXBwb3NlZCB0byBiZSBhcmNoaXZlZCBieSBhIGRpZmZlcmVudCB1c2VyJ3MgcHJvY2VzcyAoZS5nLiwgYSBzeXN0ZW0gYmFja3VwIHJ1bm5pbmcgYXMgcm9vdCkuXCIsXG4gICAgICAgIHNldmVyaXR5OiAnTWVkaXVtJyxcbiAgICAgICAgcHVibGlzaGVkOiAnMjAxOC0xMi0yNicsXG4gICAgICAgIHVwZGF0ZWQ6ICcyMDE5LTEwLTAzJyxcbiAgICAgICAgc3RhdGU6ICdGaXhlZCcsXG4gICAgICAgIGN3ZV9yZWZlcmVuY2U6ICdDV0UtODM1JyxcbiAgICAgICAgYnVnemlsbGFfcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vYnVncy5kZWJpYW4ub3JnL2NnaS1iaW4vYnVncmVwb3J0LmNnaT9idWc9OTE3Mzc3JyxcbiAgICAgICAgICAnaHR0cHM6Ly9idWd6aWxsYS5yZWRoYXQuY29tL3Nob3dfYnVnLmNnaT9pZD0xNjYyMzQ2JyxcbiAgICAgICAgXSxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vZ2l0LnNhdmFubmFoLmdudS5vcmcvY2dpdC90YXIuZ2l0L2NvbW1pdC8/aWQ9YzE1YzQyY2NkMWUyMzc3OTQ1ZmQwNDE0ZWNhMWE0OTI5NGJmZjQ1NCcsXG4gICAgICAgICAgJ2h0dHA6Ly9saXN0cy5nbnUub3JnL2FyY2hpdmUvaHRtbC9idWctdGFyLzIwMTgtMTIvbXNnMDAwMjMuaHRtbCcsXG4gICAgICAgICAgJ2h0dHA6Ly9saXN0cy5vcGVuc3VzZS5vcmcvb3BlbnN1c2Utc2VjdXJpdHktYW5ub3VuY2UvMjAxOS0wNC9tc2cwMDA3Ny5odG1sJyxcbiAgICAgICAgICAnaHR0cDovL3d3dy5zZWN1cml0eWZvY3VzLmNvbS9iaWQvMTA2MzU0JyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5kZWJpYW4ub3JnL2RlYmlhbi1sdHMtYW5ub3VuY2UvMjAxOC8xMi9tc2cwMDAyMy5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9uZXdzLnljb21iaW5hdG9yLmNvbS9pdGVtP2lkPTE4NzQ1NDMxJyxcbiAgICAgICAgICAnaHR0cHM6Ly9zZWN1cml0eS5nZW50b28ub3JnL2dsc2EvMjAxOTAzLTA1JyxcbiAgICAgICAgICAnaHR0cHM6Ly90d2l0dGVyLmNvbS90aGF0Y2tzL3N0YXR1cy8xMDc2MTY2NjQ1NzA4NjY4OTI4JyxcbiAgICAgICAgICAnaHR0cHM6Ly91dGNjLnV0b3JvbnRvLmNhL35ja3Mvc3BhY2UvYmxvZy9zeXNhZG1pbi9UYXJGaW5kaW5nVHJ1bmNhdGVCdWcnLFxuICAgICAgICAgICdodHRwczovL252ZC5uaXN0Lmdvdi92dWxuL2RldGFpbC9DVkUtMjAxOC0yMDQ4MicsXG4gICAgICAgICAgJ2h0dHA6Ly9wZW9wbGUuY2Fub25pY2FsLmNvbS9+dWJ1bnR1LXNlY3VyaXR5L2N2ZS8yMDE4L0NWRS0yMDE4LTIwNDgyLmh0bWwnLFxuICAgICAgICAgICdodHRwczovL2N2ZS5taXRyZS5vcmcvY2dpLWJpbi9jdmVuYW1lLmNnaT9uYW1lPUNWRS0yMDE4LTIwNDgyJyxcbiAgICAgICAgXSxcbiAgICAgICAgYXNzaWduZXI6ICdjdmVAbWl0cmUub3JnJyxcbiAgICAgICAgY3ZlX3ZlcnNpb246ICc0LjAnLFxuICAgICAgICBzdGF0dXM6ICdBY3RpdmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDUsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NWRS0yMDE1LTI5ODcgYWZmZWN0cyBlZCcsXG4gICAgICBpZDogJzIzNTAzJyxcbiAgICAgIGZpcmVkdGltZXM6IDksXG4gICAgfSxcbiAgICBkYXRhOiB7XG4gICAgICB2dWxuZXJhYmlsaXR5OiB7XG4gICAgICAgIHBhY2thZ2U6IHtcbiAgICAgICAgICBuYW1lOiAnZWQnLFxuICAgICAgICAgIHZlcnNpb246ICcxLjEwLTIuMScsXG4gICAgICAgICAgYXJjaGl0ZWN0dXJlOiAnYW1kNjQnLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ1BhY2thZ2UgbGVzcyBvciBlcXVhbCB0aGFuIDMuNCcsXG4gICAgICAgIH0sXG4gICAgICAgIGN2c3M6IHtcbiAgICAgICAgICBjdnNzMjoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICduZXR3b3JrJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdoaWdoJyxcbiAgICAgICAgICAgICAgYXV0aGVudGljYXRpb246ICdub25lJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAnbm9uZScsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ25vbmUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICcyLjYwMDAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY3ZlOiAnQ1ZFLTIwMTUtMjk4NycsXG4gICAgICAgIHRpdGxlOlxuICAgICAgICAgICdUeXBlNzQgRUQgYmVmb3JlIDQuMCBtaXN1c2VzIDEyOC1iaXQgRUNCIGVuY3J5cHRpb24gZm9yIHNtYWxsIGZpbGVzLCB3aGljaCBtYWtlcyBpdCBlYXNpZXIgZm9yIGF0dGFja2VycyB0byBvYnRhaW4gcGxhaW50ZXh0IGRhdGEgdmlhIGRpZmZlcmVudGlhbCBjcnlwdGFuYWx5c2lzIG9mIGEgZmlsZSB3aXRoIGFuIG9yaWdpbmFsIGxlbmd0aCBzbWFsbGVyIHRoYW4gMTI4IGJpdHMuJyxcbiAgICAgICAgc2V2ZXJpdHk6ICdMb3cnLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDE1LTA4LTI4JyxcbiAgICAgICAgdXBkYXRlZDogJzIwMTUtMDgtMzEnLFxuICAgICAgICBzdGF0ZTogJ0ZpeGVkJyxcbiAgICAgICAgY3dlX3JlZmVyZW5jZTogJ0NXRS0xNycsXG4gICAgICAgIHJlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cDovL2p2bi5qcC9lbi9qcC9KVk45MTQ3NDg3OC9pbmRleC5odG1sJyxcbiAgICAgICAgICAnaHR0cDovL2p2bmRiLmp2bi5qcC9qdm5kYi9KVk5EQi0yMDE1LTAwMDExOScsXG4gICAgICAgICAgJ2h0dHA6Ly90eXBlNzQub3JnL2VkbWFuNS0xLnBocCcsXG4gICAgICAgICAgJ2h0dHA6Ly90eXBlNzRvcmcuYmxvZzE0LmZjMi5jb20vYmxvZy1lbnRyeS0xMzg0Lmh0bWwnLFxuICAgICAgICAgICdodHRwczovL252ZC5uaXN0Lmdvdi92dWxuL2RldGFpbC9DVkUtMjAxNS0yOTg3JyxcbiAgICAgICAgXSxcbiAgICAgICAgYXNzaWduZXI6ICdjdmVAbWl0cmUub3JnJyxcbiAgICAgICAgY3ZlX3ZlcnNpb246ICc0LjAnLFxuICAgICAgICBzdGF0dXM6ICdBY3RpdmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDEwLFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAxOC04NzY5IGFmZmVjdHMgZWxmdXRpbHMnLFxuICAgICAgaWQ6ICcyMzUwNScsXG4gICAgICBmaXJlZHRpbWVzOiA0NSxcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdlbGZ1dGlscycsXG4gICAgICAgICAgdmVyc2lvbjogJzAuMTcwLTAuNHVidW50dTAuMScsXG4gICAgICAgICAgYXJjaGl0ZWN0dXJlOiAnYW1kNjQnLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ1BhY2thZ2UgbWF0Y2hlcyBhIHZ1bG5lcmFibGUgdmVyc2lvbicsXG4gICAgICAgIH0sXG4gICAgICAgIGN2c3M6IHtcbiAgICAgICAgICBjdnNzMjoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICduZXR3b3JrJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdtZWRpdW0nLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAncGFydGlhbCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzYuODAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN2c3MzOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ2xvY2FsJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdsb3cnLFxuICAgICAgICAgICAgICBwcml2aWxlZ2VzX3JlcXVpcmVkOiAnbm9uZScsXG4gICAgICAgICAgICAgIHVzZXJfaW50ZXJhY3Rpb246ICdyZXF1aXJlZCcsXG4gICAgICAgICAgICAgIHNjb3BlOiAndW5jaGFuZ2VkJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ2hpZ2gnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAnaGlnaCcsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ2hpZ2gnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc3LjgwMDAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY3ZlOiAnQ1ZFLTIwMTgtODc2OScsXG4gICAgICAgIHRpdGxlOlxuICAgICAgICAgICdlbGZ1dGlscyAwLjE3MCBoYXMgYSBidWZmZXIgb3Zlci1yZWFkIGluIHRoZSBlYmxfZHluYW1pY190YWdfbmFtZSBmdW5jdGlvbiBvZiBsaWJlYmwvZWJsZHluYW1pY3RhZ25hbWUuYyBiZWNhdXNlIFNZTVRBQl9TSE5EWCBpcyB1bnN1cHBvcnRlZC4nLFxuICAgICAgICBzZXZlcml0eTogJ0hpZ2gnLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDE4LTAzLTE4JyxcbiAgICAgICAgdXBkYXRlZDogJzIwMTktMTAtMDMnLFxuICAgICAgICBzdGF0ZTogJ1BlbmRpbmcgY29uZmlybWF0aW9uJyxcbiAgICAgICAgY3dlX3JlZmVyZW5jZTogJ0NXRS0xMjUnLFxuICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHBzOi8vc291cmNld2FyZS5vcmcvYnVnemlsbGEvc2hvd19idWcuY2dpP2lkPTIyOTc2JyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMTgtODc2OScsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiA1LFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAxOS0xNTUyIGFmZmVjdHMgb3BlbnNzbCcsXG4gICAgICBpZDogJzIzNTAzJyxcbiAgICAgIGZpcmVkdGltZXM6IDExLFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgdnVsbmVyYWJpbGl0eToge1xuICAgICAgICBwYWNrYWdlOiB7XG4gICAgICAgICAgbmFtZTogJ29wZW5zc2wnLFxuICAgICAgICAgIHZlcnNpb246ICcxLjEuMS0xdWJ1bnR1Mi4xfjE4LjA0LjYnLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246XG4gICAgICAgICAgICAnUGFja2FnZSBncmVhdGVyIG9yIGVxdWFsIHRoYW4gMS4xLjEgYW5kIGxlc3Mgb3IgZXF1YWwgdGhhbiAxLjEuMWMnLFxuICAgICAgICB9LFxuICAgICAgICBjdnNzOiB7XG4gICAgICAgICAgY3ZzczI6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbG9jYWwnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ21lZGl1bScsXG4gICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdub25lJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnMS45MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY3ZzczM6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbG9jYWwnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIHByaXZpbGVnZXNfcmVxdWlyZWQ6ICdsb3cnLFxuICAgICAgICAgICAgICB1c2VyX2ludGVyYWN0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIHNjb3BlOiAndW5jaGFuZ2VkJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ25vbmUnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAnbG93JyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAnbm9uZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzMuMzAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjdmU6ICdDVkUtMjAxOS0xNTUyJyxcbiAgICAgICAgdGl0bGU6XG4gICAgICAgICAgXCJPcGVuU1NMIGhhcyBpbnRlcm5hbCBkZWZhdWx0cyBmb3IgYSBkaXJlY3RvcnkgdHJlZSB3aGVyZSBpdCBjYW4gZmluZCBhIGNvbmZpZ3VyYXRpb24gZmlsZSBhcyB3ZWxsIGFzIGNlcnRpZmljYXRlcyB1c2VkIGZvciB2ZXJpZmljYXRpb24gaW4gVExTLiBUaGlzIGRpcmVjdG9yeSBpcyBtb3N0IGNvbW1vbmx5IHJlZmVycmVkIHRvIGFzIE9QRU5TU0xESVIsIGFuZCBpcyBjb25maWd1cmFibGUgd2l0aCB0aGUgLS1wcmVmaXggLyAtLW9wZW5zc2xkaXIgY29uZmlndXJhdGlvbiBvcHRpb25zLiBGb3IgT3BlblNTTCB2ZXJzaW9ucyAxLjEuMCBhbmQgMS4xLjEsIHRoZSBtaW5ndyBjb25maWd1cmF0aW9uIHRhcmdldHMgYXNzdW1lIHRoYXQgcmVzdWx0aW5nIHByb2dyYW1zIGFuZCBsaWJyYXJpZXMgYXJlIGluc3RhbGxlZCBpbiBhIFVuaXgtbGlrZSBlbnZpcm9ubWVudCBhbmQgdGhlIGRlZmF1bHQgcHJlZml4IGZvciBwcm9ncmFtIGluc3RhbGxhdGlvbiBhcyB3ZWxsIGFzIGZvciBPUEVOU1NMRElSIHNob3VsZCBiZSAnL3Vzci9sb2NhbCcuIEhvd2V2ZXIsIG1pbmd3IHByb2dyYW1zIGFyZSBXaW5kb3dzIHByb2dyYW1zLCBhbmQgYXMgc3VjaCwgZmluZCB0aGVtc2VsdmVzIGxvb2tpbmcgYXQgc3ViLWRpcmVjdG9yaWVzIG9mICdDOi91c3IvbG9jYWwnLCB3aGljaCBtYXkgYmUgd29ybGQgd3JpdGFibGUsIHdoaWNoIGVuYWJsZXMgdW50cnVzdGVkIHVzZXJzIHRvIG1vZGlmeSBPcGVuU1NMJ3MgZGVmYXVsdCBjb25maWd1cmF0aW9uLCBpbnNlcnQgQ0EgY2VydGlmaWNhdGVzLCBtb2RpZnkgKG9yIGV2ZW4gcmVwbGFjZSkgZXhpc3RpbmcgZW5naW5lIG1vZHVsZXMsIGV0Yy4gRm9yIE9wZW5TU0wgMS4wLjIsICcvdXNyL2xvY2FsL3NzbCcgaXMgdXNlZCBhcyBkZWZhdWx0IGZvciBPUEVOU1NMRElSIG9uIGFsbCBVbml4IGFuZCBXaW5kb3dzIHRhcmdldHMsIGluY2x1ZGluZyBWaXN1YWwgQyBidWlsZHMuIEhvd2V2ZXIsIHNvbWUgYnVpbGQgaW5zdHJ1Y3Rpb25zIGZvciB0aGUgZGl2ZXJzZSBXaW5kb3dzIHRhcmdldHMgb24gMS4wLjIgZW5jb3VyYWdlIHlvdSB0byBzcGVjaWZ5IHlvdXIgb3duIC0tcHJlZml4LiBPcGVuU1NMIHZlcnNpb25zIDEuMS4xLCAxLjEuMCBhbmQgMS4wLjIgYXJlIGFmZmVjdGVkIGJ5IHRoaXMgaXNzdWUuIER1ZSB0byB0aGUgbGltaXRlZCBzY29wZSBvZiBhZmZlY3RlZCBkZXBsb3ltZW50cyB0aGlzIGhhcyBiZWVuIGFzc2Vzc2VkIGFzIGxvdyBzZXZlcml0eSBhbmQgdGhlcmVmb3JlIHdlIGFyZSBub3QgY3JlYXRpbmcgbmV3IHJlbGVhc2VzIGF0IHRoaXMgdGltZS4gRml4ZWQgaW4gT3BlblNTTCAxLjEuMWQgKEFmZmVjdGVkIDEuMS4xLTEuMS4xYykuIEZpeGVkIGluIE9wZW5TU0wgMS4xLjBsIChBZmZlY3RlZCAxLjEuMC0xLjEuMGspLiBGaXhlZCBpbiBPcGVuU1NMIDEuMC4ydCAoQWZmZWN0ZWQgMS4wLjItMS4wLjJzKS5cIixcbiAgICAgICAgc2V2ZXJpdHk6ICdMb3cnLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDE5LTA3LTMwJyxcbiAgICAgICAgdXBkYXRlZDogJzIwMTktMDgtMjMnLFxuICAgICAgICBzdGF0ZTogJ0ZpeGVkJyxcbiAgICAgICAgY3dlX3JlZmVyZW5jZTogJ0NXRS0yOTUnLFxuICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHBzOi8vZ2l0Lm9wZW5zc2wub3JnL2dpdHdlYi8/cD1vcGVuc3NsLmdpdDthPWNvbW1pdGRpZmY7aD01NGFhOWQ1MWIwOWQ2N2U5MGRiNDQzZjY4MmNmYWNlNzk1ZjVhZjllJyxcbiAgICAgICAgICAnaHR0cHM6Ly9naXQub3BlbnNzbC5vcmcvZ2l0d2ViLz9wPW9wZW5zc2wuZ2l0O2E9Y29tbWl0ZGlmZjtoPWIxNWExOWMxNDgzODRlNzMzMzhhYTdjNWIxMjY1MjEzOGUzNWVkMjgnLFxuICAgICAgICAgICdodHRwczovL2dpdC5vcGVuc3NsLm9yZy9naXR3ZWIvP3A9b3BlbnNzbC5naXQ7YT1jb21taXRkaWZmO2g9ZDMzM2ViYWY5Yzc3MzMyNzU0YTlkNWUxMTFlMmY1M2UxZGU1NGZkZCcsXG4gICAgICAgICAgJ2h0dHBzOi8vZ2l0Lm9wZW5zc2wub3JnL2dpdHdlYi8/cD1vcGVuc3NsLmdpdDthPWNvbW1pdGRpZmY7aD1lMzJiYzg1NWE4MWEyZDQ4ZDIxNWM1MDZiZGViNGY1OTgwNDVmN2U5JyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5mZWRvcmFwcm9qZWN0Lm9yZy9hcmNoaXZlcy9saXN0L3BhY2thZ2UtYW5ub3VuY2VAbGlzdHMuZmVkb3JhcHJvamVjdC5vcmcvbWVzc2FnZS9FV0M0MlVYTDVHSFRVNUc3N1ZLQkY2SllVVU5HU0hPTS8nLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLmZlZG9yYXByb2plY3Qub3JnL2FyY2hpdmVzL2xpc3QvcGFja2FnZS1hbm5vdW5jZUBsaXN0cy5mZWRvcmFwcm9qZWN0Lm9yZy9tZXNzYWdlL1kzSVZGR1NFUkFaTE5KQ0szNVRFTTJSNDcyNlhJSDNaLycsXG4gICAgICAgICAgJ2h0dHBzOi8vbGlzdHMuZmVkb3JhcHJvamVjdC5vcmcvYXJjaGl2ZXMvbGlzdC9wYWNrYWdlLWFubm91bmNlQGxpc3RzLmZlZG9yYXByb2plY3Qub3JnL21lc3NhZ2UvWkJFVjVRR0RSRlVaRE1ORUNGWFVTTjVGTVlPWkRFNFYvJyxcbiAgICAgICAgICAnaHR0cHM6Ly9zZWN1cml0eS5uZXRhcHAuY29tL2Fkdmlzb3J5L250YXAtMjAxOTA4MjMtMDAwNi8nLFxuICAgICAgICAgICdodHRwczovL3N1cHBvcnQuZjUuY29tL2NzcC9hcnRpY2xlL0s5NDA0MTM1NCcsXG4gICAgICAgICAgJ2h0dHBzOi8vc3VwcG9ydC5mNS5jb20vY3NwL2FydGljbGUvSzk0MDQxMzU0P3V0bV9zb3VyY2U9ZjVzdXBwb3J0JmFtcDt1dG1fbWVkaXVtPVJTUycsXG4gICAgICAgICAgJ2h0dHBzOi8vd3d3Lm9wZW5zc2wub3JnL25ld3Mvc2VjYWR2LzIwMTkwNzMwLnR4dCcsXG4gICAgICAgICAgJ2h0dHBzOi8vd3d3Lm9yYWNsZS5jb20vc2VjdXJpdHktYWxlcnRzL2NwdWFwcjIwMjAuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vd3d3Lm9yYWNsZS5jb20vc2VjdXJpdHktYWxlcnRzL2NwdWphbjIwMjAuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vd3d3Lm9yYWNsZS5jb20vdGVjaG5ldHdvcmsvc2VjdXJpdHktYWR2aXNvcnkvY3B1b2N0MjAxOS01MDcyODMyLmh0bWwnLFxuICAgICAgICAgICdodHRwczovL3d3dy50ZW5hYmxlLmNvbS9zZWN1cml0eS90bnMtMjAxOS0wOCcsXG4gICAgICAgICAgJ2h0dHBzOi8vd3d3LnRlbmFibGUuY29tL3NlY3VyaXR5L3Rucy0yMDE5LTA5JyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMTktMTU1MicsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiA1LFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAyMC0xNzUyIGFmZmVjdHMgbGliYy1iaW4nLFxuICAgICAgaWQ6ICcyMzUwMycsXG4gICAgICBmaXJlZHRpbWVzOiAxMixcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdsaWJjLWJpbicsXG4gICAgICAgICAgc291cmNlOiAnZ2xpYmMnLFxuICAgICAgICAgIHZlcnNpb246ICcyLjI3LTN1YnVudHUxJyxcbiAgICAgICAgICBhcmNoaXRlY3R1cmU6ICdhbWQ2NCcsXG4gICAgICAgICAgY29uZGl0aW9uOiAnUGFja2FnZSBsZXNzIHRoYW4gMi4zMi4wJyxcbiAgICAgICAgfSxcbiAgICAgICAgY3Zzczoge1xuICAgICAgICAgIGN2c3MyOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ2xvY2FsJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdoaWdoJyxcbiAgICAgICAgICAgICAgYXV0aGVudGljYXRpb246ICdub25lJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICczLjcwMDAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY3ZlOiAnQ1ZFLTIwMjAtMTc1MicsXG4gICAgICAgIHRpdGxlOiAnQ1ZFLTIwMjAtMTc1MiBvbiBVYnVudHUgMTguMDQgTFRTIChiaW9uaWMpIC0gbWVkaXVtLicsXG4gICAgICAgIHJhdGlvbmFsZTpcbiAgICAgICAgICAnQSB1c2UtYWZ0ZXItZnJlZSB2dWxuZXJhYmlsaXR5IGludHJvZHVjZWQgaW4gZ2xpYmMgdXBzdHJlYW0gdmVyc2lvbiAyLjE0IHdhcyBmb3VuZCBpbiB0aGUgd2F5IHRoZSB0aWxkZSBleHBhbnNpb24gd2FzIGNhcnJpZWQgb3V0LiBEaXJlY3RvcnkgcGF0aHMgY29udGFpbmluZyBhbiBpbml0aWFsIHRpbGRlIGZvbGxvd2VkIGJ5IGEgdmFsaWQgdXNlcm5hbWUgd2VyZSBhZmZlY3RlZCBieSB0aGlzIGlzc3VlLiBBIGxvY2FsIGF0dGFja2VyIGNvdWxkIGV4cGxvaXQgdGhpcyBmbGF3IGJ5IGNyZWF0aW5nIGEgc3BlY2lhbGx5IGNyYWZ0ZWQgcGF0aCB0aGF0LCB3aGVuIHByb2Nlc3NlZCBieSB0aGUgZ2xvYiBmdW5jdGlvbiwgd291bGQgcG90ZW50aWFsbHkgbGVhZCB0byBhcmJpdHJhcnkgY29kZSBleGVjdXRpb24uIFRoaXMgd2FzIGZpeGVkIGluIHZlcnNpb24gMi4zMi4nLFxuICAgICAgICBzZXZlcml0eTogJ0xvdycsXG4gICAgICAgIHB1Ymxpc2hlZDogJzIwMjAtMDQtMzAnLFxuICAgICAgICB1cGRhdGVkOiAnMjAyMC0wNS0xOCcsXG4gICAgICAgIHN0YXRlOiAnRml4ZWQnLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnQ1dFLTQxNicsXG4gICAgICAgIHJlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cHM6Ly9idWd6aWxsYS5yZWRoYXQuY29tL3Nob3dfYnVnLmNnaT9pZD1DVkUtMjAyMC0xNzUyJyxcbiAgICAgICAgICAnaHR0cHM6Ly9zZWN1cml0eS5uZXRhcHAuY29tL2Fkdmlzb3J5L250YXAtMjAyMDA1MTEtMDAwNS8nLFxuICAgICAgICAgICdodHRwczovL3NvdXJjZXdhcmUub3JnL2J1Z3ppbGxhL3Nob3dfYnVnLmNnaT9pZD0yNTQxNCcsXG4gICAgICAgICAgJ2h0dHBzOi8vc291cmNld2FyZS5vcmcvZ2l0L2dpdHdlYi5jZ2k/cD1nbGliYy5naXQ7aD1kZGM2NTBlOWIzZGM5MTZlYWI0MTdjZTlmNzllNjczMzdiMDUwMzVjJyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMjAtMTc1MicsXG4gICAgICAgICAgJ2h0dHA6Ly9wZW9wbGUuY2Fub25pY2FsLmNvbS9+dWJ1bnR1LXNlY3VyaXR5L2N2ZS8yMDIwL0NWRS0yMDIwLTE3NTIuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vY3ZlLm1pdHJlLm9yZy9jZ2ktYmluL2N2ZW5hbWUuY2dpP25hbWU9Q1ZFLTIwMjAtMTc1MicsXG4gICAgICAgICAgJ2h0dHBzOi8vc291cmNld2FyZS5vcmcvZ2l0Lz9wPWdsaWJjLmdpdDthPWNvbW1pdGRpZmY7aD0yNjNlNjE3NTk5OWJjN2Y1YWRiOGIzMmZkMTJmY2ZhZTNmMGJiMDVhO2hwPTM3ZGI0NTM5ZGQ4YjVjMDk4ZDkyMzUyNDljNWQyYWVkYWE2N2Q3ZDEnLFxuICAgICAgICBdLFxuICAgICAgICBhc3NpZ25lcjogJ2N2ZUBtaXRyZS5vcmcnLFxuICAgICAgICBjdmVfdmVyc2lvbjogJzQuMCcsXG4gICAgICAgIHN0YXR1czogJ0FjdGl2ZScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBydWxlOiB7XG4gICAgICBsZXZlbDogNSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ1ZFLTIwMjAtMTc1MiBhZmZlY3RzIG11bHRpYXJjaC1zdXBwb3J0JyxcbiAgICAgIGlkOiAnMjM1MDMnLFxuICAgICAgZmlyZWR0aW1lczogMTcsXG4gICAgfSxcbiAgICBkYXRhOiB7XG4gICAgICB2dWxuZXJhYmlsaXR5OiB7XG4gICAgICAgIHBhY2thZ2U6IHtcbiAgICAgICAgICBuYW1lOiAnbXVsdGlhcmNoLXN1cHBvcnQnLFxuICAgICAgICAgIHNvdXJjZTogJ2dsaWJjJyxcbiAgICAgICAgICB2ZXJzaW9uOiAnMi4yNy0zdWJ1bnR1MScsXG4gICAgICAgICAgYXJjaGl0ZWN0dXJlOiAnYW1kNjQnLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ1BhY2thZ2UgbGVzcyB0aGFuIDIuMzIuMCcsXG4gICAgICAgIH0sXG4gICAgICAgIGN2c3M6IHtcbiAgICAgICAgICBjdnNzMjoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICdsb2NhbCcsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnaGlnaCcsXG4gICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnMy43MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDIwLTE3NTInLFxuICAgICAgICB0aXRsZTogJ0NWRS0yMDIwLTE3NTIgb24gVWJ1bnR1IDE4LjA0IExUUyAoYmlvbmljKSAtIG1lZGl1bS4nLFxuICAgICAgICByYXRpb25hbGU6XG4gICAgICAgICAgJ0EgdXNlLWFmdGVyLWZyZWUgdnVsbmVyYWJpbGl0eSBpbnRyb2R1Y2VkIGluIGdsaWJjIHVwc3RyZWFtIHZlcnNpb24gMi4xNCB3YXMgZm91bmQgaW4gdGhlIHdheSB0aGUgdGlsZGUgZXhwYW5zaW9uIHdhcyBjYXJyaWVkIG91dC4gRGlyZWN0b3J5IHBhdGhzIGNvbnRhaW5pbmcgYW4gaW5pdGlhbCB0aWxkZSBmb2xsb3dlZCBieSBhIHZhbGlkIHVzZXJuYW1lIHdlcmUgYWZmZWN0ZWQgYnkgdGhpcyBpc3N1ZS4gQSBsb2NhbCBhdHRhY2tlciBjb3VsZCBleHBsb2l0IHRoaXMgZmxhdyBieSBjcmVhdGluZyBhIHNwZWNpYWxseSBjcmFmdGVkIHBhdGggdGhhdCwgd2hlbiBwcm9jZXNzZWQgYnkgdGhlIGdsb2IgZnVuY3Rpb24sIHdvdWxkIHBvdGVudGlhbGx5IGxlYWQgdG8gYXJiaXRyYXJ5IGNvZGUgZXhlY3V0aW9uLiBUaGlzIHdhcyBmaXhlZCBpbiB2ZXJzaW9uIDIuMzIuJyxcbiAgICAgICAgc2V2ZXJpdHk6ICdMb3cnLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDIwLTA0LTMwJyxcbiAgICAgICAgdXBkYXRlZDogJzIwMjAtMDUtMTgnLFxuICAgICAgICBzdGF0ZTogJ0ZpeGVkJyxcbiAgICAgICAgY3dlX3JlZmVyZW5jZTogJ0NXRS00MTYnLFxuICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHBzOi8vYnVnemlsbGEucmVkaGF0LmNvbS9zaG93X2J1Zy5jZ2k/aWQ9Q1ZFLTIwMjAtMTc1MicsXG4gICAgICAgICAgJ2h0dHBzOi8vc2VjdXJpdHkubmV0YXBwLmNvbS9hZHZpc29yeS9udGFwLTIwMjAwNTExLTAwMDUvJyxcbiAgICAgICAgICAnaHR0cHM6Ly9zb3VyY2V3YXJlLm9yZy9idWd6aWxsYS9zaG93X2J1Zy5jZ2k/aWQ9MjU0MTQnLFxuICAgICAgICAgICdodHRwczovL3NvdXJjZXdhcmUub3JnL2dpdC9naXR3ZWIuY2dpP3A9Z2xpYmMuZ2l0O2g9ZGRjNjUwZTliM2RjOTE2ZWFiNDE3Y2U5Zjc5ZTY3MzM3YjA1MDM1YycsXG4gICAgICAgICAgJ2h0dHBzOi8vbnZkLm5pc3QuZ292L3Z1bG4vZGV0YWlsL0NWRS0yMDIwLTE3NTInLFxuICAgICAgICAgICdodHRwOi8vcGVvcGxlLmNhbm9uaWNhbC5jb20vfnVidW50dS1zZWN1cml0eS9jdmUvMjAyMC9DVkUtMjAyMC0xNzUyLmh0bWwnLFxuICAgICAgICAgICdodHRwczovL2N2ZS5taXRyZS5vcmcvY2dpLWJpbi9jdmVuYW1lLmNnaT9uYW1lPUNWRS0yMDIwLTE3NTInLFxuICAgICAgICAgICdodHRwczovL3NvdXJjZXdhcmUub3JnL2dpdC8/cD1nbGliYy5naXQ7YT1jb21taXRkaWZmO2g9MjYzZTYxNzU5OTliYzdmNWFkYjhiMzJmZDEyZmNmYWUzZjBiYjA1YTtocD0zN2RiNDUzOWRkOGI1YzA5OGQ5MjM1MjQ5YzVkMmFlZGFhNjdkN2QxJyxcbiAgICAgICAgXSxcbiAgICAgICAgYXNzaWduZXI6ICdjdmVAbWl0cmUub3JnJyxcbiAgICAgICAgY3ZlX3ZlcnNpb246ICc0LjAnLFxuICAgICAgICBzdGF0dXM6ICdBY3RpdmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDUsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NWRS0yMDE5LTE5NjQ1IGFmZmVjdHMgbGlic3FsaXRlMy0wJyxcbiAgICAgIGlkOiAnMjM1MDMnLFxuICAgICAgZmlyZWR0aW1lczogMTgsXG4gICAgfSxcbiAgICBkYXRhOiB7XG4gICAgICB2dWxuZXJhYmlsaXR5OiB7XG4gICAgICAgIHBhY2thZ2U6IHtcbiAgICAgICAgICBuYW1lOiAnbGlic3FsaXRlMy0wJyxcbiAgICAgICAgICBzb3VyY2U6ICdzcWxpdGUzJyxcbiAgICAgICAgICB2ZXJzaW9uOiAnMy4yMi4wLTF1YnVudHUwLjMnLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIHVuZml4ZWQnLFxuICAgICAgICB9LFxuICAgICAgICBjdnNzOiB7XG4gICAgICAgICAgY3ZzczI6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbG9jYWwnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ25vbmUnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnMi4xMDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDE5LTE5NjQ1JyxcbiAgICAgICAgdGl0bGU6ICdDVkUtMjAxOS0xOTY0NSBvbiBVYnVudHUgMTguMDQgTFRTIChiaW9uaWMpIC0gbG93LicsXG4gICAgICAgIHJhdGlvbmFsZTpcbiAgICAgICAgICAnYWx0ZXIuYyBpbiBTUUxpdGUgdGhyb3VnaCAzLjMwLjEgYWxsb3dzIGF0dGFja2VycyB0byB0cmlnZ2VyIGluZmluaXRlIHJlY3Vyc2lvbiB2aWEgY2VydGFpbiB0eXBlcyBvZiBzZWxmLXJlZmVyZW50aWFsIHZpZXdzIGluIGNvbmp1bmN0aW9uIHdpdGggQUxURVIgVEFCTEUgc3RhdGVtZW50cy4nLFxuICAgICAgICBzZXZlcml0eTogJ0xvdycsXG4gICAgICAgIHB1Ymxpc2hlZDogJzIwMTktMTItMDknLFxuICAgICAgICB1cGRhdGVkOiAnMjAxOS0xMi0yMycsXG4gICAgICAgIHN0YXRlOiAnVW5maXhlZCcsXG4gICAgICAgIGN3ZV9yZWZlcmVuY2U6ICdDV0UtNjc0JyxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vc3FsaXRlL3NxbGl0ZS9jb21taXQvMzgwOTY5NjFjN2NkMTA5MTEwYWMyMWQzZWQ3ZGFkN2UwY2IwYWUwNicsXG4gICAgICAgICAgJ2h0dHBzOi8vc2VjdXJpdHkubmV0YXBwLmNvbS9hZHZpc29yeS9udGFwLTIwMTkxMjIzLTAwMDEvJyxcbiAgICAgICAgICAnaHR0cHM6Ly93d3cub3JhY2xlLmNvbS9zZWN1cml0eS1hbGVydHMvY3B1YXByMjAyMC5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMTktMTk2NDUnLFxuICAgICAgICAgICdodHRwOi8vcGVvcGxlLmNhbm9uaWNhbC5jb20vfnVidW50dS1zZWN1cml0eS9jdmUvMjAxOS9DVkUtMjAxOS0xOTY0NS5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9jdmUubWl0cmUub3JnL2NnaS1iaW4vY3ZlbmFtZS5jZ2k/bmFtZT1DVkUtMjAxOS0xOTY0NScsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiA1LFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAxOS0xOTY0NSBhZmZlY3RzIHNxbGl0ZTMnLFxuICAgICAgaWQ6ICcyMzUwMycsXG4gICAgICBmaXJlZHRpbWVzOiAxOSxcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdzcWxpdGUzJyxcbiAgICAgICAgICB2ZXJzaW9uOiAnMy4yMi4wLTF1YnVudHUwLjMnLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIHVuZml4ZWQnLFxuICAgICAgICB9LFxuICAgICAgICBjdnNzOiB7XG4gICAgICAgICAgY3ZzczI6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbG9jYWwnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ25vbmUnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnMi4xMDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDE5LTE5NjQ1JyxcbiAgICAgICAgdGl0bGU6ICdDVkUtMjAxOS0xOTY0NSBvbiBVYnVudHUgMTguMDQgTFRTIChiaW9uaWMpIC0gbG93LicsXG4gICAgICAgIHJhdGlvbmFsZTpcbiAgICAgICAgICAnYWx0ZXIuYyBpbiBTUUxpdGUgdGhyb3VnaCAzLjMwLjEgYWxsb3dzIGF0dGFja2VycyB0byB0cmlnZ2VyIGluZmluaXRlIHJlY3Vyc2lvbiB2aWEgY2VydGFpbiB0eXBlcyBvZiBzZWxmLXJlZmVyZW50aWFsIHZpZXdzIGluIGNvbmp1bmN0aW9uIHdpdGggQUxURVIgVEFCTEUgc3RhdGVtZW50cy4nLFxuICAgICAgICBzZXZlcml0eTogJ0xvdycsXG4gICAgICAgIHB1Ymxpc2hlZDogJzIwMTktMTItMDknLFxuICAgICAgICB1cGRhdGVkOiAnMjAxOS0xMi0yMycsXG4gICAgICAgIHN0YXRlOiAnVW5maXhlZCcsXG4gICAgICAgIGN3ZV9yZWZlcmVuY2U6ICdDV0UtNjc0JyxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vc3FsaXRlL3NxbGl0ZS9jb21taXQvMzgwOTY5NjFjN2NkMTA5MTEwYWMyMWQzZWQ3ZGFkN2UwY2IwYWUwNicsXG4gICAgICAgICAgJ2h0dHBzOi8vc2VjdXJpdHkubmV0YXBwLmNvbS9hZHZpc29yeS9udGFwLTIwMTkxMjIzLTAwMDEvJyxcbiAgICAgICAgICAnaHR0cHM6Ly93d3cub3JhY2xlLmNvbS9zZWN1cml0eS1hbGVydHMvY3B1YXByMjAyMC5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMTktMTk2NDUnLFxuICAgICAgICAgICdodHRwOi8vcGVvcGxlLmNhbm9uaWNhbC5jb20vfnVidW50dS1zZWN1cml0eS9jdmUvMjAxOS9DVkUtMjAxOS0xOTY0NS5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9jdmUubWl0cmUub3JnL2NnaS1iaW4vY3ZlbmFtZS5jZ2k/bmFtZT1DVkUtMjAxOS0xOTY0NScsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiA1LFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAxMy00MjM1IGFmZmVjdHMgbG9naW4nLFxuICAgICAgaWQ6ICcyMzUwMycsXG4gICAgICBmaXJlZHRpbWVzOiAyMCxcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdsb2dpbicsXG4gICAgICAgICAgc291cmNlOiAnc2hhZG93JyxcbiAgICAgICAgICB2ZXJzaW9uOiAnMTo0LjUtMXVidW50dTInLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIHVuZml4ZWQnLFxuICAgICAgICB9LFxuICAgICAgICBjdnNzOiB7XG4gICAgICAgICAgY3ZzczI6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbG9jYWwnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ21lZGl1bScsXG4gICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnMy4zMDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDEzLTQyMzUnLFxuICAgICAgICB0aXRsZTogJ0NWRS0yMDEzLTQyMzUgb24gVWJ1bnR1IDE4LjA0IExUUyAoYmlvbmljKSAtIGxvdy4nLFxuICAgICAgICByYXRpb25hbGU6XG4gICAgICAgICAgJ3NoYWRvdzogVE9DVE9VICh0aW1lLW9mLWNoZWNrIHRpbWUtb2YtdXNlKSByYWNlIGNvbmRpdGlvbiB3aGVuIGNvcHlpbmcgYW5kIHJlbW92aW5nIGRpcmVjdG9yeSB0cmVlcycsXG4gICAgICAgIHNldmVyaXR5OiAnTG93JyxcbiAgICAgICAgcHVibGlzaGVkOiAnMjAxOS0xMi0wMycsXG4gICAgICAgIHVwZGF0ZWQ6ICcyMDE5LTEyLTEzJyxcbiAgICAgICAgc3RhdGU6ICdVbmZpeGVkJyxcbiAgICAgICAgY3dlX3JlZmVyZW5jZTogJ0NXRS0zNjcnLFxuICAgICAgICBidWd6aWxsYV9yZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHBzOi8vYnVncy5kZWJpYW4ub3JnL2NnaS1iaW4vYnVncmVwb3J0LmNnaT9idWc9Nzc4OTUwJyxcbiAgICAgICAgICAnaHR0cHM6Ly9idWd6aWxsYS5yZWRoYXQuY29tL3Nob3dfYnVnLmNnaT9pZD04ODQ2NTgnLFxuICAgICAgICBdLFxuICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHBzOi8vYWNjZXNzLnJlZGhhdC5jb20vc2VjdXJpdHkvY3ZlL2N2ZS0yMDEzLTQyMzUnLFxuICAgICAgICAgICdodHRwczovL2J1Z3ppbGxhLnJlZGhhdC5jb20vc2hvd19idWcuY2dpP2lkPUNWRS0yMDEzLTQyMzUnLFxuICAgICAgICAgICdodHRwczovL3NlY3VyaXR5LXRyYWNrZXIuZGViaWFuLm9yZy90cmFja2VyL0NWRS0yMDEzLTQyMzUnLFxuICAgICAgICAgICdodHRwczovL252ZC5uaXN0Lmdvdi92dWxuL2RldGFpbC9DVkUtMjAxMy00MjM1JyxcbiAgICAgICAgICAnaHR0cDovL3Blb3BsZS5jYW5vbmljYWwuY29tL351YnVudHUtc2VjdXJpdHkvY3ZlLzIwMTMvQ1ZFLTIwMTMtNDIzNS5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9jdmUubWl0cmUub3JnL2NnaS1iaW4vY3ZlbmFtZS5jZ2k/bmFtZT1DVkUtMjAxMy00MjM1JyxcbiAgICAgICAgXSxcbiAgICAgICAgYXNzaWduZXI6ICdjdmVAbWl0cmUub3JnJyxcbiAgICAgICAgY3ZlX3ZlcnNpb246ICc0LjAnLFxuICAgICAgICBzdGF0dXM6ICdBY3RpdmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDUsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NWRS0yMDEzLTQyMzUgYWZmZWN0cyBwYXNzd2QnLFxuICAgICAgaWQ6ICcyMzUwMycsXG4gICAgICBmaXJlZHRpbWVzOiAyMSxcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdwYXNzd2QnLFxuICAgICAgICAgIHNvdXJjZTogJ3NoYWRvdycsXG4gICAgICAgICAgdmVyc2lvbjogJzE6NC41LTF1YnVudHUyJyxcbiAgICAgICAgICBhcmNoaXRlY3R1cmU6ICdhbWQ2NCcsXG4gICAgICAgICAgY29uZGl0aW9uOiAnUGFja2FnZSB1bmZpeGVkJyxcbiAgICAgICAgfSxcbiAgICAgICAgY3Zzczoge1xuICAgICAgICAgIGN2c3MyOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ2xvY2FsJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdtZWRpdW0nLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAnbm9uZScsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAncGFydGlhbCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzMuMzAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjdmU6ICdDVkUtMjAxMy00MjM1JyxcbiAgICAgICAgdGl0bGU6ICdDVkUtMjAxMy00MjM1IG9uIFVidW50dSAxOC4wNCBMVFMgKGJpb25pYykgLSBsb3cuJyxcbiAgICAgICAgcmF0aW9uYWxlOlxuICAgICAgICAgICdzaGFkb3c6IFRPQ1RPVSAodGltZS1vZi1jaGVjayB0aW1lLW9mLXVzZSkgcmFjZSBjb25kaXRpb24gd2hlbiBjb3B5aW5nIGFuZCByZW1vdmluZyBkaXJlY3RvcnkgdHJlZXMnLFxuICAgICAgICBzZXZlcml0eTogJ0xvdycsXG4gICAgICAgIHB1Ymxpc2hlZDogJzIwMTktMTItMDMnLFxuICAgICAgICB1cGRhdGVkOiAnMjAxOS0xMi0xMycsXG4gICAgICAgIHN0YXRlOiAnVW5maXhlZCcsXG4gICAgICAgIGN3ZV9yZWZlcmVuY2U6ICdDV0UtMzY3JyxcbiAgICAgICAgYnVnemlsbGFfcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwczovL2J1Z3MuZGViaWFuLm9yZy9jZ2ktYmluL2J1Z3JlcG9ydC5jZ2k/YnVnPTc3ODk1MCcsXG4gICAgICAgICAgJ2h0dHBzOi8vYnVnemlsbGEucmVkaGF0LmNvbS9zaG93X2J1Zy5jZ2k/aWQ9ODg0NjU4JyxcbiAgICAgICAgXSxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwczovL2FjY2Vzcy5yZWRoYXQuY29tL3NlY3VyaXR5L2N2ZS9jdmUtMjAxMy00MjM1JyxcbiAgICAgICAgICAnaHR0cHM6Ly9idWd6aWxsYS5yZWRoYXQuY29tL3Nob3dfYnVnLmNnaT9pZD1DVkUtMjAxMy00MjM1JyxcbiAgICAgICAgICAnaHR0cHM6Ly9zZWN1cml0eS10cmFja2VyLmRlYmlhbi5vcmcvdHJhY2tlci9DVkUtMjAxMy00MjM1JyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMTMtNDIzNScsXG4gICAgICAgICAgJ2h0dHA6Ly9wZW9wbGUuY2Fub25pY2FsLmNvbS9+dWJ1bnR1LXNlY3VyaXR5L2N2ZS8yMDEzL0NWRS0yMDEzLTQyMzUuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vY3ZlLm1pdHJlLm9yZy9jZ2ktYmluL2N2ZW5hbWUuY2dpP25hbWU9Q1ZFLTIwMTMtNDIzNScsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiA1LFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAxMy00MjM1IGFmZmVjdHMgbG9naW4nLFxuICAgICAgaWQ6ICcyMzUwMycsXG4gICAgICBmaXJlZHRpbWVzOiAyMCxcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdsb2dpbicsXG4gICAgICAgICAgc291cmNlOiAnc2hhZG93JyxcbiAgICAgICAgICB2ZXJzaW9uOiAnMTo0LjUtMXVidW50dTInLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIHVuZml4ZWQnLFxuICAgICAgICB9LFxuICAgICAgICBjdnNzOiB7XG4gICAgICAgICAgY3ZzczI6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbG9jYWwnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ21lZGl1bScsXG4gICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnMy4zMDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDEzLTQyMzUnLFxuICAgICAgICB0aXRsZTogJ0NWRS0yMDEzLTQyMzUgb24gVWJ1bnR1IDE4LjA0IExUUyAoYmlvbmljKSAtIGxvdy4nLFxuICAgICAgICByYXRpb25hbGU6XG4gICAgICAgICAgJ3NoYWRvdzogVE9DVE9VICh0aW1lLW9mLWNoZWNrIHRpbWUtb2YtdXNlKSByYWNlIGNvbmRpdGlvbiB3aGVuIGNvcHlpbmcgYW5kIHJlbW92aW5nIGRpcmVjdG9yeSB0cmVlcycsXG4gICAgICAgIHNldmVyaXR5OiAnTG93JyxcbiAgICAgICAgcHVibGlzaGVkOiAnMjAxOS0xMi0wMycsXG4gICAgICAgIHVwZGF0ZWQ6ICcyMDE5LTEyLTEzJyxcbiAgICAgICAgc3RhdGU6ICdVbmZpeGVkJyxcbiAgICAgICAgY3dlX3JlZmVyZW5jZTogJ0NXRS0zNjcnLFxuICAgICAgICBidWd6aWxsYV9yZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHBzOi8vYnVncy5kZWJpYW4ub3JnL2NnaS1iaW4vYnVncmVwb3J0LmNnaT9idWc9Nzc4OTUwJyxcbiAgICAgICAgICAnaHR0cHM6Ly9idWd6aWxsYS5yZWRoYXQuY29tL3Nob3dfYnVnLmNnaT9pZD04ODQ2NTgnLFxuICAgICAgICBdLFxuICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHBzOi8vYWNjZXNzLnJlZGhhdC5jb20vc2VjdXJpdHkvY3ZlL2N2ZS0yMDEzLTQyMzUnLFxuICAgICAgICAgICdodHRwczovL2J1Z3ppbGxhLnJlZGhhdC5jb20vc2hvd19idWcuY2dpP2lkPUNWRS0yMDEzLTQyMzUnLFxuICAgICAgICAgICdodHRwczovL3NlY3VyaXR5LXRyYWNrZXIuZGViaWFuLm9yZy90cmFja2VyL0NWRS0yMDEzLTQyMzUnLFxuICAgICAgICAgICdodHRwczovL252ZC5uaXN0Lmdvdi92dWxuL2RldGFpbC9DVkUtMjAxMy00MjM1JyxcbiAgICAgICAgICAnaHR0cDovL3Blb3BsZS5jYW5vbmljYWwuY29tL351YnVudHUtc2VjdXJpdHkvY3ZlLzIwMTMvQ1ZFLTIwMTMtNDIzNS5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9jdmUubWl0cmUub3JnL2NnaS1iaW4vY3ZlbmFtZS5jZ2k/bmFtZT1DVkUtMjAxMy00MjM1JyxcbiAgICAgICAgXSxcbiAgICAgICAgYXNzaWduZXI6ICdjdmVAbWl0cmUub3JnJyxcbiAgICAgICAgY3ZlX3ZlcnNpb246ICc0LjAnLFxuICAgICAgICBzdGF0dXM6ICdBY3RpdmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDcsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NWRS0yMDE5LTEwMDMwMTAgYWZmZWN0cyBnaXQnLFxuICAgICAgaWQ6ICcyMzUwNCcsXG4gICAgICBmaXJlZHRpbWVzOiAxNjIsXG4gICAgfSxcbiAgICBkYXRhOiB7XG4gICAgICB2dWxuZXJhYmlsaXR5OiB7XG4gICAgICAgIHBhY2thZ2U6IHtcbiAgICAgICAgICBuYW1lOiAnZ2l0JyxcbiAgICAgICAgICB2ZXJzaW9uOiAnMToyLjE3LjEtMXVidW50dTAuNycsXG4gICAgICAgICAgYXJjaGl0ZWN0dXJlOiAnYW1kNjQnLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ1BhY2thZ2UgbGVzcyBvciBlcXVhbCB0aGFuIDMuOS4xJyxcbiAgICAgICAgfSxcbiAgICAgICAgY3Zzczoge1xuICAgICAgICAgIGN2c3MyOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ25ldHdvcmsnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ21lZGl1bScsXG4gICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdub25lJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNC4zMDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY3ZzczM6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbmV0d29yaycsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbG93JyxcbiAgICAgICAgICAgICAgcHJpdmlsZWdlc19yZXF1aXJlZDogJ25vbmUnLFxuICAgICAgICAgICAgICB1c2VyX2ludGVyYWN0aW9uOiAncmVxdWlyZWQnLFxuICAgICAgICAgICAgICBzY29wZTogJ3VuY2hhbmdlZCcsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ2xvdycsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ25vbmUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc0LjMwMDAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY3ZlOiAnQ1ZFLTIwMTktMTAwMzAxMCcsXG4gICAgICAgIHRpdGxlOlxuICAgICAgICAgICdBIGNyb3NzLXNpdGUgcmVxdWVzdCBmb3JnZXJ5IHZ1bG5lcmFiaWxpdHkgZXhpc3RzIGluIEplbmtpbnMgR2l0IFBsdWdpbiAzLjkuMSBhbmQgZWFybGllciBpbiBzcmMvbWFpbi9qYXZhL2h1ZHNvbi9wbHVnaW5zL2dpdC9HaXRUYWdBY3Rpb24uamF2YSB0aGF0IGFsbG93cyBhdHRhY2tlcnMgdG8gY3JlYXRlIGEgR2l0IHRhZyBpbiBhIHdvcmtzcGFjZSBhbmQgYXR0YWNoIGNvcnJlc3BvbmRpbmcgbWV0YWRhdGEgdG8gYSBidWlsZCByZWNvcmQuJyxcbiAgICAgICAgc2V2ZXJpdHk6ICdNZWRpdW0nLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDE5LTAyLTA2JyxcbiAgICAgICAgdXBkYXRlZDogJzIwMTktMDQtMjYnLFxuICAgICAgICBzdGF0ZTogJ0ZpeGVkJyxcbiAgICAgICAgY3dlX3JlZmVyZW5jZTogJ0NXRS0zNTInLFxuICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHBzOi8vYWNjZXNzLnJlZGhhdC5jb20vZXJyYXRhL1JIQkEtMjAxOTowMzI2JyxcbiAgICAgICAgICAnaHR0cHM6Ly9hY2Nlc3MucmVkaGF0LmNvbS9lcnJhdGEvUkhCQS0yMDE5OjAzMjcnLFxuICAgICAgICAgICdodHRwczovL2plbmtpbnMuaW8vc2VjdXJpdHkvYWR2aXNvcnkvMjAxOS0wMS0yOC8jU0VDVVJJVFktMTA5NScsXG4gICAgICAgICAgJ2h0dHBzOi8vbnZkLm5pc3QuZ292L3Z1bG4vZGV0YWlsL0NWRS0yMDE5LTEwMDMwMTAnLFxuICAgICAgICBdLFxuICAgICAgICBhc3NpZ25lcjogJ2N2ZUBtaXRyZS5vcmcnLFxuICAgICAgICBjdmVfdmVyc2lvbjogJzQuMCcsXG4gICAgICAgIHN0YXR1czogJ0FjdGl2ZScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBydWxlOiB7XG4gICAgICBsZXZlbDogMTAsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NWRS0yMDIwLTkzNjYgYWZmZWN0cyBzY3JlZW4nLFxuICAgICAgaWQ6ICcyMzUwNScsXG4gICAgICBmaXJlZHRpbWVzOiA3NyxcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdzY3JlZW4nLFxuICAgICAgICAgIHZlcnNpb246ICc0LjYuMi0xdWJ1bnR1MScsXG4gICAgICAgICAgYXJjaGl0ZWN0dXJlOiAnYW1kNjQnLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ1BhY2thZ2UgbGVzcyB0aGFuIDQuOC4wJyxcbiAgICAgICAgfSxcbiAgICAgICAgY3Zzczoge1xuICAgICAgICAgIGN2c3MyOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ25ldHdvcmsnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNy41MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDIwLTkzNjYnLFxuICAgICAgICB0aXRsZTpcbiAgICAgICAgICAnQSBidWZmZXIgb3ZlcmZsb3cgd2FzIGZvdW5kIGluIHRoZSB3YXkgR05VIFNjcmVlbiBiZWZvcmUgNC44LjAgdHJlYXRlZCB0aGUgc3BlY2lhbCBlc2NhcGUgT1NDIDQ5LiBTcGVjaWFsbHkgY3JhZnRlZCBvdXRwdXQsIG9yIGEgc3BlY2lhbCBwcm9ncmFtLCBjb3VsZCBjb3JydXB0IG1lbW9yeSBhbmQgY3Jhc2ggU2NyZWVuIG9yIHBvc3NpYmx5IGhhdmUgdW5zcGVjaWZpZWQgb3RoZXIgaW1wYWN0LicsXG4gICAgICAgIHNldmVyaXR5OiAnSGlnaCcsXG4gICAgICAgIHB1Ymxpc2hlZDogJzIwMjAtMDItMjQnLFxuICAgICAgICB1cGRhdGVkOiAnMjAyMC0wMy0zMCcsXG4gICAgICAgIHN0YXRlOiAnRml4ZWQnLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnQ1dFLTEyMCcsXG4gICAgICAgIHJlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cDovL3d3dy5vcGVud2FsbC5jb20vbGlzdHMvb3NzLXNlY3VyaXR5LzIwMjAvMDIvMjUvMScsXG4gICAgICAgICAgJ2h0dHBzOi8vbGlzdHMuZ251Lm9yZy9hcmNoaXZlL2h0bWwvc2NyZWVuLWRldmVsLzIwMjAtMDIvbXNnMDAwMDcuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vc2VjdXJpdHkuZ2VudG9vLm9yZy9nbHNhLzIwMjAwMy02MicsXG4gICAgICAgICAgJ2h0dHBzOi8vd3d3Lm9wZW53YWxsLmNvbS9saXN0cy9vc3Mtc2VjdXJpdHkvMjAyMC8wMi8wNi8zJyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMjAtOTM2NicsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiAxMCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ1ZFLTIwMTktMTU4NDcgYWZmZWN0cyBnY2MnLFxuICAgICAgaWQ6ICcyMzUwNScsXG4gICAgICBmaXJlZHRpbWVzOiA4NixcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdnY2MnLFxuICAgICAgICAgIHNvdXJjZTogJ2djYy1kZWZhdWx0cycsXG4gICAgICAgICAgdmVyc2lvbjogJzQ6Ny40LjAtMXVidW50dTIuMycsXG4gICAgICAgICAgYXJjaGl0ZWN0dXJlOiAnYW1kNjQnLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ1BhY2thZ2UgbGVzcyB0aGFuIDEwLjAnLFxuICAgICAgICB9LFxuICAgICAgICBjdnNzOiB7XG4gICAgICAgICAgY3ZzczI6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbmV0d29yaycsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbG93JyxcbiAgICAgICAgICAgICAgYXV0aGVudGljYXRpb246ICdub25lJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAnbm9uZScsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ25vbmUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc1JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN2c3MzOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ25ldHdvcmsnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIHByaXZpbGVnZXNfcmVxdWlyZWQ6ICdub25lJyxcbiAgICAgICAgICAgICAgdXNlcl9pbnRlcmFjdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBzY29wZTogJ3VuY2hhbmdlZCcsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdoaWdoJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ25vbmUnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdub25lJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNy41MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDE5LTE1ODQ3JyxcbiAgICAgICAgdGl0bGU6ICdDVkUtMjAxOS0xNTg0NyBvbiBVYnVudHUgMTguMDQgTFRTIChiaW9uaWMpIC0gbmVnbGlnaWJsZS4nLFxuICAgICAgICByYXRpb25hbGU6XG4gICAgICAgICAgJ1RoZSBQT1dFUjkgYmFja2VuZCBpbiBHTlUgQ29tcGlsZXIgQ29sbGVjdGlvbiAoR0NDKSBiZWZvcmUgdmVyc2lvbiAxMCBjb3VsZCBvcHRpbWl6ZSBtdWx0aXBsZSBjYWxscyBvZiB0aGUgX19idWlsdGluX2Rhcm4gaW50cmluc2ljIGludG8gYSBzaW5nbGUgY2FsbCwgdGh1cyByZWR1Y2luZyB0aGUgZW50cm9weSBvZiB0aGUgcmFuZG9tIG51bWJlciBnZW5lcmF0b3IuIFRoaXMgb2NjdXJyZWQgYmVjYXVzZSBhIHZvbGF0aWxlIG9wZXJhdGlvbiB3YXMgbm90IHNwZWNpZmllZC4gRm9yIGV4YW1wbGUsIHdpdGhpbiBhIHNpbmdsZSBleGVjdXRpb24gb2YgYSBwcm9ncmFtLCB0aGUgb3V0cHV0IG9mIGV2ZXJ5IF9fYnVpbHRpbl9kYXJuKCkgY2FsbCBtYXkgYmUgdGhlIHNhbWUuJyxcbiAgICAgICAgc2V2ZXJpdHk6ICdIaWdoJyxcbiAgICAgICAgcHVibGlzaGVkOiAnMjAxOS0wOS0wMicsXG4gICAgICAgIHVwZGF0ZWQ6ICcyMDIwLTA1LTI2JyxcbiAgICAgICAgc3RhdGU6ICdGaXhlZCcsXG4gICAgICAgIGN3ZV9yZWZlcmVuY2U6ICdDV0UtMzMxJyxcbiAgICAgICAgYnVnemlsbGFfcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwczovL2djYy5nbnUub3JnL2J1Z3ppbGxhL3Nob3dfYnVnLmNnaT9pZD05MTQ4MScsXG4gICAgICAgIF0sXG4gICAgICAgIHJlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cDovL2xpc3RzLm9wZW5zdXNlLm9yZy9vcGVuc3VzZS1zZWN1cml0eS1hbm5vdW5jZS8yMDE5LTEwL21zZzAwMDU2Lmh0bWwnLFxuICAgICAgICAgICdodHRwOi8vbGlzdHMub3BlbnN1c2Uub3JnL29wZW5zdXNlLXNlY3VyaXR5LWFubm91bmNlLzIwMTktMTAvbXNnMDAwNTcuaHRtbCcsXG4gICAgICAgICAgJ2h0dHA6Ly9saXN0cy5vcGVuc3VzZS5vcmcvb3BlbnN1c2Utc2VjdXJpdHktYW5ub3VuY2UvMjAyMC0wNS9tc2cwMDA1OC5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9nY2MuZ251Lm9yZy9idWd6aWxsYS9zaG93X2J1Zy5jZ2k/aWQ9OTE0ODEnLFxuICAgICAgICAgICdodHRwczovL252ZC5uaXN0Lmdvdi92dWxuL2RldGFpbC9DVkUtMjAxOS0xNTg0NycsXG4gICAgICAgICAgJ2h0dHA6Ly9wZW9wbGUuY2Fub25pY2FsLmNvbS9+dWJ1bnR1LXNlY3VyaXR5L2N2ZS8yMDE5L0NWRS0yMDE5LTE1ODQ3Lmh0bWwnLFxuICAgICAgICAgICdodHRwczovL2N2ZS5taXRyZS5vcmcvY2dpLWJpbi9jdmVuYW1lLmNnaT9uYW1lPUNWRS0yMDE5LTE1ODQ3JyxcbiAgICAgICAgXSxcbiAgICAgICAgYXNzaWduZXI6ICdjdmVAbWl0cmUub3JnJyxcbiAgICAgICAgY3ZlX3ZlcnNpb246ICc0LjAnLFxuICAgICAgICBzdGF0dXM6ICdBY3RpdmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDcsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NWRS0yMDE3LTE0OTg4IGFmZmVjdHMgbGlib3BlbmV4cjIyJyxcbiAgICAgIGlkOiAnMjM1MDQnLFxuICAgICAgZmlyZWR0aW1lczogMTg5LFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgdnVsbmVyYWJpbGl0eToge1xuICAgICAgICBwYWNrYWdlOiB7XG4gICAgICAgICAgbmFtZTogJ2xpYm9wZW5leHIyMicsXG4gICAgICAgICAgc291cmNlOiAnb3BlbmV4cicsXG4gICAgICAgICAgdmVyc2lvbjogJzIuMi4wLTExLjF1YnVudHUxLjInLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIG1hdGNoZXMgYSB2dWxuZXJhYmxlIHZlcnNpb24nLFxuICAgICAgICB9LFxuICAgICAgICBjdnNzOiB7XG4gICAgICAgICAgY3ZzczI6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbmV0d29yaycsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbWVkaXVtJyxcbiAgICAgICAgICAgICAgYXV0aGVudGljYXRpb246ICdub25lJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ25vbmUnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAnbm9uZScsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc0LjMwMDAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjdnNzMzoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICdsb2NhbCcsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbG93JyxcbiAgICAgICAgICAgICAgcHJpdmlsZWdlc19yZXF1aXJlZDogJ25vbmUnLFxuICAgICAgICAgICAgICB1c2VyX2ludGVyYWN0aW9uOiAncmVxdWlyZWQnLFxuICAgICAgICAgICAgICBzY29wZTogJ3VuY2hhbmdlZCcsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ25vbmUnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdoaWdoJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNS41MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDE3LTE0OTg4JyxcbiAgICAgICAgdGl0bGU6XG4gICAgICAgICAgXCIqKiBESVNQVVRFRCAqKiBIZWFkZXI6OnJlYWRmcm9tIGluIElsbUltZi9JbWZIZWFkZXIuY3BwIGluIE9wZW5FWFIgMi4yLjAgYWxsb3dzIHJlbW90ZSBhdHRhY2tlcnMgdG8gY2F1c2UgYSBkZW5pYWwgb2Ygc2VydmljZSAoZXhjZXNzaXZlIG1lbW9yeSBhbGxvY2F0aW9uKSB2aWEgYSBjcmFmdGVkIGZpbGUgdGhhdCBpcyBhY2Nlc3NlZCB3aXRoIHRoZSBJbWZPcGVuSW5wdXRGaWxlIGZ1bmN0aW9uIGluIElsbUltZi9JbWZDUmdiYUZpbGUuY3BwLiBOT1RFOiBUaGUgbWFpbnRhaW5lciBhbmQgbXVsdGlwbGUgdGhpcmQgcGFydGllcyBiZWxpZXZlIHRoYXQgdGhpcyB2dWxuZXJhYmlsaXR5IGlzbid0IHZhbGlkLlwiLFxuICAgICAgICBzZXZlcml0eTogJ01lZGl1bScsXG4gICAgICAgIHB1Ymxpc2hlZDogJzIwMTctMTAtMDMnLFxuICAgICAgICB1cGRhdGVkOiAnMjAxOS0wOS0yMycsXG4gICAgICAgIHN0YXRlOiAnUGVuZGluZyBjb25maXJtYXRpb24nLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnQ1dFLTQwMCcsXG4gICAgICAgIHJlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cDovL2xpc3RzLm9wZW5zdXNlLm9yZy9vcGVuc3VzZS1zZWN1cml0eS1hbm5vdW5jZS8yMDE5LTA4L21zZzAwMDYzLmh0bWwnLFxuICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vb3BlbmV4ci9vcGVuZXhyL2lzc3Vlcy8yNDgnLFxuICAgICAgICAgICdodHRwczovL252ZC5uaXN0Lmdvdi92dWxuL2RldGFpbC9DVkUtMjAxNy0xNDk4OCcsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiA3LFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAyMC0xOTI3IGFmZmVjdHMgYXBhY2hlMicsXG4gICAgICBpZDogJzIzNTA0JyxcbiAgICAgIGZpcmVkdGltZXM6IDE5MCxcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdhcGFjaGUyJyxcbiAgICAgICAgICB2ZXJzaW9uOiAnMi40LjI5LTF1YnVudHU0LjEzJyxcbiAgICAgICAgICBhcmNoaXRlY3R1cmU6ICdhbWQ2NCcsXG4gICAgICAgICAgY29uZGl0aW9uOiAnUGFja2FnZSB1bmZpeGVkJyxcbiAgICAgICAgfSxcbiAgICAgICAgY3Zzczoge1xuICAgICAgICAgIGN2c3MyOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ25ldHdvcmsnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ21lZGl1bScsXG4gICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdub25lJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNS44MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDIwLTE5MjcnLFxuICAgICAgICB0aXRsZTogJ0NWRS0yMDIwLTE5Mjcgb24gVWJ1bnR1IDE4LjA0IExUUyAoYmlvbmljKSAtIGxvdy4nLFxuICAgICAgICByYXRpb25hbGU6XG4gICAgICAgICAgJ0luIEFwYWNoZSBIVFRQIFNlcnZlciAyLjQuMCB0byAyLjQuNDEsIHJlZGlyZWN0cyBjb25maWd1cmVkIHdpdGggbW9kX3Jld3JpdGUgdGhhdCB3ZXJlIGludGVuZGVkIHRvIGJlIHNlbGYtcmVmZXJlbnRpYWwgbWlnaHQgYmUgZm9vbGVkIGJ5IGVuY29kZWQgbmV3bGluZXMgYW5kIHJlZGlyZWN0IGluc3RlYWQgdG8gYW4gYW4gdW5leHBlY3RlZCBVUkwgd2l0aGluIHRoZSByZXF1ZXN0IFVSTC4nLFxuICAgICAgICBzZXZlcml0eTogJ01lZGl1bScsXG4gICAgICAgIHB1Ymxpc2hlZDogJzIwMjAtMDQtMDInLFxuICAgICAgICB1cGRhdGVkOiAnMjAyMC0wNC0wMycsXG4gICAgICAgIHN0YXRlOiAnVW5maXhlZCcsXG4gICAgICAgIGN3ZV9yZWZlcmVuY2U6ICdDV0UtNjAxJyxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vbGlzdHMub3BlbnN1c2Uub3JnL29wZW5zdXNlLXNlY3VyaXR5LWFubm91bmNlLzIwMjAtMDUvbXNnMDAwMDIuaHRtbCcsXG4gICAgICAgICAgJ2h0dHA6Ly93d3cub3BlbndhbGwuY29tL2xpc3RzL29zcy1zZWN1cml0eS8yMDIwLzA0LzAzLzEnLFxuICAgICAgICAgICdodHRwOi8vd3d3Lm9wZW53YWxsLmNvbS9saXN0cy9vc3Mtc2VjdXJpdHkvMjAyMC8wNC8wNC8xJyxcbiAgICAgICAgICAnaHR0cHM6Ly9odHRwZC5hcGFjaGUub3JnL3NlY3VyaXR5L3Z1bG5lcmFiaWxpdGllc18yNC5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5hcGFjaGUub3JnL3RocmVhZC5odG1sL3IxMGI4NTNlYTg3ZGQxNTBiMGU3NmZkYTNmODI1NGRmZGIyM2RkMDVmYTU1NTk2NDA1YjU4NDc4ZUAlM0NjdnMuaHR0cGQuYXBhY2hlLm9yZyUzRScsXG4gICAgICAgICAgJ2h0dHBzOi8vbGlzdHMuYXBhY2hlLm9yZy90aHJlYWQuaHRtbC9yMTcxOTY3NTMwNmRmYmVhY2VmZjNkYzYzY2NhZDNkZTJkNTYxNTkxOWNhM2MxMzI3Njk0OGI5YWNAJTNDZGV2Lmh0dHBkLmFwYWNoZS5vcmclM0UnLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLmFwYWNoZS5vcmcvdGhyZWFkLmh0bWwvcjUyYTUyZmQ2MGEyNThmNTk5OWE4ZmE1NDI0YjMwZDlmZDc5NTg4NWY5ZmY0ODI4ZDg4OWNkMjAxQCUzQ2Rldi5odHRwZC5hcGFjaGUub3JnJTNFJyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5hcGFjaGUub3JnL3RocmVhZC5odG1sL3I3MGJhNjUyYjc5YmEyMjRiMmNiYzBhMTgzMDc4YjNhNDlkZjc4M2I0MTk5MDNlM2RjZjRkNzhjN0AlM0NjdnMuaHR0cGQuYXBhY2hlLm9yZyUzRScsXG4gICAgICAgICAgJ2h0dHBzOi8vc2VjdXJpdHkubmV0YXBwLmNvbS9hZHZpc29yeS9udGFwLTIwMjAwNDEzLTAwMDIvJyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMjAtMTkyNycsXG4gICAgICAgICAgJ2h0dHA6Ly9wZW9wbGUuY2Fub25pY2FsLmNvbS9+dWJ1bnR1LXNlY3VyaXR5L2N2ZS8yMDIwL0NWRS0yMDIwLTE5MjcuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vY3ZlLm1pdHJlLm9yZy9jZ2ktYmluL2N2ZW5hbWUuY2dpP25hbWU9Q1ZFLTIwMjAtMTkyNycsXG4gICAgICAgICAgJ2h0dHBzOi8vaHR0cGQuYXBhY2hlLm9yZy9zZWN1cml0eS92dWxuZXJhYmlsaXRpZXNfMjQuaHRtbCNDVkUtMjAyMC0xOTI3JyxcbiAgICAgICAgXSxcbiAgICAgICAgYXNzaWduZXI6ICdjdmVAbWl0cmUub3JnJyxcbiAgICAgICAgY3ZlX3ZlcnNpb246ICc0LjAnLFxuICAgICAgICBzdGF0dXM6ICdBY3RpdmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDcsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NWRS0yMDIwLTE5MjcgYWZmZWN0cyBhcGFjaGUyLWJpbicsXG4gICAgICBpZDogJzIzNTA0JyxcbiAgICAgIGZpcmVkdGltZXM6IDE5MSxcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdhcGFjaGUyLWJpbicsXG4gICAgICAgICAgc291cmNlOiAnYXBhY2hlMicsXG4gICAgICAgICAgdmVyc2lvbjogJzIuNC4yOS0xdWJ1bnR1NC4xMycsXG4gICAgICAgICAgYXJjaGl0ZWN0dXJlOiAnYW1kNjQnLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ1BhY2thZ2UgdW5maXhlZCcsXG4gICAgICAgIH0sXG4gICAgICAgIGN2c3M6IHtcbiAgICAgICAgICBjdnNzMjoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICduZXR3b3JrJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdtZWRpdW0nLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAnbm9uZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzUuODAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjdmU6ICdDVkUtMjAyMC0xOTI3JyxcbiAgICAgICAgdGl0bGU6ICdDVkUtMjAyMC0xOTI3IG9uIFVidW50dSAxOC4wNCBMVFMgKGJpb25pYykgLSBsb3cuJyxcbiAgICAgICAgcmF0aW9uYWxlOlxuICAgICAgICAgICdJbiBBcGFjaGUgSFRUUCBTZXJ2ZXIgMi40LjAgdG8gMi40LjQxLCByZWRpcmVjdHMgY29uZmlndXJlZCB3aXRoIG1vZF9yZXdyaXRlIHRoYXQgd2VyZSBpbnRlbmRlZCB0byBiZSBzZWxmLXJlZmVyZW50aWFsIG1pZ2h0IGJlIGZvb2xlZCBieSBlbmNvZGVkIG5ld2xpbmVzIGFuZCByZWRpcmVjdCBpbnN0ZWFkIHRvIGFuIGFuIHVuZXhwZWN0ZWQgVVJMIHdpdGhpbiB0aGUgcmVxdWVzdCBVUkwuJyxcbiAgICAgICAgc2V2ZXJpdHk6ICdNZWRpdW0nLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDIwLTA0LTAyJyxcbiAgICAgICAgdXBkYXRlZDogJzIwMjAtMDQtMDMnLFxuICAgICAgICBzdGF0ZTogJ1VuZml4ZWQnLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnQ1dFLTYwMScsXG4gICAgICAgIHJlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cDovL2xpc3RzLm9wZW5zdXNlLm9yZy9vcGVuc3VzZS1zZWN1cml0eS1hbm5vdW5jZS8yMDIwLTA1L21zZzAwMDAyLmh0bWwnLFxuICAgICAgICAgICdodHRwOi8vd3d3Lm9wZW53YWxsLmNvbS9saXN0cy9vc3Mtc2VjdXJpdHkvMjAyMC8wNC8wMy8xJyxcbiAgICAgICAgICAnaHR0cDovL3d3dy5vcGVud2FsbC5jb20vbGlzdHMvb3NzLXNlY3VyaXR5LzIwMjAvMDQvMDQvMScsXG4gICAgICAgICAgJ2h0dHBzOi8vaHR0cGQuYXBhY2hlLm9yZy9zZWN1cml0eS92dWxuZXJhYmlsaXRpZXNfMjQuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vbGlzdHMuYXBhY2hlLm9yZy90aHJlYWQuaHRtbC9yMTBiODUzZWE4N2RkMTUwYjBlNzZmZGEzZjgyNTRkZmRiMjNkZDA1ZmE1NTU5NjQwNWI1ODQ3OGVAJTNDY3ZzLmh0dHBkLmFwYWNoZS5vcmclM0UnLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLmFwYWNoZS5vcmcvdGhyZWFkLmh0bWwvcjE3MTk2NzUzMDZkZmJlYWNlZmYzZGM2M2NjYWQzZGUyZDU2MTU5MTljYTNjMTMyNzY5NDhiOWFjQCUzQ2Rldi5odHRwZC5hcGFjaGUub3JnJTNFJyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5hcGFjaGUub3JnL3RocmVhZC5odG1sL3I1MmE1MmZkNjBhMjU4ZjU5OTlhOGZhNTQyNGIzMGQ5ZmQ3OTU4ODVmOWZmNDgyOGQ4ODljZDIwMUAlM0NkZXYuaHR0cGQuYXBhY2hlLm9yZyUzRScsXG4gICAgICAgICAgJ2h0dHBzOi8vbGlzdHMuYXBhY2hlLm9yZy90aHJlYWQuaHRtbC9yNzBiYTY1MmI3OWJhMjI0YjJjYmMwYTE4MzA3OGIzYTQ5ZGY3ODNiNDE5OTAzZTNkY2Y0ZDc4YzdAJTNDY3ZzLmh0dHBkLmFwYWNoZS5vcmclM0UnLFxuICAgICAgICAgICdodHRwczovL3NlY3VyaXR5Lm5ldGFwcC5jb20vYWR2aXNvcnkvbnRhcC0yMDIwMDQxMy0wMDAyLycsXG4gICAgICAgICAgJ2h0dHBzOi8vbnZkLm5pc3QuZ292L3Z1bG4vZGV0YWlsL0NWRS0yMDIwLTE5MjcnLFxuICAgICAgICAgICdodHRwOi8vcGVvcGxlLmNhbm9uaWNhbC5jb20vfnVidW50dS1zZWN1cml0eS9jdmUvMjAyMC9DVkUtMjAyMC0xOTI3Lmh0bWwnLFxuICAgICAgICAgICdodHRwczovL2N2ZS5taXRyZS5vcmcvY2dpLWJpbi9jdmVuYW1lLmNnaT9uYW1lPUNWRS0yMDIwLTE5MjcnLFxuICAgICAgICAgICdodHRwczovL2h0dHBkLmFwYWNoZS5vcmcvc2VjdXJpdHkvdnVsbmVyYWJpbGl0aWVzXzI0Lmh0bWwjQ1ZFLTIwMjAtMTkyNycsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiA3LFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAyMC0xOTI3IGFmZmVjdHMgYXBhY2hlMi1kYXRhJyxcbiAgICAgIGlkOiAnMjM1MDQnLFxuICAgICAgZmlyZWR0aW1lczogMTkyLFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgdnVsbmVyYWJpbGl0eToge1xuICAgICAgICBwYWNrYWdlOiB7XG4gICAgICAgICAgbmFtZTogJ2FwYWNoZTItZGF0YScsXG4gICAgICAgICAgc291cmNlOiAnYXBhY2hlMicsXG4gICAgICAgICAgdmVyc2lvbjogJzIuNC4yOS0xdWJ1bnR1NC4xMycsXG4gICAgICAgICAgYXJjaGl0ZWN0dXJlOiAnYWxsJyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIHVuZml4ZWQnLFxuICAgICAgICB9LFxuICAgICAgICBjdnNzOiB7XG4gICAgICAgICAgY3ZzczI6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbmV0d29yaycsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbWVkaXVtJyxcbiAgICAgICAgICAgICAgYXV0aGVudGljYXRpb246ICdub25lJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ25vbmUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc1LjgwMDAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY3ZlOiAnQ1ZFLTIwMjAtMTkyNycsXG4gICAgICAgIHRpdGxlOiAnQ1ZFLTIwMjAtMTkyNyBvbiBVYnVudHUgMTguMDQgTFRTIChiaW9uaWMpIC0gbG93LicsXG4gICAgICAgIHJhdGlvbmFsZTpcbiAgICAgICAgICAnSW4gQXBhY2hlIEhUVFAgU2VydmVyIDIuNC4wIHRvIDIuNC40MSwgcmVkaXJlY3RzIGNvbmZpZ3VyZWQgd2l0aCBtb2RfcmV3cml0ZSB0aGF0IHdlcmUgaW50ZW5kZWQgdG8gYmUgc2VsZi1yZWZlcmVudGlhbCBtaWdodCBiZSBmb29sZWQgYnkgZW5jb2RlZCBuZXdsaW5lcyBhbmQgcmVkaXJlY3QgaW5zdGVhZCB0byBhbiBhbiB1bmV4cGVjdGVkIFVSTCB3aXRoaW4gdGhlIHJlcXVlc3QgVVJMLicsXG4gICAgICAgIHNldmVyaXR5OiAnTWVkaXVtJyxcbiAgICAgICAgcHVibGlzaGVkOiAnMjAyMC0wNC0wMicsXG4gICAgICAgIHVwZGF0ZWQ6ICcyMDIwLTA0LTAzJyxcbiAgICAgICAgc3RhdGU6ICdVbmZpeGVkJyxcbiAgICAgICAgY3dlX3JlZmVyZW5jZTogJ0NXRS02MDEnLFxuICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHA6Ly9saXN0cy5vcGVuc3VzZS5vcmcvb3BlbnN1c2Utc2VjdXJpdHktYW5ub3VuY2UvMjAyMC0wNS9tc2cwMDAwMi5odG1sJyxcbiAgICAgICAgICAnaHR0cDovL3d3dy5vcGVud2FsbC5jb20vbGlzdHMvb3NzLXNlY3VyaXR5LzIwMjAvMDQvMDMvMScsXG4gICAgICAgICAgJ2h0dHA6Ly93d3cub3BlbndhbGwuY29tL2xpc3RzL29zcy1zZWN1cml0eS8yMDIwLzA0LzA0LzEnLFxuICAgICAgICAgICdodHRwczovL2h0dHBkLmFwYWNoZS5vcmcvc2VjdXJpdHkvdnVsbmVyYWJpbGl0aWVzXzI0Lmh0bWwnLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLmFwYWNoZS5vcmcvdGhyZWFkLmh0bWwvcjEwYjg1M2VhODdkZDE1MGIwZTc2ZmRhM2Y4MjU0ZGZkYjIzZGQwNWZhNTU1OTY0MDViNTg0NzhlQCUzQ2N2cy5odHRwZC5hcGFjaGUub3JnJTNFJyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5hcGFjaGUub3JnL3RocmVhZC5odG1sL3IxNzE5Njc1MzA2ZGZiZWFjZWZmM2RjNjNjY2FkM2RlMmQ1NjE1OTE5Y2EzYzEzMjc2OTQ4YjlhY0AlM0NkZXYuaHR0cGQuYXBhY2hlLm9yZyUzRScsXG4gICAgICAgICAgJ2h0dHBzOi8vbGlzdHMuYXBhY2hlLm9yZy90aHJlYWQuaHRtbC9yNTJhNTJmZDYwYTI1OGY1OTk5YThmYTU0MjRiMzBkOWZkNzk1ODg1ZjlmZjQ4MjhkODg5Y2QyMDFAJTNDZGV2Lmh0dHBkLmFwYWNoZS5vcmclM0UnLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLmFwYWNoZS5vcmcvdGhyZWFkLmh0bWwvcjcwYmE2NTJiNzliYTIyNGIyY2JjMGExODMwNzhiM2E0OWRmNzgzYjQxOTkwM2UzZGNmNGQ3OGM3QCUzQ2N2cy5odHRwZC5hcGFjaGUub3JnJTNFJyxcbiAgICAgICAgICAnaHR0cHM6Ly9zZWN1cml0eS5uZXRhcHAuY29tL2Fkdmlzb3J5L250YXAtMjAyMDA0MTMtMDAwMi8nLFxuICAgICAgICAgICdodHRwczovL252ZC5uaXN0Lmdvdi92dWxuL2RldGFpbC9DVkUtMjAyMC0xOTI3JyxcbiAgICAgICAgICAnaHR0cDovL3Blb3BsZS5jYW5vbmljYWwuY29tL351YnVudHUtc2VjdXJpdHkvY3ZlLzIwMjAvQ1ZFLTIwMjAtMTkyNy5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9jdmUubWl0cmUub3JnL2NnaS1iaW4vY3ZlbmFtZS5jZ2k/bmFtZT1DVkUtMjAyMC0xOTI3JyxcbiAgICAgICAgICAnaHR0cHM6Ly9odHRwZC5hcGFjaGUub3JnL3NlY3VyaXR5L3Z1bG5lcmFiaWxpdGllc18yNC5odG1sI0NWRS0yMDIwLTE5MjcnLFxuICAgICAgICBdLFxuICAgICAgICBhc3NpZ25lcjogJ2N2ZUBtaXRyZS5vcmcnLFxuICAgICAgICBjdmVfdmVyc2lvbjogJzQuMCcsXG4gICAgICAgIHN0YXR1czogJ0FjdGl2ZScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBydWxlOiB7XG4gICAgICBsZXZlbDogNyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ1ZFLTIwMjAtMTkyNyBhZmZlY3RzIGFwYWNoZTItdXRpbHMnLFxuICAgICAgaWQ6ICcyMzUwNCcsXG4gICAgICBmaXJlZHRpbWVzOiAxOTMsXG4gICAgfSxcbiAgICBkYXRhOiB7XG4gICAgICB2dWxuZXJhYmlsaXR5OiB7XG4gICAgICAgIHBhY2thZ2U6IHtcbiAgICAgICAgICBuYW1lOiAnYXBhY2hlMi11dGlscycsXG4gICAgICAgICAgc291cmNlOiAnYXBhY2hlMicsXG4gICAgICAgICAgdmVyc2lvbjogJzIuNC4yOS0xdWJ1bnR1NC4xMycsXG4gICAgICAgICAgYXJjaGl0ZWN0dXJlOiAnYW1kNjQnLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ1BhY2thZ2UgdW5maXhlZCcsXG4gICAgICAgIH0sXG4gICAgICAgIGN2c3M6IHtcbiAgICAgICAgICBjdnNzMjoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICduZXR3b3JrJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdtZWRpdW0nLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAnbm9uZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzUuODAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjdmU6ICdDVkUtMjAyMC0xOTI3JyxcbiAgICAgICAgdGl0bGU6ICdDVkUtMjAyMC0xOTI3IG9uIFVidW50dSAxOC4wNCBMVFMgKGJpb25pYykgLSBsb3cuJyxcbiAgICAgICAgcmF0aW9uYWxlOlxuICAgICAgICAgICdJbiBBcGFjaGUgSFRUUCBTZXJ2ZXIgMi40LjAgdG8gMi40LjQxLCByZWRpcmVjdHMgY29uZmlndXJlZCB3aXRoIG1vZF9yZXdyaXRlIHRoYXQgd2VyZSBpbnRlbmRlZCB0byBiZSBzZWxmLXJlZmVyZW50aWFsIG1pZ2h0IGJlIGZvb2xlZCBieSBlbmNvZGVkIG5ld2xpbmVzIGFuZCByZWRpcmVjdCBpbnN0ZWFkIHRvIGFuIGFuIHVuZXhwZWN0ZWQgVVJMIHdpdGhpbiB0aGUgcmVxdWVzdCBVUkwuJyxcbiAgICAgICAgc2V2ZXJpdHk6ICdNZWRpdW0nLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDIwLTA0LTAyJyxcbiAgICAgICAgdXBkYXRlZDogJzIwMjAtMDQtMDMnLFxuICAgICAgICBzdGF0ZTogJ1VuZml4ZWQnLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnQ1dFLTYwMScsXG4gICAgICAgIHJlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cDovL2xpc3RzLm9wZW5zdXNlLm9yZy9vcGVuc3VzZS1zZWN1cml0eS1hbm5vdW5jZS8yMDIwLTA1L21zZzAwMDAyLmh0bWwnLFxuICAgICAgICAgICdodHRwOi8vd3d3Lm9wZW53YWxsLmNvbS9saXN0cy9vc3Mtc2VjdXJpdHkvMjAyMC8wNC8wMy8xJyxcbiAgICAgICAgICAnaHR0cDovL3d3dy5vcGVud2FsbC5jb20vbGlzdHMvb3NzLXNlY3VyaXR5LzIwMjAvMDQvMDQvMScsXG4gICAgICAgICAgJ2h0dHBzOi8vaHR0cGQuYXBhY2hlLm9yZy9zZWN1cml0eS92dWxuZXJhYmlsaXRpZXNfMjQuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vbGlzdHMuYXBhY2hlLm9yZy90aHJlYWQuaHRtbC9yMTBiODUzZWE4N2RkMTUwYjBlNzZmZGEzZjgyNTRkZmRiMjNkZDA1ZmE1NTU5NjQwNWI1ODQ3OGVAJTNDY3ZzLmh0dHBkLmFwYWNoZS5vcmclM0UnLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLmFwYWNoZS5vcmcvdGhyZWFkLmh0bWwvcjE3MTk2NzUzMDZkZmJlYWNlZmYzZGM2M2NjYWQzZGUyZDU2MTU5MTljYTNjMTMyNzY5NDhiOWFjQCUzQ2Rldi5odHRwZC5hcGFjaGUub3JnJTNFJyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5hcGFjaGUub3JnL3RocmVhZC5odG1sL3I1MmE1MmZkNjBhMjU4ZjU5OTlhOGZhNTQyNGIzMGQ5ZmQ3OTU4ODVmOWZmNDgyOGQ4ODljZDIwMUAlM0NkZXYuaHR0cGQuYXBhY2hlLm9yZyUzRScsXG4gICAgICAgICAgJ2h0dHBzOi8vbGlzdHMuYXBhY2hlLm9yZy90aHJlYWQuaHRtbC9yNzBiYTY1MmI3OWJhMjI0YjJjYmMwYTE4MzA3OGIzYTQ5ZGY3ODNiNDE5OTAzZTNkY2Y0ZDc4YzdAJTNDY3ZzLmh0dHBkLmFwYWNoZS5vcmclM0UnLFxuICAgICAgICAgICdodHRwczovL3NlY3VyaXR5Lm5ldGFwcC5jb20vYWR2aXNvcnkvbnRhcC0yMDIwMDQxMy0wMDAyLycsXG4gICAgICAgICAgJ2h0dHBzOi8vbnZkLm5pc3QuZ292L3Z1bG4vZGV0YWlsL0NWRS0yMDIwLTE5MjcnLFxuICAgICAgICAgICdodHRwOi8vcGVvcGxlLmNhbm9uaWNhbC5jb20vfnVidW50dS1zZWN1cml0eS9jdmUvMjAyMC9DVkUtMjAyMC0xOTI3Lmh0bWwnLFxuICAgICAgICAgICdodHRwczovL2N2ZS5taXRyZS5vcmcvY2dpLWJpbi9jdmVuYW1lLmNnaT9uYW1lPUNWRS0yMDIwLTE5MjcnLFxuICAgICAgICAgICdodHRwczovL2h0dHBkLmFwYWNoZS5vcmcvc2VjdXJpdHkvdnVsbmVyYWJpbGl0aWVzXzI0Lmh0bWwjQ1ZFLTIwMjAtMTkyNycsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiA3LFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAxOC0xNTkxOSBhZmZlY3RzIG9wZW5zc2gtY2xpZW50JyxcbiAgICAgIGlkOiAnMjM1MDQnLFxuICAgICAgZmlyZWR0aW1lczogMTk3LFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgdnVsbmVyYWJpbGl0eToge1xuICAgICAgICBwYWNrYWdlOiB7XG4gICAgICAgICAgbmFtZTogJ29wZW5zc2gtY2xpZW50JyxcbiAgICAgICAgICBzb3VyY2U6ICdvcGVuc3NoJyxcbiAgICAgICAgICB2ZXJzaW9uOiAnMTo3LjZwMS00dWJ1bnR1MC4zJyxcbiAgICAgICAgICBhcmNoaXRlY3R1cmU6ICdhbWQ2NCcsXG4gICAgICAgICAgY29uZGl0aW9uOlxuICAgICAgICAgICAgJ1BhY2thZ2UgZ3JlYXRlciBvciBlcXVhbCB0aGFuIDUuOSBhbmQgbGVzcyBvciBlcXVhbCB0aGFuIDcuOCcsXG4gICAgICAgIH0sXG4gICAgICAgIGN2c3M6IHtcbiAgICAgICAgICBjdnNzMjoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICduZXR3b3JrJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdsb3cnLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAnbm9uZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzUnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY3ZzczM6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbmV0d29yaycsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbG93JyxcbiAgICAgICAgICAgICAgcHJpdmlsZWdlc19yZXF1aXJlZDogJ25vbmUnLFxuICAgICAgICAgICAgICB1c2VyX2ludGVyYWN0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIHNjb3BlOiAndW5jaGFuZ2VkJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ2xvdycsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAnbm9uZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzUuMzAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjdmU6ICdDVkUtMjAxOC0xNTkxOScsXG4gICAgICAgIHRpdGxlOiAnQ1ZFLTIwMTgtMTU5MTkgb24gVWJ1bnR1IDE4LjA0IExUUyAoYmlvbmljKSAtIGxvdy4nLFxuICAgICAgICByYXRpb25hbGU6XG4gICAgICAgICAgJ1JlbW90ZWx5IG9ic2VydmFibGUgYmVoYXZpb3VyIGluIGF1dGgtZ3NzMi5jIGluIE9wZW5TU0ggdGhyb3VnaCA3LjggY291bGQgYmUgdXNlZCBieSByZW1vdGUgYXR0YWNrZXJzIHRvIGRldGVjdCBleGlzdGVuY2Ugb2YgdXNlcnMgb24gYSB0YXJnZXQgc3lzdGVtIHdoZW4gR1NTMiBpcyBpbiB1c2UuIE5PVEU6IHRoZSBkaXNjb3ZlcmVyIHN0YXRlcyBcXCdXZSB1bmRlcnN0YW5kIHRoYXQgdGhlIE9wZW5TU0ggZGV2ZWxvcGVycyBkbyBub3Qgd2FudCB0byB0cmVhdCBzdWNoIGEgdXNlcm5hbWUgZW51bWVyYXRpb24gKG9yIFwib3JhY2xlXCIpIGFzIGEgdnVsbmVyYWJpbGl0eS5cXCcnLFxuICAgICAgICBzZXZlcml0eTogJ01lZGl1bScsXG4gICAgICAgIHB1Ymxpc2hlZDogJzIwMTgtMDgtMjgnLFxuICAgICAgICB1cGRhdGVkOiAnMjAxOS0wMy0wNycsXG4gICAgICAgIHN0YXRlOiAnRml4ZWQnLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnQ1dFLTIwMCcsXG4gICAgICAgIGJ1Z3ppbGxhX3JlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cDovL2J1Z3MuZGViaWFuLm9yZy9jZ2ktYmluL2J1Z3JlcG9ydC5jZ2k/YnVnPTkwNzUwMycsXG4gICAgICAgICAgJ2h0dHBzOi8vYnVnemlsbGEubm92ZWxsLmNvbS9zaG93X2J1Zy5jZ2k/aWQ9Q1ZFLTIwMTgtMTU5MTknLFxuICAgICAgICBdLFxuICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHA6Ly9zZWNsaXN0cy5vcmcvb3NzLXNlYy8yMDE4L3EzLzE4MCcsXG4gICAgICAgICAgJ2h0dHA6Ly93d3cuc2VjdXJpdHlmb2N1cy5jb20vYmlkLzEwNTE2MycsXG4gICAgICAgICAgJ2h0dHBzOi8vc2VjdXJpdHkubmV0YXBwLmNvbS9hZHZpc29yeS9udGFwLTIwMTgxMjIxLTAwMDEvJyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMTgtMTU5MTknLFxuICAgICAgICAgICdodHRwOi8vcGVvcGxlLmNhbm9uaWNhbC5jb20vfnVidW50dS1zZWN1cml0eS9jdmUvMjAxOC9DVkUtMjAxOC0xNTkxOS5odG1sJyxcbiAgICAgICAgICAnaHR0cDovL3d3dy5vcGVud2FsbC5jb20vbGlzdHMvb3NzLXNlY3VyaXR5LzIwMTgvMDgvMjcvMicsXG4gICAgICAgICAgJ2h0dHBzOi8vY3ZlLm1pdHJlLm9yZy9jZ2ktYmluL2N2ZW5hbWUuY2dpP25hbWU9Q1ZFLTIwMTgtMTU5MTknLFxuICAgICAgICBdLFxuICAgICAgICBhc3NpZ25lcjogJ2N2ZUBtaXRyZS5vcmcnLFxuICAgICAgICBjdmVfdmVyc2lvbjogJzQuMCcsXG4gICAgICAgIHN0YXR1czogJ0FjdGl2ZScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBydWxlOiB7XG4gICAgICBsZXZlbDogNyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ1ZFLTIwMTgtMTU5MTkgYWZmZWN0cyBvcGVuc3NoLXNlcnZlcicsXG4gICAgICBpZDogJzIzNTA0JyxcbiAgICAgIGZpcmVkdGltZXM6IDE5OCxcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdvcGVuc3NoLXNlcnZlcicsXG4gICAgICAgICAgc291cmNlOiAnb3BlbnNzaCcsXG4gICAgICAgICAgdmVyc2lvbjogJzE6Ny42cDEtNHVidW50dTAuMycsXG4gICAgICAgICAgYXJjaGl0ZWN0dXJlOiAnYW1kNjQnLFxuICAgICAgICAgIGNvbmRpdGlvbjpcbiAgICAgICAgICAgICdQYWNrYWdlIGdyZWF0ZXIgb3IgZXF1YWwgdGhhbiA1LjkgYW5kIGxlc3Mgb3IgZXF1YWwgdGhhbiA3LjgnLFxuICAgICAgICB9LFxuICAgICAgICBjdnNzOiB7XG4gICAgICAgICAgY3ZzczI6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbmV0d29yaycsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbG93JyxcbiAgICAgICAgICAgICAgYXV0aGVudGljYXRpb246ICdub25lJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAnbm9uZScsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ25vbmUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc1JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN2c3MzOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ25ldHdvcmsnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIHByaXZpbGVnZXNfcmVxdWlyZWQ6ICdub25lJyxcbiAgICAgICAgICAgICAgdXNlcl9pbnRlcmFjdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBzY29wZTogJ3VuY2hhbmdlZCcsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdsb3cnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAnbm9uZScsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ25vbmUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc1LjMwMDAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY3ZlOiAnQ1ZFLTIwMTgtMTU5MTknLFxuICAgICAgICB0aXRsZTogJ0NWRS0yMDE4LTE1OTE5IG9uIFVidW50dSAxOC4wNCBMVFMgKGJpb25pYykgLSBsb3cuJyxcbiAgICAgICAgcmF0aW9uYWxlOlxuICAgICAgICAgICdSZW1vdGVseSBvYnNlcnZhYmxlIGJlaGF2aW91ciBpbiBhdXRoLWdzczIuYyBpbiBPcGVuU1NIIHRocm91Z2ggNy44IGNvdWxkIGJlIHVzZWQgYnkgcmVtb3RlIGF0dGFja2VycyB0byBkZXRlY3QgZXhpc3RlbmNlIG9mIHVzZXJzIG9uIGEgdGFyZ2V0IHN5c3RlbSB3aGVuIEdTUzIgaXMgaW4gdXNlLiBOT1RFOiB0aGUgZGlzY292ZXJlciBzdGF0ZXMgXFwnV2UgdW5kZXJzdGFuZCB0aGF0IHRoZSBPcGVuU1NIIGRldmVsb3BlcnMgZG8gbm90IHdhbnQgdG8gdHJlYXQgc3VjaCBhIHVzZXJuYW1lIGVudW1lcmF0aW9uIChvciBcIm9yYWNsZVwiKSBhcyBhIHZ1bG5lcmFiaWxpdHkuXFwnJyxcbiAgICAgICAgc2V2ZXJpdHk6ICdNZWRpdW0nLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDE4LTA4LTI4JyxcbiAgICAgICAgdXBkYXRlZDogJzIwMTktMDMtMDcnLFxuICAgICAgICBzdGF0ZTogJ0ZpeGVkJyxcbiAgICAgICAgY3dlX3JlZmVyZW5jZTogJ0NXRS0yMDAnLFxuICAgICAgICBidWd6aWxsYV9yZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHA6Ly9idWdzLmRlYmlhbi5vcmcvY2dpLWJpbi9idWdyZXBvcnQuY2dpP2J1Zz05MDc1MDMnLFxuICAgICAgICAgICdodHRwczovL2J1Z3ppbGxhLm5vdmVsbC5jb20vc2hvd19idWcuY2dpP2lkPUNWRS0yMDE4LTE1OTE5JyxcbiAgICAgICAgXSxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vc2VjbGlzdHMub3JnL29zcy1zZWMvMjAxOC9xMy8xODAnLFxuICAgICAgICAgICdodHRwOi8vd3d3LnNlY3VyaXR5Zm9jdXMuY29tL2JpZC8xMDUxNjMnLFxuICAgICAgICAgICdodHRwczovL3NlY3VyaXR5Lm5ldGFwcC5jb20vYWR2aXNvcnkvbnRhcC0yMDE4MTIyMS0wMDAxLycsXG4gICAgICAgICAgJ2h0dHBzOi8vbnZkLm5pc3QuZ292L3Z1bG4vZGV0YWlsL0NWRS0yMDE4LTE1OTE5JyxcbiAgICAgICAgICAnaHR0cDovL3Blb3BsZS5jYW5vbmljYWwuY29tL351YnVudHUtc2VjdXJpdHkvY3ZlLzIwMTgvQ1ZFLTIwMTgtMTU5MTkuaHRtbCcsXG4gICAgICAgICAgJ2h0dHA6Ly93d3cub3BlbndhbGwuY29tL2xpc3RzL29zcy1zZWN1cml0eS8yMDE4LzA4LzI3LzInLFxuICAgICAgICAgICdodHRwczovL2N2ZS5taXRyZS5vcmcvY2dpLWJpbi9jdmVuYW1lLmNnaT9uYW1lPUNWRS0yMDE4LTE1OTE5JyxcbiAgICAgICAgXSxcbiAgICAgICAgYXNzaWduZXI6ICdjdmVAbWl0cmUub3JnJyxcbiAgICAgICAgY3ZlX3ZlcnNpb246ICc0LjAnLFxuICAgICAgICBzdGF0dXM6ICdBY3RpdmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDcsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NWRS0yMDE5LTE3NTk1IGFmZmVjdHMgbmN1cnNlcy1iYXNlJyxcbiAgICAgIGlkOiAnMjM1MDQnLFxuICAgICAgZmlyZWR0aW1lczogMjIyLFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgdnVsbmVyYWJpbGl0eToge1xuICAgICAgICBwYWNrYWdlOiB7XG4gICAgICAgICAgbmFtZTogJ25jdXJzZXMtYmFzZScsXG4gICAgICAgICAgc291cmNlOiAnbmN1cnNlcycsXG4gICAgICAgICAgdmVyc2lvbjogJzYuMS0xdWJ1bnR1MS4xOC4wNCcsXG4gICAgICAgICAgYXJjaGl0ZWN0dXJlOiAnYWxsJyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIGxlc3MgdGhhbiA2LjEuMjAxOTEwMTInLFxuICAgICAgICB9LFxuICAgICAgICBjdnNzOiB7XG4gICAgICAgICAgY3ZzczI6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbmV0d29yaycsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbWVkaXVtJyxcbiAgICAgICAgICAgICAgYXV0aGVudGljYXRpb246ICdub25lJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAnbm9uZScsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc1LjgwMDAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY3ZlOiAnQ1ZFLTIwMTktMTc1OTUnLFxuICAgICAgICB0aXRsZTogJ0NWRS0yMDE5LTE3NTk1IG9uIFVidW50dSAxOC4wNCBMVFMgKGJpb25pYykgLSBuZWdsaWdpYmxlLicsXG4gICAgICAgIHJhdGlvbmFsZTpcbiAgICAgICAgICAnVGhlcmUgaXMgYSBoZWFwLWJhc2VkIGJ1ZmZlciBvdmVyLXJlYWQgaW4gdGhlIGZtdF9lbnRyeSBmdW5jdGlvbiBpbiB0aW5mby9jb21wX2hhc2guYyBpbiB0aGUgdGVybWluZm8gbGlicmFyeSBpbiBuY3Vyc2VzIGJlZm9yZSA2LjEtMjAxOTEwMTIuJyxcbiAgICAgICAgc2V2ZXJpdHk6ICdNZWRpdW0nLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDE5LTEwLTE0JyxcbiAgICAgICAgdXBkYXRlZDogJzIwMTktMTItMjMnLFxuICAgICAgICBzdGF0ZTogJ0ZpeGVkJyxcbiAgICAgICAgY3dlX3JlZmVyZW5jZTogJ0NXRS0xMjUnLFxuICAgICAgICBidWd6aWxsYV9yZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHBzOi8vYnVncy5kZWJpYW4ub3JnL2NnaS1iaW4vYnVncmVwb3J0LmNnaT9idWc9OTQyNDAxJyxcbiAgICAgICAgXSxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vbGlzdHMub3BlbnN1c2Uub3JnL29wZW5zdXNlLXNlY3VyaXR5LWFubm91bmNlLzIwMTktMTEvbXNnMDAwNTkuaHRtbCcsXG4gICAgICAgICAgJ2h0dHA6Ly9saXN0cy5vcGVuc3VzZS5vcmcvb3BlbnN1c2Utc2VjdXJpdHktYW5ub3VuY2UvMjAxOS0xMS9tc2cwMDA2MS5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5nbnUub3JnL2FyY2hpdmUvaHRtbC9idWctbmN1cnNlcy8yMDE5LTEwL21zZzAwMDEzLmh0bWwnLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLmdudS5vcmcvYXJjaGl2ZS9odG1sL2J1Zy1uY3Vyc2VzLzIwMTktMTAvbXNnMDAwNDUuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vbnZkLm5pc3QuZ292L3Z1bG4vZGV0YWlsL0NWRS0yMDE5LTE3NTk1JyxcbiAgICAgICAgICAnaHR0cDovL3Blb3BsZS5jYW5vbmljYWwuY29tL351YnVudHUtc2VjdXJpdHkvY3ZlLzIwMTkvQ1ZFLTIwMTktMTc1OTUuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vY3ZlLm1pdHJlLm9yZy9jZ2ktYmluL2N2ZW5hbWUuY2dpP25hbWU9Q1ZFLTIwMTktMTc1OTUnLFxuICAgICAgICBdLFxuICAgICAgICBhc3NpZ25lcjogJ2N2ZUBtaXRyZS5vcmcnLFxuICAgICAgICBjdmVfdmVyc2lvbjogJzQuMCcsXG4gICAgICAgIHN0YXR1czogJ0FjdGl2ZScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBydWxlOiB7XG4gICAgICBsZXZlbDogNyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ1ZFLTIwMTktMTc1NDMgYWZmZWN0cyBsaWJsejQtMScsXG4gICAgICBpZDogJzIzNTA0JyxcbiAgICAgIGZpcmVkdGltZXM6IDI0NCxcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdsaWJsejQtMScsXG4gICAgICAgICAgc291cmNlOiAnbHo0JyxcbiAgICAgICAgICB2ZXJzaW9uOiAnMC4wfnIxMzEtMnVidW50dTInLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIGxlc3MgdGhhbiAxLjkuMicsXG4gICAgICAgIH0sXG4gICAgICAgIGN2c3M6IHtcbiAgICAgICAgICBjdnNzMjoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICduZXR3b3JrJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdtZWRpdW0nLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAncGFydGlhbCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzYuODAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjdmU6ICdDVkUtMjAxOS0xNzU0MycsXG4gICAgICAgIHRpdGxlOiAnQ1ZFLTIwMTktMTc1NDMgb24gVWJ1bnR1IDE2LjA0IExUUyAoeGVuaWFsKSAtIGxvdy4nLFxuICAgICAgICByYXRpb25hbGU6XG4gICAgICAgICAgJ0xaNCBiZWZvcmUgMS45LjIgaGFzIGEgaGVhcC1iYXNlZCBidWZmZXIgb3ZlcmZsb3cgaW4gTFo0X3dyaXRlMzIgKHJlbGF0ZWQgdG8gTFo0X2NvbXByZXNzX2Rlc3RTaXplKSwgYWZmZWN0aW5nIGFwcGxpY2F0aW9ucyB0aGF0IGNhbGwgTFo0X2NvbXByZXNzX2Zhc3Qgd2l0aCBhIGxhcmdlIGlucHV0LiAoVGhpcyBpc3N1ZSBjYW4gYWxzbyBsZWFkIHRvIGRhdGEgY29ycnVwdGlvbi4pIE5PVEU6IHRoZSB2ZW5kb3Igc3RhdGVzIFwib25seSBhIGZldyBzcGVjaWZpYyAvIHVuY29tbW9uIHVzYWdlcyBvZiB0aGUgQVBJIGFyZSBhdCByaXNrLlwiJyxcbiAgICAgICAgc2V2ZXJpdHk6ICdNZWRpdW0nLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDE5LTEwLTE0JyxcbiAgICAgICAgdXBkYXRlZDogJzIwMTktMTAtMjQnLFxuICAgICAgICBzdGF0ZTogJ0ZpeGVkJyxcbiAgICAgICAgY3dlX3JlZmVyZW5jZTogJ0NXRS0xMjAnLFxuICAgICAgICBidWd6aWxsYV9yZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC9vc3MtZnV6ei9pc3N1ZXMvZGV0YWlsP2lkPTE1OTQxJyxcbiAgICAgICAgICAnaHR0cHM6Ly9idWdzLmRlYmlhbi5vcmcvY2dpLWJpbi9idWdyZXBvcnQuY2dpP2J1Zz05NDM2ODAnLFxuICAgICAgICBdLFxuICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHA6Ly9saXN0cy5vcGVuc3VzZS5vcmcvb3BlbnN1c2Utc2VjdXJpdHktYW5ub3VuY2UvMjAxOS0xMC9tc2cwMDA2OS5odG1sJyxcbiAgICAgICAgICAnaHR0cDovL2xpc3RzLm9wZW5zdXNlLm9yZy9vcGVuc3VzZS1zZWN1cml0eS1hbm5vdW5jZS8yMDE5LTEwL21zZzAwMDcwLmh0bWwnLFxuICAgICAgICAgICdodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3Avb3NzLWZ1enovaXNzdWVzL2RldGFpbD9pZD0xNTk0MScsXG4gICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9sejQvbHo0L2NvbXBhcmUvdjEuOS4xLi4udjEuOS4yJyxcbiAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL2x6NC9sejQvaXNzdWVzLzgwMScsXG4gICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9sejQvbHo0L3B1bGwvNzU2JyxcbiAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL2x6NC9sejQvcHVsbC83NjAnLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLmFwYWNoZS5vcmcvdGhyZWFkLmh0bWwvMjUwMTU1ODhiNzcwZDY3NDcwYjdiYTdlYTQ5YTMwNWQ2NzM1ZGQ3ZjAwZWFiZTdkNTBlYzFlMTdAJTNDaXNzdWVzLmFycm93LmFwYWNoZS5vcmclM0UnLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLmFwYWNoZS5vcmcvdGhyZWFkLmh0bWwvNTQzMzAyZDU1ZTJkMmRhNDMxMTk5NGU5YjBkZWJkYzY3NmJmM2ZkMDVlMWEyYmUzNDA3YWEyZDZAJTNDaXNzdWVzLmFycm93LmFwYWNoZS5vcmclM0UnLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLmFwYWNoZS5vcmcvdGhyZWFkLmh0bWwvNzkzMDEyNjgzZGMwZmE2ODE5YjdjMjU2MGU2Y2Y5OTA4MTEwMTRjNDBjN2Q3NTQxMjA5OWMzNTdAJTNDaXNzdWVzLmFycm93LmFwYWNoZS5vcmclM0UnLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLmFwYWNoZS5vcmcvdGhyZWFkLmh0bWwvOWZmMDYwNmQxNmJlMmFiNmE4MTYxOWUxYzllMjNjM2UyNTE3NTY2MzhlMzYyNzJjOGM4YjdmYTNAJTNDaXNzdWVzLmFycm93LmFwYWNoZS5vcmclM0UnLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLmFwYWNoZS5vcmcvdGhyZWFkLmh0bWwvZjAwMzhjNGZhYjJlZTI1YWVlODQ5ZWJlZmY2YjMzYjNhYTg5ZTA3Y2NmYjA2YjVjODdiMzYzMTZAJTNDaXNzdWVzLmFycm93LmFwYWNoZS5vcmclM0UnLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLmFwYWNoZS5vcmcvdGhyZWFkLmh0bWwvZjUwNmJjMzcxZDRhMDY4ZDVkODRkNzM2MTI5MzU2OGY2MTE2N2QzYTFjM2U5MWYwZGVmMmQ3ZDNAJTNDZGV2LmFycm93LmFwYWNoZS5vcmclM0UnLFxuICAgICAgICAgICdodHRwczovL252ZC5uaXN0Lmdvdi92dWxuL2RldGFpbC9DVkUtMjAxOS0xNzU0MycsXG4gICAgICAgICAgJ2h0dHA6Ly9wZW9wbGUuY2Fub25pY2FsLmNvbS9+dWJ1bnR1LXNlY3VyaXR5L2N2ZS8yMDE5L0NWRS0yMDE5LTE3NTQzLmh0bWwnLFxuICAgICAgICAgICdodHRwczovL2N2ZS5taXRyZS5vcmcvY2dpLWJpbi9jdmVuYW1lLmNnaT9uYW1lPUNWRS0yMDE5LTE3NTQzJyxcbiAgICAgICAgXSxcbiAgICAgICAgYXNzaWduZXI6ICdjdmVAbWl0cmUub3JnJyxcbiAgICAgICAgY3ZlX3ZlcnNpb246ICc0LjAnLFxuICAgICAgICBzdGF0dXM6ICdBY3RpdmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDcsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NWRS0yMDE4LTIwMjE3IGFmZmVjdHMgbGlia3JiNS0zJyxcbiAgICAgIGlkOiAnMjM1MDQnLFxuICAgICAgZmlyZWR0aW1lczogMjU0LFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgdnVsbmVyYWJpbGl0eToge1xuICAgICAgICBwYWNrYWdlOiB7XG4gICAgICAgICAgbmFtZTogJ2xpYmtyYjUtMycsXG4gICAgICAgICAgc291cmNlOiAna3JiNScsXG4gICAgICAgICAgdmVyc2lvbjogJzEuMTMuMitkZnNnLTV1YnVudHUyLjEnLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIHVuZml4ZWQnLFxuICAgICAgICB9LFxuICAgICAgICBjdnNzOiB7XG4gICAgICAgICAgY3ZzczI6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbmV0d29yaycsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbWVkaXVtJyxcbiAgICAgICAgICAgICAgYXV0aGVudGljYXRpb246ICdzaW5nbGUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAnbm9uZScsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAncGFydGlhbCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzMuNTAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN2c3MzOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ25ldHdvcmsnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2hpZ2gnLFxuICAgICAgICAgICAgICBwcml2aWxlZ2VzX3JlcXVpcmVkOiAnbG93JyxcbiAgICAgICAgICAgICAgdXNlcl9pbnRlcmFjdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBzY29wZTogJ3VuY2hhbmdlZCcsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ25vbmUnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdoaWdoJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNS4zMDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDE4LTIwMjE3JyxcbiAgICAgICAgdGl0bGU6ICdDVkUtMjAxOC0yMDIxNyBvbiBVYnVudHUgMTYuMDQgTFRTICh4ZW5pYWwpIC0gbWVkaXVtLicsXG4gICAgICAgIHJhdGlvbmFsZTpcbiAgICAgICAgICAnQSBSZWFjaGFibGUgQXNzZXJ0aW9uIGlzc3VlIHdhcyBkaXNjb3ZlcmVkIGluIHRoZSBLREMgaW4gTUlUIEtlcmJlcm9zIDUgKGFrYSBrcmI1KSBiZWZvcmUgMS4xNy4gSWYgYW4gYXR0YWNrZXIgY2FuIG9idGFpbiBhIGtyYnRndCB0aWNrZXQgdXNpbmcgYW4gb2xkZXIgZW5jcnlwdGlvbiB0eXBlIChzaW5nbGUtREVTLCB0cmlwbGUtREVTLCBvciBSQzQpLCB0aGUgYXR0YWNrZXIgY2FuIGNyYXNoIHRoZSBLREMgYnkgbWFraW5nIGFuIFM0VTJTZWxmIHJlcXVlc3QuJyxcbiAgICAgICAgc2V2ZXJpdHk6ICdNZWRpdW0nLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDE4LTEyLTI2JyxcbiAgICAgICAgdXBkYXRlZDogJzIwMTktMTAtMDMnLFxuICAgICAgICBzdGF0ZTogJ1VuZml4ZWQnLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnQ1dFLTYxNycsXG4gICAgICAgIGJ1Z3ppbGxhX3JlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cDovL2J1Z3MuZGViaWFuLm9yZy9jZ2ktYmluL2J1Z3JlcG9ydC5jZ2k/YnVnPTkxNzM4NycsXG4gICAgICAgICAgJ2h0dHA6Ly9rcmJkZXYubWl0LmVkdS9ydC9UaWNrZXQvRGlzcGxheS5odG1sP2lkPTg3NjMnLFxuICAgICAgICBdLFxuICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHA6Ly9rcmJkZXYubWl0LmVkdS9ydC9UaWNrZXQvRGlzcGxheS5odG1sP2lkPTg3NjMnLFxuICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20va3JiNS9rcmI1L2NvbW1pdC81ZTZkMTc5NjEwNmRmOGJhNmJjMTk3M2VlMDkxN2MxNzBkOTI5MDg2JyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5kZWJpYW4ub3JnL2RlYmlhbi1sdHMtYW5ub3VuY2UvMjAxOS8wMS9tc2cwMDAyMC5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5mZWRvcmFwcm9qZWN0Lm9yZy9hcmNoaXZlcy9saXN0L3BhY2thZ2UtYW5ub3VuY2VAbGlzdHMuZmVkb3JhcHJvamVjdC5vcmcvbWVzc2FnZS8yS05IRUxINFlITlQ2SDJFU0pXWDJVSURYTEJOR0IyTy8nLFxuICAgICAgICAgICdodHRwczovL3NlY3VyaXR5Lm5ldGFwcC5jb20vYWR2aXNvcnkvbnRhcC0yMDE5MDQxNi0wMDA2LycsXG4gICAgICAgICAgJ2h0dHBzOi8vbnZkLm5pc3QuZ292L3Z1bG4vZGV0YWlsL0NWRS0yMDE4LTIwMjE3JyxcbiAgICAgICAgICAnaHR0cDovL3Blb3BsZS5jYW5vbmljYWwuY29tL351YnVudHUtc2VjdXJpdHkvY3ZlLzIwMTgvQ1ZFLTIwMTgtMjAyMTcuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vY3ZlLm1pdHJlLm9yZy9jZ2ktYmluL2N2ZW5hbWUuY2dpP25hbWU9Q1ZFLTIwMTgtMjAyMTcnLFxuICAgICAgICBdLFxuICAgICAgICBhc3NpZ25lcjogJ2N2ZUBtaXRyZS5vcmcnLFxuICAgICAgICBjdmVfdmVyc2lvbjogJzQuMCcsXG4gICAgICAgIHN0YXR1czogJ0FjdGl2ZScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBydWxlOiB7XG4gICAgICBsZXZlbDogNyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ1ZFLTIwMTgtMTQwMzYgYWZmZWN0cyBhY2NvdW50c3NlcnZpY2UnLFxuICAgICAgaWQ6ICcyMzUwNCcsXG4gICAgICBmaXJlZHRpbWVzOiAyNTYsXG4gICAgfSxcbiAgICBkYXRhOiB7XG4gICAgICB2dWxuZXJhYmlsaXR5OiB7XG4gICAgICAgIHBhY2thZ2U6IHtcbiAgICAgICAgICBuYW1lOiAnYWNjb3VudHNzZXJ2aWNlJyxcbiAgICAgICAgICB2ZXJzaW9uOiAnMC42LjQwLTJ1YnVudHUxMS4zJyxcbiAgICAgICAgICBhcmNoaXRlY3R1cmU6ICdhbWQ2NCcsXG4gICAgICAgICAgY29uZGl0aW9uOiAnUGFja2FnZSBsZXNzIHRoYW4gMC42LjUwJyxcbiAgICAgICAgfSxcbiAgICAgICAgY3Zzczoge1xuICAgICAgICAgIGN2c3MyOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ25ldHdvcmsnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiAnc2luZ2xlJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAnbm9uZScsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ25vbmUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc0JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN2c3MzOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ25ldHdvcmsnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIHByaXZpbGVnZXNfcmVxdWlyZWQ6ICdsb3cnLFxuICAgICAgICAgICAgICB1c2VyX2ludGVyYWN0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIHNjb3BlOiAndW5jaGFuZ2VkJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ2hpZ2gnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAnbm9uZScsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ25vbmUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc2LjUwMDAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY3ZlOiAnQ1ZFLTIwMTgtMTQwMzYnLFxuICAgICAgICB0aXRsZTogJ0NWRS0yMDE4LTE0MDM2IG9uIFVidW50dSAxNi4wNCBMVFMgKHhlbmlhbCkgLSBsb3cuJyxcbiAgICAgICAgcmF0aW9uYWxlOlxuICAgICAgICAgICdEaXJlY3RvcnkgVHJhdmVyc2FsIHdpdGggLi4vIHNlcXVlbmNlcyBvY2N1cnMgaW4gQWNjb3VudHNTZXJ2aWNlIGJlZm9yZSAwLjYuNTAgYmVjYXVzZSBvZiBhbiBpbnN1ZmZpY2llbnQgcGF0aCBjaGVjayBpbiB1c2VyX2NoYW5nZV9pY29uX2ZpbGVfYXV0aG9yaXplZF9jYigpIGluIHVzZXIuYy4nLFxuICAgICAgICBzZXZlcml0eTogJ01lZGl1bScsXG4gICAgICAgIHB1Ymxpc2hlZDogJzIwMTgtMDctMTMnLFxuICAgICAgICB1cGRhdGVkOiAnMjAxOC0wOS0wNicsXG4gICAgICAgIHN0YXRlOiAnRml4ZWQnLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnQ1dFLTIyJyxcbiAgICAgICAgYnVnemlsbGFfcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwczovL2J1Z3MuZnJlZWRlc2t0b3Aub3JnL3Nob3dfYnVnLmNnaT9pZD0xMDcwODUnLFxuICAgICAgICAgICdodHRwczovL2J1Z3ppbGxhLnN1c2UuY29tL3Nob3dfYnVnLmNnaT9pZD0xMDk5Njk5JyxcbiAgICAgICAgXSxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vd3d3Lm9wZW53YWxsLmNvbS9saXN0cy9vc3Mtc2VjdXJpdHkvMjAxOC8wNy8wMi8yJyxcbiAgICAgICAgICAnaHR0cDovL3d3dy5zZWN1cml0eWZvY3VzLmNvbS9iaWQvMTA0NzU3JyxcbiAgICAgICAgICAnaHR0cHM6Ly9idWdzLmZyZWVkZXNrdG9wLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTA3MDg1JyxcbiAgICAgICAgICAnaHR0cHM6Ly9idWd6aWxsYS5zdXNlLmNvbS9zaG93X2J1Zy5jZ2k/aWQ9MTA5OTY5OScsXG4gICAgICAgICAgJ2h0dHBzOi8vY2dpdC5mcmVlZGVza3RvcC5vcmcvYWNjb3VudHNzZXJ2aWNlL2NvbW1pdC8/aWQ9ZjlhYmQzNTlmNzFhNWJjZTQyMWI5YWUyMzQzMmY1MzlhMDY3ODQ3YScsXG4gICAgICAgICAgJ2h0dHBzOi8vbnZkLm5pc3QuZ292L3Z1bG4vZGV0YWlsL0NWRS0yMDE4LTE0MDM2JyxcbiAgICAgICAgICAnaHR0cDovL3Blb3BsZS5jYW5vbmljYWwuY29tL351YnVudHUtc2VjdXJpdHkvY3ZlLzIwMTgvQ1ZFLTIwMTgtMTQwMzYuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vY3ZlLm1pdHJlLm9yZy9jZ2ktYmluL2N2ZW5hbWUuY2dpP25hbWU9Q1ZFLTIwMTgtMTQwMzYnLFxuICAgICAgICBdLFxuICAgICAgICBhc3NpZ25lcjogJ2N2ZUBtaXRyZS5vcmcnLFxuICAgICAgICBjdmVfdmVyc2lvbjogJzQuMCcsXG4gICAgICAgIHN0YXR1czogJ0FjdGl2ZScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBydWxlOiB7XG4gICAgICBsZXZlbDogNyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ1ZFLTIwMTctNzI0NCBhZmZlY3RzIGxpYnBjcmUzJyxcbiAgICAgIGlkOiAnMjM1MDQnLFxuICAgICAgZmlyZWR0aW1lczogMjY1LFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgdnVsbmVyYWJpbGl0eToge1xuICAgICAgICBwYWNrYWdlOiB7XG4gICAgICAgICAgbmFtZTogJ2xpYnBjcmUzJyxcbiAgICAgICAgICBzb3VyY2U6ICdwY3JlMycsXG4gICAgICAgICAgdmVyc2lvbjogJzI6OC4zOC0zLjEnLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIHVuZml4ZWQnLFxuICAgICAgICB9LFxuICAgICAgICBjdnNzOiB7XG4gICAgICAgICAgY3ZzczI6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbmV0d29yaycsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbWVkaXVtJyxcbiAgICAgICAgICAgICAgYXV0aGVudGljYXRpb246ICdub25lJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ25vbmUnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAnbm9uZScsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc0LjMwMDAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjdnNzMzoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICdsb2NhbCcsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbG93JyxcbiAgICAgICAgICAgICAgcHJpdmlsZWdlc19yZXF1aXJlZDogJ25vbmUnLFxuICAgICAgICAgICAgICB1c2VyX2ludGVyYWN0aW9uOiAncmVxdWlyZWQnLFxuICAgICAgICAgICAgICBzY29wZTogJ3VuY2hhbmdlZCcsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ25vbmUnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdoaWdoJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNS41MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDE3LTcyNDQnLFxuICAgICAgICB0aXRsZTogJ0NWRS0yMDE3LTcyNDQgb24gVWJ1bnR1IDE2LjA0IExUUyAoeGVuaWFsKSAtIGxvdy4nLFxuICAgICAgICByYXRpb25hbGU6XG4gICAgICAgICAgJ1RoZSBfcGNyZTMyX3hjbGFzcyBmdW5jdGlvbiBpbiBwY3JlX3hjbGFzcy5jIGluIGxpYnBjcmUxIGluIFBDUkUgOC40MCBhbGxvd3MgcmVtb3RlIGF0dGFja2VycyB0byBjYXVzZSBhIGRlbmlhbCBvZiBzZXJ2aWNlIChpbnZhbGlkIG1lbW9yeSByZWFkKSB2aWEgYSBjcmFmdGVkIGZpbGUuJyxcbiAgICAgICAgc2V2ZXJpdHk6ICdNZWRpdW0nLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDE3LTAzLTIzJyxcbiAgICAgICAgdXBkYXRlZDogJzIwMTgtMDgtMTcnLFxuICAgICAgICBzdGF0ZTogJ1VuZml4ZWQnLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnQ1dFLTEyNScsXG4gICAgICAgIGJ1Z3ppbGxhX3JlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cHM6Ly9idWdzLmRlYmlhbi5vcmcvY2dpLWJpbi9idWdyZXBvcnQuY2dpP2J1Zz04NTg2ODMnLFxuICAgICAgICAgICdodHRwczovL2J1Z3MuZXhpbS5vcmcvc2hvd19idWcuY2dpP2lkPTIwNTInLFxuICAgICAgICAgICdodHRwczovL2J1Z3MuZXhpbS5vcmcvc2hvd19idWcuY2dpP2lkPTIwNTQnLFxuICAgICAgICBdLFxuICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHA6Ly93d3cuc2VjdXJpdHlmb2N1cy5jb20vYmlkLzk3MDY3JyxcbiAgICAgICAgICAnaHR0cHM6Ly9hY2Nlc3MucmVkaGF0LmNvbS9lcnJhdGEvUkhTQS0yMDE4OjI0ODYnLFxuICAgICAgICAgICdodHRwczovL2Jsb2dzLmdlbnRvby5vcmcvYWdvLzIwMTcvMDMvMjAvbGlicGNyZS1pbnZhbGlkLW1lbW9yeS1yZWFkLWluLV9wY3JlMzJfeGNsYXNzLXBjcmVfeGNsYXNzLWMvJyxcbiAgICAgICAgICAnaHR0cHM6Ly9zZWN1cml0eS5nZW50b28ub3JnL2dsc2EvMjAxNzEwLTI1JyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMTctNzI0NCcsXG4gICAgICAgICAgJ2h0dHA6Ly9wZW9wbGUuY2Fub25pY2FsLmNvbS9+dWJ1bnR1LXNlY3VyaXR5L2N2ZS8yMDE3L0NWRS0yMDE3LTcyNDQuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vY3ZlLm1pdHJlLm9yZy9jZ2ktYmluL2N2ZW5hbWUuY2dpP25hbWU9Q1ZFLTIwMTctNzI0NCcsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiA1LFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAyMC04NjMxIGFmZmVjdHMgZ3J1Yi1sZWdhY3ktZWMyJyxcbiAgICAgIGlkOiAnMjM1MDMnLFxuICAgICAgZmlyZWR0aW1lczogMzIsXG4gICAgfSxcbiAgICBkYXRhOiB7XG4gICAgICB2dWxuZXJhYmlsaXR5OiB7XG4gICAgICAgIHBhY2thZ2U6IHtcbiAgICAgICAgICBuYW1lOiAnZ3J1Yi1sZWdhY3ktZWMyJyxcbiAgICAgICAgICBzb3VyY2U6ICdjbG91ZC1pbml0JyxcbiAgICAgICAgICB2ZXJzaW9uOiAnMTkuNC0zMy1nYmI0MTMxYTItMHVidW50dTF+MTYuMDQuMScsXG4gICAgICAgICAgYXJjaGl0ZWN0dXJlOiAnYWxsJyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIGxlc3Mgb3IgZXF1YWwgdGhhbiAxOS40JyxcbiAgICAgICAgfSxcbiAgICAgICAgY3Zzczoge1xuICAgICAgICAgIGN2c3MyOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ2xvY2FsJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdsb3cnLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAnbm9uZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzIuMTAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjdmU6ICdDVkUtMjAyMC04NjMxJyxcbiAgICAgICAgdGl0bGU6ICdDVkUtMjAyMC04NjMxIG9uIFVidW50dSAxNi4wNCBMVFMgKHhlbmlhbCkgLSBsb3cuJyxcbiAgICAgICAgcmF0aW9uYWxlOlxuICAgICAgICAgICdjbG91ZC1pbml0IHRocm91Z2ggMTkuNCByZWxpZXMgb24gTWVyc2VubmUgVHdpc3RlciBmb3IgYSByYW5kb20gcGFzc3dvcmQsIHdoaWNoIG1ha2VzIGl0IGVhc2llciBmb3IgYXR0YWNrZXJzIHRvIHByZWRpY3QgcGFzc3dvcmRzLCBiZWNhdXNlIHJhbmRfc3RyIGluIGNsb3VkaW5pdC91dGlsLnB5IGNhbGxzIHRoZSByYW5kb20uY2hvaWNlIGZ1bmN0aW9uLicsXG4gICAgICAgIHNldmVyaXR5OiAnTG93JyxcbiAgICAgICAgcHVibGlzaGVkOiAnMjAyMC0wMi0wNScsXG4gICAgICAgIHVwZGF0ZWQ6ICcyMDIwLTAyLTIxJyxcbiAgICAgICAgc3RhdGU6ICdGaXhlZCcsXG4gICAgICAgIGN3ZV9yZWZlcmVuY2U6ICdDV0UtMzMwJyxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vbGlzdHMub3BlbnN1c2Uub3JnL29wZW5zdXNlLXNlY3VyaXR5LWFubm91bmNlLzIwMjAtMDMvbXNnMDAwNDIuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vYnVncy5sYXVuY2hwYWQubmV0L3VidW50dS8rc291cmNlL2Nsb3VkLWluaXQvK2J1Zy8xODYwNzk1JyxcbiAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL2Nhbm9uaWNhbC9jbG91ZC1pbml0L3B1bGwvMjA0JyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5kZWJpYW4ub3JnL2RlYmlhbi1sdHMtYW5ub3VuY2UvMjAyMC8wMi9tc2cwMDAyMS5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMjAtODYzMScsXG4gICAgICAgICAgJ2h0dHA6Ly9wZW9wbGUuY2Fub25pY2FsLmNvbS9+dWJ1bnR1LXNlY3VyaXR5L2N2ZS8yMDIwL0NWRS0yMDIwLTg2MzEuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vY3ZlLm1pdHJlLm9yZy9jZ2ktYmluL2N2ZW5hbWUuY2dpP25hbWU9Q1ZFLTIwMjAtODYzMScsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiAxMCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ1ZFLTIwMTktMjAwNzkgYWZmZWN0cyB2aW0nLFxuICAgICAgaWQ6ICcyMzUwNScsXG4gICAgICBmaXJlZHRpbWVzOiAxMDksXG4gICAgfSxcbiAgICBkYXRhOiB7XG4gICAgICB2dWxuZXJhYmlsaXR5OiB7XG4gICAgICAgIHBhY2thZ2U6IHtcbiAgICAgICAgICBuYW1lOiAndmltJyxcbiAgICAgICAgICB2ZXJzaW9uOiAnMjo3LjQuMTY4OS0zdWJ1bnR1MS40JyxcbiAgICAgICAgICBhcmNoaXRlY3R1cmU6ICdhbWQ2NCcsXG4gICAgICAgICAgY29uZGl0aW9uOiAnUGFja2FnZSBsZXNzIHRoYW4gOC4xLjIxMzYnLFxuICAgICAgICB9LFxuICAgICAgICBjdnNzOiB7XG4gICAgICAgICAgY3ZzczI6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbmV0d29yaycsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbG93JyxcbiAgICAgICAgICAgICAgYXV0aGVudGljYXRpb246ICdub25lJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc3LjUwMDAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY3ZlOiAnQ1ZFLTIwMTktMjAwNzknLFxuICAgICAgICB0aXRsZTpcbiAgICAgICAgICAnVGhlIGF1dG9jbWQgZmVhdHVyZSBpbiB3aW5kb3cuYyBpbiBWaW0gYmVmb3JlIDguMS4yMTM2IGFjY2Vzc2VzIGZyZWVkIG1lbW9yeS4nLFxuICAgICAgICBzZXZlcml0eTogJ0hpZ2gnLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDE5LTEyLTMwJyxcbiAgICAgICAgdXBkYXRlZDogJzIwMjAtMDMtMzAnLFxuICAgICAgICBzdGF0ZTogJ0ZpeGVkJyxcbiAgICAgICAgY3dlX3JlZmVyZW5jZTogJ0NXRS00MTYnLFxuICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS92aW0vdmltL2NvbW1pdC9lYzY2YzQxZDg0ZTU3NGJhZjgwMDlkYmMwYmQwODhkMmJjNWIyNDIxJyxcbiAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL3ZpbS92aW0vY29tcGFyZS92OC4xLjIxMzUuLi52OC4xLjIxMzYnLFxuICAgICAgICAgICdodHRwczovL3BhY2tldHN0b3Jtc2VjdXJpdHkuY29tL2ZpbGVzLzE1NDg5OCcsXG4gICAgICAgICAgJ2h0dHBzOi8vdXNuLnVidW50dS5jb20vNDMwOS0xLycsXG4gICAgICAgICAgJ2h0dHBzOi8vbnZkLm5pc3QuZ292L3Z1bG4vZGV0YWlsL0NWRS0yMDE5LTIwMDc5JyxcbiAgICAgICAgXSxcbiAgICAgICAgYXNzaWduZXI6ICdjdmVAbWl0cmUub3JnJyxcbiAgICAgICAgY3ZlX3ZlcnNpb246ICc0LjAnLFxuICAgICAgICBzdGF0dXM6ICdBY3RpdmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDcsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NWRS0yMDE2LTQ0ODQgYWZmZWN0cyBjcnlwdHNldHVwJyxcbiAgICAgIGlkOiAnMjM1MDQnLFxuICAgICAgZmlyZWR0aW1lczogMjkwLFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgdnVsbmVyYWJpbGl0eToge1xuICAgICAgICBwYWNrYWdlOiB7XG4gICAgICAgICAgbmFtZTogJ2NyeXB0c2V0dXAnLFxuICAgICAgICAgIHZlcnNpb246ICcyOjEuNi42LTV1YnVudHUyLjEnLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIGxlc3Mgb3IgZXF1YWwgdGhhbiAyLjEuNy4zLTInLFxuICAgICAgICB9LFxuICAgICAgICBjdnNzOiB7XG4gICAgICAgICAgY3ZzczI6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbG9jYWwnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdjb21wbGV0ZScsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdjb21wbGV0ZScsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ2NvbXBsZXRlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNy4yMDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY3ZzczM6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAncGh5c2ljYWwnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIHByaXZpbGVnZXNfcmVxdWlyZWQ6ICdub25lJyxcbiAgICAgICAgICAgICAgdXNlcl9pbnRlcmFjdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBzY29wZTogJ3VuY2hhbmdlZCcsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdoaWdoJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ2hpZ2gnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdoaWdoJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNi44MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDE2LTQ0ODQnLFxuICAgICAgICB0aXRsZTogJ0NWRS0yMDE2LTQ0ODQgb24gVWJ1bnR1IDE2LjA0IExUUyAoeGVuaWFsKSAtIGxvdy4nLFxuICAgICAgICByYXRpb25hbGU6XG4gICAgICAgICAgJ1RoZSBEZWJpYW4gaW5pdHJkIHNjcmlwdCBmb3IgdGhlIGNyeXB0c2V0dXAgcGFja2FnZSAyOjEuNy4zLTIgYW5kIGVhcmxpZXIgYWxsb3dzIHBoeXNpY2FsbHkgcHJveGltYXRlIGF0dGFja2VycyB0byBnYWluIHNoZWxsIGFjY2VzcyB2aWEgbWFueSBsb2cgaW4gYXR0ZW1wdHMgd2l0aCBhbiBpbnZhbGlkIHBhc3N3b3JkLicsXG4gICAgICAgIHNldmVyaXR5OiAnTWVkaXVtJyxcbiAgICAgICAgcHVibGlzaGVkOiAnMjAxNy0wMS0yMycsXG4gICAgICAgIHVwZGF0ZWQ6ICcyMDE3LTAxLTI2JyxcbiAgICAgICAgc3RhdGU6ICdGaXhlZCcsXG4gICAgICAgIGN3ZV9yZWZlcmVuY2U6ICdDV0UtMjg3JyxcbiAgICAgICAgYnVnemlsbGFfcmVmZXJlbmNlczogWydodHRwczovL2xhdW5jaHBhZC5uZXQvYnVncy8xNjYwNzAxJ10sXG4gICAgICAgIHJlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cDovL2htYXJjby5vcmcvYnVncy9DVkUtMjAxNi00NDg0L0NWRS0yMDE2LTQ0ODRfY3J5cHRzZXR1cF9pbml0cmRfc2hlbGwuaHRtbCcsXG4gICAgICAgICAgJ2h0dHA6Ly93d3cub3BlbndhbGwuY29tL2xpc3RzL29zcy1zZWN1cml0eS8yMDE2LzExLzE0LzEzJyxcbiAgICAgICAgICAnaHR0cDovL3d3dy5vcGVud2FsbC5jb20vbGlzdHMvb3NzLXNlY3VyaXR5LzIwMTYvMTEvMTUvMScsXG4gICAgICAgICAgJ2h0dHA6Ly93d3cub3BlbndhbGwuY29tL2xpc3RzL29zcy1zZWN1cml0eS8yMDE2LzExLzE1LzQnLFxuICAgICAgICAgICdodHRwOi8vd3d3Lm9wZW53YWxsLmNvbS9saXN0cy9vc3Mtc2VjdXJpdHkvMjAxNi8xMS8xNi82JyxcbiAgICAgICAgICAnaHR0cDovL3d3dy5zZWN1cml0eWZvY3VzLmNvbS9iaWQvOTQzMTUnLFxuICAgICAgICAgICdodHRwczovL2dpdGxhYi5jb20vY3J5cHRzZXR1cC9jcnlwdHNldHVwL2NvbW1pdC9lZjhhN2Q4MmQ4ZDM3MTZhZTliNTgxNzk1OTBmNzkwODk4MWZhMGNiJyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMTYtNDQ4NCcsXG4gICAgICAgICAgJ2h0dHA6Ly9wZW9wbGUuY2Fub25pY2FsLmNvbS9+dWJ1bnR1LXNlY3VyaXR5L2N2ZS8yMDE2L0NWRS0yMDE2LTQ0ODQuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vY3ZlLm1pdHJlLm9yZy9jZ2ktYmluL2N2ZW5hbWUuY2dpP25hbWU9Q1ZFLTIwMTYtNDQ4NCcsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiAxMCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ1ZFLTIwMTktMTMwNTAgYWZmZWN0cyBnbnVwZycsXG4gICAgICBpZDogJzIzNTA1JyxcbiAgICAgIGZpcmVkdGltZXM6IDExNCxcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdnbnVwZycsXG4gICAgICAgICAgdmVyc2lvbjogJzEuNC4yMC0xdWJ1bnR1My4zJyxcbiAgICAgICAgICBhcmNoaXRlY3R1cmU6ICdhbWQ2NCcsXG4gICAgICAgICAgY29uZGl0aW9uOiAnUGFja2FnZSBsZXNzIG9yIGVxdWFsIHRoYW4gMi4yLjE2JyxcbiAgICAgICAgfSxcbiAgICAgICAgY3Zzczoge1xuICAgICAgICAgIGN2c3MyOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ25ldHdvcmsnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ25vbmUnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNScsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjdnNzMzoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICduZXR3b3JrJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdsb3cnLFxuICAgICAgICAgICAgICBwcml2aWxlZ2VzX3JlcXVpcmVkOiAnbm9uZScsXG4gICAgICAgICAgICAgIHVzZXJfaW50ZXJhY3Rpb246ICdub25lJyxcbiAgICAgICAgICAgICAgc2NvcGU6ICd1bmNoYW5nZWQnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAnbm9uZScsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAnaGlnaCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzcuNTAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjdmU6ICdDVkUtMjAxOS0xMzA1MCcsXG4gICAgICAgIHRpdGxlOiAnQ1ZFLTIwMTktMTMwNTAgb24gVWJ1bnR1IDE2LjA0IExUUyAoeGVuaWFsKSAtIGxvdy4nLFxuICAgICAgICByYXRpb25hbGU6XG4gICAgICAgICAgJ0ludGVyYWN0aW9uIGJldHdlZW4gdGhlIHNrcy1rZXlzZXJ2ZXIgY29kZSB0aHJvdWdoIDEuMi4wIG9mIHRoZSBTS1Mga2V5c2VydmVyIG5ldHdvcmssIGFuZCBHbnVQRyB0aHJvdWdoIDIuMi4xNiwgbWFrZXMgaXQgcmlza3kgdG8gaGF2ZSBhIEdudVBHIGtleXNlcnZlciBjb25maWd1cmF0aW9uIGxpbmUgcmVmZXJyaW5nIHRvIGEgaG9zdCBvbiB0aGUgU0tTIGtleXNlcnZlciBuZXR3b3JrLiBSZXRyaWV2aW5nIGRhdGEgZnJvbSB0aGlzIG5ldHdvcmsgbWF5IGNhdXNlIGEgcGVyc2lzdGVudCBkZW5pYWwgb2Ygc2VydmljZSwgYmVjYXVzZSBvZiBhIENlcnRpZmljYXRlIFNwYW1taW5nIEF0dGFjay4nLFxuICAgICAgICBzZXZlcml0eTogJ0hpZ2gnLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDE5LTA2LTI5JyxcbiAgICAgICAgdXBkYXRlZDogJzIwMTktMDctMDknLFxuICAgICAgICBzdGF0ZTogJ0ZpeGVkJyxcbiAgICAgICAgY3dlX3JlZmVyZW5jZTogJ0NXRS0yOTcnLFxuICAgICAgICBidWd6aWxsYV9yZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHBzOi8vYnVncy5sYXVuY2hwYWQubmV0L2J1Z3MvMTg0NDA1OScsXG4gICAgICAgICAgJ2h0dHBzOi8vYnVnemlsbGEuc3VzZS5jb20vc2hvd19idWcuY2dpP2lkPUNWRS0yMDE5LTEzMDUwJyxcbiAgICAgICAgICAnaHR0cHM6Ly9kZXYuZ251cGcub3JnL1Q0NTkxJyxcbiAgICAgICAgICAnaHR0cHM6Ly9kZXYuZ251cGcub3JnL1Q0NjA3JyxcbiAgICAgICAgICAnaHR0cHM6Ly9kZXYuZ251cGcub3JnL1Q0NjI4JyxcbiAgICAgICAgXSxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vbGlzdHMub3BlbnN1c2Uub3JnL29wZW5zdXNlLXNlY3VyaXR5LWFubm91bmNlLzIwMTktMDgvbXNnMDAwMzkuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vZ2lzdC5naXRodWIuY29tL3JqaGFuc2VuLzY3YWI5MjFmZmI0MDg0Yzg2NWIzNjE4ZDY5NTUyNzVmJyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5mZWRvcmFwcm9qZWN0Lm9yZy9hcmNoaXZlcy9saXN0L3BhY2thZ2UtYW5ub3VuY2VAbGlzdHMuZmVkb3JhcHJvamVjdC5vcmcvbWVzc2FnZS9BVUsyWVJPNlFJSDY0V1AyTFJBNUQ0TEFDVFhRUFBVNC8nLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLmZlZG9yYXByb2plY3Qub3JnL2FyY2hpdmVzL2xpc3QvcGFja2FnZS1hbm5vdW5jZUBsaXN0cy5mZWRvcmFwcm9qZWN0Lm9yZy9tZXNzYWdlL0NQNE9OMzRZRVhFWkRaT1hYV1Y0M0tWR0dPNldaTEo1LycsXG4gICAgICAgICAgJ2h0dHBzOi8vbGlzdHMuZ251cGcub3JnL3BpcGVybWFpbC9nbnVwZy1hbm5vdW5jZS8yMDE5cTMvMDAwNDM5Lmh0bWwnLFxuICAgICAgICAgICdodHRwczovL3N1cHBvcnQuZjUuY29tL2NzcC9hcnRpY2xlL0swODY1NDU1MScsXG4gICAgICAgICAgJ2h0dHBzOi8vc3VwcG9ydC5mNS5jb20vY3NwL2FydGljbGUvSzA4NjU0NTUxP3V0bV9zb3VyY2U9ZjVzdXBwb3J0JmFtcDt1dG1fbWVkaXVtPVJTUycsXG4gICAgICAgICAgJ2h0dHBzOi8vdHdpdHRlci5jb20vbGFtYmRhZnUvc3RhdHVzLzExNDcxNjI1ODM5NjkwMDk2NjQnLFxuICAgICAgICAgICdodHRwczovL252ZC5uaXN0Lmdvdi92dWxuL2RldGFpbC9DVkUtMjAxOS0xMzA1MCcsXG4gICAgICAgICAgJ2h0dHA6Ly9wZW9wbGUuY2Fub25pY2FsLmNvbS9+dWJ1bnR1LXNlY3VyaXR5L2N2ZS8yMDE5L0NWRS0yMDE5LTEzMDUwLmh0bWwnLFxuICAgICAgICAgICdodHRwczovL2N2ZS5taXRyZS5vcmcvY2dpLWJpbi9jdmVuYW1lLmNnaT9uYW1lPUNWRS0yMDE5LTEzMDUwJyxcbiAgICAgICAgXSxcbiAgICAgICAgYXNzaWduZXI6ICdjdmVAbWl0cmUub3JnJyxcbiAgICAgICAgY3ZlX3ZlcnNpb246ICc0LjAnLFxuICAgICAgICBzdGF0dXM6ICdBY3RpdmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDEwLFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAxOC03NzM4IGFmZmVjdHMgbW91bnQnLFxuICAgICAgaWQ6ICcyMzUwNScsXG4gICAgICBmaXJlZHRpbWVzOiAxMjgsXG4gICAgfSxcbiAgICBkYXRhOiB7XG4gICAgICB2dWxuZXJhYmlsaXR5OiB7XG4gICAgICAgIHBhY2thZ2U6IHtcbiAgICAgICAgICBuYW1lOiAnbW91bnQnLFxuICAgICAgICAgIHNvdXJjZTogJ3V0aWwtbGludXgnLFxuICAgICAgICAgIHZlcnNpb246ICcyLjI3LjEtNnVidW50dTMuMTAnLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIGxlc3Mgb3IgZXF1YWwgdGhhbiAyLjMxJyxcbiAgICAgICAgfSxcbiAgICAgICAgY3Zzczoge1xuICAgICAgICAgIGN2c3MyOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ2xvY2FsJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdsb3cnLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAnY29tcGxldGUnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAnY29tcGxldGUnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdjb21wbGV0ZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzcuMjAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN2c3MzOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ2xvY2FsJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdsb3cnLFxuICAgICAgICAgICAgICBwcml2aWxlZ2VzX3JlcXVpcmVkOiAnbG93JyxcbiAgICAgICAgICAgICAgdXNlcl9pbnRlcmFjdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBzY29wZTogJ3VuY2hhbmdlZCcsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdoaWdoJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ2hpZ2gnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdoaWdoJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNy44MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDE4LTc3MzgnLFxuICAgICAgICB0aXRsZTogJ0NWRS0yMDE4LTc3Mzggb24gVWJ1bnR1IDE2LjA0IExUUyAoeGVuaWFsKSAtIG5lZ2xpZ2libGUuJyxcbiAgICAgICAgcmF0aW9uYWxlOlxuICAgICAgICAgICdJbiB1dGlsLWxpbnV4IGJlZm9yZSAyLjMyLXJjMSwgYmFzaC1jb21wbGV0aW9uL3Vtb3VudCBhbGxvd3MgbG9jYWwgdXNlcnMgdG8gZ2FpbiBwcml2aWxlZ2VzIGJ5IGVtYmVkZGluZyBzaGVsbCBjb21tYW5kcyBpbiBhIG1vdW50cG9pbnQgbmFtZSwgd2hpY2ggaXMgbWlzaGFuZGxlZCBkdXJpbmcgYSB1bW91bnQgY29tbWFuZCAod2l0aGluIEJhc2gpIGJ5IGEgZGlmZmVyZW50IHVzZXIsIGFzIGRlbW9uc3RyYXRlZCBieSBsb2dnaW5nIGluIGFzIHJvb3QgYW5kIGVudGVyaW5nIHVtb3VudCBmb2xsb3dlZCBieSBhIHRhYiBjaGFyYWN0ZXIgZm9yIGF1dG9jb21wbGV0aW9uLicsXG4gICAgICAgIHNldmVyaXR5OiAnSGlnaCcsXG4gICAgICAgIHB1Ymxpc2hlZDogJzIwMTgtMDMtMDcnLFxuICAgICAgICB1cGRhdGVkOiAnMjAxOS0xMC0wMycsXG4gICAgICAgIHN0YXRlOiAnRml4ZWQnLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnTlZELUNXRS1ub2luZm8nLFxuICAgICAgICBidWd6aWxsYV9yZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHA6Ly9idWdzLmRlYmlhbi5vcmcvY2dpLWJpbi9idWdyZXBvcnQuY2dpP2J1Zz04OTIxNzknLFxuICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20va2FyZWx6YWsvdXRpbC1saW51eC9pc3N1ZXMvNTM5JyxcbiAgICAgICAgXSxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vd3d3LnNlY3VyaXR5Zm9jdXMuY29tL2JpZC8xMDMzNjcnLFxuICAgICAgICAgICdodHRwczovL2J1Z3MuZGViaWFuLm9yZy84OTIxNzknLFxuICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20va2FyZWx6YWsvdXRpbC1saW51eC9jb21taXQvNzVmMDNiYWRkN2VkOWYxZGQ5NTE4NjNkNzVlNzU2ODgzZDNhY2M1NScsXG4gICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9rYXJlbHphay91dGlsLWxpbnV4L2lzc3Vlcy81MzknLFxuICAgICAgICAgICdodHRwczovL3d3dy5kZWJpYW4ub3JnL3NlY3VyaXR5LzIwMTgvZHNhLTQxMzQnLFxuICAgICAgICAgICdodHRwczovL252ZC5uaXN0Lmdvdi92dWxuL2RldGFpbC9DVkUtMjAxOC03NzM4JyxcbiAgICAgICAgICAnaHR0cDovL3Blb3BsZS5jYW5vbmljYWwuY29tL351YnVudHUtc2VjdXJpdHkvY3ZlLzIwMTgvQ1ZFLTIwMTgtNzczOC5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9jdmUubWl0cmUub3JnL2NnaS1iaW4vY3ZlbmFtZS5jZ2k/bmFtZT1DVkUtMjAxOC03NzM4JyxcbiAgICAgICAgXSxcbiAgICAgICAgYXNzaWduZXI6ICdjdmVAbWl0cmUub3JnJyxcbiAgICAgICAgY3ZlX3ZlcnNpb246ICc0LjAnLFxuICAgICAgICBzdGF0dXM6ICdBY3RpdmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDEwLFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAxOC03NzM4IGFmZmVjdHMgdXRpbC1saW51eCcsXG4gICAgICBpZDogJzIzNTA1JyxcbiAgICAgIGZpcmVkdGltZXM6IDEyOSxcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICd1dGlsLWxpbnV4JyxcbiAgICAgICAgICB2ZXJzaW9uOiAnMi4yNy4xLTZ1YnVudHUzLjEwJyxcbiAgICAgICAgICBhcmNoaXRlY3R1cmU6ICdhbWQ2NCcsXG4gICAgICAgICAgY29uZGl0aW9uOiAnUGFja2FnZSBsZXNzIG9yIGVxdWFsIHRoYW4gMi4zMScsXG4gICAgICAgIH0sXG4gICAgICAgIGN2c3M6IHtcbiAgICAgICAgICBjdnNzMjoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICdsb2NhbCcsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbG93JyxcbiAgICAgICAgICAgICAgYXV0aGVudGljYXRpb246ICdub25lJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ2NvbXBsZXRlJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ2NvbXBsZXRlJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAnY29tcGxldGUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc3LjIwMDAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjdnNzMzoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICdsb2NhbCcsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbG93JyxcbiAgICAgICAgICAgICAgcHJpdmlsZWdlc19yZXF1aXJlZDogJ2xvdycsXG4gICAgICAgICAgICAgIHVzZXJfaW50ZXJhY3Rpb246ICdub25lJyxcbiAgICAgICAgICAgICAgc2NvcGU6ICd1bmNoYW5nZWQnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAnaGlnaCcsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdoaWdoJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAnaGlnaCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzcuODAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjdmU6ICdDVkUtMjAxOC03NzM4JyxcbiAgICAgICAgdGl0bGU6ICdDVkUtMjAxOC03NzM4IG9uIFVidW50dSAxNi4wNCBMVFMgKHhlbmlhbCkgLSBuZWdsaWdpYmxlLicsXG4gICAgICAgIHJhdGlvbmFsZTpcbiAgICAgICAgICAnSW4gdXRpbC1saW51eCBiZWZvcmUgMi4zMi1yYzEsIGJhc2gtY29tcGxldGlvbi91bW91bnQgYWxsb3dzIGxvY2FsIHVzZXJzIHRvIGdhaW4gcHJpdmlsZWdlcyBieSBlbWJlZGRpbmcgc2hlbGwgY29tbWFuZHMgaW4gYSBtb3VudHBvaW50IG5hbWUsIHdoaWNoIGlzIG1pc2hhbmRsZWQgZHVyaW5nIGEgdW1vdW50IGNvbW1hbmQgKHdpdGhpbiBCYXNoKSBieSBhIGRpZmZlcmVudCB1c2VyLCBhcyBkZW1vbnN0cmF0ZWQgYnkgbG9nZ2luZyBpbiBhcyByb290IGFuZCBlbnRlcmluZyB1bW91bnQgZm9sbG93ZWQgYnkgYSB0YWIgY2hhcmFjdGVyIGZvciBhdXRvY29tcGxldGlvbi4nLFxuICAgICAgICBzZXZlcml0eTogJ0hpZ2gnLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDE4LTAzLTA3JyxcbiAgICAgICAgdXBkYXRlZDogJzIwMTktMTAtMDMnLFxuICAgICAgICBzdGF0ZTogJ0ZpeGVkJyxcbiAgICAgICAgY3dlX3JlZmVyZW5jZTogJ05WRC1DV0Utbm9pbmZvJyxcbiAgICAgICAgYnVnemlsbGFfcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vYnVncy5kZWJpYW4ub3JnL2NnaS1iaW4vYnVncmVwb3J0LmNnaT9idWc9ODkyMTc5JyxcbiAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL2thcmVsemFrL3V0aWwtbGludXgvaXNzdWVzLzUzOScsXG4gICAgICAgIF0sXG4gICAgICAgIHJlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cDovL3d3dy5zZWN1cml0eWZvY3VzLmNvbS9iaWQvMTAzMzY3JyxcbiAgICAgICAgICAnaHR0cHM6Ly9idWdzLmRlYmlhbi5vcmcvODkyMTc5JyxcbiAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL2thcmVsemFrL3V0aWwtbGludXgvY29tbWl0Lzc1ZjAzYmFkZDdlZDlmMWRkOTUxODYzZDc1ZTc1Njg4M2QzYWNjNTUnLFxuICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20va2FyZWx6YWsvdXRpbC1saW51eC9pc3N1ZXMvNTM5JyxcbiAgICAgICAgICAnaHR0cHM6Ly93d3cuZGViaWFuLm9yZy9zZWN1cml0eS8yMDE4L2RzYS00MTM0JyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMTgtNzczOCcsXG4gICAgICAgICAgJ2h0dHA6Ly9wZW9wbGUuY2Fub25pY2FsLmNvbS9+dWJ1bnR1LXNlY3VyaXR5L2N2ZS8yMDE4L0NWRS0yMDE4LTc3MzguaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vY3ZlLm1pdHJlLm9yZy9jZ2ktYmluL2N2ZW5hbWUuY2dpP25hbWU9Q1ZFLTIwMTgtNzczOCcsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiAxMCxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ1ZFLTIwMTgtNzczOCBhZmZlY3RzIHV1aWQtcnVudGltZScsXG4gICAgICBpZDogJzIzNTA1JyxcbiAgICAgIGZpcmVkdGltZXM6IDEzMCxcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICd1dWlkLXJ1bnRpbWUnLFxuICAgICAgICAgIHNvdXJjZTogJ3V0aWwtbGludXgnLFxuICAgICAgICAgIHZlcnNpb246ICcyLjI3LjEtNnVidW50dTMuMTAnLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIGxlc3Mgb3IgZXF1YWwgdGhhbiAyLjMxJyxcbiAgICAgICAgfSxcbiAgICAgICAgY3Zzczoge1xuICAgICAgICAgIGN2c3MyOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ2xvY2FsJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdsb3cnLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAnY29tcGxldGUnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAnY29tcGxldGUnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdjb21wbGV0ZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzcuMjAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN2c3MzOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ2xvY2FsJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdsb3cnLFxuICAgICAgICAgICAgICBwcml2aWxlZ2VzX3JlcXVpcmVkOiAnbG93JyxcbiAgICAgICAgICAgICAgdXNlcl9pbnRlcmFjdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBzY29wZTogJ3VuY2hhbmdlZCcsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdoaWdoJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ2hpZ2gnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdoaWdoJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNy44MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDE4LTc3MzgnLFxuICAgICAgICB0aXRsZTogJ0NWRS0yMDE4LTc3Mzggb24gVWJ1bnR1IDE2LjA0IExUUyAoeGVuaWFsKSAtIG5lZ2xpZ2libGUuJyxcbiAgICAgICAgcmF0aW9uYWxlOlxuICAgICAgICAgICdJbiB1dGlsLWxpbnV4IGJlZm9yZSAyLjMyLXJjMSwgYmFzaC1jb21wbGV0aW9uL3Vtb3VudCBhbGxvd3MgbG9jYWwgdXNlcnMgdG8gZ2FpbiBwcml2aWxlZ2VzIGJ5IGVtYmVkZGluZyBzaGVsbCBjb21tYW5kcyBpbiBhIG1vdW50cG9pbnQgbmFtZSwgd2hpY2ggaXMgbWlzaGFuZGxlZCBkdXJpbmcgYSB1bW91bnQgY29tbWFuZCAod2l0aGluIEJhc2gpIGJ5IGEgZGlmZmVyZW50IHVzZXIsIGFzIGRlbW9uc3RyYXRlZCBieSBsb2dnaW5nIGluIGFzIHJvb3QgYW5kIGVudGVyaW5nIHVtb3VudCBmb2xsb3dlZCBieSBhIHRhYiBjaGFyYWN0ZXIgZm9yIGF1dG9jb21wbGV0aW9uLicsXG4gICAgICAgIHNldmVyaXR5OiAnSGlnaCcsXG4gICAgICAgIHB1Ymxpc2hlZDogJzIwMTgtMDMtMDcnLFxuICAgICAgICB1cGRhdGVkOiAnMjAxOS0xMC0wMycsXG4gICAgICAgIHN0YXRlOiAnRml4ZWQnLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnTlZELUNXRS1ub2luZm8nLFxuICAgICAgICBidWd6aWxsYV9yZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHA6Ly9idWdzLmRlYmlhbi5vcmcvY2dpLWJpbi9idWdyZXBvcnQuY2dpP2J1Zz04OTIxNzknLFxuICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20va2FyZWx6YWsvdXRpbC1saW51eC9pc3N1ZXMvNTM5JyxcbiAgICAgICAgXSxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vd3d3LnNlY3VyaXR5Zm9jdXMuY29tL2JpZC8xMDMzNjcnLFxuICAgICAgICAgICdodHRwczovL2J1Z3MuZGViaWFuLm9yZy84OTIxNzknLFxuICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20va2FyZWx6YWsvdXRpbC1saW51eC9jb21taXQvNzVmMDNiYWRkN2VkOWYxZGQ5NTE4NjNkNzVlNzU2ODgzZDNhY2M1NScsXG4gICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9rYXJlbHphay91dGlsLWxpbnV4L2lzc3Vlcy81MzknLFxuICAgICAgICAgICdodHRwczovL3d3dy5kZWJpYW4ub3JnL3NlY3VyaXR5LzIwMTgvZHNhLTQxMzQnLFxuICAgICAgICAgICdodHRwczovL252ZC5uaXN0Lmdvdi92dWxuL2RldGFpbC9DVkUtMjAxOC03NzM4JyxcbiAgICAgICAgICAnaHR0cDovL3Blb3BsZS5jYW5vbmljYWwuY29tL351YnVudHUtc2VjdXJpdHkvY3ZlLzIwMTgvQ1ZFLTIwMTgtNzczOC5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9jdmUubWl0cmUub3JnL2NnaS1iaW4vY3ZlbmFtZS5jZ2k/bmFtZT1DVkUtMjAxOC03NzM4JyxcbiAgICAgICAgXSxcbiAgICAgICAgYXNzaWduZXI6ICdjdmVAbWl0cmUub3JnJyxcbiAgICAgICAgY3ZlX3ZlcnNpb246ICc0LjAnLFxuICAgICAgICBzdGF0dXM6ICdBY3RpdmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDUsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NWRS0yMDE5LTE1NDcgYWZmZWN0cyBsaWJzc2wxLjAuMCcsXG4gICAgICBpZDogJzIzNTAzJyxcbiAgICAgIGZpcmVkdGltZXM6IDM1LFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgdnVsbmVyYWJpbGl0eToge1xuICAgICAgICBwYWNrYWdlOiB7XG4gICAgICAgICAgbmFtZTogJ2xpYnNzbDEuMC4wJyxcbiAgICAgICAgICBzb3VyY2U6ICdvcGVuc3NsJyxcbiAgICAgICAgICB2ZXJzaW9uOiAnMS4wLjJnLTF1YnVudHU0LjE1JyxcbiAgICAgICAgICBhcmNoaXRlY3R1cmU6ICdhbWQ2NCcsXG4gICAgICAgICAgY29uZGl0aW9uOlxuICAgICAgICAgICAgJ1BhY2thZ2UgZ3JlYXRlciBvciBlcXVhbCB0aGFuIDEuMC4yIGFuZCBsZXNzIG9yIGVxdWFsIHRoYW4gMS4wLjJzJyxcbiAgICAgICAgfSxcbiAgICAgICAgY3Zzczoge1xuICAgICAgICAgIGN2c3MyOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ2xvY2FsJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdtZWRpdW0nLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAnbm9uZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzEuOTAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjdmU6ICdDVkUtMjAxOS0xNTQ3JyxcbiAgICAgICAgdGl0bGU6ICdDVkUtMjAxOS0xNTQ3IG9uIFVidW50dSAxNi4wNCBMVFMgKHhlbmlhbCkgLSBsb3cuJyxcbiAgICAgICAgcmF0aW9uYWxlOlxuICAgICAgICAgICdOb3JtYWxseSBpbiBPcGVuU1NMIEVDIGdyb3VwcyBhbHdheXMgaGF2ZSBhIGNvLWZhY3RvciBwcmVzZW50IGFuZCB0aGlzIGlzIHVzZWQgaW4gc2lkZSBjaGFubmVsIHJlc2lzdGFudCBjb2RlIHBhdGhzLiBIb3dldmVyLCBpbiBzb21lIGNhc2VzLCBpdCBpcyBwb3NzaWJsZSB0byBjb25zdHJ1Y3QgYSBncm91cCB1c2luZyBleHBsaWNpdCBwYXJhbWV0ZXJzIChpbnN0ZWFkIG9mIHVzaW5nIGEgbmFtZWQgY3VydmUpLiBJbiB0aG9zZSBjYXNlcyBpdCBpcyBwb3NzaWJsZSB0aGF0IHN1Y2ggYSBncm91cCBkb2VzIG5vdCBoYXZlIHRoZSBjb2ZhY3RvciBwcmVzZW50LiBUaGlzIGNhbiBvY2N1ciBldmVuIHdoZXJlIGFsbCB0aGUgcGFyYW1ldGVycyBtYXRjaCBhIGtub3duIG5hbWVkIGN1cnZlLiBJZiBzdWNoIGEgY3VydmUgaXMgdXNlZCB0aGVuIE9wZW5TU0wgZmFsbHMgYmFjayB0byBub24tc2lkZSBjaGFubmVsIHJlc2lzdGFudCBjb2RlIHBhdGhzIHdoaWNoIG1heSByZXN1bHQgaW4gZnVsbCBrZXkgcmVjb3ZlcnkgZHVyaW5nIGFuIEVDRFNBIHNpZ25hdHVyZSBvcGVyYXRpb24uIEluIG9yZGVyIHRvIGJlIHZ1bG5lcmFibGUgYW4gYXR0YWNrZXIgd291bGQgaGF2ZSB0byBoYXZlIHRoZSBhYmlsaXR5IHRvIHRpbWUgdGhlIGNyZWF0aW9uIG9mIGEgbGFyZ2UgbnVtYmVyIG9mIHNpZ25hdHVyZXMgd2hlcmUgZXhwbGljaXQgcGFyYW1ldGVycyB3aXRoIG5vIGNvLWZhY3RvciBwcmVzZW50IGFyZSBpbiB1c2UgYnkgYW4gYXBwbGljYXRpb24gdXNpbmcgbGliY3J5cHRvLiBGb3IgdGhlIGF2b2lkYW5jZSBvZiBkb3VidCBsaWJzc2wgaXMgbm90IHZ1bG5lcmFibGUgYmVjYXVzZSBleHBsaWNpdCBwYXJhbWV0ZXJzIGFyZSBuZXZlciB1c2VkLiBGaXhlZCBpbiBPcGVuU1NMIDEuMS4xZCAoQWZmZWN0ZWQgMS4xLjEtMS4xLjFjKS4gRml4ZWQgaW4gT3BlblNTTCAxLjEuMGwgKEFmZmVjdGVkIDEuMS4wLTEuMS4waykuIEZpeGVkIGluIE9wZW5TU0wgMS4wLjJ0IChBZmZlY3RlZCAxLjAuMi0xLjAuMnMpLicsXG4gICAgICAgIHNldmVyaXR5OiAnTG93JyxcbiAgICAgICAgcHVibGlzaGVkOiAnMjAxOS0wOS0xMCcsXG4gICAgICAgIHVwZGF0ZWQ6ICcyMDE5LTA5LTEyJyxcbiAgICAgICAgc3RhdGU6ICdGaXhlZCcsXG4gICAgICAgIGN3ZV9yZWZlcmVuY2U6ICdDV0UtMzExJyxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vbGlzdHMub3BlbnN1c2Uub3JnL29wZW5zdXNlLXNlY3VyaXR5LWFubm91bmNlLzIwMTktMDkvbXNnMDAwNTQuaHRtbCcsXG4gICAgICAgICAgJ2h0dHA6Ly9saXN0cy5vcGVuc3VzZS5vcmcvb3BlbnN1c2Utc2VjdXJpdHktYW5ub3VuY2UvMjAxOS0wOS9tc2cwMDA3Mi5odG1sJyxcbiAgICAgICAgICAnaHR0cDovL2xpc3RzLm9wZW5zdXNlLm9yZy9vcGVuc3VzZS1zZWN1cml0eS1hbm5vdW5jZS8yMDE5LTEwL21zZzAwMDEyLmh0bWwnLFxuICAgICAgICAgICdodHRwOi8vbGlzdHMub3BlbnN1c2Uub3JnL29wZW5zdXNlLXNlY3VyaXR5LWFubm91bmNlLzIwMTktMTAvbXNnMDAwMTYuaHRtbCcsXG4gICAgICAgICAgJ2h0dHA6Ly9wYWNrZXRzdG9ybXNlY3VyaXR5LmNvbS9maWxlcy8xNTQ0NjcvU2xhY2t3YXJlLVNlY3VyaXR5LUFkdmlzb3J5LW9wZW5zc2wtVXBkYXRlcy5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9hcnhpdi5vcmcvYWJzLzE5MDkuMDE3ODUnLFxuICAgICAgICAgICdodHRwczovL2dpdC5vcGVuc3NsLm9yZy9naXR3ZWIvP3A9b3BlbnNzbC5naXQ7YT1jb21taXRkaWZmO2g9MjFjODU2Yjc1ZDgxZWZmNjFhYTYzYjRmMDM2YmI2NGE4NWJmNmQ0NicsXG4gICAgICAgICAgJ2h0dHBzOi8vZ2l0Lm9wZW5zc2wub3JnL2dpdHdlYi8/cD1vcGVuc3NsLmdpdDthPWNvbW1pdGRpZmY7aD0zMGMyMmZhOGIxZDg0MDAzNmI4ZTIwMzU4NTczOGRmNjJhMDNjZWM4JyxcbiAgICAgICAgICAnaHR0cHM6Ly9naXQub3BlbnNzbC5vcmcvZ2l0d2ViLz9wPW9wZW5zc2wuZ2l0O2E9Y29tbWl0ZGlmZjtoPTdjMTcwOWMyZGE1NDE0ZjViNjEzM2QwMGEwM2ZjOGM1YmY5OTZjN2EnLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLmRlYmlhbi5vcmcvZGViaWFuLWx0cy1hbm5vdW5jZS8yMDE5LzA5L21zZzAwMDI2Lmh0bWwnLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLmZlZG9yYXByb2plY3Qub3JnL2FyY2hpdmVzL2xpc3QvcGFja2FnZS1hbm5vdW5jZUBsaXN0cy5mZWRvcmFwcm9qZWN0Lm9yZy9tZXNzYWdlL0dZNlNOUkpQMlM3WTQyR0lJRE8zSFhQTk1EWU4yVTNBLycsXG4gICAgICAgICAgJ2h0dHBzOi8vbGlzdHMuZmVkb3JhcHJvamVjdC5vcmcvYXJjaGl2ZXMvbGlzdC9wYWNrYWdlLWFubm91bmNlQGxpc3RzLmZlZG9yYXByb2plY3Qub3JnL21lc3NhZ2UvWk40VlZRSjNKRENIR0lIVjRZMllUWEJZUVo2UFdRN0UvJyxcbiAgICAgICAgICAnaHR0cHM6Ly9zZWNsaXN0cy5vcmcvYnVndHJhcS8yMDE5L09jdC8wJyxcbiAgICAgICAgICAnaHR0cHM6Ly9zZWNsaXN0cy5vcmcvYnVndHJhcS8yMDE5L09jdC8xJyxcbiAgICAgICAgICAnaHR0cHM6Ly9zZWNsaXN0cy5vcmcvYnVndHJhcS8yMDE5L1NlcC8yNScsXG4gICAgICAgICAgJ2h0dHBzOi8vc2VjdXJpdHkuZ2VudG9vLm9yZy9nbHNhLzIwMTkxMS0wNCcsXG4gICAgICAgICAgJ2h0dHBzOi8vc2VjdXJpdHkubmV0YXBwLmNvbS9hZHZpc29yeS9udGFwLTIwMTkwOTE5LTAwMDIvJyxcbiAgICAgICAgICAnaHR0cHM6Ly9zZWN1cml0eS5uZXRhcHAuY29tL2Fkdmlzb3J5L250YXAtMjAyMDAxMjItMDAwMi8nLFxuICAgICAgICAgICdodHRwczovL3N1cHBvcnQuZjUuY29tL2NzcC9hcnRpY2xlL0s3MzQyMjE2MD91dG1fc291cmNlPWY1c3VwcG9ydCZhbXA7dXRtX21lZGl1bT1SU1MnLFxuICAgICAgICAgICdodHRwczovL3d3dy5kZWJpYW4ub3JnL3NlY3VyaXR5LzIwMTkvZHNhLTQ1MzknLFxuICAgICAgICAgICdodHRwczovL3d3dy5kZWJpYW4ub3JnL3NlY3VyaXR5LzIwMTkvZHNhLTQ1NDAnLFxuICAgICAgICAgICdodHRwczovL3d3dy5vcGVuc3NsLm9yZy9uZXdzL3NlY2Fkdi8yMDE5MDkxMC50eHQnLFxuICAgICAgICAgICdodHRwczovL3d3dy5vcmFjbGUuY29tL3NlY3VyaXR5LWFsZXJ0cy9jcHVhcHIyMDIwLmh0bWwnLFxuICAgICAgICAgICdodHRwczovL3d3dy5vcmFjbGUuY29tL3NlY3VyaXR5LWFsZXJ0cy9jcHVqYW4yMDIwLmh0bWwnLFxuICAgICAgICAgICdodHRwczovL3d3dy5vcmFjbGUuY29tL3RlY2huZXR3b3JrL3NlY3VyaXR5LWFkdmlzb3J5L2NwdW9jdDIwMTktNTA3MjgzMi5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly93d3cudGVuYWJsZS5jb20vc2VjdXJpdHkvdG5zLTIwMTktMDgnLFxuICAgICAgICAgICdodHRwczovL3d3dy50ZW5hYmxlLmNvbS9zZWN1cml0eS90bnMtMjAxOS0wOScsXG4gICAgICAgICAgJ2h0dHBzOi8vbnZkLm5pc3QuZ292L3Z1bG4vZGV0YWlsL0NWRS0yMDE5LTE1NDcnLFxuICAgICAgICAgICdodHRwOi8vcGVvcGxlLmNhbm9uaWNhbC5jb20vfnVidW50dS1zZWN1cml0eS9jdmUvMjAxOS9DVkUtMjAxOS0xNTQ3Lmh0bWwnLFxuICAgICAgICAgICdodHRwczovL2N2ZS5taXRyZS5vcmcvY2dpLWJpbi9jdmVuYW1lLmNnaT9uYW1lPUNWRS0yMDE5LTE1NDcnLFxuICAgICAgICAgICdodHRwczovL3Vzbi51YnVudHUuY29tL3Vzbi91c24tNDM3Ni0xJyxcbiAgICAgICAgXSxcbiAgICAgICAgYXNzaWduZXI6ICdjdmVAbWl0cmUub3JnJyxcbiAgICAgICAgY3ZlX3ZlcnNpb246ICc0LjAnLFxuICAgICAgICBzdGF0dXM6ICdBY3RpdmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDEwLFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAxOS0zODQzIGFmZmVjdHMgc3lzdGVtZCcsXG4gICAgICBpZDogJzIzNTA1JyxcbiAgICAgIGZpcmVkdGltZXM6IDEzNCxcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdzeXN0ZW1kJyxcbiAgICAgICAgICB2ZXJzaW9uOiAnMjI5LTR1YnVudHUyMS4yNycsXG4gICAgICAgICAgYXJjaGl0ZWN0dXJlOiAnYW1kNjQnLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ1BhY2thZ2UgbGVzcyB0aGFuIDI0MicsXG4gICAgICAgIH0sXG4gICAgICAgIGN2c3M6IHtcbiAgICAgICAgICBjdnNzMjoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICdsb2NhbCcsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbG93JyxcbiAgICAgICAgICAgICAgYXV0aGVudGljYXRpb246ICdub25lJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc0LjYwMDAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjdnNzMzoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICdsb2NhbCcsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbG93JyxcbiAgICAgICAgICAgICAgcHJpdmlsZWdlc19yZXF1aXJlZDogJ2xvdycsXG4gICAgICAgICAgICAgIHVzZXJfaW50ZXJhY3Rpb246ICdub25lJyxcbiAgICAgICAgICAgICAgc2NvcGU6ICd1bmNoYW5nZWQnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAnaGlnaCcsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdoaWdoJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAnaGlnaCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzcuODAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjdmU6ICdDVkUtMjAxOS0zODQzJyxcbiAgICAgICAgdGl0bGU6XG4gICAgICAgICAgJ0l0IHdhcyBkaXNjb3ZlcmVkIHRoYXQgYSBzeXN0ZW1kIHNlcnZpY2UgdGhhdCB1c2VzIER5bmFtaWNVc2VyIHByb3BlcnR5IGNhbiBjcmVhdGUgYSBTVUlEL1NHSUQgYmluYXJ5IHRoYXQgd291bGQgYmUgYWxsb3dlZCB0byBydW4gYXMgdGhlIHRyYW5zaWVudCBzZXJ2aWNlIFVJRC9HSUQgZXZlbiBhZnRlciB0aGUgc2VydmljZSBpcyB0ZXJtaW5hdGVkLiBBIGxvY2FsIGF0dGFja2VyIG1heSB1c2UgdGhpcyBmbGF3IHRvIGFjY2VzcyByZXNvdXJjZXMgdGhhdCB3aWxsIGJlIG93bmVkIGJ5IGEgcG90ZW50aWFsbHkgZGlmZmVyZW50IHNlcnZpY2UgaW4gdGhlIGZ1dHVyZSwgd2hlbiB0aGUgVUlEL0dJRCB3aWxsIGJlIHJlY3ljbGVkLicsXG4gICAgICAgIHNldmVyaXR5OiAnSGlnaCcsXG4gICAgICAgIHB1Ymxpc2hlZDogJzIwMTktMDQtMjYnLFxuICAgICAgICB1cGRhdGVkOiAnMjAxOS0wNi0xOScsXG4gICAgICAgIHN0YXRlOiAnRml4ZWQnLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnQ1dFLTI2NCcsXG4gICAgICAgIHJlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cDovL3d3dy5zZWN1cml0eWZvY3VzLmNvbS9iaWQvMTA4MTE2JyxcbiAgICAgICAgICAnaHR0cHM6Ly9idWd6aWxsYS5yZWRoYXQuY29tL3Nob3dfYnVnLmNnaT9pZD1DVkUtMjAxOS0zODQzJyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5mZWRvcmFwcm9qZWN0Lm9yZy9hcmNoaXZlcy9saXN0L3BhY2thZ2UtYW5ub3VuY2VAbGlzdHMuZmVkb3JhcHJvamVjdC5vcmcvbWVzc2FnZS81SlhRQUtTVE1BQlo0NkVWQ1JNVzYyREhXWUhUVEZFUy8nLFxuICAgICAgICAgICdodHRwczovL3NlY3VyaXR5Lm5ldGFwcC5jb20vYWR2aXNvcnkvbnRhcC0yMDE5MDYxOS0wMDAyLycsXG4gICAgICAgICAgJ2h0dHBzOi8vdXNuLnVidW50dS5jb20vNDI2OS0xLycsXG4gICAgICAgICAgJ2h0dHBzOi8vbnZkLm5pc3QuZ292L3Z1bG4vZGV0YWlsL0NWRS0yMDE5LTM4NDMnLFxuICAgICAgICBdLFxuICAgICAgICBhc3NpZ25lcjogJ2N2ZUBtaXRyZS5vcmcnLFxuICAgICAgICBjdmVfdmVyc2lvbjogJzQuMCcsXG4gICAgICAgIHN0YXR1czogJ0FjdGl2ZScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBydWxlOiB7XG4gICAgICBsZXZlbDogNyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ1ZFLTIwMTktMTE3MjcgYWZmZWN0cyB0aHVuZGVyYmlyZCcsXG4gICAgICBpZDogJzIzNTA0JyxcbiAgICAgIGZpcmVkdGltZXM6IDMxMixcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICd0aHVuZGVyYmlyZCcsXG4gICAgICAgICAgdmVyc2lvbjogJzE6NjguOC4wK2J1aWxkMi0wdWJ1bnR1MC4xNi4wNC4yJyxcbiAgICAgICAgICBhcmNoaXRlY3R1cmU6ICdhbWQ2NCcsXG4gICAgICAgICAgY29uZGl0aW9uOiAnUGFja2FnZSB1bmZpeGVkJyxcbiAgICAgICAgfSxcbiAgICAgICAgY3Zzczoge1xuICAgICAgICAgIGN2c3MyOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ25ldHdvcmsnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdub25lJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNScsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjdnNzMzoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICduZXR3b3JrJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdsb3cnLFxuICAgICAgICAgICAgICBwcml2aWxlZ2VzX3JlcXVpcmVkOiAnbm9uZScsXG4gICAgICAgICAgICAgIHVzZXJfaW50ZXJhY3Rpb246ICdub25lJyxcbiAgICAgICAgICAgICAgc2NvcGU6ICd1bmNoYW5nZWQnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAnbm9uZScsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdsb3cnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdub25lJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNS4zMDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDE5LTExNzI3JyxcbiAgICAgICAgdGl0bGU6ICdDVkUtMjAxOS0xMTcyNyBvbiBVYnVudHUgMTYuMDQgTFRTICh4ZW5pYWwpIC0gbWVkaXVtLicsXG4gICAgICAgIHJhdGlvbmFsZTpcbiAgICAgICAgICAnQSB2dWxuZXJhYmlsaXR5IGV4aXN0cyB3aGVyZSBpdCBwb3NzaWJsZSB0byBmb3JjZSBOZXR3b3JrIFNlY3VyaXR5IFNlcnZpY2VzIChOU1MpIHRvIHNpZ24gQ2VydGlmaWNhdGVWZXJpZnkgd2l0aCBQS0NTIzEgdjEuNSBzaWduYXR1cmVzIHdoZW4gdGhvc2UgYXJlIHRoZSBvbmx5IG9uZXMgYWR2ZXJ0aXNlZCBieSBzZXJ2ZXIgaW4gQ2VydGlmaWNhdGVSZXF1ZXN0IGluIFRMUyAxLjMuIFBLQ1MjMSB2MS41IHNpZ25hdHVyZXMgc2hvdWxkIG5vdCBiZSB1c2VkIGZvciBUTFMgMS4zIG1lc3NhZ2VzLiBUaGlzIHZ1bG5lcmFiaWxpdHkgYWZmZWN0cyBGaXJlZm94IDwgNjguJyxcbiAgICAgICAgc2V2ZXJpdHk6ICdNZWRpdW0nLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDE5LTA3LTIzJyxcbiAgICAgICAgdXBkYXRlZDogJzIwMTktMDctMzAnLFxuICAgICAgICBzdGF0ZTogJ1VuZml4ZWQnLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnQ1dFLTI5NScsXG4gICAgICAgIGJ1Z3ppbGxhX3JlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTU1MjIwOCcsXG4gICAgICAgIF0sXG4gICAgICAgIHJlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cDovL2xpc3RzLm9wZW5zdXNlLm9yZy9vcGVuc3VzZS1zZWN1cml0eS1hbm5vdW5jZS8yMDE5LTEwL21zZzAwMDA5Lmh0bWwnLFxuICAgICAgICAgICdodHRwOi8vbGlzdHMub3BlbnN1c2Uub3JnL29wZW5zdXNlLXNlY3VyaXR5LWFubm91bmNlLzIwMTktMTAvbXNnMDAwMTAuaHRtbCcsXG4gICAgICAgICAgJ2h0dHA6Ly9saXN0cy5vcGVuc3VzZS5vcmcvb3BlbnN1c2Utc2VjdXJpdHktYW5ub3VuY2UvMjAxOS0xMC9tc2cwMDAxMS5odG1sJyxcbiAgICAgICAgICAnaHR0cDovL2xpc3RzLm9wZW5zdXNlLm9yZy9vcGVuc3VzZS1zZWN1cml0eS1hbm5vdW5jZS8yMDE5LTEwL21zZzAwMDE3Lmh0bWwnLFxuICAgICAgICAgICdodHRwOi8vbGlzdHMub3BlbnN1c2Uub3JnL29wZW5zdXNlLXNlY3VyaXR5LWFubm91bmNlLzIwMjAtMDEvbXNnMDAwMDYuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vYWNjZXNzLnJlZGhhdC5jb20vZXJyYXRhL1JIU0EtMjAxOToxOTUxJyxcbiAgICAgICAgICAnaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTU1MjIwOCcsXG4gICAgICAgICAgJ2h0dHBzOi8vc2VjdXJpdHkuZ2VudG9vLm9yZy9nbHNhLzIwMTkwOC0xMicsXG4gICAgICAgICAgJ2h0dHBzOi8vd3d3Lm1vemlsbGEub3JnL3NlY3VyaXR5L2Fkdmlzb3JpZXMvbWZzYTIwMTktMjEvJyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMTktMTE3MjcnLFxuICAgICAgICAgICdodHRwOi8vcGVvcGxlLmNhbm9uaWNhbC5jb20vfnVidW50dS1zZWN1cml0eS9jdmUvMjAxOS9DVkUtMjAxOS0xMTcyNy5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9jdmUubWl0cmUub3JnL2NnaS1iaW4vY3ZlbmFtZS5jZ2k/bmFtZT1DVkUtMjAxOS0xMTcyNycsXG4gICAgICAgICAgJ2h0dHBzOi8vdXNuLnVidW50dS5jb20vdXNuL3Vzbi00MDU0LTEnLFxuICAgICAgICAgICdodHRwczovL3Vzbi51YnVudHUuY29tL3Vzbi91c24tNDA2MC0xJyxcbiAgICAgICAgICAnaHR0cHM6Ly93d3cubW96aWxsYS5vcmcvZW4tVVMvc2VjdXJpdHkvYWR2aXNvcmllcy9tZnNhMjAxOS0yMS8jQ1ZFLTIwMTktMTE3MjcnLFxuICAgICAgICBdLFxuICAgICAgICBhc3NpZ25lcjogJ2N2ZUBtaXRyZS5vcmcnLFxuICAgICAgICBjdmVfdmVyc2lvbjogJzQuMCcsXG4gICAgICAgIHN0YXR1czogJ0FjdGl2ZScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBydWxlOiB7XG4gICAgICBsZXZlbDogMTAsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NWRS0yMDE5LTE4Mjc2IGFmZmVjdHMgYmFzaCcsXG4gICAgICBpZDogJzIzNTA1JyxcbiAgICAgIGZpcmVkdGltZXM6IDE1OCxcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdiYXNoJyxcbiAgICAgICAgICB2ZXJzaW9uOiAnNC4zLTE0dWJ1bnR1MS40JyxcbiAgICAgICAgICBhcmNoaXRlY3R1cmU6ICdhbWQ2NCcsXG4gICAgICAgICAgY29uZGl0aW9uOiAnUGFja2FnZSBsZXNzIG9yIGVxdWFsIHRoYW4gNS4wJyxcbiAgICAgICAgfSxcbiAgICAgICAgY3Zzczoge1xuICAgICAgICAgIGN2c3MyOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ2xvY2FsJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdsb3cnLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAnY29tcGxldGUnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAnY29tcGxldGUnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdjb21wbGV0ZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzcuMjAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjdmU6ICdDVkUtMjAxOS0xODI3NicsXG4gICAgICAgIHRpdGxlOiAnQ1ZFLTIwMTktMTgyNzYgb24gVWJ1bnR1IDE2LjA0IExUUyAoeGVuaWFsKSAtIGxvdy4nLFxuICAgICAgICByYXRpb25hbGU6XG4gICAgICAgICAgJ0FuIGlzc3VlIHdhcyBkaXNjb3ZlcmVkIGluIGRpc2FibGVfcHJpdl9tb2RlIGluIHNoZWxsLmMgaW4gR05VIEJhc2ggdGhyb3VnaCA1LjAgcGF0Y2ggMTEuIEJ5IGRlZmF1bHQsIGlmIEJhc2ggaXMgcnVuIHdpdGggaXRzIGVmZmVjdGl2ZSBVSUQgbm90IGVxdWFsIHRvIGl0cyByZWFsIFVJRCwgaXQgd2lsbCBkcm9wIHByaXZpbGVnZXMgYnkgc2V0dGluZyBpdHMgZWZmZWN0aXZlIFVJRCB0byBpdHMgcmVhbCBVSUQuIEhvd2V2ZXIsIGl0IGRvZXMgc28gaW5jb3JyZWN0bHkuIE9uIExpbnV4IGFuZCBvdGhlciBzeXN0ZW1zIHRoYXQgc3VwcG9ydCBcInNhdmVkIFVJRFwiIGZ1bmN0aW9uYWxpdHksIHRoZSBzYXZlZCBVSUQgaXMgbm90IGRyb3BwZWQuIEFuIGF0dGFja2VyIHdpdGggY29tbWFuZCBleGVjdXRpb24gaW4gdGhlIHNoZWxsIGNhbiB1c2UgXCJlbmFibGUgLWZcIiBmb3IgcnVudGltZSBsb2FkaW5nIG9mIGEgbmV3IGJ1aWx0aW4sIHdoaWNoIGNhbiBiZSBhIHNoYXJlZCBvYmplY3QgdGhhdCBjYWxscyBzZXR1aWQoKSBhbmQgdGhlcmVmb3JlIHJlZ2FpbnMgcHJpdmlsZWdlcy4gSG93ZXZlciwgYmluYXJpZXMgcnVubmluZyB3aXRoIGFuIGVmZmVjdGl2ZSBVSUQgb2YgMCBhcmUgdW5hZmZlY3RlZC4nLFxuICAgICAgICBzZXZlcml0eTogJ0hpZ2gnLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDE5LTExLTI4JyxcbiAgICAgICAgdXBkYXRlZDogJzIwMjAtMDQtMzAnLFxuICAgICAgICBzdGF0ZTogJ0ZpeGVkJyxcbiAgICAgICAgY3dlX3JlZmVyZW5jZTogJ0NXRS0yNzMnLFxuICAgICAgICBidWd6aWxsYV9yZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHBzOi8vYnVnemlsbGEuc3VzZS5jb20vc2hvd19idWcuY2dpP2lkPTExNTgwMjgnLFxuICAgICAgICBdLFxuICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHA6Ly9wYWNrZXRzdG9ybXNlY3VyaXR5LmNvbS9maWxlcy8xNTU0OTgvQmFzaC01LjAtUGF0Y2gtMTEtUHJpdmlsZWdlLUVzY2FsYXRpb24uaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9ibWlub3IvYmFzaC9jb21taXQvOTUxYmRhYWQ3YTE4Y2MwZGMxMDM2YmJhODZiMThiOTA4NzRkMzlmZicsXG4gICAgICAgICAgJ2h0dHBzOi8vc2VjdXJpdHkubmV0YXBwLmNvbS9hZHZpc29yeS9udGFwLTIwMjAwNDMwLTAwMDMvJyxcbiAgICAgICAgICAnaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj0td0d0eEo4b3BhOCcsXG4gICAgICAgICAgJ2h0dHBzOi8vbnZkLm5pc3QuZ292L3Z1bG4vZGV0YWlsL0NWRS0yMDE5LTE4Mjc2JyxcbiAgICAgICAgICAnaHR0cDovL3Blb3BsZS5jYW5vbmljYWwuY29tL351YnVudHUtc2VjdXJpdHkvY3ZlLzIwMTkvQ1ZFLTIwMTktMTgyNzYuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vY3ZlLm1pdHJlLm9yZy9jZ2ktYmluL2N2ZW5hbWUuY2dpP25hbWU9Q1ZFLTIwMTktMTgyNzYnLFxuICAgICAgICBdLFxuICAgICAgICBhc3NpZ25lcjogJ2N2ZUBtaXRyZS5vcmcnLFxuICAgICAgICBjdmVfdmVyc2lvbjogJzQuMCcsXG4gICAgICAgIHN0YXR1czogJ0FjdGl2ZScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBydWxlOiB7XG4gICAgICBsZXZlbDogNyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ1ZFLTIwMTctOTUwMiBhZmZlY3RzIGN1cmwnLFxuICAgICAgaWQ6ICcyMzUwNCcsXG4gICAgICBmaXJlZHRpbWVzOiAzMzQsXG4gICAgfSxcbiAgICBkYXRhOiB7XG4gICAgICB2dWxuZXJhYmlsaXR5OiB7XG4gICAgICAgIHBhY2thZ2U6IHtcbiAgICAgICAgICBuYW1lOiAnY3VybCcsXG4gICAgICAgICAgdmVyc2lvbjogJzcuNDcuMC0xdWJ1bnR1Mi4xNCcsXG4gICAgICAgICAgYXJjaGl0ZWN0dXJlOiAnYW1kNjQnLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ1BhY2thZ2UgbGVzcyBvciBlcXVhbCB0aGFuIDcuNTQuMCcsXG4gICAgICAgIH0sXG4gICAgICAgIGN2c3M6IHtcbiAgICAgICAgICBjdnNzMjoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICduZXR3b3JrJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdsb3cnLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAnbm9uZScsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAncGFydGlhbCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzUnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY3ZzczM6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbmV0d29yaycsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbG93JyxcbiAgICAgICAgICAgICAgcHJpdmlsZWdlc19yZXF1aXJlZDogJ25vbmUnLFxuICAgICAgICAgICAgICB1c2VyX2ludGVyYWN0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIHNjb3BlOiAndW5jaGFuZ2VkJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ25vbmUnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAnbm9uZScsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ2xvdycsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzUuMzAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjdmU6ICdDVkUtMjAxNy05NTAyJyxcbiAgICAgICAgdGl0bGU6XG4gICAgICAgICAgJ0luIGN1cmwgYmVmb3JlIDcuNTQuMSBvbiBXaW5kb3dzIGFuZCBET1MsIGxpYmN1cmxcXCdzIGRlZmF1bHQgcHJvdG9jb2wgZnVuY3Rpb24sIHdoaWNoIGlzIHRoZSBsb2dpYyB0aGF0IGFsbG93cyBhbiBhcHBsaWNhdGlvbiB0byBzZXQgd2hpY2ggcHJvdG9jb2wgbGliY3VybCBzaG91bGQgYXR0ZW1wdCB0byB1c2Ugd2hlbiBnaXZlbiBhIFVSTCB3aXRob3V0IGEgc2NoZW1lIHBhcnQsIGhhZCBhIGZsYXcgdGhhdCBjb3VsZCBsZWFkIHRvIGl0IG92ZXJ3cml0aW5nIGEgaGVhcCBiYXNlZCBtZW1vcnkgYnVmZmVyIHdpdGggc2V2ZW4gYnl0ZXMuIElmIHRoZSBkZWZhdWx0IHByb3RvY29sIGlzIHNwZWNpZmllZCB0byBiZSBGSUxFIG9yIGEgZmlsZTogVVJMIGxhY2tzIHR3byBzbGFzaGVzLCB0aGUgZ2l2ZW4gXCJVUkxcIiBzdGFydHMgd2l0aCBhIGRyaXZlIGxldHRlciwgYW5kIGxpYmN1cmwgaXMgYnVpbHQgZm9yIFdpbmRvd3Mgb3IgRE9TLCB0aGVuIGxpYmN1cmwgd291bGQgY29weSB0aGUgcGF0aCA3IGJ5dGVzIG9mZiwgc28gdGhhdCB0aGUgZW5kIG9mIHRoZSBnaXZlbiBwYXRoIHdvdWxkIHdyaXRlIGJleW9uZCB0aGUgbWFsbG9jIGJ1ZmZlciAoNyBieXRlcyBiZWluZyB0aGUgbGVuZ3RoIGluIGJ5dGVzIG9mIHRoZSBhc2NpaSBzdHJpbmcgXCJmaWxlOi8vXCIpLicsXG4gICAgICAgIHNldmVyaXR5OiAnTWVkaXVtJyxcbiAgICAgICAgcHVibGlzaGVkOiAnMjAxNy0wNi0xNCcsXG4gICAgICAgIHVwZGF0ZWQ6ICcyMDE3LTA3LTA4JyxcbiAgICAgICAgc3RhdGU6ICdGaXhlZCcsXG4gICAgICAgIGN3ZV9yZWZlcmVuY2U6ICdDV0UtMTE5JyxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vb3BlbndhbGwuY29tL2xpc3RzL29zcy1zZWN1cml0eS8yMDE3LzA2LzE0LzEnLFxuICAgICAgICAgICdodHRwOi8vd3d3LnNlY3VyaXR5Zm9jdXMuY29tL2JpZC85OTEyMCcsXG4gICAgICAgICAgJ2h0dHA6Ly93d3cuc2VjdXJpdHl0cmFja2VyLmNvbS9pZC8xMDM4Njk3JyxcbiAgICAgICAgICAnaHR0cHM6Ly9jdXJsLmhheHguc2UvZG9jcy9hZHZfMjAxNzA2MTQuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vbnZkLm5pc3QuZ292L3Z1bG4vZGV0YWlsL0NWRS0yMDE3LTk1MDInLFxuICAgICAgICBdLFxuICAgICAgICBhc3NpZ25lcjogJ2N2ZUBtaXRyZS5vcmcnLFxuICAgICAgICBjdmVfdmVyc2lvbjogJzQuMCcsXG4gICAgICAgIHN0YXR1czogJ0FjdGl2ZScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBydWxlOiB7XG4gICAgICBsZXZlbDogMTAsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NWRS0yMDE4LTIwNDgzIGFmZmVjdHMgd2dldCcsXG4gICAgICBpZDogJzIzNTA1JyxcbiAgICAgIGZpcmVkdGltZXM6IDE3NSxcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICd3Z2V0JyxcbiAgICAgICAgICB2ZXJzaW9uOiAnMS4xNy4xLTF1YnVudHUxLjUnLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIGxlc3MgdGhhbiAxLjIwLjEnLFxuICAgICAgICB9LFxuICAgICAgICBjdnNzOiB7XG4gICAgICAgICAgY3ZzczI6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbG9jYWwnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ25vbmUnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdub25lJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnMi4xMDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY3ZzczM6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbG9jYWwnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIHByaXZpbGVnZXNfcmVxdWlyZWQ6ICdsb3cnLFxuICAgICAgICAgICAgICB1c2VyX2ludGVyYWN0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIHNjb3BlOiAndW5jaGFuZ2VkJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ2hpZ2gnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAnaGlnaCcsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ2hpZ2gnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc3LjgwMDAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY3ZlOiAnQ1ZFLTIwMTgtMjA0ODMnLFxuICAgICAgICB0aXRsZTpcbiAgICAgICAgICBcInNldF9maWxlX21ldGFkYXRhIGluIHhhdHRyLmMgaW4gR05VIFdnZXQgYmVmb3JlIDEuMjAuMSBzdG9yZXMgYSBmaWxlJ3Mgb3JpZ2luIFVSTCBpbiB0aGUgdXNlci54ZGcub3JpZ2luLnVybCBtZXRhZGF0YSBhdHRyaWJ1dGUgb2YgdGhlIGV4dGVuZGVkIGF0dHJpYnV0ZXMgb2YgdGhlIGRvd25sb2FkZWQgZmlsZSwgd2hpY2ggYWxsb3dzIGxvY2FsIHVzZXJzIHRvIG9idGFpbiBzZW5zaXRpdmUgaW5mb3JtYXRpb24gKGUuZy4sIGNyZWRlbnRpYWxzIGNvbnRhaW5lZCBpbiB0aGUgVVJMKSBieSByZWFkaW5nIHRoaXMgYXR0cmlidXRlLCBhcyBkZW1vbnN0cmF0ZWQgYnkgZ2V0ZmF0dHIuIFRoaXMgYWxzbyBhcHBsaWVzIHRvIFJlZmVyZXIgaW5mb3JtYXRpb24gaW4gdGhlIHVzZXIueGRnLnJlZmVycmVyLnVybCBtZXRhZGF0YSBhdHRyaWJ1dGUuIEFjY29yZGluZyB0byAyMDE2LTA3LTIyIGluIHRoZSBXZ2V0IENoYW5nZUxvZywgdXNlci54ZGcub3JpZ2luLnVybCB3YXMgcGFydGlhbGx5IGJhc2VkIG9uIHRoZSBiZWhhdmlvciBvZiBmd3JpdGVfeGF0dHIgaW4gdG9vbF94YXR0ci5jIGluIGN1cmwuXCIsXG4gICAgICAgIHNldmVyaXR5OiAnSGlnaCcsXG4gICAgICAgIHB1Ymxpc2hlZDogJzIwMTgtMTItMjYnLFxuICAgICAgICB1cGRhdGVkOiAnMjAxOS0wNC0wOScsXG4gICAgICAgIHN0YXRlOiAnRml4ZWQnLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnQ1dFLTI1NScsXG4gICAgICAgIHJlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cDovL2dpdC5zYXZhbm5haC5nbnUub3JnL2NnaXQvd2dldC5naXQvdHJlZS9ORVdTJyxcbiAgICAgICAgICAnaHR0cDovL3d3dy5zZWN1cml0eWZvY3VzLmNvbS9iaWQvMTA2MzU4JyxcbiAgICAgICAgICAnaHR0cHM6Ly9hY2Nlc3MucmVkaGF0LmNvbS9lcnJhdGEvUkhTQS0yMDE5OjM3MDEnLFxuICAgICAgICAgICdodHRwczovL3NlY3VyaXR5LmdlbnRvby5vcmcvZ2xzYS8yMDE5MDMtMDgnLFxuICAgICAgICAgICdodHRwczovL3NlY3VyaXR5Lm5ldGFwcC5jb20vYWR2aXNvcnkvbnRhcC0yMDE5MDMyMS0wMDAyLycsXG4gICAgICAgICAgJ2h0dHBzOi8vdHdpdHRlci5jb20vbWFyY2FuNDIvc3RhdHVzLzEwNzc2NzY3Mzk4NzcyMzI2NDAnLFxuICAgICAgICAgICdodHRwczovL3Vzbi51YnVudHUuY29tLzM5NDMtMS8nLFxuICAgICAgICAgICdodHRwczovL252ZC5uaXN0Lmdvdi92dWxuL2RldGFpbC9DVkUtMjAxOC0yMDQ4MycsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiA3LFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAxOS0xMDEwMjA0IGFmZmVjdHMgYmludXRpbHMnLFxuICAgICAgaWQ6ICcyMzUwNCcsXG4gICAgICBmaXJlZHRpbWVzOiAzNjksXG4gICAgfSxcbiAgICBkYXRhOiB7XG4gICAgICB2dWxuZXJhYmlsaXR5OiB7XG4gICAgICAgIHBhY2thZ2U6IHtcbiAgICAgICAgICBuYW1lOiAnYmludXRpbHMnLFxuICAgICAgICAgIHZlcnNpb246ICcyLjI2LjEtMXVidW50dTF+MTYuMDQuOCcsXG4gICAgICAgICAgYXJjaGl0ZWN0dXJlOiAnYW1kNjQnLFxuICAgICAgICAgIGNvbmRpdGlvbjpcbiAgICAgICAgICAgICdQYWNrYWdlIGdyZWF0ZXIgb3IgZXF1YWwgdGhhbiAyLjIxIGFuZCBsZXNzIG9yIGVxdWFsIHRoYW4gMi4zMS4xJyxcbiAgICAgICAgfSxcbiAgICAgICAgY3Zzczoge1xuICAgICAgICAgIGN2c3MyOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ25ldHdvcmsnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ21lZGl1bScsXG4gICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ25vbmUnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNC4zMDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY3ZzczM6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbG9jYWwnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIHByaXZpbGVnZXNfcmVxdWlyZWQ6ICdub25lJyxcbiAgICAgICAgICAgICAgdXNlcl9pbnRlcmFjdGlvbjogJ3JlcXVpcmVkJyxcbiAgICAgICAgICAgICAgc2NvcGU6ICd1bmNoYW5nZWQnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAnbm9uZScsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAnaGlnaCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzUuNTAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjdmU6ICdDVkUtMjAxOS0xMDEwMjA0JyxcbiAgICAgICAgdGl0bGU6ICdDVkUtMjAxOS0xMDEwMjA0IG9uIFVidW50dSAxNi4wNCBMVFMgKHhlbmlhbCkgLSBsb3cuJyxcbiAgICAgICAgcmF0aW9uYWxlOlxuICAgICAgICAgICdHTlUgYmludXRpbHMgZ29sZCBnb2xkIHYxLjExLXYxLjE2IChHTlUgYmludXRpbHMgdjIuMjEtdjIuMzEuMSkgaXMgYWZmZWN0ZWQgYnk6IEltcHJvcGVyIElucHV0IFZhbGlkYXRpb24sIFNpZ25lZC9VbnNpZ25lZCBDb21wYXJpc29uLCBPdXQtb2YtYm91bmRzIFJlYWQuIFRoZSBpbXBhY3QgaXM6IERlbmlhbCBvZiBzZXJ2aWNlLiBUaGUgY29tcG9uZW50IGlzOiBnb2xkL2ZpbGVyZWFkLmNjOjQ5NywgZWxmY3BwL2VsZmNwcF9maWxlLmg6NjQ0LiBUaGUgYXR0YWNrIHZlY3RvciBpczogQW4gRUxGIGZpbGUgd2l0aCBhbiBpbnZhbGlkIGVfc2hvZmYgaGVhZGVyIGZpZWxkIG11c3QgYmUgb3BlbmVkLicsXG4gICAgICAgIHNldmVyaXR5OiAnTWVkaXVtJyxcbiAgICAgICAgcHVibGlzaGVkOiAnMjAxOS0wNy0yMycsXG4gICAgICAgIHVwZGF0ZWQ6ICcyMDE5LTA4LTIyJyxcbiAgICAgICAgc3RhdGU6ICdGaXhlZCcsXG4gICAgICAgIGN3ZV9yZWZlcmVuY2U6ICdDV0UtMTI1JyxcbiAgICAgICAgYnVnemlsbGFfcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwczovL3NvdXJjZXdhcmUub3JnL2J1Z3ppbGxhL3Nob3dfYnVnLmNnaT9pZD0yMzc2NScsXG4gICAgICAgIF0sXG4gICAgICAgIHJlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cHM6Ly9zZWN1cml0eS5uZXRhcHAuY29tL2Fkdmlzb3J5L250YXAtMjAxOTA4MjItMDAwMS8nLFxuICAgICAgICAgICdodHRwczovL3NvdXJjZXdhcmUub3JnL2J1Z3ppbGxhL3Nob3dfYnVnLmNnaT9pZD0yMzc2NScsXG4gICAgICAgICAgJ2h0dHBzOi8vc3VwcG9ydC5mNS5jb20vY3NwL2FydGljbGUvSzA1MDMyOTE1P3V0bV9zb3VyY2U9ZjVzdXBwb3J0JmFtcDt1dG1fbWVkaXVtPVJTUycsXG4gICAgICAgICAgJ2h0dHBzOi8vbnZkLm5pc3QuZ292L3Z1bG4vZGV0YWlsL0NWRS0yMDE5LTEwMTAyMDQnLFxuICAgICAgICAgICdodHRwOi8vcGVvcGxlLmNhbm9uaWNhbC5jb20vfnVidW50dS1zZWN1cml0eS9jdmUvMjAxOS9DVkUtMjAxOS0xMDEwMjA0Lmh0bWwnLFxuICAgICAgICAgICdodHRwczovL2N2ZS5taXRyZS5vcmcvY2dpLWJpbi9jdmVuYW1lLmNnaT9uYW1lPUNWRS0yMDE5LTEwMTAyMDQnLFxuICAgICAgICBdLFxuICAgICAgICBhc3NpZ25lcjogJ2N2ZUBtaXRyZS5vcmcnLFxuICAgICAgICBjdmVfdmVyc2lvbjogJzQuMCcsXG4gICAgICAgIHN0YXR1czogJ0FjdGl2ZScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBydWxlOiB7XG4gICAgICBsZXZlbDogNyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ1ZFLTIwMTktMTQ4NTUgYWZmZWN0cyBkaXJtbmdyJyxcbiAgICAgIGlkOiAnMjM1MDQnLFxuICAgICAgZmlyZWR0aW1lczogMzgyLFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgdnVsbmVyYWJpbGl0eToge1xuICAgICAgICBwYWNrYWdlOiB7XG4gICAgICAgICAgbmFtZTogJ2Rpcm1uZ3InLFxuICAgICAgICAgIHNvdXJjZTogJ2dudXBnMicsXG4gICAgICAgICAgdmVyc2lvbjogJzIuMS4xMS02dWJ1bnR1Mi4xJyxcbiAgICAgICAgICBhcmNoaXRlY3R1cmU6ICdhbWQ2NCcsXG4gICAgICAgICAgY29uZGl0aW9uOiAnUGFja2FnZSB1bmZpeGVkJyxcbiAgICAgICAgfSxcbiAgICAgICAgY3Zzczoge1xuICAgICAgICAgIGN2c3MyOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ25ldHdvcmsnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ25vbmUnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdub25lJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNScsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY3ZlOiAnQ1ZFLTIwMTktMTQ4NTUnLFxuICAgICAgICB0aXRsZTogJ0NWRS0yMDE5LTE0ODU1IG9uIFVidW50dSAxNi4wNCBMVFMgKHhlbmlhbCkgLSBsb3cuJyxcbiAgICAgICAgcmF0aW9uYWxlOlxuICAgICAgICAgICdBIGZsYXcgd2FzIGZvdW5kIGluIHRoZSB3YXkgY2VydGlmaWNhdGUgc2lnbmF0dXJlcyBjb3VsZCBiZSBmb3JnZWQgdXNpbmcgY29sbGlzaW9ucyBmb3VuZCBpbiB0aGUgU0hBLTEgYWxnb3JpdGhtLiBBbiBhdHRhY2tlciBjb3VsZCB1c2UgdGhpcyB3ZWFrbmVzcyB0byBjcmVhdGUgZm9yZ2VkIGNlcnRpZmljYXRlIHNpZ25hdHVyZXMuIFRoaXMgaXNzdWUgYWZmZWN0cyBHbnVQRyB2ZXJzaW9ucyBiZWZvcmUgMi4yLjE4LicsXG4gICAgICAgIHNldmVyaXR5OiAnTWVkaXVtJyxcbiAgICAgICAgcHVibGlzaGVkOiAnMjAyMC0wMy0yMCcsXG4gICAgICAgIHVwZGF0ZWQ6ICcyMDIwLTAzLTI0JyxcbiAgICAgICAgc3RhdGU6ICdVbmZpeGVkJyxcbiAgICAgICAgY3dlX3JlZmVyZW5jZTogJ0NXRS0zMjcnLFxuICAgICAgICBidWd6aWxsYV9yZWZlcmVuY2VzOiBbJ2h0dHBzOi8vZGV2LmdudXBnLm9yZy9UNDc1NSddLFxuICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHBzOi8vYnVnemlsbGEucmVkaGF0LmNvbS9zaG93X2J1Zy5jZ2k/aWQ9Q1ZFLTIwMTktMTQ4NTUnLFxuICAgICAgICAgICdodHRwczovL2Rldi5nbnVwZy5vcmcvVDQ3NTUnLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLmdudXBnLm9yZy9waXBlcm1haWwvZ251cGctYW5ub3VuY2UvMjAxOXE0LzAwMDQ0Mi5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9yd2MuaWFjci5vcmcvMjAyMC9zbGlkZXMvTGV1cmVudC5wZGYnLFxuICAgICAgICAgICdodHRwczovL252ZC5uaXN0Lmdvdi92dWxuL2RldGFpbC9DVkUtMjAxOS0xNDg1NScsXG4gICAgICAgICAgJ2h0dHA6Ly9wZW9wbGUuY2Fub25pY2FsLmNvbS9+dWJ1bnR1LXNlY3VyaXR5L2N2ZS8yMDE5L0NWRS0yMDE5LTE0ODU1Lmh0bWwnLFxuICAgICAgICAgICdodHRwczovL2N2ZS5taXRyZS5vcmcvY2dpLWJpbi9jdmVuYW1lLmNnaT9uYW1lPUNWRS0yMDE5LTE0ODU1JyxcbiAgICAgICAgICAnaHR0cHM6Ly9lcHJpbnQuaWFjci5vcmcvMjAyMC8wMTQucGRmJyxcbiAgICAgICAgXSxcbiAgICAgICAgYXNzaWduZXI6ICdjdmVAbWl0cmUub3JnJyxcbiAgICAgICAgY3ZlX3ZlcnNpb246ICc0LjAnLFxuICAgICAgICBzdGF0dXM6ICdBY3RpdmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDcsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NWRS0yMDE2LTUwMTEgYWZmZWN0cyB1dWlkLXJ1bnRpbWUnLFxuICAgICAgaWQ6ICcyMzUwNCcsXG4gICAgICBmaXJlZHRpbWVzOiAzOTUsXG4gICAgfSxcbiAgICBkYXRhOiB7XG4gICAgICB2dWxuZXJhYmlsaXR5OiB7XG4gICAgICAgIHBhY2thZ2U6IHtcbiAgICAgICAgICBuYW1lOiAndXVpZC1ydW50aW1lJyxcbiAgICAgICAgICBzb3VyY2U6ICd1dGlsLWxpbnV4JyxcbiAgICAgICAgICB2ZXJzaW9uOiAnMi4yNy4xLTZ1YnVudHUzLjEwJyxcbiAgICAgICAgICBhcmNoaXRlY3R1cmU6ICdhbWQ2NCcsXG4gICAgICAgICAgY29uZGl0aW9uOiAnUGFja2FnZSB1bmZpeGVkJyxcbiAgICAgICAgfSxcbiAgICAgICAgY3Zzczoge1xuICAgICAgICAgIGN2c3MyOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ2xvY2FsJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdtZWRpdW0nLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAnbm9uZScsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAnY29tcGxldGUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc0LjcwMDAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjdnNzMzoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICdwaHlzaWNhbCcsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbG93JyxcbiAgICAgICAgICAgICAgcHJpdmlsZWdlc19yZXF1aXJlZDogJ25vbmUnLFxuICAgICAgICAgICAgICB1c2VyX2ludGVyYWN0aW9uOiAncmVxdWlyZWQnLFxuICAgICAgICAgICAgICBzY29wZTogJ3VuY2hhbmdlZCcsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ25vbmUnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdoaWdoJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNC4zMDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDE2LTUwMTEnLFxuICAgICAgICB0aXRsZTogJ0NWRS0yMDE2LTUwMTEgb24gVWJ1bnR1IDE2LjA0IExUUyAoeGVuaWFsKSAtIGxvdy4nLFxuICAgICAgICByYXRpb25hbGU6XG4gICAgICAgICAgJ1RoZSBwYXJzZV9kb3NfZXh0ZW5kZWQgZnVuY3Rpb24gaW4gcGFydGl0aW9ucy9kb3MuYyBpbiB0aGUgbGliYmxraWQgbGlicmFyeSBpbiB1dGlsLWxpbnV4IGFsbG93cyBwaHlzaWNhbGx5IHByb3hpbWF0ZSBhdHRhY2tlcnMgdG8gY2F1c2UgYSBkZW5pYWwgb2Ygc2VydmljZSAobWVtb3J5IGNvbnN1bXB0aW9uKSB2aWEgYSBjcmFmdGVkIE1TRE9TIHBhcnRpdGlvbiB0YWJsZSB3aXRoIGFuIGV4dGVuZGVkIHBhcnRpdGlvbiBib290IHJlY29yZCBhdCB6ZXJvIG9mZnNldC4nLFxuICAgICAgICBzZXZlcml0eTogJ01lZGl1bScsXG4gICAgICAgIHB1Ymxpc2hlZDogJzIwMTctMDQtMTEnLFxuICAgICAgICB1cGRhdGVkOiAnMjAxNy0wNC0xNycsXG4gICAgICAgIHN0YXRlOiAnVW5maXhlZCcsXG4gICAgICAgIGN3ZV9yZWZlcmVuY2U6ICdDV0UtMzk5JyxcbiAgICAgICAgYnVnemlsbGFfcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vYnVncy5kZWJpYW4ub3JnL2NnaS1iaW4vYnVncmVwb3J0LmNnaT9idWc9ODMwODAyJyxcbiAgICAgICAgICAnaHR0cHM6Ly9idWd6aWxsYS5yZWRoYXQuY29tL3Nob3dfYnVnLmNnaT9pZD0xMzQ5NTM2JyxcbiAgICAgICAgXSxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vcmhuLnJlZGhhdC5jb20vZXJyYXRhL1JIU0EtMjAxNi0yNjA1Lmh0bWwnLFxuICAgICAgICAgICdodHRwOi8vd3d3Lm9wZW53YWxsLmNvbS9saXN0cy9vc3Mtc2VjdXJpdHkvMjAxNi8wNy8xMS8yJyxcbiAgICAgICAgICAnaHR0cDovL3d3dy5zZWN1cml0eWZvY3VzLmNvbS9iaWQvOTE2ODMnLFxuICAgICAgICAgICdodHRwOi8vd3d3LnNlY3VyaXR5dHJhY2tlci5jb20vaWQvMTAzNjI3MicsXG4gICAgICAgICAgJ2h0dHA6Ly93d3ctMDEuaWJtLmNvbS9zdXBwb3J0L2RvY3ZpZXcud3NzP3VpZD1pc2czVDEwMjQ1NDMnLFxuICAgICAgICAgICdodHRwOi8vd3d3LTAxLmlibS5jb20vc3VwcG9ydC9kb2N2aWV3Lndzcz91aWQ9bmFzOE4xMDIxODAxJyxcbiAgICAgICAgICAnaHR0cHM6Ly9naXQua2VybmVsLm9yZy9wdWIvc2NtL3V0aWxzL3V0aWwtbGludXgvdXRpbC1saW51eC5naXQvY29tbWl0Lz9pZD03MTY0YTFjMycsXG4gICAgICAgICAgJ2h0dHBzOi8vbnZkLm5pc3QuZ292L3Z1bG4vZGV0YWlsL0NWRS0yMDE2LTUwMTEnLFxuICAgICAgICAgICdodHRwOi8vcGVvcGxlLmNhbm9uaWNhbC5jb20vfnVidW50dS1zZWN1cml0eS9jdmUvMjAxNi9DVkUtMjAxNi01MDExLmh0bWwnLFxuICAgICAgICAgICdodHRwczovL2N2ZS5taXRyZS5vcmcvY2dpLWJpbi9jdmVuYW1lLmNnaT9uYW1lPUNWRS0yMDE2LTUwMTEnLFxuICAgICAgICBdLFxuICAgICAgICBhc3NpZ25lcjogJ2N2ZUBtaXRyZS5vcmcnLFxuICAgICAgICBjdmVfdmVyc2lvbjogJzQuMCcsXG4gICAgICAgIHN0YXR1czogJ0FjdGl2ZScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBydWxlOiB7XG4gICAgICBsZXZlbDogNyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ1ZFLTIwMTUtNTE5MSBhZmZlY3RzIG9wZW4tdm0tdG9vbHMnLFxuICAgICAgaWQ6ICcyMzUwNCcsXG4gICAgICBmaXJlZHRpbWVzOiAzOTYsXG4gICAgfSxcbiAgICBkYXRhOiB7XG4gICAgICB2dWxuZXJhYmlsaXR5OiB7XG4gICAgICAgIHBhY2thZ2U6IHtcbiAgICAgICAgICBuYW1lOiAnb3Blbi12bS10b29scycsXG4gICAgICAgICAgdmVyc2lvbjogJzI6MTAuMi4wLTN+dWJ1bnR1MC4xNi4wNC4xJyxcbiAgICAgICAgICBhcmNoaXRlY3R1cmU6ICdhbWQ2NCcsXG4gICAgICAgICAgY29uZGl0aW9uOiAnUGFja2FnZSB1bmZpeGVkJyxcbiAgICAgICAgfSxcbiAgICAgICAgY3Zzczoge1xuICAgICAgICAgIGN2c3MyOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ2xvY2FsJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdoaWdoJyxcbiAgICAgICAgICAgICAgYXV0aGVudGljYXRpb246ICdub25lJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICczLjcwMDAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjdnNzMzoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICdsb2NhbCcsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnaGlnaCcsXG4gICAgICAgICAgICAgIHByaXZpbGVnZXNfcmVxdWlyZWQ6ICdsb3cnLFxuICAgICAgICAgICAgICB1c2VyX2ludGVyYWN0aW9uOiAncmVxdWlyZWQnLFxuICAgICAgICAgICAgICBzY29wZTogJ3VuY2hhbmdlZCcsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdoaWdoJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ2hpZ2gnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdoaWdoJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNi43MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDE1LTUxOTEnLFxuICAgICAgICB0aXRsZTogJ0NWRS0yMDE1LTUxOTEgb24gVWJ1bnR1IDE2LjA0IExUUyAoeGVuaWFsKSAtIGxvdy4nLFxuICAgICAgICByYXRpb25hbGU6XG4gICAgICAgICAgJ1ZNd2FyZSBUb29scyBwcmlvciB0byAxMC4wLjkgY29udGFpbnMgbXVsdGlwbGUgZmlsZSBzeXN0ZW0gcmFjZXMgaW4gbGliRGVwbG95UGtnLCByZWxhdGVkIHRvIHRoZSB1c2Ugb2YgaGFyZC1jb2RlZCBwYXRocyB1bmRlciAvdG1wLiBTdWNjZXNzZnVsIGV4cGxvaXRhdGlvbiBvZiB0aGlzIGlzc3VlIG1heSByZXN1bHQgaW4gYSBsb2NhbCBwcml2aWxlZ2UgZXNjYWxhdGlvbi4gQ1ZTUzozLjAvQVY6TC9BQzpIL1BSOkwvVUk6Ui9TOlUvQzpIL0k6SC9BOkgnLFxuICAgICAgICBzZXZlcml0eTogJ01lZGl1bScsXG4gICAgICAgIHB1Ymxpc2hlZDogJzIwMTctMDctMjgnLFxuICAgICAgICB1cGRhdGVkOiAnMjAxNy0wOC0wOCcsXG4gICAgICAgIHN0YXRlOiAnVW5maXhlZCcsXG4gICAgICAgIGN3ZV9yZWZlcmVuY2U6ICdDV0UtMzYyJyxcbiAgICAgICAgYnVnemlsbGFfcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vYnVncy5kZWJpYW4ub3JnL2NnaS1iaW4vYnVncmVwb3J0LmNnaT9idWc9ODY5NjMzJyxcbiAgICAgICAgXSxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vd3d3LnNlY3VyaXR5Zm9jdXMuY29tL2JpZC8xMDAwMTEnLFxuICAgICAgICAgICdodHRwOi8vd3d3LnNlY3VyaXR5dHJhY2tlci5jb20vaWQvMTAzOTAxMycsXG4gICAgICAgICAgJ2h0dHBzOi8vd3d3LnZtd2FyZS5jb20vc2VjdXJpdHkvYWR2aXNvcmllcy9WTVNBLTIwMTctMDAxMy5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMTUtNTE5MScsXG4gICAgICAgICAgJ2h0dHA6Ly9wZW9wbGUuY2Fub25pY2FsLmNvbS9+dWJ1bnR1LXNlY3VyaXR5L2N2ZS8yMDE1L0NWRS0yMDE1LTUxOTEuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vY3ZlLm1pdHJlLm9yZy9jZ2ktYmluL2N2ZW5hbWUuY2dpP25hbWU9Q1ZFLTIwMTUtNTE5MScsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiA3LFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAxOC04OTc1IGFmZmVjdHMgbmV0cGJtJyxcbiAgICAgIGlkOiAnMjM1MDQnLFxuICAgICAgZmlyZWR0aW1lczogMzk3LFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgdnVsbmVyYWJpbGl0eToge1xuICAgICAgICBwYWNrYWdlOiB7XG4gICAgICAgICAgbmFtZTogJ25ldHBibScsXG4gICAgICAgICAgc291cmNlOiAnbmV0cGJtLWZyZWUnLFxuICAgICAgICAgIHZlcnNpb246ICcyOjEwLjAtMTUuMycsXG4gICAgICAgICAgYXJjaGl0ZWN0dXJlOiAnYW1kNjQnLFxuICAgICAgICAgIGNvbmRpdGlvbjogJ1BhY2thZ2UgbGVzcyBvciBlcXVhbCB0aGFuIDEwLjgxLjAzJyxcbiAgICAgICAgfSxcbiAgICAgICAgY3Zzczoge1xuICAgICAgICAgIGN2c3MyOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ25ldHdvcmsnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ21lZGl1bScsXG4gICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ25vbmUnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNC4zMDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY3ZzczM6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbG9jYWwnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIHByaXZpbGVnZXNfcmVxdWlyZWQ6ICdub25lJyxcbiAgICAgICAgICAgICAgdXNlcl9pbnRlcmFjdGlvbjogJ3JlcXVpcmVkJyxcbiAgICAgICAgICAgICAgc2NvcGU6ICd1bmNoYW5nZWQnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAnbm9uZScsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdub25lJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAnaGlnaCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzUuNTAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjdmU6ICdDVkUtMjAxOC04OTc1JyxcbiAgICAgICAgdGl0bGU6XG4gICAgICAgICAgJ1RoZSBwbV9tYWxsb2NhcnJheTIgZnVuY3Rpb24gaW4gbGliL3V0aWwvbWFsbG9jdmFyLmMgaW4gTmV0cGJtIHRocm91Z2ggMTAuODEuMDMgYWxsb3dzIHJlbW90ZSBhdHRhY2tlcnMgdG8gY2F1c2UgYSBkZW5pYWwgb2Ygc2VydmljZSAoaGVhcC1iYXNlZCBidWZmZXIgb3Zlci1yZWFkKSB2aWEgYSBjcmFmdGVkIGltYWdlIGZpbGUsIGFzIGRlbW9uc3RyYXRlZCBieSBwYm1tYXNrLicsXG4gICAgICAgIHNldmVyaXR5OiAnTWVkaXVtJyxcbiAgICAgICAgcHVibGlzaGVkOiAnMjAxOC0wMy0yNScsXG4gICAgICAgIHVwZGF0ZWQ6ICcyMDE5LTEwLTAzJyxcbiAgICAgICAgc3RhdGU6ICdGaXhlZCcsXG4gICAgICAgIGN3ZV9yZWZlcmVuY2U6ICdDV0UtMTI1JyxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vbGlzdHMub3BlbnN1c2Uub3JnL29wZW5zdXNlLXNlY3VyaXR5LWFubm91bmNlLzIwMTktMDQvbXNnMDAwNTYuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS94aWFvcXgvcG9jcy9ibG9iL21hc3Rlci9uZXRwYm0nLFxuICAgICAgICAgICdodHRwczovL252ZC5uaXN0Lmdvdi92dWxuL2RldGFpbC9DVkUtMjAxOC04OTc1JyxcbiAgICAgICAgXSxcbiAgICAgICAgYXNzaWduZXI6ICdjdmVAbWl0cmUub3JnJyxcbiAgICAgICAgY3ZlX3ZlcnNpb246ICc0LjAnLFxuICAgICAgICBzdGF0dXM6ICdBY3RpdmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDcsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NWRS0yMDE5LTE5MjMyIGFmZmVjdHMgc3VkbycsXG4gICAgICBpZDogJzIzNTA0JyxcbiAgICAgIGZpcmVkdGltZXM6IDM5OCxcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdzdWRvJyxcbiAgICAgICAgICB2ZXJzaW9uOiAnMS44LjE2LTB1YnVudHUxLjknLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIGxlc3Mgb3IgZXF1YWwgdGhhbiAxLjguMjknLFxuICAgICAgICB9LFxuICAgICAgICBjdnNzOiB7XG4gICAgICAgICAgY3ZzczI6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbmV0d29yaycsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbG93JyxcbiAgICAgICAgICAgICAgYXV0aGVudGljYXRpb246ICdub25lJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ25vbmUnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ25vbmUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc1JyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjdmU6ICdDVkUtMjAxOS0xOTIzMicsXG4gICAgICAgIHRpdGxlOiAnQ1ZFLTIwMTktMTkyMzIgb24gVWJ1bnR1IDE2LjA0IExUUyAoeGVuaWFsKSAtIGxvdy4nLFxuICAgICAgICByYXRpb25hbGU6XG4gICAgICAgICAgJyoqIERJU1BVVEVEICoqIEluIFN1ZG8gdGhyb3VnaCAxLjguMjksIGFuIGF0dGFja2VyIHdpdGggYWNjZXNzIHRvIGEgUnVuYXMgQUxMIHN1ZG9lciBhY2NvdW50IGNhbiBpbXBlcnNvbmF0ZSBhIG5vbmV4aXN0ZW50IHVzZXIgYnkgaW52b2tpbmcgc3VkbyB3aXRoIGEgbnVtZXJpYyB1aWQgdGhhdCBpcyBub3QgYXNzb2NpYXRlZCB3aXRoIGFueSB1c2VyLiBOT1RFOiBUaGUgc29mdHdhcmUgbWFpbnRhaW5lciBiZWxpZXZlcyB0aGF0IHRoaXMgaXMgbm90IGEgdnVsbmVyYWJpbGl0eSBiZWNhdXNlIHJ1bm5pbmcgYSBjb21tYW5kIHZpYSBzdWRvIGFzIGEgdXNlciBub3QgcHJlc2VudCBpbiB0aGUgbG9jYWwgcGFzc3dvcmQgZGF0YWJhc2UgaXMgYW4gaW50ZW50aW9uYWwgZmVhdHVyZS4gQmVjYXVzZSB0aGlzIGJlaGF2aW9yIHN1cnByaXNlZCBzb21lIHVzZXJzLCBzdWRvIDEuOC4zMCBpbnRyb2R1Y2VkIGFuIG9wdGlvbiB0byBlbmFibGUvZGlzYWJsZSB0aGlzIGJlaGF2aW9yIHdpdGggdGhlIGRlZmF1bHQgYmVpbmcgZGlzYWJsZWQuIEhvd2V2ZXIsIHRoaXMgZG9lcyBub3QgY2hhbmdlIHRoZSBmYWN0IHRoYXQgc3VkbyB3YXMgYmVoYXZpbmcgYXMgaW50ZW5kZWQsIGFuZCBhcyBkb2N1bWVudGVkLCBpbiBlYXJsaWVyIHZlcnNpb25zLicsXG4gICAgICAgIHNldmVyaXR5OiAnTWVkaXVtJyxcbiAgICAgICAgcHVibGlzaGVkOiAnMjAxOS0xMi0xOScsXG4gICAgICAgIHVwZGF0ZWQ6ICcyMDIwLTAxLTMwJyxcbiAgICAgICAgc3RhdGU6ICdGaXhlZCcsXG4gICAgICAgIGN3ZV9yZWZlcmVuY2U6ICdOVkQtQ1dFLW5vaW5mbycsXG4gICAgICAgIGJ1Z3ppbGxhX3JlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cHM6Ly9idWdzLmRlYmlhbi5vcmcvY2dpLWJpbi9idWdyZXBvcnQuY2dpP2J1Zz05NDcyMjUnLFxuICAgICAgICBdLFxuICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHA6Ly9zZWNsaXN0cy5vcmcvZnVsbGRpc2Nsb3N1cmUvMjAyMC9NYXIvMzEnLFxuICAgICAgICAgICdodHRwczovL2FjY2Vzcy5yZWRoYXQuY29tL3NlY3VyaXR5L2N2ZS9jdmUtMjAxOS0xOTIzMicsXG4gICAgICAgICAgJ2h0dHBzOi8vbGlzdHMuZmVkb3JhcHJvamVjdC5vcmcvYXJjaGl2ZXMvbGlzdC9wYWNrYWdlLWFubm91bmNlQGxpc3RzLmZlZG9yYXByb2plY3Qub3JnL21lc3NhZ2UvSTZUS0YzNktPUVVWSk5CSFNWSkZBN0JVM0NDRVlEMkYvJyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5mZWRvcmFwcm9qZWN0Lm9yZy9hcmNoaXZlcy9saXN0L3BhY2thZ2UtYW5ub3VuY2VAbGlzdHMuZmVkb3JhcHJvamVjdC5vcmcvbWVzc2FnZS9JWTZEWjdXTURLVTRaRE1MNk1KTERBUEc0MkI1V1ZVQy8nLFxuICAgICAgICAgICdodHRwczovL3F1aWNrdmlldy5jbG91ZGFwcHMuY2lzY28uY29tL3F1aWNrdmlldy9idWcvQ1NDdnM1ODEwMycsXG4gICAgICAgICAgJ2h0dHBzOi8vcXVpY2t2aWV3LmNsb3VkYXBwcy5jaXNjby5jb20vcXVpY2t2aWV3L2J1Zy9DU0N2czU4ODEyJyxcbiAgICAgICAgICAnaHR0cHM6Ly9xdWlja3ZpZXcuY2xvdWRhcHBzLmNpc2NvLmNvbS9xdWlja3ZpZXcvYnVnL0NTQ3ZzNTg5NzknLFxuICAgICAgICAgICdodHRwczovL3F1aWNrdmlldy5jbG91ZGFwcHMuY2lzY28uY29tL3F1aWNrdmlldy9idWcvQ1NDdnM3Njg3MCcsXG4gICAgICAgICAgJ2h0dHBzOi8vc2VjdXJpdHkubmV0YXBwLmNvbS9hZHZpc29yeS9udGFwLTIwMjAwMTAzLTAwMDQvJyxcbiAgICAgICAgICAnaHR0cHM6Ly9zdXBwb3J0LmFwcGxlLmNvbS9lbi1nYi9IVDIxMTEwMCcsXG4gICAgICAgICAgJ2h0dHBzOi8vc3VwcG9ydC5hcHBsZS5jb20va2IvSFQyMTExMDAnLFxuICAgICAgICAgICdodHRwczovL3N1cHBvcnQyLndpbmRyaXZlci5jb20vaW5kZXgucGhwP3BhZ2U9Y3ZlJm9uPXZpZXcmaWQ9Q1ZFLTIwMTktMTkyMzInLFxuICAgICAgICAgICdodHRwczovL3N1cHBvcnQyLndpbmRyaXZlci5jb20vaW5kZXgucGhwP3BhZ2U9ZGVmZWN0cyZvbj12aWV3JmlkPUxJTjEwMTgtNTUwNicsXG4gICAgICAgICAgJ2h0dHBzOi8vd3d3LmJzaS5idW5kLmRlL1NoYXJlZERvY3MvV2Fybm1lbGR1bmdlbi9ERS9DQi8yMDE5LzEyL3dhcm5tZWxkdW5nX2NiLWsyMC0wMDAxLmh0bWwnLFxuICAgICAgICAgICdodHRwczovL3d3dy5vcmFjbGUuY29tL3NlY3VyaXR5LWFsZXJ0cy9idWxsZXRpbmFwcjIwMjAuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vd3d3LnN1ZG8ud3MvZGV2ZWwuaHRtbCMxLjguMzBiMicsXG4gICAgICAgICAgJ2h0dHBzOi8vd3d3LnN1ZG8ud3Mvc3RhYmxlLmh0bWwnLFxuICAgICAgICAgICdodHRwczovL3d3dy50ZW5hYmxlLmNvbS9wbHVnaW5zL25lc3N1cy8xMzM5MzYnLFxuICAgICAgICAgICdodHRwczovL252ZC5uaXN0Lmdvdi92dWxuL2RldGFpbC9DVkUtMjAxOS0xOTIzMicsXG4gICAgICAgICAgJ2h0dHA6Ly9wZW9wbGUuY2Fub25pY2FsLmNvbS9+dWJ1bnR1LXNlY3VyaXR5L2N2ZS8yMDE5L0NWRS0yMDE5LTE5MjMyLmh0bWwnLFxuICAgICAgICAgICdodHRwczovL2N2ZS5taXRyZS5vcmcvY2dpLWJpbi9jdmVuYW1lLmNnaT9uYW1lPUNWRS0yMDE5LTE5MjMyJyxcbiAgICAgICAgXSxcbiAgICAgICAgYXNzaWduZXI6ICdjdmVAbWl0cmUub3JnJyxcbiAgICAgICAgY3ZlX3ZlcnNpb246ICc0LjAnLFxuICAgICAgICBzdGF0dXM6ICdBY3RpdmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDEzLFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAxNy0xMjU4OCBhZmZlY3RzIHJzeXNsb2cnLFxuICAgICAgaWQ6ICcyMzUwNicsXG4gICAgICBmaXJlZHRpbWVzOiA2NCxcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdyc3lzbG9nJyxcbiAgICAgICAgICB2ZXJzaW9uOiAnOC4xNi4wLTF1YnVudHUzLjEnLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIGxlc3Mgb3IgZXF1YWwgdGhhbiA4LjI3LjAnLFxuICAgICAgICB9LFxuICAgICAgICBjdnNzOiB7XG4gICAgICAgICAgY3ZzczI6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbmV0d29yaycsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbG93JyxcbiAgICAgICAgICAgICAgYXV0aGVudGljYXRpb246ICdub25lJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc3LjUwMDAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjdnNzMzoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICduZXR3b3JrJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdsb3cnLFxuICAgICAgICAgICAgICBwcml2aWxlZ2VzX3JlcXVpcmVkOiAnbm9uZScsXG4gICAgICAgICAgICAgIHVzZXJfaW50ZXJhY3Rpb246ICdub25lJyxcbiAgICAgICAgICAgICAgc2NvcGU6ICd1bmNoYW5nZWQnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAnaGlnaCcsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdoaWdoJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAnaGlnaCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzkuODAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjdmU6ICdDVkUtMjAxNy0xMjU4OCcsXG4gICAgICAgIHRpdGxlOlxuICAgICAgICAgICdUaGUgem1xMyBpbnB1dCBhbmQgb3V0cHV0IG1vZHVsZXMgaW4gcnN5c2xvZyBiZWZvcmUgOC4yOC4wIGludGVycHJldGVkIGRlc2NyaXB0aW9uIGZpZWxkcyBhcyBmb3JtYXQgc3RyaW5ncywgcG9zc2libHkgYWxsb3dpbmcgYSBmb3JtYXQgc3RyaW5nIGF0dGFjayB3aXRoIHVuc3BlY2lmaWVkIGltcGFjdC4nLFxuICAgICAgICBzZXZlcml0eTogJ0NyaXRpY2FsJyxcbiAgICAgICAgcHVibGlzaGVkOiAnMjAxNy0wOC0wNicsXG4gICAgICAgIHVwZGF0ZWQ6ICcyMDE3LTA4LTE0JyxcbiAgICAgICAgc3RhdGU6ICdGaXhlZCcsXG4gICAgICAgIGN3ZV9yZWZlcmVuY2U6ICdDV0UtMTM0JyxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vcnN5c2xvZy9yc3lzbG9nL2Jsb2IvbWFzdGVyL0NoYW5nZUxvZycsXG4gICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9yc3lzbG9nL3JzeXNsb2cvY29tbWl0LzA2MmQwYzY3MWEyOWY3YzZmN2RmZjRhMmYxZjM1ZGYzNzViYmIzMGInLFxuICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vcnN5c2xvZy9yc3lzbG9nL3B1bGwvMTU2NScsXG4gICAgICAgICAgJ2h0dHBzOi8vbnZkLm5pc3QuZ292L3Z1bG4vZGV0YWlsL0NWRS0yMDE3LTEyNTg4JyxcbiAgICAgICAgXSxcbiAgICAgICAgYXNzaWduZXI6ICdjdmVAbWl0cmUub3JnJyxcbiAgICAgICAgY3ZlX3ZlcnNpb246ICc0LjAnLFxuICAgICAgICBzdGF0dXM6ICdBY3RpdmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDEzLFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAxNy0xODM0MiBhZmZlY3RzIHB5dGhvbjMteWFtbCcsXG4gICAgICBpZDogJzIzNTA2JyxcbiAgICAgIGZpcmVkdGltZXM6IDY1LFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgdnVsbmVyYWJpbGl0eToge1xuICAgICAgICBwYWNrYWdlOiB7XG4gICAgICAgICAgbmFtZTogJ3B5dGhvbjMteWFtbCcsXG4gICAgICAgICAgc291cmNlOiAncHl5YW1sJyxcbiAgICAgICAgICB2ZXJzaW9uOiAnMy4xMS0zYnVpbGQxJyxcbiAgICAgICAgICBhcmNoaXRlY3R1cmU6ICdhbWQ2NCcsXG4gICAgICAgICAgY29uZGl0aW9uOiAnUGFja2FnZSB1bmZpeGVkJyxcbiAgICAgICAgfSxcbiAgICAgICAgY3Zzczoge1xuICAgICAgICAgIGN2c3MyOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ25ldHdvcmsnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNy41MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY3ZzczM6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbmV0d29yaycsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbG93JyxcbiAgICAgICAgICAgICAgcHJpdmlsZWdlc19yZXF1aXJlZDogJ25vbmUnLFxuICAgICAgICAgICAgICB1c2VyX2ludGVyYWN0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIHNjb3BlOiAndW5jaGFuZ2VkJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ2hpZ2gnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAnaGlnaCcsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ2hpZ2gnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc5LjgwMDAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY3ZlOiAnQ1ZFLTIwMTctMTgzNDInLFxuICAgICAgICB0aXRsZTogJ0NWRS0yMDE3LTE4MzQyIG9uIFVidW50dSAxNi4wNCBMVFMgKHhlbmlhbCkgLSBsb3cuJyxcbiAgICAgICAgcmF0aW9uYWxlOlxuICAgICAgICAgIFwiSW4gUHlZQU1MIGJlZm9yZSA1LjEsIHRoZSB5YW1sLmxvYWQoKSBBUEkgY291bGQgZXhlY3V0ZSBhcmJpdHJhcnkgY29kZSBpZiB1c2VkIHdpdGggdW50cnVzdGVkIGRhdGEuIFRoZSBsb2FkKCkgZnVuY3Rpb24gaGFzIGJlZW4gZGVwcmVjYXRlZCBpbiB2ZXJzaW9uIDUuMSBhbmQgdGhlICdVbnNhZmVMb2FkZXInIGhhcyBiZWVuIGludHJvZHVjZWQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgd2l0aCB0aGUgZnVuY3Rpb24uXCIsXG4gICAgICAgIHNldmVyaXR5OiAnQ3JpdGljYWwnLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDE4LTA2LTI3JyxcbiAgICAgICAgdXBkYXRlZDogJzIwMTktMDYtMjQnLFxuICAgICAgICBzdGF0ZTogJ1VuZml4ZWQnLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnQ1dFLTIwJyxcbiAgICAgICAgYnVnemlsbGFfcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vYnVncy5kZWJpYW4ub3JnL2NnaS1iaW4vYnVncmVwb3J0LmNnaT9idWc9OTAyODc4JyxcbiAgICAgICAgXSxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20vbWFyc2htYWxsb3ctY29kZS9hcGlzcGVjL2lzc3Vlcy8yNzgnLFxuICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20veWFtbC9weXlhbWwvYmxvYi9tYXN0ZXIvQ0hBTkdFUycsXG4gICAgICAgICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS95YW1sL3B5eWFtbC9pc3N1ZXMvMTkzJyxcbiAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL3lhbWwvcHl5YW1sL3B1bGwvNzQnLFxuICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20veWFtbC9weXlhbWwvd2lraS9QeVlBTUwteWFtbC5sb2FkKGlucHV0KS1EZXByZWNhdGlvbicsXG4gICAgICAgICAgJ2h0dHBzOi8vbGlzdHMuZmVkb3JhcHJvamVjdC5vcmcvYXJjaGl2ZXMvbGlzdC9wYWNrYWdlLWFubm91bmNlQGxpc3RzLmZlZG9yYXByb2plY3Qub3JnL21lc3NhZ2UvSkVYN0lQVjVQMlFKSVRBTUE1WjYzR1FDWkE1STZOVlovJyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5mZWRvcmFwcm9qZWN0Lm9yZy9hcmNoaXZlcy9saXN0L3BhY2thZ2UtYW5ub3VuY2VAbGlzdHMuZmVkb3JhcHJvamVjdC5vcmcvbWVzc2FnZS9LU1FRTVJVUVNYQlNVWExDUkQzVFNaWVE3U0VaUktDRS8nLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLmZlZG9yYXByb2plY3Qub3JnL2FyY2hpdmVzL2xpc3QvcGFja2FnZS1hbm5vdW5jZUBsaXN0cy5mZWRvcmFwcm9qZWN0Lm9yZy9tZXNzYWdlL002SkNGR0VJRU9GTVdXSVhHSFNFTE1LUURENENWMkJBLycsXG4gICAgICAgICAgJ2h0dHBzOi8vc2VjdXJpdHkuZ2VudG9vLm9yZy9nbHNhLzIwMjAwMy00NScsXG4gICAgICAgICAgJ2h0dHBzOi8vbnZkLm5pc3QuZ292L3Z1bG4vZGV0YWlsL0NWRS0yMDE3LTE4MzQyJyxcbiAgICAgICAgICAnaHR0cDovL3Blb3BsZS5jYW5vbmljYWwuY29tL351YnVudHUtc2VjdXJpdHkvY3ZlLzIwMTcvQ1ZFLTIwMTctMTgzNDIuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vY3ZlLm1pdHJlLm9yZy9jZ2ktYmluL2N2ZW5hbWUuY2dpP25hbWU9Q1ZFLTIwMTctMTgzNDInLFxuICAgICAgICBdLFxuICAgICAgICBhc3NpZ25lcjogJ2N2ZUBtaXRyZS5vcmcnLFxuICAgICAgICBjdmVfdmVyc2lvbjogJzQuMCcsXG4gICAgICAgIHN0YXR1czogJ0FjdGl2ZScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBydWxlOiB7XG4gICAgICBsZXZlbDogMTMsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NWRS0yMDE3LTE1OTk0IGFmZmVjdHMgcnN5bmMnLFxuICAgICAgaWQ6ICcyMzUwNicsXG4gICAgICBmaXJlZHRpbWVzOiA2NixcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdyc3luYycsXG4gICAgICAgICAgdmVyc2lvbjogJzMuMS4xLTN1YnVudHUxLjMnLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIGxlc3Mgb3IgZXF1YWwgdGhhbiAzLjEuMicsXG4gICAgICAgIH0sXG4gICAgICAgIGN2c3M6IHtcbiAgICAgICAgICBjdnNzMjoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICduZXR3b3JrJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdsb3cnLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAncGFydGlhbCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzcuNTAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN2c3MzOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ25ldHdvcmsnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIHByaXZpbGVnZXNfcmVxdWlyZWQ6ICdub25lJyxcbiAgICAgICAgICAgICAgdXNlcl9pbnRlcmFjdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBzY29wZTogJ3VuY2hhbmdlZCcsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdoaWdoJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ2hpZ2gnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdoaWdoJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnOS44MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDE3LTE1OTk0JyxcbiAgICAgICAgdGl0bGU6XG4gICAgICAgICAgJ3JzeW5jIDMuMS4zLWRldmVsb3BtZW50IGJlZm9yZSAyMDE3LTEwLTI0IG1pc2hhbmRsZXMgYXJjaGFpYyBjaGVja3N1bXMsIHdoaWNoIG1ha2VzIGl0IGVhc2llciBmb3IgcmVtb3RlIGF0dGFja2VycyB0byBieXBhc3MgaW50ZW5kZWQgYWNjZXNzIHJlc3RyaWN0aW9ucy4gTk9URTogdGhlIHJzeW5jIGRldmVsb3BtZW50IGJyYW5jaCBoYXMgc2lnbmlmaWNhbnQgdXNlIGJleW9uZCB0aGUgcnN5bmMgZGV2ZWxvcGVycywgZS5nLiwgdGhlIGNvZGUgaGFzIGJlZW4gY29waWVkIGZvciB1c2UgaW4gdmFyaW91cyBHaXRIdWIgcHJvamVjdHMuJyxcbiAgICAgICAgc2V2ZXJpdHk6ICdDcml0aWNhbCcsXG4gICAgICAgIHB1Ymxpc2hlZDogJzIwMTctMTAtMjknLFxuICAgICAgICB1cGRhdGVkOiAnMjAxOS0xMC0wMycsXG4gICAgICAgIHN0YXRlOiAnRml4ZWQnLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnQ1dFLTM1NCcsXG4gICAgICAgIHJlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cHM6Ly9naXQuc2FtYmEub3JnLz9wPXJzeW5jLmdpdDthPWNvbW1pdDtoPTdiOGE0ZWNkNmZmOWNkZjRlNWQzODUwZWJmODIyZjFlOTg5MjU1YjMnLFxuICAgICAgICAgICdodHRwczovL2dpdC5zYW1iYS5vcmcvP3A9cnN5bmMuZ2l0O2E9Y29tbWl0O2g9OWE0ODBkZWVjNGQyMDI3N2Q4ZTIwYmM1NTUxNWVmMDY0MGNhMWU1NScsXG4gICAgICAgICAgJ2h0dHBzOi8vZ2l0LnNhbWJhLm9yZy8/cD1yc3luYy5naXQ7YT1jb21taXQ7aD1jMjUyNTQ2Y2VlYjA5MjVlYjhhNDA2MTMxNWUzZmYwYThjNTViNDhiJyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMTctMTU5OTQnLFxuICAgICAgICBdLFxuICAgICAgICBhc3NpZ25lcjogJ2N2ZUBtaXRyZS5vcmcnLFxuICAgICAgICBjdmVfdmVyc2lvbjogJzQuMCcsXG4gICAgICAgIHN0YXR1czogJ0FjdGl2ZScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBydWxlOiB7XG4gICAgICBsZXZlbDogMTMsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NWRS0yMDE5LTkxNjkgYWZmZWN0cyBsaWJjNicsXG4gICAgICBpZDogJzIzNTA2JyxcbiAgICAgIGZpcmVkdGltZXM6IDY4LFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgdnVsbmVyYWJpbGl0eToge1xuICAgICAgICBwYWNrYWdlOiB7XG4gICAgICAgICAgbmFtZTogJ2xpYmM2JyxcbiAgICAgICAgICBzb3VyY2U6ICdnbGliYycsXG4gICAgICAgICAgdmVyc2lvbjogJzIuMjMtMHVidW50dTExJyxcbiAgICAgICAgICBhcmNoaXRlY3R1cmU6ICdhbWQ2NCcsXG4gICAgICAgICAgY29uZGl0aW9uOiAnUGFja2FnZSBsZXNzIG9yIGVxdWFsIHRoYW4gMi4yOScsXG4gICAgICAgIH0sXG4gICAgICAgIGN2c3M6IHtcbiAgICAgICAgICBjdnNzMjoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICduZXR3b3JrJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdsb3cnLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAncGFydGlhbCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzcuNTAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN2c3MzOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ25ldHdvcmsnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIHByaXZpbGVnZXNfcmVxdWlyZWQ6ICdub25lJyxcbiAgICAgICAgICAgICAgdXNlcl9pbnRlcmFjdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBzY29wZTogJ3VuY2hhbmdlZCcsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdoaWdoJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ2hpZ2gnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdoaWdoJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnOS44MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDE5LTkxNjknLFxuICAgICAgICB0aXRsZTogJ0NWRS0yMDE5LTkxNjkgb24gVWJ1bnR1IDE2LjA0IExUUyAoeGVuaWFsKSAtIGxvdy4nLFxuICAgICAgICByYXRpb25hbGU6XG4gICAgICAgICAgJ0luIHRoZSBHTlUgQyBMaWJyYXJ5IChha2EgZ2xpYmMgb3IgbGliYzYpIHRocm91Z2ggMi4yOSwgcHJvY2VlZF9uZXh0X25vZGUgaW4gcG9zaXgvcmVnZXhlYy5jIGhhcyBhIGhlYXAtYmFzZWQgYnVmZmVyIG92ZXItcmVhZCB2aWEgYW4gYXR0ZW1wdGVkIGNhc2UtaW5zZW5zaXRpdmUgcmVndWxhci1leHByZXNzaW9uIG1hdGNoLicsXG4gICAgICAgIHNldmVyaXR5OiAnQ3JpdGljYWwnLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDE5LTAyLTI2JyxcbiAgICAgICAgdXBkYXRlZDogJzIwMTktMDQtMTYnLFxuICAgICAgICBzdGF0ZTogJ0ZpeGVkJyxcbiAgICAgICAgY3dlX3JlZmVyZW5jZTogJ0NXRS0xMjUnLFxuICAgICAgICBidWd6aWxsYV9yZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHBzOi8vZGViYnVncy5nbnUub3JnL2NnaS9idWdyZXBvcnQuY2dpP2J1Zz0zNDE0MCcsXG4gICAgICAgICAgJ2h0dHBzOi8vZGViYnVncy5nbnUub3JnL2NnaS9idWdyZXBvcnQuY2dpP2J1Zz0zNDE0MicsXG4gICAgICAgICAgJ2h0dHBzOi8vc291cmNld2FyZS5vcmcvYnVnemlsbGEvc2hvd19idWcuY2dpP2lkPTI0MTE0JyxcbiAgICAgICAgXSxcbiAgICAgICAgcmVmZXJlbmNlczogW1xuICAgICAgICAgICdodHRwOi8vd3d3LnNlY3VyaXR5Zm9jdXMuY29tL2JpZC8xMDcxNjAnLFxuICAgICAgICAgICdodHRwczovL2RlYmJ1Z3MuZ251Lm9yZy9jZ2kvYnVncmVwb3J0LmNnaT9idWc9MzQxNDAnLFxuICAgICAgICAgICdodHRwczovL2RlYmJ1Z3MuZ251Lm9yZy9jZ2kvYnVncmVwb3J0LmNnaT9idWc9MzQxNDInLFxuICAgICAgICAgICdodHRwczovL2tjLm1jYWZlZS5jb20vY29ycG9yYXRlL2luZGV4P3BhZ2U9Y29udGVudCZpZD1TQjEwMjc4JyxcbiAgICAgICAgICAnaHR0cHM6Ly9zZWN1cml0eS5uZXRhcHAuY29tL2Fkdmlzb3J5L250YXAtMjAxOTAzMTUtMDAwMi8nLFxuICAgICAgICAgICdodHRwczovL3NvdXJjZXdhcmUub3JnL2J1Z3ppbGxhL3Nob3dfYnVnLmNnaT9pZD0yNDExNCcsXG4gICAgICAgICAgJ2h0dHBzOi8vc291cmNld2FyZS5vcmcvZ2l0L2dpdHdlYi5jZ2k/cD1nbGliYy5naXQ7YT1jb21taXQ7aD01ODNkZDg2MGQ1YjgzMzAzNzE3NTI0NzIzMGEzMjhmMDA1MGRiZmU5JyxcbiAgICAgICAgICAnaHR0cHM6Ly9zdXBwb3J0LmY1LmNvbS9jc3AvYXJ0aWNsZS9LNTQ4MjMxODQnLFxuICAgICAgICAgICdodHRwczovL252ZC5uaXN0Lmdvdi92dWxuL2RldGFpbC9DVkUtMjAxOS05MTY5JyxcbiAgICAgICAgICAnaHR0cDovL3Blb3BsZS5jYW5vbmljYWwuY29tL351YnVudHUtc2VjdXJpdHkvY3ZlLzIwMTkvQ1ZFLTIwMTktOTE2OS5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9jdmUubWl0cmUub3JnL2NnaS1iaW4vY3ZlbmFtZS5jZ2k/bmFtZT1DVkUtMjAxOS05MTY5JyxcbiAgICAgICAgXSxcbiAgICAgICAgYXNzaWduZXI6ICdjdmVAbWl0cmUub3JnJyxcbiAgICAgICAgY3ZlX3ZlcnNpb246ICc0LjAnLFxuICAgICAgICBzdGF0dXM6ICdBY3RpdmUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDEzLFxuICAgICAgZGVzY3JpcHRpb246ICdDVkUtMjAxNy0xNTA4OCBhZmZlY3RzIGtyYjUtbG9jYWxlcycsXG4gICAgICBpZDogJzIzNTA2JyxcbiAgICAgIGZpcmVkdGltZXM6IDczLFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgdnVsbmVyYWJpbGl0eToge1xuICAgICAgICBwYWNrYWdlOiB7XG4gICAgICAgICAgbmFtZTogJ2tyYjUtbG9jYWxlcycsXG4gICAgICAgICAgc291cmNlOiAna3JiNScsXG4gICAgICAgICAgdmVyc2lvbjogJzEuMTMuMitkZnNnLTV1YnVudHUyLjEnLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FsbCcsXG4gICAgICAgICAgY29uZGl0aW9uOiAnUGFja2FnZSB1bmZpeGVkJyxcbiAgICAgICAgfSxcbiAgICAgICAgY3Zzczoge1xuICAgICAgICAgIGN2c3MyOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ25ldHdvcmsnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIGF1dGhlbnRpY2F0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ3BhcnRpYWwnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnNy41MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY3ZzczM6IHtcbiAgICAgICAgICAgIHZlY3Rvcjoge1xuICAgICAgICAgICAgICBhdHRhY2tfdmVjdG9yOiAnbmV0d29yaycsXG4gICAgICAgICAgICAgIGFjY2Vzc19jb21wbGV4aXR5OiAnbG93JyxcbiAgICAgICAgICAgICAgcHJpdmlsZWdlc19yZXF1aXJlZDogJ25vbmUnLFxuICAgICAgICAgICAgICB1c2VyX2ludGVyYWN0aW9uOiAnbm9uZScsXG4gICAgICAgICAgICAgIHNjb3BlOiAndW5jaGFuZ2VkJyxcbiAgICAgICAgICAgICAgY29uZmlkZW50aWFsaXR5X2ltcGFjdDogJ2hpZ2gnLFxuICAgICAgICAgICAgICBpbnRlZ3JpdHlfaW1wYWN0OiAnaGlnaCcsXG4gICAgICAgICAgICAgIGF2YWlsYWJpbGl0eTogJ2hpZ2gnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJhc2Vfc2NvcmU6ICc5LjgwMDAwMCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgY3ZlOiAnQ1ZFLTIwMTctMTUwODgnLFxuICAgICAgICB0aXRsZTogJ0NWRS0yMDE3LTE1MDg4IG9uIFVidW50dSAxNi4wNCBMVFMgKHhlbmlhbCkgLSBuZWdsaWdpYmxlLicsXG4gICAgICAgIHJhdGlvbmFsZTpcbiAgICAgICAgICAncGx1Z2lucy9wcmVhdXRoL3BraW5pdC9wa2luaXRfY3J5cHRvX29wZW5zc2wuYyBpbiBNSVQgS2VyYmVyb3MgNSAoYWthIGtyYjUpIHRocm91Z2ggMS4xNS4yIG1pc2hhbmRsZXMgRGlzdGluZ3Vpc2hlZCBOYW1lIChETikgZmllbGRzLCB3aGljaCBhbGxvd3MgcmVtb3RlIGF0dGFja2VycyB0byBleGVjdXRlIGFyYml0cmFyeSBjb2RlIG9yIGNhdXNlIGEgZGVuaWFsIG9mIHNlcnZpY2UgKGJ1ZmZlciBvdmVyZmxvdyBhbmQgYXBwbGljYXRpb24gY3Jhc2gpIGluIHNpdHVhdGlvbnMgaW52b2x2aW5nIHVudHJ1c3RlZCBYLjUwOSBkYXRhLCByZWxhdGVkIHRvIHRoZSBnZXRfbWF0Y2hpbmdfZGF0YSBhbmQgWDUwOV9OQU1FX29uZWxpbmVfZXggZnVuY3Rpb25zLiBOT1RFOiB0aGlzIGhhcyBzZWN1cml0eSByZWxldmFuY2Ugb25seSBpbiB1c2UgY2FzZXMgb3V0c2lkZSBvZiB0aGUgTUlUIEtlcmJlcm9zIGRpc3RyaWJ1dGlvbiwgZS5nLiwgdGhlIHVzZSBvZiBnZXRfbWF0Y2hpbmdfZGF0YSBpbiBLREMgY2VydGF1dGggcGx1Z2luIGNvZGUgdGhhdCBpcyBzcGVjaWZpYyB0byBSZWQgSGF0LicsXG4gICAgICAgIHNldmVyaXR5OiAnQ3JpdGljYWwnLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDE3LTExLTIzJyxcbiAgICAgICAgdXBkYXRlZDogJzIwMTktMTAtMDknLFxuICAgICAgICBzdGF0ZTogJ1VuZml4ZWQnLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnQ1dFLTExOScsXG4gICAgICAgIGJ1Z3ppbGxhX3JlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cDovL2J1Z3MuZGViaWFuLm9yZy9jZ2ktYmluL2J1Z3JlcG9ydC5jZ2k/YnVnPTg3MTY5OCcsXG4gICAgICAgIF0sXG4gICAgICAgIHJlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cDovL3d3dy5zZWN1cml0eWZvY3VzLmNvbS9iaWQvMTAxNTk0JyxcbiAgICAgICAgICAnaHR0cHM6Ly9idWdzLmRlYmlhbi5vcmcvY2dpLWJpbi9idWdyZXBvcnQuY2dpP2J1Zz04NzE2OTgnLFxuICAgICAgICAgICdodHRwczovL2J1Z3ppbGxhLnJlZGhhdC5jb20vc2hvd19idWcuY2dpP2lkPTE1MDQwNDUnLFxuICAgICAgICAgICdodHRwczovL2dpdGh1Yi5jb20va3JiNS9rcmI1L2NvbW1pdC9mYmI2ODdkYjEwODhkZGQ4OTRkOTc1OTk2ZTVmNmE0MjUyYjlhMmI0JyxcbiAgICAgICAgICAnaHR0cHM6Ly9naXRodWIuY29tL2tyYjUva3JiNS9wdWxsLzcwNycsXG4gICAgICAgICAgJ2h0dHBzOi8vbnZkLm5pc3QuZ292L3Z1bG4vZGV0YWlsL0NWRS0yMDE3LTE1MDg4JyxcbiAgICAgICAgICAnaHR0cDovL3Blb3BsZS5jYW5vbmljYWwuY29tL351YnVudHUtc2VjdXJpdHkvY3ZlLzIwMTcvQ1ZFLTIwMTctMTUwODguaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vY3ZlLm1pdHJlLm9yZy9jZ2ktYmluL2N2ZW5hbWUuY2dpP25hbWU9Q1ZFLTIwMTctMTUwODgnLFxuICAgICAgICBdLFxuICAgICAgICBhc3NpZ25lcjogJ2N2ZUBtaXRyZS5vcmcnLFxuICAgICAgICBjdmVfdmVyc2lvbjogJzQuMCcsXG4gICAgICAgIHN0YXR1czogJ0FjdGl2ZScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBydWxlOiB7XG4gICAgICBsZXZlbDogMTMsXG4gICAgICBkZXNjcmlwdGlvbjogJ0NWRS0yMDE4LTY0ODUgYWZmZWN0cyBsaWJjLWJpbicsXG4gICAgICBpZDogJzIzNTA2JyxcbiAgICAgIGZpcmVkdGltZXM6IDc4LFxuICAgIH0sXG4gICAgZGF0YToge1xuICAgICAgdnVsbmVyYWJpbGl0eToge1xuICAgICAgICBwYWNrYWdlOiB7XG4gICAgICAgICAgbmFtZTogJ2xpYmMtYmluJyxcbiAgICAgICAgICBzb3VyY2U6ICdnbGliYycsXG4gICAgICAgICAgdmVyc2lvbjogJzIuMjMtMHVidW50dTExJyxcbiAgICAgICAgICBhcmNoaXRlY3R1cmU6ICdhbWQ2NCcsXG4gICAgICAgICAgY29uZGl0aW9uOiAnUGFja2FnZSBsZXNzIG9yIGVxdWFsIHRoYW4gMi4yNicsXG4gICAgICAgIH0sXG4gICAgICAgIGN2c3M6IHtcbiAgICAgICAgICBjdnNzMjoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICduZXR3b3JrJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdsb3cnLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAncGFydGlhbCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzcuNTAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN2c3MzOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ25ldHdvcmsnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIHByaXZpbGVnZXNfcmVxdWlyZWQ6ICdub25lJyxcbiAgICAgICAgICAgICAgdXNlcl9pbnRlcmFjdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBzY29wZTogJ3VuY2hhbmdlZCcsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdoaWdoJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ2hpZ2gnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdoaWdoJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnOS44MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDE4LTY0ODUnLFxuICAgICAgICB0aXRsZTogJ0NWRS0yMDE4LTY0ODUgb24gVWJ1bnR1IDE2LjA0IExUUyAoeGVuaWFsKSAtIG1lZGl1bS4nLFxuICAgICAgICByYXRpb25hbGU6XG4gICAgICAgICAgJ0FuIGludGVnZXIgb3ZlcmZsb3cgaW4gdGhlIGltcGxlbWVudGF0aW9uIG9mIHRoZSBwb3NpeF9tZW1hbGlnbiBpbiBtZW1hbGlnbiBmdW5jdGlvbnMgaW4gdGhlIEdOVSBDIExpYnJhcnkgKGFrYSBnbGliYyBvciBsaWJjNikgMi4yNiBhbmQgZWFybGllciBjb3VsZCBjYXVzZSB0aGVzZSBmdW5jdGlvbnMgdG8gcmV0dXJuIGEgcG9pbnRlciB0byBhIGhlYXAgYXJlYSB0aGF0IGlzIHRvbyBzbWFsbCwgcG90ZW50aWFsbHkgbGVhZGluZyB0byBoZWFwIGNvcnJ1cHRpb24uJyxcbiAgICAgICAgc2V2ZXJpdHk6ICdDcml0aWNhbCcsXG4gICAgICAgIHB1Ymxpc2hlZDogJzIwMTgtMDItMDEnLFxuICAgICAgICB1cGRhdGVkOiAnMjAxOS0xMi0xMCcsXG4gICAgICAgIHN0YXRlOiAnRml4ZWQnLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnQ1dFLTE5MCcsXG4gICAgICAgIGJ1Z3ppbGxhX3JlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cDovL2J1Z3MuZGViaWFuLm9yZy84NzgxNTknLFxuICAgICAgICAgICdodHRwczovL3NvdXJjZXdhcmUub3JnL2J1Z3ppbGxhL3Nob3dfYnVnLmNnaT9pZD0yMjM0MycsXG4gICAgICAgIF0sXG4gICAgICAgIHJlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cDovL2J1Z3MuZGViaWFuLm9yZy84NzgxNTknLFxuICAgICAgICAgICdodHRwOi8vd3d3LnNlY3VyaXR5Zm9jdXMuY29tL2JpZC8xMDI5MTInLFxuICAgICAgICAgICdodHRwczovL2FjY2Vzcy5yZWRoYXQuY29tL2VycmF0YS9SSEJBLTIwMTk6MDMyNycsXG4gICAgICAgICAgJ2h0dHBzOi8vYWNjZXNzLnJlZGhhdC5jb20vZXJyYXRhL1JIU0EtMjAxODozMDkyJyxcbiAgICAgICAgICAnaHR0cHM6Ly9zZWN1cml0eS5uZXRhcHAuY29tL2Fkdmlzb3J5L250YXAtMjAxOTA0MDQtMDAwMy8nLFxuICAgICAgICAgICdodHRwczovL3NvdXJjZXdhcmUub3JnL2J1Z3ppbGxhL3Nob3dfYnVnLmNnaT9pZD0yMjM0MycsXG4gICAgICAgICAgJ2h0dHBzOi8vdXNuLnVidW50dS5jb20vNDIxOC0xLycsXG4gICAgICAgICAgJ2h0dHBzOi8vd3d3Lm9yYWNsZS5jb20vdGVjaG5ldHdvcmsvc2VjdXJpdHktYWR2aXNvcnkvY3B1YXByMjAxOS01MDcyODEzLmh0bWwnLFxuICAgICAgICAgICdodHRwczovL252ZC5uaXN0Lmdvdi92dWxuL2RldGFpbC9DVkUtMjAxOC02NDg1JyxcbiAgICAgICAgICAnaHR0cDovL3Blb3BsZS5jYW5vbmljYWwuY29tL351YnVudHUtc2VjdXJpdHkvY3ZlLzIwMTgvQ1ZFLTIwMTgtNjQ4NS5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9jdmUubWl0cmUub3JnL2NnaS1iaW4vY3ZlbmFtZS5jZ2k/bmFtZT1DVkUtMjAxOC02NDg1JyxcbiAgICAgICAgICAnaHR0cHM6Ly91c24udWJ1bnR1LmNvbS91c24vdXNuLTQyMTgtMScsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiAxMyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ1ZFLTIwMTYtNzk0NCBhZmZlY3RzIGxpYnhmaXhlczMnLFxuICAgICAgaWQ6ICcyMzUwNicsXG4gICAgICBmaXJlZHRpbWVzOiA4MixcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdsaWJ4Zml4ZXMzJyxcbiAgICAgICAgICBzb3VyY2U6ICdsaWJ4Zml4ZXMnLFxuICAgICAgICAgIHZlcnNpb246ICcxOjUuMC4xLTInLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIGxlc3Mgb3IgZXF1YWwgdGhhbiA1LjAuMicsXG4gICAgICAgIH0sXG4gICAgICAgIGN2c3M6IHtcbiAgICAgICAgICBjdnNzMjoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICduZXR3b3JrJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdsb3cnLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAncGFydGlhbCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzcuNTAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN2c3MzOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ25ldHdvcmsnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIHByaXZpbGVnZXNfcmVxdWlyZWQ6ICdub25lJyxcbiAgICAgICAgICAgICAgdXNlcl9pbnRlcmFjdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBzY29wZTogJ3VuY2hhbmdlZCcsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdoaWdoJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ2hpZ2gnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdoaWdoJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnOS44MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDE2LTc5NDQnLFxuICAgICAgICB0aXRsZTogJ0NWRS0yMDE2LTc5NDQgb24gVWJ1bnR1IDE2LjA0IExUUyAoeGVuaWFsKSAtIGxvdy4nLFxuICAgICAgICByYXRpb25hbGU6XG4gICAgICAgICAgJ0ludGVnZXIgb3ZlcmZsb3cgaW4gWC5vcmcgbGliWGZpeGVzIGJlZm9yZSA1LjAuMyBvbiAzMi1iaXQgcGxhdGZvcm1zIG1pZ2h0IGFsbG93IHJlbW90ZSBYIHNlcnZlcnMgdG8gZ2FpbiBwcml2aWxlZ2VzIHZpYSBhIGxlbmd0aCB2YWx1ZSBvZiBJTlRfTUFYLCB3aGljaCB0cmlnZ2VycyB0aGUgY2xpZW50IHRvIHN0b3AgcmVhZGluZyBkYXRhIGFuZCBnZXQgb3V0IG9mIHN5bmMuJyxcbiAgICAgICAgc2V2ZXJpdHk6ICdDcml0aWNhbCcsXG4gICAgICAgIHB1Ymxpc2hlZDogJzIwMTYtMTItMTMnLFxuICAgICAgICB1cGRhdGVkOiAnMjAxNy0wNy0wMScsXG4gICAgICAgIHN0YXRlOiAnRml4ZWQnLFxuICAgICAgICBjd2VfcmVmZXJlbmNlOiAnQ1dFLTE5MCcsXG4gICAgICAgIGJ1Z3ppbGxhX3JlZmVyZW5jZXM6IFtcbiAgICAgICAgICAnaHR0cHM6Ly9idWdzLmRlYmlhbi5vcmcvY2dpLWJpbi9idWdyZXBvcnQuY2dpP2J1Zz04NDA0NDInLFxuICAgICAgICBdLFxuICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHA6Ly93d3cub3BlbndhbGwuY29tL2xpc3RzL29zcy1zZWN1cml0eS8yMDE2LzEwLzA0LzInLFxuICAgICAgICAgICdodHRwOi8vd3d3Lm9wZW53YWxsLmNvbS9saXN0cy9vc3Mtc2VjdXJpdHkvMjAxNi8xMC8wNC80JyxcbiAgICAgICAgICAnaHR0cDovL3d3dy5zZWN1cml0eWZvY3VzLmNvbS9iaWQvOTMzNjEnLFxuICAgICAgICAgICdodHRwOi8vd3d3LnNlY3VyaXR5dHJhY2tlci5jb20vaWQvMTAzNjk0NScsXG4gICAgICAgICAgJ2h0dHBzOi8vY2dpdC5mcmVlZGVza3RvcC5vcmcveG9yZy9saWIvbGliWGZpeGVzL2NvbW1pdC8/aWQ9NjFjMTAzOWVlMjNhMmQxZGU3MTI4NDNiZWQzNDgwNjU0ZDdlZjQyZScsXG4gICAgICAgICAgJ2h0dHBzOi8vbGlzdHMuZmVkb3JhcHJvamVjdC5vcmcvYXJjaGl2ZXMvbGlzdC9wYWNrYWdlLWFubm91bmNlQGxpc3RzLmZlZG9yYXByb2plY3Qub3JnL21lc3NhZ2UvNENFNlZKV0JNT1dMU0NINE9QNFRBRVBJQTdOUDUzT04vJyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5mZWRvcmFwcm9qZWN0Lm9yZy9hcmNoaXZlcy9saXN0L3BhY2thZ2UtYW5ub3VuY2VAbGlzdHMuZmVkb3JhcHJvamVjdC5vcmcvbWVzc2FnZS9HRTQzTURDUkdTNFI3TVJSWk5WU0xSRUhSTFU1T0hDVi8nLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLngub3JnL2FyY2hpdmVzL3hvcmctYW5ub3VuY2UvMjAxNi1PY3RvYmVyLzAwMjcyMC5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9zZWN1cml0eS5nZW50b28ub3JnL2dsc2EvMjAxNzA0LTAzJyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMTYtNzk0NCcsXG4gICAgICAgICAgJ2h0dHA6Ly9wZW9wbGUuY2Fub25pY2FsLmNvbS9+dWJ1bnR1LXNlY3VyaXR5L2N2ZS8yMDE2L0NWRS0yMDE2LTc5NDQuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vY3ZlLm1pdHJlLm9yZy9jZ2ktYmluL2N2ZW5hbWUuY2dpP25hbWU9Q1ZFLTIwMTYtNzk0NCcsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiAxMyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ1ZFLTIwMTYtNzk0NyBhZmZlY3RzIGxpYnhyYW5kcjInLFxuICAgICAgaWQ6ICcyMzUwNicsXG4gICAgICBmaXJlZHRpbWVzOiA4MyxcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdsaWJ4cmFuZHIyJyxcbiAgICAgICAgICBzb3VyY2U6ICdsaWJ4cmFuZHInLFxuICAgICAgICAgIHZlcnNpb246ICcyOjEuNS4wLTEnLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIGxlc3Mgb3IgZXF1YWwgdGhhbiAxLjUuMCcsXG4gICAgICAgIH0sXG4gICAgICAgIGN2c3M6IHtcbiAgICAgICAgICBjdnNzMjoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICduZXR3b3JrJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdsb3cnLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAncGFydGlhbCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzcuNTAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN2c3MzOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ25ldHdvcmsnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIHByaXZpbGVnZXNfcmVxdWlyZWQ6ICdub25lJyxcbiAgICAgICAgICAgICAgdXNlcl9pbnRlcmFjdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBzY29wZTogJ3VuY2hhbmdlZCcsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdoaWdoJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ2hpZ2gnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdoaWdoJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnOS44MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDE2LTc5NDcnLFxuICAgICAgICB0aXRsZTogJ0NWRS0yMDE2LTc5NDcgb24gVWJ1bnR1IDE2LjA0IExUUyAoeGVuaWFsKSAtIGxvdy4nLFxuICAgICAgICByYXRpb25hbGU6XG4gICAgICAgICAgJ011bHRpcGxlIGludGVnZXIgb3ZlcmZsb3dzIGluIFgub3JnIGxpYlhyYW5kciBiZWZvcmUgMS41LjEgYWxsb3cgcmVtb3RlIFggc2VydmVycyB0byB0cmlnZ2VyIG91dC1vZi1ib3VuZHMgd3JpdGUgb3BlcmF0aW9ucyB2aWEgYSBjcmFmdGVkIHJlc3BvbnNlLicsXG4gICAgICAgIHNldmVyaXR5OiAnQ3JpdGljYWwnLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDE2LTEyLTEzJyxcbiAgICAgICAgdXBkYXRlZDogJzIwMTctMDctMDEnLFxuICAgICAgICBzdGF0ZTogJ0ZpeGVkJyxcbiAgICAgICAgY3dlX3JlZmVyZW5jZTogJ0NXRS03ODcnLFxuICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHA6Ly93d3cub3BlbndhbGwuY29tL2xpc3RzL29zcy1zZWN1cml0eS8yMDE2LzEwLzA0LzInLFxuICAgICAgICAgICdodHRwOi8vd3d3Lm9wZW53YWxsLmNvbS9saXN0cy9vc3Mtc2VjdXJpdHkvMjAxNi8xMC8wNC80JyxcbiAgICAgICAgICAnaHR0cDovL3d3dy5zZWN1cml0eWZvY3VzLmNvbS9iaWQvOTMzNjUnLFxuICAgICAgICAgICdodHRwOi8vd3d3LnNlY3VyaXR5dHJhY2tlci5jb20vaWQvMTAzNjk0NScsXG4gICAgICAgICAgJ2h0dHBzOi8vY2dpdC5mcmVlZGVza3RvcC5vcmcveG9yZy9saWIvbGliWHJhbmRyL2NvbW1pdC8/aWQ9YTBkZjNlMWM3NzI4MjA1ZTVjNzY1MGIyZTZkY2U2ODQxMzkyNTRhNicsXG4gICAgICAgICAgJ2h0dHBzOi8vbGlzdHMuZmVkb3JhcHJvamVjdC5vcmcvYXJjaGl2ZXMvbGlzdC9wYWNrYWdlLWFubm91bmNlQGxpc3RzLmZlZG9yYXByb2plY3Qub3JnL21lc3NhZ2UvNzRGRk9IV1lJS1FaVEpMUkpXRE1KNFczV1lCRUxVVUcvJyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5mZWRvcmFwcm9qZWN0Lm9yZy9hcmNoaXZlcy9saXN0L3BhY2thZ2UtYW5ub3VuY2VAbGlzdHMuZmVkb3JhcHJvamVjdC5vcmcvbWVzc2FnZS9ZNzY2Mk9aV0NTVExSUEtTNlIzRTRZNE0yNkJTVkFBTS8nLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLngub3JnL2FyY2hpdmVzL3hvcmctYW5ub3VuY2UvMjAxNi1PY3RvYmVyLzAwMjcyMC5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9zZWN1cml0eS5nZW50b28ub3JnL2dsc2EvMjAxNzA0LTAzJyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMTYtNzk0NycsXG4gICAgICAgICAgJ2h0dHA6Ly9wZW9wbGUuY2Fub25pY2FsLmNvbS9+dWJ1bnR1LXNlY3VyaXR5L2N2ZS8yMDE2L0NWRS0yMDE2LTc5NDcuaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vY3ZlLm1pdHJlLm9yZy9jZ2ktYmluL2N2ZW5hbWUuY2dpP25hbWU9Q1ZFLTIwMTYtNzk0NycsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAge1xuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiAxMyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ1ZFLTIwMTYtNzk0OCBhZmZlY3RzIGxpYnhyYW5kcjInLFxuICAgICAgaWQ6ICcyMzUwNicsXG4gICAgICBmaXJlZHRpbWVzOiA4NCxcbiAgICB9LFxuICAgIGRhdGE6IHtcbiAgICAgIHZ1bG5lcmFiaWxpdHk6IHtcbiAgICAgICAgcGFja2FnZToge1xuICAgICAgICAgIG5hbWU6ICdsaWJ4cmFuZHIyJyxcbiAgICAgICAgICBzb3VyY2U6ICdsaWJ4cmFuZHInLFxuICAgICAgICAgIHZlcnNpb246ICcyOjEuNS4wLTEnLFxuICAgICAgICAgIGFyY2hpdGVjdHVyZTogJ2FtZDY0JyxcbiAgICAgICAgICBjb25kaXRpb246ICdQYWNrYWdlIGxlc3Mgb3IgZXF1YWwgdGhhbiAxLjUuMCcsXG4gICAgICAgIH0sXG4gICAgICAgIGN2c3M6IHtcbiAgICAgICAgICBjdnNzMjoge1xuICAgICAgICAgICAgdmVjdG9yOiB7XG4gICAgICAgICAgICAgIGF0dGFja192ZWN0b3I6ICduZXR3b3JrJyxcbiAgICAgICAgICAgICAgYWNjZXNzX2NvbXBsZXhpdHk6ICdsb3cnLFxuICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBjb25maWRlbnRpYWxpdHlfaW1wYWN0OiAncGFydGlhbCcsXG4gICAgICAgICAgICAgIGludGVncml0eV9pbXBhY3Q6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgICAgYXZhaWxhYmlsaXR5OiAncGFydGlhbCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmFzZV9zY29yZTogJzcuNTAwMDAwJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGN2c3MzOiB7XG4gICAgICAgICAgICB2ZWN0b3I6IHtcbiAgICAgICAgICAgICAgYXR0YWNrX3ZlY3RvcjogJ25ldHdvcmsnLFxuICAgICAgICAgICAgICBhY2Nlc3NfY29tcGxleGl0eTogJ2xvdycsXG4gICAgICAgICAgICAgIHByaXZpbGVnZXNfcmVxdWlyZWQ6ICdub25lJyxcbiAgICAgICAgICAgICAgdXNlcl9pbnRlcmFjdGlvbjogJ25vbmUnLFxuICAgICAgICAgICAgICBzY29wZTogJ3VuY2hhbmdlZCcsXG4gICAgICAgICAgICAgIGNvbmZpZGVudGlhbGl0eV9pbXBhY3Q6ICdoaWdoJyxcbiAgICAgICAgICAgICAgaW50ZWdyaXR5X2ltcGFjdDogJ2hpZ2gnLFxuICAgICAgICAgICAgICBhdmFpbGFiaWxpdHk6ICdoaWdoJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiYXNlX3Njb3JlOiAnOS44MDAwMDAnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGN2ZTogJ0NWRS0yMDE2LTc5NDgnLFxuICAgICAgICB0aXRsZTogJ0NWRS0yMDE2LTc5NDggb24gVWJ1bnR1IDE2LjA0IExUUyAoeGVuaWFsKSAtIGxvdy4nLFxuICAgICAgICByYXRpb25hbGU6XG4gICAgICAgICAgJ1gub3JnIGxpYlhyYW5kciBiZWZvcmUgMS41LjEgYWxsb3dzIHJlbW90ZSBYIHNlcnZlcnMgdG8gdHJpZ2dlciBvdXQtb2YtYm91bmRzIHdyaXRlIG9wZXJhdGlvbnMgYnkgbGV2ZXJhZ2luZyBtaXNoYW5kbGluZyBvZiByZXBseSBkYXRhLicsXG4gICAgICAgIHNldmVyaXR5OiAnQ3JpdGljYWwnLFxuICAgICAgICBwdWJsaXNoZWQ6ICcyMDE2LTEyLTEzJyxcbiAgICAgICAgdXBkYXRlZDogJzIwMTctMDctMDEnLFxuICAgICAgICBzdGF0ZTogJ0ZpeGVkJyxcbiAgICAgICAgY3dlX3JlZmVyZW5jZTogJ0NXRS03ODcnLFxuICAgICAgICByZWZlcmVuY2VzOiBbXG4gICAgICAgICAgJ2h0dHA6Ly93d3cub3BlbndhbGwuY29tL2xpc3RzL29zcy1zZWN1cml0eS8yMDE2LzEwLzA0LzInLFxuICAgICAgICAgICdodHRwOi8vd3d3Lm9wZW53YWxsLmNvbS9saXN0cy9vc3Mtc2VjdXJpdHkvMjAxNi8xMC8wNC80JyxcbiAgICAgICAgICAnaHR0cDovL3d3dy5zZWN1cml0eWZvY3VzLmNvbS9iaWQvOTMzNzMnLFxuICAgICAgICAgICdodHRwOi8vd3d3LnNlY3VyaXR5dHJhY2tlci5jb20vaWQvMTAzNjk0NScsXG4gICAgICAgICAgJ2h0dHBzOi8vY2dpdC5mcmVlZGVza3RvcC5vcmcveG9yZy9saWIvbGliWHJhbmRyL2NvbW1pdC8/aWQ9YTBkZjNlMWM3NzI4MjA1ZTVjNzY1MGIyZTZkY2U2ODQxMzkyNTRhNicsXG4gICAgICAgICAgJ2h0dHBzOi8vbGlzdHMuZmVkb3JhcHJvamVjdC5vcmcvYXJjaGl2ZXMvbGlzdC9wYWNrYWdlLWFubm91bmNlQGxpc3RzLmZlZG9yYXByb2plY3Qub3JnL21lc3NhZ2UvNzRGRk9IV1lJS1FaVEpMUkpXRE1KNFczV1lCRUxVVUcvJyxcbiAgICAgICAgICAnaHR0cHM6Ly9saXN0cy5mZWRvcmFwcm9qZWN0Lm9yZy9hcmNoaXZlcy9saXN0L3BhY2thZ2UtYW5ub3VuY2VAbGlzdHMuZmVkb3JhcHJvamVjdC5vcmcvbWVzc2FnZS9ZNzY2Mk9aV0NTVExSUEtTNlIzRTRZNE0yNkJTVkFBTS8nLFxuICAgICAgICAgICdodHRwczovL2xpc3RzLngub3JnL2FyY2hpdmVzL3hvcmctYW5ub3VuY2UvMjAxNi1PY3RvYmVyLzAwMjcyMC5odG1sJyxcbiAgICAgICAgICAnaHR0cHM6Ly9zZWN1cml0eS5nZW50b28ub3JnL2dsc2EvMjAxNzA0LTAzJyxcbiAgICAgICAgICAnaHR0cHM6Ly9udmQubmlzdC5nb3YvdnVsbi9kZXRhaWwvQ1ZFLTIwMTYtNzk0OCcsXG4gICAgICAgICAgJ2h0dHA6Ly9wZW9wbGUuY2Fub25pY2FsLmNvbS9+dWJ1bnR1LXNlY3VyaXR5L2N2ZS8yMDE2L0NWRS0yMDE2LTc5NDguaHRtbCcsXG4gICAgICAgICAgJ2h0dHBzOi8vY3ZlLm1pdHJlLm9yZy9jZ2ktYmluL2N2ZW5hbWUuY2dpP25hbWU9Q1ZFLTIwMTYtNzk0OCcsXG4gICAgICAgIF0sXG4gICAgICAgIGFzc2lnbmVyOiAnY3ZlQG1pdHJlLm9yZycsXG4gICAgICAgIGN2ZV92ZXJzaW9uOiAnNC4wJyxcbiAgICAgICAgc3RhdHVzOiAnQWN0aXZlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbl07XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOztBQUVPLE1BQU1BLElBQUksR0FBQUMsT0FBQSxDQUFBRCxJQUFBLEdBQUcsQ0FDbEI7RUFDRUUsSUFBSSxFQUFFO0lBQ0pDLEtBQUssRUFBRSxDQUFDO0lBQ1JDLFdBQVcsRUFBRSxrQ0FBa0M7SUFDL0NDLEVBQUUsRUFBRSxPQUFPO0lBQ1hDLFVBQVUsRUFBRTtFQUNkLENBQUM7RUFDRE4sSUFBSSxFQUFFO0lBQ0pPLGFBQWEsRUFBRTtNQUNiQyxPQUFPLEVBQUU7UUFDUEMsSUFBSSxFQUFFLFdBQVc7UUFDakJDLE9BQU8sRUFBRSxlQUFlO1FBQ3hCQyxZQUFZLEVBQUUsT0FBTztRQUNyQkMsU0FBUyxFQUFFO01BQ2IsQ0FBQztNQUNEQyxJQUFJLEVBQUU7UUFDSkMsS0FBSyxFQUFFO1VBQ0xDLE1BQU0sRUFBRTtZQUNOQyxhQUFhLEVBQUUsT0FBTztZQUN0QkMsaUJBQWlCLEVBQUUsUUFBUTtZQUMzQkMsY0FBYyxFQUFFLE1BQU07WUFDdEJDLHNCQUFzQixFQUFFLE1BQU07WUFDOUJDLGdCQUFnQixFQUFFLFNBQVM7WUFDM0JDLFlBQVksRUFBRTtVQUNoQixDQUFDO1VBQ0RDLFVBQVUsRUFBRTtRQUNkLENBQUM7UUFDREMsS0FBSyxFQUFFO1VBQ0xSLE1BQU0sRUFBRTtZQUNOQyxhQUFhLEVBQUUsT0FBTztZQUN0QkMsaUJBQWlCLEVBQUUsTUFBTTtZQUN6Qk8sbUJBQW1CLEVBQUUsS0FBSztZQUMxQkMsZ0JBQWdCLEVBQUUsTUFBTTtZQUN4QkMsS0FBSyxFQUFFLFdBQVc7WUFDbEJQLHNCQUFzQixFQUFFLE1BQU07WUFDOUJDLGdCQUFnQixFQUFFLE1BQU07WUFDeEJDLFlBQVksRUFBRTtVQUNoQixDQUFDO1VB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