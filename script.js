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

  function renderCurrentWeather(data) {
    const { name, dt, weather, main, wind } = data;
    const date = new Date(dt * 1000).toLocaleDateString();
    const icon = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
    const temperature = `${Math.round(main.temp)}°C`;
    const humidity = `${main.humidity}%`;
    const windSpeed = `${Math.round(wind.speed)} m/s`;
  
    currentWeather.innerHTML = `
      <h2>${name} - ${date}</h2>
      <img src="${icon}" alt="${weather[0].description}">
      <p>Temperature: ${temperature}</p>
      <p>Humidity: ${humidity}</p>
      <p>Wind Speed: ${windSpeed}</p>
    `;
  }