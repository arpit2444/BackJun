const express = require("express");
const { UserModel } = require("../Model/user.model");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");
const { authenticate } = require("../Middleware/authentication");
const { getUser, addUser, signinUser, verifyUser, forgotUser, resetUser } = require("../Controllers/userController");


const userRouter = express.Router()

// user get route
userRouter.get('/',authenticate,getUser)

//user registration route 

userRouter.post("/register",addUser)

// user login

userRouter.post("/login",signinUser)


// Email verification  isVerified=true

userRouter.patch("/verify/:id",verifyUser)

// forgot password

userRouter.post("/forgotpass",forgotUser)

// Reset Password

userRouter.patch("/reset/:id",resetUser) 


module.exports={
    userRouter
}