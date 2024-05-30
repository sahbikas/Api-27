
const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
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
    parentId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      default: null
    },
    image: {
        
            type: String,
            required: false,
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
      showInMenu: {
        type: Boolean,
        default: false
      },
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

const CategoryModel = mongoose.model("Category", CategorySchema)

module.exports = CategoryModel