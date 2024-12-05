import React, { useState } from "react";
import ForgotPassword from "./../components/Login/ForgotPassword/ForgotPassword"; 

const Login: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleResetPassword = (email: string) => {
    console.log("Correo enviado para resetear contraseña:", email);
    setIsModalOpen(false); 
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Inicie Sesión</h2>
        <form action="#" method="POST">
          <div className="form-group">
            <input type="text" placeholder="Usuario" required />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Contraseña" required />
          </div>
          <a href="#" className="forgot-password" onClick={handleOpenModal}>
            Olvidé Contraseña
          </a>
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
      </div>

      {/* Modal de reseteo de contraseña */}
      <ForgotPassword
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleResetPassword}
      />
    </div>
  );
};

export default Login;


