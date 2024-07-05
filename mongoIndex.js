const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ananyaaa:ananyaaa@cluster0.ctuzspj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'). then (() => console.log('Connected to MongoDB')).catch(err => console.error('Failed due to ', err));

const app = express();

app.listen(3001, () => {
    console.log('Server listening on port 3001');
});

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

const Product = mongoose.model('Product', productSchema);



app.use(express.json());


app.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post('/products', async (req, res) => {
    const product = new Product({
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        isInStock: req.body.isInStock,
        category: req.body.category
    });
    await product.save();
    res.json(product);
});

app.put('/products/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    product.productName = req.body.productName;
    product.productPrice = req.body.productPrice;
    product.isInStock = req.body.isInStock;
    product.category = req.body.category;
    await product.save();
    res.json(product);
});

app.delete('/products/:id', async (req, res) => {    
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.json({message: 'Product deleted successfully'});
});

