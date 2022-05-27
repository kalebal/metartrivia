import { Droppable } from 'react-beautiful-dnd'
import React, { useState } from 'react'
import { Card, CardItem } from './item'

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  display: 'flex',
  padding: 8,
  overflow: 'auto',
})

export type DeckProps = {
  cards: Card[]
}
export const Deck = (props: DeckProps) => {
  const { cards } = props

  return (
    <Droppable key={0} droppableId="deck" direction="horizontal">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {cards.map((Card: Card, index: number) => (
            <CardItem Card={Card} index={index} key={Card.id} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}
