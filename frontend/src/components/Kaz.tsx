import React, { useEffect, useState } from 'react'
import api from '../api'

interface User {
  id: number
  name: string
  email: string
}

const Kaz: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    api
      .get<User[]>('/api/users')
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.error('There was an error fetching the users!', error)
      })
  }, [])

  return (
    <div>
      <h1>Kaz Page</h1>
      <p>This is the about page.</p>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Kaz
