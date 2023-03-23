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