import {
  GETALL_FAILURE,
  GETALL_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_SUCCESS
} from '../actions/types';

const isLogin = !!(localStorage.getItem('token') && localStorage.getItem('authentication'))
const initialState = isLogin ? { loggedIn: true } : { loggedIn: false }

export default function authentication(state = initialState, action) {
  console.log('AUTH', action.type, action.payload);
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
        loginFailed: true,
        err: action.payload,
      }
    case '@@redux-form/CHANGE':
      return {
        loginFailed: false,
        registerFailed: false,
      }
    case REGISTER_SUCCESS:
      return {
        registed: true,
      }
    case REGISTER_FAILURE:
      return {
        registerFailed: true,
      }
    case GETALL_SUCCESS:
      return {
        loggedIn: true,
        loader: false
      }
    case GETALL_FAILURE:
      return {
        errorOccurred: true
      }
    case LOGOUT:
      return {
        loggedIn: false,
      }
    default:
      return state
  }
}

