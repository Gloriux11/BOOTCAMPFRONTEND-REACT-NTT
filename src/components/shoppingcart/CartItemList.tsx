import React from "react";
import { Product } from "../../types/product.type";
import CartItemRow from "./CartItemRow";

interface CartItemListProps {
  items: Product[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const CartItemList: React.FC<CartItemListProps> = ({ items }) => {
  return (
    <div className="cart-item-list">
      <table>
        <thead>
          <tr>
            <th className="Productos">PRODUCTOS</th>
            <th className="Cantidad">CANTIDAD</th>
            <th className="Subtotal">SUB-TOTAL</th>
            <th className="Eliminar">ELIMINAR</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartItemList;