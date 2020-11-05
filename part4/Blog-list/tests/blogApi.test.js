const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const testHelpers = require("./test_helpers")

const api = supertest(app)


const Blog = require("../models/blog")

describe("Blogs API", () => {

	beforeEach(async () => {
		await Blog.deleteMany({})
    
		const BlogObjects = testHelpers.initialBlogs
			.map(blog => new Blog(blog))
		const promiseArray = BlogObjects.map(blog => blog.save())
		await Promise.all(promiseArray)
	})
    
	test("correct number of blogs are returned",async() => {
		const allBlogs = await api.get("/api/v1/blog")
		expect(allBlogs.body).toHaveLength(testHelpers.initialBlogs.length)
	})
        
	test("blogs must have the id property",async() => {
		const allBlogs = await api.get("/api/v1/blog")
            
		allBlogs.body.forEach(blog => {
			expect(blog.id).toBeDefined()
		})
	})
        
    
	test("blog new blog can be added", async () => {
		const newBlog= 	{
			title: "El nuevo blog",
			author: "Eldish",
			url: "https://detailed.com/tech-blogs/",
			likes: 16,
		}
    
		await api
			.post("/api/v1/blog")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/)
    
		const blogsAfrterAddition = await testHelpers.blogsInDb()
    
		const titles = blogsAfrterAddition.map(r => r.title)
    
		expect(blogsAfrterAddition).toHaveLength(testHelpers.initialBlogs.length + 1)
		expect(titles).toContain("El nuevo blog")
	})
        
	afterAll(async() => {
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
    


