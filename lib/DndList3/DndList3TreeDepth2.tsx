import { Draggable, Droppable } from '@hello-pangea/dnd';
import cx from 'clsx';
import classes from './DndList3.module.css';

import { useDndDepth2Store } from './DndList3';

import { DraggableItem } from './DndList3TreeTypes';

interface Props {
    parentId: string,
    items: Array<DraggableItem>
}

export function DndList3TreeDepth2(p: Props) {
    const depth2Store = useDndDepth2Store();

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
