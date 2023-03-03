import express from "express"
import morgan from "morgan"
import {Server as Socketserver} from 'socket.io'
import http from 'http'
import cors from 'cors'
import mongoose from "mongoose"
import bodyParser from "body-parser"
import router from "./routes/message.js"

//Config Mongoose

let email='edisonalzate11@gmail.com'
var urlToConnectionMongo='mongodb+srv://edisonalzate11:FSAem7DyXBauLWNR@cluster0.vxwviub.mongodb.net/?retryWrites=true&w=majority'
mongoose.Promise=global.Promise

const app=express()
const PORT=4000

// WE WILL CREATE A SERVER WITH  HTTP
const server =http.createServer(app)
const io =new Socketserver(server,{
    core:{
        origin:'*'
    }
})

//We Will create Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/api',router)


// Connect to DataBase
mongoose.connect(urlToConnectionMongo,{useNewUrlParser:true}).then(()=>{
    console.log('Data Base conneted succesfully')
    server.listen(PORT,()=>{
        console.log('Server runing in http://localhost:',PORT)
    })
})

// const connectDB=async()=>{
//     try{
//        await  mongoose.connect(urlToConnectionMongo,{useNewUrlParser:true})    
             
//       }catch(error){
//         console.log(error)
//         // process.exit()
//     }
// }

// await connectDB()