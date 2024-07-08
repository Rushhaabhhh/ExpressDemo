const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type : String,
        required : true,
    },
    productPrice : {
        type : Number,
        required : true
    },
    isInStock : {
        type : Boolean,
        required : true
    },
    category : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Product', productSchema);