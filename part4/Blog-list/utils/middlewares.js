const config = require("./config")

const errorHandler = (err, req, res,next) => {
	if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
		res.status(400)
		console.log(config.MODE)

		res.json({
			message: "Something broke with the json parser!",
			stack: config.MODE === "development" ? err.stack : {}
		})
	}
    
	// res.status(err.status || 500)
	// return res.json({
	//     message: "Something broke!",
	//     stack: process.env.MODE === "development" ? err.stack : {}
	// })

	next(err)
}

const notFoundHandler = (req, res) => {
	res.status(404).send({ error: "unknown endpoint" })
}

module.exports = {
	errorHandler,
	notFoundHandler
}