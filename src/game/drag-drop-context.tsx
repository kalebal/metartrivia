import React, { useState } from 'react'
import {
  DragDropContext,
  DraggableLocation,
  DropResult,
} from 'react-beautiful-dnd'
import { Deck } from './deck'
import { Card } from './item'
import { findCorrectSpot, reorder, validateMove } from './logic'
import { Timeline } from './timeline'
import { faker } from '@faker-js/faker'

const getItems = (count = 5, offset = 0) => {
  const array = Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
    year: faker.date.past(800).getFullYear(),
  }))

  array.sort((a, b) => a.year - b.year)
  return array
}

const move = (
  source: Card[],
  destination: Card[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result: Record<string, Card[]> = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}

export const DragDropList = () => {
  const [state, setState] = useState([getItems(1), getItems(2, 1)])

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination || destination.droppableId === 'deck') {
      return
    }

    const dInd = destination.droppableId
    console.log(destination)
    const moved = move(state[0], state[1], source, destination)
    const newState = [...state]
    newState[0] = getItems(1, moved[dInd].length)
    newState[1] = moved[dInd]
    const isValid = validateMove(destination.index, newState[1])
    if (!isValid) {
      console.log('not valid')
      const correctSpot = findCorrectSpot(
        newState[1],
        newState[1][destination.index].year
      )
      newState[1] = reorder(newState[1], destination.index, correctSpot)
    } else {
      console.log('valid!')
    }
    setState(newState)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Deck cards={state[0]} />
      <Timeline cards={state[1]} />
    </DragDropContext>
  )
}
