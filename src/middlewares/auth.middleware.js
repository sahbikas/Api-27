require('dotenv').config()
const AppError = require("../exception/app.excpetion");
const Unauthorized = require("../exception/unauthorized.exception")
const jwt = require('jsonwebtoken');
const authSvc = require('../modules/auth/auth.service');

const auth = async (req, res, next) => {
    try{
  let  token = req.headers['authorization'];
  if(!token) {
    throw new AppError({data: null, message: "Token is required", code: 401})
  } else{
      token = token.split(" ").pop()
      if(!token) {
        throw new AppError({data: null, message: "Token is required", code: 401})
      }else{
        const data = jwt.verify(token, process.env.JWT_SECRET)

       const userDetail = await authSvc.getSingleUserByFilter({
        _id: data.id
       })
       if(!userDetail) {
        next(new AppError({message: "user dose not exists", code: 401}))
       }else{
        req.authUser = userDetail;
        next()
       }


        
      }
  }
    }catch(exception) {
        if(exception instanceof jwt.JsonWebTokenError){
            exception.code = 401;
            exception.message = exception.message;
            
        }
       next(exception ) 
    
    }
}

module.exports = auth