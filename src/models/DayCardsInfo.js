export default class DayCardsInfo {
  constructor(data) {
    this.data = data;
    this.weekDay = new Set();
    this.dayNumber = new Set();
  }

  dayCards() {
    this.getDayCardsInfo();
    this.createDayCards();
    this.addDayCardsInfo()
  }

  addDayCardsInfo() {
    const dayCardSelectors = document.querySelectorAll('.day-card');
    const setWeekDayIter = this.weekDay.values();
    const setDayNumberIter = this.dayNumber.values();

    dayCardSelectors.forEach(dayCardSelector => {
      let weekDaySelector = dayCardSelector.querySelector('.day-card__week-day');
      let dateSelector = dayCardSelector.querySelector('.day-card__date');

      let weekDayValue = setWeekDayIter.next().value;
      let setDayValue = setDayNumberIter.next().value;
      weekDaySelector.textContent = weekDayValue;
      dateSelector.textContent = setDayValue;
    })
  }

  createDayCards() {
    const cardsCount = this.dayNumber.size;
    const dayCardSelectors = document.querySelectorAll('.day-card')
    const dayCardsLength = dayCardSelectors.length;

    if (dayCardsLength !== cardsCount) {
      const forecastDayCardsSelector = document.querySelector('.forecast__day-cards');
      forecastDayCardsSelector.innerHTML = '';
      for (let i = 0; i < cardsCount; i++) {
        let dayCardHtml = `<div class="forecast__day-container">
        <div class="day-card">
          <div class="day-card__left">
            <span class="day-card__week-day"></span>
            <span class="day-card__date"></span>
          </div>
          <div class="day-card__right">
            <img class="day-card__forecast-icon">
            <span class="day-card__temperature"></span>
          </div>
        </div>
      </div>`;
        forecastDayCardsSelector.insertAdjacentHTML('beforeend', dayCardHtml);
      }
      document.querySelectorAll('.day-card')[0].classList.add('day-card--active');
    }
  }

  getDayCardsInfo() {
    this.getDateInfo();
    //get min and max temperature
  }

  getDateInfo() {
    Object.values(this.data).map(forecast => {
      const date = this.getDateFromSrt(forecast.datetime);
      this.weekDay.add(this.getWeekDay(date));
      this.dayNumber.add(date.getDate());
    })
  }

  getDateFromSrt(dateStr) {
    const dateObj = {
      year: dateStr.slice(0, 4),
      month: dateStr.slice(5, 7) - 1,
      day: dateStr.slice(8, 10)
    }
    return new Date(dateObj.year, dateObj.month, dateObj.day);
  }

  getWeekDay(date) {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[date.getDay()];
  }
}
