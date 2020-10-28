const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const blogRoutes = require("./controllers/blogs")
const middlewares = require("./utils/middlewares")

const app = express()

app.use(express.static("build"))
app.use(cors())
app.use(express.json())
app.use(
	morgan((tokens, req, res) => {
		return [
			tokens.method(req, res),
			tokens.url(req, res),
			tokens.status(req, res),
			tokens.res(req, res, "content-length"),
			"-",
			tokens["response-time"](req, res),
			"ms",
			tokens.method(req, res) === "POST" ? JSON.stringify(req.body) : ""
		].join(" ")
	})
)

app.get("/",(req,res) => {
	res.json({
		message : "Welcome to root"
	})
})

app.use("/api/v1/blog",blogRoutes)

app.use(middlewares.notFoundHandler)
app.use(middlewares.errorHandler)



module.exports = app