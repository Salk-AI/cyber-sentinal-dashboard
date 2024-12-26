"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.source = exports.remoteIpDetails = exports.region = exports.networkConnection = exports.instanceId = exports.instanceDetails = exports.iamPolicyGrantGlobal = exports.guarddutyPortProbe = exports.buckets = exports.apiCall = exports.accountId = void 0;
/*
 * Wazuh app - AWS sample data
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

// Amazon AWS services
const source = exports.source = ["guardduty", "cloudtrail", "vpcflow", "config"];
const accountId = exports.accountId = ["186157501624", "117521235382", "150447125201", "18773455640", "186154171780", "250141701015"];
const region = exports.region = ["eu-west-1", "eu-west-2", "eu-west-3", "eu-north-1", "eu-central-1", "us-east-1", "us-east-2", "us-west-1", "us-west-2", "me-south-1", "ap-east-1", "ap-east-2", "ap-northeast-2", "ap-northeast-3", "ap-south-1", "ap-southeast-1", "ap-southeast-2", "ap-northeast-1", "ca-central-1"]; // https://docs.aws.amazon.com/es_es/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-regions
const buckets = exports.buckets = ["aws-sample-bucket-1", "aws-sample-bucket-2", "aws-sample-bucket-3", "aws-sample-bucket-4", "aws-sample-bucket-5", "aws-sample-bucket-6", "aws-sample-bucket-7", "aws-sample-bucket-8", "aws-sample-bucket-9"];
const instanceId = exports.instanceId = ['i-060bb01699dddc20c', 'i-060bb020479bedc20w', 'i-070eb020479bebf20a', 'i-070eb015479befb15d', 'i-057eb060779fdae15b'];
const remoteIpDetails = exports.remoteIpDetails = [{
  country: {
    countryName: "Mexico"
  },
  city: {
    cityName: "Mérida"
  },
  geoLocation: {
    lon: "-89.616700",
    lat: "20.950000"
  },
  organization: {
    asnOrg: "Internet Mexico Company",
    org: "Internet Mexico Company",
    isp: "Internet Mexico Company",
    asn: "4257"
  },
  ipAddressV4: "160.0.14.40"
}, {
  country: {
    countryName: "Italy"
  },
  city: {
    cityName: "Savona"
  },
  geoLocation: {
    lon: "8.477200",
    lat: "44.309000"
  },
  organization: {
    asnOrg: "Speedweb",
    org: "Speedweb",
    isp: "Speedweb",
    asn: "42784"
  },
  ipAddressV4: "2.25.80.45"
}, {
  country: {
    countryName: "Mexico"
  },
  city: {
    cityName: "Colima"
  },
  geoLocation: {
    lon: "-103.714500",
    lat: "19.266800"
  },
  organization: {
    asnOrg: "Internet Mexico Company",
    org: "Internet Mexico Company",
    isp: "Internet Mexico Company",
    asn: "4257"
  },
  ipAddressV4: "187.234.16.206"
}, {
  country: {
    countryName: "Netherlands"
  },
  city: {
    cityName: "Amsterdam"
  },
  geoLocation: {
    lon: "4.889700",
    lat: "52.374000"
  },
  organization: {
    asnOrg: "Netherlands Telecom",
    org: "Netherlands Telecom",
    isp: "Netherlands Telecom",
    asn: "40070"
  },
  ipAddressV4: "160.0.14.40"
}, {
  country: {
    "countryName": "Italy"
  },
  city: {
    cityName: "Palermo"
  },
  geoLocation: {
    lon: "13.334100",
    lat: "38.129000"
  },
  organization: {
    asnOrg: "Net Connections",
    org: "Net Connections",
    isp: "Net Connections",
    asn: "1547"
  },
  ipAddressV4: "75.0.101.245"
}, {
  country: {
    countryName: "United States"
  },
  city: {
    cityName: "Panama City"
  },
  geoLocation: {
    lon: "-85.669600",
    lat: "30.190900"
  },
  organization: {
    asnOrg: "Internet Innovations",
    org: "Intenet Innovations",
    isp: "Intenet Innovations",
    asn: "4252"
  },
  ipAddressV4: "70.24.101.214"
}];
const instanceDetails = exports.instanceDetails = [{
  "launchTime": "2020-04-22T11:17:08Z",
  "instanceId": "i-0b0b8b34a48c8f1c4",
  "networkInterfaces": {
    "networkInterfaceId": "eni-01e777fb9acd548e4",
    "subnetId": "subnet-7930da22",
    "vpcId": "vpc-68e3c60f",
    "privateDnsName": "ip-10-0-2-2.ec2.internal",
    "publicIp": "40.220.125.204",
    "publicDnsName": "ec2-40.220.125.204.compute-1.amazonaws.com",
    "privateIpAddress": "10.0.2.2"
  },
  "instanceState": "running",
  "imageId": "ami-0ff8a91507f77f900",
  "instanceType": "t2.small",
  "imageDescription": "Amazon Linux AMI 2018.03.0.20180811 x86_64 HVM GP2",
  "iamInstanceProfile": {
    "id": "AIPAJGAZMFPZHKIBOCBIG",
    "arn": "arn:aws:iam::{data.aws.accountId}:instance-profile/opsworks-web-production"
  },
  "availabilityZone": "us-east-1a"
}, {
  "launchTime": "2019-03-22T14:15:41Z",
  "instanceId": "i-0cab4a083d57dc400",
  "networkInterfaces": {
    "networkInterfaceId": "eni-0bb465b2d939dbda6",
    "subnetId": "subnet-6b1d6203",
    "vpcId": "vpc-921e61fa",
    "privateDnsName": "ip-10-0-0-1.ec2.internal",
    "publicIp": "54.90.48.38",
    "publicDnsName": "ec2-54.90.48.38.compute-1.amazonaws.com",
    "privateIpAddress": "10.0.0.1"
  },
  "instanceState": "running",
  "imageId": "ami-09ae67bbfcd740875",
  "instanceType": "a1.medium",
  "imageDescription": "Canonical, Ubuntu, 18.04 LTS, UNSUPPORTED daily arm64 bionic image build on 2019-02-12",
  "productCodes": {
    "productCodeId": "zud1u4kjmxu2j2jf0n36bqa",
    "productCodeType": "marketplace"
  },
  "iamInstanceProfile": {
    // FIXME
    "id": "AIPAJGAZMFPZHKIBOUFGA",
    "arn": "arn:aws:iam::{data.aws.accountId}:instance-profile/opsworks-web-production"
  },
  "availabilityZone": "us-east-1e"
}];
const guarddutyPortProbe = exports.guarddutyPortProbe = {
  data: {
    aws: {
      severity: "2",
      schemaVersion: "2.0",
      resource: {
        // instanceDetails
        resourceType: "Instance"
      },
      description: "EC2 instance has an unprotected port which is being probed by a known malicious host.",
      source: "guardduty",
      type: "Recon:EC2/PortProbeUnprotectedPort",
      title: "Unprotected port on EC2 instance {data.aws.resource.instanceDetails.instanceId} is being probed.",
      // accountId: "166157441623",
      // createdAt: "2019-07-31T16:31:14.739Z",
      partition: "aws",
      service: {
        archived: "false",
        resourceRole: "TARGET",
        detectorId: "cab38390b400c06fb2897dfcebffb80d",
        // eventFirstSeen: "2019-07-31T16:18:08Z",
        // eventLastSeen: "2020-04-22T04:11:01Z",
        additionalInfo: {
          threatListName: "ProofPoint",
          threatName: "Scanner"
        },
        count: "2594",
        action: {
          actionType: "PORT_PROBE",
          portProbeAction: {
            blocked: "false",
            portProbeDetails: {
              localPortDetails: {
                port: "80",
                portName: "HTTP"
              },
              remoteIpDetails: {
                country: {
                  countryName: "Mexico"
                },
                city: {
                  cityName: "M?rida"
                },
                geoLocation: {
                  lon: "-89.616700",
                  lat: "20.950000"
                },
                organization: {
                  asnOrg: "Internet Mexico Company",
                  org: "Internet Mexico Company",
                  isp: "Internet Mexico Company",
                  asn: "4257"
                },
                ipAddressV4: "187.234.16.206"
              }
            }
          }
        },
        "serviceName": "guardduty"
      }
    }
  },
  rule: {
    firedtimes: 1,
    mail: false,
    level: 3,
    description: "AWS GuardDuty: PORT_PROBE - Unprotected port on EC2 instance {data.aws.resource.instanceDetails.instanceId} is being probed. [IP: {data.aws.service.action.portProbeAction.portProbeDetails.remoteIpDetails.ipAddressV4}] [Port: {data.aws.service.action.portProbeAction.portProbeDetails.localPortDetails.port}]",
    groups: ["amazon", "aws", "aws_guardduty"],
    id: "80305"
  },
  location: "Wazuh-AWS",
  decoder: {
    "name": "json"
  }
};
const apiCall = exports.apiCall = {
  "data": {
    "aws": {
      "severity": "5",
      "schemaVersion": "2.0",
      "resource": {
        "accessKeyDetails": {
          "principalId": "AIDAIL4SI43KE7QMMBABB",
          "userType": "IAMUser",
          "userName": ""
        },
        "resourceType": "AccessKey"
      },
      "log_info": {
        "s3bucket": "wazuh-aws-wodle",
        "log_file": "guardduty/2020/04/22/10/firehose_guardduty-1-2020-04-22-10-36-02-d67c99dc-800a-486a-8339-59a7a8254ab2.zip"
      },
      "description": "Unusual console login seen from principal {data.aws.resource.accessKeyDetails.userName}. Login activity using this client application, from the specific location has not been seen before from this principal.",
      "source": "guardduty",
      "type": "UnauthorizedAccess:IAMUser/ConsoleLogin",
      "title": "Unusual console login was seen for principal {data.aws.resource.accessKeyDetails.userName}.",
      "accountId": "166157447443",
      "createdAt": "2020-04-22T10:30:26.721Z",
      "partition": "aws",
      "service": {
        "archived": "false",
        "resourceRole": "TARGET",
        "detectorId": "cab38390b728c06fb2897dfcebffb80d",
        "eventFirstSeen": "2020-04-22T10:09:51Z",
        "eventLastSeen": "2020-04-22T10:09:55Z",
        "additionalInfo": {
          "recentApiCalls": {
            "count": "1",
            "api": "ConsoleLogin"
          }
        },
        "count": "1",
        "action": {
          "actionType": "AWS_API_CALL",
          "awsApiCallAction": {
            "callerType": "Remote IP",
            "api": "ConsoleLogin",
            "serviceName": "signin.amazonaws.com",
            "remoteIpDetails": {
              "country": {
                "countryName": "United States"
              },
              "city": {
                "cityName": "Ashburn"
              },
              "geoLocation": {
                "lon": "-77.472800",
                "lat": "39.048100"
              },
              "organization": {
                "asnOrg": "ASN-Internet-Com",
                "org": "Internet-Com",
                "isp": "Internet-Com",
                "asn": "27850"
              },
              "ipAddressV4": "80.14.0.90"
            }
          }
        },
        "serviceName": "guardduty"
      },
      "id": "a8b8d0b82c50eed686df4d24fa87b657",
      "region": "us-east-1",
      "arn": "arn:aws:guardduty:us-east-1:166157441478:detector/cab38390b728c06fb2897dfcebffc80d/finding/a8b8d0b82c50eed686df4d24fa87b657",
      "updatedAt": "2020-04-22T10:30:26.721Z"
    }
  },
  "rule": {
    // "firedtimes": 1,
    "mail": false,
    "level": 6,
    "description": "AWS GuardDuty: AWS_API_CALL - Unusual console login was seen for principal {data.aws.resource.accessKeyDetails.userName}.",
    "groups": ["amazon", "aws", "aws_guardduty"],
    "id": "80302"
  },
  "location": "Wazuh-AWS",
  "decoder": {
    "name": "json"
  }
};
const networkConnection = exports.networkConnection = {
  "data": {
    "integration": "aws",
    "aws": {
      "severity": "5",
      "schemaVersion": "2.0",
      "resource": {
        "resourceType": "Instance"
      },
      "description": "EC2 instance {data.aws.resource.instanceDetails.instanceId} is communicating with a remote host on an unusual server port 5060.",
      "source": "guardduty",
      "type": "Behavior:EC2/NetworkPortUnusual",
      "title": "Unusual outbound communication seen from EC2 instance {data.aws.resource.instanceDetails.instanceId} on server port 5060.",
      "accountId": "166157441800",
      "createdAt": "2020-04-22T07:18:12.769Z",
      "partition": "aws",
      "service": {
        "archived": "false",
        "resourceRole": "ACTOR",
        "detectorId": "cab38390b728c06fb2897dfcebffc80d",
        "eventFirstSeen": "2020-04-22T07:13:44Z",
        "eventLastSeen": "2020-04-22T07:15:04Z",
        "additionalInfo": {
          "localPort": "50040",
          "outBytes": "1912",
          "inBytes": "4621",
          "unusual": "5060"
        },
        "count": "8",
        "action": {
          "actionType": "NETWORK_CONNECTION",
          "networkConnectionAction": {
            "localIpDetails": {
              "ipAddressV4": "10.0.0.251"
            },
            "protocol": "TCP",
            "blocked": "false",
            "connectionDirection": "OUTBOUND",
            "localPortDetails": {
              "port": "36220",
              "portName": "Unknown"
            },
            "remotePortDetails": {
              "port": "5050",
              "portName": "Unknown"
            },
            "remoteIpDetails": {
              "country": {
                "countryName": "United States"
              },
              "city": {
                "cityName": "Washington"
              },
              "geoLocation": {
                "lon": "-77.031900",
                "lat": "38.905700"
              },
              "organization": {
                "asnOrg": "ASN-Supreme-Web",
                "org": "Supreme Web",
                "isp": "Supreme Web",
                "asn": "395604"
              },
              "ipAddressV4": "8.2.14.2"
            }
          }
        },
        "serviceName": "guardduty"
      },
      "id": "06b8d0602d109db1282f9143809f80b8",
      "region": "us-east-1",
      "arn": "arn:aws:guardduty:{data.aws.region}:166157441758:detector/cab38390b728c06fb2897dfcebffb79d/finding/06b8d0602d109db1282f9143809f80b8",
      "updatedAt": "2020-04-22T07:18:12.778Z"
    }
  },
  "rule": {
    "mail": false,
    "level": 6,
    "description": "AWS GuardDuty: NETWORK_CONNECTION - Unusual outbound communication seen from EC2 instance {data.aws.resource.instanceDetails.instanceId} on server port 5060.",
    "groups": ["amazon", "aws", "aws_guardduty"],
    "id": "80302"
  },
  "location": "Wazuh-AWS",
  "decoder": {
    "name": "json"
  }
};
const iamPolicyGrantGlobal = exports.iamPolicyGrantGlobal = {
  "data": {
    "aws": {
      "severity": "CRITICAL",
      "actor": "resources.wazuh.sample.com",
      "summary": {
        "Timestamps": "2020-04-22T00:11:44.617597Z,",
        "Description": "S3 Bucket uses IAM policy to grant read rights to Everyone. Your IAM policy contains a clause that effectively grants read access to any user. Please audit this bucket, and data contained within and confirm that this is intentional. If intentional, please use the alert whitelist feature to prevent future alerts",
        "Bucket": "resources.wazuh.sample.com,",
        "Record Count": "1",
        "Event Count": "1",
        "recipientAccountId": "166157441400",
        "ACL": {
          "resources": {
            "wazuh": {
              "com": {
                "Owner": {
                  "DisplayName": "wazuh",
                  "ID": "3ab1235e25ea9e94ff9b7e4e379ba6b0c872cd36c096e1ac8cce7df433b48700"
                }
              }
            }
          }
        }
      },
      "risk-score": "9",
      "notification-type": "ALERT_CREATED",
      "name": "S3 Bucket IAM policy grants global read rights",
      "created-at": "2020-04-22T00:14:45.764008",
      "source": "macie",
      "url": "https://mt.{data.aws.region}.macie.aws.amazon.com/posts/arn%3Aaws%3Amacie%3A{data.aws.region}%3A166158075623%3Atrigger%2Fb731d9ffb1fe61508d4b490c92efa666%2Falert%2Fd78f0fd0a55ad458799e4c1fb6a0eded",
      "tags": {
        "value": "Open Permissions,Basic Alert,"
      },
      "alert-arn": "arn:aws:macie:{data.aws.region}:166157441400:trigger/b731d9ffb1fe61508d4a478c92efa666/alert/d78f0fd0a55ad458799e4c1fb6a0ed"
    }
  },
  "rule": {
    "mail": true,
    "level": 12,
    "description": "AWS Macie CRITICAL: S3 Bucket IAM policy grants global read rights - S3 Bucket uses IAM policy to grant read rights to Everyone. Your IAM policy contains a clause that effectively grants read access to any user. Please audit this bucket, and data contained within and confirm that this is intentional. If intentional, please use the alert whitelist feature to prevent future alerts",
    "groups": ["amazon", "aws", "aws_macie"],
    "id": "80355"
  },
  "location": "Wazuh-AWS",
  "decoder": {
    "name": "json"
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJzb3VyY2UiLCJleHBvcnRzIiwiYWNjb3VudElkIiwicmVnaW9uIiwiYnVja2V0cyIsImluc3RhbmNlSWQiLCJyZW1vdGVJcERldGFpbHMiLCJjb3VudHJ5IiwiY291bnRyeU5hbWUiLCJjaXR5IiwiY2l0eU5hbWUiLCJnZW9Mb2NhdGlvbiIsImxvbiIsImxhdCIsIm9yZ2FuaXphdGlvbiIsImFzbk9yZyIsIm9yZyIsImlzcCIsImFzbiIsImlwQWRkcmVzc1Y0IiwiaW5zdGFuY2VEZXRhaWxzIiwiZ3VhcmRkdXR5UG9ydFByb2JlIiwiZGF0YSIsImF3cyIsInNldmVyaXR5Iiwic2NoZW1hVmVyc2lvbiIsInJlc291cmNlIiwicmVzb3VyY2VUeXBlIiwiZGVzY3JpcHRpb24iLCJ0eXBlIiwidGl0bGUiLCJwYXJ0aXRpb24iLCJzZXJ2aWNlIiwiYXJjaGl2ZWQiLCJyZXNvdXJjZVJvbGUiLCJkZXRlY3RvcklkIiwiYWRkaXRpb25hbEluZm8iLCJ0aHJlYXRMaXN0TmFtZSIsInRocmVhdE5hbWUiLCJjb3VudCIsImFjdGlvbiIsImFjdGlvblR5cGUiLCJwb3J0UHJvYmVBY3Rpb24iLCJibG9ja2VkIiwicG9ydFByb2JlRGV0YWlscyIsImxvY2FsUG9ydERldGFpbHMiLCJwb3J0IiwicG9ydE5hbWUiLCJydWxlIiwiZmlyZWR0aW1lcyIsIm1haWwiLCJsZXZlbCIsImdyb3VwcyIsImlkIiwibG9jYXRpb24iLCJkZWNvZGVyIiwiYXBpQ2FsbCIsIm5ldHdvcmtDb25uZWN0aW9uIiwiaWFtUG9saWN5R3JhbnRHbG9iYWwiXSwic291cmNlcyI6WyJhd3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIFdhenVoIGFwcCAtIEFXUyBzYW1wbGUgZGF0YVxuICogQ29weXJpZ2h0IChDKSAyMDE1LTIwMjIgV2F6dWgsIEluYy5cbiAqXG4gKiBUaGlzIHByb2dyYW0gaXMgZnJlZSBzb2Z0d2FyZTsgeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuICogaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcbiAqIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb247IGVpdGhlciB2ZXJzaW9uIDIgb2YgdGhlIExpY2Vuc2UsIG9yXG4gKiAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEZpbmQgbW9yZSBpbmZvcm1hdGlvbiBhYm91dCB0aGlzIG9uIHRoZSBMSUNFTlNFIGZpbGUuXG4gKi9cblxuIC8vIEFtYXpvbiBBV1Mgc2VydmljZXNcbmV4cG9ydCBjb25zdCBzb3VyY2UgPSBbXCJndWFyZGR1dHlcIiwgXCJjbG91ZHRyYWlsXCIsIFwidnBjZmxvd1wiLCBcImNvbmZpZ1wiXTtcbmV4cG9ydCBjb25zdCBhY2NvdW50SWQgPSBbXCIxODYxNTc1MDE2MjRcIiwgXCIxMTc1MjEyMzUzODJcIiwgXCIxNTA0NDcxMjUyMDFcIiwgXCIxODc3MzQ1NTY0MFwiLCBcIjE4NjE1NDE3MTc4MFwiLCBcIjI1MDE0MTcwMTAxNVwiXTtcbmV4cG9ydCBjb25zdCByZWdpb24gPSBbXCJldS13ZXN0LTFcIiwgXCJldS13ZXN0LTJcIiwgXCJldS13ZXN0LTNcIiwgXCJldS1ub3J0aC0xXCIsIFwiZXUtY2VudHJhbC0xXCIsIFwidXMtZWFzdC0xXCIsIFwidXMtZWFzdC0yXCIsIFwidXMtd2VzdC0xXCIsIFwidXMtd2VzdC0yXCIsIFwibWUtc291dGgtMVwiLCBcImFwLWVhc3QtMVwiLCBcImFwLWVhc3QtMlwiLCBcImFwLW5vcnRoZWFzdC0yXCIsIFwiYXAtbm9ydGhlYXN0LTNcIiwgXCJhcC1zb3V0aC0xXCIsIFwiYXAtc291dGhlYXN0LTFcIiwgXCJhcC1zb3V0aGVhc3QtMlwiLCBcImFwLW5vcnRoZWFzdC0xXCIsIFwiY2EtY2VudHJhbC0xXCJdOyAvLyBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vZXNfZXMvQVdTRUMyL2xhdGVzdC9Vc2VyR3VpZGUvdXNpbmctcmVnaW9ucy1hdmFpbGFiaWxpdHktem9uZXMuaHRtbCNjb25jZXB0cy1yZWdpb25zXG5leHBvcnQgY29uc3QgYnVja2V0cyA9IFtcImF3cy1zYW1wbGUtYnVja2V0LTFcIiwgXCJhd3Mtc2FtcGxlLWJ1Y2tldC0yXCIsIFwiYXdzLXNhbXBsZS1idWNrZXQtM1wiLCBcImF3cy1zYW1wbGUtYnVja2V0LTRcIiwgXCJhd3Mtc2FtcGxlLWJ1Y2tldC01XCIsIFwiYXdzLXNhbXBsZS1idWNrZXQtNlwiLCBcImF3cy1zYW1wbGUtYnVja2V0LTdcIiwgXCJhd3Mtc2FtcGxlLWJ1Y2tldC04XCIsIFwiYXdzLXNhbXBsZS1idWNrZXQtOVwiXTtcblxuZXhwb3J0IGNvbnN0IGluc3RhbmNlSWQgPSBbJ2ktMDYwYmIwMTY5OWRkZGMyMGMnLCdpLTA2MGJiMDIwNDc5YmVkYzIwdycsICdpLTA3MGViMDIwNDc5YmViZjIwYScsICdpLTA3MGViMDE1NDc5YmVmYjE1ZCcsICdpLTA1N2ViMDYwNzc5ZmRhZTE1YiddO1xuXG5leHBvcnQgY29uc3QgcmVtb3RlSXBEZXRhaWxzID0gW1xuICB7XG4gICAgY291bnRyeToge1xuICAgICAgY291bnRyeU5hbWU6IFwiTWV4aWNvXCJcbiAgICB9LFxuICAgIGNpdHk6IHtcbiAgICAgIGNpdHlOYW1lOiBcIk3DqXJpZGFcIlxuICAgIH0sXG4gICAgZ2VvTG9jYXRpb246IHtcbiAgICAgIGxvbjogXCItODkuNjE2NzAwXCIsXG4gICAgICBsYXQ6IFwiMjAuOTUwMDAwXCJcbiAgICB9LFxuICAgIG9yZ2FuaXphdGlvbjoge1xuICAgICAgYXNuT3JnOiBcIkludGVybmV0IE1leGljbyBDb21wYW55XCIsXG4gICAgICBvcmc6IFwiSW50ZXJuZXQgTWV4aWNvIENvbXBhbnlcIixcbiAgICAgIGlzcDogXCJJbnRlcm5ldCBNZXhpY28gQ29tcGFueVwiLFxuICAgICAgYXNuOiBcIjQyNTdcIlxuICAgIH0sXG4gICAgaXBBZGRyZXNzVjQ6IFwiMTYwLjAuMTQuNDBcIlxuICB9LFxuICB7XG4gICAgY291bnRyeToge1xuICAgICAgY291bnRyeU5hbWU6IFwiSXRhbHlcIlxuICAgIH0sXG4gICAgY2l0eToge1xuICAgICAgY2l0eU5hbWU6IFwiU2F2b25hXCJcbiAgICB9LFxuICAgIGdlb0xvY2F0aW9uOiB7XG4gICAgICBsb246IFwiOC40NzcyMDBcIixcbiAgICAgIGxhdDogXCI0NC4zMDkwMDBcIlxuICAgIH0sXG4gICAgb3JnYW5pemF0aW9uOiB7XG4gICAgICBhc25Pcmc6IFwiU3BlZWR3ZWJcIixcbiAgICAgIG9yZzogXCJTcGVlZHdlYlwiLFxuICAgICAgaXNwOiBcIlNwZWVkd2ViXCIsXG4gICAgICBhc246IFwiNDI3ODRcIlxuICAgIH0sXG4gICAgaXBBZGRyZXNzVjQ6IFwiMi4yNS44MC40NVwiXG4gIH0sXG4gIHtcbiAgICBjb3VudHJ5OiB7XG4gICAgICBjb3VudHJ5TmFtZTogXCJNZXhpY29cIlxuICAgIH0sXG4gICAgY2l0eToge1xuICAgICAgY2l0eU5hbWU6IFwiQ29saW1hXCJcbiAgICB9LFxuICAgIGdlb0xvY2F0aW9uOiB7XG4gICAgICBsb246IFwiLTEwMy43MTQ1MDBcIixcbiAgICAgIGxhdDogXCIxOS4yNjY4MDBcIlxuICAgIH0sXG4gICAgb3JnYW5pemF0aW9uOiB7XG4gICAgICBhc25Pcmc6IFwiSW50ZXJuZXQgTWV4aWNvIENvbXBhbnlcIixcbiAgICAgIG9yZzogXCJJbnRlcm5ldCBNZXhpY28gQ29tcGFueVwiLFxuICAgICAgaXNwOiBcIkludGVybmV0IE1leGljbyBDb21wYW55XCIsXG4gICAgICBhc246IFwiNDI1N1wiXG4gICAgfSxcbiAgICBpcEFkZHJlc3NWNDogXCIxODcuMjM0LjE2LjIwNlwiXG4gIH0sXG4gIHtcbiAgICBjb3VudHJ5OiB7XG4gICAgICBjb3VudHJ5TmFtZTogXCJOZXRoZXJsYW5kc1wiXG4gICAgfSxcbiAgICBjaXR5OiB7XG4gICAgICBjaXR5TmFtZTogXCJBbXN0ZXJkYW1cIlxuICAgIH0sXG4gICAgZ2VvTG9jYXRpb246IHtcbiAgICAgIGxvbjogXCI0Ljg4OTcwMFwiLFxuICAgICAgbGF0OiBcIjUyLjM3NDAwMFwiXG4gICAgfSxcbiAgICBvcmdhbml6YXRpb246IHtcbiAgICAgIGFzbk9yZzogXCJOZXRoZXJsYW5kcyBUZWxlY29tXCIsXG4gICAgICBvcmc6IFwiTmV0aGVybGFuZHMgVGVsZWNvbVwiLFxuICAgICAgaXNwOiBcIk5ldGhlcmxhbmRzIFRlbGVjb21cIixcbiAgICAgIGFzbjogXCI0MDA3MFwiXG4gICAgfSxcbiAgICBpcEFkZHJlc3NWNDogXCIxNjAuMC4xNC40MFwiXG4gIH0sXG4gIHtcbiAgICBjb3VudHJ5OiB7XG4gICAgICBcImNvdW50cnlOYW1lXCI6IFwiSXRhbHlcIlxuICAgIH0sXG4gICAgY2l0eToge1xuICAgICAgY2l0eU5hbWU6IFwiUGFsZXJtb1wiXG4gICAgfSxcbiAgICBnZW9Mb2NhdGlvbjoge1xuICAgICAgbG9uOiBcIjEzLjMzNDEwMFwiLFxuICAgICAgbGF0OiBcIjM4LjEyOTAwMFwiXG4gICAgfSxcbiAgICBvcmdhbml6YXRpb246IHtcbiAgICAgIGFzbk9yZzogXCJOZXQgQ29ubmVjdGlvbnNcIixcbiAgICAgIG9yZzogXCJOZXQgQ29ubmVjdGlvbnNcIixcbiAgICAgIGlzcDogXCJOZXQgQ29ubmVjdGlvbnNcIixcbiAgICAgIGFzbjogXCIxNTQ3XCJcbiAgICB9LFxuICAgIGlwQWRkcmVzc1Y0OiBcIjc1LjAuMTAxLjI0NVwiXG4gIH0sXG4gIHtcbiAgICBjb3VudHJ5OiB7XG4gICAgICBjb3VudHJ5TmFtZTogXCJVbml0ZWQgU3RhdGVzXCJcbiAgICB9LFxuICAgIGNpdHk6IHtcbiAgICAgIGNpdHlOYW1lOiBcIlBhbmFtYSBDaXR5XCJcbiAgICB9LFxuICAgIGdlb0xvY2F0aW9uOiB7XG4gICAgICBsb246IFwiLTg1LjY2OTYwMFwiLFxuICAgICAgbGF0OiBcIjMwLjE5MDkwMFwiXG4gICAgfSxcbiAgICBvcmdhbml6YXRpb246IHtcbiAgICAgIGFzbk9yZzogXCJJbnRlcm5ldCBJbm5vdmF0aW9uc1wiLFxuICAgICAgb3JnOiBcIkludGVuZXQgSW5ub3ZhdGlvbnNcIixcbiAgICAgIGlzcDogXCJJbnRlbmV0IElubm92YXRpb25zXCIsXG4gICAgICBhc246IFwiNDI1MlwiXG4gICAgfSxcbiAgICBpcEFkZHJlc3NWNDogXCI3MC4yNC4xMDEuMjE0XCJcbiAgfVxuXTtcblxuZXhwb3J0IGNvbnN0IGluc3RhbmNlRGV0YWlscyA9IFtcbiAge1xuICAgIFwibGF1bmNoVGltZVwiOiBcIjIwMjAtMDQtMjJUMTE6MTc6MDhaXCIsXG4gICAgXCJpbnN0YW5jZUlkXCI6IFwiaS0wYjBiOGIzNGE0OGM4ZjFjNFwiLFxuICAgIFwibmV0d29ya0ludGVyZmFjZXNcIjoge1xuICAgICAgXCJuZXR3b3JrSW50ZXJmYWNlSWRcIjogXCJlbmktMDFlNzc3ZmI5YWNkNTQ4ZTRcIixcbiAgICAgIFwic3VibmV0SWRcIjogXCJzdWJuZXQtNzkzMGRhMjJcIixcbiAgICAgIFwidnBjSWRcIjogXCJ2cGMtNjhlM2M2MGZcIixcbiAgICAgIFwicHJpdmF0ZURuc05hbWVcIjogXCJpcC0xMC0wLTItMi5lYzIuaW50ZXJuYWxcIixcbiAgICAgIFwicHVibGljSXBcIjogXCI0MC4yMjAuMTI1LjIwNFwiLFxuICAgICAgXCJwdWJsaWNEbnNOYW1lXCI6IFwiZWMyLTQwLjIyMC4xMjUuMjA0LmNvbXB1dGUtMS5hbWF6b25hd3MuY29tXCIsXG4gICAgICBcInByaXZhdGVJcEFkZHJlc3NcIjogXCIxMC4wLjIuMlwiXG4gICAgfSxcbiAgICBcImluc3RhbmNlU3RhdGVcIjogXCJydW5uaW5nXCIsXG4gICAgXCJpbWFnZUlkXCI6IFwiYW1pLTBmZjhhOTE1MDdmNzdmOTAwXCIsXG4gICAgXCJpbnN0YW5jZVR5cGVcIjogXCJ0Mi5zbWFsbFwiLFxuICAgIFwiaW1hZ2VEZXNjcmlwdGlvblwiOiBcIkFtYXpvbiBMaW51eCBBTUkgMjAxOC4wMy4wLjIwMTgwODExIHg4Nl82NCBIVk0gR1AyXCIsXG4gICAgXCJpYW1JbnN0YW5jZVByb2ZpbGVcIjoge1xuICAgICAgXCJpZFwiOiBcIkFJUEFKR0FaTUZQWkhLSUJPQ0JJR1wiLFxuICAgICAgXCJhcm5cIjogXCJhcm46YXdzOmlhbTo6e2RhdGEuYXdzLmFjY291bnRJZH06aW5zdGFuY2UtcHJvZmlsZS9vcHN3b3Jrcy13ZWItcHJvZHVjdGlvblwiXG4gICAgfSxcbiAgICBcImF2YWlsYWJpbGl0eVpvbmVcIjogXCJ1cy1lYXN0LTFhXCJcbiAgfSxcbiAge1xuICAgIFwibGF1bmNoVGltZVwiOiBcIjIwMTktMDMtMjJUMTQ6MTU6NDFaXCIsXG4gICAgXCJpbnN0YW5jZUlkXCI6IFwiaS0wY2FiNGEwODNkNTdkYzQwMFwiLFxuICAgIFwibmV0d29ya0ludGVyZmFjZXNcIjoge1xuICAgICAgXCJuZXR3b3JrSW50ZXJmYWNlSWRcIjogXCJlbmktMGJiNDY1YjJkOTM5ZGJkYTZcIixcbiAgICAgIFwic3VibmV0SWRcIjogXCJzdWJuZXQtNmIxZDYyMDNcIixcbiAgICAgIFwidnBjSWRcIjogXCJ2cGMtOTIxZTYxZmFcIixcbiAgICAgIFwicHJpdmF0ZURuc05hbWVcIjogXCJpcC0xMC0wLTAtMS5lYzIuaW50ZXJuYWxcIixcbiAgICAgIFwicHVibGljSXBcIjogXCI1NC45MC40OC4zOFwiLFxuICAgICAgXCJwdWJsaWNEbnNOYW1lXCI6IFwiZWMyLTU0LjkwLjQ4LjM4LmNvbXB1dGUtMS5hbWF6b25hd3MuY29tXCIsXG4gICAgICBcInByaXZhdGVJcEFkZHJlc3NcIjogXCIxMC4wLjAuMVwiXG4gICAgfSxcbiAgICBcImluc3RhbmNlU3RhdGVcIjogXCJydW5uaW5nXCIsXG4gICAgXCJpbWFnZUlkXCI6IFwiYW1pLTA5YWU2N2JiZmNkNzQwODc1XCIsXG4gICAgXCJpbnN0YW5jZVR5cGVcIjogXCJhMS5tZWRpdW1cIixcbiAgICBcImltYWdlRGVzY3JpcHRpb25cIjogXCJDYW5vbmljYWwsIFVidW50dSwgMTguMDQgTFRTLCBVTlNVUFBPUlRFRCBkYWlseSBhcm02NCBiaW9uaWMgaW1hZ2UgYnVpbGQgb24gMjAxOS0wMi0xMlwiLFxuICAgIFwicHJvZHVjdENvZGVzXCI6IHtcbiAgICAgIFwicHJvZHVjdENvZGVJZFwiOiBcInp1ZDF1NGtqbXh1MmoyamYwbjM2YnFhXCIsXG4gICAgICBcInByb2R1Y3RDb2RlVHlwZVwiOiBcIm1hcmtldHBsYWNlXCJcbiAgICB9LFxuICAgIFwiaWFtSW5zdGFuY2VQcm9maWxlXCI6IHsgLy8gRklYTUVcbiAgICAgIFwiaWRcIjogXCJBSVBBSkdBWk1GUFpIS0lCT1VGR0FcIixcbiAgICAgIFwiYXJuXCI6IFwiYXJuOmF3czppYW06OntkYXRhLmF3cy5hY2NvdW50SWR9Omluc3RhbmNlLXByb2ZpbGUvb3Bzd29ya3Mtd2ViLXByb2R1Y3Rpb25cIlxuICAgIH0sXG4gICAgXCJhdmFpbGFiaWxpdHlab25lXCI6IFwidXMtZWFzdC0xZVwiXG4gIH1cbl1cblxuZXhwb3J0IGNvbnN0IGd1YXJkZHV0eVBvcnRQcm9iZSA9IHtcbiAgZGF0YToge1xuICAgIGF3czoge1xuICAgICAgc2V2ZXJpdHk6IFwiMlwiLFxuICAgICAgc2NoZW1hVmVyc2lvbjogXCIyLjBcIixcbiAgICAgIHJlc291cmNlOiB7XG4gICAgICAgIC8vIGluc3RhbmNlRGV0YWlsc1xuICAgICAgICByZXNvdXJjZVR5cGU6IFwiSW5zdGFuY2VcIlxuICAgICAgfSxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIkVDMiBpbnN0YW5jZSBoYXMgYW4gdW5wcm90ZWN0ZWQgcG9ydCB3aGljaCBpcyBiZWluZyBwcm9iZWQgYnkgYSBrbm93biBtYWxpY2lvdXMgaG9zdC5cIixcbiAgICAgIHNvdXJjZTogXCJndWFyZGR1dHlcIixcbiAgICAgIHR5cGU6IFwiUmVjb246RUMyL1BvcnRQcm9iZVVucHJvdGVjdGVkUG9ydFwiLFxuICAgICAgdGl0bGU6IFwiVW5wcm90ZWN0ZWQgcG9ydCBvbiBFQzIgaW5zdGFuY2Uge2RhdGEuYXdzLnJlc291cmNlLmluc3RhbmNlRGV0YWlscy5pbnN0YW5jZUlkfSBpcyBiZWluZyBwcm9iZWQuXCIsXG4gICAgICAvLyBhY2NvdW50SWQ6IFwiMTY2MTU3NDQxNjIzXCIsXG4gICAgICAvLyBjcmVhdGVkQXQ6IFwiMjAxOS0wNy0zMVQxNjozMToxNC43MzlaXCIsXG4gICAgICBwYXJ0aXRpb246IFwiYXdzXCIsXG4gICAgICBzZXJ2aWNlOiB7XG4gICAgICAgIGFyY2hpdmVkOiBcImZhbHNlXCIsXG4gICAgICAgIHJlc291cmNlUm9sZTogXCJUQVJHRVRcIixcbiAgICAgICAgZGV0ZWN0b3JJZDogXCJjYWIzODM5MGI0MDBjMDZmYjI4OTdkZmNlYmZmYjgwZFwiLFxuICAgICAgICAvLyBldmVudEZpcnN0U2VlbjogXCIyMDE5LTA3LTMxVDE2OjE4OjA4WlwiLFxuICAgICAgICAvLyBldmVudExhc3RTZWVuOiBcIjIwMjAtMDQtMjJUMDQ6MTE6MDFaXCIsXG4gICAgICAgIGFkZGl0aW9uYWxJbmZvOiB7XG4gICAgICAgICAgdGhyZWF0TGlzdE5hbWU6IFwiUHJvb2ZQb2ludFwiLFxuICAgICAgICAgIHRocmVhdE5hbWU6IFwiU2Nhbm5lclwiXG4gICAgICAgIH0sXG4gICAgICAgIGNvdW50OiBcIjI1OTRcIixcbiAgICAgICAgYWN0aW9uOiB7XG4gICAgICAgICAgYWN0aW9uVHlwZTogXCJQT1JUX1BST0JFXCIsXG4gICAgICAgICAgcG9ydFByb2JlQWN0aW9uOiB7XG4gICAgICAgICAgICBibG9ja2VkOiBcImZhbHNlXCIsXG4gICAgICAgICAgICBwb3J0UHJvYmVEZXRhaWxzOiB7XG4gICAgICAgICAgICAgIGxvY2FsUG9ydERldGFpbHM6IHtcbiAgICAgICAgICAgICAgICBwb3J0OiBcIjgwXCIsXG4gICAgICAgICAgICAgICAgcG9ydE5hbWU6IFwiSFRUUFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHJlbW90ZUlwRGV0YWlsczoge1xuICAgICAgICAgICAgICAgIGNvdW50cnk6IHtcbiAgICAgICAgICAgICAgICAgIGNvdW50cnlOYW1lOiBcIk1leGljb1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBjaXR5OiB7XG4gICAgICAgICAgICAgICAgICBjaXR5TmFtZTogXCJNP3JpZGFcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZ2VvTG9jYXRpb246IHtcbiAgICAgICAgICAgICAgICAgIGxvbjogXCItODkuNjE2NzAwXCIsXG4gICAgICAgICAgICAgICAgICBsYXQ6IFwiMjAuOTUwMDAwXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9yZ2FuaXphdGlvbjoge1xuICAgICAgICAgICAgICAgICAgYXNuT3JnOiBcIkludGVybmV0IE1leGljbyBDb21wYW55XCIsXG4gICAgICAgICAgICAgICAgICBvcmc6IFwiSW50ZXJuZXQgTWV4aWNvIENvbXBhbnlcIixcbiAgICAgICAgICAgICAgICAgIGlzcDogXCJJbnRlcm5ldCBNZXhpY28gQ29tcGFueVwiLFxuICAgICAgICAgICAgICAgICAgYXNuOiBcIjQyNTdcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgaXBBZGRyZXNzVjQ6IFwiMTg3LjIzNC4xNi4yMDZcIlxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInNlcnZpY2VOYW1lXCI6IFwiZ3VhcmRkdXR5XCJcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHJ1bGU6IHtcbiAgICBmaXJlZHRpbWVzOiAxLFxuICAgIG1haWw6IGZhbHNlLFxuICAgIGxldmVsOiAzLFxuICAgIGRlc2NyaXB0aW9uOiBcIkFXUyBHdWFyZER1dHk6IFBPUlRfUFJPQkUgLSBVbnByb3RlY3RlZCBwb3J0IG9uIEVDMiBpbnN0YW5jZSB7ZGF0YS5hd3MucmVzb3VyY2UuaW5zdGFuY2VEZXRhaWxzLmluc3RhbmNlSWR9IGlzIGJlaW5nIHByb2JlZC4gW0lQOiB7ZGF0YS5hd3Muc2VydmljZS5hY3Rpb24ucG9ydFByb2JlQWN0aW9uLnBvcnRQcm9iZURldGFpbHMucmVtb3RlSXBEZXRhaWxzLmlwQWRkcmVzc1Y0fV0gW1BvcnQ6IHtkYXRhLmF3cy5zZXJ2aWNlLmFjdGlvbi5wb3J0UHJvYmVBY3Rpb24ucG9ydFByb2JlRGV0YWlscy5sb2NhbFBvcnREZXRhaWxzLnBvcnR9XVwiLFxuICAgIGdyb3VwczogW1wiYW1hem9uXCIsXCJhd3NcIixcImF3c19ndWFyZGR1dHlcIl0sXG4gICAgaWQ6IFwiODAzMDVcIlxuICB9LFxuICBsb2NhdGlvbjogXCJXYXp1aC1BV1NcIixcbiAgZGVjb2Rlcjoge1xuICAgIFwibmFtZVwiOiBcImpzb25cIlxuICB9LFxufTtcblxuZXhwb3J0IGNvbnN0IGFwaUNhbGwgPSB7XG4gIFwiZGF0YVwiOiB7XG4gICAgXCJhd3NcIjoge1xuICAgICAgXCJzZXZlcml0eVwiOiBcIjVcIixcbiAgICAgIFwic2NoZW1hVmVyc2lvblwiOiBcIjIuMFwiLFxuICAgICAgXCJyZXNvdXJjZVwiOiB7XG4gICAgICAgIFwiYWNjZXNzS2V5RGV0YWlsc1wiOiB7XG4gICAgICAgICAgXCJwcmluY2lwYWxJZFwiOiBcIkFJREFJTDRTSTQzS0U3UU1NQkFCQlwiLFxuICAgICAgICAgIFwidXNlclR5cGVcIjogXCJJQU1Vc2VyXCIsXG4gICAgICAgICAgXCJ1c2VyTmFtZVwiOiBcIlwiXG4gICAgICAgIH0sXG4gICAgICAgIFwicmVzb3VyY2VUeXBlXCI6IFwiQWNjZXNzS2V5XCJcbiAgICAgIH0sXG4gICAgICBcImxvZ19pbmZvXCI6IHtcbiAgICAgICAgXCJzM2J1Y2tldFwiOiBcIndhenVoLWF3cy13b2RsZVwiLFxuICAgICAgICBcImxvZ19maWxlXCI6IFwiZ3VhcmRkdXR5LzIwMjAvMDQvMjIvMTAvZmlyZWhvc2VfZ3VhcmRkdXR5LTEtMjAyMC0wNC0yMi0xMC0zNi0wMi1kNjdjOTlkYy04MDBhLTQ4NmEtODMzOS01OWE3YTgyNTRhYjIuemlwXCJcbiAgICAgIH0sXG4gICAgICBcImRlc2NyaXB0aW9uXCI6IFwiVW51c3VhbCBjb25zb2xlIGxvZ2luIHNlZW4gZnJvbSBwcmluY2lwYWwge2RhdGEuYXdzLnJlc291cmNlLmFjY2Vzc0tleURldGFpbHMudXNlck5hbWV9LiBMb2dpbiBhY3Rpdml0eSB1c2luZyB0aGlzIGNsaWVudCBhcHBsaWNhdGlvbiwgZnJvbSB0aGUgc3BlY2lmaWMgbG9jYXRpb24gaGFzIG5vdCBiZWVuIHNlZW4gYmVmb3JlIGZyb20gdGhpcyBwcmluY2lwYWwuXCIsXG4gICAgICBcInNvdXJjZVwiOiBcImd1YXJkZHV0eVwiLFxuICAgICAgXCJ0eXBlXCI6IFwiVW5hdXRob3JpemVkQWNjZXNzOklBTVVzZXIvQ29uc29sZUxvZ2luXCIsXG4gICAgICBcInRpdGxlXCI6IFwiVW51c3VhbCBjb25zb2xlIGxvZ2luIHdhcyBzZWVuIGZvciBwcmluY2lwYWwge2RhdGEuYXdzLnJlc291cmNlLmFjY2Vzc0tleURldGFpbHMudXNlck5hbWV9LlwiLFxuICAgICAgXCJhY2NvdW50SWRcIjogXCIxNjYxNTc0NDc0NDNcIixcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyMC0wNC0yMlQxMDozMDoyNi43MjFaXCIsXG4gICAgICBcInBhcnRpdGlvblwiOiBcImF3c1wiLFxuICAgICAgXCJzZXJ2aWNlXCI6IHtcbiAgICAgICAgXCJhcmNoaXZlZFwiOiBcImZhbHNlXCIsXG4gICAgICAgIFwicmVzb3VyY2VSb2xlXCI6IFwiVEFSR0VUXCIsXG4gICAgICAgIFwiZGV0ZWN0b3JJZFwiOiBcImNhYjM4MzkwYjcyOGMwNmZiMjg5N2RmY2ViZmZiODBkXCIsXG4gICAgICAgIFwiZXZlbnRGaXJzdFNlZW5cIjogXCIyMDIwLTA0LTIyVDEwOjA5OjUxWlwiLFxuICAgICAgICBcImV2ZW50TGFzdFNlZW5cIjogXCIyMDIwLTA0LTIyVDEwOjA5OjU1WlwiLFxuICAgICAgICBcImFkZGl0aW9uYWxJbmZvXCI6IHtcbiAgICAgICAgICBcInJlY2VudEFwaUNhbGxzXCI6IHtcbiAgICAgICAgICAgIFwiY291bnRcIjogXCIxXCIsXG4gICAgICAgICAgICBcImFwaVwiOiBcIkNvbnNvbGVMb2dpblwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcImNvdW50XCI6IFwiMVwiLFxuICAgICAgICBcImFjdGlvblwiOiB7XG4gICAgICAgICAgXCJhY3Rpb25UeXBlXCI6IFwiQVdTX0FQSV9DQUxMXCIsXG4gICAgICAgICAgXCJhd3NBcGlDYWxsQWN0aW9uXCI6IHtcbiAgICAgICAgICAgIFwiY2FsbGVyVHlwZVwiOiBcIlJlbW90ZSBJUFwiLFxuICAgICAgICAgICAgXCJhcGlcIjogXCJDb25zb2xlTG9naW5cIixcbiAgICAgICAgICAgIFwic2VydmljZU5hbWVcIjogXCJzaWduaW4uYW1hem9uYXdzLmNvbVwiLFxuICAgICAgICAgICAgXCJyZW1vdGVJcERldGFpbHNcIjoge1xuICAgICAgICAgICAgICBcImNvdW50cnlcIjoge1xuICAgICAgICAgICAgICAgIFwiY291bnRyeU5hbWVcIjogXCJVbml0ZWQgU3RhdGVzXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjaXR5XCI6IHtcbiAgICAgICAgICAgICAgICBcImNpdHlOYW1lXCI6IFwiQXNoYnVyblwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiZ2VvTG9jYXRpb25cIjoge1xuICAgICAgICAgICAgICAgIFwibG9uXCI6IFwiLTc3LjQ3MjgwMFwiLFxuICAgICAgICAgICAgICAgIFwibGF0XCI6IFwiMzkuMDQ4MTAwXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJvcmdhbml6YXRpb25cIjoge1xuICAgICAgICAgICAgICAgIFwiYXNuT3JnXCI6IFwiQVNOLUludGVybmV0LUNvbVwiLFxuICAgICAgICAgICAgICAgIFwib3JnXCI6IFwiSW50ZXJuZXQtQ29tXCIsXG4gICAgICAgICAgICAgICAgXCJpc3BcIjogXCJJbnRlcm5ldC1Db21cIixcbiAgICAgICAgICAgICAgICBcImFzblwiOiBcIjI3ODUwXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJpcEFkZHJlc3NWNFwiOiBcIjgwLjE0LjAuOTBcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJzZXJ2aWNlTmFtZVwiOiBcImd1YXJkZHV0eVwiXG4gICAgICB9LFxuICAgICAgXCJpZFwiOiBcImE4YjhkMGI4MmM1MGVlZDY4NmRmNGQyNGZhODdiNjU3XCIsXG4gICAgICBcInJlZ2lvblwiOiBcInVzLWVhc3QtMVwiLFxuICAgICAgXCJhcm5cIjogXCJhcm46YXdzOmd1YXJkZHV0eTp1cy1lYXN0LTE6MTY2MTU3NDQxNDc4OmRldGVjdG9yL2NhYjM4MzkwYjcyOGMwNmZiMjg5N2RmY2ViZmZjODBkL2ZpbmRpbmcvYThiOGQwYjgyYzUwZWVkNjg2ZGY0ZDI0ZmE4N2I2NTdcIixcbiAgICAgIFwidXBkYXRlZEF0XCI6IFwiMjAyMC0wNC0yMlQxMDozMDoyNi43MjFaXCJcbiAgICB9XG4gIH0sXG4gIFwicnVsZVwiOiB7XG4gICAgLy8gXCJmaXJlZHRpbWVzXCI6IDEsXG4gICAgXCJtYWlsXCI6IGZhbHNlLFxuICAgIFwibGV2ZWxcIjogNixcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiQVdTIEd1YXJkRHV0eTogQVdTX0FQSV9DQUxMIC0gVW51c3VhbCBjb25zb2xlIGxvZ2luIHdhcyBzZWVuIGZvciBwcmluY2lwYWwge2RhdGEuYXdzLnJlc291cmNlLmFjY2Vzc0tleURldGFpbHMudXNlck5hbWV9LlwiLFxuICAgIFwiZ3JvdXBzXCI6IFtcbiAgICAgIFwiYW1hem9uXCIsXG4gICAgICBcImF3c1wiLFxuICAgICAgXCJhd3NfZ3VhcmRkdXR5XCJcbiAgICBdLFxuICAgIFwiaWRcIjogXCI4MDMwMlwiXG4gIH0sXG4gIFwibG9jYXRpb25cIjogXCJXYXp1aC1BV1NcIixcbiAgXCJkZWNvZGVyXCI6IHtcbiAgICBcIm5hbWVcIjogXCJqc29uXCJcbiAgfVxufTtcblxuZXhwb3J0IGNvbnN0IG5ldHdvcmtDb25uZWN0aW9uID0ge1xuICBcImRhdGFcIjoge1xuICAgIFwiaW50ZWdyYXRpb25cIjogXCJhd3NcIixcbiAgICBcImF3c1wiOiB7XG4gICAgICBcInNldmVyaXR5XCI6IFwiNVwiLFxuICAgICAgXCJzY2hlbWFWZXJzaW9uXCI6IFwiMi4wXCIsXG4gICAgICBcInJlc291cmNlXCI6IHtcbiAgICAgICAgXCJyZXNvdXJjZVR5cGVcIjogXCJJbnN0YW5jZVwiXG4gICAgICB9LFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIkVDMiBpbnN0YW5jZSB7ZGF0YS5hd3MucmVzb3VyY2UuaW5zdGFuY2VEZXRhaWxzLmluc3RhbmNlSWR9IGlzIGNvbW11bmljYXRpbmcgd2l0aCBhIHJlbW90ZSBob3N0IG9uIGFuIHVudXN1YWwgc2VydmVyIHBvcnQgNTA2MC5cIixcbiAgICAgIFwic291cmNlXCI6IFwiZ3VhcmRkdXR5XCIsXG4gICAgICBcInR5cGVcIjogXCJCZWhhdmlvcjpFQzIvTmV0d29ya1BvcnRVbnVzdWFsXCIsXG4gICAgICBcInRpdGxlXCI6IFwiVW51c3VhbCBvdXRib3VuZCBjb21tdW5pY2F0aW9uIHNlZW4gZnJvbSBFQzIgaW5zdGFuY2Uge2RhdGEuYXdzLnJlc291cmNlLmluc3RhbmNlRGV0YWlscy5pbnN0YW5jZUlkfSBvbiBzZXJ2ZXIgcG9ydCA1MDYwLlwiLFxuICAgICAgXCJhY2NvdW50SWRcIjogXCIxNjYxNTc0NDE4MDBcIixcbiAgICAgIFwiY3JlYXRlZEF0XCI6IFwiMjAyMC0wNC0yMlQwNzoxODoxMi43NjlaXCIsXG4gICAgICBcInBhcnRpdGlvblwiOiBcImF3c1wiLFxuICAgICAgXCJzZXJ2aWNlXCI6IHtcbiAgICAgICAgXCJhcmNoaXZlZFwiOiBcImZhbHNlXCIsXG4gICAgICAgIFwicmVzb3VyY2VSb2xlXCI6IFwiQUNUT1JcIixcbiAgICAgICAgXCJkZXRlY3RvcklkXCI6IFwiY2FiMzgzOTBiNzI4YzA2ZmIyODk3ZGZjZWJmZmM4MGRcIixcbiAgICAgICAgXCJldmVudEZpcnN0U2VlblwiOiBcIjIwMjAtMDQtMjJUMDc6MTM6NDRaXCIsXG4gICAgICAgIFwiZXZlbnRMYXN0U2VlblwiOiBcIjIwMjAtMDQtMjJUMDc6MTU6MDRaXCIsXG4gICAgICAgIFwiYWRkaXRpb25hbEluZm9cIjoge1xuICAgICAgICAgIFwibG9jYWxQb3J0XCI6IFwiNTAwNDBcIixcbiAgICAgICAgICBcIm91dEJ5dGVzXCI6IFwiMTkxMlwiLFxuICAgICAgICAgIFwiaW5CeXRlc1wiOiBcIjQ2MjFcIixcbiAgICAgICAgICBcInVudXN1YWxcIjogXCI1MDYwXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJjb3VudFwiOiBcIjhcIixcbiAgICAgICAgXCJhY3Rpb25cIjoge1xuICAgICAgICAgIFwiYWN0aW9uVHlwZVwiOiBcIk5FVFdPUktfQ09OTkVDVElPTlwiLFxuICAgICAgICAgIFwibmV0d29ya0Nvbm5lY3Rpb25BY3Rpb25cIjoge1xuICAgICAgICAgICAgXCJsb2NhbElwRGV0YWlsc1wiOiB7XG4gICAgICAgICAgICAgIFwiaXBBZGRyZXNzVjRcIjogXCIxMC4wLjAuMjUxXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInByb3RvY29sXCI6IFwiVENQXCIsXG4gICAgICAgICAgICBcImJsb2NrZWRcIjogXCJmYWxzZVwiLFxuICAgICAgICAgICAgXCJjb25uZWN0aW9uRGlyZWN0aW9uXCI6IFwiT1VUQk9VTkRcIixcbiAgICAgICAgICAgIFwibG9jYWxQb3J0RGV0YWlsc1wiOiB7XG4gICAgICAgICAgICAgIFwicG9ydFwiOiBcIjM2MjIwXCIsXG4gICAgICAgICAgICAgIFwicG9ydE5hbWVcIjogXCJVbmtub3duXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInJlbW90ZVBvcnREZXRhaWxzXCI6IHtcbiAgICAgICAgICAgICAgXCJwb3J0XCI6IFwiNTA1MFwiLFxuICAgICAgICAgICAgICBcInBvcnROYW1lXCI6IFwiVW5rbm93blwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJyZW1vdGVJcERldGFpbHNcIjoge1xuICAgICAgICAgICAgICBcImNvdW50cnlcIjoge1xuICAgICAgICAgICAgICAgIFwiY291bnRyeU5hbWVcIjogXCJVbml0ZWQgU3RhdGVzXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJjaXR5XCI6IHtcbiAgICAgICAgICAgICAgICBcImNpdHlOYW1lXCI6IFwiV2FzaGluZ3RvblwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiZ2VvTG9jYXRpb25cIjoge1xuICAgICAgICAgICAgICAgIFwibG9uXCI6IFwiLTc3LjAzMTkwMFwiLFxuICAgICAgICAgICAgICAgIFwibGF0XCI6IFwiMzguOTA1NzAwXCJcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXCJvcmdhbml6YXRpb25cIjoge1xuICAgICAgICAgICAgICAgIFwiYXNuT3JnXCI6IFwiQVNOLVN1cHJlbWUtV2ViXCIsXG4gICAgICAgICAgICAgICAgXCJvcmdcIjogXCJTdXByZW1lIFdlYlwiLFxuICAgICAgICAgICAgICAgIFwiaXNwXCI6IFwiU3VwcmVtZSBXZWJcIixcbiAgICAgICAgICAgICAgICBcImFzblwiOiBcIjM5NTYwNFwiXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIFwiaXBBZGRyZXNzVjRcIjogXCI4LjIuMTQuMlwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBcInNlcnZpY2VOYW1lXCI6IFwiZ3VhcmRkdXR5XCJcbiAgICAgIH0sXG4gICAgICBcImlkXCI6IFwiMDZiOGQwNjAyZDEwOWRiMTI4MmY5MTQzODA5ZjgwYjhcIixcbiAgICAgIFwicmVnaW9uXCI6IFwidXMtZWFzdC0xXCIsXG4gICAgICBcImFyblwiOiBcImFybjphd3M6Z3VhcmRkdXR5OntkYXRhLmF3cy5yZWdpb259OjE2NjE1NzQ0MTc1ODpkZXRlY3Rvci9jYWIzODM5MGI3MjhjMDZmYjI4OTdkZmNlYmZmYjc5ZC9maW5kaW5nLzA2YjhkMDYwMmQxMDlkYjEyODJmOTE0MzgwOWY4MGI4XCIsXG4gICAgICBcInVwZGF0ZWRBdFwiOiBcIjIwMjAtMDQtMjJUMDc6MTg6MTIuNzc4WlwiXG4gICAgfVxuICB9LFxuICBcInJ1bGVcIjoge1xuICAgIFwibWFpbFwiOiBmYWxzZSxcbiAgICBcImxldmVsXCI6IDYsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkFXUyBHdWFyZER1dHk6IE5FVFdPUktfQ09OTkVDVElPTiAtIFVudXN1YWwgb3V0Ym91bmQgY29tbXVuaWNhdGlvbiBzZWVuIGZyb20gRUMyIGluc3RhbmNlIHtkYXRhLmF3cy5yZXNvdXJjZS5pbnN0YW5jZURldGFpbHMuaW5zdGFuY2VJZH0gb24gc2VydmVyIHBvcnQgNTA2MC5cIixcbiAgICBcImdyb3Vwc1wiOiBbXG4gICAgICBcImFtYXpvblwiLFxuICAgICAgXCJhd3NcIixcbiAgICAgIFwiYXdzX2d1YXJkZHV0eVwiXG4gICAgXSxcbiAgICBcImlkXCI6IFwiODAzMDJcIlxuICB9LFxuICBcImxvY2F0aW9uXCI6IFwiV2F6dWgtQVdTXCIsXG4gIFwiZGVjb2RlclwiOiB7XG4gICAgXCJuYW1lXCI6IFwianNvblwiXG4gIH0sXG59O1xuXG5leHBvcnQgY29uc3QgaWFtUG9saWN5R3JhbnRHbG9iYWwgPSB7XG4gIFwiZGF0YVwiOiB7XG4gICAgXCJhd3NcIjoge1xuICAgICAgXCJzZXZlcml0eVwiOiBcIkNSSVRJQ0FMXCIsXG4gICAgICBcImFjdG9yXCI6IFwicmVzb3VyY2VzLndhenVoLnNhbXBsZS5jb21cIixcbiAgICAgIFwic3VtbWFyeVwiOiB7XG4gICAgICAgIFwiVGltZXN0YW1wc1wiOiBcIjIwMjAtMDQtMjJUMDA6MTE6NDQuNjE3NTk3WixcIixcbiAgICAgICAgXCJEZXNjcmlwdGlvblwiOiBcIlMzIEJ1Y2tldCB1c2VzIElBTSBwb2xpY3kgdG8gZ3JhbnQgcmVhZCByaWdodHMgdG8gRXZlcnlvbmUuIFlvdXIgSUFNIHBvbGljeSBjb250YWlucyBhIGNsYXVzZSB0aGF0IGVmZmVjdGl2ZWx5IGdyYW50cyByZWFkIGFjY2VzcyB0byBhbnkgdXNlci4gUGxlYXNlIGF1ZGl0IHRoaXMgYnVja2V0LCBhbmQgZGF0YSBjb250YWluZWQgd2l0aGluIGFuZCBjb25maXJtIHRoYXQgdGhpcyBpcyBpbnRlbnRpb25hbC4gSWYgaW50ZW50aW9uYWwsIHBsZWFzZSB1c2UgdGhlIGFsZXJ0IHdoaXRlbGlzdCBmZWF0dXJlIHRvIHByZXZlbnQgZnV0dXJlIGFsZXJ0c1wiLFxuICAgICAgICBcIkJ1Y2tldFwiOiBcInJlc291cmNlcy53YXp1aC5zYW1wbGUuY29tLFwiLFxuICAgICAgICBcIlJlY29yZCBDb3VudFwiOiBcIjFcIixcbiAgICAgICAgXCJFdmVudCBDb3VudFwiOiBcIjFcIixcbiAgICAgICAgXCJyZWNpcGllbnRBY2NvdW50SWRcIjogXCIxNjYxNTc0NDE0MDBcIixcbiAgICAgICAgXCJBQ0xcIjoge1xuICAgICAgICAgIFwicmVzb3VyY2VzXCI6IHtcbiAgICAgICAgICAgIFwid2F6dWhcIjoge1xuICAgICAgICAgICAgICBcImNvbVwiOiB7XG4gICAgICAgICAgICAgICAgXCJPd25lclwiOiB7XG4gICAgICAgICAgICAgICAgICBcIkRpc3BsYXlOYW1lXCI6IFwid2F6dWhcIixcbiAgICAgICAgICAgICAgICAgIFwiSURcIjogXCIzYWIxMjM1ZTI1ZWE5ZTk0ZmY5YjdlNGUzNzliYTZiMGM4NzJjZDM2YzA5NmUxYWM4Y2NlN2RmNDMzYjQ4NzAwXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBcInJpc2stc2NvcmVcIjogXCI5XCIsXG4gICAgICBcIm5vdGlmaWNhdGlvbi10eXBlXCI6IFwiQUxFUlRfQ1JFQVRFRFwiLFxuICAgICAgXCJuYW1lXCI6IFwiUzMgQnVja2V0IElBTSBwb2xpY3kgZ3JhbnRzIGdsb2JhbCByZWFkIHJpZ2h0c1wiLFxuICAgICAgXCJjcmVhdGVkLWF0XCI6IFwiMjAyMC0wNC0yMlQwMDoxNDo0NS43NjQwMDhcIixcbiAgICAgIFwic291cmNlXCI6IFwibWFjaWVcIixcbiAgICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9tdC57ZGF0YS5hd3MucmVnaW9ufS5tYWNpZS5hd3MuYW1hem9uLmNvbS9wb3N0cy9hcm4lM0Fhd3MlM0FtYWNpZSUzQXtkYXRhLmF3cy5yZWdpb259JTNBMTY2MTU4MDc1NjIzJTNBdHJpZ2dlciUyRmI3MzFkOWZmYjFmZTYxNTA4ZDRiNDkwYzkyZWZhNjY2JTJGYWxlcnQlMkZkNzhmMGZkMGE1NWFkNDU4Nzk5ZTRjMWZiNmEwZWRlZFwiLFxuICAgICAgXCJ0YWdzXCI6IHtcbiAgICAgICAgXCJ2YWx1ZVwiOiBcIk9wZW4gUGVybWlzc2lvbnMsQmFzaWMgQWxlcnQsXCJcbiAgICAgIH0sXG4gICAgICBcImFsZXJ0LWFyblwiOiBcImFybjphd3M6bWFjaWU6e2RhdGEuYXdzLnJlZ2lvbn06MTY2MTU3NDQxNDAwOnRyaWdnZXIvYjczMWQ5ZmZiMWZlNjE1MDhkNGE0NzhjOTJlZmE2NjYvYWxlcnQvZDc4ZjBmZDBhNTVhZDQ1ODc5OWU0YzFmYjZhMGVkXCJcbiAgICB9XG4gIH0sXG4gIFwicnVsZVwiOiB7XG4gICAgXCJtYWlsXCI6IHRydWUsXG4gICAgXCJsZXZlbFwiOiAxMixcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiQVdTIE1hY2llIENSSVRJQ0FMOiBTMyBCdWNrZXQgSUFNIHBvbGljeSBncmFudHMgZ2xvYmFsIHJlYWQgcmlnaHRzIC0gUzMgQnVja2V0IHVzZXMgSUFNIHBvbGljeSB0byBncmFudCByZWFkIHJpZ2h0cyB0byBFdmVyeW9uZS4gWW91ciBJQU0gcG9saWN5IGNvbnRhaW5zIGEgY2xhdXNlIHRoYXQgZWZmZWN0aXZlbHkgZ3JhbnRzIHJlYWQgYWNjZXNzIHRvIGFueSB1c2VyLiBQbGVhc2UgYXVkaXQgdGhpcyBidWNrZXQsIGFuZCBkYXRhIGNvbnRhaW5lZCB3aXRoaW4gYW5kIGNvbmZpcm0gdGhhdCB0aGlzIGlzIGludGVudGlvbmFsLiBJZiBpbnRlbnRpb25hbCwgcGxlYXNlIHVzZSB0aGUgYWxlcnQgd2hpdGVsaXN0IGZlYXR1cmUgdG8gcHJldmVudCBmdXR1cmUgYWxlcnRzXCIsXG4gICAgXCJncm91cHNcIjogW1wiYW1hem9uXCIsXCJhd3NcIixcImF3c19tYWNpZVwiXSxcbiAgICBcImlkXCI6IFwiODAzNTVcIlxuICB9LFxuICBcImxvY2F0aW9uXCI6IFwiV2F6dWgtQVdTXCIsXG4gIFwiZGVjb2RlclwiOiB7XG4gICAgXCJuYW1lXCI6IFwianNvblwiXG4gIH1cbn07XG4iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUM7QUFDTSxNQUFNQSxNQUFNLEdBQUFDLE9BQUEsQ0FBQUQsTUFBQSxHQUFHLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDO0FBQy9ELE1BQU1FLFNBQVMsR0FBQUQsT0FBQSxDQUFBQyxTQUFBLEdBQUcsQ0FBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBQztBQUNqSCxNQUFNQyxNQUFNLEdBQUFGLE9BQUEsQ0FBQUUsTUFBQSxHQUFHLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUM7QUFDMVMsTUFBTUMsT0FBTyxHQUFBSCxPQUFBLENBQUFHLE9BQUEsR0FBRyxDQUFDLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixFQUFFLHFCQUFxQixDQUFDO0FBRS9OLE1BQU1DLFVBQVUsR0FBQUosT0FBQSxDQUFBSSxVQUFBLEdBQUcsQ0FBQyxxQkFBcUIsRUFBQyxzQkFBc0IsRUFBRSxzQkFBc0IsRUFBRSxzQkFBc0IsRUFBRSxzQkFBc0IsQ0FBQztBQUV6SSxNQUFNQyxlQUFlLEdBQUFMLE9BQUEsQ0FBQUssZUFBQSxHQUFHLENBQzdCO0VBQ0VDLE9BQU8sRUFBRTtJQUNQQyxXQUFXLEVBQUU7RUFDZixDQUFDO0VBQ0RDLElBQUksRUFBRTtJQUNKQyxRQUFRLEVBQUU7RUFDWixDQUFDO0VBQ0RDLFdBQVcsRUFBRTtJQUNYQyxHQUFHLEVBQUUsWUFBWTtJQUNqQkMsR0FBRyxFQUFFO0VBQ1AsQ0FBQztFQUNEQyxZQUFZLEVBQUU7SUFDWkMsTUFBTSxFQUFFLHlCQUF5QjtJQUNqQ0MsR0FBRyxFQUFFLHlCQUF5QjtJQUM5QkMsR0FBRyxFQUFFLHlCQUF5QjtJQUM5QkMsR0FBRyxFQUFFO0VBQ1AsQ0FBQztFQUNEQyxXQUFXLEVBQUU7QUFDZixDQUFDLEVBQ0Q7RUFDRVosT0FBTyxFQUFFO0lBQ1BDLFdBQVcsRUFBRTtFQUNmLENBQUM7RUFDREMsSUFBSSxFQUFFO0lBQ0pDLFFBQVEsRUFBRTtFQUNaLENBQUM7RUFDREMsV0FBVyxFQUFFO0lBQ1hDLEdBQUcsRUFBRSxVQUFVO0lBQ2ZDLEdBQUcsRUFBRTtFQUNQLENBQUM7RUFDREMsWUFBWSxFQUFFO0lBQ1pDLE1BQU0sRUFBRSxVQUFVO0lBQ2xCQyxHQUFHLEVBQUUsVUFBVTtJQUNmQyxHQUFHLEVBQUUsVUFBVTtJQUNmQyxHQUFHLEVBQUU7RUFDUCxDQUFDO0VBQ0RDLFdBQVcsRUFBRTtBQUNmLENBQUMsRUFDRDtFQUNFWixPQUFPLEVBQUU7SUFDUEMsV0FBVyxFQUFFO0VBQ2YsQ0FBQztFQUNEQyxJQUFJLEVBQUU7SUFDSkMsUUFBUSxFQUFFO0VBQ1osQ0FBQztFQUNEQyxXQUFXLEVBQUU7SUFDWEMsR0FBRyxFQUFFLGFBQWE7SUFDbEJDLEdBQUcsRUFBRTtFQUNQLENBQUM7RUFDREMsWUFBWSxFQUFFO0lBQ1pDLE1BQU0sRUFBRSx5QkFBeUI7SUFDakNDLEdBQUcsRUFBRSx5QkFBeUI7SUFDOUJDLEdBQUcsRUFBRSx5QkFBeUI7SUFDOUJDLEdBQUcsRUFBRTtFQUNQLENBQUM7RUFDREMsV0FBVyxFQUFFO0FBQ2YsQ0FBQyxFQUNEO0VBQ0VaLE9BQU8sRUFBRTtJQUNQQyxXQUFXLEVBQUU7RUFDZixDQUFDO0VBQ0RDLElBQUksRUFBRTtJQUNKQyxRQUFRLEVBQUU7RUFDWixDQUFDO0VBQ0RDLFdBQVcsRUFBRTtJQUNYQyxHQUFHLEVBQUUsVUFBVTtJQUNmQyxHQUFHLEVBQUU7RUFDUCxDQUFDO0VBQ0RDLFlBQVksRUFBRTtJQUNaQyxNQUFNLEVBQUUscUJBQXFCO0lBQzdCQyxHQUFHLEVBQUUscUJBQXFCO0lBQzFCQyxHQUFHLEVBQUUscUJBQXFCO0lBQzFCQyxHQUFHLEVBQUU7RUFDUCxDQUFDO0VBQ0RDLFdBQVcsRUFBRTtBQUNmLENBQUMsRUFDRDtFQUNFWixPQUFPLEVBQUU7SUFDUCxhQUFhLEVBQUU7RUFDakIsQ0FBQztFQUNERSxJQUFJLEVBQUU7SUFDSkMsUUFBUSxFQUFFO0VBQ1osQ0FBQztFQUNEQyxXQUFXLEVBQUU7SUFDWEMsR0FBRyxFQUFFLFdBQVc7SUFDaEJDLEdBQUcsRUFBRTtFQUNQLENBQUM7RUFDREMsWUFBWSxFQUFFO0lBQ1pDLE1BQU0sRUFBRSxpQkFBaUI7SUFDekJDLEdBQUcsRUFBRSxpQkFBaUI7SUFDdEJDLEdBQUcsRUFBRSxpQkFBaUI7SUFDdEJDLEdBQUcsRUFBRTtFQUNQLENBQUM7RUFDREMsV0FBVyxFQUFFO0FBQ2YsQ0FBQyxFQUNEO0VBQ0VaLE9BQU8sRUFBRTtJQUNQQyxXQUFXLEVBQUU7RUFDZixDQUFDO0VBQ0RDLElBQUksRUFBRTtJQUNKQyxRQUFRLEVBQUU7RUFDWixDQUFDO0VBQ0RDLFdBQVcsRUFBRTtJQUNYQyxHQUFHLEVBQUUsWUFBWTtJQUNqQkMsR0FBRyxFQUFFO0VBQ1AsQ0FBQztFQUNEQyxZQUFZLEVBQUU7SUFDWkMsTUFBTSxFQUFFLHNCQUFzQjtJQUM5QkMsR0FBRyxFQUFFLHFCQUFxQjtJQUMxQkMsR0FBRyxFQUFFLHFCQUFxQjtJQUMxQkMsR0FBRyxFQUFFO0VBQ1AsQ0FBQztFQUNEQyxXQUFXLEVBQUU7QUFDZixDQUFDLENBQ0Y7QUFFTSxNQUFNQyxlQUFlLEdBQUFuQixPQUFBLENBQUFtQixlQUFBLEdBQUcsQ0FDN0I7RUFDRSxZQUFZLEVBQUUsc0JBQXNCO0VBQ3BDLFlBQVksRUFBRSxxQkFBcUI7RUFDbkMsbUJBQW1CLEVBQUU7SUFDbkIsb0JBQW9CLEVBQUUsdUJBQXVCO0lBQzdDLFVBQVUsRUFBRSxpQkFBaUI7SUFDN0IsT0FBTyxFQUFFLGNBQWM7SUFDdkIsZ0JBQWdCLEVBQUUsMEJBQTBCO0lBQzVDLFVBQVUsRUFBRSxnQkFBZ0I7SUFDNUIsZUFBZSxFQUFFLDRDQUE0QztJQUM3RCxrQkFBa0IsRUFBRTtFQUN0QixDQUFDO0VBQ0QsZUFBZSxFQUFFLFNBQVM7RUFDMUIsU0FBUyxFQUFFLHVCQUF1QjtFQUNsQyxjQUFjLEVBQUUsVUFBVTtFQUMxQixrQkFBa0IsRUFBRSxvREFBb0Q7RUFDeEUsb0JBQW9CLEVBQUU7SUFDcEIsSUFBSSxFQUFFLHVCQUF1QjtJQUM3QixLQUFLLEVBQUU7RUFDVCxDQUFDO0VBQ0Qsa0JBQWtCLEVBQUU7QUFDdEIsQ0FBQyxFQUNEO0VBQ0UsWUFBWSxFQUFFLHNCQUFzQjtFQUNwQyxZQUFZLEVBQUUscUJBQXFCO0VBQ25DLG1CQUFtQixFQUFFO0lBQ25CLG9CQUFvQixFQUFFLHVCQUF1QjtJQUM3QyxVQUFVLEVBQUUsaUJBQWlCO0lBQzdCLE9BQU8sRUFBRSxjQUFjO0lBQ3ZCLGdCQUFnQixFQUFFLDBCQUEwQjtJQUM1QyxVQUFVLEVBQUUsYUFBYTtJQUN6QixlQUFlLEVBQUUseUNBQXlDO0lBQzFELGtCQUFrQixFQUFFO0VBQ3RCLENBQUM7RUFDRCxlQUFlLEVBQUUsU0FBUztFQUMxQixTQUFTLEVBQUUsdUJBQXVCO0VBQ2xDLGNBQWMsRUFBRSxXQUFXO0VBQzNCLGtCQUFrQixFQUFFLHdGQUF3RjtFQUM1RyxjQUFjLEVBQUU7SUFDZCxlQUFlLEVBQUUseUJBQXlCO0lBQzFDLGlCQUFpQixFQUFFO0VBQ3JCLENBQUM7RUFDRCxvQkFBb0IsRUFBRTtJQUFFO0lBQ3RCLElBQUksRUFBRSx1QkFBdUI7SUFDN0IsS0FBSyxFQUFFO0VBQ1QsQ0FBQztFQUNELGtCQUFrQixFQUFFO0FBQ3RCLENBQUMsQ0FDRjtBQUVNLE1BQU1DLGtCQUFrQixHQUFBcEIsT0FBQSxDQUFBb0Isa0JBQUEsR0FBRztFQUNoQ0MsSUFBSSxFQUFFO0lBQ0pDLEdBQUcsRUFBRTtNQUNIQyxRQUFRLEVBQUUsR0FBRztNQUNiQyxhQUFhLEVBQUUsS0FBSztNQUNwQkMsUUFBUSxFQUFFO1FBQ1I7UUFDQUMsWUFBWSxFQUFFO01BQ2hCLENBQUM7TUFDREMsV0FBVyxFQUFFLHVGQUF1RjtNQUNwRzVCLE1BQU0sRUFBRSxXQUFXO01BQ25CNkIsSUFBSSxFQUFFLG9DQUFvQztNQUMxQ0MsS0FBSyxFQUFFLGtHQUFrRztNQUN6RztNQUNBO01BQ0FDLFNBQVMsRUFBRSxLQUFLO01BQ2hCQyxPQUFPLEVBQUU7UUFDUEMsUUFBUSxFQUFFLE9BQU87UUFDakJDLFlBQVksRUFBRSxRQUFRO1FBQ3RCQyxVQUFVLEVBQUUsa0NBQWtDO1FBQzlDO1FBQ0E7UUFDQUMsY0FBYyxFQUFFO1VBQ2RDLGNBQWMsRUFBRSxZQUFZO1VBQzVCQyxVQUFVLEVBQUU7UUFDZCxDQUFDO1FBQ0RDLEtBQUssRUFBRSxNQUFNO1FBQ2JDLE1BQU0sRUFBRTtVQUNOQyxVQUFVLEVBQUUsWUFBWTtVQUN4QkMsZUFBZSxFQUFFO1lBQ2ZDLE9BQU8sRUFBRSxPQUFPO1lBQ2hCQyxnQkFBZ0IsRUFBRTtjQUNoQkMsZ0JBQWdCLEVBQUU7Z0JBQ2hCQyxJQUFJLEVBQUUsSUFBSTtnQkFDVkMsUUFBUSxFQUFFO2NBQ1osQ0FBQztjQUNEekMsZUFBZSxFQUFFO2dCQUNmQyxPQUFPLEVBQUU7a0JBQ1BDLFdBQVcsRUFBRTtnQkFDZixDQUFDO2dCQUNEQyxJQUFJLEVBQUU7a0JBQ0pDLFFBQVEsRUFBRTtnQkFDWixDQUFDO2dCQUNEQyxXQUFXLEVBQUU7a0JBQ1hDLEdBQUcsRUFBRSxZQUFZO2tCQUNqQkMsR0FBRyxFQUFFO2dCQUNQLENBQUM7Z0JBQ0RDLFlBQVksRUFBRTtrQkFDWkMsTUFBTSxFQUFFLHlCQUF5QjtrQkFDakNDLEdBQUcsRUFBRSx5QkFBeUI7a0JBQzlCQyxHQUFHLEVBQUUseUJBQXlCO2tCQUM5QkMsR0FBRyxFQUFFO2dCQUNQLENBQUM7Z0JBQ0RDLFdBQVcsRUFBRTtjQUNmO1lBQ0Y7VUFDRjtRQUNGLENBQUM7UUFDRCxhQUFhLEVBQUU7TUFDakI7SUFDRjtFQUNGLENBQUM7RUFDRDZCLElBQUksRUFBRTtJQUNKQyxVQUFVLEVBQUUsQ0FBQztJQUNiQyxJQUFJLEVBQUUsS0FBSztJQUNYQyxLQUFLLEVBQUUsQ0FBQztJQUNSdkIsV0FBVyxFQUFFLG9UQUFvVDtJQUNqVXdCLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBQyxLQUFLLEVBQUMsZUFBZSxDQUFDO0lBQ3hDQyxFQUFFLEVBQUU7RUFDTixDQUFDO0VBQ0RDLFFBQVEsRUFBRSxXQUFXO0VBQ3JCQyxPQUFPLEVBQUU7SUFDUCxNQUFNLEVBQUU7RUFDVjtBQUNGLENBQUM7QUFFTSxNQUFNQyxPQUFPLEdBQUF2RCxPQUFBLENBQUF1RCxPQUFBLEdBQUc7RUFDckIsTUFBTSxFQUFFO0lBQ04sS0FBSyxFQUFFO01BQ0wsVUFBVSxFQUFFLEdBQUc7TUFDZixlQUFlLEVBQUUsS0FBSztNQUN0QixVQUFVLEVBQUU7UUFDVixrQkFBa0IsRUFBRTtVQUNsQixhQUFhLEVBQUUsdUJBQXVCO1VBQ3RDLFVBQVUsRUFBRSxTQUFTO1VBQ3JCLFVBQVUsRUFBRTtRQUNkLENBQUM7UUFDRCxjQUFjLEVBQUU7TUFDbEIsQ0FBQztNQUNELFVBQVUsRUFBRTtRQUNWLFVBQVUsRUFBRSxpQkFBaUI7UUFDN0IsVUFBVSxFQUFFO01BQ2QsQ0FBQztNQUNELGFBQWEsRUFBRSxpTkFBaU47TUFDaE8sUUFBUSxFQUFFLFdBQVc7TUFDckIsTUFBTSxFQUFFLHlDQUF5QztNQUNqRCxPQUFPLEVBQUUsNkZBQTZGO01BQ3RHLFdBQVcsRUFBRSxjQUFjO01BQzNCLFdBQVcsRUFBRSwwQkFBMEI7TUFDdkMsV0FBVyxFQUFFLEtBQUs7TUFDbEIsU0FBUyxFQUFFO1FBQ1QsVUFBVSxFQUFFLE9BQU87UUFDbkIsY0FBYyxFQUFFLFFBQVE7UUFDeEIsWUFBWSxFQUFFLGtDQUFrQztRQUNoRCxnQkFBZ0IsRUFBRSxzQkFBc0I7UUFDeEMsZUFBZSxFQUFFLHNCQUFzQjtRQUN2QyxnQkFBZ0IsRUFBRTtVQUNoQixnQkFBZ0IsRUFBRTtZQUNoQixPQUFPLEVBQUUsR0FBRztZQUNaLEtBQUssRUFBRTtVQUNUO1FBQ0YsQ0FBQztRQUNELE9BQU8sRUFBRSxHQUFHO1FBQ1osUUFBUSxFQUFFO1VBQ1IsWUFBWSxFQUFFLGNBQWM7VUFDNUIsa0JBQWtCLEVBQUU7WUFDbEIsWUFBWSxFQUFFLFdBQVc7WUFDekIsS0FBSyxFQUFFLGNBQWM7WUFDckIsYUFBYSxFQUFFLHNCQUFzQjtZQUNyQyxpQkFBaUIsRUFBRTtjQUNqQixTQUFTLEVBQUU7Z0JBQ1QsYUFBYSxFQUFFO2NBQ2pCLENBQUM7Y0FDRCxNQUFNLEVBQUU7Z0JBQ04sVUFBVSxFQUFFO2NBQ2QsQ0FBQztjQUNELGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsWUFBWTtnQkFDbkIsS0FBSyxFQUFFO2NBQ1QsQ0FBQztjQUNELGNBQWMsRUFBRTtnQkFDZCxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixLQUFLLEVBQUUsY0FBYztnQkFDckIsS0FBSyxFQUFFLGNBQWM7Z0JBQ3JCLEtBQUssRUFBRTtjQUNULENBQUM7Y0FDRCxhQUFhLEVBQUU7WUFDakI7VUFDRjtRQUNGLENBQUM7UUFDRCxhQUFhLEVBQUU7TUFDakIsQ0FBQztNQUNELElBQUksRUFBRSxrQ0FBa0M7TUFDeEMsUUFBUSxFQUFFLFdBQVc7TUFDckIsS0FBSyxFQUFFLDZIQUE2SDtNQUNwSSxXQUFXLEVBQUU7SUFDZjtFQUNGLENBQUM7RUFDRCxNQUFNLEVBQUU7SUFDTjtJQUNBLE1BQU0sRUFBRSxLQUFLO0lBQ2IsT0FBTyxFQUFFLENBQUM7SUFDVixhQUFhLEVBQUUsMkhBQTJIO0lBQzFJLFFBQVEsRUFBRSxDQUNSLFFBQVEsRUFDUixLQUFLLEVBQ0wsZUFBZSxDQUNoQjtJQUNELElBQUksRUFBRTtFQUNSLENBQUM7RUFDRCxVQUFVLEVBQUUsV0FBVztFQUN2QixTQUFTLEVBQUU7SUFDVCxNQUFNLEVBQUU7RUFDVjtBQUNGLENBQUM7QUFFTSxNQUFNQyxpQkFBaUIsR0FBQXhELE9BQUEsQ0FBQXdELGlCQUFBLEdBQUc7RUFDL0IsTUFBTSxFQUFFO0lBQ04sYUFBYSxFQUFFLEtBQUs7SUFDcEIsS0FBSyxFQUFFO01BQ0wsVUFBVSxFQUFFLEdBQUc7TUFDZixlQUFlLEVBQUUsS0FBSztNQUN0QixVQUFVLEVBQUU7UUFDVixjQUFjLEVBQUU7TUFDbEIsQ0FBQztNQUNELGFBQWEsRUFBRSxpSUFBaUk7TUFDaEosUUFBUSxFQUFFLFdBQVc7TUFDckIsTUFBTSxFQUFFLGlDQUFpQztNQUN6QyxPQUFPLEVBQUUsMkhBQTJIO01BQ3BJLFdBQVcsRUFBRSxjQUFjO01BQzNCLFdBQVcsRUFBRSwwQkFBMEI7TUFDdkMsV0FBVyxFQUFFLEtBQUs7TUFDbEIsU0FBUyxFQUFFO1FBQ1QsVUFBVSxFQUFFLE9BQU87UUFDbkIsY0FBYyxFQUFFLE9BQU87UUFDdkIsWUFBWSxFQUFFLGtDQUFrQztRQUNoRCxnQkFBZ0IsRUFBRSxzQkFBc0I7UUFDeEMsZUFBZSxFQUFFLHNCQUFzQjtRQUN2QyxnQkFBZ0IsRUFBRTtVQUNoQixXQUFXLEVBQUUsT0FBTztVQUNwQixVQUFVLEVBQUUsTUFBTTtVQUNsQixTQUFTLEVBQUUsTUFBTTtVQUNqQixTQUFTLEVBQUU7UUFDYixDQUFDO1FBQ0QsT0FBTyxFQUFFLEdBQUc7UUFDWixRQUFRLEVBQUU7VUFDUixZQUFZLEVBQUUsb0JBQW9CO1VBQ2xDLHlCQUF5QixFQUFFO1lBQ3pCLGdCQUFnQixFQUFFO2NBQ2hCLGFBQWEsRUFBRTtZQUNqQixDQUFDO1lBQ0QsVUFBVSxFQUFFLEtBQUs7WUFDakIsU0FBUyxFQUFFLE9BQU87WUFDbEIscUJBQXFCLEVBQUUsVUFBVTtZQUNqQyxrQkFBa0IsRUFBRTtjQUNsQixNQUFNLEVBQUUsT0FBTztjQUNmLFVBQVUsRUFBRTtZQUNkLENBQUM7WUFDRCxtQkFBbUIsRUFBRTtjQUNuQixNQUFNLEVBQUUsTUFBTTtjQUNkLFVBQVUsRUFBRTtZQUNkLENBQUM7WUFDRCxpQkFBaUIsRUFBRTtjQUNqQixTQUFTLEVBQUU7Z0JBQ1QsYUFBYSxFQUFFO2NBQ2pCLENBQUM7Y0FDRCxNQUFNLEVBQUU7Z0JBQ04sVUFBVSxFQUFFO2NBQ2QsQ0FBQztjQUNELGFBQWEsRUFBRTtnQkFDYixLQUFLLEVBQUUsWUFBWTtnQkFDbkIsS0FBSyxFQUFFO2NBQ1QsQ0FBQztjQUNELGNBQWMsRUFBRTtnQkFDZCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQixLQUFLLEVBQUUsYUFBYTtnQkFDcEIsS0FBSyxFQUFFLGFBQWE7Z0JBQ3BCLEtBQUssRUFBRTtjQUNULENBQUM7Y0FDRCxhQUFhLEVBQUU7WUFDakI7VUFDRjtRQUNGLENBQUM7UUFDRCxhQUFhLEVBQUU7TUFDakIsQ0FBQztNQUNELElBQUksRUFBRSxrQ0FBa0M7TUFDeEMsUUFBUSxFQUFFLFdBQVc7TUFDckIsS0FBSyxFQUFFLHFJQUFxSTtNQUM1SSxXQUFXLEVBQUU7SUFDZjtFQUNGLENBQUM7RUFDRCxNQUFNLEVBQUU7SUFDTixNQUFNLEVBQUUsS0FBSztJQUNiLE9BQU8sRUFBRSxDQUFDO0lBQ1YsYUFBYSxFQUFFLCtKQUErSjtJQUM5SyxRQUFRLEVBQUUsQ0FDUixRQUFRLEVBQ1IsS0FBSyxFQUNMLGVBQWUsQ0FDaEI7SUFDRCxJQUFJLEVBQUU7RUFDUixDQUFDO0VBQ0QsVUFBVSxFQUFFLFdBQVc7RUFDdkIsU0FBUyxFQUFFO0lBQ1QsTUFBTSxFQUFFO0VBQ1Y7QUFDRixDQUFDO0FBRU0sTUFBTUMsb0JBQW9CLEdBQUF6RCxPQUFBLENBQUF5RCxvQkFBQSxHQUFHO0VBQ2xDLE1BQU0sRUFBRTtJQUNOLEtBQUssRUFBRTtNQUNMLFVBQVUsRUFBRSxVQUFVO01BQ3RCLE9BQU8sRUFBRSw0QkFBNEI7TUFDckMsU0FBUyxFQUFFO1FBQ1QsWUFBWSxFQUFFLDhCQUE4QjtRQUM1QyxhQUFhLEVBQUUsMFRBQTBUO1FBQ3pVLFFBQVEsRUFBRSw2QkFBNkI7UUFDdkMsY0FBYyxFQUFFLEdBQUc7UUFDbkIsYUFBYSxFQUFFLEdBQUc7UUFDbEIsb0JBQW9CLEVBQUUsY0FBYztRQUNwQyxLQUFLLEVBQUU7VUFDTCxXQUFXLEVBQUU7WUFDWCxPQUFPLEVBQUU7Y0FDUCxLQUFLLEVBQUU7Z0JBQ0wsT0FBTyxFQUFFO2tCQUNQLGFBQWEsRUFBRSxPQUFPO2tCQUN0QixJQUFJLEVBQUU7Z0JBQ1I7Y0FDRjtZQUNGO1VBQ0Y7UUFDRjtNQUNGLENBQUM7TUFDRCxZQUFZLEVBQUUsR0FBRztNQUNqQixtQkFBbUIsRUFBRSxlQUFlO01BQ3BDLE1BQU0sRUFBRSxnREFBZ0Q7TUFDeEQsWUFBWSxFQUFFLDRCQUE0QjtNQUMxQyxRQUFRLEVBQUUsT0FBTztNQUNqQixLQUFLLEVBQUUsc01BQXNNO01BQzdNLE1BQU0sRUFBRTtRQUNOLE9BQU8sRUFBRTtNQUNYLENBQUM7TUFDRCxXQUFXLEVBQUU7SUFDZjtFQUNGLENBQUM7RUFDRCxNQUFNLEVBQUU7SUFDTixNQUFNLEVBQUUsSUFBSTtJQUNaLE9BQU8sRUFBRSxFQUFFO0lBQ1gsYUFBYSxFQUFFLCtYQUErWDtJQUM5WSxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUMsS0FBSyxFQUFDLFdBQVcsQ0FBQztJQUN0QyxJQUFJLEVBQUU7RUFDUixDQUFDO0VBQ0QsVUFBVSxFQUFFLFdBQVc7RUFDdkIsU0FBUyxFQUFFO0lBQ1QsTUFBTSxFQUFFO0VBQ1Y7QUFDRixDQUFDIn0=