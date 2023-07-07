const express = require("express");
const { AddressModel } = require("../Model/address.model");
const { getAddress, addAddress, deleteAddress } = require("../Controllers/addressController");

const addressRouter= express.Router()


addressRouter.get("/",getAddress)


addressRouter.post("/add",addAddress)

addressRouter.delete("/delete/:id",deleteAddress)



module.exports={
    addressRouter
}