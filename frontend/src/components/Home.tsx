import React from 'react'
import styled from 'styled-components'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

// Styled componentsを使用してスタイルを定義
const Container = styled.div`
  text-align: center;
`

const Header = styled.header`
  background-color: #282c34;
  padding: 20px;
  color: white;
`

const Main = styled.main`
  margin-top: 20px;
`

const WelcomeContainer = styled.div`
  margin-bottom: 20px;
`

const LogoutButton = styled.button`
  background-color: #61dafb;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #21a1f1;
  }
`

const LoginContainer = styled.div`
  margin: 20px;
`

const LoginLink = styled(Link)`
  display: inline-block;
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #61dafb;
  border-radius: 5px;
  text-decoration: none;

  &:hover {
    background-color: #21a1f1;
  }
`

const Home: React.FC = () => {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    toast.success('Logout successful!')
    navigate('/login')
  }

  return (
    <Container>
      <Header>
        <h1>ホーム田中ページ</h1>
      </Header>
      <Main>
        {isLoggedIn ? (
          <WelcomeContainer>
            <p>Welcome back!</p>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </WelcomeContainer>
        ) : (
          <LoginContainer>
            <p>Please log in to continue.</p>
            <LoginLink to='/login'>Go to Login</LoginLink>
          </LoginContainer>
        )}
      </Main>
    </Container>
  )
}

export default Home
