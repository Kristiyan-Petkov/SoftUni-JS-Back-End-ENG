const User = require('../models/User')

async function createUser(username, email, hashedPassword) {
    // ADAPT TO PROJECT REQUIREMENTS!
    const user = new User({
        username,
        email,
        hashedPass: hashedPassword,
    });

    await user.save();

    return user;
}

async function getUserByUsername(username) {
    const pattern = new RegExp(`^${username}$`, 'i');
    const user = await User.findOne({username: {$regex: pattern}});
    return user;
}

async function getUserByEmail(email) {
    const pattern = new RegExp(`^${email}$`, 'i');
    const user = await User.findOne({email: {$regex: pattern}});
    return user;
}

// TO DO -> Add functions to find a user by other properties specific to the project

module.exports = {
    createUser,
    getUserByUsername,
    getUserByEmail
}