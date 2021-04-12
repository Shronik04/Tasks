const { Router } = require("express");
const router = Router();
// const router = require('express').Router();
const blogCont = require("../controller/blogCont");
const userCont = require("../controller/userCont");
const Upload = require("../middleware/mult");

router.post(
	"/addblog",
	// Upload.single('file'),
	blogCont.add_blog
);
router.put("/update/:id", blogCont.update_blog);
router.get("/blogs", blogCont.show_blogs);
router.post("/user/signup", userCont.signup_post);
router.post("/user/login", userCont.login_post);
router.get("/user/blogs", blogCont.user_blogs);
module.exports = router;
