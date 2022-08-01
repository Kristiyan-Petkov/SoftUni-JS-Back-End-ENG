const Publication = require('../models/Publication');

exports.createArt = (userData) => Publication.create(userData);

exports.getAll = async () => {
    let publications = await Publication
        .find()
        .lean()
    return publications;
};

exports.getOne = (publicationId) => Publication.findById(publicationId); 
exports.getOneDetailed = (publicationId) => Publication.findById(publicationId).populate('shared'); //populates it with the db relations from accessories array in the schema