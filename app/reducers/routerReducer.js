import {
  Actions,
} from 'react-native-router-flux';

export function router(state = {}, action) {
  switch (action.type) {
    case Actions.AFTER_FOCUS:
      return {
        ...state,
        nowTab: action.name,
      };
    case Actions.BEFORE_ROUTE:
      return state;
    case Actions.AFTER_ROUTE:
      return state;
    case Actions.AFTER_POP:
      return state;
    case Actions.BEFORE_POP:
      return state;
    case Actions.AFTER_DISMISS:
      return state;
    case Actions.BEFORE_DISMISS:
      return state;
    default:
      return state;
  }
}
