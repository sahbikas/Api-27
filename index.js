const http = require("http")
const app = require("./src/config/express.config")

const server = http.createServer(app)

server.listen(3005, "127.0.0.1", (err) => {
    if(!err) {
        console.log("Server is running on port 3005")
        console.log("Press CTRL+C to disconnect server")
    }
})