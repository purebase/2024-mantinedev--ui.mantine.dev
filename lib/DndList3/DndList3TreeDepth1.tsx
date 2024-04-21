import { Draggable, Droppable } from '@hello-pangea/dnd';
import cx from 'clsx';
import { useContext } from 'react';
import classes from './DndList3.module.css';
import { DndList3Context } from './DndList3Context';

import { DraggableItem, DraggableParent } from './DndList3TreeTypes';
import { DndList3TreeDepth2 } from './DndList3TreeDepth2';

interface Props {
    items: Array<DraggableParent>
}

export function DndList3TreeDepth1(p: Props) {
    const { treeDepth1_renderItem, treeDepth2_data, treeDepth2_renderItem } = useContext(DndList3Context);

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
                          renderItem={treeDepth2_renderItem}
                        />
                    </li>
                )}
            </Draggable>
        );
    };

    return (
        <Droppable droppableId="ROOT" direction="vertical" type="">
            {(drop1Provider) => (
                <ul ref={drop1Provider.innerRef} className={classes.depth1box}>
                    {p.items.map(processItem)}
                    {drop1Provider.placeholder}
                </ul>
            )}
        </Droppable>
    );
}
