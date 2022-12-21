const router = require('express').Router();
const {body, validationResult} = require('express-validator');
const {isUser, isGuest} = require('../middlewares/guards');

router.get('/register', isGuest(), (req, res) => {
    res.render('user/register');
});

router.post(
    '/register',
    isGuest(), 
    //CAN DO SIMPLE CHECK WITH IFs and regex
    body('email', 'invalid email').isEmail(),
    body('username').isLength({min:3}).withMessage('Username must be at least 3 characters long'), //TO DO change length according to requirements
    body('rePassword').custom((value, {req}) => {
        if (value != req.body.password){
            throw new Error('Passwords don\'t match')
        }
        return true;
    }),
    async (req, res) => {
    // console.log(req.body);
    const {errors} = validationResult(req);
    try {
        if (errors.length > 0){
            const errorMessage = errors.map(e => e.msg).join('\n')
            throw new Error(errorMessage);
        }
        console.log('deba');
        await req.auth.register(req.body.username, req.body.email, req.body.password);
        // console.log(errors);
        res.redirect('/'); //TO DO adapt redirect location
    } catch (err){
        console.log(err);
        const ctx = {
            errors: err.message.split('\n'),
            userData:{
                username: req.body.username,
                email: req.body.email
            }
        }
        console.log(`${ctx.errors} - ${ctx.userData.username}`);
        res.render('user/register',ctx);
    }
    
    
});

router.get('/login', isGuest(), (req, res) => {
    res.render('user/login');
});

router.post('/login', isGuest(), async (req, res) => {
    try {
        await req.auth.login(req.body.username, req.body.password);
        res.redirect('/'); //TO DO adapt redirect location
    } catch (err) {
        console.log(err);
        const ctx = {
            errors: [err.message],
            userData:{
                username: req.body.username,
            }
        }
        res.render('user/login', ctx);
    }
});

//Route guard not obligatory here:
router.get('/logout', async (req, res) => {
    await req.auth.logout();
    res.redirect('/');
})

module.exports = router;