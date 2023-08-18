const express = require("express")
const  userController = require("../controllers/userController");
const Router = express.Router()
const Indexrouter = (app)=>{
    Router.get("/",(req,res)=>{
        return res.status(200).send("Hello")
    });
    Router.post("/create-user",userController.createUser)

    return app.use("/",Router);
}

module.exports = Indexrouter;