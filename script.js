var apiKey = "9f0df682c222a2ec554b6d457b088d3d";

var cityInput = document.getElementById('cityInput')

var searchButton = document.getElementById('searchBtn')

var openCallWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?';
var geoCallUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput.value + "&appid=" + apiKey

var mainEL = document.querySelector('#mainShowing')

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
        mainEL.textContent = 'No data found';
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