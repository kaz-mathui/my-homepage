import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'
import { useAuth } from '../context/AuthContext'

interface User {
  id: number
  username: string
}

const Kaz: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    } else {
      api
        .get<User[]>('/api/users')
        .then((response) => {
          setUsers(response.data)
        })
        .catch((error) => {
          console.error('There was an error fetching the users!', error)
        })
    }
  }, [isLoggedIn, navigate])

  return (
    <div>
      <h1>Kaz Page</h1>
      <p>This is the about page.</p>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  )
}

export default Kaz
