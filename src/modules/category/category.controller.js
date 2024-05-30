const AppError = require("../../exception/app.excpetion");
const categorySvc = require("../category/category.service")
const productSvc = require("../product/product.service")
class CategoryController{


index = async (req, res, next) => {
    try{
        const {page, limit, skip} = categorySvc.getSkipCalculated(req.query)
        const search = req.query.search || null;
      let filter = categorySvc.getSearchQuery(search);
     
    const count = await categorySvc. getCount(filter);
    let data = await  categorySvc.getDataByFilter(filter, skip, limit)
    res.json({
        result: data,
        message: "Category Fetched",
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
   const data = categorySvc.transformCreateRequest(req.body, req.authUser._id);
  const createdCategory = await categorySvc.storeData(data)
  res.json({result: createdCategory, message: "Category Created Successfuly", meta: null})
    }catch(exception) {
        console.log("Exception", exception)
        next(exception)
    }
}

detail = async (req, res, next) => {
    try{
        const data = await categorySvc.getSingleRowById(req.params.id)
        res.json({
            result: data,
            message: "Category Details Fetched",
            meta: null
        })
    }catch(exception) {
        console.log("Exception", exception)
        next(exception)
    }
}

update = async(req, res, next) => {
    try{
        const category = await categorySvc.getSingleRowById(req.params.id)
        if(!category) {
            throw new AppError({message: "Category not found", code: 400})
        }
        const data = categorySvc.transformUpdateRequest(req, category)
        const updated = await categorySvc.updateById(data, req.params.id);

        res.json({
            result: updated,
            message: "Category Updated successfuly",
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
      const deleted = await categorySvc.deleteById(id)
      res.json({
        result: deleted,
        message: "Category deleted Successfuly",
        meta: null
      })
    }catch(exception) {
        console.log("Exception", exception)
        next(exception)
    }
}

listForHome = async (req, res, next) => {
    try{
        const categoryList = await categorySvc.listForHome();
        res.json({
            result: categoryList,
            message: "category Fetched",
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
      const productList = await productSvc.getProductsByCategorySlug(req.params.slug, skip, limit);
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

const categoryCtrl = new CategoryController()
module.exports = categoryCtrl