import { useEffect, useState } from 'react'
import { evaluateAnswer } from '../utils/answerEvaluator'

function PointLesson({ onBack }) {
  const [showQuestion, setShowQuestion] = useState(false)
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

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

  setIsAnalyzing(true)
  setResult(null)


  setTimeout(() => {
    const evaluation = evaluateAnswer(answer)

    setIsAnalyzing(false)
    setResult(evaluation)


    if (evaluation.result !== 'correct') {
      setAttempts((current) => current + 1)
      console.log('Tentativa número:', attempts + 1)
    }
  }, 2500)
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

          {result && !isAnalyzing && (
            <div className={`feedback ${result.result}`}>

              <strong>{result.message}</strong>

              <p>{result.explanation}</p>

              {result.hint && (
                <div className="hint">
                  💡 {result.hint}
                </div>
              )}

              {showAnswer && (
                <div className="expected-answer">
                  <span>RESPOSTA ESPERADA</span>

                  <p>{result.expectedAnswer}</p>
                </div>
              )}

              {attempts >= 5 && !showAnswer && result.result !== 'correct' && (
                <button
                  className="reveal-button"
                  onClick={() => setShowAnswer(true)}
                >
                  REVELAR RESPOSTA
                </button>
              )}

            </div>
          )}


        </div>
      )}
    </section>
  )
}

export default PointLesson