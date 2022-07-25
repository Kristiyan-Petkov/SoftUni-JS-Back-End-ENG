const router = require('express').Router();

const homeContoller = require('./controllers/homeController');
const authContoller = require('./controllers/authController');
const publicationContoller = require('./controllers/publicationController');
const galleryController = require('./controllers/galleryController');

router.use(homeContoller);
router.use('/auth',authContoller);
router.use('/publication', publicationContoller);
router.use('/gallery', galleryController);
router.use('*', (req, res) => {
    res.render('404');
});

module.exports = router;