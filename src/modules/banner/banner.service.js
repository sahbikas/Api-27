const { query } = require("express");
const BannerModel = require("./banner.model");
const bannerModel = require("./banner.model");
const AppError = require("../../exception/app.excpetion");
class bannerService {
   transformCreateRequest = (data, userId) => {
          const formattedData = {...data};
   

   formattedData.image = data.image.filename;
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
       const bannerObj = new bannerModel(data);
       return await bannerObj.save()
    }catch(exception) {
        throw exception
    }
   }

   getCount = async (filter) => {
    try{
        const count = await BannerModel.countDocuments(filter)
       
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
     const data = await BannerModel.find(filter)
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
       const data = await BannerModel.findById(_id)
       .populate("createdBy", ["_id","name", "email", "role" ])
     .populate("updatedBy", ["_id","name", "email", "role" ])
       return data;
    }catch(exception) {
        throw exception
    }
   }

   deleteById = async (id) => {
    try{
      const deleted = await BannerModel.findByIdAndDelete(id);
      if(deleted) {
        return deleted
      }else{
        throw new AppError({message: "Banner dose not exists or already deleted", code: 400})
      }
    }catch(exception){
    throw exception
    }
   }
   updateById = async (data, id) => {
    try{
       const updated = await  BannerModel.findByIdAndUpdate(id, {$set: data});

       return updated;
    }catch(exception) {
        throw exception
    }
   }
   listForHome = async() => {
    try{
        const data = await BannerModel.find({
            status: "active",
           // startTime: {$lte: Date.now()}
        }).sort({_id: -1})
        .limit(10)
        return data;
    }catch(exception){
        throw exception
    }
   }
}

const bannerSvc = new bannerService;
module.exports = bannerSvc