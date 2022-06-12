import React from 'react'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { Deck } from './deck'
import { Timeline } from './timeline'
import { Card } from './item'

export type DragDropListProps = {
  onMove: (result: DropResult) => void
  placeholderCard: Card
  timeline: Card[]
}
export const DragDropList = (props: DragDropListProps) => {
  const { onMove, placeholderCard, timeline } = props

  const handleDragEnd = (result: DropResult) => {
    onMove(result)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Deck card={placeholderCard} />
      <Timeline cards={timeline} />
    </DragDropContext>
  )
}
