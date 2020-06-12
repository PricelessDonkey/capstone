// sets date info in the tripInfo object
function setDateInfo(reqBody, tripInfo) {
    let depart = reqBody.depart;
    let comeback = reqBody.comeback;

    depart = depart.replace(/-/, '/').replace(/-/, '/')
    comeback =comeback.replace(/-/, '/').replace(/-/, '/')
        
    depart= new Date(depart)
    comeback = new Date(comeback)

    let today = getToday();

    tripInfo.countdown = getCountdown(today, depart)
    tripInfo.tripLength = getTripLength(depart, comeback)
    tripInfo.depart = depart.toDateString();
}

// gets todays date 
function getToday() {
    let dateTime = new Date();
    let year = dateTime.getFullYear();
    let month = dateTime.getMonth() + 1;
    let day = dateTime.getDate();

    if (day < 10) day = '0' + day
    if (month < 10) month = '0' + month


    return new Date(`${month}/${day}/${year}`)
}

// gets the countdown
function getCountdown(today, depart) {
    const ms = 24 * 60 * 60 * 1000;
    const msCountdown = depart.getTime() - today.getTime();
    const countdown = msCountdown / ms;

    return Math.round(countdown);
}

// calculates the trip length
function getTripLength(depart, comeback) {
    const ms = 24 * 60 * 60 * 1000;
    const msLength = comeback.getTime() - depart.getTime();
    const tripLength = msLength / ms;

    return tripLength;
}

exports.setDateInfo = setDateInfo;
exports.getCountdown = getCountdown;
exports.getTripLength = getTripLength;
