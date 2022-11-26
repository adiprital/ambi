const express = require('express');
const { getAllProducts } = require('../../models/products.model');

const productsController = express.Router();


productsController.get('/', async (req, res) => {
    res.status(200).json(await getAllProducts());
});

module.exports = productsController;