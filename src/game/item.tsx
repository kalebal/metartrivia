import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

export type Card = {
  id: string
  content: string
}

export type CardProps = {
  Card: Card
  index: number
}
export const CardItem = (props: CardProps) => {
  const { Card, index } = props
  return (
    <Draggable draggableId={Card.id} index={index} key={Card.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {Card.content}
        </div>
      )}
    </Draggable>
  )
}
