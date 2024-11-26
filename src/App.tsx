import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/common/Layout/Layout";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import { ProductService } from "./services/product.service";
import { Product } from "./types/product.type";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  // al declararlo dentro de un componente la instancia se vuelve a definir en cada actualizaci'on del componente
  const productService = new ProductService();

  const handleSearch = async (query: string) => { 
    const fetchedProducts = await productService.searchProducts(query);
    setProducts(fetchedProducts);
  };

  return (
    <BrowserRouter>
      <Layout onSearch={handleSearch}>
        <Routes>
          <Route path="/" element={<ProductPage products={products} />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
