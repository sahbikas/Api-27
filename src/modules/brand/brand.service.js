
const BrandModel = require("./brand.model");

const AppError = require("../../exception/app.excpetion");
const slugify  = require("slugify");
class brandService {
   transformCreateRequest = (data, userId) => {
          const formattedData = {...data};
   
   if(data.image) {
    formattedData.image = data.image.filename;
   }else{
    formattedData.image = null
   }
   
  formattedData.slug = slugify(formattedData.title, {
    lower: true
  })

   formattedData.createdBy = userId;
   return formattedData
   }

   transformUpdateRequest = (req, oldData) => {
    const formattedData = {...req.body};
   if(req.body.image) {
    formattedData.image = req.body.image.filename;
   }else{
       formattedData.image = oldData.image;
   }
    formattedData.updatedBy = req.authUser._id;
    return formattedData;
   }

   storeData = async (data) => {
    try{
       const brandObj = new BrandModel(data);
       return await brandObj.save()
    }catch(exception) {
      if(+exception.code === 11000){
        throw new AppError({message: "Name Should be nique", code: 400})
      }
        throw exception
    }
   }

   getCount = async (filter) => {
    try{
        const count = await BrandModel.countDocuments(filter)
       
        return count
       }catch(exception){
           throw exception
       }
   }

 getSkipCalculated = (query) => {
    const page = +query.page || 1
    const limit = +query.limit || 10
    

    const skip = (page-1)*limit;
    return {page, limit, skip}
 }

 getSearchQuery = (search) => {
    let filter = {}
    if(search) {
        filter = {
            $or: [
                {title: new RegExp(search, 'i')},
                {status: new RegExp(search, 'i')},
                {link: new RegExp(search, 'i')}
            ]
        }
      }
      return filter;
 }
   getDataByFilter = async (filter, skip, limit) => {
    try{
     const data = await BrandModel.find(filter)
     .populate("createdBy", ["_id","name", "email", "role" ])
     .populate("updatedBy", ["_id","name", "email", "role" ])
     .sort({"_id": -1})
     .skip(skip)
     .limit(limit)
     return data
    }catch(exception){
        throw exception
    }
   }
   getSingleRowById = async(_id) => {
    try{
       const data = await BrandModel.findById(_id)
       .populate("createdBy", ["_id","name", "email", "role" ])
     .populate("updatedBy", ["_id","name", "email", "role" ])
       return data;
    }catch(exception) {
        throw exception
    }
   }

   deleteById = async (id) => {
    try{
      const deleted = await BrandModel.findByIdAndDelete(id);
      if(deleted) {
        return deleted
      }else{
        throw new AppError({message: "Brand dose not exists or already deleted", code: 400})
      }
    }catch(exception){
    throw exception
    }
   }
   updateById = async (data, id) => {
    try{
       const updated = await  BrandModel.findByIdAndUpdate(id, {$set: data});

       return updated;
    }catch(exception) {
        throw exception
    }
   }
   listForHome = async() => {
    try{
        const data = await BrandModel.find({
            status: "active",
           // startTime: {$lte: Date.now()}
        }).sort({_id: -1})
        .limit(10)
        return data;
    }catch(exception){
        throw exception
    }
   }

   getProductsByBrandSlug = async(slug) => {
    try{
        const products = await BrandModel.aggregate([
          {
            $match: {
              slug: slug
            }
          },
          {
            $lookup: {
              from: "products",
             localField: "_id",
              foreignField: "brand",
              as: "products"
            }
          }
        ])
        return products;
    }catch(exception){
      throw exception
    }
   }
}

const brandSvc = new brandService;
module.exports = brandSvc