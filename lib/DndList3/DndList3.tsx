import {Text} from '@mantine/core';
import {DragDropContext} from '@hello-pangea/dnd';
import {useContext} from 'react';
import classes from './DndList3.module.css';
import {DndList3DraggableListItems} from '@/lib/DndList3/DndList3DraggableListItems';
import {DndList3Context, DndList3ContextProvider} from '@/lib/DndList3/DndList3Context';

export interface DraggableItem {
  id: string
}

interface ChemicalItem extends DraggableItem {
  position: number, mass: number, symbol: string, name: string
}

const chemicalItemList: ChemicalItem[] = [
    { id: '1', position: 39, mass: 88.906, symbol: 'Y', name: 'PAUL' },
    { id: '2', position: 56, mass: 137.33, symbol: 'Ba', name: 'EVA' },
    { id: '3', position: 58, mass: 140.12, symbol: 'Ce', name: 'THOMAS' },
    { id: '4', position: 6, mass: 12.011, symbol: 'C', name: 'NICOLE' },
    { id: '5', position: 7, mass: 14.007, symbol: 'N', name: 'WILMAR' },
    { id: '6', position: 8, mass: 14.007, symbol: 'N', name: 'MANUEL' },
];

const renderItem = (item: ChemicalItem) => (
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

export function DndList3Stage() {
    const { state, handlers } = useContext(DndList3Context);

    return (
        <DragDropContext
          onDragEnd={({ destination, source }) =>
                handlers.reorder({ from: source.index, to: destination?.index || 0 })
            }
        >
            <DndList3DraggableListItems<ChemicalItem>
              items={state as ChemicalItem[]}
              renderItem={renderItem}
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
