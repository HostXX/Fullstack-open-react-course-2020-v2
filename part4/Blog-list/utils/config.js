/* eslint-disable no-undef */
require("dotenv").config()

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL
const MODE = process.env.MODE

module.exports = {
	MONGO_URL : MONGO_URL,
	PORT : PORT,
	MODE : MODE
}