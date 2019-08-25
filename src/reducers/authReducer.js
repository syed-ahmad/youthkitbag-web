import * as types from '../actions/types';

const isLogin = !!(localStorage.getItem('token') && localStorage.getItem('authentication'))
const initialState = isLogin ? { loggedIn: true } : { loggedIn: false }

export default function authentication(state = initialState, action) {
  ////console.log('AUTH', action.type, action.payload);
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        token: action.payload.token,
        loader: true,
        loggedIn: true
      }
    case types.LOGIN_FAILURE:
      return {
        loggedIn: false,
        loginFailed: true
      }
    case types.SIGNUP_SUCCESS:
      return {
        signedUp: true,
      }
    case types.SIGNUP_FAILURE:
      return {
        signupFailed: true
      }
    case types.GETALL_SUCCESS:
      return {
        loggedIn: true,
        loader: false
      }
    case types.GETALL_FAILURE:
      return {
        errorOccurred: true,
        loginFailed: true,
        loginError: action.payload
      }
    case types.LOGOUT:
      return {
        loggedIn: false,
      }
    default:
      return state
  }
}

