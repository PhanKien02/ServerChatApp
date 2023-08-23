const express = require("express")
const  userController = require("../controllers/userController");
const Router = express.Router()
const Indexrouter = (app)=>{
    Router.get("/",(req,res)=>{
        return res.status(200).send("Hello")
    });
    Router.post("/create-user",userController.createUser)
    Router.post("/active-user",userController.activeUser)
    Router.post("/login",userController.login)

    Router.post("/create-room",require("../controllers/roomController").createRoom)
    Router.post("/add-member",require("../controllers/roomController").addMembertoRoom)
    return app.use("/api",Router);
}

module.exports = Indexrouter;