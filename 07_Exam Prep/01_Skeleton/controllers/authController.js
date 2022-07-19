const router = require('express').Router();
const authService = require('../services/authService');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { username, password, repeatPassword, address} = req.body;

    if (password !== repeatPassword) {
        return res.render('auth/register', {error: 'Both password field must match!'})
    }
    try {
        await authService.create({username, password, address}); 
        res.render('./home');
    } catch (err) {
        // add mongoose error mapper
        return res.render('auth/register', {error: 'DB error'});
    }
});

module.exports = router;