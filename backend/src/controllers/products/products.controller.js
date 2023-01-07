const express = require('express');
const { getAllProducts, 
    buyProduct, 
    existssProduct 
} = require('../../models/products.model');

const { getPagination } = require('../../services/query');

const productsController = express.Router();

productsController.get('/', async (req, res) => {
    const { skip, limit } = getPagination(req.query);
    const products = await getAllProducts(skip, limit);
    return res.status(200).json(products);
});

productsController.post('/', async (req, res) => {
    const productName = req.body.name;
    const productAmount = req.body.amount;
    console.log('cookie', req.cookies)
    console.log('cookie set', req.headers['set-cookie'])
    
    const existsProduct = await existssProduct(productName);

    if (!existsProduct) {
        return res.status(404).json({
            error: "This product does not exist."
        });
    }

    const productToBuy = await buyProduct(productName, productAmount);

    return res.status(200).json({
        isSuccess: productToBuy.isSuccess,
        warning: productToBuy.warning,
        message: productToBuy.message
    });
});

module.exports = productsController;