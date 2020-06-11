function setDateInfo(reqBody, tripInfo) {
    let depart = new Date(reqBody.depart)
    let comeback = new Date(reqBody.comeback)
    let today = new Date()

    tripInfo.countdown = getCountdown(today, depart)
    tripInfo.tripLength = getTripLength(depart, comeback)
}

function getCountdown(today, depart) {
    const ms = 24 * 60 * 60 * 1000;
    const msCountdown = depart.getTime() - today.getTime();
    const countdown = msCountdown / ms;

    return Math.round(countdown);
}

function getTripLength(depart, comeback) {
    const ms = 24 * 60 * 60 * 1000;
    const msLength = comeback.getTime() - depart.getTime();
    const tripLength = msLength / ms;

    return tripLength;
}

exports.setDateInfo = setDateInfo;
