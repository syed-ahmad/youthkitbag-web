import { RESET_ERROR } from './types';

export const resetError = () => dispatch => {
  dispatch({ type: RESET_ERROR });
};
