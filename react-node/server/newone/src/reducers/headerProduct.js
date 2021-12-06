import { HeaderProductType } from "../actions/headerProduct.js";

const defaultFields = {
  selectDropDown: [
    {
      id: "",
      prodName: "Select",
    },
  ],
  selectValue: {},
  selectIndex: 0,
  prodName: "",
  prodDescription: "",
  prodOwner: "",
};

export default function headerProduct(state = defaultFields, action) {
  switch (action.type) {
    case HeaderProductType.FETCH_SUCCESS_PRODUCT:
      let array = [...state.selectDropDown];
      for (let index in action.payload) {
        array.push(action.payload[index]);
      }
      return { ...state, selectDropDown: array };

    case HeaderProductType.CREATE_PRODUCT:
      return {
        ...state,
        prodName: "",
        prodDescription: "",
        prodOwner: "",
        selectDropDown: [...state.selectDropDown, action.payload],
      };

    case HeaderProductType.SELECT_FIELD:
      let tempPrioOnChange;
      state.selectDropDown.forEach((element, index) => {
        if (element.id === action.payload.id) {
          tempPrioOnChange = index;
        }
      });

      return {
        ...state,
        selectValue: action.payload,
        selectIndex: tempPrioOnChange,
      };

    case HeaderProductType.PROD_NAME:
      return {
        ...state,
        prodName: action.payload,
      };
    case HeaderProductType.PROD_DESC:
      return {
        ...state,
        prodDescription: action.payload,
      };
    case HeaderProductType.PROD_OWNER:
      return {
        ...state,
        prodOwner: action.payload,
      };
    default:
      return state;
  }
}
