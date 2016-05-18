export const RECEIVED_SET_LOCATION = 'RECEIVED_SET_LOCATION';

function receivedSetLocation(loc) {
  return {
    type: RECEIVED_SET_LOCATION,
    countryName: loc.countryName,
    locationName: loc.name,
    lon: loc.lon,
    lat: loc.lat,
  };
}

export async function requestSetLocation(position) {
  const searchApi = `http://maps.google.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&language=zh-TW&sensor=true`;
  const location = await fetch(searchApi).then(response => response.json());

  let locationName = '';
  let locationNameAlt = '';
  let country = '';
  for (const i in location.results[0].address_components) {
    if (location.results[0].address_components[i].types[0] === 'administrative_area_level_2') {
      locationName = location.results[0].address_components[i].long_name;
    }
    if (location.results[0].address_components[i].types[0] === 'administrative_area_level_1') {
      locationNameAlt = location.results[0].address_components[i].long_name;
    }
    if (location.results[0].address_components[i].types[0] === 'country') {
      country = location.results[0].address_components[i].short_name;
      break;
    }
  }
  if (locationName === '') locationName = locationNameAlt;

  return (dispatch) => {
    dispatch(receivedSetLocation({ name: locationName, countryName: country, lon: position.coords.longitude,
    lat: position.coords.latitude}));
  };
}
