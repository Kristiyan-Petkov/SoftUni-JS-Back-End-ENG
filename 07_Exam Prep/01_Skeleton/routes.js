const router = require('express').Router();

const homeContoller = require('./controllers/homeController');
const authContoller = require('./controllers/authController');
router.use(homeContoller);
router.use('/auth',authContoller);

module.exports = router;