'use strict';
import * as ACTION_TYPES from './action-types';

export const users = (state = [], action) => {
  switch (action.type) {
    case ACTION_TYPES.ACTION_LOAD_USERS:
      return [...action.payload];
    case ACTION_TYPES.ACTION_ADD_USER:
      return [...state, Object.assign({}, action.payload)];
    case ACTION_TYPES.ACTION_SAVE_USER:
    case ACTION_TYPES.ACTION_UPDATE_USER:
      return [
          ...state.filter(user => user.id !== action.payload.id),
          Object.assign({}, action.payload)
        ];
    case ACTION_TYPES.ACTION_DELETE_USER:
    case ACTION_TYPES.ACTION_REMOVE_USER:
      console.log('reduce user with', action)
      return state.filter(({ id }) => id !== action.payload.id);

    default:
      return state;
  }
};


export const user = (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.ACTION_SHOW_USER:
    case ACTION_TYPES.ACTION_NEW_USER:
    case ACTION_TYPES.ACTION_EDIT_USER:
      return action.payload;

    default:
      return state;
  }
};
