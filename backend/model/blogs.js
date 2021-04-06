const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({

    title: {
        type: String,
        required:[true, "PLease give a title"]
    },
    description: {
        type: String,
        minLength: [10, "Blog should be atleast 100 charaters long"],
        required:[true,"Blogs cant be empty, write something interesting"]
    }
  
}, {timestamps:true})

blogSchema.post("save", async function (doc, next) {
    console.log("Blog added", doc);
    next();
})

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
