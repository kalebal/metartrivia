import React, { useState } from 'react'
import './App.css'
import { DragDropList } from './game/drag-drop-context'
import { GameOver } from './game/game-over'

function App() {
  const [lives, setLives] = useState(0)
  const handleReplay = () => {
    setLives(3)
  }

  return (
    <div className="App">
      <header className="App-header">App</header>
      <div className="scoreboard">
        {lives ? (
          <div> Lives: {lives}</div>
        ) : (
          <GameOver onReplay={handleReplay} />
        )}
      </div>
      <div className="board">
        <DragDropList onInvalidMove={() => setLives(lives - 1)} />
      </div>
    </div>
  )
}

export default App
