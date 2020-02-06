'use strict'

let request = require('request');
let key = "520fdbb424e94de453bb34e38ace43a8";
let city = 'Marseille';
let url = `http://api.weatherstack.com/current?access_key=${key}&query=${city}`;

console.log(url);
request(url, (err, res, body) => {if(!err) {
    let data = JSON.parse(body);
    console.log(data);}
});