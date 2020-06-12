import 'regenerator-runtime/runtime.js' // for jest tests
import earth from '../media/earth.png'

async function handleSubmit(event) {
  event.preventDefault()

  let city = document.getElementById('city').value
  let depart = document.getElementById('depart').value
  let comeback = document.getElementById('return').value

  if (!Client.checkInput(city, depart, comeback)) {
      return;
  }

  let requestPayload = {
    city: city,
    depart: depart,
    comeback: comeback
  }

  postData('/submit', requestPayload)
    .then(function () {
      updateUI()
    })
    .catch(function (error) {
      alert(error)
    })
};

// post data
const postData = async (url = '', requestPayload = {}) => {

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestPayload),
  })
}

const updateUI = async () => {
  const response = await fetch('/all')
  try {
    const jsonResponse = await response.json();
   
    const city = jsonResponse.city
    const countdown = jsonResponse.countdown
    const country = jsonResponse.country
    const depart = jsonResponse.depart
    const high = jsonResponse.high
    const low = jsonResponse.low
    const tripLength = jsonResponse.tripLength

    let image = jsonResponse.image

    // use earth image if no image was returned by API
    if (!image) {
      image = earth;
    }
    
    // don't use plural if trip is a day away
    let dayUnit = 'days'
    if (countdown < 2) {
      dayUnit = 'day'
    }

    const tripInfo =
    `<section class="image">
      <img src=${image} alt="city image">
    </section>
    <section class="info">
      <div class="trip-info">
          <h2 id="trip-to">Ahh, (LENGTH OF TRIP) ${tripLength} days in ${city}. I hear ${country} is beautiful this time of year...</h2>
          <h2 id="leavin-on">Leavin' on ${depart}?</h2>
      </div>
      <h3 id="countdown">(COUNTDOWN) That's in ${countdown} ${dayUnit}!</h3>
      <h4 id="typical-weather">Typically the high's around ${high} degrees and the lows around ${low} degrees... nice!</h4>
    </section>`

    let tripHTML = document.querySelector(".trip");
    tripHTML.innerHTML = tripInfo;

  } catch (error) {
    console.log("error", error);
  }
}


/*
city: "Chicago"
countdown: 4
country: "United States"
high: 73.7
image: "https://pixabay.com/get/50e9d5404c56b108f5d0846096293177123edbe2564c704c7c2e73dc9444c15a_1280.jpg"
low: 58.4
tripLength: 3
*/

function testUI(event) {
  event.preventDefault();

  let tripHTML = document.querySelector(".trip");
  tripHTML.innerHTML = tripInfo;
}

export { handleSubmit }