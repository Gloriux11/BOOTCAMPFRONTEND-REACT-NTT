import React, { useState } from "react";
import "./ForgotPassword.css";
import { ForgotPasswordProps } from "./../../../types/ForgotPassword.type";
import EmailSent from "../EmailSent/EmailSent";

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  isOpen,
  email,
  onClose,
  onEmailChange,
  onSubmit,
}) => {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email);
    setIsConfirmationOpen(true); // Abre el modal de confirmación
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false); // Cierra el modal de confirmación
    onClose(); // Cierra también el modal principal
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-container">
          <h2>Resetea tu contraseña</h2>
          <p>Ingresa tu correo electrónico</p>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              required
            />
            <div className="modal-buttons">
              <button type="submit" className="btn btn-primary">
                Enviar
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal de confirmación */}
      {isConfirmationOpen && (
        <EmailSent
          isOpen={isConfirmationOpen}
          email={email}
          onClose={handleCloseConfirmation}
        />
      )}
    </>
  );
};

export default ForgotPassword;
