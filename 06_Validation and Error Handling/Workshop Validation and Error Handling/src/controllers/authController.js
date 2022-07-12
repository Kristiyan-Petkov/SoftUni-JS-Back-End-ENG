const router = require('express').Router();
const validator = require('validator');
const { isEmail } = require('../middlewares/validatorMiddleware');
const authService = require('../services/authService');
const { cookieSessionName } = require('../constants');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', isEmail, async (req, res) => {
    // if (!isEmail(req.body.username)) {
    //     res.status('404').send('Invalid email');
    // }
    let createdUser = await authService.register(req.body);
    if (createdUser) {
        res.redirect('/auth/login');
    } else {
        //TO DO add notification
        res.redirect('404');
    }
});

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    let token = await authService.login(req.body);
    if (!token) {
        return res.redirect('/404')
    }
    res.cookie(cookieSessionName, token, { httpOnly: true });

    res.redirect('/');

})

router.get('/logout', (req, res) => {
    res.clearCookie(cookieSessionName);
    res.redirect('/');
});

module.exports = router;