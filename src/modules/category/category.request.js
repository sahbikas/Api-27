const joi = require("joi")
const categoryCreateRules = joi.object({

    title:  joi.string().min(2).required(),
    image: joi.object().empty(null, ""),
    showInHome: joi.boolean().default(false),
    showInMenu: joi.boolean().default(false),
    parentId: joi.string().empty(null, ""),
    status: joi.string().pattern(/^(active|inactive)$/),
      
})

const categoryUpdateRules = joi.object({

    title:  joi.string().min(3).required(),
    image: joi.object().empty(null, ""),
    showInHome: joi.boolean().default(false),
    showInMenu: joi.boolean().default(false),
    parentId: joi.string().empty(null, ""),
    status: joi.string().pattern(/^(active|inactive)$/),
      
})

module.exports = {categoryCreateRules, categoryUpdateRules}