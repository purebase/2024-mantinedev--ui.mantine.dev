import {Draggable, Droppable} from '@hello-pangea/dnd';
import cx from 'clsx';
import classes from './DndList3.module.css';
import {DraggableParent} from './DndList3TreeTypes';

interface Props<T> {
    dndId1: string,
    items1: Array<T>
    renderTreeDepth1Items: (parent: DraggableParent) => JSX.Element
}

export function DndList3TreeDepth1<T extends DraggableParent>(p: Props<T>) {
    return (
        <Droppable droppableId="ROOT" direction="vertical" type="">
            {(drop1Provider) => (
                <ul ref={drop1Provider.innerRef}>

                    {p.items1.map((item, index) => (

                        <Draggable key={item.id} index={index} draggableId={`category${item.id}`}>
                            {(drag1Provider) => (
                                <li
                                  className={cx(classes.item)}
                                  {...drag1Provider.draggableProps}
                                  {...drag1Provider.dragHandleProps}
                                  ref={drag1Provider.innerRef}
                                >
                                    {item.name}
                                    {p.renderTreeDepth1Items(item)}
                                </li>
                            )}
                        </Draggable>
                    ))}
                    {drop1Provider.placeholder}
                </ul>
            )}
        </Droppable>
    );
}
