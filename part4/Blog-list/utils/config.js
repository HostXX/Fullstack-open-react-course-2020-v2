/* eslint-disable no-undef */
require("dotenv").config()

const PORT = process.env.PORT
const MONGO_URL = process.env.NODE_ENV === "test" ? process.env.MONGO_URL_TEST : process.env.MONGO_URL
console.log(MONGO_URL)

const MODE = process.env.MODE

module.exports = {
	MONGO_URL : MONGO_URL,
	PORT : PORT,
	MODE : MODE
}