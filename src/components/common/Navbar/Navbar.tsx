import { useContext, useMemo, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import { ProductService } from "../../../services/product.service";
import { Product } from "../../../types/product.type";
import "./Navbar.css";
import { routes } from "./../../../routes/routes";
import { useAuth } from "../../../context/AuthContext";

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceTimeout, setDebounceTimeout] = useState<number | null>(null);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("CartContext must be used within a CartProvider");
  }
  const { state, dispatch } = cartContext;
  const navigate = useNavigate();
  const location = useLocation();
  const productService = useMemo(() => new ProductService(), []);
  const { isAuthenticated, user, logout } = useAuth();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(async () => {
      onSearch(value);
      if (value) {
        const results = await productService.searchProducts(value);
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    }, 600); // 600ms debounce time

    setDebounceTimeout(Number(newTimeout));
  };

  const handleLogout = () => {
    if (user) {
      localStorage.removeItem(`cart_${user.id}`);
    }
    dispatch({ type: "CLEAR_CART", payload: null });
    logout();
  };

  const cartItemCount = state.items.length;

  return (
    <header>
      <div className="header-container">
        <button className="logo" onClick={() => navigate("/")}>
          <img
            src="./src/assets/images/logo.png"
            alt="Logo Chacra"
            width="150"
            height="56"
          />
        </button>
        <div id="search" className="search">
          <span className="material-symbols-outlined">search</span>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={handleInputChange}
          />
          {location.pathname !== "/" && searchResults.length > 0 && (
            <div className="search-results">
              <ul>
                {searchResults.map((product) => (
                  <li
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      width="50"
                      height="50"
                    />
                    {product.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <nav className="nav-links">
          <ul>
            {isAuthenticated ? (
              <>
                <li>
                  <a href="#">Bienvenido {user.firstName + " " + user.lastName}</a>
                </li>
                <li>
                  <a href="#">Mis compras</a>
                </li>
                <li>
                  <button className="logout-btn" onClick={handleLogout}>
                    <span className="material-symbols-outlined">logout</span>
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  className="login-btn"
                  onClick={() => navigate(routes.Login)}
                >
                  Iniciar Sesión
                </button>
              </li>
            )}
          </ul>
        </nav>
        <div className="cart-wrapper">
          <button className="menu-btn">
            <img
              src="./src/assets/images/menu-icon.webp"
              alt="Menú"
              width="24"
              height="24"
            />
          </button>
          <button className="cart" onClick={() => navigate("/cart")}>
            <span className="cart-count">{cartItemCount}</span>
            <img
              src="./src/assets/images/cart-icon.png"
              alt="Carrito de compras"
              width="24"
              height="24"
            />
          </button>
        </div>
      </div>
      <div className="search mobile">
        <span className="material-symbols-outlined">search</span>
        <input
          type="text"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        {location.pathname !== "/" && searchResults.length > 0 && (
          <div className="search-results">
            <ul>
              {searchResults.map((product) => (
                <li
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    width="50"
                    height="50"
                  />
                  {product.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;