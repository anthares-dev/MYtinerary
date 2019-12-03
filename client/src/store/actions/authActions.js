//https://www.youtube.com/watch?v=qyomEaXQJFk&list=PLillGF-RfqbbiTGgA77tGO426V3hRF9iE&index=11&t=0s

import axios from "axios";

import { returnErrors } from "./errorActions";

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../actions/typesActions";

//! Setup config/headers and token
// We get the token and put in the header
export const tokenConfig = getState => {
  //* Get token from localStorage
  const token = localStorage.getItem("token");

  //* Headers
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };

  //* If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }
  console.log(config);

  return config;
};

//! Check token & load user
export const loadUser = () => (dispatch, getState) => {
  // Call user loading
  dispatch({ type: USER_LOADING });
  console.log(getState().auth);
  console.log(localStorage.getItem("token"));
  // Fetch the user
  axios
    .get("/api/users/auth/user", tokenConfig(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//! Register User
export const register = user => dispatch => {
  //* Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  console.log();

  axios
    .post("/api/users", user, config)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

//! Login User
export const login = ({ email, password }) => dispatch => {
  //* Headers
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  //* Request body
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/users/auth", body, config)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

//! Logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};
