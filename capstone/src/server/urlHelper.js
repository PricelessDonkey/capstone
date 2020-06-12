const dotenv = require('dotenv');
dotenv.config();

// this returns the URL required to fetch from geonames
function getGeoNamesURL(city) {
    const username = 'sdrilias' // moving id out of .env file so reviewer can test
    const geoNameBaseURL = 'http://api.geonames.org/searchJSON?q='
    const geoNameUserName = '&fuzzy=0&maxRows=1&username=' + username
    const URL = geoNameBaseURL + city + geoNameUserName;

    return encodeURI(URL);
}

// this returns the URL required to fetch from Pixabay
function getPixabayURL(city) {
    const pixaBayKey = '16971575-9bb708fd0cce1b8ad1aee6f0a'; // moving key out of .env so reviewer can test
    const URL = 'https://pixabay.com/api/?key=' + pixaBayKey + '&q=' + city

    return encodeURI(URL);
}

// this returns the URL required to fetchfrom weatherbit
function getWeatherBitURL(latitude, longitude) {
    const weatherBitKey = '03020132c0c2474c90f8f10c44de0ffc' // moving key out of .env so reviewer can test
    const weatherBitBaseURL = 'http://api.weatherbit.io/v2.0/forecast/daily'
    const weatherBitParams = '?key=' + weatherBitKey + '&lat=' + latitude + '&lon=' + longitude + '&units=I'
    const URL = weatherBitBaseURL + weatherBitParams

    return encodeURI(URL)
}

exports.getGeoNamesURL = getGeoNamesURL;
exports.getPixabayURL = getPixabayURL;
exports.getWeatherBitURL = getWeatherBitURL;
