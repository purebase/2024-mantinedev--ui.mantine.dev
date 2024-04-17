import {Draggable, Droppable} from '@hello-pangea/dnd';
import cx from 'clsx';
import classes from './DndList3.module.css';
import {DraggableItem} from '@/lib/DndList3/DndList3';

interface Props<T> {
    dndId1: string,
    items1: Array<T>
    renderItem1: (item: T) => JSX.Element
}

export function DndList3Cascade1<T extends DraggableItem>(p: Props<T>) {
    return (
        <Droppable droppableId={p.dndId1} direction="vertical">
            {(drop1Provider) => (
                <ul {...drop1Provider.droppableProps} ref={drop1Provider.innerRef}>

                    {p.items1.map((item, index) => (

                        <Draggable key={item.id} index={index} draggableId={item.id}>
                            {(drag1Provider, snapshot) => (
                                <li
                                  className={cx(classes.item,
                                        { [classes.itemDragging]: snapshot.isDragging })}
                                  {...drag1Provider.draggableProps}
                                  {...drag1Provider.dragHandleProps}
                                  ref={drag1Provider.innerRef}
                                >
                                    {item.id}
                                </li>
                            )}
                        </Draggable>
                    ))}
                    {drop1Provider.placeholder}
                </ul>
            )}
        </Droppable>
    );
}
