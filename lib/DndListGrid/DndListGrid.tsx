import { Text } from '@mantine/core';
import { create } from 'zustand';
import classes from './DndListGrid.module.css';
import { DndListGridComp } from './DndListGridComp';

import { DndGridAxisStore, DraggableItem, DraggableParent } from './DndListGridCompTypes';

export interface Team extends DraggableParent {
    // Feel free to define custom properties
}

export interface Player extends DraggableItem {
    // Feel free to define custom properties
    age: number,
    mass: number,
    symbol: string
}

const teamList: Team[] = [
    { id: '1', name: 'Football', children: ['1', '2', '3'] },
    { id: '3', name: 'Hockey', children: ['9', '10', '11', '12'] },
    { id: '2', name: 'Rugby', children: ['4', '5', '6', '7', '8'] },
];

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

export const useDndGridAxis1Store = create<DndGridAxisStore<Team>>((setState) => ({
    items: teamList, setItems: (items) => setState({ items }),
    direction: 'vertical',
    renderItem: (item: DraggableItem) => {
        const team = item as Team;
        return (
            <Text color="#ff0000">{team.name}</Text>
        );
    },
}));

export const useDndGridAxis2Store = create<DndGridAxisStore<Player>>((setState) => ({
    items: playerList, setItems: (items) => setState({ items }),
    direction: 'horizontal',
    renderItem: (item: DraggableItem) => {
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
    },
}));

export function DndListGrid() {
    return (
        <DndListGridComp />
    );
}