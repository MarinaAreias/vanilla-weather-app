let now = new Date();

let h2 = document.querySelector("h2");

let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];

h2.innerHTML = `${day} ${date}, ${year} ${hour}:${minutes}`;

//
// homework week 5
// api needs to be inside the form function
// make an api call to Openweather API
// once i get  the HTTP response, we display the city name and the temperature

function displayWeather(response) {
  console.log(response.data);

  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("h3").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round( response.data.wind.speed);
  document.querySelector("#weather").innerHTML = response.data.weather[0].main;
  document.querySelector("#icon").innerHTML = response.data.weather[0].icon;
  
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
);
}

// this function is to provide a cith by default when on load
//so the screen doesn`t show empty
function searchCity(city) {
  let apiKey = "0adaa91f644d84f9dd2a3896dae4fdb0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#city-submit").value;
  searchCity(city);
}

// the same axios because the api gives us the same strucuture
function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "0adaa91f644d84f9dd2a3896dae4fdb0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

searchCity("Rotterdam");

//
//week 5 homework
// add a button with current location

let button = document.querySelector("#location");
button.addEventListener("click", getCurrentPosition);
