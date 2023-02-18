const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const bodyparser = require("body-parser"); 
var cookieParser = require('cookie-parser'); 

const productsController = require('./controllers/products/products.controller');
const usersController = require('./controllers/users/users.controller');

const app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser()); 

app.set('trust proxy', 1);

app.use(cors({
        origin:['http://localhost:3000','http://ec2-44-203-23-164.compute-1.amazonaws.com:3000'],
        methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
        credentials: true,
        exposedHeaders: ["set-cookie"]
}));

// app.use(morgan('combined'));

let express_static_path = process.env.NODE_ENV === 'prod' ?
        path.join(__dirname, '../../ambi', 'build') :
        path.join(__dirname, '..', 'public')

app.use(express.static(express_static_path));

app.use('/', productsController);
app.use('/auth', usersController);


let html_path = process.env.NODE_ENV === 'prod' ?
        path.join(__dirname, '../../ambi', 'build', 'index.html') :
        path.join(__dirname, '..', 'public', 'index.html')

app.get('/*', (req, res) => {
    res.sendFile(html_path);
});

module.exports = app;