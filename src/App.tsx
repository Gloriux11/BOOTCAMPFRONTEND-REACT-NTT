import { useState, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/common/Layout/Layout";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import { ProductService } from "./services/product.service";
import { Product } from "./types/product.type";
import { routes } from "./routes/routes"
import Login from "./pages/Login";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const productService = useMemo(() => new ProductService(), []);

  const handleSearch = async (query: string) => { 
    const fetchedProducts = await productService.searchProducts(query);
    setProducts(fetchedProducts);
  };

  return (
    <BrowserRouter>
      <Layout onSearch={handleSearch}>
        <Routes>
          <Route path={routes.Principal} element={<ProductPage products={products} />} />
          <Route path={routes.Carrito} element={<CartPage />} />
          <Route path={routes.Login} element={<Login/>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
