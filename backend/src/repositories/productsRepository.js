const productsModel = require('../models/productsModel');
const Sequelize = require("sequelize");

async function productExists(productName, code) {
  const count = await productsModel.count({ where: { productName, code } });
  return count > 0;
}

async function getProductById(id) {
  const product = await productsModel.findOne({
    where: { id }
  });
  return product;
}
  
  function getProduct(id) {
    return productsModel.findByPk(id);
  }

  async function getOneProduct(productName, code) {
    const product = await productsModel.findOne({
      where: { productName, code },
    });
    return product;
  }

  function getProducts(productName, page = 1) {
    const options = {
      where: {},
      order: [
        ["productName", "ASC"],
      ],
      limit: 10,
      offset: 10 * (page - 1),
      distinct: true,
    };

    if (productName) {
      if (productName.length < 6)
        options.where = { productName: { [Sequelize.Op.like]: `%${productName}%` } };
      else options.productName = { productName };
    }
  
    return productsModel.findAndCountAll(options);
  }

  async function insertProduct(newProduct) {
    const alreadyExists = await productExists(
        newProduct.productName,
        newProduct.code
    );
    if (alreadyExists)
      throw new Error(`Already exists a product with this name and/or code.`);
    return productsModel.create(newProduct);
  }
  
  function deleteProduct(id) {
    return productsModel.destroy({
      where: {id},
    });
  }


async function updateProduct(id, newProducts){
    const currentProduct = await getProduct(id);

    if (newProducts.productName && newProducts.productName !== currentProduct.productName)
        currentProduct.productName = newProducts.productName;

    if (newProducts.code && newProducts.code !== currentProduct.code)
        currentProduct.code = newProducts.code;

    if (newProducts.sellPrice && newProducts.sellPrice !== currentProduct.sellPrice)
        currentProduct.sellPrice = newProducts.sellPrice;

    if (newProducts.units && newProducts.units !== currentProduct.units)
        currentProduct.units = newProducts.units;

    if (newProducts.buyPrice && newProducts.buyPrice !== currentProduct.buyPrice)
        currentProduct.buyPrice = newProducts.buyPrice;

    if (newProducts.ncm && newProducts.ncm !== currentProduct.ncm)
        currentProduct.ncm = newProducts.ncm;

    if (newProducts.category && newProducts.category !== currentProduct.category)
        currentProduct.category = newProducts.category;

    if (newProducts.obs && newProducts.obs !== currentProduct.obs)
        currentProduct.obs = newProducts.obs;

    await currentProduct.save();
    return currentProduct;

}

module.exports = {
    getProduct,
    updateProduct,
    getProducts,
    insertProduct,
    deleteProduct,
    getOneProduct,
    getProductById
}