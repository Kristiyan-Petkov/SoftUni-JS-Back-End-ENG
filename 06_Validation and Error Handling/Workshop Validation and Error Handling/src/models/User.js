const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username must be your valid email'],
    },
    password: {
        type: String,
        required: true,
    }
})

userSchema.virtual('repeatPassword').set(function (value) {
    if (this.password !== value) {
        throw new Error('Repeat password must match password');
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;