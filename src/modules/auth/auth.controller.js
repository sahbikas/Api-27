require("dotenv").config()
const AppError = require("../../exception/app.excpetion");

const emailSvc = require("../../services/email.service")
const bcrypt = require("bcryptjs");
const validationError = require("../../exception/validation.exception");
const jwt = require('jsonwebtoken');
const authSvc = require("./auth.service");
const { randomString } = require("../../utilities/helpers");

class AuthController {
    registerProcess = async (req, res, next)=> {
        try{
        
            const data = authSvc.transformDataToRegister(req.body, req.file)

         let userRegister = await authSvc.registerUser(data)
         if(userRegister) {
      await  authSvc.sendRegistrationEmail(data.email, data.name, data.otp, data.expiryTime)
           res.json({data: userRegister, message: "Your account has been successfuly registered. please check your email to activate your account.", meta: null})
         }else{
            throw new AppError({data: null, message: "Register faild", code: 400 })
         }
        
        }catch(exception){
            console.log("registerFunc:", exception)
            next(exception)
            
        }

    }

    resendOTP = async (req, res, next) => {
        try{
            const email = req.body.email;
           // console.log(email)
            const userDetail = await authSvc.getSingleUserByFilter({
                email: email
            })
            if(!userDetail) {
               // console.log(userDetail)
                throw new AppError({message: "User dose not exists", code: 400})
            }else{
                if(!userDetail) {
                   throw new AppError({message: "Your account has been already activated", code: 400})
                }else{
                    const updateBody = {
                        otp: randomString(6),
                        expiryTime: new Date(Date.now() + (60*2*60*1000))
        
                      }
                      const update = await authSvc.updateUser(userDetail._id, updateBody)
                    await  authSvc.sendResendOtpMail({to: userDetail.email, name: userDetail.name, otp: updateBody.otp})
                      res.json({
                        result: updateBody,
                        message: "Otp Code re-Sent",
                        meta: null
                      })
                }
                }
        } catch(exception) {
            console.log("resendOTP", exception)
            next(exception)
        }
    }

    verifyOTP = async (req, res, next )=> {
  try{
   const {email, otp} = req.body;
   const userDetail = await authSvc.verifyOtpCode({
    email: email,
    otp: otp
   });
   if(!userDetail) {
      throw new AppError({message: "incorrect OTP", code: 400})
   } else{
    const now = Date.now()
    const expiryTime = userDetail.expiryTime.getTime()
    if(expiryTime < now) {
        throw new AppError({message: "otp expired", code: 400})
    } else{
        const token = randomString(100)
     const response =   await authSvc.updateUser(userDetail._id, {
            authToken: token
            
            
        })
        if(response) {
            res.json({
                result: token,
                message: "OTP Code verifed",
                 meta: null
            })
        } else {

            throw new AppError({message: "User not found", code: 400})
        }
        
    }
    console.log(expiryTime)
   }
  }catch(exception){
    console.log("verify: ", exception)
    next(exception)
  }
        
    }

    activateUser = async (req, res, next)=> {
         try{
         let token = req.params.token;
         //console.log(token)
         let password = req.body.password;

         const hash = bcrypt.hashSync(password, 10);

         const userDetail = await authSvc.getSingleUserByFilter({
                   authToken: token
                   
         })
         if(!userDetail){
            //console.log(userDetail)
            throw new AppError({message: "Auth Token dose not exists", code: 400})
         }else{
         const updated =   await authSvc.updateUser(userDetail._id, {
                otp: null,
                expiryTime: null,
                authToken: null,
                status: "active",
                password: hash
            })
            res.json({
                result: updated,
                message: "Your password has been set successfully.",
                meta: null
    
             })
         }
        
         }catch(exception){
            console.log(exception)
               next(exception)
         }
        
    }

    forgetPassword = (req, res, next)=> {
   
    }

    updatePassword = (req, res, next)=> {
     
    }

    login = async (req, res, next) => {
        try{
    const data = req.body;
    const userDetail = await authSvc.getSingleUserByFilter({
          email: data.email
    })

    if(!userDetail) {
        throw new AppError({message: "User dose not exists.", code: 400})
    } else{
        const verify = bcrypt.compareSync(data.password, userDetail.password)
        if(verify) {
            if(userDetail.status === 'active') {

            
         const payload = {id:userDetail._id}
         
         const token = jwt.sign(payload, process.env.JWT_SECRET, {
             expiresIn: Date.now()+7200000,
             
         });
         const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
             expiresIn: "1 day",
             
         });
         res.json({
             result: {
                 token: token,
                 type: "Bearer",
                 refreshToken: refreshToken
             },
             message: "Your are logged in.",
             meta: null
         })
        }else {
           throw new AppError({data: null, message: "Your account is not activated or has been Suspended. Please contactact Admin.", code: 401}) 
        }
        }else {
         throw new AppError({data: null, message: "Credentials does not match", code: 400 })
        }
    }
   
        }catch(exception){
            console.log("login", exception)
           next(exception)
        } 
     }
    
     logOut = (req, res, next) => {
        
     }

     loggedInUser = (req, res, next) => {

        let user = req.authUser;
        res.json({
            result: {
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
                Image: user.image,
                address: user.address
            },
            message: "Your Profile",
            meta: null
        })
        
     }

     updateUser = async (req, res, next) => {
        try{
            const payload = req.body;
            const file = req.file;
            const formattedData = authSvc.transformDataToUpdate(payload, file)
            const updateUser = await authSvc.updateUser(req.params.userId, formattedData)
            res.json({
                result: updateUser,
                message: "Update Status msg",
                meta: null
            })
        }catch(exception){
            console.log(exception)
            next(exception)
        }
    }
    changePassword = async(req, res, next) => {
        try{
            const payload = req.body;
            if(payload.oldPassword === payload.password) {
                throw new validationError({data: {password: "Old password and new password are same"}, message: "Validation Error"})
            }
            const loggedInUser = req.authUser;
            if(bcrypt.compareSync(payload.oldPassword, loggedInUser.password)){
                throw new validationError({data: {oldPassword: "Old password does not match"}, message: "Validation Error"})
            }
            const hashNew = bcrypt.hashSync(payload.password, 10)

            await authSvc.updateUser(loggedInUser._id,{
                password: hashNew
            })
             res.json({
                result: null,
                message: "Your password has benn chenged successfully",
                meta: null
             })
        }catch(exception){
            next(exception)
        }
    
    }
}

const authCtrl = new AuthController();
module.exports = authCtrl