const router = require('express').Router();
const publicationService = require('../services/publicationService');
const authService = require('../services/authService');
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
        const createdPublication = await publicationService.createArt({ title, paintingTechnique, artPicture, autheticCertif, author });
        const user = await authService.findUser(author);
        user.publications.push(createdPublication._id);
        await authService.updateAuthorship(user._id, {publications: user.publications});
        res.redirect('/gallery');
    } catch (error) {
        // add mongoose error mapper
        return res.render('publication/create', { error: getErrorMessage(error) });
    }
});

router.get('/details/:id', async (req, res) => {
    const publication = await publicationService.getOneDetailed(req.params.id).lean();
    const author = await authService.findUser(publication.author);
    const authorId = author._id;
    const username = author.username;
    const cookie = req.cookies['user-session'];
    const userData = await publicationService.userData(cookie);
    const userId = userData._id;
    let isAuthor = false
    if (userId == authorId) {
        isAuthor = true;
    }

    const sharedSearch = publication.shared.filter(a => a.username == userData.username).length;
    let hasShared = false;
    if (sharedSearch > 0){
        hasShared = true;
    }
    res.render('details', { publication, username, cookie, isAuthor, hasShared });
});

router.get('/details/:id/delete', async (req, res) => {
    const publication = await publicationService.getOneDetailed(req.params.id).lean();
    const pubId = publication._id;
    const author = req.user._id
    const user = await authService.findUser(author);
    const publications = user.publications;
    const indexToRemove = publications.indexOf(pubId);
    publications.splice(indexToRemove, 1);
    await authService.updateAuthorship(user._id, {publications: publications});
    await publicationService.delete(publication);
    res.redirect('/gallery');
});

router.get('/details/:id/edit', async (req, res) => {
    const publication = await publicationService.getOneDetailed(req.params.id).lean();
    res.render('edit', { publication });
});

router.post('/details/:id/edit', async (req, res) => {
        await publicationService.edit(req.params.id, req.body);

        const publication = await publicationService.getOneDetailed(req.params.id).lean();
        const author = await authService.findUser(publication.author);
        const authorId = author._id;
        const username = author.username;
        const cookie = req.cookies['user-session'];
        const userData = await publicationService.userData(cookie);
        const userId = userData._id;
        let isAuthor = false
        if (userId == authorId) {
            isAuthor = true;
        }
        res.render('details', { publication, username, cookie, isAuthor });
});

router.get('/details/:id/share', async (req, res) => {
    // console.log(req.params.id);
    // console.log(req.user._id);
    const publication = await publicationService.getOneDetailed(req.params.id).lean();
    publication.shared.push(req.user._id);
    await publicationService.edit(req.params.id, {shared: publication.shared});

    // const publication = await publicationService.getOneDetailed(req.params.id).lean();
    const author = await authService.findUser(publication.author);
    const authorId = author._id;
    const username = author.username;
    const cookie = req.cookies['user-session'];
    const userData = await publicationService.userData(cookie);
    const userId = userData._id;
    let isAuthor = false;
    if (userId == authorId) {
        isAuthor = true;
    }
    const sharedSearch = publication.shared.indexOf(req.user._id);
    let hasShared = false;
    if (sharedSearch >= 0){
        hasShared = true;
    }
    res.render('details', { publication, username, cookie, isAuthor, hasShared });
});

module.exports = router;