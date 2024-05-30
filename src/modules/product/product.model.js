
const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
		min: 2
	},
	slug: {
		type: String,
		unique: true,
		required: true
	},
	categories: [{
		type: mongoose.Types.ObjectId,
		ref: "Category",
		default: null
	}],
	summary: { type: String },
	description: String,
	price: {
		type: Number,
		min: 1,
		required: true
	},
	discount: {
		type: Number,
		min: 0,
		max: 100,
		default: 0
	},

	afterDiscount: {
		type: Number,
		min: 1,
		required: true
	},
	attributes: [{
		Key: String,
		value: [String]
	}],
	tags: [String],
	brand: {
		type: mongoose.Types.ObjectId,
		ref: "Brand",
		default: null

	},
	seller: {
		type: mongoose.Types.ObjectId,
		ref: "User",
		default: null

	},


	status: {
		type: String,
		enum: ['active', 'inactive'],
		default: "inactive"
	},
	showInHome: {
		type: Boolean,
		default: false
	},
	images: [{

		type: String,

	}],
	createdBy: {
		type: mongoose.Types.ObjectId,
		ref: "User",
		default: null
	},
	updatedBy: {
		type: mongoose.Types.ObjectId,
		ref: "User",
		default: null
	},
}, {
	timestamps: true,
	autoCreate: true,
	autoIndex: true
})

const ProductModel = mongoose.model("Product", ProductSchema)

module.exports = ProductModel