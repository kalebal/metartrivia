import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'

export type Card = {
  id: string
  content: string
  year: number
  primaryImage?: string
  primaryImageSmall?: string
  artistDisplayName?: string
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
        <MuiCard
          variant="outlined"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <CardMedia
            component="img"
            height="80"
            image={Card.primaryImageSmall}
            alt="green iguana"
          />
          <CardContent>
            <Typography>{Card.content}</Typography>
            <Typography>{Card.year}</Typography>
          </CardContent>
        </MuiCard>
      )}
    </Draggable>
  )
}
