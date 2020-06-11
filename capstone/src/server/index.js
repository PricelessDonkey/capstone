const fetch = require('node-fetch');
const urlHelper = require('./urlHelper')
const dateHelper = require('./dateHelper')
const dotenv = require('dotenv');
dotenv.config();

const bodyParser = require('body-parser');
const express = require("express");
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use dist
app.use(express.static('dist'))

app.get('/', function (req, res) {
    if (process.env.NODE_ENV == 'prod')
        res.sendFile('dist/index.html')
    if (process.env.NODE_ENV == 'dev')
        res.sendFile(path.resolve('src/client/views/index.html'))
})

// Setup empty JS object to act as endpoint for all routes
let projectData = [];

app.post('/submit', async (req, res) => {
    let tripInfo = new Object(); // store response data in here
    let reqBody = req.body;
    let city = reqBody.city;
    let geoNamesURL = urlHelper.getGeoNamesURL(city)

    dateHelper.setDateInfo(reqBody, tripInfo)

    let response = await fetch(geoNamesURL)
    try {
        let data = await response.json()
        let latitude = data.geonames[0].lat
        let longitude = data.geonames[0].lng
        let country = data.geonames[0].countryName

        tripInfo.country = country
        tripInfo.city = city

        await getPixabayData(city, tripInfo)
        await getWeatherBitData(latitude, longitude, tripInfo)

    } catch (error) {
        console.log("error", error);
        res.sendStatus(500);
    }

    projectData.push(tripInfo);
    res.sendStatus(201);
});

let getPixabayData = async (city, tripInfo) => {
    let pixabayURL = urlHelper.getPixabayURL(city)
    let response = await fetch(pixabayURL)

    try {
        let data = await response.json()

        if (data.totalHits < 1) {
            tripInfo.image = false
        } else {
            tripInfo.image = data.hits[0].largeImageURL;
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

app.get('/all', (req, res) => {
    res.send(projectData);
})

module.exports = {
    app: app,
}