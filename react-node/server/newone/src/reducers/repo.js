import { SELECTED_REPO , SET_REPO_STRUCTURE , SET_CURRENT_DIRECTORY , SET_BRANCH_LIST , SET_VERSION_CONTROL } from '../actions/repos';

const defaultState = {

    selected_repository : {},
    repository_Structure : {},
    currentDirectory : ['','root'],
    branchList : [],
    versionControl : {}    
};

export default function repoReducer(state = defaultState, action) {
    switch (action.type) {
        case SELECTED_REPO:
            return Object.assign({}, state, { selected_repository : action.payload });
        case SET_REPO_STRUCTURE:
            return Object.assign({}, state, { repository_Structure : action.payload });
        case SET_CURRENT_DIRECTORY:
            return Object.assign({}, state, { currentDirectory : action.payload });
        case SET_BRANCH_LIST:
            return Object.assign({}, state, { branchList : action.payload });
        case SET_VERSION_CONTROL:
            return Object.assign({}, state, { versionControl : action.payload });
        default:
            return state;
         }
}