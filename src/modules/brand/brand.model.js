
const mongoose = require("mongoose")

const BrandSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        min: 2
    },
    slogan: {
      type: String,
    },
    image: {
        
            type: String,
            required: false,
    },
    slug: {
     type: String,
     unique: true,
     required: true 
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

const BrandModel = mongoose.model("Brand", BrandSchema)

module.exports = BrandModel