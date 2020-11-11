/* eslint-disable no-undef */
require('dotenv').config()

const PORT = process.env.PORT
let MONGO_URL = process.env.MONGO_URL

const MODE = process.env.NODE_ENV
let SECRET = process.env.SECRET

if (process.env.NODE_ENV === 'test') {
	MONGO_URL = process.env.MONGO_URL_TEST
	SECRET = process.env.SECRET_FOR_TEST
}

module.exports = {
	MONGO_URL: MONGO_URL,
	PORT: PORT,
	MODE: MODE,
	SECRET: SECRET
}
