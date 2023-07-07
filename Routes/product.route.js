const express = require("express");
const { ProductModel } = require("../Model/product.model");
const { getProduct, addProduct, updateProduct, deleteProduct } = require("../Controllers/productController");

const productRouter = express.Router()

// get all products
productRouter.get("/:category",getProduct)


// add new product
productRouter.post("/add",addProduct)


// update product details
productRouter.patch("/updater/:id",updateProduct)

// delete product
productRouter.delete("delete/:id",deleteProduct)


module.exports={
    productRouter
}