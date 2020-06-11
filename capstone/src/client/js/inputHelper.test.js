import {checkInput} from './inputHelper'


let city = ''
let depart = '2020-06-20'
let comeback = '2020-06-28'
test('city cannot be blank', () => {
    expect(checkInput(city, depart, comeback)).toBe(false);
});

city = 'Chicago'
depart = ''
comeback = '2020-06-28'
test('depart cannot be blank', () => {
    expect(checkInput(city, depart, comeback)).toBe(false);
});

comeback = ''
test('return cannot be blank', () => {
    expect(checkInput(city, depart, comeback)).toBe(false);
});
