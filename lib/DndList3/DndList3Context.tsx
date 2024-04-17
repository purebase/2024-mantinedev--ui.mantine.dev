import {createContext, PropsWithChildren} from 'react';
import {useListState, UseListStateHandlers} from '@mantine/hooks';
import {DraggableItem} from '@/lib/DndList3/DndList3';

interface ProviderProps<T> extends PropsWithChildren {
    items: T[]
}

export const DndList3Context = createContext(
    {} as {
        state: unknown[],
        handlers: UseListStateHandlers<any>
    }
);

export function DndList3ContextProvider<T extends DraggableItem>(p: ProviderProps<T>) {
    const [state, handlers] = useListState(p.items);

    return (
        <DndList3Context.Provider value={{
            state, handlers,
        }}
        >
            {p.children}
        </DndList3Context.Provider>
    );
}
