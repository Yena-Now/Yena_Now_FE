import { Routes, Route, Navigate } from 'react-router-dom'
import Header from '@components/Header/Header'
import GlobalStyle from '@styles/GlobalStyle'
import Landing from '@pages/Landing/Landing'
import { useState, useEffect } from 'react'
import Login from '@pages/Auth/Login'
import Signup from '@pages/Auth/Signup'
import SignupMore from '@pages/Auth/SignupMore'
import SocialCallback from '@pages/Auth/SocialCallback'
import ResetPassword from '@pages/Auth/ResetPassword'
import MyProfileInfo from './pages/MyProfile/MyProfileInfo'
import ChangePassword from '@pages/MyProfile/ChangePassword'
import { StyledToastContainer } from '@styles/hooks/ToastStyles'
import 'react-datepicker/dist/react-datepicker.css'

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

    const handleStorageChange = () => {
      const token = localStorage.getItem('accessToken')
      setIsLoggedIn(!!token)
    }

    window.addEventListener('storage', handleStorageChange)

    const handleCustomStorageChange = () => {
      const token = localStorage.getItem('accessToken')
      setIsLoggedIn(!!token)
    }

    window.addEventListener('authChange', handleCustomStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('authChange', handleCustomStorageChange)
    }
  }, [])

  if (isLoading) {
    return <div>로딩 중...</div>
  }

  return (
    <>
      <GlobalStyle />
      <div>
        <StyledToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          pauseOnFocusLoss={false}
        />
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
            <Route
              path="/gallery"
              element={
                isLoggedIn ? (
                  <div>Gallery Page</div>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route path="/auth/callback" element={<SocialCallback />} />
            <Route
              path="/reset-password"
              element={
                isLoggedIn ? (
                  <Navigate to="/gallery" replace />
                ) : (
                  <ResetPassword />
                )
              }
            />
            <Route
              path="/my-profile"
              element={
                isLoggedIn ? (
                  <MyProfileInfo />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/change-password"
              element={
                isLoggedIn ? (
                  <ChangePassword />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
