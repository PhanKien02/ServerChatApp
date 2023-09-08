const express = require('express');
import {connectDatabase} from './configs/connectDatabase';
const bodyParser = require("body-parser");
const cors =require("cors") ;
const cookieParser = require("cookie-parser")
const Router = require('./routers/indexRouter')
const app = express();
const  morgan = require('morgan');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

app.use(morgan("dev"));
require('dotenv').config();
connectDatabase();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.text())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser())
const io = new Server(server,{
    cors :{
        origin :" http://localhost:8000",
        methods :["GET","POST"]
    },
});
io.on('connecttion',socket =>{
    console.log(`User connected ${socket.id}`);
})

Router(app);
const port = process.env.PORT
server.listen(port,()=>{
    console.log(`runing http://localhost:${port}/`);
})