import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Product } from "../../types/product.type";
import QuantityControls from "../common/QuantityControls/QuantityControls";
import { useAuth } from '../../context/AuthContext';
import LoginModal from "../common/LoginModal/LoginModal";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const cartContext = useContext(CartContext);
  const { isAuthenticated } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!cartContext) {
    return null;
  }
  const { state, dispatch } = cartContext;
  const inCart = state.items.some((item: Product) => item.id === product.id);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="product-card" data-testid={`product-card-${product.id}`}>
      <img
        className="card-img"
        src={product.images[0]}
        alt={product.title}
        width="333"
        height="280"
        loading="lazy"
      />
      <h3 className="card-title">{product.brand}</h3>
      <p className="card-content">{product.title}</p>
      <p className="card-price price">S/. {product.price}</p>
      <p className="card-category">{product.category}</p>
      {inCart ? (
        <QuantityControls product={product} />
      ) : (
        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          Agregar al carrito
        </button>
      )}
      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ProductCard;