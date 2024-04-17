import {Draggable, Droppable} from '@hello-pangea/dnd';
import cx from 'clsx';
import classes from './DndList3.module.css';
import {DraggableItem} from '@/lib/DndList3/DndList3';

interface Props<T> {
    items: Array<T>
    renderItem: (item: T) => JSX.Element
}

export function DndList3DraggableListItems<T extends DraggableItem>(p: Props<T>) {
    return (
        <Droppable droppableId="dnd-list" direction="vertical">
            {(provided1) => (
                <div {...provided1.droppableProps} ref={provided1.innerRef}>
                    {p.items.map((item, index) => (
                        <Draggable key={item.id} index={index} draggableId={item.id}>
                            {(provided2, snapshot) => (
                                <div
                                  className={cx(classes.item,
                                        { [classes.itemDragging]: snapshot.isDragging })}
                                  {...provided2.draggableProps}
                                  {...provided2.dragHandleProps}
                                  ref={provided2.innerRef}
                                >
                                    <>
                                        {p.renderItem(item)}
                                    </>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided1.placeholder}
                </div>
            )}
        </Droppable>
    );
}
