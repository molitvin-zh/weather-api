import { API_URL, API_KEY } from '@models/constants.js';
import Forecast from '@models/Forecast.js';
import 'normalize.css';
import "@/styles/styles.scss";
import axios from 'axios';

class App {
  constructor() {
    this.elements = {
      input: document.querySelector('.search__input'),
      forecastCard: document.querySelector('.forecast-card'),
      clearButton: document.querySelector('.search__input-delete'),
      favoritesSelect: document.querySelector('.favorites__select')
    };

    this.forecast = new Forecast();

    this.autocomplete = new google.maps.places.Autocomplete(this.elements.input);

    this.searchUserGeolocation();
    this.addListeners();
  }

  searchUserGeolocation() {
    navigator.geolocation.getCurrentPosition(
      place => {
        this.successSearch(place);
      }, () => {
        this.createForecast({ city: 'Kyiv' })
      });
  }

  successSearch(place) {
    const location = {
      lat: place.coords.latitude + 0.06,
      lon: place.coords.longitude + 0.03
    }

    this.createForecast(location);
  }


  addListeners() {
    this.autocomplete.addListener("place_changed", () => {
      this.handlePlaceChange();
    })

    this.elements.clearButton.addEventListener('click', () => {
      this.handleClearSearch();
    })
  }

  handlePlaceChange() {
    const place = this.autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    const location = {
      lat: place.geometry.location.lat(),
      lon: place.geometry.location.lng()
    }

    this.createForecast(location);
  }

  createForecast(location) {
    axios.get(API_URL, { params: { ...location, key: API_KEY } })
      .then(response => {
        this.forecast.createForecast(response.data.data, response.data.city_name);
        console.log(response.data);
      }).catch(error => {
        console.error(error);
      });
  }


  handleClearSearch() {
    this.elements.input.value = '';
    this.elements.input.focus();
  }
}

window.searchForecast = () => {
  new App();
}


