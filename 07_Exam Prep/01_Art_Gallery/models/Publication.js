const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'An article of the same name exits already.'],
        required: [true, 'Title field is required.'],
        minLength: [6, 'Title should be a minimum of 6 characters long.'],
    },
    paintingTechnique: {
        type: String,
        required: [true, 'Painting technique field is required.'],
        maxLength: [15, 'Painting technique should be a maximum of 15 characters long.'],
    },
    artPicture: {
        type: String,
        required: [true, 'Art picture field is required.'],
    },
    autheticCertif: {
        type: String,
        required: [true, 'Certificate of authenticity field is required.'],
        //add "yes", "no" option
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    shared: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
})

publicationSchema.path('artPicture').validate(function () {
    return this.artPicture.startsWith('http');
}, 'Image url should be a link');

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;