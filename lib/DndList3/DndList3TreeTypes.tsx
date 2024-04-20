export interface DraggableItem {
    id: string,
    name: string
}

export interface DraggableParent extends DraggableItem {
    children: string[]
}
