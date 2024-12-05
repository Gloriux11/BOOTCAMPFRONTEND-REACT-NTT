import React, { useState } from "react";
import "./ForgotPassword.css";
import { ForgotPasswordProps } from "./../../../types/ForgotPassword.type";
import EmailSent from "../EmailSent/EmailSent";
import { validateEmail } from "./../../../utils/emailvalidation";

interface Errors {
  email: string;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  isOpen,
  email,
  onClose,
  onEmailChange,
  onSubmit,
}) => {
  // Estado para manejar los errores
  const [errors, setErrors] = useState<Errors>({ email: "" });
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: Errors = { email: "" };

    const emailError = validateEmail(email);
    if (emailError) {
      newErrors.email = emailError;
    }

    setErrors(newErrors);

    // Retorna true si no hay errores
    return Object.keys(newErrors).every((key) => newErrors[key as keyof Errors] === "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      setIsConfirmationOpen(true); // Abre el modal de confirmación si no hay errores
      onSubmit(email); // Llama a la función de envío
    }
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false); // Cierra el modal de confirmación
    onClose(); // Cierra el modal principal
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-container">
          <h2>Resetea tu contraseña</h2>
          <p>Ingresa tu correo electrónico</p>
          <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => {
                onEmailChange(e.target.value);
                setErrors({ email: "" }); // Limpia el error al escribir
              }}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>} {/* Renderiza el error */}
          </div>

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
