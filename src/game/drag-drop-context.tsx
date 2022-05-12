import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const baseData = [
  { id: 1, title: 'asdf' },
  { id: 2, title: 'aqwer' },
  { id: 3, title: 'dfgs' },
  { id: 4, title: 'sdfgsdf' },
]
export const DragDropList = () => {
  const [elements, setElements] = useState(baseData)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onDragEnd = () => {}

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>Hello world</div>
      <Droppable droppableId="droppable-1">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              backgroundColor: snapshot.isDraggingOver ? 'blue' : 'grey',
            }}
            {...provided.droppableProps}
          >
            {provided.placeholder}
            {elements.map((item, index) => (
              <Draggable
                draggableId={item.id.toString()}
                key={item.id.toString()}
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.title}
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
