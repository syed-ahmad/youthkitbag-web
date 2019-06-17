import * as types from './types'

export const getUser = () => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem('user'))
  dispatch({ type: types.GET_USER, payload: user })
}
