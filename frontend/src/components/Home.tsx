import React from 'react'
import { useAuth } from '../context/AuthContext'

const Home: React.FC = () => {
  const { isLoggedIn, logout } = useAuth()

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>ホームページ</h1>
      </header>
      <main>
        {isLoggedIn ? (
          <div>
            <p>Welcome back!</p>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <p>Please log in to continue.</p>
        )}
      </main>
    </div>
  )
}

export default Home
