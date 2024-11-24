import { useEffect, useState } from "react";
import "./Navbar.css";

interface NavbarProps {
  onSearch: (query: string) => void;
}

export const Navbar = ({ onSearch }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(searchQuery);
    }, 300); // 300ms debounce time

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, onSearch]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <img
            src="./src/assets/images/logo.png"
            alt="Logo Chacra"
            width="150"
            height="56"
          />
        </div>
        <div id="search" className="search">
          <span className="material-symbols-outlined">search</span>
          <input
            type="text"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={handleInputChange}
          />
        </div>
        <nav className="nav-links">
          <ul>
            <li>
              <button className="login-btn">Iniciar Sesión</button>
            </li>
            <li>
              <a href="#">Nosotros</a>
            </li>
            <li>
              <a href="#">Mis compras</a>
            </li>
            <li>
              <button className="fav-btn">
                <span className="material-symbols-outlined">favorite</span>
              </button>
            </li>
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
          <div className="cart">
            <span className="cart-count">0</span>
            <img
              src="./src/assets/images/cart-icon.png"
              alt="Carrito de compras"
              width="24"
              height="24"
            />
          </div>
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
      </div>
    </header>
  );
};
