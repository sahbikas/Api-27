class GeneralValidationError extends Error{
    constructor({ message = "validation Failed", code = 422}){
    super()
   this.data = null;
   this.message = message;
   this.code = 400;
}
}
module.exports = GeneralValidationError