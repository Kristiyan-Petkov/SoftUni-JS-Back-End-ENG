const express = require('express');

const {PORT} = require('./config');
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');

// const userService = require('./services/user');
// const authMiddleware = require('./middlewares/auth');

start();

async function start() {
    const app = express();

    await databaseConfig(app);
    expressConfig(app);
    routesConfig(app);
    
    //TO DO remove in prod
    app.get('/', (req, res) => {
        res.send('Hello!')
    })
    
    app.listen(PORT, () => {
        // testAuth();
        console.log(`Application started at ${'http://localhost:3000/'}`);
    });
}

