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


// async function testAuth() {
//     const reqMock = {};
//     const resMock = {
//         cookie() {
//             console.log('Set cookie', arguments);
//         }
//     };
//     const nextMock = () => {};
//     try {
//         // const result = await userService.createUser('Maxime', '123123');
//         // console.log(result);
//         const auth = authMiddleware();
//         auth(reqMock, resMock, nextMock);
//         // await reqMock.auth.register('melun', '123azerty');
//         await reqMock.auth.login('melun2', '123azerty');
//         // const user = await userService.getUserByUsername('maxime');
//         // console.log(user);
//     } catch (err){
//         console.log('Error: ', err.message);
//     }
// }

