const API_KEY = 'https://api.openweathermap.org/data/2.5/weather?lat=%7Blat%7D&lon=%7Blon%7D&appid=%7BAPI';

const form = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const currentWeatherDiv = document.querySelector('#current-weather');
const forecastDiv = document.querySelector('#forecast');
const searchHistoryDiv = document.querySelector('#search-history')


let searchHistory = [];

form.addEventListener('submit', e => {
  e.preventDefault();

  const city = searchInput.value.trim();
  if (!city) {
    return;
  }

  searchHistory.unshift(city);
  if (searchHistory.length > 5) {
    searchHistory.pop();
  }
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  renderSearchHistory();

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
  .then(response => response.json())
  .then(data => {
    const { name, dt, weather, main, wind } = data;

    const card = document.createElement('div');
    card.classList.add('card');

    const iconCode = weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    const date = new Date(dt * 1000).toLocaleDateString();

    card.innerHTML = `
    <h2>${name}</h2>
    <div class="date">${date}</div>
    <img src="${iconUrl}" alt="${weather[0].description}">
    <div class="temperature">${Math.round(main.temp)}&deg;C</div>
    <div class="humidity">Humidity: ${main.humidity}%</div>
    <div class="wind-speed">Wind Speed: ${wind.speed} m/s</div>
  `;

  currentWeatherDiv.innerHTML = '';
  currentWeatherDiv.appendChild(card);
})
.catch(error => console.error(error));

// Get weather forecast
fetch