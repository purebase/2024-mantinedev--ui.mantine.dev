import { Text } from '@mantine/core';
import { DndList3ContextProvider } from './DndList3Context';
import { DndList3TreeDepth2 } from './DndList3TreeDepth2';
import classes from './DndList3.module.css';
import { DndList3Tree } from './DndList3Tree';
import { DraggableItem, DraggableParent } from './DndList3TreeTypes';

export interface Category extends DraggableParent {
    // Feel free to define custom properties
}
const categories: Category[] = [
    { id: '1', name: 'Catergory 1', children: ['1', '2', '3'] },
    { id: '2', name: 'Category 2', children: ['4', '5', '6', '7', '8'] },
    { id: '3', name: 'Category 3', children: ['9', '10', '11', '12'] },
];

export interface ChemicalItem extends DraggableItem {
    // Feel free to define custom properties
    position: number,
    mass: number,
    symbol: string
}
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
const renderChemicalItem = (item: DraggableItem) => {
    const chemicalItem = item as ChemicalItem;
    return (
    <>
        <Text className={classes.symbol}>{chemicalItem.symbol}</Text>
        <div>
            <Text>{item.name}</Text>
            <Text c="dimmed" size="sm">
                Position: {chemicalItem.position} • Mass: {chemicalItem.mass}
            </Text>
        </div>
    </>);
};

export const renderCategory = (parent: DraggableParent, children: DraggableItem[]) => {
    const items = parent.children.map(
        (itemId) => children.find(item => item.id === itemId)
    );

    return (
        <DndList3TreeDepth2
          parentId={parent.id}
          dndId2="dnd-list-items"
          items2={items.filter(item => item !== undefined) as DraggableItem[]}
          renderItem2={renderChemicalItem}
        />
    );
};

export function DndList3() {
    return (
        <DndList3ContextProvider treeDepth1={categories} treeDepth2={chemicalItemList}>
            <DndList3Tree renderTreeDepth1Items={renderCategory} />
        </DndList3ContextProvider>
    );
}
