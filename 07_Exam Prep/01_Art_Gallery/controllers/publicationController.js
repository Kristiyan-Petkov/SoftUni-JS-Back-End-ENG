const router = require('express').Router();
const publicationService = require('../services/publicationService');
const { isAuth, isGuest } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorHelpers');
const { Publication } = require('../models/Publication');

router.get('/', isAuth, (req, res) => {
    res.render('publication/create');
});

router.post('/', isAuth, async (req, res) => {
    // const { title, paintingTechnique, artPicture, autheticCertif } = req.body;
    const { title, paintingTechnique, artPicture, autheticCertif } = req.body;
    const author = req.user._id

    try {
        const createdPublication = await publicationService.createArt({title, paintingTechnique, artPicture, autheticCertif, author});
        res.redirect('/gallery');
    } catch (error) {
        // add mongoose error mapper
        return res.render('publication/create', { error: getErrorMessage(error) });
    }
});


module.exports = router;