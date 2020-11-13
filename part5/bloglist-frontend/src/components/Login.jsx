import React, { useState } from 'react'
import blogServices from '../services/blogServices'
import loginService from '../services/loginService'

const Login = ({ setUser, setErrorMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      blogServices.setToken(user.token)
      setUsername('')
      setPassword('')
      setUser(user)
    } catch (err) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const changueHandler = changer => ({ target }) => {
    console.log(target.value)
    return changer(target.value)
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={changueHandler(setUsername)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={changueHandler(setPassword)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login
