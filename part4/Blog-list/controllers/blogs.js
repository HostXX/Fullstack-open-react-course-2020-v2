const blogRoutes = require("express").Router()
const Blog = require("../models/blog")


blogRoutes.get("/",async(req, res) => {
	const blogs = await Blog.find({})
	res.json(blogs)
})
  
blogRoutes.post("/", async(req, res) => {
	const body = req.body

	const newBlog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes ? body.likes : 0
	}

	const blog = new Blog(newBlog)
	const result = await blog.save()

	res.status(201).json(result)
})


module.exports = blogRoutes