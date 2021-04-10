const multer = require('multer')
const router = require('express').Router();
const UploadImage = require('../model/imageMod')
const path = require('path');

const Storage = multer.diskStorage({
    destination: "./uploads",
    filename:function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: Storage,
   
})

module.exports = upload;
 
// var upload = multer({
//     storage:Storage
// }).single('image')

// function checkFileType(file, cb){
//     const filetypes = /jpeg|jpg|png|gif/;
    
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
  
//     if(mimetype && extname){
//       return cb(null,true);
//     } else {
//       cb('Error: Images Only!');
//     }
//   }


// router.post('/',upload.single('file'),(req, res) => {
//   // var success = req.file.filename + " Uploaded";
  
//   const fileUp = req.file;

//   console.log(req.file);

//  UploadImage.create(fileUp)
//    .then((result) => {
//       console.log("uploaded");
//     res.status(201).send(result)
//     })
//    .catch((err) => {
//       console.log(err);
//     res.status(500).send(err)
//   })
// })

// module.exports =router