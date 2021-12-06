export const lIST_APPLICATION = "lIST_APPLICATION";
export const EDIT_APPLICATION = "EDIT_APPLICATION";

export const application = {};

application.list = (addItems) => {
  return {
    type: lIST_APPLICATION,
    payload: addItems,
  };
};

application.edit = (addItems) => {
  return {
    type: EDIT_APPLICATION,
    payload: addItems,
  };
};
