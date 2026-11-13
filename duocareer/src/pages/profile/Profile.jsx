import './Profile.css'

export default function Profile({ user, onLogout }) {
  const initials = user.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  return (
    <section className="profile-card">
      <div className="profile-avatar">
        {initials}
      </div>

      <h1>{user.name}</h1>

      <p>{user.email}</p>

      <div className="profile-stats">
        <div>
          <strong>{user.xp ?? 0}</strong>
          <span>XP acumulado</span>
        </div>

        <div>
          <strong>0</strong>
          <span>Pontos concluídos</span>
        </div>
      </div>

      <p className="profile-description">
        Continue aprendendo e desenvolvendo sua carreira!
      </p>

      <button
        type="button"
        className="logout-button"
        onClick={onLogout}
      >
        Sair da conta
      </button>
    </section>
  )
}