import React, { useEffect, useState } from "react";
import CartItemList from "./components/shoppingcart/CartItemList"; // Componente para la lista de productos
import CartSummary from "./components/shoppingcart/CartSummary"; // Componente para el resumen del carrito
import ShippingForm from "./components/shoppingcart/ShippingForm"; // Componente para el formulario de envío
import { Product } from "./types/product.type";
import { ProductService } from "./services/product.service";
import "./components/shoppingcart/shoppingcart.css";


const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]); // Productos en el carrito
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga
  const [totalPrice, setTotalPrice] = useState<number>(0); // Precio total del carrito

  const productService = new ProductService();

  // Obtener productos desde el endpoint al cargar la página
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productService.fetchProducts(12); // Limitar a 10 productos
        setCartItems(products);
        calculateTotal(products); // Calcular el precio total inicial
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Calcular el precio total del carrito
  const calculateTotal = (items: Product[]) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    setTotalPrice(total);
  };

  // Manejar la eliminación de un producto del carrito
  const handleRemoveItem = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
  };

  // Manejar la actualización de la cantidad de un producto
  const handleUpdateQuantity = (id: number, quantity: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, stock: quantity } : item
    );
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
  };

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <div>
        <h2 className="cart-title">Mi carrito</h2>
        <div className="cart-page">
            <CartItemList
            items={cartItems}
            onRemoveItem={handleRemoveItem}
            onUpdateQuantity={handleUpdateQuantity}
        />
          <CartSummary
            totalPrice={totalPrice}
            subtotal={totalPrice} // Por simplicidad, el subtotal será igual al total
            discounts={0} // Placeholder para descuentos
          />
          <ShippingForm />
        </div>
    </div>
  );
};

export default CartPage;
