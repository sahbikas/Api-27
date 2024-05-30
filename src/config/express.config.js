const express = require('express')
require("./mongodb.config");
const app = express();



const router = require("../routes/router")
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use("/", router);

app.use((req, res, next) =>{
    
    next({code: 404, message: "Not found"})
    
   
})

app.use((error, req, res, next) => {
console.log("GarbageCollector: ", error)
   let statusCode = error.code ?? 500
   let result = error.data ?? null;
   let message = error.message ?? "Internal Server Error...";

     res.status(statusCode).json({
        result: result,
        message: message,
        meta: null
     })
})
module.exports = app;