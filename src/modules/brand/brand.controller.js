const AppError = require("../../exception/app.excpetion");
const brandSvc = require("../brand/brand.service");
const productSvc = require("../product/product.service");

class BrandController{


index = async (req, res, next) => {
    try{
        const {page, limit, skip} = brandSvc.getSkipCalculated(req.query)
        const search = req.query.search || null;
      let filter = brandSvc.getSearchQuery(search);
     
    const count = await brandSvc. getCount(filter);
    let data = await  brandSvc.getDataByFilter(filter, skip, limit)
    res.json({
        result: data,
        message: "Brand Fetched",
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
   const data = brandSvc.transformCreateRequest(req.body, req.authUser._id);
  const createdBrand = await brandSvc.storeData(data)
  res.json({result: createdBrand, message: "Brand Created Successfuly", meta: null})
    }catch(exception) {
        console.log("Exception", exception)
        next(exception)
    }
}

detail = async (req, res, next) => {
    try{
        const data = await brandSvc.getSingleRowById(req.params.id)
        res.json({
            result: data,
            message: "Brand Details Fetched",
            meta: null
        })
    }catch(exception) {
        console.log("Exception", exception)
        next(exception)
    }
}

update = async(req, res, next) => {
    try{
        const brand = await brandSvc.getSingleRowById(req.params.id)
        if(!brand) {
            throw new AppError({message: "Brand not found", code: 400})
        }
        const data = brandSvc.transformUpdateRequest(req, brand)
        const updated = await brandSvc.updateById(data, req.params.id);

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
      const deleted = await brandSvc.deleteById(id)
      res.json({
        result: deleted,
        message: "Brand deleted Successfuly",
        meta: null
      })
    }catch(exception) {
        console.log("Exception", exception)
        next(exception)
    }
}

listForHome = async (req, res, next) => {
    try{
        const brandList = await brandSvc.listForHome();
        res.json({
            result: brandList,
            message: "Brand Fetched",
            meta: null
        })
    }catch(exception) {
        
        console.log("Exception", exception)
        next(exception)
    }
}

  getAllProducts = async(req, res, next) => {
    try{
        const {page, limit, skip} = productSvc.getSkipCalculated(req.query)
        const search = req.query.search || null;
      let filter = productSvc.getSearchQuery(search);
      const count = await productSvc.getCount(filter);
      const productList = await productSvc.getProductsByBrandSlug(req.params.slug, skip, limit);
      res.json({
        result: productList,
        message: "product by brand slug",
        meta: {
            total: count,
            page: page,
            limit: limit
        }
      })
      
    }catch(exception) {
        console.log("getAllProducts", exception)
        next(exception)
    }
}

}

const brandCtrl = new BrandController()
module.exports = brandCtrl