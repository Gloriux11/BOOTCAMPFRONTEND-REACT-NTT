import { ProductCard } from "./ProductCard";
import "./Product.css";
import { ProductFilter } from "./ProductFilter";
import { useEffect, useState } from "react";
import { ProductService } from "../../services/product.service";
import { Product } from "../../types/product.type";

interface ProductsProps {
  products: Product[];
}

export const Products = ({ products }: ProductsProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const productService = new ProductService();

  const fetchProducts = async (category?: string) => {
    let fetchedProducts;
    if (category) {
      fetchedProducts = await productService.fetchProductsByCategory(category);
    } else {
      fetchedProducts = await productService.fetchProducts();
    }
    setFilteredProducts(fetchedProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleCategorySelect = (category: string) => {
    fetchProducts(category);
  };

  return (
    <div className="main-container">
      <ProductFilter onCategorySelect={handleCategorySelect} />
      <main>
        <div id="product-list" className="product-list">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};
