import {Draggable, Droppable} from '@hello-pangea/dnd';
import cx from 'clsx';
import classes from './DndList3.module.css';
import {DraggableItem} from './DndList3DataTypes';

interface Props<T> {
    parentId: string,
    dndId2: string,
    items2: Array<T>
    renderItem2: (item: T) => JSX.Element
}

export function DndList3Cascade2<T extends DraggableItem>(p: Props<T>) {
    return (
        <Droppable droppableId={`${p.parentId}`} direction="vertical">
            {(drop2Provider) => (
                <ul ref={drop2Provider.innerRef}>
                    {p.items2.map((item, index) => (
                        <Draggable key={item.id} index={index} draggableId={`${item.id}`}>
                            {(drag2Provider, snapshot) => (
                                <li
                                  className={cx(classes.item,
                                        { [classes.itemDragging]: snapshot.isDragging })}
                                  {...drag2Provider.draggableProps}
                                  {...drag2Provider.dragHandleProps}
                                  ref={drag2Provider.innerRef}
                                >
                                    <>
                                        {p.renderItem2(item)}
                                    </>
                                </li>
                            )}
                        </Draggable>
                    ))}
                    {drop2Provider.placeholder}
                </ul>
            )}
        </Droppable>
    );
}