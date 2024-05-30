const router = require('express').Router()
const authCheck = require("../../middlewares/auth.middleware")
const checkPermission  = require("../../middlewares/rbac.middleware")
const productCtrl = require('./product.controller')
const {uploader, uploadPath} = require('../../middlewares/uploader.middleware')
const bodyValidator = require("../../middlewares/validator.middleware")
const {productCreateRules, productUpdateRules } = require('./product.request')

router.get("/home", productCtrl.listForHome)

router.get("/:slug/products", productCtrl.getAllProducts)

router.route("/")
.post(authCheck, checkPermission('admin', 'seller'),uploadPath('product'),uploader.array('images'),bodyValidator(productCreateRules, 'images'), productCtrl.create )
.get(authCheck, checkPermission('admin'),productCtrl.index  )

router.route("/:id")
.get(authCheck, checkPermission('admin'), productCtrl.detail  )
.delete(authCheck, checkPermission('admin'), productCtrl.delete )
.put(authCheck, checkPermission('admin'),uploadPath('product'),uploader.array('images'),bodyValidator(productUpdateRules, 'images'), productCtrl.update )

module.exports = router;
