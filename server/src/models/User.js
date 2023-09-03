const mongoose = require("mongoose") ;
const Schema = mongoose.Schema

const UserSchema = new Schema({
        firstName: String,
        lastName : String,
        password :  String,
        email :{type : String , unique : true,require : [true, 'User email number required']},
        phone : String,
        reset_key : String,
        active : Boolean,
        active_key : String,
        friend :[{
                id_friend : {type : mongoose.Schema.ObjectId},
                active : Boolean
        }]
}, { timestamps: true })

const userModel = mongoose.model("users", UserSchema);

module.exports = userModel;