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

module.exports = {
	totalLikes,
	favoriteBlog,
	mostBlogs
}
