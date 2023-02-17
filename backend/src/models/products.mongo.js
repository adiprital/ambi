const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: {
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
    // img: {
    //     type: String,
    //     contentType: String
    //     }
});

// connects productsSchema with the "products" collection.
module.exports = mongoose.model('Product', productsSchema);