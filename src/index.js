import { API_URL, API_KEY } from '@models/constants.js';
import Forecast from '@models/Forecast.js';
import Favorites from '@models/Favorites.js';
import 'normalize.css';
import "@/styles/styles.scss";
import axios from 'axios';
import unescape from 'lodash.unescape';

class App {
  constructor() {
    this.elements = {
      input: document.querySelector('.search__input'),
      clearButton: document.querySelector('.search__input-delete'),
      favoritesSelect: document.querySelector('.favorites__select')
    };

    this.forecast = new Forecast();
    this.favorites = new Favorites();

    this.geocoder = new google.maps.Geocoder();
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
        this.buildPageByQuery({ city: 'Kyiv' })
      });
  }

  successSearch(place) {
    const location = {
      lat: place.coords.latitude,
      lon: place.coords.longitude
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
      const city = unescape(e.target.value);

      if (city !== 'favorites') {
        const location = this.favorites.getCityLocation(city);

        if (location) {
          this.buildPageByQuery(location);
        }
      }
    })
  }

  handlePlaceChange() {
    const place = this.autocomplete.getPlace();

    if (!place.geometry || !place.geometry.location) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }

    const name = place.name;

    const location = {
      lat: place.geometry.location.lat(),
      lon: place.geometry.location.lng()
    }

    this.buildPageByQuery(location);
  }

  handleClearSearch() {
    this.elements.input.value = '';
    this.elements.input.focus();
  }

  buildPageByQuery(params) {
    axios.get(API_URL, { params: { ...params, key: API_KEY } })
      .then(response => {
        const data = {
          forecast: response.data.data,

          lat: response.data.lat,
          lon: response.data.lon

        }

        this.forecast.createForecast(data.forecast);

        this.getCityName(data.lat, data.lon)
          .then(name => this.favorites.createCitySection(name, data.lat, data.lon))

      }).catch(error => {
        console.error(error);
      });
  }

  async getCityName(lat, lon) {
    let city = '';
    const latlng = await new google.maps.LatLng(lat, lon);

    await this.geocoder.geocode({ 'latLng': latlng }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        const result = results[0];

        for (let i = 0, len = result.address_components.length; i < len; i++) {
          const ac = result.address_components[i];
          if (ac.types.indexOf("locality") >= 0) city = ac.long_name;
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });

    if (city != '') return city;
  }
}

window.searchForecast = () => {
  new App();
}


