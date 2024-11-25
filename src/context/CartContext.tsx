import { createContext, Dispatch, ReactNode, useReducer } from "react";
import { Product } from "../types/product.type";
import { CartItem } from "../types/cartItem.type";

interface CartState {
  items: CartItem[];
}

interface CartAction {
  type:
    | "ADD_TO_CART"
    | "REMOVE_FROM_CART"
    | "INCREASE_QUANTITY"
    | "DECREASE_QUANTITY"
    | "CLEAR_CART";
  payload: Product | null;
}

const initialState: CartState = {
  items: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find(
        (item) => item.id === action.payload?.id
      );
      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload?.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...(action.payload as Product), quantity: 1 }],
        };
      }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload?.id),
      };
    case "INCREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload?.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload?.id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ),
      };
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

interface CartContextProps {
  state: CartState;
  dispatch: Dispatch<CartAction>;
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
