import { DragDropContext, OnDragEndResponder } from '@hello-pangea/dnd';
import { DndList3TreeDepth1 } from './DndList3TreeDepth1';
import { useDndDepth1Store } from './DndList3';
import { reorderList } from './DndList3TreeHelper';
import { DraggableParent } from './DndList3TreeTypes';

export function DndList3Tree() {
    const depth1Store = useDndDepth1Store();

    const depth1Typed = depth1Store.items as DraggableParent[];

    const dragEnd: OnDragEndResponder = (result => {
        const { source, destination } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }

        if (destination.droppableId === 'ROOT') {
            const newState = reorderList({ current: depth1Store.items, from: source.index, to: destination?.index || 0 });
            depth1Store.setItems(newState);
            return;
        }

        const sourceBox = depth1Typed.find(category => category.id === source.droppableId);
        const destinationBox = depth1Typed.find((category) => category.id === destination.droppableId);
        if (!sourceBox || !destinationBox) return;

        if (sourceBox === destinationBox) {
            const newChildIds = [...sourceBox.children];
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

            depth1Store.setItems(newState);
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
            depth1Store.setItems(newState);
        }
    });

    return (
        <DragDropContext onDragEnd={dragEnd}>
            <DndList3TreeDepth1 />
        </DragDropContext>
    );
}
