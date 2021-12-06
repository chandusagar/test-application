export const SELECTED_REPO = 'SELECTED_REPO';
export const SET_REPO_STRUCTURE = 'SET_REPO_STRUCTURE';
export const SET_CURRENT_DIRECTORY = 'SET_CURRENT_DIRECTORY';
export const SET_BRANCH_LIST = 'SET_BRANCH_LIST'
export const SET_VERSION_CONTROL = 'SET_VERSION_CONTROL'


export function selectedRepo(payload) {
    return {
        type: SELECTED_REPO,
        payload
    }
}

export function setRepoStructure(payload) {
    return {
        type: SET_REPO_STRUCTURE,
        payload
    }
}

export function setcurrentDirectory(payload) {
    return {
        type: SET_CURRENT_DIRECTORY,
        payload
    }
}

export function setBranchList(payload) {
    return {
        type: SET_BRANCH_LIST,
        payload
    }
}

export function setVersionControl(payload) {
    return {
        type: SET_VERSION_CONTROL,
        payload
    }
}