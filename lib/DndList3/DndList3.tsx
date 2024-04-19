import {Text} from '@mantine/core';
import {DragDropContext, OnDragEndResponder} from '@hello-pangea/dnd';
import {useContext} from 'react';
import classes from './DndList3.module.css';
import {DndList3Cascade2} from './DndList3Cascade2';
import {DndList3Context, DndList3ContextProvider} from './DndList3Context';
import {DndList3Cascade1} from './DndList3Cascade1';
import {Category, ChemicalItem, DraggableItem} from './DndList3DataTypes';

const categories: Category[] = [
    { id: '1', name: 'Catergory 1', children: ['1', '2', '3'] },
    { id: '2', name: 'Category 2', children: ['4', '5', '6', '7', '8'] },
    { id: '3', name: 'Category 3', children: ['9', '10', '11', '12'] },
];

const chemicalItemList: ChemicalItem[] = [
    { id: '1', position: 39, mass: 88.906, symbol: 'Y', name: 'PAUL' },
    { id: '2', position: 56, mass: 137.33, symbol: 'Ba', name: 'EVA' },
    { id: '3', position: 58, mass: 140.12, symbol: 'Ce', name: 'THOMAS' },
    { id: '4', position: 6, mass: 12.011, symbol: 'C', name: 'NICOLE' },
    { id: '5', position: 39, mass: 88.906, symbol: 'Y', name: 'MANUEL' },
    { id: '6', position: 56, mass: 137.33, symbol: 'Ba', name: 'TINA' },
    { id: '7', position: 58, mass: 140.12, symbol: 'Ce', name: 'LAURA' },
    { id: '8', position: 6, mass: 12.011, symbol: 'C', name: 'WILLE' },
    { id: '9', position: 39, mass: 88.906, symbol: 'Y', name: 'THEO' },
    { id: '10', position: 56, mass: 137.33, symbol: 'Ba', name: 'EDITH' },
    { id: '11', position: 58, mass: 140.12, symbol: 'Ce', name: 'DANI' },
    { id: '12', position: 6, mass: 12.011, symbol: 'C', name: 'WILMAR' },
];

const renderChemicalItem = (item: ChemicalItem) => (
    <>
        <Text className={classes.symbol}>{item.symbol}</Text>
        <div>
            <Text>{item.name}</Text>
            <Text c="dimmed" size="sm">
                Position: {item.position} • Mass: {item.mass}
            </Text>
        </div>
    </>
);

const renderCategory = (parent: Category) => {
    const { depth2 } = useContext(DndList3Context);
    const typedDepth2 = depth2 as ChemicalItem[];
    const items: ChemicalItem[] = parent.children.map(
        (itemId) => typedDepth2.find(item => item.id === itemId))
        .filter(item => item !== undefined) as ChemicalItem[];

    return (
        <DndList3Cascade2<ChemicalItem>
          parentId={parent.id}
          dndId2="dnd-list-items"
          items2={items}
          renderItem2={renderChemicalItem}
        />
    );
};

export function DndList3Stage() {
    const { depth1, depth1Handlers, depth2, depth2Handlers } = useContext(DndList3Context);
    const depth1Typed = depth1 as Category[];
    const depth2Typed = depth2 as ChemicalItem[];

    const dragEnd: OnDragEndResponder = (result => {
        const { source, destination, draggableId } = result;
        console.log('onDragEnd()', source, destination, destination?.droppableId, draggableId);

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = depth1Typed.find(category => category.id === source.droppableId);
        const finish = depth1Typed.find(category => category.id === destination.droppableId);
        if (!start || !finish) return;

        if (start === finish) {
            const newChildIds = [...start.children];
            console.log('onDragEnd()#1.1', JSON.stringify(depth1Typed, null, 2));
            const draggedItem = start.children[source.index];

            // del and add in same child list
            newChildIds.splice(source.index, 1);
            newChildIds.splice(destination.index, 0, draggedItem);

            const newCategory = {
                ...start,
                children: newChildIds,
            };

            const newState = depth1Typed
                .map(currentCategory => {
                    if (currentCategory.id === newCategory.id) return newCategory;
                    return currentCategory;
                });

            console.log('onDragEnd()#1.2', JSON.stringify(newState, null, 2));
            depth1Handlers.setState(newState);
            return;
        }

        const startChildIds = [...start.children];
        // Remember dragged item before deleting it:
        const draggedItem = start.children[source.index];
        // del in start child list:
        startChildIds.splice(source.index, 1);
        const startCategory = {
            ...start,
            children: startChildIds,
        };

        const finishChildIds = [...finish.children];
        // del in start child list:
        finishChildIds.splice(destination.index, 0, draggedItem);
        const finishCategory = {
            ...finish,
            children: finishChildIds,
        };

        const newState = depth1Typed
            .map(currentCategory => {
                if (currentCategory.id === startCategory.id) return startCategory;
                if (currentCategory.id === finishCategory.id) return finishCategory;
                return currentCategory;
            });
        console.log('onDragEnd()#2.2', JSON.stringify(newState, null, 2));
        depth1Handlers.setState(newState);
    });

    return (
        <DragDropContext
          onDragEnd={dragEnd}
        >
            <DndList3Cascade1<Category>
              dndId1="dnd-list"
              items1={depth1 as Category[]}
              renderChild1={renderCategory}
            />
        </DragDropContext>
    );
}

export function DndList3() {
    return (
        <>
            <DndList3ContextProvider<DraggableItem> depth1={categories} depth2={chemicalItemList}>
                <DndList3Stage />
            </DndList3ContextProvider>
        </>
    );
}
