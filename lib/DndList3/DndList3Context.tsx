import { createContext, PropsWithChildren } from 'react';
import { useListState, UseListStateHandlers } from '@mantine/hooks';

import { DraggableItem, DraggableParent } from './DndList3TreeTypes';

interface ProviderProps extends PropsWithChildren {
    treeDepth1: DraggableParent[],
    treeDepth2: DraggableItem[]
}

export const DndList3Context = createContext(
    {} as {
        treeDepth1: DraggableParent[], treeDepth1Handlers: UseListStateHandlers<DraggableParent>,
        treeDepth2: DraggableItem[], treeDepth2Handlers: UseListStateHandlers<DraggableItem>
    }
);

export function DndList3ContextProvider(p: ProviderProps) {
    const [treeDepth1, treeDepth1Handlers] = useListState<DraggableParent>(p.treeDepth1);
    const [treeDepth2, treeDepth2Handlers] = useListState<DraggableItem>(p.treeDepth2);

    return (
        <DndList3Context.Provider value={{ treeDepth1, treeDepth1Handlers, treeDepth2, treeDepth2Handlers }}>
            {p.children}
        </DndList3Context.Provider>
    );
}
