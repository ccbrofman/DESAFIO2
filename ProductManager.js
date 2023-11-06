

const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = this.getProductsFromFile();
    }

    getProductsFromFile() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    saveProductsToFile() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (!product) {
            console.log('No se encuentra el producto');
        } else {
            console.log('Producto encontrado', product);
        }
    }

    getProducts() {
        return this.products;
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('Los campos son obligatorios');
            return;
        }
        const id = this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
        const newProduct = { id, title, description, price, thumbnail, code, stock };
        this.products.push(newProduct);
        this.saveProductsToFile();
    }

    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.products[index] = { id, ...updatedProduct };
            this.saveProductsToFile();
        } else {
            console.log('No se encontró ningún producto con el ID especificado.');
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex((product) => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProductsToFile();
        } else {
            console.log('No se encontró ningún producto con el ID especificado.');
        }
    }
}

const filePath = path.join(__dirname, 'products.json');
const productos = new ProductManager(filePath);
console.log(productos.getProducts());
productos.addProduct({
    title: 'collar',
    description: 'collar cervical plano pediatrico',
    price: '15000',
    thumbnail: 'sin imagen',
    code: '3435',
    stock: '45'
});
productos.addProduct({
    title: 'torniquete',
    description: 'tactico',
    price: '40000',
    thumbnail: 'sin imagen',
    code: '3035',
    stock: '150'
});
console.log(productos.getProducts());
productos.getProductById(2);
