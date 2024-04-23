'use strict';

const express = require('express');
const app = express();

const productionDist = __dirname + '/cardinal_toe_app/dist/cardinal_toe_app/browser';

app.use(express.static(productionDist));

app.get('/testbed', (req, res) => {
    res.sendFile(__dirname + '/testbed/index.html');  
})

app.get('/testbed/index.js', (req, res) => {
    res.sendFile(__dirname + '/testbed/index.js');  
})

app.all('*', (req, res) => {
    res.status(200).sendFile('/', { root: productionDist })
})

app.listen(3000, () => {
    console.log('Application listening on port 3000');
})