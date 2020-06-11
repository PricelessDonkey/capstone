function checkInput(city, depart, comeback) {
    console.log(depart)
    console.log(comeback)

    if (city == '') {
        alert('Please enter a city')
        return false;
    }

    if (depart == '') {
        alert('Please enter a departure date')
        return false;
    }

    if (comeback == '') {
        alert('Please enter a return date')
        return false;
    }

    depart = new Date(depart);
    comeback = new Date(comeback);

    if (depart.getTime() < new Date().getTime()) {
        alert('Departure must be later than today')
        return false;
    }
    if (depart.getTime() > comeback.getTime()) {
        alert('Departure date must be prior to return date')
        return false;
    }
    if (getCountdown(new Date(depart)) > 15) {
        alert('Departure date must be within 16 days')
        return false;
    }

    return true;
}

function getToday() {
    let dateTime = new Date();
    let year = dateTime.getFullYear();
    let month = dateTime.getMonth() + 1;
    let day = dateTime.getDate();

    if (day < 10) day = '0' + day
    if (month < 10) month = '0' + month

    return new Date(`${month}/${day}/${year}`)
}

function getCountdown(depart) {
    let today = getToday()
    const ms = 24 * 60 * 60 * 1000;
    const msCountdown = depart.getTime() - today.getTime();
    const countdown = msCountdown / ms;

    return Math.round(countdown);
}
export { checkInput }
