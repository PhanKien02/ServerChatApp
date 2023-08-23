const mongoose = require("mongoose") ;
const Schema = mongoose.Schema

const RoomSchema = new Schema({
        nameRoom: String,
        leader :{type : mongoose.Schema.ObjectId , ref : "users"} ,
        active : Boolean,
}, { timestamps: true })

const RoomModel = mongoose.model("rooms", RoomSchema);

module.exports = RoomModel;