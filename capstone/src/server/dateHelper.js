function setDateInfo(reqBody, tripInfo) {
    let depart = reqBody.depart;
    let comeback = reqBody.comeback;

    depart = depart.replace(/-/, '/').replace(/-/, '/')
    comeback =comeback.replace(/-/, '/').replace(/-/, '/')
        
    depart= new Date(depart)
    comeback = new Date(comeback)

    let today = new Date()
    console.log(today);

    tripInfo.countdown = getCountdown(today, depart)
    tripInfo.tripLength = getTripLength(depart, comeback)
    tripInfo.depart = depart.toDateString();
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
