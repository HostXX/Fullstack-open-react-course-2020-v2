import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import blogService from './services/blogServices'
import Toggeable from './components/Toggeable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const blogToggleRef = useRef()

  const sortBlogs = blogs.sort((a,b) =>{
      return b.likes - a.likes
    })
  

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
      <Toggeable  ref={blogToggleRef} buttonLabel={'New Blog'} >
      { user ? <BlogForm blogs={blogs} setBlogs={ setBlogs } setErrorMessage={ setErrorMessage } blogToggleRef={blogToggleRef} /> : null}
      </Toggeable>
      <h2>blogs</h2>
      {blogs ? sortBlogs.map(blog => (
        <Blog key={`${blog.id} ${Math.random()}`} blog={blog} setBlogs={setBlogs} setErrorMessage={setErrorMessage} user={user} />
      )) : null}
    
    </div>
  )
}

export default App
