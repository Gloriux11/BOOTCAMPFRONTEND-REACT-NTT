import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { Product } from "../../../types/product.type";
import "./QuantityControls.css";

interface QuantityControlsProps {
  product: Product;
}

const QuantityControls = ({ product }: QuantityControlsProps) => {
  const context = useContext(CartContext);
  if (!context) {
    return null;
  }
  const { state, dispatch } = context;
  const item = state.items.find((item) => item.id === product.id);

  const handleRemoveFromCart = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  };

  const handleIncreaseQuantity = () => {
    dispatch({ type: "INCREASE_QUANTITY", payload: product });
  };

  const handleDecreaseQuantity = () => {
    dispatch({ type: "DECREASE_QUANTITY", payload: product });
  };

  return (
    <div className="quantity-controls">
      <button
        className="remove-btn"
        title="Eliminar"
        onClick={handleRemoveFromCart}
        style={{ display: item && item.quantity > 1 ? "none" : "block" }}
      >
        <span className="material-symbols-outlined">delete</span>
      </button>
      <button
        className="decrease-btn"
        title="Disminuir"
        onClick={handleDecreaseQuantity}
        style={{ display: item && item.quantity > 1 ? "block" : "none" }}
      >
        <span className="material-symbols-outlined">horizontal_rule</span>
      </button>
      <span className="quantity">{item?.quantity || 1}</span>
      <button
        className="increase-btn"
        title="Aumentar"
        disabled={item && item.quantity >= product.stock}
        onClick={handleIncreaseQuantity}
      >
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
};

export default QuantityControls;
