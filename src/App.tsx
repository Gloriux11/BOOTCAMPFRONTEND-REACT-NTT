import { useState } from "react";
import "./App.css";
import { Footer } from "./components/common/Footer/Footer";
import { Navbar } from "./components/common/Navbar/Navbar";
import { Products } from "./components/products/Products";
import { Product } from "./types/product.type";
import { ProductService } from "./services/product.service";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const productService = new ProductService();

  const handleSearch = async (query: string) => {
    const fetchedProducts = await productService.searchProducts(query);
    setProducts(fetchedProducts);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      <Products products={products}/>
      <Footer />
    </>
  );
}

export default App;
