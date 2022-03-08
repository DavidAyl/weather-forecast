var apiKey = "9f0df682c222a2ec554b6d457b088d3d";

var cityInput = document.getElementById('cityInput')

var searchButton = document.getElementById('searchBtn')

var openCallWeatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?';
var geoCallUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput.value + "&appid=" + apiKey

var mainEL = document.querySelector('#mainShowing')

// var searchFunction = function() {
//     var cityInput = document.querySelector("#cityInput")
//     var fetchUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityInput.value + "&appid=" + apiKey
//     fetch(fetchUrl)
// }

var SearchCities = cityInput.value

var searchHandler = function (event) {
    event.preventDefault() };

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
    var weatherDisplay = function (weatherData, searchTerm) {
        if (weatherData.length === 0) {
            mainEL.textContent = 'No data found';
            return;
        }
    
        var lat = weatherData[0].lat
        var lon = weatherData[0].lon
    
        // fetch information by coordinates
        var coordinateRequestUrl = openCallWeatherUrl + 'lat=' + lat + '&lon=' + lon + '&appid=' + API + '&units=imperial';
        // console.log(coordinateRequestUrl);
    
        fetch(coordinateRequestUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
            return
            }
