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
const { valid } = require('joi');
const app = express();
app.use(express.json());
const { readFile } = require('fs').promises;

app.get('/home', async (request, response) => {

    response.send(await readFile('./home.html', 'utf8'));

});

app.post('/calculate', async (request, response) => {

    console.log(request.body);
    op = request.body.operator;
    a = request.body.a;
    b = request.body.b;
    valid_operation = false;
    calculation=-1;

    if (op === "add") {//checks for what request.body.operator is set to
        calculation = a + b;//performs the correct operation
        valid_operation = true;
    }
    else if (op === "subtract") {
        calculation = a - b;
        valid_operation = true;
    }
    else if (op === "multiply") {
        calculation = a * b;
        valid_operation = true;
    }
    else if (op === "divide") {
        calculation = a / b;
        valid_operation = true;
    }
    if (valid_operation) {
        response.json({
            result:calculation
        });
    }
    else {
        response.json({
            result:"Error: invalid operator."
        })
    }
});


app.listen(process.env.PORT || 3000, () => console.log(`App available on http://localhost:3000`))

