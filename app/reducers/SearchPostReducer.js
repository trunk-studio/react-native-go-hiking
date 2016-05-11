import {
  RECEIVED_SEARCH_NEWS,
  RECEIVED_SEARCH_POST,
} from '../actions/SearchActions';

export function search(state = {}, action) {
  switch (action.type) {
    case RECEIVED_SEARCH_NEWS:
      return {
        ...state,
        newsList: action.data,
      };
    case RECEIVED_SEARCH_POST:
      return {
        ...state,
        postList: action.data,
      };
    default:
      return state;
  }
}
