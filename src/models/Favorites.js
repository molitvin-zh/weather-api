export default class Favorites {
  constructor() {
    this.name;
    this.location;
    this.inLocalStorage;

    this.favoritesSelect = document.querySelector('.favorites__select');
    this.citySection = document.querySelector('.city');
    this.cityNameTitle;
    this.cityButton;
  }

  createFavoritesSelect() {
    this.createOption('favorites');
    this.addOptionsFromStorage();
  }

  createOption(cityName, datasetLocation) {
    const option = document.createElement('option');
    option.classList = `favorites__option favorites__option--${cityName.split(' ').join('')}`;
    option.textContent = cityName;
    if (datasetLocation) option.dataset.location = datasetLocation;
    this.favoritesSelect.append(option);
  }

  addOptionsFromStorage() {
    Object.entries(localStorage).map(([key, value]) => {
      this.createOption(key, value);
    });
  }

  addCitySection(name, location) {
    this.initializeValues(name, location);
    this.createCitySection();
    this.addValuesToCitySection();
    this.addEventListener();
  }

  initializeValues(name, location) {
    this.name = name;
    this.location = JSON.stringify(location);
    this.inLocalStorage = false;
  }

  createCitySection() {
    this.citySection.innerHTML = '';

    this.cityNameTitle = document.createElement('h2');
    this.cityNameTitle.classList = 'city__name';
    this.citySection.append(this.cityNameTitle);

    this.cityButton = document.createElement('button');
    this.cityButton.classList = 'city__btn';
    this.citySection.append(this.cityButton);
  }

  addValuesToCitySection() {
    this.cityNameTitle.textContent = this.name;

    Object.keys(localStorage).map(key => {
      if (key === this.name) {
        this.inLocalStorage = true;
      }
    })

    if (this.inLocalStorage) {
      this.cityButton.textContent = 'remove'
    } else {
      this.cityButton.textContent = 'add'
    }
  }

  addEventListener() {
    this.cityButton.addEventListener('click', () => {
      if (this.inLocalStorage) {
        this.handleRemoveOption();
      } else {
        this.handleAddOption();
      }
    });
  }

  handleAddOption() {
    this.createOption(this.name, this.location);
    this.cityButton.textContent = 'remove'
    localStorage.setItem(this.name, this.location)
    this.inLocalStorage = true;
  }

  handleRemoveOption() {
    document.querySelector(`.favorites__option--${this.name.split(' ').join('')}`).remove();
    localStorage.removeItem(this.name);
    this.cityButton.textContent = 'add';
    this.inLocalStorage = false;
  }
}
