export default class DateInfo {
  constructor(data) {
    this.data = data;
    this.weekDay = new Set();
    this.dayNumber = new Set();
  }

  /*

  addDateInfo() {
    Object.values(this.data).map(forecast => {
      const dateObj = {
        year: forecast.datetime.slice(0, 4),
        month: forecast.datetime.slice(5, 7) - 1,
        day: forecast.datetime.slice(8, 10)
      };
      const date = new Date(dateObj.year, dateObj.month, dateObj.day);
      const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      this.weekDay.add(days[date.getDay()]);
      this.dayNumber.add(date.getDate());
    })

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
  */

  addDateInfo() {
    this.getDateInfo();
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

  getDateInfo() {
    Object.values(this.data).map(forecast => {
      const date = this.getDate(forecast.datetime);
      this.weekDay.add(this.getWeekDay(date));
      this.dayNumber.add(date.getDate());
    })
  }

  getDate(dateStr) {
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