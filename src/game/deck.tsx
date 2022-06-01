import { Droppable } from 'react-beautiful-dnd'
import React from 'react'
import { Card, CardItem } from './item'
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
          elevation={2}
        >
          <div style={deckStyle}>
            <CardItem Card={card} index={0} key={card.id} />
            {provided.placeholder}
          </div>
        </Paper>
      )}
    </Droppable>
  )
}

const deckStyle = {
  background: 'lightgreen',
  display: 'flex',
  padding: 8,
  overflow: 'auto',

  justifyContent: 'center',
}
