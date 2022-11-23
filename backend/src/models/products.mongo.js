const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }, 
    price: {
        type: Number,
        required: true
    },
    // image: [{
    //         type: String
    //     }, 
    //     {
    //         type: String
    //     }
    // ]
});

// connects productsSchema with the "products" collection.
module.exports = mongoose.model('Product', productsSchema);