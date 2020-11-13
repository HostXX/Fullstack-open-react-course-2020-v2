import React,{ useState } from 'react'
import blogServices from '../services/blogServices'

const Blog = ({ blog,setBlogs, setErrorMessage ,user}) => {
  const [showAllInfo, setShowAllInfo] = useState(true)

  const togleInfoShow = ()=> setShowAllInfo((prevState)=> !prevState)

  const likeHandler = (id) => async ()=> {
    const newUpdatedBlog = await blogServices.update(id)
    setBlogs((prevState)=> {
      const newState = prevState.map((blog) => {
       if (blog.id === id) {
         return {
           ...blog,
           likes: newUpdatedBlog.likes
         }
       }
       return blog
      })
      return newState
    })
  }

  const deleteHandler = (id) => async()=>{


    if (window.confirm("Do you want to delete this blog?")) {
      try {
        await blogServices._delete(id)
 
       setBlogs((prev) => {
         return prev.filter((blog) => blog.id !== id)
       })
 
     } catch (error) {
       setBlogs((prev) => {
         return prev.filter((blog) => blog.id !== id)
       })
       setErrorMessage()
       setTimeout(() => {
         setErrorMessage(null)
       }, 3000);
     }
    }
  }

  const allInfo = (
    <div style={{border: '1px solid black', padding:'10px', lineHeight:'2'}}>
      <div>{blog.title}<button onClick={togleInfoShow} type='button'>{showAllInfo ? 'Show less' : 'Show more' }</button></div>
      <div> {blog.url}</div>
      <div> {blog.author}</div>
      <div> {blog.likes}{' '}<button onClick={likeHandler(blog.id)} style={{fontSize:'10px'}}> Like</button></div>
      { user.username === blog.user.username ? <button style={{backgroundColor:'red',color:'#fff',cursor:'pointer'}} onClick={ deleteHandler(blog.id)}>delete</button> : null}
      {console.log(user,blog)}
    </div>
  )

  return (
    <div>
    {showAllInfo ? allInfo : <div>{blog.title}<button onClick={togleInfoShow} type='button'>{showAllInfo ? 'Show less' : 'Show more' }</button></div> }
    </div>
  )
}

export default Blog
