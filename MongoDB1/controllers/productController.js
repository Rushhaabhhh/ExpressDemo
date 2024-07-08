const Product = require('../models/productModel');

exports.get = ('/', async (req, res) => {
    const products = await Product.find({});
    return res.json(products);
});

exports.get = ('/products/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    return res.json(product);
});

exports.post = ('/products', async (req, res) => {
    const product = new Product({
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        isInStock: req.body.isInStock,
        category: req.body.category
    });
    await product.save();
    res.json(product);
});

exports.put = ('/products/:id', async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    return res.json(updatedProduct);
});

exports.delete = ('/products/:id', async (req, res) => {    
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    return res.json({message: 'Product deleted successfully'});
});