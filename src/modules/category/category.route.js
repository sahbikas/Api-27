const router = require('express').Router()
const authCheck = require("../../middlewares/auth.middleware")
const checkPermission  = require("../../middlewares/rbac.middleware")
const categoryCtrl = require('./category.controller')
const {uploader, uploadPath} = require('../../middlewares/uploader.middleware')
const bodyValidator = require("../../middlewares/validator.middleware")
const { categoryCreateRules, categoryUpdateRules } = require('./category.request')

router.get("/home", categoryCtrl.listForHome)

router.get("/:slug/product", categoryCtrl.getAllProducts)

router.route("/")
.post(authCheck, checkPermission('admin'),uploadPath('category'),uploader.single('image'),bodyValidator(categoryCreateRules, 'image'), categoryCtrl.create )
.get(authCheck, checkPermission('admin'),categoryCtrl.index  )

router.route("/:id")
.get(authCheck, checkPermission('admin'), categoryCtrl.detail  )
.delete(authCheck, checkPermission('admin'), categoryCtrl.delete )
.put(authCheck, checkPermission('admin'),uploadPath('category'),uploader.single('image'),bodyValidator(categoryUpdateRules, 'image'), categoryCtrl.update )

module.exports = router;
