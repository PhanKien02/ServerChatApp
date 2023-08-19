const express = require("express")
const  userController = require("../controllers/userController");
const Router = express.Router()
const Indexrouter = (app)=>{
    Router.get("/",(req,res)=>{
        return res.status(200).send("Hello")
    });
    Router.post("/create-user",userController.createUser)
    Router.post("/active-user",userController.activeUser)
    return app.use("/api",Router);
}

module.exports = Indexrouter;