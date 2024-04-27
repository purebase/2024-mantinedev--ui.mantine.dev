import {useListState} from '@mantine/hooks';
import {DragDropContext, Draggable, Droppable} from '@hello-pangea/dnd';
import cx from 'clsx';
import {useEffect} from 'react';
import classes from './DndList2.module.css';

interface Props<T> {
    data: Array<T>,
    getItemId: (index: number) => string,
    renderItem: (item: T) => JSX.Element
}

interface DraggableItem<T> {
    id: string,
    content: T
}

export function DndList2GenericComp<T>(p: Props<T>) {
    const [
        state, handlers,
    ] = useListState<DraggableItem<T>>([]);

    useEffect(() => {
        if (p.data) {
            const wrappedItems = p.data.map((item, index) => (
                { id: p.getItemId(index), content: item } as DraggableItem<T>
            ));
            handlers.setState(wrappedItems);
        }
    }, []);

    const Items = () => state.map((item, index) => (
        <Draggable key={item.id} index={index} draggableId={item.id}>
            {(provided, snapshot) => (
                <div
                  className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                    <>
                        {p.renderItem(item.content)}
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
                        <Items />
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
