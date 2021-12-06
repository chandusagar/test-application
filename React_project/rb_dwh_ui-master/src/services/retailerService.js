import axios from "axios";
import env from "react-dotenv";

export const retailerService = {};

const getHeaders = (accessToken) => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };
};

retailerService.RetailerSetting = async (accessToken) => {
  try {
    let res = await axios.get(env.API_URI + "/retailers", {
      headers: getHeaders(accessToken),
    });
    return res ? res : [];
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

retailerService.AddRetailer = async (data, accessToken) => {
  try {
    let res = await axios.post(env.API_URI + "/retailers", data, {
      headers: getHeaders(accessToken),
    });

    return res ? res : [];
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

retailerService.RetailerStates = async (accessToken) => {
  try {
    let res = await axios.get(env.API_URI + "/retailers/states", {
      headers: getHeaders(accessToken),
    });
    return res ? res : [];
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

retailerService.UpdateRetailer = async (id, data, accessToken) => {
  try {
    let res = await axios.put(env.API_URI + `/retailers/${id}`, data, {
      headers: getHeaders(accessToken),
    });
    return res ? res : [];
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};
