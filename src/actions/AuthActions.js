import * as types from './types'
import API from '../helpers/api'
import history from '../helpers/history'
import { getUser } from './UserActions'

const loginRequest = (userId, token) => async (dispatch) => {
  try {
    const response = await API.get(`/account/${userId}`);
    localStorage.setItem(
      'authentication',
      JSON.stringify(response.data),
    )
    dispatch({ type: types.GETALL_SUCCESS})
    dispatch(getUser(userId))
    history.push('/')
  } catch (err) {
    if (err.response.status >= 400) {
      window.location.reload()
    }
    dispatch({ type: types.GETALL_FAILURE, payload: err.message })
  }
}

export const login = (email, password) => async (dispatch) => {
  try {
    const { data } = await API.post('/auth/login', { email, password })
    localStorage.setItem('token', data.token)
    dispatch({ type: types.LOGIN_SUCCESS, payload: data })
    dispatch(loginRequest(data.userId, data.token))
  } catch (err) {
    dispatch({ type: types.LOGIN_FAILURE, payload: err.message })
  }
}

export const register = (email, password, username) => async (dispatch) => {
  try {
    await API.post('Users', { email, password, username })
    dispatch({ type: types.REGISTER_SUCCESS })
    history.push('/auth/login', { register: 'success' })
  } catch (err) {
    dispatch({ type: types.REGISTER_FAILURE, payload: err.message })
  }
}

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('authentication')
    localStorage.removeItem('token')
    dispatch({ type: types.LOGOUT })
    history.push('/auth/login')
  } catch (err) {
    if (err.response.status === 401) {
      history.push('/auth/login')
    }
    console.log(err)
  }
}
