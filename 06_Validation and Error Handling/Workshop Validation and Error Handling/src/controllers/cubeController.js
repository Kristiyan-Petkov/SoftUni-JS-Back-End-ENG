const router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { log } = require('console');
// const fs = require('fs/promises');
// const cubes = require('../views/db.json');
const cubeService = require('../services/cubeService');
const accessoryService = require('../services/accessoryService');
const { isAuth } = require('../middlewares/authMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('create');
})

router.post(
    '/create',
    isAuth,
    body('name', 'Name is required!').not().isEmpty(),
    body('description', 'Description text must be between 5 and 120 characters!').isLength({min: 5, max: 120}),
    body('difficultyLevel', 'Difficulty level must be between 1 and 6!').toInt().isInt({min: 1, max: 6}),
    async (req, res) => {
        const cube = req.body;
        cube.owner = req.user._id;
        // validate new cube data (checks can be extended);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array()[0].msg);
        }
        if (cube.name.length == 0) {
            return res.status(400).send('Invalid cube name');
        }

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
    }
);

router.get('/details/:id', async (req, res) => {
    const cube = await cubeService.getOneDetailed(req.params.id).lean();
    const isOwner = cube.owner == req.user?._id;
    res.render('details', { cube, isOwner });
});

router.get('/:cubeId/attach-accessory', isAuth, async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    const accessories = await accessoryService.getAllAvailable(cube.accessories).lean();
    res.render('accessory/attach', { cube, accessories });
});

router.post('/:cubeId/attach-accessory', isAuth, async (req, res) => {
    const accessoryId = req.body.accessory;
    await cubeService.attachAccessory(req.params.cubeId, accessoryId);
    res.redirect(`/cube/details/${req.params.cubeId}`)
});

router.get('/:cubeId/edit', isAuth, async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();
    if (cube.owner != req.user._id) {
        return res.redirect('/404');
    }
    cube[`difficultyLevel${cube.difficultyLevel}`] = true;

    if (!cube) {
        res.redirect('/404')
    }
    res.render('cube/edit', { cube });
});

router.post('/:cubeId/edit', isAuth, async (req, res) => {
    let modifiedCube = await cubeService.edit(req.params.cubeId, req.body);

    res.render(`/cube/details/${modifiedCube._id}`);
});

router.get('/:cubeId/delete', async (req, res) => {
    const cube = await cubeService.getOne(req.params.cubeId).lean();

    // to do -> add isOwner validation
    res.render('cube/delete', { cube });
})

router.post('/:cubeId/delete', async (req, res) => {
    await cubeService.delete(req.param.cubeId);
    res.redirect('/');
})

module.exports = router;