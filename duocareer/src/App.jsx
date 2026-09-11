import { useState } from 'react'

import './App.css'

import Point from './components/Point'
import PointLesson from './components/PointLesson'
import { points } from './data/points'

function App() {
  const [selectedPoint, setSelectedPoint] = useState(null)

  const [pointStatuses, setPointStatuses] = useState({
    1: 'current',
    2: 'locked',
    3: 'locked',
    4: 'locked',
    5: 'locked'
  })

  const [pointData, setPointData] = useState({})

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
        ...(pointStatuses[nextPoint]
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

  if (selectedPoint !== null) {
    const point = points.find(
      (item) => item.id === selectedPoint
    )

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

      <section className="map">

        {points.map((point) => (
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