const express = require('express');
const hbs = require('express-handlebars');
const { PORT } = require('./config/env');
const routes = require('./routes');
const { dbInit } = require('./config/db');


const app = express();
app.engine('hbs', hbs.engine({
    extname: 'hbs'
}))
app.set('view engine', 'hbs');
app.use(express.urlencoded({extended: false})); //body parser
app.use(express.static('style')); //setting up the static path
app.use(routes);

dbInit()
    .then(app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)))
    .catch(err => console.log(`Cannot connect to DB, please try again\n${err}`));
