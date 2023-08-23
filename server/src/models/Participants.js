const mongoose = require("mongoose") ;
const Schema = mongoose.Schema

const ParticipantsSchema = new Schema({
        idUser :[{type : mongoose.Schema.ObjectId , ref : "users"}] ,
        idRoom :{type : mongoose.Schema.ObjectId , ref : "rooms"} ,
})

const ParticipantsModel = mongoose.model("Participants", ParticipantsSchema);

module.exports = ParticipantsModel;