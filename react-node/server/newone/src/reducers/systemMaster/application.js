import {
  lIST_APPLICATION,
  EDIT_APPLICATION,
} from "../../actions/systemMaster/application";

const initialState = {
  applications: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case lIST_APPLICATION:
      return { ...state, applications: action.payload };
    case EDIT_APPLICATION:
      return { ...state, applications: action.payload };
    default:
      return state;
  }
}
