export interface CartItemListProps = {

    items: Product[];
  
    onRemoveItem: (id: number) => void;
  
    onUpdateQuantity: (id: number, quantity: number) => void;
  
  };