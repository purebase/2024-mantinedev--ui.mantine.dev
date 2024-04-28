import { DragDropContext, OnDragEndResponder } from '@hello-pangea/dnd';
import { useEffect } from 'react';
import { create } from 'zustand';
import { DndListGridCompAxis1 } from './DndListGridCompAxis1';
import { reorderList } from './DndListGridCompHelpers';
import { AxisProps, DndGridAxisStore, DraggableItem, DraggableParent } from './DndListGridCompTypes';

export const useDndGridAxis1Store = create<DndGridAxisStore<DraggableParent>>((setState) => ({
    items: [], setItems: (items) => setState({ items }),
}));

export const useDndGridAxis2Store = create<DndGridAxisStore<DraggableItem>>((setState) => ({
    items: [], setItems: (items) => setState({ items }),
}));

export function DndListGridComp(p: { axis1: AxisProps<DraggableParent>, axis2: AxisProps<DraggableItem> }) {
    const axis1Store = useDndGridAxis1Store();
    const axis2Store = useDndGridAxis2Store();

    useEffect(() => {
        if (p.axis1.data) axis1Store.setItems(p.axis1.data as DraggableParent[]);
        if (p.axis2.data) axis2Store.setItems(p.axis2.data as DraggableItem[]);
    }, []);

    const dragEnd: OnDragEndResponder = (result => {
        const { source, destination } = result;

        if (!destination) return;

        if (destination.droppableId === source.droppableId &&
            destination.index === source.index) {
            return;
        }

        if (destination.droppableId === 'ROOT') {
            const newState = reorderList({ current: axis1Store.items, from: source.index, to: destination?.index || 0 });
            axis1Store.setItems(newState);
            return;
        }

        const sourceBox = axis1Store.items.find(category => category.id === source.droppableId);
        const destinationBox = axis1Store.items.find((category) => category.id === destination.droppableId);
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

            const newState = axis1Store.items
                .map(currentCategory => {
                    if (currentCategory.id === newCategory.id) return newCategory;
                    return currentCategory;
                });

            axis1Store.setItems(newState);
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

            const newState = axis1Store.items
                .map(currentCategory => {
                    if (currentCategory.id === startCategory.id) return startCategory;
                    if (currentCategory.id === finishCategory.id) return finishCategory;
                    return currentCategory;
                });
            axis1Store.setItems(newState);
        }
    });

    return (
        <DragDropContext onDragEnd={dragEnd}>
            <DndListGridCompAxis1 axis1Settings={p.axis1.settings} axis2Settings={p.axis2.settings} />
        </DragDropContext>
    );
}
