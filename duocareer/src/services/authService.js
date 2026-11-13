const USERS_KEY = 'duocareer_mock_users'
const SESSION_KEY = 'duocareer_mock_session'

function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function registerUser({ name, email, password }) {
  const users = getUsers()

  const normalizedEmail = email.trim().toLowerCase()

  const existingUser = users.find(
    (user) => user.email === normalizedEmail
  )

  if (existingUser) {
    throw new Error('Este e-mail já está cadastrado.')
  }

  const newUser = {
    id: crypto.randomUUID(),
    name: name.trim(),
    email: normalizedEmail,
    xp: 0,
    createdAt: new Date().toISOString()
  }

  // Simulação: não armazenar senhas em texto puro.
  // A autenticação real será feita pelo backend.

  saveUsers([...users, {
    ...newUser,
    password
  }])

  localStorage.setItem(SESSION_KEY, JSON.stringify(newUser))

  return newUser
}

export function loginUser({ email, password }) {
  const users = getUsers()

  const normalizedEmail = email.trim().toLowerCase()

  const user = users.find(
    (item) =>
      item.email === normalizedEmail &&
      item.password === password
  )

  if (!user) {
    throw new Error('E-mail ou senha incorretos.')
  }

  const { password: ignoredPassword, ...safeUser } = user

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify(safeUser)
  )

  return safeUser
}

export function getCurrentUser() {
  return JSON.parse(
    localStorage.getItem(SESSION_KEY) || 'null'
  )
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY)
}
