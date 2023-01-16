const productsDatabase = require('./products.mongo');
const { readJsonFile, writeToJsonFile } = require('../helper');
const {checkUserIdInMongo, updateBalance} = require('../models/users.model')

async function getAllProducts(skip, limit) {
    let totalProdcutsLength = await productsDatabase.countDocuments({});
    let totalPages = Math.ceil(totalProdcutsLength/parseInt(5)); // 5 = limit
    let products = await productsDatabase
    .find({}, { '_id': 0, '__v': 0 })
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

async function handleSingleProductBuy(name, cart, id){
    if (cart[name] > 0) {
        let productName = name;
        let productAmount = cart[productName];
        const existsProduct = await existssProduct(productName);
        const productPrice = existsProduct.price;
                    
        if (!existsProduct) {
            return ({
                error: "This product does not exist."
            });
        }

        const mongoUser = await checkUserIdInMongo(id);
        console.log('productName', productName)
        const productToBuy = await buyProduct(productName, productAmount);
        let totalToPay = productAmount*productPrice;


        let updatedUser;
        if ( mongoUser.balance >= totalToPay && productToBuy.isSuccess ) {
            console.log('true or false: ', mongoUser.balance >= totalToPay && productToBuy.isSuccess);
            
             try {
                // let newBalance = mongoUser.balance-totalToPay;
                // console.log('newBalance', newBalance)
                // await updateBalance(mongoUser, newBalance);
                // updatedUser = await checkUserIdInMongo(id);
                return ({
                    isSuccess: productToBuy.isSuccess,
                    warning: productToBuy.warning,
                    message: productToBuy.message,
                    // email: updatedUser.email,
                    totalToPay
                });
            } catch(err) {
                console.error(`Payment is not available. Not enough funds on balance. ${err}`);
                return ({
                    error: "Payment is not available. Not enough funds on balance. ${err}"
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

async function searchProducts(searchText) {
    try {
        return await productsDatabase.find({ name: searchText.name});
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
    handleSingleProductBuy
}