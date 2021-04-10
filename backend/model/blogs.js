const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;
const joi =require('joi')


const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required:[true, "PLease give a title"]
    },
    description:{
        type: String,
        minLength: [10, "Blog should be atleast 100 charaters long"],
        required:[true,"Blogs cant be empty, write something interesting"]
    },
    author: {
        type: ObjectId,
        ref: "user",
        required:true
    },
    // file: {
    //     type:String,
    //     fieldname: String,
    //     originalname: String,
    //     encoding: String,
    //     mimetype: String,
    //     destination: String,
    //     path: String,
    //     filename: String, 
    //     required:true
    // }
  
}, {timestamps:true})

blogSchema.post("save", async function (doc, next) {

    console.log("Blog added", doc);
    next();
})

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
