const fs = require('fs/promises');
const path = require('path');
const cubes = require('../views/db.json');

exports.getAll = (search = '', fromInput, toInput) => {
    const from = Number (fromInput) || 0;
    const to = Number (toInput) || 6;

    const result = cubes
        .filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
        .filter(x => x.difficultyLevel >= from && x.difficultyLevel <= to);
    
    return result;
};

exports.getOne = (cubeId) => cubes[cubeId];

exports.save = (cube) => {
    cubes.push({id: cubes[cubes.length - 1].id + 1, ...JSON.parse(JSON.stringify(cube))});
    let textData = JSON.stringify(cubes, '', 4);
    return fs.writeFile('./src/views/db.json', textData)
}