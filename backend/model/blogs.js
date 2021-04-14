const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi)



// const blogSchema = Joi.object({
// 	title: Joi.string().required(),
// 	description: Joi.string().min(10).required(),
// 	author: Joi.objectId().ref('user').required()
// })

const blogSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "PLease give a title"],
		},
		description: {
			type: String,
			minLength: [10, "Blog should be atleast 100 charaters long"],
			required: [true, "Blogs cant be empty, write something interesting"],
		},
		author: {
			type: ObjectId,
			ref: "user",
			required: true,
		},
		file: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);



blogSchema.post("save", async function (doc, next) {
	console.log("Blog added", doc);
	next();
});

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
