import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { userAPI } from '@/api/user'
import { reissueToken } from '@api/client'
import { useAuthStore } from '@/store/authStore'
import Header from '@components/Header/Header'
import Landing from '@pages/Landing/Landing'
import Login from '@pages/Auth/Login'
import Signup from '@pages/Auth/Signup'
import SignupMore from '@pages/Auth/SignupMore'
import SocialCallback from '@pages/Auth/SocialCallback'
import ResetPassword from '@pages/Auth/ResetPassword'
import MyProfileInfo from '@pages/MyProfile/MyProfileInfo'
import ChangePassword from '@pages/MyProfile/ChangePassword'
import NCutMain from '@pages/NCut/NCutMain'
import CreateSession from '@pages/NCut/CreateSession'
import ParticipationSession from '@pages/NCut/ParticipationSession'
import Session from '@pages/NCut/Session'
import GalleryPage from '@pages/Gallery/Gallery'
import GlobalStyle from '@styles/GlobalStyle'
import { StyledToastContainer } from '@styles/hooks/ToastStyles'
import 'react-datepicker/dist/react-datepicker.css'
import GalleryDetailPage from '@pages/Gallery/GalleryDetail'
import Moment from '@pages/Moment'
import EditNCut from '@pages/NCut/EditNCut'
import * as S from '@/styles/components/Common/LoadingStyle'
import UserProfilePage from '@/pages/UserProfile/UserProfile'

function App() {
  const location = useLocation()
  const setAuth = useAuthStore((state) => state.setAuth)
  const setAuthChecked = useAuthStore((state) => state.setAuthChecked)
  const logout = useAuthStore((state) => state.logout)
  const isAuthChecking = useAuthStore((state) => state.isAuthChecking)
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn)

  useEffect(() => {
    const handleInitialRefresh = async () => {
      try {
        const response = await reissueToken()
        const accessToken = response.accessToken
        setAuth(accessToken, null)
        const me = await userAPI.getUserMeInfo()
        setAuth(accessToken, me)
      } catch {
        logout()
      } finally {
        setAuthChecked(false)
      }
    }
    handleInitialRefresh()
  }, [setAuth, logout, setAuthChecked])

  // Landing 페이지 여부 확인
  const isLandingPage = location.pathname === '/'

  if (isAuthChecking) {
    return (
      <S.LoaderWrapper>
        <S.Spinner />
        <S.LoadingText>로딩 중입니다...</S.LoadingText>
      </S.LoaderWrapper>
    )
  }

  const showHeader = isLoggedIn && !location.pathname.startsWith('/film/room/')

  return (
    <>
      <GlobalStyle />
      <div data-page={isLandingPage ? 'landing' : 'app'}>
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
              path="/film/room/:roomCode/edit"
              element={
                isLoggedIn ? <EditNCut /> : <Navigate to="/login" replace />
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
            <Route
              path="/gallery/:ncutUuid"
              element={
                isLoggedIn ? (
                  <GalleryDetailPage />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/daily-moment"
              element={
                isLoggedIn ? <Moment /> : <Navigate to="/login" replace />
              }
            />
            <Route
              path="/profile/:userUuid"
              element={
                isLoggedIn ? (
                  <UserProfilePage />
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
