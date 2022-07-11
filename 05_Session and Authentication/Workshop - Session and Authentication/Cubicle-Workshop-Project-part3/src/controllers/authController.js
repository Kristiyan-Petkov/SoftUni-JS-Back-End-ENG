const router = require('express').Router();
const authService = require('../services/authService');

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
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
    let result = await authService.login(req.body);
    if (!result) {
        return res.redirect('/404')
    }
    res.redirect('/');

})

module.exports = router;