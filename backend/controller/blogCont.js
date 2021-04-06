const Blog = require('../model/blogs')

module.exports.add_blog = async (req, res) => {
    const { title, description,date } = req.body;

    try {
        const blog = await Blog.create({ title, description,date })
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
            }
            else {
                res.status(400).send("fields cant be empyt")
            }
        
        
}

module.exports.show_blogs = (req, res) => {

    const { page,limit } = req.query;
   
    
    Blog.find()
        .sort('-createdAt')
        .limit(limit * 1)
        .skip((page-1)*limit)
        .then(result => res.send({total:result.length, result }))
        .catch(err => {
            
            console.log("finddddd");
            res.send(err)
        })
}