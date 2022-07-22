const User = require('../models/User');
const bcrypt = require('bcrypt');

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
}