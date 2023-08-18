const mongoose = require("mongoose") ;
const Schema = mongoose.Schema

const FileSchema = new Schema({
        NameFile: String,
        fileOnServer :String,
        relative_path : Boolean,
}
)

const fileModel = mongoose.model("files", FileSchema);

module.exports = fileModel;