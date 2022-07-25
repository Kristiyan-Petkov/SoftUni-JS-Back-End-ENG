const Publication = require('../models/Publication');

exports.createArt = (userData) => Publication.create(userData);