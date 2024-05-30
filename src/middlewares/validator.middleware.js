const ValidationError = require('../exception/validation.exception')
const bodyValidator = (schema, imageFieldName=null) => {
    return async (req, res, next) => {
        try{
          const data = req.body;
          
          if(imageFieldName) {
            
            if(req.file) {
                data[imageFieldName] = req.file
            }else if(req.files){
               data[imageFieldName] = req.files;
            }else{
                data[imageFieldName] = null
            }
          }
          console.log({data})
            await schema.validateAsync(data)
            next()
        }catch(exception){
            console.log(exception)
            const errMsg = {}
            exception.details.map((err) => {
                errMsg[err.context.label] = err.message
            })
            
            next(new ValidationError({data: errMsg}))
        }
    }
}

module.exports = bodyValidator