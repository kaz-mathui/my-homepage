import React, { useState } from 'react'
import axios from 'axios'

const Register: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/register', { username, password })
      if (response.status === 201) {
        setMessage('User registered successfully')
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setMessage('Username already exists')
      } else {
        setMessage('Server error')
      }
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <button type='submit'>Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Register
