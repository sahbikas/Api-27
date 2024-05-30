class AppError extends Error{
    constructor({
       
        data = null,
      message = null,
        code = 500
    }) {
   super()
   this.data = data;
   this.message = message;
   this.code = code
    }
}

module.exports = AppError;