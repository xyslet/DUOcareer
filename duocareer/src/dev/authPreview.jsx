import { useState } from 'react'

import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import Profile from '../pages/profile/Profile'

import {
  getCurrentUser,
  logoutUser
} from '../services/authService'

import '../pages/auth/Auth.css'

export default function AuthPreview() {
  const [user, setUser] = useState(() => getCurrentUser())

  const [page, setPage] = useState(() =>
    getCurrentUser() ? 'profile' : 'login'
  )

  function handleLogin(userData) {
    setUser(userData)
    setPage('profile')
  }

  function handleRegister(userData) {
    setUser(userData)
    setPage('profile')
  }

  function handleLogout() {
    logoutUser()
    setUser(null)
    setPage('login')
  }

  return (
    <main className="auth-preview">
      <header className="auth-header">
        <h2>DUOcareer</h2>
        <span>Sua jornada profissional</span>
      </header>

      {page === 'login' && (
        <Login
          onLogin={handleLogin}
          onGoToRegister={() => setPage('register')}
        />
      )}

      {page === 'register' && (
        <Register
          onRegister={handleRegister}
          onGoToLogin={() => setPage('login')}
        />
      )}

      {page === 'profile' && user && (
        <Profile
          user={user}
          onLogout={handleLogout}
        />
      )}
    </main>
  )
}