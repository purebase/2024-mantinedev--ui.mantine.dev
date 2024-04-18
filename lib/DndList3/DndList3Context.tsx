import { createContext, PropsWithChildren } from 'react';
import { useListState, UseListStateHandlers } from '@mantine/hooks';
import { DraggableItem } from '../DndList2/DndList2';

interface ProviderProps<T> extends PropsWithChildren {
    depth1: T[],
    depth2: T[]
}

export interface ContextType<T extends DraggableItem> {
    depth1: T[],
    depth1Handlers: UseListStateHandlers<any>,
    depth2: T[],
    depth2Handlers: UseListStateHandlers<any>
}

export const DndList3Context = createContext<ContextType<DraggableItem>>({
    depth1: [],
    depth1Handlers: {} as UseListStateHandlers<DraggableItem>,
    depth2: [],
    depth2Handlers: {} as UseListStateHandlers<DraggableItem>,
});

export function DndList3ContextProvider<T extends DraggableItem>(p: ProviderProps<T>) {
    const [depth1, depth1Handlers] = useListState<T>(p.depth1);
    const [depth2, depth2Handlers] = useListState<T>(p.depth2);

    return (
        <DndList3Context.Provider value={{
            depth1,
            depth1Handlers,
            depth2,
            depth2Handlers,
        }}
        >
            {p.children}
        </DndList3Context.Provider>
    );
}
