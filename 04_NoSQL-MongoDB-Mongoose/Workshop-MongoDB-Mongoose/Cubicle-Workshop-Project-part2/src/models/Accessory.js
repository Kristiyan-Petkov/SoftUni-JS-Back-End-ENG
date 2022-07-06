const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: /^http/g,
            message: 'Imgae URL should be a link'
        }
    },
    description: {
        type: String,
        required: true,
        maxLength: 120,
    },
    // cubes: {
    //     // to do
    // }
})

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;