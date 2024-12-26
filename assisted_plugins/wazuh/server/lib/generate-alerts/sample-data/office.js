"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.officeRules = exports.arrayUuidOffice = exports.arrayUserId = exports.arrayTargetOffice = exports.arrayOfficeGroups = exports.arrayLogs = exports.arrayLocationOffice = exports.arrayIp = exports.arrayExtendedPropertiesOffice = exports.arrayDevicePropertiesOffice = exports.arrayDecoderOffice = exports.arrayActorOffice = void 0;
/*
 * Wazuh app - Office365 sample data
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

const arrayOfficeGroups = exports.arrayOfficeGroups = ['office365', 'AzureActiveDirectoryStsLogon'];
const arrayLocationOffice = exports.arrayLocationOffice = 'office365';
const arrayDecoderOffice = exports.arrayDecoderOffice = [{
  name: 'json'
}];
const arrayUuidOffice = exports.arrayUuidOffice = ['a8080009-aa85-4d65-a0f0-74fe0331edce', '4e93c8e3-52c1-4a4e-ab69-9e61ccf6cd00', 'd14aa5cb-b070-42f8-8709-0f8afd942fc0', '92a7e893-0f4a-4635-af0d-83891d4ff9c0', 'ce013f05-a783-4186-9d85-5a14998b6111', '4f686e03-7cf6-44a8-9212-b8a91b128082', 'cc58e817-c6d3-4457-b011-54e881e230ec', '825f9d6e-12c0-4b59-807d-1b41c6e48a3a', 'd36253fb-24a1-481c-a199-f778534ccb5f', '9083369e-679b-4e8b-9249-323a51d5bf9c', '6d872bf8-e462-4de8-9e16-c36761050fb7', 'b9a73c0f-55f2-4e95-9626-1c264d02eac3', 'bbab91ad-bc8a-4c86-9010-3c84b39fde0d', 'b5359092-dad2-4060-b93d-3791e4da0dec', 'e8493b26-c1f9-42eb-9756-dfd363149852', 'ca2044fc-32ca-478b-8b0d-ff6fdd3b1e5a', 'a0995136-91d8-4acf-8449-28c275ffb7e3', 'c3482b5d-b1a9-4f44-8df0-a601e18cf5c3', '49fd4642-cfe5-4170-9488-25d847e3579f', '29f96271-5c1b-47ec-9652-a41d5cb17cb4'];
const arrayDevicePropertiesOffice = exports.arrayDevicePropertiesOffice = [{
  Name: 'BrowserType',
  Value: 'Chrome'
}, {
  Name: 'IsCompliantAndManaged',
  Value: 'False'
}, {
  Name: 'SessionId',
  Value: '2a1fb8c4-ceb6-4fa0-826c-3d43f87de897'
}];
const arrayIp = exports.arrayIp = ['77.231.182.17', '172.217.204.94', '108.177.13.101', '13.226.52.66', '13.226.52.2', '13.226.52.104', '13.226.52.89', '140.82.113.3'];
const arrayUserId = exports.arrayUserId = ['smith@wazuh.com', 'williams@wazuh.com', 'frank@wazuh.com', 'jones@wazuh.com', 'brown@wazuh.com'];
const arrayTargetOffice = exports.arrayTargetOffice = [{
  ID: '797f4846-ba00-4fd7-ba43-dac1f8f63013',
  Type: 0
}];
const arrayActorOffice = exports.arrayActorOffice = [{
  ID: 'a39dd957-d295-4548-b537-2055469bafbb',
  Type: 0
}, {
  ID: 'albe@wazuh.com',
  Type: 5
}];
const arrayExtendedPropertiesOffice = exports.arrayExtendedPropertiesOffice = [{
  Name: 'ResultStatusDetail',
  Value: 'Success'
}, {
  Name: 'UserAgent',
  Value: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36'
}, {
  Name: 'RequestType',
  Value: 'OAuth2:Authorize'
}];
const officeRules = exports.officeRules = {
  1: {
    data: {
      office365: {
        RecordType: 1,
        Subscription: 'Audit.Exchange'
      }
    },
    rule: {
      level: 3,
      description: 'Office 365: Events from the Exchange admin audit log.',
      id: '91533',
      mail: false,
      firedtimes: 3,
      groups: ['office365', 'ExchangeAdmin', 'hipaa_164.312.b', 'pci_dss_10.2.2', 'pci_dss_10.6.1']
    }
  },
  2: {
    data: {
      office365: {
        RecordType: 2,
        Subscription: 'Audit.Exchange'
      }
    },
    rule: {
      level: 3,
      description: 'Office 365: Events from an Exchange mailbox audit log for actions that are performed on a single item, such as creating or receiving an email message.',
      id: '91534',
      mail: false,
      firedtimes: 3,
      groups: ['office365', 'ExchangeItem', 'hipaa_164.312.b', 'pci_dss_10.6.2']
    }
  },
  4: {
    data: {
      office365: {
        RecordType: 4,
        Subscription: 'Audit.SharePoint'
      }
    },
    rule: {
      level: 3,
      description: 'Office 365: SharePoint events.',
      id: '91536',
      mail: false,
      firedtimes: 3,
      groups: ['office365', 'SharePoint', 'hipaa_164.312.b', 'pci_dss_10.6.2']
    }
  },
  6: {
    data: {
      office365: {
        RecordType: 6,
        Subscription: 'Audit.SharePoint'
      }
    },
    rule: {
      level: 3,
      description: 'Office 365: SharePoint file operation events.',
      id: '91537',
      mail: false,
      firedtimes: 3,
      groups: ['office365', 'SharePointFileOperation', 'hipaa_164.312.b', 'hipaa_164.312.c.1', 'pci_dss_10.6.2', 'pci_dss_11.5']
    }
  },
  8: {
    data: {
      office365: {
        RecordType: 8,
        Subscription: 'Audit.AzureActiveDirectory'
      }
    },
    rule: {
      level: 3,
      description: 'Office 365: Azure Active Directory events.',
      id: '91539',
      mail: false,
      firedtimes: 3,
      groups: ['office365', 'AzureActiveDirectory', 'hipaa_164.312.b', 'pci_dss_10.6.2']
    }
  },
  14: {
    data: {
      office365: {
        RecordType: 14,
        Subscription: 'Audit.SharePoint'
      }
    },
    rule: {
      level: 3,
      description: 'Office 365: SharePoint sharing events.',
      id: '91544',
      mail: false,
      firedtimes: 3,
      groups: ['office365', 'SharePoint', 'hipaa_164.312.b', 'pci_dss_10.6.2']
    }
  },
  15: {
    data: {
      office365: {
        RecordType: 15,
        Subscription: 'Audit.AzureActiveDirectory'
      }
    },
    rule: {
      level: 3,
      description: 'Office 365: Secure Token Service (STS) logon events in Azure Active Directory.',
      id: '91545',
      mail: false,
      firedtimes: 3,
      groups: ['office365', 'AzureActiveDirectoryStsLogon', 'hipaa_164.312.a.2.I,hipaa_164.312.b', 'hipaa_164.312.d', 'hipaa_164.312.e.2.II', 'pci_dss_8.3,pci_dss_10.6.1']
    }
  },
  18: {
    data: {
      office365: {
        RecordType: 18,
        Subscription: 'Audit.General'
      }
    },
    rule: {
      level: 5,
      description: 'Office 365: Admin actions from the Security and Compliance Center.',
      id: '91548',
      mail: false,
      firedtimes: 3,
      groups: ['office365', 'SecurityComplianceCenterEOPCmdlet', 'hipaa_164.312.b', 'pci_dss_10.2.2', 'pci_dss_10.6.1']
    }
  },
  36: {
    data: {
      office365: {
        RecordType: 36,
        Subscription: 'Audit.SharePoint'
      }
    },
    rule: {
      level: 3,
      description: 'Office 365: SharePoint List events.',
      id: '91564',
      mail: false,
      firedtimes: 3,
      groups: ['office365', 'SharePointListOperation', 'hipaa_164.312.b', 'pci_dss_10.6.2']
    }
  },
  52: {
    data: {
      office365: {
        RecordType: 52,
        Subscription: 'Audit.General'
      }
    },
    rule: {
      level: 3,
      description: 'Office 365: Data Insights REST API events.',
      id: '91580',
      mail: false,
      firedtimes: 4,
      groups: ['office365', 'DataInsightsRestApiAudit', 'hipaa_164.312.b', 'pci_dss_10.6.2']
    }
  }
};
const arrayLogs = exports.arrayLogs = [{
  Id: '35ab8b89-cfea-4214-5249-08d91a06e537',
  Operation: 'SearchDataInsightsSubscription',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 52,
  UserKey: 'fake@email.not',
  UserType: 5,
  Version: 1,
  Workload: 'SecurityComplianceCenter',
  UserId: 'fake@email.not',
  AadAppId: '80ccca67-54bd-44ab-8625-4b79c4dc7775',
  DataType: 'DataInsightsSubscription',
  DatabaseType: 'Directory',
  RelativeUrl: '/DataInsights/DataInsightsService.svc/Find/DataInsightsSubscription?tenantid=0fea4e03-8146-453b-b889-54b4bd11565b',
  ResultCount: '1'
}, {
  Id: '27ee2e95-6f55-4723-f91d-08d91a26b9a4',
  Operation: 'SearchAlert',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 52,
  UserKey: '910ed5ca-4ecf-414c-a1be-d53511bfe1a5',
  UserType: 0,
  Version: 1,
  Workload: 'SecurityComplianceCenter',
  UserId: '910ed5ca-4ecf-414c-a1be-d53511bfe1a5',
  AadAppId: 'fc780465-2017-40d4-a0c5-307022471b92',
  DataType: 'Alert',
  DatabaseType: 'DataInsights',
  RelativeUrl: '/DataInsights/DataInsightsService.svc/Find/Alert?tenantid=0fea4e03-8146-453b-b889-54b4bd11565b&PageSize=100&Filter=StartDate+eq+2021-04-18T17%3a59%3a40.8820655Z+and+EndDate+eq+2021-05-18T17%3a59%3a40.8820655Z+and+AlertCategory+any+1%2c3%2c7%2c5%2c4+and+AlertSource+eq+%27Office+365+Security+%26+Compliance%27',
  ResultCount: '0'
}, {
  CreationTime: '2021-05-18T17:59:52',
  Id: '7d3a9d35-6c04-4f02-e8fe-08d91a26bc79',
  Operation: 'SearchAlertAggregate',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 52,
  UserKey: '910ed5ca-4ecf-414c-a1be-d53511bfe1a5',
  UserType: 0,
  Version: 1,
  Workload: 'SecurityComplianceCenter',
  UserId: '910ed5ca-4ecf-414c-a1be-d53511bfe1a5',
  AadAppId: 'fc780465-2017-40d4-a0c5-307022471b92',
  DataType: 'AlertAggregate',
  DatabaseType: 'DataInsights',
  RelativeUrl: '/DataInsights/DataInsightsService.svc/Find/AlertAggregate?tenantid=0fea4e03-8146-453b-b889-54b4bd11565b&PageSize=540&Filter=StartDate+eq+2021-04-18T17%3a59%3a48.3504050Z+and+EndDate+eq+2021-05-18T17%3a59%3a48.3504050Z+and+AlertCategory+any+1%2c3%2c7%2c5%2c4+and+AlertSource+eq+%27Office+365+Security+%26+Compliance%27',
  ResultCount: '0'
}, {
  CreationTime: '2021-05-18T17:59:46',
  Id: 'eb9775cb-59f7-42ea-3ee0-08d91a26b92b',
  Operation: 'ValidaterbacAccessCheck',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 52,
  UserKey: 'fake@email.not',
  UserType: 5,
  Version: 1,
  Workload: 'SecurityComplianceCenter',
  UserId: 'fake@email.not',
  AadAppId: 'd6fdaa33-e821-4211-83d0-cf74736489e1',
  DataType: 'rbacAccessCheck',
  RelativeUrl: '/DataInsights/DataInsightsService.svc/validate/rbacAccessCheck?tenantid=0fea4e03-8146-453b-b889-54b4bd11565b',
  ResultCount: '0'
}, {
  CreationTime: '2021-05-18T14:12:53',
  Id: 'c0eada1b-52b2-450d-84df-6d461420d621',
  Operation: 'Get-RetentionCompliancePolicy',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 18,
  ResultStatus: 'Success',
  UserKey: 'fake@email.not',
  UserType: 2,
  Version: 1,
  Workload: 'SecurityComplianceCenter',
  ObjectId: '',
  UserId: 'fake@email.not',
  SecurityComplianceCenterEventType: 0,
  ClientApplication: 'EMC',
  CmdletVersion: '...',
  EffectiveOrganization: 'wazuh.testytest.com',
  NonPIIParameters: '',
  Parameters: '',
  StartTime: '2021-05-18T14:12:53',
  UserServicePlan: ''
}, {
  CreationTime: '2021-05-18T15:52:26',
  Id: '45a0d7c4-de73-466a-8e6c-c25f9c035714',
  Operation: 'Get-SupervisoryReviewPolicyV2',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 18,
  ResultStatus: 'Success',
  UserKey: 'fake@email.not',
  UserType: 2,
  Version: 1,
  Workload: 'SecurityComplianceCenter',
  ObjectId: '',
  UserId: 'fake@email.not',
  SecurityComplianceCenterEventType: 0,
  ClientApplication: 'EMC',
  CmdletVersion: '...',
  EffectiveOrganization: 'wazuh.testytest.com',
  NonPIIParameters: '',
  Parameters: '',
  StartTime: '2021-05-18T15:52:26',
  UserServicePlan: ''
}, {
  CreationTime: '2021-05-18T15:52:31',
  Id: 'f9912868-b431-435c-8337-0fc3b4370815',
  Operation: 'Get-SupervisoryReviewReport',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 18,
  ResultStatus: 'Success',
  UserKey: 'fake@email.not',
  UserType: 2,
  Version: 1,
  Workload: 'SecurityComplianceCenter',
  ObjectId: '',
  UserId: 'fake@email.not',
  SecurityComplianceCenterEventType: 0,
  ClientApplication: 'EMC',
  CmdletVersion: '...',
  EffectiveOrganization: 'wazuh.testytest.com',
  NonPIIParameters: '-StartDate "<SNIP-PII>" -EndDate "<SNIP-PII>" -PageSize "<SNIP-PII>" -Page "<SNIP-PII>"',
  Parameters: '-StartDate "5/12/2021 12:00:00 AM" -EndDate "5/18/2021 11:59:59 PM" -PageSize "300" -Page "1"',
  StartTime: '2021-05-18T15:52:31',
  UserServicePlan: ''
}, {
  CreationTime: '2021-05-18T15:52:30',
  Id: 'dcecd87a-3061-4dea-9bff-4fbfc23ca328',
  Operation: 'Get-SupervisoryReviewOverallProgressReport',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 18,
  ResultStatus: 'Success',
  UserKey: 'fake@email.not',
  UserType: 2,
  Version: 1,
  Workload: 'SecurityComplianceCenter',
  ObjectId: '',
  UserId: 'fake@email.not',
  SecurityComplianceCenterEventType: 0,
  ClientApplication: 'EMC',
  CmdletVersion: '...',
  EffectiveOrganization: 'wazuh.testytest.com',
  NonPIIParameters: '',
  Parameters: '',
  StartTime: '2021-05-18T15:52:30',
  UserServicePlan: ''
}, {
  CreationTime: '2021-05-18T15:52:30',
  Id: '5641d062-f279-4ca4-9577-50d7ecbfeedb',
  Operation: 'Get-SupervisoryReviewTopCasesReport',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 18,
  ResultStatus: 'Success',
  UserKey: 'fake@email.not',
  UserType: 2,
  Version: 1,
  Workload: 'SecurityComplianceCenter',
  ObjectId: '',
  UserId: 'fake@email.not',
  SecurityComplianceCenterEventType: 0,
  ClientApplication: 'EMC',
  CmdletVersion: '...',
  EffectiveOrganization: 'wazuh.testytest.com',
  NonPIIParameters: '',
  Parameters: '',
  StartTime: '2021-05-18T15:52:30',
  UserServicePlan: ''
}, {
  CreationTime: '2021-05-18T17:50:15',
  Id: '8c7c9f81-68e9-452b-a22d-1333eb9cd647',
  Operation: 'Get-ComplianceSearchAction',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 18,
  ResultStatus: 'Success',
  UserKey: 'fake@email.not',
  UserType: 2,
  Version: 1,
  Workload: 'SecurityComplianceCenter',
  ObjectId: '',
  UserId: 'fake@email.not',
  SecurityComplianceCenterEventType: 0,
  ClientApplication: 'EMC',
  CmdletVersion: '...',
  EffectiveOrganization: 'wazuh.testytest.com',
  NonPIIParameters: '-Export "<SNIP-PII>"',
  Parameters: '-Export "True"',
  StartTime: '2021-05-18T17:50:15',
  UserServicePlan: ''
}, {
  CreationTime: '2021-05-18T17:50:12',
  Id: '4692201f-8101-455e-b89d-6727ef75c223',
  Operation: 'Get-ComplianceTag',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 18,
  ResultStatus: 'Success',
  UserKey: 'fake@email.not',
  UserType: 2,
  Version: 1,
  Workload: 'SecurityComplianceCenter',
  ObjectId: '',
  UserId: 'fake@email.not',
  SecurityComplianceCenterEventType: 0,
  ClientApplication: 'EMC',
  CmdletVersion: '...',
  EffectiveOrganization: 'wazuh.testytest.com',
  NonPIIParameters: '-IncludingLabelState "<SNIP-PII>"',
  Parameters: '-IncludingLabelState "True"',
  StartTime: '2021-05-18T17:50:12',
  UserServicePlan: ''
}, {
  CreationTime: '2021-05-18T17:50:12',
  Id: '7d41f1f2-587c-492f-b6ff-2f9d1a519c60',
  Operation: 'Get-ComplianceSearch',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 18,
  ResultStatus: 'Success',
  UserKey: 'fake@email.not',
  UserType: 2,
  Version: 1,
  Workload: 'SecurityComplianceCenter',
  ObjectId: '',
  UserId: 'fake@email.not',
  SecurityComplianceCenterEventType: 0,
  ClientApplication: 'EMC',
  CmdletVersion: '...',
  EffectiveOrganization: 'wazuh.testytest.com',
  NonPIIParameters: '-ResultSize "Unlimited"',
  Parameters: '-ResultSize "Unlimited"',
  StartTime: '2021-05-18T17:50:12',
  UserServicePlan: ''
}, {
  CreationTime: '2021-05-18T17:59:45',
  Id: 'ebcfc2bf-8799-413c-add4-6c2b53cb68e7',
  Operation: 'Get-DlpSensitiveInformationType',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 18,
  ResultStatus: 'Success',
  UserKey: 'fake@email.not',
  UserType: 0,
  Version: 1,
  Workload: 'SecurityComplianceCenter',
  ObjectId: '',
  UserId: 'fake@email.not',
  SecurityComplianceCenterEventType: 0,
  ClientApplication: '',
  CmdletVersion: '...',
  EffectiveOrganization: 'wazuh.testytest.com',
  NonPIIParameters: '-Organization "0fea4e03-8146-453b-b889-54b4bd11565b"',
  Parameters: '-Organization "0fea4e03-8146-453b-b889-54b4bd11565b"',
  StartTime: '2021-05-18T17:59:45',
  UserServicePlan: ''
}, {
  CreationTime: '2021-05-18T14:11:41',
  Id: '7aeca226-b3e7-4033-9a7f-d067622e8d00',
  Operation: 'UserLoggedIn',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 15,
  ResultStatus: 'Success',
  UserKey: '910ed5ca-4ecf-414c-a1be-d53511bfe1a5',
  UserType: 0,
  Version: 1,
  Workload: 'AzureActiveDirectory',
  ClientIP: '190.16.9.176',
  ObjectId: '5f09333a-842c-47da-a157-57da27fcbca5',
  UserId: 'fake@email.not',
  AzureActiveDirectoryEventType: 1,
  ExtendedProperties: [{
    Name: 'ResultStatusDetail',
    Value: 'Redirect'
  }, {
    Name: 'UserAgent',
    Value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36'
  }, {
    Name: 'RequestType',
    Value: 'OAuth2:Authorize'
  }],
  ModifiedProperties: [],
  Actor: [{
    ID: '910ed5ca-4ecf-414c-a1be-d53511bfe1a5',
    Type: 0
  }, {
    ID: 'fake@email.not',
    Type: 5
  }],
  ActorContextId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  ActorIpAddress: '190.16.9.176',
  InterSystemsId: 'a3798792-fef1-4b53-bd44-bbbd94cf0e5c',
  IntraSystemId: '7aeca226-b3e7-4033-9a7f-d067622e8d00',
  SupportTicketId: '',
  Target: [{
    ID: '5f09333a-842c-47da-a157-57da27fcbca5',
    Type: 0
  }],
  TargetContextId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  ApplicationId: '89bee1f7-5e6e-4d8a-9f3d-ecd601259da7',
  DeviceProperties: [{
    Name: 'OS',
    Value: 'Windows 10'
  }, {
    Name: 'BrowserType',
    Value: 'Chrome'
  }, {
    Name: 'IsCompliantAndManaged',
    Value: 'False'
  }, {
    Name: 'SessionId',
    Value: '714c4935-a22d-400d-8563-fbbd8bfc2301'
  }],
  ErrorNumber: '0'
}, {
  CreationTime: '2021-05-18T17:49:11',
  Id: '4e621563-394f-42a9-8a8a-8549e1ffa771',
  Operation: 'Add service principal.',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 8,
  ResultStatus: 'Success',
  UserKey: 'Not Available',
  UserType: 4,
  Version: 1,
  Workload: 'AzureActiveDirectory',
  ObjectId: 'f738ef14-47dc-4564-b53b-45069484ccc7',
  UserId: 'ServicePrincipal_4bf80788-0ec4-481a-ae7b-b71647bf3b57',
  AzureActiveDirectoryEventType: 1,
  ExtendedProperties: [{
    Name: 'additionalDetails',
    Value: '{}'
  }, {
    Name: 'extendedAuditEventCategory',
    Value: 'ServicePrincipal'
  }],
  ModifiedProperties: [{
    Name: 'AccountEnabled',
    NewValue: '[\r\n  true\r\n]',
    OldValue: '[]'
  }, {
    Name: 'AppPrincipalId',
    NewValue: '[\r\n  "f738ef14-47dc-4564-b53b-45069484ccc7"\r\n]',
    OldValue: '[]'
  }, {
    Name: 'DisplayName',
    NewValue: '[\r\n  "Marketplace Api"\r\n]',
    OldValue: '[]'
  }, {
    Name: 'ServicePrincipalName',
    NewValue: '[\r\n  "f738ef14-47dc-4564-b53b-45069484ccc7"\r\n]',
    OldValue: '[]'
  }, {
    Name: 'Credential',
    NewValue: '[\r\n  {\r\n    "CredentialType": 2,\r\n    "KeyStoreId": "291154f0-a9f5-45bb-87be-9c8ee5b6d62c",\r\n    "KeyGroupId": "1c5aa04b-dea5-4284-9908-47edd1e12d13"\r\n  }\r\n]',
    OldValue: '[]'
  }, {
    Name: 'Included Updated Properties',
    NewValue: 'AccountEnabled, AppPrincipalId, DisplayName, ServicePrincipalName, Credential',
    OldValue: ''
  }, {
    Name: 'TargetId.ServicePrincipalNames',
    NewValue: 'f738ef14-47dc-4564-b53b-45069484ccc7',
    OldValue: ''
  }],
  Actor: [{
    ID: 'Windows Azure Service Management API',
    Type: 1
  }, {
    ID: '797f4846-ba00-4fd7-ba43-dac1f8f63013',
    Type: 2
  }, {
    ID: 'ServicePrincipal_4bf80788-0ec4-481a-ae7b-b71647bf3b57',
    Type: 2
  }, {
    ID: '4bf80788-0ec4-481a-ae7b-b71647bf3b57',
    Type: 2
  }, {
    ID: 'ServicePrincipal',
    Type: 2
  }],
  ActorContextId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  InterSystemsId: '9cfba3bb-b478-44aa-a140-465ee7f29274',
  IntraSystemId: '21051805-2413-594a-ab5d-006014005348',
  SupportTicketId: '',
  Target: [{
    ID: 'ServicePrincipal_f6d2eabc-d020-4643-80a8-2b92b163d1de',
    Type: 2
  }, {
    ID: 'f6d2eabc-d020-4643-80a8-2b92b163d1de',
    Type: 2
  }, {
    ID: 'ServicePrincipal',
    Type: 2
  }, {
    ID: 'Marketplace Api',
    Type: 1
  }, {
    ID: 'f738ef14-47dc-4564-b53b-45069484ccc7',
    Type: 2
  }, {
    ID: 'f738ef14-47dc-4564-b53b-45069484ccc7',
    Type: 4
  }],
  TargetContextId: '0fea4e03-8146-453b-b889-54b4bd11565b'
}, {
  CreationTime: '2021-05-18T21:42:25',
  Id: 'af4e552f-0bca-4b02-92c9-4bd430f24f75',
  Operation: 'Change user license.',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 8,
  ResultStatus: 'Success',
  UserKey: '100320014080D3AD@wazuh.com',
  UserType: 0,
  Version: 1,
  Workload: 'AzureActiveDirectory',
  ObjectId: 'fake@email.not',
  UserId: 'fake@email.not',
  AzureActiveDirectoryEventType: 1,
  ExtendedProperties: [{
    Name: 'additionalDetails',
    Value: '{}'
  }, {
    Name: 'extendedAuditEventCategory',
    Value: 'User'
  }],
  ModifiedProperties: [],
  Actor: [{
    ID: 'fake@email.not',
    Type: 5
  }, {
    ID: '100320014080D3AD',
    Type: 3
  }, {
    ID: 'User_910ed5ca-4ecf-414c-a1be-d53511bfe1a5',
    Type: 2
  }, {
    ID: '910ed5ca-4ecf-414c-a1be-d53511bfe1a5',
    Type: 2
  }, {
    ID: 'User',
    Type: 2
  }],
  ActorContextId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  InterSystemsId: '1fd09d6b-54d3-4a58-acfe-71cc2c429d97',
  IntraSystemId: '0a8ae201-e404-4f6f-99db-a3c92a5bd022',
  SupportTicketId: '',
  Target: [{
    ID: 'User_910ed5ca-4ecf-414c-a1be-d53511bfe1a5',
    Type: 2
  }, {
    ID: '910ed5ca-4ecf-414c-a1be-d53511bfe1a5',
    Type: 2
  }, {
    ID: 'User',
    Type: 2
  }, {
    ID: 'fake@email.not',
    Type: 5
  }, {
    ID: '100320014080D3AD',
    Type: 3
  }],
  TargetContextId: '0fea4e03-8146-453b-b889-54b4bd11565b'
}, {
  CreationTime: '2021-05-18T21:42:25',
  Id: 'b27eab84-1ef7-4372-bc68-7213af8ab3fb',
  Operation: 'Update user.',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 8,
  ResultStatus: 'Success',
  UserKey: '100320014080D3AD@wazuh.com',
  UserType: 0,
  Version: 1,
  Workload: 'AzureActiveDirectory',
  ObjectId: 'fake@email.not',
  UserId: 'fake@email.not',
  AzureActiveDirectoryEventType: 1,
  ExtendedProperties: [{
    Name: 'additionalDetails',
    Value: '{"UserType":"Member"}'
  }, {
    Name: 'extendedAuditEventCategory',
    Value: 'User'
  }],
  ModifiedProperties: [{
    Name: 'AssignedLicense',
    NewValue: '[\r\n  "[SkuName=POWER_BI_STANDARD, AccountId=0fea4e03-8146-453b-b889-54b4bd11565b, SkuId=a403ebcc-fae0-4ca2-8c8c-7a907fd6c235, DisabledPlans=[]]"\r\n]',
    OldValue: '[]'
  }, {
    Name: 'AssignedPlan',
    NewValue: '[\r\n  {\r\n    "SubscribedPlanId": "c976d07f-fd0f-49eb-bdc2-26c17481e1c5",\r\n    "ServiceInstance": "AzureAnalysis/SDF",\r\n    "CapabilityStatus": 0,\r\n    "AssignedTimestamp": "2021-05-18T21:42:25.3894164Z",\r\n    "InitialState": null,\r\n    "Capability": null,\r\n    "ServicePlanId": "2049e525-b859-401b-b2a0-e0a31c4b1fe4"\r\n  }\r\n]',
    OldValue: '[]'
  }, {
    Name: 'Included Updated Properties',
    NewValue: 'AssignedLicense, AssignedPlan',
    OldValue: ''
  }, {
    Name: 'TargetId.UserType',
    NewValue: 'Member',
    OldValue: ''
  }],
  Actor: [{
    ID: 'fake@email.not',
    Type: 5
  }, {
    ID: '100320014080D3AD',
    Type: 3
  }, {
    ID: 'User_910ed5ca-4ecf-414c-a1be-d53511bfe1a5',
    Type: 2
  }, {
    ID: '910ed5ca-4ecf-414c-a1be-d53511bfe1a5',
    Type: 2
  }, {
    ID: 'User',
    Type: 2
  }],
  ActorContextId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  InterSystemsId: '1fd09d6b-54d3-4a58-acfe-71cc2c429d97',
  IntraSystemId: '0a8ae201-e404-4f6f-99db-a3c92a5bd022',
  SupportTicketId: '',
  Target: [{
    ID: 'User_910ed5ca-4ecf-414c-a1be-d53511bfe1a5',
    Type: 2
  }, {
    ID: '910ed5ca-4ecf-414c-a1be-d53511bfe1a5',
    Type: 2
  }, {
    ID: 'User',
    Type: 2
  }, {
    ID: 'fake@email.not',
    Type: 5
  }, {
    ID: '100320014080D3AD',
    Type: 3
  }],
  TargetContextId: '0fea4e03-8146-453b-b889-54b4bd11565b'
}, {
  CreationTime: '2021-05-20T17:43:00',
  Id: '8c3d0215-66f0-41b0-3205-08d91bb6b63c',
  Operation: 'SharingPolicyChanged',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 4,
  UserKey: 'i:0h.f|membership|100320014080d3ad@live.com',
  UserType: 0,
  Version: 1,
  Workload: 'OneDrive',
  ClientIP: '20.190.157.27',
  ObjectId: 'https://wazuh-my.sharepoint.com/personal/tomas_turina_wazuh_com',
  UserId: 'fake@email.not',
  CorrelationId: 'fd9ac79d-1100-48aa-92c5-40a73a1d443f',
  EventSource: 'SharePoint',
  ItemType: 'Site',
  Site: 'f49feae4-033d-4028-97d1-3acd55341f69',
  UserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
  ModifiedProperties: [{
    Name: 'ShareUsingAnonymousLinks',
    NewValue: 'Enabled',
    OldValue: 'Disabled'
  }]
}, {
  CreationTime: '2021-05-20T17:43:00',
  Id: '35a1b515-2a0e-4bd6-d0a3-08d91bb6b639',
  Operation: 'SiteCollectionCreated',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 4,
  UserKey: 'i:0h.f|membership|100320014080d3ad@live.com',
  UserType: 0,
  Version: 1,
  Workload: 'OneDrive',
  ClientIP: '20.190.157.27',
  ObjectId: 'https://wazuh-my.sharepoint.com/personal/tomas_turina_wazuh_com',
  UserId: 'fake@email.not',
  CorrelationId: 'fd9ac79d-1100-48aa-92c5-40a73a1d443f',
  EventSource: 'SharePoint',
  ItemType: 'Site',
  Site: 'f49feae4-033d-4028-97d1-3acd55341f69',
  UserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
  EventData: '<SiteCreationSource>API</SiteCreationSource><TenantSettings.ShowCreateSiteCommand>True</TenantSettings.ShowCreateSiteCommand><TenantSettings.UseCustomSiteCreationForm>False</TenantSettings.UseCustomSiteCreationForm>'
}, {
  CreationTime: '2021-05-20T17:43:00',
  Id: '344f9139-f437-4290-9566-08d91bb6b61f',
  Operation: 'SiteCollectionAdminRemoved',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 14,
  UserKey: 'i:0h.f|membership|100320014080d3ad@live.com',
  UserType: 0,
  Version: 1,
  Workload: 'OneDrive',
  ClientIP: '20.190.157.27',
  ObjectId: 'https://wazuh-my.sharepoint.com/personal/tomas_turina_wazuh_com',
  UserId: 'fake@email.not',
  CorrelationId: 'fd9ac79d-1100-48aa-92c5-40a73a1d443f',
  EventSource: 'SharePoint',
  ItemType: 'Web',
  Site: 'f49feae4-033d-4028-97d1-3acd55341f69',
  UserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
  WebId: 'a9d15b23-6ac9-43c5-af3c-b4a0916631c1',
  ModifiedProperties: [{
    Name: 'SiteAdmin',
    NewValue: '',
    OldValue: ''
  }],
  TargetUserOrGroupType: 'Member',
  SiteUrl: 'https://wazuh-my.sharepoint.com/personal/tomas_turina_wazuh_com',
  TargetUserOrGroupName: 'SHAREPOINT\\system'
}, {
  CreationTime: '2021-05-20T17:43:00',
  Id: 'd36e4b4d-1e8b-4634-6dd8-08d91bb6b618',
  Operation: 'SiteCollectionAdminAdded',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 14,
  UserKey: 'i:0h.f|membership|100320014080d3ad@live.com',
  UserType: 0,
  Version: 1,
  Workload: 'OneDrive',
  ClientIP: '20.190.157.27',
  ObjectId: 'https://wazuh-my.sharepoint.com/personal/tomas_turina_wazuh_com',
  UserId: 'fake@email.not',
  CorrelationId: 'fd9ac79d-1100-48aa-92c5-40a73a1d443f',
  EventSource: 'SharePoint',
  ItemType: 'Web',
  Site: 'f49feae4-033d-4028-97d1-3acd55341f69',
  UserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
  WebId: 'a9d15b23-6ac9-43c5-af3c-b4a0916631c1',
  ModifiedProperties: [{
    Name: 'SiteAdmin',
    NewValue: 'fake@email.not',
    OldValue: ''
  }],
  TargetUserOrGroupType: 'Member',
  SiteUrl: 'https://wazuh-my.sharepoint.com/personal/tomas_turina_wazuh_com',
  TargetUserOrGroupName: 'fake@email.not'
}, {
  CreationTime: '2021-05-20T17:43:22',
  Id: '0d6a62d3-e4bd-44ee-ce8d-08d91bb6c392',
  Operation: 'PageViewed',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 4,
  UserKey: 'i:0h.f|membership|100320014080d3ad@live.com',
  UserType: 0,
  Version: 1,
  Workload: 'SharePoint',
  ClientIP: '190.16.9.176',
  ObjectId: 'https://wazuh.sharepoint.com/_layouts/15/CreateGroup.aspx',
  UserId: 'fake@email.not',
  CorrelationId: 'ccd0c99f-309b-2000-df13-3fcca9a8c8e1',
  CustomUniqueId: true,
  EventSource: 'SharePoint',
  ItemType: 'Page',
  ListItemUniqueId: '59a8433d-9bb8-cfef-65b7-ef35de00c8f6',
  Site: 'f7fbb805-5f6b-4950-b681-2365eb46081f',
  UserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
  WebId: '3b56db49-60e3-410e-acbd-d8765467388a'
}, {
  CreationTime: '2021-05-20T17:45:57',
  Id: '18bb351b-49e1-47df-8f4d-08d91bb71ffd',
  Operation: 'AddedToGroup',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 14,
  UserKey: 'i:0h.f|membership|100320014080d3ad@live.com',
  UserType: 0,
  Version: 1,
  Workload: 'SharePoint',
  ClientIP: '190.16.9.176',
  ObjectId: 'https://wazuh.sharepoint.com/sites/TestSharePoint',
  UserId: 'fake@email.not',
  CorrelationId: 'f1d0c99f-3094-2000-da82-454f034ca629',
  EventSource: 'SharePoint',
  ItemType: 'Web',
  Site: 'dd58ef08-faea-4cb5-847a-35bb5c01e757',
  UserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
  WebId: '00c32555-e0d8-425f-9fbd-ef5539bfecf7',
  EventData: '<Group>Site Owners</Group>',
  TargetUserOrGroupType: 'Member',
  SiteUrl: 'https://wazuh.sharepoint.com/sites/TestSharePoint',
  TargetUserOrGroupName: 'SHAREPOINT\\system'
}, {
  CreationTime: '2021-05-20T17:46:26',
  Id: '29bde84a-d3ec-4388-4600-08d91bb730bc',
  Operation: 'FileAccessed',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 6,
  UserKey: 'i:0h.f|membership|100320014080d3ad@live.com',
  UserType: 0,
  Version: 1,
  Workload: 'SharePoint',
  ClientIP: '190.16.9.176',
  ObjectId: 'https://wazuh.sharepoint.com/sites/TestSharePoint/Shared Documents/Forms/AllItems.aspx',
  UserId: 'fake@email.not',
  CorrelationId: 'f9d0c99f-b04f-2000-da82-4bb2abf6168f',
  EventSource: 'SharePoint',
  ItemType: 'File',
  ListId: 'fd2ebaf0-900b-4dff-8fc2-d348be51e677',
  ListItemUniqueId: '3c9d8943-846e-41f3-a647-72a5e4e3decf',
  Site: 'dd58ef08-faea-4cb5-847a-35bb5c01e757',
  UserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
  WebId: '00c32555-e0d8-425f-9fbd-ef5539bfecf7',
  SourceFileExtension: 'aspx',
  SiteUrl: 'https://wazuh.sharepoint.com/sites/TestSharePoint/',
  SourceFileName: 'AllItems.aspx',
  SourceRelativeUrl: 'Shared Documents/Forms'
}, {
  CreationTime: '2021-05-20T17:46:25',
  Id: '087e5b68-fc3f-4e01-1efc-08d91bb730b5',
  Operation: 'ListViewed',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 36,
  UserKey: 'i:0h.f|membership|100320014080d3ad@live.com',
  UserType: 0,
  Version: 1,
  Workload: 'SharePoint',
  ClientIP: '190.16.9.176',
  ObjectId: 'https://wazuh.sharepoint.com/sites/TestSharePoint/fd2ebaf0-900b-4dff-8fc2-d348be51e677',
  UserId: 'fake@email.not',
  CorrelationId: 'f9d0c99f-b04f-2000-da82-4bb2abf6168f',
  DoNotDistributeEvent: true,
  EventSource: 'SharePoint',
  ItemType: 'List',
  ListId: 'fd2ebaf0-900b-4dff-8fc2-d348be51e677',
  Site: 'dd58ef08-faea-4cb5-847a-35bb5c01e757',
  UserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
  WebId: '00c32555-e0d8-425f-9fbd-ef5539bfecf7',
  CustomizedDoclib: false,
  FromApp: true,
  IsDocLib: true,
  ItemCount: 0,
  ListBaseTemplateType: '101',
  ListBaseType: 'DocumentLibrary',
  ListColor: '',
  ListIcon: '',
  Source: 'Unknown',
  TemplateTypeId: '',
  ListTitle: 'fd2ebaf0-900b-4dff-8fc2-d348be51e677'
}, {
  CreationTime: '2021-05-20T17:52:29',
  Id: '41225487-31c1-4e24-b8b0-08d91bb8094c',
  Operation: 'PagePrefetched',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 4,
  UserKey: 'i:0h.f|membership|100320014080d3ad@live.com',
  UserType: 0,
  Version: 1,
  Workload: 'SharePoint',
  ClientIP: '190.16.9.176',
  ObjectId: 'https://wazuh.sharepoint.com/sites/TestSharePoint',
  UserId: 'fake@email.not',
  CorrelationId: '52d1c99f-3000-2000-df13-3ab1e8fb9f92',
  CustomUniqueId: false,
  EventSource: 'SharePoint',
  ItemType: 'Page',
  ListId: 'e4c9ce2e-d8c2-468e-baf5-f362f8c2f2f3',
  ListItemUniqueId: '36db3168-c1b2-44e9-9ffd-e9a8e04bb2f5',
  Site: 'dd58ef08-faea-4cb5-847a-35bb5c01e757',
  UserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
  WebId: '00c32555-e0d8-425f-9fbd-ef5539bfecf7'
}, {
  CreationTime: '2021-05-20T17:51:49',
  Id: 'd930cc5c-2658-45df-6361-08d91bb7f179',
  Operation: 'FileCheckedOut',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 6,
  UserKey: 'i:0h.f|membership|100320014080d3ad@live.com',
  UserType: 0,
  Version: 1,
  Workload: 'SharePoint',
  ClientIP: '190.16.9.176',
  ObjectId: 'https://wazuh.sharepoint.com/sites/TestSharePoint/SitePages/Home.aspx',
  UserId: 'fake@email.not',
  CorrelationId: '48d1c99f-f03c-2000-df13-38983a6608f8',
  EventSource: 'SharePoint',
  ItemType: 'File',
  ListId: 'e4c9ce2e-d8c2-468e-baf5-f362f8c2f2f3',
  ListItemUniqueId: '36db3168-c1b2-44e9-9ffd-e9a8e04bb2f5',
  Site: 'dd58ef08-faea-4cb5-847a-35bb5c01e757',
  UserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
  WebId: '00c32555-e0d8-425f-9fbd-ef5539bfecf7',
  HighPriorityMediaProcessing: false,
  SourceFileExtension: 'aspx',
  SiteUrl: 'https://wazuh.sharepoint.com/sites/TestSharePoint/',
  SourceFileName: 'Home.aspx',
  SourceRelativeUrl: 'SitePages'
}, {
  CreationTime: '2021-05-20T17:51:51',
  Id: '89d76362-e493-4c20-3b69-08d91bb7f288',
  Operation: 'ListUpdated',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 36,
  UserKey: 'i:0h.f|membership|100320014080d3ad@live.com',
  UserType: 0,
  Version: 1,
  Workload: 'SharePoint',
  ClientIP: '190.16.9.176',
  ObjectId: 'https://wazuh.sharepoint.com/sites/TestSharePoint/e4c9ce2e-d8c2-468e-baf5-f362f8c2f2f3',
  UserId: 'fake@email.not',
  CorrelationId: '48d1c99f-f0a8-2000-da82-41be3f973267',
  DoNotDistributeEvent: true,
  EventSource: 'SharePoint',
  ItemType: 'List',
  ListId: 'e4c9ce2e-d8c2-468e-baf5-f362f8c2f2f3',
  Site: 'dd58ef08-faea-4cb5-847a-35bb5c01e757',
  UserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
  WebId: '00c32555-e0d8-425f-9fbd-ef5539bfecf7',
  CustomizedDoclib: false,
  FromApp: false,
  IsDocLib: true,
  ItemCount: 1,
  ListBaseTemplateType: '119',
  ListBaseType: 'DocumentLibrary',
  ListColor: '',
  ListIcon: '',
  Source: 'Unknown',
  TemplateTypeId: '',
  ListTitle: 'e4c9ce2e-d8c2-468e-baf5-f362f8c2f2f3'
}, {
  CreationTime: '2021-05-20T17:52:36',
  Id: '7a91dd8c-560b-4fbe-2585-08d91bb80d46',
  Operation: 'ClientViewSignaled',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 4,
  UserKey: 'i:0h.f|membership|100320014080d3ad@live.com',
  UserType: 0,
  Version: 1,
  Workload: 'SharePoint',
  ClientIP: '190.16.9.176',
  ObjectId: 'https://wazuh.sharepoint.com/sites/TestSharePoint/SitePages/Home.aspx',
  UserId: 'fake@email.not',
  CorrelationId: '53d1c99f-b0aa-2000-df13-3efea9e41071',
  CustomUniqueId: false,
  EventSource: 'SharePoint',
  ItemType: 'Page',
  ListId: 'e4c9ce2e-d8c2-468e-baf5-f362f8c2f2f3',
  ListItemUniqueId: '36db3168-c1b2-44e9-9ffd-e9a8e04bb2f5',
  Site: 'dd58ef08-faea-4cb5-847a-35bb5c01e757',
  UserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
  WebId: '00c32555-e0d8-425f-9fbd-ef5539bfecf7'
}, {
  CreationTime: '2021-05-20T17:53:37',
  Id: '9695afcd-19ff-491f-a6ee-08d91bb831d1',
  Operation: 'FileModified',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 6,
  UserKey: 'i:0h.f|membership|100320014080d3ad@live.com',
  UserType: 0,
  Version: 1,
  Workload: 'SharePoint',
  ClientIP: '190.16.9.176',
  ObjectId: 'https://wazuh.sharepoint.com/sites/TestSharePoint/SitePages/Home.aspx',
  UserId: 'fake@email.not',
  CorrelationId: '62d1c99f-d09c-2000-df13-37ddf480e717',
  DoNotDistributeEvent: true,
  EventSource: 'SharePoint',
  ItemType: 'File',
  ListId: 'e4c9ce2e-d8c2-468e-baf5-f362f8c2f2f3',
  ListItemUniqueId: '36db3168-c1b2-44e9-9ffd-e9a8e04bb2f5',
  Site: 'dd58ef08-faea-4cb5-847a-35bb5c01e757',
  UserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
  WebId: '00c32555-e0d8-425f-9fbd-ef5539bfecf7',
  SourceFileExtension: 'aspx',
  SiteUrl: 'https://wazuh.sharepoint.com/sites/TestSharePoint/',
  SourceFileName: 'Home.aspx',
  SourceRelativeUrl: 'SitePages'
}, {
  CreationTime: '2021-05-20T17:57:03',
  Id: '551fd7d5-bac1-4bb4-11d2-08d91bb8ac9e',
  Operation: 'FileAccessedExtended',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 6,
  UserKey: 'i:0h.f|membership|100320014080d3ad@live.com',
  UserType: 0,
  Version: 1,
  Workload: 'SharePoint',
  ClientIP: '190.16.9.176',
  ObjectId: 'https://wazuh.sharepoint.com/sites/TestSharePoint/Shared Documents/Forms/AllItems.aspx',
  UserId: 'fake@email.not',
  CorrelationId: '94d1c99f-20eb-2000-df13-35746d02911e',
  EventSource: 'SharePoint',
  ItemType: 'File',
  ListId: 'fd2ebaf0-900b-4dff-8fc2-d348be51e677',
  ListItemUniqueId: '3c9d8943-846e-41f3-a647-72a5e4e3decf',
  Site: 'dd58ef08-faea-4cb5-847a-35bb5c01e757',
  UserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
  WebId: '00c32555-e0d8-425f-9fbd-ef5539bfecf7',
  SourceFileExtension: 'aspx',
  SiteUrl: 'https://wazuh.sharepoint.com/sites/TestSharePoint/',
  SourceFileName: 'AllItems.aspx',
  SourceRelativeUrl: 'Shared Documents/Forms'
}, {
  CreationTime: '2021-05-20T17:59:55',
  Id: 'eb1f0911-9bed-4f15-10e5-08d91bb91372',
  Operation: 'SiteDeleted',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 6,
  UserKey: 'S-1-0-0',
  UserType: 4,
  Version: 1,
  Workload: 'SharePoint',
  ClientIP: '',
  ObjectId: 'https://wazuh.sharepoint.com/sites/TestSharePoint',
  UserId: 'AAD to SharePoint Sync',
  CorrelationId: 'bed1c99f-20ee-2000-df13-306cb6803c92',
  EventSource: 'SharePoint',
  ItemType: 'Web',
  ListItemUniqueId: '00000000-0000-0000-0000-000000000000',
  Site: 'dd58ef08-faea-4cb5-847a-35bb5c01e757',
  UserAgent: '',
  WebId: '00c32555-e0d8-425f-9fbd-ef5539bfecf7',
  DestinationFileExtension: '',
  SourceFileExtension: '',
  DestinationFileName: 'TestSharePoint',
  DestinationRelativeUrl: '../../https://wazuh.sharepoint.com/sites',
  SiteUrl: 'https://wazuh.sharepoint.com/sites/TestSharePoint/',
  SourceFileName: 'TestSharePoint',
  SourceRelativeUrl: '..'
}, {
  CreationTime: '2021-05-20T17:59:11',
  Id: '0d20a3e1-e9cb-436c-799f-08d91bb8f92f',
  Operation: 'PageViewedExtended',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 4,
  UserKey: 'i:0h.f|membership|100320014080d3ad@live.com',
  UserType: 0,
  Version: 1,
  Workload: 'SharePoint',
  ClientIP: '190.16.9.176',
  ObjectId: 'https://wazuh.sharepoint.com/sites/TestSharePoint/_layouts/15/online/handlers/SpoSuiteLinks.ashx',
  UserId: 'fake@email.not',
  CorrelationId: 'b4d1c99f-0043-2000-da82-41b63e1d91f4',
  EventSource: 'SharePoint',
  ItemType: 'Page',
  Site: 'dd58ef08-faea-4cb5-847a-35bb5c01e757',
  UserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
  WebId: '00c32555-e0d8-425f-9fbd-ef5539bfecf7'
}, {
  CreationTime: '2021-05-20T17:44:27',
  Id: '30ef2f70-a12d-4b31-1e70-08d91bb6ea2e',
  Operation: 'Set-Mailbox',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 1,
  ResultStatus: 'True',
  UserKey: 'SpoolsProvisioning-ApplicationAccount@eurprd04.prod.outlook.com',
  UserType: 3,
  Version: 1,
  Workload: 'Exchange',
  ClientIP: '52.233.237.141:40638',
  ObjectId: 'EURPR04A010.prod.outlook.com/Microsoft Exchange Hosted Organizations/wazuh.testytest.com/tomas.turina',
  UserId: 'SpoolsProvisioning-ApplicationAccount@eurprd04.prod.outlook.com',
  AppId: '61109738-7d2b-4a0b-9fe3-660b1ff83505',
  ClientAppId: '',
  ExternalAccess: true,
  OrganizationName: 'wazuh.testytest.com',
  OriginatingServer: 'AM9PR04MB8986 (15.20.4150.023)',
  Parameters: [{
    Name: 'Identity',
    Value: 'MGZlYTRlMDMtODE0Ni00NTNiLWI4ODktNTRiNGJkMTE1NjViXGJkYmI4MjM2LTBmNDgtNGZjNi05Zjc3LTkxNGNkY2MwMmIzYw2'
  }, {
    Name: 'ResourceEmailAddresses',
    Value: 'True'
  }, {
    Name: 'BypassLiveId',
    Value: 'True'
  }, {
    Name: 'Force',
    Value: 'True'
  }, {
    Name: 'DomainController',
    Value: 'HE1PR04A010DC03.EURPR04A010.prod.outlook.com'
  }, {
    Name: 'EmailAddresses',
    Value: 'SIP:fake@email.not;SMTP:fake@email.not;SPO:SPO_f49feae4-033d-4028-97d1-3acd55341f69@SPO_0fea4e03-8146-453b-b889-54b4bd11565b'
  }],
  SessionId: ''
}, {
  CreationTime: '2021-05-20T17:45:59',
  Id: '48c00930-b25d-4ccc-ccb3-08d91bb720f6',
  Operation: 'ModifyFolderPermissions',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 2,
  ResultStatus: 'Succeeded',
  UserKey: 'S-1-5-18',
  UserType: 2,
  Version: 1,
  Workload: 'Exchange',
  ClientIP: '::1',
  UserId: 'S-1-5-18',
  ClientIPAddress: '::1',
  ClientInfoString: 'Client=WebServices;Action=ConfigureGroupMailbox',
  ExternalAccess: true,
  InternalLogonType: 1,
  LogonType: 1,
  LogonUserSid: 'S-1-5-18',
  MailboxGuid: 'fc108b45-9d51-4b87-a473-9d5a0e404966',
  MailboxOwnerMasterAccountSid: 'S-1-5-10',
  MailboxOwnerSid: 'S-1-5-21-2986565805-1835265550-1383574073-20743067',
  MailboxOwnerUPN: 'TestSharePoint@wazuh.com',
  OrganizationName: 'wazuh.testytest.com',
  OriginatingServer: 'AS8PR04MB8465 (15.20.4150.023)\r\n',
  Item: {
    Id: 'LgAAAAA6tVhba3JWSaGmky7/7OvfAQDRwKc47c1sT4Waab6O4zbPAAAAAAENAAAC',
    ParentFolder: {
      Id: 'LgAAAAA6tVhba3JWSaGmky7/7OvfAQDRwKc47c1sT4Waab6O4zbPAAAAAAENAAAC',
      MemberRights: 'ReadAny, Create, EditOwned, DeleteOwned, EditAny, DeleteAny, Visible, FreeBusySimple, FreeBusyDetailed',
      MemberSid: 'S-1-8-4228942661-1267178833-1520268196-1716076558-1',
      MemberUpn: 'Member@local',
      Name: 'Calendar',
      Path: '\\Calendar'
    }
  }
}, {
  CreationTime: '2021-05-20T17:45:58',
  Id: 'bb03b48e-609d-477b-cb80-08d91bb72077',
  Operation: 'Create',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 2,
  ResultStatus: 'Succeeded',
  UserKey: 'S-1-5-18',
  UserType: 2,
  Version: 1,
  Workload: 'Exchange',
  ClientIP: '::1',
  UserId: 'S-1-5-18',
  ClientIPAddress: '::1',
  ClientInfoString: 'Client=WebServices;Action=ConfigureGroupMailbox',
  ExternalAccess: true,
  InternalLogonType: 1,
  LogonType: 1,
  LogonUserSid: 'S-1-5-18',
  MailboxGuid: 'fc108b45-9d51-4b87-a473-9d5a0e404966',
  MailboxOwnerMasterAccountSid: 'S-1-5-10',
  MailboxOwnerSid: 'S-1-5-21-2986565805-1835265550-1383574073-20743067',
  MailboxOwnerUPN: 'TestSharePoint@wazuh.com',
  OrganizationName: 'wazuh.testytest.com',
  OriginatingServer: 'AS8PR04MB8465 (15.20.4150.023)\r\n',
  Item: {
    Attachments: 'warming_email_03_2017_calendar.png (646b); warming_email_03_2017_conversation.png (661b); warming_email_03_2017_links.png (1450b); google_play_store_badge.png (4871b); apple_store_badge.png (4493b); windows_store_badge.png (3728b); warming_email_03_2017_files.png (856b); warming_email_03_2017_sharePoint.png (1479b)',
    Id: 'RgAAAAA6tVhba3JWSaGmky7/7OvfBwDRwKc47c1sT4Waab6O4zbPAAAAAAEMAADRwKc47c1sT4Waab6O4zbPAAAAAAk9AAAJ',
    InternetMessageId: '<AS8PR04MB846542106D3939F2D1952D05D32A9@AS8PR04MB8465.eurprd04.prod.outlook.com>',
    IsRecord: false,
    ParentFolder: {
      Id: 'LgAAAAA6tVhba3JWSaGmky7/7OvfAQDRwKc47c1sT4Waab6O4zbPAAAAAAEMAAAB',
      Path: '\\Inbox'
    },
    Subject: 'The new TestSharePoint group is ready'
  }
}, {
  CreationTime: '2021-05-20T17:59:59',
  Id: 'e855fb12-2d48-45f3-ac8d-08d91bb91569',
  Operation: 'Remove-UnifiedGroup',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 1,
  ResultStatus: 'True',
  UserKey: 'NT AUTHORITY\\SYSTEM (w3wp)',
  UserType: 2,
  Version: 1,
  Workload: 'Exchange',
  ClientIP: '[2a01:111:f402:ac00::f134]:51514',
  ObjectId: 'TestSharePoint_b47e06bf-895d-48c4-8ae4-a0fdc60ec249',
  UserId: 'NT AUTHORITY\\SYSTEM (w3wp)',
  AppId: '00000003-0000-0ff1-ce00-000000000000',
  ClientAppId: '00000003-0000-0ff1-ce00-000000000000',
  ExternalAccess: false,
  OrganizationName: 'wazuh.testytest.com',
  OriginatingServer: 'VI1PR04MB6125 (15.20.4129.033)',
  Parameters: [{
    Name: 'Identity',
    Value: 'b47e06bf-895d-48c4-8ae4-a0fdc60ec249'
  }],
  SessionId: ''
}, {
  CreationTime: '2021-05-20T18:04:37',
  Id: 'f111c82c-7961-473d-112a-08d91bb9bb91',
  Operation: 'Set-UnifiedGroup',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 1,
  ResultStatus: 'True',
  UserKey: 'SpoolsProvisioning-ApplicationAccount@eurprd04.prod.outlook.com',
  UserType: 3,
  Version: 1,
  Workload: 'Exchange',
  ClientIP: '51.144.33.14:58849',
  ObjectId: 'EURPR04A010.prod.outlook.com/Microsoft Exchange Hosted Organizations/wazuh.testytest.com/Soft Deleted Objects/TestSharePoint_b47e06bf-895d-48c4-8ae4-a0fdc60ec249',
  UserId: 'SpoolsProvisioning-ApplicationAccount@eurprd04.prod.outlook.com',
  AppId: '61109738-7d2b-4a0b-9fe3-660b1ff83505',
  ClientAppId: '',
  ExternalAccess: true,
  OrganizationName: 'wazuh.testytest.com',
  OriginatingServer: 'VI1PR0402MB3326 (15.20.4129.033)',
  Parameters: [{
    Name: 'Identity',
    Value: 'MGZlYTRlMDMtODE0Ni00NTNiLWI4ODktNTRiNGJkMTE1NjViXDFlYjFjNjZhLTRhYWQtNGY2Mi04NjAzLTdjMDRkZTIxYWE3Mg2'
  }, {
    Name: 'EmailAddresses',
    Value: 'smtp:TestSharePoint@wazuh.testytest.com;SMTP:TestSharePoint@wazuh.com'
  }, {
    Name: 'IncludeSoftDeletedObjects',
    Value: 'True'
  }],
  SessionId: ''
}, {
  CreationTime: '2021-05-20T18:59:49',
  Id: '32229114-e357-4b56-9d08-08d91bc1717c',
  Operation: 'Set-User',
  OrganizationId: '0fea4e03-8146-453b-b889-54b4bd11565b',
  RecordType: 1,
  ResultStatus: 'True',
  UserKey: 'NT AUTHORITY\\SYSTEM (Microsoft.Exchange.Management.ForwardSync)',
  UserType: 3,
  Version: 1,
  Workload: 'Exchange',
  ObjectId: 'EURPR04A010.prod.outlook.com/Microsoft Exchange Hosted Organizations/wazuh.testytest.com/tomas.turina',
  UserId: 'NT AUTHORITY\\SYSTEM (Microsoft.Exchange.Management.ForwardSync)',
  AppId: '',
  ClientAppId: '',
  ExternalAccess: true,
  OrganizationName: 'wazuh.testytest.com',
  OriginatingServer: 'DB8PR04MB7065 (15.20.4150.023)',
  Parameters: [{
    Name: 'Identity',
    Value: '0fea4e03-8146-453b-b889-54b4bd11565b\\bdbb8236-0f48-4fc6-9f77-914cdcc02b3c'
  }, {
    Name: 'SyncMailboxLocationGuids',
    Value: 'True'
  }, {
    Name: 'ErrorAction',
    Value: 'Stop'
  }, {
    Name: 'WarningAction',
    Value: 'SilentlyContinue'
  }]
}];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJhcnJheU9mZmljZUdyb3VwcyIsImV4cG9ydHMiLCJhcnJheUxvY2F0aW9uT2ZmaWNlIiwiYXJyYXlEZWNvZGVyT2ZmaWNlIiwibmFtZSIsImFycmF5VXVpZE9mZmljZSIsImFycmF5RGV2aWNlUHJvcGVydGllc09mZmljZSIsIk5hbWUiLCJWYWx1ZSIsImFycmF5SXAiLCJhcnJheVVzZXJJZCIsImFycmF5VGFyZ2V0T2ZmaWNlIiwiSUQiLCJUeXBlIiwiYXJyYXlBY3Rvck9mZmljZSIsImFycmF5RXh0ZW5kZWRQcm9wZXJ0aWVzT2ZmaWNlIiwib2ZmaWNlUnVsZXMiLCJkYXRhIiwib2ZmaWNlMzY1IiwiUmVjb3JkVHlwZSIsIlN1YnNjcmlwdGlvbiIsInJ1bGUiLCJsZXZlbCIsImRlc2NyaXB0aW9uIiwiaWQiLCJtYWlsIiwiZmlyZWR0aW1lcyIsImdyb3VwcyIsImFycmF5TG9ncyIsIklkIiwiT3BlcmF0aW9uIiwiT3JnYW5pemF0aW9uSWQiLCJVc2VyS2V5IiwiVXNlclR5cGUiLCJWZXJzaW9uIiwiV29ya2xvYWQiLCJVc2VySWQiLCJBYWRBcHBJZCIsIkRhdGFUeXBlIiwiRGF0YWJhc2VUeXBlIiwiUmVsYXRpdmVVcmwiLCJSZXN1bHRDb3VudCIsIkNyZWF0aW9uVGltZSIsIlJlc3VsdFN0YXR1cyIsIk9iamVjdElkIiwiU2VjdXJpdHlDb21wbGlhbmNlQ2VudGVyRXZlbnRUeXBlIiwiQ2xpZW50QXBwbGljYXRpb24iLCJDbWRsZXRWZXJzaW9uIiwiRWZmZWN0aXZlT3JnYW5pemF0aW9uIiwiTm9uUElJUGFyYW1ldGVycyIsIlBhcmFtZXRlcnMiLCJTdGFydFRpbWUiLCJVc2VyU2VydmljZVBsYW4iLCJDbGllbnRJUCIsIkF6dXJlQWN0aXZlRGlyZWN0b3J5RXZlbnRUeXBlIiwiRXh0ZW5kZWRQcm9wZXJ0aWVzIiwiTW9kaWZpZWRQcm9wZXJ0aWVzIiwiQWN0b3IiLCJBY3RvckNvbnRleHRJZCIsIkFjdG9ySXBBZGRyZXNzIiwiSW50ZXJTeXN0ZW1zSWQiLCJJbnRyYVN5c3RlbUlkIiwiU3VwcG9ydFRpY2tldElkIiwiVGFyZ2V0IiwiVGFyZ2V0Q29udGV4dElkIiwiQXBwbGljYXRpb25JZCIsIkRldmljZVByb3BlcnRpZXMiLCJFcnJvck51bWJlciIsIk5ld1ZhbHVlIiwiT2xkVmFsdWUiLCJDb3JyZWxhdGlvbklkIiwiRXZlbnRTb3VyY2UiLCJJdGVtVHlwZSIsIlNpdGUiLCJVc2VyQWdlbnQiLCJFdmVudERhdGEiLCJXZWJJZCIsIlRhcmdldFVzZXJPckdyb3VwVHlwZSIsIlNpdGVVcmwiLCJUYXJnZXRVc2VyT3JHcm91cE5hbWUiLCJDdXN0b21VbmlxdWVJZCIsIkxpc3RJdGVtVW5pcXVlSWQiLCJMaXN0SWQiLCJTb3VyY2VGaWxlRXh0ZW5zaW9uIiwiU291cmNlRmlsZU5hbWUiLCJTb3VyY2VSZWxhdGl2ZVVybCIsIkRvTm90RGlzdHJpYnV0ZUV2ZW50IiwiQ3VzdG9taXplZERvY2xpYiIsIkZyb21BcHAiLCJJc0RvY0xpYiIsIkl0ZW1Db3VudCIsIkxpc3RCYXNlVGVtcGxhdGVUeXBlIiwiTGlzdEJhc2VUeXBlIiwiTGlzdENvbG9yIiwiTGlzdEljb24iLCJTb3VyY2UiLCJUZW1wbGF0ZVR5cGVJZCIsIkxpc3RUaXRsZSIsIkhpZ2hQcmlvcml0eU1lZGlhUHJvY2Vzc2luZyIsIkRlc3RpbmF0aW9uRmlsZUV4dGVuc2lvbiIsIkRlc3RpbmF0aW9uRmlsZU5hbWUiLCJEZXN0aW5hdGlvblJlbGF0aXZlVXJsIiwiQXBwSWQiLCJDbGllbnRBcHBJZCIsIkV4dGVybmFsQWNjZXNzIiwiT3JnYW5pemF0aW9uTmFtZSIsIk9yaWdpbmF0aW5nU2VydmVyIiwiU2Vzc2lvbklkIiwiQ2xpZW50SVBBZGRyZXNzIiwiQ2xpZW50SW5mb1N0cmluZyIsIkludGVybmFsTG9nb25UeXBlIiwiTG9nb25UeXBlIiwiTG9nb25Vc2VyU2lkIiwiTWFpbGJveEd1aWQiLCJNYWlsYm94T3duZXJNYXN0ZXJBY2NvdW50U2lkIiwiTWFpbGJveE93bmVyU2lkIiwiTWFpbGJveE93bmVyVVBOIiwiSXRlbSIsIlBhcmVudEZvbGRlciIsIk1lbWJlclJpZ2h0cyIsIk1lbWJlclNpZCIsIk1lbWJlclVwbiIsIlBhdGgiLCJBdHRhY2htZW50cyIsIkludGVybmV0TWVzc2FnZUlkIiwiSXNSZWNvcmQiLCJTdWJqZWN0Il0sInNvdXJjZXMiOlsib2ZmaWNlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXG4gKiBXYXp1aCBhcHAgLSBPZmZpY2UzNjUgc2FtcGxlIGRhdGFcbiAqIENvcHlyaWdodCAoQykgMjAxNS0yMDIyIFdhenVoLCBJbmMuXG4gKlxuICogVGhpcyBwcm9ncmFtIGlzIGZyZWUgc29mdHdhcmU7IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcbiAqIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gKiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uOyBlaXRoZXIgdmVyc2lvbiAyIG9mIHRoZSBMaWNlbnNlLCBvclxuICogKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBGaW5kIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhpcyBvbiB0aGUgTElDRU5TRSBmaWxlLlxuICovXG5cbmV4cG9ydCBjb25zdCBhcnJheU9mZmljZUdyb3VwcyA9IFsnb2ZmaWNlMzY1JywgJ0F6dXJlQWN0aXZlRGlyZWN0b3J5U3RzTG9nb24nXTtcblxuZXhwb3J0IGNvbnN0IGFycmF5TG9jYXRpb25PZmZpY2UgPSAnb2ZmaWNlMzY1JztcblxuZXhwb3J0IGNvbnN0IGFycmF5RGVjb2Rlck9mZmljZSA9IFtcbiAge1xuICAgIG5hbWU6ICdqc29uJyxcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBhcnJheVV1aWRPZmZpY2UgPSBbXG4gICdhODA4MDAwOS1hYTg1LTRkNjUtYTBmMC03NGZlMDMzMWVkY2UnLFxuICAnNGU5M2M4ZTMtNTJjMS00YTRlLWFiNjktOWU2MWNjZjZjZDAwJyxcbiAgJ2QxNGFhNWNiLWIwNzAtNDJmOC04NzA5LTBmOGFmZDk0MmZjMCcsXG4gICc5MmE3ZTg5My0wZjRhLTQ2MzUtYWYwZC04Mzg5MWQ0ZmY5YzAnLFxuICAnY2UwMTNmMDUtYTc4My00MTg2LTlkODUtNWExNDk5OGI2MTExJyxcbiAgJzRmNjg2ZTAzLTdjZjYtNDRhOC05MjEyLWI4YTkxYjEyODA4MicsXG4gICdjYzU4ZTgxNy1jNmQzLTQ0NTctYjAxMS01NGU4ODFlMjMwZWMnLFxuICAnODI1ZjlkNmUtMTJjMC00YjU5LTgwN2QtMWI0MWM2ZTQ4YTNhJyxcbiAgJ2QzNjI1M2ZiLTI0YTEtNDgxYy1hMTk5LWY3Nzg1MzRjY2I1ZicsXG4gICc5MDgzMzY5ZS02NzliLTRlOGItOTI0OS0zMjNhNTFkNWJmOWMnLFxuICAnNmQ4NzJiZjgtZTQ2Mi00ZGU4LTllMTYtYzM2NzYxMDUwZmI3JyxcbiAgJ2I5YTczYzBmLTU1ZjItNGU5NS05NjI2LTFjMjY0ZDAyZWFjMycsXG4gICdiYmFiOTFhZC1iYzhhLTRjODYtOTAxMC0zYzg0YjM5ZmRlMGQnLFxuICAnYjUzNTkwOTItZGFkMi00MDYwLWI5M2QtMzc5MWU0ZGEwZGVjJyxcbiAgJ2U4NDkzYjI2LWMxZjktNDJlYi05NzU2LWRmZDM2MzE0OTg1MicsXG4gICdjYTIwNDRmYy0zMmNhLTQ3OGItOGIwZC1mZjZmZGQzYjFlNWEnLFxuICAnYTA5OTUxMzYtOTFkOC00YWNmLTg0NDktMjhjMjc1ZmZiN2UzJyxcbiAgJ2MzNDgyYjVkLWIxYTktNGY0NC04ZGYwLWE2MDFlMThjZjVjMycsXG4gICc0OWZkNDY0Mi1jZmU1LTQxNzAtOTQ4OC0yNWQ4NDdlMzU3OWYnLFxuICAnMjlmOTYyNzEtNWMxYi00N2VjLTk2NTItYTQxZDVjYjE3Y2I0Jyxcbl07XG5cbmV4cG9ydCBjb25zdCBhcnJheURldmljZVByb3BlcnRpZXNPZmZpY2UgPSBbXG4gIHtcbiAgICBOYW1lOiAnQnJvd3NlclR5cGUnLFxuICAgIFZhbHVlOiAnQ2hyb21lJyxcbiAgfSxcbiAge1xuICAgIE5hbWU6ICdJc0NvbXBsaWFudEFuZE1hbmFnZWQnLFxuICAgIFZhbHVlOiAnRmFsc2UnLFxuICB9LFxuICB7XG4gICAgTmFtZTogJ1Nlc3Npb25JZCcsXG4gICAgVmFsdWU6ICcyYTFmYjhjNC1jZWI2LTRmYTAtODI2Yy0zZDQzZjg3ZGU4OTcnLFxuICB9LFxuXTtcblxuZXhwb3J0IGNvbnN0IGFycmF5SXAgPSBbXG4gICc3Ny4yMzEuMTgyLjE3JyxcbiAgJzE3Mi4yMTcuMjA0Ljk0JyxcbiAgJzEwOC4xNzcuMTMuMTAxJyxcbiAgJzEzLjIyNi41Mi42NicsXG4gICcxMy4yMjYuNTIuMicsXG4gICcxMy4yMjYuNTIuMTA0JyxcbiAgJzEzLjIyNi41Mi44OScsXG4gICcxNDAuODIuMTEzLjMnLFxuXTtcbmV4cG9ydCBjb25zdCBhcnJheVVzZXJJZCA9IFtcbiAgJ3NtaXRoQHdhenVoLmNvbScsXG4gICd3aWxsaWFtc0B3YXp1aC5jb20nLFxuICAnZnJhbmtAd2F6dWguY29tJyxcbiAgJ2pvbmVzQHdhenVoLmNvbScsXG4gICdicm93bkB3YXp1aC5jb20nLFxuXTtcbmV4cG9ydCBjb25zdCBhcnJheVRhcmdldE9mZmljZSA9IFtcbiAge1xuICAgIElEOiAnNzk3ZjQ4NDYtYmEwMC00ZmQ3LWJhNDMtZGFjMWY4ZjYzMDEzJyxcbiAgICBUeXBlOiAwLFxuICB9LFxuXTtcblxuZXhwb3J0IGNvbnN0IGFycmF5QWN0b3JPZmZpY2UgPSBbXG4gIHtcbiAgICBJRDogJ2EzOWRkOTU3LWQyOTUtNDU0OC1iNTM3LTIwNTU0NjliYWZiYicsXG4gICAgVHlwZTogMCxcbiAgfSxcbiAge1xuICAgIElEOiAnYWxiZUB3YXp1aC5jb20nLFxuICAgIFR5cGU6IDUsXG4gIH0sXG5dO1xuXG5leHBvcnQgY29uc3QgYXJyYXlFeHRlbmRlZFByb3BlcnRpZXNPZmZpY2UgPSBbXG4gIHtcbiAgICBOYW1lOiAnUmVzdWx0U3RhdHVzRGV0YWlsJyxcbiAgICBWYWx1ZTogJ1N1Y2Nlc3MnLFxuICB9LFxuICB7XG4gICAgTmFtZTogJ1VzZXJBZ2VudCcsXG4gICAgVmFsdWU6XG4gICAgICAnTW96aWxsYS81LjAgKFgxMTsgTGludXggeDg2XzY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvOTEuMC40NDcyLjc3IFNhZmFyaS81MzcuMzYnLFxuICB9LFxuICB7XG4gICAgTmFtZTogJ1JlcXVlc3RUeXBlJyxcbiAgICBWYWx1ZTogJ09BdXRoMjpBdXRob3JpemUnLFxuICB9LFxuXTtcblxuZXhwb3J0IGNvbnN0IG9mZmljZVJ1bGVzID0ge1xuICAxOiB7XG4gICAgZGF0YToge1xuICAgICAgb2ZmaWNlMzY1OiB7XG4gICAgICAgIFJlY29yZFR5cGU6IDEsXG4gICAgICAgIFN1YnNjcmlwdGlvbjogJ0F1ZGl0LkV4Y2hhbmdlJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBydWxlOiB7XG4gICAgICBsZXZlbDogMyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnT2ZmaWNlIDM2NTogRXZlbnRzIGZyb20gdGhlIEV4Y2hhbmdlIGFkbWluIGF1ZGl0IGxvZy4nLFxuICAgICAgaWQ6ICc5MTUzMycsXG4gICAgICBtYWlsOiBmYWxzZSxcbiAgICAgIGZpcmVkdGltZXM6IDMsXG4gICAgICBncm91cHM6IFsnb2ZmaWNlMzY1JywgJ0V4Y2hhbmdlQWRtaW4nLCAnaGlwYWFfMTY0LjMxMi5iJywgJ3BjaV9kc3NfMTAuMi4yJywgJ3BjaV9kc3NfMTAuNi4xJ10sXG4gICAgfSxcbiAgfSxcbiAgMjoge1xuICAgIGRhdGE6IHtcbiAgICAgIG9mZmljZTM2NToge1xuICAgICAgICBSZWNvcmRUeXBlOiAyLFxuICAgICAgICBTdWJzY3JpcHRpb246ICdBdWRpdC5FeGNoYW5nZScsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDMsXG4gICAgICBkZXNjcmlwdGlvbjpcbiAgICAgICAgJ09mZmljZSAzNjU6IEV2ZW50cyBmcm9tIGFuIEV4Y2hhbmdlIG1haWxib3ggYXVkaXQgbG9nIGZvciBhY3Rpb25zIHRoYXQgYXJlIHBlcmZvcm1lZCBvbiBhIHNpbmdsZSBpdGVtLCBzdWNoIGFzIGNyZWF0aW5nIG9yIHJlY2VpdmluZyBhbiBlbWFpbCBtZXNzYWdlLicsXG4gICAgICBpZDogJzkxNTM0JyxcbiAgICAgIG1haWw6IGZhbHNlLFxuICAgICAgZmlyZWR0aW1lczogMyxcbiAgICAgIGdyb3VwczogWydvZmZpY2UzNjUnLCAnRXhjaGFuZ2VJdGVtJywgJ2hpcGFhXzE2NC4zMTIuYicsICdwY2lfZHNzXzEwLjYuMiddLFxuICAgIH0sXG4gIH0sXG4gIDQ6IHtcbiAgICBkYXRhOiB7XG4gICAgICBvZmZpY2UzNjU6IHtcbiAgICAgICAgUmVjb3JkVHlwZTogNCxcbiAgICAgICAgU3Vic2NyaXB0aW9uOiAnQXVkaXQuU2hhcmVQb2ludCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDMsXG4gICAgICBkZXNjcmlwdGlvbjogJ09mZmljZSAzNjU6IFNoYXJlUG9pbnQgZXZlbnRzLicsXG4gICAgICBpZDogJzkxNTM2JyxcbiAgICAgIG1haWw6IGZhbHNlLFxuICAgICAgZmlyZWR0aW1lczogMyxcbiAgICAgIGdyb3VwczogWydvZmZpY2UzNjUnLCAnU2hhcmVQb2ludCcsICdoaXBhYV8xNjQuMzEyLmInLCAncGNpX2Rzc18xMC42LjInXSxcbiAgICB9LFxuICB9LFxuICA2OiB7XG4gICAgZGF0YToge1xuICAgICAgb2ZmaWNlMzY1OiB7XG4gICAgICAgIFJlY29yZFR5cGU6IDYsXG4gICAgICAgIFN1YnNjcmlwdGlvbjogJ0F1ZGl0LlNoYXJlUG9pbnQnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiAzLFxuICAgICAgZGVzY3JpcHRpb246ICdPZmZpY2UgMzY1OiBTaGFyZVBvaW50IGZpbGUgb3BlcmF0aW9uIGV2ZW50cy4nLFxuICAgICAgaWQ6ICc5MTUzNycsXG4gICAgICBtYWlsOiBmYWxzZSxcbiAgICAgIGZpcmVkdGltZXM6IDMsXG4gICAgICBncm91cHM6IFtcbiAgICAgICAgJ29mZmljZTM2NScsXG4gICAgICAgICdTaGFyZVBvaW50RmlsZU9wZXJhdGlvbicsXG4gICAgICAgICdoaXBhYV8xNjQuMzEyLmInLFxuICAgICAgICAnaGlwYWFfMTY0LjMxMi5jLjEnLFxuICAgICAgICAncGNpX2Rzc18xMC42LjInLFxuICAgICAgICAncGNpX2Rzc18xMS41JyxcbiAgICAgIF0sXG4gICAgfSxcbiAgfSxcbiAgODoge1xuICAgIGRhdGE6IHtcbiAgICAgIG9mZmljZTM2NToge1xuICAgICAgICBSZWNvcmRUeXBlOiA4LFxuICAgICAgICBTdWJzY3JpcHRpb246ICdBdWRpdC5BenVyZUFjdGl2ZURpcmVjdG9yeScsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcnVsZToge1xuICAgICAgbGV2ZWw6IDMsXG4gICAgICBkZXNjcmlwdGlvbjogJ09mZmljZSAzNjU6IEF6dXJlIEFjdGl2ZSBEaXJlY3RvcnkgZXZlbnRzLicsXG4gICAgICBpZDogJzkxNTM5JyxcbiAgICAgIG1haWw6IGZhbHNlLFxuICAgICAgZmlyZWR0aW1lczogMyxcbiAgICAgIGdyb3VwczogWydvZmZpY2UzNjUnLCAnQXp1cmVBY3RpdmVEaXJlY3RvcnknLCAnaGlwYWFfMTY0LjMxMi5iJywgJ3BjaV9kc3NfMTAuNi4yJ10sXG4gICAgfSxcbiAgfSxcbiAgMTQ6IHtcbiAgICBkYXRhOiB7XG4gICAgICBvZmZpY2UzNjU6IHtcbiAgICAgICAgUmVjb3JkVHlwZTogMTQsXG4gICAgICAgIFN1YnNjcmlwdGlvbjogJ0F1ZGl0LlNoYXJlUG9pbnQnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiAzLFxuICAgICAgZGVzY3JpcHRpb246ICdPZmZpY2UgMzY1OiBTaGFyZVBvaW50IHNoYXJpbmcgZXZlbnRzLicsXG4gICAgICBpZDogJzkxNTQ0JyxcbiAgICAgIG1haWw6IGZhbHNlLFxuICAgICAgZmlyZWR0aW1lczogMyxcbiAgICAgIGdyb3VwczogWydvZmZpY2UzNjUnLCAnU2hhcmVQb2ludCcsICdoaXBhYV8xNjQuMzEyLmInLCAncGNpX2Rzc18xMC42LjInXSxcbiAgICB9LFxuICB9LFxuICAxNToge1xuICAgIGRhdGE6IHtcbiAgICAgIG9mZmljZTM2NToge1xuICAgICAgICBSZWNvcmRUeXBlOiAxNSxcbiAgICAgICAgU3Vic2NyaXB0aW9uOiAnQXVkaXQuQXp1cmVBY3RpdmVEaXJlY3RvcnknLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHJ1bGU6IHtcbiAgICAgIGxldmVsOiAzLFxuICAgICAgZGVzY3JpcHRpb246ICdPZmZpY2UgMzY1OiBTZWN1cmUgVG9rZW4gU2VydmljZSAoU1RTKSBsb2dvbiBldmVudHMgaW4gQXp1cmUgQWN0aXZlIERpcmVjdG9yeS4nLFxuICAgICAgaWQ6ICc5MTU0NScsXG4gICAgICBtYWlsOiBmYWxzZSxcbiAgICAgIGZpcmVkdGltZXM6IDMsXG4gICAgICBncm91cHM6IFtcbiAgICAgICAgJ29mZmljZTM2NScsXG4gICAgICAgICdBenVyZUFjdGl2ZURpcmVjdG9yeVN0c0xvZ29uJyxcbiAgICAgICAgJ2hpcGFhXzE2NC4zMTIuYS4yLkksaGlwYWFfMTY0LjMxMi5iJyxcbiAgICAgICAgJ2hpcGFhXzE2NC4zMTIuZCcsXG4gICAgICAgICdoaXBhYV8xNjQuMzEyLmUuMi5JSScsXG4gICAgICAgICdwY2lfZHNzXzguMyxwY2lfZHNzXzEwLjYuMScsXG4gICAgICBdLFxuICAgIH0sXG4gIH0sXG4gIDE4OiB7XG4gICAgZGF0YToge1xuICAgICAgb2ZmaWNlMzY1OiB7XG4gICAgICAgIFJlY29yZFR5cGU6IDE4LFxuICAgICAgICBTdWJzY3JpcHRpb246ICdBdWRpdC5HZW5lcmFsJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBydWxlOiB7XG4gICAgICBsZXZlbDogNSxcbiAgICAgIGRlc2NyaXB0aW9uOiAnT2ZmaWNlIDM2NTogQWRtaW4gYWN0aW9ucyBmcm9tIHRoZSBTZWN1cml0eSBhbmQgQ29tcGxpYW5jZSBDZW50ZXIuJyxcbiAgICAgIGlkOiAnOTE1NDgnLFxuICAgICAgbWFpbDogZmFsc2UsXG4gICAgICBmaXJlZHRpbWVzOiAzLFxuICAgICAgZ3JvdXBzOiBbXG4gICAgICAgICdvZmZpY2UzNjUnLFxuICAgICAgICAnU2VjdXJpdHlDb21wbGlhbmNlQ2VudGVyRU9QQ21kbGV0JyxcbiAgICAgICAgJ2hpcGFhXzE2NC4zMTIuYicsXG4gICAgICAgICdwY2lfZHNzXzEwLjIuMicsXG4gICAgICAgICdwY2lfZHNzXzEwLjYuMScsXG4gICAgICBdLFxuICAgIH0sXG4gIH0sXG4gIDM2OiB7XG4gICAgZGF0YToge1xuICAgICAgb2ZmaWNlMzY1OiB7XG4gICAgICAgIFJlY29yZFR5cGU6IDM2LFxuICAgICAgICBTdWJzY3JpcHRpb246ICdBdWRpdC5TaGFyZVBvaW50JyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBydWxlOiB7XG4gICAgICBsZXZlbDogMyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnT2ZmaWNlIDM2NTogU2hhcmVQb2ludCBMaXN0IGV2ZW50cy4nLFxuICAgICAgaWQ6ICc5MTU2NCcsXG4gICAgICBtYWlsOiBmYWxzZSxcbiAgICAgIGZpcmVkdGltZXM6IDMsXG4gICAgICBncm91cHM6IFsnb2ZmaWNlMzY1JywgJ1NoYXJlUG9pbnRMaXN0T3BlcmF0aW9uJywgJ2hpcGFhXzE2NC4zMTIuYicsICdwY2lfZHNzXzEwLjYuMiddLFxuICAgIH0sXG4gIH0sXG4gIDUyOiB7XG4gICAgZGF0YToge1xuICAgICAgb2ZmaWNlMzY1OiB7XG4gICAgICAgIFJlY29yZFR5cGU6IDUyLFxuICAgICAgICBTdWJzY3JpcHRpb246ICdBdWRpdC5HZW5lcmFsJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBydWxlOiB7XG4gICAgICBsZXZlbDogMyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnT2ZmaWNlIDM2NTogRGF0YSBJbnNpZ2h0cyBSRVNUIEFQSSBldmVudHMuJyxcbiAgICAgIGlkOiAnOTE1ODAnLFxuICAgICAgbWFpbDogZmFsc2UsXG4gICAgICBmaXJlZHRpbWVzOiA0LFxuICAgICAgZ3JvdXBzOiBbJ29mZmljZTM2NScsICdEYXRhSW5zaWdodHNSZXN0QXBpQXVkaXQnLCAnaGlwYWFfMTY0LjMxMi5iJywgJ3BjaV9kc3NfMTAuNi4yJ10sXG4gICAgfSxcbiAgfSxcbn07XG5leHBvcnQgY29uc3QgYXJyYXlMb2dzID0gW1xuICB7XG4gICAgSWQ6ICczNWFiOGI4OS1jZmVhLTQyMTQtNTI0OS0wOGQ5MWEwNmU1MzcnLFxuICAgIE9wZXJhdGlvbjogJ1NlYXJjaERhdGFJbnNpZ2h0c1N1YnNjcmlwdGlvbicsXG4gICAgT3JnYW5pemF0aW9uSWQ6ICcwZmVhNGUwMy04MTQ2LTQ1M2ItYjg4OS01NGI0YmQxMTU2NWInLFxuICAgIFJlY29yZFR5cGU6IDUyLFxuICAgIFVzZXJLZXk6ICdmYWtlQGVtYWlsLm5vdCcsXG4gICAgVXNlclR5cGU6IDUsXG4gICAgVmVyc2lvbjogMSxcbiAgICBXb3JrbG9hZDogJ1NlY3VyaXR5Q29tcGxpYW5jZUNlbnRlcicsXG4gICAgVXNlcklkOiAnZmFrZUBlbWFpbC5ub3QnLFxuICAgIEFhZEFwcElkOiAnODBjY2NhNjctNTRiZC00NGFiLTg2MjUtNGI3OWM0ZGM3Nzc1JyxcbiAgICBEYXRhVHlwZTogJ0RhdGFJbnNpZ2h0c1N1YnNjcmlwdGlvbicsXG4gICAgRGF0YWJhc2VUeXBlOiAnRGlyZWN0b3J5JyxcbiAgICBSZWxhdGl2ZVVybDpcbiAgICAgICcvRGF0YUluc2lnaHRzL0RhdGFJbnNpZ2h0c1NlcnZpY2Uuc3ZjL0ZpbmQvRGF0YUluc2lnaHRzU3Vic2NyaXB0aW9uP3RlbmFudGlkPTBmZWE0ZTAzLTgxNDYtNDUzYi1iODg5LTU0YjRiZDExNTY1YicsXG4gICAgUmVzdWx0Q291bnQ6ICcxJyxcbiAgfSxcbiAge1xuICAgIElkOiAnMjdlZTJlOTUtNmY1NS00NzIzLWY5MWQtMDhkOTFhMjZiOWE0JyxcbiAgICBPcGVyYXRpb246ICdTZWFyY2hBbGVydCcsXG4gICAgT3JnYW5pemF0aW9uSWQ6ICcwZmVhNGUwMy04MTQ2LTQ1M2ItYjg4OS01NGI0YmQxMTU2NWInLFxuICAgIFJlY29yZFR5cGU6IDUyLFxuICAgIFVzZXJLZXk6ICc5MTBlZDVjYS00ZWNmLTQxNGMtYTFiZS1kNTM1MTFiZmUxYTUnLFxuICAgIFVzZXJUeXBlOiAwLFxuICAgIFZlcnNpb246IDEsXG4gICAgV29ya2xvYWQ6ICdTZWN1cml0eUNvbXBsaWFuY2VDZW50ZXInLFxuICAgIFVzZXJJZDogJzkxMGVkNWNhLTRlY2YtNDE0Yy1hMWJlLWQ1MzUxMWJmZTFhNScsXG4gICAgQWFkQXBwSWQ6ICdmYzc4MDQ2NS0yMDE3LTQwZDQtYTBjNS0zMDcwMjI0NzFiOTInLFxuICAgIERhdGFUeXBlOiAnQWxlcnQnLFxuICAgIERhdGFiYXNlVHlwZTogJ0RhdGFJbnNpZ2h0cycsXG4gICAgUmVsYXRpdmVVcmw6XG4gICAgICAnL0RhdGFJbnNpZ2h0cy9EYXRhSW5zaWdodHNTZXJ2aWNlLnN2Yy9GaW5kL0FsZXJ0P3RlbmFudGlkPTBmZWE0ZTAzLTgxNDYtNDUzYi1iODg5LTU0YjRiZDExNTY1YiZQYWdlU2l6ZT0xMDAmRmlsdGVyPVN0YXJ0RGF0ZStlcSsyMDIxLTA0LTE4VDE3JTNhNTklM2E0MC44ODIwNjU1WithbmQrRW5kRGF0ZStlcSsyMDIxLTA1LTE4VDE3JTNhNTklM2E0MC44ODIwNjU1WithbmQrQWxlcnRDYXRlZ29yeSthbnkrMSUyYzMlMmM3JTJjNSUyYzQrYW5kK0FsZXJ0U291cmNlK2VxKyUyN09mZmljZSszNjUrU2VjdXJpdHkrJTI2K0NvbXBsaWFuY2UlMjcnLFxuICAgIFJlc3VsdENvdW50OiAnMCcsXG4gIH0sXG4gIHtcbiAgICBDcmVhdGlvblRpbWU6ICcyMDIxLTA1LTE4VDE3OjU5OjUyJyxcbiAgICBJZDogJzdkM2E5ZDM1LTZjMDQtNGYwMi1lOGZlLTA4ZDkxYTI2YmM3OScsXG4gICAgT3BlcmF0aW9uOiAnU2VhcmNoQWxlcnRBZ2dyZWdhdGUnLFxuICAgIE9yZ2FuaXphdGlvbklkOiAnMGZlYTRlMDMtODE0Ni00NTNiLWI4ODktNTRiNGJkMTE1NjViJyxcbiAgICBSZWNvcmRUeXBlOiA1MixcbiAgICBVc2VyS2V5OiAnOTEwZWQ1Y2EtNGVjZi00MTRjLWExYmUtZDUzNTExYmZlMWE1JyxcbiAgICBVc2VyVHlwZTogMCxcbiAgICBWZXJzaW9uOiAxLFxuICAgIFdvcmtsb2FkOiAnU2VjdXJpdHlDb21wbGlhbmNlQ2VudGVyJyxcbiAgICBVc2VySWQ6ICc5MTBlZDVjYS00ZWNmLTQxNGMtYTFiZS1kNTM1MTFiZmUxYTUnLFxuICAgIEFhZEFwcElkOiAnZmM3ODA0NjUtMjAxNy00MGQ0LWEwYzUtMzA3MDIyNDcxYjkyJyxcbiAgICBEYXRhVHlwZTogJ0FsZXJ0QWdncmVnYXRlJyxcbiAgICBEYXRhYmFzZVR5cGU6ICdEYXRhSW5zaWdodHMnLFxuICAgIFJlbGF0aXZlVXJsOlxuICAgICAgJy9EYXRhSW5zaWdodHMvRGF0YUluc2lnaHRzU2VydmljZS5zdmMvRmluZC9BbGVydEFnZ3JlZ2F0ZT90ZW5hbnRpZD0wZmVhNGUwMy04MTQ2LTQ1M2ItYjg4OS01NGI0YmQxMTU2NWImUGFnZVNpemU9NTQwJkZpbHRlcj1TdGFydERhdGUrZXErMjAyMS0wNC0xOFQxNyUzYTU5JTNhNDguMzUwNDA1MForYW5kK0VuZERhdGUrZXErMjAyMS0wNS0xOFQxNyUzYTU5JTNhNDguMzUwNDA1MForYW5kK0FsZXJ0Q2F0ZWdvcnkrYW55KzElMmMzJTJjNyUyYzUlMmM0K2FuZCtBbGVydFNvdXJjZStlcSslMjdPZmZpY2UrMzY1K1NlY3VyaXR5KyUyNitDb21wbGlhbmNlJTI3JyxcbiAgICBSZXN1bHRDb3VudDogJzAnLFxuICB9LFxuICB7XG4gICAgQ3JlYXRpb25UaW1lOiAnMjAyMS0wNS0xOFQxNzo1OTo0NicsXG4gICAgSWQ6ICdlYjk3NzVjYi01OWY3LTQyZWEtM2VlMC0wOGQ5MWEyNmI5MmInLFxuICAgIE9wZXJhdGlvbjogJ1ZhbGlkYXRlcmJhY0FjY2Vzc0NoZWNrJyxcbiAgICBPcmdhbml6YXRpb25JZDogJzBmZWE0ZTAzLTgxNDYtNDUzYi1iODg5LTU0YjRiZDExNTY1YicsXG4gICAgUmVjb3JkVHlwZTogNTIsXG4gICAgVXNlcktleTogJ2Zha2VAZW1haWwubm90JyxcbiAgICBVc2VyVHlwZTogNSxcbiAgICBWZXJzaW9uOiAxLFxuICAgIFdvcmtsb2FkOiAnU2VjdXJpdHlDb21wbGlhbmNlQ2VudGVyJyxcbiAgICBVc2VySWQ6ICdmYWtlQGVtYWlsLm5vdCcsXG4gICAgQWFkQXBwSWQ6ICdkNmZkYWEzMy1lODIxLTQyMTEtODNkMC1jZjc0NzM2NDg5ZTEnLFxuICAgIERhdGFUeXBlOiAncmJhY0FjY2Vzc0NoZWNrJyxcbiAgICBSZWxhdGl2ZVVybDpcbiAgICAgICcvRGF0YUluc2lnaHRzL0RhdGFJbnNpZ2h0c1NlcnZpY2Uuc3ZjL3ZhbGlkYXRlL3JiYWNBY2Nlc3NDaGVjaz90ZW5hbnRpZD0wZmVhNGUwMy04MTQ2LTQ1M2ItYjg4OS01NGI0YmQxMTU2NWInLFxuICAgIFJlc3VsdENvdW50OiAnMCcsXG4gIH0sXG4gIHtcbiAgICBDcmVhdGlvblRpbWU6ICcyMDIxLTA1LTE4VDE0OjEyOjUzJyxcbiAgICBJZDogJ2MwZWFkYTFiLTUyYjItNDUwZC04NGRmLTZkNDYxNDIwZDYyMScsXG4gICAgT3BlcmF0aW9uOiAnR2V0LVJldGVudGlvbkNvbXBsaWFuY2VQb2xpY3knLFxuICAgIE9yZ2FuaXphdGlvbklkOiAnMGZlYTRlMDMtODE0Ni00NTNiLWI4ODktNTRiNGJkMTE1NjViJyxcbiAgICBSZWNvcmRUeXBlOiAxOCxcbiAgICBSZXN1bHRTdGF0dXM6ICdTdWNjZXNzJyxcbiAgICBVc2VyS2V5OiAnZmFrZUBlbWFpbC5ub3QnLFxuICAgIFVzZXJUeXBlOiAyLFxuICAgIFZlcnNpb246IDEsXG4gICAgV29ya2xvYWQ6ICdTZWN1cml0eUNvbXBsaWFuY2VDZW50ZXInLFxuICAgIE9iamVjdElkOiAnJyxcbiAgICBVc2VySWQ6ICdmYWtlQGVtYWlsLm5vdCcsXG4gICAgU2VjdXJpdHlDb21wbGlhbmNlQ2VudGVyRXZlbnRUeXBlOiAwLFxuICAgIENsaWVudEFwcGxpY2F0aW9uOiAnRU1DJyxcbiAgICBDbWRsZXRWZXJzaW9uOiAnLi4uJyxcbiAgICBFZmZlY3RpdmVPcmdhbml6YXRpb246ICd3YXp1aC50ZXN0eXRlc3QuY29tJyxcbiAgICBOb25QSUlQYXJhbWV0ZXJzOiAnJyxcbiAgICBQYXJhbWV0ZXJzOiAnJyxcbiAgICBTdGFydFRpbWU6ICcyMDIxLTA1LTE4VDE0OjEyOjUzJyxcbiAgICBVc2VyU2VydmljZVBsYW46ICcnLFxuICB9LFxuICB7XG4gICAgQ3JlYXRpb25UaW1lOiAnMjAyMS0wNS0xOFQxNTo1MjoyNicsXG4gICAgSWQ6ICc0NWEwZDdjNC1kZTczLTQ2NmEtOGU2Yy1jMjVmOWMwMzU3MTQnLFxuICAgIE9wZXJhdGlvbjogJ0dldC1TdXBlcnZpc29yeVJldmlld1BvbGljeVYyJyxcbiAgICBPcmdhbml6YXRpb25JZDogJzBmZWE0ZTAzLTgxNDYtNDUzYi1iODg5LTU0YjRiZDExNTY1YicsXG4gICAgUmVjb3JkVHlwZTogMTgsXG4gICAgUmVzdWx0U3RhdHVzOiAnU3VjY2VzcycsXG4gICAgVXNlcktleTogJ2Zha2VAZW1haWwubm90JyxcbiAgICBVc2VyVHlwZTogMixcbiAgICBWZXJzaW9uOiAxLFxuICAgIFdvcmtsb2FkOiAnU2VjdXJpdHlDb21wbGlhbmNlQ2VudGVyJyxcbiAgICBPYmplY3RJZDogJycsXG4gICAgVXNlcklkOiAnZmFrZUBlbWFpbC5ub3QnLFxuICAgIFNlY3VyaXR5Q29tcGxpYW5jZUNlbnRlckV2ZW50VHlwZTogMCxcbiAgICBDbGllbnRBcHBsaWNhdGlvbjogJ0VNQycsXG4gICAgQ21kbGV0VmVyc2lvbjogJy4uLicsXG4gICAgRWZmZWN0aXZlT3JnYW5pemF0aW9uOiAnd2F6dWgudGVzdHl0ZXN0LmNvbScsXG4gICAgTm9uUElJUGFyYW1ldGVyczogJycsXG4gICAgUGFyYW1ldGVyczogJycsXG4gICAgU3RhcnRUaW1lOiAnMjAyMS0wNS0xOFQxNTo1MjoyNicsXG4gICAgVXNlclNlcnZpY2VQbGFuOiAnJyxcbiAgfSxcbiAge1xuICAgIENyZWF0aW9uVGltZTogJzIwMjEtMDUtMThUMTU6NTI6MzEnLFxuICAgIElkOiAnZjk5MTI4NjgtYjQzMS00MzVjLTgzMzctMGZjM2I0MzcwODE1JyxcbiAgICBPcGVyYXRpb246ICdHZXQtU3VwZXJ2aXNvcnlSZXZpZXdSZXBvcnQnLFxuICAgIE9yZ2FuaXphdGlvbklkOiAnMGZlYTRlMDMtODE0Ni00NTNiLWI4ODktNTRiNGJkMTE1NjViJyxcbiAgICBSZWNvcmRUeXBlOiAxOCxcbiAgICBSZXN1bHRTdGF0dXM6ICdTdWNjZXNzJyxcbiAgICBVc2VyS2V5OiAnZmFrZUBlbWFpbC5ub3QnLFxuICAgIFVzZXJUeXBlOiAyLFxuICAgIFZlcnNpb246IDEsXG4gICAgV29ya2xvYWQ6ICdTZWN1cml0eUNvbXBsaWFuY2VDZW50ZXInLFxuICAgIE9iamVjdElkOiAnJyxcbiAgICBVc2VySWQ6ICdmYWtlQGVtYWlsLm5vdCcsXG4gICAgU2VjdXJpdHlDb21wbGlhbmNlQ2VudGVyRXZlbnRUeXBlOiAwLFxuICAgIENsaWVudEFwcGxpY2F0aW9uOiAnRU1DJyxcbiAgICBDbWRsZXRWZXJzaW9uOiAnLi4uJyxcbiAgICBFZmZlY3RpdmVPcmdhbml6YXRpb246ICd3YXp1aC50ZXN0eXRlc3QuY29tJyxcbiAgICBOb25QSUlQYXJhbWV0ZXJzOlxuICAgICAgJy1TdGFydERhdGUgXCI8U05JUC1QSUk+XCIgLUVuZERhdGUgXCI8U05JUC1QSUk+XCIgLVBhZ2VTaXplIFwiPFNOSVAtUElJPlwiIC1QYWdlIFwiPFNOSVAtUElJPlwiJyxcbiAgICBQYXJhbWV0ZXJzOlxuICAgICAgJy1TdGFydERhdGUgXCI1LzEyLzIwMjEgMTI6MDA6MDAgQU1cIiAtRW5kRGF0ZSBcIjUvMTgvMjAyMSAxMTo1OTo1OSBQTVwiIC1QYWdlU2l6ZSBcIjMwMFwiIC1QYWdlIFwiMVwiJyxcbiAgICBTdGFydFRpbWU6ICcyMDIxLTA1LTE4VDE1OjUyOjMxJyxcbiAgICBVc2VyU2VydmljZVBsYW46ICcnLFxuICB9LFxuICB7XG4gICAgQ3JlYXRpb25UaW1lOiAnMjAyMS0wNS0xOFQxNTo1MjozMCcsXG4gICAgSWQ6ICdkY2VjZDg3YS0zMDYxLTRkZWEtOWJmZi00ZmJmYzIzY2EzMjgnLFxuICAgIE9wZXJhdGlvbjogJ0dldC1TdXBlcnZpc29yeVJldmlld092ZXJhbGxQcm9ncmVzc1JlcG9ydCcsXG4gICAgT3JnYW5pemF0aW9uSWQ6ICcwZmVhNGUwMy04MTQ2LTQ1M2ItYjg4OS01NGI0YmQxMTU2NWInLFxuICAgIFJlY29yZFR5cGU6IDE4LFxuICAgIFJlc3VsdFN0YXR1czogJ1N1Y2Nlc3MnLFxuICAgIFVzZXJLZXk6ICdmYWtlQGVtYWlsLm5vdCcsXG4gICAgVXNlclR5cGU6IDIsXG4gICAgVmVyc2lvbjogMSxcbiAgICBXb3JrbG9hZDogJ1NlY3VyaXR5Q29tcGxpYW5jZUNlbnRlcicsXG4gICAgT2JqZWN0SWQ6ICcnLFxuICAgIFVzZXJJZDogJ2Zha2VAZW1haWwubm90JyxcbiAgICBTZWN1cml0eUNvbXBsaWFuY2VDZW50ZXJFdmVudFR5cGU6IDAsXG4gICAgQ2xpZW50QXBwbGljYXRpb246ICdFTUMnLFxuICAgIENtZGxldFZlcnNpb246ICcuLi4nLFxuICAgIEVmZmVjdGl2ZU9yZ2FuaXphdGlvbjogJ3dhenVoLnRlc3R5dGVzdC5jb20nLFxuICAgIE5vblBJSVBhcmFtZXRlcnM6ICcnLFxuICAgIFBhcmFtZXRlcnM6ICcnLFxuICAgIFN0YXJ0VGltZTogJzIwMjEtMDUtMThUMTU6NTI6MzAnLFxuICAgIFVzZXJTZXJ2aWNlUGxhbjogJycsXG4gIH0sXG4gIHtcbiAgICBDcmVhdGlvblRpbWU6ICcyMDIxLTA1LTE4VDE1OjUyOjMwJyxcbiAgICBJZDogJzU2NDFkMDYyLWYyNzktNGNhNC05NTc3LTUwZDdlY2JmZWVkYicsXG4gICAgT3BlcmF0aW9uOiAnR2V0LVN1cGVydmlzb3J5UmV2aWV3VG9wQ2FzZXNSZXBvcnQnLFxuICAgIE9yZ2FuaXphdGlvbklkOiAnMGZlYTRlMDMtODE0Ni00NTNiLWI4ODktNTRiNGJkMTE1NjViJyxcbiAgICBSZWNvcmRUeXBlOiAxOCxcbiAgICBSZXN1bHRTdGF0dXM6ICdTdWNjZXNzJyxcbiAgICBVc2VyS2V5OiAnZmFrZUBlbWFpbC5ub3QnLFxuICAgIFVzZXJUeXBlOiAyLFxuICAgIFZlcnNpb246IDEsXG4gICAgV29ya2xvYWQ6ICdTZWN1cml0eUNvbXBsaWFuY2VDZW50ZXInLFxuICAgIE9iamVjdElkOiAnJyxcbiAgICBVc2VySWQ6ICdmYWtlQGVtYWlsLm5vdCcsXG4gICAgU2VjdXJpdHlDb21wbGlhbmNlQ2VudGVyRXZlbnRUeXBlOiAwLFxuICAgIENsaWVudEFwcGxpY2F0aW9uOiAnRU1DJyxcbiAgICBDbWRsZXRWZXJzaW9uOiAnLi4uJyxcbiAgICBFZmZlY3RpdmVPcmdhbml6YXRpb246ICd3YXp1aC50ZXN0eXRlc3QuY29tJyxcbiAgICBOb25QSUlQYXJhbWV0ZXJzOiAnJyxcbiAgICBQYXJhbWV0ZXJzOiAnJyxcbiAgICBTdGFydFRpbWU6ICcyMDIxLTA1LTE4VDE1OjUyOjMwJyxcbiAgICBVc2VyU2VydmljZVBsYW46ICcnLFxuICB9LFxuICB7XG4gICAgQ3JlYXRpb25UaW1lOiAnMjAyMS0wNS0xOFQxNzo1MDoxNScsXG4gICAgSWQ6ICc4YzdjOWY4MS02OGU5LTQ1MmItYTIyZC0xMzMzZWI5Y2Q2NDcnLFxuICAgIE9wZXJhdGlvbjogJ0dldC1Db21wbGlhbmNlU2VhcmNoQWN0aW9uJyxcbiAgICBPcmdhbml6YXRpb25JZDogJzBmZWE0ZTAzLTgxNDYtNDUzYi1iODg5LTU0YjRiZDExNTY1YicsXG4gICAgUmVjb3JkVHlwZTogMTgsXG4gICAgUmVzdWx0U3RhdHVzOiAnU3VjY2VzcycsXG4gICAgVXNlcktleTogJ2Zha2VAZW1haWwubm90JyxcbiAgICBVc2VyVHlwZTogMixcbiAgICBWZXJzaW9uOiAxLFxuICAgIFdvcmtsb2FkOiAnU2VjdXJpdHlDb21wbGlhbmNlQ2VudGVyJyxcbiAgICBPYmplY3RJZDogJycsXG4gICAgVXNlcklkOiAnZmFrZUBlbWFpbC5ub3QnLFxuICAgIFNlY3VyaXR5Q29tcGxpYW5jZUNlbnRlckV2ZW50VHlwZTogMCxcbiAgICBDbGllbnRBcHBsaWNhdGlvbjogJ0VNQycsXG4gICAgQ21kbGV0VmVyc2lvbjogJy4uLicsXG4gICAgRWZmZWN0aXZlT3JnYW5pemF0aW9uOiAnd2F6dWgudGVzdHl0ZXN0LmNvbScsXG4gICAgTm9uUElJUGFyYW1ldGVyczogJy1FeHBvcnQgXCI8U05JUC1QSUk+XCInLFxuICAgIFBhcmFtZXRlcnM6ICctRXhwb3J0IFwiVHJ1ZVwiJyxcbiAgICBTdGFydFRpbWU6ICcyMDIxLTA1LTE4VDE3OjUwOjE1JyxcbiAgICBVc2VyU2VydmljZVBsYW46ICcnLFxuICB9LFxuICB7XG4gICAgQ3JlYXRpb25UaW1lOiAnMjAyMS0wNS0xOFQxNzo1MDoxMicsXG4gICAgSWQ6ICc0NjkyMjAxZi04MTAxLTQ1NWUtYjg5ZC02NzI3ZWY3NWMyMjMnLFxuICAgIE9wZXJhdGlvbjogJ0dldC1Db21wbGlhbmNlVGFnJyxcbiAgICBPcmdhbml6YXRpb25JZDogJzBmZWE0ZTAzLTgxNDYtNDUzYi1iODg5LTU0YjRiZDExNTY1YicsXG4gICAgUmVjb3JkVHlwZTogMTgsXG4gICAgUmVzdWx0U3RhdHVzOiAnU3VjY2VzcycsXG4gICAgVXNlcktleTogJ2Zha2VAZW1haWwubm90JyxcbiAgICBVc2VyVHlwZTogMixcbiAgICBWZXJzaW9uOiAxLFxuICAgIFdvcmtsb2FkOiAnU2VjdXJpdHlDb21wbGlhbmNlQ2VudGVyJyxcbiAgICBPYmplY3RJZDogJycsXG4gICAgVXNlcklkOiAnZmFrZUBlbWFpbC5ub3QnLFxuICAgIFNlY3VyaXR5Q29tcGxpYW5jZUNlbnRlckV2ZW50VHlwZTogMCxcbiAgICBDbGllbnRBcHBsaWNhdGlvbjogJ0VNQycsXG4gICAgQ21kbGV0VmVyc2lvbjogJy4uLicsXG4gICAgRWZmZWN0aXZlT3JnYW5pemF0aW9uOiAnd2F6dWgudGVzdHl0ZXN0LmNvbScsXG4gICAgTm9uUElJUGFyYW1ldGVyczogJy1JbmNsdWRpbmdMYWJlbFN0YXRlIFwiPFNOSVAtUElJPlwiJyxcbiAgICBQYXJhbWV0ZXJzOiAnLUluY2x1ZGluZ0xhYmVsU3RhdGUgXCJUcnVlXCInLFxuICAgIFN0YXJ0VGltZTogJzIwMjEtMDUtMThUMTc6NTA6MTInLFxuICAgIFVzZXJTZXJ2aWNlUGxhbjogJycsXG4gIH0sXG4gIHtcbiAgICBDcmVhdGlvblRpbWU6ICcyMDIxLTA1LTE4VDE3OjUwOjEyJyxcbiAgICBJZDogJzdkNDFmMWYyLTU4N2MtNDkyZi1iNmZmLTJmOWQxYTUxOWM2MCcsXG4gICAgT3BlcmF0aW9uOiAnR2V0LUNvbXBsaWFuY2VTZWFyY2gnLFxuICAgIE9yZ2FuaXphdGlvbklkOiAnMGZlYTRlMDMtODE0Ni00NTNiLWI4ODktNTRiNGJkMTE1NjViJyxcbiAgICBSZWNvcmRUeXBlOiAxOCxcbiAgICBSZXN1bHRTdGF0dXM6ICdTdWNjZXNzJyxcbiAgICBVc2VyS2V5OiAnZmFrZUBlbWFpbC5ub3QnLFxuICAgIFVzZXJUeXBlOiAyLFxuICAgIFZlcnNpb246IDEsXG4gICAgV29ya2xvYWQ6ICdTZWN1cml0eUNvbXBsaWFuY2VDZW50ZXInLFxuICAgIE9iamVjdElkOiAnJyxcbiAgICBVc2VySWQ6ICdmYWtlQGVtYWlsLm5vdCcsXG4gICAgU2VjdXJpdHlDb21wbGlhbmNlQ2VudGVyRXZlbnRUeXBlOiAwLFxuICAgIENsaWVudEFwcGxpY2F0aW9uOiAnRU1DJyxcbiAgICBDbWRsZXRWZXJzaW9uOiAnLi4uJyxcbiAgICBFZmZlY3RpdmVPcmdhbml6YXRpb246ICd3YXp1aC50ZXN0eXRlc3QuY29tJyxcbiAgICBOb25QSUlQYXJhbWV0ZXJzOiAnLVJlc3VsdFNpemUgXCJVbmxpbWl0ZWRcIicsXG4gICAgUGFyYW1ldGVyczogJy1SZXN1bHRTaXplIFwiVW5saW1pdGVkXCInLFxuICAgIFN0YXJ0VGltZTogJzIwMjEtMDUtMThUMTc6NTA6MTInLFxuICAgIFVzZXJTZXJ2aWNlUGxhbjogJycsXG4gIH0sXG4gIHtcbiAgICBDcmVhdGlvblRpbWU6ICcyMDIxLTA1LTE4VDE3OjU5OjQ1JyxcbiAgICBJZDogJ2ViY2ZjMmJmLTg3OTktNDEzYy1hZGQ0LTZjMmI1M2NiNjhlNycsXG4gICAgT3BlcmF0aW9uOiAnR2V0LURscFNlbnNpdGl2ZUluZm9ybWF0aW9uVHlwZScsXG4gICAgT3JnYW5pemF0aW9uSWQ6ICcwZmVhNGUwMy04MTQ2LTQ1M2ItYjg4OS01NGI0YmQxMTU2NWInLFxuICAgIFJlY29yZFR5cGU6IDE4LFxuICAgIFJlc3VsdFN0YXR1czogJ1N1Y2Nlc3MnLFxuICAgIFVzZXJLZXk6ICdmYWtlQGVtYWlsLm5vdCcsXG4gICAgVXNlclR5cGU6IDAsXG4gICAgVmVyc2lvbjogMSxcbiAgICBXb3JrbG9hZDogJ1NlY3VyaXR5Q29tcGxpYW5jZUNlbnRlcicsXG4gICAgT2JqZWN0SWQ6ICcnLFxuICAgIFVzZXJJZDogJ2Zha2VAZW1haWwubm90JyxcbiAgICBTZWN1cml0eUNvbXBsaWFuY2VDZW50ZXJFdmVudFR5cGU6IDAsXG4gICAgQ2xpZW50QXBwbGljYXRpb246ICcnLFxuICAgIENtZGxldFZlcnNpb246ICcuLi4nLFxuICAgIEVmZmVjdGl2ZU9yZ2FuaXphdGlvbjogJ3dhenVoLnRlc3R5dGVzdC5jb20nLFxuICAgIE5vblBJSVBhcmFtZXRlcnM6ICctT3JnYW5pemF0aW9uIFwiMGZlYTRlMDMtODE0Ni00NTNiLWI4ODktNTRiNGJkMTE1NjViXCInLFxuICAgIFBhcmFtZXRlcnM6ICctT3JnYW5pemF0aW9uIFwiMGZlYTRlMDMtODE0Ni00NTNiLWI4ODktNTRiNGJkMTE1NjViXCInLFxuICAgIFN0YXJ0VGltZTogJzIwMjEtMDUtMThUMTc6NTk6NDUnLFxuICAgIFVzZXJTZXJ2aWNlUGxhbjogJycsXG4gIH0sXG4gIHtcbiAgICBDcmVhdGlvblRpbWU6ICcyMDIxLTA1LTE4VDE0OjExOjQxJyxcbiAgICBJZDogJzdhZWNhMjI2LWIzZTctNDAzMy05YTdmLWQwNjc2MjJlOGQwMCcsXG4gICAgT3BlcmF0aW9uOiAnVXNlckxvZ2dlZEluJyxcbiAgICBPcmdhbml6YXRpb25JZDogJzBmZWE0ZTAzLTgxNDYtNDUzYi1iODg5LTU0YjRiZDExNTY1YicsXG4gICAgUmVjb3JkVHlwZTogMTUsXG4gICAgUmVzdWx0U3RhdHVzOiAnU3VjY2VzcycsXG4gICAgVXNlcktleTogJzkxMGVkNWNhLTRlY2YtNDE0Yy1hMWJlLWQ1MzUxMWJmZTFhNScsXG4gICAgVXNlclR5cGU6IDAsXG4gICAgVmVyc2lvbjogMSxcbiAgICBXb3JrbG9hZDogJ0F6dXJlQWN0aXZlRGlyZWN0b3J5JyxcbiAgICBDbGllbnRJUDogJzE5MC4xNi45LjE3NicsXG4gICAgT2JqZWN0SWQ6ICc1ZjA5MzMzYS04NDJjLTQ3ZGEtYTE1Ny01N2RhMjdmY2JjYTUnLFxuICAgIFVzZXJJZDogJ2Zha2VAZW1haWwubm90JyxcbiAgICBBenVyZUFjdGl2ZURpcmVjdG9yeUV2ZW50VHlwZTogMSxcbiAgICBFeHRlbmRlZFByb3BlcnRpZXM6IFtcbiAgICAgIHtcbiAgICAgICAgTmFtZTogJ1Jlc3VsdFN0YXR1c0RldGFpbCcsXG4gICAgICAgIFZhbHVlOiAnUmVkaXJlY3QnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgTmFtZTogJ1VzZXJBZ2VudCcsXG4gICAgICAgIFZhbHVlOlxuICAgICAgICAgICdNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvOTAuMC40NDMwLjIxMiBTYWZhcmkvNTM3LjM2JyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIE5hbWU6ICdSZXF1ZXN0VHlwZScsXG4gICAgICAgIFZhbHVlOiAnT0F1dGgyOkF1dGhvcml6ZScsXG4gICAgICB9LFxuICAgIF0sXG4gICAgTW9kaWZpZWRQcm9wZXJ0aWVzOiBbXSxcbiAgICBBY3RvcjogW1xuICAgICAge1xuICAgICAgICBJRDogJzkxMGVkNWNhLTRlY2YtNDE0Yy1hMWJlLWQ1MzUxMWJmZTFhNScsXG4gICAgICAgIFR5cGU6IDAsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBJRDogJ2Zha2VAZW1haWwubm90JyxcbiAgICAgICAgVHlwZTogNSxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBBY3RvckNvbnRleHRJZDogJzBmZWE0ZTAzLTgxNDYtNDUzYi1iODg5LTU0YjRiZDExNTY1YicsXG4gICAgQWN0b3JJcEFkZHJlc3M6ICcxOTAuMTYuOS4xNzYnLFxuICAgIEludGVyU3lzdGVtc0lkOiAnYTM3OTg3OTItZmVmMS00YjUzLWJkNDQtYmJiZDk0Y2YwZTVjJyxcbiAgICBJbnRyYVN5c3RlbUlkOiAnN2FlY2EyMjYtYjNlNy00MDMzLTlhN2YtZDA2NzYyMmU4ZDAwJyxcbiAgICBTdXBwb3J0VGlja2V0SWQ6ICcnLFxuICAgIFRhcmdldDogW1xuICAgICAge1xuICAgICAgICBJRDogJzVmMDkzMzNhLTg0MmMtNDdkYS1hMTU3LTU3ZGEyN2ZjYmNhNScsXG4gICAgICAgIFR5cGU6IDAsXG4gICAgICB9LFxuICAgIF0sXG4gICAgVGFyZ2V0Q29udGV4dElkOiAnMGZlYTRlMDMtODE0Ni00NTNiLWI4ODktNTRiNGJkMTE1NjViJyxcbiAgICBBcHBsaWNhdGlvbklkOiAnODliZWUxZjctNWU2ZS00ZDhhLTlmM2QtZWNkNjAxMjU5ZGE3JyxcbiAgICBEZXZpY2VQcm9wZXJ0aWVzOiBbXG4gICAgICB7XG4gICAgICAgIE5hbWU6ICdPUycsXG4gICAgICAgIFZhbHVlOiAnV2luZG93cyAxMCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBOYW1lOiAnQnJvd3NlclR5cGUnLFxuICAgICAgICBWYWx1ZTogJ0Nocm9tZScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBOYW1lOiAnSXNDb21wbGlhbnRBbmRNYW5hZ2VkJyxcbiAgICAgICAgVmFsdWU6ICdGYWxzZScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBOYW1lOiAnU2Vzc2lvbklkJyxcbiAgICAgICAgVmFsdWU6ICc3MTRjNDkzNS1hMjJkLTQwMGQtODU2My1mYmJkOGJmYzIzMDEnLFxuICAgICAgfSxcbiAgICBdLFxuICAgIEVycm9yTnVtYmVyOiAnMCcsXG4gIH0sXG4gIHtcbiAgICBDcmVhdGlvblRpbWU6ICcyMDIxLTA1LTE4VDE3OjQ5OjExJyxcbiAgICBJZDogJzRlNjIxNTYzLTM5NGYtNDJhOS04YThhLTg1NDllMWZmYTc3MScsXG4gICAgT3BlcmF0aW9uOiAnQWRkIHNlcnZpY2UgcHJpbmNpcGFsLicsXG4gICAgT3JnYW5pemF0aW9uSWQ6ICcwZmVhNGUwMy04MTQ2LTQ1M2ItYjg4OS01NGI0YmQxMTU2NWInLFxuICAgIFJlY29yZFR5cGU6IDgsXG4gICAgUmVzdWx0U3RhdHVzOiAnU3VjY2VzcycsXG4gICAgVXNlcktleTogJ05vdCBBdmFpbGFibGUnLFxuICAgIFVzZXJUeXBlOiA0LFxuICAgIFZlcnNpb246IDEsXG4gICAgV29ya2xvYWQ6ICdBenVyZUFjdGl2ZURpcmVjdG9yeScsXG4gICAgT2JqZWN0SWQ6ICdmNzM4ZWYxNC00N2RjLTQ1NjQtYjUzYi00NTA2OTQ4NGNjYzcnLFxuICAgIFVzZXJJZDogJ1NlcnZpY2VQcmluY2lwYWxfNGJmODA3ODgtMGVjNC00ODFhLWFlN2ItYjcxNjQ3YmYzYjU3JyxcbiAgICBBenVyZUFjdGl2ZURpcmVjdG9yeUV2ZW50VHlwZTogMSxcbiAgICBFeHRlbmRlZFByb3BlcnRpZXM6IFtcbiAgICAgIHtcbiAgICAgICAgTmFtZTogJ2FkZGl0aW9uYWxEZXRhaWxzJyxcbiAgICAgICAgVmFsdWU6ICd7fScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBOYW1lOiAnZXh0ZW5kZWRBdWRpdEV2ZW50Q2F0ZWdvcnknLFxuICAgICAgICBWYWx1ZTogJ1NlcnZpY2VQcmluY2lwYWwnLFxuICAgICAgfSxcbiAgICBdLFxuICAgIE1vZGlmaWVkUHJvcGVydGllczogW1xuICAgICAge1xuICAgICAgICBOYW1lOiAnQWNjb3VudEVuYWJsZWQnLFxuICAgICAgICBOZXdWYWx1ZTogJ1tcXHJcXG4gIHRydWVcXHJcXG5dJyxcbiAgICAgICAgT2xkVmFsdWU6ICdbXScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBOYW1lOiAnQXBwUHJpbmNpcGFsSWQnLFxuICAgICAgICBOZXdWYWx1ZTogJ1tcXHJcXG4gIFwiZjczOGVmMTQtNDdkYy00NTY0LWI1M2ItNDUwNjk0ODRjY2M3XCJcXHJcXG5dJyxcbiAgICAgICAgT2xkVmFsdWU6ICdbXScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBOYW1lOiAnRGlzcGxheU5hbWUnLFxuICAgICAgICBOZXdWYWx1ZTogJ1tcXHJcXG4gIFwiTWFya2V0cGxhY2UgQXBpXCJcXHJcXG5dJyxcbiAgICAgICAgT2xkVmFsdWU6ICdbXScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBOYW1lOiAnU2VydmljZVByaW5jaXBhbE5hbWUnLFxuICAgICAgICBOZXdWYWx1ZTogJ1tcXHJcXG4gIFwiZjczOGVmMTQtNDdkYy00NTY0LWI1M2ItNDUwNjk0ODRjY2M3XCJcXHJcXG5dJyxcbiAgICAgICAgT2xkVmFsdWU6ICdbXScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBOYW1lOiAnQ3JlZGVudGlhbCcsXG4gICAgICAgIE5ld1ZhbHVlOlxuICAgICAgICAgICdbXFxyXFxuICB7XFxyXFxuICAgIFwiQ3JlZGVudGlhbFR5cGVcIjogMixcXHJcXG4gICAgXCJLZXlTdG9yZUlkXCI6IFwiMjkxMTU0ZjAtYTlmNS00NWJiLTg3YmUtOWM4ZWU1YjZkNjJjXCIsXFxyXFxuICAgIFwiS2V5R3JvdXBJZFwiOiBcIjFjNWFhMDRiLWRlYTUtNDI4NC05OTA4LTQ3ZWRkMWUxMmQxM1wiXFxyXFxuICB9XFxyXFxuXScsXG4gICAgICAgIE9sZFZhbHVlOiAnW10nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgTmFtZTogJ0luY2x1ZGVkIFVwZGF0ZWQgUHJvcGVydGllcycsXG4gICAgICAgIE5ld1ZhbHVlOiAnQWNjb3VudEVuYWJsZWQsIEFwcFByaW5jaXBhbElkLCBEaXNwbGF5TmFtZSwgU2VydmljZVByaW5jaXBhbE5hbWUsIENyZWRlbnRpYWwnLFxuICAgICAgICBPbGRWYWx1ZTogJycsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBOYW1lOiAnVGFyZ2V0SWQuU2VydmljZVByaW5jaXBhbE5hbWVzJyxcbiAgICAgICAgTmV3VmFsdWU6ICdmNzM4ZWYxNC00N2RjLTQ1NjQtYjUzYi00NTA2OTQ4NGNjYzcnLFxuICAgICAgICBPbGRWYWx1ZTogJycsXG4gICAgICB9LFxuICAgIF0sXG4gICAgQWN0b3I6IFtcbiAgICAgIHtcbiAgICAgICAgSUQ6ICdXaW5kb3dzIEF6dXJlIFNlcnZpY2UgTWFuYWdlbWVudCBBUEknLFxuICAgICAgICBUeXBlOiAxLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgSUQ6ICc3OTdmNDg0Ni1iYTAwLTRmZDctYmE0My1kYWMxZjhmNjMwMTMnLFxuICAgICAgICBUeXBlOiAyLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgSUQ6ICdTZXJ2aWNlUHJpbmNpcGFsXzRiZjgwNzg4LTBlYzQtNDgxYS1hZTdiLWI3MTY0N2JmM2I1NycsXG4gICAgICAgIFR5cGU6IDIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBJRDogJzRiZjgwNzg4LTBlYzQtNDgxYS1hZTdiLWI3MTY0N2JmM2I1NycsXG4gICAgICAgIFR5cGU6IDIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBJRDogJ1NlcnZpY2VQcmluY2lwYWwnLFxuICAgICAgICBUeXBlOiAyLFxuICAgICAgfSxcbiAgICBdLFxuICAgIEFjdG9yQ29udGV4dElkOiAnMGZlYTRlMDMtODE0Ni00NTNiLWI4ODktNTRiNGJkMTE1NjViJyxcbiAgICBJbnRlclN5c3RlbXNJZDogJzljZmJhM2JiLWI0NzgtNDRhYS1hMTQwLTQ2NWVlN2YyOTI3NCcsXG4gICAgSW50cmFTeXN0ZW1JZDogJzIxMDUxODA1LTI0MTMtNTk0YS1hYjVkLTAwNjAxNDAwNTM0OCcsXG4gICAgU3VwcG9ydFRpY2tldElkOiAnJyxcbiAgICBUYXJnZXQ6IFtcbiAgICAgIHtcbiAgICAgICAgSUQ6ICdTZXJ2aWNlUHJpbmNpcGFsX2Y2ZDJlYWJjLWQwMjAtNDY0My04MGE4LTJiOTJiMTYzZDFkZScsXG4gICAgICAgIFR5cGU6IDIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBJRDogJ2Y2ZDJlYWJjLWQwMjAtNDY0My04MGE4LTJiOTJiMTYzZDFkZScsXG4gICAgICAgIFR5cGU6IDIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBJRDogJ1NlcnZpY2VQcmluY2lwYWwnLFxuICAgICAgICBUeXBlOiAyLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgSUQ6ICdNYXJrZXRwbGFjZSBBcGknLFxuICAgICAgICBUeXBlOiAxLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgSUQ6ICdmNzM4ZWYxNC00N2RjLTQ1NjQtYjUzYi00NTA2OTQ4NGNjYzcnLFxuICAgICAgICBUeXBlOiAyLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgSUQ6ICdmNzM4ZWYxNC00N2RjLTQ1NjQtYjUzYi00NTA2OTQ4NGNjYzcnLFxuICAgICAgICBUeXBlOiA0LFxuICAgICAgfSxcbiAgICBdLFxuICAgIFRhcmdldENvbnRleHRJZDogJzBmZWE0ZTAzLTgxNDYtNDUzYi1iODg5LTU0YjRiZDExNTY1YicsXG4gIH0sXG4gIHtcbiAgICBDcmVhdGlvblRpbWU6ICcyMDIxLTA1LTE4VDIxOjQyOjI1JyxcbiAgICBJZDogJ2FmNGU1NTJmLTBiY2EtNGIwMi05MmM5LTRiZDQzMGYyNGY3NScsXG4gICAgT3BlcmF0aW9uOiAnQ2hhbmdlIHVzZXIgbGljZW5zZS4nLFxuICAgIE9yZ2FuaXphdGlvbklkOiAnMGZlYTRlMDMtODE0Ni00NTNiLWI4ODktNTRiNGJkMTE1NjViJyxcbiAgICBSZWNvcmRUeXBlOiA4LFxuICAgIFJlc3VsdFN0YXR1czogJ1N1Y2Nlc3MnLFxuICAgIFVzZXJLZXk6ICcxMDAzMjAwMTQwODBEM0FEQHdhenVoLmNvbScsXG4gICAgVXNlclR5cGU6IDAsXG4gICAgVmVyc2lvbjogMSxcbiAgICBXb3JrbG9hZDogJ0F6dXJlQWN0aXZlRGlyZWN0b3J5JyxcbiAgICBPYmplY3RJZDogJ2Zha2VAZW1haWwubm90JyxcbiAgICBVc2VySWQ6ICdmYWtlQGVtYWlsLm5vdCcsXG4gICAgQXp1cmVBY3RpdmVEaXJlY3RvcnlFdmVudFR5cGU6IDEsXG4gICAgRXh0ZW5kZWRQcm9wZXJ0aWVzOiBbXG4gICAgICB7XG4gICAgICAgIE5hbWU6ICdhZGRpdGlvbmFsRGV0YWlscycsXG4gICAgICAgIFZhbHVlOiAne30nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgTmFtZTogJ2V4dGVuZGVkQXVkaXRFdmVudENhdGVnb3J5JyxcbiAgICAgICAgVmFsdWU6ICdVc2VyJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBNb2RpZmllZFByb3BlcnRpZXM6IFtdLFxuICAgIEFjdG9yOiBbXG4gICAgICB7XG4gICAgICAgIElEOiAnZmFrZUBlbWFpbC5ub3QnLFxuICAgICAgICBUeXBlOiA1LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgSUQ6ICcxMDAzMjAwMTQwODBEM0FEJyxcbiAgICAgICAgVHlwZTogMyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIElEOiAnVXNlcl85MTBlZDVjYS00ZWNmLTQxNGMtYTFiZS1kNTM1MTFiZmUxYTUnLFxuICAgICAgICBUeXBlOiAyLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgSUQ6ICc5MTBlZDVjYS00ZWNmLTQxNGMtYTFiZS1kNTM1MTFiZmUxYTUnLFxuICAgICAgICBUeXBlOiAyLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgSUQ6ICdVc2VyJyxcbiAgICAgICAgVHlwZTogMixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBBY3RvckNvbnRleHRJZDogJzBmZWE0ZTAzLTgxNDYtNDUzYi1iODg5LTU0YjRiZDExNTY1YicsXG4gICAgSW50ZXJTeXN0ZW1zSWQ6ICcxZmQwOWQ2Yi01NGQzLTRhNTgtYWNmZS03MWNjMmM0MjlkOTcnLFxuICAgIEludHJhU3lzdGVtSWQ6ICcwYThhZTIwMS1lNDA0LTRmNmYtOTlkYi1hM2M5MmE1YmQwMjInLFxuICAgIFN1cHBvcnRUaWNrZXRJZDogJycsXG4gICAgVGFyZ2V0OiBbXG4gICAgICB7XG4gICAgICAgIElEOiAnVXNlcl85MTBlZDVjYS00ZWNmLTQxNGMtYTFiZS1kNTM1MTFiZmUxYTUnLFxuICAgICAgICBUeXBlOiAyLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgSUQ6ICc5MTBlZDVjYS00ZWNmLTQxNGMtYTFiZS1kNTM1MTFiZmUxYTUnLFxuICAgICAgICBUeXBlOiAyLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgSUQ6ICdVc2VyJyxcbiAgICAgICAgVHlwZTogMixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIElEOiAnZmFrZUBlbWFpbC5ub3QnLFxuICAgICAgICBUeXBlOiA1LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgSUQ6ICcxMDAzMjAwMTQwODBEM0FEJyxcbiAgICAgICAgVHlwZTogMyxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBUYXJnZXRDb250ZXh0SWQ6ICcwZmVhNGUwMy04MTQ2LTQ1M2ItYjg4OS01NGI0YmQxMTU2NWInLFxuICB9LFxuICB7XG4gICAgQ3JlYXRpb25UaW1lOiAnMjAyMS0wNS0xOFQyMTo0MjoyNScsXG4gICAgSWQ6ICdiMjdlYWI4NC0xZWY3LTQzNzItYmM2OC03MjEzYWY4YWIzZmInLFxuICAgIE9wZXJhdGlvbjogJ1VwZGF0ZSB1c2VyLicsXG4gICAgT3JnYW5pemF0aW9uSWQ6ICcwZmVhNGUwMy04MTQ2LTQ1M2ItYjg4OS01NGI0YmQxMTU2NWInLFxuICAgIFJlY29yZFR5cGU6IDgsXG4gICAgUmVzdWx0U3RhdHVzOiAnU3VjY2VzcycsXG4gICAgVXNlcktleTogJzEwMDMyMDAxNDA4MEQzQURAd2F6dWguY29tJyxcbiAgICBVc2VyVHlwZTogMCxcbiAgICBWZXJzaW9uOiAxLFxuICAgIFdvcmtsb2FkOiAnQXp1cmVBY3RpdmVEaXJlY3RvcnknLFxuICAgIE9iamVjdElkOiAnZmFrZUBlbWFpbC5ub3QnLFxuICAgIFVzZXJJZDogJ2Zha2VAZW1haWwubm90JyxcbiAgICBBenVyZUFjdGl2ZURpcmVjdG9yeUV2ZW50VHlwZTogMSxcbiAgICBFeHRlbmRlZFByb3BlcnRpZXM6IFtcbiAgICAgIHtcbiAgICAgICAgTmFtZTogJ2FkZGl0aW9uYWxEZXRhaWxzJyxcbiAgICAgICAgVmFsdWU6ICd7XCJVc2VyVHlwZVwiOlwiTWVtYmVyXCJ9JyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIE5hbWU6ICdleHRlbmRlZEF1ZGl0RXZlbnRDYXRlZ29yeScsXG4gICAgICAgIFZhbHVlOiAnVXNlcicsXG4gICAgICB9LFxuICAgIF0sXG4gICAgTW9kaWZpZWRQcm9wZXJ0aWVzOiBbXG4gICAgICB7XG4gICAgICAgIE5hbWU6ICdBc3NpZ25lZExpY2Vuc2UnLFxuICAgICAgICBOZXdWYWx1ZTpcbiAgICAgICAgICAnW1xcclxcbiAgXCJbU2t1TmFtZT1QT1dFUl9CSV9TVEFOREFSRCwgQWNjb3VudElkPTBmZWE0ZTAzLTgxNDYtNDUzYi1iODg5LTU0YjRiZDExNTY1YiwgU2t1SWQ9YTQwM2ViY2MtZmFlMC00Y2EyLThjOGMtN2E5MDdmZDZjMjM1LCBEaXNhYmxlZFBsYW5zPVtdXVwiXFxyXFxuXScsXG4gICAgICAgIE9sZFZhbHVlOiAnW10nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgTmFtZTogJ0Fzc2lnbmVkUGxhbicsXG4gICAgICAgIE5ld1ZhbHVlOlxuICAgICAgICAgICdbXFxyXFxuICB7XFxyXFxuICAgIFwiU3Vic2NyaWJlZFBsYW5JZFwiOiBcImM5NzZkMDdmLWZkMGYtNDllYi1iZGMyLTI2YzE3NDgxZTFjNVwiLFxcclxcbiAgICBcIlNlcnZpY2VJbnN0YW5jZVwiOiBcIkF6dXJlQW5hbHlzaXMvU0RGXCIsXFxyXFxuICAgIFwiQ2FwYWJpbGl0eVN0YXR1c1wiOiAwLFxcclxcbiAgICBcIkFzc2lnbmVkVGltZXN0YW1wXCI6IFwiMjAyMS0wNS0xOFQyMTo0MjoyNS4zODk0MTY0WlwiLFxcclxcbiAgICBcIkluaXRpYWxTdGF0ZVwiOiBudWxsLFxcclxcbiAgICBcIkNhcGFiaWxpdHlcIjogbnVsbCxcXHJcXG4gICAgXCJTZXJ2aWNlUGxhbklkXCI6IFwiMjA0OWU1MjUtYjg1OS00MDFiLWIyYTAtZTBhMzFjNGIxZmU0XCJcXHJcXG4gIH1cXHJcXG5dJyxcbiAgICAgICAgT2xkVmFsdWU6ICdbXScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBOYW1lOiAnSW5jbHVkZWQgVXBkYXRlZCBQcm9wZXJ0aWVzJyxcbiAgICAgICAgTmV3VmFsdWU6ICdBc3NpZ25lZExpY2Vuc2UsIEFzc2lnbmVkUGxhbicsXG4gICAgICAgIE9sZFZhbHVlOiAnJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIE5hbWU6ICdUYXJnZXRJZC5Vc2VyVHlwZScsXG4gICAgICAgIE5ld1ZhbHVlOiAnTWVtYmVyJyxcbiAgICAgICAgT2xkVmFsdWU6ICcnLFxuICAgICAgfSxcbiAgICBdLFxuICAgIEFjdG9yOiBbXG4gICAgICB7XG4gICAgICAgIElEOiAnZmFrZUBlbWFpbC5ub3QnLFxuICAgICAgICBUeXBlOiA1LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgSUQ6ICcxMDAzMjAwMTQwODBEM0FEJyxcbiAgICAgICAgVHlwZTogMyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIElEOiAnVXNlcl85MTBlZDVjYS00ZWNmLTQxNGMtYTFiZS1kNTM1MTFiZmUxYTUnLFxuICAgICAgICBUeXBlOiAyLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgSUQ6ICc5MTBlZDVjYS00ZWNmLTQxNGMtYTFiZS1kNTM1MTFiZmUxYTUnLFxuICAgICAgICBUeXBlOiAyLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgSUQ6ICdVc2VyJyxcbiAgICAgICAgVHlwZTogMixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBBY3RvckNvbnRleHRJZDogJzBmZWE0ZTAzLTgxNDYtNDUzYi1iODg5LTU0YjRiZDExNTY1YicsXG4gICAgSW50ZXJTeXN0ZW1zSWQ6ICcxZmQwOWQ2Yi01NGQzLTRhNTgtYWNmZS03MWNjMmM0MjlkOTcnLFxuICAgIEludHJhU3lzdGVtSWQ6ICcwYThhZTIwMS1lNDA0LTRmNmYtOTlkYi1hM2M5MmE1YmQwMjInLFxuICAgIFN1cHBvcnRUaWNrZXRJZDogJycsXG4gICAgVGFyZ2V0OiBbXG4gICAgICB7XG4gICAgICAgIElEOiAnVXNlcl85MTBlZDVjYS00ZWNmLTQxNGMtYTFiZS1kNTM1MTFiZmUxYTUnLFxuICAgICAgICBUeXBlOiAyLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgSUQ6ICc5MTBlZDVjYS00ZWNmLTQxNGMtYTFiZS1kNTM1MTFiZmUxYTUnLFxuICAgICAgICBUeXBlOiAyLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgSUQ6ICdVc2VyJyxcbiAgICAgICAgVHlwZTogMixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIElEOiAnZmFrZUBlbWFpbC5ub3QnLFxuICAgICAgICBUeXBlOiA1LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgSUQ6ICcxMDAzMjAwMTQwODBEM0FEJyxcbiAgICAgICAgVHlwZTogMyxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBUYXJnZXRDb250ZXh0SWQ6ICcwZmVhNGUwMy04MTQ2LTQ1M2ItYjg4OS01NGI0YmQxMTU2NWInLFxuICB9LFxuICB7XG4gICAgQ3JlYXRpb25UaW1lOiAnMjAyMS0wNS0yMFQxNzo0MzowMCcsXG4gICAgSWQ6ICc4YzNkMDIxNS02NmYwLTQxYjAtMzIwNS0wOGQ5MWJiNmI2M2MnLFxuICAgIE9wZXJhdGlvbjogJ1NoYXJpbmdQb2xpY3lDaGFuZ2VkJyxcbiAgICBPcmdhbml6YXRpb25JZDogJzBmZWE0ZTAzLTgxNDYtNDUzYi1iODg5LTU0YjRiZDExNTY1YicsXG4gICAgUmVjb3JkVHlwZTogNCxcbiAgICBVc2VyS2V5OiAnaTowaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDE0MDgwZDNhZEBsaXZlLmNvbScsXG4gICAgVXNlclR5cGU6IDAsXG4gICAgVmVyc2lvbjogMSxcbiAgICBXb3JrbG9hZDogJ09uZURyaXZlJyxcbiAgICBDbGllbnRJUDogJzIwLjE5MC4xNTcuMjcnLFxuICAgIE9iamVjdElkOiAnaHR0cHM6Ly93YXp1aC1teS5zaGFyZXBvaW50LmNvbS9wZXJzb25hbC90b21hc190dXJpbmFfd2F6dWhfY29tJyxcbiAgICBVc2VySWQ6ICdmYWtlQGVtYWlsLm5vdCcsXG4gICAgQ29ycmVsYXRpb25JZDogJ2ZkOWFjNzlkLTExMDAtNDhhYS05MmM1LTQwYTczYTFkNDQzZicsXG4gICAgRXZlbnRTb3VyY2U6ICdTaGFyZVBvaW50JyxcbiAgICBJdGVtVHlwZTogJ1NpdGUnLFxuICAgIFNpdGU6ICdmNDlmZWFlNC0wMzNkLTQwMjgtOTdkMS0zYWNkNTUzNDFmNjknLFxuICAgIFVzZXJBZ2VudDpcbiAgICAgICdNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvOTAuMC40NDMwLjIxMiBTYWZhcmkvNTM3LjM2JyxcbiAgICBNb2RpZmllZFByb3BlcnRpZXM6IFtcbiAgICAgIHtcbiAgICAgICAgTmFtZTogJ1NoYXJlVXNpbmdBbm9ueW1vdXNMaW5rcycsXG4gICAgICAgIE5ld1ZhbHVlOiAnRW5hYmxlZCcsXG4gICAgICAgIE9sZFZhbHVlOiAnRGlzYWJsZWQnLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgQ3JlYXRpb25UaW1lOiAnMjAyMS0wNS0yMFQxNzo0MzowMCcsXG4gICAgSWQ6ICczNWExYjUxNS0yYTBlLTRiZDYtZDBhMy0wOGQ5MWJiNmI2MzknLFxuICAgIE9wZXJhdGlvbjogJ1NpdGVDb2xsZWN0aW9uQ3JlYXRlZCcsXG4gICAgT3JnYW5pemF0aW9uSWQ6ICcwZmVhNGUwMy04MTQ2LTQ1M2ItYjg4OS01NGI0YmQxMTU2NWInLFxuICAgIFJlY29yZFR5cGU6IDQsXG4gICAgVXNlcktleTogJ2k6MGguZnxtZW1iZXJzaGlwfDEwMDMyMDAxNDA4MGQzYWRAbGl2ZS5jb20nLFxuICAgIFVzZXJUeXBlOiAwLFxuICAgIFZlcnNpb246IDEsXG4gICAgV29ya2xvYWQ6ICdPbmVEcml2ZScsXG4gICAgQ2xpZW50SVA6ICcyMC4xOTAuMTU3LjI3JyxcbiAgICBPYmplY3RJZDogJ2h0dHBzOi8vd2F6dWgtbXkuc2hhcmVwb2ludC5jb20vcGVyc29uYWwvdG9tYXNfdHVyaW5hX3dhenVoX2NvbScsXG4gICAgVXNlcklkOiAnZmFrZUBlbWFpbC5ub3QnLFxuICAgIENvcnJlbGF0aW9uSWQ6ICdmZDlhYzc5ZC0xMTAwLTQ4YWEtOTJjNS00MGE3M2ExZDQ0M2YnLFxuICAgIEV2ZW50U291cmNlOiAnU2hhcmVQb2ludCcsXG4gICAgSXRlbVR5cGU6ICdTaXRlJyxcbiAgICBTaXRlOiAnZjQ5ZmVhZTQtMDMzZC00MDI4LTk3ZDEtM2FjZDU1MzQxZjY5JyxcbiAgICBVc2VyQWdlbnQ6XG4gICAgICAnTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzkwLjAuNDQzMC4yMTIgU2FmYXJpLzUzNy4zNicsXG4gICAgRXZlbnREYXRhOlxuICAgICAgJzxTaXRlQ3JlYXRpb25Tb3VyY2U+QVBJPC9TaXRlQ3JlYXRpb25Tb3VyY2U+PFRlbmFudFNldHRpbmdzLlNob3dDcmVhdGVTaXRlQ29tbWFuZD5UcnVlPC9UZW5hbnRTZXR0aW5ncy5TaG93Q3JlYXRlU2l0ZUNvbW1hbmQ+PFRlbmFudFNldHRpbmdzLlVzZUN1c3RvbVNpdGVDcmVhdGlvbkZvcm0+RmFsc2U8L1RlbmFudFNldHRpbmdzLlVzZUN1c3RvbVNpdGVDcmVhdGlvbkZvcm0+JyxcbiAgfSxcbiAge1xuICAgIENyZWF0aW9uVGltZTogJzIwMjEtMDUtMjBUMTc6NDM6MDAnLFxuICAgIElkOiAnMzQ0ZjkxMzktZjQzNy00MjkwLTk1NjYtMDhkOTFiYjZiNjFmJyxcbiAgICBPcGVyYXRpb246ICdTaXRlQ29sbGVjdGlvbkFkbWluUmVtb3ZlZCcsXG4gICAgT3JnYW5pemF0aW9uSWQ6ICcwZmVhNGUwMy04MTQ2LTQ1M2ItYjg4OS01NGI0YmQxMTU2NWInLFxuICAgIFJlY29yZFR5cGU6IDE0LFxuICAgIFVzZXJLZXk6ICdpOjBoLmZ8bWVtYmVyc2hpcHwxMDAzMjAwMTQwODBkM2FkQGxpdmUuY29tJyxcbiAgICBVc2VyVHlwZTogMCxcbiAgICBWZXJzaW9uOiAxLFxuICAgIFdvcmtsb2FkOiAnT25lRHJpdmUnLFxuICAgIENsaWVudElQOiAnMjAuMTkwLjE1Ny4yNycsXG4gICAgT2JqZWN0SWQ6ICdodHRwczovL3dhenVoLW15LnNoYXJlcG9pbnQuY29tL3BlcnNvbmFsL3RvbWFzX3R1cmluYV93YXp1aF9jb20nLFxuICAgIFVzZXJJZDogJ2Zha2VAZW1haWwubm90JyxcbiAgICBDb3JyZWxhdGlvbklkOiAnZmQ5YWM3OWQtMTEwMC00OGFhLTkyYzUtNDBhNzNhMWQ0NDNmJyxcbiAgICBFdmVudFNvdXJjZTogJ1NoYXJlUG9pbnQnLFxuICAgIEl0ZW1UeXBlOiAnV2ViJyxcbiAgICBTaXRlOiAnZjQ5ZmVhZTQtMDMzZC00MDI4LTk3ZDEtM2FjZDU1MzQxZjY5JyxcbiAgICBVc2VyQWdlbnQ6XG4gICAgICAnTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzkwLjAuNDQzMC4yMTIgU2FmYXJpLzUzNy4zNicsXG4gICAgV2ViSWQ6ICdhOWQxNWIyMy02YWM5LTQzYzUtYWYzYy1iNGEwOTE2NjMxYzEnLFxuICAgIE1vZGlmaWVkUHJvcGVydGllczogW1xuICAgICAge1xuICAgICAgICBOYW1lOiAnU2l0ZUFkbWluJyxcbiAgICAgICAgTmV3VmFsdWU6ICcnLFxuICAgICAgICBPbGRWYWx1ZTogJycsXG4gICAgICB9LFxuICAgIF0sXG4gICAgVGFyZ2V0VXNlck9yR3JvdXBUeXBlOiAnTWVtYmVyJyxcbiAgICBTaXRlVXJsOiAnaHR0cHM6Ly93YXp1aC1teS5zaGFyZXBvaW50LmNvbS9wZXJzb25hbC90b21hc190dXJpbmFfd2F6dWhfY29tJyxcbiAgICBUYXJnZXRVc2VyT3JHcm91cE5hbWU6ICdTSEFSRVBPSU5UXFxcXHN5c3RlbScsXG4gIH0sXG4gIHtcbiAgICBDcmVhdGlvblRpbWU6ICcyMDIxLTA1LTIwVDE3OjQzOjAwJyxcbiAgICBJZDogJ2QzNmU0YjRkLTFlOGItNDYzNC02ZGQ4LTA4ZDkxYmI2YjYxOCcsXG4gICAgT3BlcmF0aW9uOiAnU2l0ZUNvbGxlY3Rpb25BZG1pbkFkZGVkJyxcbiAgICBPcmdhbml6YXRpb25JZDogJzBmZWE0ZTAzLTgxNDYtNDUzYi1iODg5LTU0YjRiZDExNTY1YicsXG4gICAgUmVjb3JkVHlwZTogMTQsXG4gICAgVXNlcktleTogJ2k6MGguZnxtZW1iZXJzaGlwfDEwMDMyMDAxNDA4MGQzYWRAbGl2ZS5jb20nLFxuICAgIFVzZXJUeXBlOiAwLFxuICAgIFZlcnNpb246IDEsXG4gICAgV29ya2xvYWQ6ICdPbmVEcml2ZScsXG4gICAgQ2xpZW50SVA6ICcyMC4xOTAuMTU3LjI3JyxcbiAgICBPYmplY3RJZDogJ2h0dHBzOi8vd2F6dWgtbXkuc2hhcmVwb2ludC5jb20vcGVyc29uYWwvdG9tYXNfdHVyaW5hX3dhenVoX2NvbScsXG4gICAgVXNlcklkOiAnZmFrZUBlbWFpbC5ub3QnLFxuICAgIENvcnJlbGF0aW9uSWQ6ICdmZDlhYzc5ZC0xMTAwLTQ4YWEtOTJjNS00MGE3M2ExZDQ0M2YnLFxuICAgIEV2ZW50U291cmNlOiAnU2hhcmVQb2ludCcsXG4gICAgSXRlbVR5cGU6ICdXZWInLFxuICAgIFNpdGU6ICdmNDlmZWFlNC0wMzNkLTQwMjgtOTdkMS0zYWNkNTUzNDFmNjknLFxuICAgIFVzZXJBZ2VudDpcbiAgICAgICdNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvOTAuMC40NDMwLjIxMiBTYWZhcmkvNTM3LjM2JyxcbiAgICBXZWJJZDogJ2E5ZDE1YjIzLTZhYzktNDNjNS1hZjNjLWI0YTA5MTY2MzFjMScsXG4gICAgTW9kaWZpZWRQcm9wZXJ0aWVzOiBbXG4gICAgICB7XG4gICAgICAgIE5hbWU6ICdTaXRlQWRtaW4nLFxuICAgICAgICBOZXdWYWx1ZTogJ2Zha2VAZW1haWwubm90JyxcbiAgICAgICAgT2xkVmFsdWU6ICcnLFxuICAgICAgfSxcbiAgICBdLFxuICAgIFRhcmdldFVzZXJPckdyb3VwVHlwZTogJ01lbWJlcicsXG4gICAgU2l0ZVVybDogJ2h0dHBzOi8vd2F6dWgtbXkuc2hhcmVwb2ludC5jb20vcGVyc29uYWwvdG9tYXNfdHVyaW5hX3dhenVoX2NvbScsXG4gICAgVGFyZ2V0VXNlck9yR3JvdXBOYW1lOiAnZmFrZUBlbWFpbC5ub3QnLFxuICB9LFxuICB7XG4gICAgQ3JlYXRpb25UaW1lOiAnMjAyMS0wNS0yMFQxNzo0MzoyMicsXG4gICAgSWQ6ICcwZDZhNjJkMy1lNGJkLTQ0ZWUtY2U4ZC0wOGQ5MWJiNmMzOTInLFxuICAgIE9wZXJhdGlvbjogJ1BhZ2VWaWV3ZWQnLFxuICAgIE9yZ2FuaXphdGlvbklkOiAnMGZlYTRlMDMtODE0Ni00NTNiLWI4ODktNTRiNGJkMTE1NjViJyxcbiAgICBSZWNvcmRUeXBlOiA0LFxuICAgIFVzZXJLZXk6ICdpOjBoLmZ8bWVtYmVyc2hpcHwxMDAzMjAwMTQwODBkM2FkQGxpdmUuY29tJyxcbiAgICBVc2VyVHlwZTogMCxcbiAgICBWZXJzaW9uOiAxLFxuICAgIFdvcmtsb2FkOiAnU2hhcmVQb2ludCcsXG4gICAgQ2xpZW50SVA6ICcxOTAuMTYuOS4xNzYnLFxuICAgIE9iamVjdElkOiAnaHR0cHM6Ly93YXp1aC5zaGFyZXBvaW50LmNvbS9fbGF5b3V0cy8xNS9DcmVhdGVHcm91cC5hc3B4JyxcbiAgICBVc2VySWQ6ICdmYWtlQGVtYWlsLm5vdCcsXG4gICAgQ29ycmVsYXRpb25JZDogJ2NjZDBjOTlmLTMwOWItMjAwMC1kZjEzLTNmY2NhOWE4YzhlMScsXG4gICAgQ3VzdG9tVW5pcXVlSWQ6IHRydWUsXG4gICAgRXZlbnRTb3VyY2U6ICdTaGFyZVBvaW50JyxcbiAgICBJdGVtVHlwZTogJ1BhZ2UnLFxuICAgIExpc3RJdGVtVW5pcXVlSWQ6ICc1OWE4NDMzZC05YmI4LWNmZWYtNjViNy1lZjM1ZGUwMGM4ZjYnLFxuICAgIFNpdGU6ICdmN2ZiYjgwNS01ZjZiLTQ5NTAtYjY4MS0yMzY1ZWI0NjA4MWYnLFxuICAgIFVzZXJBZ2VudDpcbiAgICAgICdNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvOTAuMC40NDMwLjIxMiBTYWZhcmkvNTM3LjM2JyxcbiAgICBXZWJJZDogJzNiNTZkYjQ5LTYwZTMtNDEwZS1hY2JkLWQ4NzY1NDY3Mzg4YScsXG4gIH0sXG4gIHtcbiAgICBDcmVhdGlvblRpbWU6ICcyMDIxLTA1LTIwVDE3OjQ1OjU3JyxcbiAgICBJZDogJzE4YmIzNTFiLTQ5ZTEtNDdkZi04ZjRkLTA4ZDkxYmI3MWZmZCcsXG4gICAgT3BlcmF0aW9uOiAnQWRkZWRUb0dyb3VwJyxcbiAgICBPcmdhbml6YXRpb25JZDogJzBmZWE0ZTAzLTgxNDYtNDUzYi1iODg5LTU0YjRiZDExNTY1YicsXG4gICAgUmVjb3JkVHlwZTogMTQsXG4gICAgVXNlcktleTogJ2k6MGguZnxtZW1iZXJzaGlwfDEwMDMyMDAxNDA4MGQzYWRAbGl2ZS5jb20nLFxuICAgIFVzZXJUeXBlOiAwLFxuICAgIFZlcnNpb246IDEsXG4gICAgV29ya2xvYWQ6ICdTaGFyZVBvaW50JyxcbiAgICBDbGllbnRJUDogJzE5MC4xNi45LjE3NicsXG4gICAgT2JqZWN0SWQ6ICdodHRwczovL3dhenVoLnNoYXJlcG9pbnQuY29tL3NpdGVzL1Rlc3RTaGFyZVBvaW50JyxcbiAgICBVc2VySWQ6ICdmYWtlQGVtYWlsLm5vdCcsXG4gICAgQ29ycmVsYXRpb25JZDogJ2YxZDBjOTlmLTMwOTQtMjAwMC1kYTgyLTQ1NGYwMzRjYTYyOScsXG4gICAgRXZlbnRTb3VyY2U6ICdTaGFyZVBvaW50JyxcbiAgICBJdGVtVHlwZTogJ1dlYicsXG4gICAgU2l0ZTogJ2RkNThlZjA4LWZhZWEtNGNiNS04NDdhLTM1YmI1YzAxZTc1NycsXG4gICAgVXNlckFnZW50OlxuICAgICAgJ01vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS85MC4wLjQ0MzAuMjEyIFNhZmFyaS81MzcuMzYnLFxuICAgIFdlYklkOiAnMDBjMzI1NTUtZTBkOC00MjVmLTlmYmQtZWY1NTM5YmZlY2Y3JyxcbiAgICBFdmVudERhdGE6ICc8R3JvdXA+U2l0ZSBPd25lcnM8L0dyb3VwPicsXG4gICAgVGFyZ2V0VXNlck9yR3JvdXBUeXBlOiAnTWVtYmVyJyxcbiAgICBTaXRlVXJsOiAnaHR0cHM6Ly93YXp1aC5zaGFyZXBvaW50LmNvbS9zaXRlcy9UZXN0U2hhcmVQb2ludCcsXG4gICAgVGFyZ2V0VXNlck9yR3JvdXBOYW1lOiAnU0hBUkVQT0lOVFxcXFxzeXN0ZW0nLFxuICB9LFxuICB7XG4gICAgQ3JlYXRpb25UaW1lOiAnMjAyMS0wNS0yMFQxNzo0NjoyNicsXG4gICAgSWQ6ICcyOWJkZTg0YS1kM2VjLTQzODgtNDYwMC0wOGQ5MWJiNzMwYmMnLFxuICAgIE9wZXJhdGlvbjogJ0ZpbGVBY2Nlc3NlZCcsXG4gICAgT3JnYW5pemF0aW9uSWQ6ICcwZmVhNGUwMy04MTQ2LTQ1M2ItYjg4OS01NGI0YmQxMTU2NWInLFxuICAgIFJlY29yZFR5cGU6IDYsXG4gICAgVXNlcktleTogJ2k6MGguZnxtZW1iZXJzaGlwfDEwMDMyMDAxNDA4MGQzYWRAbGl2ZS5jb20nLFxuICAgIFVzZXJUeXBlOiAwLFxuICAgIFZlcnNpb246IDEsXG4gICAgV29ya2xvYWQ6ICdTaGFyZVBvaW50JyxcbiAgICBDbGllbnRJUDogJzE5MC4xNi45LjE3NicsXG4gICAgT2JqZWN0SWQ6XG4gICAgICAnaHR0cHM6Ly93YXp1aC5zaGFyZXBvaW50LmNvbS9zaXRlcy9UZXN0U2hhcmVQb2ludC9TaGFyZWQgRG9jdW1lbnRzL0Zvcm1zL0FsbEl0ZW1zLmFzcHgnLFxuICAgIFVzZXJJZDogJ2Zha2VAZW1haWwubm90JyxcbiAgICBDb3JyZWxhdGlvbklkOiAnZjlkMGM5OWYtYjA0Zi0yMDAwLWRhODItNGJiMmFiZjYxNjhmJyxcbiAgICBFdmVudFNvdXJjZTogJ1NoYXJlUG9pbnQnLFxuICAgIEl0ZW1UeXBlOiAnRmlsZScsXG4gICAgTGlzdElkOiAnZmQyZWJhZjAtOTAwYi00ZGZmLThmYzItZDM0OGJlNTFlNjc3JyxcbiAgICBMaXN0SXRlbVVuaXF1ZUlkOiAnM2M5ZDg5NDMtODQ2ZS00MWYzLWE2NDctNzJhNWU0ZTNkZWNmJyxcbiAgICBTaXRlOiAnZGQ1OGVmMDgtZmFlYS00Y2I1LTg0N2EtMzViYjVjMDFlNzU3JyxcbiAgICBVc2VyQWdlbnQ6XG4gICAgICAnTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzkwLjAuNDQzMC4yMTIgU2FmYXJpLzUzNy4zNicsXG4gICAgV2ViSWQ6ICcwMGMzMjU1NS1lMGQ4LTQyNWYtOWZiZC1lZjU1MzliZmVjZjcnLFxuICAgIFNvdXJjZUZpbGVFeHRlbnNpb246ICdhc3B4JyxcbiAgICBTaXRlVXJsOiAnaHR0cHM6Ly93YXp1aC5zaGFyZXBvaW50LmNvbS9zaXRlcy9UZXN0U2hhcmVQb2ludC8nLFxuICAgIFNvdXJjZUZpbGVOYW1lOiAnQWxsSXRlbXMuYXNweCcsXG4gICAgU291cmNlUmVsYXRpdmVVcmw6ICdTaGFyZWQgRG9jdW1lbnRzL0Zvcm1zJyxcbiAgfSxcbiAge1xuICAgIENyZWF0aW9uVGltZTogJzIwMjEtMDUtMjBUMTc6NDY6MjUnLFxuICAgIElkOiAnMDg3ZTViNjgtZmMzZi00ZTAxLTFlZmMtMDhkOTFiYjczMGI1JyxcbiAgICBPcGVyYXRpb246ICdMaXN0Vmlld2VkJyxcbiAgICBPcmdhbml6YXRpb25JZDogJzBmZWE0ZTAzLTgxNDYtNDUzYi1iODg5LTU0YjRiZDExNTY1YicsXG4gICAgUmVjb3JkVHlwZTogMzYsXG4gICAgVXNlcktleTogJ2k6MGguZnxtZW1iZXJzaGlwfDEwMDMyMDAxNDA4MGQzYWRAbGl2ZS5jb20nLFxuICAgIFVzZXJUeXBlOiAwLFxuICAgIFZlcnNpb246IDEsXG4gICAgV29ya2xvYWQ6ICdTaGFyZVBvaW50JyxcbiAgICBDbGllbnRJUDogJzE5MC4xNi45LjE3NicsXG4gICAgT2JqZWN0SWQ6XG4gICAgICAnaHR0cHM6Ly93YXp1aC5zaGFyZXBvaW50LmNvbS9zaXRlcy9UZXN0U2hhcmVQb2ludC9mZDJlYmFmMC05MDBiLTRkZmYtOGZjMi1kMzQ4YmU1MWU2NzcnLFxuICAgIFVzZXJJZDogJ2Zha2VAZW1haWwubm90JyxcbiAgICBDb3JyZWxhdGlvbklkOiAnZjlkMGM5OWYtYjA0Zi0yMDAwLWRhODItNGJiMmFiZjYxNjhmJyxcbiAgICBEb05vdERpc3RyaWJ1dGVFdmVudDogdHJ1ZSxcbiAgICBFdmVudFNvdXJjZTogJ1NoYXJlUG9pbnQnLFxuICAgIEl0ZW1UeXBlOiAnTGlzdCcsXG4gICAgTGlzdElkOiAnZmQyZWJhZjAtOTAwYi00ZGZmLThmYzItZDM0OGJlNTFlNjc3JyxcbiAgICBTaXRlOiAnZGQ1OGVmMDgtZmFlYS00Y2I1LTg0N2EtMzViYjVjMDFlNzU3JyxcbiAgICBVc2VyQWdlbnQ6XG4gICAgICAnTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzkwLjAuNDQzMC4yMTIgU2FmYXJpLzUzNy4zNicsXG4gICAgV2ViSWQ6ICcwMGMzMjU1NS1lMGQ4LTQyNWYtOWZiZC1lZjU1MzliZmVjZjcnLFxuICAgIEN1c3RvbWl6ZWREb2NsaWI6IGZhbHNlLFxuICAgIEZyb21BcHA6IHRydWUsXG4gICAgSXNEb2NMaWI6IHRydWUsXG4gICAgSXRlbUNvdW50OiAwLFxuICAgIExpc3RCYXNlVGVtcGxhdGVUeXBlOiAnMTAxJyxcbiAgICBMaXN0QmFzZVR5cGU6ICdEb2N1bWVudExpYnJhcnknLFxuICAgIExpc3RDb2xvcjogJycsXG4gICAgTGlzdEljb246ICcnLFxuICAgIFNvdXJjZTogJ1Vua25vd24nLFxuICAgIFRlbXBsYXRlVHlwZUlkOiAnJyxcbiAgICBMaXN0VGl0bGU6ICdmZDJlYmFmMC05MDBiLTRkZmYtOGZjMi1kMzQ4YmU1MWU2NzcnLFxuICB9LFxuICB7XG4gICAgQ3JlYXRpb25UaW1lOiAnMjAyMS0wNS0yMFQxNzo1MjoyOScsXG4gICAgSWQ6ICc0MTIyNTQ4Ny0zMWMxLTRlMjQtYjhiMC0wOGQ5MWJiODA5NGMnLFxuICAgIE9wZXJhdGlvbjogJ1BhZ2VQcmVmZXRjaGVkJyxcbiAgICBPcmdhbml6YXRpb25JZDogJzBmZWE0ZTAzLTgxNDYtNDUzYi1iODg5LTU0YjRiZDExNTY1YicsXG4gICAgUmVjb3JkVHlwZTogNCxcbiAgICBVc2VyS2V5OiAnaTowaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDE0MDgwZDNhZEBsaXZlLmNvbScsXG4gICAgVXNlclR5cGU6IDAsXG4gICAgVmVyc2lvbjogMSxcbiAgICBXb3JrbG9hZDogJ1NoYXJlUG9pbnQnLFxuICAgIENsaWVudElQOiAnMTkwLjE2LjkuMTc2JyxcbiAgICBPYmplY3RJZDogJ2h0dHBzOi8vd2F6dWguc2hhcmVwb2ludC5jb20vc2l0ZXMvVGVzdFNoYXJlUG9pbnQnLFxuICAgIFVzZXJJZDogJ2Zha2VAZW1haWwubm90JyxcbiAgICBDb3JyZWxhdGlvbklkOiAnNTJkMWM5OWYtMzAwMC0yMDAwLWRmMTMtM2FiMWU4ZmI5ZjkyJyxcbiAgICBDdXN0b21VbmlxdWVJZDogZmFsc2UsXG4gICAgRXZlbnRTb3VyY2U6ICdTaGFyZVBvaW50JyxcbiAgICBJdGVtVHlwZTogJ1BhZ2UnLFxuICAgIExpc3RJZDogJ2U0YzljZTJlLWQ4YzItNDY4ZS1iYWY1LWYzNjJmOGMyZjJmMycsXG4gICAgTGlzdEl0ZW1VbmlxdWVJZDogJzM2ZGIzMTY4LWMxYjItNDRlOS05ZmZkLWU5YThlMDRiYjJmNScsXG4gICAgU2l0ZTogJ2RkNThlZjA4LWZhZWEtNGNiNS04NDdhLTM1YmI1YzAxZTc1NycsXG4gICAgVXNlckFnZW50OlxuICAgICAgJ01vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS85MC4wLjQ0MzAuMjEyIFNhZmFyaS81MzcuMzYnLFxuICAgIFdlYklkOiAnMDBjMzI1NTUtZTBkOC00MjVmLTlmYmQtZWY1NTM5YmZlY2Y3JyxcbiAgfSxcbiAge1xuICAgIENyZWF0aW9uVGltZTogJzIwMjEtMDUtMjBUMTc6NTE6NDknLFxuICAgIElkOiAnZDkzMGNjNWMtMjY1OC00NWRmLTYzNjEtMDhkOTFiYjdmMTc5JyxcbiAgICBPcGVyYXRpb246ICdGaWxlQ2hlY2tlZE91dCcsXG4gICAgT3JnYW5pemF0aW9uSWQ6ICcwZmVhNGUwMy04MTQ2LTQ1M2ItYjg4OS01NGI0YmQxMTU2NWInLFxuICAgIFJlY29yZFR5cGU6IDYsXG4gICAgVXNlcktleTogJ2k6MGguZnxtZW1iZXJzaGlwfDEwMDMyMDAxNDA4MGQzYWRAbGl2ZS5jb20nLFxuICAgIFVzZXJUeXBlOiAwLFxuICAgIFZlcnNpb246IDEsXG4gICAgV29ya2xvYWQ6ICdTaGFyZVBvaW50JyxcbiAgICBDbGllbnRJUDogJzE5MC4xNi45LjE3NicsXG4gICAgT2JqZWN0SWQ6ICdodHRwczovL3dhenVoLnNoYXJlcG9pbnQuY29tL3NpdGVzL1Rlc3RTaGFyZVBvaW50L1NpdGVQYWdlcy9Ib21lLmFzcHgnLFxuICAgIFVzZXJJZDogJ2Zha2VAZW1haWwubm90JyxcbiAgICBDb3JyZWxhdGlvbklkOiAnNDhkMWM5OWYtZjAzYy0yMDAwLWRmMTMtMzg5ODNhNjYwOGY4JyxcbiAgICBFdmVudFNvdXJjZTogJ1NoYXJlUG9pbnQnLFxuICAgIEl0ZW1UeXBlOiAnRmlsZScsXG4gICAgTGlzdElkOiAnZTRjOWNlMmUtZDhjMi00NjhlLWJhZjUtZjM2MmY4YzJmMmYzJyxcbiAgICBMaXN0SXRlbVVuaXF1ZUlkOiAnMzZkYjMxNjgtYzFiMi00NGU5LTlmZmQtZTlhOGUwNGJiMmY1JyxcbiAgICBTaXRlOiAnZGQ1OGVmMDgtZmFlYS00Y2I1LTg0N2EtMzViYjVjMDFlNzU3JyxcbiAgICBVc2VyQWdlbnQ6XG4gICAgICAnTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzkwLjAuNDQzMC4yMTIgU2FmYXJpLzUzNy4zNicsXG4gICAgV2ViSWQ6ICcwMGMzMjU1NS1lMGQ4LTQyNWYtOWZiZC1lZjU1MzliZmVjZjcnLFxuICAgIEhpZ2hQcmlvcml0eU1lZGlhUHJvY2Vzc2luZzogZmFsc2UsXG4gICAgU291cmNlRmlsZUV4dGVuc2lvbjogJ2FzcHgnLFxuICAgIFNpdGVVcmw6ICdodHRwczovL3dhenVoLnNoYXJlcG9pbnQuY29tL3NpdGVzL1Rlc3RTaGFyZVBvaW50LycsXG4gICAgU291cmNlRmlsZU5hbWU6ICdIb21lLmFzcHgnLFxuICAgIFNvdXJjZVJlbGF0aXZlVXJsOiAnU2l0ZVBhZ2VzJyxcbiAgfSxcbiAge1xuICAgIENyZWF0aW9uVGltZTogJzIwMjEtMDUtMjBUMTc6NTE6NTEnLFxuICAgIElkOiAnODlkNzYzNjItZTQ5My00YzIwLTNiNjktMDhkOTFiYjdmMjg4JyxcbiAgICBPcGVyYXRpb246ICdMaXN0VXBkYXRlZCcsXG4gICAgT3JnYW5pemF0aW9uSWQ6ICcwZmVhNGUwMy04MTQ2LTQ1M2ItYjg4OS01NGI0YmQxMTU2NWInLFxuICAgIFJlY29yZFR5cGU6IDM2LFxuICAgIFVzZXJLZXk6ICdpOjBoLmZ8bWVtYmVyc2hpcHwxMDAzMjAwMTQwODBkM2FkQGxpdmUuY29tJyxcbiAgICBVc2VyVHlwZTogMCxcbiAgICBWZXJzaW9uOiAxLFxuICAgIFdvcmtsb2FkOiAnU2hhcmVQb2ludCcsXG4gICAgQ2xpZW50SVA6ICcxOTAuMTYuOS4xNzYnLFxuICAgIE9iamVjdElkOlxuICAgICAgJ2h0dHBzOi8vd2F6dWguc2hhcmVwb2ludC5jb20vc2l0ZXMvVGVzdFNoYXJlUG9pbnQvZTRjOWNlMmUtZDhjMi00NjhlLWJhZjUtZjM2MmY4YzJmMmYzJyxcbiAgICBVc2VySWQ6ICdmYWtlQGVtYWlsLm5vdCcsXG4gICAgQ29ycmVsYXRpb25JZDogJzQ4ZDFjOTlmLWYwYTgtMjAwMC1kYTgyLTQxYmUzZjk3MzI2NycsXG4gICAgRG9Ob3REaXN0cmlidXRlRXZlbnQ6IHRydWUsXG4gICAgRXZlbnRTb3VyY2U6ICdTaGFyZVBvaW50JyxcbiAgICBJdGVtVHlwZTogJ0xpc3QnLFxuICAgIExpc3RJZDogJ2U0YzljZTJlLWQ4YzItNDY4ZS1iYWY1LWYzNjJmOGMyZjJmMycsXG4gICAgU2l0ZTogJ2RkNThlZjA4LWZhZWEtNGNiNS04NDdhLTM1YmI1YzAxZTc1NycsXG4gICAgVXNlckFnZW50OlxuICAgICAgJ01vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS85MC4wLjQ0MzAuMjEyIFNhZmFyaS81MzcuMzYnLFxuICAgIFdlYklkOiAnMDBjMzI1NTUtZTBkOC00MjVmLTlmYmQtZWY1NTM5YmZlY2Y3JyxcbiAgICBDdXN0b21pemVkRG9jbGliOiBmYWxzZSxcbiAgICBGcm9tQXBwOiBmYWxzZSxcbiAgICBJc0RvY0xpYjogdHJ1ZSxcbiAgICBJdGVtQ291bnQ6IDEsXG4gICAgTGlzdEJhc2VUZW1wbGF0ZVR5cGU6ICcxMTknLFxuICAgIExpc3RCYXNlVHlwZTogJ0RvY3VtZW50TGlicmFyeScsXG4gICAgTGlzdENvbG9yOiAnJyxcbiAgICBMaXN0SWNvbjogJycsXG4gICAgU291cmNlOiAnVW5rbm93bicsXG4gICAgVGVtcGxhdGVUeXBlSWQ6ICcnLFxuICAgIExpc3RUaXRsZTogJ2U0YzljZTJlLWQ4YzItNDY4ZS1iYWY1LWYzNjJmOGMyZjJmMycsXG4gIH0sXG4gIHtcbiAgICBDcmVhdGlvblRpbWU6ICcyMDIxLTA1LTIwVDE3OjUyOjM2JyxcbiAgICBJZDogJzdhOTFkZDhjLTU2MGItNGZiZS0yNTg1LTA4ZDkxYmI4MGQ0NicsXG4gICAgT3BlcmF0aW9uOiAnQ2xpZW50Vmlld1NpZ25hbGVkJyxcbiAgICBPcmdhbml6YXRpb25JZDogJzBmZWE0ZTAzLTgxNDYtNDUzYi1iODg5LTU0YjRiZDExNTY1YicsXG4gICAgUmVjb3JkVHlwZTogNCxcbiAgICBVc2VyS2V5OiAnaTowaC5mfG1lbWJlcnNoaXB8MTAwMzIwMDE0MDgwZDNhZEBsaXZlLmNvbScsXG4gICAgVXNlclR5cGU6IDAsXG4gICAgVmVyc2lvbjogMSxcbiAgICBXb3JrbG9hZDogJ1NoYXJlUG9pbnQnLFxuICAgIENsaWVudElQOiAnMTkwLjE2LjkuMTc2JyxcbiAgICBPYmplY3RJZDogJ2h0dHBzOi8vd2F6dWguc2hhcmVwb2ludC5jb20vc2l0ZXMvVGVzdFNoYXJlUG9pbnQvU2l0ZVBhZ2VzL0hvbWUuYXNweCcsXG4gICAgVXNlcklkOiAnZmFrZUBlbWFpbC5ub3QnLFxuICAgIENvcnJlbGF0aW9uSWQ6ICc1M2QxYzk5Zi1iMGFhLTIwMDAtZGYxMy0zZWZlYTllNDEwNzEnLFxuICAgIEN1c3RvbVVuaXF1ZUlkOiBmYWxzZSxcbiAgICBFdmVudFNvdXJjZTogJ1NoYXJlUG9pbnQnLFxuICAgIEl0ZW1UeXBlOiAnUGFnZScsXG4gICAgTGlzdElkOiAnZTRjOWNlMmUtZDhjMi00NjhlLWJhZjUtZjM2MmY4YzJmMmYzJyxcbiAgICBMaXN0SXRlbVVuaXF1ZUlkOiAnMzZkYjMxNjgtYzFiMi00NGU5LTlmZmQtZTlhOGUwNGJiMmY1JyxcbiAgICBTaXRlOiAnZGQ1OGVmMDgtZmFlYS00Y2I1LTg0N2EtMzViYjVjMDFlNzU3JyxcbiAgICBVc2VyQWdlbnQ6XG4gICAgICAnTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzkwLjAuNDQzMC4yMTIgU2FmYXJpLzUzNy4zNicsXG4gICAgV2ViSWQ6ICcwMGMzMjU1NS1lMGQ4LTQyNWYtOWZiZC1lZjU1MzliZmVjZjcnLFxuICB9LFxuICB7XG4gICAgQ3JlYXRpb25UaW1lOiAnMjAyMS0wNS0yMFQxNzo1MzozNycsXG4gICAgSWQ6ICc5Njk1YWZjZC0xOWZmLTQ5MWYtYTZlZS0wOGQ5MWJiODMxZDEnLFxuICAgIE9wZXJhdGlvbjogJ0ZpbGVNb2RpZmllZCcsXG4gICAgT3JnYW5pemF0aW9uSWQ6ICcwZmVhNGUwMy04MTQ2LTQ1M2ItYjg4OS01NGI0YmQxMTU2NWInLFxuICAgIFJlY29yZFR5cGU6IDYsXG4gICAgVXNlcktleTogJ2k6MGguZnxtZW1iZXJzaGlwfDEwMDMyMDAxNDA4MGQzYWRAbGl2ZS5jb20nLFxuICAgIFVzZXJUeXBlOiAwLFxuICAgIFZlcnNpb246IDEsXG4gICAgV29ya2xvYWQ6ICdTaGFyZVBvaW50JyxcbiAgICBDbGllbnRJUDogJzE5MC4xNi45LjE3NicsXG4gICAgT2JqZWN0SWQ6ICdodHRwczovL3dhenVoLnNoYXJlcG9pbnQuY29tL3NpdGVzL1Rlc3RTaGFyZVBvaW50L1NpdGVQYWdlcy9Ib21lLmFzcHgnLFxuICAgIFVzZXJJZDogJ2Zha2VAZW1haWwubm90JyxcbiAgICBDb3JyZWxhdGlvbklkOiAnNjJkMWM5OWYtZDA5Yy0yMDAwLWRmMTMtMzdkZGY0ODBlNzE3JyxcbiAgICBEb05vdERpc3RyaWJ1dGVFdmVudDogdHJ1ZSxcbiAgICBFdmVudFNvdXJjZTogJ1NoYXJlUG9pbnQnLFxuICAgIEl0ZW1UeXBlOiAnRmlsZScsXG4gICAgTGlzdElkOiAnZTRjOWNlMmUtZDhjMi00NjhlLWJhZjUtZjM2MmY4YzJmMmYzJyxcbiAgICBMaXN0SXRlbVVuaXF1ZUlkOiAnMzZkYjMxNjgtYzFiMi00NGU5LTlmZmQtZTlhOGUwNGJiMmY1JyxcbiAgICBTaXRlOiAnZGQ1OGVmMDgtZmFlYS00Y2I1LTg0N2EtMzViYjVjMDFlNzU3JyxcbiAgICBVc2VyQWdlbnQ6XG4gICAgICAnTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzkwLjAuNDQzMC4yMTIgU2FmYXJpLzUzNy4zNicsXG4gICAgV2ViSWQ6ICcwMGMzMjU1NS1lMGQ4LTQyNWYtOWZiZC1lZjU1MzliZmVjZjcnLFxuICAgIFNvdXJjZUZpbGVFeHRlbnNpb246ICdhc3B4JyxcbiAgICBTaXRlVXJsOiAnaHR0cHM6Ly93YXp1aC5zaGFyZXBvaW50LmNvbS9zaXRlcy9UZXN0U2hhcmVQb2ludC8nLFxuICAgIFNvdXJjZUZpbGVOYW1lOiAnSG9tZS5hc3B4JyxcbiAgICBTb3VyY2VSZWxhdGl2ZVVybDogJ1NpdGVQYWdlcycsXG4gIH0sXG4gIHtcbiAgICBDcmVhdGlvblRpbWU6ICcyMDIxLTA1LTIwVDE3OjU3OjAzJyxcbiAgICBJZDogJzU1MWZkN2Q1LWJhYzEtNGJiNC0xMWQyLTA4ZDkxYmI4YWM5ZScsXG4gICAgT3BlcmF0aW9uOiAnRmlsZUFjY2Vzc2VkRXh0ZW5kZWQnLFxuICAgIE9yZ2FuaXphdGlvbklkOiAnMGZlYTRlMDMtODE0Ni00NTNiLWI4ODktNTRiNGJkMTE1NjViJyxcbiAgICBSZWNvcmRUeXBlOiA2LFxuICAgIFVzZXJLZXk6ICdpOjBoLmZ8bWVtYmVyc2hpcHwxMDAzMjAwMTQwODBkM2FkQGxpdmUuY29tJyxcbiAgICBVc2VyVHlwZTogMCxcbiAgICBWZXJzaW9uOiAxLFxuICAgIFdvcmtsb2FkOiAnU2hhcmVQb2ludCcsXG4gICAgQ2xpZW50SVA6ICcxOTAuMTYuOS4xNzYnLFxuICAgIE9iamVjdElkOlxuICAgICAgJ2h0dHBzOi8vd2F6dWguc2hhcmVwb2ludC5jb20vc2l0ZXMvVGVzdFNoYXJlUG9pbnQvU2hhcmVkIERvY3VtZW50cy9Gb3Jtcy9BbGxJdGVtcy5hc3B4JyxcbiAgICBVc2VySWQ6ICdmYWtlQGVtYWlsLm5vdCcsXG4gICAgQ29ycmVsYXRpb25JZDogJzk0ZDFjOTlmLTIwZWItMjAwMC1kZjEzLTM1NzQ2ZDAyOTExZScsXG4gICAgRXZlbnRTb3VyY2U6ICdTaGFyZVBvaW50JyxcbiAgICBJdGVtVHlwZTogJ0ZpbGUnLFxuICAgIExpc3RJZDogJ2ZkMmViYWYwLTkwMGItNGRmZi04ZmMyLWQzNDhiZTUxZTY3NycsXG4gICAgTGlzdEl0ZW1VbmlxdWVJZDogJzNjOWQ4OTQzLTg0NmUtNDFmMy1hNjQ3LTcyYTVlNGUzZGVjZicsXG4gICAgU2l0ZTogJ2RkNThlZjA4LWZhZWEtNGNiNS04NDdhLTM1YmI1YzAxZTc1NycsXG4gICAgVXNlckFnZW50OlxuICAgICAgJ01vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS85MC4wLjQ0MzAuMjEyIFNhZmFyaS81MzcuMzYnLFxuICAgIFdlYklkOiAnMDBjMzI1NTUtZTBkOC00MjVmLTlmYmQtZWY1NTM5YmZlY2Y3JyxcbiAgICBTb3VyY2VGaWxlRXh0ZW5zaW9uOiAnYXNweCcsXG4gICAgU2l0ZVVybDogJ2h0dHBzOi8vd2F6dWguc2hhcmVwb2ludC5jb20vc2l0ZXMvVGVzdFNoYXJlUG9pbnQvJyxcbiAgICBTb3VyY2VGaWxlTmFtZTogJ0FsbEl0ZW1zLmFzcHgnLFxuICAgIFNvdXJjZVJlbGF0aXZlVXJsOiAnU2hhcmVkIERvY3VtZW50cy9Gb3JtcycsXG4gIH0sXG4gIHtcbiAgICBDcmVhdGlvblRpbWU6ICcyMDIxLTA1LTIwVDE3OjU5OjU1JyxcbiAgICBJZDogJ2ViMWYwOTExLTliZWQtNGYxNS0xMGU1LTA4ZDkxYmI5MTM3MicsXG4gICAgT3BlcmF0aW9uOiAnU2l0ZURlbGV0ZWQnLFxuICAgIE9yZ2FuaXphdGlvbklkOiAnMGZlYTRlMDMtODE0Ni00NTNiLWI4ODktNTRiNGJkMTE1NjViJyxcbiAgICBSZWNvcmRUeXBlOiA2LFxuICAgIFVzZXJLZXk6ICdTLTEtMC0wJyxcbiAgICBVc2VyVHlwZTogNCxcbiAgICBWZXJzaW9uOiAxLFxuICAgIFdvcmtsb2FkOiAnU2hhcmVQb2ludCcsXG4gICAgQ2xpZW50SVA6ICcnLFxuICAgIE9iamVjdElkOiAnaHR0cHM6Ly93YXp1aC5zaGFyZXBvaW50LmNvbS9zaXRlcy9UZXN0U2hhcmVQb2ludCcsXG4gICAgVXNlcklkOiAnQUFEIHRvIFNoYXJlUG9pbnQgU3luYycsXG4gICAgQ29ycmVsYXRpb25JZDogJ2JlZDFjOTlmLTIwZWUtMjAwMC1kZjEzLTMwNmNiNjgwM2M5MicsXG4gICAgRXZlbnRTb3VyY2U6ICdTaGFyZVBvaW50JyxcbiAgICBJdGVtVHlwZTogJ1dlYicsXG4gICAgTGlzdEl0ZW1VbmlxdWVJZDogJzAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCcsXG4gICAgU2l0ZTogJ2RkNThlZjA4LWZhZWEtNGNiNS04NDdhLTM1YmI1YzAxZTc1NycsXG4gICAgVXNlckFnZW50OiAnJyxcbiAgICBXZWJJZDogJzAwYzMyNTU1LWUwZDgtNDI1Zi05ZmJkLWVmNTUzOWJmZWNmNycsXG4gICAgRGVzdGluYXRpb25GaWxlRXh0ZW5zaW9uOiAnJyxcbiAgICBTb3VyY2VGaWxlRXh0ZW5zaW9uOiAnJyxcbiAgICBEZXN0aW5hdGlvbkZpbGVOYW1lOiAnVGVzdFNoYXJlUG9pbnQnLFxuICAgIERlc3RpbmF0aW9uUmVsYXRpdmVVcmw6ICcuLi8uLi9odHRwczovL3dhenVoLnNoYXJlcG9pbnQuY29tL3NpdGVzJyxcbiAgICBTaXRlVXJsOiAnaHR0cHM6Ly93YXp1aC5zaGFyZXBvaW50LmNvbS9zaXRlcy9UZXN0U2hhcmVQb2ludC8nLFxuICAgIFNvdXJjZUZpbGVOYW1lOiAnVGVzdFNoYXJlUG9pbnQnLFxuICAgIFNvdXJjZVJlbGF0aXZlVXJsOiAnLi4nLFxuICB9LFxuICB7XG4gICAgQ3JlYXRpb25UaW1lOiAnMjAyMS0wNS0yMFQxNzo1OToxMScsXG4gICAgSWQ6ICcwZDIwYTNlMS1lOWNiLTQzNmMtNzk5Zi0wOGQ5MWJiOGY5MmYnLFxuICAgIE9wZXJhdGlvbjogJ1BhZ2VWaWV3ZWRFeHRlbmRlZCcsXG4gICAgT3JnYW5pemF0aW9uSWQ6ICcwZmVhNGUwMy04MTQ2LTQ1M2ItYjg4OS01NGI0YmQxMTU2NWInLFxuICAgIFJlY29yZFR5cGU6IDQsXG4gICAgVXNlcktleTogJ2k6MGguZnxtZW1iZXJzaGlwfDEwMDMyMDAxNDA4MGQzYWRAbGl2ZS5jb20nLFxuICAgIFVzZXJUeXBlOiAwLFxuICAgIFZlcnNpb246IDEsXG4gICAgV29ya2xvYWQ6ICdTaGFyZVBvaW50JyxcbiAgICBDbGllbnRJUDogJzE5MC4xNi45LjE3NicsXG4gICAgT2JqZWN0SWQ6XG4gICAgICAnaHR0cHM6Ly93YXp1aC5zaGFyZXBvaW50LmNvbS9zaXRlcy9UZXN0U2hhcmVQb2ludC9fbGF5b3V0cy8xNS9vbmxpbmUvaGFuZGxlcnMvU3BvU3VpdGVMaW5rcy5hc2h4JyxcbiAgICBVc2VySWQ6ICdmYWtlQGVtYWlsLm5vdCcsXG4gICAgQ29ycmVsYXRpb25JZDogJ2I0ZDFjOTlmLTAwNDMtMjAwMC1kYTgyLTQxYjYzZTFkOTFmNCcsXG4gICAgRXZlbnRTb3VyY2U6ICdTaGFyZVBvaW50JyxcbiAgICBJdGVtVHlwZTogJ1BhZ2UnLFxuICAgIFNpdGU6ICdkZDU4ZWYwOC1mYWVhLTRjYjUtODQ3YS0zNWJiNWMwMWU3NTcnLFxuICAgIFVzZXJBZ2VudDpcbiAgICAgICdNb3ppbGxhLzUuMCAoV2luZG93cyBOVCAxMC4wOyBXaW42NDsgeDY0KSBBcHBsZVdlYktpdC81MzcuMzYgKEtIVE1MLCBsaWtlIEdlY2tvKSBDaHJvbWUvOTAuMC40NDMwLjIxMiBTYWZhcmkvNTM3LjM2JyxcbiAgICBXZWJJZDogJzAwYzMyNTU1LWUwZDgtNDI1Zi05ZmJkLWVmNTUzOWJmZWNmNycsXG4gIH0sXG4gIHtcbiAgICBDcmVhdGlvblRpbWU6ICcyMDIxLTA1LTIwVDE3OjQ0OjI3JyxcbiAgICBJZDogJzMwZWYyZjcwLWExMmQtNGIzMS0xZTcwLTA4ZDkxYmI2ZWEyZScsXG4gICAgT3BlcmF0aW9uOiAnU2V0LU1haWxib3gnLFxuICAgIE9yZ2FuaXphdGlvbklkOiAnMGZlYTRlMDMtODE0Ni00NTNiLWI4ODktNTRiNGJkMTE1NjViJyxcbiAgICBSZWNvcmRUeXBlOiAxLFxuICAgIFJlc3VsdFN0YXR1czogJ1RydWUnLFxuICAgIFVzZXJLZXk6ICdTcG9vbHNQcm92aXNpb25pbmctQXBwbGljYXRpb25BY2NvdW50QGV1cnByZDA0LnByb2Qub3V0bG9vay5jb20nLFxuICAgIFVzZXJUeXBlOiAzLFxuICAgIFZlcnNpb246IDEsXG4gICAgV29ya2xvYWQ6ICdFeGNoYW5nZScsXG4gICAgQ2xpZW50SVA6ICc1Mi4yMzMuMjM3LjE0MTo0MDYzOCcsXG4gICAgT2JqZWN0SWQ6XG4gICAgICAnRVVSUFIwNEEwMTAucHJvZC5vdXRsb29rLmNvbS9NaWNyb3NvZnQgRXhjaGFuZ2UgSG9zdGVkIE9yZ2FuaXphdGlvbnMvd2F6dWgudGVzdHl0ZXN0LmNvbS90b21hcy50dXJpbmEnLFxuICAgIFVzZXJJZDogJ1Nwb29sc1Byb3Zpc2lvbmluZy1BcHBsaWNhdGlvbkFjY291bnRAZXVycHJkMDQucHJvZC5vdXRsb29rLmNvbScsXG4gICAgQXBwSWQ6ICc2MTEwOTczOC03ZDJiLTRhMGItOWZlMy02NjBiMWZmODM1MDUnLFxuICAgIENsaWVudEFwcElkOiAnJyxcbiAgICBFeHRlcm5hbEFjY2VzczogdHJ1ZSxcbiAgICBPcmdhbml6YXRpb25OYW1lOiAnd2F6dWgudGVzdHl0ZXN0LmNvbScsXG4gICAgT3JpZ2luYXRpbmdTZXJ2ZXI6ICdBTTlQUjA0TUI4OTg2ICgxNS4yMC40MTUwLjAyMyknLFxuICAgIFBhcmFtZXRlcnM6IFtcbiAgICAgIHtcbiAgICAgICAgTmFtZTogJ0lkZW50aXR5JyxcbiAgICAgICAgVmFsdWU6XG4gICAgICAgICAgJ01HWmxZVFJsTURNdE9ERTBOaTAwTlROaUxXSTRPRGt0TlRSaU5HSmtNVEUxTmpWaVhHSmtZbUk0TWpNMkxUQm1ORGd0Tkdaak5pMDVaamMzTFRreE5HTmtZMk13TW1Jell3MicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBOYW1lOiAnUmVzb3VyY2VFbWFpbEFkZHJlc3NlcycsXG4gICAgICAgIFZhbHVlOiAnVHJ1ZScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBOYW1lOiAnQnlwYXNzTGl2ZUlkJyxcbiAgICAgICAgVmFsdWU6ICdUcnVlJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIE5hbWU6ICdGb3JjZScsXG4gICAgICAgIFZhbHVlOiAnVHJ1ZScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBOYW1lOiAnRG9tYWluQ29udHJvbGxlcicsXG4gICAgICAgIFZhbHVlOiAnSEUxUFIwNEEwMTBEQzAzLkVVUlBSMDRBMDEwLnByb2Qub3V0bG9vay5jb20nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgTmFtZTogJ0VtYWlsQWRkcmVzc2VzJyxcbiAgICAgICAgVmFsdWU6XG4gICAgICAgICAgJ1NJUDpmYWtlQGVtYWlsLm5vdDtTTVRQOmZha2VAZW1haWwubm90O1NQTzpTUE9fZjQ5ZmVhZTQtMDMzZC00MDI4LTk3ZDEtM2FjZDU1MzQxZjY5QFNQT18wZmVhNGUwMy04MTQ2LTQ1M2ItYjg4OS01NGI0YmQxMTU2NWInLFxuICAgICAgfSxcbiAgICBdLFxuICAgIFNlc3Npb25JZDogJycsXG4gIH0sXG4gIHtcbiAgICBDcmVhdGlvblRpbWU6ICcyMDIxLTA1LTIwVDE3OjQ1OjU5JyxcbiAgICBJZDogJzQ4YzAwOTMwLWIyNWQtNGNjYy1jY2IzLTA4ZDkxYmI3MjBmNicsXG4gICAgT3BlcmF0aW9uOiAnTW9kaWZ5Rm9sZGVyUGVybWlzc2lvbnMnLFxuICAgIE9yZ2FuaXphdGlvbklkOiAnMGZlYTRlMDMtODE0Ni00NTNiLWI4ODktNTRiNGJkMTE1NjViJyxcbiAgICBSZWNvcmRUeXBlOiAyLFxuICAgIFJlc3VsdFN0YXR1czogJ1N1Y2NlZWRlZCcsXG4gICAgVXNlcktleTogJ1MtMS01LTE4JyxcbiAgICBVc2VyVHlwZTogMixcbiAgICBWZXJzaW9uOiAxLFxuICAgIFdvcmtsb2FkOiAnRXhjaGFuZ2UnLFxuICAgIENsaWVudElQOiAnOjoxJyxcbiAgICBVc2VySWQ6ICdTLTEtNS0xOCcsXG4gICAgQ2xpZW50SVBBZGRyZXNzOiAnOjoxJyxcbiAgICBDbGllbnRJbmZvU3RyaW5nOiAnQ2xpZW50PVdlYlNlcnZpY2VzO0FjdGlvbj1Db25maWd1cmVHcm91cE1haWxib3gnLFxuICAgIEV4dGVybmFsQWNjZXNzOiB0cnVlLFxuICAgIEludGVybmFsTG9nb25UeXBlOiAxLFxuICAgIExvZ29uVHlwZTogMSxcbiAgICBMb2dvblVzZXJTaWQ6ICdTLTEtNS0xOCcsXG4gICAgTWFpbGJveEd1aWQ6ICdmYzEwOGI0NS05ZDUxLTRiODctYTQ3My05ZDVhMGU0MDQ5NjYnLFxuICAgIE1haWxib3hPd25lck1hc3RlckFjY291bnRTaWQ6ICdTLTEtNS0xMCcsXG4gICAgTWFpbGJveE93bmVyU2lkOiAnUy0xLTUtMjEtMjk4NjU2NTgwNS0xODM1MjY1NTUwLTEzODM1NzQwNzMtMjA3NDMwNjcnLFxuICAgIE1haWxib3hPd25lclVQTjogJ1Rlc3RTaGFyZVBvaW50QHdhenVoLmNvbScsXG4gICAgT3JnYW5pemF0aW9uTmFtZTogJ3dhenVoLnRlc3R5dGVzdC5jb20nLFxuICAgIE9yaWdpbmF0aW5nU2VydmVyOiAnQVM4UFIwNE1CODQ2NSAoMTUuMjAuNDE1MC4wMjMpXFxyXFxuJyxcbiAgICBJdGVtOiB7XG4gICAgICBJZDogJ0xnQUFBQUE2dFZoYmEzSldTYUdta3k3LzdPdmZBUURSd0tjNDdjMXNUNFdhYWI2TzR6YlBBQUFBQUFFTkFBQUMnLFxuICAgICAgUGFyZW50Rm9sZGVyOiB7XG4gICAgICAgIElkOiAnTGdBQUFBQTZ0VmhiYTNKV1NhR21reTcvN092ZkFRRFJ3S2M0N2Mxc1Q0V2FhYjZPNHpiUEFBQUFBQUVOQUFBQycsXG4gICAgICAgIE1lbWJlclJpZ2h0czpcbiAgICAgICAgICAnUmVhZEFueSwgQ3JlYXRlLCBFZGl0T3duZWQsIERlbGV0ZU93bmVkLCBFZGl0QW55LCBEZWxldGVBbnksIFZpc2libGUsIEZyZWVCdXN5U2ltcGxlLCBGcmVlQnVzeURldGFpbGVkJyxcbiAgICAgICAgTWVtYmVyU2lkOiAnUy0xLTgtNDIyODk0MjY2MS0xMjY3MTc4ODMzLTE1MjAyNjgxOTYtMTcxNjA3NjU1OC0xJyxcbiAgICAgICAgTWVtYmVyVXBuOiAnTWVtYmVyQGxvY2FsJyxcbiAgICAgICAgTmFtZTogJ0NhbGVuZGFyJyxcbiAgICAgICAgUGF0aDogJ1xcXFxDYWxlbmRhcicsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHtcbiAgICBDcmVhdGlvblRpbWU6ICcyMDIxLTA1LTIwVDE3OjQ1OjU4JyxcbiAgICBJZDogJ2JiMDNiNDhlLTYwOWQtNDc3Yi1jYjgwLTA4ZDkxYmI3MjA3NycsXG4gICAgT3BlcmF0aW9uOiAnQ3JlYXRlJyxcbiAgICBPcmdhbml6YXRpb25JZDogJzBmZWE0ZTAzLTgxNDYtNDUzYi1iODg5LTU0YjRiZDExNTY1YicsXG4gICAgUmVjb3JkVHlwZTogMixcbiAgICBSZXN1bHRTdGF0dXM6ICdTdWNjZWVkZWQnLFxuICAgIFVzZXJLZXk6ICdTLTEtNS0xOCcsXG4gICAgVXNlclR5cGU6IDIsXG4gICAgVmVyc2lvbjogMSxcbiAgICBXb3JrbG9hZDogJ0V4Y2hhbmdlJyxcbiAgICBDbGllbnRJUDogJzo6MScsXG4gICAgVXNlcklkOiAnUy0xLTUtMTgnLFxuICAgIENsaWVudElQQWRkcmVzczogJzo6MScsXG4gICAgQ2xpZW50SW5mb1N0cmluZzogJ0NsaWVudD1XZWJTZXJ2aWNlcztBY3Rpb249Q29uZmlndXJlR3JvdXBNYWlsYm94JyxcbiAgICBFeHRlcm5hbEFjY2VzczogdHJ1ZSxcbiAgICBJbnRlcm5hbExvZ29uVHlwZTogMSxcbiAgICBMb2dvblR5cGU6IDEsXG4gICAgTG9nb25Vc2VyU2lkOiAnUy0xLTUtMTgnLFxuICAgIE1haWxib3hHdWlkOiAnZmMxMDhiNDUtOWQ1MS00Yjg3LWE0NzMtOWQ1YTBlNDA0OTY2JyxcbiAgICBNYWlsYm94T3duZXJNYXN0ZXJBY2NvdW50U2lkOiAnUy0xLTUtMTAnLFxuICAgIE1haWxib3hPd25lclNpZDogJ1MtMS01LTIxLTI5ODY1NjU4MDUtMTgzNTI2NTU1MC0xMzgzNTc0MDczLTIwNzQzMDY3JyxcbiAgICBNYWlsYm94T3duZXJVUE46ICdUZXN0U2hhcmVQb2ludEB3YXp1aC5jb20nLFxuICAgIE9yZ2FuaXphdGlvbk5hbWU6ICd3YXp1aC50ZXN0eXRlc3QuY29tJyxcbiAgICBPcmlnaW5hdGluZ1NlcnZlcjogJ0FTOFBSMDRNQjg0NjUgKDE1LjIwLjQxNTAuMDIzKVxcclxcbicsXG4gICAgSXRlbToge1xuICAgICAgQXR0YWNobWVudHM6XG4gICAgICAgICd3YXJtaW5nX2VtYWlsXzAzXzIwMTdfY2FsZW5kYXIucG5nICg2NDZiKTsgd2FybWluZ19lbWFpbF8wM18yMDE3X2NvbnZlcnNhdGlvbi5wbmcgKDY2MWIpOyB3YXJtaW5nX2VtYWlsXzAzXzIwMTdfbGlua3MucG5nICgxNDUwYik7IGdvb2dsZV9wbGF5X3N0b3JlX2JhZGdlLnBuZyAoNDg3MWIpOyBhcHBsZV9zdG9yZV9iYWRnZS5wbmcgKDQ0OTNiKTsgd2luZG93c19zdG9yZV9iYWRnZS5wbmcgKDM3MjhiKTsgd2FybWluZ19lbWFpbF8wM18yMDE3X2ZpbGVzLnBuZyAoODU2Yik7IHdhcm1pbmdfZW1haWxfMDNfMjAxN19zaGFyZVBvaW50LnBuZyAoMTQ3OWIpJyxcbiAgICAgIElkOlxuICAgICAgICAnUmdBQUFBQTZ0VmhiYTNKV1NhR21reTcvN092ZkJ3RFJ3S2M0N2Mxc1Q0V2FhYjZPNHpiUEFBQUFBQUVNQUFEUndLYzQ3YzFzVDRXYWFiNk80emJQQUFBQUFBazlBQUFKJyxcbiAgICAgIEludGVybmV0TWVzc2FnZUlkOlxuICAgICAgICAnPEFTOFBSMDRNQjg0NjU0MjEwNkQzOTM5RjJEMTk1MkQwNUQzMkE5QEFTOFBSMDRNQjg0NjUuZXVycHJkMDQucHJvZC5vdXRsb29rLmNvbT4nLFxuICAgICAgSXNSZWNvcmQ6IGZhbHNlLFxuICAgICAgUGFyZW50Rm9sZGVyOiB7XG4gICAgICAgIElkOiAnTGdBQUFBQTZ0VmhiYTNKV1NhR21reTcvN092ZkFRRFJ3S2M0N2Mxc1Q0V2FhYjZPNHpiUEFBQUFBQUVNQUFBQicsXG4gICAgICAgIFBhdGg6ICdcXFxcSW5ib3gnLFxuICAgICAgfSxcbiAgICAgIFN1YmplY3Q6ICdUaGUgbmV3IFRlc3RTaGFyZVBvaW50IGdyb3VwIGlzIHJlYWR5JyxcbiAgICB9LFxuICB9LFxuICB7XG4gICAgQ3JlYXRpb25UaW1lOiAnMjAyMS0wNS0yMFQxNzo1OTo1OScsXG4gICAgSWQ6ICdlODU1ZmIxMi0yZDQ4LTQ1ZjMtYWM4ZC0wOGQ5MWJiOTE1NjknLFxuICAgIE9wZXJhdGlvbjogJ1JlbW92ZS1VbmlmaWVkR3JvdXAnLFxuICAgIE9yZ2FuaXphdGlvbklkOiAnMGZlYTRlMDMtODE0Ni00NTNiLWI4ODktNTRiNGJkMTE1NjViJyxcbiAgICBSZWNvcmRUeXBlOiAxLFxuICAgIFJlc3VsdFN0YXR1czogJ1RydWUnLFxuICAgIFVzZXJLZXk6ICdOVCBBVVRIT1JJVFlcXFxcU1lTVEVNICh3M3dwKScsXG4gICAgVXNlclR5cGU6IDIsXG4gICAgVmVyc2lvbjogMSxcbiAgICBXb3JrbG9hZDogJ0V4Y2hhbmdlJyxcbiAgICBDbGllbnRJUDogJ1syYTAxOjExMTpmNDAyOmFjMDA6OmYxMzRdOjUxNTE0JyxcbiAgICBPYmplY3RJZDogJ1Rlc3RTaGFyZVBvaW50X2I0N2UwNmJmLTg5NWQtNDhjNC04YWU0LWEwZmRjNjBlYzI0OScsXG4gICAgVXNlcklkOiAnTlQgQVVUSE9SSVRZXFxcXFNZU1RFTSAodzN3cCknLFxuICAgIEFwcElkOiAnMDAwMDAwMDMtMDAwMC0wZmYxLWNlMDAtMDAwMDAwMDAwMDAwJyxcbiAgICBDbGllbnRBcHBJZDogJzAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMCcsXG4gICAgRXh0ZXJuYWxBY2Nlc3M6IGZhbHNlLFxuICAgIE9yZ2FuaXphdGlvbk5hbWU6ICd3YXp1aC50ZXN0eXRlc3QuY29tJyxcbiAgICBPcmlnaW5hdGluZ1NlcnZlcjogJ1ZJMVBSMDRNQjYxMjUgKDE1LjIwLjQxMjkuMDMzKScsXG4gICAgUGFyYW1ldGVyczogW1xuICAgICAge1xuICAgICAgICBOYW1lOiAnSWRlbnRpdHknLFxuICAgICAgICBWYWx1ZTogJ2I0N2UwNmJmLTg5NWQtNDhjNC04YWU0LWEwZmRjNjBlYzI0OScsXG4gICAgICB9LFxuICAgIF0sXG4gICAgU2Vzc2lvbklkOiAnJyxcbiAgfSxcbiAge1xuICAgIENyZWF0aW9uVGltZTogJzIwMjEtMDUtMjBUMTg6MDQ6MzcnLFxuICAgIElkOiAnZjExMWM4MmMtNzk2MS00NzNkLTExMmEtMDhkOTFiYjliYjkxJyxcbiAgICBPcGVyYXRpb246ICdTZXQtVW5pZmllZEdyb3VwJyxcbiAgICBPcmdhbml6YXRpb25JZDogJzBmZWE0ZTAzLTgxNDYtNDUzYi1iODg5LTU0YjRiZDExNTY1YicsXG4gICAgUmVjb3JkVHlwZTogMSxcbiAgICBSZXN1bHRTdGF0dXM6ICdUcnVlJyxcbiAgICBVc2VyS2V5OiAnU3Bvb2xzUHJvdmlzaW9uaW5nLUFwcGxpY2F0aW9uQWNjb3VudEBldXJwcmQwNC5wcm9kLm91dGxvb2suY29tJyxcbiAgICBVc2VyVHlwZTogMyxcbiAgICBWZXJzaW9uOiAxLFxuICAgIFdvcmtsb2FkOiAnRXhjaGFuZ2UnLFxuICAgIENsaWVudElQOiAnNTEuMTQ0LjMzLjE0OjU4ODQ5JyxcbiAgICBPYmplY3RJZDpcbiAgICAgICdFVVJQUjA0QTAxMC5wcm9kLm91dGxvb2suY29tL01pY3Jvc29mdCBFeGNoYW5nZSBIb3N0ZWQgT3JnYW5pemF0aW9ucy93YXp1aC50ZXN0eXRlc3QuY29tL1NvZnQgRGVsZXRlZCBPYmplY3RzL1Rlc3RTaGFyZVBvaW50X2I0N2UwNmJmLTg5NWQtNDhjNC04YWU0LWEwZmRjNjBlYzI0OScsXG4gICAgVXNlcklkOiAnU3Bvb2xzUHJvdmlzaW9uaW5nLUFwcGxpY2F0aW9uQWNjb3VudEBldXJwcmQwNC5wcm9kLm91dGxvb2suY29tJyxcbiAgICBBcHBJZDogJzYxMTA5NzM4LTdkMmItNGEwYi05ZmUzLTY2MGIxZmY4MzUwNScsXG4gICAgQ2xpZW50QXBwSWQ6ICcnLFxuICAgIEV4dGVybmFsQWNjZXNzOiB0cnVlLFxuICAgIE9yZ2FuaXphdGlvbk5hbWU6ICd3YXp1aC50ZXN0eXRlc3QuY29tJyxcbiAgICBPcmlnaW5hdGluZ1NlcnZlcjogJ1ZJMVBSMDQwMk1CMzMyNiAoMTUuMjAuNDEyOS4wMzMpJyxcbiAgICBQYXJhbWV0ZXJzOiBbXG4gICAgICB7XG4gICAgICAgIE5hbWU6ICdJZGVudGl0eScsXG4gICAgICAgIFZhbHVlOlxuICAgICAgICAgICdNR1psWVRSbE1ETXRPREUwTmkwME5UTmlMV0k0T0RrdE5UUmlOR0prTVRFMU5qVmlYREZsWWpGak5qWmhMVFJoWVdRdE5HWTJNaTA0TmpBekxUZGpNRFJrWlRJeFlXRTNNZzInLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgTmFtZTogJ0VtYWlsQWRkcmVzc2VzJyxcbiAgICAgICAgVmFsdWU6ICdzbXRwOlRlc3RTaGFyZVBvaW50QHdhenVoLnRlc3R5dGVzdC5jb207U01UUDpUZXN0U2hhcmVQb2ludEB3YXp1aC5jb20nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgTmFtZTogJ0luY2x1ZGVTb2Z0RGVsZXRlZE9iamVjdHMnLFxuICAgICAgICBWYWx1ZTogJ1RydWUnLFxuICAgICAgfSxcbiAgICBdLFxuICAgIFNlc3Npb25JZDogJycsXG4gIH0sXG4gIHtcbiAgICBDcmVhdGlvblRpbWU6ICcyMDIxLTA1LTIwVDE4OjU5OjQ5JyxcbiAgICBJZDogJzMyMjI5MTE0LWUzNTctNGI1Ni05ZDA4LTA4ZDkxYmMxNzE3YycsXG4gICAgT3BlcmF0aW9uOiAnU2V0LVVzZXInLFxuICAgIE9yZ2FuaXphdGlvbklkOiAnMGZlYTRlMDMtODE0Ni00NTNiLWI4ODktNTRiNGJkMTE1NjViJyxcbiAgICBSZWNvcmRUeXBlOiAxLFxuICAgIFJlc3VsdFN0YXR1czogJ1RydWUnLFxuICAgIFVzZXJLZXk6ICdOVCBBVVRIT1JJVFlcXFxcU1lTVEVNIChNaWNyb3NvZnQuRXhjaGFuZ2UuTWFuYWdlbWVudC5Gb3J3YXJkU3luYyknLFxuICAgIFVzZXJUeXBlOiAzLFxuICAgIFZlcnNpb246IDEsXG4gICAgV29ya2xvYWQ6ICdFeGNoYW5nZScsXG4gICAgT2JqZWN0SWQ6XG4gICAgICAnRVVSUFIwNEEwMTAucHJvZC5vdXRsb29rLmNvbS9NaWNyb3NvZnQgRXhjaGFuZ2UgSG9zdGVkIE9yZ2FuaXphdGlvbnMvd2F6dWgudGVzdHl0ZXN0LmNvbS90b21hcy50dXJpbmEnLFxuICAgIFVzZXJJZDogJ05UIEFVVEhPUklUWVxcXFxTWVNURU0gKE1pY3Jvc29mdC5FeGNoYW5nZS5NYW5hZ2VtZW50LkZvcndhcmRTeW5jKScsXG4gICAgQXBwSWQ6ICcnLFxuICAgIENsaWVudEFwcElkOiAnJyxcbiAgICBFeHRlcm5hbEFjY2VzczogdHJ1ZSxcbiAgICBPcmdhbml6YXRpb25OYW1lOiAnd2F6dWgudGVzdHl0ZXN0LmNvbScsXG4gICAgT3JpZ2luYXRpbmdTZXJ2ZXI6ICdEQjhQUjA0TUI3MDY1ICgxNS4yMC40MTUwLjAyMyknLFxuICAgIFBhcmFtZXRlcnM6IFtcbiAgICAgIHtcbiAgICAgICAgTmFtZTogJ0lkZW50aXR5JyxcbiAgICAgICAgVmFsdWU6ICcwZmVhNGUwMy04MTQ2LTQ1M2ItYjg4OS01NGI0YmQxMTU2NWJcXFxcYmRiYjgyMzYtMGY0OC00ZmM2LTlmNzctOTE0Y2RjYzAyYjNjJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIE5hbWU6ICdTeW5jTWFpbGJveExvY2F0aW9uR3VpZHMnLFxuICAgICAgICBWYWx1ZTogJ1RydWUnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgTmFtZTogJ0Vycm9yQWN0aW9uJyxcbiAgICAgICAgVmFsdWU6ICdTdG9wJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIE5hbWU6ICdXYXJuaW5nQWN0aW9uJyxcbiAgICAgICAgVmFsdWU6ICdTaWxlbnRseUNvbnRpbnVlJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbl07XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU8sTUFBTUEsaUJBQWlCLEdBQUFDLE9BQUEsQ0FBQUQsaUJBQUEsR0FBRyxDQUFDLFdBQVcsRUFBRSw4QkFBOEIsQ0FBQztBQUV2RSxNQUFNRSxtQkFBbUIsR0FBQUQsT0FBQSxDQUFBQyxtQkFBQSxHQUFHLFdBQVc7QUFFdkMsTUFBTUMsa0JBQWtCLEdBQUFGLE9BQUEsQ0FBQUUsa0JBQUEsR0FBRyxDQUNoQztFQUNFQyxJQUFJLEVBQUU7QUFDUixDQUFDLENBQ0Y7QUFFTSxNQUFNQyxlQUFlLEdBQUFKLE9BQUEsQ0FBQUksZUFBQSxHQUFHLENBQzdCLHNDQUFzQyxFQUN0QyxzQ0FBc0MsRUFDdEMsc0NBQXNDLEVBQ3RDLHNDQUFzQyxFQUN0QyxzQ0FBc0MsRUFDdEMsc0NBQXNDLEVBQ3RDLHNDQUFzQyxFQUN0QyxzQ0FBc0MsRUFDdEMsc0NBQXNDLEVBQ3RDLHNDQUFzQyxFQUN0QyxzQ0FBc0MsRUFDdEMsc0NBQXNDLEVBQ3RDLHNDQUFzQyxFQUN0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