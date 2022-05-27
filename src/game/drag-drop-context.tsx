import React, { useState } from 'react'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'
import { Card, CardItem } from './item'

const initial = Array.from({ length: 10 }, (v, k) => k).map((k) => {
  const custom: Card = {
    id: `id-${k}`,
    content: `Card ${k}`,
  }

  return custom
})

const reorder = (list: Card[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: 8,
  overflow: 'auto',
})

export const DragDropList = () => {
  const [state, setState] = useState(initial)

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }

    if (result.destination.index === result.source.index) {
      return
    }

    const Cards = reorder(state, result.source.index, result.destination.index)

    setState(Cards)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="list" direction="horizontal">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getListStyle(snapshot.isDraggingOver)}
          >
            {state.map((Card: Card, index: number) => (
              <CardItem Card={Card} index={index} key={Card.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
