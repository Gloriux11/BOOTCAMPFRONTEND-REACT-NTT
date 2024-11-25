import React, { useContext, useEffect, useState } from "react";
import CartItemList from "../components/shoppingcart/CartItemList";
import CartSummary from "../components/shoppingcart/CartSummary";
import ShippingForm from "../components/shoppingcart/ShippingForm";
import "../components/shoppingcart/shoppingcart.css";
import { CartContext } from "../context/CartContext";
import { CartItem } from "../types/cartItem.type";
import EmptyCart from "../components/shoppingcart/CartEmpty";

const CartPage: React.FC = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    return <p>Error: Cart context is not available</p>;
  }
  const { state } = cartContext;
  const [totalPrice, setTotalPrice] = useState<number>(0); // Precio total del carrito

  // Obtener productos desde el endpoint al cargar la página
  useEffect(() => {
    calculateTotal(state.items);
  }, [state.items]);

  // Calcular el precio total del carrito
  const calculateTotal = (items: CartItem[]) => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  return state.items.length === 0 ? (
    <EmptyCart />
  ) : (
    <div>
      <h2 className="cart-title">Mi carrito</h2>
      <div className="cart-page">
        <CartItemList items={state.items} />
        <CartSummary
          totalPrice={totalPrice}
          subtotal={totalPrice} // Por simplicidad, el subtotal será igual al total
          discounts={0} // Placeholder para descuentos
        />
        <ShippingForm />
      </div>
    </div>
  );
};

export default CartPage;
