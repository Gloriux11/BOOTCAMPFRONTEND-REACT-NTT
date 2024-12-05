import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Product } from "../../types/product.type";
import QuantityControls from "../common/QuantityControls/QuantityControls";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    return null;
  }
  const { state, dispatch } = cartContext;
  const inCart = state.items.some((item: Product) => item.id === product.id);

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
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
    </div>
  );
};

export default ProductCard;