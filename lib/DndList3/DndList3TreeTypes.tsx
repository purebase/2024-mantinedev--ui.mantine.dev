export interface DraggableItem {
    id: string,
    name: string
}

export interface DraggableParent extends DraggableItem {
    children: string[]
}

export type DndDirection = 'vertical' | 'horizontal';

export interface DndLayerStore<T> {
    items: T[],
    setItems: (items: T[]) => void,
    direction: DndDirection,
    renderItem: (parent: DraggableItem) => JSX.Element
}
