import {
  FETCH_GROUPS,
  FETCH_GROUP,
  FETCH_GROUP_MEMBERS,
  LOGOUT,
  CREATE_GROUP,
  EDIT_GROUP
} from '../actions/types';

const initialState = { current: {}, list: [], memberList: {} };

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GROUPS:
      return {
        current: {},
        list: action.payload.groups,
        memberList: {}
      };
    case FETCH_GROUP:
      return {
        current: action.payload,
        list: [],
        memberList: {}
      };
    case CREATE_GROUP:
    case EDIT_GROUP:
      return {
        current: action.payload.kit,
        list: [],
        memberList: {}
      };
    case FETCH_GROUP_MEMBERS:
      return { ...state, memberList: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
