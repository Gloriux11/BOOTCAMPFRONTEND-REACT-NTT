import { useCart } from "../../hooks/useCart";
import { Product } from "../../types/product.type";
import QuantityControls from "../common/QuantityControls/QuantityControls";
import "./shoppingcart.css";

interface CartItemRowProps {
  item: Product;
}

const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const { dispatch } = useCart();

  const handleRemoveFromCart = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

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
        <QuantityControls product={item} />
      </td>
      <td>
        <p className="item-price">S/. {item.price.toFixed(2)}</p>
      </td>
      <td>
        <button className="remove-item-btn" onClick={handleRemoveFromCart}>
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default CartItemRow;
