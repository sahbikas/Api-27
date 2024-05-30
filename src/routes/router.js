const app = require("express").Router()
const authRouter = require("../modules/auth/auth.router")
const bannerRouter = require("../modules/banner/banner.route")
const brandRouter = require("../modules/brand/brand.route")
const categoryRouter = require("../modules/category/category.route")
const productRouter = require("../modules/product/product.route")


app.use('/auth', authRouter)
app.use('/banner', bannerRouter)
app.use('/brand', brandRouter )
app.use('/category',categoryRouter )
app.use('/product',productRouter)



module.exports = app;