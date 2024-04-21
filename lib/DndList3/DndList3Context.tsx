import { createContext, PropsWithChildren } from 'react';
import { useListState, UseListStateHandlers } from '@mantine/hooks';

import { DndDirection, DraggableItem, DraggableParent } from './DndList3TreeTypes';

interface ProviderProps extends PropsWithChildren {
    treeDepth1: { data: DraggableParent[], renderItem: (parent: DraggableParent) => JSX.Element, direction: DndDirection },
    treeDepth2: { data: DraggableItem[], renderItem: (parent: DraggableItem) => JSX.Element, direction: DndDirection }
}

export const DndList3Context = createContext(
    {} as {
        treeDepth1_data: DraggableParent[], treeDepth1_dataHandlers: UseListStateHandlers<DraggableParent>,
        treeDepth1_renderItem: (item: DraggableParent) => JSX.Element,
        treeDepth1_direction: DndDirection

        treeDepth2_data: DraggableItem[], treeDepth2_dataHandlers: UseListStateHandlers<DraggableItem>,
        treeDepth2_renderItem: (item: DraggableItem) => JSX.Element,
        treeDepth2_direction: DndDirection
    }
);

export function DndList3ContextProvider(p: ProviderProps) {
    const [treeDepth1_data, treeDepth1_dataHandlers] = useListState<DraggableParent>(p.treeDepth1.data);
    const [treeDepth2_data, treeDepth2_dataHandlers] = useListState<DraggableItem>(p.treeDepth2.data);

    return (
        <DndList3Context.Provider value={{
            treeDepth1_data, treeDepth1_dataHandlers,
            treeDepth1_renderItem: p.treeDepth1.renderItem,
            treeDepth1_direction: p.treeDepth1.direction,

            treeDepth2_data, treeDepth2_dataHandlers,
            treeDepth2_renderItem: p.treeDepth2.renderItem,
            treeDepth2_direction: p.treeDepth2.direction,
        }}
        >
            {p.children}
        </DndList3Context.Provider>
    );
}
