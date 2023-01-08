const express = require('express');
const { getAllProducts, 
    buyProduct, 
    existssProduct 
} = require('../../models/products.model');

const { getPagination } = require('../../services/query');
const { decodeToken, checkTokenValidity } = require('../../models/users.model');

const productsController = express.Router();

productsController.get('/', async (req, res) => {
    const { skip, limit } = getPagination(req.query);
    const products = await getAllProducts(skip, limit);
    return res.status(200).json(products);
});

productsController.post('/', async (req, res) => {
    const productName = req.body.name;
    const productAmount = req.body.amount;
    let token = req.headers['token'];

    let {id, exp} = decodeToken(token)

    if(!exp){
        return res.json({
            error: 'invalid session token - login again.'
        })
    }

    if(!checkTokenValidity(exp)){
        return res.json({
            error: 'session token expired - login again.'
        })
    }


    const existsProduct = await existssProduct(productName);

    if (!existsProduct) {
        return res.status(404).json({
            error: "This product does not exist."
        });
    }

    // TO DO - 
    // use the id form decodeToken response and get the user from mongo
    // check if he have enuogh balance to complete the buy
    // if yes, after buyProudct function (if it succeed) update the user balance

    const productToBuy = await buyProduct(productName, productAmount);

    return res.status(200).json({
        isSuccess: productToBuy.isSuccess,
        warning: productToBuy.warning,
        message: productToBuy.message
    });
});

module.exports = productsController;