import { createContext, PropsWithChildren } from 'react';
import { useListState, UseListStateHandlers } from '@mantine/hooks';

import { DraggableItem, DraggableParent } from './DndList3TreeTypes';

interface ProviderProps extends PropsWithChildren {
    treeDepth1: { data: DraggableParent[], renderList: (parent: DraggableParent, children: DraggableItem[]) => JSX.Element },
    treeDepth2: { data: DraggableItem[] }
}

export const DndList3Context = createContext(
    {} as {
        treeDepth1_data: DraggableParent[], treeDepth1_dataHandlers: UseListStateHandlers<DraggableParent>,
        treeDepth2_data: DraggableItem[], treeDepth2_dataHandlers: UseListStateHandlers<DraggableItem>,
        treeDepth1_renderList: (parent: DraggableParent, children: DraggableItem[]) => JSX.Element
    }
);

export function DndList3ContextProvider(p: ProviderProps) {
    const [treeDepth1_data, treeDepth1_dataHandlers] = useListState<DraggableParent>(p.treeDepth1.data);
    const [treeDepth2_data, treeDepth2_dataHandlers] = useListState<DraggableItem>(p.treeDepth2.data);

    return (
        <DndList3Context.Provider value={{
            treeDepth1_data, treeDepth1_dataHandlers, treeDepth1_renderList: p.treeDepth1.renderList,
            treeDepth2_data, treeDepth2_dataHandlers,
        }}
        >
            {p.children}
        </DndList3Context.Provider>
    );
}
