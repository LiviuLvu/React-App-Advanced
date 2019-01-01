import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  }
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  }
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  }
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
};

export const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(()=>{
      dispatch(logout());
    }, expirationTime * 1000);
  }
};

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());

    let firebaseEndpointURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCgvP6e1WH7aa2jTcF-FJlBiSaVjv8alsE';
    if(!isSignup) {
      firebaseEndpointURL = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCgvP6e1WH7aa2jTcF-FJlBiSaVjv8alsE';
    }

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true
    };

    axios.post(firebaseEndpointURL, authData)
      .then(response => {
        console.log(response);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.error));
      });
  }
};
