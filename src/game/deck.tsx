import { Droppable } from 'react-beautiful-dnd'
import React from 'react'
import { Card, CardItem } from './item'
import { Paper } from '@mui/material'

export type DeckProps = {
  cards: Card[]
}
export const Deck = (props: DeckProps) => {
  const { cards } = props

  return (
    <Droppable key={0} droppableId="deck" direction="horizontal">
      {(provided) => (
        <Paper
          ref={provided.innerRef}
          {...provided.droppableProps}
          elevation={2}
        >
          <div style={deckStyle}>
            {cards.map((Card: Card, index: number) => (
              <CardItem Card={Card} index={index} key={Card.id} />
            ))}
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
