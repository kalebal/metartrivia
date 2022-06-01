import { DraggableLocation } from 'react-beautiful-dnd'
import { Card } from './item'

export const validateMove = (index: number, newArray: Card[]) => {
  if (
    index < newArray.length - 1 &&
    newArray[index + 1].year < newArray[index].year
  )
    return false
  if (index >= 1 && newArray[index - 1].year > newArray[index].year)
    return false

  return true
}

export const findCorrectSpot = (list: Card[], year: number) => {
  for (let i = 0; i < list.length; i++) {
    if (year < list[i].year) {
      return i
    }
  }
  return list.length
}

export const move = (
  source: Card,
  destination: Card[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) => {
  const sourceClone = source
  const destClone = Array.from(destination)
  const [removed] = [sourceClone]

  destClone.splice(droppableDestination.index, 0, removed)

  return destClone
}

export const reorder = (list: Card[], startIndex: number, endIndex: number) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}
