import { Text } from '@mantine/core';
import { create } from 'zustand';
import classes from './DndList2.module.css';
// eslint-disable-next-line import/no-cycle
import { DndList2GenericComp } from './DndList2GenericComp';
import { ChemicalStore } from './DndList2Zustand';

interface ChemicalItem {
  id: string, position: number, mass: number, symbol: string, name: string
}

const data: ChemicalItem[] = [
    { id: '1', position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
    { id: '2', position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
    { id: '3', position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
    { id: '4', position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
    { id: '5', position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
];

export const useChemicalItemStore = create<ChemicalStore>((setState) => ({
    items: data,
    setItems: (items) => setState({ items }),
}));

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

export function DndList2() {

    return <DndList2GenericComp<ChemicalItem>
      renderItem={renderItem}
      getItemId={(index) => data[index].id}
    />;
}
