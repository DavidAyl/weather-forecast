var apiKey = "9f0df682c222a2ec554b6d457b088d3d";

containerEl = document.querySelector('container')
containerEl.classList.add('row');

var API = 'dbadba3b6a415a81ba40263bf08007ee';
var openCallWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?';
var geoCodeWeatherUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=';

var header = document.createElement('header');
header.classList.add('col-12', 'display-1', 'text-center', 'py-5', 'bg-secondary', 'text-light');
containerEl.appendChild(header);
header.textContent = "Weather";

var asideEl = document.createElement('aside');
asideEl.classList.add('col-3', 'h5', 'py-5');
containerEl.appendChild(asideEl);

var mainEl = document.createElement('main');
mainEl.classList.add('col-8', 'margin-main');
containerEl.appendChild(mainEl);

var currentWeatherEl = document.createElement('div')
currentWeatherEl.classList.add('title', 'col-12','py-5', 'h2');
mainEl.appendChild(currentWeatherEl);


var fiveDayForecastEl = document.createElement('div');
fiveDayForecastEl.classList.add('col-12', 'h3');
fiveDayForecastEl.style.width = '8-rem;'
mainEl.appendChild(fiveDayForecastEl);


var searchEl = document.createElement('div');
searchEl.textContent = 'Search for a City:'
searchEl.classList.add('ms-4', 'mb-5')
asideEl.appendChild(searchEl);

var cityInput = document.createElement('input');
cityInput.classList.add('col-12', 'mb-3', 'py-2');
cityInput.placeholder = 'City'
searchEl.appendChild(cityInput);

var searchBtn = document.createElement('button');
searchBtn.textContent = 'Search';
searchBtn.classList.add('col-12','btn', 'btn-lg', 'btn-outline-secondary', 'px-5')
searchBtn.type = 'button'
searchEl.appendChild(searchBtn);

var SearchCities = cityInput.value

var searchHandler = function (event) {
    event.preventDefault()
};

if (SearchCities) {
    getUrlName(SearchCities);
    searchEl.textContent = '';
    cityInput.value = SearchCities;
} else {
    console.log('Please enter a valid city.');
}

var getUrlName = function (city) {
    var cityRequestUrl = geoCodeWeatherUrl + city + '&appid=' + API;

    fetch(cityRequestUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    weatherDisplay(data, city);
                });
            } else {
                console.log('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            console.log('Unable to find data for this city');
        });

    console.log(cityRequestUrl);
};
var lat = weatherData[0].lat
var lon = weatherData[0].lon

var coordinateRequestUrl = openCallWeatherUrl + 'lat=' + lat + '&lon=' + lon + '&appid=' + API + '&units=imperial';
var weatherDisplay = function (weatherData, searchTerm) {
    if (weatherData.length === 0) {
        mainEl.textContent = 'No data found';
        return;
    }



    fetch(coordinateRequestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var temp = document.createElement('div');
            temp.classList.add('test');
            currentWeatherEl.appendChild(temp);
            temp.textContent = 'Temp: ' + data.current.temp + 'F';
            var wind = document.createElement('div');
            wind.classList.add('test');
            currentWeatherEl.appendChild(wind);
            wind.textContent = 'Wind: ' + data.current.wind_speed + 'mph';
            var humidity = document.createElement('div');
            humidity.classList.add('test');
            currentWeatherEl.appendChild(humidity);
            humidity.textContent = 'Humidity: ' + data.current.humidity + '%';
            var uvi = document.createElement('div');
            uvi.classList.add('test');
            currentWeatherEl.appendChild(uvi);
            uvi.textContent = 'UV index: ' + data.current.uvi;
        }
        )
}