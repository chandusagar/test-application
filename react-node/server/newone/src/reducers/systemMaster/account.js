import { lIST_ACCOUNT, EDIT_ACCOUNT } from "../../actions/systemMaster/account";

const initialState = {
  accounts: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case lIST_ACCOUNT:
      return { ...state, accounts: action.payload };
    case EDIT_ACCOUNT:
      return { ...state, accounts: action.payload };
    default:
      return state;
  }
}
