export const lIST_ASESSEMENT = "lIST_ASESSEMENT";
export const EDIT_ASSESSMENT = "EDIT_ASSESSMENT";

export const assessment = {};

assessment.list = (addItems) => {
  return {
    type: lIST_ASESSEMENT,
    payload: addItems,
  };
};

assessment.edit = (addItems) => {
  return {
    type: EDIT_ASSESSMENT,
    payload: addItems,
  };
};
