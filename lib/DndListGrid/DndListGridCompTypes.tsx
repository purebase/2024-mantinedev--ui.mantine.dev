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

export interface AxisProps<T> {
    data: T[],
    settings: AxisSettingsProps<unknown>
}

export interface DndGridAxisStore<T> {
    items: T[], setItems: (items: T[]) => void
}
