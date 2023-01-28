const productsDatabase = require('./products.mongo');
const { readJsonFile, writeToJsonFile } = require('../helper');
const { checkUserIdInMongo } = require('../models/users.model')

async function getAllProducts(skip, limit) {
    let totalProdcutsLength = await productsDatabase.countDocuments({});
    let totalPages = Math.ceil(totalProdcutsLength/parseInt(5)); // 5 = limit
    let products = await productsDatabase
    .find({}, { '__v': 0 })
    .sort({ name: -1 }) // **chacnge to 1. -1 for decended values, 1 for ascending values
    .skip(skip) // skips over the first 'skip' documents
    .limit(limit); // to limit the amount of documents that come back from mongo
    // in this case we'll return the 'limit' documents after we skip the first 'skip'

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

async function handleSingleProductToBuy(name, cart, id){
    if (cart[name] > 0) {
        let productName = name;
        let productAmount = cart[productName];
        const existsProduct = await existssProduct(productName);
        const productPrice = existsProduct.price;
        const mongoUser = await checkUserIdInMongo(id);
        let totalToPay = productAmount*productPrice;

        if( mongoUser.balance < totalToPay ){
            return ({
                isSuccess: false,
                warning: false,
                message: 'Payment is not available. Not enough funds on balance.'
            });
        }

        if (!existsProduct) {
            return ({
                isSuccess: false,
                warning: false,
                message: "This product does not exist."
            });
        }

        const productToBuy = await buyProduct(productAmount, existsProduct);
        
        if ( mongoUser.balance >= totalToPay && productToBuy.isSuccess ) {
             try {
                return ({
                    isSuccess: productToBuy.isSuccess,
                    warning: productToBuy.warning,
                    message: productToBuy.message,
                    totalToPay
                });
            } catch(err) {
                return ({
                    isSuccess: false,
                    warning: false,
                    message: `Payment is not available. Not enough funds on balance. ${err}`
                });
            }
        }

        return ({
            isSuccess: productToBuy.isSuccess,
            warning: productToBuy.warning,
            message: productToBuy.message,
            email: mongoUser.email,
            balance: mongoUser.balance
        });
    }
}

async function buyProduct(productAmount, existsProduct) {
    let product = existsProduct;

    //amount to buy
    const pAmount = productAmount;

    let isSuccess = false;
    let message = "";
    let warning = false;

    if (!product) {
        return ({ message: 'product does not exists', isSuccess, warning });
    }

    if (pAmount <= 0) {
        message ="Invalid amount requested by the user.";
    } else {
        if (product.amount === 0) {
            message =`${product.name} Out of stock.`;
        }
        else if ((product.amount-pAmount) < 0) {
            message = `There are only ${product.amount} ${product.name}s in stock.`;
            warning = true;
        } else {
            product.amount = Math.abs(product.amount-pAmount);
            message = `a purchase of ${pAmount} ${product.name} was successfully made.`;
            isSuccess = true;
        }
    }

    if (isSuccess) {
        await updateProduct(product);
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

async function searchProducts(searchText) {
    console.log('searchProducts - searchText: ', searchText.name);
    try {
        return await productsDatabase.find({'name': {$regex: searchText.name}});
    } catch(err) {
        console.error(`Could not find product ${err}`);
    }
}

module.exports = {
    getAllProducts,
    loadAllProducts,
    buyProduct,
    existssProduct,
    searchProducts,
    handleSingleProductToBuy
}