const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const { readJsonFile, writeToJsonFile } = require('./helper.js');

const app = express();

app.use(express.json());
app.use(cors({
    options:{
        origin:'http://localhost:3000'
    }
}))
// app.use(express.static(path.join(__dirname, '..', 'public')))
// app.use(morgan('combined'));
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
// });

app.get("/get-products", (req, res) => {
    const arr = readJsonFile();
    res.json(arr);
});

app.post("/buy-products", (req, res) => {
    const jsonArray = readJsonFile();
    const productName = req.body.name;
    const productAmount = req.body.amount;
    let productExists = undefined;
    let isSuccess = false;
    let message = "";

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
                    message = `There are only ${product.amount} items in stock.`;
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

    res.json({ message, isSuccess });
});

module.exports = app;