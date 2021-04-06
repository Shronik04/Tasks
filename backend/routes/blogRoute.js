const { Router } = require("express")
const router = Router();
// const router = require('express').Router();
const blogCont= require('../controller/blogCont')

router.post('/addblog',

    blogCont.add_blog
)

router.put("/update/:id",

    blogCont.update_blog    
)

router.get("/blogs",
    blogCont.show_blogs
)

module.exports = router;