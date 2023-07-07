const {OrderModel} = require("../Model/order.model")
const { CartModel } = require("../Model/cart.model");


// get orders

const getOrders=async(req,res)=>{
    const {user}= req.body
const order = await OrderModel.find({user,"orderStatus":"placed"}).sort({"updatedAt":-1})
res.send(order)
}


// post order

const postOrder=async(req,res)=>{
    const {user} = req.body
    const {addressId} = req.body
    const {total} = req.body       
    let cart = await CartModel.findOne({user})

    let existingOrder= await OrderModel.findOne({user,"orderStatus":"orderCreating"})
    // console.log(existingOrder)
    if(existingOrder){
    await OrderModel.findByIdAndDelete({_id:existingOrder._id})
    }

    const order=  new OrderModel({user,products:cart.products,addressId,total}) 
    await order.save()
    res.send({"msg":"Order created"})
}


const updateOrder=async(req,res)=>{
    const {user} = req.body
    const payload = req.body
let order=await OrderModel.findOneAndUpdate({user,"orderStatus":"orderCreating"},payload)
res.send({"msg":"order status updated"})
}


const deleteOrder=async(req,res)=>{
    const {user} = req.body
    await OrderModel.findOneAndDelete({user,"orderStatus":"orderCreating"})
    res.send({"msg":"order deleted"})
}

module.exports={
getOrders,
postOrder,
updateOrder,
deleteOrder
}