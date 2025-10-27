const express = require("express");
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteUpdated,
} = require("../controllers/productController");

router.get("/products", getProducts);

router.put("/products/:id", updateProduct);

router.post("/products", createProduct);

router.delete("/products/:id", deleteUpdated);

module.exports = router;
