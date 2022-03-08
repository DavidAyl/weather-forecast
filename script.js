
containerEl = document.querySelector('container')
containerEl.classList.add('row');
var apiKey = "9f0df682c222a2ec554b6d457b088d3d";

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
    var cityRequestUrl = geoCodeWeatherUrl + city + '&appid=' + apiKey;

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
        mainEl.textContent = 'No data found';
        return;
    }
    var coordinateRequestUrl = openCallWeatherUrl + 'lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';
    var lat = weatherData[0].lat
    var lon = weatherData[0].lon
    
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
            var uvIndex = document.createElement('div');
            uvIndex.classList.add('test');
            currentWeatherEl.appendChild(uvIndex);
            uvIndex.textContent = 'UV index: ' + data.current.uvi;
            for (let i = 0; i < 5; i++) {

                // date changed to momentum
                var dtUnixFormatting = moment.unix(data.daily[i].dt).format('MMMM Do, YYYY');
                var tempDay = data.daily[i].temp.day;
                var windSpeed = data.daily[i].wind_speed;
                var humidity = data.daily[i].humidity;
                var weatherIcon = data.daily[i].weather[0].icon;
                var weatherDescription = data.daily[i].weather[0].description
                var iconSource = 'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png'
                // console.log(data.daily[i].weather[0].icon)
                // console.log(iconSource);

                var card = document.createElement('div');
                card.classList.add('card-body', 'm-3')
                fiveDayForecastEl.appendChild(card);
                console.log(card)

                var dateEl = document.createElement('h5');
                dateEl.classList.add('card-text');
                card.appendChild(dateEl);
                dateEl.textContent = dtUnixFormatting;

                var iconEl = document.createElement('img');
                iconEl.src = iconSource;
                iconEl.alt = weatherDescription;
                iconEl.title = weatherDescription;
                iconEl.classList.add('d-block')
                card.appendChild(iconEl);


                var tempEl = document.createElement('p');
                tempEl.classList.add('card-text', 'lh-lg');
                card.appendChild(tempEl);
                tempEl.textContent = 'Temp: ' + tempDay;

                var windSpeedEl = document.createElement('p');
                windSpeedEl.classList.add('card-text', 'lh-lg');
                card.appendChild(windSpeedEl);
                windSpeedEl.textContent = 'Wind: '+ windSpeed + ' mph';

                var humidityEl = document.createElement('p');
                humidityEl.classList.add('card-text', 'lh-lg');
                card.appendChild(humidityEl);
                humidityEl.textContent = 'Humidity: ' + humidity + '%';
            }
        })
        .catch(function (err) {
            console.log(err);
        });
    return;
};
    
searchBtn.addEventListener('click', searchHandler);