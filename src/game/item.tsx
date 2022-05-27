import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

export type Card = {
  id: string
  content: string
}

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  userSelect: 'none',
  padding: 16,
  margin: `0 ${8}px 0 0`,
  background: isDragging ? '#003c00' : 'grey',
  ...draggableStyle,
})

export type CardProps = {
  Card: Card
  index: number
}
export const CardItem = (props: CardProps) => {
  const { Card, index } = props
  return (
    <Draggable draggableId={Card.id} index={index} key={Card.id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          {Card.content}
        </div>
      )}
    </Draggable>
  )
}
