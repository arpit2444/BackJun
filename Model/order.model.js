const mongoose = require("mongoose");

const orderScheama = mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    addressId:{type:mongoose.Schema.Types.ObjectId, ref:"address"},
    products:[{productId:{type:String},name:{type:String},price:{type:Number},qty:{type:Number}}],
    total:{type:Number},
    paymentStatus: { type: String, enum: ["pending", "completed", "failed", "refund"],default:"pending"},
    orderStatus: { type: String, enum: ["orderCreating","placed", "packed", "shipped", "delivered"],default: "orderCreating"},
  },
{ timestamps:true }
) 

const OrderModel = mongoose.model("order",orderScheama)

module.exports={OrderModel}