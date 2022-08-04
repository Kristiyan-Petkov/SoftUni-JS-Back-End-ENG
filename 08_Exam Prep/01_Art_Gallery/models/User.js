const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../config/env');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'Username already taken.'],
        required: [true, 'Username field is required.'],
        minLength: [4, 'Username must be at least 4 characters.'],
    },
    password: {
        type: String,
        required: [true, 'Password field is required.'],
        minLength: [3, 'Password must be at least 3 characters.'],
    },
    address: {
        type: String,
        required: [true, 'Address field is required.'],
        maxLength: [20, 'Address field max lenght is 20 characters'],
    },
    publications: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Publication'
        }
    ],
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