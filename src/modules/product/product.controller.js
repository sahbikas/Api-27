const AppError = require("../../exception/app.excpetion");
const productSvc = require("../product/product.service")

class ProductController{


index = async (req, res, next) => {
    try{
        const {page, limit, skip} = productSvc.getSkipCalculated(req.query)
        const search = req.query.search || null;
      let filter = productSvc.getSearchQuery(search);
     
    const count = await productSvc. getCount(filter);
    let data = await  productSvc.getDataByFilter(filter, skip, limit)
    console.log(data)
    res.json({
        result: data,
        message: "Product Fetched",
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
   const data = productSvc.transformCreateRequest(req.body, req.authUser._id);
  const createdProduct = await productSvc.storeData(data)
  res.json({result: createdProduct, message: "Product Created Successfuly", meta: null})
    }catch(exception) {
        console.log("Exception", exception)
        next(exception)
    }
}

detail = async (req, res, next) => {
    try{
        const data = await productSvc.getSingleRowById(req.params.id)
        res.json({
            result: data,
            message: "Product Details Fetched",
            meta: null
        })
    }catch(exception) {
        console.log("Exception", exception)
        next(exception)
    }
}

update = async(req, res, next) => {
    try{
        const product = await productSvc.getSingleRowById(req.params.id)
        if(!product) {
            throw new AppError({message: "Product not found", code: 400})
        }
        const data = productSvc.transformUpdateRequest(req, product)
        const updated = await productSvc.updateById(data, req.params.id);

        res.json({
            result: updated,
            message: "Product Updated successfuly",
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
      const deleted = await productSvc.deleteById(id)
      res.json({
        result: deleted,
        message: "Product deleted Successfuly",
        meta: null
      })
    }catch(exception) {
        console.log("Exception", exception)
        next(exception)
    }
}

listForHome = async (req, res, next) => {
    try{
        const productList = await productSvc.listForHome();
        res.json({
            result: productList,
            message: "Product Fetched",
            meta: null
        })
    }catch(exception) {
        
        console.log("Exception", exception)
        next(exception)
    }
}

  getAllProducts = async(req, res, next) => {
    try{
      const productList = await productSvc.getProductsByCategorySlug(req.params.slug);
      
    }catch(exception) {
        console.log("getAllProducts", exception)
        next(exception)
    }
}

}

const productCtrl = new ProductController()
module.exports = productCtrl