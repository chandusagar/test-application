import { GET_USER_LIST } from "./type";

export const user = {};

user.userList = (data) => async (dispatch) => {
    dispatch({ type: GET_USER_LIST, payload:data ? data: [{ name: "chandu", lastName: "sagar" }] });
}

