import { API_URL, API_KEY } from '@models/constants.js';
import Forecast from '@models/Forecast.js';
import Favorites from '@models/Favorites.js';
import 'normalize.css';
import "@/styles/styles.scss";
import axios from 'axios';

class App {
  constructor() {
    this.elements = {
      input: document.querySelector('.search__input'),
      clearButton: document.querySelector('.search__input-delete'),
      favoritesSelect: document.querySelector('.favorites__select')
    };

    this.forecast = new Forecast();
    this.favorites = new Favorites();
    this.autocomplete = new google.maps.places.Autocomplete(this.elements.input);

    this.favorites.createFavoritesSelect();
    this.searchUserGeolocation();
    this.addListeners();
  }

  searchUserGeolocation() {
    navigator.geolocation.getCurrentPosition(
      place => {
        this.successSearch(place);
      }, () => {
        this.buildPageByQuery({ city: 'Kiev' })
      });
  }

  successSearch(place) {
    const location = {
      lat: place.coords.latitude + 0.06,
      lon: place.coords.longitude + 0.03
    }

    this.buildPageByQuery(location);
  }


  addListeners() {
    this.autocomplete.addListener("place_changed", () => {
      this.handlePlaceChange();
    })

    this.elements.clearButton.addEventListener('click', () => {
      this.handleClearSearch();
    })

    this.elements.favoritesSelect.addEventListener('change', (e) => {
      const select = e.target;
      const option = select.options[select.selectedIndex];
      const location = JSON.parse(option.dataset.location);

      if (select.value !== 'favorites') this.buildPageByQuery(location);
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

    this.buildPageByQuery(location);
  }

  buildPageByQuery(params) {
    axios.get(API_URL, { params: { ...params, key: API_KEY } })
      .then(response => {
        const data = {
          forecast: response.data.data,
          location: {
            lat: response.data.lat,
            lon: response.data.lon
          },
          name: response.data.city_name
        }

        this.forecast.createForecast(data.forecast);
        this.favorites.addCitySection(data.name, data.location);
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


