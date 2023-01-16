const express = require('express');
const { getAllProducts, 
    buyProduct, 
    existssProduct,
    searchProducts
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
        if (cart[name] > 0) {
            productName = name;
            productAmount = cart[name];
            const existsProduct = await existssProduct(productName);
            const productPrice = existsProduct.price;

            // console.log('productName: ', productName);
            // console.log('productAmount" ', productAmount);
            // console.log('productPrice: ', productPrice);
            // console.log('existsProduct: ', existsProduct);
                        
            if (!existsProduct) {
                return res.status(404).json({
                    error: "This product does not exist."
                });
            }

            const mongoUser = await checkUserIdInMongo(id);
            const productToBuy = await buyProduct(productName, productAmount);
            let totalToPay = productAmount*productPrice;

            // console.log('mongoUser.email: ', mongoUser.email);
            // console.log('mongoUser.balance: ', mongoUser.balance);
            // console.log('totalToPay: ', totalToPay);
            // console.log('productToBuy: ', productToBuy);

            let updatedUser;
            if ( mongoUser.balance >= totalToPay && productToBuy.isSuccess ) {
                console.log('true or false: ', mongoUser.balance >= totalToPay && productToBuy.isSuccess);
                 try {
                    let newBalance = mongoUser.balance-totalToPay;
                    await updateBalance(mongoUser, newBalance);
                    updatedUser = await checkUserIdInMongo(id);

                    // console.log('productName: ', productName);
                    // console.log('productAmount: ', productAmount);
                    // console.log('newBalance: ', newBalance);
                    // console.log('mongoUser.email: ', mongoUser.email);
                    // console.log('updatedUser.email: ', updatedUser.email);
                    // console.log('productToBuy: ', productToBuy);
                    // console.log('updatedUser: ', updatedUser);
                    
                    return res.status(200).json({
                        isSuccess: productToBuy.isSuccess,
                        warning: productToBuy.warning,
                        message: productToBuy.message,
                        email: updatedUser.email,
                        balance: updatedUser.balance
                    });
                } catch(err) {
                    console.error(`Payment is not available. Not enough funds on balance. ${err}`);
                    return res.status(404).json({
                        error: "Payment is not available. Not enough funds on balance. ${err}"
                    });
                }
            }

            return res.status(200).json({
                isSuccess: productToBuy.isSuccess,
                warning: productToBuy.warning,
                message: productToBuy.message,
                email: mongoUser.email,
                balance: mongoUser.balance
            });
        }
    });
    const results = await Promise.all(promises_array);
    const filteredResults = results.filter(result => result !== undefined);
    console.log('filteredResults', filteredResults);

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