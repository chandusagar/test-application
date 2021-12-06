export const SET_CURRENT_STAGE = 'SET_CURRENT_STAGE';
export const SET_TOOLS = 'SET_TOOLS';

export function setCurrentStage(payload) {
    return {
        type: SET_CURRENT_STAGE,
        payload
    }
}

export function setTools(payload) {
    return {
        type: SET_TOOLS,
        payload
    }
}