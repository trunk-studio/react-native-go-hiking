import {
  RECEIVED_WEATHER,
} from '../actions/WeatherActions';

export function weather(state = {}, action) {
  switch (action.type) {
    case RECEIVED_WEATHER:
      return {
        ...state,
        temp: action.weather.temp,
        desc: action.state.description,
        iconId: action.state.icon,
      };
    default:
      return state;
  }
}
