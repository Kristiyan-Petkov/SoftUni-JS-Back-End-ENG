const express = require('express');

const app = express();

//endpoint:
app.get('/', (req,res) => {
    res.send('Hello')
})

app.listen(3000, () => console.log('App listening on port 3000.'));