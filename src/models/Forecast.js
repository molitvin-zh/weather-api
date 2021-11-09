export default class Forecast {
  constructor(data) {
    this.data = data;
  }

  createForecast() {
    const forecastSection = document.querySelector('.forecast');
    forecastSection.innerHTML = '';

    Object.values(this.data).map((dayForecast, index) => {
      const date = new Date(dayForecast.datetime);

      const forecastBlockHtml = `
        <div class="forecast-block">
          <div class="forecast-block__content">
            <h3 class="forecast-block__date">
              ${this.getWeekDay(date)} ${date.getDate()}
            </h3>
            <div class="forecast-block__icon-container">
              <img class="forecast-block__icon">
            </div>
            <span class="forecast-block__temp">
              ${dayForecast.min_temp}°C - ${dayForecast.max_temp}°C
            </span>
          </div>
        </div>
      `;
      forecastSection.insertAdjacentHTML('beforeend', forecastBlockHtml);

      const forecastIcon = forecastSection.querySelectorAll('.forecast-block__icon')[index];
      forecastIcon.src = require(`../images/weather-icons/${dayForecast.weather.icon}.png`);

      const forecastBlock = forecastSection.querySelectorAll('.forecast-block')[index];

      forecastBlock.addEventListener('click', () => {
        this.addActiveContent(forecastBlock);
        this.createForecastCard(dayForecast, date);
      })

      if (index === 0) {
        this.addActiveContent(forecastBlock);
        this.createForecastCard(dayForecast, date);
      }
    });
  }

  addActiveContent(forecastBlock) {
    const allforecastContent = document.querySelectorAll('.forecast-block__content');

    allforecastContent.forEach(content => {
      content.classList.remove('forecast-block__content--active');
    })

    const forecastContent = forecastBlock.querySelector('.forecast-block__content');
    forecastContent.classList.add('forecast-block__content--active');
  }

  createForecastCard(forecast, date,) {
    const forecastCardSection = document.querySelector('.forecast-card');
    forecastCardSection.innerHTML = '';

    const forecastCardHtml = `
    <h3 class="forecast-card__date">${this.getWeekDay(date)} ${date.getDate()}</h3>
    <div class="forecast-card__icon-container">
      <img class="forecast-card__icon" src = '../images/weather-icons/${forecast.weather.icon}.png'>
      <span class="forecast-card__icon-decription">
        ${forecast.weather.description}
      </span>
    </div>
    <ul class="forecast-card__list">
      <li class="forecast-card__item">
        Temperature: ${forecast.min_temp}°C - ${forecast.max_temp}°C
      </li>
      <li class="forecast-card__item">
        Feels Like: ${forecast.app_min_temp}°C - ${forecast.app_max_temp}°C
      </li>
      <li class="forecast-card__item">
        Wind speed: ${forecast.wind_spd}m/s
      </li>
      <li class="forecast-card__item">
        Verbal wind direction: ${forecast.wind_cdir_full}
      </li>
      <li class="forecast-card__item">
        Probability of Precipitation: ${forecast.pop}%
      </li>
      <li class="forecast-card__item">
        Average pressure: ${forecast.pres}mb
      </li>
      <li class="forecast-card__item">
        Average relative humidity: ${forecast.rh}%
      </li>
    </ul>`
    forecastCardSection.insertAdjacentHTML('afterbegin', forecastCardHtml);

    const forecastIcon = document.querySelector('.forecast-card__icon');
    forecastIcon.src = require(`../images/weather-icons/${forecast.weather.icon}.png`);
  }


  getWeekDay(date) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
  }

}
