export interface ChemicalItem {
  id: string;
  position: number;
  mass: number;
  symbol: string;
  name: string;
}

export interface ChemicalStore {
  items: ChemicalItem[];
  setItems: (items: ChemicalItem[]) => void;
}
