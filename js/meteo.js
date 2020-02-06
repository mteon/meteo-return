'use strict'

let request = require('request');
let fs = require('fs');
let url_parser = require('url');
let http = require('http');
let mustache = require('mustache');

let server = http.createServer((req, res) => {
    let key = '520fdbb424e94de453bb34e38ace43a8';
    let city = process.argv[2];
    let urlp = url_parser.parse(req.url, true);
    let cityq=  process.argv[2];

    if (urlp.query.city !== undefined) {
        cityq = urlp.query['city'];
    }

    if (cityq.length > 0) {
        city = cityq;
    }

    let url = `http://api.weatherstack.com/current?access_key=${key}&query=${city}`;

    console.log(url);
    let template = fs.readFileSync('index.html').toString();

    request(url, (err, _, body) => {
        if (!err) {
            let data = JSON.parse(body);
            let toChange = {
                img : data.current.weather_icons,
                city2 : data.location.name,
                temp : data.current.temperature,
                windSpeed : data.current.wind_speed,
                weatherDescriptions : data.current.weather_descriptions
            };

            let render = mustache.render(template, toChange);
            res.writeHead(200, {'content-type': 'text/html'});
            res.end(render);
        }
        else console.log(err);
    });
});
server.listen(3000);

