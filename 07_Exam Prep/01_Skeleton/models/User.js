const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/env');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        //add uniqueness check and error message
    },
    password: {
        type: String,
    },
    address: {
        type: String,
    }
})

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, SALT_ROUNDS)
        .then(hashedPassword => {
            this.password = hashedPassword;
            next();
        })
})

const User = mongoose.model('User', userSchema);

module.exports = User;