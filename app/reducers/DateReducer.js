import {
  RECEIVED_TODAY,
} from '../actions/DateActions';

export function getToday(state = {}, action) {
  let weekdayStr;
  switch (action.type) {
    case RECEIVED_TODAY:
      switch (action.weekday) {
        case 1:
          weekdayStr = '一';
          break;
        case 2:
          weekdayStr = '二';
          break;
        case 3:
          weekdayStr = '三';
          break;
        case 4:
          weekdayStr = '四';
          break;
        case 5:
          weekdayStr = '五';
          break;
        case 6:
          weekdayStr = '六';
          break;
        default:
          weekdayStr = '日';
      }
      return {
        ...state,
        month: action.month,
        date: action.date,
        weekday: weekdayStr,
      };
    default:
      return state;
  }
}
