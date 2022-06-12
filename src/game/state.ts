import { createMachine, assign } from 'xstate'

interface Context {
  lives: number
  streak: number
  totalMoves: number
}

const fetchMachine = createMachine<Context>({
  id: 'game',
  initial: 'welcome',
  context: {
    lives: 3,
    streak: 0,
    totalMoves: 0,
  },
  states: {
    welcome: {
      on: {
        START: 'idle',
      },
    },
    gameover: {
      on: {
        REPLAY: {
          target: 'welcome',
          actions: assign({
            streak: () => 0,
            totalMoves: () => 0,
            lives: () => 3,
          }),
        },
      },
    },
    idle: {
      on: {
        MOVE: 'validating',
        '': {
          cond: (context) => context.lives <= 0,
          target: 'gameover',
        },
      },
    },
    validating: {
      entry: 'validateMove',
      on: {
        VALID: {
          target: 'idle',
          cond: (context) => context.lives > 0,
          actions: assign({
            streak: (context) => context.streak + 1,
            totalMoves: (context) => context.totalMoves + 1,
          }),
        },
        INVALID: {
          target: 'idle',
          actions: assign({
            lives: (context: Context) => context.lives - 1,
            streak: () => 0,
            totalMoves: (context: Context) => context.totalMoves + 1,
          }),
        },
      },
    },
  },
})
