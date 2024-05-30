
const ProductModel = require("./product.model");

const AppError = require("../../exception/app.excpetion");
const slugify = require("slugify");
class productService {
	transformCreateRequest = (data, userId) => {
		const formattedData = { ...data };
		let images = [];
		if (data.images) {
			data.images.map((image) => {
				images.push(image.filename)
			});
			formattedData.images = images
		} else {
			formattedData.images = null
		}

		formattedData.slug = slugify(formattedData.title, {
			lower: true
		})
		if (formattedData.seller === "null" || !formattedData.seller) {
			formattedData.seller = null
		}

		if (formattedData.brand === "null" || !formattedData.brand) {
			formattedData.brand = null
		}

		if (formattedData.categories === "null" || !formattedData.categories) {
			formattedData.categories = null
		}
		formattedData.afterDiscount = +data.price - data.price * data.discount / 100;
		formattedData.createdBy = userId;
		console.log({ formattedData })
		return formattedData
	}

	transformUpdateRequest = (req, oldData) => {

		const formattedData = { ...req.body };

		if (req.images && req.body.images.length) {
			let images = [];
			req.images.map((image) => {
				images.push(image.filename)
			});
			formattedData.images = images
		} else {
			formattedData.images = oldData.images;
		}

		if (formattedData.seller === "null" || !formattedData.seller) {
			formattedData.seller = null
		}

		if (formattedData.brand === "null" || !formattedData.brand) {
			formattedData.brand = null
		}

		if (formattedData.categories === "null" || !formattedData.categories) {
			formattedData.categories = null
		}

		formattedData.afterDiscount = +formattedData.price - +formattedData.price * +formattedData.discount / 100;
		formattedData.updatedBy = req.authUser._id;
		return formattedData
	}

	storeData = async (data) => {
		try {
			const productObj = new ProductModel(data);
			return await productObj.save()
		} catch (exception) {
			if (+exception.code === 11000) {
				throw new AppError({ message: "Name Should be unique", code: 400 })
			}
			throw exception
		}
	}

	getCount = async (filter) => {
		try {
			const count = await ProductModel.countDocuments(filter)

			return count
		} catch (exception) {
			throw exception
		}
	}

	getSkipCalculated = (query) => {
		const page = +query.page || 1
		const limit = +query.limit || 10


		const skip = (page - 1) * limit;
		return { page, limit, skip }
	}

	getSearchQuery = (search) => {
		let filter = {}
		if (search) {
			filter = {
				$or: [
					{ title: new RegExp(search, 'i') },
					{ status: new RegExp(search, 'i') },
					{ link: new RegExp(search, 'i') }
				]
			}
		}
		return filter;
	}
	getDataByFilter = async (filter, skip, limit) => {
		try {
			const data = await ProductModel.find(filter)
				.populate("createdBy", ["_id", "name", "email", "role"])
				.populate("updatedBy", ["_id", "name", "email", "role"])
				.populate("categories", ["_id", "title", "slug"])
                .populate("brand", ["_id", "title", "slug"])
				.populate("seller", ["_id", "title", "slug"])
				.sort({ "_id": -1 })
				.skip(skip)
				.limit(limit)

			return data
		} catch (exception) {
			throw exception
		}
	}
	getSingleRowById = async (_id) => {
		try {
			const data = await ProductModel.findById(_id)
				.populate("createdBy", ["_id", "name", "email", "role"])
				.populate("updatedBy", ["_id", "name", "email", "role"])
				
				.populate("categories", ["_id", "title", "slug"])

				//.populate("seller", ["_id", "title", "slug"])
			return data;
		} catch (exception) {
			throw exception
		}
	}

	deleteById = async (id) => {
		try {
			const deleted = await ProductModel.findByIdAndDelete(id);
			if (deleted) {
				return deleted
			} else {
				throw new AppError({ message: "Product dose not exists or already deleted", code: 400 })
			}
		} catch (exception) {
			throw exception
		}
	}
	updateById = async (data, id) => {
		try {
			const updated = await ProductModel.findByIdAndUpdate(id, { $set: data });

			return updated;
		} catch (exception) {
			throw exception
		}
	}
	listForHome = async () => {
		try {
			const data = await ProductModel.find({
				status: "active",
				showInHome: true
				// startTime: {$lte: Date.now()}
			}).sort({ _id: -1 })
				.limit(10)
			return data;
		} catch (exception) {
			throw exception
		}
	}

	getProductsByProductSlug = async (slug) => {
		try {

		} catch (exception) {
			throw exception
		}
	}
	getProductsByBrandSlug = async(brandSlug, skip, limit) => {
		try{
         return ProductModel.aggregate([
			{
				$lookup: {
					from: "brands",
                localField: "brand",
                 foreignField: "_id",
                    as: "brand"
				}
			},
			{
				$lookup: {
					from: "categories",
                localField: "categories",
                 foreignField: "_id",
                    as: "categories"
				}
			},
			{
				$match: {
					"brand.slug": brandSlug
				  }	
			},
			{
				$unwind: {
					path: "$brand",
				}
				
			  }
		 ])
		 .sort({ "_id": -1 })
				.skip(skip)
				.limit(limit)
		}catch(exception){
			throw exception
		}
	}

	getProductsByCategorySlug = async(catSlug, skip, limit) => {
		try{
         return ProductModel.aggregate([
			{
				$lookup: {
					from: "brands",
                localField: "brand",
                 foreignField: "_id",
                    as: "brand"
				}
			},
			{
				$lookup: {
					from: "categories",
                localField: "categories",
                 foreignField: "_id",
                    as: "categories"
				}
			},
			{
				$match: {
					"categories.categories": brandSlug
				  }	
			},
			{
				$unwind: {
					path: "$brand",
				}
				
			  }
		 ])
		 .sort({ "_id": -1 })
				.skip(skip)
				.limit(limit)
		}catch(exception){
			throw exception
		}
	}
}

const productSvc = new productService;
module.exports = productSvc