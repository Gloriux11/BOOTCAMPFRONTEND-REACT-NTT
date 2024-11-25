import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="cart-empty">
      <div>
        <img src="./src/assets/images/carritoempty.png"></img>
        <h1>Tu carrito está vacío</h1>
        <p>Agrega productos y da el primer paso para iniciar tu compra.</p>
        <button onClick={() => navigate("/")}>Seguir comprando</button>
      </div>
    </div>
  );
};

export default EmptyCart;
