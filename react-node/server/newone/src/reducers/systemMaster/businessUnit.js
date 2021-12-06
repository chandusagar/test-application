import {
  lIST_BUSINESSUNIT,
  EDIT_BUSINESSUNIT,
} from "../../actions/systemMaster/businessUnit";

const initialState = {
  businessunits: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case lIST_BUSINESSUNIT:
      return { ...state, businessunits: action.payload };
    case EDIT_BUSINESSUNIT:
      return { ...state, businessunits: action.payload };
    default:
      return state;
  }
}
