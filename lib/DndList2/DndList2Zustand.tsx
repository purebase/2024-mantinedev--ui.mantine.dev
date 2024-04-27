export interface ChemicalItem {
  id: string;
  position: number;
  mass: number;
  symbol: string;
  name: string;
}

export interface ChemicalItemsStore {
  items: ChemicalItem[];
  setItems: (items: ChemicalItem[]) => void;
}
