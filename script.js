const apiKey = '5eed30c0ca4b6a10726289d2d7f8a64e';

const form = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const currentWeatherContainer = document.querySelector('#current-weather');
const forecastContainer = document.querySelector('#forecast');
const searchHistory = document.querySelector('#search-history');
const searchHistoryArray = [];

async function getCoordinates(city) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;

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

async function getCurrentWeather(lat,lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  
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

async function getForecast(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
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
    const forecast = data.list.filter(item => item.dt_txt.includes('12:00:00')); 
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
 
  function getWeatherData(city, lat, lon) {
    Promise.all([getCurrentWeather(lat, lon), getForecast(lat, lon)])
      .then(data => {
        const [currentWeatherData, forecastData] = data;
        displayCurrentWeather(city, currentWeatherData);
        displayForecast(city, forecastData);
        if (!searchHistoryArray.includes(city)) {
          searchHistoryArray.push(city);
          const searchHistoryItem = document.createElement('div');
          searchHistoryItem.innerHTML = `<button type="button">${city}</button>`;
          searchHistoryItem.addEventListener('click', () => {
            getWeatherData(city);
          });
          searchHistory.appendChild(searchHistoryItem); 
        }
      });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // prevent form submission
    const city = searchInput.value.trim(); // get user input and remove leading/trailing spaces
    if (city) {
      const coordinateData = await getCoordinates(city); // pass city into getWeatherData function
      getWeatherData(city, coordinateData[0].lat, coordinateData[0].lon)
      searchInput.value = ''; // clear search input field
    }
  });

// Add event listener for searchButton or form
  // inside event listener function get value from user input and pass into getWeatherData