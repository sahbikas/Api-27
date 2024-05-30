class validationError extends Error{
    constructor({data = null, message = "validation Failed", code = 422}){
    super()
   this.data = data;
   this.message = message;
   this.code = code;
}
}
module.exports = validationError