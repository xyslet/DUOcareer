import { useState } from 'react'
import { loginUser } from '../../services/authService'

export default function Login({ onLogin, onGoToRegister }) {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value
    }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (!form.email.trim() || !form.password) {
      setError('Preencha todos os campos.')
      return
    }

    try {
      setLoading(true)

      const user = loginUser(form)

      onLogin(user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-card">
      <h1>Bem-vindo de volta!</h1>

      <p>Entre na sua conta e continue sua jornada.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="login-email">E-mail</label>
        <input
          id="login-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="seuemail@email.com"
          required
        />

        <label htmlFor="login-password">Senha</label>
        <input
          id="login-password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Sua senha"
          required
        />

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className="auth-switch">
        Ainda não possui uma conta?
        {' '}
        <button type="button" onClick={onGoToRegister}>
          Criar conta
        </button>
      </p>
    </section>
  )
}