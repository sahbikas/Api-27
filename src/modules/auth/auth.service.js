const AppError = require("../../exception/app.excpetion");
const { randomString } = require("../../utilities/helpers");
const UserModel = require("../user/user.model");
const emailSvc = require("../../services/email.service");
const validationError = require("../../exception/validation.exception");

class AuthService {
    transformDataToRegister = (payload, file = null) => {
        const data = payload;
        if(file) {
           data.image = file.filename
        }
       
        
        //data.activationToken = randomString(100);

        data.otp = randomString(6);
        const timeAfterTowhours =new Date(Date.now() + (60*2*60*1000));
        //new Date()
        data.expiryTime = timeAfterTowhours
        data.status = "inactive"
        return data;
    }

    transformDataToUpdate = (payload, file = null) => {
        const data = payload;
        if(file) {
           data.image = file.filename
        }
       
        return data;
    }
    registerUser = async (data) => {
        try{
           
            const user = new UserModel(data)
            return await user.save()
        }catch(exception) {
            if(+exception.code === 11000) {
               throw new AppError({message: "Email should be unique", code: 400}) 
            }
            throw exception
        }
    }
    sendRegistrationEmail = async (email, name, token, expiryTime) => {
        try{
            const response = await emailSvc.sendEmail({
                to: email,
                subject: "Activate your account",
                message: `
                 dear ${name}<br/>,
                 your OPT code is: <b>${token}</b><br/>
                 Your Opt code is going to bee expire on: <b>${expiryTime}</b><br/>
                 please verify your account within 2 hourss.<br/>
                 <p>Regards.</p>
                 <p>System Administration</p>
                 <p><small><em>Please do not reply to this email.</em></small></p>
    
    
                `
               })
        } catch(mailOptExcp){
           // console.log(mailOptExcp)
           throw new AppError({message: "Error sending Registration email.", code: 400})
        }
    }
    sendResendOtpMail = async({to, name, otp}) => {
        try{
            const response = await emailSvc.sendEmail({
                to: to,
                subject: "Re-Otp Code!!!",
                message: `
                 dear ${name}<br/>,
                You have requested the otp code, your OPT code is: <b>${otp}</b><br/>
                 Your Opt code is going to be expired in 2 hours<br/>
                 please verify your account <br/>
                 <p>Regards.</p>
                 <p>System Administration</p>
                 <p><small><em>Please do not reply to this email.</em></small></p>
    
    
                `
               })
        }catch(exception){
            console.log("error", exception)
            throw exception
        }
    }
    verifyOtpCode = async({email, otp}) => {
       try{
         const userDetail = await UserModel.findOne({
            email: email,
            otp: otp
         })
         return userDetail
         //console.log(userDetail)
       } catch(exception){
        throw exception
       }
    }

    getSingleUserByFilter = async(filter) => {
        try{
           const userDetail = await UserModel.findOne(filter)
           return userDetail;
        }catch(exception) {
            throw exception
        }
    }
    updateUser = async (id, data) => {
        try{
            console.log(id, data)
           const updated = await UserModel.findByIdAndUpdate(id, {
            $set: data
           })
           if(!updated) {
            throw new validationError({data: {user: "User does not exist"}, message: "User not found"})
           }
           return updated;
        }catch(exception) {
            throw exception

        }
    }
}

const authSvc = new AuthService()
module.exports = authSvc;