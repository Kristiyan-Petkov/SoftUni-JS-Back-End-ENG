const router = require('express').Router();
const publicationService = require('../services/publicationService');
const { isAuth, isGuest } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/', async (req, res) => {
    const publications = await publicationService.getAll();
    res.render('gallery/gallery', { publications });
})

module.exports = router;