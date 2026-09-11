import { useEffect, useState } from 'react'

import { evaluateAnswer } from '../utils/answerEvaluator'

function PointLesson({
  point,
  onBack,
  onComplete,
  onReset,
  savedData,
  isCompleted
}) {
  const [questionIndex, setQuestionIndex] = useState(
    savedData ? point.questions.length - 1 : 0
  )

  const [showQuestion, setShowQuestion] = useState(
    Boolean(savedData)
  )

  const [answer, setAnswer] = useState('')
  const [result, setResult] = useState(null)

  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const [attempts, setAttempts] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const [completedQuestions, setCompletedQuestions] =
    useState(savedData?.answers || [])

  const [showCompletion, setShowCompletion] = useState(false)
  const [showSummary, setShowSummary] = useState(false)

  const [startTime] = useState(
    savedData?.startTime || Date.now()
  )

  const currentQuestion = point.questions[questionIndex]

  useEffect(() => {
    if (!savedData) {
      setAnswer('')
      return
    }

    const savedAnswer =
      savedData.answers?.find(
        (item) => item.questionId === currentQuestion.id
      )?.answer || ''

    setAnswer(savedAnswer)
  }, [currentQuestion.id, savedData])

  useEffect(() => {
    if (savedData) {
      return
    }

    const timer = setTimeout(() => {
      setShowQuestion(true)
    }, 5000)

    return () => clearTimeout(timer)
  }, [questionIndex, savedData])

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
        saveAnswer(evaluation)
      } else {
        setAttempts((current) => current + 1)
      }
    }, 2500)
  }

  function saveAnswer(evaluation) {
    setCompletedQuestions((current) => {
      const alreadyAnswered = current.some(
        (item) =>
          item.questionId === currentQuestion.id
      )

      if (alreadyAnswered) {
        return current
      }

      return [
        ...current,
        {
          questionId: currentQuestion.id,
          answer,
          result: evaluation.result
        }
      ]
    })
  }

  function revealAnswer() {
    setShowAnswer(true)

    saveAnswer({
      result: 'revealed'
    })
  }

  function nextQuestion() {
    if (questionIndex >= point.questions.length - 1) {
      const finalAnswers = completedQuestions.some(
        (item) =>
          item.questionId === currentQuestion.id
      )
        ? completedQuestions
        : [
            ...completedQuestions,
            {
              questionId: currentQuestion.id,
              answer: answer.trim(),
              result: showAnswer
                ? 'revealed'
                : 'correct'
            }
          ]

      setCompletedQuestions(finalAnswers)

      const elapsedTime = Date.now() - startTime

      onComplete(point.id, {
        startTime,
        elapsedTime,
        answers: finalAnswers
      })

      setShowCompletion(true)

      setTimeout(() => {
        setShowCompletion(false)
        setShowSummary(true)
      }, 3000)

      return
    }

    setQuestionIndex((current) => current + 1)

    setAnswer('')
    setResult(null)
    setAttempts(0)
    setShowAnswer(false)
    setShowQuestion(false)
  }

  function reopenStatistics() {
    setShowSummary(true)
  }

  function resetLesson() {
    const confirmed = window.confirm(
      'Tem certeza que deseja refazer este Ponto?\n\nSuas respostas serão apagadas, mas o progresso e o estado de Ponto concluído serão mantidos.'
    )

    if (!confirmed) {
      return
    }

    onReset(point.id)

    setQuestionIndex(0)
    setShowQuestion(false)
    setAnswer('')
    setResult(null)
    setAttempts(0)
    setShowAnswer(false)
    setCompletedQuestions([])
    setShowSummary(false)
  }

  function formatTime(milliseconds) {
    const totalSeconds = Math.floor(
      milliseconds / 1000
    )

    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${String(minutes).padStart(2, '0')}:${String(
      seconds
    ).padStart(2, '0')}`
  }

  const savedTime = savedData?.elapsedTime || 0

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
              (item) =>
                item.questionId === question.id
            )

            return (
              <div
                className={`question ${
                  !isCurrent
                    ? 'question-completed'
                    : ''
                }`}
                key={question.id}
              >

                <article className="question-content">

                  <span className="content-label">
                    CONTEÚDO
                  </span>

                  <p>{question.content}</p>

                </article>

                <span className="question-label">
                  PERGUNTA {index + 1} DE{' '}
                  {point.questions.length}
                </span>

                <h3>{question.question}</h3>

                {!isCurrent && completed && (
                  <div className="previous-answer">

                    <span>SUA RESPOSTA</span>

                    <p>{completed.answer}</p>

                    <strong>
                      ✓ Respondida
                    </strong>

                  </div>
                )}

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

                        {result.hint &&
                          attempts < 5 && (
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
                              onClick={revealAnswer}
                            >
                              REVELAR RESPOSTA
                            </button>
                          )}

                        {(result.result === 'correct' ||
                          showAnswer) && (
                          <button
                            className="next-button"
                            onClick={nextQuestion}
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

        {isCompleted && (
          <div className="completed-actions">

            <button
              className="completed-action"
              onClick={reopenStatistics}
            >
              VER ESTATÍSTICAS
            </button>

            <button
              className="completed-action secondary"
              onClick={resetLesson}
            >
              REFAZER
            </button>

          </div>
        )}

      </section>

      {showSummary && (
        <div className="summary-overlay">

          <section className="point-summary">

            <div className="summary-header">

              <span>
                PONTO {point.id}
              </span>

              <h1>{point.title}</h1>

            </div>

            <div className="summary-questions">

              {point.questions.map(
                (question, index) => {

                  const answer =
                    completedQuestions.find(
                      (item) =>
                        item.questionId ===
                        question.id
                    )

                  return (
                    <div
                      className="summary-question"
                      key={question.id}
                    >

                      <span>
                        Pergunta {index + 1}
                      </span>

                      <strong>
                        {answer
                          ? '✓ Respondida'
                          : '— Não respondida'}
                      </strong>

                    </div>
                  )
                }
              )}

            </div>

            <div className="summary-info">

              <span>TEMPO</span>

              <strong>
                {formatTime(savedTime)}
              </strong>

              <span>ESTADO</span>

              <strong>
                Concluído com sucesso!
              </strong>

            </div>

            <div className="summary-buttons">

              <button
                className="summary-button"
                onClick={onBack}
              >
                IR PARA A TRILHA
              </button>

              <button
                className="summary-button"
                onClick={() => {
                  setShowSummary(false)
                }}
              >
                VOLTAR AO PONTO
              </button>

            </div>

          </section>

        </div>
      )}

    </>
  )
}

export default PointLesson