import {
  lIST_ASESSEMENT,
  EDIT_ASSESSMENT,
} from "../../actions/systemMaster/assessement";

const initialState = {
  assessments: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case lIST_ASESSEMENT:
      return { ...state, assessments: action.payload };
    case EDIT_ASSESSMENT:
      return { ...state, assessments: action.payload };
    default:
      return state;
  }
}
