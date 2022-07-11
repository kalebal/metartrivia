import React from 'react'
import { GlobalStateProvider } from './context-provider'
import { App } from './app'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 500000,
      cacheTime: 50000,
    },
  },
})

export const Root = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </QueryClientProvider>
  )
}
