const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const middlewares = require('../utils/middlewares')

usersRouter.get('/',middlewares.tokenHandler, async (req, res) => {
	const users = await User.find({}).populate('blogs',{title : 1, author: 1, url: 1 })
	res.json(users)
})

usersRouter.post('/', async (req, res) => {
	const body = req.body

	if (body.password && body.password.length < 3) {
		throw {
			name: 'ValidationError',
			message:'Password validation failed: password: Error, expected `password` to be 3 characters long.'
		}
	}

	const saltRounds = 12
	const passwordHash = await bcrypt.hash(body.password, saltRounds)

	const user = new User({
		username: body.username,
		name: body.name,
		passwordHash
	})

	const savedUser = await user.save()
	return res.json(savedUser)
})

usersRouter.delete('/:id', async (req, res) => {
	const id = req.params.id

	await User.findByIdAndRemove(id)
	res.status(204).end()
})

module.exports = usersRouter
