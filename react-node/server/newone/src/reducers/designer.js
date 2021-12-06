import { SET_CURRENT_STAGE , SET_TOOLS } from '../actions/designer';

import jira     from '../pages/logos/Jira.svg';
import AWSCodeCommit from '../pages/logos/AWS_CodeCommit.svg';
import Bitbucket     from '../pages/logos/BitBucket.svg';
import GitHub     from '../pages/logos/GitHub.svg';
import GitLab     from '../pages/logos/GitLab.svg';
import Azure  from '../pages/logos/Azure.svg';
import GoogleCloud from '../pages/logos/GCP.svg'
import Jenkins     from '../pages/logos/Jenkins.svg';
import Liquibase from '../pages/logos/Liquibase.svg';
import AWS_CodeBuild from '../pages/logos/AWS_CodeBuild.svg';
import Bamboo from '../pages/logos/Bamboo.svg'
import QuerySurge from '../pages/logos/QuerySurge.svg';
import Qmetry from '../pages/logos/Qmetry.svg';
import Checkmarx from '../pages/logos/Checkmarx.svg';
import Blackduck  from '../pages/logos/Blackduck.svg';
import Fortify  from '../pages/logos/Fortify.svg';
import AWS  from '../pages/logos/AWS.svg';
import JfrogArtifactory from '../pages/logos/JfrogArtifactory.svg';
import Docker from '../pages/logos/Docker.svg';
import Kubernetes from '../pages/logos/Kubernetes.svg';
import snowflake from '../pages/logos/snowflake.svg';
import ServiceNow from '../pages/logos/ServiceNow.svg';
import Sonar from '../pages/logos/SonarQube.svg';
import S3 from '../pages/logos/AWS_S3.svg'
import CloudFront from '../pages/logos/AWS_CloudFront.svg'
import Confluence from '../pages/logos/Confluence.svg'
import NessQ from '../pages/logos/NessQ.svg'

import JestJunit from '../pages/logos/jest-junit.svg'
import Maven from '../pages/logos/Maven.svg'
import NPM from '../pages/logos/npm.svg'
import MS_Build from '../pages/logos/MS_Build.svg'
import MS_Test from '../pages/logos/MS_Test.svg'
import Nunit from '../pages/logos/Nunit.svg'
import Pytest from '../pages/logos/Pytest.svg'
import Spock from '../pages/logos/Spock.svg'
import TestNG from '../pages/logos/TestNG.svg'
import Xunit from '../pages/logos/Xunit.svg'
import Yarn from '../pages/logos/Yarn.svg'
import Jest from '../pages/logos/Jest.svg'
import Junit from '../pages/logos/Junit.svg'

import EC2 from '../pages/logos/AWS_EC2.svg'
import AWS_CodeDeploy from '../pages/logos/AWS_CodeDeploy.svg'

const defaultState = {
    current_stage : {},
    tool_list : [
        {
            "section" : "Code",
            "tool_type" : "version_control",
            "tools"   : [
                {
                    "tool_id" : "codecommit",
                    "tool_name" : "AWS Code Commit",
                    "tool_image" : AWSCodeCommit,
                    "enabled" : false
                },
                {
                    "tool_id" : "Github_Version_Control",
                    "tool_name" : "GitHub",
                    "tool_image" : GitHub,
                    "enabled" : false
                },
                {
                    "tool_id" : "bitbucket",
                    "tool_name" : "Bitbucket",
                    "tool_image" : Bitbucket,
                    "enabled" : false
                },
                {
                    "tool_id" : "Googlecloud_Version_Control",
                    "tool_name" : "Google Cloud",
                    "tool_image" : GoogleCloud,
                    "enabled" : false
                },
                {
                    "tool_id" : "Azure_Repos",
                    "tool_name" : "Azure Repos",
                    "tool_image" : Azure,
                    "enabled" : false
                }
            ]
        },
        {
            "section" : "Plan",
            "tool_type" : "issue_tracking",
            "tools"   : [
                {
                    "tool_id" : "jira",
                    "tool_name" : "Jira",
                    "tool_image" : jira,
                    "enabled" : false
                },
                {
                    "tool_id" : "Gitlab",
                    "tool_name" : "GitLab",
                    "tool_image" : GitLab,
                    "enabled" : false
                },
                {
                    "tool_id" : "Azure_Plan",
                    "tool_name" : "Azure",
                    "tool_image" : Azure,
                    "enabled" : false
                }
            ]
        },
        {
            "section" : "Build",
            "tool_type" : "build",
            "tools"   : [
                {
                    "tool_id" : "AWS_Code_Pipeline",
                    "tool_name" : "AWS Code Pipeline",
                    "tool_image" : AWS_CodeBuild,
                    "enabled" : true
                },
                {
                    "tool_id" : "jenkins",
                    "tool_name" : "Jenkins",
                    "tool_image" : Jenkins,
                    "enabled" : false
                },
                {
                    "tool_id" : "Liquibase_Build",
                    "tool_name" : "Liqui Base",
                    "tool_image" : Liquibase,
                    "enabled" : false
                },
                {
                    "tool_id" : "Bamboo_Build",
                    "tool_name" : "Banboo",
                    "tool_image" : Bamboo,
                    "enabled" : false
                },
                {
                    "tool_id" : "Googlecloud_Build",
                    "tool_name" : "Google Cloud",
                    "tool_image" : GoogleCloud,
                    "enabled" : false
                },
                {
                    "tool_id" : "Azure_Pipeline",
                    "tool_name" : "Azure Pipeline",
                    "tool_image" : Azure,
                    "enabled" : false
                }
            ]
        },
        {
            "section" : "UnitTest",
            "tool_type" : "unitTesting",
            "tools"   : [
                {
                    "tool_id" : "Jest",
                    "tool_name" : "Jest",
                    "tool_image" : Jest,
                    "enabled" : false
                },
                {
                    "tool_id" : "Junit",
                    "tool_name" : "Junit",
                    "tool_image" : Junit,
                    "enabled" : false
                },
                {
                    "tool_id" : "MS_Test",
                    "tool_name" : "MS Test",
                    "tool_image" : MS_Test,
                    "enabled" : false
                },
                {
                    "tool_id" : "Nunit",
                    "tool_name" : "Nunit",
                    "tool_image" : Nunit,
                    "enabled" : false
                },
                {
                    "tool_id" : "Pytest",
                    "tool_name" : "Pytest",
                    "tool_image" : Pytest,
                    "enabled" : false
                },
                // {
                //     "tool_id" : "Spock",
                //     "tool_name" : "Spock",
                //     "tool_image" : Spock,
                //     "enabled" : false
                // },
                // {
                //     "tool_id" : "TestNG",
                //     "tool_name" : "TestNG",
                //     "tool_image" : TestNG,
                //     "enabled" : false
                // },
                {
                    "tool_id" : "Xunit",
                    "tool_name" : "Xunit",
                    "tool_image" : Xunit,
                    "enabled" : false
                }
            ]
        },
        {
            "section" : "Test",
            "tool_type" : "testing",
            "tools"   : [
                {
                    "tool_id" : "Querysurge",
                    "tool_name" : "Query Serge",
                    "tool_image" : QuerySurge,
                    "enabled" : false
                },
                {
                    "tool_id" : "Qmetry",
                    "tool_name" : "qmetry",
                    "tool_image" : Qmetry,
                    "enabled" : false
                },
                {
                    "tool_id" : "Googlecloud_Testing",
                    "tool_name" : "Google Cloud",
                    "tool_image" : GoogleCloud,
                    "enabled" : false
                },
                {
                    "tool_id" : "Azure_Testing",
                    "tool_name" : "Azure",
                    "tool_image" : Azure,
                    "enabled" : false
                },
                {
                    "tool_id" : "sonarqube",
                    "tool_name" : "SonarQube",
                    "tool_image" : Sonar,
                    "enabled" : false
                },
                {
                    "tool_id" : "nessq",
                    "tool_name" : "NessQ",
                    "tool_image" : NessQ,
                    "enabled" : true
                }
            ]
        },
        {
            "section" : "Security",
            "tool_type" : "security",
            "tools"   : [
                {
                    "tool_id" : "Aws_Security",
                    "tool_name" : "AWS Security",
                    "tool_image" : AWS,
                    "enabled" : false
                },
                {
                    "tool_id" : "Chechmarx",
                    "tool_name" : "Chech Marx",
                    "tool_image" : Checkmarx,
                    "enabled" : true
                },
                {
                    "tool_id" : "Blackduck",
                    "tool_name" : "Balck Duck",
                    "tool_image" : Blackduck,
                    "enabled" : false
                },
                {
                    "tool_id" : "Fortify",
                    "tool_name" : "Fortify",
                    "tool_image" : Fortify,
                    "enabled" : true
                },
                {
                    "tool_id" : "Googlecloud_Security",
                    "tool_name" : "Google Cloud",
                    "tool_image" : GoogleCloud,
                    "enabled" : false
                },
                {
                    "tool_id" : "Azure_Security",
                    "tool_name" : "Azure",
                    "tool_image" : Azure,
                    "enabled" : false
                }
            ]
        },
        {
            "section" : "Release",
            "tool_type" : "release",
            "tools"   : [
                {
                    "tool_id" : "Jfrogartifactory",
                    "tool_name" : "Jfrog Artifactory",
                    "tool_image" : JfrogArtifactory,
                    "enabled" : false
                },
                {
                    "tool_id" : "s3",
                    "tool_name" : "Amazon S3",
                    "tool_image" : S3,
                    "enabled" : false
                }
            ]
        },
        {
            "section" : "Deploy",
            "tool_type" : "deploy",
            "tools"   : [
                {
                    "tool_id" : "AWS_Deploy",
                    "tool_name" : "awsdeploy",
                    "tool_image" : AWS,
                    "enabled" : false
                },
                {
                    "tool_id" : "Docker",
                    "tool_name" : "Docker",
                    "tool_image" : Docker,
                    "enabled" : false
                },
                {
                    "tool_id" : "Kubernetes",
                    "tool_name" : "Kubernetes",
                    "tool_image" : Kubernetes,
                    "enabled" : false
                },
                {
                    "tool_id" : "Jenkins_Deploy",
                    "tool_name" : "Jenkins",
                    "tool_image" : Jenkins,
                    "enabled" : false
                },
                {
                    "tool_id" : "Bamboo_Deploy",
                    "tool_name" : "bamboo",
                    "tool_image" : Bamboo,
                    "enabled" : false
                },
                {
                    "tool_id" : "Snowflake",
                    "tool_name" : "Snow Flake",
                    "tool_image" : snowflake,
                    "enabled" : false
                },
                {
                    "tool_id" : "Azure_Deploy",
                    "tool_name" : "Azure",
                    "tool_image" : Azure,
                    "enabled" : false
                },
                {
                    "tool_id" : "Googlecloud_Deploy",
                    "tool_name" : "Google Cloud",
                    "tool_image" : GoogleCloud,
                    "enabled" : false
                },
                {
                    "tool_id" : "cloudfront",
                    "tool_name" : "Amazon Cloud Front",
                    "tool_image" : CloudFront,
                    "enabled" : false
                },
                {
                    "tool_id" : "ec2",
                    "tool_name" : "Amazon EC2",
                    "tool_image" : EC2,
                    "enabled" : false
                },
                {
                    "tool_id" : "codedeploy",
                    "tool_name" : "Amazon Code Deploy",
                    "tool_image" : AWS_CodeDeploy,
                    "enabled" : true
                }
            ]
        },
        {
            "section" : "Operate",
            "tool_type" : "operate",
            "tools"   : [
                {
                    "tool_id" : "AWS_Operate",
                    "tool_name" : "AWS Operate",
                    "tool_image" : AWS,
                    "enabled" : false
                },
                {
                    "tool_id" : "Servicenow",
                    "tool_name" : "Service Now",
                    "tool_image" : ServiceNow,
                    "enabled" : false
                },
                {
                    "tool_id" : "Azure_Operate",
                    "tool_name" : "Azure",
                    "tool_image" : Azure,
                    "enabled" : false
                },
                {
                    "tool_id" : "Googlecloud_Operate",
                    "tool_name" : "Google Cloud",
                    "tool_image" : GoogleCloud,
                    "enabled" : false
                }
         ]
        },
        {
            "section" : "Reporting",
            "tool_type" : "reporting",
            "tools"   : [
                {
                    "tool_id" : "confluence",
                    "tool_name" : "Confluence",
                    "tool_image" : Confluence,
                    "enabled" : false
                }
         ]
        }
    ]
};

export default function repoReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_CURRENT_STAGE:
            return Object.assign({}, state, { current_stage : action.payload });
        case SET_TOOLS:
            return Object.assign({}, state, { tool_list : action.payload });
        default:
            return state;
         }
}