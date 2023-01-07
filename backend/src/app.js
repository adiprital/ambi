const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

// const bodyparser = require("body-parser"); 
// var cookieParser = require('cookie-parser'); 

const productsController = require('./controllers/products/products.controller');
const usersController = require('./controllers/users/users.controller');

const app = express();

app.use(express.json());

// app.use(cookieParser()); 

app.use(cors({
    options:{
        origin:'http://localhost:3000'
    }
}));

// app.use(bodyparser.urlencoded({ extended: true })); 
// app.use(express.static("public")); 

// app.use(morgan('combined'));

// app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/get-products', productsController);
app.use('/buy-products', productsController);

app.use('/auth', usersController);

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

module.exports = app;