const formidable = require("formidable");
const fs = require("fs");
const File = require("../models/fileModel");
const directoryPath = './public/files/'
const http = require('http');

exports.fileUpload = async (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {

    const old_path = files.file.filepath
    const old_file_name = files.file.originalFilename;
    const new_file_name = files.file.newFilename;
    const file_ext = old_file_name.split(".").pop();
    const new_path = directoryPath + new_file_name + "." + file_ext;

    fs.rename(old_path, new_path, function (err) {
      if (err) throw err;
    });

    const file = new File()
    file.name = new_file_name
    file.file_path = new_path; 
    file.save();
  
    res.status(201).json(file)
  });
};
exports.fileDownload = async(req,res)=>{

  const {file_name} = req.body

  const file_directory = "http://localhost:" + process.env.PORT + "/public/files/" + file_name

  const file = fs.createWriteStream(`${file_name}`);

  const request = http.get(file_directory, (response) => {
   response.pipe(file);

   file.on("finish", () => {
      file.close();
      res.json("File is being downloaded!")
   })
  })
}
exports.fileList = async (req, res) => {
  fs.readdir(directoryPath, (err, files) => {
    res.json(files);
  })
}