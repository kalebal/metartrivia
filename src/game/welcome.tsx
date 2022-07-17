import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import React from 'react'

export type WelcomeProps = {
  onStart: () => void
}

export const Welcome = (props: WelcomeProps) => {
  const { onStart } = props

  return (
    <div>
      <Typography variant="body2" sx={{ marginBottom: '16px' }}>
        Welcome!
      </Typography>
      <Button variant="contained" onClick={onStart}>
        Start
      </Button>
    </div>
  )
}
