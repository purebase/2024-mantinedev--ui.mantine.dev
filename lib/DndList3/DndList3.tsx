import { Text } from '@mantine/core';
import { create } from 'zustand';
import classes from './DndList3.module.css';
import { DndList3Tree } from './DndList3Tree';
import { DndDirection, DraggableItem, DraggableParent } from './DndList3TreeTypes';

export interface Team extends DraggableParent {
    // Feel free to define custom properties
}
const teamList: Team[] = [
    { id: '1', name: 'Football', children: ['1', '2', '3'] },
    { id: '3', name: 'Hockey', children: ['9', '10', '11', '12'] },
    { id: '2', name: 'Rugby', children: ['4', '5', '6', '7', '8'] },
];

interface DndLayerStore<T> {
    items: T[], setItems: (items: T[]) => void,
    direction: DndDirection,
    renderItem: (parent: DraggableItem) => JSX.Element
}

export interface Player extends DraggableItem {
    // Feel free to define custom properties
    age: number,
    mass: number,
    symbol: string
}
const playerList: Player[] = [
    { id: '1', age: 39, mass: 88.906, symbol: '01', name: 'PAUL' },
    { id: '2', age: 56, mass: 137.33, symbol: '02', name: 'EVA' },
    { id: '3', age: 58, mass: 140.12, symbol: '03', name: 'THOMAS' },
    { id: '4', age: 6, mass: 12.011, symbol: '04', name: 'NICOLE' },
    { id: '5', age: 39, mass: 88.906, symbol: '05', name: 'MANUEL' },
    { id: '6', age: 56, mass: 137.33, symbol: '06', name: 'TINA' },
    { id: '7', age: 58, mass: 140.12, symbol: '07', name: 'LAURA' },
    { id: '8', age: 6, mass: 12.011, symbol: '08', name: 'WILLE' },
    { id: '9', age: 39, mass: 88.906, symbol: '09', name: 'THEO' },
    { id: '10', age: 56, mass: 137.33, symbol: '10', name: 'EDITH' },
    { id: '11', age: 58, mass: 140.12, symbol: '11', name: 'DANI' },
    { id: '12', age: 6, mass: 12.011, symbol: '12', name: 'WILMAR' },
];

const depth1_renderItem = (item: DraggableItem) => {
    // Feel free to define the item style:
    const team = item as Team;
    return (
        <Text color="#ff0000">{team.name}</Text>
    );
};

const depth2_renderItem = (item: DraggableItem) => {
    // Feel free to define the item style:
    const player = item as Player;
    return (
    <>
        <Text className={classes.symbol}>{player.symbol}</Text>
        <div>
            <Text>{item.name}</Text>
            <Text c="dimmed" size="sm">
                Age: {player.age} • Mass: {player.mass}
            </Text>
        </div>
    </>);
};

export const useDndDepth1Store = create<DndLayerStore<Team>>((setState) => ({
    items: teamList, setItems: (items) => setState({ items }),
    direction: 'vertical',
    renderItem: depth1_renderItem,
}));

export const useDndDepth2Store = create<DndLayerStore<Player>>((setState) => ({
    items: playerList,
    setItems: (items) => setState({ items }),
    direction: 'horizontal',
    renderItem: depth2_renderItem,
}));

export function DndList3() {
    return (
        <DndList3Tree />
    );
}
