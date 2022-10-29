const express = require('express');
const app = express();
const port = 3000;

const genre = [];

app.use('/', express.static('static'));

app.get('/api/genre', (req, res) => {
    console.log(`GET request for ${req.url}`);
    res.send(genre);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

