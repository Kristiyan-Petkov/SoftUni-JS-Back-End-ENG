const mongoose = require('mongoose');
const path = require('path');

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
    console.log(this.artPicture);
    return this.artPicture.startsWith('http');
}, 'Image url should be a link');

publicationSchema.path('autheticCertif').validate(function () {
    console.log(this.autheticCertif);
    let answer = this.autheticCertif.toLowerCase();
    if (answer != 'yes' && answer != 'no'){
        return false;
    }
    return true;
}, 'Certificate of authenticity is Yes/No question');

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;