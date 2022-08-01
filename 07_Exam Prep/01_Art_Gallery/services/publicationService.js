const Publication = require('../models/Publication');
const jwt = require('jsonwebtoken');
const {SECRET} = require('../config/env');
const { promisify } = require('util');
const jwtVerify = promisify(jwt.verify);

exports.createArt = (userData) => Publication.create(userData);

exports.getAll = async () => {
    let publications = await Publication
        .find()
        .lean()
    return publications;
};

exports.getOne = (publicationId) => Publication.findById(publicationId); 
exports.getOneDetailed = (publicationId) => Publication.findById(publicationId).populate('shared'); //populates it with the db relations from accessories array in the schema
exports.userData = async (token) => {
    if (token) {
        try {
            const decodedToken = await jwtVerify(token, SECRET);
            // req.user = decodedToken;
            // res.locals.user = decodedToken;
            return decodedToken;
        } catch (err) {
            return res.redirect('/404');
        }
    }
    return false
}

exports.edit = (publicationId, publicationData) => Publication.findByIdAndUpdate(publicationId, publicationData, {runValidators: true});
exports.delete = (publicationId) => Publication.findByIdAndDelete(publicationId);