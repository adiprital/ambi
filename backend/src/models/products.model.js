const productsDatabase = require('./products.mongo');
const { readJsonFile, writeToJsonFile } = require('../helper');

const product = {
    name: "Ambi's product",
    description: "Ambi's product for right and left handed", 
    amount: 10,
    price: 5
};

async function getAllProducts(skip, limit) {
    let totalProdcutsLength = await productsDatabase.countDocuments({});
    let totalPages = Math.ceil(totalProdcutsLength/parseInt(limit));
    let products = await productsDatabase
    .find({}, { '_id': 0, '__v': 0 })
    .sort({ name: -1 }) // chacnge to 1 --> abc sort
    .skip(skip)
    .limit(limit);

    return {
        totalPages,
        products
    }
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
            upsert: true
        });
    } catch(err) {
        console.error(`Could not save product ${err}`);
    }
};

async function existssProduct(productName) {
    return await productsDatabase.findOne({
        name: productName
    });
}

async function buyProduct(productName, productAmount) {
    const jsonArray = readJsonFile('products');
    const pName = productName;
    const pAmount = productAmount;

    let productExists = undefined;
    let isSuccess = false;
    let message = "";
    let warning = false;

    if (pAmount <= 0) {
        message ="Invalid amount.";
    } else {
        jsonArray.forEach(product => {
            if (product.name === pName) {
                productExists = true;
                if (product.amount === 0) {
                    message =`${pName} Out of stock.`;
                }
                else if ((product.amount-pAmount) < 0) {
                    message = `There are only ${product.amount} ${pName}s in stock.`;
                    warning = true;
                } else {
                    product.amount = Math.abs(product.amount-pAmount);
                    message = `a purchase of ${pAmount} ${pName} was successfully made.`;
                    isSuccess = true;
                }
            }
        });
    }

    if (isSuccess) {
        writeToJsonFile("products", jsonArray);
        jsonArray.forEach(async (product) => {
            await updateProduct(product);
        });
    }


    if (!productExists && pAmount > 0) {
        message = "This product does not exist.";
    }

    return ({ message, isSuccess, warning });
};

async function updateProduct(product) {
    try {
        await productsDatabase.updateOne({
            name: product.name
        }, {
            amount: product.amount,
        }, {
            upsert: true
        });
    } catch(err) {
        console.error(`Could not update product ${err}`);
    }
}

module.exports = {
    getAllProducts,
    loadAllProducts,
    buyProduct,
    existssProduct
}