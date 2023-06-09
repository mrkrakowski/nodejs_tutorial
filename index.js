function doMath(a, b, operator) {
    let calculation = -1;
    let validOperation = false;
    if (operator === "add") {//checks for what request.body.operator is set to
        calculation = a + b;//performs the correct operation
        validOperation = true;
    }
    else if (operator === "subtract") {
        calculation = a - b;
        validOperation = true;
    }
    else if (operator === "multiply") {
        calculation = a * b;
        validOperation = true;
    }
    else if (operator === "divide") {
        calculation = a / b;
        validOperation = true;
    }
    return {
        calculation,
        validOperation
    };
}

const nasaAssetURL = 'https://api.nasa.gov/planetary/earth/assets';
const axios = require('axios');
async function getSatelliteImageInfo(request) {
    const result = await axios.get(nasaAssetURL, {
        params: {
            lon: request.body.lon,
            lat: request.body.lat,
            date: request.body.date,
            dim: request.body.dim,
            api_key: request.headers.api_key
        }
    });
    return result;
};

async function downloadImage(url) {
    return await axios.get(url, { responseType: 'stream' });
};

global.luckynum = '23';

console.log(global.luckynum);
console.log(process.platform);
console.log(process.env.USER);

const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();

eventEmitter.on('lunch', () => {
    console.log('yum')
})
eventEmitter.emit('lunch');
eventEmitter.emit('lunch');

//const { readFile, readFileSync } = require('fs');
//const txt = readFileSync('./hello.txt', 'utf8');
//console.log(txt);
//console.log('DO THIS ASAP 1'); //This is done after

//readFile('./hello.txt', 'utf8', (err,txt) => {
//    console.log(txt)
//});
//console.log('DO THIS ASAP 2'); //This is done before

const myModule = require('./my-module.js');
console.log(myModule); //Even this happens before the second reading of hello.txt

const express = require('express');
const app = express();
app.use(express.json());
const { readFile } = require('fs').promises;

app.get('/home', async (request, response) => {

    response.send(await readFile('./home.html', 'utf8'));

});

app.post('/calculate', async (request, response) => {

    console.log(request.body);
    const { a, b, operator } = request.body;
    const { calculation, validOperation } = doMath(a, b, operator);
    if (validOperation) {
        response.json({
            result: calculation
        });
    }
    else {
        response.json({
            result: "Error: invalid operator."
        })
    }
});

app.post('/nasaImageData', async (request, response) => {
    try {
        const res = await getSatelliteImageInfo(request);
        response.json(res.data);
    } catch (err) {
        response.status(err.response.status);
        response.json(err);
    }
});

app.post('/getImage', async (request, response) => {
    try {
        const res = await downloadImage(request.body.url);
        res.data.pipe(response);
    } catch (err) {
        console.log("something went wrong");
        response.status(err.response.status);
        response.json(err);
    }
});

app.post('/infoToImage', async (request, response) => {
    try {
        const imgData = await getSatelliteImageInfo(request);
        console.log(imgData.data.url);
        const res = await downloadImage(imgData.data.url);
        res.data.pipe(response);
    } catch (err) {
        console.log("something went wrong");
        response.status(err.response.status);
        response.json(err);
    }
});

app.listen(process.env.PORT || 3000, () => console.log(`App available on http://localhost:3000`))