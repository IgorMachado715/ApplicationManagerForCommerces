const productsRepository = require('../repositories/productsRepository');

async function getProduct(req, res, next) {
    const id = req.params.id;
    const product = await productsRepository.getProduct(id);
    res.json(product);
  }

async function getProducts(req, res, next) {
    const productName = req.params.productName && req.params.productName.toUpperCase() && req.params.productName.toLowerCase();
    const page = parseInt(req.query.page);
    const result = await productsRepository.getProducts(productName, page || 1);
    res.json(result);
  }

async function insertProduct(req, res, next) {
    const newProduct = validateProduct(req.body);
    const savedProduct = await productsRepository.insertProduct(newProduct);
  
    res.status(201).json(savedProduct.get({ plain: true }));
  }

async function updateProduct(req, res, next) {
    const id = req.params.id;
    const newProduct = validateProduct(req.body);
  
    const currentProduct = await productsRepository.getProduct(id);
  
    const oldIndexes = currentProduct.indexes
      ? currentProduct.indexes.split(",")
      : [];
  
    const updatedProduct = await productsRepository.updateProduct(id, newProduct);
  
    res.json(updatedProduct);
  }

async function deleteProduct(req, res, next) {
    const id = req.params.id;  
    await productsRepository.deleteProduct(id);
  
    res.sendStatus(204);
  }

async function getProductSettings(req, res, next){
    const id = res.locals.token.id;
    const product = await productsRepository.getProductById(id);
    res.json(product);
}

async function updateProductSettings(req, res, next){
    const id = res.locals.token.id;
    const newProductSettings = req.body;
    await productsRepository.updateProduct(id, newProductSettings);
    res.sendStatus(200);
}

function validateProduct(newProduct) {
    return newProduct;
  }

module.exports = {
    getProductSettings,
    updateProductSettings,
    getProduct,
    getProducts,
    insertProduct,
    updateProduct,
    deleteProduct,
}