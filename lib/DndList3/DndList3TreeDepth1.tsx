import { Draggable, Droppable } from '@hello-pangea/dnd';
import cx from 'clsx';
import { useContext } from 'react';
import classes from './DndList3.module.css';
import { DndList3Context } from './DndList3Context';

import { DraggableItem, DraggableParent } from './DndList3TreeTypes';
import { DndList3TreeDepth2 } from './DndList3TreeDepth2';

export function DndList3TreeDepth1() {
    const { treeDepth1_data, treeDepth1_renderItem, treeDepth2_data, treeDepth1_direction } = useContext(DndList3Context);

    const processItem = (item: DraggableParent, index: number) => {
        const childItems = item.children.map(
            (itemId) => treeDepth2_data.find(itemDepth2 => itemDepth2.id === itemId)
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
                        {treeDepth1_renderItem(item)}

                        <DndList3TreeDepth2
                          parentId={item.id}
                          items={childItems}
                        />
                    </li>
                )}
            </Draggable>
        );
    };

    const classname = (treeDepth1_direction === 'vertical') ? classes.depth1boxv : classes.depth1boxh;
    return (
        <Droppable droppableId="ROOT" direction={treeDepth1_direction} type="">
            {(drop1Provider) => (
                <ul ref={drop1Provider.innerRef} className={classname}>
                    {treeDepth1_data.map(processItem)}
                    {drop1Provider.placeholder}
                </ul>
            )}
        </Droppable>
    );
}
