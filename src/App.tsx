import { Routes, Route, Navigate } from 'react-router-dom'
import Header from '@components/Header/Header'
import GlobalStyle from '@styles/GlobalStyle'
import Landing from '@pages/Landing/Landing'
import { useState, useEffect } from 'react'
import Login from '@pages/Auth/Login'
import Signup from '@pages/Auth/Signup'
import SignupMore from '@pages/Auth/SignupMore'
import SocialCallback from '@pages/Auth/SocialCallback'
import { StyledToastContainer } from '@styles/hooks/ToastStyles'
import ResetPassword from '@pages/Auth/ResetPassword'
import NCutMain from '@pages/NCut/NCutMain'
import CreateSession from '@pages/NCut/CreateSession'
import ParticipationSession from './pages/NCut/ParticipationSession'
import Session from '@pages/NCut/Session'
import PublicGallery from '@pages/Gallery/PublicGallery'
import FollowingGallery from './pages/Gallery/FollowingGallery'
import UserGallery from './pages/Gallery/UserGallery'
import MyGallery from './pages/Gallery/MyGallery'
import GalleryPage from '@pages/Gallery/Gallery'

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
        {isLoggedIn && !window.location.pathname.startsWith('/film/room/') && (
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
            <Route path="/gallery/public" element={<PublicGallery />} />
            <Route path="/gallery/followings" element={<FollowingGallery />} />
            <Route path="/gallery/:userUuid" element={<UserGallery />} />
            <Route path="/gallery/me" element={<MyGallery />} />
          </Routes>
        </main>
      </div>
    </>
  )
}

export default App
