const totalLikes = blogs => {
	const reducer = (acc, blog) => {
		return acc + blog.likes
	}

	const total = blogs.reduce(reducer, 0)

	return total
}

const favoriteBlog = blogs => {
	if (blogs.length === 0) {
		return {}
	} else {
		return blogs.reduce((acc, blog) => {
			if (blog.likes >= acc.likes) {
				acc = blog
			}
			return acc
		})
	}
}


const mostBlogs = blogs => {
	if (blogs.length === 0) {
		return {}
	} else {
		const totalBlogsPerAuthor = blogs.reduce((acc, blog) => {
			if (acc[blog.author]) {
				acc[blog.author].blogs++
			} else {
				acc[blog.author] = {
					author: blog.author,
					blogs: 1
				}
			}
			return acc
		}, {})

		const authorWithMostBlogs = Object.values(totalBlogsPerAuthor).reduce(
			(acc, author) => {
				if (author.blogs >= acc.blogs) {
					acc = author
				}
				return acc
			}
		)

		return authorWithMostBlogs
	}
}



const blogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url:
            "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url:
            "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
		likes: 12,
		__v: 0
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url:
            "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0
	},
	{
		_id: "5a422bc61b54a676234d17fc",
		title: "Type wars",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
		likes: 2,
		__v: 0
	}
]



const mostLikes = (blogs) => {
	if (blogs.length === 0) {
		return {}
	} else {
		return blogs.reduce((acc, blog) => {
			if (blog.likes >= acc.likes) {
				acc["author"] = blog.author
				acc["likes"] = blog.likes
			}
			return acc
		},{
			author:"",
			likes:0
		})
	}
}

module.exports = {
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
