export const userReducer = {};

userReducer.initialState = {
  userList: [],
  address:[]

};

userReducer.reducer = (state, action) => {
  switch (action.type) {
    case "GET_USER_LIST":
      return { ...state, userList: action.payload };
    case "GET_USER_ADDRESS_LIST":
      return {...state,address:action.payload}
    default:
      return state;
  }
};
