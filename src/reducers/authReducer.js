import { LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_SUCCESS, SIGNUP_FAILURE, GETALL_SUCCESS, GETALL_FAILURE, LOGOUT } from '../actions/types';

const isLogin = !!(localStorage.getItem('token') && localStorage.getItem('authentication'))
const initialState = isLogin ? { loggedIn: true } : { loggedIn: false }

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        token: action.payload.token,
        loader: true,
        loggedIn: true
      }
    case LOGIN_FAILURE:
      return {
        loggedIn: false,
        loginFailed: true
      }
    case SIGNUP_SUCCESS:
      return {
        signedUp: true,
      }
    case SIGNUP_FAILURE:
      return {
        signupFailed: true
      }
    case GETALL_SUCCESS:
      return {
        loggedIn: true,
        loader: false
      }
    case GETALL_FAILURE:
      return {
        errorOccurred: true,
        loginFailed: true,
        loginError: action.payload
      }
    case LOGOUT:
      return {
        loggedIn: false,
      }
    default:
      return state
  }
}

