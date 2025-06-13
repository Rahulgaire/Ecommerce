const express = require('express');
const {
  createProduct,
  getAllProduct,
  deleteAllProduct,
  deleteOneProduct,
  editProduct,
} = require("../controller/product.controller.js");
const uploadSingleImage = require('../middleware/upload.middleware.js');
const productRouter = express.Router();

productRouter.get('/get-products',getAllProduct)
productRouter.post('add-product',uploadSingleImage('image') ,createProduct)
productRouter.delete('delete-product',deleteAllProduct)
productRouter.delete('delete-product/:id',deleteOneProduct)
productRouter.delete('edit-product/:id',editProduct)


module.exports = productRouter