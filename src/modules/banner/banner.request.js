const joi = require("joi")
const bannerCreateRules = joi.object({

    title:  joi.string().min(3).required(),
    image: joi.object().required(),
    link: joi.string().uri().empty(null, ""), 
    status: joi.string().pattern(/^(active|inactive)$/),
      
})

const bannerUpdateRules = joi.object({

    title:  joi.string().min(3).required(),
    image: joi.object().empty(null, ""),
    link: joi.string().uri().empty(null, ""), 
    status: joi.string().pattern(/^(active|inactive)$/),
      
})

module.exports = {bannerCreateRules, bannerUpdateRules}