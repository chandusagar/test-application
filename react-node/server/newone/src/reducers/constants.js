
const defaultState = {
    TABLENAME_RAW_ALERTS : "AiOpsToolsRawAlerts",
    TABLENAME_KNOWN_VULNERABILITY_MASTER: "KnownVulnerabilityMaster",
    ALERT_STATUS_ACTION_OPEN : "Open",
    ALERT_STATUS_ACTION_ACK : "Ack",
    ALERT_STATUS_ACTION_INPROGRESS : "In Progress",
    ALERT_STATUS_ACTION_CLOSE : "Close",
    ALERT_STATUS_ACKNOWLEDGED : "Ack'ed",
    ALERT_STATUS_CLOSED : "Closed"
};

export default function constantsReducer(state = defaultState, action) {
    switch (action.type) {
      default:
        return state;
    }
  }
