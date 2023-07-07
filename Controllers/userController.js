const {UserModel} = require("../Model/user.model")
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config()


// user get route

const getUser=async(req,res)=>{
    const {user} = req.body
    const userDetails = await UserModel.find({_id:user})
    res.send(userDetails)
}


//user registration route 

const addUser=async(req,res)=>{
    const {name,email,password}=req.body;
    const checkUser = await UserModel.find({email})
    if(checkUser.length>0 && checkUser[0].isVerified==true){
       console.log(checkUser.length)
       res.send({"msg":"This Email account is Already Registered, Please log in"})
    }
    else if(checkUser.length>0){
       res.send({"msg":"A verification Email has been Sent Already, if not Please try again after 5 Minutes"})
    }
    else{
    bcrypt.hash(password, 5, async(err, hash)=> {
       if(err){
           res.send(err)
       }
       else{
           const newuser = new UserModel({name,email,password:hash,isVerified:false})   // for verfication added isVeified as false initially
           await newuser.save()
   
           //    EmailSender()
           var transporter = nodemailer.createTransport({
               host: "smtp.gmail.com",
               port: 587,
               secure: false, // true for 465, false for other ports
               auth: {
                 user: "arpitjain2444@gmail.com", // generated ethereal user
                 pass: `${process.env.smtpPassword}`, // generated ethereal password
               },
             });
              const newuser2= await UserModel.find({email})
   
   
         
   
              let info = await transporter.sendMail({
                from: '"Jungle Juice 👻" <arpitjain2444.com>', // sender address
                to: email, // list of receivers
                subject: "Verify your Email", // Subject line
                // text: "Hello world?", // plain text body
                html: `<b>Hi `+newuser2[0].name+` , Please Click here to <a href="https://profound-pasca-216246.netlify.app/emailverify?userId=`+newuser2[0]._id+`">Verify</a> Your Email </b>`, // html body
              });
   
   // if user do not verify, deleting it from database
   
              setTimeout(async()=>{
               const newuser3= await UserModel.find({email})
                 if(newuser3[0].isVerified==false){
                   await UserModel.findOneAndDelete({email})
               }
              },4 * 60 * 1000)
   
   
           res.send({"msg":"We have sent you an Email, Please Verify Your Account"})
       }
   });
   }}



// user login

   const signinUser=async(req,res)=>{
    const {email,password} = req.body
    const user = await UserModel.find({email})
    if(user.length>0 && user[0].isVerified==true){
    bcrypt.compare(password, user[0].password, function(err, result) {
        if(result){ 
            var token = jwt.sign({ userId: user[0]._id }, 'shhhhh');
             res.send({"msg":"signin successfully","token":token,"name":user[0].name})
        }
        else{
            res.send({"msg":"wrong credientials","error":err})
        }
        // result == true
    })}
    else{
        res.send({"msg":"wrong credientials"})
        
    }
}



// Email verification
const verifyUser=async(req,res)=>{
    const id = req.params.id
await UserModel.findByIdAndUpdate({_id:id},{isVerified:true})
res.send({"msg":"account verified"})
}



// forgot password

const forgotUser=async(req,res)=>{
    const {email}= req.body;
    const existuser= await UserModel.find({email,isVerified:true})
console.log(existuser)
    if(existuser.length>0){
// EmailSender()
var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "arpitjain2444@gmail.com", // generated ethereal user
      pass: `${process.env.smtpPassword}`, // generated ethereal password
    },
  });

let info = await transporter.sendMail({
  from: '"Jungle Juice 👻" <arpitjain2444.com>', // sender address
  to: email, // list of receivers
  subject: "Forgot Password", // Subject line
  // text: "Hello world?", // plain text body
  html: `<b>Please Click here to <a href="https://profound-pasca-216246.netlify.app/resetpass?userId=`+existuser[0]._id+`">change password</a> </b>`, // html body
})
res.send({"msg": "Password Reset link has been sent to your Email"})
}
else{
    res.send({"msg":"This Email Account is not Registered"})
}
}

// Reset Password

const resetUser=(req,res)=>{
    const id = req.params.id
    const {password} = req.body

    bcrypt.hash(password, 5, async(err, hash)=> {
        if(err){
            res.send(err)
        }
        else{
           await UserModel.findByIdAndUpdate({_id:id},{password:hash})
           res.send({"msg":"Your password has been updated"})
        }
})
}


module.exports={
getUser,
addUser,
signinUser,
verifyUser,
forgotUser,
resetUser
}
