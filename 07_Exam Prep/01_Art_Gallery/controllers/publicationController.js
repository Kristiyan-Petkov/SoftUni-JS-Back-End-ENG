const router = require('express').Router();
const publicationService = require('../services/publicationService');
const { isAuth, isGuest } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorHelpers');

router.get('/', isAuth, (req, res) => {
    console.log(publicationService)
    res.render('publication/create');
})

module.exports = router;