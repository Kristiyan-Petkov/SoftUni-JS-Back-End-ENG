const router = require('express').Router();

router.get('/', async (req, res) => {
    // console.log(req.user);
    const toys = await req.storage.getAllToys();

    res.render('others/catalog', {toys});
})

module.exports = router;