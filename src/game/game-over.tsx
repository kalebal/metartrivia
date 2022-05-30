import React from 'react'

export type GameOverProps = {
  onReplay: () => void
}

export const GameOver = (props: GameOverProps) => {
  const { onReplay } = props

  return (
    <div>
      <div>Game Over</div>
      <button onClick={onReplay}>Replay</button>
    </div>
  )
}
