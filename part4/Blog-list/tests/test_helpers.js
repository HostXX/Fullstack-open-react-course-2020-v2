const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
	{
		title: 'Las cosas de la vida.',
		author: 'El jhon',
		url: 'https://detailed.com/tech-blogs/',
		likes: 10
	},
	{
		title: 'Capitan destino.',
		author: 'Alshir janir',
		url: 'https://billDestiny.com/mind-blogs/',
		likes: 15
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
