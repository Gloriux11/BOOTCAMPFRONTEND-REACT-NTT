import React from "react";
import { Product } from "../../../types/product.type";
import CartItemRow from "../CartItemRow/CartItemRow";
import "./CartItemList.css"

interface CartItemListProps {
  items: Product[];
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
            <th className="Eliminar"></th>
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
