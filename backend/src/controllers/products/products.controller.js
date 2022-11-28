const express = require('express');
const { getAllProducts, 
    buyProduct, 
    existssProduct 
} = require('../../models/products.model');

const productsController = express.Router();

productsController.get('/', async (req, res) => {
    res.status(200).json(await getAllProducts());
});

productsController.post('/', async (req, res) => {
    const productName = req.body.name;
    const productAmount = req.body.amount;
    
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