const router = require('express').Router()
const authCheck = require("../../middlewares/auth.middleware")
const checkPermission  = require("../../middlewares/rbac.middleware")
const brandCtrl = require('./brand.controller')
const {uploader, uploadPath} = require('../../middlewares/uploader.middleware')
const bodyValidator = require("../../middlewares/validator.middleware")
const { brandCreateRules, brandUpdateRules } = require('./brand.request')

router.get("/home", brandCtrl.listForHome)

router.get("/:slug/products", brandCtrl.getAllProducts)

router.route("/")
.post(authCheck, checkPermission('admin'),uploadPath('brand'),uploader.single('image'),bodyValidator(brandCreateRules, 'image'), brandCtrl.create )
.get(authCheck, checkPermission('admin'),brandCtrl.index  )

router.route("/:id")
.get(authCheck, checkPermission('admin'), brandCtrl.detail  )
.delete(authCheck, checkPermission('admin'), brandCtrl.delete )
.put(authCheck, checkPermission('admin'),uploadPath('banner'),uploader.single('image'),bodyValidator(brandUpdateRules, 'image'), brandCtrl.update )

module.exports = router;
