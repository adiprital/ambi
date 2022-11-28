const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const { readJsonFile, writeToJsonFile } = require('./helper.js');

const productsController = require('./controllers/products/products.controller');

const app = express();

app.use(express.json());

app.use(cors({
    options:{
        origin:'http://localhost:3000'
    }
}));

// app.use(morgan('combined'));

// app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/get-products', productsController);
app.use('/buy-products', productsController);

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

module.exports = app;