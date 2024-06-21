const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

class Product {
    constructor(name, age, brand, gender) {
        this.name = name;
        this.age = age;
        this.brand = brand;
        this.gender = gender;
    }

    save() {
        fs.readFile(productsFilePath, (err, data) => {
            let products = [];
            if (!err) {
                products = JSON.parse(data);
            }
            products.push(this);
            fs.writeFile(productsFilePath, JSON.stringify(products, null, 2), (err) => {
                if (err) console.error('Error writing to file:', err);
            });
        });
    }

    static fetchAll(callback) {
        fs.readFile(productsFilePath, (err, data) => {
            if (err) {
                callback([]);
            } else {
                callback(JSON.parse(data));
            }
        });
    }
}

module.exports = Product;
