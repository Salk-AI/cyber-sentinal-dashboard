"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.USER_NAMES = exports.SERVER_ADDRESS_WEBHOOK = exports.REPOSITORY_NAMES = exports.ORGANIZATION_NAMES = exports.LOCATION = exports.DECODER = exports.COUNTRY_CODES = exports.ALERT_TYPES = exports.ACTORS = void 0;
/*
 * Wazuh app - GitHub sample data
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

const LOCATION = exports.LOCATION = 'github';
const DECODER = exports.DECODER = {
  "name": "json"
};
const COUNTRY_CODES = exports.COUNTRY_CODES = ['AR', 'CA', 'DE', 'ES', 'FR', 'GR', 'IN', 'MX', 'SE', 'US'];
const baseElements = Array(10).fill();
const ORGANIZATION_NAMES = exports.ORGANIZATION_NAMES = baseElements.map((_, index) => `Organization${index + 1}`);
const USER_NAMES = exports.USER_NAMES = baseElements.map((_, index) => `User${index + 1}`);
const REPOSITORY_NAMES = exports.REPOSITORY_NAMES = baseElements.map((_, index) => `Repo${index + 1}`);
const ACTORS = exports.ACTORS = baseElements.map((_, index) => ({
  name: USER_NAMES[index],
  country_code: COUNTRY_CODES[index]
}));
const SERVER_ADDRESS_WEBHOOK = exports.SERVER_ADDRESS_WEBHOOK = ['https://server/webhook', 'https://cool_server/integrations/webhook', 'https://another_server/github_notifications', 'https://my_web/notifications/webhook'];
const ALERT_TYPES = exports.ALERT_TYPES = [{
  "rule": {
    "level": 5,
    "description": "GitHub Organization audit log export.",
    "id": "91193",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_org"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624444988681.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624444988681.000000",
      "action": "org.audit_log_export",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "_document_id": "ElEQJvOCnhWZ2mVpjzYOMw"
    }
  }
}, {
  "rule": {
    "level": 5,
    "description": "GitHub Team create.",
    "id": "91397",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_team"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624445678369.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624445678369.000000",
      "action": "team.create",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "team": "_ORGANIZATION_/_REPOSITORY_",
      "_document_id": "cC4uIXPNDz1O1G21Vjs8Vw"
    }
  }
}, {
  "rule": {
    "level": 5,
    "description": "GitHub Team add member.",
    "id": "91393",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_team"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624445678470.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624445678470.000000",
      "action": "team.add_member",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "team": "_ORGANIZATION_/_REPOSITORY_",
      "user": "_USER_",
      "_document_id": "0Z4NBBhHM2T4gEuWziZfvQ"
    }
  }
}, {
  "rule": {
    "level": 5,
    "description": "GitHub Team add member.",
    "id": "91393",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_team"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624445927571.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624445927571.000000",
      "action": "team.add_member",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "team": "_ORGANIZATION_/_REPOSITORY_",
      "user": "_USER_",
      "_document_id": "Hi6dpYdi9G5PrEqqTkEYnA"
    }
  }
}, {
  "rule": {
    "level": 5,
    "description": "GitHub Repo create.",
    "id": "91318",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_repo"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624445965569.000000",
      "visibility": "private",
      "org": "_ORGANIZATION_",
      "repo": "_ORGANIZATION_/_REPOSITORY_",
      "created_at": "1624445965569.000000",
      "action": "repo.create",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "_document_id": "fXwGe7IW-BX8Ze64V_AORg"
    }
  }
}, {
  "rule": {
    "level": 3,
    "description": "GitHub Git clone.",
    "id": "91158",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_git"]
  },
  "data": {
    "integration": "github",
    "github": {
      "@timestamp": "1624445969188.000000",
      "org": "_ORGANIZATION_",
      "repo": "_ORGANIZATION_/_REPOSITORY_",
      "action": "git.clone",
      "transport_protocol_name": "http",
      "transport_protocol": "1",
      "repository": "_ORGANIZATION_/_REPOSITORY_",
      "repository_public": "false"
    }
  }
}, {
  "rule": {
    "level": 3,
    "description": "GitHub Git clone.",
    "id": "91158",
    "firedtimes": 2,
    "mail": false,
    "groups": ["github", "git", "git_git"]
  },
  "data": {
    "integration": "github",
    "github": {
      "@timestamp": "1624446009635.000000",
      "org": "_ORGANIZATION_",
      "repo": "_ORGANIZATION_/_REPOSITORY_",
      "action": "git.clone",
      "transport_protocol_name": "http",
      "transport_protocol": "1",
      "repository": "_ORGANIZATION_/_REPOSITORY_",
      "repository_public": "false"
    }
  }
}, {
  "rule": {
    "level": 5,
    "description": "GitHub Organization audit log export.",
    "id": "91193",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_org"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624446236415.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624446236415.000000",
      "action": "org.audit_log_git_event_export",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "_document_id": "vkV52PbNTZPJRRNLuOZcuw"
    }
  }
}, {
  "rule": {
    "level": 5,
    "description": "GitHub Organization audit log export.",
    "id": "91193",
    "firedtimes": 2,
    "mail": false,
    "groups": ["github", "git", "git_org"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624446254661.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624446254661.000000",
      "action": "org.audit_log_export",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "_document_id": "gwkccTbAcX2WujhEXS3r0Q"
    }
  }
}, {
  "rule": {
    "level": 5,
    "description": "GitHub Team create.",
    "id": "91397",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_team"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624446278480.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624446278480.000000",
      "action": "team.create",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "team": "_ORGANIZATION_/_REPOSITORY_",
      "_document_id": "Qf6RhFYhb7ysdV8K8ukYFw"
    }
  }
}, {
  "rule": {
    "level": 5,
    "description": "GitHub Team add member.",
    "id": "91393",
    "firedtimes": 2,
    "mail": false,
    "groups": ["github", "git", "git_team"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624446278606.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624446278606.000000",
      "action": "team.add_member",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "team": "_ORGANIZATION_/_REPOSITORY_",
      "user": "_USER_",
      "_document_id": "T6DZ-t0-a9yQShoBbUxc_g"
    }
  }
}, {
  "rule": {
    "level": 7,
    "description": "GitHub Team destroy.",
    "id": "91399",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_team"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624446293390.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624446293390.000000",
      "action": "team.destroy",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "team": "_ORGANIZATION_/_REPOSITORY_",
      "_document_id": "ZLC0q4Ka_R4gGw3gWgxc3w"
    }
  }
}, {
  "rule": {
    "level": 7,
    "description": "GitHub Team remove member.",
    "id": "91401",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_team"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624446387691.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624446387691.000000",
      "action": "team.remove_member",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "team": "_ORGANIZATION_/backend",
      "user": "_USER_",
      "_document_id": "PYn3TOghg5FYze673svhgw"
    }
  }
}, {
  "rule": {
    "level": 5,
    "description": "GitHub Team add member.",
    "id": "91393",
    "firedtimes": 3,
    "mail": false,
    "groups": ["github", "git", "git_team"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624446397464.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624446397464.000000",
      "action": "team.add_member",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "team": "_ORGANIZATION_/backend",
      "user": "_USER_",
      "_document_id": "z4qIP_kjzjnilIhL8ak0mg"
    }
  }
}, {
  "rule": {
    "level": 3,
    "description": "GitHub Dependency graph new repos enable.",
    "id": "91131",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_dependency_graph_new_repos"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624446915154.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624446915154.000000",
      "action": "dependency_graph_new_repos.enable",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "user": "_USER_",
      "_document_id": "2Az9XCqb-Fe8k0KkLQlk0A"
    }
  }
}, {
  "rule": {
    "level": 12,
    "description": "GitHub Dependency graph new repos disable.",
    "id": "91130",
    "firedtimes": 1,
    "mail": true,
    "groups": ["github", "git", "git_dependency_graph_new_repos"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624446916718.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624446916718.000000",
      "action": "dependency_graph_new_repos.disable",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "user": "_USER_",
      "_document_id": "TzBGANy3SmrnxI8GW9bpQA"
    }
  }
}, {
  "rule": {
    "level": 5,
    "description": "GitHub Hook create.",
    "id": "91162",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_hook"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624446982688.000000",
      "org": "_ORGANIZATION_",
      "hook_id": "303999727",
      "name": "webhook",
      "created_at": "1624446982688.000000",
      "action": "hook.create",
      "active": "true",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "config": {
        "content_type": "json",
        "insecure_ssl": "0",
        "secret": "********",
        "url": "_SERVER_ADDRESS_WEBHOOK_"
      },
      "events": ["push"],
      "_document_id": "SSlObiXNNtzQzxFooK4-fw"
    }
  }
}, {
  "rule": {
    "level": 5,
    "description": "GitHub Hook events changed.",
    "id": "91165",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_hook"]
  },
  "data": {
    "integration": "github",
    "github": {
      "org": "_ORGANIZATION_",
      "created_at": "1624447042505.000000",
      "active": "true",
      "actor": "_USER_",
      "@timestamp": "1624447042505.000000",
      "hook_id": "303999727",
      "name": "webhook",
      "action": "hook.events_changed",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "config": {
        "content_type": "json",
        "insecure_ssl": "0",
        "secret": "********",
        "url": "_SERVER_ADDRESS_WEBHOOK_"
      },
      "events": ["push", "create", "deployment", "fork", "issues"],
      "_document_id": "Ba9NJbFnSfJB1zGEn29asw",
      "events_were": ["push"]
    }
  }
}, {
  "rule": {
    "level": 3,
    "description": "GitHub Git clone.",
    "id": "91158",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_git"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624447139607.000000",
      "org": "_ORGANIZATION_",
      "repo": "_ORGANIZATION_/_REPOSITORY_",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "action": "git.clone",
      "transport_protocol_name": "http",
      "transport_protocol": "1",
      "repository": "_ORGANIZATION_/_REPOSITORY_",
      "repository_public": "false"
    }
  }
}, {
  "rule": {
    "level": 3,
    "description": "GitHub Git push.",
    "id": "91160",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_git"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624447520462.000000",
      "org": "_ORGANIZATION_",
      "repo": "_ORGANIZATION_/_REPOSITORY_",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "action": "git.push",
      "transport_protocol_name": "http",
      "transport_protocol": "1",
      "repository": "_ORGANIZATION_/_REPOSITORY_",
      "repository_public": "false"
    }
  }
}, {
  "rule": {
    "level": 3,
    "description": "GitHub Git push.",
    "id": "91160",
    "firedtimes": 2,
    "mail": false,
    "groups": ["github", "git", "git_git"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624447522682.000000",
      "org": "_ORGANIZATION_",
      "repo": "_ORGANIZATION_/_REPOSITORY_",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "action": "git.push",
      "transport_protocol_name": "http",
      "transport_protocol": "1",
      "repository": "_ORGANIZATION_/_REPOSITORY_",
      "repository_public": "false"
    }
  }
}, {
  "rule": {
    "level": 3,
    "description": "GitHub Git clone.",
    "id": "91158",
    "firedtimes": 2,
    "mail": false,
    "groups": ["github", "git", "git_git"]
  },
  "data": {
    "integration": "github",
    "github": {
      "@timestamp": "1624447527007.000000",
      "org": "_ORGANIZATION_",
      "repo": "_ORGANIZATION_/_REPOSITORY_",
      "action": "git.clone",
      "transport_protocol_name": "http",
      "transport_protocol": "1",
      "repository": "_ORGANIZATION_/_REPOSITORY_",
      "repository_public": "false"
    }
  }
}, {
  "rule": {
    "level": 5,
    "description": "GitHub Repo create.",
    "id": "91318",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_repo"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624447568303.000000",
      "visibility": "private",
      "org": "_ORGANIZATION_",
      "repo": "_ORGANIZATION_/_REPOSITORY_",
      "created_at": "1624447568303.000000",
      "action": "repo.create",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "_document_id": "AcrdSmMW0PpEEmuGWiTcoQ"
    }
  }
}, {
  "rule": {
    "level": 9,
    "description": "GitHub Repo destroy.",
    "id": "91320",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_repo"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624447588615.000000",
      "visibility": "private",
      "org": "_ORGANIZATION_",
      "repo": "_ORGANIZATION_/_REPOSITORY_",
      "created_at": "1624447588615.000000",
      "action": "repo.destroy",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "_document_id": "H-bRCuWh_FAoZxzW8BV9JA"
    }
  }
}, {
  "rule": {
    "level": 3,
    "description": "GitHub Git fetch.",
    "id": "91159",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_git"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624447744877.000000",
      "org": "_ORGANIZATION_",
      "repo": "_ORGANIZATION_/_REPOSITORY_",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "action": "git.fetch",
      "transport_protocol_name": "http",
      "transport_protocol": "1",
      "repository": "_ORGANIZATION_/_REPOSITORY_",
      "repository_public": "false"
    }
  }
}, {
  "rule": {
    "level": 7,
    "description": "GitHub Organization update default repository permission.",
    "id": "91231",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_org"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624448015027.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624448015027.000000",
      "action": "org.update_default_repository_permission",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "_document_id": "BHpvG7xc2bTNW3ME3nAgDw"
    }
  }
}, {
  "rule": {
    "level": 7,
    "description": "GitHub Organization update default repository permission.",
    "id": "91231",
    "firedtimes": 2,
    "mail": false,
    "groups": ["github", "git", "git_org"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624448020670.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624448020670.000000",
      "action": "org.update_default_repository_permission",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "_document_id": "t5ZumMJeWBs2CqZT-n4JNA"
    }
  }
}, {
  "rule": {
    "level": 7,
    "description": "GitHub Organization update member repository creation permission.",
    "id": "91233",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_org"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624448034735.000000",
      "visibility": "private_internal",
      "org": "_ORGANIZATION_",
      "created_at": "1624448034735.000000",
      "action": "org.update_member_repository_creation_permission",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "_document_id": "CAwbh8KpE75aa0ajCpRISw"
    }
  }
}, {
  "rule": {
    "level": 7,
    "description": "GitHub Organization update member repository creation permission.",
    "id": "91233",
    "firedtimes": 2,
    "mail": false,
    "groups": ["github", "git", "git_org"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624448038247.000000",
      "visibility": "internal",
      "org": "_ORGANIZATION_",
      "created_at": "1624448038247.000000",
      "action": "org.update_member_repository_creation_permission",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "_document_id": "s96ibVD5sEyRDxYgQ8gKhQ"
    }
  }
}, {
  "rule": {
    "level": 9,
    "description": "GitHub Private repository forking enable.",
    "id": "91273",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_private_repository_forking"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624448046546.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624448046546.000000",
      "action": "private_repository_forking.enable",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "user": "_USER_",
      "_document_id": "NZWBrO2Ac02LnG3TFeEykA"
    }
  }
}, {
  "rule": {
    "level": 5,
    "description": "GitHub Private repository forking disable.",
    "id": "91274",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_private_repository_forking"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624448051193.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624448051193.000000",
      "action": "private_repository_forking.disable",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "user": "_USER_",
      "_document_id": "5EkgWPa8Du6ZJ_5oOfU_rg"
    }
  }
}, {
  "rule": {
    "level": 3,
    "description": "GitHub Generic rule.",
    "id": "91449",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624448069427.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624448069427.000000",
      "action": "members_can_create_private_pages.disable",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "user": "_USER_",
      "_document_id": "0rtyFg2GD2-oJyJsOtRZ_A"
    }
  }
}, {
  "rule": {
    "level": 3,
    "description": "GitHub Generic rule.",
    "id": "91449",
    "firedtimes": 2,
    "mail": false,
    "groups": ["github", "git"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624448073290.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624448073290.000000",
      "action": "members_can_create_private_pages.enable",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "user": "_USER_",
      "_document_id": "sSbImF40N-hLe0mfDHkfMg"
    }
  }
}, {
  "rule": {
    "level": 3,
    "description": "GitHub Generic rule.",
    "id": "91449",
    "firedtimes": 3,
    "mail": false,
    "groups": ["github", "git"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624448089991.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624448089991.000000",
      "action": "repository_visibility_change.enable",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "user": "_USER_",
      "_document_id": "dWJ-7ZR6DdumQeu01PAGig"
    }
  }
}, {
  "rule": {
    "level": 3,
    "description": "GitHub Issues.",
    "id": "91169",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_issues"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624448109958.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624448109958.000000",
      "action": "issues.deletes_enabled",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "user": "_USER_",
      "_document_id": "gWT0UNMVFaI8ZPB3tGGsew"
    }
  }
}, {
  "rule": {
    "level": 3,
    "description": "GitHub Issues.",
    "id": "91169",
    "firedtimes": 2,
    "mail": false,
    "groups": ["github", "git", "git_issues"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624448114493.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624448114493.000000",
      "action": "issues.deletes_disabled",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "user": "_USER_",
      "_document_id": "T2hgq3r3yVD23Np6CAD-zQ"
    }
  }
}, {
  "rule": {
    "level": 5,
    "description": "GitHub Organization display commenter full name enabled.",
    "id": "91202",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_org"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624448121171.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624448121171.000000",
      "action": "org.display_commenter_full_name_enabled",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "user": "_USER_",
      "_document_id": "o-Edi8owvz1iPv78RPPSJw"
    }
  }
}, {
  "rule": {
    "level": 3,
    "description": "GitHub Organization.",
    "id": "91188",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_org"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624448125116.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624448125116.000000",
      "action": "org.display_commenter_full_name_disabled",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "user": "_USER_",
      "_document_id": "OxJjqpug2FM8RJuzE1CZpA"
    }
  }
}, {
  "rule": {
    "level": 3,
    "description": "GitHub Organization.",
    "id": "91188",
    "firedtimes": 2,
    "mail": false,
    "groups": ["github", "git", "git_org"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624448133245.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624448133245.000000",
      "action": "org.enable_reader_discussion_creation_permission",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "user": "_USER_",
      "_document_id": "5KmA_VkQPn3I6gY4L8qFPA"
    }
  }
}, {
  "rule": {
    "level": 3,
    "description": "GitHub Organization.",
    "id": "91188",
    "firedtimes": 3,
    "mail": false,
    "groups": ["github", "git", "git_org"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624448138392.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624448138392.000000",
      "action": "org.disable_reader_discussion_creation_permission",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "user": "_USER_",
      "_document_id": "JQ3JAd3zHmpRpGZYJsJIQw"
    }
  }
}, {
  "rule": {
    "level": 5,
    "description": "GitHub Organization enable member team creation permission.",
    "id": "91203",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_org"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624448148271.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624448148271.000000",
      "action": "org.enable_member_team_creation_permission",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "user": "_USER_",
      "_document_id": "sd2fnKW-Jc_OZI9xm2pyyQ"
    }
  }
}, {
  "rule": {
    "level": 9,
    "description": "GitHub Organization disable member team creation permission.",
    "id": "91198",
    "firedtimes": 1,
    "mail": false,
    "groups": ["github", "git", "git_org"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624448154972.000000",
      "org": "_ORGANIZATION_",
      "created_at": "1624448154972.000000",
      "action": "org.disable_member_team_creation_permission",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "user": "_USER_",
      "_document_id": "ppjVxGQBAQts82at9Az3XQ"
    }
  }
}, {
  "rule": {
    "level": 12,
    "description": "GitHub Repository vulnerability alerts disable.",
    "id": "91367",
    "firedtimes": 1,
    "mail": true,
    "groups": ["github", "git", "git_repository_vulnerability_alerts"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624448419210.000000",
      "org": "_ORGANIZATION_",
      "repo": "_ORGANIZATION_/_REPOSITORY_",
      "created_at": "1624448419210.000000",
      "action": "repository_vulnerability_alerts.disable",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "user": "_USER_",
      "_document_id": "wgf0uCen5LG4su6jQ2xKDA"
    }
  }
}, {
  "rule": {
    "level": 5,
    "description": "GitHub Repo create.",
    "id": "91318",
    "firedtimes": 2,
    "mail": false,
    "groups": ["github", "git", "git_repo"]
  },
  "data": {
    "integration": "github",
    "github": {
      "actor": "_USER_",
      "@timestamp": "1624448419470.000000",
      "visibility": "public",
      "org": "_ORGANIZATION_",
      "repo": "_ORGANIZATION_/_REPOSITORY_",
      "created_at": "1624448419470.000000",
      "action": "repo.create",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "_document_id": "oLAjZ_DbHvzZlPmRCXr4MA"
    }
  }
}, {
  "rule": {
    "level": 3,
    "description": "GitHub Git clone.",
    "id": "91158",
    "firedtimes": 3,
    "mail": false,
    "groups": ["github", "git", "git_git"]
  },
  "data": {
    "integration": "github",
    "github": {
      "@timestamp": "1624448422207.000000",
      "org": "_ORGANIZATION_",
      "repo": "_ORGANIZATION_/_REPOSITORY_",
      "action": "git.clone",
      "transport_protocol_name": "http",
      "transport_protocol": "1",
      "repository": "_ORGANIZATION_/_REPOSITORY_",
      "repository_public": "true"
    }
  }
}, {
  "rule": {
    "level": 3,
    "description": "GitHub Git clone.",
    "id": "91158",
    "firedtimes": 4,
    "mail": false,
    "groups": ["github", "git", "git_git"]
  },
  "data": {
    "integration": "github",
    "github": {
      "@timestamp": "1624448423987.000000",
      "org": "_ORGANIZATION_",
      "repo": "_ORGANIZATION_/_REPOSITORY_",
      "action": "git.clone",
      "transport_protocol_name": "http",
      "transport_protocol": "1",
      "repository": "_ORGANIZATION_/_REPOSITORY_",
      "repository_public": "true"
    }
  }
}, {
  "rule": {
    "level": 3,
    "description": "GitHub Git clone.",
    "id": "91158",
    "firedtimes": 5,
    "mail": false,
    "groups": ["github", "git", "git_git"]
  },
  "data": {
    "integration": "github",
    "github": {
      "@timestamp": "1624448432101.000000",
      "org": "_ORGANIZATION_",
      "repo": "_ORGANIZATION_/_REPOSITORY_",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "action": "git.clone",
      "transport_protocol_name": "http",
      "transport_protocol": "1",
      "repository": "_ORGANIZATION_/_REPOSITORY_",
      "repository_public": "true"
    }
  }
}, {
  "rule": {
    "level": 3,
    "description": "GitHub Git clone.",
    "id": "91158",
    "firedtimes": 6,
    "mail": false,
    "groups": ["github", "git", "git_git"]
  },
  "data": {
    "integration": "github",
    "github": {
      "@timestamp": "1624448487893.000000",
      "org": "_ORGANIZATION_",
      "repo": "_ORGANIZATION_/_REPOSITORY_",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "action": "git.clone",
      "transport_protocol_name": "http",
      "transport_protocol": "1",
      "repository": "_ORGANIZATION_/_REPOSITORY_",
      "repository_public": "true"
    }
  }
}, {
  "rule": {
    "level": 3,
    "description": "GitHub Git clone.",
    "id": "91158",
    "firedtimes": 7,
    "mail": false,
    "groups": ["github", "git", "git_git"]
  },
  "data": {
    "integration": "github",
    "github": {
      "@timestamp": "1624448736294.000000",
      "org": "_ORGANIZATION_",
      "repo": "_ORGANIZATION_/_REPOSITORY_",
      "actor_location": {
        "country_code": "_COUNTRY_CODE_"
      },
      "action": "git.clone",
      "transport_protocol_name": "http",
      "transport_protocol": "1",
      "repository": "_ORGANIZATION_/_REPOSITORY_",
      "repository_public": "true"
    }
  }
}];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJMT0NBVElPTiIsImV4cG9ydHMiLCJERUNPREVSIiwiQ09VTlRSWV9DT0RFUyIsImJhc2VFbGVtZW50cyIsIkFycmF5IiwiZmlsbCIsIk9SR0FOSVpBVElPTl9OQU1FUyIsIm1hcCIsIl8iLCJpbmRleCIsIlVTRVJfTkFNRVMiLCJSRVBPU0lUT1JZX05BTUVTIiwiQUNUT1JTIiwibmFtZSIsImNvdW50cnlfY29kZSIsIlNFUlZFUl9BRERSRVNTX1dFQkhPT0siLCJBTEVSVF9UWVBFUyJdLCJzb3VyY2VzIjpbImdpdGh1Yi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuICogV2F6dWggYXBwIC0gR2l0SHViIHNhbXBsZSBkYXRhXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTUtMjAyMiBXYXp1aCwgSW5jLlxuICpcbiAqIFRoaXMgcHJvZ3JhbSBpcyBmcmVlIHNvZnR3YXJlOyB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XG4gKiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxuICogdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbjsgZWl0aGVyIHZlcnNpb24gMiBvZiB0aGUgTGljZW5zZSwgb3JcbiAqIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogRmluZCBtb3JlIGluZm9ybWF0aW9uIGFib3V0IHRoaXMgb24gdGhlIExJQ0VOU0UgZmlsZS5cbiAqL1xuXG5leHBvcnQgY29uc3QgTE9DQVRJT04gPSAnZ2l0aHViJztcblxuZXhwb3J0IGNvbnN0IERFQ09ERVIgPSB7IFwibmFtZVwiOiBcImpzb25cIiB9O1xuXG5leHBvcnQgY29uc3QgQ09VTlRSWV9DT0RFUyA9IFtcbiAgJ0FSJyxcbiAgJ0NBJyxcbiAgJ0RFJyxcbiAgJ0VTJyxcbiAgJ0ZSJyxcbiAgJ0dSJyxcbiAgJ0lOJyxcbiAgJ01YJyxcbiAgJ1NFJyxcbiAgJ1VTJ1xuXTtcblxuY29uc3QgYmFzZUVsZW1lbnRzID0gQXJyYXkoMTApLmZpbGwoKTtcblxuZXhwb3J0IGNvbnN0IE9SR0FOSVpBVElPTl9OQU1FUyA9IGJhc2VFbGVtZW50cy5tYXAoKF8sIGluZGV4KSA9PiBgT3JnYW5pemF0aW9uJHtpbmRleCArIDF9YCk7XG5cbmV4cG9ydCBjb25zdCBVU0VSX05BTUVTID0gYmFzZUVsZW1lbnRzLm1hcCgoXywgaW5kZXgpID0+IGBVc2VyJHtpbmRleCArIDF9YCk7XG5cbmV4cG9ydCBjb25zdCBSRVBPU0lUT1JZX05BTUVTID0gYmFzZUVsZW1lbnRzLm1hcCgoXywgaW5kZXgpID0+IGBSZXBvJHtpbmRleCArIDF9YCk7XG5cbmV4cG9ydCBjb25zdCBBQ1RPUlMgPSBiYXNlRWxlbWVudHMubWFwKChfLCBpbmRleCkgPT4gKHsgbmFtZTogVVNFUl9OQU1FU1tpbmRleF0sIGNvdW50cnlfY29kZTogQ09VTlRSWV9DT0RFU1tpbmRleF0gfSkpO1xuXG5leHBvcnQgY29uc3QgU0VSVkVSX0FERFJFU1NfV0VCSE9PSyA9IFtcbiAgJ2h0dHBzOi8vc2VydmVyL3dlYmhvb2snLFxuICAnaHR0cHM6Ly9jb29sX3NlcnZlci9pbnRlZ3JhdGlvbnMvd2ViaG9vaycsXG4gICdodHRwczovL2Fub3RoZXJfc2VydmVyL2dpdGh1Yl9ub3RpZmljYXRpb25zJyxcbiAgJ2h0dHBzOi8vbXlfd2ViL25vdGlmaWNhdGlvbnMvd2ViaG9vaycsXG5dO1xuXG5leHBvcnQgY29uc3QgQUxFUlRfVFlQRVMgPSBbXG4gIHsgXCJydWxlXCI6IHsgXCJsZXZlbFwiOiA1LCBcImRlc2NyaXB0aW9uXCI6IFwiR2l0SHViIE9yZ2FuaXphdGlvbiBhdWRpdCBsb2cgZXhwb3J0LlwiLCBcImlkXCI6IFwiOTExOTNcIiwgXCJmaXJlZHRpbWVzXCI6IDEsIFwibWFpbFwiOiBmYWxzZSwgXCJncm91cHNcIjogW1wiZ2l0aHViXCIsIFwiZ2l0XCIsIFwiZ2l0X29yZ1wiXSB9LCBcImRhdGFcIjogeyBcImludGVncmF0aW9uXCI6IFwiZ2l0aHViXCIsIFwiZ2l0aHViXCI6IHsgXCJhY3RvclwiOiBcIl9VU0VSX1wiLCBcIkB0aW1lc3RhbXBcIjogXCIxNjI0NDQ0OTg4NjgxLjAwMDAwMFwiLCBcIm9yZ1wiOiBcIl9PUkdBTklaQVRJT05fXCIsIFwiY3JlYXRlZF9hdFwiOiBcIjE2MjQ0NDQ5ODg2ODEuMDAwMDAwXCIsIFwiYWN0aW9uXCI6IFwib3JnLmF1ZGl0X2xvZ19leHBvcnRcIiwgXCJhY3Rvcl9sb2NhdGlvblwiOiB7IFwiY291bnRyeV9jb2RlXCI6IFwiX0NPVU5UUllfQ09ERV9cIiB9LCBcIl9kb2N1bWVudF9pZFwiOiBcIkVsRVFKdk9DbmhXWjJtVnBqellPTXdcIiB9IH0gfSxcbiAgeyBcInJ1bGVcIjogeyBcImxldmVsXCI6IDUsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRIdWIgVGVhbSBjcmVhdGUuXCIsIFwiaWRcIjogXCI5MTM5N1wiLCBcImZpcmVkdGltZXNcIjogMSwgXCJtYWlsXCI6IGZhbHNlLCBcImdyb3Vwc1wiOiBbXCJnaXRodWJcIiwgXCJnaXRcIiwgXCJnaXRfdGVhbVwiXSB9LCBcImRhdGFcIjogeyBcImludGVncmF0aW9uXCI6IFwiZ2l0aHViXCIsIFwiZ2l0aHViXCI6IHsgXCJhY3RvclwiOiBcIl9VU0VSX1wiLCBcIkB0aW1lc3RhbXBcIjogXCIxNjI0NDQ1Njc4MzY5LjAwMDAwMFwiLCBcIm9yZ1wiOiBcIl9PUkdBTklaQVRJT05fXCIsIFwiY3JlYXRlZF9hdFwiOiBcIjE2MjQ0NDU2NzgzNjkuMDAwMDAwXCIsIFwiYWN0aW9uXCI6IFwidGVhbS5jcmVhdGVcIiwgXCJhY3Rvcl9sb2NhdGlvblwiOiB7IFwiY291bnRyeV9jb2RlXCI6IFwiX0NPVU5UUllfQ09ERV9cIiB9LCBcInRlYW1cIjogXCJfT1JHQU5JWkFUSU9OXy9fUkVQT1NJVE9SWV9cIiwgXCJfZG9jdW1lbnRfaWRcIjogXCJjQzR1SVhQTkR6MU8xRzIxVmpzOFZ3XCIgfSB9IH0sXG4gIHsgXCJydWxlXCI6IHsgXCJsZXZlbFwiOiA1LCBcImRlc2NyaXB0aW9uXCI6IFwiR2l0SHViIFRlYW0gYWRkIG1lbWJlci5cIiwgXCJpZFwiOiBcIjkxMzkzXCIsIFwiZmlyZWR0aW1lc1wiOiAxLCBcIm1haWxcIjogZmFsc2UsIFwiZ3JvdXBzXCI6IFtcImdpdGh1YlwiLCBcImdpdFwiLCBcImdpdF90ZWFtXCJdIH0sIFwiZGF0YVwiOiB7IFwiaW50ZWdyYXRpb25cIjogXCJnaXRodWJcIiwgXCJnaXRodWJcIjogeyBcImFjdG9yXCI6IFwiX1VTRVJfXCIsIFwiQHRpbWVzdGFtcFwiOiBcIjE2MjQ0NDU2Nzg0NzAuMDAwMDAwXCIsIFwib3JnXCI6IFwiX09SR0FOSVpBVElPTl9cIiwgXCJjcmVhdGVkX2F0XCI6IFwiMTYyNDQ0NTY3ODQ3MC4wMDAwMDBcIiwgXCJhY3Rpb25cIjogXCJ0ZWFtLmFkZF9tZW1iZXJcIiwgXCJhY3Rvcl9sb2NhdGlvblwiOiB7IFwiY291bnRyeV9jb2RlXCI6IFwiX0NPVU5UUllfQ09ERV9cIiB9LCBcInRlYW1cIjogXCJfT1JHQU5JWkFUSU9OXy9fUkVQT1NJVE9SWV9cIiwgXCJ1c2VyXCI6IFwiX1VTRVJfXCIsIFwiX2RvY3VtZW50X2lkXCI6IFwiMFo0TkJCaEhNMlQ0Z0V1V3ppWmZ2UVwiIH0gfSB9LFxuICB7IFwicnVsZVwiOiB7IFwibGV2ZWxcIjogNSwgXCJkZXNjcmlwdGlvblwiOiBcIkdpdEh1YiBUZWFtIGFkZCBtZW1iZXIuXCIsIFwiaWRcIjogXCI5MTM5M1wiLCBcImZpcmVkdGltZXNcIjogMSwgXCJtYWlsXCI6IGZhbHNlLCBcImdyb3Vwc1wiOiBbXCJnaXRodWJcIiwgXCJnaXRcIiwgXCJnaXRfdGVhbVwiXSB9LCBcImRhdGFcIjogeyBcImludGVncmF0aW9uXCI6IFwiZ2l0aHViXCIsIFwiZ2l0aHViXCI6IHsgXCJhY3RvclwiOiBcIl9VU0VSX1wiLCBcIkB0aW1lc3RhbXBcIjogXCIxNjI0NDQ1OTI3NTcxLjAwMDAwMFwiLCBcIm9yZ1wiOiBcIl9PUkdBTklaQVRJT05fXCIsIFwiY3JlYXRlZF9hdFwiOiBcIjE2MjQ0NDU5Mjc1NzEuMDAwMDAwXCIsIFwiYWN0aW9uXCI6IFwidGVhbS5hZGRfbWVtYmVyXCIsIFwiYWN0b3JfbG9jYXRpb25cIjogeyBcImNvdW50cnlfY29kZVwiOiBcIl9DT1VOVFJZX0NPREVfXCIgfSwgXCJ0ZWFtXCI6IFwiX09SR0FOSVpBVElPTl8vX1JFUE9TSVRPUllfXCIsIFwidXNlclwiOiBcIl9VU0VSX1wiLCBcIl9kb2N1bWVudF9pZFwiOiBcIkhpNmRwWWRpOUc1UHJFcXFUa0VZbkFcIiB9IH0gfSxcbiAgeyBcInJ1bGVcIjogeyBcImxldmVsXCI6IDUsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRIdWIgUmVwbyBjcmVhdGUuXCIsIFwiaWRcIjogXCI5MTMxOFwiLCBcImZpcmVkdGltZXNcIjogMSwgXCJtYWlsXCI6IGZhbHNlLCBcImdyb3Vwc1wiOiBbXCJnaXRodWJcIiwgXCJnaXRcIiwgXCJnaXRfcmVwb1wiXSB9LCBcImRhdGFcIjogeyBcImludGVncmF0aW9uXCI6IFwiZ2l0aHViXCIsIFwiZ2l0aHViXCI6IHsgXCJhY3RvclwiOiBcIl9VU0VSX1wiLCBcIkB0aW1lc3RhbXBcIjogXCIxNjI0NDQ1OTY1NTY5LjAwMDAwMFwiLCBcInZpc2liaWxpdHlcIjogXCJwcml2YXRlXCIsIFwib3JnXCI6IFwiX09SR0FOSVpBVElPTl9cIiwgXCJyZXBvXCI6IFwiX09SR0FOSVpBVElPTl8vX1JFUE9TSVRPUllfXCIsIFwiY3JlYXRlZF9hdFwiOiBcIjE2MjQ0NDU5NjU1NjkuMDAwMDAwXCIsIFwiYWN0aW9uXCI6IFwicmVwby5jcmVhdGVcIiwgXCJhY3Rvcl9sb2NhdGlvblwiOiB7IFwiY291bnRyeV9jb2RlXCI6IFwiX0NPVU5UUllfQ09ERV9cIiB9LCBcIl9kb2N1bWVudF9pZFwiOiBcImZYd0dlN0lXLUJYOFplNjRWX0FPUmdcIiB9IH0gfSxcbiAgeyBcInJ1bGVcIjogeyBcImxldmVsXCI6IDMsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRIdWIgR2l0IGNsb25lLlwiLCBcImlkXCI6IFwiOTExNThcIiwgXCJmaXJlZHRpbWVzXCI6IDEsIFwibWFpbFwiOiBmYWxzZSwgXCJncm91cHNcIjogW1wiZ2l0aHViXCIsIFwiZ2l0XCIsIFwiZ2l0X2dpdFwiXSB9LCBcImRhdGFcIjogeyBcImludGVncmF0aW9uXCI6IFwiZ2l0aHViXCIsIFwiZ2l0aHViXCI6IHsgXCJAdGltZXN0YW1wXCI6IFwiMTYyNDQ0NTk2OTE4OC4wMDAwMDBcIiwgXCJvcmdcIjogXCJfT1JHQU5JWkFUSU9OX1wiLCBcInJlcG9cIjogXCJfT1JHQU5JWkFUSU9OXy9fUkVQT1NJVE9SWV9cIiwgXCJhY3Rpb25cIjogXCJnaXQuY2xvbmVcIiwgXCJ0cmFuc3BvcnRfcHJvdG9jb2xfbmFtZVwiOiBcImh0dHBcIiwgXCJ0cmFuc3BvcnRfcHJvdG9jb2xcIjogXCIxXCIsIFwicmVwb3NpdG9yeVwiOiBcIl9PUkdBTklaQVRJT05fL19SRVBPU0lUT1JZX1wiLCBcInJlcG9zaXRvcnlfcHVibGljXCI6IFwiZmFsc2VcIiB9IH0gfSxcbiAgeyBcInJ1bGVcIjogeyBcImxldmVsXCI6IDMsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRIdWIgR2l0IGNsb25lLlwiLCBcImlkXCI6IFwiOTExNThcIiwgXCJmaXJlZHRpbWVzXCI6IDIsIFwibWFpbFwiOiBmYWxzZSwgXCJncm91cHNcIjogW1wiZ2l0aHViXCIsIFwiZ2l0XCIsIFwiZ2l0X2dpdFwiXSB9LCBcImRhdGFcIjogeyBcImludGVncmF0aW9uXCI6IFwiZ2l0aHViXCIsIFwiZ2l0aHViXCI6IHsgXCJAdGltZXN0YW1wXCI6IFwiMTYyNDQ0NjAwOTYzNS4wMDAwMDBcIiwgXCJvcmdcIjogXCJfT1JHQU5JWkFUSU9OX1wiLCBcInJlcG9cIjogXCJfT1JHQU5JWkFUSU9OXy9fUkVQT1NJVE9SWV9cIiwgXCJhY3Rpb25cIjogXCJnaXQuY2xvbmVcIiwgXCJ0cmFuc3BvcnRfcHJvdG9jb2xfbmFtZVwiOiBcImh0dHBcIiwgXCJ0cmFuc3BvcnRfcHJvdG9jb2xcIjogXCIxXCIsIFwicmVwb3NpdG9yeVwiOiBcIl9PUkdBTklaQVRJT05fL19SRVBPU0lUT1JZX1wiLCBcInJlcG9zaXRvcnlfcHVibGljXCI6IFwiZmFsc2VcIiB9IH0gfSxcbiAgeyBcInJ1bGVcIjogeyBcImxldmVsXCI6IDUsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRIdWIgT3JnYW5pemF0aW9uIGF1ZGl0IGxvZyBleHBvcnQuXCIsIFwiaWRcIjogXCI5MTE5M1wiLCBcImZpcmVkdGltZXNcIjogMSwgXCJtYWlsXCI6IGZhbHNlLCBcImdyb3Vwc1wiOiBbXCJnaXRodWJcIiwgXCJnaXRcIiwgXCJnaXRfb3JnXCJdIH0sIFwiZGF0YVwiOiB7IFwiaW50ZWdyYXRpb25cIjogXCJnaXRodWJcIiwgXCJnaXRodWJcIjogeyBcImFjdG9yXCI6IFwiX1VTRVJfXCIsIFwiQHRpbWVzdGFtcFwiOiBcIjE2MjQ0NDYyMzY0MTUuMDAwMDAwXCIsIFwib3JnXCI6IFwiX09SR0FOSVpBVElPTl9cIiwgXCJjcmVhdGVkX2F0XCI6IFwiMTYyNDQ0NjIzNjQxNS4wMDAwMDBcIiwgXCJhY3Rpb25cIjogXCJvcmcuYXVkaXRfbG9nX2dpdF9ldmVudF9leHBvcnRcIiwgXCJhY3Rvcl9sb2NhdGlvblwiOiB7IFwiY291bnRyeV9jb2RlXCI6IFwiX0NPVU5UUllfQ09ERV9cIiB9LCBcIl9kb2N1bWVudF9pZFwiOiBcInZrVjUyUGJOVFpQSlJSTkx1T1pjdXdcIiB9IH0gfSxcbiAgeyBcInJ1bGVcIjogeyBcImxldmVsXCI6IDUsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRIdWIgT3JnYW5pemF0aW9uIGF1ZGl0IGxvZyBleHBvcnQuXCIsIFwiaWRcIjogXCI5MTE5M1wiLCBcImZpcmVkdGltZXNcIjogMiwgXCJtYWlsXCI6IGZhbHNlLCBcImdyb3Vwc1wiOiBbXCJnaXRodWJcIiwgXCJnaXRcIiwgXCJnaXRfb3JnXCJdIH0sIFwiZGF0YVwiOiB7IFwiaW50ZWdyYXRpb25cIjogXCJnaXRodWJcIiwgXCJnaXRodWJcIjogeyBcImFjdG9yXCI6IFwiX1VTRVJfXCIsIFwiQHRpbWVzdGFtcFwiOiBcIjE2MjQ0NDYyNTQ2NjEuMDAwMDAwXCIsIFwib3JnXCI6IFwiX09SR0FOSVpBVElPTl9cIiwgXCJjcmVhdGVkX2F0XCI6IFwiMTYyNDQ0NjI1NDY2MS4wMDAwMDBcIiwgXCJhY3Rpb25cIjogXCJvcmcuYXVkaXRfbG9nX2V4cG9ydFwiLCBcImFjdG9yX2xvY2F0aW9uXCI6IHsgXCJjb3VudHJ5X2NvZGVcIjogXCJfQ09VTlRSWV9DT0RFX1wiIH0sIFwiX2RvY3VtZW50X2lkXCI6IFwiZ3drY2NUYkFjWDJXdWpoRVhTM3IwUVwiIH0gfSB9LFxuICB7IFwicnVsZVwiOiB7IFwibGV2ZWxcIjogNSwgXCJkZXNjcmlwdGlvblwiOiBcIkdpdEh1YiBUZWFtIGNyZWF0ZS5cIiwgXCJpZFwiOiBcIjkxMzk3XCIsIFwiZmlyZWR0aW1lc1wiOiAxLCBcIm1haWxcIjogZmFsc2UsIFwiZ3JvdXBzXCI6IFtcImdpdGh1YlwiLCBcImdpdFwiLCBcImdpdF90ZWFtXCJdIH0sIFwiZGF0YVwiOiB7IFwiaW50ZWdyYXRpb25cIjogXCJnaXRodWJcIiwgXCJnaXRodWJcIjogeyBcImFjdG9yXCI6IFwiX1VTRVJfXCIsIFwiQHRpbWVzdGFtcFwiOiBcIjE2MjQ0NDYyNzg0ODAuMDAwMDAwXCIsIFwib3JnXCI6IFwiX09SR0FOSVpBVElPTl9cIiwgXCJjcmVhdGVkX2F0XCI6IFwiMTYyNDQ0NjI3ODQ4MC4wMDAwMDBcIiwgXCJhY3Rpb25cIjogXCJ0ZWFtLmNyZWF0ZVwiLCBcImFjdG9yX2xvY2F0aW9uXCI6IHsgXCJjb3VudHJ5X2NvZGVcIjogXCJfQ09VTlRSWV9DT0RFX1wiIH0sIFwidGVhbVwiOiBcIl9PUkdBTklaQVRJT05fL19SRVBPU0lUT1JZX1wiLCBcIl9kb2N1bWVudF9pZFwiOiBcIlFmNlJoRlloYjd5c2RWOEs4dWtZRndcIiB9IH0gfSxcbiAgeyBcInJ1bGVcIjogeyBcImxldmVsXCI6IDUsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRIdWIgVGVhbSBhZGQgbWVtYmVyLlwiLCBcImlkXCI6IFwiOTEzOTNcIiwgXCJmaXJlZHRpbWVzXCI6IDIsIFwibWFpbFwiOiBmYWxzZSwgXCJncm91cHNcIjogW1wiZ2l0aHViXCIsIFwiZ2l0XCIsIFwiZ2l0X3RlYW1cIl0gfSwgXCJkYXRhXCI6IHsgXCJpbnRlZ3JhdGlvblwiOiBcImdpdGh1YlwiLCBcImdpdGh1YlwiOiB7IFwiYWN0b3JcIjogXCJfVVNFUl9cIiwgXCJAdGltZXN0YW1wXCI6IFwiMTYyNDQ0NjI3ODYwNi4wMDAwMDBcIiwgXCJvcmdcIjogXCJfT1JHQU5JWkFUSU9OX1wiLCBcImNyZWF0ZWRfYXRcIjogXCIxNjI0NDQ2Mjc4NjA2LjAwMDAwMFwiLCBcImFjdGlvblwiOiBcInRlYW0uYWRkX21lbWJlclwiLCBcImFjdG9yX2xvY2F0aW9uXCI6IHsgXCJjb3VudHJ5X2NvZGVcIjogXCJfQ09VTlRSWV9DT0RFX1wiIH0sIFwidGVhbVwiOiBcIl9PUkdBTklaQVRJT05fL19SRVBPU0lUT1JZX1wiLCBcInVzZXJcIjogXCJfVVNFUl9cIiwgXCJfZG9jdW1lbnRfaWRcIjogXCJUNkRaLXQwLWE5eVFTaG9CYlV4Y19nXCIgfSB9IH0sXG4gIHsgXCJydWxlXCI6IHsgXCJsZXZlbFwiOiA3LCBcImRlc2NyaXB0aW9uXCI6IFwiR2l0SHViIFRlYW0gZGVzdHJveS5cIiwgXCJpZFwiOiBcIjkxMzk5XCIsIFwiZmlyZWR0aW1lc1wiOiAxLCBcIm1haWxcIjogZmFsc2UsIFwiZ3JvdXBzXCI6IFtcImdpdGh1YlwiLCBcImdpdFwiLCBcImdpdF90ZWFtXCJdIH0sIFwiZGF0YVwiOiB7IFwiaW50ZWdyYXRpb25cIjogXCJnaXRodWJcIiwgXCJnaXRodWJcIjogeyBcImFjdG9yXCI6IFwiX1VTRVJfXCIsIFwiQHRpbWVzdGFtcFwiOiBcIjE2MjQ0NDYyOTMzOTAuMDAwMDAwXCIsIFwib3JnXCI6IFwiX09SR0FOSVpBVElPTl9cIiwgXCJjcmVhdGVkX2F0XCI6IFwiMTYyNDQ0NjI5MzM5MC4wMDAwMDBcIiwgXCJhY3Rpb25cIjogXCJ0ZWFtLmRlc3Ryb3lcIiwgXCJhY3Rvcl9sb2NhdGlvblwiOiB7IFwiY291bnRyeV9jb2RlXCI6IFwiX0NPVU5UUllfQ09ERV9cIiB9LCBcInRlYW1cIjogXCJfT1JHQU5JWkFUSU9OXy9fUkVQT1NJVE9SWV9cIiwgXCJfZG9jdW1lbnRfaWRcIjogXCJaTEMwcTRLYV9SNGdHdzNnV2d4YzN3XCIgfSB9IH0sXG4gIHsgXCJydWxlXCI6IHsgXCJsZXZlbFwiOiA3LCBcImRlc2NyaXB0aW9uXCI6IFwiR2l0SHViIFRlYW0gcmVtb3ZlIG1lbWJlci5cIiwgXCJpZFwiOiBcIjkxNDAxXCIsIFwiZmlyZWR0aW1lc1wiOiAxLCBcIm1haWxcIjogZmFsc2UsIFwiZ3JvdXBzXCI6IFtcImdpdGh1YlwiLCBcImdpdFwiLCBcImdpdF90ZWFtXCJdIH0sIFwiZGF0YVwiOiB7IFwiaW50ZWdyYXRpb25cIjogXCJnaXRodWJcIiwgXCJnaXRodWJcIjogeyBcImFjdG9yXCI6IFwiX1VTRVJfXCIsIFwiQHRpbWVzdGFtcFwiOiBcIjE2MjQ0NDYzODc2OTEuMDAwMDAwXCIsIFwib3JnXCI6IFwiX09SR0FOSVpBVElPTl9cIiwgXCJjcmVhdGVkX2F0XCI6IFwiMTYyNDQ0NjM4NzY5MS4wMDAwMDBcIiwgXCJhY3Rpb25cIjogXCJ0ZWFtLnJlbW92ZV9tZW1iZXJcIiwgXCJhY3Rvcl9sb2NhdGlvblwiOiB7IFwiY291bnRyeV9jb2RlXCI6IFwiX0NPVU5UUllfQ09ERV9cIiB9LCBcInRlYW1cIjogXCJfT1JHQU5JWkFUSU9OXy9iYWNrZW5kXCIsIFwidXNlclwiOiBcIl9VU0VSX1wiLCBcIl9kb2N1bWVudF9pZFwiOiBcIlBZbjNUT2doZzVGWXplNjczc3ZoZ3dcIiB9IH0gfSxcbiAgeyBcInJ1bGVcIjogeyBcImxldmVsXCI6IDUsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRIdWIgVGVhbSBhZGQgbWVtYmVyLlwiLCBcImlkXCI6IFwiOTEzOTNcIiwgXCJmaXJlZHRpbWVzXCI6IDMsIFwibWFpbFwiOiBmYWxzZSwgXCJncm91cHNcIjogW1wiZ2l0aHViXCIsIFwiZ2l0XCIsIFwiZ2l0X3RlYW1cIl0gfSwgXCJkYXRhXCI6IHsgXCJpbnRlZ3JhdGlvblwiOiBcImdpdGh1YlwiLCBcImdpdGh1YlwiOiB7IFwiYWN0b3JcIjogXCJfVVNFUl9cIiwgXCJAdGltZXN0YW1wXCI6IFwiMTYyNDQ0NjM5NzQ2NC4wMDAwMDBcIiwgXCJvcmdcIjogXCJfT1JHQU5JWkFUSU9OX1wiLCBcImNyZWF0ZWRfYXRcIjogXCIxNjI0NDQ2Mzk3NDY0LjAwMDAwMFwiLCBcImFjdGlvblwiOiBcInRlYW0uYWRkX21lbWJlclwiLCBcImFjdG9yX2xvY2F0aW9uXCI6IHsgXCJjb3VudHJ5X2NvZGVcIjogXCJfQ09VTlRSWV9DT0RFX1wiIH0sIFwidGVhbVwiOiBcIl9PUkdBTklaQVRJT05fL2JhY2tlbmRcIiwgXCJ1c2VyXCI6IFwiX1VTRVJfXCIsIFwiX2RvY3VtZW50X2lkXCI6IFwiejRxSVBfa2p6am5pbEloTDhhazBtZ1wiIH0gfSB9LFxuICB7IFwicnVsZVwiOiB7IFwibGV2ZWxcIjogMywgXCJkZXNjcmlwdGlvblwiOiBcIkdpdEh1YiBEZXBlbmRlbmN5IGdyYXBoIG5ldyByZXBvcyBlbmFibGUuXCIsIFwiaWRcIjogXCI5MTEzMVwiLCBcImZpcmVkdGltZXNcIjogMSwgXCJtYWlsXCI6IGZhbHNlLCBcImdyb3Vwc1wiOiBbXCJnaXRodWJcIiwgXCJnaXRcIiwgXCJnaXRfZGVwZW5kZW5jeV9ncmFwaF9uZXdfcmVwb3NcIl0gfSwgXCJkYXRhXCI6IHsgXCJpbnRlZ3JhdGlvblwiOiBcImdpdGh1YlwiLCBcImdpdGh1YlwiOiB7IFwiYWN0b3JcIjogXCJfVVNFUl9cIiwgXCJAdGltZXN0YW1wXCI6IFwiMTYyNDQ0NjkxNTE1NC4wMDAwMDBcIiwgXCJvcmdcIjogXCJfT1JHQU5JWkFUSU9OX1wiLCBcImNyZWF0ZWRfYXRcIjogXCIxNjI0NDQ2OTE1MTU0LjAwMDAwMFwiLCBcImFjdGlvblwiOiBcImRlcGVuZGVuY3lfZ3JhcGhfbmV3X3JlcG9zLmVuYWJsZVwiLCBcImFjdG9yX2xvY2F0aW9uXCI6IHsgXCJjb3VudHJ5X2NvZGVcIjogXCJfQ09VTlRSWV9DT0RFX1wiIH0sIFwidXNlclwiOiBcIl9VU0VSX1wiLCBcIl9kb2N1bWVudF9pZFwiOiBcIjJBejlYQ3FiLUZlOGswS2tMUWxrMEFcIiB9IH0gfSxcbiAgeyBcInJ1bGVcIjogeyBcImxldmVsXCI6IDEyLCBcImRlc2NyaXB0aW9uXCI6IFwiR2l0SHViIERlcGVuZGVuY3kgZ3JhcGggbmV3IHJlcG9zIGRpc2FibGUuXCIsIFwiaWRcIjogXCI5MTEzMFwiLCBcImZpcmVkdGltZXNcIjogMSwgXCJtYWlsXCI6IHRydWUsIFwiZ3JvdXBzXCI6IFtcImdpdGh1YlwiLCBcImdpdFwiLCBcImdpdF9kZXBlbmRlbmN5X2dyYXBoX25ld19yZXBvc1wiXSB9LCBcImRhdGFcIjogeyBcImludGVncmF0aW9uXCI6IFwiZ2l0aHViXCIsIFwiZ2l0aHViXCI6IHsgXCJhY3RvclwiOiBcIl9VU0VSX1wiLCBcIkB0aW1lc3RhbXBcIjogXCIxNjI0NDQ2OTE2NzE4LjAwMDAwMFwiLCBcIm9yZ1wiOiBcIl9PUkdBTklaQVRJT05fXCIsIFwiY3JlYXRlZF9hdFwiOiBcIjE2MjQ0NDY5MTY3MTguMDAwMDAwXCIsIFwiYWN0aW9uXCI6IFwiZGVwZW5kZW5jeV9ncmFwaF9uZXdfcmVwb3MuZGlzYWJsZVwiLCBcImFjdG9yX2xvY2F0aW9uXCI6IHsgXCJjb3VudHJ5X2NvZGVcIjogXCJfQ09VTlRSWV9DT0RFX1wiIH0sIFwidXNlclwiOiBcIl9VU0VSX1wiLCBcIl9kb2N1bWVudF9pZFwiOiBcIlR6QkdBTnkzU21ybnhJOEdXOWJwUUFcIiB9IH0gfSxcbiAgeyBcInJ1bGVcIjogeyBcImxldmVsXCI6IDUsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRIdWIgSG9vayBjcmVhdGUuXCIsIFwiaWRcIjogXCI5MTE2MlwiLCBcImZpcmVkdGltZXNcIjogMSwgXCJtYWlsXCI6IGZhbHNlLCBcImdyb3Vwc1wiOiBbXCJnaXRodWJcIiwgXCJnaXRcIiwgXCJnaXRfaG9va1wiXSB9LCBcImRhdGFcIjogeyBcImludGVncmF0aW9uXCI6IFwiZ2l0aHViXCIsIFwiZ2l0aHViXCI6IHsgXCJhY3RvclwiOiBcIl9VU0VSX1wiLCBcIkB0aW1lc3RhbXBcIjogXCIxNjI0NDQ2OTgyNjg4LjAwMDAwMFwiLCBcIm9yZ1wiOiBcIl9PUkdBTklaQVRJT05fXCIsIFwiaG9va19pZFwiOiBcIjMwMzk5OTcyN1wiLCBcIm5hbWVcIjogXCJ3ZWJob29rXCIsIFwiY3JlYXRlZF9hdFwiOiBcIjE2MjQ0NDY5ODI2ODguMDAwMDAwXCIsIFwiYWN0aW9uXCI6IFwiaG9vay5jcmVhdGVcIiwgXCJhY3RpdmVcIjogXCJ0cnVlXCIsIFwiYWN0b3JfbG9jYXRpb25cIjogeyBcImNvdW50cnlfY29kZVwiOiBcIl9DT1VOVFJZX0NPREVfXCIgfSwgXCJjb25maWdcIjogeyBcImNvbnRlbnRfdHlwZVwiOiBcImpzb25cIiwgXCJpbnNlY3VyZV9zc2xcIjogXCIwXCIsIFwic2VjcmV0XCI6IFwiKioqKioqKipcIiwgXCJ1cmxcIjogXCJfU0VSVkVSX0FERFJFU1NfV0VCSE9PS19cIiB9LCBcImV2ZW50c1wiOiBbXCJwdXNoXCJdLCBcIl9kb2N1bWVudF9pZFwiOiBcIlNTbE9iaVhOTnR6UXp4Rm9vSzQtZndcIiB9IH0gfSxcbiAgeyBcInJ1bGVcIjogeyBcImxldmVsXCI6IDUsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRIdWIgSG9vayBldmVudHMgY2hhbmdlZC5cIiwgXCJpZFwiOiBcIjkxMTY1XCIsIFwiZmlyZWR0aW1lc1wiOiAxLCBcIm1haWxcIjogZmFsc2UsIFwiZ3JvdXBzXCI6IFtcImdpdGh1YlwiLCBcImdpdFwiLCBcImdpdF9ob29rXCJdIH0sIFwiZGF0YVwiOiB7IFwiaW50ZWdyYXRpb25cIjogXCJnaXRodWJcIiwgXCJnaXRodWJcIjogeyBcIm9yZ1wiOiBcIl9PUkdBTklaQVRJT05fXCIsIFwiY3JlYXRlZF9hdFwiOiBcIjE2MjQ0NDcwNDI1MDUuMDAwMDAwXCIsIFwiYWN0aXZlXCI6IFwidHJ1ZVwiLCBcImFjdG9yXCI6IFwiX1VTRVJfXCIsIFwiQHRpbWVzdGFtcFwiOiBcIjE2MjQ0NDcwNDI1MDUuMDAwMDAwXCIsIFwiaG9va19pZFwiOiBcIjMwMzk5OTcyN1wiLCBcIm5hbWVcIjogXCJ3ZWJob29rXCIsIFwiYWN0aW9uXCI6IFwiaG9vay5ldmVudHNfY2hhbmdlZFwiLCBcImFjdG9yX2xvY2F0aW9uXCI6IHsgXCJjb3VudHJ5X2NvZGVcIjogXCJfQ09VTlRSWV9DT0RFX1wiIH0sIFwiY29uZmlnXCI6IHsgXCJjb250ZW50X3R5cGVcIjogXCJqc29uXCIsIFwiaW5zZWN1cmVfc3NsXCI6IFwiMFwiLCBcInNlY3JldFwiOiBcIioqKioqKioqXCIsIFwidXJsXCI6IFwiX1NFUlZFUl9BRERSRVNTX1dFQkhPT0tfXCIgfSwgXCJldmVudHNcIjogW1wicHVzaFwiLCBcImNyZWF0ZVwiLCBcImRlcGxveW1lbnRcIiwgXCJmb3JrXCIsIFwiaXNzdWVzXCJdLCBcIl9kb2N1bWVudF9pZFwiOiBcIkJhOU5KYkZuU2ZKQjF6R0VuMjlhc3dcIiwgXCJldmVudHNfd2VyZVwiOiBbXCJwdXNoXCJdIH0gfSB9LFxuICB7IFwicnVsZVwiOiB7IFwibGV2ZWxcIjogMywgXCJkZXNjcmlwdGlvblwiOiBcIkdpdEh1YiBHaXQgY2xvbmUuXCIsIFwiaWRcIjogXCI5MTE1OFwiLCBcImZpcmVkdGltZXNcIjogMSwgXCJtYWlsXCI6IGZhbHNlLCBcImdyb3Vwc1wiOiBbXCJnaXRodWJcIiwgXCJnaXRcIiwgXCJnaXRfZ2l0XCJdIH0sIFwiZGF0YVwiOiB7IFwiaW50ZWdyYXRpb25cIjogXCJnaXRodWJcIiwgXCJnaXRodWJcIjogeyBcImFjdG9yXCI6IFwiX1VTRVJfXCIsIFwiQHRpbWVzdGFtcFwiOiBcIjE2MjQ0NDcxMzk2MDcuMDAwMDAwXCIsIFwib3JnXCI6IFwiX09SR0FOSVpBVElPTl9cIiwgXCJyZXBvXCI6IFwiX09SR0FOSVpBVElPTl8vX1JFUE9TSVRPUllfXCIsIFwiYWN0b3JfbG9jYXRpb25cIjogeyBcImNvdW50cnlfY29kZVwiOiBcIl9DT1VOVFJZX0NPREVfXCIgfSwgXCJhY3Rpb25cIjogXCJnaXQuY2xvbmVcIiwgXCJ0cmFuc3BvcnRfcHJvdG9jb2xfbmFtZVwiOiBcImh0dHBcIiwgXCJ0cmFuc3BvcnRfcHJvdG9jb2xcIjogXCIxXCIsIFwicmVwb3NpdG9yeVwiOiBcIl9PUkdBTklaQVRJT05fL19SRVBPU0lUT1JZX1wiLCBcInJlcG9zaXRvcnlfcHVibGljXCI6IFwiZmFsc2VcIiB9IH0gfSxcbiAgeyBcInJ1bGVcIjogeyBcImxldmVsXCI6IDMsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRIdWIgR2l0IHB1c2guXCIsIFwiaWRcIjogXCI5MTE2MFwiLCBcImZpcmVkdGltZXNcIjogMSwgXCJtYWlsXCI6IGZhbHNlLCBcImdyb3Vwc1wiOiBbXCJnaXRodWJcIiwgXCJnaXRcIiwgXCJnaXRfZ2l0XCJdIH0sIFwiZGF0YVwiOiB7IFwiaW50ZWdyYXRpb25cIjogXCJnaXRodWJcIiwgXCJnaXRodWJcIjogeyBcImFjdG9yXCI6IFwiX1VTRVJfXCIsIFwiQHRpbWVzdGFtcFwiOiBcIjE2MjQ0NDc1MjA0NjIuMDAwMDAwXCIsIFwib3JnXCI6IFwiX09SR0FOSVpBVElPTl9cIiwgXCJyZXBvXCI6IFwiX09SR0FOSVpBVElPTl8vX1JFUE9TSVRPUllfXCIsIFwiYWN0b3JfbG9jYXRpb25cIjogeyBcImNvdW50cnlfY29kZVwiOiBcIl9DT1VOVFJZX0NPREVfXCIgfSwgXCJhY3Rpb25cIjogXCJnaXQucHVzaFwiLCBcInRyYW5zcG9ydF9wcm90b2NvbF9uYW1lXCI6IFwiaHR0cFwiLCBcInRyYW5zcG9ydF9wcm90b2NvbFwiOiBcIjFcIiwgXCJyZXBvc2l0b3J5XCI6IFwiX09SR0FOSVpBVElPTl8vX1JFUE9TSVRPUllfXCIsIFwicmVwb3NpdG9yeV9wdWJsaWNcIjogXCJmYWxzZVwiIH0gfSB9LFxuICB7IFwicnVsZVwiOiB7IFwibGV2ZWxcIjogMywgXCJkZXNjcmlwdGlvblwiOiBcIkdpdEh1YiBHaXQgcHVzaC5cIiwgXCJpZFwiOiBcIjkxMTYwXCIsIFwiZmlyZWR0aW1lc1wiOiAyLCBcIm1haWxcIjogZmFsc2UsIFwiZ3JvdXBzXCI6IFtcImdpdGh1YlwiLCBcImdpdFwiLCBcImdpdF9naXRcIl0gfSwgXCJkYXRhXCI6IHsgXCJpbnRlZ3JhdGlvblwiOiBcImdpdGh1YlwiLCBcImdpdGh1YlwiOiB7IFwiYWN0b3JcIjogXCJfVVNFUl9cIiwgXCJAdGltZXN0YW1wXCI6IFwiMTYyNDQ0NzUyMjY4Mi4wMDAwMDBcIiwgXCJvcmdcIjogXCJfT1JHQU5JWkFUSU9OX1wiLCBcInJlcG9cIjogXCJfT1JHQU5JWkFUSU9OXy9fUkVQT1NJVE9SWV9cIiwgXCJhY3Rvcl9sb2NhdGlvblwiOiB7IFwiY291bnRyeV9jb2RlXCI6IFwiX0NPVU5UUllfQ09ERV9cIiB9LCBcImFjdGlvblwiOiBcImdpdC5wdXNoXCIsIFwidHJhbnNwb3J0X3Byb3RvY29sX25hbWVcIjogXCJodHRwXCIsIFwidHJhbnNwb3J0X3Byb3RvY29sXCI6IFwiMVwiLCBcInJlcG9zaXRvcnlcIjogXCJfT1JHQU5JWkFUSU9OXy9fUkVQT1NJVE9SWV9cIiwgXCJyZXBvc2l0b3J5X3B1YmxpY1wiOiBcImZhbHNlXCIgfSB9IH0sXG4gIHsgXCJydWxlXCI6IHsgXCJsZXZlbFwiOiAzLCBcImRlc2NyaXB0aW9uXCI6IFwiR2l0SHViIEdpdCBjbG9uZS5cIiwgXCJpZFwiOiBcIjkxMTU4XCIsIFwiZmlyZWR0aW1lc1wiOiAyLCBcIm1haWxcIjogZmFsc2UsIFwiZ3JvdXBzXCI6IFtcImdpdGh1YlwiLCBcImdpdFwiLCBcImdpdF9naXRcIl0gfSwgXCJkYXRhXCI6IHsgXCJpbnRlZ3JhdGlvblwiOiBcImdpdGh1YlwiLCBcImdpdGh1YlwiOiB7IFwiQHRpbWVzdGFtcFwiOiBcIjE2MjQ0NDc1MjcwMDcuMDAwMDAwXCIsIFwib3JnXCI6IFwiX09SR0FOSVpBVElPTl9cIiwgXCJyZXBvXCI6IFwiX09SR0FOSVpBVElPTl8vX1JFUE9TSVRPUllfXCIsIFwiYWN0aW9uXCI6IFwiZ2l0LmNsb25lXCIsIFwidHJhbnNwb3J0X3Byb3RvY29sX25hbWVcIjogXCJodHRwXCIsIFwidHJhbnNwb3J0X3Byb3RvY29sXCI6IFwiMVwiLCBcInJlcG9zaXRvcnlcIjogXCJfT1JHQU5JWkFUSU9OXy9fUkVQT1NJVE9SWV9cIiwgXCJyZXBvc2l0b3J5X3B1YmxpY1wiOiBcImZhbHNlXCIgfSB9IH0sXG4gIHsgXCJydWxlXCI6IHsgXCJsZXZlbFwiOiA1LCBcImRlc2NyaXB0aW9uXCI6IFwiR2l0SHViIFJlcG8gY3JlYXRlLlwiLCBcImlkXCI6IFwiOTEzMThcIiwgXCJmaXJlZHRpbWVzXCI6IDEsIFwibWFpbFwiOiBmYWxzZSwgXCJncm91cHNcIjogW1wiZ2l0aHViXCIsIFwiZ2l0XCIsIFwiZ2l0X3JlcG9cIl0gfSwgXCJkYXRhXCI6IHsgXCJpbnRlZ3JhdGlvblwiOiBcImdpdGh1YlwiLCBcImdpdGh1YlwiOiB7IFwiYWN0b3JcIjogXCJfVVNFUl9cIiwgXCJAdGltZXN0YW1wXCI6IFwiMTYyNDQ0NzU2ODMwMy4wMDAwMDBcIiwgXCJ2aXNpYmlsaXR5XCI6IFwicHJpdmF0ZVwiLCBcIm9yZ1wiOiBcIl9PUkdBTklaQVRJT05fXCIsIFwicmVwb1wiOiBcIl9PUkdBTklaQVRJT05fL19SRVBPU0lUT1JZX1wiLCBcImNyZWF0ZWRfYXRcIjogXCIxNjI0NDQ3NTY4MzAzLjAwMDAwMFwiLCBcImFjdGlvblwiOiBcInJlcG8uY3JlYXRlXCIsIFwiYWN0b3JfbG9jYXRpb25cIjogeyBcImNvdW50cnlfY29kZVwiOiBcIl9DT1VOVFJZX0NPREVfXCIgfSwgXCJfZG9jdW1lbnRfaWRcIjogXCJBY3JkU21NVzBQcEVFbXVHV2lUY29RXCIgfSB9IH0sXG4gIHsgXCJydWxlXCI6IHsgXCJsZXZlbFwiOiA5LCBcImRlc2NyaXB0aW9uXCI6IFwiR2l0SHViIFJlcG8gZGVzdHJveS5cIiwgXCJpZFwiOiBcIjkxMzIwXCIsIFwiZmlyZWR0aW1lc1wiOiAxLCBcIm1haWxcIjogZmFsc2UsIFwiZ3JvdXBzXCI6IFtcImdpdGh1YlwiLCBcImdpdFwiLCBcImdpdF9yZXBvXCJdIH0sIFwiZGF0YVwiOiB7IFwiaW50ZWdyYXRpb25cIjogXCJnaXRodWJcIiwgXCJnaXRodWJcIjogeyBcImFjdG9yXCI6IFwiX1VTRVJfXCIsIFwiQHRpbWVzdGFtcFwiOiBcIjE2MjQ0NDc1ODg2MTUuMDAwMDAwXCIsIFwidmlzaWJpbGl0eVwiOiBcInByaXZhdGVcIiwgXCJvcmdcIjogXCJfT1JHQU5JWkFUSU9OX1wiLCBcInJlcG9cIjogXCJfT1JHQU5JWkFUSU9OXy9fUkVQT1NJVE9SWV9cIiwgXCJjcmVhdGVkX2F0XCI6IFwiMTYyNDQ0NzU4ODYxNS4wMDAwMDBcIiwgXCJhY3Rpb25cIjogXCJyZXBvLmRlc3Ryb3lcIiwgXCJhY3Rvcl9sb2NhdGlvblwiOiB7IFwiY291bnRyeV9jb2RlXCI6IFwiX0NPVU5UUllfQ09ERV9cIiB9LCBcIl9kb2N1bWVudF9pZFwiOiBcIkgtYlJDdVdoX0ZBb1p4elc4QlY5SkFcIiB9IH0gfSxcbiAgeyBcInJ1bGVcIjogeyBcImxldmVsXCI6IDMsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRIdWIgR2l0IGZldGNoLlwiLCBcImlkXCI6IFwiOTExNTlcIiwgXCJmaXJlZHRpbWVzXCI6IDEsIFwibWFpbFwiOiBmYWxzZSwgXCJncm91cHNcIjogW1wiZ2l0aHViXCIsIFwiZ2l0XCIsIFwiZ2l0X2dpdFwiXSB9LCBcImRhdGFcIjogeyBcImludGVncmF0aW9uXCI6IFwiZ2l0aHViXCIsIFwiZ2l0aHViXCI6IHsgXCJhY3RvclwiOiBcIl9VU0VSX1wiLCBcIkB0aW1lc3RhbXBcIjogXCIxNjI0NDQ3NzQ0ODc3LjAwMDAwMFwiLCBcIm9yZ1wiOiBcIl9PUkdBTklaQVRJT05fXCIsIFwicmVwb1wiOiBcIl9PUkdBTklaQVRJT05fL19SRVBPU0lUT1JZX1wiLCBcImFjdG9yX2xvY2F0aW9uXCI6IHsgXCJjb3VudHJ5X2NvZGVcIjogXCJfQ09VTlRSWV9DT0RFX1wiIH0sIFwiYWN0aW9uXCI6IFwiZ2l0LmZldGNoXCIsIFwidHJhbnNwb3J0X3Byb3RvY29sX25hbWVcIjogXCJodHRwXCIsIFwidHJhbnNwb3J0X3Byb3RvY29sXCI6IFwiMVwiLCBcInJlcG9zaXRvcnlcIjogXCJfT1JHQU5JWkFUSU9OXy9fUkVQT1NJVE9SWV9cIiwgXCJyZXBvc2l0b3J5X3B1YmxpY1wiOiBcImZhbHNlXCIgfSB9IH0sXG4gIHsgXCJydWxlXCI6IHsgXCJsZXZlbFwiOiA3LCBcImRlc2NyaXB0aW9uXCI6IFwiR2l0SHViIE9yZ2FuaXphdGlvbiB1cGRhdGUgZGVmYXVsdCByZXBvc2l0b3J5IHBlcm1pc3Npb24uXCIsIFwiaWRcIjogXCI5MTIzMVwiLCBcImZpcmVkdGltZXNcIjogMSwgXCJtYWlsXCI6IGZhbHNlLCBcImdyb3Vwc1wiOiBbXCJnaXRodWJcIiwgXCJnaXRcIiwgXCJnaXRfb3JnXCJdIH0sIFwiZGF0YVwiOiB7IFwiaW50ZWdyYXRpb25cIjogXCJnaXRodWJcIiwgXCJnaXRodWJcIjogeyBcImFjdG9yXCI6IFwiX1VTRVJfXCIsIFwiQHRpbWVzdGFtcFwiOiBcIjE2MjQ0NDgwMTUwMjcuMDAwMDAwXCIsIFwib3JnXCI6IFwiX09SR0FOSVpBVElPTl9cIiwgXCJjcmVhdGVkX2F0XCI6IFwiMTYyNDQ0ODAxNTAyNy4wMDAwMDBcIiwgXCJhY3Rpb25cIjogXCJvcmcudXBkYXRlX2RlZmF1bHRfcmVwb3NpdG9yeV9wZXJtaXNzaW9uXCIsIFwiYWN0b3JfbG9jYXRpb25cIjogeyBcImNvdW50cnlfY29kZVwiOiBcIl9DT1VOVFJZX0NPREVfXCIgfSwgXCJfZG9jdW1lbnRfaWRcIjogXCJCSHB2Rzd4YzJiVE5XM01FM25BZ0R3XCIgfSB9IH0sXG4gIHsgXCJydWxlXCI6IHsgXCJsZXZlbFwiOiA3LCBcImRlc2NyaXB0aW9uXCI6IFwiR2l0SHViIE9yZ2FuaXphdGlvbiB1cGRhdGUgZGVmYXVsdCByZXBvc2l0b3J5IHBlcm1pc3Npb24uXCIsIFwiaWRcIjogXCI5MTIzMVwiLCBcImZpcmVkdGltZXNcIjogMiwgXCJtYWlsXCI6IGZhbHNlLCBcImdyb3Vwc1wiOiBbXCJnaXRodWJcIiwgXCJnaXRcIiwgXCJnaXRfb3JnXCJdIH0sIFwiZGF0YVwiOiB7IFwiaW50ZWdyYXRpb25cIjogXCJnaXRodWJcIiwgXCJnaXRodWJcIjogeyBcImFjdG9yXCI6IFwiX1VTRVJfXCIsIFwiQHRpbWVzdGFtcFwiOiBcIjE2MjQ0NDgwMjA2NzAuMDAwMDAwXCIsIFwib3JnXCI6IFwiX09SR0FOSVpBVElPTl9cIiwgXCJjcmVhdGVkX2F0XCI6IFwiMTYyNDQ0ODAyMDY3MC4wMDAwMDBcIiwgXCJhY3Rpb25cIjogXCJvcmcudXBkYXRlX2RlZmF1bHRfcmVwb3NpdG9yeV9wZXJtaXNzaW9uXCIsIFwiYWN0b3JfbG9jYXRpb25cIjogeyBcImNvdW50cnlfY29kZVwiOiBcIl9DT1VOVFJZX0NPREVfXCIgfSwgXCJfZG9jdW1lbnRfaWRcIjogXCJ0NVp1bU1KZVdCczJDcVpULW40Sk5BXCIgfSB9IH0sXG4gIHsgXCJydWxlXCI6IHsgXCJsZXZlbFwiOiA3LCBcImRlc2NyaXB0aW9uXCI6IFwiR2l0SHViIE9yZ2FuaXphdGlvbiB1cGRhdGUgbWVtYmVyIHJlcG9zaXRvcnkgY3JlYXRpb24gcGVybWlzc2lvbi5cIiwgXCJpZFwiOiBcIjkxMjMzXCIsIFwiZmlyZWR0aW1lc1wiOiAxLCBcIm1haWxcIjogZmFsc2UsIFwiZ3JvdXBzXCI6IFtcImdpdGh1YlwiLCBcImdpdFwiLCBcImdpdF9vcmdcIl0gfSwgXCJkYXRhXCI6IHsgXCJpbnRlZ3JhdGlvblwiOiBcImdpdGh1YlwiLCBcImdpdGh1YlwiOiB7IFwiYWN0b3JcIjogXCJfVVNFUl9cIiwgXCJAdGltZXN0YW1wXCI6IFwiMTYyNDQ0ODAzNDczNS4wMDAwMDBcIiwgXCJ2aXNpYmlsaXR5XCI6IFwicHJpdmF0ZV9pbnRlcm5hbFwiLCBcIm9yZ1wiOiBcIl9PUkdBTklaQVRJT05fXCIsIFwiY3JlYXRlZF9hdFwiOiBcIjE2MjQ0NDgwMzQ3MzUuMDAwMDAwXCIsIFwiYWN0aW9uXCI6IFwib3JnLnVwZGF0ZV9tZW1iZXJfcmVwb3NpdG9yeV9jcmVhdGlvbl9wZXJtaXNzaW9uXCIsIFwiYWN0b3JfbG9jYXRpb25cIjogeyBcImNvdW50cnlfY29kZVwiOiBcIl9DT1VOVFJZX0NPREVfXCIgfSwgXCJfZG9jdW1lbnRfaWRcIjogXCJDQXdiaDhLcEU3NWFhMGFqQ3BSSVN3XCIgfSB9IH0sXG4gIHsgXCJydWxlXCI6IHsgXCJsZXZlbFwiOiA3LCBcImRlc2NyaXB0aW9uXCI6IFwiR2l0SHViIE9yZ2FuaXphdGlvbiB1cGRhdGUgbWVtYmVyIHJlcG9zaXRvcnkgY3JlYXRpb24gcGVybWlzc2lvbi5cIiwgXCJpZFwiOiBcIjkxMjMzXCIsIFwiZmlyZWR0aW1lc1wiOiAyLCBcIm1haWxcIjogZmFsc2UsIFwiZ3JvdXBzXCI6IFtcImdpdGh1YlwiLCBcImdpdFwiLCBcImdpdF9vcmdcIl0gfSwgXCJkYXRhXCI6IHsgXCJpbnRlZ3JhdGlvblwiOiBcImdpdGh1YlwiLCBcImdpdGh1YlwiOiB7IFwiYWN0b3JcIjogXCJfVVNFUl9cIiwgXCJAdGltZXN0YW1wXCI6IFwiMTYyNDQ0ODAzODI0Ny4wMDAwMDBcIiwgXCJ2aXNpYmlsaXR5XCI6IFwiaW50ZXJuYWxcIiwgXCJvcmdcIjogXCJfT1JHQU5JWkFUSU9OX1wiLCBcImNyZWF0ZWRfYXRcIjogXCIxNjI0NDQ4MDM4MjQ3LjAwMDAwMFwiLCBcImFjdGlvblwiOiBcIm9yZy51cGRhdGVfbWVtYmVyX3JlcG9zaXRvcnlfY3JlYXRpb25fcGVybWlzc2lvblwiLCBcImFjdG9yX2xvY2F0aW9uXCI6IHsgXCJjb3VudHJ5X2NvZGVcIjogXCJfQ09VTlRSWV9DT0RFX1wiIH0sIFwiX2RvY3VtZW50X2lkXCI6IFwiczk2aWJWRDVzRXlSRHhZZ1E4Z0toUVwiIH0gfSB9LFxuICB7IFwicnVsZVwiOiB7IFwibGV2ZWxcIjogOSwgXCJkZXNjcmlwdGlvblwiOiBcIkdpdEh1YiBQcml2YXRlIHJlcG9zaXRvcnkgZm9ya2luZyBlbmFibGUuXCIsIFwiaWRcIjogXCI5MTI3M1wiLCBcImZpcmVkdGltZXNcIjogMSwgXCJtYWlsXCI6IGZhbHNlLCBcImdyb3Vwc1wiOiBbXCJnaXRodWJcIiwgXCJnaXRcIiwgXCJnaXRfcHJpdmF0ZV9yZXBvc2l0b3J5X2ZvcmtpbmdcIl0gfSwgXCJkYXRhXCI6IHsgXCJpbnRlZ3JhdGlvblwiOiBcImdpdGh1YlwiLCBcImdpdGh1YlwiOiB7IFwiYWN0b3JcIjogXCJfVVNFUl9cIiwgXCJAdGltZXN0YW1wXCI6IFwiMTYyNDQ0ODA0NjU0Ni4wMDAwMDBcIiwgXCJvcmdcIjogXCJfT1JHQU5JWkFUSU9OX1wiLCBcImNyZWF0ZWRfYXRcIjogXCIxNjI0NDQ4MDQ2NTQ2LjAwMDAwMFwiLCBcImFjdGlvblwiOiBcInByaXZhdGVfcmVwb3NpdG9yeV9mb3JraW5nLmVuYWJsZVwiLCBcImFjdG9yX2xvY2F0aW9uXCI6IHsgXCJjb3VudHJ5X2NvZGVcIjogXCJfQ09VTlRSWV9DT0RFX1wiIH0sIFwidXNlclwiOiBcIl9VU0VSX1wiLCBcIl9kb2N1bWVudF9pZFwiOiBcIk5aV0JyTzJBYzAyTG5HM1RGZUV5a0FcIiB9IH0gfSxcbiAgeyBcInJ1bGVcIjogeyBcImxldmVsXCI6IDUsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRIdWIgUHJpdmF0ZSByZXBvc2l0b3J5IGZvcmtpbmcgZGlzYWJsZS5cIiwgXCJpZFwiOiBcIjkxMjc0XCIsIFwiZmlyZWR0aW1lc1wiOiAxLCBcIm1haWxcIjogZmFsc2UsIFwiZ3JvdXBzXCI6IFtcImdpdGh1YlwiLCBcImdpdFwiLCBcImdpdF9wcml2YXRlX3JlcG9zaXRvcnlfZm9ya2luZ1wiXSB9LCBcImRhdGFcIjogeyBcImludGVncmF0aW9uXCI6IFwiZ2l0aHViXCIsIFwiZ2l0aHViXCI6IHsgXCJhY3RvclwiOiBcIl9VU0VSX1wiLCBcIkB0aW1lc3RhbXBcIjogXCIxNjI0NDQ4MDUxMTkzLjAwMDAwMFwiLCBcIm9yZ1wiOiBcIl9PUkdBTklaQVRJT05fXCIsIFwiY3JlYXRlZF9hdFwiOiBcIjE2MjQ0NDgwNTExOTMuMDAwMDAwXCIsIFwiYWN0aW9uXCI6IFwicHJpdmF0ZV9yZXBvc2l0b3J5X2ZvcmtpbmcuZGlzYWJsZVwiLCBcImFjdG9yX2xvY2F0aW9uXCI6IHsgXCJjb3VudHJ5X2NvZGVcIjogXCJfQ09VTlRSWV9DT0RFX1wiIH0sIFwidXNlclwiOiBcIl9VU0VSX1wiLCBcIl9kb2N1bWVudF9pZFwiOiBcIjVFa2dXUGE4RHU2WkpfNW9PZlVfcmdcIiB9IH0gfSxcbiAgeyBcInJ1bGVcIjogeyBcImxldmVsXCI6IDMsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRIdWIgR2VuZXJpYyBydWxlLlwiLCBcImlkXCI6IFwiOTE0NDlcIiwgXCJmaXJlZHRpbWVzXCI6IDEsIFwibWFpbFwiOiBmYWxzZSwgXCJncm91cHNcIjogW1wiZ2l0aHViXCIsIFwiZ2l0XCJdIH0sIFwiZGF0YVwiOiB7IFwiaW50ZWdyYXRpb25cIjogXCJnaXRodWJcIiwgXCJnaXRodWJcIjogeyBcImFjdG9yXCI6IFwiX1VTRVJfXCIsIFwiQHRpbWVzdGFtcFwiOiBcIjE2MjQ0NDgwNjk0MjcuMDAwMDAwXCIsIFwib3JnXCI6IFwiX09SR0FOSVpBVElPTl9cIiwgXCJjcmVhdGVkX2F0XCI6IFwiMTYyNDQ0ODA2OTQyNy4wMDAwMDBcIiwgXCJhY3Rpb25cIjogXCJtZW1iZXJzX2Nhbl9jcmVhdGVfcHJpdmF0ZV9wYWdlcy5kaXNhYmxlXCIsIFwiYWN0b3JfbG9jYXRpb25cIjogeyBcImNvdW50cnlfY29kZVwiOiBcIl9DT1VOVFJZX0NPREVfXCIgfSwgXCJ1c2VyXCI6IFwiX1VTRVJfXCIsIFwiX2RvY3VtZW50X2lkXCI6IFwiMHJ0eUZnMkdEMi1vSnlKc090UlpfQVwiIH0gfSB9LFxuICB7IFwicnVsZVwiOiB7IFwibGV2ZWxcIjogMywgXCJkZXNjcmlwdGlvblwiOiBcIkdpdEh1YiBHZW5lcmljIHJ1bGUuXCIsIFwiaWRcIjogXCI5MTQ0OVwiLCBcImZpcmVkdGltZXNcIjogMiwgXCJtYWlsXCI6IGZhbHNlLCBcImdyb3Vwc1wiOiBbXCJnaXRodWJcIiwgXCJnaXRcIl0gfSwgXCJkYXRhXCI6IHsgXCJpbnRlZ3JhdGlvblwiOiBcImdpdGh1YlwiLCBcImdpdGh1YlwiOiB7IFwiYWN0b3JcIjogXCJfVVNFUl9cIiwgXCJAdGltZXN0YW1wXCI6IFwiMTYyNDQ0ODA3MzI5MC4wMDAwMDBcIiwgXCJvcmdcIjogXCJfT1JHQU5JWkFUSU9OX1wiLCBcImNyZWF0ZWRfYXRcIjogXCIxNjI0NDQ4MDczMjkwLjAwMDAwMFwiLCBcImFjdGlvblwiOiBcIm1lbWJlcnNfY2FuX2NyZWF0ZV9wcml2YXRlX3BhZ2VzLmVuYWJsZVwiLCBcImFjdG9yX2xvY2F0aW9uXCI6IHsgXCJjb3VudHJ5X2NvZGVcIjogXCJfQ09VTlRSWV9DT0RFX1wiIH0sIFwidXNlclwiOiBcIl9VU0VSX1wiLCBcIl9kb2N1bWVudF9pZFwiOiBcInNTYkltRjQwTi1oTGUwbWZESGtmTWdcIiB9IH0gfSxcbiAgeyBcInJ1bGVcIjogeyBcImxldmVsXCI6IDMsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRIdWIgR2VuZXJpYyBydWxlLlwiLCBcImlkXCI6IFwiOTE0NDlcIiwgXCJmaXJlZHRpbWVzXCI6IDMsIFwibWFpbFwiOiBmYWxzZSwgXCJncm91cHNcIjogW1wiZ2l0aHViXCIsIFwiZ2l0XCJdIH0sIFwiZGF0YVwiOiB7IFwiaW50ZWdyYXRpb25cIjogXCJnaXRodWJcIiwgXCJnaXRodWJcIjogeyBcImFjdG9yXCI6IFwiX1VTRVJfXCIsIFwiQHRpbWVzdGFtcFwiOiBcIjE2MjQ0NDgwODk5OTEuMDAwMDAwXCIsIFwib3JnXCI6IFwiX09SR0FOSVpBVElPTl9cIiwgXCJjcmVhdGVkX2F0XCI6IFwiMTYyNDQ0ODA4OTk5MS4wMDAwMDBcIiwgXCJhY3Rpb25cIjogXCJyZXBvc2l0b3J5X3Zpc2liaWxpdHlfY2hhbmdlLmVuYWJsZVwiLCBcImFjdG9yX2xvY2F0aW9uXCI6IHsgXCJjb3VudHJ5X2NvZGVcIjogXCJfQ09VTlRSWV9DT0RFX1wiIH0sIFwidXNlclwiOiBcIl9VU0VSX1wiLCBcIl9kb2N1bWVudF9pZFwiOiBcImRXSi03WlI2RGR1bVFldTAxUEFHaWdcIiB9IH0gfSxcbiAgeyBcInJ1bGVcIjogeyBcImxldmVsXCI6IDMsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRIdWIgSXNzdWVzLlwiLCBcImlkXCI6IFwiOTExNjlcIiwgXCJmaXJlZHRpbWVzXCI6IDEsIFwibWFpbFwiOiBmYWxzZSwgXCJncm91cHNcIjogW1wiZ2l0aHViXCIsIFwiZ2l0XCIsIFwiZ2l0X2lzc3Vlc1wiXSB9LCBcImRhdGFcIjogeyBcImludGVncmF0aW9uXCI6IFwiZ2l0aHViXCIsIFwiZ2l0aHViXCI6IHsgXCJhY3RvclwiOiBcIl9VU0VSX1wiLCBcIkB0aW1lc3RhbXBcIjogXCIxNjI0NDQ4MTA5OTU4LjAwMDAwMFwiLCBcIm9yZ1wiOiBcIl9PUkdBTklaQVRJT05fXCIsIFwiY3JlYXRlZF9hdFwiOiBcIjE2MjQ0NDgxMDk5NTguMDAwMDAwXCIsIFwiYWN0aW9uXCI6IFwiaXNzdWVzLmRlbGV0ZXNfZW5hYmxlZFwiLCBcImFjdG9yX2xvY2F0aW9uXCI6IHsgXCJjb3VudHJ5X2NvZGVcIjogXCJfQ09VTlRSWV9DT0RFX1wiIH0sIFwidXNlclwiOiBcIl9VU0VSX1wiLCBcIl9kb2N1bWVudF9pZFwiOiBcImdXVDBVTk1WRmFJOFpQQjN0R0dzZXdcIiB9IH0gfSxcbiAgeyBcInJ1bGVcIjogeyBcImxldmVsXCI6IDMsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRIdWIgSXNzdWVzLlwiLCBcImlkXCI6IFwiOTExNjlcIiwgXCJmaXJlZHRpbWVzXCI6IDIsIFwibWFpbFwiOiBmYWxzZSwgXCJncm91cHNcIjogW1wiZ2l0aHViXCIsIFwiZ2l0XCIsIFwiZ2l0X2lzc3Vlc1wiXSB9LCBcImRhdGFcIjogeyBcImludGVncmF0aW9uXCI6IFwiZ2l0aHViXCIsIFwiZ2l0aHViXCI6IHsgXCJhY3RvclwiOiBcIl9VU0VSX1wiLCBcIkB0aW1lc3RhbXBcIjogXCIxNjI0NDQ4MTE0NDkzLjAwMDAwMFwiLCBcIm9yZ1wiOiBcIl9PUkdBTklaQVRJT05fXCIsIFwiY3JlYXRlZF9hdFwiOiBcIjE2MjQ0NDgxMTQ0OTMuMDAwMDAwXCIsIFwiYWN0aW9uXCI6IFwiaXNzdWVzLmRlbGV0ZXNfZGlzYWJsZWRcIiwgXCJhY3Rvcl9sb2NhdGlvblwiOiB7IFwiY291bnRyeV9jb2RlXCI6IFwiX0NPVU5UUllfQ09ERV9cIiB9LCBcInVzZXJcIjogXCJfVVNFUl9cIiwgXCJfZG9jdW1lbnRfaWRcIjogXCJUMmhncTNyM3lWRDIzTnA2Q0FELXpRXCIgfSB9IH0sXG4gIHsgXCJydWxlXCI6IHsgXCJsZXZlbFwiOiA1LCBcImRlc2NyaXB0aW9uXCI6IFwiR2l0SHViIE9yZ2FuaXphdGlvbiBkaXNwbGF5IGNvbW1lbnRlciBmdWxsIG5hbWUgZW5hYmxlZC5cIiwgXCJpZFwiOiBcIjkxMjAyXCIsIFwiZmlyZWR0aW1lc1wiOiAxLCBcIm1haWxcIjogZmFsc2UsIFwiZ3JvdXBzXCI6IFtcImdpdGh1YlwiLCBcImdpdFwiLCBcImdpdF9vcmdcIl0gfSwgXCJkYXRhXCI6IHsgXCJpbnRlZ3JhdGlvblwiOiBcImdpdGh1YlwiLCBcImdpdGh1YlwiOiB7IFwiYWN0b3JcIjogXCJfVVNFUl9cIiwgXCJAdGltZXN0YW1wXCI6IFwiMTYyNDQ0ODEyMTE3MS4wMDAwMDBcIiwgXCJvcmdcIjogXCJfT1JHQU5JWkFUSU9OX1wiLCBcImNyZWF0ZWRfYXRcIjogXCIxNjI0NDQ4MTIxMTcxLjAwMDAwMFwiLCBcImFjdGlvblwiOiBcIm9yZy5kaXNwbGF5X2NvbW1lbnRlcl9mdWxsX25hbWVfZW5hYmxlZFwiLCBcImFjdG9yX2xvY2F0aW9uXCI6IHsgXCJjb3VudHJ5X2NvZGVcIjogXCJfQ09VTlRSWV9DT0RFX1wiIH0sIFwidXNlclwiOiBcIl9VU0VSX1wiLCBcIl9kb2N1bWVudF9pZFwiOiBcIm8tRWRpOG93dnoxaVB2NzhSUFBTSndcIiB9IH0gfSxcbiAgeyBcInJ1bGVcIjogeyBcImxldmVsXCI6IDMsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRIdWIgT3JnYW5pemF0aW9uLlwiLCBcImlkXCI6IFwiOTExODhcIiwgXCJmaXJlZHRpbWVzXCI6IDEsIFwibWFpbFwiOiBmYWxzZSwgXCJncm91cHNcIjogW1wiZ2l0aHViXCIsIFwiZ2l0XCIsIFwiZ2l0X29yZ1wiXSB9LCBcImRhdGFcIjogeyBcImludGVncmF0aW9uXCI6IFwiZ2l0aHViXCIsIFwiZ2l0aHViXCI6IHsgXCJhY3RvclwiOiBcIl9VU0VSX1wiLCBcIkB0aW1lc3RhbXBcIjogXCIxNjI0NDQ4MTI1MTE2LjAwMDAwMFwiLCBcIm9yZ1wiOiBcIl9PUkdBTklaQVRJT05fXCIsIFwiY3JlYXRlZF9hdFwiOiBcIjE2MjQ0NDgxMjUxMTYuMDAwMDAwXCIsIFwiYWN0aW9uXCI6IFwib3JnLmRpc3BsYXlfY29tbWVudGVyX2Z1bGxfbmFtZV9kaXNhYmxlZFwiLCBcImFjdG9yX2xvY2F0aW9uXCI6IHsgXCJjb3VudHJ5X2NvZGVcIjogXCJfQ09VTlRSWV9DT0RFX1wiIH0sIFwidXNlclwiOiBcIl9VU0VSX1wiLCBcIl9kb2N1bWVudF9pZFwiOiBcIk94SmpxcHVnMkZNOFJKdXpFMUNacEFcIiB9IH0gfSxcbiAgeyBcInJ1bGVcIjogeyBcImxldmVsXCI6IDMsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRIdWIgT3JnYW5pemF0aW9uLlwiLCBcImlkXCI6IFwiOTExODhcIiwgXCJmaXJlZHRpbWVzXCI6IDIsIFwibWFpbFwiOiBmYWxzZSwgXCJncm91cHNcIjogW1wiZ2l0aHViXCIsIFwiZ2l0XCIsIFwiZ2l0X29yZ1wiXSB9LCBcImRhdGFcIjogeyBcImludGVncmF0aW9uXCI6IFwiZ2l0aHViXCIsIFwiZ2l0aHViXCI6IHsgXCJhY3RvclwiOiBcIl9VU0VSX1wiLCBcIkB0aW1lc3RhbXBcIjogXCIxNjI0NDQ4MTMzMjQ1LjAwMDAwMFwiLCBcIm9yZ1wiOiBcIl9PUkdBTklaQVRJT05fXCIsIFwiY3JlYXRlZF9hdFwiOiBcIjE2MjQ0NDgxMzMyNDUuMDAwMDAwXCIsIFwiYWN0aW9uXCI6IFwib3JnLmVuYWJsZV9yZWFkZXJfZGlzY3Vzc2lvbl9jcmVhdGlvbl9wZXJtaXNzaW9uXCIsIFwiYWN0b3JfbG9jYXRpb25cIjogeyBcImNvdW50cnlfY29kZVwiOiBcIl9DT1VOVFJZX0NPREVfXCIgfSwgXCJ1c2VyXCI6IFwiX1VTRVJfXCIsIFwiX2RvY3VtZW50X2lkXCI6IFwiNUttQV9Wa1FQbjNJNmdZNEw4cUZQQVwiIH0gfSB9LFxuICB7IFwicnVsZVwiOiB7IFwibGV2ZWxcIjogMywgXCJkZXNjcmlwdGlvblwiOiBcIkdpdEh1YiBPcmdhbml6YXRpb24uXCIsIFwiaWRcIjogXCI5MTE4OFwiLCBcImZpcmVkdGltZXNcIjogMywgXCJtYWlsXCI6IGZhbHNlLCBcImdyb3Vwc1wiOiBbXCJnaXRodWJcIiwgXCJnaXRcIiwgXCJnaXRfb3JnXCJdIH0sIFwiZGF0YVwiOiB7IFwiaW50ZWdyYXRpb25cIjogXCJnaXRodWJcIiwgXCJnaXRodWJcIjogeyBcImFjdG9yXCI6IFwiX1VTRVJfXCIsIFwiQHRpbWVzdGFtcFwiOiBcIjE2MjQ0NDgxMzgzOTIuMDAwMDAwXCIsIFwib3JnXCI6IFwiX09SR0FOSVpBVElPTl9cIiwgXCJjcmVhdGVkX2F0XCI6IFwiMTYyNDQ0ODEzODM5Mi4wMDAwMDBcIiwgXCJhY3Rpb25cIjogXCJvcmcuZGlzYWJsZV9yZWFkZXJfZGlzY3Vzc2lvbl9jcmVhdGlvbl9wZXJtaXNzaW9uXCIsIFwiYWN0b3JfbG9jYXRpb25cIjogeyBcImNvdW50cnlfY29kZVwiOiBcIl9DT1VOVFJZX0NPREVfXCIgfSwgXCJ1c2VyXCI6IFwiX1VTRVJfXCIsIFwiX2RvY3VtZW50X2lkXCI6IFwiSlEzSkFkM3pIbXBScEdaWUpzSklRd1wiIH0gfSB9LFxuICB7IFwicnVsZVwiOiB7IFwibGV2ZWxcIjogNSwgXCJkZXNjcmlwdGlvblwiOiBcIkdpdEh1YiBPcmdhbml6YXRpb24gZW5hYmxlIG1lbWJlciB0ZWFtIGNyZWF0aW9uIHBlcm1pc3Npb24uXCIsIFwiaWRcIjogXCI5MTIwM1wiLCBcImZpcmVkdGltZXNcIjogMSwgXCJtYWlsXCI6IGZhbHNlLCBcImdyb3Vwc1wiOiBbXCJnaXRodWJcIiwgXCJnaXRcIiwgXCJnaXRfb3JnXCJdIH0sIFwiZGF0YVwiOiB7IFwiaW50ZWdyYXRpb25cIjogXCJnaXRodWJcIiwgXCJnaXRodWJcIjogeyBcImFjdG9yXCI6IFwiX1VTRVJfXCIsIFwiQHRpbWVzdGFtcFwiOiBcIjE2MjQ0NDgxNDgyNzEuMDAwMDAwXCIsIFwib3JnXCI6IFwiX09SR0FOSVpBVElPTl9cIiwgXCJjcmVhdGVkX2F0XCI6IFwiMTYyNDQ0ODE0ODI3MS4wMDAwMDBcIiwgXCJhY3Rpb25cIjogXCJvcmcuZW5hYmxlX21lbWJlcl90ZWFtX2NyZWF0aW9uX3Blcm1pc3Npb25cIiwgXCJhY3Rvcl9sb2NhdGlvblwiOiB7IFwiY291bnRyeV9jb2RlXCI6IFwiX0NPVU5UUllfQ09ERV9cIiB9LCBcInVzZXJcIjogXCJfVVNFUl9cIiwgXCJfZG9jdW1lbnRfaWRcIjogXCJzZDJmbktXLUpjX09aSTl4bTJweXlRXCIgfSB9IH0sXG4gIHsgXCJydWxlXCI6IHsgXCJsZXZlbFwiOiA5LCBcImRlc2NyaXB0aW9uXCI6IFwiR2l0SHViIE9yZ2FuaXphdGlvbiBkaXNhYmxlIG1lbWJlciB0ZWFtIGNyZWF0aW9uIHBlcm1pc3Npb24uXCIsIFwiaWRcIjogXCI5MTE5OFwiLCBcImZpcmVkdGltZXNcIjogMSwgXCJtYWlsXCI6IGZhbHNlLCBcImdyb3Vwc1wiOiBbXCJnaXRodWJcIiwgXCJnaXRcIiwgXCJnaXRfb3JnXCJdIH0sIFwiZGF0YVwiOiB7IFwiaW50ZWdyYXRpb25cIjogXCJnaXRodWJcIiwgXCJnaXRodWJcIjogeyBcImFjdG9yXCI6IFwiX1VTRVJfXCIsIFwiQHRpbWVzdGFtcFwiOiBcIjE2MjQ0NDgxNTQ5NzIuMDAwMDAwXCIsIFwib3JnXCI6IFwiX09SR0FOSVpBVElPTl9cIiwgXCJjcmVhdGVkX2F0XCI6IFwiMTYyNDQ0ODE1NDk3Mi4wMDAwMDBcIiwgXCJhY3Rpb25cIjogXCJvcmcuZGlzYWJsZV9tZW1iZXJfdGVhbV9jcmVhdGlvbl9wZXJtaXNzaW9uXCIsIFwiYWN0b3JfbG9jYXRpb25cIjogeyBcImNvdW50cnlfY29kZVwiOiBcIl9DT1VOVFJZX0NPREVfXCIgfSwgXCJ1c2VyXCI6IFwiX1VTRVJfXCIsIFwiX2RvY3VtZW50X2lkXCI6IFwicHBqVnhHUUJBUXRzODJhdDlBejNYUVwiIH0gfSB9LFxuICB7IFwicnVsZVwiOiB7IFwibGV2ZWxcIjogMTIsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRIdWIgUmVwb3NpdG9yeSB2dWxuZXJhYmlsaXR5IGFsZXJ0cyBkaXNhYmxlLlwiLCBcImlkXCI6IFwiOTEzNjdcIiwgXCJmaXJlZHRpbWVzXCI6IDEsIFwibWFpbFwiOiB0cnVlLCBcImdyb3Vwc1wiOiBbXCJnaXRodWJcIiwgXCJnaXRcIiwgXCJnaXRfcmVwb3NpdG9yeV92dWxuZXJhYmlsaXR5X2FsZXJ0c1wiXSB9LCBcImRhdGFcIjogeyBcImludGVncmF0aW9uXCI6IFwiZ2l0aHViXCIsIFwiZ2l0aHViXCI6IHsgXCJhY3RvclwiOiBcIl9VU0VSX1wiLCBcIkB0aW1lc3RhbXBcIjogXCIxNjI0NDQ4NDE5MjEwLjAwMDAwMFwiLCBcIm9yZ1wiOiBcIl9PUkdBTklaQVRJT05fXCIsIFwicmVwb1wiOiBcIl9PUkdBTklaQVRJT05fL19SRVBPU0lUT1JZX1wiLCBcImNyZWF0ZWRfYXRcIjogXCIxNjI0NDQ4NDE5MjEwLjAwMDAwMFwiLCBcImFjdGlvblwiOiBcInJlcG9zaXRvcnlfdnVsbmVyYWJpbGl0eV9hbGVydHMuZGlzYWJsZVwiLCBcImFjdG9yX2xvY2F0aW9uXCI6IHsgXCJjb3VudHJ5X2NvZGVcIjogXCJfQ09VTlRSWV9DT0RFX1wiIH0sIFwidXNlclwiOiBcIl9VU0VSX1wiLCBcIl9kb2N1bWVudF9pZFwiOiBcIndnZjB1Q2VuNUxHNHN1NmpRMnhLREFcIiB9IH0gfSxcbiAgeyBcInJ1bGVcIjogeyBcImxldmVsXCI6IDUsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRIdWIgUmVwbyBjcmVhdGUuXCIsIFwiaWRcIjogXCI5MTMxOFwiLCBcImZpcmVkdGltZXNcIjogMiwgXCJtYWlsXCI6IGZhbHNlLCBcImdyb3Vwc1wiOiBbXCJnaXRodWJcIiwgXCJnaXRcIiwgXCJnaXRfcmVwb1wiXSB9LCBcImRhdGFcIjogeyBcImludGVncmF0aW9uXCI6IFwiZ2l0aHViXCIsIFwiZ2l0aHViXCI6IHsgXCJhY3RvclwiOiBcIl9VU0VSX1wiLCBcIkB0aW1lc3RhbXBcIjogXCIxNjI0NDQ4NDE5NDcwLjAwMDAwMFwiLCBcInZpc2liaWxpdHlcIjogXCJwdWJsaWNcIiwgXCJvcmdcIjogXCJfT1JHQU5JWkFUSU9OX1wiLCBcInJlcG9cIjogXCJfT1JHQU5JWkFUSU9OXy9fUkVQT1NJVE9SWV9cIiwgXCJjcmVhdGVkX2F0XCI6IFwiMTYyNDQ0ODQxOTQ3MC4wMDAwMDBcIiwgXCJhY3Rpb25cIjogXCJyZXBvLmNyZWF0ZVwiLCBcImFjdG9yX2xvY2F0aW9uXCI6IHsgXCJjb3VudHJ5X2NvZGVcIjogXCJfQ09VTlRSWV9DT0RFX1wiIH0sIFwiX2RvY3VtZW50X2lkXCI6IFwib0xBalpfRGJIdnpabFBtUkNYcjRNQVwiIH0gfSB9LFxuICB7IFwicnVsZVwiOiB7IFwibGV2ZWxcIjogMywgXCJkZXNjcmlwdGlvblwiOiBcIkdpdEh1YiBHaXQgY2xvbmUuXCIsIFwiaWRcIjogXCI5MTE1OFwiLCBcImZpcmVkdGltZXNcIjogMywgXCJtYWlsXCI6IGZhbHNlLCBcImdyb3Vwc1wiOiBbXCJnaXRodWJcIiwgXCJnaXRcIiwgXCJnaXRfZ2l0XCJdIH0sIFwiZGF0YVwiOiB7IFwiaW50ZWdyYXRpb25cIjogXCJnaXRodWJcIiwgXCJnaXRodWJcIjogeyBcIkB0aW1lc3RhbXBcIjogXCIxNjI0NDQ4NDIyMjA3LjAwMDAwMFwiLCBcIm9yZ1wiOiBcIl9PUkdBTklaQVRJT05fXCIsIFwicmVwb1wiOiBcIl9PUkdBTklaQVRJT05fL19SRVBPU0lUT1JZX1wiLCBcImFjdGlvblwiOiBcImdpdC5jbG9uZVwiLCBcInRyYW5zcG9ydF9wcm90b2NvbF9uYW1lXCI6IFwiaHR0cFwiLCBcInRyYW5zcG9ydF9wcm90b2NvbFwiOiBcIjFcIiwgXCJyZXBvc2l0b3J5XCI6IFwiX09SR0FOSVpBVElPTl8vX1JFUE9TSVRPUllfXCIsIFwicmVwb3NpdG9yeV9wdWJsaWNcIjogXCJ0cnVlXCIgfSB9IH0sXG4gIHsgXCJydWxlXCI6IHsgXCJsZXZlbFwiOiAzLCBcImRlc2NyaXB0aW9uXCI6IFwiR2l0SHViIEdpdCBjbG9uZS5cIiwgXCJpZFwiOiBcIjkxMTU4XCIsIFwiZmlyZWR0aW1lc1wiOiA0LCBcIm1haWxcIjogZmFsc2UsIFwiZ3JvdXBzXCI6IFtcImdpdGh1YlwiLCBcImdpdFwiLCBcImdpdF9naXRcIl0gfSwgXCJkYXRhXCI6IHsgXCJpbnRlZ3JhdGlvblwiOiBcImdpdGh1YlwiLCBcImdpdGh1YlwiOiB7IFwiQHRpbWVzdGFtcFwiOiBcIjE2MjQ0NDg0MjM5ODcuMDAwMDAwXCIsIFwib3JnXCI6IFwiX09SR0FOSVpBVElPTl9cIiwgXCJyZXBvXCI6IFwiX09SR0FOSVpBVElPTl8vX1JFUE9TSVRPUllfXCIsIFwiYWN0aW9uXCI6IFwiZ2l0LmNsb25lXCIsIFwidHJhbnNwb3J0X3Byb3RvY29sX25hbWVcIjogXCJodHRwXCIsIFwidHJhbnNwb3J0X3Byb3RvY29sXCI6IFwiMVwiLCBcInJlcG9zaXRvcnlcIjogXCJfT1JHQU5JWkFUSU9OXy9fUkVQT1NJVE9SWV9cIiwgXCJyZXBvc2l0b3J5X3B1YmxpY1wiOiBcInRydWVcIiB9IH0gfSxcbiAgeyBcInJ1bGVcIjogeyBcImxldmVsXCI6IDMsIFwiZGVzY3JpcHRpb25cIjogXCJHaXRIdWIgR2l0IGNsb25lLlwiLCBcImlkXCI6IFwiOTExNThcIiwgXCJmaXJlZHRpbWVzXCI6IDUsIFwibWFpbFwiOiBmYWxzZSwgXCJncm91cHNcIjogW1wiZ2l0aHViXCIsIFwiZ2l0XCIsIFwiZ2l0X2dpdFwiXSB9LCBcImRhdGFcIjogeyBcImludGVncmF0aW9uXCI6IFwiZ2l0aHViXCIsIFwiZ2l0aHViXCI6IHsgXCJAdGltZXN0YW1wXCI6IFwiMTYyNDQ0ODQzMjEwMS4wMDAwMDBcIiwgXCJvcmdcIjogXCJfT1JHQU5JWkFUSU9OX1wiLCBcInJlcG9cIjogXCJfT1JHQU5JWkFUSU9OXy9fUkVQT1NJVE9SWV9cIiwgXCJhY3Rvcl9sb2NhdGlvblwiOiB7IFwiY291bnRyeV9jb2RlXCI6IFwiX0NPVU5UUllfQ09ERV9cIiB9LCBcImFjdGlvblwiOiBcImdpdC5jbG9uZVwiLCBcInRyYW5zcG9ydF9wcm90b2NvbF9uYW1lXCI6IFwiaHR0cFwiLCBcInRyYW5zcG9ydF9wcm90b2NvbFwiOiBcIjFcIiwgXCJyZXBvc2l0b3J5XCI6IFwiX09SR0FOSVpBVElPTl8vX1JFUE9TSVRPUllfXCIsIFwicmVwb3NpdG9yeV9wdWJsaWNcIjogXCJ0cnVlXCIgfSB9IH0sXG4gIHsgXCJydWxlXCI6IHsgXCJsZXZlbFwiOiAzLCBcImRlc2NyaXB0aW9uXCI6IFwiR2l0SHViIEdpdCBjbG9uZS5cIiwgXCJpZFwiOiBcIjkxMTU4XCIsIFwiZmlyZWR0aW1lc1wiOiA2LCBcIm1haWxcIjogZmFsc2UsIFwiZ3JvdXBzXCI6IFtcImdpdGh1YlwiLCBcImdpdFwiLCBcImdpdF9naXRcIl0gfSwgXCJkYXRhXCI6IHsgXCJpbnRlZ3JhdGlvblwiOiBcImdpdGh1YlwiLCBcImdpdGh1YlwiOiB7IFwiQHRpbWVzdGFtcFwiOiBcIjE2MjQ0NDg0ODc4OTMuMDAwMDAwXCIsIFwib3JnXCI6IFwiX09SR0FOSVpBVElPTl9cIiwgXCJyZXBvXCI6IFwiX09SR0FOSVpBVElPTl8vX1JFUE9TSVRPUllfXCIsIFwiYWN0b3JfbG9jYXRpb25cIjogeyBcImNvdW50cnlfY29kZVwiOiBcIl9DT1VOVFJZX0NPREVfXCIgfSwgXCJhY3Rpb25cIjogXCJnaXQuY2xvbmVcIiwgXCJ0cmFuc3BvcnRfcHJvdG9jb2xfbmFtZVwiOiBcImh0dHBcIiwgXCJ0cmFuc3BvcnRfcHJvdG9jb2xcIjogXCIxXCIsIFwicmVwb3NpdG9yeVwiOiBcIl9PUkdBTklaQVRJT05fL19SRVBPU0lUT1JZX1wiLCBcInJlcG9zaXRvcnlfcHVibGljXCI6IFwidHJ1ZVwiIH0gfSB9LFxuICB7IFwicnVsZVwiOiB7IFwibGV2ZWxcIjogMywgXCJkZXNjcmlwdGlvblwiOiBcIkdpdEh1YiBHaXQgY2xvbmUuXCIsIFwiaWRcIjogXCI5MTE1OFwiLCBcImZpcmVkdGltZXNcIjogNywgXCJtYWlsXCI6IGZhbHNlLCBcImdyb3Vwc1wiOiBbXCJnaXRodWJcIiwgXCJnaXRcIiwgXCJnaXRfZ2l0XCJdIH0sIFwiZGF0YVwiOiB7IFwiaW50ZWdyYXRpb25cIjogXCJnaXRodWJcIiwgXCJnaXRodWJcIjogeyBcIkB0aW1lc3RhbXBcIjogXCIxNjI0NDQ4NzM2Mjk0LjAwMDAwMFwiLCBcIm9yZ1wiOiBcIl9PUkdBTklaQVRJT05fXCIsIFwicmVwb1wiOiBcIl9PUkdBTklaQVRJT05fL19SRVBPU0lUT1JZX1wiLCBcImFjdG9yX2xvY2F0aW9uXCI6IHsgXCJjb3VudHJ5X2NvZGVcIjogXCJfQ09VTlRSWV9DT0RFX1wiIH0sIFwiYWN0aW9uXCI6IFwiZ2l0LmNsb25lXCIsIFwidHJhbnNwb3J0X3Byb3RvY29sX25hbWVcIjogXCJodHRwXCIsIFwidHJhbnNwb3J0X3Byb3RvY29sXCI6IFwiMVwiLCBcInJlcG9zaXRvcnlcIjogXCJfT1JHQU5JWkFUSU9OXy9fUkVQT1NJVE9SWV9cIiwgXCJyZXBvc2l0b3J5X3B1YmxpY1wiOiBcInRydWVcIiB9IH0gfSxcbl07XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU8sTUFBTUEsUUFBUSxHQUFBQyxPQUFBLENBQUFELFFBQUEsR0FBRyxRQUFRO0FBRXpCLE1BQU1FLE9BQU8sR0FBQUQsT0FBQSxDQUFBQyxPQUFBLEdBQUc7RUFBRSxNQUFNLEVBQUU7QUFBTyxDQUFDO0FBRWxDLE1BQU1DLGFBQWEsR0FBQUYsT0FBQSxDQUFBRSxhQUFBLEdBQUcsQ0FDM0IsSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixJQUFJLEVBQ0osSUFBSSxDQUNMO0FBRUQsTUFBTUMsWUFBWSxHQUFHQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUNDLElBQUksQ0FBQyxDQUFDO0FBRTlCLE1BQU1DLGtCQUFrQixHQUFBTixPQUFBLENBQUFNLGtCQUFBLEdBQUdILFlBQVksQ0FBQ0ksR0FBRyxDQUFDLENBQUNDLENBQUMsRUFBRUMsS0FBSyxLQUFNLGVBQWNBLEtBQUssR0FBRyxDQUFFLEVBQUMsQ0FBQztBQUVyRixNQUFNQyxVQUFVLEdBQUFWLE9BQUEsQ0FBQVUsVUFBQSxHQUFHUCxZQUFZLENBQUNJLEdBQUcsQ0FBQyxDQUFDQyxDQUFDLEVBQUVDLEtBQUssS0FBTSxPQUFNQSxLQUFLLEdBQUcsQ0FBRSxFQUFDLENBQUM7QUFFckUsTUFBTUUsZ0JBQWdCLEdBQUFYLE9BQUEsQ0FBQVcsZ0JBQUEsR0FBR1IsWUFBWSxDQUFDSSxHQUFHLENBQUMsQ0FBQ0MsQ0FBQyxFQUFFQyxLQUFLLEtBQU0sT0FBTUEsS0FBSyxHQUFHLENBQUUsRUFBQyxDQUFDO0FBRTNFLE1BQU1HLE1BQU0sR0FBQVosT0FBQSxDQUFBWSxNQUFBLEdBQUdULFlBQVksQ0FBQ0ksR0FBRyxDQUFDLENBQUNDLENBQUMsRUFBRUMsS0FBSyxNQUFNO0VBQUVJLElBQUksRUFBRUgsVUFBVSxDQUFDRCxLQUFLLENBQUM7RUFBRUssWUFBWSxFQUFFWixhQUFhLENBQUNPLEtBQUs7QUFBRSxDQUFDLENBQUMsQ0FBQztBQUVoSCxNQUFNTSxzQkFBc0IsR0FBQWYsT0FBQSxDQUFBZSxzQkFBQSxHQUFHLENBQ3BDLHdCQUF3QixFQUN4QiwwQ0FBMEMsRUFDMUMsNkNBQTZDLEVBQzdDLHNDQUFzQyxDQUN2QztBQUVNLE1BQU1DLFdBQVcsR0FBQWhCLE9BQUEsQ0FBQWdCLFdBQUEsR0FBRyxDQUN6QjtFQUFFLE1BQU0sRUFBRTtJQUFFLE9BQU8sRUFBRSxDQUFDO0lBQUUsYUFBYSxFQUFFLHVDQUF1QztJQUFFLElBQUksRUFBRSxPQUFPO0lBQUUsWUFBWSxFQUFFLENBQUM7SUFBRSxNQUFNLEVBQUUsS0FBSztJQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUztFQUFFLENBQUM7RUFBRSxNQUFNLEVBQUU7SUFBRSxhQUFhLEVBQUUsUUFBUTtJQUFFLFFBQVEsRUFBRTtNQUFFLE9BQU8sRUFBRSxRQUFRO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLEtBQUssRUFBRSxnQkFBZ0I7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsUUFBUSxFQUFFLHNCQUFzQjtNQUFFLGdCQUFnQixFQUFFO1FBQUUsY0FBYyxFQUFFO01BQWlCLENBQUM7TUFBRSxjQUFjLEVBQUU7SUFBeUI7RUFBRTtBQUFFLENBQUMsRUFDeGQ7RUFBRSxNQUFNLEVBQUU7SUFBRSxPQUFPLEVBQUUsQ0FBQztJQUFFLGFBQWEsRUFBRSxxQkFBcUI7SUFBRSxJQUFJLEVBQUUsT0FBTztJQUFFLFlBQVksRUFBRSxDQUFDO0lBQUUsTUFBTSxFQUFFLEtBQUs7SUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVU7RUFBRSxDQUFDO0VBQUUsTUFBTSxFQUFFO0lBQUUsYUFBYSxFQUFFLFFBQVE7SUFBRSxRQUFRLEVBQUU7TUFBRSxPQUFPLEVBQUUsUUFBUTtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxLQUFLLEVBQUUsZ0JBQWdCO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLFFBQVEsRUFBRSxhQUFhO01BQUUsZ0JBQWdCLEVBQUU7UUFBRSxjQUFjLEVBQUU7TUFBaUIsQ0FBQztNQUFFLE1BQU0sRUFBRSw2QkFBNkI7TUFBRSxjQUFjLEVBQUU7SUFBeUI7RUFBRTtBQUFFLENBQUMsRUFDcmU7RUFBRSxNQUFNLEVBQUU7SUFBRSxPQUFPLEVBQUUsQ0FBQztJQUFFLGFBQWEsRUFBRSx5QkFBeUI7SUFBRSxJQUFJLEVBQUUsT0FBTztJQUFFLFlBQVksRUFBRSxDQUFDO0lBQUUsTUFBTSxFQUFFLEtBQUs7SUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVU7RUFBRSxDQUFDO0VBQUUsTUFBTSxFQUFFO0lBQUUsYUFBYSxFQUFFLFFBQVE7SUFBRSxRQUFRLEVBQUU7TUFBRSxPQUFPLEVBQUUsUUFBUTtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxLQUFLLEVBQUUsZ0JBQWdCO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLFFBQVEsRUFBRSxpQkFBaUI7TUFBRSxnQkFBZ0IsRUFBRTtRQUFFLGNBQWMsRUFBRTtNQUFpQixDQUFDO01BQUUsTUFBTSxFQUFFLDZCQUE2QjtNQUFFLE1BQU0sRUFBRSxRQUFRO01BQUUsY0FBYyxFQUFFO0lBQXlCO0VBQUU7QUFBRSxDQUFDLEVBQy9mO0VBQUUsTUFBTSxFQUFFO0lBQUUsT0FBTyxFQUFFLENBQUM7SUFBRSxhQUFhLEVBQUUseUJBQXlCO0lBQUUsSUFBSSxFQUFFLE9BQU87SUFBRSxZQUFZLEVBQUUsQ0FBQztJQUFFLE1BQU0sRUFBRSxLQUFLO0lBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVO0VBQUUsQ0FBQztFQUFFLE1BQU0sRUFBRTtJQUFFLGFBQWEsRUFBRSxRQUFRO0lBQUUsUUFBUSxFQUFFO01BQUUsT0FBTyxFQUFFLFFBQVE7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsS0FBSyxFQUFFLGdCQUFnQjtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxRQUFRLEVBQUUsaUJBQWlCO01BQUUsZ0JBQWdCLEVBQUU7UUFBRSxjQUFjLEVBQUU7TUFBaUIsQ0FBQztNQUFFLE1BQU0sRUFBRSw2QkFBNkI7TUFBRSxNQUFNLEVBQUUsUUFBUTtNQUFFLGNBQWMsRUFBRTtJQUF5QjtFQUFFO0FBQUUsQ0FBQyxFQUMvZjtFQUFFLE1BQU0sRUFBRTtJQUFFLE9BQU8sRUFBRSxDQUFDO0lBQUUsYUFBYSxFQUFFLHFCQUFxQjtJQUFFLElBQUksRUFBRSxPQUFPO0lBQUUsWUFBWSxFQUFFLENBQUM7SUFBRSxNQUFNLEVBQUUsS0FBSztJQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsVUFBVTtFQUFFLENBQUM7RUFBRSxNQUFNLEVBQUU7SUFBRSxhQUFhLEVBQUUsUUFBUTtJQUFFLFFBQVEsRUFBRTtNQUFFLE9BQU8sRUFBRSxRQUFRO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLFlBQVksRUFBRSxTQUFTO01BQUUsS0FBSyxFQUFFLGdCQUFnQjtNQUFFLE1BQU0sRUFBRSw2QkFBNkI7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsUUFBUSxFQUFFLGFBQWE7TUFBRSxnQkFBZ0IsRUFBRTtRQUFFLGNBQWMsRUFBRTtNQUFpQixDQUFDO01BQUUsY0FBYyxFQUFFO0lBQXlCO0VBQUU7QUFBRSxDQUFDLEVBQzlmO0VBQUUsTUFBTSxFQUFFO0lBQUUsT0FBTyxFQUFFLENBQUM7SUFBRSxhQUFhLEVBQUUsbUJBQW1CO0lBQUUsSUFBSSxFQUFFLE9BQU87SUFBRSxZQUFZLEVBQUUsQ0FBQztJQUFFLE1BQU0sRUFBRSxLQUFLO0lBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTO0VBQUUsQ0FBQztFQUFFLE1BQU0sRUFBRTtJQUFFLGFBQWEsRUFBRSxRQUFRO0lBQUUsUUFBUSxFQUFFO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLEtBQUssRUFBRSxnQkFBZ0I7TUFBRSxNQUFNLEVBQUUsNkJBQTZCO01BQUUsUUFBUSxFQUFFLFdBQVc7TUFBRSx5QkFBeUIsRUFBRSxNQUFNO01BQUUsb0JBQW9CLEVBQUUsR0FBRztNQUFFLFlBQVksRUFBRSw2QkFBNkI7TUFBRSxtQkFBbUIsRUFBRTtJQUFRO0VBQUU7QUFBRSxDQUFDLEVBQzljO0VBQUUsTUFBTSxFQUFFO0lBQUUsT0FBTyxFQUFFLENBQUM7SUFBRSxhQUFhLEVBQUUsbUJBQW1CO0lBQUUsSUFBSSxFQUFFLE9BQU87SUFBRSxZQUFZLEVBQUUsQ0FBQztJQUFFLE1BQU0sRUFBRSxLQUFLO0lBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTO0VBQUUsQ0FBQztFQUFFLE1BQU0sRUFBRTtJQUFFLGFBQWEsRUFBRSxRQUFRO0lBQUUsUUFBUSxFQUFFO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLEtBQUssRUFBRSxnQkFBZ0I7TUFBRSxNQUFNLEVBQUUsNkJBQTZCO01BQUUsUUFBUSxFQUFFLFdBQVc7TUFBRSx5QkFBeUIsRUFBRSxNQUFNO01BQUUsb0JBQW9CLEVBQUUsR0FBRztNQUFFLFlBQVksRUFBRSw2QkFBNkI7TUFBRSxtQkFBbUIsRUFBRTtJQUFRO0VBQUU7QUFBRSxDQUFDLEVBQzljO0VBQUUsTUFBTSxFQUFFO0lBQUUsT0FBTyxFQUFFLENBQUM7SUFBRSxhQUFhLEVBQUUsdUNBQXVDO0lBQUUsSUFBSSxFQUFFLE9BQU87SUFBRSxZQUFZLEVBQUUsQ0FBQztJQUFFLE1BQU0sRUFBRSxLQUFLO0lBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTO0VBQUUsQ0FBQztFQUFFLE1BQU0sRUFBRTtJQUFFLGFBQWEsRUFBRSxRQUFRO0lBQUUsUUFBUSxFQUFFO01BQUUsT0FBTyxFQUFFLFFBQVE7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsS0FBSyxFQUFFLGdCQUFnQjtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxRQUFRLEVBQUUsZ0NBQWdDO01BQUUsZ0JBQWdCLEVBQUU7UUFBRSxjQUFjLEVBQUU7TUFBaUIsQ0FBQztNQUFFLGNBQWMsRUFBRTtJQUF5QjtFQUFFO0FBQUUsQ0FBQyxFQUNsZTtFQUFFLE1BQU0sRUFBRTtJQUFFLE9BQU8sRUFBRSxDQUFDO0lBQUUsYUFBYSxFQUFFLHVDQUF1QztJQUFFLElBQUksRUFBRSxPQUFPO0lBQUUsWUFBWSxFQUFFLENBQUM7SUFBRSxNQUFNLEVBQUUsS0FBSztJQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUztFQUFFLENBQUM7RUFBRSxNQUFNLEVBQUU7SUFBRSxhQUFhLEVBQUUsUUFBUTtJQUFFLFFBQVEsRUFBRTtNQUFFLE9BQU8sRUFBRSxRQUFRO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLEtBQUssRUFBRSxnQkFBZ0I7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsUUFBUSxFQUFFLHNCQUFzQjtNQUFFLGdCQUFnQixFQUFFO1FBQUUsY0FBYyxFQUFFO01BQWlCLENBQUM7TUFBRSxjQUFjLEVBQUU7SUFBeUI7RUFBRTtBQUFFLENBQUMsRUFDeGQ7RUFBRSxNQUFNLEVBQUU7SUFBRSxPQUFPLEVBQUUsQ0FBQztJQUFFLGFBQWEsRUFBRSxxQkFBcUI7SUFBRSxJQUFJLEVBQUUsT0FBTztJQUFFLFlBQVksRUFBRSxDQUFDO0lBQUUsTUFBTSxFQUFFLEtBQUs7SUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVU7RUFBRSxDQUFDO0VBQUUsTUFBTSxFQUFFO0lBQUUsYUFBYSxFQUFFLFFBQVE7SUFBRSxRQUFRLEVBQUU7TUFBRSxPQUFPLEVBQUUsUUFBUTtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxLQUFLLEVBQUUsZ0JBQWdCO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLFFBQVEsRUFBRSxhQUFhO01BQUUsZ0JBQWdCLEVBQUU7UUFBRSxjQUFjLEVBQUU7TUFBaUIsQ0FBQztNQUFFLE1BQU0sRUFBRSw2QkFBNkI7TUFBRSxjQUFjLEVBQUU7SUFBeUI7RUFBRTtBQUFFLENBQUMsRUFDcmU7RUFBRSxNQUFNLEVBQUU7SUFBRSxPQUFPLEVBQUUsQ0FBQztJQUFFLGFBQWEsRUFBRSx5QkFBeUI7SUFBRSxJQUFJLEVBQUUsT0FBTztJQUFFLFlBQVksRUFBRSxDQUFDO0lBQUUsTUFBTSxFQUFFLEtBQUs7SUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVU7RUFBRSxDQUFDO0VBQUUsTUFBTSxFQUFFO0lBQUUsYUFBYSxFQUFFLFFBQVE7SUFBRSxRQUFRLEVBQUU7TUFBRSxPQUFPLEVBQUUsUUFBUTtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxLQUFLLEVBQUUsZ0JBQWdCO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLFFBQVEsRUFBRSxpQkFBaUI7TUFBRSxnQkFBZ0IsRUFBRTtRQUFFLGNBQWMsRUFBRTtNQUFpQixDQUFDO01BQUUsTUFBTSxFQUFFLDZCQUE2QjtNQUFFLE1BQU0sRUFBRSxRQUFRO01BQUUsY0FBYyxFQUFFO0lBQXlCO0VBQUU7QUFBRSxDQUFDLEVBQy9mO0VBQUUsTUFBTSxFQUFFO0lBQUUsT0FBTyxFQUFFLENBQUM7SUFBRSxhQUFhLEVBQUUsc0JBQXNCO0lBQUUsSUFBSSxFQUFFLE9BQU87SUFBRSxZQUFZLEVBQUUsQ0FBQztJQUFFLE1BQU0sRUFBRSxLQUFLO0lBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVO0VBQUUsQ0FBQztFQUFFLE1BQU0sRUFBRTtJQUFFLGFBQWEsRUFBRSxRQUFRO0lBQUUsUUFBUSxFQUFFO01BQUUsT0FBTyxFQUFFLFFBQVE7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsS0FBSyxFQUFFLGdCQUFnQjtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxRQUFRLEVBQUUsY0FBYztNQUFFLGdCQUFnQixFQUFFO1FBQUUsY0FBYyxFQUFFO01BQWlCLENBQUM7TUFBRSxNQUFNLEVBQUUsNkJBQTZCO01BQUUsY0FBYyxFQUFFO0lBQXlCO0VBQUU7QUFBRSxDQUFDLEVBQ3ZlO0VBQUUsTUFBTSxFQUFFO0lBQUUsT0FBTyxFQUFFLENBQUM7SUFBRSxhQUFhLEVBQUUsNEJBQTRCO0lBQUUsSUFBSSxFQUFFLE9BQU87SUFBRSxZQUFZLEVBQUUsQ0FBQztJQUFFLE1BQU0sRUFBRSxLQUFLO0lBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVO0VBQUUsQ0FBQztFQUFFLE1BQU0sRUFBRTtJQUFFLGFBQWEsRUFBRSxRQUFRO0lBQUUsUUFBUSxFQUFFO01BQUUsT0FBTyxFQUFFLFFBQVE7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsS0FBSyxFQUFFLGdCQUFnQjtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxRQUFRLEVBQUUsb0JBQW9CO01BQUUsZ0JBQWdCLEVBQUU7UUFBRSxjQUFjLEVBQUU7TUFBaUIsQ0FBQztNQUFFLE1BQU0sRUFBRSx3QkFBd0I7TUFBRSxNQUFNLEVBQUUsUUFBUTtNQUFFLGNBQWMsRUFBRTtJQUF5QjtFQUFFO0FBQUUsQ0FBQyxFQUNoZ0I7RUFBRSxNQUFNLEVBQUU7SUFBRSxPQUFPLEVBQUUsQ0FBQztJQUFFLGFBQWEsRUFBRSx5QkFBeUI7SUFBRSxJQUFJLEVBQUUsT0FBTztJQUFFLFlBQVksRUFBRSxDQUFDO0lBQUUsTUFBTSxFQUFFLEtBQUs7SUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVU7RUFBRSxDQUFDO0VBQUUsTUFBTSxFQUFFO0lBQUUsYUFBYSxFQUFFLFFBQVE7SUFBRSxRQUFRLEVBQUU7TUFBRSxPQUFPLEVBQUUsUUFBUTtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxLQUFLLEVBQUUsZ0JBQWdCO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLFFBQVEsRUFBRSxpQkFBaUI7TUFBRSxnQkFBZ0IsRUFBRTtRQUFFLGNBQWMsRUFBRTtNQUFpQixDQUFDO01BQUUsTUFBTSxFQUFFLHdCQUF3QjtNQUFFLE1BQU0sRUFBRSxRQUFRO01BQUUsY0FBYyxFQUFFO0lBQXlCO0VBQUU7QUFBRSxDQUFDLEVBQzFmO0VBQUUsTUFBTSxFQUFFO0lBQUUsT0FBTyxFQUFFLENBQUM7SUFBRSxhQUFhLEVBQUUsMkNBQTJDO0lBQUUsSUFBSSxFQUFFLE9BQU87SUFBRSxZQUFZLEVBQUUsQ0FBQztJQUFFLE1BQU0sRUFBRSxLQUFLO0lBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxnQ0FBZ0M7RUFBRSxDQUFDO0VBQUUsTUFBTSxFQUFFO0lBQUUsYUFBYSxFQUFFLFFBQVE7SUFBRSxRQUFRLEVBQUU7TUFBRSxPQUFPLEVBQUUsUUFBUTtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxLQUFLLEVBQUUsZ0JBQWdCO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLFFBQVEsRUFBRSxtQ0FBbUM7TUFBRSxnQkFBZ0IsRUFBRTtRQUFFLGNBQWMsRUFBRTtNQUFpQixDQUFDO01BQUUsTUFBTSxFQUFFLFFBQVE7TUFBRSxjQUFjLEVBQUU7SUFBeUI7RUFBRTtBQUFFLENBQUMsRUFDbGhCO0VBQUUsTUFBTSxFQUFFO0lBQUUsT0FBTyxFQUFFLEVBQUU7SUFBRSxhQUFhLEVBQUUsNENBQTRDO0lBQUUsSUFBSSxFQUFFLE9BQU87SUFBRSxZQUFZLEVBQUUsQ0FBQztJQUFFLE1BQU0sRUFBRSxJQUFJO0lBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxnQ0FBZ0M7RUFBRSxDQUFDO0VBQUUsTUFBTSxFQUFFO0lBQUUsYUFBYSxFQUFFLFFBQVE7SUFBRSxRQUFRLEVBQUU7TUFBRSxPQUFPLEVBQUUsUUFBUTtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxLQUFLLEVBQUUsZ0JBQWdCO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLFFBQVEsRUFBRSxvQ0FBb0M7TUFBRSxnQkFBZ0IsRUFBRTtRQUFFLGNBQWMsRUFBRTtNQUFpQixDQUFDO01BQUUsTUFBTSxFQUFFLFFBQVE7TUFBRSxjQUFjLEVBQUU7SUFBeUI7RUFBRTtBQUFFLENBQUMsRUFDcGhCO0VBQUUsTUFBTSxFQUFFO0lBQUUsT0FBTyxFQUFFLENBQUM7SUFBRSxhQUFhLEVBQUUscUJBQXFCO0lBQUUsSUFBSSxFQUFFLE9BQU87SUFBRSxZQUFZLEVBQUUsQ0FBQztJQUFFLE1BQU0sRUFBRSxLQUFLO0lBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVO0VBQUUsQ0FBQztFQUFFLE1BQU0sRUFBRTtJQUFFLGFBQWEsRUFBRSxRQUFRO0lBQUUsUUFBUSxFQUFFO01BQUUsT0FBTyxFQUFFLFFBQVE7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsS0FBSyxFQUFFLGdCQUFnQjtNQUFFLFNBQVMsRUFBRSxXQUFXO01BQUUsTUFBTSxFQUFFLFNBQVM7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsUUFBUSxFQUFFLGFBQWE7TUFBRSxRQUFRLEVBQUUsTUFBTTtNQUFFLGdCQUFnQixFQUFFO1FBQUUsY0FBYyxFQUFFO01BQWlCLENBQUM7TUFBRSxRQUFRLEVBQUU7UUFBRSxjQUFjLEVBQUUsTUFBTTtRQUFFLGNBQWMsRUFBRSxHQUFHO1FBQUUsUUFBUSxFQUFFLFVBQVU7UUFBRSxLQUFLLEVBQUU7TUFBMkIsQ0FBQztNQUFFLFFBQVEsRUFBRSxDQUFDLE1BQU0sQ0FBQztNQUFFLGNBQWMsRUFBRTtJQUF5QjtFQUFFO0FBQUUsQ0FBQyxFQUNub0I7RUFBRSxNQUFNLEVBQUU7SUFBRSxPQUFPLEVBQUUsQ0FBQztJQUFFLGFBQWEsRUFBRSw2QkFBNkI7SUFBRSxJQUFJLEVBQUUsT0FBTztJQUFFLFlBQVksRUFBRSxDQUFDO0lBQUUsTUFBTSxFQUFFLEtBQUs7SUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVU7RUFBRSxDQUFDO0VBQUUsTUFBTSxFQUFFO0lBQUUsYUFBYSxFQUFFLFFBQVE7SUFBRSxRQUFRLEVBQUU7TUFBRSxLQUFLLEVBQUUsZ0JBQWdCO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLFFBQVEsRUFBRSxNQUFNO01BQUUsT0FBTyxFQUFFLFFBQVE7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsU0FBUyxFQUFFLFdBQVc7TUFBRSxNQUFNLEVBQUUsU0FBUztNQUFFLFFBQVEsRUFBRSxxQkFBcUI7TUFBRSxnQkFBZ0IsRUFBRTtRQUFFLGNBQWMsRUFBRTtNQUFpQixDQUFDO01BQUUsUUFBUSxFQUFFO1FBQUUsY0FBYyxFQUFFLE1BQU07UUFBRSxjQUFjLEVBQUUsR0FBRztRQUFFLFFBQVEsRUFBRSxVQUFVO1FBQUUsS0FBSyxFQUFFO01BQTJCLENBQUM7TUFBRSxRQUFRLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO01BQUUsY0FBYyxFQUFFLHdCQUF3QjtNQUFFLGFBQWEsRUFBRSxDQUFDLE1BQU07SUFBRTtFQUFFO0FBQUUsQ0FBQyxFQUN0dEI7RUFBRSxNQUFNLEVBQUU7SUFBRSxPQUFPLEVBQUUsQ0FBQztJQUFFLGFBQWEsRUFBRSxtQkFBbUI7SUFBRSxJQUFJLEVBQUUsT0FBTztJQUFFLFlBQVksRUFBRSxDQUFDO0lBQUUsTUFBTSxFQUFFLEtBQUs7SUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFNBQVM7RUFBRSxDQUFDO0VBQUUsTUFBTSxFQUFFO0lBQUUsYUFBYSxFQUFFLFFBQVE7SUFBRSxRQUFRLEVBQUU7TUFBRSxPQUFPLEVBQUUsUUFBUTtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxLQUFLLEVBQUUsZ0JBQWdCO01BQUUsTUFBTSxFQUFFLDZCQUE2QjtNQUFFLGdCQUFnQixFQUFFO1FBQUUsY0FBYyxFQUFFO01BQWlCLENBQUM7TUFBRSxRQUFRLEVBQUUsV0FBVztNQUFFLHlCQUF5QixFQUFFLE1BQU07TUFBRSxvQkFBb0IsRUFBRSxHQUFHO01BQUUsWUFBWSxFQUFFLDZCQUE2QjtNQUFFLG1CQUFtQixFQUFFO0lBQVE7RUFBRTtBQUFFLENBQUMsRUFDemhCO0VBQUUsTUFBTSxFQUFFO0lBQUUsT0FBTyxFQUFFLENBQUM7SUFBRSxhQUFhLEVBQUUsa0JBQWtCO0lBQUUsSUFBSSxFQUFFLE9BQU87SUFBRSxZQUFZLEVBQUUsQ0FBQztJQUFFLE1BQU0sRUFBRSxLQUFLO0lBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTO0VBQUUsQ0FBQztFQUFFLE1BQU0sRUFBRTtJQUFFLGFBQWEsRUFBRSxRQUFRO0lBQUUsUUFBUSxFQUFFO01BQUUsT0FBTyxFQUFFLFFBQVE7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsS0FBSyxFQUFFLGdCQUFnQjtNQUFFLE1BQU0sRUFBRSw2QkFBNkI7TUFBRSxnQkFBZ0IsRUFBRTtRQUFFLGNBQWMsRUFBRTtNQUFpQixDQUFDO01BQUUsUUFBUSxFQUFFLFVBQVU7TUFBRSx5QkFBeUIsRUFBRSxNQUFNO01BQUUsb0JBQW9CLEVBQUUsR0FBRztNQUFFLFlBQVksRUFBRSw2QkFBNkI7TUFBRSxtQkFBbUIsRUFBRTtJQUFRO0VBQUU7QUFBRSxDQUFDLEVBQ3ZoQjtFQUFFLE1BQU0sRUFBRTtJQUFFLE9BQU8sRUFBRSxDQUFDO0lBQUUsYUFBYSxFQUFFLGtCQUFrQjtJQUFFLElBQUksRUFBRSxPQUFPO0lBQUUsWUFBWSxFQUFFLENBQUM7SUFBRSxNQUFNLEVBQUUsS0FBSztJQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUztFQUFFLENBQUM7RUFBRSxNQUFNLEVBQUU7SUFBRSxhQUFhLEVBQUUsUUFBUTtJQUFFLFFBQVEsRUFBRTtNQUFFLE9BQU8sRUFBRSxRQUFRO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLEtBQUssRUFBRSxnQkFBZ0I7TUFBRSxNQUFNLEVBQUUsNkJBQTZCO01BQUUsZ0JBQWdCLEVBQUU7UUFBRSxjQUFjLEVBQUU7TUFBaUIsQ0FBQztNQUFFLFFBQVEsRUFBRSxVQUFVO01BQUUseUJBQXlCLEVBQUUsTUFBTTtNQUFFLG9CQUFvQixFQUFFLEdBQUc7TUFBRSxZQUFZLEVBQUUsNkJBQTZCO01BQUUsbUJBQW1CLEVBQUU7SUFBUTtFQUFFO0FBQUUsQ0FBQyxFQUN2aEI7RUFBRSxNQUFNLEVBQUU7SUFBRSxPQUFPLEVBQUUsQ0FBQztJQUFFLGFBQWEsRUFBRSxtQkFBbUI7SUFBRSxJQUFJLEVBQUUsT0FBTztJQUFFLFlBQVksRUFBRSxDQUFDO0lBQUUsTUFBTSxFQUFFLEtBQUs7SUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFNBQVM7RUFBRSxDQUFDO0VBQUUsTUFBTSxFQUFFO0lBQUUsYUFBYSxFQUFFLFFBQVE7SUFBRSxRQUFRLEVBQUU7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsS0FBSyxFQUFFLGdCQUFnQjtNQUFFLE1BQU0sRUFBRSw2QkFBNkI7TUFBRSxRQUFRLEVBQUUsV0FBVztNQUFFLHlCQUF5QixFQUFFLE1BQU07TUFBRSxvQkFBb0IsRUFBRSxHQUFHO01BQUUsWUFBWSxFQUFFLDZCQUE2QjtNQUFFLG1CQUFtQixFQUFFO0lBQVE7RUFBRTtBQUFFLENBQUMsRUFDOWM7RUFBRSxNQUFNLEVBQUU7SUFBRSxPQUFPLEVBQUUsQ0FBQztJQUFFLGFBQWEsRUFBRSxxQkFBcUI7SUFBRSxJQUFJLEVBQUUsT0FBTztJQUFFLFlBQVksRUFBRSxDQUFDO0lBQUUsTUFBTSxFQUFFLEtBQUs7SUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVU7RUFBRSxDQUFDO0VBQUUsTUFBTSxFQUFFO0lBQUUsYUFBYSxFQUFFLFFBQVE7SUFBRSxRQUFRLEVBQUU7TUFBRSxPQUFPLEVBQUUsUUFBUTtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxZQUFZLEVBQUUsU0FBUztNQUFFLEtBQUssRUFBRSxnQkFBZ0I7TUFBRSxNQUFNLEVBQUUsNkJBQTZCO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLFFBQVEsRUFBRSxhQUFhO01BQUUsZ0JBQWdCLEVBQUU7UUFBRSxjQUFjLEVBQUU7TUFBaUIsQ0FBQztNQUFFLGNBQWMsRUFBRTtJQUF5QjtFQUFFO0FBQUUsQ0FBQyxFQUM5ZjtFQUFFLE1BQU0sRUFBRTtJQUFFLE9BQU8sRUFBRSxDQUFDO0lBQUUsYUFBYSxFQUFFLHNCQUFzQjtJQUFFLElBQUksRUFBRSxPQUFPO0lBQUUsWUFBWSxFQUFFLENBQUM7SUFBRSxNQUFNLEVBQUUsS0FBSztJQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsVUFBVTtFQUFFLENBQUM7RUFBRSxNQUFNLEVBQUU7SUFBRSxhQUFhLEVBQUUsUUFBUTtJQUFFLFFBQVEsRUFBRTtNQUFFLE9BQU8sRUFBRSxRQUFRO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLFlBQVksRUFBRSxTQUFTO01BQUUsS0FBSyxFQUFFLGdCQUFnQjtNQUFFLE1BQU0sRUFBRSw2QkFBNkI7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsUUFBUSxFQUFFLGNBQWM7TUFBRSxnQkFBZ0IsRUFBRTtRQUFFLGNBQWMsRUFBRTtNQUFpQixDQUFDO01BQUUsY0FBYyxFQUFFO0lBQXlCO0VBQUU7QUFBRSxDQUFDLEVBQ2hnQjtFQUFFLE1BQU0sRUFBRTtJQUFFLE9BQU8sRUFBRSxDQUFDO0lBQUUsYUFBYSxFQUFFLG1CQUFtQjtJQUFFLElBQUksRUFBRSxPQUFPO0lBQUUsWUFBWSxFQUFFLENBQUM7SUFBRSxNQUFNLEVBQUUsS0FBSztJQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUztFQUFFLENBQUM7RUFBRSxNQUFNLEVBQUU7SUFBRSxhQUFhLEVBQUUsUUFBUTtJQUFFLFFBQVEsRUFBRTtNQUFFLE9BQU8sRUFBRSxRQUFRO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLEtBQUssRUFBRSxnQkFBZ0I7TUFBRSxNQUFNLEVBQUUsNkJBQTZCO01BQUUsZ0JBQWdCLEVBQUU7UUFBRSxjQUFjLEVBQUU7TUFBaUIsQ0FBQztNQUFFLFFBQVEsRUFBRSxXQUFXO01BQUUseUJBQXlCLEVBQUUsTUFBTTtNQUFFLG9CQUFvQixFQUFFLEdBQUc7TUFBRSxZQUFZLEVBQUUsNkJBQTZCO01BQUUsbUJBQW1CLEVBQUU7SUFBUTtFQUFFO0FBQUUsQ0FBQyxFQUN6aEI7RUFBRSxNQUFNLEVBQUU7SUFBRSxPQUFPLEVBQUUsQ0FBQztJQUFFLGFBQWEsRUFBRSwyREFBMkQ7SUFBRSxJQUFJLEVBQUUsT0FBTztJQUFFLFlBQVksRUFBRSxDQUFDO0lBQUUsTUFBTSxFQUFFLEtBQUs7SUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFNBQVM7RUFBRSxDQUFDO0VBQUUsTUFBTSxFQUFFO0lBQUUsYUFBYSxFQUFFLFFBQVE7SUFBRSxRQUFRLEVBQUU7TUFBRSxPQUFPLEVBQUUsUUFBUTtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxLQUFLLEVBQUUsZ0JBQWdCO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLFFBQVEsRUFBRSwwQ0FBMEM7TUFBRSxnQkFBZ0IsRUFBRTtRQUFFLGNBQWMsRUFBRTtNQUFpQixDQUFDO01BQUUsY0FBYyxFQUFFO0lBQXlCO0VBQUU7QUFBRSxDQUFDLEVBQ2hnQjtFQUFFLE1BQU0sRUFBRTtJQUFFLE9BQU8sRUFBRSxDQUFDO0lBQUUsYUFBYSxFQUFFLDJEQUEyRDtJQUFFLElBQUksRUFBRSxPQUFPO0lBQUUsWUFBWSxFQUFFLENBQUM7SUFBRSxNQUFNLEVBQUUsS0FBSztJQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUztFQUFFLENBQUM7RUFBRSxNQUFNLEVBQUU7SUFBRSxhQUFhLEVBQUUsUUFBUTtJQUFFLFFBQVEsRUFBRTtNQUFFLE9BQU8sRUFBRSxRQUFRO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLEtBQUssRUFBRSxnQkFBZ0I7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsUUFBUSxFQUFFLDBDQUEwQztNQUFFLGdCQUFnQixFQUFFO1FBQUUsY0FBYyxFQUFFO01BQWlCLENBQUM7TUFBRSxjQUFjLEVBQUU7SUFBeUI7RUFBRTtBQUFFLENBQUMsRUFDaGdCO0VBQUUsTUFBTSxFQUFFO0lBQUUsT0FBTyxFQUFFLENBQUM7SUFBRSxhQUFhLEVBQUUsbUVBQW1FO0lBQUUsSUFBSSxFQUFFLE9BQU87SUFBRSxZQUFZLEVBQUUsQ0FBQztJQUFFLE1BQU0sRUFBRSxLQUFLO0lBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTO0VBQUUsQ0FBQztFQUFFLE1BQU0sRUFBRTtJQUFFLGFBQWEsRUFBRSxRQUFRO0lBQUUsUUFBUSxFQUFFO01BQUUsT0FBTyxFQUFFLFFBQVE7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsWUFBWSxFQUFFLGtCQUFrQjtNQUFFLEtBQUssRUFBRSxnQkFBZ0I7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsUUFBUSxFQUFFLGtEQUFrRDtNQUFFLGdCQUFnQixFQUFFO1FBQUUsY0FBYyxFQUFFO01BQWlCLENBQUM7TUFBRSxjQUFjLEVBQUU7SUFBeUI7RUFBRTtBQUFFLENBQUMsRUFDbGpCO0VBQUUsTUFBTSxFQUFFO0lBQUUsT0FBTyxFQUFFLENBQUM7SUFBRSxhQUFhLEVBQUUsbUVBQW1FO0lBQUUsSUFBSSxFQUFFLE9BQU87SUFBRSxZQUFZLEVBQUUsQ0FBQztJQUFFLE1BQU0sRUFBRSxLQUFLO0lBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTO0VBQUUsQ0FBQztFQUFFLE1BQU0sRUFBRTtJQUFFLGFBQWEsRUFBRSxRQUFRO0lBQUUsUUFBUSxFQUFFO01BQUUsT0FBTyxFQUFFLFFBQVE7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsWUFBWSxFQUFFLFVBQVU7TUFBRSxLQUFLLEVBQUUsZ0JBQWdCO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLFFBQVEsRUFBRSxrREFBa0Q7TUFBRSxnQkFBZ0IsRUFBRTtRQUFFLGNBQWMsRUFBRTtNQUFpQixDQUFDO01BQUUsY0FBYyxFQUFFO0lBQXlCO0VBQUU7QUFBRSxDQUFDLEVBQzFpQjtFQUFFLE1BQU0sRUFBRTtJQUFFLE9BQU8sRUFBRSxDQUFDO0lBQUUsYUFBYSxFQUFFLDJDQUEyQztJQUFFLElBQUksRUFBRSxPQUFPO0lBQUUsWUFBWSxFQUFFLENBQUM7SUFBRSxNQUFNLEVBQUUsS0FBSztJQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsZ0NBQWdDO0VBQUUsQ0FBQztFQUFFLE1BQU0sRUFBRTtJQUFFLGFBQWEsRUFBRSxRQUFRO0lBQUUsUUFBUSxFQUFFO01BQUUsT0FBTyxFQUFFLFFBQVE7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsS0FBSyxFQUFFLGdCQUFnQjtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxRQUFRLEVBQUUsbUNBQW1DO01BQUUsZ0JBQWdCLEVBQUU7UUFBRSxjQUFjLEVBQUU7TUFBaUIsQ0FBQztNQUFFLE1BQU0sRUFBRSxRQUFRO01BQUUsY0FBYyxFQUFFO0lBQXlCO0VBQUU7QUFBRSxDQUFDLEVBQ2xoQjtFQUFFLE1BQU0sRUFBRTtJQUFFLE9BQU8sRUFBRSxDQUFDO0lBQUUsYUFBYSxFQUFFLDRDQUE0QztJQUFFLElBQUksRUFBRSxPQUFPO0lBQUUsWUFBWSxFQUFFLENBQUM7SUFBRSxNQUFNLEVBQUUsS0FBSztJQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsZ0NBQWdDO0VBQUUsQ0FBQztFQUFFLE1BQU0sRUFBRTtJQUFFLGFBQWEsRUFBRSxRQUFRO0lBQUUsUUFBUSxFQUFFO01BQUUsT0FBTyxFQUFFLFFBQVE7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsS0FBSyxFQUFFLGdCQUFnQjtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxRQUFRLEVBQUUsb0NBQW9DO01BQUUsZ0JBQWdCLEVBQUU7UUFBRSxjQUFjLEVBQUU7TUFBaUIsQ0FBQztNQUFFLE1BQU0sRUFBRSxRQUFRO01BQUUsY0FBYyxFQUFFO0lBQXlCO0VBQUU7QUFBRSxDQUFDLEVBQ3BoQjtFQUFFLE1BQU0sRUFBRTtJQUFFLE9BQU8sRUFBRSxDQUFDO0lBQUUsYUFBYSxFQUFFLHNCQUFzQjtJQUFFLElBQUksRUFBRSxPQUFPO0lBQUUsWUFBWSxFQUFFLENBQUM7SUFBRSxNQUFNLEVBQUUsS0FBSztJQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLO0VBQUUsQ0FBQztFQUFFLE1BQU0sRUFBRTtJQUFFLGFBQWEsRUFBRSxRQUFRO0lBQUUsUUFBUSxFQUFFO01BQUUsT0FBTyxFQUFFLFFBQVE7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsS0FBSyxFQUFFLGdCQUFnQjtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxRQUFRLEVBQUUsMENBQTBDO01BQUUsZ0JBQWdCLEVBQUU7UUFBRSxjQUFjLEVBQUU7TUFBaUIsQ0FBQztNQUFFLE1BQU0sRUFBRSxRQUFRO01BQUUsY0FBYyxFQUFFO0lBQXlCO0VBQUU7QUFBRSxDQUFDLEVBQ2xlO0VBQUUsTUFBTSxFQUFFO0lBQUUsT0FBTyxFQUFFLENBQUM7SUFBRSxhQUFhLEVBQUUsc0JBQXNCO0lBQUUsSUFBSSxFQUFFLE9BQU87SUFBRSxZQUFZLEVBQUUsQ0FBQztJQUFFLE1BQU0sRUFBRSxLQUFLO0lBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUs7RUFBRSxDQUFDO0VBQUUsTUFBTSxFQUFFO0lBQUUsYUFBYSxFQUFFLFFBQVE7SUFBRSxRQUFRLEVBQUU7TUFBRSxPQUFPLEVBQUUsUUFBUTtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxLQUFLLEVBQUUsZ0JBQWdCO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLFFBQVEsRUFBRSx5Q0FBeUM7TUFBRSxnQkFBZ0IsRUFBRTtRQUFFLGNBQWMsRUFBRTtNQUFpQixDQUFDO01BQUUsTUFBTSxFQUFFLFFBQVE7TUFBRSxjQUFjLEVBQUU7SUFBeUI7RUFBRTtBQUFFLENBQUMsRUFDamU7RUFBRSxNQUFNLEVBQUU7SUFBRSxPQUFPLEVBQUUsQ0FBQztJQUFFLGFBQWEsRUFBRSxzQkFBc0I7SUFBRSxJQUFJLEVBQUUsT0FBTztJQUFFLFlBQVksRUFBRSxDQUFDO0lBQUUsTUFBTSxFQUFFLEtBQUs7SUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSztFQUFFLENBQUM7RUFBRSxNQUFNLEVBQUU7SUFBRSxhQUFhLEVBQUUsUUFBUTtJQUFFLFFBQVEsRUFBRTtNQUFFLE9BQU8sRUFBRSxRQUFRO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLEtBQUssRUFBRSxnQkFBZ0I7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsUUFBUSxFQUFFLHFDQUFxQztNQUFFLGdCQUFnQixFQUFFO1FBQUUsY0FBYyxFQUFFO01BQWlCLENBQUM7TUFBRSxNQUFNLEVBQUUsUUFBUTtNQUFFLGNBQWMsRUFBRTtJQUF5QjtFQUFFO0FBQUUsQ0FBQyxFQUM3ZDtFQUFFLE1BQU0sRUFBRTtJQUFFLE9BQU8sRUFBRSxDQUFDO0lBQUUsYUFBYSxFQUFFLGdCQUFnQjtJQUFFLElBQUksRUFBRSxPQUFPO0lBQUUsWUFBWSxFQUFFLENBQUM7SUFBRSxNQUFNLEVBQUUsS0FBSztJQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsWUFBWTtFQUFFLENBQUM7RUFBRSxNQUFNLEVBQUU7SUFBRSxhQUFhLEVBQUUsUUFBUTtJQUFFLFFBQVEsRUFBRTtNQUFFLE9BQU8sRUFBRSxRQUFRO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLEtBQUssRUFBRSxnQkFBZ0I7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsUUFBUSxFQUFFLHdCQUF3QjtNQUFFLGdCQUFnQixFQUFFO1FBQUUsY0FBYyxFQUFFO01BQWlCLENBQUM7TUFBRSxNQUFNLEVBQUUsUUFBUTtNQUFFLGNBQWMsRUFBRTtJQUF5QjtFQUFFO0FBQUUsQ0FBQyxFQUN4ZDtFQUFFLE1BQU0sRUFBRTtJQUFFLE9BQU8sRUFBRSxDQUFDO0lBQUUsYUFBYSxFQUFFLGdCQUFnQjtJQUFFLElBQUksRUFBRSxPQUFPO0lBQUUsWUFBWSxFQUFFLENBQUM7SUFBRSxNQUFNLEVBQUUsS0FBSztJQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsWUFBWTtFQUFFLENBQUM7RUFBRSxNQUFNLEVBQUU7SUFBRSxhQUFhLEVBQUUsUUFBUTtJQUFFLFFBQVEsRUFBRTtNQUFFLE9BQU8sRUFBRSxRQUFRO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLEtBQUssRUFBRSxnQkFBZ0I7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsUUFBUSxFQUFFLHlCQUF5QjtNQUFFLGdCQUFnQixFQUFFO1FBQUUsY0FBYyxFQUFFO01BQWlCLENBQUM7TUFBRSxNQUFNLEVBQUUsUUFBUTtNQUFFLGNBQWMsRUFBRTtJQUF5QjtFQUFFO0FBQUUsQ0FBQyxFQUN6ZDtFQUFFLE1BQU0sRUFBRTtJQUFFLE9BQU8sRUFBRSxDQUFDO0lBQUUsYUFBYSxFQUFFLDBEQUEwRDtJQUFFLElBQUksRUFBRSxPQUFPO0lBQUUsWUFBWSxFQUFFLENBQUM7SUFBRSxNQUFNLEVBQUUsS0FBSztJQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUztFQUFFLENBQUM7RUFBRSxNQUFNLEVBQUU7SUFBRSxhQUFhLEVBQUUsUUFBUTtJQUFFLFFBQVEsRUFBRTtNQUFFLE9BQU8sRUFBRSxRQUFRO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLEtBQUssRUFBRSxnQkFBZ0I7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsUUFBUSxFQUFFLHlDQUF5QztNQUFFLGdCQUFnQixFQUFFO1FBQUUsY0FBYyxFQUFFO01BQWlCLENBQUM7TUFBRSxNQUFNLEVBQUUsUUFBUTtNQUFFLGNBQWMsRUFBRTtJQUF5QjtFQUFFO0FBQUUsQ0FBQyxFQUNoaEI7RUFBRSxNQUFNLEVBQUU7SUFBRSxPQUFPLEVBQUUsQ0FBQztJQUFFLGFBQWEsRUFBRSxzQkFBc0I7SUFBRSxJQUFJLEVBQUUsT0FBTztJQUFFLFlBQVksRUFBRSxDQUFDO0lBQUUsTUFBTSxFQUFFLEtBQUs7SUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFNBQVM7RUFBRSxDQUFDO0VBQUUsTUFBTSxFQUFFO0lBQUUsYUFBYSxFQUFFLFFBQVE7SUFBRSxRQUFRLEVBQUU7TUFBRSxPQUFPLEVBQUUsUUFBUTtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxLQUFLLEVBQUUsZ0JBQWdCO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLFFBQVEsRUFBRSwwQ0FBMEM7TUFBRSxnQkFBZ0IsRUFBRTtRQUFFLGNBQWMsRUFBRTtNQUFpQixDQUFDO01BQUUsTUFBTSxFQUFFLFFBQVE7TUFBRSxjQUFjLEVBQUU7SUFBeUI7RUFBRTtBQUFFLENBQUMsRUFDN2U7RUFBRSxNQUFNLEVBQUU7SUFBRSxPQUFPLEVBQUUsQ0FBQztJQUFFLGFBQWEsRUFBRSxzQkFBc0I7SUFBRSxJQUFJLEVBQUUsT0FBTztJQUFFLFlBQVksRUFBRSxDQUFDO0lBQUUsTUFBTSxFQUFFLEtBQUs7SUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFNBQVM7RUFBRSxDQUFDO0VBQUUsTUFBTSxFQUFFO0lBQUUsYUFBYSxFQUFFLFFBQVE7SUFBRSxRQUFRLEVBQUU7TUFBRSxPQUFPLEVBQUUsUUFBUTtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxLQUFLLEVBQUUsZ0JBQWdCO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLFFBQVEsRUFBRSxrREFBa0Q7TUFBRSxnQkFBZ0IsRUFBRTtRQUFFLGNBQWMsRUFBRTtNQUFpQixDQUFDO01BQUUsTUFBTSxFQUFFLFFBQVE7TUFBRSxjQUFjLEVBQUU7SUFBeUI7RUFBRTtBQUFFLENBQUMsRUFDcmY7RUFBRSxNQUFNLEVBQUU7SUFBRSxPQUFPLEVBQUUsQ0FBQztJQUFFLGFBQWEsRUFBRSxzQkFBc0I7SUFBRSxJQUFJLEVBQUUsT0FBTztJQUFFLFlBQVksRUFBRSxDQUFDO0lBQUUsTUFBTSxFQUFFLEtBQUs7SUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFNBQVM7RUFBRSxDQUFDO0VBQUUsTUFBTSxFQUFFO0lBQUUsYUFBYSxFQUFFLFFBQVE7SUFBRSxRQUFRLEVBQUU7TUFBRSxPQUFPLEVBQUUsUUFBUTtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxLQUFLLEVBQUUsZ0JBQWdCO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLFFBQVEsRUFBRSxtREFBbUQ7TUFBRSxnQkFBZ0IsRUFBRTtRQUFFLGNBQWMsRUFBRTtNQUFpQixDQUFDO01BQUUsTUFBTSxFQUFFLFFBQVE7TUFBRSxjQUFjLEVBQUU7SUFBeUI7RUFBRTtBQUFFLENBQUMsRUFDdGY7RUFBRSxNQUFNLEVBQUU7SUFBRSxPQUFPLEVBQUUsQ0FBQztJQUFFLGFBQWEsRUFBRSw2REFBNkQ7SUFBRSxJQUFJLEVBQUUsT0FBTztJQUFFLFlBQVksRUFBRSxDQUFDO0lBQUUsTUFBTSxFQUFFLEtBQUs7SUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFNBQVM7RUFBRSxDQUFDO0VBQUUsTUFBTSxFQUFFO0lBQUUsYUFBYSxFQUFFLFFBQVE7SUFBRSxRQUFRLEVBQUU7TUFBRSxPQUFPLEVBQUUsUUFBUTtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxLQUFLLEVBQUUsZ0JBQWdCO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLFFBQVEsRUFBRSw0Q0FBNEM7TUFBRSxnQkFBZ0IsRUFBRTtRQUFFLGNBQWMsRUFBRTtNQUFpQixDQUFDO01BQUUsTUFBTSxFQUFFLFFBQVE7TUFBRSxjQUFjLEVBQUU7SUFBeUI7RUFBRTtBQUFFLENBQUMsRUFDdGhCO0VBQUUsTUFBTSxFQUFFO0lBQUUsT0FBTyxFQUFFLENBQUM7SUFBRSxhQUFhLEVBQUUsOERBQThEO0lBQUUsSUFBSSxFQUFFLE9BQU87SUFBRSxZQUFZLEVBQUUsQ0FBQztJQUFFLE1BQU0sRUFBRSxLQUFLO0lBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTO0VBQUUsQ0FBQztFQUFFLE1BQU0sRUFBRTtJQUFFLGFBQWEsRUFBRSxRQUFRO0lBQUUsUUFBUSxFQUFFO01BQUUsT0FBTyxFQUFFLFFBQVE7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsS0FBSyxFQUFFLGdCQUFnQjtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxRQUFRLEVBQUUsNkNBQTZDO01BQUUsZ0JBQWdCLEVBQUU7UUFBRSxjQUFjLEVBQUU7TUFBaUIsQ0FBQztNQUFFLE1BQU0sRUFBRSxRQUFRO01BQUUsY0FBYyxFQUFFO0lBQXlCO0VBQUU7QUFBRSxDQUFDLEVBQ3hoQjtFQUFFLE1BQU0sRUFBRTtJQUFFLE9BQU8sRUFBRSxFQUFFO0lBQUUsYUFBYSxFQUFFLGlEQUFpRDtJQUFFLElBQUksRUFBRSxPQUFPO0lBQUUsWUFBWSxFQUFFLENBQUM7SUFBRSxNQUFNLEVBQUUsSUFBSTtJQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUscUNBQXFDO0VBQUUsQ0FBQztFQUFFLE1BQU0sRUFBRTtJQUFFLGFBQWEsRUFBRSxRQUFRO0lBQUUsUUFBUSxFQUFFO01BQUUsT0FBTyxFQUFFLFFBQVE7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsS0FBSyxFQUFFLGdCQUFnQjtNQUFFLE1BQU0sRUFBRSw2QkFBNkI7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsUUFBUSxFQUFFLHlDQUF5QztNQUFFLGdCQUFnQixFQUFFO1FBQUUsY0FBYyxFQUFFO01BQWlCLENBQUM7TUFBRSxNQUFNLEVBQUUsUUFBUTtNQUFFLGNBQWMsRUFBRTtJQUF5QjtFQUFFO0FBQUUsQ0FBQyxFQUMxa0I7RUFBRSxNQUFNLEVBQUU7SUFBRSxPQUFPLEVBQUUsQ0FBQztJQUFFLGFBQWEsRUFBRSxxQkFBcUI7SUFBRSxJQUFJLEVBQUUsT0FBTztJQUFFLFlBQVksRUFBRSxDQUFDO0lBQUUsTUFBTSxFQUFFLEtBQUs7SUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFVBQVU7RUFBRSxDQUFDO0VBQUUsTUFBTSxFQUFFO0lBQUUsYUFBYSxFQUFFLFFBQVE7SUFBRSxRQUFRLEVBQUU7TUFBRSxPQUFPLEVBQUUsUUFBUTtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxZQUFZLEVBQUUsUUFBUTtNQUFFLEtBQUssRUFBRSxnQkFBZ0I7TUFBRSxNQUFNLEVBQUUsNkJBQTZCO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLFFBQVEsRUFBRSxhQUFhO01BQUUsZ0JBQWdCLEVBQUU7UUFBRSxjQUFjLEVBQUU7TUFBaUIsQ0FBQztNQUFFLGNBQWMsRUFBRTtJQUF5QjtFQUFFO0FBQUUsQ0FBQyxFQUM3ZjtFQUFFLE1BQU0sRUFBRTtJQUFFLE9BQU8sRUFBRSxDQUFDO0lBQUUsYUFBYSxFQUFFLG1CQUFtQjtJQUFFLElBQUksRUFBRSxPQUFPO0lBQUUsWUFBWSxFQUFFLENBQUM7SUFBRSxNQUFNLEVBQUUsS0FBSztJQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUztFQUFFLENBQUM7RUFBRSxNQUFNLEVBQUU7SUFBRSxhQUFhLEVBQUUsUUFBUTtJQUFFLFFBQVEsRUFBRTtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxLQUFLLEVBQUUsZ0JBQWdCO01BQUUsTUFBTSxFQUFFLDZCQUE2QjtNQUFFLFFBQVEsRUFBRSxXQUFXO01BQUUseUJBQXlCLEVBQUUsTUFBTTtNQUFFLG9CQUFvQixFQUFFLEdBQUc7TUFBRSxZQUFZLEVBQUUsNkJBQTZCO01BQUUsbUJBQW1CLEVBQUU7SUFBTztFQUFFO0FBQUUsQ0FBQyxFQUM3YztFQUFFLE1BQU0sRUFBRTtJQUFFLE9BQU8sRUFBRSxDQUFDO0lBQUUsYUFBYSxFQUFFLG1CQUFtQjtJQUFFLElBQUksRUFBRSxPQUFPO0lBQUUsWUFBWSxFQUFFLENBQUM7SUFBRSxNQUFNLEVBQUUsS0FBSztJQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUztFQUFFLENBQUM7RUFBRSxNQUFNLEVBQUU7SUFBRSxhQUFhLEVBQUUsUUFBUTtJQUFFLFFBQVEsRUFBRTtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxLQUFLLEVBQUUsZ0JBQWdCO01BQUUsTUFBTSxFQUFFLDZCQUE2QjtNQUFFLFFBQVEsRUFBRSxXQUFXO01BQUUseUJBQXlCLEVBQUUsTUFBTTtNQUFFLG9CQUFvQixFQUFFLEdBQUc7TUFBRSxZQUFZLEVBQUUsNkJBQTZCO01BQUUsbUJBQW1CLEVBQUU7SUFBTztFQUFFO0FBQUUsQ0FBQyxFQUM3YztFQUFFLE1BQU0sRUFBRTtJQUFFLE9BQU8sRUFBRSxDQUFDO0lBQUUsYUFBYSxFQUFFLG1CQUFtQjtJQUFFLElBQUksRUFBRSxPQUFPO0lBQUUsWUFBWSxFQUFFLENBQUM7SUFBRSxNQUFNLEVBQUUsS0FBSztJQUFFLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUztFQUFFLENBQUM7RUFBRSxNQUFNLEVBQUU7SUFBRSxhQUFhLEVBQUUsUUFBUTtJQUFFLFFBQVEsRUFBRTtNQUFFLFlBQVksRUFBRSxzQkFBc0I7TUFBRSxLQUFLLEVBQUUsZ0JBQWdCO01BQUUsTUFBTSxFQUFFLDZCQUE2QjtNQUFFLGdCQUFnQixFQUFFO1FBQUUsY0FBYyxFQUFFO01BQWlCLENBQUM7TUFBRSxRQUFRLEVBQUUsV0FBVztNQUFFLHlCQUF5QixFQUFFLE1BQU07TUFBRSxvQkFBb0IsRUFBRSxHQUFHO01BQUUsWUFBWSxFQUFFLDZCQUE2QjtNQUFFLG1CQUFtQixFQUFFO0lBQU87RUFBRTtBQUFFLENBQUMsRUFDcmdCO0VBQUUsTUFBTSxFQUFFO0lBQUUsT0FBTyxFQUFFLENBQUM7SUFBRSxhQUFhLEVBQUUsbUJBQW1CO0lBQUUsSUFBSSxFQUFFLE9BQU87SUFBRSxZQUFZLEVBQUUsQ0FBQztJQUFFLE1BQU0sRUFBRSxLQUFLO0lBQUUsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTO0VBQUUsQ0FBQztFQUFFLE1BQU0sRUFBRTtJQUFFLGFBQWEsRUFBRSxRQUFRO0lBQUUsUUFBUSxFQUFFO01BQUUsWUFBWSxFQUFFLHNCQUFzQjtNQUFFLEtBQUssRUFBRSxnQkFBZ0I7TUFBRSxNQUFNLEVBQUUsNkJBQTZCO01BQUUsZ0JBQWdCLEVBQUU7UUFBRSxjQUFjLEVBQUU7TUFBaUIsQ0FBQztNQUFFLFFBQVEsRUFBRSxXQUFXO01BQUUseUJBQXlCLEVBQUUsTUFBTTtNQUFFLG9CQUFvQixFQUFFLEdBQUc7TUFBRSxZQUFZLEVBQUUsNkJBQTZCO01BQUUsbUJBQW1CLEVBQUU7SUFBTztFQUFFO0FBQUUsQ0FBQyxFQUNyZ0I7RUFBRSxNQUFNLEVBQUU7SUFBRSxPQUFPLEVBQUUsQ0FBQztJQUFFLGFBQWEsRUFBRSxtQkFBbUI7SUFBRSxJQUFJLEVBQUUsT0FBTztJQUFFLFlBQVksRUFBRSxDQUFDO0lBQUUsTUFBTSxFQUFFLEtBQUs7SUFBRSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFNBQVM7RUFBRSxDQUFDO0VBQUUsTUFBTSxFQUFFO0lBQUUsYUFBYSxFQUFFLFFBQVE7SUFBRSxRQUFRLEVBQUU7TUFBRSxZQUFZLEVBQUUsc0JBQXNCO01BQUUsS0FBSyxFQUFFLGdCQUFnQjtNQUFFLE1BQU0sRUFBRSw2QkFBNkI7TUFBRSxnQkFBZ0IsRUFBRTtRQUFFLGNBQWMsRUFBRTtNQUFpQixDQUFDO01BQUUsUUFBUSxFQUFFLFdBQVc7TUFBRSx5QkFBeUIsRUFBRSxNQUFNO01BQUUsb0JBQW9CLEVBQUUsR0FBRztNQUFFLFlBQVksRUFBRSw2QkFBNkI7TUFBRSxtQkFBbUIsRUFBRTtJQUFPO0VBQUU7QUFBRSxDQUFDLENBQ3RnQiJ9