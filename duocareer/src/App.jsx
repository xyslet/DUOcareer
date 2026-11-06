
import { useState, useEffect } from 'react'

import './App.css'

import Point from './components/Point'
import PointLesson from './components/PointLesson'
import { points as localPoints } from './data/points'

function App() {
  const [selectedPoint, setSelectedPoint] = useState(null)

  const [displayPoints, setDisplayPoints] = useState(localPoints)

  const [loading, setLoading] = useState(true)
  const [apiError, setApiError] = useState(false)

  const [pointStatuses, setPointStatuses] = useState({
    1: 'current',
    2: 'locked',
    3: 'locked',
    4: 'locked',
    5: 'locked'
  })

  const [pointData, setPointData] = useState({})

  // Busca os pontos na API
  useEffect(() => {
    async function loadPoints() {
      try {
        const response = await fetch(
          'http://localhost:3000/api/points'
        )

        if (!response.ok) {
          throw new Error('Erro ao buscar pontos')
        }

        const result = await response.json()

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error('Formato de resposta inválido')
        }

        // Mantém as perguntas e introduções das aulas locais
        const updatedPoints = result.data.map((apiPoint) => {
          const localPoint = localPoints.find(
            (point) => point.id === apiPoint.id
          )

          if (!localPoint) return null

          return {
            ...localPoint,
            ...apiPoint,
            introduction: localPoint.introduction,
            questions: localPoint.questions
          }
        }).filter(Boolean)

        if (updatedPoints.length > 0) {
          setDisplayPoints(updatedPoints)
        }

      } catch (error) {
        console.error('Erro ao carregar pontos:', error)
        setApiError(true)

      } finally {
        setLoading(false)
      }
    }

    loadPoints()
  }, [])

  function openPoint(number) {
    if (pointStatuses[number] === 'locked') {
      return
    }

    setSelectedPoint(number)
  }

  function closePoint() {
    setSelectedPoint(null)
  }

  function completePoint(pointId, data) {
    setPointStatuses((current) => {
      const nextPoint = pointId + 1

      return {
        ...current,
        [pointId]: 'completed',
        ...(current[nextPoint]
          ? { [nextPoint]: 'current' }
          : {})
      }
    })

    setPointData((current) => ({
      ...current,
      [pointId]: data
    }))
  }

  function resetPoint(pointId) {
    setPointData((current) => {
      const updated = { ...current }

      delete updated[pointId]

      return updated
    })
  }

  // Tela da aula selecionada
  if (selectedPoint !== null) {
    const point = displayPoints.find(
      (item) => item.id === selectedPoint
    )

    if (!point) {
      return null
    }

    return (
      <PointLesson
        point={point}
        onBack={closePoint}
        onComplete={completePoint}
        onReset={resetPoint}
        savedData={pointData[selectedPoint]}
        isCompleted={
          pointStatuses[selectedPoint] === 'completed'
        }
      />
    )
  }

  // Mapa principal
  return (
    <main>

      <header className="header">
        <h1>DUOcareer</h1>

        <div className="stats">
          <span>🔥 0</span>
          <span>⭐ 0 XP</span>
        </div>
      </header>

      <section className="welcome">
        <h2>Minha jornada</h2>

        <p>
          Construa sua carreira, um ponto de cada vez.
        </p>
      </section>

      {loading && (
        <p className="api-loading">
          Carregando pontos...
        </p>
      )}

      {apiError && (
        <p className="api-error">
          Não foi possível conectar à API.
          Exibindo os pontos locais.
        </p>
      )}

      <section className="map">

        {displayPoints.map((point) => (
          <Point
            key={point.id}
            number={point.id}
            status={pointStatuses[point.id] || 'locked'}
            onClick={() => openPoint(point.id)}
          />
        ))}

      </section>

    </main>
  )
}

export default App
