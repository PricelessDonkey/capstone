import 'regenerator-runtime/runtime.js' // for jest tests

function handleSubmit(event) {
  event.preventDefault()

  // add function to validate inputs
  // fields may not be empty, dates must be chronological
  let city = document.getElementById('city').value
  let depart = document.getElementById('depart').value
  let comeback = document.getElementById('return').value

  // if (!Client.checkForUrl(userEntry)) {
  //     alert('URL must start with http:// or https://')
  //     return;
  // }

  // let requestPayload = {
  //   city: city,
  //   depart: depart,
  //   comeback: comeback
  // }

  const geoNameBaseURL = 'http://api.geonames.org/searchJSON?q='
  const geoNameUserName = '&fuzzy=0&maxRows=1&username=sdrilias'
  const URL = geoNameBaseURL + city + geoNameUserName;
  console.log(URL);
  let encodedURL = encodeURI(URL);

  fetch(encodedURL)
    .then(response => response.json())
    .then(data => {
      // latitude, longitude, country
      let latitude = data.geonames[0].lat
      let longitude = data.geonames[0].lng
      let country = data.geonames[0].countryName

      // save to server
      let requestPayload = {
        latitude: latitude,
        longitude:longitude,
        country: country,
        city: city,
        depart: depart,
        comeback: comeback
      }

      postData('/submit', requestPayload)
        .then(() => updateUI())
        .catch(function (error) {
          alert(error)
        })
    });
};

// post data
const postData = async (url = '', requestPayload = {}) => {

  fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestPayload),
  })
}

const updateUI = async () => {
  fetch('/all')
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
}

// `<section class="image">
// <img src={placeholder} alt="placeholder" width="360" height="240">
// </section>
function testUI(event) {
  event.preventDefault();

  const tripInfo =
    `<section class="info">
      <div class="trip-info">
          <h2 id="trip-to">Ahh, 10 days in Mozambique...</h2>
          <h2 id="leavin-on">Leavin' on July 4th, 2020?</h2>
      </div>
      <h3 id="countdown">That's in 32 days!</h3>
      <h4 id="typical-weather">Typically the high's around 85 degrees and the lows around 74 degrees... nice!</h4>
  </section>`

  let tripHTML = document.querySelector(".trip");
  tripHTML.innerHTML = tripInfo;
}

function makePercent(decimal) {
  let percent = decimal * 100
  return percent.toFixed(2) + '%'
}

export { handleSubmit, makePercent, testUI }