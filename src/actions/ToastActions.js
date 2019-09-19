import { RESET_ERROR } from './types';

export const resetError = () => dispatch => {
  console.log('I DID NOT RUN EITHER');
  dispatch({ type: RESET_ERROR });
};
