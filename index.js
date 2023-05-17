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
            lon: '-93.19591',
            lat: '45.23574',
            date: '2021-06-01',
            dim: '0.02',
            api_key: 'NIyGQ2F4JMu4PsxISGrbTXursdobclmPJe40ycFh'
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

app.post('/nasaAPI', async (request, response) => {
    console.log("Entered info is discarded, take a look at my house instead:")
    console.log(request.query);
    try {
        const res = await getNASA(request);
        response.json(res.data);

    } catch (err) {
        console.log(err);
        response.json(err);
    }
});

//app.post('/nasaAPI', async (request, response) => {
//    console.log(request.body);
//    console.log(response.body);
//})


app.listen(process.env.PORT || 3000, () => console.log(`App available on http://localhost:3000`))

