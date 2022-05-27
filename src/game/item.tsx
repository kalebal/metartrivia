import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

export type Card = {
  id: string
  content: string
  year: number
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
  disableDrag?: boolean
}
export const CardItem = (props: CardProps) => {
  const { Card, index, disableDrag = false } = props
  return (
    <Draggable
      draggableId={Card.id}
      index={index}
      key={Card.id}
      isDragDisabled={disableDrag}
    >
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
          {' - '}
          {Card.year}
        </div>
      )}
    </Draggable>
  )
}
