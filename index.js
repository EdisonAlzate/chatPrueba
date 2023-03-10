import express from "express"
import morgan from "morgan"
import { Server as Socketserver } from 'socket.io'
import http from 'http'
import cors from 'cors'
import mongoose from "mongoose"
import bodyParser from "body-parser"
import router from "./routes/message.js"
import { Socket } from "socket.io-client"

//Config Mongoose

let email = 'edisonalzate11@gmail.com'
var urlToConnectionMongo = 'mongodb+srv://edisonalzate11:FSAem7DyXBauLWNR@cluster0.vxwviub.mongodb.net/?retryWrites=true&w=majority'
mongoose.Promise = global.Promise

const app = express()
const PORT = 4000

// WE WILL CREATE A SERVER WITH  HTTP
const server = http.createServer(app)
const io = new Socketserver(server, {
    cors: {
        origin: '*'
    }
})

//We Will create Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', router)

io.on('connection', (socket) => {
    console.log("socket.id", socket.id)
    console.log("client connected")
    socket.on('message', (message, nickname) => {
        //send other clients online
        socket.broadcast.emit('message', {
            body: message,
            from: nickname
        })

    })
})


// Connect to DataBase
mongoose.connect(urlToConnectionMongo, { useNewUrlParser: true }).then(() => {
    console.log('Data Base conneted succesfully')
    server.listen(PORT, () => {
        console.log('Server runing in http://localhost:', PORT)
    })
})

