export const lIST_ACCOUNT = "CREATE_ACCOUNT";
export const EDIT_ACCOUNT = "EDIT_ACCOUNT";

export const account = {};

account.accountList = (addItems) => {
  return {
    type: lIST_ACCOUNT,
    payload: addItems,
  };
};

account.edit = (addItems) => {
  return {
    type: EDIT_ACCOUNT,
    payload: addItems,
  };
};
