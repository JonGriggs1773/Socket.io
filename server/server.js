const express = require("express")
const app = express()
const cors = require("cors")
const socket = require("socket.io")
const port = 8000
app.use(cors())

const server = app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["*"],
        credentials: true
    }
})

io.on("connection", socket => {
    console.log(`socket id: ${socket.id}`)

    socket.on("send_message", (data) => {
        console.log(data)
        socket.broadcast.emit("receive_message", data)
    })
})