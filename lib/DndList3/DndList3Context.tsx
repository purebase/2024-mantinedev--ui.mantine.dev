import { createContext, PropsWithChildren } from 'react';
import { useListState, UseListStateHandlers } from '@mantine/hooks';

import { DraggableItem, DraggableParent } from './DndList3TreeTypes';

interface ProviderProps extends PropsWithChildren {
    depth1: DraggableParent[],
    depth2: DraggableItem[]
}

export const DndList3Context = createContext(
    {} as {
        depth1: DraggableParent[], depth1Handlers: UseListStateHandlers<DraggableParent>,
        depth2: DraggableItem[], depth2Handlers: UseListStateHandlers<DraggableItem>
    }
);

export function DndList3ContextProvider(p: ProviderProps) {
    const [depth1, depth1Handlers] = useListState<DraggableParent>(p.depth1);
    const [depth2, depth2Handlers] = useListState<DraggableItem>(p.depth2);

    return (
        <DndList3Context.Provider value={{ depth1, depth1Handlers, depth2, depth2Handlers }}>
            {p.children}
        </DndList3Context.Provider>
    );
}
