import { Draggable, Droppable } from '@hello-pangea/dnd';
import cx from 'clsx';
import { useContext } from 'react';
import classes from './DndList3.module.css';
import { DndList3Context } from './DndList3Context';

import { DraggableItem, DraggableParent } from './DndList3TreeTypes';

interface Props {
    items: Array<DraggableParent>
    renderTreeDepth1ItemList: (parent: DraggableParent, children: DraggableItem[]) => JSX.Element
}

export function DndList3TreeDepth1(p: Props) {
    const { treeDepth2 } = useContext(DndList3Context);
    const itemsOfParent = treeDepth2 as DraggableItem[];

    const processItem = (item: DraggableParent, index: number) => (
            <Draggable key={item.id} index={index} draggableId={`category${item.id}`}>
                {(drag1Provider) => (
                    <li
                      className={cx(classes.depth1boxitem)}
                      {...drag1Provider.draggableProps}
                      {...drag1Provider.dragHandleProps}
                      ref={drag1Provider.innerRef}
                    >
                        {p.renderTreeDepth1ItemList(item, itemsOfParent)}
                    </li>
                )}
            </Draggable>
        );

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
