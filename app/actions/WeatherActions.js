import config from '../config';
export const RECEIVED_WEATHER = 'RECEIVED_WEATHER';

function receivedWeather(w) {
  return {
    type: RECEIVED_WEATHER,
    weather: w.main,
    state: w.weather[0],
  };
}

export async function requestWeather(location) {
  const weatherApi = `http://api.openweathermap.org/data/2.5/weather?q=${location.name},${location.country}&appid=${config.weatherApiKey}&units=metric&lang=zh_tw`;
  const weather = await fetch(weatherApi).then(response => response.json());

  return (dispatch) => {
    dispatch(receivedWeather(weather));
  };
}
