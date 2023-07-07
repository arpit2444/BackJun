const {ProductModel} =require("../Model/product.model")

// get all products

const getProduct=async(req,res)=>{
    const payload=req.params.category
   const products= await ProductModel.find({category:payload})
   res.send(products)
}

// add new product
const addProduct=async(req,res)=>{
    const data = req.body;
    
    const newProduct = new ProductModel(data)
    await newProduct.save()
    res.send({"msg":"new product added"}) 
    }

// update product details
const updateProduct=async(req,res)=>{
    const _id = req.params.id;
    const payload = req.body;
    await ProductModel.findByIdAndUpdate({_id},payload)
    res.send({"msg":"product has updated"})
}


// delete product
const deleteProduct=async(req,res)=>{
    const _id = req.params.id;
    await ProductModel.findByIdAndDelete({_id})
res.send({"msg":"product has removed"})
}

module.exports={
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}