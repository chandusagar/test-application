import axios from "axios";
import env from "react-dotenv";

export const supplierService = {};

const getHeaders = (accessToken) => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
};

supplierService.getSuppliers = async (accessToken) => {
  try {
    let res = await axios.get(env.API_URI + "/suppliers", {
      headers: getHeaders(accessToken),
    });
    return res ? res : [];
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

supplierService.updateSupplier = async (id, data, accessToken) => {
  try {
    let res = axios.put(env.API_URI + `/suppliers/${id}`, data, {
      headers: getHeaders(accessToken),
    });
    return res ? res : [];
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

supplierService.addSupplier = async (data, accessToken) => {
  try {
    let res = await axios.post(env.API_URI + "/suppliers", data, {
      headers: getHeaders(accessToken),
    });
    return res ? res : [];
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

supplierService.getUnmapedBrands = async (accessToken) => {
  try {
    let res = axios.get(env.API_URI + "/suppliers/unmappedBrands", {
      headers: getHeaders(accessToken),
    });
    return res ? res : [];
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

supplierService.addSupplierUnmappedBrands = async (data, accessToken) => {
  try {
    let res = await axios.post(
      env.API_URI + "/suppliers/unmappedbrands",
      data,
      {
        headers: getHeaders(accessToken),
      }
    );
    return res ? res : [];
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};
