import {
  RECEIVED_SEARCH_NEWS,
  RECEIVED_SEARCH_POST,
  RECEIVED_TYPE,
  RECEIVED_AREA,
} from '../actions/SearchActions';

export function search(state = { typeIndex: 0, areaIndex: 0 }, action) {
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
    case RECEIVED_TYPE:
      return {
        ...state,
        typeIndex: action.data,
      };
    case RECEIVED_AREA:
      return {
        ...state,
        areaIndex: action.data,
      };
    default:
      return state;
  }
}
