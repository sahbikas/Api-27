const AccessDenied = require("../exception/accessDenied.exception");


const permissionCheck = (role) => {
    return (req, res, next) => {
        try{
           const loggedinUser = req.authUser;
           if(
            (typeof role === 'string' && loggedinUser.role === role)
            ||
            (Array.isArray(role) && role.includes(loggedinUser.role))
           ) {
            next()
           }else{
            next(new AccessDenied())
           }
        }catch(exception){
           next(new AccessDenied)
        }
    }

}

module.exports = permissionCheck;