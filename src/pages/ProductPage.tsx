// faltan test y paginado
// el objetivo del paginado era ver como se implementa un hook reutilizable
import { useEffect, useState, useRef, useMemo } from "react";
import { Product } from "../types/product.type";
import { ProductService } from "../services/product.service";
import ProductFilter from "../components/products/ProductFilter";
import ProductCard from "../components/products/ProductCard";
import "../components/products/product.css";
import { FetchParams } from "../types/fetchParams.type";

interface ProductsProps {
  products: Product[];
}

const ProductPage = ({ products }: ProductsProps) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState<string | undefined>(undefined);
  const productService = useMemo(() => new ProductService(), []);
  const isFetching = useRef(false); // Para evitar múltiples llamadas a la API

  const fetchProducts = async ({ category, page, limit = 12 }: FetchParams) => {
    if (isFetching.current) return;
    isFetching.current = true;

    const skip = page * limit;
    let fetchedProducts: Product[];

    if (category) {
      fetchedProducts = await productService.fetchProductsByCategory(category, limit, skip);
    } else {
      fetchedProducts = await productService.fetchProducts(limit, skip);
    }

    if (fetchedProducts.length < limit) {
      setHasMore(false);
    }
    setFilteredProducts((prevProducts) => [...prevProducts, ...fetchedProducts]);
    isFetching.current = false;
  };

  useEffect(() => {
    fetchProducts({ category, page, limit: 12 });
  }, [category, page]);

  const handleCategorySelect = (category: string) => {
    setPage(0);
    setHasMore(true);
    setFilteredProducts([]);
    setCategory(category);
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1 && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  return (
    <div className="main-container">
      <ProductFilter onCategorySelect={handleCategorySelect} />
      <main>
        <div id="product-list" className="product-list">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {hasMore && <p>Cargando...</p>}
      </main>
    </div>
  );
};

export default ProductPage;