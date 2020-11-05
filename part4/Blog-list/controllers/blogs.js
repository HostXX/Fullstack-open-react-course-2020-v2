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

blogRoutes.get("/:id", async (req, res) => {
	const id = req.params.id
	const blog = await Blog.findById(id)

	if (blog) {
		return res.json({
			blog
		})
	}else {
		return res.status(400).json({
			message : "Not found"
		})
	}
	

})

blogRoutes.delete("/:id", async (req, res) => {
	const id = req.params.id
	await Blog.findByIdAndRemove(id)
	res.status(204).end()
})



module.exports = blogRoutes