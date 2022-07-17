import { Droppable } from 'react-beautiful-dnd'
import React from 'react'
import { CardItem } from './card-item'
import { Card } from './../model/card'
import { Paper } from '@mui/material'

export type DeckProps = {
  card: Card
}
export const Deck = (props: DeckProps) => {
  const { card } = props

  return (
    <Droppable key={0} droppableId="deck" direction="horizontal">
      {(provided) => (
        <Paper
          ref={provided.innerRef}
          {...provided.droppableProps}
          elevation={24}
        >
          <div>
            <CardItem card={card} index={0} key={card.id} />
            {provided.placeholder}
          </div>
        </Paper>
      )}
    </Droppable>
  )
}
