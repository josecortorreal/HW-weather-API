const API_KEY = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';

const form = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const currentWeatherDiv = document.querySelector('#current-weather');
const forecastDiv = document.querySelector('#forecast-weather');
const searchHistoryDiv = document.querySelector('#search-history')

async function getCurrentWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('City not found');
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function getForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('City not found');
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }
  function displayCurrentWeather(city, data) {
    const date = new Date(data.dt * 1000);
    const iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const html = `
      <h2>${city}</h2>
      <p>${date.toLocaleDateString()}</p>
      <img src="${iconUrl}" alt="${data.weather[0].description}">
      <p>Temperature: ${data.main.temp} &deg;C</p>
      <p>Humidity: ${data.main.humidity} %</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    currentWeatherContainer.innerHTML = html;
  }
  function displayForecast(city, data) {
    const forecast = data.list.filter(item => item.dt_txt.includes('12:00:00')); // Filter the forecast to get only noon forecasts for the next 5 days
    let html = `<h2>5-Day Forecast for ${city}</h2><div class="forecast-container">`;
    forecast.forEach(item => {
      const date = new Date(item.dt * 1000);
      const iconUrl = `https://openweathermap.org/img/w/${item.weather[0].icon}.png`;
      html += `
        <div class="forecast-item">
          <p>${date.toLocaleDateString()}</p>
          <img src="${iconUrl}" alt="${item.weather[0].description}">
          <p>Temperature: ${item.main.temp} &deg;C</p>
          <p>Humidity: ${item.main.humidity} %</p>
          <p>Wind Speed: ${item.wind.speed} m/s</p>
        </div>
      `;
    });
    html += '</div>';
    forecastContainer.innerHTML = html;
  }
  
  if (!searchHistoryArray.includes(city)) {
    searchHistoryArray.push(city);
    const searchHistoryItem = document.createElement("div");
    searchHistoryItem.innerHTML = `<button type="button">${city}</button>`;
    searchHistoryItem.addEventListener("click", () => {
      getWeatherData(city);
    });
    searchHistory.appendChild(searchHistoryItem);
  }
} catch (error) {
  console.log(error);
  alert("Error fetching weather data. Please try again.");
}
}
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = searchInput.value.trim();
    if (city) {
      getWeatherData(city);
      searchInput.value = "";
    } else {
      alert("Please enter a city name.");
    }
  });