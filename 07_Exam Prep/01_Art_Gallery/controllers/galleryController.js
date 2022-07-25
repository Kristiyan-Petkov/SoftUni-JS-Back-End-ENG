const router = require('express').Router();
// const galleryService = require('../services/galleryService');
const { isAuth, isGuest } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/', (req, res) => {
    res.render('gallery/gallery');
})

module.exports = router;