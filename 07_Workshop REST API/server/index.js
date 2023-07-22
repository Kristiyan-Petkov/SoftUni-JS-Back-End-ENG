const mongoose = require('mongoose');
const express = require('express');
const { cors } = require('./src/middlewares/cors');
const furnitureController = require('./src/controllers/furniture');

async function start() {
    try {
        const db = await mongoose.connect('mongodb://localhost:27017/furnitureREST');


        console.log('DB Ready!');
    } catch (err) {
        console.log('Error connecting to database');
        return process.exit(1);
    }
    const app = express();

    app.use(express.json());
    app.use(cors);
    app.use('/data/catalog', furnitureController);

    app.listen(3030, () => console.log('REST Service started on port 3030'));
};

start();
