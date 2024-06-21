const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/contactus.html'));
};

exports.postAddProduct = (req, res) => {
    const { name, age, brand, gender } = req.body;
    const product = new Product(name, age, brand, gender);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res) => {
    Product.fetchAll((products) => {
        res.json(products);
    });
};
