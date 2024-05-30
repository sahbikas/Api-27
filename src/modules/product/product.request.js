const joi = require("joi")
const productCreateRules = joi.object({

    title:  joi.string().min(2).required(),
    categories: joi.array().items(joi.string()).empty(null, "").default(null),
    summary: joi.string().required(),
    description: joi.string().empty(null, "").default(null),
    price: joi.number().min(1).required(),
    discount: joi.number().min(0).max(100).default(0),
    attributes: joi.array().items(joi.object({
      Key: joi.string(),
      value: joi.array().items(joi.string())
    })).empty(null, "").default(null),
    tags: joi.array().items(joi.string()).empty(null, ""),
    brand: joi.string().empty(null, "").default(null),
    seller: joi.string().empty(null,"").default(null),
    status: joi.string().pattern(/^(active|inactive)$/),
    showInHome: joi.boolean().default(false),
    images: joi.array().items(joi.object().empty(null, ""))
      
})

const productUpdateRules = joi.object({

    title:  joi.string().min(2).required(),
    categories: joi.array().items(joi.string()).empty(null, "").default(null),
    summary: joi.string().required(),
    description: joi.string().empty(null, "").default(null),
    price: joi.number().min(1).required(),
    discount: joi.number().min(0).max(100).default(0),
    attributes: joi.array().items(joi.object({
      Key: joi.string(),
      value: joi.array().items(joi.string())
    })).empty(null, "").default(null),
    tags: joi.array().items(joi.string()).empty(null, ""),
    brand: joi.string().empty(null, "").default(null),
    seller: joi.string().empty(null,"").default(null),
    status: joi.string().pattern(/^(active|inactive)$/),
    showInHome: joi.boolean().default(false),
    images: joi.array().items(joi.object().empty(null, ""))
      
})

module.exports = {productCreateRules, productUpdateRules}