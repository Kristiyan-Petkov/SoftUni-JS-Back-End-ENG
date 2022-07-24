const mongoose = require('mongoose');

const { DB_QUERYSTRING } = require('./env');

exports.dbInit = () => {
    mongoose.connection.on('open', () => console.log('DB connected')); //event listener
    return mongoose.connect(DB_QUERYSTRING); //connect to DB
}
