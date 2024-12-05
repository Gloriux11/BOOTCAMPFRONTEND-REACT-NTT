import React, { useState } from "react";
import ForgotPassword from "./../components/Login/ForgotPassword/ForgotPassword";
import './../components/Login/Login.css' 
import { useForgotPassword } from "./../hooks/useForgotPassword"

const Login: React.FC = () => {
    const {
        isModalOpen,
        isConfirmationOpen,
        email,
        openModal,
        closeModal,
        handleEmailChange,
        handleSubmit,
      } = useForgotPassword();

      const onSubmit = (email: string) => {
        console.log("Correo enviado a:", email);
      };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form action="#" method="POST">
          <div className="form-group">
            <input type="text" placeholder="Usuario" required />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Contraseña" required />
          </div>
          <a href="#" className="forgot-password" onClick={openModal}>
            Olvidé Contraseña
          </a>
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
      </div>

      {/* Modal de reseteo de contraseña */}
      <ForgotPassword
        isOpen={isModalOpen}
        email={email}
        isConfirmationOpen={isConfirmationOpen}
        onClose={closeModal}
        onEmailChange={handleEmailChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Login;


