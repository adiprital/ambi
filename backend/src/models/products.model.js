const productsDatabase = require('./products.mongo');

const product = {
    productName: "Ambi's product",
    description: "Ambi's product for right and left handed", 
    amount: 10,
    price: 5
};

async function getAllProducts() {
    return await productsDatabase.find({});
}

module.exports = {
    getAllProducts
}