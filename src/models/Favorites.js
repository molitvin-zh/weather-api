import escape from 'lodash.escape';

export default class Favorites {
  constructor() {
    this.name;
    this.favoritesSelect = document.querySelector('.favorites__select');
    this.citySection = document.querySelector('.city');
    this.cityNameTitle;
    this.cityButton;
  }

  createCitySection(name, lat, lon) {
    this.name = name;
    this.addCitySection();
    this.addEventListener(lat, lon);
  }

  addCitySection() {
    this.citySection.innerHTML = '';

    this.cityNameTitle = document.createElement('h2');
    this.cityNameTitle.classList = 'city__name';
    this.cityNameTitle.textContent = this.name;
    this.citySection.append(this.cityNameTitle);

    this.cityButton = document.createElement('button');
    this.cityButton.classList = 'city__btn';
    this.citySection.append(this.cityButton);

    this.assignButtonContent();
  }

  assignButtonContent() {
    if (this.isFavorite(this.name)) {
      this.cityButton.textContent = 'remove';
    } else { this.cityButton.textContent = 'add'; }
  }

  isFavorite(city) {
    return this.getCity(city) !== undefined
  }

  getCity(cityName) {
    const favorites = this.getFavorites()
    return favorites.find(city => city.name === cityName)
  }

  addEventListener(lat, lon) {
    this.cityButton.addEventListener('click', () => {
      if (!this.isFavorite(this.name)) {
        this.addToFavorites(this.name, lat, lon);
      } else {
        this.removeFromFavorites(this.name);
      }
    });
  }

  addToFavorites(name, lat, lon) {
    const favorites = this.getFavorites();

    localStorage.setItem('favorites', JSON.stringify([
      ...favorites,
      { name, lat, lon }
    ]));

    this.createOption(name);
    this.assignButtonContent();
  }

  getFavorites() {
    const favorites = localStorage.getItem('favorites')
    return favorites ? JSON.parse(favorites) : []
  }

  createOption(cityName) {
    const option = document.createElement('option');
    option.classList = `favorites__option`;
    option.textContent = cityName;
    option.value = escape(cityName);
    this.favoritesSelect.append(option);
  }

  removeFromFavorites(name) {
    const favorites = this.getFavorites();

    localStorage.setItem('favorites', JSON.stringify([
      ...favorites.filter((favorite) => favorite.name !== name)
    ]));

    this.removeOption(name);
    this.assignButtonContent();
  }

  removeOption(cityName) {
    document.querySelector(`.favorites__option[value='${escape(cityName)}']`).remove();
  }

  createFavoritesSelect() {
    this.createOption('favorites');
    const favorites = this.getFavorites();

    favorites.map(favorite => {
      this.createOption(favorite.name);
    });
  }

  getCityLocation(cityName) {
    const city = this.getCity(cityName);
    return {
      lat: city.lat,
      lon: city.lon
    }
  }
}
