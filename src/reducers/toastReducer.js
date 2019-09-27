import {
  RESET_TOAST,
  API_KITBAG_ERROR,
  LOGOUT,
  CREATE_GROUP,
  CREATE_KITBAG_WANTED,
  CREATE_KITBAG_STOLEN,
  CREATE_KITBAG_TRADE,
  CREATE_KITBAG_KIT,
  DELETE_KITBAG_TRADE,
  DELETE_KITBAG_KIT,
  LOGIN_FAILURE,
  SHOWN_TOAST,
  EDIT_GROUP_STATUS,
  EDIT_GROUP_MEMBER_STATE
} from "../actions/types";

const initialState = {
  currentMessage: "",
  currentStyle: "",
  errors: [],
  hasShown: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_GROUP:
    case CREATE_KITBAG_KIT:
    case CREATE_KITBAG_TRADE:
    case CREATE_KITBAG_WANTED:
    case CREATE_KITBAG_STOLEN:
    case EDIT_GROUP_STATUS:
    case EDIT_GROUP_MEMBER_STATE:
      return {
        currentMessage: action.payload.message,
        currentStyle: "success",
        hasShown: false
      };
    case DELETE_KITBAG_KIT:
    case DELETE_KITBAG_TRADE:
      return {
        currentMessage: action.payload.message,
        currentStyle: "warning",
        hasShown: false
      };
    case API_KITBAG_ERROR:
      return {
        currentMessage: action.payload.data.message,
        currentStyle: "error",
        errors: action.payload.data.errors,
        hasShown: true
      };
    case LOGIN_FAILURE:
      return {
        currentMessage: action.payload.data.message,
        currentStyle: "error",
        hasShown: true
      };
    case SHOWN_TOAST:
      return { ...state, hasShown: true };
    case RESET_TOAST:
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
