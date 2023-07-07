const mongoose= require("mongoose");

const userScheama = mongoose.Schema({
name:{type:String},
email:{type:String,required:true},
password:{type:String},
isVerified:{type:Boolean}
})


const UserModel = mongoose.model("user",userScheama)

module.exports={
    UserModel
}


