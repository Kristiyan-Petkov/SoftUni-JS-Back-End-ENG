const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {TOKEN_SECRET, COOKIE_NAME} = require('../config/index');
const userService = require('../services/user');

module.exports = () => (req, res, next) => {
        if (parseToken(req, res)) {
            req.auth = {
                async register(username, email, password) {
                    const token = await register(username, email, password);
                    res.cookie(COOKIE_NAME, token);
                },
                async login(email, password) {
                    const token = await login1(email, password);
                    res.cookie(COOKIE_NAME, token);
                },
                logout() {
                    res.clearCookie(COOKIE_NAME);
                },
            }
    
            next();
        }
};

async function register(username, email, password) {

    // console.log('auth middleware', username);
    // console.log('auth middleware', email);
    // console.log('auth middleware', password);
    const existUsername = await userService.getUserByUsername(username);
    const existEmail = await userService.getUserByEmail(email);

    if (existUsername) {
        throw new Error('Username is taken!')
    } else if (existEmail){
        throw new Error('Email is taken!')
    }

    const hashedPassword = await bcrypt.hash(password, 11);
    const user = await userService.createUser(username, email, hashedPassword);
    
    return generateToken(user);
}

async function login1 (email, password) {
    console.log("login1 email:", email);
    const user = await userService.getUserByEmail(email);
    console.log("login1 user:", user);

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
        username: userData.username,
        email: userData.username
    }, TOKEN_SECRET)
}

function parseToken(req,res){
    const token = req.cookies[COOKIE_NAME];
    if (token) {
        try {
            const userData = jwt.verify(token, TOKEN_SECRET);
            req.user = userData;
            res.locals.user = userData;
        } catch (err) {
            res.clearCookie(COOKIE_NAME);
            res.redirect('/auth/login');
            return false;
        }
    }
    return true;
}