function getGeoNamesURL(city) {
    const geoNameBaseURL = 'http://api.geonames.org/searchJSON?q='
    const geoNameUserName = '&fuzzy=0&maxRows=1&username=sdrilias'
    const URL = geoNameBaseURL + city + geoNameUserName;

    return encodeURI(URL);
}

function getPixabayURL(city) {
    const pixaBayKey = '16971575-9bb708fd0cce1b8ad1aee6f0a';
    const URL = 'https://pixabay.com/api/?key=' + pixaBayKey + '&q=' + city

    return encodeURI(URL);
}

function getWeatherBitURL(latitude, longitude) {
    const weatherBitKey = '03020132c0c2474c90f8f10c44de0ffc';
    const weatherBitBaseURL = 'http://api.weatherbit.io/v2.0/forecast/daily'
    const weatherBitParams = '?key=' + weatherBitKey + '&lat=' + latitude + '&lon=' + longitude + '&units=I'
    const URL = weatherBitBaseURL + weatherBitParams

    return encodeURI(URL)
}

exports.getGeoNamesURL = getGeoNamesURL;
exports.getPixabayURL = getPixabayURL;
exports.getWeatherBitURL = getWeatherBitURL;
