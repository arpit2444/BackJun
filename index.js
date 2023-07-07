const express = require("express");
const { connection } = require("./db");
var cors = require('cors')
const { userRouter } = require("./Routes/user.routes");
const { productRouter } = require("./Routes/product.route");
const { cartRouter } = require("./Routes/cart.route");
const { authenticate } = require("./Middleware/authentication");
const { orderRouter } = require("./Routes/order.route");
const { addressRouter } = require("./Routes/address.route");
const { paymentRouter } = require("./Routes/payment.route");

require('dotenv').config()



const app = express()

app.use(express.json());
// app.use(cors())
app.use(cors({ origin: '*' }))

app.use("/user",userRouter)

app.use("/product",productRouter)

app.use(authenticate)

app.use("/cart",cartRouter)
app.use("/address",addressRouter)
app.use("/order",orderRouter)

app.use("/pay",paymentRouter)



app.listen(process.env.PORT,async()=>{
    try{
      await connection
      console.log("connected to database")
    }
    catch(err){
        console.log(err)
    }
    console.log(`server is running on ${process.env.PORT}`)
})
