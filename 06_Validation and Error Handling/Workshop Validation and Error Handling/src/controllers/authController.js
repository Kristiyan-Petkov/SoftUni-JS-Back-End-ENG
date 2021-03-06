const router = require('express').Router();
// const validator = require('validator');
const { isEmail } = require('../middlewares/validatorMiddleware');
const authService = require('../services/authService');
const { cookieSessionName } = require('../constants');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', isEmail, async (req, res) => {

    let createdUser = await authService.register(req.body);
    if (createdUser) {
        res.redirect('/auth/login');
    } else {
        let error = {message: 'Password and repeat password must be the same'}
        res.status(400).render('auth/register', {error: error.message});
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    try {
        let token = await authService.login(req.body);
        if (!token) {
            return res.redirect('/404')
        }
        res.cookie(cookieSessionName, token, { httpOnly: true });
        res.redirect('/');
    } catch (error) {
        res.status(400).render('auth/login', {error: error.message});
    }
})

router.get('/logout', (req, res) => {
    res.clearCookie(cookieSessionName);
    res.redirect('/');
});

module.exports = router;