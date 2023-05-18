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

const url2 = 'https://api.nasa.gov/planetary/earth/assets';
const axios = require('axios');
async function getNASA(request) {
    const result = await axios.get(url2, {
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
        const res = await getNASA(request);
        response.json(res.data);
    } catch (err) {
        response.json(err);
    }
});

app.post('/getImage', async (request, response) => {
    try {
        console.log(request.body.url);
        const res = await axios.get(request.body.url);
        response.send(Buffer.from(res.data, 'binary'));
        // response.writeHead(200, {//This didn't work
        //     'Content-Type': 'image',
        //     'Content-Length': res.data.length
        // });
        // response.end(Buffer.from(res.data, 'binary'));
    } catch (err) {
        console.log("something went wrong");
        response.json(err);
    }
});

app.listen(process.env.PORT || 3000, () => console.log(`App available on http://localhost:3000`))