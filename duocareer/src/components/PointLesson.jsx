import { useEffect, useState } from 'react'

function PointLesson({ onBack }) {
  const [showQuestion, setShowQuestion] = useState(false)
  const [answer, setAnswer] = useState('')
  const [checked, setChecked] = useState(false)

  // NOVO: Estado para controlar a animação de carregamento
  const [isAnalyzing, setIsAnalyzing] = useState(false)

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

    // NOVO: Inicia o processo de análise e esconde feedbacks antigos
    setIsAnalyzing(true)
    setChecked(false)

    // NOVO: Simula o tempo que a IA leva para pensar (ex: 2.5 segundos)
    setTimeout(() => {
      setIsAnalyzing(false) // Para de analisar
      setChecked(true)      // Mostra o feedback final
    }, 2500)


    // temporariamente desativado: setChecked(true)
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
            disabled={isAnalyzing} // NOVO: Bloqueia digitação enquanto analisa
          />

          <button
            className="check-button"
            onClick={checkAnswer}
            disabled={isAnalyzing} // NOVO: Desabilita o botão para evitar vários cliques
          >
            {isAnalyzing ? 'ANALISANDO...' : 'VERIFICAR'}
          </button>

          {/* NOVO: Componente que aparece enquanto a IA "pensa" */}
          {isAnalyzing && (
            <div className="loading-feedback">
              Analisando sua resposta...
            </div>
          )}

          {/* SÓ MOSTRA SE: O check finalizou e não está mais analisando */}
          {checked && !isAnalyzing && (
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