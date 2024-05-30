

const app = require("express").Router()

const auth = require("../../middlewares/auth.middleware")
const permissionCheck = require('../../middlewares/rbac.middleware')
const {ROLES} = require("../../config/constants.config")
const authCtrl = require('./auth.controller')
const bodyValidator = require('../../middlewares/validator.middleware')
const { registerSchema, otpVerifySchema, passwordSetSchema, resendOtpSchema, updateUserSchema, updatePasswordSchema} = require('./auth.request')
const {uploader, uploadPath} = require("../../middlewares/uploader.middleware")

app.post("/register",
uploadPath("user"),
uploader.single('image'), bodyValidator(registerSchema),authCtrl.registerProcess)

app.post("/verify-otp",bodyValidator(otpVerifySchema), authCtrl.verifyOTP)

app.post("/resend-otp",bodyValidator(resendOtpSchema), authCtrl.resendOTP)

app.post("/activate/:token",bodyValidator(passwordSetSchema), authCtrl.activateUser)

app.post("/forget-password", authCtrl.forgetPassword)

app.post("/update-password/:token", authCtrl.updatePassword)



app.post("/login", authCtrl.login)

app.get("/logout",auth, authCtrl.logOut)

 app.get("/me",auth, authCtrl.loggedInUser)
app.put("/user/:userId",
auth,
uploader.single('image'),
permissionCheck(ROLES.ADMIN),
bodyValidator(updateUserSchema),
 authCtrl.updateUser)

 app.post("/change-password", auth, bodyValidator(updatePasswordSchema), authCtrl.changePassword)

module.exports = app;