import React from "react";
import "./EmailSent.css";
import "./../../../types/emailsent.type"
import { EmailSentProps } from "./../../../types/emailsent.type";

const EmailSent: React.FC<EmailSentProps> = ({
  isOpen,
  email,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Correo Enviado</h2>
        <p>El correo para resetear tu contraseña ha sido enviado a:</p>
        <p><strong>{email}</strong></p>
        <button onClick={onClose} className="btn btn-primary">
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default EmailSent;
