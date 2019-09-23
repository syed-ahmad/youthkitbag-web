import { RESET_TOAST } from './types';

export const resetError = () => dispatch => {
  dispatch({ type: RESET_TOAST });
};
