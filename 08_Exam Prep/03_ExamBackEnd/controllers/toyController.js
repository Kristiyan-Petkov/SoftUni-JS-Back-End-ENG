const router = require('express').Router();
const {isUser} = require('../middlewares/guards')

router.get('/create', isUser(), (req, res) => {
    res.render('others/create');
})

router.post('/create', isUser(), async (req, res) => {
    const toyData = {
        title: req.body.title,
        charity: req.body.charity,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        buyinglist: [],
        owner: req.user._id,
    }

    try {
        await req.storage.createToy(toyData);
        res.redirect('/catalog');
    } catch (err) {
        console.log(err);

        const ctx = {
            errors: [err.message],
            toyData: {
                title: req.body.title,
                charity: req.body.charity,
                imageUrl: req.body.imageUrl,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
            }
        }

        res.render('others/create', ctx)
    }
})

module.exports = router;