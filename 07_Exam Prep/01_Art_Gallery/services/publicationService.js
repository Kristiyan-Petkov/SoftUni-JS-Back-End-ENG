const Publication = require('../models/Publication');

exports.createArt = (userData) => Publication.create(userData);

exports.getAll = async () => {
    let publications = await Publication
        .find()
        .lean()
    console.log(publications);
    return publications;
};