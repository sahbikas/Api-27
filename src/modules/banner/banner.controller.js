const AppError = require("../../exception/app.excpetion");
const bannerSvc = require("./banner.service")

class BannerController{


index = async (req, res, next) => {
    try{
        const {page, limit, skip} = bannerSvc.getSkipCalculated(req.query)
        const search = req.query.search || null;
      let filter = bannerSvc.getSearchQuery(search);
     
    const count = await bannerSvc. getCount(filter);
    let data = await  bannerSvc.getDataByFilter(filter, skip, limit)
    res.json({
        result: data,
        message: "Banner Fetched",
        meta:{
            total: count,
            page: page,
            limit: limit

        }
    })
    }catch(exception) {
        console.log("Exception", exception)
        next(exception)
    }
}

create = async (req, res, next) => {
    try{
   const data = bannerSvc.transformCreateRequest(req.body, req.authUser._id);
  const createdBanner = await bannerSvc.storeData(data)
  res.json({result: createdBanner, message: "Banner Created Successfuly", meta: null})
    }catch(exception) {
        console.log("Exception", exception)
        next(exception)
    }
}

detail = async (req, res, next) => {
    try{
        const data = await bannerSvc.getSingleRowById(req.params.id)
        res.json({
            result: data,
            message: "Banner Details Fetched",
            meta: null
        })
    }catch(exception) {
        console.log("Exception", exception)
    }
}

update = async(req, res, next) => {
    try{
        const banner = await bannerSvc.getSingleRowById(req.params.id)
        if(!banner) {
            throw new AppError({message: "Banner not found", code: 400})
        }
        const data = bannerSvc.transformUpdateRequest(req, banner)
        const updated = await bannerSvc.updateById(data, req.params.id);

        res.json({
            result: updated,
            message: "Banner Updated successfuly",
            meta: null
        })

    }catch(exception) {
        console.log("Exception", exception)
        next(exception)
    }
}

delete =  async (req, res, next) => {
    try{
      const id = req.params.id
      const deleted = await bannerSvc.deleteById(id)
      res.json({
        result: deleted,
        message: "Banner deleted Successfuly",
        meta: null
      })
    }catch(exception) {
        console.log("Exception", exception)
        next(exception)
    }
}

listForHome = async (req, res, next) => {
    try{
        const bannerList = await bannerSvc.listForHome();
        res.json({
            result: bannerList,
            message: "Banner Fetched",
            meta: null
        })
    }catch(exception) {
        
        console.log("Exception", exception)
        next(exception)
    }
}

}

const bannerCtrl = new BannerController()
module.exports = bannerCtrl