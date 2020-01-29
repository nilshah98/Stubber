const fs = require('fs')
const Chance = require('chance')
var chance = new Chance();

const dataset = {farmers: []}
const generateFarmer = () => ({name: chance.name(),age: chance.age(),latitude: chance.latitude(),longitude: chance.longitude()})

for(let i=0; i<100; i++){
    dataset.farmers.push(generateFarmer())
}

let data = JSON.stringify(dataset);
fs.writeFileSync('db.json', data);