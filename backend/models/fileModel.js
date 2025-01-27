const mongoose = require("mongoose")


const fileSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },file_path: {
    type: String,
    required: true,
    unique: true,
  }
})

const File = mongoose.model("File",fileSchema)
module.exports = File;