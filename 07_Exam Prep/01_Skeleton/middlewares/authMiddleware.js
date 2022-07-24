const jwt = require('jsonwebtoken');
const {COOKIE_SESSION_NAME} = require('../constants');
const {SECRET} = require('../config/env');

exports.auth = (req, res, next) => {
    const token = req.cookies[COOKIE_SESSION_NAME];
    //does the user have a token / is he logged in
    if (token) {
        jwt.verify(token, SECRET, ((err, decodedToken) => {
            if (err){
                res.clearCookie(COOKIE_SESSION_NAME);
                return next(err);
            }
            req.user = decodedToken;
            res.locals.user = decodedToken;
            next();
        }));
    } else {
        next();
    }
};

exports.isAuth = (req, res, next) => {
    
}