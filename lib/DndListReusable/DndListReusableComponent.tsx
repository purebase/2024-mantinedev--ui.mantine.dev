import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import cx from 'clsx';
import { useEffect } from 'react';
import { create } from 'zustand';
import classes from './DndListReusable.module.css';

function reorderList({ current, from, to }: { current: any[], from: number; to: number }) {
    const cloned = [...current];
    const item = current[from];

    cloned.splice(from, 1);
    cloned.splice(to, 0, item);

    return cloned;
}

interface Props<T> {
    content: T[],
    getItemId: (index: number) => string,
    renderItem: (item: T) => JSX.Element
}

interface DraggableItem<T> {
    id: string,
    content: T
}

export interface DraggableItemStore {
    items: DraggableItem<unknown>[];
    setItems: (items: DraggableItem<unknown>[]) => void;
}

export const useDraggableItemStore = create<DraggableItemStore>((setState) => ({
    items: [], setItems: (items) => setState({ items }),
}));

export function DndListReusableComponent<T>(p: Props<T>) {
    const depth1Store = useDraggableItemStore();

    useEffect(() => {
        if (p.content) {
            const wrappedItems = p.content.map((item, index) => (
                { id: p.getItemId(index), content: item } as DraggableItem<T>
            ));
            depth1Store.setItems(wrappedItems);
        }
    }, []);

    const Items = () => depth1Store.items.map((item, index) => (
        <Draggable key={item.id} index={index} draggableId={item.id}>
            {(provided, snapshot) => (
                <div
                  className={cx(classes.item, { [classes.itemDragging]: snapshot.isDragging })}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                    <>
                        {p.renderItem(item.content as T)}
                    </>
                </div>
            )}
        </Draggable>
    ));

    return (
        <DragDropContext
          onDragEnd={({ destination, source }) => {
              const newState = reorderList({ current: depth1Store.items, from: source.index, to: destination?.index || 0 });
              depth1Store.setItems(newState);
          }}
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
