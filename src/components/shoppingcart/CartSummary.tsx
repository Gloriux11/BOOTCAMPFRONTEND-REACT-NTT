import React from "react";

interface CartSummaryProps {
  totalPrice: number;
  subtotal: number;
  discounts: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totalPrice, subtotal, discounts }) => {
  return (
    <div className="cart-summary">
      <h3>Resumen de Compra</h3>
      <table>
        <tbody>
          <tr>
            <td className="summary-title">Sub-total:</td>
            <td className="price">S/. {subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="summary-title">Descuentos:</td>
            <td className="price">S/. {discounts.toFixed(2)}</td>
          </tr>
          <hr />
          <tr>
            <td className="summary-title">Total a pagar:</td>
            <td className="price">S/. {totalPrice.toFixed(2)}</td>
          </tr>
        </tbody>    
      </table>
    </div>  
  );
};

export default CartSummary;
