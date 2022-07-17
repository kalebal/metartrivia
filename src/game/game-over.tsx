import { Button, CardContent, Typography } from '@mui/material'
import React from 'react'

export type GameOverProps = {
  onReplay: () => void
}

export const GameOver = (props: GameOverProps) => {
  const { onReplay } = props

  return (
    <CardContent>
      <Typography>Game Over</Typography>
      <Button onClick={onReplay} variant="contained" color="secondary">
        Replay
      </Button>
    </CardContent>
  )
}
