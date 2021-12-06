export const WORK_FLOW_LIST = 'WORK_FLOW_LIST';


export function workflowList(payload) {
    return {
        type: WORK_FLOW_LIST,
        payload
    }
}