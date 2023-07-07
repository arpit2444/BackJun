const {CartModel} = require("../Model/cart.model")

// get all cart items of a particular user
const getCart=async(req,res)=>{
    const {user}= req.body
const cart = await CartModel.find({user})
res.send(cart)
}

// add item to cart
const addToCart=async(req,res)=>{
    const {user} = req.body;
    const payload = req.body;
    // const {productId} = req.body
    // let existingProduct = await CartModel.findOne({user,productId})
    
    // if(existingProduct){
       
    //   newQty= existingProduct.qty+1
    //   await CartModel.findByIdAndUpdate({_id:existingProduct._id},{qty:newQty})
    //   res.send({"msg":"Item's Quantity Updated"})
    // }
    // else{
        // const newItem = new CartModel({productId,user,qty:1})
        // await newItem.save()
        // res.send({"msg":"Item Added to Cart"})}
    
        let existingCart= await CartModel.findOne({user})
        let existingProduct = await CartModel.findOne({user,"products.productId": payload.products[0].productId})
    
        
        if(existingCart){
        const id = existingCart._id
         const newItem=  payload.products[0]
         if(existingProduct){
            res.send({"msg":"Already Added"})
         }
         else{
         const forUpdate=[...existingCart.products,newItem]
         await CartModel.findByIdAndUpdate({_id:id},{products:forUpdate})
         res.send({"msg":"Item Added to cart"})
         }
        }
        else{
            const newCart = new CartModel(payload)
            await newCart.save()
            res.send({"msg":"Item Added to Cart"})
        
        }
    }

// update cart 
const updateQty=async(req,res)=>{
    const id= req.params.id;
    const {user} = req.body;
    const {payload} = req.body;
    await CartModel.findOneAndUpdate({user,"products.productId":id},{"products.$.qty":payload})
    res.send({"msg":"cart updated"})
    
    // const item = await CartModel.find({user,"products.productId":id})
    // console.log({"id":id})
    // console.log(item)
    // res.send(item)
    // // if((payload==-1 && item.qty>1) || payload==1 ){
    // let  newQty =  item.qty+payload
    // // console.log({"item":item})
     }


// delete item from cart array
const deleteItem=async(req,res)=>{
    const id = req.params.id
    const {user} = req.body
    await CartModel.findOneAndUpdate(
        {user},
        {"$pull": {"products": {"productId": id}}}
    )
    res.send("deleted")
}

// attach address 
// const addAddress=async(req,res)=>{
//     const {user} = req.body;
//     const id = req.params.id
//     await CartModel.findOneAndUpdate({user},{addressId:id})
//     res.send("address attached")
// }

const deleteCart=async(req,res)=>{
    const {user}=req.body
    await CartModel.findOneAndDelete({user})
    res.send({"msg":"cart deleted"})
}

module.exports={
    getCart,
    addToCart,
    updateQty,
    deleteItem,
    deleteCart
}