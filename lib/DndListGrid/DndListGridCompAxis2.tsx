import { Draggable, Droppable } from '@hello-pangea/dnd';
import cx from 'clsx';
import classes from './DndListGrid.module.css';
import { AxisSettingsProps, DraggableItem } from './DndListGridCompTypes';

interface Props {
    parentId: string,
    items: Array<DraggableItem>,
    axis2Settings: AxisSettingsProps<DraggableItem>
}

export function DndListGridCompAxis2(p: Props) {
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
                        {p.axis2Settings.renderItem(item)}
                    </li>
                )}
            </Draggable>
        );

    const classname = (p.axis2Settings.direction === 'vertical') ? classes.depth2boxv : classes.depth2boxh;
    return (
        <Droppable droppableId={`${p.parentId}`} direction={p.axis2Settings.direction}>
            {(drop2Provider) => (
                <ul ref={drop2Provider.innerRef} className={classname}>
                    {p.items.map(processItem)}
                    {drop2Provider.placeholder}
                </ul>
            )}
        </Droppable>
    );
}
