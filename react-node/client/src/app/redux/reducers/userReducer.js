import { GET_USER_LIST } from "../actions/type";

const initialState = {
    users:[]
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_LIST:
            return { ...state, users: action.payload };
        default:return state
    }
    
}

export default userReducer