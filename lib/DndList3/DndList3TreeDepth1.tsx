import { Draggable, Droppable } from '@hello-pangea/dnd';
import cx from 'clsx';
import classes from './DndList3.module.css';

import { DndList3TreeDepth2 } from './DndList3TreeDepth2';
import { useDndDepth2Store, useDndDepth1Store } from './DndList3';

import { DraggableItem, DraggableParent } from './DndList3TreeTypes';

export function DndList3TreeDepth1() {
    const depth1Store = useDndDepth1Store();
    const depth2Store = useDndDepth2Store();

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

                        <DndList3TreeDepth2
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
