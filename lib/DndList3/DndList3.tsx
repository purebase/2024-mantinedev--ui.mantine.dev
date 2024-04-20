import {useContext} from 'react';
import {Text} from '@mantine/core';
import {DndList3Context, DndList3ContextProvider} from './DndList3Context';
import {DndList3TreeDepth2} from './DndList3TreeDepth2';
import classes from './DndList3.module.css';
import {DraggableItem, DraggableParent} from './DndList3DataTypes';
import {DndList3Tree} from './DndList3Tree';

export interface ChemicalItem extends DraggableItem {
    position: number,
    mass: number,
    symbol: string
}

export interface Category extends DraggableParent {
}

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
export const renderCategory = (parent: DraggableParent) => {
    const { depth2 } = useContext(DndList3Context);
    const typedDepth2 = depth2 as ChemicalItem[];
    const items: ChemicalItem[] = parent.children.map(
        (itemId) => typedDepth2.find(item => item.id === itemId))
        .filter(item => item !== undefined) as ChemicalItem[];

    return (
        <DndList3TreeDepth2<ChemicalItem>
          parentId={parent.id}
          dndId2="dnd-list-items"
          items2={items}
          renderItem2={renderChemicalItem}
        />
    );
};

export function DndList3() {
    return (
        <DndList3ContextProvider<DraggableItem> depth1={categories} depth2={chemicalItemList}>
            <DndList3Tree renderTreeDepth1Items={renderCategory} />
        </DndList3ContextProvider>
    );
}
