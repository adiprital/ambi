const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    }
});

// connects usersSchema with the "Users" collection.
module.exports = mongoose.model('Users', usersSchema);