import { Draggable, Droppable } from '@hello-pangea/dnd';
import cx from 'clsx';
import { useContext } from 'react';
import classes from './DndList3.module.css';

import { DraggableItem } from './DndList3TreeTypes';
import { DndList3Context } from './DndList3Context';

interface Props {
    parentId: string,
    items: Array<DraggableItem>
}

export function DndList3TreeDepth2(p: Props) {
    const { treeDepth2_renderItem, treeDepth2_direction } = useContext(DndList3Context);
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
                        {treeDepth2_renderItem(item)}
                    </li>
                )}
            </Draggable>
        );

    const classname = (treeDepth2_direction === 'vertical') ? classes.depth2boxv : classes.depth2boxh;
    return (
        <Droppable droppableId={`${p.parentId}`} direction={treeDepth2_direction}>
            {(drop2Provider) => (
                <ul ref={drop2Provider.innerRef} className={classname}>
                    {p.items.map(processItem)}
                    {drop2Provider.placeholder}
                </ul>
            )}
        </Droppable>
    );
}
