import {Draggable, Droppable} from '@hello-pangea/dnd';
import cx from 'clsx';
import classes from './DndList3.module.css';
import {DraggableItem} from '@/lib/DndList3/DndList3';

interface Props<T> {
    dndId1: string,
    items1: Array<T>
    renderChild1: (parent: T) => JSX.Element
}

export function DndList3Cascade1<T extends DraggableItem>(p: Props<T>) {
    return (
        <Droppable droppableId="Categories" direction="vertical" type="">
            {(drop1Provider) => (
                <ul ref={drop1Provider.innerRef}>

                    {p.items1.map((item, index) => (

                        <Draggable key={item.id} index={index} draggableId={`category${item.id}`}>
                            {(drag1Provider) => (
                                <li
                                  className={cx(classes.item)}
                                  {...drag1Provider.draggableProps}
                                  {...drag1Provider.dragHandleProps}
                                  ref={drag1Provider.innerRef}
                                >
                                    {p.renderChild1(item)}
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
