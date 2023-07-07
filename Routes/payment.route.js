const express = require("express");
// const Instamojo = require("instamojo-payment-nodejs");

const url = require("url");
const { getPayment, getPaymentDetails } = require("../Controllers/paymentController");


const paymentRouter = express.Router()


paymentRouter.post("/collect",getPayment) 


paymentRouter.post("/details",getPaymentDetails)

module.exports={paymentRouter}
