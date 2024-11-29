import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { calculateTotal } from "../utils/cartUtils"; // nueva función para calcular el total

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  const { state, dispatch } = context;

  return {
    items: state.items,
    totalPrice: calculateTotal(state.items), // ahora el cálculo está delegado a otra función
    dispatch,
  };
};