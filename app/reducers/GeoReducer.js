import {
  RECEIVED_SET_LOCATION,
} from '../actions/GeoActions';

export function geo(state = {}, action) {
  switch (action.type) {
    case RECEIVED_SET_LOCATION:
      return {
        ...state,
        countryName: action.countryName,
        locationName: action.locationName,
        lon: action.lon,
        lat: action.lat,
      };
    default:
      return state;
  }
}
