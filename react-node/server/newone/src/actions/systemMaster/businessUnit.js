export const lIST_BUSINESSUNIT = "lIST_BUSINESSUNIT";
export const EDIT_BUSINESSUNIT = "EDIT_BUSINESSUNIT";

export const businessunit = {};

businessunit.list = (addItems) => {
  return {
    type: lIST_BUSINESSUNIT,
    payload: addItems,
  };
};
businessunit.edit = (addItems) => {
  return {
    type: EDIT_BUSINESSUNIT,
    payload: addItems,
  };
};
