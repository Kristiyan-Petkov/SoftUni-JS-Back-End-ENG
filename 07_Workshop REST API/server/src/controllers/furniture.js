const router = require('express').Router();

router.get('/', (req, res) => {
    res.json([]);
});

router.post('/', (req, res) => {
    console.log(req.body);
    res.end();
});

module.exports = router;