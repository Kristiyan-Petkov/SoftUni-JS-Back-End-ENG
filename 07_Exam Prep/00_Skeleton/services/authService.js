const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/env');

exports.create = (userData) => User.create(userData);

exports.login = async (username, password) => {
    //find user in db
    const user = await User.findOne({ username });

    //throw error if no such user exists
    if (!user) {
        throw { message: 'Cannot find username or password' };
    }

    //validate the password
    const isValid = bcrypt.compare(password, user.password);
    if (!isValid) {
        throw { message: 'Cannot find username or password' };
    }

    //return user to controller, which will call the tokenCreator
    return user;
};

exports.createToken = (user) => {
    const payload = { _id: user._id, username: user.username, address: user.address };
    const options = { expiresIn: '2d' };
    const tokenPromise = new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, options, (err, decodedToken) => {
            if (err) {
                return reject(err);
            }
            resolve(decodedToken);
        });
    });

    return tokenPromise;
};