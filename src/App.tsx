import { Routes, Route, Navigate } from 'react-router-dom'
import Header from '@components/Header/Header'
import GlobalStyle from '@styles/GlobalStyle'
import Landing from '@pages/Landing/Landing'
import { useState, useEffect } from 'react'
import Login from '@pages/Auth/Login'
import Signup from '@pages/Auth/Signup'
import SignupMore from '@pages/Auth/SignupMore'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('accessToken')
      setIsLoggedIn(!!token)
      setIsLoading(false)
    }

    checkAuthStatus()
  }, [])

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  return (
    <>
      <GlobalStyle />
      <div>
        {isLoggedIn && !window.location.pathname.startsWith('/film/') && (
          <Header />
        )}
        <main>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? <Navigate to="/gallery" replace /> : <Landing />
              }
            />
            <Route
              path="/login"
              element={
                isLoggedIn ? <Navigate to="/gallery" replace /> : <Login />
              }
            />
            <Route
              path="/signup"
              element={
                isLoggedIn ? <Navigate to="/gallery" replace /> : <Signup />
              }
            />
            <Route
              path="/signup/more"
              element={
                isLoggedIn ? <Navigate to="/gallery" replace /> : <SignupMore />
              }
            />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
