import {createContext, PropsWithChildren} from 'react';
import {useListState, UseListStateHandlers} from '@mantine/hooks';

import {DraggableItem} from './DndList3DataTypes';

interface ProviderProps<T> extends PropsWithChildren {
    depth1: T[],
    depth2: T[]
}

export const DndList3Context = createContext(
    {} as {
        depth1: unknown[], depth1Handlers: UseListStateHandlers<any>,
        depth2: unknown[], depth2Handlers: UseListStateHandlers<any>
    }
);

export function DndList3ContextProvider<T extends DraggableItem>(p: ProviderProps<T>) {
    const [depth1, depth1Handlers] = useListState(p.depth1);
    const [depth2, depth2Handlers] = useListState(p.depth2);

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
