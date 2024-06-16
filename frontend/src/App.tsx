import React from 'react'
import { AuthProvider } from './context/AuthContext'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Kaz from './components/Kaz'
import Register from './components/Register'
import Login from './components/Login'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/kaz' element={<Kaz />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
