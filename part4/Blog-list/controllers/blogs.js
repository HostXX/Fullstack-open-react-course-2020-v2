const blogRoutes = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogRoutes.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	res.json(blogs)
})

blogRoutes.post('/', async (req, res) => {
	const body = req.body
	const users = await User.find({})
	const user =  await User.findById(users[0].id)
	console.log(user)
	

	const newBlog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes ? body.likes : 0,
		user: user.id
	}

	const blog = new Blog(newBlog)
	const result = await blog.save()

	user.blogs = user.blogs.concat(result.id)

	await user.save()

	res.status(201).json(result)
})

blogRoutes.get('/:id', async (req, res) => {
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

blogRoutes.delete('/:id', async (req, res) => {
	const id = req.params.id
	await Blog.findByIdAndRemove(id)
	res.status(204).end()
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
