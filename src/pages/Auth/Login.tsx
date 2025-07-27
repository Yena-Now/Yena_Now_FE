import React from 'react'
import { Link } from 'react-router-dom'

const Login: React.FC = () => {
  return (
    <>
      <h1>현재 회원가입 구현 중이기에 회원가입에 대해서만 생각</h1>
      <Link to="/signup">
        <button>회원가입</button>
      </Link>
    </>
  )
}

export default Login
