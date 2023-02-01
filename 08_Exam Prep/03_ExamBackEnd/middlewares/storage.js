const toy = require('../services/toy')

module.exports = () => (req, res, next) => {
    req.storage = {
        ...toy
    };

    next();
};