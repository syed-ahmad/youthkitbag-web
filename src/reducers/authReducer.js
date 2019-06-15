import {
  GETALL_FAILURE,
  GETALL_SUCCESS,
  GET_USER,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_SUCCESS
} from '../actions/types';

const isLogin = !!(localStorage.getItem('token') && localStorage.getItem('authentication'))
const initialState = isLogin ? { loggedIn: true } : { loggedIn: false }

export default function authentication(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        loggedIn: true,
        ...action.payload,
      }
    case LOGIN_SUCCESS:
      return {
        token: action.payload.token,
        loader: true,
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
        loader: false,
      }
    case GETALL_FAILURE:
      return {}
    case LOGOUT:
      return {
        loggedIn: false,
      }
    default:
      return state
  }
}

