import { useEffect, useState } from 'react'

function PointLesson({ onBack }) {
  const [showQuestion, setShowQuestion] = useState(false)
  const [answer, setAnswer] = useState('')
  const [checked, setChecked] = useState(false)

  

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuestion(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  function checkAnswer() {
    if (answer.trim() === '') {
      return
    }

    setChecked(true)
  }

  return (
    <section className="lesson">

      <button className="back-button" onClick={onBack}>
        ← Voltar
      </button>

      <div className="lesson-header">

        <span className="lesson-number">
          PONTO 1
        </span>

        <h2>
          Introdução à carreira profissional
        </h2>

        <p>
          Antes de construir uma carreira, é importante entender
          o que significa desenvolver-se profissionalmente.
        </p>

      </div>

      <article className="lesson-content">

        <p>
          Uma carreira profissional é construída ao longo do tempo
          por meio de experiências, conhecimentos, habilidades e
          decisões que ajudam uma pessoa a alcançar seus objetivos.
        </p>

        <p>
          Ela não precisa seguir um caminho completamente planejado.
          É normal descobrir novos interesses, mudar de área e
          desenvolver novas competências durante esse processo.
        </p>

      </article>

      {showQuestion && (
        <div className="question">

          <span className="question-label">
            PERGUNTA
          </span>

          <h3>
            Por que uma carreira profissional não precisa
            seguir um caminho completamente planejado?
          </h3>

          <textarea
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="Escreva sua resposta..."
          />

          <button
            className="check-button"
            onClick={checkAnswer}
          >
            VERIFICAR
          </button>

          {checked && (
            <div className="fake-feedback">
              <strong>Hmm... é quase isso.</strong>

              <p>
                Essa é uma resposta de exemplo.
                Em breve, uma IA irá analisar sua resposta.
              </p>
            </div>
          )}

        </div>
      )}

    </section>
  )
}

export default PointLesson