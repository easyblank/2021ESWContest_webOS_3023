// Tutorial by http://youtube.com/CodeExplained
// api key : 82005d27a116c2880c8f0fcb866998a0

// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");

// App data
const weather = {};

weather.temperature = {
    unit : "celsius"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "82005d27a116c2880c8f0fcb866998a0";

//--------------------현재 위치 설정에 관한 함수----------------------//

// CHECK IF BROWSER SUPPORTS GEOLOCATION
// if('geolocation' in navigator){
//     navigator.geolocation.getCurrentPosition(setPosition, showError);
// }else{
//     notificationElement.style.display = "block";
//     notificationElement.innerHTML = "<p>Browser doesn't Support Geolocation</p>";
// }

// SET USER'S POSITION
// function setPosition(position){
//     let latitude = position.coords.latitude;
//     let longitude = position.coords.longitude;

//     getWeather(latitude, longitude);
// }

//--------------라즈베리 파이에서 사용이 가능한지 몰라서 지워둠---------------//


// 여기서 위치 정하기! 현재 위치로 하고싶다면 위에 주석처리한 함수 참고
function setPosition(){
    let latitude = 37.5642135;
    let longitude = 127.0016985;

    getWeather(latitude, longitude);
}

setPosition();


// GET WEATHER FROM API PROVIDER
//나라, 도시 설정은 여기서!
function getWeather(latitude, longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}&lang=kr`; //language korean에 관한 내용은 api 참고

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name; //동이름
            weather.country = data.sys.country; //나라이름
        })
        .then(function(){
            displayWeather();
        });
}

// DISPLAY WEATHER TO UI
//나라, 도시 설정은 여기서!
function displayWeather(){
    iconElement.innerHTML = `<img src="./main-section/weather/icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`; //그냥 한글로 수정하든가
}

//--------클릭하면 섭씨에서 화씨로 바뀌는 함수. 근데 필요없겠지 뭐---------//
// C to F conversion
// function celsiusToFahrenheit(temperature){
//     return (temperature * 9/5) + 32;
// }

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
// tempElement.addEventListener("click", function(){
//     if(weather.temperature.value === undefined) return;

//     if(weather.temperature.unit == "celsius"){
//         let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
//         fahrenheit = Math.floor(fahrenheit);

//         tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
//         weather.temperature.unit = "fahrenheit";
//     }else{
//         tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
//         weather.temperature.unit = "celsius"
//     }
// });
//------------------------------------------------------------//
