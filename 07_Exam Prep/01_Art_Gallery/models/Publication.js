const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'An article of the same name exits already.'],
        required: [true, 'Title field is required.'],
    },
    paintingTechnique: {
        type: String,
        required: [true, 'Painting technique field is required.'],
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

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;