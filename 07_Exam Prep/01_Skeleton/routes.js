const router = require('express').Router();

const homeContoller = require('./controllers/homeController');
router.use(homeContoller);

module.exports = router;