export interface DraggableItem {
    id: string,
    name: string
}

export interface DraggableParent extends DraggableItem {
    children: string[]
}

export interface ChemicalItem extends DraggableItem {
    position: number,
    mass: number,
    symbol: string
}

export interface Category extends DraggableParent {
}
