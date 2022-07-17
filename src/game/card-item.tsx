import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import {
  Card as MuiCard,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import { Card } from './../model/card'

export type CardProps = {
  card: Card
  index: number
  disableDrag?: boolean
}
export const CardItem = (props: CardProps) => {
  const { card, index, disableDrag = false } = props
  return (
    <Draggable
      draggableId={card.id.toString()}
      index={index}
      key={card.id}
      isDragDisabled={disableDrag}
    >
      {(provided) => (
        <MuiCard
          variant="outlined"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{ width: 200, padding: '16px' }}
        >
          <CardMedia
            component="img"
            height="100px"
            image={card.primaryImageSmall}
            alt={card.content}
          />
          <CardContent>
            <Typography>{card.content}</Typography>
            <Typography>{card.year}</Typography>
          </CardContent>
        </MuiCard>
      )}
    </Draggable>
  )
}
