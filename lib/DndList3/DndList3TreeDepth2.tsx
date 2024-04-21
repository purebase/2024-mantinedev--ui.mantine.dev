import { Draggable, Droppable } from '@hello-pangea/dnd';
import cx from 'clsx';
import classes from './DndList3.module.css';

import { DraggableItem } from './DndList3TreeTypes';

interface Props {
    parentId: string,
    items: Array<DraggableItem>
    renderItem: (item: DraggableItem) => JSX.Element
}

export function DndList3TreeDepth2(p: Props) {
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
                        {p.renderItem(item)}
                    </li>
                )}
            </Draggable>
        );

    return (
        <Droppable droppableId={`${p.parentId}`} direction="vertical">
            {(drop2Provider) => (
                <ul ref={drop2Provider.innerRef} className={classes.depth2box}>
                    {p.items.map(processItem)}
                    {drop2Provider.placeholder}
                </ul>
            )}
        </Droppable>
    );
}
