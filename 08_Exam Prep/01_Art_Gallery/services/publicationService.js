const Publication = require('../models/Publication');
const path = require('path');
const jwt = require('jsonwebtoken');
const {SECRET} = require('../config/env');
const { promisify } = require('util');
const jwtVerify = promisify(jwt.verify);

exports.createArt = (artData) => Publication.create(artData);

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

// exports.edit = (publicationId, publicationData) => Publication.findByIdAndUpdate(publicationId, publicationData, {context: 'query', runValidators: true});
// MAYBE BETTER => exports.edit = (publicationId, publicationData) => Publication.updateOne({_id: publicationId}, {$set: publicationData}, {runValidators: true})
exports.edit = async function (publicationId, publicationData) {
    try {
    const modifiedPublication = await Publication.findByIdAndUpdate(publicationId, publicationData);
    // , {runValidators: true, context: 'query'}
    return modifiedPublication
    } catch (err) {
        console.log(err);
    }
};

exports.delete = (publicationId) => Publication.findByIdAndDelete(publicationId);

exports.getAllSharedByUser = async (userId) => {
    let publications = await Publication
        .find({
            $expr: {
              $in: [userId, "$shared"]
            }
          })
        .lean();
    let sharedByUser = publications.map(a => a.title).join(', ');
    return sharedByUser;
};