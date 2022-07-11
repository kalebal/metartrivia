export const getItems = async () => {
  const response = await fetch(
    'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=Auguste Renoir'
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}
