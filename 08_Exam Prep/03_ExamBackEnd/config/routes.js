const authController = require('../controllers/authController');
const homeController = require('../controllers/homeController');
const catalogController = require('../controllers/catalogController');
const toyController = require('../controllers/toyController');


module.exports = (app) => {
    app.use('/', homeController);
    app.use('/auth', authController);
    app.use('/catalog', catalogController);
    app.use('/toys', toyController);
};