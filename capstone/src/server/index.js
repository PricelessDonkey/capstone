const fetch = require('node-fetch');
const fetchHelper = require('./fetchHelper')
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
let tripInfo = new Object();

app.post('/submit', async (req, res) => {
    tripInfo = new Object(); // create fresh instance of tripInfo object
    let reqBody = req.body;
    let city = reqBody.city;
    let geoNamesURL = urlHelper.getGeoNamesURL(city)

    dateHelper.setDateInfo(reqBody, tripInfo) // set departure date, countdown, and length of trip in tripInfo object

    let response = await fetch(geoNamesURL)
    try {
        let data = await response.json()
        let latitude = data.geonames[0].lat
        let longitude = data.geonames[0].lng
        let country = data.geonames[0].countryName

        tripInfo.country = country
        tripInfo.city = city

        await fetchHelper.getPixabayData(city, tripInfo)
        await fetchHelper.getWeatherBitData(latitude, longitude, tripInfo)

    } catch (error) {
        console.log("error", error);
        res.sendStatus(500);
    }

    res.sendStatus(201);
});

app.get('/all', (req, res) => {
    res.send(tripInfo);
})

module.exports = {
    app: app,
}