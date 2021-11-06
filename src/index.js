import "@/styles/styles.scss";

import DateInfo from "@/models/DateInfo.js";
console.log(DataInfo);

import Logo from "@/images/logo.png";
document.querySelector('.header__logo-icon').src = Logo;

window.initMap = async function () {
  let input = document.querySelector('.search__input');
  let autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener("place_changed", () => {
    let place = autocomplete.getPlace();
    if (place.place_id) {
      let params = {
        lat: `${place.geometry.viewport.Ab.g.toFixed(1)}`,
        lon: `${place.geometry.viewport.Ra.g.toFixed(1)}`
      }

      createWeather(params);
    }
  })
};

function createWeather(params) {
  const axios = require("axios").default;

  var options = {
    method: 'GET',
    url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly',
    params: params,
    headers: {
      'x-rapidapi-host': 'weatherbit-v1-mashape.p.rapidapi.com',
      'x-rapidapi-key': '7f3d1797d2msh496db73039ad91dp11d32fjsn9b8bfaeda3f7'
    }
  };

  axios.request(options).then(function (response) {
    const data = response.data.data;

    const dateInfo = new DateInfo(data);
    dateInfo.addDateInfo();
    console.log(data);

  }).catch(function (error) {
    console.error(error);
  });
}


