export interface DraggableItem {
    id: string,
    name: string
}

export interface DraggableParent extends DraggableItem {
    children: string[]
}

export type DndGridAxisDirection = 'vertical' | 'horizontal';

export interface DndGridAxisStore<T> {
    items: T[],
    setItems: (items: T[]) => void,
    direction: DndGridAxisDirection,
    renderItem: (parent: DraggableItem) => JSX.Element
}
