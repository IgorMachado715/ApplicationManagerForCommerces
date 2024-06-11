const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.get("/:id", productsController.getProduct);

router.delete("/:id", productsController.deleteProduct);

router.get("/:productName?", productsController.getProducts);

router.patch("/:id", productsController.updateProduct);

router.post("/", productsController.insertProduct);

module.exports = router;
