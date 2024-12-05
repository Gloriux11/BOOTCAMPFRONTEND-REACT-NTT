import { createContext, Dispatch, ReactNode, useEffect, useReducer } from "react";
import { Product } from "../types/product.type";
import { CartItem } from "../types/cartItem.type";
import { useAuth } from "./AuthContext";

interface CartState {
  items: CartItem[];
}

interface CartAction {
  type:
  | "ADD_TO_CART"
  | "REMOVE_FROM_CART"
  | "INCREASE_QUANTITY"
  | "DECREASE_QUANTITY"
  | "CLEAR_CART"
  | "LOAD_CART";
  payload: Product | CartItem[] | null;
}

const initialState: CartState = {
  items: [],
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let updatedItems;
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.items.find(
        (item) => item.id === (action.payload as Product)?.id
      );
      if (existingItem) {
        updatedItems = state.items.map((item) =>
          item.id === (action.payload as Product)?.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...(action.payload as Product), quantity: 1 }];
      }
      break;
    case "REMOVE_FROM_CART":
      updatedItems = state.items.filter((item) => item.id !== (action.payload as Product)?.id);
      break;
    case "INCREASE_QUANTITY":
      updatedItems = state.items.map((item) =>
        item.id === (action.payload as Product)?.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      break;
    case "DECREASE_QUANTITY":
      updatedItems = state.items.map((item) =>
        item.id === (action.payload as Product)?.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      break;
    case "LOAD_CART":
      updatedItems = action.payload as CartItem[];
      break;
    case "CLEAR_CART":
      updatedItems = [];
      break;
    default:
      return state;
  }

  return {
    ...state,
    items: updatedItems,
  };
};

interface CartContextProps {
  state: CartState;
  dispatch: Dispatch<CartAction>;
}

export const CartContext = createContext<CartContextProps | undefined>(
  undefined
);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.id}`);
      if (savedCart) {
        dispatch({ type: 'LOAD_CART', payload: JSON.parse(savedCart) });
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(state.items));
    }
  }, [state.items, user]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};