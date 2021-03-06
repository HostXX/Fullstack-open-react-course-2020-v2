const blogRoutes = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const middlewares = require('../utils/middlewares')

blogRoutes.get('/', middlewares.tokenHandler, async (req, res) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	res.json(blogs)
})

blogRoutes.post('/', middlewares.tokenHandler, async (req, res) => {
	const body = req.body
	const user = await User.findById(req.user.id)

	const newBlog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes ? body.likes : 0,
		user: user.id
	}

	const blog = new Blog(newBlog)

	const result = await blog.save()
	await result.populate('user', { username: 1, name: 1 }).execPopulate()

	user.blogs = user.blogs.concat(result.id)

	await user.save()

	res.status(201).json(result)
})

blogRoutes.get('/:id', middlewares.tokenHandler, async (req, res) => {
	const id = req.params.id
	const blog = await Blog.findById(id)

	if (blog) {
		return res.json({
			blog
		})
	} else {
		return res.status(400).json({
			message: 'Not found'
		})
	}
})

blogRoutes.delete('/:id', middlewares.tokenHandler, async (req, res) => {
	const blogId = req.params.id
	const userId = req.user.id

	const user = await User.findById(userId)

	if (user.blogs.includes(blogId)) {
		await Blog.findByIdAndRemove(blogId)
		return res.status(204).end()
	} else {
		throw {
			name: 'AuthError',
			message: 'Invalid user attempting to delete the blog'
		}
	}
})

blogRoutes.put('/:id', async (req, res) => {
	const id = req.params.id
	const updatedBlog = await Blog.findByIdAndUpdate(
		id,
		{ $inc: { likes: 1 } },
		{
			new: true
		}
	)

	res.status(200).json(updatedBlog)
})

module.exports = blogRoutes
