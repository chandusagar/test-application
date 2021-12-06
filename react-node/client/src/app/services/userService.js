import axios from "axios";

export const userService = {};

const getHeader = {
  "Content-Type": "application/json",
  Authorization: `${localStorage.getItem("accessToken")}`,
};

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer Token`,
};

userService.userList = async () => {
  try {
    let res = await axios.get(process.env.REACT_APP_URI + "/users", {
      headers: getHeader,
    });
    return res.data ? res.data.data : [];
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

userService.createUser = async (data) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_URI + "/users/signup",
      data,
      { headers: headers }
    );
    return res.data ? res.data.data : [];
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

userService.getUserById = async (id) => {
  try {
    let res = await axios.get(process.env.REACT_APP_URI + `/users/${id}`, {
      headers: getHeader,
    });
    return res.data ? res.data.data : [];
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

userService.updateUser = async (id, data) => {
  try {
    let res = await axios.put(
      process.env.REACT_APP_URI + `/users/${id}`,
      data,
      { headers: getHeader }
    );
    return res.data ? res.data.data : [];
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

userService.deleteUser = async (id) => {
  try {
    let res = await axios.delete(process.env.REACT_APP_URI + `/users/${id}`, {
      headers: getHeader,
    });
    return res.data ? res.data.data : [];
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};


