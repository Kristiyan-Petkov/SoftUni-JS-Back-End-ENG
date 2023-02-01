const Toy = require('../models/Toy')

async function createToy(toyData){
    const toy = new Toy(toyData);
    await toy.save();

    return toy;
};

async function getAllToys(){
    const toys = await Toy.find({});

    return toys;
};

async function getToyById(id){
    const toy = await Toy.findById(id);

    return toy;
};

module.exports = {
    createToy,
    getAllToys,
    getToyById
}