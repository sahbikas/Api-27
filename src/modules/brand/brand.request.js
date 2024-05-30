const joi = require("joi")
const brandCreateRules = joi.object({

    title:  joi.string().min(2).required(),
    image: joi.object().empty(null, ""),
    slogan: joi.string().empty(null, ""), 
    showInHome: joi.boolean().default(false),
    status: joi.string().pattern(/^(active|inactive)$/),
      
})

const brandUpdateRules = joi.object({

    title:  joi.string().min(3).required(),
    image: joi.object().empty(null, ""),
    slogan: joi.string().empty(null, ""), 
    showInHome: joi.boolean().default(false),
    status: joi.string().pattern(/^(active|inactive)$/),
      
})

module.exports = {brandCreateRules, brandUpdateRules}