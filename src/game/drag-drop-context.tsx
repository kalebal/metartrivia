import React, { useState } from 'react'
import {
  DragDropContext,
  DraggableLocation,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import { Card, CardItem } from './item'

const getItems = (count = 5, offset = 0) => {
  return Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }))
}

const reorder = (list: Card[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

/**
 * Moves an item from one list to another list.
 */
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

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: 8,
  overflow: 'auto',
})

export const DragDropList = () => {
  const [state, setState] = useState([getItems(1), getItems(2, 1)])

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (!destination) {
      return
    }

    const sInd = +source.droppableId
    const dInd = +destination.droppableId

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index)
      const newState = [...state]
      newState[sInd] = items
      console.log(newState)
      setState(newState)
    } else {
      const result = move(state[sInd], state[dInd], source, destination)
      console.log(result)
      const newState = [...state]
      newState[sInd] = result[sInd]
      newState[dInd] = result[dInd]
      if (!newState[0].length) {
        newState[0].push(getItems(1, result[dInd].length)[0])
      }
      setState(newState)
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {state.map((el, ind) => (
        <Droppable key={ind} droppableId={`${ind}`} direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {el.map((Card: Card, index: number) => (
                <CardItem Card={Card} index={index} key={Card.id} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  )
}
