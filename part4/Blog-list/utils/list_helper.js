const totalLikes = blogs => {
	const reducer = (acc, blog) => {
		return acc + blog.likes
	}

	const total = blogs.reduce(reducer, 0)

	return total
}

totalLikes([])

module.exports = {
	totalLikes
}
