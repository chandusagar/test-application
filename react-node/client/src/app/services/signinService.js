import axios from "axios";

export const signinService = {};

const getHeader = {
  "Content-Type": "application/json",
  Authorization: `Bearer Token`,
};

signinService.Signin = async (data) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_URI + "/auth/signin",
      data,
      { headers: getHeader }
    );
    return res.data ? res.data.data : [];
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

signinService.signup = async (data) => {
  try {
    let res = await axios.post(
      process.env.REACT_APP_URI + "/users/signup",
      data,
      { headers: getHeader }
    );
    return res.data ? res.data.data : [];
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};
