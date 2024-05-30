const joi = require("joi")
const  registerSchema = joi.object({
    name: joi.string().min(2).max(50).required(),
    role: joi.string().regex(/^(admin|seller|customer)$/),
    email: joi.string().email().required(),

 })

 const addressSchema = joi.object({
   stName: joi.string(),
    lat: joi.number(),
     long: joi.number(),
     wardNo: joi.number(),
    ruralDev: joi.string(),
    State: joi.string()
})

 const  updateUserSchema = joi.object({
   name: joi.string().min(2).max(50).required(),
   role: joi.string().regex(/^(admin|seller|customer)$/),
   address: joi.object({
      shipping: addressSchema.default(null),
      billing: addressSchema.default(null)
   }),
   status: joi.string().pattern(/^(active|inactive)$/).default('inactive')

})

 const otpVerifySchema = joi.object({
   email: joi.string().email().required(),
   otp: joi.string().required()
})

const resendOtpSchema = joi.object({
   email: joi.string().email().required()
   
})

 const loginSchema = joi.object({
    username: joi.string().email().required(),
    password: joi.string().min(6).required()
 })

const passwordSetSchema = joi.object({
   password: joi.string().min(8).required(),
   confirmPassword: joi.string().valid(joi.ref('password')).required()
})
const updatePasswordSchema = passwordSetSchema.keys({
   oldPassword: joi.string().required(),
})
 module.exports = {
    registerSchema,
    loginSchema,
    passwordSetSchema,
    otpVerifySchema,
    resendOtpSchema,
    updateUserSchema,
    updatePasswordSchema
 }