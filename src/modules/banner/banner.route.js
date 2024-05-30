const router = require('express').Router()
const authCheck = require("../../middlewares/auth.middleware")
const checkPermission  = require("../../middlewares/rbac.middleware")
const bannerCtrl = require('./banner.controller')
const {uploader, uploadPath} = require('../../middlewares/uploader.middleware')
const bodyValidator = require("../../middlewares/validator.middleware")
const { bannerCreateRules, bannerUpdateRules } = require('./banner.request')

router.get("/home", bannerCtrl.listForHome)

router.route("/")
.post(authCheck, checkPermission('admin'),uploadPath('banner'),uploader.single('image'),bodyValidator(bannerCreateRules, 'image'), bannerCtrl.create )
.get(authCheck, checkPermission('admin'),bannerCtrl.index  )

router.route("/:id")
.get(authCheck, checkPermission('admin'), bannerCtrl.detail  )
.delete(authCheck, checkPermission('admin'), bannerCtrl.delete )
.put(authCheck, checkPermission('admin'),uploadPath('banner'),uploader.single('image'),bodyValidator(bannerUpdateRules, 'image'), bannerCtrl.update )

module.exports = router;
