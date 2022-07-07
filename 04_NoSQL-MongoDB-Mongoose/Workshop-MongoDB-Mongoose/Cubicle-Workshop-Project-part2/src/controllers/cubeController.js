const router = require('express').Router();
const { log } = require('console');
// const fs = require('fs/promises');
// const cubes = require('../views/db.json');
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');

router.get('/create', (req, res) => {
    res.render('create');
})

router.post('/create', async (req, res) => {
    const cube = req.body;

    // validate new cube data (checks can be extended);
    if (cube.name.length == 0) {
        return res.status(400).send('Invalid cube name');
    }

    // save data;
    // cubes.push(JSON.parse(JSON.stringify(cube)));
    // fs.writeFile('./src/views/db.json', JSON.stringify(cubes, '', 4))
    try {
        await cubeService.create(cube);
        res.redirect('/');
    } catch (error) {
        res.status(400).send(error);
    }
    
    // cubeService.create(cube)
    //     .then(() => {
    //         // redirect to page;
    //         res.redirect('/');
    //     })
    //     .catch(err => {
    //         res.status(400).send(`Unsuccessful cube creation. Please try again.\n${err}`)
    //     })

});

router.get('/details/:id', async (req, res) => {
    const cube = await cubeService.getOne(req.params.id).lean();
    res.render('details', { cube });
})

router.get('/:cubeId/attach-accessory', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    const accessories = await accessoryService.getAll().lean();
    res.render('accessory/attach', { cube, accessories });
})

module.exports = router;