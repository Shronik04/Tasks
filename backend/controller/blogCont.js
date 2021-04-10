const Blog = require('../model/blogs')
const jwt = require("jsonwebtoken");
const multer =require('multer')
const path = require('path');



module.exports.add_blog = async (req, res) => {
    
    
    const { title, description, date } = req.body;
    // const image = req.file;
    console.log("headerssss", req.headers.jwt);
    const tok = req.headers.jwt
    const veri = jwt.verify(tok, "SecretPass321");
    console.log("veri", veri.id);
    const author = veri.id
    //   console.log(req.file,req.body.Data);
    try {
        const blog = await Blog.create({ title, description,date,author })
        res.status(201).send({ blog: blog._id, message: "Blog added" })
        
    }
    catch (err) {
        res.status(400).send(err.message)
    }
}

module.exports.update_blog = async (req, res) => {

    const desc = req.body.description;
    const head=req.body.title
 
            if (desc && head) {
            //   if(doc.title !== head ){
                if (desc.length < 100) {
                    res.status(400).send("Description should be atleast 100 characters long")
                }
                else {
                    Blog.updateOne({ _id: req.params.id },
                        { $set: { title: head, description: desc } })
                        .then(result =>
                       res.status(200).send("Updated successfully")      )
                        .catch(err => {
                       console.log(err);
                   })
                }
                  
            //   }
            //   else {
            //     res.status(400).send("this already exists")
            // }
            }
            else {
                res.status(400).send("fields cant be empyt")
            }
        
        
}

module.exports.show_blogs = (req, res) => {

    const { page, limit } = req.query;

    try {
        const tok = req.headers.jwt
        const veri = jwt.verify(tok, "SecretPass321");
        console.log("veri", veri.id);
        const author = veri.id
        
        Blog.find({author:{$ne:author}})
        .sort('-createdAt')
        .limit(limit *1)
        .skip((page - 1) * limit)
        .populate('author')
        .then(result => res.send({total:result.length, result }))
        .catch(err => {
            
            console.log("finddddd");
            res.send(err)
        })

        console.log("TRYYY");
    }

    catch {

        console.log("CATCHHHh");
        Blog.find()
        .sort('-createdAt')
        .limit(limit *1)
        .skip((page - 1) * limit)
        .populate('author')
        .then(result => res.send({total:result.length, result }))
        .catch(err => {
            
            console.log("finddddd");
            res.send(err)
        })
    }
    
}



module.exports.user_blogs = (req, res) => {

    const tok = req.headers.jwt
    const veri = jwt.verify(tok, "SecretPass321");
    console.log("veri", veri.id);
    const authorid = veri.id

    Blog.find({ author: authorid })
    .sort('-createdAt')
        
        .populate("author")
        .then((result) => {
            // console.log(result);
        res.status(200).send(result)
        })
        .catch((err) => {
        console.log(err);
    })
}


// module.exports = upload;



//userdash

//homeshow