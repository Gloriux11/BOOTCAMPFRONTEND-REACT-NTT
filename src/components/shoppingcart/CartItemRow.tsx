import React from "react";
import { Product } from "../../types/product.type";
import "./shoppingcart.css";

interface CartItemRowProps {
  item: Product;
}

const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  return (
    <tr>
      <td>
        <div className="product-info">
          <img src={item.images[0]} alt={item.title} />
          <div>
            <p className="product-title">{item.title}</p>
            <p className="product-brand">{item.brand}</p>
          </div>
        </div>
      </td>
      <td>
        <div className="quantity-controls">
          <button className="decrease-btn">-</button>
          <span className="quantity">2</span>
          <button className="increase-btn">+</button>
        </div>
      </td>
      <td>
        <p>S/. {item.price.toFixed(2)}</p>
      </td>
      <td>
      <button className="remove-item-btn">Eliminar</button>
      </td>
    </tr>
  );
};

export default CartItemRow;
