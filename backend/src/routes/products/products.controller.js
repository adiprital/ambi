const express = require('express');
const { getAllProducts } = require('../../models/products.model');

const productsRouter = express.Router();

async function httpGetAllProducts(req, res) {
    return res.status(200).json(await getAllProducts());
}
productsRouter.get('/', httpGetAllProducts);

module.exports = productsRouter;