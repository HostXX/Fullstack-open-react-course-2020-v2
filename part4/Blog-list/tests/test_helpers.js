const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
	{	_id:'5fac71a4517c814bfe8fdcfc',
		title: 'Las cosas de la vida.',
		author: 'El jhon',
		url: 'https://detailed.com/tech-blogs/',
		likes: 10,
		user:'5fac6f9e38033949392d3e8b'
	},
	{
		_id:'5fac718b109d384ba75194a5',
		title: 'Capitan destino.',
		author: 'Alshir janir',
		url: 'https://billDestiny.com/mind-blogs/',
		likes: 15,
		user: '5fac6f9e38033949392d3e8b'
	}
]

const nonExistingId = async () => {
	const blog = new Blog({
		title: 'Will be deleted later',
		author: 'maujir janir',
		url: 'https://sombishur.com/minbilld-blogs/',
		likes: 12
	})
	await blog.save()
	await blog.remove()
	return blog.id.toString()
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(u => u.toJSON())
}

module.exports = {
	initialBlogs,
	nonExistingId,
	blogsInDb,
	usersInDb
}
