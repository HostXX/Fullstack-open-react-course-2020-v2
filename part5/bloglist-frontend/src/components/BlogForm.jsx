import React, { useState } from 'react'
import blogServices from '../services/blogServices'

const BlogForm = ({ setErrorMessage, setBlogs, blogToggleRef }) => {
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [title, setTitle] = useState('')

    const changueHandler = changer => ({ target }) => {
        console.log(target.value)
        return changer(target.value)
    }

    const handleAddNote = async event => {
        event.preventDefault()
        try {
            const blog = await blogServices.create(
                {
                    author: author,
                    title: title,
                    url: url
                })
            setAuthor('')
            setUrl('')
            setTitle('')
            setBlogs((prevState) => [...prevState,blog])
            setErrorMessage('A new Blog has beed added!')
            blogToggleRef.current.toggleVisibility()
            setTimeout(() => {
                setErrorMessage('')
            }, 3000);
            console.log('Blogs', blog)
        } catch (err) {
            setErrorMessage('An error occured while addid your blog')
            setBlogs((prevState)=>prevState)
            setTimeout(() => {
                setErrorMessage(null)
            }, 3000)
        }
    }

    return (
        <div>
            <h1> New BLog </h1>
            <form onSubmit={handleAddNote}>
                <label htmlFor='author'>Author</label>
                <input
                    id='author'
                    name='author'
                    value={author}
                    onChange={changueHandler(setAuthor)}
                />
                <label htmlFor='url'>Url</label>
                <input
                    id='url'
                    name='url'
                    value={url}
                    onChange={changueHandler(setUrl)}
                />
                <label htmlFor='title'>Title</label>
                <input
                    id='title'
                    name='title'
                    value={title}
                    onChange={changueHandler(setTitle)}
                />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default BlogForm
