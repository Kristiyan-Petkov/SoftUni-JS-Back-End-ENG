const { isAuth } = require('../middlewares/authMiddleware');
const publicationService = require('../services/publicationService');

const router = require('express').Router();

router.get('/', async (req, res) => {
    const indexPublications = await publicationService.getAll();
    res.render('home', { indexPublications });
});

module.exports = router;