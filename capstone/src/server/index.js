const dotenv = require('dotenv');
const fetch = require('node-fetch');
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

app.post('/submit', processLocation);

function processLocation(req, res) {

    let newData = req.body;

    // fetch weatherbit data
    // fetch pixabay data
    const pixaBayKey = '16971575-9bb708fd0cce1b8ad1aee6f0a';
    const weatherBitKey = '03020132c0c2474c90f8f10c44de0ffc';

    const pixaBayURL = 'https://pixabay.com/api/?key=' + pixaBayKey + '&q=' + newData.city

    fetch(encodeURI(pixaBayURL))
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });

    const weatherBitURL = 'http://api.weatherbit.io/v2.0/forecast/daily' + '?key=' + weatherBitKey + '&lat=' + newData.latitude + '&lon=' + newData.longitude

    fetch(encodeURI(weatherBitURL))
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });

    let newEntry = {
        latitude: newData.latitude,
        longitude: newData.longitude,
        country: newData.country,
        city: newData.city,
        depart: newData.depart,
        comeback: newData.comeback
    }

    projectData.push(newEntry)

    res.send(201)
}

app.get('/all', sendData);
function sendData(request, response) {
    response.send(projectData);
}

module.exports = {
    app: app,
}