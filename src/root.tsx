import React from 'react'
import { GlobalStateProvider } from './context-provider'
import { App } from './app'

export const Root = () => {
  return (
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  )
}
