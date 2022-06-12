import React, { createContext, FC } from 'react'
import { useInterpret } from '@xstate/react'
import { gameMachine } from './game/gameMachine'
import { InterpreterFrom } from 'xstate'

export const GlobalStateContext = createContext({
  gameService: {} as InterpreterFrom<typeof gameMachine>,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GlobalStateProvider: FC<any> = (props) => {
  const gameService = useInterpret(gameMachine)

  return (
    <GlobalStateContext.Provider value={{ gameService }}>
      {props.children}
    </GlobalStateContext.Provider>
  )
}
