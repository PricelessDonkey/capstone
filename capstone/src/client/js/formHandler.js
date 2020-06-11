import 'regenerator-runtime/runtime.js' // for jest tests

async function handleSubmit(event) {
  event.preventDefault()

  // add function to validate inputs
  // fields may not be empty, dates must be chronological, dates must be within the next 16 days
  let city = document.getElementById('city').value
  let depart = document.getElementById('depart').value
  let comeback = document.getElementById('return').value

  // if (!Client.checkForUrl(userEntry)) {
  //     alert('URL must start with http:// or https://')
  //     return;
  // }

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
    console.log(jsonResponse);
  } catch (error) {
    console.log("error", error);
  }
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

export { handleSubmit }