import { socialgraph as api } from '../api';
import { Actors as ACTORS } from '../constants';

// -- Follow

function followRequest() {
  return {
    type: ACTORS.FOLLOW.REQUEST,
  };
}

function followSuccess(response) {
  return {
    type: ACTORS.FOLLOW.SUCCESS,
    actor: response.data,
  };
}

function followFailure(error) {
  return {
    type: ACTORS.FOLLOW.FAILURE,
    error: error.message,
  };
}

export function followActor(viewer, actor) {
  return (dispatch) => {
    dispatch(followRequest());
    return new Promise((resolve, reject) => {
      api.followActor(viewer, actor)
        .then((result) => {
          dispatch(followSuccess(result));
          return resolve();
        }, (response) => {
          dispatch(followFailure(response));
          return reject(response);
        }).catch((error) => {
          throw new Error(error);
        });
    });
  };
}

// -- Unfollow

function unfollowRequest() {
  return {
    type: ACTORS.UNFOLLOW.REQUEST,
  };
}

function unfollowSuccess(response) {
  return {
    type: ACTORS.UNFOLLOW.SUCCESS,
    actor: response.data,
  };
}

function unfollowFailure(error) {
  return {
    type: ACTORS.UNFOLLOW.FAILURE,
    error: error.message,
  };
}

export function unfollowActor(viewer, actor) {
  return (dispatch) => {
    dispatch(unfollowRequest());
    return new Promise((resolve, reject) => {
      api.unfollowActor(viewer, actor)
        .then((result) => {
          dispatch(unfollowSuccess(result));
          return resolve();
        }, (response) => {
          dispatch(unfollowFailure(response));
          return reject(response);
        }).catch((error) => {
          throw new Error(error);
        });
    });
  };
}
