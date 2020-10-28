const blogRoutes = require("express").Router()
const Blog = require("../models/blogs")


blogRoutes.get("/", (req, res) => {
	Blog
		.find({})
		.then(blogs => {
			res.json(blogs)
		})
})
  
blogRoutes.post("/", (req, res) => {
	const blog = new Blog(req.body)
  
	blog
		.save()
		.then(result => {
			res.status(201).json(result)
		})
})


module.exports = blogRoutes