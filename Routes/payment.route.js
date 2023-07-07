const express = require("express");
// const Instamojo = require("instamojo-payment-nodejs");
const Insta = require('instamojo-nodejs');
require('dotenv').config()
const url = require("url");
const { UserModel } = require("../Model/user.model");
const {OrderModel} = require("../Model/order.model")

const paymentRouter = express.Router()


Insta.isSandboxMode(true); // For testing
 
Insta.setKeys(process.env.API_KEY,process.env.AUTH_KEY);



paymentRouter.post("/collect",async(req,res)=>{
  
  const {user}=req.body
 
 const userDoc= await UserModel.findOne({_id:user})
const order = await OrderModel.findOne({user,"orderStatus":"orderCreating"})
 
  var data = new Insta.PaymentData();

    data = {
        purpose: "The Jungle Juice Items", // REQUIRED
        amount: order.total, // REQUIRED and must be > ₹3 (3 INR)
        currency: "INR",
        buyer_name: userDoc.name, 
        email: userDoc.email,
        phone: 9057972772,
        send_email: false,
        send_sms: false,
        allow_repeated_payments: false,
        webhook: null,
        redirect_url: `https://profound-pasca-216246.netlify.app/afterpayment`

        // redirect_url: `http://localhost:8080/pay/callback?user_id=${req.body.userId}`
      };

      Insta.createPayment(data, function(error, response) {9
        if (error) {
          res.send(error)
          // some error
        } else {

          // Payment redirection link at response.payment_request.longurl
          const responseData = JSON.parse( response )
          const redirectUrl= responseData.payment_request.longurl
          //  console.log( redirectUrl );
          res.send({ "data":redirectUrl} )
        }
      });


 }
) 


// paymentRouter.get("/callback",(req,res)=>{

//   const url_part =  url.parse(req.url,true)
//   //  console.log(url_part)
//   // console.log(url_part.query)
// res.send(url_part.query)
// })


paymentRouter.post("/details",(req,res)=>{
  const {payment,request}=req.body
  Insta.getPaymentDetails(request, payment, function(error, response) {
    if (error) {
      // Some error
    } else {
      res.send({"msg":response})
      // console.log(response);
    }
  });
})

module.exports={paymentRouter}
