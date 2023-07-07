const mongoose = require("mongoose");
const { addressScheama } = require("./address.model");

const cartScheama = mongoose.Schema({
    // productId:{type:mongoose.Schema.Types.ObjectId,ref:"product"},
    // qty:{type:Number,min:1},
    user:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
    products:[{productId:{type:String},name:{type:String},price:{type:Number},qty:{type:Number}}]
},
{ timestamps:true }
)

const CartModel = mongoose.model("cart",cartScheama)

module.exports={
    CartModel
}



