import { Actors as ACTORS } from '../constants';

export default function (state = {
  isFetching: false,
  isFetchingAvatar: false,
  isFetchingCover: false,
  success: false,
  actor: {},
  error: '',
}, action) {
  switch (action.type) {
    case ACTORS.READ.REQUEST:
      return {
        ...state,
        isFetching: true,
        actor: {},
        success: false,
        error: '',
      };
    case ACTORS.EDIT.REQUEST:
      return {
        ...state,
        isFetching: true,
        actor: action.actor,
        success: false,
        error: '',
      };
    case ACTORS.AVATAR.ADD.REQUEST:
    case ACTORS.AVATAR.DELETE.REQUEST:
      return {
        ...state,
        isFetchingAvatar: true,
        actor: action.actor,
        success: false,
        error: '',
      };
    case ACTORS.COVER.ADD.REQUEST:
    case ACTORS.COVER.DELETE.REQUEST:
      return {
        ...state,
        isFetchingCover: true,
        actor: action.actor,
        success: false,
        error: '',
      };
    case ACTORS.ADD.REQUEST:
    case ACTORS.DELETE.REQUEST:
    case ACTORS.FOLLOW.REQUEST:
    case ACTORS.UNFOLLOW.REQUEST:
    case ACTORS.BLOCK.REQUEST:
    case ACTORS.UNBLOCK.REQUEST:
      return {
        ...state,
        isFetching: true,
        success: false,
        error: '',
      };
    case ACTORS.READ.SUCCESS:
      return {
        ...state,
        isFetching: false,
        actor: action.actor,
        error: '',
      };
    case ACTORS.EDIT.SUCCESS:
    case ACTORS.ADD.SUCCESS:
    case ACTORS.FOLLOW.SUCCESS:
    case ACTORS.UNFOLLOW.SUCCESS:
    case ACTORS.BLOCK.SUCCESS:
    case ACTORS.UNBLOCK.SUCCESS:
      return {
        ...state,
        isFetching: false,
        actor: action.actor,
        success: true,
        error: '',
      };
    case ACTORS.AVATAR.ADD.SUCCESS:
    case ACTORS.AVATAR.DELETE.SUCCESS:
      return {
        ...state,
        isFetchingAvatar: false,
        actor: action.actor,
        success: true,
        error: '',
      };
    case ACTORS.COVER.ADD.SUCCESS:
    case ACTORS.COVER.DELETE.SUCCESS:
      return {
        ...state,
        isFetchingCover: false,
        actor: action.actor,
        success: true,
        error: '',
      };
    case ACTORS.DELETE.SUCCESS:
      return {
        ...state,
        isFetching: false,
        actor: {},
        success: true,
        error: '',
      };
    case ACTORS.READ.FAILURE:
    case ACTORS.EDIT.FAILURE:
    case ACTORS.ADD.FAILURE:
    case ACTORS.DELETE.FAILURE:
    case ACTORS.FOLLOW.FAILURE:
    case ACTORS.UNFOLLOW.FAILURE:
    case ACTORS.BLOCK.FAILURE:
    case ACTORS.UNBLOCK.FAILURE:
      return {
        ...state,
        isFetching: false,
        success: false,
        error: action.error,
      };
    case ACTORS.AVATAR.ADD.FAILURE:
    case ACTORS.AVATAR.DELETE.FAILURE:
      return {
        ...state,
        isFetchingAvatar: false,
        success: false,
        error: action.error,
      };
    case ACTORS.COVER.ADD.FAILURE:
    case ACTORS.COVER.DELETE.FAILURE:
      return {
        ...state,
        isFetchingCover: false,
        success: false,
        error: action.error,
      };
    default:
      return state;
  }
}
