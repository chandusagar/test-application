import { combineReducers } from "redux";
import auth from "./auth";
import navigation from "./navigation";
import alerts from "./alerts";
import layout from "./layout";
import chat from "./chat";
import headerProduct from "./headerProduct";
import users from "./usersReducers";
import unitTest from "./unitTest";
import workflow from "./workflow";
import constants from "./constants";
import toolsAWSCW from "./tools.awscloudwatch";
import designer from "./designer";
import manageAccount from "./systemMaster/account";
import assessment from "./systemMaster/assessment";
import businessUnit from "./systemMaster/businessUnit";
import application from "./systemMaster/application";
import { connectRouter } from "connected-react-router";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    alerts,
    auth,
    navigation,
    layout,
    chat,
    users,
    unitTest,
    workflow,
    designer,
    headerProduct,
    constants,
    toolsAWSCW,
    manageAccount,
    assessment,
    businessUnit,
    application,
  });
