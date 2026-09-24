const express = require("express");
const router = express.Router();

const productController = require("../controller/product.controller");

router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductDetail);
router.post("/products", productController.addProduct);

module.exports = router;