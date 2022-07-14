const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/User');
// const saltRounds = 11;
// const secret = Math.random().toString();
const {secret, saltRounds} = require('../constants');

exports.register = async ({ username, password, repeatPassword }) => {
    if (password !== repeatPassword) {
        return false;
    }
    let hashedPassword = await bcrypt.hash(password, saltRounds);

    let createdUser = User.create({ //no need to resolve the promise (await) here, as it's resolved in authController
        username,
        password: hashedPassword
    });

    return createdUser;
};

exports.login = async ({ username, password }) => {
    let user = await User.findOne({ username });

    if (!user) {
        // TO DO add message
        return false;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw {
            message: 'Invalid username or password'
        };
    }

    let result = new Promise((resolve, reject) => {
        jwt.sign({ _id: user._id, username: user.username }, secret, { expiresIn: '2d' }, (err, token) => {
            if (err) {
                return reject(err);
            }

            resolve(token);
        });
    })
    return result;
}