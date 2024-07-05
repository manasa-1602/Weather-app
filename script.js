const api = {
  key: '6c0246ac5788cf520a3942dc77de2adb',
  base: 'https://api.openweathermap.org/data/2.5/'
};

const searchBox = document.querySelector('.search-box');
const searchButton = document.querySelector('.button');
const searchContainer = document.querySelector('.search-container');
const main = document.querySelector('main');

searchBox.addEventListener('keypress', setQuery);
searchButton.addEventListener('click', handleSearch);

function setQuery(evt) {
  if (evt.keyCode === 13 || evt.key === 'Enter') {
    handleSearch();
  }
}

function handleSearch() {
  searchContainer.classList.add('up');
  main.style.display = 'flex';
  getResults(searchBox.value);
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      if (!weather.ok) {
        throw new Error('Network response was not ok');
      }
      return weather.json();
    })
    .then(displayResults)
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert("Please enter a correct city name");
    });
}

function displayResults(weather) {
  let city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}°C`;

  let description = document.querySelector('.current .weather');
  description.innerText = weather.weather[0].main;

  let date = document.querySelector('.location .date');
  date.innerText = dateBuilder(new Date());
}

function dateBuilder(d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}
