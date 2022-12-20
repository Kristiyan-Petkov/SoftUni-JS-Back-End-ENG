const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {TOKEN_SECRET, COOKIE_NAME} = require('../config/index');
const userService = require('../services/user');

module.exports = () => (req, res, next) => {
        if (parseToken(req, res)) {
            req.auth = {
                async register(username, password) {
                    const token = await register(username, password);
                    res.cookie(COOKIE_NAME, token);
                },
                async login(username, password) {
                    const token = await login1(username, password);
                    res.cookie(COOKIE_NAME, token);
                },
                logout() {
                    res.clearCookie(COOKIE_NAME);
                },
            }
    
            next();
        }
};

async function register(username, password) {
    //TO DO adapt parameters to project requirements
    //TO DO extra validations on project level
    const existing = await userService.getUserByUsername(username);

    if (existing) {
        throw new Error('Username is taken!')
    }

    const hashedPassword = await bcrypt.hash(password, 11);
    const user = await userService.createUser(username, hashedPassword);

    return generateToken(user);
}

async function login1 (username, password) {
    const user = await userService.getUserByUsername(username);

    if (!user){
        throw new Error('No such user');
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPass);
    if (!hasMatch) {
        throw new Error('Incorrect password');
    }

   return generateToken(user);
}

function generateToken(userData){
    return jwt.sign({
        _id: userData._id,
        username: userData.username
    }, TOKEN_SECRET)
}

function parseToken(req,res){
    const token = req.cookies[COOKIE_NAME];
    try {
        const userData = jwt.verify(token, TOKEN_SECRET);
        req.user = userData;

        return true;

    } catch (err) {
        res.clearCookie(COOKIE_NAME);
        res.redirect('/auth/login');
        return false;
    }
    
}