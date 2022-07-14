const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username must be your valid email'],
        unique: [true, 'This username already exists'],
        validate: /[a-zA-Z0-9]+/,
        minLength: 5,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [8, 'Your password should be at least 8 characters long'],
    }
})

// userSchema.virtual('repeatPassword').set(function (value) {
//     if (this.password !== value) {
//         throw new Error('Repeat password must match password');
//     }
// })

const User = mongoose.model('User', userSchema);

module.exports = User;