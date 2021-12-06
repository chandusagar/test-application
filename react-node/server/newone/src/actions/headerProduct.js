import axios from "axios";
import { toast } from "react-toastify";
import UserPool from "../pages/auth/UserPool";

const POST_NEW_PRODUCT =
  "https://2fq98xm3nd.execute-api.us-east-1.amazonaws.com/dev/create-product";
const GET_PRODUCT_LIST =
  "https://2fq98xm3nd.execute-api.us-east-1.amazonaws.com/dev/get-product-list";
const SET_PRODUCT =
  "https://2fq98xm3nd.execute-api.us-east-1.amazonaws.com/dev/set-product";
const GET_PRODUCT =
  "https://2fq98xm3nd.execute-api.us-east-1.amazonaws.com/dev/get-product";

export const HeaderProductType = {
  CREATE_PRODUCT: "CREATE_PRODUCT",
  FETCH_SUCCESS_PRODUCT: "FETCH_SUCCESS_PRODUCT",
  FETCH_ERROR: "FETCH_ERROR",
  PROD_NAME: "PROD_NAME",
  PROD_DESC: "PROD_DESC",
  PROD_OWNER: "PROD_OWNER",
  SELECT_FIELD: "SELECT_FIELD",
};

export function prodName(payload) {
  return {
    type: HeaderProductType.PROD_NAME,
    payload,
  };
}

export function prodDesc(payload) {
  return {
    type: HeaderProductType.PROD_DESC,
    payload,
  };
}

export function prodOwner(payload) {
  return {
    type: HeaderProductType.PROD_OWNER,
    payload,
  };
}

export function selectField(payload) {
  return {
    type: HeaderProductType.SELECT_FIELD,
    payload,
  };
}

export function selectedField(payload) {
  return (dispatch) => {
    let user = UserPool.getCurrentUser();
    axios.defaults.headers.common["token"] = user.username;

    axios
      .post(SET_PRODUCT, { product_id: payload.id })
      .then((res) => {
        dispatch(selectField(payload));
        toast.success("Product Selected");
        window.location.reload();
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
}

export function getSelected() {
  return (dispatch) => {
    let user = UserPool.getCurrentUser();
    axios.defaults.headers.common["token"] = user.username;

    axios
      .get(GET_PRODUCT)
      .then((res) => {
        dispatch(selectField(res.data));
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
}

export function fetchProductSuccess(payload) {
  return {
    type: HeaderProductType.FETCH_SUCCESS_PRODUCT,
    payload,
  };
}

export function fetchProductError() {
  return {
    type: HeaderProductType.FETCH_ERROR,
  };
}

export function fetchProductWithRedux() {
  return (dispatch) => {
    return fetchProduct().then(([response]) => {
      if (response.status === 200) {
        dispatch(fetchProductSuccess(response.data.Items));
        dispatch(getSelected());
      } else {
        dispatch(fetchProductError());
      }
    });
  };
}

export function fetchProduct() {
  return axios
    .get(GET_PRODUCT_LIST)
    .then((response) => Promise.all([response]));
}

export function postCallCreate(payload) {
  const postData = {
    prodDescription: payload.prodDescription,
    prodName: payload.prodName,
    prodOwner: payload.prodOwner,
  };
  return (dispatch) => {
    axios
      .post(POST_NEW_PRODUCT, postData)
      .then((res) => {
        dispatch(postCreateProduct(res.data));
        toast.success("Product Created");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };
}

export function postCreateProduct(payload) {
  return {
    type: HeaderProductType.CREATE_PRODUCT,
    payload: payload,
  };
}
