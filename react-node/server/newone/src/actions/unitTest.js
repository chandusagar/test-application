export const SELECTED_BUILD_TOOL = 'SELECTED_BUILD_TOOL';


export function setSelectedBuildTool(payload) {
    console.log('actions setSelectedBuildTool payload', payload);
    return {
        type: SELECTED_BUILD_TOOL,
        payload
    }
}