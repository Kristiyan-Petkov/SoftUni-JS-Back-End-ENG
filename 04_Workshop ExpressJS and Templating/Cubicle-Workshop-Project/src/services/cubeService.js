const fs = require('fs/promises');
const path = require('path');
const cubes = require('../views/db.json');


exports.save = (cube) => {
    cubes.push(JSON.parse(JSON.stringify(cube)));
    let textData = JSON.stringify(cubes, '', 4);
    return fs.writeFile('./src/views/db.json', textData)
}