
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
asideEl.classList.add('col-3', 'h5');
containerEl.appendChild(asideEl);

var mainEl = document.createElement('main');
mainEl.classList.add('col-8', 'row', 'flex-row');
containerEl.appendChild(mainEl);

var currentWeatherEl = document.createElement('div')
currentWeatherEl.classList.add('title', 'col-12', 'py-5', 'h2');
mainEl.appendChild(currentWeatherEl);


var fiveDayEl = document.createElement('div');
fiveDayEl.classList.add('col-12', 'h3');
fiveDayEl.style.width = '8-rem;'
mainEl.appendChild(fiveDayEl);


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
searchBtn.classList.add('col-12', 'btn', 'btn-lg', 'btn-outline-secondary', 'px-5')
searchBtn.type = 'button'
searchEl.appendChild(searchBtn);

var displayHistory = cityInput.value;


var city = localStorage.getItem('city')
if (city) {
    displayHistory = JSON.parse(city);

    for (let i = 0; i < displayHistory.length; i++) {
        (function(){ 
        var cityLocalEl = document.createElement('button');

        cityLocalEl.textContent = displayHistory[i];
        cityLocalEl.classList.add('col-11','list-group-item', 'ms-4');
        var cityList = displayHistory[i];
        asideEl.appendChild(cityLocalEl);
        
        cityLocalEl.addEventListener('click', function() {
            getCityInfoByName(cityLocalEl.innerText);
        })
    })();
    };
}

var searchHandler = function (event) {
    event.preventDefault()
    console.log('hello')
    var SearchCities = cityInput.value
    if (SearchCities) {
        getUrlName(SearchCities);
        cityInput.value = SearchCities;
        localStorage.setItem('city', JSON.stringify(displayHistory));
    } else {
      alert('uh oh')
    }
};


var getUrlName = function (city) {
    var cityRequestUrl = geoCodeWeatherUrl + city + '&appid=' + apiKey;
    console.log(city)
    fetch(cityRequestUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    weatherDisplay(data, city);
                });
            } else {
                
            }
        })
        .catch(function (error) {
            console.log('no data found');
        });

    
};



var weatherDisplay = function (weatherData, searchTerm) {
    if (weatherData.length === 0) {
        mainEl.textContent = 'No data found';
        return;
    }
    var lat = weatherData[0].lat
    var lon = weatherData[0].lon
    var coordinateRequestUrl = openCallWeatherUrl + 'lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';

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

                var dtUnixFormatting = moment.unix(data.daily[i].dt).format('MMMM Do, YYYY');
                var tempDay = data.daily[i].temp.day;
                var windSpeed = data.daily[i].wind_speed;
                var humidity = data.daily[i].humidity;
                var weatherIcon = data.daily[i].weather[0].icon;
                var weatherDescription = data.daily[i].weather[0].description
                var iconSource = 'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png'

                var card = document.createElement('div');
                card.classList.add('card-body', 'm-3')
                fiveDayEl.appendChild(card);

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

                var windEl = document.createElement('p');
                windEl.classList.add('card-text', 'lh-lg');
                card.appendChild(windEl);
                windEl.textContent = 'Wind: ' + windSpeed + ' mph';

                var humidEl = document.createElement('p');
                humidEl.classList.add('card-text', 'lh-lg');
                card.appendChild(humidEl);
                humidEl.textContent = 'Humidity: ' + humidity + '%';
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    return;
};

searchBtn.addEventListener('click', searchHandler);
