import { useState } from 'react'
import { registerUser } from '../../services/authService'

export default function Register({ onRegister, onGoToLogin }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    if (form.name.trim().length < 3) {
      setError('Informe um nome com pelo menos 3 caracteres.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Informe um e-mail válido.')
      return
    }

    if (form.password.length < 8) {
      setError('A senha precisa ter pelo menos 8 caracteres.')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('As senhas não coincidem.')
      return
    }

    try {
      setLoading(true)

      const user = registerUser({
        name: form.name,
        email: form.email,
        password: form.password
      })

      onRegister(user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="auth-card">
      <h1>Criar conta</h1>

      <p>Comece sua jornada profissional com o DUOcareer.</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="register-name">Nome completo</label>
        <input
          id="register-name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Seu nome"
          required
        />

        <label htmlFor="register-email">E-mail</label>
        <input
          id="register-email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="seuemail@email.com"
          required
        />

        <label htmlFor="register-password">Senha</label>
        <input
          id="register-password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Mínimo de 8 caracteres"
          required
        />

        <label htmlFor="register-confirm">Confirmar senha</label>
        <input
          id="register-confirm"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Digite a senha novamente"
          required
        />

        {error && <p className="auth-error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Criando conta...' : 'Criar minha conta'}
        </button>
      </form>

      <p className="auth-switch">
        Já possui uma conta?
        {' '}
        <button type="button" onClick={onGoToLogin}>
          Entrar
        </button>
      </p>
    </section>
  )
}