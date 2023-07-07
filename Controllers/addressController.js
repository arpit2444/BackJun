const {AddressModel} = require("../Model/address.model")


// get address
const  getAddress=async(req,res)=>{
    const {user}= req.body
const address = await AddressModel.find({user})
res.send(address)
}

// add address to database
const addAddress=async(req,res)=>{
    const {user} = req.body
    const payload= req.body

    const newAddress = new AddressModel(payload)
    await newAddress.save()
    res.send(newAddress)
}


// delete address
const deleteAddress=async(req,res)=>{
    const id = req.params.id
    await AddressModel.findByIdAndDelete({_id:id})
    res.send({"msg":"Address Deleted"})
}

module.exports={
    getAddress,
    addAddress,
    deleteAddress
}