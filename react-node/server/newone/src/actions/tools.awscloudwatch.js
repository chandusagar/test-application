import axios from "axios";
import { toast } from "react-toastify";

const GET_ALERTS_SCHEMA =
  "https://qkax3tablg.execute-api.us-east-1.amazonaws.com/dev/get-schema-alerts";
const POST_ALERTS_SCHEMA =
  "https://qkax3tablg.execute-api.us-east-1.amazonaws.com/dev/create-alert";
const AWS_BASE_URL_AIOPSTOOLS_SCHEMA_SAVE = `https://qkax3tablg.execute-api.us-east-1.amazonaws.com/dev/schema-save`;

export const ToolsAWSCloudWatch = {
  ADVANCED_AF_MESSAGE: " ADVANCED_AF_MESSAGE",
  ADVANCED_AF_REMOVE_MESSAGE: " ADVANCED_AF_REMOVE_MESSAGE",
  ADVANCED_AF_DESC: " ADVANCED_AF_DESC",
  ADVANCED_AF_REMOVE_DESC: " ADVANCED_AF_REMOVE_DESC",
  ADVANCED_AF_ALIAS: " ADVANCED_AF_ALIAS",
  ADVANCED_AF_REMOVE_ALIAS: " ADVANCED_AF_REMOVE_ALIAS",
  ADVANCED_AF_ENTITY: " ADVANCED_AF_ENTITY",
  ADVANCED_AF_REMOVE_ENTITY: " ADVANCED_AF_REMOVE_ENTITY",
  ADVANCED_AF_TAGS: " ADVANCED_AF_TAGS",
  ADVANCED_AF_REMOVE_TAGS: " ADVANCED_AF_REMOVE_TAGS",
  ADVANCED_AF_ACTIONS: "ADVANCED_AF_ACTIONS",
  ADVANCED_AF_REMOVE_ACTIONS: "ADVANCED_AF_REMOVE_ACTIONS",
  ADVANCED_AF_PRIORITY: " ADVANCED_AF_PRIORITY",
  ADVANCED_AF_OWNERNAME: " ADVANCED_AF_OWNERNAME",
  ADVANCED_AF_TEAMNAME: " ADVANCED_AF_TEAMNAME",
  CREATE_ALERT: "CREATE_ALERT",
  ACTIVE_ALERT: "ACTIVE_ALERT",
  FETCH_REQUEST: "FETCH_REQUEST",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  POST_CREATE_ALERT: "POST_CREATE_ALERT",
  POST_SAVE_ALERT: "POST_SAVE_ALERT",
  POST_UPDATE_ALERT: "POST_UPDATE_ALERT",
  ADVANCED_FILTER_FIELDONE: "ADVANCED_FILTER_FIELDONE",
  ADVANCED_FILTER_FIELDTWO: "ADVANCED_FILTER_FIELDTWO",
  ADVANCED_FILTER_FIELDTEXT: "ADVANCED_FILTER_FIELDTEXT",
  ADVANCED_FILTER_SETFIELD: "ADVANCED_FILTER_SETFIELD",
  ADVANCED_FILTER_SETFIELDREMOVE: "ADVANCED_FILTER_SETFIELDREMOVE",
  ALERTFIELD_RESET: "ALERTFIELD_RESET",
};

export function dropAlertFields(payload) {
  return {
    type: ToolsAWSCloudWatch.ADVANCED_AF_MESSAGE,
    payload: payload,
  };
}

export function dropAlertFieldsDescription(payload) {
  return {
    type: ToolsAWSCloudWatch.ADVANCED_AF_DESC,
    payload: payload,
  };
}
export function dropAlertFieldsAlias(payload) {
  return {
    type: ToolsAWSCloudWatch.ADVANCED_AF_ALIAS,
    payload: payload,
  };
}
export function dropAlertFieldsEntity(payload) {
  return {
    type: ToolsAWSCloudWatch.ADVANCED_AF_ENTITY,
    payload: payload,
  };
}
export function dropAlertFieldsTags(payload) {
  return {
    type: ToolsAWSCloudWatch.ADVANCED_AF_TAGS,
    payload: payload,
  };
}
export function removeAlertFieldsTags(payload) {
  return {
    type: ToolsAWSCloudWatch.ADVANCED_AF_REMOVE_TAGS,
    payload: payload,
  };
}
export function removeAlertFieldsMessage(payload) {
  return {
    type: ToolsAWSCloudWatch.ADVANCED_AF_REMOVE_MESSAGE,
    payload: payload,
  };
}
export function removeAlertFieldsDesc(payload) {
  return {
    type: ToolsAWSCloudWatch.ADVANCED_AF_REMOVE_DESC,
    payload: payload,
  };
}
export function removeAlertFieldsEntity(payload) {
  return {
    type: ToolsAWSCloudWatch.ADVANCED_AF_REMOVE_ENTITY,
    payload: payload,
  };
}
export function removeAlertFieldsAlias(payload) {
  return {
    type: ToolsAWSCloudWatch.ADVANCED_AF_REMOVE_ALIAS,
    payload: payload,
  };
}
export function removeAlertFieldsActions(payload) {
  return {
    type: ToolsAWSCloudWatch.ADVANCED_AF_REMOVE_ACTIONS,
    payload: payload,
  };
}

export function dropAlertFieldsActions(payload) {
  return {
    type: ToolsAWSCloudWatch.ADVANCED_AF_ACTIONS,
    payload: payload,
  };
}

export function alertFieldsPriority(payload) {
  return {
    type: ToolsAWSCloudWatch.ADVANCED_AF_PRIORITY,
    payload: payload,
  };
}
export function alertFieldsOwnerName(payload) {
  return {
    type: ToolsAWSCloudWatch.ADVANCED_AF_OWNERNAME,
    payload: payload,
  };
}
export function alertFieldsTeamName(payload) {
  return {
    type: ToolsAWSCloudWatch.ADVANCED_AF_TEAMNAME,
    payload: payload,
  };
}

export function createAlert(payload) {
  return {
    type: ToolsAWSCloudWatch.CREATE_ALERT,
    payload: payload,
  };
}

export function resetAlertFields() {
  return {
    type: ToolsAWSCloudWatch.ALERTFIELD_RESET,
  };
}

export function activeAlert(payload) {
  return {
    type: ToolsAWSCloudWatch.ACTIVE_ALERT,
    payload: payload,
  };
}

export function firstActiveAlert(payload) {
  return (dispatch) => {
    dispatch(resetAlertFields());
    dispatch(activeAlert(payload));
  };
}

export function fetchPostsSuccess(payload) {
  return {
    type: ToolsAWSCloudWatch.FETCH_SUCCESS,
    payload,
  };
}

export function fetchPostsError() {
  return {
    type: ToolsAWSCloudWatch.FETCH_ERROR,
  };
}

export function fetchPostsWithRedux() {
  return (dispatch) => {
    return fetchPosts().then(([response]) => {
      if (response.status === 200) {
        dispatch(fetchPostsSuccess(response.data.Items));
      } else {
        dispatch(fetchPostsError());
      }
    });
  };
}

export function fetchPosts() {
  return axios
    .get(GET_ALERTS_SCHEMA)
    .then((response) => Promise.all([response]));
}

export function createAlertRequest(payload) {
  const postData = {
    alertType: payload,
    alertFields: {
      activeAlert: {},
      message: [],
      alias: [],
      priority: "",
      teamName: "",
      ownerName: "",
      entity: [],
      tags: [],
      actions: [],
      description: [],
    },
    filterFields: {},
  };

  return (dispatch) => {
    axios
      .post(POST_ALERTS_SCHEMA, postData)
      .then((res) => {
        dispatch(updateCreateAlert(res.data));

        // dispatch(fetchPostsWithRedux());
        dispatch(createAlert(res.data));
        let arrayActive = [];
        arrayActive.push(res.data.id);
        arrayActive.push(res.data.alertType);
        dispatch(activeAlert(res.data.id));
        toast.success("Alert has been Created!");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
}

export function updateCreateAlert(payload) {
  return {
    type: ToolsAWSCloudWatch.POST_CREATE_ALERT,
    payload,
  };
}
const prepareData = (params) => {
  let tempFieldOneValue = [];
  let tempFieldTwoValue = [];
  let tempFieldThreeValue = [];
  for (let element in params.inputFields) {
    tempFieldOneValue.push([
      params.inputFields[element].fieldOne[11].fieldOneIndex,
      params.inputFields[element].fieldOne[12].fieldOneValue,
    ]);
    tempFieldTwoValue.push([
      params.inputFields[element].fieldTwo[3].fieldTwoIndex,
      params.inputFields[element].fieldTwo[4].fieldTwoValue,
    ]);
    tempFieldThreeValue.push([params.inputFields[element].fieldText]);
  }

  let postData = {
    actions: params.actions,
    alias: params.alias,
    description: params.description,
    entity: params.entity,
    message: params.message,
    messageId: params.messageId,
    ownerName: params.ownerName,
    teamName: params.teamName,
    tags: params.tags,
    source: params.source,
    activeAlert: params.activeAlert,
    priority: params.priority,
    fieldOneValue: tempFieldOneValue,
    fieldText: tempFieldThreeValue,
    fieldTwoValue: tempFieldTwoValue,
  };
  return postData;
};

export function postSaveSchema(payload) {
  let postData = prepareData(payload);

  return (dispatch) => {
    axios
      .post(AWS_BASE_URL_AIOPSTOOLS_SCHEMA_SAVE, postData)
      .then((res) => {
        dispatch(postAlertFields(res.data));
        toast.success("Saved!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
}

export function updateSaveSchema(payload) {
  return {
    type: ToolsAWSCloudWatch.POST_SAVE_ALERT,
    payload,
  };
}

export function postAlertFields(payload) {
  return {
    type: ToolsAWSCloudWatch.POST_UPDATE_ALERT,
    payload,
  };
}

export function filterFieldsOne(index, value) {
  return {
    type: ToolsAWSCloudWatch.ADVANCED_FILTER_FIELDONE,
    index: index,
    value: value,
  };
}

export function filterFieldsTwo(index, value) {
  return {
    type: ToolsAWSCloudWatch.ADVANCED_FILTER_FIELDTWO,
    index: index,
    value: value,
  };
}

export function filterFieldsText(index, value) {
  return {
    type: ToolsAWSCloudWatch.ADVANCED_FILTER_FIELDTEXT,
    index: index,
    value: value,
  };
}

export function filterFieldsSetFieldAdd() {
  return {
    type: ToolsAWSCloudWatch.ADVANCED_FILTER_SETFIELD,
  };
}

export function filterFieldsSetFieldRemove(payload) {
  return {
    type: ToolsAWSCloudWatch.ADVANCED_FILTER_SETFIELDREMOVE,
    payload: payload,
  };
}
