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
// app.use('/buy-products', productsController);

// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

//remove to controller
app.post("/buy-products", (req, res) => {
    const jsonArray = readJsonFile('products');
    const productName = req.body.name;
    const productAmount = req.body.amount;
    let productExists = undefined;
    let isSuccess = false;
    let message = "";
    let warning = false;

    if (productAmount <= 0) {
        message ="Invalid amount.";
    } else {
        jsonArray.forEach(product => {
            if (product.name === productName) {
                productExists = true;
                if (product.amount === 0) {
                    message =`${productName} Out of stock.`;
                }
                else if ((product.amount-productAmount) < 0) {
                    message = `There are only ${product.amount} ${productName}s in stock.`;
                    warning = true;
                } else {
                    product.amount = Math.abs(product.amount-productAmount);
                    message = `a purchase of ${productAmount} ${productName} was successfully made.`;
                    isSuccess = true;
                }
            }
        });
    }

    if (isSuccess) {
        writeToJsonFile("products", jsonArray);
    }

    if (!productExists && productAmount > 0) {
        message = "This product does not exist.";
    }

    res.json({ message, isSuccess, warning });
});

module.exports = app;