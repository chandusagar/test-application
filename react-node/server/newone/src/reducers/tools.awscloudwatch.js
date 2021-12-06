import { ToolsAWSCloudWatch } from "../actions/tools.awscloudwatch";

const defaultAlertFields = {
  createAlert: [],
  activeAlert: {},
  message: [],
  alias: [],
  priority: "",
  prio: [
    {
      value: "",
      label: "Select",
    },
    {
      value: "blue",
      label: "Blue",
    },
    {
      value: "yellow",
      label: "Yellow",
    },
    {
      value: "orange",
      label: "Orange",
    },
    {
      value: "red",
      label: "Red",
    },
  ],
  prioIndex: 1,
  teamName: "",
  ownerName: "",
  entity: [],
  source: "CloudWatch",
  tags: [],
  actions: [],
  description: [],
  messageId: null,
  inputFields: [
    {
      fieldOne: [
        {
          value: "",
          label: "Select",
        },
        {
          value: "AlarmDescription",
          label: "AlarmDescription",
        },
        {
          value: "NewStateReason",
          label: "NewStateReason",
        },
        {
          value: "NewStateValue",
          label: "NewStateValue",
        },
        {
          value: "Subject",
          label: "Subject",
        },
        {
          value: "AlarmName",
          label: "AlarmName",
        },
        {
          value: "Region",
          label: "Region",
        },
        {
          value: "StateChangeTime",
          label: "StateChangeTime",
        },
        {
          value: "OldStateValue",
          label: "OldStateValue",
        },
        {
          value: "Trigger",
          label: "Trigger",
        },
        {
          value: "AWSAccountID",
          label: "AWSAccountID",
        },
        { fieldOneIndex: 0 },
        { fieldOneValue: "" },
      ],
      fieldTwo: [
        {
          value: "",
          label: "Select",
        },
        {
          value: "Contains",
          label: "Contains",
        },
        {
          value: "Equals",
          label: "Equals",
        },
        {
          fieldTwoIndex: 0,
        },
        { fieldTwoValue: "" },
      ],
      fieldText: "",
    },
  ],
  fieldOneValue: [],
  fieldTwoValue: [],
  fieldText: [],
};

export default function toolsAWSCWAvancedAlertFields(
  state = defaultAlertFields,
  action
) {
  function hasDuplicates(arr, val) {
    return arr.findIndex((el) => {
      return el === val;
    });
  }

  function populateFilter(params) {
    let inputFieldValFirst = [];
    if (Object.keys(params.filterFields).length !== 0) {
      for (let i = 0; i < params.filterFields.fieldOneValue.length; i++) {
        inputFieldValFirst.push({
          ...{
            fieldOne: [
              {
                value: "",
                label: "Select",
              },
              {
                value: "AlarmDescription",
                label: "AlarmDescription",
              },
              {
                value: "NewStateReason",
                label: "NewStateReason",
              },
              {
                value: "NewStateValue",
                label: "NewStateValue",
              },
              {
                value: "Subject",
                label: "Subject",
              },
              {
                value: "AlarmName",
                label: "AlarmName",
              },
              {
                value: "Region",
                label: "Region",
              },
              {
                value: "StateChangeTime",
                label: "StateChangeTime",
              },
              {
                value: "OldStateValue",
                label: "OldStateValue",
              },
              {
                value: "Trigger",
                label: "Trigger",
              },
              {
                value: "AWSAccountID",
                label: "AWSAccountID",
              },
              { fieldOneIndex: params.filterFields.fieldOneValue[i][0] },
              { fieldOneValue: params.filterFields.fieldOneValue[i][1] },
            ],
            fieldTwo: [
              {
                value: "",
                label: "Select",
              },
              {
                value: "Contains",
                label: "Contains",
              },
              {
                value: "Equals",
                label: "Equals",
              },
              {
                fieldTwoIndex: params.filterFields.fieldTwoValue[i][0],
              },
              { fieldTwoValue: params.filterFields.fieldTwoValue[i][1] },
            ],
            fieldText: params.filterFields.fieldText[i][0],
          },
        });
      }
    } else {
      inputFieldValFirst.push({
        fieldOne: [
          {
            value: "",
            label: "Select",
          },
          {
            value: "AlarmDescription",
            label: "AlarmDescription",
          },
          {
            value: "NewStateReason",
            label: "NewStateReason",
          },
          {
            value: "NewStateValue",
            label: "NewStateValue",
          },
          {
            value: "Subject",
            label: "Subject",
          },
          {
            value: "AlarmName",
            label: "AlarmName",
          },
          {
            value: "Region",
            label: "Region",
          },
          {
            value: "StateChangeTime",
            label: "StateChangeTime",
          },
          {
            value: "OldStateValue",
            label: "OldStateValue",
          },
          {
            value: "Trigger",
            label: "Trigger",
          },
          {
            value: "AWSAccountID",
            label: "AWSAccountID",
          },
          { fieldOneIndex: 0 },
          { fieldOneValue: "" },
        ],
        fieldTwo: [
          {
            value: "",
            label: "Select",
          },
          {
            value: "Contains",
            label: "Contains",
          },
          {
            value: "Equals",
            label: "Equals",
          },
          {
            fieldTwoIndex: 0,
          },
          { fieldTwoValue: "" },
        ],
        fieldText: [],
      });
    }
    return inputFieldValFirst;
  }

  switch (action.type) {
    case ToolsAWSCloudWatch.ADVANCED_AF_MESSAGE:
      if (hasDuplicates(state.message, action.payload) === -1) {
        return {
          ...state,
          message: [...state.message, action.payload],
        };
      }
      return state;

    case ToolsAWSCloudWatch.ADVANCED_AF_SOURCE:
      if (hasDuplicates(state.source, action.payload) === -1) {
        return {
          ...state,
          source: [...state.source, action.payload],
        };
      }
      return state;

    case ToolsAWSCloudWatch.ADVANCED_AF_DESC:
      if (hasDuplicates(state.description, action.payload) === -1) {
        return {
          ...state,
          description: [...state.description, action.payload],
        };
      }
      return state;
    case ToolsAWSCloudWatch.ADVANCED_AF_ALIAS:
      if (hasDuplicates(state.alias, action.payload) === -1) {
        return {
          ...state,
          alias: [...state.alias, action.payload],
        };
      }
      return state;

    case ToolsAWSCloudWatch.ADVANCED_AF_ENTITY:
      if (hasDuplicates(state.entity, action.payload) === -1) {
        return {
          ...state,
          entity: [...state.entity, action.payload],
        };
      }
      return state;

    case ToolsAWSCloudWatch.ADVANCED_AF_TAGS:
      if (hasDuplicates(state.tags, action.payload) === -1) {
        return {
          ...state,
          tags: [...state.tags, action.payload],
        };
      }
      return state;

    case ToolsAWSCloudWatch.ADVANCED_AF_REMOVE_TAGS:
      return {
        ...state,
        tags: state.tags.filter((item) => item !== action.payload),
      };
    case ToolsAWSCloudWatch.ADVANCED_AF_REMOVE_ACTIONS:
      return {
        ...state,
        actions: state.actions.filter((item) => item !== action.payload),
      };
    case ToolsAWSCloudWatch.ADVANCED_AF_REMOVE_ALIAS:
      return {
        ...state,
        alias: state.alias.filter((item) => item !== action.payload),
      };
    case ToolsAWSCloudWatch.ADVANCED_AF_REMOVE_DESC:
      return {
        ...state,
        description: state.description.filter(
          (item) => item !== action.payload
        ),
      };
    case ToolsAWSCloudWatch.ADVANCED_AF_REMOVE_ENTITY:
      return {
        ...state,
        entity: state.entity.filter((item) => item !== action.payload),
      };
    case ToolsAWSCloudWatch.ADVANCED_AF_REMOVE_MESSAGE:
      return {
        ...state,
        message: state.message.filter((item) => item !== action.payload),
      };

    case ToolsAWSCloudWatch.ADVANCED_AF_ACTIONS:
      if (hasDuplicates(state.actions, action.payload) === -1) {
        return {
          ...state,
          actions: [...state.actions, action.payload],
        };
      }
      return state;

    case ToolsAWSCloudWatch.CREATE_ALERT:
      return {
        ...state,
        createAlert: [...state.createAlert, action.payload],
      };

    case ToolsAWSCloudWatch.ADVANCED_AF_TEAMNAME:
      return {
        ...state,
        teamName: action.payload,
      };

    case ToolsAWSCloudWatch.ADVANCED_AF_PRIORITY:
      let tempPrioOnChange;
      state.prio.forEach((element, index) => {
        if (element.value === action.payload.priority) {
          tempPrioOnChange = index;
        }
      });

      return {
        ...state,
        priority: action.payload,
        prioIndex: tempPrioOnChange,
      };

    case ToolsAWSCloudWatch.ADVANCED_AF_OWNERNAME:
      return {
        ...state,
        ownerName: action.payload,
      };

    case ToolsAWSCloudWatch.ALERTFIELD_RESET:
      return {
        ...state,
        message: [],
      };

    case ToolsAWSCloudWatch.ACTIVE_ALERT:
      let arrayActive = [];
      let inputFilterValues = [];
      state.createAlert.map((value) => {
        if (value.id === action.payload) {
          arrayActive.push(value.id);
          arrayActive.push(value.alertType);
          action.payload = value.alertFields;
          inputFilterValues = populateFilter(value);
        }
      });
      let tempPrioVal;
      state.prio.forEach((element, index) => {
        if (element.value === action.payload.priority) {
          tempPrioVal = index;
        }
      });

      return {
        ...state,
        activeAlert: arrayActive,
        inputFields: inputFilterValues,
        message: action.payload.message,
        alias: action.payload.alias,
        priority: action.payload.priority,
        prioIndex: tempPrioVal,
        teamName: action.payload.teamName,
        ownerName: action.payload.ownerName,
        entity: action.payload.entity,
        tags: action.payload.tags,
        actions: action.payload.actions,
        description: action.payload.description,
      };

    case ToolsAWSCloudWatch.FETCH_SUCCESS:
      if (action.payload.length !== 0) {
        let inputFieldValFirst = [];
        inputFieldValFirst = populateFilter(action.payload[0]);

        if (action.payload && action.payload.length > 0) {
          let arrayFirst = [];
          arrayFirst.push(
            action.payload[0].id === undefined ? "" : action.payload[0].id
          );
          arrayFirst.push(
            action.payload[0].alertType === undefined
              ? ""
              : action.payload[0].alertType
          );
          let tempPrioValFirst;
          state.prio.forEach((element, index) => {
            if (element.value === action.payload[0].alertFields.priority) {
              tempPrioValFirst = index;
            }
          });

          return {
            ...state,
            createAlert: action.payload,
            activeAlert: arrayFirst,
            prioIndex: tempPrioValFirst,
            inputFields: inputFieldValFirst,

            message:
              action.payload[0].alertFields.message === undefined ||
              action.payload[0] === null
                ? []
                : action.payload[0].alertFields.message,
            alias:
              action.payload[0] === undefined
                ? []
                : action.payload[0].alertFields.alias,
            priority:
              action.payload[0] === undefined
                ? ""
                : action.payload[0].alertFields.priority,
            teamName:
              action.payload[0] === undefined
                ? ""
                : action.payload[0].alertFields.teamName,
            ownerName:
              action.payload[0] === undefined
                ? ""
                : action.payload[0].alertFields.ownerName,
            entity:
              action.payload[0] === undefined
                ? []
                : action.payload[0].alertFields.entity,
            tags:
              action.payload[0] === undefined
                ? []
                : action.payload[0].alertFields.tags,
            actions:
              action.payload[0] === undefined
                ? []
                : action.payload[0].alertFields.actions,
            description:
              action.payload[0] === undefined
                ? []
                : action.payload[0].alertFields.description,
          };
        }
      }
      let arrayBefore = [];
      arrayBefore.push(0);
      arrayBefore.push("Please create a new alert first");
      return {
        ...state,
        activeAlert: arrayBefore,
      };

    case ToolsAWSCloudWatch.POST_CREATE_ALERT:
      return {
        ...state,
      };

    case ToolsAWSCloudWatch.ADVANCED_FILTER_FIELDONE:
      let tempIndexUpdateFirst = { ...state.inputFields };
      for (let element in state.inputFields) {
        for (let elementTwo in state.inputFields[element].fieldOne) {
          if (
            state.inputFields[element].fieldOne[elementTwo].value ===
            action.value
          ) {
            tempIndexUpdateFirst[
              action.index
            ].fieldOne[11].fieldOneIndex = elementTwo;
            tempIndexUpdateFirst[action.index].fieldOne[12].fieldOneValue =
              action.value;
          }
        }
      }

      return {
        ...state,
        tempIndexUpdateFirst,
      };

    case ToolsAWSCloudWatch.ADVANCED_FILTER_FIELDTWO:
      let tempIndexUpdateSecond = { ...state.inputFields };
      for (let element in state.inputFields) {
        for (let elementTwo in state.inputFields[element].fieldTwo) {
          if (
            state.inputFields[element].fieldTwo[elementTwo].value ===
            action.value
          ) {
            tempIndexUpdateSecond[
              action.index
            ].fieldTwo[3].fieldTwoIndex = elementTwo;
            tempIndexUpdateSecond[action.index].fieldTwo[4].fieldTwoValue =
              action.value;
          }
        }
      }

      return {
        ...state,
        tempIndexUpdateSecond,
      };

    case ToolsAWSCloudWatch.ADVANCED_FILTER_FIELDTEXT:
      let tempValueUpdate = { ...state.inputFields };
      tempValueUpdate[action.index].fieldText = action.value;
      for (let element in state.inputFields) {
        if (state.inputFields[element].fieldText === action.value) {
          tempValueUpdate[action.index].fieldText = action.value;
        }
      }
      return {
        ...state,
        tempValueUpdate,
      };

    case ToolsAWSCloudWatch.ADVANCED_FILTER_SETFIELD:
      return {
        ...state,
        inputFields: [
          ...state.inputFields,
          {
            fieldOne: [
              {
                value: "",
                label: "Select",
              },
              {
                value: "AlarmDescription",
                label: "AlarmDescription",
              },
              {
                value: "NewStateReason",
                label: "NewStateReason",
              },
              {
                value: "NewStateValue",
                label: "NewStateValue",
              },
              {
                value: "Subject",
                label: "Subject",
              },
              {
                value: "AlarmName",
                label: "AlarmName",
              },
              {
                value: "Region",
                label: "Region",
              },
              {
                value: "StateChangeTime",
                label: "StateChangeTime",
              },
              {
                value: "OldStateValue",
                label: "OldStateValue",
              },
              {
                value: "Trigger",
                label: "Trigger",
              },
              {
                value: "AWSAccountID",
                label: "AWSAccountID",
              },
              { fieldOneIndex: 0 },
              { fieldOneValue: "" },
            ],
            fieldTwo: [
              {
                value: "",
                label: "Select",
              },
              {
                value: "Contains",
                label: "Contains",
              },
              {
                value: "Equals",
                label: "Equals",
              },
              {
                fieldTwoIndex: 0,
              },
              { fieldTwoValue: "" },
            ],
            fieldText: "",
          },
        ],
      };

    case ToolsAWSCloudWatch.ADVANCED_FILTER_SETFIELDREMOVE:
      const values = [...state.inputFields];
      values.splice(action.payload, 1);
      return {
        ...state,
        inputFields: [...values],
      };
    default:
      return state;
  }
}
