const mongoose = require("mongoose")

const productScheama = mongoose.Schema({
name:{type:String},
price:{type:Number},
category:{type:String,enum:["FRUCO","FRUCO TWO FRUITS","FRUIT SHELLS","MIX JUICES", "PLAIN JUICE","SHAKES"]},
image:{type:String},
status:{type:String,enum:["Available","Out of Stock"]}
})

const ProductModel = mongoose.model("product",productScheama)

module.exports={
    ProductModel
}