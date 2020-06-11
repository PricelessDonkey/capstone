import * as dateHelper from './dateHelper.js'

let today = '2020-06-11'
let depart = '2020-06-20'
let comeback = '2020-06-28'

today = new Date(today);
depart = new Date(depart);
comeback = new Date(comeback);

test('can calculate countdown', () => {
    expect(dateHelper.getCountdown(today, depart)).toBe(9)
});

test('can calculate trip length', () => {
    expect(dateHelper.getTripLength(depart, comeback)).toBe(8)
});

