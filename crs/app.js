
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


// homework week 5
// api needs to be inside the form function
// make an api call to Openweather API
// once i get  the HTTP response, we display the city name and the temperature

//to be able to get formated hours from api that is inside the displayForecast function

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hour}:${minutes}`;
}

function displayWeather(response) {

  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round( response.data.wind.speed);
  document.querySelector("#weather").innerHTML = response.data.weather[0].main;
  document.querySelector("#icon").innerHTML = response.data.weather[0].icon;

  celsiusTemperature = response.data.main.temp;
  
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  
}

// the same axios because the api gives us the same strucuture
function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "0adaa91f644d84f9dd2a3896dae4fdb0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
  
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//week 5 homework
// add a button with current location

let button = document.querySelector("#location");
button.addEventListener("click", getCurrentPosition );

//this will call the Forecast
//could add forecast.main.temp_min to forecast temp

function displayForecast(response) {
 console.log(response.data);
   
  let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = null;

   //for loop

   for (let index = 0; index < 4; index ++){

    let forecast = response.data.list[index];

     forecastElement.innerHTML += `<div class="col-3">
          <div class="card" style="width: 5rem; height: 7rem; margin: 0 0 10px">
            <div
              class="card-body"
              style="text-align: center; color: black; font-size: 15px;">
              <h4><strong>
              ${formatHours(forecast.dt *1000)}</strong>
              </h4>
               <img 
               src= "http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" 
            />
                <div class= "weather-forecast-temp">
                 ${Math.round(forecast.main.temp_max)}°C
                 
              </div>
            </div>
          </div>
        </div>`;
        

   }
      
}

// this function is to provide a city by default when on load
//so the screen doesn`t show empty
function searchCity(city) {
  let apiKey = "0adaa91f644d84f9dd2a3896dae4fdb0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  //this will call the api for forecast
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#city-submit").value;
  searchCity(city);
}

//

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// search , city by default

searchCity("Rotterdam");


// adding the fahrenheit link
function displayFahrenheitTemp (event) {
  event.preventDefault();
  //inside a fucntion is a local variable
  // remove active class from Celsius link. so when F clicked C becomes blue
  celsiusLink.classList.remove("active");
  //add active class to Fahrenheit. so when F clicked F becomes white
  fahrenheitLink.classList.add("active");

   let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

 //celsius link fucntion

 function displaycelsiusTemp (event){
   event.preventDefault();

   // add active class to C. so when C gets clicked C becomes white
   celsiusLink.classList.add("active");
//  when C gets clicked F becomes blue
   fahrenheitLink.classList.remove("active");

   let temperatureElement = document.querySelector("#temperature");
  
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

 }

let celsiusTemperature = null;

// adding the fahrenheit link
let fahrenheitLink = document.querySelector ("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp)

// adding the Celsius link
let celsiusLink = document.querySelector ("#celsius-link");
celsiusLink.addEventListener("click", displaycelsiusTemp);