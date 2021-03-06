const express = require('express');
const cookieParser = require('cookie-parser');
const { initializeDatabase } = require('./config/database');
const { auth } = require('./middlewares/authMiddleware');
const { errorHandler } = require('./middlewares/errorHandlerMiddleware');
const routes = require('./routes');
const app = express();

require('./config/handlebars')(app);

app.use('/', express.static('public')); //route can also be '/static'
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(auth);
app.use(routes);
app.use(errorHandler);

initializeDatabase()
    .then(() => {
        app.listen(5000, () => console.log('Server is listening on port 5000'));
    })
    .catch((err) => {
        console.log('Cannot connect to DB', err);
    })