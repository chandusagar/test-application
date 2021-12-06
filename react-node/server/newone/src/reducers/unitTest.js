import { SELECTED_BUILD_TOOL } from '../actions/unitTest';

const defaultState = {
    selectedBuildTool : {},
};

export default function unitTestReducer(state = defaultState, action) {
    console.log('actions unitTestReducer payload', action);
    switch (action.type) {
        case SELECTED_BUILD_TOOL:
            return Object.assign({}, state, { selectedBuildTool : action.payload });
        default:
            return state;
    }
}