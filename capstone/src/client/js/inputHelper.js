function checkInput(city, depart, comeback) {

    // city cannot be blank
    if (city == '') {
        alert('Please enter a city')
        return false;
    }

    // departure date cannot be blank
    if (depart == '') {
        alert('Please enter a departure date')
        return false;
    }

    // comeback date cannot be blank
    if (comeback == '') {
        alert('Please enter a return date')
        return false;
    }

    // create date objects for comparison purposes
    depart = new Date(depart);
    comeback = new Date(comeback);

    // departure must be later than today
    if (depart.getTime() < new Date().getTime()) {
        alert('Departure must be later than today')
        return false;
    }

    // departure must be prior to return
    if (depart.getTime() > comeback.getTime()) {
        alert('Departure date must be prior to return date')
        return false;
    }

    // departure must be within 16 days
    if (getCountdown(new Date(depart)) > 15) {
        alert('Departure date must be within 16 days')
        return false;
    }

    return true;
}

// returns today's date
function getToday() {
    let dateTime = new Date();
    let year = dateTime.getFullYear();
    let month = dateTime.getMonth() + 1;
    let day = dateTime.getDate();

    if (day < 10) day = '0' + day
    if (month < 10) month = '0' + month

    return new Date(`${month}/${day}/${year}`)
}

// gets the countdown until the departure date
function getCountdown(depart) {
    let today = getToday()
    const ms = 24 * 60 * 60 * 1000;
    const msCountdown = depart.getTime() - today.getTime();
    const countdown = msCountdown / ms;

    return Math.round(countdown);
}
export { checkInput }
