export interface DraggableItem {
    id: string,
    name: string
}

export interface DraggableParent extends DraggableItem {
    children: string[]
}

export type DndGridAxisDirection = 'vertical' | 'horizontal';

export interface AxisSettingsProps<T> {
    direction: DndGridAxisDirection,
    renderItem: (item: T) => JSX.Element
}

// HINT The generic type will be used for conditional typing in future
export interface AxisProps<T> {
    data: T[],
    settings: AxisSettingsProps<T>
}

export interface DndGridAxisStore<T> {
    items: T[], setItems: (items: T[]) => void
}
