const router = require('express').Router();
const { log } = require('console');
const fs = require('fs/promises');
const cubes = require('../views/db.json');

router.get('/create', (req, res) => {
    res.render('create');
})

router.post('/create', (req, res) => {
    const cube = req.body;

    // validate new cube data (checks can be extended);
    if (cube.name.length == 0) {
        return res.status(400).send('Invalid cube name');
    }

    // save data;
    cubes.push(JSON.parse(JSON.stringify(cube)));
    fs.writeFile('./src/views/db.json', JSON.stringify(cubes, '', 4)) // had to add src to path for it to work
        .then(() => {
            // redirect to page;
            res.redirect('/');
        })
        .catch(err => {
            res.status(400).send(`Unsuccessful cube creation. Please try again.\n${err}`)
        })

});

module.exports = router;