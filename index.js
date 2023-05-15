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

const { readFile, readFileSync } = require('fs');
const txt = readFileSync('./hello.txt', 'utf8');
console.log(txt);
console.log('DO THIS ASAP 1'); //This is done after

readFile('./hello.txt', 'utf8', (err,txt) => {
    console.log(txt)
});
console.log('DO THIS ASAP 2'); //This is done before

const myModule = require('./my-module.js');
console.log(myModule);