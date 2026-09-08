import { useState } from 'react'

import './App.css'

import Point from './components/Point'
import PointLesson from './components/PointLesson'
import { points } from './data/points'

function App() {
  const [selectedPoint, setSelectedPoint] = useState(null)

  function openPoint(number) {
    setSelectedPoint(number)
  }

  function closePoint() {
    setSelectedPoint(null)
  }

  if (selectedPoint !== null) {
  const point = points.find(
    (item) => item.id === selectedPoint
  )

  return (
    <PointLesson
      point={point}
      onBack={closePoint}
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

        <Point
          number={1}
          status="current"
          onClick={() => openPoint(1)}
        />

        <Point
          number={2}
          status="locked"
          onClick={() => openPoint(2)}
        />

        <Point
          number={3}
          status="locked"
          onClick={() => openPoint(3)}
        />

        <Point
          number={4}
          status="locked"
          onClick={() => openPoint(4)}
        />

        <Point
          number={5}
          status="locked"
          onClick={() => openPoint(5)}
        />

      </section>
    </main>
  )
}

export default App