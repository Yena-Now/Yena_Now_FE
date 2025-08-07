import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
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
import NCutMain from '@pages/NCut/NCutMain'
import CreateSession from '@pages/NCut/CreateSession'
import ParticipationSession from '@pages/NCut/ParticipationSession'
import Session from '@pages/NCut/Session'
import GalleryPage from '@pages/Gallery/Gallery'
import 'react-datepicker/dist/react-datepicker.css'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()

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

  const showHeader =
    isLoggedIn && !location.pathname.startsWith('/film/room/')

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
        {showHeader && <Header />}
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
                isLoggedIn ? <GalleryPage /> : <Navigate to="/login" replace />
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
              path="/film"
              element={
                isLoggedIn ? <NCutMain /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/film/create"
              element={
                isLoggedIn ? (
                  <CreateSession />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/film/participant"
              element={
                isLoggedIn ? (
                  <ParticipationSession />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/film/room/:roomCode"
              element={
                isLoggedIn ? <Session /> : <Navigate to="/login" replace />
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
