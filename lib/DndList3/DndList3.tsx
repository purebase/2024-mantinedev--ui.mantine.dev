import { Text } from '@mantine/core';
import { DndList3ContextProvider } from './DndList3Context';
import classes from './DndList3.module.css';
import { DndList3Tree } from './DndList3Tree';
import { DraggableItem, DraggableParent } from './DndList3TreeTypes';

// TODO rename to team
export interface Category extends DraggableParent {
    // Feel free to define custom properties
}
const categories: Category[] = [
    { id: '1', name: 'Catergory 1', children: ['1', '2', '3'] },
    { id: '2', name: 'Category 2', children: ['4', '5', '6', '7', '8'] },
    { id: '3', name: 'Category 3', children: ['9', '10', '11', '12'] },
];

// TODO rename to player
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

const depth1_renderItem = (item: DraggableParent) => {
    // Feel free to define the item style:
    const category = item as Category;
    return (
        <Text color="#ff0000">{category.name}</Text>
    );
};

const depth2_renderItem = (item: DraggableItem) => {
    // Feel free to define the item style:
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

export function DndList3() {
    // TODO Use context also for methods:
    return (
        <DndList3ContextProvider
          treeDepth1={{ data: categories, renderItem: depth1_renderItem, direction: 'vertical' }}
          treeDepth2={{ data: chemicalItemList, renderItem: depth2_renderItem, direction: 'horizontal' }}
        >
            <DndList3Tree />
        </DndList3ContextProvider>
    );
}
