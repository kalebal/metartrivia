import { useQuery } from 'react-query'
export const useItems = () => {
  return useQuery(['items'], async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    return response.json()
  })
}
