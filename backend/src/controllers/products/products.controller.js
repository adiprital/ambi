const express = require('express');
const { getAllProducts, 
    buyProduct, 
    existssProduct,
    searchProducts,
    handleSingleProductBuy
} = require('../../models/products.model');
const { getPagination } = require('../../services/query');
const { decodeToken, 
    checkTokenValidity, 
    checkUserIdInMongo,
    updateBalance
} = require('../../models/users.model');

const productsController = express.Router();

productsController.get('/get-products', async (req, res) => {
    const { skip, limit } = getPagination(req.query);
    const products = await getAllProducts(skip, limit);
    return res.status(200).json(products);
});

productsController.get('/search', async (req, res) => {
    const products = await searchProducts(req.query);
    return res.status(200).json(products);
});

productsController.post('/buy-products', async (req, res) => {
    let token = req.headers['token'];

    if(!token){
        return res.json({
            error: 'invalid session token - login again.'
        });
    }

    let resultDecode = decodeToken(token);

    if(!resultDecode) {
        return res.json({
            error: 'invalid session token - login again.'
        });
    }

    let { id, exp } = resultDecode;

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

    const cart = req.body.cart;
    const keys = Object.keys(cart);
    let productName;
    let productAmount;

    const promises_array = keys.map(async (name) => {
       return await handleSingleProductBuy(name, cart, id)
    });
    const results = await Promise.all(promises_array);
    const filteredResults = results.filter(result => result !== undefined);
    console.log('filteredResults', filteredResults);


    //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
    // user balanced was not updated yet.
    // every result in filteredResults contain field of totalToPay
    // you need to sum all this values and reduce the sum from user balance
    // and finally return to the frontend response with email, balance, isSuccess and message




    // const productName = req.body.name;
    // const productAmount = req.body.price;

    // const existsProduct = await existssProduct(productName);
    // const productPrice = existsProduct.price;

    // if (!existsProduct) {
    //     return res.status(404).json({
    //         error: "This product does not exist."
    //     });
    // }

    // const mongoUser = await checkUserIdInMongo(id);
    // const productToBuy = await buyProduct(productName, productAmount);
    // let totalToPay = productAmount*productPrice;

    // let updatedUser;
    // if ( mongoUser.balance >= totalToPay && productToBuy.isSuccess ) {
    //      try {
    //         let newBalance = mongoUser.balance-totalToPay;
    //         await updateBalance(mongoUser, newBalance);
    //         updatedUser = await checkUserIdInMongo(id)
    //         return res.status(200).json({
    //             isSuccess: productToBuy.isSuccess,
    //             warning: productToBuy.warning,
    //             message: productToBuy.message,
    //             email: updatedUser.email,
    //             balance: updatedUser.balance
    //         });
    //     } catch(err) {
    //         console.error(`Payment is not available. Not enough funds on balance. ${err}`);
    //         return res.status(404).json({
    //             error: "Payment is not available. Not enough funds on balance. ${err}"
    //         });
    //     }
    // }

    // return res.status(200).json({
    //     isSuccess: productToBuy.isSuccess,
    //     warning: productToBuy.warning,
    //     message: productToBuy.message,
    //     email: mongoUser.email,
    //     balance: mongoUser.balance
    // });
});

module.exports = productsController;