import React, { useState } from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Deck } from './deck'
import { findCorrectSpot, reorder, validateMove, move } from './logic'
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

export type DragDropListProps = {
  onInvalidMove: () => any
}
export const DragDropList = (props: DragDropListProps) => {
  const { onInvalidMove } = props
  const [state, setState] = useState([getItems(1), getItems(1, 1)])

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination || destination.droppableId === 'deck') {
      return
    }

    const dInd = destination.droppableId
    const moved = move(state[0], state[1], source, destination)
    const newState = [...state]
    newState[0] = getItems(1, moved[dInd].length)
    newState[1] = moved[dInd]
    const isValid = validateMove(destination.index, newState[1])
    if (!isValid) {
      const correctSpot = findCorrectSpot(
        newState[1],
        newState[1][destination.index].year
      )
      newState[1] = reorder(newState[1], destination.index, correctSpot)
      onInvalidMove()
    } else {
      console.log('valid!')
      // TODO: show year
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
