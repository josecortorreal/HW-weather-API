const API_KEY = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';

const form = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const currentWeatherDiv = document.querySelector('#current-weather');
const forecastDiv = document.querySelector('#forecast-weather');
const searchHistoryDiv = document.querySelector('#search-history')

async function fetchWeatherData(city) {
    try {
      const response = await fetch(`${baseUrl}weather?q=${city}&units=metric&appid=${apiKey}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
