import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import blogService from './services/blogServices'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const logOut = () => {
    setUser(null)
    setBlogs([])
    window.localStorage.clear()
    setErrorMessage('Logged Out')
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000);
  }

  useEffect(() => {
    if (user) {
      blogService
      .getAll().then(blogs => setBlogs(blogs))
    }
  },[user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

    return ()=>setUser(null)
    
  }, [])

  return (
    <div>
    {errorMessage ? <p>{`${errorMessage}`}</p> : null}
      {user ? null : <Login setUser={setUser} setErrorMessage={setErrorMessage} />}
      {user ? <p>Welcome: {user.name}!</p> : null } { user ? <button type='button' onClick={logOut}>logout</button> : null}
      <br/>
      { user ? <BlogForm blogs={blogs} setBlogs={ setBlogs } setErrorMessage={ setErrorMessage } /> : null}
     
      <h2>blogs</h2>
      {blogs ? blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      )) : null}
    
    </div>
  )
}

export default App
