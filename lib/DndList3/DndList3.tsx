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
    { id: '2', name: 'Category 2', children: [] },
    { id: '3', name: 'Category 3', children: [] },
];

const chemicalItemList: ChemicalItem[] = [
    { id: '1', position: 39, mass: 88.906, symbol: 'Y', name: 'PAUL' },
    { id: '2', position: 56, mass: 137.33, symbol: 'Ba', name: 'EVA' },
    { id: '3', position: 58, mass: 140.12, symbol: 'Ce', name: 'THOMAS' },
    /*    { id: '4', position: 6, mass: 12.011, symbol: 'C', name: 'NICOLE', parentId: '1' },
        { id: '5', position: 7, mass: 14.007, symbol: 'N', name: 'WILMAR', parentId: '1' },
        { id: '6', position: 8, mass: 14.007, symbol: 'N', name: 'MANUEL', parentId: '1' },*/
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
    const items = typedDepth2.filter(item => parent.children.includes(item.id));
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
    //const depth1Typed = depth1 as Category[];
    const depth2Typed = depth2 as ChemicalItem[];

    const dragEnd: OnDragEndResponder = (result => {

        // TODO Use drag end strategy of https://egghead.io/lessons/react-move-items-between-columns-with-react-beautiful-dnd-using-ondragend
/*        const { source, destination, draggableId } = result;
        console.log('onDragEnd()', source, destination, destination?.droppableId, draggableId);
        if (!destination) {
            return;
        }
        if (destination.droppableId === 'ROOT') {
            depth1Handlers.reorder({ from: source.index, to: destination?.index || 0 });
        } else if (destination.droppableId !== source.droppableId) {
            const newDepth2 = depth2Typed.map((item) => {
                if (item.id === draggableId) {
                    return {
                        ...item,
                        parentId: destination.droppableId,
                    };
                }
                    return item;
            });
            console.log('onDragEnd()#2', JSON.stringify(newDepth2, null, 2));
            depth2Handlers.setState(newDepth2);
        } else {
            depth2Handlers.reorder({ from: source.index, to: destination?.index || 0 });
        }*/
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
