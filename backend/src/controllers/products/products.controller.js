const express = require('express');
const { getAllProducts, 
    searchProducts,
    handleSingleProductToBuy,
    getProductsById
} = require('../../models/products.model');
const { getPagination } = require('../../services/query');
const { decodeToken, 
    checkTokenValidity, 
    checkUserIdInMongo,
    updateBalance,
    updatePurchases,
    addToWishList,
    removeFromWishList
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

    let { id, exp } = resultDecode; // id = userId
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

    const promises_array = keys.map(async (name) => {
       return await handleSingleProductToBuy(name, cart, id);
    });

    const results = await Promise.all(promises_array);
    const filteredResults = results.filter(result => result !== undefined);

    let totalSumToPay = 0;
    let purchases = {};
    filteredResults.forEach(result => {
        if ( result.isSuccess && result.purchases ){
            totalSumToPay = totalSumToPay + result.totalToPay;
            purchases[result.purchases.productId] = result.purchases.amount;
        }
    });
    
    const mongoUser = await checkUserIdInMongo(id);
    let newBalance = mongoUser.balance-totalSumToPay;
    await updateBalance(mongoUser, newBalance);
    await updatePurchases(mongoUser, purchases);
    let updatedUser = await checkUserIdInMongo(id);

    return res.json({
        filteredResults,
        email: updatedUser.email,
        balance: updatedUser.balance,
        purchases: updatedUser.purchases
    });
});

productsController.post('/get-products-by-id', async (req, res) => {
    const { purchasesProductsId, user } = req.body;
    const products = await getProductsById(purchasesProductsId, user);

    return res.status(200).json(products);
});

productsController.post('/add-to-wishlist', async (req, res) => {
    const { user,  wishListProductId} = req.body;

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

    let { id, exp } = resultDecode; // id = userId
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

    let wishList = req.body.wishListProductId;
    

    // console.log('wishList: ', wishList);

    // nums.forEach((num) => {
    //     if (num in obj) {
    //         obj[num] = obj[num]+1;
    //     } else {
    //         obj[num] = 1;
    //     }
    // });

    // const promises_array = keys.map(async (name) => {
    //    return await handleSingleProductToBuy(name, cart, id);
    // });

    // const results = await Promise.all(promises_array);
    // const filteredResults = results.filter(result => result !== undefined);


    // let wishListProducts = {};



    // filteredResults.forEach(result => {
    //     if ( result.isSuccess && result.purchases ){
    //         totalSumToPay = totalSumToPay + result.totalToPay;
    //         purchases[result.purchases.productId] = result.purchases.amount;
    //     }
    // });



    
    // const mongoUser = await checkUserIdInMongo(id);
    // await addToWishList(mongoUser, wishListProducts);
    // let updatedUser = await checkUserIdInMongo(id);

    // return res.json({
    //     email: updatedUser.email,
    //     wishList: updatedUser.wishList
    // });
        

    const products = await addToWishList( user, wishListProductId);

    return res.status(200).json(products);
});

module.exports = productsController;