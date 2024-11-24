import { Product } from "../../types/product.type";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="product-card">
      <img
        className="card-img"
        src={product.images[0]}
        alt={product.title}
        width="333"
        height="280"
        loading="lazy"
      />
      <h3 className="card-title">{product.title}</h3>
      <p className="card-content">{product.description}</p>
      <p className="card-price price">${product.price}</p>
      <p className="card-category">{product.category}</p>
      <button className="add-to-cart-btn">Agregar al carrito</button>
    </div>
  );
};
