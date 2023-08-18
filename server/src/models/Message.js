const mongoose = require("mongoose") ;
const Schema = mongoose.Schema

const MessageSchema = new Schema({
        id_Send: {type : mongoose.Schema.ObjectId , ref : "users"},
        id_Receive :  {type : mongoose.Schema.ObjectId , ref : "users"},
        id_rooms :  {type : mongoose.Schema.ObjectId , ref : "rooms"},
        day_chat : Date,
        message : { type : String ,unique : true}
}, { timestamps: true })

const MessageModel = mongoose.model("messages", MessageSchema);

module.exports = MessageModel;