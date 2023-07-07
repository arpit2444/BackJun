const express = require("express");
const { OrderModel } = require("../Model/order.model");
const { getOrders, postOrder, updateOrder, deleteOrder } = require("../Controllers/orderControllers");

const orderRouter = express.Router()


orderRouter.get("/",getOrders)


orderRouter.post("/add",postOrder)


orderRouter.patch("/update",updateOrder)

// as order status convet to "place" the cart should be deleted
orderRouter.delete("/delete",deleteOrder)

module.exports={
    orderRouter
}