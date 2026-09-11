import { useEffect, useState } from 'react'

import { evaluateAnswer } from '../utils/answerEvaluator'

function PointLesson({
  point,
  onBack,
  onComplete
}) {
  const [questionIndex, setQuestionIndex] = useState(0)

  const [showQuestion, setShowQuestion] = useState(false)
  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState(null)

  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const [attempts, setAttempts] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const [completedQuestions, setCompletedQuestions] = useState([])

  const currentQuestion = point.questions[questionIndex]

  const [showCompletion, setShowCompletion] = useState(false)
  const [showSummary, setShowSummary] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowQuestion(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [questionIndex])

  function checkAnswer() {
    if (answer.trim() === '') {
      return
    }

    setIsAnalyzing(true)
    setResult(null)

    setTimeout(() => {
      const evaluation = evaluateAnswer(
        answer,
        currentQuestion
      )

      setIsAnalyzing(false)

      setResult(evaluation)

      if (evaluation.result === 'correct') {
        setCompletedQuestions((current) => [
          ...current,
          {
            questionId: currentQuestion.id,
            answer,
            evaluation
          }
        ])
      } else {
        setAttempts((current) => current + 1)
      }
    }, 2500)
  }

  function nextQuestion() {
    if (questionIndex >= point.questions.length - 1) {
      return
    }

    setQuestionIndex((current) => current + 1)

    setAnswer('')
    setResult(null)
    setAttempts(0)
    setShowAnswer(false)
    setShowQuestion(false)
  }

  function finishPoint() {
    onComplete()

    setShowCompletion(true)

    setTimeout(() => {
      setShowCompletion(false)
      setShowSummary(true)
    }, 3000)
  }

  return (
    <>
    {showCompletion && (
      <div className="completion-overlay">
        <div className="completion-bar">
          <h1>Ponto {point.id} Concluído!</h1>
        </div>
      </div>
    )}

    <section className="lesson">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Voltar
      </button>

      <div className="lesson-header">

        <span className="lesson-number">
          PONTO {point.id}
        </span>

        <h2>{point.title}</h2>

        <p>{point.introduction}</p>

      </div>

      <div className="questions-container">

        {point.questions.map((question, index) => {

          if (index > questionIndex) {
            return null
          }

          const isCurrent = index === questionIndex

          const completed = completedQuestions.find(
            (item) => item.questionId === question.id
          )

          return (
            <div
              className={`question ${
                !isCurrent ? 'question-completed' : ''
              }`}
              key={question.id}
            >

              {/* CONTEÚDO DA PERGUNTA */}

              <article className="question-content">

                <span className="content-label">
                  CONTEÚDO
                </span>

                <p>{question.content}</p>

              </article>

              {/* PERGUNTA */}

              <span className="question-label">
                PERGUNTA {index + 1} DE {point.questions.length}
              </span>

              <h3>
                {question.question}
              </h3>

              {/* PERGUNTA JÁ RESPONDIDA */}

              {!isCurrent && completed && (
                <div className="previous-answer">

                  <span>SUA RESPOSTA</span>

                  <p>{completed.answer}</p>

                  <strong>✓ Respondida</strong>

                </div>
              )}

              {/* PERGUNTA ATUAL */}

              {isCurrent && (
                <>
                  <textarea
                    value={answer}
                    onChange={(event) =>
                      setAnswer(event.target.value)
                    }
                    placeholder="Escreva sua resposta..."
                    disabled={isAnalyzing}
                  />

                  <button
                    className="check-button"
                    onClick={checkAnswer}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing
                      ? 'ANALISANDO...'
                      : 'VERIFICAR'}
                  </button>

                  {isAnalyzing && (
                    <div className="loading-feedback">
                      Analisando sua resposta...
                    </div>
                  )}

                  {result && !isAnalyzing && (
                    <div
                      className={`feedback ${result.result}`}
                    >

                      <strong>
                        {result.message}
                      </strong>

                      <p>
                        {result.explanation}
                      </p>

                      {result.hint && attempts < 5 && (
                        <div className="hint">
                          💡 {result.hint}
                        </div>
                      )}

                      {showAnswer && (
                        <div className="expected-answer">

                          <span>
                            RESPOSTA ESPERADA
                          </span>

                          <p>
                            {currentQuestion.expectedAnswer}
                          </p>

                        </div>
                      )}

                      {attempts >= 5 &&
                        !showAnswer &&
                        result.result !== 'correct' && (
                          <button
                            className="reveal-button"
                            onClick={() =>
                              setShowAnswer(true)
                            }
                          >
                            REVELAR RESPOSTA
                          </button>
                        )}

                      {(result.result === 'correct' ||
                        showAnswer) && (
                        <button
                          className="next-button"
                          onClick={
                            questionIndex >=
                            point.questions.length - 1
                              ? finishPoint
                              : nextQuestion
                          }
                        >
                          {questionIndex >=
                          point.questions.length - 1
                            ? 'FINALIZAR ✓'
                            : 'PRÓXIMA PERGUNTA →'}
                        </button>
                      )}

                    </div>
                  )}
                </>
              )}

            </div>
          )
        })}

      </div>

    </section>
      {showSummary && (
        <div className="summary-overlay">

          <section className="point-summary">

            <div className="summary-header">
              <span>PONTO {point.id}</span>

              <h1>{point.title}</h1>
            </div>

            <div className="summary-questions">

              {point.questions.map((question, index) => (
                <div
                  className="summary-question"
                  key={question.id}
                >
                  <span>Pergunta {index + 1}</span>

                  <strong>✓ Respondida</strong>
                </div>
              ))}

            </div>

            <div className="summary-info">

              <span>ESTADO</span>

              <strong>
                Concluído com sucesso!
              </strong>

            </div>

            <div className="summary-buttons">

              <button
                className="summary-button secondary"
                onClick={onBack}
              >
                IR PARA A TRILHA
              </button>

              <button
                className="summary-button"
                onClick={onBack}
              >
                PRÓXIMO PONTO
              </button>

            </div>

          </section>

        </div>
      )}
  </>
  )
}

export default PointLesson