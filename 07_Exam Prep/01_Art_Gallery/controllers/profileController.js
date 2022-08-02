const router = require('express').Router();
const { isAuth, isGuest } = require('../middlewares/authMiddleware');
const authService = require('../services/authService');
const publicationService = require('../services/publicationService');

router.get('/', isAuth, async (req, res) => {
    const user = await authService.findUserDetailed(req.user._id);
    const published = user.publications.map(a => a.title).join(', ');
    const shared = await publicationService.getAllSharedByUser(req.user._id);
    res.render('profile', {username: user.username, address: user.address, published, shared});
});

module.exports = router;