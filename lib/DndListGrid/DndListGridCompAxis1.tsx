import { Draggable, Droppable } from '@hello-pangea/dnd';
import cx from 'clsx';
import classes from './DndListGrid.module.css';
import { AxisSettingsProps, DraggableItem, DraggableParent } from './DndListGridCompTypes';
import { useDndGridAxis1Store, useDndGridAxis2Store } from './DndListGridComp';
import { DndListGridCompAxis2 } from './DndListGridCompAxis2';

export function DndListGridCompAxis1(p: { axis1Settings: AxisSettingsProps<DraggableParent>, axis2Settings: AxisSettingsProps<DraggableItem> }) {
    const axis1Store = useDndGridAxis1Store();
    const axis2Store = useDndGridAxis2Store();

    const processItem = (item: DraggableParent, index: number) => {
        const childItems = item.children.map(
            (itemId) => axis2Store.items.find(itemDepth2 => itemDepth2.id === itemId)
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
                        {p.axis1Settings.renderItem(item)}

                        <DndListGridCompAxis2
                          parentId={item.id}
                          items={childItems}
                          axis2Settings={p.axis2Settings}
                        />
                    </li>
                )}
            </Draggable>
        );
    };

    const classname = (p.axis1Settings.direction === 'vertical') ? classes.depth1boxv : classes.depth1boxh;
    return (
        <Droppable droppableId="ROOT" direction={p.axis1Settings.direction} type="">
            {(drop1Provider) => (
                <ul ref={drop1Provider.innerRef} className={classname}>
                    {axis1Store.items.map(processItem)}
                    {drop1Provider.placeholder}
                </ul>
            )}
        </Droppable>
    );
}
