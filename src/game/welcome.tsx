import React from 'react'

export type WelcomeProps = {
  onStart: () => void
}

export const Welcome = (props: WelcomeProps) => {
  const { onStart } = props

  return (
    <div>
      <div>Welcome!</div>
      <button onClick={onStart}>Start</button>
    </div>
  )
}
