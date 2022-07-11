import React, { useContext, useState } from 'react'
import './App.css'
import { DragDropList } from './game/drag-drop-context'
import { GameOver } from './game/game-over'
import { Card } from './game/item'
import { DropResult } from 'react-beautiful-dnd'
import { findCorrectSpot, move, reorder, validateMove } from './game/logic'
import { useActor } from '@xstate/react'
import { GlobalStateContext } from './context-provider'
import { Welcome } from './game/welcome'
import { mockItemIDs } from './model'
import { TimelineObject } from './model/api/timeline-object'
import { mockCardData } from './items/items'
import { Typography } from '@mui/material'
// import { useItems } from './model'

const getItem = async (offset = 0) => {
  const idx = mockItemIDs[offset]
  const response = await fetch(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${idx}`
  )
  const result = await response.json().then((data: TimelineObject) => {
    return {
      id: data.objectID.toString(),
      content: data.title,
      year: data.objectBeginDate,
      primaryImageSmall: data.primaryImageSmall,
    } as Card
  })
  return result
}

export function App() {
  const [timeline, setTimeline] = useState([mockCardData()])
  const [placeHolder, setPlaceHolder] = useState(mockCardData())
  const { gameService } = useContext(GlobalStateContext)

  const [state] = useActor(gameService)
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
    gameService.send('VALID')
  }

  const handleMove = async (result: DropResult) => {
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
    setPlaceHolder(await getItem(state.context.totalMoves + 2))
  }

  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h1">App</Typography>
        <div className="scoreboard">
          {state.matches('gameover') ? (
            <GameOver onReplay={handleReplay} />
          ) : state.matches('welcome') && state.context.totalMoves === 0 ? (
            <Welcome onStart={handleStart} />
          ) : (
            <>
              <div> Lives: {state.context.lives}</div>
              <div> Streak: {state.context.streak}</div>
              <div> Total Moves: {state.context.totalMoves}</div>
            </>
          )}
        </div>
      </header>
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
