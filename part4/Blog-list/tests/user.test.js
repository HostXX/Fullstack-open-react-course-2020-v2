const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const testHelpers = require('./test_helpers')

describe('when there is initially one user in db', () => {
	beforeEach(async () => {
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	})

	test('valid user can be created', async () => {
		const usersAtStart = await testHelpers.usersInDb()

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen'
		}

		await api
			.post('/api/v1/user')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await testHelpers.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		expect(usernames).toContain(newUser.username)
	})
	test('creation fails with proper statuscode and message if user is invalid', async () => {
		const usersAtStart = await testHelpers.usersInDb()

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen'
		}

		const result = await api
			.post('/api/v1/user')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		expect(result.body.error).toContain('`username` to be unique')

		const usersAtEnd = await testHelpers.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length)
	})
	afterAll(() => {
		mongoose.connection.close()
	})
})
