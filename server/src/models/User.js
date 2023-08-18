const mongoose = require("mongoose") ;
const Schema = mongoose.Schema

const UserSchema = new Schema({
        firstName: String,
        lastName : String,
        userName : String,
        password :  String,
        email :{type : String , unique : true,require : [true, 'User email number required']},
        phone : {type : String , unique : true},
        reset_key : String,
        active : Boolean,
        active_key : {type:String},
}, { timestamps: true })

const userModel = mongoose.model("users", UserSchema);

module.exports = userModel;