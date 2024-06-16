import React, { useState } from 'react'
import axios from 'axios'

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [token, setToken] = useState('')

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/login', { username, password })
      if (response.status === 200) {
        setMessage('Login successful')
        setToken(response.data.token)
      }
    } catch (error: any) {
      setMessage('Invalid username or password')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      {message && <p>{message}</p>}
      {token && <p>Token: {token}</p>}
    </div>
  )
}

export default Login
