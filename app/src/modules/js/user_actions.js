'use strict';
import {push, replace, goBack} from 'react-router-redux';
import * as ACTION_TYPES from './action-types';

import EventBus from '../../lib/js/eventBus';
import Resource from '../../lib/js/resource';

export const loadUsers = () => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.users && state.users.length) {
      return;
    } else {
      let resource = new Resource("/users");

      resource.all().then(users => {
          dispatch({
            type: ACTION_TYPES.ACTION_LOAD_USERS,
            payload: users
          })
        }
      ).fail((xhr,error) => {
        EventBus.emit('notify:error', "Could not load Users - " + xhr.responseJSON.errors.join(', ') );
      });
    }
  };
};


export const showUser = user => {
  return dispatch => {
    dispatch({
      type: ACTION_TYPES.ACTION_SHOW_USER,
      payload: user
    });
    dispatch(push('/users/' + user.id));
  };
};

export const addUser = user => {
  return dispatch => {
    dispatch({
      type: ACTION_TYPES.ACTION_ADD_USER,
      payload: user
    });
    dispatch(push('/users/'));
  };
};

export const removeUser = user => {
  return dispatch => {
    dispatch({
      type: ACTION_TYPES.ACTION_REMOVE_USER,
      payload: user
    });
    dispatch(push('/users/'));
  };
};

export const updateUser = user => {
  return dispatch => {
    dispatch({
      type: ACTION_TYPES.ACTION_UPDATE_USER,
      payload: user
    });
    dispatch(push('/users/'));
  };
};

export const newUser = user => {
  return dispatch => {
    console.log('new user action', user)
    dispatch({
      type: ACTION_TYPES.ACTION_NEW_USER,
      payload: {}
    });
    dispatch(push('/users/new'));
  };
};

export const editUser = user => {
  return dispatch => {
    console.log('edit user action', user)
    dispatch({
      type: ACTION_TYPES.ACTION_EDIT_USER,
      payload: user
    });
    dispatch(push('/users/' + user.id + '/edit'));
  };
};

export const saveUser = user => {
  return dispatch => {
    console.log('update user action', user)

    let resource = new Resource("/users", user);
    resource.save().then(user => {
      EventBus.emit('notify:success', "Saved User successfully" );
      dispatch({
        type: ACTION_TYPES.ACTION_SAVE_USER,
        payload: user
      });
    }).fail((xhr,error) => {
      console.log('save post error', xhr)
      EventBus.emit('notify:error', "Could not save User - " + xhr.responseJSON.errors.join(', ') );
    });
  };
}

export const deleteUser = user => {
  return dispatch => {
    let resource = new Resource("/users", user);
    resource.destroy().then(() => {
      EventBus.emit('notify:success', "Deleted User successfully" );
      dispatch({
        type: ACTION_TYPES.ACTION_DELETE_USER,
        payload: user
      });
      dispatch(replace('/users/'));
    }).fail((xhr,error) => {
      EventBus.emit('notify:error', "Could not delete User - " + xhr.responseJSON.errors.join(', ') );
    });

  };
};
