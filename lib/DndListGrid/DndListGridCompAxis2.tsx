import { Draggable, Droppable } from '@hello-pangea/dnd';
import cx from 'clsx';
import classes from './DndListGrid.module.css';

import { useDndGridAxis2Store } from './DndListGrid';

import { DraggableItem } from './DndListGridCompTypes';

interface Props {
    parentId: string,
    items: Array<DraggableItem>
}

export function DndListGridCompAxis2(p: Props) {
    const depth2Store = useDndGridAxis2Store();

    const processItem = (item: DraggableItem, index: number) => (
            <Draggable key={item.id} index={index} draggableId={`${item.id}`}>
                {(drag2Provider, snapshot) => (
                    <li
                      className={cx(classes.depth2boxitem,
                            { [classes.itemDragging]: snapshot.isDragging })}
                      {...drag2Provider.draggableProps}
                      {...drag2Provider.dragHandleProps}
                      ref={drag2Provider.innerRef}
                    >
                        {depth2Store.renderItem(item)}
                    </li>
                )}
            </Draggable>
        );

    const classname = (depth2Store.direction === 'vertical') ? classes.depth2boxv : classes.depth2boxh;
    return (
        <Droppable droppableId={`${p.parentId}`} direction={depth2Store.direction}>
            {(drop2Provider) => (
                <ul ref={drop2Provider.innerRef} className={classname}>
                    {p.items.map(processItem)}
                    {drop2Provider.placeholder}
                </ul>
            )}
        </Droppable>
    );
}
