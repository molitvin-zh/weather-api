//import Forecast from '@models/Forecast.js';

import 'normalize.css';
import "@/styles/styles.scss";

import axios from 'axios';

window.searchForecast = () => {
  const input = document.querySelector('.search__input');
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    const params = {
      lat: `${place.geometry.location.lat()}`,
      lon: `${place.geometry.location.lng()}`,
      key: '5086cdd8745d497fa07f6786dafbbcdc'
    }
    createForecast(params);

  })
};

function createForecast(params) {
  axios.get('https://api.weatherbit.io/v2.0/forecast/daily', { params })
    .then(response => {
      //const forecast = new Forecast(response.data.data);
      //forecast.createForecastBlocks();
    }).catch(error => {
      console.error(error);
    });
}
