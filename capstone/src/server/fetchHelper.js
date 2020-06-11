const urlHelper = require('./urlHelper')
const fetch = require('node-fetch');

let getPixabayData = async (city, tripInfo) => {
    let pixabayURL = urlHelper.getPixabayURL(city)
    let response = await fetch(pixabayURL)

    try {
        let data = await response.json()

        if (data.totalHits < 1) { 
            tripInfo.image = false
        } else {
            tripInfo.image = data.hits[0].largeImageURL; // get large image, make smaller with CSS
        }

    } catch (error) {
        console.log("error", error);
    }
}

let getWeatherBitData = async (latitude, longitude, tripInfo) => {
    let weatherBitURL = urlHelper.getWeatherBitURL(latitude, longitude)
    let response = await fetch(weatherBitURL)

    try {
        let data = await response.json()
        const weatherBitData = data.data[tripInfo.countdown];
        tripInfo.low = weatherBitData.low_temp;
        tripInfo.high = weatherBitData.max_temp;

    } catch (error) {
        console.log("error", error);
    }
}

exports.getPixabayData = getPixabayData;
exports.getWeatherBitData = getWeatherBitData;