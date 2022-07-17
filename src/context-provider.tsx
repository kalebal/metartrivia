import React, { createContext, FC } from 'react'
import { useInterpret } from '@xstate/react'
import { gameMachine } from './game/game-machine'
import { InterpreterFrom } from 'xstate'
import { ThemeProvider } from '@mui/system'
import { theme } from './theme'

export const GlobalStateContext = createContext({
  gameService: {} as InterpreterFrom<typeof gameMachine>,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GlobalStateProvider: FC<any> = (props) => {
  const gameService = useInterpret(gameMachine)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStateContext.Provider value={{ gameService }}>
        {props.children}
      </GlobalStateContext.Provider>
    </ThemeProvider>
  )
}
