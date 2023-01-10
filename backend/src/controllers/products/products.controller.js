const express = require('express');
const { getAllProducts, 
    buyProduct, 
    existssProduct
} = require('../../models/products.model');
const { getPagination } = require('../../services/query');
const { decodeToken, 
    checkTokenValidity, 
    checkUserIdInMongo,
    updateBalance
} = require('../../models/users.model');

const productsController = express.Router();

productsController.get('/', async (req, res) => {
    const { skip, limit } = getPagination(req.query);
    const products = await getAllProducts(skip, limit);
    return res.status(200).json(products);
});

productsController.post('/', async (req, res) => {
    const productName = req.body.name;
    const productAmount = req.body.amount;
    const productPrice = req.body.price;
    let token = req.headers['token'];

    let { id, exp } = decodeToken(token);

    if(!exp){
        return res.json({
            error: 'invalid session token - login again.'
        });
    }

    if(!checkTokenValidity(exp)){
        return res.json({
            error: 'session token expired - login again.'
        });
    }

    const existsProduct = await existssProduct(productName);

    if (!existsProduct) {
        return res.status(404).json({
            error: "This product does not exist."
        });
    }

    // TO DO - 
    // use the id from decodeToken response and get the user from mongo -V
    // check if he have enuogh balance to complete the purchase -V
    // if yes, after buyProudct function (if it succeed) update the user balance -V

    const mongoUser = await checkUserIdInMongo(id);
    const productToBuy = await buyProduct(productName, productAmount);
    let totalToPay = productAmount*productPrice;

    if ( mongoUser.balance >= totalToPay && productToBuy.isSuccess ) {
        try {
                let newBalance = mongoUser.balance-totalToPay;
                updateBalance(mongoUser, newBalance);
        } catch(err) {
            console.error(`Payment is not available. Not enough funds on balance. ${err}`);
        }
    }

    return res.status(200).json({
        isSuccess: productToBuy.isSuccess,
        warning: productToBuy.warning,
        message: productToBuy.message
    });
});

module.exports = productsController;