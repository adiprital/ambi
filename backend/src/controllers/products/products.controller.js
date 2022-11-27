const express = require('express');
const { getAllProducts, 
    // buyProduct, 
    // existssProduct 
} = require('../../models/products.model');

const productsController = express.Router();

productsController.get('/', async (req, res) => {
    res.status(200).json(await getAllProducts());
});

// productsController.post('/', async (req, res) => {
//     const productName = req.body.name;
//     const productAmount = req.body.amount;
    
//     const existsProduct = await existssProduct(productName);
//     console.log('productsController - existsIsProduct: ', existsProduct);

//     if (!existsProduct) {
//         return res.status(404).json({
//             error: 'Product not found1'
//         });
//     }

//     const productToBuy = await buyProduct(productName, productAmount);
//     console.log('productToBuy', productToBuy);

//     if (!productToBuy){
//         return res.status(400).json({
//             error: 'Product not found2'
//         });
//     }

//     return res.status(200).json({
//         ok: true
//     });
// });

module.exports = productsController;