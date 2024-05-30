const multer = require('multer')
const fs = require("fs")
const { randomString } = require('../utilities/helpers')
const validationError = require('../exception/validation.exception')
const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        //console.log(req, file, cb)
        const path = "./public/uploads/"+req.uploadDir
        if(!fs.existsSync(path)){
            //console.log(path)
            fs.mkdirSync(path, {recursive: true})
        }
        cb(null, path)
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split(".").pop()
        const fileName = Date.now()+"-"+randomString(10)+"."+ext;
        cb(null, fileName)
    }
})

const imageFilter = (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    if(
        ['jpg', 'jpeg', 'svg', 'webp', 'bmp', 'gif'].includes(ext.toLowerCase())
    ) {
        cb(null, true)
    } else {
        cb(new validationError({data: {image: "Image format not supported"}})
        )
    }
}
const uploader = multer({
  storage: myStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 2000000
  }

})

const uploadPath = (dirName) => {
    return (req, res, next) => {
        req.uploadDir = dirName;
        next()
    }

}

module.exports = {uploader, uploadPath}