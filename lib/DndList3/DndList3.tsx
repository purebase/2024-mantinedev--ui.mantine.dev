import {Text} from '@mantine/core';
import {DragDropContext} from '@hello-pangea/dnd';
import {useContext} from 'react';
import classes from './DndList3.module.css';
import {DndList3Context, DndList3ContextProvider} from '@/lib/DndList3/DndList3Context';
import {DndList3Cascade1} from '@/lib/DndList3/DndList3Cascade1';
import {DndList3Cascade2} from '@/lib/DndList3/DndList3Cascade2';

export interface DraggableItem {
  id: string, name: string
}

export interface DraggableChild extends DraggableItem {
    parentId: string
}

interface ChemicalItem extends DraggableChild {
  position: number, mass: number, symbol: string
}

interface Category extends DraggableItem {}
const categories: Category[] = [
    { id: '1', name: 'Catergory 1' },
    { id: '2', name: 'Category 2' },
    { id: '3', name: 'Category 3' },
];

const chemicalItemList: ChemicalItem[] = [
    { id: '1', position: 39, mass: 88.906, symbol: 'Y', name: 'PAUL', parentId: '1' },
    { id: '2', position: 56, mass: 137.33, symbol: 'Ba', name: 'EVA', parentId: '1' },
    { id: '3', position: 58, mass: 140.12, symbol: 'Ce', name: 'THOMAS', parentId: '1' },
/*    { id: '4', position: 6, mass: 12.011, symbol: 'C', name: 'NICOLE', parentId: '1' },
    { id: '5', position: 7, mass: 14.007, symbol: 'N', name: 'WILMAR', parentId: '1' },
    { id: '6', position: 8, mass: 14.007, symbol: 'N', name: 'MANUEL', parentId: '1' },*/
];

const renderItem2 = (item: ChemicalItem) => (
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

const renderChild1 = (parent: Category) => {
    const { state } = useContext(DndList3Context);
    return (
        <DndList3Cascade2<ChemicalItem>
          parentId={parent.id}
          dndId2="dnd-list-items"
          items2={state as ChemicalItem[]}
          renderItem2={renderItem2}
        />
    );
};

export function DndList3Stage() {
    const { handlers } = useContext(DndList3Context);

    return (
        <DragDropContext
          onDragEnd={(result, provided) => {
              console.log('onDragEnd()', result, provided);
              handlers.reorder({ from: result.source.index, to: result.destination?.index || 0 });
          }}
        >
            <DndList3Cascade1<Category>
              dndId1="dnd-list"
              items1={categories}
              renderChild1={renderChild1}
            />
        </DragDropContext>
    );
}

export function DndList3() {
    return (
    <>
        <DndList3ContextProvider items={chemicalItemList}>
            <DndList3Stage />
        </DndList3ContextProvider>
    </>
    );
}
