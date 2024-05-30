require("dotenv").config()
const AppError = require("../exception/app.excpetion")
const nodemailer = require("nodemailer")
class EmailService {
    transporter;
    constructor() {
        try{
           this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
           })
        }catch(exception){
            console.log("MailConnect: " , exception)
            throw new AppError({data: null, message: "Error Connecting SMTP server", code: 500 })
        }

       
    }
    sendEmail = async({to,subject, message}) => {
       try{
            const response = await this.transporter.sendMail({
           to: to,
           from: process.env.SMTP_FROM,
           subject: subject,
           html: message,
          
            });
            return response;
       }catch(exception){
        console.log("EmailSendError: ", exception)
        throw new AppError({dataa: null, message: "Email send Error" , code: 500})
       }   
    }
}

const emailSvc = new EmailService()
module.exports = emailSvc;