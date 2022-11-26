const productsDatabase = require('./products.mongo');
const { readJsonFile } = require('../helper');

const product = {
    name: "Ambi's product",
    description: "Ambi's product for right and left handed", 
    amount: 10,
    price: 5
};

async function getAllProducts() {
    return await productsDatabase.find({});
}

async function loadAllProducts() {
    const products = readJsonFile('products');
    products.forEach(async (product) => {
        await saveProduct(product);
    });
}


async function saveProduct(product) {
    try {
        await productsDatabase.updateOne({
            name: product.name
        }, {
            name: product.name,
            description: product.description,
            amount: product.amount,
            price: product.price
        }, {
            upsert: true,
        });
    } catch(err) {
        console.error(`Could not save planet ${err}`);
    }
};

module.exports = {
    getAllProducts,
    loadAllProducts
}