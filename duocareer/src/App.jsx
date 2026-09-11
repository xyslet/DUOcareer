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
    5: 'locked',
    6: 'locked',
    7: 'locked',
    8: 'locked',
    9: 'locked',
    10: 'locked'
  })

  function openPoint(number) {
    setSelectedPoint(number)
  }

  function closePoint() {
    setSelectedPoint(null)
  }

  function completePoint(pointId) {
    setPointStatuses((current) => ({
      ...current,
      [pointId]: 'completed',
      [pointId + 1]: 'current'
    }))
  }

  if (selectedPoint !== null) {
  const point = points.find(
    (item) => item.id === selectedPoint
  )

  return (
    <PointLesson
      point={point}
      onBack={closePoint}
      onComplete={() => completePoint(point.id)}
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
        <Point number={1} status="current" onClick={() => openPoint(1)} />
        <Point number={2} status="locked" onClick={() => openPoint(2)} />
        <Point number={3} status="locked" onClick={() => openPoint(3)} />
        <Point number={4} status="locked" onClick={() => openPoint(4)} />
        <Point number={5} status="locked" onClick={() => openPoint(5)} />
        <Point number={6} status="locked" onClick={() => openPoint(6)} />
        <Point number={7} status="locked" onClick={() => openPoint(7)} />
        <Point number={8} status="locked" onClick={() => openPoint(8)} />
        <Point number={9} status="locked" onClick={() => openPoint(9)} />
        <Point number={10} status="locked" onClick={() => openPoint(10)} />
      </section>
    </main>
  )
}

export default App