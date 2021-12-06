import { WORK_FLOW_LIST } from '../actions/workflow';

const defaultState = {

    workflow : [] ,   
};

export default function workflowReducer(state = defaultState, action) {
    switch (action.type) {
        case WORK_FLOW_LIST:
            return Object.assign({}, state, { workflow : action.payload });
        default:
            return state;
         }
}