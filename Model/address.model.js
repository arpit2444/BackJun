const mongoose = require("mongoose");

const addressScheama = mongoose.Schema({
   user:{type:mongoose.Schema.Types.ObjectId, ref:"user"},
   Full_Name:{type:String},
   Contact: {type:Number},
   Pincode:{type:Number},
   Address:{type:String},
   Landmark:{type:String},
   State:{type:String,default: 'Maharashtra'},
   City:{type: String, default: 'Mumbai'}
})

const AddressModel = mongoose.model("address",addressScheama)

module.exports={
    AddressModel,
    addressScheama
}



