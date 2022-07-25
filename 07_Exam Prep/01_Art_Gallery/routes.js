const router = require('express').Router();

const homeContoller = require('./controllers/homeController');
const authContoller = require('./controllers/authController');
const publicationContoller = require('./controllers/publicationController');
router.use(homeContoller);
router.use('/auth',authContoller);
router.use('/publication', publicationContoller);

module.exports = router;