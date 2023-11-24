import {
  signinFailed,
  signinRequest,
  signinSuccess,
  signupFailed,
  signupRequest,
  signupSuccess,
} from "../actions/types";
const INITIAL_VALUE = {
  isSignedIn: null,
};

export const authReducer = (state = INITIAL_VALUE, action) => {
  switch (action.type) {
    case "signupRequest":
      return {
        ...state,
        loading: true,
      };
    case "signupSuccess":
      return {
        ...state,
        loading: false,
        msg: action.msg,
        isAuthenticated: true,
      };
    case "signupFailed":
      return {
        ...state,
        loading: false,
        err: action.err,
        isAuthenticated: false,
      };
    case "signinRequest":
      return {
        ...state,
        loading: true,
      };
    case "signinSuccess":
      return {
        ...state,
        loading: false,
        msg: action.msg,
        isAuthenticated: true,
      };
    case "signinFailed":
      return {
        ...state,
        loading: false,
        err: action.err,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
