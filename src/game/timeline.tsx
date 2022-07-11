import { Droppable } from 'react-beautiful-dnd'
import React from 'react'
import { Card, CardItem } from './item'
import { Paper } from '@mui/material'

export type TimelineProps = {
  cards: Card[]
}
export const Timeline = (props: TimelineProps) => {
  const { cards } = props

  return (
    <Droppable key={1} droppableId="timeline" direction="horizontal">
      {(provided) => (
        <Paper
          elevation={3}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="timeline">
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
