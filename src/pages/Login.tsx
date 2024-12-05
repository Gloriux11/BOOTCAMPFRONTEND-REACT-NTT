import React from "react";


const Login: React.FC = () => {

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
          <a href="#" className="forgot-password">¿Olvidé Contraseña?</a>
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  );
};

export default Login;

