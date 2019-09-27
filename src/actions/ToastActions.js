import { RESET_TOAST, SHOWN_TOAST } from "./types";

export const resetToast = () => dispatch => {
  dispatch({ type: RESET_TOAST });
};

export const shownToast = () => dispatch => {
  dispatch({ type: SHOWN_TOAST });
};
