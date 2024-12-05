import React from "react";
import "./ForgotPassword.css";
import "./../../../types/ForgotPassword.type"
import { ForgotPasswordProps } from "./../../../types/ForgotPassword.type";

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [email, setEmail] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Resetea tu contraseña</h2>
        <p>Ingresa tu correo electrónico</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="modal-buttons">
            <button type="submit" className="btn btn-primary">
              Enviar
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
