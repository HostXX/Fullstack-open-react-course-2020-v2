const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const testHelpers = require('./test_helpers')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')



describe('Blogs API', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
		await User.deleteMany({})

		const newUser = {
			_id : '5fac6f9e38033949392d3e8b',
			username: 'test user',
			name: 'ayy',
			password: 'aaaaaa',
			blogs:['5fac71a4517c814bfe8fdcfc','5fac718b109d384ba75194a5']
		}


		const user = await new User(newUser)
		await user.save()
		
		console.log('el id del user',user.id)

		const BlogObjects = testHelpers.initialBlogs.map(blog => new Blog(blog))
		const promiseArray = BlogObjects.map(blog => blog.save())
		await Promise.all(promiseArray)
	})

	test('correct number of blogs are returned', async () => {
		const allBlogs = await api
			.get('/api/v1/blog')
			.set({
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QgdXNlciIsImlkIjoiNWZhYzZmOWUzODAzMzk0OTM5MmQzZThiIiwiaWF0IjoxNjA1MTM2MzIzfQ.JqH8oqfmdsWH_CdZiGwBgbPmGea4AUuMHZ4ZGLoy20A'
			})
			.expect('Content-Type', /application\/json/)
		expect(allBlogs.body).toHaveLength(testHelpers.initialBlogs.length)
	})

	test('blogs must have the id property', async () => {
		const allBlogs = await api
			.get('/api/v1/blog')
			.set({
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QgdXNlciIsImlkIjoiNWZhYzZmOWUzODAzMzk0OTM5MmQzZThiIiwiaWF0IjoxNjA1MTM2MzIzfQ.JqH8oqfmdsWH_CdZiGwBgbPmGea4AUuMHZ4ZGLoy20A'
			})
			.expect('Content-Type', /application\/json/)

		allBlogs.body.forEach(blog => {
			expect(blog.id).toBeDefined()
		})
	})

	test('blog new blog can be added', async () => {
		const newBlog = {
			title: 'El nuevo blog',
			author: 'Eldish',
			url: 'https://detailed.com/tech-blogs/',
			likes: 16
		}

		await api
			.post('/api/v1/blog')
			.send(newBlog)
			.set({
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QgdXNlciIsImlkIjoiNWZhYzZmOWUzODAzMzk0OTM5MmQzZThiIiwiaWF0IjoxNjA1MTM2MzIzfQ.JqH8oqfmdsWH_CdZiGwBgbPmGea4AUuMHZ4ZGLoy20A'
			})
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const blogsAfrterAddition = await testHelpers.blogsInDb()

		const titles = blogsAfrterAddition.map(r => r.title)

		expect(blogsAfrterAddition).toHaveLength(
			testHelpers.initialBlogs.length + 1
		)
		expect(titles).toContain('El nuevo blog')
	})

	test('adding a blog fails if no token is present', async () => {
		const newBlog = {
			title: 'El nuevo blog',
			author: 'Eldish',
			url: 'https://detailed.com/tech-blogs/',
			likes: 16
		}

		await api
			.post('/api/v1/blog')
			.send(newBlog)
			.expect(401)
			.expect('Content-Type', /application\/json/)
	})

	test('if no like property in blog default to 0', async () => {
		const newBlog = {
			title: 'Sin like property',
			author: 'Eldish',
			url: 'https://detailed.com/tech-blogs/'
		}

		await api
			.post('/api/v1/blog')
			.send(newBlog)
			.set({
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QgdXNlciIsImlkIjoiNWZhYzZmOWUzODAzMzk0OTM5MmQzZThiIiwiaWF0IjoxNjA1MTM2MzIzfQ.JqH8oqfmdsWH_CdZiGwBgbPmGea4AUuMHZ4ZGLoy20A'
			})
			.expect(201)

		const blogsAfrterAddition = await testHelpers.blogsInDb()

		const recentlyAdded = blogsAfrterAddition.filter(
			r => r.title === 'Sin like property'
		)

		expect(recentlyAdded[0].likes).toBe(0)
	})

	test('if no title and url property in blog respond with 400 bad request status', async () => {
		const newBlog = {
			author: 'Eldish',
			likes: 2
		}
		await api
			.post('/api/v1/blog')
			.send(newBlog)
			.set({
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QgdXNlciIsImlkIjoiNWZhYzZmOWUzODAzMzk0OTM5MmQzZThiIiwiaWF0IjoxNjA1MTM2MzIzfQ.JqH8oqfmdsWH_CdZiGwBgbPmGea4AUuMHZ4ZGLoy20A'
			})
			.expect(400)
	})

	test('a blog can be deleted', async () => {
		const blogsInDb = await testHelpers.blogsInDb()
		const blogToBeDeleted = blogsInDb[0]
		await api.delete(`/api/v1/blog/${blogToBeDeleted.id}`).expect(204).set({
			Authorization:
				'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QgdXNlciIsImlkIjoiNWZhYzZmOWUzODAzMzk0OTM5MmQzZThiIiwiaWF0IjoxNjA1MTM2MzIzfQ.JqH8oqfmdsWH_CdZiGwBgbPmGea4AUuMHZ4ZGLoy20A'
		})

		const blogsAfterDeletion = await testHelpers.blogsInDb()
		expect(blogsInDb.length - 1).toBe(blogsAfterDeletion.length)
	})

	test('a blog can be modified adding a like', async () => {
		const blogsInDb = await testHelpers.blogsInDb()
		const blogToBeModified = blogsInDb[0]

		await api
			.put(`/api/v1/blog/${blogToBeModified.id}`)
			.expect(200)
			.set({
				Authorization:
					'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QgdXNlciIsImlkIjoiNWZhYzZmOWUzODAzMzk0OTM5MmQzZThiIiwiaWF0IjoxNjA1MTM2MzIzfQ.JqH8oqfmdsWH_CdZiGwBgbPmGea4AUuMHZ4ZGLoy20A'
			})

		const blogsAfterModification = await testHelpers.blogsInDb()
		const modifiedBlog = blogsAfterModification.filter(
			blog => blog.id === blogToBeModified.id
		)

		expect(blogToBeModified.likes + 1).toBe(modifiedBlog[0].likes)
	})

	afterAll(async () => {
		await Blog.deleteMany({})
		mongoose.connection.close()
	})
})

// test("all Blogs are returned", async () => {
// 	const response = await api.get("/api/Blogs")

// 	expect(response.body).toHaveLength(testHelpers.initialBlogs.length)
// })

// test("a specific Blog is within the returned Blogs", async () => {
// 	const response = await api.get("/api/Blogs")
// 	const contents = response.body.map(r => r.content)
// 	expect(contents).toContain("Browser can execute only Javascript")
// })

// test("a valid Blog can be added", async () => {
// 	const newBlog = {
// 		content: "async/await simplifies making async calls",
// 		important: true
// 	}

// 	await api
// 		.post("/api/Blogs")
// 		.send(newBlog)
// 		.expect(200)
// 		.expect("Content-Type", /application\/json/)

// 	const BlogsAfrterAddition = await testHelpers.BlogsInDb()

// 	const contents = BlogsAfrterAddition.map(r => r.content)

// 	expect(BlogsAfrterAddition).toHaveLength(testHelpers.initialBlogs.length + 1)
// 	expect(contents).toContain("async/await simplifies making async calls")
// })

// test("Blog without content is not added", async () => {
// 	const newBlog = {
// 		important: true
// 	}

// 	await api
// 		.post("/api/Blogs")
// 		.send(newBlog)
// 		.expect(400)
// 	const response = await api.get("/api/Blogs")
// 	expect(response.body).toHaveLength(initialBlogs.length)
// })

// test("a specific Blog can be viewed", async () => {

// 	const BlogsAtStart = await testHelpers.BlogsInDb()

// 	const BlogToView = BlogsAtStart[0]

// 	const resultBlog = await api
// 		.get(`/api/Blogs/${BlogToView.id}`)
// 		.expect(200)
// 		.expect("Content-Type", /application\/json/)
// 	const processedBlogToView = JSON.parse(JSON.stringify(BlogToView))

// 	expect(resultBlog.body).toEqual(processedBlogToView)
// })

// test("a Blog can be deleted", async () => {
// 	const BlogsAtStart = await testHelpers.BlogsInDb()

// 	const BlogToDelete = BlogsAtStart[0]
// 	console.log(BlogToDelete)

// 	await api.delete(`/api/Blogs/${String(BlogToDelete.id)}`).expect(204)

// 	const BlogsAfrterDeletion = await testHelpers.BlogsInDb()

// 	expect(BlogsAfrterDeletion).toHaveLength(testHelpers.initialBlogs.length - 1)

// 	const contents = BlogsAfrterDeletion.map(r => r.content)

// 	expect(contents).not.toContain(BlogToDelete.content)
// })
