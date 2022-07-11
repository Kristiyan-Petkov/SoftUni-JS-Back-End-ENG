const jwt = require('jsonwebtoken');
const { cookieSessionName, secret } = require('../constants');
const { promisify } = require('util');

const jwtVerify = promisify(jwt.verify)

exports.auth = async (req, res, next) => {
    let token = req.cookies[cookieSessionName];

    if (token) {
        try {
            let decodedToken = await jwtVerify(token, secret);
            req.user = decodedToken;
            res.locals.user = decodedToken;
        } catch (err) {
            return res.redirect('/404');
        }

    }
    next();
}

exports.isAuth = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/');
    }

    next();
}