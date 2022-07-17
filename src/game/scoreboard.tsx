import React from 'react'
import CardContent from '@mui/material/CardContent'

export type ScoreboardProps = {
  lives: number
  streak: number
  totalMoves: number
}
export const Scoreboard = (props: ScoreboardProps) => {
  const { lives, streak, totalMoves } = props
  return (
    <CardContent>
      <div> Lives: {lives}</div>
      <div> Streak: {streak}</div>
      <div> Total Moves: {totalMoves}</div>
    </CardContent>
  )
}
