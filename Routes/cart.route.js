const express = require("express");
const { CartModel } = require("../Model/cart.model");
const { getCart, addToCart, updateQty, deleteItem, deleteCart } = require("../Controllers/cartController");

const cartRouter = express.Router()

// get all cart items of a particular user
cartRouter.get("/",getCart)

// add item to cart
cartRouter.post("/add",addToCart)


// update cart 

cartRouter.patch("/update/:id",updateQty)


// delete item from cart array
cartRouter.patch("/deleteItem/:id",deleteItem)


// cartRouter.patch("/address/:id",addAddress)

// delete Cart
cartRouter.delete("/delete",deleteCart)

module.exports={
    cartRouter
}