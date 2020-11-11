const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
	const body = req.body

	const user = await User.findOne({ username: body.username })

	const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)

	if (user && passwordCorrect) {
		const userForToken = {
			username: user.username,
			id: user.id
		}

		// eslint-disable-next-line no-undef
		const token = jwt.sign(userForToken, process.env.SECRET)

		return res.json({
			token,
			username: user.username,
			name: user.name
		})
	}

	return res.status(401).json()
})

module.exports = loginRouter
