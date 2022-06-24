const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
app.use('/', express.static('public'));
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(5000, () => console.log('Server is listening on port 5000'));