const config = require('./config')
const jwt = require('jsonwebtoken')

const errorHandler = (err, req, res, next) => {
	if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
		res.status(400)
		res.json({
			message: 'Something broke with the json parser!',
			stack: config.MODE === 'development' ? err.stack : {}
		})
	}

	if (err.name === 'CastError') {
		return res.status(400).send({
			error: 'malformatted id',
			stack: config.MODE === 'development' ? err.stack : {}
		})
	}

	if (err.name === 'ValidationError') {
		res.status(400)
		return res.json({
			error: err.message,
			stack: config.MODE === 'development' ? err.stack : {}
		})
	}

	if (err.name === 'TypeError') {
		res.status(400)
		return res.json({
			error: err.message,
			stack: config.MODE === 'development' ? err.stack : {}
		})
	}

	if (err.name === 'JsonWebTokenError') {
		res.status(400)
		return res.json({
			error: err.message,
			stack: config.MODE === 'development' ? err.stack : {}
		})
	}

	if (err.name === 'AuthError') {
		res.status(401)
		return res.json({
			error: err.message,
			stack: config.MODE === 'development' ? err.stack : {}
		})
	}

	res.status(err.status || 500)
	res.json({
		name: err.name,
		message: 'Something broke! check the traces mau!',
		stack: config.MODE === 'development' ? err.stack : {}
	})

	next(err)
}

const notFoundHandler = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}

const tokenHandler = async (req, res, next) => {
	const authorizationHeader = req.get('authorization')

	if (
		authorizationHeader &&
		authorizationHeader.toLowerCase().startsWith('bearer ')
	) {
		const token = authorizationHeader.substring(7)
		try {
			const user = await jwt.verify(token, config.SECRET)
			req.user = user
			next()
		} catch (err) {
			next(err)
		}
	} else {
		const err = {
			name: 'AuthError',
			message: 'No bearer token present in the request'
		}
		next(err)
	}
}

module.exports = {
	errorHandler,
	notFoundHandler,
	tokenHandler
}
