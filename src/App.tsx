import React, { useState } from 'react'
import './App.css'
import { DragDropList } from './game/drag-drop-context'
import { GameOver } from './game/game-over'
import { faker } from '@faker-js/faker'
import { Card } from './game/item'
import { DropResult } from 'react-beautiful-dnd'
import { findCorrectSpot, move, reorder, validateMove } from './game/logic'
import { gameMachine } from './game/gameMachine'
import { useMachine } from '@xstate/react'

const getItems = (count = 5, offset = 0) => {
  const array = Array.from({ length: count }, (v, k) => k).map(
    (k) =>
      ({
        id: `item-${k + offset}-${new Date().getTime()}`,
        content: `item ${k + offset}`,
        year: faker.date.past(800).getFullYear(),
      } as Card)
  )

  array.sort((a, b) => a.year - b.year)
  return array
}

export function App() {
  const [lives, setLives] = useState(0)
  const [streak, setStreak] = useState(0)
  const [timeline, setTimeline] = useState(getItems(1))
  const [placeHolder, setPlaceHolder] = useState(getItems(1, 1)[0])
  const handleReplay = () => {
    setLives(3)
    setTimeline(getItems(1))
    setStreak(0)
  }

  const handleInvalidMove = () => {
    setLives(lives - 1)
  }

  const handleValidMove = () => {
    setPlaceHolder(getItems(1, streak + 2)[0])
    setStreak(streak + 1)
  }

  const handleMove = (result: DropResult) => {
    const { source, destination } = result
    if (!destination || destination.droppableId === 'deck') {
      return
    }
    const newTimeline = move(placeHolder, timeline, source, destination)
    const isValid = validateMove(destination.index, newTimeline)
    if (!isValid) {
      const correctSpot = findCorrectSpot(
        newTimeline,
        newTimeline[destination.index].year
      )
      setTimeline(reorder(newTimeline, destination.index, correctSpot))
      handleInvalidMove()
    } else {
      setTimeline(newTimeline)
      handleValidMove()
      console.log('valid!')
      // TODO: show year
    }
  }

  return (
    <div className="App">
      <header className="App-header">App</header>
      <div className="scoreboard">
        {lives ? (
          <>
            <div> Lives: {lives}</div>
            <div> Streak: {streak}</div>
          </>
        ) : (
          <GameOver onReplay={handleReplay} />
        )}
      </div>
      {lives && (
        <div className="board">
          <DragDropList
            timeline={timeline}
            placeholderCard={placeHolder}
            onMove={handleMove}
          />
        </div>
      )}
    </div>
  )
}

export default App
