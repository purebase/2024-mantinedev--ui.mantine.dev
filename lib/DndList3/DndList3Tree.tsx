import { DragDropContext, OnDragEndResponder } from '@hello-pangea/dnd';
import { useContext } from 'react';
import { DndList3Context } from './DndList3Context';
import { DndList3TreeDepth1 } from './DndList3TreeDepth1';
import { DraggableItem, DraggableParent } from './DndList3TreeTypes';

interface Props {
    renderTreeDepth1Items: (parent: DraggableParent, children: DraggableItem[]) => JSX.Element
}
export function DndList3Tree(p: Props) {
    const { depth1, depth1Handlers } = useContext(DndList3Context);
    const depth1Typed = depth1 as DraggableParent[];

    const dragEnd: OnDragEndResponder = (result => {
        const { source, destination, draggableId } = result;
        console.log('onDragEnd()', source, destination, destination?.droppableId, draggableId);

        if (!destination) return;

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }

        if (destination.droppableId === 'ROOT') {
            depth1Handlers.reorder({ from: source.index, to: destination?.index || 0 });
            return;
        }

        const sourceBox = depth1Typed.find(category => category.id === source.droppableId);
        const destinationBox = depth1Typed.find((category) => category.id === destination.droppableId);
        if (!sourceBox || !destinationBox) return;

        if (sourceBox === destinationBox) {
            const newChildIds = [...sourceBox.children];
            //console.log('onDragEnd()#1.1', JSON.stringify(depth1Typed, null, 2));
            const draggedItem = sourceBox.children[source.index];

            // del and add in same child list
            newChildIds.splice(source.index, 1);
            newChildIds.splice(destination.index, 0, draggedItem);

            const newCategory = {
                ...sourceBox,
                children: newChildIds,
            };

            const newState = depth1Typed
                .map(currentCategory => {
                    if (currentCategory.id === newCategory.id) return newCategory;
                    return currentCategory;
                });

            //console.log('onDragEnd()#1.2', JSON.stringify(newState, null, 2));
            depth1Handlers.setState(newState);
        } else {
            const startChildIds = [...sourceBox.children];
            // Remember dragged item before deleting it:
            const draggedItem = sourceBox.children[source.index];
            // del in sourceBox child list:
            startChildIds.splice(source.index, 1);
            const startCategory = {
                ...sourceBox,
                children: startChildIds,
            };

            const destinationChildIds = [...destinationBox.children];
            // del in sourceBox child list:
            destinationChildIds.splice(destination.index, 0, draggedItem);
            const finishCategory = {
                ...destinationBox,
                children: destinationChildIds,
            };

            const newState = depth1Typed
                .map(currentCategory => {
                    if (currentCategory.id === startCategory.id) return startCategory;
                    if (currentCategory.id === finishCategory.id) return finishCategory;
                    return currentCategory;
                });
            //console.log('onDragEnd()#2.2', JSON.stringify(newState, null, 2));
            depth1Handlers.setState(newState);
        }
    });

    return (
        <DragDropContext
          onDragEnd={dragEnd}
        >
            <DndList3TreeDepth1<DraggableParent>
              dndId1="dnd-list"
              items1={depth1 as DraggableParent[]}
              renderTreeDepth1Items={p.renderTreeDepth1Items}
            />
        </DragDropContext>
    );
}
