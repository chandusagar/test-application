import axios from 'axios';
import config from '../config';
import jwt from "jsonwebtoken";
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';
// import Errors from '../components/FormItems/error/errors';
// import { mockUser } from './mock';
import { v4 as uuidv4 } from "uuid";
import UserPool from '../pages/auth/UserPool'

export const AUTH_FAILURE = 'AUTH_FAILURE';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const RESET_REQUEST = 'RESET_REQUEST';
export const RESET_SUCCESS = 'RESET_SUCCESS';
export const PASSWORD_RESET_EMAIL_REQUEST = 'PASSWORD_RESET_EMAIL_REQUEST';
export const PASSWORD_RESET_EMAIL_SUCCESS = 'PASSWORD_RESET_EMAIL_SUCCESS';
export const AUTH_INIT_SUCCESS = 'AUTH_INIT_SUCCESS';
export const AUTH_INIT_ERROR = 'AUTH_INIT_ERROR';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

// async function findMe() {
//   if (config.isBackend) {
//     const response = await axios.get('/auth/me');
//     return response.data;
//   } else {
//     return mockUser;
//   }
// }

export function authError(payload) {
  return {
    type: AUTH_FAILURE,
    payload,
  };
}

export function doInit() {

  return async (dispatch) => {

      let currentUser = UserPool.getCurrentUser();
      if(currentUser){

        currentUser.getSession(function (err, session) {
          currentUser.getUserAttributes(function(err, result) {
              if (err) {
                  console.log(err);
                  return;
              }
              let user_data = {}
              for (let i = 0; i < result.length; i++) {
                user_data[result[i].getName()] = result[i].getValue()
              }
              dispatch({ type: AUTH_INIT_SUCCESS , payload: { currentUser : user_data } });
          });
        });

      }else{

        dispatch({ type: AUTH_INIT_ERROR }); 
      }


  }
}

export function logoutUser() {
    return (dispatch) => {
        dispatch({
          type: LOGOUT_REQUEST,
        });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        axios.defaults.headers.common['Authorization'] = "";
        dispatch({
          type: LOGOUT_SUCCESS,
        });
      dispatch(push('/login'));
    };
}

export function receiveToken(token) {
    return (dispatch) => {
        let user;

        if (config.isBackend) {
          user = jwt.decode(token)
        } else {
          user = {
            email: config.auth.email,
            user: {
              id: 'default_no_connection_id_444'
            }
          }
        }

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
        dispatch({
          type: LOGIN_SUCCESS
        });
        dispatch(push('/app'));
    }
}

export function loginUser(creds) {
    return (dispatch) => {
      localStorage.setItem("dashboardTheme", 'dark')
      localStorage.setItem('navbarColor', '#fff')
      localStorage.setItem('navbarType', 'static')
        dispatch(receiveToken(uuidv4()));
        dispatch(doInit());
        dispatch(push('/app'));
    };
}

export function verifyEmail(token) {
  return(dispatch) => {
    if (!config.isBackend) {
      dispatch(push('/login'));
    } else {
      axios.put("/auth/verify-email", {token}).then(verified => {
        if (verified) {
          toast.success("Your email was verified");
        }
      }).catch(err => {
        toast.error(err.response.data);
      }).finally(() => {
        dispatch(push('/login'));
      })
    }
  }
}

export function resetPassword(token, password) {
  return (dispatch) => {
    if (!config.isBackend) {
      dispatch(push('/login'));
    } else {
      dispatch({
        type: RESET_REQUEST,
      });
      axios.put("/auth/password-reset", {token, password}).then(res => {
          dispatch({
            type: RESET_SUCCESS,
          });
          toast.success("Password has been updated");
        dispatch(push('/login'));
      }).catch(err => {
        dispatch(authError(err.response.data));
      })
    }
  }
}

export function sendPasswordResetEmail(email) {
  return (dispatch) => {
    if (!config.isBackend) {
      dispatch(push('/login'));
    } else {
      dispatch({
        type: PASSWORD_RESET_EMAIL_REQUEST,
      });
      axios.post("/auth/send-password-reset-email", {email}).then(res => {
        dispatch({
          type: PASSWORD_RESET_EMAIL_SUCCESS,
        });
        toast.success("Email with resetting instructions has been sent");
        dispatch(push('/login'));
      }).catch(err => {
        dispatch(authError(err.response.data));
      })
    }
  }
}

export function registerUser(creds) {
  return (dispatch) => {
    if (!config.isBackend) {
      dispatch(push('/user/profile'));
    } else {
      dispatch({
        type: REGISTER_REQUEST,
      });

      if (creds.email.length > 0 && creds.password.length > 0) {
        axios.post("/auth/signup", creds).then(res => {
          dispatch({
            type: REGISTER_SUCCESS
          });
          toast.success("You've been registered successfully. Please check your email for verification link");
          dispatch(push('/user/profile'));
        }).catch(err => {
          dispatch(authError(err.response.data));
        })

      } else {
        dispatch(authError('Something was wrong. Try again'));
      }
    }
  };
}
