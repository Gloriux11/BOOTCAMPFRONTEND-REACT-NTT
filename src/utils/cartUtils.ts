// test
import { CartItem } from "../types/cartItem.type"; 

export const calculateTotal = (items: CartItem[]): number => {
  const total = items.reduce((sum: number, item: CartItem) => {
    return sum + item.price * item.quantity; 
  }, 0); 

  return total;
};