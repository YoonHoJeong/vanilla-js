const weather = document.querySelector(".js-weather");
const weatherIcon = document.querySelector(".js-weatherIcon");

const API_KEY = "13c82007bd89667c12b00053e140777a";
const COORDS = "coords";
const WEATHER_ICON_URL = "http://openweathermap.org/img/wn/";

function getWeather(latitude, longitude) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const weatherIconKey = json.weather[0].icon;
      weatherIcon.src = `${WEATHER_ICON_URL}${weatherIconKey}.png`;
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${place}, ${Math.round(temperature)}°`;
    });
  //   then: 데이터가 완전히 넘어온 다음 호출.
}

function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    //   key value 값이 같을 때,
    // latitude: latitude,
    // longitude: longitude
    latitude,
    longitude
  };

  saveCoords(coordsObj);
  getWeather(latitude, longitude);
}

function handleGeoError() {
  console.log("can't access geo location");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords == null) {
    askForCoords();
  } else {
    // get weather
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
