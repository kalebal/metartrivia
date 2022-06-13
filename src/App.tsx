import React, { useContext, useState } from 'react'
import './App.css'
import { DragDropList } from './game/drag-drop-context'
import { GameOver } from './game/game-over'
import { faker } from '@faker-js/faker'
import { Card } from './game/item'
import { DropResult } from 'react-beautiful-dnd'
import { findCorrectSpot, move, reorder, validateMove } from './game/logic'
import { useActor } from '@xstate/react'
import { GlobalStateContext } from './context-provider'
import { Welcome } from './game/welcome'

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
  const [timeline, setTimeline] = useState(getItems(1))
  const [placeHolder, setPlaceHolder] = useState(getItems(1, 1)[0])
  const { gameService } = useContext(GlobalStateContext)
  // const { send } = gameService

  const [state] = useActor(gameService)
  console.log(state.value)
  const handleReplay = () => {
    gameService.send('REPLAY')
  }

  const handleStart = () => {
    gameService.send('START')
  }

  const handleInvalidMove = () => {
    gameService.send('INVALID')
  }

  const handleValidMove = () => {
    console.log('valid!')
    gameService.send('VALID')
  }

  const handleMove = (result: DropResult) => {
    const { source, destination } = result
    if (!destination || destination.droppableId === 'deck') {
      return
    }
    gameService.send('MOVE')
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
      // TODO: show year
    }
    setPlaceHolder(getItems(1, state.context.totalMoves + 2)[0])
  }

  return (
    <div className="App">
      <header className="App-header">App</header>
      <div className="scoreboard">
        {state.matches('gameover') ? (
          <GameOver onReplay={handleReplay} />
        ) : state.matches('welcome') ? (
          <Welcome onStart={handleStart} />
        ) : (
          <>
            <div> Lives: {state.context.lives}</div>
            <div> Streak: {state.context.streak}</div>
            <div> Total Moves: {state.context.totalMoves}</div>
            {/* <div> Current state: {state.toStrings()}</div> */}
          </>
        )}
      </div>
      {state.context.lives && (
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
