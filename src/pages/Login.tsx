import React, { useMemo, useState } from "react";
import ForgotPassword from "./../components/Login/ForgotPassword/ForgotPassword";
import './../components/Login/Login.css';
import { useForgotPassword } from "./../hooks/useForgotPassword";
import { AuthService } from "./../services/auth.service";
import { useAuth } from "./../context/AuthContext";

const Login: React.FC = () => {
  const authService = useMemo(() => new AuthService(), []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const {
    isModalOpen,
    isConfirmationOpen,
    email,
    openModal,
    closeModal,
    handleEmailChange,
    handleSubmit: handleForgotPasswordSubmit,
  } = useForgotPassword();

  // Maneja el envío del formulario de inicio de sesión
  const onLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await authService.login(username, password);
      login();
    } catch (error) {
      setError("Error al iniciar sesión. Por favor, verifica tus credenciales.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={onLoginSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <a href="#" className="forgot-password" onClick={(e) => { e.preventDefault(); openModal(); }}>
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
        onSubmit={handleForgotPasswordSubmit}
      />
    </div>
  );
};

export default Login;
