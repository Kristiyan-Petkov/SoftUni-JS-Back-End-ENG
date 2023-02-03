const express = require('express');

const data = [
    {
        id: 1111,
        name: 'First'
    },
    {
        id: 1112,
        name: 'Second'
    },
    {
        id: 1113,
        name: 'Third'
    }
]

const app = express();
app.use(express.json());

//endpoints:
app.get('/', (req, res) => {
    res.json({ message: 'Hello' })
});

app.get('/services', (req, res) => {
    res.json(data);
});

app.get('/services/:id', (req, res) => {
    const id = req.params.id;
    const item = data.find(i => i.id == id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ error: 'Not found' })
    }
});

app.post('/services', (req, res) => {
    const item = req.body;
    item.id = 1000 + (Math.random() * 8999 | 0);
    data.push(item);

    res.status(201).json(item)
});

app.put('/services/:id', (req, res) => {
    const id = req.params.id;
    const index = data.findIndex(i => i.id == id);

    const item = req.body;
    item.id = id
    
    if (index != -1) {
        data.splice(index, 1, req.body);
        res.json(req.body);
    } else {
        res.status(404).json({ error: 'Not found' })
    }
});

app.listen(3000, () => console.log('App listening on port 3000.'));