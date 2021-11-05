import "@/styles/styles.scss";

import Logo from "@/images/logo.png";
document.querySelector('.header__logo-icon').src = Logo;
/*
var script = document.createElement('script');
script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCWt-oX6XfeWXSXMS2dCj5_tmbmOf6-D9A&callback=initMap';
script.async = true;
*/

// Attach your callback function to the `window` object
window.initMap = function () {
  let input = document.querySelector('.search__input');
  let autocomlete = new google.maps.places.Autocomplete(input);
};

// Append the 'script' element to 'head'
//document.body.appendChild(script);

/*
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: "AIzaSyCWt-oX6XfeWXSXMS2dCj5_tmbmOf6-D9A",
});

loader
  .load()
  .then((google) => {
    console.log(google);
    let autocomlete = new google.maps.places;
    console.log(autocomlete);
    //new google.maps.Map(document.getElementById("map"), mapOptions);
  })
  .catch(e => {
    // do something
  });
*/