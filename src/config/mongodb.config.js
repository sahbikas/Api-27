require("dotenv").config()

const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URL, {
    dbName: process.env.MONGODB_NAME,
    autoCreate: true,
    autoIndex: true
}) .then(() => {
    console.log("DB server connectrd...")
}).catch((e) => {
    console.log("DB server connection Error...")
    console.log(e)
    process.exit(1)
})