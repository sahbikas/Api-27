
const CategoryModel = require("./category.model");

const AppError = require("../../exception/app.excpetion");
const slugify  = require("slugify");
class categoryService {
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

  if(data.parentId === 'null' || !data.parentId) {
    formattedData.parentId = null;
  }
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

   if(req.body.parentId === 'null' || !req.body.parentId) {
    formattedData.parentId = null;
  }

    formattedData.updatedBy = req.authUser._id;
    return formattedData;
   }

   storeData = async (data) => {
    try{
       const categoryObj = new CategoryModel(data);
       return await categoryObj.save()
    }catch(exception) {
      if(+exception.code === 11000){
        throw new AppError({message: "Name Should be nique", code: 400})
      }
        throw exception
    }
   }

   getCount = async (filter) => {
    try{
        const count = await CategoryModel.countDocuments(filter)
       
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
     const data = await CategoryModel.find(filter)
     .populate("createdBy", ["_id","name", "email", "role" ])
     .populate("updatedBy", ["_id","name", "email", "role" ])
     .populate("parentId", ["_id", "title", "slug"])
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
       const data = await CategoryModel.findById(_id)
       .populate("createdBy", ["_id","name", "email", "role" ])
     .populate("updatedBy", ["_id","name", "email", "role" ])
     .populate("parentId", ["_id", "title", "slug"])
       return data;
    }catch(exception) {
        throw exception
    }
   }

   deleteById = async (id) => {
    try{
      const deleted = await CategoryModel.findByIdAndDelete(id);
      if(deleted) {
        return deleted
      }else{
        throw new AppError({message: "category dose not exists or already deleted", code: 400})
      }
    }catch(exception){
    throw exception
    }
   }
   updateById = async (data, id) => {
    try{
       const updated = await  CategoryModel.findByIdAndUpdate(id, {$set: data});

       return updated;
    }catch(exception) {
        throw exception
    }
   }
   listForHome = async() => {
    try{
        const data = await CategoryModel.find({
            status: "active",
           // startTime: {$lte: Date.now()}
        }).sort({_id: -1})
        .limit(10)
        return data;
    }catch(exception){
        throw exception
    }
   }

   getProductsByCategorySlug = async(slug) => {
    try{

    }catch(exception){
      throw exception
    }
   }
}

const categorySvc = new categoryService;
module.exports = categorySvc