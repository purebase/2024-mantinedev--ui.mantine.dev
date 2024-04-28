import { Draggable, Droppable } from '@hello-pangea/dnd';
import cx from 'clsx';
import classes from './DndListGrid.module.css';

import { DndListGridCompAxis2 } from './DndListGridCompAxis2';
import { useDndGridAxis2Store, useDndGridAxis1Store } from './DndListGrid';

import { DraggableItem, DraggableParent } from './DndListGridCompTypes';

export function DndListGridCompAxis1() {
    const depth1Store = useDndGridAxis1Store();
    const depth2Store = useDndGridAxis2Store();

    const processItem = (item: DraggableParent, index: number) => {
        const childItems = item.children.map(
            (itemId) => depth2Store.items.find(itemDepth2 => itemDepth2.id === itemId)
        ).filter(itemDepth2 => itemDepth2 !== undefined) as DraggableItem[];

        return (
            <Draggable key={item.id} index={index} draggableId={`category${item.id}`}>
                {(drag1Provider) => (
                    <li
                      className={cx(classes.depth1boxitem)}
                      {...drag1Provider.draggableProps}
                      {...drag1Provider.dragHandleProps}
                      ref={drag1Provider.innerRef}
                    >
                        {depth1Store.renderItem(item)}

                        <DndListGridCompAxis2
                          parentId={item.id}
                          items={childItems}
                        />
                    </li>
                )}
            </Draggable>
        );
    };

    const classname = (depth1Store.direction === 'vertical') ? classes.depth1boxv : classes.depth1boxh;
    return (
        <Droppable droppableId="ROOT" direction={depth1Store.direction} type="">
            {(drop1Provider) => (
                <ul ref={drop1Provider.innerRef} className={classname}>
                    {depth1Store.items.map(processItem)}
                    {drop1Provider.placeholder}
                </ul>
            )}
        </Droppable>
    );
}
