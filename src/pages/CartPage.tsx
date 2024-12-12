// test
import React from "react";
import CartItemList from "../components/shoppingcart/CartItemList/CartItemList";
import CartSummary from "../components/shoppingcart/CartSummary/CartSummary";
import ShippingForm from "../components/shoppingcart/ShippingForm/ShippingForm";
import "../components/shoppingcart/CartPage.css";
import EmptyCart from "../components/shoppingcart/CartEmpty/CartEmpty";
import { useCart } from "../hooks/useCart"; 

const CartPage: React.FC = () => {
  const { items, totalPrice } = useCart(); 

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div>
      <h2 className="cart-title">Mi carrito</h2>
      <div className="cart-page">
        <CartItemList items={items} />
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

