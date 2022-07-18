#tasks

## Initial setup
1. Initialize project
    npm init -y
    -> in package.json 
        "scripts": {
        "start": "nodemon index js"
        },
2. Install initial dependencies /nodemon (dev dependency), express, express-handlebars/
    npm i -D nodemon
    npm i express express-handlebars
    npm start
3. add resources to views folder (html/hbs)
4. add resources to public folder (css)
5. create config folder and create env.js
    exports.PORT = 3000;

6. express config in index.js
    //server's up (+body parser and static path):
    const express = require('express');
    const { PORT } = require('./config/env');

    const app = express();
    app.use(express.urlencoded({extended: false})); //body parser
    app.use(express.static('public')); //setting up the static path

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


FIX THE CSS YOU BROKE