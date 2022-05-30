import { Droppable } from 'react-beautiful-dnd'
import React from 'react'
import { Card, CardItem } from './item'
import { Paper } from '@mui/material'

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: 8,
  overflow: 'auto',
  width: '100vw',
  justifyContent: 'center',
})

export type TimelineProps = {
  cards: Card[]
}
export const Timeline = (props: TimelineProps) => {
  const { cards } = props

  return (
    <Droppable key={1} droppableId="timeline" direction="horizontal">
      {(provided, snapshot) => (
        <Paper
          elevation={3}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div style={getListStyle(snapshot.isDraggingOver)}>
            {cards.map((Card: Card, index: number) => (
              <CardItem Card={Card} index={index} key={Card.id} disableDrag />
            ))}
            {provided.placeholder}
          </div>
        </Paper>
      )}
    </Droppable>
  )
}
