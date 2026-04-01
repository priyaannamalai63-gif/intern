const express = require("express");
const router = express.Router();


const {
  createProduct,
  getProducts,
  editProduct,
  deleteProduct,

} = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/products",authMiddleware, createProduct);

router.get("/products",authMiddleware,  getProducts);
router.put("/products/:id",authMiddleware,  editProduct);
router.delete("/products/:id",authMiddleware,  deleteProduct);

module.exports = router;
