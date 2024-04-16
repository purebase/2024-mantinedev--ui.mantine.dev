import { useListState } from '@mantine/hooks';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import cx from 'clsx';
import classes from './DndList3.module.css';
import { DraggableItem } from '@/lib/DndList3/DndList3';

interface Props<T> {
    data: Array<T>
    renderItem: (item: T) => JSX.Element
}

export function DndList3GenericComp<T extends DraggableItem>(p: Props<T>) {
    const [state, handlers] = useListState<T>(p.data);

    const items = state.map((item, index) => (
        <Draggable key={item.id} index={index} draggableId={item.id}>
            {(provided, snapshot) => (
                <div
                  className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                    <>
                        {p.renderItem(item)}
                    </>
                </div>
            )}
        </Draggable>
    ));

    return (
        <DragDropContext
          onDragEnd={({ destination, source }) =>
                handlers.reorder({ from: source.index, to: destination?.index || 0 })
            }
        >
            <Droppable droppableId="dnd-list" direction="vertical">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {items}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
