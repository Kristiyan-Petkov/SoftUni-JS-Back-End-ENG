#tasks

## Initial setup
1. Initialize project
    npm init -y
    -> in package.json 
        "scripts": {
        "start": "nodemon index js"
        },
2. Install initial dependencies /nodemon (dev dependency), express, express-handlebars, bcrypt, jsonwebtoken/
    npm i -D nodemon
    npm i express express-handlebars bcrypt jsonwebtoken mongoose
    npm start
3. add resources to views folder (html/hbs)
4. add resources to public folder (css)
5. create config folder and create env.js
    exports.PORT = 3000;

6. express config in index.js
    //server's up (+body parser and static path):
    const express = require('express');
    const cookieParser = require('cookie-parser');
    const { PORT } = require('./config/env');

    const app = express();
    app.use(express.urlencoded({extended: false})); //body parser
    app.use(express.static('public')); //setting up the static path
    app.use(cookieParser);
    app.use(routes);
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
7. Configure express handlebars and view engine
    const hbs = require('express-handlebars');
    app.engine('hbs', hbs.engine({
    extname: 'hbs'
    }))
    app.set('view engine', 'hbs');
8. Setup layouts in views (handlebars uses them)
9. Add Router
    * create routes.js on top level where all expected routes would be and controllers will be assigned
        app.use(routes);
    * add router in index js app setup
        const router = require('./routes');
10. Add home controller with it's own router
    * in homeController.js
        const router = require('express').Router();

        router.get('/', (req, res) => {
        res.render('home');
        });

        module.exports = router;
    * in routes: 
        const homeContoller = require('./controllers/homeController');
        router.use(homeContoller);
11. Fix static assets paths (views and css)
12. Add home view/template (hbs)

## Authentication setup
13. Add authController
    * create authController.js
        const router = require('express').Router();

        router.get('/login', (req, res) => {
        res.render('auth/login');
        });

        module.exports = router;
    * add authController to routes.js
        const authContoller = require('./controllers/authController');
        router.use('/auth',authContoller);
    * fix the nav menu link to login (and all other nav links)
        <li><a href="/auth/logout">Logout</a></li>
        <!-- Guest users -->
        <li><a href="/auth/login">Login</a></li>
        <li><a href="/auth/register">Register</a></li>

14. Add login page login.hbs
    * only leave <main> & make sure all internal paths work fine
    * add login get path to authController.js
            router.get('/login', (req, res) => {
            res.render('auth/login');
            });
15. Add register page
    * only leave <main> & make sure all internal paths work fine
    * add register get path to authController.js
        router.get('/register', (req, res) => {
        res.render('auth/register');
        });
    * modify form by removing action and adding POST method
    * define the names of all input fields in the register form -> username, password, repreatPassword, address) 
    * create its posting path in authController.js
        router.post('/register', (req, res) => {
        console.log(req.body);
        res.render('auth/login');
        });
    * fix link to "Already have an account?"
        <p>Already have an account?<a href="login"> Sign in</p>
    ### Database setup
        16. npm i mongoose
        17. configure mongoose
        * in env.js add the DB
            exports.DB_QUERYSTRING = 'mongodb://localhost:27017/artGallery';
        * create in config a new file db.js
            const mongoose = require('mongoose');
            const { DB_QUERYSTRING } = require('./env');
            exports.dbInit = () => {
                mongoose.connection.on('open', () => console.log('DB is connected')); //event listener
                return mongoose.connect(DB_QUERYSTRING); //connect to DB
            }
            
        * require it in index.js and set it up
            const { dbInit } = require('./config/db');
            dbInit()
                .then(app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
                .catch(err => console.log(`Cannot connect to DB, please try again\n${err}`));

18. create basic user model + hashing in the model
            * create salt in env.js
                exports.SALT_ROUNDS = 10;
            * create models > User.js:
                const mongoose = require('mongoose');
                const userSchema = new mongoose.Schema({
                username: {
                    type: String,

                },
                password: {
                    type: String,
                }
                })

                const User = mongoose.model('User', userSchema);

                module.exports = User;

19. create service > authService.js which will handle the DB interactions
    * in therminal
        npm i bcrypt jsonwebtoken
    * then
    const User = require('../models/User');
    exports.create = (userData) => User.create(userData);
20. Get register post action to work + to create new user in the DB + alert if password is incorrect
    * import authService.js to the authController.js
        const authService = require('../services/authService');
    * create new user with hashed password in authController (the hashing will be done in the service)
        router.post('/register', async (req, res) => {
        const { username, password, repeatPassword } = req.body;

        if (password !== repeatPassword) {
            return res.render('auth/register', {error: 'Both password field must match!'})
        }
        try {
            await authService.create({username, password}); 
            res.render('auth/login');
        } catch (err) {
            // add mongoose error mapper
            return res.render('auth/register', {error: 'DB error'});
        }
        });
21. notifications
    * add notification element to layout
     {{#if error}}
        <div class="error-box">
            <p>{{error}}</p>
        </div>
        {{/if}}
22. Login page
    * login action in authController
        router.post('/login', async (req, res) => {
        const { username, password } = req.body;
        
        const user = await authService.login( username, password);
        });
    * service method to add in authService
        const bcrypt = require('bcrypt');
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
23. Generate jwt token
    * in env.js add the secret
        exports.SECRET = 'shbcqjhcBISYUY67667T6BJBBHBUjjjqqndznx';
    * in authController at POST for login call a new createToken method:
        const token = await authService.createToken(user);
    * in authService:
        const jwt = require('jsonwebtoken');
        const { SECRET } = require('../config/env');
        exports.createToken = (user) => {
            const payload = { _id: user._id, username: user.username, address: user.address };
            const options = { expiresIn: '2d' };
            const tokenPromise = new Promise((resolve, reject) => {
                jwt.sign(payload, SECRET, options, (err, decodedToken) => { 
                if (err) {
                    return reject(err);
                }
                resolve(decodedToken);});
            });

            return tokenPromise;
        };
    * add token to cookie
        - TERMINAL: npm i cookie-parser
        - create constants.js and add the cookie session name
            export const COOKIE_SESSION_NAME = 'user-session';
        - in authController.js:
            - import the cookie session name
                const { COOKIE_SESSION_NAME } = require('../constants');
            - in POST login -> set the cookie and redirect back home:
                res.cookie(COOKIE_SESSION_NAME, token, { httpOnly: true });
                res.redirect('/');
24. Registered goes straight to Home already logged in (in authController.js register POST)
        try {
        const createdUser = await authService.create({ username, password, address });
        const token = await authService.createToken(createdUser);
        res.cookie(COOKIE_SESSION_NAME, token, { httpOnly: true });
        res.redirect('/');
25. fix login page rendering -> add names to the entry fields as DB expects them
26. LOGOUT - in authController.js
        router.get('/logout', (req, res) =>{
        res.clearCookie(COOKIE_SESSION_NAME);
        res.redirect('/');
        })

27. navigation if logged in or not
    * create middlewares > authMiddleware.js
        const jwt = require('jsonwebtoken');
        const {COOKIE_SESSION_NAME} = require('../constants');
        const {SECRET} = require('../config/env');

        exports.auth = (req, res, next) => {
            const token = req.cookies[COOKIE_SESSION_NAME];
            //does the user have a token / is he logged in
            if (token) {
                jwt.verify(token, SECRET, ((err, decodedToken) => {
                    if (err){
                        res.clearCookie(COOKIE_SESSION_NAME);
                        return next(err);
                    }
                    req.user = decodedToken;
                    res.locals.user = decodedToken;
                    next();
                }));
            } else {
                next();
            }
        };
    * in index js add cookie-parser and auth
        const cookieParser = require('cookie-parser');
        const { auth } = require('./middlewares/authMiddleware');
        app.use(cookieParser());
        app.use(auth);
28. Publication



render gallery
29. create publication
30. add 404 page
31. global error handling

