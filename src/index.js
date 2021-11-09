import Forecast from '@models/Forecast.js';
import 'normalize.css';
import "@/styles/styles.scss";
import axios from 'axios';

const key = '5086cdd8745d497fa07f6786dafbbcdc';

window.searchForecast = () => {
  const input = document.querySelector('.search__input');
  input.value = "Kyiv, Ukraine";

  const autocomplete = new google.maps.places.Autocomplete(input);
  searchFromQuery(input);
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
    const lat = place.geometry.location.lat()
    const lon = place.geometry.location.lng()
    createForecast(lat, lon);
  })

  inputDeleteByClick(input);
};

function createForecast(lat, lon) {
  const params = { lat, lon, key }

  axios.get('https://api.weatherbit.io/v2.0/forecast/daily', { params })
    .then(response => {
      const forecast = new Forecast(response.data.data);
      forecast.createForecast();
    }).catch(error => {
      console.error(error);
    });
}

function searchFromQuery(input) {
  const service = new google.maps.places.PlacesService(input);
  service.findPlaceFromQuery({
    query: input.value,
    fields: ['geometry'],
  }, function (place) {
    const lat = place[0].geometry.location.lat()
    const lon = place[0].geometry.location.lng()
    createForecast(lat, lon)
  })
}

function inputDeleteByClick(input) {
  const inputDelete = document.querySelector('.search__input-delete');
  inputDelete.addEventListener('click', () => {
    input.value = '';
    input.select();
  })
}
